import 'package:flutter_test/flutter_test.dart';
import 'package:toan_lop_4/logic/advanced_hints.dart';
import 'package:toan_lop_4/logic/answer_checker.dart';
import 'package:toan_lop_4/logic/content_validator.dart';
import 'package:toan_lop_4/logic/tutor.dart';
import 'package:toan_lop_4/logic/tutor_hints.dart';
import 'package:toan_lop_4/models/blocks.dart';
import 'package:toan_lop_4/models/calendar.dart';
import 'package:toan_lop_4/models/content.dart';
import 'package:toan_lop_4/models/problem.dart';

import 'helpers.dart';

/// Các số trong đáp án (để kiểm tra gợi ý không lộ đáp án).
Iterable<int> answerNumbers(Problem p) sync* {
  switch (p.body) {
    case FillBlankBody(:final blanks):
      for (final b in blanks) {
        if (b.answer case NumberAnswerRule(:final value)) yield value;
      }
    case MultipleChoiceBody(:final choices, :final correctChoiceIds):
      for (final c in choices.where((c) => correctChoiceIds.contains(c.id))) {
        final m = RegExp(r'^[\d.]+').firstMatch(c.text);
        if (m != null) yield int.parse(m.group(0)!.replaceAll('.', ''));
      }
    case DragDropBody(:final tokens, :final slots):
      for (final s in slots) {
        final t = tokens.firstWhere((t) => t.id == s.accept.first).text;
        final v = int.tryParse(t.replaceAll('.', ''));
        if (v != null) yield v;
      }
    case MatchingBody():
      break;
  }
}

UserAnswer correctAnswerOf(Problem p) => switch (p.body) {
  MultipleChoiceBody(:final correctChoiceIds) => ChoiceAnswer(correctChoiceIds),
  FillBlankBody(:final blanks) => BlankAnswer({for (final b in blanks) b.id: b.answer.displayAnswer}),
  DragDropBody(:final slots) => DragDropAnswer({for (final s in slots) s.id: s.accept.first}),
  MatchingBody(:final pairs) => MatchingAnswer(pairs),
};

