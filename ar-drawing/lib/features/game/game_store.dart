// ignore_for_file: prefer_initializing_formals
import 'dart:convert';
import 'dart:math' as math;

import 'package:clock/clock.dart';
import 'package:flutter/widgets.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../draw/stroke.dart';
import '../exams/exam.dart';
import '../exams/exam_scoring.dart';
import 'goals.dart';

/// Lumi's outfits (shop prizes). `classic` is the default teal beret.
enum LumiOutfit { classic, flower, witch, star }

/// A prize in the blind box, with its chance in percent (shown in the shop).
@immutable
class Prize {
  const Prize._(this.id, this.chance, {this.brush, this.outfit});

  const Prize.brush(String id, BrushEffect effect, int chance) : this._(id, chance, brush: effect);
  const Prize.outfit(String id, LumiOutfit outfit, int chance) : this._(id, chance, outfit: outfit);

  final String id;
  final int chance;
  final BrushEffect? brush;
  final LumiOutfit? outfit;

  String get nameKey => 'shop.prize.$id';
}

/// Result of opening a blind box.
@immutable
class GachaResult {
  const GachaResult(this.prize, {required this.duplicate, required this.refund});

  final Prize prize;
  final bool duplicate;
  final int refund;
}

/// What an exam earned or cost.
@immutable
class ExamReward {
  const ExamReward({required this.coins, required this.lostBrush});

  final int coins;
  final bool lostBrush;
}

/// The learner's progress loops, all stored on the device:
///
/// - **Energy brushes** (max [maxBrushes]): an exam needs one brush to start;
///   failing or leaving an exam costs one. Brushes come back by themselves
///   ([regenEvery]) or immediately by doing the basic strokes drill.
///   Practice — lessons, the drawing board, the drill — never needs energy.
/// - **Daily streak**: drawing on consecutive days; missing a day starts again.
/// - **Art coins**: earned by good exam marks and streak milestones, spent on
///   blind boxes in the shop. Coins can never be bought with money, and the
///   chances of every prize are shown in the shop.
class GameStore extends ChangeNotifier {
  GameStore({
    int brushes = maxBrushes,
    DateTime? brushClock,
    this.coins = 0,
    this.streak = 0,
    this.bestStreak = 0,
    String? lastActiveDay,
    Set<String>? activeDays,
    Set<BrushEffect>? brushesOwned,
    Set<LumiOutfit>? outfitsOwned,
    this.brushEffect = BrushEffect.normal,
    this.outfit = LumiOutfit.classic,
    Map<GameEvent, int>? stats,
    String? questDay,
    Map<GameEvent, int>? today,
    Set<String>? questsClaimed,
    bool questBonusClaimed = false,
    Set<String>? badgesClaimed,
  }) : _brushes = brushes,
       stats = stats ?? <GameEvent, int>{},
       _questDay = questDay,
       _today = today ?? <GameEvent, int>{},
       _questsClaimed = questsClaimed ?? <String>{},
       _questBonusClaimed = questBonusClaimed,
       badgesClaimed = badgesClaimed ?? <String>{},
       _brushClock = brushClock,
       _lastActiveDay = lastActiveDay,
       activeDays = activeDays ?? <String>{},
       brushesOwned = brushesOwned ?? <BrushEffect>{BrushEffect.normal},
       outfitsOwned = outfitsOwned ?? <LumiOutfit>{LumiOutfit.classic};

  static const String _key = 'game_state';
  static const int maxBrushes = 5;
  static const Duration regenEvery = Duration(minutes: 30);
  static const int boxPrice = 50;
  static const int duplicateRefund = 20;

  /// Blind box contents. Chances add up to 100.
  static const List<Prize> prizes = <Prize>[
    Prize.brush('sparkle', BrushEffect.sparkle, 22),
    Prize.brush('rainbow', BrushEffect.rainbow, 18),
    Prize.brush('neon', BrushEffect.neon, 20),
    Prize.outfit('flower', LumiOutfit.flower, 16),
    Prize.outfit('witch', LumiOutfit.witch, 14),
    Prize.outfit('star', LumiOutfit.star, 10),
  ];

  int _brushes;

  /// When the next brush regeneration period started (null = full).
  DateTime? _brushClock;
  int coins;
  int streak;
  int bestStreak;
  String? _lastActiveDay;
  final Set<String> activeDays;
  final Set<BrushEffect> brushesOwned;
  final Set<LumiOutfit> outfitsOwned;
  BrushEffect brushEffect;
  LumiOutfit outfit;

