import 'package:unorm_dart/unorm_dart.dart' as unorm;

/// Kết quả đọc số bé nhập.
sealed class ParsedNumber {
  const ParsedNumber();
}

class ValidNumber extends ParsedNumber {
  const ValidNumber(this.value);
  final int value;
}

/// Không phải số (vd "abc", "1,5", "-3") → nhắc nhẹ, không tính là sai.
class InvalidNumber extends ParsedNumber {
  const InvalidNumber();
}

/// Ô còn trống.
class EmptyInput extends ParsedNumber {
  const EmptyInput();
}

final _whitespace = RegExp(r'\s+');
final _digitsOnly = RegExp(r'^[0-9]+$');
final _viThousands = RegExp(r'^[0-9]{1,3}(\.[0-9]{3})+$');

/// Chuẩn hoá Unicode NFC, bỏ khoảng trắng thừa.
String normalizeText(String input) =>
    unorm.nfc(input).trim().replaceAll(_whitespace, ' ');

/// Đọc số theo luật trong schema:
/// NFC → trim → bỏ đơn vị cuối (nếu có) → bỏ khoảng trắng giữa chữ số
/// → bỏ dấu chấm phân nhóm nghìn kiểu Việt Nam → số nguyên ≥ 0.
ParsedNumber parseNumberInput(
  String input, {
  List<String> units = const [],
  bool allowLeadingZeros = true,
}) {
  var s = normalizeText(input).toLowerCase();
  if (s.isEmpty) return const EmptyInput();

  // Bỏ đơn vị ở cuối, ưu tiên đơn vị dài trước ("ki-lô-gam" trước "kg").
  final sortedUnits = [
    for (final u in units) normalizeText(u).toLowerCase(),
  ]..sort((a, b) => b.length.compareTo(a.length));
  for (final u in sortedUnits) {
    if (u.isNotEmpty && s.endsWith(u)) {
      s = s.substring(0, s.length - u.length).trim();
      break;
    }
  }
  if (s.isEmpty) return const InvalidNumber();

  s = s.replaceAll(' ', '');
  if (_viThousands.hasMatch(s)) s = s.replaceAll('.', '');
  if (!_digitsOnly.hasMatch(s)) return const InvalidNumber();
  if (!allowLeadingZeros && s.length > 1 && s.startsWith('0')) {
    return const InvalidNumber();
  }
  // Giới hạn độ dài để tránh tràn số với dữ liệu lạ.
  if (s.replaceFirst(RegExp(r'^0+(?=.)'), '').length > 9) {
    return const InvalidNumber();
  }
  return ValidNumber(int.parse(s));
}

const _combiningMarks = (0x0300, 0x036F);

/// Bỏ dấu tiếng Việt ("Bảy" → "Bay", "đ" → "d") để so sánh lỏng.
String stripDiacritics(String input) {
  final decomposed = unorm.nfd(input);
  final buffer = StringBuffer();
  for (final rune in decomposed.runes) {
    if (rune >= _combiningMarks.$1 && rune <= _combiningMarks.$2) continue;
    buffer.writeCharCode(rune);
  }
  return buffer.toString().replaceAll('đ', 'd').replaceAll('Đ', 'D');
}

/// So sánh câu trả lời dạng chữ.
bool textMatches(
  String input,
  String expected, {
  required bool ignoreCase,
  required bool ignoreDiacritics,
}) {
  var a = normalizeText(input);
  var b = normalizeText(expected);
  if (ignoreDiacritics) {
    a = stripDiacritics(a);
    b = stripDiacritics(b);
  }
  if (ignoreCase) {
    a = a.toLowerCase();
    b = b.toLowerCase();
  }
  return a == b;
}
