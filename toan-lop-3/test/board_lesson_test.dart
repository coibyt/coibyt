import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:toan_lop_3/app_state.dart';
import 'package:toan_lop_3/logic/board_script.dart';
import 'package:toan_lop_3/logic/real_examples.dart';
import 'package:toan_lop_3/logic/tips.dart';
import 'package:toan_lop_3/services/content_repository.dart';
import 'package:toan_lop_3/services/kv_store.dart';
import 'package:toan_lop_3/services/tutor_voice.dart';
import 'package:toan_lop_3/tutor/tutor_audio_service.dart';
import 'package:toan_lop_3/tutor/voice_library.dart';
import 'package:toan_lop_3/ui/app_theme.dart';
import 'package:toan_lop_3/ui/board_lesson_screen.dart';
import 'package:toan_lop_3/ui/widgets/chalk.dart';

import 'helpers.dart';

class _Voice implements TutorVoice {
  final spoken = <String>[];
  @override
  bool? get hasVietnamese => true;
  @override
  Future<bool> speak(String text) async {
    spoken.add(text);
    return true;
  }

  @override
  Future<void> stop() async {}
}

void main() {
  final examples = parseRealExamples(
    jsonDecode(File(realExamplesPath).readAsStringSync()) as Map<String, dynamic>,
  );

  test('video bài giảng: mọi bài chia thành nhiều bảng, xoá bảng giữa các phần, đủ ví dụ và mẹo', () {
    for (final c in loadCatalogFromDisk().books.first.chapters) {
      for (final ref in c.lessons) {
        final l = loadLessonFromDisk(ref.id);
        final tips = tipsForLesson(l.title);
        final b = buildBoardScript(
          l.theory.blocks,
          lessonId: l.id,
          tips: tips,
          problems: l.problems,
          examples: examples[l.id] ?? const [],
        );
        expect(b.sectionOf, hasLength(b.scenes.length), reason: l.id);
        expect(b.scenes.first.say, [boardStart]);
        // Mỗi lần đổi bảng đều có cảnh xoá bảng ngay trước.
        for (var i = 1; i < b.scenes.length; i++) {
          if (b.sectionOf[i] != b.sectionOf[i - 1] && b.sectionOf[i - 1] >= 0) {
            expect(b.scenes[i - 1].erase, isTrue, reason: '${l.id} cảnh $i');
          }
        }
        final erases = b.scenes.where((s) => s.erase).length;
        expect(erases, b.sections.length - 1, reason: l.id);
        expect(b.sections.where((s) => s.example != null), hasLength(examples[l.id]?.length ?? 0));
        expect(b.scenes.where((s) => s.quiz != null && !s.quiz!.survey), isNotEmpty, reason: '${l.id}: cô có hỏi');
        final d = boardDiagramFor(l.id);
        if (d != null) {
          expect(b.scenes.where((s) => s.draw), hasLength(1), reason: '${l.id}: cô vẽ $d');
          expect(chalkDiagram(d), isNotNull, reason: d);
        }
      }
    }
  });

  test('cô có giọng ghi âm cho mọi câu của video bài giảng và ví dụ trong cuộc sống', () {
    final lib = VoiceLibrary.fromJson(
      jsonDecode(File('assets/voice/manifest.json').readAsStringSync()) as Map<String, dynamic>,
    );
    final lines = [
      ...boardFixedLines(),
      for (final list in examples.values)
        for (final e in list)
          for (final (say, _) in e.lines) say,
    ];
    final missing = [
      for (final l in lines)
        if (lib.lookup(l) == null) l,
    ];
    expect(missing, isEmpty, reason: missing.take(10).join('\n'));
    for (final list in examples.values) {
      for (final e in list) {
        expect(File(e.image).existsSync(), isTrue, reason: e.image);
      }
    }
  });

  test('đồ vật vẽ phấn khớp phép tính; đặt tính hiện đủ chữ số kết quả', () {
    final d = chalkObjects('4 × 3 = 12')!;
    expect(d.items.whereType<ChalkLabel>().map((l) => l.text), ['4', '8', '12']);
    expect(boardDrawsObjects('6 × 8 = 48'), isFalse, reason: 'quá nhiều chấm');
    expect(boardDate(DateTime(2026, 11, 11)), 'Thứ Tư, ngày 11 tháng 11 năm 2026');
  });

  testWidgets('Video bài giảng: cô ghi đầu bài, viết, vẽ hình tròn, xoá bảng rồi giảng tiếp', (tester) async {
    tester.view.physicalSize = const Size(1080, 2340);
    tester.view.devicePixelRatio = 2.5;
    addTearDown(tester.view.reset);
    final voice = _Voice();
    final saved = TutorAudioService.instance;
    TutorAudioService.instance = TutorAudioService(fallback: voice);
    addTearDown(() => TutorAudioService.instance = saved);
    final s = (await tester.runAsync(() async {
      final s = AppState(content: ContentRepository(), store: MemoryStore());
      await s.init();
      await s.selectBook('kntt3');
      return s;
    }))!;
    final ref = s.book!.chapters
        .firstWhere((c) => c.id == 'kntt3.c3')
        .lessons
        .firstWhere((l) => l.id == 'kntt3.c3.hinh-tron-tam-ban-kinh-duong-kinh');
    await tester.pumpWidget(
      AppScope(
        state: s,
        child: MaterialApp(theme: buildAppTheme(), home: BoardLessonScreen(lessonRef: ref)),
      ),
    );
    for (var i = 0; i < 20 && find.byKey(const ValueKey('chalk-board')).evaluate().isEmpty; i++) {
      await tester.runAsync(() => Future<void>.delayed(const Duration(milliseconds: 20)));
      await tester.pump(const Duration(milliseconds: 100));
    }
    expect(find.byKey(const ValueKey('chalk-board')), findsOneWidget);
    expect(find.byKey(const ValueKey('board-title')), findsOneWidget);
    await tester.pump(const Duration(seconds: 1));
    expect(voice.spoken, isNotEmpty, reason: 'cô tự nói ngay');
    for (var i = 0; i < 120 && find.byKey(const ValueKey('board-diagram-circle')).evaluate().isEmpty; i++) {
      await tester.pump(const Duration(milliseconds: 500));
    }
    expect(find.byKey(const ValueKey('board-diagram-circle')), findsOneWidget);
    expect(find.byKey(const ValueKey('board-section-0')), findsOneWidget);
    // Trả lời các câu cô hỏi (chọn đáp án đầu) cho tới khi cô xoá bảng sang phần sau.
    for (var i = 0; i < 400 && find.byKey(const ValueKey('board-section-0')).evaluate().isNotEmpty; i++) {
      final q = find.byKey(const ValueKey('class-quiz-0'));
      if (q.evaluate().isNotEmpty) await tester.tap(q.first, warnIfMissed: false);
      await tester.pump(const Duration(milliseconds: 500));
    }
    expect(voice.spoken.any((t) => t.contains('xoá bảng') || t.contains('lau bảng')), isTrue);
    expect(find.byKey(const ValueKey('board-section-0')), findsNothing);
    await tester.tap(find.byKey(const ValueKey('demo-skip')));
    await tester.pump(const Duration(milliseconds: 600));
    expect(find.byKey(const ValueKey('board-tips-head')), findsOneWidget);
    expect(find.byKey(const ValueKey('btn-board-practice')), findsOneWidget);
    await tester.pumpWidget(const SizedBox());
    await tester.pump(const Duration(seconds: 10));
  });
}
