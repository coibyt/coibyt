import 'package:flutter/material.dart';

import '../../../core/app_theme.dart';
import '../../../core/i18n/language_controller.dart';
import '../learning_path.dart';
import '../lesson.dart';
import '../lesson_progress_store.dart';

/// Jewel gradient per topic, used by lesson cards and path nodes.
List<Color> topicColors(LessonTopic t) => switch (t) {
  LessonTopic.stillLife => const <Color>[Color(0xFF7A3E1D), Color(0xFFE0954B)],
  LessonTopic.animals => const <Color>[Color(0xFF155E3F), Color(0xFF3FBF84)],
  LessonTopic.portrait => const <Color>[Color(0xFF7E2152), Color(0xFFE0679A)],
  LessonTopic.landscape => const <Color>[Color(0xFF16507E), Color(0xFF45A2E0)],
  LessonTopic.vehicles => const <Color>[Color(0xFF2E3290), Color(0xFF7A7FF0)],
  LessonTopic.masters => const <Color>[Color(0xFF4B2D7E), Color(0xFFB98AE6)],
  LessonTopic.food => const <Color>[Color(0xFF9E2A3E), Color(0xFFFF8A7A)],
  LessonTopic.fantasy => const <Color>[Color(0xFF4A2290), Color(0xFFE07AD8)],
};

Color levelColor(LessonLevel l) => switch (l) {
  LessonLevel.basic => const Color(0xFF2EAD6B),
  LessonLevel.intermediate => const Color(0xFF3B82F6),
  LessonLevel.advanced => const Color(0xFFA855F7),
};

/// Three stars, filled for the ones earned.
class StarRow extends StatelessWidget {
  const StarRow({super.key, required this.stars, this.size = 16});

  final int stars;
  final double size;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: <Widget>[
        for (int i = 0; i < 3; i++)
          Icon(
            i < stars ? Icons.star_rounded : Icons.star_outline_rounded,
            size: size,
            color: i < stars ? const Color(0xFFFFD24A) : const Color(0x66FFFFFF),
            shadows: i < stars
                ? const <Shadow>[Shadow(color: Color(0x88FF9F43), blurRadius: 6)]
                : null,
          ),
      ],
    );
  }
}

/// Opens a lesson if its level is unlocked; otherwise explains what to do.
void openIfUnlocked(
  BuildContext context,
  Lesson lesson,
  List<Lesson> all,
  void Function(Lesson lesson) open, {
  VoidCallback? onLocked,
}) {
  final LessonProgressStore? store = LessonProgressScope.maybeOf(context);
  if (lessonUnlocked(lesson, store, all)) {
    open(lesson);
    return;
  }
  onLocked?.call();
  final LessonLevel before = LessonLevel.values[lesson.level.index - 1];
  ScaffoldMessenger.of(context)
    ..hideCurrentSnackBar()
    ..showSnackBar(
      SnackBar(
        key: const Key('lockedSnack'),
        backgroundColor: AppTheme.cardHigh,
        content: Row(
          children: <Widget>[
            const Icon(Icons.lock_rounded, color: AppTheme.gold),
            const SizedBox(width: 10),
            Expanded(
              child: Text(
                context.tr(
                  'path.lockedLevel',
                  args: <String, Object?>{
                    'count': kLessonsPerLevelGate,
                    'level': context.tr(before.labelKey).toLowerCase(),
                  },
                ),
                style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w700),
              ),
            ),
          ],
        ),
      ),
    );
}

/// A lesson card: the finished picture on paper inside a topic-coloured
/// frame, level, "new" ribbon, stars, progress and a lock when the level is
/// still closed.
class LessonCard extends StatelessWidget {
  const LessonCard({
    super.key,
    required this.lesson,
    required this.progress,
    required this.locked,
    required this.onTap,
    this.width,
  });

  final Lesson lesson;
  final LessonProgressStore? progress;
  final bool locked;
  final VoidCallback onTap;
  final double? width;

