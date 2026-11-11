import 'dart:math' as math;
import 'dart:ui' as ui;

import 'package:flutter/material.dart';

import '../../logic/visual_story.dart';
import '../../models/blocks.dart';
import '../../tutor/teacher_avatar.dart';

/// Màu phấn.
abstract final class Chalk {
  static const white = Color(0xFFF7F5EA);
  static const yellow = Color(0xFFFFE27A);
  static const pink = Color(0xFFFF9EC4);
  static const blue = Color(0xFF9ED8FF);
  static const green = Color(0xFFA8F0B0);
  static const board = Color(0xFF1F4A3A);

  static TextStyle style({double size = 20, Color color = white, FontWeight weight = FontWeight.w700}) => TextStyle(
    fontFamily: 'Andika',
    fontSize: size,
    height: 1.35,
    fontWeight: weight,
    color: color,
    shadows: [Shadow(color: color.withValues(alpha: 0.45), blurRadius: 2.5)],
  );
}

bool _motion(BuildContext context) =>
    TeacherAvatar.motionEnabled && !(MediaQuery.maybeDisableAnimationsOf(context) ?? false);

/// Cây bút phấn của cô (đầu bút ở góc dưới trái ảnh).
class ChalkPen extends StatelessWidget {
  const ChalkPen({super.key, this.size = 46});

  final double size;

  @override
  Widget build(BuildContext context) => IgnorePointer(
    child: Image.asset(
      'assets/ui/chalk_pen.webp',
      width: size,
      height: size,
      errorBuilder: (_, _, _) => Icon(Icons.edit_rounded, size: size * 0.8, color: Chalk.yellow),
    ),
  );
}

/// Chữ phấn được viết dần từng ký tự, bút chạy theo đầu dòng chữ.
/// Đổi [text] (vd "6 × 8 = ?" → "6 × 8 = 48") thì chỉ viết tiếp phần mới.
class ChalkText extends StatefulWidget {
  const ChalkText(
    this.text, {
    super.key,
    this.style,
    this.animate = true,
    this.delay = Duration.zero,
    this.charsPerSecond = 15,
    this.align = TextAlign.left,
  });

  final String text;
  final TextStyle? style;
  final bool animate;
  final Duration delay;
  final double charsPerSecond;
  final TextAlign align;

  @override
  State<ChalkText> createState() => _ChalkTextState();
}

class _ChalkTextState extends State<ChalkText> with SingleTickerProviderStateMixin {
  late final AnimationController _c = AnimationController(vsync: this);
  int _from = 0;

  Duration _dur(int chars) => Duration(milliseconds: (chars / widget.charsPerSecond * 1000).clamp(250, 6000).round());

  @override
  void initState() {
    super.initState();
    if (!widget.animate) {
      _c.value = 1;
      return;
    }
    _c.duration = _dur(widget.text.length);
    Future<void>.delayed(widget.delay, () {
      if (mounted) _c.forward();
    });
  }

  @override
  void didUpdateWidget(ChalkText old) {
    super.didUpdateWidget(old);
    if (old.text == widget.text) return;
    var p = 0;
    while (p < old.text.length && p < widget.text.length && old.text[p] == widget.text[p]) {
      p++;
    }
    _from = p;
    _c.duration = _dur(widget.text.length - p);
    _c.forward(from: 0);
  }

  @override
  void dispose() {
    _c.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final style = widget.style ?? Chalk.style();
    if (!_motion(context)) _c.value = 1;
    return LayoutBuilder(
      builder: (context, box) {
        final tp = TextPainter(
          text: TextSpan(text: widget.text, style: style),
          textDirection: TextDirection.ltr,
          textAlign: widget.align,
        )..layout(maxWidth: box.maxWidth.isFinite ? box.maxWidth : double.infinity);
        final lineH = (style.fontSize ?? 20) * (style.height ?? 1.3);
        return AnimatedBuilder(
          animation: _c,
          builder: (context, _) {
            final n = widget.text.length;
            final shown = (_from + ((n - _from) * _c.value).round()).clamp(0, n);
            final writing = _c.isAnimating && shown < n;
            final caret = tp.getOffsetForCaret(TextPosition(offset: shown), Rect.zero);
            return Stack(
              clipBehavior: Clip.none,
              children: [
                RichText(
                  // Chiếm hết chiều ngang để căn giữa / căn phải đúng như TextPainter đã đo.
                  textWidthBasis: TextWidthBasis.parent,
                  textAlign: widget.align,
                  text: TextSpan(
                    style: style,
                    children: [
                      TextSpan(text: widget.text.substring(0, shown)),
                      TextSpan(
                        text: widget.text.substring(shown),
                        style: const TextStyle(color: Colors.transparent, shadows: []),
                      ),
                    ],
                  ),
                ),
                if (writing) Positioned(left: caret.dx - 4, top: caret.dy + lineH * 0.8 - 46, child: const ChalkPen()),
              ],
            );
          },
        );
      },
    );
  }
}

// ---------------------------------------------------------------------------
// Hình vẽ bằng phấn: các nét vẽ lần lượt, chữ chú thích viết theo thứ tự.
// ---------------------------------------------------------------------------

sealed class ChalkItem {
  const ChalkItem();
}

class ChalkStroke extends ChalkItem {
  const ChalkStroke(this.path, {this.color = Chalk.white, this.width = 3, this.fill});

  final Path path;
  final Color color;
  final double width;

  /// Tô màu (nhạt) sau khi vẽ xong nét.
  final Color? fill;
}

