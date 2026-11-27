import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/danh-gia-google/${name}.webp`;
const shot = (name: string) => `/wiki/danh-gia-google/fi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "google-arvostelut-yritykselle",
  lesson: "danh-gia-google",
  category: "marketing",
  title: "Google-arvostelut yritykselle: hyväksy arvostelut, vastaa asiakkaille ja pyydä tyytyväisiä arvioimaan Googlessa",
  metaTitle: "Google-arvostelut yritykselle: kampaamo, kynsistudio, hoitola",
  metaDescription:
    "Näin hallitset salongin arvosteluja VaraaAissa: hyväksyt jokaisen ennen julkaisua, vastaat valmiilla pohjilla ja lisäät Google Maps -linkin.",
  keyword: "Google-arvostelut yritykselle",
  keywords: [
    "miten saada lisää Google-arvosteluja",
    "Google-arvostelut kampaamolle",
    "arvosteluihin vastaaminen",
    "vastaus 5 tähden arvosteluun",
    "miten vastata huonoon arvosteluun",
    "arvostelupyyntö sähköpostilla käynnin jälkeen",
    "arvostelujen hyväksyminen ennen julkaisua",
  ],
  excerpt: "Asiakas saa arvostelupyynnön sähköpostitse jokaisen toteutuneen käynnin jälkeen. Sinä hyväksyt, julkaiset ja vastaat valmiilla pohjilla, ja Google Maps -linkki ohjaa tyytyväiset asiakkaat myös Googleen.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-nu-cuoi-nhin-dien-thoai-trong-salon"),
    alt: "Vaaleahiuksinen nuori nainen kermanvärisessä neuleessa hymyilee puhelimelleen salongissa, ja näytön yllä hehkuu lahjapaketin kuvake",
  },
  takeaways: [
    "Asiakas saa **arvostelupyynnön sähköpostitse automaattisesti** jokaisen toteutuneen käynnin jälkeen. Sinun ei tarvitse lähettää mitään.",
    "Uusi arvostelu näkyy salongin sivulla **vasta, kun painat ”Julkaise”**.",
    "Listan yläpuolelle ilmestyvä kultainen painike julkaisee kaikki odottavat 4–5 tähden arvostelut kerralla.",
    "Vastaa jollakin kolmesta pohjasta, ”Kiitos”, ”Arvostamme” tai ”Pahoittelu”, muokkaa tekstiä ja paina ”Julkaise vastaus”.",
    "Lisää **Google Maps -linkki ”Asetuksiin”**, niin tyytyväisiä asiakkaita pyydetään arvioimaan sinut myös Googlessa.",
  ],
  intro: [
    "Google-arvostelut yritykselle kertyvät vähimmällä vaivalla, kun pyyntö lähtee jokaisen käynnin jälkeen itsestään eikä sen varassa, muistaako joku kysyä asiakkaalta kassalla. Uudet asiakkaat lukevat usein arvosteluja ennen kuin valitsevat salongin, joten muutama rehellinen lause aiemmilta asiakkailta painaa enemmän kuin mikään esittelyteksti.",
    "Tämä artikkeli seuraa VaraaAi Academyn oppituntia ”Arvostelut ja Google”. Opit hyväksymään jokaisen arvostelun ennen kuin se näkyy salongin sivulla, vastaamaan asiakkaille valmiilla vastauspohjilla ja ottamaan käyttöön pyynnön, joka ohjaa tyytyväiset asiakkaat arvioimaan sinut myös Googlessa.",
  ],
  sections: [
    {
      id: "mista-arvostelut-tulevat",
      title: "Mistä arvostelut tulevat: automaattinen arvostelupyyntö sähköpostilla",
      blocks: [
        { p: "Arvostelujen pyytämisessä vaikeinta on muistaa pyytää. Tekijällä on jo seuraava asiakas tuolissa, ja maksanut asiakas on lähdössä kiireellä. VaraaAissa kenenkään ei tarvitse muistaa: asiakas saa automaattisesti sähköpostin, jossa pyydetään arvostelua, jokaisen toteutuneen käynnin jälkeen." },
        { img: { src: shot("automaattiset-arvostelupyynnot"), alt: "Arvostelut-sivu tabletilla, jossa Automaattiset arvostelupyynnöt -ruutu on korostettu kultaisella Lisää Google-arvosteluja -osion alla, alempana Arviot tekijöittäin", caption: "”Automaattiset arvostelupyynnöt”: asiakas saa pyynnön sähköpostitse jokaisen toteutuneen käynnin jälkeen, eikä sinun tarvitse tehdä mitään." } },
        { p: "Lauseeseen kätkeytyy kaksi ehtoa. Varauksen on oltava järjestelmässä, ja se on merkittävä toteutuneeksi. Kun salonki pitää kalenterinsa ajan tasalla, kuten ohjeessa [varausten hallinnasta](lesson:lich-hen) neuvotaan, pyyntö lähtee juuri niille, jotka todella kävivät." },
        { p: "Jos haluat nähdä, mitä asiakas näkee antaessaan tähdet ja kirjoittaessaan kommentin, lue ohje [salongin arvostelusta käynnin jälkeen](lesson:viet-danh-gia)." },
      ],
    },
    {
      id: "arvostelut-sivu",
      title: "”Arvostelut”-sivu: keskiarvo, hyväksyntää odottavat ja vastausprosentti",
      blocks: [
        { p: "Avaa ”Arvostelut”, niin sivun yläosassa on kolme lukua. Niiden alla näkyvät keskiarvosi ja arvostelujen määrä tähtimäärittäin." },
        {
          table: {
            head: ["Luku", "Mitä se kertoo", "Mitä teet"],
            rows: [
              ["Keskiarvo", "Arvostelujen tähtien keskiarvo viidestä", "Seuraa suuntaa, älä hätäile yksittäisestä arvostelusta"],
              ["”Odottaa hyväksyntää”", "Asiakkaiden lähettämät arvostelut, joita et ole vielä julkaissut tai piilottanut", "Käy ne läpi säännöllisesti, niin uudet arvostelut tulevat näkyviin pian"],
              ["”Vastausprosentti”", "Kuinka suureen osaan arvosteluista salonki on vastannut", "Mitä useampaan vastaat, sitä korkeammaksi luku nousee"],
            ],
          },
        },
        { p: "Alempana ovat suodattimet ”Kaikki”, ”Odottaa”, ”Vastaamatta”, ”Julkaistu” ja ”Piilotettu”. ”Odottaa” ja ”Vastaamatta” ovat käytännössä tehtävälistasi. Sivulla on myös hakukenttä asiakkaan nimelle tai arvostelun tekstille, ja sivun lopussa on osio ”Arviot tekijöittäin”." },
        { img: { src: shot("arvostelujen-suodattimet-odottaa-vastaamatta"), alt: "Suodatinrivi Kaikki, Odottaa ja Vastaamatta korostettuna kultaisella, alla hakukenttä, tähti- ja järjestysvalikot sekä julkaistu arvostelu Namilta", caption: "Suodattimilla näet ensin ne arvostelut, jotka odottavat sinua." } },
      ],
    },
    {
      id: "arvostelujen-hyvaksyminen",
      title: "Arvostelujen hyväksyminen ennen julkaisua salongin sivulla",
      blocks: [
        { p: "Uusi arvostelu ei tule julkiseksi itsestään. Sen tila on ”Odottaa”, kunnes teet päätöksen. Jokaisen arvostelun kohdalla on kaksi vaihtoehtoa: ”Julkaise”, niin se tulee näkyviin, tai ”Piilota”, jos sisältö ei sovi sivullesi." },
        { p: "Kun hyviä arvosteluja odottaa useampi, niitä ei tarvitse julkaista yksitellen. Listan yläpuolelle tulee kultainen painike, joka julkaisee kaikki odottavat neljän ja viiden tähden arvostelut kerralla, ja painikkeessa näkyy niiden määrä." },
        { img: { src: shot("piilota-painike-julkaistu-arvostelu"), alt: "Namin julkaistu viiden tähden arvostelu ja sen alla salongin vastaus, alareunassa Muokkaa vastausta ja kultaisella korostettu Piilota-painike", caption: "Myös jo julkaistun arvostelun voi piilottaa ”Piilota”-painikkeella." } },
        { note: "”Piilota” on tarkoitettu sisällölle, joka ei sovi sivulle. Perusteltu moite on eri asia: kun se julkaistaan rauhallisen ja kohteliaan vastauksen kanssa, uusi asiakas näkee, miten salonki hoitaa ongelmat. Lukijat katsovat tähtien lisäksi salongin vastausta.", kind: "tip", title: "Älä piilota jokaista moitetta" },
      ],
    },
    {
      id: "arvosteluihin-vastaaminen",
      title: "Arvosteluihin vastaaminen: kolme valmista vastauspohjaa",
      blocks: [
        { p: "Paina arvostelun alla ”Vastaa”, niin ”Vastauspohjat” aukeavat kolmella vaihtoehdolla. Jokaisen pohjan kohdalla näkyy, minkä tähtimäärän arvosteluun se sopii:" },
        {
          table: {
            head: ["Pohja", "Sopii", "Mitä lisäät"],
            rows: [
              ["”Kiitos (5★)”", "5 tähden arvosteluun", "Mainitse hoito tai tekijän nimi"],
              ["”Arvostamme (4★)”", "4 tähden arvosteluun", "Kerro, minkä palautteen kohdan otat huomioon"],
              ["”Pahoittelu (≤3★)”", "Enintään 3 tähden arvosteluun", "Kerro, mitä salonki tekee toisin, ja pyydä asiakasta ottamaan yhteyttä"],
            ],
          },
        },
        { img: { src: shot("vastauspohjat-kiitos-arvostamme-pahoittelu"), alt: "Namin arvostelun alla Vastauspohjat-osio, jossa pohjat Kiitos, Arvostamme ja Pahoittelu on korostettu kultaisella, alla muokattava kiitosviesti ja Julkaise vastaus" } },
        { p: "Pohja on vain lähtökohta. Oppitunti neuvoo valitsemaan pohjan ja muokkaamaan sitä, koska sama lause jokaisen arvostelun alla kertoo lukijalle, ettei niitä ole oikeasti luettu. Yksi yksityiskohta juuri siitä käynnistä riittää tekemään vastauksesta henkilökohtaisen." },
        { img: { src: shot("salongin-vastaus-arvostelun-alla"), alt: "Namin julkaistu viiden tähden arvostelu, jonka alla kultaisella korostettu Salongin vastaus -kiitosviesti ja sen alla Muokkaa vastausta ja Piilota", caption: "Salongin vastaus näkyy heti asiakkaan arvostelun alla. Jos olet jo vastannut, painikkeessa lukee ”Muokkaa vastausta”." } },
        { p: "Vastaa hyviin arvosteluihin yhtä lailla kuin moitteisiin. Asiakas, joka näki vaivaa kirjoittaakseen muutaman ystävällisen lauseen, tuntee itsensä arvostetuksi, kun salonki vastaa. Kun asiakas valittaa, kirjaa asia myös [asiakasrekisterin](lesson:khach-hang) sisäisiin muistiinpanoihin, niin koko tiimi tietää sen ensi kerralla." },
      ],
    },
    {
      id: "lisaa-google-arvosteluja",
      title: "Miten saada lisää Google-arvosteluja: Google Maps -linkki asetuksiin",
      blocks: [
        { p: "Salongin VaraaAi-sivun arvostelut auttavat niitä, jotka ovat jo löytäneet sinut VaraaAista. Google-arvostelut auttavat niitä, jotka etsivät salonkia Googlesta ja Google Mapsista. Ne tukevat toisiaan, ja oppitunti näyttää, miten ne yhdistetään." },
        { p: "”Arvostelut”-sivulla on osio ”Lisää Google-arvosteluja”. Se neuvoo lisäämään Google Maps -linkin Asetuksissa, jotta voit pyytää Google-arvosteluja, ja siinä on ”Avaa Asetukset” -painike. Google Maps -linkki on salongisi sijainnin verkko-osoite Google Mapsissa. Kun olet lisännyt sen, tyytyväisiä asiakkaita pyydetään arvioimaan sinut myös Googlessa." },
        { img: { src: shot("lisaa-google-arvosteluja-avaa-asetukset"), alt: "Tumma Lisää Google-arvosteluja -osio korostettuna kultaisella ja siinä Avaa Asetukset -painike, alla Automaattiset arvostelupyynnöt ja Arviot tekijöittäin", caption: "Paina ”Avaa Asetukset”, niin pääset lisäämään salongin Google Maps -linkin." } },
        { p: "Googlelle ei makseta tästä mitään. Tarvitset vain salongin, joka löytyy jo Google Mapsista. Jos et ole varma, miltä salonkisi näyttää Googlessa, [maksuton salonkitarkistus verkkosivuista, Googlesta ja Facebookista](lesson:kiem-tra-salon) auttaa katsomaan sen läpi." },
        { note: "Sähköposti hoitaa säännöllisen työn. Kassalla sanottu lause, kun asiakas on juuri valmis ja tyytyväinen lopputulokseen, toimii silti omalla tavallaan, esimerkiksi: ”Jos olit tyytyväinen, saat pian sähköpostin. Muutama sana auttaisi meitä paljon.”", kind: "tip", title: "Mainitse asiasta myös kasvokkain" },
      ],
    },
    {
      id: "arjen-tilanteet",
      title: "Tavallisia tilanteita arvostelujen hallinnassa",
      blocks: [
        {
          table: {
            head: ["Tilanne", "Mitä teet"],
            rows: [
              ["Asiakas kertoo jättäneensä arvostelun, mutta sivullasi sitä ei näy", "Avaa suodatin ”Odottaa” ja paina ”Julkaise”. Arvostelu näkyy vasta julkaisun jälkeen"],
              ["Useampi hyvä arvostelu odottaa", "Paina kultaista painiketta, niin kaikki odottavat 4–5 tähden arvostelut julkaistaan kerralla"],
              ["Saat matalan arvosanan", "Lue arvostelu huolella, paina ”Vastaa”, valitse pohja ”Pahoittelu” ja muokkaa se tapahtuneen mukaiseksi"],
              ["Olet julkaissut vastauksen mutta haluat kirjoittaa sen uudelleen", "Paina salongin vastauksen alla ”Muokkaa vastausta”"],
              ["Haluat lisää arvosteluja Googleen", "Paina ”Lisää Google-arvosteluja” -osiossa ”Avaa Asetukset” ja lisää Google Maps -linkki"],
            ],
          },
        },
        { p: "Vastaamaton viesti muuttuu helposti huonoksi arvosanaksi. Ohje [viesteistä ja tekoälyavustajasta](lesson:tin-nhan-ai) näyttää, miten asiakas saa aina vastauksen silloinkin, kun kätesi ovat kiinni työssä." },
      ],
    },
  ],
  howTo: {
    title: "Google-arvostelut yritykselle vaihe vaiheelta: hyväksy, vastaa ja yhdistä Googleen",
    id: "arvostelujen-vaiheet",
    after: "arvostelut-sivu",
    lead: "Kuusi vaihetta seuraavat oppituntivideota järjestyksessä ”Arvostelut”-sivun avaamisesta Googleen yhdistämiseen.",
    steps: [
      {
        name: "Avaa ”Arvostelut”",
        text: "Napauta hallintapaneelissa ”Arvostelut”. Ylhäällä ovat luvut ”Vastausprosentti”, ”Odottaa hyväksyntää” ja ”Viimeiset 30 pv”, ja niiden alla keskiarvosi. ”Odottaa hyväksyntää” kertoo, montako arvostelua odottaa sinua.",
        image: { src: shot("arvostelujen-yhteenveto-vastausprosentti"), alt: "Kolme ruutua Vastausprosentti, Odottaa hyväksyntää ja Viimeiset 30 pv korostettuna kultaisella, alla keskiarvo 5,0 viidestä ja tähtijakauma" },
      },
      {
        name: "Suodata odottavat arvostelut",
        text: "Napauta suodatinta ”Odottaa”, niin näet vain arvostelut, joita ei ole vielä julkaistu. Muut suodattimet ovat ”Vastaamatta”, ”Julkaistu” ja ”Piilotettu”. Lue jokainen arvostelu ennen kuin päätät, mitä sille teet.",
      },
      {
        name: "Paina ”Julkaise” tai ”Piilota”",
        text: "Paina jokaisen arvostelun kohdalla ”Julkaise”, niin se tulee näkyviin salongin sivulle, tai ”Piilota”, jos se ei sovi sivullesi. Uusi arvostelu näkyy salongin sivulla vasta, kun julkaiset sen.",
      },
      {
        name: "Julkaise kaikki odottavat 4–5 tähden arvostelut kerralla",
        text: "Kun hyviä arvosteluja odottaa useampi, paina listan yläpuolella olevaa kultaista painiketta. Se julkaisee kaikki odottavat neljän ja viiden tähden arvostelut kerralla, joten sinun tarvitsee katsoa erikseen vain heikommat arvosanat.",
      },
      {
        name: "Paina ”Vastaa”, valitse pohja ja paina ”Julkaise vastaus”",
        text: "Paina arvostelun alla ”Vastaa”. Valitse pohja ”Kiitos”, ”Arvostamme” tai ”Pahoittelu” ja muokkaa se juuri tälle asiakkaalle sopivaksi. Paina sitten ”Julkaise vastaus”. Vastauksesi näkyy heti asiakkaan arvostelun alla.",
        image: { src: shot("julkaise-vastaus-painike"), alt: "Vastauspohjat Kiitos (5★), Arvostamme (4★) ja Pahoittelu (≤3★), tekstikentässä kiitosviesti ja kultaisella korostettu Julkaise vastaus -painike" },
      },
      {
        name: "Lisää Google Maps -linkki ”Asetuksiin”",
        text: "Paina osiossa ”Lisää Google-arvosteluja” painiketta ”Avaa Asetukset” ja lisää salongin Google Maps -linkki. Siitä lähtien tyytyväisiä asiakkaita pyydetään arvioimaan sinut myös Googlessa, automaattisen sähköpostipyynnön lisäksi.",
      },
    ],
  },
  faq: [
    {
      q: "Miten saan asiakkaat arvioimaan salonkini Googlessa?",
      a: "Lisää salongin Google Maps -linkki ”Asetuksiin”. ”Arvostelut”-sivun osiossa ”Lisää Google-arvosteluja” on ”Avaa Asetukset” -painike, joka vie sinne. Kun linkki on lisätty, tyytyväisiä asiakkaita pyydetään arvioimaan sinut myös Googlessa.",
    },
    {
      q: "Pitääkö minun lähettää arvostelupyyntö jokaiselle asiakkaalle itse?",
      a: "Ei. Asiakas saa automaattisesti sähköpostin, jossa pyydetään arvostelua, jokaisen toteutuneen käynnin jälkeen. Sinun ei tarvitse tehdä mitään.",
    },
    {
      q: "Näkyvätkö asiakkaiden arvostelut salongin sivulla automaattisesti?",
      a: "Eivät. Uusi arvostelu näkyy salongin sivulla vasta, kun painat ”Julkaise”. Hyväksyt jokaisen arvostelun ennen julkaisua, ja voit painaa ”Piilota”, jos sisältö ei sovi sivullesi.",
    },
    {
      q: "Kannattaako 5 tähden arvosteluun vastata?",
      a: "Kannattaa. Kun vastaat myös hyviin arvosteluihin, asiakas tuntee itsensä arvostetuksi. Paina ”Vastaa”, valitse pohja ”Kiitos”, muokkaa sitä ja paina ”Julkaise vastaus”.",
    },
    {
      q: "Miten vastata huonoon arvosteluun salongin puolesta?",
      a: "Paina ”Vastaa” ja valitse pohja ”Pahoittelu”, joka on tarkoitettu enintään kolmen tähden arvosteluihin. Muokkaa se vastaamaan sitä, mitä asiakkaalle tapahtui, ja paina ”Julkaise vastaus”. Vastauksesi näkyy heti arvostelun alla.",
    },
    {
      q: "Miten julkaisen useita hyviä arvosteluja kerralla?",
      a: "Paina arvostelulistan yläpuolelle ilmestyvää kultaista painiketta. Se julkaisee kaikki hyväksyntää odottavat 4–5 tähden arvostelut kerralla.",
    },
  ],
  related: ["tin-nhan-ai", "khach-hang", "viet-danh-gia", "kiem-tra-salon"],
};

export default article;
