import { NextResponse } from "next/server";
import { z } from "zod";
import { requireOwnerOnly, requireOwnerOrReadOnlyViewer } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";

const PAGE = 50;

/** The salon's own contact list, newest first, searchable. `?format=csv`
 * downloads all of it. */
export async function GET(req: Request) {
  const owned = await requireOwnerOrReadOnlyViewer();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const url = new URL(req.url);
  const q = url.searchParams.get("q")?.trim() ?? "";
  const page = Math.max(0, Number(url.searchParams.get("page")) || 0);
  const where = {
    businessId: owned.businessId,
    ...(q ? { OR: [{ email: { contains: q } }, { name: { contains: q } }, { phone: { contains: q } }] } : {}),
  };

  if (url.searchParams.get("format") === "csv") {
    const all = await prisma.marketingContact.findMany({ where: { businessId: owned.businessId }, orderBy: { createdAt: "desc" } });
    const cell = (v: string | null) => `"${(v ?? "").replace(/"/g, '""')}"`;
    const lines = [
      ["Name", "Email", "Phone", "Note", "Unsubscribed", "Added"].join(","),
      ...all.map((c) => [cell(c.name), cell(c.email), cell(c.phone), cell(c.note), c.optedOut ? "yes" : "", c.createdAt.toISOString().slice(0, 10)].join(",")),
    ];
    // The BOM makes Excel read the file as UTF-8 (Vietnamese names).
    return new NextResponse(`﻿${lines.join("\r\n")}`, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="contacts.csv"`,
      },
    });
  }

  const [contacts, total, optedOut, all] = await Promise.all([
    prisma.marketingContact.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: page * PAGE,
      take: PAGE,
      select: { id: true, email: true, name: true, phone: true, note: true, optedOut: true, createdAt: true },
    }),
    prisma.marketingContact.count({ where }),
    prisma.marketingContact.count({ where: { businessId: owned.businessId, optedOut: true } }),
    prisma.marketingContact.count({ where: { businessId: owned.businessId } }),
  ]);
  return NextResponse.json({ contacts, total, all, optedOut, pageSize: PAGE });
}

const contactSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(191),
  name: z.string().trim().max(120).optional().default(""),
  phone: z.string().trim().max(40).optional().default(""),
  note: z.string().trim().max(500).optional().default(""),
});

const importSchema = z.object({
  // Required: the owner confirms these customers agreed to hear from the salon.
  consent: z.literal(true),
  contacts: z.array(z.unknown()).min(1).max(5000),
});

/** Adds contacts — one typed by hand, or a whole Excel/CSV file the browser
 * has already read. Existing addresses get their missing details filled in;
 * someone who unsubscribed stays unsubscribed. */
export async function POST(req: Request) {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const parsed = importSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });

  let invalid = 0;
  const byEmail = new Map<string, z.infer<typeof contactSchema>>();
  for (const raw of parsed.data.contacts) {
    const c = contactSchema.safeParse(raw);
    if (!c.success) {
      invalid++;
      continue;
    }
    byEmail.set(c.data.email, { ...byEmail.get(c.data.email), ...c.data });
  }
  const duplicates = parsed.data.contacts.length - invalid - byEmail.size;
  const rows = [...byEmail.values()];

  const existing = await prisma.marketingContact.findMany({
    where: { businessId: owned.businessId, email: { in: rows.map((r) => r.email) } },
    select: { id: true, email: true, name: true, phone: true, note: true },
  });
  const known = new Map(existing.map((e) => [e.email, e]));
  const fresh = rows.filter((r) => !known.has(r.email));

  if (fresh.length) {
    await prisma.marketingContact.createMany({
      data: fresh.map((r) => ({
        businessId: owned.businessId,
        email: r.email,
        name: r.name || null,
        phone: r.phone || null,
        note: r.note || null,
      })),
      skipDuplicates: true,
    });
  }
  let updated = 0;
  for (const r of rows) {
    const e = known.get(r.email);
    if (!e) continue;
    const data = {
      ...(r.name && r.name !== e.name ? { name: r.name } : {}),
      ...(r.phone && r.phone !== e.phone ? { phone: r.phone } : {}),
      ...(r.note && r.note !== e.note ? { note: r.note } : {}),
    };
    if (Object.keys(data).length === 0) continue;
    await prisma.marketingContact.update({ where: { id: e.id }, data });
    updated++;
  }

  return NextResponse.json({ added: fresh.length, updated, unchanged: existing.length - updated, invalid, duplicates });
}

/** `?all=1` empties the whole list (after a wrong import). */
export async function DELETE(req: Request) {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  if (new URL(req.url).searchParams.get("all") !== "1") return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const res = await prisma.marketingContact.deleteMany({ where: { businessId: owned.businessId } });
  return NextResponse.json({ deleted: res.count });
}
