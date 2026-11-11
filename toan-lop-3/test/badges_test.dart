import 'package:flutter_test/flutter_test.dart';
import 'package:toan_lop_3/app_state.dart';
import 'package:toan_lop_3/logic/answer_checker.dart';
import 'package:toan_lop_3/logic/badges.dart';
import 'package:toan_lop_3/logic/exam_session.dart';
import 'package:toan_lop_3/logic/quiz_session.dart';
import 'package:toan_lop_3/models/progress.dart';
import 'package:toan_lop_3/services/content_repository.dart';
import 'package:toan_lop_3/services/kv_store.dart';

import 'content_test.dart' show correctAnswerOf;
import 'helpers.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  final lesson = loadLessonFromDisk('kntt3.c4.nhan-2cs-1cs');
  final division = loadLessonFromDisk('kntt3.c4.chia-2cs-1cs');
  final exam = loadExamFromDisk('kntt3.c4.de-1');

  QuizSession perfect(lessonX) {
    final s = QuizSession(lesson: lessonX, isVip: false);
    while (!s.isFinished) {
      s.submit(correctAnswerOf(s.current));
      s.next();
    }
    return s;
  }

  test('huy hiệu: bài đầu tiên, 3 sao, xong chủ đề, 100 điểm, thi thử, điểm 10', () async {
    var now = DateTime(2026, 11, 9, 8);
    final app = AppState(content: ContentRepository(), store: MemoryStore(), clock: () => now);
    await app.init();

    final r1 = await app.recordQuiz(perfect(lesson));
    expect(r1.newBadgeIds, containsAll(['first_lesson', 'three_stars', 'points_100']));
    expect(r1.newBadgeIds, isNot(contains('chapter_done')));

    final r2 = await app.recordQuiz(perfect(division));
    expect(r2.newBadgeIds, contains('chapter_done'));
    expect(r2.newBadgeIds, isNot(contains('first_lesson')), reason: 'không trao lại');

    final s = ExamSession(exam);
    for (var i = 0; i < exam.items.length; i++) {
      s.setAnswer(i, correctAnswerOf(exam.items[i].problem));
    }
    final r3 = await app.recordExam(s.submit());
    expect(r3.pointsEarned, 50);
    expect(r3.newBadgeIds, containsAll(['first_exam', 'exam_9', 'exam_10']));
    expect(app.progress.badges.length, greaterThanOrEqualTo(7));
  });

  test('huy hiệu chuỗi ngày', () {
    final p = Progress(activeDays: {for (var d = 1; d <= 7; d++) '2026-11-0$d'});
    final got = awardBadges(BadgeContext(progress: p, catalog: loadCatalogFromDisk(), now: DateTime(2026, 11, 7)));
    expect(got, containsAll(['streak_3', 'streak_7']));
    expect(badgeById('streak_7')!.title, 'Một tuần bền bỉ');
  });

  test('điểm thưởng thi lại: chỉ phần vượt kỷ lục + 2', () async {
    final app = AppState(content: ContentRepository(), store: MemoryStore());
    await app.init();
    final empty = ExamSession(exam).submit();
    expect((await app.recordExam(empty)).pointsEarned, 0);
    final s = ExamSession(exam)..setAnswer(0, const ChoiceAnswer({'b'}));
    final r = await app.recordExam(s.submit());
    expect(r.pointsEarned, 5 + 2);
    expect(app.bestExamScore(exam.id), 1);
  });
}
