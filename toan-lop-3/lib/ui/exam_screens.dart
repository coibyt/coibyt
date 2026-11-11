import 'dart:async';
import 'dart:math';

import 'package:flutter/material.dart';

import '../app_state.dart';
import '../logic/answer_checker.dart';
import '../logic/exam_session.dart';
import '../logic/report_card.dart';
import '../models/content.dart';
import '../models/exam.dart';
import '../models/problem.dart';
import '../services/sound_service.dart';
import 'app_theme.dart';
import 'quiz_screen.dart' show RewardBanner;
import 'widgets/answer_views.dart';
import 'widgets/big_button.dart';
import 'widgets/game_widgets.dart';
import '../logic/economy.dart';
import 'child_screens.dart' show ChapterListScreen, LessonScreen;
import 'widgets/solution_view.dart';

/// Thứ tự nhóm đề trên màn "Luyện thi".
const _typeOrder = [
  ExamType.kt15p,
  ExamType.kt1Tiet,
  ExamType.giuaHk1,
  ExamType.cuoiHk1,
  ExamType.giuaHk2,
  ExamType.cuoiHk2,
  ExamType.chuDe,
  ExamType.onTap,
];

Color _typeColor(ExamType t) => switch (t) {
  ExamType.kt15p => AppColors.good,
  ExamType.kt1Tiet => AppColors.sky,
  ExamType.giuaHk1 || ExamType.giuaHk2 => AppColors.tryAgain,
  ExamType.cuoiHk1 || ExamType.cuoiHk2 => const Color(0xFFE5484D),
  ExamType.chuDe || ExamType.onTap => AppColors.vip,
};

IconData _typeIcon(ExamType t) => switch (t) {
  ExamType.kt15p => Icons.bolt_rounded,
  ExamType.kt1Tiet => Icons.assignment_rounded,
  ExamType.giuaHk1 || ExamType.giuaHk2 => Icons.flag_rounded,
  ExamType.cuoiHk1 || ExamType.cuoiHk2 => Icons.emoji_events_rounded,
  ExamType.chuDe || ExamType.onTap => Icons.workspace_premium_rounded,
};

// ===========================================================================
// Danh sách đề, nhóm theo loại
// ===========================================================================

class ExamListScreen extends StatelessWidget {
  const ExamListScreen({super.key, required this.book});

  final Book book;

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    final groups = <ExamType, List<ExamRef>>{};
    for (final e in book.exams) {
      groups.putIfAbsent(e.examType, () => []).add(e);
    }
    return Scaffold(
      appBar: AppBar(title: const Text('Luyện thi'), backgroundColor: AppColors.cream),
      body: book.exams.isEmpty
          ? const Center(child: Text('Chưa có đề nào cho bộ sách này.', style: TextStyle(fontSize: 20)))
          : Center(
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 640),
                child: ListView(
                  padding: const EdgeInsets.all(16),
                  children: [
                    for (final type in _typeOrder)
                      if (groups[type] != null) ...[
                        Padding(
                          padding: const EdgeInsets.only(top: 8, bottom: 8, left: 4),
                          child: Row(
                            children: [
                              Icon(_typeIcon(type), color: _typeColor(type), size: 26),
                              const SizedBox(width: 8),
                              Text(type.displayName, style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w700)),
                            ],
                          ),
                        ),
                        for (final e in groups[type]!) _ExamTile(examRef: e, app: app),
                      ],
                  ],
                ),
              ),
            ),
    );
  }
}

class _ExamTile extends StatelessWidget {
  const _ExamTile({required this.examRef, required this.app});

  final ExamRef examRef;
  final AppState app;

