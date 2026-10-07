import { notFound } from "next/navigation";
import { findInvoiceByToken } from "@/lib/invoices";
import { formatMoney } from "@/lib/money";

const PAYMENT_METHOD_LABEL: Record<string, { vi: string; en: string }> = {
  CASH: { vi: "Tiền mặt", en: "Cash" },
  BANK_TRANSFER: { vi: "Chuyển khoản ngân hàng", en: "Bank transfer" },
  GIFT_CARD: { vi: "Thẻ quà tặng", en: "Gift card" },
};

interface InvoiceLineView {
  name: string;
  qty: number;
  unitPriceCents: number;
  totalCents: number;
}

/** Public — the token alone is the access key, same trust model as a
 * loyalty/gift-card QR. This is what the PDF's QR code points to, so a
 * customer who lost the paper receipt can always come back and re-download
 * it (see the PDF endpoint at /api/invoices/[token]/pdf). */
export default async function PublicInvoicePage({
  params,
}: {
  params: Promise<{ locale: string; token: string }>;
}) {
  const { locale, token } = await params;
  const vi = locale !== "en";
  const found = await findInvoiceByToken(token);
  if (!found) notFound();
  const { invoice, customer } = found;
  const lines = invoice.lines as unknown as InvoiceLineView[];

  return (
    <div className="container max-w-2xl space-y-6 py-10">
      <div className="card space-y-5 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold text-ink-900">{invoice.companyName ?? (vi ? "Hóa đơn" : "Invoice")}</h1>
            {invoice.companyAddress && <p className="text-xs text-ink-400">{invoice.companyAddress}</p>}
            {invoice.companyTaxId && (
              <p className="text-xs text-ink-400">
                {vi ? "MST/ID DN" : "Tax ID"}: {invoice.companyTaxId}
              </p>
            )}
          </div>
          <div className="text-right text-xs text-ink-400">
            <p className="font-semibold text-ink-900">{invoice.number}</p>
            <p>{invoice.createdAt.toLocaleString(vi ? "vi-VN" : "en-US")}</p>
          </div>
        </div>

        {customer && (
          <div className="rounded-lg bg-mist-50 p-3 text-sm">
            <p className="font-medium text-ink-900">{customer.name}</p>
            {customer.phone && <p className="text-ink-400">{customer.phone}</p>}
            {customer.email && <p className="text-ink-400">{customer.email}</p>}
          </div>
        )}

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink-100 text-left text-xs uppercase text-ink-400">
              <th className="py-2">{vi ? "Dịch vụ" : "Service"}</th>
              <th className="py-2 text-right">{vi ? "SL" : "Qty"}</th>
              <th className="py-2 text-right">{vi ? "Đơn giá" : "Unit"}</th>
              <th className="py-2 text-right">{vi ? "Thành tiền" : "Total"}</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((l, i) => (
              <tr key={i} className="border-b border-ink-50">
                <td className="py-2">{l.name}</td>
                <td className="py-2 text-right">{l.qty}</td>
                <td className="py-2 text-right">{formatMoney(l.unitPriceCents, invoice.currency, locale)}</td>
                <td className="py-2 text-right">{formatMoney(l.totalCents, invoice.currency, locale)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="ml-auto max-w-[220px] space-y-1 text-sm">
          <div className="flex justify-between text-ink-400">
            <span>{vi ? "Tạm tính" : "Subtotal"}</span>
            <span>{formatMoney(invoice.subtotalCents, invoice.currency, locale)}</span>
          </div>
          <div className="flex justify-between text-ink-400">
            <span>VAT ({invoice.vatPercent}%)</span>
            <span>{formatMoney(invoice.vatCents, invoice.currency, locale)}</span>
          </div>
          <div className="flex justify-between text-base font-bold text-ink-900">
            <span>{vi ? "Tổng cộng" : "Total"}</span>
            <span>{formatMoney(invoice.totalCents, invoice.currency, locale)}</span>
          </div>
        </div>

        <div className="space-y-1 text-sm text-ink-700">
          <p>
            {vi ? "Hình thức thanh toán" : "Payment method"}:{" "}
            <b>{PAYMENT_METHOD_LABEL[invoice.paymentMethod][vi ? "vi" : "en"]}</b>
          </p>
          {invoice.note && <p className="text-ink-400">{invoice.note}</p>}
        </div>

        <a
          href={`/api/invoices/${token}/pdf?locale=${vi ? "vi" : "en"}`}
          target="_blank"
          rel="noreferrer"
          className="btn-primary inline-flex !px-4 !py-2 text-sm"
        >
          {vi ? "Tải xuống PDF" : "Download PDF"}
        </a>
      </div>
    </div>
  );
}
