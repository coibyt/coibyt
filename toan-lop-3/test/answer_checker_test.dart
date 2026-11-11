import 'package:flutter_test/flutter_test.dart';
import 'package:toan_lop_3/logic/answer_checker.dart';
import 'package:toan_lop_3/models/problem.dart';

import 'helpers.dart';

void main() {
  final lesson = loadLessonFromDisk('kntt3.c4.nhan-2cs-1cs');
  Problem p(String suffix) => lesson.problems.firstWhere((x) => x.id.endsWith(suffix));

  group('Trắc nghiệm', () {
    test('đúng / sai / chưa chọn', () {
      expect(checkAnswer(p('p02'), const ChoiceAnswer({'b'})).status, CheckStatus.correct);
      final wrong = checkAnswer(p('p02'), const ChoiceAnswer({'a'}));
      expect(wrong.status, CheckStatus.incorrect);
      expect(wrong.partCorrect, {'a': false});
      expect(checkAnswer(p('p02'), const ChoiceAnswer({})).status, CheckStatus.incomplete);
    });
  });

  group('Điền số', () {
    test('đúng, có đơn vị, sai, trống, sai định dạng', () {
      expect(checkAnswer(p('p01'), const BlankAnswer({'b1': '63'})).status, CheckStatus.correct);
      expect(checkAnswer(p('p04'), const BlankAnswer({'b1': '45 cm'})).status, CheckStatus.correct);
      expect(checkAnswer(p('p04'), const BlankAnswer({'b1': '45 xăng-ti-mét'})).status, CheckStatus.correct);
      expect(checkAnswer(p('p01'), const BlankAnswer({'b1': '36'})).status, CheckStatus.incorrect);
      expect(checkAnswer(p('p01'), const BlankAnswer({})).status, CheckStatus.incomplete);
      expect(checkAnswer(p('p01'), const BlankAnswer({'b1': '6,3'})).status, CheckStatus.invalidFormat);
    });
  });

  group('Kéo thả', () {
    test('đủ ô đúng / một ô sai / thiếu ô', () {
      const ok = DragDropAnswer({'s1': 't1', 's2': 't2', 's3': 't3'});
      expect(checkAnswer(p('p06'), ok).status, CheckStatus.correct);
      final r = checkAnswer(p('p06'), const DragDropAnswer({'s1': 't1', 's2': 't4', 's3': 't3'}));
      expect(r.status, CheckStatus.incorrect);
      expect(r.partCorrect['s2'], isFalse);
      expect(checkAnswer(p('p06'), const DragDropAnswer({'s1': 't1'})).status, CheckStatus.incomplete);
    });
  });

  group('Nối', () {
    test('đúng / sai / chưa nối hết', () {
      const ok = MatchingAnswer({'l1': 'r2', 'l2': 'r1', 'l3': 'r4', 'l4': 'r3'});
      expect(checkAnswer(p('p07'), ok).status, CheckStatus.correct);
      final r = checkAnswer(p('p07'), const MatchingAnswer({'l1': 'r2', 'l2': 'r1', 'l3': 'r5', 'l4': 'r3'}));
      expect(r.status, CheckStatus.incorrect);
      expect(r.partCorrect['l3'], isFalse);
      expect(checkAnswer(p('p07'), const MatchingAnswer({'l1': 'r2'})).status, CheckStatus.incomplete);
    });
  });

  test('câu trả lời sai kiểu dạng bài → lỗi lập trình', () {
    expect(() => checkAnswer(p('p01'), const ChoiceAnswer({'a'})), throwsArgumentError);
  });
}
