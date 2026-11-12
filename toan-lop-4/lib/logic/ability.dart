/// Kiểm tra năng lực Toán 4: 5 mảng kiến thức × 3 câu, câu sau khó/dễ hơn tuỳ bé làm đúng/sai
/// (thích ứng), chấm điểm từng mảng 0–100 và xếp hạng. Làm lại sau một thời gian để thấy tiến bộ.
library;

import 'dart:math';

import '../models/problem.dart';

enum AbilityDomain {
  so('Số tự nhiên, hàng và lớp', 'Số'),
  congTru('Bốn phép tính với số tự nhiên', 'Phép tính'),
  phanSo('Phân số và phép tính với phân số', 'Phân số'),
  hinhHoc('Góc, đường thẳng, hình bình hành', 'Hình học'),
  doLuong('Đo lường, thống kê, xác suất', 'Đo lường');

  const AbilityDomain(this.title, this.short);

  final String title;
  final String short;

  /// Mảng kiến thức của từng chủ đề (Kết nối tri thức, Toán 4). null = chủ đề ôn tập tổng hợp.
  static AbilityDomain? ofChapter(int order) => switch (order) {
    1 || 3 => so,
    5 || 8 => congTru,
    10 || 11 || 12 => phanSo,
    2 || 6 => hinhHoc,
    4 || 9 => doLuong,
    _ => null,
  };
}

/// Bài nào của một chủ đề vào ngân hàng câu hỏi năng lực: bài đầu và bài giữa (đủ câu dễ/khó, tải nhanh).
List<int> bankLessonIndexes(int lessonCount) => lessonCount == 0 ? const [] : {0, lessonCount ~/ 2}.toList();

/// Một câu trong ngân hàng câu hỏi năng lực.
class AbilityItem {
  const AbilityItem({required this.problem, required this.domain, required this.difficulty, required this.lessonId});

  final Problem problem;
  final AbilityDomain domain;

  /// 1–6: (học kì − 1) × 3 + mức độ câu (1–3).
  final int difficulty;
  final String lessonId;
}

/// Hạng năng lực.
enum AbilityRank {
  mam(1, 'Hạt mầm chăm chỉ', 0),
  thamHiem(2, 'Nhà thám hiểm số', 40),
  ngoiSao(3, 'Ngôi sao Toán học', 65),
  kimCuong(4, 'Kim cương Toán học', 85);

  const AbilityRank(this.tier, this.title, this.minScore);

  final int tier;
  final String title;
  final int minScore;

  static AbilityRank of(int score) => values.lastWhere((r) => score >= r.minScore);
}

/// Kết quả một lần kiểm tra.
class AbilityResult {
  const AbilityResult({
    required this.at,
    required this.scores,
    required this.correct,
    required this.total,
    required this.seconds,
  });

  factory AbilityResult.fromJson(Map<String, dynamic> j) => AbilityResult(
    at: DateTime.parse(j['at'] as String),
    scores: {
      for (final d in AbilityDomain.values)
        if ((j['scores'] as Map?)?[d.name] != null) d: ((j['scores'] as Map)[d.name] as num).toInt(),
    },
    correct: (j['correct'] as num).toInt(),
    total: (j['total'] as num).toInt(),
    seconds: (j['seconds'] as num?)?.toInt() ?? 0,
  );

  final DateTime at;
  final Map<AbilityDomain, int> scores;
  final int correct;
  final int total;
  final int seconds;

  int get overall => scores.isEmpty ? 0 : (scores.values.reduce((a, b) => a + b) / scores.length).round();
  AbilityRank get rank => AbilityRank.of(overall);

  /// Mảng yếu nhất (để gợi ý học trước).
  AbilityDomain? get weakest =>
      scores.isEmpty ? null : (scores.entries.toList()..sort((a, b) => a.value.compareTo(b.value))).first.key;

  Map<String, dynamic> toJson() => {
    'at': at.toIso8601String(),
    'scores': {for (final e in scores.entries) e.key.name: e.value},
    'correct': correct,
    'total': total,
    'seconds': seconds,
  };
}

