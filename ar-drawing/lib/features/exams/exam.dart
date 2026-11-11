import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';

/// Kinds of art exams, like the Vietnamese school calendar.
enum ExamType {
  /// 15-minute quick sketch.
  quiz15(15),

  /// One-period test (45 minutes): a finished, coloured drawing.
  period(45),

  /// Mid-term: colouring and shading on a printed outline.
  midterm(60),

  /// End-of-term: colouring and shading, bigger subject.
  finalExam(90);

  const ExamType(this.minutes);

  final int minutes;

  String get labelKey => 'exam.type.$name';

  static ExamType parse(String raw) =>
      raw == 'final' ? ExamType.finalExam : ExamType.values.byName(raw);
}

/// What the student has to do.
enum ExamTask {
  /// Freehand outline from the model (no colour graded).
  sketch,

  /// Freehand drawing, then colour it.
  drawColor,

  /// The outline is printed on the sheet; colour and shade it.
  colorShade;

  static ExamTask parse(String raw) => switch (raw) {
    'sketch' => ExamTask.sketch,
    'draw_color' => ExamTask.drawColor,
    'color_shade' => ExamTask.colorShade,
    _ => throw FormatException('Unknown exam task $raw'),
  };

  /// Whether the outline is printed on the exam sheet.
  bool get printedOutline => this == ExamTask.colorShade;

  /// Whether colours are graded.
  bool get gradesColor => this != ExamTask.sketch;
}

/// The three marks of the report card.
enum Criterion { proportion, color, creativity }

/// One exam paper from `assets/exams/exams.json`.
@immutable
class Exam {
  const Exam({
    required this.id,
    required this.type,
    required this.subject,
    required this.task,
    required this.weights,
    this.duration,
  });

  factory Exam.fromJson(Map<String, Object?> json) {
    final Map<String, Object?> w = json['weights']! as Map<String, Object?>;
    final ExamType type = ExamType.parse(json['type']! as String);
    final int? minutes = (json['durationMin'] as num?)?.toInt();
    return Exam(
      id: json['id']! as String,
      type: type,
      subject: json['subject']! as String,
      task: ExamTask.parse(json['task']! as String),
      weights: <Criterion, double>{
        for (final Criterion c in Criterion.values)
          if (w[c.name] != null) c: (w[c.name]! as num).toDouble(),
      },
      duration: minutes == null ? null : Duration(minutes: minutes),
    );
  }

  final String id;
  final ExamType type;

  /// Lesson picture used as the model (`assets/lessons/<subject>/`).
  final String subject;
  final ExamTask task;

  /// Weight of each graded criterion (they add up to 1).
  final Map<Criterion, double> weights;

  /// Overrides the type's standard length.
  final Duration? duration;

  Duration get timeLimit => duration ?? Duration(minutes: type.minutes);

  String get titleKey => 'exam.title.$id';
  String get modelAsset => 'assets/lessons/$subject/4_final.png';
  String get outlineAsset => 'assets/lessons/$subject/1_outline.png';
  String get thumbnail => 'assets/lessons/$subject/thumb.png';

  /// Minimum total (out of 10) to pass.
  static const double passMark = 5;
}

class ExamCatalog {
  const ExamCatalog(this.exams);

  static const String asset = 'assets/exams/exams.json';
  static const ExamCatalog empty = ExamCatalog(<Exam>[]);

  final List<Exam> exams;

  static ExamCatalog parse(String raw) {
    final Map<String, Object?> json = jsonDecode(raw) as Map<String, Object?>;
    return ExamCatalog(<Exam>[
      for (final Object? e in json['exams']! as List<Object?>)
        Exam.fromJson(e! as Map<String, Object?>),
    ]);
  }

  static Future<ExamCatalog> load({AssetBundle? bundle}) async =>
      parse(await (bundle ?? rootBundle).loadString(asset));
}
