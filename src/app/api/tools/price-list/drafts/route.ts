import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { sanitizeDoc } from "@/lib/price-list/types";
import { splitLogo } from "@/lib/price-list/drafts";

const MAX_DRAFTS = 30;

/** The signed-in user's saved price lists (newest first, without content). */
export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  const drafts = await prisma.priceListDraft.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    select: { id: true, title: true, updatedAt: true },
  });
  return NextResponse.json({ drafts });
}

/** Saves a new price list to the signed-in user's account. */
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  const count = await prisma.priceListDraft.count({ where: { userId: session.user.id } });
  if (count >= MAX_DRAFTS) return NextResponse.json({ error: "LIMIT" }, { status: 409 });

  const raw = await req.json().catch(() => null);
  const doc = sanitizeDoc(raw?.doc, "en");
  const { data, logoData, logoMime } = splitLogo(doc);
  const draft = await prisma.priceListDraft.create({
    data: { userId: session.user.id, title: (doc.salonName || "").slice(0, 120) || "Price list", data, logoData, logoMime },
    select: { id: true, title: true, updatedAt: true },
  });
  return NextResponse.json({ draft }, { status: 201 });
}
