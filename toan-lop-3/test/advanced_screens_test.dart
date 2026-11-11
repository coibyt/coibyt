import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:toan_lop_3/app_state.dart';
import 'package:toan_lop_3/logic/badges.dart';
import 'package:toan_lop_3/services/content_repository.dart';
import 'package:toan_lop_3/services/kv_store.dart';
import 'package:toan_lop_3/ui/advanced_screens.dart';
import 'package:toan_lop_3/ui/app_theme.dart';
import 'package:toan_lop_3/ui/quiz_screen.dart';

Future<AppState> _state() async {
  final s = AppState(content: ContentRepository(), store: MemoryStore(), clock: () => DateTime(2026, 11, 11, 9));
  await s.init();
  await s.selectBook('kntt3');
  return s;
}

void main() {
  testWidgets('Nâng cao: logic mở khoá theo tuần, chìa khoá vàng, thử thách ngày', (tester) async {
    final s = (await tester.runAsync(_state))!;
    final all = advancedLessonsOf(s.book!);
    expect(all, hasLength(36));
    final week10 = all.firstWhere((e) => AppState.advancedWeek(e.$1.id) == 10).$1;
    expect(s.advancedUnlocked(week10.id), isFalse);
    final (done, total) = s.advancedProgress(week10.id);
    expect((done, total > 0), (0, true));
    s.progress.coins = 10;
    expect(await tester.runAsync(() => s.unlockAdvanced(week10.id)), isFalse, reason: 'không đủ vàng');
    s.progress.coins = 100;
    expect(await tester.runAsync(() => s.unlockAdvanced(week10.id)), isTrue);
    expect(s.progress.coins, 100 - AppState.advUnlockCost);
    expect(s.advancedUnlocked(week10.id), isTrue);
    final full = (await tester.runAsync(() => s.content.loadLesson(week10.src)))!;
    final daily = s.dailyChallenge(full, s.now());
    expect(daily.problems, hasLength(1));
    expect(isAdvancedLessonId(daily.id), isFalse, reason: 'thử thách ngày không tính vào huy hiệu nâng cao');
  });

  testWidgets('Màn Nâng cao: tuần này, khoá → mở bằng vàng; thử thách hôm nay mở bài 1 câu', (tester) async {
    tester.view.physicalSize = const Size(1080, 2340);
    tester.view.devicePixelRatio = 2.5;
    addTearDown(tester.view.reset);
    final s = (await tester.runAsync(_state))!;
    s.progress.coins = 200;
    await tester.pumpWidget(
      AppScope(
        state: s,
        child: MaterialApp(theme: buildAppTheme(), home: AdvancedScreen(book: s.book!)),
      ),
    );
    await tester.pump(const Duration(seconds: 1));
    expect(find.byKey(const ValueKey('adv-hero')), findsOneWidget);
    expect(find.text('Tuần này'), findsOneWidget);
    final w10 = advancedLessonsOf(s.book!).firstWhere((e) => AppState.advancedWeek(e.$1.id) == 10).$1;
    await tester.ensureVisible(find.byKey(ValueKey('adv-open-${w10.id}')));
    await tester.tap(find.byKey(ValueKey('adv-open-${w10.id}')));
    await tester.pumpAndSettle();
    expect(find.byKey(const ValueKey('adv-locked-dialog')), findsOneWidget);
    await tester.tap(find.byKey(const ValueKey('adv-unlock-coins')));
    for (var i = 0; i < 20 && find.byKey(const ValueKey('btn-practice')).evaluate().isEmpty; i++) {
      await tester.runAsync(() => Future<void>.delayed(const Duration(milliseconds: 20)));
      await tester.pump(const Duration(milliseconds: 200));
    }
    expect(find.byKey(const ValueKey('btn-practice')), findsOneWidget, reason: 'vào bài nâng cao');
    expect(s.advancedUnlocked(w10.id), isTrue);
    await tester.pageBack();
    await tester.pumpAndSettle();
    await tester.ensureVisible(find.byKey(const ValueKey('adv-daily')));
    await tester.pumpAndSettle();
    await tester.tap(find.byKey(const ValueKey('adv-daily')));
    for (var i = 0; i < 30 && find.byType(QuizScreen).evaluate().isEmpty; i++) {
      await tester.runAsync(() => Future<void>.delayed(const Duration(milliseconds: 20)));
      await tester.pump(const Duration(milliseconds: 200));
    }
    expect(find.byType(QuizScreen), findsOneWidget);
    await tester.pump(const Duration(seconds: 1));
    expect(find.text('1/1'), findsOneWidget);
    await tester.pumpWidget(const SizedBox());
    await tester.pump(const Duration(seconds: 10));
  });
}
