import 'package:flutter/material.dart';

import '../../logic/economy.dart';
import '../../tutor/teacher_assets.dart';

/// Ảnh vật phẩm Kie.ai; chưa có thì dùng [fallback].
class GameIcon extends StatelessWidget {
  const GameIcon(this.asset, {super.key, this.size = 48, required this.fallback});

  final UiAsset asset;
  final double size;
  final Widget fallback;

  @override
  Widget build(BuildContext context) {
    final path = TeacherAssets.instance.ui(asset);
    if (path == null) {
      return SizedBox(
        width: size,
        height: size,
        child: Center(child: fallback),
      );
    }
    return Image.asset(
      path,
      width: size,
      height: size,
      fit: BoxFit.contain,
      errorBuilder: (_, _, _) => SizedBox(
        width: size,
        height: size,
        child: Center(child: fallback),
      ),
    );
  }
}

/// Ảnh thú cưng 3D (Kie.ai) hoặc biểu tượng cảm xúc nếu chưa có ảnh.
class PetImage extends StatelessWidget {
  const PetImage(this.petId, {super.key, this.size = 56, this.silhouette = false});

  final String petId;
  final double size;

  /// Chưa sở hữu: hiện bóng mờ.
  final bool silhouette;

  @override
  Widget build(BuildContext context) {
    final path = TeacherAssets.instance.pet(petId);
    final emoji = petById(petId)?.emoji ?? '❓';
    Widget child = path == null
        ? Text(emoji, style: TextStyle(fontSize: size * 0.8))
        : Image.asset(path, width: size, height: size, fit: BoxFit.contain);
    if (silhouette) {
      child = ColorFiltered(colorFilter: const ColorFilter.mode(Color(0x33000000), BlendMode.srcIn), child: child);
    }
    return SizedBox(
      width: size,
      height: size,
      child: Center(child: child),
    );
  }
}

/// Nền màn hình: ảnh Kie.ai (phủ kín) + lớp mờ để chữ luôn dễ đọc; chưa có ảnh thì dùng nền chuyển màu.
class ScreenBackground extends StatelessWidget {
  const ScreenBackground({super.key, required this.name, required this.child, this.veil = 0.35});

  final String name;
  final Widget child;

  /// Độ phủ lớp kem phía trên ảnh (0–1).
  final double veil;

  @override
  Widget build(BuildContext context) {
    final path = TeacherAssets.instance.background(name);
    return Stack(
      fit: StackFit.expand,
      children: [
        if (path != null)
          Image.asset(
            path,
            fit: BoxFit.cover,
            alignment: Alignment.topCenter,
            errorBuilder: (_, _, _) => const SizedBox(),
          )
        else
          const DecoratedBox(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [Color(0xFFE8F1FF), Color(0xFFFFF8E7)],
              ),
            ),
          ),
        DecoratedBox(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
              colors: [
                Colors.white.withValues(alpha: veil * 0.6),
                Colors.white.withValues(alpha: veil),
              ],
            ),
          ),
        ),
        child,
      ],
    );
  }
}
