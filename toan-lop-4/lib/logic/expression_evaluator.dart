/// Tính giá trị biểu thức dùng trong nội dung lớp 4: số tự nhiên và phân số `a/b`,
/// `+`, `-` (hoặc `−`, `–`), `×` (hoặc `x`, `*`), `:` (hoặc `÷`), ngoặc tròn.
/// Nhân/chia trước, cộng/trừ sau. Chia hai số tự nhiên phải chia hết; có phân số thì chia phân số.
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
    final values = [for (final side in sides) evaluateQ(side)];
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

/// Số hữu tỉ tối giản (mẫu luôn dương) để kiểm tra phép tính phân số.
class Q {
  factory Q(int n, [int d = 1]) {
    if (d == 0) throw ExpressionException('mẫu số bằng 0');
    if (d < 0) {
      n = -n;
      d = -d;
    }
    final g = _gcd(n.abs(), d);
    return Q._(g == 0 ? 0 : n ~/ g, g == 0 ? 1 : d ~/ g);
  }
  const Q._(this.n, this.d);

  final int n;
  final int d;

  static int _gcd(int a, int b) => b == 0 ? a : _gcd(b, a % b);

  bool get isInt => d == 1;
  Q operator +(Q o) => Q(n * o.d + o.n * d, d * o.d);
  Q operator -(Q o) => Q(n * o.d - o.n * d, d * o.d);
  Q operator *(Q o) => Q(n * o.n, d * o.d);
  Q div(Q o) {
    if (o.n == 0) throw ExpressionException('chia cho 0');
    return Q(n * o.d, d * o.n);
  }

  @override
  bool operator ==(Object other) => other is Q && other.n == n && other.d == d;

  @override
  int get hashCode => Object.hash(n, d);

  @override
  String toString() => d == 1 ? '$n' : '$n/$d';
}

/// Giá trị biểu thức số tự nhiên (không có phân số).
int evaluate(String expression) {
  final v = evaluateQ(expression);
  if (!v.isInt) throw ExpressionException('"$expression" không ra số tự nhiên');
  return v.n;
}

Q evaluateQ(String expression) {
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
    } else if (c == '/') {
      tokens.add('/');
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

  Q parseSum() {
    var value = parseProduct();
    while (peek == '+' || peek == '-') {
      final op = tokens[pos++];
      final rhs = parseProduct();
      value = op == '+' ? value + rhs : value - rhs;
    }
    return value;
  }

  Q parseProduct() {
    var value = parseFraction();
    while (peek == '×' || peek == ':') {
      final op = tokens[pos++];
      final rhs = parseFraction();
      if (op == '×') {
        value = value * rhs;
      } else {
        if (rhs.n == 0) throw ExpressionException('chia cho 0');
        // Lớp 4: thương không chia hết viết được thành phân số; đẳng thức sai vẫn bị bắt khi so hai vế.
        value = value.div(rhs);
      }
    }
    return value;
  }

  /// Phân số viết liền "3/4": gạch phân số gắn chặt nhất.
  Q parseFraction() {
    var value = parseAtom();
    while (peek == '/') {
      pos++;
      value = value.div(parseAtom());
    }
    return value;
  }

  Q parseAtom() {
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
    return Q(v);
  }
}
