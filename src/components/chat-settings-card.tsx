"use client";

import { useEffect, useState } from "react";
import { Loader2, Sparkles, Bell, Check } from "lucide-react";

function urlBase64ToUint8Array(base64: string) {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const base64Safe = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64Safe);
  return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)));
}

/** Lets the owner turn on the AI assistant for when they're away, and opt
 * this device in to push notifications for "a customer wants to talk to you"
 * alerts (see src/lib/push.ts). Both are independent — a salon can run the
 * AI without push, or enable push without the AI (for other future alerts). */
export function ChatSettingsCard({ locale, aiChatEnabled }: { locale: string; aiChatEnabled: boolean }) {
  const [enabled, setEnabled] = useState(aiChatEnabled);
  const [savingAi, setSavingAi] = useState(false);
  const [pushState, setPushState] = useState<"unsupported" | "default" | "denied" | "granted" | "checking">(
    "checking"
  );
  const [subscribing, setSubscribing] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("Notification" in window) || !("serviceWorker" in navigator)) {
      setPushState("unsupported");
      return;
    }
    setPushState(Notification.permission as "default" | "denied" | "granted");
  }, []);

  async function toggleAi(next: boolean) {
    setEnabled(next);
    setSavingAi(true);
    const res = await fetch("/api/business/ai-chat", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled: next }),
    });
    setSavingAi(false);
    if (!res.ok) setEnabled(!next); // revert on failure
  }

  async function enablePush() {
    setSubscribing(true);
    try {
      const permission = await Notification.requestPermission();
      setPushState(permission as "default" | "denied" | "granted");
      if (permission !== "granted") return;

      const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!publicKey) return;

      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });
      await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscription.toJSON()),
      });
    } finally {
      setSubscribing(false);
    }
  }

  return (
    <div className="card space-y-5 p-5">
      <div>
        <h2 className="mb-1 flex items-center gap-2 font-semibold text-ink-900">
          <Sparkles className="h-4 w-4 text-primary-500" />
          {locale === "vi" ? "Trợ lý AI khi bạn vắng mặt" : "AI assistant while you're away"}
        </h2>
        <p className="mb-3 text-xs text-ink-400">
          {locale === "vi"
            ? "Khi bật, trợ lý AI sẽ tự động trả lời khách dựa trên dịch vụ và sản phẩm hiện có của bạn. Khách có thể bấm \"Nói chuyện với chủ salon\" bất cứ lúc nào để yêu cầu bạn trực tiếp trả lời."
            : "When on, the AI assistant automatically replies to customers using your current services and products. Customers can tap \"Talk to the owner\" any time to ask for you directly."}
        </p>
        <label className="flex w-fit cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={enabled}
            disabled={savingAi}
            onChange={(e) => toggleAi(e.target.checked)}
            className="h-4 w-4"
          />
          <span className="text-sm text-ink-900">
            {locale === "vi" ? "Bật trợ lý AI" : "Enable AI assistant"}
          </span>
          {savingAi && <Loader2 className="h-3.5 w-3.5 animate-spin text-ink-400" />}
        </label>
      </div>

      <div className="border-t border-ink-100 pt-4">
        <h2 className="mb-1 flex items-center gap-2 font-semibold text-ink-900">
          <Bell className="h-4 w-4 text-primary-500" />
          {locale === "vi" ? "Thông báo khi khách muốn nói chuyện trực tiếp" : "Alerts when a customer wants you directly"}
        </h2>
        <p className="mb-3 text-xs text-ink-400">
          {locale === "vi"
            ? "Nhận thông báo đẩy ngay trên thiết bị này (ngoài email) khi khách bấm \"Nói chuyện với chủ salon\"."
            : "Get a push notification right on this device (in addition to email) when a customer taps \"Talk to the owner\"."}
        </p>
        {pushState === "unsupported" ? (
          <p className="text-xs text-ink-400">
            {locale === "vi" ? "Trình duyệt này không hỗ trợ thông báo đẩy." : "This browser doesn't support push notifications."}
          </p>
        ) : pushState === "granted" ? (
          <p className="flex items-center gap-1.5 text-sm text-sage-600">
            <Check className="h-4 w-4" /> {locale === "vi" ? "Đã bật thông báo trên thiết bị này." : "Notifications are on for this device."}
          </p>
        ) : pushState === "denied" ? (
          <p className="text-xs text-berry-500">
            {locale === "vi"
              ? "Bạn đã chặn thông báo cho trang này — hãy bật lại trong cài đặt trình duyệt."
              : "You've blocked notifications for this site — re-enable them in your browser settings."}
          </p>
        ) : (
          <button onClick={enablePush} disabled={subscribing} className="btn-outline !px-4 !py-2 text-xs">
            {subscribing && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            {locale === "vi" ? "Bật thông báo trên thiết bị này" : "Enable notifications on this device"}
          </button>
        )}
      </div>
    </div>
  );
}
