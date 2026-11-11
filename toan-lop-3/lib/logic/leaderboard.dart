import 'dart:math';

import '../models/progress.dart';

// ---------------------------------------------------------------------------
// Biệt danh (giống hệt danh sách ở server/src/nickname.js)
// ---------------------------------------------------------------------------

const nicknameAnimals = [
  'Mèo', 'Gấu', 'Thỏ', 'Cáo', 'Cú', 'Sóc', 'Voi', 'Hổ', 'Gấu Trúc', 'Chim Cánh Cụt', //
  'Rùa', 'Cá Heo', 'Hươu', 'Ong', 'Khỉ', 'Sư Tử', 'Ngựa', 'Vẹt', 'Kỳ Lân', 'Cún',
];

const nicknameAdjectives = [
  'Thông Minh', 'Chăm Chỉ', 'Nhanh Nhẹn', 'Dũng Cảm', 'Vui Vẻ', 'Siêu Tốc', 'Tinh Mắt', 'Kiên Trì', //
  'Sáng Tạo', 'Giỏi Giang', 'Cẩn Thận', 'Tự Tin', 'Hăng Hái', 'Lanh Lợi', 'Bền Bỉ', 'Chăm Ngoan', 'Tài Ba', 'Nhanh Trí',
];

/// "Mèo Thông Minh 99" — không bao giờ dùng tên thật của bé.
String generateNickname(Random r) =>
    '${nicknameAnimals[r.nextInt(nicknameAnimals.length)]} '
    '${nicknameAdjectives[r.nextInt(nicknameAdjectives.length)]} ${10 + r.nextInt(90)}';

// ---------------------------------------------------------------------------
// Danh hiệu
// ---------------------------------------------------------------------------

enum RankTier {
  tapSu('Tập sự', '🌱'),
  hocGia('Học giả', '📚'),
  thanDong('Thần đồng', '🏆');

  const RankTier(this.label, this.emoji);

  final String label;
  final String emoji;
}

/// Mốc điểm tích luỹ của 9 bậc: Tập sự I–III, Học giả I–III, Thần đồng I–III.
const rankThresholds = [0, 100, 200, 300, 550, 800, 1100, 1500, 2000];

class RankInfo {
  const RankInfo({required this.index, required this.points});

  /// 0..8
  final int index;
  final int points;

  RankTier get tier => RankTier.values[index ~/ 3];
  int get level => index % 3 + 1;
  String get title => '${tier.label} ${const ['I', 'II', 'III'][level - 1]}';
  bool get isMax => index == rankThresholds.length - 1;

  /// Tên bậc tiếp theo (null nếu đã cao nhất).
  String? get nextTitle => isMax ? null : RankInfo(index: index + 1, points: points).title;

  /// Còn bao nhiêu điểm để lên bậc tiếp theo.
  int? get pointsToNext => isMax ? null : rankThresholds[index + 1] - points;

  /// Tiến độ trong bậc hiện tại (0..1).
  double get progress =>
      isMax ? 1 : (points - rankThresholds[index]) / (rankThresholds[index + 1] - rankThresholds[index]);
}

RankInfo rankFor(int totalPoints) {
  var i = 0;
  while (i + 1 < rankThresholds.length && totalPoints >= rankThresholds[i + 1]) {
    i++;
  }
  return RankInfo(index: i, points: totalPoints);
}

// ---------------------------------------------------------------------------
// Bảng xếp hạng
// ---------------------------------------------------------------------------

enum LeaderboardPeriod { week, month }

/// Mỗi ngày tính tối đa 1000 điểm (giống server, chống gian lận).
const dailyCap = 1000;

/// Kỳ (giờ Việt Nam = giờ máy của bé): tuần bắt đầu thứ Hai, tháng bắt đầu ngày 1.
(DateTime, DateTime) periodBounds(LeaderboardPeriod p, DateTime now) {
  final day = DateTime(now.year, now.month, now.day);
  return switch (p) {
    LeaderboardPeriod.week => (
      DateTime(day.year, day.month, day.day - (day.weekday - 1)),
      DateTime(day.year, day.month, day.day - (day.weekday - 1) + 7),
    ),
    LeaderboardPeriod.month => (DateTime(day.year, day.month), DateTime(day.year, day.month + 1)),
  };
}

