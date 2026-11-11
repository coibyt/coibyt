# TraceLight (tên tạm) – ứng dụng đồ tranh qua camera

Điện thoại đóng vai "máy chiếu ảo": camera sau hiển thị tờ giấy thật, một bức
tranh bán trong suốt nằm đè lên trên, người dùng nhìn màn hình và đồ theo nét
lên giấy.

> Thư mục `ar-drawing/` là một dự án Flutter độc lập. Nó không dùng chung gì với
> ứng dụng web ở thư mục gốc của repo.

## Trạng thái: Phase 1–4 xong

| Phase | Nội dung | Trạng thái |
|---|---|---|
| 1 | Dựng dự án, màn hình Camera Workspace: camera sau toàn màn hình, ảnh mẫu đè lên, thanh chỉnh độ mờ | ✅ |
| 2 | Kéo / chụm zoom / xoay ảnh (2 ngón), khóa ảnh, đèn flash, căn giữa lại; bộ lọc biến ảnh màu thành nét (Canny) hoặc bút chì | ✅ |
| 3 | Quay time-lapse (camera + ảnh mẫu) ra MP4, lưu vào thư viện ảnh, chia sẻ; chọn ảnh từ thư viện máy | ✅ (chỉ bản app; bản web ẩn nút quay) |
| 4 | Màn hình chính, 24 mẫu gốc trong 6 chủ đề (Động vật, Anime, Chibi, Xe, Hoa, Đồ ăn cute), độ khó, nhãn PRO | ✅ |
| sau | Quảng cáo + mua trong app (mở khóa PRO, bỏ quảng cáo), tạo nét vẽ bằng AI từ câu mô tả, tiếng Việt | chưa làm |

### Bản web thử nghiệm

Bản web (Flutter web) chạy được trên trình duyệt điện thoại, có camera, thao tác chạm, bộ lọc nét và thư viện mẫu.
Quay time-lapse chỉ có ở bản app cài trên máy, vì cần bộ mã hoá video của điện thoại.
Build bằng `tool/build_web_lab.sh /lab/tracelight-xxxx/ <thư-mục-repo-babelisa>`. Script đặt trang vào
`public/lab/…` và tách các tệp `.wasm` sang `lab-bin/…`, vì máy chủ phía trước của Hostinger gắn `.wasm` là
`text/plain` (trình duyệt từ chối chạy, app kẹt ở màn hình chờ). `server.js` của Babelisa phục vụ `lab-bin/` với
đúng kiểu `application/wasm`.

## Công nghệ đã chốt: Flutter

- **Camera:** plugin chính thức `camera` (CameraX trên Android, AVFoundation trên iOS). Ảnh đè được vẽ bằng GPU (Skia/Impeller) nên mượt cả trên máy yếu.
- **Xử lý ảnh (Phase 2):** `opencv_dart` (OpenCV thật: Canny, adaptive threshold) hoặc gói `image` thuần Dart cho máy cấu hình thấp.
- **Time-lapse (Phase 3):** `CameraController.startVideoRecording` + ghép khung hình, hoặc chụp khung định kỳ rồi ghép bằng FFmpeg Kit.
- **Kiếm tiền:** `google_mobile_ads` và `in_app_purchase` đều là plugin do Google/Flutter duy trì.
- **Một codebase** cho Android và iOS, cùng ngôn ngữ Dart.

## Cấu trúc thư mục

```
ar-drawing/
├── lib/
│   ├── main.dart                    # khởi động, khóa màn hình dọc
│   ├── app.dart                     # MaterialApp, màn hình đầu tiên
│   ├── core/
│   │   ├── app_assets.dart          # đường dẫn ảnh mẫu
│   │   ├── app_strings.dart         # toàn bộ chữ hiển thị (sau này dịch đa ngôn ngữ)
│   │   └── app_theme.dart           # màu sắc riêng: nền mực + vàng "đèn bàn"
│   └── features/
│       ├── home/home_screen.dart    # màn hình chính: ảnh của bạn, chủ đề, lưới mẫu
│       ├── templates/template_catalog.dart  # danh sách 24 mẫu, chủ đề, độ khó, PRO
│       ├── sketch/
│       │   ├── sketch_filter.dart   # biến ảnh thành nét (Canny) / bút chì — Dart thuần, chạy nền
│       │   └── sketch_screen.dart   # xem trước, chọn kiểu, độ chi tiết
│       ├── timelapse/
│       │   ├── frame_converter.dart     # khung camera YUV/BGRA → RGBA, xoay đứng
│       │   ├── timelapse_composer.dart  # vẽ camera + ảnh mẫu đúng như trên màn hình
│       │   ├── timelapse_recorder.dart  # 2 giây lấy 1 khung, 15 khung/giây video
│       │   ├── video_encoder.dart       # mã hoá MP4 bằng phần cứng (không FFmpeg)
│       │   └── timelapse_result_screen.dart  # xem lại, lưu, chia sẻ
│       └── workspace/               # màn hình đồ tranh
│           ├── workspace_screen.dart     # camera, vòng đời, quyền, cử chỉ, khóa, flash, quay
│           ├── overlay_transform.dart    # vị trí / tỉ lệ / góc xoay của ảnh mẫu
│           ├── camera_status.dart        # trạng thái camera, phân loại lỗi quyền
│           └── widgets/                  # camera tràn màn hình, ảnh mẫu, thanh độ mờ, thanh công cụ
├── assets/templates/                # 24 mẫu nét vẽ gốc (nền trong suốt)
├── assets/branding/                 # logo trong app
├── web/                             # vỏ trang web (bản thử nghiệm)
├── tool/build_web_lab.sh            # build bản web gọn để đưa lên Babelisa
├── branding/                        # icon gốc 1024px + ghi chú nguồn gốc ảnh
├── test/                            # test tự động (chạy được không cần điện thoại)
├── android/  ios/                   # cấu hình nền tảng
└── pubspec.yaml
```

