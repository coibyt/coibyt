import 'dart:math' as math;
import 'dart:ui';

import 'package:flutter/foundation.dart';
import 'package:flutter/painting.dart' show HSVColor;

/// Tools of the digital drawing board.
enum DrawTool { brush, eraser }

/// Special brushes won in the shop.
enum BrushEffect { normal, sparkle, rainbow, neon }

/// One sampled point of a stroke.
///
/// Coordinates are stored relative to the canvas width (x and y divided by
/// the width), so a drawing keeps its shape when the screen size changes
/// (rotation, split screen, export at another resolution).
@immutable
class StrokePoint {
  const StrokePoint(this.x, this.y, [this.pressure = 1]);

  final double x;
  final double y;

  /// 0..1; 1 for finger and mouse, real pen pressure for a stylus.
  final double pressure;

  Offset scaled(double width) => Offset(x * width, y * width);
}

/// A finished or in-progress line drawn with one tool and colour.
@immutable
class Stroke {
  const Stroke({
    required this.tool,
    required this.color,
    required this.width,
    required this.points,
    this.effect = BrushEffect.normal,
  });

  final DrawTool tool;
  final BrushEffect effect;
  final Color color;

  /// Line width relative to the canvas width.
  final double width;
  final List<StrokePoint> points;

  Stroke withPoint(StrokePoint p) => Stroke(
    tool: tool,
    color: color,
    width: width,
    points: <StrokePoint>[...points, p],
    effect: effect,
  );
}

/// Light pressure still leaves a visible line; full pressure gives the
/// chosen size.
double pressureFactor(double pressure) => 0.35 + 0.65 * pressure.clamp(0.0, 1.0);

/// Paints [stroke] on [canvas] for a canvas [canvasWidth] logical pixels
/// wide. Lines are smoothed with quadratic curves through the midpoints of
/// the samples; with varying pen pressure each piece gets its own width.
void paintStroke(Canvas canvas, Stroke stroke, double canvasWidth) {
  final List<StrokePoint> pts = stroke.points;
  if (pts.isEmpty) return;
  if (stroke.tool == DrawTool.brush && stroke.effect != BrushEffect.normal) {
    _paintEffect(canvas, stroke, canvasWidth);
    return;
  }
  final double base = stroke.width * canvasWidth;
  final Paint paint = Paint()
    ..color = stroke.color
    ..isAntiAlias = true
    ..strokeCap = StrokeCap.round
    ..strokeJoin = StrokeJoin.round
    ..blendMode = stroke.tool == DrawTool.eraser ? BlendMode.clear : BlendMode.srcOver;
  if (stroke.tool == DrawTool.eraser) paint.color = const Color(0xFF000000);

  if (pts.length == 1) {
    canvas.drawCircle(
      pts.first.scaled(canvasWidth),
      base * pressureFactor(pts.first.pressure) / 2,
      paint..style = PaintingStyle.fill,
    );
    return;
  }

  paint.style = PaintingStyle.stroke;
  final bool uniform = pts.every((StrokePoint p) => p.pressure == pts.first.pressure);
  Offset mid(int i) => (pts[i].scaled(canvasWidth) + pts[i + 1].scaled(canvasWidth)) / 2;

  if (uniform) {
    final Path path = Path();
    final Offset first = pts.first.scaled(canvasWidth);
    path.moveTo(first.dx, first.dy);
    for (int i = 1; i < pts.length - 1; i++) {
      final Offset c = pts[i].scaled(canvasWidth);
      final Offset m = mid(i);
      path.quadraticBezierTo(c.dx, c.dy, m.dx, m.dy);
    }
    final Offset last = pts.last.scaled(canvasWidth);
    path.lineTo(last.dx, last.dy);
    canvas.drawPath(path, paint..strokeWidth = base * pressureFactor(pts.first.pressure));
    return;
  }

  // Pressure-sensitive: one short curve per sample, round caps hide joints.
  Offset start = pts.first.scaled(canvasWidth);
  for (int i = 1; i < pts.length; i++) {
    final bool last = i == pts.length - 1;
    final Offset c = pts[i].scaled(canvasWidth);
    final Offset end = last ? c : mid(i);
    final double p = (pts[i - 1].pressure + pts[i].pressure) / 2;
    final Path seg = Path()
      ..moveTo(start.dx, start.dy)
      ..quadraticBezierTo(c.dx, c.dy, end.dx, end.dy);
    canvas.drawPath(seg, paint..strokeWidth = base * pressureFactor(p));
    start = end;
  }
}

