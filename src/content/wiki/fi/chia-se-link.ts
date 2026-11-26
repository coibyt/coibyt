import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/chia-se-link/${name}.webp`;
const shot = (name: string) => `/wiki/chia-se-link/fi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "ajanvarauslinkki-salongille",
  lesson: "chia-se-link",
  category: "marketing",
  title: "Ajanvarauslinkki salongille: näin saat linkin, QR-koodin ja upotuskoodin, jotta asiakas varaa mistä vain",
  metaTitle: "Ajanvarauslinkki salongille: linkki, QR-koodi ja upotus",
  metaDescription:
    "Mistä löydät salongin ajanvarauslinkin VaraaAissa, miten jaat sen Facebookissa, Instagramissa ja viesteissä, lataat QR-koodin ja upotat varauksen omille sivuille.",
  keyword: "ajanvarauslinkki",
  keywords: [
    "ajanvarauslinkki Instagramin bioon",
    "ajanvaraus Facebook-sivulle",
    "varauslinkki kynsistudiolle",
    "QR-koodi ajanvaraukseen",
    "ajanvarauksen upotus verkkosivuille",
    "varauspainike kotisivuille",
    "julkinen varaussivu",
  ],
  excerpt: "Yksi varaussivu, kolme tapaa tavoittaa asiakas: kopioi linkki someen ja viesteihin, lataa QR-koodi painotuotteisiin ja hae upotuskoodi omille sivuille.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-mo-link-dat-lich-tren-dien-thoai"),
    alt: "Vaaleahiuksinen nainen violetissa huivissa istuu kahvilan ikkunan ääressä kahvikupin kanssa ja katsoo puhelintaan",
  },
  takeaways: [
    "Ajanvarauslinkki on **”Asetukset”-sivun yläosassa** kohdassa ”Julkinen varaussivu”.",
    "Napauta **kopiointikuvaketta** ja liitä linkki salongin Facebook-sivulle, Instagramin bioon tai viestiin asiakkaalle.",
    "Napauta **QR-kuvaketta** ja lataa salongin QR-koodi käyntikortteihin, esitteisiin tai tiskille.",
    "Jos sinulla on omat verkkosivut, laita ”Kopioi linkki” -osoite painikkeen taakse tai käytä **”Hae upotuskoodi”**, niin asiakas varaa suoraan sivuillasi.",
    "Paina ennen jakamista ”Näytä sivu”, niin näet salongin sivun juuri sellaisena kuin asiakas sen näkee.",
  ],
  intro: [
    "Ajanvarauslinkki hyödyttää salonkia vasta, kun asiakas löytää sen. Palvelut, hinnat ja aukioloajat voivat olla valmiina, mutta jos linkki jää hallintapaneelin uumeniin, asiakkaat lähettävät edelleen viestejä ja kysyvät, onko huomenna vapaata.",
    "Tämä artikkeli seuraa VaraaAi Academyn oppituntia ”Jaa varauslinkkisi”. Opit, mistä linkki löytyy, miten lataat QR-koodin, miten liität ajanvarauksen omille verkkosivuillesi ja mihin kukin niistä kannattaa sijoittaa, jotta asiakkaat näkevät sen.",
  ],
  sections: [
    {
      id: "miksi-jakaa",
      title: "Miksi varauslinkin pitää näkyä kaikkialla, missä asiakas katsoo",
      blocks: [
        { p: "Asiakas ei lähde etsimään varaussivuasi. Hän selaa Instagramia ja näkee kauniit kynnet tai katsoo salongin Facebook-sivulta aukioloaikoja. Halu varata syntyy juuri siinä kohdassa, ja se haihtuu nopeasti, jos puhelinnumeroa pitää lähteä etsimään muualta." },
        { p: "Oppitunnin sääntö on siksi yksinkertainen: mitä useammassa paikassa linkki näkyy, sitä helpompi asiakkaan on varata. Jokaisesta paikasta, jossa salonki näkyy, Facebookista ja Instagramista Googleen, omille sivuille ja tiskille, pitäisi päästä suoraan varaussivulle." },
        { p: "Tämä ei maksa mitään. VaraaAi on maksuton salongin omistajalle ja asiakkaalle, ja kaikki tarvittava on valmiina ”Asetukset”-sivulla." },
      ],
    },
    {
      id: "linkki-qr-upotus",
      title: "Linkki, QR-koodi vai upotuskoodi: mitä käytät missäkin",
      blocks: [
        { p: "Kaikki neljä alla olevaa työkalua vievät samalle varaussivulle. Ero on vain siinä, mihin ne laitat:" },
        {
          table: {
            head: ["Työkalu", "Mistä löydät", "Mihin käytät"],
            rows: [
              ["Varauslinkki", "Kopiointikuvake kohdassa ”Julkinen varaussivu”", "Facebook-sivu, Instagramin bio, viestit asiakkaille"],
              ["QR-koodi", "QR-kuvake heti vieressä", "Käyntikortit, esitteet, tiski"],
              ["Linkki verkkosivulle", "”Kopioi linkki” kohdassa ”Verkkosivu ja varauspainike”", "Oman verkkosivun painikkeen taakse"],
              ["Upotuskoodi", "”Hae upotuskoodi” samassa kohdassa", "Verkkosivulle, jolloin asiakas varaa siellä"],
            ],
          },
        },
        { p: "Linkki sopii paikkoihin, joissa asiakas voi napauttaa. QR-koodi on painotuotteita varten: paperia ei voi napauttaa, mutta puhelimella voi skannata. Kaksi viimeistä tarvitset vasta, kun salongilla on omat verkkosivut." },
      ],
    },
    {
      id: "tarkista-sivu",
      title: "Katso julkinen varaussivu ensin asiakkaan silmin",
      blocks: [
        { p: "”Näytä sivu” -painike avaa salongin sivun juuri sellaisena kuin asiakas sen näkee. Paina sitä ennen kuin lähetät linkin minnekään, ja katso sivua kuin ihminen, joka ei ole koskaan käynyt salongissasi." },
        { img: { src: shot("salongin-sivu-asiakkaan-nakyma"), alt: "Salongin julkinen sivu tabletilla: nimi, 5,0 tähden arvio, osoite, puhelinnumero, lyhyt esittely ja Varaa aika -painike", caption: "Salongin sivu, jonka asiakas näkee linkin avattuaan: nimi, osoite, esittely ja ”Varaa aika” -painike." } },
        {
          ul: [
            "**Nimi, osoite ja puhelinnumero** ovat oikein. Jos eivät, korjaa ne [salongin profiilissa](lesson:ho-so-salon).",
            "**Palvelut ja hinnat** ovat täydelliset ja ajan tasalla. Katso ohje [palveluiden ja hintojen lisäämisestä](lesson:dich-vu).",
            "**Aukioloajat** vastaavat todellisuutta, koska asiakas voi varata vain [aukioloaikojen](lesson:gio-mo-cua) sisällä.",
          ],
        },
        { p: "Keskeneräisen sivun jakaminen on hukattua vaivaa. Asiakas napauttaa, näkee tyhjän sivun eikä seuraavalla kerralla enää viitsi napauttaa." },
      ],
    },
    {
      id: "facebook-instagram-viestit",
      title: "Ajanvarauslinkki Facebookiin, Instagramin bioon ja viesteihin",
      blocks: [
        { p: "Oppitunti nimeää kolme paikkaa, joihin linkki kannattaa liittää ensimmäisenä: salongin Facebook-sivu, Instagramin bio ja suoraan asiakkaille lähetetyt viestit." },
        {
          ul: [
            "**Facebook-sivu:** lisää linkki sivun tietoihin ja toista se julkaisuissa, joissa esittelet uusia töitä tai tarjouksia.",
            "**Instagramin bio:** tähän asiakas katsoo, kun hän avaa salongin profiilin nähtyään kauniin kuvan.",
            "**Viestit:** kun asiakas kysyy, onko vapaita aikoja, lähetä linkki sen sijaan, että luettelet ajat. Asiakas näkee itse, mikä on vapaana, ja valitsee sopivan.",
          ],
        },
        { img: { src: shot("kopioi-varauslinkki-yleiskatsaus"), alt: "Hallintapaneelin Yleiskatsaus-sivu, jossa Kopioi varauslinkki -painike on korostettu kultaisella Avaa kalenteri-, Viestit- ja Näytä salonkisivu -painikkeiden vieressä", caption: "Myös ”Yleiskatsaus”-sivulla on ”Kopioi varauslinkki” -painike, kun linkki pitää lähettää nopeasti." } },
        { note: "Kun vastaat asiakkaan viestiin, sinun ei tarvitse mennä asetuksiin. Avaa ”Yleiskatsaus”, paina ”Kopioi varauslinkki” ja liitä linkki keskusteluun.", kind: "tip", title: "Nopea jako" },
      ],
    },
    {
      id: "qr-koodi",
      title: "QR-koodi ajanvaraukseen: mihin sen tulostat",
      blocks: [
        { p: "QR-koodin skannaus avaa salongin varaussivun suoraan. Oppitunti ehdottaa kolmea paikkaa: käyntikortit, esitteet ja tiski. Asiakas, joka on juuri saanut palvelun ja seisoo tiskillä maksamassa, varaa seuraavan ajan helpoimmin juuri silloin." },
        { p: "”Asetukset”-sivulta ladattu QR-koodi sopii hyvin käyntikortteihin ja esitteisiin, joille salongilla on jo oma pohja. Jos haluat valmiin julisteen, jossa on otsikko ”Skannaa ja varaa”, ilman omaa suunnittelua, katso ohje [QR-julisteen tekemisestä](lesson:poster-qr). Myös [monikielinen hinnasto](lesson:bang-gia) voi saada varauksen QR-koodin." },
      ],
    },
    {
      id: "omat-verkkosivut",
      title: "Ajanvarauksen upotus omille verkkosivuille tai varauspainike",
      blocks: [
        { p: "Kohta ”Verkkosivu ja varauspainike” on alempana ”Asetukset”-sivulla. Sen ”Upota varaussivu” -laatikossa on kaksi painiketta kahta eri tapaa varten:" },
        { img: { src: shot("verkkosivu-ja-varauspainike-osio"), alt: "Verkkosivu ja varauspainike -osio, jossa Upota varaussivu -otsikko on korostettu kultaisella, alla upotusosoite sekä Näytä sivu, Kopioi linkki ja Hae upotuskoodi" } },
        {
          ul: [
            "**”Kopioi linkki”:** saat osoitteen, jonka laitat verkkosivun painikkeen taakse, esimerkiksi ”Varaa aika” -painikkeen. Painiketta painava asiakas siirtyy varaussivulle.",
            "**”Hae upotuskoodi”:** saat koodinpätkän. Kun liität sen verkkosivulle, varaussivu näkyy siinä kohdassa, ja asiakas varaa poistumatta sivuiltasi.",
          ],
        },
        { p: "Jos verkkosivut on tehnyt joku muu, kopioi linkki tai koodi ja lähetä se hänelle. Jos salongilla ei vielä ole verkkosivuja, katso ohje [salongin omista verkkosivuista](lesson:website-salon)." },
        { p: "Kun linkki on kanavissasi, [salongin verkkonäkyvyyden tarkistus](/salon-check) näyttää, miten salonki näkyy verkkosivulla, Googlessa, Facebookissa ja Instagramissa." },
      ],
    },
  ],
  howTo: {
    title: "Näin haet ja jaat salongin ajanvarauslinkin VaraaAissa",
    id: "varauslinkin-jakaminen",
    after: "linkki-qr-upotus",
    lead: "Viisi ensimmäistä vaihetta koskevat jokaista salonkia. Kaksi viimeistä tarvitset vain, jos sinulla on omat verkkosivut.",
    steps: [
      {
        name: "Avaa ”Asetukset” ja etsi ”Julkinen varaussivu”",
        text: "Avaa hallintapaneelissa ”Asetukset”. Heti ylhäällä salongin nimen alla on ”Julkinen varaussivu”, jossa näkyy salongin osoite ja sen alla kolme painiketta.",
        image: { src: shot("julkinen-varaussivu-asetuksissa"), alt: "Asetukset-sivun yläosa, jossa salongin nimi ja Julkinen varaussivu -kohta salongin varausosoitteineen on korostettu kultaisella" },
      },
      {
        name: "Kopioi linkki kopiointikuvakkeesta",
        text: "Napauta kopiointikuvaketta, vasemmanpuoleista painiketta. Varauslinkki kopioituu puhelimen tai tietokoneen leikepöydälle valmiiksi liitettäväksi.",
        image: { src: shot("kopiointikuvake-varauslinkki"), alt: "Julkisen varaussivun osoitteen alla oleva kopiointikuvake korostettuna kultaisella, vieressä QR-kuvake ja Näytä sivu -painike" },
      },
      {
        name: "Liitä linkki Facebookiin, Instagramiin tai viestiin",
        text: "Avaa salongin Facebook-sivu, Instagramin bio tai keskustelu asiakkaan kanssa ja liitä linkki. Napauta linkkiä liittämisen jälkeen kerran itse, niin varmistat, että se avaa juuri salonkisi sivun.",
      },
      {
        name: "Lataa QR-koodi QR-kuvakkeesta",
        text: "Napauta viereistä QR-kuvaketta ja lataa salongin QR-koodi. Käytä tiedostoa käyntikorteissa ja esitteissä tai tulosta se tiskille.",
        image: { src: shot("qr-koodin-lataus"), alt: "QR-kuvake kopiointikuvakkeen ja Näytä sivu -painikkeen välissä korostettuna kultaisella Julkinen varaussivu -kohdassa" },
      },
      {
        name: "Paina ”Näytä sivu”",
        text: "Paina ”Näytä sivu”, niin näet salongin sivun asiakkaan silmin. Tarkista nimi, osoite, palvelut ja varauspainike ennen kuin markkinoit linkkiä laajemmin.",
        image: { src: shot("nayta-sivu-painike"), alt: "Kultainen Näytä sivu -painike korostettuna Julkinen varaussivu -kohdassa salongin asetussivun yläosassa" },
      },
      {
        name: "Omat verkkosivut: paina ”Kopioi linkki”",
        text: "Vieritä alas kohtaan ”Verkkosivu ja varauspainike”. Paina ”Kopioi linkki” ja laita osoite verkkosivusi painikkeen taakse.",
        image: { src: shot("kopioi-linkki-verkkosivulle"), alt: "Upota varaussivu -laatikko, jossa Kopioi linkki -painike on korostettu kultaisella ja sen alla musta Hae upotuskoodi -painike" },
      },
      {
        name: "Tai paina ”Hae upotuskoodi”",
        text: "Jos haluat asiakkaan varaavan suoraan verkkosivullasi, paina ”Hae upotuskoodi” ja liitä koodi sivullesi. Varaussivu näkyy juuri siinä kohdassa, johon koodin liitit.",
        image: { src: shot("hae-upotuskoodi-painike"), alt: "Musta Hae upotuskoodi -painike korostettuna kultaisella Verkkosivu ja varauspainike -osion Upota varaussivu -laatikossa" },
      },
    ],
  },
  faq: [
    {
      q: "Mistä löydän salongin julkisen ajanvarauslinkin?",
      a: "”Asetukset”-sivun yläosasta kohdasta ”Julkinen varaussivu”. Siinä ovat kopiointikuvake, QR-kuvake ja ”Näytä sivu” -painike. Myös ”Yleiskatsaus”-sivulla on ”Kopioi varauslinkki” -painike.",
    },
    {
      q: "Mihin salongin ajanvarauslinkki kannattaa laittaa?",
      a: "Ensin salongin Facebook-sivulle, Instagramin bioon ja asiakkaille lähetettäviin viesteihin. Jos sinulla on verkkosivut, lisää linkki myös sivun painikkeen taakse. Mitä useammassa paikassa linkki näkyy, sitä helpompi asiakkaan on varata.",
    },
    {
      q: "Mihin salongin QR-koodia käytetään?",
      a: "Se tulostetaan käyntikortteihin ja esitteisiin tai laitetaan tiskille. Asiakas skannaa koodin puhelimellaan, ja salongin varaussivu aukeaa suoraan ilman osoitteen kirjoittamista.",
    },
    {
      q: "Miten asiakas voi varata suoraan omilla verkkosivuillani?",
      a: "Vieritä ”Asetukset”-sivulla kohtaan ”Verkkosivu ja varauspainike” ja paina ”Hae upotuskoodi”. Kun liität koodin verkkosivullesi, varaussivu näkyy siellä.",
    },
    {
      q: "Mitä eroa on painikkeilla ”Kopioi linkki” ja ”Hae upotuskoodi”?",
      a: "”Kopioi linkki” antaa osoitteen, jonka laitat verkkosivun painikkeen taakse, ja asiakas siirtyy siitä varaussivulle. ”Hae upotuskoodi” antaa koodin, jonka liität sivullesi, jolloin asiakas varaa omalla sivullasi.",
    },
    {
      q: "Miten näen salongin sivun niin kuin asiakas sen näkee?",
      a: "Paina ”Näytä sivu” ”Asetukset”-sivun yläosan ”Julkinen varaussivu” -kohdassa. Painike avaa salongin sivun juuri sellaisena kuin asiakas sen näkee linkkiä napauttaessaan.",
    },
  ],
  related: ["poster-qr", "bang-gia", "website-salon", "kiem-tra-salon"],
};

export default article;