void main() {
  final catalog = loadCatalogFromDisk();
  final book = catalog.books.firstWhere((b) => b.id == 'kntt4');
  final skills = catalog.skills.map((s) => s.id).toSet();
  final calendar = SchoolCalendar.fromJson(readJson('assets/content/calendar.json'));
  final advRefs = [for (final c in book.chapters) ...c.advancedLessons];
  final basicRefs = [for (final c in book.chapters) ...c.lessons];
  final chapterOfAdv = {
    for (final c in book.chapters)
      for (final l in c.advancedLessons) l.id: c.id,
  };
  final chapterOfBasic = {
    for (final c in book.chapters)
      for (final l in c.lessons) l.id: c.id,
  };
  final lessons = {for (final r in advRefs) r.id: Lesson.fromJson(readJson(r.src))};

  group('Mạch nâng cao — mục lục và lịch', () {
    test('36 bài nâng cao, mỗi tuần học đúng một bài', () {
      expect(calendar.weekCount, 36);
      expect(advRefs, hasLength(36));
      expect(calendar.advanced, hasLength(calendar.weekCount));
      expect(calendar.advanced.map((a) => a.week).toList(), [for (var w = 1; w <= 36; w++) w]);
      for (var w = 1; w <= calendar.weekCount; w++) {
        expect(calendar.advancedOfWeek(w), 'kntt4.nc.tuan-${w.toString().padLeft(2, '0')}');
      }
      expect(calendar.advancedOfWeek(99), isNull);
    });

    test('mỗi bài nâng cao trong lịch có trong advancedLessons của chủ đề chứa bài đầu tiên của tuần', () {
      for (final a in calendar.advanced) {
        expect(chapterOfAdv.keys, contains(a.lessonId));
        final first = calendar.daysOfWeek(a.week).first.lessonId;
        expect(chapterOfAdv[a.lessonId], chapterOfBasic[first], reason: 'tuần ${a.week}');
      }
    });

    test('mã bài duy nhất trên cả catalog; bài nâng cao không nằm trong lessons; catalog hợp lệ', () {
      final ids = [...basicRefs.map((r) => r.id), ...advRefs.map((r) => r.id)];
      expect(ids.toSet(), hasLength(ids.length));
      expect(basicRefs.any((r) => r.id.contains('.nc.')), isFalse);
      expect(validateCatalog(catalog), isEmpty);
      for (final c in book.chapters) {
        expect([for (final l in c.advancedLessons) l.order], [for (var k = 1; k <= c.advancedLessons.length; k++) k]);
      }
      for (final r in advRefs) {
        expect(r.periods, 1);
        expect(r.access, Access.free);
        expect(r.skillIds, isNotEmpty);
      }
    });

    test('validateCatalog bắt mã trùng giữa lessons và advancedLessons', () {
      final c0 = book.chapters.first;
      final dup = Catalog(
        schemaVersion: catalog.schemaVersion,
        contentRev: catalog.contentRev,
        skills: catalog.skills,
        books: [
          Book(
            id: book.id,
            series: book.series,
            title: book.title,
            chapters: [
              Chapter(
                id: c0.id,
                order: c0.order,
                title: c0.title,
                lessons: c0.lessons,
                advancedLessons: [c0.lessons.first],
              ),
            ],
          ),
        ],
      );
      expect(validateCatalog(dup).join(), contains('bị trùng'));
    });
  });

  group('Mạch nâng cao — nội dung từng bài', () {
    test('mọi bài nạp được, đúng toán, đúng mã/tiêu đề/chủ đề', () {
      for (final r in advRefs) {
        final lesson = lessons[r.id]!;
        expect(lesson.id, r.id);
        expect(lesson.title, r.title);
        expect(lesson.title, startsWith('Nâng cao tuần '));
        expect(lesson.title.length, lessThanOrEqualTo(80));
        expect(lesson.chapterId, chapterOfAdv[r.id]);
        expect(lesson.theory.title, 'Bí kíp nâng cao');
        expect(lesson.theory.blocks.length, inInclusiveRange(2, 3));
        final issues = validateLesson(lesson, knownSkillIds: skills);
        expect(issues, isEmpty, reason: '${r.id}:\n${issues.join('\n')}');
        expect({for (final p in lesson.problems) ...p.skillIds}, r.skillIds.toSet(), reason: r.id);
      }
    });

    test('8 bài toán, mức 2–3 (phần lớn mức 3), đủ 4 dạng, ≥ 3 bài giải nhiều bước, chỉ lời giải bài cuối là VIP', () {
      for (final lesson in lessons.values) {
        final ps = lesson.problems;
        expect(ps, hasLength(8), reason: lesson.id);
        expect(ps.every((p) => p.level >= 2), isTrue, reason: lesson.id);
        expect(ps.where((p) => p.level == 3).length, greaterThanOrEqualTo(5), reason: lesson.id);
        expect(ps.map((p) => p.type).toSet(), containsAll(ProblemType.values), reason: lesson.id);
        final multi = ps.where((p) => p.solution.steps.any((b) => b is WordProblemBlock && b.lines.length >= 2));
        expect(multi.length, greaterThanOrEqualTo(3), reason: lesson.id);
        expect(
          [for (final p in ps) p.id],
          [for (var i = 1; i <= 8; i++) '${lesson.id}.p${i.toString().padLeft(2, '0')}'],
        );
        expect(
          [for (final p in ps) p.solution.access],
          [for (var i = 0; i < 8; i++) i == 7 ? Access.vip : Access.free],
          reason: lesson.id,
        );
        for (final p in ps) {
          expect(checkAnswer(p, correctAnswerOf(p)).status, CheckStatus.correct, reason: p.id);
        }
      }
    });

    test('gợi ý thuộc kAdvancedHints ∪ kGeneratedHints, không có chữ số và không lộ đáp án', () {
      expect(kAdvancedHints.length, lessThanOrEqualTo(35));
      expect(kAdvancedHints.any((h) => RegExp(r'\d').hasMatch(h)), isFalse);
      final allowed = {...kAdvancedHints, ...kGeneratedHints};
      final brain = TutorBrain();
      for (final lesson in lessons.values) {
        for (final p in lesson.problems) {
          expect(allowed, contains(p.solution.hint), reason: p.id);
          final h = brain.hint(p);
          for (final n in answerNumbers(p)) {
            expect(RegExp('(^|[^0-9])$n([^0-9]|\$)').hasMatch(h), isFalse, reason: '${p.id}: "$h" lộ đáp án $n');
          }
        }
      }
    });
  });
}
