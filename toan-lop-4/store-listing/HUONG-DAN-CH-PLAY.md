# Đăng "Toán Lớp 4 – Học cùng Cô Mai" lên CH Play

Thư mục này chứa mọi thứ cần để điền trang ứng dụng trên Google Play Console.

| Tệp | Dùng ở đâu trên Play Console |
| --- | --- |
| `app-release.aab` (gửi riêng) | Bản phát hành → Tạo bản phát hành → Tải lên |
| `app-release.apk` (gửi riêng) | Cài thử trên điện thoại Android trước khi đăng |
| `images/bieu-tuong-512.png` | Trang thông tin chính → Biểu tượng ứng dụng (512×512) |
| `images/anh-noi-bat-1024x500.png` | Trang thông tin chính → Hình ảnh nổi bật (1024×500) |
| `images/anh-chup-1.png` … `anh-chup-8.png` | Trang thông tin chính → Ảnh chụp màn hình điện thoại (1080×1920), giữ đúng thứ tự 1 → 8 |
| `mo-ta-day-du.txt` | Trang thông tin chính → Mô tả đầy đủ (dán nguyên văn) |

Mã ứng dụng (package): **com.babelisa.toanlop4**. Mã này cố định mãi mãi sau lần tải lên đầu tiên.

---

## 1. Tên, mô tả ngắn, từ khoá

**Tên ứng dụng** (tối đa 30 ký tự). Dùng:

> **Toán Lớp 4 - Học cùng Cô Mai** (28 ký tự)

Lý do: người dùng gõ "toán lớp 4" nhiều nhất, nên cụm này đứng đầu tên. "Học cùng Cô Mai" làm tên dễ nhớ và khác các app khác.
Không đưa "miễn phí", "số 1", "hay nhất" vào tên: Google cấm và có thể từ chối app.

**Mô tả ngắn** (tối đa 80 ký tự). Chọn 1 trong 2:

> Học Toán lớp 4 cùng cô giáo biết nói: video bài giảng, 612 bài tập, 57 đề thi (77 ký tự)

> Video bài giảng Toán lớp 4 có cô giáo nói, bài tập, đề thi và gameshow cho bé (77 ký tự)

**Mô tả đầy đủ:** dán nguyên văn tệp `mo-ta-day-du.txt` (khoảng 2.800 / 4.000 ký tự).
Các từ khoá đã được viết tự nhiên vào câu văn, không liệt kê dồn (Google phạt kiểu nhồi từ khoá):

- toán lớp 4, học toán lớp 4, bài tập toán lớp 4
- đề thi / đề kiểm tra toán lớp 4, giữa học kì, cuối học kì
- toán 4 kết nối tri thức, phân số lớp 4, góc, số có nhiều chữ số
- video bài giảng, giải toán, ôn tập hè
- học tiếng anh cho bé, toán tiếng anh

**Danh mục:** Ứng dụng → **Giáo dục**.
**Thẻ** (chọn tối đa 5): Giáo dục, Toán học, Học tập, Trẻ em, Học tiếng Anh. Chọn những thẻ có trong danh sách của Google.

---

## 2. Hình ảnh

- **Biểu tượng:** chú ong đội mũ tốt nghiệp, giống biểu tượng của bản web.
- **Hình ảnh nổi bật (banner):** cô Mai và MC Ngọc Ánh, chữ "Toán Lớp 4" lớn. Banner hiện ở đầu trang app và khi Google giới thiệu app.
- **8 ảnh chụp màn hình**, mỗi ảnh có một dòng chữ lớn nói lợi ích:
  1. Học Toán lớp 4 cùng cô Mai
  2. Video bài giảng như ở trên lớp
  3. Làm sai? Cô giảng lại bằng tranh
  4. 612 bài tập có gợi ý và lời giải
  5. Gameshow Ngôi sao Toán học
  6. Học tiếng Anh cùng vẹt Lulu
  7. 57 đề kiểm tra tuần, giữa kì, cuối kì
  8. 13 chủ đề đủ cả năm học

  Ba ảnh đầu quan trọng nhất, vì đó là những ảnh người dùng thấy ngay khi tìm kiếm.
- **Video quảng cáo** (không bắt buộc, nhưng giúp tăng lượt tải): quay màn hình điện thoại khoảng 30 giây cảnh cô Mai giảng bài và cảnh làm sai được cô giảng tranh. Đăng lên YouTube, rồi dán link vào mục "Video".

---

## 3. Các mục bắt buộc ở "Nội dung ứng dụng" (App content)

