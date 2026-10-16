"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const GUEST_ID_KEY = "varaaai_guest_id";

/** Starts/resumes a chat conversation without requiring the visitor to sign
 * in first — a first-time anonymous visitor only has to give a name (see
 * POST /api/chat/start), which creates a lightweight guest identity kept in
 * this browser's localStorage so a return visit resumes the same thread.
 * A signed-in customer's own session is used instead, same as before. */
export function useGuestChat(businessSlug: string) {
  const { status } = useSession();
  const [storedGuestId, setStoredGuestId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      setStoredGuestId(localStorage.getItem(GUEST_ID_KEY));
    } catch {
      setStoredGuestId(null);
    }
    setLoaded(true);
  }, []);

  const isGuestMode = status !== "authenticated" && status !== "loading";
  // Not "ready" until the session check settles too — otherwise a returning
  // guest's auto-resume fires while status is still "loading", sends neither
  // a session nor the stored guestId, and gets a 400 it never recovers from.
  const ready = loaded && status !== "loading";

  async function start(guestName?: string, guestEmail?: string) {
    const body: Record<string, string> = { businessSlug };
    if (isGuestMode) {
      if (storedGuestId) body.guestId = storedGuestId;
      else {
        if (guestName) body.guestName = guestName;
        if (guestEmail) body.guestEmail = guestEmail;
      }
    }
    const res = await fetch("/api/chat/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      conversationId: string;
      guestId?: string;
      aiChatEnabled: boolean;
      aiPaused: boolean;
    };
    if (data.guestId) {
      try {
        localStorage.setItem(GUEST_ID_KEY, data.guestId);
      } catch {
        // Private browsing / blocked storage — chat still works for this
        // visit, it just won't resume the same thread next time.
      }
      setStoredGuestId(data.guestId);
    }
    return data;
  }

  return {
    status,
    loaded: ready,
    isGuestMode,
    guestId: isGuestMode ? storedGuestId : null,
    needsName: ready && isGuestMode && !storedGuestId,
    start,
  };
}
