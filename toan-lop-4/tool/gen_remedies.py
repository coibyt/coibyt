#!/usr/bin/env python3
"""Tranh sửa sai cho Toán 4 → assets/content/remedies.json.

Khi bé làm sai, cô mở một tranh minh hoạ theo DẠNG TOÁN (skillId của bài tập), que chỉ lần lượt vào từng
chỗ trong tranh và giảng lại cách làm, rồi mời bé làm lại.

    python3 tool/gen_remedies.py                                   # ghi remedies.json (kiểm tra đủ mọi dạng toán)
    python3 tool/make_art.py --group remedies --skip-existing      # vẽ tranh (Kie.ai)

Mỗi tranh: tiêu đề (dưới tranh), mô tả cảnh cho Kie.ai (tiếng Anh, bố cục TRÁI / GIỮA / PHẢI, KHÔNG có chữ/số)
và lời cô giảng kèm chỗ cô chỉ (left / center / right / all). Phép tính trong lời cô được kiểm tra lại.
"""
import glob
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "tool"))
import gen_curriculum as G  # noqa: E402

NOTEXT = (" Bright, warm, cheerful picture-book illustration for children, clear composition with the important "
          "objects large and clearly separated. No text, letters, digits or numbers anywhere in the image, no labels "
          "or logos, no user-interface elements, no buttons, no icons, no frames, no close-up faces.")


def R(title, prompt, *lines):
    return {"title": title, "prompt": prompt + NOTEXT, "lines": [{"say": s, "at": a} for a, s in lines]}


