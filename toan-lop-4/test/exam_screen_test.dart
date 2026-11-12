import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:toan_lop_4/app_state.dart';
import 'package:toan_lop_4/logic/exam_session.dart';
import 'package:toan_lop_4/services/content_repository.dart';
import 'package:toan_lop_4/services/kv_store.dart';
import 'package:toan_lop_4/services/sound_service.dart';
import 'package:toan_lop_4/ui/app_theme.dart';
import 'package:toan_lop_4/ui/exam_screens.dart';

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
    // Kiểm tra chủ đề 8 (35 phút, 10 câu): câu 1 trắc nghiệm 10 × 81 (đáp án A: 810),
    // câu 6 trắc nghiệm, câu 10 điền số 21.186 : 33 = 642.
    final exam = loadExamFromDisk('kntt4.gen.chu-de-08');
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
          home: ExamRunScreen(exam: exam, sound: const SilentSoundService(), random: Random(3)),
        ),
      ),
    );
    await tester.pump();
    expect(find.text('35:00'), findsOneWidget);
    await tester.pump(const Duration(seconds: 3));
    expect(find.text('34:57'), findsOneWidget);

    // Câu 1: chọn 810 (đúng)
    await tapKey(tester, 'choice-a');
    await tapKey(tester, 'btn-next-q');
    expect(find.text('Câu 2/10'), findsOneWidget);
    await tapKey(tester, 'btn-prev');
    // Câu trả lời vẫn được giữ: lựa chọn A đang được chọn
    final tile = tester.widget<Semantics>(
      find
          .descendant(
            of: find.byKey(const ValueKey('choice-a')),
            matching: find.byWidgetPredicate((w) => w is Semantics && (w.properties.selected ?? false)),
          )
          .first,
    );
    expect(tile.properties.selected, isTrue);

    // Nhảy tới câu 4 rồi câu cuối (điền số 21.186 : 33 = 642) và nộp
    await tapKey(tester, 'qnav-3');
    expect(find.text('Câu 4/10'), findsOneWidget);
    await tapKey(tester, 'qnav-9');
    await tapKey(tester, 'numpad-6');
    await tapKey(tester, 'numpad-4');
    await tapKey(tester, 'numpad-2');
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

    // Xem lời giải câu 6 (chưa làm)
    await tester.scrollUntilVisible(find.byKey(const ValueKey('review-5')), 200);
    await tester.ensureVisible(find.byKey(const ValueKey('review-5')));
    await tester.pumpAndSettle();
    await tester.tap(find.byKey(const ValueKey('review-5')));
    await tester.pumpAndSettle();
    expect(find.text('Đáp án: 83 × 100 + 83'), findsOneWidget);
  });

  testWidgets('Tạm dừng bài thi → lưu bài dở → vào lại làm tiếp đúng câu trả lời', (tester) async {
    tester.view.physicalSize = const Size(1080, 2340);
    tester.view.devicePixelRatio = 2.5;
    addTearDown(tester.view.reset);
    final exam = loadExamFromDisk('kntt4.gen.tuan-04');
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
          home: Builder(
            builder: (context) => Scaffold(
              body: Center(
                child: TextButton(
                  key: const ValueKey('open'),
                  onPressed: () => Navigator.of(context).push(
                    MaterialPageRoute<void>(
                      builder: (_) => ExamRunScreen(exam: exam, sound: const SilentSoundService(), random: Random(1)),
                    ),
                  ),
                  child: const Text('mở'),
                ),
              ),
            ),
          ),
        ),
      ),
    );
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
    await tester.pumpWidget(
      AppScope(
        state: app,
        child: MaterialApp(
          theme: buildAppTheme(),
          home: ExamRunScreen(exam: exam, draft: draft, sound: const SilentSoundService(), random: Random(1)),
        ),
      ),
    );
    await tester.pump();
    expect(find.text(formatClock(15 * 60 - draft.elapsedSeconds)), findsOneWidget);
    expect(find.byKey(const ValueKey('qnav-0')), findsOneWidget);
  });

  testWidgets('Cảnh báo còn 1 phút', (tester) async {
    tester.view.physicalSize = const Size(1080, 2340);
    tester.view.devicePixelRatio = 2.5;
    addTearDown(tester.view.reset);
    final exam = loadExamFromDisk('kntt4.gen.tuan-04');
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
          home: ExamRunScreen(exam: exam, sound: const SilentSoundService()),
        ),
      ),
    );
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
    final exam = loadExamFromDisk('kntt4.gen.chu-de-08');
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
          home: ExamRunScreen(exam: exam, sound: const SilentSoundService()),
        ),
      ),
    );
    await tester.pump(const Duration(minutes: 35));
    await tester.pumpAndSettle();
    expect(find.text('Hết giờ! Bài đã được nộp tự động.'), findsOneWidget);
    expect(find.text('0'), findsWidgets);
  });
}
