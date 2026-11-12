import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:toan_lop_4/app_state.dart';
import 'package:toan_lop_4/logic/leaderboard.dart';
import 'package:toan_lop_4/models/progress.dart';
import 'package:toan_lop_4/services/content_repository.dart';
import 'package:toan_lop_4/services/kv_store.dart';
import 'package:toan_lop_4/ui/app_theme.dart';
import 'package:toan_lop_4/ui/leaderboard_screen.dart';

void main() {
  test('danh hiệu: Tập sự → Học giả → Thần đồng, biết còn bao nhiêu điểm để lên bậc', () {
    expect(rankFor(0).title, 'Tập sự I');
    expect(rankFor(0).pointsToNext, 100);
    expect(rankFor(250).title, 'Tập sự III');
    expect(rankFor(300).title, 'Học giả I');
    expect(rankFor(300).tier, RankTier.hocGia);
    expect(rankFor(1099).nextTitle, 'Thần đồng I');
    expect(rankFor(1099).pointsToNext, 1);
    expect(rankFor(5000).title, 'Thần đồng III');
    expect(rankFor(5000).isMax, isTrue);
  });

  test('biệt danh ngẫu nhiên chỉ ghép từ danh sách an toàn', () {
    final r = Random(1);
    final re = RegExp('^(${nicknameAnimals.join('|')}) (${nicknameAdjectives.join('|')}) [1-9][0-9]\$');
    for (var i = 0; i < 300; i++) {
      expect(re.hasMatch(generateNickname(r)), isTrue);
    }
  });

  test('điểm theo tuần (từ thứ Hai) / tháng, mỗi ngày tối đa 1000', () {
    final p = Progress(pointsByDay: {'2026-11-08': 50, '2026-11-09': 30, '2026-11-11': 1500, '2026-10-31': 99});
    final wed = DateTime(2026, 11, 11, 10);
    expect(periodBounds(LeaderboardPeriod.week, wed).$1, DateTime(2026, 11, 9));
    expect(periodPoints(p, LeaderboardPeriod.week, wed), 30 + 1000);
    expect(periodPoints(p, LeaderboardPeriod.month, wed), 50 + 30 + 1000);
  });

  group('bảng thử (chưa có máy chủ)', () {
    final now = DateTime(2026, 11, 11);
    test('chèn đúng vị trí của bé, tính số điểm cần để vượt bạn ngay trên', () {
      final d = demoLeaderboard(period: LeaderboardPeriod.week, now: now, myNickname: 'Ong Kiên Trì 42', myPoints: 150);
      expect(d.isDemo, isTrue);
      expect(d.entries, hasLength(50));
      final me = d.entries.firstWhere((e) => e.isMe);
      expect(me.rank, d.myRank);
      if (d.myRank! > 1) {
        expect(d.above!.points, greaterThanOrEqualTo(150));
        expect(d.gapToAbove, d.above!.points - 150 + 1);
      }
      for (var i = 1; i < d.entries.length; i++) {
        expect(d.entries[i - 1].points, greaterThanOrEqualTo(d.entries[i].points));
      }
      // Cùng tuần → cùng các bạn mẫu
      final again = demoLeaderboard(
        period: LeaderboardPeriod.week,
        now: now.add(const Duration(days: 2)),
        myNickname: 'x',
        myPoints: 0,
      );
      expect(again.entries.first.nickname, d.entries.firstWhere((e) => !e.isMe).nickname);
    });

    test('0 điểm hoặc phụ huynh tắt → không có hạng', () {
      expect(demoLeaderboard(period: LeaderboardPeriod.week, now: now, myNickname: 'a', myPoints: 0).myRank, isNull);
      final off = demoLeaderboard(
        period: LeaderboardPeriod.week,
        now: now,
        myNickname: 'a',
        myPoints: 500,
        optedIn: false,
      );
      expect(off.myRank, isNull);
      expect(off.entries.any((e) => e.isMe), isFalse);
    });
  });

  test('đọc đúng định dạng phản hồi của máy chủ', () {
    final d = LeaderboardData.fromJson({
      'period': 'month',
      'start': '2026-11-01',
      'end': '2026-12-01',
      'entries': [
        {'rank': 1, 'nickname': 'Mèo Thông Minh 99', 'points': 420, 'isMe': false},
        {'rank': 2, 'nickname': 'Gấu Chăm Chỉ 12', 'points': 180, 'isMe': true},
      ],
      'me': {
        'rank': 2,
        'points': 180,
        'nickname': 'Gấu Chăm Chỉ 12',
        'optedIn': true,
        'above': {'rank': 1, 'nickname': 'Mèo Thông Minh 99', 'points': 420},
        'gapToAbove': 241,
      },
    });
    expect(d.period, LeaderboardPeriod.month);
    expect(d.entries.last.isMe, isTrue);
    expect(d.gapToAbove, 241);
    expect(d.above!.nickname, 'Mèo Thông Minh 99');
    expect(d.isDemo, isFalse);
  });

  testWidgets('màn bảng xếp hạng: ghi rõ dữ liệu mẫu, thẻ của bé, danh hiệu; tắt tham gia', (tester) async {
    tester.view.physicalSize = const Size(1080, 2340);
    tester.view.devicePixelRatio = 2.5;
    addTearDown(tester.view.reset);
    final app = (await tester.runAsync(() async {
      final s = AppState(content: ContentRepository(), store: MemoryStore());
      await s.init();
      final p = Progress(bookId: 'kntt4', totalPoints: 320, pointsByDay: {dayKey(DateTime.now()): 120});
      await s.replaceProgress(p);
      return s;
    }))!;
    await tester.pumpWidget(
      AppScope(
        state: app,
        child: MaterialApp(theme: buildAppTheme(), home: const LeaderboardScreen()),
      ),
    );
    await tester.pumpAndSettle();
    expect(find.byKey(const ValueKey('demo-note')), findsOneWidget);
    expect(find.text('Danh hiệu: Học giả I'), findsOneWidget);
    expect(find.textContaining('(con)'), findsWidgets);
    expect(find.textContaining(app.nickname), findsWidgets);
    expect(find.byKey(const ValueKey('gap-text')), findsOneWidget);

    await tester.runAsync(() => app.setLeaderboardOptIn(false));
    await tester.pumpWidget(
      AppScope(
        state: app,
        child: MaterialApp(
          theme: buildAppTheme(),
          home: LeaderboardScreen(key: UniqueKey()),
        ),
      ),
    );
    await tester.pumpAndSettle();
    expect(find.text('Bố mẹ đã tắt bảng xếp hạng cho con.'), findsOneWidget);
  });
}