Giai đoạn kiếm tiền sẽ thêm `services/ads`, `services/purchases`.

## Cấu hình nền tảng đã làm

- **Android:** quyền `CAMERA`; `minSdk = 24` (Android 7.0, yêu cầu của CameraX); gỡ quyền micro mà plugin camera tự thêm (app không ghi âm); khai báo đèn flash là tùy chọn.
- **iOS:** `NSCameraUsageDescription`, `NSMicrophoneUsageDescription` (bắt buộc vì thư viện camera có mã micro, dù app không dùng); iPhone khóa dọc; iOS tối thiểu 15.0.
- **Quyền bị từ chối:** hiện màn hình giải thích, có nút "Try again" và "Open Settings". Khi người dùng bật quyền trong Cài đặt rồi quay lại app, camera tự mở lại.
- **Giữ màn hình sáng** trong lúc đồ (`wakelock_plus`), tắt khi app chạy nền.
- **Vòng đời:** app chạy nền thì nhả camera, quay lại thì mở lại. Nếu đang quay time-lapse thì video được đóng lại an toàn và hiện ra khi quay lại app.
- **Thư viện ảnh:** chọn ảnh dùng Photo Picker của hệ thống (Android không cần quyền); lưu video cần `WRITE_EXTERNAL_STORAGE` chỉ trên Android 10 trở xuống; iOS có `NSPhotoLibraryUsageDescription` và `NSPhotoLibraryAddUsageDescription`.

## Chạy thử trên điện thoại Android (máy Windows)

Laptop 4 GB RAM vẫn chạy được, nhưng **đừng mở trình giả lập (emulator)**,
vì nó cần rất nhiều RAM và cũng không có camera thật. Cắm điện thoại thật bằng
cáp USB.

### Bước 1 – Cài công cụ (làm một lần)

1. Cài **Git for Windows**: https://git-scm.com/download/win (bấm Next đến hết).
2. Cài **Flutter SDK** theo hướng dẫn chính thức: https://docs.flutter.dev/get-started/install/windows/mobile
   - Giải nén vào `C:\src\flutter` (không để trong `Program Files`).
   - Thêm `C:\src\flutter\bin` vào biến môi trường **Path**.
3. Cài **Android Studio** (https://developer.android.com/studio). Mở lên một lần để nó tải Android SDK.
   Trong *More Actions → SDK Manager → SDK Tools*, tick **Android SDK Command-line Tools** rồi bấm Apply.
4. Mở **PowerShell** và chạy:

```bash
flutter doctor --android-licenses
```

Gõ `y` cho mọi câu hỏi. Sau đó chạy:

```bash
flutter doctor
```

Dòng **Android toolchain** cần có dấu ✓. Các dòng Chrome / Visual Studio báo ✗ thì bỏ qua được.

### Bước 2 – Bật chế độ nhà phát triển trên điện thoại

1. *Cài đặt → Thông tin điện thoại* → chạm **7 lần** vào "Số hiệu bản tạo" (Build number).
2. *Cài đặt → Tùy chọn nhà phát triển* → bật **Gỡ lỗi USB** (USB debugging).
3. Cắm cáp, trên điện thoại bấm **Cho phép** khi được hỏi.
4. Kiểm tra máy tính đã thấy điện thoại:

```bash
flutter devices
```

### Bước 3 – Lấy mã nguồn và chạy

```bash
git clone https://github.com/coibyt/coibyt.git
```

```bash
cd coibyt
```

```bash
git checkout claude/gracious-einstein-rhs5b1
```

```bash
cd ar-drawing
```

```bash
flutter pub get
```

```bash
flutter run
```

Lần đầu mất 5–15 phút để Gradle tải thư viện. Đóng bớt Chrome cho đỡ tốn RAM.
Chọn một mẫu (hoặc "Trace your own photo"), app hỏi quyền camera, bấm **Cho phép**.
Đặt điện thoại phía trên tờ giấy (kê lên cốc hoặc chồng sách), chụm 2 ngón để chỉnh cỡ,
kéo để di chuyển, xoay 2 ngón để xoay, bấm ổ khóa để khóa, kéo thanh trượt để chỉnh độ mờ,
nút tròn đỏ để quay time-lapse.

### Muốn cài file APK mà không cần cắm cáp

```bash
flutter build apk --release
```

File nằm ở `build\app\outputs\flutter-apk\app-release.apk`. Gửi sang điện
thoại (Zalo, Google Drive…) rồi mở để cài. Điện thoại sẽ hỏi có cho phép cài app
ngoài cửa hàng không, chọn đồng ý. Bản này đang ký bằng khóa debug, chỉ dùng
để thử, chưa đưa lên Google Play được.

### iPhone

Build cho iPhone bắt buộc cần máy Mac có Xcode. Mã đã cấu hình sẵn cho iOS,
nhưng chưa build thử lần nào.

## Kiểm tra tự động (không cần điện thoại)

```bash
flutter analyze
```

```bash
flutter test
```

## Placeholder (chưa phải giá trị thật)

- Application ID / Bundle ID: `com.tracelight.tracelight`. **Phải chọn tên chính thức trước khi đưa lên store lần đầu**, vì sau đó không đổi được nữa.
- Tên app "TraceLight" là tên tạm.
- Chưa có mã quảng cáo, mã in-app purchase hay khóa API nào. Repo này **không chứa bí mật nào**.
