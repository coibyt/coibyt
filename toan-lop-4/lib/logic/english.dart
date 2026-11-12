/// Chế độ "Toán + Tiếng Anh": đọc phép tính bằng tiếng Anh, câu lệnh tiếng Anh, từ vựng Toán theo chủ đề.
///
/// Mọi câu tiếng Anh viết số bằng CHỮ ("Twenty-four times eight equals one hundred ninety-two.") để chữ hiện
/// trên màn hình và giọng ghi sẵn (11max, giọng cô Mai, `language_code: en`) luôn khớp nhau. Trong danh mục
/// giọng, câu tiếng Anh có khoá "en:`câu`" (tool/make_voice.dart) và được đọc nguyên văn.
library;

import '../models/blocks.dart';
import '../models/problem.dart';

const _ones = [
  'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', //
  'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen',
];
const _tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

String _below1000(int n) {
  final h = n ~/ 100, r = n % 100;
  final parts = <String>[];
  if (h > 0) parts.add('${_ones[h]} hundred');
  if (r > 0) {
    if (r < 20) {
      parts.add(_ones[r]);
    } else {
      parts.add(r % 10 == 0 ? _tens[r ~/ 10] : '${_tens[r ~/ 10]}-${_ones[r % 10]}');
    }
  }
  return parts.join(' ');
}

/// Số tự nhiên bằng chữ tiếng Anh (kiểu Mỹ, không "and"): 1.250.300 → "one million two hundred fifty thousand three hundred".
String englishNumber(int n) {
  if (n == 0) return 'zero';
  const scales = ['', 'thousand', 'million', 'billion'];
  final groups = <int>[];
  var x = n;
  while (x > 0) {
    groups.add(x % 1000);
    x ~/= 1000;
  }
  final parts = <String>[];
  for (var i = groups.length - 1; i >= 0; i--) {
    if (groups[i] == 0) continue;
    parts.add([_below1000(groups[i]), scales[i]].where((s) => s.isNotEmpty).join(' '));
  }
  return parts.join(' ');
}

const _ordinalWords = {
  2: 'half', 3: 'third', 4: 'quarter', 5: 'fifth', 6: 'sixth', 7: 'seventh', 8: 'eighth', 9: 'ninth', 10: 'tenth', //
  11: 'eleventh', 12: 'twelfth', 13: 'thirteenth', 14: 'fourteenth', 15: 'fifteenth', 16: 'sixteenth', 20: 'twentieth',
};

/// Phân số bằng chữ: 3/4 → "three quarters", 1/2 → "one half", 5/1 → "five over one", 7/36 → "seven over thirty-six".
String englishFraction(int n, int d) {
  final w = _ordinalWords[d];
  if (w == null || d == 1) return '${englishNumber(n)} over ${englishNumber(d)}';
  final plural = n == 1 ? w : (w == 'half' ? 'halves' : '${w}s');
  return '${englishNumber(n)} $plural';
}

const _unitWords = {
  'kg': 'kilograms',
  'g': 'grams',
  'km': 'kilometers',
  'm': 'meters',
  'dm': 'decimeters',
  'cm': 'centimeters',
  'mm': 'millimeters',
  'l': 'liters',
  'ml': 'milliliters',
  'm²': 'square meters',
  'dm²': 'square decimeters',
  'cm²': 'square centimeters',
  'mm²': 'square millimeters',
  '°': 'degrees',
  'đồng': 'dong',
  'giây': 'seconds',
  'phút': 'minutes',
  'năm': 'years',
  'tấn': 'tonnes',
  'tạ': 'quintals',
  'yến': 'tens of kilograms',
};

final _token = RegExp(r'(\d{1,3}(?:\.\d{3})+|\d+)\s*/\s*(\d+)|\d{1,3}(?:\.\d{3})+|\d+|[+×x*:÷=()−-]');

