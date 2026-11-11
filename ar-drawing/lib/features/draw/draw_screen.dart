import 'dart:async';

import 'package:flutter/material.dart';

import '../../core/i18n/language_controller.dart';
import '../lessons/lesson.dart';
import '../lessons/lesson_progress_store.dart';
import '../lessons/widgets/lesson_panel.dart';
import '../teacher/teacher_controller.dart';
import '../teacher/teacher_scope.dart';
import '../teacher/widgets/teacher_overlay.dart';
import 'drawing_controller.dart';
import 'onboarding_tour.dart';
import 'widgets/draw_toolbar.dart';
import 'widgets/drawing_canvas.dart';

/// The digital drawing board, for learners without paper or pencils.
///
/// Two layers on a sheet of "paper":
/// - background: the picture to trace, faded (adjustable, can be hidden);
/// - foreground: the learner's own strokes (brush / eraser, undo / redo).
///
/// With a [lesson], the background follows the lesson's steps (outline →
/// base colours → shadows → highlights), the palette offers the exact
/// shades of each step, and Lumi explains what to do.
class DrawScreen extends StatefulWidget {
  const DrawScreen({super.key, this.template, this.lesson, this.forceTour = false});

  /// Picture to trace (template, processed photo). Null = blank paper.
  final ImageProvider? template;
  final Lesson? lesson;

  /// Start the guided tour even if it was seen before.
  final bool forceTour;

  @override
  State<DrawScreen> createState() => _DrawScreenState();
}

class _DrawScreenState extends State<DrawScreen> {
  static const Color paper = Color(0xFFFFFDF8);

  final DrawingController _drawing = DrawingController();
  final TeacherController _teacher = TeacherController();
  final DrawToolbarKeys _keys = DrawToolbarKeys();
  LessonProgress? _progress;
  OnboardingTour? _tour;
  bool _showTemplate = true;
  double _templateOpacity = 0.35;

  @override
  void initState() {
    super.initState();
    final Lesson? lesson = widget.lesson;
    if (lesson != null) {
      _progress = LessonProgress(lesson)..addListener(_onStepChanged);
    }
    WidgetsBinding.instance.addPostFrameCallback((_) => _start());
  }

  void _start() {
    if (!mounted) return;
    final TeacherServices? services = TeacherScope.maybeOf(context);
    final bool firstTime = services != null && !services.hasSeen(OnboardingTour.scriptId);
    if (widget.forceTour || (firstTime && widget.lesson == null)) {
      _startTour();
      return;
    }
    final LessonProgress? progress = _progress;
    if (progress != null) {
      _teacher.say(progress.step.lines);
      _recordProgress();
    } else {
      _teacher.introduce(services, 'draw_intro');
    }
  }

  void _startTour() {
    final TeacherServices? services = TeacherScope.maybeOf(context);
    services?.markSeen(OnboardingTour.scriptId);
    setState(() {
      _tour = OnboardingTour(
        drawing: _drawing,
        teacher: _teacher,
        keys: _keys,
        onFinished: () {
          if (mounted) setState(() => _tour = null);
        },
      )..start();
    });
  }

  void _onStepChanged() {
    setState(() {});
    _teacher.say(_progress!.step.lines);
    _recordProgress();
  }

  void _recordProgress() {
    final LessonProgress? p = _progress;
    if (p == null) return;
    unawaited(LessonProgressScope.maybeOf(context)?.record(p.lesson, p.index));
  }

  @override
  void dispose() {
    _tour?.dispose();
    _progress?.dispose();
    _teacher.dispose();
    _drawing.dispose();
    super.dispose();
  }

  ImageProvider? get _background {
    final LessonProgress? p = _progress;
    if (p != null) return AssetImage(p.step.overlay);
    return widget.template;
  }

  Future<void> _confirmClear() async {
    final bool? ok = await showDialog<bool>(
      context: context,
      builder: (BuildContext context) => AlertDialog(
        title: Text(context.tr('draw.clearTitle')),
        content: Text(context.tr('draw.clearBody')),
        actions: <Widget>[
          TextButton(
            onPressed: () => Navigator.of(context).pop(false),
            child: Text(context.tr('draw.cancel')),
          ),
          FilledButton(
            key: const Key('confirmClear'),
            onPressed: () => Navigator.of(context).pop(true),
            child: Text(context.tr('draw.clear')),
          ),
        ],
      ),
    );
    if (ok ?? false) _drawing.clear();
  }

