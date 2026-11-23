/** Path of a salon's short booking link, e.g. "/s/moja-beauty" ("/c/…" for a
 * chain's page of all branches). Served by src/app/s and src/app/c. */
export function shortLinkPath(slug: string, kind: "salon" | "chain") {
  return `/${kind === "chain" ? "c" : "s"}/${slug}`;
}
