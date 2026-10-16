const DEFAULT_TIMEOUT_MS = 15_000;
const RETRY_DELAY_MS = 800;

// Tried in order, one attempt each — each model has its own capacity and
// quota, so when one is overloaded (503), rate-limited (429) or retired
// (404), the next one usually isn't. Flash-lite leads because it answers
// these short replies in ~2s, while full flash (and the "-latest" alias,
// deliberately not used) regularly hangs 30s+ under load. Google retires
// models: a 404 in the logs naming a replacement means this list needs it.
const MODELS = ["gemini-3.5-flash-lite", "gemini-3.8-flash"];
const RETRYABLE_STATUSES = new Set([404, 429, 500, 503]);

function withTimeout(ms: number) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return { signal: controller.signal, clear: () => clearTimeout(timer) };
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** POSTs to the Gemini generateContent endpoint, shared by the AI chat reply
 * and the salon-check summary. Falls through MODELS on an overloaded /
 * rate-limited / missing model or on our own request timing out. Returns the
 * reply text, or null once every model has failed (or on a non-retryable
 * error such as a bad API key) so callers fall back to their own default
 * behavior; each failure is logged with the caller's tag so a silent "no
 * reply" in production is debuggable. */
export async function generateGeminiText(params: {
  apiKey: string;
  body: Record<string, unknown>;
  logTag: string;
  timeoutMs?: number;
}): Promise<string | null> {
  const timeoutMs = params.timeoutMs ?? DEFAULT_TIMEOUT_MS;

  for (let i = 0; i < MODELS.length; i++) {
    const model = MODELS[i];
    const hasNext = i < MODELS.length - 1;
    const { signal, clear } = withTimeout(timeoutMs);
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${params.apiKey}`,
        {
          method: "POST",
          signal,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(params.body),
        }
      );
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error(`${params.logTag} ${model} returned ${res.status}: ${text.slice(0, 300)}`);
        if (RETRYABLE_STATUSES.has(res.status) && hasNext) {
          await sleep(RETRY_DELAY_MS);
          continue;
        }
        return null;
      }
      const data = await res.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (typeof reply === "string" && reply.trim()) return reply.trim();
      console.error(`${params.logTag} ${model} returned no text: ${JSON.stringify(data).slice(0, 300)}`);
      return null;
    } catch (err) {
      const isTimeout = err instanceof Error && err.name === "AbortError";
      console.error(`${params.logTag} ${model} ${isTimeout ? "timed out" : "request failed"}`, isTimeout ? "" : err);
      if (isTimeout && hasNext) continue;
      return null;
    } finally {
      clear();
    }
  }
  return null;
}
