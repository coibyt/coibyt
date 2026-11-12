import 'dart:convert';
import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:toan_lop_4/tutor/voice_library.dart';
import 'package:toan_lop_4/logic/english.dart';
import 'package:toan_lop_4/ui/english_screens.dart';

import 'helpers.dart';

void main() {
  test('đọc số bằng tiếng Anh', () {
    expect(englishNumber(0), 'zero');
    expect(englishNumber(15), 'fifteen');
    expect(englishNumber(42), 'forty-two');
    expect(englishNumber(305), 'three hundred five');
    expect(englishNumber(1250300), 'one million two hundred fifty thousand three hundred');
  });

  test('đọc phân số bằng tiếng Anh', () {
    expect(englishFraction(1, 2), 'one half');
    expect(englishFraction(3, 2), 'three halves');
    expect(englishFraction(3, 4), 'three quarters');
    expect(englishFraction(5, 8), 'five eighths');
    expect(englishFraction(7, 36), 'seven over thirty-six');
  });

  test('đọc phép tính bằng tiếng Anh', () {
    expect(englishEquation('24 × 8 = 192 (kg)'), 'Twenty-four times eight equals one hundred ninety-two kilograms.');
    expect(englishEquation('5/8 + 7/8 = 12/8 = 3/2'), 'Five eighths plus seven eighths equals three halves.');
    expect(englishEquation('1.242 : 6 = 207'), 'One thousand two hundred forty-two divided by six equals two hundred seven.');
    expect(englishEquation('22 × 3 = 66 (l)'), 'Twenty-two times three equals sixty-six liters.');
    expect(englishEquation('(96 - 28) : 2 + 1 = 35'), isNull); // có ngoặc: không đọc
    expect(englishEquation('a + b = 7'), isNull);
  });

  test('câu đố từ vựng: đủ 3 lựa chọn khác nhau, có đáp án đúng', () {
    for (final ch in englishVocab.keys) {
      for (var seed = 0; seed < 12; seed++) {
        final (word, choices) = englishQuizFor(ch, seed)!;
        expect(choices.toSet(), hasLength(3));
        expect(choices, contains(word.en));
      }
    }
  });

  test('Toán + Tiếng Anh: mọi câu tiếng Anh và câu tiếng Việt đi kèm đều có giọng 11max', () {
    final lib = VoiceLibrary.fromJson(
      jsonDecode(File('assets/voice/manifest.json').readAsStringSync()) as Map<String, dynamic>,
    );
    final missing = <String>[
      for (final l in englishFixedLines())
        if (lib.lookup('en:$l') == null) l,
      for (final l in englishVietnameseLines())
        if (lib.lookup(l) == null) l,
    ];
    final catalog = loadCatalogFromDisk();
    for (final c in catalog.books.first.chapters) {
      for (final ref in [...c.lessons, ...c.advancedLessons]) {
        for (final p in loadLessonFromDisk(ref.id).problems) {
          final e = englishSolution(p);
          if (e != null && lib.lookup('en:$e') == null) missing.add(e);
        }
      }
    }
    expect(missing, isEmpty, reason: 'chạy lại tool/make_voice.dart');
  });
}
