import 'dart:math';

import 'package:flutter/material.dart';

import '../app_state.dart';
import '../logic/answer_checker.dart';
import '../logic/quiz_session.dart';
import '../models/blocks.dart';
import '../models/content.dart';
import '../models/problem.dart';
import '../services/content_repository.dart';
import '../services/sound_service.dart';
import 'app_theme.dart';
import 'widgets/answer_views.dart';
import 'widgets/big_button.dart';
import 'widgets/solution_view.dart';

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
    this.sound = const PlaceholderSoundService(),
    this.random,
    this.onFinished,
  }) : assert(lessonAsset != null || lesson != null);

  /// Đường dẫn asset của bài học (vd assets/content/lessons/x.json).
  final String? lessonAsset;

  /// Hoặc truyền sẵn bài học đã nạp.
  final Lesson? lesson;
  final bool isVip;
  final ContentRepository? repository;
  final SoundService sound;

  /// Cố định thứ tự xáo trộn (dùng trong test).
  final Random? random;
  final QuizFinished? onFinished;

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
          sound: widget.sound,
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
    this.random,
    this.onFinished,
  });

  final Lesson lesson;
  final bool isVip;
  final SoundService sound;
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

  @override
  void initState() {
    super.initState();
    _start();
  }

  void _start() {
    _session = QuizSession(lesson: widget.lesson, isVip: widget.isVip, random: widget.random);
    _answer = null;
    _finishReported = false;
    _reward = null;
    _attemptKey++;
  }

  @override
  void dispose() {
    _session.dispose();
    super.dispose();
  }

  void _check() {
    final problem = _session.current;
    final answer = _answer ?? _emptyAnswer(problem);
    final result = _session.submit(answer);
    if (result.status == CheckStatus.correct) {
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
    widget.sound.tap();
    setState(() {
      _session.next();
      _answer = null;
      _attemptKey++;
    });
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
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
      ),
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
                const Expanded(child: Text('Lời giải', style: TextStyle(fontSize: 28, fontWeight: FontWeight.w700))),
                IconButton(
                  iconSize: 36,
                  tooltip: 'Đóng',
                  onPressed: () => Navigator.pop(context),
                  icon: const Icon(Icons.close_rounded),
                ),
              ],
            ),
            const SizedBox(height: 8),
            SolutionPanel(problem: problem, locked: _session.solutionLocked(problem)),
          ],
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
              Padding(padding: const EdgeInsets.only(bottom: 14), child: BlockView(block: b)),
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
    final viewState = AnswerViewState(
      enabled: phase == QuestionPhase.answering,
      check: phase == QuestionPhase.answering ? null : _session.lastCheck,
      showCorrect: phase == QuestionPhase.revealed,
    );
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            _TopBar(
              current: _session.index + 1,
              total: _session.problems.length,
              onClose: () => Navigator.of(context).maybePop(),
              onTheory: _openTheory,
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
              onCheck: _check,
              onRetry: () => setState(_session.retry),
              onSolution: _openSolution,
              onNext: _next,
            ),
          ],
        ),
      ),
    );
  }

  Widget _answerArea(Problem problem, AnswerViewState s) => buildAnswerView(
        problem: problem,
        state: s,
        onChanged: (a) => _answer = a,
        random: widget.random,
      );
}

class _TopBar extends StatelessWidget {
  const _TopBar({
    required this.current,
    required this.total,
    required this.onClose,
    required this.onTheory,
  });

  final int current;
  final int total;
  final VoidCallback onClose;
  final VoidCallback onTheory;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(4, 4, 8, 4),
      child: Row(
        children: [
          IconButton(
            iconSize: 34,
            tooltip: 'Thoát',
            onPressed: onClose,
            icon: const Icon(Icons.close_rounded),
          ),
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
          Text('$current/$total', style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w700)),
          const SizedBox(width: 4),
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

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(AppSizes.radius),
        boxShadow: const [BoxShadow(color: Color(0x14000000), blurRadius: 10, offset: Offset(0, 4))],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Flexible(
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                  decoration: BoxDecoration(color: AppColors.honeySoft, borderRadius: BorderRadius.circular(12)),
                  child: Text(
                    problem.displayInstruction,
                    style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w700),
                  ),
                ),
              ),
              const SizedBox(width: 8),
              for (var i = 0; i < problem.level; i++)
                const Icon(Icons.star_rounded, color: AppColors.honey, size: 20),
            ],
          ),
          const SizedBox(height: 12),
          Text(
            problem.prompt.text,
            style: const TextStyle(fontSize: AppSizes.promptFont, fontWeight: FontWeight.w700, height: 1.35),
          ),
          if (problem.prompt.image != null) ...[
            const SizedBox(height: 12),
            BlockView(block: ImageBlock(problem.prompt.image!)),
          ],
        ],
      ),
    );
  }
}

