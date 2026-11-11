import 'package:flutter/material.dart';

/// TraceLight's look: a deep indigo night studio lit by a warm lamp-amber
/// light, with jewel-tone accents (violet, coral, teal) for game elements.
abstract final class AppTheme {
  /// Page background.
  static const Color ink = Color(0xFF14122E);

  /// Raised surfaces (cards, pills, list rows).
  static const Color card = Color(0xFF242150);
  static const Color cardHigh = Color(0xFF2F2B66);

  /// Dialogs and bottom sheets.
  static const Color sheet = Color(0xFF1D1A42);

  /// Hairline borders on dark surfaces.
  static const Color line = Color(0x22FFFFFF);

  /// Brand accent: the lamp you trace under.
  static const Color lamp = Color(0xFFFFB547);
  static const Color gold = Color(0xFFFFD27A);
  static const Color violet = Color(0xFF8C6CFF);
  static const Color coral = Color(0xFFFF7E8C);
  static const Color teal = Color(0xFF3FD8C2);
  static const Color success = Color(0xFF2EAD6B);

  /// Page background gradient (top → bottom).
  static const LinearGradient night = LinearGradient(
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
    colors: <Color>[Color(0xFF1C1842), ink],
  );

  /// Gold call-to-action gradient.
  static const LinearGradient goldGradient = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: <Color>[Color(0xFFFFD27A), Color(0xFFFF9F43)],
  );

  static ThemeData dark() {
    final ColorScheme scheme = ColorScheme.fromSeed(
      seedColor: lamp,
      brightness: Brightness.dark,
    ).copyWith(primary: lamp, onPrimary: ink, surface: ink, secondary: violet, tertiary: teal);
    final RoundedRectangleBorder round = RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(24),
    );
    final ThemeData base = ThemeData(colorScheme: scheme, brightness: Brightness.dark);
    return base.copyWith(
      scaffoldBackgroundColor: ink,
      canvasColor: ink,
      textTheme: base.textTheme.copyWith(
        headlineSmall: base.textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.w900),
        titleLarge: base.textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w800),
        titleMedium: base.textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800),
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: ink,
        surfaceTintColor: Colors.transparent,
        elevation: 0,
        scrolledUnderElevation: 0,
        titleTextStyle: TextStyle(fontSize: 20, fontWeight: FontWeight.w800, color: Colors.white),
      ),
      cardTheme: CardThemeData(color: card, shape: round, elevation: 0),
      dialogTheme: DialogThemeData(
        backgroundColor: sheet,
        surfaceTintColor: Colors.transparent,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(28),
          side: const BorderSide(color: line),
        ),
      ),
      bottomSheetTheme: const BottomSheetThemeData(
        backgroundColor: sheet,
        surfaceTintColor: Colors.transparent,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
        ),
        dragHandleColor: Colors.white38,
      ),
      filledButtonTheme: FilledButtonThemeData(
        style: FilledButton.styleFrom(
          shape: const StadiumBorder(),
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
          textStyle: const TextStyle(fontWeight: FontWeight.w800, fontSize: 15),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          shape: const StadiumBorder(),
          padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 14),
          side: const BorderSide(color: Colors.white30),
          textStyle: const TextStyle(fontWeight: FontWeight.w700),
        ),
      ),
      chipTheme: base.chipTheme.copyWith(
        backgroundColor: card,
        selectedColor: const Color(0x55FFB547),
        side: const BorderSide(color: line),
        shape: const StadiumBorder(),
      ),
      tabBarTheme: const TabBarThemeData(
        indicatorColor: lamp,
        labelColor: lamp,
        unselectedLabelColor: Colors.white70,
        dividerColor: line,
        labelStyle: TextStyle(fontWeight: FontWeight.w800),
      ),
      snackBarTheme: const SnackBarThemeData(behavior: SnackBarBehavior.floating),
      progressIndicatorTheme: const ProgressIndicatorThemeData(color: lamp),
      sliderTheme: const SliderThemeData(
        trackHeight: 4,
        showValueIndicator: ShowValueIndicator.never,
      ),
    );
  }
}
