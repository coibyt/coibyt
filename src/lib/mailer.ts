import nodemailer from "nodemailer";

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

export function bookingConfirmationEmail(params: {
  customerName: string;
  businessName: string;
  serviceName: string;
  startsAt: Date;
  locale: string;
  businessTimezone: string;
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
        <p style="background:#f2f5f5;padding:12px 16px;border-radius:12px">${dateStr}</p>
        ${bankBlock}
        <p style="color:#5b6b6c;font-size:14px">VaraaAi.Com</p>
      </div>
    `,
  };
}
