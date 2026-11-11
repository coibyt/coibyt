import 'dart:async';
import 'dart:math';

import 'package:flutter/material.dart';

import '../app_state.dart';
import '../logic/answer_checker.dart';
import '../logic/exam_session.dart';
import '../models/content.dart';
import '../models/exam.dart';
import '../models/problem.dart';
import '../services/sound_service.dart';
import 'app_theme.dart';
import 'quiz_screen.dart' show RewardBanner;
import 'widgets/answer_views.dart';
import 'widgets/big_button.dart';
import 'widgets/solution_view.dart';

// ===========================================================================
// Danh sách đề
// ===========================================================================

class ExamListScreen extends StatelessWidget {
  const ExamListScreen({super.key, required this.book});

  final Book book;

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    return Scaffold(
      appBar: AppBar(title: const Text('Thi thử'), backgroundColor: AppColors.cream),
      body: book.exams.isEmpty
          ? const Center(child: Text('Chưa có đề nào cho bộ sách này.', style: TextStyle(fontSize: 20)))
          : ListView(
              padding: const EdgeInsets.all(16),
              children: [
                for (final e in book.exams)
                  Padding(
                    padding: const EdgeInsets.only(bottom: 14),
                    child: Material(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(22),
                      child: InkWell(
                        key: ValueKey('exam-${e.id}'),
                        borderRadius: BorderRadius.circular(22),
                        onTap: app.canOpen(e.access)
                            ? () => Navigator.of(context).push(
                                  MaterialPageRoute<void>(builder: (_) => ExamIntroScreen(examRef: e)),
                                )
                            : () => ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
                                  content: Text('Đề này dành cho VIP. Con nhờ bố mẹ mở khoá nhé!',
                                      style: TextStyle(fontSize: 18)),
                                )),
                        child: Padding(
                          padding: const EdgeInsets.all(16),
                          child: Row(
                            children: [
                              const Icon(Icons.assignment_rounded, size: 48, color: AppColors.tryAgain),
                              const SizedBox(width: 14),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(e.title, style: const TextStyle(fontSize: 21, fontWeight: FontWeight.w700)),
                                    Text(
                                      '${e.examType.displayName} · ${e.durationMinutes} phút',
                                      style: const TextStyle(fontSize: 17, color: Colors.black54),
                                    ),
                                    if (app.bestExamScore(e.id) != null)
                                      Text(
                                        'Điểm cao nhất: ${app.bestExamScore(e.id)}',
                                        style: const TextStyle(fontSize: 17, color: AppColors.good, fontWeight: FontWeight.w700),
                                      ),
                                  ],
                                ),
                              ),
                              if (!app.canOpen(e.access))
                                const Icon(Icons.lock_rounded, color: AppColors.vip, size: 32),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
              ],
            ),
    );
  }
}

