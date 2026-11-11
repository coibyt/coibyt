import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:tracelight/core/i18n/app_language.dart';
import 'package:tracelight/features/draw/draw_screen.dart';
import 'package:tracelight/features/draw/stroke.dart';
import 'package:tracelight/features/lessons/lesson.dart';
import 'package:tracelight/features/lessons/lesson_demo.dart';
import 'package:tracelight/features/lessons/widgets/demo_view.dart';

import '../../test_app.dart';

LessonDemo demoOf(Lesson l) => LessonDemo.parse(File(LessonDemo.assetOf(l)).readAsStringSync());

void main() {
  setUp(() => SharedPreferences.setMockInitialValues(<String, Object>{}));
  final List<Lesson> lessons = loadLessons().lessons;

  test('every lesson step (but "done") has a demonstration', () {
    for (final Lesson l in lessons) {
      final LessonDemo d = demoOf(l);
      expect(d.aspect, greaterThan(0.3), reason: l.id);
      for (final LessonStep s in l.steps) {
        final DemoStep? ds = d.forStep(s);
        if (s.kind == StepKind.done) {
          expect(ds, isNull);
        } else {
          expect(ds, isNotNull, reason: '${l.id} ${s.kind}');
          expect(ds!.strokes, isNotEmpty, reason: '${l.id} ${s.kind}');
          expect(ds.duration.inMilliseconds, inInclusiveRange(7000, 15000));
          for (final DemoStroke st in ds.strokes) {
            for (final Offset p in st.points) {
              expect(p.dx, inInclusiveRange(0, 1));
              expect(p.dy, inInclusiveRange(0, 1));
            }
          }
        }
      }
    }
  });

  test('the brush moves forward along the strokes', () {
    final DemoStep step = DemoStep(
      overlay: 'x',
      aspect: 1,
      strokes: const <DemoStroke>[
        DemoStroke(0.02, <Offset>[Offset(0, 0), Offset(1, 0)]),
        DemoStroke(0.02, <Offset>[Offset(0, 1), Offset(1, 1)]),
      ],
    );
    expect(step.length, closeTo(2, 1e-9));
    expect(step.at(0).done, isEmpty);
    final ({List<DemoStroke> done, Offset? tip}) quarter = step.at(0.25);
    expect(quarter.done, hasLength(1));
    expect(quarter.tip!.dx, closeTo(0.5, 1e-6));
    final ({List<DemoStroke> done, Offset? tip}) end = step.at(1);
    expect(end.done, hasLength(2));
    expect(end.tip, const Offset(1, 1));
    expect(step.samples().length, greaterThan(20));
  });

  test('coverage: tracing the demo lines counts, scribbling elsewhere does not', () {
    final DemoStep step = demoOf(lessons.firstWhere((Lesson l) => l.id == 'sphere'))
        .forStep(lessons.firstWhere((Lesson l) => l.id == 'sphere').steps.first)!;
    const Size canvas = Size(400, 600);
    final Rect pic = pictureRect(canvas, step.aspect);
    final List<Offset> samples = step.samples();
    // Learner strokes = the demo strokes themselves, in canvas-width units.
    final List<Stroke> traced = <Stroke>[
      for (final DemoStroke s in step.strokes)
        Stroke(
          tool: DrawTool.brush,
          color: Colors.black,
          width: 4 / canvas.width,
          points: <StrokePoint>[
            for (final Offset p in s.points)
              StrokePoint(
                (pic.left + p.dx * pic.width) / canvas.width,
                (pic.top + p.dy * pic.height) / canvas.width,
              ),
          ],
        ),
    ];
    double cov(List<Stroke> s) => stepCoverage(
      samples: samples,
      demoBrush: 0.01,
      picture: pic,
      strokes: s,
      canvasWidth: canvas.width,
    );
    expect(cov(traced), greaterThan(0.95));
    expect(cov(const <Stroke>[]), 0);
    final Stroke corner = Stroke(
      tool: DrawTool.brush,
      color: Colors.black,
      width: 4 / canvas.width,
      points: const <StrokePoint>[StrokePoint(0.02, 0.02), StrokePoint(0.1, 0.02)],
    );
    expect(cov(<Stroke>[corner]), lessThan(0.1));
  });

  testWidgets('Lumi demonstrates a step first, then it is the learner\'s turn', (
    WidgetTester tester,
  ) async {
    tester.view.physicalSize = const Size(1080, 2340);
    tester.view.devicePixelRatio = 3;
    addTearDown(tester.view.reset);
    final Lesson apple = lessons.firstWhere((Lesson l) => l.id == 'apple');
    await tester.runAsync(() async {
      await tester.pumpWidget(testApp(DrawScreen(lesson: apple), language: AppLanguage.vi));
      await Future<void>.delayed(const Duration(milliseconds: 300));
    });
    for (int i = 0; i < 5; i++) {
      await tester.pump(const Duration(milliseconds: 100));
    }
    expect(find.byType(DemoView), findsOneWidget, reason: 'the demonstration plays first');
    expect(find.byKey(const Key('demoCanvas')), findsOneWidget);
    expect(find.byKey(const Key('replayDemo')), findsNothing);
    await tester.tap(find.byKey(const Key('skipDemo')));
    for (int i = 0; i < 5; i++) {
      await tester.pump(const Duration(milliseconds: 100));
    }
    expect(find.byType(DemoView), findsNothing);
    expect(find.byKey(const Key('replayDemo')), findsOneWidget);
    expect(find.byKey(const Key('stepCoverage')), findsOneWidget);
    expect(find.text('Đã xong 0%'), findsOneWidget);
    await tester.tap(find.byKey(const Key('replayDemo')));
    for (int i = 0; i < 3; i++) {
      await tester.pump(const Duration(milliseconds: 100));
    }
    expect(find.byType(DemoView), findsOneWidget, reason: 'can watch again');
    await tester.tap(find.byKey(const Key('skipDemo')));
    for (int i = 0; i < 20; i++) {
      await tester.pump(const Duration(milliseconds: 500));
    }
  });
}
