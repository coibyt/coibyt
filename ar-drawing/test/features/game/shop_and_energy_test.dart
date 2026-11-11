import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:tracelight/features/draw/stroke.dart';
import 'package:tracelight/features/exams/exam.dart';
import 'package:tracelight/features/exams/exam_record_store.dart';
import 'package:tracelight/features/exams/exams_screen.dart';
import 'package:tracelight/features/game/game_status_bar.dart';
import 'package:tracelight/features/game/game_store.dart';
import 'package:tracelight/features/game/shop_screen.dart';

import '../../test_app.dart';
import 'game_store_test.dart' show FixedRandom;

Future<void> frames(WidgetTester tester, [int n = 8]) async {
  for (int i = 0; i < n; i++) {
    await tester.pump(const Duration(milliseconds: 150));
  }
}

Widget withGame(GameStore game, Widget child) => testApp(GameScope(store: game, child: child));

void main() {
  setUp(() => SharedPreferences.setMockInitialValues(<String, Object>{}));

  testWidgets('shop shows the odds and opens a box with coins', (WidgetTester tester) async {
    tester.view.physicalSize = const Size(1080, 2400);
    tester.view.devicePixelRatio = 2.5;
    addTearDown(tester.view.reset);
    final GameStore game = GameStore(coins: 70);
    await tester.pumpWidget(withGame(game, ShopScreen(random: FixedRandom(25))));
    await frames(tester);
    for (final Prize p in GameStore.prizes) {
      expect(find.byKey(Key('odds-${p.id}')), findsOneWidget);
    }
    expect(find.textContaining('22%'), findsOneWidget);
    await tester.tap(find.byKey(const Key('openBox')));
    await frames(tester, 12);
    expect(find.byKey(const Key('prizeDialog')), findsOneWidget);
    expect(find.text('Rainbow brush'), findsWidgets);
    expect(game.coins, 20);
    expect(game.brushesOwned, contains(BrushEffect.rainbow));
  });

  testWidgets('the box stays shut without enough coins', (WidgetTester tester) async {
    tester.view.physicalSize = const Size(1080, 2400);
    tester.view.devicePixelRatio = 2.5;
    addTearDown(tester.view.reset);
    final GameStore game = GameStore(coins: 12);
    await tester.pumpWidget(withGame(game, ShopScreen(random: FixedRandom(0))));
    await frames(tester);
    expect(find.text('38 more coins needed'), findsOneWidget);
    await tester.tap(find.byKey(const Key('openBox')), warnIfMissed: false);
    await frames(tester);
    expect(find.byKey(const Key('prizeDialog')), findsNothing);
    expect(game.coins, 12);
  });

  testWidgets('status bar shows streak, brushes and coins', (WidgetTester tester) async {
    final GameStore game = GameStore(brushes: 3, brushClock: DateTime.now(), coins: 42);
    await tester.pumpWidget(withGame(game, Scaffold(body: GameStatusBar(onCoins: () {}))));
    await tester.pump();
    expect(find.text('3/5'), findsOneWidget);
    expect(find.text('42'), findsOneWidget);
    expect(find.text('day streak'), findsOneWidget);
    await tester.tap(find.byKey(const Key('energyPill')));
    await frames(tester);
    expect(find.byKey(const Key('energyBrushes')), findsOneWidget);
    expect(find.byKey(const Key('startDrill')), findsOneWidget);
  });

  testWidgets('no energy brush → the exam does not start', (WidgetTester tester) async {
    final List<Exam> exams = ExamCatalog.parse(File(ExamCatalog.asset).readAsStringSync()).exams;
    final GameStore game = GameStore(brushes: 0, brushClock: DateTime.now());
    bool started = false;
    await tester.pumpWidget(
      withGame(
        game,
        ExamRecordScope(
          store: ExamRecordStore(),
          child: ExamsScreen(
            exams: exams,
            examBuilder: (Exam e) {
              started = true;
              return const SizedBox();
            },
          ),
        ),
      ),
    );
    await frames(tester);
    expect(find.text('0/5'), findsOneWidget);
    await tester.tap(find.byKey(Key('exam-${exams.first.id}')));
    await frames(tester);
    expect(find.byKey(const Key('startExam')), findsNothing);
    expect(find.byKey(const Key('energyBrushes')), findsOneWidget);
    expect(started, isFalse);
  });
}
