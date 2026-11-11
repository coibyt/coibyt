import 'dart:async';

import 'package:flutter/material.dart';

import '../../core/i18n/language_controller.dart';
import '../game/game_store.dart';
import '../game/goals.dart';
import '../../core/app_theme.dart';
import '../../core/game_art.dart';
import '../lessons/lesson.dart';
import '../lessons/lesson_demo.dart';
import '../lessons/widgets/demo_view.dart';
import '../lessons/lesson_progress_store.dart';
import '../lessons/widgets/lesson_panel.dart';
import '../teacher/hint_coach.dart';
import '../teacher/teacher_controller.dart';
import '../teacher/teacher_script.dart';
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
  HintCoach? _coach;
  final PraiseRotator _praise = PraiseRotator();
  int _strokesAtStep = 0;
  int _lastStep = 0;
  bool _showTemplate = true;
  double _templateOpacity = 0.35;

  // Lumi's demonstration ("watch me first"), then the learner's turn.
  LessonDemo? _demo;
  int? _demoIndex;
  final Set<int> _demoed = <int>{};
  bool _waitingDemo = false;
  List<Offset> _samples = const <Offset>[];
  double _sampleBrush = 0;
  double _coverage = 0;
  bool _saidHalf = false, _saidReady = false;
  Size _canvasSize = Size.zero;

  @override
  void initState() {
    super.initState();
    final Lesson? lesson = widget.lesson;
    if (lesson != null) {
      _progress = LessonProgress(lesson)..addListener(_onStepChanged);
      _coach = HintCoach(
        drawing: _drawing,
        teacher: _teacher,
        modelColors: _stepColors(lesson.steps.first),
      );
    }
    _drawing.addListener(_onInk);
    if (lesson != null) unawaited(_loadDemo(lesson));
    WidgetsBinding.instance.addPostFrameCallback((_) => _start());
  }

  Future<void> _loadDemo(Lesson lesson) async {
    final LessonDemo? demo = await LessonDemo.load(lesson);
    if (!mounted) return;
    if (demo == null) {
      if (_waitingDemo) {
        _waitingDemo = false;
        _teacher.say(_progress!.step.lines);
      }
      return;
    }
    setState(() => _demo = demo);
    _prepareStep();
    if (_waitingDemo) {
      _waitingDemo = false;
      final TeacherLine? intro = _beginDemo();
      _teacher.say(intro != null ? <TeacherLine>[intro] : _progress!.step.lines);
    } else if (_demoIndex == null && _drawing.strokes.length == _strokesAtStep) {
      // Slow network: the demo arrived late, but nothing is drawn yet.
      final TeacherLine? intro = _beginDemo();
      if (intro != null) _teacher.say(<TeacherLine>[intro]);
    }
  }

  DemoStep? get _currentDemo {
    final LessonProgress? p = _progress;
    return p == null ? null : _demo?.forStep(p.step);
  }

  /// Starts the demonstration of the current step if Lumi has not shown it
  /// yet (or [again]). Returns her introduction line.
  TeacherLine? _beginDemo({bool again = false}) {
    final LessonProgress? p = _progress;
    if (p == null || _tour != null || _currentDemo == null) return null;
    if (!again && _demoed.contains(p.index)) return null;
    _demoed.add(p.index);
    setState(() => _demoIndex = p.index);
    return TeacherLine(id: 'demo_intro_${p.step.kind.name}', mood: 'paint');
  }

  void _replayDemo() {
    final TeacherLine? intro = _beginDemo(again: true);
    if (intro != null) _teacher.say(<TeacherLine>[intro]);
  }

  void _onDemoFinished() {
    if (!mounted) return;
    final LessonProgress? p = _progress;
    setState(() => _demoIndex = null);
    _teacher.say(<TeacherLine>[
      const TeacherLine(id: 'demo_your_turn', mood: 'point'),
      ...?p?.step.lines,
    ]);
  }

  /// Checkpoints of the new step, to follow the learner's progress.
  void _prepareStep() {
    final DemoStep? d = _currentDemo;
    _samples = d?.samples() ?? const <Offset>[];
    _sampleBrush = d == null || d.strokes.isEmpty
        ? 0
        : d.strokes.map((DemoStroke s) => s.width).reduce((double a, double b) => a + b) /
              d.strokes.length;
    _coverage = 0;
    _saidHalf = _saidReady = false;
  }

  void _measure() {
    final DemoStep? d = _currentDemo;
    if (d == null || _samples.isEmpty || _canvasSize.isEmpty || _demoIndex != null) return;
    final double c = stepCoverage(
      samples: _samples,
      demoBrush: _sampleBrush,
      picture: pictureRect(_canvasSize, d.aspect),
      strokes: _drawing.strokes.skip(_strokesAtStep).toList(),
      canvasWidth: _canvasSize.width,
    );
    if ((c - _coverage).abs() >= 0.01) setState(() => _coverage = c);
    if (c >= 0.85 && !_saidReady) {
      _saidReady = _saidHalf = true;
      _teacher.say(const <TeacherLine>[TeacherLine(id: 'step_ready', mood: 'cheer')]);
    } else if (c >= 0.5 && !_saidHalf) {
      _saidHalf = true;
      _teacher.say(const <TeacherLine>[TeacherLine(id: 'step_half', mood: 'happy')]);
    }
  }

  /// Drawing counts as today's creative activity (daily streak).
  void _onInk() {
    final GameStore? game = GameScope.read(context);
    if (game == null || _drawing.isDrawing) return;
    if (!game.activeToday && _drawing.strokes.isNotEmpty) unawaited(game.recordActivity());
    final int n = _drawing.strokes.length;
    if (n > _inked) unawaited(game.track(GameEvent.stroke, n - _inked));
    if (n != _inked) _measure();
    _inked = n;
  }

  /// Strokes already counted for quests and badges.
  int _inked = 0;

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
      if (_demo == null) {
        // Wait a moment for the demonstration to load (tiny JSON asset).
        _waitingDemo = true;
        Future<void>.delayed(const Duration(milliseconds: 3000), () {
          if (!mounted || !_waitingDemo) return;
          _waitingDemo = false;
          _teacher.say(progress.step.lines);
        });
      } else {
        final TeacherLine? intro = _beginDemo();
        _teacher.say(intro != null ? <TeacherLine>[intro] : progress.step.lines);
      }
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

  /// Colours the tutor compares picks with (white highlight and the
  /// graphite outline step don't need hints).
  List<Color> _stepColors(LessonStep step) => step.kind == StepKind.outline
      ? const <Color>[]
      : <Color>[for (final PaletteColor p in step.palette) p.color];

  void _onStepChanged() {
    setState(() {});
    final LessonProgress p = _progress!;
    final bool forward = p.index > _lastStep;
    final bool drewSomething = _drawing.strokes.length > _strokesAtStep;
    _lastStep = p.index;
    _strokesAtStep = _drawing.strokes.length;
    if (forward) unawaited(GameScope.read(context)?.track(GameEvent.lessonStep));
    _coach?.modelColors = _stepColors(p.step);
    // Praise real work when moving on, then explain the new step.
    _prepareStep();
    final TeacherLine? intro = _beginDemo();
    _teacher.say(<TeacherLine>[
      if (forward && drewSomething && p.step.kind != StepKind.done) _praise.next(),
      if (intro != null) intro else ...p.step.lines,
    ]);
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
    _coach?.dispose();
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
                child: LayoutBuilder(
                  builder: (BuildContext context, BoxConstraints box) {
                    _canvasSize = box.biggest;
                    return Stack(
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
                        // Learner's turn: replay the demo, see how much is done.
                        if (progress != null && _currentDemo != null && _demoIndex == null)
                          Positioned(
                            top: 8,
                            left: 8,
                            right: 8,
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: <Widget>[
                                Flexible(
                                  child: _GlassChip(
                                    key: const Key('replayDemo'),
                                    onTap: _replayDemo,
                                    child: Row(
                                      mainAxisSize: MainAxisSize.min,
                                      children: <Widget>[
                                        const ArtImage(GameArt.magicBrush, size: 26),
                                        const SizedBox(width: 6),
                                        Flexible(
                                          child: Text(
                                            context.tr('lesson.demo.watch'),
                                            maxLines: 1,
                                            overflow: TextOverflow.ellipsis,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                                const SizedBox(width: 8),
                                _GlassChip(
                                  key: const Key('stepCoverage'),
                                  child: Row(
                                    mainAxisSize: MainAxisSize.min,
                                    children: <Widget>[
                                      SizedBox(
                                        width: 20,
                                        height: 20,
                                        child: CircularProgressIndicator(
                                          value: _coverage,
                                          strokeWidth: 3,
                                          backgroundColor: const Color(0x33FFFFFF),
                                          color: _coverage >= 0.85 ? AppTheme.teal : AppTheme.lamp,
                                        ),
                                      ),
                                      const SizedBox(width: 8),
                                      Text(
                                        context.tr(
                                          'lesson.demo.coverage',
                                          args: <String, Object?>{
                                            'percent': (_coverage * 100).round(),
                                          },
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          ),
                        // Lumi draws the step first.
                        if (progress != null && _demoIndex != null && _currentDemo != null)
                          Positioned.fill(
                            child: DemoView(
                              key: ValueKey<int>(_demoIndex!),
                              step: _currentDemo!,
                              target: progress.step.overlay,
                              previous: progress.index > 0 && progress.step.kind != StepKind.outline
                                  ? progress.lesson.steps[progress.index - 1].overlay
                                  : null,
                              paper: paper,
                              onFinished: _onDemoFinished,
                            ),
                          ),
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
                    );
                  },
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

/// Small dark pill floating over the drawing sheet.
class _GlassChip extends StatelessWidget {
  const _GlassChip({super.key, required this.child, this.onTap});

  final Widget child;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: const Color(0xE6242150),
      shape: const StadiumBorder(),
      elevation: 2,
      child: InkWell(
        customBorder: const StadiumBorder(),
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.fromLTRB(8, 5, 14, 5),
          child: DefaultTextStyle.merge(
            style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w800, fontSize: 13),
            child: child,
          ),
        ),
      ),
    );
  }
}
