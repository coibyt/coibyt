import 'package:flutter/material.dart';

import '../../core/i18n/language_controller.dart';

/// Where the learner draws.
enum DrawMode {
  /// Real paper under the phone camera (tracing).
  camera,

  /// Directly on the screen with the digital drawing board.
  screen,
}

/// Asks whether to draw on real paper (camera) or on the screen.
Future<DrawMode?> showDrawModeSheet(BuildContext context) {
  return showModalBottomSheet<DrawMode>(
    context: context,
    showDragHandle: true,
    builder: (BuildContext context) => SafeArea(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.fromLTRB(8, 0, 8, 8),
              child: Text(context.tr('mode.title'), style: Theme.of(context).textTheme.titleLarge),
            ),
            _ModeTile(
              key: const Key('mode-camera'),
              icon: Icons.photo_camera,
              title: context.tr('mode.camera'),
              subtitle: context.tr('mode.cameraHint'),
              onTap: () => Navigator.of(context).pop(DrawMode.camera),
            ),
            const SizedBox(height: 8),
            _ModeTile(
              key: const Key('mode-screen'),
              icon: Icons.draw,
              title: context.tr('mode.screen'),
              subtitle: context.tr('mode.screenHint'),
              onTap: () => Navigator.of(context).pop(DrawMode.screen),
            ),
          ],
        ),
      ),
    ),
  );
}

class _ModeTile extends StatelessWidget {
  const _ModeTile({
    super.key,
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.onTap,
  });

  final IconData icon;
  final String title;
  final String subtitle;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final ColorScheme colors = Theme.of(context).colorScheme;
    return Material(
      color: colors.surfaceContainerHighest,
      borderRadius: BorderRadius.circular(16),
      child: ListTile(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
        leading: CircleAvatar(
          backgroundColor: colors.primary,
          foregroundColor: colors.onPrimary,
          child: Icon(icon),
        ),
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.w800)),
        subtitle: Text(subtitle),
        onTap: onTap,
      ),
    );
  }
}
