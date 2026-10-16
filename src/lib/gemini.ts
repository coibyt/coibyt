const DEFAULT_TIMEOUT_MS = 20_000;

function withTimeout(ms: number) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return { signal: controller.signal, clear: () => clearTimeout(timer) };
}

/** POSTs to the Gemini generateContent endpoint, shared by the AI chat reply
 * and the salon-check summary. Retries once after a short delay on a 503
 * ("model overloaded") — Google's own error message for that status calls it
 * temporary and says to retry. Returns the reply text, or null on any
 * failure (timeout, non-retryable error, empty response) so callers fall
 * back to their own default behavior; each failure is logged with the
 * caller's own tag so a silent "no reply" in production is debuggable. */
export async function generateGeminiText(params: {
  apiKey: string;
  body: Record<string, unknown>;
  logTag: string;
  timeoutMs?: number;
}): Promise<string | null> {
  const timeoutMs = params.timeoutMs ?? DEFAULT_TIMEOUT_MS;

  for (let attempt = 1; attempt <= 2; attempt++) {
    const { signal, clear } = withTimeout(timeoutMs);
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${params.apiKey}`,
        {
          method: "POST",
          signal,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(params.body),
        }
      );
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        if (res.status === 503 && attempt === 1) {
          console.error(`${params.logTag} Gemini overloaded (503), retrying once`);
          await new Promise((r) => setTimeout(r, 1200));
          continue;
        }
        console.error(`${params.logTag} Gemini API returned ${res.status}: ${text.slice(0, 500)}`);
        return null;
      }
      const data = await res.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      return typeof reply === "string" && reply.trim() ? reply.trim() : null;
    } catch (err) {
      console.error(`${params.logTag} request failed`, err);
      return null;
    } finally {
      clear();
    }
  }
  return null;
}
