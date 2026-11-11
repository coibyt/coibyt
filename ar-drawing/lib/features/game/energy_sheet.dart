import 'dart:async';

import 'package:flutter/material.dart';

import '../../core/game_art.dart';
import '../../core/i18n/language_controller.dart';
import 'drill_screen.dart';
import 'game_store.dart';

/// Explains the energy brushes: how many are left, when the next one comes
/// back, and the drill that earns one right away.
Future<void> showEnergySheet(BuildContext context) {
  final GameStore? game = GameScope.read(context);
  return showModalBottomSheet<void>(
    context: context,
    showDragHandle: true,
    isScrollControlled: true,
    // Keep the game state reachable whichever navigator hosts the sheet.
    builder: (BuildContext context) =>
        game == null ? const _EnergySheet() : GameScope(store: game, child: const _EnergySheet()),
  );
}

class _EnergySheet extends StatefulWidget {
  const _EnergySheet();

  @override
  State<_EnergySheet> createState() => _EnergySheetState();
}

class _EnergySheetState extends State<_EnergySheet> {
  Timer? _tick;

  @override
  void initState() {
    super.initState();
    _tick = Timer.periodic(const Duration(seconds: 1), (_) {
      if (mounted) setState(() {});
    });
  }

  @override
  void dispose() {
    _tick?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final GameStore? game = GameScope.maybeOf(context);
    if (game == null) return const SizedBox.shrink();
    final Duration? next = game.nextBrushIn;
    String fmt(Duration d) =>
        '${d.inMinutes.toString().padLeft(2, '0')}:${(d.inSeconds % 60).toString().padLeft(2, '0')}';
    return SafeArea(
      child: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.fromLTRB(20, 0, 20, 16),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Text(context.tr('game.energyTitle'), style: Theme.of(context).textTheme.titleLarge),
              const SizedBox(height: 10),
              Row(
                key: const Key('energyBrushes'),
                children: <Widget>[
                  for (int i = 0; i < GameStore.maxBrushes; i++)
                    Padding(
                      padding: const EdgeInsets.only(right: 6),
                      child: ArtImage(GameArt.energy, size: 50, locked: i >= game.brushes),
                    ),
                ],
              ),
              const SizedBox(height: 10),
              Text(context.tr('game.energyRules')),
              if (next != null)
                Padding(
                  padding: const EdgeInsets.only(top: 8),
                  child: Text(
                    context.tr('game.nextBrush', args: <String, Object?>{'time': fmt(next)}),
                    key: const Key('nextBrush'),
                    style: const TextStyle(fontWeight: FontWeight.w700),
                  ),
                ),
              const SizedBox(height: 16),
              SizedBox(
                width: double.infinity,
                child: FilledButton.icon(
                  key: const Key('startDrill'),
                  onPressed: game.brushes >= GameStore.maxBrushes
                      ? null
                      : () {
                          Navigator.of(context).pop();
                          Navigator.of(context)
                              .push(MaterialPageRoute<void>(builder: (_) => const DrillScreen()));
                        },
                  icon: const Icon(Icons.gesture),
                  label: Text(context.tr('game.drillButton')),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
