/// Đề bài tiếng Anh (chế độ Toán + Tiếng Anh): tách đề thành MẪU + giá trị, tra bản dịch mẫu
/// (english_prompt_table.dart), rồi điền lại số, phân số, tên. Cách tách giống hệt tool/en_templates.py.
library;

import '../models/problem.dart';
import 'english.dart';
import 'english_prompt_table.dart';

const _names = [
  'An', 'Bình', 'Chi', 'Dũng', 'Hà', 'Khôi', 'Lan', 'Mai', 'Minh', 'Nam', 'Ngân', 'Phúc', 'Quân', 'Thảo', 'Vy', //
  'Hùng', 'Linh', 'Hoa', 'Khang', 'Ngọc',
];
const _numWords = {
  'không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín', 'mười', 'mươi', 'mốt', 'tư', 'lăm', //
  'linh', 'lẻ', 'trăm', 'nghìn', 'triệu', 'tỉ',
};
const _scale = {'mươi', 'mười', 'trăm', 'nghìn', 'triệu', 'tỉ'};
final _digitWords = {..._numWords.difference(_scale).difference({'linh', 'lẻ'}), 'mười'};

/// Một chỗ trống của mẫu: kiểu (N, F, P, W) và chữ gốc.
typedef Slot = (String type, String raw);

/// Đề → (mẫu, các giá trị theo thứ tự xuất hiện).
(String, List<Slot>) templatize(String text) {
  final slots = <(int, Slot)>[];
  var t = text;
  // Đánh dấu tạm bằng ký tự riêng để giữ thứ tự xuất hiện khi thay lần lượt từng loại.
  var id = 0;
  final found = <int, Slot>{};
  String mark(String type, String raw) {
    found[id] = (type, raw);
    return '\u0001${String.fromCharCode(0xE000 + id++)}';
  }

  t = t.replaceAllMapped(RegExp(r'“([a-zà-ỹđ ]+)”'), (m) {
    final ws = m[1]!.split(' ').where((w) => w.isNotEmpty).toList();
    return ws.isNotEmpty && ws.every((w) => _numWords.contains(w) || w == 'phần') ? mark('W', m[1]!) : m[0]!;
  });
  final alt = (_numWords.toList()..sort((a, b) => b.length.compareTo(a.length))).join('|');
  t = t.replaceAllMapped(RegExp('(?<![\\wà-ỹđ])(?:(?:$alt)(?![\\wà-ỹđ])\\s?)+'), (m) {
    final text = m[0]!;
    final ws = text.trim().split(RegExp(r'\s+'));
    if (ws.length >= 2 && ws.any(_scale.contains) && ws.any(_digitWords.contains)) {
      final trailing = text.substring(text.trimRight().length);
      return mark('W', text.trim()) + trailing;
    }
    return text;
  });
  t = t.replaceAllMapped(RegExp(r'(\d+)\s*/\s*(\d+)'), (m) => mark('F', '${m[1]}/${m[2]}'));
  t = t.replaceAllMapped(RegExp(r'\d{1,3}(?:\.\d{3})+|\d+'), (m) => mark('N', m[0]!));
  for (final n in [..._names]..sort((a, b) => b.length.compareTo(a.length))) {
    t = t.replaceAllMapped(RegExp('(?<![\\wÀ-ỹ])$n(?![\\wÀ-ỹ])'), (m) => mark('P', n));
  }
  // Thứ tự xuất hiện trong câu.
  final key = t.replaceAllMapped(RegExp('\u0001([\uE000-\uF8FF])'), (m) {
    final s = found[m[1]!.codeUnitAt(0) - 0xE000]!;
    slots.add((m.start, s));
    return '{${s.$1}}';
  });
  return (key, [for (final s in slots) s.$2]);
}

