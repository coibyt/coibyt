import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:toan_lop_3/models/blocks.dart';
import 'package:toan_lop_3/ui/app_theme.dart';
import 'package:toan_lop_3/ui/widgets/step_solver.dart';

import 'helpers.dart';

Future<void> pump(WidgetTester tester, Widget w) async {
  tester.view.physicalSize = const Size(1080, 2340);
  tester.view.devicePixelRatio = 2.5;
  addTearDown(tester.view.reset);
  await tester.pumpWidget(
    MaterialApp(
      theme: buildAppTheme(),
      home: Scaffold(body: SingleChildScrollView(child: w)),
    ),
  );
}

void main() {
  final lesson = loadLessonFromDisk('kntt3.c4.nhan-2cs-1cs');
  final division = loadLessonFromDisk('kntt3.c4.chia-2cs-1cs');

  testWidgets('Đặt tính nhân: hiện từng chữ số và số nhớ', (tester) async {
    // 16 × 5 = 80: lượt 1 viết 0 nhớ 3; lượt 2 viết 8.
    final block = lesson.problems[2].solution.steps.first as ColumnArithmeticBlock;
    await pump(tester, ColumnStepper(block: block));
    expect(find.text('8'), findsNothing);
    expect(find.text('+3'), findsNothing);

    await tester.tap(find.byKey(const ValueKey('step-next')));
    await tester.pump();
    expect(find.text('0'), findsOneWidget);
    expect(find.text('+3'), findsOneWidget);
    expect(find.text('5 nhân 6 bằng 30, viết 0 nhớ 3.'), findsOneWidget);
    expect(find.text('8'), findsNothing);

    await tester.tap(find.byKey(const ValueKey('step-next')));
    await tester.pump();
    expect(find.text('8'), findsOneWidget);
    expect(find.text('Xong!'), findsOneWidget);

    await tester.tap(find.byKey(const ValueKey('step-back')));
    await tester.pump();
    expect(find.text('8'), findsNothing);
  });

  testWidgets('Phép chia: hiện thương, tích, số hạ xuống theo từng lượt', (tester) async {
    // 72 : 4 = 18
    final block = division.problems[2].solution.steps.first as LongDivisionBlock;
    await pump(tester, DivisionStepper(block: block));
    await tester.tap(find.byKey(const ValueKey('step-next')));
    await tester.pump();
    // lượt 1: thương 1, tích 4, hạ 2 → "3" "2"
    expect(find.text('1'), findsNWidgets(2)); // chữ số thương + số thứ tự bước
    expect(find.text('7 chia 4 được 1, viết 1. 1 nhân 4 bằng 4; 7 trừ 4 bằng 3.'), findsOneWidget);
    await tester.tap(find.byKey(const ValueKey('step-all')));
    await tester.pump();
    expect(find.text('8'), findsOneWidget);
    expect(find.text('Xong!'), findsOneWidget);
  });
}
