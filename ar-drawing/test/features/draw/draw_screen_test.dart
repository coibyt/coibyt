import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:tracelight/core/i18n/app_language.dart';
import 'package:tracelight/features/draw/draw_screen.dart';
import 'package:tracelight/features/draw/drawing_controller.dart';
import 'package:tracelight/features/draw/onboarding_tour.dart';
import 'package:tracelight/features/draw/stroke.dart';
import 'package:tracelight/features/draw/widgets/drawing_canvas.dart';
import 'package:tracelight/features/lessons/lesson.dart';
import 'package:tracelight/features/lessons/lesson_progress_store.dart';

import '../../test_app.dart';
import '../../test_images.dart';

DrawingController controllerOf(WidgetTester tester) =>
    tester.widget<DrawingCanvas>(find.byType(DrawingCanvas)).controller;

Future<void> drawLine(
  WidgetTester tester, {
  PointerDeviceKind kind = PointerDeviceKind.touch,
}) async {
  final Rect r = tester.getRect(find.byType(DrawingCanvas));
  final TestGesture g = await tester.startGesture(r.center - const Offset(60, 0), kind: kind);
  for (int i = 1; i <= 6; i++) {
    await g.moveBy(const Offset(20, 0));
    await tester.pump();
  }
  await g.up();
  await tester.pump();
}

