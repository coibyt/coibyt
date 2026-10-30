import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { teamAccess } from "@/lib/team";

/** Videos are served a few megabytes at a time; the player asks for more. */
const MAX_RANGE_BYTES = 4 * 1024 * 1024;

async function ownUpload(id: string) {
  const t = await teamAccess();
  if (!t) return null;
  const media = await prisma.teamMedia.findUnique({
    where: { id },
    select: { id: true, businessId: true, uploaderId: true, size: true, chunkSize: true, complete: true },
  });
  if (!media || media.uploaderId !== t.userId || media.businessId !== t.businessId) return null;
  return media;
}

/** One piece of an upload (?idx=n), or the video's still (?poster=1). */
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const media = await ownUpload(id);
  if (!media || media.complete) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const url = new URL(req.url);
  const data = Buffer.from(await req.arrayBuffer());
  if (url.searchParams.get("poster")) {
    if (data.length === 0 || data.length > 2 * 1024 * 1024) return NextResponse.json({ error: "INVALID" }, { status: 400 });
    await prisma.teamMedia.update({ where: { id }, data: { posterData: data } });
    return NextResponse.json({ ok: true });
  }
  const idx = Number(url.searchParams.get("idx"));
  const count = Math.ceil(media.size / media.chunkSize);
  const expected = idx === count - 1 ? media.size - idx * media.chunkSize : media.chunkSize;
  if (!Number.isInteger(idx) || idx < 0 || idx >= count || data.length !== expected) {
    return NextResponse.json({ error: "INVALID" }, { status: 400 });
  }
  await prisma.teamMediaChunk.upsert({
    where: { mediaId_idx: { mediaId: id, idx } },
    update: { data },
    create: { mediaId: id, idx, data },
  });
  return NextResponse.json({ ok: true });
}

/** Finishes an upload once every piece has arrived. */
export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const media = await ownUpload(id);
  if (!media) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const count = Math.ceil(media.size / media.chunkSize);
  const have = await prisma.teamMediaChunk.count({ where: { mediaId: id } });
  if (have !== count) return NextResponse.json({ error: "INCOMPLETE" }, { status: 400 });
  await prisma.teamMedia.update({ where: { id }, data: { complete: true } });
  return NextResponse.json({ ok: true });
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = await teamAccess();
  if (!t) return new NextResponse(null, { status: 403 });
  const media = await prisma.teamMedia.findUnique({
    where: { id },
    select: { businessId: true, mimeType: true, name: true, size: true, chunkSize: true, complete: true, posterData: true },
  });
  if (!media || !media.complete || media.businessId !== t.businessId) return new NextResponse(null, { status: 404 });

  const url = new URL(req.url);
  const cache = "private, max-age=31536000, immutable";
  if (url.searchParams.get("poster")) {
    if (!media.posterData) return new NextResponse(null, { status: 404 });
    return new NextResponse(new Uint8Array(media.posterData), { headers: { "Content-Type": "image/jpeg", "Cache-Control": cache } });
  }

  const disposition = `${url.searchParams.get("download") ? "attachment" : "inline"}; filename*=UTF-8''${encodeURIComponent(media.name)}`;
  const base = {
    "Content-Type": media.mimeType,
    "Accept-Ranges": "bytes",
    "Cache-Control": cache,
    "Content-Disposition": disposition,
  };
  const cs = media.chunkSize;

  const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.get("range") ?? "");
  if (range && (range[1] || range[2])) {
    let start: number;
    let end: number;
    if (range[1]) {
      start = Number(range[1]);
      end = range[2] ? Math.min(Number(range[2]), media.size - 1) : media.size - 1;
    } else {
      start = Math.max(0, media.size - Number(range[2]));
      end = media.size - 1;
    }
    if (start >= media.size || start > end) {
      return new NextResponse(null, { status: 416, headers: { "Content-Range": `bytes */${media.size}` } });
    }
    end = Math.min(end, start + MAX_RANGE_BYTES - 1);
    const first = Math.floor(start / cs);
    const last = Math.floor(end / cs);
    const chunks = await prisma.teamMediaChunk.findMany({
      where: { mediaId: id, idx: { gte: first, lte: last } },
      orderBy: { idx: "asc" },
      select: { data: true },
    });
    const buf = Buffer.concat(chunks.map((c) => Buffer.from(c.data)));
    const body = buf.subarray(start - first * cs, end - first * cs + 1);
    return new NextResponse(new Uint8Array(body), {
      status: 206,
      headers: { ...base, "Content-Length": String(body.length), "Content-Range": `bytes ${start}-${end}/${media.size}` },
    });
  }

  // The whole file, one stored piece at a time.
  const count = Math.ceil(media.size / cs);
  let idx = 0;
  const stream = new ReadableStream<Uint8Array>({
    async pull(controller) {
      if (idx >= count) return controller.close();
      const chunk = await prisma.teamMediaChunk.findUnique({ where: { mediaId_idx: { mediaId: id, idx } }, select: { data: true } });
      idx++;
      if (!chunk) return controller.error(new Error("missing chunk"));
      controller.enqueue(new Uint8Array(chunk.data));
    },
  });
  return new NextResponse(stream, { headers: { ...base, "Content-Length": String(media.size) } });
}
