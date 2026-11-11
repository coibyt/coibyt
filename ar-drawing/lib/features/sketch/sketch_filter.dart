import 'dart:math' as math;

import 'package:flutter/foundation.dart';
import 'package:image/image.dart' as img;

/// How a photo is turned into something easy to trace.
enum SketchStyle {
  /// Clean outlines found with Canny edge detection.
  lineArt,

  /// Soft pencil drawing (grey-scale "colour dodge" sketch).
  pencil,

  /// The photo itself, unchanged.
  original,
}

/// Input for [renderSketch]. Plain data so it can be sent to a background
/// isolate.
@immutable
class SketchRequest {
  const SketchRequest({required this.bytes, required this.style, this.detail = 0.5});

  /// Encoded image (JPEG, PNG, HEIC decoded by the picker, ...).
  final Uint8List bytes;
  final SketchStyle style;

  /// 0.0 = only the strongest lines, 1.0 = lots of detail.
  final double detail;
}

/// Longest side the filter works on. Plenty for tracing, and keeps the
/// processing well under a second on mid-range phones.
const int kSketchMaxSide = 1280;

/// Ink colour of generated lines (TraceLight "ink").
const int _inkR = 20, _inkG = 22, _inkB = 31;

/// Renders [request] off the UI thread and returns PNG bytes. Line art and
/// pencil results have a transparent background, so only the strokes are
/// laid over the camera picture.
Future<Uint8List> renderSketch(SketchRequest request) =>
    compute(renderSketchSync, request, debugLabel: 'renderSketch');

/// Synchronous version of [renderSketch] (used by the isolate and by tests).
Uint8List renderSketchSync(SketchRequest request) {
  final img.Image? decoded = img.decodeImage(request.bytes);
  if (decoded == null) {
    throw const FormatException('Unsupported or damaged image file');
  }
  img.Image source = img.bakeOrientation(decoded);
  final int longest = math.max(source.width, source.height);
  if (longest > kSketchMaxSide) {
    source = source.width >= source.height
        ? img.copyResize(source, width: kSketchMaxSide, interpolation: img.Interpolation.average)
        : img.copyResize(source, height: kSketchMaxSide, interpolation: img.Interpolation.average);
  }

  final double detail = request.detail.clamp(0.0, 1.0);
  final img.Image result = switch (request.style) {
    SketchStyle.original => source,
    SketchStyle.lineArt => _inkImage(
      source.width,
      source.height,
      lineArtAlpha(_luminance(source), source.width, source.height, detail),
    ),
    SketchStyle.pencil => _inkImage(
      source.width,
      source.height,
      pencilAlpha(_luminance(source), source.width, source.height, detail),
    ),
  };
  return img.encodePng(result, level: 1);
}

Uint8List _luminance(img.Image image) {
  final Uint8List out = Uint8List(image.width * image.height);
  int i = 0;
  for (final img.Pixel p in image) {
    // Transparent pixels count as white paper.
    final num a = p.aNormalized;
    final double l = 0.299 * p.r + 0.587 * p.g + 0.114 * p.b;
    final double maxV = p.maxChannelValue.toDouble();
    out[i++] = ((l / maxV * a + (1 - a)) * 255).round().clamp(0, 255);
  }
  return out;
}

img.Image _inkImage(int width, int height, Uint8List alpha) {
  final Uint8List data = Uint8List(width * height * 4);
  for (int i = 0, j = 0; i < alpha.length; i++, j += 4) {
    data[j] = _inkR;
    data[j + 1] = _inkG;
    data[j + 2] = _inkB;
    data[j + 3] = alpha[i];
  }
  return img.Image.fromBytes(
    width: width,
    height: height,
    bytes: data.buffer,
    numChannels: 4,
    order: img.ChannelOrder.rgba,
  );
}