/// "24 × 8 = 192 (kg)" → "Twenty-four times eight equals one hundred ninety-two kilograms."
/// Trả về null nếu không phải một phép tính đơn giản (có chữ, có ô trống…).
String? englishEquation(String equation) {
  var s = equation.trim();
  String? unit;
  final m = RegExp(r'\s*\(([^()0-9]+)\)\s*$').firstMatch(s);
  if (m != null) {
    unit = _unitWords[m[1]!.trim()];
    s = s.substring(0, m.start);
  }
  if (!s.contains('=') ||
      s.contains('(') ||
      RegExp(r'[\p{L}?□]', unicode: true).hasMatch(s.replaceAll(RegExp(r'(?<=\d)\s*x\s*(?=\d)'), ' × '))) {
    return null;
  }
  // Phép tính quá dài (khai triển số, cộng nhiều số) thì không đọc bằng tiếng Anh.
  if (RegExp(r'[+×x*:÷−-]').allMatches(s.split('=').first).length > 3) return null;
  final out = <String>[];
  var pos = 0;
  for (final t in _token.allMatches(s)) {
    if (s.substring(pos, t.start).trim().isNotEmpty) return null;
    pos = t.end;
    final tok = t[0]!;
    if (t[1] != null) {
      out.add(englishFraction(int.parse(t[1]!.replaceAll('.', '')), int.parse(t[2]!)));
    } else if (RegExp(r'^\d').hasMatch(tok)) {
      out.add(englishNumber(int.parse(tok.replaceAll('.', ''))));
    } else {
      out.add(switch (tok) {
        '+' => 'plus',
        '-' || '−' => 'minus',
        '×' || 'x' || '*' => 'times',
        ':' || '÷' => 'divided by',
        '=' => 'equals',
        '(' => 'open bracket',
        ')' => 'close bracket',
        _ => tok,
      });
    }
  }
  if (s.substring(pos).trim().isNotEmpty) return null;
  // Chỉ đọc vế đầu và vế cuối: "a + b = c = d" → "a plus b equals d".
  final eqs = [
    for (var i = 0; i < out.length; i++)
      if (out[i] == 'equals') i,
  ];
  if (eqs.length > 1) out.removeRange(eqs.first + 1, eqs.last + 1);
  var sentence = out.join(' ').replaceAll('open bracket ', '').replaceAll(' close bracket', '');
  if (unit != null) sentence = '$sentence $unit';
  return '${sentence[0].toUpperCase()}${sentence.substring(1)}.';
}

/// Phép tính "chốt" của lời giải (phép tính cuối trong khối Bài giải, hoặc phương trình cuối) đọc bằng tiếng Anh.
String? englishSolution(Problem p) {
  String? best;
  for (final b in p.solution.steps) {
    switch (b) {
      case EquationBlock(:final text):
        best = englishEquation(text) ?? best;
      case WordProblemBlock(:final lines):
        for (final l in lines.reversed) {
          final e = englishEquation(l.equation);
          if (e != null) {
            best = e;
            break;
          }
        }
      default:
        break;
    }
  }
  return best;
}

/// Câu lệnh tiếng Anh cho những câu lệnh hay dùng.
const englishInstructions = {
  'Chọn đáp án đúng.': 'Choose the correct answer.',
  'Điền số thích hợp.': 'Fill in the missing number.',
  'Đặt tính rồi tính.': 'Set out the sum and work it out.',
  'Tính nhẩm.': 'Work it out in your head.',
  'Tính.': 'Calculate.',
  'Giải bài toán.': 'Solve the problem.',
  'Kéo số vào ô trống.': 'Drag the numbers into the boxes.',
  'Kéo thẻ vào ô trống.': 'Drag the cards into the boxes.',
  'Nối cho đúng.': 'Match the pairs.',
  'Nối phép tính với kết quả.': 'Match each sum with its answer.',
  'Nối số với cách đọc.': 'Match each number with its name.',
  'Nối hai số đo bằng nhau.': 'Match the equal measurements.',
  'Nối biểu thức với giá trị.': 'Match each expression with its value.',
  'Chọn dấu thích hợp.': 'Choose the correct sign.',
  'Chọn cách đọc đúng.': 'Choose the correct way to read it.',
  'Chọn số đo phù hợp.': 'Choose the right measurement.',
  'Viết số thích hợp.': 'Write the correct number.',
  'Tìm số thích hợp.': 'Find the missing number.',
  'Tính giá trị của biểu thức.': 'Find the value of the expression.',
  'Tính bằng cách thuận tiện.': 'Calculate in the easiest way.',
  'Xếp theo thứ tự từ bé đến lớn.': 'Put them in order from smallest to largest.',
  'Rút gọn phân số.': 'Simplify the fraction.',
  'Quy đồng mẫu số.': 'Find a common denominator.',
  'Tính rồi rút gọn (nếu được).': 'Calculate, then simplify if you can.',
  'Tìm phân số thích hợp.': 'Find the missing fraction.',
};

