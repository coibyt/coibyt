/// Chuyển câu có số & ký hiệu toán sang dạng ĐỌC tiếng Việt cho máy đọc (11max):
/// "75 : 5 = 15" → "bảy mươi lăm chia năm bằng mười lăm". Chữ hiển thị trên màn hình giữ nguyên.
library;

const _digits = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];

/// Đọc số 0–99.
String _twoDigits(int n, {required bool afterHundred}) {
  if (n < 10) return afterHundred ? 'linh ${_digits[n]}' : _digits[n];
  final t = n ~/ 10, u = n % 10;
  final tens = t == 1 ? 'mười' : '${_digits[t]} mươi';
  if (u == 0) return tens;
  final unit = switch (u) {
    1 when t > 1 => 'mốt',
    4 when t > 1 => 'tư',
    5 => 'lăm',
    _ => _digits[u],
  };
  return '$tens $unit';
}

/// Đọc số 0–999 (đầy đủ hàng trăm khi [full], vd "không trăm linh năm").
String _threeDigits(int n, {required bool full}) {
  final h = n ~/ 100, rest = n % 100;
  if (h == 0 && !full) return _twoDigits(rest, afterHundred: false);
  final head = '${_digits[h]} trăm';
  if (rest == 0) return head;
  return '$head ${_twoDigits(rest, afterHundred: true)}';
}

/// Đọc số nguyên 0–999 999 999 999 bằng chữ tiếng Việt.
String numberToVietnamese(int n) {
  if (n == 0) return 'không';
  final parts = <String>[];
  const scales = ['', 'nghìn', 'triệu', 'tỉ'];
  final groups = <int>[];
  var x = n;
  while (x > 0) {
    groups.add(x % 1000);
    x ~/= 1000;
  }
  for (var i = groups.length - 1; i >= 0; i--) {
    final g = groups[i];
    if (g == 0) continue;
    final full = i < groups.length - 1; // nhóm sau nhóm đầu đọc đủ "không trăm"
    parts.add([_threeDigits(g, full: full), scales[i]].where((s) => s.isNotEmpty).join(' '));
  }
  return parts.join(' ');
}

const _units = {
  'dm': 'đề-xi-mét',
  'kg': 'ki-lô-gam',
  'cm': 'xăng-ti-mét',
  'mm': 'mi-li-mét',
  'ml': 'mi-li-lít',
  'km': 'ki-lô-mét',
  'g': 'gam',
  'm': 'mét',
  'l': 'lít',
};

/// Mẫu số đọc sau chữ "phần": 4 → "tư" ("ba phần tư"), các số khác đọc bình thường.
String _denominator(int d) => d == 4 ? 'tư' : numberToVietnamese(d);

const _romanValues = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100};

/// Giá trị số La Mã (null nếu không hợp lệ).
int? romanValue(String r) {
  var total = 0;
  for (var i = 0; i < r.length; i++) {
    final v = _romanValues[r[i]];
    if (v == null) return null;
    final next = i + 1 < r.length ? _romanValues[r[i + 1]] ?? 0 : 0;
    total += v < next ? -v : v;
  }
  return total;
}

/// Dạng đọc của câu (giữ nguyên câu không có số/ký hiệu).
String spokenVietnamese(String text) {
  var s = text;
  // Thế kỉ viết bằng số La Mã: "thế kỉ XXI" → "thế kỉ hai mươi mốt".
  s = s.replaceAllMapped(RegExp(r'(thế kỉ|Thế kỉ)\s+([IVXLC]+)\b'), (m) {
    final v = romanValue(m[2]!);
    return v == null ? m[0]! : '${m[1]} ${numberToVietnamese(v)}';
  });
  // Đơn vị diện tích: "25 m²" → "25 mét vuông".
  s = s.replaceAllMapped(RegExp(r'(\d|\(|\s)\s*(km|dm|cm|mm|m)(²|2\b)'), (m) => '${m[1]} ${_units[m[2]]} vuông');
  // Góc: "60°" → "60 độ".
  s = s.replaceAllMapped(RegExp(r'(\d)\s*°(?!C)'), (m) => '${m[1]} độ');
  // Đơn vị đứng sau số hoặc trong ngoặc: "93 kg", "(l)", "35 °C"
  s = s.replaceAllMapped(RegExp(r'(\d)\s*°C'), (m) => '${m[1]} độ C');
  s = s.replaceAllMapped(
    RegExp(r'(\d|\()\s*(kg|dm|cm|mm|ml|km|g|m|l)(?![\p{L}\d])', unicode: true),
    (m) => '${m[1]} ${_units[m[2]]}',
  );
  // Phép tính giữa hai số
  s = s.replaceAllMapped(RegExp(r'(\d)\s*[×x*]\s*(?=[\d?])'), (m) => '${m[1]} nhân ');
  s = s.replaceAllMapped(RegExp(r'(\d)\s*[:÷]\s*(?=[\d?])'), (m) => '${m[1]} chia ');
  s = s.replaceAllMapped(RegExp(r'(\d)\s*\+\s*(?=[\d?])'), (m) => '${m[1]} cộng ');
  s = s.replaceAllMapped(RegExp(r'(\d)\s*[-−–]\s*(?=[\d?])'), (m) => '${m[1]} trừ ');
  s = s.replaceAll(RegExp(r'\s*=\s*\?'), ' bằng bao nhiêu?');
  s = s.replaceAll(RegExp(r'\s*=\s*'), ' bằng ');
  // Phân số "3/4" → "ba phần tư".
  s = s.replaceAllMapped(
    RegExp(r'(\d+)\s*/\s*(\d+)'),
    (m) => '${numberToVietnamese(int.parse(m[1]!))} phần ${_denominator(int.parse(m[2]!))}',
  );
  // Số (kể cả 12.345) → chữ; "3A" → "ba A"
  s = s.replaceAllMapped(
    RegExp(r'\d{1,3}(?:\.\d{3})+|\d+'),
    (m) => numberToVietnamese(int.parse(m[0]!.replaceAll('.', ''))),
  );
  s = s.replaceAllMapped(RegExp(r'([a-zà-ỹ])([A-Z])\b'), (m) => '${m[1]} ${m[2]}');
  return s.replaceAll(RegExp(r'\s+'), ' ').trim();
}
