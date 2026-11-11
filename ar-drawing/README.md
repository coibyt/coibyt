# TraceLight (tên tạm) – ứng dụng đồ tranh qua camera

Điện thoại đóng vai "máy chiếu ảo": camera sau hiển thị tờ giấy thật, một bức
tranh bán trong suốt nằm đè lên trên, người dùng nhìn màn hình và đồ theo nét
lên giấy.

> Thư mục `ar-drawing/` là một dự án Flutter độc lập. Nó không dùng chung gì với
> ứng dụng web ở thư mục gốc của repo.

## Trạng thái: Phase 1 xong (chờ chủ dự án duyệt)

| Phase | Nội dung | Trạng thái |
|---|---|---|
| 1 | Dựng dự án, màn hình Camera Workspace: camera sau toàn màn hình, ảnh mẫu đè lên, thanh chỉnh độ mờ | ✅ Xong |
| 2 | Kéo/zoom/xoay ảnh, khóa ảnh, đèn flash, bộ lọc biến ảnh màu thành nét vẽ | ⏸ Chờ duyệt |
| 3 | Quay time-lapse, chọn ảnh từ thư viện | ⏸ |
| 4 | Màn hình chính, thư viện mẫu theo chủ đề | ⏸ |

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
│       └── workspace/               # màn hình đồ tranh
│           ├── workspace_screen.dart     # camera + vòng đời + quyền + giữ màn hình sáng
│           ├── camera_status.dart        # trạng thái camera, phân loại lỗi quyền
│           └── widgets/
│               ├── camera_feed.dart          # camera tràn màn hình
│               ├── trace_overlay.dart        # ảnh mẫu bán trong suốt, căn giữa, vừa khung
│               ├── opacity_control.dart      # thanh trượt độ mờ + %
│               └── camera_message_view.dart  # màn hình báo lỗi / xin quyền
├── assets/images/                   # ảnh mẫu nét vẽ (nền trong suốt)
├── branding/                        # icon gốc 1024px + ghi chú nguồn gốc ảnh
├── test/                            # test tự động (chạy được không cần điện thoại)
├── android/  ios/                   # cấu hình nền tảng
└── pubspec.yaml
```

Các phase sau sẽ thêm `features/sketch_filter`, `features/timelapse`,
`features/templates`, `features/home`, `services/ads`, `services/purchases`.

## Cấu hình nền tảng đã làm

- **Android:** quyền `CAMERA`; `minSdk = 24` (Android 7.0, yêu cầu của CameraX); gỡ quyền micro mà plugin camera tự thêm (app không ghi âm); khai báo đèn flash là tùy chọn.
- **iOS:** `NSCameraUsageDescription`, `NSMicrophoneUsageDescription` (bắt buộc vì thư viện camera có mã micro, dù app không dùng); iPhone khóa dọc; iOS tối thiểu 15.0.
- **Quyền bị từ chối:** hiện màn hình giải thích, có nút "Try again" và "Open Settings". Khi người dùng bật quyền trong Cài đặt rồi quay lại app, camera tự mở lại.
- **Giữ màn hình sáng** trong lúc đồ (`wakelock_plus`), tắt khi app chạy nền.
- **Vòng đời:** app chạy nền thì nhả camera, quay lại thì mở lại.

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
App sẽ hỏi quyền camera. Bấm **Cho phép**, đặt điện thoại phía trên tờ giấy
(kê lên cốc hoặc chồng sách), kéo thanh trượt để chỉnh độ mờ. Nút ở góc trên
bên phải dùng để đổi hình mẫu.

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
