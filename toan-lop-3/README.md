# Ong Vàng Toán 3 (tên tạm)

App học Toán lớp 3 cho bé 8–9 tuổi: lý thuyết, luyện tập, đề kiểm tra theo SGK Việt Nam.
Flutter (Android + iOS + web để chơi thử).

> Thư mục này độc lập với app VaraaAi ở gốc repo — không dùng chung code, cấu hình hay triển khai.

- Cấu trúc dữ liệu Bài Toán: [`docs/CAU-TRUC-DU-LIEU.md`](docs/CAU-TRUC-DU-LIEU.md)
- Kiến trúc & lộ trình: [`docs/KIEN-TRUC.md`](docs/KIEN-TRUC.md)

## Chạy thử trên laptop Windows 10 (4 GB RAM)

Máy 4 GB RAM **không nên** chạy máy ảo Android (emulator). Cách nhẹ nhất là chạy bản web
trong Chrome, hoặc cắm điện thoại Android thật qua cáp USB.

### Bước 1 — Cài công cụ (làm một lần)

1. Cài **Git for Windows**: https://git-scm.com/download/win (bấm Next đến hết).
2. Tải **Flutter SDK** bản stable cho Windows: https://docs.flutter.dev/get-started/install/windows
   (file `.zip`). Giải nén vào `C:\src\flutter` — **không** để trong `C:\Program Files`.
3. Thêm Flutter vào PATH: bấm phím Windows → gõ `env` → "Edit the system environment variables" →
   Environment Variables → ở mục *User variables* chọn `Path` → Edit → New → gõ `C:\src\flutter\bin` → OK.
4. Đóng mọi cửa sổ PowerShell, mở cửa sổ mới, kiểm tra:

```bash
flutter --version
```

   Cần **Flutter 3.35 trở lên** (đã thử với 3.47.9).

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

### Bước 3 — Chạy

```bash
flutter pub get
```

```bash
flutter run -d chrome
```

Lần đầu mất vài phút. Chrome tự mở app. Bấm `r` trong cửa sổ lệnh để nạp lại sau khi sửa code, `q` để thoát.

**Chạy trên điện thoại Android thật** (đẹp và đúng cảm giác nhất): bật *Tuỳ chọn nhà phát triển* →
*Gỡ lỗi USB* trên điện thoại, cắm cáp, cài Android Studio (chỉ cần để có Android SDK), rồi:

```bash
flutter devices
```

```bash
flutter run
```

### Bước 4 — Chạy kiểm thử

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

## Thư mục

```
schema/                      JSON Schema của nội dung (v1)
assets/content/              catalog.json + lessons/*.json (+ exams/ từ Phase 3)
assets/fonts/                Font Andika (OFL) — dễ đọc, đủ dấu tiếng Việt
lib/models/                  Model Dart + fromJson có báo lỗi theo đường dẫn
lib/logic/                   Chấm bài, chuẩn hoá số, tự kiểm tra toán, phiên làm bài
lib/services/                Nạp nội dung, âm thanh (giữ chỗ)
lib/ui/                      Màn hình & widget
test/                        Unit test + widget test
tool/validate_content.py     Kiểm tra JSON theo schema
```
