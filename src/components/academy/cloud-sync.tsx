"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useAcademyProgress } from "@/components/academy/use-progress";
import { STORAGE_KEY, cleanState, parseState } from "@/lib/academy/progress";

/** Keeps the Academy progress of a signed-in learner in their account:
 * on the first page they open, this browser's copy and the saved one are
 * merged; after that every change is saved a moment later. Renders nothing.
 * Mounted once, in the Academy layout. */
export function AcademyCloudSync() {
  const { status } = useSession();
  const { state, update } = useAcademyProgress();
  const [ready, setReady] = useState(false);
  const sent = useRef("");
  const started = useRef(false);

  useEffect(() => {
    if (status !== "authenticated" || started.current) return;
    started.current = true;
    (async () => {
      try {
        let local = state;
        try {
          local = parseState(window.localStorage.getItem(STORAGE_KEY));
        } catch {
          // storage turned off: use what this page has
        }
        const res = await fetch("/api/academy/progress", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ state: local }),
        });
        if (!res.ok) return;
        const merged = cleanState((await res.json()).state);
        update(() => merged);
        sent.current = JSON.stringify(merged);
        setReady(true);
      } catch {
        started.current = false; // offline: try again on the next change of session
      }
    })();
    // Only once per page load, with the state as it is when the session is known.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    if (!ready) return;
    const raw = JSON.stringify(state);
    if (raw === sent.current) return;
    const save = (keepalive = false) =>
      fetch("/api/academy/progress", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ state }), keepalive })
        .then((r) => {
          if (r.ok) sent.current = raw;
        })
        .catch(() => {});
    const timer = setTimeout(() => save(), 2500);
    // Leaving the page before the timer fires: send it anyway.
    const onHide = () => {
      if (document.visibilityState === "hidden") {
        clearTimeout(timer);
        save(true);
      }
    };
    document.addEventListener("visibilitychange", onHide);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", onHide);
    };
  }, [state, ready]);

  return null;
}
