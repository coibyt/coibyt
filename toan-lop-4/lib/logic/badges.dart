import '../models/content.dart';
import '../models/progress.dart';

/// Dữ liệu để xét huy hiệu.
class BadgeContext {
  const BadgeContext({required this.progress, required this.catalog, required this.now});

  final Progress progress;
  final Catalog catalog;
  final DateTime now;

  /// Số bài nâng cao (học sinh giỏi) đã có sao, và số bài được 3 sao.
  int advancedDone([int minStars = 1]) =>
      progress.lessons.entries.where((e) => isAdvancedLessonId(e.key) && e.value.bestStars >= minStars).length;

  int get lessonsPlayed => progress.lessons.values.fold(0, (s, l) => s + l.plays);
  int get bestExamScore => progress.exams.fold(0, (best, e) => e.score.round() > best ? e.score.round() : best);
}

/// Bài nâng cao (khu học sinh giỏi): mã `kntt4.nc.…` (không tính thử thách ngày `…#ngay-…`).
bool isAdvancedLessonId(String id) => id.startsWith('kntt4.nc.') && !id.contains('#');

/// Một huy hiệu (tên tự đặt, không lấy từ app khác).
class BadgeDef {
  const BadgeDef({
    required this.id,
    required this.title,
    required this.description,
    required this.emoji,
    required this.earned,
  });

  final String id;
  final String title;

  /// Cách nhận — câu ngắn cho bé.
  final String description;
  final String emoji;
  final bool Function(BadgeContext c) earned;
}

final List<BadgeDef> allBadges = [
  BadgeDef(
    id: 'first_lesson',
    title: 'Bước đầu tiên',
    description: 'Làm xong một bài luyện tập',
    emoji: '🌱',
    earned: (c) => c.lessonsPlayed >= 1,
  ),
  BadgeDef(
    id: 'three_stars',
    title: 'Ngôi sao sáng',
    description: 'Được 3 sao ở một bài',
    emoji: '⭐',
    earned: (c) => c.progress.lessons.values.any((l) => l.bestStars >= 3),
  ),
  BadgeDef(
    id: 'hard_worker',
    title: 'Ong chăm chỉ',
    description: 'Luyện tập 5 lần',
    emoji: '🐝',
    earned: (c) => c.lessonsPlayed >= 5,
  ),
  BadgeDef(
    id: 'chapter_done',
    title: 'Xong một chủ đề',
    description: 'Có sao ở mọi bài của một chủ đề',
    emoji: '📘',
    earned: (c) => c.catalog.books.any(
      (b) => b.chapters.any(
        (ch) => ch.lessons.isNotEmpty && ch.lessons.every((l) => (c.progress.lessons[l.id]?.bestStars ?? 0) >= 1),
      ),
    ),
  ),
  BadgeDef(
    id: 'streak_3',
    title: 'Ba ngày liền',
    description: 'Học 3 ngày liên tiếp',
    emoji: '🔥',
    earned: (c) => c.progress.bestStreak >= 3,
  ),
  BadgeDef(
    id: 'streak_7',
    title: 'Một tuần bền bỉ',
    description: 'Học 7 ngày liên tiếp',
    emoji: '🏅',
    earned: (c) => c.progress.bestStreak >= 7,
  ),
  BadgeDef(
    id: 'points_100',
    title: 'Trăm điểm',
    description: 'Đạt 100 điểm',
    emoji: '💯',
    earned: (c) => c.progress.totalPoints >= 100,
  ),
  BadgeDef(
    id: 'points_500',
    title: 'Kho mật ong',
    description: 'Đạt 500 điểm',
    emoji: '🍯',
    earned: (c) => c.progress.totalPoints >= 500,
  ),
  BadgeDef(
    id: 'first_exam',
    title: 'Dũng cảm thi thử',
    description: 'Làm xong một đề thi thử',
    emoji: '📝',
    earned: (c) => c.progress.exams.isNotEmpty,
  ),
  BadgeDef(
    id: 'exam_9',
    title: 'Học sinh giỏi',
    description: 'Được 9 điểm trở lên khi thi thử',
    emoji: '🎖️',
    earned: (c) => c.bestExamScore >= 9,
  ),
  BadgeDef(
    id: 'exam_10',
    title: 'Điểm 10 tròn trĩnh',
    description: 'Được 10 điểm khi thi thử',
    emoji: '🏆',
    earned: (c) => c.bestExamScore >= 10,
  ),
  BadgeDef(
    id: 'adv_first',
    title: 'Học sinh giỏi',
    description: 'Có sao ở một bài nâng cao',
    emoji: '👑',
    earned: (c) => c.advancedDone() >= 1,
  ),
  BadgeDef(
    id: 'adv_5',
    title: 'Nhà toán học nhí',
    description: 'Có sao ở 5 bài nâng cao',
    emoji: '🧠',
    earned: (c) => c.advancedDone() >= 5,
  ),
  BadgeDef(
    id: 'adv_3stars',
    title: 'Thiên tài nhỏ',
    description: 'Được 3 sao ở một bài nâng cao',
    emoji: '💎',
    earned: (c) => c.advancedDone(3) >= 1,
  ),
];

BadgeDef? badgeById(String id) {
  for (final b in allBadges) {
    if (b.id == id) return b;
  }
  return null;
}

/// Trao các huy hiệu mới đủ điều kiện; trả về mã các huy hiệu vừa nhận.
List<String> awardBadges(BadgeContext c) {
  final fresh = <String>[];
  for (final b in allBadges) {
    if (c.progress.badges.containsKey(b.id)) continue;
    if (b.earned(c)) {
      c.progress.badges[b.id] = c.now;
      fresh.add(b.id);
    }
  }
  return fresh;
}
