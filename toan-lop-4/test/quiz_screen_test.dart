import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:toan_lop_4/logic/tutor.dart';
import 'package:toan_lop_4/models/content.dart';
import 'package:toan_lop_4/services/sound_service.dart';
import 'package:toan_lop_4/ui/app_theme.dart';
import 'package:toan_lop_4/ui/quiz_screen.dart';
import 'package:toan_lop_4/ui/widgets/chalk.dart';

import 'helpers.dart';

Future<void> pumpQuiz(WidgetTester tester, Lesson lesson, {bool vip = false}) async {
  tester.view.physicalSize = const Size(1080, 2340);
  tester.view.devicePixelRatio = 2.5;
  addTearDown(tester.view.reset);
  await tester.pumpWidget(
    MaterialApp(
      theme: buildAppTheme(),
      home: QuizScreen(lesson: lesson, isVip: vip, sound: const SilentSoundService(), random: Random(7)),
    ),
  );
  await tester.pumpAndSettle();
}

Future<void> tapKey(WidgetTester tester, String key) async {
  await tester.ensureVisible(find.byKey(ValueKey(key)));
  await tester.tap(find.byKey(ValueKey(key)));
  await tester.pumpAndSettle();
}

/// Cô Ong không cho xem lời giải ngay: xin gợi ý trước (nếu còn ở bước trả lời).
Future<void> openSolution(WidgetTester tester) async {
  if (find.byKey(const ValueKey('btn-hint')).evaluate().isNotEmpty) await tapKey(tester, 'btn-hint');
  await tapKey(tester, 'btn-solution');
}

