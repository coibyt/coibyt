import 'package:flutter/material.dart';

import '../../../core/i18n/language_controller.dart';
import '../lesson.dart';

/// Bottom panel of a lesson: step name and progress, the pencils to use in
/// real life, light direction, and Back / Next.
class LessonPanel extends StatelessWidget {
  const LessonPanel({super.key, required this.progress, required this.onFinish});

  final LessonProgress progress;
  final VoidCallback onFinish;

  @override
  Widget build(BuildContext context) {
    final LessonStep step = progress.step;
    final ColorScheme colors = Theme.of(context).colorScheme;
    return Material(
      key: const Key('lessonPanel'),
      color: colors.surface.withValues(alpha: 0.86),
      borderRadius: BorderRadius.circular(20),
      child: Padding(
        padding: const EdgeInsets.fromLTRB(6, 8, 6, 8),
        child: Row(
          children: <Widget>[
            IconButton(
              key: const Key('lessonPrev'),
              tooltip: context.tr('lesson.prev'),
              onPressed: progress.isFirst ? null : progress.previous,
              icon: const Icon(Icons.chevron_left),
            ),
            Expanded(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: <Widget>[
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      Flexible(
                        child: Text(
                          '${context.tr('lesson.stepOf', args: <String, Object?>{'current': progress.index + 1, 'total': progress.total})} · ${context.tr('lesson.kind.${step.kind.name}')}',
                          key: const Key('lessonStepTitle'),
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(fontWeight: FontWeight.w800),
                        ),
                      ),
                      const SizedBox(width: 6),
                      _LightBadge(direction: progress.lesson.light),
                    ],
                  ),
                  const SizedBox(height: 6),
                  _StepDots(index: progress.index, total: progress.total),
                  if (step.palette.isNotEmpty) ...<Widget>[
                    const SizedBox(height: 8),
                    PencilPalette(pencils: step.palette),
                  ],
                ],
              ),
            ),
            if (progress.isLast)
              IconButton.filled(
                key: const Key('lessonFinish'),
                tooltip: context.tr('lesson.finish'),
                onPressed: onFinish,
                icon: const Icon(Icons.check),
              )
            else
              IconButton.filled(
                key: const Key('lessonNext'),
                tooltip: context.tr('lesson.next'),
                onPressed: progress.next,
                icon: const Icon(Icons.chevron_right),
              ),
          ],
        ),
      ),
    );
  }
}

/// Swatches of the real colour pencils for this step, with their names.
class PencilPalette extends StatelessWidget {
  const PencilPalette({super.key, required this.pencils});

  final List<String> pencils;

  @override
  Widget build(BuildContext context) {
    return Wrap(
      key: const Key('pencilPalette'),
      alignment: WrapAlignment.center,
      spacing: 6,
      runSpacing: 6,
      children: <Widget>[
        for (final String id in pencils)
          DecoratedBox(
            decoration: BoxDecoration(
              color: Colors.black.withValues(alpha: 0.35),
              borderRadius: BorderRadius.circular(14),
            ),
            child: Padding(
              padding: const EdgeInsets.fromLTRB(4, 3, 9, 3),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: <Widget>[
                  Container(
                    width: 18,
                    height: 18,
                    decoration: BoxDecoration(
                      color: kPencilColors[id] ?? Colors.grey,
                      shape: BoxShape.circle,
                      border: Border.all(color: Colors.white70, width: 1.5),
                    ),
                  ),
                  const SizedBox(width: 5),
                  Text(
                    context.tr('pencil.$id'),
                    style: const TextStyle(fontSize: 12.5, fontWeight: FontWeight.w600),
                  ),
                ],
              ),
            ),
          ),
      ],
    );
  }
}

class _StepDots extends StatelessWidget {
  const _StepDots({required this.index, required this.total});

  final int index;
  final int total;

  @override
  Widget build(BuildContext context) {
    final Color active = Theme.of(context).colorScheme.primary;
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: <Widget>[
        for (int i = 0; i < total; i++)
          AnimatedContainer(
            duration: const Duration(milliseconds: 200),
            width: i == index ? 18 : 7,
            height: 7,
            margin: const EdgeInsets.symmetric(horizontal: 2),
            decoration: BoxDecoration(
              color: i <= index ? active : Colors.white24,
              borderRadius: BorderRadius.circular(4),
            ),
          ),
      ],
    );
  }
}

/// Small sun showing where the light comes from.
class _LightBadge extends StatelessWidget {
  const _LightBadge({required this.direction});

  final LightDirection direction;

  @override
  Widget build(BuildContext context) {
    return Tooltip(
      message: context.tr('lesson.lightTopLeft'),
      child: SizedBox(
        width: 26,
        height: 22,
        child: DecoratedBox(
          decoration: BoxDecoration(
            border: Border.all(color: Colors.white38),
            borderRadius: BorderRadius.circular(5),
          ),
          child: Align(
            alignment: direction.alignment,
            child: const Icon(Icons.wb_sunny, size: 13, color: Color(0xFFFFC93C)),
          ),
        ),
      ),
    );
  }
}
