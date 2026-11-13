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
