# Nghe Tiếng Anh Mỗi Ngày

Mỗi ngày tạo tự động một chương trình nghe tiếng Anh khoảng 2 giờ cho người Việt. Chương trình dùng để nghe nền trong lúc làm việc, có trang web phát nhạc đẹp, dùng tốt trên điện thoại.

Dự án độc lập, không liên quan đến VaraaAi ở thư mục gốc.

## Một ngày gồm gì

| Phần | Nội dung | Thời lượng (ngày mẫu) |
|---|---|---|
| 1 · 15 cụm từ mới | Mỗi cụm: nghĩa Việt → Anh 0.85x → nghỉ 2 giây → Anh 1.0x → khoảng lặng nói theo → 2 câu ví dụ (chậm, Việt, thường). Phát 2 lượt. | 23 phút |
| 2 · Hội thoại | 2 đoạn dùng đủ 15 cụm. Bốn vòng: song ngữ từng câu → chỉ Anh, chậm, nhại theo → tự nhiên ×2 → đóng vai (người học nói trước, nghe câu mẫu sau) → tự nhiên lần cuối. | 40 phút |
| 3 · Nghe mở rộng | 100% tiếng Anh: truyện ngắn, podcast 2 người, độc thoại. Mỗi bài phát 3 lần (0.85x, 1.0x, 1.0x). | 26,5 phút |
| 4 · Ôn tập | Anh → 3 giây tự nhớ → Việt. Gồm các cụm đến hạn theo SRS (1-3-7-14-30-60 ngày), rồi đến cụm và ví dụ của hôm nay. | 20 phút |

Ngày mẫu (27/11/2026) dài **109 phút**, file MP3 mono 48 kbps nặng 39 MB.

## Cấu trúc

```
content/days/YYYY-MM-DD.json   nội dung từng ngày (nguồn gốc, có trong git)
content/narration.json         lời dẫn tiếng Việt (tổng hợp 1 lần, dùng lại mãi)
content/topics.json            kho 41 chủ đề · prefs.json: trình độ, chủ đề, độ dài
content/writer_prompt.md       hướng dẫn cho Claude khi viết bài mới
engine/                        Python: kịch bản → TTS → MP3 + phụ đề
  config.json                  giọng, tốc độ, khoảng lặng, lịch SRS, preset 1h / 1h30 / 2h
  nghe/script.py               dựng kịch bản 4 phần
  nghe/tts.py                  11max (chính) · edge-tts (dự phòng, miễn phí) · cache theo hash
  nghe/audio.py                cắt lặng, cân âm lượng, 0.85x bằng rubberband, nối, MP3
  nghe/qa.py                   nghe lại từng clip bằng speech-to-text, bắt clip đọc sai
  nghe/db.py                   SQLite: bài, cụm từ, lịch ôn (tự tạo lại được)
  nghe/writer.py               Claude API viết bài mới (JSON có kiểm tra)
  nghe/art.py                  ảnh bìa kie.ai
web/                           trang web (Vite + React), PWA
  public/days/<ngày>/          day.json, audio.mp3 (không vào git), subs.vtt/.srt, cover.jpg
scripts/deploy.sh              đưa web + bài lên Hostinger bằng rsync
ci/daily.yml                   mẫu job chạy mỗi đêm (chưa bật)
```

## Lệnh

```bash
cd engine
pip install -r requirements.txt anthropic       # cần thêm ffmpeg có rubberband (Ubuntu: apt install ffmpeg)
python -m nghe estimate 2026-11-27              # độ dài + số credit 11max (chưa tốn gì)
python -m nghe build 2026-11-27                 # dựng MP3 + phụ đề + day.json
python -m nghe build 2026-11-27 --tts edge      # dùng giọng miễn phí
python -m nghe qa 2026-11-27 --fix              # kiểm tra nghe, xoá clip lỗi để dựng lại
python -m nghe art 2026-11-27                   # ảnh bìa
python -m nghe daily                            # cả quy trình cho ngày kế tiếp (viết → dựng → kiểm tra → ảnh)
python -m nghe import-taps nghe-taps.json       # đưa kết quả “Biết rồi / Chưa nhớ” từ web vào lịch ôn của audio
cd ../web && npm install && npm run dev         # chạy web trên máy
```

## Khoá API (biến môi trường, không bao giờ commit)

- `MAX11_API_KEY`: 11max. Mã gửi qua header `xi-api-key` giống ElevenLabs; nếu 11max dùng header khác thì sửa ở `engine/nghe/tts.py`.
- `KIE_API_KEY`: kie.ai.
- `ANTHROPIC_API_KEY`: Claude API viết bài mới. `NGHE_WRITER_MODEL=claude-sonnet-5-5` để rẻ hơn một nửa.

## Chi phí mỗi ngày (đo từ ngày mẫu)

- **11max:** khoảng 18.500 ký tự, tức 18.500 credit cho ngày đầu (có lời dẫn cố định). Các ngày sau khoảng 17.000 credit, vì lời dẫn và clip ôn tập đã có trong cache. Kiểm tra STT tốn thêm vài trăm credit.
- **Claude Opus 5.5:** khoảng 0,5 USD/ngày (Sonnet 5.5 khoảng 0,25 USD/ngày).
- **kie.ai:** khoảng 4 credit cho mỗi ảnh bìa.
