import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/require-admin";
import { SEASONAL_THEMES } from "@/lib/seasonal-themes";
import { getSiteThemeSetting, setSiteThemeSetting } from "@/lib/platform-season";

/** Admin: the holiday look for the whole website (src/lib/platform-season.ts). */
const schema = z.object({
  theme: z
    .string()
    .refine((v) => v === "auto" || SEASONAL_THEMES.some((t) => t.id === v))
    .nullable(),
  site: z.boolean(),
  dashboard: z.boolean(),
  emails: z.boolean(),
});

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  return NextResponse.json(await getSiteThemeSetting());
}

export async function PUT(req: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  await setSiteThemeSetting(parsed.data);
  return NextResponse.json(parsed.data);
}
