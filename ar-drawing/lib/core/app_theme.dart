import 'package:flutter/material.dart';

/// TraceLight's own look: deep ink background with a warm lamp-amber accent
/// ("a light you trace under").
abstract final class AppTheme {
  static const Color ink = Color(0xFF14161F);
  static const Color lamp = Color(0xFFFFB547);

  static ThemeData dark() {
    final ColorScheme scheme = ColorScheme.fromSeed(
      seedColor: lamp,
      brightness: Brightness.dark,
    ).copyWith(primary: lamp, surface: ink);

    return ThemeData(
      colorScheme: scheme,
      scaffoldBackgroundColor: Colors.black,
      sliderTheme: const SliderThemeData(
        trackHeight: 4,
        showValueIndicator: ShowValueIndicator.never,
      ),
    );
  }
}
