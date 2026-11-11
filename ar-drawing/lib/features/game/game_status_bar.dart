import 'package:flutter/material.dart';

import '../../core/i18n/language_controller.dart';
import 'energy_sheet.dart';
import 'game_store.dart';

/// Home header row: daily streak, energy brushes and coins.
class GameStatusBar extends StatelessWidget {
  const GameStatusBar({super.key, required this.onCoins});

  final VoidCallback onCoins;

  @override
  Widget build(BuildContext context) {
    final GameStore? game = GameScope.maybeOf(context);
    if (game == null) return const SizedBox.shrink();
    final int streak = game.liveStreak;
    return Row(
      children: <Widget>[
        Expanded(
          child: _Pill(
            key: const Key('streakPill'),
            leading: Text(streak > 0 ? '🔥' : '🌱', style: const TextStyle(fontSize: 18)),
            label: game.activeToday ? '$streak ✓' : '$streak',
            hint: context.tr('game.streakShort'),
            onTap: () => _showStreak(context, game),
          ),
        ),
        const SizedBox(width: 8),
        Expanded(
          child: _Pill(
            key: const Key('energyPill'),
            leading: const Icon(Icons.brush, color: Color(0xFFFF9F43), size: 20),
            label: '${game.brushes}/${GameStore.maxBrushes}',
            hint: context.tr('game.energyShort'),
            onTap: () => showEnergySheet(context),
          ),
        ),
        const SizedBox(width: 8),
        Expanded(
          child: _Pill(
            key: const Key('coinPill'),
            leading: const Text('🪙', style: TextStyle(fontSize: 18)),
            label: '${game.coins}',
            hint: context.tr('game.coins'),
            onTap: onCoins,
          ),
        ),
      ],
    );
  }

  void _showStreak(BuildContext context, GameStore game) {
    final DateTime now = DateTime.now();
    showModalBottomSheet<void>(
      context: context,
      showDragHandle: true,
      builder: (BuildContext context) => Padding(
        padding: const EdgeInsets.fromLTRB(20, 0, 20, 28),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Text(
              context.tr('game.streakTitle', args: <String, Object?>{'days': game.liveStreak}),
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: 6),
            Text(
              context.tr(game.activeToday ? 'game.streakToday' : 'game.streakNotYet'),
              style: const TextStyle(fontWeight: FontWeight.w700),
            ),
            const SizedBox(height: 6),
            Text(context.tr('game.streakRules')),
            const SizedBox(height: 14),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: <Widget>[
                for (int i = 6; i >= 0; i--)
                  Builder(
                    builder: (BuildContext context) {
                      final DateTime d = now.subtract(Duration(days: i));
                      final bool on = game.activeDays.contains(GameStore.dayKey(d));
                      return Column(
                        children: <Widget>[
                          Text(on ? '🔥' : '·', style: const TextStyle(fontSize: 22)),
                          Text('${d.day}', style: const TextStyle(color: Colors.white70)),
                        ],
                      );
                    },
                  ),
              ],
            ),
            const SizedBox(height: 10),
            Text(
              context.tr('game.bestStreak', args: <String, Object?>{'days': game.bestStreak}),
              style: const TextStyle(color: Colors.white70),
            ),
          ],
        ),
      ),
    );
  }
}

class _Pill extends StatelessWidget {
  const _Pill({
    super.key,
    required this.leading,
    required this.label,
    required this.hint,
    required this.onTap,
  });

  final Widget leading;
  final String label;
  final String hint;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: const Color(0xFF232838),
      borderRadius: BorderRadius.circular(14),
      child: InkWell(
        borderRadius: BorderRadius.circular(14),
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
          child: Row(
            children: <Widget>[
              leading,
              const SizedBox(width: 6),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Text(
                      label,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(fontWeight: FontWeight.w800),
                    ),
                    Text(
                      hint,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(color: Colors.white60, fontSize: 11),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