/// Canny edge detection on a grey-scale image. Returns per-pixel ink alpha
/// (255 = line, 0 = empty paper).
@visibleForTesting
Uint8List lineArtAlpha(Uint8List gray, int width, int height, double detail) {
  final int n = width * height;
  // 1. Smooth away paper grain / JPEG noise. More detail -> less blur.
  final Float32List smooth = _boxBlur3(gray, width, height, radius: detail > 0.66 ? 1 : 2);

  // 2. Sobel gradients.
  final Float32List mag = Float32List(n);
  final Uint8List dir = Uint8List(n); // 0: -, 1: /, 2: |, 3: \
  for (int y = 1; y < height - 1; y++) {
    for (int x = 1; x < width - 1; x++) {
      final int i = y * width + x;
      final double a = smooth[i - width - 1], b = smooth[i - width], c = smooth[i - width + 1];
      final double d = smooth[i - 1], f = smooth[i + 1];
      final double g = smooth[i + width - 1], h = smooth[i + width], k = smooth[i + width + 1];
      final double gx = (c + 2 * f + k) - (a + 2 * d + g);
      final double gy = (g + 2 * h + k) - (a + 2 * b + c);
      mag[i] = math.sqrt(gx * gx + gy * gy);
      double angle = math.atan2(gy, gx) * 180 / math.pi;
      if (angle < 0) angle += 180;
      dir[i] = angle < 22.5 || angle >= 157.5
          ? 0
          : angle < 67.5
          ? 1
          : angle < 112.5
          ? 2
          : 3;
    }
  }

  // 3. Non-maximum suppression: keep only the ridge of each edge.
  final Float32List thin = Float32List(n);
  for (int y = 1; y < height - 1; y++) {
    for (int x = 1; x < width - 1; x++) {
      final int i = y * width + x;
      final double m = mag[i];
      if (m == 0) continue;
      final (int o1, int o2) = switch (dir[i]) {
        0 => (i - 1, i + 1),
        1 => (i - width + 1, i + width - 1),
        2 => (i - width, i + width),
        _ => (i - width - 1, i + width + 1),
      };
      if (m >= mag[o1] && m >= mag[o2]) thin[i] = m;
    }
  }

  // 4. Thresholds from the magnitude distribution, so the result does not
  //    depend on photo brightness. `detail` sets the share of edge pixels.
  final double edgeShare = 0.02 + 0.10 * detail;
  final double high = math.max(_percentile(thin, 1 - edgeShare), 8);
  final double low = high * 0.45;

  // 5. Hysteresis: weak edges survive only when connected to strong ones.
  final Uint8List edges = Uint8List(n);
  final List<int> stack = <int>[];
  for (int i = 0; i < n; i++) {
    if (thin[i] >= high && edges[i] == 0) {
      edges[i] = 255;
      stack.add(i);
      while (stack.isNotEmpty) {
        final int p = stack.removeLast();
        final int px = p % width, py = p ~/ width;
        for (int dy = -1; dy <= 1; dy++) {
          final int yy = py + dy;
          if (yy < 0 || yy >= height) continue;
          for (int dx = -1; dx <= 1; dx++) {
            final int xx = px + dx;
            if (xx < 0 || xx >= width) continue;
            final int q = yy * width + xx;
            if (edges[q] == 0 && thin[q] >= low) {
              edges[q] = 255;
              stack.add(q);
            }
          }
        }
      }
    }
  }

  // 6. Thicken lines so they stay visible when the picture is scaled down
  //    on screen, then soften the edges slightly (anti-aliasing).
  final int thickness = math.max(width, height) >= 900 ? 1 : 0;
  final Uint8List bold = thickness > 0 ? _dilate(edges, width, height) : edges;
  final Float32List soft = _boxBlur3(bold, width, height, radius: 1, passes: 1);
  final Uint8List out = Uint8List(n);
  for (int i = 0; i < n; i++) {
    // Line pixels stay fully opaque; the blur only adds a soft fringe.
    out[i] = math.max(bold[i], math.min(255, soft[i] * 1.6).round());
  }
  return out;
}

