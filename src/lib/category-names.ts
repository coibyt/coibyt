// Categories are stored with only Vietnamese + English names, keyed here by
// the English name so every locale can show a proper translation. Unknown
// (e.g. newly added) categories fall back to the English name.
const TRANSLATIONS: Record<string, Partial<Record<string, string>>> = {
  "Spa & massage": { fi: "Kylpylä ja hieronta", pl: "Spa i masaż", de: "Spa & Massage", km: "ស្ប៉ា និងម៉ាស្សា", th: "สปาและนวด" },
  "Skincare & facials": { fi: "Ihonhoito ja kasvohoidot", pl: "Pielęgnacja skóry i zabiegi na twarz", de: "Hautpflege & Gesichtsbehandlungen", km: "ថែរក្សាស្បែក និងព្យាបាលមុខ", th: "ดูแลผิวและทรีตเมนต์หน้า" },
  Nails: { fi: "Kynnet", pl: "Paznokcie", de: "Nägel", km: "ក្រចក", th: "ทำเล็บ" },
  Barber: { fi: "Parturi", pl: "Barber", de: "Barbier", km: "កាត់សក់បុរស", th: "ร้านตัดผมชาย" },
  "Hair salon": { fi: "Kampaamo", pl: "Salon fryzjerski", de: "Friseursalon", km: "ហាងកាត់សក់", th: "ร้านทำผม" },
  "Brows & lashes": { fi: "Kulmat ja ripset", pl: "Brwi i rzęsy", de: "Augenbrauen & Wimpern", km: "ចិញ្ចើម និងរោមភ្នែក", th: "คิ้วและขนตา" },
  Makeup: { fi: "Meikki", pl: "Makijaż", de: "Make-up", km: "ការតុបតែងមុខ", th: "แต่งหน้า" },
  Wellness: { fi: "Hyvinvointi", pl: "Wellness", de: "Wellness", km: "សុខភាព និងសុខុមាលភាព", th: "เวลเนส" },
};

export function categoryName(locale: string, c: { nameVi: string; nameEn: string }): string {
  if (locale === "vi") return c.nameVi;
  return TRANSLATIONS[c.nameEn]?.[locale] ?? c.nameEn;
}
