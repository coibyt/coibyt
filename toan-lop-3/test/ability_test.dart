import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:toan_lop_3/app_state.dart';
import 'package:toan_lop_3/services/content_repository.dart';
import 'package:toan_lop_3/services/kv_store.dart';
import 'package:toan_lop_3/ui/ability_screens.dart';
import 'package:toan_lop_3/ui/app_theme.dart';
import 'package:toan_lop_3/logic/ability.dart';

import 'helpers.dart';

void main() {
  // Ngân hàng giả: dùng bài tập thật, gán mảng và độ khó 1–6 xoay vòng.
  final problems = [
    ...loadLessonFromDisk('kntt3.c4.nhan-2cs-1cs').problems,
    ...loadLessonFromDisk('kntt3.c4.chia-2cs-1cs').problems,
  ];
  List<AbilityItem> bank() => [
    for (final (i, p) in problems.indexed)
      AbilityItem(
        problem: p,
        domain: AbilityDomain.values[i % AbilityDomain.values.length],
        difficulty: 1 + (i ~/ AbilityDomain.values.length) % 6,
        lessonId: 'x',
      ),
  ];

  test('mỗi mảng 3 câu, xen kẽ mảng, không lặp câu', () {
    final t = AbilityTest(bank(), random: Random(1));
    final seen = <String>{};
    final domains = <AbilityDomain>[];
    while (!t.isFinished) {
      expect(seen.add(t.current.problem.id), isTrue);
      domains.add(t.current.domain);
      t.answer(correct: true);
    }
    expect(t.answers, hasLength(t.total));
    expect(domains.take(t.domains.length).toSet(), hasLength(t.domains.length));
  });

  test('đúng hết → điểm cao, sai hết → 0; hạng theo điểm', () {
    final good = AbilityTest(bank(), random: Random(2));
    while (!good.isFinished) {
      good.answer(correct: true);
    }
    final bad = AbilityTest(bank(), random: Random(2));
    while (!bad.isFinished) {
      bad.answer(correct: false);
    }
    final rg = good.result(DateTime(2026, 11, 11));
    final rb = bad.result(DateTime(2026, 11, 11));
    expect(rg.overall, greaterThan(rb.overall));
    expect(rb.overall, 0);
    expect(rb.rank, AbilityRank.mam);
    expect(AbilityRank.of(90), AbilityRank.kimCuong);
    expect(AbilityRank.of(65), AbilityRank.ngoiSao);
    final back = AbilityResult.fromJson(rg.toJson());
    expect(back.overall, rg.overall);
    expect(back.scores, rg.scores);
  });

  test('chủ đề → mảng kiến thức', () {
    expect(AbilityDomain.ofChapter(4), AbilityDomain.nhanChia);
    expect(AbilityDomain.ofChapter(3), AbilityDomain.hinhHoc);
    expect(AbilityDomain.ofChapter(7), isNull);
  });

  abilityAppTests();
  swapTests();
}

Future<AppState> _state(DateTime Function() clock) async {
  final s = AppState(content: ContentRepository(), store: MemoryStore(), clock: clock);
  await s.init();
  await s.selectBook('kntt3');
  return s;
}

Widget _wrap(AppState s, Widget child) => AppScope(
  state: s,
  child: MaterialApp(theme: buildAppTheme(), home: child),
);