class ChalkLabel extends ChalkItem {
  const ChalkLabel(this.text, this.at, {this.color = Chalk.white, this.size = 16, this.center = true});

  final String text;
  final Offset at;
  final Color color;
  final double size;
  final bool center;
}

class ChalkDesign {
  const ChalkDesign(this.width, this.height, this.items);

  final double width;
  final double height;
  final List<ChalkItem> items;
}

Path _line(Offset a, Offset b) => Path()
  ..moveTo(a.dx, a.dy)
  ..lineTo(b.dx, b.dy);

Path _poly(List<Offset> p, {bool close = true}) {
  final path = Path()..moveTo(p.first.dx, p.first.dy);
  for (final o in p.skip(1)) {
    path.lineTo(o.dx, o.dy);
  }
  if (close) path.close();
  return path;
}

Path _circle(Offset c, double r) => Path()..addOval(Rect.fromCircle(center: c, radius: r));

Path _dot(Offset c, [double r = 4]) => _circle(c, r);

class ChalkDrawing extends StatefulWidget {
  const ChalkDrawing({super.key, required this.design, this.animate = true, this.unitsPerSecond = 240});

  final ChalkDesign design;
  final bool animate;
  final double unitsPerSecond;

  @override
  State<ChalkDrawing> createState() => _ChalkDrawingState();
}

class _ChalkDrawingState extends State<ChalkDrawing> with SingleTickerProviderStateMixin {
  late final AnimationController _c = AnimationController(vsync: this);
  late final List<double> _lengths = [
    for (final it in widget.design.items)
      switch (it) {
        ChalkStroke(:final path) => path.computeMetrics().fold<double>(0, (s, m) => s + m.length),
        ChalkLabel(:final text) => 14.0 * text.length.clamp(1, 8),
      },
  ];
  late final double _total = _lengths.fold(0, (a, b) => a + b);

  @override
  void initState() {
    super.initState();
    if (!widget.animate) {
      _c.value = 1;
      return;
    }
    _c.duration = Duration(milliseconds: (_total / widget.unitsPerSecond * 1000).clamp(1200, 9000).round());
    _c.forward();
  }

  @override
  void dispose() {
    _c.dispose();
    super.dispose();
  }

  /// Vị trí đầu bút (toạ độ thiết kế) ở tiến độ [t].
  Offset? _penAt(double t) {
    var left = t * _total;
    for (final (i, it) in widget.design.items.indexed) {
      final len = _lengths[i];
      if (left <= len) {
        return switch (it) {
          ChalkStroke(:final path) => () {
            for (final m in path.computeMetrics()) {
              if (left <= m.length) return m.getTangentForOffset(left)?.position;
              left -= m.length;
            }
            return null;
          }(),
          ChalkLabel(:final at, :final text, :final size) => at + Offset(size * 0.3 * text.length * (left / len), 0),
        };
      }
      left -= len;
    }
    return null;
  }

  @override
  Widget build(BuildContext context) {
    if (!_motion(context)) _c.value = 1;
    final d = widget.design;
    return AspectRatio(
      aspectRatio: d.width / d.height,
      child: LayoutBuilder(
        builder: (context, box) {
          final k = box.maxWidth / d.width;
          return AnimatedBuilder(
            animation: _c,
            builder: (context, _) {
              final pen = _c.isAnimating ? _penAt(_c.value) : null;
              return Stack(
                clipBehavior: Clip.none,
                children: [
                  Positioned.fill(child: CustomPaint(painter: _ChalkPainter(d, _lengths, _total, _c.value, k))),
                  if (pen != null) Positioned(left: pen.dx * k - 4, top: pen.dy * k - 42, child: const ChalkPen()),
                ],
              );
            },
          );
        },
      ),
    );
  }
}

class _ChalkPainter extends CustomPainter {
  _ChalkPainter(this.design, this.lengths, this.total, this.t, this.k);

  final ChalkDesign design;
  final List<double> lengths;
  final double total;
  final double t;
  final double k;

  @override
  void paint(Canvas canvas, Size size) {
    canvas.save();
    canvas.scale(k);
    var left = t * total;
    for (final (i, it) in design.items.indexed) {
      if (left <= 0) break;
      final len = lengths[i];
      final part = math.min(left, len);
      switch (it) {
        case ChalkStroke(:final path, :final color, :final width, :final fill):
          if (fill != null && part >= len) {
            canvas.drawPath(path, Paint()..color = fill.withValues(alpha: 0.35));
          }
          final drawn = Path();
          var rest = part;
          for (final m in path.computeMetrics()) {
            if (rest <= 0) break;
            drawn.addPath(m.extractPath(0, math.min(rest, m.length)), Offset.zero);
            rest -= m.length;
          }
          // Nét phấn: lớp mờ to + lớp sáng mảnh, hơi lệch → giống phấn thật.
          canvas.drawPath(
            drawn,
            Paint()
              ..color = color.withValues(alpha: 0.35)
              ..style = PaintingStyle.stroke
              ..strokeWidth = width + 2
              ..strokeCap = StrokeCap.round
              ..strokeJoin = StrokeJoin.round
              ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 1.2),
          );
          canvas.drawPath(
            drawn.shift(const Offset(0.4, -0.3)),
            Paint()
              ..color = color
              ..style = PaintingStyle.stroke
              ..strokeWidth = width
              ..strokeCap = StrokeCap.round
              ..strokeJoin = StrokeJoin.round,
          );
        case ChalkLabel(:final text, :final at, :final color, :final size, :final center):
          final n = (text.length * (part / len)).ceil().clamp(0, text.length);
          final tp = TextPainter(
            text: TextSpan(
              text: text.substring(0, n),
              style: Chalk.style(size: size, color: color),
            ),
            textDirection: TextDirection.ltr,
          )..layout();
          final full = TextPainter(
            text: TextSpan(
              text: text,
              style: Chalk.style(size: size, color: color),
            ),
            textDirection: TextDirection.ltr,
          )..layout();
          final o = center ? at - Offset(full.width / 2, full.height / 2) : at;
          tp.paint(canvas, o);
      }
      left -= len;
    }
    canvas.restore();
  }

  @override
  bool shouldRepaint(_ChalkPainter old) => old.t != t || old.k != k || old.design != design;
}

