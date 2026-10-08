// Categories are stored with only Vietnamese + English names, keyed here by
// the English name so every locale can show a proper translation. Unknown
// (e.g. newly added) categories fall back to the English name.
const TRANSLATIONS: Record<string, Partial<Record<string, string>>> = {
  "Spa & massage": {
    fi: "Kylpylä ja hieronta", pl: "Spa i masaż", de: "Spa & Massage", km: "ស្ប៉ា និងម៉ាស្សា", th: "สปาและนวด",
    sv: "Spa & massage", fr: "Spa et massage", ko: "스파 & 마사지", ja: "スパ＆マッサージ", zh: "水疗与按摩",
    lv: "Spa un masāža", et: "Spaa ja massaaž", be: "Спа і масаж", bg: "Спа и масаж", cs: "Spa a masáže",
    hu: "Spa és masszázs", ro: "Spa și masaj", ru: "Спа и массаж", sk: "Spa a masáže", uk: "Спа та масаж",
    no: "Spa og massasje", da: "Spa og massage", nl: "Spa & massage", it: "Spa e massaggi", es: "Spa y masajes",
    he: "ספא ועיסוי", hi: "स्पा और मसाज", id: "Spa & pijat", ms: "Spa & urutan", fil: "Spa at masahe",
    ar: "سبا وتدليك", tr: "Spa ve masaj", pt: "Spa e massagem",
  },
  "Skincare & facials": {
    fi: "Ihonhoito ja kasvohoidot", pl: "Pielęgnacja skóry i zabiegi na twarz", de: "Hautpflege & Gesichtsbehandlungen", km: "ថែរក្សាស្បែក និងព្យាបាលមុខ", th: "ดูแลผิวและทรีตเมนต์หน้า",
    sv: "Hudvård & ansiktsbehandlingar", fr: "Soins de la peau et du visage", ko: "스킨케어 & 페이셜", ja: "スキンケア＆フェイシャル", zh: "护肤与面部护理",
    lv: "Ādas kopšana un sejas kopšana", et: "Nahahooldus ja näohooldus", be: "Доглад за скурай і тварам", bg: "Грижа за кожата и лицето", cs: "Péče o pleť a obličej",
    hu: "Bőr- és arcápolás", ro: "Îngrijirea pielii și a feței", ru: "Уход за кожей и лицом", sk: "Starostlivosť o pleť a tvár", uk: "Догляд за шкірою та обличчям",
    no: "Hudpleie og ansiktsbehandling", da: "Hudpleje og ansigtsbehandling", nl: "Huidverzorging & gezichtsbehandelingen", it: "Cura della pelle e trattamenti viso", es: "Cuidado de la piel y faciales",
    he: "טיפוח עור וטיפולי פנים", hi: "त्वचा देखभाल और फेशियल", id: "Perawatan kulit & wajah", ms: "Penjagaan kulit & muka", fil: "Skincare at facial",
    ar: "العناية بالبشرة والوجه", tr: "Cilt bakımı ve yüz bakımı", pt: "Cuidados com a pele e faciais",
  },
  Nails: {
    fi: "Kynnet", pl: "Paznokcie", de: "Nägel", km: "ក្រចក", th: "ทำเล็บ",
    sv: "Naglar", fr: "Ongles", ko: "네일", ja: "ネイル", zh: "美甲",
    lv: "Nagi", et: "Küüned", be: "Пазногці", bg: "Нокти", cs: "Nehty",
    hu: "Köröm", ro: "Unghii", ru: "Ногти", sk: "Nechty", uk: "Нігті",
    no: "Negler", da: "Negle", nl: "Nagels", it: "Unghie", es: "Uñas",
    he: "ציפורניים", hi: "नाखून", id: "Kuku", ms: "Kuku", fil: "Kuko",
    ar: "أظافر", tr: "Tırnak", pt: "Unhas",
  },
  Barber: {
    fi: "Parturi", pl: "Barber", de: "Barbier", km: "កាត់សក់បុរស", th: "ร้านตัดผมชาย",
    sv: "Barberare", fr: "Barbier", ko: "바버샵", ja: "バーバー", zh: "理发店",
    lv: "Bārddziņš", et: "Juuksur (meestele)", be: "Барбершоп", bg: "Бръснарница", cs: "Holičství",
    hu: "Borbély", ro: "Frizerie", ru: "Барбершоп", sk: "Holičstvo", uk: "Барбершоп",
    no: "Barbershop", da: "Barber", nl: "Barbier", it: "Barbiere", es: "Barbería",
    he: "מספרת גברים", hi: "बार्बर", id: "Pangkas rambut pria", ms: "Tukang gunting rambut", fil: "Barbero",
    ar: "حلاقة رجالية", tr: "Berber", pt: "Barbearia",
  },
  "Hair salon": {
    fi: "Kampaamo", pl: "Salon fryzjerski", de: "Friseursalon", km: "ហាងកាត់សក់", th: "ร้านทำผม",
    sv: "Frisörsalong", fr: "Salon de coiffure", ko: "헤어살롱", ja: "ヘアサロン", zh: "发廊",
    lv: "Frizētava", et: "Juuksurisalong", be: "Парыкмахерская", bg: "Фризьорски салон", cs: "Kadeřnictví",
    hu: "Fodrászat", ro: "Salon de coafură", ru: "Парикмахерская", sk: "Kaderníctvo", uk: "Перукарня",
    no: "Frisørsalong", da: "Frisørsalon", nl: "Kapsalon", it: "Parrucchiere", es: "Peluquería",
    he: "מספרה", hi: "हेयर सैलून", id: "Salon rambut", ms: "Salon rambut", fil: "Hair salon",
    ar: "صالون شعر", tr: "Kuaför", pt: "Salão de cabeleireiro",
  },
  "Brows & lashes": {
    fi: "Kulmat ja ripset", pl: "Brwi i rzęsy", de: "Augenbrauen & Wimpern", km: "ចិញ្ចើម និងរោមភ្នែក", th: "คิ้วและขนตา",
    sv: "Ögonbryn & fransar", fr: "Sourcils et cils", ko: "눈썹 & 속눈썹", ja: "眉毛＆まつ毛", zh: "眉毛与睫毛",
    lv: "Uzacis un skropstas", et: "Kulmud ja ripsmed", be: "Бровы і вейкі", bg: "Вежди и мигли", cs: "Obočí a řasy",
    hu: "Szemöldök és szempilla", ro: "Sprâncene și gene", ru: "Брови и ресницы", sk: "Obočie a mihalnice", uk: "Брови та вії",
    no: "Øyenbryn og vipper", da: "Øjenbryn og vipper", nl: "Wenkbrauwen & wimpers", it: "Sopracciglia e ciglia", es: "Cejas y pestañas",
    he: "גבות וריסים", hi: "भौहें और पलकें", id: "Alis & bulu mata", ms: "Kening & bulu mata", fil: "Kilay at pilikmata",
    ar: "حواجب ورموش", tr: "Kaş ve kirpik", pt: "Sobrancelhas e cílios",
  },
  Makeup: {
    fi: "Meikki", pl: "Makijaż", de: "Make-up", km: "ការតុបតែងមុខ", th: "แต่งหน้า",
    sv: "Smink", fr: "Maquillage", ko: "메이크업", ja: "メイク", zh: "化妆",
    lv: "Grims", et: "Meik", be: "Макіяж", bg: "Грим", cs: "Make-up",
    hu: "Smink", ro: "Machiaj", ru: "Макияж", sk: "Mejkap", uk: "Макіяж",
    no: "Sminke", da: "Makeup", nl: "Make-up", it: "Trucco", es: "Maquillaje",
    he: "איפור", hi: "मेकअप", id: "Rias wajah", ms: "Solekan", fil: "Make-up",
    ar: "مكياج", tr: "Makyaj", pt: "Maquiagem",
  },
  Wellness: {
    fi: "Hyvinvointi", pl: "Wellness", de: "Wellness", km: "សុខភាព និងសុខុមាលភាព", th: "เวลเนส",
    sv: "Wellness", fr: "Bien-être", ko: "웰니스", ja: "ウェルネス", zh: "健康养生",
    lv: "Labsajūta", et: "Heaolu", be: "Веллнэс", bg: "Уелнес", cs: "Wellness",
    hu: "Wellness", ro: "Wellness", ru: "Велнес", sk: "Wellness", uk: "Велнес",
    no: "Velvære", da: "Velvære", nl: "Wellness", it: "Benessere", es: "Bienestar",
    he: "בריאות ורווחה", hi: "वेलनेस", id: "Kebugaran", ms: "Kesejahteraan", fil: "Wellness",
    ar: "العافية", tr: "Sağlıklı yaşam", pt: "Bem-estar",
  },
};

export function categoryName(locale: string, c: { nameVi: string; nameEn: string }): string {
  if (locale === "vi") return c.nameVi;
  return TRANSLATIONS[c.nameEn]?.[locale] ?? c.nameEn;
}
