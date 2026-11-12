/// Nhiệm vụ hằng ngày: 3 nhiệm vụ nhỏ, mỗi cái thưởng vàng; xong cả 3 thì mở rương báu.
library;

class MissionDef {
  const MissionDef({required this.id, required this.title, required this.goal, required this.coins});

  final String id;
  final String title;
  final int goal;
  final int coins;
}

abstract final class Missions {
  static const lessons = MissionDef(id: 'lessons', title: 'Học xong 2 bài luyện tập', goal: 2, coins: 10);
  static const correct = MissionDef(id: 'correct', title: 'Trả lời đúng 15 câu', goal: 15, coins: 10);
  static const threeStars = MissionDef(id: 'stars', title: 'Đạt 3 sao ở một bài', goal: 1, coins: 15);
  static const all = [lessons, correct, threeStars];

  static const chestCoins = 50;
  static const chestShards = 2;
}

/// Tiến độ nhiệm vụ của MỘT ngày (sang ngày mới thì làm lại từ đầu).
class DailyMissions {
  DailyMissions({required this.day, Map<String, int>? counts, Set<String>? claimed, this.chestOpened = false})
    : counts = counts ?? {},
      claimed = claimed ?? {};

  factory DailyMissions.fromJson(Map<String, dynamic> j) => DailyMissions(
    day: j['day'] as String,
    counts: {for (final e in (j['counts'] as Map? ?? const {}).entries) e.key as String: (e.value as num).toInt()},
    claimed: {...(j['claimed'] as List? ?? const []).cast<String>()},
    chestOpened: j['chest'] == true,
  );

  final String day;
  final Map<String, int> counts;
  final Set<String> claimed;
  bool chestOpened;

  Map<String, dynamic> toJson() => {
    'day': day,
    'counts': counts,
    'claimed': [...claimed],
    'chest': chestOpened,
  };

  int progressOf(MissionDef m) => (counts[m.id] ?? 0).clamp(0, m.goal);
  bool isDone(MissionDef m) => progressOf(m) >= m.goal;
  bool isClaimed(MissionDef m) => claimed.contains(m.id);
  int get claimable => Missions.all.where((m) => isDone(m) && !isClaimed(m)).length;
  bool get chestReady => !chestOpened && Missions.all.every(isClaimed);

  /// Ghi nhận một lượt luyện tập (hoặc thi: [isLesson] = false).
  void record({required int correct, int stars = 0, bool isLesson = true}) {
    void add(String id, int n) => counts[id] = (counts[id] ?? 0) + n;
    if (isLesson) add(Missions.lessons.id, 1);
    add(Missions.correct.id, correct);
    if (stars >= 3) add(Missions.threeStars.id, 1);
  }

  /// Nhận thưởng một nhiệm vụ; trả về số vàng (0 nếu chưa xong / đã nhận).
  int claim(String id) {
    final m = Missions.all.where((m) => m.id == id).firstOrNull;
    if (m == null || !isDone(m) || isClaimed(m)) return 0;
    claimed.add(id);
    return m.coins;
  }
}
