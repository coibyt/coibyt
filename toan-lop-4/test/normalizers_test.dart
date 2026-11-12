import 'package:flutter_test/flutter_test.dart';
import 'package:toan_lop_4/logic/normalizers.dart';

int? n(String s, {List<String> units = const [], bool zeros = true}) =>
    switch (parseNumberInput(s, units: units, allowLeadingZeros: zeros)) {
      ValidNumber(:final value) => value,
      _ => null,
    };

void main() {
  group('parseNumberInput', () {
    test('số bình thường và khoảng trắng', () {
      expect(n('63'), 63);
      expect(n('  63 '), 63);
      expect(n('12 345'), 12345);
    });

    test('dấu chấm phân nhóm nghìn kiểu Việt Nam', () {
      expect(n('1.000'), 1000);
      expect(n('12.345'), 12345);
      expect(n('100.000'), 100000);
      expect(n('1.00'), isNull, reason: 'nhóm không đủ 3 chữ số');
      expect(n('12.5'), isNull);
    });

    test('dấu phẩy, số âm, chữ cái là sai định dạng', () {
      expect(parseNumberInput('1,5'), isA<InvalidNumber>());
      expect(parseNumberInput('-3'), isA<InvalidNumber>());
      expect(parseNumberInput('abc'), isA<InvalidNumber>());
      expect(parseNumberInput('   '), isA<EmptyInput>());
    });

    test('đơn vị ở cuối (có/không khoảng trắng, hoa/thường)', () {
      expect(n('45 cm', units: ['cm']), 45);
      expect(n('45cm', units: ['cm']), 45);
      expect(n('45 CM', units: ['cm']), 45);
      expect(n('39 ki-lô-gam', units: ['kg', 'ki-lô-gam']), 39);
      expect(n('45 kg', units: ['cm']), isNull, reason: 'sai đơn vị');
      expect(n('cm', units: ['cm']), isNull);
    });

    test('đơn vị tiếng Việt viết kiểu tổ hợp (NFD) vẫn khớp', () {
      // "quả" gõ dạng chữ u + dấu móc tổ hợp + a + dấu hỏi tổ hợp
      const decomposed = '15 quả';
      expect(n(decomposed, units: ['quả']), 15);
    });

    test('số 0 ở đầu', () {
      expect(n('072'), 72);
      expect(n('072', zeros: false), isNull);
      expect(n('0', zeros: false), 0);
    });
  });

  group('textMatches', () {
    test('không phân biệt hoa thường, giữ dấu', () {
      expect(textMatches('Bảy', 'bảy', ignoreCase: true, ignoreDiacritics: false), isTrue);
      expect(textMatches('bay', 'bảy', ignoreCase: true, ignoreDiacritics: false), isFalse);
      expect(textMatches('bay', 'bảy', ignoreCase: true, ignoreDiacritics: true), isTrue);
      expect(textMatches('đúng', 'dung', ignoreCase: true, ignoreDiacritics: true), isTrue);
    });
  });
}
