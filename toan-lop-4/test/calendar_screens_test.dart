import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:toan_lop_4/app_state.dart';
import 'package:toan_lop_4/services/content_repository.dart';
import 'package:toan_lop_4/services/kv_store.dart';
import 'package:toan_lop_4/ui/app_theme.dart';
import 'package:toan_lop_4/ui/calendar_screen.dart';
import 'package:toan_lop_4/ui/exam_screens.dart';

Future<AppState> _state(DateTime now) async {
  final s = AppState(content: ContentRepository(), store: MemoryStore(), clock: () => now);
  await s.init();
  await s.selectBook('kntt4');
  return s;
}

void phone(WidgetTester tester) {
  tester.view.physicalSize = const Size(1080, 2340);
  tester.view.devicePixelRatio = 2.5;
  addTearDown(tester.view.reset);
}

void main() {
  testWidgets('Lịch học: bài hôm nay, tuần hiện tại mở sẵn, chọn học kì 2', (tester) async {
    phone(tester);
    // Thứ Tư 11/11/2026 = tuần 10.
    final s = (await tester.runAsync(() => _state(DateTime(2026, 11, 11, 9))))!;
    expect(s.calendar, isNotNull);
    expect(currentWeek(s.calendar!, s.now()), 10);
    await tester.pumpWidget(
      AppScope(
        state: s,
        child: MaterialApp(
          theme: buildAppTheme(),
          home: CalendarScreen(book: s.book!),
        ),
      ),
    );
    await tester.pump(const Duration(seconds: 1));
    expect(find.text('Bài học hôm nay'), findsOneWidget);
    expect(find.byKey(const ValueKey('day-2026-11-11')), findsOneWidget, reason: 'tuần này mở sẵn');
    await tester.ensureVisible(find.text('Học kì 2'));
    await tester.pump();
    await tester.tap(find.text('Học kì 2'));
    await tester.pump(const Duration(seconds: 1));
    expect(find.text('Tuần 20'), findsOneWidget);
    await tester.pumpWidget(const SizedBox());
    await tester.pump(const Duration(seconds: 10));
  });

  testWidgets('Luyện thi: lộ trình theo tuần, đếm ngược, lọc loại đề', (tester) async {
    phone(tester);
    final s = (await tester.runAsync(() => _state(DateTime(2026, 11, 11, 9))))!;
    await tester.pumpWidget(
      AppScope(
        state: s,
        child: MaterialApp(
          theme: buildAppTheme(),
          home: ExamListScreen(book: s.book!),
        ),
      ),
    );
    await tester.pump(const Duration(seconds: 1));
    expect(find.byKey(const ValueKey('exam-stats')), findsOneWidget);
    expect(find.byKey(const ValueKey('exam-countdown')), findsOneWidget);
    expect(find.byKey(const ValueKey('exam-kntt4.gen.tuan-10')), findsOneWidget);
    await tester.ensureVisible(find.byKey(const ValueKey('exam-filter-finals')));
    await tester.pump();
    await tester.tap(find.byKey(const ValueKey('exam-filter-finals')));
    await tester.pump(const Duration(seconds: 1));
    expect(find.byKey(const ValueKey('exam-kntt4.gen.tuan-10')), findsNothing);
    expect(find.byKey(const ValueKey('exam-kntt4.gen.cuoi-hk1-de-1')), findsOneWidget);
    await tester.pumpWidget(const SizedBox());
    await tester.pump(const Duration(seconds: 10));
  });
}
