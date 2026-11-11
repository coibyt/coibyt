import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';

/// One sentence Lumi says. Its text lives in the language files under
/// `teacher.lines.<id>`; its voice-over (if recorded) in
/// `assets/audio/teacher/<language>/<id>.mp3`.
@immutable
class TeacherLine {
  const TeacherLine({required this.id, this.mood = 'happy'});

  factory TeacherLine.fromJson(Map<String, Object?> json) =>
      TeacherLine(id: json['id']! as String, mood: (json['mood'] as String?) ?? 'happy');

  final String id;

  /// Pose hint for the character (used by the sprite states in a later phase).
  final String mood;

  String get textKey => 'teacher.lines.$id';
}

/// All of Lumi's scripts, read from `assets/teacher/scripts.json`:
/// `{"home_welcome": [{"id": "home_welcome_1", "mood": "wave"}, ...]}`.
class TeacherScripts {
  TeacherScripts(this._scripts);

  static const String asset = 'assets/teacher/scripts.json';

  final Map<String, List<TeacherLine>> _scripts;

  Iterable<String> get ids => _scripts.keys;

  List<TeacherLine> operator [](String id) => _scripts[id] ?? const <TeacherLine>[];

  static TeacherScripts parse(String raw) {
    final Map<String, Object?> json = jsonDecode(raw) as Map<String, Object?>;
    return TeacherScripts(<String, List<TeacherLine>>{
      for (final MapEntry<String, Object?> e in json.entries)
        e.key: <TeacherLine>[
          for (final Object? line in e.value! as List<Object?>)
            TeacherLine.fromJson(line! as Map<String, Object?>),
        ],
    });
  }

  static Future<TeacherScripts> load({AssetBundle? bundle}) async =>
      parse(await (bundle ?? rootBundle).loadString(asset));
}
