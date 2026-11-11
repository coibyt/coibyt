/// Lời MC của "Đấu trường Ngôi sao Toán học" (gameshow kiểm tra năng lực).
/// Câu cố định → ghi âm sẵn bằng 11max (giọng MC khác giọng cô Mai). Đề bài đọc bằng giọng máy.
library;

const kHostName = 'MC Ngọc Ánh';

abstract final class ShowLines {
  static const welcome =
      'Xin chào và chào mừng con đến với Đấu trường Ngôi sao Toán học! Mười lăm câu hỏi, năm mảng kiến thức đang chờ con. Con có ba quyền trợ giúp. Sẵn sàng chưa nào?';
  static const welcomeBack = 'Chào mừng nhà vô địch quay trở lại Đấu trường! Lần này con sẽ leo cao hơn chứ?';
  static const start = 'Chúng ta bắt đầu nhé! Đồng hồ đã chạy rồi!';
  static const chooseNow = 'Con chọn đáp án nào?';
  static const confirm = 'Đó có phải là câu trả lời cuối cùng của con không?';
  static const correct = ['Chính xác! Tuyệt vời!', 'Hoàn toàn chính xác!', 'Đúng rồi! Con giỏi quá!'];
  static const wrong = 'Rất tiếc, chưa chính xác rồi. Đáp án đúng đang sáng màu xanh. Mình đi tiếp nhé!';
  static const timeout = 'Hết giờ rồi! Không sao, câu sau con nhanh tay hơn nhé!';
  static const fifty = 'Hai đáp án sai đã được loại bỏ!';
  static const askTeacher = 'Con đã chọn hỏi ý kiến cô Mai. Cô Mai ơi, cô gợi ý giúp con nhé!';
  static const swap = 'Đổi câu hỏi! Đây là một câu hỏi mới cùng mảng kiến thức.';
  static const milestone5 = 'Con đã vượt qua mốc câu số năm! Tiến lên nào!';
  static const milestone10 = 'Con đã vượt qua mốc câu số mười! Chỉ còn năm câu nữa thôi!';
  static const finale = 'Đây là câu hỏi cuối cùng! Hãy thật bình tĩnh nhé!';
  static const end = 'Chương trình đã kết thúc! Cùng xem bảng năng lực của con nào!';

  static const _numbers = [
    'một',
    'hai',
    'ba',
    'bốn',
    'năm',
    'sáu',
    'bảy',
    'tám',
    'chín',
    'mười',
    'mười một',
    'mười hai',
    'mười ba',
    'mười bốn',
    'mười lăm',
  ];

  /// "Câu hỏi số năm" (1–15).
  static String questionNumber(int n) => 'Câu hỏi số ${_numbers[(n - 1).clamp(0, 14)]}!';

  static List<String> all() => {
    welcome,
    welcomeBack,
    start,
    chooseNow,
    confirm,
    ...correct,
    wrong,
    timeout,
    fifty,
    askTeacher,
    swap,
    milestone5,
    milestone10,
    finale,
    end,
    for (var i = 1; i <= 15; i++) questionNumber(i),
  }.toList();
}

/// Tách đề thành các câu để MC đọc (không lặp dấu chấm: "DAKEG.. Đường" → "DAKEG. Đường").
List<String> promptSentences(String prompt) => [
  for (final line in prompt.split('\n'))
    if (line.trim().isNotEmpty) RegExp(r'[.!?:]$').hasMatch(line.trim()) ? line.trim() : '${line.trim()}.',
];

/// Câu MC đọc một đáp án.
String answerLine(int index, String choice) => 'Đáp án ${'ABCD'[index]}: $choice.';

/// Hạt giống cố định theo mã câu (giống nhau trên mọi máy/trình duyệt) → thứ tự đáp án cố định,
/// nhờ vậy lời MC đọc đáp án được ghi âm sẵn.
/// (Phép tính giữ dưới 2^53 nên trình duyệt và máy ảo Dart cho cùng kết quả.)
int stableSeed(String id) {
  var h = 7;
  for (final c in id.codeUnits) {
    h = (h * 31 + c) % 1000000007;
  }
  return h;
}
