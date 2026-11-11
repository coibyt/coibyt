import 'dart:async';
import 'dart:math';

import 'package:flutter/material.dart';

import '../app_state.dart';
import '../logic/answer_checker.dart';
import '../logic/badges.dart';
import '../logic/quiz_session.dart';
import '../models/blocks.dart';
import '../models/content.dart';
import '../models/problem.dart';
import '../services/content_repository.dart';
import '../services/sound_service.dart';
import '../services/tutor_voice.dart';
import 'app_theme.dart';
import 'widgets/answer_views.dart';
import 'widgets/big_button.dart';
import 'widgets/game_art.dart';
import '../tutor/teacher_assets.dart';
import 'widgets/solution_view.dart';
import '../tutor/column_hint.dart';
import '../tutor/reward_burst.dart';
import '../tutor/teacher_avatar.dart';
import '../tutor/teacher_controller.dart';
import '../tutor/teacher_hud.dart';
import '../tutor/tutor_audio_service.dart';
import '../logic/tips.dart';
import '../logic/tutor.dart';
import 'teacher_class_screen.dart';

/// Gọi khi bé làm xong bài: lưu tiến độ, trả về điểm thưởng + huy hiệu mới.
typedef QuizFinished = Future<RewardOutcome?> Function(QuizSession session);

/// Màn hình luyện tập một bài học: nạp JSON, hiện từng Bài Toán, chấm ngay,
/// cho thử lại 1 lần, "Xem lời giải" từng bước, tổng kết sao cuối bài.
class QuizScreen extends StatefulWidget {
  const QuizScreen({
    super.key,
    this.lessonAsset,
    this.lesson,
    this.isVip = false,
    this.repository,
    this.sound,
    this.random,
    this.onFinished,
    this.voice,
    this.voiceOn = true,
    this.readAloud = true,
  }) : assert(lessonAsset != null || lesson != null);

  /// Đường dẫn asset của bài học (vd assets/content/lessons/x.json).
  final String? lessonAsset;

  /// Hoặc truyền sẵn bài học đã nạp.
  final Lesson? lesson;
  final bool isVip;
  final ContentRepository? repository;

  /// null = dùng [AppSound.instance].
  final SoundService? sound;

  /// Cố định thứ tự xáo trộn (dùng trong test).
  final Random? random;
  final QuizFinished? onFinished;

  /// Giọng cô Ong (null = [AppTutorVoice.instance]); [voiceOn] = tự đọc lời thoại.
  final TutorVoice? voice;
  final bool voiceOn;

  /// Cô tự đọc đề mỗi khi sang câu mới.
  final bool readAloud;

  @override
  State<QuizScreen> createState() => _QuizScreenState();
}

class _QuizScreenState extends State<QuizScreen> {
  late final Future<Lesson> _lessonFuture;

  @override
  void initState() {
    super.initState();
    _lessonFuture = widget.lesson != null
        ? Future.value(widget.lesson)
        : (widget.repository ?? ContentRepository()).loadLesson(widget.lessonAsset!);
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<Lesson>(
      future: _lessonFuture,
      builder: (context, snap) {
        if (snap.hasError) {
          return Scaffold(
            appBar: AppBar(),
            body: Padding(
              padding: const EdgeInsets.all(24),
              child: SingleChildScrollView(
                child: Text(
                  'Ôi, bài học này đang bị lỗi. Con quay lại sau nhé!\n\n(Cho người soạn nội dung: ${snap.error})',
                  style: const TextStyle(fontSize: 20),
                ),
              ),
            ),
          );
        }
        if (!snap.hasData) {
          return const Scaffold(body: Center(child: CircularProgressIndicator()));
        }
        return _QuizBody(
          lesson: snap.data!,
          isVip: widget.isVip,
          sound: widget.sound ?? AppSound.instance,
          voice: widget.voice ?? AppTutorVoice.instance,
          voiceOn: widget.voiceOn,
          readAloud: widget.readAloud,
          random: widget.random,
          onFinished: widget.onFinished,
        );
      },
    );
  }
}

class _QuizBody extends StatefulWidget {
  const _QuizBody({
    required this.lesson,
    required this.isVip,
    required this.sound,
    required this.voice,
    required this.voiceOn,
    required this.readAloud,
    this.random,
    this.onFinished,
  });

