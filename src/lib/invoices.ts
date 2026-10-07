import { randomBytes } from "crypto";
import path from "path";
import QRCode from "qrcode";
import PDFDocument from "pdfkit";
import { formatMoney } from "@/lib/money";
import { prisma } from "@/lib/prisma";
import type { Invoice } from "@prisma/client";

export function randomInvoiceToken() {
  return randomBytes(16).toString("hex");
}

/** A human-facing invoice number — not a strict sequence (two invoices can
 * theoretically collide on the same millisecond + random suffix), which is
 * fine for a printed receipt: it only needs to look right and be easy to
 * read back over the phone, not reconcile against an accounting ledger. */
export function newInvoiceNumber(d = new Date()) {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  const suffix = randomBytes(2).toString("hex").toUpperCase();
  return `INV-${y}${m}${day}-${suffix}`;
}

export function invoicePublicUrl(token: string) {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://varaaai.com";
  return `${site}/invoice/${token}`;
}

export function invoiceQrPng(token: string) {
  return QRCode.toBuffer(invoicePublicUrl(token), { type: "png", width: 220, margin: 1 });
}

export interface InvoiceLine {
  name: string;
  qty: number;
  unitPriceCents: number;
  totalCents: number;
}

export interface InvoiceData {
  number: string;
  token: string;
  createdAt: Date;
  currency: string;
  lines: InvoiceLine[];
  subtotalCents: number;
  vatPercent: number;
  vatCents: number;
  totalCents: number;
  paymentMethod: "CASH" | "BANK_TRANSFER" | "GIFT_CARD";
  giftCardCode: string | null;
  note: string | null;
  companyName: string | null;
  companyAddress: string | null;
  companyTaxId: string | null;
  customerName: string;
  customerEmail: string | null;
  customerPhone: string | null;
  locale: string;
}

/** The token alone gates access, same trust model as the loyalty/gift-card
 * QR codes — anyone with the link (or who scans the printed QR) can view and
 * download that one invoice, nothing else. */
export async function findInvoiceByToken(token: string) {
  const invoice = await prisma.invoice.findUnique({ where: { token } });
  if (!invoice) return null;
  const customer = await prisma.user.findUnique({
    where: { id: invoice.customerId },
    select: { name: true, email: true, phone: true },
  });
  return { invoice, customer };
}

export function toInvoiceData(
  invoice: Invoice,
  customer: { name: string; email: string; phone: string | null } | null,
  locale: string
): InvoiceData {
  return {
    number: invoice.number,
    token: invoice.token,
    createdAt: invoice.createdAt,
    currency: invoice.currency,
    lines: invoice.lines as unknown as InvoiceLine[],
    subtotalCents: invoice.subtotalCents,
    vatPercent: invoice.vatPercent,
    vatCents: invoice.vatCents,
    totalCents: invoice.totalCents,
    paymentMethod: invoice.paymentMethod,
    giftCardCode: invoice.giftCardCode,
    note: invoice.note,
    companyName: invoice.companyName,
    companyAddress: invoice.companyAddress,
    companyTaxId: invoice.companyTaxId,
    customerName: customer?.name ?? "",
    customerEmail: customer?.email ?? null,
    customerPhone: customer?.phone ?? null,
    locale,
  };
}

const FONT_DIR = path.join(process.cwd(), "src/assets/fonts");

const PAYMENT_METHOD_LABEL: Record<string, { vi: string; en: string }> = {
  CASH: { vi: "Tiền mặt", en: "Cash" },
  BANK_TRANSFER: { vi: "Chuyển khoản ngân hàng", en: "Bank transfer" },
  GIFT_CARD: { vi: "Thẻ quà tặng", en: "Gift card" },
};

/** Renders one invoice as a one-page A4 PDF — service lines, VAT breakdown,
 * payment method and a QR code back to the public /invoice/[token] page so
 * the customer can always re-download it later. Vietnamese text needs a
 * font with full diacritic coverage embedded (pdfkit's built-in fonts only
 * cover WinAnsi), hence the bundled Noto Sans files. */
