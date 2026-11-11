import 'dart:math';

import '../models/blocks.dart';
import '../models/problem.dart';

/// Tên cô giáo ảo (đổi ở đây nếu muốn tên khác).
const kTeacherName = 'Cô Mai';

/// Mọi câu CỐ ĐỊNH cô giáo nói. Câu cố định được ghi âm trước bằng 11max
/// (tool/make_voice.dart) nên phát ngay, không cần mạng. Không đưa số/tên vào
/// các câu này để giọng đọc luôn khớp chữ.
abstract final class TutorLines {
  static const greeting = 'Chào mừng con! Hôm nay chúng ta cùng chinh phục điểm 10 môn Toán nhé!';

  static const praise = ['Xuất sắc!', 'Chính xác!', 'Giỏi quá!', 'Tuyệt vời!', 'Đúng rồi, con làm tốt lắm!'];
  static const praiseFast = ['Con làm nhanh quá!', 'Nhanh mà chính xác, giỏi lắm!'];
  static const praiseCombo = ['Xuất sắc! Con làm đúng liền mấy câu rồi!', 'Con đang rất phong độ, cứ thế nhé!'];
  static const praiseSuperCombo = 'Siêu quá! Một chuỗi câu đúng dài luôn!';
  static const praiseRetry = ['Đúng rồi! Con sửa giỏi lắm!', 'Đúng rồi! Kiên trì thật tuyệt!'];

  static const wrongPrefix = ['Chưa chính xác rồi.', 'Gần đúng rồi!', 'Không sao, mình thử lại nhé.'];

  /// Câu chủ dự án yêu cầu cho bài đặt tính.
  static const wrongColumn = 'Chưa chính xác rồi, con thử tính cột hàng đơn vị trước xem sao?';
  static const wrongDivision = 'Chưa chính xác rồi, con thử chia từ hàng chục trước xem sao?';

  static const reveal = [
    'Không sao cả! Mình cùng xem cách làm nhé.',
    'Bài này hơi khó. Cô với con cùng xem từng bước nhé!',
  ];

  static const idleNudge = [
    'Con cần cô gợi ý không? Bấm nút Gợi ý nhé!',
    'Con cứ bình tĩnh, tính ra nháp trước rồi điền đáp án nhé.',
  ];
  static const pressCheck = 'Con làm xong rồi thì bấm Kiểm tra nhé!';
  static const incomplete = 'Con hãy làm hết các ô trước nhé!';
  static const invalidNumber = 'Con chỉ cần nhập số thôi nhé!';

  static const summary = {
    3: 'Xuất sắc! Con được ba sao!',
    2: 'Làm tốt lắm! Cố thêm chút nữa là được ba sao nhé!',
    1: 'Cố lên nào! Mình luyện lại bài này nhé!',
    0: 'Không sao, mình cùng ôn lại từ đầu nhé!',
  };

  static const breakTime =
      'Con học lâu rồi, giỏi lắm! Mình nghỉ mắt năm phút nhé: nhìn ra xa, uống nước rồi quay lại học tiếp.';

  static const keyword = {
    'ít hơn': 'Đọc kỹ lại đề bài xem có từ "ít hơn" không nhé! Mình phải bớt đi đấy.',
    'nhiều hơn': 'Đề bài có từ "nhiều hơn", con thử cộng thêm xem sao?',
    'gấp': 'Có từ "gấp", con nghĩ tới phép nhân nhé!',
    'chia đều': 'Chia đều thành các phần bằng nhau, con thử làm phép chia nhé!',
    'còn lại': 'Đề hỏi "còn lại", mình lấy số ban đầu bớt đi số đã dùng nhé.',
    'mỗi': 'Mỗi nhóm bằng nhau, có nhiều nhóm, con thử phép nhân xem sao?',
  };

  static const structure = {
    'add': 'Con thử cộng hàng đơn vị trước xem sao? Nhớ cộng số nhớ sang hàng chục nhé.',
    'subtract': 'Trừ từ hàng đơn vị trước. Không trừ được thì mượn một chục nhé!',
    'multiply': 'Con nhân hàng đơn vị trước, rồi mới nhân hàng chục. Đừng quên số nhớ!',
    'divide': 'Chia từ trái sang phải: chia hàng chục trước, rồi hạ hàng đơn vị xuống nhé.',
    'word': 'Con đọc chậm lại đề bài: đề cho biết gì, hỏi gì nhé?',
    'matching': 'Con tính từng phép tính bên trái trước, rồi mới tìm kết quả bên phải nhé.',
    'dragDrop': 'Con tính kết quả từng dòng trước rồi kéo thẻ vào nhé.',
    'multipleChoice': 'Con tính ra nháp trước, rồi mới chọn đáp án nhé.',
    'fillBlank': 'Con đọc kỹ đề và tính cẩn thận từng bước nhé.',
  };

