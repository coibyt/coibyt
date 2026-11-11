import 'dart:convert';

import 'package:flutter/services.dart';

import '../logic/content_validator.dart';
import '../models/calendar.dart';
import '../models/content.dart';
import '../models/exam.dart';
import 'kv_store.dart';

/// Nội dung bị lỗi: thông báo rõ cho người soạn (chế độ debug).
class InvalidContentException implements Exception {
  InvalidContentException(this.source, this.issues);

  final String source;
  final List<ContentIssue> issues;

  @override
  String toString() => 'Nội dung "$source" có ${issues.length} lỗi:\n${issues.join('\n')}';
}

/// Nạp nội dung đóng gói sẵn trong app (offline).
///
/// Phase 4: thêm lớp cache (SQLite/Hive) + tải đề mới từ API Node.js; lớp này
/// vẫn là nguồn dự phòng khi không có mạng.
class ContentRepository {
  ContentRepository({AssetBundle? bundle, this.cache}) : _bundle = bundle ?? rootBundle;

  static const catalogPath = 'assets/content/catalog.json';

  /// Khoá lưu bản tải về: `content:<đường dẫn>`.
  static String cacheKey(String path) => 'content:$path';

  final AssetBundle _bundle;

  /// Nội dung tải từ máy chủ (Hive). Ưu tiên hơn bản đóng gói nếu có.
  final KeyValueStore? cache;
  Catalog? _catalog;

  /// Xoá bộ nhớ tạm sau khi tải nội dung mới.
  void invalidate() => _catalog = null;

  Future<String> _read(String path) async => cache?.get(cacheKey(path)) ?? await _bundle.loadString(path);

  Future<Catalog> loadCatalog() async {
    if (_catalog != null) return _catalog!;
    final bundled = Catalog.fromJson(jsonDecode(await _bundle.loadString(catalogPath)));
    final issues = validateCatalog(bundled);
    if (issues.isNotEmpty) throw InvalidContentException(catalogPath, issues);
    var catalog = bundled;
    final cached = cache?.get(cacheKey(catalogPath));
    if (cached != null) {
      try {
        final remote = Catalog.fromJson(jsonDecode(cached));
        if (remote.contentRev >= bundled.contentRev && validateCatalog(remote).isEmpty) catalog = remote;
      } on Object {
        // Bản tải về hỏng → dùng bản đóng gói.
      }
    }
    return _catalog = catalog;
  }

  /// Nạp và kiểm tra một bài học. Ném [InvalidContentException] nếu sai toán.
  Future<Lesson> loadLesson(String assetPath) async {
    final catalog = await loadCatalog();
    final json = jsonDecode(await _read(assetPath));
    final lesson = Lesson.fromJson(json);
    final issues = validateLesson(lesson, knownSkillIds: catalog.skills.map((s) => s.id).toSet());
    if (issues.isNotEmpty) throw InvalidContentException(assetPath, issues);
    return lesson;
  }

  static const calendarPath = 'assets/content/calendar.json';

  /// Lịch học từng ngày (null nếu bản cài chưa có lịch hoặc file lỗi — app vẫn chạy bình thường).
  Future<SchoolCalendar?> loadCalendar() async {
    try {
      return SchoolCalendar.fromJson(jsonDecode(await _bundle.loadString(calendarPath)));
    } on Object {
      return null;
    }
  }

  /// Nạp và kiểm tra một đề kiểm tra.
  Future<Exam> loadExam(String assetPath) async {
    final catalog = await loadCatalog();
    final exam = Exam.fromJson(jsonDecode(await _read(assetPath)));
    final issues = validateExam(exam, knownSkillIds: catalog.skills.map((s) => s.id).toSet());
    if (issues.isNotEmpty) throw InvalidContentException(assetPath, issues);
    return exam;
  }
}
