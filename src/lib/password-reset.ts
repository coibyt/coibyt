import { randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";
import { sendMail, passwordResetEmail } from "@/lib/mailer";

const TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour — shorter-lived than email verification

/** Issues a fresh reset link for this user, replacing any earlier
 * outstanding token (so an old, forwarded, or leaked link stops working the
 * moment a new one is requested). */
export async function sendPasswordResetEmail(params: {
  userId: string;
  email: string;
  name: string;
  locale: string;
  siteUrl: string;
}) {
  const token = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + TOKEN_TTL_MS);

  await prisma.passwordResetToken.deleteMany({ where: { userId: params.userId } });
  await prisma.passwordResetToken.create({
    data: { userId: params.userId, token, expires },
  });

  const resetUrl = `${params.siteUrl}/${params.locale}/auth/reset-password?token=${token}`;
  const email = passwordResetEmail({ name: params.name, resetUrl, locale: params.locale });
  await sendMail({ to: params.email, ...email });
}
