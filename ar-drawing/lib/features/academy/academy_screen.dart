import 'dart:ui' as ui;

import 'package:flutter/material.dart';

import '../../core/app_theme.dart';
import '../../core/i18n/language_controller.dart';
import '../draw/draw_mode_sheet.dart';
import '../draw/draw_screen.dart';
import '../lessons/learning_path.dart';
import '../lessons/lesson.dart';
import '../lessons/widgets/lesson_card.dart';
import '../teacher/teacher_script.dart';
import '../lessons/lesson_progress_store.dart';
import '../teacher/teacher_controller.dart';
import '../teacher/teacher_scope.dart';
import '../teacher/widgets/teacher_overlay.dart';
import '../workspace/workspace_screen.dart';

/// Opens [lesson] after asking where to draw (paper + camera, or screen).
Future<void> openLesson(
  BuildContext context,
  Lesson lesson, {
  Widget Function(Lesson lesson, DrawMode mode)? builder,
}) async {
  final DrawMode? mode = await showDrawModeSheet(context);
  if (mode == null || !context.mounted) return;
  await Navigator.of(context).push(
    MaterialPageRoute<void>(
      builder: (_) =>
          builder?.call(lesson, mode) ??
          switch (mode) {
            DrawMode.camera => WorkspaceScreen(lesson: lesson),
            DrawMode.screen => DrawScreen(lesson: lesson),
          },
    ),
  );
}

/// The course library: lessons by level (basic shapes → masterclass) and
/// topic, each with a thumbnail and the learner's progress.
class AcademyScreen extends StatefulWidget {
  const AcademyScreen({super.key, required this.lessons, this.lessonBuilder});

  final List<Lesson> lessons;
  final Widget Function(Lesson lesson, DrawMode mode)? lessonBuilder;

  @override
  State<AcademyScreen> createState() => _AcademyScreenState();
}

