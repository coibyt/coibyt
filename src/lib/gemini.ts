const DEFAULT_TIMEOUT_MS = 15_000;
const RETRY_DELAY_MS = 800;
const MAX_TOOL_ROUNDS = 4;

// Tried in order — each model has its own capacity and quota, so when one is
// overloaded (503), rate-limited (429) or retired (404), the next one usually
// isn't. Flash-lite leads because it answers these short replies in ~2-5s,
// while full flash (and the "-latest" alias, deliberately not used) regularly
// hangs 30s+ under load. Google retires models: a 404 in the logs naming a
// replacement means this list needs updating.
const MODELS = ["gemini-3.5-flash-lite", "gemini-3.8-flash"];
const RETRYABLE_STATUSES = new Set([404, 429, 500, 503]);

type GeminiPart = { text?: string; functionCall?: { name: string; args?: Record<string, unknown>; id?: string } };
type GeminiContent = { role: string; parts: GeminiPart[] };

export type GeminiToolDeclaration = {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
};

type CallResult = { ok: true; content: GeminiContent | null } | { ok: false; tryNextModel: boolean };

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function callModel(
  model: string,
  apiKey: string,
  body: Record<string, unknown>,
  timeoutMs: number,
  logTag: string
): Promise<CallResult> {
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        signal: AbortSignal.timeout(timeoutMs),
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error(`${logTag} ${model} returned ${res.status}: ${text.slice(0, 300)}`);
      return { ok: false, tryNextModel: RETRYABLE_STATUSES.has(res.status) };
    }
    const data = await res.json();
    const content = (data?.candidates?.[0]?.content as GeminiContent | undefined) ?? null;
    if (!content) console.error(`${logTag} ${model} returned no content: ${JSON.stringify(data).slice(0, 300)}`);
    return { ok: true, content };
  } catch (err) {
    const timedOut = err instanceof Error && (err.name === "TimeoutError" || err.name === "AbortError");
    console.error(`${logTag} ${model} ${timedOut ? "timed out" : "request failed"}`, timedOut ? "" : err);
    return { ok: false, tryNextModel: timedOut };
  }
}

function textOf(content: GeminiContent | null): string | null {
  const text = (content?.parts ?? [])
    .map((p) => p.text ?? "")
    .join("")
    .trim();
  return text || null;
}

/** One-shot text generation, shared by the AI chat reply and the salon-check
 * summary. Falls through MODELS on an overloaded / rate-limited / missing
 * model or a timeout; returns null once every model has failed (or on a
 * non-retryable error such as a bad key) so callers use their own fallback.
 * Every failure is logged with the caller's tag. */
export async function generateGeminiText(params: {
  apiKey: string;
  body: Record<string, unknown>;
  logTag: string;
  timeoutMs?: number;
}): Promise<string | null> {
  return runGeminiWithTools({ ...params, tools: [], handleToolCall: async () => ({}) });
}

/** Like generateGeminiText, but lets the model call the given functions
 * (Gemini function calling) — each call is answered by handleToolCall and fed
 * back, for up to MAX_TOOL_ROUNDS rounds, until the model replies with text.
 * The model's own content (including any thought signatures) is echoed back
 * verbatim, which Gemini requires for multi-turn function calling. A model
 * failure mid-conversation restarts from scratch on the next model. */
export async function runGeminiWithTools(params: {
  apiKey: string;
  body: Record<string, unknown>;
  tools: GeminiToolDeclaration[];
  handleToolCall: (name: string, args: Record<string, unknown>) => Promise<Record<string, unknown>>;
  logTag: string;
  timeoutMs?: number;
}): Promise<string | null> {
  const timeoutMs = params.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const baseContents = (params.body.contents as GeminiContent[] | undefined) ?? [];

  for (let i = 0; i < MODELS.length; i++) {
    const model = MODELS[i];
    const hasNext = i < MODELS.length - 1;
    const contents = [...baseContents];
    let modelFailed = false;

    for (let round = 0; round <= MAX_TOOL_ROUNDS; round++) {
      const body: Record<string, unknown> = { ...params.body, contents };
      if (params.tools.length > 0) body.tools = [{ functionDeclarations: params.tools }];

      const result = await callModel(model, params.apiKey, body, timeoutMs, params.logTag);
      if (!result.ok) {
        if (result.tryNextModel && hasNext) {
          modelFailed = true;
          break;
        }
        return null;
      }

      const calls = (result.content?.parts ?? []).filter((p) => p.functionCall);
      if (calls.length === 0) return textOf(result.content);
      if (round === MAX_TOOL_ROUNDS) {
        console.error(`${params.logTag} ${model} still calling tools after ${MAX_TOOL_ROUNDS} rounds`);
        return textOf(result.content);
      }

      contents.push(result.content!);
      const responses = await Promise.all(
        calls.map(async (p) => {
          const call = p.functionCall!;
          const response = await params.handleToolCall(call.name, call.args ?? {}).catch((err) => {
            console.error(`${params.logTag} tool ${call.name} threw`, err);
            return { error: "Tool failed, try again or answer without it." };
          });
          return { functionResponse: { name: call.name, ...(call.id ? { id: call.id } : {}), response } };
        })
      );
      contents.push({ role: "user", parts: responses as GeminiPart[] });
    }

    if (modelFailed) {
      await sleep(RETRY_DELAY_MS);
      continue;
    }
  }
  return null;
}