/// Số viết bằng chữ tiếng Việt → số ("bốn triệu không trăm tám mươi lăm nghìn" → 4085000).
int? vietnameseWordsToInt(String words) {
  const digit = {
    'không': 0, 'một': 1, 'mốt': 1, 'hai': 2, 'ba': 3, 'bốn': 4, 'tư': 4, 'năm': 5, 'lăm': 5, //
    'sáu': 6, 'bảy': 7, 'tám': 8, 'chín': 9,
  };
  var total = 0, group = 0, current = 0;
  for (final w in words.split(RegExp(r'\s+'))) {
    if (digit.containsKey(w)) {
      current = digit[w]!;
    } else if (w == 'mười') {
      group += 10;
      current = 0;
    } else if (w == 'mươi') {
      group += current * 10;
      current = 0;
    } else if (w == 'trăm') {
      group += current * 100;
      current = 0;
    } else if (w == 'linh' || w == 'lẻ') {
      continue;
    } else if (w == 'nghìn' || w == 'triệu' || w == 'tỉ') {
      final m = w == 'nghìn' ? 1000 : (w == 'triệu' ? 1000000 : 1000000000);
      total += (group + current) * m;
      group = 0;
      current = 0;
    } else {
      return null;
    }
  }
  return total + group + current;
}

/// Viết số kiểu tiếng Anh: 1.234.567 → 1,234,567.
String englishDigits(String raw) => raw.replaceAll('.', ',');

/// Đề tiếng Anh (null nếu chưa có bản dịch cho mẫu này).
String? englishPrompt(String text) {
  final (key, slots) = templatize(text.trim());
  final tpl = kEnglishPromptTemplates[key];
  if (tpl == null) return null;
  String fill(Slot s) => switch (s.$1) {
    'N' => englishDigits(s.$2),
    'F' => s.$2,
    'P' => s.$2,
    _ => _wordsToEnglish(s.$2),
  };
  var i = 0;
  final indexed = RegExp(r'\{(\d+)\}').hasMatch(tpl);
  final out = tpl.replaceAllMapped(RegExp(r'\{([NFPW]|\d+)\}'), (m) {
    final s = indexed ? slots[int.parse(m[1]!)] : slots[i++];
    return fill(s);
  });
  // "1 pieces" → "1 piece".
  return out.replaceAllMapped(RegExp(r'(?<![\d,.]|number |group |digit |class )\b1 ([a-z]{3,})(es|s)\b'), (m) {
    final w = m[1]!;
    final es = m[2] == 'es' && RegExp(r'(x|ch|sh|ss)$').hasMatch(w);
    return '1 ${es ? w : (m[2] == 'es' ? '${w}e' : w)}';
  });
}

String _wordsToEnglish(String w) {
  if (w.contains('phần')) {
    final parts = w.split('phần');
    final n = vietnameseWordsToInt(parts[0].trim());
    final d = vietnameseWordsToInt(parts[1].trim());
    if (n != null && d != null) return englishFraction(n, d);
  }
  final v = vietnameseWordsToInt(w);
  return v == null ? w : englishNumber(v);
}

const _spokenUnits = {
  'm²': 'square meters', 'dm²': 'square decimeters', 'cm²': 'square centimeters', 'mm²': 'square millimeters',
  'kg': 'kilograms', 'km': 'kilometers', 'cm': 'centimeters', 'mm': 'millimeters', 'dm': 'decimeters', 'm': 'meters',
  'g': 'grams', 'ml': 'milliliters', 'l': 'liters',
};

