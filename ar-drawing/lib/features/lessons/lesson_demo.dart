import 'dart:convert';
import 'dart:math' as math;

import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';

import '../draw/stroke.dart';
import 'lesson.dart';

/// One brush stroke of Lumi's demonstration. Points are fractions of the
/// picture's width (x) and height (y); [width] is a fraction of its width.
@immutable
class DemoStroke {
  const DemoStroke(this.width, this.points);

  final double width;
  final List<Offset> points;
}

/// Lumi's demonstration of one lesson step: brush strokes, in drawing order,
/// that reveal the step's overlay picture.
class DemoStep {
  DemoStep({required this.overlay, required this.strokes, required this.aspect}) {
    double total = 0;
    for (final DemoStroke s in strokes) {
      _starts.add(total);
      double len = 0;
      for (int i = 1; i < s.points.length; i++) {
        len += _dist(s.points[i - 1], s.points[i]);
      }
      // Lifting the brush and putting it down elsewhere takes a moment too.
      total += math.max(len, 0.02);
      _lengths.add(math.max(len, 0.02));
    }
    length = total;
  }

  /// File name of the overlay this step reveals (e.g. "2_base").
  final String overlay;
  final List<DemoStroke> strokes;

  /// Picture width / height.
  final double aspect;
  final List<double> _starts = <double>[];
  final List<double> _lengths = <double>[];

  /// Total brush travel, in picture widths.
  late final double length;

  double _dist(Offset a, Offset b) {
    final double dx = b.dx - a.dx, dy = (b.dy - a.dy) / aspect;
    return math.sqrt(dx * dx + dy * dy);
  }

  /// How long the demonstration lasts: steady brush speed, kept between a
  /// few seconds (tiny steps) and a short attention span (big pictures).
  Duration get duration {
    final double seconds = (length / 1.1).clamp(7.0, 15.0);
    return Duration(milliseconds: (seconds * 1000).round());
  }

  /// The strokes drawn so far at [t] (0..1): finished strokes plus the
  /// growing part of the current one, and where the brush is now.
  ({List<DemoStroke> done, Offset? tip}) at(double t) {
    final double d = t.clamp(0.0, 1.0) * length;
    final List<DemoStroke> out = <DemoStroke>[];
    Offset? tip;
    for (int i = 0; i < strokes.length; i++) {
      final double start = _starts[i];
      if (d <= start) break;
      final DemoStroke s = strokes[i];
      final double want = d - start;
      if (want >= _lengths[i] || s.points.length < 2) {
        out.add(s);
        tip = s.points.last;
        continue;
      }
      final List<Offset> pts = <Offset>[s.points.first];
      double run = 0;
      for (int k = 1; k < s.points.length; k++) {
        final double seg = _dist(s.points[k - 1], s.points[k]);
        if (run + seg >= want) {
          final double f = seg == 0 ? 1 : (want - run) / seg;
          pts.add(Offset.lerp(s.points[k - 1], s.points[k], f)!);
          break;
        }
        run += seg;
        pts.add(s.points[k]);
      }
      out.add(DemoStroke(s.width, pts));
      tip = pts.last;
      break;
    }
    return (done: out, tip: tip);
  }

  /// Checkpoints along the strokes (about every half brush width) used to
  /// measure how much of the step the learner has done.
  List<Offset> samples({int max = 900}) {
    final List<Offset> out = <Offset>[];
    for (final DemoStroke s in strokes) {
      final double gap = math.max(s.width * 0.6, 0.01);
      out.add(s.points.first);
      double carry = 0;
      for (int k = 1; k < s.points.length; k++) {
        final Offset a = s.points[k - 1], b = s.points[k];
        final double seg = _dist(a, b);
        double at = gap - carry;
        while (at <= seg) {
          out.add(Offset.lerp(a, b, at / seg)!);
          at += gap;
        }
        carry = seg - (at - gap);
      }
    }
    if (out.length <= max) return out;
    final double stride = out.length / max;
    return <Offset>[for (int i = 0; i < max; i++) out[(i * stride).floor()]];
  }
}

/// All demonstrations of a lesson (`assets/lessons/<id>/demo.json`).
class LessonDemo {
  LessonDemo(this.aspect, this.steps);

