import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:toan_lop_3/app_state.dart';
import 'package:toan_lop_3/logic/show_lines.dart';
import 'package:toan_lop_3/services/content_repository.dart';
import 'package:toan_lop_3/services/kv_store.dart';
import 'package:toan_lop_3/services/show_music.dart';
import 'package:toan_lop_3/services/sound_service.dart';
import 'package:toan_lop_3/ui/app_theme.dart';
import 'package:toan_lop_3/ui/quiz_show_screen.dart';

void main() {
  seedTests();
  test('lời MC: số câu đọc bằng chữ', () {
    expect(ShowLines.questionNumber(1), 'Câu hỏi số một!');
    expect(ShowLines.questionNumber(15), 'Câu hỏi số mười lăm!');
    expect(ShowLines.all().length, greaterThan(25));
  });

  test('MC đọc đề: tách câu không lặp dấu chấm; khung lời chỉ hiện phần cuối', () {
    expect(promptSentences('Tính độ dài đường gấp khúc DAKEG.\nĐường gấp khúc DAKEG dài ? cm'), [
      'Tính độ dài đường gấp khúc DAKEG.',
      'Đường gấp khúc DAKEG dài ? cm.',
    ]);
    final long = List.filled(40, 'chữ').join(' ');
    final tail = bubbleTail(long);
    expect(tail.length, lessThanOrEqualTo(121));
    expect(tail.startsWith('…'), isTrue);
    expect(bubbleTail('ngắn'), 'ngắn');
  });

  testWidgets('Đấu trường: MC chào, có nhạc; chọn → chốt → lộ đáp án; trợ giúp 50:50, đổi câu; hết giờ', (
    tester,
  ) async {
    tester.view.physicalSize = const Size(1080, 2340);
    tester.view.devicePixelRatio = 2.5;
    addTearDown(tester.view.reset);
    final s = (await tester.runAsync(() async {
      final s = AppState(content: ContentRepository(), store: MemoryStore(), clock: () => DateTime(2026, 11, 11, 9));
      await s.init();
      await s.selectBook('kntt3');
      return s;
    }))!;
    final music = SilentShowMusic();
    await tester.pumpWidget(
      AppScope(
        state: s,
        child: MaterialApp(
          theme: buildAppTheme(),
          home: QuizShowScreen(random: Random(4), sound: const SilentSoundService(), music: music),
        ),
      ),
    );
    for (var i = 0; i < 200 && find.byKey(const ValueKey('btn-show-start')).evaluate().isEmpty; i++) {
      await tester.runAsync(() => Future<void>.delayed(const Duration(milliseconds: 20)));
      await tester.pump(const Duration(milliseconds: 100));
    }
    expect(find.byKey(const ValueKey('btn-show-start')), findsOneWidget);
    expect(music.played, contains('intro'));
    await tester.ensureVisible(find.byKey(const ValueKey('btn-show-start')));
    await tester.tap(find.byKey(const ValueKey('btn-show-start')));
    // MC đọc xong câu hỏi → đồng hồ chạy.
    Future<void> waitClock() async {
      for (var i = 0; i < 120; i++) {
        await tester.pump(const Duration(milliseconds: 500));
        if (find.byKey(const ValueKey('show-answer-0')).evaluate().isNotEmpty &&
            tester.state<State>(find.byType(QuizShowScreen)).mounted &&
            (find.text('$kShowSeconds').evaluate().isEmpty)) {
          break;
        }
      }
    }

    await waitClock();
    expect(music.played, contains('bg'));
    final st = tester.state(find.byType(QuizShowScreen)) as dynamic;
    final t = st.test;
    expect(t.index, 0);
    // 50:50 bỏ đi 2 đáp án sai.
    await tester.tap(find.byKey(const ValueKey('life-5050')));
    await tester.pump(const Duration(milliseconds: 300));
    // Chọn đáp án đúng rồi chốt.
    final correct = st.question.correct as int;
    await tester.tap(find.byKey(ValueKey('show-answer-$correct')));
    await tester.pump(const Duration(milliseconds: 300));
    await tester.tap(find.byKey(const ValueKey('btn-show-lock')));
    await tester.pump(const Duration(milliseconds: 100));
    expect(music.played, contains('lock'));
    for (var i = 0; i < 60 && t.index == 0; i++) {
      await tester.pump(const Duration(milliseconds: 500));
    }
    expect(t.index, 1);
    expect(t.answers.first.$2, isTrue);
    // Câu 2: đổi câu hỏi.
    await waitClock();
    final before = st.question.problemId;
    await tester.tap(find.byKey(const ValueKey('life-swap')));
    await tester.pump(const Duration(milliseconds: 300));
    expect(st.question.problemId, isNot(before));
    // Để hết giờ → tính sai, sang câu 3.
    await waitClock();
    await tester.pump(const Duration(seconds: kShowSeconds + 1));
    for (var i = 0; i < 60 && t.index == 1; i++) {
      await tester.pump(const Duration(milliseconds: 500));
    }
    expect(t.index, 2);
    expect(t.answers[1].$2, isFalse);
    await tester.pumpWidget(const SizedBox());
    await tester.pump(const Duration(seconds: 10));
  });
}

void seedTests() {
  test('hạt giống cố định: cùng mã câu → cùng thứ tự đáp án', () {
    expect(stableSeed('kntt3.c4.nhan-2cs-1cs.p01'), stableSeed('kntt3.c4.nhan-2cs-1cs.p01'));
    expect(stableSeed('a'), isNot(stableSeed('b')));
    expect(stableSeed('kntt3.c4.nhan-2cs-1cs.p01'), lessThan(1000000007));
  });
}
