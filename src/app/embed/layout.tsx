import Script from "next/script";
import { Be_Vietnam_Pro } from "next/font/google";
import "../globals.css";

const sans = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

// Deliberately outside [locale]: businesses embed these pages via <iframe> on
// their own websites, so there's no navbar/footer chrome here — just the
// booking UI itself, sized to the content so iframe-resizer can size the
// parent's <iframe> to match.
export default function EmbedLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={sans.variable}>
      <body className="bg-white font-sans">
        {children}
        {/* Reports this page's height to the parent's iframeResize() call
            (see the embed code generated in the business dashboard), so the
            host site's <iframe> grows/shrinks instead of showing scrollbars. */}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/2.8.3/iframeResizer.contentWindow.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
