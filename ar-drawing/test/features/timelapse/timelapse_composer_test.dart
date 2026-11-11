import 'dart:typed_data';
import 'dart:ui' as ui;

import 'package:flutter/painting.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:tracelight/features/timelapse/timelapse_composer.dart';
import 'package:tracelight/features/workspace/overlay_transform.dart';

Future<ui.Image> solid(int w, int h, Color c) async {
  final ui.PictureRecorder r = ui.PictureRecorder();
  Canvas(r).drawRect(Rect.fromLTWH(0, 0, w.toDouble(), h.toDouble()), Paint()..color = c);
  return r.endRecording().toImage(w, h);
}

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  test('video size keeps the screen shape with a multiple-of-16 width', () {
    final Size s = videoSizeFor(const Size(390, 844));
    expect(s.height, 1280);
    expect(s.width % 16, 0);
    expect(s.width, closeTo(1280 * 390 / 844, 16));
  });

  testWidgets('frame shows the camera, with the overlay blended at its opacity', (
    WidgetTester tester,
  ) async {
    await tester.runAsync(() async {
      final ui.Image camera = await solid(90, 160, const Color(0xFFFF0000));
      final ui.Image overlay = await solid(10, 10, const Color(0xFF0000FF));
      const Size screen = Size(180, 320);
      const Size output = Size(96, 160);

      Future<List<int>> pixel(double opacity, int x, int y) async {
        final Uint8List rgba = await composeFrame(
          camera: camera,
          scene: TimelapseScene(
            screenSize: screen,
            overlay: overlay,
            transform: OverlayTransform.identity,
            opacity: opacity,
          ),
          output: output,
        );
        expect(rgba.length, 96 * 160 * 4);
        final int i = (y * 96 + x) * 4;
        return rgba.sublist(i, i + 4);
      }

      // Near the corner: outside the overlay (24 px padding) -> camera red.
      expect(await pixel(1, 10, 4), <int>[255, 0, 0, 255]);
      // Centre: overlay fully opaque -> blue; half -> mix.
      expect(await pixel(1, 48, 80), <int>[0, 0, 255, 255]);
      final List<int> half = await pixel(0.5, 48, 80);
      expect(half[0], inInclusiveRange(110, 145));
      expect(half[2], inInclusiveRange(110, 145));
    });
  });
}
