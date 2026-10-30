import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { teamAccess } from "@/lib/team";
import { MEDIA_CHUNK_BYTES, mediaKindFor, MEDIA_LIMITS } from "@/lib/team-media";

const schema = z.object({
  mimeType: z.string().min(1).max(120),
  name: z.string().min(1).max(255),
  size: z.number().int().positive(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
});

/** Starts an upload to the team hub: the browser then sends the bytes in
 * pieces (PUT …/media/[id]?idx=n) and finishes with POST …/media/[id]. */
export async function POST(req: Request) {
  const t = await teamAccess();
  if (!t) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const { mimeType, name, size, width, height } = parsed.data;
  const kind = mediaKindFor(mimeType, name);
  if (!kind) return NextResponse.json({ error: "UNSUPPORTED_TYPE" }, { status: 400 });
  if (size > MEDIA_LIMITS[kind]) return NextResponse.json({ error: "FILE_TOO_LARGE", limit: MEDIA_LIMITS[kind] }, { status: 400 });

  // Uploads abandoned half-way more than a day ago.
  await prisma.teamMedia.deleteMany({
    where: { uploaderId: t.userId, complete: false, createdAt: { lt: new Date(Date.now() - 24 * 3600e3) } },
  });
  const media = await prisma.teamMedia.create({
    data: { businessId: t.businessId, uploaderId: t.userId, kind, mimeType, name, size, width, height, chunkSize: MEDIA_CHUNK_BYTES },
    select: { id: true, kind: true, chunkSize: true },
  });
  return NextResponse.json(media);
}
