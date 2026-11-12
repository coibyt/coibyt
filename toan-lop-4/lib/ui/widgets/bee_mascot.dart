import 'dart:math';

import 'package:flutter/material.dart';

import '../app_theme.dart';

/// Linh vật "Ong Vàng" — vẽ bằng code (không dùng ảnh bên ngoài).
class BeeMascot extends StatelessWidget {
  const BeeMascot({super.key, this.size = 120, this.happy = true});

  final double size;
  final bool happy;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: 'Chú ong vàng',
      child: SizedBox(
        width: size,
        height: size,
        child: CustomPaint(painter: _BeePainter(happy: happy)),
      ),
    );
  }
}

class _BeePainter extends CustomPainter {
  _BeePainter({required this.happy});

  final bool happy;

  @override
  void paint(Canvas canvas, Size size) {
    final s = size.width;
    final ink = Paint()..color = AppColors.ink;
    final center = Offset(s * 0.5, s * 0.58);

    // Cánh
    final wing = Paint()..color = const Color(0xCCE3F2FF);
    final wingBorder = Paint()
      ..color = AppColors.sky
      ..style = PaintingStyle.stroke
      ..strokeWidth = s * 0.02;
    for (final dx in [-0.17, 0.17]) {
      final rect = Rect.fromCenter(center: Offset(s * (0.5 + dx), s * 0.28), width: s * 0.3, height: s * 0.36);
      canvas
        ..save()
        ..translate(rect.center.dx, rect.center.dy)
        ..rotate(dx < 0 ? -0.5 : 0.5)
        ..translate(-rect.center.dx, -rect.center.dy)
        ..drawOval(rect, wing)
        ..drawOval(rect, wingBorder)
        ..restore();
    }

    // Thân
    final body = Rect.fromCenter(center: center, width: s * 0.78, height: s * 0.62);
    canvas.drawOval(body, Paint()..color = AppColors.honey);
    canvas.save();
    canvas.clipPath(Path()..addOval(body));
    for (final x in [0.36, 0.52]) {
      canvas.drawRect(Rect.fromLTWH(s * x, 0, s * 0.08, s), ink);
    }
    canvas.restore();
    canvas.drawOval(
      body,
      Paint()
        ..color = AppColors.ink
        ..style = PaintingStyle.stroke
        ..strokeWidth = s * 0.025,
    );

    // Mặt (bên trái thân)
    final face = Offset(s * 0.28, s * 0.55);
    canvas.drawCircle(Offset(face.dx - s * 0.04, face.dy - s * 0.05), s * 0.045, ink);
    canvas.drawCircle(Offset(face.dx + s * 0.07, face.dy - s * 0.05), s * 0.045, ink);
    final shine = Paint()..color = Colors.white;
    canvas.drawCircle(Offset(face.dx - s * 0.03, face.dy - s * 0.065), s * 0.015, shine);
    canvas.drawCircle(Offset(face.dx + s * 0.08, face.dy - s * 0.065), s * 0.015, shine);
    final mouth = Paint()
      ..color = AppColors.ink
      ..style = PaintingStyle.stroke
      ..strokeWidth = s * 0.022
      ..strokeCap = StrokeCap.round;
    final mouthRect = Rect.fromCenter(
      center: Offset(face.dx + s * 0.015, face.dy + s * 0.03),
      width: s * 0.12,
      height: s * 0.08,
    );
    canvas.drawArc(mouthRect, happy ? 0.2 : pi + 0.2, pi - 0.4, false, mouth);
    // Má hồng
    final blush = Paint()..color = const Color(0x66FF6FB5);
    canvas.drawCircle(Offset(face.dx - s * 0.08, face.dy + s * 0.02), s * 0.03, blush);
    canvas.drawCircle(Offset(face.dx + s * 0.12, face.dy + s * 0.02), s * 0.03, blush);

    // Râu
    final antenna = Paint()
      ..color = AppColors.ink
      ..style = PaintingStyle.stroke
      ..strokeWidth = s * 0.02
      ..strokeCap = StrokeCap.round;
    canvas.drawLine(Offset(s * 0.24, s * 0.33), Offset(s * 0.16, s * 0.18), antenna);
    canvas.drawLine(Offset(s * 0.33, s * 0.31), Offset(s * 0.33, s * 0.15), antenna);
    canvas.drawCircle(Offset(s * 0.16, s * 0.18), s * 0.03, ink);
    canvas.drawCircle(Offset(s * 0.33, s * 0.15), s * 0.03, ink);

    // Kim (đuôi)
    final tail = Path()
      ..moveTo(s * 0.88, s * 0.54)
      ..lineTo(s * 0.98, s * 0.58)
      ..lineTo(s * 0.88, s * 0.63)
      ..close();
    canvas.drawPath(tail, ink);
  }

  @override
  bool shouldRepaint(_BeePainter old) => old.happy != happy;
}
