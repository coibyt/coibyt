import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/require-admin";
import { botStatus, connectBot, disconnectBot } from "@/lib/telegram";

/** Admin: the Telegram bot that reminds salon staff to report income. */
export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  return NextResponse.json({ bot: await botStatus() });
}

const schema = z.object({ token: z.string().trim().regex(/^\d{5,15}:[A-Za-z0-9_-]{30,60}$/) });

export async function PUT(req: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID_TOKEN" }, { status: 400 });
  try {
    await connectBot(parsed.data.token);
  } catch (err) {
    return NextResponse.json({ error: "TELEGRAM", detail: (err as Error).message }, { status: 400 });
  }
  return NextResponse.json({ bot: await botStatus() });
}

export async function DELETE() {
  if (!(await requireAdmin())) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  await disconnectBot();
  return NextResponse.json({ bot: null });
}
