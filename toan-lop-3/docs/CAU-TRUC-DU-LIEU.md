# Cấu trúc dữ liệu "Bài Toán" — schema v1.3.0

File chuẩn: [`schema/toan3-content.v1.schema.json`](../schema/toan3-content.v1.schema.json)
(JSON Schema draft 2020-12). Bài mẫu: [`assets/content/lessons/`](../assets/content/lessons/).

## 1. Cây nội dung

```
catalog.json                       ← mục lục + danh sách kỹ năng (skill)
└── Bộ sách (book)                 kntt3 = Kết nối tri thức, ctst3 = Chân trời sáng tạo
    └── Chủ đề (chapter)           kntt3.c4 = "Phép nhân, phép chia trong phạm vi 100"
        └── Bài học (lessonRef)    trỏ tới file lessons/<id>.json
lessons/<id>.json                  ← 1 bài học = lý thuyết (theory) + các Bài Toán (problems)
exams/<id>.json                    ← đề kiểm tra (Phase 3, xem mục 7)
calendar.json                      ← lịch học từng ngày của năm học (từ 1.3.0, xem mục 10)
```

- Mỗi bài học là **một file riêng** → tải về / cập nhật từng bài, không phải cả cuốn sách.
- `id` không dấu, chữ thường, **không bao giờ đổi** sau khi phát hành (tiến độ của bé gắn vào id).
- `schemaVersion` = `1.x.y`. App đọc mọi bản `1.x`. Thêm trường tuỳ chọn → tăng `x`; đổi/xoá trường → lên `2.0.0` (app cũ sẽ báo "hãy cập nhật app" thay vì chạy sai).
- `contentRev` (bài học) và `rev` (từng Bài Toán) tăng mỗi lần sửa nội dung → app biết cần tải bản mới.

## 2. Một Bài Toán gồm gì

| Trường | Ý nghĩa | Ví dụ |
|---|---|---|
| `id`, `rev` | Mã ổn định + số lần sửa | `kntt3.c4.nhan-2cs-1cs.p03`, `1` |
| `type` | `multiple_choice` · `fill_blank` · `drag_drop` · `matching` | `fill_blank` |
| `instruction` | Câu lệnh **≤ 40 ký tự** cho bé | `Đặt tính rồi tính.` |
| `prompt` | Đề: `text` (+ `math` LaTeX, `image`, `speak` = câu đọc to) | `16 × 5 = ?` |
| `level` | 1 nhận biết · 2 hiểu/kết nối · 3 vận dụng | `2` |
| `skillIds` | Kỹ năng → báo cáo "chủ đề còn yếu" | `["nhan.2cs_1cs.co_nho"]` |
| `access` | `free` / `vip` — cả bài dành cho VIP | `free` |
| `solution.access` | `vip` = các bước chi tiết chỉ cho VIP (đáp án cuối luôn hiện) | `vip` |
| `solution.answerText` | Đáp án ngắn | `80` |
| `solution.hint` | Gợi ý sau lần sai đầu | `5 × 6 = 30, viết 0 và nhớ 3 nhé.` |
| `solution.steps` | Các bước giải (khối nội dung, mục 4) | |
| `estimatedSeconds` | Thời gian dự kiến (xếp đề thi) | `45` |

## 3. Bốn dạng bài

**Trắc nghiệm** — `choices` (2–6), `correctChoiceIds`, `multiSelect`, `shuffleChoices`.

**Điền vào chỗ trống** — `template` có ô `{{b1}}`, mỗi ô có luật chấm:

```json
"template": "3 đoạn dây dài {{b1}} cm.",
"blanks": [{ "id": "b1", "maxLength": 3,
  "answer": { "kind": "number", "value": 45, "unit": "cm", "unitAliases": ["xăng-ti-mét"] } }]
```

Luật chuẩn hoá số (bé gõ thế nào cũng chấm đúng nếu đúng giá trị):
`" 45 "`, `"45cm"`, `"45 CM"`, `"045"` → 45 · `"12 345"`, `"12.345"` (dấu chấm phân nhóm kiểu Việt Nam) → 12345 ·
`"1,5"`, `"-3"`, `"abc"` → **sai định dạng**: app nhắc "Con chỉ cần nhập số thôi nhé!" và **không trừ lượt**.
Có thêm `alsoAccept` (đáp án khác được chấp nhận) và `kind: "text"` (so chữ, mặc định **giữ dấu**: "ba" ≠ "bà").

