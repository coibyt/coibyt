"use client";

import { useEffect } from "react";

/** Registers the installability service worker — split out from
 * InstallAppButton so it still runs even on pages that don't render the
 * button, keeping the site installable everywhere. */
export function PwaRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  return null;
}
