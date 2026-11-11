import 'dart:convert';
import 'dart:math';

import 'package:flutter/widgets.dart';

import 'logic/badges.dart';
import 'logic/economy.dart';
import 'logic/exam_session.dart';
import 'logic/leaderboard.dart';
import 'logic/quiz_session.dart';
import 'models/content.dart';
import 'models/problem.dart';
import 'models/progress.dart';
import 'services/content_repository.dart';
import 'services/kv_store.dart';
import 'services/sync_service.dart';

/// Kết quả ghi nhận sau một lượt luyện tập / thi.
class RewardOutcome {
  const RewardOutcome({
    required this.pointsEarned,
    this.newBadgeIds = const [],
    this.coins = 0,
    this.shards = 0,
    this.heartsChange = 0,
  });

  final int pointsEarned;
  final List<String> newBadgeIds;

  /// Đồng vàng, mảnh ghép nhận được.
  final int coins;
  final int shards;

  /// Tim thay đổi (âm = mất khi thi, dương = hồi khi ôn bài).
  final int heartsChange;
}

/// Trạng thái chung của app (mục lục, tiến độ, VIP). Dùng qua [AppScope].
class AppState extends ChangeNotifier {
  AppState({required this.content, required this.store, DateTime Function()? clock}) : now = clock ?? DateTime.now;

  static const progressKey = 'progress.v1';
  static const vipKey = 'vip.dev';
  static const vipUntilKey = 'vip.until';
  static const voiceKey = 'settings.voice';
  static const greetedKey = 'tutor.greeted';
  static const breakKey = 'settings.breakMinutes';
  static const nicknameKey = 'lb.nickname';
  static const optInKey = 'lb.optIn';

  final ContentRepository content;
  final KeyValueStore store;
  final DateTime Function() now;

  late Catalog catalog;
  late Progress progress;
  bool _vip = false;
  DateTime? _vipUntil;

  /// Đăng nhập & đồng bộ (null = bản offline, chưa cấu hình máy chủ).
  SyncService? sync;

  Future<void> init() async {
    catalog = await content.loadCatalog();
    final raw = store.get(progressKey);
    progress = raw == null ? Progress() : Progress.fromJson(jsonDecode(raw) as Map<String, dynamic>);
    _vip = store.get(vipKey) == 'true';
    _vipUntil = DateTime.tryParse(store.get(vipUntilKey) ?? '');
    regenHearts(progress, now());
    if (applyStreakFreeze(progress, now())) await _save();
  }

  // ---- Trò chơi hoá ----

  /// Cập nhật tim hồi theo thời gian (gọi khi mở phòng thi / trang chủ).
  void refreshHearts() {
    final before = progress.hearts;
    regenHearts(progress, now());
    if (progress.hearts != before) notifyListeners();
  }

  bool get canStartExam => progress.hearts > 0;

  /// Quay thẻ thú cưng (ném [NotEnoughCoins] nếu thiếu vàng).
  Future<SpinResult> spinPet(Random random) async {
    final r = spin(progress, random);
    await _save();
    return r;
  }

  Future<bool> choosePet(String petId) async {
    final ok = choosePetWithShards(progress, petId);
    if (ok) await _save();
    return ok;
  }

  Future<bool> buyTutorOutfit(String id) async {
    final ok = buyOutfit(progress, id);
    if (ok) await _save();
    return ok;
  }

  Future<void> wearOutfit(String? id) async {
    if (id != null && !progress.outfits.contains(id)) return;
    progress.outfit = id;
    await _save();
  }

  Future<void> setCompanion(String? petId) async {
    if (petId != null && (progress.pets[petId] ?? 0) == 0) return;
    progress.companion = petId;
    await _save();
  }

  void _addDayPoints(int points) {
    if (points <= 0) return;
    final k = dayKey(now());
    progress.pointsByDay[k] = (progress.pointsByDay[k] ?? 0) + points;
  }

  /// Cô giáo tự đọc to lời thoại (mặc định bật; phụ huynh tắt được).
  bool get voiceEnabled => store.get(voiceKey) != 'false';