/// Chữ gửi cho giọng tiếng Anh (Jessica, 11max): số, phân số, ký hiệu → chữ.
String englishSpoken(String text) {
  var s = text.replaceAllMapped(RegExp(r'([.?!:])\s*\n'), (m) => '${m[1]} ').replaceAll('\n', '. ');
  s = s.replaceAll('yến', 'tens of kilograms');
  s = s.replaceAll('□', ' blank ');
  s = s.replaceAllMapped(
    RegExp(r'(\d+)\s*/\s*(\d+)\s*(m²|dm²|cm²|mm²|kg|km|cm|mm|dm|ml|m|g|l)(?![\p{L}\d])', unicode: true),
    (m) => '${englishFraction(int.parse(m[1]!), int.parse(m[2]!))} of a ${_unitOne[m[3]]}',
  );
  s = s.replaceAllMapped(RegExp(r'(\d)([A-Z])\b'), (m) => '${m[1]} ${m[2]}');
  s = s.replaceAllMapped(RegExp(r'(^|[\s(])\?(?=\s*[×÷+−=-])'), (m) => '${m[1]}what number');
  s = s.replaceAllMapped(RegExp(r'\?\s*/\s*(\d+)'), (m) => 'blank over ${englishNumber(int.parse(m[1]!))}');
  s = s.replaceAllMapped(
    RegExp(r'(\d+)\s*/\s*(\d+)'),
    (m) => englishFraction(int.parse(m[1]!), int.parse(m[2]!)),
  );
  s = s.replaceAllMapped(
    RegExp(r'=\s*\?\s*(m²|dm²|cm²|mm²|kg|km|cm|mm|dm|ml|m|g|l)(?![\p{L}\d])', unicode: true),
    (m) => 'equals how many ${_spokenUnits[m[1]]}?',
  );
  s = s.replaceAllMapped(RegExp(r'(\d)\s*°'), (m) => '${m[1]} degrees');
  s = s.replaceAllMapped(
    RegExp(r'(\d|\?)\s*(m²|dm²|cm²|mm²|kg|km|cm|mm|dm|ml|m|g|l)(?![\p{L}\d])', unicode: true),
    (m) => '${m[1]} ${_spokenUnits[m[2]]}',
  );
  s = s.replaceAll(RegExp(r'\s*×\s*'), ' times ');
  s = s.replaceAll(RegExp(r'\s*÷\s*'), ' divided by ');
  s = s.replaceAll(RegExp(r'\s*\+\s*'), ' plus ');
  s = s.replaceAll(RegExp(r'\s+[−-]\s+'), ' minus ');
  s = s.replaceAll(RegExp(r'\s*=\s*\?'), ' equals what?');
  s = s.replaceAll(RegExp(r'\s*=\s*'), ' equals ');
  s = s.replaceAll(RegExp(r'\s+\.\.\.\s+'), ' compared with ');
  s = s.replaceAll(RegExp(r'\(remainder \?\)'), ', remainder what?');
  s = s.replaceAllMapped(RegExp(r'\d{1,3}(?:,\d{3})+|\d+'), (m) => englishNumber(int.parse(m[0]!.replaceAll(',', ''))));
  s = _plain(s).replaceAll(RegExp(r'\s+'), ' ').replaceAll(' .', '.').replaceAll('..', '.').trim();
  s = s.replaceAllMapped(RegExp(r'([.?!]\s+)([a-z])'), (m) => '${m[1]}${m[2]!.toUpperCase()}');
  return s.isEmpty ? s : '${s[0].toUpperCase()}${s.substring(1)}';
}

const _unitOne = {
  'm²': 'square meter', 'dm²': 'square decimeter', 'cm²': 'square centimeter', 'mm²': 'square millimeter',
  'kg': 'kilogram', 'km': 'kilometer', 'cm': 'centimeter', 'mm': 'millimeter', 'dm': 'decimeter', 'm': 'meter',
  'g': 'gram', 'ml': 'milliliter', 'l': 'liter',
};

const _answerWords = {
  'góc nhọn': 'An acute angle!', 'góc vuông': 'A right angle!', 'góc tù': 'An obtuse angle!', 'góc bẹt': 'A straight angle!',
  'hình chữ nhật': 'A rectangle!', 'hình vuông': 'A square!', 'hình thoi': 'A rhombus!', 'hình bình hành': 'A parallelogram!',
  'ê ke': 'A set square!', 'thước đo góc': 'A protractor!', 'độ': 'Degrees!', 'Đủ tiền': 'Enough money!',
  'Không đủ tiền': 'Not enough money!',
};

