import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:tracelight/features/academy/academy_screen.dart';
import 'package:tracelight/features/draw/draw_mode_sheet.dart';
import 'package:tracelight/features/lessons/lesson.dart';
import 'package:tracelight/features/lessons/lesson_progress_store.dart';

import '../../test_app.dart';

void main() {
  final List<Lesson> lessons = loadLessons().lessons;
  setUp(() => SharedPreferences.setMockInitialValues(<String, Object>{}));

  test('progress store only moves forward and persists', () async {
    final LessonProgressStore store = LessonProgressStore();
    final Lesson sphere = lessons.first;
    expect(store.fraction(sphere), 0);
    await store.record(sphere, 2);
    await store.record(sphere, 1);
    expect(store.reached(sphere), 2);
    expect(store.fraction(sphere), closeTo(3 / 5, 1e-9));
    await store.record(sphere, 4);
    expect(store.isDone(sphere), isTrue);
    final LessonProgressStore reloaded = await LessonProgressStore.load();
    expect(reloaded.isDone(sphere), isTrue);
    expect(reloaded.overall(lessons), closeTo(1 / lessons.length, 1e-9));
  });

  testWidgets('academy filters by level and topic, shows progress and opens lessons', (
    WidgetTester tester,
  ) async {
    tester.view.physicalSize = const Size(1080, 12000);
    tester.view.devicePixelRatio = 3;
    addTearDown(tester.view.reset);
    final LessonProgressStore store = LessonProgressStore();
    await store.record(lessons.first, 4); // sphere done
    // Open every level: two lessons done in basic and in intermediate.
    for (final String id in <String>['cube', 'fox', 'cat']) {
      final Lesson l = lessons.firstWhere((Lesson x) => x.id == id);
      await store.record(l, l.steps.length - 1);
    }
    Lesson? opened;
    DrawMode? mode;
    await tester.pumpWidget(
      testApp(
        LessonProgressScope(
          store: store,
          child: AcademyScreen(
            lessons: lessons,
            lessonBuilder: (Lesson l, DrawMode m) {
              opened = l;
              mode = m;
              return const Scaffold(body: Text('lesson'));
            },
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();
    expect(find.byKey(const Key('node-sphere')), findsOneWidget, reason: 'the path comes first');
    await tester.tap(find.byKey(const Key('tabLibrary')));
    await tester.pumpAndSettle();

    expect(find.byKey(const Key('academyOverall')), findsOneWidget);
    expect(find.text('Completed'), findsWidgets);
    expect(
      tester.widget<LinearProgressIndicator>(find.byKey(const Key('progress-sphere'))).value,
      1,
    );

    await tester.dragUntilVisible(
      find.byKey(const Key('level-advanced')),
      find.byType(ListView).at(0),
      const Offset(-80, 0),
    );
    await tester.pumpAndSettle();
    await tester.tap(find.byKey(const Key('level-advanced')));
    await tester.pumpAndSettle();
    expect(find.byKey(const Key('lesson-sphere')), findsNothing);
    expect(find.byKey(const Key('lesson-starry_night')), findsOneWidget);

    await tester.dragUntilVisible(
      find.byKey(const Key('topic-masters')),
      find.byType(ListView).at(1),
      const Offset(-80, 0),
    );
    await tester.pumpAndSettle();
    await tester.tap(find.byKey(const Key('topic-masters')));
    await tester.pumpAndSettle();
    expect(find.byKey(const Key('lesson-portrait_girl')), findsNothing);
    expect(find.byKey(const Key('lesson-pearl_earring')), findsOneWidget);

    await tester.tap(find.byKey(const Key('lesson-pearl_earring')));
    await tester.pumpAndSettle();
    await tester.tap(find.byKey(const Key('mode-camera')));
    await tester.pumpAndSettle();
    expect(opened!.id, 'pearl_earring');
    expect(mode, DrawMode.camera);
  });

  testWidgets('learning path: levels open step by step', (WidgetTester tester) async {
    tester.view.physicalSize = const Size(1080, 12000);
    tester.view.devicePixelRatio = 3;
    addTearDown(tester.view.reset);
    final LessonProgressStore store = LessonProgressStore();
    bool opened = false;
    await tester.pumpWidget(
      testApp(
        LessonProgressScope(
          store: store,
          child: AcademyScreen(
            lessons: lessons,
            lessonBuilder: (Lesson l, DrawMode m) {
              opened = true;
              return const Scaffold(body: Text('lesson'));
            },
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();
    expect(find.byKey(const Key('levelHeader-basic')), findsOneWidget);
    await tester.tap(find.byKey(const Key('node-fox')));
    // Lumi explains (she keeps floating: pump frames instead of settling).
    for (int i = 0; i < 5; i++) {
      await tester.pump(const Duration(milliseconds: 100));
    }
    expect(find.byKey(const Key('lockedSnack')), findsOneWidget, reason: 'intermediate is locked');
    expect(opened, isFalse);
  });
}
