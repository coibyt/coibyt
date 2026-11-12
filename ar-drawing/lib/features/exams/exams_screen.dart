import 'package:flutter/material.dart';

import '../../core/app_theme.dart';
import '../../core/game_art.dart';
import '../../core/i18n/language_controller.dart';
import '../game/energy_sheet.dart';
import '../game/game_store.dart';
import '../teacher/teacher_controller.dart';
import '../teacher/teacher_script.dart';
import '../teacher/teacher_scope.dart';
import '../teacher/widgets/teacher_overlay.dart';
import '../english/english_quiz.dart';
import 'exam.dart';
import 'exam_record_store.dart';
import 'exam_screen.dart';

/// "Exam hall": 15-minute tests, one-period tests, mid-term and end-of-term
/// exams, each with the best mark so far.
class ExamsScreen extends StatefulWidget {
  const ExamsScreen({super.key, required this.exams, this.examBuilder});

  final List<Exam> exams;
  final Widget Function(Exam exam)? examBuilder;

  @override
  State<ExamsScreen> createState() => _ExamsScreenState();
}

class _ExamsScreenState extends State<ExamsScreen> {
  final TeacherController _teacher = TeacherController();

  List<Exam> get exams => widget.exams;
  Widget Function(Exam exam)? get examBuilder => widget.examBuilder;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) _teacher.introduce(TeacherScope.maybeOf(context), 'exam_hall_intro');
    });
  }

  @override
  void dispose() {
    _teacher.dispose();
    super.dispose();
  }

  Future<void> _start(BuildContext context, Exam exam) async {
    final GameStore? game = GameScope.read(context);
    if (game != null && !game.canTakeExam) {
      _teacher.say(const <TeacherLine>[TeacherLine(id: 'energy_empty', mood: 'happy')]);
      await showEnergySheet(context);
      return;
    }
    // A quick English magic word before playing.
    if (!await passMagicWord(context) || !context.mounted) return;
    final bool? go = await showDialog<bool>(
      context: context,
      builder: (BuildContext context) => AlertDialog(
        title: Text(context.tr(exam.titleKey)),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Text(context.tr('exam.task.${exam.task.name}')),
            const SizedBox(height: 10),
            Text(
              context.tr(
                'exam.rules',
                args: <String, Object?>{'minutes': exam.timeLimit.inMinutes},
              ),
            ),
            const SizedBox(height: 10),
            for (final MapEntry<Criterion, double> w in exam.weights.entries)
              Text(
                '• ${context.tr(w.key == Criterion.proportion && exam.task.printedOutline ? 'exam.criterion.neatness' : 'exam.criterion.${w.key.name}')}: ${(w.value * 100).round()}%',
              ),
            if (game != null) ...<Widget>[
              const SizedBox(height: 10),
              Text(context.tr('game.examCost'), style: const TextStyle(color: Color(0xFFFF9F43))),
            ],
          ],
        ),
        actions: <Widget>[
          TextButton(
            onPressed: () => Navigator.of(context).pop(false),
            child: Text(context.tr('draw.cancel')),
          ),
          FilledButton(
            key: const Key('startExam'),
            onPressed: () => Navigator.of(context).pop(true),
            child: Text(context.tr('exam.start')),
          ),
        ],
      ),
    );
    if (!(go ?? false) || !context.mounted) return;
    _teacher.close();
    await Navigator.of(context).push(
      MaterialPageRoute<void>(builder: (_) => examBuilder?.call(exam) ?? ExamScreen(exam: exam)),
    );
  }

  @override
  Widget build(BuildContext context) {
    final ExamRecordStore? records = ExamRecordScope.maybeOf(context);
    final GameStore? game = GameScope.maybeOf(context);
    final ThemeData theme = Theme.of(context);
    return Scaffold(
      backgroundColor: AppTheme.ink,
      appBar: AppBar(
        backgroundColor: AppTheme.ink,
        title: Text(context.tr('exam.hall')),
        actions: <Widget>[
          if (game != null)
            TextButton.icon(
              key: const Key('hallBrushes'),
              onPressed: () => showEnergySheet(context),
              icon: const ArtImage(GameArt.energy, size: 28),
              label: Text(
                '${game.brushes}/${GameStore.maxBrushes}',
                style: const TextStyle(color: Colors.white),
              ),
            ),
        ],
      ),
      body: Stack(
        children: <Widget>[
          ListView(
            padding: const EdgeInsets.fromLTRB(16, 0, 16, 24),
            children: <Widget>[
              Text(
                context.tr('exam.hallHint'),
                style: theme.textTheme.bodyMedium?.copyWith(color: Colors.white70),
              ),
              for (final ExamType type in ExamType.values) ...<Widget>[
                Padding(
                  padding: const EdgeInsets.fromLTRB(4, 20, 4, 8),
                  child: Row(
                    children: <Widget>[
                      ArtImage(
                        GameArt.examType(type == ExamType.finalExam ? 'final' : type.name),
                        size: 44,
                      ),
                      const SizedBox(width: 10),
                      Expanded(
                        child: Text(context.tr(type.labelKey), style: theme.textTheme.titleLarge),
                      ),
                      Text(
                        context.tr(
                          'exam.minutes',
                          args: <String, Object?>{'minutes': type.minutes},
                        ),
                        style: const TextStyle(color: Colors.white70),
                      ),
                    ],
                  ),
                ),
                for (final Exam exam in exams.where((Exam e) => e.type == type))
                  Padding(
                    padding: const EdgeInsets.only(bottom: 10),
                    child: _ExamCard(
                      exam: exam,
                      best: records?.best(exam.id)?.total,
                      attempts: records?.attemptsOf(exam.id) ?? 0,
                      onTap: () => _start(context, exam),
                    ),
                  ),
              ],
            ],
          ),
          Positioned.fill(child: TeacherOverlay(controller: _teacher)),
        ],
      ),
    );
  }
}

class _ExamCard extends StatelessWidget {
  const _ExamCard({
    required this.exam,
    required this.best,
    required this.attempts,
    required this.onTap,
  });

  final Exam exam;
  final double? best;
  final int attempts;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final double? b = best;
    final Color chip = b == null
        ? Colors.white24
        : b >= Exam.passMark
        ? const Color(0xFF2EAD6B)
        : const Color(0xFFE53935);
    return Material(
      key: Key('exam-${exam.id}'),
      color: AppTheme.card,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20),
        side: const BorderSide(color: AppTheme.line),
      ),
      child: InkWell(
        borderRadius: BorderRadius.circular(20),
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.all(10),
          child: Row(
            children: <Widget>[
              Container(
                width: 64,
                height: 64,
                padding: const EdgeInsets.all(4),
                decoration: BoxDecoration(
                  color: const Color(0xFFF7F3EA),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Image.asset(exam.thumbnail, fit: BoxFit.contain),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Text(
                      context.tr(exam.titleKey),
                      style: const TextStyle(fontWeight: FontWeight.w800),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      context.tr('exam.task.${exam.task.name}'),
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(color: Colors.white70, fontSize: 12.5),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 8),
              Column(
                children: <Widget>[
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(color: chip, borderRadius: BorderRadius.circular(10)),
                    child: Text(
                      b == null ? context.tr('exam.notTaken') : b.toStringAsFixed(1),
                      style: const TextStyle(fontWeight: FontWeight.w800),
                    ),
                  ),
                  if (attempts > 0)
                    Text(
                      context.tr('exam.attempts', args: <String, Object?>{'count': attempts}),
                      style: const TextStyle(color: Colors.white54, fontSize: 11),
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
