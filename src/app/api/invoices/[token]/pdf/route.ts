import { NextResponse } from "next/server";
import { findInvoiceByToken, renderInvoicePdf, toInvoiceData, type InvoiceLocale } from "@/lib/invoices";

const SUPPORTED_LOCALES: InvoiceLocale[] = ["vi", "en", "fi", "pl", "de", "km", "th"];

/** Public — gated only by the unguessable token, same as the page itself.
 * `?locale=` comes from the page that links here (this route sits under
 * /api, which the i18n middleware skips, so it has no locale of its own). */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const found = await findInvoiceByToken(token);
  if (!found) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  const { searchParams } = new URL(req.url);
  const localeParam = searchParams.get("locale");
  const locale = SUPPORTED_LOCALES.includes(localeParam as InvoiceLocale)
    ? (localeParam as InvoiceLocale)
    : "vi";

  try {
    const pdf = await renderInvoicePdf(toInvoiceData(found.invoice, found.customer, locale));
    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${found.invoice.number}.pdf"`,
      },
    });
  } catch (err) {
    console.error("[GET /api/invoices/[token]/pdf]", err);
    return NextResponse.json({ error: "PDF_RENDER_FAILED" }, { status: 500 });
  }
}
