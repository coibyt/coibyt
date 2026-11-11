import 'package:clock/clock.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:tracelight/features/draw/stroke.dart';
import 'package:tracelight/features/game/game_store.dart';
import 'package:tracelight/features/game/goals.dart';
import 'package:tracelight/features/game/quests_screen.dart';

import '../../test_app.dart';

void main() {
  setUp(() => SharedPreferences.setMockInitialValues(<String, Object>{}));
  final DateTime day = DateTime(2026, 11, 12, 10);

  test('three quests a day, one per group, stable for the day', () {
    final List<QuestDef> a = questsFor('2026-11-12');
    expect(a, hasLength(3));
    for (int g = 0; g < 3; g++) {
      expect(kQuestGroups[g], contains(a[g]));
    }
    expect(questsFor('2026-11-12'), a);
    final Set<String> seen = <String>{
      for (int d = 1; d <= 28; d++)
        ...questsFor('2026-02-${d.toString().padLeft(2, '0')}').map((QuestDef q) => q.id),
    };
    expect(seen.length, greaterThan(3), reason: 'quests vary between days');
  });

  test('progress, claiming, bonus chest and the next day reset', () async {
    await withClock(Clock.fixed(day), () async {
      final GameStore g = GameStore(brushes: 3, brushClock: day);
      final List<QuestDef> qs = g.todaysQuests;
      for (final QuestDef q in qs) {
        expect(await g.claimQuest(q), isFalse, reason: 'not done yet');
        await g.track(q.event, q.target + 5);
        expect(g.questProgress(q), q.target);
      }
      expect(g.questsToClaim, 3);
      int coins = 0;
      for (final QuestDef q in qs) {
        expect(await g.claimQuest(q), isTrue);
        expect(await g.claimQuest(q), isFalse, reason: 'only once');
        coins += q.coins;
      }
      expect(g.questBonusReady, isTrue);
      expect(await g.claimQuestBonus(), isTrue);
      expect(g.coins, coins + kQuestBonusCoins);
      expect(g.brushes, 4, reason: 'the chest gives an energy brush');
      expect(await g.claimQuestBonus(), isFalse);
    });
    await withClock(Clock.fixed(day.add(const Duration(days: 1))), () async {
      final GameStore g = await GameStore.load();
      expect(g.questsClaimed, isEmpty);
      expect(g.questBonusClaimed, isFalse);
      for (final QuestDef q in g.todaysQuests) {
        expect(g.questProgress(q), 0);
      }
      expect(
        g.stats.values.fold<int>(0, (int a, int b) => a + b),
        greaterThan(0),
        reason: 'lifetime stats stay',
      );
    });
  });

  test('achievements unlock from stats, streaks and the brush collection', () async {
    await withClock(Clock.fixed(day), () async {
      final GameStore g = GameStore(bestStreak: 7, brushesOwned: BrushEffect.values.toSet());
      AchievementDef a(String id) => kAchievements.firstWhere((AchievementDef x) => x.id == id);
      expect(g.badgeUnlocked(a('streak7')), isTrue);
      expect(g.badgeUnlocked(a('collector')), isTrue);
      expect(g.badgeUnlocked(a('first_exam')), isFalse);
      await g.track(GameEvent.lessonStep, 12);
      expect(g.badgeProgress(a('lessons')), 12);
      await g.track(GameEvent.stroke);
      expect(await g.claimBadge(a('first_stroke')), isTrue);
      expect(await g.claimBadge(a('first_stroke')), isFalse);
      expect(await g.claimBadge(a('first_exam')), isFalse);
      expect(g.coins, a('first_stroke').coins);
      expect(g.badgesToClaim, 3); // streak3, streak7, collector
    });
  });

  testWidgets('quests screen: claim a finished quest; badges tab', (WidgetTester tester) async {
    tester.view.physicalSize = const Size(1080, 2400);
    tester.view.devicePixelRatio = 2.5;
    addTearDown(tester.view.reset);
    final GameStore g = GameStore();
    final QuestDef q = g.todaysQuests.first;
    await g.track(q.event, q.target);
    await tester.pumpWidget(GameScope(store: g, child: testApp(const QuestsScreen())));
    for (int i = 0; i < 6; i++) {
      await tester.pump(const Duration(milliseconds: 100));
    }
    expect(find.byKey(Key('quest-${q.id}')), findsOneWidget);
    await tester.tap(find.byKey(Key('claim-${q.id}')));
    for (int i = 0; i < 6; i++) {
      await tester.pump(const Duration(milliseconds: 100));
    }
    expect(g.coins, q.coins);
    expect(find.byKey(const Key('rewardSnack')), findsOneWidget);
    await tester.tap(find.byKey(const Key('tabBadges')));
    for (int i = 0; i < 10; i++) {
      await tester.pump(const Duration(milliseconds: 100));
    }
    expect(find.byKey(const Key('badge-first_stroke')), findsOneWidget);
  });
}
