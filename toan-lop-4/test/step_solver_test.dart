import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:toan_lop_4/models/blocks.dart';
import 'package:toan_lop_4/ui/app_theme.dart';
import 'package:toan_lop_4/ui/widgets/step_solver.dart';

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
  final lesson = loadLessonFromDisk('kntt4.c8.nhan-voi-so-co-mot-chu-so');
  final division = loadLessonFromDisk('kntt4.c8.chia-cho-so-co-mot-chu-so');

  testWidgets('Đặt tính nhân: hiện từng chữ số và số nhớ', (tester) async {
    // 16.387 × 6 = 98.322: lượt 1 viết 2 nhớ 4; … lượt cuối viết 9.
    final block = lesson.problems[1].solution.steps.first as ColumnArithmeticBlock;
    expect(block.operands, ['16387', '6']);
    await pump(tester, ColumnStepper(block: block));
    expect(find.text('2'), findsNothing);
    expect(find.text('+4'), findsNothing);

    await tester.tap(find.byKey(const ValueKey('step-next')));
    await tester.pump();
    expect(find.text('2'), findsOneWidget);
    expect(find.text('+4'), findsOneWidget);
    expect(find.text('6 nhân 7 bằng 42, viết 2 nhớ 4.'), findsOneWidget);
    expect(find.text('9'), findsNothing);

    await tester.tap(find.byKey(const ValueKey('step-all')));
    await tester.pump();
    expect(find.text('9'), findsOneWidget);
    expect(find.text('Xong!'), findsOneWidget);

    await tester.tap(find.byKey(const ValueKey('step-back')));
    await tester.pump();
    expect(find.text('9'), findsNothing);
  });

  testWidgets('Phép chia: hiện thương, tích, số hạ xuống theo từng lượt', (tester) async {
    // 78.670 : 5 = 15.734
    final block = division.problems[0].solution.steps.first as LongDivisionBlock;
    expect(block.dividend, '78670');
    await pump(tester, DivisionStepper(block: block));
    await tester.tap(find.byKey(const ValueKey('step-next')));
    await tester.pump();
    // lượt 1: thương 1, tích 5, còn 2
    expect(find.text('1'), findsNWidgets(2)); // chữ số thương + số thứ tự bước
    expect(find.text('7 chia 5 được 1, viết 1. 1 nhân 5 bằng 5; 7 trừ 5 bằng 2.'), findsOneWidget);
    expect(find.text('4'), findsNothing);
    await tester.tap(find.byKey(const ValueKey('step-all')));
    await tester.pump();
    expect(find.text('4'), findsNWidgets(2)); // chữ số cuối của thương + số thứ tự bước 4
    expect(find.text('Xong!'), findsOneWidget);
  });
}