  factory LessonDemo.parse(String raw) {
    final Map<String, Object?> j = jsonDecode(raw) as Map<String, Object?>;
    final double aspect = (j['aspect']! as num).toDouble();
    DemoStroke stroke(Object? raw) {
      final Map<String, Object?> st = raw! as Map<String, Object?>;
      return DemoStroke((st['w']! as num).toDouble(), _points(st['p']! as List<Object?>));
    }

    DemoStep step(Object? raw) {
      final Map<String, Object?> s = raw! as Map<String, Object?>;
      return DemoStep(
        overlay: s['overlay']! as String,
        aspect: aspect,
        strokes: <DemoStroke>[for (final Object? st in s['strokes']! as List<Object?>) stroke(st)],
      );
    }

    return LessonDemo(aspect, <DemoStep>[
      for (final Object? s in j['steps']! as List<Object?>) step(s),
    ]);
  }

  static List<Offset> _points(List<Object?> flat) => <Offset>[
    for (int i = 0; i + 1 < flat.length; i += 2)
      Offset((flat[i]! as num).toDouble(), (flat[i + 1]! as num).toDouble()),
  ];

  final double aspect;
  final List<DemoStep> steps;

  static String assetOf(Lesson lesson) => 'assets/lessons/${lesson.id}/demo.json';

  static Future<LessonDemo?> load(Lesson lesson, [AssetBundle? bundle]) async {
    try {
      return LessonDemo.parse(await (bundle ?? rootBundle).loadString(assetOf(lesson)));
    } on Object catch (e) {
      debugPrint('No demo for ${lesson.id}: $e');
      return null;
    }
  }

  /// The demonstration for a lesson step (null for the "done" step).
  DemoStep? forStep(LessonStep step) {
    if (step.kind == StepKind.done) return null;
    for (final DemoStep d in steps) {
      if (step.overlay.endsWith('/${d.overlay}.png')) return d;
    }
    return null;
  }
}

/// Where a picture of [aspect] sits when drawn with BoxFit.contain inside
/// [canvas] deflated by [padding] (the same box as the tracing layer).
Rect pictureRect(Size canvas, double aspect, {double padding = 16}) {
  final Rect box = (Offset.zero & canvas).deflate(padding);
  if (box.isEmpty) return box;
  double w = box.width, h = w / aspect;
  if (h > box.height) {
    h = box.height;
    w = h * aspect;
  }
  return Rect.fromCenter(center: box.center, width: w, height: h);
}

/// Share (0..1) of the step's checkpoints the learner has covered with
/// brush strokes. Checkpoints within [tolerance] logical pixels (plus half
/// the demo brush) of the learner's ink count as done.
double stepCoverage({
  required List<Offset> samples,
  required double demoBrush,
  required Rect picture,
  required List<Stroke> strokes,
  required double canvasWidth,
  double tolerance = 10,
}) {
  if (samples.isEmpty || picture.isEmpty || canvasWidth <= 0) return 0;
  const double cell = 6;
  final int cols = (picture.right / cell).ceil() + 2, rows = (picture.bottom / cell).ceil() + 2;
  final Uint8List grid = Uint8List(cols * rows);
  void mark(Offset p, double r) {
    final int rc = (r / cell).ceil();
    final int cx = (p.dx / cell).floor(), cy = (p.dy / cell).floor();
    for (int y = cy - rc; y <= cy + rc; y++) {
      if (y < 0 || y >= rows) continue;
      for (int x = cx - rc; x <= cx + rc; x++) {
        if (x < 0 || x >= cols) continue;
        grid[y * cols + x] = 1;
      }
    }
  }

  for (final Stroke s in strokes) {
    if (s.tool != DrawTool.brush || s.points.isEmpty) continue;
    final double r = s.width * canvasWidth / 2 + tolerance + demoBrush * picture.width * 0.3;
    Offset? prev;
    for (final StrokePoint sp in s.points) {
      final Offset p = sp.scaled(canvasWidth);
      if (prev != null) {
        final double d = (p - prev).distance;
        final int n = (d / cell).ceil();
        for (int i = 1; i < n; i++) {
          mark(Offset.lerp(prev, p, i / n)!, r);
        }
      }
      mark(p, r);
      prev = p;
    }
  }
  int hit = 0;
  for (final Offset q in samples) {
    final Offset p = Offset(
      picture.left + q.dx * picture.width,
      picture.top + q.dy * picture.height,
    );
    final int x = (p.dx / cell).floor(), y = (p.dy / cell).floor();
    if (x >= 0 && x < cols && y >= 0 && y < rows && grid[y * cols + x] == 1) hit++;
  }
  return hit / samples.length;
}
