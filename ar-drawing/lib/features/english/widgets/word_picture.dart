import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../english_catalog.dart';

/// The picture of a word: its illustration, a paint splash for a colour, or
/// a big number with that many stars.
class WordPicture extends StatelessWidget {
  const WordPicture({super.key, required this.word, this.size = 120});

  final EnglishWord word;
  final double size;

  @override
  Widget build(BuildContext context) {
    switch (word.kind) {
      case WordKind.picture:
        return Image.asset(
          word.image!,
          width: size,
          height: size,
          fit: BoxFit.contain,
          cacheWidth: (size * MediaQuery.devicePixelRatioOf(context)).ceil(),
          filterQuality: FilterQuality.medium,
          errorBuilder: (_, _, _) => SizedBox(width: size, height: size),
        );
      case WordKind.colour:
        return SizedBox(
          width: size,
          height: size,
          child: CustomPaint(painter: _SplashPainter(word.color!)),
        );
      case WordKind.number:
        final int n = word.number!;
        return SizedBox(
          width: size,
          height: size,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Text(
                '$n',
                style: TextStyle(
                  fontSize: size * 0.48,
                  height: 1,
                  fontWeight: FontWeight.w900,
                  color: const Color(0xFF5B3FD6),
                  shadows: const <Shadow>[
                    Shadow(color: Color(0x33000000), blurRadius: 6, offset: Offset(0, 3)),
                  ],
                ),
              ),
              const SizedBox(height: 4),
              Wrap(
                alignment: WrapAlignment.center,
                spacing: 1,
                runSpacing: 1,
                children: <Widget>[
                  for (int i = 0; i < n; i++)
                    Icon(
                      Icons.star_rounded,
                      size: size * (n > 5 ? 0.13 : 0.16),
                      color: const Color(0xFFFFC107),
                    ),
                ],
              ),
            ],
          ),
        );
    }
  }
}

/// A glossy paint splash in a colour.
class _SplashPainter extends CustomPainter {
  _SplashPainter(this.color);

  final Color color;

  @override
  void paint(Canvas canvas, Size size) {
    final Offset c = size.center(Offset.zero);
    final double r = size.shortestSide * 0.36;
    final Path p = Path();
    const int n = 14;
    for (int i = 0; i <= n * 2; i++) {
      final double a = i / (n * 2) * 2 * math.pi;
      final double rr = r * (i.isEven ? 1.12 : 0.9) * (1 + 0.06 * math.sin(i * 1.7));
      final Offset q = c + Offset(math.cos(a) * rr, math.sin(a) * rr);
      if (i == 0) {
        p.moveTo(q.dx, q.dy);
      } else {
        p.lineTo(q.dx, q.dy);
      }
    }
    p.close();
    canvas.drawPath(p.shift(const Offset(0, 4)), Paint()..color = const Color(0x22000000));
    canvas.drawPath(p, Paint()..color = color);
    canvas.drawPath(
      p,
      Paint()
        ..style = PaintingStyle.stroke
        ..strokeWidth = 2
        ..color = const Color(0x33000000),
    );
    // little drops around
    for (int i = 0; i < 5; i++) {
      final double a = i * 1.3 + 0.4;
      canvas.drawCircle(
        c + Offset(math.cos(a) * r * 1.45, math.sin(a) * r * 1.45),
        r * 0.09,
        Paint()..color = color,
      );
    }
    // shine
    canvas.drawOval(
      Rect.fromCenter(center: c + Offset(-r * 0.35, -r * 0.4), width: r * 0.55, height: r * 0.28),
      Paint()..color = const Color(0x66FFFFFF),
    );
  }

  @override
  bool shouldRepaint(_SplashPainter old) => old.color != color;
}
