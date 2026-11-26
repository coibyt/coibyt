# BizStory English: hướng dẫn viết kịch bản (dùng cho cả người viết và LLM)

Người nghe là dân văn phòng Việt Nam, trình độ tiếng Anh A2–B2. Họ nghe thụ động khi đang làm việc,
2 tiếng mỗi ngày. Câu chuyện phải đủ cuốn để họ **không muốn tắt**, và tiếng Anh phải đủ thực dụng để
mai họ **dùng được ngay** trong email, cuộc họp hay đàm phán.

## 1. Câu chuyện phải cuốn

- **Mở đầu giữa cao trào (in medias res).** 30 giây đầu phải có một con số, một khoảnh khắc và một rủi ro.
  Ví dụ: "Bốn mươi bảy ngày. Đó là thời gian công ty còn sống được." Không mở bằng định nghĩa hay lời chào dài.
- **Đồng hồ đếm ngược, lựa chọn khó, cái giá thật.** Nhân vật luôn phải chọn giữa hai điều đều có giá.
- **Cụ thể và có giác quan:** tên quán, mùi cà phê rang, tiếng điện thoại rung lúc 2 giờ sáng, con số trong bảng tính.
- **Ít nhất 2 cú xoay chuyển (twist)** trong Lớp 1. Mỗi twist phải hợp lý khi nhìn lại.
- **Bài học nảy ra từ cốt truyện**, không giảng đạo. Người dẫn có thể rút ra 1–2 nguyên tắc ở cuối, ngắn gọn.
- **Kết thúc:** gỡ trọn nút thắt của tập. Phim nhiều tập thì thêm một móc câu (cliffhanger) dẫn sang tập sau.
- Người dẫn nói như kể chuyện cho bạn thân nghe: ấm, tự nhiên, có lúc hỏi người nghe
  ("Nếu bạn là Khang, bạn có ký không?"). Văn nói, không văn viết.

## 2. Viết cho giọng máy đọc (TTS)

- Câu ngắn và vừa (10–25 chữ). Mỗi segment 1–4 câu, **tối đa khoảng 600 ký tự**.
- Tiếng Việt: viết số bằng chữ ("bốn mươi bảy ngày", "hai triệu đô la", "năm hai nghìn mười một").
  Không viết tắt (không "VC", "P&L", "%", "$"). Từ chuyên môn tiếng Anh đã quen thì giữ nguyên nhưng ít thôi.
- Tiếng Anh: viết số và tiền bằng chữ hoặc dạng dễ đọc ("two million dollars", "in 2011" thì được).
- Không dùng ngoặc đơn, dấu gạch chéo, emoji, markdown.
- Tên nhân vật trong câu tiếng Anh viết **không dấu** (Khang, Vy, Thu).

## 3. Cấu trúc mỗi tập (Phần 1, 2, 3; mỗi phần khoảng 35 phút)

| Lớp | Thời lượng | Nội dung |
|---|---|---|
| opening + Lớp 1 | khoảng 15 phút (≈ 12.000–13.500 ký tự tiếng Việt) | Người dẫn kể bằng tiếng Việt và cài 6–8 cụm tiếng Anh tại điểm nút của truyện |
| Lớp 2 | khoảng 8 phút (máy tự dựng từ `phrases`) | [ngữ cảnh/nghĩa tiếng Việt → EN 0.85 → dừng 2,5 giây → EN 1.0] + 2 câu ví dụ |
| Lớp 3 | khoảng 12 phút (≈ 10.000–11.500 ký tự tiếng Anh) | Kể lại hoặc đối thoại 100% tiếng Anh, dùng lại **mọi** cụm |

**Cài cụm ở Lớp 1:** đặt `{"phrase": "p1"}` đúng lúc nhân vật cần nói câu đó. Câu dẫn ngay trước nên dựng
tình huống ("Khang nhìn thẳng vào Sarah và nói:"). Máy sẽ phát: giọng bản ngữ 0.85x → dừng 2 giây → 1.0x.
Ngay sau đó người dẫn **giải thích sắc thái** trong 2–4 câu: nghĩa, khi nào dùng, mức trang trọng, lỗi
người Việt hay mắc hoặc cách nói tương đương. Rồi kể tiếp, không bị đứt mạch.

