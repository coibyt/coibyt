const DEFAULT_TIMEOUT_MS = 15_000;
const MAX_ATTEMPTS = 3;
const RETRY_DELAYS_MS = [1000, 2000];

// A pinned version, not the "-latest" alias — every free-tier caller that
// doesn't bother pinning defaults to "-latest", concentrating demand (and
// 503 "overloaded" errors) there. A specific version draws from a less
// contended capacity pool while still being a current, fully supported model.
const MODEL = "gemini-2.5-flash";

function withTimeout(ms: number) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return { signal: controller.signal, clear: () => clearTimeout(timer) };
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** POSTs to the Gemini generateContent endpoint, shared by the AI chat reply
 * and the salon-check summary. Retries up to twice more, with a short
 * backoff, on a 503 ("model overloaded" — Google's own message for that
 * status calls it temporary) or on our own request timing out, since under
 * high demand a slow response and an outright 503 are the same underlying
 * problem. Returns the reply text, or null once every attempt is exhausted
 * (or on a non-retryable error) so callers fall back to their own default
 * behavior; each failure is logged with the caller's own tag so a silent
 * "no reply" in production is debuggable. */
export async function generateGeminiText(params: {
  apiKey: string;
  body: Record<string, unknown>;
  logTag: string;
  timeoutMs?: number;
}): Promise<string | null> {
  const timeoutMs = params.timeoutMs ?? DEFAULT_TIMEOUT_MS;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const { signal, clear } = withTimeout(timeoutMs);
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${params.apiKey}`,
        {
          method: "POST",
          signal,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(params.body),
        }
      );
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        if (res.status === 503 && attempt < MAX_ATTEMPTS) {
          console.error(`${params.logTag} Gemini overloaded (503), attempt ${attempt}/${MAX_ATTEMPTS}, retrying`);
          await sleep(RETRY_DELAYS_MS[attempt - 1]);
          continue;
        }
        console.error(`${params.logTag} Gemini API returned ${res.status}: ${text.slice(0, 500)}`);
        return null;
      }
      const data = await res.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      return typeof reply === "string" && reply.trim() ? reply.trim() : null;
    } catch (err) {
      const isTimeout = err instanceof Error && err.name === "AbortError";
      if (isTimeout && attempt < MAX_ATTEMPTS) {
        console.error(`${params.logTag} request timed out, attempt ${attempt}/${MAX_ATTEMPTS}, retrying`);
        await sleep(RETRY_DELAYS_MS[attempt - 1]);
        continue;
      }
      console.error(`${params.logTag} request failed`, err);
      return null;
    } finally {
      clear();
    }
  }
  return null;
}
