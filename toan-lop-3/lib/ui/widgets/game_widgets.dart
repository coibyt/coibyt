import 'dart:math';

import 'package:flutter/material.dart';

import '../../logic/economy.dart';
import '../app_theme.dart';
import 'bee_mascot.dart';

/// Ngọn lửa chuỗi ngày: lớn dần theo số ngày, lập loè; xám khi chưa có chuỗi.
class StreakFlame extends StatefulWidget {
  const StreakFlame({super.key, required this.streak, required this.activeToday});

  final int streak;
  final bool activeToday;

  @override
  State<StreakFlame> createState() => _StreakFlameState();
}

class _StreakFlameState extends State<StreakFlame> with SingleTickerProviderStateMixin {
  late final AnimationController _c = AnimationController(vsync: this, duration: const Duration(milliseconds: 900));

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _play();
  }

  @override
  void didUpdateWidget(StreakFlame old) {
    super.didUpdateWidget(old);
    if (old.streak != widget.streak) _play();
  }

  /// Lập loè vài nhịp rồi dừng (đỡ tốn pin); không chạy khi máy bật "giảm chuyển động".
  void _play() {
    final reduceMotion = MediaQuery.maybeDisableAnimationsOf(context) ?? false;
    if (flameLevel(widget.streak) == 0 || reduceMotion) return;
    _c.repeat(reverse: true, count: 6);
  }

  @override
  void dispose() {
    _c.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final level = flameLevel(widget.streak);
    final size = const [30.0, 34.0, 42.0, 50.0, 58.0][level];
    final lit = level > 0;
    return Semantics(
      label: 'Chuỗi ${widget.streak} ngày học liên tiếp',
      child: AnimatedBuilder(
        animation: _c,
        builder: (context, child) {
          final t = lit ? _c.value : 0.0;
          return Transform.scale(
            scale: 1 + 0.06 * t * level,
            child: Transform.rotate(angle: (t - 0.5) * 0.08, child: child),
          );
        },
        child: Container(
          width: size + 10,
          height: size + 10,
          alignment: Alignment.center,
          decoration: lit && level >= 3
              ? BoxDecoration(
                  shape: BoxShape.circle,
                  boxShadow: [BoxShadow(color: Colors.orange.withValues(alpha: 0.45), blurRadius: 18, spreadRadius: 2)],
                )
              : null,
          child: Opacity(
            opacity: lit ? 1 : 0.3,
            child: Text('🔥', style: TextStyle(fontSize: size)),
          ),
        ),
      ),
    );
  }
}

/// 5 trái tim năng lượng.
class HeartsBar extends StatelessWidget {
  const HeartsBar({super.key, required this.hearts, this.size = 22});

  final int hearts;
  final double size;

  @override
  Widget build(BuildContext context) => Semantics(
    label: 'Còn $hearts trên ${Economy.maxHearts} trái tim',
    child: ExcludeSemantics(
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          for (var i = 0; i < Economy.maxHearts; i++)
            Icon(
              i < hearts ? Icons.favorite_rounded : Icons.favorite_border_rounded,
              color: i < hearts ? const Color(0xFFFF4D6D) : Colors.black26,
              size: size,
            ),
        ],
      ),
    ),
  );
}

/// Cô Ong (có trang phục) + thú cưng đi cùng.
class TutorAvatar extends StatelessWidget {
  const TutorAvatar({super.key, this.size = 60, this.happy = true, this.outfit, this.companion});

  final double size;
  final bool happy;
  final String? outfit;
  final String? companion;

  @override
  Widget build(BuildContext context) {
    final o = outfitById(outfit);
    final pet = petById(companion);
    final (double top, double left, double scale) = switch (o?.id) {
      'kinh' => (0.38, 0.12, 0.30),
      'no_hong' => (0.05, 0.02, 0.30),
      _ => (-0.12, 0.10, 0.40),
    };
    return SizedBox(
      width: size * (pet == null ? 1 : 1.35),
      height: size,
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          BeeMascot(size: size, happy: happy),
          if (o != null)
            Positioned(
              top: size * top,
              left: size * left,
              child: Text(o.emoji, style: TextStyle(fontSize: size * scale)),
            ),
          if (pet != null)
            Positioned(
              right: 0,
              bottom: 0,
              child: Text(pet.emoji, style: TextStyle(fontSize: max(16, size * 0.38))),
            ),
        ],
      ),
    );
  }
}

/// Ô nhỏ "🪙 120".
class CoinChip extends StatelessWidget {
  const CoinChip({super.key, required this.coins});

  final int coins;

  @override
  Widget build(BuildContext context) => Container(
    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
    decoration: BoxDecoration(color: AppColors.honeySoft, borderRadius: BorderRadius.circular(14)),
    child: Text('🪙 $coins', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
  );
}