  // ------------------------------------------------------------- energy

  /// Current brushes, after adding any that regenerated meanwhile.
  int get brushes {
    _regen();
    return _brushes;
  }

  bool get canTakeExam => brushes > 0;

  /// Time until the next brush comes back (null when full).
  Duration? get nextBrushIn {
    _regen();
    final DateTime? start = _brushClock;
    if (_brushes >= maxBrushes || start == null) return null;
    final Duration left = start.add(regenEvery).difference(clock.now());
    return left.isNegative ? Duration.zero : left;
  }

  void _regen() {
    final DateTime? start = _brushClock;
    if (_brushes >= maxBrushes || start == null) {
      _brushClock = null;
      return;
    }
    final int gained = clock.now().difference(start).inMinutes ~/ regenEvery.inMinutes;
    if (gained <= 0) return;
    _brushes = math.min(maxBrushes, _brushes + gained);
    _brushClock = _brushes >= maxBrushes ? null : start.add(regenEvery * gained);
  }

  Future<void> loseBrush() async {
    _regen();
    if (_brushes <= 0) return;
    if (_brushes == maxBrushes) _brushClock = clock.now();
    _brushes--;
    await _changed();
  }

  /// Reward of the basic strokes drill.
  Future<void> earnBrush() async {
    _regen();
    if (_brushes >= maxBrushes) return;
    _brushes++;
    if (_brushes >= maxBrushes) _brushClock = null;
    await _changed();
  }

  // ------------------------------------------------------------- streak

  static String dayKey(DateTime t) =>
      '${t.year}-${t.month.toString().padLeft(2, '0')}-${t.day.toString().padLeft(2, '0')}';

  /// True when today counts already.
  bool get activeToday => _lastActiveDay == dayKey(clock.now());

  /// Streak still alive (drew today or yesterday).
  int get liveStreak {
    final String? last = _lastActiveDay;
    if (last == null) return 0;
    final DateTime now = clock.now();
    final String today = dayKey(now), yesterday = dayKey(now.subtract(const Duration(days: 1)));
    return last == today || last == yesterday ? streak : 0;
  }

  /// Marks today as a creative day. Returns coins earned by a milestone.
  Future<int> recordActivity() async {
    final DateTime now = clock.now();
    final String today = dayKey(now);
    if (_lastActiveDay == today) return 0;
    final String yesterday = dayKey(now.subtract(const Duration(days: 1)));
    streak = _lastActiveDay == yesterday ? streak + 1 : 1;
    bestStreak = math.max(bestStreak, streak);
    _lastActiveDay = today;
    activeDays.add(today);
    // keep two weeks for the calendar
    final String cutoff = dayKey(now.subtract(const Duration(days: 14)));
    activeDays.removeWhere((String d) => d.compareTo(cutoff) < 0);
    final int bonus = streak % 7 == 0 ? 30 : (streak == 3 ? 10 : 0);
    coins += bonus;
    await _changed();
    return bonus;
  }

  // -------------------------------------------------------------- coins

  /// Coins for a graded exam; failing costs an energy brush.
  static int coinsFor(Exam exam, ExamScore score) {
    if (!score.passed) return 0;
    final bool longExam = exam.type != ExamType.quiz15;
    if (score.total >= 8) return longExam ? 30 : 10;
    if (score.total >= 6.5) return longExam ? 15 : 6;
    return longExam ? 8 : 4;
  }

  Future<ExamReward> onExamGraded(Exam exam, ExamScore score) async {
    final int earned = coinsFor(exam, score);
    coins += earned;
    if (!score.passed) {
      await loseBrush();
    } else {
      await _changed();
    }
    await recordActivity();
    await track(GameEvent.exam);
    if (score.passed) await track(GameEvent.examPassed);
    if (score.total >= 8) await track(GameEvent.excellent);
    return ExamReward(coins: earned, lostBrush: !score.passed);
  }

  // --------------------------------------------------------------- shop

  bool owns(Prize p) =>
      p.brush != null ? brushesOwned.contains(p.brush) : outfitsOwned.contains(p.outfit);