  /// Tất cả câu cố định (để ghi âm trước).
  static List<String> all() => {
    greeting,
    ...praise,
    ...praiseFast,
    ...praiseCombo,
    praiseSuperCombo,
    ...praiseRetry,
    ...wrongPrefix,
    wrongColumn,
    wrongDivision,
    ...reveal,
    ...idleNudge,
    pressCheck,
    incomplete,
    invalidNumber,
    ...summary.values,
    breakTime,
    ...keyword.values,
    ...structure.values,
  }.toList();
}

/// Phần bài toán cần làm nổi bật khi cô gợi ý (cột đơn vị / hàng chục số bị chia).
sealed class ColumnFocus {
  const ColumnFocus();
}

class ColumnFocusArithmetic extends ColumnFocus {
  const ColumnFocusArithmetic(this.block);
  final ColumnArithmeticBlock block;
}

class ColumnFocusDivision extends ColumnFocus {
  const ColumnFocusDivision(this.block);
  final LongDivisionBlock block;
}

/// Cô giáo ảo. Chỉ gợi ý, KHÔNG BAO GIỜ nói đáp án trước khi bé thử.
class TutorBrain {
  TutorBrain({Random? random}) : _random = random ?? Random();

  final Random _random;

  String _pick(List<String> list) => list[_random.nextInt(list.length)];

  /// Câu chào khi vào app.
  String greeting([String? childName]) => TutorLines.greeting;

  /// Gợi ý khéo cho một bài: không chứa đáp án.
  String hint(Problem p) {
    final authored = p.solution.hint;
    if (authored != null && authored.trim().isNotEmpty) return authored;
    final t = p.prompt.text.toLowerCase();
    for (final e in TutorLines.keyword.entries) {
      if (e.key == 'mỗi') {
        if (t.contains('mỗi') && (t.contains('hỏi') || t.contains('tất cả'))) return e.value;
      } else if (t.contains(e.key) || (e.key == 'chia đều' && (t.contains('chia thành') || t.contains('bằng nhau')))) {
        return e.value;
      }
    }
    for (final step in p.solution.steps) {
      switch (step) {
        case ColumnArithmeticBlock(:final operation):
          return TutorLines.structure[operation.name]!;
        case LongDivisionBlock():
          return TutorLines.structure['divide']!;
        case WordProblemBlock():
          return TutorLines.structure['word']!;
        default:
          break;
      }
    }
    return TutorLines.structure[p.type.name]!;
  }

  /// Bài mà đề đã cho sẵn phép tính đặt tính (vd "16 × 5 = ?"): trả về phép tính
  /// để làm nổi bật cột hàng đơn vị khi bé sai. Bài có lời văn thì không (tránh lộ phép tính).
  ColumnFocus? columnFocus(Problem p) {
    if (p.type != ProblemType.fillBlank && p.type != ProblemType.multipleChoice) return null;
    if (p.solution.steps.isEmpty) return null;
    return switch (p.solution.steps.first) {
      final ColumnArithmeticBlock b => ColumnFocusArithmetic(b),
      final LongDivisionBlock b => ColumnFocusDivision(b),
      _ => null,
    };
  }

  /// Khi bé sai lần đầu: các câu cô nói (đọc nối tiếp).
  List<String> afterWrong(Problem p) => switch (columnFocus(p)) {
    ColumnFocusArithmetic() => [TutorLines.wrongColumn],
    ColumnFocusDivision() => [TutorLines.wrongDivision],
    null => [_pick(TutorLines.wrongPrefix), hint(p)],
  };

  /// Khi sai lần hai: cùng xem cách làm.
  String afterReveal() => _pick(TutorLines.reveal);

  /// Lời khen khi đúng. [combo] = số câu đúng liền (tính cả câu này), [fast] = làm nhanh.
  String praise({required int combo, required bool fast, required bool firstTry}) {
    if (!firstTry) return _pick(TutorLines.praiseRetry);
    if (combo >= 5) return TutorLines.praiseSuperCombo;
    if (combo >= 3) return _pick(TutorLines.praiseCombo);
    if (fast) return _pick(TutorLines.praiseFast);
    return _pick(TutorLines.praise);
  }

  String idleNudge() => _pick(TutorLines.idleNudge);
}