/// Điểm của bé trong kỳ, tính từ pointsByDay.
int periodPoints(Progress p, LeaderboardPeriod period, DateTime now) {
  final (start, end) = periodBounds(period, now);
  var sum = 0;
  for (final e in p.pointsByDay.entries) {
    final d = DateTime.tryParse(e.key);
    if (d == null || d.isBefore(start) || !d.isBefore(end)) continue;
    sum += min(e.value, dailyCap);
  }
  return sum;
}

class LeaderboardEntry {
  const LeaderboardEntry({required this.rank, required this.nickname, required this.points, this.isMe = false});

  factory LeaderboardEntry.fromJson(Map<String, dynamic> j) => LeaderboardEntry(
    rank: j['rank'] as int,
    nickname: j['nickname'] as String,
    points: j['points'] as int,
    isMe: j['isMe'] as bool? ?? false,
  );

  final int rank;
  final String nickname;
  final int points;
  final bool isMe;
}

class LeaderboardData {
  const LeaderboardData({
    required this.period,
    required this.entries,
    required this.myNickname,
    required this.myPoints,
    required this.optedIn,
    this.myRank,
    this.above,
    this.gapToAbove,
    this.isDemo = false,
  });

  factory LeaderboardData.fromJson(Map<String, dynamic> j) {
    final me = j['me'] as Map<String, dynamic>;
    final above = me['above'] as Map<String, dynamic>?;
    return LeaderboardData(
      period: j['period'] == 'month' ? LeaderboardPeriod.month : LeaderboardPeriod.week,
      entries: [for (final e in (j['entries'] as List).cast<Map<String, dynamic>>()) LeaderboardEntry.fromJson(e)],
      myNickname: me['nickname'] as String,
      myPoints: me['points'] as int? ?? 0,
      optedIn: me['optedIn'] as bool? ?? true,
      myRank: me['rank'] as int?,
      above: above == null ? null : LeaderboardEntry.fromJson({...above, 'isMe': false}),
      gapToAbove: me['gapToAbove'] as int?,
    );
  }

  final LeaderboardPeriod period;

  /// Top 50.
  final List<LeaderboardEntry> entries;
  final String myNickname;
  final int myPoints;
  final bool optedIn;
  final int? myRank;

  /// Bạn xếp ngay trên bé, và số điểm cần thêm để vượt.
  final LeaderboardEntry? above;
  final int? gapToAbove;

  /// Bảng thử với các bạn mẫu (chưa có máy chủ).
  final bool isDemo;
}

/// Bảng xếp hạng THỬ khi chưa có máy chủ: 49 bạn mẫu (ghi rõ là dữ liệu mẫu) +
/// điểm thật của bé. Cùng một kỳ thì các bạn mẫu giống nhau.
LeaderboardData demoLeaderboard({
  required LeaderboardPeriod period,
  required DateTime now,
  required String myNickname,
  required int myPoints,
  bool optedIn = true,
}) {
  final (start, _) = periodBounds(period, now);
  final r = Random(start.millisecondsSinceEpoch ~/ 86400000 + period.index * 7919);
  final maxPts = period == LeaderboardPeriod.week ? 700 : 2600;
  final bots = [for (var i = 0; i < 49; i++) (generateNickname(r), 10 + (pow(r.nextDouble(), 1.6) * maxPts).round())];
  final all = [...bots, if (optedIn && myPoints > 0) (myNickname, myPoints)]..sort((a, b) => b.$2.compareTo(a.$2));
  final entries = [
    for (final (i, e) in all.take(50).indexed)
      LeaderboardEntry(
        rank: i + 1,
        nickname: e.$1,
        points: e.$2,
        isMe: optedIn && myPoints > 0 && identical(e.$1, myNickname),
      ),
  ];
  final myIndex = all.indexWhere((e) => identical(e.$1, myNickname));
  LeaderboardEntry? above;
  int? gap;
  if (myIndex > 0) {
    final a = all[myIndex - 1];
    above = LeaderboardEntry(rank: myIndex, nickname: a.$1, points: a.$2);
    gap = a.$2 - myPoints + 1;
  }
  return LeaderboardData(
    period: period,
    entries: entries,
    myNickname: myNickname,
    myPoints: myPoints,
    optedIn: optedIn,
    myRank: myIndex >= 0 ? myIndex + 1 : null,
    above: above,
    gapToAbove: gap,
    isDemo: true,
  );
}
