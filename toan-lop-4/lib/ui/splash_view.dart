import 'dart:math';

import 'package:flutter/material.dart';

import '../tutor/teacher_assets.dart';
import '../tutor/teacher_avatar.dart';
import 'widgets/game_art.dart';

const _royalTop = Color(0xFF6B3FD6);
const _royalMid = Color(0xFF3B1E8C);
const _royalDeep = Color(0xFF1A0B4A);

/// Nền màn mở đầu: tím hoàng gia + tranh tổ ong vàng (Kie.ai) + đốm sáng bay lên.
class SplashBackdrop extends StatefulWidget {
  const SplashBackdrop({super.key, required this.child});

  final Widget child;

  @override
  State<SplashBackdrop> createState() => _SplashBackdropState();
}

class _SplashBackdropState extends State<SplashBackdrop> with SingleTickerProviderStateMixin {
  late final _t = AnimationController(vsync: this, duration: const Duration(seconds: 8));
  final _sparks = [
    for (var i = 0; i < 16; i++)
      (Random(i).nextDouble(), Random(i * 7 + 3).nextDouble(), 0.6 + Random(i * 5).nextDouble()),
  ];

  @override
  void initState() {
    super.initState();
    if (TeacherAvatar.motionEnabled) _t.repeat(count: 100);
  }

  @override
  void dispose() {
    _t.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final bg = TeacherAssets.instance.background('splash');
    return Stack(
      fit: StackFit.expand,
      children: [
        const DecoratedBox(
          decoration: BoxDecoration(
            gradient: RadialGradient(
              center: Alignment(0, -0.2),
              radius: 1.1,
              colors: [_royalTop, _royalMid, _royalDeep],
            ),
          ),
        ),
        if (bg != null)
          Opacity(
            opacity: 0.55,
            child: Image.asset(bg, fit: BoxFit.cover, errorBuilder: (_, _, _) => const SizedBox()),
          ),
        AnimatedBuilder(
          animation: _t,
          builder: (context, _) => CustomPaint(painter: _SparkPainter(_sparks, _t.value)),
        ),
        widget.child,
      ],
    );
  }
}

class _SparkPainter extends CustomPainter {
  _SparkPainter(this.sparks, this.t);

  final List<(double, double, double)> sparks;
  final double t;

  @override
  void paint(Canvas canvas, Size size) {
    for (final (x, phase, speed) in sparks) {
      final p = (t * speed + phase) % 1;
      final y = size.height * (1.05 - p * 0.8);
      final a = (p < 0.15 ? p / 0.15 : (1 - p)).clamp(0.0, 1.0);
      canvas.drawCircle(
        Offset(size.width * x, y),
        3,
        Paint()
          ..color = Color.fromRGBO(255, 224, 138, a)
          ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 3),
      );
    }
  }

  @override
  bool shouldRepaint(_SparkPainter old) => old.t != t;
}

/// Logo: huy hiệu ong vàng (Kie.ai) bay lơ lửng, có quầng sáng.
class AppLogo extends StatefulWidget {
  const AppLogo({super.key, this.size = 200});

  final double size;

  @override
  State<AppLogo> createState() => _AppLogoState();
}

class _AppLogoState extends State<AppLogo> with SingleTickerProviderStateMixin {
  late final _f = AnimationController(vsync: this, duration: const Duration(milliseconds: 3000));

  @override
  void initState() {
    super.initState();
    if (TeacherAvatar.motionEnabled) _f.repeat(reverse: true, count: 100);
  }

  @override
  void dispose() {
    _f.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final s = widget.size;
    return AnimatedBuilder(
      animation: _f,
      builder: (_, child) {
        final v = Curves.easeInOut.transform(_f.value);
        return Transform.translate(
          offset: Offset(0, -10 * v),
          child: Transform.rotate(angle: (v - 0.5) * 0.05, child: child),
        );
      },
      child: Stack(
        alignment: Alignment.center,
        children: [
          Container(
            width: s * 1.15,
            height: s * 1.15,
            decoration: const BoxDecoration(
              shape: BoxShape.circle,
              gradient: RadialGradient(colors: [Color(0x88FFD66B), Color(0x00FFD66B)]),
            ),
          ),
          GameIcon(
            UiAsset.logoEmblem,
            size: s,
            fallback: Text('🐝', style: TextStyle(fontSize: s * 0.6)),
          ),
        ],
      ),
    );
  }
}

/// Tên app chữ vàng chuyển màu.
class AppTitle extends StatelessWidget {
  const AppTitle({super.key, this.size = 40});

  final double size;

  @override
  Widget build(BuildContext context) => Column(
    children: [
      ShaderMask(
        shaderCallback: (r) => const LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [Color(0xFFFFF6CC), Color(0xFFFFC93C), Color(0xFFFF9F1C)],
        ).createShader(r),
        child: Text(
          'Ong Vàng Toán 4',
          textAlign: TextAlign.center,
          style: TextStyle(
            fontSize: size,
            fontWeight: FontWeight.w900,
            color: Colors.white,
            shadows: const [Shadow(color: Color(0x66FF9F1C), blurRadius: 18, offset: Offset(0, 4))],
          ),
        ),
      ),
      const Text(
        'Lớp học Toán cùng cô Mai',
        style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: Color(0xFFE9E2FF)),
      ),
    ],
  );
}

/// Màn chờ trong lúc app nạp dữ liệu (hoặc báo lỗi).
class AppSplash extends StatelessWidget {
  const AppSplash({super.key, this.error});

  final Object? error;

  @override
  Widget build(BuildContext context) => Scaffold(
    body: SplashBackdrop(
      child: SafeArea(
        child: Center(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const AppLogo(size: 200),
              const SizedBox(height: 8),
              const AppTitle(),
              const SizedBox(height: 20),
              if (error != null)
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 24),
                  child: Text(
                    'Không mở được app: $error',
                    textAlign: TextAlign.center,
                    style: const TextStyle(color: Colors.white, fontSize: 16),
                  ),
                )
              else
                SizedBox(
                  width: 240,
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(8),
                    child: const LinearProgressIndicator(
                      minHeight: 10,
                      color: Color(0xFFFFC93C),
                      backgroundColor: Color(0x33FFFFFF),
                    ),
                  ),
                ),
            ],
          ),
        ),
      ),
    ),
  );
}
