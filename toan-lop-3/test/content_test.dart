import 'dart:convert';

import 'package:flutter_test/flutter_test.dart';
import 'package:toan_lop_3/logic/answer_checker.dart';
import 'package:toan_lop_3/logic/content_validator.dart';
import 'package:toan_lop_3/models/blocks.dart';
import 'package:toan_lop_3/models/content.dart';
import 'package:toan_lop_3/models/json_reader.dart';
import 'package:toan_lop_3/models/problem.dart';

import 'helpers.dart';

/// Đáp án "chuẩn" dựng từ chính nội dung — phải được chấm ĐÚNG.
UserAnswer correctAnswerOf(Problem p) => switch (p.body) {
      MultipleChoiceBody(:final correctChoiceIds) => ChoiceAnswer(correctChoiceIds),
      FillBlankBody(:final blanks) => BlankAnswer({
          for (final b in blanks) b.id: b.answer.displayAnswer,
        }),
      DragDropBody(:final slots) => DragDropAnswer({
          for (final s in slots) s.id: s.accept.first,
        }),
      MatchingBody(:final pairs) => MatchingAnswer(pairs),
    };

void main() {
  final catalog = loadCatalogFromDisk();
  final skills = catalog.skills.map((s) => s.id).toSet();

  test('catalog hợp lệ và mọi bài học trong catalog đều có file', () {
    expect(validateCatalog(catalog), isEmpty);
    final srcs = [
      for (final b in catalog.books)
        for (final c in b.chapters)
          for (final l in c.lessons) l.src,
    ];
    expect(srcs, isNotEmpty);
    for (final src in srcs) {
      final lesson = Lesson.fromJson(readJson(src));
      expect(src, contains(lesson.id));
    }
  });

  for (final file in lessonFiles()) {
    group('Bài học ${file.uri.pathSegments.last}', () {
      final lesson = Lesson.fromJson(jsonDecode(file.readAsStringSync()));

      test('không có lỗi nội dung (toán, liên kết mã, kỹ năng)', () {
        final issues = validateLesson(lesson, knownSkillIds: skills);
        expect(issues, isEmpty, reason: issues.join('\n'));
      });

      test('đáp án chuẩn được chấm đúng', () {
        for (final p in lesson.problems) {
          expect(checkAnswer(p, correctAnswerOf(p)).status, CheckStatus.correct, reason: p.id);
        }
      });

      test('có đủ 4 dạng bài và lời giải từng bước', () {
        expect(lesson.problems.map((p) => p.type).toSet(), containsAll(ProblemType.values));
        expect(lesson.problems.every((p) => p.solution.steps.isNotEmpty), isTrue);
      });
    });
  }

  group('Bắt lỗi nội dung', () {
    Map<String, dynamic> raw() =>
        readJson('assets/content/lessons/kntt3.c4.nhan-2cs-1cs.json')! as Map<String, dynamic>;

    List<ContentIssue> issuesOf(Map<String, dynamic> json) =>
        validateLesson(Lesson.fromJson(json), knownSkillIds: skills);

    test('kết quả đặt tính sai', () {
      final j = raw();
      final step = (j['problems'][0]['solution']['steps'][0]) as Map<String, dynamic>;
      step['result'] = '64';
      expect(issuesOf(j).join(), contains('21 × 3 = 63, không phải 64'));
    });

    test('lượt tính sai số nhớ', () {
      final j = raw();
      final step = j['problems'][2]['solution']['steps'][0]['digitSteps'][0] as Map<String, dynamic>;
      step['carry'] = 2; // 5 × 6 = 30 → nhớ 3, không phải 2
      expect(issuesOf(j).join(), contains('nhớ 3'));
    });

    test('phép tính trong Bài giải sai', () {
      final j = raw();
      j['problems'][4]['solution']['steps'][0]['lines'][0]['equation'] = '24 × 3 = 62 (cái)';
      expect(issuesOf(j), isNotEmpty);
    });

    test('đáp án trắc nghiệm trỏ tới lựa chọn không tồn tại', () {
      final j = raw();
      j['problems'][1]['correctChoiceIds'] = ['z'];
      expect(issuesOf(j).join(), contains('không có lựa chọn "z"'));
    });

    test('ô trống trong mẫu không khớp', () {
      final j = raw();
      j['problems'][0]['template'] = '21 × 3 = {{b2}}';
      expect(issuesOf(j), isNotEmpty);
    });

    test('kỹ năng chưa khai báo', () {
      final j = raw();
      j['problems'][0]['skillIds'] = ['khong_ton_tai'];
      expect(issuesOf(j).join(), contains('chưa khai báo'));
    });

    test('phép chia đặt tính sai lượt', () {
      final j = readJson('assets/content/lessons/kntt3.c4.chia-2cs-1cs.json')! as Map<String, dynamic>;
      j['problems'][2]['solution']['steps'][0]['digitSteps'][1]['partialDividend'] = 22;
      final issues = validateLesson(Lesson.fromJson(j), knownSkillIds: skills);
      expect(issues.join(), contains('phải là 32'));
    });

    test('schema major khác bị từ chối, thiếu trường báo đúng đường dẫn', () {
      final j = raw()..['schemaVersion'] = '2.0.0';
      expect(() => Lesson.fromJson(j), throwsA(isA<ContentFormatException>()));
      final k = raw();
      (k['problems'][3]['blanks'][0]['answer'] as Map).remove('value');
      expect(
        () => Lesson.fromJson(k),
        throwsA(predicate((e) => e.toString().contains(r'$.problems[3].blanks[0].answer.value'))),
      );
    });

    test('câu lệnh quá dài bị từ chối', () {
      final j = raw();
      j['problems'][0]['instruction'] = 'Con hãy đọc thật kỹ đề bài rồi tính kết quả ra nhé';
      expect(() => Lesson.fromJson(j), throwsA(isA<ContentFormatException>()));
    });
  });

  test('checkColumnArithmetic: phép cộng 3 số và phép trừ có nhớ', () {
    const add = ColumnArithmeticBlock(
      operation: ColumnOperation.add,
      operands: ['56', '78'],
      result: '134',
      digitSteps: [
        DigitStep(place: 0, text: '', write: '4', carry: 1),
        DigitStep(place: 1, text: '', write: '13'),
      ],
    );
    expect(checkColumnArithmetic(add), isEmpty);
    const sub = ColumnArithmeticBlock(
      operation: ColumnOperation.subtract,
      operands: ['532', '178'],
      result: '354',
      digitSteps: [
        DigitStep(place: 0, text: '', write: '4', carry: 1),
        DigitStep(place: 1, text: '', write: '5', carry: 1),
        DigitStep(place: 2, text: '', write: '3'),
      ],
    );
    expect(checkColumnArithmetic(sub), isEmpty);
  });
}
