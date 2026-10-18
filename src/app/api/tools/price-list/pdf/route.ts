import { NextResponse } from "next/server";
import { z } from "zod";
import { renderPriceListPdf } from "@/lib/price-list/pdf.server";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import type { Page } from "@/lib/price-list/layout";

export const runtime = "nodejs";
export const maxDuration = 60;

const color = z.string().regex(/^#[0-9a-fA-F]{6}$/);
const num = z.number().finite();
const op = z.discriminatedUnion("t", [
  z.object({
    t: z.literal("text"),
    x: num,
    y: num,
    text: z.string().max(600),
    size: num.min(1).max(200),
    weight: num.min(100).max(900),
    family: z.enum(["sans", "serif"]),
    color,
    align: z.enum(["left", "right", "center"]),
    lang: z.string().max(8),
  }),
  z.object({ t: z.literal("rect"), x: num, y: num, w: num, h: num, r: num.optional(), fill: color.optional(), stroke: color.optional(), lw: num.optional() }),
  z.object({ t: z.literal("line"), x1: num, y1: num, x2: num, y2: num, color, lw: num, dash: z.tuple([num, num]).optional() }),
  z.object({ t: z.literal("image"), x: num, y: num, w: num, h: num }),
  z.object({ t: z.literal("qr"), x: num, y: num, size: num.min(10), data: z.string().max(1000), fg: color, bg: color }),
]);
const schema = z.object({
  title: z.string().max(200),
  logo: z.string().max(4_000_000).nullable(),
  pages: z
    .array(z.object({ w: num.min(100).max(2000), h: num.min(100).max(2000), bg: color, ops: z.array(op).max(6000) }))
    .min(1)
    .max(40),
});

/** Public — turns the pages laid out by the editor into a print-quality PDF
 * (vector text with embedded font outlines, vector QR). */
export async function POST(req: Request) {
  const ip = await clientIp();
  if (!rateLimit(`pl-pdf:${ip}`, 40, 10 * 60_000)) return NextResponse.json({ error: "RATE_LIMITED" }, { status: 429 });

  let body: z.infer<typeof schema>;
  try {
    body = schema.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "INVALID" }, { status: 400 });
  }

  let logo: Buffer | null = null;
  if (body.logo) {
    const m = /^data:image\/(png|jpeg);base64,(.+)$/.exec(body.logo);
    if (!m) return NextResponse.json({ error: "INVALID_LOGO" }, { status: 400 });
    logo = Buffer.from(m[2], "base64");
  }

  try {
    const pdf = await renderPriceListPdf(body.pages as Page[], logo, body.title || "Price list");
    const safe = (body.title || "price-list").normalize("NFKD").replace(/[^\w-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "price-list";
    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${safe}.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("[price-list pdf]", err);
    return NextResponse.json({ error: "RENDER_FAILED" }, { status: 500 });
  }
}
