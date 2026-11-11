import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:tracelight/features/draw/widgets/drawing_canvas.dart';
import 'package:tracelight/features/exams/exam.dart';
import 'package:tracelight/features/exams/exam_record_store.dart';
import 'package:tracelight/features/exams/exam_result_screen.dart';
import 'package:tracelight/features/exams/exam_screen.dart';
import 'package:tracelight/features/exams/exams_screen.dart';

import '../../test_app.dart';

List<Exam> loadExams() => ExamCatalog.parse(File(ExamCatalog.asset).readAsStringSync()).exams;

Exam shortExam(Exam e, Duration d) =>
    Exam(id: e.id, type: e.type, subject: e.subject, task: e.task, weights: e.weights, duration: d);

Future<void> drawCircle(WidgetTester tester) async {
  final Rect r = tester.getRect(find.byType(DrawingCanvas));
  final TestGesture g = await tester.startGesture(r.center + const Offset(60, 0));
  for (int i = 1; i <= 24; i++) {
    final double a = i / 24 * 6.283;
    await g.moveTo(r.center + Offset(60 * _cos(a), 60 * _sin(a)));
  }
  await g.up();
  await tester.pump();
}

double _cos(double a) => _series(a, true);
double _sin(double a) => _series(a, false);
double _series(double a, bool cos) {
  // Small Taylor-free helper: use dart:math via Offset.fromDirection.
  final Offset o = Offset.fromDirection(a);
  return cos ? o.dx : o.dy;
}

void main() {
  setUp(() => SharedPreferences.setMockInitialValues(<String, Object>{}));
  final List<Exam> exams = loadExams();
  Exam byId(String id) => exams.firstWhere((Exam e) => e.id == id);

  Future<ExamRecordStore> pumpExam(WidgetTester tester, Exam exam) async {
    tester.view.physicalSize = const Size(1080, 2340);
    tester.view.devicePixelRatio = 3;
    addTearDown(tester.view.reset);
    final ExamRecordStore store = ExamRecordStore();
    await tester.pumpWidget(
      testApp(
        ExamRecordScope(
          store: store,
          child: ExamScreen(exam: exam),
        ),
      ),
    );
    await tester.pump();
    return store;
  }

  testWidgets('exam room: countdown, model card, no tracing layer', (WidgetTester tester) async {
    await pumpExam(tester, byId('quick_cube'));
    expect(find.text('15:00'), findsOneWidget);
    await tester.pump(const Duration(seconds: 2));
    expect(find.text('14:58'), findsOneWidget);
    expect(find.byKey(const Key('examModel')), findsOneWidget);
    expect(find.byKey(const Key('printedOutline')), findsNothing);
    expect(find.byKey(const Key('templateLayer')), findsNothing);
    await tester.tap(find.byKey(const Key('examModel')));
    await tester.pumpAndSettle();
    expect(find.byKey(const Key('modelLarge')), findsOneWidget);
  });

  testWidgets('colouring exams print the outline on the sheet', (WidgetTester tester) async {
    await tester.runAsync(() async {
      await pumpExam(tester, byId('midterm_cylinder'));
      await Future<void>.delayed(const Duration(milliseconds: 300));
    });
    await tester.pump();
    expect(find.byKey(const Key('printedOutline')), findsOneWidget);
    expect(find.textContaining(RegExp(r'^(60:00|59:5\d)$')), findsOneWidget);
  });

  testWidgets('hand in → graded report card, saved in the history', (WidgetTester tester) async {
    late ExamRecordStore store;
    await tester.runAsync(() async {
      store = await pumpExam(tester, byId('quick_apple'));
    });
    await drawCircle(tester);
    await tester.tap(find.byKey(const Key('submitExam')));
    await tester.pumpAndSettle();
    await tester.tap(find.byKey(const Key('confirmDialogOk')));
    await tester.pump();
    expect(find.byKey(const Key('gradingLabel')), findsOneWidget);
    await tester.runAsync(() async {
      for (int i = 0; i < 100 && store.attempts.isEmpty; i++) {
        await Future<void>.delayed(const Duration(milliseconds: 50));
      }
    });
    await tester.pumpAndSettle();
    expect(find.byType(ExamResultScreen), findsOneWidget);
    expect(find.byKey(const Key('totalScore')), findsOneWidget);
    expect(find.byKey(const Key('criterion-proportion')), findsOneWidget);
    expect(
      find.byKey(const Key('criterion-color')),
      findsNothing,
      reason: 'sketch tests have no colour',
    );
    expect(store.attempts.single.examId, 'quick_apple');
    expect(store.best('quick_apple'), isNotNull);
  });

  testWidgets('time up hands the paper in automatically', (WidgetTester tester) async {
    late ExamRecordStore store;
    await tester.runAsync(() async {
      store = await pumpExam(tester, shortExam(byId('quick_cube'), const Duration(seconds: 2)));
    });
    await drawCircle(tester);
    await tester.runAsync(() async {
      for (int i = 0; i < 120 && store.attempts.isEmpty; i++) {
        await Future<void>.delayed(const Duration(milliseconds: 50));
        await tester.pump(const Duration(milliseconds: 300));
      }
    });
    await tester.pumpAndSettle();
    expect(store.attempts, hasLength(1));
    expect(find.text("Time's up! Your paper was handed in automatically."), findsOneWidget);
  });

  testWidgets('leaving asks first and is not graded', (WidgetTester tester) async {
    final ExamRecordStore store = await pumpExam(tester, byId('quick_cat'));
    await tester.tap(find.byKey(const Key('leaveExam')));
    await tester.pumpAndSettle();
    expect(find.text('Leave the exam?'), findsOneWidget);
    await tester.tap(find.text('Keep drawing'));
    await tester.pumpAndSettle();
    expect(find.byType(ExamScreen), findsOneWidget);
    expect(store.attempts, isEmpty);
  });

  testWidgets('exam hall lists every type with best marks', (WidgetTester tester) async {
    tester.view.physicalSize = const Size(1080, 5000);
    tester.view.devicePixelRatio = 3;
    addTearDown(tester.view.reset);
    final ExamRecordStore store = ExamRecordStore();
    await tester.runAsync(() async {
      await store.record(byId('quick_cube'), const ExamScoreStub(7.5).score);
    });
    Exam? started;
    await tester.pumpWidget(
      testApp(
        ExamRecordScope(
          store: store,
          child: ExamsScreen(
            exams: exams,
            examBuilder: (Exam e) {
              started = e;
              return const Scaffold(body: Text('exam'));
            },
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();
    for (final String t in <String>[
      '15-minute test',
      'One-period test',
      'Mid-term exam',
      'End-of-term exam',
    ]) {
      expect(find.text(t), findsOneWidget);
    }
    expect(find.text('7.5'), findsOneWidget);
    await tester.tap(find.byKey(const Key('exam-period_fox')));
    await tester.pumpAndSettle();
    expect(find.textContaining('45 minutes'), findsOneWidget);
    await tester.tap(find.byKey(const Key('startExam')));
    await tester.pumpAndSettle();
    expect(started!.id, 'period_fox');
  });
}