class _FeedbackAndActions extends StatelessWidget {
  const _FeedbackAndActions({
    required this.session,
    required this.onCheck,
    required this.onRetry,
    required this.onSolution,
    required this.onNext,
  });

  final QuizSession session;
  final VoidCallback onCheck;
  final VoidCallback onRetry;
  final VoidCallback onSolution;
  final VoidCallback onNext;

  @override
  Widget build(BuildContext context) {
    final phase = session.phase;
    final message = session.message;
    final (Color bg, Color fg, IconData icon) = switch (phase) {
      QuestionPhase.correct => (AppColors.goodSoft, AppColors.good, Icons.emoji_events_rounded),
      QuestionPhase.incorrect => (AppColors.tryAgainSoft, AppColors.tryAgain, Icons.refresh_rounded),
      QuestionPhase.revealed => (AppColors.skySoft, AppColors.sky, Icons.lightbulb_rounded),
      QuestionPhase.answering => (AppColors.honeySoft, AppColors.ink, Icons.info_outline_rounded),
    };
    final hint = session.current.solution.hint;
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
              if (message != null)
                Padding(
                  padding: const EdgeInsets.only(bottom: 10),
                  child: Row(
                    children: [
                      Icon(icon, color: fg, size: 36),
                      const SizedBox(width: 10),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              message,
                              key: const ValueKey('feedback-message'),
                              style: TextStyle(fontSize: 22, fontWeight: FontWeight.w700, color: fg),
                            ),
                            if (phase == QuestionPhase.incorrect && hint != null)
                              Text('Gợi ý: $hint', style: const TextStyle(fontSize: 18)),
                            if (phase == QuestionPhase.revealed)
                              Text(
                                'Đáp án: ${session.current.solution.answerText}',
                                style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w700),
                              ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              Row(
                children: [
                  Expanded(
                    child: BigButton(
                      key: const ValueKey('btn-solution'),
                      label: 'Xem lời giải',
                      icon: Icons.menu_book_rounded,
                      color: AppColors.sky,
                      outlined: true,
                      onPressed: onSolution,
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
class QuizSummary extends StatelessWidget {
  const QuizSummary({
    super.key,
    required this.session,
    required this.onRestart,
    required this.onExit,
    this.reward,
  });

  final QuizSession session;
  final Future<RewardOutcome?>? reward;
  final VoidCallback onRestart;
  final VoidCallback onExit;

  @override
  Widget build(BuildContext context) {
    final stars = session.stars;
    final title = switch (stars) {
      3 => 'Xuất sắc!',
      2 => 'Làm tốt lắm!',
      1 => 'Cố lên nào!',
      _ => 'Mình luyện thêm nhé!',
    };
    return Scaffold(
      body: SafeArea(
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
                        Icon(
                          Icons.star_rounded,
                          size: 72,
                          color: i < stars ? AppColors.honey : Colors.black12,
                        ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Text(title,
                      key: const ValueKey('summary-title'),
                      textAlign: TextAlign.center,
                      style: const TextStyle(fontSize: 34, fontWeight: FontWeight.w700)),
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
                  const SizedBox(height: 28),
                  BigButton(label: 'Làm lại', icon: Icons.replay_rounded, color: AppColors.sky, onPressed: onRestart),
                  const SizedBox(height: 12),
                  BigButton(label: 'Về trang chính', icon: Icons.home_rounded, onPressed: onExit),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

/// Hiện "+điểm" và huy hiệu mới sau khi lưu tiến độ.
class RewardBanner extends StatelessWidget {
  const RewardBanner({super.key, required this.reward});

  final Future<RewardOutcome?>? reward;

  /// Đổi mã huy hiệu → tên hiển thị (Phase 4 gán).
  static String Function(String badgeId) badgeTitle = (id) => id;

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
                      const Icon(Icons.military_tech_rounded, color: AppColors.tryAgain, size: 40),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          'Huy hiệu mới: ${badgeTitle(id)}',
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
