/// "Bí quyết của cô" và "Mẹo nhớ nhanh" cho từng dạng bài Toán 4 (và các dạng ôn lại từ lớp 3).
///
/// Mỗi câu ngắn, dễ hiểu với bé 9–10 tuổi, được ghi âm sẵn bằng 11max (tool/make_voice.dart).
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
    ['số chẵn'],
    [
      Tip(_s, 'Nhìn chữ số tận cùng: 0, 2, 4, 6, 8 là số chẵn; 1, 3, 5, 7, 9 là số lẻ.'),
      Tip(_t, 'Hai số chẵn liền nhau hơn kém nhau 2 đơn vị, hai số lẻ liền nhau cũng vậy.'),
      Tip(_w, 'Số 0 cũng là số chẵn đấy!'),
    ],
  ),
  (
    ['biểu thức chứa chữ'],
    [
      Tip(_s, 'Thay chữ bằng số đã cho, rồi tính như biểu thức số bình thường.'),
      Tip(_w, 'Thay xong vẫn phải làm nhân, chia trước; cộng, trừ sau nhé.'),
      Tip(_t, 'Mỗi lần thay chữ bằng một số khác, ta được một giá trị khác của biểu thức.'),
    ],
  ),
  (
    ['ba bước tính'],
    [
      Tip(_s, 'Tóm tắt đề, vẽ sơ đồ nếu cần, rồi tìm lần lượt từng số trung gian.'),
      Tip(_t, 'Mỗi bước viết một câu lời giải, bước sau dùng kết quả của bước trước.'),
      Tip(_w, 'Đọc kỹ câu hỏi cuối cùng để không trả lời nhầm số trung gian nhé.'),
    ],
  ),
  (
    ['đo góc'],
    [
      Tip(_s, 'Đặt tâm thước đo góc trùng đỉnh góc, một cạnh đi qua vạch 0 rồi đọc số ở cạnh kia.'),
      Tip(_w, 'Thước có hai vòng số. Cạnh đi qua vạch 0 của vòng nào thì đọc số trên vòng đó.'),
      Tip(_t, 'Góc vuông luôn bằng 90 độ, con dùng làm mốc để ước lượng góc.'),
    ],
  ),
  (
    ['góc nhọn'],
    [
      Tip(_t, 'Nhọn bé hơn vuông, tù lớn hơn vuông, bẹt là đường thẳng: 180 độ.'),
      Tip(_s, 'So một góc với góc vuông của ê ke là biết ngay góc nhọn hay góc tù.'),
      Tip(_t, 'Kim đồng hồ lúc 3 giờ là góc vuông, lúc 6 giờ là góc bẹt.'),
    ],
  ),
  (
    ['sáu chữ số'],
    [
      Tip(_s, 'Tách số thành từng lớp ba chữ số từ phải sang trái rồi đọc từng lớp.'),
      Tip(_t, '10 trăm nghìn là 1 triệu, viết là một chữ số 1 và sáu chữ số 0.'),
      Tip(_w, 'Lớp nào có chữ số 0 ở đầu vẫn phải đọc, ví dụ “không trăm linh năm nghìn”.'),
    ],
  ),
  (
    ['hàng và lớp'],
    [
      Tip(_s, 'Mỗi lớp có ba hàng: đơn vị, chục, trăm của lớp đó.'),
      Tip(_t, 'Đọc xong mỗi lớp thì đọc tên lớp: triệu, nghìn.'),
      Tip(_w, 'Giá trị của chữ số phụ thuộc vào hàng: cùng chữ số 5 nhưng ở hàng khác thì giá trị khác.'),
    ],
  ),
  (
    ['lớp triệu'],
    [
      Tip(_s, 'Lớp triệu gồm hàng triệu, chục triệu, trăm triệu.'),
      Tip(_t, 'Đọc số: đọc lớp triệu, rồi lớp nghìn, rồi lớp đơn vị.'),
      Tip(_w, 'Viết số: lớp nào không có thì viết đủ ba chữ số 0.'),
    ],
  ),
  (
    ['so sánh các số có nhiều'],
    [
      Tip(_s, 'Số nào nhiều chữ số hơn thì lớn hơn.'),
      Tip(_t, 'Cùng số chữ số thì so sánh từng cặp chữ số từ trái sang phải.'),
      Tip(_w, 'Viết các số thẳng cột theo từng lớp cho dễ so sánh nhé.'),
    ],
  ),
  (
    ['dãy số tự nhiên'],
    [
      Tip(_s, 'Số 0 là số tự nhiên bé nhất, không có số tự nhiên lớn nhất.'),
      Tip(_t, 'Thêm 1 vào một số tự nhiên ta được số liền sau của nó.'),
      Tip(_w, 'Số liền trước của một số thì bớt đi 1, nhưng số 0 không có số liền trước.'),
    ],
  ),
  (
    ['yến, tạ'],
    [
      Tip(_t, 'Yến – mười, tạ – trăm, tấn – nghìn ki-lô-gam.'),
      Tip(_s, 'Đổi về cùng một đơn vị rồi mới so sánh hay cộng trừ.'),
      Tip(_w, 'Hai đơn vị liền nhau gấp kém nhau 10 lần.'),
    ],
  ),
  (
    ['mét vuông'],
    [
      Tip(_s, '1 m² = 100 dm², 1 dm² = 100 cm², 1 cm² = 100 mm².'),
      Tip(_t, 'Đơn vị diện tích liền nhau hơn kém nhau 100 lần, nên mỗi đơn vị ứng với hai chữ số.'),
      Tip(_w, 'Đừng nhầm với đơn vị độ dài chỉ hơn kém nhau 10 lần nhé.'),
    ],
  ),
  (
    ['giây, thế kỉ'],
    [
      Tip(_s, '1 phút = 60 giây; 1 thế kỉ = 100 năm.'),
      Tip(_t, 'Thế kỉ XXI bắt đầu từ năm 2001 đến năm 2100.'),
      Tip(_w, 'Năm 2000 vẫn thuộc thế kỉ XX đấy nhé!'),
    ],
  ),
  (
    ['thực hành và trải nghiệm sử dụng'],
    [
      Tip(_s, 'Ước lượng bằng đồ vật quen thuộc: bao xi măng 5 yến, con voi vài tấn.'),
      Tip(_t, 'Mặt bàn học khoảng vài chục đề-xi-mét vuông.'),
      Tip(_w, 'Đổi về cùng đơn vị rồi mới tính.'),
    ],
  ),
  (
    ['kết hợp của phép cộng'],
    [
      Tip(_t, 'Nhóm các số cộng lại tròn trăm, tròn nghìn để tính nhanh.'),
      Tip(_s, 'Đổi chỗ các số hạng thì tổng không thay đổi.'),
      Tip(_w, 'Chỉ đổi chỗ trong phép cộng, đừng đổi chỗ số trừ nhé.'),
    ],
  ),
  (
    ['tổng và hiệu'],
    [
      Tip(_s, 'Số lớn = (tổng + hiệu) : 2; số bé = (tổng - hiệu) : 2.'),
      Tip(_t, 'Vẽ sơ đồ đoạn thẳng để thấy số lớn dài hơn số bé đúng bằng hiệu.'),
      Tip(_w, 'Thử lại: số lớn cộng số bé phải bằng tổng.'),
    ],
  ),
  (
    ['vuông góc'],
    [
      Tip(_s, 'Hai đường thẳng vuông góc tạo thành bốn góc vuông chung đỉnh.'),
      Tip(_t, 'Dùng ê ke để kiểm tra và vẽ hai đường thẳng vuông góc.'),
      Tip(_w, 'Đặt cạnh góc vuông của ê ke trùng khít với đường thẳng đã cho.'),
    ],
  ),
  (
    ['song song'],
    [
      Tip(_s, 'Hai đường thẳng song song không bao giờ cắt nhau.'),
      Tip(_t, 'Hai đường thẳng cùng vuông góc với một đường thẳng thì song song với nhau.'),
      Tip(_w, 'Trong hình chữ nhật, các cạnh đối diện song song với nhau.'),
    ],
  ),
  (
    ['bình hành'],
    [
      Tip(_s, 'Hình bình hành có hai cặp cạnh đối diện song song và bằng nhau.'),
      Tip(_t, 'Hình thoi có bốn cạnh bằng nhau, chu vi bằng cạnh nhân 4.'),
      Tip(_w, 'Hình vuông cũng là một hình thoi đặc biệt đấy!'),
    ],
  ),
  (
    ['nhân với số có một'],
    [
      Tip(_s, 'Nhân từ phải sang trái, bắt đầu từ hàng đơn vị.'),
      Tip(_w, 'Đừng quên cộng thêm số nhớ vào lượt nhân tiếp theo nhé!'),
      Tip(_t, 'Ước lượng trước: làm tròn rồi nhân nhẩm để biết kết quả khoảng bao nhiêu.'),
    ],
  ),
  (
    ['chia cho số có một'],
    [
      Tip(_s, 'Chia từ trái sang phải: chia, nhân, trừ, rồi hạ chữ số tiếp theo.'),
      Tip(_w, 'Hạ một chữ số mà không chia được thì viết 0 vào thương.'),
      Tip(_t, 'Thử lại: thương nhân số chia cộng số dư phải ra số bị chia.'),
    ],
  ),
  (
    ['kết hợp của phép nhân'],
    [
      Tip(_t, 'Nhóm 25 với 4, 125 với 8, 5 với 2 để được số tròn rồi nhân.'),
      Tip(_s, 'Đổi chỗ các thừa số thì tích không thay đổi.'),
      Tip(_w, 'Tính chất này chỉ dùng khi cả biểu thức là phép nhân.'),
    ],
  ),
  (
    ['nhân, chia với 10'],
    [
      Tip(_s, 'Nhân với 10, 100, 1000: viết thêm 1, 2, 3 chữ số 0 vào bên phải.'),
      Tip(_t, 'Chia số tròn chục, tròn trăm cho 10, 100: bỏ bớt chữ số 0 ở bên phải.'),
      Tip(_w, 'Đếm đúng số chữ số 0 nhé!'),
    ],
  ),
  (
    ['phân phối'],
    [
      Tip(_s, 'a × (b + c) = a × b + a × c.'),
      Tip(_t, 'Nhân với 11 thì nhân với 10 rồi cộng thêm một lần số đó.'),
      Tip(_t, 'Nhân với 99 thì nhân với 100 rồi bớt đi một lần số đó.'),
    ],
  ),
  (
    ['nhân với số có hai'],
    [
      Tip(_s, 'Nhân với chữ số hàng đơn vị được tích riêng thứ nhất, với chữ số hàng chục được tích riêng thứ hai.'),
      Tip(_w, 'Tích riêng thứ hai viết lùi sang trái một cột!'),
      Tip(_t, 'Ước lượng: 49 × 21 khoảng 50 × 20 = 1000.'),
    ],
  ),
  (
    ['chia cho số có hai'],
    [
      Tip(_s, 'Ước lượng thương bằng cách làm tròn số chia, ví dụ chia cho 29 thì nghĩ như chia cho 30.'),
      Tip(_w, 'Nếu tích lớn hơn số đem chia thì giảm thương đi 1; nếu số dư lớn hơn số chia thì tăng thương lên 1.'),
      Tip(_t, 'Thử lại bằng phép nhân.'),
    ],
  ),
  (
    ['ước lượng'],
    [
      Tip(_s, 'Làm tròn các số rồi tính nhẩm để ước lượng kết quả.'),
      Tip(_t, 'Đi chợ: làm tròn giá tiền lên để biết mang đủ tiền không.'),
      Tip(_w, 'Ước lượng chỉ là gần đúng, cần kết quả chính xác thì phải tính.'),
    ],
  ),
  (
    ['trung bình cộng'],
    [
      Tip(_s, 'Tính tổng các số rồi chia cho số các số hạng.'),
      Tip(_t, 'Số trung bình cộng nằm giữa số bé nhất và số lớn nhất.'),
      Tip(_w, 'Đếm đúng có bao nhiêu số hạng trước khi chia nhé.'),
    ],
  ),
  (
    ['rút về đơn vị'],
    [
      Tip(_s, 'Bước một: tìm giá trị một phần bằng phép chia.'),
      Tip(_s, 'Bước hai: tìm giá trị nhiều phần bằng phép nhân.'),
      Tip(_t, 'Rút về đơn vị nghĩa là tìm xem một cái thì bao nhiêu.'),
    ],
  ),
  (
    ['dãy số liệu'],
    [
      Tip(_s, 'Đọc dãy số liệu theo thứ tự: số thứ nhất, số thứ hai…'),
      Tip(_t, 'Tìm số lớn nhất, bé nhất trong dãy để so sánh.'),
      Tip(_w, 'Nhớ ghi đơn vị của số liệu nhé.'),
    ],
  ),
  (
    ['biểu đồ cột'],
    [
      Tip(_s, 'Đọc tên biểu đồ, tên các cột, rồi số liệu trên đỉnh mỗi cột.'),
      Tip(_t, 'Cột càng cao thì số liệu càng lớn.'),
      Tip(_w, 'Nhìn kỹ vạch chia bên trái để đọc đúng số.'),
    ],
  ),
  (
    ['số lần xuất hiện'],
    [
      Tip(_s, 'Đếm số lần sự kiện xảy ra trong tất cả các lần thử.'),
      Tip(_t, 'Tổng số lần các kết quả bằng tổng số lần thử.'),
      Tip(_w, 'Mỗi lần thử chỉ ra một kết quả thôi nhé.'),
    ],
  ),
  (
    ['khái niệm phân số'],
    [
      Tip(_s, 'Mẫu số là số phần bằng nhau, tử số là số phần được lấy.'),
      Tip(_t, 'Đọc phân số: tử số rồi “phần” rồi mẫu số, ví dụ ba phần tư.'),
      Tip(_w, 'Các phần phải bằng nhau thì mới viết được phân số.'),
    ],
  ),
  (
    ['phân số và phép chia'],
    [
      Tip(_s, 'a : b = a/b, với b khác 0.'),
      Tip(_t, 'Số tự nhiên nào cũng viết được thành phân số có mẫu số 1.'),
      Tip(_t, 'Phân số có tử số bằng mẫu số thì bằng 1.'),
    ],
  ),
  (
    ['tính chất cơ bản của phân số'],
    [
      Tip(_s, 'Nhân hoặc chia cả tử và mẫu với cùng một số khác 0 thì được phân số bằng nó.'),
      Tip(_w, 'Phải làm với cả tử số và mẫu số, không được quên một bên.'),
      Tip(_t, '1/2 = 2/4 = 3/6 = 4/8.'),
    ],
  ),
  (
    ['rút gọn'],
    [
      Tip(_s, 'Chia cả tử và mẫu cho cùng một số lớn hơn 1, đến khi không chia được nữa.'),
      Tip(_t, 'Thử chia cho 2, 3, 5 trước: dấu hiệu chia hết giúp làm nhanh.'),
      Tip(_w, 'Rút gọn đến phân số tối giản mới xong nhé.'),
    ],
  ),
  (
    ['quy đồng'],
    [
      Tip(_s, 'Tìm mẫu số chung, rồi nhân cả tử và mẫu mỗi phân số với cùng một số.'),
      Tip(_t, 'Nếu mẫu này chia hết cho mẫu kia thì lấy mẫu lớn làm mẫu số chung.'),
      Tip(_w, 'Quy đồng xong, các phân số mới vẫn bằng các phân số cũ.'),
    ],
  ),
  (
    ['so sánh phân số'],
    [
      Tip(_s, 'Cùng mẫu số: tử số lớn hơn thì phân số lớn hơn.'),
      Tip(_t, 'Cùng tử số: mẫu số bé hơn thì phân số lớn hơn.'),
      Tip(_w, 'Khác mẫu số thì quy đồng trước rồi mới so sánh.'),
    ],
  ),
  (
    ['cộng phân số'],
    [
      Tip(_s, 'Cùng mẫu: cộng tử số, giữ nguyên mẫu số.'),
      Tip(_w, 'Khác mẫu thì quy đồng trước nhé.'),
      Tip(_t, 'Cộng xong nhớ rút gọn kết quả.'),
    ],
  ),
  (
    ['trừ phân số'],
    [
      Tip(_s, 'Cùng mẫu: lấy tử trừ tử, giữ nguyên mẫu số.'),
      Tip(_w, 'Khác mẫu thì quy đồng trước nhé.'),
      Tip(_t, 'Trừ xong nhớ rút gọn kết quả.'),
    ],
  ),
  (
    ['nhân phân số'],
    [
      Tip(_s, 'Tử nhân tử, mẫu nhân mẫu.'),
      Tip(_t, 'Có thể rút gọn trước khi nhân cho số nhỏ dễ tính.'),
      Tip(_w, 'Nhân phân số với số tự nhiên: chỉ nhân tử số thôi.'),
    ],
  ),
  (
    ['chia phân số'],
    [
      Tip(_s, 'Chia cho phân số là nhân với phân số đảo ngược.'),
      Tip(_t, 'Đảo ngược phân số: đổi chỗ tử số và mẫu số.'),
      Tip(_w, 'Chỉ đảo ngược phân số thứ hai thôi nhé.'),
    ],
  ),
  (
    ['phân số của một số'],
    [
      Tip(_s, 'Lấy số đó nhân với phân số.'),
      Tip(_t, 'Hoặc chia số đó cho mẫu số rồi nhân với tử số.'),
      Tip(_w, 'Đọc kỹ: phân số của số còn lại hay của cả số ban đầu.'),
    ],
  ),
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
