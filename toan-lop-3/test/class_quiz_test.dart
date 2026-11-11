import 'package:flutter_test/flutter_test.dart';
import 'package:toan_lop_3/logic/demo_script.dart';
import 'package:toan_lop_3/logic/visual_story.dart';
import 'package:toan_lop_3/ui/teacher_class_screen.dart' show hideResult;
import 'package:toan_lop_3/ui/widgets/visual_aid.dart';

import 'helpers.dart';

void main() {
  remedyTests();
  test('câu hỏi nhanh từ phép tính mẫu và bước đặt tính: đáp án đúng nằm trong 3 lựa chọn', () {
    final e = equationQuiz('6 × 8 = 48')!;
    expect(e.question, 'Đố con: 6 × 8 = ?');
    expect(e.choices[e.correct], '48');
    expect(e.choices.toSet(), hasLength(3));
    final s = stepQuiz('3 nhân 6 bằng 18, viết 8 nhớ 1.')!;
    expect(s.question, 'Đố con: 3 nhân 6 bằng bao nhiêu?');
    expect(s.choices[s.correct], '18');
    final d = stepQuiz('Hạ 6, được 16; 16 chia 4 được 4, viết 4.')!;
    expect(d.choices[d.correct], '4');
    expect(equationQuiz('Bảng nhân 6'), isNull);
    expect(hideResult('6 × 8 = 48'), '6 × 8 = ?');
    // Cố định: tạo lại ra đúng thứ tự (để ghi âm sẵn lời cô).
    expect(equationQuiz('6 × 8 = 48')!.choices, e.choices);
  });

  test('mọi bài học đều có ít nhất 1 câu cô hỏi (tối đa 3), đáp án hợp lệ', () {
    final catalog = loadCatalogFromDisk();
    for (final c in catalog.books.first.chapters) {
      for (final ref in [...c.lessons, ...c.advancedLessons]) {
        final l = loadLessonFromDisk(ref.id);
        final scenes = buildDemoScript(l.theory.blocks, problems: l.problems);
        final quizzes = [for (final s in scenes) ?s.quiz];
        expect(quizzes.length, inInclusiveRange(1, 3), reason: ref.id);
        for (final q in quizzes) {
          expect(q.correct, inInclusiveRange(0, q.choices.length - 1));
          expect(q.choices.toSet().length, q.choices.length, reason: '${ref.id}: ${q.question}');
        }
      }
    }
  });

  test('tranh minh hoạ: nhân/chia/cộng/trừ nhỏ vẽ nhóm, số lớn vẽ khối trăm chục đơn vị', () {
    expect(VisualAid.forEquation('6 × 4 = 24'), isNotNull);
    expect(VisualAid.forEquation('24 : 6 = 4'), isNotNull);
    expect(VisualAid.forEquation('8 + 5 = 13'), isNotNull);
    expect(VisualAid.forEquation('234 + 102 = 336'), isNotNull);
    expect(VisualAid.forEquation('Bảng nhân 6: 6 × 1 = 6; 6 × 2 = 12'), isNull);
  });
}

void remedyTests() {
  test('tranh đồ vật: 6 × 8 → 8 đĩa/giỏ, mỗi cái 6 đồ vật; cô đếm thêm 6 từng nhóm', () {
    final s = aidStory('6 × 8 = 48')!;
    expect(s.kind, 'mul');
    expect(s.groups, 8);
    expect(s.itemsIn(0), 6);
    final counts = [
      for (final (t, lit) in s.lines)
        if (lit != null && lit >= 0) t,
    ];
    expect(counts, ['6', '12', '18', '24', '30', '36', '42', '48']);
    expect(s.lines.last.$1, 'Vậy 6 nhân 8 bằng 48.');
    expect(aidStory('24 : 6 = 4')!.caption, contains('mỗi'));
    expect(aidStory('8 − 3 = 5')!.kind, 'sub');
  });

  test('câu dễ hơn: chỉ còn 2 đáp án, vẫn có đáp án đúng', () {
    final q = equationQuiz('6 × 8 = 48')!;
    final e = q.easier;
    expect(e.choices, hasLength(2));
    expect(e.choices[e.correct], '48');
    expect(q.aid, '6 × 8 = 48');
    expect(stepQuiz('3 nhân 6 bằng 18, viết 8 nhớ 1.')!.aid, '3 × 6 = 18');
  });

  test('cuối bài: hỏi con hiểu bài chưa + 2 câu kiểm tra + tổng kết', () {
    final l = loadLessonFromDisk('kntt3.c4.nhan-2cs-1cs');
    final scenes = buildDemoScript(l.theory.blocks, problems: l.problems, checks: true, outro: const ['Xong']);
    final survey = scenes.indexWhere((s) => s.quiz?.survey ?? false);
    expect(survey, greaterThan(0));
    expect(scenes.where((s) => s.check), hasLength(2));
    expect(scenes.where((s) => s.summary), hasLength(1));
    expect(scenes.last.say, ['Xong']);
  });
}
