import 'package:flutter_test/flutter_test.dart';
import 'package:toan_lop_3/logic/answer_checker.dart';
import 'package:toan_lop_3/logic/exam_session.dart';
import 'package:toan_lop_3/logic/report_card.dart';
import 'package:toan_lop_3/models/exam.dart';

import 'content_test.dart' show correctAnswerOf;
import 'helpers.dart';

ReportTopic topic(String name, int correct, int total) => ReportTopic(name)
  ..correct = correct
  ..total = total;

void main() {
  final catalog = loadCatalogFromDisk();

  group('Lời nhận xét', () {
    test('vừa có phần tốt vừa có phần cần ôn (đúng mẫu yêu cầu)', () {
      final msg = buildFeedback(
        [topic('phép nhân', 0, 3), topic('phép cộng, phép trừ', 3, 3)],
        allCorrect: false,
      );
      expect(msg, 'Con đang làm rất tốt phép cộng, phép trừ, nhưng cần ôn lại phép nhân nhé.');
    });

    test('chỉ có phần cần ôn / đúng hết / ghép "và"', () {
      expect(buildFeedback([topic('phép chia', 0, 2)], allCorrect: false), startsWith('Con cần ôn lại phép chia nhé.'));
      expect(buildFeedback([topic('phép chia', 2, 2)], allCorrect: true), startsWith('Con làm đúng hết'));
      expect(joinVi(['a', 'b', 'c']), 'a, b và c');
      expect(joinVi(['a', 'b']), 'a và b');
    });
  });

  test('bảng điểm đề giữa kì: gộp kỹ năng theo tên cho bé, gợi ý bài ôn', () {
    final exam = loadExamFromDisk('kntt3.giua-hk1.de-1');
    final s = ExamSession(exam);
    // Làm đúng mọi câu trừ phần cộng/trừ (câu 5, 6, 7, 10)
    for (var i = 0; i < exam.items.length; i++) {
      final p = exam.items[i].problem;
      if (const ['q05', 'q06', 'q07', 'q10'].any(p.id.endsWith)) continue;
      s.setAnswer(i, correctAnswerOf(p));
    }
    final card = ReportCard.build(s.submit(), catalog, previousScore: 4);
    final names = card.topics.map((t) => t.name).toList();
    expect(names, contains('phép cộng, phép trừ'));
    expect(names.toSet().length, names.length, reason: 'không trùng phần');
    expect(card.weakTopics.first.name, 'phép cộng, phép trừ');
    expect(card.message, contains('cần ôn lại phép cộng, phép trừ'));
    expect(card.message, contains('Con đang làm rất tốt'));
    expect(card.result.roundedScore, 6);
    expect(card.scoreChange, 2);
  });

  test('gợi ý "ôn ngay" trỏ đúng bài học có kỹ năng yếu', () {
    final exam = loadExamFromDisk('kntt3.c4.de-1');
    final card = ReportCard.build(ExamSession(exam).submit(), catalog);
    expect(card.suggestedLessons.map((l) => l.id), contains('kntt3.c4.nhan-2cs-1cs'));
    expect(card.suggestedLessons.length, lessThanOrEqualTo(3));
  });

  test('mỗi loại đề có đủ đề mẫu và đúng thời gian', () {
    final refs = catalog.books.first.exams;
    final types = refs.map((e) => e.examType).toSet();
    expect(types, containsAll([ExamType.kt15p, ExamType.kt1Tiet, ExamType.giuaHk1, ExamType.cuoiHk1]));
    expect(refs.firstWhere((e) => e.examType == ExamType.kt15p).durationMinutes, 15);
  });

  test('lưu bài làm dở rồi làm tiếp: giữ câu trả lời, giờ đã dùng, câu đang làm', () {
    final exam = loadExamFromDisk('kntt3.c4.kt15-nhan');
    final s = ExamSession(exam)
      ..setAnswer(0, const ChoiceAnswer({'b'}))
      ..setAnswer(1, const BlankAnswer({'b1': '81'}))
      ..setAnswer(3, const MatchingAnswer({'l1': 'r2'}))
      ..goTo(3)
      ..tick(125);
    final json = s.toDraft().toJson();
    final back = ExamSession.resume(exam, ExamDraft.fromJson(json));
    expect(back.current, 3);
    expect(back.elapsedSeconds, 125);
    expect((back.answerOf(1)! as BlankAnswer).values, {'b1': '81'});
    expect((back.answerOf(3)! as MatchingAnswer).pairs, {'l1': 'r2'});
    expect(back.answeredCount, 2);
    // Đề đã sửa (contentRev khác) → bỏ bài dở cũ
    final stale = ExamDraft.fromJson({...json, 'contentRev': 99});
    expect(ExamSession.resume(exam, stale).answeredCount, 0);
  });

  test('câu trả lời lưu ra JSON rồi đọc lại', () {
    for (final a in const <UserAnswer>[
      ChoiceAnswer({'a', 'c'}),
      BlankAnswer({'b1': '12', 'b2': ''}),
      DragDropAnswer({'s1': 't1', 's2': null}),
      MatchingAnswer({'l1': 'r1'}),
    ]) {
      expect(UserAnswer.fromJson(a.toJson())!.toJson(), a.toJson());
    }
    expect(UserAnswer.fromJson({'t': 'la'}), isNull);
    expect(UserAnswer.fromJson('rác'), isNull);
  });

  test('đề 15 phút sai thời gian bị phát hiện', () {
    final j = readJson('assets/content/exams/kntt3.c4.kt15-nhan.json')! as Map<String, dynamic>;
    j['durationMinutes'] = 20;
    expect(Exam.fromJson(j).examType.durationRange, (15, 15));
  });
}