**Kéo thả số** — `template` có ô `{{s1}}`, `tokens` (thẻ số, có thể có thẻ thừa), `slots[].accept` (thẻ đúng cho ô; ghi nhiều thẻ khi có thẻ trùng giá trị), `reuseTokens`. Dạng "sắp xếp từ bé đến lớn" = `{{s1}} < {{s2}} < {{s3}}`.

**Nối** — `left`, `right` (được nhiều hơn để gây nhiễu), `pairs` (mỗi mục trái nối đúng một mục phải).

## 4. Lời giải từng bước (khối nội dung)

Dùng chung cho **lý thuyết** và **lời giải**:

| `kind` | Dùng cho |
|---|---|
| `text` (`style`: normal / rule = "Ghi nhớ" đóng khung / tip) | Lời giải thích |
| `equation` | Một phép tính: `16 × 5 = 80` |
| `column_arithmetic` | **Đặt tính rồi tính** cộng / trừ / nhân |
| `long_division` | **Phép chia đặt tính** |
| `word_problem` | **Bài giải** toán có lời văn |
| `image` | Hình minh hoạ |

Đặt tính — mỗi lượt là một hàng, đủ dữ liệu để vẽ **từng chữ số** (Phase 3):

```json
{ "kind": "column_arithmetic", "operation": "multiply", "operands": ["16", "5"], "result": "80",
  "digitSteps": [
    { "place": 0, "text": "5 nhân 6 bằng 30, viết 0 nhớ 3.", "write": "0", "carry": 3 },
    { "place": 1, "text": "5 nhân 1 bằng 5, thêm 3 bằng 8, viết 8.", "write": "8" } ] }
```

Phép chia — mỗi lượt: số đem chia, chữ số thương, tích, số dư. Bài giải — mỗi dòng gồm câu lời giải + phép tính, cuối là `Đáp số: ...`.

## 5. App TỰ KIỂM TRA TOÁN khi nạp nội dung

`lib/logic/content_validator.dart` (chạy trong `flutter test` và mỗi lần app mở bài):

- Mọi `equation` và dòng trong Bài giải phải tính đúng (`24 × 3 = 72 (cái)` ✔, `24 × 3 = 62` ✘).
- Đặt tính: kết quả đúng **và từng lượt viết/nhớ đúng** (vd ghi "nhớ 2" thay vì "nhớ 3" → báo lỗi).
- Phép chia: thương, số dư, từng lượt chia, hạ đủ chữ số.
- Đáp án trắc nghiệm có trong lựa chọn; ô trống trong mẫu khớp danh sách; kỹ năng đã khai báo; mã không trùng.
- Đáp án "chuẩn" của mọi bài được chấm **đúng** bằng chính bộ chấm của app.

Kiểm tra cấu trúc bằng schema: `python tool/validate_content.py`.

## 6. Ghi chú nội dung

- Bài tập là **tự soạn** theo phong cách chương trình lớp 3, không chép trang SGK.
- Tên/số thứ tự chủ đề trong `catalog.json` ("Chủ đề 4 — Phép nhân, phép chia trong phạm vi 100", Tập 1) theo hiểu biết của mình về bộ Kết nối tri thức — **cần đối chiếu lại với sách thật**.
- Ký hiệu: nhân `×`, chia `:`, trừ `-` (đúng cách viết ở tiểu học Việt Nam).

## 7. Đề kiểm tra (`kind: "exam"`, từ schema 1.1.0; loại đề mới ở 1.2.0)

| `examType` | Loại đề | Thời gian (app kiểm tra) |
|---|---|---|
| `kt_15p` | Kiểm tra 15 phút | đúng 15 phút |
| `kt_1_tiet` | Kiểm tra 1 tiết | 35–45 phút |
| `giua_hk1`, `giua_hk2` | Thi giữa học kì | 35–60 phút |
| `cuoi_hk1`, `cuoi_hk2` | Thi cuối học kì | 35–60 phút |
| `chu_de`, `on_tap` | Theo chủ đề / ôn tập, nâng cao | 5–90 phút |