export async function renderInvoicePdf(invoice: InvoiceData): Promise<Buffer> {
  const vi = invoice.locale === "vi";
  const qrPng = await invoiceQrPng(invoice.token);

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const chunks: Buffer[] = [];
    doc.on("data", (c) => chunks.push(c));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    doc.registerFont("Body", path.join(FONT_DIR, "NotoSans-Regular.ttf"));
    doc.registerFont("Bold", path.join(FONT_DIR, "NotoSans-Bold.ttf"));

    doc.font("Bold").fontSize(20).text(invoice.companyName || (vi ? "Hóa đơn" : "Invoice"));
    doc.font("Body").fontSize(10).fillColor("#555");
    if (invoice.companyAddress) doc.text(invoice.companyAddress);
    if (invoice.companyTaxId) doc.text((vi ? "MST/ID DN: " : "Tax ID: ") + invoice.companyTaxId);
    doc.fillColor("#000");
    doc.moveDown(1.2);

    doc.font("Bold").fontSize(14).text(vi ? "HÓA ĐƠN" : "INVOICE");
    doc.font("Body").fontSize(10).fillColor("#555");
    doc.text(`${vi ? "Số" : "No."}: ${invoice.number}`);
    doc.text(`${vi ? "Ngày" : "Date"}: ${invoice.createdAt.toLocaleString(vi ? "vi-VN" : "en-US")}`);
    doc.fillColor("#000");
    doc.moveDown(0.8);

    doc.font("Bold").fontSize(11).text(vi ? "Khách hàng" : "Customer");
    doc.font("Body").fontSize(10);
    doc.text(invoice.customerName);
    if (invoice.customerPhone) doc.text(invoice.customerPhone);
    if (invoice.customerEmail) doc.text(invoice.customerEmail);
    doc.moveDown(1);

    const tableTop = doc.y;
    const col = { name: 50, qty: 320, unit: 380, total: 470 };
    doc.font("Bold").fontSize(10);
    doc.text(vi ? "Dịch vụ" : "Service", col.name, tableTop);
    doc.text(vi ? "SL" : "Qty", col.qty, tableTop);
    doc.text(vi ? "Đơn giá" : "Unit", col.unit, tableTop);
    doc.text(vi ? "Thành tiền" : "Total", col.total, tableTop);
    doc.moveTo(50, tableTop + 15).lineTo(545, tableTop + 15).strokeColor("#ddd").stroke();

    let y = tableTop + 22;
    doc.font("Body").fontSize(10);
    for (const line of invoice.lines) {
      doc.text(line.name, col.name, y, { width: 260 });
      doc.text(String(line.qty), col.qty, y);
      doc.text(formatMoney(line.unitPriceCents, invoice.currency, invoice.locale), col.unit, y);
      doc.text(formatMoney(line.totalCents, invoice.currency, invoice.locale), col.total, y);
      y += 20;
    }
    doc.moveTo(50, y + 2).lineTo(545, y + 2).strokeColor("#ddd").stroke();
    y += 14;

    doc.font("Body").text(vi ? "Tạm tính" : "Subtotal", col.unit, y);
    doc.text(formatMoney(invoice.subtotalCents, invoice.currency, invoice.locale), col.total, y);
    y += 16;
    doc.text(`VAT (${invoice.vatPercent}%)`, col.unit, y);
    doc.text(formatMoney(invoice.vatCents, invoice.currency, invoice.locale), col.total, y);
    y += 16;
    doc.font("Bold").fontSize(12);
    doc.text(vi ? "Tổng cộng" : "Total", col.unit, y);
    doc.text(formatMoney(invoice.totalCents, invoice.currency, invoice.locale), col.total, y);
    y += 26;

    doc.font("Body").fontSize(10);
    doc.text(
      `${vi ? "Hình thức thanh toán" : "Payment method"}: ${PAYMENT_METHOD_LABEL[invoice.paymentMethod][vi ? "vi" : "en"]}`,
      50,
      y
    );
    if (invoice.paymentMethod === "GIFT_CARD" && invoice.giftCardCode) {
      y += 14;
      doc.text(`${vi ? "Mã thẻ quà tặng" : "Gift card code"}: ${invoice.giftCardCode}`, 50, y);
    }
    if (invoice.note) {
      y += 14;
      doc.text(`${vi ? "Ghi chú" : "Note"}: ${invoice.note}`, 50, y, { width: 350 });
    }

    doc.image(qrPng, 465, tableTop + 60, { width: 80 });
    doc.fontSize(7).fillColor("#888").text(
      vi ? "Quét để xem lại hóa đơn" : "Scan to view this invoice",
      455,
      tableTop + 142,
      { width: 100, align: "center" }
    );

    doc.end();
  });
}
