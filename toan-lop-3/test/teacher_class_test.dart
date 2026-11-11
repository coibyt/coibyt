import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:toan_lop_3/app_state.dart';
import 'package:toan_lop_3/logic/spoken_vi.dart';
import 'package:toan_lop_3/logic/tips.dart';
import 'package:toan_lop_3/logic/tutor.dart';
import 'package:toan_lop_3/services/content_repository.dart';
import 'package:toan_lop_3/services/kv_store.dart';
import 'package:toan_lop_3/models/blocks.dart';
import 'package:toan_lop_3/services/tutor_voice.dart';
import 'package:toan_lop_3/tutor/teacher_controller.dart';
import 'package:toan_lop_3/tutor/teacher_demo.dart';
import 'package:toan_lop_3/tutor/tutor_audio_service.dart';
import 'package:toan_lop_3/ui/app_theme.dart';
import 'package:toan_lop_3/ui/teacher_class_screen.dart';

import 'helpers.dart';

/// Giọng giả: ghi lại câu đã đọc, giả vờ phát tiếng.
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
  remedyWidgetTests();
  test('mẹo theo tên bài: đúng chủ đề, không trùng, tối đa 3', () {
    final nhan = tipsForLesson('Nhân số có hai chữ số với số có một chữ số');
    expect(nhan.first.text, contains('Nhân từ phải sang trái'));
    final b9 = tipsForLesson('Bảng nhân 9, bảng chia 9');
    expect(b9.first.text, contains('bảng nhân 9'));
    for (final title in [
      for (final c in loadCatalogFromDisk().books.first.chapters)
        for (final l in c.lessons) l.title,
    ]) {
      final t = tipsForLesson(title);
      expect(t.length, inInclusiveRange(2, 3), reason: title);
      expect(t.map((x) => x.text).toSet(), hasLength(t.length));
    }
  });

  test('kịch bản làm mẫu: mỗi bước đặt tính là một cảnh, mẹo ở cuối', () {
    final lesson = loadLessonFromDisk('kntt3.c4.nhan-2cs-1cs');
    final tips = tipsForLesson(lesson.title);
    final scenes = buildDemoScript(lesson.theory.blocks, intro: const ['Chào'], tips: tips, outro: const ['Xong']);
    expect(scenes.first.say, ['Chào']);
    expect(scenes.last.say, ['Xong']);
    expect(scenes.where((s) => s.say.contains(TutorLines.demoColumn)), isNotEmpty);
    expect(scenes.where((s) => s.tip != null), hasLength(tips.length));
  });

  test('ví dụ trong cuộc sống: mọi bài có 2 tranh, lời cô ngắn; kịch bản chỉ vào tranh đầu bài và trước mẹo', () {
    final all = parseRealExamples(
      jsonDecode(File(realExamplesPath).readAsStringSync()) as Map<String, dynamic>,
    );
    for (final c in loadCatalogFromDisk().books.first.chapters) {
      for (final l in c.lessons) {
        final ex = all[l.id];
        expect(ex, hasLength(2), reason: l.id);
        for (final e in ex!) {
          expect(e.lines.length, inInclusiveRange(3, 4), reason: e.title);
          for (final (say, _) in e.lines) {
            expect(say.length, lessThanOrEqualTo(140), reason: say);
          }
          expect(e.lines.last.$2, PointAt.all);
        }
      }
    }
    final lesson = loadLessonFromDisk('kntt3.c4.nhan-2cs-1cs');
    final ex = all[lesson.id]!;
    final tips = tipsForLesson(lesson.title);
    final scenes = buildDemoScript(lesson.theory.blocks, intro: const ['Chào'], tips: tips, examples: ex);
    expect(scenes[1].example, 0);
    expect(scenes[1].say, [TutorLines.exampleLead, ex[0].lines[0].$1]);
    expect(scenes.where((s) => s.example == 0), hasLength(ex[0].lines.length));
    final firstTip = scenes.indexWhere((s) => s.tip != null);
    final lastEx1 = scenes.lastIndexWhere((s) => s.example == 1);
    expect(lastEx1, lessThan(firstTip));
    expect(scenes[lastEx1 - ex[1].lines.length + 1].say.first, TutorLines.exampleMore);
  });

  testWidgets('Lớp học của cô: mở ra cô tự giảng, làm mẫu từng bước, đọc mẹo; xem hết được', (tester) async {
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
        .firstWhere((c) => c.id == 'kntt3.c4')
        .lessons
        .firstWhere((l) => l.id == 'kntt3.c4.nhan-2cs-1cs');
    await tester.pumpWidget(
      AppScope(
        state: s,
        child: MaterialApp(
          theme: buildAppTheme(),
          home: TeacherClassScreen(lessonRef: ref),
        ),
      ),
    );
    for (var i = 0; i < 20 && find.byKey(const ValueKey('class-title')).evaluate().isEmpty; i++) {
      await tester.runAsync(() => Future<void>.delayed(const Duration(milliseconds: 20)));
      await tester.pump(const Duration(milliseconds: 100));
    }
    expect(find.byKey(const ValueKey('class-title')), findsOneWidget);
    // Cô tự nói ngay (không bấm loa).
    await tester.pump(const Duration(seconds: 1));
    expect(voice.spoken, isNotEmpty);
    // Ví dụ trong cuộc sống: tranh hiện ngay đầu bài, cô chỉ que vào tranh trong lúc giảng.
    expect(find.byKey(const ValueKey('real-example-0')), findsOneWidget);
    for (var i = 0; i < 40 && find.byKey(const ValueKey('example-pointer')).evaluate().isEmpty; i++) {
      await tester.pump(const Duration(milliseconds: 500));
    }
    expect(find.byKey(const ValueKey('example-pointer')), findsOneWidget);
    expect(voice.spoken, contains(spokenVietnamese(TutorLines.exampleLead)));
    // Cô làm mẫu tới bước đặt tính đầu tiên.
    for (var i = 0; i < 120 && !voice.spoken.contains(TutorLines.demoColumn); i++) {
      await tester.pump(const Duration(milliseconds: 500));
    }
    expect(voice.spoken, contains(TutorLines.demoColumn));
    await tester.tap(find.byKey(const ValueKey('demo-skip')));
    await tester.pump(const Duration(milliseconds: 600));
    expect(find.byKey(const ValueKey('demo-skip')), findsNothing, reason: 'xem hết rồi');
    expect(find.byKey(const ValueKey('tip-0')), findsOneWidget);
    await tester.pumpWidget(const SizedBox());
    await tester.pump(const Duration(seconds: 10));
  });
}