void abilityAppTests() {
  testWidgets('AppState: ngân hàng câu hỏi, thưởng vàng lần đầu / lần sau theo tiến bộ', (tester) async {
    var now = DateTime(2026, 11, 11);
    final s = (await tester.runAsync(() => _state(() => now)))!;
    final bank = (await tester.runAsync(s.abilityBank))!;
    expect(bank, isNotEmpty);
    expect(bank.every((i) => i.difficulty >= 1 && i.difficulty <= 6), isTrue);
    expect(s.abilityDue, isTrue);
    final coins0 = s.progress.coins;
    final r1 = AbilityResult(at: now, scores: {AbilityDomain.nhanChia: 40}, correct: 1, total: 3, seconds: 60);
    expect(await tester.runAsync(() => s.saveAbilityResult(r1)), 30);
    expect(s.abilityDue, isFalse);
    now = now.add(const Duration(days: 3));
    final early = AbilityResult(at: now, scores: {AbilityDomain.nhanChia: 50}, correct: 2, total: 3, seconds: 60);
    expect(await tester.runAsync(() => s.saveAbilityResult(early)), 0, reason: 'chưa đủ 14 ngày: không thưởng');
    now = now.add(const Duration(days: 15));
    final r2 = AbilityResult(at: now, scores: {AbilityDomain.nhanChia: 70}, correct: 3, total: 3, seconds: 60);
    expect(await tester.runAsync(() => s.saveAbilityResult(r2)), 20 + 20);
    expect(s.progress.coins, coins0 + 30 + 40);
    expect(s.abilityResults, hasLength(3));
  });

  testWidgets('Màn giới thiệu → làm bài: cô tự đọc đề, chưa trả lời thì nhắc', (tester) async {
    tester.view.physicalSize = const Size(1080, 2340);
    tester.view.devicePixelRatio = 2.5;
    addTearDown(tester.view.reset);
    final s = (await tester.runAsync(() => _state(() => DateTime(2026, 11, 11))))!;
    // Bản làm bài kiểu thường (gameshow có kiểm thử riêng trong quiz_show_test.dart).
    await tester.pumpWidget(_wrap(s, const AbilityTestScreen()));
    for (var i = 0; i < 200 && find.byKey(const ValueKey('ability-progress')).evaluate().isEmpty; i++) {
      await tester.runAsync(() => Future<void>.delayed(const Duration(milliseconds: 50)));
      await tester.pump(const Duration(milliseconds: 100));
    }
    expect(find.byKey(const ValueKey('ability-progress')), findsOneWidget);
    expect(find.textContaining('Câu 1/'), findsOneWidget);
    await tester.tap(find.byKey(const ValueKey('btn-ability-answer')));
    await tester.pump(const Duration(seconds: 1));
    expect(find.textContaining('Câu 1/'), findsOneWidget, reason: 'chưa trả lời thì chưa sang câu');
    await tester.pumpWidget(const SizedBox());
    await tester.pump(const Duration(seconds: 10));
  });

  testWidgets('Màn kết quả: hạng, điểm, biểu đồ, so sánh lần trước, gợi ý', (tester) async {
    tester.view.physicalSize = const Size(1080, 2340);
    tester.view.devicePixelRatio = 2.5;
    addTearDown(tester.view.reset);
    final s = (await tester.runAsync(() => _state(() => DateTime(2026, 11, 11))))!;
    final prev = AbilityResult(
      at: DateTime(2026, 10, 1),
      scores: {for (final d in AbilityDomain.values) d: 40},
      correct: 6,
      total: 15,
      seconds: 500,
    );
    final now = AbilityResult(
      at: DateTime(2026, 11, 11),
      scores: {for (final d in AbilityDomain.values) d: d == AbilityDomain.hinhHoc ? 50 : 80},
      correct: 11,
      total: 15,
      seconds: 480,
    );
    await tester.pumpWidget(_wrap(s, AbilityResultScreen(result: now, previous: prev, coins: 54)));
    await tester.pump(const Duration(seconds: 2));
    expect(find.text(now.rank.title), findsOneWidget);
    expect(find.byKey(const ValueKey('ability-radar')), findsOneWidget);
    expect(find.text('Hình học'), findsWidgets);
    expect(find.textContaining('▲'), findsWidgets);
    expect(find.text('+54 vàng', findRichText: true), findsNothing); // nằm trong Row: kiểm tra chữ riêng
    expect(find.text(' +54 vàng'), findsOneWidget);
    await tester.pumpWidget(const SizedBox());
    await tester.pump(const Duration(seconds: 10));
  });
}

void swapTests() {
  test('đổi câu hỏi: cùng mảng, câu mới chưa dùng', () {
    final problems = [
      ...loadLessonFromDisk('kntt3.c4.nhan-2cs-1cs').problems,
      ...loadLessonFromDisk('kntt3.c4.chia-2cs-1cs').problems,
    ];
    final bank = [
      for (final p in problems)
        AbilityItem(problem: p, domain: AbilityDomain.nhanChia, difficulty: p.level, lessonId: 'x'),
    ];
    final t = AbilityTest(bank, random: Random(5));
    final before = t.current.problem.id;
    expect(t.swap(), isTrue);
    expect(t.current.problem.id, isNot(before));
    expect(t.current.domain, AbilityDomain.nhanChia);
  });
}
