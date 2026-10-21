import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/require-admin";
import { isRingtoneId } from "@/lib/ringtones";
import { getRingtoneSetting, setRingtoneSetting } from "@/lib/ringtone-settings";

const schema = z.object({ role: z.enum(["owner", "staff"]), id: z.string().max(40) });

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const [owner, staff] = await Promise.all([getRingtoneSetting("owner"), getRingtoneSetting("staff")]);
  return NextResponse.json({ owner, staff });
}

/** Admin: choose the booking-alarm ringtone for salon owners or for staff. */
export async function POST(req: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success || !isRingtoneId(parsed.data.id)) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  await setRingtoneSetting(parsed.data.role, parsed.data.id);
  return NextResponse.json({ ok: true });
}
