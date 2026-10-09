// Privacy Policy text per locale. `**bold**` marks the legal-entity details,
// same convention as terms-content.ts. Only vi/en exist today — this was
// added specifically to satisfy the Google Play Store's requirement for a
// published privacy policy URL; other locales can be added the same way
// terms-content.ts's locales were (see that file's own TODO on scattered
// dictionaries not yet translated into the newer languages).
export interface PrivacySection {
  title: string;
  paragraphs: string[];
}

export interface PrivacyContent {
  title: string;
  updated: string;
  sections: PrivacySection[];
  businessIdLabel: string;
  addressLabel: string;
}

export const PRIVACY: Record<string, PrivacyContent> = {
  vi: {
    title: "Chính sách quyền riêng tư",
    updated: "Cập nhật lần cuối: 09/10/2026",
    businessIdLabel: "Mã số doanh nghiệp",
    addressLabel: "Địa chỉ",
    sections: [
      {
        title: "1. Giới thiệu chung",
        paragraphs: [
          "Chính sách quyền riêng tư này mô tả cách **Moja Investors Oy** (“VaraaAi”, “chúng tôi”) thu thập, sử dụng và bảo vệ thông tin cá nhân khi bạn sử dụng website VaraaAi.Com và ứng dụng di động VaraaAi (gọi chung là “Dịch vụ VaraaAi”), bao gồm cả khi bạn là khách hàng đặt lịch hoặc chủ salon quản lý doanh nghiệp trên nền tảng.",
          "Bằng việc sử dụng Dịch vụ VaraaAi, bạn đồng ý với việc thu thập và sử dụng thông tin theo Chính sách này.",
        ],
      },
      {
        title: "2. Thông tin chúng tôi thu thập",
        paragraphs: [
          "Thông tin tài khoản: họ tên, email, số điện thoại, mật khẩu (được mã hóa), và ảnh đại diện nếu bạn tải lên.",
          "Thông tin đặt lịch và sử dụng dịch vụ: lịch sử đặt lịch, dịch vụ đã chọn, ghi chú gửi cho salon, đánh giá và bình luận bạn để lại.",
          "Thông tin doanh nghiệp (đối với chủ salon): tên salon, địa chỉ, giờ làm việc, dịch vụ, thông tin nhân viên, thông tin ngân hàng/hóa đơn mà bạn chủ động nhập để sử dụng tính năng thanh toán và xuất hóa đơn.",
          "Vị trí: nếu bạn cho phép, chúng tôi dùng vị trí thiết bị để hiển thị salon gần bạn và tính khoảng cách — bạn có thể từ chối quyền này và vẫn sử dụng được phần lớn tính năng.",
          "Camera: ứng dụng/website có thể yêu cầu quyền truy cập camera để quét mã QR (thẻ thành viên, hóa đơn) khi bạn chủ động sử dụng tính năng đó.",
          "Thông tin thanh toán: khi bạn thanh toán bằng thẻ quốc tế, thông tin thẻ được xử lý trực tiếp bởi Stripe — VaraaAi không lưu trữ số thẻ của bạn. Với chuyển khoản ngân hàng, chúng tôi chỉ ghi nhận trạng thái xác nhận thanh toán.",
          "Dữ liệu thiết bị và sử dụng: loại thiết bị, trình duyệt, địa chỉ IP, và dữ liệu phân tích truy cập thông qua Google (quảng cáo/thống kê) và Meta Pixel, phục vụ việc cải thiện dịch vụ và đo lường hiệu quả quảng cáo.",
        ],
      },
      {
        title: "3. Mục đích sử dụng thông tin",
        paragraphs: [
          "Vận hành và cung cấp Dịch vụ VaraaAi: tạo tài khoản, xử lý đặt lịch, gửi email/thông báo xác nhận và nhắc lịch, hỗ trợ khách hàng.",
          "Cho phép salon quản lý lịch hẹn, khách hàng, nhân viên, dịch vụ và hóa đơn của chính họ.",
          "Cải thiện chất lượng dịch vụ, phát hiện và ngăn chặn gian lận hoặc lạm dụng nền tảng.",
          "Gửi email marketing khi salon chủ động gửi cho khách hàng cũ của mình, hoặc thông báo quan trọng từ VaraaAi — bạn luôn có thể hủy đăng ký nhận email marketing.",
        ],
      },
      {
        title: "4. Chia sẻ thông tin với bên thứ ba",
        paragraphs: [
          "Chúng tôi không bán thông tin cá nhân của bạn. Thông tin chỉ được chia sẻ với: Đối tác salon mà bạn đặt lịch (để họ thực hiện dịch vụ), đơn vị xử lý thanh toán (Stripe), nhà cung cấp hạ tầng lưu trữ và email, và khi pháp luật yêu cầu.",
          "Các công cụ phân tích/quảng cáo của bên thứ ba (Google, Meta) có thể nhận một số dữ liệu thiết bị để đo lường hiệu quả quảng cáo, theo chính sách riêng của từng nền tảng đó.",
        ],
      },
      {
        title: "5. Bảo mật dữ liệu",
        paragraphs: [
          "Chúng tôi áp dụng các biện pháp kỹ thuật và tổ chức hợp lý để bảo vệ thông tin của bạn khỏi truy cập, sử dụng hoặc tiết lộ trái phép, bao gồm mã hóa mật khẩu và kết nối HTTPS. Tuy nhiên, không có phương thức truyền tải hoặc lưu trữ nào an toàn tuyệt đối 100%.",
        ],
      },
      {
        title: "6. Lưu trữ và xóa dữ liệu",
        paragraphs: [
          "Chúng tôi lưu trữ thông tin của bạn trong thời gian tài khoản còn hoạt động, hoặc theo thời hạn cần thiết để tuân thủ nghĩa vụ pháp lý (ví dụ: hồ sơ hóa đơn, kế toán).",
          "Bạn có thể yêu cầu xóa tài khoản và dữ liệu cá nhân bất kỳ lúc nào bằng cách liên hệ với chúng tôi qua email bên dưới.",
        ],
      },
      {
        title: "7. Quyền của bạn",
        paragraphs: [
          "Bạn có quyền truy cập, chỉnh sửa thông tin cá nhân của mình trực tiếp trong phần cài đặt tài khoản, và có quyền yêu cầu xóa tài khoản, rút lại sự đồng ý, hoặc khiếu nại với cơ quan bảo vệ dữ liệu có thẩm quyền.",
        ],
      },
      {
        title: "8. Trẻ em",
        paragraphs: [
          "Dịch vụ VaraaAi không dành cho người dưới 18 tuổi sử dụng độc lập. Chúng tôi không cố ý thu thập thông tin cá nhân từ trẻ em dưới 18 tuổi.",
        ],
      },
      {
        title: "9. Thay đổi Chính sách",
        paragraphs: [
          "Chúng tôi có thể cập nhật Chính sách này theo thời gian. Phiên bản mới nhất luôn được đăng tại trang này kèm ngày cập nhật.",
        ],
      },
      { title: "10. Liên hệ", paragraphs: [] },
    ],
  },
  en: {
    title: "Privacy Policy",
    updated: "Last updated: 2026-10-09",
    businessIdLabel: "Business ID",
    addressLabel: "Address",
    sections: [
      {
        title: "1. Introduction",
        paragraphs: [
          "This Privacy Policy describes how **Moja Investors Oy** (“VaraaAi”, “we”) collects, uses and protects personal information when you use the VaraaAi.Com website and the VaraaAi mobile app (together, the “VaraaAi Service”), whether you're a customer booking an appointment or a salon owner managing a business on the platform.",
          "By using the VaraaAi Service, you agree to the collection and use of information as described in this Policy.",
        ],
      },
      {
        title: "2. Information we collect",
        paragraphs: [
          "Account information: full name, email, phone number, password (encrypted), and a profile photo if you upload one.",
          "Booking and usage information: your booking history, chosen services, notes sent to a salon, and reviews or comments you leave.",
          "Business information (for salon owners): salon name, address, opening hours, services, staff details, and bank/invoice details you enter yourself to use payment and invoicing features.",
          "Location: with your permission, we use your device's location to show nearby salons and calculate distance — you can decline this and still use most features.",
          "Camera: the app/website may request camera access to scan a QR code (loyalty cards, invoices) when you actively use that feature.",
          "Payment information: for international card payments, your card details are processed directly by Stripe — VaraaAi never stores your card number. For bank transfers, we only record the confirmed payment status.",
          "Device and usage data: device type, browser, IP address, and analytics collected via Google (advertising/analytics) and the Meta Pixel, used to improve the service and measure advertising performance.",
        ],
      },
      {
        title: "3. How we use this information",
        paragraphs: [
          "To operate and provide the VaraaAi Service: creating accounts, processing bookings, sending confirmation/reminder emails, and customer support.",
          "To let a salon manage its own bookings, customers, staff, services and invoices.",
          "To improve service quality, and to detect and prevent fraud or abuse of the platform.",
          "To send marketing emails that a salon chooses to send its own past customers, or important notices from VaraaAi — you can always unsubscribe from marketing email.",
        ],
      },
      {
        title: "4. Sharing information with third parties",
        paragraphs: [
          "We do not sell your personal information. Information is shared only with: the salon you book with (so they can provide the service), our payment processor (Stripe), our hosting and email infrastructure providers, and when required by law.",
          "Third-party analytics/advertising tools (Google, Meta) may receive some device data to measure advertising performance, under each platform's own policy.",
        ],
      },
      {
        title: "5. Data security",
        paragraphs: [
          "We apply reasonable technical and organizational measures to protect your information from unauthorized access, use or disclosure, including password encryption and HTTPS connections. No method of transmission or storage is ever 100% secure, however.",
        ],
      },
      {
        title: "6. Data retention and deletion",
        paragraphs: [
          "We keep your information for as long as your account is active, or as long as needed to meet legal obligations (e.g. invoicing and accounting records).",
          "You can request deletion of your account and personal data at any time by contacting us at the email below.",
        ],
      },
      {
        title: "7. Your rights",
        paragraphs: [
          "You can access and edit your personal information directly in your account settings, and you have the right to request account deletion, withdraw consent, or file a complaint with the relevant data protection authority.",
        ],
      },
      {
        title: "8. Children",
        paragraphs: [
          "The VaraaAi Service is not intended for independent use by anyone under 18. We do not knowingly collect personal information from children under 18.",
        ],
      },
      {
        title: "9. Changes to this Policy",
        paragraphs: [
          "We may update this Policy from time to time. The latest version is always posted on this page along with its update date.",
        ],
      },
      { title: "10. Contact", paragraphs: [] },
    ],
  },
};
