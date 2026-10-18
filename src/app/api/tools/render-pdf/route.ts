import { NextResponse } from "next/server";
import { z } from "zod";
import { renderPdf } from "@/lib/print/pdf.server";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import type { Op, Page } from "@/lib/print/ops";

export const runtime = "nodejs";
export const maxDuration = 60;

const color = z.string().regex(/^#[0-9a-fA-F]{6}$/);
const num = z.number().finite();
const dash = z.tuple([num, num]).optional();

const op: z.ZodType<Op> = z.lazy(() =>
  z.discriminatedUnion("t", [
    z.object({
      t: z.literal("text"),
      x: num,
      y: num,
      text: z.string().max(600),
      size: num.min(1).max(400),
      weight: num.min(100).max(900),
      family: z.enum(["sans", "serif"]),
      color,
      align: z.enum(["left", "right", "center"]),
      lang: z.string().max(8),
    }),
    z.object({ t: z.literal("rect"), x: num, y: num, w: num, h: num, r: num.optional(), fill: color.optional(), stroke: color.optional(), lw: num.optional(), dash }),
    z.object({ t: z.literal("line"), x1: num, y1: num, x2: num, y2: num, color, lw: num, dash }),
    z.object({ t: z.literal("circle"), cx: num, cy: num, r: num.min(0), fill: color.optional(), stroke: color.optional(), lw: num.optional(), dash }),
    z.object({
      t: z.literal("path"),
      // SVG path data only — letters, numbers, separators.
      d: z.string().max(4000).regex(/^[MmLlHhVvCcSsQqTtAaZz0-9eE.,\s+-]+$/),
      x: num,
      y: num,
      scale: num,
      fill: color.optional(),
      stroke: color.optional(),
      lw: num.optional(),
    }),
    z.object({ t: z.literal("image"), x: num, y: num, w: num, h: num }),
    z.object({ t: z.literal("qr"), x: num, y: num, size: num.min(10), data: z.string().max(1000), fg: color, bg: color, ec: z.enum(["M", "H"]).optional() }),
    z.object({
      t: z.literal("group"),
      ops: z.array(op).max(2000),
      dx: num.optional(),
      dy: num.optional(),
      rotate: num.optional(),
      cx: num.optional(),
      cy: num.optional(),
      clip: z.object({ cx: num, cy: num, r: num }).optional(),
    }),
  ])
) as z.ZodType<Op>;

const schema = z.object({
  title: z.string().max(200),
  logo: z.string().max(4_000_000).nullable(),
  pages: z
    .array(z.object({ w: num.min(50).max(3000), h: num.min(50).max(3000), bg: color, ops: z.array(op).max(6000) }))
    .min(1)
    .max(40),
});

/** Public — turns pages laid out by one of the free print tools (price
 * list, QR poster) into a print-quality PDF: vector text with embedded font
 * outlines, vector QR codes. */
export async function POST(req: Request) {
  const ip = await clientIp();
  if (!rateLimit(`tool-pdf:${ip}`, 40, 10 * 60_000)) return NextResponse.json({ error: "RATE_LIMITED" }, { status: 429 });

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
    const pdf = await renderPdf(body.pages as Page[], logo, body.title || "VaraaAi");
    const safe = (body.title || "varaaai").normalize("NFKD").replace(/[^\w-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "varaaai";
    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${safe}.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("[tool pdf]", err);
    return NextResponse.json({ error: "RENDER_FAILED" }, { status: 500 });
  }
}
