import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:toan_lop_3/app_state.dart';
import 'package:toan_lop_3/main.dart';
import 'package:toan_lop_3/services/content_repository.dart';
import 'package:toan_lop_3/services/kv_store.dart';

Future<AppState> _state() async {
  final s = AppState(content: ContentRepository(), store: MemoryStore());
  await s.init();
  return s;
}

Future<void> tapKey(WidgetTester tester, String key) async {
  final f = find.byKey(ValueKey(key));
  await tester.ensureVisible(f);
  await tester.tap(f);
  await tester.pumpAndSettle();
}

void main() {
  testWidgets('Chọn sách → trang chủ → chủ đề → bài → Nhớ nhanh / Luyện tập', (tester) async {
    tester.view.physicalSize = const Size(1080, 2340);
    tester.view.devicePixelRatio = 2.5;
    addTearDown(tester.view.reset);
    // Nạp nội dung thật ngoài vùng thời gian giả của test.
    final state = (await tester.runAsync(_state))!;
    await tester.pumpWidget(OngVangApp(stateFactory: () async => state));
    await tester.pumpAndSettle();

    expect(find.text('Con học sách nào?'), findsOneWidget);
    expect(find.text('Sắp có'), findsOneWidget); // Chân trời sáng tạo chưa có bài
    await tapKey(tester, 'book-kntt3');
    expect(find.byKey(const ValueKey('home-greeting')), findsOneWidget);

    await tapKey(tester, 'tile-Học bài');
    await tapKey(tester, 'chapter-kntt3.c4');
    expect(find.text('Phép nhân, phép chia trong phạm vi 100'), findsOneWidget);
    await tapKey(tester, 'lesson-kntt3.c4.nhan-2cs-1cs');

    await tapKey(tester, 'btn-theory');
    expect(find.text('Đặt tính rồi tính:'), findsOneWidget);
    await tester.pageBack();
    await tester.pumpAndSettle();

    await tapKey(tester, 'btn-practice');
    expect(find.text('21 × 3 = ?'), findsOneWidget);
  });

  testWidgets('Cổng phụ huynh chặn câu trả lời sai', (tester) async {
    tester.view.physicalSize = const Size(1080, 2340);
    tester.view.devicePixelRatio = 2.5;
    addTearDown(tester.view.reset);
    final state = (await tester.runAsync(() async {
      final s = await _state();
      await s.selectBook('kntt3');
      return s;
    }))!;
    await tester.pumpWidget(OngVangApp(stateFactory: () async => state));
    await tester.pumpAndSettle();
    await tapKey(tester, 'btn-parent');

    final q = tester.widget<Text>(find.byKey(const ValueKey('gate-question'))).data!;
    final m = RegExp(r'(\d+) × (\d+)').firstMatch(q)!;
    final answer = int.parse(m.group(1)!) * int.parse(m.group(2)!);

    await tapKey(tester, 'numpad-1');
    await tapKey(tester, 'gate-ok');
    expect(find.text('Chưa đúng, thử phép tính mới nhé.'), findsOneWidget);
    expect(find.text('Khu phụ huynh'), findsNothing);

    final q2 = tester.widget<Text>(find.byKey(const ValueKey('gate-question'))).data!;
    final m2 = RegExp(r'(\d+) × (\d+)').firstMatch(q2)!;
    final answer2 = int.parse(m2.group(1)!) * int.parse(m2.group(2)!);
    expect(answer, greaterThan(100));
    for (final d in '$answer2'.split('')) {
      await tapKey(tester, 'numpad-$d');
    }
    await tapKey(tester, 'gate-ok');
    expect(find.text('Khu phụ huynh'), findsOneWidget);
    expect(find.byKey(const ValueKey('dev-vip')), findsOneWidget);
  });
}
