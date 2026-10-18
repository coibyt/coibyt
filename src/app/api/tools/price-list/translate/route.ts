import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { generateGeminiText } from "@/lib/gemini";
import { clientIp, rateLimit } from "@/lib/rate-limit";

const schema = z.object({
  from: z.string().regex(/^[a-z]{2,3}$/),
  to: z.array(z.string().regex(/^[a-z]{2,3}$/)).min(1).max(2),
  items: z.array(z.object({ key: z.string().max(80), text: z.string().min(1).max(400) })).min(1).max(160),
});

const langName = (code: string) => {
  try {
    return new Intl.DisplayNames(["en"], { type: "language" }).of(code) ?? code;
  } catch {
    return code;
  }
};

/** Public (rate-limited) — translates a salon's category names, service
 * names and descriptions with Gemini, for the free price-list tool. */
export async function POST(req: Request) {
  const session = await auth();
  const ok = session?.user
    ? rateLimit(`pl-tr:u:${session.user.id}`, 40, 60 * 60_000)
    : rateLimit(`pl-tr:ip:${await clientIp()}`, 5, 60 * 60_000);
  if (!ok) return NextResponse.json({ error: "RATE_LIMITED" }, { status: 429 });

  let body: z.infer<typeof schema>;
  try {
    body = schema.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "INVALID" }, { status: 400 });
  }
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "UNAVAILABLE" }, { status: 503 });

  const targets = body.to.filter((t) => t !== body.from);
  if (targets.length === 0) return NextResponse.json({ translations: {} });

  const prompt = `You translate a beauty salon's price list (nails, hair, lashes, brows, spa, massage, skincare, makeup, barber).
Source language: ${langName(body.from)} (${body.from}).
Target languages: ${targets.map((t) => `${langName(t)} (${t})`).join(", ")}.
Translate each item's "text" into every target language, using the natural, short wording a real salon in that language would print on its price list. Keep brand names, product names, numbers, units and emoji unchanged. Do not add explanations.
Return ONLY a JSON object: { "<key>": { "<target code>": "<translation>", ... }, ... } with exactly the keys given.

Items:
${JSON.stringify(Object.fromEntries(body.items.map((i) => [i.key, i.text])))}`;

  const text = await generateGeminiText({
    apiKey,
    logTag: "[price-list translate]",
    timeoutMs: 45_000,
    body: {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json", maxOutputTokens: 8192, temperature: 0.2 },
    },
  });
  if (!text) return NextResponse.json({ error: "FAILED" }, { status: 502 });

  try {
    const json = JSON.parse(text.replace(/^```(?:json)?\s*|\s*```$/g, "")) as Record<string, Record<string, unknown>>;
    const keys = new Set(body.items.map((i) => i.key));
    const translations: Record<string, Record<string, string>> = {};
    for (const [key, byLang] of Object.entries(json)) {
      if (!keys.has(key) || !byLang || typeof byLang !== "object") continue;
      for (const t of targets) {
        const v = byLang[t];
        if (typeof v === "string" && v.trim()) (translations[key] ??= {})[t] = v.trim().slice(0, 400);
      }
    }
    return NextResponse.json({ translations });
  } catch {
    return NextResponse.json({ error: "FAILED" }, { status: 502 });
  }
}
