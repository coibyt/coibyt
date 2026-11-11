import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:toan_lop_3/app_state.dart';
import 'package:toan_lop_3/services/content_repository.dart';
import 'package:toan_lop_3/services/kv_store.dart';
import 'package:toan_lop_3/services/sound_service.dart';
import 'package:toan_lop_3/ui/app_theme.dart';
import 'package:toan_lop_3/ui/exam_screens.dart';

import 'helpers.dart';

Future<void> tapKey(WidgetTester tester, String key) async {
  final f = find.byKey(ValueKey(key));
  await tester.ensureVisible(f);
  await tester.tap(f);
  await tester.pump();
  await tester.pump(const Duration(milliseconds: 400));
}

void main() {
  testWidgets('Làm đề: nhớ câu trả lời khi chuyển câu, đồng hồ chạy, nộp bài, xem kết quả', (tester) async {
    tester.view.physicalSize = const Size(1080, 2340);
    tester.view.devicePixelRatio = 2.5;
    addTearDown(tester.view.reset);
    final exam = loadExamFromDisk('kntt3.c4.de-1');
    final app = (await tester.runAsync(() async {
      final s = AppState(content: ContentRepository(), store: MemoryStore());
      await s.init();
      return s;
    }))!;

    await tester.pumpWidget(AppScope(
      state: app,
      child: MaterialApp(
        theme: buildAppTheme(),
        home: ExamRunScreen(exam: exam, sound: const SilentSoundService(), random: Random(3)),
      ),
    ));
    await tester.pump();
    expect(find.text('30:00'), findsOneWidget);
    await tester.pump(const Duration(seconds: 3));
    expect(find.text('29:57'), findsOneWidget);

    // Câu 1: chọn 86 (đúng)
    await tapKey(tester, 'choice-b');
    await tapKey(tester, 'btn-next-q');
    expect(find.text('Câu 2/10'), findsOneWidget);
    await tapKey(tester, 'btn-prev');
    // Câu trả lời vẫn được giữ: lựa chọn B đang được chọn
    final tile = tester.widget<Semantics>(find.descendant(
      of: find.byKey(const ValueKey('choice-b')),
      matching: find.byWidgetPredicate((w) => w is Semantics && (w.properties.selected ?? false)),
    ).first);
    expect(tile.properties.selected, isTrue);

    // Nhảy tới câu 4 (điền số 18 × 4 = 72)
    await tapKey(tester, 'qnav-3');
    await tapKey(tester, 'numpad-7');
    await tapKey(tester, 'numpad-2');
    // Tới câu cuối và nộp
    await tapKey(tester, 'qnav-9');
    await tapKey(tester, 'btn-submit');
    expect(find.textContaining('còn 8 câu chưa làm'), findsOneWidget);
    await tapKey(tester, 'btn-confirm-submit');
    await tester.pumpAndSettle();

    expect(find.byKey(const ValueKey('exam-score')), findsOneWidget);
    expect(find.text('2'), findsWidgets); // 2/10 điểm
    expect(find.text('Con cần ôn thêm:'), findsOneWidget);
    expect(app.progress.exams, hasLength(1));
    expect(app.progress.exams.single.score, 2);

    // Xem lời giải câu 2 (chưa làm)
    await tester.scrollUntilVisible(find.byKey(const ValueKey('review-1')), 200);
    await tester.ensureVisible(find.byKey(const ValueKey('review-1')));
    await tester.pumpAndSettle();
    await tester.tap(find.byKey(const ValueKey('review-1')));
    await tester.pumpAndSettle();
    expect(find.text('Đáp án: 21'), findsOneWidget);
  });

  testWidgets('Hết giờ tự nộp bài', (tester) async {
    tester.view.physicalSize = const Size(1080, 2340);
    tester.view.devicePixelRatio = 2.5;
    addTearDown(tester.view.reset);
    final exam = loadExamFromDisk('kntt3.c4.de-1');
    final app = (await tester.runAsync(() async {
      final s = AppState(content: ContentRepository(), store: MemoryStore());
      await s.init();
      return s;
    }))!;
    await tester.pumpWidget(AppScope(
      state: app,
      child: MaterialApp(theme: buildAppTheme(), home: ExamRunScreen(exam: exam, sound: const SilentSoundService())),
    ));
    await tester.pump(const Duration(minutes: 30));
    await tester.pumpAndSettle();
    expect(find.text('Hết giờ! Bài đã được nộp tự động.'), findsOneWidget);
    expect(find.text('0'), findsWidgets);
  });
}
