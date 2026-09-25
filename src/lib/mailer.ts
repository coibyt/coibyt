import nodemailer from "nodemailer";
import { formatMoney } from "@/lib/money";

let _transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!_transporter) {
    _transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 465),
      secure: Number(process.env.SMTP_PORT ?? 465) === 465,
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
        : undefined,
    });
  }
  return _transporter;
}

export async function sendMail(opts: {
  to: string;
  subject: string;
  html: string;
}) {
  // In local dev without SMTP configured, log instead of throwing so the
  // booking flow can still be exercised end-to-end.
  if (!process.env.SMTP_HOST) {
    console.info("[mailer] SMTP not configured, skipping email:", opts.subject, "->", opts.to);
    return;
  }
  const transporter = getTransporter();
  await transporter.sendMail({
    from: process.env.SMTP_FROM ?? "VaraaAi.Com <noreply@varaaai.com>",
    ...opts,
  });
}

export function verificationEmail(params: { name: string; verifyUrl: string; locale: string }) {
  const isVi = params.locale === "vi";
  return {
    subject: isVi
      ? "Xác minh email để kích hoạt salon của bạn"
      : "Verify your email to activate your salon",
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto">
        <h2 style="color:#624f89">${isVi ? "Xác minh địa chỉ email" : "Verify your email"}</h2>
        <p>${isVi ? "Xin chào" : "Hi"} ${params.name},</p>
        <p>${
          isVi
            ? "Nhấp vào nút bên dưới để xác minh email của bạn. Sau khi xác minh, salon của bạn sẽ được kích hoạt ngay — không cần chờ VaraaAi duyệt."
            : "Click the button below to verify your email. Once verified, your salon is activated immediately — no need to wait for VaraaAi's review."
        }</p>
        <p style="text-align:center;margin:24px 0">
          <a href="${params.verifyUrl}" style="background:#624f89;color:#fff;padding:12px 24px;border-radius:999px;text-decoration:none;font-weight:600">
            ${isVi ? "Xác minh email" : "Verify email"}
          </a>
        </p>
        <p style="color:#5b6b6c;font-size:13px">${
          isVi
            ? "Nếu nút không hoạt động, dán liên kết này vào trình duyệt:"
            : "If the button doesn't work, paste this link into your browser:"
        }<br/>${params.verifyUrl}</p>
        <p style="color:#5b6b6c;font-size:14px">VaraaAi.Com</p>
      </div>
    `,
  };
}

export function businessReadyEmail(params: {
  ownerName: string;
  businessName: string;
  dashboardUrl: string;
  guideUrl: string;
  locale: string;
}) {
  const isVi = params.locale === "vi";
  return {
    subject: isVi ? "Salon của bạn đã sẵn sàng!" : "Your salon is ready!",
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto">
        <h2 style="color:#624f89">${isVi ? "Chúc mừng!" : "Congratulations!"}</h2>
        <p>${isVi ? "Xin chào" : "Hi"} ${params.ownerName},</p>
        <p>${
          isVi
            ? `<strong>${params.businessName}</strong> đã sẵn sàng hoạt động trên VaraaAi.Com! Khách hàng có thể tìm thấy và đặt lịch với bạn ngay bây giờ.`
            : `<strong>${params.businessName}</strong> is ready to go on VaraaAi.Com! Customers can now find and book with you.`
        }</p>
        <p style="text-align:center;margin:24px 0">
          <a href="${params.dashboardUrl}" style="background:#624f89;color:#fff;padding:12px 24px;border-radius:999px;text-decoration:none;font-weight:600">
            ${isVi ? "Vào trang quản trị" : "Go to dashboard"}
          </a>
        </p>
        <p>${
          isVi
            ? "Chưa biết bắt đầu từ đâu? Xem hướng dẫn từng bước của chúng tôi để đăng dịch vụ, thêm nhân viên và hơn thế nữa:"
            : "Not sure where to start? Check out our step-by-step guide for adding services, staff, and more:"
        }</p>
        <p><a href="${params.guideUrl}" style="color:#624f89">${params.guideUrl}</a></p>
        <p style="color:#5b6b6c;font-size:14px">VaraaAi.Com</p>
      </div>
    `,
  };
}

