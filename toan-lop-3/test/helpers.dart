import 'dart:convert';
import 'dart:io';

import 'package:toan_lop_3/models/content.dart';
import 'package:toan_lop_3/models/exam.dart';

/// Đọc file nội dung thật từ thư mục assets (chạy từ gốc dự án).
Object? readJson(String path) => jsonDecode(File(path).readAsStringSync());

Catalog loadCatalogFromDisk() => Catalog.fromJson(readJson('assets/content/catalog.json'));

Lesson loadLessonFromDisk(String id) =>
    Lesson.fromJson(readJson('assets/content/lessons/$id.json'));

List<File> lessonFiles() => Directory('assets/content/lessons')
    .listSync()
    .whereType<File>()
    .where((f) => f.path.endsWith('.json'))
    .toList()
  ..sort((a, b) => a.path.compareTo(b.path));

List<File> examFiles() => Directory('assets/content/exams')
    .listSync()
    .whereType<File>()
    .where((f) => f.path.endsWith('.json'))
    .toList()
  ..sort((a, b) => a.path.compareTo(b.path));

Exam loadExamFromDisk(String id) => Exam.fromJson(readJson('assets/content/exams/$id.json'));
