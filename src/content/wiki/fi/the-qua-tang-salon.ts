import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/the-qua-tang-salon/${name}.webp`;
const shot = (name: string) => `/wiki/the-qua-tang-salon/fi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "lahjakorttien-myynti-kampaamossa",
  lesson: "the-qua-tang-salon",
  category: "marketing",
  title: "Lahjakorttien myynti kampaamossa: luo korttipohja, lähetä kortti sähköpostilla ja tarkista koodi käynnillä",
  metaTitle: "Lahjakorttien myynti kampaamossa ja kauneushoitolassa",
  metaDescription:
    "Näin myyt lahjakortteja VaraaAissa: luo korttipohja, lähetä QR-koodillinen korttikuva sähköpostilla, vahvista maksu ja kirjaa käyttökerta asiakkaan käydessä.",
  keyword: "lahjakorttien myynti kampaamossa",
  keywords: [
    "lahjakortti myyntiin kampaamo",
    "lahjakortti kynsistudiolle",
    "lahjakortin tekeminen kauneushoitolalle",
    "lahjakortti QR-koodilla",
    "lahjakortin myynti verkkosivuilla",
    "lahjakortin koodin tarkistus",
    "lahjakortin voimassaolo ja käyttökerrat",
  ],
  excerpt: "Luo korttipohja, lähetä asiakkaalle QR-koodillinen korttikuva sähköpostilla ja kirjaa käyttökerta, kun hän tulee. Verkkosivuilta ostettu kortti aktivoidaan vahvistamalla maksu.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("nhan-vien-spa-mang-tra-cho-khach-ben-ho-nuoc"),
    alt: "Mustaan työasuun pukeutunut spa-työntekijä tuo teetarjottimen valkoiseen kylpytakkiin pukeutuneelle asiakkaalle sisäaltaan äärellä kynttilöiden ja orkideoiden keskellä",
  },
  takeaways: [
    "Aloita **luomalla vähintään yksi korttipohja**. Pohja määrää palvelun, alennuksen, voimassaolon, käyttökerrat ja hinnan.",
    "Kortin lähettämiseen tarvitset vain saajan nimen ja sähköpostin. Järjestelmä tekee **QR-koodillisen korttikuvan** ja lähettää sen suoraan saajalle.",
    "Kortti toimii vasta, kun se on **aktivoitu**: rastita maksettu-ruutu lähettäessäsi tai paina ”Vahvista maksu”, jos kortti on ostettu verkkosivuiltasi.",
    "Kun asiakas saapuu: skannaa QR tai kirjoita koodi, paina ”Tarkista koodi” ja sitten **”Kirjaa käyttökerta”**.",
    "”Myydyt / lähetetyt kortit” -listasta voit katsoa kortin, ladata sen kuvan ja lähettää sähköpostin uudelleen.",
  ],
  intro: [
    "Lahjakorttien myynti kampaamossa tuo kaksi asiaa kerralla. Salonki saa maksun ennen kuin palvelu on tehty, ja se saa uusia asiakkaita: kortteja ostetaan ystäville ja perheelle, ja lahjan saaja tulee salonkiisi. Kampaamolle, kynsistudiolle tai hoitolalle lahjakortti on myös hienovarainen tapa, jolla kanta-asiakas esittelee salongin jollekulle toiselle.",
    "Tämä artikkeli seuraa VaraaAi Academyn oppituntia ”Lahjakortit”. Opit luomaan korttipohjan, lähettämään kortin asiakkaalle sähköpostilla, aktivoimaan sen, kun maksu on tullut, ja tarkistamaan koodin, kun lahjan saaja tuo kortin salonkiin.",
  ],
  sections: [
    {
      id: "miksi-lahjakortit",
      title: "Miksi kampaamon, kynsistudion tai hoitolan kannattaa myydä lahjakortteja",
      blocks: [
        { p: "Manikyyri tai kasvohoito on helppo lahja: antajan ei tarvitse arvata kokoa tai väriä, ja saaja saa syyn hemmotella itseään. Useimmat omistajat ovat kuulleet asiakkaan kysyvän, onko salongilla lahjakortteja. Kun vastaus on kyllä, salonki saa maksun palvelusta, jota ei ole vielä tehty, ja toivottaa tervetulleeksi asiakkaan, joka ei ole käynyt ennen." },
        { p: "VaraaAin lahjakortteja ei tarvitse tulostaa. Jokainen kortti on QR-koodillinen kuva, joka lähetetään sähköpostilla, ja kortin voimassaolon tarkistus tapahtuu suoraan hallintapaneelissa. Käsin kirjoitettua vihkoa käytetyistä korteista ei tarvita." },
        { p: "Ostajan ja lahjan saajan näkymä kuvataan erikseen ohjeessa [lahjakortista kauneushoitolaan](lesson:the-qua-tang). Tämä artikkeli on omistajan puoli." },
      ],
    },
    {
      id: "korttipohja",
      title: "Lahjakortin tekeminen kauneushoitolalle: korttipohjan kuusi kenttää",
      blocks: [
        { p: "Ennen kuin voit lähettää yhtään korttia, tarvitset vähintään yhden korttipohjan. Pohja on malli: luot sen kerran, ja aina kun myyt kortin, valitset sen uudelleen. Pohjassa on kuusi kenttää:" },
        {
          table: {
            head: ["Kenttä", "Mitä se tarkoittaa", "Esimerkki oppituntivideolla"],
            rows: [
              ["”Palvelu”", "Palvelu, johon kortti käy, valitaan salongin palveluvalikosta", "Gel manicure"],
              ["”Kortin nimi”", "Nimi, joka näkyy kortissa ja listassa", "Geelimanikyyri-lahjakortti"],
              ["”Alennus (%)”", "Kortin alennus prosentteina", "20"],
              ["”Voimassa (päivää aktivoinnista)”", "Montako päivää korttia voi käyttää aktivoinnista lukien", "90"],
              ["”Käyttökertojen määrä”", "Montako kertaa korttia voi käyttää", "1"],
              ["”Arvo / hinta”", "Summa, jonka asiakas maksaa kortista, valuuttoineen", "36 EUR"],
            ],
          },
        },
        { p: "”Palvelu”-kentän vaihtoehdot tulevat salongin palvelulistasta, joten palveluvalikon on oltava olemassa ensin. Jos sitä ei vielä ole, katso ohje [salongin palveluista ja hinnoista](lesson:dich-vu)." },
        { p: "Eniten harkintaa vaativat voimassaolo ja käyttökerrat. Voimassaolo lasketaan päivästä, jolloin kortti aktivoidaan, ei siitä, kun loit pohjan. Lahjan saaja harvoin varaa heti, joten kovin lyhyt aika voi tarkoittaa, että asiakas tulee vanhentuneen kortin kanssa, ja se on kiusallista kaikille. Useampi käyttökerta sopii kortteihin, joiden kanssa haluat asiakkaan palaavan monta kertaa." },
        { img: { src: shot("voimassa-paivaa-aktivoinnista"), alt: "Korttipohjan kentät, joissa Voimassa (päivää aktivoinnista) arvolla 90 on korostettu kultaisella, alla Käyttökertojen määrä, Arvo / hinta 36 EUR ja Luo korttipohja" } },
        { note: "Nimeä kortti palvelun mukaan ja kirjoita se niin, että saaja ymmärtää heti, mitä hän saa. Kortin nimi näkyy kuvassa, jonka asiakas saa sähköpostiinsa.", kind: "tip", title: "Kortin nimi on se, minkä saaja lukee ensin" },
      ],
    },
    {
      id: "kaksi-myyntitapaa",
      title: "Kaksi myyntitapaa: lähetä hallintapaneelista tai myy lahjakortteja salongin verkkosivuilla",
      blocks: [
        { p: "Lahjakortti päätyy asiakkaalle kahta reittiä. Tärkein ero on se, kuka aktivoi kortin ja milloin." },
        {
          table: {
            head: ["Myyntitapa", "Miten se etenee", "Kortin aktivointi"],
            rows: [
              ["Sinä lähetät kortin", "Asiakas ostaa tiskiltä tai pyytää viestillä. Täytät kohdan ”Lähetä lahjakortti” ja lähetät sähköpostin", "Rastita maksettu-ruutu ennen lähettämistä, niin kortti aktivoituu heti"],
              ["Asiakas ostaa salongin verkkosivuilta", "Asiakas valitsee kortin ja tilaa sen. Kortti näkyy ”Myydyt / lähetetyt kortit” -listassa", "Painat ”Vahvista maksu”, kun raha on tullut"],
            ],
          },
        },
        { p: "Jälkimmäisessä tavassa asiakas saa koodin sähköpostiin heti tilattuaan, mutta kortti toimii vasta, kun salonki vahvistaa maksun. Sääntö suojaa salonkia: kukaan ei voi käyttää korttia, jota ei ole maksettu." },
        { img: { src: shot("vahvista-maksu"), alt: "Myydyt / lähetetyt kortit -listan kortti tilassa Odottaa maksua, painikkeet Näytä kortti, Lataa ja Lähetä sähköposti uudelleen sekä kultaisella korostettu Vahvista maksu", caption: "Verkkosivuilta ostettu kortti odottaa tilassa ”Odottaa maksua”, kunnes painat ”Vahvista maksu”." } },
        { note: "Katso ”Myydyt / lähetetyt kortit” -lista joka päivä. Kortti, jonka asiakas on maksanut mutta jota et ole vahvistanut, ei toimi, kun lahjan saaja saapuu, ja se pilaa lahjan.", kind: "warn", title: "Älä jätä maksettuja kortteja odottamaan" },
        { p: "Lahjakortit verkkosivuilla ovat käytettävissä vasta, kun salongilla on sivut. Ohje [ilmaisista verkkosivuista salongille](lesson:website-salon) näyttää, miten ne tehdään." },
      ],
    },
    {
      id: "kortti-kaynnilla",
      title: "Lahjakortin koodin tarkistus, kun asiakas tuo kortin",
      blocks: [
        { p: "Kortin tuoja on usein uusi asiakas, joka sai sen lahjaksi. Hänen ensivaikutelmansa salongista alkaa siitä, kun otat kortin vastaan, joten tämän vaiheen pitää olla nopea ja varma." },
        { p: "Skannaa kohdassa ”Tarkista ja käytä kortti” kortin QR-koodi puhelimen kameralla tai kirjoita koodi ja paina ”Tarkista koodi”. Kortti tulee näkyviin, ja siinä on se, mitä tarvitset tietää ennen palvelua:" },
        {
          ul: [
            "Kortin nimi, palvelu ja alennus.",
            "Tila, esimerkiksi ”Voimassa”.",
            "Sen asiakkaan nimi, jolle kortti annettiin.",
            "Jäljellä olevat käyttökerrat.",
            "Viimeinen voimassaolopäivä.",
          ],
        },
        { img: { src: shot("tarkista-ja-kayta-kortti"), alt: "Tarkista ja käytä kortti -ruutu, jossa kortin koodi on korostettu kultaisella, alla Tarkista koodi -painike ja voimassa oleva Geelimanikyyri-lahjakortti, käyttökertoja jäljellä 1/1" } },
        { p: "Jos kortti on voimassa ja käyttökertoja on jäljellä, tee palvelu ja paina ”Kirjaa käyttökerta”. Kortista vähennetään yksi käyttökerta. Tarkista koodi heti asiakkaan saapuessa ennen kuin aloitat, niin mahdolliset kysymykset voimassaolosta selviävät alussa." },
        { p: "Kun otat maksun vastaan kassalla, lahjakortti on yksi maksutavoista, kuten ohjeessa [kassasta ja laskuista](lesson:thanh-toan-hoa-don) näytetään. Oikean maksutavan valinta pitää lahjakorttimaksut erillään tuloraporteissa." },
      ],
    },
    {
      id: "myydyt-lahetetyt",
      title: "”Myydyt / lähetetyt kortit”: näytä, lataa ja lähetä uudelleen",
      blocks: [
        { p: "Sivun alempana on lista kaikista myydyistä ja lähetetyistä korteista. Jokaisessa rivissä näkyvät asiakkaan nimi, sähköposti, kortin koodi, pohjan nimi, hinta, jäljellä olevat käyttökerrat ja voimassaolo sekä kortin tila." },
        { img: { src: shot("myydyt-lahetetyt-kortit"), alt: "Myydyt / lähetetyt kortit -otsikko korostettuna kultaisella, alla hakukenttä ja Namin kortti tilassa Odottaa maksua painikkeineen", caption: "Jokaisella kortilla on painikkeet ”Näytä kortti”, ”Lataa” ja ”Lähetä sähköposti uudelleen”." } },
        {
          table: {
            head: ["Painike", "Milloin käytät"],
            rows: [
              ["”Näytä kortti”", "Haluat nähdä kortin, jonka asiakas sai"],
              ["”Lataa”", "Haluat korttikuvan tiedostona lähettääksesi sen muuta kautta"],
              ["”Lähetä sähköposti uudelleen”", "Asiakas ei löydä sähköpostia tai on poistanut sen"],
              ["”Vahvista maksu”", "Asiakas osti kortin verkkosivuiltasi, ja raha on tullut"],
            ],
          },
        },
        { p: "Ostaja haluaa usein antaa lahjan itse. Hän voi yksinkertaisesti välittää kortin koodin sisältävän sähköpostin lahjan saajalle. Jos asiakas haluaa ojentaa lahjan omalla tavallaan, lataa korttikuva ja lähetä se hänelle." },
      ],
    },
    {
      id: "arjen-tilanteet",
      title: "Tavallisia tilanteita lahjakorttien myynnissä",
      blocks: [
        {
          table: {
            head: ["Tilanne", "Mitä teet"],
            rows: [
              ["Korttia lähettäessä ei ole valittavaa pohjaa", "Paina ”Uusi korttipohja” ja luo ensin vähintään yksi"],
              ["Verkosta ostanut asiakas sanoo, ettei kortti toimi", "Tarkista, onko raha tullut, ja paina korttilistassa ”Vahvista maksu”"],
              ["Asiakas hukkasi sähköpostin, jossa kortti oli", "Etsi kortti kohdasta ”Myydyt / lähetetyt kortit” ja paina ”Lähetä sähköposti uudelleen”"],
              ["Asiakas ei saa QR-koodia auki", "Kirjoita kortin koodi käsin ja paina ”Tarkista koodi”"],
              ["Asiakas kysyy, montako käyttökertaa on jäljellä", "Tarkista koodi. Kortissa näkyvät jäljellä olevat käyttökerrat ja viimeinen voimassaolopäivä"],
            ],
          },
        },
        { p: "Lahjakortti tuo uuden asiakkaan kerran. Hänen pitämisensä on tuon käynnin ja [kanta-asiakasohjelman](lesson:the-tich-diem) tehtävä: aktivoi lahjan saajalle kanta-asiakaskortti samana päivänä, kun hän tulee käyttämään lahjakorttiaan." },
      ],
    },
  ],
  howTo: {
    title: "Lahjakorttien myynti kampaamossa vaihe vaiheelta VaraaAissa",
    id: "lahjakorttien-vaiheet",
    after: "korttipohja",
    lead: "Seitsemän vaihetta seuraavat yhden kortin elinkaarta samassa järjestyksessä kuin oppituntivideo.",
    steps: [
      {
        name: "Avaa ”Lahjakortit” ja paina ”Uusi korttipohja”",
        text: "Napauta hallintapaneelissa ”Lahjakortit”. Paina kohdassa ”Lahjakorttipohjat” ”Uusi korttipohja”, niin kentät aukeavat. Tarvitset vähintään yhden pohjan ennen kuin voit lähettää kortin.",
        image: { src: shot("lahjakorttipohjat-uusi-korttipohja"), alt: "Lahjakorttipohjat-osio, jonka yläreunassa on Uusi korttipohja -painike, Palvelu-kentässä Gel manicure ja Kortin nimi -kenttä korostettuna kultaisella" },
      },
      {
        name: "Täytä pohja ja paina ”Luo korttipohja”",
        text: "Valitse ”Palvelu”, kirjoita ”Kortin nimi” ja ”Alennus (%)”, päivien määrä kohtaan ”Voimassa (päivää aktivoinnista)”, ”Käyttökertojen määrä” ja ”Arvo / hinta”. Lue kentät kerran läpi ja paina ”Luo korttipohja”.",
      },
      {
        name: "Valitse ”Korttipohja” ja kirjoita saajan tiedot",
        text: "Valitse kohdassa ”Lähetä lahjakortti” ”Korttipohja”. Kirjoita ”Vastaanottajan nimi”, sähköposti ja ”Viesti kortissa”, esimerkiksi syntymäpäiväonnittelu. Puhelinnumero on valinnainen.",
        image: { src: shot("laheta-lahjakortti-korttipohja"), alt: "Lähetä lahjakortti -osio, jossa Korttipohja-valikko Geelimanikyyri-lahjakortti 36,00 € on korostettu kultaisella, alla vastaanottajan nimi, sähköposti ja viesti" },
      },
      {
        name: "Rastita maksettu-ruutu ja lähetä kortti",
        text: "Jos asiakas on jo maksanut, rastita ”Maksettu”-ruutu, joka aktivoi kortin heti. Paina sitten ”Luo korttikuva ja lähetä se sähköpostilla”. Asiakas saa QR-koodillisen korttikuvan, ja alla oleva ”Kortin esikatselu” näyttää, millaisen hän saa.",
        image: { src: shot("kortin-esikatselu"), alt: "Kortin esikatselu korostettuna kultaisella: violetti Geelimanikyyri-lahjakortti, hinta 36,00 €, vastaanottaja Claire Dubois ja QR-koodin paikka" },
      },
      {
        name: "Kun asiakas saapuu, paina ”Tarkista koodi”",
        text: "Mene kohtaan ”Tarkista ja käytä kortti”. Skannaa kortin QR-koodi puhelimen kameralla tai kirjoita koodi ja paina ”Tarkista koodi”. Kortti tulee näkyviin, ja näet, onko se yhä voimassa ja montako käyttökertaa on jäljellä.",
      },
      {
        name: "Paina ”Kirjaa käyttökerta”",
        text: "Kun asiakas käyttää korttia palveluun, paina ”Kirjaa käyttökerta”. Kortista vähennetään yksi käyttökerta. Älä ohita tätä vaihetta, muuten kortissa säilyvät kaikki käyttökerrat.",
        image: { src: shot("kirjaa-kayttokerta"), alt: "Koodin tarkistuksen tulos, jossa voimassa oleva Geelimanikyyri-lahjakortti on korostettu kultaisella ja alla musta Kirjaa käyttökerta -painike" },
      },
      {
        name: "Vahvista maksu verkosta ostetuille korteille",
        text: "Myös kortit, joita asiakkaat ostavat salongin verkkosivuilta, näkyvät ”Myydyt / lähetetyt kortit” -listassa. Kun raha on tullut, aktivoi kortti painamalla ”Vahvista maksu”.",
      },
    ],
  },
  faq: [
    {
      q: "Mitä minun pitää tehdä ensin, jotta voin myydä lahjakortteja VaraaAissa?",
      a: "Luo vähintään yksi korttipohja. Pohja määrää palvelun, alennuksen, voimassaolon, käyttökerrat ja hinnan. Vasta sen jälkeen voit lähettää kortteja asiakkaille.",
    },
    {
      q: "Miten asiakas saa lahjakortin?",
      a: "Valitset pohjan, kirjoitat saajan nimen, sähköpostin ja viestin ja painat ”Luo korttikuva ja lähetä se sähköpostilla”. Asiakas saa QR-koodillisen korttikuvan sähköpostiinsa.",
    },
    {
      q: "Milloin salongin verkkosivuilta ostettu lahjakortti aktivoituu?",
      a: "Kun painat ”Vahvista maksu”. Asiakas saa koodin sähköpostiin heti tilattuaan, mutta kortti toimii vasta, kun salonki vahvistaa maksun.",
    },
    {
      q: "Mitä teen, kun asiakas tuo lahjakortin salonkiin?",
      a: "Skannaa kortin QR-koodi tai kirjoita koodi ja paina ”Tarkista koodi”, niin näet, onko kortti voimassa ja montako käyttökertaa on jäljellä. Paina sen jälkeen ”Kirjaa käyttökerta”.",
    },
    {
      q: "Mistä lahjakortin voimassaolo lasketaan?",
      a: "Voimassaolokenttä on päivien määrä aktivoinnista. Aika alkaa, kun kortti aktivoidaan, ja viimeinen voimassaolopäivä näkyy, kun tarkistat koodin.",
    },
    {
      q: "Mitä jos asiakas hukkaa lahjakortin sisältävän sähköpostin?",
      a: "Etsi kortti ”Myydyt / lähetetyt kortit” -listasta ja paina ”Lähetä sähköposti uudelleen”. Sieltä voit myös katsoa kortin ja ladata sen kuvan.",
    },
  ],
  related: ["the-tich-diem", "khach-dan-khach", "thanh-toan-hoa-don", "the-qua-tang"],
};

export default article;
