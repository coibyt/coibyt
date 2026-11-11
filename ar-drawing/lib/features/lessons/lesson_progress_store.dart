import 'dart:convert';

import 'package:flutter/widgets.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'lesson.dart';

/// Remembers how far the learner got in each lesson (on this device).
class LessonProgressStore extends ChangeNotifier {
  LessonProgressStore([Map<String, int>? reached, Map<String, int>? stars])
    : _reached = reached ?? <String, int>{},
      _stars = stars ?? <String, int>{};

  static const String _key = 'lesson_progress';
  static const String _starsKey = 'lesson_stars';

  /// Lesson id → best stars (1..3) earned when finishing it.
  final Map<String, int> _stars;

  /// Lesson id → highest step index reached.
  final Map<String, int> _reached;

  static Future<LessonProgressStore> load() async {
    try {
      final SharedPreferences prefs = await SharedPreferences.getInstance();
      Map<String, int> read(String key) {
        final String? raw = prefs.getString(key);
        if (raw == null) return <String, int>{};
        final Map<String, Object?> json = jsonDecode(raw) as Map<String, Object?>;
        return <String, int>{
          for (final MapEntry<String, Object?> e in json.entries) e.key: (e.value! as num).toInt(),
        };
      }

      return LessonProgressStore(read(_key), read(_starsKey));
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

  /// Best stars for [lesson] (0 = not finished yet).
  int stars(Lesson lesson) => _stars[lesson.id] ?? (isDone(lesson) ? 1 : 0);

  int totalStars(List<Lesson> lessons) => lessons.fold<int>(0, (int a, Lesson l) => a + stars(l));

  int doneCount(List<Lesson> lessons) => lessons.where(isDone).length;

  bool hasStars(Lesson lesson) => _stars.containsKey(lesson.id);

  /// Lessons finished with stars (since stars exist).
  int get starredCount => _stars.length;

  /// Saves the stars of a finished lesson; returns how many are new (0 when
  /// the learner did not beat their best).
  Future<int> recordStars(Lesson lesson, int value) async {
    final int v = value.clamp(1, 3);
    final int before = _stars[lesson.id] ?? 0;
    if (v <= before) return 0;
    _stars[lesson.id] = v;
    notifyListeners();
    try {
      final SharedPreferences prefs = await SharedPreferences.getInstance();
      await prefs.setString(_starsKey, jsonEncode(_stars));
    } on Object catch (e) {
      debugPrint('Could not save lesson stars: $e');
    }
    return v - before;
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
