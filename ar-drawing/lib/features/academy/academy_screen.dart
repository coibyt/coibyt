import 'package:flutter/material.dart';

import '../../core/app_theme.dart';
import '../../core/i18n/language_controller.dart';
import '../draw/draw_mode_sheet.dart';
import '../draw/draw_screen.dart';
import '../lessons/lesson.dart';
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
      if (mounted) _teacher.introduce(TeacherScope.maybeOf(context), 'academy_intro');
    });
  }

  @override
  void dispose() {
    _teacher.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final LessonProgressStore? progress = LessonProgressScope.maybeOf(context);
    final List<Lesson> visible = widget.lessons
        .where(
          (Lesson l) =>
              (_level == null || l.level == _level) && (_topic == null || l.topic == _topic),
        )
        .toList();
    final Set<LessonTopic> topics = widget.lessons.map((Lesson l) => l.topic).toSet();
    final ThemeData theme = Theme.of(context);
    final int percent = ((progress?.overall(widget.lessons) ?? 0) * 100).round();

    return Scaffold(
      backgroundColor: AppTheme.ink,
      appBar: AppBar(backgroundColor: AppTheme.ink, title: Text(context.tr('academy.title'))),
      body: Stack(
        children: <Widget>[
          CustomScrollView(
            slivers: <Widget>[
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(20, 0, 20, 8),
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
                padding: const EdgeInsets.fromLTRB(16, 12, 16, 120),
                sliver: SliverGrid(
                  gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
                    maxCrossAxisExtent: 230,
                    mainAxisSpacing: 12,
                    crossAxisSpacing: 12,
                    childAspectRatio: 0.66,
                  ),
                  delegate: SliverChildBuilderDelegate(
                    (BuildContext context, int i) => CourseCard(
                      lesson: visible[i],
                      progress: progress,
                      onTap: () {
                        _teacher.close();
                        openLesson(context, visible[i], builder: widget.lessonBuilder);
                      },
                    ),
                    childCount: visible.length,
                  ),
                ),
              ),
            ],
          ),
          Positioned.fill(child: TeacherOverlay(controller: _teacher)),
        ],
      ),
    );
  }
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
