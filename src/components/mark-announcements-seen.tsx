"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";

/** Renders nothing; on mount it tells the server the owner has now seen the
 * announcements, then refreshes so the sidebar badge clears. */
export function MarkAnnouncementsSeen({ hasUnread }: { hasUnread: boolean }) {
  const router = useRouter();
  useEffect(() => {
    if (!hasUnread) return;
    fetch("/api/support/announcements/seen", { method: "POST" }).then((res) => {
      if (res.ok) router.refresh();
    });
  }, [hasUnread, router]);
  return null;
}
