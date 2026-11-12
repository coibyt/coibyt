/// Lời cô Mai coi thi: dặn dò, đọc đề và đáp án, nhắc giờ, chấm điểm
/// (Dart thuần — dùng chung cho phòng thi và tool/make_voice.dart để ghi âm sẵn).
library;

import 'dart:math';

import '../models/exam.dart';
import '../models/problem.dart';
import 'show_lines.dart' show answerLine, stableSeed;
import 'tutor.dart' show readableTemplate;

abstract final class ExamLines {
  static const welcome = 'Chào con! Hôm nay cô Mai coi thi cho con. Con ngồi ngay ngắn và nghe cô dặn dò nhé.';
  static const ruleRead =
      'Trong giờ thi, cô sẽ đọc đề và các đáp án cho con nghe. Con suy nghĩ thật kỹ rồi mới chọn nhé.';
  static const ruleClock = 'Đồng hồ ở góc trên màn hình. Hết giờ, bài sẽ tự nộp.';
  static const ruleSkip = 'Câu nào khó, con cứ làm câu khác trước, rồi quay lại sau.';
  static const ruleHeart = 'Mỗi câu sai sẽ mất một trái tim, nên con làm cẩn thận nhé.';
  static const ready = 'Khi nào sẵn sàng, con bấm nút Bắt đầu làm bài. Chúc con làm bài thật tốt!';
  static const resume = 'Con làm tiếp bài đang dở nhé. Cô bấm giờ tiếp đây!';
  static const start = 'Cô bấm giờ nhé. Bắt đầu làm bài!';
  static const fiveMinutes = 'Còn 5 phút nữa thôi! Con kiểm tra lại bài nhé.';
  static const oneMinute = 'Còn 1 phút! Con bình tĩnh, nhanh tay lên nào.';
  static const allDone = 'Con đã làm hết các câu rồi! Con xem lại bài một lượt, rồi bấm Nộp bài nhé.';
  static const submitted = 'Con nộp bài rồi! Cô chấm bài ngay đây.';
  static const timeUp = 'Hết giờ rồi! Cô thu bài nhé.';
  static const encourage = [
    'Con cứ bình tĩnh suy nghĩ nhé, cô tin con làm được!',
    'Con đọc lại đề thật chậm, gạch chân điều đề hỏi nhé.',
    'Con tính ra nháp trước, rồi mới chọn đáp án nhé.',
  ];

  /// "Đây là bài Kiểm tra 15 phút: Kiểm tra cuối tuần 1."
  static String title(Exam e) => 'Đây là bài ${e.examType.displayName}: ${e.title}.';

  /// "Bài có 5 câu, con làm trong 15 phút, tổng điểm là 10 điểm."
  static String size(Exam e) =>
      'Bài có ${e.items.length} câu, con làm trong ${e.durationMinutes} phút, tổng điểm là 10 điểm.';

  /// "Câu 3, 1 phẩy 5 điểm." (giọng đọc đổi số thành chữ).
  static String question(int n, double points) => 'Câu $n, ${pointsSpoken(points)} điểm.';

  static String score(int s) => 'Con được $s điểm.';

  static String comment(int s) => s >= 9
      ? 'Xuất sắc! Cô rất tự hào về con.'
      : s >= 7
      ? 'Làm tốt lắm! Con xem lại những câu sai để lần sau được điểm cao hơn nhé.'
      : s >= 5
      ? 'Con cố gắng thêm nhé! Mình cùng xem lại các câu sai.'
      : 'Không sao đâu con! Mình cùng ôn lại bài, lần sau con sẽ làm tốt hơn.';

  /// Lời dặn dò ở cửa phòng thi.
  static List<String> intro(Exam e) => [welcome, title(e), size(e), ruleRead, ruleClock, ruleSkip, ruleHeart, ready];

  /// Lời cô đọc khi bé tới câu [index]: tên phần (câu đầu mỗi phần), số câu và điểm, câu lệnh, đề.
  static List<String> questionLines(Exam e, int index) {
    final items = e.items;
    final it = items[index];
    final p = it.problem;
    final text = p.prompt.text.trim();
    final instruction = p.displayInstruction.trim();
    String? section;
    var k = 0;
    for (final s in e.sections) {
      if (index == k && e.sections.length > 1) section = s.title;
      k += s.items.length;
    }
    return [
      ?section,
      question(index + 1, it.points),
      if (instruction.isNotEmpty && !text.startsWith(instruction)) instruction,
      text,
      if (p.body case FillBlankBody(:final template)) ?readableTemplate(template, text),
    ];
  }

  /// Thứ tự đáp án trắc nghiệm của câu (cố định theo đề → cô đọc đúng thứ tự trên màn hình, làm tiếp vẫn giữ nguyên).
  static List<String>? choiceOrder(Exam e, Problem p) {
    final body = p.body;
    if (body is! MultipleChoiceBody) return null;
    final ids = [for (final c in body.choices) c.id];
    if (body.shuffleChoices) ids.shuffle(Random(stableSeed('${e.id}/${p.id}')));
    return ids;
  }

  /// "Đáp án A: 909." theo thứ tự trên màn hình.
  static List<(String id, String line)> choiceLines(Exam e, Problem p) {
    final order = choiceOrder(e, p);
    if (order == null) return const [];
    final body = p.body as MultipleChoiceBody;
    return [for (final (i, id) in order.indexed) (id, answerLine(i, body.choices.firstWhere((c) => c.id == id).text))];
  }

  /// Mọi câu cố định (để ghi âm sẵn).
  static List<String> fixed() => [
    welcome,
    ruleRead,
    ruleClock,
    ruleSkip,
    ruleHeart,
    ready,
    resume,
    start,
    fiveMinutes,
    oneMinute,
    allDone,
    submitted,
    timeUp,
    ...encourage,
    for (var s = 0; s <= 10; s++) ...[score(s), comment(s)],
  ];

  /// Mọi câu cô đọc cho đề [e].
  static List<String> all(Exam e) => [
    ...intro(e),
    for (var i = 0; i < e.items.length; i++) ...[
      ...questionLines(e, i),
      for (final (_, l) in choiceLines(e, e.items[i].problem)) l,
    ],
  ];
}

/// 1 → "1", 1.5 → "1 phẩy 5", 0.25 → "0 phẩy 25".
String pointsSpoken(double p) {
  if (p == p.roundToDouble()) return '${p.toInt()}';
  final s = p.toString();
  final dot = s.indexOf('.');
  return '${s.substring(0, dot)} phẩy ${s.substring(dot + 1)}';
}
