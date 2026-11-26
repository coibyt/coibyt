import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/tai-khoan/${name}.webp`;
const shot = (name: string) => `/wiki/tai-khoan/fi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "tilin-luominen-ajanvaraukseen",
  lesson: "tai-khoan",
  category: "booking",
  title: "Tilin luominen ajanvaraukseen VaraaAissa: rekisteröidy, kirjaudu sisään ja vaihda unohtunut salasana",
  metaTitle: "Tilin luominen ajanvaraukseen VaraaAissa minuutissa",
  metaDescription:
    "Tilin luominen ajanvaraukseen VaraaAissa: rekisteröidy maksutta minuutissa, kirjaudu sisään, vaihda unohtunut salasana ja tutustu tilisi eri osioihin.",
  keyword: "tilin luominen ajanvaraukseen",
  keywords: [
    "VaraaAi luo tili",
    "VaraaAi kirjaudu sisään",
    "unohditko salasanan VaraaAi",
    "salasanan vaihto ajanvaraus",
    "onko VaraaAi-tili maksuton",
    "vaihda sähköposti ja salasana",
  ],
  excerpt: "Rekisteröidy maksutta minuutissa, kirjaudu sisään, vaihda unohtunut salasana ja katso, mihin tilisi eri osioita käytetään.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-thu-gian-tai-spa-sau-khi-co-tai-khoan-varaaai"),
    alt: "Valkoiseen kylpytakkiin pukeutunut nainen rentoutuu tyylikkään kylpylän altaan reunalla, kun työntekijä tuo hänelle teetarjottimen",
  },
  takeaways: [
    "VaraaAi-tilin luominen on **maksutonta** ja vie noin minuutin.",
    "Täytät viisi kenttää: ”Koko nimi”, ”Sähköposti”, ”Puhelinnumero”, ”Salasana” ja ”Vahvista salasana”.",
    "Tarjousten vastaanottaminen on oma valintasi: ”Sähköpostilla”, ”Tekstiviestillä”, molemmat tai ei kumpaakaan.",
    "Jos salasana unohtuu, paina ”Unohditko salasanan?”, anna sähköpostisi ja seuraa sähköpostiin tulevaa **vaihtolinkkiä**.",
    "Kirjautuneena napautat **nimeäsi ylhäällä**, niin tilin kaikki osiot aukeavat. Sähköpostin ja salasanan vaihdat kohdassa ”Oma profiili”.",
  ],
  intro: [
    "Tilin luominen ajanvaraukseen VaraaAissa vie noin minuutin, eikä se maksa mitään. Tilin avulla näet varauksesi myöhemmin, voit perua ajan, jos tulee este, keräät kanta-asiakasleimoja ja voit viestitellä salongin kanssa soittamatta.",
    "Tämä ohje seuraa VaraaAi Academyn oppituntia ”Luo tili ja kirjaudu”. Luettuasi osaat rekisteröityä, kirjautua sisään seuraavilla kerroilla, vaihtaa unohtuneen salasanan itse ja tiedät, mihin tilin eri osioita käytetään.",
  ],
  sections: [
    {
      id: "mihin-tilia-tarvitaan",
      title: "Mihin VaraaAi-tiliä tarvitaan",
      blocks: [
        { p: "Salonkeja voi hakea ja hintoja vertailla kirjautumatta. Tilistä on hyötyä siitä hetkestä, kun sinulla on varattu aika: kaikki siihen liittyvä on tallessa yhdessä paikassa, ja hoidat itse suurimman osan asioista, joita varten ennen piti soittaa salonkiin." },
        {
          ul: [
            "**Näet varauksesi:** päivä, kellonaika, palvelu ja salongin osoite löytyvät kohdasta [Varaukseni](lesson:lich-hen-cua-toi).",
            "**Perut itse, jos tulee este:** peruutus onnistuu salongin sallimassa ajassa ilman, että pyydät keneltäkään apua.",
            "**Keräät leimoja:** vakiosalonkisi aktivoi sinulle [kanta-asiakaskortin](lesson:the-thanh-vien), ja kortti on tallessa tililläsi.",
            "**Viestittelet salongin kanssa:** kysy hinnoista, vapaista ajoista tai muusta ennen käyntiä [salongin chatissa](lesson:chat-voi-salon).",
          ],
        },
        { note: "Jos olet jo varannut ajan VaraaAissa ja täyttänyt tietovaiheessa nimen, puhelinnumeron, sähköpostin ja salasanan, tilisi luotiin jo silloin. Uutta rekisteröitymistä ei tarvita, vaan kirjaudut sisään samalla sähköpostilla ja salasanalla.", kind: "info", title: "Oletko varannut ennenkin?" },
      ],
    },
    {
      id: "tilin-osiot",
      title: "Tilin osiot kirjautumisen jälkeen",
      blocks: [
        { p: "Kun olet kirjautunut, nimesi näkyy sivun yläreunassa. Napauta sitä, niin aukeaa valikko, jossa on kuusi osiota. Sen kautta pääset kaikkeen, mikä VaraaAissa kuuluu sinulle." },
        {
          table: {
            head: ["Osio", "Mihin sitä käytetään"],
            rows: [
              ["Oma profiili", "Kuvan, sähköpostin ja salasanan vaihtaminen"],
              ["Varaukseni", "Jokaisen varauksen tiedot, peruminen ja arvostelun kirjoittaminen käynnin jälkeen"],
              ["Kanta-asiakaskortit", "Vakiosalonkiesi kanta-asiakaskortit, kerätyt leimat ja QR-koodi"],
              ["Viestit", "Keskustelusi salonkien kanssa"],
              ["Seurataan", "Salongit, joita olet päättänyt seurata"],
              ["Uutissyöte", "Seuraamiesi salonkien uudet julkaisut"],
            ],
          },
        },
        { img: { src: img("khach-mo-tai-khoan-varaaai-tren-dien-thoai"), alt: "Vaaleahiuksinen nainen luumunvärisessä huivissa istuu kahvilan ikkunan ääressä ja katsoo puhelintaan kahvikupin vieressä", caption: "Tilin kaikki osiot aukeavat puhelimessa yhdellä napautuksella nimeesi." } },
        { p: "Näistä kuudesta ”Oma profiili” kannattaa avata kerran heti rekisteröitymisen jälkeen ja tarkistaa, että sähköpostiosoite on oikein. Jos osoitteessa on yksikin väärä merkki, varausvahvistukset ja salasanan vaihtolinkki eivät tavoita sinua." },
      ],
    },
    {
      id: "sahkoposti-ja-salasana",
      title: "Sähköposti ja salasana: näin vältät harmit myöhemmin",
      blocks: [
        { p: "Sähköposti on tilin tärkein tieto. Kirjaudut sillä sisään, varausvahvistukset tulevat sinne, ja kun salasana unohtuu, vaihtolinkki lähetetään samaan osoitteeseen. Käytä osoitetta, jota luet puhelimellasi, älä vanhaa postilaatikkoa, jota et enää avaa." },
        { p: "Salasana kirjoitetaan kahdesti, kenttiin ”Salasana” ja ”Vahvista salasana”. Niiden on oltava merkilleen samat, joten kirjoita rauhassa ja tarkkaile isoja kirjaimia. Pelkästään VaraaAita varten valittu salasana, joka on eri kuin sähköpostin tai pankin salasana, on hyvä tapa minkä tahansa verkkotilin kanssa." },
        { note: "Lomakkeen loppupuolella kysytään ”Miten haluat vastaanottaa markkinointiviestejä?”, ja vaihtoehtoina on kaksi ruutua: ”Sähköpostilla” ja ”Tekstiviestillä”. Jätä rasti paikalleen, jos haluat kuulla salonkien tarjouksista, tai poista molemmat rastit ennen kuin painat ”Luo tili”.", kind: "tip", title: "Tarjoukset ovat oma valintasi" },
      ],
    },
    {
      id: "tavallisia-tilanteita",
      title: "Tavallisia tilanteita rekisteröitymisessä ja kirjautumisessa",
      blocks: [
        {
          table: {
            head: ["Tilanne", "Mitä teet"],
            rows: [
              ["Salasana on unohtunut", "Paina kirjautumissivulla ”Unohditko salasanan?”, anna sähköpostisi ja paina ”Lähetä vaihtolinkki”. Avaa sähköposti ja valitse uusi salasana ohjeiden mukaan"],
              ["Vaihtolinkkiä ei kuulu", "Tarkista, että kirjoitit saman sähköpostin, jolla rekisteröidyit, ja katso myös roskapostikansio"],
              ["Avasit rekisteröitymissivun, vaikka sinulla on jo tili", "Paina ”Kirjaudu sisään” rivillä ”Onko sinulla jo tili?” ”Luo tili” -painikkeen alla"],
              ["Avasit kirjautumissivun, mutta tiliä ei vielä ole", "Paina ”Luo tili” rivillä ”Eikö sinulla ole tiliä?” ”Kirjaudu sisään” -painikkeen alla"],
              ["Haluat vaihtaa sähköpostin tai salasanan", "Kirjaudu sisään, napauta nimeäsi ylhäällä ja avaa ”Oma profiili”"],
              ["Haluat vaihtaa kuvasi", "Sekin tehdään kohdassa ”Oma profiili”"],
            ],
          },
        },
        { p: "Uuden tilin luominen vain siksi, että salasana unohtui, on ratkaisu, jota kannattaa välttää. Varauksesi, kanta-asiakaskorttisi ja viestisi salonkien kanssa kuuluvat vanhaan tiliin, joten sen salasanan vaihtaminen on nopein tie takaisin." },
      ],
    },
    {
      id: "rekisteroitymisen-jalkeen",
      title: "Mitä tehdä rekisteröitymisen jälkeen",
      blocks: [
        { p: "Ensimmäinen asia on yleensä ajan varaaminen. Avaa [salonkihaku](/search), valitse palvelu ja alue ja etene ohjeen [ajanvaraus netissä](lesson:dat-lich-online) mukaan. Koska olet jo kirjautunut, henkilötietoja ei tarvitse kirjoittaa lopussa uudelleen." },
        { p: "Jos varaat usein, [asenna VaraaAi-sovellus puhelimeesi](lesson:cai-app), niin se aukeaa suoraan kotinäytöltä. Kun löydät oman vakiosalongin, voit [seurata salonkia](lesson:theo-doi-salon), jolloin sen uudet julkaisut näkyvät ”Uutissyöte”-osiossa." },
      ],
    },
  ],
  howTo: {
    title: "Tilin luominen, kirjautuminen ja salasanan vaihto vaihe vaiheelta",
    id: "tilin-vaiheet",
    after: "mihin-tilia-tarvitaan",
    lead: "Kolme ensimmäistä vaihetta ovat rekisteröityminen, jonka teet vain kerran. Kolme viimeistä toistuvat: kirjautuminen ja salasanan vaihto, jos se unohtuu.",
    steps: [
      {
        name: "Paina oikean yläkulman ”Luo tili”",
        text: "Avaa [varaaai.com](/) puhelimella tai tietokoneella. Oikeassa yläkulmassa ovat painikkeet ”Kirjaudu sisään” ja ”Luo tili”. Paina ”Luo tili”, niin sivu ”Luo tilisi” aukeaa.",
        image: { src: shot("paina-luo-tili-oikeassa-ylakulmassa"), alt: "VaraaAin sivu tabletilla: oikean yläkulman Luo tili -painike on korostettu, ja alla näkyy Luo tilisi -lomake" },
      },
      {
        name: "Täytä tietosi",
        text: "Kirjoita kenttiin ”Koko nimi”, ”Sähköposti”, ”Puhelinnumero”, ”Salasana” ja ”Vahvista salasana”. Käytä sähköpostia, jota oikeasti luet, sillä varausvahvistukset ja salasanan vaihtolinkit lähetetään sinne. Vahvistuskentän on vastattava salasanaa täsmälleen.",
        image: { src: shot("luo-tilisi-lomake"), alt: "Luo tilisi -lomake, jossa kentät Koko nimi, Sähköposti ja Puhelinnumero on korostettu kultaisella kehyksellä" },
      },
      {
        name: "Valitse, miten haluat tarjoukset, ja paina ”Luo tili”",
        text: "Kenttien alla on kaksi vaihtoehtoa, ”Sähköpostilla” ja ”Tekstiviestillä”. Rastita, miten haluat saada tarjouksia, tai poista rastit, jos et halua niitä. Paina sitten ”Luo tili”. Alla oleva pieni teksti kertoo, että jatkamalla hyväksyt VaraaAi.comin käyttöehdot ja tietosuojakäytännön.",
        image: { src: shot("markkinointiviestit-ja-luo-tili"), alt: "Rekisteröitymislomakkeen loppu, jossa ovat Sähköpostilla- ja Tekstiviestillä-ruudut ja korostettu Luo tili -painike" },
      },
      {
        name: "Kirjaudu sisään seuraavilla kerroilla",
        text: "Paina seuraavalla kerralla ylhäältä ”Kirjaudu sisään”. Kirjoita sivulla ”Kirjaudu VaraaAi-tilille” rekisteröitymisessä käyttämäsi ”Sähköposti” ja ”Salasana” ja paina ”Kirjaudu sisään” -painiketta. Kun nimesi näkyy yläreunassa, olet tililläsi.",
        image: { src: shot("kirjaudu-varaaai-tilille"), alt: "Kirjaudu VaraaAi-tilille -sivu, jossa Sähköposti- ja Salasana-kentät on korostettu kultaisella ja alla on Kirjaudu sisään -painike" },
      },
      {
        name: "Unohtuiko? Paina ”Unohditko salasanan?”",
        text: "Jos et muista salasanaa, älä arvaile monta kertaa. Kirjautumissivulla ”Salasana”-kentän yläpuolella on linkki ”Unohditko salasanan?”. Paina sitä, niin sivu ”Vaihda salasana” aukeaa.",
        image: { src: shot("unohditko-salasanan-linkki"), alt: "VaraaAin kirjautumissivu, jossa Salasana-otsikon oikealla puolella oleva Unohditko salasanan -linkki on korostettu kultaisella" },
      },
      {
        name: "Lähetä vaihtolinkki ja valitse uusi salasana",
        text: "Kirjoita tilisi sähköpostiosoite kenttään ”Sähköposti” ja paina ”Lähetä vaihtolinkki”. Avaa sähköpostisi, etsi juuri tullut viesti ja valitse uusi salasana sen ohjeiden mukaan. Palaa sitten kirjautumissivulle ja kirjaudu uudella salasanalla.",
        image: { src: shot("vaihda-salasana-laheta-vaihtolinkki"), alt: "Vaihda salasana -sivu, jossa on Sähköposti-kenttä ja kultaisella korostettu Lähetä vaihtolinkki -painike" },
      },
    ],
  },
  faq: [
    {
      q: "Maksaako VaraaAi-tili jotain?",
      a: "Ei maksa. Asiakas luo tilin ja käyttää VaraaAita täysin maksutta. Maksat vain salongille saamastasi palvelusta.",
    },
    {
      q: "Pitääkö rekisteröityä ennen kuin voi varata ajan?",
      a: "Ei tarvitse. Kun varaat ensimmäistä kertaa, kirjoitat tietovaiheessa nimesi, puhelinnumerosi, sähköpostisi ja salasanan, ja tili luodaan samalla. Etukäteen rekisteröityminen vain nopeuttaa tätä vaihetta, koska olet jo kirjautunut.",
    },
    {
      q: "Miten vaihdan unohtuneen VaraaAi-salasanan?",
      a: "Paina kirjautumissivulla ”Unohditko salasanan?”, anna tilisi sähköposti ja paina ”Lähetä vaihtolinkki”. VaraaAi lähettää linkin tähän osoitteeseen. Avaa viesti ja valitse uusi salasana sen ohjeiden mukaan.",
    },
    {
      q: "Missä vaihdan sähköpostin tai salasanan?",
      a: "Kirjaudu sisään, napauta nimeäsi ylhäällä ja valitse ”Oma profiili”. Siellä voit vaihtaa kuvasi, sähköpostisi ja salasanasi.",
    },
    {
      q: "Saanko mainoksia, kun olen rekisteröitynyt?",
      a: "Päätät itse. Rekisteröitymislomake kysyy, haluatko markkinointiviestejä ”Sähköpostilla” vai ”Tekstiviestillä”. Poista rasti molemmista ruuduista, jos et halua niitä lainkaan.",
    },
    {
      q: "Mistä löydän varaukseni ja kanta-asiakaskorttini kirjautumisen jälkeen?",
      a: "Napauta nimeäsi sivun yläreunassa. Valikossa ovat ”Oma profiili”, ”Varaukseni”, ”Kanta-asiakaskortit”, ”Viestit”, ”Seurataan” ja ”Uutissyöte”. Varaukset ovat toisessa ja kortit kolmannessa osiossa.",
    },
  ],
  related: ["dat-lich-online", "cai-app", "lich-hen-cua-toi", "chat-voi-salon"],
};

export default article;
