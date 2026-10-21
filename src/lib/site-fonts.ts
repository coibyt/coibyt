import { Playfair_Display } from "next/font/google";

// A distinct display serif for headings only, so a salon's own pages (its
// website under /site and its product shop) read as a dedicated, premium
// brand page rather than "another page on VaraaAi". Apply `.variable` on a
// wrapper to make Tailwind's `font-serif` use it there.
export const siteSerif = Playfair_Display({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});
