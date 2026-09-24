import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { name, email, phone, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "EMAIL_IN_USE" }, { status: 409 });
  }

  const hashed = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { name, email, phone, password: hashed },
    select: { id: true, name: true, email: true },
  });

  return NextResponse.json({ user }, { status: 201 });
}
