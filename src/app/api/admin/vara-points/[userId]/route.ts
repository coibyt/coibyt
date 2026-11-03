import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/require-admin";
import { adminAdjustPoints } from "@/lib/vara-points";

const schema = z.object({
  amount: z.number().int().min(-1_000_000).max(1_000_000).refine((n) => n !== 0),
  note: z.string().trim().max(200).optional(),
});

/** Admin: add or take an owner's Vara points. */
export async function POST(req: Request, { params }: { params: Promise<{ userId: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const { userId } = await params;
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const balance = await adminAdjustPoints(userId, parsed.data.amount, parsed.data.note || null).catch(() => undefined);
  if (balance === undefined) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  if (balance === null) return NextResponse.json({ error: "BELOW_ZERO" }, { status: 409 });
  return NextResponse.json({ varaPoints: balance });
}
