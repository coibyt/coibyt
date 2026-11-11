import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:tracelight/features/home/home_screen.dart';
import 'package:tracelight/features/lessons/lesson.dart';
import 'package:tracelight/features/sketch/sketch_screen.dart';
import 'package:tracelight/features/templates/template_catalog.dart';

import '../../test_app.dart';
import '../../test_images.dart';

void main() {
  ImageProvider? opened;
  Lesson? openedLesson;

  Widget fakeWorkspace(ImageProvider image) {
    opened = image;
    return const Scaffold(body: Text('workspace'));
  }

  Future<void> pumpHome(WidgetTester tester, {PhotoPicker? picker}) async {
    tester.view.physicalSize = const Size(1080, 3600);
    tester.view.devicePixelRatio = 3;
    addTearDown(tester.view.reset);
    opened = null;
    await tester.pumpWidget(
      testApp(
        HomeScreen(
          workspaceBuilder: fakeWorkspace,
          pickPhoto: picker ?? () async => null,
          lessons: loadLessons().lessons,
          lessonBuilder: (Lesson lesson) {
            openedLesson = lesson;
            return const Scaffold(body: Text('lesson'));
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
    expect(find.text('Colouring lessons'), findsOneWidget);
    await tester.tap(find.byKey(const Key('lesson-apple')));
    await tester.pumpAndSettle();
    expect(find.text('lesson'), findsOneWidget);
    expect(openedLesson!.id, 'apple');
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
    expect(find.text('Bài học tô màu'), findsOneWidget);
  });
}
