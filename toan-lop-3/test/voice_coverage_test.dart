import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:toan_lop_3/logic/tutor.dart';
import 'package:toan_lop_3/tutor/teacher_gallery_screen.dart';
import 'package:toan_lop_3/tutor/voice_library.dart';
import 'package:toan_lop_3/ui/app_theme.dart';

import 'helpers.dart';

void main() {
  test('mọi câu cô giáo nói đều đã có file giọng 11max (sửa câu → chạy lại tool/make_voice.dart)', () {
    final lib = VoiceLibrary.fromJson(
      jsonDecode(File('assets/voice/manifest.json').readAsStringSync()) as Map<String, dynamic>,
    );
    final brain = TutorBrain();
    // Gợi ý của bài sinh tự động lấy từ kGeneratedHints (lib/logic/tutor_hints.dart), ghi âm riêng;
    // ở đây chỉ kiểm tra câu cố định + gợi ý của hai bài viết tay Chủ đề 4.
    final lines = {
      ...TutorLines.all(),
      for (final id in const ['kntt3.c4.nhan-2cs-1cs', 'kntt3.c4.chia-2cs-1cs'])
        for (final p in loadLessonFromDisk(id).problems) brain.hint(p),
    };
    final missing = [
      for (final l in lines)
        if (lib.lookup(l) == null) l,
    ];
    expect(missing, isEmpty, reason: 'Thiếu giọng cho:\n${missing.join('\n')}');
    for (final l in lines) {
      final clip = lib.lookup(l)!;
      expect(File(clip.file).existsSync(), isTrue, reason: clip.file);
      expect(clip.durationMs, inInclusiveRange(300, 15000), reason: '$l: ${clip.durationMs} ms');
    }
  });

  testWidgets('màn xem cô giáo: đủ tư thế, nút nói thử', (tester) async {
    tester.view.physicalSize = const Size(1080, 2340);
    tester.view.devicePixelRatio = 2.5;
    addTearDown(tester.view.reset);
    await tester.pumpWidget(MaterialApp(theme: buildAppTheme(), home: const TeacherGalleryScreen()));
    await tester.pump();
    expect(find.text('Mỉm cười · mở miệng'), findsOneWidget);
    await tester.tap(find.byKey(const ValueKey('try-clap')));
    await tester.pump();
    expect(find.text('Xuất sắc!', findRichText: true), findsOneWidget);
    await tester.pump(const Duration(seconds: 5));
  });
}
