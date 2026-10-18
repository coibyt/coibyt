// Copy for /search landing pages (category and/or city). Each category gets
// its own service vocabulary so "nails in Helsinki" and "lashes in Helsinki"
// read as genuinely different pages to search engines, not one template.

type Lang = "vi" | "en" | "fi";

const HIGHLIGHTS: Record<string, Record<Lang, string>> = {
  nails: {
    vi: "sơn gel, nối móng, vẽ móng nghệ thuật, chăm sóc móng tay và móng chân",
    en: "gel polish, nail extensions, nail art, manicures and pedicures",
    fi: "geelilakkaukset, rakennekynnet, kynsitaide, manikyyrit ja pedikyyrit",
  },
  "eyebrows-lashes": {
    vi: "nối mi classic, volume, hybrid, uốn mi, nhuộm và tạo dáng chân mày",
    en: "classic, volume and hybrid lash extensions, lash lifts, brow tinting and shaping",
    fi: "klassiset, volyymi- ja hybridiripsienpidennykset, ripsien kestotaivutus sekä kulmien värjäys ja muotoilu",
  },
  "hair-salon": {
    vi: "cắt tóc, nhuộm, uốn, duỗi, phục hồi tóc và tạo kiểu",
    en: "haircuts, colouring, perms, hair treatments and styling",
    fi: "hiustenleikkaukset, värjäykset, permanentit, hiushoidot ja kampaukset",
  },
  barber: {
    vi: "cắt tóc nam, fade, cạo râu và tỉa râu",
    en: "men's haircuts, fades, shaves and beard trims",
    fi: "miesten hiustenleikkaukset, häivytykset, parranajot ja partojen muotoilut",
  },
  "spa-massage": {
    vi: "massage toàn thân, massage chân, xông hơi và các liệu trình thư giãn",
    en: "full-body massage, foot massage, sauna and relaxing treatments",
    fi: "kokovartalohieronnat, jalkahieronnat, sauna ja rentouttavat hoidot",
  },
  skincare: {
    vi: "chăm sóc da mặt, trị mụn, peel da và cấp ẩm chuyên sâu",
    en: "facials, acne treatments, peels and deep hydration",
    fi: "kasvohoidot, aknehoidot, kuorinnat ja kosteuttavat hoidot",
  },
  makeup: {
    vi: "trang điểm cô dâu, dự tiệc và sự kiện",
    en: "bridal, party and event makeup",
    fi: "hää-, juhla- ja tapahtumameikit",
  },
  wellness: {
    vi: "các liệu trình chăm sóc sức khoẻ và thư giãn",
    en: "wellness and relaxation treatments",
    fi: "hyvinvointi- ja rentoutushoidot",
  },
};

const GENERIC: Record<Lang, string> = {
  vi: "làm nail, nối mi, cắt tóc, spa, massage và chăm sóc da",
  en: "nails, lashes, hair, spa, massage and skincare",
  fi: "kynnet, ripset, hiukset, spa, hieronta ja ihonhoito",
};

export interface SearchSeo {
  title: string;
  description: string;
  h1: string;
  intro: string;
  faq: { q: string; a: string }[];
  /** Free-text searches are thin, endless pages — keep them out of the index;
   * category/city landing pages are the ones meant to rank. */
  indexable: boolean;
}