| Mục | Cách điền |
| --- | --- |
| Chính sách quyền riêng tư | `https://babelisa.com/lab/toan4-ttuclnqj/privacy.html` (trang đã có sẵn) |
| Quảng cáo | **Không**, ứng dụng không chứa quảng cáo |
| Quyền truy cập ứng dụng | Mọi chức năng dùng được, không cần đăng nhập |
| Phân loại nội dung (bảng câu hỏi) | Danh mục "Giáo dục / Tham khảo"; trả lời **Không** cho mọi câu về bạo lực, tình dục, cờ bạc, ngôn từ… → kết quả thường là "Mọi lứa tuổi / 3+" |
| Đối tượng mục tiêu | Chọn nhóm tuổi **9–12** (có thể thêm **6–8**). Vì có trẻ em nên app phải theo **Chính sách gia đình** của Google; app đáp ứng: không quảng cáo, không thu thập dữ liệu |
| An toàn dữ liệu (Data safety) | "Ứng dụng có thu thập hoặc chia sẻ dữ liệu người dùng không?" → **Không**. Bản này chạy offline, không gửi gì lên mạng |
| Ứng dụng tin tức / sức khoẻ / tài chính / chính phủ | Không |

Nếu muốn, sau khi app đã lên kệ có thể đăng ký nhãn **"Được giáo viên phê duyệt" (Teacher Approved)** trong mục Đối tượng mục tiêu. App có nhãn này được hiện ở thẻ "Trẻ em" của CH Play, nên có thêm nhiều lượt tải.

---

## 4. Các bước đăng app

1. **Tạo tài khoản nhà phát triển:** vào https://play.google.com/console, trả phí một lần 25 USD, rồi xác minh danh tính bằng CCCD.
   - **Tài khoản cá nhân mới** phải chạy **thử nghiệm kín với ít nhất 12 người trong 14 ngày liên tục** rồi mới được phát hành công khai. Chuẩn bị trước 12 email Gmail của người thân và phụ huynh quen.
   - **Tài khoản tổ chức** (có mã D-U-N-S của công ty) thì không phải chạy thử 14 ngày.
2. **Tạo ứng dụng:**
   - Tên: "Toán Lớp 4 - Học cùng Cô Mai"
   - Ngôn ngữ mặc định: Tiếng Việt
   - Loại: Ứng dụng, Miễn phí
3. **Điền "Nội dung ứng dụng"** theo bảng ở mục 3.
4. **Điền "Trang thông tin chính trên Cửa hàng"** bằng tên, mô tả và hình ở mục 1–2.
5. **Thử nghiệm kín:**
   - Kiểm thử → Thử nghiệm kín → Tạo bản phát hành.
   - Bật **"Ký ứng dụng bằng Play App Signing"**: Google giữ khoá ký chính, nên mất khoá tải lên vẫn khôi phục được.
   - Tải tệp `app-release.aab` lên, rồi thêm danh sách email người thử.
6. Sau 14 ngày, vào **Phát hành chính thức (Production)**, bấm "Đăng ký quyền truy cập", rồi tạo bản phát hành từ bản đã thử. Google duyệt thường mất từ 1 đến 7 ngày.

---

## 5. Để có nhiều lượt tải

- **Lượt đánh giá 5 sao đầu tiên rất quan trọng.** Nhờ 12 người thử nghiệm và phụ huynh quen chấm sao, kèm vài câu nhận xét thật (ví dụ "con tự học được, cô giảng dễ hiểu").
- **Đặt link CH Play ở mọi nơi:**
  - bảng khoá học trên babelisa.com (thêm nút "Tải app trên CH Play" khi app đã lên kệ);
  - bản web Toán lớp 4;
  - các nhóm Facebook và Zalo của phụ huynh lớp 4.
- **Đăng bài theo mùa:** đầu năm học (tháng 8–9), trước giữa kì (tháng 10–11 và 3), trước cuối kì (tháng 12 và 4–5), và kỳ nghỉ hè ("ôn hè lớp 4 lên lớp 5").
- **Trả lời mọi đánh giá** trong Play Console, nhất là đánh giá thấp. Google ưu tiên những app trả lời người dùng.
- **Cập nhật đều đặn** (ví dụ mỗi 1–2 tháng thêm bài hoặc đề mới) và ghi rõ "Có gì mới". App cập nhật thường xuyên được xếp hạng tốt hơn.
- **Thử nghiệm trang thông tin (Store listing experiments):** sau khi có lượt tải, cho Google so sánh 2 banner hoặc 2 câu mô tả ngắn để chọn bản được tải nhiều hơn.

---

## 6. Build lại app (cho lần cập nhật sau)

```bash
cd toan-lop-4
bash tool/build_android.sh
```

- Trước khi build, tăng số phiên bản trong `pubspec.yaml` (ví dụ `1.0.0+1` → `1.0.1+2`). Số sau dấu `+` phải tăng mỗi lần tải lên.
- Cần đủ 2 tệp khoá ký trong `android/`: `upload-keystore.jks` và `key.properties`. **Giữ 2 tệp này cẩn thận, không đưa lên GitHub.** Mỗi lần cập nhật app đều phải ký bằng đúng khoá này.
- Bản Android dùng giọng nói nén Opus (`tool/android_voice.py`) để app nhỏ hơn giới hạn 200 MB của Google Play.
