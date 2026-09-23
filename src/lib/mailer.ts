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
}) {
  const dateStr = params.startsAt.toLocaleString(
    params.locale === "vi" ? "vi-VN" : "en-US",
    { dateStyle: "full", timeStyle: "short" }
  );
  const isVi = params.locale === "vi";
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
        <p style="color:#5b6b6c;font-size:14px">VaraaAi.Com</p>
      </div>
    `,
  };
}
