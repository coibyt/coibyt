/// Học Toán kèm Tiếng Anh (chế độ song ngữ) — Dart thuần, dùng chung cho app và tool/make_voice.dart.
library;

/// Một từ vựng Toán bằng tiếng Anh.
class Vocab {
  const Vocab({required this.en, required this.vi, required this.emoji});

  final String en;
  final String vi;
  final String emoji;
}

/// Bản tiếng Anh của một bài: tên bài, từ vựng, bản dịch từng câu (khoá = câu tiếng Việt).
class LessonEnglish {
  LessonEnglish({required this.title, required this.vocab, required Map<String, String> lines})
    : _lines = {for (final e in lines.entries) normalizeVi(e.key): e.value};

  final String title;
  final List<Vocab> vocab;
  final Map<String, String> _lines;

  Iterable<String> get lines => _lines.values;

  /// Câu tiếng Anh tương ứng; null nếu không có (số, phép tính… không cần dịch).
  String? of(String vi) => _lines[normalizeVi(vi)];
}

/// Chuẩn hoá để tra: bỏ khoảng trắng thừa.
String normalizeVi(String s) => s.trim().replaceAll(RegExp(r'[ \t]+'), ' ');

const englishPath = 'assets/content/en.json';

/// `{"<mã bài>": {"title", "vocab": [{"en","vi","emoji"}], "t": {"<câu Việt>": "<câu Anh>"}}}`
Map<String, LessonEnglish> parseEnglish(Map<String, dynamic> json) => {
  for (final e in json.entries)
    e.key: () {
      final m = e.value as Map<String, dynamic>;
      return LessonEnglish(
        title: m['title'] as String? ?? '',
        vocab: [
          for (final v in (m['vocab'] as List? ?? const []).cast<Map<String, dynamic>>())
            Vocab(en: v['en'] as String, vi: v['vi'] as String, emoji: v['emoji'] as String? ?? '⭐'),
        ],
        lines: {for (final t in (m['t'] as Map? ?? const {}).entries) t.key as String: t.value as String},
      );
    }(),
};

/// Câu cô Mai nói (tiếng Việt) và câu tiếng Anh cố định của chế độ song ngữ.
abstract final class BilingualLines {
  // ---- Cô Mai (giọng Việt) ----
  static const leadQuestion = 'Bây giờ con nghe câu hỏi bằng tiếng Anh nhé!';
  static const leadAnswer = 'Đáp án bằng tiếng Anh là:';
  static const leadVocab = 'Mình cùng học từ mới tiếng Anh của bài này nhé!';
  static const vocabAsk = 'Từ tiếng Anh này nghĩa là gì nhỉ? Con chọn đi!';
  static const vocabRight = 'Đúng rồi! Con giỏi tiếng Anh quá!';
  static const vocabWrong = 'Chưa đúng rồi, con nghe lại nhé.';
  static const vocabDone = 'Con đã học xong từ mới của bài này. Tuyệt vời!';
  static const modeOn = 'Từ giờ cô dạy Toán kèm tiếng Anh cho con nhé!';
  static const modeOff = 'Cô tắt tiếng Anh, mình học Toán bằng tiếng Việt nhé.';

  static List<String> vi() => [
    leadQuestion,
    leadAnswer,
    leadVocab,
    vocabAsk,
    vocabRight,
    vocabWrong,
    vocabDone,
    modeOn,
    modeOff,
  ];

  // ---- Tiếng Anh (giọng bản ngữ) ----
  static const praise = ['Correct!', 'Well done!', 'Great job!', 'Excellent!', 'Super!'];
  static const tryAgain = 'Try again!';
  static const listen = 'Listen and repeat.';
  static const letsLearn = "Let's learn maths in English!";

  static List<String> en() => [...praise, tryAgain, listen, letsLearn];
}

/// Mẫu điền số tiếng Anh để đọc / hiện: "3 pieces are {{b1}} cm long." → "3 pieces are ___ cm long."
String? englishTemplate(String? en) => en?.replaceAll(RegExp(r'\{\{\w+\}\}'), '___');

const _ones = [
  'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', //
  'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen',
];
const _tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

/// 96 → "ninety-six", 1 205 → "one thousand two hundred and five" (0 … 999 999).
String numberToEnglish(int n) {
  if (n < 0) return 'minus ${numberToEnglish(-n)}';
  if (n < 20) return _ones[n];
  if (n < 100) return n % 10 == 0 ? _tens[n ~/ 10] : '${_tens[n ~/ 10]}-${_ones[n % 10]}';
  if (n < 1000) {
    final rest = n % 100;
    return '${_ones[n ~/ 100]} hundred${rest == 0 ? '' : ' and ${numberToEnglish(rest)}'}';
  }
  if (n < 1000000) {
    final rest = n % 1000;
    final head = '${numberToEnglish(n ~/ 1000)} thousand';
    if (rest == 0) return head;
    return rest < 100 ? '$head and ${numberToEnglish(rest)}' : '$head ${numberToEnglish(rest)}';
  }
  return '$n';
}

/// Đọc đáp án bằng tiếng Anh: "96" → "Ninety-six.", "45 cm" → "Forty-five centimetres."; null nếu không phải số.
String? answerInEnglish(String answer) {
  final m = RegExp(r'^\s*(\d[\d .]*)\s*([a-zA-Z°²]*)\s*$').firstMatch(answer);
  if (m == null) return null;
  final n = int.tryParse(m[1]!.replaceAll(RegExp(r'[ .]'), ''));
  if (n == null || n > 999999) return null;
  const units = {
    'cm': 'centimetres', 'mm': 'millimetres', 'm': 'metres', 'km': 'kilometres', 'kg': 'kilograms', //
    'g': 'grams', 'l': 'litres', 'ml': 'millilitres', '°C': 'degrees Celsius', 'cm²': 'square centimetres',
  };
  final u = units[m[2]] ?? '';
  final words = numberToEnglish(n);
  return '${words[0].toUpperCase()}${words.substring(1)}${u.isEmpty ? '' : ' $u'}.';
}