  final Lesson lesson;
  final bool isVip;
  final SoundService sound;
  final TutorVoice voice;
  final bool voiceOn;
  final bool readAloud;
  final Random? random;
  final QuizFinished? onFinished;

  @override
  State<_QuizBody> createState() => _QuizBodyState();
}

class _QuizBodyState extends State<_QuizBody> {
  late QuizSession _session;
  UserAnswer? _answer;
  int _attemptKey = 0;
  bool _finishReported = false;
  Future<RewardOutcome?>? _reward;

  // ---- Bí quyết & mẹo của bài ----
  late final List<Tip> _tips = tipsForLesson(widget.lesson.title);
  bool _tipSaid = false;

  // ---- Cô giáo ảo ----
  late final TutorAudioService _audio = TutorAudioService(fallback: widget.voice);
  late final TeacherController _teacher = TeacherController(audio: _audio, voiceEnabled: widget.voiceOn);

  /// Lượt bắn tiền vàng / ngôi sao.
  int _burst = 0;

  /// Theo dõi hành vi của bé: số giây không thao tác, đã nhắc chưa.
  Timer? _watch;
  int _idleSeconds = 0;
  bool _answerComplete = false;
  bool _nudged = false;
  bool _pressCheckSaid = false;

  @override
  void initState() {
    super.initState();
    _start();
    _watch = Timer.periodic(const Duration(seconds: 1), (_) => _watchTick());
  }

