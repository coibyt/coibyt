import 'dart:io';

import 'package:camera_platform_interface/camera_platform_interface.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:tracelight/core/i18n/app_language.dart';
import 'package:tracelight/features/lessons/lesson.dart';
import 'package:tracelight/features/workspace/widgets/trace_overlay.dart';
import 'package:tracelight/features/workspace/workspace_screen.dart';

import '../../test_app.dart';
import '../workspace/fake_camera_platform.dart';

void main() {
  final LessonCatalog catalog = loadLessons();

  test('every lesson teaches outline → base → shadow → highlight → done', () {
    expect(catalog.lessons, hasLength(greaterThanOrEqualTo(3)));
    for (final Lesson l in catalog.lessons) {
      expect(l.steps.map((LessonStep s) => s.kind), StepKind.values, reason: l.id);
      expect(File(l.thumbnail).existsSync(), isTrue, reason: l.thumbnail);
      for (final LessonStep s in l.steps) {
        expect(File(s.overlay).existsSync(), isTrue, reason: s.overlay);
        expect(s.lines, isNotEmpty);
        for (final String p in s.palette) {
          expect(kPencilColors.containsKey(p), isTrue, reason: '${l.id}: $p');
        }
      }
      // Colouring steps tell the learner which pencils to use.
      for (final LessonStep s in l.steps.where((LessonStep s) => s.kind != StepKind.done)) {
        expect(s.palette, isNotEmpty, reason: '${l.id} ${s.kind}');
      }
      expect(l.steps.last.lines.first.mood, 'cheer', reason: 'Lumi cheers at the end');
    }
  });

  test('progress moves within bounds', () {
    final LessonProgress p = LessonProgress(catalog.lessons.first);
    expect(p.isFirst, isTrue);
    p.previous();
    expect(p.index, 0);
    for (int i = 0; i < 10; i++) {
      p.next();
    }
    expect(p.isLast, isTrue);
    expect(p.index, p.total - 1);
  });

  group('lesson in the workspace', () {
    setUp(() {
      CameraPlatform.instance = FakeCameraPlatform();
      TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger.setMockMessageHandler(
        'dev.flutter.pigeon.wakelock_plus_platform_interface.WakelockPlusApi.toggle',
        (ByteData? message) async => const StandardMessageCodec().encodeMessage(<Object?>[]),
      );
    });

    testWidgets('Next / Back change the overlay layer, palette and Lumi\'s line', (
      WidgetTester tester,
    ) async {
      tester.view.physicalSize = const Size(1080, 2340);
      tester.view.devicePixelRatio = 3;
      addTearDown(tester.view.reset);
      final Lesson apple = catalog.lessons.firstWhere((Lesson l) => l.id == 'apple');
      await tester.pumpWidget(
        testApp(
          WorkspaceScreen(lesson: apple, enableTimelapse: false),
          language: AppLanguage.vi,
          teacher: testTeacher(seenAll: false),
        ),
      );
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 100));

      String overlay() =>
          (tester.widget<TraceOverlay>(find.byType(TraceOverlay)).image as AssetImage).assetName;
      expect(overlay(), 'assets/lessons/apple/1_outline.png');
      expect(find.text('Bước 1/5 · Nét viền'), findsOneWidget);
      expect(find.text('Bút chì 2B'), findsOneWidget);
      expect(
        find.byKey(const Key('teacherDialog')),
        findsOneWidget,
        reason: 'Lumi explains step 1',
      );

      await tester.tap(find.byKey(const Key('lessonNext')));
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 100));
      expect(overlay(), 'assets/lessons/apple/2_base.png');
      expect(find.text('Bước 2/5 · Màu nền'), findsOneWidget);
      expect(find.text('Đỏ'), findsOneWidget);
      expect(find.text('Xanh lá đậm'), findsOneWidget);
      await tester.pump(const Duration(milliseconds: 6500));
      expect(
        find.textContaining('đỏ cho quả táo', findRichText: true),
        findsOneWidget,
        reason: 'Lumi reads the step instructions',
      );
      // While drawing, Lumi steps aside by herself so the picture is clear.
      await tester.pump(const Duration(seconds: 3));
      expect(find.byKey(const Key('teacherDialog')), findsNothing);
      expect(find.byKey(const Key('teacherAvatar')), findsOneWidget);

      await tester.tap(find.byKey(const Key('lessonNext')));
      await tester.pump();
      expect(overlay(), 'assets/lessons/apple/3_shadow.png');
      expect(find.text('Đỏ đậm'), findsOneWidget);

      await tester.tap(find.byKey(const Key('lessonPrev')));
      await tester.pump();
      expect(overlay(), 'assets/lessons/apple/2_base.png');

      // Let Lumi finish and step aside so her idle animation stops.
      for (int i = 0; i < 12; i++) {
        await tester.pump(const Duration(seconds: 1));
      }
      expect(find.byKey(const Key('teacherDialog')), findsNothing);
    });
  });
}
