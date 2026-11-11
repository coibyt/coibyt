import 'package:flutter/material.dart';

/// The semi-transparent picture the user traces, centred and fitted inside
/// the screen without cropping (aspect-fit).
///
/// Phase 2 will wrap this in a gesture layer (pinch-zoom, rotate, lock).
class TraceOverlay extends StatelessWidget {
  const TraceOverlay({
    super.key,
    required this.image,
    required this.opacity,
    this.padding = const EdgeInsets.all(24),
  });

  final ImageProvider image;

  /// 0.0 = invisible, 1.0 = fully opaque.
  final double opacity;

  final EdgeInsets padding;

  @override
  Widget build(BuildContext context) {
    return IgnorePointer(
      child: Padding(
        padding: padding,
        child: Center(
          child: Image(
            image: image,
            fit: BoxFit.contain,
            // Cheaper than wrapping in an Opacity widget: the alpha is applied
            // while painting the image, no extra compositing layer.
            opacity: AlwaysStoppedAnimation<double>(opacity.clamp(0.0, 1.0)),
            filterQuality: FilterQuality.medium,
            gaplessPlayback: true,
          ),
        ),
      ),
    );
  }
}
