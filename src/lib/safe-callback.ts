/** A `?callbackUrl=` value that is safe to go to after signing in or up:
 * a path on this site ("/academy/…"), never another site ("//evil.com"). */
export function safeCallback(raw: string | null | undefined, fallback = "/") {
  if (!raw || !raw.startsWith("/") || raw.startsWith("//") || raw.startsWith("/\\")) return fallback;
  return raw;
}
