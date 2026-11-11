import 'dart:typed_data';

import 'package:flutter_test/flutter_test.dart';
import 'package:tracelight/features/timelapse/frame_converter.dart';

void main() {
  // 2x1 BGRA frame: left pixel red, right pixel blue.
  final RawFrame bgra = RawFrame(
    width: 2,
    height: 1,
    format: RawFrameFormat.bgra8888,
    planes: <RawPlane>[
      RawPlane(bytes: Uint8List.fromList(<int>[0, 0, 255, 255, 255, 0, 0, 255]), bytesPerRow: 8),
    ],
  );

  List<int> px(RgbaFrame f, int x, int y) {
    final int i = (y * f.width + x) * 4;
    return f.pixels.sublist(i, i + 4);
  }

  test('BGRA is swizzled to RGBA', () {
    final RgbaFrame out = convertFrame(ConvertRequest(bgra, 0));
    expect(out.width, 2);
    expect(px(out, 0, 0), <int>[255, 0, 0, 255]);
    expect(px(out, 1, 0), <int>[0, 0, 255, 255]);
  });

  test('90° clockwise rotation puts the left pixel on top', () {
    final RgbaFrame out = convertFrame(ConvertRequest(bgra, 1));
    expect(out.width, 1);
    expect(out.height, 2);
    expect(px(out, 0, 0), <int>[255, 0, 0, 255]);
    expect(px(out, 0, 1), <int>[0, 0, 255, 255]);
  });

  test('180° and 270° rotations', () {
    final RgbaFrame r2 = convertFrame(ConvertRequest(bgra, 2));
    expect(px(r2, 0, 0), <int>[0, 0, 255, 255]);
    final RgbaFrame r3 = convertFrame(ConvertRequest(bgra, 3));
    expect(px(r3, 0, 0), <int>[0, 0, 255, 255]);
    expect(px(r3, 0, 1), <int>[255, 0, 0, 255]);
  });

  test('YUV420 grey converts to grey, interleaved chroma supported', () {
    final RawFrame yuv = RawFrame(
      width: 2,
      height: 2,
      format: RawFrameFormat.yuv420,
      planes: <RawPlane>[
        RawPlane(bytes: Uint8List.fromList(<int>[100, 100, 100, 100]), bytesPerRow: 2),
        RawPlane(bytes: Uint8List.fromList(<int>[128, 128]), bytesPerRow: 2, bytesPerPixel: 2),
        RawPlane(bytes: Uint8List.fromList(<int>[128, 128]), bytesPerRow: 2, bytesPerPixel: 2),
      ],
    );
    final RgbaFrame out = convertFrame(ConvertRequest(yuv, 0));
    expect(px(out, 1, 1), <int>[100, 100, 100, 255]);
  });

  test('YUV red-ish chroma gives a red pixel', () {
    final RawFrame yuv = RawFrame(
      width: 2,
      height: 2,
      format: RawFrameFormat.yuv420,
      planes: <RawPlane>[
        RawPlane(bytes: Uint8List.fromList(<int>[76, 76, 76, 76]), bytesPerRow: 2),
        RawPlane(bytes: Uint8List.fromList(<int>[85]), bytesPerRow: 1),
        RawPlane(bytes: Uint8List.fromList(<int>[255]), bytesPerRow: 1),
      ],
    );
    final List<int> p = px(convertFrame(ConvertRequest(yuv, 0)), 0, 0);
    expect(p[0], greaterThan(240));
    expect(p[1], lessThan(15));
    expect(p[2], lessThan(15));
  });

  test('upright turns: landscape frames use the sensor angle, portrait none', () {
    expect(uprightQuarterTurns(width: 1280, height: 720, sensorOrientation: 90), 1);
    expect(uprightQuarterTurns(width: 1280, height: 720, sensorOrientation: 270), 3);
    expect(uprightQuarterTurns(width: 720, height: 1280, sensorOrientation: 90), 0);
  });
}
