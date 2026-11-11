/// Tiến độ học của một bé, lưu offline dạng JSON (và đồng bộ lên server ở Phase 4).
library;

String dayKey(DateTime t) =>
    '${t.year.toString().padLeft(4, '0')}-${t.month.toString().padLeft(2, '0')}-${t.day.toString().padLeft(2, '0')}';

class LessonProgress {
  LessonProgress({this.bestStars = 0, this.bestPoints = 0, this.plays = 0, this.lastPlayed});

  factory LessonProgress.fromJson(Map<String, dynamic> j) => LessonProgress(
    bestStars: j['bestStars'] as int? ?? 0,
    bestPoints: j['bestPoints'] as int? ?? 0,
    plays: j['plays'] as int? ?? 0,
    lastPlayed: j['lastPlayed'] == null ? null : DateTime.tryParse(j['lastPlayed'] as String),
  );

  int bestStars;
  int bestPoints;
  int plays;
  DateTime? lastPlayed;

  Map<String, dynamic> toJson() => {
    'bestStars': bestStars,
    'bestPoints': bestPoints,
    'plays': plays,
    if (lastPlayed != null) 'lastPlayed': lastPlayed!.toIso8601String(),
  };
}

class SkillProgress {
  SkillProgress({this.correct = 0, this.total = 0});

  factory SkillProgress.fromJson(Map<String, dynamic> j) =>
      SkillProgress(correct: j['correct'] as int? ?? 0, total: j['total'] as int? ?? 0);

  int correct;
  int total;

  double get ratio => total == 0 ? 0 : correct / total;

  Map<String, dynamic> toJson() => {'correct': correct, 'total': total};
}

class ExamRecord {
  ExamRecord({
    required this.examId,
    required this.score,
    required this.correct,
    required this.total,
    required this.usedSeconds,
    required this.at,
    this.weakSkillIds = const [],
  });

  factory ExamRecord.fromJson(Map<String, dynamic> j) => ExamRecord(
    examId: j['examId'] as String,
    score: (j['score'] as num).toDouble(),
    correct: j['correct'] as int,
    total: j['total'] as int,
    usedSeconds: j['usedSeconds'] as int,
    at: DateTime.parse(j['at'] as String),
    weakSkillIds: [...(j['weakSkillIds'] as List? ?? const []).cast<String>()],
  );

  final String examId;

  /// Điểm thang 10.
  final double score;
  final int correct;
  final int total;
  final int usedSeconds;
  final DateTime at;
  final List<String> weakSkillIds;

  Map<String, dynamic> toJson() => {
    'examId': examId,
    'score': score,
    'correct': correct,
    'total': total,
    'usedSeconds': usedSeconds,
    'at': at.toIso8601String(),
    'weakSkillIds': weakSkillIds,
  };
}

class Progress {
  Progress({
    this.childName = 'Bé',
    this.bookId,
    this.totalPoints = 0,
    Map<String, LessonProgress>? lessons,
    Map<String, SkillProgress>? skills,
    Set<String>? activeDays,
    List<ExamRecord>? exams,
    Map<String, DateTime>? badges,
    this.updatedAt,
    this.hearts = 5,
    this.heartsAt,
    this.coins = 0,
    this.shards = 0,
    Map<String, int>? pets,
    Set<String>? outfits,
    this.outfit,
    this.companion,
    Set<String>? freezeDays,
    Map<String, int>? pointsByDay,
  }) : lessons = lessons ?? {},
       skills = skills ?? {},
       activeDays = activeDays ?? {},
       exams = exams ?? [],
       badges = badges ?? {},
       pets = pets ?? {},
       outfits = outfits ?? {},
       freezeDays = freezeDays ?? {},
       pointsByDay = pointsByDay ?? {};

  static const version = 1;

