import 'dart:convert';

import 'package:flutter/widgets.dart';

import 'logic/quiz_session.dart';
import 'models/content.dart';
import 'models/problem.dart';
import 'models/progress.dart';
import 'services/content_repository.dart';
import 'services/kv_store.dart';

/// Kết quả ghi nhận sau một lượt luyện tập / thi.
class RewardOutcome {
  const RewardOutcome({required this.pointsEarned, this.newBadgeIds = const []});

  final int pointsEarned;
  final List<String> newBadgeIds;
}

/// Trạng thái chung của app (mục lục, tiến độ, VIP). Dùng qua [AppScope].
class AppState extends ChangeNotifier {
  AppState({
    required this.content,
    required this.store,
    DateTime Function()? clock,
  }) : now = clock ?? DateTime.now;

  static const progressKey = 'progress.v1';
  static const vipKey = 'vip.dev';

  final ContentRepository content;
  final KeyValueStore store;
  final DateTime Function() now;

  late Catalog catalog;
  late Progress progress;
  bool _vip = false;

  Future<void> init() async {
    catalog = await content.loadCatalog();
    final raw = store.get(progressKey);
    progress = raw == null ? Progress() : Progress.fromJson(jsonDecode(raw) as Map<String, dynamic>);
    _vip = store.get(vipKey) == 'true';
  }

  bool get isVip => _vip;

  Book? get book {
    final id = progress.bookId;
    if (id == null) return null;
    for (final b in catalog.books) {
      if (b.id == id) return b;
    }
    return null;
  }

  Map<String, Skill> get skillsById => catalog.skillsById;

  int get streak => progress.streak(now());

  Future<void> _save() async {
    progress.updatedAt = now();
    await store.put(progressKey, jsonEncode(progress.toJson()));
    notifyListeners();
  }

  Future<void> selectBook(String bookId) async {
    progress.bookId = bookId;
    await _save();
  }

  Future<void> setChildName(String name) async {
    final trimmed = name.trim();
    progress.childName = trimmed.isEmpty ? 'Bé' : trimmed;
    await _save();
  }

  /// Bật/tắt VIP để THỬ (bản xem trước). Phase 4: VIP thật đến từ mua hàng + server.
  Future<void> setVip(bool value) async {
    _vip = value;
    await store.put(vipKey, '$value');
    notifyListeners();
  }

  Future<void> resetProgress() async {
    final keep = Progress(childName: progress.childName, bookId: progress.bookId);
    progress = keep;
    await _save();
  }

  LessonProgress? lessonProgress(String lessonId) => progress.lessons[lessonId];

  /// Tổng sao / sao tối đa của một chủ đề.
  (int, int) chapterStars(Chapter chapter) {
    var got = 0;
    for (final l in chapter.lessons) {
      got += progress.lessons[l.id]?.bestStars ?? 0;
    }
    return (got, chapter.lessons.length * 3);
  }

  bool canOpen(Access access) => access == Access.free || isVip;

  void _markActive() => progress.activeDays.add(dayKey(now()));

  void _addSkillStats(Map<String, SkillStat> stats) {
    for (final s in stats.values) {
      final p = progress.skills.putIfAbsent(s.skillId, SkillProgress.new);
      p
        ..correct += s.correct
        ..total += s.total;
    }
  }

  /// Ghi nhận một lượt luyện tập.
  ///
  /// Điểm: lần đầu = điểm của lượt; làm lại = phần điểm vượt kỷ lục cũ
  /// + 1 điểm cho mỗi câu đúng (khuyến khích ôn lại nhưng không "cày" điểm).
  Future<RewardOutcome> recordQuiz(QuizSession session) async {
    final lp = progress.lessons.putIfAbsent(session.lessonId, LessonProgress.new);
    final first = lp.plays == 0;
    final earned = first
        ? session.totalPoints
        : (session.totalPoints > lp.bestPoints ? session.totalPoints - lp.bestPoints : 0) +
            session.correctCount;
    lp
      ..plays += 1
      ..lastPlayed = now()
      ..bestPoints = session.totalPoints > lp.bestPoints ? session.totalPoints : lp.bestPoints
      ..bestStars = session.stars > lp.bestStars ? session.stars : lp.bestStars;
    progress.totalPoints += earned;
    _addSkillStats(session.skillStats());
    _markActive();
    final badges = onAfterRecord(progress);
    await _save();
    return RewardOutcome(pointsEarned: earned, newBadgeIds: badges);
  }

  /// Điểm móc cho luật huy hiệu (Phase 4). Trả về các huy hiệu mới.
  @protected
  List<String> onAfterRecord(Progress progress) => const [];

  /// Kỹ năng yếu tích luỹ (tỉ lệ đúng < 60%, có ít nhất 2 lượt).
  List<(Skill, SkillProgress)> weakSkills({double threshold = 0.6, int minTotal = 2}) {
    final list = <(Skill, SkillProgress)>[];
    for (final e in progress.skills.entries) {
      final skill = skillsById[e.key];
      if (skill == null) continue;
      if (e.value.total >= minTotal && e.value.ratio < threshold) list.add((skill, e.value));
    }
    list.sort((a, b) => a.$2.ratio.compareTo(b.$2.ratio));
    return list;
  }
}

/// Đưa [AppState] xuống cây widget.
class AppScope extends InheritedNotifier<AppState> {
  const AppScope({super.key, required AppState state, required super.child}) : super(notifier: state);

  static AppState of(BuildContext context) =>
      context.dependOnInheritedWidgetOfExactType<AppScope>()!.notifier!;

  static AppState read(BuildContext context) =>
      context.getInheritedWidgetOfExactType<AppScope>()!.notifier!;
}