export function bookingConfirmationEmail(params: {
  customerName: string;
  businessName: string;
  serviceName: string;
  serviceDescription?: string | null;
  startsAt: Date;
  locale: string;
  businessTimezone: string;
  priceCents: number;
  currency: string;
  staffName?: string | null;
  staffMessage?: string | null;
  businessAddress?: string | null;
  businessCity?: string | null;
  googleMapsUrl?: string | null;
  businessPhone?: string | null;
  cancellationWindowHours: number;
  cancellationPolicy?: string | null;
  /** Included only for the bank-transfer payment method, so the customer
   * has the salon's account details handy without digging through the site. */
  bankInfo?: {
    bankName: string | null;
    bankAccountNumber: string | null;
    bankAccountName: string | null;
    bankBic: string | null;
  };
}) {
  // Always render in the salon's own timezone — an email server can run in
  // any timezone, and the appointment time only means something relative to
  // where the salon actually is.
  const dateStr = params.startsAt.toLocaleString(
    params.locale === "vi" ? "vi-VN" : "en-US",
    { dateStyle: "full", timeStyle: "short", timeZone: params.businessTimezone }
  );
  const isVi = params.locale === "vi";
  const priceStr = formatMoney(params.priceCents, params.currency, params.locale);

  const bankBlock = params.bankInfo
    ? `
      <div style="background:#fff7ed;border:1px solid #fed7aa;padding:12px 16px;border-radius:12px;margin-top:8px">
        <p style="margin:0 0 6px;font-weight:600">${isVi ? "Thông tin chuyển khoản" : "Bank transfer details"}</p>
        ${params.bankInfo.bankName ? `<p style="margin:2px 0">${isVi ? "Ngân hàng" : "Bank"}: ${params.bankInfo.bankName}</p>` : ""}
        ${params.bankInfo.bankAccountNumber ? `<p style="margin:2px 0">${isVi ? "Số tài khoản" : "Account number"}: ${params.bankInfo.bankAccountNumber}</p>` : ""}
        ${params.bankInfo.bankAccountName ? `<p style="margin:2px 0">${isVi ? "Chủ tài khoản" : "Account holder"}: ${params.bankInfo.bankAccountName}</p>` : ""}
        ${params.bankInfo.bankBic ? `<p style="margin:2px 0">BIC/SWIFT: ${params.bankInfo.bankBic}</p>` : ""}
      </div>
    `
    : "";

  const addressLine = [params.businessAddress, params.businessCity].filter(Boolean).join(", ");

  const cancellationText =
    params.cancellationPolicy ||
    (isVi
      ? `Bạn có thể tự hủy lịch hẹn trong hồ sơ của mình cho đến ${params.cancellationWindowHours} giờ trước giờ hẹn.`
      : `You can cancel this appointment yourself, up until ${params.cancellationWindowHours} hours before the appointment.`);

  return {
    subject: isVi
      ? `Xác nhận lịch hẹn tại ${params.businessName}`
      : `Your appointment at ${params.businessName} is confirmed`,
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto">
        <h2 style="color:#624f89">${isVi ? "Lịch hẹn đã được xác nhận" : "Appointment confirmed"}</h2>
        <p>${isVi ? "Xin chào" : "Hi"} ${params.customerName},</p>
        <p>${
          isVi
            ? `Lịch hẹn <strong>${params.serviceName}</strong> tại <strong>${params.businessName}</strong> của bạn đã được xác nhận.`
            : `Your <strong>${params.serviceName}</strong> appointment at <strong>${params.businessName}</strong> is confirmed.`
        }</p>
        <div style="background:#f2f5f5;padding:12px 16px;border-radius:12px">
          <p style="margin:2px 0;font-weight:600">${dateStr}</p>
          <p style="margin:8px 0 2px"><span style="color:#5b6b6c">${isVi ? "Dịch vụ" : "Service"}:</span> ${params.serviceName}</p>
          ${params.serviceDescription ? `<p style="margin:2px 0;color:#5b6b6c;font-size:13px">${params.serviceDescription}</p>` : ""}
          ${params.staffName ? `<p style="margin:2px 0"><span style="color:#5b6b6c">${isVi ? "Nhân viên" : "Staff"}:</span> ${params.staffName}</p>` : ""}
          <p style="margin:2px 0"><span style="color:#5b6b6c">${isVi ? "Số tiền" : "Amount"}:</span> ${priceStr}</p>
          ${addressLine ? `<p style="margin:2px 0"><span style="color:#5b6b6c">${isVi ? "Địa chỉ" : "Address"}:</span> ${addressLine}</p>` : ""}
          ${params.businessPhone ? `<p style="margin:2px 0"><span style="color:#5b6b6c">${isVi ? "Điện thoại" : "Phone"}:</span> ${params.businessPhone}</p>` : ""}
          ${params.googleMapsUrl ? `<p style="margin:6px 0 0"><a href="${params.googleMapsUrl}" style="color:#624f89">${isVi ? "Xem trên Google Maps" : "View on Google Maps"}</a></p>` : ""}
        </div>
        ${
          params.staffMessage
            ? `<div style="background:#eef2ff;border:1px solid #c7d2fe;padding:12px 16px;border-radius:12px;margin-top:8px"><p style="margin:0">${params.staffMessage}</p></div>`
            : ""
        }
        ${bankBlock}
        <div style="margin-top:16px">
          <p style="margin:0 0 4px;font-weight:600">${isVi ? "Chính sách hủy đặt chỗ" : "Cancellation policy"}</p>
          <p style="margin:0;color:#5b6b6c;font-size:13px;white-space:pre-line">${cancellationText}</p>
        </div>
        <p style="color:#5b6b6c;font-size:14px;margin-top:16px">VaraaAi.Com</p>
      </div>
    `,
  };
}

/** Sent whenever the salon (not the customer) moves a booking to a new time
 * or staff member from the dashboard calendar — same fields as the original
 * confirmation email (see bookingConfirmationEmail), just framed around the
 * change rather than the initial booking. Matches the "your booking was
 * moved" email pattern from timma.fi. */
export function bookingRescheduledEmail(params: {
  customerName: string;
  businessName: string;
  serviceName: string;
  serviceDescription?: string | null;
  startsAt: Date;
  locale: string;
  businessTimezone: string;
  priceCents: number;
  currency: string;
  staffName?: string | null;
  businessAddress?: string | null;
  businessCity?: string | null;
  googleMapsUrl?: string | null;
  businessPhone?: string | null;
  cancellationWindowHours: number;
  cancellationPolicy?: string | null;
  manageBookingUrl: string;
}) {
  const dateStr = params.startsAt.toLocaleString(
    params.locale === "vi" ? "vi-VN" : "en-US",
    { dateStyle: "full", timeStyle: "short", timeZone: params.businessTimezone }
  );
  const isVi = params.locale === "vi";
  const priceStr = formatMoney(params.priceCents, params.currency, params.locale);
  const addressLine = [params.businessAddress, params.businessCity].filter(Boolean).join(", ");

  const cancellationText =
    params.cancellationPolicy ||
    (isVi
      ? `Bạn có thể tự hủy lịch hẹn trong hồ sơ của mình cho đến ${params.cancellationWindowHours} giờ trước giờ hẹn.`
      : `You can cancel this appointment yourself, up until ${params.cancellationWindowHours} hours before the appointment.`);

  return {
    subject: isVi
      ? `Lịch hẹn của bạn tại ${params.businessName} đã được dời`
      : `Your appointment at ${params.businessName} was rescheduled`,
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto">
        <h2 style="color:#624f89">${isVi ? "Lịch hẹn đã được dời" : "Your appointment was moved"}</h2>
        <p>${isVi ? "Xin chào" : "Hi"} ${params.customerName},</p>
        <p>${
          isVi
            ? `<strong>${params.businessName}</strong> đã dời lịch hẹn <strong>${params.serviceName}</strong> của bạn sang thời gian mới. Đây là email xác nhận tự động.`
            : `<strong>${params.businessName}</strong> has moved your <strong>${params.serviceName}</strong> appointment to a new time. This is an automated confirmation.`
        }</p>
        <div style="background:#f2f5f5;padding:12px 16px;border-radius:12px">
          <p style="margin:0 0 8px;font-weight:700;color:#624f89">${isVi ? "✨ Thời gian mới ✨" : "✨ New time ✨"}</p>
          <p style="margin:2px 0;font-weight:600">${dateStr}</p>
          <p style="margin:8px 0 2px"><span style="color:#5b6b6c">${isVi ? "Dịch vụ" : "Service"}:</span> ${params.serviceName}</p>
          ${params.serviceDescription ? `<p style="margin:2px 0;color:#5b6b6c;font-size:13px">${params.serviceDescription}</p>` : ""}
          ${params.staffName ? `<p style="margin:2px 0"><span style="color:#5b6b6c">${isVi ? "Nhân viên" : "Staff"}:</span> ${params.staffName}</p>` : ""}
          <p style="margin:2px 0"><span style="color:#5b6b6c">${isVi ? "Số tiền" : "Amount"}:</span> ${priceStr}</p>
          ${addressLine ? `<p style="margin:2px 0"><span style="color:#5b6b6c">${isVi ? "Địa chỉ" : "Address"}:</span> ${addressLine}</p>` : ""}
          ${params.businessPhone ? `<p style="margin:2px 0"><span style="color:#5b6b6c">${isVi ? "Điện thoại" : "Phone"}:</span> ${params.businessPhone}</p>` : ""}
          ${params.googleMapsUrl ? `<p style="margin:6px 0 0"><a href="${params.googleMapsUrl}" style="color:#624f89">${isVi ? "Xem trên Google Maps" : "View on Google Maps"}</a></p>` : ""}
        </div>
        <div style="margin-top:16px">
          <p style="margin:0 0 4px;font-weight:600">${isVi ? "Chính sách hủy đặt chỗ" : "Cancellation policy"}</p>
          <p style="margin:0;color:#5b6b6c;font-size:13px;white-space:pre-line">${cancellationText}</p>
        </div>
        <div style="background:#fbeaee;padding:12px 16px;border-radius:12px;margin-top:16px">
          <p style="margin:0 0 8px;font-weight:600">${isVi ? "Muốn hủy hoặc dời lịch hẹn?" : "Want to cancel or reschedule?"}</p>
          <p style="margin:0 0 10px;color:#5b6b6c;font-size:13px">${
            isVi
              ? "Bạn có thể hủy trong hồ sơ của mình, hoặc liên hệ trực tiếp với salon."
              : "You can cancel it from your own account, or contact the salon directly."
          }</p>
          <a href="${params.manageBookingUrl}" style="background:#0d1718;color:#fff;padding:10px 20px;border-radius:999px;text-decoration:none;font-weight:600;font-size:13px">
            ${isVi ? "Xem lịch hẹn của tôi" : "View my bookings"}
          </a>
        </div>
        <p style="color:#5b6b6c;font-size:14px;margin-top:16px">VaraaAi.Com</p>
      </div>
    `,
  };
}
