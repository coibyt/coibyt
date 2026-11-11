# Tạo ảnh cô giáo & vật phẩm bằng Kie.ai

App đã chạy sẵn với **cô giáo vẽ tạm bằng code**. Khi có ảnh Kie.ai, đặt đúng tên file vào đúng
thư mục rồi build lại là app tự dùng ảnh mới — không phải sửa code.

## 1. Thiết lập trên Kie.ai

- Mô hình: **Nano Banana Pro** (giống Babelisa) — hỗ trợ ảnh tham chiếu để giữ nhân vật nhất quán.
- Tỉ lệ khung: **3:4** (dọc) cho cô giáo; **1:1** cho vật phẩm. Độ phân giải **1K** là đủ.
- Nền: cô giáo dùng **xanh lá thuần #00FF00**; vật phẩm dùng **hồng sẫm thuần #FF00FF**
  (bảng phấn màu xanh nên không dùng nền xanh). Script tự xoá nền thành trong suốt.
- Tránh màu gần với màu nền trên nhân vật/vật phẩm (không áo xanh lá cho cô, không đồ vật tím hồng sẫm).

## 2. Cô giáo — làm theo thứ tự

**Bước 1: ảnh gốc `teacher_idle.png`** (đứng yên, mỉm cười, ngậm miệng). Tạo vài lần, chọn ảnh đẹp nhất.

```text
Original 2D cartoon character for a children's math learning app: a friendly, beautiful young Vietnamese
female primary-school teacher in her late twenties, warm gentle smile with closed lips, big kind sparkling
eyes, soft rosy cheeks, long black hair tied in a neat low bun with a small coral hair clip, wearing a light
sky-blue modern ao dai (Vietnamese long dress) with a simple white collar trim. Waist-up portrait, facing the
viewer, relaxed upright posture, arms resting naturally at her sides, head and face large and clearly
visible. Clean vector illustration, soft cel shading, smooth clean dark-brown outlines, bright cheerful
pastel colours, child-friendly, modest and age-appropriate. Centered, the character fills about 85% of the
frame height, empty margin on all sides. Solid flat pure green (#00FF00) background, no shadow on the
background, no text, no watermark, no logo. An original character, not resembling any real person or
existing cartoon character.
```

**Bước 2–7: các tư thế khác** — dùng **`teacher_idle.png` làm ảnh tham chiếu** (image input), giữ nguyên
tỉ lệ 3:4. Mỗi prompt bắt đầu bằng đoạn giữ nhất quán sau:

```text
Use the reference image. Keep EVERYTHING identical: same character, same face, same hair, same ao dai,
same art style, same framing, same position and size in the frame, same solid pure green (#00FF00) background.
```

rồi ghép thêm câu thay đổi tương ứng:

| File | Câu thay đổi (ghép sau đoạn trên) |
|---|---|
| `teacher_blink.png` | `Only change: her eyes are gently closed in a natural blink. Mouth closed, same smile.` |
| `teacher_talk.png` | `Only change: her mouth is open in a friendly speaking shape, as if saying "ah", showing a little of the upper teeth. Eyes open.` |
| `teacher_think.png` | `Change only the pose and expression: she rests her chin on her right hand with the index finger touching her chin, eyes looking up thoughtfully, gentle encouraging expression, mouth closed.` |
| `teacher_clap.png` | `Change only the pose and expression: she claps her hands together in front of her chest, very happy wide smile, eyes squinting joyfully, a few small yellow sparkles around her hands.` |
| `teacher_think_talk.png` *(tuỳ chọn)* | Dùng `teacher_think.png` làm tham chiếu: `Only change: her mouth is open in a friendly speaking shape.` |
| `teacher_clap_talk.png` *(tuỳ chọn)* | Dùng `teacher_clap.png` làm tham chiếu: `Only change: her mouth is open wide in a cheerful "Yay!" shape.` |

> Mẹo: `blink` và `talk` phải **trùng khít** ảnh gốc (chỉ khác mắt/miệng) thì chớp mắt và khớp khẩu hình mới
> mượt. Nếu ảnh tạo ra bị lệch tư thế, tạo lại. Thiếu ảnh tuỳ chọn thì app tự dùng ảnh gần nhất.

## 3. Vật phẩm (nền hồng sẫm, tỉ lệ 1:1, KHÔNG có chữ)

AI thường vẽ sai dấu tiếng Việt, nên mọi chữ trên nút/bảng do app tự viết — ảnh phải **trống chữ**.

| File | Prompt |
|---|---|
| `coin.png` | `A single shiny 3D gold coin with an embossed star in the centre, slightly tilted, cute glossy cartoon style for a kids' game, soft highlights, isolated, centered, solid flat pure magenta (#FF00FF) background, no text, no shadow on the background.` |
| `star.png` | `A single shiny 3D yellow star with soft rounded points, cute glossy cartoon style for a kids' game, isolated, centered, solid flat pure magenta (#FF00FF) background, no text, no shadow on the background.` |
| `chalkboard.png` | `A classroom green chalkboard with a light wooden frame and a small chalk tray holding two pieces of white chalk, completely empty with no writing, front view, slightly 3D cartoon style, isolated, centered, solid flat pure magenta (#FF00FF) background, no text.` |
| `ruler.png` | `A bright 3D yellow wooden ruler with clean centimetre tick marks and no numbers, slightly tilted, glossy cartoon style, isolated, centered, solid flat pure magenta (#FF00FF) background, no text.` |
| `button.png` | `A single glossy 3D candy-style rounded rectangle button for a kids' app, bright green with a soft top highlight and a subtle darker bottom edge, completely blank with no text and no icon, front view, wide horizontal shape, isolated, centered, solid flat pure magenta (#FF00FF) background.` |

Hiện app dùng `coin.png` và `star.png` cho hiệu ứng tiền vàng/ngôi sao bay lên khi bé làm đúng; các vật
phẩm còn lại được xem trước trong **Khu phụ huynh → Xem cô giáo & ảnh** và sẽ dùng dần ở các bước sau.

## 4. Đưa ảnh vào app

1. Tải ảnh từ Kie.ai về một thư mục, đổi tên đúng như bảng trên (vd `C:\anh-kie\teacher_idle.png`).
2. Trong thư mục `toan-lop-3`, chạy (cần Python và `pip install pillow`):

```bash
python tool/prepare_teacher_assets.py teacher C:\anh-kie
```

```bash
python tool/prepare_teacher_assets.py ui C:\anh-kie
```

3. Chạy lại app (`flutter run -d chrome`). Vào **Khu phụ huynh → Xem cô giáo & ảnh** để kiểm tra từng tư thế,
   chớp mắt, nói (khớp khẩu hình) và từng vật phẩm.

Script tự: xoá nền → trong suốt, cắt mọi tư thế bằng **cùng một khung** (đổi tư thế không bị nhảy), thu về
cao 900 px trong khung 3:4, ghi vào `assets/tutor/` và `assets/ui/`.

## 5. Giọng nói (11max)

Giọng cô giáo dùng 11max (giọng nữ đa ngôn ngữ "Sarah", mô hình `eleven_flash_v2_5`, đọc tiếng Việt).
Mọi câu cố định đã được ghi sẵn vào `assets/voice/` cùng `manifest.json` (câu → file, thời lượng).
Sửa/thêm câu thì chạy lại — chỉ câu còn thiếu mới được tạo (tốn credit):

```bash
dart run tool/make_voice.dart --count
```

```bash
dart run tool/make_voice.dart
```

Khoá API đặt trong biến môi trường `MAX11_API_KEY` (không ghi vào code hay git).
