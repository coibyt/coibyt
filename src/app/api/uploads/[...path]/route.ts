import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

/**
 * Serves files from public/uploads by reading them directly off disk at
 * request time, instead of relying on Next's static file serving.
 *
 * next.config.mjs sets `output: "standalone"`, and Hostinger's Node.js app
 * panel runs the generated `.next/standalone/server.js`. That server only
 * serves static assets from `.next/standalone/public`, a copy made at BUILD
 * time — files the upload route writes to the real `public/uploads` at
 * runtime are invisible to it, so they 404 immediately. Reading the file
 * ourselves in a route handler sidesteps that entirely: this process and the
 * upload route share the same `process.cwd()`, so whatever gets written is
 * always readable here regardless of which server entry point is running.
 */
const CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: segments } = await params;

  if (segments.some((s) => s.includes("..") || s.includes("\0"))) {
    return NextResponse.json({ error: "INVALID_PATH" }, { status: 400 });
  }

  const ext = path.extname(segments[segments.length - 1] ?? "").toLowerCase();
  const contentType = CONTENT_TYPES[ext];
  if (!contentType) {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  }

  const filePath = path.join(process.cwd(), "public", "uploads", ...segments);

  try {
    const buffer = await readFile(filePath);
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  }
}
