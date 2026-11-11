import 'package:flutter_test/flutter_test.dart';
import 'package:toan_lop_3/logic/content_validator.dart';
import 'package:toan_lop_3/logic/tutor.dart';
import 'package:toan_lop_3/logic/tutor_hints.dart';
import 'package:toan_lop_3/models/calendar.dart';
import 'package:toan_lop_3/models/content.dart';
import 'package:toan_lop_3/models/problem.dart';

import 'helpers.dart';

/// Hai bài viết tay (Chủ đề 4) — giữ nguyên, không sinh lại.
const handWritten = {'kntt3.c4.nhan-2cs-1cs', 'kntt3.c4.chia-2cs-1cs'};

/// Các số trong đáp án (để kiểm tra gợi ý không lộ đáp án).
Iterable<int> answerNumbers(Problem p) sync* {
  switch (p.body) {
    case FillBlankBody(:final blanks):
      for (final b in blanks) {
        if (b.answer case NumberAnswerRule(:final value)) yield value;
      }
    case MultipleChoiceBody(:final choices, :final correctChoiceIds):
      for (final c in choices.where((c) => correctChoiceIds.contains(c.id))) {
        final m = RegExp(r'^\d+').firstMatch(c.text);
        if (m != null) yield int.parse(m.group(0)!);
      }
    default:
      break;
  }
}