**Cụm từ (`phrases`):** 6–8 cụm, là câu hoặc cụm **trọn vẹn, tự nhiên, dùng được ngay** trong công việc
(họp, email, đàm phán, gọi vốn, nói chuyện với sếp/khách). Tránh thành ngữ cổ, tránh từ đơn lẻ.
Mỗi cụm cần:
- `en`: câu chuẩn bản ngữ (ví dụ "Let me sleep on it.")
- `vi`: nghĩa tiếng Việt chính xác, tự nhiên ("Để tôi suy nghĩ thêm một đêm đã.")
- `note_vi`: 1–2 câu sắc thái (dùng cho sổ tay)
- `forms`: các dạng chấp nhận khi kiểm tra Lớp 3, viết thường, ví dụ ["sleep on it"]; phải là phần lõi của cụm
- `context_vi`: 2–3 câu tiếng Việt (≈ 200–280 ký tự) mở đầu bài luyện ở Lớp 2: tình huống, nghĩa, khi nào dùng
- `examples`: đúng 2 câu ví dụ `{en, vi}` ở tình huống công việc **khác** câu chuyện, mỗi câu chứa nguyên cụm
- `recall_vi`: 1 câu nhắc bối cảnh câu chuyện, dùng khi ôn ở Phần 4 ("Câu Khang nói khi Sarah ép ký trong bốn mươi tám giờ.")

**Lớp 3:** người kể (`Narrator`) và nhân vật đối thoại. Tiếng Anh tự nhiên, rõ, mức B1–B2. Câu không quá
dài, nhiều đối thoại có xung đột. Mỗi cụm xuất hiện ít nhất 1 lần, tốt nhất 2 lần, đúng ngữ cảnh.
Không dịch nguyên Lớp 1: kể lại gọn hơn, nhiều cảnh đối thoại hơn, và có thể thêm một chi tiết mới nhỏ
để người đã nghe Lớp 1 vẫn tò mò.

`layer2.intro` và `layer2.outro`: 1–2 câu người dẫn mở/đóng phần luyện. `closing`: 1–3 câu tiếng Việt
của người dẫn sau Lớp 3 (chốt bài học, hẹn tập sau).

## 4. Từng phần

- **Phần 1 · Phim kinh doanh nhiều tập** (hư cấu). Mỗi mùa 5 tập. Mỗi tập gỡ trọn một nút thắt
  (gọi vốn → thuê mặt bằng → khủng hoảng dòng tiền → đàm phán → tái cấu trúc…). Giữ nhân vật nhất quán
  theo `bible` của mùa. `summary_vi`: 3–5 dòng tóm tắt diễn biến chính, dùng cho đoạn "Previously…" của tập sau.
- **Phần 2 · Case study có thật** về thất bại hoặc bước ngoặt của thương hiệu/doanh nhân.
  **Chỉ dùng sự kiện, con số và câu nói đã được ghi nhận rộng rãi.** Không bịa trích dẫn, không bịa số.
  Khi không chắc con số, nói khoảng ("gần ba trăm đô la") hoặc bỏ đi. Cảnh dựng lại phải được nói rõ
  ("Cảnh sau đây được dựng lại để dễ hình dung, không phải lời thoại thật"). Lớp 3 dạng hai người dẫn
  tiếng Anh bàn về vụ việc (`Narrator`, `Cohost`), **không** đặt lời vào miệng người thật.
  Giọng công bằng, không bôi nhọ, phân biệt sự thật và nhận định. Ghi `fact_check.sources` và
  `fact_check.dramatized_note`.
- **Phần 3 · Tài chính & Tâm lý:** quản lý tiền, quản trị rủi ro, tâm lý khách hàng, đàm phán, thiên kiến
  nhận thức. Truyện hư cấu, có thể dựa trên nghiên cứu thật (nêu đúng tên, năm, kết quả).
- **Mưu lược / chiến lược:** chỉ dạy cách làm hợp pháp và có đạo đức. Có thể kể về lừa đảo để người nghe
  **nhận diện và tự bảo vệ**, nhưng không hướng dẫn cách làm.

## 5. Định dạng JSON của một phần

```json
{
  "part": 1, "kind": "series",
  "title_vi": "…", "title_en": "…", "topic": "gọi vốn, term sheet, liquidation preference",
  "subject": null,
  "series": {"season": 1, "episode_no": 1, "theme": "…", "title_vi": "…", "title_en": "…"},
  "cast": {"Narrator": "en_male", "Khang": "en_male2", "Sarah": "en_female"},
  "phrases": [{"id": "p1", "en": "…", "vi": "…", "note_vi": "…", "forms": ["…"], "context_vi": "…",
               "examples": [{"en": "…", "vi": "…"}, {"en": "…", "vi": "…"}], "recall_vi": "…"}],
  "opening": [{"speaker": "vn_host", "text": "…"}],
  "layer1": [{"speaker": "vn_host", "text": "…"}, {"phrase": "p1"}, {"speaker": "vn_host", "text": "…"}],
  "layer2": {"intro": [{"speaker": "vn_host", "text": "…"}], "outro": [{"speaker": "vn_host", "text": "…"}]},
  "layer3": [{"speaker": "Narrator", "text": "…"}, {"speaker": "Khang", "text": "…"}],
  "closing": [{"speaker": "vn_host", "text": "…"}],
  "summary_vi": "dòng 1\ndòng 2\ndòng 3",
  "fact_check": {"sources": ["…"], "dramatized_note": "…"}
}
```

