import 'dart:typed_data';

import 'package:flutter_test/flutter_test.dart';
import 'package:image/image.dart' as img;
import 'package:tracelight/features/sketch/sketch_filter.dart';

/// White 200x200 picture with a black filled square in the middle.
Uint8List squarePhoto() {
  final img.Image photo = img.Image(width: 200, height: 200);
  img.fill(photo, color: img.ColorRgb8(255, 255, 255));
  img.fillRect(photo, x1: 60, y1: 60, x2: 140, y2: 140, color: img.ColorRgb8(0, 0, 0));
  return img.encodeJpg(photo, quality: 95);
}

img.Image render(SketchStyle style, {double detail = 0.5}) => img.decodePng(
  renderSketchSync(SketchRequest(bytes: squarePhoto(), style: style, detail: detail)),
)!;

void main() {
  test('line art draws the outline of a shape and leaves flat areas empty', () {
    final img.Image out = render(SketchStyle.lineArt);
    expect(out.numChannels, 4);
    // On the square's edge (within a pixel or two): ink.
    num near(int x, int y) => <num>[
      for (int dy = -2; dy <= 2; dy++)
        for (int dx = -2; dx <= 2; dx++) out.getPixel(x + dx, y + dy).a,
    ].reduce((num a, num b) => a > b ? a : b);
    expect(near(60, 100), greaterThan(200));
    expect(near(100, 140), greaterThan(200));
    // Inside the square and on the white paper: transparent.
    expect(out.getPixel(100, 100).a, 0);
    expect(out.getPixel(20, 20).a, 0);
  });

  test('pencil sketch keeps edges dark and paper transparent', () {
    final img.Image out = render(SketchStyle.pencil);
    expect(out.getPixel(61, 100).a, greaterThan(100));
    expect(out.getPixel(10, 10).a, 0);
  });

  test('large photos are scaled down to the working size', () {
    final img.Image big = img.Image(width: 3000, height: 1000);
    final Uint8List bytes = img.encodeJpg(big);
    final img.Image out = img.decodePng(
      renderSketchSync(SketchRequest(bytes: bytes, style: SketchStyle.original)),
    )!;
    expect(out.width, kSketchMaxSide);
    expect(out.height, closeTo(kSketchMaxSide / 3, 1));
  });

  test('broken files are reported', () {
    expect(
      () => renderSketchSync(
        SketchRequest(bytes: Uint8List.fromList(<int>[1, 2, 3]), style: SketchStyle.lineArt),
      ),
      throwsFormatException,
    );
  });
}
