import 'dart:math';

import '../models/blocks.dart';
import '../models/problem.dart';

/// "Cô Ong" — gia sư ảo. Chỉ gợi ý, KHÔNG BAO GIỜ nói đáp án trước khi bé thử.
class TutorBrain {
  TutorBrain({Random? random}) : _random = random ?? Random();

  final Random _random;

  String _pick(List<String> list) => list[_random.nextInt(list.length)];

  /// Câu chào khi vào app.
  String greeting(String childName) {
    final who = (childName.trim().isEmpty || childName == 'Bé') ? 'con' : childName.trim();
    return 'Chào mừng $who! Hôm nay chúng ta cùng chinh phục điểm 10 môn Toán nhé!';
  }

  /// Gợi ý khéo cho một bài: không chứa đáp án.
  String hint(Problem p) {
    final authored = p.solution.hint;
    if (authored != null && authored.trim().isNotEmpty) return authored;
    final fromWords = _keywordHint(p.prompt.text);
    if (fromWords != null) return fromWords;
    return _structureHint(p);
  }

  static String? _keywordHint(String text) {
    final t = text.toLowerCase();
    if (t.contains('ít hơn')) return 'Đọc kỹ lại đề bài nhé: có từ "ít hơn" — mình phải bớt đi đấy!';
    if (t.contains('nhiều hơn')) return 'Đề bài có từ "nhiều hơn" — con thử cộng thêm xem sao?';
    if (t.contains('gấp')) return 'Có từ "gấp" — con nghĩ tới phép nhân nhé!';
    if (t.contains('chia đều') || t.contains('chia thành') || t.contains('bằng nhau')) {
      return 'Chia đều thành các phần bằng nhau — con thử làm phép chia nhé!';
    }
    if (t.contains('còn lại')) return 'Đề hỏi "còn lại" — mình lấy số ban đầu bớt đi số đã dùng nhé.';
    if (t.contains('mỗi') && (t.contains('hỏi') || t.contains('tất cả'))) {
      return 'Mỗi nhóm bằng nhau, có nhiều nhóm — con thử phép nhân xem sao?';
    }
    return null;
  }

  static String _structureHint(Problem p) {
    for (final step in p.solution.steps) {
      switch (step) {
        case ColumnArithmeticBlock(:final operation):
          return switch (operation) {
            ColumnOperation.add => 'Con thử cộng hàng đơn vị trước xem sao? Nhớ cộng số nhớ sang hàng chục nhé.',
            ColumnOperation.subtract => 'Trừ từ hàng đơn vị trước. Không trừ được thì mượn 1 chục nhé!',
            ColumnOperation.multiply => 'Con nhân hàng đơn vị trước, rồi mới nhân hàng chục. Đừng quên số nhớ!',
          };
        case LongDivisionBlock():
          return 'Chia từ trái sang phải: chia hàng chục trước, rồi hạ hàng đơn vị xuống nhé.';
        case WordProblemBlock():
          return 'Con đọc chậm lại đề bài: đề cho biết gì, hỏi gì nhé?';
        default:
          break;
      }
    }
    return switch (p.type) {
      ProblemType.matching => 'Con tính từng phép tính bên trái trước, rồi mới tìm kết quả bên phải nhé.',
      ProblemType.dragDrop => 'Con tính kết quả từng dòng trước rồi kéo thẻ vào nhé.',
      ProblemType.multipleChoice => 'Con tính ra nháp trước, rồi mới chọn đáp án nhé.',
      ProblemType.fillBlank => 'Con đọc kỹ đề và tính cẩn thận từng bước nhé.',
    };
  }

  /// Khi bé sai lần đầu: động viên + gợi ý.
  String afterWrong(Problem p) =>
      '${_pick(const ['Chưa đúng rồi, cô gợi ý nhé:', 'Gần đúng rồi! Con nghe cô gợi ý nhé:', 'Không sao, mình thử lại nhé:'])} ${hint(p)}';

  /// Khi sai lần hai: cùng xem cách làm.
  String afterReveal() =>
      _pick(const ['Không sao cả! Mình cùng xem cách làm nhé.', 'Bài này hơi khó. Cô với con cùng xem từng bước nhé!']);

  /// Lời khen khi đúng. [combo] = số câu đúng liền (tính cả câu này), [fast] = làm nhanh.
  String praise({required int combo, required bool fast, required bool firstTry}) {
    if (!firstTry) return _pick(const ['Đúng rồi! Con sửa giỏi lắm!', 'Đúng rồi! Kiên trì thật tuyệt!']);
    if (combo >= 5) return 'Con làm đúng $combo câu liền rồi! Siêu quá!';
    if (combo >= 3) return _pick(['Xuất sắc! Đúng $combo câu liền!', 'Con đang rất phong độ: $combo câu liền!']);
    if (fast) return _pick(const ['Con làm nhanh quá!', 'Nhanh mà chính xác, giỏi lắm!']);
    return _pick(const ['Xuất sắc!', 'Chính xác!', 'Giỏi quá!', 'Tuyệt vời!', 'Đúng rồi, con làm tốt lắm!']);
  }
}
