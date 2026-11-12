#!/usr/bin/env python3
"""Ví dụ trong cuộc sống cho Toán 4 → assets/content/examples.json.

    python3 tool/gen_examples.py          # ghi examples.json (kiểm tra mã bài có trong catalog)
    python3 tool/make_art.py --group examples --skip-existing   # vẽ tranh (Kie.ai)

Mỗi ví dụ: tiêu đề (dưới tranh), mô tả cảnh cho Kie.ai (tiếng Anh, đếm được, KHÔNG có chữ/số trong tranh)
và lời cô giảng kèm chỗ cô chỉ (left / center / right / all). Mọi phép tính trong lời cô được kiểm tra lại.
"""
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "tool"))
import gen_curriculum as G  # noqa: E402

NOTEXT = (" Bright, friendly, realistic illustration style. No text, letters, digits or numbers anywhere in the image, "
          "no labels or logos on products, no user-interface elements, no buttons, no icons, no frames.")


def X(title, prompt, *lines):
    return {"title": title, "prompt": prompt + NOTEXT, "lines": [{"say": s, "at": a} for a, s in lines]}


EX = {
    "c1.on-tap-cac-so-den-100000": [
        X("Xe chở gạch: đọc số có năm chữ số",
          "A Vietnamese construction site. LEFT: a big truck loaded with neat pallets of red bricks. RIGHT: a worker in a yellow helmet seen from behind checking a clipboard. Sunny day.",
          ("left", "Xe tải chở 23.450 viên gạch."), ("all", "Số 23.450 gồm 2 chục nghìn, 3 nghìn, 4 trăm, 5 chục và 0 đơn vị."),
          ("right", "Đọc là: hai mươi ba nghìn bốn trăm năm mươi."))],
    "c1.on-tap-cac-phep-tinh-pham-vi-100000": [
        X("Hai kho sách: cộng trong phạm vi 100 000",
          "Inside a big library storeroom. LEFT: tall shelves full of blue books. RIGHT: tall shelves full of orange books. A librarian cart in the middle.",
          ("left", "Kho bên trái có 35.200 quyển sách xanh."), ("right", "Kho bên phải có 28.600 quyển sách cam."),
          ("all", "Cả hai kho có: 35.200 + 28.600 = 63.800 quyển sách."))],
    "c1.so-chan-so-le": [
        X("Số nhà chẵn, số nhà lẻ",
          "A tidy Vietnamese residential street seen from the middle of the road. LEFT side: a row of colourful town houses. RIGHT side: another row of colourful town houses facing them. Trees and motorbikes.",
          ("left", "Dãy nhà bên trái mang số lẻ: 1, 3, 5, 7."), ("right", "Dãy nhà bên phải mang số chẵn: 2, 4, 6, 8."),
          ("all", "Hai nhà liền nhau cùng một bên đường hơn kém nhau 2 số."))],
    "c1.bieu-thuc-chua-chu": [
        X("Hàng rào hình vuông: chu vi P = a × 4",
          "A square vegetable garden in a Vietnamese backyard surrounded by a low wooden fence, seen from above. LEFT corner: a child holding a measuring tape along one side.",
          ("left", "Mỗi cạnh vườn dài a mét."), ("all", "Chu vi vườn là P = a × 4."),
          ("all", "Nếu a = 9 thì P = 9 × 4 = 36 mét rào."))],
    "c1.giai-bai-toan-co-ba-buoc-tinh": [
        X("Đi mua đồ dùng học tập: ba bước tính",
          "A Vietnamese stationery shop counter. LEFT: exactly 3 notebooks stacked. RIGHT: exactly 2 pens in a small tray. A child's hand holding a folded banknote in the center.",
          ("left", "Lan mua 3 quyển vở, mỗi quyển 8.000 đồng: 8.000 × 3 = 24.000 đồng."),
          ("right", "Mua 2 chiếc bút, mỗi chiếc 5.000 đồng: 5.000 × 2 = 10.000 đồng."),
          ("center", "Lan đưa 50.000 đồng, còn lại: 50.000 - 24.000 - 10.000 = 16.000 đồng."))],
    "c1.luyen-tap-chung": [
        X("Chợ hoa ngày Tết",
          "A colourful Vietnamese Tet flower market. LEFT: rows of yellow apricot blossom pots. RIGHT: rows of pink peach blossom pots. Festive red lanterns.",
          ("left", "Chợ có 1.250 chậu mai."), ("right", "Số chậu đào nhiều hơn số chậu mai 340 chậu: 1.250 + 340 = 1.590 chậu."),
          ("all", "Cả hai loại có: 1.250 + 1.590 = 2.840 chậu hoa."))],
    "c2.do-goc-don-vi-do-goc": [
        X("Đo góc mở của chiếc quạt",
          "A beautiful paper folding fan opened partly on a desk, with a transparent semicircular protractor placed at its pivot. RIGHT: a pencil and notebook.",
          ("all", "Cô đặt tâm thước đo góc trùng với đinh của chiếc quạt."), ("left", "Một nan quạt đi qua vạch 0."),
          ("right", "Nan còn lại chỉ vạch 120. Góc mở của quạt là 120 độ."))],
    "c2.goc-nhon-goc-tu-goc-bet": [
        X("Kéo, quạt và cánh cửa: góc nhọn, góc tù, góc bẹt",
          "A bright classroom craft table. LEFT: a pair of scissors opened slightly. CENTER: a door of a cabinet opened wide. RIGHT: a long ruler lying flat and straight.",
          ("left", "Lưỡi kéo mở hẹp tạo thành góc nhọn, bé hơn góc vuông."),
          ("center", "Cánh tủ mở rộng tạo thành góc tù, lớn hơn góc vuông."),
          ("right", "Hai nửa thước thẳng hàng tạo thành góc bẹt, bằng 180 độ."))],
    "c2.luyen-tap-chung": [
        X("Kim đồng hồ tạo thành góc",
          "Three round wall clocks side by side on a pastel wall, each with clear hands and no numbers. LEFT clock: hands at three o'clock position. CENTER clock: hands at six o'clock position. RIGHT clock: hands at one o'clock position.",
          ("left", "Lúc 3 giờ, hai kim tạo thành góc vuông."), ("center", "Lúc 6 giờ, hai kim tạo thành góc bẹt."),
          ("right", "Lúc 1 giờ, hai kim tạo thành góc nhọn."))],
    "c3.so-co-sau-chu-so-so-1000000": [
        X("Sân vận động: một trăm nghìn chỗ ngồi",
          "A huge modern football stadium seen from high above, filled with colourful seats in neat sections, green pitch in the middle.",
          ("all", "Một sân vận động lớn có thể có khoảng 100.000 chỗ ngồi."),
          ("all", "10 sân như thế có 1.000.000 chỗ ngồi, đọc là một triệu."))],
    "c3.hang-va-lop": [
        X("Dân số một thành phố: hàng và lớp",
          "A panoramic view of a busy modern Vietnamese city at sunset with many buildings, bridges and a river.",
          ("all", "Một thành phố có 2.345.678 người."),
          ("all", "Lớp triệu là 2, lớp nghìn là 345, lớp đơn vị là 678."),
          ("all", "Đọc là: hai triệu ba trăm bốn mươi lăm nghìn sáu trăm bảy mươi tám."))],
    "c3.cac-so-trong-pham-vi-lop-trieu": [
        X("Số tiền xây thư viện",
          "A brand-new bright school library building with big windows in a Vietnamese school yard, workers finishing the garden. ",
          ("all", "Xây thư viện hết 850.000.000 đồng."), ("all", "Đọc là: tám trăm năm mươi triệu đồng."))],
    "c3.lam-tron-so-den-hang-tram-nghin": [
        X("Làm tròn số khán giả",
          "A large outdoor music festival crowd seen from behind the stage at dusk, colourful lights, many people.",
          ("all", "Lễ hội có 1.468.000 lượt khách."), ("all", "Chữ số hàng chục nghìn là 6, lớn hơn 5 nên làm tròn lên."),
          ("all", "Làm tròn đến hàng trăm nghìn: khoảng 1.500.000 lượt khách."))],
    "c3.so-sanh-cac-so-co-nhieu-chu-so": [
        X("So sánh dân số hai tỉnh",
          "Two Vietnamese provincial landscapes side by side. LEFT: a coastal town with fishing boats. RIGHT: a mountain town with terraced rice fields.",
          ("left", "Tỉnh ven biển có 1.230.000 người."), ("right", "Tỉnh miền núi có 987.000 người."),
          ("all", "Số có 7 chữ số lớn hơn số có 6 chữ số, nên tỉnh ven biển đông dân hơn."))],
    "c3.lam-quen-voi-day-so-tu-nhien": [
        X("Bậc thang đánh số",
          "A long outdoor stone staircase climbing a green hill to a temple, with many steps going up into the distance, sunny.",
          ("all", "Các bậc thang được đánh số 0, 1, 2, 3, … như dãy số tự nhiên."),
          ("all", "Bậc sau hơn bậc trước 1 đơn vị, và cứ thế kéo dài mãi."))],
    "c3.luyen-tap-chung": [
        X("Chuyến bay và số khách",
          "A busy Vietnamese airport terminal with large windows, planes outside and travellers with suitcases.",
          ("all", "Một năm sân bay đón 25.800.000 lượt khách."), ("all", "Làm tròn đến hàng triệu: khoảng 26.000.000 lượt khách."))],
    "c4.yen-ta-tan": [
        X("Cân lúa ở hợp tác xã",
          "A Vietnamese rice cooperative. LEFT: exactly 5 sacks of rice on a big platform scale. RIGHT: a large truck being loaded with many sacks of rice.",
          ("left", "Mỗi bao lúa nặng 50 kg, tức là 5 yến."), ("left", "5 bao nặng 250 kg, bằng 2 tạ 50 kg."),
          ("right", "Xe tải chở được 3 tấn, tức là 3.000 kg lúa."))],
    "c4.de-xi-met-vuong-met-vuong-mi-li-met-vuong": [
        X("Lát nền phòng học",
          "A sunny classroom floor being covered with large square ceramic tiles, a few tiles stacked in the corner, a measuring tape lying on the floor.",
          ("all", "Mỗi viên gạch là hình vuông cạnh 5 dm, diện tích 25 dm²."),
          ("all", "4 viên gạch như thế lát được 100 dm², tức là 1 m²."))],
    "c4.giay-the-ki": [
        X("Chạy 60 mét và cây đa trăm tuổi",
          "LEFT: children running a race on a school track with a teacher holding a stopwatch. RIGHT: a giant ancient banyan tree in a Vietnamese village.",
          ("left", "Bạn Nam chạy 60 m hết 12 giây."), ("right", "Cây đa đầu làng đã hơn 100 năm tuổi, tức là hơn một thế kỉ."))],
    "c4.thuc-hanh-su-dung-don-vi-do-dai-luong": [
        X("Ước lượng ở siêu thị",
          "A Vietnamese supermarket aisle. LEFT: big sacks of rice stacked. CENTER: watermelons on a scale. RIGHT: a family looking at a floor mat display.",
          ("left", "Một bao gạo lớn nặng khoảng 5 yến."), ("center", "Một quả dưa hấu nặng khoảng 4 kg."),
          ("right", "Một tấm thảm nhỏ rộng khoảng 2 m²."))],
    "c4.luyen-tap-chung": [
        X("Con voi và chiếc xe tải",
          "A gentle Asian elephant standing beside a small truck at a wildlife sanctuary in Vietnam, green forest background.",
          ("all", "Chú voi nặng 4 tấn 200 kg, tức là 4.200 kg."), ("all", "Xe tải nhỏ nặng 2 tấn: voi nặng hơn xe 2.200 kg."))],
    "c5.phep-cong-cac-so-co-nhieu-chu-so": [
        X("Hai đợt trồng cây",
          "A green hillside reforestation project. LEFT: rows of young saplings freshly planted. RIGHT: volunteers planting more saplings.",
          ("left", "Đợt một trồng được 125.430 cây."), ("right", "Đợt hai trồng được 98.570 cây."),
          ("all", "Cả hai đợt: 125.430 + 98.570 = 224.000 cây."))],
    "c5.phep-tru-cac-so-co-nhieu-chu-so": [
        X("Kho gạo xuất hàng",
          "A big rice warehouse. LEFT: huge stacks of rice sacks. RIGHT: trucks driving away loaded with sacks.",
          ("left", "Kho có 350.000 kg gạo."), ("right", "Đã xuất đi 128.500 kg."),
          ("all", "Kho còn lại: 350.000 - 128.500 = 221.500 kg gạo."))],
    "c5.tinh-chat-giao-hoan-ket-hop-phep-cong": [
        X("Gom bi cho nhanh",
          "Three glass bowls of colourful marbles on a wooden table. LEFT bowl: many blue marbles. CENTER bowl: many green marbles. RIGHT bowl: many red marbles.",
          ("left", "Bát xanh có 125 viên, bát đỏ có 75 viên: gộp hai bát được tròn 200 viên."),
          ("center", "Bát xanh lá có 348 viên."), ("all", "125 + 348 + 75 = (125 + 75) + 348 = 548 viên."))],
    "c5.tim-hai-so-biet-tong-va-hieu": [
        X("Hai lớp quyên góp sách",
          "A school book donation corner. LEFT: a tall stack of books with a blue ribbon. RIGHT: a shorter stack of books with a red ribbon.",
          ("all", "Hai lớp góp được 90 quyển, lớp 4A góp nhiều hơn lớp 4B 10 quyển."),
          ("left", "Lớp 4A: (90 + 10) : 2 = 50 quyển."), ("right", "Lớp 4B: 90 - 50 = 40 quyển."))],
    "c5.luyen-tap-chung": [
        X("Hai cây cầu",
          "Two long bridges crossing a wide river in Vietnam. LEFT: a longer cable-stayed bridge. RIGHT: a shorter arch bridge. Boats on the river.",
          ("left", "Cầu dây văng dài 1.420 m."), ("right", "Cầu vòm ngắn hơn 385 m: 1.420 - 385 = 1.035 m."))],
    "c6.hai-duong-thang-vuong-goc": [
        X("Ngã tư vuông góc",
          "A bird's-eye view of a tidy crossroads where two straight streets cross at a perfect right angle, tiny cars, trees and zebra crossings.",
          ("all", "Hai con đường cắt nhau tạo thành bốn góc vuông."), ("all", "Hai con đường này vuông góc với nhau."))],
    "c6.thuc-hanh-ve-hai-duong-thang-vuong-goc": [
        X("Vẽ bằng ê ke",
          "A student's desk with a sheet of paper, a set square aligned with a pencil line and a pencil drawing a second line, close-up.",
          ("left", "Đặt một cạnh góc vuông của ê ke trùng với đường thẳng đã có."),
          ("right", "Vẽ theo cạnh còn lại, ta được đường thẳng vuông góc."))],
    "c6.hai-duong-thang-song-song": [
        X("Đường ray tàu hoả",
          "Two straight railway tracks running side by side through green rice fields towards the horizon, a train far away, sunny.",
          ("all", "Hai thanh ray luôn cách đều nhau và không bao giờ cắt nhau."), ("all", "Hai thanh ray là hình ảnh hai đường thẳng song song."))],
    "c6.thuc-hanh-ve-hai-duong-thang-song-song": [
        X("Kẻ vở ô li",
          "An open Vietnamese school notebook with neat horizontal ruled lines, a ruler and pencil resting on it.",
          ("all", "Các dòng kẻ trong vở song song với nhau."), ("all", "Con dùng thước và ê ke để kẻ đường song song cho đẹp nhé."))],
    "c6.hinh-binh-hanh-hinh-thoi": [
        X("Con diều hình thoi",
          "Children flying kites in a park. LEFT: a colourful rhombus-shaped kite. RIGHT: a slanted parallelogram-shaped wooden bench.",
          ("left", "Con diều có bốn cạnh bằng nhau, đó là hình thoi."), ("right", "Mặt ghế có hai cặp cạnh đối song song và bằng nhau, đó là hình bình hành."))],
    "c6.luyen-tap-chung": [
        X("Cửa sổ và song cửa",
          "A Vietnamese house window with straight vertical iron bars and a horizontal frame, potted flowers on the sill.",
          ("all", "Các song cửa đứng song song với nhau."), ("all", "Song cửa đứng vuông góc với thanh ngang của khung cửa."))],
    "c7.on-tap-cac-so-den-lop-trieu": [
        X("Doanh thu cửa hàng",
          "A busy modern Vietnamese bookstore with customers and a cashier counter.",
          ("all", "Một tháng cửa hàng bán được 125.600.000 đồng."), ("all", "Đọc là: một trăm hai mươi lăm triệu sáu trăm nghìn đồng."))],
    "c7.on-tap-phep-cong-phep-tru": [
        X("Hai đội thu gom giấy",
          "A school recycling drive. LEFT: a big pile of bundled paper. RIGHT: a smaller pile of bundled paper.",
          ("left", "Đội A thu được 1.350 kg giấy."), ("right", "Đội B thu được 980 kg giấy."),
          ("all", "Cả hai đội: 1.350 + 980 = 2.330 kg; đội A hơn đội B 370 kg."))],
    "c7.on-tap-hinh-hoc": [
        X("Sân trường nhiều hình",
          "A school yard seen from above: a rectangular basketball court, a rhombus-patterned tile path and parallel painted lines on a running track.",
          ("left", "Sân bóng rổ là hình chữ nhật, có các cạnh đối song song."), ("center", "Lối đi lát gạch hình thoi."),
          ("right", "Các làn chạy song song với nhau."))],
    "c7.on-tap-do-luong": [
        X("Hội chợ nông sản",
          "A rural Vietnamese produce fair. LEFT: sacks of rice on a scale. RIGHT: a farmer showing a rectangular vegetable plot.",
          ("left", "Bác Hai bán được 3 tạ gạo, tức là 300 kg."), ("right", "Mảnh vườn rộng 50 m², bằng 5.000 dm²."))],
    "c7.on-tap-chung": [
        X("Chuyến tham quan cuối kì",
          "Several tour buses parked in front of a museum in Vietnam, pupils in uniforms lining up.",
          ("all", "Có 4 xe, mỗi xe chở 45 bạn: 45 × 4 = 180 bạn."), ("all", "Vé vào cửa 25.000 đồng mỗi bạn."))],
    "c8.nhan-voi-so-co-mot-chu-so": [
        X("Thùng sữa ở siêu thị",
          "A supermarket shelf with exactly 4 large identical plain white cardboard cartons of milk boxes with a simple cow-spot pattern and no writing, neatly stacked.",
          ("all", "Mỗi thùng có 48 hộp sữa."), ("all", "4 thùng có: 48 × 4 = 192 hộp sữa."))],
    "c8.chia-cho-so-co-mot-chu-so": [
        X("Chia đều sách cho các lớp",
          "A school library table with many new books being sorted into exactly 6 equal piles.",
          ("all", "Có 1.242 quyển sách chia đều cho 6 lớp."), ("all", "Mỗi lớp được: 1.242 : 6 = 207 quyển."))],
    "c8.tinh-chat-giao-hoan-ket-hop-phep-nhan": [
        X("Hộp trứng tính nhanh",
          "A farm shop counter with egg trays stacked in neat piles, each tray full of brown eggs.",
          ("all", "Có 4 chồng, mỗi chồng 25 khay, mỗi khay 30 quả."),
          ("all", "Tính nhanh: 25 × 4 × 30 = 100 × 30 = 3.000 quả trứng."))],
    "c8.nhan-chia-voi-10-100-1000": [
        X("Bút chì bó mười, hộp trăm",
          "A stationery warehouse shelf. LEFT: bundles of ten pencils tied with rubber bands. RIGHT: closed boxes each holding many pencils.",
          ("left", "Mỗi bó 10 bút: 35 bó có 35 × 10 = 350 bút."), ("right", "Mỗi hộp 100 bút: 12 hộp có 12 × 100 = 1.200 bút."))],
    "c8.tinh-chat-phan-phoi": [
        X("Mua vở và bút cho cả tổ",
          "A school supplies shop: LEFT a pile of notebooks, RIGHT a pile of pens, a group of children at the counter.",
          ("all", "Mỗi bạn mua 1 vở giá 9.000 đồng và 1 bút giá 6.000 đồng, tổ có 8 bạn."),
          ("all", "8 × (9.000 + 6.000) = 8 × 9.000 + 8 × 6.000 = 120.000 đồng."))],
    "c8.nhan-voi-so-co-hai-chu-so": [
        X("Xe khách đưa học sinh",
          "A row of identical coaches parked in front of a Vietnamese primary school, pupils in uniforms waiting.",
          ("all", "Mỗi xe có 45 chỗ, có 12 xe."), ("all", "Số chỗ ngồi: 45 × 12 = 540 chỗ."))],
    "c8.chia-cho-so-co-hai-chu-so": [
        X("Xếp trứng vào khay",
          "A farm table with a big basket of eggs and many empty egg trays being filled.",
          ("all", "Có 720 quả trứng, mỗi khay xếp 30 quả."), ("all", "Xếp được: 720 : 30 = 24 khay."))],
    "c8.thuc-hanh-uoc-luong-trong-tinh-toan": [
        X("Ước lượng tiền đi chợ",
          "A Vietnamese market stall with fruit. A shopping basket with exactly 3 bags of oranges.",
          ("all", "Mỗi túi cam giá 29.000 đồng, mua 3 túi."), ("all", "Làm tròn 29.000 thành 30.000: khoảng 30.000 × 3 = 90.000 đồng."))],
    "c8.tim-so-trung-binh-cong": [
        X("Ba cốc nước cam",
          "Three glasses of orange juice on a kitchen counter. LEFT glass: a little juice. CENTER glass: almost full. RIGHT glass: half full.",
          ("left", "Cốc trái có 100 ml."), ("center", "Cốc giữa có 260 ml."), ("right", "Cốc phải có 180 ml."),
          ("all", "Trung bình mỗi cốc: (100 + 260 + 180) : 3 = 180 ml."))],
    "c8.bai-toan-lien-quan-den-rut-ve-don-vi": [
        X("Gói bánh ở tiệm",
          "A bakery shelf with identical packs of cookies; one pack is open showing its cookies.",
          ("all", "4 gói bánh có 48 cái: mỗi gói có 48 : 4 = 12 cái."), ("all", "7 gói như thế có: 12 × 7 = 84 cái."))],
    "c8.luyen-tap-chung": [
        X("Bể bơi và vé vào cửa",
          "A sunny public swimming pool in Vietnam with children swimming and a ticket booth.",
          ("all", "Mỗi vé 35.000 đồng, sáng nay bán 24 vé."), ("all", "Thu được: 35.000 × 24 = 840.000 đồng."))],
    "c9.day-so-lieu-thong-ke": [
        X("Đo chiều cao cả tổ",
          "A school nurse room with a height measuring board on the wall and five children lined up waiting.",
          ("all", "Chiều cao các bạn trong tổ (cm): 132, 128, 140, 135, 130."),
          ("all", "Bạn cao nhất 140 cm, bạn thấp nhất 128 cm, chênh nhau 12 cm."))],
    "c9.bieu-do-cot": [
        X("Biểu đồ cây xanh",
          "Children standing next to a large colourful bar chart board made of stacked wooden blocks of different heights in a school garden.",
          ("all", "Mỗi cột cho biết số cây một lớp đã trồng."), ("all", "Cột cao nhất là lớp trồng được nhiều cây nhất."))],
    "c9.so-lan-xuat-hien-cua-mot-su-kien": [
        X("Tung đồng xu",
          "Two children sitting at a table tossing a coin, a notebook with tally marks without readable text.",
          ("all", "Tung đồng xu 20 lần, mặt sấp xuất hiện 9 lần."), ("all", "Mặt ngửa xuất hiện: 20 - 9 = 11 lần."))],
    "c9.luyen-tap-chung": [
        X("Hộp bóng ba màu",
          "A transparent box with red, yellow and blue balls, a child's hand picking one ball.",
          ("all", "Lấy bóng 30 lần: đỏ 12 lần, vàng 10 lần, xanh 8 lần."), ("all", "Bóng đỏ xuất hiện nhiều lần nhất."))],
    "c10.khai-niem-phan-so": [
        X("Chiếc bánh pizza",
          "A round pizza on a wooden table cut into exactly 8 equal slices, exactly 3 slices have been taken away leaving gaps.",
          ("all", "Chiếc bánh chia thành 8 phần bằng nhau."), ("all", "Đã ăn 3 phần, tức là 3/8 chiếc bánh."),
          ("all", "Còn lại 5 phần, tức là 5/8 chiếc bánh."))],
    "c10.phan-so-va-phep-chia-so-tu-nhien": [
        X("Chia bánh cho các bạn",
          "Exactly 3 round cakes on a table and exactly 4 children's plates around them.",
          ("all", "Có 3 cái bánh chia đều cho 4 bạn."), ("all", "Mỗi bạn được: 3 : 4 = 3/4 cái bánh."))],
    "c10.tinh-chat-co-ban-cua-phan-so": [
        X("Hai thanh sô-cô-la",
          "A kitchen table seen from above with two identical long chocolate bars, one above the other. The TOP bar is snapped into exactly 2 equal halves, the left half pushed slightly away. The BOTTOM bar is snapped into exactly 4 equal pieces, the left two pieces pushed slightly away.",
          ("all", "Một nửa thanh trên bằng hai phần tư thanh dưới."), ("all", "Vậy 1/2 = 2/4: nhân cả tử và mẫu với 2."))],
    "c10.rut-gon-phan-so": [
        X("Rút gọn miếng bánh",
          "A rectangular cake cut into exactly 12 equal pieces, exactly 8 pieces decorated with strawberries.",
          ("all", "Có 8 trên 12 miếng có dâu: 8/12."), ("all", "Chia cả tử và mẫu cho 4, ta được 8/12 = 2/3."))],
    "c10.quy-dong-mau-so-cac-phan-so": [
        X("Hai băng giấy màu",
          "Two equal paper strips on a craft table. TOP strip divided into exactly 3 equal parts. BOTTOM strip divided into exactly 6 equal parts.",
          ("all", "Băng trên chia 3 phần, băng dưới chia 6 phần."), ("all", "Quy đồng với mẫu số chung là 6, ta được 2/3 = 4/6."))],
    "c10.so-sanh-phan-so": [
        X("Ai uống nhiều nước hơn",
          "Two identical glasses of water. LEFT glass filled to three quarters. RIGHT glass filled to two thirds.",
          ("left", "Cốc trái đầy 3/4 cốc."), ("right", "Cốc phải đầy 2/3 cốc."),
          ("all", "Quy đồng: 3/4 = 9/12, 2/3 = 8/12, nên 3/4 > 2/3."))],
    "c10.luyen-tap-chung": [
        X("Vườn rau chia luống",
          "A vegetable garden divided into exactly 5 equal rectangular beds, 2 beds with lettuce and 3 beds with cabbage.",
          ("all", "Vườn chia 5 luống bằng nhau."), ("left", "2/5 vườn trồng xà lách."), ("right", "3/5 vườn trồng bắp cải."))],
    "c11.phep-cong-phan-so": [
        X("Hai ngày sơn tường",
          "A wall being painted. The LEFT part painted light blue, the MIDDLE part painted light green, the RIGHT part still white. A ladder and paint buckets.",
          ("left", "Ngày đầu sơn được 2/7 bức tường."), ("center", "Ngày sau sơn được 3/7 bức tường."),
          ("all", "Cả hai ngày: 2/7 + 3/7 = 5/7 bức tường."))],
    "c11.phep-tru-phan-so": [
        X("Bình nước cam",
          "A glass jug of orange juice three quarters full, a girl pouring some into a glass.",
          ("all", "Bình có 3/4 lít nước cam."), ("all", "Rót ra 1/4 lít, còn lại: 3/4 - 1/4 = 2/4 = 1/2 lít."))],
    "c11.luyen-tap-chung": [
        X("Đoạn đường về nhà",
          "A child walking home along a country road with a bridge in the middle and a house at the end.",
          ("all", "Đoạn đầu dài 1/2 km, đoạn sau dài 1/3 km."), ("all", "Cả quãng đường: 1/2 + 1/3 = 3/6 + 2/6 = 5/6 km."))],
    "c12.phep-nhan-phan-so": [
        X("Ruy băng làm nơ",
          "A craft table with exactly 3 equal pieces of red ribbon and finished bows.",
          ("all", "Mỗi chiếc nơ cần 2/5 m ruy băng."), ("all", "3 chiếc nơ cần: 2/5 × 3 = 6/5 m."))],
    "c12.phep-chia-phan-so": [
        X("Rót sữa vào cốc nhỏ",
          "A bottle of milk and several small identical glasses being filled on a kitchen table.",
          ("all", "Có 3/4 lít sữa, rót vào các cốc 1/8 lít."), ("all", "Số cốc: 3/4 : 1/8 = 3/4 × 8 = 6 cốc."))],
    "c12.tim-phan-so-cua-mot-so": [
        X("Rổ cam ở chợ",
          "A market stall with a basket of exactly 15 oranges, exactly 10 of them moved into a bowl on the right.",
          ("all", "Rổ có 15 quả cam, bán 2/3 số cam."), ("right", "Đã bán: 15 × 2/3 = 10 quả."), ("left", "Còn lại 5 quả."))],
    "c12.luyen-tap-chung": [
        X("Mảnh vườn trồng hoa",
          "A rectangular flower garden, part of it full of roses and the rest with sunflowers, a gardener with a watering can.",
          ("all", "Vườn rộng 60 m², trồng hoa hồng trên 3/4 diện tích."), ("all", "Diện tích hoa hồng: 60 × 3/4 = 45 m²."))],
    "c13.on-tap-so-tu-nhien": [
        X("Số dân Việt Nam",
          "A colourful collage-free panoramic landscape of Vietnam: rice terraces, a city skyline and a beach under one sky.",
          ("all", "Nước ta có khoảng 100.000.000 người."), ("all", "Đọc là: một trăm triệu người."))],
    "c13.on-tap-phep-tinh-voi-so-tu-nhien": [
        X("Xưởng đóng hộp",
          "A clean factory packing line with cardboard boxes moving on a conveyor belt.",
          ("all", "Mỗi giờ đóng được 125 hộp, làm 16 giờ."), ("all", "Số hộp: 125 × 16 = 2.000 hộp."))],
    "c13.on-tap-phan-so": [
        X("Thanh sô-cô-la chia phần",
          "A chocolate bar with exactly 10 equal pieces, 4 pieces broken off on a plate.",
          ("all", "Lấy 4 trong 10 miếng: 4/10 thanh."), ("all", "Rút gọn: 4/10 = 2/5."))],
    "c13.on-tap-phep-tinh-voi-phan-so": [
        X("Làm bánh cùng mẹ",
          "A mother and child baking in a sunny kitchen, flour and measuring cups on the table.",
          ("all", "Mẹ dùng 1/2 kg bột làm bánh mì và 1/4 kg làm bánh quy."), ("all", "Tất cả: 1/2 + 1/4 = 3/4 kg bột."))],
    "c13.on-tap-hinh-hoc-va-do-luong": [
        X("Khu vui chơi",
          "A playground seen from above with a rectangular sandpit, a rhombus-shaped flower bed and parallel bench rows.",
          ("left", "Hố cát hình chữ nhật dài 6 m, rộng 4 m: diện tích 24 m²."), ("center", "Bồn hoa hình thoi cạnh 3 m: chu vi 12 m."))],
    "c13.on-tap-thong-ke-va-xac-suat": [
        X("Bình chọn môn thể thao",
          "A school hall with a big wooden bar chart board of block towers of different heights and children voting.",
          ("all", "Biểu đồ cho biết số bạn thích từng môn."), ("all", "Cột bóng đá cao nhất: nhiều bạn thích nhất."))],
    "c13.on-tap-chung": [
        X("Vượt đích cuối năm",
          "Happy pupils celebrating at the end of the school year in a decorated classroom with confetti and a trophy.",
          ("all", "Cả năm con đã học số lớn, phép tính, phân số, hình học và thống kê."), ("all", "Cô chúc con nghỉ hè thật vui và học giỏi lớp 5!"))],
}

