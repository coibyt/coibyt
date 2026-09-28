import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ACTIVE_BUSINESS_COOKIE } from "@/lib/current-business";

const schema = z.object({ businessId: z.string().cuid() });

/** Makes one of the caller's own branches the active one in the dashboard. */
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });

  const owned = await prisma.business.findFirst({
    where: { id: parsed.data.businessId, ownerId: session.user.id },
    select: { id: true },
  });
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  (await cookies()).set(ACTIVE_BUSINESS_COOKIE, owned.id, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365,
  });
  return NextResponse.json({ ok: true });
}
