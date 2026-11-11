import 'dart:ui' as ui;

import 'package:flutter/material.dart';

import '../../core/game_art.dart';
import '../../core/i18n/language_controller.dart';
import '../game/energy_sheet.dart';
import '../game/game_store.dart';
import '../teacher/teacher_controller.dart';
import '../teacher/teacher_script.dart';
import '../teacher/widgets/teacher_overlay.dart';
import 'exam.dart';
import 'exam_scoring.dart';
import 'exam_screen.dart';

/// The report card: total out of 10, grade, the three criteria with bars and
/// advice, and the drawing next to the model.
class ExamResultScreen extends StatefulWidget {
  const ExamResultScreen({
    super.key,
    required this.exam,
    required this.score,
    required this.drawing,
    this.timeUp = false,
    this.reward,
    this.rankUp = false,
  });

  final ExamReward? reward;
  final bool rankUp;
  final Exam exam;
  final ExamScore score;
  final ui.Image drawing;
  final bool timeUp;

  @override
  State<ExamResultScreen> createState() => _ExamResultScreenState();

  static String adviceKey(Criterion c, double v) {
    final String level = v >= 0.75 ? 'high' : (v >= 0.45 ? 'mid' : 'low');
    return 'exam.advice.${c.name}.$level';
  }
}

class _ExamResultScreenState extends State<ExamResultScreen> {
  final TeacherController _teacher = TeacherController();

