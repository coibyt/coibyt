# Sói Taiga · Võ Đặc Công Thực Chiến

Trò chơi học võ tự vệ, thể lực và kỹ năng dã ngoại qua **video từng bước** với HLV Alexei (nhân vật hư cấu).
Chạy trên web, ưu tiên điện thoại, chơi được cả khi không có mạng. Không cần máy chủ: chỉ là các file tĩnh.

## Chạy thử trên máy
```bash
cd vo-dac-nhiem && python3 -m http.server 8765
```
Mở http://localhost:8765

## Cấu trúc
- `index.html`, `css/app.css`, `js/*.js`: ứng dụng (không cần build).
- `content/track-*.json`: giáo trình (bước, lời giảng, điểm cần nhớ, lỗi hay gặp, bài tập theo nhịp, câu hỏi, mô tả cảnh quay).
- `content/lines-vi.json`: câu thầy nói ở các màn hình. `content/tracks-vi.json`: các nhánh huấn luyện.
- `assets/voice/vi/`: giọng thầy (11max, giọng VânCa) + `manifest.json`.
- `assets/video/`, `assets/img/`: clip từng bước (Kie.ai Kling 2.6), ảnh (Kie.ai Nano Banana Pro).
- `sw.js`: chạy offline (sinh bằng `tools/build_sw.py`).

## Tạo tài nguyên (khoá API đặt trong biến môi trường, không ghi vào code)
- `KIE_API_KEY`, `MAX11_API_KEY`.
- Ảnh nhân vật / bìa: `python3 tools/art.py <tên>`
- Ảnh khung + clip từng bước: `python3 tools/shots.py content/track-tay-khong.json`
- Giọng: `python3 tools/voice.py vi` (chỉ thu câu mới hoặc câu đã đổi chữ)
- Nén cho web: `python3 tools/finish.py`, rồi `python3 tools/build_sw.py`
- Kiểm tra tự động (Playwright): `node tools/check.mjs http://127.0.0.1:8765/ <thư-mục-ảnh>`

## Thêm ngôn ngữ
Chép khối `vi` trong `js/i18n.js`, dịch; thêm `content/lines-<lang>.json`, `content/tracks-<lang>.json`,
bản dịch giáo trình, rồi thu giọng `python3 tools/voice.py <lang>`.

## An toàn nội dung
Nội dung mang tính thể thao, tự vệ, rèn luyện thể lực. Mọi bài tập đôi đều tập chậm, có tín hiệu dừng, tập trên đệm,
có người hướng dẫn. Không có kỹ thuật gây sát thương, không phù hiệu/cờ của đơn vị có thật, không người thật.