/// Lời khen tiếng Anh (cô nói trước câu đọc phép tính).
const englishPraise = ['Excellent!', 'Well done!', 'Great job!', 'Super!', 'Brilliant!'];

/// Câu cô dẫn vào phần tiếng Anh (tiếng Việt).
const englishLead = 'Đáp án bằng tiếng Anh là:';
const englishQuizLead = 'Góc Tiếng Anh! Con chọn từ tiếng Anh đúng nhé.';
const englishQuizRight = 'Chính xác! Con giỏi tiếng Anh quá!';
const englishQuizWrong = 'Chưa đúng rồi, con nghe cô đọc lại nhé.';

class EnglishWord {
  const EnglishWord(this.en, this.vi, this.example);

  /// Từ / cụm từ tiếng Anh.
  final String en;

  /// Nghĩa tiếng Việt.
  final String vi;

  /// Câu ví dụ tiếng Anh (số viết bằng chữ).
  final String example;

  /// Câu cô hỏi trong câu đố nhanh.
  String get quizQuestion => 'Từ “$vi” trong tiếng Anh là gì?';

  /// Câu cô giảng nghĩa (tiếng Việt, nói ngay sau khi đọc từ tiếng Anh).
  String get meaningLine => 'Nghĩa là: $vi.';
}