Mỗi đề: `title`, `description` (một câu: ôn những gì), `term` (học kì), `durationMinutes`, `access`,
`sections[]` → `items[]` gồm `points` (bội của 0,25) và một Bài Toán. **Tổng điểm phải bằng 10.**

Chấm: trắc nghiệm đúng/sai cả câu; điền số, kéo thả, nối được điểm theo tỉ lệ phần đúng (làm tròn xuống
0,25). Điểm hiển thị cho bé là số nguyên.

**Bảng điểm phân tích** dùng `skillIds` của từng câu, gộp theo `kidName` của kỹ năng trong catalog
(vd "phép nhân" gộp nhân có nhớ/không nhớ/số có ba chữ số) để ra lời nhận xét: "Con đang làm rất tốt
phép cộng, phép trừ, nhưng cần ôn lại phép nhân nhé." Phần "Ôn ngay" lấy các bài học có `skillIds`
trùng kỹ năng yếu (khai báo ở mục bài học trong catalog).

Đề mẫu hiện có (tự soạn, cần thầy cô đối chiếu phạm vi kiến thức với SGK): 15 phút (phép nhân),
1 tiết (Chủ đề 4), giữa học kì 1, cuối học kì 1, đề nâng cao (VIP).

## 8. Quyền VIP ở mỗi cấp

| Cấp | Trường | Ai kiểm tra |
|---|---|---|
| Bài học | `access` của mục bài học trong `catalog.json` | App (khoá ô bài học) + máy chủ (403 khi tải) |
| Đề thi | `access` của đề (và của mục đề trong catalog) | App + máy chủ |
| Bài Toán | `access` của bài | App ẩn bài VIP khỏi lượt luyện tập của tài khoản thường |
| Lời giải | `solution.access` | App hiện đáp án cuối, khoá các bước chi tiết |

Bài toán VIP nằm trong một bài học miễn phí vẫn được tải về cùng file bài học (máy chủ không cắt bớt),
app chỉ ẩn đi. Nếu cần giữ kín hẳn, hãy đặt bài đó vào một bài học hoặc đề VIP riêng.

## 9. Nội dung cả năm sinh tự động (từ 1.3.0)

`python3 tool/gen_curriculum.py` (chỉ dùng thư viện chuẩn Python, hạt giống ngẫu nhiên cố định → chạy lại ra đúng
các file cũ) sinh **toàn bộ chương trình Toán 3 – Kết nối tri thức** (Tập 1: chủ đề 1–7, Tập 2: chủ đề 8–16):

- 16 chủ đề, 80 bài học (78 bài sinh mới + 2 bài viết tay của Chủ đề 4 giữ nguyên:
  `kntt3.c4.nhan-2cs-1cs`, `kntt3.c4.chia-2cs-1cs`), mỗi bài 8–10 Bài Toán đủ 4 dạng, mức 1 → 3.
- Mọi con số do máy chọn; đáp án, đặt tính (từng lượt viết/nhớ theo cách SGK, kể cả “nhớ” cộng vào chữ số số trừ),
  phép chia (từng lượt hạ – chia – nhân – trừ, kể cả thương có chữ số 0) và Bài giải đều **tính bằng code**.
  Script tự kiểm tra lại toán (bản Python của `content_validator.dart`) trước khi ghi file.
- Viết lại `catalog.json`: thêm các kỹ năng mới (mỗi kỹ năng có `kidName` cho bé), danh sách `skillIds` của từng bài
  và **`periods`** = số tiết trên lớp của bài (trường tuỳ chọn mới của mục bài học, 1–5). Tổng cả năm = **175 tiết**
  (5 tiết/tuần × 35 tuần theo chương trình). `contentRev` của catalog giữ nguyên.
- Số ≥ 1000 trong đề viết có dấu chấm phân nhóm (10.000); bộ tính toán và bộ chấm của app đều đọc được “12.345”.
- **Gợi ý** (`solution.hint`) chỉ dùng các câu chung, không có chữ số (không bao giờ lộ đáp án), liệt kê trong
  `lib/logic/tutor_hints.dart` (`kGeneratedHints`, ≤ 60 câu, file sinh tự động) để ghi âm một lần.
