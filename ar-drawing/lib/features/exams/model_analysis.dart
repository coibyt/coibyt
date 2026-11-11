import 'dart:ui' as ui;

import 'package:flutter/foundation.dart';
import 'package:flutter/painting.dart';

import '../timelapse/timelapse_composer.dart' show resolveImage;

/// What the tutor needs to know about a model picture.
@immutable
class ModelInfo {
  const ModelInfo({required this.aspect, required this.colors});

  /// Width / height of the subject (transparent margins ignored).
  final double aspect;

  /// Main colours of the picture (dark outline ink excluded).
  final List<Color> colors;
}

Future<ModelInfo> analyzeModel(String asset) async {
  final ui.Image image = await resolveImage(AssetImage(asset));
  final ByteData data = (await image.toByteData(format: ui.ImageByteFormat.rawRgba))!;
  final int w = image.width, h = image.height;
  image.dispose();
  return analyzeRgba(data.buffer.asUint8List(), w, h);
}

ModelInfo analyzeRgba(Uint8List rgba, int w, int h) {
  int x0 = w, y0 = h, x1 = -1, y1 = -1;
  final Map<int, int> buckets = <int, int>{};
  int painted = 0;
  for (int y = 0; y < h; y++) {
    for (int x = 0; x < w; x++) {
      final int i = (y * w + x) * 4;
      if (rgba[i + 3] < 128) continue;
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
      final int r = rgba[i], g = rgba[i + 1], b = rgba[i + 2];
      if (r + g + b < 150) continue; // outline ink
      painted++;
      final int key = (r >> 4) << 8 | (g >> 4) << 4 | (b >> 4);
      buckets[key] = (buckets[key] ?? 0) + 1;
    }
  }
  final List<MapEntry<int, int>> top = buckets.entries.toList()
    ..sort((MapEntry<int, int> a, MapEntry<int, int> b) => b.value.compareTo(a.value));
  final List<Color> colors = <Color>[
    for (final MapEntry<int, int> e in top.take(10))
      if (e.value >= painted * 0.015)
        Color.fromARGB(
          255,
          ((e.key >> 8) & 15) * 16 + 8,
          ((e.key >> 4) & 15) * 16 + 8,
          (e.key & 15) * 16 + 8,
        ),
  ];
  final double aspect = x1 < 0 ? 1 : (x1 - x0 + 1) / (y1 - y0 + 1);
  return ModelInfo(aspect: aspect, colors: colors);
}