  /// Opens a blind box. Returns null when there are not enough coins.
  Future<GachaResult?> openBox([math.Random? random]) async {
    if (coins < boxPrice) return null;
    coins -= boxPrice;
    int roll = (random ?? math.Random()).nextInt(100);
    Prize prize = prizes.last;
    for (final Prize p in prizes) {
      if (roll < p.chance) {
        prize = p;
        break;
      }
      roll -= p.chance;
    }
    final bool dupe = owns(prize);
    if (dupe) {
      coins += duplicateRefund;
    } else if (prize.brush != null) {
      brushesOwned.add(prize.brush!);
    } else {
      outfitsOwned.add(prize.outfit!);
    }
    _rollDay();
    stats[GameEvent.box] = (stats[GameEvent.box] ?? 0) + 1;
    _today[GameEvent.box] = (_today[GameEvent.box] ?? 0) + 1;
    await _changed();
    return GachaResult(prize, duplicate: dupe, refund: dupe ? duplicateRefund : 0);
  }

  Future<void> useBrushEffect(BrushEffect e) async {
    if (!brushesOwned.contains(e)) return;
    brushEffect = e;
    await _changed();
  }

  Future<void> wearOutfit(LumiOutfit o) async {
    if (!outfitsOwned.contains(o)) return;
    outfit = o;
    await _changed();
  }

  // ------------------------------------------------ quests & achievements

  /// Lifetime counts of everything the learner did.
  final Map<GameEvent, int> stats;
  String? _questDay;
  Map<GameEvent, int> _today;
  final Set<String> _questsClaimed;
  bool _questBonusClaimed;

  /// Today's collected quests (cleared when a new day starts).
  Set<String> get questsClaimed {
    _rollDay();
    return _questsClaimed;
  }

  bool get questBonusClaimed {
    _rollDay();
    return _questBonusClaimed;
  }

  final Set<String> badgesClaimed;

  void _rollDay() {
    final String day = dayKey(clock.now());
    if (_questDay == day) return;
    _questDay = day;
    _today = <GameEvent, int>{};
    _questsClaimed.clear();
    _questBonusClaimed = false;
  }

  /// Coins for finishing a lesson (and other learning rewards).
  Future<void> addCoins(int value) async {
    if (value <= 0) return;
    coins += value;
    await _changed();
  }

  /// Counts an event for quests and achievements.
  Future<void> track(GameEvent e, [int n = 1]) async {
    if (n <= 0) return;
    _rollDay();
    stats[e] = (stats[e] ?? 0) + n;
    _today[e] = (_today[e] ?? 0) + n;
    await _changed();
  }

  List<QuestDef> get todaysQuests {
    _rollDay();
    return questsFor(_questDay!);
  }

  int questProgress(QuestDef q) {
    _rollDay();
    return (_today[q.event] ?? 0).clamp(0, q.target);
  }

  bool questDone(QuestDef q) => questProgress(q) >= q.target;

  /// Collects a finished quest's coins. False when not finished or claimed.
  Future<bool> claimQuest(QuestDef q) async {
    if (!questDone(q) || questsClaimed.contains(q.id)) return false;
    questsClaimed.add(q.id);
    coins += q.coins;
    await _changed();
    return true;
  }

  bool get questBonusReady =>
      !questBonusClaimed && todaysQuests.every((QuestDef q) => questsClaimed.contains(q.id));

  /// All three quests done: bonus coins and an energy brush.
  Future<bool> claimQuestBonus() async {
    if (!questBonusReady) return false;
    _questBonusClaimed = true;
    coins += kQuestBonusCoins;
    _regen();
    if (_brushes < maxBrushes) {
      _brushes++;
      if (_brushes >= maxBrushes) _brushClock = null;
    }
    await _changed();
    return true;
  }

  int badgeProgress(AchievementDef a) {
    final int v = switch (a.id) {
      'streak3' || 'streak7' => math.max(bestStreak, liveStreak),
      'collector' => brushesOwned.length,
      _ => stats[a.event] ?? 0,
    };
    return v.clamp(0, a.target);
  }

  bool badgeUnlocked(AchievementDef a) => badgeProgress(a) >= a.target;

  Future<bool> claimBadge(AchievementDef a) async {
    if (!badgeUnlocked(a) || badgesClaimed.contains(a.id)) return false;
    badgesClaimed.add(a.id);
    coins += a.coins;
    await _changed();
    return true;
  }

  /// Rewards waiting to be collected (badge on the home tiles).
  int get questsToClaim =>
      todaysQuests.where((QuestDef q) => questDone(q) && !questsClaimed.contains(q.id)).length +
      (questBonusReady ? 1 : 0);

  int get badgesToClaim => kAchievements
      .where((AchievementDef a) => badgeUnlocked(a) && !badgesClaimed.contains(a.id))
      .length;

  // -------------------------------------------------------- persistence

