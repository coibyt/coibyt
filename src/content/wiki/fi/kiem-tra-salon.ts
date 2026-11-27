import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/kiem-tra-salon/${name}.webp`;
const shot = (name: string) => `/wiki/kiem-tra-salon/fi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "salongin-nakyvyys-netissa-ilmainen-tarkistus",
  lesson: "kiem-tra-salon",
  category: "marketing",
  title: "Salongin näkyvyys netissä: tarkista verkkosivu, Google, Facebook ja Instagram ilmaiseksi",
  metaTitle: "Salongin näkyvyys netissä: ilmainen tarkistus 4 kanavalle",
  metaDescription:
    "Näin käytät VaraaAin ilmaista salonkitarkistusta: saat pisteet verkkosivulle, Google-profiilille, Facebookille ja Instagramille sekä listan, mitä korjata ensin.",
  keyword: "salongin näkyvyys netissä",
  keywords: [
    "miltä salonkini näyttää verkossa",
    "verkkonäkyvyyden pisteet",
    "kauneushoitolan markkinointi alku",
    "Google-yritysprofiili salongille",
    "miten asiakas löytää kynsistudion Googlesta",
    "avainsanat kampaamolle ja kynsistudiolle",
    "salongin verkkosivujen ilmainen tarkistus",
  ],
  excerpt: "Anna salongin nimi ja osoite, niin saat pisteet sadasta verkkosivulle, Googlelle, Facebookille ja Instagramille ja listan tärkeimmistä korjauksista. Ilman rekisteröitymistä.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-tim-salon-tren-dien-thoai-truoc-khi-den"),
    alt: "Nuori pitkähiuksinen ruskeaverikkö istuu sohvalla ikkunan vieressä ruukkukasvien keskellä ja hymyilee kädessään olevalle puhelimelle",
  },
  takeaways: [
    "VaraaAin salonkitarkistus on **ilmainen, eikä se vaadi sähköpostia tai rekisteröitymistä**. Tulos näkyy heti sivulla.",
    "Raportti antaa **verkkonäkyvyyden pisteet** asteikolla 0–100 ja omat pisteet neljälle kanavalle: verkkosivu, Google-profiili, Facebook ja Instagram.",
    "Jokainen kanava saa arvion, esimerkiksi **”Vahva”** tai **”Heikko”**. Paina ”Näytä tiedot”, niin näet syyn.",
    "**”Suurimmat mahdollisuutesi”** kertoo, mitä tehdä ensin, ja jokaisessa kohdassa on ”Mitä tehdä”.",
    "Tee ehdotetut asiat yksi kerrallaan ja tarkista uudelleen, niin näet pisteiden nousevan.",
  ],
  intro: [
    "Salongin näkyvyys netissä kannattaa tarkistaa ennen mainoksia tai päivittäistä somettamista: katsot salonkia niin kuin vieras ihminen, joka on juuri löytänyt sen verkosta. Uudet asiakkaat etsivät salongin yleensä netistä ennen käyntiä, ja he näkevät vain sen, mitä siellä on.",
    "Tämä artikkeli seuraa VaraaAi Academyn oppituntia ”Tarkista, miltä salonkisi näyttää verkossa”. Käytät ilmaista tarkistusta, ymmärrät raportin ja tiedät, minkä tehtävän otat ensin, jotta saat lisää asiakkaita.",
  ],
  sections: [
    {
      id: "miksi-tarkistaa",
      title: "Miksi salongin näkyvyys verkossa kannattaa tarkistaa ennen markkinointia",
      blocks: [
        { p: "Omistaja näkee salongin sisältäpäin: aukioloajat, hinnat ja reitin. Uusi asiakas näkee sen ulkoapäin puhelimen näytöltä. Jos verkkosivulla ei ole aukioloaikoja tai hintoja, hän ei soita kysyäkseen. Hän siirtyy hakutulosten seuraavaan salonkiin." },
        { p: "Ennen kuin panostat mihinkään kanavaan, selvitä siis, mitkä kanavat ovat heikkoja ja missä kohtaa. Oppitunnin työkalu pisteyttää salongin verkkosivun, Googlen, Facebookin ja Instagramin ja näyttää tarkalleen, mitä tehdä saadaksesi lisää asiakkaita. Kaikkeen menee noin minuutti." },
        { p: "Työkalu on avoin kaikille. Myös salonki, joka ei käytä VaraaAita, voi tehdä tarkistuksen, samoin salonki, jolla ei ole verkkosivuja." },
      ],
    },
    {
      id: "mita-tarkistetaan",
      title: "Mitä tarkistus katsoo verkkosivulta, Googlesta, Facebookista ja Instagramista",
      blocks: [
        { p: "Heti tarkistuspainikkeen alla on lyhyt luettelo ”Mitä tarkistamme”. Kun luet sen, sinulla on samalla lista siitä, mitä salonki tarvitsee verkossa:" },
        {
          table: {
            head: ["Kanava", "Mitä tarkistetaan"],
            rows: [
              ["Verkkosivu", "Mobiili, varauspainike, hinnat, aukioloajat"],
              ["Google-yritysprofiili", "Profiili ja arvostelut"],
              ["Facebook ja Instagram", "Löydetään salongin verkkosivulta"],
              ["Avainsanat", "Avainsanat ja markkinointi-ideat"],
            ],
          },
        },
        { img: { src: shot("tarkista-nyt-ilmaiseksi-painike"), alt: "Oranssi Tarkista nyt ilmaiseksi -painike, sen alla rivi Ei sähköpostia, ei rekisteröitymistä ja Mitä tarkistamme -luettelon alku", caption: "”Mitä tarkistamme” -luettelo on heti ”Tarkista nyt ilmaiseksi” -painikkeen alla." } },
        { p: "Verkkosivun kohdat vastaavat sitä, mitä uusi asiakas haluaa tietää: toimiiko sivu puhelimessa, mistä varataan, mitä maksaa ja milloin on auki." },
      ],
    },
    {
      id: "valmistelu",
      title: "Mitä tarvitset salongin ilmaiseen tarkistukseen",
      blocks: [
        {
          ul: [
            "**Salongin nimi** täsmälleen kuten kyltissä ja verkossa.",
            "**Salongin osoite.** Oppituntivideossa työkalu ehdottaa koko osoitetta kirjoittaessasi, ja voit valita sen.",
            "**Salongin tyyppi**, esimerkiksi kynsisalonki, kampaamo, spa tai ripsistudio. Näytön vihjeen mukaan sitä käytetään avainsana- ja markkinointi-ideoihin.",
            "**Verkkosivun osoite**, jos sinulla on sellainen. Kenttä on valinnainen, ja sen voi jättää tyhjäksi. Jos lisäät sen, työkalu löytää Facebookin ja Instagramin siitä automaattisesti.",
            "**Vastaus yhteen kysymykseen:** onko salongilla Google-yritysprofiili? Jos et muista, valitse ”En ole varma”.",
          ],
        },
        { note: "Tiliä ei tarvita, eikä sähköpostiosoitetta pyydetä. Tarkistuspainikkeen alla oleva rivi sanoo sen suoraan: ei sähköpostia, ei rekisteröitymistä, ja tulokset näkyvät tässä.", kind: "info", title: "Ei rekisteröitymistä" },
      ],
    },
    {
      id: "raportin-lukeminen",
      title: "Näin luet salongin verkkonäkyvyyden pisteet",
      blocks: [
        { p: "Raportti etenee kokonaiskuvasta yksityiskohtiin. Ylimpänä ovat verkkonäkyvyyden pisteet sadasta ja lyhyt arvio. Alempana ovat kunkin kanavan pisteet, nekin sadasta, ja arvio, kuten ”Vahva” tai ”Heikko”." },
        { img: { src: shot("verkkonakyvyyden-pisteet-sadasta"), alt: "Raportin yläosa, jossa pisteympyrä 45/100 on korostettu kultaisella, alla Raportti näkyvyydestä verkossa ja arvio Vaatii huomiota heti" } },
        { p: "Oppituntivideon esimerkkisalonki auttaa hahmottamaan. Alla olevat luvut ovat vain tuon esimerkkisalongin, eivät mikään vertailutaso:" },
        {
          table: {
            head: ["Kanava", "Esimerkkisalongin pisteet", "Arvio"],
            rows: [
              ["Kokonaisuus", "45/100", "Vaatii huomiota heti"],
              ["Verkkosivu", "0/100", "Heikko"],
              ["Google-profiili", "90/100", "Vahva"],
              ["Facebook", "Ei pisteitä", "Ei tarkistettu"],
              ["Instagram", "Ei pisteitä", "Ei tarkistettu"],
            ],
          },
        },
        { img: { src: shot("google-profiili-vahva-facebook-ei-tarkistettu"), alt: "Raportin Google-profiili-kortti 90/100 arviolla Vahva korostettuna kultaisella, alla Facebook-kortti merkinnällä Ei tarkistettu" } },
        { p: "Esimerkkisalongilla ei ole verkkosivua, joten työkalulla ei ollut mistä etsiä Facebookia ja Instagramia, ja molemmissa lukee ”Ei tarkistettu”. Se muistuttaa, että kanavat riippuvat toisistaan." },
        { p: "Älä pysähdy lukuihin. Jokaisessa kortissa on ”Näytä tiedot”, joka kertoo, miksi kanava sai pisteensä. Pienimmät pisteet eivät aina tarkoita ensimmäistä tehtävää; raportin seuraava osa vastaa siihen." },
        { img: { src: shot("verkkosivu-heikko-nayta-tiedot"), alt: "Verkkosivu-kortti 0/100 arviolla Heikko ja kultaisella korostettu Näytä tiedot -linkki, alla Google-profiili 90/100 Vahva" } },
      ],
    },
    {
      id: "suurimmat-mahdollisuudet",
      title: "”Suurimmat mahdollisuutesi”: mitä tehdä ensin",
      blocks: [
        { p: "Tämä on raportin tärkein osa. Siinä luetellaan asiat, jotka vaikuttavat eniten siihen, valitseeko asiakas salonkisi. Jokainen kohta on numeroitu, siinä on vaikutuksen merkintä ja ”Mitä tehdä” -neuvo." },
        { img: { src: shot("suurimmat-mahdollisuutesi-mita-tehda"), alt: "Suurimmat mahdollisuutesi -osion kohta 1 merkinnällä Suuri vaikutus, teksti Salongillasi ei ole verkkosivua ja Mitä tehdä -laatikko korostettuna kultaisella", caption: "Jokaisessa kohdassa on vaikutuksen merkintä ja ”Mitä tehdä” -laatikko." } },
        { p: "Videon esimerkkisalongin ensimmäinen kohta on, ettei salongilla ole verkkosivua. Neuvo on luoda ilmainen profiili ja varaussivu VaraaAissa ilman koodausta. VaraaAia käyttäville salongeille tarkistuksen tavallisimmista tehtävistä on omat ohjeensa:" },
        {
          table: {
            head: ["Tehtävä", "Ohje"],
            rows: [
              ["Näytä aukioloajat jokaiselle päivälle", "[Salongin aukioloajat](lesson:gio-mo-cua)"],
              ["Näytä palvelut hintoineen", "[Salongin palvelut ja hinnat](lesson:dich-vu) ja [hinnasto kampaamolle](lesson:bang-gia)"],
              ["Verkkosivu, jossa on varauspainike", "[Ilmaiset verkkosivut kampaamolle](lesson:website-salon)"],
              ["Lisää arvosteluja Googleen", "[Arvostelut ja Google](lesson:danh-gia-google)"],
            ],
          },
        },
        { note: "Valitse yksi tehtävä, tee se valmiiksi ja tarkista uudelleen. Kun etenet yksi kerrallaan, näet pisteiden nousun jokaisen jälkeen ja tiedät, mitkä tehtävät oikeasti vaikuttavat.", kind: "tip", title: "Yksi tehtävä kerrallaan" },
      ],
    },
    {
      id: "avainsanat",
      title: "Avainsanat kampaamolle ja kynsistudiolle: mitä raportti ehdottaa",
      blocks: [
        { p: "Raportin loppupuolella on kohta ”Avainsanat, joihin kannattaa panostaa”. Ne ovat sanoja, joita asiakas voisi kirjoittaa etsiessään kaltaistasi salonkia. Ideat perustuvat salongin tyyppiin ja alueeseen, ja ne sopivat verkkosivulle, Googleen, Facebookiin ja YouTubeen." },
        { p: "Videon esimerkkikynsisalongille ehdotukset yhdistävät salongin tyypin katuosoitteeseen näillä tavoilla:" },
        {
          ul: [
            "Tyyppi ja katuosoite, esimerkiksi ”Kynsisalonki” ja osoite.",
            "Tyyppi ja ”lähellä”.",
            "Tyyppi ja ”luotettava” tai ”edullinen”.",
            "”Varaa aika” sekä tyyppi ja katuosoite.",
          ],
        },
        { img: { src: shot("avainsanat-joihin-kannattaa-panostaa"), alt: "Avainsanat, joihin kannattaa panostaa -otsikko korostettuna kultaisella, alla ehdotukset, joissa Kynsisalonki yhdistetään katuosoitteeseen ja sanoihin lähellä, luotettava, edullinen ja varaa aika" } },
        { p: "Käytännöllisintä on viedä nämä sanat sinne, missä asiakas lukee: verkkosivun esittelyyn, profiilin kuvaukseen ja julkaisujen teksteihin. Kirjoita ne luontevaan lauseeseen, älä liitä koko listaa yhteen kohtaan." },
      ],
    },
    {
      id: "tallenna-ja-tarkista-uudelleen",
      title: "Tallenna raportti ja tarkista uudelleen muutosten jälkeen",
      blocks: [
        { p: "Paina ”Tulosta / tallenna PDF”, niin raportti säilyy. Tallennettu versio on lähtötasosi: muutaman viikon päästä, kun ehdotetut tehtävät on tehty, tarkista uudelleen ja vertaa raportteja rinnakkain." },
        { img: { src: shot("tulosta-tallenna-pdf-raportti"), alt: "Raportin yläosan yhteenveto, jossa Tulosta / tallenna PDF -painike on korostettu kultaisella ja alla Tarkista toinen salonki -painike" } },
        { p: "”Tarkista toinen salonki” vie takaisin lomakkeelle seuraavaa salonkia varten. Jos sinulla on useita toimipisteitä, tarkista jokainen osoite erikseen, koska jokaisella toimipisteellä on verkossa oma profiilinsa ja osoitteensa. Usean toimipisteen hallinnasta VaraaAissa kerrotaan oppitunnilla [toimipisteistä](lesson:chi-nhanh)." },
      ],
    },
  ],
  howTo: {
    title: "Näin tarkistat salongin näkyvyyden netissä VaraaAin ilmaisella työkalulla",
    id: "salonkitarkistuksen-vaiheet",
    after: "valmistelu",
    lead: "Kuusi vaihetta seuraavat oppituntivideon järjestystä. Työkalun avaamisesta raporttiin menee noin minuutti.",
    steps: [
      {
        name: "Avaa salonkitarkistus",
        text: "Avaa varaaai.com, vieritä sivun alaosaan ja napauta ”Yritykset”-ryhmästä ”Ilmainen salonkitarkistus” tai siirry suoraan [salonkitarkistukseen](/salon-check). Kirjautumista ei tarvita.",
        image: { src: shot("ilmainen-salonkitarkistus-alatunnisteessa"), alt: "VaraaAin etusivun alaosa puhelimessa, jossa Yritykset-ryhmän Ilmainen salonkitarkistus -linkki on korostettu kultaisella" },
      },
      {
        name: "Kirjoita ”Salongin nimi” ja ”Salongin osoite”",
        text: "Kirjoita ”Tarkista salonkisi” -laatikkoon ”Salongin nimi” ja sitten ”Salongin osoite”. Kirjoita nimi niin kuin asiakkaat näkevät sen kyltissä ja verkossa, jotta työkalu löytää oikean salongin.",
        image: { src: shot("salongin-nimi-ja-osoite"), alt: "Tarkista salonkisi -laatikko, jossa Salongin nimi on täytetty ja Salongin osoite -kenttä on korostettu kultaisella ehdotetun täyden osoitteen yllä" },
      },
      {
        name: "Valitse ”Salongin tyyppi” ja lisää verkkosivu, jos sellainen on",
        text: "Valitse salongin tyyppi, esimerkiksi kynsisalonki, kampaamo, spa tai ripsistudio. Jos sinulla on verkkosivu, lisää se ”Verkkosivu”-kenttään. Se on valinnainen, mutta verkkosivun kanssa raportti on kattavampi, koska työkalu löytää siitä Facebookin ja Instagramin.",
        image: { src: shot("salongin-tyyppi-kynsisalonki"), alt: "Salongin tyyppi -kenttä, jossa Kynsisalonki on korostettu kultaisella, alla valinnainen Verkkosivu-kenttä ja Google-yritysprofiilia koskeva kysymys" },
      },
      {
        name: "Vastaa Google-kysymykseen ja paina ”Tarkista nyt ilmaiseksi”",
        text: "Valitse kysymykseen ”Onko salongillasi Google-yritysprofiili?” vastaus ”Kyllä”, ”En ole varma” tai ”Ei”. Paina sitten ”Tarkista nyt ilmaiseksi”. Sähköpostia tai rekisteröitymistä ei tarvita, ja raportti on valmis muutamassa sekunnissa.",
        image: { src: shot("google-yritysprofiili-kysymys"), alt: "Kysymys Onko salongillasi Google-yritysprofiili ja vaihtoehdot Kyllä, En ole varma ja Ei korostettuna kultaisella oranssin Tarkista nyt ilmaiseksi -painikkeen yllä" },
      },
      {
        name: "Lue verkkonäkyvyyden pisteet ja kanavakohtaiset pisteet",
        text: "Katso raportin yläosasta kokonaispisteet sadasta ja vieritä sitten verkkosivun, Google-profiilin, Facebookin ja Instagramin pisteisiin. Paina kunkin kanavan alla ”Näytä tiedot”, niin näet, miksi se sai arvionsa.",
      },
      {
        name: "Lue ”Suurimmat mahdollisuutesi” ja paina ”Tulosta / tallenna PDF”",
        text: "Vieritä kohtaan ”Suurimmat mahdollisuutesi” ja lue jokaisen kohdan ”Mitä tehdä”. Paina ”Tulosta / tallenna PDF” tallentaaksesi raportin tai ”Tarkista toinen salonki”, jos sinulla on useampi toimipiste. Palaa jokaisen tehtävän jälkeen tekemään tarkistus uudelleen.",
      },
    ],
  },
  faq: [
    {
      q: "Pitääkö VaraaAin salonkitarkistukseen rekisteröityä tai antaa sähköposti?",
      a: "Ei. Työkalu on ilmainen ja avoin kaikille, eikä se pyydä sähköpostia tai rekisteröitymistä. Kirjoitat salongin tiedot, painat ”Tarkista nyt ilmaiseksi”, ja tulokset näkyvät heti sivulla.",
    },
    {
      q: "Mitä kanavia salonkitarkistus pisteyttää?",
      a: "Neljä kanavaa: verkkosivu, Google-profiili, Facebook ja Instagram. Jokainen saa pisteet sadasta ja arvion, kuten ”Vahva” tai ”Heikko”, ja lisäksi on kokonaispisteet eli verkkonäkyvyyden pisteet.",
    },
    {
      q: "Voinko tarkistaa salongin, jos sillä ei ole verkkosivua?",
      a: "Voit. ”Verkkosivu”-kenttä on valinnainen, joten voit jättää sen tyhjäksi ja tehdä tarkistuksen normaalisti. Jos lisäät verkkosivun, työkalu etsii siitä salongin Facebookin ja Instagramin.",
    },
    {
      q: "Mikä raportin osa kertoo, mitä tehdä ensin?",
      a: "”Suurimmat mahdollisuutesi”. Siinä luetellaan asiat, jotka vaikuttavat eniten siihen, valitseeko asiakas salonkisi, ja jokaisessa kohdassa on ”Mitä tehdä” -neuvo, esimerkiksi verkkosivun ja varaussivun luominen.",
    },
    {
      q: "Miten tallennan salonkitarkistuksen raportin?",
      a: "Paina raportin yläosassa ”Tulosta / tallenna PDF”, niin voit tulostaa sen tai tallentaa PDF-tiedostoksi. Tallennettua raporttia voit verrata seuraavaan tarkistukseen, kun ehdotetut tehtävät on tehty.",
    },
    {
      q: "Miten tarkistan salongin, jolla on useita toimipisteitä?",
      a: "Kun olet lukenut yhden salongin raportin, paina ”Tarkista toinen salonki” ja kirjoita seuraavan toimipisteen nimi ja osoite. Jokainen toimipiste saa oman raporttinsa.",
    },
  ],
  related: ["website-salon", "bang-gia", "chia-se-link", "danh-gia-google"],
};

export default article;
