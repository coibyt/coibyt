import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations";
import { sendMail, registrationSuccessEmail } from "@/lib/mailer";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { name, email, phone, password, locale, emailMarketingOptIn, smsMarketingOptIn } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "EMAIL_IN_USE" }, { status: 409 });
  }

  const hashed = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      phone,
      password: hashed,
      marketingOptOut: emailMarketingOptIn === false,
      smsMarketingOptOut: smsMarketingOptIn === false,
    },
    select: { id: true, name: true, email: true },
  });

  try {
    const welcomeEmail = registrationSuccessEmail({ name: user.name, locale: locale || "vi" });
    await sendMail({ to: user.email, ...welcomeEmail });
  } catch (err) {
    console.error("[register welcome email]", err);
  }

  return NextResponse.json({ user }, { status: 201 });
}
