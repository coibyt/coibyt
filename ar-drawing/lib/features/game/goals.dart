import 'package:flutter/foundation.dart';

/// Things the learner does that count for quests and achievements.
enum GameEvent {
  /// A finished brush stroke (drawing board, lessons, exams).
  stroke,

  /// A lesson step reached (camera tracing or drawing board).
  lessonStep,

  /// An exam handed in.
  exam,

  /// An exam passed (mark ≥ 5).
  examPassed,

  /// An exam with an excellent mark (≥ 8).
  excellent,

  /// The basic strokes drill finished.
  drill,

  /// A mystery box opened.
  box,

  /// A drawing shared to the Hall of Fame.
  artShared,
}

/// A daily quest: do [target] × [event] today for [coins].
@immutable
class QuestDef {
  const QuestDef(this.id, this.event, this.target, this.coins);

  final String id;
  final GameEvent event;
  final int target;
  final int coins;

  String get titleKey => 'quest.$id';
}

/// A lifetime achievement (badge) with its art and reward.
@immutable
class AchievementDef {
  const AchievementDef(this.id, this.target, this.coins, {this.event});

  final String id;

  /// Counted event; null for the special ones (streaks, brush collection).
  final GameEvent? event;
  final int target;
  final int coins;

  String get titleKey => 'badge.$id.title';
  String get hintKey => 'badge.$id.hint';
  String get art => 'assets/game/badges/$id.png';
}

/// Quest groups: one quest from each group every day, so a day always mixes
/// free practice, learning and an exam.
const List<List<QuestDef>> kQuestGroups = <List<QuestDef>>[
  <QuestDef>[
    QuestDef('strokes30', GameEvent.stroke, 30, 10),
    QuestDef('strokes80', GameEvent.stroke, 80, 20),
  ],
  <QuestDef>[
    QuestDef('steps3', GameEvent.lessonStep, 3, 15),
    QuestDef('drill1', GameEvent.drill, 1, 10),
  ],
  <QuestDef>[
    QuestDef('exam1', GameEvent.exam, 1, 15),
    QuestDef('pass1', GameEvent.examPassed, 1, 20),
  ],
];

/// Coins and the energy brush for finishing all three quests of a day.
const int kQuestBonusCoins = 25;

const List<AchievementDef> kAchievements = <AchievementDef>[
  AchievementDef('first_stroke', 1, 5, event: GameEvent.stroke),
  AchievementDef('first_exam', 1, 10, event: GameEvent.exam),
  AchievementDef('excellent', 1, 30, event: GameEvent.excellent),
  AchievementDef('streak3', 3, 15),
  AchievementDef('streak7', 7, 40),
  AchievementDef('lessons', 20, 30, event: GameEvent.lessonStep),
  AchievementDef('drill', 5, 20, event: GameEvent.drill),
  AchievementDef('lucky', 1, 10, event: GameEvent.box),
  AchievementDef('collector', 4, 50),
  AchievementDef('hall', 1, 20, event: GameEvent.artShared),
];

/// Today's three quests, the same for the whole day.
List<QuestDef> questsFor(String dayKey) {
  // A small stable hash of the date (no dart:math Random: same on every run).
  int h = 7;
  for (final int c in dayKey.codeUnits) {
    h = (h * 31 + c) & 0x7fffffff;
  }
  return <QuestDef>[
    for (int g = 0; g < kQuestGroups.length; g++)
      kQuestGroups[g][(h >> g) % kQuestGroups[g].length],
  ];
}
