import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const MAX_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

/** A customer/owner's own profile photo — stored in the DB like every other
 * upload here. User.image is kept pointed at this route's own URL so every
 * existing `image` usage (nav menu, chat, feed comments) picks it up. */
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "NO_FILE" }, { status: 400 });
  if (file.size > MAX_SIZE_BYTES) return NextResponse.json({ error: "FILE_TOO_LARGE" }, { status: 400 });
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: "UNSUPPORTED_TYPE" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const userId = session.user.id;
  await prisma.userAvatar.upsert({
    where: { userId },
    update: { imageData: buffer, imageMimeType: file.type },
    create: { userId, imageData: buffer, imageMimeType: file.type },
  });

  const url = `/api/account-avatar/${userId}?v=${Date.now()}`;
  await prisma.user.update({ where: { id: userId }, data: { image: url } });

  return NextResponse.json({ url });
}

export async function DELETE() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });

  const userId = session.user.id;
  await prisma.userAvatar.deleteMany({ where: { userId } });
  await prisma.user.update({ where: { id: userId }, data: { image: null } });

  return NextResponse.json({ ok: true });
}
