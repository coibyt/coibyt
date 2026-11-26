# BizStory English

Mỗi ngày một podcast khoảng **2 giờ**: ba câu chuyện kinh doanh cuốn hút (phim nhiều tập, case study có thật,
tài chính và tâm lý), cộng 15 phút ôn tập. Người Việt **học tiếng Anh chỉ bằng cách nghe** trong lúc làm việc.

```
Ngày (~120 phút)
├─ Mở đầu (1 phút)
├─ Phần 1 · Phim kinh doanh, mùa 5 tập (35′): "Previously…" → Lớp 1 → Lớp 2 → Lớp 3
├─ Phần 2 · Case study có thật (35′):         Lớp 1 → Lớp 2 → Lớp 3
├─ Phần 3 · Tài chính & Tâm lý (35′):         Lớp 1 → Lớp 2 → Lớp 3
└─ Phần 4 · Ôn tập SRS (15′): cụm đến hạn (1-3-7-14 ngày) + cụm mới hôm nay

Lớp 1 (15′) người dẫn kể tiếng Việt, cài 6–8 cụm: EN 0.85× → 2 s → EN 1.0× → giải thích sắc thái
Lớp 2 (8′)  luyện nhanh: ngữ cảnh tiếng Việt → EN 0.85× → 2,5 s → EN 1.0× → 2 câu ví dụ
Lớp 3 (12′) kể lại / đối thoại 100% tiếng Anh, dùng lại mọi cụm
Giữa các lớp có tiếng chuông nhẹ (tự tổng hợp, bản quyền gốc).
```

## Cài đặt (máy dựng audio: máy anh, VPS hoặc GitHub Actions)

Cần Python 3.11+ và ffmpeg.

```bash
cd bizstory-english
```

```bash
pip install -r requirements.txt
```

```bash
cp .env.example .env
```

Điền khoá vào `.env` (file này không lên git): `ANTHROPIC_API_KEY` (hoặc `OPENAI_API_KEY` + `LLM_PROVIDER=openai`),
`MAX11_API_KEY`, `KIE_API_KEY`. Trên cloud của Claude Code, proxy đã tự chèn khoá 11max và kie.ai; khoá LLM thì
anh tự thêm trong phần cài đặt môi trường.

## Dùng hằng ngày

```bash
python -m bizstory daily
```

Lệnh trên chạy cả ba bước: viết kịch bản bằng LLM (kiểm tra, sai thì viết lại) → nhập SQLite → dựng MP3 → xuất web.
Có thể chạy từng bước:

```bash
python -m bizstory generate-day                 # viết kịch bản ngày mới → content/days/day_XX/
python -m bizstory render 2 --dry-run           # ước tính thời lượng + credit 11max, KHÔNG tốn tiền
python -m bizstory render 2 --short-test        # bản nháp ~3 phút để nghe thử giọng và mạch truyện
python -m bizstory render 2                     # bản đầy đủ ~2 giờ (thêm --max-credits 50000 để chặn chi)
python -m bizstory export-site                  # xuất site/ để đưa lên Hostinger
python -m bizstory serve                        # xem web tại http://localhost:8000
```

Lệnh khác: `validate`, `import-day`, `due`, `status`, `calibrate` (đo lại tốc độ đọc), `rebuild-db`, `images`.

## Kết quả mỗi ngày (`output/day_XX/`)

| File | Nội dung |
|---|---|
| `day_XX.mp3` | MP3 mono 64 kbps, đã chuẩn hoá −16 LUFS (EBU R128), có chương ID3 cho app podcast |
| `day_XX_transcript.md` | Lời thoại có mốc thời gian, bảng cụm từ, nguồn kiểm chứng |
| `day_XX.vtt` | Phụ đề WebVTT |
| `day_XX.chapters.json` | Chương theo phần/lớp |
| `day_XX.json` | Dữ liệu cho trình phát web (segment, thời điểm, cụm từ) |
| `phrases/*.mp3` | Clip từng cụm (1.0× và 0.85×) để bấm nghe |

## Chi phí 11max (đo thật, ngày 1)

- `eleven_flash_v2_5`: **0,5 credit/ký tự** (29 ký tự → 15 credit).
- Mỗi câu chỉ thu **một lần cho mỗi giọng**, cache theo hash trong `cache/tts/`. Câu lặp lại (cụm ở Lớp 1, Lớp 2,
  Phần 4) dùng lại clip. Bản 0.85× làm bằng ffmpeg `atempo`, không tốn credit.
  `SLOW_MODE=tts` cho 11max đọc chậm thật (tự nhiên hơn, tốn thêm khoảng 1–2%).
- Luôn chạy `--dry-run` trước để xem `credits_new_est`.
- **Ngày 1 đo thật:** 91.741 ký tự cần thu, khoảng 45.900 credit cho một ngày đầy đủ, thời lượng thật **121,75 phút**,
  MP3 58,4 MB, dựng mất 15 phút (6 luồng 11max). Bản `--short-test` khoảng 4 phút, tốn khoảng 2.000 credit.

