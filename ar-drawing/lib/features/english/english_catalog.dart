import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';

/// How a word is shown: a picture, a paint colour or a number.
enum WordKind { picture, colour, number }

@immutable
class EnglishWord {
  const EnglishWord({
    required this.id,
    required this.en,
    required this.vi,
    required this.sentence,
    required this.sentenceVi,
    this.image,
    this.color,
    this.number,
  });

  factory EnglishWord.fromJson(Map<String, Object?> j) {
    final String? hex = j['hex'] as String?;
    return EnglishWord(
      id: j['id']! as String,
      en: j['en']! as String,
      vi: j['vi']! as String,
      sentence: j['s']! as String,
      sentenceVi: j['sv']! as String,
      image: j['image'] as String?,
      color: hex == null ? null : Color(int.parse('FF${hex.substring(1)}', radix: 16)),
      number: (j['number'] as num?)?.toInt(),
    );
  }

  final String id;
  final String en;
  final String vi;
  final String sentence;
  final String sentenceVi;
  final String? image;
  final Color? color;
  final int? number;

  WordKind get kind => color != null
      ? WordKind.colour
      : number != null
      ? WordKind.number
      : WordKind.picture;

  /// Audio clip ids (`assets/audio/english/<id>.mp3`).
  String get audio => id;
  String get sentenceAudio => '${id}_s';
}

@immutable
class EnglishUnit {
  const EnglishUnit({
    required this.id,
    required this.titleVi,
    required this.titleEn,
    required this.words,
  });

  final String id;
  final String titleVi;
  final String titleEn;
  final List<EnglishWord> words;

  String title(String languageCode) => languageCode == 'vi' ? titleVi : titleEn;
}

/// All words of the English corner, the English word of each colouring
/// lesson and the English names of the pencil colours.
class EnglishCatalog {
  const EnglishCatalog({required this.units, required this.lessonWords, required this.pencils});

  static const EnglishCatalog empty = EnglishCatalog(
    units: <EnglishUnit>[],
    lessonWords: <String, ({String en, String vi})>{},
    pencils: <String, String>{},
  );

  final List<EnglishUnit> units;
  final Map<String, ({String en, String vi})> lessonWords;
  final Map<String, String> pencils;

  List<EnglishWord> get words => <EnglishWord>[for (final EnglishUnit u in units) ...u.words];

  EnglishWord? word(String id) {
    for (final EnglishUnit u in units) {
      for (final EnglishWord w in u.words) {
        if (w.id == id) return w;
      }
    }
    return null;
  }

  static EnglishCatalog parse(String words, String extra) {
    final Map<String, Object?> w = jsonDecode(words) as Map<String, Object?>;
    final Map<String, Object?> x = jsonDecode(extra) as Map<String, Object?>;
    EnglishUnit unit(Object? raw) {
      final Map<String, Object?> u = raw! as Map<String, Object?>;
      final Map<String, Object?> t = u['title']! as Map<String, Object?>;
      return EnglishUnit(
        id: u['id']! as String,
        titleVi: t['vi']! as String,
        titleEn: t['en']! as String,
        words: <EnglishWord>[
          for (final Object? e in u['words']! as List<Object?>)
            EnglishWord.fromJson(e! as Map<String, Object?>),
        ],
      );
    }

    return EnglishCatalog(
      units: <EnglishUnit>[for (final Object? u in w['units']! as List<Object?>) unit(u)],
      lessonWords: <String, ({String en, String vi})>{
        for (final MapEntry<String, Object?> e
            in (x['lessonWords']! as Map<String, Object?>).entries)
          e.key: (
            en: (e.value! as Map<String, Object?>)['en']! as String,
            vi: (e.value! as Map<String, Object?>)['vi']! as String,
          ),
      },
      pencils: <String, String>{
        for (final MapEntry<String, Object?> e in (x['pencils']! as Map<String, Object?>).entries)
          e.key: e.value! as String,
      },
    );
  }

  static const String wordsAsset = 'assets/english/words.json';
  static const String extraAsset = 'assets/english/extra.json';

  static Future<EnglishCatalog> load([AssetBundle? bundle]) async {
    try {
      final AssetBundle b = bundle ?? rootBundle;
      return parse(await b.loadString(wordsAsset), await b.loadString(extraAsset));
    } on Object catch (e) {
      debugPrint('No English words: $e');
      return empty;
    }
  }
}