  Map<String, Object?> toJson() => <String, Object?>{
    'brushes': _brushes,
    'brushClock': _brushClock?.millisecondsSinceEpoch,
    'coins': coins,
    'streak': streak,
    'bestStreak': bestStreak,
    'lastDay': _lastActiveDay,
    'days': activeDays.toList(),
    'brushesOwned': brushesOwned.map((BrushEffect e) => e.name).toList(),
    'outfitsOwned': outfitsOwned.map((LumiOutfit o) => o.name).toList(),
    'brushEffect': brushEffect.name,
    'outfit': outfit.name,
    'stats': <String, int>{
      for (final MapEntry<GameEvent, int> e in stats.entries) e.key.name: e.value,
    },
    'questDay': _questDay,
    'today': <String, int>{
      for (final MapEntry<GameEvent, int> e in _today.entries) e.key.name: e.value,
    },
    'questsClaimed': _questsClaimed.toList(),
    'questBonus': _questBonusClaimed,
    'badges': badgesClaimed.toList(),
  };

  factory GameStore.fromJson(Map<String, Object?> j) {
    T pick<T extends Enum>(List<T> values, Object? name, T fallback) =>
        values.firstWhere((T v) => v.name == name, orElse: () => fallback);
    Map<GameEvent, int> counts(Object? raw) => <GameEvent, int>{
      if (raw is Map<String, Object?>)
        for (final MapEntry<String, Object?> e in raw.entries)
          for (final GameEvent ev in GameEvent.values)
            if (ev.name == e.key && e.value is num) ev: (e.value! as num).toInt(),
    };
    return GameStore(
      brushes: ((j['brushes'] as num?) ?? maxBrushes).toInt().clamp(0, maxBrushes),
      brushClock: j['brushClock'] == null
          ? null
          : DateTime.fromMillisecondsSinceEpoch((j['brushClock']! as num).toInt()),
      coins: ((j['coins'] as num?) ?? 0).toInt(),
      streak: ((j['streak'] as num?) ?? 0).toInt(),
      bestStreak: ((j['bestStreak'] as num?) ?? 0).toInt(),
      lastActiveDay: j['lastDay'] as String?,
      activeDays: <String>{
        for (final Object? d in (j['days'] as List<Object?>?) ?? <Object?>[]) d! as String,
      },
      brushesOwned: <BrushEffect>{
        BrushEffect.normal,
        for (final Object? e in (j['brushesOwned'] as List<Object?>?) ?? <Object?>[])
          pick(BrushEffect.values, e, BrushEffect.normal),
      },
      outfitsOwned: <LumiOutfit>{
        LumiOutfit.classic,
        for (final Object? o in (j['outfitsOwned'] as List<Object?>?) ?? <Object?>[])
          pick(LumiOutfit.values, o, LumiOutfit.classic),
      },
      brushEffect: pick(BrushEffect.values, j['brushEffect'], BrushEffect.normal),
      outfit: pick(LumiOutfit.values, j['outfit'], LumiOutfit.classic),
      stats: counts(j['stats']),
      questDay: j['questDay'] as String?,
      today: counts(j['today']),
      questsClaimed: <String>{
        for (final Object? q in (j['questsClaimed'] as List<Object?>?) ?? <Object?>[]) q! as String,
      },
      questBonusClaimed: j['questBonus'] == true,
      badgesClaimed: <String>{
        for (final Object? b in (j['badges'] as List<Object?>?) ?? <Object?>[]) b! as String,
      },
    );
  }

  static Future<GameStore> load() async {
    try {
      final SharedPreferences prefs = await SharedPreferences.getInstance();
      final String? raw = prefs.getString(_key);
      if (raw != null) return GameStore.fromJson(jsonDecode(raw) as Map<String, Object?>);
    } on Object catch (e) {
      debugPrint('Could not read game state: $e');
    }
    return GameStore();
  }

  Future<void> _changed() async {
    notifyListeners();
    try {
      final SharedPreferences prefs = await SharedPreferences.getInstance();
      await prefs.setString(_key, jsonEncode(toJson()));
    } on Object catch (e) {
      debugPrint('Could not save game state: $e');
    }
  }
}

class GameScope extends InheritedNotifier<GameStore> {
  const GameScope({super.key, required GameStore store, required super.child})
    : super(notifier: store);

  static GameStore? maybeOf(BuildContext context) =>
      context.dependOnInheritedWidgetOfExactType<GameScope>()?.notifier;

  /// Lookup without subscribing (callbacks, listeners).
  static GameStore? read(BuildContext context) =>
      context.getInheritedWidgetOfExactType<GameScope>()?.notifier;
}