  void _showLayers() {
    showModalBottomSheet<void>(
      context: context,
      showDragHandle: true,
      builder: (BuildContext context) => StatefulBuilder(
        builder: (BuildContext context, StateSetter setSheet) {
          void update(VoidCallback f) {
            setState(f);
            setSheet(() {});
          }

          return SafeArea(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(20, 0, 20, 16),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Text(context.tr('draw.layers'), style: Theme.of(context).textTheme.titleLarge),
                  const SizedBox(height: 8),
                  ListTile(
                    contentPadding: EdgeInsets.zero,
                    leading: const Icon(Icons.brush),
                    title: Text(context.tr('draw.layerDrawing')),
                    subtitle: Text(context.tr('draw.layerDrawingHint')),
                  ),
                  SwitchListTile(
                    key: const Key('templateVisible'),
                    contentPadding: EdgeInsets.zero,
                    secondary: const Icon(Icons.image_outlined),
                    title: Text(context.tr('draw.layerTemplate')),
                    value: _showTemplate,
                    onChanged: _background == null
                        ? null
                        : (bool v) => update(() => _showTemplate = v),
                  ),
                  Row(
                    children: <Widget>[
                      const SizedBox(width: 4),
                      const Icon(Icons.opacity, size: 20),
                      Expanded(
                        child: Slider(
                          key: const Key('templateOpacity'),
                          value: _templateOpacity,
                          min: 0.05,
                          max: 1,
                          onChanged: _background == null || !_showTemplate
                              ? null
                              : (double v) => update(() => _templateOpacity = v),
                        ),
                      ),
                      Text('${(_templateOpacity * 100).round()}%'),
                    ],
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final ImageProvider? background = _background;
    final LessonProgress? progress = _progress;
    final OnboardingTour? tour = _tour;
    return Stack(
      children: <Widget>[
        Scaffold(
          appBar: AppBar(
            title: Text(
              progress != null ? context.tr(progress.lesson.titleKey) : context.tr('draw.title'),
              overflow: TextOverflow.ellipsis,
            ),
            actions: <Widget>[
              ListenableBuilder(
                listenable: _drawing,
                builder: (BuildContext context, _) => Row(
                  mainAxisSize: MainAxisSize.min,
                  children: <Widget>[
                    IconButton(
                      key: _keys.undo,
                      tooltip: context.tr('draw.undo'),
                      onPressed: _drawing.canUndo ? _drawing.undo : null,
                      icon: const Icon(Icons.undo),
                    ),
                    IconButton(
                      key: const Key('redoButton'),
                      tooltip: context.tr('draw.redo'),
                      onPressed: _drawing.canRedo ? _drawing.redo : null,
                      icon: const Icon(Icons.redo),
                    ),
                  ],
                ),
              ),
              IconButton(
                key: const Key('layersButton'),
                tooltip: context.tr('draw.layers'),
                onPressed: _showLayers,
                icon: const Icon(Icons.layers),
              ),
              PopupMenuButton<String>(
                key: const Key('drawMenu'),
                onSelected: (String v) {
                  if (v == 'clear') unawaited(_confirmClear());
                  if (v == 'tour') _startTour();
                },
                itemBuilder: (BuildContext context) => <PopupMenuEntry<String>>[
                  PopupMenuItem<String>(
                    value: 'clear',
                    child: ListTile(
                      leading: const Icon(Icons.delete_outline),
                      title: Text(context.tr('draw.clear')),
                    ),
                  ),
                  PopupMenuItem<String>(
                    value: 'tour',
                    child: ListTile(
                      leading: const Icon(Icons.school_outlined),
                      title: Text(context.tr('draw.tour')),
                    ),
                  ),
                ],
              ),
            ],
          ),
          body: Column(
            children: <Widget>[
              Expanded(
                child: Stack(
                  fit: StackFit.expand,
                  children: <Widget>[
                    // Paper.
                    const ColoredBox(color: paper),
                    // Layer 1: the picture to trace, faded.
                    if (background != null && _showTemplate)
                      IgnorePointer(
                        child: Padding(
                          padding: const EdgeInsets.all(16),
                          child: Image(
                            key: const Key('templateLayer'),
                            image: background,
                            fit: BoxFit.contain,
                            opacity: AlwaysStoppedAnimation<double>(_templateOpacity),
                            gaplessPlayback: true,
                          ),
                        ),
                      ),
                    // Layer 2: the learner's drawing.
                    DrawingCanvas(key: _keys.canvas, controller: _drawing),
                    // Lumi and the tour spotlight.
                    Positioned(
                      key: const Key('drawTeacher'),
                      left: 0,
                      right: 0,
                      bottom: 8,
                      child: TeacherOverlay(
                        controller: _teacher,
                        inline: true,
                        collapsedAlignment: Alignment.bottomRight,
                        autoAdvance: _tour == null ? const Duration(seconds: 2) : null,
                      ),
                    ),
                  ],
                ),
              ),
              if (progress != null)
                Padding(
                  padding: const EdgeInsets.fromLTRB(8, 6, 8, 0),
                  child: ListenableBuilder(
                    listenable: _drawing,
                    builder: (BuildContext context, _) => LessonPanel(
                      progress: progress,
                      onFinish: () => Navigator.of(context).maybePop(),
                      onPickColor: (Color c) => _drawing.color = c,
                      selectedColor: _drawing.color,
                    ),
                  ),
                ),
              DrawToolbar(controller: _drawing, keys: _keys),
            ],
          ),
        ),
        // Tour highlight above everything (toolbar, app bar), never blocking.
        if (tour != null) Positioned.fill(child: TourSpotlight(tour: tour)),
      ],
    );
  }
}
