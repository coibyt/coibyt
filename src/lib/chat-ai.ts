import { addDays, format } from "date-fns";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";
import { prisma } from "@/lib/prisma";
import { runGeminiWithTools, type GeminiToolDeclaration } from "@/lib/gemini";
import { getAvailableSlots } from "@/lib/availability";
import { BOOKING_DAYS_AHEAD } from "@/lib/booking-window";
import { formatBookingToken, parseBookingTokens, type BookingOffer } from "@/lib/chat-booking-token";

const AI_ASSISTANT_EMAIL = "ai-assistant@system.varaaai.com";
// The next two weeks are spelled out in the prompt so the model can turn
// "tomorrow" or "Friday" into a date; anything later (up to the booking
// page's own horizon) it can still check when the customer names a date.
const LISTED_DAYS = 14;

const TOOLS: GeminiToolDeclaration[] = [
  {
    name: "check_availability",
    description:
      "Look up the real free start times for one service on one date. Always call this before suggesting or confirming any time.",
    parameters: {
      type: "OBJECT",
      properties: {
        service: { type: "STRING", description: "The service ref from the list, e.g. S3" },
        date: { type: "STRING", description: "Date as YYYY-MM-DD, within the bookable range given in the instructions" },
      },
      required: ["service", "date"],
    },
  },
  {
    name: "offer_booking_link",
    description:
      "Attach a 'Book now' button to your reply that opens the booking page with this service, date and time already selected. Call it once the customer has chosen a time that check_availability showed as free.",
    parameters: {
      type: "OBJECT",
      properties: {
        service: { type: "STRING", description: "The service ref, e.g. S3" },
        date: { type: "STRING", description: "YYYY-MM-DD" },
        time: { type: "STRING", description: "Start time HH:mm (24h), exactly as returned by check_availability" },
      },
      required: ["service", "date", "time"],
    },
  },
];

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
 * When the customer wants to book, the model checks real availability via
 * getAvailableSlots and can attach a booking-token button (see
 * chat-booking-token.ts) with the service, date and time preselected — the
 * customer still fills in their details and confirms on the booking page
 * themself. Returns null (caller just skips sending a reply) when
 * GEMINI_API_KEY isn't configured or the call fails for any reason. */
