# Kiến trúc — Ong Vàng Toán 3

## Nguyên tắc UX cho bé lớp 3 (8–9 tuổi)

| Nhu cầu | Cách làm trong app |
|---|---|
| Câu lệnh ngắn | `instruction` ≤ 40 ký tự (schema + model chặn); đề bài chữ to 26 |
| Nút to, dễ chạm | Nút chính cao ≥ 64dp; bàn phím số riêng (không dùng bàn phím hệ thống, không bị che đề) |
| Dấu tiếng Việt hiển thị chuẩn | Font Andika nhúng sẵn (đủ dấu, chữ "a" một tầng như chữ viết tay); chuẩn hoá Unicode NFC khi chấm |
| Phản hồi ngay, tử tế | Chấm ngay khi bấm "Kiểm tra"; sai → màu cam (không đỏ gắt) + câu động viên + gợi ý; thử lại 1 lần, sai lần 2 thì tự mở lời giải |
| Ít chữ | Lý thuyết "Nhớ nhanh" ngắn + ví dụ đặt tính; lời giải hiện **từng bước** theo nhịp bé bấm |
| Âm thanh | Âm đúng/sai/hoàn thành tự tổng hợp (không vướng bản quyền) + rung nhẹ trên điện thoại |
| Phụ huynh tách riêng | Khu phụ huynh sau **cổng phụ huynh** (phép nhân hai chữ số người lớn mới tính được). Mua VIP, đăng nhập, xoá dữ liệu chỉ có trong đó |
| Trợ năng | Nhãn đọc màn hình cho ô trống, lựa chọn, thẻ chủ đề (test kiểm tra thẻ được đọc là "nút") |

## Các lớp

```
UI (Flutter)                    lib/ui/        màn hình bé, khu phụ huynh, lời giải từng bước
  ↓
Logic thuần Dart (test được)    lib/logic/     chấm bài, phiên luyện tập, đề thi, huy hiệu, tự kiểm tra toán
  ↓
Model + đọc JSON                lib/models/    Bài Toán, Bài học, Đề thi, Tiến độ (+ gộp hai máy)
  ↑
Services                        lib/services/  nội dung (đóng gói → bản tải về), Hive, âm thanh, API, đồng bộ, mua VIP
  ↕ HTTPS (tuỳ chọn, --dart-define=API_BASE_URL)
Backend                         server/        Node.js + Express + PostgreSQL + CMS
```

- **Offline trước**: nội dung đóng gói sẵn; tiến độ lưu Hive (Android/iOS: file, web: IndexedDB).
  Có máy chủ thì đồng bộ nền khi mở app; mất mạng bé vẫn học bình thường.
- **Gộp tiến độ** khi bé học trên nhiều máy: sao/điểm lấy cao nhất, ngày học & đề thi gộp lại, huy hiệu giữ
  ngày nhận sớm nhất. Cùng một quy tắc ở `lib/models/progress.dart` và `server/src/merge.js` (đều có test).
- **VIP**: biên lai mua hàng luôn do máy chủ xác minh; app không tự mở VIP. Bài/đề VIP bị máy chủ chặn (403)
  nếu tài khoản chưa VIP.
- **Điểm thưởng** chống "cày": làm lại bài chỉ được phần điểm vượt kỷ lục + 1 điểm/câu đúng; thi lại được
  phần vượt kỷ lục × 5 + 2 điểm chăm chỉ.

## Đã kiểm chứng trong môi trường phát triển

- `flutter analyze`: không lỗi. `flutter test`: 75 test (chấm bài, chuẩn hoá số, toán trong nội dung,
  phiên luyện tập, đề thi, huy hiệu, gộp tiến độ, đồng bộ với máy chủ giả, các màn hình chính).
- Backend: 62 test trên PostgreSQL 16 thật; `tool/e2e_api_check.dart` chạy app-client ↔ server thật: khớp.
- Bản web build release, chạy qua chính server Babelisa trên máy phát triển, chơi thử bằng Chromium khổ
  360px và 390px (chọn sách, luyện tập, lời giải từng bước, thi thử, kết quả, tải lại vẫn giữ tiến độ).

## Chưa kiểm chứng được (cần máy/thông tin của chủ dự án)

- Chạy trên **điện thoại Android/iOS thật** và build `.apk`/`.ipa` (môi trường này không có Android SDK/Xcode).
- **Mua VIP thật**: cần tạo gói trong App Store Connect / Google Play Console và viết phần xác minh với
  Apple/Google trong `server/src/iap.js` (`verifyWithStore`, đang trả 501 khi chưa cấu hình).
- Bước chạy trên Windows trong README (viết theo hướng dẫn chính thức, chưa chạy trên Windows).
- Tên và số thứ tự chủ đề trong `catalog.json` cần đối chiếu với SGK thật.

## Việc chủ dự án cần làm trước khi phát hành

1. Chọn **tên chính thức** (hiện là tên tạm "Ong Vàng Toán 3") và đổi mã ứng dụng `vn.ongvang.toan_lop_3` nếu muốn.
2. Tài khoản Google Play Developer và Apple Developer; tạo 2 gói đăng ký `vn.ongvang.toan3.vip_month`, `vn.ongvang.toan3.vip_year`.
3. Thuê máy chủ có PostgreSQL (Hostinger VPS hoặc tương tự), đặt `ADMIN_TOKEN` ngẫu nhiên, khoá xác minh Apple/Google.
4. Chính sách quyền riêng tư cho app trẻ em (Google Play "Families", Apple "Kids Category").
5. Nhập thêm nội dung qua CMS `/admin` (mỗi bài được kiểm tra schema + toán trước khi lưu).

## Lộ trình

| Phase | Nội dung | Trạng thái |
|---|---|---|
| 1 | Schema dữ liệu + bài mẫu + QuizScreen (4 dạng bài) + lời giải | Xong |
| 2 | Bộ sách → Chủ đề → Bài học, trang chủ của bé, khu phụ huynh | Xong |
| 3 | Lời giải từng chữ số, đề kiểm tra có đồng hồ, tự chấm, báo cáo kỹ năng yếu | Xong |
| 4 | Điểm, huy hiệu, chuỗi ngày; API Node.js + PostgreSQL; CMS; mua VIP | Xong phần code; còn bước cấu hình cửa hàng/máy chủ ở trên |
