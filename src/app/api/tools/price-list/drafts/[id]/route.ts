import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { sanitizeDoc } from "@/lib/price-list/types";
import { joinLogo, splitLogo } from "@/lib/price-list/drafts";

type Ctx = { params: Promise<{ id: string }> };

async function ownDraft(id: string) {
  const session = await auth();
  if (!session?.user) return null;
  return prisma.priceListDraft.findFirst({ where: { id, userId: session.user.id } });
}

export async function GET(_req: Request, { params }: Ctx) {
  const draft = await ownDraft((await params).id);
  if (!draft) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  return NextResponse.json({
    draft: { id: draft.id, title: draft.title, updatedAt: draft.updatedAt, doc: joinLogo(draft.data, draft.logoData, draft.logoMime) },
  });
}

export async function PUT(req: Request, { params }: Ctx) {
  const draft = await ownDraft((await params).id);
  if (!draft) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  const raw = await req.json().catch(() => null);
  const doc = sanitizeDoc(raw?.doc, "en");
  const { data, logoData, logoMime } = splitLogo(doc);
  const updated = await prisma.priceListDraft.update({
    where: { id: draft.id },
    data: { title: (doc.salonName || "").slice(0, 120) || draft.title, data, logoData, logoMime },
    select: { id: true, title: true, updatedAt: true },
  });
  return NextResponse.json({ draft: updated });
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const draft = await ownDraft((await params).id);
  if (!draft) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  await prisma.priceListDraft.delete({ where: { id: draft.id } });
  return NextResponse.json({ ok: true });
}