REMEDIES = {
    # ---------------- Số ----------------
    "so.pham_vi_100000": R(
        "Đọc số theo từng hàng",
        "A toy shop shelf. LEFT: big boxes of building blocks. CENTER: medium boxes. RIGHT: small single blocks.",
        ("all", "Con nhìn tranh nhé: hộp to, hộp vừa, rồi từng khối nhỏ."),
        ("left", "Mỗi hộp to giống một chục nghìn, hộp vừa giống một nghìn."),
        ("right", "Các khối nhỏ lẻ là hàng chục và hàng đơn vị."),
        ("all", "Đọc số thì đọc từ hàng lớn nhất bên trái sang hàng nhỏ nhất bên phải, ví dụ 23.450 là hai mươi ba nghìn bốn trăm năm mươi."),
    ),
    "so.chan_le": R(
        "Số chẵn, số lẻ: nhìn chữ số tận cùng",
        "A sunny garden washing line. LEFT: colourful socks hung neatly in matching pairs. RIGHT: one lonely sock without a partner at the end of the line.",
        ("left", "Tất xếp thành từng đôi, không thừa chiếc nào: đó là số chẵn."),
        ("right", "Còn thừa một chiếc lẻ loi: đó là số lẻ."),
        ("all", "Con chỉ cần nhìn chữ số tận cùng: 0, 2, 4, 6, 8 là số chẵn; 1, 3, 5, 7, 9 là số lẻ."),
        ("all", "Ví dụ 4.158 tận cùng là 8 nên là số chẵn."),
    ),
    "so.hang_lop": R(
        "Hàng và lớp: ba hàng một lớp",
        "A tall apartment building seen from the front with three clearly separated floors of windows: LEFT block, CENTER block and RIGHT block, each block painted a different pastel colour.",
        ("right", "Lớp đơn vị gồm ba hàng: đơn vị, chục, trăm."),
        ("center", "Lớp nghìn gồm ba hàng: nghìn, chục nghìn, trăm nghìn."),
        ("left", "Lớp triệu gồm ba hàng: triệu, chục triệu, trăm triệu."),
        ("all", "Con tách số thành từng nhóm ba chữ số từ phải sang trái là thấy ngay mỗi chữ số ở hàng nào, lớp nào."),
    ),
    "so.lop_trieu": R(
        "Số lớn đến lớp triệu",
        "A huge football stadium full of spectators seen from above, divided into LEFT, CENTER and RIGHT stands with different seat colours, sunny day.",
        ("all", "Sân vận động có rất nhiều người, phải dùng số lớn đến hàng triệu mới đếm hết."),
        ("left", "Đọc lớp triệu trước, ví dụ 3 triệu."),
        ("center", "Rồi đọc lớp nghìn, ví dụ 250 nghìn."),
        ("right", "Cuối cùng đọc lớp đơn vị, ví dụ 400."),
        ("all", "Vậy 3.250.400 đọc là: ba triệu hai trăm năm mươi nghìn bốn trăm."),
    ),
    "so.lam_tron": R(
        "Làm tròn: lăn về lá cờ gần hơn",
        "A gentle grassy hill. LEFT: a small red flag at the bottom left. RIGHT: a small blue flag at the bottom right. CENTER: a ball resting near the top, slightly to the right of the peak.",
        ("center", "Quả bóng lăn về lá cờ nào gần hơn, số làm tròn về số tròn gần hơn."),
        ("all", "Con nhìn chữ số ngay sau hàng cần làm tròn."),
        ("right", "Nếu chữ số đó là 5, 6, 7, 8, 9 thì làm tròn lên."),
        ("left", "Nếu là 0, 1, 2, 3, 4 thì làm tròn xuống."),
        ("all", "Ví dụ 347.000 làm tròn đến hàng trăm nghìn: chữ số sau là 4, nên được 300.000."),
    ),
    "so.so_sanh": R(
        "So sánh số: đếm chữ số rồi so từng hàng",
        "A playful balance scale on a meadow. LEFT pan: a taller stack of colourful toy blocks, lower down. RIGHT pan: a shorter stack, higher up.",
        ("all", "So sánh hai số, trước hết con đếm xem mỗi số có bao nhiêu chữ số."),
        ("left", "Số nào nhiều chữ số hơn thì số đó lớn hơn."),
        ("right", "Nếu bằng nhau thì so từng hàng, từ trái sang phải."),
        ("all", "Ví dụ 52.310 và 52.130: hàng trăm 3 lớn hơn 1, nên 52.310 > 52.130."),
    ),
    "so.day_so_tu_nhien": R(
        "Dãy số tự nhiên: mỗi bước thêm 1",
        "A long path of round stepping stones over a pond going from LEFT to RIGHT into the distance, a cute frog jumping on the second stone.",
        ("left", "Dãy số tự nhiên bắt đầu từ 0, rồi 1, 2, 3…"),
        ("center", "Hai số liền nhau hơn kém nhau đúng 1 đơn vị."),
        ("right", "Dãy số cứ kéo dài mãi, không có số tự nhiên lớn nhất."),
        ("all", "Muốn tìm số liền sau thì cộng 1, số liền trước thì trừ 1."),
    ),
    # ---------------- Cộng, trừ ----------------
    "cong_tru.pham_vi_100000": R(
        "Cộng, trừ: đặt thẳng hàng rồi tính từ phải sang trái",
        "A bakery counter. LEFT: a big tray of pink cupcakes. RIGHT: a smaller tray of yellow cupcakes. CENTER: an empty cake box waiting.",
        ("left", "Con đặt tính sao cho các chữ số cùng hàng thẳng cột với nhau."),
        ("right", "Tính từ hàng đơn vị, bên phải, rồi sang trái."),
        ("center", "Cộng mà được 10 trở lên thì nhớ 1 sang hàng bên trái."),
        ("all", "Trừ mà không đủ thì mượn 1 ở hàng bên trái, rồi nhớ trả lại nhé."),
    ),
    "cong_tru.nhieu_chu_so": R(
        "Cộng, trừ số nhiều chữ số: nhớ và mượn",
        "Two delivery trucks at a warehouse. LEFT: a truck full of red boxes. RIGHT: a truck full of green boxes. CENTER: a worker stacking boxes into tall neat columns.",
        ("center", "Số nhiều chữ số vẫn làm giống như số nhỏ: đặt thẳng cột."),
        ("left", "Cộng từng hàng từ phải sang trái."),
        ("right", "Hàng nào được 10 trở lên thì viết hàng đơn vị và nhớ 1 sang hàng sau."),
        ("all", "Làm xong, con thử lại: lấy tổng trừ đi một số hạng, phải ra số hạng kia."),
    ),
    "tinh_chat.phep_cong": R(
        "Cộng thuận tiện: ghép thành số tròn",
        "Colourful marbles on a table. LEFT: a small bowl of red marbles. CENTER: a big empty round bowl. RIGHT: a small bowl of blue marbles.",
        ("all", "Đổi chỗ các số hạng thì tổng không thay đổi."),
        ("left", "Con tìm hai số cộng lại được số tròn chục, tròn trăm."),
        ("center", "Gộp chúng vào trước cho dễ, ví dụ 175 + 25 = 200."),
        ("right", "Rồi cộng tiếp số còn lại: 200 + 68 = 268."),
    ),
    "tong_hieu": R(
        "Tổng và hiệu: cắt bỏ phần dài hơn",
        "A craft table. LEFT: a long red ribbon. RIGHT: a shorter yellow ribbon laid parallel to it. CENTER: a pair of scissors.",
        ("left", "Dải dài là số lớn, dải ngắn là số bé."),
        ("center", "Cắt bỏ phần dài hơn chính là bớt đi hiệu, hai dải bằng nhau."),
        ("right", "Số bé bằng tổng trừ hiệu, rồi chia cho 2."),
        ("all", "Số lớn bằng tổng cộng hiệu, rồi chia cho 2. Ví dụ tổng 90, hiệu 30: số lớn là 60, số bé là 30."),
    ),
    # ---------------- Nhân, chia ----------------
    "nhan.1cs": R(
        "Nhân với số có một chữ số",
        "A classroom shelf. LEFT: several identical boxes of crayons in a row. RIGHT: a teacher's hand placing one more identical box.",
        ("left", "Nhân là lấy một số nhiều lần, như nhiều hộp bút giống nhau."),
        ("all", "Con nhân lần lượt từ hàng đơn vị sang trái."),
        ("right", "Tích của hàng nào lớn hơn 9 thì viết hàng đơn vị, nhớ phần chục sang hàng bên trái."),
        ("all", "Ví dụ 1.234 × 3: 4 nhân 3 bằng 12, viết 2 nhớ 1."),
    ),
    "chia.1cs": R(
        "Chia cho số có một chữ số",
        "A pile of colourful candies on the LEFT, and on the RIGHT a row of identical small cups waiting to receive candies equally.",
        ("left", "Chia là chia đều, mỗi phần bằng nhau."),
        ("all", "Con chia từ hàng cao nhất bên trái: chia, nhân, trừ, rồi hạ chữ số tiếp theo."),
        ("right", "Số dư luôn phải bé hơn số chia nhé."),
        ("all", "Làm xong thử lại: thương nhân số chia, cộng số dư, phải bằng số bị chia."),
    ),
    "chia.co_du": R(
        "Phép chia có dư",
        "A table with a pile of oranges. RIGHT: several identical baskets each holding the same small group of oranges. LEFT: a couple of oranges left over beside the pile.",
        ("right", "Chia đều vào các giỏ, mỗi giỏ bằng nhau."),
        ("left", "Còn lại vài quả không đủ chia thêm: đó là số dư."),
        ("all", "Số dư luôn bé hơn số chia. Nếu dư bằng hoặc lớn hơn số chia là con chia chưa hết đấy."),
    ),
    "nhan.2cs": R(
        "Nhân với số có hai chữ số: hai tích riêng",
        "Rows of identical egg trays in a farm shop, arranged in a neat grid: a LEFT group and a RIGHT group of trays.",
        ("left", "Nhân với hàng đơn vị trước, được tích riêng thứ nhất."),
        ("right", "Nhân với hàng chục, được tích riêng thứ hai, viết lùi sang trái một cột."),
        ("all", "Cộng hai tích riêng lại là được tích. Ví dụ 23 × 14 = 92 + 230 = 322."),
    ),
    "chia.2cs": R(
        "Chia cho số có hai chữ số: ước lượng thương",
        "A school library. LEFT: a big pile of books. RIGHT: a row of identical bookshelves, each getting the same number of books.",
        ("left", "Con lấy số bị chia, chia cho số chia có hai chữ số."),
        ("all", "Mẹo: che bớt chữ số hàng đơn vị để ước lượng, ví dụ 96 : 32 thì nghĩ 9 : 3 = 3."),
        ("right", "Nhân thử lại: 32 × 3 = 96, vừa khít."),
        ("all", "Nếu nhân ra lớn quá thì giảm thương đi 1, nhỏ quá thì tăng lên 1."),
    ),
    "nhan_chia.10_100_1000": R(
        "Nhân, chia với 10, 100, 1000",
        "A stationery shelf. LEFT: bundles of pencils tied in groups. CENTER: packs of sticky notes. RIGHT: big boxes of paper clips.",
        ("left", "Nhân với 10, 100, 1000: thêm một, hai, ba chữ số 0 vào bên phải."),
        ("center", "Ví dụ 45 × 100 = 4.500."),
        ("right", "Chia cho 10, 100, 1000: bớt đi một, hai, ba chữ số 0 ở bên phải."),
        ("all", "Ví dụ 7.000 : 1000 = 7."),
    ),
    "tinh_chat.phep_nhan": R(
        "Nhân thuận tiện: ghép thành số tròn",
        "A garden with neat rows of flower pots: LEFT a short row, CENTER a long row, RIGHT a short row.",
        ("all", "Đổi chỗ các thừa số thì tích không thay đổi."),
        ("left", "Con tìm hai số nhân với nhau được số tròn: 2 × 5 = 10, 4 × 25 = 100, 8 × 125 = 1000."),
        ("center", "Nhân hai số đó trước."),
        ("right", "Ví dụ 25 × 37 × 4 = 100 × 37 = 3.700."),
    ),
    "tinh_chat.phan_phoi": R(
        "Nhân một số với một tổng",
        "A fruit stall. LEFT: several identical gift bags each with apples. RIGHT: the same gift bags each with oranges.",
        ("all", "Mỗi túi có táo và cam. Có nhiều túi giống nhau."),
        ("left", "Đếm táo của tất cả các túi trước."),
        ("right", "Rồi đếm cam của tất cả các túi."),
        ("all", "Vậy a × (b + c) = a × b + a × c. Ví dụ 6 × (10 + 3) = 60 + 18 = 78."),
    ),
    "uoc_luong": R(
        "Ước lượng: làm tròn rồi tính nhẩm",
        "A child's shopping basket at a market stall. LEFT: a bunch of bananas. CENTER: the basket. RIGHT: a watermelon.",
        ("left", "Ước lượng là tính gần đúng cho nhanh."),
        ("center", "Con làm tròn từng số đến hàng cao nhất."),
        ("right", "Rồi tính nhẩm. Ví dụ 4.890 + 3.120 khoảng 5.000 + 3.000 = 8.000."),
    ),
    "trung_binh_cong": R(
        "Trung bình cộng: san đều cho bằng nhau",
        "A kitchen counter with three identical glasses of orange juice: LEFT glass nearly full, CENTER glass half full, RIGHT glass almost empty, and a jug.",
        ("left", "Ly nhiều, ly ít: mình rót san cho các ly bằng nhau."),
        ("center", "Lượng nước mỗi ly lúc đó chính là trung bình cộng."),
        ("all", "Cách tính: cộng tất cả các số, rồi chia cho số các số hạng."),
        ("right", "Ví dụ 30, 20, 10: tổng là 60, chia 3 được 20."),
    ),
    "rut_ve_don_vi": R(
        "Rút về đơn vị: tìm một phần trước",
        "A bakery shelf. LEFT: several identical packs of cookies. CENTER: one pack opened to show its cookies. RIGHT: more identical packs.",
        ("left", "Bước một: tìm giá trị của một phần, lấy tổng chia cho số phần."),
        ("center", "Ví dụ 4 gói có 48 cái bánh, một gói có 48 : 4 = 12 cái."),
        ("right", "Bước hai: lấy giá trị một phần nhân với số phần cần tìm."),
        ("all", "Vậy 7 gói có 12 × 7 = 84 cái bánh."),
    ),
    # ---------------- Biểu thức, giải toán ----------------
    "bieu_thuc": R(
        "Thứ tự thực hiện phép tính",
        "A cosy desk. LEFT: a pair of curved brackets made of glowing wooden toy pieces. CENTER: a multiplication-style cross made of sticks. RIGHT: a plus sign made of sticks.",
        ("left", "Trong ngoặc làm trước tiên."),
        ("center", "Rồi đến nhân, chia, làm từ trái sang phải."),
        ("right", "Cuối cùng là cộng, trừ, cũng từ trái sang phải."),
        ("all", "Ví dụ 20 + 5 × 4 = 20 + 20 = 40."),
    ),
    "bieu_thuc_chu": R(
        "Biểu thức chứa chữ: thay chữ bằng số",
        "One single continuous scene of a cosy desk, not split into panels. LEFT: a closed little magic gift box with a sparkle. CENTER: an open magic box with a wooden toy block popping out with sparkles. RIGHT: an open notebook and a pencil.",
        ("left", "Chữ trong biểu thức giống chiếc hộp bí mật, chứa một số."),
        ("center", "Đề cho chữ bằng bao nhiêu thì con thay số đó vào chỗ của chữ."),
        ("right", "Rồi tính như biểu thức bình thường. Ví dụ a + 125 với a = 25: 25 + 125 = 150."),
    ),
    "tim_thanh_phan.so_hang": R(
        "Tìm số hạng chưa biết",
        "A toy box. LEFT: a small pile of red toy cars. RIGHT: a closed gift box. CENTER: a big pile with all the cars together.",
        ("center", "Biết cả tổng số xe, và số xe bên trái."),
        ("right", "Số xe trong hộp bằng tổng trừ đi số hạng đã biết."),
        ("all", "Muốn tìm số hạng, con lấy tổng trừ đi số hạng kia."),
    ),
    "tim_thanh_phan.so_bi_tru": R(
        "Tìm số bị trừ",
        "A cake shop. LEFT: a plate with the remaining cupcakes. RIGHT: a box of cupcakes already sold. CENTER: an empty big tray.",
        ("left", "Số bánh còn lại là hiệu."),
        ("right", "Số bánh đã bán là số trừ."),
        ("center", "Lúc đầu có bao nhiêu? Lấy hiệu cộng với số trừ."),
    ),
    "giai_toan.mot_phep_tinh": R(
        "Giải toán: đọc kĩ hỏi gì",
        "A sunny school yard. LEFT: a child reading a notebook. CENTER: a magnifying glass over a page. RIGHT: a small treasure chest.",
        ("left", "Con đọc thật kĩ đề, gạch dưới cái đã cho."),
        ("center", "Tìm câu hỏi: đề hỏi gì? Thêm vào, gộp lại thì cộng; bớt đi thì trừ; gấp nhiều lần thì nhân; chia đều thì chia."),
        ("right", "Viết lời giải, phép tính và đáp số có đơn vị."),
    ),
    "giai_toan.hai_phep_tinh": R(
        "Giải toán hai bước",
        "A treasure map on a wooden table showing a dotted path with two stepping stones from LEFT to RIGHT leading to a treasure chest.",
        ("left", "Bài toán hai bước: bước một tìm cái chưa biết mà đề chưa hỏi."),
        ("center", "Bước hai dùng kết quả đó để tìm cái đề hỏi."),
        ("right", "Con tự hỏi: muốn tìm đáp số thì cần biết gì trước?"),
        ("all", "Đi từng bước một, không bỏ bước nào nhé."),
    ),
    "giai_toan.ba_phep_tinh": R(
        "Giải toán ba bước",
        "A treasure map on a wooden table showing a dotted path with three stepping stones from LEFT to RIGHT leading to a treasure chest, a compass beside it.",
        ("left", "Bài này có ba bước. Con tóm tắt đề trước."),
        ("center", "Mỗi bước tìm một thứ, ghi rõ lời giải."),
        ("right", "Bước cuối cùng mới ra đáp số."),
        ("all", "Làm xong, con đọc lại câu hỏi xem đã trả lời đúng chưa."),
    ),
    "giai_toan.nhieu_buoc": R(
        "Giải toán nhiều bước: tóm tắt và chia nhỏ",
        "A mountain trail with flags at several stops from LEFT at the bottom to RIGHT at the summit, a small backpack at the start.",
        ("left", "Bài toán dài, con tóm tắt bằng sơ đồ hoặc vài dòng ngắn."),
        ("center", "Chia thành từng bước nhỏ, mỗi bước một phép tính."),
        ("right", "Leo từng chặng là tới đỉnh: phép tính cuối là đáp số."),
        ("all", "Nhớ ghi đơn vị và thử lại kết quả có hợp lí không nhé."),
    ),
    "tu_duy.quy_luat": R(
        "Tìm quy luật",
        "A row of colourful beads on a string from LEFT to RIGHT repeating the same colour pattern, with an empty gap at the RIGHT end.",
        ("left", "Con nhìn vài hạt đầu tiên xem chúng thay đổi thế nào."),
        ("center", "Tìm quy luật: mỗi lần thêm bao nhiêu, gấp lên mấy lần, hay lặp lại?"),
        ("right", "Dùng đúng quy luật đó để tìm chỗ còn trống."),
    ),
    # ---------------- Hình học ----------------
    "hinh_hoc.goc_do": R(
        "Góc nhọn, vuông, tù, bẹt",
        "Four objects on a desk from LEFT to RIGHT: a slice of pizza with a sharp tip, a book corner, an opened folding fan wide open, and a straight ruler lying flat.",
        ("left", "Góc nhọn bé hơn góc vuông, như mũi miếng bánh."),
        ("center", "Góc vuông bằng 90 độ, như góc quyển sách. Góc tù lớn hơn góc vuông, như chiếc quạt mở rộng."),
        ("right", "Góc bẹt bằng 180 độ, hai cạnh thẳng hàng như cây thước."),
        ("all", "Đo góc: đặt tâm thước đo góc trùng đỉnh, một cạnh qua vạch 0, rồi đọc số trên vòng số đó."),
    ),
    "hinh_hoc.vuong_goc_song_song": R(
        "Vuông góc và song song",
        "A city seen from above. LEFT: two straight streets crossing each other at a perfect corner. RIGHT: two straight railway tracks running side by side through green rice fields.",
        ("left", "Hai đường thẳng cắt nhau tạo thành bốn góc vuông: đó là hai đường vuông góc."),
        ("right", "Hai đường thẳng đi cạnh nhau mãi mà không bao giờ gặp nhau: đó là hai đường song song."),
        ("all", "Muốn kiểm tra góc vuông, con dùng ê ke đặt vào góc nhé."),
    ),
    "hinh_hoc.binh_hanh_thoi": R(
        "Hình bình hành và hình thoi",
        "A park. LEFT: a slanted garden bench with a parallelogram-shaped seat. RIGHT: a colourful diamond-shaped kite flying in the sky.",
        ("left", "Hình bình hành có hai cặp cạnh đối song song và bằng nhau."),
        ("right", "Hình thoi cũng có hai cặp cạnh đối song song, và cả bốn cạnh bằng nhau."),
        ("all", "Hình thoi không có góc vuông; có góc vuông là hình vuông rồi đấy."),
    ),
    "hinh_hoc.chu_vi": R(
        "Chu vi: đi một vòng quanh hình",
        "A rectangular garden with a low wooden fence seen from above, a cute puppy walking along the fence: LEFT side, CENTER top, RIGHT side.",
        ("left", "Chu vi là độ dài đường đi quanh hình một vòng."),
        ("center", "Hình chữ nhật: chu vi bằng chiều dài cộng chiều rộng, rồi nhân 2."),
        ("right", "Hình vuông: chu vi bằng cạnh nhân 4."),
        ("all", "Nhớ đổi về cùng một đơn vị đo trước khi tính."),
    ),
    "hinh_hoc.dien_tich": R(
        "Diện tích: lát kín bằng ô vuông",
        "A sunny room floor being covered with large square tiles. LEFT: rows of tiles already laid. RIGHT: a stack of identical square tiles.",
        ("left", "Diện tích là phần mặt phẳng hình chiếm, giống số viên gạch lát kín sàn."),
        ("all", "Hình chữ nhật: diện tích bằng chiều dài nhân chiều rộng."),
        ("right", "Hình vuông: diện tích bằng cạnh nhân cạnh. Đơn vị là xăng-ti-mét vuông, mét vuông…"),
    ),
    # ---------------- Đo lường ----------------
    "do_luong.yen_ta_tan": R(
        "Yến, tạ, tấn: mỗi đơn vị gấp 10 lần",
        "A rice warehouse. LEFT: a small sack of rice. CENTER: a much bigger sack. RIGHT: a truck fully loaded with sacks.",
        ("left", "1 yến bằng 10 ki-lô-gam."),
        ("center", "1 tạ bằng 10 yến, bằng 100 ki-lô-gam."),
        ("right", "1 tấn bằng 10 tạ, bằng 1000 ki-lô-gam."),
        ("all", "Đổi từ đơn vị lớn ra nhỏ thì nhân; từ nhỏ ra lớn thì chia. Ví dụ 3 tạ = 300 ki-lô-gam."),
    ),
    "do_luong.dien_tich": R(
        "Đơn vị đo diện tích",
        "A craft table. LEFT: a tiny square sticker. CENTER: a square notepad sheet. RIGHT: a large square floor mat.",
        ("left", "Mi-li-mét vuông rất nhỏ, như một chấm nhỏ."),
        ("center", "1 đề-xi-mét vuông bằng 100 xăng-ti-mét vuông."),
        ("right", "1 mét vuông bằng 100 đề-xi-mét vuông."),
        ("all", "Đơn vị diện tích liền nhau gấp nhau 100 lần, con nhớ nhé."),
    ),
    "thoi_gian.giay_the_ki": R(
        "Giây và thế kỉ",
        "LEFT: a stopwatch on a running track. RIGHT: an ancient stone temple gate under a big old banyan tree.",
        ("left", "1 phút bằng 60 giây. Giây rất ngắn, như một tiếng tích tắc."),
        ("right", "1 thế kỉ bằng 100 năm, rất dài."),
        ("all", "Đổi phút ra giây thì nhân 60. Ví dụ 2 phút 15 giây = 120 + 15 = 135 giây."),
    ),
    # ---------------- Thống kê, xác suất ----------------
    "thong_ke.day_so_lieu": R(
        "Dãy số liệu",
        "A classroom wall with a colourful height chart and several children's height marks, a measuring tape hanging on the LEFT, a notebook on the RIGHT.",
        ("left", "Mỗi lần đo được một số liệu, mình ghi lại thành một dãy."),
        ("right", "Số thứ nhất, số thứ hai… đếm theo thứ tự từ trái sang phải."),
        ("all", "Muốn tìm số lớn nhất, bé nhất, con so lần lượt từng số trong dãy."),
    ),
    "thong_ke.bieu_do_cot": R(
        "Biểu đồ cột",
        "A colourful bar chart built from stacked toy blocks on a table: LEFT a short stack, CENTER a tall stack, RIGHT a medium stack.",
        ("center", "Cột càng cao, số lượng càng nhiều."),
        ("left", "Cột thấp nhất là ít nhất."),
        ("right", "Muốn đọc số, con nhìn đỉnh cột rồi gióng sang trục số bên cạnh."),
        ("all", "So sánh hai cột thì lấy số lớn trừ số bé."),
    ),
    "xac_suat.so_lan": R(
        "Số lần xuất hiện",
        "A game table. LEFT: a coin spinning in the air. CENTER: a dice. RIGHT: a tally sheet with stroke marks drawn as simple lines.",
        ("left", "Mỗi lần tung, mình xem kết quả là mặt nào."),
        ("right", "Mỗi lần ra mặt đó, con vạch thêm một vạch."),
        ("all", "Đếm số vạch là ra số lần xuất hiện của sự kiện đó."),
    ),
    # ---------------- Phân số ----------------
    "phan_so.khai_niem": R(
        "Phân số: tử số và mẫu số",
        "A wooden table. LEFT: a round pizza cut into equal slices. RIGHT: a plate holding a few of those slices.",
        ("left", "Cái bánh được chia thành các phần bằng nhau: số phần bằng nhau là mẫu số, viết ở dưới."),
        ("right", "Số phần đã lấy ra là tử số, viết ở trên."),
        ("all", "Ví dụ chia 8 phần, lấy 3 phần: ba phần tám, viết là 3/8."),
    ),
    "phan_so.phep_chia": R(
        "Phép chia viết thành phân số",
        "A birthday party table. LEFT: a few cakes. RIGHT: several children's plates arranged in a row, each getting an equal share.",
        ("left", "Chia đều mấy cái bánh cho mấy bạn."),
        ("right", "Mỗi bạn được một phân số: số bánh là tử số, số bạn là mẫu số."),
        ("all", "Ví dụ 3 cái bánh chia đều cho 4 bạn, mỗi bạn được 3/4 cái bánh."),
    ),
    "phan_so.tinh_chat": R(
        "Tính chất cơ bản của phân số",
        "Two identical chocolate bars side by side: LEFT bar broken into a few big equal pieces, RIGHT bar broken into many small equal pieces.",
        ("left", "Hai thanh sô-cô-la bằng nhau, chia khác nhau."),
        ("right", "Chia nhỏ gấp đôi thì số phần cũng gấp đôi, lượng ăn vẫn như nhau."),
        ("all", "Nhân hoặc chia cả tử số và mẫu số cho cùng một số khác 0, được phân số bằng nó. Ví dụ 1/2 = 2/4."),
    ),
    "phan_so.rut_gon": R(
        "Rút gọn phân số",
        "A kitchen counter. LEFT: a cake cut into many small equal pieces. RIGHT: an identical cake cut into a few big equal pieces.",
        ("left", "Rút gọn là đổi về phân số có số nhỏ hơn mà vẫn bằng nhau."),
        ("all", "Con tìm một số mà cả tử số và mẫu số đều chia hết, rồi chia cả hai."),
        ("right", "Chia đến khi không chia được nữa. Ví dụ 6/8 = 3/4."),
    ),
    "phan_so.quy_dong": R(
        "Quy đồng mẫu số",
        "Two identical round cakes. LEFT: cut into a few equal slices. RIGHT: cut into twice as many equal slices. CENTER: a cake knife.",
        ("left", "Hai phân số khác mẫu số thì khó so và khó cộng."),
        ("center", "Quy đồng là cắt bánh cho số phần bằng nhau."),
        ("right", "Nhân cả tử và mẫu với cùng một số để được mẫu số chung. Ví dụ 1/2 = 2/4, để cùng mẫu với 3/4."),
    ),
    "phan_so.so_sanh": R(
        "So sánh phân số",
        "Two identical cakes on a balance scale. LEFT: a big share of cake. RIGHT: a smaller share of the same cake.",
        ("all", "Cùng mẫu số: phân số nào có tử số lớn hơn thì lớn hơn."),
        ("left", "Ví dụ 4/5 lớn hơn 1/5."),
        ("right", "Khác mẫu số thì quy đồng trước, rồi mới so tử số."),
    ),
    "phan_so.cong": R(
        "Cộng phân số",
        "A kitchen. LEFT: a partly filled measuring cup of orange juice. CENTER: an empty jug. RIGHT: another partly filled measuring cup.",
        ("left", "Cùng mẫu số: cộng hai tử số, giữ nguyên mẫu số."),
        ("center", "Ví dụ 2/7 + 3/7 = 5/7."),
        ("right", "Khác mẫu số: quy đồng trước rồi mới cộng. Nhớ: không cộng hai mẫu số nhé!"),
    ),
    "phan_so.tru": R(
        "Trừ phân số",
        "A table. LEFT: a big piece of a cake on a plate. RIGHT: a child's fork taking away part of it.",
        ("left", "Cùng mẫu số: lấy tử số trừ tử số, giữ nguyên mẫu số."),
        ("right", "Ví dụ 7/9 − 4/9 = 3/9 = 1/3."),
        ("all", "Khác mẫu số thì quy đồng trước. Có thể rút gọn kết quả nhé."),
    ),
    "phan_so.nhan": R(
        "Nhân phân số",
        "A craft table. LEFT: a ribbon. CENTER: scissors. RIGHT: several equal pieces of ribbon laid in a row.",
        ("left", "Nhân hai phân số: tử nhân tử, mẫu nhân mẫu."),
        ("center", "Ví dụ 2/3 × 4/5 = 8/15."),
        ("right", "Nhân phân số với số tự nhiên: lấy tử số nhân với số đó, giữ mẫu số. Ví dụ 4/5 × 7 = 28/5."),
    ),
    "phan_so.chia": R(
        "Chia phân số: nhân với phân số đảo ngược",
        "A playful scene. LEFT: a card flipping over in the air with a sparkle. RIGHT: a cake shared into equal portions on plates.",
        ("left", "Phân số đảo ngược: đổi chỗ tử số và mẫu số, ví dụ 2/3 đảo thành 3/2."),
        ("right", "Chia cho một phân số là nhân với phân số đảo ngược của nó."),
        ("all", "Ví dụ 1/2 : 1/4 = 1/2 × 4/1 = 4/2 = 2."),
    ),
    "phan_so.cua_mot_so": R(
        "Tìm phân số của một số",
        "A market stall. LEFT: a basket of oranges. RIGHT: a smaller bowl with some of the oranges set apart.",
        ("left", "Tìm 2/3 của 12 quả cam: chia 12 thành 3 phần bằng nhau, mỗi phần 4 quả."),
        ("right", "Lấy 2 phần: 4 × 2 = 8 quả."),
        ("all", "Cách nhanh: lấy số đó nhân với phân số, 12 × 2/3 = 8."),
    ),
}