/// Từ vựng Toán tiếng Anh theo chủ đề (số thứ tự chủ đề → từ).
const englishVocab = <int, List<EnglishWord>>{
  1: [
    EnglishWord('number', 'số', 'Seven is an odd number.'),
    EnglishWord('even number', 'số chẵn', 'Twelve is an even number.'),
    EnglishWord('odd number', 'số lẻ', 'Fifteen is an odd number.'),
    EnglishWord('add', 'cộng', 'Add five and three.'),
    EnglishWord('subtract', 'trừ', 'Subtract two from nine.'),
    EnglishWord('expression', 'biểu thức', 'Find the value of the expression.'),
    EnglishWord('letter', 'chữ (trong biểu thức)', 'The letter a stands for a number.'),
    EnglishWord('step', 'bước', 'Solve the problem in three steps.'),
  ],
  2: [
    EnglishWord('angle', 'góc', 'This angle is ninety degrees.'),
    EnglishWord('right angle', 'góc vuông', 'A square has four right angles.'),
    EnglishWord('acute angle', 'góc nhọn', 'An acute angle is smaller than a right angle.'),
    EnglishWord('obtuse angle', 'góc tù', 'An obtuse angle is bigger than a right angle.'),
    EnglishWord('straight angle', 'góc bẹt', 'A straight angle is one hundred eighty degrees.'),
    EnglishWord('degree', 'độ', 'A right angle has ninety degrees.'),
    EnglishWord('protractor', 'thước đo góc', 'We measure angles with a protractor.'),
    EnglishWord('vertex', 'đỉnh', 'The vertex is the corner of the angle.'),
  ],
  3: [
    EnglishWord('thousand', 'nghìn', 'There are one thousand people here.'),
    EnglishWord('million', 'triệu', 'One million has six zeros.'),
    EnglishWord('digit', 'chữ số', 'The number twenty-five has two digits.'),
    EnglishWord('place value', 'giá trị theo hàng', 'Place value tells us what each digit is worth.'),
    EnglishWord('round', 'làm tròn', 'Round the number to the nearest thousand.'),
    EnglishWord('compare', 'so sánh', 'Compare the two numbers.'),
    EnglishWord('greater than', 'lớn hơn', 'Nine is greater than four.'),
    EnglishWord('less than', 'bé hơn', 'Three is less than eight.'),
    EnglishWord('in order', 'theo thứ tự', 'Put the numbers in order.'),
  ],
  4: [
    EnglishWord('weight', 'cân nặng', 'The weight of the bag is five kilograms.'),
    EnglishWord('kilogram', 'ki-lô-gam', 'One kilogram is one thousand grams.'),
    EnglishWord('tonne', 'tấn', 'One tonne is one thousand kilograms.'),
    EnglishWord('area', 'diện tích', 'The area of the room is twenty square meters.'),
    EnglishWord('square meter', 'mét vuông', 'One square meter is one hundred square decimeters.'),
    EnglishWord('second', 'giây', 'One minute has sixty seconds.'),
    EnglishWord('minute', 'phút', 'One hour has sixty minutes.'),
    EnglishWord('century', 'thế kỉ', 'One century is one hundred years.'),
  ],
  5: [
    EnglishWord('sum', 'tổng', 'The sum of four and five is nine.'),
    EnglishWord('difference', 'hiệu', 'The difference between nine and four is five.'),
    EnglishWord('plus', 'cộng (dấu +)', 'Six plus two equals eight.'),
    EnglishWord('minus', 'trừ (dấu −)', 'Ten minus three equals seven.'),
    EnglishWord('equals', 'bằng', 'Two plus two equals four.'),
    EnglishWord('total', 'tất cả', 'The total is one hundred.'),
    EnglishWord('bigger number', 'số lớn', 'The bigger number is sixty.'),
    EnglishWord('smaller number', 'số bé', 'The smaller number is forty.'),
  ],
  6: [
    EnglishWord('line', 'đường thẳng', 'Draw a straight line.'),
    EnglishWord('perpendicular', 'vuông góc', 'These two lines are perpendicular.'),
    EnglishWord('parallel', 'song song', 'Railway tracks are parallel.'),
    EnglishWord('parallelogram', 'hình bình hành', 'A parallelogram has two pairs of parallel sides.'),
    EnglishWord('rhombus', 'hình thoi', 'A rhombus has four equal sides.'),
    EnglishWord('rectangle', 'hình chữ nhật', 'A rectangle has four right angles.'),
    EnglishWord('side', 'cạnh', 'A square has four sides.'),
    EnglishWord('perimeter', 'chu vi', 'The perimeter is the distance around a shape.'),
  ],
  7: [
    EnglishWord('review', 'ôn tập', 'Let us review the lesson.'),
    EnglishWord('test', 'bài kiểm tra', 'I am ready for the test.'),
    EnglishWord('answer', 'đáp án', 'Choose the correct answer.'),
    EnglishWord('question', 'câu hỏi', 'Read the question carefully.'),
    EnglishWord('check', 'kiểm tra lại', 'Check your answer.'),
    EnglishWord('correct', 'đúng', 'Your answer is correct.'),
    EnglishWord('wrong', 'sai', 'Try again if your answer is wrong.'),
    EnglishWord('score', 'điểm', 'My score is ten.'),
  ],
  8: [
    EnglishWord('multiply', 'nhân', 'Multiply six by four.'),
    EnglishWord('divide', 'chia', 'Divide twelve by three.'),
    EnglishWord('times', 'nhân (lần)', 'Five times two equals ten.'),
    EnglishWord('divided by', 'chia cho', 'Twenty divided by four equals five.'),
    EnglishWord('product', 'tích', 'The product of three and four is twelve.'),
    EnglishWord('quotient', 'thương', 'The quotient of ten divided by two is five.'),
    EnglishWord('remainder', 'số dư', 'Seven divided by two is three, remainder one.'),
    EnglishWord('average', 'trung bình cộng', 'The average of two and four is three.'),
    EnglishWord('estimate', 'ước lượng', 'Estimate the answer first.'),
  ],
  9: [
    EnglishWord('data', 'số liệu', 'We collect data about our class.'),
    EnglishWord('bar chart', 'biểu đồ cột', 'The bar chart shows our favourite fruits.'),
    EnglishWord('column', 'cột', 'The tallest column is mango.'),
    EnglishWord('most', 'nhiều nhất', 'Most children like football.'),
    EnglishWord('least', 'ít nhất', 'The least popular sport is chess.'),
    EnglishWord('coin', 'đồng xu', 'Toss the coin ten times.'),
    EnglishWord('dice', 'xúc xắc', 'Roll the dice.'),
    EnglishWord('times (how often)', 'số lần', 'Heads came up six times.'),
  ],
  10: [
    EnglishWord('fraction', 'phân số', 'Three quarters is a fraction.'),
    EnglishWord('numerator', 'tử số', 'In three quarters, the numerator is three.'),
    EnglishWord('denominator', 'mẫu số', 'In three quarters, the denominator is four.'),
    EnglishWord('half', 'một nửa', 'Half of the pizza is left.'),
    EnglishWord('quarter', 'một phần tư', 'I ate a quarter of the cake.'),
    EnglishWord('equal parts', 'phần bằng nhau', 'Cut the cake into four equal parts.'),
    EnglishWord('simplify', 'rút gọn', 'Simplify the fraction.'),
    EnglishWord('common denominator', 'mẫu số chung', 'Find a common denominator.'),
  ],
  11: [
    EnglishWord('add fractions', 'cộng phân số', 'Add fractions with the same denominator.'),
    EnglishWord('subtract fractions', 'trừ phân số', 'Subtract fractions carefully.'),
    EnglishWord('same denominator', 'cùng mẫu số', 'These fractions have the same denominator.'),
    EnglishWord('third', 'một phần ba', 'One third of the class is here.'),
    EnglishWord('fifth', 'một phần năm', 'Two fifths of the wall is painted.'),
    EnglishWord('eighth', 'một phần tám', 'Five eighths of the pizza is eaten.'),
    EnglishWord('whole', 'cả, một đơn vị', 'Four quarters make a whole.'),
  ],
  12: [
    EnglishWord('multiply fractions', 'nhân phân số', 'Multiply the numerators and the denominators.'),
    EnglishWord('divide fractions', 'chia phân số', 'To divide fractions, flip the second one.'),
    EnglishWord('reciprocal', 'phân số đảo ngược', 'The reciprocal of two thirds is three halves.'),
    EnglishWord('of', 'của (phân số của một số)', 'Two thirds of fifteen is ten.'),
    EnglishWord('share', 'chia đều', 'Share the sweets equally.'),
    EnglishWord('piece', 'mảnh, phần', 'Each piece is one sixth.'),
  ],
  13: [
    EnglishWord('math', 'môn Toán', 'I love math.'),
    EnglishWord('lesson', 'bài học', 'Today we have a math lesson.'),
    EnglishWord('teacher', 'cô giáo', 'My teacher is very kind.'),
    EnglishWord('practice', 'luyện tập', 'Practice makes perfect.'),
    EnglishWord('problem', 'bài toán', 'This problem is easy.'),
    EnglishWord('solve', 'giải', 'Solve the problem step by step.'),
    EnglishWord('result', 'kết quả', 'Check the result.'),
    EnglishWord('well done', 'giỏi lắm', 'Well done, you got it right!'),
  ],
};

