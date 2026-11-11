import 'dart:convert';

import 'package:flutter_test/flutter_test.dart';
import 'package:toan_lop_3/logic/answer_checker.dart';
import 'package:toan_lop_3/logic/content_validator.dart';
import 'package:toan_lop_3/logic/exam_session.dart';
import 'package:toan_lop_3/models/exam.dart';
import 'package:toan_lop_3/models/problem.dart';

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
    final exam = loadExamFromDisk('kntt3.c4.de-1');
    ExamItem item(String suffix) => exam.items.firstWhere((i) => i.problem.id.endsWith(suffix));

    test('trắc nghiệm: đúng/sai cả câu', () {
      expect(gradeExamItem(item('q01'), const ChoiceAnswer({'b'})).$2, 1);
      expect(gradeExamItem(item('q01'), const ChoiceAnswer({'a'})).$2, 0);
    });

    test('điền 2 ô, đúng 1 ô → nửa số điểm', () {
      expect(gradeExamItem(item('q06'), const BlankAnswer({'b1': '87', 'b2': '13'})).$2, 0.5);
      expect(gradeExamItem(item('q06'), const BlankAnswer({'b1': '87'})).$2, 0.5);
    });

    test('nối 4 cặp, đúng 3 → 0,75 điểm; kéo thả đúng 1/3 → làm tròn xuống 0,25', () {
      const pairs = MatchingAnswer({'l1': 'r3', 'l2': 'r1', 'l3': 'r5', 'l4': 'r4'});
      expect(gradeExamItem(item('q08'), pairs).$2, 0.75);
      const drops = DragDropAnswer({'s1': 't2', 's2': 't3', 's3': 't1'});
      expect(gradeExamItem(item('q07'), drops).$2, 0.25);
    });

    test('điểm làm tròn: 8,5 → 9; báo kỹ năng yếu', () {
      final s = ExamSession(exam);
      for (var i = 0; i < exam.items.length; i++) {
        final p = exam.items[i].problem;
        if (p.id.endsWith('q02')) continue; // bỏ trắng câu chia (1 điểm)
        if (p.id.endsWith('q06')) {
          s.setAnswer(i, const BlankAnswer({'b1': '87', 'b2': '13'})); // 0,5 điểm
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
    final exam = loadExamFromDisk('kntt3.c4.de-1');
    final s = ExamSession(exam);
    expect(s.remainingSeconds, 30 * 60);
    expect(s.tick(60), isFalse);
    expect(s.remainingSeconds, 29 * 60);
    expect(formatClock(s.remainingSeconds), '29:00');
    expect(s.tick(29 * 60), isTrue);
    expect(s.isSubmitted, isTrue);
    expect(s.result!.timedOut, isTrue);
    s.setAnswer(0, const ChoiceAnswer({'b'}));
    expect(s.answerOf(0), isNull);
  });

  test('đếm câu đã làm (bỏ qua câu làm dở)', () {
    final exam = loadExamFromDisk('kntt3.c4.de-1');
    final s = ExamSession(exam);
    final q6 = exam.items.indexWhere((i) => i.problem.id.endsWith('q06'));
    s.setAnswer(0, const ChoiceAnswer({'b'}));
    s.setAnswer(q6, const BlankAnswer({'b1': '87'}));
    expect(s.answeredCount, 1);
    expect(exam.items[q6].problem.body, isA<FillBlankBody>());
  });

  test('đề sai tổng điểm bị phát hiện', () {
    final j = readJson('assets/content/exams/kntt3.c4.de-1.json')! as Map<String, dynamic>;
    j['sections'][0]['items'][0]['points'] = 2;
    expect(validateExam(Exam.fromJson(j), knownSkillIds: skills).join(), contains('tổng điểm phải là 10'));
  });
}
