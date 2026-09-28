"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { MessageCircle, Loader2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ChatWidget } from "@/components/chat-widget";

const CHAT_LABELS: Record<string, string> = {
  vi: "Chat với Salon",
  en: "Chat with salon",
  fi: "Keskustele salongin kanssa",
  pl: "Napisz do salonu",
  de: "Mit dem Salon chatten",
  km: "ជជែកជាមួយសាឡុង",
  th: "แชทกับร้าน",
};

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
  const label = CHAT_LABELS[locale] ?? CHAT_LABELS.en;

  if (status === "unauthenticated") {
    return (
      <Link
        href={`/auth/sign-in?callbackUrl=/b/${businessSlug}`}
        className="btn-outline !px-4 !py-2 text-xs"
      >
        <MessageCircle className="h-3.5 w-3.5" />
        {label}
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
        {label}
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