class _AcademyScreenState extends State<AcademyScreen> {
  LessonLevel? _level;
  LessonTopic? _topic;
  final TeacherController _teacher = TeacherController();

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) _teacher.introduce(TeacherScope.maybeOf(context), 'path_intro');
    });
  }

  @override
  void dispose() {
    _teacher.dispose();
    super.dispose();
  }

  void _open(Lesson lesson) {
    openIfUnlocked(
      context,
      lesson,
      widget.lessons,
      (Lesson l) {
        _teacher.close();
        openLesson(context, l, builder: widget.lessonBuilder);
      },
      onLocked: () =>
          _teacher.say(const <TeacherLine>[TeacherLine(id: 'level_locked', mood: 'point')]),
    );
  }

  @override
  Widget build(BuildContext context) {
    final LessonProgressStore? progress = LessonProgressScope.maybeOf(context);
    final int percent = ((progress?.overall(widget.lessons) ?? 0) * 100).round();
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          title: Text(context.tr('academy.title')),
          bottom: TabBar(
            tabs: <Widget>[
              Tab(key: const Key('tabPath'), text: context.tr('path.path')),
              Tab(key: const Key('tabLibrary'), text: context.tr('path.library')),
            ],
          ),
        ),
        body: Stack(
          children: <Widget>[
            TabBarView(
              children: <Widget>[
                _PathView(
                  lessons: widget.lessons,
                  progress: progress,
                  percent: percent,
                  onOpen: _open,
                ),
                _library(context, progress, percent),
              ],
            ),
            Positioned.fill(child: TeacherOverlay(controller: _teacher)),
          ],
        ),
      ),
    );
  }

  Widget _library(BuildContext context, LessonProgressStore? progress, int percent) {
    final List<Lesson> visible = widget.lessons
        .where(
          (Lesson l) =>
              (_level == null || l.level == _level) && (_topic == null || l.topic == _topic),
        )
        .toList();
    final Set<LessonTopic> topics = widget.lessons.map((Lesson l) => l.topic).toSet();
    final ThemeData theme = Theme.of(context);
    return CustomScrollView(
      slivers: <Widget>[
        SliverToBoxAdapter(
          child: Padding(
            padding: const EdgeInsets.fromLTRB(20, 12, 20, 8),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Text(
                  context.tr('academy.subtitle'),
                  style: theme.textTheme.bodyMedium?.copyWith(color: Colors.white70),
                ),
                const SizedBox(height: 12),
                Text(
                  context.tr('academy.overall', args: <String, Object?>{'percent': percent}),
                  key: const Key('academyOverall'),
                  style: const TextStyle(fontWeight: FontWeight.w700),
                ),
                const SizedBox(height: 6),
                ClipRRect(
                  borderRadius: BorderRadius.circular(6),
                  child: LinearProgressIndicator(value: percent / 100, minHeight: 8),
                ),
              ],
            ),
          ),
        ),
        SliverToBoxAdapter(
          child: _ChipRow(
            children: <Widget>[
              _Chip(
                label: context.tr('academy.all'),
                selected: _level == null,
                onTap: () => setState(() => _level = null),
              ),
              for (final LessonLevel l in LessonLevel.values)
                _Chip(
                  key: Key('level-${l.name}'),
                  label: context.tr(l.labelKey),
                  selected: _level == l,
                  onTap: () => setState(() => _level = l),
                ),
            ],
          ),
        ),
        SliverToBoxAdapter(
          child: _ChipRow(
            children: <Widget>[
              _Chip(
                label: context.tr('academy.all'),
                icon: Icons.apps,
                selected: _topic == null,
                onTap: () => setState(() => _topic = null),
              ),
              for (final LessonTopic t in LessonTopic.values)
                if (topics.contains(t))
                  _Chip(
                    key: Key('topic-${t.name}'),
                    label: context.tr(t.labelKey),
                    icon: t.icon,
                    selected: _topic == t,
                    onTap: () => setState(() => _topic = t),
                  ),
            ],
          ),
        ),
        if (_level != null)
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(20, 4, 20, 0),
              child: Text(
                context.tr('academy.levelHint.${_level!.name}'),
                style: theme.textTheme.bodySmall?.copyWith(color: Colors.white70),
              ),
            ),
          ),
        SliverPadding(
          padding: const EdgeInsets.fromLTRB(16, 12, 16, 140),
          sliver: SliverGrid(
            gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
              maxCrossAxisExtent: 220,
              mainAxisSpacing: 12,
              crossAxisSpacing: 12,
              childAspectRatio: 0.66,
            ),
            delegate: SliverChildBuilderDelegate(
              (BuildContext context, int i) => LessonCard(
                lesson: visible[i],
                progress: progress,
                locked: !lessonUnlocked(visible[i], progress, widget.lessons),
                onTap: () => _open(visible[i]),
              ),
              childCount: visible.length,
            ),
          ),
        ),
      ],
    );
  }
}

/// The learning path: levels one after another, lessons as round stops on
/// a winding trail, with stars and padlocks.
class _PathView extends StatelessWidget {
  const _PathView({
    required this.lessons,
    required this.progress,
    required this.percent,
    required this.onOpen,
  });

  final List<Lesson> lessons;
  final LessonProgressStore? progress;
  final int percent;
  final void Function(Lesson lesson) onOpen;

  static const List<double> _swing = <double>[0, 0.55, 0.8, 0.3, -0.3, -0.8, -0.55];

