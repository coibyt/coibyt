# VaraaAi.Com

Nền tảng đặt lịch hẹn đa nhà cung cấp (marketplace) cho salon tóc, spa, nail,
massage — lấy cảm hứng từ [Timma.fi](https://timma.fi). Khách hàng tìm và đặt
lịch trực tuyến; chủ salon/spa tự quản lý dịch vụ, nhân viên, lịch làm việc và
nhận thanh toán.

## Công nghệ

| Layer | Lựa chọn |
|---|---|
| Framework | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS (design tokens lấy theo bảng màu timma.fi, xem `docs/BRAND.md`) |
| Database | MySQL / MariaDB qua Prisma ORM |
| Auth | Auth.js (NextAuth v5) — email/mật khẩu + Google OAuth |
| i18n | next-intl — Tiếng Việt (mặc định) + English |
| Thanh toán | Stripe, VNPay, MoMo — **chế độ sandbox/test** (xem bên dưới) |
| Email | SMTP (nodemailer) — xác nhận đặt lịch, duyệt doanh nghiệp |

## Cấu trúc chính

```
src/
  app/
    [locale]/            # tất cả trang có giao diện (route theo ngôn ngữ)
      page.tsx            # trang chủ
      search/             # tìm kiếm
      b/[slug]/            # trang salon + luồng đặt lịch
      auth/                # đăng nhập / đăng ký
      business/apply/      # đăng ký doanh nghiệp
      business/dashboard/  # bảng điều khiển chủ salon
      admin/               # bảng điều khiển quản trị hệ thống
      account/bookings/    # lịch hẹn của khách hàng
    api/                  # toàn bộ API routes (REST, không cần trang riêng)
  components/             # React components dùng chung
  lib/                    # business logic: availability, booking, payments, mailer...
  i18n/                   # cấu hình next-intl
prisma/
  schema.prisma           # toàn bộ mô hình dữ liệu
  seed.ts                 # dữ liệu mẫu (3 salon, danh mục, tài khoản demo)
messages/
  vi.json, en.json        # toàn bộ chuỗi giao diện
```

## Chạy ở máy local

Yêu cầu: Node.js ≥ 20, MySQL (local hoặc Hostinger remote MySQL), npm.

```bash
npm install
cp .env.example .env      # rồi điền DATABASE_URL, AUTH_SECRET, ...
npx prisma migrate dev --name init
npm run db:seed
npm run dev
```

Mở http://localhost:3000. Tài khoản demo sau khi seed (mật khẩu chung: `Password123!`):

- `admin@varaaai.com` — quản trị hệ thống (`/admin`)
- `owner1@varaaai.com`, `owner2@varaaai.com`, `owner3@varaaai.com` — chủ 3 salon mẫu
- `customer@varaaai.com` — khách hàng

## Thanh toán — đang ở chế độ sandbox

`.env.example` chỉ có chỗ trống cho key thật. Trong lúc chưa có tài khoản merchant:

- **Stripe**: đăng ký tài khoản Stripe (miễn phí), lấy `sk_test_...` /
  `pk_test_...` ở [Dashboard > Developers > API keys](https://dashboard.stripe.com/test/apikeys).
  Test bằng thẻ `4242 4242 4242 4242`, ngày/CVC bất kỳ trong tương lai.
- **VNPay**: đăng ký sandbox tại https://sandbox.vnpayment.vn/apis/ để lấy
  `vnp_TmnCode` + `HashSecret` dùng thử miễn phí.
- **MoMo**: dùng bộ `partnerCode`/`accessKey`/`secretKey` sandbox công khai tại
  https://developers.momo.vn/ (mục "Test").

Khi có tài khoản thật, chỉ cần thay các biến môi trường tương ứng trong
`.env` (hoặc trong hPanel khi deploy) — code không cần sửa gì thêm.

## Triển khai lên Hostinger

Xem chi tiết từng bước tại [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

## Giới hạn đã biết / việc tiếp theo

- Nhân viên (Staff) chưa có tài khoản đăng nhập riêng — chủ salon quản lý lịch
  của nhân viên thay họ. Có thể bổ sung đăng nhập riêng cho nhân viên sau.
- SMS nhắc lịch chưa được bật (theo lựa chọn ban đầu, chỉ dùng email trước) —
  `src/lib/mailer.ts` đã có thể được mở rộng sang SMS khi cần.
- Ảnh đại diện/ảnh bìa salon hiện cần dán URL trực tiếp — chưa có upload file
  (cần thêm dịch vụ lưu trữ ảnh, ví dụ Cloudinary hoặc S3-compatible, để tích
  hợp upload thực sự).
- Email nhắc lịch hẹn (24h/2h/15 phút trước) và email xin đánh giá (1 ngày sau)
  chỉ được gửi khi có một cron bên ngoài gọi định kỳ `GET /api/cron/reminders`
  — Hostinger không tự chạy tác vụ nền. Xem hướng dẫn thiết lập ở
  [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md#7-cron-job--nhắc-lịch-hẹn--xin-đánh-giá).