EX2 = {
    "c1.on-tap-cac-so-den-100000": X("So sánh số vé hai buổi xiếc",
        "A colourful circus tent in Vietnam. LEFT: a long queue of families at a ticket booth in the morning. RIGHT: a shorter queue at the same booth in the evening with lanterns.",
        ("left", "Buổi sáng bán được 12.450 vé."), ("right", "Buổi tối bán được 12.540 vé."), ("all", "Hàng trăm: 4 < 5, nên 12.450 < 12.540.")),
    "c1.on-tap-cac-phep-tinh-pham-vi-100000": X("Xếp táo vào thùng",
        "An orchard packing shed with many identical cardboard boxes of red apples stacked, workers packing.",
        ("all", "Mỗi thùng có 24 quả táo, có 8 thùng."), ("all", "Số táo: 24 × 8 = 192 quả."), ("all", "Chia đều 192 quả cho 4 cửa hàng: 192 : 4 = 48 quả.")),
    "c1.so-chan-so-le": X("Xếp đôi giày",
        "A shoe rack at a classroom door. LEFT: neat pairs of children's shoes. RIGHT: one single shoe left alone.",
        ("left", "Giày xếp thành từng đôi: số chiếc giày là số chẵn."), ("right", "Thêm một chiếc lẻ thì số chiếc giày thành số lẻ.")),
    "c1.bieu-thuc-chua-chu": X("Tiền mua vở theo số quyển",
        "A stationery shop shelf with stacks of identical notebooks and a child holding a basket.",
        ("all", "Mỗi quyển vở giá 7.000 đồng, mua a quyển thì hết 7.000 × a đồng."), ("all", "Với a = 5 thì 7.000 × 5 = 35.000 đồng.")),
    "c1.giai-bai-toan-co-ba-buoc-tinh": X("Ba ngày thu hoạch cam",
        "An orange orchard with three piles of harvested oranges in baskets. LEFT: a small pile. CENTER: a medium pile. RIGHT: a big pile.",
        ("left", "Ngày đầu hái được 120 kg."), ("center", "Ngày hai hái hơn ngày đầu 30 kg: 120 + 30 = 150 kg."),
        ("right", "Ngày ba hái gấp đôi ngày hai: 150 × 2 = 300 kg."), ("all", "Cả ba ngày: 120 + 150 + 300 = 570 kg.")),
    "c1.luyen-tap-chung": X("Bể cá cảnh",
        "A pet shop with two big aquariums. LEFT aquarium: many orange goldfish. RIGHT aquarium: many blue fish.",
        ("left", "Bể trái có 135 con cá vàng."), ("right", "Bể phải có ít hơn bể trái 28 con: 135 - 28 = 107 con.")),
    "c2.do-goc-don-vi-do-goc": X("Mái nhà và thước đo góc",
        "A wooden roof frame model on a carpentry table with a large protractor measuring the angle at the roof top.",
        ("all", "Đỉnh mái nhà tạo thành một góc."), ("all", "Thước đo góc chỉ 90 độ: đỉnh mái là góc vuông.")),
    "c2.goc-nhon-goc-tu-goc-bet": X("Ghế xếp và cái kéo",
        "LEFT: a folding beach chair slightly reclined. RIGHT: a laptop opened fully flat on a desk.",
        ("left", "Lưng ghế ngả ra tạo thành góc tù."), ("right", "Máy tính mở phẳng tạo thành góc bẹt, bằng 180 độ.")),
    "c2.luyen-tap-chung": X("Góc trong lớp học",
        "A classroom corner with a blackboard, an open door and a teacher's set square on the desk.",
        ("left", "Góc bảng đen là góc vuông."), ("center", "Cánh cửa mở hé tạo thành góc nhọn."), ("right", "Ê ke có một góc vuông và hai góc nhọn.")),
    "c3.so-co-sau-chu-so-so-1000000": X("Đếm cây trong rừng",
        "A vast green forest plantation seen from above with neat rows of young trees and a ranger hut.",
        ("all", "Khu rừng có 456.789 cây."), ("all", "Số 456.789 có sáu chữ số, đọc là: bốn trăm năm mươi sáu nghìn bảy trăm tám mươi chín.")),
    "c3.hang-va-lop": X("Giá một chiếc ô tô",
        "A shiny new family car in a bright showroom in Vietnam.",
        ("all", "Chiếc ô tô giá 568.000.000 đồng."), ("all", "Lớp triệu là 568, lớp nghìn là 000, lớp đơn vị là 000.")),
    "c3.cac-so-trong-pham-vi-lop-trieu": X("Đường cao tốc mới",
        "A brand-new highway winding through green hills in Vietnam with a few cars.",
        ("all", "Đoạn đường mới có 120.000.000 đồng tiền làm đèn chiếu sáng."),
        ("all", "120.000.000 đọc là: một trăm hai mươi triệu.")),
    "c3.lam-tron-so-den-hang-tram-nghin": X("Làm tròn số cây giống",
        "A huge plant nursery with countless seedling trays under a shade net.",
        ("all", "Vườn ươm có 832.150 cây giống."), ("all", "Chữ số hàng chục nghìn là 3, bé hơn 5 nên làm tròn xuống: khoảng 800.000 cây.")),
    "c3.so-sanh-cac-so-co-nhieu-chu-so": X("Hai ngọn núi",
        "Two tall mountains side by side under a blue sky. LEFT: a taller mountain with snow on top. RIGHT: a slightly lower green mountain.",
        ("left", "Núi bên trái cao 3.143 m."), ("right", "Núi bên phải cao 2.819 m."), ("all", "Hàng nghìn: 3 > 2, nên 3.143 > 2.819.")),
    "c3.lam-quen-voi-day-so-tu-nhien": X("Số trang sách",
        "An open big storybook on a desk showing page corners, a bookmark and a small lamp.",
        ("all", "Các trang sách đánh số 1, 2, 3, … liên tiếp."), ("all", "Sau trang 99 là trang 100: thêm 1 đơn vị.")),
    "c3.luyen-tap-chung": X("Số dân hai thành phố",
        "Two modern Vietnamese cities side by side. LEFT: a coastal city with beaches. RIGHT: a city with a big river and bridges.",
        ("left", "Thành phố biển có 1.230.000 người."), ("right", "Thành phố sông có 1.320.000 người."), ("all", "So sánh hàng trăm nghìn: 2 < 3, thành phố sông đông dân hơn.")),
    "c4.yen-ta-tan": X("Bao xi măng trên xe",
        "A small truck loaded with grey cement bags at a construction site, a worker carrying one bag.",
        ("all", "Mỗi bao xi măng nặng 50 kg, tức là 5 yến."), ("all", "Xe chở 40 bao: 50 × 40 = 2.000 kg, bằng 2 tấn.")),
    "c4.de-xi-met-vuong-met-vuong-mi-li-met-vuong": X("Con tem và mặt bàn",
        "LEFT: a tiny postage stamp with a flower picture lying on a desk. RIGHT: the whole wooden desk surface seen from above.",
        ("left", "Con tem có diện tích khoảng 6 cm²."), ("right", "Mặt bàn có diện tích khoảng 50 dm².")),
    "c4.giay-the-ki": X("Đền cổ và đồng hồ bấm giờ",
        "LEFT: an old Vietnamese communal house with curved roof. RIGHT: a swimmer touching the pool wall while a coach checks a stopwatch.",
        ("left", "Ngôi đình được xây năm 1820, thuộc thế kỉ XIX."), ("right", "Bạn bơi 50 m hết 1 phút 5 giây, tức là 65 giây.")),
    "c4.thuc-hanh-su-dung-don-vi-do-dai-luong": X("Cân hành lý",
        "An airport check-in counter with a suitcase on the luggage scale and a family waiting.",
        ("all", "Va li nặng 23 kg."), ("all", "Cả nhà mang 4 va li như vậy: 23 × 4 = 92 kg, gần 1 tạ.")),
    "c4.luyen-tap-chung": X("Sân bóng mini",
        "A small artificial-grass football pitch for children seen from above with goals at both ends.",
        ("all", "Sân dài 40 m, rộng 20 m."), ("all", "Diện tích sân: 40 × 20 = 800 m².")),
    "c5.phep-cong-cac-so-co-nhieu-chu-so": X("Lượt khách tham quan",
        "A famous Vietnamese bay with limestone islands and tourist boats, sunny day.",
        ("all", "Tháng Sáu có 245.600 lượt khách, tháng Bảy có 312.400 lượt khách."), ("all", "Cả hai tháng: 245.600 + 312.400 = 558.000 lượt khách.")),
    "c5.phep-tru-cac-so-co-nhieu-chu-so": X("Quãng đường chuyến tàu",
        "A long passenger train travelling along the coast of Vietnam past beaches and mountains.",
        ("all", "Đường tàu dài 1.726 km, tàu đã đi 958 km."), ("all", "Còn phải đi: 1.726 - 958 = 768 km.")),
    "c5.tinh-chat-giao-hoan-ket-hop-phep-cong": X("Mua quà sinh nhật",
        "A gift shop counter with three wrapped gifts. LEFT: a small gift. CENTER: a big gift. RIGHT: a medium gift.",
        ("left", "Quà thứ nhất 35.000 đồng."), ("center", "Quà thứ hai 120.000 đồng."), ("right", "Quà thứ ba 65.000 đồng."),
        ("all", "35.000 + 120.000 + 65.000 = (35.000 + 65.000) + 120.000 = 220.000 đồng.")),
    "c5.tim-hai-so-biet-tong-va-hieu": X("Tuổi bố và tuổi con",
        "A father and his son fishing together by a lake at sunset, seen from behind.",
        ("all", "Tuổi bố và con cộng lại là 48, bố hơn con 30 tuổi."), ("left", "Tuổi bố: (48 + 30) : 2 = 39 tuổi."), ("right", "Tuổi con: 48 - 39 = 9 tuổi.")),
    "c5.luyen-tap-chung": X("Hai trang trại gà",
        "Two chicken farms. LEFT: a large coop with many chickens. RIGHT: a smaller coop with fewer chickens.",
        ("all", "Hai trại có 2.400 con gà, trại trái hơn trại phải 400 con."), ("left", "Trại trái: (2.400 + 400) : 2 = 1.400 con."), ("right", "Trại phải: 2.400 - 1.400 = 1.000 con.")),
    "c6.hai-duong-thang-vuong-goc": X("Góc tường và sàn nhà",
        "A clean room corner where a wall meets the floor, with a set square placed in the corner.",
        ("all", "Mép tường và mép sàn vuông góc với nhau."), ("all", "Ê ke đặt vừa khít vào góc: đó là góc vuông.")),
    "c6.thuc-hanh-ve-hai-duong-thang-vuong-goc": X("Kẻ ô bàn cờ",
        "A child drawing a chessboard grid on paper with a ruler and set square.",
        ("all", "Các đường kẻ ngang vuông góc với các đường kẻ dọc."), ("all", "Mỗi ô bàn cờ có 4 góc vuông.")),
    "c6.hai-duong-thang-song-song": X("Vạch kẻ đường",
        "A straight countryside road with two long parallel white lane lines, trees on both sides.",
        ("all", "Hai vạch trắng chạy song song bên nhau."), ("all", "Kéo dài mãi, hai vạch cũng không gặp nhau.")),
    "c6.thuc-hanh-ve-hai-duong-thang-song-song": X("Vẽ thang dây",
        "A child drawing a rope ladder on paper: two long parallel side lines and many short rungs, with a ruler and set square.",
        ("all", "Hai sợi dây thang là hai đường thẳng song song."), ("all", "Các bậc thang vuông góc với hai sợi dây.")),
    "c6.hinh-binh-hanh-hinh-thoi": X("Gạch lát hình thoi",
        "A courtyard floor paved with rhombus-shaped tiles in two colours, a potted plant in the corner.",
        ("all", "Mỗi viên gạch là hình thoi cạnh 20 cm."), ("all", "Chu vi một viên: 20 × 4 = 80 cm.")),
    "c6.luyen-tap-chung": X("Hàng rào vườn rau",
        "A vegetable garden with a fence made of parallel vertical bamboo poles and two horizontal rails.",
        ("all", "Các cọc tre song song với nhau."), ("all", "Mỗi cọc vuông góc với thanh ngang của hàng rào.")),
    "c7.on-tap-cac-so-den-lop-trieu": X("Diện tích một hồ lớn",
        "A huge calm lake surrounded by mountains in northern Vietnam, a small boat on the water.",
        ("all", "Hồ rộng khoảng 21.600.000 m²."), ("all", "Đọc là: hai mươi mốt triệu sáu trăm nghìn mét vuông.")),
    "c7.on-tap-phep-cong-phep-tru": X("Tiết kiệm mua xe đạp",
        "A child putting money into a piggy bank next to a new bicycle in a shop window.",
        ("all", "Xe đạp giá 1.850.000 đồng, Nam đã có 1.275.000 đồng."), ("all", "Nam còn thiếu: 1.850.000 - 1.275.000 = 575.000 đồng.")),
    "c7.on-tap-hinh-hoc": X("Cánh diều và góc",
        "A rhombus kite flying in the sky, its two crossing sticks clearly visible.",
        ("all", "Hai thanh tre của diều vuông góc với nhau."), ("all", "Bốn cạnh diều bằng nhau: diều là hình thoi.")),
    "c7.on-tap-do-luong": X("Xe chở dưa hấu",
        "A small truck loaded with watermelons at a farm, a farmer standing beside it.",
        ("all", "Xe chở 1 tấn 250 kg dưa hấu, tức là 1.250 kg."), ("all", "Bán mất 7 tạ, còn lại: 1.250 - 700 = 550 kg.")),
    "c7.on-tap-chung": X("Hội khoẻ Phù Đổng",
        "A school sports day with children running a relay race and others cheering.",
        ("left", "Trường có 486 học sinh, trong đó 162 bạn thi chạy."), ("right", "Số bạn cổ vũ: 486 - 162 = 324 bạn.")),
    "c8.nhan-voi-so-co-mot-chu-so": X("Vé xem phim",
        "A cinema lobby with a family of five buying tickets at the counter.",
        ("all", "Mỗi vé giá 75.000 đồng, nhà có 5 người."), ("all", "Tiền vé: 75.000 × 5 = 375.000 đồng.")),
    "c8.chia-cho-so-co-mot-chu-so": X("Chia đường thành đoạn",
        "A long road under repair with workers in orange vests and cones dividing it into sections.",
        ("all", "Con đường dài 2.856 m, chia đều cho 4 đội."), ("all", "Mỗi đội sửa: 2.856 : 4 = 714 m.")),
    "c8.tinh-chat-giao-hoan-ket-hop-phep-nhan": X("Hộp bút chì màu",
        "A shelf with crates holding boxes of colour pencils, crates stacked neatly.",
        ("all", "Mỗi hộp 12 cây, mỗi thùng 5 hộp, có 2 thùng."), ("all", "12 × 5 × 2 = 12 × (5 × 2) = 12 × 10 = 120 cây.")),
    "c8.nhan-chia-voi-10-100-1000": X("Đổi tiền lẻ",
        "A bank counter with stacks of coins and banknotes neatly sorted.",
        ("all", "Có 4.500 đồng tiền xu loại 100 đồng."), ("all", "Số đồng xu: 4.500 : 100 = 45 đồng xu.")),
    "c8.tinh-chat-phan-phoi": X("Trồng cây hai hàng",
        "A school garden with two rows of young trees, children watering them.",
        ("all", "Hàng trước 15 cây, hàng sau 15 cây, mỗi cây cần 4 l nước."), ("all", "4 × (15 + 15) = 4 × 15 + 4 × 15 = 120 l nước.")),
    "c8.nhan-voi-so-co-hai-chu-so": X("Ghế trong hội trường",
        "A school auditorium with many neat rows of chairs facing a stage.",
        ("all", "Hội trường có 24 hàng ghế, mỗi hàng 18 ghế."), ("all", "Số ghế: 18 × 24 = 432 ghế.")),
    "c8.chia-cho-so-co-hai-chu-so": X("Xếp sách lên kệ",
        "A library with long bookshelves, many books on a trolley ready to be shelved.",
        ("all", "Có 864 quyển sách, mỗi ngăn xếp 36 quyển."), ("all", "Cần số ngăn: 864 : 36 = 24 ngăn.")),
    "c8.thuc-hanh-uoc-luong-trong-tinh-toan": X("Ước lượng số người xem",
        "A town square watching an outdoor concert, rows of chairs.",
        ("all", "Có 19 hàng ghế, mỗi hàng 21 ghế."), ("all", "Ước lượng: 20 × 20 = 400 người; thực tế 19 × 21 = 399 người.")),
    "c8.tim-so-trung-binh-cong": X("Điểm kiểm tra ba môn",
        "A smiling child holding a report card at home with parents, no readable text.",
        ("all", "Bé được điểm 9, 10 và 8."), ("all", "Điểm trung bình: (9 + 10 + 8) : 3 = 9.")),
    "c8.bai-toan-lien-quan-den-rut-ve-don-vi": X("Xe chở học sinh",
        "Identical school minibuses parked in a row in front of a school.",
        ("all", "3 xe chở được 48 học sinh: mỗi xe 48 : 3 = 16 bạn."), ("all", "5 xe như thế chở được: 16 × 5 = 80 bạn.")),
    "c8.luyen-tap-chung": X("Xưởng làm bánh trung thu",
        "A bakery making mooncakes, trays of mooncakes cooling on racks.",
        ("all", "Mỗi khay 16 cái bánh, nướng 25 khay: 16 × 25 = 400 cái."), ("all", "Đóng mỗi hộp 4 cái: 400 : 4 = 100 hộp.")),
    "c9.day-so-lieu-thong-ke": X("Nhiệt độ trong tuần",
        "A weather station board in a school yard with a thermometer and a sunny sky.",
        ("all", "Nhiệt độ trưa 5 ngày (°C): 30, 32, 31, 29, 33."), ("all", "Ngày nóng nhất 33 °C, ngày mát nhất 29 °C.")),
    "c9.bieu-do-cot": X("Biểu đồ trái cây yêu thích",
        "A classroom wall with a bar chart made from paper fruit stickers stacked in columns: apples, bananas, mangoes, grapes, no readable text.",
        ("all", "Cột xoài cao nhất: nhiều bạn thích xoài nhất."), ("all", "Cột nho thấp nhất: ít bạn thích nho nhất.")),
    "c9.so-lan-xuat-hien-cua-mot-su-kien": X("Gieo xúc xắc",
        "Children playing a board game, a big dice rolling on the table.",
        ("all", "Gieo xúc xắc 30 lần, mặt 6 chấm xuất hiện 5 lần."), ("all", "Các mặt khác xuất hiện: 30 - 5 = 25 lần.")),
    "c9.luyen-tap-chung": X("Số khách mỗi ngày",
        "A small seaside café with tables and customers, a chalkboard without readable text.",
        ("all", "Khách 4 ngày: 40, 55, 35, 50 người."), ("all", "Trung bình mỗi ngày: (40 + 55 + 35 + 50) : 4 = 45 người.")),
    "c10.khai-niem-phan-so": X("Ô cửa sổ tô màu",
        "A window with exactly 6 equal glass panes, exactly 2 panes are stained blue and the rest are clear.",
        ("all", "Cửa sổ có 6 ô bằng nhau, 2 ô màu xanh."), ("all", "Phần màu xanh là 2/6 cửa sổ.")),
    "c10.phan-so-va-phep-chia-so-tu-nhien": X("Chia nước chanh",
        "Exactly 2 jugs of lemonade and exactly 5 glasses on a picnic table.",
        ("all", "2 lít nước chanh chia đều vào 5 cốc."), ("all", "Mỗi cốc có: 2 : 5 = 2/5 lít.")),
    "c10.tinh-chat-co-ban-cua-phan-so": X("Pizza cắt nhỏ hơn",
        "Two identical pizzas. LEFT pizza cut into 4 slices with 1 slice taken. RIGHT pizza cut into 8 slices with 2 slices taken.",
        ("left", "Lấy 1 trong 4 miếng: 1/4 cái bánh."), ("right", "Lấy 2 trong 8 miếng: 2/8 cái bánh."), ("all", "Phần lấy bằng nhau nên 1/4 = 2/8.")),
    "c10.rut-gon-phan-so": X("Hộp bút màu",
        "An open box of exactly 24 colour pencils, exactly 18 of them standing in a cup outside the box.",
        ("all", "18 trên 24 cây bút đã lấy ra: 18/24."), ("all", "Chia cả tử và mẫu cho 6, ta được 18/24 = 3/4.")),
    "c10.quy-dong-mau-so-cac-phan-so": X("Hai chai sữa",
        "Two identical milk bottles. LEFT bottle half full. RIGHT bottle one-third full.",
        ("left", "Chai trái có 1/2 chai sữa."), ("right", "Chai phải có 1/3 chai sữa."), ("all", "Quy đồng mẫu số 6, ta được 1/2 = 3/6 và 1/3 = 2/6.")),
    "c10.so-sanh-phan-so": X("Ai đi xa hơn",
        "Two children walking on a countryside path toward a school, one ahead of the other.",
        ("all", "Lan đi được 3/5 quãng đường, Hoa đi được 2/5 quãng đường."), ("all", "Cùng mẫu số, 3 > 2 nên 3/5 > 2/5: Lan đi xa hơn.")),
    "c10.luyen-tap-chung": X("Đàn gà trong sân",
        "A farmyard with exactly 10 chickens: 3 black chickens and 7 white chickens.",
        ("all", "Có 10 con gà, 3 con gà đen."), ("all", "Gà đen chiếm 3/10 đàn, gà trắng chiếm 7/10 đàn.")),
    "c11.phep-cong-phan-so": X("Đọc sách hai ngày",
        "A child reading a thick storybook on a sofa, a bookmark in the book.",
        ("all", "Ngày đầu đọc 1/4 quyển, ngày sau đọc 1/2 quyển."), ("all", "Cả hai ngày: 1/4 + 1/2 = 1/4 + 2/4 = 3/4 quyển.")),
    "c11.phep-tru-phan-so": X("Bánh còn lại",
        "A round cake on a plate with part of it already eaten, a knife beside it.",
        ("all", "Còn 5/6 cái bánh, cả nhà ăn thêm 2/6 cái."), ("all", "Còn lại: 5/6 - 2/6 = 3/6 = 1/2 cái bánh.")),
    "c11.luyen-tap-chung": X("Tô màu bức tranh",
        "A child painting a big picture on an easel, part of it colored.",
        ("all", "Sáng tô được 2/5 bức tranh, chiều tô thêm 1/5 bức tranh."), ("all", "Cả ngày: 2/5 + 1/5 = 3/5; còn lại 1 - 3/5 = 2/5 bức tranh.")),
    "c12.phep-nhan-phan-so": X("Chạy quanh sân",
        "A school running track with children jogging laps.",
        ("all", "Mỗi vòng sân dài 3/10 km, bé chạy 2 vòng."), ("all", "Quãng đường: 3/10 × 2 = 6/10 = 3/5 km.")),
    "c12.phep-chia-phan-so": X("Chia dây ruy băng",
        "A long ribbon on a craft table being cut into equal pieces with scissors.",
        ("all", "Sợi ruy băng dài 6/7 m, chia đều làm 3 đoạn."), ("all", "Mỗi đoạn dài: 6/7 : 3 = 2/7 m.")),
    "c12.tim-phan-so-cua-mot-so": X("Lớp học thích bơi",
        "A class of children at a swimming pool, some in the water and some on the side.",
        ("all", "Lớp có 30 bạn, 3/5 số bạn biết bơi."), ("all", "Số bạn biết bơi: 30 × 3/5 = 18 bạn.")),
    "c12.luyen-tap-chung": X("Tiền tiết kiệm",
        "A child counting money from a piggy bank on a table.",
        ("all", "Bé có 120.000 đồng, dùng 1/4 số tiền mua sách."), ("all", "Tiền mua sách: 120.000 × 1/4 = 30.000 đồng.")),
    "c13.on-tap-so-tu-nhien": X("Số chẵn trên áo cầu thủ",
        "Children's football team in matching shirts lining up on a pitch, shirts without readable numbers.",
        ("all", "Áo đội đỏ mang số chẵn 2, 4, 6, 8, 10."), ("all", "Áo đội xanh mang số lẻ 1, 3, 5, 7, 9.")),
    "c13.on-tap-phep-tinh-voi-so-tu-nhien": X("Chuyến xe buýt",
        "A city bus at a stop with passengers getting on and off.",
        ("all", "Mỗi ngày xe buýt chở 1.250 lượt khách, trong 30 ngày."), ("all", "Số lượt khách: 1.250 × 30 = 37.500 lượt.")),
    "c13.on-tap-phan-so": X("Băng giấy gấp đôi",
        "A paper strip folded into equal parts on a desk, some parts coloured.",
        ("all", "Băng giấy chia 8 phần, tô 6 phần: 6/8."), ("all", "Rút gọn: 6/8 = 3/4 băng giấy.")),
    "c13.on-tap-phep-tinh-voi-phan-so": X("Bình nước của cả tổ",
        "A big water jug and several cups on a classroom table.",
        ("all", "Bình có 3/4 lít nước, chia đều vào 3 cốc."), ("all", "Mỗi cốc: 3/4 : 3 = 1/4 lít.")),
    "c13.on-tap-hinh-hoc-va-do-luong": X("Mảnh vườn hình bình hành",
        "A parallelogram-shaped flower garden in a park with a path around it.",
        ("all", "Vườn có hai cạnh dài 12 m và 8 m."), ("all", "Chu vi vườn: (12 + 8) × 2 = 40 m.")),
    "c13.on-tap-thong-ke-va-xac-suat": X("Vòng quay may mắn",
        "A colourful prize wheel at a school fair with children waiting to spin it.",
        ("all", "Quay 40 lần, ô gấu bông xuất hiện 15 lần."), ("all", "Các ô khác xuất hiện: 40 - 15 = 25 lần.")),
    "c13.on-tap-chung": X("Chuẩn bị lên lớp 5",
        "A child packing a school bag with new books and supplies in a cozy bedroom.",
        ("all", "Mua 5 quyển vở giá 12.000 đồng mỗi quyển: 12.000 × 5 = 60.000 đồng."), ("all", "Cô tin con sẽ học thật giỏi ở lớp 5!")),
}

