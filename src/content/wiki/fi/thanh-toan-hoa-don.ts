import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/thanh-toan-hoa-don/${name}.webp`;
const shot = (name: string) => `/wiki/thanh-toan-hoa-don/fi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "kassa-ja-laskut-kauneushoitolassa",
  lesson: "thanh-toan-hoa-don",
  category: "salon",
  title: "Kassa ja laskut kauneushoitolassa: maksu kassalla ja lasku asiakkaalle sähköpostilla tai QR-koodilla",
  metaTitle: "Kassa ja laskut kauneushoitolassa: maksu ja lasku",
  metaDescription:
    "Näin kirjaat maksun VaraaAissa kampaamossa, kynsistudiossa tai hoitolassa: täytä laskutustiedot, valitse maksutapa ja lähetä lasku sähköpostilla tai QR-koodilla.",
  keyword: "kassa ja laskut kauneushoitolassa",
  keywords: [
    "kynsistudion kassa",
    "maksu kassalla salongissa",
    "laskun tekeminen asiakkaalle",
    "lasku asiakkaan sähköpostiin",
    "lasku QR-koodilla salongista",
    "salongin laskutustiedot Y-tunnus ALV",
    "käteinen, tilisiirto ja lahjakortti maksutapana",
  ],
  excerpt: "Täytä laskutustiedot kerran. Sen jälkeen jokainen asiakas hoituu muutamalla napautuksella: avaa varaus, ”Maksu kassalla”, valitse maksutapa, vahvista ja lähetä lasku.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-va-nhan-vien-cam-dien-thoai-tai-quay-salon"),
    alt: "Punatukkainen nainen ja vaaleahiuksinen pukuun pukeutunut mies seisovat salongin marmoritiskin eri puolilla, kumpikin puhelin kädessä ja hymyillen",
  },
  takeaways: [
    "Tee ensin kerran: täytä **”Laskutustiedot”** kohdassa ”Asetukset”. Ennen sitä maksua ei voi vahvistaa.",
    "Kun asiakas tulee maksamaan: avaa ”Varaukset”, napauta hänen varaustaan ja paina **”Maksu kassalla”**.",
    "Maksutapoja on kolme: **”Käteinen”, ”Tilisiirto” ja ”Lahjakortti”**. Valitse oikea, niin tuloraportit pysyvät tarkkoina.",
    "Kun painat ”Vahvista maksu”, näytölle tulee ”Maksu vahvistettu” ja laskun numero.",
    "Laskun saa asiakkaalle kolmella tavalla: ”Näytä / lataa lasku”, sähköposti ja ”Lähetä” tai ”Näytä QR-koodi” skannattavaksi.",
  ],
  intro: [
    "Kassa ja laskut kauneushoitolassa eivät vaadi monimutkaista kassakonetta. Tiskillä pitää sujua kolme asiaa: tietää, paljonko asiakas maksaa, kirjata, miten hän maksoi, ja antaa hänelle kunnollinen lasku. Kun varaus on jo VaraaAissa, kaikki kolme alkavat asiakkaan varauksesta, koska palvelu ja hinta ovat siellä valmiina.",
    "Tämä artikkeli seuraa VaraaAi Academyn oppituntia ”Kassa ja laskut”. Opit täyttämään laskutustiedot, kirjaamaan maksun alusta loppuun ja lähettämään laskun jokaiselle asiakkaalle hänelle sopivalla tavalla.",
  ],
  sections: [
    {
      id: "miksi-kirjata-kassalla",
      title: "Miksi maksu kannattaa kirjata kassalla suoraan varauksesta",
      blocks: [
        { p: "Monessa salongissa raha otetaan vastaan tiskillä, ja kirjanpito tehdään päivän päätteeksi muistin varassa. Juuri niinä tunteina syntyvät virheet: tilisiirto unohtuu, lahjakortti muistetaan käteisenä. Kun maksu kirjataan asiakkaan seistessä tiskillä, luvut lukitaan, kun kaikki on vielä silmien edessä." },
        { p: "Kun kirjaus tehdään varauksesta, säästyy myös kirjoittamista. Palvelu, hinta ja asiakkaan nimi ovat jo kalenterissa. Tarkistat summan, valitset maksutavan ja vahvistat muutamalla napautuksella." },
        { p: "Asiakaskin hyötyy. Hän saa laskun puhelimeensa tai sähköpostiinsa, ja siinä ovat salongin yrityksen nimi, osoite ja Y-tunnus. Tositetta tarvitseva asiakas saa selkeän laskun heti eikä joudu odottamaan käsin kirjoitettua kuittia." },
      ],
    },
    {
      id: "laskutustiedot",
      title: "Salongin laskutustiedot: kerran tehtävä työ ennen ensimmäistä maksua",
      blocks: [
        { p: "Ennen ensimmäistä maksua täytä ”Asetukset”-sivun ”Laskutustiedot”. Näytön ohje sanoo sen suoraan: täytä nämä tiedot ennen kuin voit luoda laskun ”Maksu kassalla” -toiminnolla. Kenttiä on neljä:" },
        {
          table: {
            head: ["Kenttä", "Mitä kirjoitat", "Videon esimerkkisalonki"],
            rows: [
              ["”Yrityksen nimi”", "Yrityksen virallinen nimi, joka voi poiketa kyltin nimestä", "Lumi Beauty SARL"],
              ["”Yrityksen osoite”", "Yrityksen rekisteröity osoite", "10 Rue de Rivoli, 75004 Paris"],
              ["”Y-tunnus / verotunnus”", "Yrityksen rekisteröinnissä saatu tunnus", "FR 00 000 000 000"],
              ["”ALV (%)”", "Palveluihisi sovellettava arvonlisäverokanta", "20"],
            ],
          },
        },
        { img: { src: shot("laskutustiedot-yrityksen-nimi-ja-osoite"), alt: "Asetusten Laskutustiedot-osio, jossa ovat Yrityksen nimi, kultaisella korostettu Yrityksen osoite, Y-tunnus / verotunnus, ALV (%) ja Tallenna laskutustiedot -painike" } },
        { p: "Nämä neljä tietoa näkyvät jokaisessa salongin laskussa, joten kopioi ne yrityksesi rekisteröintitiedoista äläkä kirjoita muistinvaraisesti. Paina lopuksi ”Tallenna laskutustiedot”." },
        { note: "ALV-kanta ja laskun pakolliset tiedot vaihtelevat maittain. Videon luku 20 on vain esimerkkisalongin luku. Kysy kirjanpitäjältäsi tai Verohallinnosta, jotta täytät oikeat tiedot.", kind: "warn", title: "Verosäännöt vaihtelevat maittain" },
        { p: "Laskutustiedoista kerrotaan myös ohjeessa [salongin peruutusehdot, tilisiirto ja laskutustiedot](lesson:thanh-toan-chinh-sach), jossa asetetaan lisäksi peruutusaika ja tilisiirtojen pankkitiedot." },
      ],
    },
    {
      id: "maksutavat",
      title: "Käteinen, tilisiirto vai lahjakortti: maksutavan kirjaaminen",
      blocks: [
        { p: "Kassanäkymässä on kohdassa ”Maksutapa” kolme vaihtoehtoa. Valitse se, joka vastaa tapaa, jolla asiakas juuri maksoi:" },
        {
          table: {
            head: ["Maksutapa", "Milloin valitset"],
            rows: [
              ["”Käteinen”", "Asiakas maksaa käteisellä tiskillä"],
              ["”Tilisiirto”", "Asiakas maksaa pankin kautta, esimerkiksi tilisiirrolla"],
              ["”Lahjakortti”", "Asiakas maksaa salongin lahjakortilla"],
            ],
          },
        },
        { img: { src: shot("maksutapa-kateinen-tilisiirto-lahjakortti"), alt: "Maksu kassalla -ikkuna, jossa Gel manicure 45 EUR, Yhteensä 45,00 € ja maksutavat Käteinen, Tilisiirto ja Lahjakortti, joista Lahjakortti on korostettu kultaisella" } },
        { p: "Oikea maksutapa pitää tuloraportit tarkkoina. Päivän päätteeksi kassalaatikon käteisen pitää vastata kaikkien ”Käteinen”-maksujen summaa. Yksi väärä valinta tarkoittaa, että kassa ei täsmää eikä kukaan tiedä miksi." },
        { p: "Maksutavan yläpuolella ovat palvelu hintoineen ja ”Yhteensä”-rivi. Voit muuttaa hintaa tarvittaessa, esimerkiksi kun asiakas otti jotain lisää tai jätti jotain pois varaukseen verrattuna. Alla on kenttä ”Lisää tietoja kuittiin”, johon voit kirjoittaa huomautuksen tästä maksusta." },
        { p: "Jos salonki ei vielä myy lahjakortteja, katso oppitunti [salongin lahjakorteista](lesson:the-qua-tang-salon)." },
      ],
    },
    {
      id: "laskun-lahettaminen",
      title: "Kolme tapaa lähettää lasku: lataus, sähköposti tai QR-koodi",
      blocks: [
        { p: "Kun painat ”Vahvista maksu”, näytölle tulee ”Maksu vahvistettu”, laskun numero ja summa. Heti alla on kolme tapaa saada lasku asiakkaalle:" },
        {
          table: {
            head: ["Tapa", "Mitä teet", "Sopii"],
            rows: [
              ["Avaa lasku", "Paina ”Näytä / lataa lasku”", "Laskun tarkistamiseen tai tiedoston lataamiseen"],
              ["Sähköposti", "Kirjoita asiakkaan sähköposti kohtaan ”Lähetä lasku sähköpostilla” ja paina ”Lähetä”", "Asiakkaalle, joka haluaa laskun sähköpostiinsa säilytettäväksi tai edelleen lähetettäväksi"],
              ["QR-koodi", "Paina ”Näytä QR-koodi” ja anna asiakkaan skannata näyttö", "Asiakkaalle, joka haluaa laskun heti puhelimeensa ilman sähköpostia"],
            ],
          },
        },
        { img: { src: shot("maksu-vahvistettu-laskun-numero"), alt: "Maksu vahvistettu -näkymä, jossa laskun numero ja 45,00 € on korostettu kultaisella, alla Näytä / lataa lasku, sähköpostikenttä ja Näytä QR-koodi" } },
        { p: "QR-koodi on nopein, kun asiakas seisoo edessäsi: hän skannaa koodin ja lasku aukeaa hänen puhelimeensa, eikä sinun tarvitse kysyä ja kirjoittaa sähköpostiosoitetta. Asiakkaan puoli, koodin skannaus ja laskun avaaminen myöhemmin, kerrotaan ohjeessa [lasku QR-koodilla salongista](lesson:hoa-don)." },
        { img: { src: shot("nayta-qr-koodi-laskulle"), alt: "Maksu vahvistettu -näkymä, jossa Näytä QR-koodi -painike on korostettu kultaisella Näytä / lataa lasku -painikkeen ja sähköpostikentän alla" } },
      ],
    },
    {
      id: "tavallisia-tilanteita",
      title: "Tavallisia tilanteita kassalla",
      blocks: [
        {
          table: {
            head: ["Tilanne", "Mitä teet"],
            rows: [
              ["Painat vahvistusta, mutta sivu pyytää laskutustietoja", "Siirry kohtaan ”Asetukset”, täytä ”Laskutustiedot” ja paina ”Tallenna laskutustiedot”. Palaa sitten vahvistamaan maksu"],
              ["Peritty summa poikkeaa varauksen hinnasta", "Muuta hinta kassanäkymässä ennen kuin painat ”Vahvista maksu”"],
              ["Asiakas ei halua sähköpostia", "Paina ”Näytä QR-koodi”, niin hän voi skannata ja ladata laskun"],
              ["Asiakas maksaa lahjakortilla", "Valitse kohdassa ”Maksutapa” ”Lahjakortti”"],
              ["Haluat lisätä huomautuksen tästä maksusta", "Kirjoita se kenttään ”Lisää tietoja kuittiin”"],
            ],
          },
        },
        { p: "Kassa kirjaa, mitä asiakas maksoi. Jos salongissa on useita tekijöitä ja haluat tietää, paljonko kukin otti vastaan tippeineen, lue ohje [työntekijän tuloraportista](lesson:doanh-thu-nhan-vien). Kaikki muu kalenterissa, varausten lisäämisestä saapumatta jättämisten merkitsemiseen, on ohjeessa [kampaamon ajanvarausohjelma](lesson:lich-hen)." },
      ],
    },
  ],
  howTo: {
    title: "Maksu kassalla ja lasku asiakkaalle VaraaAissa vaihe vaiheelta",
    id: "kassan-vaiheet",
    after: "laskutustiedot",
    lead: "Ensimmäinen vaihe tehdään kerran. Seuraavat viisi toistuvat jokaisen maksamaan tulevan asiakkaan kohdalla oppituntivideon järjestyksessä.",
    steps: [
      {
        name: "Täytä ”Laskutustiedot” kohdassa ”Asetukset”",
        text: "Avaa ”Asetukset” ja vieritä kohtaan ”Laskutustiedot”. Kirjoita ”Yrityksen nimi”, ”Yrityksen osoite”, ”Y-tunnus / verotunnus” ja ”ALV (%)” ja paina ”Tallenna laskutustiedot”. Tämä tehdään vain kerran.",
        image: { src: shot("alv-ja-tallenna-laskutustiedot"), alt: "Laskutustietojen Y-tunnus / verotunnus- ja ALV (%) -kentät sekä kultaisella korostettu Tallenna laskutustiedot -painike" },
      },
      {
        name: "Avaa ”Varaukset” ja napauta asiakkaan varausta",
        text: "Kun asiakas on palveltu ja tulee tiskille, avaa ”Varaukset” ja napauta hänen varaustaan. Tiedoissa näkyvät palvelu, aika ja perittävä summa.",
        image: { src: shot("avaa-asiakkaan-varaus"), alt: "Kolmen työntekijän päiväkalenteri, jossa Léan sarakkeen varauslohko klo 10.45–11.45 on korostettu kultaisella" },
      },
      {
        name: "Paina ”Maksu kassalla”",
        text: "Paina varauksen tiedoissa ”Maksu kassalla”. Kassanäkymä aukeaa varauksen palvelulla ja hinnalla, joten niitä ei tarvitse kirjoittaa uudelleen.",
      },
      {
        name: "Tarkista summa ja valitse ”Maksutapa”",
        text: "Katso ”Yhteensä”-rivi ja muuta hintaa tarvittaessa. Valitse sitten ”Maksutapa”: ”Käteinen”, ”Tilisiirto” tai ”Lahjakortti” sen mukaan, miten asiakas juuri maksoi.",
        image: { src: shot("tarkista-yhteensa-ennen-maksua"), alt: "Maksu kassalla -ikkuna, jossa Gel manicure -rivi 45 EUR ja Yhteensä 45,00 € on korostettu kultaisella, alla maksutavat" },
      },
      {
        name: "Paina ”Vahvista maksu”",
        text: "Lisää tarvittaessa huomautus kenttään ”Lisää tietoja kuittiin”. Paina sitten ”Vahvista maksu”. Näytölle tulee ”Maksu vahvistettu” ja laskun numero.",
        image: { src: shot("lisaa-tietoja-kuittiin-vahvista-maksu"), alt: "Maksu kassalla -ikkuna, jossa on Lisää tietoja kuittiin -kenttä ja kultaisella korostettu musta Vahvista maksu -painike Peruuta-painikkeen vieressä" },
      },
      {
        name: "Lähetä lasku asiakkaalle",
        text: "Paina ”Näytä / lataa lasku”, niin lasku aukeaa. Jos haluat lähettää sen, kirjoita asiakkaan sähköposti kohtaan ”Lähetä lasku sähköpostilla” ja paina ”Lähetä”. Tai paina ”Näytä QR-koodi”: asiakas skannaa koodin, ja lasku aukeaa hänen puhelimeensa.",
        image: { src: shot("laheta-lasku-sahkopostilla"), alt: "Maksu vahvistettu -näkymä, jossa Lähetä lasku sähköpostilla -kenttä ja Lähetä-painike on korostettu kultaisella, alla Näytä QR-koodi ja Sulje" },
      },
    ],
  },
  faq: [
    {
      q: "Mitä pitää tehdä ennen kuin vahvistan ensimmäisen maksun VaraaAissa?",
      a: "Täytä laskutustiedot kohdassa ”Asetukset”: yrityksen nimi, yrityksen osoite, Y-tunnus tai verotunnus ja ALV. Ne näkyvät laskussa. Ennen kuin ne on täytetty, maksua ei voi vahvistaa, ja sivu muistuttaa täyttämään ne ensin asetuksissa.",
    },
    {
      q: "Montako maksutapaa kassalla voi valita?",
      a: "Kolme: ”Käteinen”, ”Tilisiirto” ja ”Lahjakortti”. Valitse se, joka vastaa asiakkaan maksutapaa, niin tuloraportit pysyvät tarkkoina.",
    },
    {
      q: "Miten asiakas saa laskun heti puhelimeensa?",
      a: "Paina maksun vahvistamisen jälkeen ”Näytä QR-koodi” ja anna asiakkaan skannata se. Lasku aukeaa hänen puhelimeensa. Voit myös kirjoittaa hänen sähköpostiosoitteensa ja painaa ”Lähetä”.",
    },
    {
      q: "Voiko hintaa muuttaa kassalla?",
      a: "Voi. Kassanäkymä näyttää varauksesta tulevan summan, ja voit muuttaa hintaa tarvittaessa ennen kuin painat ”Vahvista maksu”.",
    },
    {
      q: "Mistä aloitan asiakkaan maksun kirjaamisen?",
      a: "”Varaukset”-sivulta. Napauta asiakkaan varausta avataksesi tiedot ja paina ”Maksu kassalla”. Kassanäkymä aukeaa varauksen palvelulla ja summalla.",
    },
    {
      q: "Minkä ALV-prosentin salongin laskuun pitää laittaa?",
      a: "Kirjoitat ”ALV (%)” itse kohtaan ”Laskutustiedot”. Verokannat vaihtelevat maittain, joten kysy kirjanpitäjältä tai Verohallinnosta, niin saat luvun oikein.",
    },
  ],
  related: ["lich-hen", "doanh-thu-nhan-vien", "thanh-toan-chinh-sach", "the-qua-tang-salon"],
};

export default article;
