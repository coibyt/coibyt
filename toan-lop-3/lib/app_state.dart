import 'dart:async';
import 'dart:convert';
import 'dart:math';

import 'package:flutter/widgets.dart';

import 'config.dart';
import 'logic/ability.dart';
import 'logic/badges.dart';
import 'logic/economy.dart';
import 'logic/exam_session.dart';
import 'logic/leaderboard.dart';
import 'logic/missions.dart';
import 'logic/quiz_session.dart';
import 'models/calendar.dart';
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
  static const missionsKey = 'missions.daily';
  static const abilityKey = 'ability.results';
  static const advUnlockKey = 'adv.unlocked';

  final ContentRepository content;
  final KeyValueStore store;
  final DateTime Function() now;

  late Catalog catalog;
  late Progress progress;

  /// Lịch học từng ngày cả năm (null = chưa có).
  SchoolCalendar? calendar;
  bool _vip = false;
  DateTime? _vipUntil;

  /// Đăng nhập & đồng bộ (null = bản offline, chưa cấu hình máy chủ).
  SyncService? sync;

  Future<void> init() async {
    catalog = await content.loadCatalog();
    calendar = await content.loadCalendar();
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

  // ---- Trò chơi ôn tập theo chủ đề ----

  static const gameUnlockCost = 30;
  static String _gameKey(String chapterId) => 'game.best.$chapterId';

  /// Kỷ lục (điểm, sao) của trò chơi ôn tập một chủ đề.
  (int, int) gameBest(String chapterId) {
    final parts = (store.get(_gameKey(chapterId)) ?? '0,0').split(',');
    return (int.tryParse(parts.first) ?? 0, int.tryParse(parts.last) ?? 0);
  }

  /// Mở trò chơi khi mọi bài của chủ đề đã có sao, hoặc đã mở bằng vàng, hoặc đã từng chơi.
  bool gameUnlocked(Chapter c) {
    if (store.get('game.unlocked.${c.id}') == 'true' || gameBest(c.id).$1 > 0) return true;
    return c.lessons.isNotEmpty && c.lessons.every((l) => (lessonProgress(l.id)?.bestStars ?? 0) > 0);
  }

  Future<bool> unlockGame(Chapter c) async {
    if (gameUnlocked(c)) return true;
    if (progress.coins < gameUnlockCost) return false;
    progress.coins -= gameUnlockCost;
    await store.put('game.unlocked.${c.id}', 'true');
    await _save();
    return true;
  }

  /// Lưu kết quả một ván; trả về true nếu phá kỷ lục.
  Future<bool> saveGameResult(String chapterId, {required int score, required int stars, required int coins}) async {
    final (best, bestStars) = gameBest(chapterId);
    final record = score > best;
    await store.put(_gameKey(chapterId), '${max(score, best)},${max(stars, bestStars)}');
    progress.coins += coins;
    progress.totalPoints += score ~/ 100;
    _addDayPoints(score ~/ 100);
    _markActive();
    missions.record(correct: 0, stars: 0, isLesson: false);
    await _save();
    return record;
  }

  // ---- Học nâng cao (học sinh giỏi) ----

  /// Giá mở khoá sớm một bài nâng cao bằng chìa khoá vàng.
  static const advUnlockCost = 40;

  /// Tuần của bài nâng cao `kntt3.nc.tuan-NN` (null nếu không phải).
  static int? advancedWeek(String lessonId) {
    final m = RegExp(r'\.nc\.tuan-(\d+)$').firstMatch(lessonId);
    return m == null ? null : int.parse(m[1]!);
  }

  /// Các bài cơ bản học trong tuần [week] (theo lịch).
  List<String> basicLessonsOfWeek(int week) => [
    ...{for (final d in calendar?.daysOfWeek(week) ?? const <CalendarDay>[]) d.lessonId},
  ];

  /// (đã xong, tổng số) bài cơ bản của tuần ứng với bài nâng cao [lessonId].
  (int, int) advancedProgress(String lessonId) {
    final week = advancedWeek(lessonId);
    if (week == null) return (0, 0);
    final basics = basicLessonsOfWeek(week);
    return (basics.where((id) => (lessonProgress(id)?.bestStars ?? 0) > 0).length, basics.length);
  }

  Set<String> get _advKeys => {...(store.get(advUnlockKey) ?? '').split(',').where((s) => s.isNotEmpty)};

  /// Bài nâng cao đã mở chưa: học xong (có sao) mọi bài cơ bản của tuần, hoặc đã dùng chìa khoá vàng.
  bool advancedUnlocked(String lessonId) {
    if (_advKeys.contains(lessonId) || (lessonProgress(lessonId)?.plays ?? 0) > 0) return true;
    final (done, total) = advancedProgress(lessonId);
    return total > 0 && done >= total;
  }

  /// Dùng [advUnlockCost] vàng mở khoá sớm; false nếu không đủ vàng.
  Future<bool> unlockAdvanced(String lessonId) async {
    if (advancedUnlocked(lessonId)) return true;
    if (progress.coins < advUnlockCost) return false;
    progress.coins -= advUnlockCost;
    await store.put(advUnlockKey, [..._advKeys, lessonId].join(','));
    await _save();
    return true;
  }

  /// Thử thách hôm nay: một câu của bài nâng cao tuần này (đổi mỗi ngày).
  Lesson dailyChallenge(Lesson advanced, DateTime day) {
    final pool = advanced.problems.where((p) => p.access == Access.free).toList();
    final p = pool[(day.weekday - 1 + day.day) % pool.length];
    return Lesson(
      schemaVersion: advanced.schemaVersion,
      id: '${advanced.id}#ngay-${dayKey(day)}',
      bookId: advanced.bookId,
      chapterId: advanced.chapterId,
      order: advanced.order,
      title: 'Thử thách hôm nay',
      contentRev: advanced.contentRev,
      theory: advanced.theory,
      problems: [p],
    );
  }

  // ---- Kiểm tra năng lực ----

  /// Các lần kiểm tra năng lực (cũ → mới).
  List<AbilityResult> get abilityResults {
    try {
      final raw = store.get(abilityKey);
      if (raw == null) return const [];
      return [for (final j in jsonDecode(raw) as List) AbilityResult.fromJson((j as Map).cast<String, dynamic>())];
    } on Object {
      return const [];
    }
  }

  /// Số ngày nên chờ giữa hai lần kiểm tra (để thấy tiến bộ thật).
  static const abilityRetestDays = 14;

  /// Đến lúc nên kiểm tra (lần đầu, hoặc đã đủ [abilityRetestDays] ngày từ lần trước).
  bool get abilityDue {
    final r = abilityResults;
    return r.isEmpty || now().difference(r.last.at).inDays >= abilityRetestDays;
  }

  /// Ngân hàng câu hỏi năng lực (nạp một lần rồi nhớ; lỗi thì lần sau nạp lại).
  Future<List<AbilityItem>>? _bank;

  Future<List<AbilityItem>> abilityBank({void Function(int done, int total)? onProgress}) {
    final f = _bank ??= _loadBank(onProgress);
    f.catchError((Object _) {
      _bank = null;
      return const <AbilityItem>[];
    });
    return f;
  }

  /// Nạp sẵn ngân hàng câu hỏi ở chế độ nền (gọi khi vào trang chủ) để gameshow mở ngay.
  void warmUpAbilityBank() => unawaited(abilityBank().then((_) {}, onError: (Object _) {}));

  Future<List<AbilityItem>> _loadBank(void Function(int, int)? onProgress) async {
    // Mỗi chủ đề lấy tối đa [bankLessonsPerChapter] bài trải đều (đầu & giữa chủ đề), tải song song.
    final jobs = <(LessonRef, AbilityDomain, int)>[];
    for (final c in book?.chapters ?? const <Chapter>[]) {
      final domain = AbilityDomain.ofChapter(c.order);
      if (domain == null || c.lessons.isEmpty) continue;
      final term = (c.volume ?? 1).clamp(1, 2);
      final ls = c.lessons;
      final picks = bankLessonIndexes(ls.length);
      for (final i in picks) {
        jobs.add((ls[i], domain, term));
      }
    }
    var done = 0;
    onProgress?.call(0, jobs.length);
    final parts = await Future.wait([
      for (final (ref, domain, term) in jobs)
        content
            .loadLesson(ref.src)
            .then(
              (lesson) => [
                for (final p in lesson.problems)
                  if (p.access == Access.free)
                    AbilityItem(
                      problem: p,
                      domain: domain,
                      difficulty: (term - 1) * 3 + p.level.clamp(1, 3),
                      lessonId: ref.id,
                    ),
              ],
              onError: (Object _) => const <AbilityItem>[], // bài lỗi: bỏ qua, vẫn kiểm tra bằng bài khác
            )
            .whenComplete(() => onProgress?.call(++done, jobs.length)),
    ]);
    final items = [for (final p in parts) ...p];
    if (items.isEmpty) throw StateError('Không tải được câu hỏi');
    return items;
  }

  /// Lưu kết quả; thưởng vàng: lần đầu 30, các lần sau 20 + 1 vàng cho mỗi điểm tiến bộ.
  Future<int> saveAbilityResult(AbilityResult r) async {
    final list = [...abilityResults];
    final prev = list.isEmpty ? null : list.last;
    final due = abilityDue;
    list.add(r);
    await store.put(abilityKey, jsonEncode([for (final x in list) x.toJson()]));
    var coins = 0;
    if (prev == null) {
      coins = 30;
    } else if (due) {
      coins = 20 + max(0, r.overall - prev.overall);
    }
    progress.coins += coins;
    _markActive();
    await _save();
    return coins;
  }

  // ---- Nhiệm vụ hằng ngày ----

  DailyMissions? _missions;

  /// Nhiệm vụ của hôm nay (sang ngày mới tự làm lại).
  DailyMissions get missions {
    final today = dayKey(now());
    if (_missions?.day == today) return _missions!;
    DailyMissions? saved;
    try {
      final raw = store.get(missionsKey);
      if (raw != null) saved = DailyMissions.fromJson(jsonDecode(raw) as Map<String, dynamic>);
    } on Object {
      saved = null;
    }
    return _missions = saved?.day == today ? saved! : DailyMissions(day: today);
  }

  Future<void> _saveMissions() => store.put(missionsKey, jsonEncode(missions.toJson()));

  /// Nhận vàng của một nhiệm vụ đã xong.
  Future<int> claimMission(String id) async {
    final coins = missions.claim(id);
    if (coins == 0) return 0;
    progress.coins += coins;
    await _saveMissions();
    await _save();
    return coins;
  }

  /// Mở rương báu khi đã nhận đủ 3 nhiệm vụ → (vàng, mảnh ghép); (0, 0) nếu chưa được mở.
  Future<(int, int)> openMissionChest() async {
    final m = missions;
    if (!m.chestReady) return (0, 0);
    m.chestOpened = true;
    progress
      ..coins += Missions.chestCoins
      ..shards += Missions.chestShards;
    await _saveMissions();
    await _save();
    return (Missions.chestCoins, Missions.chestShards);
  }

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

  static const bilingualKey = 'settings.bilingual';

  /// Học Toán kèm Tiếng Anh: câu hỏi có bản tiếng Anh, cô đọc thêm tiếng Anh, thẻ từ vựng mỗi bài.
  bool get bilingual => store.get(bilingualKey) == 'true';

  Future<void> setBilingual(bool value) async {
    await store.put(bilingualKey, '$value');
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
  bool get isVip => AppConfig.allFree || _vip || (_vipUntil?.isAfter(now()) ?? false);
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
    calendar = await content.loadCalendar();
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
    // Bài nâng cao (học sinh giỏi): thưởng vàng gấp đôi.
    final coins = coinsForPractice(earned) * (isAdvancedLessonId(session.lessonId.split('#').first) ? 2 : 1);
    progress.coins += coins;
    regenHearts(progress, now());
    final hearts = restoreHeartsForPractice(progress, correct: session.correctCount, total: session.problems.length);
    _addSkillStats(session.skillStats());
    _markActive();
    missions.record(correct: session.correctCount, stars: session.stars);
    await _saveMissions();
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
    missions.record(correct: result.correctCount, isLesson: false);
    await _saveMissions();
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
