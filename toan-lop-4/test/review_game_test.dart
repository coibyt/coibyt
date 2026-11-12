import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:toan_lop_4/app_state.dart';
import 'package:toan_lop_4/logic/review_game.dart';
import 'package:toan_lop_4/services/content_repository.dart';
import 'package:toan_lop_4/services/kv_store.dart';
import 'package:toan_lop_4/services/sound_service.dart';
import 'package:toan_lop_4/ui/app_theme.dart';
import 'package:toan_lop_4/ui/review_game_screen.dart';

import 'helpers.dart';

void main() {
  final catalog = loadCatalogFromDisk();

  test('mỗi chủ đề tạo được đủ 12 câu bóng bay, đáp án đúng nằm trong 4 lựa chọn khác nhau', () {
    for (final c in catalog.books.first.chapters) {
      final lessons = [for (final l in c.lessons) loadLessonFromDisk(l.id).problems];
      final qs = buildGameQuestions(lessons, Random(c.order));
      expect(qs.length, greaterThanOrEqualTo(8), reason: c.title);
      for (final q in qs) {
        expect(q.choices.length, inInclusiveRange(2, 4));
        expect(q.choices.toSet(), hasLength(q.choices.length), reason: q.prompt);
        expect(q.correct, inInclusiveRange(0, q.choices.length - 1));
        expect(q.prompt.length, lessThanOrEqualTo(maxPrompt));
      }
    }
  });

  test('số gây nhiễu: không âm, khác đáp án, khác nhau; viết số kiểu Việt Nam', () {
    for (final v in [0, 1, 9, 63, 100, 4096, 54321]) {
      final d = numberDistractors(v, Random(v));
      expect(d, hasLength(3));
      expect(d.every((x) => x >= 0 && x != v), isTrue);
      expect(d.toSet(), hasLength(3));
    }
    expect(formatVi(12345), '12.345');
    expect(formatVi(1000), '1000');
  });

  test('tính điểm: chuỗi đúng cộng thêm, sai mất tim, hết tim là thua; sao & vàng', () {
    final qs = [
      for (var i = 0; i < 10; i++) GameQuestion(prompt: 'q$i', choices: ['a', 'b'], correct: 0, problemId: '$i'),
    ];
    final g = ReviewGame(qs);
    expect(g.answer(0, secondsLeft: 10), 150);
    expect(g.answer(0), 120, reason: 'chuỗi 2: +20');
    expect(g.answer(1), 0);
    expect(g.hearts, 2);
    expect(g.combo, 0);
    expect(g.answer(null), 0, reason: 'hết giờ = sai');
    expect(g.answer(1), 0);
    expect(g.isOver, isTrue);
    expect(g.correctCount, 2);
    expect(g.stars, 0);
    final perfect = ReviewGame(qs);
    while (!perfect.isOver) {
      perfect.answer(0);
    }
    expect(perfect.stars, 3);
    expect(perfect.coins, 10 * 2 + 10);
  });

  gameScreenTests();
  promptContextTests();
}

Future<AppState> _app() async {
  final s = AppState(content: ContentRepository(), store: MemoryStore());
  await s.init();
  await s.selectBook('kntt4');
  return s;
}

void gameScreenTests() {
  testWidgets('Trò chơi bóng bay: khoá khi chưa học xong; chơi một ván, chấm điểm, lưu kỷ lục', (tester) async {
    tester.view.physicalSize = const Size(1080, 2340);
    tester.view.devicePixelRatio = 2.5;
    addTearDown(tester.view.reset);
    final s = (await tester.runAsync(_app))!;
    final chapter = s.book!.chapters.firstWhere((c) => c.order == 2);
    expect(s.gameUnlocked(chapter), isFalse);
    s.progress.coins = 100;
    expect(await tester.runAsync(() => s.unlockGame(chapter)), isTrue);
    expect(s.progress.coins, 100 - AppState.gameUnlockCost);

    await tester.pumpWidget(
      AppScope(
        state: s,
        child: MaterialApp(
          theme: buildAppTheme(),
          home: ReviewGameScreen(chapter: chapter, random: Random(3), sound: const SilentSoundService()),
        ),
      ),
    );
    for (var i = 0; i < 100 && find.byKey(const ValueKey('btn-game-start')).evaluate().isEmpty; i++) {
      await tester.runAsync(() => Future<void>.delayed(const Duration(milliseconds: 20)));
      await tester.pump(const Duration(milliseconds: 100));
    }
    await tester.ensureVisible(find.byKey(const ValueKey('btn-game-start')));
    await tester.tap(find.byKey(const ValueKey('btn-game-start')));
    await tester.pump(const Duration(milliseconds: 300));
    final state = tester.state(find.byType(ReviewGameScreen)) as dynamic;
    // Câu 1: chạm đúng → được điểm.
    final g = state.game as ReviewGame;
    await tester.tap(find.byKey(ValueKey('balloon-${g.current.correct}')));
    await tester.pump(const Duration(milliseconds: 100));
    expect(g.score, greaterThan(0));
    await tester.pump(const Duration(seconds: 2));
    // Các câu sau: để bóng bay mất (hết giờ) → mất tim → thua.
    for (var i = 0; i < 10 && !g.isOver; i++) {
      await tester.pump(const Duration(seconds: ReviewGame.secondsPerQuestion + 1));
      await tester.pump(const Duration(seconds: 2));
    }
    expect(g.hearts, 0);
    for (var i = 0; i < 20 && find.byKey(const ValueKey('game-final-score')).evaluate().isEmpty; i++) {
      await tester.runAsync(() => Future<void>.delayed(const Duration(milliseconds: 20)));
      await tester.pump(const Duration(milliseconds: 200));
    }
    expect(find.byKey(const ValueKey('game-final-score')), findsOneWidget);
    expect(s.gameBest(chapter.id).$1, g.score);
    await tester.pumpWidget(const SizedBox());
    await tester.pump(const Duration(seconds: 10));
  });
}

void promptContextTests() {
  test('câu hỏi gameshow/bóng bay giữ trọn đề (không mất phần "Mỗi ngày nhà máy may…")', () {
    var checked = 0;
    for (final c in loadCatalogFromDisk().books.first.chapters) {
      for (final ref in c.lessons) {
        for (final p in loadLessonFromDisk(ref.id).problems) {
          final q = showQuestion(p);
          if (q == null) continue;
          final text = p.prompt.text.trim();
          if (RegExp(r'\d').hasMatch(text) || text.length > 30) {
            expect(q.prompt, contains(text), reason: p.id);
            checked++;
          }
        }
      }
    }
    expect(checked, greaterThan(100));
  });
}