void main() {
  // Bài 9 câu: p01 40.140 × 2, p02 16.387 × 6 (điền số), p03 trắc nghiệm 404.173 × 2, p04 kéo thả,
  // p05 nối, …, p09 có lời giải VIP.
  final lesson = loadLessonFromDisk('kntt4.c8.nhan-voi-so-co-mot-chu-so');
  final n = lesson.problems.length;

  Future<void> skip(WidgetTester tester, int count) async {
    for (var i = 0; i < count; i++) {
      await openSolution(tester);
      await tester.tap(find.byTooltip('Đóng'));
      await tester.pumpAndSettle();
      await tapKey(tester, 'btn-next');
    }
  }

  Future<void> typeNumber(WidgetTester tester, String digits) async {
    for (final d in digits.split('')) {
      await tapKey(tester, 'numpad-$d');
    }
  }

  testWidgets('Điền số: nhập bằng bàn phím số, chấm đúng, sang bài tiếp theo', (tester) async {
    await pumpQuiz(tester, lesson);
    expect(find.text('40.140 × 2 = ?'), findsOneWidget);
    expect(find.text('1/$n'), findsOneWidget);

    await typeNumber(tester, '80280');
    await tapKey(tester, 'btn-check');
    expect(find.byKey(const ValueKey('btn-next')), findsOneWidget);
    expect(find.byKey(const ValueKey('feedback-message')), findsOneWidget);

    await tapKey(tester, 'btn-next');
    expect(find.text('16.387 × 6 = ?'), findsOneWidget);
    expect(find.text('2/$n'), findsOneWidget);
  });

  testWidgets('Điền số: sai → Thử lại (có gợi ý) → xoá và sửa → đúng', (tester) async {
    await pumpQuiz(tester, lesson);
    await typeNumber(tester, '80820');
    await tapKey(tester, 'btn-check');
    expect(find.byKey(const ValueKey('btn-retry')), findsOneWidget);
    // Cô giáo gợi ý đúng câu chủ dự án yêu cầu (không nói đáp án 80.280) và cột đơn vị nháy sáng
    // Phụ đề gọn: chữ chạy dần theo giọng cô.
    for (var i = 0; i < 60 && find.text(TutorLines.wrongColumn).evaluate().isEmpty; i++) {
      await tester.pump(const Duration(milliseconds: 100));
    }
    expect(find.text(TutorLines.wrongColumn, findRichText: true), findsOneWidget);
    expect(find.byKey(const ValueKey('column-hint')), findsOneWidget);
    expect(find.textContaining('80280'), findsNothing);
    expect(find.textContaining('80.280'), findsNothing);

    await tapKey(tester, 'btn-retry');
    for (var i = 0; i < 5; i++) {
      await tapKey(tester, 'numpad-⌫');
    }
    await typeNumber(tester, '80280');
    await tapKey(tester, 'btn-check');
    expect(find.byKey(const ValueKey('btn-next')), findsOneWidget);
  });

  testWidgets('Trắc nghiệm: sai 2 lần → tự mở lời giải từng bước (đặt tính)', (tester) async {
    await pumpQuiz(tester, lesson);
    expect(find.byKey(const ValueKey('btn-solution')), findsNothing, reason: 'chưa xin gợi ý thì chưa có lời giải');
    await openSolution(tester); // bỏ qua bài 1 bằng cách xem lời giải
    expect(find.text('Lời giải'), findsOneWidget);
    // Cô tự làm mẫu từng bước (không cần bấm): lúc đầu chưa có bước nào, lát sau hiện bước 1.
    const step1 = '2 nhân 0 bằng 0, viết 0.';
    const step2 = '2 nhân 4 bằng 8, viết 8.';
    expect(find.text(step1), findsNothing);
    for (var i = 0; i < 40 && find.text(step1).evaluate().isEmpty; i++) {
      await tester.pump(const Duration(milliseconds: 500));
    }
    expect(find.text(step1), findsOneWidget);
    expect(find.text(step2), findsNothing);
    await tester.tap(find.byTooltip('Đóng'));
    await tester.pumpAndSettle();
    await tapKey(tester, 'btn-next');
    await skip(tester, 1); // bài 2 (điền số)

    expect(find.text('Kết quả của phép tính 404.173 × 2 là:'), findsOneWidget);
    await tapKey(tester, 'choice-b'); // 808.356 — sai
    await tapKey(tester, 'btn-check');
    await tapKey(tester, 'btn-retry');
    await tapKey(tester, 'choice-c'); // 808.348 — sai
    await tapKey(tester, 'btn-check');

    expect(find.text('Lời giải'), findsOneWidget);
    // Video lời giải: cô viết từng bước lên bảng phấn.
    expect(find.byKey(const ValueKey('solution-board')), findsOneWidget);
    await tapKey(tester, 'demo-skip'); // "Xem hết": bảng hiện đủ phép đặt tính và kết quả
    expect(find.byType(ChalkColumn), findsOneWidget);
    expect(find.text('6'), findsWidgets, reason: 'chữ số kết quả 808.346 đã viết lên bảng');
    expect(find.text('Đáp án: 808.346'), findsWidgets);
  });

  testWidgets('Lời giải VIP bị khoá với tài khoản thường', (tester) async {
    await pumpQuiz(tester, lesson);
    await skip(tester, n - 1);
    expect(find.text('$n/$n'), findsOneWidget);
    await openSolution(tester);
    expect(find.textContaining('dành cho tài khoản VIP'), findsOneWidget);
    expect(find.text('Đáp án: 44.801 kg thóc'), findsWidgets);
    await tester.tap(find.byTooltip('Đóng'));
    await tester.pumpAndSettle();
    await tapKey(tester, 'btn-next');
    expect(find.byKey(const ValueKey('summary-title')), findsOneWidget);
    expect(find.textContaining('0/$n'), findsOneWidget);
    // Cô còn đang đọc lời tổng kết: tháo cây widget rồi chờ hết các hẹn giờ của giọng đọc.
    await tester.pumpWidget(const SizedBox());
    await tester.pump(const Duration(seconds: 30));
  });

  testWidgets('Kéo thả bằng chạm và Nối hoạt động', (tester) async {
    await pumpQuiz(tester, lesson);
    await skip(tester, 3);
    // Bài 4: kéo thả (chạm thẻ rồi chạm ô)
    for (final (t, s) in [('t1', 's1'), ('t4', 's2'), ('t2', 's3')]) {
      await tapKey(tester, 'token-$t');
      await tapKey(tester, 'slot-$s');
    }
    await tapKey(tester, 'btn-check');
    expect(find.byKey(const ValueKey('btn-next')), findsOneWidget);
    await tapKey(tester, 'btn-next');

    // Bài 5: nối
    for (final (l, r) in [('l1', 'r5'), ('l2', 'r4'), ('l3', 'r1'), ('l4', 'r2')]) {
      await tapKey(tester, 'left-$l');
      await tapKey(tester, 'right-$r');
    }
    await tapKey(tester, 'btn-check');
    expect(find.byKey(const ValueKey('btn-next')), findsOneWidget);
  });

  testWidgets('Kéo thả bằng thao tác kéo thật', (tester) async {
    await pumpQuiz(tester, lesson);
    await skip(tester, 3);
    final token = find.byKey(const ValueKey('token-t1'));
    final slot = find.byKey(const ValueKey('slot-s1'));
    await tester.ensureVisible(token);
    final gesture = await tester.startGesture(tester.getCenter(token));
    await tester.pump();
    await gesture.moveTo(tester.getCenter(slot));
    await tester.pump();
    await gesture.up();
    await tester.pumpAndSettle();
    expect(find.descendant(of: slot, matching: find.text('39.030')), findsOneWidget);
    // Cô còn đang đọc dở: tháo cây widget rồi chờ hết các hẹn giờ của giọng đọc.
    await tester.pumpWidget(const SizedBox());
    await tester.pump(const Duration(seconds: 30));
  });
}
