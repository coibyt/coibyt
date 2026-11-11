/// "Bí quyết của cô" và "Mẹo nhớ nhanh" cho từng dạng bài Toán 3.
///
/// Mỗi câu ngắn, dễ hiểu với bé 8–9 tuổi, được ghi âm sẵn bằng 11max (tool/make_voice.dart).
/// Chọn theo từ khoá trong tên bài; không khớp thì dùng mẹo chung của mảng kiến thức.
library;

class Tip {
  const Tip(this.kind, this.text);

  final TipKind kind;
  final String text;
}

enum TipKind {
  /// Bí quyết: cách làm đúng, chắc chắn.
  secret('Bí quyết của cô'),

  /// Mẹo: cách nhớ nhanh, tính nhẩm nhanh.
  trick('Mẹo nhớ nhanh'),

  /// Lưu ý: lỗi hay gặp.
  warning('Cẩn thận nhé');

  const TipKind(this.title);
  final String title;
}

const _s = TipKind.secret, _t = TipKind.trick, _w = TipKind.warning;

/// (từ khoá trong tên bài, các mẹo). Thứ tự quan trọng: khớp trước được ưu tiên.
const _byKeyword = <(List<String>, List<Tip>)>[
  (
    ['bảng nhân 2', 'bảng nhân 3', 'bảng nhân 4', 'bảng nhân 6', 'bảng nhân 7', 'bảng nhân 8'],
    [
      Tip(_t, 'Đổi chỗ hai thừa số thì tích không đổi. Thuộc 3 × 7 là biết luôn 7 × 3!'),
      Tip(_s, 'Quên một dòng trong bảng nhân? Lấy dòng ngay trên rồi cộng thêm một lần số đó.'),
      Tip(_t, 'Phép chia là phép nhân ngược lại. Biết 6 × 4 = 24 thì 24 : 6 = 4 và 24 : 4 = 6.'),
    ],
  ),
  (
    ['bảng nhân 9'],
    [
      Tip(_t, 'Mẹo bảng nhân 9: cộng hai chữ số của tích luôn được 9. Ví dụ 9 × 4 = 36, và 3 + 6 = 9.'),
      Tip(_t, 'Nhân với 9 thì lấy nhân với 10 rồi bớt đi một lần số đó. 9 × 7 = 70 − 7 = 63.'),
      Tip(_s, 'Phép chia là phép nhân ngược lại. Biết 9 × 6 = 54 thì 54 : 9 = 6.'),
    ],
  ),
  (
    ['tìm thành phần trong phép cộng'],
    [
      Tip(_s, 'Muốn tìm số hạng chưa biết, lấy tổng trừ đi số hạng đã biết.'),
      Tip(_s, 'Muốn tìm số bị trừ, lấy hiệu cộng với số trừ. Muốn tìm số trừ, lấy số bị trừ trừ đi hiệu.'),
      Tip(_t, 'Tìm xong, con thay số vào phép tính để thử lại xem có đúng không nhé.'),
    ],
  ),
  (
    ['tìm thành phần trong phép nhân'],
    [
      Tip(_s, 'Muốn tìm thừa số chưa biết, lấy tích chia cho thừa số đã biết.'),
      Tip(_s, 'Muốn tìm số bị chia, lấy thương nhân với số chia. Muốn tìm số chia, lấy số bị chia chia cho thương.'),
      Tip(_t, 'Tìm xong, con thay số vào phép tính để thử lại nhé.'),
    ],
  ),
  (
    ['một phần mấy'],
    [
      Tip(_s, 'Muốn tìm một phần mấy của một số, con lấy số đó chia cho số phần.'),
      Tip(_t, 'Một phần hai là một nửa. Một phần tư là một nửa của một nửa.'),
    ],
  ),
  (
    ['trung điểm', 'điểm ở giữa'],
    [
      Tip(_s, 'Trung điểm chia đoạn thẳng thành hai phần dài bằng nhau.'),
      Tip(_t, 'Đo cả đoạn thẳng rồi chia đôi là tìm được trung điểm.'),
    ],
  ),
  (
    ['hình tròn', 'đường tròn'],
    [
      Tip(_s, 'Đường kính dài gấp đôi bán kính. Bán kính bằng một nửa đường kính.'),
      Tip(_t, 'Mọi bán kính của một hình tròn đều dài bằng nhau.'),
    ],
  ),
  (
    ['góc'],
    [
      Tip(_t, 'Dùng góc của tờ giấy hoặc ê ke để kiểm tra góc vuông.'),
      Tip(_s, 'Góc vuông giống góc của quyển vở, của bảng đen.'),
    ],
  ),
  (
    ['tam giác', 'tứ giác', 'hình chữ nhật, hình vuông'],
    [
      Tip(_s, 'Hình tam giác có 3 cạnh, 3 đỉnh. Hình tứ giác có 4 cạnh, 4 đỉnh.'),
      Tip(_s, 'Hình vuông có 4 cạnh bằng nhau và 4 góc vuông.'),
      Tip(_t, 'Hình chữ nhật có hai chiều dài bằng nhau, hai chiều rộng bằng nhau.'),
    ],
  ),
  (
    ['khối lập phương', 'khối hộp'],
    [
      Tip(_s, 'Khối lập phương và khối hộp chữ nhật đều có 6 mặt, 8 đỉnh, 12 cạnh.'),
      Tip(_t, 'Các mặt của khối lập phương đều là hình vuông bằng nhau.'),
    ],
  ),
  (
    ['gấp một số', 'so sánh số lớn gấp'],
    [
      Tip(_s, 'Gấp một số lên mấy lần thì lấy số đó nhân với số lần.'),
      Tip(_s, 'Muốn biết số lớn gấp mấy lần số bé, lấy số lớn chia cho số bé.'),
    ],
  ),
  (
    ['giảm một số'],
    [
      Tip(_s, 'Giảm một số đi mấy lần thì lấy số đó chia cho số lần.'),
      Tip(_w, 'Đừng nhầm: giảm đi mấy lần là phép chia, còn bớt đi mấy đơn vị là phép trừ.'),
    ],
  ),
  (
    ['chia hết', 'chia có dư'],
    [
      Tip(_w, 'Số dư luôn bé hơn số chia. Nếu số dư lớn hơn, con chia tiếp được nữa đấy!'),
      Tip(_s, 'Thử lại phép chia có dư: lấy thương nhân số chia, rồi cộng số dư.'),
    ],
  ),
  (
    ['hai bước tính'],
    [
      Tip(_s, 'Bài toán hai bước: tìm điều chưa biết trước, rồi mới tìm điều đề hỏi.'),
      Tip(_t, 'Gạch chân điều đề cho và điều đề hỏi, con sẽ thấy ngay cần làm phép tính gì.'),
    ],
  ),
  (
    ['mi-li-mét'],
    [
      Tip(_t, 'Một xăng-ti-mét bằng mười mi-li-mét. Một mét bằng một nghìn mi-li-mét.'),
      Tip(_w, 'Đổi về cùng một đơn vị rồi mới so sánh hay cộng trừ nhé.'),
    ],
  ),
  (
    ['gam'],
    [Tip(_t, 'Một ki-lô-gam bằng một nghìn gam.'), Tip(_w, 'Đổi về cùng một đơn vị rồi mới so sánh hay cộng trừ nhé.')],
  ),
  (
    ['mi-li-lít'],
    [Tip(_t, 'Một lít bằng một nghìn mi-li-lít.'), Tip(_w, 'Đổi về cùng một đơn vị rồi mới so sánh hay cộng trừ nhé.')],
  ),
  (
    ['nhiệt độ'],
    [
      Tip(_s, 'Đọc nhiệt kế: nhìn đỉnh cột chất lỏng chỉ vào vạch số nào.'),
      Tip(_t, 'Nước đá tan ở không độ C, nước sôi ở một trăm độ C.'),
    ],
  ),
  (
    ['biểu thức'],
    [
      Tip(_s, 'Biểu thức có ngoặc thì tính trong ngoặc trước.'),
      Tip(_s, 'Có cả nhân, chia và cộng, trừ thì nhân chia trước, cộng trừ sau.'),
      Tip(_w, 'Chỉ có cộng trừ, hoặc chỉ có nhân chia, thì tính lần lượt từ trái sang phải.'),
    ],
  ),
  (
    ['la mã'],
    [
      Tip(_t, 'Chữ I là một, V là năm, X là mười.'),
      Tip(_s, 'Chữ I đứng bên phải thì cộng thêm, đứng bên trái thì bớt đi. VI là sáu, IV là bốn.'),
    ],
  ),
  (
    ['làm tròn'],
    [
      Tip(
        _s,
        'Nhìn chữ số ngay bên phải hàng cần làm tròn: từ năm trở lên thì làm tròn lên, dưới năm thì làm tròn xuống.',
      ),
      Tip(_t, 'Làm tròn xong, các chữ số bên phải hàng đó đều thành số không.'),
    ],
  ),
  (
    ['so sánh các số'],
    [
      Tip(_s, 'Số nào có nhiều chữ số hơn thì lớn hơn.'),
      Tip(_s, 'Cùng số chữ số thì so sánh từng hàng, từ trái sang phải.'),
    ],
  ),
  (
    ['bốn chữ số', 'năm chữ số. số', 'các số đến 1000', 'các số trong phạm vi'],
    [
      Tip(_t, 'Đọc số theo từng lớp: hàng nghìn, rồi hàng trăm, hàng chục, hàng đơn vị.'),
      Tip(_w, 'Hàng nào không có thì viết chữ số không vào hàng đó.'),
    ],
  ),
  (
    ['chu vi'],
    [
      Tip(_s, 'Chu vi là tổng độ dài các cạnh của hình.'),
      Tip(_t, 'Chu vi hình vuông bằng độ dài một cạnh nhân bốn.'),
      Tip(_t, 'Chu vi hình chữ nhật bằng chiều dài cộng chiều rộng, rồi nhân hai.'),
    ],
  ),
  (
    ['diện tích'],
    [
      Tip(_s, 'Diện tích hình chữ nhật bằng chiều dài nhân chiều rộng, cùng một đơn vị đo.'),
      Tip(_t, 'Diện tích hình vuông bằng độ dài một cạnh nhân với chính nó.'),
      Tip(_w, 'Diện tích viết đơn vị là xăng-ti-mét vuông, đừng quên chữ vuông nhé.'),
    ],
  ),
  (
    ['đồng hồ', 'tháng'],
    [
      Tip(_t, 'Kim ngắn chỉ giờ, kim dài chỉ phút. Kim dài đi hết một vòng là một giờ.'),
      Tip(_t, 'Nắm tay lại đếm các đốt ngón tay: tháng ở đốt nhô lên có ba mươi mốt ngày.'),
    ],
  ),
  (
    ['tiền việt nam'],
    [
      Tip(_s, 'Cộng tiền như cộng số bình thường, rồi viết thêm chữ đồng.'),
      Tip(_t, 'Gộp các tờ tiền giống nhau lại để đếm cho nhanh.'),
    ],
  ),
  (
    ['thống kê', 'số liệu'],
    [
      Tip(_s, 'Đọc kỹ tên hàng và tên cột của bảng trước khi trả lời.'),
      Tip(_t, 'Đếm xong thì đánh dấu lại để không đếm sót, không đếm trùng.'),
    ],
  ),
  (
    ['khả năng xảy ra'],
    [Tip(_s, 'Chắc chắn là lần nào cũng xảy ra. Không thể là không bao giờ xảy ra. Có thể là lúc có lúc không.')],
  ),
  (
    ['nhân số có'],
    [
      Tip(_s, 'Nhân từ phải sang trái, bắt đầu từ hàng đơn vị.'),
      Tip(_w, 'Đừng quên cộng thêm số nhớ vào lượt nhân tiếp theo nhé!'),
      Tip(_t, 'Ước lượng trước: làm tròn số rồi nhân nhẩm, để biết kết quả khoảng bao nhiêu.'),
    ],
  ),
  (
    ['chia số có'],
    [
      Tip(_s, 'Chia từ trái sang phải. Mỗi lượt: chia, nhân, trừ, rồi hạ chữ số tiếp theo.'),
      Tip(_w, 'Hạ một chữ số mà không chia được thì viết số không vào thương.'),
      Tip(_t, 'Thử lại: lấy thương nhân với số chia, cộng số dư, phải ra số bị chia.'),
    ],
  ),
  (
    ['phép cộng'],
    [
      Tip(_s, 'Đặt tính thẳng cột, cộng từ hàng đơn vị sang trái.'),
      Tip(_w, 'Cộng hai chữ số được từ mười trở lên thì nhớ một sang hàng bên trái.'),
      Tip(_t, 'Thử lại phép cộng bằng cách lấy tổng trừ đi một số hạng.'),
    ],
  ),
  (
    ['phép trừ'],
    [
      Tip(_s, 'Đặt tính thẳng cột, trừ từ hàng đơn vị sang trái.'),
      Tip(_w, 'Chữ số trên bé hơn chữ số dưới thì mượn một chục, rồi nhớ một vào hàng bên trái.'),
      Tip(_t, 'Thử lại phép trừ: lấy hiệu cộng với số trừ, phải ra số bị trừ.'),
    ],
  ),
];

/// Mẹo chung cho bài luyện tập, ôn tập.
const _general = [
  Tip(_s, 'Đọc đề hai lần: lần một hiểu đề cho gì, lần hai xem đề hỏi gì.'),
  Tip(_t, 'Làm xong, con dò lại từng bước một lần trước khi bấm kiểm tra nhé.'),
  Tip(_s, 'Gặp bài khó, con làm bài dễ trước rồi quay lại sau.'),
];

/// Mẹo cho một bài học (theo tên bài); tối đa [max] mẹo.
List<Tip> tipsForLesson(String title, {int max = 3}) {
  final t = title.toLowerCase();
  final out = <Tip>[];
  for (final (keys, tips) in _byKeyword) {
    if (keys.any(t.contains)) {
      for (final tip in tips) {
        if (!out.any((o) => o.text == tip.text)) out.add(tip);
      }
    }
    if (out.length >= max) break;
  }
  if (out.length < 2) out.addAll(_general.take(2 - out.length + 1));
  return out.take(max).toList();
}

/// Mọi câu mẹo (để ghi âm trước).
List<String> allTipTexts() => {
  for (final (_, tips) in _byKeyword)
    for (final tip in tips) tip.text,
  for (final tip in _general) tip.text,
}.toList();
