import 'package:flutter/foundation.dart';

/// Pixel layout of a camera frame from the image stream.
enum RawFrameFormat {
  /// Android: 3 planes Y, U, V (U/V may be interleaved: bytesPerPixel 2).
  yuv420,

  /// iOS: one plane, 4 bytes per pixel in B, G, R, A order.
  bgra8888,
}

@immutable
class RawPlane {
  const RawPlane({required this.bytes, required this.bytesPerRow, this.bytesPerPixel = 1});

  final Uint8List bytes;
  final int bytesPerRow;
  final int bytesPerPixel;
}

/// A camera frame copied out of the camera plugin, plain data so it can be
/// processed in a background isolate.
@immutable
class RawFrame {
  const RawFrame({
    required this.width,
    required this.height,
    required this.format,
    required this.planes,
  });

  final int width;
  final int height;
  final RawFrameFormat format;
  final List<RawPlane> planes;
}

/// RGBA pixels ready for `decodeImageFromPixels`.
@immutable
class RgbaFrame {
  const RgbaFrame(this.width, this.height, this.pixels);

  final int width;
  final int height;
  final Uint8List pixels;
}

/// Request for [convertFrame]; [quarterTurns] rotates clockwise.
@immutable
class ConvertRequest {
  const ConvertRequest(this.frame, this.quarterTurns);

  final RawFrame frame;
  final int quarterTurns;
}

/// How many clockwise quarter turns make a frame upright in portrait.
///
/// Android delivers stream frames in sensor orientation (landscape, usually
/// needing 90°). iOS already rotates them when capture orientation is locked
/// to portrait, so a frame that is taller than wide needs no turn.
int uprightQuarterTurns({required int width, required int height, required int sensorOrientation}) {
  if (height >= width) return 0;
  return (sensorOrientation ~/ 90) % 4;
}

/// Converts a YUV420 or BGRA frame to RGBA and rotates it. Runs in a
/// background isolate via `compute`.
RgbaFrame convertFrame(ConvertRequest request) {
  final RawFrame f = request.frame;
  final int turns = request.quarterTurns % 4;
  final int w = f.width, h = f.height;
  final int outW = turns.isOdd ? h : w;
  final int outH = turns.isOdd ? w : h;
  final Uint8List out = Uint8List(outW * outH * 4);

  // Maps a source pixel (x, y) to its index in the rotated output.
  int target(int x, int y) {
    switch (turns) {
      case 1: // 90° clockwise
        return ((x) * outW + (outW - 1 - y)) * 4;
      case 2:
        return ((outH - 1 - y) * outW + (outW - 1 - x)) * 4;
      case 3:
        return ((outH - 1 - x) * outW + y) * 4;
      default:
        return (y * outW + x) * 4;
    }
  }

  if (f.format == RawFrameFormat.bgra8888) {
    final RawPlane p = f.planes[0];
    for (int y = 0; y < h; y++) {
      int s = y * p.bytesPerRow;
      for (int x = 0; x < w; x++, s += 4) {
        final int t = target(x, y);
        out[t] = p.bytes[s + 2];
        out[t + 1] = p.bytes[s + 1];
        out[t + 2] = p.bytes[s];
        out[t + 3] = 255;
      }
    }
  } else {
    final RawPlane yp = f.planes[0], up = f.planes[1], vp = f.planes[2];
    for (int y = 0; y < h; y++) {
      final int yRow = y * yp.bytesPerRow;
      final int uvRowU = (y >> 1) * up.bytesPerRow;
      final int uvRowV = (y >> 1) * vp.bytesPerRow;
      for (int x = 0; x < w; x++) {
        final int yy = yp.bytes[yRow + x];
        final int u = up.bytes[uvRowU + (x >> 1) * up.bytesPerPixel] - 128;
        final int v = vp.bytes[uvRowV + (x >> 1) * vp.bytesPerPixel] - 128;
        // BT.601 full-range conversion in integer maths.
        final int r = yy + ((1436 * v) >> 10);
        final int g = yy - ((352 * u + 731 * v) >> 10);
        final int b = yy + ((1815 * u) >> 10);
        final int t = target(x, y);
        out[t] = r < 0 ? 0 : (r > 255 ? 255 : r);
        out[t + 1] = g < 0 ? 0 : (g > 255 ? 255 : g);
        out[t + 2] = b < 0 ? 0 : (b > 255 ? 255 : b);
        out[t + 3] = 255;
      }
    }
  }
  return RgbaFrame(outW, outH, out);
}