void main() {
  setUp(() => SharedPreferences.setMockInitialValues(<String, Object>{}));

  Future<void> pumpBoard(WidgetTester tester, Widget screen, {bool tourSeen = true}) async {
    tester.view.physicalSize = const Size(1080, 2340);
    tester.view.devicePixelRatio = 3;
    addTearDown(tester.view.reset);
    await tester.pumpWidget(testApp(screen, teacher: testTeacher(seenAll: tourSeen)));
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 50));
  }

  testWidgets('finger draws a line; undo and redo buttons work', (WidgetTester tester) async {
    await pumpBoard(tester, DrawScreen(template: MemoryImage(tinyPng)));
    await drawLine(tester);
    final DrawingController c = controllerOf(tester);
    expect(c.strokes, hasLength(1));
    expect(c.strokes.single.points.length, greaterThan(3));

    await tester.tap(find.byTooltip('Undo'));
    await tester.pump();
    expect(c.isEmpty, isTrue);
    await tester.tap(find.byKey(const Key('redoButton')));
    await tester.pump();
    expect(c.strokes, hasLength(1));
  });

  testWidgets('eraser tool makes eraser strokes', (WidgetTester tester) async {
    await pumpBoard(tester, const DrawScreen());
    await tester.tap(find.byTooltip('Eraser'));
    await tester.pump();
    await drawLine(tester);
    expect(controllerOf(tester).strokes.single.tool, DrawTool.eraser);
  });

  testWidgets('after a stylus is used, palm touches do not draw', (WidgetTester tester) async {
    await pumpBoard(tester, const DrawScreen());
    await drawLine(tester, kind: PointerDeviceKind.stylus);
    await drawLine(tester); // palm / finger
    expect(controllerOf(tester).strokes, hasLength(1));
  });

  testWidgets('a second finger cancels the line in progress', (WidgetTester tester) async {
    await pumpBoard(tester, const DrawScreen());
    final Rect r = tester.getRect(find.byType(DrawingCanvas));
    final TestGesture a = await tester.startGesture(r.center);
    await a.moveBy(const Offset(30, 0));
    final TestGesture b = await tester.startGesture(r.center + const Offset(0, 100));
    await b.moveBy(const Offset(30, 0));
    await a.up();
    await b.up();
    await tester.pump();
    expect(controllerOf(tester).isEmpty, isTrue);
  });

  testWidgets('colour picker: presets and HSV set the brush colour', (WidgetTester tester) async {
    await pumpBoard(tester, const DrawScreen());
    await tester.tap(find.byTooltip('Pick a colour'));
    await tester.pumpAndSettle();
    await tester.tap(find.byKey(const Key('preset-ffe53935')));
    await tester.pumpAndSettle();
    expect(controllerOf(tester).color, const Color(0xFFE53935));

    await tester.tap(find.byTooltip('Pick a colour'));
    await tester.pumpAndSettle();
    await tester.tap(find.byKey(const Key('useColor')));
    await tester.pumpAndSettle();
    expect(
      controllerOf(tester).color,
      const Color(0xFFE53935),
      reason: 'unchanged sliders keep it',
    );
  });

  testWidgets('two layers: the template can be faded or hidden, the drawing stays', (
    WidgetTester tester,
  ) async {
    await pumpBoard(tester, DrawScreen(template: MemoryImage(tinyPng)));
    expect(find.byKey(const Key('templateLayer')), findsOneWidget);
    await drawLine(tester);
    await tester.tap(find.byKey(const Key('layersButton')));
    await tester.pumpAndSettle();
    await tester.tap(find.byKey(const Key('templateVisible')));
    await tester.pumpAndSettle();
    await tester.tapAt(const Offset(10, 10)); // close the sheet
    await tester.pumpAndSettle();
    expect(find.byKey(const Key('templateLayer')), findsNothing);
    expect(controllerOf(tester).strokes, hasLength(1));
  });

  testWidgets('clear asks first and can be undone', (WidgetTester tester) async {
    await pumpBoard(tester, const DrawScreen());
    await drawLine(tester);
    await tester.tap(find.byKey(const Key('drawMenu')));
    await tester.pumpAndSettle();
    await tester.tap(find.text('Clear all').last);
    await tester.pumpAndSettle();
    await tester.tap(find.byKey(const Key('confirmClear')));
    await tester.pumpAndSettle();
    expect(controllerOf(tester).isEmpty, isTrue);
    expect(controllerOf(tester).canUndo, isTrue);
  });

  testWidgets('guided tour waits for each action: red → line → size → eraser → undo', (
    WidgetTester tester,
  ) async {
    await pumpBoard(tester, const DrawScreen(), tourSeen: false);
    OnboardingTour tour() => (tester.widget<TourSpotlight>(find.byType(TourSpotlight))).tour;
    String line() => tour().current!.line.id;
    Future<void> settle() async {
      await tester.pump(const Duration(milliseconds: 500));
      await tester.pump();
    }

    expect(line(), 'tour_welcome');
    await tester.pump(const Duration(seconds: 7));
    expect(line(), 'tour_pick_red');

    // Drawing first does not count: the tour asked for red.
    final DrawingController c = controllerOf(tester);
    c.color = const Color(0xFF1E88E5);
    await settle();
    expect(line(), 'tour_pick_red');
    c.color = const Color(0xFFE53935);
    await settle();
    expect(line(), 'tour_draw_line');

    await drawLine(tester);
    await settle();
    expect(line(), 'tour_size');
    c.size = c.size + 10;
    await settle();
    expect(line(), 'tour_eraser');
    c.tool = DrawTool.eraser;
    await drawLine(tester);
    await settle();
    expect(line(), 'tour_undo');
    await tester.tap(find.byTooltip('Undo'));
    await settle();
    expect(line(), 'tour_done');
    for (int i = 0; i < 12; i++) {
      await tester.pump(const Duration(seconds: 1));
    }
    expect(find.byType(TourSpotlight), findsNothing, reason: 'tour finished');
  });

  testWidgets('lesson on screen: step layer as template, exact palette, progress saved', (
    WidgetTester tester,
  ) async {
    final Lesson sphere = loadLessons().lessons.firstWhere((Lesson l) => l.id == 'sphere');
    final LessonProgressStore store = LessonProgressStore();
    tester.view.physicalSize = const Size(1080, 2340);
    tester.view.devicePixelRatio = 3;
    addTearDown(tester.view.reset);
    await tester.pumpWidget(
      testApp(
        LessonProgressScope(
          store: store,
          child: DrawScreen(lesson: sphere),
        ),
        language: AppLanguage.vi,
      ),
    );
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 50));

    String template() =>
        (tester.widget<Image>(find.byKey(const Key('templateLayer'))).image as AssetImage)
            .assetName;
    expect(template(), 'assets/lessons/sphere/1_outline.png');
    expect(store.reached(sphere), 0);

    await tester.tap(find.byKey(const Key('lessonNext')));
    await tester.pump();
    expect(template(), 'assets/lessons/sphere/2_base.png');
    expect(store.reached(sphere), 1);

    // Tapping the suggested shade loads it into the brush.
    await tester.tap(find.byKey(const Key('palette-lightgrey')));
    await tester.pump();
    expect(controllerOf(tester).color, const Color(0xFFDEDEDE));
    expect(find.textContaining('#DEDEDE'), findsOneWidget);

    for (int i = 0; i < 14; i++) {
      await tester.pump(const Duration(seconds: 1));
    }
  });
}
