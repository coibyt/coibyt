import 'package:flutter/material.dart';

import 'core/app_assets.dart';
import 'core/app_strings.dart';
import 'core/app_theme.dart';
import 'features/workspace/workspace_screen.dart';

/// Root widget of TraceLight (working name).
class TraceLightApp extends StatelessWidget {
  const TraceLightApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: AppStrings.appName,
      debugShowCheckedModeBanner: false,
      theme: AppTheme.dark(),
      // Phase 1: the app opens straight into the tracing workspace with a
      // bundled sample image. The home screen / template library arrive in
      // Phase 4 and will push this screen with the chosen image instead.
      home: WorkspaceScreen(
        overlayImages: <ImageProvider>[
          for (final String path in AppAssets.samples) AssetImage(path),
        ],
      ),
    );
  }
}
