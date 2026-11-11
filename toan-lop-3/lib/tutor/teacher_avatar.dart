import 'dart:async';
import 'dart:math';

import 'package:flutter/material.dart';

import 'teacher_assets.dart';

/// Tâm trạng (tư thế chính) của cô giáo.
enum TeacherMood { idle, think, clap }

/// Cô giáo sống động: thở nhẹ, thỉnh thoảng chớp mắt, mở/ngậm miệng theo [mouthOpen].
///
/// Dùng ảnh trong assets/tutor/ nếu có (tạo bằng Kie.ai), nếu không thì tự vẽ.
class TeacherAvatar extends StatefulWidget {
  const TeacherAvatar({
    super.key,
    this.mood = TeacherMood.idle,
    this.mouthOpen = false,
    this.height = 140,
    this.assets,
  });

  final TeacherMood mood;

  /// Đang mở miệng (khớp khẩu hình khi nói).
  final bool mouthOpen;
  final double height;

  /// null = [TeacherAssets.instance].
  final TeacherAssets? assets;

  /// Tắt chuyển động (test, hoặc chụp ảnh màn hình). Máy bật "giảm chuyển động" cũng tắt.
  static bool motionEnabled = true;

  @override
  State<TeacherAvatar> createState() => _TeacherAvatarState();
}

class _TeacherAvatarState extends State<TeacherAvatar> with SingleTickerProviderStateMixin {
  late final AnimationController _breath = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 3200),
  );
  final _random = Random();
  Timer? _blinkTimer;
  bool _eyesClosed = false;

  bool get _motion => TeacherAvatar.motionEnabled && !(MediaQuery.maybeDisableAnimationsOf(context) ?? false);

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (_motion) {
      if (!_breath.isAnimating) _breath.repeat(reverse: true);
      _blinkTimer ??= _scheduleBlink();
    } else {
      _breath.stop();
      _blinkTimer?.cancel();
      _blinkTimer = null;
    }
  }

  /// Chớp mắt ngẫu nhiên sau 2,5–6 giây; thỉnh thoảng chớp đôi.
  Timer _scheduleBlink() => Timer(Duration(milliseconds: 2500 + _random.nextInt(3500)), () async {
    if (!mounted) return;
    final twice = _random.nextInt(5) == 0;
    for (var i = 0; i < (twice ? 2 : 1); i++) {
      setState(() => _eyesClosed = true);
      await Future<void>.delayed(const Duration(milliseconds: 130));
      if (!mounted) return;
      setState(() => _eyesClosed = false);
      if (twice) await Future<void>.delayed(const Duration(milliseconds: 160));
    }
    if (mounted) _blinkTimer = _scheduleBlink();
  });

  @override
  void dispose() {
    _blinkTimer?.cancel();
    _breath.dispose();
    super.dispose();
  }

  /// Chọn ảnh theo tâm trạng + miệng + mắt (có ảnh dự phòng khi thiếu khung).
  String? _imagePath(TeacherAssets a) {
    final m = widget.mood;
    if (widget.mouthOpen) {
      return switch (m) {
        TeacherMood.idle => a.pose(TeacherPose.talk) ?? a.pose(TeacherPose.idle),
        TeacherMood.think => a.pose(TeacherPose.thinkTalk) ?? a.pose(TeacherPose.think),
        TeacherMood.clap => a.pose(TeacherPose.clapTalk) ?? a.pose(TeacherPose.clap),
      };
    }
    if (_eyesClosed && m == TeacherMood.idle) return a.pose(TeacherPose.blink) ?? a.pose(TeacherPose.idle);
    return switch (m) {
      TeacherMood.idle => a.pose(TeacherPose.idle),
      TeacherMood.think => a.pose(TeacherPose.think) ?? a.pose(TeacherPose.idle),
      TeacherMood.clap => a.pose(TeacherPose.clap) ?? a.pose(TeacherPose.idle),
    };
  }

  @override
  Widget build(BuildContext context) {
    final assets = widget.assets ?? TeacherAssets.instance;
    final h = widget.height;
    final w = h * 0.75;
    final path = assets.hasTeacherImages ? _imagePath(assets) : null;
    final painted = CustomPaint(
      size: Size(w, h),
      painter: TeacherPainter(mood: widget.mood, mouthOpen: widget.mouthOpen, eyesClosed: _eyesClosed),
    );
    final Widget figure = path != null
        ? Image.asset(
            path,
            height: h,
            width: w,
            fit: BoxFit.contain,
            gaplessPlayback: true,
            // Ảnh lỗi/thiếu: dùng hình vẽ thay vì báo lỗi.
            errorBuilder: (_, _, _) => painted,
          )
        : CustomPaint(
            size: Size(w, h),
            painter: TeacherPainter(mood: widget.mood, mouthOpen: widget.mouthOpen, eyesClosed: _eyesClosed),
          );
    return Semantics(
      label: 'Cô giáo',
      image: true,
      child: SizedBox(
        width: w,
        height: h,
        // Nhịp thở: nhô lên ~2px và phình rất nhẹ theo chiều dọc, neo ở chân.
        child: AnimatedBuilder(
          animation: _breath,
          builder: (context, child) {
            final t = Curves.easeInOut.transform(_breath.value);
            return Transform.translate(
              offset: Offset(0, -2.0 * t),
              child: Transform.scale(
                scaleX: 1 + 0.004 * t,
                scaleY: 1 + 0.012 * t,
                alignment: Alignment.bottomCenter,
                child: child,
              ),
            );
          },
          child: KeyedSubtree(
            key: ValueKey('teacher-${widget.mood.name}-${widget.mouthOpen}-$_eyesClosed'),
            child: figure,
          ),
        ),
      ),
    );
  }
}

