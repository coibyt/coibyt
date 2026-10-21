"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import {
  ArrowLeft,
  Banknote,
  Check,
  Copy,
  Landmark,
  Loader2,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Store,
  X,
} from "lucide-react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import { useProductCart, type CartItem } from "@/lib/product-cart";
import { formatMoney } from "@/lib/money";
import { fill, shopStrings } from "@/lib/shop-strings";
import { ChatWidget } from "@/components/chat-widget";

type PaymentMethod = "CASH" | "BANK_TRANSFER" | "CHAT";
type Step = "cart" | "checkout" | "success";

interface BankInfo {
  bankName: string | null;
  bankAccountNumber: string | null;
  bankAccountName: string | null;
  bankBic: string | null;
}

function Thumb({ imageId, size = 72 }: { imageId: string | null; size?: number }) {
  return (
    <div className="relative shrink-0 overflow-hidden rounded-2xl bg-lp-surface ring-1 ring-lp-line" style={{ width: size, height: size }}>
      {imageId ? (
        <Image src={`/api/product-image/${imageId}`} alt="" fill sizes={`${size}px`} className="object-cover" />
      ) : (
        <ShoppingBag className="absolute inset-0 m-auto h-5 w-5 text-lp-gold/60" />
      )}
    </div>
  );
}

