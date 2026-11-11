import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter/painting.dart';
import 'package:flutter/services.dart';

import '../teacher/teacher_script.dart';
import '../templates/template_catalog.dart';

/// What the learner does in a step. The order is the classic way to colour
/// with depth: line → flat colour → shadows → highlights.
enum StepKind { outline, base, shadow, highlight, done }

/// Where the light comes from (shadows fall on the opposite side).
enum LightDirection {
  topLeft(Alignment.topLeft),
  topRight(Alignment.topRight);

  const LightDirection(this.alignment);

  final Alignment alignment;
}

/// Real-world colour pencils, matched to the colours in the lessons.
const Map<String, Color> kPencilColors = <String, Color>{
  'graphite': Color(0xFF5B5B5B),
  'white': Color(0xFFFFFFFF),
  'lemon': Color(0xFFF5E642),
  'yellow': Color(0xFFFFC93C),
  'orange': Color(0xFFF7941D),
  'red': Color(0xFFE53935),
  'crimson': Color(0xFFA31621),
  'pink': Color(0xFFF48FB1),
  'magenta': Color(0xFFD81B60),
  'purple': Color(0xFF8E44AD),
  'blue': Color(0xFF1E88E5),
  'sky': Color(0xFF64B5F6),
  'turquoise': Color(0xFF26C6DA),
  'green': Color(0xFF43A047),
  'darkgreen': Color(0xFF1B5E20),
  'lime': Color(0xFF9CCC65),
  'brown': Color(0xFF8D5524),
  'tan': Color(0xFFD7A86E),
  'darkbrown': Color(0xFF4E342E),
  'cream': Color(0xFFF3E5C0),
  'grey': Color(0xFF9E9E9E),
  'black': Color(0xFF212121),
  'skin': Color(0xFFF2C6A0),
  'rust': Color(0xFFC1622E),
  'lightpink': Color(0xFFF8C8DC),
};

/// One step of a lesson: the picture to show over the paper, what Lumi
/// says, and which pencils to pick up.
@immutable
class LessonStep {
  const LessonStep({
    required this.kind,
    required this.overlay,
    required this.lines,
    this.palette = const <String>[],
  });

  factory LessonStep.fromJson(String lessonId, Map<String, Object?> json) {
    final String mood = (json['mood'] as String?) ?? 'happy';
    return LessonStep(
      kind: StepKind.values.byName(json['kind']! as String),
      overlay: 'assets/lessons/$lessonId/${json['overlay']}.png',
      lines: <TeacherLine>[
        for (final Object? id in json['lines']! as List<Object?>)
          TeacherLine(id: id! as String, mood: mood),
      ],
      palette: <String>[
        for (final Object? p in (json['palette'] as List<Object?>?) ?? <Object?>[]) p! as String,
      ],
    );
  }

  final StepKind kind;

  /// Asset path of the overlay picture for this step.
  final String overlay;
  final List<TeacherLine> lines;

  /// Pencil ids (keys of [kPencilColors]).
  final List<String> palette;
}

@immutable
class Lesson {
  const Lesson({
    required this.id,
    required this.difficulty,
    required this.light,
    required this.steps,
  });

  factory Lesson.fromJson(Map<String, Object?> json) {
    final String id = json['id']! as String;
    return Lesson(
      id: id,
      difficulty: Difficulty.values.byName(json['difficulty']! as String),
      light: LightDirection.values.byName((json['light'] as String?) ?? 'topLeft'),
      steps: <LessonStep>[
        for (final Object? s in json['steps']! as List<Object?>)
          LessonStep.fromJson(id, s! as Map<String, Object?>),
      ],
    );
  }

  final String id;
  final Difficulty difficulty;
  final LightDirection light;
  final List<LessonStep> steps;

  String get titleKey => 'lesson.title.$id';
  String get thumbnail => 'assets/lessons/$id/thumb.png';
}

/// All lessons, from `assets/lessons/lessons.json`.
class LessonCatalog {
  const LessonCatalog(this.lessons);

  static const String asset = 'assets/lessons/lessons.json';
  static const LessonCatalog empty = LessonCatalog(<Lesson>[]);

  final List<Lesson> lessons;

  static LessonCatalog parse(String raw) {
    final Map<String, Object?> json = jsonDecode(raw) as Map<String, Object?>;
    return LessonCatalog(<Lesson>[
      for (final Object? l in json['lessons']! as List<Object?>)
        Lesson.fromJson(l! as Map<String, Object?>),
    ]);
  }

  static Future<LessonCatalog> load({AssetBundle? bundle}) async =>
      parse(await (bundle ?? rootBundle).loadString(asset));
}

/// Which step of a lesson the learner is on. Learners move at their own pace
/// with Back / Next.
class LessonProgress extends ChangeNotifier {
  LessonProgress(this.lesson);

  final Lesson lesson;
  int _index = 0;

  int get index => _index;
  LessonStep get step => lesson.steps[_index];
  bool get isFirst => _index == 0;
  bool get isLast => _index == lesson.steps.length - 1;
  int get total => lesson.steps.length;

  void next() {
    if (isLast) return;
    _index++;
    notifyListeners();
  }

  void previous() {
    if (isFirst) return;
    _index--;
    notifyListeners();
  }
}
