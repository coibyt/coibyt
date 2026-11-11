import 'package:flutter/material.dart';

/// Illustrations and game items (generated artwork, `assets/game/`).
abstract final class GameArt {
  static const String banner = 'assets/game/banner.jpg';
  static const String coin = 'assets/game/items/coin.png';
  static const String energy = 'assets/game/items/energy.png';
  static const String flame = 'assets/game/items/flame.png';
  static const String giftClosed = 'assets/game/items/gift_closed.png';
  static const String giftOpen = 'assets/game/items/gift_open.png';
  static const String magicBrush = 'assets/game/items/magic_brush.png';
  static const String demoBoard = 'assets/game/items/demo_board.png';

  static String tile(String id) => 'assets/game/tiles/$id.png';
  static String brush(String effect) => 'assets/game/items/brush_$effect.png';
  static String rank(String rank) => 'assets/game/ranks/$rank.png';
  static String avatar(String animal) => 'assets/game/avatars/$animal.png';
  static String examType(String type) => 'assets/game/exams/$type.png';
  static String badge(String id) => 'assets/game/badges/$id.png';
}

/// A game illustration at a fixed square size; greyed out when [locked].
class ArtImage extends StatelessWidget {
  const ArtImage(this.asset, {super.key, this.size = 40, this.locked = false});

  final String asset;
  final double size;
  final bool locked;

  static const ColorFilter _grey = ColorFilter.matrix(<double>[
    0.3, 0.6, 0.15, 0, 10, //
    0.3, 0.6, 0.15, 0, 10,
    0.3, 0.6, 0.15, 0, 18,
    0, 0, 0, 0.6, 0,
  ]);

  @override
  Widget build(BuildContext context) {
    final int cache = (size * MediaQuery.devicePixelRatioOf(context)).ceil();
    final Widget img = Image.asset(
      asset,
      width: size,
      height: size,
      fit: BoxFit.contain,
      cacheWidth: cache,
      filterQuality: FilterQuality.medium,
      errorBuilder: (_, _, _) => SizedBox(width: size, height: size),
    );
    return locked ? ColorFiltered(colorFilter: _grey, child: img) : img;
  }
}
