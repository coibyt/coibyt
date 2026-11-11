import 'dart:async';
import 'dart:math' as math;
import 'dart:ui' as ui;

import 'package:clock/clock.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../core/i18n/language_controller.dart';
import '../draw/drawing_controller.dart';
import '../draw/stroke.dart';
import '../draw/widgets/draw_toolbar.dart';
import '../draw/widgets/drawing_canvas.dart';
import '../timelapse/timelapse_composer.dart' show resolveImage;
import '../game/game_store.dart';
import '../leaderboard/leaderboard_client.dart';
import '../leaderboard/leaderboard_screen.dart' show lifetimePoints;
import '../leaderboard/player_profile.dart';
import '../teacher/hint_coach.dart';
import '../teacher/teacher_controller.dart';
import '../teacher/teacher_script.dart';
import '../teacher/widgets/teacher_overlay.dart';
import 'exam.dart';
import 'model_analysis.dart';
import 'exam_record_store.dart';
import 'exam_result_screen.dart';
import 'exam_scoring.dart';

/// Called when an exam ends without a grade (left early). Phase 3 uses it
/// for the energy brushes.
typedef ExamAbandoned = void Function(Exam exam);

/// The exam room: drawing tools only — no tracing layer, no step guide.
/// The model is shown like an object on the teacher's desk (a small card the
/// student can enlarge), a strict countdown runs in the corner and the paper
/// is collected automatically when time is up.
class ExamScreen extends StatefulWidget {
  const ExamScreen({super.key, required this.exam, this.onAbandoned, this.onGraded});

  final Exam exam;
  final ExamAbandoned? onAbandoned;

  /// Called with the result before the report card opens.
  final void Function(Exam exam, ExamScore score, ui.Image drawing)? onGraded;

  @override
  State<ExamScreen> createState() => _ExamScreenState();
}

class _ExamScreenState extends State<ExamScreen> {
  static const Color paper = Color(0xFFFFFDF8);
  static const EdgeInsets sheetPadding = EdgeInsets.all(24);

  final DrawingController _drawing = DrawingController();
  final DrawToolbarKeys _keys = DrawToolbarKeys();
  // clock.now(): real time in the app, controllable in tests.
  late final DateTime _endsAt = clock.now().add(widget.exam.timeLimit);
  Timer? _ticker;
  Duration _left = Duration.zero;
  bool _grading = false;
  bool _submitted = false;
  Size? _outlineSize;
  Size _canvasSize = Size.zero;
  final TeacherController _teacher = TeacherController();
  HintCoach? _coach;
  bool _warned5 = false, _warned1 = false;

  void _onInk() {
    final GameStore? game = GameScope.read(context);
    if (game != null && !game.activeToday && _drawing.strokes.isNotEmpty) {
      unawaited(game.recordActivity());
    }
  }

