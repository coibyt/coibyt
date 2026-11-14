# Hướng dẫn dịch Sói Taiga (Taiga Wolf)

Game học võ tự vệ trên web. Nguồn: `content/i18n/vi/` (tiếng Việt), 5 file JSON:
`ui.json` (chữ giao diện), `lines.json` (câu thầy nói ở các màn hình), `tracks.json` (các nhánh huấn luyện),
`lessons.json` (15 bài: lời giảng, điểm cần nhớ, lỗi hay gặp, bài tập theo nhịp, câu hỏi kiểm tra, bài tập về nhà),
`force.json` (nhãn ngắn trên mũi tên hướng lực trong video).

Bản dịch: `content/i18n/<mã>/` với 5 file **cùng tên, cùng cấu trúc, cùng khoá, cùng số phần tử mọi danh sách**.
Chỉ dịch giá trị chuỗi. Không đổi khoá, không thêm/bớt phần tử. Giữ nguyên `{0}`, `{1}`, `<b>…</b>`, `①②③④`, `×`, `·`.
Kiểm tra: `python3 tools/i18n_check.py <mã>` phải in `ĐẠT`.

## Bối cảnh và giọng văn
- Huấn luyện viên **Alexei** (nam, khoảng 42 tuổi, người Nga hư cấu) dạy học viên **Ivan** và **Katya** (hư cấu) ở một trại huấn luyện trong rừng. Giữ nguyên tên riêng, viết theo chữ viết của ngôn ngữ đích (ví dụ tiếng Nga: Алексей, Иван, Катя; tiếng Trung: 阿列克谢, 伊万, 卡佳).
- Thầy nói ở ngôi thứ nhất với học viên: ấm áp, dứt khoát, rõ ràng, như một huấn luyện viên giỏi. Dùng cách xưng hô thân thiện mà tôn trọng, tự nhiên trong ngôn ngữ đích (tiếng Đức/Pháp/… dùng "du"/"tu" thân mật là được; tiếng Nhật/Hàn dùng thể lịch sự).
- Nội dung là thể thao – tự vệ – rèn luyện thể lực. Giữ đúng mọi lời nhắc an toàn, không thêm bớt ý.
- Tên game "SÓI TAIGA" dịch nghĩa "Sói Taiga / Taiga Wolf" sang ngôn ngữ đích (ví dụ: ru "ВОЛК ТАЙГИ", en "TAIGA WOLF", de "TAIGA-WOLF", zh "泰加狼"), viết HOA nếu chữ viết có chữ hoa. Dùng nhất quán ở mọi nơi.
- Thuật ngữ: dùng từ võ thuật/thể thao phổ biến của ngôn ngữ đích (thế đứng chiến đấu, bộ pháp, ngã an toàn/breakfall, đỡ đòn, đá đẩy/push kick, quật ngã, chống vật/sprawl, Systema, Sambo…). Systema và Sambo giữ tên riêng.
- Chữ trái/phải trong `ui.json → feet.left / feet.right`: một chữ cái viết tắt của "trái"/"phải" trong ngôn ngữ đích (en L/R, de L/R, ru Л/П, zh 左/右, ja 左/右, ko 왼/오). Tối đa 2 ký tự, hai giá trị phải KHÁC NHAU và dễ hiểu.

## Lời ĐỌC THÀNH TIẾNG (rất quan trọng)
Các chuỗi sau được máy đọc thành giọng nói, phải viết để ĐỌC TỰ NHIÊN:
`lines.json` (tất cả), `lessons.json` → `intro`, `outro`, `home`, `steps.*.say`, `steps.*.drill.say`, `quiz[].q`, `quiz[].why`.
- Viết số bằng chữ (như bản tiếng Việt), không dùng ký hiệu lạ, không viết tắt.
- Câu ngắn gọn, mỗi câu kết thúc bằng dấu chấm/chấm than/chấm hỏi của ngôn ngữ đích (chữ Trung/Nhật dùng 。！？; Ả Rập/Ba Tư dùng ؟ cho câu hỏi; Thái/Miến Điện dùng dấu cách hoặc ။ theo thói quen viết). Giữ thứ tự ý như bản gốc vì video chuyển cảnh theo tiến trình lời nói.
- `lines.json → n1…n20`: số đếm bằng chữ của ngôn ngữ đích, có dấu chấm cuối (ví dụ en "One.", ru "Раз." hoặc "Один.").
- `lines.json → call_tien, call_lui, call_trai, call_phai, call_xoay`: khẩu lệnh rất ngắn: Tiến!/Lùi!/Sang trái!/Sang phải!/Xoay! — và `lessons.json → tk2.steps.tk2-6.drill.calls` phải là đúng 5 khẩu lệnh đó, cùng thứ tự.
- `home` bắt đầu bằng cụm "Bài tập về nhà:" dịch sang ngôn ngữ đích, theo sau là dấu hai chấm (:).

## Chữ giao diện
- Ngắn gọn như ứng dụng di động thật. Nhãn nút 1–3 từ. `force.json`: nhãn rất ngắn (≤ 30 ký tự nếu được).
- `ui.json → decimal`: dấu thập phân của ngôn ngữ đích ("," hoặc ".").
- Tiếng Ả Rập, Ba Tư: viết bình thường (trình duyệt tự hiển thị từ phải sang trái).