// ---------------------------------------------------------------------------
// Hình vẽ theo bài (xem boardDiagramFor) — khung thiết kế 320 × 200.
// ---------------------------------------------------------------------------

final Map<String, ChalkDesign> _diagramCache = {};

ChalkDesign? chalkDiagram(String kind) {
  if (_diagramCache.containsKey(kind)) return _diagramCache[kind];
  final d = _buildDiagram(kind);
  if (d != null) _diagramCache[kind] = d;
  return d;
}

ChalkDesign? _buildDiagram(String kind) {
  const w = Chalk.white, y = Chalk.yellow, p = Chalk.pink, b = Chalk.blue, g = Chalk.green;
  ChalkLabel l(String t, double x, double yy, {Color c = w, double s = 16}) =>
      ChalkLabel(t, Offset(x, yy), color: c, size: s);
  ChalkStroke s(Path path, {Color c = w, double width = 3, Color? fill}) =>
      ChalkStroke(path, color: c, width: width, fill: fill);
  Path rightMark(Offset o, Offset u, Offset v, [double d = 12]) =>
      _poly([o + u * d, o + u * d + v * d, o + v * d], close: false);
  switch (kind) {
    case 'midpoint':
      return ChalkDesign(320, 200, [
        s(_line(const Offset(40, 70), const Offset(280, 70))),
        s(_dot(const Offset(40, 70)), fill: w),
        l('A', 40, 92),
        s(_dot(const Offset(280, 70)), fill: w),
        l('B', 280, 92),
        s(_line(const Offset(96, 62), const Offset(104, 78)), c: y),
        s(_line(const Offset(216, 62), const Offset(224, 78)), c: y),
        s(_dot(const Offset(160, 70), 5), c: p, fill: p),
        l('M', 160, 92, c: p, s: 18),
        s(_line(const Offset(40, 150), const Offset(280, 150))),
        s(_dot(const Offset(60, 150)), fill: w),
        l('C', 60, 172),
        s(_dot(const Offset(160, 150)), c: y, fill: y),
        l('O', 160, 172, c: y),
        s(_dot(const Offset(260, 150)), fill: w),
        l('D', 260, 172),
      ]);
    case 'circle':
      const o = Offset(140, 100);
      return ChalkDesign(320, 200, [
        s(_circle(o, 80)),
        s(_dot(o), fill: w),
        l('O', 128, 112),
        s(_line(o, const Offset(220, 100)), c: y, width: 3.5),
        l('A', 232, 100, c: y),
        l('bán kính', 186, 88, c: y, s: 13),
        s(_line(const Offset(83, 43), const Offset(197, 157)), c: p, width: 3.5),
        l('C', 74, 34, c: p),
        l('D', 206, 166, c: p),
        l('đường kính', 268, 160, c: p, s: 13),
      ]);
    case 'angle':
      return ChalkDesign(320, 200, [
        s(_line(const Offset(40, 160), const Offset(40, 40))),
        s(_line(const Offset(40, 160), const Offset(150, 160))),
        s(rightMark(const Offset(40, 160), const Offset(0, -1), const Offset(1, 0), 16), c: y),
        l('O', 30, 172),
        l('góc vuông', 92, 186, c: y, s: 14),
        s(_line(const Offset(190, 160), const Offset(240, 50))),
        s(_line(const Offset(190, 160), const Offset(300, 160))),
        s(Path()..addArc(Rect.fromCircle(center: const Offset(190, 160), radius: 22), -1.14, 1.14), c: p),
        l('góc không vuông', 248, 186, c: p, s: 14),
      ]);
    case 'shapes':
      return ChalkDesign(320, 200, [
        s(_poly(const [Offset(20, 85), Offset(60, 15), Offset(100, 85)]), c: y),
        l('tam giác', 60, 100, c: y, s: 13),
        s(_poly(const [Offset(125, 85), Offset(140, 20), Offset(195, 30), Offset(185, 85)]), c: b),
        l('tứ giác', 160, 100, c: b, s: 13),
        s(_poly(const [Offset(20, 120), Offset(160, 120), Offset(160, 180), Offset(20, 180)]), c: p),
        s(rightMark(const Offset(20, 180), const Offset(0, -1), const Offset(1, 0)), c: p, width: 2),
        l('chữ nhật', 90, 150, c: p, s: 14),
        s(_poly(const [Offset(200, 110), Offset(270, 110), Offset(270, 180), Offset(200, 180)]), c: g),
        s(rightMark(const Offset(200, 180), const Offset(0, -1), const Offset(1, 0)), c: g, width: 2),
        l('vuông', 235, 145, c: g, s: 14),
      ]);
    case 'draw':
      return ChalkDesign(320, 200, [
        s(_line(const Offset(30, 170), const Offset(30, 70))),
        s(_line(const Offset(30, 170), const Offset(110, 170))),
        s(rightMark(const Offset(30, 170), const Offset(0, -1), const Offset(1, 0), 14), c: y),
        s(_circle(const Offset(165, 110), 45), c: b),
        s(_dot(const Offset(165, 110)), c: b, fill: b),
        s(_poly(const [Offset(230, 70), Offset(300, 70), Offset(300, 140), Offset(230, 140)]), c: p),
      ]);
    case 'solids':
      return ChalkDesign(320, 200, [
        s(_poly(const [Offset(30, 80), Offset(110, 80), Offset(110, 160), Offset(30, 160)]), c: y),
        s(_poly(const [Offset(30, 80), Offset(60, 50), Offset(140, 50), Offset(110, 80)], close: false), c: y),
        s(_poly(const [Offset(140, 50), Offset(140, 130), Offset(110, 160)], close: false), c: y),
        l('khối lập phương', 85, 185, c: y, s: 13),
        s(_poly(const [Offset(170, 100), Offset(280, 100), Offset(280, 160), Offset(170, 160)]), c: b),
        s(_poly(const [Offset(170, 100), Offset(195, 75), Offset(305, 75), Offset(280, 100)], close: false), c: b),
        s(_poly(const [Offset(305, 75), Offset(305, 135), Offset(280, 160)], close: false), c: b),
        l('khối hộp chữ nhật', 238, 185, c: b, s: 13),
      ]);
    case 'fraction':
      const o = Offset(110, 100);
      return ChalkDesign(320, 200, [
        s(_circle(o, 75)),
        s(_line(const Offset(110, 25), const Offset(110, 175))),
        s(_line(const Offset(35, 100), const Offset(185, 100))),
        s(
          Path()
            ..moveTo(o.dx, o.dy)
            ..arcTo(Rect.fromCircle(center: o, radius: 75), -math.pi / 2, math.pi / 2, false)
            ..close(),
          c: y,
          fill: y,
        ),
        l('1', 250, 70, c: y, s: 30),
        s(_line(const Offset(232, 98), const Offset(268, 98)), c: y),
        l('4', 250, 124, c: y, s: 30),
        l('một phần tư', 250, 168, c: y, s: 14),
      ]);
    case 'ruler':
      return ChalkDesign(320, 200, [
        s(_poly(const [Offset(15, 60), Offset(305, 60), Offset(305, 125), Offset(15, 125)])),
        for (var i = 0; i <= 50; i++)
          s(
            _line(Offset(30 + i * 5.4, 60), Offset(30 + i * 5.4, 60 + (i % 10 == 0 ? 32 : (i % 5 == 0 ? 22 : 13)))),
            c: i % 10 == 0 ? y : w,
            width: i % 10 == 0 ? 2.5 : 1.3,
          ),
        for (var c = 0; c <= 5; c++) l('$c', 30 + c * 54, 108, c: y, s: 14),
        s(_line(const Offset(30, 145), const Offset(84, 145)), c: p),
        l('1 cm = 10 mm', 160, 172, c: p, s: 18),
      ]);
    case 'balance':
      return ChalkDesign(320, 200, [
        s(_poly(const [Offset(135, 180), Offset(160, 150), Offset(185, 180)])),
        s(_line(const Offset(160, 150), const Offset(160, 60))),
        s(_line(const Offset(60, 60), const Offset(260, 60)), width: 3.5),
        s(_poly(const [Offset(35, 115), Offset(60, 60), Offset(85, 115)], close: false)),
        s(Path()..addArc(Rect.fromLTWH(30, 95, 60, 40), 0, math.pi), c: y),
        s(_poly(const [Offset(235, 115), Offset(260, 60), Offset(285, 115)], close: false)),
        s(Path()..addArc(Rect.fromLTWH(230, 95, 60, 40), 0, math.pi), c: y),
        l('1 kg', 60, 152, c: y, s: 18),
        l('1000 g', 260, 152, c: y, s: 18),
      ]);
    case 'jug':
      return ChalkDesign(320, 200, [
        s(_poly(const [Offset(100, 30), Offset(100, 180), Offset(200, 180), Offset(200, 30)], close: false)),
        s(
          Path()
            ..moveTo(200, 60)
            ..quadraticBezierTo(250, 70, 235, 110)
            ..quadraticBezierTo(225, 140, 200, 140),
        ),
        s(
          _poly(const [Offset(102, 110), Offset(198, 110), Offset(198, 178), Offset(102, 178)]),
          c: b,
          width: 1.5,
          fill: b,
        ),
        for (var i = 1; i <= 5; i++) s(_line(Offset(100, 180 - i * 28.0), Offset(118, 180 - i * 28.0)), width: 2),
        l('1000 ml', 60, 40, c: y, s: 15),
        l('500 ml', 60, 110, c: y, s: 15),
        l('1 l = 1000 ml', 262, 178, c: p, s: 15),
      ]);
    case 'thermo':
      return ChalkDesign(320, 200, [
        s(Path()..addRRect(RRect.fromRectAndRadius(const Rect.fromLTWH(150, 15, 20, 140), const Radius.circular(10)))),
        s(_circle(const Offset(160, 170), 17)),
        s(_poly(const [Offset(155, 70), Offset(165, 70), Offset(165, 160), Offset(155, 160)]), c: p, fill: p),
        s(_dot(const Offset(160, 170), 12), c: p, fill: p),
        for (var i = 0; i < 9; i++) s(_line(Offset(132, 30 + i * 14.0), Offset(146, 30 + i * 14.0)), width: 1.8),
        l('nóng', 230, 50, c: p, s: 18),
        l('lạnh', 230, 150, c: b, s: 18),
        l('°C', 100, 100, c: y, s: 22),
      ]);
    case 'perimeter':
      return ChalkDesign(320, 200, [
        s(_poly(const [Offset(60, 40), Offset(260, 40), Offset(260, 140), Offset(60, 140)])),
        l('5 cm', 160, 24, c: y),
        l('3 cm', 288, 90, c: y),
        l('5 cm', 160, 156, c: y),
        l('3 cm', 32, 90, c: y),
        l('Chu vi: 5 + 3 + 5 + 3 = 16 cm', 160, 184, c: p, s: 15),
      ]);
    case 'area':
      const u = 30.0;
      const cells = [(0, 0), (1, 0), (2, 0), (0, 1), (0, 2), (1, 2)];
      return ChalkDesign(320, 200, [
        for (final (cx, cy) in cells)
          s(Path()..addRect(Rect.fromLTWH(30 + cx * u, 20 + cy * u, u, u)), c: y, width: 2, fill: y),
        l('6 cm²', 70, 130, c: y, s: 18),
        s(Path()..addRect(const Rect.fromLTWH(220, 40, u, u)), c: p, width: 2.5, fill: p),
        l('1 cm²', 235, 92, c: p, s: 16),
        l('cạnh 1 cm', 235, 20, c: p, s: 13),
        l('Hình tô màu gồm 6 ô vuông 1 cm²', 160, 182, s: 14),
      ]);
    case 'areaRect':
      const u = 32.0;
      return ChalkDesign(320, 200, [
        s(Path()..addRect(const Rect.fromLTWH(60, 30, 4 * u, 3 * u)), width: 3.5),
        for (var i = 1; i < 4; i++) s(_line(Offset(60 + i * u, 30), Offset(60 + i * u, 30 + 3 * u)), width: 1.5),
        for (var j = 1; j < 3; j++) s(_line(Offset(60, 30 + j * u), Offset(60 + 4 * u, 30 + j * u)), width: 1.5),
        l('4 cm', 124, 16, c: y),
        l('3 cm', 34, 78, c: y),
        l('4 × 3 = 12 cm²', 230, 80, c: p, s: 18),
        l('Dài × rộng', 230, 110, c: p, s: 14),
      ]);
    case 'place4' || 'place5':
      final heads = kind == 'place4'
          ? const ['Nghìn', 'Trăm', 'Chục', 'Đơn vị']
          : const ['Chục nghìn', 'Nghìn', 'Trăm', 'Chục', 'Đơn vị'];
      final digits = kind == 'place4' ? '3452' : '23456';
      final cw = 280 / heads.length;
      return ChalkDesign(320, 200, [
        s(Path()..addRect(const Rect.fromLTWH(20, 20, 280, 110))),
        s(_line(const Offset(20, 60), const Offset(300, 60))),
        for (var i = 1; i < heads.length; i++) s(_line(Offset(20 + i * cw, 20), Offset(20 + i * cw, 130))),
        for (final (i, h) in heads.indexed) l(h, 20 + cw * (i + 0.5), 40, c: b, s: heads.length > 4 ? 11 : 13),
        for (var i = 0; i < digits.length; i++) l(digits[i], 20 + cw * (i + 0.5), 95, c: y, s: 30),
        l(kind == 'place4' ? 'Số 3 452' : 'Số 23 456', 160, 165, c: p, s: 22),
      ]);
    case 'numberLine':
      return ChalkDesign(320, 200, [
        s(_line(const Offset(15, 110), const Offset(305, 110))),
        s(_poly(const [Offset(295, 104), Offset(305, 110), Offset(295, 116)], close: false)),
        for (var i = 0; i <= 10; i++)
          s(
            _line(Offset(30 + i * 26.0, i % 5 == 0 ? 98 : 103), Offset(30 + i * 26.0, i % 5 == 0 ? 122 : 117)),
            width: 2,
          ),
        l('40', 30, 140, c: y),
        l('45', 160, 140),
        l('50', 290, 140, c: y),
        s(_dot(const Offset(108, 110), 6), c: p, fill: p),
        l('43', 108, 82, c: p, s: 18),
        s(
          Path()
            ..moveTo(108, 70)
            ..quadraticBezierTo(70, 40, 34, 92),
          c: p,
          width: 2.5,
        ),
        l('43 ≈ 40', 160, 182, c: p, s: 18),
      ]);
    case 'clock':
      const o = Offset(160, 100);
      Offset at(double turns, double r) =>
          o + Offset(math.cos(turns * 2 * math.pi - math.pi / 2), math.sin(turns * 2 * math.pi - math.pi / 2)) * r;
      return ChalkDesign(320, 200, [
        s(_circle(o, 88), width: 3.5),
        for (var h = 0; h < 12; h++) s(_line(at(h / 12, 80), at(h / 12, 88)), width: 2.5),
        for (var h = 1; h <= 12; h++) l('$h', at(h / 12, 66).dx, at(h / 12, 66).dy, s: 15),
        s(_line(o, at(8.25 / 12, 42)), c: p, width: 5),
        s(_line(o, at(0.25, 70)), c: y, width: 3.5),
        s(_dot(o, 5), fill: w),
        l('8 giờ 15 phút', 160, 196, c: y, s: 14),
      ]);
    case 'tally':
      Iterable<ChalkItem> group(double x0, int n) sync* {
        for (var i = 0; i < math.min(n, 4); i++) {
          yield s(_line(Offset(x0 + i * 14, 50), Offset(x0 + i * 14, 120)), width: 3.5);
        }
        if (n == 5) yield s(_line(Offset(x0 - 8, 110), Offset(x0 + 50, 60)), c: y, width: 3.5);
      }
      return ChalkDesign(320, 200, [
        ...group(30, 5),
        ...group(120, 5),
        ...group(210, 2),
        l('5', 50, 145, c: y),
        l('10', 140, 145, c: y),
        l('12', 220, 145, c: y),
        l('Có 12 bạn chọn', 160, 182, c: p, s: 18),
      ]);
    case 'segments' || 'segmentsDown':
      final up = kind == 'segments';
      final topLen = up ? 70.0 : 240.0;
      final botLen = up ? 210.0 : 80.0;
      Iterable<ChalkItem> bar(double y0, double len, int parts, Color c) sync* {
        yield s(_line(Offset(40, y0), Offset(40 + len, y0)), c: c, width: 4);
        for (var i = 0; i <= parts; i++) {
          yield s(_line(Offset(40 + len / parts * i, y0 - 9), Offset(40 + len / parts * i, y0 + 9)), c: c, width: 2.5);
        }
      }
      return ChalkDesign(320, 200, [
        ...bar(60, topLen, up ? 1 : 3, y),
        l(up ? '2 cm' : '12 cm', 40 + topLen / 2, 36, c: y),
        ...bar(140, botLen, up ? 3 : 1, p),
        l(up ? '? cm' : '? cm', 40 + botLen / 2, 166, c: p),
        l(up ? '2 × 3 = 6 (cm)' : '12 : 3 = 4 (cm)', 230, up ? 100 : 140, c: g, s: 16),
      ]);
    case 'remainder':
      Iterable<ChalkItem> dots(double x0, double y0, int n, Color c) sync* {
        for (var i = 0; i < n; i++) {
          yield s(_dot(Offset(x0 + (i % 3) * 22, y0 + (i ~/ 3) * 24), 6), c: c, fill: c);
        }
      }
      return ChalkDesign(320, 200, [
        s(Path()..addOval(const Rect.fromLTWH(15, 40, 90, 70)), c: y),
        ...dots(38, 62, 5, w),
        s(Path()..addOval(const Rect.fromLTWH(120, 40, 90, 70)), c: y),
        ...dots(143, 62, 5, w),
        ...dots(240, 62, 4, p),
        l('dư 4', 262, 128, c: p),
        l('14 : 5 = 2 (dư 4)', 160, 172, c: y, s: 20),
      ]);
    case 'roman':
      return ChalkDesign(320, 200, [
        l('I = 1', 60, 40, c: y, s: 26),
        l('V = 5', 160, 40, c: y, s: 26),
        l('X = 10', 265, 40, c: y, s: 26),
        s(_line(const Offset(20, 75), const Offset(300, 75)), width: 1.5),
        l('II = 2', 80, 110, s: 22),
        l('IV = 4', 240, 110, s: 22),
        l('VI = 6', 80, 160, s: 22),
        l('IX = 9', 240, 160, s: 22),
      ]);
  }
  return null;
}

