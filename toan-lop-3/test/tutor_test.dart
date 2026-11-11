import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:toan_lop_3/logic/answer_checker.dart';
import 'package:toan_lop_3/logic/quiz_session.dart';
import 'package:toan_lop_3/logic/tutor.dart';
import 'package:toan_lop_3/models/content.dart';
import 'package:toan_lop_3/models/json_reader.dart';
import 'package:toan_lop_3/models/problem.dart';
import 'package:toan_lop_3/services/sound_service.dart';
import 'package:toan_lop_3/services/tutor_voice.dart';
import 'package:toan_lop_3/ui/app_theme.dart';
import 'package:toan_lop_3/ui/quiz_screen.dart';

import 'content_test.dart' show correctAnswerOf;
import 'helpers.dart';

/// Các số trong đáp án (để kiểm tra gợi ý không lộ đáp án).
Iterable<int> answerNumbers(Problem p) sync* {
  switch (p.body) {
    case FillBlankBody(:final blanks):
      for (final b in blanks) {
        if (b.answer case NumberAnswerRule(:final value)) yield value;
      }
    case MultipleChoiceBody(:final choices, :final correctChoiceIds):
      for (final c in choices.where((c) => correctChoiceIds.contains(c.id))) {
        final m = RegExp(r'^\d+').firstMatch(c.text);
        if (m != null) yield int.parse(m.group(0)!);
      }
    default:
      break;
  }
}

