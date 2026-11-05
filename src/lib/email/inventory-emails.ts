import { SITE_URL, button, emailLayout, esc, greeting, panel, para, rows } from "@/lib/email/ui";
import { inventoryStrings } from "@/lib/inventory-strings";

const T = {
  vi: {
    subject: (item: string, branch: string) => `Sắp hết: ${item} ở ${branch}`,
    eyebrow: "Kho hàng",
    title: "Một món sắp hết",
    intro: (item: string, branch: string) => `<strong>${item}</strong> ở <strong>${branch}</strong> vừa xuống bằng hoặc dưới mức tối thiểu.`,
    hi: "Xin chào",
    left: "Còn lại",
    min: "Mức tối thiểu",
    branch: "Chi nhánh",
    body: "Món này đã được đưa vào danh sách cần mua. Bạn sẽ nhận email lần nữa nếu nó lại sắp hết sau khi đã bổ sung.",
    cta: "Mở danh sách cần mua",
  },
  en: {
    subject: (item: string, branch: string) => `Running low: ${item} at ${branch}`,
    eyebrow: "Stock",
    title: "Something is running low",
    intro: (item: string, branch: string) => `<strong>${item}</strong> at <strong>${branch}</strong> just dropped to or below its minimum.`,
    hi: "Hi",
    left: "Left",
    min: "Minimum",
    branch: "Branch",
    body: "It's on the shopping list now. You'll hear again if it runs low another time after being restocked.",
    cta: "Open the shopping list",
  },
  fi: {
    subject: (item: string, branch: string) => `Vähissä: ${item} – ${branch}`,
    eyebrow: "Varasto",
    title: "Tuote on vähissä",
    intro: (item: string, branch: string) => `<strong>${item}</strong> toimipisteessä <strong>${branch}</strong> laski minimiin tai sen alle.`,
    hi: "Hei",
    left: "Jäljellä",
    min: "Minimi",
    branch: "Toimipiste",
    body: "Tuote on nyt ostoslistalla. Saat viestin uudelleen, jos se on täydennyksen jälkeen taas vähissä.",
    cta: "Avaa ostoslista",
  },
};

/** To the owner when an item drops to its minimum at a branch (src/lib/inventory.ts). */
export function lowStockEmail(p: {
  locale: string;
  ownerName: string;
  branch: string;
  item: { name: string; brand: string | null; unit: string };
  qty: number;
  min: number;
}) {
  const t = (T as Record<string, (typeof T)["en"]>)[p.locale] ?? T.en;
  const unit = inventoryStrings(p.locale).units[p.item.unit] ?? p.item.unit;
  const name = p.item.brand ? `${p.item.brand} ${p.item.name}` : p.item.name;
  const prefix = p.locale === "vi" ? "" : `/${p.locale}`;
  return {
    subject: t.subject(name, p.branch),
    html: emailLayout({
      locale: p.locale,
      preheader: `${t.left}: ${p.qty} ${unit}`,
      brand: null,
      hero: { eyebrow: t.eyebrow, title: t.title, intro: t.intro(esc(name), esc(p.branch)), tone: "alert", badge: "!" },
      body: [
        greeting(t.hi, p.ownerName),
        panel(
          rows([
            { label: t.left, value: esc(`${p.qty} ${unit}`), strong: true },
            { label: t.min, value: esc(`${p.min} ${unit}`) },
            { label: t.branch, value: esc(p.branch) },
          ]),
        ),
        para(esc(t.body), { muted: true, small: true, mt: 16 }),
        button(`${SITE_URL}${prefix}/business/dashboard/inventory?tab=buy`, esc(t.cta), { variant: "dark" }),
      ].join(""),
    }),
  };
}
