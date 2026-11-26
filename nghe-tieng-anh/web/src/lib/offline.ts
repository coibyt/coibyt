/** Offline audio: the day's MP3 is stored in the Cache API; the player then plays it from a blob URL,
 *  which seeks reliably on every browser (iOS included) without a network. */
const AUDIO_CACHE = "nghe-audio-v1";

export const offlineSupported = () => typeof caches !== "undefined";

export async function cachedBlob(url: string): Promise<Blob | null> {
  if (!offlineSupported()) return null;
  try {
    const c = await caches.open(AUDIO_CACHE);
    const r = await c.match(url);
    return r ? await r.blob() : null;
  } catch {
    return null;
  }
}

export async function isCached(url: string): Promise<boolean> {
  if (!offlineSupported()) return false;
  try {
    return !!(await (await caches.open(AUDIO_CACHE)).match(url));
  } catch {
    return false;
  }
}

export async function download(url: string, onProgress: (done: number, total: number) => void, signal?: AbortSignal) {
  const r = await fetch(url, { signal });
  if (!r.ok || !r.body) throw new Error(`Tải thất bại (${r.status})`);
  const total = Number(r.headers.get("content-length")) || 0;
  const reader = r.body.getReader();
  const chunks: BlobPart[] = [];
  let done = 0;
  for (;;) {
    const { value, done: end } = await reader.read();
    if (end) break;
    chunks.push(value);
    done += value.byteLength;
    onProgress(done, total);
  }
  const blob = new Blob(chunks, { type: "audio/mpeg" });
  const c = await caches.open(AUDIO_CACHE);
  await c.put(url, new Response(blob, { headers: { "Content-Type": "audio/mpeg", "Content-Length": String(blob.size) } }));
  try {
    await navigator.storage?.persist?.();
  } catch {
    /* optional */
  }
}

export async function removeCached(url: string) {
  if (!offlineSupported()) return;
  await (await caches.open(AUDIO_CACHE)).delete(url);
}

export async function cachedUrls(): Promise<string[]> {
  if (!offlineSupported()) return [];
  const keys = await (await caches.open(AUDIO_CACHE)).keys();
  return keys.map((k) => k.url);
}