/// Pencil sketch: colour-dodge the grey image with its blurred negative.
@visibleForTesting
Uint8List pencilAlpha(Uint8List gray, int width, int height, double detail) {
  final int n = width * height;
  final Uint8List inverted = Uint8List(n);
  for (int i = 0; i < n; i++) {
    inverted[i] = 255 - gray[i];
  }
  final int radius = math.max(2, (math.max(width, height) / 120).round());
  final Float32List blurred = _boxBlur3(inverted, width, height, radius: radius);
  final double gain = 1.4 + 2.2 * detail;
  final Uint8List out = Uint8List(n);
  for (int i = 0; i < n; i++) {
    final double dodge = math.min(255, gray[i] * 255 / (256 - blurred[i]));
    final double darkness = (255 - dodge) * gain;
    out[i] = darkness < 10 ? 0 : math.min(255, darkness).round();
  }
  return out;
}

double _percentile(Float32List values, double q) {
  // Histogram over [0, max] is enough precision for a threshold.
  double maxV = 0;
  for (final double v in values) {
    if (v > maxV) maxV = v;
  }
  if (maxV == 0) return 0;
  const int bins = 1024;
  final Int32List hist = Int32List(bins);
  for (final double v in values) {
    hist[math.min(bins - 1, (v / maxV * (bins - 1)).floor())]++;
  }
  final int target = (values.length * q).floor();
  int seen = 0;
  for (int b = 0; b < bins; b++) {
    seen += hist[b];
    if (seen > target) return b / (bins - 1) * maxV;
  }
  return maxV;
}

Uint8List _dilate(Uint8List src, int width, int height) {
  final Uint8List out = Uint8List(src.length);
  for (int y = 0; y < height; y++) {
    for (int x = 0; x < width; x++) {
      int m = 0;
      for (int dy = -1; dy <= 1 && m < 255; dy++) {
        final int yy = y + dy;
        if (yy < 0 || yy >= height) continue;
        for (int dx = -1; dx <= 1; dx++) {
          final int xx = x + dx;
          if (xx < 0 || xx >= width) continue;
          final int v = src[yy * width + xx];
          if (v > m) m = v;
        }
      }
      out[y * width + x] = m;
    }
  }
  return out;
}

/// Approximates a Gaussian blur with repeated box blurs (O(n) per pass).
Float32List _boxBlur3(Uint8List src, int width, int height, {required int radius, int passes = 3}) {
  final Float32List a = Float32List(src.length);
  for (int i = 0; i < src.length; i++) {
    a[i] = src[i].toDouble();
  }
  final Float32List b = Float32List(src.length);
  for (int p = 0; p < passes; p++) {
    _boxH(a, b, width, height, radius);
    _boxV(b, a, width, height, radius);
  }
  return a;
}

void _boxH(Float32List src, Float32List dst, int w, int h, int r) {
  final double norm = 1 / (2 * r + 1);
  for (int y = 0; y < h; y++) {
    final int row = y * w;
    double acc = 0;
    for (int k = -r; k <= r; k++) {
      acc += src[row + k.clamp(0, w - 1)];
    }
    for (int x = 0; x < w; x++) {
      dst[row + x] = acc * norm;
      acc += src[row + math.min(w - 1, x + r + 1)] - src[row + math.max(0, x - r)];
    }
  }
}

void _boxV(Float32List src, Float32List dst, int w, int h, int r) {
  final double norm = 1 / (2 * r + 1);
  for (int x = 0; x < w; x++) {
    double acc = 0;
    for (int k = -r; k <= r; k++) {
      acc += src[k.clamp(0, h - 1) * w + x];
    }
    for (int y = 0; y < h; y++) {
      dst[y * w + x] = acc * norm;
      acc += src[math.min(h - 1, y + r + 1) * w + x] - src[math.max(0, y - r) * w + x];
    }
  }
}
