import 'dart:typed_data';

import 'package:image/image.dart' as img;

/// A valid 4x4 semi-transparent PNG.
final Uint8List tinyPng = img.encodePng(
  img.Image(width: 4, height: 4, numChannels: 4)..clear(img.ColorRgba8(20, 22, 31, 200)),
);
