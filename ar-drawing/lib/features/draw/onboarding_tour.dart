import 'dart:async';
import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../teacher/teacher_controller.dart';
import '../teacher/teacher_script.dart';
import 'drawing_controller.dart';
import 'stroke.dart';
import 'widgets/draw_toolbar.dart';

/// One step of the guided tour: what Lumi says, which control to point at,
/// and what the learner must do to move on.
class TourStep {
  const TourStep({required this.line, this.target, this.done, this.waitFor});

  final TeacherLine line;

  /// The control to highlight (null = nothing).
  final GlobalKey? target;

  /// True when the learner has done what was asked.
  final bool Function()? done;

  /// For steps without a task: move on after this long.
  final Duration? waitFor;
}

/// Interactive first-use tour of the drawing board: Lumi asks for one action
/// at a time (pick red → draw a line → make the brush bigger → erase →
/// undo), highlights the right control, and waits until the learner has
/// done it before praising and moving on.
class OnboardingTour extends ChangeNotifier {
  OnboardingTour({
    required this.drawing,
    required this.teacher,
    required this.keys,
    required this.onFinished,
  });

  static const String scriptId = 'draw_tour';

  final DrawingController drawing;
  final TeacherController teacher;
  final DrawToolbarKeys keys;
  final VoidCallback onFinished;

  late final List<TourStep> steps = _buildSteps();
  int _index = -1;
  Timer? _timer;
  bool _finished = false;

  // Snapshot values to detect what the learner did since the step began.
  int _strokesAtStart = 0;
  double _sizeAtStart = 0;

  int get index => _index;
  TourStep? get current => _index >= 0 && _index < steps.length ? steps[_index] : null;
  GlobalKey? get target => current?.target;
  bool get finished => _finished;

  List<TourStep> _buildSteps() => <TourStep>[
    const TourStep(
      line: TeacherLine(id: 'tour_welcome', mood: 'wave'),
      waitFor: Duration(seconds: 6),
    ),
    TourStep(
      line: const TeacherLine(id: 'tour_pick_red', mood: 'point'),
      target: keys.color,
      done: () => isReddish(drawing.color),
    ),
    TourStep(
      line: const TeacherLine(id: 'tour_draw_line', mood: 'happy'),
      target: keys.canvas,
      done: () => _newStrokes(DrawTool.brush) > 0,
    ),
    TourStep(
      line: const TeacherLine(id: 'tour_size', mood: 'point'),
      target: keys.size,
      done: () => (drawing.brushSize - _sizeAtStart).abs() >= 4,
    ),
    TourStep(
      line: const TeacherLine(id: 'tour_eraser', mood: 'point'),
      target: keys.eraser,
      done: () => _newStrokes(DrawTool.eraser) > 0,
    ),
    TourStep(
      line: const TeacherLine(id: 'tour_undo', mood: 'point'),
      target: keys.undo,
      done: () => drawing.canRedo,
    ),
    const TourStep(
      line: TeacherLine(id: 'tour_done', mood: 'cheer'),
      waitFor: Duration(seconds: 9),
    ),
  ];

  int _newStrokes(DrawTool tool) =>
      drawing.strokes.skip(_strokesAtStart).where((Stroke s) => s.tool == tool).length;

  static bool isReddish(Color c) {
    final HSVColor h = HSVColor.fromColor(c);
    return (h.hue >= 340 || h.hue <= 15) && h.saturation >= 0.45 && h.value >= 0.35;
  }

  void start() {
    drawing.addListener(_check);
    _go(0);
  }

  void _go(int i) {
    _timer?.cancel();
    if (i >= steps.length) {
      _finish();
      return;
    }
    _index = i;
    _strokesAtStart = drawing.strokes.length;
    _sizeAtStart = drawing.brushSize;
    final TourStep step = steps[i];
    teacher.say(<TeacherLine>[step.line]);
    if (step.waitFor != null) _timer = Timer(step.waitFor!, () => _go(i + 1));
    notifyListeners();
  }

  void _check() {
    final TourStep? step = current;
    if (_finished || step?.done == null) return;
    if (step!.done!()) {
      // Let the learner see the result for a moment before praising.
      final int at = _index;
      _timer?.cancel();
      _timer = Timer(const Duration(milliseconds: 400), () {
        if (_index == at) _go(at + 1);
      });
    }
  }