  @override
  Widget build(BuildContext context) {
    final Lesson? next = nextLesson(lessons, progress);
    final List<Widget> children = <Widget>[
      Padding(
        padding: const EdgeInsets.fromLTRB(20, 14, 20, 6),
        child: Row(
          children: <Widget>[
            const Icon(Icons.star_rounded, color: Color(0xFFFFD24A)),
            const SizedBox(width: 4),
            Text(
              '${progress?.totalStars(lessons) ?? 0}/${lessons.length * 3}',
              key: const Key('pathStars'),
              style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 16),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: ClipRRect(
                borderRadius: BorderRadius.circular(6),
                child: LinearProgressIndicator(value: percent / 100, minHeight: 8),
              ),
            ),
            const SizedBox(width: 8),
            Text('$percent%', style: const TextStyle(fontWeight: FontWeight.w800)),
          ],
        ),
      ),
    ];
    int k = 0;
    for (final LessonLevel level in LessonLevel.values) {
      final List<Lesson> ls = lessons.where((Lesson l) => l.level == level).toList();
      if (ls.isEmpty) continue;
      final bool open = levelUnlocked(level, progress, lessons);
      final int done = ls.where((Lesson l) => progress?.isDone(l) ?? false).length;
      children.add(_LevelHeader(level: level, open: open, done: done, total: ls.length));
      for (int i = 0; i < ls.length; i++) {
        final double x = _swing[k % _swing.length];
        final double nx = i + 1 < ls.length ? _swing[(k + 1) % _swing.length] : x;
        children.add(
          _PathStop(
            lesson: ls[i],
            progress: progress,
            locked: !open,
            current: ls[i] == next,
            x: x,
            nextX: i + 1 < ls.length ? nx : null,
            onTap: () => onOpen(ls[i]),
          ),
        );
        k++;
      }
    }
    children.add(const SizedBox(height: 160));
    return ListView(children: children);
  }
}

class _LevelHeader extends StatelessWidget {
  const _LevelHeader({
    required this.level,
    required this.open,
    required this.done,
    required this.total,
  });

  final LessonLevel level;
  final bool open;
  final int done;
  final int total;

  @override
  Widget build(BuildContext context) {
    final Color c = levelColor(level);
    return Container(
      key: Key('levelHeader-${level.name}'),
      margin: const EdgeInsets.fromLTRB(16, 18, 16, 4),
      padding: const EdgeInsets.fromLTRB(14, 10, 14, 10),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: <Color>[c.withValues(alpha: 0.9), c.withValues(alpha: 0.35)],
        ),
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: const Color(0x33FFFFFF)),
      ),
      child: Row(
        children: <Widget>[
          Icon(open ? Icons.flag_rounded : Icons.lock_rounded, color: Colors.white),
          const SizedBox(width: 8),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Text(
                  context.tr(level.labelKey),
                  style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 17),
                ),
                Text(
                  open
                      ? context.tr('academy.levelHint.${level.name}')
                      : context.tr(
                          'path.lockedLevel',
                          args: <String, Object?>{
                            'count': kLessonsPerLevelGate,
                            'level': context
                                .tr(LessonLevel.values[level.index - 1].labelKey)
                                .toLowerCase(),
                          },
                        ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(color: Color(0xDDFFFFFF), fontSize: 12),
                ),
              ],
            ),
          ),
          const SizedBox(width: 8),
          Text('$done/$total', style: const TextStyle(fontWeight: FontWeight.w900)),
        ],
      ),
    );
  }
}

class _PathStop extends StatelessWidget {
  const _PathStop({
    required this.lesson,
    required this.progress,
    required this.locked,
    required this.current,
    required this.x,
    required this.nextX,
    required this.onTap,
  });

  final Lesson lesson;
  final LessonProgressStore? progress;
  final bool locked;
  final bool current;
  final double x;
  final double? nextX;
  final VoidCallback onTap;

  static const double height = 168;
  static const double node = 98;