/// Một lượt kiểm tra năng lực đang làm.
class AbilityTest {
  AbilityTest(List<AbilityItem> bank, {Random? random, this.perDomain = 3}) : _random = random ?? Random() {
    for (final item in bank) {
      _bank.putIfAbsent(item.domain, () => []).add(item);
    }
    _domains = [
      for (final d in AbilityDomain.values)
        if ((_bank[d] ?? const []).isNotEmpty) d,
    ];
    for (final d in _domains) {
      _level[d] = startDifficulty;
    }
    _pickNext();
  }

  static const startDifficulty = 2;
  static const maxDifficulty = 6;

  final Random _random;
  final int perDomain;
  final _bank = <AbilityDomain, List<AbilityItem>>{};
  late final List<AbilityDomain> _domains;
  final _level = <AbilityDomain, int>{};
  final _earned = <AbilityDomain, int>{};
  final _asked = <AbilityDomain, int>{};
  final _used = <String>{};
  final answers = <(AbilityItem, bool)>[];
  AbilityItem? _current;

  List<AbilityDomain> get domains => _domains;
  int get total => _domains.length * perDomain;
  int get index => answers.length;
  bool get isFinished => _current == null;
  AbilityItem get current => _current!;

  /// Ghi nhận câu trả lời của câu hiện tại rồi chọn câu tiếp theo.
  void answer({required bool correct}) {
    final item = _current!;
    final d = item.domain;
    answers.add((item, correct));
    _asked[d] = (_asked[d] ?? 0) + 1;
    if (correct) {
      _earned[d] = (_earned[d] ?? 0) + item.difficulty;
      _level[d] = min(maxDifficulty, item.difficulty + 2);
    } else {
      _level[d] = max(1, item.difficulty - 1);
    }
    _pickNext();
  }

  /// Quyền trợ giúp "Đổi câu hỏi": thay câu hiện tại bằng câu khác cùng mảng, độ khó gần nhất.
  /// Trả về false nếu không còn câu nào để đổi.
  bool swap() {
    final cur = _current;
    if (cur == null) return false;
    final candidates = [
      for (final it in _bank[cur.domain]!)
        if (!_used.contains(it.problem.id)) it,
    ];
    if (candidates.isEmpty) return false;
    final best = candidates.map((c) => (c.difficulty - cur.difficulty).abs()).reduce(min);
    final near = [
      for (final c in candidates)
        if ((c.difficulty - cur.difficulty).abs() == best) c,
    ];
    _current = near[_random.nextInt(near.length)];
    _used.add(_current!.problem.id);
    return true;
  }

  void _pickNext() {
    _current = null;
    if (answers.length >= total) return;
    // Xen kẽ các mảng: câu thứ i thuộc mảng i % số mảng.
    final d = _domains[answers.length % _domains.length];
    final want = _level[d]!;
    final candidates = [
      for (final it in _bank[d]!)
        if (!_used.contains(it.problem.id)) it,
    ];
    if (candidates.isEmpty) {
      _asked[d] = perDomain; // hết câu: coi như xong mảng này
      answers.add((_bank[d]!.first, false));
      return _pickNext();
    }
    final best = candidates.map((c) => (c.difficulty - want).abs()).reduce(min);
    final near = [
      for (final c in candidates)
        if ((c.difficulty - want).abs() == best) c,
    ];
    _current = near[_random.nextInt(near.length)];
    _used.add(_current!.problem.id);
  }

  /// Điểm mảng: tổng độ khó các câu đúng so với đường "đúng hết" (2 → 4 → 6 = 12), tối đa 100.
  int scoreOf(AbilityDomain d) {
    final ideal = [
      for (var i = 0, l = startDifficulty; i < perDomain; i++, l = min(maxDifficulty, l + 2)) l,
    ].fold<int>(0, (a, b) => a + b);
    return min(100, ((_earned[d] ?? 0) * 100 / ideal).round());
  }

  AbilityResult result(DateTime at, {int seconds = 0}) => AbilityResult(
    at: at,
    scores: {for (final d in _domains) d: scoreOf(d)},
    correct: answers.where((a) => a.$2).length,
    total: answers.length,
    seconds: seconds,
  );
}
