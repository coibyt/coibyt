import { prisma } from "@/lib/prisma";

const AI_ASSISTANT_EMAIL = "ai-assistant@system.varaaai.com";
const TIMEOUT_MS = 15_000;

function withTimeout(ms: number) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return { signal: controller.signal, clear: () => clearTimeout(timer) };
}

/** The shared synthetic sender for every AI-generated chat message, across
 * every business — same "real User row, fake identity" trick as a guest
 * customer (see POST /api/chat/start). Created lazily on first use rather
 * than a migration/seed row, so it exists exactly once no matter which
 * business's conversation needs it first. */
export async function getAiAssistantUserId(): Promise<string> {
  const existing = await prisma.user.findUnique({
    where: { email: AI_ASSISTANT_EMAIL },
    select: { id: true },
  });
  if (existing) return existing.id;
  const created = await prisma.user.create({
    data: { name: "VaraaAi Assistant", email: AI_ASSISTANT_EMAIL, isGuest: true },
    select: { id: true },
  });
  return created.id;
}

/** Builds the AI's reply to a customer's chat message, grounded only in this
 * salon's own active services/products/prices — never invents anything else.
 * Returns null (caller just skips sending a reply) when ANTHROPIC_API_KEY
 * isn't configured or the call fails for any reason — same fallback contract
 * as generateAiSummary in salon-check.ts. */
export async function generateChatReply(params: {
  businessId: string;
  businessName: string;
  customerMessage: string;
  recentHistory: { role: "customer" | "assistant"; content: string }[];
  locale: string;
}): Promise<string | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;

  const [services, products] = await Promise.all([
    prisma.service.findMany({
      where: { businessId: params.businessId, active: true },
      select: { name: true, description: true, priceCents: true, currency: true, durationMin: true },
      take: 40,
    }),
    prisma.product.findMany({
      where: { businessId: params.businessId, active: true },
      select: { name: true, description: true, priceCents: true, currency: true },
      take: 40,
    }),
  ]);

  const money = (cents: number, currency: string) => `${(cents / 100).toLocaleString()} ${currency}`;
  const serviceLines = services.length
    ? services
        .map((s) => `- ${s.name}: ${money(s.priceCents, s.currency)}, ${s.durationMin} min${s.description ? ` — ${s.description}` : ""}`)
        .join("\n")
    : "(no services listed yet)";
  const productLines = products.length
    ? products.map((p) => `- ${p.name}: ${money(p.priceCents, p.currency)}${p.description ? ` — ${p.description}` : ""}`).join("\n")
    : "(no products listed yet)";

  const systemPrompt = `You are a helpful front-desk assistant for the salon/spa "${params.businessName}" on a booking platform called VaraaAi.
Answer the customer's question using ONLY the services and products listed below — never invent a service, price, or duration that isn't listed.
Reply in the SAME language as the customer's message. Keep it short (1-4 sentences), warm, and concrete (name the service and its price when relevant).
If you can't answer from this list, or the customer seems to want something only a human can help with, say so briefly and mention they can tap "talk to the real owner" in this chat.
Never claim to be a human or the salon owner — if asked, say you're VaraaAi's assistant helping out while the owner is away.

Services:
${serviceLines}

Products:
${productLines}`;

  const messages = [
    ...params.recentHistory.map((m) => ({
      role: (m.role === "customer" ? "user" : "assistant") as "user" | "assistant",
      content: m.content,
    })),
    { role: "user" as const, content: params.customerMessage },
  ];

  const { signal, clear } = withTimeout(TIMEOUT_MS);
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      signal,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5",
        max_tokens: 300,
        system: systemPrompt,
        messages,
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const text = data?.content?.[0]?.text;
    return typeof text === "string" && text.trim() ? text.trim() : null;
  } catch {
    return null;
  } finally {
    clear();
  }
}
