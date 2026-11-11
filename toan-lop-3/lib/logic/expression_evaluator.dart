/// Tính giá trị biểu thức số tự nhiên đơn giản dùng trong nội dung lớp 3:
/// `+`, `-` (hoặc `−`, `–`), `×` (hoặc `x`, `*`), `:` (hoặc `÷`), ngoặc tròn.
/// Nhân/chia trước, cộng/trừ sau. Phép chia phải chia hết.
///
/// Dùng để TỰ KIỂM TRA nội dung: mọi dòng như "13 × 4 = 52 (cây)" phải đúng.
library;

class ExpressionException implements Exception {
  ExpressionException(this.message);
  final String message;

  @override
  String toString() => message;
}

/// Kiểm tra một đẳng thức "a op b = c [= d...] (đơn vị)".
/// Trả về null nếu đúng, hoặc thông báo lỗi.
String? checkEquation(String text) {
  var s = text.trim();
  // Bỏ đơn vị trong ngoặc ở cuối: "52 + 38 = 90 (cây)".
  s = s.replaceFirst(RegExp(r'\s*\([^()0-9]*\)\s*$'), '');
  final sides = s.split('=');
  if (sides.length < 2) return 'không có dấu "="';
  try {
    final values = [for (final side in sides) evaluate(side)];
    for (var i = 1; i < values.length; i++) {
      if (values[i] != values[0]) {
        return '"${sides[0].trim()}" = ${values[0]} nhưng ghi là "${sides[i].trim()}" (= ${values[i]})';
      }
    }
    return null;
  } on ExpressionException catch (e) {
    return e.message;
  }
}

int evaluate(String expression) {
  final tokens = _tokenize(expression);
  if (tokens.isEmpty) throw ExpressionException('biểu thức rỗng');
  final parser = _Parser(tokens);
  final value = parser.parseSum();
  if (!parser.atEnd) {
    throw ExpressionException('thừa ký tự trong "$expression"');
  }
  return value;
}

List<String> _tokenize(String s) {
  final tokens = <String>[];
  var i = 0;
  while (i < s.length) {
    final c = s[i];
    if (c.trim().isEmpty) {
      i++;
    } else if (RegExp(r'[0-9]').hasMatch(c)) {
      final start = i;
      // Cho phép phân nhóm nghìn bằng dấu chấm: 12.345
      while (i < s.length && RegExp(r'[0-9.]').hasMatch(s[i])) {
        i++;
      }
      final raw = s.substring(start, i);
      if (raw.contains('.') && !RegExp(r'^[0-9]{1,3}(\.[0-9]{3})+$').hasMatch(raw)) {
        throw ExpressionException('số "$raw" viết sai');
      }
      tokens.add(raw.replaceAll('.', ''));
    } else if ('+-−–'.contains(c)) {
      tokens.add(c == '+' ? '+' : '-');
      i++;
    } else if ('×xX*'.contains(c)) {
      tokens.add('×');
      i++;
    } else if (':÷'.contains(c)) {
      tokens.add(':');
      i++;
    } else if ('()'.contains(c)) {
      tokens.add(c);
      i++;
    } else {
      throw ExpressionException('ký tự lạ "$c"');
    }
  }
  return tokens;
}

class _Parser {
  _Parser(this.tokens);

  final List<String> tokens;
  var pos = 0;

  bool get atEnd => pos >= tokens.length;
  String? get peek => atEnd ? null : tokens[pos];

  int parseSum() {
    var value = parseProduct();
    while (peek == '+' || peek == '-') {
      final op = tokens[pos++];
      final rhs = parseProduct();
      value = op == '+' ? value + rhs : value - rhs;
    }
    return value;
  }

  int parseProduct() {
    var value = parseAtom();
    while (peek == '×' || peek == ':') {
      final op = tokens[pos++];
      final rhs = parseAtom();
      if (op == '×') {
        value *= rhs;
      } else {
        if (rhs == 0) throw ExpressionException('chia cho 0');
        if (value % rhs != 0) {
          throw ExpressionException('$value : $rhs không chia hết');
        }
        value ~/= rhs;
      }
    }
    return value;
  }

  int parseAtom() {
    final t = peek;
    if (t == null) throw ExpressionException('thiếu số');
    pos++;
    if (t == '(') {
      final v = parseSum();
      if (peek != ')') throw ExpressionException('thiếu ")"');
      pos++;
      return v;
    }
    final v = int.tryParse(t);
    if (v == null) throw ExpressionException('cần số nhưng gặp "$t"');
    return v;
  }
}
