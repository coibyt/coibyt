import { NextResponse } from "next/server";
import { z } from "zod";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { HEX_COLOR, SEASONAL_THEMES } from "@/lib/seasonal-themes";

/** The owner's look: booking colours on the calendar and a holiday theme
 * for the booking page and/or the calendar (src/lib/seasonal-themes.ts). */
const color = z.string().regex(HEX_COLOR).nullable().optional();
const schema = z.object({
  calendarBookingBg: color,
  calendarBookingText: color,
  calendarOnlineBg: color,
  calendarOnlineText: color,
  seasonalTheme: z
    .string()
    .refine((v) => v === "auto" || SEASONAL_THEMES.some((t) => t.id === v))
    .nullable()
    .optional(),
  themeOnBookingPage: z.boolean().optional(),
  themeOnCalendar: z.boolean().optional(),
});

export async function PATCH(req: Request) {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const b = await prisma.business.update({
    where: { id: owned.businessId },
    data: parsed.data,
    select: {
      calendarBookingBg: true,
      calendarBookingText: true,
      calendarOnlineBg: true,
      calendarOnlineText: true,
      seasonalTheme: true, themeOnBookingPage: true,
      themeOnCalendar: true,
    },
  });
  return NextResponse.json(b);
}
