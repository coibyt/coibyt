/** The panel shown on the loyalty and marketing pages until the salon
 * profile reaches PROFILE_UNLOCK_PCT (src/lib/profile-completeness.ts). */
const STRINGS = {
  vi: {
    eyebrow: "Tính năng cao cấp",
    loyalty: "Thẻ tích điểm",
    marketing: "Marketing",
    title: "Hoàn thiện hồ sơ để mở {feature}",
    text: "{feature} chỉ được kích hoạt khi hồ sơ salon đạt ít nhất {need}%. Khách hàng tin tưởng salon có thông tin đầy đủ — và các email, thẻ tích điểm gửi đi cũng hiển thị đúng logo, địa chỉ và thông tin thanh toán của bạn.",
    staffText: "{feature} sẽ mở khi chủ salon hoàn thiện ít nhất {need}% hồ sơ salon. Hãy nhắc chủ salon vào Cài đặt để bổ sung.",
    now: "Hiện tại",
    need: "Cần đạt",
    left: "Còn thiếu {n}%",
    todo: "Bổ sung các mục sau",
    fix: "Bổ sung",
    cta: "Đi tới Cài đặt",
    locked: "Đang khoá",
  },
  en: {
    eyebrow: "Premium feature",
    loyalty: "Loyalty cards",
    marketing: "Marketing",
    title: "Complete your profile to unlock {feature}",
    text: "{feature} switches on once your salon profile is at least {need}% complete. Customers trust salons with full details — and the emails and cards you send show your own logo, address and payment details.",
    staffText: "{feature} opens once the salon owner completes at least {need}% of the salon profile. Ask them to fill it in under Settings.",
    now: "Now",
    need: "Needed",
    left: "{n}% to go",
    todo: "Add these",
    fix: "Add",
    cta: "Go to Settings",
    locked: "Locked",
  },
  fi: {
    eyebrow: "Premium-ominaisuus",
    loyalty: "Kanta-asiakaskortit",
    marketing: "Markkinointi",
    title: "Täydennä profiili avataksesi: {feature}",
    text: "{feature} otetaan käyttöön, kun salongin profiili on vähintään {need} % valmis. Asiakkaat luottavat salonkeihin, joiden tiedot ovat kunnossa — ja lähettämissäsi viesteissä ja korteissa näkyvät oma logosi, osoitteesi ja maksutietosi.",
    staffText: "{feature} avautuu, kun salongin omistaja on täydentänyt vähintään {need} % salongin profiilista. Pyydä häntä täydentämään tiedot Asetuksissa.",
    now: "Nyt",
    need: "Vaaditaan",
    left: "{n} % jäljellä",
    todo: "Lisää nämä",
    fix: "Lisää",
    cta: "Siirry asetuksiin",
    locked: "Lukittu",
  },
};

export type ProfileLockStrings = (typeof STRINGS)["vi"];

export function profileLockStrings(locale: string): ProfileLockStrings {
  return (STRINGS as Record<string, ProfileLockStrings>)[locale] ?? STRINGS.en;
}