/// Shop brushes:
/// - rainbow: the hue travels along the line;
/// - neon: a soft coloured glow with a bright core;
/// - sparkle: the line plus little stars scattered along it (positions come
///   from the stroke itself, so a redraw looks identical).
void _paintEffect(Canvas canvas, Stroke stroke, double canvasWidth) {
  final List<Offset> pts = <Offset>[
    for (final StrokePoint p in stroke.points) p.scaled(canvasWidth),
  ];
  final double w = stroke.width * canvasWidth;
  final Paint line = Paint()
    ..isAntiAlias = true
    ..strokeCap = StrokeCap.round
    ..strokeJoin = StrokeJoin.round
    ..style = PaintingStyle.stroke
    ..strokeWidth = w;
  Path path() {
    final Path p = Path()..moveTo(pts.first.dx, pts.first.dy);
    for (final Offset o in pts.skip(1)) {
      p.lineTo(o.dx, o.dy);
    }
    if (pts.length == 1) p.lineTo(pts.first.dx + 0.01, pts.first.dy);
    return p;
  }

  switch (stroke.effect) {
    case BrushEffect.rainbow:
      double travelled = 0;
      final HSVColor base = HSVColor.fromColor(stroke.color);
      for (int i = 1; i < pts.length; i++) {
        travelled += (pts[i] - pts[i - 1]).distance;
        final double hue = (base.hue + travelled * 1.2) % 360;
        canvas.drawLine(
          pts[i - 1],
          pts[i],
          line..color = HSVColor.fromAHSV(1, hue, 0.85, 0.95).toColor(),
        );
      }
      if (pts.length == 1) canvas.drawPath(path(), line..color = stroke.color);
    case BrushEffect.neon:
      canvas.drawPath(
        path(),
        Paint()
          ..style = PaintingStyle.stroke
          ..strokeCap = StrokeCap.round
          ..strokeJoin = StrokeJoin.round
          ..strokeWidth = w * 2.2
          ..color = stroke.color.withValues(alpha: 0.55)
          ..maskFilter = MaskFilter.blur(BlurStyle.normal, math.max(2, w * 0.8)),
      );
      canvas.drawPath(
        path(),
        line..color = Color.lerp(stroke.color, const Color(0xFFFFFFFF), 0.65)!,
      );
    case BrushEffect.sparkle:
      canvas.drawPath(path(), line..color = stroke.color);
      final Paint star = Paint()..color = const Color(0xFFFFF4B0);
      double travelled = 0, next = w * 1.5;
      for (int i = 1; i < pts.length; i++) {
        travelled += (pts[i] - pts[i - 1]).distance;
        if (travelled < next) continue;
        next = travelled + w * 2.5;
        // Pseudo-random but stable offset from the point itself.
        final double seed = math.sin(pts[i].dx * 12.9898 + pts[i].dy * 78.233) * 43758.5453;
        final double r = seed - seed.floorToDouble();
        final Offset c = pts[i] + Offset((r - 0.5) * w * 1.6, (0.5 - (r * 7) % 1) * w * 1.6);
        _star(canvas, c, w * (0.35 + 0.35 * r), star);
      }
    case BrushEffect.normal:
      break;
  }
}

void _star(Canvas canvas, Offset c, double r, Paint paint) {
  final Path p = Path();
  for (int i = 0; i < 8; i++) {
    final double a = i * math.pi / 4;
    final double rr = i.isEven ? r : r * 0.32;
    final Offset o = c + Offset(math.cos(a) * rr, math.sin(a) * rr);
    if (i == 0) {
      p.moveTo(o.dx, o.dy);
    } else {
      p.lineTo(o.dx, o.dy);
    }
  }
  canvas.drawPath(p..close(), paint);
}