void remedyWidgetTests() {
  testWidgets('Trả lời sai: cô thuyết minh tranh đồ vật rồi hỏi lại câu dễ hơn (2 đáp án)', (tester) async {
    tester.view.physicalSize = const Size(1080, 2340);
    tester.view.devicePixelRatio = 2.5;
    addTearDown(tester.view.reset);
    final voice = _Voice();
    final saved = TutorAudioService.instance;
    TutorAudioService.instance = TutorAudioService(fallback: voice);
    addTearDown(() => TutorAudioService.instance = saved);
    final teacher = TeacherController();
    final blocks = <ContentBlock>[const EquationBlock(text: '6 × 8 = 48')];
    final player = DemoPlayer(blocks: blocks, teacher: teacher, scenes: buildDemoScript(blocks));
    await tester.pumpWidget(
      MaterialApp(
        theme: buildAppTheme(),
        home: Scaffold(
          body: ListenableBuilder(
            listenable: player,
            builder: (_, _) => SingleChildScrollView(child: QuizPanel(player: player)),
          ),
        ),
      ),
    );
    player.play();
    for (var i = 0; i < 60 && !player.waitingAnswer; i++) {
      await tester.pump(const Duration(milliseconds: 500));
    }
    expect(player.waitingAnswer, isTrue);
    final q = player.activeQuiz!;
    expect(voice.spoken.any((s) => s.contains('Phương án A')), isTrue, reason: 'cô đọc các phương án');
    final wrong = (q.correct + 1) % q.choices.length;
    await tester.tap(find.byKey(ValueKey('class-quiz-$wrong')));
    // Cô thuyết minh tranh: tranh hiện ra, cô đếm 6, 12, …
    for (var i = 0; i < 40 && find.byKey(const ValueKey('remedy-aid')).evaluate().isEmpty; i++) {
      await tester.pump(const Duration(milliseconds: 500));
    }
    expect(find.byKey(const ValueKey('remedy-aid')), findsOneWidget);
    for (var i = 0; i < 120 && !(player.waitingAnswer && player.activeQuiz!.choices.length == 2); i++) {
      await tester.pump(const Duration(milliseconds: 500));
    }
    expect(voice.spoken, contains('sáu nhân tám bằng bốn mươi tám.'.replaceFirst('sáu', 'Vậy sáu')));
    final easy = player.activeQuiz!;
    expect(easy.choices, hasLength(2));
    await tester.pump();
    await tester.tap(find.byKey(ValueKey('class-quiz-${easy.correct}')));
    for (var i = 0; i < 60 && !player.done; i++) {
      await tester.pump(const Duration(milliseconds: 500));
    }
    expect(player.done, isTrue);
    player.dispose();
    teacher.dispose();
    await tester.pumpWidget(const SizedBox());
    await tester.pump(const Duration(seconds: 5));
  });
}
