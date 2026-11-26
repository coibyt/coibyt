import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/noi-mi-vs-uon-mi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "kestotaivutus-vai-ripsienpidennykset",
  lesson: "noi-mi-vs-uon-mi",
  category: "tips",
  title: "Kestotaivutus vai ripsienpidennykset: hinta, kesto ja tuntuma rinnakkain",
  metaTitle: "Kestotaivutus vai ripsienpidennykset? Hinta, kesto, tuntuma",
  metaDescription:
    "Kestotaivutus vai ripsienpidennykset? Hoidon kesto, Moja Beautyn hinnat, kauanko tulos pysyy, tuntuma silmissä ja jälkihoito sekä miten valitset itsellesi.",
  keyword: "kestotaivutus vai ripsienpidennykset",
  keywords: ["kumpi on parempi kestotaivutus vai pidennykset", "kauanko ripsien kestotaivutus pysyy", "kauanko ripsienpidennykset kestävät", "ripsien kestotaivutus hinta", "kestotaivutus lyhyisiin ripsiin", "kestotaivutus pidennysten jälkeen"],
  excerpt: "Kestotaivutus taivuttaa omat ripsesi, pidennykset tuovat uusia ripsiä tuuheutta ja pituutta varten. Tässä ne ovat rinnakkain: aika, hinta, kesto, tuntuma ja jälkihoito.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-mi-lam-mi-cho-khach-nam-tren-giuong-studio"),
    alt: "Mustiin käsineisiin pukeutunut tekijä pitelee kahta pinsettiä ja työstää silmät kiinni kermanvärisellä sängyllä makaavan asiakkaan ripsiä marmorisessa studiossa",
  },
  takeaways: [
    "**Kestotaivutus** taivuttaa omat ripsesi eikä lisää mitään; **ripsienpidennykset** kiinnitetään omiin ripsiin tuuheuden ja pituuden vuoksi.",
    "Moja Beautyssa kestotaivutus maksaa 30 € ja kestää noin 60 minuuttia; klassiset pidennykset maksavat 39 €, kestävät noin 90 minuuttia ja vaativat säännöllistä huoltoa.",
    "Kestotaivutus pysyy noin 6–8 viikkoa; pidennykset lähtevät vähitellen omien ripsien mukana, joten huolto on edessä 2–3 viikon päästä.",
    "Luonnolliseen ja helppoon ilmeeseen kestotaivutus, selvästi tuuheisiin ja pitkiin ripsiin pidennykset.",
    "Kestotaivutus vaatii omilta ripsiltä jonkin verran pituutta; hyvin lyhyitä ripsiä on vaikea taivuttaa kauniiksi.",
  ],
  intro: [
    "Kestotaivutus vai ripsienpidennykset: tätä miettii moni ennen ensimmäistä ripsiaikaansa. Molemmat kaunistavat ripsiä, mutta erot ovat suuremmat kuin luulisi. Toinen taivuttaa omat ripsesi, toinen lisää uusia. Siitä seuraavat erot hinnassa, tuloksen kestossa, tuntumassa silmissä ja hoidon määrässä.",
    "Artikkeli perustuu VaraaAi Academyn kurssin ”Moja Beauty: ripset, kynnet ja kulmat” oppituntiin ”Ripsienpidennykset vai kestotaivutus: hinta, kesto ja tuntuma”. Kurssi on lyhyitä asiakasvideoita helsinkiläiseltä Moja Beauty -salongilta. Hinnat ovat Moja Beautyn omia, ja ne sisältävät arvonlisäveron. Luettuasi tiedät, kumpi sopii omille ripsillesi ja arkeesi.",
  ],
  sections: [
    {
      id: "perusero",
      title: "Miten kestotaivutus ja ripsienpidennykset eroavat",
      blocks: [
        { p: "**Ripsien kestotaivutus** ei lisää yhtään ripseä. Tekijä kampaa omat ripsesi luomelle kiinnitetyn silikonimuotin päälle, levittää pehmentävän aineen, jotta ripset ottavat uuden kaaren, ja sen jälkeen toisen aineen, joka kiinnittää muodon. Lopputulos on omat ripsesi ylös taivutettuina, ja ne näyttävät pidemmiltä, koska kärjet eivät enää osoita alaspäin." },
        { img: { src: img("dan-khuon-silicone-sat-chan-mi-khi-uon-mi"), alt: "Mustaan käsineeseen pukeutunut sormi asettaa vaaleanpunaisen silikonimuotin ripsirajan tuntumaan asiakkaan suljettuun silmään, valkoinen suojatyyny silmän alla", caption: "Kestotaivutus: omat ripset kammataan ripsirajaan asetetun silikonimuotin päälle." } },
        { p: "**Ripsienpidennyksissä** jokaiseen omaan ripseen kiinnitetään uusi ripsi ammattikäyttöön tarkoitetulla liimalla pienen matkan päähän luomesta. Klassisissa ripsissä jokainen oma ripsi kantaa yhden pidennyksen. Ripsirivi on siksi selvästi omia ripsiä tuuheampi ja pidempi." },
        { img: { src: img("khay-dung-cu-noi-mi-vi-mi-keo-va-nhip"), alt: "Kultareunainen marmoritarjotin, jolla on pituuden mukaan järjestettyjä pidennysnauhoja, liimapullo, jadekivi, kaksi pinsettiä ja ripsiharja", caption: "Pidennykset: jokaiseen omaan ripseen kiinnitetään oma pidennys." } },
      ],
    },
    {
      id: "hinta-ja-kesto",
      title: "Hinta, hoitoaika ja kauanko tulos pysyy",
      blocks: [
        {
          table: {
            head: ["", "Kestotaivutus", "Klassiset pidennykset"],
            rows: [
              ["Hinta Moja Beautyssa", "30 €", "39 €"],
              ["Hoitoaika", "Noin 60 minuuttia", "Noin 90 minuuttia"],
              ["Pysyy", "Noin 6–8 viikkoa", "Huolto 2–3 viikon päästä"],
              ["Seuraava käynti", "Uusi taivutus, kun uudet ripset ovat kasvaneet", "Säännöllinen huolto"],
            ],
          },
        },
        { p: "Yhden käynnin hinnassa ero ei ole suuri. Ero syntyy siitä, kuinka usein palaat salonkiin. Kestotaivutus pysyy noin kuudesta kahdeksaan viikkoa, lähes ripsen elinkaaren verran: kun uudet ripset ovat kasvaneet suorina, taivutus uusitaan. Pidennykset lähtevät vähitellen omien ripsien mukana, joten kahden–kolmen viikon päästä tarvitset huollon, ettei ripsirivi näytä harvalta ja epätasaiselta." },
        { note: "Taulukon hinnat ovat helsinkiläisen Moja Beautyn hintoja, ja ne sisältävät arvonlisäveron. Jokaisella salongilla on oma hinnastonsa; tarkista huollon hinta valitsemasi salongin varaussivulta.", kind: "info", title: "Hinnoista" },
      ],
    },
    {
      id: "tuntuma",
      title: "Tuntuma silmissä ja hoidon tarve",
      blocks: [
        { p: "Kestotaivutuksen jälkeen ripset ovat edelleen omasi. Oppitunnin mukaan tuntuu kuin mitään ei olisi tehty. Lisäripsiä tai liimaa ei ole, joten ripsiä ei juuri tarvitse ajatella arjessa." },
        { img: { src: img("khach-voi-mi-that-sau-khi-uon-cong-tu-nhien"), alt: "Vaaleahiuksinen nainen katsoo suoraan kameraan, omat ripset kaartuvat luonnollisesti ylös kestotaivutuksen jälkeen eikä silmissä ole meikkiä", caption: "Kestotaivutuksen jälkeen: omat ripset ylös taivutettuina, kevyet kuin ei mitään." } },
        { p: "Pidennykset tekevät ripsistä selvästi tuuheammat ja pidemmät, mutta vastineeksi ne vaativat enemmän hoitoa: silmiä ei hierota, öljyisiä tuotteita vältetään silmien ympärillä, ja ripset pestään ja harjataan oikein. Mikään tästä ei ole vaikeaa, kunhan siitä tulee tapa. Oppitunti [näin peset ripsienpidennykset kotona](lesson:rua-mi-noi-tai-nha) käy sen läpi vaihe vaiheelta." },
        { img: { src: img("khach-voi-bo-mi-noi-classic-day-va-dai-hon"), alt: "Vaaleahiuksinen nainen katsoo hieman alas mustissa klassisissa pidennyksissä, jotka ovat omia ripsiä pidemmät ja tuuheammat ja joissa jokainen ripsi on erillään", caption: "Klassiset pidennykset: selvästi omia ripsiä tuuheammat ja pidemmät." } },
        {
          table: {
            head: ["Ensimmäinen vuorokausi ja sen jälkeen", "Kestotaivutus", "Pidennykset"],
            rows: [
              ["Ripset kuivina", "24 tuntia, jotta taivutusaine asettuu", "24 tuntia, jotta liima asettuu"],
              ["Höyry, sauna", "Vältä ensimmäiset 24 tuntia", "Vältä ensimmäiset 24 tuntia"],
              ["Hierominen, vetäminen, nyppiminen", "Ei", "Ei"],
              ["Öljyinen meikinpoisto silmien lähellä", "Kysy tekijältä", "Vältä pysyvästi, öljy pehmentää liimaa"],
            ],
          },
        },
      ],
    },
    {
      id: "kumpi-valita",
      title: "Kumpi on parempi: kestotaivutus vai pidennykset",
      blocks: [
        { p: "Oppitunnin lyhyt vastaus: luonnolliseen ja helppoon ilmeeseen kestotaivutus, selvästi tuuheisiin ja pitkiin ripsiin pidennykset. Muutama lisäseikka auttaa päättämään nopeammin:" },
        {
          ul: [
            "Omat ripset ovat kohtuullisen pitkät mutta kasvavat suoraan tai alaspäin: kestotaivutus näyttää yleensä hyvältä, koska kärkien nostaminen riittää avaamaan silmät.",
            "Omat ripset ovat hyvin lyhyet: niitä on vaikea taivuttaa kauniiksi. Pidennykset auttavat enemmän.",
            "Omat ripset ovat harvat ja haluat täyteläisen ripsirivin: kestotaivutus ei lisää ripsiä, joten pidennykset sopivat paremmin.",
            "Et halua huoltoa kahden–kolmen viikon välein: kestotaivutus on kalenterillesi kevyempi.",
            "Sinulla on pidennykset ja haluat vaihtaa kestotaivutukseen: pidennykset poistetaan ensin salongissa.",
          ],
        },
        { img: { src: img("mi-that-da-uon-cong-duoc-go-khoi-khuon"), alt: "Mustiin käsineisiin pukeutunut tekijä irrottaa pienellä tikulla taivutetut omat ripset silikonimuotista asiakkaan suljetussa silmässä" } },
        { p: "Jos valitset pidennykset, seuraavaksi valitaan tyyli: klassiset, hybridi, volyymi tai mega. Artikkeli [millaiset ripsienpidennykset valita](lesson:4-kieu-noi-mi) vertaa neljää tyyliä samoilla kasvoilla. Kestotaivutuksen tekninen puoli, kuten muotit ja vaikutusajat, löytyy artikkelista [mikä on ripsien kestotaivutus](lesson:lash-lift-hieu-dung)." },
      ],
    },
    {
      id: "turvallisuus",
      title: "Turvallisuus: tämä koskee molempia",
      blocks: [
        { p: "Sekä kestotaivutuksessa että pidennyksissä käytetään kemikaaleja silmien lähellä: taivutusaineita, väriä jos ripset värjätään samalla, ja ripsiliimaa. Siksi:" },
        {
          ul: [
            "Kerro tekijälle, jos silmäsi ovat punaiset, kutisevat tai vuotavat, jos sinulle on hiljattain tehty silmäleikkaus tai jos olet joskus reagoinut ripsiliimaan, taivutusaineeseen tai ripsiväriin. Silloin hoitoa ei tehdä, ja se on oikea päätös.",
            "Jos ripset värjätään taivutuksen yhteydessä, moni valmistaja edellyttää ensin ihotestiä, yleensä 48 tuntia ennen käyntiä.",
            "Silmäsi ovat koko ajan kiinni. Jos jokin kirvelee tai polttaa, sano heti, niin tekijä keskeyttää.",
          ],
        },
        { img: { src: img("bo-dung-cu-uon-mi-khuon-silicone-va-thuoc"), alt: "Kultareunainen valkoinen kivitarjotin, jolla on eri kokoisia vaaleanpunaisia silikonimuotteja, ainepusseja, pieniä pulloja, ripsikampoja ja vanulappuja" } },
        { note: "Kaikki silmien terveyteen liittyvät ongelmat, kuten pitkään jatkuva punoitus, turvotus tai näön sumeneminen hoidon jälkeen, kuuluvat lääkärin tutkittaviksi. Artikkeli [akrylaattiallergia, ripsiliima ja hiusvärit](lesson:di-ung-hoa-chat) kertoo, mihin merkkeihin kannattaa kiinnittää huomiota.", kind: "warn", title: "Milloin lääkäriin" },
        { p: "Vieläkö mietit? Kysy Moja Beautysta, niin autamme valitsemaan, ja [varaa aika Moja Beautyyn](/b/moja-beauty) VaraaAissa: valitse palvelu, valitse aika, valmis." },
      ],
    },
  ],
  faq: [
    {
      q: "Kauanko ripsien kestotaivutus pysyy?",
      a: "Kestotaivutus pysyy yleensä noin kuudesta kahdeksaan viikkoa. Kun uudet ripset ovat kasvaneet suorina, taivutus uusitaan; sitä ei kannata uusia aikaisemmin kuin tuotteen valmistaja neuvoo.",
    },
    {
      q: "Kauanko ripsienpidennykset kestävät?",
      a: "Pidennykset lähtevät vähitellen omien ripsien mukana, joten kahden–kolmen viikon päästä ripsirivi alkaa näyttää harvalta. Silloin käydään huollossa, jossa aukot täytetään, eikä kaikkea tarvitse tehdä alusta.",
    },
    {
      q: "Onko kestotaivutus halvempi kuin ripsienpidennykset?",
      a: "Moja Beautyssa kestotaivutus maksaa 30 € ja klassiset pidennykset 39 €, arvonlisävero mukaan lukien. Yhden käynnin hinnan lisäksi kannattaa miettiä käyntitiheyttä: pidennykset huolletaan kahden–kolmen viikon päästä, kestotaivutus uusitaan kuuden–kahdeksan viikon päästä.",
    },
    {
      q: "Tuntuuko kestotaivutus raskaalta silmissä?",
      a: "Ei. Taivutuksen jälkeen ripset ovat edelleen omasi ilman lisäripsiä tai liimaa, joten tuntuu kuin mitään ei olisi tehty.",
    },
    {
      q: "Voiko lyhyet ripset kestotaivuttaa?",
      a: "Hyvin lyhyitä ripsiä on vaikea taivuttaa kauniiksi. Kestotaivutus sopii parhaiten kohtuullisen pitkille omille ripsille, jotka kasvavat suoraan tai alaspäin; lyhyisiin tai harvoihin ripsiin pidennykset auttavat yleensä enemmän.",
    },
    {
      q: "Voiko kestotaivutuksen ottaa, kun on ripsienpidennykset?",
      a: "Pidennykset pitää poistaa salongissa ennen taivutusta. Älä revi niitä itse, koska silloin omat ripset lähtevät helposti mukana.",
    },
  ],
  related: ["4-kieu-noi-mi", "cham-soc-sau-lam-mi", "do-cong-theo-mat", "lash-lift-hieu-dung"],
};

export default article;
