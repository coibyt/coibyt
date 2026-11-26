import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/the-qua-tang/${name}.webp`;
const shot = (name: string) => `/wiki/the-qua-tang/fi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "lahjakortti-kauneushoitolaan",
  lesson: "the-qua-tang",
  category: "booking",
  title: "Lahjakortti kauneushoitolaan: näin ostat sen salongin verkkosivuilta ja käytät salongissa",
  metaTitle: "Lahjakortti kauneushoitolaan: osta netistä, käytä salongissa",
  metaDescription:
    "Näin ostat lahjakortin salongin verkkosivuilta: valitse kortti, osta se, saat koodin ja QR-koodin sähköpostiin. Milloin kortti aktivoituu ja miten sitä käytetään.",
  keyword: "lahjakortti kauneushoitolaan",
  keywords: [
    "lahjakortti kampaamoon",
    "kynsistudion lahjakortti",
    "osta lahjakortti netistä",
    "lahjakortin käyttö salongissa",
    "hemmotteluhoito lahjaksi äidille",
    "lahjakortin koodi",
  ],
  excerpt: "Valitse kortti salongin verkkosivuilta, osta se minuutissa, saat koodin ja QR-koodin sähköpostiin ja välität viestin lahjan saajalle.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("nguoi-nhan-the-qua-tang-lam-dep-qua-email"),
    alt: "Lyhythiuksinen nuori nainen kermanvärisessä neuleessa istuu salongissa ja katsoo ilahtuneena puhelintaan, jonka yllä hehkuu kultainen lahjapaketin kuvake",
  },
  takeaways: [
    "Lahjakortteja myydään salongin verkkosivujen **”Lahjakortit”**-osiossa. Jokaisessa kortissa näkyvät palvelu, alennus, voimassaoloaika ja hinta.",
    "Paina ”Osta tämä kortti”, täytä nimi ja sähköposti ja paina ”Osta”. Kortin koodi ja QR-koodi tulevat heti sähköpostiisi.",
    "Korttia voi käyttää vasta, **kun salonki on vahvistanut maksusi**.",
    "Kun annat kortin lahjaksi, **välitä koodin sisältävä sähköposti** saajalle.",
    "Näytä salongissa QR-koodi tai kerro kortin koodi. Henkilökunta tarkistaa sen ja kirjaa kortille yhden käyttökerran.",
  ],
  intro: [
    "Lahjakortti kauneushoitolaan on helppo lahja ystävän syntymäpäiväksi tai kiitokseksi äidille: saaja pääsee hoitoon salonkiin, eikä sinun tarvitse arvata vaatekokoa tai huulipunan sävyä. VaraaAita käyttävissä salongeissa ostat kortin suoraan salongin verkkosivuilta ja saat koodin sähköpostiin noin minuutissa.",
    "Tämä ohje seuraa VaraaAi Academyn oppituntia ”Osta ja käytä lahjakortti”. Opit, mistä kortit löytyvät, mitä kannattaa lukea ennen ostoa, miksi kortti ei ehkä toimi heti, vaikka koodi on jo tullut, ja mitä lahjan saaja tekee salongissa.",
  ],
  sections: [
    {
      id: "mika-lahjakortti-on",
      title: "Mikä salongin lahjakortti on",
      blocks: [
        { p: "Kortin myöntää ja myy salonki itse omilla verkkosivuillaan. Jokainen kortti liittyy johonkin salongin palveluun ja sen alennukseen. Muovikorttia ei tarvita: haltijalla on sähköpostissa kortin koodi ja QR-koodi." },
        { p: "Koska kortti on yhden salongin oma, sitä käytetään siinä salongissa, josta se ostettiin. Ennen kuin ostat kortin lahjaksi, valitse saajalle sopivan matkan päässä oleva salonki ja palvelu, jota hän todella haluaa." },
        { img: { src: img("khach-thu-gian-o-spa-voi-the-qua-tang-lam-dep"), alt: "Valkoiseen kylpytakkiin pukeutunut nainen rentoutuu kynttilöin valaistun kylpylän altaan reunalla, kun mustaan työasuun pukeutunut työntekijä tuo teetarjottimen", caption: "Hoito salongissa on lahja, josta saaja pääsee nauttimaan heti." } },
      ],
    },
    {
      id: "lue-kortin-tiedot",
      title: "Lue kortin tiedot huolella ennen ostoa",
      blocks: [
        { p: "Oppitunnin vinkki on tarkistaa kortin voimassaolo ja käyttökerrat ennen kuin painat osta. Jokaisessa ”Lahjakortit”-osion kortissa näkyvät alla olevat tiedot." },
        {
          table: {
            head: ["Kortissa", "Mitä se tarkoittaa"],
            rows: [
              ["Palvelu", "Mihin salongin palveluun kortti käy, esimerkiksi geelimanikyyriin"],
              ["Alennus", "Montako prosenttia haltija saa alennusta palvelusta"],
              ["Voimassaolo", "Kuinka kauan korttia voi käyttää. Oppitunnin videolla esimerkkikortti on voimassa 90 päivää aktivoinnista"],
              ["Käyttökerrat", "Montako kertaa korttia voi käyttää. Videon esimerkkikortilla enintään 1 kerran"],
              ["Hinta", "Mitä maksat salongille kortista"],
            ],
          },
        },
        { note: "Voimassaoloaika jää lahjan antajalta useimmin huomaamatta. Jos saaja on kiireinen tai asuu kaukana, valitse kortti, joka on voimassa riittävän kauan, ja kerro viimeinen käyttöpäivä, kun annat kortin.", kind: "tip", title: "Kokemuksesta" },
      ],
    },
    {
      id: "aktivointi",
      title: "Koodi on tullut, mutta kortti ei vielä toimi: aktivointi",
      blocks: [
        { p: "Kun painat ”Osta”, kortin koodi tulee sähköpostiisi heti. Koodi ei kuitenkaan tarkoita, että korttia voi jo käyttää. Kortti aktivoituu, kun salonki on vahvistanut maksusi, ja tämä kerrotaan myös oston jälkeisessä kiitosnäkymässä." },
        { p: "Järkevä järjestys on siis: osta, maksa salongille, odota salongin vahvistusta ja anna kortti vasta sitten. Jos et tiedä, miten salonki ottaa maksun vastaan, kysy suoraan [salongin chatissa](lesson:chat-voi-salon) tai soita salongin sivulla olevaan numeroon." },
        { note: "Älä välitä sähköpostia saajalle juuri ennen hänen käyntiään, jos salonki ei ole vielä vahvistanut maksuasi. Aktivoimatonta korttia ei voi käyttää, ja saaja joutuu kiusalliseen tilanteeseen kassalla.", kind: "warn", title: "Anna kortti vasta, kun se on aktiivinen" },
      ],
    },
    {
      id: "antaminen-ja-kaytto",
      title: "Kortin antaminen lahjaksi ja käyttö salongissa",
      blocks: [
        { p: "Lahjan antaminen on pelkkä sähköpostin välittäminen. Oston jälkeen saamassasi viestissä ovat kortin koodi ja QR-koodi. Välitä koko viesti saajalle omien onnittelujesi kanssa, niin hänellä on kaikki, mitä salonkiin tarvitaan." },
        { p: "Salongissa sinä tai lahjan saaja näytätte QR-koodin henkilökunnalle skannattavaksi tai luette kortin koodin. Henkilökunta tarkistaa koodin salongin näytöltä: mikä kortti on kyseessä, onko se voimassa, montako käyttökertaa on jäljellä ja milloin se vanhenee. Sen jälkeen he kirjaavat käyttökerran, ja kortilta vähennetään yksi kerta." },
        { img: { src: shot("kirjaa-kayttokerta-lahjakortille"), alt: "Salongin Tarkista ja käytä kortti -näkymä, jossa näkyy voimassa oleva geelimanikyyri-lahjakortti, jäljellä olevat käyttökerrat, vanhenemispäivä ja Kirjaa käyttökerta -painike", caption: "Tämän henkilökunta näkee tarkistettuaan kortin koodin." } },
        { p: "Saajan kannattaa varata aika ennen käyntiä. Hän voi tehdä [ajanvarauksen netissä](lesson:dat-lich-online) samaan salonkiin: tietovaiheessa on kenttä ”Alennuskoodi”, johon käyvät sekä alennus- että lahjakorttikoodit, ja sen jälkeen painetaan ”Käytä”." },
      ],
    },
    {
      id: "tavallisia-tilanteita",
      title: "Tavallisia tilanteita salongin lahjakortin kanssa",
      blocks: [
        {
          table: {
            head: ["Tilanne", "Mitä teet"],
            rows: [
              ["Salongin sivuilla ei ole ”Lahjakortit”-osiota", "Salonki ei vielä myy lahjakortteja verkkosivuillaan. Kysy salongilta tai valitse toinen"],
              ["Sähköpostia ei tullut oston jälkeen", "Tarkista roskapostikansio ja kirjoittamasi osoite. Kortin koodi näkyy myös kiitosnäkymässä, joten kirjoita se muistiin"],
              ["Salongissa kerrotaan, ettei kortti ole aktiivinen", "Salonki ei ole vielä vahvistanut maksua. Hoida maksu salongin kanssa loppuun, niin kortti aktivoidaan"],
              ["Saaja ei saa QR-koodia auki", "Lue kortin koodi kirjaimina ja numeroina henkilökunnalle, joka kirjoittaa sen"],
              ["Et halua antaa puhelinnumeroa", "Puhelinkenttä on valinnainen. Nimi ja sähköposti riittävät"],
              ["Haluat käyttää kortin toiseen palveluun", "Kortissa lukee, mihin palveluun se käy. Kysy salongilta ennen käyntiä, jos haluat vaihtaa"],
            ],
          },
        },
        { p: "Jos lahjan saaja käy samassa salongissa säännöllisesti, hän voi myös pyytää sen [kanta-asiakaskortin](lesson:the-thanh-vien) ja kerätä lippuja jokaisesta käynnistä. Lahjakortti on lahja yhteen tilaisuuteen, kanta-asiakaskortti kulkee asiakkaan mukana pitkään." },
        { note: "Salongit luovat korttipohjat, vahvistavat maksut ja tarkistavat koodit hallintapaneelissa. Katso omistajien oppitunti [Lahjakortit](lesson:the-qua-tang-salon).", kind: "info", title: "Omistatko salongin?" },
      ],
    },
  ],
  howTo: {
    title: "Lahjakortin osto ja käyttö salongissa vaihe vaiheelta",
    id: "lahjakortin-vaiheet",
    after: "lue-kortin-tiedot",
    lead: "Neljä ensimmäistä vaihetta tehdään salongin verkkosivuilla, kaksi viimeistä ovat kortin antaminen ja käyttö.",
    steps: [
      {
        name: "Avaa salongin verkkosivut ja etsi ”Lahjakortit”",
        text: "Avaa sen salongin verkkosivut, jolta haluat ostaa kortin, ja vieritä kohtaan ”Lahjakortit”. Jokaisessa kortissa näkyvät palvelu, alennus, voimassaolo ja hinta. Lue kaikki tiedot ja valitse mieleisesi kortti.",
        image: { src: shot("valitse-lahjakortti-salongin-sivuilta"), alt: "Salongin verkkosivujen Lahjakortit-osio, jossa geelimanikyyri-lahjakortti on korostettu: alennus 20 %, voimassa 90 päivää, 36 euroa ja Osta tämä kortti" },
      },
      {
        name: "Paina ”Osta tämä kortti”",
        text: "”Osta tämä kortti” -painike on heti kortin hinnan alla. Paina sitä, niin tietokentät aukeavat kortin sisälle.",
        image: { src: shot("paina-osta-tama-kortti"), alt: "Geelimanikyyri-lahjakortti salongin verkkosivuilla, hinnan alla oleva Osta tämä kortti -painike korostettuna kultaisella" },
      },
      {
        name: "Täytä tietosi ja paina ”Osta”",
        text: "Kirjoita nimesi ja sähköpostiosoitteesi. Puhelinnumeron voit antaa, jos haluat, sillä kenttä on valinnainen. Kirjoita sähköposti huolellisesti, koska kortin koodi lähetetään sinne, ja paina ”Osta”.",
        image: { src: shot("tayta-nimi-sahkoposti-ja-osta"), alt: "Lahjakortin ostolomake, jossa nimi-, sähköposti- ja Puhelin (valinnainen) -kentät on korostettu kultaisella Osta-painikkeen yläpuolella" },
      },
      {
        name: "Ota kortin koodi talteen ja avaa sähköposti",
        text: "Näytölle tulee ”Kiitos lahjakortin ostosta!” ja korttisi koodi. Samalla koodi ja QR-koodi lähetetään sähköpostiisi. Kortti aktivoituu, kun salonki vahvistaa maksun.",
        image: { src: shot("kiitos-lahjakortin-ostosta-koodi"), alt: "Kiitos lahjakortin ostosta -viesti, jossa näkyvät kortin koodi ja tieto, että kortti aktivoituu, kun salonki vahvistaa maksun" },
      },
      {
        name: "Välitä sähköposti lahjan saajalle",
        text: "Jos kortti on lahja, välitä kortin koodin sisältävä sähköposti saajalle. Kerro samalla, mihin palveluun ja salonkiin kortti käy ja milloin se vanhenee.",
      },
      {
        name: "Salongissa: näytä QR-koodi tai kerro kortin koodi",
        text: "Salongissa kortin haltija näyttää QR-koodin henkilökunnalle tai lukee kortin koodin. Henkilökunta tarkistaa koodin ja kirjaa kortille yhden käyttökerran.",
        image: { src: shot("henkilokunta-tarkistaa-lahjakortin-koodin"), alt: "Salongin Tarkista ja käytä kortti -näkymä, jossa koodikenttä on korostettu kultaisella Tarkista koodi -painikkeen yläpuolella" },
      },
    ],
  },
  faq: [
    {
      q: "Mistä salongin lahjakortin voi ostaa?",
      a: "Salongin verkkosivujen ”Lahjakortit”-osiosta. Valitse kortti, paina ”Osta tämä kortti”, täytä nimi ja sähköposti ja paina ”Osta”. Se vie noin minuutin.",
    },
    {
      q: "Miten lahjakorttia käytetään salongissa?",
      a: "Kortin haltija näyttää QR-koodin tai lukee kortin koodin henkilökunnalle. Henkilökunta tarkistaa koodin ja kirjaa käyttökerran, jolloin kortilta vähennetään yksi kerta.",
    },
    {
      q: "Voiko kortin käyttää heti oston jälkeen?",
      a: "Ei välttämättä. Kortin koodi ja QR-koodi tulevat sähköpostiin heti oston jälkeen, mutta kortti aktivoituu vasta, kun salonki on vahvistanut maksusi.",
    },
    {
      q: "Miten annan lahjakortin toiselle?",
      a: "Välitä kortin koodin ja QR-koodin sisältävä sähköposti lahjan saajalle. Salongissa hän näyttää QR-koodin tai lukee kortin koodin henkilökunnalle samalla tavalla kuin sinä.",
    },
    {
      q: "Vanheneeko salongin lahjakortti?",
      a: "Vanhenee. Jokaisessa kortissa näkyy salongin määrittämä voimassaoloaika ja käyttökertojen määrä. Tarkista molemmat ennen ostoa, varsinkin kun ostat lahjaksi.",
    },
    {
      q: "Pitääkö lahjakorttia ostaessa antaa puhelinnumero?",
      a: "Ei tarvitse. Täytät nimen ja sähköpostin, puhelinnumero on valinnainen. Sähköposti on tärkein tieto, koska kortin koodi lähetetään sinne.",
    },
  ],
  related: ["the-thanh-vien", "theo-doi-salon", "hoa-don", "dat-lich-online"],
};

export default article;
