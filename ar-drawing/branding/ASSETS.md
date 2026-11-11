# Nguồn gốc hình ảnh

Tất cả hình trong app là hình gốc làm riêng cho TraceLight. Không lấy hình,
mẫu hay bố cục của app khác.

| File | Công cụ | Ghi chú |
|---|---|---|
| `assets/images/sample_fox_lineart.png` | kie.ai, model `google/nano-banana` (11/2026) | Bé cáo nét vẽ. Nền trắng được đổi thành trong suốt, nét mực màu #14161F |
| `assets/images/sample_chibi_lineart.png` | kie.ai, model `google/nano-banana` | Cô bé chibi mặc hoodie tai mèo, cầm bút chì. Xử lý như trên |
| `branding/app_icon_1024.png` | kie.ai, model `google/nano-banana` | Icon gốc. Đã cắt bỏ góc bo sẵn để tràn viền, rồi xuất ra mọi cỡ Android/iOS |

Xử lý sau khi tạo ảnh (Python/Pillow):
- Ảnh nét vẽ: độ trong suốt tính theo độ tối của điểm ảnh, giấy (sáng hơn ~84%) thành trong suốt hoàn toàn. Xóa chấm bẩn lẻ, cắt sát hình.
- Icon Android dạng adaptive: hình nằm trong 70% giữa khung 108dp, nền `#1E2C3D`.

Prompt đầy đủ đã dùng:

- Fox: "Clean black-and-white line art for a tracing / drawing practice app: a cute original fox cub sitting with its fluffy tail curled around its paws, looking up with big friendly eyes, a small leaf on its head. Bold uniform black outlines only, about 6px stroke, smooth confident lines, no shading, no grey, no hatching, no colour, no text, no border. Pure white background. Centered, full body visible with generous margin. Children's coloring book style, professional illustration quality."
- Chibi: "Clean black-and-white line art for a tracing / drawing practice app: an original chibi girl character with short bob hair, a big hoodie with cat ears on the hood, holding a pencil, cheerful expression, full body. Bold uniform black outlines only, smooth confident lines, no shading, no grey, no screentone, no colour, no text, no border. Pure white background, centered with generous margin. Professional anime-style line art, coloring book quality."
- Icon: "Mobile app icon, flat modern vector style. Deep navy-ink background (#14161F) filling the whole square. In the center: a cream sheet of paper seen at a slight angle, with a simple white line drawing of a star on it, a warm amber (#FFB547) pencil tracing the star, and a soft amber cone of light shining down onto the paper from above. ALL elements compact and grouped tightly in the middle 60% of the square, wide empty margin of background on every side. Bold simple shapes readable at 48px, subtle gradients, no text, no letters, no border, no rounded corners, no phone."

> Trước khi phát hành thương mại, hãy đọc điều khoản sử dụng của kie.ai và của
> model đã dùng để chắc chắn được phép dùng hình cho mục đích thương mại.

## Thư viện mẫu (Phase 4)

24 hình nét vẽ trong `assets/templates/<chủ đề>/` được tạo bằng kie.ai (`google/nano-banana`, 11/2026).
Câu lệnh tạo ảnh có dạng: "Clean black-and-white line art for a tracing / drawing practice app: <mô tả>.
Bold uniform black outlines only, … no text, no logos … Pure white background …". Các nhân vật đều là
nhân vật gốc ("an original anime girl…"), xe không có thương hiệu ("generic … no brand, no logo").
Hình `animals/fox_cub.png` và `chibi/hoodie_girl.png` là hai hình mẫu của Phase 1.

Xử lý sau khi tạo ảnh: nền giấy chuyển thành trong suốt (theo độ tối của điểm ảnh), hình có nét quá mảnh
được làm đậm 1 px, xoá chấm bẩn rời, cắt sát hình.
