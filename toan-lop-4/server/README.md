# Server Ong Vàng Toán 3

Backend cho app Flutter **Ong Vàng Toán 3**: tài khoản phụ huynh, hồ sơ các bé, đồng bộ tiến độ,
phát nội dung (bài học / đề kiểm tra), mua VIP trong app và trang CMS nhỏ để soạn nội dung.

Công nghệ: Node.js 22, Express 4, PostgreSQL 16 (`pg`), `ajv` (JSON Schema 2020-12). Không cần build,
không dùng TypeScript.

---

## 1. Chạy trên Windows 10 (máy 4 GB RAM)

Với 4 GB RAM, **nên cài PostgreSQL trực tiếp** thay vì Docker Desktop (Docker cần WSL2, tốn nhiều RAM).

### Bước 1 — Cài Node.js 22

1. Vào <https://nodejs.org/en/download>, tải bản **Windows Installer (.msi) — v22 LTS**, cài với tuỳ chọn mặc định.
2. Mở **Command Prompt** (bấm phím Windows, gõ `cmd`, Enter) và kiểm tra:
   ```bat
   node -v
   ```
   Phải hiện `v22.x.x`.

### Bước 2 — Cài PostgreSQL 16

1. Vào <https://www.postgresql.org/download/windows/> → “Download the installer” → chọn **PostgreSQL 16** cho Windows x86-64.
2. Chạy file cài đặt, giữ mặc định. Khi được hỏi **mật khẩu cho user `postgres`**, đặt một mật khẩu và **ghi lại**.
   Cổng giữ nguyên `5432`. Có thể bỏ chọn “Stack Builder”.
3. Mở **SQL Shell (psql)** trong menu Start. Nhấn Enter cho các câu hỏi Server/Database/Port/Username
   (giữ mặc định), rồi nhập mật khẩu `postgres` vừa đặt.
4. Dán lần lượt 3 lệnh sau (mỗi lệnh Enter một lần):
   ```sql
   CREATE ROLE toan3 LOGIN PASSWORD 'toan3_dev_only';
   CREATE DATABASE toan3 OWNER toan3;
   CREATE DATABASE toan3_test OWNER toan3;
   ```
   Gõ `\q` để thoát. (`toan3_test` chỉ dùng khi chạy test.)

   > Mật khẩu `toan3_dev_only` chỉ dùng trên máy cá nhân. Lên server thật phải đổi.

### Bước 3 — Cài thư viện và cấu hình

Trong Command Prompt:

```bat
cd đường-dẫn-tới\toan-lop-3\server
npm install
copy .env.example .env
notepad .env
```

Trong Notepad, sửa dòng `ADMIN_TOKEN=...` thành một chuỗi ngẫu nhiên. Tạo chuỗi bằng lệnh:

```bat
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```

Dán kết quả vào sau `ADMIN_TOKEN=` rồi lưu file (Ctrl+S). Các dòng khác giữ nguyên là chạy được.

### Bước 4 — Tạo bảng, nhập nội dung, chạy server

```bat
npm run migrate
npm run seed
npm start
```

- `npm run migrate`: tạo bảng (chạy lại nhiều lần không sao, chỉ áp dụng file mới trong `migrations/`).
- `npm run seed`: nhập toàn bộ `..\assets\content\**\*.json` vào CSDL (đã xuất bản, rev 1). Tài liệu đã có thì
  bỏ qua; muốn ghi đè bằng bản trong file: `npm run seed -- --force` (mỗi tài liệu lên rev mới).
- `npm start`: chạy server. Khi thấy `Ong Vàng Toán 3 server đang chạy: http://localhost:8080` là xong.

Kiểm tra bằng trình duyệt:

- <http://localhost:8080/healthz> → `{"ok":true}`
- <http://localhost:8080/v1/catalog> → mục lục nội dung
- <http://localhost:8080/admin> → trang CMS (nhập `ADMIN_TOKEN` ở ô “Mã quản trị”, bấm “Tải danh sách”)

Dừng server: bấm **Ctrl+C** trong cửa sổ Command Prompt.

### Bước 5 — Cho app Flutter gọi vào server trên máy tính

- Máy ảo Android (emulator): dùng địa chỉ `http://10.0.2.2:8080`.
- Điện thoại thật cùng Wi-Fi: dùng `http://<IP máy tính>:8080` (xem IP bằng lệnh `ipconfig`, dòng IPv4).
  Khi Windows hỏi tường lửa cho Node.js, chọn **Allow** cho mạng Private.