  Future<void> setVoiceEnabled(bool value) async {
    await store.put(voiceKey, '$value');
    notifyListeners();
  }

  /// Cho dịch vụ khác báo giao diện cập nhật.
  void notifyListenersPublic() => notifyListeners();

  // ---- Bảng xếp hạng ----

  /// Biệt danh trên bảng xếp hạng (máy chủ cấp; offline thì app tự tạo một lần).
  String get nickname {
    final saved = store.get(nicknameKey);
    if (saved != null) return saved;
    final n = generateNickname(Random());
    store.put(nicknameKey, n);
    return n;
  }

  bool get leaderboardOptIn => store.get(optInKey) != 'false';

  /// Danh hiệu theo tổng điểm.
  RankInfo get rank => rankFor(progress.totalPoints);

  Future<void> setLeaderboardOptIn(bool value) async {
    await store.put(optInKey, '$value');
    await sync?.updateLeaderboard(optIn: value);
    notifyListeners();
  }

  Future<void> regenerateNickname() async {
    final remote = sync;
    if (remote != null && remote.signedIn) {
      await remote.updateLeaderboard(regenerateNickname: true);
    } else {
      await store.put(nicknameKey, generateNickname(Random()));
    }
    notifyListeners();
  }

  /// Bảng xếp hạng: thật (đã đăng nhập máy chủ) hoặc bảng thử với bạn mẫu.
  Future<LeaderboardData> loadLeaderboard(LeaderboardPeriod period) async {
    final remote = sync;
    if (remote != null && remote.signedIn) {
      try {
        await remote.syncNow(); // gửi điểm mới nhất trước khi xem hạng
        return await remote.fetchLeaderboard(period);
      } on Object catch (e) {
        debugPrint('Không tải được bảng xếp hạng: $e');
      }
    }
    return demoLeaderboard(
      period: period,
      now: now(),
      myNickname: nickname,
      myPoints: periodPoints(progress, period, now()),
      optedIn: leaderboardOptIn,
    );
  }

  /// Nhắc bé nghỉ mắt sau bấy nhiêu phút dùng app liên tục (0 = tắt). Mặc định 30.
  int get breakMinutes => int.tryParse(store.get(breakKey) ?? '') ?? 30;

  Future<void> setBreakMinutes(int minutes) async {
    await store.put(breakKey, '$minutes');
    notifyListeners();
  }

  /// Hôm nay cô Ong đã chào chưa (chỉ tự đọc lời chào 1 lần/ngày).
  bool get greetedToday => store.get(greetedKey) == dayKey(now());

  Future<void> markGreeted() => store.put(greetedKey, dayKey(now()));

  /// VIP thật (từ máy chủ, sau khi mua) hoặc VIP thử (bản thử nghiệm).
  bool get isVip => _vip || (_vipUntil?.isAfter(now()) ?? false);
  bool get isDevVip => _vip;
  DateTime? get vipUntil => _vipUntil;

  /// Cập nhật hạn VIP theo tài khoản trên máy chủ.
  Future<void> setServerVip(DateTime? until) async {
    _vipUntil = until;
    if (until == null) {
      await store.delete(vipUntilKey);
    } else {
      await store.put(vipUntilKey, until.toIso8601String());
    }
    notifyListeners();
  }

  /// Thay tiến độ (sau khi gộp với máy chủ).
  Future<void> replaceProgress(Progress p) async {
    progress = p;
    await store.put(progressKey, jsonEncode(progress.toJson()));
    notifyListeners();
  }

  /// Nạp lại mục lục (sau khi tải nội dung mới).
  Future<void> reloadCatalog() async {
    content.invalidate();
    catalog = await content.loadCatalog();
    notifyListeners();
  }

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

