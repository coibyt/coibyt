import 'package:flutter/material.dart';

import '../../../core/app_strings.dart';

/// Bottom panel with the overlay opacity slider and a % read-out.
class OpacityControl extends StatelessWidget {
  const OpacityControl({super.key, required this.value, required this.onChanged});

  /// Current opacity, 0.0 – 1.0.
  final double value;
  final ValueChanged<double> onChanged;

  @override
  Widget build(BuildContext context) {
    final ColorScheme colors = Theme.of(context).colorScheme;
    final int percent = (value * 100).round();

    return Material(
      color: colors.surface.withValues(alpha: 0.78),
      borderRadius: BorderRadius.circular(20),
      child: Padding(
        padding: const EdgeInsets.fromLTRB(16, 6, 16, 6),
        child: Row(
          children: <Widget>[
            Icon(Icons.opacity, color: colors.primary, semanticLabel: AppStrings.opacity),
            Expanded(
              child: Slider(
                key: const Key('opacitySlider'),
                value: value.clamp(0.0, 1.0),
                onChanged: onChanged,
                semanticFormatterCallback: (double v) => '${(v * 100).round()}%',
              ),
            ),
            SizedBox(
              width: 48,
              child: Text(
                '$percent%',
                key: const Key('opacityPercent'),
                textAlign: TextAlign.end,
                style: const TextStyle(fontFeatures: <FontFeature>[FontFeature.tabularFigures()]),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