/// Mọi câu tiếng Anh cố định (để ghi âm): câu lệnh, lời khen, từ vựng, câu ví dụ.
List<String> englishFixedLines() => {
  ...englishInstructions.values,
  ...englishPraise,
  for (final w in englishWordIndex.values) ...[w.en, w.example],
}.toList();

/// Câu tiếng Việt đi kèm (cô nói bằng giọng tiếng Việt).
List<String> englishVietnameseLines() => {
  englishLead,
  englishQuizLead,
  englishQuizRight,
  englishQuizWrong,
  englishGameLead,
  englishGameListen,
  englishGameDone,
  englishGamePerfect,
  for (final w in englishWordIndex.values) ...[w.quizQuestion, w.meaningLine],
}.toList();

/// Từ bổ sung (không thuộc riêng chủ đề nào) — dùng cho thẻ từ vựng của từng bài.
const englishExtraWords = [
  EnglishWord('hundred', 'trăm', 'One hundred has two zeros.'),
  EnglishWord('ten thousand', 'chục nghìn', 'Ten thousand has four zeros.'),
  EnglishWord('hundred thousand', 'trăm nghìn', 'One hundred thousand has five zeros.'),
  EnglishWord('value', 'giá trị', 'Find the value of the digit.'),
  EnglishWord('calculate', 'tính', 'Calculate the answer.'),
  EnglishWord('natural number', 'số tự nhiên', 'Zero is the first natural number.'),
  EnglishWord('sequence', 'dãy số', 'One, two, three is a sequence.'),
  EnglishWord('next', 'tiếp theo', 'The next number is ten.'),
  EnglishWord('about', 'khoảng', 'The answer is about one thousand.'),
  EnglishWord('quintal', 'tạ', 'One quintal is one hundred kilograms.'),
  EnglishWord('square decimeter', 'đề-xi-mét vuông', 'One square decimeter is one hundred square centimeters.'),
  EnglishWord('square millimeter', 'mi-li-mét vuông', 'A tiny dot is about one square millimeter.'),
  EnglishWord('year', 'năm', 'One year has twelve months.'),
  EnglishWord('measure', 'đo', 'Measure the length with a ruler.'),
  EnglishWord('unit', 'đơn vị', 'The meter is a unit of length.'),
  EnglishWord('swap', 'đổi chỗ', 'Swap the two numbers.'),
  EnglishWord('group', 'nhóm', 'Group the numbers that are easy to add.'),
  EnglishWord('draw', 'vẽ', 'Draw a line.'),
  EnglishWord('set square', 'ê ke', 'Use a set square to draw a right angle.'),
  EnglishWord('ruler', 'thước kẻ', 'Draw a straight line with a ruler.'),
  EnglishWord('point', 'điểm', 'Mark a point on the line.'),
  EnglishWord('shape', 'hình', 'A rhombus is a shape with four equal sides.'),
  EnglishWord('zero', 'số không', 'Ten has one zero.'),
  EnglishWord('two-digit number', 'số có hai chữ số', 'Twenty-five is a two-digit number.'),
  EnglishWord('brackets', 'dấu ngoặc', 'Do the part in brackets first.'),
  EnglishWord('each', 'mỗi', 'Each box has six pens.'),
  EnglishWord('event', 'sự kiện', 'Getting heads is an event.'),
  EnglishWord('equivalent fractions', 'phân số bằng nhau', 'One half and two quarters are equivalent fractions.'),
  EnglishWord('compare fractions', 'so sánh phân số', 'Compare fractions with the same denominator.'),
];

