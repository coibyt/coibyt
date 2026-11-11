import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:tracelight/core/game_art.dart';
import 'package:tracelight/features/draw/stroke.dart';
import 'package:tracelight/features/exams/exam.dart';
import 'package:tracelight/features/game/goals.dart';
import 'package:tracelight/features/leaderboard/player_profile.dart';

void main() {
  test('every game illustration referenced in code is bundled', () {
    final List<String> assets = <String>[
      GameArt.banner,
      GameArt.coin,
      GameArt.energy,
      GameArt.flame,
      GameArt.giftClosed,
      GameArt.giftOpen,
      for (final String t in <String>[
        'blank',
        'exam',
        'quests',
        'badges',
        'shop',
        'board',
        'photo',
        'academy',
      ])
        GameArt.tile(t),
      for (final BrushEffect e in BrushEffect.values) GameArt.brush(e.name),
      for (final ArtistRank r in ArtistRank.values) GameArt.rank(r.name),
      for (final String a in kAvatars.keys) GameArt.avatar(a),
      for (final ExamType t in ExamType.values)
        GameArt.examType(t == ExamType.finalExam ? 'final' : t.name),
      for (final AchievementDef a in kAchievements) a.art,
    ];
    for (final String a in assets) {
      expect(File(a).existsSync(), isTrue, reason: a);
    }
  });
}
