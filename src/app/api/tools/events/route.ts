import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { clientIp, rateLimit } from "@/lib/rate-limit";

// Only these (tool, event) pairs are counted — anything else is ignored.
const ALLOWED: Record<string, string[]> = {
  price_list: ["open", "download_pdf", "download_png", "cta_click", "translate", "import"],
  qr_poster: ["open", "download_pdf", "download_png", "cta_click"],
};

/** Public — anonymous usage counters for the free marketing tools. */
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const tool = typeof body?.tool === "string" ? body.tool : "";
  const event = typeof body?.event === "string" ? body.event : "";
  if (!ALLOWED[tool]?.includes(event)) return NextResponse.json({ ok: false }, { status: 400 });
  if (!rateLimit(`tool-ev:${await clientIp()}`, 120, 60 * 60_000)) return NextResponse.json({ ok: false }, { status: 429 });
  await prisma.toolEvent.create({ data: { tool, event } });
  return NextResponse.json({ ok: true });
}
