import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart' show IconData, Icons;
import 'package:flutter/painting.dart';
import 'package:flutter/services.dart';

import '../teacher/teacher_script.dart';
import '../templates/template_catalog.dart';

/// Course level, from first shapes to master studies.
enum LessonLevel {
  basic,
  intermediate,
  advanced;

  String get labelKey => 'academy.level.$name';
}

/// Subject of a lesson.
enum LessonTopic {
  stillLife(Icons.local_cafe),
  animals(Icons.pets),
  portrait(Icons.face),
  landscape(Icons.landscape),
  vehicles(Icons.directions_car),
  masters(Icons.museum),
  food(Icons.icecream),
  fantasy(Icons.auto_awesome);

  const LessonTopic(this.icon);

  final IconData icon;

  String get labelKey => 'academy.topic.$name';
}

/// One colour of a step's palette: the real pencil to pick up, and the
/// exact shade in the picture (used by the digital brush).
@immutable
class PaletteColor {
  const PaletteColor(this.pencil, this.color);

  /// Accepts `"red"` (pencil id) or `{"pencil": "red", "hex": "#C62828"}`.
  factory PaletteColor.fromJson(Object json) {
    if (json is String) {
      return PaletteColor(json, kPencilColors[json] ?? const Color(0xFF888888));
    }
    final Map<String, Object?> m = json as Map<String, Object?>;
    final String pencil = m['pencil']! as String;
    final String? hex = m['hex'] as String?;
    return PaletteColor(
      pencil,
      hex == null
          ? kPencilColors[pencil] ?? const Color(0xFF888888)
          : Color(int.parse('FF${hex.substring(1)}', radix: 16)),
    );
  }

  final String pencil;
  final Color color;

  String get hex =>
      '#${(color.toARGB32() & 0xFFFFFF).toRadixString(16).padLeft(6, '0').toUpperCase()}';
}

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
  'lightgrey': Color(0xFFD9D9D9),
  'mint': Color(0xFF98E0B5),
  'navy': Color(0xFF1F3A68),
  'teal': Color(0xFF2A666C),
};

/// One step of a lesson: the picture to show over the paper, what Lumi
/// says, and which pencils to pick up.
@immutable
class LessonStep {
  const LessonStep({
    required this.kind,
    required this.overlay,
    required this.lines,
    this.palette = const <PaletteColor>[],
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
      palette: <PaletteColor>[
        for (final Object? p in (json['palette'] as List<Object?>?) ?? <Object?>[])
          PaletteColor.fromJson(p!),
      ],
    );
  }

  final StepKind kind;

  /// Asset path of the overlay picture for this step.
  final String overlay;
  final List<TeacherLine> lines;

  /// Pencils for this step, with the exact shades of the picture.
  final List<PaletteColor> palette;
}

@immutable
class Lesson {
  const Lesson({
    required this.id,
    required this.difficulty,
    required this.light,
    required this.steps,
    this.level = LessonLevel.basic,
    this.topic = LessonTopic.stillLife,
    this.creditKey,
  });

  factory Lesson.fromJson(Map<String, Object?> json) {
    final String id = json['id']! as String;
    final LessonLevel level = LessonLevel.values.byName((json['level'] as String?) ?? 'basic');
    return Lesson(
      id: id,
      level: level,
      topic: LessonTopic.values.byName((json['topic'] as String?) ?? 'stillLife'),
      creditKey: json['credit'] as String?,
      difficulty: json['difficulty'] != null
          ? Difficulty.values.byName(json['difficulty']! as String)
          : Difficulty.values[level.index],
      light: LightDirection.values.byName((json['light'] as String?) ?? 'topLeft'),
      steps: <LessonStep>[
        for (final Object? s in json['steps']! as List<Object?>)
          LessonStep.fromJson(id, s! as Map<String, Object?>),
      ],
    );
  }

  final String id;
  final LessonLevel level;
  final LessonTopic topic;

  /// Translation key crediting the original artwork of a master study.
  final String? creditKey;
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
