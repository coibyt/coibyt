import 'dart:typed_data';

import 'package:flutter/material.dart';

import '../game/game_store.dart';
import '../game/goals.dart';
import 'gallery_store.dart';
import 'learning_path.dart';
import 'lesson.dart';
import 'lesson_progress_store.dart';
import 'widgets/lesson_complete.dart';

/// Gives the whole lesson list to screens deep in the tree (next lesson).
class LessonCatalogScope extends InheritedWidget {
  const LessonCatalogScope({super.key, required this.lessons, required super.child});

  final List<Lesson> lessons;

  static List<Lesson> of(BuildContext context) =>
      context.getInheritedWidgetOfExactType<LessonCatalogScope>()?.lessons ?? const <Lesson>[];

  @override
  bool updateShouldNotify(LessonCatalogScope old) => old.lessons != lessons;
}

/// Records the finished lesson (stars, coins, gallery) and shows the
/// celebration. [reopen] builds the lesson screen for "next" / "again".
Future<void> finishLesson(
  BuildContext context, {
  required Lesson lesson,
  required int stars,
  Uint8List? drawing,
  required Widget Function(Lesson lesson) reopen,
}) async {
  final LessonProgressStore? store = LessonProgressScope.maybeOf(context);
  final GameStore? game = GameScope.read(context);
  final GalleryStore? gallery = GalleryScope.read(context);
  final List<Lesson> all = LessonCatalogScope.of(context);
  final bool first = !(store?.hasStars(lesson) ?? false);
  final int doneBefore = all
      .where((Lesson l) => l.id != lesson.id && (store?.isDone(l) ?? false))
      .length;
  final int gained = await store?.recordStars(lesson, stars) ?? 0;
  final int coins = first ? 10 + 5 * stars : gained * 5;
  await game?.addCoins(coins);
  if (first) await game?.track(GameEvent.lessonDone);
  if (drawing != null) {
    await gallery?.add(
      GalleryItem(lessonId: lesson.id, stars: stars, at: DateTime.now(), png: drawing),
    );
  }
  final bool unlocked = first && doneBefore < kLessonsToUnlockGames;
  if (!context.mounted) return;
  final CompleteChoice? choice = await showLessonComplete(
    context,
    lesson: lesson,
    stars: stars,
    coins: coins,
    drawing: drawing,
    gamesUnlocked: unlocked,
  );
  if (!context.mounted) return;
  final NavigatorState nav = Navigator.of(context);
  switch (choice) {
    case CompleteChoice.again:
      await nav.pushReplacement(MaterialPageRoute<void>(builder: (_) => reopen(lesson)));
    case CompleteChoice.next:
      final Lesson? next = nextLesson(all, store);
      if (next == null || next.id == lesson.id && all.length > 1) {
        nav.pop();
      } else {
        await nav.pushReplacement(MaterialPageRoute<void>(builder: (_) => reopen(next)));
      }
    case CompleteChoice.home:
    case null:
      nav.popUntil((Route<dynamic> r) => r.isFirst);
  }
}
