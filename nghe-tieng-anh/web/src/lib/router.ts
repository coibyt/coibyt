import { useSyncExternalStore } from "react";

/** Hash routes (#/notebook, #/day/2026-11-27/text) so the static site works from any folder. */
const sub = (l: () => void) => {
  addEventListener("hashchange", l);
  return () => removeEventListener("hashchange", l);
};
export function useRoute(): string[] {
  const hash = useSyncExternalStore(sub, () => location.hash);
  return hash.replace(/^#\/?/, "").split("/").filter(Boolean);
}
export const go = (path: string) => {
  location.hash = path.startsWith("/") ? path : `/${path}`;
  scrollTo({ top: 0 });
};