export async function generateChatReply(params: {
  businessId: string;
  businessName: string;
  businessTimezone: string;
  customerMessage: string;
  recentHistory: { role: "customer" | "assistant"; content: string }[];
}): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("[chat-ai] GEMINI_API_KEY is not configured — AI chat replies are disabled");
    return null;
  }
  const tz = params.businessTimezone;

  const [services, products] = await Promise.all([
    prisma.service.findMany({
      where: { businessId: params.businessId, active: true },
      select: { id: true, name: true, description: true, priceCents: true, currency: true, durationMin: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      take: 60,
    }),
    prisma.product.findMany({
      where: { businessId: params.businessId, active: true },
      select: { name: true, description: true, priceCents: true, currency: true },
      take: 40,
    }),
  ]);

  // Short refs instead of raw ids — far less for the model to mistype.
  const serviceByRef = new Map(services.map((s, i) => [`S${i + 1}`, s]));
  const money = (cents: number, currency: string) => `${(cents / 100).toLocaleString()} ${currency}`;
  const serviceLines = services.length
    ? services
        .map(
          (s, i) =>
            `- S${i + 1}: ${s.name}: ${money(s.priceCents, s.currency)}, ${s.durationMin} min${s.description ? ` — ${s.description.slice(0, 160)}` : ""}`
        )
        .join("\n")
    : "(no services listed yet)";

  // Calendar arithmetic on the salon's own wall-clock date (same as the
  // booking page's date strip), so a DST change or a late-night server clock
  // can't skip or repeat a day.
  const todayInTz = toZonedTime(new Date(), tz);
  const listedDates = Array.from({ length: LISTED_DAYS }, (_, i) => format(addDays(todayInTz, i), "yyyy-MM-dd EEE"));
  const firstDate = format(todayInTz, "yyyy-MM-dd");
  const lastDate = format(addDays(todayInTz, BOOKING_DAYS_AHEAD - 1), "yyyy-MM-dd");
  // "yyyy-MM-dd" strings compare correctly as plain strings.
  const isBookableDate = (d: string) => /^\d{4}-\d{2}-\d{2}$/.test(d) && d >= firstDate && d <= lastDate;

  async function freeTimes(serviceId: string, date: string): Promise<string[]> {
    const slots = await getAvailableSlots({ businessId: params.businessId, serviceId, dateStr: date });
    const nowMs = Date.now();
    return Array.from(
      new Set(slots.filter((s) => s.startsAt.getTime() > nowMs).map((s) => formatInTimeZone(s.startsAt, tz, "HH:mm")))
    ).sort();
  }

  let offer: BookingOffer | null = null;

  async function handleToolCall(name: string, args: Record<string, unknown>): Promise<Record<string, unknown>> {
    const service = serviceByRef.get(String(args.service ?? "").trim().toUpperCase());
    if (!service) return { error: "Unknown service ref — use one of the S-refs from the services list." };
    const date = String(args.date ?? "").trim();
    if (!isBookableDate(date)) {
      return { error: `Date must be a yyyy-MM-dd date from ${firstDate} to ${lastDate}.` };
    }
    const times = await freeTimes(service.id, date);

    if (name === "check_availability") {
      return times.length
        ? { service: service.name, date, available_start_times: times.slice(0, 60) }
        : { service: service.name, date, available_start_times: [], note: "Fully booked or closed that day — suggest another day." };
    }
    if (name === "offer_booking_link") {
      const time = String(args.time ?? "").trim();
      if (!times.includes(time)) {
        return { ok: false, reason: `${time} is not free that day.`, available_start_times: times.slice(0, 60) };
      }
      offer = { serviceId: service.id, date, time };
      return {
        ok: true,
        note: "A booking button with this service, date and time preselected is attached under your reply. Tell the customer (in their language) to tap it and fill in their details to confirm — nothing is booked until they do.",
      };
    }
    return { error: `Unknown tool ${name}` };
  }
  const productLines = products.length
    ? products.map((p) => `- ${p.name}: ${money(p.priceCents, p.currency)}${p.description ? ` — ${p.description}` : ""}`).join("\n")
    : "(no products listed yet)";

  const systemPrompt = `You are a helpful front-desk assistant for the salon/spa "${params.businessName}" on a booking platform called VaraaAi.
Answer the customer's question using ONLY the services and products listed below — never invent a service, price, or duration that isn't listed.
Keep it short (1-4 sentences), warm, and concrete (name the service and its price when relevant).
Write plain text only — no markdown, no asterisks, no bullet symbols other than a simple "-".
If you can't answer from this list, or the customer wants something only a human can help with, say so briefly and mention they can tap the "talk to the owner" button at the top of this chat (translate that label into the customer's language).
Never claim to be a human or the salon owner — if asked, say you're VaraaAi's assistant helping out while the owner is away.

BOOKING — when the customer wants an appointment:
1. Make sure you know exactly which service (ask if it's unclear between several).
2. If they haven't said which day and roughly what time, ask.
3. Call check_availability for that service and day. Never guess or promise a time without checking.
4. If their time is free, call offer_booking_link with it. If not, suggest 2-3 of the closest free times (or another day) and wait for them to pick, then call offer_booking_link.
5. After offer_booking_link succeeds, tell them to tap the booking button below this message to fill in their details and confirm (describe it in their language — don't quote an English label). Never say the appointment is booked or confirmed — it isn't until they do that.
Today is ${listedDates[0]} (${tz} time). The next two weeks: ${listedDates.join(", ")}. Convert "tomorrow", weekdays, etc. using this list. Customers can book any date from ${firstDate} to ${lastDate} (e.g. next month or next year) — for later dates, work out the yyyy-MM-dd yourself.

Services (refs are for tools only — never show "S1" etc. to the customer):
${serviceLines}

Products:
${productLines}

LANGUAGE (most important): write your whole reply in the language of the customer's latest message — English question → English reply, Vietnamese → Vietnamese, Finnish → Finnish, and so on. The service/product names above may be in a different language; quote those names as they are, but write everything else in the customer's language.`;

  // The caller's history already ends with this same message (it's saved
  // before the AI runs) — drop that copy so it isn't sent twice. Booking
  // tokens in past AI replies become a short note the model can follow.
  const history = [...params.recentHistory];
  const last = history[history.length - 1];
  if (last?.role === "customer" && last.content === params.customerMessage) history.pop();
  const contents = [
    ...history.map((m) => {
      const { text, offers } = parseBookingTokens(m.content);
      const note = offers.map((o) => ` (Book-now button was attached for ${o.date} ${o.time}.)`).join("");
      return {
        role: m.role === "customer" ? "user" : "model",
        parts: [{ text: `${text}${note}` || "…" }],
      };
    }),
    { role: "user", parts: [{ text: params.customerMessage }] },
  ];

  const reply = await runGeminiWithTools({
    apiKey,
    logTag: "[chat-ai]",
    tools: TOOLS,
    handleToolCall,
    body: {
      system_instruction: { parts: [{ text: systemPrompt }] },
      contents,
      generationConfig: { maxOutputTokens: 500 },
    },
  });
  if (!reply) return null;

  // Belt and braces for "plain text only", and the model must never be able
  // to fabricate its own button — only a validated offer_booking_link can.
  const cleaned = parseBookingTokens(reply).text.replace(/\*\*|__/g, "").trim();
  const finalOffer = offer as BookingOffer | null;
  return finalOffer ? `${cleaned}\n${formatBookingToken(finalOffer)}` : cleaned;
}