  factory Progress.fromJson(Map<String, dynamic> j) => Progress(
    childName: j['childName'] as String? ?? 'Bé',
    bookId: j['bookId'] as String?,
    totalPoints: j['totalPoints'] as int? ?? 0,
    lessons: {
      for (final e in (j['lessons'] as Map? ?? const {}).entries)
        e.key as String: LessonProgress.fromJson((e.value as Map).cast<String, dynamic>()),
    },
    skills: {
      for (final e in (j['skills'] as Map? ?? const {}).entries)
        e.key as String: SkillProgress.fromJson((e.value as Map).cast<String, dynamic>()),
    },
    activeDays: {...(j['activeDays'] as List? ?? const []).cast<String>()},
    exams: [for (final e in (j['exams'] as List? ?? const [])) ExamRecord.fromJson((e as Map).cast<String, dynamic>())],
    badges: {
      for (final e in (j['badges'] as Map? ?? const {}).entries) e.key as String: DateTime.parse(e.value as String),
    },
    updatedAt: j['updatedAt'] == null ? null : DateTime.tryParse(j['updatedAt'] as String),
    hearts: j['hearts'] as int? ?? 5,
    heartsAt: j['heartsAt'] == null ? null : DateTime.tryParse(j['heartsAt'] as String),
    coins: j['coins'] as int? ?? 0,
    shards: j['shards'] as int? ?? 0,
    pets: {for (final e in (j['pets'] as Map? ?? const {}).entries) e.key as String: (e.value as num).toInt()},
    outfits: {...(j['outfits'] as List? ?? const []).cast<String>()},
    outfit: j['outfit'] as String?,
    companion: j['companion'] as String?,
    freezeDays: {...(j['freezeDays'] as List? ?? const []).cast<String>()},
    pointsByDay: {
      for (final e in (j['pointsByDay'] as Map? ?? const {}).entries) e.key as String: (e.value as num).toInt(),
    },
  );

  String childName;
  String? bookId;
  int totalPoints;
  final Map<String, LessonProgress> lessons;
  final Map<String, SkillProgress> skills;

  /// Các ngày (yyyy-MM-dd) bé có học — để tính chuỗi ngày.
  final Set<String> activeDays;
  final List<ExamRecord> exams;

  /// Huy hiệu đã nhận: mã → thời điểm.
  final Map<String, DateTime> badges;
  DateTime? updatedAt;

  // ---- Phase 3: trò chơi hoá (chỉ kiếm bằng cách học, không bán bằng tiền thật) ----

  /// Năng lượng (0–5) cho phòng thi.
  int hearts;

  /// Mốc tính hồi tim theo thời gian.
  DateTime? heartsAt;

  /// Đồng vàng.
  int coins;

  /// Mảnh ghép (đổi lấy thú cưng tự chọn).
  int shards;

  /// Thú cưng đã có: mã → số lần nhận.
  final Map<String, int> pets;

  /// Trang phục cô Ong đã mua; [outfit] = đang mặc.
  final Set<String> outfits;
  String? outfit;

  /// Thú cưng đang đi cùng bé.
  String? companion;

  /// Ngày được "giữ lửa" (nghỉ nhưng không mất chuỗi), tối đa 1 ngày/tuần.
  final Set<String> freezeDays;

  /// Điểm kiếm được theo ngày (cho bảng xếp hạng tuần/tháng).
  final Map<String, int> pointsByDay;

  /// Chuỗi ngày học liên tiếp tính đến hôm nay (hoặc hôm qua nếu hôm nay chưa học).
  /// Ngày được giữ lửa không làm đứt chuỗi nhưng không cộng thêm.
  int streak(DateTime now) {
    bool kept(DateTime d) => activeDays.contains(dayKey(d)) || freezeDays.contains(dayKey(d));
    var day = DateTime(now.year, now.month, now.day);
    if (!kept(day)) {
      day = DateTime(day.year, day.month, day.day - 1);
      if (!kept(day)) return 0;
    }
    var count = 0;
    while (kept(day)) {
      if (activeDays.contains(dayKey(day))) count++;
      day = DateTime(day.year, day.month, day.day - 1);
    }
    return count;
  }

  /// Hôm nay đã học chưa.
  bool activeOn(DateTime now) => activeDays.contains(dayKey(now));

  /// Chuỗi dài nhất từng đạt.
  int get bestStreak {
    final days = {...activeDays, ...freezeDays}.map(DateTime.parse).toList()..sort();
    var best = 0;
    var run = 0;
    DateTime? prev;
    for (final d in days) {
      if (prev == null || DateTime(prev.year, prev.month, prev.day + 1) != d) run = 0;
      if (activeDays.contains(dayKey(d))) run++;
      if (run > best) best = run;
      prev = d;
    }
    return best;
  }

