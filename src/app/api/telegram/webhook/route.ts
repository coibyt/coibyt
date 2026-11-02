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
    // Answered right away (an AI reply can take a few seconds, and a slow
    // answer makes Telegram send the update again); always 200, so a
    // failure never makes Telegram retry it forever.
    void handleUpdate(update).catch((err) => console.error("[telegram] update", err));
  }
  return NextResponse.json({ ok: true });
}
