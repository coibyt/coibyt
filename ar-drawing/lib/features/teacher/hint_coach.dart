import 'dart:math' as math;

import 'package:flutter/painting.dart';

import '../draw/drawing_controller.dart';
import '../draw/stroke.dart';
import 'teacher_controller.dart';
import 'teacher_script.dart';

/// Watches the drawing and gives gentle hints through Lumi — never draws
/// for the learner:
///
/// - **Proportions**: when the drawing's width/height ratio is clearly off
///   from the model's (measured from the strokes' bounding box, so it is
///   cheap enough to run after every stroke);
/// - **Colour**: when the colour picked is far from every colour of the
///   model (too dark, too light, too cold, or a different colour).
///
/// Hints are rate-limited (at most one every [cooldown], each hint at most
/// twice) so they help without nagging.
class HintCoach {
  HintCoach({
    required this.drawing,
    required this.teacher,
    this.modelAspect,
    List<Color> modelColors = const <Color>[],
    this.cooldown = const Duration(seconds: 25),
    this.minStrokes = 6,
    DateTime Function()? now,
  }) : _now = now ?? DateTime.now,
       modelColors = List<Color>.of(modelColors) {
    drawing.addListener(_onDrawing);
    _lastColor = drawing.color;
  }

  final DrawingController drawing;
  final TeacherController teacher;

  /// Width / height of the model's subject (null = no proportion hints).
  final double? modelAspect;

  /// Colours of the model (empty = no colour hints). Lessons update it at
  /// every step.
  List<Color> modelColors;
  final Duration cooldown;
  final int minStrokes;
  final DateTime Function() _now;

  DateTime? _lastHint;
  final Map<String, int> _given = <String, int>{};
  int _seenRevision = -1;
  Color? _lastColor;
  bool _disposed = false;

  /// Hints given so far (for tests and analytics).
  Map<String, int> get given => Map<String, int>.unmodifiable(_given);

  void _onDrawing() {
    if (_disposed) return;
    if (drawing.color != _lastColor) {
      _lastColor = drawing.color;
      final String? hint = colorHint(drawing.color, modelColors);
      if (hint != null) _give(hint);
    }
    if (drawing.revision != _seenRevision && !drawing.isDrawing) {
      _seenRevision = drawing.revision;
      final String? hint = proportionHint();
      if (hint != null) _give(hint);
    }
  }

  /// Hint id for the current proportions, or null when they look fine.
  String? proportionHint() {
    final double? target = modelAspect;
    if (target == null) return null;
    final List<Stroke> ink = drawing.strokes.where((Stroke s) => s.tool == DrawTool.brush).toList();
    if (ink.length < minStrokes) return null;
    double x0 = double.infinity, y0 = double.infinity, x1 = -double.infinity, y1 = -double.infinity;
    for (final Stroke s in ink) {
      for (final StrokePoint p in s.points) {
        x0 = math.min(x0, p.x);
        x1 = math.max(x1, p.x);
        y0 = math.min(y0, p.y);
        y1 = math.max(y1, p.y);
      }
    }
    final double w = x1 - x0, h = y1 - y0;
    // Too small to judge yet.
    if (w < 0.15 && h < 0.15 || h <= 0 || w <= 0) return null;
    final double ratio = math.log((w / h) / target);
    if (ratio > 0.4) return 'hint_proportion_wide';
    if (ratio < -0.4) return 'hint_proportion_tall';
    return null;
  }

  /// Hint id for a colour choice, or null when it is close to the model.
  static String? colorHint(Color picked, List<Color> model) {
    if (model.isEmpty) return null;
    final List<double> p = _lab(picked);
    List<double>? best;
    double bestDe = double.infinity;
    for (final Color c in model) {
      final List<double> m = _lab(c);
      final double de = math.sqrt(
        math.pow(p[0] - m[0], 2) + math.pow(p[1] - m[1], 2) + math.pow(p[2] - m[2], 2),
      );
      if (de < bestDe) {
        bestDe = de;
        best = m;
      }
    }
    if (bestDe <= 22 || best == null) return null;
    final double dl = p[0] - best[0];
    final double chroma = math.sqrt(math.pow(p[1] - best[1], 2) + math.pow(p[2] - best[2], 2));
    if (chroma < 25 && dl < -15) return 'hint_color_dark';
    if (chroma < 25 && dl > 15) return 'hint_color_light';
    if (best[2] - p[2] > 18) return 'hint_color_warm';
    return 'hint_color_hue';
  }

  void _give(String id) {
    final DateTime now = _now();
    final DateTime? last = _lastHint;
    if (last != null && now.difference(last) < cooldown) return;
    if ((_given[id] ?? 0) >= 2) return;
    _lastHint = now;
    _given[id] = (_given[id] ?? 0) + 1;
    teacher.say(<TeacherLine>[TeacherLine(id: id, mood: 'point')]);
  }

  void dispose() {
    _disposed = true;
    drawing.removeListener(_onDrawing);
  }

  static List<double> _lab(Color c) {
    double lin(double v) => v > 0.04045 ? math.pow((v + 0.055) / 1.055, 2.4).toDouble() : v / 12.92;
    final double r = lin(c.r), g = lin(c.g), b = lin(c.b);
    final double x = (0.4124 * r + 0.3576 * g + 0.1805 * b) / 0.95047;
    final double y = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    final double z = (0.0193 * r + 0.1192 * g + 0.9505 * b) / 1.08883;
    double f(double t) => t > 0.008856 ? math.pow(t, 1 / 3).toDouble() : 7.787 * t + 16 / 116;
    return <double>[116 * f(y) - 16, 500 * (f(x) - f(y)), 200 * (f(y) - f(z))];
  }
}

/// Picks a different praise line each time.
class PraiseRotator {
  PraiseRotator([math.Random? random]) : _random = random ?? math.Random();

  static const List<String> lines = <String>['praise_1', 'praise_2', 'praise_3', 'praise_4'];
  final math.Random _random;
  int _last = -1;

  TeacherLine next() {
    int i = _random.nextInt(lines.length);
    if (i == _last) i = (i + 1) % lines.length;
    _last = i;
    return TeacherLine(id: lines[i], mood: 'cheer');
  }
}
