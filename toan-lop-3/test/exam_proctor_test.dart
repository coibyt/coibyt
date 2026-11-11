import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:toan_lop_3/app_state.dart';
import 'package:toan_lop_3/logic/exam_lines.dart';
import 'package:toan_lop_3/models/exam.dart';
import 'package:toan_lop_3/models/problem.dart';
import 'package:toan_lop_3/services/content_repository.dart';
import 'package:toan_lop_3/services/exam_music.dart';
import 'package:toan_lop_3/services/kv_store.dart';
import 'package:toan_lop_3/services/sound_service.dart';
import 'package:toan_lop_3/services/tutor_voice.dart';
import 'package:toan_lop_3/tutor/tutor_audio_service.dart';
import 'package:toan_lop_3/tutor/voice_library.dart';
import 'package:toan_lop_3/ui/app_theme.dart';
import 'package:toan_lop_3/ui/exam_screens.dart';

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
  test('cô coi thi: đọc số câu, điểm, đề; đáp án theo thứ tự cố định của đề', () {
    final exam = loadExamFromDisk('kntt3.c4.de-1');
    final lines = ExamLines.questionLines(exam, 0);
    expect(lines.first, 'Phần 1. Trắc nghiệm');
    expect(lines[1], 'Câu 1, 1 điểm.');
    expect(lines, contains('Kết quả của phép nhân 43 × 2 là:'));
    final order = ExamLines.choiceOrder(exam, exam.items.first.problem)!;
    expect(ExamLines.choiceOrder(exam, exam.items.first.problem), order, reason: 'lần nào cũng giống nhau');
    final choices = ExamLines.choiceLines(exam, exam.items.first.problem);
    expect([for (final (id, _) in choices) id], order);
    expect(choices.first.$2, startsWith('Đáp án A: '));
    expect(pointsSpoken(1.5), '1 phẩy 5');
    expect(ExamLines.questionLines(exam, 1).first, startsWith('Câu 2'), reason: 'chỉ đọc tên phần ở câu đầu phần');
  });

  test('cô có giọng ghi âm cho mọi lời coi thi và mọi câu, mọi đáp án của mọi đề', () {
    final lib = VoiceLibrary.fromJson(
      jsonDecode(File('assets/voice/manifest.json').readAsStringSync()) as Map<String, dynamic>,
    );
    final lines = <String>{...ExamLines.fixed()};
    for (final f in Directory('assets/content/exams').listSync().whereType<File>()) {
      if (f.path.endsWith('.json')) lines.addAll(ExamLines.all(Exam.fromJson(jsonDecode(f.readAsStringSync()))));
    }
    final missing = [
      for (final l in lines)
        if (lib.lookup(l) == null) l,
    ];
    expect(missing, isEmpty, reason: '${missing.length} câu:\n${missing.take(10).join('\n')}');
  });

  testWidgets('Phòng thi: chuông + nhạc nền, cô tự đọc đề và từng đáp án (đáp án sáng lên), nộp bài thì tắt nhạc', (
    tester,
  ) async {
    tester.view.physicalSize = const Size(1080, 2340);
    tester.view.devicePixelRatio = 2.5;
    addTearDown(tester.view.reset);
    final voice = _Voice();
    final saved = TutorAudioService.instance;
    TutorAudioService.instance = TutorAudioService(fallback: voice);
    addTearDown(() => TutorAudioService.instance = saved);
    final music = SilentExamMusic();
    final exam = loadExamFromDisk('kntt3.c4.de-1');
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
          home: ExamRunScreen(exam: exam, sound: const SilentSoundService(), music: music),
        ),
      ),
    );
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 100));
    expect(music.played, containsAll(['start', 'bg']));
    expect(find.byKey(const ValueKey('exam-proctor-bar')), findsOneWidget);
    // Cô bấm giờ rồi đọc câu 1 và từng đáp án.
    final first = exam.items.first.problem.body as MultipleChoiceBody;
    for (var i = 0; i < 120 && !voice.spoken.any((t) => t.startsWith('Đáp án A')); i++) {
      await tester.pump(const Duration(milliseconds: 250));
    }
    expect(voice.spoken.first, contains('bấm giờ'));
    expect(voice.spoken.any((t) => t.contains('nhân bốn mươi ba') || t.contains('43')), isTrue);
    expect(find.byIcon(Icons.volume_up_rounded), findsWidgets, reason: 'đáp án đang đọc có biểu tượng loa');
    expect(first.choices, hasLength(4));
    // Tắt nhạc.
    await tester.tap(find.byKey(const ValueKey('exam-music')));
    await tester.pump();
    expect(music.played, contains('mute'));
    // Nộp bài → tắt nhạc, chuông kết thúc, bảng điểm có cô đọc điểm.
    for (var k = 1; k < exam.items.length; k++) {
      await tester.ensureVisible(find.byKey(const ValueKey('btn-next-q')));
      await tester.tap(find.byKey(const ValueKey('btn-next-q')));
      await tester.pump(const Duration(milliseconds: 300));
    }
    await tester.ensureVisible(find.byKey(const ValueKey('btn-submit')));
    await tester.tap(find.byKey(const ValueKey('btn-submit')));
    await tester.pump(const Duration(milliseconds: 300));
    await tester.tap(find.byKey(const ValueKey('btn-confirm-submit')));
    for (var i = 0; i < 20 && find.byKey(const ValueKey('report-teacher')).evaluate().isEmpty; i++) {
      await tester.pump(const Duration(milliseconds: 200));
    }
    expect(music.played, containsAll(['stop', 'end']));
    expect(find.byKey(const ValueKey('report-teacher')), findsOneWidget);
    for (var i = 0; i < 40 && !voice.spoken.any((t) => t.contains('nộp bài rồi')); i++) {
      await tester.pump(const Duration(milliseconds: 250));
    }
    expect(voice.spoken.any((t) => t.contains('nộp bài rồi')), isTrue);
    await tester.pumpWidget(const SizedBox());
    await tester.pump(const Duration(seconds: 10));
  });
}