/// Đồ vật vẽ phấn cho một phép tính (vòng tròn đựng các chấm), dùng câu chuyện [aidStory].
ChalkDesign? chalkObjects(String equation) {
  final st = aidStory(equation);
  if (st == null || st.kind == 'place') return null;
  final items = <ChalkItem>[];
  const ringW = 72.0, ringH = 58.0, gapX = 6.0, gapY = 26.0;
  final groups = st.groups;
  final perRow = st.kind == 'add' ? 2 : 4;
  final rows = (groups / perRow).ceil();
  final width = 320.0;
  final height = rows * (ringH + gapY) + 10;
  for (var g = 0; g < groups; g++) {
    final row = g ~/ perRow, col = g % perRow;
    final inRow = math.min(perRow, groups - row * perRow);
    final x0 = (width - inRow * ringW - (inRow - 1) * gapX) / 2 + col * (ringW + gapX);
    final y0 = 6 + row * (ringH + gapY);
    items.add(ChalkStroke(Path()..addOval(Rect.fromLTWH(x0, y0, ringW, ringH)), color: Chalk.yellow, width: 2.5));
    final n = st.itemsIn(g);
    final cols = n <= 4 ? n : (n <= 6 ? 3 : 5);
    final rws = (n / math.max(cols, 1)).ceil();
    for (var i = 0; i < n; i++) {
      final cx = x0 + ringW / 2 + ((i % cols) - (cols - 1) / 2) * 12;
      final cy = y0 + ringH / 2 + ((i ~/ cols) - (rws - 1) / 2) * 13;
      final crossed = st.kind == 'sub' && i >= n - st.b;
      items.add(
        ChalkStroke(
          _dot(Offset(cx, cy), 4.2),
          color: crossed ? Chalk.pink : Chalk.white,
          width: 1.5,
          fill: crossed ? null : Chalk.white,
        ),
      );
      if (crossed) {
        items.add(ChalkStroke(_line(Offset(cx - 6, cy - 6), Offset(cx + 6, cy + 6)), color: Chalk.pink, width: 2));
      }
    }
    final label = switch (st.kind) {
      'mul' => '${st.a * (g + 1)}',
      'div' => '${st.c}',
      'add' => '${st.itemsIn(g)}',
      _ => '${st.a} − ${st.b} = ${st.c}',
    };
    items.add(ChalkLabel(label, Offset(x0 + ringW / 2, y0 + ringH + 12), color: Chalk.yellow, size: 15));
  }
  if (st.kind == 'add') {
    items.add(const ChalkLabel('+', Offset(160, 36), color: Chalk.white, size: 26));
  }
  return ChalkDesign(width, height, items);
}