  /// Cô giáo tự đọc đề khi câu mới hiện ra (không cần bấm loa).
  void _readProblem() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted || !widget.readAloud || _session.isFinished || _session.problems.isEmpty) return;
      final p = _session.current;
      // Khung thoại hiện đúng chữ trên bảng (21 × 3 = ?); giọng đọc tự đổi số thành chữ.
      final text = p.prompt.text.trim();
      final instruction = p.displayInstruction.trim();
      final tip = _session.index == 0 && !_tipSaid && _tips.isNotEmpty ? _tips.first : null;
      _tipSaid = true;
      final token = ++_readToken;
      final template = switch (p.body) {
        FillBlankBody(:final template) => readableTemplate(template, text),
        _ => null,
      };
      () async {
        await _teacher.say([
          if (tip != null) ...[TutorLines.tipLead[tip.kind]!, tip.text],
          if (instruction.isNotEmpty && !text.startsWith(instruction)) instruction,
          text,
          ?template,
        ]);
        // Trắc nghiệm: cô đọc lần lượt từng đáp án, đáp án đang đọc sáng lên.
        final body = p.body;
        if (body is! MultipleChoiceBody) return;
        final order = _orderOf(p);
        if (!mounted || token != _readToken || _answer != null) return;
        await _teacher.say(const [TutorLines.readChoices]);
        for (final id in order) {
          if (!mounted || token != _readToken || _answer != null) break;
          setState(() => _readingChoice = id);
          await _teacher.say([body.choices.firstWhere((c) => c.id == id).text]);
        }
        if (mounted && token == _readToken) setState(() => _readingChoice = null);
      }();
    });
  }

  /// Thứ tự đáp án của một câu trắc nghiệm (xáo một lần, cố định trong lượt) — để cô đọc đúng thứ tự trên màn hình.
  final _orders = <String, List<String>>{};
  int _readToken = 0;
  String? _readingChoice;

  List<String> _orderOf(Problem p) => _orders.putIfAbsent(p.id, () {
    final body = p.body as MultipleChoiceBody;
    final ids = [for (final c in body.choices) c.id];
    if (body.shuffleChoices) ids.shuffle(widget.random ?? Random());
    return ids;
  });

  /// Bé ngồi im lâu: cô hỏi có cần gợi ý không; làm xong mà chưa bấm: nhắc bấm Kiểm tra.
  void _watchTick() {
    if (_teacher.speaking) {
      _idleSeconds = 0; // tính thời gian ngồi im từ lúc cô nói xong
      return;
    }
    if (!mounted || _session.isFinished || _session.phase != QuestionPhase.answering) return;
    _idleSeconds++;
    if (_answerComplete && !_pressCheckSaid && _idleSeconds >= 8) {
      _pressCheckSaid = true;
      _teacher.say(const [TutorLines.pressCheck]);
    } else if (!_answerComplete && !_nudged && !_session.hintShown && _idleSeconds >= 25) {
      _nudged = true;
      _teacher.say([_session.tutor.idleNudge()], mood: TeacherMood.think);
    }
  }

  void _onAnswerChanged(Problem problem, UserAnswer a) {
    if (_readingChoice != null) setState(_stopReading);
    _answer = a;
    _idleSeconds = 0;
    _answerComplete = checkAnswer(problem, a).status != CheckStatus.incomplete;
  }

  void _resetWatch() {
    _idleSeconds = 0;
    _answerComplete = false;
    _nudged = false;
    _pressCheckSaid = false;
  }

  void _start() {
    _session = QuizSession(lesson: widget.lesson, isVip: widget.isVip, random: widget.random);
    _answer = null;
    _finishReported = false;
    _reward = null;
    _attemptKey++;
    _readProblem();
  }

  @override
  void dispose() {
    _watch?.cancel();
    _teacher.dispose();
    _audio.dispose();
    _session.dispose();
    super.dispose();
  }

  void _stopReading() {
    _readToken++;
    _readingChoice = null;
  }

  void _check() {
    _stopReading();
    final problem = _session.current;
    final answer = _answer ?? _emptyAnswer(problem);
    final result = _session.submit(answer);
    _idleSeconds = 0;
    final mood = switch (_session.phase) {
      QuestionPhase.correct => TeacherMood.clap,
      QuestionPhase.revealed => TeacherMood.idle,
      _ => TeacherMood.think,
    };
    _teacher.say(_session.messageParts, mood: mood);
    if (result.status == CheckStatus.correct) {
      _burst++;
      widget.sound.correct();
    } else if (result.status == CheckStatus.incorrect) {
      widget.sound.wrong();
      if (_session.phase == QuestionPhase.revealed) _openSolution();
    }
    setState(() {});
  }

  UserAnswer _emptyAnswer(Problem p) => switch (p.body) {
    MultipleChoiceBody() => const ChoiceAnswer({}),
    FillBlankBody() => const BlankAnswer({}),
    DragDropBody() => const DragDropAnswer({}),
    MatchingBody() => const MatchingAnswer({}),
  };

  void _next() {
    _stopReading();
    widget.sound.tap();
    _teacher.clear();
    _resetWatch();
    setState(() {
      _session.next();
      _answer = null;
      _attemptKey++;
    });
    _readProblem();
    if (_session.isFinished && !_finishReported) {
      _finishReported = true;
      widget.sound.finish();
      _reward = widget.onFinished?.call(_session);
    }
  }

  void _openSolution() {
    _session.revealSolution();
    setState(() {});
    final problem = _session.current;
    showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      backgroundColor: AppColors.cream,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(28))),
      builder: (context) => DraggableScrollableSheet(
        expand: false,
        initialChildSize: 0.75,
        maxChildSize: 0.95,
        builder: (context, controller) => ListView(
          controller: controller,
          padding: const EdgeInsets.fromLTRB(20, 12, 20, 32),
          children: [
            Center(
              child: Container(
                width: 48,
                height: 6,
                decoration: BoxDecoration(color: Colors.black12, borderRadius: BorderRadius.circular(3)),
              ),
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                const Expanded(
                  child: Text('Lời giải', style: TextStyle(fontSize: 28, fontWeight: FontWeight.w700)),
                ),
                IconButton(
                  iconSize: 36,
                  tooltip: 'Đóng',
                  onPressed: () => Navigator.pop(context),
                  icon: const Icon(Icons.close_rounded),
                ),
              ],
            ),
            const SizedBox(height: 8),
            SolutionPanel(problem: problem, locked: _session.solutionLocked(problem), showSteps: false),
            if (!_session.solutionLocked(problem) && problem.solution.steps.isNotEmpty)
              SolutionDemo(key: ValueKey('demo-${problem.id}'), problem: problem, voiceOn: widget.voiceOn),
          ],
        ),
      ),
    );
  }

  /// Bảng "Bí quyết & mẹo": cô đọc to từng mẹo.
  void _openTips() {
    if (_tips.isEmpty) return;
    _teacher.say([
      for (final t in _tips) ...[TutorLines.tipLead[t.kind]!, t.text],
    ]);
    showModalBottomSheet<void>(
      context: context,
      backgroundColor: const Color(0xFFFFFBF0),
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(28))),
      builder: (context) => SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.fromLTRB(16, 16, 16, 20),
          child: Column(
            key: const ValueKey('tips-sheet'),
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Text('Bí quyết & mẹo của cô', style: TextStyle(fontSize: 24, fontWeight: FontWeight.w800)),
              const SizedBox(height: 12),
              for (final t in _tips) TipCard(tip: t),
            ],
          ),
        ),
      ),
    );
  }

  void _openTheory() {
    final theory = widget.lesson.theory;
    showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      backgroundColor: AppColors.cream,
      builder: (context) => DraggableScrollableSheet(
        expand: false,
        initialChildSize: 0.75,
        builder: (context, controller) => ListView(
          controller: controller,
          padding: const EdgeInsets.all(20),
          children: [
            Text(theory.title ?? 'Nhớ nhanh', style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w700)),
            const SizedBox(height: 12),
            for (final b in theory.blocks)
              Padding(
                padding: const EdgeInsets.only(bottom: 14),
                child: BlockView(block: b),
              ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    if (_session.problems.isEmpty) {
      return Scaffold(
        appBar: AppBar(),
        body: const Center(child: Text('Bài này chỉ có bài tập VIP.', style: TextStyle(fontSize: 22))),
      );
    }
    if (_session.isFinished) {
      return QuizSummary(
        session: _session,
        reward: _reward,
        onRestart: () => setState(_start),
        onExit: () => Navigator.of(context).maybePop(),
      );
    }
    final problem = _session.current;
    final phase = _session.phase;
    final focus = _session.tutor.columnFocus(problem);
    final showColumnHint =
        focus != null &&
        (phase == QuestionPhase.incorrect ||
            (phase == QuestionPhase.answering && (_session.hintShown || _session.currentResult.attempts > 0)));
    final viewState = AnswerViewState(
      enabled: phase == QuestionPhase.answering,
      check: phase == QuestionPhase.answering ? null : _session.lastCheck,
      showCorrect: phase == QuestionPhase.revealed,
      readingChoiceId: _readingChoice,
    );
    return Scaffold(
      body: ScreenBackground(
        name: 'lesson',
        veil: 0.15,
        child: SafeArea(
          child: Stack(
            children: [
              Column(
                children: [
                  _TopBar(
                    combo: _session.combo,
                    current: _session.index + 1,
                    total: _session.problems.length,
                    onClose: () => Navigator.of(context).maybePop(),
                    onTheory: _openTheory,
                    onTips: _openTips,
                  ),
                  Expanded(
                    child: SingleChildScrollView(
                      padding: const EdgeInsets.fromLTRB(16, 8, 16, 16),
                      child: Center(
                        child: ConstrainedBox(
                          constraints: const BoxConstraints(maxWidth: 640),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.stretch,
                            children: [
                              _PromptCard(problem: problem),
                              if (showColumnHint) ...[
                                const SizedBox(height: 12),
                                ColumnHintCard(key: ValueKey('hint-${problem.id}'), focus: focus),
                              ],
                              const SizedBox(height: 16),
                              KeyedSubtree(
                                key: ValueKey('${problem.id}#$_attemptKey'),
                                child: _answerArea(problem, viewState),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                  _FeedbackAndActions(
                    session: _session,
                    teacher: _teacher,
                    onCheck: _check,
                    onRetry: () {
                      _idleSeconds = 0;
                      setState(_session.retry);
                    },
                    onSolution: _openSolution,
                    onHint: () {
                      _idleSeconds = 0;
                      setState(_session.requestHint);
                      _teacher.say(_session.messageParts, mood: TeacherMood.think);
                    },
                    onNext: _next,
                  ),
                ],
              ),
              Positioned.fill(child: RewardBurst(trigger: _burst)),
            ],
          ),
        ),
      ),
    );
  }

  Widget _answerArea(Problem problem, AnswerViewState s) => buildAnswerView(
    problem: problem,
    state: s,
    onChanged: (a) => _onAnswerChanged(problem, a),
    random: widget.random,
    choiceOrder: problem.body is MultipleChoiceBody ? _orderOf(problem) : null,
  );
}

class _TopBar extends StatelessWidget {
  const _TopBar({
    required this.combo,
    required this.current,
    required this.total,
    required this.onClose,
    required this.onTheory,
    required this.onTips,
  });

  final int combo;
  final int current;
  final int total;
  final VoidCallback onClose;
  final VoidCallback onTheory;
  final VoidCallback onTips;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(4, 4, 8, 4),
      child: Row(
        children: [
          IconButton(iconSize: 34, tooltip: 'Thoát', onPressed: onClose, icon: const Icon(Icons.close_rounded)),
          Expanded(
            child: ClipRRect(
              borderRadius: BorderRadius.circular(10),
              child: LinearProgressIndicator(
                value: current / total,
                minHeight: 16,
                backgroundColor: Colors.white,
                color: AppColors.honey,
              ),
            ),
          ),
          const SizedBox(width: 10),
          if (combo >= 2)
            Container(
              key: const ValueKey('combo-badge'),
              margin: const EdgeInsets.only(right: 8),
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
              decoration: BoxDecoration(color: AppColors.tryAgainSoft, borderRadius: BorderRadius.circular(12)),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  GameIcon(UiAsset.flame, size: 22, fallback: const Text('🔥', style: TextStyle(fontSize: 18))),
                  Text('$combo', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w800)),
                ],
              ),
            ),
          Text('$current/$total', style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w700)),
          IconButton(
            key: const ValueKey('btn-tips'),
            tooltip: 'Bí quyết & mẹo của cô',
            onPressed: onTips,
            icon: GameIcon(
              UiAsset.tipBulb,
              size: 36,
              fallback: const Icon(Icons.lightbulb_rounded, color: AppColors.honey),
            ),
          ),
          IconButton(
            iconSize: 34,
            tooltip: 'Nhớ nhanh',
            onPressed: onTheory,
            icon: const Icon(Icons.menu_book_rounded, color: AppColors.sky),
          ),
        ],
      ),
    );
  }
}

class _PromptCard extends StatelessWidget {
  const _PromptCard({required this.problem});

  final Problem problem;

  static const _chalk = Color(0xFFF8F6EA);

  @override
  Widget build(BuildContext context) {
    // Bảng đen: khung gỗ sồi, mặt bảng xanh thẫm, chữ phấn trắng.
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(AppSizes.radius),
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Color(0xFFD9A863), Color(0xFFB27A3C), Color(0xFF8E5A26)],
        ),
        boxShadow: const [BoxShadow(color: Color(0x40000000), blurRadius: 14, offset: Offset(0, 6))],
      ),
      padding: const EdgeInsets.all(9),
      child: Container(
        padding: const EdgeInsets.fromLTRB(18, 14, 18, 18),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(AppSizes.radius - 6),
          gradient: const RadialGradient(
            center: Alignment(-0.4, -0.6),
            radius: 1.4,
            colors: [Color(0xFF2F6B4F), Color(0xFF1E4D38), Color(0xFF173D2C)],
          ),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Flexible(
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                    decoration: BoxDecoration(color: const Color(0xFFFFD66B), borderRadius: BorderRadius.circular(12)),
                    child: Text(
                      problem.displayInstruction,
                      style: const TextStyle(fontSize: 19, fontWeight: FontWeight.w800, color: Color(0xFF3B2A00)),
                    ),
                  ),
                ),
                const Spacer(),
                for (var i = 0; i < problem.level; i++)
                  const Icon(Icons.star_rounded, color: Color(0xFFFFD66B), size: 22),
              ],
            ),
            const SizedBox(height: 12),
            Text(
              problem.prompt.text,
              style: const TextStyle(
                fontSize: AppSizes.promptFont,
                fontWeight: FontWeight.w700,
                height: 1.35,
                color: _chalk,
                shadows: [Shadow(color: Color(0x55FFFFFF), blurRadius: 2)],
              ),
            ),
            if (problem.prompt.image != null) ...[
              const SizedBox(height: 12),
              ClipRRect(
                borderRadius: BorderRadius.circular(14),
                child: ColoredBox(
                  color: Colors.white,
                  child: Padding(
                    padding: const EdgeInsets.all(8),
                    child: BlockView(block: ImageBlock(problem.prompt.image!)),
                  ),
                ),
              ),
            ],
            // Khay phấn
            const SizedBox(height: 8),
            Align(
              alignment: Alignment.centerRight,
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  for (final w in const [26.0, 18.0])
                    Container(
                      width: w,
                      height: 7,
                      margin: const EdgeInsets.only(left: 6),
                      decoration: BoxDecoration(color: _chalk, borderRadius: BorderRadius.circular(4)),
                    ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _FeedbackAndActions extends StatelessWidget {
  const _FeedbackAndActions({
    required this.session,
    required this.teacher,
    required this.onCheck,
    required this.onRetry,
    required this.onSolution,
    required this.onHint,
    required this.onNext,
  });

  final QuizSession session;
  final TeacherController teacher;
  final VoidCallback onCheck;
  final VoidCallback onRetry;
  final VoidCallback onSolution;
  final VoidCallback onHint;
  final VoidCallback onNext;

  @override
  Widget build(BuildContext context) {
    final phase = session.phase;
    final message = session.message;
    final (Color bg, Color fg) = switch (phase) {
      QuestionPhase.correct => (AppColors.goodSoft, AppColors.good),
      QuestionPhase.incorrect => (AppColors.tryAgainSoft, AppColors.ink),
      QuestionPhase.revealed => (AppColors.skySoft, AppColors.ink),
      QuestionPhase.answering => (AppColors.honeySoft, AppColors.ink),
    };
    final isLast = session.index == session.problems.length - 1;
    return Container(
      padding: const EdgeInsets.fromLTRB(16, 10, 16, 16),
      decoration: BoxDecoration(
        color: message != null ? bg : Colors.transparent,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
      ),
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 640),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Cô giáo luôn ở góc dưới; khung thoại trượt lên khi cô nói.
              TeacherHud(
                key: const ValueKey('feedback-message'),
                controller: teacher,
                avatarHeight: 92,
                maxTextHeight: 78, // phụ đề gọn ~3 dòng: không che bảng và ô trả lời
                textColor: fg,
                footer: phase == QuestionPhase.revealed
                    ? Text(
                        'Đáp án: ${session.current.solution.answerText}',
                        style: const TextStyle(fontSize: 19, fontWeight: FontWeight.w700),
                      )
                    : null,
              ),
              const SizedBox(height: 6),
              Row(
                children: [
                  Expanded(
                    // Cô giáo không giải hộ ngay: lúc đầu chỉ có "Gợi ý"; xin gợi ý
                    // hoặc trả lời rồi mới được "Xem lời giải".
                    child: session.canViewSolution
                        ? BigButton(
                            key: const ValueKey('btn-solution'),
                            label: 'Xem lời giải',
                            color: AppColors.sky,
                            outlined: true,
                            onPressed: onSolution,
                          )
                        : BigButton(
                            key: const ValueKey('btn-hint'),
                            label: 'Gợi ý',
                            icon: Icons.lightbulb_rounded,
                            color: AppColors.tryAgain,
                            outlined: true,
                            onPressed: onHint,
                          ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: switch (phase) {
                      QuestionPhase.answering => BigButton(
                        key: const ValueKey('btn-check'),
                        label: 'Kiểm tra',
                        icon: Icons.check_rounded,
                        onPressed: onCheck,
                      ),
                      QuestionPhase.incorrect => BigButton(
                        key: const ValueKey('btn-retry'),
                        label: 'Thử lại',
                        icon: Icons.refresh_rounded,
                        color: AppColors.tryAgain,
                        onPressed: onRetry,
                      ),
                      _ => BigButton(
                        key: const ValueKey('btn-next'),
                        label: isLast ? 'Xong' : 'Tiếp tục',
                        icon: Icons.arrow_forward_rounded,
                        onPressed: onNext,
                      ),
                    },
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

/// Màn tổng kết cuối bài cho bé: sao, điểm, lời khen.
class QuizSummary extends StatefulWidget {
  const QuizSummary({super.key, required this.session, required this.onRestart, required this.onExit, this.reward});

  final QuizSession session;
  final Future<RewardOutcome?>? reward;
  final VoidCallback onRestart;
  final VoidCallback onExit;

  @override
  State<QuizSummary> createState() => _QuizSummaryState();
}

class _QuizSummaryState extends State<QuizSummary> {
  late final TeacherController _teacher = TeacherController(
    voiceEnabled: AppScope.maybeOf(context)?.voiceEnabled ?? false,
  );
  int _burst = 0;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      final stars = widget.session.stars;
      _teacher.say([TutorLines.summary[stars]!], mood: stars >= 2 ? TeacherMood.clap : TeacherMood.think);
      if (stars >= 2) setState(() => _burst++);
    });
  }

  @override
  void dispose() {
    _teacher.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final session = widget.session;
    final reward = widget.reward;
    final onRestart = widget.onRestart;
    final onExit = widget.onExit;
    final stars = session.stars;
    final title = switch (stars) {
      3 => 'Xuất sắc!',
      2 => 'Làm tốt lắm!',
      1 => 'Cố lên nào!',
      _ => 'Mình luyện thêm nhé!',
    };
    return Scaffold(
      body: Stack(
        children: [
          SafeArea(
            child: Center(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(24),
                child: ConstrainedBox(
                  constraints: const BoxConstraints(maxWidth: 520),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          for (var i = 0; i < 3; i++)
                            Icon(Icons.star_rounded, size: 72, color: i < stars ? AppColors.honey : Colors.black12),
                        ],
                      ),
                      const SizedBox(height: 8),
                      Text(
                        title,
                        key: const ValueKey('summary-title'),
                        textAlign: TextAlign.center,
                        style: const TextStyle(fontSize: 34, fontWeight: FontWeight.w700),
                      ),
                      const SizedBox(height: 12),
                      Text(
                        'Con làm đúng ${session.correctCount}/${session.problems.length} bài\n'
                        'Được ${session.totalPoints} điểm',
                        textAlign: TextAlign.center,
                        style: const TextStyle(fontSize: 24),
                      ),
                      RewardBanner(reward: reward),
                      if (session.lockedVipCount > 0) ...[
                        const SizedBox(height: 8),
                        Text(
                          'Còn ${session.lockedVipCount} bài nâng cao dành cho VIP.',
                          textAlign: TextAlign.center,
                          style: const TextStyle(fontSize: 18, color: AppColors.vip),
                        ),
                      ],
                      const SizedBox(height: 16),
                      TeacherHud(controller: _teacher, avatarHeight: 130),
                      const SizedBox(height: 16),
                      BigButton(
                        label: 'Làm lại',
                        icon: Icons.replay_rounded,
                        color: AppColors.sky,
                        onPressed: onRestart,
                      ),
                      const SizedBox(height: 12),
                      BigButton(label: 'Về trang chính', icon: Icons.home_rounded, onPressed: onExit),
                    ],
                  ),
                ),
              ),
            ),
          ),
          Positioned.fill(child: RewardBurst(trigger: _burst)),
        ],
      ),
    );
  }
}

