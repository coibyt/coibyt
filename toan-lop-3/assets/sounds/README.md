# Âm thanh (chỗ trống — Phase 1)

Phase 1 chưa có file âm thanh thật. `lib/services/sound_service.dart` đang dùng
âm "click" của hệ thống + rung nhẹ để giữ chỗ.

Khi có âm thanh thật (Phase 2/4), đặt các file sau vào thư mục này rồi thay
`PlaceholderSoundService` bằng bản dùng gói `audioplayers`:

| File            | Khi nào phát                  | Gợi ý                      |
|-----------------|-------------------------------|----------------------------|
| `correct.mp3`   | Bé trả lời đúng               | Tiếng "ting" vui, < 1 giây |
| `wrong.mp3`     | Bé trả lời chưa đúng          | Âm nhẹ nhàng, KHÔNG gắt    |
| `tap.mp3`       | Chạm nút / thả thẻ số         | Rất ngắn                   |
| `finish.mp3`    | Hoàn thành bài                | Vỗ tay ngắn                |

Chỉ dùng âm thanh tự làm hoặc có giấy phép rõ ràng (CC0 / mua bản quyền).
