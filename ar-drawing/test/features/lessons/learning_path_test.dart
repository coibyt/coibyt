import 'dart:io';
import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:tracelight/features/game/game_store.dart';
import 'package:tracelight/features/home/home_screen.dart';
import 'package:tracelight/features/home/start_screen.dart';
import 'package:tracelight/features/lessons/gallery_screen.dart';
import 'package:tracelight/features/lessons/gallery_store.dart';
import 'package:tracelight/features/lessons/learning_path.dart';
import 'package:tracelight/features/lessons/lesson.dart';
import 'package:tracelight/features/lessons/lesson_finish.dart';
import 'package:tracelight/features/lessons/lesson_progress_store.dart';

import '../../test_app.dart';
import '../../test_images.dart';

Future<void> frames(WidgetTester tester, [int n = 8]) async {
  for (int i = 0; i < n; i++) {
    await tester.pump(const Duration(milliseconds: 120));
  }
}

void main() {
  setUp(() => SharedPreferences.setMockInitialValues(<String, Object>{}));
  final List<Lesson> lessons = loadLessons().lessons;
  Lesson byId(String id) => lessons.firstWhere((Lesson l) => l.id == id);

  test('the catalog has many lessons, with portraits of all ages and landscapes', () {
    expect(lessons.length, greaterThanOrEqualTo(40));
    for (final String id in <String>[
      'toddler',
      'schoolgirl',
      'young_woman',
      'man_glasses',
      'grandma',
      'grandpa',
    ]) {
      expect(byId(id).topic, LessonTopic.portrait);
    }
    expect(
      lessons.where((Lesson l) => l.topic == LessonTopic.landscape).length,
      greaterThanOrEqualTo(6),
    );
    for (final Lesson l in lessons) {
      for (final String f in <String>['thumb', '1_outline', '2_base', '3_shadow', '4_final']) {
        expect(File('assets/lessons/${l.id}/$f.png').existsSync(), isTrue, reason: '${l.id}/$f');
      }
      expect(File('assets/lessons/${l.id}/demo.json').existsSync(), isTrue, reason: l.id);
    }
    expect(lessons.first.level, LessonLevel.basic, reason: 'the path starts easy');
  });

  test('learning comes first: games, then levels open step by step', () async {
    final LessonProgressStore store = LessonProgressStore();
    expect(gamesUnlocked(store, lessons), isFalse);
    expect(levelUnlocked(LessonLevel.basic, store, lessons), isTrue);
    expect(levelUnlocked(LessonLevel.intermediate, store, lessons), isFalse);
    expect(nextLesson(lessons, store)!.id, 'sphere');
    await store.record(byId('sphere'), 1);
    expect(nextLesson(lessons, store)!.id, 'sphere', reason: 'continue the started lesson');
    await store.record(byId('sphere'), 4);
    expect(gamesUnlocked(store, lessons), isTrue);
    expect(nextLesson(lessons, store)!.id, 'cube');
    await store.record(byId('cube'), 4);
    expect(levelUnlocked(LessonLevel.intermediate, store, lessons), isTrue);
    expect(levelUnlocked(LessonLevel.advanced, store, lessons), isFalse);
  });

  test('stars come from how much of each step was coloured', () async {
    expect(starsFor(<double>[0.9, 0.8, 0.7, 0.6]), 3);
    expect(starsFor(<double>[0.5, 0.4, 0.5, 0.4]), 2);
    expect(starsFor(<double>[0.1, 0, 0.2, 0]), 1);
    final LessonProgressStore store = LessonProgressStore();
    expect(await store.recordStars(byId('apple'), 2), 2);
    expect(await store.recordStars(byId('apple'), 1), 0, reason: 'never goes down');
    expect(await store.recordStars(byId('apple'), 3), 1);
    final LessonProgressStore back = await LessonProgressStore.load();
    expect(back.stars(byId('apple')), 3);
  });

  testWidgets('home: lessons first, game tiles locked until a lesson is done', (
    WidgetTester tester,
  ) async {
    tester.view.physicalSize = const Size(1080, 9000);
    tester.view.devicePixelRatio = 3;
    addTearDown(tester.view.reset);
    final LessonProgressStore store = LessonProgressStore();
    await tester.pumpWidget(
      testApp(
        GameScope(
          store: GameStore(),
          child: LessonProgressScope(
            store: store,
            child: HomeScreen(lessons: lessons, exams: const <Never>[]),
          ),
        ),
      ),
    );
    await frames(tester);
    expect(find.byKey(const Key('nextLessonHero')), findsOneWidget);
    final double hero = tester.getTopLeft(find.byKey(const Key('nextLessonHero'))).dy;
    final double photo = tester.getTopLeft(find.byKey(const Key('ownPhotoCard'))).dy;
    expect(hero, lessThan(photo), reason: 'learning comes before everything else');
    expect(find.byKey(const Key('tileLocked')), findsNWidgets(4));
    await tester.tap(find.byKey(const Key('shopCard')));
    await frames(tester, 4);
    expect(find.byKey(const Key('gamesLockedSnack')), findsOneWidget);

    await tester.runAsync(() => store.record(byId('sphere'), 4));
    await frames(tester);
    expect(find.byKey(const Key('tileLocked')), findsNothing);
  });

  testWidgets('finishing a lesson: stars, coins, gallery and the unlock banner', (
    WidgetTester tester,
  ) async {
    final LessonProgressStore store = LessonProgressStore();
    final GameStore game = GameStore();
    final GalleryStore gallery = GalleryStore();
    tester.view.physicalSize = const Size(1080, 2400);
    tester.view.devicePixelRatio = 2.5;
    addTearDown(tester.view.reset);
    await store.record(byId('sphere'), 4);
    await tester.pumpWidget(
      GameScope(
        store: game,
        child: GalleryScope(
          store: gallery,
          child: LessonProgressScope(
            store: store,
            child: LessonCatalogScope(
              lessons: lessons,
              child: testApp(
                Builder(
                  builder: (BuildContext context) => Scaffold(
                    body: TextButton(
                      onPressed: () => Navigator.of(context).push(
                        MaterialPageRoute<void>(
                          builder: (BuildContext context) => Scaffold(
                            body: TextButton(
                              onPressed: () => finishLesson(
                                context,
                                lesson: byId('sphere'),
                                stars: 2,
                                drawing: Uint8List.fromList(tinyPng),
                                reopen: (Lesson l) => Text('reopened ${l.id}'),
                              ),
                              child: const Text('finish'),
                            ),
                          ),
                        ),
                      ),
                      child: const Text('open'),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
    await tester.tap(find.text('open'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('finish'));
    await tester.runAsync(() => Future<void>.delayed(const Duration(milliseconds: 100)));
    await frames(tester, 20);
    expect(find.byKey(const Key('lessonComplete')), findsOneWidget);
    expect(find.byKey(const Key('gamesUnlockedBanner')), findsOneWidget);
    expect(find.byKey(const Key('completeCoins')), findsOneWidget);
    expect(store.stars(byId('sphere')), 2);
    expect(game.coins, 20);
    expect(game.stats.values.isNotEmpty, isTrue);
    expect(gallery.items.single.lessonId, 'sphere');
    await tester.ensureVisible(find.byKey(const Key('completeNext')));
    await tester.tap(find.byKey(const Key('completeNext')));
    await frames(tester, 6);
    expect(find.text('reopened cube'), findsOneWidget);
  });

  testWidgets('gallery shows saved drawings', (WidgetTester tester) async {
    final GalleryStore gallery = GalleryStore(<GalleryItem>[
      GalleryItem(
        lessonId: 'apple',
        stars: 3,
        at: DateTime(2026),
        png: Uint8List.fromList(tinyPng),
      ),
    ]);
    await tester.pumpWidget(
      testApp(
        GalleryScope(
          store: gallery,
          child: GalleryScreen(lessons: lessons),
        ),
      ),
    );
    await frames(tester);
    expect(find.byKey(const Key('drawing-0')), findsOneWidget);
    await tester.pumpWidget(
      testApp(
        GalleryScope(
          store: GalleryStore(),
          child: GalleryScreen(lessons: lessons),
        ),
      ),
    );
    await frames(tester);
    expect(find.byKey(const Key('galleryEmpty')), findsOneWidget);
  });

  testWidgets('title screen: one tap starts (and unlocks sound)', (WidgetTester tester) async {
    await tester.pumpWidget(testApp(StartScreen(next: () => const Scaffold(body: Text('home')))));
    await frames(tester, 3);
    expect(find.byKey(const Key('startButton')), findsOneWidget);
    await tester.tap(find.byKey(const Key('startScreen')));
    await frames(tester, 8);
    expect(find.text('home'), findsOneWidget);
  });
}
