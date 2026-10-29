import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ACTIVE_BUSINESS_COOKIE } from "@/lib/current-business";
import { staffBranches } from "@/lib/staff-branches";

const schema = z.object({ businessId: z.string().cuid() });

/** Makes one of the caller's branches the active one in the dashboard —
 * one they own, or one they work at as staff. */
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });

  const owned = await prisma.business.findFirst({
    where: { id: parsed.data.businessId, ownerId: session.user.id },
    select: { id: true },
  });
  // Staff who work at several branches can switch between those too.
  const allowed = owned ?? (await staffBranches(session.user.id)).find((b) => b.id === parsed.data.businessId);
  if (!allowed) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  (await cookies()).set(ACTIVE_BUSINESS_COOKIE, allowed.id, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365,
  });
  return NextResponse.json({ ok: true });
}
