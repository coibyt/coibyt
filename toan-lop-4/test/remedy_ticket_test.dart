import 'dart:convert';
import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:toan_lop_4/app_state.dart';
import 'package:toan_lop_4/logic/remedies.dart';
import 'package:toan_lop_4/services/content_repository.dart';
import 'package:toan_lop_4/services/kv_store.dart';

import 'helpers.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  final remedies = parseRemedies(jsonDecode(File(remediesPath).readAsStringSync()) as Map<String, dynamic>);

  test('Tranh sửa sai: mọi bài tập đều có tranh, và tranh có trong gói app', () {
    final catalog = loadCatalogFromDisk();
    var n = 0;
    for (final c in catalog.books.first.chapters) {
      for (final ref in [...c.lessons, ...c.advancedLessons]) {
        final lesson = loadLessonFromDisk(ref.id);
        expect(remedyForLesson(lesson.problems, remedies), isNotNull, reason: ref.id);
        for (final p in lesson.problems) {
          expect(remedyForProblem(p, remedies), isNotNull, reason: '${ref.id} ${p.id}');
          n++;
        }
      }
    }
    expect(n, greaterThan(800));
    for (final r in remedies.values) {
      expect(File(r.image).existsSync(), isTrue, reason: r.image);
      expect(r.lines.length, inInclusiveRange(3, 6));
    }
  });

  test('Vé vui chơi: mỗi ngày tặng 1 vé, học tiếng Anh nhận thêm vé', () async {
    var day = DateTime(2026, 11, 12, 9);
    final s = AppState(content: ContentRepository(), store: MemoryStore(), clock: () => day);
    await s.init();
    expect(s.tickets, 1);
    expect(await s.spendTicket(), isTrue);
    expect(s.tickets, 0);
    expect(await s.spendTicket(), isFalse);
    await s.addTickets(3);
    expect(s.tickets, 3);
    expect(await s.spendTicket(), isTrue);
    expect(s.tickets, 2);
    day = DateTime(2026, 11, 13, 8); // sang ngày mới: thêm vé tặng
    expect(s.tickets, 3);
    await s.saveEnglishStars('c2', 2);
    await s.saveEnglishStars('c2', 1);
    expect(s.englishStars['c2'], 2);
  });
}
