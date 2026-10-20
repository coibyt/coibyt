/** What the AI support assistant knows about VaraaAi.Com. Written in
 * Vietnamese (the assistant answers in the visitor's own language). Every
 * path here is real and has no locale prefix — the chat adds the visitor's
 * language when it turns a path into a link. Keep this in step with the
 * product: a feature that isn't described here is one the assistant will say
 * it doesn't know about. */
export const SUPPORT_KNOWLEDGE = `
# VaraaAi.Com — nền tảng đặt lịch cho salon (nail, tóc, mi, spa, làm đẹp)
Miễn phí cho chủ salon và khách hàng. Có 35 ngôn ngữ (đổi ở menu ngôn ngữ trên đầu trang).
Hai nhóm người dùng: CHỦ SALON (quản lý tiệm) và KHÁCH HÀNG (tìm và đặt lịch).

## Tài khoản
- Đăng nhập: /auth/sign-in — Đăng ký tài khoản khách hàng: /auth/sign-up — Quên mật khẩu: /auth/forgot-password
- Có thể đăng nhập bằng Google.

## BẮT ĐẦU CHO CHỦ SALON
- Trang giới thiệu cho chủ salon: /business
- Đăng ký salon: /business/apply — điền tên, giới thiệu, danh mục, địa chỉ, quốc gia (quốc gia quyết định múi giờ), thành phố, điện thoại. Sau khi xác minh email, salon được kích hoạt ngay, không cần chờ duyệt.
- Hướng dẫn từng bước cho người mới: /help/getting-started
- Thêm chi nhánh (salon thứ hai trở lên, cùng một tài khoản): /business/apply?branch=1 — sau đó đổi qua lại giữa các chi nhánh bằng ô "Chi nhánh" trên đầu trang quản trị.
- Thứ tự nên làm: 1) Cài đặt thông tin + logo/ảnh bìa 2) Dịch vụ 3) Nhân viên 4) Giờ mở cửa 5) Chia sẻ link đặt lịch.

## TRANG QUẢN TRỊ SALON (cần đăng nhập bằng tài khoản chủ salon)
### Tổng quan — /business/dashboard
Doanh thu (theo tiền tệ của salon), lịch hẹn hôm nay, việc cần chú ý, biểu đồ theo tuần/tháng, dịch vụ bán chạy, hiệu suất nhân viên, đánh giá mới, lượt quét mã QR từ poster/bảng giá.

### Dịch vụ — /business/dashboard/services
- Nút "Thêm dịch vụ": tên, nhóm dịch vụ, thời lượng (phút), thời gian dọn dẹp sau (phút), giá, tiền tệ, tiền cọc (không bắt buộc), mô tả, link video YouTube, nhân viên thực hiện (mỗi nhân viên có thể có giá riêng / số phút riêng).
- Nhóm dịch vụ (ví dụ "Làm móng tay") giúp khách dễ tìm; xóa nhóm không xóa dịch vụ.
- Dịch vụ phụ (add-on, ví dụ "Sơn gel thêm"): quản lý tại /business/dashboard/services/addons, rồi vào từng dịch vụ chính để chọn dịch vụ phụ áp dụng.
- Đổi tiền tệ không tự quy đổi giá — phải nhập lại giá.

### Sản phẩm & Đơn hàng — /business/dashboard/products và /business/dashboard/orders
Bán sản phẩm (dưỡng, sơn, quà...) trên trang salon; khách đặt hàng, salon xử lý đơn ở trang Đơn hàng.

### Nhân viên — /business/dashboard/staff
- Thêm nhân viên: tên, chức danh, giới thiệu, ảnh đại diện (lưu nhân viên trước rồi bấm sửa để thêm ảnh), dịch vụ có thể làm, video giới thiệu YouTube.
- Giờ làm việc riêng: bỏ trống thì nhân viên làm theo giờ mở cửa salon; chỉnh bằng biểu tượng đồng hồ. Trên trang Lịch hẹn cũng kéo được giờ bắt đầu/kết thúc ca làm.
- "Thời gian đặt trước tối thiểu": khách phải đặt trước nhân viên này ít nhất bao lâu.
- "Lời nhắn của nhân viên": hiện khi khách đặt lịch với nhân viên này và gửi kèm email xác nhận.
- Tài khoản đăng nhập cho nhân viên (không bắt buộc): cấp email + mật khẩu (tối thiểu 8 ký tự) để nhân viên tự đăng nhập xem lịch.
- Quyền: xem lịch của tất cả nhân viên hoặc chỉ của mình; xem số điện thoại & email khách; cho xem tất cả các trang (chỉ xem, không sửa).

### Giờ mở cửa — /business/dashboard/hours
Đặt giờ mở/đóng cửa cho từng ngày trong tuần. Khách chỉ đặt được giờ còn trống trong giờ mở cửa và giờ làm của nhân viên.

### Lịch hẹn — /business/dashboard/bookings
- Xem theo Ngày / Tuần / Tháng, lọc theo nhân viên.
- Thêm lịch hẹn thủ công (khách gọi điện, khách vãng lai); có ô chọn có gửi email tự động cho khách hay không (mặc định tắt).
- Kéo thả để dời giờ hoặc đổi nhân viên — khách tự nhận email báo giờ mới.
- Đổi trạng thái: Hoàn thành, Không đến, Hủy.
- "Đến quầy thanh toán": tính tiền và phát hành hóa đơn PDF, có thể gửi email hóa đơn cho khách. Cần điền "Thông tin xuất hóa đơn" trong Cài đặt trước.
- Khách đặt được trước tối đa 365 ngày.

### Khách hàng — /business/dashboard/customers
Danh sách khách đã đặt lịch: số lần đến, lần gần nhất, tổng chi tiêu, lịch sử từng lượt hẹn, xem/gửi lại hóa đơn, đánh giá khách (chỉ salon thấy).

### Tin nhắn & trợ lý AI của salon — /business/dashboard/messages
- Hộp thư chat với khách.
- "Trợ lý AI khi bạn vắng mặt": bật để AI trả lời khách về dịch vụ, giá, giờ trống và giúp đặt lịch. Khi khách bấm "Nói chuyện với chủ salon", AI tạm dừng và chủ salon nhận email + thông báo đẩy (bật thông báo trên thiết bị ở cùng trang).
- "Nhúng khung chat": đặt khung chat lên website riêng của salon (khách không cần tài khoản).

### Đánh giá — /business/dashboard/reviews
Đánh giá mới ở trạng thái chờ duyệt; chủ salon chọn "Công khai lên trang salon" hoặc "Ẩn đánh giá này". Khách phải đăng nhập Google để viết đánh giá (để đảm bảo đánh giá thật).
Mời khách đánh giá trên Google: nhập Google Place ID trong Cài đặt → "Liên hệ & mạng xã hội"; sau khi khách đánh giá, hệ thống mời họ chia sẻ lên Google.

### Thẻ tích điểm — /business/dashboard/loyalty
1. "Cài đặt chương trình": số lần đến để được giảm giá và % giảm (có thể đặt giá bán thẻ).
2. "Kích hoạt thẻ cho khách": nhập tên, email (điện thoại không bắt buộc) → khách nhận mã QR qua email. Mỗi email chỉ có một thẻ.
3. Mỗi lần khách đến: "Quét thẻ khi khách đến" — quét QR bằng camera điện thoại hoặc nhập mã trên thẻ → "Cộng 1 điểm".
4. Đủ điểm → áp dụng ưu đãi, thẻ về 0 và bắt đầu chu kỳ mới.
Quy tắc cộng điểm: mỗi lượt hẹn được quét một lần. Lượt hẹn được tính khi đã đến giờ hẹn, còn trên lịch, không bị hủy và không bị đánh dấu "Không đến" (không cần bấm Hoàn thành). Được quét bù tối đa 3 lượt khách đã làm trước ngày làm thẻ. Bấm vào khách để xem thống kê và số lượt hẹn chưa quét.
Khách xem thẻ của mình tại /account/loyalty.

### Thẻ quà tặng — /business/dashboard/gift-cards
- "Tạo mẫu thẻ": tên, dịch vụ áp dụng, % giảm, giá bán, số ngày hiệu lực, số lần dùng.
- Khách mua thẻ trên trang salon (mua xong nhận mã + QR qua email; thẻ kích hoạt khi salon xác nhận đã thanh toán).
- "Gửi thẻ quà tặng cho khách": salon tự tạo thẻ (tên người nhận, email, lời nhắn), có thể chọn "Khách đã thanh toán — kích hoạt thẻ ngay", xem trước rồi gửi ảnh thẻ qua email.
- Kiểm tra / dùng thẻ khi khách đến bằng mã thẻ. Khi đặt lịch online khách cũng có thể nhập mã thẻ để được giảm giá.

### Marketing — /business/dashboard/marketing
- Gửi email khuyến mãi cho khách đã từng đặt lịch: soạn tiêu đề + nội dung → Gửi. Email có sẵn nút đặt lịch và link hủy nhận.
- Tốn điểm Vara: 1 điểm cho mỗi khách nhận; khách đã nhận email trong 72 giờ sẽ được bỏ qua (muốn gửi luôn thì 5 điểm/khách).
- Kiếm điểm Vara: điểm danh mỗi ngày +5; chia sẻ "Link giới thiệu làm chủ salon" (+1 điểm mỗi lượt xem từ IP mới, +1000 điểm khi người được giới thiệu đăng ký và hoàn thiện hồ sơ salon).
- Tiếp thị liên kết (cộng tác viên giới thiệu khách cho salon, tính % hoa hồng): /business/dashboard/marketing/affiliates — VaraaAi chỉ theo dõi và tính hoa hồng, salon tự trả tiền bên ngoài hệ thống.

### Fanpage — /business/dashboard/fanpage
Đăng bài (ảnh, link video YouTube) cho khách đang theo dõi salon; khách xem ở /account/feed.

### Trang landing (website riêng của salon) — /business/dashboard/landing
Website giới thiệu riêng (địa chỉ dạng varaaai.com/site/ten-salon) gồm trang chủ, dịch vụ, đặt lịch, giới thiệu, liên hệ. Chỉnh phần đầu trang (tối đa 5 ảnh trình chiếu), phần giới thiệu, điểm nổi bật, nút bấm; bấm xuất bản để mọi người xem được; "Sao chép liên kết" để chia sẻ.

### Cài đặt — /business/dashboard/settings
- Thông tin salon (tên, giới thiệu, địa chỉ, thành phố, quốc gia/múi giờ, danh mục).
- Ảnh bìa và logo (tối đa 5MB).
- Liên hệ & mạng xã hội (điện thoại, WhatsApp, Facebook, Instagram, TikTok, kênh YouTube, video giới thiệu salon, Google Place ID).
- Tùy chọn salon: ngôn ngữ mặc định cho khách (email và trang nhúng), tiền tệ mặc định, khách được hủy trước bao nhiêu giờ, chính sách hủy (hiện trong email xác nhận).
- Nhận thanh toán qua chuyển khoản: tên ngân hàng, số tài khoản, chủ tài khoản, BIC/SWIFT — khách thấy khi chọn chuyển khoản. Khách cũng có thể chọn trả tiền mặt tại salon.
- Thông tin xuất hóa đơn: tên công ty, địa chỉ, mã số thuế, VAT %.
- Nhúng trang đặt lịch: "Sao chép liên kết" (link đặt lịch dạng varaaai.com/b/ten-salon — dán vào Facebook, Instagram, Google Business, tin nhắn) hoặc "Lấy mã nhúng" để dán vào website riêng.
- Trang đặt lịch chuỗi: một trang chung cho tất cả chi nhánh.
- Tài khoản: đổi email đăng nhập, đổi mật khẩu; ảnh đại diện.

### Hỗ trợ — /business/dashboard/support
Bài đào tạo, thông báo từ VaraaAi, và chat với đội ngũ hỗ trợ. Trung tâm hỗ trợ công khai: /support

### Email tự động (không cần cài đặt)
Khách nhận: xác nhận đặt lịch (kèm nút thêm vào Google Calendar + tệp lịch), email khi salon dời lịch, nhắc lịch trước 24 giờ, 2 giờ và 15 phút, xác nhận khi khách tự hủy, mời đánh giá 1 ngày sau buổi hẹn.
Chủ salon nhận: email khi có lịch hẹn mới, khi khách hủy, khi khách nhắn tin lần đầu.

## CÔNG CỤ MIỄN PHÍ (không cần tài khoản)
- Tạo bảng giá đẹp, song ngữ/đa ngôn ngữ (dịch tự động), có mã QR đặt lịch, xuất PDF/PNG để in: /tools/price-list
- Tạo poster "Quét QR để đặt lịch" (A4, A5, A6, bảng để bàn gấp đôi, tem dán tròn, ảnh vuông, story Instagram; mẫu Giáng sinh, Black Friday, Tết): /tools/qr-poster
- Kiểm tra salon của bạn trông thế nào trên mạng và nhận danh sách việc nên làm: /salon-check

## DÀNH CHO KHÁCH HÀNG
- Tìm salon theo bản đồ và khu vực: /search
- Trang salon: varaaai.com/b/ten-salon — xem dịch vụ, giá, nhân viên, đánh giá; đặt lịch; mua thẻ quà tặng; mua sản phẩm; theo dõi salon.
- Đặt lịch: chọn dịch vụ → nhân viên (hoặc bất kỳ) → ngày giờ → điền thông tin → chọn thanh toán (tiền mặt tại salon hoặc chuyển khoản). Khách chưa có tài khoản vẫn đặt được; có thể tạo tài khoản ngay khi đặt.
- Lịch hẹn của tôi: /account/bookings — xem, hủy (trong thời hạn salon cho phép), đánh giá sau khi làm.
- Thẻ tích điểm của tôi: /account/loyalty
- Tin nhắn với salon: /account/messages
- Salon đang theo dõi: /account/following — Bảng tin: /account/feed
- Hồ sơ cá nhân: /account/profile

## Điều không có trong tài liệu
Nếu câu hỏi về tính năng không có trong tài liệu này (hoặc về giá cả, hợp đồng, sự cố kỹ thuật, tài khoản cụ thể, hoàn tiền), hãy nói thật là bạn chưa chắc và mời người dùng bấm nút "Gặp nhân viên hỗ trợ" để đội ngũ VaraaAi trả lời.
`;
