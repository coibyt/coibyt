# Ong Vàng Toán 3 (tên tạm)

App học Toán lớp 3 cho bé 8–9 tuổi: lý thuyết, luyện tập, đề kiểm tra theo chương trình SGK Việt Nam
(bộ Kết nối tri thức; Chân trời sáng tạo đã có chỗ trong mục lục). Flutter cho Android, iOS và web
(web dùng để chơi thử), backend Node.js + PostgreSQL.

> Thư mục này độc lập với app VaraaAi ở gốc repo: không dùng chung code, cấu hình hay triển khai.

| Tài liệu | Nội dung |
|---|---|
| [`docs/CAU-TRUC-DU-LIEU.md`](docs/CAU-TRUC-DU-LIEU.md) | Cấu trúc dữ liệu Bài Toán / Bài học / Đề thi (schema v1.1) |
| [`docs/KIEN-TRUC.md`](docs/KIEN-TRUC.md) | Kiến trúc, UX cho bé, việc đã làm / chưa làm, việc cần chủ dự án làm |
| [`server/README.md`](server/README.md) | Chạy backend, CMS soạn đề, API |

## Đã có gì (4 phase)

1. **Bộ máy câu hỏi**: 4 dạng bài (trắc nghiệm, điền số bằng bàn phím số to, kéo thả, nối), chấm ngay,
   âm thanh đúng/sai, thử lại 1 lần kèm gợi ý, "Xem lời giải". Nội dung JSON có schema, app **tự kiểm tra toán**.
2. **Mục lục & điều hướng**: chọn bộ sách → chủ đề → bài học (Nhớ nhanh + Luyện tập), trang chủ của bé,
   khu phụ huynh có cổng phụ huynh, lưu tiến độ offline (Hive).
3. **Lời giải từng chữ số & thi thử**: đặt tính / chia đặt tính hiện từng bước (chữ số, số nhớ, thương, số hạ),
   đề kiểm tra có đồng hồ, tự nộp khi hết giờ, chấm điểm từng phần, báo cáo "con cần ôn thêm".
4. **Điểm, huy hiệu, chuỗi ngày**; tài khoản phụ huynh + đồng bộ nhiều máy; tải đề/bài mới từ máy chủ;
   mua VIP (App Store / Google Play, máy chủ xác minh); CMS nhập đề có kiểm tra toán.

## Chạy thử trên laptop Windows 10 (4 GB RAM)

Máy 4 GB RAM **không nên** chạy máy ảo Android. Cách nhẹ nhất: chạy bản web trong Chrome,
hoặc cắm điện thoại Android thật qua cáp USB.

### Bước 1 — Cài công cụ (làm một lần)

1. Cài **Git for Windows**: https://git-scm.com/download/win (bấm Next đến hết).
2. Tải **Flutter SDK** bản stable cho Windows: https://docs.flutter.dev/get-started/install/windows
   (file `.zip`). Giải nén vào `C:\src\flutter` — **không** để trong `C:\Program Files`.
3. Thêm Flutter vào PATH: bấm phím Windows → gõ `env` → "Edit the system environment variables" →
   Environment Variables → ở mục *User variables* chọn `Path` → Edit → New → gõ `C:\src\flutter\bin` → OK.
4. Đóng mọi cửa sổ PowerShell, mở cửa sổ mới, kiểm tra (cần **Flutter 3.44 trở lên**; đã thử với 3.47.9):

```bash
flutter --version
```

5. Cài **Google Chrome** nếu chưa có.

### Bước 2 — Lấy code

```bash
git clone https://github.com/coibyt/coibyt.git
```

```bash
cd coibyt
```

```bash
git checkout claude/awesome-shannon-qmbaff
```

```bash
cd toan-lop-3
```

### Bước 3 — Chạy app

```bash
flutter pub get
```

```bash
flutter run -d chrome
```

Lần đầu mất vài phút, Chrome tự mở app. Trong cửa sổ lệnh: `r` để nạp lại sau khi sửa code, `q` để thoát.
Bản chạy thế này là bản **debug**: khu phụ huynh có công tắc **VIP thử** (Khu phụ huynh → Nâng cấp VIP).

Trên điện thoại Android thật: bật *Tuỳ chọn nhà phát triển* → *Gỡ lỗi USB*, cắm cáp, cài Android Studio
(chỉ cần để có Android SDK), rồi:

```bash
flutter devices
```

```bash
flutter run
```

Bật đăng nhập + đồng bộ (khi backend đang chạy, xem `server/README.md`). Điện thoại thật thì thay
`localhost` bằng địa chỉ IP của laptop trong mạng Wi-Fi:

```bash
flutter run -d chrome --dart-define=API_BASE_URL=http://localhost:8080
```

### Bước 4 — Kiểm thử

```bash
flutter analyze
```

```bash
flutter test
```

Kiểm tra nội dung JSON theo schema (cần Python):

```bash
pip install jsonschema
```

```bash
python tool/validate_content.py
```

## Bản chơi thử trên web (Babelisa)

Bản web được đặt ở một đường dẫn riêng khó đoán trong mục `/lab/` của babelisa.com (không cho Google
lập chỉ mục, giống cách TraceLight đang làm). Build và chép sang repo Babelisa:

```bash
flutter build web --release --no-web-resources-cdn --base-href /lab/toan3-9yt2a3py/ --dart-define=ALLOW_DEV_VIP=true
```

```bash
tool/deploy_lab.sh toan3-9yt2a3py ../../babelisa
```

Script chép file vào `public/lab/<mã>/` và các file `.wasm` vào `lab-bin/<mã>/` (máy chủ Hostinger phục vụ
`.wasm` sai kiểu nếu để trong `public/`). Bản web chạy offline (chưa nối máy chủ), có công tắc VIP thử.
Khi muốn mở cho mọi người: đổi sang đường dẫn công khai và bỏ `ALLOW_DEV_VIP`.

## Thư mục

```
schema/                      JSON Schema nội dung (v1.1: catalog, lesson, exam)
assets/content/              catalog.json, lessons/*.json, exams/*.json
assets/fonts/                Font Andika (OFL) — dễ đọc, đủ dấu tiếng Việt
assets/sounds/               Âm thanh đúng/sai/hoàn thành, tự tổng hợp (tool/make_sounds.py)
lib/models/                  Model Dart + fromJson báo lỗi theo đường dẫn
lib/logic/                   Chấm bài, chuẩn hoá số, tự kiểm tra toán, phiên luyện tập, đề thi, huy hiệu
lib/services/                Nạp nội dung, lưu offline (Hive), âm thanh, API, đồng bộ, mua VIP
lib/ui/                      Màn hình bé, khu phụ huynh, lời giải từng bước
web/                         Trang khởi động web, icon (tool/make_icons.py)
test/                        Unit test + widget test (75 test)
tool/                        Kiểm tra nội dung, tạo âm thanh/icon, chép bản web sang Babelisa, kiểm tra API
server/                      Backend Node.js + PostgreSQL + CMS (62 test)
```
