"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { ShoppingCart, X, Loader2, Plus, Minus, Trash2, MessageCircle } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useProductCart } from "@/lib/product-cart";
import { formatMoney } from "@/lib/money";
import { ChatWidget } from "@/components/chat-widget";

type PaymentMethod = "CASH" | "BANK_TRANSFER" | "CHAT";

interface BankInfo {
  bankName: string | null;
  bankAccountNumber: string | null;
  bankAccountName: string | null;
  bankBic: string | null;
}

export function ProductCartWidget({
  businessId,
  businessSlug,
  businessName,
  locale,
}: {
  businessId: string;
  businessSlug: string;
  businessName: string;
  locale: string;
}) {
  const { status } = useSession();
  const t = useTranslations("business.productsPage");
  const tPay = useTranslations("payment");
  const tBooking = useTranslations("booking");
  const cart = useProductCart(businessSlug);

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"cart" | "checkout" | "success">("cart");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("CASH");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bankInfo, setBankInfo] = useState<BankInfo | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [startingChat, setStartingChat] = useState(false);

  function openDrawer() {
    setStep(cart.items.length > 0 ? "cart" : "cart");
    setError(null);
    setOpen(true);
  }

  function closeDrawer() {
    setOpen(false);
  }

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
    });
    setSaving(false);
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      setError(
        data?.error === "NO_BANK_INFO"
          ? tPay("bankTransferNotice")
          : data?.error === "PRODUCT_UNAVAILABLE"
            ? t("empty")
            : t("signInToOrder")
      );
      return;
    }
    setBankInfo(data.bankInfo ?? null);
    cart.clear();
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

  return (
    <>
      <button
        onClick={openDrawer}
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary-500 text-white shadow-lg hover:bg-primary-600"
        aria-label={t("cart")}
      >
        <ShoppingCart className="h-6 w-6" />
        {cart.totalQty > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-berry-500 px-1 text-[11px] font-bold text-white">
            {cart.totalQty}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-ink-900/40 p-0 sm:items-center sm:p-4">
          <div className="card flex h-full w-full max-w-sm flex-col rounded-none sm:h-auto sm:max-h-[85vh] sm:rounded-2xl">
            <div className="flex items-center justify-between border-b border-ink-100 p-4">
              <h3 className="font-bold text-ink-900">{t("cart")}</h3>
              <button onClick={closeDrawer} className="text-ink-400" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {step === "cart" && (
                <>
                  {cart.items.length === 0 ? (
                    <p className="text-sm text-ink-400">{t("cartEmpty")}</p>
                  ) : (
                    <div className="space-y-3">
                      {cart.items.map((item) => (
                        <div key={item.productId} className="flex items-center gap-3">
                          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-mist-100">
                            {item.imageId && (
                              <Image
                                src={`/api/product-image/${item.imageId}`}
                                alt=""
                                width={56}
                                height={56}
                                className="h-full w-full object-cover"
                              />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-ink-900">{item.name}</p>
                            <p className="text-xs text-ink-400">
                              {formatMoney(item.priceCents, item.currency, locale)}
                            </p>
                            <div className="mt-1 flex items-center gap-2">
                              <button
                                onClick={() => cart.setQty(item.productId, item.qty - 1)}
                                className="btn-ghost !h-6 !w-6 !p-0"
                                aria-label="-"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-5 text-center text-sm">{item.qty}</span>
                              <button
                                onClick={() => cart.setQty(item.productId, item.qty + 1)}
                                className="btn-ghost !h-6 !w-6 !p-0"
                                aria-label="+"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                              <button
                                onClick={() => cart.removeItem(item.productId)}
                                className="btn-ghost !h-6 !w-6 !p-0 text-berry-500"
                                aria-label={t("remove")}
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                          <span className="text-sm font-semibold text-ink-900">
                            {formatMoney(item.priceCents * item.qty, item.currency, locale)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {step === "checkout" && (
                <div className="space-y-4">
                  <div>
                    <p className="label">{t("paymentMethodLabel")}</p>
                    <div className="space-y-2">
                      {(["CASH", "BANK_TRANSFER", "CHAT"] as PaymentMethod[]).map((m) => (
                        <label
                          key={m}
                          className="flex cursor-pointer items-center gap-2 rounded-xl border border-ink-100 p-3 text-sm"
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={paymentMethod === m}
                            onChange={() => setPaymentMethod(m)}
                          />
                          {m === "CASH" ? tPay("cash") : m === "BANK_TRANSFER" ? tPay("bankTransfer") : tPay("chat")}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="label">{tBooking("note")}</label>
                    <textarea
                      className="input"
                      rows={2}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </div>
                  {error && <p className="text-sm text-berry-500">{error}</p>}
                </div>
              )}

              {step === "success" && (
                <div className="space-y-3 text-center">
                  <p className="font-semibold text-ink-900">{t("orderSuccess")}</p>
                  <p className="text-sm text-ink-400">{t("orderSuccessHint")}</p>
                  {paymentMethod === "BANK_TRANSFER" && bankInfo && (
                    <div className="space-y-1 rounded-xl border border-primary-100 bg-primary-50 p-3 text-left text-xs text-ink-900">
                      {bankInfo.bankName && (
                        <p>
                          <span className="text-ink-400">{locale === "vi" ? "Ngân hàng: " : "Bank: "}</span>
                          {bankInfo.bankName}
                        </p>
                      )}
                      {bankInfo.bankAccountNumber && (
                        <p>
                          <span className="text-ink-400">
                            {locale === "vi" ? "Số tài khoản: " : "Account number: "}
                          </span>
                          {bankInfo.bankAccountNumber}
                        </p>
                      )}
                      {bankInfo.bankAccountName && (
                        <p>
                          <span className="text-ink-400">
                            {locale === "vi" ? "Chủ tài khoản: " : "Account holder: "}
                          </span>
                          {bankInfo.bankAccountName}
                        </p>
                      )}
                      {bankInfo.bankBic && (
                        <p>
                          <span className="text-ink-400">BIC/SWIFT: </span>
                          {bankInfo.bankBic}
                        </p>
                      )}
                    </div>
                  )}
                  {paymentMethod === "CHAT" && !conversationId && (
                    <button onClick={startChat} disabled={startingChat} className="btn-outline w-full">
                      {startingChat ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <MessageCircle className="h-4 w-4" />
                      )}
                      {tPay("chat")}
                    </button>
                  )}
                </div>
              )}
            </div>

            {step !== "success" && (
              <div className="space-y-3 border-t border-ink-100 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink-400">{t("total")}</span>
                  <span className="font-bold text-ink-900">
                    {cart.items[0]
                      ? formatMoney(cart.totalCents, cart.items[0].currency, locale)
                      : formatMoney(0, "VND", locale)}
                  </span>
                </div>
                {status !== "authenticated" ? (
                  <Link
                    href={`/auth/sign-in?callbackUrl=/b/${businessSlug}/products`}
                    className="btn-primary w-full"
                  >
                    {t("signInToOrder")}
                  </Link>
                ) : step === "cart" ? (
                  <button
                    onClick={() => setStep("checkout")}
                    disabled={cart.items.length === 0}
                    className="btn-primary w-full"
                  >
                    {t("checkout")}
                  </button>
                ) : (
                  <button onClick={placeOrder} disabled={saving} className="btn-primary w-full">
                    {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                    {t("placeOrder")}
                  </button>
                )}
              </div>
            )}
            {step === "success" && (
              <div className="border-t border-ink-100 p-4">
                <button onClick={closeDrawer} className="btn-outline w-full">
                  {t("continueShopping")}
                </button>
              </div>
            )}
          </div>

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
        </div>
      )}
    </>
  );
}