// ---------------------------------------------------------------------------
// Đặt tính trên bảng.
// ---------------------------------------------------------------------------

/// Đặt tính cộng / trừ / nhân bằng phấn: cô viết từng chữ số kết quả theo bước.
class ChalkColumn extends StatelessWidget {
  const ChalkColumn({super.key, required this.block, required this.step});

  final ColumnArithmeticBlock block;

  /// Số bước đã làm (0..n).
  final int step;

  static const cell = 28.0;

  @override
  Widget build(BuildContext context) {
    final b = block;
    final cols = [...b.operands.map((o) => o.length), b.result.length].reduce(math.max) + 1;
    final shown = <int, String>{};
    final carries = <int, int>{};
    for (final (k, s) in b.digitSteps.indexed) {
      if (k >= step) break;
      for (var j = 0; j < s.write.length; j++) {
        shown[s.place + j] = s.write[s.write.length - 1 - j];
      }
      if (s.carry > 0) carries[s.place + 1] = s.carry;
    }
    final op = switch (b.operation) {
      ColumnOperation.add => '+',
      ColumnOperation.subtract => '−',
      ColumnOperation.multiply => '×',
    };
    Widget digitRow(String digits, {Color color = Chalk.white, String? sign}) => Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        for (var c = cols - 1; c >= 0; c--)
          SizedBox(
            width: cell,
            child: Text(
              c == cols - 1 && sign != null ? sign : (c < digits.length ? digits[digits.length - 1 - c] : ''),
              textAlign: TextAlign.center,
              style: Chalk.style(size: 30, color: c == cols - 1 && sign != null ? Chalk.pink : color),
            ),
          ),
      ],
    );
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Column(
          crossAxisAlignment: CrossAxisAlignment.end,
          mainAxisSize: MainAxisSize.min,
          children: [
            // Số nhớ (nhỏ, màu hồng) phía trên.
            Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                for (var c = cols - 1; c >= 0; c--)
                  SizedBox(
                    width: cell,
                    height: 18,
                    child: carries[c] == null
                        ? null
                        : Text(
                            '${carries[c]}',
                            textAlign: TextAlign.center,
                            style: Chalk.style(size: 14, color: Chalk.pink),
                          ),
                  ),
              ],
            ),
            digitRow(b.operands[0]),
            for (final o in b.operands.skip(1)) digitRow(o, sign: op),
            Container(
              width: cell * cols,
              height: 3,
              color: Chalk.white,
              margin: const EdgeInsets.symmetric(vertical: 2),
            ),
            Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                for (var c = cols - 1; c >= 0; c--)
                  SizedBox(
                    width: cell,
                    height: 42,
                    child: AnimatedSwitcher(
                      duration: const Duration(milliseconds: 350),
                      transitionBuilder: (child, a) => ScaleTransition(scale: a, child: child),
                      child: shown[c] == null
                          ? const SizedBox.shrink()
                          : Text(
                              shown[c]!,
                              key: ValueKey('d$c${shown[c]}'),
                              textAlign: TextAlign.center,
                              style: Chalk.style(size: 30, color: Chalk.yellow),
                            ),
                    ),
                  ),
              ],
            ),
          ],
        ),
      ],
    );
  }
}