export function searchSeo(params: {
  locale: string;
  categoryName: string | null;
  categorySlug: string | null;
  city: string | null;
  q: string | null;
  resultCount: number;
  fromPrice: string | null;
}): SearchSeo {
  const lang: Lang = params.locale === "vi" || params.locale === "fi" ? params.locale : "en";
  const cat = params.categoryName;
  const city = params.city;
  const hl = (params.categorySlug && HIGHLIGHTS[params.categorySlug]?.[lang]) || GENERIC[lang];
  const indexable = !params.q;

  if (lang === "vi") {
    const where = city ? ` tại ${city}` : "";
    const subject = cat ? cat.toLowerCase() : "salon làm đẹp";
    const h1 = params.q ? `Kết quả cho “${params.q}”${where}` : cat ? `${cat}${where}` : city ? `Salon & spa tại ${city}` : "Tìm salon & spa gần bạn";
    return {
      indexable,
      h1,
      title: params.q
        ? `Kết quả cho “${params.q}”${where} | VaraaAi`
        : `${cat ?? "Salon, spa & làm đẹp"}${where} – So sánh giá & đặt lịch online | VaraaAi`,
      description: `Tìm ${subject} tốt nhất${where}: ${hl}. Xem bảng giá, đánh giá thật từ khách và đặt lịch 24/7 trên VaraaAi.`,
      intro: `Khám phá ${params.resultCount > 0 ? params.resultCount + " " : ""}${cat ? "salon " + subject : "salon và spa"}${where} trên VaraaAi — ${hl}. So sánh bảng giá, đọc đánh giá từ những khách đã thực sự đặt lịch, chọn nhân viên và giờ trống phù hợp rồi đặt lịch chỉ trong vài chạm, kể cả ngoài giờ mở cửa.`,
      faq: [
        {
          q: `Làm sao đặt lịch ${subject}${where} trên VaraaAi?`,
          a: "Chọn salon trong danh sách, chọn dịch vụ, nhân viên và giờ trống, điền thông tin rồi xác nhận. Bạn nhận email xác nhận ngay và có thể tự huỷ lịch trong tài khoản theo chính sách huỷ của salon.",
        },
        {
          q: `Giá ${subject}${where} khoảng bao nhiêu?`,
          a: params.fromPrice
            ? `Trên VaraaAi, giá dịch vụ bắt đầu từ khoảng ${params.fromPrice}, tuỳ salon và loại dịch vụ. Mỗi salon hiển thị bảng giá đầy đủ trước khi bạn đặt lịch.`
            : "Giá tuỳ salon và loại dịch vụ. Mỗi salon hiển thị bảng giá đầy đủ trước khi bạn đặt lịch.",
        },
        {
          q: "Có phải trả tiền trước khi đặt lịch không?",
          a: "Phần lớn salon cho phép thanh toán trực tiếp tại salon. Các hình thức thanh toán của từng salon được hiển thị rõ ở bước đặt lịch.",
        },
      ],
    };
  }

  if (lang === "fi") {
    const where = city ? ` – ${city}` : "";
    const subject = cat ? cat.toLowerCase() : "kauneushoitolat";
    const h1 = params.q ? `Hakutulokset: “${params.q}”${where}` : cat ? `${cat}${where}` : city ? `Salongit ja spat – ${city}` : "Löydä salonki tai spa läheltäsi";
    return {
      indexable,
      h1,
      title: params.q
        ? `Hakutulokset: “${params.q}”${where} | VaraaAi`
        : `${cat ?? "Kauneushoitolat ja spat"}${where} – vertaa hintoja ja varaa netistä | VaraaAi`,
      description: `Löydä parhaat palvelut${city ? " kaupungissa " + city : ""}: ${hl}. Katso hinnat ja oikeiden asiakkaiden arvostelut ja varaa aika 24/7 VaraaAissa.`,
      intro: `Selaa ${cat ? subject : "salonkeja ja spoja"}${city ? " kaupungissa " + city : ""} VaraaAissa — ${hl}. Vertaa hintoja, lue arvosteluja asiakkailta, jotka ovat oikeasti käyneet, valitse tekijä ja vapaa aika ja varaa muutamalla napautuksella myös aukioloaikojen ulkopuolella.`,
      faq: [
        {
          q: "Miten varaan ajan VaraaAissa?",
          a: "Valitse salonki listalta, valitse palvelu, tekijä ja vapaa aika, täytä tietosi ja vahvista. Saat vahvistuksen sähköpostiisi heti ja voit perua ajan itse tililtäsi salongin peruutusehtojen mukaisesti.",
        },
        {
          q: "Paljonko palvelut maksavat?",
          a: params.fromPrice
            ? `VaraaAissa hinnat alkavat noin ${params.fromPrice}, salongista ja palvelusta riippuen. Jokainen salonki näyttää koko hinnaston ennen varausta.`
            : "Hinnat riippuvat salongista ja palvelusta. Jokainen salonki näyttää koko hinnaston ennen varausta.",
        },
        {
          q: "Pitääkö maksaa etukäteen?",
          a: "Useimmissa salongeissa voit maksaa paikan päällä. Salongin maksutavat näkyvät selkeästi varausvaiheessa.",
        },
      ],
    };
  }

  const where = city ? ` in ${city}` : "";
  const subject = cat ? cat.toLowerCase() : "beauty salons";
  const h1 = params.q ? `Results for “${params.q}”${where}` : cat ? `${cat}${where}` : city ? `Salons & spas in ${city}` : "Find a salon or spa near you";
  return {
    indexable,
    h1,
    title: params.q
      ? `Results for “${params.q}”${where} | VaraaAi`
      : `${cat ?? "Salons, spas & beauty"}${where} – compare prices & book online | VaraaAi`,
    description: `Find the best ${subject}${where}: ${hl}. See prices and reviews from real clients, and book 24/7 on VaraaAi.`,
    intro: `Browse ${params.resultCount > 0 ? params.resultCount + " " : ""}${cat ? subject : "salons and spas"}${where} on VaraaAi — ${hl}. Compare price lists, read reviews from people who actually booked, pick your stylist and a free time, and book in a few taps, even after opening hours.`,
    faq: [
      {
        q: `How do I book ${subject}${where} on VaraaAi?`,
        a: "Pick a salon from the list, choose the service, staff member and a free time, fill in your details and confirm. You get a confirmation email right away and can cancel yourself from your account within the salon's cancellation policy.",
      },
      {
        q: `How much does it cost${where}?`,
        a: params.fromPrice
          ? `On VaraaAi, services start from around ${params.fromPrice}, depending on the salon and treatment. Every salon shows its full price list before you book.`
          : "Prices depend on the salon and treatment. Every salon shows its full price list before you book.",
      },
      {
        q: "Do I have to pay in advance?",
        a: "Most salons let you pay at the salon. Each salon's payment options are shown clearly during booking.",
      },
    ],
  };
}
