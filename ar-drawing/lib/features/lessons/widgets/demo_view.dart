import 'dart:async';
import 'dart:math' as math;
import 'dart:ui' as ui;

import 'package:flutter/material.dart';

import '../../../core/app_theme.dart';
import '../../../core/game_art.dart';
import '../../../core/i18n/language_controller.dart';
import '../../timelapse/timelapse_composer.dart' show resolveImage;
import '../lesson_demo.dart';

/// Lumi demonstrates a lesson step on the sheet: her magic brush follows the
/// step's strokes and the step's real colours appear behind it, on top of
/// what earlier steps already drew. Calls [onFinished] when done or skipped.
class DemoView extends StatefulWidget {
  const DemoView({
    super.key,
    required this.step,
    required this.target,
    this.previous,
    required this.onFinished,
    this.paper = const Color(0xFFFFFDF8),
    this.padding = 16,
  });

  final DemoStep step;

  /// Asset of the step's overlay (revealed by the brush).
  final String target;

  /// Asset of the previous step's overlay (already done), if any.
  final String? previous;
  final VoidCallback onFinished;
  final Color paper;

  /// Same padding as the tracing layer, so the demo lines up with it.
  final double padding;

  @override
  State<DemoView> createState() => _DemoViewState();
}

class _DemoViewState extends State<DemoView> with SingleTickerProviderStateMixin {
  late final AnimationController _t = AnimationController(
    vsync: this,
    duration: widget.step.duration,
  );
  ui.Image? _target, _previous, _brush;
  bool _finished = false;
  Timer? _hold;

  @override
  void initState() {
    super.initState();
    unawaited(_load());
    _t.addStatusListener((AnimationStatus s) {
      if (s == AnimationStatus.completed) {
        // Let the finished step sink in for a moment.
        _hold = Timer(const Duration(milliseconds: 900), _finish);
      }
    });
  }

  Future<void> _load() async {
    final List<ui.Image?> imgs = await Future.wait(<Future<ui.Image?>>[
      _safe(AssetImage(widget.target)),
      if (widget.previous != null)
        _safe(AssetImage(widget.previous!))
      else
        Future<ui.Image?>.value(),
      _safe(const AssetImage(GameArt.magicBrush)),
    ]);
    if (!mounted) return;
    setState(() {
      _target = imgs[0];
      _previous = imgs[1];
      _brush = imgs[2];
    });
    if (_target == null) {
      _finish();
    } else {
      unawaited(_t.forward());
    }
  }

  Future<ui.Image?> _safe(ImageProvider p) async {
    try {
      return await resolveImage(p);
    } on Object {
      return null;
    }
  }

  void _finish() {
    if (_finished) return;
    _finished = true;
    widget.onFinished();
  }