/// Chia dài kiểu Việt Nam: số bị chia | số chia, thương dưới số chia, các số dư hạ xuống dần.
class ChalkDivision extends StatelessWidget {
  const ChalkDivision({super.key, required this.block, required this.step});

  final LongDivisionBlock block;
  final int step;

  static const cell = 24.0, rowH = 34.0;

  @override
  Widget build(BuildContext context) {
    final b = block;
    final n = b.digitSteps.length;
    final len = b.dividend.length;
    final e0 = '${b.digitSteps.first.partialDividend}'.length - 1;
    final rows = <(int, String)>[]; // (cột cuối, chữ)
    for (var k = 1; k <= math.min(step, n); k++) {
      if (k < n) {
        final e = e0 + k;
        if (e < len) rows.add((e, '${b.digitSteps[k - 1].remainder}${b.dividend[e]}'));
      } else {
        rows.add((math.min(e0 + n - 1, len - 1), '${b.digitSteps[n - 1].remainder}'));
      }
    }
    final quotient = b.quotient.substring(0, math.min(step, b.quotient.length).clamp(0, b.quotient.length));
    final leftW = cell * len + 8;
    final st = Chalk.style(size: 26);
    return SizedBox(
      width: leftW + 120,
      height: rowH * (rows.length + 1) + 8,
      child: Stack(
        children: [
          Positioned(
            left: 0,
            top: 0,
            child: Text(b.dividend.split('').join(' '), style: st.copyWith(letterSpacing: 0)),
          ),
          for (final (i, (e, t)) in rows.indexed)
            Positioned(
              left: (e - t.length + 1) * cell * 1.0,
              top: rowH * (i + 1),
              child: Text(
                t.split('').join(' '),
                style: Chalk.style(size: 26, color: i == rows.length - 1 && step >= n ? Chalk.pink : Chalk.white),
              ),
            ),
          Positioned(
            left: leftW,
            top: 0,
            bottom: 0,
            child: Container(width: 3, color: Chalk.white),
          ),
          Positioned(
            left: leftW + 10,
            top: 2,
            child: Text(b.divisor, style: st),
          ),
          Positioned(
            left: leftW,
            top: rowH,
            child: Container(width: 110, height: 3, color: Chalk.white),
          ),
          Positioned(
            left: leftW + 10,
            top: rowH + 4,
            child: Text(quotient.split('').join(' '), style: Chalk.style(size: 26, color: Chalk.yellow)),
          ),
        ],
      ),
    );
  }
}

