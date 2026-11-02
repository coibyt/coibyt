import { NextResponse } from "next/server";
import { botConfig, handleUpdate } from "@/lib/telegram";

/** Telegram posts the bot's updates here (setWebhook in src/lib/telegram.ts),
 * signed with the secret it was given. */
export async function POST(req: Request) {
  const cfg = await botConfig();
  if (!cfg || req.headers.get("x-telegram-bot-api-secret-token") !== cfg.secret) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }
  const update = await req.json().catch(() => null);
  if (update) {
    // Always 200: a failure here must not make Telegram retry it forever.
    await handleUpdate(update).catch((err) => console.error("[telegram] update", err));
  }
  return NextResponse.json({ ok: true });
}
