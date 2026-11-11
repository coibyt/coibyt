import 'package:camera/camera.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

/// Shows the camera preview filling the whole screen (like `BoxFit.cover`):
/// no black bars, the edges that do not fit are cropped.
class CameraFeed extends StatelessWidget {
  const CameraFeed({super.key, required this.controller});

  final CameraController controller;

  @override
  Widget build(BuildContext context) {
    if (kIsWeb) {
      // In the browser the <video> element already uses `object-fit: cover`.
      return SizedBox.expand(child: controller.buildPreview());
    }

    // `aspectRatio` is reported for the sensor in landscape (e.g. 16:9). The
    // app is locked to portrait, so the preview on screen is 9:16.
    final double portraitAspect = 1 / controller.value.aspectRatio;

    return LayoutBuilder(
      builder: (BuildContext context, BoxConstraints constraints) {
        final double width = constraints.maxWidth;
        return ClipRect(
          child: FittedBox(
            fit: BoxFit.cover,
            child: SizedBox(
              width: width,
              height: width / portraitAspect,
              child: CameraPreview(controller),
            ),
          ),
        );
      },
    );
  }
}