# Kiểm tra lại các phép tính viết trong lời cô ("a + b = c", "a × b = c", "a : b = c").
EQ = re.compile(r"(\d[\d.]*)\s*([+×:−-])\s*(\d[\d.]*)\s*=\s*(\d[\d.]*)(?!\s*[+×:−/-]|\d|/)")


def check(say):
    for m in EQ.finditer(say):
        a, op, b, c = (m.group(i) for i in range(1, 5))
        if any("/" in say[max(0, m.start() - 2):m.end() + 2] for _ in [0]):
            continue
        n = lambda s: int(s.replace(".", ""))  # noqa: E731
        a, b, c = n(a), n(b), n(c)
        r = {"+": a + b, "×": a * b, ":": a / b if b else None, "−": a - b, "-": a - b}[op]
        if r != c:
            raise SystemExit(f"Sai phép tính trong lời cô: {say}")


def skills():
    out = set()
    for f in glob.glob(str(ROOT / "assets/content/lessons/*.json")):
        for p in json.load(open(f, encoding="utf-8"))["problems"]:
            out.update(p.get("skillIds", []))
    return out


def main():
    missing = sorted(skills() - REMEDIES.keys())
    if missing:
        raise SystemExit(f"Thiếu tranh sửa sai cho dạng toán: {missing}")
    for r in REMEDIES.values():
        for l in r["lines"]:
            assert l["at"] in ("left", "center", "right", "all"), l
            check(l["say"])
    G.dump(G.CONTENT / "remedies.json", REMEDIES)
    print(f"OK {len(REMEDIES)} tranh sửa sai")


if __name__ == "__main__":
    main()
