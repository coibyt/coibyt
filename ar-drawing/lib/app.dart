import 'package:flutter/material.dart';

import 'core/app_strings.dart';
import 'core/app_theme.dart';
import 'features/home/home_screen.dart';

/// Root widget of TraceLight (working name).
class TraceLightApp extends StatelessWidget {
  const TraceLightApp({super.key, this.home});

  /// Replaces the home screen (tests).
  final Widget? home;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: AppStrings.appName,
      debugShowCheckedModeBanner: false,
      theme: AppTheme.dark(),
      home: home ?? const HomeScreen(),
    );
  }
}