Giọng có sẵn: `vn_host` (người dẫn của phần), `en_male` (Quentin, giọng người kể), `en_female` (Ashley),
`en_male2` (VânCa, nam), `en_female2` (Samara, nữ Anh sang trọng), `en_female3` (Hope, nữ trẻ điềm tĩnh),
`en_male3` (Christopher, nam Anh trung niên ấm), `en_male4` (Mark, nam Mỹ thoải mái).
Nhân vật khai báo trong `cast` và ánh xạ vào một giọng tiếng Anh.
Tuỳ chọn trong segment: `"pause_ms": 1200` để dừng lâu hơn sau câu (khoảnh khắc kịch tính).

## 6. Kịch bản v2 (từ ngày 2): thêm từ vựng, câu nghe hiểu và người dẫn phụ

Đặt `"version": 2`. Mục tiêu: người nghe học được **nhiều từ hơn** qua câu chuyện và **nghe hiểu được nhiều câu hơn**
ở Lớp 3.

**Người dẫn phụ `vn_cohost`** (giọng Việt thứ hai, nữ). Người dẫn chính vẫn kể. Người dẫn phụ:
- giải nghĩa từ vựng (máy tự chèn),
- thỉnh thoảng hỏi xen hoặc phản ứng ngắn ở Lớp 1, khoảng 6–10 lần mỗi tập, mỗi lần 1–2 câu
  ("Khoan đã, đặt cọc ba tháng là nhiều hay ít vậy anh?"). Đừng để thành tán gẫu; mỗi câu xen phải đẩy câu chuyện
  hoặc làm rõ một điều người nghe đang thắc mắc.

**`words`: 10 từ vựng** (8–12) lấy từ chính câu chuyện. Từ đơn hoặc cụm danh/động từ ngắn, hay gặp trong công việc
(lease, landlord, deposit, cash flow, foot traffic, to renegotiate…), KHÔNG trùng với 7 cụm câu.
```json
{"id": "w1", "en": "landlord", "vi": "chủ nhà, người cho thuê", "forms": ["landlord"],
 "example_en": "The landlord wants a three month deposit.", "example_vi": "Chủ nhà muốn đặt cọc ba tháng."}
```
- `forms`: các dạng chấp nhận để kiểm tra Lớp 3, viết thường (ví dụ ["renegotiate", "renegotiated"]).
- `example_en`: một câu ngắn lấy từ hoặc sát với Lớp 3, chứa từ đó. `example_vi`: nghĩa tiếng Việt của câu.
- Lớp 1: đặt `{"word": "w1"}` đúng **một lần** cho mỗi từ, ngay sau câu kể có nhắc tới khái niệm đó
  (ví dụ: "…người chủ nhà, tiếng Anh gọi là" rồi `{"word": "w1"}`). Máy phát: giọng bản ngữ đọc từ, rồi người dẫn
  phụ nói nghĩa ngắn. Sau đó người dẫn chính kể tiếp, không cần giải thích thêm.
- Lớp 3: mỗi từ xuất hiện ít nhất một lần.

**`key_sentences`: 5 câu nghe hiểu** (4–6), chép **nguyên văn** từ Lớp 3: những câu quan trọng nhất của cốt truyện,
độ dài vừa phải (8–20 từ). Máy dựng ở cuối Lớp 2: EN 0.85 → dừng → nghĩa tiếng Việt (người dẫn phụ) → EN 1.0.
Nhờ vậy khi vào Lớp 3, người nghe đã có "điểm neo" để theo kịp cả câu chuyện.
```json
{"en": "If we sign this lease, we can't walk away for three years.", "vi": "Nếu ký hợp đồng thuê này, ba năm tới mình không thể rút lui."}
```

Thời lượng v2: opening + Lớp 1 khoảng 16 phút (≈ 12.500–14.000 ký tự tiếng Việt, kể cả lời người dẫn phụ),
Lớp 2 khoảng 12–13 phút (máy tự dựng), Lớp 3 khoảng 12 phút (≈ 10.000–11.500 ký tự tiếng Anh).

Thêm một quy tắc cho giọng đọc: người dẫn tiếng Việt **không đọc lại nguyên câu tiếng Anh**, vì giọng Việt đọc tiếng
Anh nghe không chuẩn. Muốn nhắc thì chỉ nói một hai chữ khoá (runway, deal-breaker).
