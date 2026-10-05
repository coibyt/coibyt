export interface SlotSource {
  startsAt: Date;
  endsAt: Date;
  priceCents: number;
  staffId: string | null;
  staff: { name: string } | null;
  service: { name: string };
  addOns: { priceCents: number; durationMin: number }[];
  extraServices: {
    id: string;
    name: string;
    priceCents: number;
    durationMin: number;
    staffId: string | null;
    startsAt: Date | null;
    endsAt: Date | null;
    staff: { name: string } | null;
  }[];
}

export interface ServiceSlot {
  /** "primary" for the booking's main service, else the extra row's id. */
  key: string;
  kind: "primary" | "extra";
  name: string;
  priceCents: number;
  startsAt: Date;
  endsAt: Date;
  staffId: string | null;
  staffName: string | null;
}

/** Each service in a booking as its own block: time, staff and price. Extras
 * with no time of their own yet run back-to-back after the primary service
 * under the booking's staff — the layout every booking used before services
 * could be moved independently. */
export function serviceSlots(b: SlotSource): ServiceSlot[] {
  const addOnPrice = b.addOns.reduce((sum, a) => sum + a.priceCents, 0);
  const extraPrice = b.extraServices.reduce((sum, e) => sum + e.priceCents, 0);
  const primaryPrice = Math.max(0, b.priceCents - addOnPrice - extraPrice);

  const placed = b.extraServices.every((e) => e.startsAt && e.endsAt);
  const extraTotalMin = b.extraServices.reduce((sum, e) => sum + e.durationMin, 0);

  const primaryStart = b.startsAt;
  const primaryEnd = placed ? b.endsAt : new Date(b.endsAt.getTime() - extraTotalMin * 60_000);

  const slots: ServiceSlot[] = [
    {
      key: "primary",
      kind: "primary",
      name: b.service.name,
      priceCents: primaryPrice,
      startsAt: primaryStart,
      endsAt: primaryEnd,
      staffId: b.staffId,
      staffName: b.staff?.name ?? null,
    },
  ];

  let cursor = primaryEnd.getTime();
  for (const e of b.extraServices) {
    const startsAt = placed ? (e.startsAt as Date) : new Date(cursor);
    const endsAt = placed ? (e.endsAt as Date) : new Date(cursor + e.durationMin * 60_000);
    cursor = endsAt.getTime();
    slots.push({
      key: e.id,
      kind: "extra",
      name: e.name,
      priceCents: e.priceCents,
      startsAt,
      endsAt,
      staffId: placed ? e.staffId : b.staffId,
      staffName: placed ? (e.staff?.name ?? null) : (b.staff?.name ?? null),
    });
  }
  return slots;
}
