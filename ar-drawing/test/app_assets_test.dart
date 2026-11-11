import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:tracelight/core/app_assets.dart';

void main() {
  test('every bundled sample picture exists on disk', () {
    for (final String path in AppAssets.samples) {
      expect(File(path).existsSync(), isTrue, reason: path);
    }
  });
}