function CopyRow({ label, value, copyLabel, copiedLabel }: { label: string; value: string; copyLabel: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center justify-between gap-3 py-2">
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wider text-lp-muted">{label}</p>
        <p className="truncate font-semibold text-lp-ink">{value}</p>
      </div>
      <button
        type="button"
        onClick={() => {
          navigator.clipboard.writeText(value).catch(() => {});
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        className="flex shrink-0 items-center gap-1 rounded-full border border-lp-line px-3 py-1.5 text-xs font-medium text-lp-ink hover:border-lp-gold"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-lp-accent" /> : <Copy className="h-3.5 w-3.5" />}
        {copied ? copiedLabel : copyLabel}
      </button>
    </div>
  );
}

/** The shop's floating bag button, its slide-in cart and checkout, and the
 * "added to bag" toast. Painted with the salon's lp-* palette, so it must sit
 * inside the shop's themed wrapper. */
export function ProductCartWidget({
  businessId,
  businessSlug,
  businessName,
  locale,
  raised = false,
}: {
  businessId: string;
  businessSlug: string;
  businessName: string;
  locale: string;
  /** Lift the bag button on phones, above a page's own bottom bar. */
  raised?: boolean;
}) {
  const { status } = useSession();
  const S = shopStrings(locale);
  const pathname = usePathname();
  const cart = useProductCart(businessSlug);

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("cart");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("CASH");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bankInfo, setBankInfo] = useState<BankInfo | null>(null);
  const [placed, setPlaced] = useState<{ items: CartItem[]; totalCents: number; currency: string } | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [startingChat, setStartingChat] = useState(false);
  const [toast, setToast] = useState<{ name: string; imageId: string | null; key: number } | null>(null);
  const [bump, setBump] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currency = cart.items[0]?.currency ?? "VND";

  function openDrawer() {
    setStep("cart");
    setError(null);
    setOpen(true);
  }

  useEffect(() => {
    function onAdded(e: Event) {
      const d = (e as CustomEvent<{ businessSlug: string; name: string; imageId: string | null }>).detail;
      if (d?.businessSlug !== businessSlug) return;
      setToast({ name: d.name, imageId: d.imageId, key: Date.now() });
      setBump(true);
      setTimeout(() => setBump(false), 450);
      if (toastTimer.current) clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => setToast(null), 3200);
    }
    function onOpen(e: Event) {
      if ((e as CustomEvent<{ businessSlug: string }>).detail?.businessSlug !== businessSlug) return;
      setToast(null);
      openDrawer();
    }
    window.addEventListener("varaaai-cart-added", onAdded);
    window.addEventListener("varaaai-cart-open", onOpen);
    return () => {
      window.removeEventListener("varaaai-cart-added", onAdded);
      window.removeEventListener("varaaai-cart-open", onOpen);
    };
  }, [businessSlug]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  async function placeOrder() {
    setSaving(true);
    setError(null);
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        businessId,
        items: cart.items.map((i) => ({ productId: i.productId, qty: i.qty })),
        paymentMethod,
        customerNote: note || undefined,
      }),
    }).catch(() => null);
    setSaving(false);
    const data = await res?.json().catch(() => null);
    if (!res?.ok) {
      setError(
        data?.error === "NO_BANK_INFO" ? S.errBank : data?.error === "PRODUCT_UNAVAILABLE" ? S.errUnavailable : S.errGeneric
      );
      return;
    }
    setBankInfo(data.bankInfo ?? null);
    setPlaced({ items: cart.items, totalCents: cart.totalCents, currency });
    cart.clear();
    setNote("");
    setStep("success");
  }

  async function startChat() {
    setStartingChat(true);
    const res = await fetch("/api/chat/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ businessSlug }),
    });
    setStartingChat(false);
    if (res.ok) {
      const data = await res.json();
      setConversationId(data.conversationId);
    }
  }

  const steps: [Step, string][] = [
    ["cart", S.stepCart],
    ["checkout", S.stepCheckout],
    ["success", S.stepDone],
  ];
  const stepIndex = steps.findIndex(([k]) => k === step);
  const payments: [PaymentMethod, typeof Banknote, string[]][] = [
    ["CASH", Banknote, S.payCash],
    ["BANK_TRANSFER", Landmark, S.payBank],
    ["CHAT", MessageCircle, S.payChat],
  ];

  return (
    <>
      {cart.totalQty > 0 && !open && (
        <button
          onClick={openDrawer}
          className={`fixed right-4 z-40 flex h-14 items-center gap-3 rounded-full bg-lp-deep pl-4 pr-5 text-lp-deep-ink shadow-[0_18px_40px_-12px_rgba(0,0,0,0.55)] ring-1 ring-lp-gold/30 transition-transform hover:-translate-y-0.5 sm:bottom-6 sm:right-6 ${
            raised ? "bottom-24" : "bottom-5"
          } ${bump ? "scale-110" : "scale-100"} duration-300`}
          aria-label={S.cart}
        >
          <span className="relative">
            <ShoppingBag className="h-6 w-6" />
            <span className="absolute -right-2.5 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-lp-accent px-1 text-[11px] font-bold text-lp-accent-ink ring-2 ring-lp-deep">
              {cart.totalQty}
            </span>
          </span>
          <span className="text-sm font-semibold">{formatMoney(cart.totalCents, currency, locale)}</span>
        </button>
      )}

      {toast && !open && (
        <div
          key={toast.key}
          className={`fixed inset-x-4 z-50 mx-auto flex max-w-sm items-center gap-3 rounded-2xl bg-lp-card p-3 shadow-[0_24px_50px_-16px_rgba(0,0,0,0.45)] ring-1 ring-lp-line animate-slide-up sm:inset-x-auto sm:right-6 sm:top-24 ${
            raised ? "bottom-44" : "bottom-24"
          } sm:bottom-auto`}
          role="status"
        >
          <Thumb imageId={toast.imageId} size={52} />
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-lp-accent">
              <Check className="h-3.5 w-3.5" />
              {S.addedToCart}
            </p>
            <p className="truncate text-sm font-medium text-lp-ink">{toast.name}</p>
          </div>
          <button onClick={openDrawer} className="shrink-0 rounded-full bg-lp-ink px-4 py-2 text-xs font-semibold text-lp-bg">
            {S.viewCart}
          </button>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <button className="absolute inset-0 bg-black/45 backdrop-blur-[2px] animate-fade-in" onClick={() => setOpen(false)} aria-label={S.close} />
          <aside className="relative flex h-full w-full max-w-md flex-col bg-lp-bg text-lp-ink shadow-2xl animate-in slide-in-from-right duration-300">
            <header className="border-b border-lp-line px-5 pb-4 pt-5">
              <div className="flex items-center justify-between">
                <h3 className="flex items-baseline gap-2 font-serif text-2xl font-medium">
                  {S.cart}
                  {step !== "success" && cart.totalQty > 0 && (
                    <span className="font-sans text-sm font-normal text-lp-muted">{fill(S.items, { n: cart.totalQty })}</span>
                  )}
                </h3>
                <button
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-lp-line text-lp-muted hover:text-lp-ink"
                  aria-label={S.close}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {(cart.items.length > 0 || step === "success") && (
                <ol className="mt-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider">
                  {steps.map(([key, label], i) => (
                    <li key={key} className="flex flex-1 items-center gap-2">
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] ${
                          i < stepIndex || step === "success"
                            ? "bg-lp-accent text-lp-accent-ink"
                            : i === stepIndex
                              ? "bg-lp-ink text-lp-bg"
                              : "bg-lp-surface text-lp-muted ring-1 ring-lp-line"
                        }`}
                      >
                        {i < stepIndex || step === "success" ? <Check className="h-3.5 w-3.5" /> : i + 1}
                      </span>
                      <span className={i <= stepIndex ? "text-lp-ink" : "text-lp-muted"}>{label}</span>
                      {i < steps.length - 1 && <span className="h-px flex-1 bg-lp-line" />}
                    </li>
                  ))}
                </ol>
              )}
            </header>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              {step === "cart" &&
                (cart.items.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <span className="flex h-20 w-20 items-center justify-center rounded-full bg-lp-surface ring-1 ring-lp-line">
                      <ShoppingBag className="h-8 w-8 text-lp-gold" strokeWidth={1.4} />
                    </span>
                    <p className="mt-5 font-serif text-xl">{S.cartEmpty}</p>
                    <p className="mt-2 text-sm text-lp-muted">{S.cartEmptyHint}</p>
                    <Link
                      href={`/b/${businessSlug}/products`}
                      onClick={() => setOpen(false)}
                      className="mt-6 rounded-full bg-lp-accent px-6 py-3 text-sm font-semibold text-lp-accent-ink"
                    >
                      {S.browse}
                    </Link>
                  </div>
                ) : (
                  <ul className="divide-y divide-lp-line">
                    {cart.items.map((item) => (
                      <li key={item.productId} className="flex gap-4 py-4 first:pt-0">
                        <Thumb imageId={item.imageId} />
                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex items-start justify-between gap-3">
                            <p className="line-clamp-2 font-serif text-[15px] leading-snug">{item.name}</p>
                            <p className="shrink-0 text-sm font-semibold">{formatMoney(item.priceCents * item.qty, item.currency, locale)}</p>
                          </div>
                          <p className="mt-0.5 text-xs text-lp-muted">{formatMoney(item.priceCents, item.currency, locale)}</p>
                          <div className="mt-auto flex items-center justify-between pt-2">
                            <div className="flex items-center rounded-full ring-1 ring-lp-line">
                              <button
                                onClick={() => cart.setQty(item.productId, item.qty - 1)}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-lp-muted hover:text-lp-ink"
                                aria-label="−"
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="w-6 text-center text-sm font-semibold">{item.qty}</span>
                              <button
                                onClick={() => cart.setQty(item.productId, Math.min(99, item.qty + 1))}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-lp-muted hover:text-lp-ink"
                                aria-label="+"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <button
                              onClick={() => cart.removeItem(item.productId)}
                              className="text-xs font-medium text-lp-muted underline-offset-4 hover:text-lp-accent hover:underline"
                            >
                              {S.remove}
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ))}

              {step === "checkout" && (
                <div className="space-y-6">
                  <div className="flex items-start gap-3 rounded-2xl bg-lp-surface p-4 text-sm ring-1 ring-lp-line">
                    <Store className="mt-0.5 h-5 w-5 shrink-0 text-lp-gold" />
                    <p className="text-lp-muted">{fill(S.pickupNote, { name: businessName })}</p>
                  </div>
                  <div>
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-lp-gold">{S.payTitle}</p>
                    <div className="space-y-2.5">
                      {payments.map(([m, Icon, [title, hint]]) => (
                        <label
                          key={m}
                          className={`flex cursor-pointer items-center gap-3 rounded-2xl p-4 transition-all ${
                            paymentMethod === m ? "bg-lp-card ring-2 ring-lp-accent" : "bg-lp-card ring-1 ring-lp-line hover:ring-lp-gold/60"
                          }`}
                        >
                          <input type="radio" name="paymentMethod" className="sr-only" checked={paymentMethod === m} onChange={() => setPaymentMethod(m)} />
                          <span
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                              paymentMethod === m ? "bg-lp-accent text-lp-accent-ink" : "bg-lp-surface text-lp-gold"
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-semibold">{title}</span>
                            <span className="block text-xs text-lp-muted">{hint}</span>
                          </span>
                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                              paymentMethod === m ? "bg-lp-accent text-lp-accent-ink" : "ring-1 ring-lp-line"
                            }`}
                          >
                            {paymentMethod === m && <Check className="h-3 w-3" />}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="cart-note" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.2em] text-lp-gold">
                      {S.note}
                    </label>
                    <textarea
                      id="cart-note"
                      rows={3}
                      maxLength={1000}
                      value={note}
                      placeholder={S.notePh}
                      onChange={(e) => setNote(e.target.value)}
                      className="w-full rounded-2xl border-0 bg-lp-card p-4 text-sm text-lp-ink ring-1 ring-lp-line placeholder:text-lp-muted/70 focus:outline-none focus:ring-2 focus:ring-lp-accent/60"
                    />
                  </div>
                  <div>
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-lp-gold">{S.summary}</p>
                    <ul className="space-y-2 text-sm">
                      {cart.items.map((i) => (
                        <li key={i.productId} className="flex justify-between gap-3">
                          <span className="min-w-0 truncate text-lp-muted">
                            {i.qty} × {i.name}
                          </span>
                          <span className="shrink-0">{formatMoney(i.priceCents * i.qty, i.currency, locale)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {error && <p className="rounded-2xl bg-red-50 p-3 text-sm text-red-700 ring-1 ring-red-100">{error}</p>}
                </div>
              )}

              {step === "success" && placed && (
                <div className="space-y-6">
                  <div className="pt-4 text-center">
                    <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-lp-accent text-lp-accent-ink shadow-[0_16px_40px_-14px_rgb(var(--lp-accent)/0.9)] animate-in zoom-in duration-500">
                      <Check className="h-9 w-9" strokeWidth={2.5} />
                    </span>
                    <h4 className="mt-6 font-serif text-3xl">{S.successTitle}</h4>
                    <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-lp-muted">{S.successText}</p>
                  </div>

                  {paymentMethod === "BANK_TRANSFER" && bankInfo && (
                    <div className="rounded-2xl bg-lp-card p-4 ring-1 ring-lp-line">
                      <p className="mb-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-lp-gold">
                        <Landmark className="h-4 w-4" />
                        {S.bankTitle}
                      </p>
                      <div className="divide-y divide-lp-line">
                        {bankInfo.bankName && <CopyRow label={S.bankName} value={bankInfo.bankName} copyLabel={S.copy} copiedLabel={S.copied} />}
                        {bankInfo.bankAccountNumber && (
                          <CopyRow label={S.bankAccount} value={bankInfo.bankAccountNumber} copyLabel={S.copy} copiedLabel={S.copied} />
                        )}
                        {bankInfo.bankAccountName && (
                          <CopyRow label={S.bankHolder} value={bankInfo.bankAccountName} copyLabel={S.copy} copiedLabel={S.copied} />
                        )}
                        {bankInfo.bankBic && <CopyRow label="BIC/SWIFT" value={bankInfo.bankBic} copyLabel={S.copy} copiedLabel={S.copied} />}
                        <CopyRow
                          label={S.amount}
                          value={formatMoney(placed.totalCents, placed.currency, locale)}
                          copyLabel={S.copy}
                          copiedLabel={S.copied}
                        />
                      </div>
                    </div>
                  )}

                  <div className="rounded-2xl bg-lp-surface p-4 ring-1 ring-lp-line">
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-lp-gold">{S.summary}</p>
                    <ul className="space-y-3">
                      {placed.items.map((i) => (
                        <li key={i.productId} className="flex items-center gap-3 text-sm">
                          <Thumb imageId={i.imageId} size={44} />
                          <span className="min-w-0 flex-1 truncate">
                            {i.qty} × {i.name}
                          </span>
                          <span className="shrink-0 font-medium">{formatMoney(i.priceCents * i.qty, i.currency, locale)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex justify-between border-t border-lp-line pt-3 font-semibold">
                      <span>{S.total}</span>
                      <span>{formatMoney(placed.totalCents, placed.currency, locale)}</span>
                    </div>
                  </div>

                  {paymentMethod === "CHAT" && (
                    <button
                      onClick={startChat}
                      disabled={startingChat}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-lp-accent py-3.5 text-sm font-semibold text-lp-accent-ink"
                    >
                      {startingChat ? <Loader2 className="h-4 w-4 animate-spin" /> : <MessageCircle className="h-4 w-4" />}
                      {S.chatNow}
                    </button>
                  )}
                </div>
              )}
            </div>

            {step !== "success" && cart.items.length > 0 && (
              <footer className="space-y-3 border-t border-lp-line bg-lp-card px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-lp-muted">{step === "cart" ? S.subtotal : S.total}</span>
                  <span className="font-serif text-2xl font-medium">{formatMoney(cart.totalCents, currency, locale)}</span>
                </div>
                {status !== "authenticated" ? (
                  <Link
                    href={`/auth/sign-in?callbackUrl=${encodeURIComponent(pathname)}`}
                    className="flex w-full items-center justify-center rounded-full bg-lp-accent py-4 text-sm font-semibold text-lp-accent-ink shadow-[0_12px_30px_-12px_rgb(var(--lp-accent)/0.9)]"
                  >
                    {S.signInToOrder}
                  </Link>
                ) : step === "cart" ? (
                  <button
                    onClick={() => setStep("checkout")}
                    className="flex w-full items-center justify-center rounded-full bg-lp-accent py-4 text-sm font-semibold text-lp-accent-ink shadow-[0_12px_30px_-12px_rgb(var(--lp-accent)/0.9)] transition hover:brightness-110"
                  >
                    {S.checkout}
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setStep("cart")}
                      className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border border-lp-line text-lp-ink"
                      aria-label={S.back}
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={placeOrder}
                      disabled={saving}
                      className="flex flex-1 items-center justify-center gap-2 rounded-full bg-lp-accent py-4 text-sm font-semibold text-lp-accent-ink shadow-[0_12px_30px_-12px_rgb(var(--lp-accent)/0.9)] transition hover:brightness-110 disabled:opacity-70"
                    >
                      {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                      {S.placeOrder}
                    </button>
                  </div>
                )}
              </footer>
            )}
            {step === "success" && (
              <footer className="border-t border-lp-line px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4">
                <button
                  onClick={() => {
                    setOpen(false);
                    setStep("cart");
                  }}
                  className="w-full rounded-full border border-lp-ink/20 py-3.5 text-sm font-semibold text-lp-ink hover:bg-lp-surface"
                >
                  {S.continueShopping}
                </button>
              </footer>
            )}
          </aside>

          {conversationId && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
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
        </div>
      )}
    </>
  );
}
