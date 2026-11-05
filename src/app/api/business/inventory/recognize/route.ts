import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { generateGeminiText } from "@/lib/gemini";
import { rateLimit } from "@/lib/rate-limit";
import { INVENTORY_CATEGORIES, INVENTORY_UNITS, inventoryContext } from "@/lib/inventory";
import { decodePhoto } from "@/lib/inventory-input";

const schema = z.object({ image: z.string().max(900_000) });

const PROMPT = `You are reading a photo of a beauty-salon supply (nail, lash, hair or skin product, or a tool).
Read the label and answer with JSON only:
{"name": string, "brand": string, "color": string, "category": one of ${JSON.stringify(INVENTORY_CATEGORIES)}, "unit": one of ${JSON.stringify(INVENTORY_UNITS)}, "barcode": string}
- name: the product line and size as on the label, WITHOUT the colour (e.g. "GelColor 15 ml").
- color: the shade — its name and/or number as printed (e.g. "Big Apple Red" or "#15 Big Apple Red"); if none is printed but the product itself is clearly coloured (polish, gel, powder), a short colour word (e.g. "red", "nude pink"); empty string for products without a shade.
- brand: the maker, e.g. "OPI". Empty string if not visible.
- unit: how a salon would count it (a bottle of polish = "bottle", a box of gloves = "box").
- barcode: the digits under a barcode if they are clearly readable, else empty string.
If there is no product in the photo, answer {"name": ""}.`;

/** Words of a name for loose matching ("OPI Gel 15ml" ~ "opi gel color"). */
const words = (s: string) => new Set(s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").split(/[^a-z0-9]+/).filter((w) => w.length > 1));

/** Takes a photo of a product, has Gemini read the label, and returns the
 * fields for a new item plus existing items it might already be. */
export async function POST(req: Request) {
  const ctx = await inventoryContext();
  if (!ctx?.canWrite) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  if (!rateLimit(`inv-ai:${ctx.businessId}`, 120, 24 * 60 * 60_000)) return NextResponse.json({ error: "TOO_MANY" }, { status: 429 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  const photo = parsed.success ? decodePhoto(parsed.data.image) : null;
  if (!photo) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "AI_OFF" }, { status: 503 });

  const text = await generateGeminiText({
    apiKey,
    logTag: "[inventory recognize]",
    timeoutMs: 25_000,
    body: {
      contents: [{ role: "user", parts: [{ inlineData: { mimeType: photo.mime, data: photo.bytes.toString("base64") } }, { text: PROMPT }] }],
      generationConfig: { responseMimeType: "application/json", temperature: 0.1 },
    },
  });
  let fields: { name: string; brand: string; color: string; category: string | null; unit: string; barcode: string } | null = null;
  try {
    const raw = JSON.parse((text ?? "").replace(/^```json\s*|```$/g, "")) as Record<string, unknown>;
    const name = String(raw.name ?? "").trim().slice(0, 160);
    if (name) {
      const category = String(raw.category ?? "");
      const unit = String(raw.unit ?? "");
      fields = {
        name,
        brand: String(raw.brand ?? "").trim().slice(0, 80),
        color: String(raw.color ?? "").trim().slice(0, 60),
        category: (INVENTORY_CATEGORIES as readonly string[]).includes(category) ? category : null,
        unit: (INVENTORY_UNITS as readonly string[]).includes(unit) ? unit : "pcs",
        barcode: /^\d{6,14}$/.test(String(raw.barcode ?? "")) ? String(raw.barcode) : "",
      };
    }
  } catch {
    fields = null;
  }
  if (!fields) return NextResponse.json({ fields: null, matches: [], exact: null });

  // Items it may already be. Products of one line often share a barcode and
  // most of their name, so a different colour rules a match out, and only a
  // same-colour (or colourless) match with a close name counts as "the one".
  const items = await prisma.inventoryItem.findMany({ where: { ownerId: ctx.ownerId, active: true }, select: { id: true, name: true, brand: true, barcode: true, color: true } });
  const f = fields;
  const want = words(`${f.brand} ${f.name}`);
  const wantColor = [...words(f.color)].sort().join(" ");
  const scored = items
    .map((it) => {
      const haveColor = [...words(it.color ?? "")].sort().join(" ");
      const colorSame = !!wantColor && wantColor === haveColor;
      if (wantColor && haveColor && !colorSame) return { id: it.id, score: 0, colorSame };
      const have = words(`${it.brand ?? ""} ${it.name}`);
      const shared = [...want].filter((w) => have.has(w)).length;
      let score = want.size ? shared / Math.max(want.size, have.size) : 0;
      if (f.barcode && it.barcode === f.barcode) score += 0.5;
      if (colorSame) score += 0.3;
      return { id: it.id, score, colorSame };
    })
    .filter((m) => m.score >= 0.5)
    .sort((a, b) => b.score - a.score);
  const best = scored[0];
  const second = scored[1];
  // Sure enough to skip asking: clearly ahead, and the colour agrees (or neither has one).
  const exact =
    best && best.score >= 1 && (!second || best.score - second.score >= 0.3) && (best.colorSame || !wantColor)
      ? best.id
      : null;

  return NextResponse.json({ fields, matches: scored.slice(0, 4).map((m) => m.id), exact });
}
