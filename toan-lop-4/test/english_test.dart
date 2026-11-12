import 'dart:convert';
import 'dart:io';
import 'dart:math';

import 'package:flutter/material.dart';

import 'package:flutter_test/flutter_test.dart';
import 'package:toan_lop_4/app_state.dart';
import 'package:toan_lop_4/services/content_repository.dart';
import 'package:toan_lop_4/services/kv_store.dart';
import 'package:toan_lop_4/services/sound_service.dart';
import 'package:toan_lop_4/tutor/voice_library.dart';
import 'package:toan_lop_4/ui/app_theme.dart';
import 'package:toan_lop_4/ui/quiz_screen.dart';
import 'package:toan_lop_4/logic/english.dart';
import 'package:toan_lop_4/logic/english_prompts.dart';
import 'package:toan_lop_4/ui/english_screens.dart';

import 'helpers.dart';

void main() {
  bilingualWidgetTests();

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
        final (word, choices) = englishQuizFor(englishVocab[ch]!, seed)!;
        expect(choices.toSet(), hasLength(3));
        expect(choices, contains(word.en));
      }
    }
  });

  test('đề tiếng Anh: mọi đề đều có bản dịch, giữ đúng số', () {
    final catalog = loadCatalogFromDisk();
    final missing = <String>[];
    for (final c in catalog.books.first.chapters) {
      for (final ref in [...c.lessons, ...c.advancedLessons]) {
        for (final p in loadLessonFromDisk(ref.id).problems) {
          final e = englishPrompt(p.prompt.text);
          if (e == null) {
            missing.add(templatize(p.prompt.text).$1);
            continue;
          }
          // Mọi số trong đề tiếng Việt đều có mặt trong đề tiếng Anh (1.234 → 1,234).
          for (final m in RegExp(r'\d{1,3}(?:\.\d{3})+|\d+').allMatches(p.prompt.text)) {
            if (RegExp(r'\d+\s*/\s*\d+').hasMatch(p.prompt.text)) break;
            expect(e, contains(englishDigits(m[0]!)), reason: '${p.prompt.text}\n→ $e');
          }
        }
      }
    }
    expect(missing.toSet(), isEmpty, reason: 'thêm bản dịch vào tool/en_translations.py rồi chạy tool/en_templates.py --dart');
  });

  test('đáp án và câu đọc tiếng Anh', () {
    expect(englishSpoken('16,387 × 6 = ?'), 'Sixteen thousand three hundred eighty-seven times six equals what?');
    expect(englishSpoken('? × 8 = 16/3'), 'What number times eight equals sixteen thirds');
    expect(englishSpoken('Each bottle holds 2/8 l of juice.'), 'Each bottle holds two eighths of a liter of juice.');
    expect(englishSpoken('Dũng has 3 kg.'), 'Dung has three kilograms.');
  });

  test('thẻ từ vựng từng bài: từ trọng tâm của bài đứng trước, đủ thẻ', () {
    final w = lessonVocab('Góc nhọn, góc tù, góc bẹt', 2);
    expect(w.first.en, 'acute angle');
    expect(w.length, greaterThanOrEqualTo(6));
    expect(lessonVocab('Yến, tạ, tấn', 4).map((x) => x.en), contains('quintal'));
    expect(lessonVocab('Luyện tập chung', 8).map((x) => x.en), contains('multiply'));
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
          for (final e in [englishPrompt(p.prompt.text), englishAnswer(p)]) {
            if (e != null && lib.lookup('en:$e') == null) missing.add(e);
          }
        }
      }
    }
    expect(missing, isEmpty, reason: 'chạy lại tool/make_voice.dart');
  });
}

Future<AppState> _bilingualState() async {
  final s = AppState(content: ContentRepository(), store: MemoryStore(), clock: () => DateTime(2026, 11, 11, 9));
  await s.init();
  await s.setBilingual(true);
  return s;
}

void bilingualWidgetTests() {
  testWidgets('Song ngữ: đề có bản tiếng Anh, làm đúng thì hiện đáp án tiếng Anh', (tester) async {
    tester.view.physicalSize = const Size(1080, 2340);
    tester.view.devicePixelRatio = 2.5;
    addTearDown(tester.view.reset);
    final s = (await tester.runAsync(_bilingualState))!;
    final lesson = loadLessonFromDisk('kntt4.c1.so-chan-so-le');
    await tester.pumpWidget(
      AppScope(
        state: s,
        child: MaterialApp(
          theme: buildAppTheme(),
          home: QuizScreen(lesson: lesson, isVip: false, sound: const SilentSoundService(), random: Random(7)),
        ),
      ),
    );
    await tester.pumpAndSettle();
    expect(find.byKey(const ValueKey('english-prompt')), findsOneWidget);
    expect(find.text('Which number below is even?'), findsOneWidget);
    await tester.ensureVisible(find.byKey(const ValueKey('choice-a')));
    await tester.tap(find.byKey(const ValueKey('choice-a')));
    await tester.pumpAndSettle();
    await tester.ensureVisible(find.byKey(const ValueKey('btn-check')));
    await tester.tap(find.byKey(const ValueKey('btn-check')));
    await tester.pumpAndSettle();
    expect(find.byKey(const ValueKey('english-line')), findsOneWidget);
    expect(find.textContaining('Eight thousand seven hundred ten!'), findsWidgets);
  });

  testWidgets('Trò chơi ôn từ: chọn đúng được sao, hết lượt xem điểm', (tester) async {
    tester.view.physicalSize = const Size(1080, 2340);
    tester.view.devicePixelRatio = 2.5;
    addTearDown(tester.view.reset);
    final words = lessonVocab('Góc nhọn, góc tù, góc bẹt', 2).take(4).toList();
    await tester.pumpWidget(
      MaterialApp(
        theme: buildAppTheme(),
        home: EnglishWordGameScreen(words: words, seed: 3),
      ),
    );
    await tester.pumpAndSettle();
    for (var i = 0; i < words.length; i++) {
      // Lượt chẵn: nghe từ tiếng Anh → chọn nghĩa; lượt lẻ: xem nghĩa → chọn từ tiếng Anh.
      final card = find.byKey(ValueKey('word-game-card-$i'));
      final shown = (tester.widgetList<Text>(find.descendant(of: card, matching: find.byType(Text))).last).data!;
      final w = words.firstWhere((x) => x.en == shown || x.vi == shown);
      final answer = i.isEven ? w.vi : w.en;
      await tester.ensureVisible(find.byKey(ValueKey('english-choice-$answer')));
      await tester.tap(find.byKey(ValueKey('english-choice-$answer')));
      await tester.pumpAndSettle();
      expect(find.text('${i + 1}'), findsWidgets);
      await tester.ensureVisible(find.byKey(const ValueKey('word-game-next')));
      await tester.tap(find.byKey(const ValueKey('word-game-next')));
      await tester.pumpAndSettle();
    }
    expect(find.text('Con đúng ${words.length}/${words.length} từ'), findsOneWidget);
  });
}
