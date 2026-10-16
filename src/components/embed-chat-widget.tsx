"use client";

import { useEffect, useState } from "react";
import { Loader2, MessageCircle } from "lucide-react";
import { ChatWidget } from "@/components/chat-widget";
import { useGuestChat } from "@/hooks/use-guest-chat";

const START_LABELS: Record<
  string,
  { title: string; subtitle: string; placeholder: string; emailPlaceholder: string; start: string }
> = {
  vi: {
    title: "Chat với chúng tôi",
    subtitle: "Cho chúng tôi biết tên và email của bạn để bắt đầu — không cần đăng ký.",
    placeholder: "Tên của bạn",
    emailPlaceholder: "Email của bạn",
    start: "Bắt đầu chat",
  },
  en: {
    title: "Chat with us",
    subtitle: "Tell us your name and email to get started — no registration needed.",
    placeholder: "Your name",
    emailPlaceholder: "Your email",
    start: "Start chat",
  },
};

/** The full content of the /embed/[slug]/chat page — meant to be dropped
 * into an <iframe> on the salon's own website (see ChatEmbedCard). Visitors
 * there are almost never signed into VaraaAi, so this always goes through
 * the guest flow unless they happen to already have a session. */
export function EmbedChatWidget({
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
  const [starting, setStarting] = useState(false);
  const [autoStarted, setAutoStarted] = useState(false);
  const [guestNameInput, setGuestNameInput] = useState("");
  const [guestEmailInput, setGuestEmailInput] = useState("");
  const t = START_LABELS[locale] ?? START_LABELS.en;

  // A returning guest (or a signed-in customer) resumes straight away, no
  // name prompt needed — this is the only side effect in this component, so
  // it's kept out of render entirely.
  useEffect(() => {
    if (loaded && !needsName && !conversationId && !autoStarted) {
      setAutoStarted(true);
      setStarting(true);
      start().then((result) => {
        setStarting(false);
        if (result) {
          setConversationId(result.conversationId);
          setAiState({ aiChatEnabled: result.aiChatEnabled, aiPaused: result.aiPaused });
        }
      });
    }
  }, [loaded, needsName, conversationId, autoStarted, start]);

  async function submitName(e: React.FormEvent) {
    e.preventDefault();
    if (!guestNameInput.trim() || !guestEmailInput.trim()) return;
    setStarting(true);
    const result = await start(guestNameInput.trim(), guestEmailInput.trim());
    setStarting(false);
    if (result) {
      setConversationId(result.conversationId);
      setAiState({ aiChatEnabled: result.aiChatEnabled, aiPaused: result.aiPaused });
    }
  }

  if (conversationId) {
    return (
      <ChatWidget
        conversationId={conversationId}
        viewerRole="CUSTOMER"
        title={businessName}
        locale={locale}
        guestId={guestId ?? undefined}
        aiChatEnabled={aiState.aiChatEnabled}
        aiPaused={aiState.aiPaused}
      />
    );
  }

  if (!loaded || starting || !needsName) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-ink-400" />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-ink-100 bg-white p-6 text-center">
      <MessageCircle className="h-8 w-8 text-primary-500" />
      <p className="font-semibold text-ink-900">{t.title}</p>
      <p className="text-sm text-ink-400">{t.subtitle}</p>
      <form onSubmit={submitName} className="w-full max-w-xs space-y-2">
        <input
          autoFocus
          required
          className="input"
          placeholder={t.placeholder}
          value={guestNameInput}
          onChange={(e) => setGuestNameInput(e.target.value)}
        />
        <input
          required
          type="email"
          className="input"
          placeholder={t.emailPlaceholder}
          value={guestEmailInput}
          onChange={(e) => setGuestEmailInput(e.target.value)}
        />
        <button type="submit" disabled={starting} className="btn-primary w-full">
          {starting && <Loader2 className="h-4 w-4 animate-spin" />}
          {t.start}
        </button>
      </form>
    </div>
  );
}