// ---------------------------------------------------------------------------
// Bảng và giẻ lau.
// ---------------------------------------------------------------------------

/// Khung bảng xanh: viền gỗ, máng phấn, vệt phấn mờ.
class ChalkBoardFrame extends StatelessWidget {
  const ChalkBoardFrame({super.key, required this.child});

  final Widget child;

  @override
  Widget build(BuildContext context) => Container(
    padding: const EdgeInsets.fromLTRB(9, 9, 9, 14),
    decoration: BoxDecoration(
      borderRadius: BorderRadius.circular(16),
      gradient: const LinearGradient(
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
        colors: [Color(0xFFC08A4E), Color(0xFF8C5A2B), Color(0xFFB27A3C)],
      ),
      boxShadow: const [BoxShadow(color: Color(0x55000000), blurRadius: 16, offset: Offset(0, 6))],
    ),
    child: ClipRRect(
      borderRadius: BorderRadius.circular(8),
      child: CustomPaint(painter: _BoardPainter(), child: child),
    ),
  );
}

class _BoardPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final r = Offset.zero & size;
    canvas.drawRect(
      r,
      Paint()
        ..shader = ui.Gradient.radial(
          size.center(Offset.zero),
          size.longestSide * 0.75,
          const [Color(0xFF2B5E4A), Chalk.board, Color(0xFF173A2D)],
          const [0, 0.6, 1],
        ),
    );
    // Vệt phấn cũ mờ mờ (cố định).
    final rnd = math.Random(7);
    final smear = Paint()
      ..color = const Color(0x0DFFFFFF)
      ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 18);
    for (var i = 0; i < 9; i++) {
      canvas.drawOval(
        Rect.fromCenter(
          center: Offset(rnd.nextDouble() * size.width, rnd.nextDouble() * size.height),
          width: 80 + rnd.nextDouble() * 160,
          height: 24 + rnd.nextDouble() * 40,
        ),
        smear,
      );
    }
  }

  @override
  bool shouldRepaint(_BoardPainter old) => false;
}