- App trên điện thoại **không** cần cấu hình CORS. `CORS_ORIGINS` chỉ dùng khi có trang web khác origin gọi API.

### Chạy test

Test dùng CSDL **thật** `toan3_test` (tên phải kết thúc bằng `_test`; test **xoá sạch** CSDL này mỗi lần chạy):

```bat
npm test
```

Nếu CSDL test ở chỗ khác, sửa `TEST_DATABASE_URL` trong `.env`.

### (Tuỳ chọn) Dùng Docker thay cho cài PostgreSQL

Nếu đã có Docker Desktop: `docker compose up -d` (tạo sẵn CSDL `toan3` và `toan3_test` với cùng mật khẩu như
`.env.example`), sau đó làm từ Bước 3. Dừng: `docker compose down`.

---

## 2. Chạy trên macOS / Linux

```bash
cd server
npm install
cp .env.example .env        # sửa ADMIN_TOKEN
docker compose up -d        # hoặc dùng PostgreSQL có sẵn (tạo role/DB như Bước 2)
npm run migrate && npm run seed && npm start
npm test
```

---

## 3. Biến môi trường (`.env`)

| Biến | Ý nghĩa |
|---|---|
| `DATABASE_URL` | Chuỗi kết nối PostgreSQL. |
| `PORT` | Cổng HTTP (mặc định 8080). |
| `ADMIN_TOKEN` | Mã quản trị CMS. Chưa đặt, còn placeholder `<<...>>` hoặc ngắn hơn 16 ký tự → mọi `/v1/admin/*` trả 503 `admin_disabled`. |
| `IAP_DEV_MODE` | `true` = chấp nhận biên nhận giả bắt đầu bằng `TEST-`. Server **từ chối khởi động** nếu đồng thời `NODE_ENV=production`. |
| `APPLE_SHARED_SECRET`, `GOOGLE_SERVICE_ACCOUNT_JSON` | Dành cho xác minh mua hàng thật (chưa cài đặt — xem mục 6). |
| `CORS_ORIGINS` | Danh sách origin được phép, cách nhau dấu phẩy. Mặc định: không cho origin nào. |
| `AUTH_RATE_LIMIT_PER_MIN` | Số request tối đa/phút/IP cho `/v1/auth/*` (mặc định 20). |
| `TRUST_PROXY` | `1` khi chạy sau reverse proxy (nginx/Caddy) để lấy đúng IP. |
| `TEST_DATABASE_URL` | CSDL cho `npm test`. |
| `SCHEMA_PATH`, `CONTENT_DIR` | (Tuỳ chọn) đổi đường dẫn schema / thư mục nội dung. Mặc định `../schema/...` và `../assets/content`. |

Biến đặt sẵn trong môi trường hệ thống được ưu tiên hơn giá trị trong `.env`.

---

## 4. API (app Flutter dùng đúng hợp đồng này)

Mọi dữ liệu là JSON. Lỗi luôn có dạng `{ "error": "<mã>", "message": "<tiếng Việt>" }`.
Đăng nhập gửi token qua header `Authorization: Bearer <token>`.