  Exam get exam => widget.exam;
  ExamScore get score => widget.score;
  ui.Image get drawing => widget.drawing;
  bool get timeUp => widget.timeUp;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      final String grade = score.gradeKey.split('.').last;
      _teacher.say(<TeacherLine>[
        if (widget.rankUp) const TeacherLine(id: 'rank_up', mood: 'cheer'),
        TeacherLine(id: 'result_$grade', mood: score.passed ? 'cheer' : 'happy'),
      ]);
    });
  }

  @override
  void dispose() {
    _teacher.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final ThemeData theme = Theme.of(context);
    final Color mark = score.passed ? const Color(0xFF2EAD6B) : const Color(0xFFE53935);
    return Scaffold(
      appBar: AppBar(title: Text(context.tr('exam.reportCard'))),
      body: Stack(
        children: <Widget>[
          ListView(
            padding: const EdgeInsets.fromLTRB(16, 8, 16, 140),
            children: <Widget>[
              Text(context.tr(exam.titleKey), style: theme.textTheme.titleMedium),
              const SizedBox(height: 4),
              Text(
                context.tr(exam.type.labelKey),
                style: theme.textTheme.bodySmall?.copyWith(color: Colors.white70),
              ),
              if (timeUp)
                Padding(
                  padding: const EdgeInsets.only(top: 8),
                  child: Text(
                    context.tr('exam.timeUp'),
                    style: const TextStyle(color: Color(0xFFFFB547)),
                  ),
                ),
              const SizedBox(height: 16),
              Row(
                children: <Widget>[
                  Container(
                    key: const Key('totalScore'),
                    width: 110,
                    height: 110,
                    alignment: Alignment.center,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      border: Border.all(color: mark, width: 6),
                    ),
                    child: Text(
                      score.total.toStringAsFixed(1),
                      style: TextStyle(fontSize: 34, fontWeight: FontWeight.w900, color: mark),
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        Text(context.tr('exam.outOf10'), style: theme.textTheme.bodySmall),
                        Text(
                          context.tr(score.gradeKey),
                          key: const Key('gradeLabel'),
                          style: theme.textTheme.headlineSmall?.copyWith(
                            fontWeight: FontWeight.w800,
                          ),
                        ),
                        Text(
                          context.tr(score.passed ? 'exam.passed' : 'exam.notPassed'),
                          style: TextStyle(color: mark, fontWeight: FontWeight.w700),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              if (widget.reward != null || widget.rankUp)
                Padding(
                  padding: const EdgeInsets.only(top: 12),
                  child: Wrap(
                    spacing: 8,
                    runSpacing: 6,
                    children: <Widget>[
                      if ((widget.reward?.coins ?? 0) > 0)
                        Chip(
                          key: const Key('coinsEarned'),
                          avatar: const ArtImage(GameArt.coin, size: 22),
                          label: Text(
                            context.tr(
                              'game.coinsEarned',
                              args: <String, Object?>{'coins': widget.reward!.coins},
                            ),
                          ),
                        ),
                      if (widget.reward?.lostBrush ?? false)
                        Chip(
                          key: const Key('brushLost'),
                          avatar: const Icon(Icons.brush, size: 18),
                          label: Text(context.tr('game.brushLost')),
                        ),
                      if (widget.rankUp)
                        Chip(
                          key: const Key('rankUpChip'),
                          avatar: ArtImage(GameArt.badge('excellent'), size: 22),
                          label: Text(context.tr('board.rankUp')),
                        ),
                    ],
                  ),
                ),
              const SizedBox(height: 20),
              for (final Criterion c in Criterion.values)
                if (score.criteria.containsKey(c) || exam.weights.containsKey(c))
                  _CriterionRow(
                    criterion: c,
                    value: score.criteria[c] ?? 0,
                    weight: exam.weights[c] ?? 0,
                    task: exam.task,
                  ),
              if (!exam.weights.containsKey(Criterion.color))
                Padding(
                  padding: const EdgeInsets.only(bottom: 12),
                  child: Text(
                    context.tr('exam.colorNotGraded'),
                    style: theme.textTheme.bodySmall?.copyWith(color: Colors.white60),
                  ),
                ),
              Text(
                context.tr('exam.creativityNote'),
                style: theme.textTheme.bodySmall?.copyWith(
                  color: Colors.white60,
                  fontStyle: FontStyle.italic,
                ),
              ),
              const SizedBox(height: 16),
              Row(
                children: <Widget>[
                  Expanded(
                    child: _Panel(
                      label: context.tr('exam.yourDrawing'),
                      child: RawImage(image: drawing),
                    ),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: _Panel(
                      label: context.tr('exam.model'),
                      child: Image.asset(exam.modelAsset),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 20),
              Row(
                children: <Widget>[
                  Expanded(
                    child: OutlinedButton.icon(
                      key: const Key('backToExams'),
                      onPressed: () => Navigator.of(context).pop(),
                      icon: const Icon(Icons.list_alt),
                      label: Text(context.tr('exam.backToList')),
                    ),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: FilledButton.icon(
                      key: const Key('retakeExam'),
                      onPressed: () {
                        final GameStore? game = GameScope.read(context);
                        if (game != null && !game.canTakeExam) {
                          showEnergySheet(context);
                          return;
                        }
                        Navigator.of(context).pushReplacement(
                          MaterialPageRoute<void>(builder: (_) => ExamScreen(exam: exam)),
                        );
                      },
                      icon: const Icon(Icons.replay),
                      label: Text(context.tr('exam.retake')),
                    ),
                  ),
                ],
              ),
            ],
          ),
          Positioned.fill(child: TeacherOverlay(controller: _teacher)),
        ],
      ),
    );
  }
}

class _CriterionRow extends StatelessWidget {
  const _CriterionRow({
    required this.criterion,
    required this.value,
    required this.weight,
    required this.task,
  });

  final Criterion criterion;
  final double value;
  final double weight;
  final ExamTask task;

  @override
  Widget build(BuildContext context) {
    final String labelKey = criterion == Criterion.proportion && task.printedOutline
        ? 'exam.criterion.neatness'
        : 'exam.criterion.${criterion.name}';
    final Color bar = value >= 0.75
        ? const Color(0xFF2EAD6B)
        : value >= 0.45
        ? const Color(0xFFFF9F43)
        : const Color(0xFFE53935);
    return Padding(
      key: Key('criterion-${criterion.name}'),
      padding: const EdgeInsets.only(bottom: 14),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Row(
            children: <Widget>[
              Expanded(
                child: Text(
                  '${context.tr(labelKey)} (${(weight * 100).round()}%)',
                  style: const TextStyle(fontWeight: FontWeight.w700),
                ),
              ),
              Text(
                '${(value * 10).toStringAsFixed(1)}/10',
                style: const TextStyle(fontWeight: FontWeight.w800),
              ),
            ],
          ),
          const SizedBox(height: 6),
          ClipRRect(
            borderRadius: BorderRadius.circular(5),
            child: LinearProgressIndicator(
              value: value,
              minHeight: 8,
              color: bar,
              backgroundColor: Colors.white12,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            context.tr(
              criterion == Criterion.proportion && task.printedOutline
                  ? 'exam.advice.neatness.${value >= 0.75 ? 'high' : (value >= 0.45 ? 'mid' : 'low')}'
                  : ExamResultScreen.adviceKey(criterion, value),
            ),
            style: const TextStyle(color: Colors.white70, fontSize: 13),
          ),
        ],
      ),
    );
  }
}

class _Panel extends StatelessWidget {
  const _Panel({required this.label, required this.child});

  final String label;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        AspectRatio(
          aspectRatio: 0.8,
          child: Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: const Color(0xFFFFFDF8),
              borderRadius: BorderRadius.circular(12),
            ),
            child: FittedBox(child: child),
          ),
        ),
        const SizedBox(height: 4),
        Text(label, style: const TextStyle(fontSize: 12, color: Colors.white70)),
      ],
    );
  }
}