- Lời giải từng bước của bài cuối mỗi bài học là VIP (`solution.access: "vip"`), các bài toán đều `free`.

Muốn sửa nội dung: sửa trong script rồi chạy lại, **không sửa tay** các file `kntt3.c*.json` sinh ra.

**Ghi chú về tên/số thứ tự bài:** tên chủ đề và tên bài lấy theo mục lục SGK Kết nối tri thức. Một số bài trong sách
được tách/gộp tiết khác nhau giữa các bản in; từ khoảng Bài 60 trở đi, số thứ tự bài trong app có thể lệch một
chút so với sách in (thứ tự chủ đề và bài vẫn giữ đúng). Số tiết mỗi bài là ước lượng hợp lý (bài mới 2–3 tiết,
luyện tập chung/ôn tập 1–2 tiết), thầy cô có thể chỉnh trong `CURRICULUM` của script. Các bài tự soạn, không chép SGK —
cần thầy cô đối chiếu phạm vi kiến thức.

## 10. Lịch học từng ngày (`kind: "calendar"`, từ 1.3.0)

`assets/content/calendar.json` (model: `lib/models/calendar.dart` → `SchoolCalendar`):

```json
{ "schemaVersion": "1.3.0", "kind": "calendar", "bookId": "kntt3", "schoolYear": "2026-2027",
  "terms": [{ "term": 1, "start": "2026-09-07", "end": "2027-01-15" }, { "term": 2, "start": "2027-01-18", "end": "2027-05-21" }],
  "holidays": [{ "start": "2027-01-01", "end": "2027-01-01", "name": "Tết Dương lịch" }, …],
  "days": [{ "date": "2026-09-07", "week": 1, "term": 1, "lessonId": "kntt3.c1.on-tap-cac-so-den-1000", "part": 1, "parts": 2 }, …],
  "exams": [{ "week": 9, "examId": "kntt3.giua-hk1.de-1" }, …] }
```

- Mỗi ngày học (thứ Hai – thứ Sáu, trừ ngày nghỉ lễ) = **một tiết Toán**; các bài nối tiếp theo đúng thứ tự catalog,
  `part`/`parts` lấy từ `periods`. Đúng 175 ngày.
- Nghỉ lễ năm học 2026–2027: Tết Dương lịch 1/1/2027; Tết Nguyên Đán Đinh Mùi (mùng 1 Tết = 6/2/2027) nghỉ 4/2 – 14/2/2027;
  Giỗ Tổ Hùng Vương 16/4/2027; 30/4 và 1/5/2027.
- Với hai học kì như trên và các ngày nghỉ này, số ngày học còn lại **đúng bằng 175** (học kì 1: 94 ngày, học kì 2:
  81 ngày), nên Tập 1 (chủ đề 1–7) xếp đủ 94 tiết trong học kì 1, Tập 2 xếp 81 tiết trong học kì 2.
- `week` là **tuần lễ trên lịch** (thứ Hai – thứ Sáu) có ít nhất một ngày học, đánh số liên tục: học kì 1 có 19 tuần
  (7/9/2026 – 15/1/2027), học kì 2 có 17 tuần (tuần 8–12/2/2027 nghỉ Tết trọn tuần) → 36 tuần. Chương trình chuẩn
  là “35 tuần thực học (18 + 17)”, nhưng với một tiết mỗi ngày và các ngày lễ rơi vào giữa tuần, 175 tiết cần 36 tuần
  lịch; muốn đúng 18 tuần ở học kì 1 thì phải đổi ngày bắt đầu/kết thúc học kì.
- `exams`: đề gợi ý theo tuần (giữa HK1 ≈ tuần 9, 15 phút phép nhân và 1 tiết Chủ đề 4 khi học xong phần tương ứng,
  cuối HK1 ở tuần cuối học kì 1).
- `SchoolCalendar.dayFor(ngày)`, `lessonForDate(ngày)`, `daysOfWeek(tuần)`, `nextDayFrom(ngày)`, `holidayFor(ngày)`.
  Kiểm tra “mọi `lessonId` có trong catalog” nằm trong `test/curriculum_test.dart`.
