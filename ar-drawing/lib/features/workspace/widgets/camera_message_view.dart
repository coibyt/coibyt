import 'package:flutter/material.dart';

/// Full-screen explanation shown when the camera cannot be used, with up to
/// two actions (e.g. "Try again" and "Open Settings").
class CameraMessageView extends StatelessWidget {
  const CameraMessageView({
    super.key,
    required this.icon,
    required this.title,
    required this.message,
    this.primaryLabel,
    this.onPrimary,
    this.secondaryLabel,
    this.onSecondary,
  });

  final IconData icon;
  final String title;
  final String message;
  final String? primaryLabel;
  final VoidCallback? onPrimary;
  final String? secondaryLabel;
  final VoidCallback? onSecondary;

  @override
  Widget build(BuildContext context) {
    final ThemeData theme = Theme.of(context);
    return ColoredBox(
      color: theme.colorScheme.surface,
      child: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(32),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: <Widget>[
                Icon(icon, size: 64, color: theme.colorScheme.primary),
                const SizedBox(height: 20),
                Text(title, style: theme.textTheme.titleLarge, textAlign: TextAlign.center),
                const SizedBox(height: 12),
                Text(message, style: theme.textTheme.bodyMedium, textAlign: TextAlign.center),
                const SizedBox(height: 28),
                if (primaryLabel != null && onPrimary != null)
                  FilledButton(onPressed: onPrimary, child: Text(primaryLabel!)),
                if (secondaryLabel != null && onSecondary != null) ...<Widget>[
                  const SizedBox(height: 8),
                  TextButton(onPressed: onSecondary, child: Text(secondaryLabel!)),
                ],
              ],
            ),
          ),
        ),
      ),
    );
  }
}
