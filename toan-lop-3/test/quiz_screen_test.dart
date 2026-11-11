import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:toan_lop_3/logic/tutor.dart';
import 'package:toan_lop_3/models/content.dart';
import 'package:toan_lop_3/services/sound_service.dart';
import 'package:toan_lop_3/ui/app_theme.dart';
import 'package:toan_lop_3/ui/quiz_screen.dart';

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
  final lesson = loadLessonFromDisk('kntt3.c4.nhan-2cs-1cs');

  testWidgets('Điền số: nhập bằng bàn phím số, chấm đúng, sang bài trắc nghiệm', (tester) async {
    await pumpQuiz(tester, lesson);
    expect(find.text('21 × 3 = ?'), findsOneWidget);
    expect(find.text('1/10'), findsOneWidget);

    await tapKey(tester, 'numpad-6');
    await tapKey(tester, 'numpad-3');
    await tapKey(tester, 'btn-check');
    expect(find.byKey(const ValueKey('btn-next')), findsOneWidget);
    expect(find.byKey(const ValueKey('feedback-message')), findsOneWidget);

    await tapKey(tester, 'btn-next');
    expect(find.text('Kết quả của phép nhân 32 × 3 là:'), findsOneWidget);
    expect(find.text('2/10'), findsOneWidget);
  });

  testWidgets('Điền số: sai → Thử lại (có gợi ý) → xoá và sửa → đúng', (tester) async {
    await pumpQuiz(tester, lesson);
    await tapKey(tester, 'numpad-3');
    await tapKey(tester, 'numpad-6');
    await tapKey(tester, 'btn-check');
    expect(find.byKey(const ValueKey('btn-retry')), findsOneWidget);
    // Cô giáo gợi ý đúng câu chủ dự án yêu cầu (không nói đáp án 63) và cột đơn vị nháy sáng
    // Phụ đề gọn: chữ chạy dần theo giọng cô.
    for (var i = 0; i < 60 && find.text(TutorLines.wrongColumn).evaluate().isEmpty; i++) {
      await tester.pump(const Duration(milliseconds: 100));
    }
    expect(find.text(TutorLines.wrongColumn, findRichText: true), findsOneWidget);
    expect(find.byKey(const ValueKey('column-hint')), findsOneWidget);
    expect(find.textContaining('63'), findsNothing);

    await tapKey(tester, 'btn-retry');
    await tapKey(tester, 'numpad-⌫');
    await tapKey(tester, 'numpad-⌫');
    await tapKey(tester, 'numpad-6');
    await tapKey(tester, 'numpad-3');
    await tapKey(tester, 'btn-check');
    expect(find.byKey(const ValueKey('btn-next')), findsOneWidget);
  });

  testWidgets('Trắc nghiệm: sai 2 lần → tự mở lời giải từng bước (đặt tính)', (tester) async {
    await pumpQuiz(tester, lesson);
    expect(find.byKey(const ValueKey('btn-solution')), findsNothing, reason: 'chưa xin gợi ý thì chưa có lời giải');
    await openSolution(tester); // bỏ qua bài 1 bằng cách xem lời giải
    expect(find.text('Lời giải'), findsOneWidget);
    // Cô tự làm mẫu từng bước (không cần bấm): lúc đầu chưa có bước nào, lát sau hiện bước 1.
    expect(find.text('3 nhân 1 bằng 3, viết 3.'), findsNothing);
    for (var i = 0; i < 40 && find.text('3 nhân 1 bằng 3, viết 3.').evaluate().isEmpty; i++) {
      await tester.pump(const Duration(milliseconds: 500));
    }
    expect(find.text('3 nhân 1 bằng 3, viết 3.'), findsOneWidget);
    expect(find.text('3 nhân 2 bằng 6, viết 6.'), findsNothing);
    await tester.tap(find.byTooltip('Đóng'));
    await tester.pumpAndSettle();
    await tapKey(tester, 'btn-next');

    await tapKey(tester, 'choice-a'); // 66 — sai
    await tapKey(tester, 'btn-check');
    await tapKey(tester, 'btn-retry');
    await tapKey(tester, 'choice-d'); // 69 — sai
    await tapKey(tester, 'btn-check');

    expect(find.text('Lời giải'), findsOneWidget);
    expect(find.text('Đặt tính rồi tính:'), findsOneWidget);
    await tapKey(tester, 'demo-skip'); // "Xem hết": hiện mọi bước ngay
    expect(find.text('3 nhân 3 bằng 9, viết 9.'), findsOneWidget);
    expect(find.text('Đáp án: 96'), findsWidgets);
  });

  testWidgets('Lời giải VIP bị khoá với tài khoản thường', (tester) async {
    await pumpQuiz(tester, lesson);
    for (var i = 0; i < 9; i++) {
      await openSolution(tester);
      await tester.tap(find.byTooltip('Đóng'));
      await tester.pumpAndSettle();
      await tapKey(tester, 'btn-next');
    }
    expect(find.text('10/10'), findsOneWidget);
    await openSolution(tester);
    expect(find.textContaining('dành cho tài khoản VIP'), findsOneWidget);
    expect(find.text('Đáp án: 39 kg gạo'), findsWidgets);
    await tester.tap(find.byTooltip('Đóng'));
    await tester.pumpAndSettle();
    await tapKey(tester, 'btn-next');
    expect(find.byKey(const ValueKey('summary-title')), findsOneWidget);
    expect(find.textContaining('0/10'), findsOneWidget);
  });

  testWidgets('Kéo thả bằng chạm và Nối hoạt động', (tester) async {
    await pumpQuiz(tester, lesson);
    for (var i = 0; i < 5; i++) {
      await openSolution(tester);
      await tester.tap(find.byTooltip('Đóng'));
      await tester.pumpAndSettle();
      await tapKey(tester, 'btn-next');
    }
    // Bài 6: kéo thả (chạm thẻ rồi chạm ô)
    for (final (t, s) in [('t1', 's1'), ('t2', 's2'), ('t3', 's3')]) {
      await tapKey(tester, 'token-$t');
      await tapKey(tester, 'slot-$s');
    }
    await tapKey(tester, 'btn-check');
    expect(find.byKey(const ValueKey('btn-next')), findsOneWidget);
    await tapKey(tester, 'btn-next');

    // Bài 7: nối
    for (final (l, r) in [('l1', 'r2'), ('l2', 'r1'), ('l3', 'r4'), ('l4', 'r3')]) {
      await tapKey(tester, 'left-$l');
      await tapKey(tester, 'right-$r');
    }
    await tapKey(tester, 'btn-check');
    expect(find.byKey(const ValueKey('btn-next')), findsOneWidget);
  });

  testWidgets('Kéo thả bằng thao tác kéo thật', (tester) async {
    await pumpQuiz(tester, lesson);
    for (var i = 0; i < 5; i++) {
      await openSolution(tester);
      await tester.tap(find.byTooltip('Đóng'));
      await tester.pumpAndSettle();
      await tapKey(tester, 'btn-next');
    }
    final token = find.byKey(const ValueKey('token-t1'));
    final slot = find.byKey(const ValueKey('slot-s1'));
    await tester.ensureVisible(token);
    final gesture = await tester.startGesture(tester.getCenter(token));
    await tester.pump();
    await gesture.moveTo(tester.getCenter(slot));
    await tester.pump();
    await gesture.up();
    await tester.pumpAndSettle();
    expect(find.descendant(of: slot, matching: find.text('48')), findsOneWidget);
    // Cô còn đang đọc dở: tháo cây widget rồi chờ hết các hẹn giờ của giọng đọc.
    await tester.pumpWidget(const SizedBox());
    await tester.pump(const Duration(seconds: 30));
  });
}
