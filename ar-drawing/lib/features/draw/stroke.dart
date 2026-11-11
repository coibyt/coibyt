import 'dart:ui';

import 'package:flutter/foundation.dart';

/// Tools of the digital drawing board.
enum DrawTool { brush, eraser }

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
  });

  final DrawTool tool;
  final Color color;

  /// Line width relative to the canvas width.
  final double width;
  final List<StrokePoint> points;

  Stroke withPoint(StrokePoint p) =>
      Stroke(tool: tool, color: color, width: width, points: <StrokePoint>[...points, p]);
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
