"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { MessageCircle, Loader2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ChatWidget } from "@/components/chat-widget";

export function BusinessChatButton({
  businessSlug,
  businessName,
  locale,
}: {
  businessSlug: string;
  businessName: string;
  locale: string;
}) {
  const { status } = useSession();
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [opening, setOpening] = useState(false);

  if (status === "unauthenticated") {
    return (
      <Link
        href={`/auth/sign-in?callbackUrl=/b/${businessSlug}`}
        className="btn-outline !px-4 !py-2 text-xs"
      >
        <MessageCircle className="h-3.5 w-3.5" />
        {locale === "vi" ? "Chat với Salon" : "Chat with salon"}
      </Link>
    );
  }

  async function openChat() {
    setOpening(true);
    const res = await fetch("/api/chat/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ businessSlug }),
    });
    setOpening(false);
    if (res.ok) {
      const data = await res.json();
      setConversationId(data.conversationId);
    }
  }

  return (
    <>
      <button onClick={openChat} disabled={opening} className="btn-outline !px-4 !py-2 text-xs">
        {opening ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <MessageCircle className="h-3.5 w-3.5" />}
        {locale === "vi" ? "Chat với Salon" : "Chat with salon"}
      </button>

      {conversationId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 p-4">
          <div className="h-[32rem] w-full max-w-sm">
            <ChatWidget
              conversationId={conversationId}
              viewerRole="CUSTOMER"
              title={businessName}
              locale={locale}
              onClose={() => setConversationId(null)}
            />
          </div>
        </div>
      )}
    </>
  );
}
