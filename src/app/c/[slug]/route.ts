import { shortLinkRedirect } from "@/lib/short-link/redirect";

/** Short link to a chain's page of all branches: varaaai.com/c/<slug>. */
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return shortLinkRedirect(slug, "chain");
}