| Phương thức & đường dẫn | Mô tả |
|---|---|
| `GET /healthz` | `{ "ok": true }` |
| `POST /v1/auth/register` `{email, password}` | 201 `{ token, account }`. Mật khẩu ≥ 8 ký tự; email chuyển chữ thường, không trùng (409 `email_taken`). |
| `POST /v1/auth/login` `{email, password}` | 200 `{ token, account }` / 401 `invalid_credentials` |
| `POST /v1/auth/logout` | 204, xoá phiên hiện tại |
| `GET /v1/me` | `{ account }` với `account = { id, email, vipUntil: ISO\|null, isVip }` |
| `GET /v1/children` | `{ children: [{id, name, nickname, leaderboardOptIn}] }` |
| `POST /v1/children` `{name}` | 201 `{ id, name, nickname, leaderboardOptIn }` (tên 1–40 ký tự; biệt danh do server sinh) |
| `PATCH /v1/children/:id` `{leaderboardOptIn?, regenerateNickname?}` | 200 `{ id, name, nickname, leaderboardOptIn }` — xem mục 4b |
| `GET /v1/children/:id/progress` | `{ progress: object\|null, updatedAt: ISO\|null }`; bé không thuộc tài khoản → 404 |
| `PUT /v1/children/:id/progress` `{progress}` | Server **gộp** với bản đã lưu, trả `{ progress: <bản gộp>, updatedAt }`. Sai kiểu → 400 `invalid_progress`; riêng `pointsByDay` có mặt mà không phải object → 422 `invalid_progress` |
| `GET /v1/leaderboard?period=week\|month&childId=<id>` | Bảng xếp hạng theo biệt danh — xem mục 4b |
| `GET /v1/catalog` | Nội dung catalog đang phát hành (có `ETag`) |
| `GET /v1/content/lessons/:id`, `GET /v1/content/exams/:id` | `{ rev, body }`; VIP mà chưa đăng nhập bằng tài khoản VIP còn hạn → 403 `vip_required`; chưa xuất bản/không có → 404 |
| `POST /v1/iap/verify` `{platform, productId, receipt}` | Cần đăng nhập. Trả `{ account }` |
| `GET /admin` | Trang CMS |
| `GET /v1/admin/documents` | `{ documents: [{id, kind, rev, access, published, updatedAt, title}] }` |
| `GET /v1/admin/documents/:id` | Toàn bộ: `body` (nháp), `publishedBody`, `rev`, `published`, ... |
| `PUT /v1/admin/documents/:id` `{body}` | Kiểm tra rồi lưu **nháp**; lỗi → 422 `{ error: "invalid_content", issues: [{path, message}] }` |
| `POST /v1/admin/documents/:id/publish` | Xuất bản bản nháp: `rev + 1`, trả `{ id, rev }` |
| `POST /v1/admin/validate` `{body}` | Chỉ kiểm tra: `{ ok, issues }` |

Ghi chú:

- **ETag** của nội dung là `"<id>@<rev>"` (catalog: `"catalog@<rev>"`). App gửi `If-None-Match` → 304 nếu không đổi.
  Nội dung VIP luôn kiểm tra quyền trước khi trả 304.
- **Mã tài liệu**: lesson/exam dùng `id` trong file; catalog dùng mã cố định `catalog`.
- **Quyền VIP của bài học**: schema không có `access` ở cấp bài học, nên server lấy theo mục của bài trong
  **catalog đang phát hành** (`books[].chapters[].lessons[].access`; không có trong catalog → `free`).
  Đề kiểm tra dùng trường `access` của đề.
- **Nháp và bản phát hành tách riêng**: lưu nháp không ảnh hưởng app cho tới khi bấm “Xuất bản”.
  `published = true` nghĩa là bản nháp trùng bản đang phát hành.
- Nội dung lưu bằng kiểu `JSON` (không phải `JSONB`) nên giữ nguyên thứ tự khoá như người soạn viết.

### Kiểm tra nội dung (CMS & seed)

1. JSON Schema `../schema/toan4-content.v1.schema.json` (đọc khi khởi động). Lỗi `oneOf` được rút gọn theo
   đúng loại block/bài toán nên thông báo dễ đọc.
2. Kiểm tra toán (port từ `lib/logic/expression_evaluator.dart`): mọi block `equation` và mọi dòng `equation`
   của `word_problem` phải đúng (`+ - × x * : ÷`, ngoặc, nhân/chia trước, chia phải chia hết, bỏ đơn vị
   “(cái)” ở cuối, số kiểu 12.345). Ví dụ `24 × 3 = 62 (cái)` bị báo lỗi.
3. `fill_blank`: các ô `{{id}}` trong `template` khớp đúng với `blanks`; `multiple_choice`: `correctChoiceIds`
   phải có trong `choices` (và chỉ 1 đáp án nếu không bật `multiSelect`); đề kiểm tra: tổng điểm = 10.
4. Thêm: kết quả `column_arithmetic`, phép chia `long_division`, ô/thẻ của `drag_drop`, cặp của `matching`,
   mã bài toán không trùng.

---

## 4b. Bảng xếp hạng (an toàn cho trẻ em)