  @override
  void initState() {
    super.initState();
    _drawing.addListener(_onInk);
    _left = widget.exam.timeLimit;
    _ticker = Timer.periodic(const Duration(milliseconds: 250), (_) => _tick());
    if (widget.exam.task.printedOutline) unawaited(_loadOutlineSize());
    unawaited(_startTutor());
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      final String task = switch (widget.exam.task) {
        ExamTask.sketch => 'sketch',
        ExamTask.drawColor => 'draw_color',
        ExamTask.colorShade => 'color_shade',
      };
      _teacher.say(<TeacherLine>[TeacherLine(id: 'exam_start_$task', mood: 'wave')]);
    });
  }

  /// The tutor watches proportions (freehand tasks) and colours (colour
  /// tasks) and gives gentle hints.
  Future<void> _startTutor() async {
    try {
      final ModelInfo info = await analyzeModel(widget.exam.modelAsset);
      if (!mounted) return;
      _coach = HintCoach(
        drawing: _drawing,
        teacher: _teacher,
        modelAspect: widget.exam.task.printedOutline ? null : info.aspect,
        modelColors: widget.exam.task.gradesColor ? info.colors : const <Color>[],
      );
    } on Object catch (e) {
      debugPrint('Tutor could not analyse the model: $e');
    }
  }

  Future<void> _loadOutlineSize() async {
    final ui.Image image = await resolveImage(AssetImage(widget.exam.outlineAsset));
    if (!mounted) return;
    setState(() => _outlineSize = Size(image.width.toDouble(), image.height.toDouble()));
    image.dispose();
  }

  void _tick() {
    final Duration left = _endsAt.difference(clock.now());
    if (!mounted) return;
    setState(() => _left = left.isNegative ? Duration.zero : left);
    if (!_warned5 &&
        widget.exam.timeLimit > const Duration(minutes: 6) &&
        left <= const Duration(minutes: 5)) {
      _warned5 = true;
      _teacher.say(const <TeacherLine>[TeacherLine(id: 'exam_time_5min', mood: 'point')]);
    }
    if (!_warned1 && left <= const Duration(minutes: 1) && left > Duration.zero) {
      _warned1 = true;
      _teacher.say(const <TeacherLine>[TeacherLine(id: 'exam_time_1min', mood: 'point')]);
    }
    if (left <= Duration.zero && !_submitted) {
      unawaited(_submit(timeUp: true));
    }
  }

  @override
  void dispose() {
    _ticker?.cancel();
    _coach?.dispose();
    _teacher.dispose();
    _drawing.dispose();
    super.dispose();
  }

  /// Where the printed outline sits on the sheet (logical pixels).
  Rect? _sheetRect(Size canvas) {
    final Size? image = _outlineSize;
    if (image == null || !widget.exam.task.printedOutline) return null;
    final Rect area = sheetPadding.deflateRect(Offset.zero & canvas);
    final FittedSizes fit = applyBoxFit(BoxFit.contain, image, area.size);
    return Alignment.center.inscribe(fit.destination, area);
  }

  Future<bool> _confirm(String titleKey, String bodyKey, String okKey) async {
    final bool? ok = await showDialog<bool>(
      context: context,
      builder: (BuildContext context) => AlertDialog(
        title: Text(context.tr(titleKey)),
        content: Text(context.tr(bodyKey)),
        actions: <Widget>[
          TextButton(
            onPressed: () => Navigator.of(context).pop(false),
            child: Text(context.tr('exam.keepDrawing')),
          ),
          FilledButton(
            key: const Key('confirmDialogOk'),
            onPressed: () => Navigator.of(context).pop(true),
            child: Text(context.tr(okKey)),
          ),
        ],
      ),
    );
    return ok ?? false;
  }

  Future<void> _submit({bool timeUp = false}) async {
    if (_submitted) return;
    if (!timeUp && !await _confirm('exam.submitTitle', 'exam.submitBody', 'exam.submit')) return;
    if (!mounted || _submitted) return;
    _submitted = true;
    _ticker?.cancel();
    _drawing.cancel();
    setState(() => _grading = true);

    final Size canvas = _canvasSize;
    // Render the student's layer at a modest resolution for grading.
    final double scale = 360 / math.max(canvas.width, canvas.height);
    final int w = (canvas.width * scale).round().clamp(1, 4096);
    final int h = (canvas.height * scale).round().clamp(1, 4096);
    final ui.Picture picture = _drawing.recordStrokes(
      w.toDouble(),
      Size(w.toDouble(), h.toDouble()),
    );
    final ui.Image drawing = await picture.toImage(w, h);
    picture.dispose();
    final ByteData rgba = (await drawing.toByteData(format: ui.ImageByteFormat.rawRgba))!;
    final Rect? sheet = _sheetRect(canvas);
    final List<Stroke> brush = _drawing.strokes
        .where((Stroke s) => s.tool == DrawTool.brush)
        .toList();
    final ScoreRequest request = ScoreRequest(
      task: widget.exam.task,
      weights: widget.exam.weights,
      student: rgba.buffer.asUint8List(),
      studentWidth: w,
      studentHeight: h,
      outlinePng: (await rootBundle.load(widget.exam.outlineAsset)).buffer.asUint8List(),
      modelPng: (await rootBundle.load(widget.exam.modelAsset)).buffer.asUint8List(),
      sheetRect: sheet == null
          ? null
          : <double>[
              sheet.left / canvas.width,
              sheet.top / canvas.height,
              sheet.width / canvas.width,
              sheet.height / canvas.height,
            ],
      strokeCount: brush.length,
      distinctSizes: brush.map((Stroke s) => (s.width * 1000).round()).toSet().length,
    );
    final ExamScore score = await compute(gradeExam, request, debugLabel: 'gradeExam');
    if (!mounted) return;
    final ExamRecordStore? records = ExamRecordScope.maybeOf(context);
    final GameStore? game = GameScope.read(context);
    final PlayerProfile? profile = ProfileScope.maybeOf(context);
    final LeaderboardClient? board = LeaderboardScope.maybeOf(context);
    final ArtistRank rankBefore = ArtistRank.of(lifetimePoints(records));
    await records?.record(widget.exam, score);
    final bool rankUp =
        records != null && ArtistRank.of(lifetimePoints(records)).index > rankBefore.index;
    final ExamReward? reward = await game?.onExamGraded(widget.exam, score);
    widget.onGraded?.call(widget.exam, score, drawing);
    // Leaderboard only with a nickname; Hall of Fame only with consent.
    if (profile != null && profile.joined && board != null && score.total > 0) {
      unawaited(_publish(board, profile, score, drawing));
    }
    if (!mounted) return;
    await Navigator.of(context).pushReplacement(
      MaterialPageRoute<void>(
        builder: (_) => ExamResultScreen(
          exam: widget.exam,
          score: score,
          drawing: drawing,
          timeUp: timeUp,
          reward: reward,
          rankUp: rankUp,
        ),
      ),
    );
  }

  Future<void> _publish(
    LeaderboardClient board,
    PlayerProfile profile,
    ExamScore score,
    ui.Image drawing,
  ) async {
    final Map<String, Object?>? ok = await board.submitScore(profile, widget.exam.id, score.total);
    if (ok == null || !profile.shareArt || !score.passed) return;
    final ByteData? png = await drawing.toByteData(format: ui.ImageByteFormat.png);
    if (png == null) return;
    await board.uploadArt(profile, widget.exam.id, score.total, png.buffer.asUint8List());
  }

  Future<void> _leave() async {
    if (_submitted) return;
    if (!await _confirm('exam.leaveTitle', 'exam.leaveBody', 'exam.leave')) return;
    if (!mounted) return;
    _submitted = true;
    _ticker?.cancel();
    // Leaving an exam half-way costs an energy brush.
    await GameScope.read(context)?.loseBrush();
    widget.onAbandoned?.call(widget.exam);
    if (mounted) Navigator.of(context).pop();
  }

  void _showModel() {
    showDialog<void>(
      context: context,
      builder: (BuildContext context) => Dialog(
        backgroundColor: paper,
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Image.asset(
            widget.exam.modelAsset,
            key: const Key('modelLarge'),
            fit: BoxFit.contain,
          ),
        ),
      ),
    );
  }

  String get _clock {
    final int m = _left.inMinutes, s = _left.inSeconds % 60;
    return '${m.toString().padLeft(2, '0')}:${s.toString().padLeft(2, '0')}';
  }

  @override
  Widget build(BuildContext context) {
    final bool hurry = _left.inSeconds < 60;
    return PopScope(
      canPop: _submitted,
      onPopInvokedWithResult: (bool didPop, Object? _) {
        if (!didPop) unawaited(_leave());
      },
      child: Scaffold(
        appBar: AppBar(
          leading: IconButton(
            key: const Key('leaveExam'),
            tooltip: context.tr('exam.leave'),
            icon: const Icon(Icons.close),
            onPressed: _leave,
          ),
          title: Text(context.tr(widget.exam.titleKey), overflow: TextOverflow.ellipsis),
          actions: <Widget>[
            ListenableBuilder(
              listenable: _drawing,
              builder: (BuildContext context, _) => IconButton(
                key: _keys.undo,
                tooltip: context.tr('draw.undo'),
                onPressed: _drawing.canUndo ? _drawing.undo : null,
                icon: const Icon(Icons.undo),
              ),
            ),
            // Strict countdown.
            Container(
              key: const Key('examTimer'),
              margin: const EdgeInsets.only(right: 12),
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
              decoration: BoxDecoration(
                color: hurry ? const Color(0xFFE53935) : Colors.white12,
                borderRadius: BorderRadius.circular(12),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: <Widget>[
                  const Icon(Icons.timer_outlined, size: 18),
                  const SizedBox(width: 4),
                  Text(
                    _clock,
                    style: const TextStyle(
                      fontWeight: FontWeight.w800,
                      fontFeatures: <FontFeature>[FontFeature.tabularFigures()],
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
        body: Stack(
          children: <Widget>[
            Column(
              children: <Widget>[
                Expanded(
                  child: LayoutBuilder(
                    builder: (BuildContext context, BoxConstraints c) {
                      _canvasSize = c.biggest;
                      final Rect? sheet = _sheetRect(c.biggest);
                      return Stack(
                        fit: StackFit.expand,
                        children: <Widget>[
                          const ColoredBox(color: paper),
                          // Printed outline (colouring exams): part of the
                          // exam paper, at full strength, not a tracing aid.
                          if (sheet != null)
                            Positioned.fromRect(
                              rect: sheet,
                              child: IgnorePointer(
                                child: Image.asset(
                                  widget.exam.outlineAsset,
                                  key: const Key('printedOutline'),
                                ),
                              ),
                            ),
                          DrawingCanvas(key: _keys.canvas, controller: _drawing),
                          Positioned(
                            left: 0,
                            right: 0,
                            bottom: 8,
                            child: TeacherOverlay(
                              controller: _teacher,
                              inline: true,
                              collapsedAlignment: Alignment.bottomRight,
                              autoAdvance: const Duration(seconds: 2),
                            ),
                          ),
                          // The model on the "teacher's desk".
                          Positioned(
                            left: 10,
                            top: 10,
                            child: _ModelCard(asset: widget.exam.modelAsset, onTap: _showModel),
                          ),
                        ],
                      );
                    },
                  ),
                ),
                DrawToolbar(controller: _drawing, keys: _keys),
                SafeArea(
                  top: false,
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(12, 0, 12, 8),
                    child: SizedBox(
                      width: double.infinity,
                      child: FilledButton.icon(
                        key: const Key('submitExam'),
                        onPressed: _grading ? null : _submit,
                        icon: const Icon(Icons.assignment_turned_in),
                        label: Text(context.tr('exam.submit')),
                      ),
                    ),
                  ),
                ),
              ],
            ),
            if (_grading)
              Positioned.fill(
                child: ColoredBox(
                  color: Colors.black54,
                  child: Center(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: <Widget>[
                        const CircularProgressIndicator(),
                        const SizedBox(height: 12),
                        Text(context.tr('exam.grading'), key: const Key('gradingLabel')),
                      ],
                    ),
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}

class _ModelCard extends StatelessWidget {
  const _ModelCard({required this.asset, required this.onTap});

  final String asset;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Tooltip(
      message: context.tr('exam.model'),
      child: Material(
        key: const Key('examModel'),
        elevation: 4,
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        clipBehavior: Clip.antiAlias,
        child: InkWell(
          onTap: onTap,
          child: Padding(
            padding: const EdgeInsets.all(6),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: <Widget>[
                Image.asset(asset, width: 74, height: 74, fit: BoxFit.contain),
                const SizedBox(height: 2),
                Row(
                  mainAxisSize: MainAxisSize.min,
                  children: <Widget>[
                    const Icon(Icons.zoom_in, size: 14, color: Colors.black54),
                    Text(
                      context.tr('exam.model'),
                      style: const TextStyle(
                        color: Colors.black87,
                        fontSize: 11,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
