import 'dart:math';

import 'package:flutter/material.dart';

import 'teacher_assets.dart';
import 'teacher_avatar.dart';

/// Tiền vàng và ngôi sao bay tung lên khi bé làm đúng. Đổi [trigger] để bắn một lượt.
/// Dùng ảnh assets/ui/coin.png, star.png (Kie.ai) nếu có, không thì dùng biểu tượng.
class RewardBurst extends StatefulWidget {
  const RewardBurst({super.key, required this.trigger, this.count = 16});

  final int trigger;
  final int count;

  @override
  State<RewardBurst> createState() => _RewardBurstState();
}

class _Particle {
  _Particle(Random r)
    : isCoin = r.nextBool(),
      angle = -pi / 2 + (r.nextDouble() - 0.5) * pi * 0.9,
      speed = 380 + r.nextDouble() * 320,
      spin = (r.nextDouble() - 0.5) * 8,
      size = 26 + r.nextDouble() * 18,
      delay = r.nextDouble() * 0.15;

  final bool isCoin;
  final double angle, speed, spin, size, delay;
}

class _RewardBurstState extends State<RewardBurst> with SingleTickerProviderStateMixin {
  late final AnimationController _c = AnimationController(vsync: this, duration: const Duration(milliseconds: 1400));
  List<_Particle> _particles = const [];
  final _random = Random();

  @override
  void didUpdateWidget(RewardBurst old) {
    super.didUpdateWidget(old);
    if (widget.trigger != old.trigger) _fire();
  }

  void _fire() {
    final reduce = MediaQuery.maybeDisableAnimationsOf(context) ?? false;
    if (!TeacherAvatar.motionEnabled || reduce) return;
    _particles = [for (var i = 0; i < widget.count; i++) _Particle(_random)];
    _c.forward(from: 0);
  }

  @override
  void dispose() {
    _c.dispose();
    super.dispose();
  }

  Widget _icon(bool coin, double size) {
    final path = TeacherAssets.instance.ui(coin ? UiAsset.coin : UiAsset.star);
    if (path != null) return Image.asset(path, width: size, height: size);
    return Text(coin ? '🪙' : '⭐', style: TextStyle(fontSize: size * 0.85));
  }

  @override
  Widget build(BuildContext context) {
    return IgnorePointer(
      child: AnimatedBuilder(
        animation: _c,
        builder: (context, _) {
          if (!_c.isAnimating || _particles.isEmpty) return const SizedBox.expand();
          return LayoutBuilder(
            builder: (context, box) {
              final origin = Offset(box.maxWidth / 2, box.maxHeight * 0.78);
              return Stack(
                children: [
                  for (final p in _particles)
                    () {
                      final t = ((_c.value - p.delay) / (1 - p.delay)).clamp(0.0, 1.0);
                      final dx = cos(p.angle) * p.speed * t;
                      final dy = sin(p.angle) * p.speed * t + 520 * t * t; // trọng lực
                      return Positioned(
                        left: origin.dx + dx - p.size / 2,
                        top: origin.dy + dy - p.size / 2,
                        child: Opacity(
                          opacity: (1 - t).clamp(0, 1),
                          child: Transform.rotate(angle: p.spin * t, child: _icon(p.isCoin, p.size)),
                        ),
                      );
                    }(),
                ],
              );
            },
          );
        },
      ),
    );
  }
}