/// Hình cô giáo vẽ bằng code (tạm thời, đến khi có ảnh Kie.ai). Áo dài xanh, tóc búi.
class TeacherPainter extends CustomPainter {
  TeacherPainter({required this.mood, required this.mouthOpen, required this.eyesClosed});

  final TeacherMood mood;
  final bool mouthOpen;
  final bool eyesClosed;

  static const _skin = Color(0xFFFFE0C7);
  static const _skinShade = Color(0xFFF5C9A8);
  static const _hair = Color(0xFF3B2A23);
  static const _dress = Color(0xFF7CC6F2);
  static const _dressDark = Color(0xFF4EA6DA);
  static const _ink = Color(0xFF2D3142);
  static const _mouth = Color(0xFFC0392B);

  @override
  void paint(Canvas canvas, Size size) {
    // Hệ toạ độ thiết kế 300 x 400.
    canvas.save();
    canvas.scale(size.width / 300, size.height / 400);
    final p = Paint()..isAntiAlias = true;

    // Tóc phía sau + búi tóc
    p.color = _hair;
    canvas.drawCircle(const Offset(150, 52), 34, p);
    canvas.drawOval(const Rect.fromLTWH(62, 62, 176, 170), p);

    // Thân áo dài
    final body = Path()
      ..moveTo(92, 262)
      ..quadraticBezierTo(150, 240, 208, 262)
      ..lineTo(232, 400)
      ..lineTo(68, 400)
      ..close();
    canvas.drawPath(body, p..color = _dress);
    final panel = Path()
      ..moveTo(150, 262)
      ..lineTo(176, 400)
      ..lineTo(124, 400)
      ..close();
    canvas.drawPath(panel, p..color = _dressDark.withValues(alpha: 0.35));
    // Cổ áo
    canvas.drawRRect(
      RRect.fromRectAndRadius(const Rect.fromLTWH(130, 232, 40, 30), const Radius.circular(8)),
      p..color = _dressDark,
    );
    canvas.drawRect(const Rect.fromLTWH(138, 222, 24, 18), p..color = _skinShade);

    // Tay
    _arms(canvas, p);

    // Mặt
    canvas.drawCircle(const Offset(150, 150), 80, p..color = _skin);
    // Mái tóc
    p.color = _hair;
    final bangs = Path()
      ..moveTo(70, 150)
      ..quadraticBezierTo(76, 64, 150, 66)
      ..quadraticBezierTo(224, 64, 230, 150)
      ..quadraticBezierTo(206, 104, 158, 100)
      ..quadraticBezierTo(124, 112, 96, 108)
      ..quadraticBezierTo(80, 120, 70, 150)
      ..close();
    canvas.drawPath(bangs, p);
    // Kẹp tóc
    canvas.drawCircle(const Offset(200, 98), 7, p..color = const Color(0xFFFF6FB5));

    // Má hồng
    p.color = const Color(0x55FF6FB5);
    canvas.drawCircle(const Offset(106, 182), 13, p);
    canvas.drawCircle(const Offset(194, 182), 13, p);

    _eyes(canvas, p);
    _mouthDraw(canvas, p);

    if (mood == TeacherMood.clap) _sparkles(canvas, p);
    if (mood == TeacherMood.think) _thinkDots(canvas, p);
    canvas.restore();
  }

