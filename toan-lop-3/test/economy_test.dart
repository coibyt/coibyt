import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:toan_lop_3/app_state.dart';
import 'package:toan_lop_3/logic/economy.dart';
import 'package:toan_lop_3/logic/exam_session.dart';
import 'package:toan_lop_3/logic/quiz_session.dart';
import 'package:toan_lop_3/models/progress.dart';
import 'package:toan_lop_3/services/content_repository.dart';
import 'package:toan_lop_3/services/kv_store.dart';
import 'package:toan_lop_3/ui/app_theme.dart';
import 'package:toan_lop_3/ui/break_reminder.dart';
import 'package:toan_lop_3/ui/exam_screens.dart';
import 'package:toan_lop_3/ui/shop_screen.dart';

import 'content_test.dart' show correctAnswerOf;
import 'helpers.dart';

void main() {
  group('Tim', () {
    test('hồi 1 tim mỗi 30 phút, tối đa 5', () {
      final t0 = DateTime(2026, 11, 11, 8);
      final p = Progress(hearts: 2);
      regenHearts(p, t0); // bắt đầu đếm
      regenHearts(p, t0.add(const Duration(minutes: 29)));
      expect(p.hearts, 2);
      expect(nextHeartIn(p, t0.add(const Duration(minutes: 29))), const Duration(minutes: 1));
      regenHearts(p, t0.add(const Duration(minutes: 65)));
      expect(p.hearts, 4);
      regenHearts(p, t0.add(const Duration(hours: 5)));
      expect(p.hearts, 5);
      expect(nextHeartIn(p, t0.add(const Duration(hours: 5))), isNull);
    });

    test('mất tim theo số câu sai (không âm); ôn bài tốt hồi 2 tim', () {
      final now = DateTime(2026, 11, 11);
      final p = Progress();
      expect(loseHeartsForExam(p, 3, now), 3);
      expect(p.hearts, 2);
      expect(loseHeartsForExam(p, 7, now), 2);
      expect(p.hearts, 0);
      expect(restoreHeartsForPractice(p, correct: 5, total: 10), 0, reason: 'dưới 60% không hồi');
      expect(restoreHeartsForPractice(p, correct: 6, total: 10), 2);
      expect(p.hearts, 2);
    });
  });

  group('Quay thẻ', () {
    test('tỉ lệ công bố cộng lại 100% và khớp khi quay rất nhiều lần', () {
      expect(Rarity.values.fold(0, (s, r) => s + r.percent), 100);
      final r = Random(42);
      final counts = {for (final x in Rarity.values) x: 0};
      for (var i = 0; i < 20000; i++) {
        final x = rollRarity(r);
        counts[x] = counts[x]! + 1;
      }
      for (final x in Rarity.values) {
        expect(counts[x]! / 20000 * 100, closeTo(x.percent, 1.5), reason: x.label);
      }
    });

    test('quay trừ vàng; trùng thẻ được mảnh ghép; thiếu vàng không quay được', () {
      final p = Progress(coins: 1000);
      final r = Random(7);
      final seen = <String>{};
      var shards = 0;
      for (var i = 0; i < 10; i++) {
        final res = spin(p, r);
        expect(res.isNew, !seen.contains(res.pet.id));
        seen.add(res.pet.id);
        shards += res.shardsGained;
      }
      expect(p.coins, 0);
      expect(p.shards, shards);
      expect(p.companion, isNotNull, reason: 'thú cưng đầu tiên tự đi cùng bé');
      expect(() => spin(p, r), throwsA(isA<NotEnoughCoins>()));
    });

    test('đủ 30 mảnh: tự chọn thú cưng chưa có (đường chắc chắn, không phụ thuộc may rủi)', () {
      final p = Progress(shards: 30, pets: {'cun': 1});
      expect(choosePetWithShards(p, 'cun'), isFalse, reason: 'đã có');
      expect(choosePetWithShards(p, 'kylan'), isTrue);
      expect(p.shards, 0);
      expect(p.pets['kylan'], 1);
      expect(choosePetWithShards(p, 'rong'), isFalse, reason: 'hết mảnh');
    });

    test('mua và mặc trang phục cho cô Ong (giá cố định)', () {
      final p = Progress(coins: 100);
      expect(buyOutfit(p, 'kinh'), isFalse, reason: 'thiếu vàng');
      expect(buyOutfit(p, 'no_hong'), isTrue);
      expect(p.coins, 20);
      expect(p.outfit, 'no_hong');
      expect(buyOutfit(p, 'no_hong'), isFalse, reason: 'đã có');
    });
  });

  group('Chuỗi ngày & giữ lửa', () {
    test('nghỉ 1 ngày: tự giữ lửa (1 lần/tuần); nghỉ 2 ngày liền thì mất chuỗi', () {
      // Thứ Hai 9/11 → Thứ Ba 10/11 học; Thứ Tư 11/11 nghỉ; Thứ Năm 12/11 mở app.
      final p = Progress(activeDays: {'2026-11-09', '2026-11-10'});
      expect(applyStreakFreeze(p, DateTime(2026, 11, 12, 8)), isTrue);
      expect(p.freezeDays, {'2026-11-11'});
      expect(p.streak(DateTime(2026, 11, 12, 8)), 2, reason: 'giữ được chuỗi');
      p.activeDays.add('2026-11-12');
      expect(p.streak(DateTime(2026, 11, 12, 20)), 3);
      // Lại nghỉ Thứ Sáu 13/11 → Thứ Bảy 14/11: hết lượt tuần này
      expect(applyStreakFreeze(p, DateTime(2026, 11, 14)), isFalse);
      expect(p.streak(DateTime(2026, 11, 14)), 0);
      // Tuần sau lại có lượt mới
      expect(freezeAvailableThisWeek(p, DateTime(2026, 11, 16)), isTrue);
      final q = Progress(activeDays: {'2026-11-09'});
      expect(applyStreakFreeze(q, DateTime(2026, 11, 12)), isFalse, reason: 'nghỉ 2 ngày');
    });

    test('ngọn lửa lớn dần theo chuỗi', () {
      expect([0, 1, 3, 7, 14, 30].map(flameLevel).toList(), [0, 1, 2, 3, 4, 4]);
    });
  });

  group('AppState', () {
    TestWidgetsFlutterBinding.ensureInitialized();
    final lesson = loadLessonFromDisk('kntt3.c4.nhan-2cs-1cs');
    final exam = loadExamFromDisk('kntt3.c4.kt15-nhan');

    test('luyện tập: vàng + hồi tim + điểm theo ngày; thi: mất tim theo câu sai, vàng/mảnh khi điểm cao', () async {
      final now = DateTime(2026, 11, 11, 9);
      final app = AppState(content: ContentRepository(), store: MemoryStore(), clock: () => now);
      await app.init();

      // Thi bỏ trắng 3 câu → mất 3 tim
      final s1 = ExamSession(exam);
      for (var i = 0; i < 2; i++) {
        s1.setAnswer(i, correctAnswerOf(exam.items[i].problem));
      }
      final r1 = await app.recordExam(s1.submit());
      expect(r1.heartsChange, -3);
      expect(app.progress.hearts, 2);

      // Luyện tập tốt → +2 tim, có vàng
      final q = QuizSession(lesson: lesson, isVip: false);
      while (!q.isFinished) {
        q.submit(correctAnswerOf(q.current));
        q.next();
      }
      final r2 = await app.recordQuiz(q);
      expect(r2.heartsChange, 2);
      expect(r2.coins, r2.pointsEarned ~/ 2);
      expect(app.progress.hearts, 4);

      // Thi 10 điểm → vàng thưởng + 2 mảnh ghép, không mất tim
      final s2 = ExamSession(exam);
      for (var i = 0; i < exam.items.length; i++) {
        s2.setAnswer(i, correctAnswerOf(exam.items[i].problem));
      }
      final r3 = await app.recordExam(s2.submit());
      expect(r3.heartsChange, 0);
      expect(r3.shards, 2);
      expect(r3.coins, greaterThanOrEqualTo(50));
      expect(app.progress.pointsByDay['2026-11-11'], r1.pointsEarned + r2.pointsEarned + r3.pointsEarned);
    });

    test('gộp tiến độ hai máy giữ thú cưng, trang phục, điểm theo ngày', () {
      final a = Progress(
        pets: {'cun': 2},
        outfits: {'kinh'},
        pointsByDay: {'2026-11-10': 30},
        coins: 50,
        updatedAt: DateTime.utc(2026, 11, 10),
      );
      final b = Progress(
        pets: {'cun': 1, 'meo': 1},
        outfits: {'no_hong'},
        pointsByDay: {'2026-11-10': 20, '2026-11-11': 5},
        coins: 80,
        updatedAt: DateTime.utc(2026, 11, 11),
      );
      final m = Progress.merge(a, b);
      expect(m.pets, {'cun': 2, 'meo': 1});
      expect(m.outfits, {'kinh', 'no_hong'});
      expect(m.pointsByDay, {'2026-11-10': 30, '2026-11-11': 5});
      expect(m.coins, 80, reason: 'số dư lấy của máy mới hơn');
      expect(Progress.fromJson(m.toJson()).toJson(), m.toJson());
    });
  });

  group('Màn hình', () {
    Future<AppState> state(WidgetTester tester, {Progress? progress}) async => (await tester.runAsync(() async {
      final s = AppState(content: ContentRepository(), store: MemoryStore());
      await s.init();
      if (progress != null) await s.replaceProgress(progress);
      return s;
    }))!;

    void phone(WidgetTester tester) {
      tester.view.physicalSize = const Size(1080, 2340);
      tester.view.devicePixelRatio = 2.5;
      addTearDown(tester.view.reset);
    }

    testWidgets('hết tim: phòng thi khoá nút bắt đầu, chỉ đường ôn bài để hồi tim', (tester) async {
      phone(tester);
      final app = await state(
        tester,
        progress: Progress(bookId: 'kntt3', hearts: 0, heartsAt: DateTime.now()),
      );
      final ref = app.catalog.books.first.exams.first;
      await tester.pumpWidget(
        AppScope(
          state: app,
          child: MaterialApp(
            theme: buildAppTheme(),
            home: ExamIntroScreen(examRef: ref),
          ),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.byKey(const ValueKey('no-hearts')), findsOneWidget);
      expect(find.byKey(const ValueKey('btn-exam-start')), findsNothing);
      expect(find.byKey(const ValueKey('btn-review-for-hearts')), findsOneWidget);
    });

    testWidgets('cửa hàng: quay thẻ, xem tỉ lệ, thú cưng vào bộ sưu tập', (tester) async {
      phone(tester);
      final app = await state(tester, progress: Progress(bookId: 'kntt3', coins: 150));
      await tester.pumpWidget(
        AppScope(
          state: app,
          child: MaterialApp(
            theme: buildAppTheme(),
            home: ShopScreen(random: Random(3)),
          ),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.byKey(const ValueKey('odds-table')), findsOneWidget);
      expect(find.text('1%'), findsOneWidget);
      await tester.tap(find.byKey(const ValueKey('btn-spin')));
      await tester.pump(const Duration(seconds: 1));
      await tester.pumpAndSettle();
      expect(find.byKey(const ValueKey('spin-result')), findsOneWidget);
      expect(app.progress.coins, 50);
      expect(app.progress.pets.values.fold(0, (a, b) => a + b), 1);
      await tester.tap(find.text('Tuyệt!'));
      await tester.pumpAndSettle();
      final btn = tester.widget<FilledButton>(
        find.descendant(of: find.byKey(const ValueKey('btn-spin')), matching: find.byType(FilledButton)),
      );
      expect(btn.onPressed, isNull, reason: 'hết vàng thì nút quay bị khoá');
    });

    testWidgets('nhắc nghỉ mắt sau số phút phụ huynh chọn', (tester) async {
      phone(tester);
      final app = await state(tester, progress: Progress(bookId: 'kntt3'));
      await tester.runAsync(() => app.setBreakMinutes(20));
      final key = GlobalKey<NavigatorState>();
      await tester.pumpWidget(
        AppScope(
          state: app,
          child: BreakReminder(
            app: app,
            navigatorKey: key,
            child: MaterialApp(
              navigatorKey: key,
              theme: buildAppTheme(),
              home: const Scaffold(body: Text('học')),
            ),
          ),
        ),
      );
      await tester.pump(const Duration(minutes: 19));
      expect(find.byKey(const ValueKey('break-dialog')), findsNothing);
      await tester.pump(const Duration(minutes: 1));
      await tester.pump();
      expect(find.byKey(const ValueKey('break-dialog')), findsOneWidget);
    });
  });
}
