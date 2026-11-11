import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:toan_lop_3/app_state.dart';
import 'package:toan_lop_3/logic/exam_session.dart';
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
    expect(find.text('35:00'), findsOneWidget);
    await tester.pump(const Duration(seconds: 3));
    expect(find.text('34:57'), findsOneWidget);

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
    expect(find.byKey(const ValueKey('report-message')), findsOneWidget);
    expect(find.text('Theo từng phần kiến thức'), findsOneWidget);
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

  testWidgets('Tạm dừng bài thi → lưu bài dở → vào lại làm tiếp đúng câu trả lời', (tester) async {
    tester.view.physicalSize = const Size(1080, 2340);
    tester.view.devicePixelRatio = 2.5;
    addTearDown(tester.view.reset);
    final exam = loadExamFromDisk('kntt3.c4.kt15-nhan');
    final app = (await tester.runAsync(() async {
      final s = AppState(content: ContentRepository(), store: MemoryStore());
      await s.init();
      return s;
    }))!;
    await tester.pumpWidget(AppScope(
      state: app,
      child: MaterialApp(
        theme: buildAppTheme(),
        home: Builder(
          builder: (context) => Scaffold(
            body: Center(
              child: TextButton(
                key: const ValueKey('open'),
                onPressed: () => Navigator.of(context).push(MaterialPageRoute<void>(
                  builder: (_) => ExamRunScreen(exam: exam, sound: const SilentSoundService(), random: Random(1)),
                )),
                child: const Text('mở'),
              ),
            ),
          ),
        ),
      ),
    ));
    await tapKey(tester, 'open');
    expect(find.text('15:00'), findsOneWidget);
    await tapKey(tester, 'choice-b');
    await tester.pump(const Duration(seconds: 10));
    await tester.tap(find.byTooltip('Tạm dừng'));
    await tester.pump(const Duration(milliseconds: 400));
    await tapKey(tester, 'btn-exam-pause');
    await tester.pumpAndSettle();
    final draft = app.examDraft(exam.id)!;
    expect(draft.answers.keys, [0]);
    expect(draft.elapsedSeconds, inInclusiveRange(10, 12));

    // Vào lại bằng bài dở
    await tester.pumpWidget(AppScope(
      state: app,
      child: MaterialApp(
        theme: buildAppTheme(),
        home: ExamRunScreen(exam: exam, draft: draft, sound: const SilentSoundService(), random: Random(1)),
      ),
    ));
    await tester.pump();
    expect(find.text(formatClock(15 * 60 - draft.elapsedSeconds)), findsOneWidget);
    expect(find.byKey(const ValueKey('qnav-0')), findsOneWidget);
  });

  testWidgets('Cảnh báo còn 1 phút', (tester) async {
    tester.view.physicalSize = const Size(1080, 2340);
    tester.view.devicePixelRatio = 2.5;
    addTearDown(tester.view.reset);
    final exam = loadExamFromDisk('kntt3.c4.kt15-nhan');
    final app = (await tester.runAsync(() async {
      final s = AppState(content: ContentRepository(), store: MemoryStore());
      await s.init();
      return s;
    }))!;
    await tester.pumpWidget(AppScope(
      state: app,
      child: MaterialApp(theme: buildAppTheme(), home: ExamRunScreen(exam: exam, sound: const SilentSoundService())),
    ));
    await tester.pump(const Duration(minutes: 10, seconds: 1));
    expect(find.text('Còn 5 phút! Con kiểm tra lại bài nhé.'), findsOneWidget);
    await tester.pump(const Duration(minutes: 4));
    expect(find.text('Còn 1 phút!'), findsOneWidget);
    await tester.pump(const Duration(minutes: 1, seconds: 1));
    await tester.pumpAndSettle();
    expect(find.text('Hết giờ! Bài đã được nộp tự động.'), findsOneWidget);
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
    await tester.pump(const Duration(minutes: 35));
    await tester.pumpAndSettle();
    expect(find.text('Hết giờ! Bài đã được nộp tự động.'), findsOneWidget);
    expect(find.text('0'), findsWidgets);
  });
}