  @override
  Widget build(BuildContext context) {
    final List<Color> colors = topicColors(lesson.topic);
    final bool done = progress?.isDone(lesson) ?? false;
    final double fraction = progress?.fraction(lesson) ?? 0;
    return SizedBox(
      height: height,
      child: LayoutBuilder(
        builder: (BuildContext context, BoxConstraints box) {
          final double w = box.maxWidth;
          double cx(double a) => w / 2 + a * (w / 2 - node / 2 - 24);
          return Stack(
            clipBehavior: Clip.none,
            children: <Widget>[
              if (nextX != null)
                Positioned.fill(
                  child: CustomPaint(
                    painter: _TrailPainter(
                      from: Offset(cx(x), node / 2 + 10),
                      to: Offset(cx(nextX!), height + node / 2 + 10),
                      done: done,
                    ),
                  ),
                ),
              Positioned(
                left: cx(x) - 80,
                width: 160,
                top: 10,
                child: GestureDetector(
                  key: Key('node-${lesson.id}'),
                  onTap: onTap,
                  child: Column(
                    children: <Widget>[
                      SizedBox(
                        width: node,
                        height: node,
                        child: Stack(
                          alignment: Alignment.center,
                          children: <Widget>[
                            Container(
                              width: node,
                              height: node,
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                gradient: LinearGradient(
                                  begin: Alignment.topLeft,
                                  end: Alignment.bottomRight,
                                  colors: locked
                                      ? const <Color>[Color(0xFF3A3760), Color(0xFF26234A)]
                                      : colors,
                                ),
                                border: current ? Border.all(color: AppTheme.gold, width: 3) : null,
                                boxShadow: <BoxShadow>[
                                  const BoxShadow(
                                    color: Color(0x66000000),
                                    blurRadius: 8,
                                    offset: Offset(0, 4),
                                  ),
                                ],
                              ),
                            ),
                            SizedBox(
                              width: node - 6,
                              height: node - 6,
                              child: CircularProgressIndicator(
                                value: fraction,
                                strokeWidth: 5,
                                backgroundColor: const Color(0x22FFFFFF),
                                color: done ? const Color(0xFF7CF0B4) : AppTheme.gold,
                              ),
                            ),
                            Container(
                              width: node - 20,
                              height: node - 20,
                              padding: const EdgeInsets.all(8),
                              decoration: const BoxDecoration(
                                shape: BoxShape.circle,
                                color: Color(0xFFFFFAF0),
                              ),
                              child: Opacity(
                                opacity: locked ? 0.35 : 1,
                                child: Image.asset(
                                  lesson.thumbnail,
                                  cacheWidth: 200,
                                  fit: BoxFit.contain,
                                ),
                              ),
                            ),
                            if (locked)
                              const Icon(Icons.lock_rounded, color: AppTheme.ink, size: 30),
                            if (current && !locked)
                              Positioned(
                                top: -2,
                                right: -2,
                                child: Container(
                                  padding: const EdgeInsets.all(5),
                                  decoration: const BoxDecoration(
                                    color: AppTheme.lamp,
                                    shape: BoxShape.circle,
                                  ),
                                  child: const Icon(
                                    Icons.play_arrow_rounded,
                                    size: 18,
                                    color: AppTheme.ink,
                                  ),
                                ),
                              ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 4),
                      StarRow(stars: progress?.stars(lesson) ?? 0, size: 18),
                      Text(
                        context.tr(lesson.titleKey),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontWeight: FontWeight.w800,
                          fontSize: 13,
                          color: locked ? Colors.white38 : Colors.white,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          );
        },
      ),
    );
  }
}

/// Dotted trail between two stops.
class _TrailPainter extends CustomPainter {
  _TrailPainter({required this.from, required this.to, required this.done});

  final Offset from, to;
  final bool done;

  @override
  void paint(Canvas canvas, Size size) {
    final Path path = Path()
      ..moveTo(from.dx, from.dy)
      ..cubicTo(from.dx, from.dy + 90, to.dx, to.dy - 90, to.dx, to.dy);
    final Paint dot = Paint()..color = done ? const Color(0xFFFFD27A) : const Color(0x55FFFFFF);
    for (final ui.PathMetric m in path.computeMetrics()) {
      for (double d = 56; d < m.length - 56; d += 14) {
        final ui.Tangent? t = m.getTangentForOffset(d);
        if (t != null) canvas.drawCircle(t.position, 3.2, dot);
      }
    }
  }

  @override
  bool shouldRepaint(_TrailPainter old) => old.from != from || old.to != to || old.done != done;
}

/// Lesson card: thumbnail, level, topic, progress bar and status.
class CourseCard extends StatelessWidget {
  const CourseCard({
    super.key,
    required this.lesson,
    required this.progress,
    required this.onTap,
    this.width,
  });

  final Lesson lesson;
  final LessonProgressStore? progress;
  final VoidCallback onTap;
  final double? width;

  @override
  Widget build(BuildContext context) {
    final double fraction = progress?.fraction(lesson) ?? 0;
    final bool done = progress?.isDone(lesson) ?? false;
    final bool started = progress?.isStarted(lesson) ?? false;
    final String status = done
        ? context.tr('academy.done')
        : started
        ? context.tr('academy.continue')
        : context.tr('academy.start');
    return SizedBox(
      width: width,
      child: Material(
        key: Key('lesson-${lesson.id}'),
        color: const Color(0xFFF7F3EA),
        borderRadius: BorderRadius.circular(18),
        clipBehavior: Clip.antiAlias,
        child: InkWell(
          onTap: onTap,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: <Widget>[
              Expanded(
                child: Stack(
                  children: <Widget>[
                    Positioned.fill(
                      child: Padding(
                        padding: const EdgeInsets.all(10),
                        child: Image.asset(lesson.thumbnail, fit: BoxFit.contain),
                      ),
                    ),
                    Positioned(
                      top: 8,
                      left: 8,
                      child: _Badge(text: context.tr(lesson.level.labelKey), level: lesson.level),
                    ),
                    if (done)
                      const Positioned(
                        top: 6,
                        right: 6,
                        child: Icon(Icons.check_circle, color: Color(0xFF2EAD6B), size: 26),
                      ),
                  ],
                ),
              ),
              Container(
                color: Colors.white,
                padding: const EdgeInsets.fromLTRB(10, 7, 10, 9),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Text(
                      context.tr(lesson.titleKey),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(color: AppTheme.ink, fontWeight: FontWeight.w800),
                    ),
                    const SizedBox(height: 2),
                    Row(
                      children: <Widget>[
                        Icon(lesson.topic.icon, size: 13, color: const Color(0x9914161F)),
                        const SizedBox(width: 4),
                        Expanded(
                          child: Text(
                            '${context.tr(lesson.topic.labelKey)} · ${context.tr('lesson.steps', args: <String, Object?>{'count': lesson.steps.length})}',
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: const TextStyle(color: Color(0x9914161F), fontSize: 11.5),
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
                        minHeight: 6,
                        backgroundColor: const Color(0x1414161F),
                        color: done ? const Color(0xFF2EAD6B) : const Color(0xFFFF9F43),
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      status,
                      style: TextStyle(
                        color: done ? const Color(0xFF2EAD6B) : const Color(0xFFB0661B),
                        fontSize: 12,
                        fontWeight: FontWeight.w800,
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
  }
}

class _Badge extends StatelessWidget {
  const _Badge({required this.text, required this.level});

  final String text;
  final LessonLevel level;

  @override
  Widget build(BuildContext context) {
    const List<Color> colors = <Color>[Color(0xFF2EAD6B), Color(0xFFFF9F43), Color(0xFF8E44AD)];
    return DecoratedBox(
      decoration: BoxDecoration(color: colors[level.index], borderRadius: BorderRadius.circular(8)),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
        child: Text(
          text,
          style: const TextStyle(color: Colors.white, fontSize: 10.5, fontWeight: FontWeight.w800),
        ),
      ),
    );
  }
}

class _ChipRow extends StatelessWidget {
  const _ChipRow({required this.children});

  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 46,
      child: ListView(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
        children: children,
      ),
    );
  }
}

class _Chip extends StatelessWidget {
  const _Chip({
    super.key,
    required this.label,
    required this.selected,
    required this.onTap,
    this.icon,
  });

  final String label;
  final bool selected;
  final VoidCallback onTap;
  final IconData? icon;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(right: 8),
      child: ChoiceChip(
        avatar: icon == null ? null : Icon(icon, size: 18),
        label: Text(label),
        selected: selected,
        showCheckmark: false,
        onSelected: (_) => onTap(),
      ),
    );
  }
}
