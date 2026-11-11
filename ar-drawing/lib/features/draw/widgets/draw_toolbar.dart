import 'package:flutter/material.dart';

import '../../../core/i18n/language_controller.dart';
import '../../game/game_store.dart';
import '../drawing_controller.dart';
import '../stroke.dart';
import 'color_picker_sheet.dart';

/// Keys of the toolbar controls, so the onboarding tour can point at them.
class DrawToolbarKeys {
  final GlobalKey brush = GlobalKey(debugLabel: 'brush');
  final GlobalKey eraser = GlobalKey(debugLabel: 'eraser');
  final GlobalKey size = GlobalKey(debugLabel: 'size');
  final GlobalKey color = GlobalKey(debugLabel: 'color');
  final GlobalKey undo = GlobalKey(debugLabel: 'undo');
  final GlobalKey canvas = GlobalKey(debugLabel: 'canvas');
}

/// Bottom tool panel: brush / eraser, size with a live preview dot, current
/// colour (opens the picker) and recently used colours.
class DrawToolbar extends StatelessWidget {
  const DrawToolbar({super.key, required this.controller, required this.keys});

  final DrawingController controller;
  final DrawToolbarKeys keys;

  Future<void> _pickColor(BuildContext context) async {
    final Color? picked = await showColorPickerSheet(context, controller.color);
    if (picked != null) controller.color = picked;
  }

  @override
  Widget build(BuildContext context) {
    final ColorScheme colors = Theme.of(context).colorScheme;
    final GameStore? game = GameScope.maybeOf(context);
    // Brush effect owned and chosen in the shop.
    if (game != null) controller.effect = game.brushEffect;
    return ListenableBuilder(
      listenable: controller,
      builder: (BuildContext context, _) {
        final bool eraser = controller.tool == DrawTool.eraser;
        return Material(
          color: colors.surface,
          child: SafeArea(
            top: false,
            child: Padding(
              padding: const EdgeInsets.fromLTRB(8, 6, 8, 6),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: <Widget>[
                  Row(
                    children: <Widget>[
                      _ToolButton(
                        key: keys.brush,
                        icon: Icons.brush,
                        tooltip: context.tr('draw.brush'),
                        selected: !eraser,
                        onTap: () => controller.tool = DrawTool.brush,
                      ),
                      _ToolButton(
                        key: keys.eraser,
                        icon: Icons.auto_fix_normal,
                        tooltip: context.tr('draw.eraser'),
                        selected: eraser,
                        onTap: () => controller.tool = DrawTool.eraser,
                      ),
                      if (game != null && game.brushesOwned.length > 1)
                        PopupMenuButton<BrushEffect>(
                          key: const Key('effectButton'),
                          tooltip: context.tr('shop.brushes'),
                          initialValue: game.brushEffect,
                          icon: Icon(effectIcon(game.brushEffect), color: const Color(0xFFFFB547)),
                          onSelected: (BrushEffect e) {
                            controller.effect = e;
                            controller.tool = DrawTool.brush;
                            game.useBrushEffect(e);
                          },
                          itemBuilder: (BuildContext context) => <PopupMenuEntry<BrushEffect>>[
                            for (final BrushEffect e in BrushEffect.values)
                              if (game.brushesOwned.contains(e))
                                PopupMenuItem<BrushEffect>(
                                  value: e,
                                  child: ListTile(
                                    leading: Icon(effectIcon(e)),
                                    title: Text(context.tr('shop.effect.${e.name}')),
                                  ),
                                ),
                          ],
                        ),
                      const SizedBox(width: 4),
                      // Preview of the line size (and colour).
                      SizedBox(
                        width: 34,
                        height: 34,
                        child: Center(
                          child: Container(
                            width: controller.size.clamp(3, 34),
                            height: controller.size.clamp(3, 34),
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              color: eraser ? Colors.transparent : controller.color,
                              border: Border.all(color: Colors.white70, width: eraser ? 1.5 : 0.8),
                            ),
                          ),
                        ),
                      ),
                      Expanded(
                        child: Slider(
                          key: keys.size,
                          min: DrawingController.minSize,
                          max: DrawingController.maxSize,
                          value: controller.size,
                          label: controller.size.round().toString(),
                          divisions: (DrawingController.maxSize - DrawingController.minSize)
                              .round(),
                          onChanged: (double v) => controller.size = v,
                        ),
                      ),
                      Tooltip(
                        message: context.tr('draw.pickColor'),
                        child: InkWell(
                          key: keys.color,
                          customBorder: const CircleBorder(),
                          onTap: () => _pickColor(context),
                          child: Container(
                            width: 40,
                            height: 40,
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              gradient: const SweepGradient(
                                colors: <Color>[
                                  Colors.red,
                                  Colors.yellow,
                                  Colors.green,
                                  Colors.cyan,
                                  Colors.blue,
                                  Colors.purple,
                                  Colors.red,
                                ],
                              ),
                              border: Border.all(color: Colors.white, width: 2),
                            ),
                            child: Center(
                              child: Container(
                                width: 22,
                                height: 22,
                                decoration: BoxDecoration(
                                  color: controller.color,
                                  shape: BoxShape.circle,
                                  border: Border.all(color: Colors.white, width: 2),
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                  if (controller.recentColors.isNotEmpty)
                    SizedBox(
                      height: 30,
                      child: ListView(
                        scrollDirection: Axis.horizontal,
                        children: <Widget>[
                          for (final Color c in controller.recentColors)
                            GestureDetector(
                              onTap: () => controller.color = c,
                              child: Container(
                                width: 24,
                                height: 24,
                                margin: const EdgeInsets.symmetric(horizontal: 4, vertical: 3),
                                decoration: BoxDecoration(
                                  color: c,
                                  shape: BoxShape.circle,
                                  border: Border.all(
                                    color: c == controller.color && !eraser
                                        ? colors.primary
                                        : Colors.white38,
                                    width: c == controller.color && !eraser ? 2.5 : 1,
                                  ),
                                ),
                              ),
                            ),
                        ],
                      ),
                    ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}

class _ToolButton extends StatelessWidget {
  const _ToolButton({
    super.key,
    required this.icon,
    required this.tooltip,
    required this.selected,
    required this.onTap,
  });

  final IconData icon;
  final String tooltip;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final ColorScheme colors = Theme.of(context).colorScheme;
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 2),
      child: IconButton(
        tooltip: tooltip,
        isSelected: selected,
        style: IconButton.styleFrom(
          backgroundColor: selected ? colors.primary : Colors.white10,
          foregroundColor: selected ? colors.onPrimary : Colors.white,
        ),
        onPressed: onTap,
        icon: Icon(icon),
      ),
    );
  }
}

IconData effectIcon(BrushEffect e) => switch (e) {
  BrushEffect.normal => Icons.brush,
  BrushEffect.sparkle => Icons.auto_awesome,
  BrushEffect.rainbow => Icons.looks,
  BrushEffect.neon => Icons.flare,
};
