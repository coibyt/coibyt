import { shortLinkRedirect } from "@/lib/short-link/redirect";

/** Short booking link a salon sends in a message: varaaai.com/s/<slug>. */
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return shortLinkRedirect(slug, "salon");
}
