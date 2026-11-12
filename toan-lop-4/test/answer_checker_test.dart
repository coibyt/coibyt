import 'package:flutter_test/flutter_test.dart';
import 'package:toan_lop_4/logic/answer_checker.dart';
import 'package:toan_lop_4/models/problem.dart';

import 'helpers.dart';

void main() {
  final lesson = loadLessonFromDisk('kntt4.c8.nhan-voi-so-co-mot-chu-so');
  Problem p(String suffix) => lesson.problems.firstWhere((x) => x.id.endsWith(suffix));

  group('Trắc nghiệm', () {
    test('đúng / sai / chưa chọn', () {
      // 404.173 × 2 = 808.346 (đáp án a)
      expect(checkAnswer(p('p03'), const ChoiceAnswer({'a'})).status, CheckStatus.correct);
      final wrong = checkAnswer(p('p03'), const ChoiceAnswer({'b'}));
      expect(wrong.status, CheckStatus.incorrect);
      expect(wrong.partCorrect, {'b': false});
      expect(checkAnswer(p('p03'), const ChoiceAnswer({})).status, CheckStatus.incomplete);
    });
  });

  group('Điền số', () {
    test('đúng, có đơn vị, sai, trống, sai định dạng', () {
      // 40.140 × 2 = 80.280; kho còn 44.801 kg thóc.
      expect(checkAnswer(p('p01'), const BlankAnswer({'b1': '80280'})).status, CheckStatus.correct);
      expect(checkAnswer(p('p01'), const BlankAnswer({'b1': '80.280'})).status, CheckStatus.correct);
      expect(checkAnswer(p('p09'), const BlankAnswer({'b1': '44801 kg'})).status, CheckStatus.correct);
      expect(checkAnswer(p('p09'), const BlankAnswer({'b1': '44801 ki-lô-gam'})).status, CheckStatus.correct);
      expect(checkAnswer(p('p01'), const BlankAnswer({'b1': '80820'})).status, CheckStatus.incorrect);
      expect(checkAnswer(p('p01'), const BlankAnswer({})).status, CheckStatus.incomplete);
      expect(checkAnswer(p('p01'), const BlankAnswer({'b1': '6,3'})).status, CheckStatus.invalidFormat);
    });
  });

  group('Kéo thả', () {
    test('đủ ô đúng / một ô sai / thiếu ô', () {
      const ok = DragDropAnswer({'s1': 't1', 's2': 't4', 's3': 't2'});
      expect(checkAnswer(p('p04'), ok).status, CheckStatus.correct);
      final r = checkAnswer(p('p04'), const DragDropAnswer({'s1': 't1', 's2': 't3', 's3': 't2'}));
      expect(r.status, CheckStatus.incorrect);
      expect(r.partCorrect['s2'], isFalse);
      expect(checkAnswer(p('p04'), const DragDropAnswer({'s1': 't1'})).status, CheckStatus.incomplete);
    });
  });

  group('Nối', () {
    test('đúng / sai / chưa nối hết', () {
      const ok = MatchingAnswer({'l1': 'r5', 'l2': 'r4', 'l3': 'r1', 'l4': 'r2'});
      expect(checkAnswer(p('p05'), ok).status, CheckStatus.correct);
      final r = checkAnswer(p('p05'), const MatchingAnswer({'l1': 'r5', 'l2': 'r4', 'l3': 'r3', 'l4': 'r2'}));
      expect(r.status, CheckStatus.incorrect);
      expect(r.partCorrect['l3'], isFalse);
      expect(checkAnswer(p('p05'), const MatchingAnswer({'l1': 'r5'})).status, CheckStatus.incomplete);
    });
  });

  test('câu trả lời sai kiểu dạng bài → lỗi lập trình', () {
    expect(() => checkAnswer(p('p01'), const ChoiceAnswer({'a'})), throwsArgumentError);
  });
}
