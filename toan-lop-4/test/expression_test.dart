import 'package:flutter_test/flutter_test.dart';
import 'package:toan_lop_4/logic/expression_evaluator.dart';

void main() {
  test('tính biểu thức', () {
    expect(evaluate('13 × 4'), 52);
    expect(evaluate('93 - 27 × 2'), 39);
    expect(evaluate('(52 + 38) : 3'), 30);
    expect(evaluate('1.000 + 25'), 1025);
  });

  test('kiểm tra đẳng thức có đơn vị', () {
    expect(checkEquation('52 + 38 = 90 (cây)'), isNull);
    expect(checkEquation('24 × 3 = 72 (cái)'), isNull);
    expect(checkEquation('24 × 3 = 82 (cái)'), isNotNull);
    // Lớp 4: 7 : 2 = 7/2 (phân số) → sai vì hai vế không bằng nhau.
    expect(checkEquation('7 : 2 = 3'), allOf(contains('7/2'), contains('nhưng ghi là')));
    expect(checkEquation('7 : 2 = 7/2'), isNull);
    expect(checkEquation('7 + 2'), isNotNull);
  });
}