void main() {
  final brain = TutorBrain(random: Random(1));
  final lessons = [loadLessonFromDisk('kntt3.c4.nhan-2cs-1cs'), loadLessonFromDisk('kntt3.c4.chia-2cs-1cs')];
  final exams = examFiles().map((f) => loadExamFromDisk(f.uri.pathSegments.last.replaceAll('.json', ''))).toList();
  final allProblems = [for (final l in lessons) ...l.problems, for (final e in exams) ...e.items.map((i) => i.problem)];

  test('câu chào đúng lời chủ dự án, có tên bé nếu đã đặt', () {
    expect(brain.greeting('Bé'), 'Chào mừng con! Hôm nay chúng ta cùng chinh phục điểm 10 môn Toán nhé!');
    // Câu chào cố định (đã ghi âm sẵn) nên không chèn tên bé — giọng luôn khớp chữ.
    expect(brain.greeting('Na'), brain.greeting());
  });

  test('gợi ý của cô Ong KHÔNG BAO GIỜ chứa đáp án (mọi bài, mọi đề)', () {
    for (final p in allProblems) {
      final h = brain.hint(p);
      expect(h, isNotEmpty);
      for (final n in answerNumbers(p).where((n) => n >= 10)) {
        expect(RegExp('(^|[^0-9])$n([^0-9]|\$)').hasMatch(h), isFalse, reason: '${p.id}: "$h" lộ đáp án $n');
      }
    }
  });

  test('gợi ý theo từ khoá và theo dạng phép tính', () {
    Problem make(String prompt) => Problem.fromJson(
      JsonReader.root({
        'id': 'x.p1',
        'rev': 1,
        'type': 'fill_blank',
        'prompt': {'text': prompt},
        'level': 1,
        'skillIds': ['a'],
        'access': 'free',
        'template': '{{b1}}',
        'blanks': [
          {
            'id': 'b1',
            'answer': {'kind': 'number', 'value': 3},
          },
        ],
        'solution': {
          'access': 'free',
          'answerText': '3',
          'steps': [
            {'kind': 'text', 'text': '...'},
          ],
        },
      }),
    );
    expect(brain.hint(make('Lan có ít hơn Mai 5 cái kẹo.')), contains('ít hơn'));
    final lesson = lessons.first;
    final noAuthoredHint = lesson.problems.firstWhere((p) => p.solution.hint == null && p.type == ProblemType.dragDrop);
    expect(brain.hint(noAuthoredHint), contains('kéo'));
  });

  test('lời khen theo chuỗi câu đúng; sai thì gợi ý; hết lượt thì cùng xem cách làm', () {
    var now = DateTime(2026, 11, 11, 8);
    final s = QuizSession(lesson: lessons.first, isVip: false, random: Random(2), clock: () => now);
    now = now.add(const Duration(seconds: 5));
    s.submit(correctAnswerOf(s.current));
    expect(s.combo, 1);
    expect(s.message, isIn(['Con làm nhanh quá!', 'Nhanh mà chính xác, giỏi lắm!']));
    s.next();
    now = now.add(const Duration(seconds: 40));
    s.submit(correctAnswerOf(s.current));
    s.next();
    now = now.add(const Duration(seconds: 40));
    s.submit(correctAnswerOf(s.current));
    expect(s.combo, 3);
    expect(TutorLines.praiseCombo, contains(s.message));
    s.next();
    // Câu 4 (điền số 45 cm): sai → gợi ý, chuỗi về 0
    s.submit(const BlankAnswer({'b1': '18'}));
    expect(s.combo, 0);
    expect(s.message, contains('15 × 3'));
    expect(s.message, isNot(contains('45')));
    s.retry();
    s.submit(const BlankAnswer({'b1': '19'}));
    expect(s.phase, QuestionPhase.revealed);
    expect(s.bestCombo, 3);
  });

  test('chưa xin gợi ý / chưa trả lời thì chưa xem được lời giải', () {
    final s = QuizSession(lesson: lessons.first, isVip: false);
    expect(s.canViewSolution, isFalse);
    s.requestHint();
    expect(s.hintShown, isTrue);
    expect(s.message, isNotNull);
    expect(s.canViewSolution, isTrue);
    s.next(); // chưa trả lời → chưa được sang câu
    expect(s.index, 0);
  });

  testWidgets('cô Ong đọc to lời khen / gợi ý; tắt giọng thì không đọc', (tester) async {
    tester.view.physicalSize = const Size(1080, 2340);
    tester.view.devicePixelRatio = 2.5;
    addTearDown(tester.view.reset);
    final voice = SilentTutorVoice();
    await tester.pumpWidget(
      MaterialApp(
        theme: buildAppTheme(),
        home: QuizScreen(
          lesson: lessons.first,
          sound: const SilentSoundService(),
          random: Random(7),
          voice: voice,
          readAloud: false,
        ),
      ),
    );
    await tester.pumpAndSettle();
    await tester.tap(find.byKey(const ValueKey('btn-hint')));
    await tester.pumpAndSettle();
    expect(voice.spoken.single, contains('Lấy ba nhân hàng đơn vị trước'), reason: 'giọng máy nhận bản đọc bằng chữ');
    await tester.tap(find.byKey(const ValueKey('numpad-6')));
    await tester.tap(find.byKey(const ValueKey('numpad-3')));
    await tester.pumpAndSettle();
    await tester.tap(find.byKey(const ValueKey('btn-check')));
    await tester.pumpAndSettle();
    expect(voice.spoken, hasLength(2));
    expect(find.byKey(const ValueKey('tutor-text')), findsOneWidget);

    final quiet = SilentTutorVoice();
    await tester.pumpWidget(
      MaterialApp(
        theme: buildAppTheme(),
        home: QuizScreen(
          lesson: lessons.last,
          sound: const SilentSoundService(),
          voice: quiet,
          voiceOn: false,
          key: UniqueKey(),
        ),
      ),
    );
    await tester.pumpAndSettle();
    await tester.tap(find.byKey(const ValueKey('btn-hint')));
    await tester.pumpAndSettle();
    expect(quiet.spoken, isEmpty);
    await tester.tap(find.byKey(const ValueKey('tutor-speak')));
    await tester.pumpAndSettle();
    expect(quiet.spoken, hasLength(1), reason: 'bé bấm loa thì vẫn đọc');
  });

  test('catalog có kidName cho mọi kỹ năng', () {
    final Catalog c = loadCatalogFromDisk();
    expect(c.skills.every((s) => s.kidName != null), isTrue);
  });
}
