import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../../core/app_theme.dart';
import '../../core/game_art.dart';
import '../../core/i18n/language_controller.dart';
import '../draw/stroke.dart';
import '../teacher/teacher_controller.dart';
import '../teacher/teacher_scope.dart';
import '../teacher/teacher_script.dart';
import '../teacher/widgets/teacher_overlay.dart';
import '../english/english_quiz.dart';
import 'game_store.dart';

/// Shop: art coins buy blind boxes with special brushes and outfits for
/// Lumi. Coins are only earned by learning (no real money), and every
/// prize's chance is listed.
class ShopScreen extends StatefulWidget {
  const ShopScreen({super.key, this.random});

  /// Injected in tests for predictable prizes.
  final math.Random? random;

  @override
  State<ShopScreen> createState() => _ShopScreenState();
}

class _ShopScreenState extends State<ShopScreen> with SingleTickerProviderStateMixin {
  final TeacherController _teacher = TeacherController();
  late final AnimationController _shake = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 900),
  );
  bool _opening = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) _teacher.introduce(TeacherScope.maybeOf(context), 'shop_intro');
    });
  }

  @override
  void dispose() {
    _shake.dispose();
    _teacher.dispose();
    super.dispose();
  }

  Future<void> _open(GameStore game) async {
    if (_opening) return;
    // Playing needs a little English first: the magic word opens the box.
    if (!await passMagicWord(context)) return;
    if (!mounted) return;
    setState(() => _opening = true);
    await _shake.forward(from: 0);
    final GachaResult? r = await game.openBox(widget.random);
    if (!mounted) return;
    setState(() => _opening = false);
    if (r == null) return;
    _teacher.say(<TeacherLine>[
      TeacherLine(
        id: r.duplicate
            ? 'gacha_dupe'
            : (r.prize.brush != null ? 'gacha_win_brush' : 'gacha_win_outfit'),
        mood: 'cheer',
      ),
    ]);
    await showDialog<void>(
      context: context,
      builder: (BuildContext context) => AlertDialog(
        key: const Key('prizeDialog'),
        title: Text(context.tr(r.duplicate ? 'shop.duplicate' : 'shop.youGot')),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            Stack(
              alignment: Alignment.center,
              children: <Widget>[
                const Opacity(opacity: 0.55, child: ArtImage(GameArt.giftOpen, size: 170)),
                _PrizeArt(prize: r.prize, size: 110),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              context.tr(r.prize.nameKey),
              style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 18),
            ),
            if (r.duplicate)
              Text(context.tr('shop.refund', args: <String, Object?>{'coins': r.refund})),
          ],
        ),
        actions: <Widget>[
          FilledButton(
            onPressed: () => Navigator.of(context).pop(),
            child: Text(context.tr('home.gotIt')),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final GameStore? game = GameScope.maybeOf(context);
    if (game == null) return const Scaffold();
    final ThemeData theme = Theme.of(context);
    final bool affordable = game.coins >= GameStore.boxPrice;
    return Scaffold(
      backgroundColor: AppTheme.ink,
      appBar: AppBar(
        backgroundColor: AppTheme.ink,
        title: Text(context.tr('shop.title')),
        actions: <Widget>[
          CoinBadge(coins: game.coins),
          const SizedBox(width: 12),
        ],
      ),
      body: Stack(
        children: <Widget>[
          ListView(
            padding: const EdgeInsets.fromLTRB(16, 0, 16, 160),
            children: <Widget>[
              Text(context.tr('shop.hint'), style: const TextStyle(color: Colors.white70)),
              const SizedBox(height: 16),
              Center(
                child: AnimatedBuilder(
                  animation: _shake,
                  builder: (BuildContext context, Widget? child) => Transform.rotate(
                    angle: math.sin(_shake.value * math.pi * 8) * 0.12 * (1 - _shake.value),
                    child: Transform.scale(
                      scale: 1 + 0.15 * math.sin(_shake.value * math.pi),
                      child: child,
                    ),
                  ),
                  child: Stack(
                    alignment: Alignment.center,
                    children: <Widget>[
                      Container(
                        width: 200,
                        height: 200,
                        decoration: const BoxDecoration(
                          shape: BoxShape.circle,
                          gradient: RadialGradient(
                            colors: <Color>[Color(0x66FFD27A), Color(0x00FFD27A)],
                          ),
                        ),
                      ),
                      const ArtImage(GameArt.giftClosed, key: Key('giftBox'), size: 170),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 12),
              FilledButton.icon(
                key: const Key('openBox'),
                onPressed: affordable && !_opening ? () => _open(game) : null,
                icon: const Icon(Icons.card_giftcard),
                label: Text(
                  context.tr('shop.open', args: <String, Object?>{'price': GameStore.boxPrice}),
                ),
              ),
              if (!affordable)
                Padding(
                  padding: const EdgeInsets.only(top: 6),
                  child: Text(
                    context.tr(
                      'shop.needCoins',
                      args: <String, Object?>{'coins': GameStore.boxPrice - game.coins},
                    ),
                    textAlign: TextAlign.center,
                    style: const TextStyle(color: Colors.white70),
                  ),
                ),
              const SizedBox(height: 20),
              Text(context.tr('shop.odds'), style: theme.textTheme.titleMedium),
              const SizedBox(height: 6),
              for (final Prize p in GameStore.prizes)
                ListTile(
                  key: Key('odds-${p.id}'),
                  dense: true,
                  contentPadding: EdgeInsets.zero,
                  leading: _PrizeArt(prize: p, size: 36),
                  title: Text(context.tr(p.nameKey)),
                  trailing: Text(
                    '${p.chance}%${game.owns(p) ? ' ✓' : ''}',
                    style: const TextStyle(fontWeight: FontWeight.w800),
                  ),
                ),
              Text(
                context.tr(
                  'shop.oddsNote',
                  args: <String, Object?>{'coins': GameStore.duplicateRefund},
                ),
                style: const TextStyle(color: Colors.white54, fontSize: 12),
              ),
              const SizedBox(height: 20),
              Text(context.tr('shop.brushes'), style: theme.textTheme.titleMedium),
              Wrap(
                spacing: 8,
                children: <Widget>[
                  for (final BrushEffect e in BrushEffect.values)
                    if (game.brushesOwned.contains(e))
                      ChoiceChip(
                        key: Key('use-${e.name}'),
                        avatar: ArtImage(GameArt.brush(e.name), size: 24),
                        label: Text(context.tr('shop.effect.${e.name}')),
                        selected: game.brushEffect == e,
                        onSelected: (_) => game.useBrushEffect(e),
                      ),
                ],
              ),
              const SizedBox(height: 12),
              Text(context.tr('shop.outfits'), style: theme.textTheme.titleMedium),
              const SizedBox(height: 6),
              SizedBox(
                height: 120,
                child: ListView(
                  scrollDirection: Axis.horizontal,
                  children: <Widget>[
                    for (final LumiOutfit o in LumiOutfit.values)
                      if (game.outfitsOwned.contains(o))
                        GestureDetector(
                          key: Key('wear-${o.name}'),
                          onTap: () => game.wearOutfit(o),
                          child: Container(
                            width: 90,
                            margin: const EdgeInsets.only(right: 8),
                            padding: const EdgeInsets.all(6),
                            decoration: BoxDecoration(
                              color: AppTheme.card,
                              borderRadius: BorderRadius.circular(14),
                              border: Border.all(
                                color: game.outfit == o
                                    ? const Color(0xFFFFB547)
                                    : Colors.transparent,
                                width: 2,
                              ),
                            ),
                            child: Column(
                              children: <Widget>[
                                Expanded(child: Image.asset(lumiPose('happy', o))),
                                Text(
                                  context.tr('shop.outfit.${o.name}'),
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                  style: const TextStyle(fontSize: 11),
                                ),
                              ],
                            ),
                          ),
                        ),
                  ],
                ),
              ),
            ],
          ),
          Positioned.fill(child: TeacherOverlay(controller: _teacher)),
        ],
      ),
    );
  }
}

class _PrizeArt extends StatelessWidget {
  const _PrizeArt({required this.prize, required this.size});

  final Prize prize;
  final double size;

  @override
  Widget build(BuildContext context) {
    final LumiOutfit? o = prize.outfit;
    if (o != null) {
      return SizedBox(width: size, height: size, child: Image.asset(lumiPose('cheer', o)));
    }
    return ArtImage(GameArt.brush(prize.brush!.name), size: size);
  }
}

/// "🪙 120" coin counter.
class CoinBadge extends StatelessWidget {
  const CoinBadge({super.key, required this.coins});

  final int coins;

  @override
  Widget build(BuildContext context) {
    return Container(
      key: const Key('coinBadge'),
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: const Color(0x33FFB547),
        borderRadius: BorderRadius.circular(14),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          const ArtImage(GameArt.coin, size: 22),
          const SizedBox(width: 5),
          Text('$coins', style: const TextStyle(fontWeight: FontWeight.w800)),
        ],
      ),
    );
  }
}