  void _arms(Canvas canvas, Paint p) {
    final sleeve = Paint()
      ..color = _dress
      ..style = PaintingStyle.stroke
      ..strokeWidth = 26
      ..strokeCap = StrokeCap.round;
    final hand = Paint()..color = _skin;
    switch (mood) {
      case TeacherMood.idle:
        canvas.drawLine(const Offset(96, 272), const Offset(80, 350), sleeve);
        canvas.drawLine(const Offset(204, 272), const Offset(220, 350), sleeve);
        canvas.drawCircle(const Offset(80, 362), 13, hand);
        canvas.drawCircle(const Offset(220, 362), 13, hand);
      case TeacherMood.think:
        canvas.drawLine(const Offset(96, 272), const Offset(84, 350), sleeve);
        canvas.drawCircle(const Offset(84, 362), 13, hand);
        final path = Path()
          ..moveTo(204, 272)
          ..quadraticBezierTo(232, 300, 196, 252);
        canvas.drawPath(path, sleeve);
        canvas.drawCircle(const Offset(186, 236), 14, hand); // tay chống cằm
      case TeacherMood.clap:
        canvas.drawLine(const Offset(100, 272), const Offset(138, 300), sleeve);
        canvas.drawLine(const Offset(200, 272), const Offset(162, 300), sleeve);
        canvas.drawOval(const Rect.fromLTWH(132, 284, 22, 30), hand);
        canvas.drawOval(const Rect.fromLTWH(146, 284, 22, 30), hand);
    }
  }

  void _eyes(Canvas canvas, Paint p) {
    final stroke = Paint()
      ..color = _ink
      ..style = PaintingStyle.stroke
      ..strokeWidth = 5
      ..strokeCap = StrokeCap.round;
    const l = Offset(120, 160);
    const r = Offset(180, 160);
    if (mood == TeacherMood.clap) {
      // mắt cười ^ ^
      for (final c in [l, r]) {
        canvas.drawArc(
          Rect.fromCenter(center: c.translate(0, 4), width: 26, height: 22),
          pi + 0.3,
          pi - 0.6,
          false,
          stroke,
        );
      }
      return;
    }
    if (eyesClosed) {
      for (final c in [l, r]) {
        canvas.drawArc(Rect.fromCenter(center: c, width: 26, height: 14), 0.2, pi - 0.4, false, stroke);
      }
      return;
    }
    final look = mood == TeacherMood.think ? const Offset(4, -5) : Offset.zero;
    for (final c in [l, r]) {
      canvas.drawOval(Rect.fromCenter(center: c, width: 22, height: 28), p..color = _ink);
      canvas.drawCircle(c + look + const Offset(-4, -6), 4.5, p..color = Colors.white);
      // lông mi
      canvas.drawLine(c + const Offset(-12, -10), c + const Offset(-17, -15), stroke..strokeWidth = 3);
    }
    // lông mày
    final brow = Paint()
      ..color = _hair
      ..style = PaintingStyle.stroke
      ..strokeWidth = 4
      ..strokeCap = StrokeCap.round;
    final lift = mood == TeacherMood.think ? -4.0 : 0.0;
    canvas.drawLine(Offset(108, 128 + lift), Offset(132, 125), brow);
    canvas.drawLine(const Offset(168, 125), Offset(192, 128 + lift), brow);
  }

  void _mouthDraw(Canvas canvas, Paint p) {
    if (mouthOpen || mood == TeacherMood.clap) {
      final open = mood == TeacherMood.clap && !mouthOpen
          ? Rect.fromCenter(center: const Offset(150, 202), width: 34, height: 18)
          : Rect.fromCenter(center: const Offset(150, 204), width: 26, height: 22);
      canvas.drawOval(open, p..color = _mouth);
      canvas.drawOval(
        Rect.fromCenter(
          center: open.center.translate(0, open.height * 0.22),
          width: open.width * 0.55,
          height: open.height * 0.4,
        ),
        p..color = const Color(0xFFFF8A8A),
      );
      return;
    }
    final smile = Paint()
      ..color = _mouth
      ..style = PaintingStyle.stroke
      ..strokeWidth = 4.5
      ..strokeCap = StrokeCap.round;
    if (mood == TeacherMood.think) {
      canvas.drawLine(const Offset(140, 204), const Offset(160, 201), smile);
    } else {
      canvas.drawArc(
        Rect.fromCenter(center: const Offset(150, 194), width: 36, height: 22),
        0.35,
        pi - 0.7,
        false,
        smile,
      );
    }
  }

  void _sparkles(Canvas canvas, Paint p) {
    final s = Paint()
      ..color = const Color(0xFFFFC93C)
      ..strokeWidth = 4
      ..strokeCap = StrokeCap.round;
    for (final c in const [Offset(112, 286), Offset(188, 286), Offset(150, 262)]) {
      canvas.drawLine(c.translate(-7, 0), c.translate(7, 0), s);
      canvas.drawLine(c.translate(0, -7), c.translate(0, 7), s);
    }
  }

  void _thinkDots(Canvas canvas, Paint p) {
    p.color = const Color(0xFFB8C4D6);
    canvas.drawCircle(const Offset(238, 92), 6, p);
    canvas.drawCircle(const Offset(252, 70), 9, p);
    canvas.drawCircle(const Offset(270, 42), 13, p);
  }

  @override
  bool shouldRepaint(TeacherPainter old) =>
      old.mood != mood || old.mouthOpen != mouthOpen || old.eyesClosed != eyesClosed;
}
