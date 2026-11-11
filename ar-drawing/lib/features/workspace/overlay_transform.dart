import 'package:flutter/widgets.dart';

/// Position, size and angle of the picture being traced, relative to its
/// starting place (centred, aspect-fit). Shared by the on-screen overlay and
/// the time-lapse renderer so both draw the picture in exactly the same spot.
@immutable
class OverlayTransform {
  const OverlayTransform({this.offset = Offset.zero, this.scale = 1, this.rotation = 0});

  static const OverlayTransform identity = OverlayTransform();
  static const double minScale = 0.2;
  static const double maxScale = 8;

  /// Move in logical pixels from the screen centre.
  final Offset offset;

  /// 1.0 = fits the screen.
  final double scale;

  /// Radians, clockwise.
  final double rotation;

  bool get isIdentity => this == identity;

  /// Result of a pinch / pan / twist gesture that began at [start].
  ///
  /// [translation] is how far the fingers' focal point moved, [scale] and
  /// [rotation] are the gesture's values relative to its start (as reported
  /// by [ScaleUpdateDetails]).
  static OverlayTransform fromGesture(
    OverlayTransform start, {
    required Offset translation,
    required double scale,
    required double rotation,
  }) {
    return OverlayTransform(
      offset: start.offset + translation,
      scale: (start.scale * scale).clamp(minScale, maxScale),
      rotation: start.rotation + rotation,
    );
  }

  /// Matrix applied around the centre of the overlay's box.
  Matrix4 toMatrix() => Matrix4.identity()
    ..translateByDouble(offset.dx, offset.dy, 0, 1)
    ..rotateZ(rotation)
    ..scaleByDouble(scale, scale, 1, 1);

  /// Applies this transform to [canvas], pivoting around [centre].
  void applyToCanvas(Canvas canvas, Offset centre) {
    canvas
      ..translate(centre.dx + offset.dx, centre.dy + offset.dy)
      ..rotate(rotation)
      ..scale(scale)
      ..translate(-centre.dx, -centre.dy);
  }

  @override
  bool operator ==(Object other) =>
      other is OverlayTransform &&
      other.offset == offset &&
      other.scale == scale &&
      other.rotation == rotation;

  @override
  int get hashCode => Object.hash(offset, scale, rotation);

  @override
  String toString() => 'OverlayTransform(offset: $offset, scale: $scale, rotation: $rotation)';
}