_EQ = re.compile(r"[0-9(][0-9.\s/×:+\-()]*=[0-9.\s/×:+\-()=]*[0-9)]")


CLOSE = {
    "c1": "Con thấy không, các phép tính giúp mình tính nhanh mọi thứ quanh ta!",
    "c2": "Nhìn quanh nhà, con sẽ thấy góc nhọn, góc vuông, góc tù ở khắp nơi đấy!",
    "c3": "Số lớn có ở khắp nơi: số dân, số tiền, số người. Con đọc theo từng lớp nhé!",
    "c4": "Đổi về cùng một đơn vị rồi mới tính, con nhớ nhé!",
    "c5": "Cộng trừ số lớn cũng dễ thôi: đặt thẳng cột và tính từ phải sang trái.",
    "c6": "Đường thẳng vuông góc, song song có ở khắp nơi quanh con đấy!",
    "c7": "Con đã ôn tập rất tốt, cố lên nhé!",
    "c8": "Phép nhân, phép chia giúp mình tính rất nhanh trong cuộc sống.",
    "c9": "Số liệu giúp mình biết điều gì nhiều nhất, ít nhất đấy con!",
    "c10": "Phân số có ở khắp nơi, từ chiếc bánh đến cốc nước của con!",
    "c11": "Cộng, trừ phân số: nhớ quy đồng mẫu số khi khác mẫu nhé!",
    "c12": "Nhân, chia phân số giúp mình chia phần thật công bằng!",
    "c13": "Con đã học rất nhiều điều trong năm nay. Cô rất tự hào về con!",
}