**Biệt danh (bảo vệ quyền riêng tư của bé).** Bảng xếp hạng **không bao giờ** hiện tên thật của bé, email
phụ huynh hay id của bé khác — chỉ hiện biệt danh. Biệt danh do **server sinh ngẫu nhiên** (crypto), người
dùng không tự gõ được (không có chữ tự do → không lộ thông tin cá nhân, không có từ xấu). Dạng
`<Con vật> <Tính từ tích cực> <số 10–99>`, ví dụ “Mèo Thông Minh 99”, “Gấu Chăm Chỉ 12”. Danh sách từ nằm ở
`src/nickname.js` (migration `002_leaderboard.sql` gán biệt danh cho các bé đã có từ trước, cùng danh sách).

- `PATCH /v1/children/:id` (chỉ phụ huynh của bé, không phải → 404). Body chỉ nhận:
  `leaderboardOptIn: true|false` (bật/tắt tham gia bảng xếp hạng, mặc định bật) và
  `regenerateNickname: true` (xin biệt danh ngẫu nhiên khác). Trường khác / sai kiểu / body rỗng → 400 `invalid_patch`.
- `GET /v1/leaderboard?period=week|month&childId=<id>` (cần đăng nhập; `childId` phải là bé của tài khoản,
  thiếu/sai/của người khác → 404; `period` mặc định `week`, giá trị khác → 400 `invalid_period`).
  - Tính theo **giờ Việt Nam (UTC+7)**: tuần = thứ Hai 00:00 → thứ Hai tuần sau; tháng = ngày 1 → ngày 1 tháng sau.
    `start` tính vào, `end` không tính vào.
  - Điểm của bé = tổng theo từng ngày trong kỳ của `min(progress.pointsByDay[ngày], 1000)`.
    **Mỗi ngày tính tối đa 1000 điểm** (`LEADERBOARD_DAILY_CAP` trong `src/config.js`) để chống gian lận.
  - Chỉ xếp hạng bé **đang bật** bảng xếp hạng và có điểm > 0. Thứ tự: điểm giảm dần; bằng điểm → bé tạo hồ sơ
    trước đứng trên (rồi theo id). Hạng là số thứ tự 1, 2, 3… (không có hạng đồng hạng). Chỉ trả **top 50**.
  - Phản hồi:
    ```json
    { "period": "week", "start": "2026-11-09", "end": "2026-11-16",
      "entries": [ { "rank": 1, "nickname": "Mèo Thông Minh 99", "points": 420, "isMe": false } ],
      "me": { "rank": 7, "points": 180, "nickname": "Gấu Chăm Chỉ 12", "optedIn": true,
              "above": { "rank": 6, "nickname": "Thỏ Nhanh Nhẹn 47", "points": 195 }, "gapToAbove": 16 } }
    ```
    `gapToAbove` = số điểm cần thêm để vượt hẳn bạn ngay phía trên (`above.points − me.points + 1`).
    Bé hạng 1 → `above` và `gapToAbove` là `null`. Bé 0 điểm hoặc đã tắt bảng xếp hạng → `me.rank = null`,
    `me.points` vẫn là điểm của bé (bé tắt thì `optedIn: false`), `above`/`gapToAbove` là `null`.
  - Hiện tại điểm được tính trực tiếp từ bảng `progress` mỗi lần gọi (đủ cho vài nghìn bé). Khi đông hơn: tách
    `pointsByDay` ra bảng điểm theo ngày + index, và cache kết quả vài phút (ghi chú trong `src/leaderboard.js`).

---

## 5. Quy tắc gộp tiến độ (`src/merge.js` — app Dart cài đặt giống hệt)

| Trường | Quy tắc |
|---|---|
| `totalPoints` | lớn hơn |
| `lessons[id]` | `bestStars`, `bestPoints`, `plays` lấy lớn hơn; `lastPlayed` lấy muộn hơn |
| `skills[id]` | giữ bên có `total` lớn hơn; bằng nhau → bên có `correct` lớn hơn |
| `activeDays` | hợp hai bên, sắp xếp tăng dần |
| `exams` | hợp, bỏ trùng theo (`examId`, `at`) — `at` so theo **thời điểm** (`…00.000Z` = `…00Z`), trùng thì giữ bản của bên mới hơn; sắp xếp theo `at` |
| `badges` | hợp, mỗi mã giữ ngày **sớm nhất** |
| `pointsByDay` | `{ "YYYY-MM-DD": điểm }` (ngày theo giờ VN): hợp các ngày, mỗi ngày lấy **lớn hơn**; bỏ giá trị không phải số nguyên ≥ 0 và khoá ngày sai định dạng. Chỉ có trong kết quả khi ít nhất một bên có |
| `childName`, `bookId` | từ bên có `updatedAt` mới hơn (thiếu `updatedAt` = cũ nhất; bằng nhau → bên thứ hai, tức bản app vừa gửi). Bên mới hơn không có `bookId` thì kết quả không có `bookId` |
| `updatedAt` | muộn hơn |
| `v` | `1` |
| khoá lạ | giữ các khoá không thuộc danh sách trên của bên **mới hơn** |