  /// Bật/tắt VIP để THỬ (bản xem trước). VIP thật đến từ mua hàng + máy chủ.
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
        : (session.totalPoints > lp.bestPoints ? session.totalPoints - lp.bestPoints : 0) + session.correctCount;
    lp
      ..plays += 1
      ..lastPlayed = now()
      ..bestPoints = session.totalPoints > lp.bestPoints ? session.totalPoints : lp.bestPoints
      ..bestStars = session.stars > lp.bestStars ? session.stars : lp.bestStars;
    progress.totalPoints += earned;
    _addDayPoints(earned);
    final coins = coinsForPractice(earned);
    progress.coins += coins;
    regenHearts(progress, now());
    final hearts = restoreHeartsForPractice(progress, correct: session.correctCount, total: session.problems.length);
    _addSkillStats(session.skillStats());
    _markActive();
    final badges = _awardBadges();
    await _save();
    return RewardOutcome(pointsEarned: earned, newBadgeIds: badges, coins: coins, heartsChange: hearts);
  }

  static String _draftKey(String examId) => 'exam.draft.$examId';

  /// Bài thi đang làm dở của một đề (null nếu không có).
  ExamDraft? examDraft(String examId) {
    final raw = store.get(_draftKey(examId));
    if (raw == null) return null;
    try {
      return ExamDraft.fromJson(jsonDecode(raw) as Map<String, dynamic>);
    } on Object {
      return null;
    }
  }

  Future<void> saveExamDraft(ExamSession session) =>
      store.put(_draftKey(session.exam.id), jsonEncode(session.toDraft().toJson()));

  Future<void> clearExamDraft(String examId) async {
    await store.delete(_draftKey(examId));
    notifyListeners();
  }

  /// Điểm (làm tròn) của lần làm gần nhất, null nếu chưa làm.
  int? lastExamScore(String examId) {
    for (final r in progress.exams.reversed) {
      if (r.examId == examId) return r.score.round();
    }
    return null;
  }

  /// Điểm cao nhất (làm tròn) của một đề, null nếu chưa làm.
  int? bestExamScore(String examId) {
    int? best;
    for (final r in progress.exams) {
      if (r.examId != examId) continue;
      final v = r.score.round();
      if (best == null || v > best) best = v;
    }
    return best;
  }

  /// Ghi nhận một lần làm đề. Điểm thưởng: lần đầu = điểm đề × 5;
  /// làm lại = phần điểm vượt kỷ lục × 5 + 2 điểm chăm chỉ.
  Future<RewardOutcome> recordExam(ExamResult result) async {
    await store.delete(_draftKey(result.exam.id));
    final best = bestExamScore(result.exam.id);
    final score = result.roundedScore;
    final earned = best == null ? score * 5 : (score > best ? (score - best) * 5 : 0) + 2;
    progress.exams.add(
      ExamRecord(
        examId: result.exam.id,
        score: result.rawScore,
        correct: result.correctCount,
        total: result.items.length,
        usedSeconds: result.usedSeconds,
        at: now(),
        weakSkillIds: [for (final w in result.weakSkills()) w.skillId],
      ),
    );
    progress.totalPoints += earned;
    _addDayPoints(earned);
    final (coins, shards) = examRewards(score: score, pointsEarned: earned, improved: best == null || score > best);
    progress
      ..coins += coins
      ..shards += shards;
    regenHearts(progress, now());
    final lost = loseHeartsForExam(progress, result.items.length - result.correctCount, now());
    _addSkillStats(result.skillStats());
    _markActive();
    final badges = _awardBadges();
    await _save();
    return RewardOutcome(pointsEarned: earned, newBadgeIds: badges, coins: coins, shards: shards, heartsChange: -lost);
  }

  /// Trao huy hiệu mới (nếu đủ điều kiện) sau mỗi lần ghi nhận.
  List<String> _awardBadges() => awardBadges(BadgeContext(progress: progress, catalog: catalog, now: now()));

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

  static AppState of(BuildContext context) => context.dependOnInheritedWidgetOfExactType<AppScope>()!.notifier!;

  /// null nếu không có AppScope (vd màn hình được test riêng).
  static AppState? maybeOf(BuildContext context) => context.dependOnInheritedWidgetOfExactType<AppScope>()?.notifier;

  static AppState read(BuildContext context) => context.getInheritedWidgetOfExactType<AppScope>()!.notifier!;
}
