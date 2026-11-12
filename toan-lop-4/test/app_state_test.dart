import 'package:flutter_test/flutter_test.dart';
import 'package:toan_lop_4/app_state.dart';
import 'package:toan_lop_4/logic/answer_checker.dart';
import 'package:toan_lop_4/logic/quiz_session.dart';
import 'package:toan_lop_4/models/progress.dart';
import 'package:toan_lop_4/services/content_repository.dart';
import 'package:toan_lop_4/services/kv_store.dart';

import 'helpers.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  final lesson = loadLessonFromDisk('kntt4.c8.nhan-voi-so-co-mot-chu-so');

  Future<AppState> newState(MemoryStore store, DateTime Function() clock) async {
    final s = AppState(content: ContentRepository(), store: store, clock: clock);
    await s.init();
    return s;
  }

  QuizSession play({required int correctFirstTry}) {
    final s = QuizSession(lesson: lesson, isVip: false);
    var i = 0;
    while (!s.isFinished) {
      if (i < correctFirstTry) {
        // bài 1, 2 là điền số (80.280; 98.322); các bài khác dùng "xem lời giải" (0 điểm)
        if (i == 0) {
          s.submit(const BlankAnswer({'b1': '80280'}));
        } else {
          s.submit(const BlankAnswer({'b1': '98322'}));
        }
      } else {
        s.revealSolution();
      }
      s.next();
      i++;
    }
    return s;
  }

  test('điểm: lần đầu đủ điểm, làm lại chỉ thưởng phần vượt + 1 điểm/câu đúng', () async {
    final store = MemoryStore();
    var now = DateTime(2026, 11, 9, 8);
    final app = await newState(store, () => now);

    final first = await app.recordQuiz(play(correctFirstTry: 2)); // 20 điểm
    expect(first.pointsEarned, 20);
    expect(app.progress.totalPoints, 20);
    expect(app.lessonProgress(lesson.id)!.bestStars, 1);

    final again = await app.recordQuiz(play(correctFirstTry: 1)); // 10 điểm, không vượt
    expect(again.pointsEarned, 1);
    expect(app.progress.totalPoints, 21);
    expect(app.lessonProgress(lesson.id)!.plays, 2);
    expect(app.lessonProgress(lesson.id)!.bestPoints, 20);

    // Lưu và mở lại
    final reopened = await newState(store, () => now);
    expect(reopened.progress.totalPoints, 21);
    expect(reopened.progress.skills['nhan.1cs']!.total, greaterThan(0));
  });

  test('chuỗi ngày học', () async {
    final store = MemoryStore();
    var now = DateTime(2026, 11, 9, 8);
    final app = await newState(store, () => now);
    await app.recordQuiz(play(correctFirstTry: 0));
    now = DateTime(2026, 11, 10, 20);
    await app.recordQuiz(play(correctFirstTry: 0));
    expect(app.streak, 2);
    now = DateTime(2026, 11, 11, 7); // hôm nay chưa học → vẫn giữ chuỗi
    expect(app.streak, 2);
    now = DateTime(2026, 11, 13, 7); // nghỉ 2 ngày → mất chuỗi
    expect(app.streak, 0);
    expect(app.progress.bestStreak, 2);
  });

  test('chuỗi ngày qua ranh giới tháng', () {
    final p = Progress(activeDays: {'2026-10-31', '2026-11-01', '2026-11-02'});
    expect(p.streak(DateTime(2026, 11, 2, 12)), 3);
    expect(p.bestStreak, 3);
  });

  test('kỹ năng yếu & VIP thử', () async {
    final store = MemoryStore();
    final app = await newState(store, DateTime.now);
    await app.recordQuiz(play(correctFirstTry: 0));
    expect(app.weakSkills().map((w) => w.$1.id), contains('nhan.1cs'));
    expect(app.isVip, isFalse);
    await app.setVip(true);
    expect((await newState(store, DateTime.now)).isVip, isTrue);
  });
}
