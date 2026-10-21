import { generateGeminiText } from "@/lib/gemini";
import { SUPPORT_KNOWLEDGE } from "@/lib/support-ai/knowledge";

export interface SupportAiContext {
  /** Who is asking — changes which part of the guide matters most. */
  role: "owner" | "staff" | "customer" | "guest";
  name: string;
  /** The salons this owner runs, if any. */
  businessNames: string[];
  /** Language the visitor is using the site in. */
  locale: string;
}

const MAX_HISTORY = 12;

/** The paths the guide mentions — the only internal links the reply may use. */
const KNOWN_PATHS = new Set(Array.from(SUPPORT_KNOWLEDGE.matchAll(/(?:^|[\s(])(\/[a-z0-9\-/?=]*)/gm), (m) => m[1].replace(/[.,;:)]+$/, "")));

/** Drops links the model made up: any markdown link whose target isn't a path
 * from the guide (or a varaaai.com URL) becomes plain text. */
function keepKnownLinks(text: string) {
  return text.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (all, label: string, href: string) => {
    if (href.startsWith("/")) return KNOWN_PATHS.has(href) ? all : label;
    if (/^https:\/\/(www\.)?varaaai\.com(\/|$)/i.test(href)) return all;
    return label;
  });
}

/** The AI support assistant's answer to the latest message in a support
 * thread, grounded only in SUPPORT_KNOWLEDGE. Returns null when Gemini isn't
 * configured or every model failed — the thread then waits for a person. */
export async function generateSupportReply(params: {
  context: SupportAiContext;
  history: { fromUser: boolean; content: string }[];
}): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("[support-ai] GEMINI_API_KEY is not configured");
    return null;
  }
  const c = params.context;
  const who =
    c.role === "owner"
      ? `a salon owner (${c.businessNames.join(", ") || "salon"}) named ${c.name}`
      : c.role === "staff"
        ? `a staff member (stylist) at the salon ${c.businessNames.join(", ")} named ${c.name}; they use the dashboard with the permissions the owner gave them (often only their own bookings), while settings, staff and payments belong to the owner`
        : c.role === "customer"
        ? `a customer with a VaraaAi account named ${c.name}`
        : `a visitor without an account named ${c.name || "(unknown)"} — could be a salon owner or a customer`;

  const systemPrompt = `You are the friendly support assistant of VaraaAi.Com, a free booking platform for beauty salons. You are talking with ${who}. The site language they use is "${c.locale}".

Answer ONLY from the guide below. Rules:
- Reply in the same language the user writes in (if unclear, use the language "${c.locale}").
- Be warm, clear and detailed: give numbered step-by-step instructions with the exact button and section names from the guide.
- Always include a link to the place in the site where they do it, as a markdown link with the exact path from the guide, e.g. [Giờ mở cửa](/business/dashboard/hours). Use only paths that appear in the guide; never invent URLs.
- You may use **bold** for button names and short bullet lists. Keep it under about 220 words.
- If the guide does not cover the question, or it is about money, refunds, a bug, or a specific account's data, say honestly you are not sure and suggest pressing the "Gặp nhân viên hỗ trợ" / "Talk to a person" button so the VaraaAi team can help. Never make up features, prices or policies.
- Never ask for passwords or payment details.

GUIDE:
${SUPPORT_KNOWLEDGE}`;

  const history = params.history.slice(-MAX_HISTORY);
  const contents = history.map((m) => ({
    role: m.fromUser ? "user" : "model",
    parts: [{ text: m.content || "…" }],
  }));
  // Gemini needs the conversation to start with the user.
  while (contents.length && contents[0].role !== "user") contents.shift();
  if (!contents.length) return null;

  const reply = await generateGeminiText({
    apiKey,
    logTag: "[support-ai]",
    timeoutMs: 25_000,
    body: {
      system_instruction: { parts: [{ text: systemPrompt }] },
      contents,
      generationConfig: { maxOutputTokens: 900, temperature: 0.3 },
    },
  });
  return reply ? keepKnownLinks(reply.trim()) : null;
}
