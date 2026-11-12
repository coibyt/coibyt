import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:toan_lop_3/app_state.dart';
import 'package:toan_lop_3/logic/bilingual.dart';
import 'package:toan_lop_3/services/content_repository.dart';
import 'package:toan_lop_3/services/kv_store.dart';
import 'package:toan_lop_3/ui/app_theme.dart';
import 'package:toan_lop_3/ui/widgets/bilingual_widgets.dart';
import 'package:toan_lop_3/services/sound_service.dart';
import 'package:toan_lop_3/services/tutor_voice.dart';
import 'package:toan_lop_3/tutor/tutor_audio_service.dart';
import 'package:toan_lop_3/ui/quiz_screen.dart';
import 'package:toan_lop_3/tutor/voice_library.dart';
import 'dart:math';

import 'helpers.dart';

void main() {
  final en = parseEnglish(jsonDecode(File(englishPath).readAsStringSync()) as Map<String, dynamic>);

  test('số và đáp án đọc bằng tiếng Anh', () {
    expect(numberToEnglish(96), 'ninety-six');
    expect(numberToEnglish(1205), 'one thousand two hundred and five');
    expect(numberToEnglish(38097), 'thirty-eight thousand and ninety-seven');
    expect(answerInEnglish('96'), 'Ninety-six.');
    expect(answerInEnglish('45 cm'), 'Forty-five centimetres.');
    expect(answerInEnglish('7.384'), 'Seven thousand three hundred and eighty-four.');
    expect(answerInEnglish('bán kính'), isNull);
    expect(englishTemplate('3 pieces are {{b1}} cm long.'), '3 pieces are ___ cm long.');
  });

  test('mọi bài có bản tiếng Anh: tên bài, 6–8 từ vựng, dịch đủ câu lệnh và đề', () {
    for (final c in loadCatalogFromDisk().books.first.chapters) {
      for (final ref in [...c.lessons, ...c.advancedLessons]) {
        final e = en[ref.id];
        expect(e, isNotNull, reason: ref.id);
        expect(e!.title, isNotEmpty);
        expect(e.vocab.length, inInclusiveRange(6, 8), reason: ref.id);
        final l = loadLessonFromDisk(ref.id);
        for (final p in l.problems) {
          // Đề chỉ có số, phép tính (vd "109 ... 109") không cần dịch.
          if (RegExp(r'[A-Za-zÀ-ỹđĐ]').hasMatch(p.prompt.text)) {
            expect(e.of(p.prompt.text.trim()), isNotNull, reason: '${ref.id}: ${p.prompt.text}');
          }
          expect(e.of(p.displayInstruction), isNotNull, reason: '${ref.id}: ${p.displayInstruction}');
        }
      }
    }
  });

  testWidgets(
    'Luyện tập song ngữ: đề có dòng tiếng Anh, cô đọc tiếng Việt rồi tiếng Anh, đúng thì khen bằng tiếng Anh',
    (tester) async {
      tester.view.physicalSize = const Size(1080, 2340);
      tester.view.devicePixelRatio = 2.5;
      addTearDown(tester.view.reset);
      final english = SilentTutorVoice();
      final saved = TutorAudioService.english;
      TutorAudioService.english = TutorAudioService(speaker: 'en', fallback: english);
      addTearDown(() => TutorAudioService.english = saved);
      final app = (await tester.runAsync(() async {
        final s = AppState(content: ContentRepository(), store: MemoryStore());
        await s.init();
        await s.setBilingual(true);
        return s;
      }))!;
      final lesson = loadLessonFromDisk('kntt3.c4.nhan-2cs-1cs');
      await tester.pumpWidget(
        AppScope(
          state: app,
          child: MaterialApp(
            theme: buildAppTheme(),
            home: QuizScreen(lesson: lesson, isVip: false, sound: const SilentSoundService(), random: Random(7)),
          ),
        ),
      );
      for (var i = 0; i < 30 && find.byType(EnglishLine).evaluate().isEmpty; i++) {
        await tester.runAsync(() => Future<void>.delayed(const Duration(milliseconds: 20)));
        await tester.pump(const Duration(milliseconds: 200));
      }
      expect(find.text('Calculate.'), findsOneWidget, reason: 'câu lệnh "Tính." có bản tiếng Anh');
      for (var i = 0; i < 120 && !english.spoken.contains('21 × 3 = ?'); i++) {
        await tester.pump(const Duration(milliseconds: 250));
      }
      expect(english.spoken, contains('Calculate.'));
      expect(english.spoken, contains('21 × 3 = ?'), reason: 'đọc phép tính bằng tiếng Anh');
      // Trả lời đúng 63 → khen + đáp án bằng tiếng Anh.
      await tester.tap(find.byKey(const ValueKey('numpad-6')));
      await tester.tap(find.byKey(const ValueKey('numpad-3')));
      await tester.pump();
      await tester.tap(find.byKey(const ValueKey('btn-check')));
      for (var i = 0; i < 120 && !english.spoken.contains('Sixty-three.'); i++) {
        await tester.pump(const Duration(milliseconds: 250));
      }
      expect(english.spoken, contains('Sixty-three.'));
      await tester.pumpWidget(const SizedBox());
      await tester.pump(const Duration(seconds: 10));
    },
  );

  test('giọng tiếng Anh (11max) có đủ cho câu cố định, tên bài, từ vựng, đề và đáp án', () {
    final lib = VoiceLibrary.fromJson(
      jsonDecode(File('assets/voice/manifest.json').readAsStringSync()) as Map<String, dynamic>,
    );
    final lines = <String>{...BilingualLines.en()};
    for (final e in en.values) {
      lines.add(e.title);
      lines.addAll(e.vocab.map((v) => v.en));
    }
    for (final c in loadCatalogFromDisk().books.first.chapters) {
      for (final ref in [...c.lessons, ...c.advancedLessons]) {
        final e = en[ref.id]!;
        for (final p in loadLessonFromDisk(ref.id).problems) {
          lines.addAll([
            ?e.of(p.displayInstruction),
            ?e.of(p.prompt.text.trim()),
            ?answerInEnglish(p.solution.answerText),
          ]);
        }
      }
    }
    final missing = [
      for (final l in lines)
        if (lib.lookup('en:$l') == null) l,
    ];
    expect(missing, isEmpty, reason: '${missing.length}:\n${missing.take(10).join('\n')}');
    for (final l in BilingualLines.vi()) {
      expect(lib.lookup(l), isNotNull, reason: l);
    }
  });

  testWidgets('Trang chủ: bật "Toán + Tiếng Anh"; ôn từ vựng: chọn đúng nghĩa thì được điểm', (tester) async {
    tester.view.physicalSize = const Size(1080, 2340);
    tester.view.devicePixelRatio = 2.5;
    addTearDown(tester.view.reset);
    final app = (await tester.runAsync(() async {
      final s = AppState(content: ContentRepository(), store: MemoryStore());
      await s.init();
      return s;
    }))!;
    await tester.pumpWidget(
      AppScope(
        state: app,
        child: MaterialApp(
          theme: buildAppTheme(),
          home: Scaffold(
            body: ListenableBuilder(
              listenable: app,
              builder: (_, _) => BilingualSwitchCard(app: app),
            ),
          ),
        ),
      ),
    );
    expect(app.bilingual, isFalse);
    await tester.tap(find.byKey(const ValueKey('bilingual-switch')));
    await tester.pump();
    expect(app.bilingual, isTrue);
    expect(find.text('Đang bật: học Toán kèm tiếng Anh'), findsOneWidget);

    final lesson = en['kntt3.c4.nhan-2cs-1cs']!;
    await tester.pumpWidget(
      AppScope(
        state: app,
        child: MaterialApp(
          theme: buildAppTheme(),
          home: VocabGameScreen(english: lesson),
        ),
      ),
    );
    for (var round = 0; round < lesson.vocab.length; round++) {
      for (var i = 0; i < 40 && find.byKey(const ValueKey('vocab-word')).evaluate().isEmpty; i++) {
        await tester.pump(const Duration(milliseconds: 200));
      }
      final word = (tester.widget<Text>(
        find.descendant(of: find.byKey(const ValueKey('vocab-word')), matching: find.byType(Text)).at(1),
      )).data!;
      final vi = lesson.vocab.firstWhere((v) => v.en == word).vi;
      await tester.tap(find.widgetWithText(FilledButton, vi).first);
      for (var i = 0; i < 60; i++) {
        await tester.pump(const Duration(milliseconds: 200));
        if (find.byKey(const ValueKey('vocab-score')).evaluate().isNotEmpty) break;
        final w = find.descendant(of: find.byKey(const ValueKey('vocab-word')), matching: find.byType(Text));
        if (w.evaluate().length > 1 && (tester.widget<Text>(w.at(1))).data != word) break;
      }
    }
    expect(find.text('Con đúng ${lesson.vocab.length}/${lesson.vocab.length} từ!'), findsOneWidget);
    await tester.pumpWidget(const SizedBox());
    await tester.pump(const Duration(seconds: 10));
  });
}
