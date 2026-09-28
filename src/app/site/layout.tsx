import { Be_Vietnam_Pro, Playfair_Display } from "next/font/google";
import "../globals.css";

const sans = Be_Vietnam_Pro({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

// A distinct display serif for headings only, so a salon's own site reads as
// a dedicated, premium brand page rather than "another page on VaraaAi" —
// deliberately not used anywhere else on the platform.
const serif = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

// Deliberately outside [locale]: a salon's public site is its own branded
// page, not part of the VaraaAi platform chrome — same reasoning as /embed,
// which is why locale here comes from a `?locale=` param (see site-content.ts)
// instead of a URL segment, and there's no platform Navbar/Footer.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${sans.variable} ${serif.variable}`}>
      <body className="bg-white font-sans text-ink-900">{children}</body>
    </html>
  );
}
