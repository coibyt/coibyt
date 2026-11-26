import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/lich-hen-cua-toi/${name}.webp`;
const shot = (name: string) => `/wiki/lich-hen-cua-toi/fi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "ajanvarauksen-peruminen",
  lesson: "lich-hen-cua-toi",
  category: "booking",
  title: "Ajanvarauksen peruminen ja varausten tarkistaminen VaraaAissa: näin perut kampaamo- tai kauneushoitola-ajan",
  metaTitle: "Ajanvarauksen peruminen ja varauksen tarkistus | VaraaAi",
  metaDescription:
    "Näin tarkistat ja perut ajanvarauksen VaraaAin Varaukseni-osiossa: varauksen tiedot, salongin peruutusehdot ja mitä tehdä, kun peruutusaika on jo umpeutunut.",
  keyword: "ajanvarauksen peruminen",
  keywords: [
    "peru kampaamoaika",
    "kampaamon peruutusehdot",
    "kynsiajan peruminen",
    "ajan siirtäminen kampaamossa",
    "tarkista varaus",
    "VaraaAi Varaukseni",
  ],
  excerpt: "Avaa ”Varaukseni”, niin näet kellonajan ja salongin osoitteen ja voit perua itse salongin määräajan sisällä soittamatta.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-xem-lai-lich-hen-lam-dep-tren-dien-thoai"),
    alt: "Vaaleahiuksinen nainen luumunvärisessä huivissa istuu ikkunan ääressä ja katsoo keskittyneesti puhelintaan, pöydällä on kahvikuppi",
  },
  takeaways: [
    "Kaikki varauksesi löytyvät kohdasta **”Varaukseni”**, jonka avaat napauttamalla nimeäsi ylhäällä.",
    "Painamalla ”Näytä varauksen tiedot” näet tekijän, kellonajan sekä salongin **osoitteen ja puhelinnumeron**.",
    "Peruminen: paina ”Peru varaus”, lue ”Peruutusehdot” ja paina ”Vahvista peruutus”.",
    "Jokainen salonki määrittää oman **peruutusaikansa**, esimerkiksi viimeistään 24 tuntia ennen varattua aikaa. Sen jälkeen ota yhteyttä suoraan salonkiin.",
    "Perutun varauksen tilaksi tulee ”Peruttu”. Kun perut ajoissa, salonki ehtii tarjota ajan toiselle asiakkaalle.",
  ],
  intro: [
    "Kun tulee este ja ajanvarauksen peruminen on edessä, tai haluat vain tarkistaa, mihin aikaan ja mihin salonkiin varasit, salonkiin ei tarvitse soittaa ja odottaa, että joku vastaa. VaraaAissa hoidat molemmat itse kohdassa ”Varaukseni”.",
    "Tämä ohje seuraa VaraaAi Academyn oppituntia ”Katso ja peru varaus”. Opit, mistä varaukset löytyvät, miten varauksen tiedot luetaan, miten perut oikein salongin määräajan sisällä ja mitä tehdä, kun määräaika on jo umpeutunut.",
  ],
  sections: [
    {
      id: "mita-varaukseni-kertoo",
      title: "Mitä ”Varaukseni” kertoo",
      blocks: [
        { p: "Tässä luettelossa ovat kaikki tililläsi tehdyt varaukset. Jokainen varaus on oma korttinsa, ja jo kortista näet tärkeimmät tiedot avaamatta mitään muuta." },
        {
          table: {
            head: ["Haluat tietää", "Mistä katsot"],
            rows: [
              ["Mikä salonki ja mikä palvelu", "Kortin kaksi ensimmäistä riviä: salongin nimi ja palvelu"],
              ["Päivä ja kellonaika", "Palvelun alla oleva rivi"],
              ["Hinta", "Summa kortin vasemmassa alakulmassa"],
              ["Onko salonki hyväksynyt varauksen", "Tilamerkintä, esimerkiksi ”Vahvistettu”"],
              ["Kuka hoidon tekee, missä salonki on ja mihin soitat", "Paina ”Näytä varauksen tiedot”"],
            ],
          },
        },
        { img: { src: shot("jata-arvostelu-kaynnin-jalkeen"), alt: "Varaukseni-luettelo, jossa varauskorteissa näkyvät hinnat, tilat Vahvistettu ja Peruttu, Näytä varauksen tiedot sekä korostettu Jätä arvostelu -painike", caption: "Jokainen varaus on kortti, jossa näkyvät hinta, tila ja toimintopainikkeet." } },
        { p: "Osio näkyy vain kirjautuneena. Jos annoit ensimmäisen varauksen tietovaiheessa sähköpostin ja salasanan, tilisi on jo olemassa. Jos et ole varma, miten kirjaudut, tai salasana on unohtunut, katso ohje [luo tili ja kirjaudu](lesson:tai-khoan)." },
      ],
    },
    {
      id: "peruutusaika",
      title: "Peruutusaika ja salongin peruutusehdot",
      blocks: [
        { p: "VaraaAi ei määrää kaikille salongeille yhteistä peruutusaikaa. Jokainen salonki kirjaa omansa peruutusehtoihinsa, ja näet ehdot kahdesti: varausta vahvistaessasi ja painaessasi ”Peru varaus”. Oppitunnin videolla esimerkkisalongin ehdoissa lukee, että voit perua tai siirtää aikasi maksutta viimeistään 24 tuntia ennen varausta ja että myöhemmistä perumisista ja käyttämättä jääneistä ajoista salonki voi periä maksun." },
        { p: "Määräajalle on käytännön syy. Viime hetkellä vapautuvaa aikaa salonki ei juuri ehdi täyttää, ja tekijä, jolle aika oli varattu, jää odottamaan. Mitä aiemmin perut, sitä todennäköisemmin aika päätyy toiselle asiakkaalle, joka sitä tarvitsee." },
        { note: "Jos itse perumisen aika on umpeutunut, ota yhteyttä suoraan salonkiin. Salonki voi perua tai siirtää varauksen puolestasi. Salongin puhelinnumero löytyy kohdasta ”Näytä varauksen tiedot”.", kind: "warn", title: "Peruutusaika on umpeutunut" },
      ],
    },
    {
      id: "ajan-siirtaminen",
      title: "Haluatko siirtää ajan perumisen sijaan?",
      blocks: [
        { p: "Oppitunti näyttää kaksi asiaa, jotka asiakas tekee tässä osiossa: tarkistamisen ja perumisen. Ajan siirtämisen toiseen kellonaikaan tekee salonki puolestasi. Kun haluat toisen ajan, helpointa on kertoa salongille, milloin haluaisit tulla." },
        {
          ul: [
            "**Soita:** salongin puhelinnumero on kohdassa ”Näytä varauksen tiedot”.",
            "**Lähetä viesti:** avaa salongin sivu ja käytä [salongin chattia](lesson:chat-voi-salon), salonki vastaa samassa keskustelussa.",
            "**Varaa itse uudelleen:** jos peruutusaika ei ole vielä umpeutunut, peru vanha varaus ja [tee uusi varaus](lesson:dat-lich-online) paremmin sopivaan aikaan.",
          ],
        },
        { note: "Kun varaat itse uudelleen, tarkista ensin, että salongilla on vapaata haluamanasi päivänä, ja peru vanha aika vasta sitten. Jos perut ensin ja päivä onkin täynnä, menetät molemmat.", kind: "tip", title: "Kokemuksesta" },
      ],
    },
    {
      id: "tavallisia-tilanteita",
      title: "Tavallisia tilanteita tehdyn varauksen kanssa",
      blocks: [
        {
          table: {
            head: ["Tilanne", "Mitä teet"],
            rows: [
              ["Kellonaika on unohtunut", "Avaa ”Varaukseni”: päivä ja kellonaika näkyvät kortissa"],
              ["Et muista salongin osoitetta", "Paina ”Näytä varauksen tiedot”: osoite ja puhelinnumero ovat tietoruudussa"],
              ["Painoit ”Peru varaus” vahingossa", "Paina peruutusehtojen kohdalla ”Pidä varaus” äläkä ”Vahvista peruutus”. Mikään ei muutu"],
              ["Peruutusaika on umpeutunut", "Ota yhteyttä suoraan salonkiin ja pyydä perumaan tai siirtämään varaus"],
              ["Peruit, mutta haluatkin sittenkin mennä", "Tee uusi varaus salongin sivulla"],
              ["Luettelossa ei näy varauksia", "Tarkista, että olet kirjautunut samalle tilille, jolla varasit"],
            ],
          },
        },
      ],
    },
    {
      id: "kaynnin-jalkeen",
      title: "Käynnin jälkeen: palaa jättämään arvostelu",
      blocks: [
        { p: "”Varaukseni” on hyödyllinen myös hoidon jälkeen. Varauskortissa on ”Jätä arvostelu” -painike. Paina sitä, anna tähdet ja kirjoita muutama rivi siitä, miten käynti meni. Oppitunti [kirjoita arvostelu käynnin jälkeen](lesson:viet-danh-gia) näyttää, miten se tehdään." },
        { p: "Jos käyt samassa salongissa säännöllisesti, kysy [kanta-asiakaskortista](lesson:the-thanh-vien): jokaisesta käynnistä saa leiman, ja täydestä kortista alennuksen. Varaukset aukeavat nopeammin, kun [asennat VaraaAi-sovelluksen](/app) puhelimesi aloitusnäytölle." },
      ],
    },
  ],
  howTo: {
    title: "Ajanvarauksen tarkistaminen ja peruminen VaraaAissa vaihe vaiheelta",
    id: "perumisen-vaiheet",
    after: "mita-varaukseni-kertoo",
    lead: "Kolme ensimmäistä vaihetta ovat varauksen tarkistamista, kolme viimeistä perumista. Jos tarvitset vain kellonajan, voit lopettaa kolmanteen vaiheeseen.",
    steps: [
      {
        name: "Avaa ”Varaukseni”",
        text: "Kirjaudu VaraaAihin. Napauta nimeäsi sivun yläreunassa ja valitse aukeavasta valikosta ”Varaukseni”. Varauksesi näkyvät erillisinä kortteina.",
        image: { src: shot("avaa-varaukseni-tilivalikosta"), alt: "Varaukseni-sivu tabletilla, oikean yläkulman tilipainike on korostettu kultaisella ja alla näkyy kaksi varauskorttia" },
      },
      {
        name: "Lue varauskortti",
        text: "Jokaisessa kortissa näkyvät salonki, palvelu, päivä ja kellonaika, hinta ja tila, esimerkiksi ”Vahvistettu”. Etsi oikea varaus ennen kuin painat mitään, varsinkin jos sinulla on samassa salongissa useampi aika.",
        image: { src: shot("varauskortti-salonki-palvelu-aika-hinta"), alt: "Kultaisella korostettu varauskortti, jossa näkyvät salonki, geelilakkaus, päivä ja kellonaika, 45 euroa ja tila Vahvistettu" },
      },
      {
        name: "Paina ”Näytä varauksen tiedot”",
        text: "Aukeaa tietoruutu, jossa ovat tekijän nimi, kellonaika sekä salongin osoite ja puhelinnumero. Täältä saat osoitteen reittiohjeita varten tai numeron, jos haluat soittaa.",
        image: { src: shot("nayta-varauksen-tiedot-tekija-osoite-puhelin"), alt: "Varauksen tietoruutu, jossa näkyvät salonki, palvelu, tekijä Emma, kellonaika, osoite, puhelinnumero ja hinta" },
      },
      {
        name: "Paina ”Peru varaus”",
        text: "Jos haluat perua, ”Peru varaus” -painike on saman ruudun alaosassa. Painallus ei peru varausta heti, vaan ensin näet salongin peruutusehdot.",
        image: { src: shot("paina-peru-varaus"), alt: "Varauksen tietoruutu VaraaAissa, jonka alaosassa punareunainen Peru varaus -painike on korostettu kultaisella" },
      },
      {
        name: "Lue ”Peruutusehdot” ja paina ”Vahvista peruutus”",
        text: "Kohta ”Peruutusehdot” kertoo, mihin asti voit perua itse, esimerkiksi viimeistään 24 tuntia ennen varattua aikaa. Kun olet lukenut ehdot, peru painamalla ”Vahvista peruutus”. Jos muutat mielesi, paina ”Pidä varaus”.",
        image: { src: shot("peruutusehdot-ja-vahvista-peruutus"), alt: "Salongin peruutusehdot ja niiden alla korostettu punainen Vahvista peruutus -painike sekä vieressä Pidä varaus" },
      },
      {
        name: "Tarkista tila ”Peruttu”",
        text: "Luettelossa perumasi varauksen tilana on nyt ”Peruttu” eikä ”Vahvistettu”. Kun näet tämän, peruutus on tehty ja aika on taas salongin käytettävissä.",
        image: { src: shot("varauksen-tila-peruttu"), alt: "Varaukseni-luettelo, jossa geelilakkauksen varauskortti on korostettu kultaisella ja sen tilana näkyy Peruttu" },
      },
    ],
  },
  faq: [
    {
      q: "Missä perun ajanvarauksen VaraaAissa?",
      a: "Kirjaudu sisään, napauta nimeäsi ylhäällä ja valitse ”Varaukseni”. Paina peruttavan varauksen kohdalla ”Näytä varauksen tiedot” ja sitten ”Peru varaus”, lue peruutusehdot ja paina ”Vahvista peruutus”.",
    },
    {
      q: "Kuinka paljon etukäteen ajan voi perua?",
      a: "Se riippuu salongista. Jokainen salonki määrittää oman peruutusaikansa ”Peruutusehdot”-kohdassa, jonka näet painaessasi ”Peru varaus”. Oppitunnin esimerkissä voit perua itse viimeistään 24 tuntia ennen varattua aikaa.",
    },
    {
      q: "Mitä teen, jos peruutusaika on jo umpeutunut?",
      a: "Ota yhteyttä suoraan salonkiin. Salonki voi perua tai siirtää varauksen puolestasi. Salongin puhelinnumero on kyseisen varauksen kohdassa ”Näytä varauksen tiedot”.",
    },
    {
      q: "Miten siirrän varatun ajan?",
      a: "Pyydä salonkia siirtämään varaus puhelimitse tai viestillä. Jos peruutusaika ei ole vielä umpeutunut, voit myös perua vanhan varauksen ja tehdä uuden toiseen aikaan.",
    },
    {
      q: "Mistä tiedän, että peruutus onnistui?",
      a: "Kun painat ”Vahvista peruutus”, varauksen tilaksi luettelossa muuttuu ”Peruttu”. Jos kortissa lukee yhä ”Vahvistettu”, varausta ei ole peruttu.",
    },
    {
      q: "Mistä näen varaamani salongin osoitteen ja puhelinnumeron?",
      a: "Paina kohdassa ”Varaukseni” varauksen ”Näytä varauksen tiedot”. Tietoruudussa näkyvät tekijä, kellonaika sekä salongin osoite ja puhelinnumero.",
    },
  ],
  related: ["chat-voi-salon", "viet-danh-gia", "dat-lich-online", "tai-khoan"],
};

export default article;
