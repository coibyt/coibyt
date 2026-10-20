import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/require-admin";
import { setSupportAiEnabled, supportAiEnabled } from "@/lib/support";

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  return NextResponse.json({ aiEnabled: await supportAiEnabled(), aiConfigured: !!process.env.GEMINI_API_KEY });
}

const schema = z.object({ aiEnabled: z.boolean() });

/** The admin's switch for the AI support assistant. */
export async function PATCH(req: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  await setSupportAiEnabled(parsed.data.aiEnabled);
  return NextResponse.json({ aiEnabled: parsed.data.aiEnabled });
}
