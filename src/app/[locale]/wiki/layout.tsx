import { Playfair_Display } from "next/font/google";

// The serif of the Academy's video title cards, for the wiki's headings.
const serif = Playfair_Display({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["600", "700", "800"],
  variable: "--font-serif",
  display: "swap",
});

/** Every Wiki page: reading pages with a serif for headings. */
export default function WikiLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${serif.variable} bg-[#faf9fc] text-ink-700`}>{children}</div>;
}
