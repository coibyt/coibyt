import 'dart:math' as math;

import 'package:clock/clock.dart';
import 'package:flutter/material.dart' show Offset, Size;
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:tracelight/features/draw/stroke.dart';
import 'package:tracelight/features/exams/exam.dart';
import 'package:tracelight/features/game/drill_screen.dart';
import 'package:tracelight/features/game/game_store.dart';

import '../../test_app.dart';

/// Always rolls [value] (0–99).
class FixedRandom implements math.Random {
  FixedRandom(this.value);
  final int value;
  @override
  int nextInt(int max) => value % max;
  @override
  double nextDouble() => 0;
  @override
  bool nextBool() => false;
}

const Exam quiz = Exam(
  id: 'quick_cube',
  type: ExamType.quiz15,
  subject: 'cube',
  task: ExamTask.sketch,
  weights: <Criterion, double>{Criterion.proportion: 1},
);
const Exam finalExam = Exam(
  id: 'final_portrait',
  type: ExamType.finalExam,
  subject: 'portrait_girl',
  task: ExamTask.colorShade,
  weights: <Criterion, double>{Criterion.proportion: 1},
);

void main() {
  setUp(() => SharedPreferences.setMockInitialValues(<String, Object>{}));
  final DateTime t0 = DateTime(2026, 11, 11, 9);

  group('energy brushes', () {
    test('quitting costs a brush that comes back after 30 minutes', () async {
      final GameStore g = GameStore();
      await withClock(Clock.fixed(t0), () => g.loseBrush());
      expect(withClock(Clock.fixed(t0), () => g.brushes), GameStore.maxBrushes - 1);
      expect(
        withClock(Clock.fixed(t0.add(const Duration(minutes: 10))), () => g.nextBrushIn),
        const Duration(minutes: 20),
      );
      expect(
        withClock(Clock.fixed(t0.add(const Duration(minutes: 31))), () => g.brushes),
        GameStore.maxBrushes,
      );
    });

    test('no brushes left → no exam, the drill earns one back', () async {
      final GameStore g = GameStore(brushes: 1, brushClock: t0);
      await withClock(Clock.fixed(t0), () => g.loseBrush());
      expect(withClock(Clock.fixed(t0), () => g.canTakeExam), isFalse);
      await withClock(Clock.fixed(t0), () => g.loseBrush());
      expect(withClock(Clock.fixed(t0), () => g.brushes), 0, reason: 'never below zero');
      await withClock(Clock.fixed(t0), () => g.earnBrush());
      expect(withClock(Clock.fixed(t0), () => g.canTakeExam), isTrue);
    });

    test('several periods regenerate several brushes, capped at the max', () {
      final GameStore g = GameStore(brushes: 1, brushClock: t0);
      expect(withClock(Clock.fixed(t0.add(const Duration(minutes: 65))), () => g.brushes), 3);
      expect(withClock(Clock.fixed(t0.add(const Duration(hours: 9))), () => g.brushes), 5);
    });
  });

  group('coins', () {
    test('better marks and longer exams earn more; failing earns none', () {
      expect(GameStore.coinsFor(quiz, const ExamScoreStub(8.5).score), 10);
      expect(GameStore.coinsFor(finalExam, const ExamScoreStub(8.5).score), 30);
      expect(GameStore.coinsFor(finalExam, const ExamScoreStub(7).score), 15);
      expect(GameStore.coinsFor(quiz, const ExamScoreStub(5.2).score), 4);
      expect(GameStore.coinsFor(finalExam, const ExamScoreStub(4.9).score), 0);
    });

    test('a failed exam costs a brush, a passed one does not', () async {
      final GameStore g = GameStore();
      final ExamReward fail = await withClock(
        Clock.fixed(t0),
        () => g.onExamGraded(quiz, const ExamScoreStub(3).score),
      );
      expect(fail.lostBrush, isTrue);
      expect(fail.coins, 0);
      final ExamReward pass = await withClock(
        Clock.fixed(t0),
        () => g.onExamGraded(finalExam, const ExamScoreStub(9).score),
      );
      expect(pass.lostBrush, isFalse);
      expect(pass.coins, 30);
      expect(withClock(Clock.fixed(t0), () => g.brushes), GameStore.maxBrushes - 1);
      expect(g.coins, 30);
    });
  });

  group('daily streak', () {
    test('drawing on consecutive days grows it, a gap resets it', () async {
      final GameStore g = GameStore();
      for (int d = 0; d < 3; d++) {
        await withClock(Clock.fixed(t0.add(Duration(days: d))), () => g.recordActivity());
      }
      expect(g.streak, 3);
      expect(g.coins, 10, reason: 'day 3 bonus');
      // Twice the same day counts once.
      await withClock(
        Clock.fixed(t0.add(const Duration(days: 2, hours: 3))),
        () => g.recordActivity(),
      );
      expect(g.streak, 3);
      // Yesterday still keeps the live streak, two days later it is gone.
      expect(withClock(Clock.fixed(t0.add(const Duration(days: 3))), () => g.liveStreak), 3);
      expect(withClock(Clock.fixed(t0.add(const Duration(days: 4))), () => g.liveStreak), 0);
      await withClock(Clock.fixed(t0.add(const Duration(days: 5))), () => g.recordActivity());
      expect(g.streak, 1);
      expect(g.bestStreak, 3);
    });

    test('every 7th day pays 30 coins', () async {
      final GameStore g = GameStore();
      for (int d = 0; d < 7; d++) {
        await withClock(Clock.fixed(t0.add(Duration(days: d))), () => g.recordActivity());
      }
      expect(g.coins, 10 + 30);
    });
  });

  group('mystery box', () {
    test('odds add up to 100 and are all positive', () {
      expect(GameStore.prizes.fold<int>(0, (int s, Prize p) => s + p.chance), 100);
      expect(GameStore.prizes.every((Prize p) => p.chance > 0), isTrue);
    });

    test('needs enough coins', () async {
      final GameStore g = GameStore(coins: GameStore.boxPrice - 1);
      expect(await g.openBox(FixedRandom(0)), isNull);
      expect(g.coins, GameStore.boxPrice - 1);
    });

    test('a roll picks the prize by its odds; a duplicate refunds coins', () async {
      final GameStore g = GameStore(coins: 200);
      final GachaResult? first = await g.openBox(FixedRandom(0));
      expect(first!.prize.brush, BrushEffect.sparkle);
      expect(first.duplicate, isFalse);
      expect(g.brushesOwned, contains(BrushEffect.sparkle));
      expect(g.coins, 150);
      final GachaResult? again = await g.openBox(FixedRandom(5));
      expect(again!.duplicate, isTrue);
      expect(g.coins, 150 - GameStore.boxPrice + GameStore.duplicateRefund);
      // 22 + 18 + 20 = 60 → first outfit.
      final GachaResult? outfit = await g.openBox(FixedRandom(60));
      expect(outfit!.prize.outfit, LumiOutfit.flower);
      await g.wearOutfit(LumiOutfit.flower);
      expect(g.outfit, LumiOutfit.flower);
      await g.wearOutfit(LumiOutfit.star);
      expect(g.outfit, LumiOutfit.flower, reason: 'not owned');
    });

    test('state survives a restart', () async {
      final GameStore g = GameStore(coins: 120);
      await g.openBox(FixedRandom(30));
      await g.useBrushEffect(BrushEffect.rainbow);
      await withClock(Clock.fixed(t0), () => g.recordActivity());
      final GameStore back = await GameStore.load();
      expect(back.coins, g.coins);
      expect(back.brushesOwned, g.brushesOwned);
      expect(back.brushEffect, BrushEffect.rainbow);
      expect(back.streak, 1);
    });
  });

  group('stroke drill', () {
    const Size size = Size(300, 400);
    test('tracing the guide passes, a stroke elsewhere does not', () {
      for (final DrillShape s in DrillShape.values) {
        final List<Offset> guide = drillPoints(s, size);
        final ({double coverage, double accuracy}) good = drillScore(guide, <Offset>[
          for (final Offset p in guide) p + const Offset(4, -3),
        ], 18);
        expect(good.coverage, greaterThan(0.95), reason: s.name);
        expect(good.accuracy, greaterThan(0.95), reason: s.name);
      }
      final List<Offset> guide = drillPoints(DrillShape.circle, size);
      final ({double coverage, double accuracy}) bad = drillScore(guide, <Offset>[
        for (int i = 0; i < 50; i++) Offset(10 + i * 2.0, 380),
      ], 18);
      expect(bad.coverage, lessThan(0.2));
      expect(bad.accuracy, lessThan(0.2));
      expect(drillScore(guide, const <Offset>[], 18).coverage, 0);
    });
  });
}
