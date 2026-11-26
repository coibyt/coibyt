import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/theo-doi-salon/${name}.webp`;
const shot = (name: string) => `/wiki/theo-doi-salon/fi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "seuraa-salonkia-tarjoukset-ja-tuotteet",
  lesson: "theo-doi-salon",
  category: "booking",
  title: "Salongin tarjoukset syötteeseesi: seuraa salonkia VaraaAissa ja osta sen tuotteita",
  metaTitle: "Salongin tarjoukset: seuraa salonkia ja osta tuotteita",
  metaDescription:
    "Näin seuraat salonkia VaraaAissa ja näet sen tarjoukset ja uudet tyylit syötteessäsi, sekä näin ostat salongin tuotteita: kori, maksutavat ja nouto salongista.",
  keyword: "salongin tarjoukset",
  keywords: [
    "seuraa salonkia",
    "kampaamon tarjoukset",
    "osta salongin tuotteita netistä",
    "kynsinauhaöljy kynsistudiosta",
    "lopeta salongin seuraaminen",
    "tuotteiden nouto salongista",
  ],
  excerpt: "Paina ”Seuraa”, niin vakiosalonkisi tarjoukset ja uudet tyylit näkyvät syötteessäsi, ja tilaa salongin hoitotuotteita noudettavaksi salongista.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-xem-bang-tin-salon-tren-dien-thoai"),
    alt: "Nuori nainen, jolla on pitkät aaltoilevat hiukset ja kermanvärinen neule, istuu sohvalla ikkunan vieressä ja katsoo hymyillen puhelintaan",
  },
  takeaways: [
    "**”Seuraa”**-painike on salongin sivulla ”Varaa aika” -painikkeen alla. Kun painat sitä, painikkeessa lukee ”Seurataan”.",
    "Seuraamiesi salonkien uudet julkaisut näkyvät **uutissyötteessä**: avaa se napauttamalla nimeäsi ylhäällä.",
    "Jos salonki myy tuotteita, sen sivulla on **”Tuotteet”**-painike, joka avaa salongin kaupan.",
    "Tilatessasi valitset yhden kolmesta maksutavasta: salongilla, tilisiirrolla tai sopimalla salongin kanssa.",
    "Tuotteet **noudetaan salongista**. Salonki ottaa yhteyttä ja sopii noutoajan.",
  ],
  intro: [
    "Kun sinulla on oma vakiosalonki, haluat tietää ajoissa, milloin siellä on tarjouksia, uusia tyylejä tai uutisia. Salongin tarjoukset saat VaraaAissa näkyviin yhdellä napautuksella seuraamalla salonkia: siitä lähtien sen uudet julkaisut ilmestyvät syötteeseesi itsestään.",
    "Tämä ohje seuraa VaraaAi Academyn oppituntia ”Seuraa salonkeja, syöte ja kauppa”. Opit, mistä salonkia seurataan, miten syötettä luetaan ja miten tilaat salongin myymiä hoitotuotteita ostoskorista noutoon asti.",
  ],
  sections: [
    {
      id: "miksi-seurata",
      title: "Miksi salonkia kannattaa seurata",
      blocks: [
        { p: "Seuraaminen ei sido sinua mihinkään. Se ei varaa aikaa puolestasi eikä maksa mitään. Ainoa muutos on syötteesi sisältö: salongin julkaisut tulevat luoksesi, eikä sinun tarvitse käydä jokaisen salongin sivulla erikseen." },
        { p: "Seuraaminen sopii kolmenlaisille asiakkaille:" },
        {
          ul: [
            "Niille, joilla on **vakiosalonki** ja jotka eivät halua missata sen alennuksia.",
            "Niille, jotka **vertailevat muutamaa salonkia** ja haluavat nähdä, mitä kukin julkaisee ennen valintaa.",
            "Niille, jotka **ostavat usein hoitotuotteita** salongista ja haluavat tietää uutuuksista.",
          ],
        },
        { note: "Kun [asennat VaraaAi-sovelluksen](lesson:cai-app) puhelimeesi, syöte on heti sovelluksessa. Avaa se, niin näet seuraamiesi salonkien tarjoukset, uudet tyylit ja uutiset.", kind: "tip", title: "Syöte nopeammin käsille" },
      ],
    },
    {
      id: "mita-syotteessa-on",
      title: "Mitä syötteessä on",
      blocks: [
        { p: "Syöte-sivulla kerrotaan, että siinä ovat seuraamiesi salonkien uusimmat julkaisut. Ylimpänä on rivi ”Seuraamasi salongit” ja kunkin salongin logo. Alempana ovat julkaisut, joissa näkyvät salongin nimi ja julkaisuaika." },
        { p: "Julkaisut ovat yleensä niitä kolmea lajia, jotka oppitunti mainitsee: tarjouksia, uusia tyylejä ja salongin uutisia. Oppitunnin videon tarjousjulkaisussa on ”Tarjous”-merkintä, lyhyt teksti ja kuva, ja heti sen alla on ”Varaa aika” -painike." },
        { img: { src: shot("salongin-tarjous-syotteessa"), alt: "Lumi Beauty Paris -salongin tarjousjulkaisu syötteessä kultaisella korostettuna: joulukuun geelialennus, kylpyläkuva ja alla Varaa aika -painike", caption: "Salongin tarjousjulkaisu syötteessä." } },
        { p: "”Varaa aika” -painike tekee syötteestä tavallista uutissivua hyödyllisemmän. Salonkien tarjoukset ovat usein määräaikaisia, ja voit varata heti lukiessasi sen sijaan, että asia unohtuu. Painalluksen jälkeiset vaiheet ovat samat kuin ohjeessa [ajanvaraus netissä](lesson:dat-lich-online)." },
      ],
    },
    {
      id: "tuotteiden-osto",
      title: "Salongin tuotteiden osto: maksu ja nouto",
      blocks: [
        { p: "Monet salongit myyvät myös hoitotuotteita kotikäyttöön käyntien väliin, esimerkiksi kynsinauhaöljyä. VaraaAissa ne ovat salongin kaupassa, jonka avaat salongin sivun ”Tuotteet”-painikkeesta. Tilaat verkossa ja noudat salongista, toimitusta ei ole." },
        { p: "Tilatessasi valitset yhden kolmesta maksutavasta:" },
        {
          table: {
            head: ["Maksutapa", "Miten se toimii", "Sopii, kun"],
            rows: [
              ["Maksu salongilla", "Käteisellä tai kortilla noudettaessa", "Olet menossa salonkiin pian, esimerkiksi varauksesi päivänä"],
              ["Tilisiirto", "Saat tilitiedot heti tilauksen jälkeen", "Haluat maksaa etukäteen tai joku muu noutaa puolestasi"],
              ["Sovi salongin kanssa", "Sovit maksusta salongin kanssa viestillä", "Sinulla on erityistoive, josta pitää sopia ensin"],
            ],
          },
        },
        { note: "Kenttään ”Viesti salongille” voit kirjoittaa, milloin aiot noutaa tilauksen. Oppitunnin videolla asiakas kirjoittaa hakevansa sen lauantai-iltapäivänä. Tällainen viesti auttaa salonkia pitämään tilauksen valmiina ja säästää yhden kysymyksen.", kind: "tip", title: "Kirjoita viesti tilatessasi" },
        { p: "Kun olet vahvistanut tilauksen, salonki ottaa yhteyttä vahvistaakseen sen ja sopiakseen noutoajan. Helpointa on yleensä noutaa tilaus seuraavalla hoitokäynnillä." },
      ],
    },
    {
      id: "tavallisia-tilanteita",
      title: "Tavallisia tilanteita seuraamisessa ja tuotetilauksissa",
      blocks: [
        {
          table: {
            head: ["Tilanne", "Mitä teet"],
            rows: [
              ["Haluat lopettaa salongin julkaisujen näkymisen", "Napauta nimeäsi ylhäällä, avaa ”Seurataan” ja paina salongin kohdalla ”Lopeta seuraaminen”"],
              ["Syöte on tyhjä", "Et vielä seuraa yhtään salonkia, tai seuraamasi salongit eivät ole julkaisseet mitään. Avaa salongin sivu ja paina ”Seuraa”"],
              ["Et ole varma, seuraatko jo salonkia", "Avaa salongin sivu: ”Seurataan” tarkoittaa, että seuraat, ”Seuraa” että et"],
              ["Salongin sivulla ei ole ”Tuotteet”-painiketta", "Salonki ei ehkä ole avannut tuotekauppaa VaraaAissa. Kysy salongilta, jos haluat ostaa jotain"],
              ["Haluat kysyä tuotteesta ennen ostoa", "Käytä salongin sivun ”Keskustele salongin kanssa” -painiketta"],
              ["Tilasit, mutta et tiedä, milloin noutaa", "Odota, että salonki ottaa yhteyttä ja kertoo noutoajan"],
            ],
          },
        },
        { p: "Kun haluat tietää tuotteen ainesosista, käytöstä tai siitä, mikä sopii kynsillesi tai hiuksillesi, [lähetä viesti salongille](lesson:chat-voi-salon) ennen tilausta. Sinua hoitava tekijä tietää parhaiten, mitä kannattaa käyttää." },
      ],
    },
    {
      id: "vakioasiakkaan-tavat",
      title: "Seuraaminen, kanta-asiakaskortti ja arvostelut: vakioasiakkaan kolme tapaa",
      blocks: [
        { p: "Seuraaminen tuo sinulle salongin uutiset. Kaksi muuta tapaa tuovat etuja ja äänen. [Kanta-asiakaskortilla](lesson:the-thanh-vien) saat jokaisesta käynnistä lipun ja täydestä kortista alennuksen. Jokaisen käynnin jälkeen voit [kirjoittaa arvostelun](lesson:viet-danh-gia), jotta salonki tietää, mistä pidit." },
        { note: "Salongit avaavat kauppansa, vahvistavat tilaukset ja ilmoittavat asiakkaille sähköpostilla hallintapaneelista. Katso oppitunti [Myy tuotteita ja hallitse tilauksia](lesson:san-pham-don-hang).", kind: "info", title: "Omistatko salongin?" },
      ],
    },
  ],
  howTo: {
    title: "Salongin seuraaminen, syöte ja tuotteiden osto vaihe vaiheelta",
    id: "seuraamisen-vaiheet",
    after: "miksi-seurata",
    lead: "Neljä ensimmäistä vaihetta ovat seuraaminen ja syötteen lukeminen. Neljää viimeistä tarvitset vain, kun haluat ostaa salongin tuotteita.",
    steps: [
      {
        name: "Avaa salongin sivu ja paina ”Seuraa”",
        text: "Etsi salonki [hakusivulta](/search) ja avaa sen sivu. Sydämellä merkitty ”Seuraa”-painike on ”Varaa aika”- ja ”Keskustele salongin kanssa” -painikkeiden alla. Yksi painallus riittää.",
        image: { src: shot("paina-seuraa-salongin-sivulla"), alt: "Lumi Beauty Paris -salongin sivu VaraaAissa, jossa sydämellä merkitty Seuraa-painike on korostettu kultaisella Tuotteet-painikkeen vieressä" },
      },
      {
        name: "Tarkista, että painikkeessa lukee ”Seurataan”",
        text: "Painalluksen jälkeen painikkeessa lukee ”Seurataan”. Kun näet sen, seuraat salonkia, ja sen uudet julkaisut näkyvät tästä lähtien syötteessäsi.",
        image: { src: shot("painike-muuttuu-seurataan"), alt: "Salongin sivu seuraamisen jälkeen: Seurataan-painike on korostettu kultaisella, vieressä Tuotteet ja alla Fanisivu" },
      },
      {
        name: "Avaa ”Uutissyöte”",
        text: "Napauta nimeäsi sivun yläreunassa ja valitse ”Uutissyöte”. Syöte-sivu kokoaa kaikkien seuraamiesi salonkien uusimmat julkaisut yhteen paikkaan.",
        image: { src: shot("avaa-uutissyote-tilivalikosta"), alt: "VaraaAin Syöte-sivu, jossa tilipainike on korostettu, alla Seuraamasi salongit -rivi ja ensimmäinen salongin julkaisu" },
      },
      {
        name: "Lue julkaisut ja varaa suoraan niiden alta",
        text: "Vieritä alas ja lue tarjoukset, uudet tyylit ja uutiset. Kun näet sopivan tarjouksen, paina julkaisun alla ”Varaa aika”, niin varaat heti palaamatta salongin sivulle.",
        image: { src: shot("varaa-aika-julkaisun-alla"), alt: "Salongin julkaisu syötteessä, jossa violetti Varaa aika -painike on korostettu kultaisella Tykkää-, Kommentoi- ja Jaa-painikkeiden yläpuolella" },
      },
      {
        name: "Paina salongin sivulla ”Tuotteet”",
        text: "Kun haluat ostaa hoitotuotteita, avaa salongin sivu ja paina ”Tuotteet”. Salongin kauppa aukeaa, ja jokaisesta tuotteesta näkyvät kuva, nimi ja hinta.",
        image: { src: shot("paina-tuotteet-salongin-kauppa"), alt: "Lumi Beauty Paris -salongin sivu, jossa Tuotteet-painike on korostettu kultaisella Seurataan-painikkeen vieressä" },
      },
      {
        name: "Napauta haluamasi tuotteen kassikuvaketta",
        text: "Jokaisen tuotteen kuvassa on kassikuvake. Napauta sitä, niin tuote lisätään ostoskoriin. Kun kaikki on valittu, avaa ostoskori näytön alareunasta ja tarkista sisältö.",
        image: { src: shot("lisaa-tuote-koriin"), alt: "Salongin kauppa ja Ammattilaisten valinnat: Lumi-kynsinauhaöljy 15 ml hintaan 18 euroa, kuvan kulmassa kassikuvake" },
      },
      {
        name: "Paina ”Siirry kassalle” ja valitse maksutapa",
        text: "Paina ostoskorissa ”Siirry kassalle”. Valitse yksi kolmesta maksutavasta: maksu salongilla noudon yhteydessä, tilisiirto tai sopiminen salongin kanssa viestillä. Kirjoita tarvittaessa ”Viesti salongille”.",
        image: { src: shot("valitse-maksutapa-tilaukselle"), alt: "Kassanäkymä, jossa kolme maksutapaa on korostettu kultaisella: Maksu salongilla, Tilisiirto ja Sovi salongin kanssa" },
      },
      {
        name: "Paina ”Vahvista tilaus”",
        text: "Tarkista tilaus ja paina ”Vahvista tilaus”. Näytölle tulee ”Tilaus vastaanotettu!” sekä tilauksen yhteenveto ja loppusumma. Salonki ottaa yhteyttä ja sopii noudosta.",
        image: { src: shot("tilaus-vastaanotettu-nouto-salongista"), alt: "Tilaus vastaanotettu -näkymä kultaisella korostettuna: salonki ottaa yhteyttä vahvistaakseen tilauksen ja noutoajan, alla tilaus ja yhteissumma" },
      },
    ],
  },
  faq: [
    {
      q: "Mitä hyötyä salongin seuraamisesta VaraaAissa on?",
      a: "Salongin uudet julkaisut näkyvät syötteessäsi, myös tarjoukset, uudet tyylit ja uutiset. Tiedät heti, kun vakiosalongillasi on kampanja, käymättä sen sivulla.",
    },
    {
      q: "Missä ”Seuraa”-painike on?",
      a: "Salongin sivulla, ”Varaa aika” -painikkeen alapuolella. Kun painat sitä, painikkeessa lukee ”Seurataan”.",
    },
    {
      q: "Miten lopetan salongin seuraamisen?",
      a: "Napauta nimeäsi ylhäällä, avaa ”Seurataan” ja paina ”Lopeta seuraaminen” sen salongin kohdalla, jonka julkaisuja et enää halua nähdä.",
    },
    {
      q: "Mistä salongin kaupasta ostetut tuotteet noudetaan?",
      a: "Salongista. Tilaat verkossa, ja salonki ottaa sen jälkeen yhteyttä ja sopii kanssasi noutoajan.",
    },
    {
      q: "Miten salongin tuotteet voi maksaa?",
      a: "Kolmella tavalla: salongilla noudon yhteydessä, tilisiirrolla tai sopimalla maksusta salongin kanssa viestillä. Valitset kassalla itsellesi sopivimman tavan.",
    },
    {
      q: "Maksaako salongin seuraaminen tai tekeekö se varauksia automaattisesti?",
      a: "Ei. VaraaAi on asiakkaille maksuton, ja seuraaminen vain tuo salongin julkaisut syötteeseesi. Varaus syntyy vain, kun varaat ja vahvistat sen itse.",
    },
  ],
  related: ["the-thanh-vien", "the-qua-tang", "hoa-don", "chat-voi-salon"],
};

export default article;