/// Giẻ lau bảng quét qua lại theo [progress] (0..1): phần đã lau biến mất khỏi [child], còn bụi phấn mờ.
class EraserSweep extends StatelessWidget {
  const EraserSweep({super.key, required this.progress, required this.child});

  final double progress;
  final Widget child;

  static const passes = 4;

  static List<Rect> wiped(Size size, double progress) {
    final band = size.height / passes;
    final t = progress * passes;
    return [
      for (var p = 0; p < passes; p++)
        if ((t - p) > 0)
          () {
            final f = (t - p).clamp(0.0, 1.0);
            final top = p * band - 8, hh = band + 16;
            return p.isEven
                ? Rect.fromLTWH(-4, top, size.width * f + 4, hh)
                : Rect.fromLTWH(size.width * (1 - f), top, size.width * f + 4, hh);
          }(),
    ];
  }

  @override
  Widget build(BuildContext context) => LayoutBuilder(
    builder: (context, box) {
      final w = box.maxWidth, h = box.maxHeight;
      final band = h / passes;
      final t = progress * passes;
      final pass = t.floor().clamp(0, passes - 1);
      final f = (t - pass).clamp(0.0, 1.0);
      final x = pass.isEven ? f * w : (1 - f) * w;
      final y = band * (pass + 0.5);
      return Stack(
        children: [
          Positioned.fill(
            child: progress <= 0 ? child : ClipPath(clipper: _Unwiped(progress), child: child),
          ),
          if (progress > 0)
            Positioned.fill(
              child: IgnorePointer(child: CustomPaint(painter: _DustPainter(progress))),
            ),
          if (progress > 0 && progress < 1)
            Positioned(
              left: x - 48,
              top: y - 32,
              child: Transform.rotate(
                angle: math.sin(progress * 40) * 0.12,
                child: Image.asset(
                  'assets/ui/eraser.webp',
                  width: 96,
                  height: 64,
                  errorBuilder: (_, _, _) => Container(
                    width: 88,
                    height: 40,
                    decoration: BoxDecoration(
                      color: const Color(0xFF8C5A2B),
                      borderRadius: BorderRadius.circular(8),
                      border: Border(bottom: BorderSide(color: Colors.grey.shade300, width: 10)),
                    ),
                  ),
                ),
              ),
            ),
        ],
      );
    },
  );
}

class _Unwiped extends CustomClipper<Path> {
  _Unwiped(this.progress);

  final double progress;

  @override
  Path getClip(Size size) {
    final wipe = Path();
    for (final r in EraserSweep.wiped(size, progress)) {
      wipe.addRect(r);
    }
    return Path.combine(PathOperation.difference, Path()..addRect(Offset.zero & size), wipe);
  }

  @override
  bool shouldReclip(_Unwiped old) => old.progress != progress;
}

class _DustPainter extends CustomPainter {
  _DustPainter(this.progress);

  final double progress;

  @override
  void paint(Canvas canvas, Size size) {
    final dust = Paint()
      ..color = Color.fromRGBO(255, 255, 255, 0.07 * (1 - progress * 0.6))
      ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 12);
    for (final r in EraserSweep.wiped(size, progress)) {
      canvas.drawRRect(RRect.fromRectAndRadius(r.deflate(10), const Radius.circular(30)), dust);
    }
  }

  @override
  bool shouldRepaint(_DustPainter old) => old.progress != progress;
}
