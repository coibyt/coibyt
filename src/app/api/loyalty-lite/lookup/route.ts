import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentLiteSalon } from "@/lib/loyalty-lite";

/** A typed card code, or a scanned QR (its URL ends in the code), → the card. */
export async function POST(req: Request) {
  const salon = await currentLiteSalon();
  if (!salon) return NextResponse.json({ error: "SIGNED_OUT" }, { status: 401 });
  const body = (await req.json().catch(() => null)) as { code?: string } | null;
  const raw = (body?.code ?? "").trim();
  const code = (raw.match(/\/loyalty-lite\/c\/([A-Za-z0-9]+)/)?.[1] ?? raw).replace(/[\s-]/g, "").toUpperCase();
  if (!/^[A-Z0-9]{4,16}$/.test(code)) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  const card = await prisma.liteCard.findFirst({ where: { token: code, liteSalonId: salon.id } });
  if (!card) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  return NextResponse.json({ card });
}