  @override
  Widget build(BuildContext context) {
    final double fraction = progress?.fraction(lesson) ?? 0;
    final bool done = progress?.isDone(lesson) ?? false;
    final bool started = progress?.isStarted(lesson) ?? false;
    final int stars = progress?.stars(lesson) ?? 0;
    final bool isNew = kNewLessons.contains(lesson.id) && !started;
    final List<Color> colors = topicColors(lesson.topic);
    final String status = done
        ? context.tr('academy.done')
        : started
        ? context.tr(
            'path.continueStep',
            args: <String, Object?>{
              'step': (progress?.reached(lesson) ?? 0) + 1,
              'total': lesson.steps.length,
            },
          )
        : context.tr('academy.start');
    return SizedBox(
      width: width,
      child: Material(
        key: Key('lesson-${lesson.id}'),
        color: Colors.transparent,
        borderRadius: BorderRadius.circular(22),
        clipBehavior: Clip.antiAlias,
        child: Ink(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: colors,
            ),
            borderRadius: BorderRadius.circular(22),
            border: Border.all(color: const Color(0x33FFFFFF)),
          ),
          child: InkWell(
            onTap: onTap,
            child: Stack(
              children: <Widget>[
                Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: <Widget>[
                    Expanded(
                      child: Padding(
                        padding: const EdgeInsets.fromLTRB(8, 8, 8, 0),
                        child: DecoratedBox(
                          decoration: BoxDecoration(
                            color: const Color(0xFFFFFAF0),
                            borderRadius: BorderRadius.circular(16),
                            boxShadow: const <BoxShadow>[
                              BoxShadow(
                                color: Color(0x40000000),
                                blurRadius: 8,
                                offset: Offset(0, 3),
                              ),
                            ],
                          ),
                          child: Padding(
                            padding: const EdgeInsets.all(8),
                            child: Image.asset(
                              lesson.thumbnail,
                              fit: BoxFit.contain,
                              cacheWidth: 300,
                              filterQuality: FilterQuality.medium,
                            ),
                          ),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.fromLTRB(10, 7, 10, 9),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          Text(
                            context.tr(lesson.titleKey),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: const TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.w900,
                              fontSize: 14.5,
                              shadows: <Shadow>[Shadow(color: Color(0x66000000), blurRadius: 4)],
                            ),
                          ),
                          const SizedBox(height: 3),
                          Row(
                            children: <Widget>[
                              StarRow(stars: stars, size: 15),
                              const SizedBox(width: 6),
                              Expanded(
                                child: Text(
                                  '${context.tr(lesson.topic.labelKey)} · ${context.tr('lesson.steps', args: <String, Object?>{'count': lesson.steps.length})}',
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                  style: const TextStyle(color: Color(0xCCFFFFFF), fontSize: 11),
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 6),
                          ClipRRect(
                            borderRadius: BorderRadius.circular(4),
                            child: LinearProgressIndicator(
                              key: Key('progress-${lesson.id}'),
                              value: fraction,
                              minHeight: 5,
                              backgroundColor: const Color(0x33FFFFFF),
                              color: done ? const Color(0xFF7CF0B4) : AppTheme.gold,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            status,
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: TextStyle(
                              color: done ? const Color(0xFF9CF5C8) : AppTheme.gold,
                              fontSize: 11.5,
                              fontWeight: FontWeight.w800,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                Positioned(
                  top: 14,
                  left: 14,
                  child: _Pill(
                    text: context.tr(lesson.level.labelKey),
                    color: levelColor(lesson.level),
                  ),
                ),
                if (isNew)
                  Positioned(
                    top: 14,
                    right: 14,
                    child: _Pill(text: context.tr('path.new'), color: const Color(0xFFFF4D6D)),
                  ),
                if (done)
                  const Positioned(
                    top: 12,
                    right: 12,
                    child: Icon(Icons.verified_rounded, color: Color(0xFF2EAD6B), size: 26),
                  ),
                if (locked)
                  Positioned.fill(
                    child: Container(
                      key: Key('locked-${lesson.id}'),
                      color: const Color(0xAA14122E),
                      alignment: Alignment.center,
                      child: Container(
                        padding: const EdgeInsets.all(12),
                        decoration: const BoxDecoration(
                          color: Color(0xCC2F2B66),
                          shape: BoxShape.circle,
                        ),
                        child: const Icon(Icons.lock_rounded, color: AppTheme.gold, size: 30),
                      ),
                    ),
                  ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _Pill extends StatelessWidget {
  const _Pill({required this.text, required this.color});

  final String text;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(10),
        boxShadow: const <BoxShadow>[BoxShadow(color: Color(0x33000000), blurRadius: 4)],
      ),
      child: Text(
        text,
        style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.w900),
      ),
    );
  }
}

/// Big "next lesson" card on the home screen.
class NextLessonHero extends StatelessWidget {
  const NextLessonHero({
    super.key,
    required this.lesson,
    required this.progress,
    required this.onTap,
    this.unlockHint = false,
  });

  final Lesson lesson;
  final LessonProgressStore? progress;
  final VoidCallback onTap;

  /// Shows that finishing this lesson unlocks the games.
  final bool unlockHint;

  @override
  Widget build(BuildContext context) {
    final List<Color> colors = topicColors(lesson.topic);
    final bool started = progress?.isStarted(lesson) ?? false;
    final int step = (progress?.reached(lesson) ?? -1) + 1;
    return Material(
      key: const Key('nextLessonHero'),
      color: Colors.transparent,
      borderRadius: BorderRadius.circular(28),
      clipBehavior: Clip.antiAlias,
      child: Ink(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: colors,
          ),
          borderRadius: BorderRadius.circular(28),
          border: Border.all(color: const Color(0x55FFD27A), width: 1.5),
          boxShadow: <BoxShadow>[
            BoxShadow(color: colors.last.withValues(alpha: 0.35), blurRadius: 24),
          ],
        ),
        child: InkWell(
          onTap: onTap,
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Row(
              children: <Widget>[
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Row(
                        children: <Widget>[
                          const Icon(Icons.auto_awesome, color: AppTheme.gold, size: 16),
                          const SizedBox(width: 4),
                          Flexible(
                            child: Text(
                              context.tr('path.next').toUpperCase(),
                              overflow: TextOverflow.ellipsis,
                              style: const TextStyle(
                                color: AppTheme.gold,
                                fontWeight: FontWeight.w900,
                                fontSize: 12,
                                letterSpacing: 1,
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 6),
                      Text(
                        context.tr(lesson.titleKey),
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 22,
                          fontWeight: FontWeight.w900,
                          height: 1.1,
                          shadows: <Shadow>[Shadow(color: Color(0x66000000), blurRadius: 6)],
                        ),
                      ),
                      const SizedBox(height: 6),
                      Wrap(
                        spacing: 6,
                        runSpacing: 4,
                        crossAxisAlignment: WrapCrossAlignment.center,
                        children: <Widget>[
                          _Pill(
                            text: context.tr(lesson.level.labelKey),
                            color: levelColor(lesson.level),
                          ),
                          StarRow(stars: progress?.stars(lesson) ?? 0),
                        ],
                      ),
                      if (unlockHint) ...<Widget>[
                        const SizedBox(height: 8),
                        Row(
                          children: <Widget>[
                            const Icon(Icons.lock_open_rounded, color: Colors.white, size: 15),
                            const SizedBox(width: 4),
                            Expanded(
                              child: Text(
                                context.tr('path.gamesUnlockHint'),
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontSize: 11.5,
                                  height: 1.2,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ],
                      const SizedBox(height: 12),
                      Container(
                        key: const Key('learnNow'),
                        padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 10),
                        decoration: BoxDecoration(
                          gradient: AppTheme.goldGradient,
                          borderRadius: BorderRadius.circular(30),
                          boxShadow: const <BoxShadow>[
                            BoxShadow(color: Color(0x55000000), blurRadius: 8),
                          ],
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: <Widget>[
                            const Icon(Icons.play_arrow_rounded, color: AppTheme.ink),
                            const SizedBox(width: 4),
                            Flexible(
                              child: Text(
                                started
                                    ? context.tr(
                                        'path.continueStep',
                                        args: <String, Object?>{
                                          'step': step,
                                          'total': lesson.steps.length,
                                        },
                                      )
                                    : context.tr('path.learnNow'),
                                overflow: TextOverflow.ellipsis,
                                style: const TextStyle(
                                  color: AppTheme.ink,
                                  fontWeight: FontWeight.w900,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(width: 12),
                Container(
                  width: 120,
                  height: 150,
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: const Color(0xFFFFFAF0),
                    borderRadius: BorderRadius.circular(20),
                    boxShadow: const <BoxShadow>[
                      BoxShadow(color: Color(0x55000000), blurRadius: 12, offset: Offset(0, 4)),
                    ],
                  ),
                  child: Image.asset(
                    lesson.thumbnail,
                    fit: BoxFit.contain,
                    filterQuality: FilterQuality.medium,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
