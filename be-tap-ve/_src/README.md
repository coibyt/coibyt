# Studio Sáng Tạo Nhí – nguồn để sửa tiếp

- `src_index.html`: mã nguồn game (HTML + CSS + JS). `assets.json`: ảnh/giọng nhúng sẵn. `python3 build.py` → `../index.html`.
- Lớp học Ba lê: mã ở mục "27. Lớp học Ba lê" trong `src_index.html`; dữ liệu ảnh tải riêng `../be-tap-ve-ballet.js`
  do `build_ballet.py` tạo (cần sửa đường dẫn SP/FS trong script cho phù hợp).
- `ballet_raw/`: ảnh gốc kie.ai (thu nhỏ JPEG): `b_<tư thế>` (18 tư thế, nền xám), `bc_<váy>_<tư thế>` (váy tutu), `tch_*` (cô Vy),
  `kie_urls.json`: URL gốc trên kie.ai (dùng làm ảnh tham chiếu `image_input` khi tạo ảnh mới, có thể hết hạn).
- `ballet_layers/`: lớp đã tách (`bp_<tư thế>_base.png`, `<tư thế>.<váy>.png`) + `meta.json` (x, y, w, h ở tỉ lệ 0,42).
- `proc.py` + `ballet_layers_cfg.json`: tách lớp quần áo bằng cách so ảnh có váy với ảnh gốc (khác biệt điểm ảnh); tóc dùng
  "chroma" (tóc màu xanh lá chroma-key). `kie.py`: gọi kie.ai (proxy tự gắn khoá). `tts_models.py`: giọng 11max
  (khoá lấy từ biến môi trường MAX11_API_KEY, proxy tự gắn; giọng cô Vy = "trang_slow").
- Bản trên babelisa: `babelisa/public/be-tap-ve.html` = `index.html` + `<meta name="robots" content="noindex, nofollow">`
  sau `<meta charset>` + `<script src="/js/course-nav.js" defer></script>` trước `</head>` (đừng làm mất 2 dòng này).

## Ba lê v2 (phòng thay đồ mới + video bài học)
- Tải ảnh gốc độ phân giải cao từ `ballet_raw/kie_urls.json` vào thư mục `full/` (hoặc đặt `BALLET_FULL`), rồi:
  `python3 ballet2_proc.py` (tách nền: toàn thân từng tư thế + váy pink/swan/fairy, mặt nạ váy (đỏ) & tóc (xanh lá), khớp đầu
  giữa các tư thế, tách vương miện/lông/vòng hoa) → `python3 ballet2_build.py` → `be-tap-ve-ballet.js` (chép vào `../`).
- Váy mới (kẹo ngọt, thiên nga đen, Lọ Lem, anh đào, hướng dương, bông tuyết, hồng ngọc) = váy thật được nhuộm lại + in hoạ tiết
  (vẽ trong game, `BCOS` trong `src_index.html`). Kiểu tóc tết/xoăn/ngọc trai = ghép từ mẫu tóc búi thật, theo khung đầu `T`.
- Giọng mới: `ballet2_tts.py` (đọc `miss.json` = danh sách câu thiếu, giọng trang_slow).
- Kiểm thử: mở `index.html?qa=1#ba-le` → `window.Ballet` (`_fig(tư thế, {cos, hair, ...})`).

## Video bài học thật (kie.ai)
- Khung hình: `vf_<tư thế>` (bạn Na trong phòng tập, nano-banana-pro; job ở `ballet_video_frames_jobs.json`, URL trong `ballet_raw/kie_urls.json`).
- Đoạn chuyển động A→B: Kling 2.5 Turbo Pro (`kling/v2-5-turbo-image-to-video-pro`, có `tail_image_url`; bản 2.1 pro báo lỗi khi có ảnh cuối),
  `python3 kie_video.py ballet_video_jobs.json`. Cô Vy: `tv_talk` (10 s) và `tv_clap` (5 s) từ ảnh `tch_*`.
- `ballet_video_enc.sh NGUỒN ../be-tap-ve-ballet-video` → mp4 "đi rồi về" (A→B→A) 720 px, không tiếng. Game phát theo bước (`VPAIRS` trong
  `src_index.html`): lặp khi cô giảng, khớp 8 nhịp khi đếm, dừng ở tư thế cuối; thiếu video thì quay về ảnh tĩnh như cũ.
- Bản nền tối (đang dùng): khung `vd_*` (đổi nền từ `vf_*`), đoạn Kling `ballet_video_jobs_dark.json` (`w_*` → đổi tên `v_*` rồi chạy `ballet_video_enc.sh`).
- Bài học chạy liền, không hỏi; cả bài lặp 3 lần (`ROUNDS`) rồi mới xong, tự sang bài sau.

## Nhạc ba lê (Suno qua kie.ai)
- `ballet_music_suno.py` tạo nhạc (không lời); `ballet_music_bpm.py` đo nhịp (BPM) và điểm phách đầu → bảng `TR` trong `BMusic`.
- Tệp: `../be-tap-ve-music/ballet_{bg,count,jump,stage}.mp3` (mono 64 kbps). Nhạc nền nhỏ dần khi cô Vy nói; khi đếm, phát nhạc gióng múa
  và đếm đúng phách nhạc; sân khấu dùng nhạc dàn nhạc. Đổi tệp nhớ tăng `STUDIO_VER`.
