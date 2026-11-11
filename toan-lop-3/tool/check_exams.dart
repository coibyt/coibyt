// Kiểm tra mọi đề trong một thư mục nội dung (mặc định assets/content):
//   dart run tool/check_exams.dart [thư-mục-content]
// ignore_for_file: avoid_print
import 'dart:convert';
import 'dart:io';

import 'package:toan_lop_3/logic/content_validator.dart';
import 'package:toan_lop_3/models/content.dart';
import 'package:toan_lop_3/models/exam.dart';

void main(List<String> args) {
  final dir = args.isEmpty ? 'assets/content' : args.first;
  final catalog = Catalog.fromJson(jsonDecode(File('$dir/catalog.json').readAsStringSync()));
  final skills = {for (final s in catalog.skills) s.id};
  var bad = 0, n = 0;
  for (final f in Directory('$dir/exams').listSync().whereType<File>().where((f) => f.path.endsWith('.json'))) {
    n++;
    try {
      final exam = Exam.fromJson(jsonDecode(f.readAsStringSync()));
      final issues = validateExam(exam, knownSkillIds: skills);
      if (issues.isNotEmpty) {
        bad++;
        print('✗ ${f.path}: ${issues.take(3).map((i) => '${i.path}: ${i.message}').join('; ')}');
      }
    } on Object catch (e) {
      bad++;
      print('✗ ${f.path}: $e');
    }
  }
  print('$n đề, lỗi $bad.');
  exit(bad == 0 ? 0 : 1);
}