  @override
  Widget build(BuildContext context) {
    final e = examRef;
    final locked = !app.canOpen(e.access);
    final best = app.bestExamScore(e.id);
    final draft = app.examDraft(e.id);
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Material(
        color: Colors.white,
        borderRadius: BorderRadius.circular(22),
        child: InkWell(
          key: ValueKey('exam-${e.id}'),
          borderRadius: BorderRadius.circular(22),
          onTap: locked
              ? () => ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('Đề này dành cho VIP. Con nhờ bố mẹ mở khoá nhé!', style: TextStyle(fontSize: 18)),
                  ),
                )
              : () => Navigator.of(context).push(MaterialPageRoute<void>(builder: (_) => ExamIntroScreen(examRef: e))),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Row(
              children: [
                Container(
                  width: 56,
                  height: 56,
                  decoration: BoxDecoration(
                    color: _typeColor(e.examType).withValues(alpha: 0.15),
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        '${e.durationMinutes}',
                        style: TextStyle(fontSize: 22, fontWeight: FontWeight.w700, color: _typeColor(e.examType)),
                      ),
                      Text('phút', style: TextStyle(fontSize: 13, color: _typeColor(e.examType))),
                    ],
                  ),
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(e.title, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w700)),
                      if (draft != null)
                        const Text(
                          'Đang làm dở — chạm để làm tiếp',
                          style: TextStyle(fontSize: 16, color: AppColors.tryAgain, fontWeight: FontWeight.w700),
                        )
                      else if (best != null)
                        Text(
                          'Điểm cao nhất: $best',
                          style: const TextStyle(fontSize: 16, color: AppColors.good, fontWeight: FontWeight.w700),
                        )
                      else
                        const Text('Chưa làm', style: TextStyle(fontSize: 16, color: Colors.black54)),
                    ],
                  ),
                ),
                if (locked) const Icon(Icons.lock_rounded, color: AppColors.vip, size: 32),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

// ===========================================================================
// Phòng thi: nội quy + bắt đầu / làm tiếp
// ===========================================================================

class ExamIntroScreen extends StatefulWidget {
  const ExamIntroScreen({super.key, required this.examRef});

  final ExamRef examRef;

  @override
  State<ExamIntroScreen> createState() => _ExamIntroScreenState();
}