/// Hiện "+điểm" và huy hiệu mới sau khi lưu tiến độ.
class RewardBanner extends StatelessWidget {
  const RewardBanner({super.key, required this.reward});

  final Future<RewardOutcome?>? reward;

  @override
  Widget build(BuildContext context) {
    if (reward == null) return const SizedBox.shrink();
    return FutureBuilder<RewardOutcome?>(
      future: reward,
      builder: (context, snap) {
        final r = snap.data;
        if (r == null) return const SizedBox.shrink();
        return Padding(
          padding: const EdgeInsets.only(top: 12),
          child: Column(
            children: [
              if (r.pointsEarned > 0)
                Text(
                  '+${r.pointsEarned} điểm thưởng',
                  key: const ValueKey('reward-points'),
                  textAlign: TextAlign.center,
                  style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w700, color: AppColors.good),
                ),
              if (r.coins > 0 || r.shards > 0 || r.heartsChange != 0)
                Padding(
                  padding: const EdgeInsets.only(top: 6),
                  child: Wrap(
                    key: const ValueKey('reward-economy'),
                    alignment: WrapAlignment.center,
                    spacing: 14,
                    children: [
                      if (r.coins > 0) Text('🪙 +${r.coins}', style: _rewardStyle),
                      if (r.shards > 0) Text('🧩 +${r.shards} mảnh ghép', style: _rewardStyle),
                      if (r.heartsChange > 0) Text('❤️ +${r.heartsChange} tim', style: _rewardStyle),
                      if (r.heartsChange < 0) Text('💔 ${r.heartsChange} tim', style: _rewardStyle),
                    ],
                  ),
                ),
              for (final id in r.newBadgeIds)
                Container(
                  margin: const EdgeInsets.only(top: 8),
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: AppColors.honeySoft,
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: AppColors.honey, width: 3),
                  ),
                  child: Row(
                    children: [
                      Text(badgeById(id)?.emoji ?? '🏅', style: const TextStyle(fontSize: 36)),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          'Huy hiệu mới: ${badgeById(id)?.title ?? id}',
                          key: ValueKey('new-badge-$id'),
                          style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w700),
                        ),
                      ),
                    ],
                  ),
                ),
            ],
          ),
        );
      },
    );
  }
}

const _rewardStyle = TextStyle(fontSize: 19, fontWeight: FontWeight.w700);
