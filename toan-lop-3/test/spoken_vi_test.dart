import 'package:flutter_test/flutter_test.dart';
import 'package:toan_lop_3/logic/spoken_vi.dart';

void main() {
  test('đọc số tiếng Việt đúng quy tắc mốt / tư / lăm / linh / mười', () {
    final cases = {
      0: 'không',
      5: 'năm',
      10: 'mười',
      11: 'mười một',
      14: 'mười bốn',
      15: 'mười lăm',
      21: 'hai mươi mốt',
      24: 'hai mươi tư',
      25: 'hai mươi lăm',
      30: 'ba mươi',
      93: 'chín mươi ba',
      100: 'một trăm',
      105: 'một trăm linh năm',
      115: 'một trăm mười lăm',
      372: 'ba trăm bảy mươi hai',
      1000: 'một nghìn',
      1005: 'một nghìn không trăm linh năm',
      12345: 'mười hai nghìn ba trăm bốn mươi lăm',
    };
    cases.forEach((n, w) => expect(numberToVietnamese(n), w, reason: '$n'));
  });

  test('câu gợi ý có phép tính, đơn vị, tên lớp', () {
    expect(
      spokenVietnamese('Chia đều 75 quả vào 5 giỏ: ta làm phép chia 75 : 5.'),
      'Chia đều bảy mươi lăm quả vào năm giỏ: ta làm phép chia bảy mươi lăm chia năm.',
    );
    expect(
      spokenVietnamese('Lấy 3 nhân hàng đơn vị trước: 3 × 1 = ?'),
      'Lấy ba nhân hàng đơn vị trước: ba nhân một bằng bao nhiêu?',
    );
    expect(
      spokenVietnamese('5 × 6 = 30, viết 0 và nhớ 3 nhé.'),
      'năm nhân sáu bằng ba mươi, viết không và nhớ ba nhé.',
    );
    expect(
      spokenVietnamese('Tìm số gạo đã bán trước (2 bao), rồi lấy 93 kg trừ đi.'),
      'Tìm số gạo đã bán trước (hai bao), rồi lấy chín mươi ba ki-lô-gam trừ đi.',
    );
    expect(spokenVietnamese('Bước 1: tìm số cây lớp 3A trồng.'), 'Bước một: tìm số cây lớp ba A trồng.');
    expect(spokenVietnamese('Xuất sắc!'), 'Xuất sắc!');
    expect(spokenVietnamese('Hôm nay chinh phục điểm 10 môn Toán nhé!'), 'Hôm nay chinh phục điểm mười môn Toán nhé!');
  });
}