// ===========================================================================
// Giới thiệu đề
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
    _exam ??= AppScope.read(context).content.loadExam(widget.examRef.src);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(backgroundColor: AppColors.cream),
      body: FutureBuilder<Exam>(
        future: _exam,
        builder: (context, snap) {
          if (snap.hasError) return Center(child: Text('${snap.error}'));
          if (!snap.hasData) return const Center(child: CircularProgressIndicator());
          final exam = snap.data!;
          return Center(
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 560),
              child: ListView(
                padding: const EdgeInsets.all(24),
                children: [
                  const Icon(Icons.assignment_rounded, size: 80, color: AppColors.tryAgain),
                  Text(exam.title, textAlign: TextAlign.center, style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w700)),
                  const SizedBox(height: 16),
                  _InfoLine(icon: Icons.timer_rounded, text: '${exam.durationMinutes} phút'),
                  _InfoLine(icon: Icons.format_list_numbered_rounded, text: '${exam.items.length} câu'),
                  const _InfoLine(icon: Icons.info_outline_rounded, text: 'Làm xong thì bấm "Nộp bài". Không có gợi ý nhé!'),
                  const SizedBox(height: 24),
                  BigButton(
                    key: const ValueKey('btn-exam-start'),
                    label: 'Bắt đầu làm bài',
                    icon: Icons.play_arrow_rounded,
                    onPressed: () => Navigator.of(context).pushReplacement(
                      MaterialPageRoute<void>(builder: (_) => ExamRunScreen(exam: exam)),
                    ),
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

class _InfoLine extends StatelessWidget {
  const _InfoLine({required this.icon, required this.text});

  final IconData icon;
  final String text;

  @override
  Widget build(BuildContext context) => Padding(
        padding: const EdgeInsets.symmetric(vertical: 6),
        child: Row(
          children: [
            Icon(icon, size: 30, color: AppColors.sky),
            const SizedBox(width: 12),
            Expanded(child: Text(text, style: const TextStyle(fontSize: 21))),
          ],
        ),
      );
}

// ===========================================================================
// Làm bài
// ===========================================================================

class ExamRunScreen extends StatefulWidget {
  const ExamRunScreen({
    super.key,
    required this.exam,
    this.sound = const PlaceholderSoundService(),
    this.random,
  });

  final Exam exam;
  final SoundService sound;
  final Random? random;

  @override
  State<ExamRunScreen> createState() => _ExamRunScreenState();
}

class _ExamRunScreenState extends State<ExamRunScreen> {
  late final ExamSession _session = ExamSession(widget.exam);
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    _timer = Timer.periodic(const Duration(seconds: 1), (_) {
      if (_session.tick()) _finish(timedOut: true);
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    _session.dispose();
    super.dispose();
  }

  Future<void> _finish({bool timedOut = false}) async {
    _timer?.cancel();
    final result = _session.submit(timedOut: timedOut);
    widget.sound.finish();
    final app = AppScope.read(context);
    final reward = app.recordExam(result);
    if (!mounted) return;
    await Navigator.of(context).pushReplacement(
      MaterialPageRoute<void>(builder: (_) => ExamResultScreen(result: result, reward: reward)),
    );
  }

  Future<void> _confirmSubmit() async {
    final unanswered = _session.items.length - _session.answeredCount;
    final ok = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Nộp bài?', style: TextStyle(fontWeight: FontWeight.w700)),
        content: Text(
          unanswered > 0 ? 'Con còn $unanswered câu chưa làm. Con có chắc muốn nộp không?' : 'Con đã làm hết các câu. Nộp bài nhé!',
          style: const TextStyle(fontSize: 19),
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context, false), child: const Text('Làm tiếp', style: TextStyle(fontSize: 18))),
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

  Future<bool> _confirmExit() async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Thoát bài thi?'),
        content: const Text('Bài làm sẽ không được lưu.'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context, false), child: const Text('Làm tiếp')),
          TextButton(onPressed: () => Navigator.pop(context, true), child: const Text('Thoát')),
        ],
      ),
    );
    return ok == true;
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
          onPopInvokedWithResult: (didPop, _) async {
            if (didPop) return;
            final navigator = Navigator.of(context);
            if (await _confirmExit()) navigator.pop();
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
                          tooltip: 'Thoát',
                          onPressed: () async {
                            final navigator = Navigator.of(context);
                            if (await _confirmExit()) navigator.pop();
                          },
                          icon: const Icon(Icons.close_rounded),
                        ),
                        Expanded(
                          child: Text('Câu ${i + 1}/${_session.items.length}',
                              style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w700)),
                        ),
                        Container(
                          key: const ValueKey('exam-timer'),
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                          decoration: BoxDecoration(
                            color: hurry ? AppColors.tryAgainSoft : AppColors.skySoft,
                            borderRadius: BorderRadius.circular(16),
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
                  // Ô số câu: chạm để chuyển nhanh; câu đã làm tô màu.
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
                                decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(AppSizes.radius)),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      '${item.problem.displayInstruction} (${_pts(item.points)} điểm)',
                                      style: const TextStyle(fontSize: 19, fontWeight: FontWeight.w700, color: AppColors.sky),
                                    ),
                                    const SizedBox(height: 8),
                                    Text(item.problem.prompt.text,
                                        style: const TextStyle(fontSize: AppSizes.promptFont, fontWeight: FontWeight.w700, height: 1.35)),
                                  ],
                                ),
                              ),
                              const SizedBox(height: 16),
                              KeyedSubtree(
                                key: ValueKey('exam-q-$i'),
                                child: buildAnswerView(
                                  problem: item.problem,
                                  state: const AnswerViewState(enabled: true, check: null, showCorrect: false),
                                  onChanged: (a) => _session.setAnswer(i, a),
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
                            icon: Icons.arrow_back_rounded,
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

String _pts(double p) => p == p.roundToDouble() ? '${p.toInt()}' : p.toString().replaceAll('.', ',');

// ===========================================================================
// Kết quả
// ===========================================================================

class ExamResultScreen extends StatelessWidget {
  const ExamResultScreen({super.key, required this.result, this.reward});

  final ExamResult result;
  final Future<RewardOutcome?>? reward;

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    final score = result.roundedScore;
    final weak = result.weakSkills();
    final skills = app.skillsById;
    final title = score >= 9
        ? 'Xuất sắc!'
        : score >= 7
            ? 'Làm tốt lắm!'
            : score >= 5
                ? 'Cố gắng thêm nhé!'
                : 'Mình cùng ôn lại nhé!';
    return Scaffold(
      appBar: AppBar(title: const Text('Kết quả'), backgroundColor: AppColors.cream, automaticallyImplyLeading: false),
      body: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 640),
          child: ListView(
            padding: const EdgeInsets.all(20),
            children: [
              if (result.timedOut)
                const Text('Hết giờ! Bài đã được nộp tự động.',
                    textAlign: TextAlign.center, style: TextStyle(fontSize: 18, color: AppColors.tryAgain)),
              Center(
                child: Container(
                  width: 150,
                  height: 150,
                  alignment: Alignment.center,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: score >= 5 ? AppColors.goodSoft : AppColors.tryAgainSoft,
                    border: Border.all(color: score >= 5 ? AppColors.good : AppColors.tryAgain, width: 6),
                  ),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text('$score', key: const ValueKey('exam-score'), style: const TextStyle(fontSize: 64, fontWeight: FontWeight.w700, height: 1)),
                      const Text('điểm', style: TextStyle(fontSize: 18)),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 8),
              Text(title, textAlign: TextAlign.center, style: const TextStyle(fontSize: 30, fontWeight: FontWeight.w700)),
              Text(
                'Đúng ${result.correctCount}/${result.items.length} câu · ${formatClock(result.usedSeconds)} phút'
                '\n(điểm chi tiết: ${result.rawScore.toStringAsFixed(2).replaceAll('.', ',')}/10)',
                textAlign: TextAlign.center,
                style: const TextStyle(fontSize: 18, color: Colors.black54),
              ),
              RewardBanner(reward: reward),
              const SizedBox(height: 16),
              if (weak.isNotEmpty) ...[
                const Text('Con cần ôn thêm:', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w700)),
                for (final w in weak)
                  Padding(
                    padding: const EdgeInsets.only(top: 6),
                    child: Row(
                      children: [
                        const Icon(Icons.flag_rounded, color: AppColors.tryAgain),
                        const SizedBox(width: 8),
                        Expanded(child: Text(skills[w.skillId]?.name ?? w.skillId, style: const TextStyle(fontSize: 19))),
                        Text('${w.correct}/${w.total}', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
                      ],
                    ),
                  ),
                const SizedBox(height: 16),
              ],
              const Text('Xem lại từng câu:', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w700)),
              for (final (k, r) in result.items.indexed)
                Card(
                  color: Colors.white,
                  child: ListTile(
                    key: ValueKey('review-$k'),
                    leading: Icon(
                      r.fullyCorrect ? Icons.check_circle : (r.earned > 0 ? Icons.adjust_rounded : Icons.cancel_rounded),
                      color: r.fullyCorrect ? AppColors.good : AppColors.tryAgain,
                      size: 34,
                    ),
                    title: Text('Câu ${k + 1}: ${r.item.problem.prompt.text}', maxLines: 2, overflow: TextOverflow.ellipsis),
                    subtitle: Text('${_pts(r.earned)}/${_pts(r.item.points)} điểm${r.answer == null ? ' · chưa làm' : ''}'),
                    trailing: const Icon(Icons.menu_book_rounded, color: AppColors.sky),
                    onTap: () => _showSolution(context, r, app),
                  ),
                ),
              const SizedBox(height: 16),
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
            const SizedBox(height: 12),
            // Hiện lại câu trả lời của bé, tô màu đúng/sai.
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
            SolutionPanel(
              problem: problem,
              locked: problem.solution.access == Access.vip && !app.isVip,
            ),
          ],
        ),
      ),
    );
  }
}
