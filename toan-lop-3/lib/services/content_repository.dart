import 'dart:convert';

import 'package:flutter/services.dart';

import '../logic/content_validator.dart';
import '../models/content.dart';

/// Nội dung bị lỗi: thông báo rõ cho người soạn (chế độ debug).
class InvalidContentException implements Exception {
  InvalidContentException(this.source, this.issues);

  final String source;
  final List<ContentIssue> issues;

  @override
  String toString() =>
      'Nội dung "$source" có ${issues.length} lỗi:\n${issues.join('\n')}';
}

/// Nạp nội dung đóng gói sẵn trong app (offline).
///
/// Phase 4: thêm lớp cache (SQLite/Hive) + tải đề mới từ API Node.js; lớp này
/// vẫn là nguồn dự phòng khi không có mạng.
class ContentRepository {
  ContentRepository({AssetBundle? bundle}) : _bundle = bundle ?? rootBundle;

  static const catalogPath = 'assets/content/catalog.json';

  final AssetBundle _bundle;
  Catalog? _catalog;

  Future<Catalog> loadCatalog() async {
    if (_catalog != null) return _catalog!;
    final json = jsonDecode(await _bundle.loadString(catalogPath));
    final catalog = Catalog.fromJson(json);
    final issues = validateCatalog(catalog);
    if (issues.isNotEmpty) throw InvalidContentException(catalogPath, issues);
    return _catalog = catalog;
  }

  /// Nạp và kiểm tra một bài học. Ném [InvalidContentException] nếu sai toán.
  Future<Lesson> loadLesson(String assetPath) async {
    final catalog = await loadCatalog();
    final json = jsonDecode(await _bundle.loadString(assetPath));
    final lesson = Lesson.fromJson(json);
    final issues = validateLesson(
      lesson,
      knownSkillIds: catalog.skills.map((s) => s.id).toSet(),
    );
    if (issues.isNotEmpty) throw InvalidContentException(assetPath, issues);
    return lesson;
  }
}
