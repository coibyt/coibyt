import 'package:flutter/material.dart';

import '../overlay_transform.dart';

/// Padding between the screen edge and the picture at scale 1.
const EdgeInsets kOverlayPadding = EdgeInsets.all(24);

/// The semi-transparent picture the user traces: centred and fitted inside
/// the screen without cropping (aspect-fit), then moved / zoomed / rotated by
/// [transform]. Touches pass through; gestures are handled by the workspace.
class TraceOverlay extends StatelessWidget {
  const TraceOverlay({
    super.key,
    required this.image,
    required this.opacity,
    this.transform = OverlayTransform.identity,
  });

  final ImageProvider image;

  /// 0.0 = invisible, 1.0 = fully opaque.
  final double opacity;

  final OverlayTransform transform;

  @override
  Widget build(BuildContext context) {
    return IgnorePointer(
      child: Transform(
        transform: transform.toMatrix(),
        alignment: Alignment.center,
        child: Padding(
          padding: kOverlayPadding,
          child: Center(
            child: Image(
              image: image,
              fit: BoxFit.contain,
              // Cheaper than an Opacity widget: alpha is applied while
              // painting, no extra compositing layer.
              opacity: AlwaysStoppedAnimation<double>(opacity.clamp(0.0, 1.0)),
              filterQuality: FilterQuality.medium,
              gaplessPlayback: true,
            ),
          ),
        ),
      ),
    );
  }
}
