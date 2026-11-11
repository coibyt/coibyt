import 'dart:math';

import 'package:flutter_test/flutter_test.dart';
import 'package:toan_lop_3/logic/answer_checker.dart';
import 'package:toan_lop_3/logic/quiz_session.dart';

import 'helpers.dart';

void main() {
  final lesson = loadLessonFromDisk('kntt3.c4.nhan-2cs-1cs');
  final division = loadLessonFromDisk('kntt3.c4.chia-2cs-1cs');

  test('đúng lần đầu được 10 điểm', () {
    final s = QuizSession(lesson: lesson, isVip: false, random: Random(1));
    expect(s.submit(const BlankAnswer({'b1': '63'})).isCorrect, isTrue);
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
    s.submit(const BlankAnswer({'b1': '36'}));
    expect(s.phase, QuestionPhase.incorrect);
    s.next(); // chưa được sang bài
    expect(s.index, 0);
    s.retry();
    s.submit(const BlankAnswer({'b1': '63'}));
    expect(s.currentResult.points, 5);
    s.next();
    s.submit(const ChoiceAnswer({'a'}));
    s.retry();
    s.submit(const ChoiceAnswer({'c'}));
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
    expect(s.weakSkills().map((w) => w.skillId), contains('nhan.2cs_1cs.co_nho'));
  });
}