def polish(chapter, x):
    """Chuẩn như lớp 3: 3–4 câu, câu cuối cô chỉ cả tranh."""
    lines = x["lines"]
    if lines[-1]["at"] != "all":
        if len(lines) >= 4:
            lines[-1]["at"] = "all"
        else:
            lines.append({"say": CLOSE[chapter], "at": "all"})
    if len(lines) < 3:
        lines.append({"say": CLOSE[chapter], "at": "all"})
    assert 3 <= len(lines) <= 4 and lines[-1]["at"] == "all", x["title"]
    return x


def main():
    catalog = json.loads((G.CONTENT / "catalog.json").read_text(encoding="utf-8"))
    ids = {l["id"] for b in catalog["books"] for c in b["chapters"] for l in c["lessons"]}
    out = {}
    for k, v in EX.items():
        lid = f"{G.BOOK}.{k}"
        assert lid in ids, lid
        for x in v + ([EX2[k]] if k in EX2 else []):
            for l in x["lines"]:
                for m in _EQ.findall(l["say"]):
                    G.check_equation(m)
        if k in EX2:
            v = v + [EX2[k]]
        out[lid] = [polish(k.split(".")[0], x) for x in v]
    G.dump(G.CONTENT / "examples.json", out)
    print(f"Ví dụ: {sum(len(v) for v in out.values())} tranh cho {len(out)} bài.")


if __name__ == "__main__":
    main()
