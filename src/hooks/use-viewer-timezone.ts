import { useEffect, useState } from "react";

/** The viewer's own device timezone, detected client-side only — starts
 * null so server-rendered markup never mismatches on hydration. Used to
 * show a "your local time" note next to salon-local times, without ever
 * changing what those times actually are. */
export function useViewerTimezone(): string | null {
  const [timezone, setTimezone] = useState<string | null>(null);

  useEffect(() => {
    try {
      setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    } catch {
      setTimezone(null);
    }
  }, []);

  return timezone;
}