`updatedAt` trong phản hồi API là thời điểm server lưu bản gộp (khác với `progress.updatedAt` của app).
Hai thiết bị đẩy cùng lúc được xử lý lần lượt (khoá hàng trong transaction) nên không mất dữ liệu.

---

## 6. Mua VIP (IAP)

- Sản phẩm: `vn.ongvang.toan3.vip_month` (+30 ngày), `vn.ongvang.toan3.vip_year` (+365 ngày).
  Gia hạn từ `max(bây giờ, vipUntil)`.
- Mỗi giao dịch được lưu vào bảng `purchases` (kèm sha256 của biên nhận). Biên nhận đã dùng cho **tài khoản khác**
  → 409 `receipt_used`. Cùng tài khoản gửi lại biên nhận cũ → 200, **không** cộng thêm ngày.
- `IAP_DEV_MODE=true`: biên nhận bắt đầu bằng `TEST-` được chấp nhận (để thử app). Không bao giờ bật trên production.
- **Chưa làm: xác minh thật với Apple/Google** (cần tài khoản nhà phát triển và khoá). Hiện mọi biên nhận thật trả
  501 `iap_not_configured`. Chỗ cần viết: hàm `verifyWithStore()` trong `src/iap.js`, có TODO và link:
  - Apple App Store Server API: <https://developer.apple.com/documentation/appstoreserverapi>
  - Google Play Developer API `purchases.subscriptionsv2.get`:
    <https://developers.google.com/android-publisher/api-ref/rest/v3/purchases.subscriptionsv2/get>

---

## 7. Bảo mật

- Mật khẩu băm bằng `scrypt` (node:crypto) với salt ngẫu nhiên riêng từng người, so sánh hằng-thời-gian.
- Token đăng nhập: 32 byte ngẫu nhiên (base64url); CSDL chỉ lưu sha256 của token; hạn 90 ngày.
- `ADMIN_TOKEN` so sánh hằng-thời-gian. Trang CMS lưu mã trong `sessionStorage` (mất khi đóng tab).
- Giới hạn 20 request/phút/IP cho `/v1/auth/*` (bộ nhớ trong — nếu chạy nhiều tiến trình thì mỗi tiến trình đếm riêng).
- Header bảo mật (CSP, nosniff, X-Frame-Options...), body JSON tối đa 1 MB, SQL luôn dùng tham số.
- Lên server thật: đặt sau HTTPS (Caddy/nginx), `NODE_ENV=production`, `TRUST_PROXY=1`, `IAP_DEV_MODE=false`,
  đổi mật khẩu CSDL và `ADMIN_TOKEN`. **Không** commit file `.env`.

---

## 8. Cấu trúc thư mục

```
server/
  package.json            npm start | migrate | seed | test
  .env.example            mẫu cấu hình (sao chép thành .env)
  docker-compose.yml      PostgreSQL 16 cho máy cá nhân (tuỳ chọn)
  migrations/001_init.sql lược đồ CSDL (áp dụng theo thứ tự, ghi vào bảng schema_migrations)
  migrations/002_leaderboard.sql  biệt danh + tuỳ chọn bảng xếp hạng của bé
  src/app.js              dựng ứng dụng Express — createApp({ db, config, clock? })
  src/server.js           điểm khởi động
  src/config.js, db.js, auth.js, http.js, content.js, migrate.js, seed.js
  src/validate.js         ajv + kiểm tra toán;  src/expression.js  bộ tính biểu thức
  src/merge.js            gộp tiến độ (hàm thuần)
  src/nickname.js         sinh biệt danh;  src/leaderboard.js  tính bảng xếp hạng
  src/iap.js              mua VIP
  src/routes/*.js         các nhóm API
  scripts/migrate.js, scripts/seed.js
  public/admin/           trang CMS (index.html + admin.js, không cần build)
  test/*.test.js          test (node:test + supertest, chạy trên PostgreSQL thật)
```
