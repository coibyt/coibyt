import 'package:flutter_test/flutter_test.dart';
import 'package:toan_lop_3/models/progress.dart';

void main() {
  test('gộp tiến độ hai máy theo đúng quy tắc', () {
    final phone = Progress(
      childName: 'Na',
      bookId: 'kntt3',
      totalPoints: 120,
      lessons: {'a': LessonProgress(bestStars: 3, bestPoints: 90, plays: 2, lastPlayed: DateTime.utc(2026, 11, 1))},
      skills: {'s1': SkillProgress(correct: 5, total: 8)},
      activeDays: {'2026-11-01'},
      exams: [
        ExamRecord(examId: 'e', score: 8, correct: 8, total: 10, usedSeconds: 600, at: DateTime.utc(2026, 11, 1)),
      ],
      badges: {'first_lesson': DateTime.utc(2026, 11, 1)},
      updatedAt: DateTime.utc(2026, 11, 1, 10),
    );
    final tablet = Progress(
      childName: 'Bé Na',
      bookId: 'kntt3',
      totalPoints: 80,
      lessons: {
        'a': LessonProgress(bestStars: 2, bestPoints: 95, plays: 5, lastPlayed: DateTime.utc(2026, 11, 2)),
        'b': LessonProgress(bestStars: 1, bestPoints: 10, plays: 1),
      },
      skills: {'s1': SkillProgress(correct: 9, total: 12), 's2': SkillProgress(correct: 1, total: 2)},
      activeDays: {'2026-11-02'},
      exams: [
        ExamRecord(examId: 'e', score: 8, correct: 8, total: 10, usedSeconds: 600, at: DateTime.utc(2026, 11, 1)),
        ExamRecord(examId: 'e', score: 10, correct: 10, total: 10, usedSeconds: 500, at: DateTime.utc(2026, 11, 2)),
      ],
      badges: {'first_lesson': DateTime.utc(2026, 10, 30), 'exam_10': DateTime.utc(2026, 11, 2)},
      updatedAt: DateTime.utc(2026, 11, 2, 9),
    );
    for (final m in [Progress.merge(phone, tablet), Progress.merge(tablet, phone)]) {
      expect(m.childName, 'Bé Na'); // máy cập nhật sau
      expect(m.totalPoints, 120);
      expect(m.lessons['a']!.bestStars, 3);
      expect(m.lessons['a']!.bestPoints, 95);
      expect(m.lessons['a']!.plays, 5);
      expect(m.lessons['a']!.lastPlayed, DateTime.utc(2026, 11, 2));
      expect(m.lessons.containsKey('b'), isTrue);
      expect(m.skills['s1']!.total, 12);
      expect(m.skills['s2']!.total, 2);
      expect(m.activeDays, {'2026-11-01', '2026-11-02'});
      expect(m.exams, hasLength(2));
      expect(m.badges['first_lesson'], DateTime.utc(2026, 10, 30));
      expect(m.badges.keys, containsAll(['first_lesson', 'exam_10']));
      expect(m.updatedAt, DateTime.utc(2026, 11, 2, 9));
    }
  });

  test('JSON đi rồi về giữ nguyên', () {
    final p = Progress(
      childName: 'An',
      totalPoints: 5,
      activeDays: {'2026-11-11'},
      badges: {'x': DateTime.utc(2026, 11, 11)},
      updatedAt: DateTime.utc(2026, 11, 11),
    );
    final back = Progress.fromJson(p.toJson());
    expect(back.toJson(), p.toJson());
    expect(p.toJson()['v'], 1);
  });
}
