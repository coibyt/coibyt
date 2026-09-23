# VaraaAi.Com — bảng màu thương hiệu

Lấy trực tiếp từ CSS thực tế đang chạy trên timma.fi (đọc qua
`getComputedStyle`/CSS custom properties ngày 2026-09-23), áp dụng cho
VaraaAi.Com theo yêu cầu "cùng màu với timma.fi".

| Vai trò | Hex | Dùng ở |
|---|---|---|
| `ink` (chữ chính / nút đen) | `#0d1718` | Văn bản, nút chính, footer nền tối |
| `primary` (tím) | `#624f89` | CTA phụ, liên kết nhấn mạnh, badge |
| `secondary` (tím nhạt) | `#dad0ef` | Nền phụ, hover nhẹ |
| `peach` (hero) | `#ffece4` | Nền hero, khối nổi bật |
| `teal` | `#02646b` | Icon/thông tin |
| `coral` (cam) | `#ec6a47` | Cảnh báo nhẹ, sao đánh giá |
| `berry` (đỏ) | `#c6274d` | Lỗi, huỷ, xoá |
| `sage` (xanh lá) | `#687b6e` | Thành công, hoàn thành |
| `mist` (xám nhạt) | `#f2f5f5` | Nền phụ trung tính |

Toàn bộ token đã khai báo trong [`tailwind.config.ts`](../tailwind.config.ts)
dưới dạng thang màu 50–900 cho từng nhóm, dùng qua class Tailwind
(`bg-primary-500`, `text-berry-500`, v.v.) thay vì hex trực tiếp trong component.

**Font**: timma.fi dùng "Sofia Pro" (font trả phí, không có trên Google Fonts).
VaraaAi.Com dùng **Be Vietnam Pro** (Google Fonts, miễn phí) — vừa có hình dáng
hình học, hiện đại gần với Sofia Pro, vừa được thiết kế riêng để hiển thị đẹp
dấu tiếng Việt (ưu tiên hơn Plus Jakarta Sans vì đây là ngôn ngữ chính của
site). Cấu hình tại
[`src/app/[locale]/layout.tsx`](../src/app/%5Blocale%5D/layout.tsx) qua
`next/font/google`.

Muốn đổi logo/màu sau này: chỉ cần sửa các token trong `tailwind.config.ts`,
toàn bộ giao diện sẽ tự cập nhật vì không có hex code cứng rải rác trong component.
