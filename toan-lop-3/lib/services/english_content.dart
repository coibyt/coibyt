import 'dart:convert';

import 'package:flutter/services.dart';

import '../logic/bilingual.dart';

export '../logic/bilingual.dart';

/// Bản tiếng Anh của các bài (assets/content/en.json), đọc một lần.
abstract final class EnglishContent {
  static Future<Map<String, LessonEnglish>>? _cache;

  static Future<Map<String, LessonEnglish>> load([AssetBundle? bundle]) => _cache ??= () async {
    try {
      // load + utf8.decode: loadString tách luồng riêng với tệp lớn (treo trong kiểm thử).
      final data = await (bundle ?? rootBundle).load(englishPath);
      final raw = utf8.decode(data.buffer.asUint8List(data.offsetInBytes, data.lengthInBytes));
      return parseEnglish(jsonDecode(raw) as Map<String, dynamic>);
    } on Object {
      return <String, LessonEnglish>{};
    }
  }();

  /// Bản tiếng Anh của bài [lessonId] (null nếu chưa có).
  static Future<LessonEnglish?> of(String lessonId) async => (await load())[lessonId];

  /// Chỉ dùng trong kiểm thử.
  static void reset() => _cache = null;
}
