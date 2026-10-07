import { NextResponse } from "next/server";
import { findInvoiceByToken, renderInvoicePdf, toInvoiceData } from "@/lib/invoices";

/** Public — gated only by the unguessable token, same as the page itself. */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const found = await findInvoiceByToken(token);
  if (!found) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  const { searchParams } = new URL(req.url);
  const locale = searchParams.get("locale") === "en" ? "en" : "vi";
  const pdf = await renderInvoicePdf(toInvoiceData(found.invoice, found.customer, locale));

  return new NextResponse(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${found.invoice.number}.pdf"`,
    },
  });
}