## Kiến trúc

```
bizstory/
  config.py      đường dẫn, .env, giọng (config/voices.json), tốc độ đọc đã hiệu chỉnh
  db.py          SQLite: series, episodes, phrases (SRS), days, reviews
  script.py      định dạng kịch bản → kiểm tra → biên dịch thành segment chuẩn
                 {"speaker","speed","pause_ms","text"} + thời lượng ước tính
  llm.py         Claude (mặc định claude-opus-5-5) hoặc OpenAI, theo LLM_PROVIDER
  generate.py    lên kế hoạch mùa, viết từng phần, chạy lại khi sai, tóm tắt 3 dòng → series.previous_summary
  tts.py         11max (tương thích ElevenLabs): cache, song song, đo LUFS, ghi sổ credit (data/credits.jsonl)
  audio.py       pydub + ffmpeg: khoảng lặng chính xác, chuông, loudnorm 2 lượt, MP3 + chương
  render.py      dựng cả ngày, --dry-run / --short-test, transcript/VTT/JSON, cập nhật SRS
  export.py      xuất web tĩnh
  images.py      ảnh bìa kie.ai (Nano Banana Pro)
  web/           FastAPI + trình phát PWA (static/)
  prompts/style_guide.md   hướng dẫn viết (cho cả người và LLM)
content/days/day_XX/  day.json, part1..3.json, review.json  ← kịch bản (có trong git)
config/voices.json    giọng 11max của từng vai
output/, cache/, data/   MP3, clip, SQLite (KHÔNG lên git)
```

## Video dọc cho TikTok / YouTube / Học viện VaraaAi

```bash
python -m bizstory video 1
```

Tạo trong `output/day_XX/video/` các video 1080×1920 (một ảnh tĩnh và âm thanh, kiểu podcast):
`day_XX_phan_1..4.mp4` (mỗi phần dưới 60 phút, vừa giới hạn của TikTok) và `day_XX_tron_bo.mp4` (cả ngày, cho YouTube
và Học viện). Ảnh đại diện có tên tập và các cụm tiếng Anh. Cuối mỗi video có khoảng 20 giây thẻ "Học viện VaraaAi ·
varaaai.com/vi/academy" và "Video được chia sẻ bởi Babelisa", kèm lời giới thiệu của người dẫn.
Ảnh được dựng bằng Playwright (Node), hình lặp bằng stream copy nên video 2 giờ chỉ mất vài phút.

## Trình phát web

Thiết kế cho điện thoại trước: phát nền khi khoá màn hình, điều khiển trên màn hình khoá (Media Session:
phát/dừng, ±15/30 giây, chương trước/sau), tự nhớ vị trí nghe, chương theo phần/lớp, tốc độ 0.8–1.5×, hẹn giờ tắt
(10–60 phút hoặc hết chương), kho các ngày, lời thoại chạy theo giọng, bấm cụm vàng để nghe riêng, sổ tay cụm từ
có tự kiểm tra SRS, chuỗi ngày và số phút nghe. Tiến độ lưu trong trình duyệt. Khi chạy bằng
`python -m bizstory serve`, kết quả tự kiểm tra được ghi thêm vào SQLite.

## Đưa lên Babelisa (đang dùng)

Bản thử đang chạy tại **https://babelisa.com/lab/bizstory-g2dta9/** (không cho Google lập chỉ mục).

```bash
bash scripts/deploy_babelisa.sh bizstory-g2dta9 ../../babelisa
```

Sau đó trong repo babelisa: `git add public/lab/bizstory-g2dta9 && git commit -m "..." && git push`. Hostinger tự deploy.
Mỗi ngày thêm khoảng 58 MB MP3 vào repo babelisa. Khi đã có nhiều ngày, nên chuyển MP3 sang thư mục media riêng trên
Hostinger (tải bằng FTP/SSH, không qua git) để repo không phình to.

## Đưa lên Hostinger (thư mục tĩnh bất kỳ)

1. Chạy `python -m bizstory export-site` trên máy dựng.
2. Tải nội dung `site/` lên một thư mục, ví dụ `public_html/bizstory/` hoặc subdomain `bizstory.<tên miền>`.
   MP3 nằm trong `site/media/` (khoảng 58 MB mỗi ngày).
3. Không cần Python trên Hostinger: trang là HTML/JS tĩnh.

## Quy tắc nội dung

- Case study dùng sự kiện có thật đã được ghi nhận. Không bịa trích dẫn hay con số. Cảnh dựng lại được nói rõ
  trên sóng. Có `fact_check.sources` trong kịch bản và bảng nguồn trong transcript.
- "Mưu lược" chỉ dạy cách làm hợp pháp và có đạo đức. Kể về lừa đảo chỉ để nhận diện và tự bảo vệ.
- Cụm tiếng Anh phải tự nhiên, dùng được ngay ở công việc. Nghĩa tiếng Việt phải chính xác.