const _answerUnits = {
  'kg': 'kilograms', 'g': 'grams', 'km': 'kilometers', 'm': 'meters', 'dm': 'decimeters', 'cm': 'centimeters',
  'mm': 'millimeters', 'l': 'liters', 'ml': 'milliliters', 'm²': 'square meters', 'dm²': 'square decimeters',
  'cm²': 'square centimeters', 'mm²': 'square millimeters', '°': 'degrees', 'đồng': 'dong', 'giây': 'seconds',
  'năm': 'years', 'tuổi': 'years old', 'lần': 'times', 'tấn': 'tonnes', 'tạ': 'quintals', 'phút': 'minutes',
  'giờ': 'hours', 'ngày': 'days', 'tuần': 'weeks', 'tháng': 'months', 'thế kỉ': 'centuries', 'góc vuông': 'right angles',
  'góc': 'angles', 'cây': 'trees', 'quyển': 'books', 'quyển sách': 'books', 'quyển vở': 'notebooks', 'học sinh': 'pupils',
  'bạn': 'children', 'cái': '', 'chiếc': '', 'viên bi': 'marbles', 'bông hoa': 'flowers', 'quả': '', 'hộp': 'boxes',
  'xe': 'vehicles', 'ô tô': 'cars', 'chuyến': 'trips', 'túi': 'bags', 'chai': 'bottles', 'can': 'cans',
};

/// Đáp án đọc bằng tiếng Anh khi bé làm đúng: "96" → "Ninety-six!", "66 l" → "Sixty-six liters!",
/// "3/2" → "Three halves!". null nếu đáp án không phải số/phân số/từ quen thuộc.
String? englishAnswer(Problem p) {
  final a = p.solution.answerText.trim();
  if (_answerWords.containsKey(a)) return _answerWords[a];
  if (_names.contains(a)) return '$a!';
  if (RegExp(r'[<>→=]').hasMatch(a)) return null;
  final parts = a.split(RegExp(r';\s*|\s+và\s+'));
  if (parts.length > 3) return null;
  final said = <String>[];
  for (final part in parts) {
    final m = RegExp(r'^(?:[^\d]*?:\s*)?(\d{1,3}(?:\.\d{3})+|\d+)(?:\s*/\s*(\d+))?\s*(.*)$', unicode: true)
        .firstMatch(part.trim());
    if (m == null) return null;
    final n = int.parse(m[1]!.replaceAll('.', ''));
    final frac = m[2] != null;
    var w = frac ? englishFraction(n, int.parse(m[2]!)) : englishNumber(n);
    final rest = m[3]!.trim();
    String? unit;
    if (rest.isNotEmpty) {
      // Đơn vị dài nhất khớp ở đầu phần còn lại ("góc vuông" trước "góc"; "kg thóc" → kg).
      final keys = _answerUnits.keys.toList()..sort((x, y) => y.length.compareTo(x.length));
      for (final k in keys) {
        if (rest == k || rest.startsWith('$k ')) {
          unit = _answerUnits[k];
          break;
        }
      }
    }
    if (unit != null && unit.isNotEmpty) {
      if (frac) {
        w = '$w of a ${_singular(unit)}';
      } else {
        w = '$w ${n == 1 ? _singular(unit) : unit}';
      }
    }
    said.add(w);
  }
  if (said.isEmpty) return null;
  final s = said.length == 1 ? said.first : '${said.sublist(0, said.length - 1).join(', ')} and ${said.last}';
  return '${s[0].toUpperCase()}${s.substring(1)}!';
}

String _singular(String unit) => switch (unit) {
  'centuries' => 'century',
  'boxes' => 'box',
  'years old' => 'year old',
  'times' => 'time',
  'dong' => 'dong',
  _ => unit.endsWith('s') ? unit.substring(0, unit.length - 1) : unit,
};

const _viChars = 'àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴĐ';
const _asciiChars = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyydAAAAAAAAAAAAAAAAAEEEEEEEEEEEIIIIIOOOOOOOOOOOOOOOOOUUUUUUUUUUUYYYYYD';

/// Bỏ dấu tiếng Việt (tên bạn trong đề) để giọng tiếng Anh đọc trơn: "Dũng" → "Dung".
String _plain(String s) {
  final b = StringBuffer();
  for (final r in s.runes) {
    final c = String.fromCharCode(r);
    final i = _viChars.indexOf(c);
    b.write(i < 0 ? c : _asciiChars[i]);
  }
  return b.toString();
}
