import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/fanpage/${name}.webp`;
const shot = (name: string) => `/wiki/fanpage/fi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "kauneushoitolan-tarjoukset-fanisivulla",
  lesson: "fanpage",
  category: "marketing",
  title: "Kauneushoitolan tarjoukset fanisivulla: näin kerrot kanta-asiakkaille tarjouksista ja uusista töistä VaraaAissa",
  metaTitle: "Kauneushoitolan tarjoukset: julkaise VaraaAin fanisivulla",
  metaDescription:
    "Näin salongin omistaja julkaisee VaraaAin fanisivulla: teksti, tunniste, Varaa aika -painike, kuvat tai video, ajastus ja julkaisun kiinnitys ylös.",
  keyword: "kauneushoitolan tarjoukset",
  keywords: [
    "salongin fanisivu VaraaAissa",
    "kynsistudion tarjouksen julkaisu",
    "tarjouksesta kertominen kanta-asiakkaille",
    "julkaisun ajastus salongille",
    "julkaisun kiinnitys ylös",
    "mitä kampaamo julkaisee",
    "varauspainike julkaisun alle",
  ],
  excerpt: "Kirjoita teksti, valitse tunniste, lisää ”Varaa aika” -painike ja kuva ja julkaise. Salonkia seuraavat asiakkaat näkevät julkaisun heti syötteessään.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-quen-gap-nhau-tai-khu-cho-cua-salon"),
    alt: "Kaksi naista nauraa ja halaa tervehdykseksi salongin aurinkoisessa odotustilassa, taustalla kaksi asiakasta violeteilla tuoleilla kahvikupit käsissään",
  },
  takeaways: [
    "Jokaisella VaraaAin salongilla on **oma fanisivu**. Salonkia seuraavat asiakkaat näkevät uudet julkaisut heti syötteessään.",
    "Fanisivu on julkinen: seuraajien lisäksi kuka tahansa voi lukea salongin fanisivun julkaisut.",
    "Lisää tarjouksen alle **”Varaa aika”** -painike, niin asiakas pääsee varaussivulle yhdellä napautuksella.",
    "**”Ajasta”** julkaisee haluamanasi päivänä ja kellonaikana. **”Kiinnitä ylös”** on tärkeitä julkaisuja varten.",
    "Paina julkaisun jälkeen ”Avaa fanisivu”, niin näet sivun asiakkaan silmin, tai ”Kopioi linkki” jakaaksesi sen.",
  ],
  intro: [
    "Kauneushoitolan tarjoukset kannattaa julkaista, mutta varsinainen kysymys on, tavoittaako julkaisu oikeat ihmiset. Salongissa on uusia tyylejä tai viikonlopun tarjous, ja eniten siitä hyötyvät asiakkaat, jotka ovat jo käyneet. VaraaAissa jokaisella salongilla on tätä varten oma fanisivu: julkaiset, ja salonkia seuraavat asiakkaat näkevät julkaisun heti syötteessään.",
    "Tämä artikkeli seuraa VaraaAi Academyn oppituntia ”Fanisivu: julkaise seuraajillesi”. Teet julkaisun, jossa on tunniste, kuva ja varauspainike, tiedät milloin ajastaa ja milloin kiinnittää, ja näet salongin fanisivun juuri niin kuin asiakas sen näkee.",
  ],
  sections: [
    {
      id: "mika-fanisivu-on",
      title: "Mikä salongin fanisivu VaraaAissa on ja kuka julkaisut näkee",
      blocks: [
        { p: "Fanisivu on salongin uutiskanava VaraaAissa. Hallintapaneelin sivun yläosan esittely kertoo sen tarkoituksen: tarjoukset, uudet työt ja uutiset. Julkaisuja lukee kaksi ryhmää:" },
        {
          ul: [
            "**Salonkia seuraavat asiakkaat.** Uudet julkaisut näkyvät heti heidän syötteessään, eikä heidän tarvitse etsiä niitä.",
            "**Kuka tahansa, joka avaa salongin fanisivun.** Fanisivu on julkinen, joten myös seuraamattomat voivat lukea julkaisut.",
          ],
        },
        { p: "Arvo on ensimmäisessä ryhmässä. Seuraajista suurin osa on asiakkaita, jotka ovat jo käyneet salongissa, eli niitä, jotka palaavat todennäköisimmin kuullessaan jostain uudesta. Asiakkaan puolelta seuraamista ja syötettä käsitellään ohjeessa [salongin tarjouksista syötteeseen](lesson:theo-doi-salon)." },
        { img: { src: shot("fanisivu-asiakkaan-nakyma"), alt: "Lumi Beauty Paris -salongin fanisivu asiakkaan silmin: kansikuva, pyöreä logo, julkaisujen ja seuraajien määrä sekä Seurataan- ja Varaa-painikkeet korostettuna kultaisella", caption: "Asiakkaan näkemä fanisivu: salongin nimi, julkaisut, seuraajat ja ”Varaa”-painike heti alla." } },
        { p: "Hallintapaneelin ”Fanisivu”-näkymän yläosassa on neljä lukua: ”Julkaisut”, ”Seuraajat”, ”Tykkäykset” ja ”Kommentit”. Niistä näet, kuinka moni saa seuraavan julkaisusi." },
      ],
    },
    {
      id: "ennen-julkaisua",
      title: "Mitä päätät ennen kuin julkaiset kampaamon tai kynsistudion puolesta",
      blocks: [
        { p: "Julkaisu käy nopeasti, kun olet miettinyt nämä neljä asiaa valmiiksi:" },
        {
          ul: [
            "**Mistä julkaisu kertoo.** Yhdessä julkaisussa on yksi uutinen: tarjous, uusi tyyli tai tiedote.",
            "**Kuva tai video.** Yhteen julkaisuun voi lisätä useita kuvia. Salongin omat kuvat ja tekijöiden oikeat työt vakuuttavat enemmän kuin netistä haetut kuvat.",
            "**Mitä asiakkaan pitäisi tehdä lukemisen jälkeen.** Varata, katsoa tuotteita vai soittaa. Vastaus ratkaisee, minkä painikkeen valitset julkaisun alle.",
            "**Julkaistaanko heti vai myöhemmin.** Jos julkaisun pitää tulla näkyviin toiseen aikaan, käytä ”Ajasta”-toimintoa.",
          ],
        },
        { note: "”Varaa aika” -painike vie asiakkaan salongin varaussivulle. Varmista, että julkaisun palvelu on [salongin palveluissa](lesson:dich-vu) oikealla nimellä ja hinnalla, jotta asiakas löytää sen heti.", kind: "info", title: "Ennen kuin lisäät varauspainikkeen" },
      ],
    },
    {
      id: "tunniste-ja-painike",
      title: "Oikea tunniste ja painike julkaisulle",
      blocks: [
        { p: "”Tunniste” kertoo asiakkaalle julkaisun tyypin ennen kuin hän lukee tekstin. Julkaistussa postauksessa tunniste näkyy tekstin yläpuolella. Tunnisteita on neljä ja lisäksi vaihtoehto ”Ei tunnistetta”:" },
        {
          table: {
            head: ["Tunniste", "Ehdotettu käyttö"],
            rows: [
              ["”Tarjous”", "Määräaikaiset edut, alennukset, lahja hoidon kaupan päälle"],
              ["”Uusi työ”", "Kuvat juuri tehdyistä kynsistä, hiuksista tai ripsistä"],
              ["”Tiedote”", "Muuttuneet aukioloajat, vapaapäivät, uusi palvelu"],
              ["”Kauneusvinkki”", "Jälkihoito-ohjeita palvelun jälkeen"],
            ],
          },
        },
        { img: { src: shot("valitse-tunniste-tarjous-uusi-tyo"), alt: "Tunnistevaihtoehdot Ei tunnistetta, Tarjous, valittu Uusi työ, Tiedote ja Kauneusvinkki korostettuna kultaisella, alla Painike-vaihtoehdot" } },
        { p: "”Painike” on se, mitä haluat asiakkaan tekevän seuraavaksi. Painikkeita on kolme ja lisäksi ”Ei painiketta”:" },
        {
          table: {
            head: ["Painike", "Sopii julkaisuun"],
            rows: [
              ["”Varaa aika”", "Tarjoukset ja uudet työt. Asiakas napauttaa ja siirtyy suoraan varaussivulle"],
              ["”Katso tuotteet”", "Julkaisut salongin myymistä tuotteista"],
              ["”Soita nyt”", "Julkaisut, joissa asiakkaan pitää jutella salongin kanssa suoraan"],
              ["”Ei painiketta”", "Tiedotteet, joissa asiakkaan ei tarvitse tehdä mitään"],
            ],
          },
        },
        { img: { src: shot("painike-julkaisun-alle-varaa-aika"), alt: "Painike-vaihtoehdot Ei painiketta, valittu Varaa aika, Katso tuotteet ja Soita nyt korostettuna kultaisella, alla Kuvat, Video, Ajasta ja Julkaise" } },
        { note: "Lisää tarjouksen alle ”Varaa aika” -painike, niin asiakas varaa yhdellä napautuksella. Ilman painiketta asiakkaan pitää etsiä varaussivu itse, ja moni jättää sen myöhemmäksi ja unohtaa.", kind: "tip", title: "Tarjous tarvitsee aina painikkeen" },
      ],
    },
    {
      id: "ajastus-ja-kiinnitys",
      title: "Julkaisun ajastus ja kiinnitys fanisivun ylimmäksi",
      blocks: [
        { p: "Kaksi pientä painiketta ”Kuvat”- ja ”Video”-painikkeiden vieressä ratkaisevat kaksi eri ongelmaa." },
        { h3: "”Ajasta”: kirjoita kun ehdit, julkaise kun on oikea hetki" },
        { p: "Paina ”Ajasta”, valitse päivä ja kellonaika, niin julkaisu tulee näkyviin juuri silloin. Salongin omistajalla on usein vapaat kädet vasta illalla sulkemisen jälkeen. Voit kirjoittaa julkaisun silloin ja ajastaa sen seuraavalle päivälle sen sijaan, että muistaisit avata puhelimen kesken kiireisen työpäivän." },
        { img: { src: shot("ajasta-julkaisu"), alt: "Julkaisukentän painikerivi, jossa Ajasta-painike on korostettu kultaisella Kuvat 1/6- ja Video-painikkeiden vieressä, alla Kiinnitä ylös ja Julkaise", caption: "Painikerivi kentän alla: ”Kuvat”, ”Video”, ”Ajasta”, ”Kiinnitä ylös” ja ”Julkaise”." } },
        { h3: "”Kiinnitä ylös”: pidä tärkeä julkaisu ensimmäisenä" },
        { p: "Jokainen uusi julkaisu työntää vanhemmat alemmas. Tärkeän julkaisun, kuten koko kuukauden voimassa olevan tarjouksen, kohdalla paina ”Kiinnitä ylös”, niin fanisivun avaaja näkee sen ensimmäisenä." },
      ],
    },
    {
      id: "tarjouksen-kirjoittaminen",
      title: "Näin kirjoitat kynsistudion tarjouksen, joka tuo varauksia",
      blocks: [
        { p: "Oppituntivideon esimerkkijulkaisu on tiivis malli: joulukuun etu, 15 % alennus kaikista geelipalveluista, kun asiakas varaa verkossa ennen 20. päivää, ja lopuksi ”Nähdään Lumi Beauty Parisissa”. 15 % on vain videon esimerkki, mutta rakenne kannattaa ottaa käyttöön." },
        {
          table: {
            head: ["Julkaisun pitää kertoa", "Videon esimerkissä"],
            rows: [
              ["Mikä etu", "Prosenttialennus"],
              ["Mihin palveluun", "Kaikkiin geelipalveluihin"],
              ["Millä ehdolla", "Verkkovarauksella"],
              ["Mihin asti", "Ennen 20. päivää"],
            ],
          },
        },
        { p: "Kun julkaisussa on nämä neljä asiaa, asiakkaan ei tarvitse kysyä viestillä lisää. Lisää ”Tarjous”-tunniste, kuva ja ”Varaa aika” -painike." },
        { img: { src: shot("joulukuun-tarjous-julkaisu"), alt: "Lumi Beauty Paris -salongin julkaisu Tarjous-tunnisteella, joulukuun etu -teksti ja kuva kylpyläosastolla rentoutuvasta asiakkaasta" } },
        { p: "Fanisivu tavoittaa salonkia jo seuraavat asiakkaat. Muille tarvitset edelleen muita kanavia, kuten [ajanvarauslinkin](lesson:chia-se-link) tai [sähköpostimarkkinoinnin](lesson:email-marketing)." },
      ],
    },
    {
      id: "julkaisun-jalkeen",
      title: "Julkaisun jälkeen: avaa fanisivu, jaa linkki ja tavallisia tilanteita",
      blocks: [
        { p: "Julkaisu näkyy salongin fanisivulla heti kuvan ja valitsemasi painikkeen kanssa. Asiakkaat voivat tykätä, kommentoida ja jakaa sen, ja ”Fanisivu”-näkymän neljä lukua muuttuvat sen mukaan." },
        { img: { src: shot("tykkaa-kommentoi-jaa"), alt: "Julkaisun alaosa, jossa kylpyläkuva, Varaa aika -painike sekä Tykkää-, Kommentoi- ja Jaa-painikkeet korostettuna kultaisella" } },
        { p: "Paina ”Avaa fanisivu”, niin näet sivun täsmälleen asiakkaan silmin. Paina ”Kopioi linkki”, niin saat fanisivun osoitteen, jonka voit lähettää asiakkaille viestillä tai lisätä salongin someen. Linkin avaaja näkee julkaisut heti, koska fanisivu on julkinen." },
        { img: { src: shot("avaa-fanisivu-ja-kopioi-linkki"), alt: "Fanisivu-näkymän yläosa hallintapaneelissa, jossa Avaa fanisivu ja korostettu Kopioi linkki -painike Julkaisut-laskurin yläpuolella", caption: "Ensimmäisen julkaisun jälkeen ”Julkaisut”-laskurissa lukee 1." } },
        {
          table: {
            head: ["Tilanne", "Mitä teet"],
            rows: [
              ["Haluat julkaisun näkyviin huomenna", "Paina ”Ajasta” ja valitse päivä ja kellonaika"],
              ["Uudet julkaisut työntävät tarjouksen alas", "Paina tarjouksen kohdalla ”Kiinnitä ylös”"],
              ["Asiakkaat lukevat julkaisun mutta eivät varaa", "Valitse kohdassa ”Painike” ”Varaa aika”"],
              ["Haluat nähdä, miltä fanisivu näyttää asiakkaalle", "Paina ”Avaa fanisivu”"],
              ["Fanisivulla on vähän seuraajia", "Paina ”Kopioi linkki” ja lähetä fanisivun linkki kanta-asiakkaille"],
            ],
          },
        },
        { p: "Jos haluat lisäksi kattavan esittelysivun, jossa on palvelut, tiimi ja arvostelut, katso ohje [ilmaisista verkkosivuista kampaamolle](lesson:website-salon). ”Aloitussivu” on hallintapaneelissa heti ”Fanisivu”-kohdan vieressä." },
      ],
    },
  ],
  howTo: {
    title: "Näin julkaiset kauneushoitolan tarjouksen VaraaAin fanisivulla",
    id: "fanisivun-julkaisu",
    after: "ennen-julkaisua",
    lead: "Seitsemän vaihetta seuraavat oppituntivideota julkaisukentästä fanisivun tarkistamiseen.",
    steps: [
      {
        name: "Avaa ”Fanisivu”",
        text: "Napauta hallintapaneelissa ”Fanisivu”. Ylhäällä näkyvät julkaisut, seuraajat, tykkäykset ja kommentit. Julkaisun kirjoituskenttä on heti alla.",
        image: { src: shot("julkaisut-seuraajat-tykkaykset-kommentit"), alt: "Fanisivu-näkymän yläosa, jossa neljä laskuria Julkaisut, Seuraajat, Tykkäykset ja Kommentit on korostettu kultaisella, alla julkaisukenttä" },
      },
      {
        name: "Kirjoita teksti julkaisukenttään",
        text: "Kirjoita julkaisu kenttään, joka kysyy, mitä uutta salongilla on tänään. Pidä teksti lyhyenä ja kerro pääasia ensimmäisessä lauseessa: mikä etu, mihin palveluun ja mihin asti. Syötettä selaava asiakas lukee vain ensimmäiset rivit.",
        image: { src: shot("kirjoita-julkaisun-teksti"), alt: "Kultaisella korostettu julkaisukenttä tekstillä Uutta tällä viikolla: pehmeät mantelikynnet talven sävyissä, alla lisätty kuva ja tunnisteet" },
      },
      {
        name: "Valitse ”Tunniste”",
        text: "Napauta yhtä neljästä tunnisteesta: ”Tarjous”, ”Uusi työ”, ”Tiedote” tai ”Kauneusvinkki”. Tunniste näkyy julkaisun tekstin yläpuolella ja auttaa asiakasta tunnistamaan uutisen tyypin ennen lukemista.",
      },
      {
        name: "Valitse ”Painike”",
        text: "Valitse painike, jota asiakas napauttaa luettuaan: ”Varaa aika”, ”Katso tuotteet” tai ”Soita nyt”. Tarjoukseen valitse ”Varaa aika”, niin asiakas pääsee suoraan varaussivullesi.",
      },
      {
        name: "Lisää kuvia napauttamalla ”Kuvat” tai ”Video”",
        text: "Napauta ”Kuvat” tai ”Video” ja valitse tiedosto. Yhdessä julkaisussa voi olla useita kuvia; oppituntivideossa ”Kuvat”-painikkeen laskuri näyttää 1/6 ensimmäisen kuvan jälkeen. Lisätyt kuvat näkyvät heti tekstin alla tarkistettavaksi.",
        image: { src: shot("kuva-lisatty-julkaisuun"), alt: "Julkaisuun juuri lisätty hoitokuva tekstin alla, alempana Tunniste- ja Painike-vaihtoehdot" },
      },
      {
        name: "Napauta tarvittaessa ”Ajasta” tai ”Kiinnitä ylös”",
        text: "Jos haluat julkaisun näkyviin toiseen aikaan, napauta ”Ajasta” ja valitse päivä ja kellonaika. Tärkeän julkaisun kohdalla napauta ”Kiinnitä ylös”. Kumpikaan ei ole pakollinen, ja arkijulkaisut voivat ohittaa tämän vaiheen.",
        image: { src: shot("kiinnita-ylos"), alt: "Julkaisukentän painikerivi, jossa Kiinnitä ylös on korostettu kultaisella Kuvat-, Video- ja Ajasta-painikkeiden alla, alla Julkaise-painike" },
      },
      {
        name: "Napauta ”Julkaise” ja sitten ”Avaa fanisivu”",
        text: "Napauta ”Julkaise”. Julkaisu näkyy salongin fanisivulla heti kuvan ja ”Varaa aika” -painikkeen kanssa. Napauta sitten ”Avaa fanisivu” nähdäksesi sivun asiakkaan silmin tai ”Kopioi linkki” lähettääksesi sen asiakkaille.",
        image: { src: shot("julkaise-painike"), alt: "Julkaisukentän alareunan musta Julkaise-painike korostettuna kultaisella, yläpuolella Kuvat-, Video-, Ajasta- ja Kiinnitä ylös -painikkeet" },
      },
    ],
  },
  faq: [
    {
      q: "Kuka näkee salongin fanisivun julkaisut VaraaAissa?",
      a: "Salonkia seuraavat asiakkaat näkevät uudet julkaisut heti syötteessään. Fanisivu on lisäksi salongin julkinen kanava, joten kuka tahansa voi lukea sen julkaisut.",
    },
    {
      q: "Miten ajastan julkaisun huomiseksi?",
      a: "Napauta julkaisukentässä ”Ajasta” ja valitse päivä ja kellonaika. Julkaisu tulee näkyviin juuri silloin, eikä sinun tarvitse avata sovellusta uudelleen.",
    },
    {
      q: "Mikä julkaisun painike auttaa asiakasta varaamaan nopeimmin?",
      a: "”Varaa aika” -painike. Asiakas napauttaa sitä ja siirtyy suoraan salongin varaussivulle, joten se kuuluu jokaisen tarjouksen alle.",
    },
    {
      q: "Mitä tunnisteita fanisivun julkaisussa voi olla?",
      a: "Tunnisteita on neljä: ”Tarjous”, ”Uusi työ”, ”Tiedote” ja ”Kauneusvinkki”. Voit valita myös ”Ei tunnistetta”, jos julkaisu ei sovi mihinkään niistä.",
    },
    {
      q: "Milloin ”Kiinnitä ylös” kannattaa käyttää?",
      a: "Tärkeässä julkaisussa, jonka haluat asiakkaan näkevän ensimmäisenä, esimerkiksi voimassa olevassa tarjouksessa. Napauta ”Kiinnitä ylös” julkaisukentässä ennen julkaisua.",
    },
    {
      q: "Miten lähetän salongin fanisivun asiakkaille?",
      a: "Napauta hallintapaneelin ”Fanisivu”-näkymässä ”Kopioi linkki” ja lähetä fanisivun osoite asiakkaille. Voit myös ensin napauttaa ”Avaa fanisivu” ja katsoa sivun asiakkaan silmin.",
    },
  ],
  related: ["website-salon", "chia-se-link", "email-marketing", "theo-doi-salon"],
};

export default article;