/// Từ trọng tâm của từng bài (theo tên bài; bài "Luyện tập chung" dùng từ của cả chủ đề).
const _lessonWords = <String, List<String>>{
  'Ôn tập các số đến 100': ['number', 'hundred', 'ten thousand', 'digit', 'compare', 'value'],
  'Ôn tập các phép tính trong phạm vi': ['add', 'subtract', 'multiply', 'divide', 'calculate'],
  'Số chẵn, số lẻ': ['even number', 'odd number', 'number', 'digit'],
  'Biểu thức chứa chữ': ['expression', 'letter', 'value', 'calculate'],
  'Giải bài toán có ba bước tính': ['step', 'problem', 'solve', 'answer'],
  'Đo góc, đơn vị đo góc': ['angle', 'degree', 'protractor', 'vertex', 'measure', 'unit'],
  'Góc nhọn, góc tù, góc bẹt': ['acute angle', 'obtuse angle', 'straight angle', 'right angle', 'angle', 'degree'],
  'Số có sáu chữ số': ['hundred thousand', 'million', 'thousand', 'digit', 'place value'],
  'Hàng và lớp': ['place value', 'digit', 'thousand', 'million', 'value'],
  'Các số trong phạm vi lớp triệu': ['million', 'thousand', 'digit', 'place value', 'compare'],
  'Làm tròn số': ['round', 'hundred thousand', 'about', 'estimate'],
  'So sánh các số có nhiều chữ số': ['compare', 'greater than', 'less than', 'in order', 'digit'],
  'dãy số tự nhiên': ['natural number', 'sequence', 'next', 'even number', 'odd number'],
  'Yến, tạ, tấn': ['weight', 'kilogram', 'quintal', 'tonne'],
  'mét vuông': ['area', 'square meter', 'square decimeter', 'square millimeter'],
  'Giây, thế kỉ': ['second', 'minute', 'century', 'year'],
  'đơn vị đo đại lượng': ['measure', 'unit', 'weight', 'area'],
  'Phép cộng các số có nhiều chữ số': ['add', 'plus', 'sum', 'equals'],
  'Phép trừ các số có nhiều chữ số': ['subtract', 'minus', 'difference', 'equals'],
  'kết hợp của phép cộng': ['add', 'sum', 'swap', 'group'],
  'tổng và hiệu': ['sum', 'difference', 'bigger number', 'smaller number'],
  'Hai đường thẳng vuông góc': ['line', 'perpendicular', 'right angle', 'set square'],
  'vẽ hai đường thẳng vuông góc': ['draw', 'perpendicular', 'set square', 'ruler', 'point'],
  'Hai đường thẳng song song': ['line', 'parallel', 'side', 'rectangle'],
  'vẽ hai đường thẳng song song': ['draw', 'parallel', 'set square', 'ruler', 'point'],
  'Hình bình hành, hình thoi': ['parallelogram', 'rhombus', 'side', 'shape'],
  'Ôn tập các số đến lớp triệu': ['million', 'thousand', 'digit', 'compare'],
  'Ôn tập phép cộng, phép trừ': ['add', 'subtract', 'sum', 'difference'],
  'hình học và đo lường': ['angle', 'parallel', 'area', 'weight'],
  'Ôn tập hình học': ['angle', 'line', 'parallel', 'perpendicular', 'rhombus'],
  'Ôn tập đo lường': ['weight', 'area', 'second', 'century'],
  'Nhân với số có một chữ số': ['multiply', 'times', 'product', 'digit'],
  'Chia cho số có một chữ số': ['divide', 'divided by', 'quotient', 'remainder'],
  'kết hợp của phép nhân': ['multiply', 'product', 'swap', 'group'],
  'Nhân, chia với 10': ['multiply', 'divide', 'zero', 'hundred', 'thousand'],
  'Tính chất phân phối': ['multiply', 'add', 'brackets', 'product'],
  'Nhân với số có hai chữ số': ['multiply', 'times', 'product', 'two-digit number'],
  'Chia cho số có hai chữ số': ['divide', 'quotient', 'remainder', 'two-digit number'],
  'ước lượng': ['estimate', 'round', 'about'],
  'trung bình cộng': ['average', 'sum', 'divide'],
  'rút về đơn vị': ['each', 'divide', 'multiply', 'unit'],
  'Dãy số liệu thống kê': ['data', 'number', 'most', 'least'],
  'Biểu đồ cột': ['bar chart', 'column', 'data', 'most', 'least'],
  'Số lần xuất hiện': ['coin', 'dice', 'times (how often)', 'event'],
  'Khái niệm phân số': ['fraction', 'numerator', 'denominator', 'equal parts', 'half', 'quarter'],
  'Phân số và phép chia': ['fraction', 'divide', 'numerator', 'denominator'],
  'Tính chất cơ bản của phân số': ['fraction', 'equivalent fractions', 'multiply', 'divide'],
  'Rút gọn phân số': ['simplify', 'fraction', 'equivalent fractions'],
  'Quy đồng mẫu số': ['common denominator', 'denominator', 'fraction'],
  'So sánh phân số': ['compare fractions', 'greater than', 'less than', 'fraction'],
  'Phép cộng phân số': ['add fractions', 'same denominator', 'plus', 'whole'],
  'Phép trừ phân số': ['subtract fractions', 'same denominator', 'minus', 'whole'],
  'Phép nhân phân số': ['multiply fractions', 'times', 'numerator', 'denominator'],
  'Phép chia phân số': ['divide fractions', 'reciprocal', 'divided by'],
  'Tìm phân số của một số': ['of', 'fraction', 'share', 'piece'],
  'Ôn tập số tự nhiên': ['natural number', 'digit', 'million', 'compare'],
  'phép tính với số tự nhiên': ['add', 'subtract', 'multiply', 'divide'],
  'Ôn tập phân số': ['fraction', 'numerator', 'denominator', 'simplify'],
  'phép tính với phân số': ['add fractions', 'subtract fractions', 'multiply fractions', 'divide fractions'],
  'thống kê và xác suất': ['data', 'bar chart', 'event', 'dice'],
};