  /// Skips the rest of the tour.
  void skip() => _finish();

  void _finish() {
    if (_finished) return;
    _finished = true;
    _timer?.cancel();
    drawing.removeListener(_check);
    _index = steps.length;
    notifyListeners();
    onFinished();
  }

  @override
  void dispose() {
    _timer?.cancel();
    drawing.removeListener(_check);
    super.dispose();
  }
}

/// Draws a pulsing ring and a pointing hand around the tour's current
/// target. Never blocks touches.
class TourSpotlight extends StatefulWidget {
  const TourSpotlight({super.key, required this.tour});

  final OnboardingTour tour;

  @override
  State<TourSpotlight> createState() => _TourSpotlightState();
}

class _TourSpotlightState extends State<TourSpotlight> with SingleTickerProviderStateMixin {
  late final AnimationController _pulse = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 1100),
  )..repeat();

  @override
  void dispose() {
    _pulse.dispose();
    super.dispose();
  }

  Rect? _targetRect() {
    final BuildContext? targetContext = widget.tour.target?.currentContext;
    final RenderObject? self = context.findRenderObject();
    final RenderObject? target = targetContext?.findRenderObject();
    if (self is! RenderBox || target is! RenderBox || !target.attached || !self.hasSize) {
      return null;
    }
    final Offset topLeft = self.globalToLocal(target.localToGlobal(Offset.zero));
    return topLeft & target.size;
  }

  @override
  Widget build(BuildContext context) {
    return IgnorePointer(
      child: Stack(
        children: <Widget>[
          Positioned.fill(
            child: AnimatedBuilder(
              animation: Listenable.merge(<Listenable>[_pulse, widget.tour]),
              builder: (BuildContext context, _) => CustomPaint(
                key: const Key('tourSpotlight'),
                painter: _SpotlightPainter(rect: _targetRect(), t: _pulse.value),
              ),
            ),
          ),
          Positioned(
            top: 8,
            left: 0,
            right: 0,
            child: Center(
              child: ListenableBuilder(
                listenable: widget.tour,
                builder: (BuildContext context, _) {
                  final int done = widget.tour.index.clamp(0, widget.tour.steps.length);
                  return Row(
                    key: const Key('tourProgress'),
                    mainAxisSize: MainAxisSize.min,
                    children: <Widget>[
                      for (int i = 0; i < widget.tour.steps.length; i++)
                        Container(
                          width: i == done ? 16 : 7,
                          height: 7,
                          margin: const EdgeInsets.symmetric(horizontal: 2),
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(4),
                            color: i <= done ? const Color(0xFFFF9F43) : const Color(0x33000000),
                          ),
                        ),
                    ],
                  );
                },
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _SpotlightPainter extends CustomPainter {
  _SpotlightPainter({required this.rect, required this.t});

  final Rect? rect;
  final double t;

  @override
  void paint(Canvas canvas, Size size) {
    final Rect? r = rect;
    if (r == null) return;
    final bool big = r.width > size.width * 0.6;
    final double grow = 4 + 8 * t;
    final RRect ring = RRect.fromRectAndRadius(
      big ? r.deflate(6) : r.inflate(grow),
      Radius.circular(big ? 18 : r.shortestSide / 2 + grow),
    );
    canvas.drawRRect(
      ring,
      Paint()
        ..style = PaintingStyle.stroke
        ..strokeWidth = big ? 4 : 3
        ..color = const Color(0xFFFF9F43).withValues(alpha: big ? 0.6 + 0.4 * (1 - t) : 1 - t),
    );
    if (big) return;
    // A small hand bouncing towards the target.
    final double bounce = 6 * math.sin(t * 2 * math.pi);
    final bool above = r.center.dy > size.height / 2;
    final Offset tip = above
        ? Offset(r.center.dx, r.top - 10 - bounce)
        : Offset(r.center.dx, r.bottom + 10 + bounce);
    final TextPainter hand = TextPainter(
      text: TextSpan(text: above ? '👇' : '👆', style: const TextStyle(fontSize: 30)),
      textDirection: TextDirection.ltr,
    )..layout();
    hand.paint(canvas, Offset(tip.dx - hand.width / 2, above ? tip.dy - hand.height : tip.dy));
  }

  @override
  bool shouldRepaint(_SpotlightPainter old) => old.rect != rect || old.t != t;
}
