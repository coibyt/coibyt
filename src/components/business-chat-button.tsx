"use client";

import { useState } from "react";
import { MessageCircle, Loader2, X } from "lucide-react";
import { ChatWidget } from "@/components/chat-widget";
import { useGuestChat } from "@/hooks/use-guest-chat";

const CHAT_LABELS: Record<string, string> = {
  vi: "Chat với Salon",
  en: "Chat with salon",
  fi: "Keskustele salongin kanssa",
  pl: "Napisz do salonu",
  de: "Mit dem Salon chatten",
  km: "ជជែកជាមួយសាឡុង",
  th: "แชทกับร้าน",
};

const NAME_PROMPT: Record<string, { title: string; placeholder: string; start: string }> = {
  vi: { title: "Cho chúng tôi biết tên của bạn", placeholder: "Tên của bạn", start: "Bắt đầu chat" },
  en: { title: "Let us know your name", placeholder: "Your name", start: "Start chat" },
  fi: { title: "Kerro nimesi", placeholder: "Nimesi", start: "Aloita keskustelu" },
  pl: { title: "Podaj swoje imię", placeholder: "Twoje imię", start: "Rozpocznij czat" },
  de: { title: "Wie heißt du?", placeholder: "Dein Name", start: "Chat starten" },
  km: { title: "សូមប្រាប់ឈ្មោះរបស់អ្នក", placeholder: "ឈ្មោះរបស់អ្នក", start: "ចាប់ផ្តើមជជែក" },
  th: { title: "บอกชื่อของคุณให้เราทราบ", placeholder: "ชื่อของคุณ", start: "เริ่มแชท" },
};

/**
 * No sign-in required — a first-time visitor only gives their name (see
 * useGuestChat), a returning one resumes their thread straight away. A
 * signed-in customer's session is used instead, same as before.
 */
export function BusinessChatButton({
  businessSlug,
  businessName,
  locale,
}: {
  businessSlug: string;
  businessName: string;
  locale: string;
}) {
  const { loaded, needsName, guestId, start } = useGuestChat(businessSlug);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [aiState, setAiState] = useState({ aiChatEnabled: false, aiPaused: false });
  const [opening, setOpening] = useState(false);
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [guestNameInput, setGuestNameInput] = useState("");
  const label = CHAT_LABELS[locale] ?? CHAT_LABELS.en;
  const namePrompt = NAME_PROMPT[locale] ?? NAME_PROMPT.en;

  async function openChat() {
    if (needsName) {
      setShowNamePrompt(true);
      return;
    }
    setOpening(true);
    const result = await start();
    setOpening(false);
    if (result) {
      setConversationId(result.conversationId);
      setAiState({ aiChatEnabled: result.aiChatEnabled, aiPaused: result.aiPaused });
    }
  }

  async function submitName(e: React.FormEvent) {
    e.preventDefault();
    if (!guestNameInput.trim()) return;
    setOpening(true);
    const result = await start(guestNameInput.trim());
    setOpening(false);
    setShowNamePrompt(false);
    if (result) {
      setConversationId(result.conversationId);
      setAiState({ aiChatEnabled: result.aiChatEnabled, aiPaused: result.aiPaused });
    }
  }

  return (
    <>
      <button
        onClick={openChat}
        disabled={opening || !loaded}
        className="btn-outline !px-4 !py-2 text-xs"
      >
        {opening ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <MessageCircle className="h-3.5 w-3.5" />}
        {label}
      </button>

      {showNamePrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 p-4">
          <form onSubmit={submitName} className="card w-full max-w-xs space-y-3 p-5">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-ink-900">{namePrompt.title}</p>
              <button type="button" onClick={() => setShowNamePrompt(false)} className="text-ink-400">
                <X className="h-5 w-5" />
              </button>
            </div>
            <input
              autoFocus
              required
              className="input"
              placeholder={namePrompt.placeholder}
              value={guestNameInput}
              onChange={(e) => setGuestNameInput(e.target.value)}
            />
            <button type="submit" disabled={opening} className="btn-primary w-full">
              {opening && <Loader2 className="h-4 w-4 animate-spin" />}
              {namePrompt.start}
            </button>
          </form>
        </div>
      )}

      {conversationId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 p-4">
          <div className="h-[32rem] w-full max-w-sm">
            <ChatWidget
              conversationId={conversationId}
              viewerRole="CUSTOMER"
              title={businessName}
              locale={locale}
              guestId={guestId ?? undefined}
              aiChatEnabled={aiState.aiChatEnabled}
              aiPaused={aiState.aiPaused}
              onClose={() => setConversationId(null)}
            />
          </div>
        </div>
      )}
    </>
  );
}
