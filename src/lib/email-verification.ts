import { randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";
import { sendMail, verificationEmail } from "@/lib/mailer";

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000;

/** (Re)issues a verification link for this email — safe to call repeatedly
 * (e.g. from a "resend" button), since it replaces any earlier token rather
 * than accumulating them. */
export async function sendVerificationEmail(params: {
  email: string;
  name: string;
  locale: string;
  siteUrl: string;
}) {
  const token = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + TOKEN_TTL_MS);

  await prisma.verificationToken.deleteMany({ where: { identifier: params.email } });
  await prisma.verificationToken.create({
    data: { identifier: params.email, token, expires },
  });

  const verifyUrl = `${params.siteUrl}/api/auth/verify-email?token=${token}`;
  const email = verificationEmail({ name: params.name, verifyUrl, locale: params.locale });
  await sendMail({ to: params.email, ...email });
}
