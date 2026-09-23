# Triển khai VaraaAi.Com lên Hostinger Cloud Hosting

Giả định: bạn đã có gói **Hostinger Cloud Hosting** và tên miền **VaraaAi.Com**
đã trỏ vào đó (theo xác nhận trước đó). Các bước dưới đây thao tác trong
**hPanel** — vì đây là hành động trên tài khoản Hostinger của bạn, tôi không
thể tự đăng nhập hộ; bạn thực hiện theo hướng dẫn, tôi có thể hỗ trợ nếu gặp lỗi.

## 1. Tạo cơ sở dữ liệu MySQL

1. hPanel → **Databases → MySQL Databases**.
2. Tạo database mới, ví dụ `u123_varaaai`, tạo user + mật khẩu mạnh, gán user vào database (toàn quyền).
3. Ghi lại chuỗi kết nối dạng:
   ```
   mysql://<user>:<password>@localhost:3306/<database>
   ```
   Nếu ứng dụng Node.js chạy trên **cùng** server Hostinger (bình thường là vậy
   với Cloud Hosting), dùng `localhost`. Nếu Hostinger yêu cầu host khác
   (một số gói dùng `srv####.hstgr.io`), lấy đúng host đó trong trang chi tiết database.

## 2. Tạo ứng dụng Node.js trong hPanel

1. hPanel → **Advanced → Node.js** (Hostinger Cloud hỗ trợ chạy Node.js trực tiếp qua giao diện này).
2. **Create Application**:
   - Node.js version: **20.x**
   - Application root: thư mục bạn sẽ deploy code vào, ví dụ `varaaai`
   - Application URL: `varaaai.com`
   - Application startup file: `node_modules/next/dist/bin/next` với **Startup parameters**: `start`
     (hoặc dùng `server.js` nếu Hostinger yêu cầu một file cụ thể — xem ghi chú "server.js" bên dưới)
3. Trong phần **Environment variables** của ứng dụng, dán toàn bộ nội dung từ
   `.env.example`, đã điền giá trị thật (đặc biệt `DATABASE_URL`,
   `NEXT_PUBLIC_SITE_URL=https://varaaai.com`, `AUTH_URL=https://varaaai.com`,
   `AUTH_SECRET` — tạo bằng `openssl rand -base64 32` trên máy bạn).

## 3. Đưa code lên server

### Cách A — Git (khuyên dùng, có trong nhiều gói Hostinger)

1. hPanel → **Advanced → Git** → kết nối tới repo GitHub
   `https://github.com/coibyt/coibyt.git`, chọn nhánh `main`.
2. Hostinger sẽ tự `git pull` vào Application root mỗi khi bạn nhấn **Deploy**
   (hoặc tự động khi có push mới, tuỳ gói).
3. Sau khi pull xong, vào **Node.js app → Run NPM Install**, sau đó thêm lệnh
   build tuỳ chỉnh nếu hPanel cho phép chạy script (mục "Run script" hoặc SSH):
   ```bash
   npx prisma migrate deploy
   npm run build
   ```
4. Khởi động lại ứng dụng (**Restart**) trong màn hình Node.js.

### Cách B — SSH (nếu gói của bạn có quyền SSH)

```bash
ssh u123456@your-server.hostinger.com
cd domains/varaaai.com/varaaai   # hoặc đường dẫn Application root đã tạo
git clone https://github.com/coibyt/coibyt.git .
npm install
npx prisma migrate deploy
npm run build
```
Sau đó quay lại hPanel, nhấn **Restart** cho ứng dụng Node.js để nó chạy `npm run start`.

## 4. Chạy migration & seed dữ liệu mẫu (chỉ lần đầu)

Qua SSH hoặc "Run script" trong hPanel:
```bash
npx prisma migrate deploy
npm run db:seed     # tạo tài khoản admin/demo — có thể bỏ qua ở production thật
```
Ở môi trường thật cho khách hàng cuối, cân nhắc **bỏ qua `db:seed`** hoặc xoá
tài khoản demo sau khi test xong, vì mật khẩu demo (`Password123!`) là công khai
trong README.

## 5. SSL / HTTPS

Hostinger Cloud Hosting tự cấp SSL miễn phí (Let's Encrypt) cho domain đã trỏ
vào nó — kiểm tra ở hPanel → **SSL**. Đảm bảo bật "Force HTTPS".

## 6. Webhook cho thanh toán

Sau khi domain đã chạy HTTPS, cập nhật các URL callback ở phía nhà cung cấp
thanh toán để trỏ về domain thật:

- **Stripe**: Dashboard → Developers → Webhooks → thêm endpoint
  `https://varaaai.com/api/payments/stripe/webhook`, chọn sự kiện
  `checkout.session.completed`. Copy "Signing secret" vào biến môi trường
  `STRIPE_WEBHOOK_SECRET`.
- **VNPay**: trong hồ sơ merchant sandbox/thật, khai báo Return URL
  `https://varaaai.com/api/payments/vnpay/return`.
- **MoMo**: khai báo `redirectUrl` = `https://varaaai.com/api/payments/momo/return`
  và `ipnUrl` = `https://varaaai.com/api/payments/momo/ipn` (đã đặt sẵn qua
  biến môi trường `MOMO_REDIRECT_URL` / `MOMO_IPN_URL`).

## Ghi chú về "server.js"

Next.js ở chế độ `output: "standalone"` (đã cấu hình trong `next.config.mjs`)
tự sinh ra một `server.js` gọn nhẹ trong `.next/standalone` sau khi build, phù
hợp nếu Hostinger yêu cầu chỉ định một file khởi động cụ thể thay vì chạy
`next start`. Nếu màn hình Node.js của hPanel bắt buộc chọn "Startup file" là
một `.js` cụ thể, hãy build trước rồi trỏ vào:
```
.next/standalone/server.js
```
và copy thêm thư mục `public/` cùng `.next/static` vào cạnh nó theo hướng dẫn
build output của Next.js (`.next/standalone/.next/static`).