  /// Gộp tiến độ từ hai máy (cùng quy tắc với server: server/src/merge.js).
  /// Hai bên có updatedAt bằng nhau thì [b] (bản gửi đến) được coi là mới hơn.
  static Progress merge(Progress a, Progress b) {
    final aNewer = (a.updatedAt ?? DateTime(0)).isAfter(b.updatedAt ?? DateTime(0));
    final newer = aNewer ? a : b;
    final lessons = <String, LessonProgress>{};
    for (final id in {...a.lessons.keys, ...b.lessons.keys}) {
      final x = a.lessons[id];
      final y = b.lessons[id];
      if (x == null || y == null) {
        lessons[id] = LessonProgress.fromJson((x ?? y)!.toJson());
        continue;
      }
      DateTime? last = x.lastPlayed;
      if (y.lastPlayed != null && (last == null || y.lastPlayed!.isAfter(last))) last = y.lastPlayed;
      lessons[id] = LessonProgress(
        bestStars: x.bestStars > y.bestStars ? x.bestStars : y.bestStars,
        bestPoints: x.bestPoints > y.bestPoints ? x.bestPoints : y.bestPoints,
        plays: x.plays > y.plays ? x.plays : y.plays,
        lastPlayed: last,
      );
    }
    final skills = <String, SkillProgress>{};
    for (final id in {...a.skills.keys, ...b.skills.keys}) {
      final x = a.skills[id];
      final y = b.skills[id];
      final pick = x == null
          ? y!
          : y == null
          ? x
          : (x.total != y.total ? (x.total > y.total ? x : y) : (x.correct >= y.correct ? x : y));
      skills[id] = SkillProgress(correct: pick.correct, total: pick.total);
    }
    // Trùng (examId, at) — so đến mili-giây như server — thì giữ bản của bên mới hơn.
    final older = aNewer ? b : a;
    final exams = <String, ExamRecord>{};
    for (final e in [...newer.exams, ...older.exams]) {
      exams.putIfAbsent('${e.examId}@${e.at.millisecondsSinceEpoch}', () => e);
    }
    final pets = <String, int>{...a.pets};
    for (final e in b.pets.entries) {
      if ((pets[e.key] ?? 0) < e.value) pets[e.key] = e.value;
    }
    final pointsByDay = <String, int>{...a.pointsByDay};
    for (final e in b.pointsByDay.entries) {
      if ((pointsByDay[e.key] ?? 0) < e.value) pointsByDay[e.key] = e.value;
    }
    final badges = <String, DateTime>{...a.badges};
    for (final e in b.badges.entries) {
      final cur = badges[e.key];
      if (cur == null || e.value.isBefore(cur)) badges[e.key] = e.value;
    }
    return Progress(
      childName: newer.childName,
      bookId: newer.bookId,
      totalPoints: a.totalPoints > b.totalPoints ? a.totalPoints : b.totalPoints,
      lessons: lessons,
      skills: skills,
      activeDays: {...a.activeDays, ...b.activeDays},
      exams: exams.values.toList()..sort((x, y) => x.at.compareTo(y.at)),
      badges: badges,
      updatedAt: aNewer ? a.updatedAt : (b.updatedAt ?? a.updatedAt),
      // Số dư (tim, vàng, mảnh ghép) và lựa chọn: lấy của máy mới hơn.
      hearts: newer.hearts,
      heartsAt: newer.heartsAt,
      coins: newer.coins,
      shards: newer.shards,
      outfit: newer.outfit,
      companion: newer.companion,
      pets: pets,
      outfits: {...a.outfits, ...b.outfits},
      freezeDays: {...a.freezeDays, ...b.freezeDays},
      pointsByDay: pointsByDay,
    );
  }

  Map<String, dynamic> toJson() => {
    'v': version,
    'childName': childName,
    'bookId': ?bookId,
    'totalPoints': totalPoints,
    'lessons': {for (final e in lessons.entries) e.key: e.value.toJson()},
    'skills': {for (final e in skills.entries) e.key: e.value.toJson()},
    'activeDays': (activeDays.toList()..sort()),
    'exams': [for (final e in exams) e.toJson()],
    'badges': {for (final e in badges.entries) e.key: e.value.toIso8601String()},
    if (updatedAt != null) 'updatedAt': updatedAt!.toIso8601String(),
    'hearts': hearts,
    if (heartsAt != null) 'heartsAt': heartsAt!.toIso8601String(),
    'coins': coins,
    'shards': shards,
    'pets': pets,
    'outfits': (outfits.toList()..sort()),
    'outfit': ?outfit,
    'companion': ?companion,
    'freezeDays': (freezeDays.toList()..sort()),
    'pointsByDay': pointsByDay,
  };
}
