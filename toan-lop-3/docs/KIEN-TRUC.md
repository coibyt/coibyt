# Kiến trúc — Ong Vàng Toán 3

## Nguyên tắc UX cho bé lớp 3 (8–9 tuổi)

| Nhu cầu | Cách làm trong app |
|---|---|
| Câu lệnh ngắn | `instruction` ≤ 40 ký tự (schema + model chặn), đề bài chữ to 26 |
| Nút to, dễ chạm | Nút chính cao ≥ 64dp, bàn phím số riêng (không dùng bàn phím hệ thống) |
| Dấu tiếng Việt hiển thị chuẩn | Font Andika nhúng sẵn (đủ dấu, chữ "a" giống chữ viết tay); chuẩn hoá Unicode NFC khi chấm |
| Phản hồi ngay, tử tế | Chấm ngay khi bấm "Kiểm tra"; sai → màu cam (không đỏ gắt) + câu động viên + gợi ý; được thử lại 1 lần |
| Ít chữ | Lý thuyết dạng "Nhớ nhanh" ngắn + ví dụ đặt tính; lời giải từng bước đánh số |
| Âm thanh | `SoundService` (Phase 1: âm hệ thống + rung; Phase 4: file âm thanh thật) |
| Phụ huynh tách riêng | Khu phụ huynh có "cổng phụ huynh" (phép tính người lớn), bé không vào được phần mua VIP/cài đặt |

## Các lớp

```
UI (Flutter widgets)            lib/ui/
  ↓ gọi
Logic thuần Dart (test được)    lib/logic/   — chấm bài, phiên làm bài, đề thi, điểm/huy hiệu
  ↓ dùng
Model + đọc JSON                lib/models/
  ↑ nạp bởi
Services                        lib/services/ — nội dung (asset → cache → API), tiến độ, âm thanh, VIP
  ↕ (Phase 4)
Backend Node.js + PostgreSQL    toan-lop-3/server/
```

## Lộ trình

| Phase | Nội dung |
|---|---|
| 1 | Schema dữ liệu + bài mẫu + QuizScreen (4 dạng bài) + lời giải từng bước |
| 2 | Chọn bộ sách → Chủ đề → Bài học, trang chủ của bé, xem lý thuyết, khu phụ huynh |
| 3 | Lời giải hiện từng chữ số (đặt tính động), đề kiểm tra có đồng hồ, tự chấm, báo cáo kỹ năng yếu |
| 4 | Điểm, huy hiệu, chuỗi ngày học; API Node.js + PostgreSQL (đồng bộ, VIP, tải đề, CMS); mua VIP (IAP) |