/// Mọi từ vựng (theo chủ đề + từ bổ sung), tra theo chữ tiếng Anh.
final Map<String, EnglishWord> englishWordIndex = {
  for (final ws in englishVocab.values)
    for (final w in ws) w.en: w,
  for (final w in englishExtraWords) w.en: w,
};

/// Thẻ từ vựng của một bài: từ trọng tâm của bài trước, rồi thêm từ của chủ đề cho đủ 8 thẻ.
List<EnglishWord> lessonVocab(String lessonTitle, int chapter) {
  final title = lessonTitle.replaceAll(RegExp(r'\s+'), ' ');
  final out = <String, EnglishWord>{};
  for (final e in _lessonWords.entries) {
    if (title.contains(e.key)) {
      for (final en in e.value) {
        final w = englishWordIndex[en];
        if (w != null) out[en] = w;
      }
      break;
    }
  }
  for (final w in englishVocab[chapter] ?? englishVocab[13]!) {
    if (out.length >= 8) break;
    out.putIfAbsent(w.en, () => w);
  }
  return out.values.toList();
}

/// Trò chơi ôn từ: câu cô nói (tiếng Việt).
const englishGameLead = 'Trò chơi ôn từ! Con nghe cô đọc từ tiếng Anh, rồi chọn nghĩa đúng nhé.';
const englishGameListen = 'Từ này nghĩa là gì?';
const englishGameDone = 'Hết lượt rồi! Con giỏi lắm, mình cùng xem điểm nhé.';
const englishGamePerfect = 'Tuyệt vời! Con đúng hết tất cả các từ!';
