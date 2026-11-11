import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:tracelight/features/draw/draw_mode_sheet.dart';
import 'package:tracelight/features/home/home_screen.dart';
import 'package:tracelight/features/lessons/lesson.dart';
import 'package:tracelight/features/sketch/sketch_screen.dart';
import 'package:tracelight/features/templates/template_catalog.dart';

import '../../test_app.dart';
import '../../test_images.dart';

void main() {
  ImageProvider? opened;
  Lesson? openedLesson;
  DrawMode? openedMode;

  Widget fakeWorkspace(ImageProvider image) {
    opened = image;
    return const Scaffold(body: Text('workspace'));
  }

  Future<void> pumpHome(WidgetTester tester, {PhotoPicker? picker}) async {
    tester.view.physicalSize = const Size(1080, 9000);
    tester.view.devicePixelRatio = 3;
    addTearDown(tester.view.reset);
    opened = null;
    await tester.pumpWidget(
      testApp(
        HomeScreen(
          workspaceBuilder: fakeWorkspace,
          pickPhoto: picker ?? () async => null,
          lessons: loadLessons().lessons,
          lessonBuilder: (Lesson lesson, DrawMode mode) {
            openedLesson = lesson;
            openedMode = mode;
            return const Scaffold(body: Text('lesson'));
          },
          drawBuilder: (ImageProvider? image) {
            opened = image;
            return const Scaffold(body: Text('draw'));
          },
        ),
      ),
    );
    await tester.pumpAndSettle();
  }

  testWidgets('shows the own-photo card, categories and templates', (WidgetTester tester) async {
    await pumpHome(tester);
    expect(find.byKey(const Key('ownPhotoCard')), findsOneWidget);
    for (final TemplateCategory c in TemplateCategory.values) {
      await tester.dragUntilVisible(
        find.byKey(Key('category-${c.name}')),
        find.byType(ListView).last,
        const Offset(-80, 0),
      );
      expect(find.byKey(Key('category-${c.name}')), findsOneWidget);
    }
    expect(find.byKey(Key('template-${kTemplates.first.id}')), findsOneWidget);
  });

  testWidgets('category chip filters the grid', (WidgetTester tester) async {
    await pumpHome(tester);
    await tester.dragUntilVisible(
      find.byKey(const Key('category-cars')),
      find.byType(ListView).last,
      const Offset(-80, 0),
    );
    await tester.ensureVisible(find.byKey(const Key('category-cars')));
    await tester.pumpAndSettle();
    await tester.tap(find.byKey(const Key('category-cars')));
    await tester.pumpAndSettle();
    expect(find.byKey(const Key('template-vintage_car')), findsOneWidget);
    expect(find.byKey(const Key('template-fox_cub')), findsNothing);
  });

  testWidgets('tapping a template opens the workspace with its picture', (
    WidgetTester tester,
  ) async {
    await pumpHome(tester);
    await tester.tap(find.byKey(const Key('template-fox_cub')));
    await tester.pumpAndSettle();
    expect(find.text('How do you want to draw?'), findsOneWidget);
    await tester.tap(find.byKey(const Key('mode-camera')));
    await tester.pumpAndSettle();
    expect(find.text('workspace'), findsOneWidget);
    expect((opened! as AssetImage).assetName, 'assets/templates/animals/fox_cub.png');
  });

  testWidgets('own photo goes through the sketch screen', (WidgetTester tester) async {
    await pumpHome(tester, picker: () async => tinyPng);
    await tester.tap(find.byKey(const Key('ownPhotoCard')));
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 400));
    expect(find.byType(SketchScreen), findsOneWidget);
  });

  testWidgets('cancelled picker stays on home', (WidgetTester tester) async {
    await pumpHome(tester);
    await tester.tap(find.byKey(const Key('ownPhotoCard')));
    await tester.pumpAndSettle();
    expect(find.byType(SketchScreen), findsNothing);
  });

  testWidgets('how-it-works sheet opens', (WidgetTester tester) async {
    await pumpHome(tester);
    await tester.tap(find.byKey(const Key('howItWorks')));
    await tester.pumpAndSettle();
    expect(find.text('Got it'), findsOneWidget);
  });

  testWidgets('lesson cards open the colouring lesson', (WidgetTester tester) async {
    await pumpHome(tester);
    expect(find.text('Colouring path'), findsOneWidget);
    await tester.tap(find.byKey(const Key('lesson-sphere')));
    await tester.pumpAndSettle();
    await tester.tap(find.byKey(const Key('mode-screen')));
    await tester.pumpAndSettle();
    expect(find.text('lesson'), findsOneWidget);
    expect(openedLesson!.id, 'sphere');
    expect(openedMode, DrawMode.screen);
  });

  testWidgets('language button switches the whole interface', (WidgetTester tester) async {
    await pumpHome(tester);
    expect(find.text('Templates'), findsOneWidget);
    await tester.runAsync(() async {
      await tester.tap(find.byKey(const Key('languageButton')));
      await Future<void>.delayed(const Duration(milliseconds: 300));
    });
    await tester.pumpAndSettle();
    expect(find.text('Tranh mẫu'), findsOneWidget);
    expect(find.text('Lộ trình học tô màu'), findsOneWidget);
  });
}