  @override
  void dispose() {
    _hold?.cancel();
    _t.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      fit: StackFit.expand,
      children: <Widget>[
        // Swallows touches: the learner watches first.
        GestureDetector(
          behavior: HitTestBehavior.opaque,
          onTap: () {},
          child: CustomPaint(
            key: const Key('demoCanvas'),
            painter: _DemoPainter(
              t: _t,
              step: widget.step,
              target: _target,
              previous: _previous,
              brush: _brush,
              paper: widget.paper,
              padding: widget.padding,
            ),
          ),
        ),
        Positioned(
          top: 10,
          left: 10,
          right: 10,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              Flexible(
                child: Container(
                  padding: const EdgeInsets.fromLTRB(6, 4, 14, 4),
                  decoration: BoxDecoration(
                    color: const Color(0xE6242150),
                    borderRadius: BorderRadius.circular(24),
                    boxShadow: const <BoxShadow>[
                      BoxShadow(color: Color(0x33000000), blurRadius: 8),
                    ],
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: <Widget>[
                      const ArtImage(GameArt.magicBrush, size: 30),
                      const SizedBox(width: 6),
                      Flexible(
                        child: Text(
                          context.tr('lesson.demo.playing'),
                          key: const Key('demoPlaying'),
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w800),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(width: 8),
              FilledButton.tonalIcon(
                key: const Key('skipDemo'),
                style: FilledButton.styleFrom(
                  backgroundColor: const Color(0xE6242150),
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                ),
                onPressed: () {
                  _t.stop();
                  _finish();
                },
                icon: const Icon(Icons.skip_next, size: 20),
                label: Text(context.tr('lesson.demo.skip')),
              ),
            ],
          ),
        ),
        // progress bar along the bottom of the sheet
        Positioned(
          left: 0,
          right: 0,
          bottom: 0,
          child: AnimatedBuilder(
            animation: _t,
            builder: (BuildContext context, _) => LinearProgressIndicator(
              value: _t.value,
              minHeight: 4,
              backgroundColor: const Color(0x22000000),
              color: AppTheme.lamp,
            ),
          ),
        ),
      ],
    );
  }
}

class _DemoPainter extends CustomPainter {
  _DemoPainter({
    required this.t,
    required this.step,
    required this.target,
    required this.previous,
    required this.brush,
    required this.paper,
    required this.padding,
  }) : super(repaint: t);

  final Animation<double> t;
  final DemoStep step;
  final ui.Image? target, previous, brush;
  final Color paper;
  final double padding;

  @override
  void paint(Canvas canvas, Size size) {
    canvas.drawRect(Offset.zero & size, Paint()..color = paper);
    final Rect pic = pictureRect(size, step.aspect, padding: padding);
    final Paint img = Paint()..filterQuality = FilterQuality.medium;
    final ui.Image? prev = previous, tgt = target;
    if (prev != null) {
      canvas.drawImageRect(
        prev,
        Offset.zero & Size(prev.width.toDouble(), prev.height.toDouble()),
        pic,
        img,
      );
    }
    if (tgt == null) return;
    final double v = t.value;
    final ({List<DemoStroke> done, Offset? tip}) now = step.at(v);
    final Rect src = Offset.zero & Size(tgt.width.toDouble(), tgt.height.toDouble());

    // The brush reveals the step's picture.
    canvas.saveLayer(pic.inflate(40), Paint());
    final Paint ink = Paint()
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round
      ..strokeJoin = StrokeJoin.round
      ..color = Colors.white;
    Offset at(Offset p) => Offset(pic.left + p.dx * pic.width, pic.top + p.dy * pic.height);
    for (final DemoStroke s in now.done) {
      ink.strokeWidth = math.max(2, s.width * pic.width);
      if (s.points.length == 1) {
        canvas.drawCircle(at(s.points.first), ink.strokeWidth / 2, Paint()..color = Colors.white);
        continue;
      }
      final Path path = Path()..moveTo(at(s.points.first).dx, at(s.points.first).dy);
      for (final Offset p in s.points.skip(1)) {
        final Offset q = at(p);
        path.lineTo(q.dx, q.dy);
      }
      canvas.drawPath(path, ink);
    }
    canvas.drawImageRect(
      tgt,
      src,
      pic,
      Paint()
        ..filterQuality = FilterQuality.medium
        ..blendMode = BlendMode.srcIn,
    );
    canvas.restore();

    // Finishing touches: anything the brush missed fades in at the end.
    if (v > 0.9) {
      canvas.drawImageRect(
        tgt,
        src,
        pic,
        Paint()
          ..filterQuality = FilterQuality.medium
          ..color = Color.fromRGBO(0, 0, 0, ((v - 0.9) / 0.1).clamp(0.0, 1.0)),
      );
    }

    // Lumi's magic brush with a soft golden glow at the tip.
    final Offset? tip = now.tip;
    if (tip != null && v < 1) {
      final Offset p = at(tip);
      canvas.drawCircle(
        p,
        16,
        Paint()
          ..color = const Color(0x66FFD27A)
          ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 10),
      );
      final double phase = v * 60;
      for (int i = 0; i < 5; i++) {
        final double a = phase + i * 1.3;
        canvas.drawCircle(
          p + Offset(math.cos(a) * (10 + i * 3), math.sin(a * 1.3) * (10 + i * 3)),
          1.6 + (i % 2),
          Paint()..color = Color.fromRGBO(255, 214, 120, 0.9 - i * 0.15),
        );
      }
      final ui.Image? b = brush;
      if (b != null) {
        const double s = 72;
        // the brush art's bristle tip is near its bottom-left corner
        final Rect dst = Rect.fromLTWH(p.dx - s * 0.1, p.dy - s * 0.9, s, s);
        canvas.drawImageRect(
          b,
          Offset.zero & Size(b.width.toDouble(), b.height.toDouble()),
          dst,
          Paint()..filterQuality = FilterQuality.medium,
        );
      }
    }
  }

  @override
  bool shouldRepaint(_DemoPainter old) =>
      old.target != target || old.previous != previous || old.brush != brush || old.step != step;
}
