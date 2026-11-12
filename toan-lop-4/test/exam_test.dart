import 'dart:convert';

import 'package:flutter_test/flutter_test.dart';
import 'package:toan_lop_4/logic/answer_checker.dart';
import 'package:toan_lop_4/logic/content_validator.dart';
import 'package:toan_lop_4/logic/exam_session.dart';
import 'package:toan_lop_4/models/exam.dart';
import 'package:toan_lop_4/models/problem.dart';

import 'content_test.dart' show correctAnswerOf;
import 'helpers.dart';

void main() {
  final skills = loadCatalogFromDisk().skills.map((s) => s.id).toSet();

  for (final file in examFiles()) {
    group('Đề ${file.uri.pathSegments.last}', () {
      final exam = Exam.fromJson(jsonDecode(file.readAsStringSync()));

      test('không có lỗi nội dung, tổng điểm = 10', () {
        final issues = validateExam(exam, knownSkillIds: skills);
        expect(issues, isEmpty, reason: issues.join('\n'));
        expect(exam.totalPoints, 10);
      });

      test('làm đúng hết được 10 điểm, bỏ trắng được 0 điểm', () {
        final full = ExamSession(exam);
        for (var i = 0; i < exam.items.length; i++) {
          full.setAnswer(i, correctAnswerOf(exam.items[i].problem));
        }
        final r = full.submit();
        expect(r.rawScore, 10);
        expect(r.roundedScore, 10);
        expect(r.weakSkills(), isEmpty);

        final empty = ExamSession(exam).submit();
        expect(empty.rawScore, 0);
        expect(empty.weakSkills(), isNotEmpty);
      });
    });
  }

  test('catalog liệt kê đúng các đề', () {
    final refs = loadCatalogFromDisk().books.expand((b) => b.exams).toList();
    expect(refs.map((e) => e.id), containsAll(examFiles().map((f) => f.uri.pathSegments.last.replaceAll('.json', ''))));
    for (final r in refs) {
      final exam = Exam.fromJson(readJson(r.src));
      expect(exam.durationMinutes, r.durationMinutes);
      expect(exam.access, r.access);
    }
  });

  group('Chấm điểm từng phần', () {
    // Kiểm tra chủ đề 1: q01 trắc nghiệm (đáp án a), q02 nối 4 cặp, q07 điền 2 ô (30.116; 30.115), q08 kéo thả 3 ô.
    final exam = loadExamFromDisk('kntt4.gen.chu-de-01');
    ExamItem item(String suffix) => exam.items.firstWhere((i) => i.problem.id.endsWith(suffix));

    test('trắc nghiệm: đúng/sai cả câu', () {
      expect(gradeExamItem(item('q01'), const ChoiceAnswer({'a'})).$2, 1);
      expect(gradeExamItem(item('q01'), const ChoiceAnswer({'b'})).$2, 0);
    });

    test('điền 2 ô, đúng 1 ô → nửa số điểm', () {
      expect(gradeExamItem(item('q07'), const BlankAnswer({'b1': '30116', 'b2': '30113'})).$2, 0.5);
      expect(gradeExamItem(item('q07'), const BlankAnswer({'b1': '30116'})).$2, 0.5);
      expect(gradeExamItem(item('q07'), const BlankAnswer({'b1': '30.116', 'b2': '30.115'})).$2, 1);
    });

    test('nối 4 cặp, đúng 3 → 0,75 điểm; kéo thả đúng 1/3 → làm tròn xuống 0,25', () {
      const pairs = MatchingAnswer({'l1': 'r4', 'l2': 'r2', 'l3': 'r1', 'l4': 'r3'});
      expect(gradeExamItem(item('q02'), pairs).$2, 0.75);
      const drops = DragDropAnswer({'s1': 't1', 's2': 't2', 's3': 't3'});
      expect(gradeExamItem(item('q08'), drops).$2, 0.25);
    });

    test('điểm làm tròn: 8,5 → 9; báo kỹ năng yếu', () {
      final s = ExamSession(exam);
      for (var i = 0; i < exam.items.length; i++) {
        final p = exam.items[i].problem;
        if (p.id.endsWith('q01')) continue; // bỏ trắng câu trắc nghiệm (1 điểm)
        if (p.id.endsWith('q07')) {
          s.setAnswer(i, const BlankAnswer({'b1': '30116', 'b2': '30113'})); // 0,5 điểm
          continue;
        }
        s.setAnswer(i, correctAnswerOf(p));
      }
      final r = s.submit();
      expect(r.rawScore, 8.5);
      expect(r.roundedScore, 9);
      expect(r.correctCount, 8);
    });
  });

  test('đồng hồ: hết giờ tự nộp, không nhận thêm câu trả lời', () {
    final exam = loadExamFromDisk('kntt4.gen.chu-de-01');
    final s = ExamSession(exam);
    expect(s.remainingSeconds, 35 * 60);
    expect(s.tick(60), isFalse);
    expect(s.remainingSeconds, 34 * 60);
    expect(formatClock(s.remainingSeconds), '34:00');
    expect(s.tick(34 * 60), isTrue);
    expect(s.isSubmitted, isTrue);
    expect(s.result!.timedOut, isTrue);
    s.setAnswer(0, const ChoiceAnswer({'a'}));
    expect(s.answerOf(0), isNull);
  });

  test('đếm câu đã làm (bỏ qua câu làm dở)', () {
    final exam = loadExamFromDisk('kntt4.gen.chu-de-01');
    final s = ExamSession(exam);
    final q6 = exam.items.indexWhere((i) => i.problem.id.endsWith('q07'));
    s.setAnswer(0, const ChoiceAnswer({'a'}));
    s.setAnswer(q6, const BlankAnswer({'b1': '30116'}));
    expect(s.answeredCount, 1);
    expect(exam.items[q6].problem.body, isA<FillBlankBody>());
  });

  test('đề sai tổng điểm bị phát hiện', () {
    final j = readJson('assets/content/exams/kntt4.gen.chu-de-01.json')! as Map<String, dynamic>;
    j['sections'][0]['items'][0]['points'] = 2;
    expect(validateExam(Exam.fromJson(j), knownSkillIds: skills).join(), contains('tổng điểm phải là 10'));
  });
}
