# Cấu trúc dữ liệu "Bài Toán" — schema v1.2.0

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
