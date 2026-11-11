import 'dart:math' as math;

import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:tracelight/features/workspace/overlay_transform.dart';

void main() {
  test('gesture adds translation and rotation, multiplies scale', () {
    const OverlayTransform start = OverlayTransform(offset: Offset(10, 0), scale: 2, rotation: 0.5);
    final OverlayTransform t = OverlayTransform.fromGesture(
      start,
      translation: const Offset(5, -5),
      scale: 1.5,
      rotation: 0.25,
    );
    expect(t.offset, const Offset(15, -5));
    expect(t.scale, 3);
    expect(t.rotation, 0.75);
  });

  test('scale is clamped to a usable range', () {
    final OverlayTransform big = OverlayTransform.fromGesture(
      OverlayTransform.identity,
      translation: Offset.zero,
      scale: 100,
      rotation: 0,
    );
    final OverlayTransform tiny = OverlayTransform.fromGesture(
      OverlayTransform.identity,
      translation: Offset.zero,
      scale: 0.001,
      rotation: 0,
    );
    expect(big.scale, OverlayTransform.maxScale);
    expect(tiny.scale, OverlayTransform.minScale);
  });

  test('matrix moves, rotates and scales a point like the canvas does', () {
    const OverlayTransform t = OverlayTransform(
      offset: Offset(10, 20),
      scale: 2,
      rotation: math.pi / 2,
    );
    final Offset p = MatrixUtils.transformPoint(t.toMatrix(), const Offset(1, 0));
    expect(p.dx, closeTo(10, 1e-9));
    expect(p.dy, closeTo(22, 1e-9));
    expect(OverlayTransform.identity.isIdentity, isTrue);
    expect(t.isIdentity, isFalse);
  });
}
