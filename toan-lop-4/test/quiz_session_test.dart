import 'dart:math';

import 'package:flutter_test/flutter_test.dart';
import 'package:toan_lop_4/logic/answer_checker.dart';
import 'package:toan_lop_4/logic/quiz_session.dart';
import 'package:toan_lop_4/models/content.dart';

import 'helpers.dart';

void main() {
  // p01: 40.140 × 2 = 80.280; p02: 16.387 × 6 = 98.322; p09 có lời giải VIP.
  final lesson = loadLessonFromDisk('kntt4.c8.nhan-voi-so-co-mot-chu-so');
  // Nội dung lớp 4 hiện chưa có câu VIP → lấy bài chia thật, đánh dấu câu cuối là VIP.
  final divisionJson = readJson('assets/content/lessons/kntt4.c8.chia-cho-so-co-mot-chu-so.json')! as Map<String, dynamic>;
  ((divisionJson['problems'] as List).last as Map<String, dynamic>)['access'] = 'vip';
  final division = Lesson.fromJson(divisionJson);

  test('đúng lần đầu được 10 điểm', () {
    final s = QuizSession(lesson: lesson, isVip: false, random: Random(1));
    expect(s.submit(const BlankAnswer({'b1': '80280'})).isCorrect, isTrue);
    expect(s.phase, QuestionPhase.correct);
    expect(s.currentResult.points, 10);
    s.next();
    expect(s.index, 1);
  });

  test('chưa làm xong thì không mất lượt', () {
    final s = QuizSession(lesson: lesson, isVip: false);
    s.submit(const BlankAnswer({}));
    expect(s.phase, QuestionPhase.answering);
    expect(s.currentResult.attempts, 0);
    expect(s.message, isNotNull);
  });

  test('sai → thử lại → đúng được 5 điểm; sai 2 lần → hiện đáp án', () {
    final s = QuizSession(lesson: lesson, isVip: false);
    s.submit(const BlankAnswer({'b1': '80820'}));
    expect(s.phase, QuestionPhase.incorrect);
    s.next(); // chưa được sang bài
    expect(s.index, 0);
    s.retry();
    s.submit(const BlankAnswer({'b1': '80280'}));
    expect(s.currentResult.points, 5);
    s.next();
    s.submit(const BlankAnswer({'b1': '98222'}));
    s.retry();
    s.submit(const BlankAnswer({'b1': '98332'}));
    expect(s.phase, QuestionPhase.revealed);
    expect(s.currentResult.correct, isFalse);
  });

  test('xem lời giải trước khi trả lời → không có điểm, được sang bài', () {
    final s = QuizSession(lesson: lesson, isVip: false);
    s.revealSolution();
    expect(s.phase, QuestionPhase.revealed);
    s.next();
    expect(s.index, 1);
    expect(s.results.first.points, 0);
    expect(s.results.first.viewedSolution, isTrue);
  });

  test('bài VIP bị ẩn với tài khoản miễn phí; lời giải VIP bị khoá', () {
    final free = QuizSession(lesson: division, isVip: false);
    final vip = QuizSession(lesson: division, isVip: true);
    expect(free.problems.length, division.problems.length - 1);
    expect(free.lockedVipCount, 1);
    expect(vip.problems.length, division.problems.length);
    final p10 = lesson.problems.last;
    expect(QuizSession(lesson: lesson, isVip: false).solutionLocked(p10), isTrue);
    expect(QuizSession(lesson: lesson, isVip: true).solutionLocked(p10), isFalse);
  });

  test('làm hết bài: sao, điểm, kỹ năng yếu', () {
    final s = QuizSession(lesson: lesson, isVip: false);
    while (!s.isFinished) {
      s.revealSolution(); // không làm được bài nào
      s.next();
    }
    expect(s.totalPoints, 0);
    expect(s.stars, 0);
    expect(s.weakSkills().map((w) => w.skillId), contains('nhan.1cs'));
  });
}
