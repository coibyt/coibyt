import 'dart:convert';

import 'package:flutter/widgets.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'lesson.dart';

/// Remembers how far the learner got in each lesson (on this device).
class LessonProgressStore extends ChangeNotifier {
  LessonProgressStore([Map<String, int>? reached]) : _reached = reached ?? <String, int>{};

  static const String _key = 'lesson_progress';

  /// Lesson id → highest step index reached.
  final Map<String, int> _reached;

  static Future<LessonProgressStore> load() async {
    try {
      final SharedPreferences prefs = await SharedPreferences.getInstance();
      final String? raw = prefs.getString(_key);
      if (raw != null) {
        final Map<String, Object?> json = jsonDecode(raw) as Map<String, Object?>;
        return LessonProgressStore(<String, int>{
          for (final MapEntry<String, Object?> e in json.entries) e.key: (e.value! as num).toInt(),
        });
      }
    } on Object catch (e) {
      debugPrint('Could not read lesson progress: $e');
    }
    return LessonProgressStore();
  }

  int reached(Lesson lesson) => _reached[lesson.id] ?? -1;

  /// 0..1: share of the lesson's steps reached.
  double fraction(Lesson lesson) => ((reached(lesson) + 1) / lesson.steps.length).clamp(0.0, 1.0);

  bool isDone(Lesson lesson) => reached(lesson) >= lesson.steps.length - 1;

  bool isStarted(Lesson lesson) => reached(lesson) >= 0;

  /// Records that [lesson] reached step [index] (never goes backwards).
  Future<void> record(Lesson lesson, int index) async {
    if (index <= reached(lesson)) return;
    _reached[lesson.id] = index;
    notifyListeners();
    try {
      final SharedPreferences prefs = await SharedPreferences.getInstance();
      await prefs.setString(_key, jsonEncode(_reached));
    } on Object catch (e) {
      debugPrint('Could not save lesson progress: $e');
    }
  }

  /// Overall progress over [lessons], 0..1.
  double overall(List<Lesson> lessons) => lessons.isEmpty
      ? 0
      : lessons.map(fraction).reduce((double a, double b) => a + b) / lessons.length;
}

/// Makes the [LessonProgressStore] available to the widget tree.
class LessonProgressScope extends InheritedNotifier<LessonProgressStore> {
  const LessonProgressScope({super.key, required LessonProgressStore store, required super.child})
    : super(notifier: store);

  static LessonProgressStore? maybeOf(BuildContext context) =>
      context.dependOnInheritedWidgetOfExactType<LessonProgressScope>()?.notifier;
}