class _ExamIntroScreenState extends State<ExamIntroScreen> {
  Future<Exam>? _exam;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (_exam == null) {
      final app = AppScope.read(context);
      _exam = app.content.loadExam(widget.examRef.src);
      WidgetsBinding.instance.addPostFrameCallback((_) => app.refreshHearts());
    }
  }

  void _start(Exam exam, {ExamDraft? draft}) {
    Navigator.of(context).pushReplacement(
      MaterialPageRoute<void>(
        builder: (_) => ExamRunScreen(exam: exam, draft: draft),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    return Scaffold(
      appBar: AppBar(backgroundColor: AppColors.cream, title: const Text('Phòng thi')),
      body: FutureBuilder<Exam>(
        future: _exam,
        builder: (context, snap) {
          if (snap.hasError) return Center(child: Text('${snap.error}'));
          if (!snap.hasData) return const Center(child: CircularProgressIndicator());
          final exam = snap.data!;
          final draft = app.examDraft(exam.id);
          final validDraft = draft != null && draft.contentRev == exam.contentRev ? draft : null;
          return Center(
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 560),
              child: ListView(
                padding: const EdgeInsets.all(20),
                children: [
                  Icon(_typeIcon(exam.examType), size: 72, color: _typeColor(exam.examType)),
                  Text(
                    exam.examType.displayName,
                    textAlign: TextAlign.center,
                    style: TextStyle(fontSize: 18, color: _typeColor(exam.examType), fontWeight: FontWeight.w700),
                  ),
                  Text(
                    exam.title,
                    textAlign: TextAlign.center,
                    style: const TextStyle(fontSize: 26, fontWeight: FontWeight.w700),
                  ),
                  if (exam.description != null)
                    Padding(
                      padding: const EdgeInsets.only(top: 6),
                      child: Text(
                        exam.description!,
                        textAlign: TextAlign.center,
                        style: const TextStyle(fontSize: 17, color: Colors.black54),
                      ),
                    ),
                  const SizedBox(height: 16),
                  _InfoLine(
                    icon: Icons.timer_rounded,
                    text: '${exam.durationMinutes} phút · ${exam.items.length} câu · 10 điểm',
                  ),
                  const _InfoLine(icon: Icons.visibility_off_rounded, text: 'Trong giờ thi không xem được đáp án.'),
                  const _InfoLine(icon: Icons.alarm_rounded, text: 'Đồng hồ ở góc trên. Hết giờ bài tự nộp.'),
                  const _InfoLine(icon: Icons.save_rounded, text: 'Lỡ thoát ra thì bài vẫn được lưu để làm tiếp.'),
                  const _InfoLine(icon: Icons.analytics_rounded, text: 'Nộp bài xong có bảng điểm chi tiết.'),
                  const _InfoLine(icon: Icons.favorite_rounded, text: 'Mỗi câu sai mất 1 trái tim. Ôn bài để hồi tim.'),
                  const SizedBox(height: 8),
                  Center(child: HeartsBar(hearts: app.progress.hearts, size: 30)),
                  const SizedBox(height: 16),
                  if (validDraft == null && !app.canStartExam)
                    _NoHeartsCard(app: app)
                  else if (validDraft != null) ...[
                    BigButton(
                      key: const ValueKey('btn-exam-resume'),
                      label: 'Làm tiếp (còn ${formatClock(exam.durationMinutes * 60 - validDraft.elapsedSeconds)})',
                      icon: Icons.play_arrow_rounded,
                      onPressed: () => _start(exam, draft: validDraft),
                    ),
                    const SizedBox(height: 12),
                    BigButton(
                      key: const ValueKey('btn-exam-restart'),
                      label: 'Làm lại từ đầu',
                      color: AppColors.sky,
                      outlined: true,
                      onPressed: () async {
                        await app.clearExamDraft(exam.id);
                        if (mounted) _start(exam);
                      },
                    ),
                  ] else
                    BigButton(
                      key: const ValueKey('btn-exam-start'),
                      label: 'Bắt đầu làm bài',
                      icon: Icons.play_arrow_rounded,
                      onPressed: () => _start(exam),
                    ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}

/// Hết tim: không vào phòng thi được, nhưng luôn có đường học tiếp để hồi tim.
class _NoHeartsCard extends StatelessWidget {
  const _NoHeartsCard({required this.app});

  final AppState app;

  @override
  Widget build(BuildContext context) {
    final wait = nextHeartIn(app.progress, app.now());
    final book = app.book;
    return Container(
      key: const ValueKey('no-hearts'),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(color: const Color(0xFFFFE3E8), borderRadius: BorderRadius.circular(20)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const Text('Hết tim rồi! 💔', style: TextStyle(fontSize: 24, fontWeight: FontWeight.w700)),
          const SizedBox(height: 4),
          Text(
            'Con ôn một bài luyện tập (đúng từ 6/10 câu) để hồi ${Economy.heartsPerGoodPractice} tim'
            '${wait == null ? '' : ', hoặc đợi ${wait.inMinutes + 1} phút để có thêm 1 tim'}.',
            style: const TextStyle(fontSize: 18),
          ),
          const SizedBox(height: 12),
          if (book != null)
            BigButton(
              key: const ValueKey('btn-review-for-hearts'),
              label: 'Ôn bài để hồi tim',
              icon: Icons.auto_stories_rounded,
              color: AppColors.sky,
              onPressed: () =>
                  Navigator.of(context).push(MaterialPageRoute<void>(builder: (_) => ChapterListScreen(book: book))),
            ),
        ],
      ),
    );
  }
}

class _InfoLine extends StatelessWidget {
  const _InfoLine({required this.icon, required this.text});

  final IconData icon;
  final String text;

  @override
  Widget build(BuildContext context) => Padding(
    padding: const EdgeInsets.symmetric(vertical: 5),
    child: Row(
      children: [
        Icon(icon, size: 28, color: AppColors.sky),
        const SizedBox(width: 12),
        Expanded(child: Text(text, style: const TextStyle(fontSize: 19))),
      ],
    ),
  );
}

// ===========================================================================
// Làm bài
// ===========================================================================

class ExamRunScreen extends StatefulWidget {
  const ExamRunScreen({super.key, required this.exam, this.draft, this.sound, this.random});

  final Exam exam;

  /// Bài làm dở để làm tiếp.
  final ExamDraft? draft;

  /// null = dùng [AppSound.instance].
  final SoundService? sound;
  final Random? random;

  @override
  State<ExamRunScreen> createState() => _ExamRunScreenState();
}

class _ExamRunScreenState extends State<ExamRunScreen> {
  late final ExamSession _session = widget.draft == null
      ? ExamSession(widget.exam)
      : ExamSession.resume(widget.exam, widget.draft!);
  Timer? _timer;
  bool _finishing = false;

  /// Cảnh báo một lần khi còn 5 phút và 1 phút.
  final Set<int> _warned = {};
  String? _warning;

  SoundService get _sound => widget.sound ?? AppSound.instance;

  @override
  void initState() {
    super.initState();
    _timer = Timer.periodic(const Duration(seconds: 1), (_) => _onTick());
  }

  void _onTick() {
    if (_session.tick()) {
      _finish(timedOut: true);
      return;
    }
    final left = _session.remainingSeconds;
    for (final mark in const [300, 60]) {
      if (left <= mark && !_warned.contains(mark) && _session.durationSeconds > mark) {
        _warned.add(mark);
        _sound.tap();
        setState(() => _warning = mark == 300 ? 'Còn 5 phút! Con kiểm tra lại bài nhé.' : 'Còn 1 phút!');
      }
    }
    if (_session.elapsedSeconds % 5 == 0) _saveDraft();
  }

  void _saveDraft() {
    if (_session.isSubmitted || !mounted) return;
    AppScope.read(context).saveExamDraft(_session);
  }

  @override
  void dispose() {
    _timer?.cancel();
    _session.dispose();
    super.dispose();
  }

  Future<void> _finish({bool timedOut = false}) async {
    if (_finishing) return;
    _finishing = true;
    _timer?.cancel();
    final result = _session.submit(timedOut: timedOut);
    _sound.finish();
    final app = AppScope.read(context);
    final previous = app.lastExamScore(result.exam.id);
    final report = ReportCard.build(result, app.catalog, previousScore: previous);
    final reward = app.recordExam(result);
    if (!mounted) return;
    await Navigator.of(context).pushReplacement(
      MaterialPageRoute<void>(
        builder: (_) => ReportCardScreen(report: report, reward: reward),
      ),
    );
  }

  Future<void> _confirmSubmit() async {
    final unanswered = _session.items.length - _session.answeredCount;
    final ok = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Nộp bài?', style: TextStyle(fontWeight: FontWeight.w700)),
        content: Text(
          unanswered > 0
              ? 'Con còn $unanswered câu chưa làm. Con có chắc muốn nộp không?'
              : 'Con đã làm hết các câu. Nộp bài nhé!',
          style: const TextStyle(fontSize: 19),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: const Text('Làm tiếp', style: TextStyle(fontSize: 18)),
          ),
          FilledButton(
            key: const ValueKey('btn-confirm-submit'),
            onPressed: () => Navigator.pop(context, true),
            child: const Text('Nộp bài', style: TextStyle(fontSize: 18)),
          ),
        ],
      ),
    );
    if (ok == true) await _finish();
  }

  Future<void> _exit() async {
    final navigator = Navigator.of(context);
    final ok = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Tạm dừng bài thi?'),
        content: const Text('Bài làm được lưu lại. Lần sau con vào lại đề này để làm tiếp nhé.'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context, false), child: const Text('Làm tiếp')),
          TextButton(
            key: const ValueKey('btn-exam-pause'),
            onPressed: () => Navigator.pop(context, true),
            child: const Text('Tạm dừng'),
          ),
        ],
      ),
    );
    if (ok == true) {
      _timer?.cancel();
      _saveDraft();
      navigator.pop();
    }
  }

  @override
  Widget build(BuildContext context) {
    return ListenableBuilder(
      listenable: _session,
      builder: (context, _) {
        final i = _session.current;
        final item = _session.items[i];
        final remaining = _session.remainingSeconds;
        final hurry = remaining <= 5 * 60;
        final isLast = i == _session.items.length - 1;
        return PopScope(
          canPop: false,
          onPopInvokedWithResult: (didPop, _) {
            if (!didPop) _exit();
          },
          child: Scaffold(
            body: SafeArea(
              child: Column(
                children: [
                  Padding(
                    padding: const EdgeInsets.fromLTRB(4, 4, 12, 0),
                    child: Row(
                      children: [
                        IconButton(
                          iconSize: 32,
                          tooltip: 'Tạm dừng',
                          onPressed: _exit,
                          icon: const Icon(Icons.pause_circle_outline_rounded),
                        ),
                        Expanded(
                          child: Text(
                            'Câu ${i + 1}/${_session.items.length}',
                            style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w700),
                          ),
                        ),
                        Container(
                          key: const ValueKey('exam-timer'),
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                          decoration: BoxDecoration(
                            color: hurry ? AppColors.tryAgainSoft : AppColors.skySoft,
                            borderRadius: BorderRadius.circular(16),
                            border: Border.all(color: hurry ? AppColors.tryAgain : Colors.transparent, width: 2),
                          ),
                          child: Row(
                            children: [
                              Icon(Icons.timer_rounded, color: hurry ? AppColors.tryAgain : AppColors.sky),
                              const SizedBox(width: 4),
                              Text(
                                formatClock(remaining),
                                style: TextStyle(
                                  fontSize: 22,
                                  fontWeight: FontWeight.w700,
                                  color: hurry ? AppColors.tryAgain : AppColors.ink,
                                  fontFeatures: const [FontFeature.tabularFigures()],
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                  if (_warning != null)
                    Container(
                      key: const ValueKey('exam-warning'),
                      width: double.infinity,
                      margin: const EdgeInsets.fromLTRB(12, 6, 12, 0),
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                      decoration: BoxDecoration(color: AppColors.tryAgainSoft, borderRadius: BorderRadius.circular(14)),
                      child: Row(
                        children: [
                          const Icon(Icons.alarm_rounded, color: AppColors.tryAgain),
                          const SizedBox(width: 8),
                          Expanded(
                            child: Text(_warning!, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
                          ),
                          IconButton(
                            tooltip: 'Ẩn',
                            onPressed: () => setState(() => _warning = null),
                            icon: const Icon(Icons.close_rounded),
                          ),
                        ],
                      ),
                    ),
                  SizedBox(
                    height: 56,
                    child: ListView(
                      scrollDirection: Axis.horizontal,
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                      children: [
                        for (var k = 0; k < _session.items.length; k++)
                          Padding(
                            padding: const EdgeInsets.only(right: 6),
                            child: InkWell(
                              key: ValueKey('qnav-$k'),
                              borderRadius: BorderRadius.circular(22),
                              onTap: () => _session.goTo(k),
                              child: CircleAvatar(
                                radius: 22,
                                backgroundColor: k == i
                                    ? AppColors.sky
                                    : (_session.isAnswered(k) ? AppColors.goodSoft : Colors.white),
                                child: Text(
                                  '${k + 1}',
                                  style: TextStyle(
                                    fontSize: 18,
                                    fontWeight: FontWeight.w700,
                                    color: k == i ? Colors.white : AppColors.ink,
                                  ),
                                ),
                              ),
                            ),
                          ),
                      ],
                    ),
                  ),
                  Expanded(
                    child: SingleChildScrollView(
                      padding: const EdgeInsets.all(16),
                      child: Center(
                        child: ConstrainedBox(
                          constraints: const BoxConstraints(maxWidth: 640),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.stretch,
                            children: [
                              Container(
                                padding: const EdgeInsets.all(18),
                                decoration: BoxDecoration(
                                  color: Colors.white,
                                  borderRadius: BorderRadius.circular(AppSizes.radius),
                                ),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      '${item.problem.displayInstruction} (${formatPoints(item.points)} điểm)',
                                      style: const TextStyle(
                                        fontSize: 19,
                                        fontWeight: FontWeight.w700,
                                        color: AppColors.sky,
                                      ),
                                    ),
                                    const SizedBox(height: 8),
                                    Text(
                                      item.problem.prompt.text,
                                      style: const TextStyle(
                                        fontSize: AppSizes.promptFont,
                                        fontWeight: FontWeight.w700,
                                        height: 1.35,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              const SizedBox(height: 16),
                              KeyedSubtree(
                                key: ValueKey('exam-q-$i'),
                                child: buildAnswerView(
                                  problem: item.problem,
                                  state: const AnswerViewState(enabled: true, check: null, showCorrect: false),
                                  onChanged: (a) {
                                    _session.setAnswer(i, a);
                                    _saveDraft();
                                  },
                                  initial: _session.answerOf(i),
                                  random: widget.random,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.fromLTRB(16, 4, 16, 16),
                    child: Row(
                      children: [
                        Expanded(
                          child: BigButton(
                            key: const ValueKey('btn-prev'),
                            label: 'Câu trước',
                            color: AppColors.sky,
                            outlined: true,
                            onPressed: i == 0 ? null : () => _session.goTo(i - 1),
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: isLast
                              ? BigButton(
                                  key: const ValueKey('btn-submit'),
                                  label: 'Nộp bài',
                                  icon: Icons.send_rounded,
                                  color: AppColors.tryAgain,
                                  onPressed: _confirmSubmit,
                                )
                              : BigButton(
                                  key: const ValueKey('btn-next-q'),
                                  label: 'Câu sau',
                                  icon: Icons.arrow_forward_rounded,
                                  color: AppColors.sky,
                                  onPressed: () => _session.goTo(i + 1),
                                ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}

/// "1", "1,5", "0,25"
String formatPoints(double p) => p == p.roundToDouble() ? '${p.toInt()}' : p.toString().replaceAll('.', ',');

// ===========================================================================
// Bảng điểm phân tích
// ===========================================================================

class ReportCardScreen extends StatelessWidget {
  const ReportCardScreen({super.key, required this.report, this.reward});

  final ReportCard report;
  final Future<RewardOutcome?>? reward;

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    final result = report.result;
    final score = result.roundedScore;
    final title = score >= 9
        ? 'Xuất sắc!'
        : score >= 7
        ? 'Làm tốt lắm!'
        : score >= 5
        ? 'Cố gắng thêm nhé!'
        : 'Mình cùng ôn lại nhé!';
    final change = report.scoreChange;
    const h = TextStyle(fontSize: 21, fontWeight: FontWeight.w700);
    return Scaffold(
      appBar: AppBar(
        title: const Text('Bảng điểm'),
        backgroundColor: AppColors.cream,
        automaticallyImplyLeading: false,
      ),
      body: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 640),
          child: ListView(
            padding: const EdgeInsets.all(16),
            children: [
              if (result.timedOut)
                const Text(
                  'Hết giờ! Bài đã được nộp tự động.',
                  textAlign: TextAlign.center,
                  style: TextStyle(fontSize: 18, color: AppColors.tryAgain),
                ),
              _Card(
                children: [
                  Row(
                    children: [
                      Container(
                        width: 110,
                        height: 110,
                        alignment: Alignment.center,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: score >= 5 ? AppColors.goodSoft : AppColors.tryAgainSoft,
                          border: Border.all(color: score >= 5 ? AppColors.good : AppColors.tryAgain, width: 6),
                        ),
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Text(
                              '$score',
                              key: const ValueKey('exam-score'),
                              style: const TextStyle(fontSize: 52, fontWeight: FontWeight.w700, height: 1),
                            ),
                            const Text('điểm', style: TextStyle(fontSize: 16)),
                          ],
                        ),
                      ),
                      const SizedBox(width: 16),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(title, style: const TextStyle(fontSize: 26, fontWeight: FontWeight.w700)),
                            Text(
                              result.exam.examType.displayName,
                              style: TextStyle(fontSize: 16, color: _typeColor(result.exam.examType)),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              'Đúng ${result.correctCount}/${result.items.length} câu',
                              style: const TextStyle(fontSize: 18),
                            ),
                            Text(
                              'Thời gian: ${formatClock(result.usedSeconds)} / ${result.exam.durationMinutes}:00',
                              style: const TextStyle(fontSize: 16, color: Colors.black54),
                            ),
                            if (change != null)
                              Text(
                                change > 0
                                    ? 'Tăng $change điểm so với lần trước!'
                                    : change == 0
                                    ? 'Bằng điểm lần trước.'
                                    : 'Thấp hơn lần trước ${-change} điểm, cố lên nhé!',
                                key: const ValueKey('score-change'),
                                style: TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.w700,
                                  color: change >= 0 ? AppColors.good : AppColors.tryAgain,
                                ),
                              ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  RewardBanner(reward: reward),
                ],
              ),
              _Card(
                color: AppColors.honeySoft,
                children: [
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('💬', style: TextStyle(fontSize: 32)),
                      const SizedBox(width: 10),
                      Expanded(
                        child: Text(
                          report.message,
                          key: const ValueKey('report-message'),
                          style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w700, height: 1.35),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              _Card(
                children: [
                  const Text('Theo từng phần kiến thức', style: h),
                  const SizedBox(height: 8),
                  for (final t in report.topics) _TopicBar(topic: t),
                ],
              ),
              if (report.suggestedLessons.isNotEmpty)
                _Card(
                  children: [
                    const Text('Ôn ngay', style: h),
                    const SizedBox(height: 6),
                    for (final l in report.suggestedLessons)
                      Padding(
                        padding: const EdgeInsets.only(bottom: 8),
                        child: OutlinedButton.icon(
                          key: ValueKey('review-lesson-${l.id}'),
                          style: OutlinedButton.styleFrom(
                            minimumSize: const Size.fromHeight(52),
                            alignment: Alignment.centerLeft,
                            side: const BorderSide(color: AppColors.sky, width: 2),
                          ),
                          onPressed: app.canOpen(l.access)
                              ? () => Navigator.of(
                                  context,
                                ).push(MaterialPageRoute<void>(builder: (_) => LessonScreen(lessonRef: l)))
                              : null,
                          icon: const Icon(Icons.auto_stories_rounded),
                          label: Text(l.title, style: const TextStyle(fontSize: 17)),
                        ),
                      ),
                  ],
                ),
              _Card(
                children: [
                  const Text('Bảng đúng / sai', style: h),
                  const Text(
                    'Chạm vào từng câu để xem lời giải.',
                    style: TextStyle(fontSize: 15, color: Colors.black54),
                  ),
                  const SizedBox(height: 10),
                  Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    children: [
                      for (final (k, r) in result.items.indexed)
                        _AnswerCell(index: k, item: r, onTap: () => _showSolution(context, r, app)),
                    ],
                  ),
                  const SizedBox(height: 8),
                  const Wrap(
                    spacing: 12,
                    children: [
                      _Legend(color: AppColors.good, text: 'Đúng'),
                      _Legend(color: AppColors.honey, text: 'Đúng một phần'),
                      _Legend(color: AppColors.tryAgain, text: 'Sai / chưa làm'),
                    ],
                  ),
                ],
              ),
              const SizedBox(height: 4),
              BigButton(
                label: 'Về trang chính',
                icon: Icons.home_rounded,
                onPressed: () => Navigator.of(context).popUntil((r) => r.isFirst),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _showSolution(BuildContext context, ExamItemResult r, AppState app) {
    final problem = r.item.problem;
    showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      backgroundColor: AppColors.cream,
      builder: (context) => DraggableScrollableSheet(
        expand: false,
        initialChildSize: 0.8,
        builder: (context, controller) => ListView(
          controller: controller,
          padding: const EdgeInsets.all(20),
          children: [
            Text(problem.prompt.text, style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w700)),
            Text(
              '${formatPoints(r.earned)}/${formatPoints(r.item.points)} điểm${r.answer == null ? ' · con chưa làm câu này' : ''}',
              style: const TextStyle(fontSize: 17, color: Colors.black54),
            ),
            const SizedBox(height: 12),
            IgnorePointer(
              child: buildAnswerView(
                problem: problem,
                state: AnswerViewState(
                  enabled: false,
                  check: r.check ?? const CheckResult(CheckStatus.incomplete),
                  showCorrect: true,
                ),
                onChanged: (_) {},
                initial: r.answer,
              ),
            ),
            const SizedBox(height: 16),
            SolutionPanel(problem: problem, locked: problem.solution.access == Access.vip && !app.isVip),
          ],
        ),
      ),
    );
  }
}

class _Card extends StatelessWidget {
  const _Card({required this.children, this.color = Colors.white});

  final List<Widget> children;
  final Color color;

  @override
  Widget build(BuildContext context) => Container(
    margin: const EdgeInsets.only(bottom: 14),
    padding: const EdgeInsets.all(16),
    decoration: BoxDecoration(color: color, borderRadius: BorderRadius.circular(20)),
    child: Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: children),
  );
}

class _TopicBar extends StatelessWidget {
  const _TopicBar({required this.topic});

  final ReportTopic topic;

  @override
  Widget build(BuildContext context) {
    final color = topic.strong ? AppColors.good : (topic.weak ? AppColors.tryAgain : AppColors.honey);
    final label = topic.strong ? 'Tốt' : (topic.weak ? 'Cần ôn' : 'Khá');
    final name = topic.name.isEmpty ? topic.name : topic.name[0].toUpperCase() + topic.name.substring(1);
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Expanded(
                child: Text(name, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                decoration: BoxDecoration(
                  color: color.withValues(alpha: 0.15),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Text(
                  label,
                  style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: color),
                ),
              ),
              const SizedBox(width: 8),
              Text(
                '${topic.correct}/${topic.total}',
                style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w700),
              ),
            ],
          ),
          const SizedBox(height: 4),
          ExcludeSemantics(
            child: ClipRRect(
              borderRadius: BorderRadius.circular(8),
              child: LinearProgressIndicator(
                value: topic.ratio,
                minHeight: 12,
                color: color,
                backgroundColor: const Color(0xFFEDE7DA),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _AnswerCell extends StatelessWidget {
  const _AnswerCell({required this.index, required this.item, required this.onTap});

  final int index;
  final ExamItemResult item;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final color = item.fullyCorrect ? AppColors.good : (item.earned > 0 ? AppColors.honey : AppColors.tryAgain);
    final icon = item.fullyCorrect ? '✓' : (item.earned > 0 ? '½' : '✗');
    return Semantics(
      button: true,
      label: 'Câu ${index + 1}: ${item.fullyCorrect ? 'đúng' : (item.earned > 0 ? 'đúng một phần' : 'sai')}',
      child: Material(
        color: color.withValues(alpha: 0.15),
        borderRadius: BorderRadius.circular(14),
        child: InkWell(
          key: ValueKey('review-$index'),
          borderRadius: BorderRadius.circular(14),
          onTap: onTap,
          child: Container(
            width: 64,
            height: 64,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: color, width: 3),
            ),
            child: ExcludeSemantics(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text('${index + 1}', style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w700)),
                  Text(
                    icon,
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700, color: color),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _Legend extends StatelessWidget {
  const _Legend({required this.color, required this.text});

  final Color color;
  final String text;

  @override
  Widget build(BuildContext context) => Row(
    mainAxisSize: MainAxisSize.min,
    children: [
      Container(
        width: 14,
        height: 14,
        decoration: BoxDecoration(color: color, shape: BoxShape.circle),
      ),
      const SizedBox(width: 4),
      Text(text, style: const TextStyle(fontSize: 14)),
    ],
  );
}