void main() {
  final catalog = loadCatalogFromDisk();
  final rawCatalog = readJson('assets/content/catalog.json')! as Map<String, dynamic>;
  final book = catalog.books.firstWhere((b) => b.id == 'kntt3');
  final refs = [for (final c in book.chapters) ...c.lessons];
  final skills = catalog.skills.map((s) => s.id).toSet();
  final lessons = {for (final r in refs) r.id: Lesson.fromJson(readJson(r.src))};
  final calendar = SchoolCalendar.fromJson(readJson('assets/content/calendar.json'));

  /// Số tiết của từng bài (trường `periods`, đọc từ JSON thô).
  final periods = <String, int>{
    for (final b in (rawCatalog['books'] as List).cast<Map<String, dynamic>>())
      if (b['id'] == 'kntt3')
        for (final c in (b['chapters'] as List).cast<Map<String, dynamic>>())
          for (final l in (c['lessons'] as List).cast<Map<String, dynamic>>()) l['id'] as String: l['periods'] as int,
  };

  group('Mục lục cả năm', () {
    test('16 chủ đề, ≥ 70 bài, Tập 1 = chủ đề 1–7, Tập 2 = chủ đề 8–16', () {
      expect(book.chapters, hasLength(16));
      expect(refs.length, greaterThanOrEqualTo(70));
      for (final (i, c) in book.chapters.indexed) {
        expect(c.id, 'kntt3.c${i + 1}');
        expect(c.order, i + 1);
        expect(c.volume, i < 7 ? 1 : 2, reason: c.id);
        expect([for (final l in c.lessons) l.order], [for (var k = 1; k <= c.lessons.length; k++) k], reason: c.id);
        for (final l in c.lessons) {
          expect(l.id, startsWith('${c.id}.'));
          expect(l.skillIds, isNotEmpty, reason: l.id);
        }
      }
      expect(validateCatalog(catalog), isEmpty);
    });

    test('hai bài viết tay nằm trong Chủ đề 4', () {
      final c4 = book.chapters[3].lessons.map((l) => l.id).toList();
      expect(c4, containsAll(handWritten));
      expect(c4.first, 'kntt3.c4.nhan-2cs-1cs');
    });

    test('mọi bài trong catalog đều có file, nạp được và đúng toán', () {
      for (final r in refs) {
        final lesson = lessons[r.id]!;
        expect(lesson.id, r.id);
        expect(lesson.title, r.title);
        final issues = validateLesson(lesson, knownSkillIds: skills);
        expect(issues, isEmpty, reason: '${r.id}:\n${issues.join('\n')}');
      }
    });

    test('bài sinh tự động: 8–10 bài toán, mức tăng dần, chỉ lời giải bài cuối là VIP', () {
      for (final r in refs.where((r) => !handWritten.contains(r.id))) {
        final ps = lessons[r.id]!.problems;
        expect(ps.length, inInclusiveRange(8, 10), reason: r.id);
        final levels = [for (final p in ps) p.level];
        expect(levels, orderedEquals([...levels]..sort()), reason: r.id);
        expect(ps.every((p) => p.access == Access.free), isTrue, reason: r.id);
        expect(
          [for (final p in ps) p.solution.access],
          [for (var i = 0; i < ps.length; i++) i == ps.length - 1 ? Access.vip : Access.free],
          reason: r.id,
        );
        expect(ps.map((p) => p.type).toSet(), containsAll(ProblemType.values), reason: r.id);
        // Kỹ năng của mục lục = kỹ năng của các bài toán.
        expect({for (final p in ps) ...p.skillIds}, r.skillIds.toSet(), reason: r.id);
      }
    });

    test('tổng số tiết cả năm là 175', () {
      expect(periods.keys.toSet(), refs.map((r) => r.id).toSet());
      expect(periods.values.every((p) => p >= 1 && p <= 5), isTrue);
      expect(periods.values.fold(0, (a, b) => a + b), 175);
    });
  });

  group('Gợi ý', () {
    test('mọi gợi ý của bài sinh tự động nằm trong kGeneratedHints, không chứa chữ số', () {
      expect(kGeneratedHints.length, lessThanOrEqualTo(60));
      expect(kGeneratedHints.toSet(), hasLength(kGeneratedHints.length));
      expect(kGeneratedHints.any((h) => RegExp(r'\d').hasMatch(h)), isFalse);
      for (final r in refs.where((r) => !handWritten.contains(r.id))) {
        for (final p in lessons[r.id]!.problems) {
          final h = p.solution.hint;
          if (h != null) expect(kGeneratedHints, contains(h), reason: p.id);
        }
      }
    });

    test('gợi ý của cô KHÔNG chứa đáp án — mọi bài học cả năm', () {
      final brain = TutorBrain();
      for (final lesson in lessons.values) {
        for (final p in lesson.problems) {
          final h = brain.hint(p);
          expect(h, isNotEmpty);
          for (final n in answerNumbers(p).where((n) => n >= 10)) {
            expect(RegExp('(^|[^0-9])$n([^0-9]|\$)').hasMatch(h), isFalse, reason: '${p.id}: "$h" lộ đáp án $n');
          }
        }
      }
    });
  });

  group('Lịch học 2026–2027', () {
    final order = refs.map((r) => r.id).toList();

    test('175 ngày học, mỗi ngày một tiết, thứ Hai – thứ Sáu, không trùng ngày nghỉ', () {
      expect(calendar.bookId, 'kntt3');
      expect(calendar.schoolYear, '2026-2027');
      expect(calendar.days, hasLength(175));
      expect(calendar.days.map((d) => d.date).toSet(), hasLength(175));
      for (final d in calendar.days) {
        expect(d.date.weekday, lessThanOrEqualTo(DateTime.friday), reason: '${d.date}');
        expect(calendar.holidayFor(d.date), isNull, reason: '${d.date} là ngày nghỉ');
        expect(calendar.termFor(d.date)?.term, d.term, reason: '${d.date}');
      }
      final tet = calendar.holidays.firstWhere((h) => h.name.contains('Tết Nguyên Đán'));
      expect(tet.contains(DateTime(2027, 2, 6)), isTrue);
      expect(calendar.holidayFor(DateTime(2027, 1, 1)), isNotNull);
      expect(calendar.holidayFor(DateTime(2027, 4, 16))?.name, contains('Hùng Vương'));
      expect(calendar.holidayFor(DateTime(2027, 4, 30)), isNotNull);
    });

    test('mọi bài học có trong catalog, theo đúng thứ tự, đủ số tiết', () {
      final seq = <String>[];
      for (final d in calendar.days) {
        expect(order, contains(d.lessonId));
        if (seq.isEmpty || seq.last != d.lessonId) seq.add(d.lessonId);
      }
      expect(seq, order, reason: 'các bài phải nối tiếp theo thứ tự catalog, mỗi bài một lần');
      for (final id in order) {
        final ds = calendar.daysOfLesson(id);
        expect(ds, hasLength(periods[id]), reason: id);
        expect([for (final d in ds) d.part], [for (var i = 1; i <= periods[id]!; i++) i], reason: id);
        expect(ds.every((d) => d.parts == periods[id]), isTrue, reason: id);
      }
      // Tập 1 học trong học kì 1, Tập 2 trong học kì 2.
      final volumeOf = {
        for (final c in book.chapters)
          for (final l in c.lessons) l.id: c.volume,
      };
      expect(calendar.days.every((d) => volumeOf[d.lessonId] == d.term), isTrue);
    });

    test('tuần học đánh số liên tục, mỗi tuần nằm trong một tuần lễ thứ Hai – thứ Sáu', () {
      var prev = 0;
      for (final d in calendar.days) {
        expect(d.week - prev, inInclusiveRange(0, 1), reason: '${d.date}');
        prev = d.week;
      }
      for (var w = 1; w <= calendar.weekCount; w++) {
        final ds = calendar.daysOfWeek(w);
        expect(ds, isNotEmpty);
        expect(ds.length, lessThanOrEqualTo(5));
        final monday = ds.first.date.subtract(Duration(days: ds.first.date.weekday - 1));
        expect(ds.every((d) => d.date.difference(monday).inDays < 5), isTrue, reason: 'tuần $w');
      }
    });

    test('đề kiểm tra trong lịch đều có trong catalog', () {
      final examIds = book.exams.map((e) => e.id).toSet();
      expect(calendar.exams, isNotEmpty);
      for (final e in calendar.exams) {
        expect(examIds, contains(e.examId));
        expect(e.week, inInclusiveRange(1, calendar.weekCount));
      }
    });

    test('tra cứu theo ngày', () {
      expect(calendar.lessonForDate(DateTime(2026, 9, 7, 15, 30)), 'kntt3.c1.on-tap-cac-so-den-1000');
      expect(calendar.dayFor(DateTime(2026, 9, 7))!.part, 1);
      expect(calendar.dayFor(DateTime(2026, 9, 12)), isNull, reason: 'thứ Bảy');
      expect(calendar.nextDayFrom(DateTime(2026, 9, 12))!.date, DateTime(2026, 9, 14));
      expect(calendar.lessonForDate(DateTime(2027, 2, 8)), isNull, reason: 'nghỉ Tết');
      expect(calendar.daysOfWeek(1).map((d) => d.date.day), [7, 8, 9, 10, 11]);
      expect(calendar.lessonForDate(DateTime(2027, 5, 21)), order.last);
      expect(calendar.nextDayFrom(DateTime(2027, 6, 1)), isNull);
    });
  });
}
