import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../../core/i18n/language_controller.dart';
import '../draw/drawing_controller.dart';
import '../draw/stroke.dart';
import '../draw/widgets/drawing_canvas.dart';
import '../teacher/teacher_controller.dart';
import '../teacher/teacher_script.dart';
import '../teacher/widgets/teacher_overlay.dart';
import 'game_store.dart';
import 'goals.dart';

/// Basic strokes the drill asks for, as paths in a unit box.
enum DrillShape { line, circle, wave }

/// Samples [shape] as points on a canvas of [size].
List<Offset> drillPoints(DrillShape shape, Size size, {int samples = 80}) {
  final double w = size.width, h = size.height;
  final double cx = w / 2, cy = h * 0.42, r = math.min(w, h) * 0.3;
  return <Offset>[
    for (int i = 0; i <= samples; i++)
      switch (shape) {
        DrillShape.line => Offset(w * (0.15 + 0.7 * i / samples), h * (0.65 - 0.4 * i / samples)),
        DrillShape.circle => Offset(
          cx + r * math.cos(i / samples * 2 * math.pi),
          cy + r * math.sin(i / samples * 2 * math.pi),
        ),
        DrillShape.wave => Offset(
          w * (0.1 + 0.8 * i / samples),
          cy + r * 0.45 * math.sin(i / samples * 4 * math.pi),
        ),
      },
  ];
}

/// How closely [strokes] follow [guide]: share of the guide covered and
/// share of the ink on the guide (within [tolerance] logical pixels).
({double coverage, double accuracy}) drillScore(
  List<Offset> guide,
  List<Offset> ink,
  double tolerance,
) {
  if (ink.isEmpty) return (coverage: 0, accuracy: 0);
  bool near(Offset p, List<Offset> to) => to.any((Offset q) => (p - q).distance <= tolerance);
  final double coverage = guide.where((Offset g) => near(g, ink)).length / guide.length;
  final double accuracy = ink.where((Offset p) => near(p, guide)).length / ink.length;
  return (coverage: coverage, accuracy: accuracy);
}

/// Basic strokes drill: trace a straight line, a circle and a wave along the
/// dotted guides. Finishing all three earns an energy brush.
class DrillScreen extends StatefulWidget {
  const DrillScreen({super.key});

  @override
  State<DrillScreen> createState() => _DrillScreenState();
}

class _DrillScreenState extends State<DrillScreen> {
  final DrawingController _drawing = DrawingController()..size = 8;
  final TeacherController _teacher = TeacherController();
  int _shape = 0;
  Size _size = Size.zero;
  bool _done = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) _teacher.say(const <TeacherLine>[TeacherLine(id: 'drill_intro', mood: 'point')]);
    });
  }

  @override
  void dispose() {
    _teacher.dispose();
    _drawing.dispose();
    super.dispose();
  }

  DrillShape get _current => DrillShape.values[_shape];

  Future<void> _check() async {
    final List<Offset> ink = <Offset>[
      for (final Stroke s in _drawing.strokes)
        for (final StrokePoint p in s.points) p.scaled(_size.width),
    ];
    final ({double coverage, double accuracy}) r = drillScore(
      drillPoints(_current, _size),
      ink,
      18,
    );
    if (r.coverage >= 0.7 && r.accuracy >= 0.6) {
      if (_shape < DrillShape.values.length - 1) {
        setState(() {
          _shape++;
          _drawing.clear();
        });
        _teacher.say(<TeacherLine>[PraiseLine.random()]);
        return;
      }
      final GameStore? game = GameScope.maybeOf(context);
      await game?.earnBrush();
      await game?.recordActivity();
      await game?.track(GameEvent.drill);
      setState(() => _done = true);
      _teacher.say(const <TeacherLine>[TeacherLine(id: 'drill_pass', mood: 'cheer')]);
    } else {
      _teacher.say(const <TeacherLine>[TeacherLine(id: 'drill_retry', mood: 'happy')]);
      _drawing.clear();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(context.tr('game.drillTitle')),
        actions: <Widget>[
          Center(
            child: Padding(
              padding: const EdgeInsets.only(right: 16),
              child: Text(
                '${_shape + 1}/${DrillShape.values.length}',
                style: const TextStyle(fontWeight: FontWeight.w800),
              ),
            ),
          ),
        ],
      ),
      body: Column(
        children: <Widget>[
          Expanded(
            child: LayoutBuilder(
              builder: (BuildContext context, BoxConstraints c) {
                _size = c.biggest;
                return Stack(
                  fit: StackFit.expand,
                  children: <Widget>[
                    const ColoredBox(color: Color(0xFFFFFDF8)),
                    IgnorePointer(
                      child: CustomPaint(
                        key: const Key('drillGuide'),
                        painter: _GuidePainter(drillPoints(_current, _size)),
                      ),
                    ),
                    if (!_done) DrawingCanvas(controller: _drawing),
                    if (_done)
                      Center(
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: <Widget>[
                            const Icon(Icons.brush, size: 64, color: Color(0xFFFF9F43)),
                            Text(
                              context.tr('game.brushEarned'),
                              style: const TextStyle(
                                color: Colors.black87,
                                fontSize: 18,
                                fontWeight: FontWeight.w800,
                              ),
                            ),
                          ],
                        ),
                      ),
                    Positioned(
                      left: 0,
                      right: 0,
                      bottom: 8,
                      child: TeacherOverlay(
                        controller: _teacher,
                        inline: true,
                        autoAdvance: const Duration(seconds: 3),
                      ),
                    ),
                  ],
                );
              },
            ),
          ),
          SafeArea(
            top: false,
            child: Padding(
              padding: const EdgeInsets.all(12),
              child: Row(
                children: <Widget>[
                  if (!_done)
                    IconButton(
                      tooltip: context.tr('draw.undo'),
                      onPressed: _drawing.undo,
                      icon: const Icon(Icons.undo),
                    ),
                  Expanded(
                    child: FilledButton(
                      key: const Key('drillCheck'),
                      onPressed: _done ? () => Navigator.of(context).pop(true) : _check,
                      child: Text(context.tr(_done ? 'teacher.done' : 'game.check')),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _GuidePainter extends CustomPainter {
  _GuidePainter(this.points);

  final List<Offset> points;

  @override
  void paint(Canvas canvas, Size size) {
    final Paint dot = Paint()..color = const Color(0x8814161F);
    for (int i = 0; i < points.length; i += 2) {
      canvas.drawCircle(points[i], 3, dot);
    }
    if (points.isNotEmpty) {
      canvas.drawCircle(points.first, 9, Paint()..color = const Color(0xFF2EAD6B));
    }
  }

  @override
  bool shouldRepaint(_GuidePainter old) => old.points != points;
}

/// A random praise line (shared with lessons).
class PraiseLine {
  static final math.Random _r = math.Random();
  static TeacherLine random() => TeacherLine(id: 'praise_${_r.nextInt(4) + 1}', mood: 'cheer');
}
