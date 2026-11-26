import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/ve-sinh-dung-cu/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "kauneushoitolan-valinehuolto",
  lesson: "ve-sinh-dung-cu",
  category: "safety",
  title: "Kauneushoitolan välinehuolto: puhdistus, desinfiointi ja sterilointi jokaisen asiakkaan jälkeen",
  metaTitle: "Kauneushoitolan välinehuolto: desinfiointi ja sterilointi",
  metaDescription:
    "Välinehuolto jokaisen asiakkaan jälkeen kynsi-, ripsi-, hius- ja spa-työssä: puhdistus, desinfiointi, sterilointi ja säilytys sekä mikä väline vaatii mitäkin.",
  keyword: "kauneushoitolan välinehuolto",
  keywords: ["välineiden sterilointi kauneushoitolassa", "desinfiointi ja sterilointi ero", "kynsinauhapihtien sterilointi", "autoklaavi kynsistudioon", "kampaamon välineiden desinfiointi", "välineiden puhdistus asiakkaiden välillä"],
  excerpt: "Puhdistus, desinfiointi ja sterilointi ovat kolme eri tasoa. Artikkeli kertoo, mikä väline vaatii minkäkin tason ja miten välineet käsitellään jokaisen asiakkaan jälkeen.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-lam-dep-cam-tui-dung-cu-da-tiet-trung"),
    alt: "Kermanvaaleaan paitaan pukeutunut kauneudenhoitaja seisoo välinehuoltopisteessä ja pitelee sterilointipussia, jonka sisällä ovat kynsinauhapihdit",
  },
  takeaways: [
    "Tasoja on kolme: **puhdistus**, **desinfiointi** ja **sterilointi**. Ylempi taso ei koskaan korvaa edellistä.",
    "Harjaa väline aina ensin puhtaaksi. Jäljelle jäänyt lika suojaa mikrobeja, jolloin seuraavat vaiheet eivät tehoa.",
    "Ihoa lävistävät tai leikkaavat ja rikkinäistä ihoa koskettavat välineet (kynsinauhapihdit, terät, neulat, komedonipuristimet, jalkahoitovälineet) **steriloidaan kuumuudella**.",
    "Kertakäyttöiset tarvikkeet, kuten paperiviilat, puutikut ja ripsiharjat, heitetään pois yhden asiakkaan jälkeen.",
    "Alkoholisuihkaus ja pyyhkäisy ei ole kunnollista desinfiointia, eikä liotusliuos korvaa autoklaavia.",
  ],
  intro: [
    "Kauneushoitolan välinehuolto on työtä, jota jokainen tekijä tekee monta kertaa päivässä, ja juuri siitä on helpointa oikaista, kun asiakkaita on paljon. Koskee se sitten kynsinauhapihtejä, ripsipinsettejä, kampaamon saksia tai ihonhoidon komedonipuristinta, sääntö on sama: olitpa kuinka taitava tahansa, epäpuhtaista välineistä asiakas voi saada tulehduksen.",
    "Artikkeli perustuu VaraaAi Academyn Hygienia ja turvallisuus -kurssin oppituntiin ”Välineet jokaisen asiakkaan jälkeen: työvaiheet”. Opit erottamaan kolme käsittelytasoa, tiedät mikä väline vaatii minkäkin tason ja saat kiinteän työjärjestyksen, jota noudattaa jokaisen asiakkaan jälkeen.",
  ],
  sections: [
    {
      id: "tartuntatiet",
      title: "Miten taudinaiheuttajat leviävät kauneushoitolassa",
      blocks: [
        { p: "Bakteerit, sienet ja virukset, myös hepatiittivirukset, kulkevat asiakkaalta toiselle kolmea tietä: **välineiden**, **tekijän käsien** ja **pintojen** kautta. Pinnoilla tarkoitetaan esimerkiksi työpöytää, käsitukea, hoitosänkyä ja tuolia." },
        { p: "Riski on suurin, kun väline koskettaa naarmuuntunutta tai rikkinäistä ihoa tai limakalvoa, kuten silmän seutua ripsienpidennyksissä. Pieni kynsinauhapihtien aiheuttama haava riittää päästämään taudinaiheuttajat sisään. Siksi välineen käsittelytaso riippuu siitä, mihin se asiakkaassa koskee." },
      ],
    },
    {
      id: "kolme-tasoa",
      title: "Puhdistus, desinfiointi ja sterilointi: mikä on ero",
      blocks: [
        { p: "Sanoja käytetään usein kuin ne tarkoittaisivat samaa. Kyse on kuitenkin kolmesta eri tasosta." },
        {
          table: {
            head: ["Taso", "Mitä tehdään", "Mitä sillä saavutetaan"],
            rows: [
              ["1. Puhdistus", "Harjataan vedellä, saippualla ja harjalla", "Näkyvä lika lähtee. Pakollinen ennen kahta seuraavaa tasoa"],
              ["2. Desinfiointi", "Upotetaan kokonaan välineille tarkoitettuun desinfiointiliuokseen oikealla vahvuudella ja ajalla", "Mikrobien määrä laskee turvalliselle tasolle, mutta itiöt eivät välttämättä kuole"],
              ["3. Sterilointi", "Kuumuus autoklaavissa tai kuumailmasterilaattorissa", "Kaikki mikrobit kuolevat, myös itiöt"],
            ],
          },
        },
        { note: "Steriloivaksi mainostettu liotusliuos ei korvaa autoklaavia eikä kuumailmasterilaattoria.", kind: "warn", title: "Älä luota pullon nimeen" },
      ],
    },
    {
      id: "mika-valine-mika-taso",
      title: "Mikä väline vaatii minkäkin käsittelytason",
      blocks: [
        { p: "Helppo muistisääntö: mitä todennäköisemmin väline rikkoo ihon, sitä korkeampi taso." },
        {
          table: {
            head: ["Välineryhmä", "Esimerkkejä", "Vähintään jokaisen asiakkaan jälkeen"],
            rows: [
              ["Koskettaa asiakasta, ei riko ihoa", "Kammat, sakset, hiustenleikkuukoneet, ripsipinsetit", "Puhdistus ja desinfiointi"],
              ["Voi lävistää tai leikata ihoa tai koskettaa rikkinäistä ihoa", "Kynsinauhapihdit, terät, neulat, komedonipuristimet, jalkahoitovälineet", "Puhdistus ja sen jälkeen sterilointi"],
              ["Kertakäyttöiset", "Paperiviilat, puutikut, ripsiharjat, vanupuikot", "Roskiin, ei uudelleenkäyttöä"],
            ],
          },
        },
        { img: { src: img("phan-loai-dung-cu-ban-va-do-dung-mot-lan"), alt: "Teräsastiassa erillään käytetyt pihdit, kynsinauhan työnnin ja sakset, kun käsineinen käsi pudottaa viilan ja puutikun roskakoriin", caption: "Asiakas on juuri noussut: kertakäyttöiset roskiin, metalliset välineet käytettyjen välineiden astiaan." } },
      ],
    },
    {
      id: "kadet-ja-pinnat",
      title: "Kädet ja pinnat: kaksi muuta tartuntatietä",
      blocks: [
        { p: "Puhtaista välineistä ei ole hyötyä likaisissa käsissä. Pese kädet saippualla, kuivaa ne ja desinfioi ne ennen jokaista asiakasta ja ennen kuin puet käsineet. Käsineet suojaavat vain hetken, joten vaihda ne usein. Älä koske käsineet kädessä puhelimeen, ovenkahvoihin tai lamppuun; jos kosket, pue uudet." },
        { p: "Pyyhi jokaisen asiakkaan jälkeen pöytä, käsituki, hoitosänky ja tuoli ja desinfioi pinnat, jotka koskettivat asiakkaan ihoa. Jokaiselle asiakkaalle vaihdetaan puhtaat pyyhkeet ja uusi suojapaperi. Aiheesta on oma oppituntinsa: [Käsihygienia, käsineet ja suojaimet](lesson:rua-tay-gang-tay)." },
      ],
    },
    {
      id: "aloittain",
      title: "Kampaamo, ripset, jalkahoito ja akryylikynnet",
      blocks: [
        {
          ul: [
            "**Kampaamo:** kertakäyttöinen niskapaperi kampausviitan alle. Kammat, sakset ja hiustenleikkuukoneet puhdistetaan ja desinfioidaan jokaisen asiakkaan jälkeen.",
            "**Ripsienpidennykset:** pinsetit puhdistetaan ja desinfioidaan jokaisen asiakkaan jälkeen. Ripsiharjat ja vanupuikot käytetään vain kerran.",
            "**Jalkahoito:** kertakäyttöinen suojapussi jalkakylpyaltaaseen, ja jalkahoitovälineet säilytetään erillään käsienhoidon välineistä.",
            "**Akryylikynnet:** pölyn kohdepoisto suoraan työpöydässä.",
          ],
        },
        { img: { src: img("giay-quan-co-dung-mot-lan-o-tiem-toc"), alt: "Parturi kiertää valkoisen kertakäyttöisen niskapaperin asiakkaan kaulan ympärille ennen viittaa, tiskillä purkki liotettavia kampoja", caption: "Kampaamossa kertakäyttöinen niskapaperi estää viittaa koskettamasta suoraan asiakkaan ihoa." } },
      ],
    },
    {
      id: "verenvuoto",
      title: "Jos asiakkaan iho alkaa vuotaa verta",
      blocks: [
        {
          ol: [
            "Keskeytä työ heti.",
            "Pue uudet käsineet.",
            "Puhdista, desinfioi ja peitä haava.",
            "Desinfioi jokainen pinta, jolle on tullut verta.",
            "Vie väline suoraan huoltoon. Sitä ei käytetä ennen kuin se on puhdistettu ja steriloitu.",
          ],
        },
        { p: "Jos asiakkaan ihossa tai kynsissä on jo valmiiksi tulehduksen merkkejä, kieltäydy kohteliaasti ja neuvo häntä käymään ensin lääkärissä. Näistä tilanteista kerrotaan tarkemmin oppitunnilla [Milloin asiakasta ei hoideta](lesson:khi-nao-khong-lam), ja salongin vahinkotilanteet käydään läpi oppitunnilla [Vahinkotilanteet: verenvuoto, allergiset reaktiot, palovammat](lesson:xu-ly-su-co)." },
      ],
    },
    {
      id: "maaraykset",
      title: "Määräykset Suomessa ja Helsingin ohje",
      blocks: [
        { p: "Jokaisella maalla ja kunnalla on omat hygieniavaatimuksensa kauneusalan yrityksille. Suomessa useimpien ihonkäsittelyä tarjoavien kauneushoitoloiden on tehtävä ilmoitus kunnan terveydensuojeluviranomaiselle vähintään 30 päivää ennen toiminnan aloittamista, ja niillä on oltava omavalvontasuunnitelma." },
        { p: "Tämän artikkelin esimerkit ovat Helsingin kaupungin ohjeesta, joka on mainittu lähteenä artikkelin lopussa. Helsinkiläiselle salongille se on oman kaupungin ohje. Muualla tarkista tarkat vaatimukset sterilointilaitteista, kirjanpidosta ja tarkastuksista oman kuntasi terveydensuojeluviranomaiselta ennen kuin avaat ovesi." },
        { note: "Puhtaus on paras mainos, joka salongilla voi olla. Kun työjärjestys on kunnossa, kerro siitä [salongin profiilin](lesson:ho-so-salon) esittelytekstissä, niin asiakas voi lukea sen jo ennen varaamista.", kind: "tip", title: "Näytä asiakkaille, että teet työn huolella" },
      ],
    },
  ],
  howTo: {
    title: "Välinehuolto jokaisen asiakkaan jälkeen: työvaiheet",
    id: "tyovaiheet",
    after: "mika-valine-mika-taso",
    lead: "Noudata tätä järjestystä jokaisen uudelleen käytettävän metallivälineen kohdalla. Steriloinnin vaiheet koskevat välineitä, jotka voivat rikkoa ihon.",
    supplies: [
      "Erillinen astia käytetyille välineille",
      "Käsineet, harja ja saippua",
      "Välineille tarkoitettu desinfiointiliuos ja kannellinen liotusastia",
      "Sterilointipussit, joissa on indikaattori",
      "Autoklaavi tai kuumailmasterilaattori",
      "Kuiva, puhdas ja pölytön säilytyspaikka",
    ],
    steps: [
      {
        name: "Lajittele heti, kun asiakas nousee",
        text: "Kertakäyttöiset tarvikkeet menevät roskiin. Metalliset välineet menevät omaan astiaansa käytetyille välineille, eivät koskaan puhtaiden sekaan.",
      },
      {
        name: "Puhdista juoksevan veden alla",
        text: "Pue käsineet, avaa väline kokonaan auki ja harjaa se huolellisesti saippualla juoksevan veden alla, erityisesti nivelet ja urat. Pese välineet heti, ennen kuin lika ehtii kuivua kiinni. Huuhtele sitten puhtaalla vedellä ja kuivaa huolellisesti.",
        image: { src: img("cha-rua-kem-cat-da-bang-ban-chai-duoi-voi-nuoc"), alt: "Mustaan käsineeseen puettu käsi harjaa täysin auki olevia kynsinauhapihtejä juoksevan veden alla", caption: "Avaa pihdit kokonaan, jotta harja ylettyy niveleen, johon lika kerääntyy." },
      },
      {
        name: "Desinfioi koko vaikutusaika",
        text: "Upota välineet kokonaan välineille tarkoitettuun desinfiointiliuokseen. Laimenna liuos oikeaan vahvuuteen ja pidä välineitä siinä koko etiketissä mainittu aika, ei koskaan vähemmän. Vaihda liuos valmistajan ohjeen mukaan.",
        image: { src: img("ngam-dung-cu-trong-dung-dich-khu-khuan"), alt: "Läpinäkyvä muoviastia sinistä desinfiointiliuosta, jossa metalliset välineet ovat kokonaan upoksissa, vieressä tiimalasi" },
      },
      {
        name: "Sulje välineet sterilointipussiin",
        text: "Ihoa lävistävät tai leikkaavat välineet: laita puhtaat ja kuivat välineet sterilointipussiin ja sulje se. Märkä tai likainen väline ei mene pussiin.",
        image: { src: img("cho-dung-cu-vao-tui-tiet-trung"), alt: "Käsineinen käsi liu'uttaa kuivatut kynsinauhapihdit läpinäkyvään sterilointipussiin" },
      },
      {
        name: "Aja autoklaavi tai kuumailmasterilaattori",
        text: "Laita pussit autoklaaviin tai kuumailmasterilaattoriin ja käynnistä laitteesta oikea ohjelma. Pussissa on yleensä indikaattori, joka vaihtaa väriä merkiksi onnistuneesta steriloinnista. Jos väri ei ole vaihtunut, sterilointi tehdään uudelleen.",
        image: { src: img("noi-hap-tiet-trung-dung-cu-nail"), alt: "Verkkoalusta täynnä välinepusseja nostetaan autoklaaviin, joka seisoo kivitasolla" },
      },
      {
        name: "Merkitse päivämäärä ja säilytä erillään",
        text: "Kirjoita pussiin päivämäärä ja säilytä se kuivassa, puhtaassa ja pölyttömässä paikassa erillään steriloimattomista välineistä.",
      },
      {
        name: "Avaa pussi asiakkaan nähden",
        text: "Avaa pussi vasta työn alkaessa, asiakkaan edessä. Kun asiakas näkee sen, hän rauhoittuu heti.",
        image: { src: img("mo-tui-dung-cu-tiet-trung-truoc-mat-khach"), alt: "Kynsiteknikko repäisee sterilointipussin auki kynsipöydän ääressä istuvan naisasiakkaan edessä" },
      },
      {
        name: "Pyyhi ja desinfioi pinnat",
        text: "Pyyhi pöytä, käsituki, hoitosänky ja tuoli ja desinfioi pinnat, jotka koskettivat asiakkaan ihoa. Vaihda seuraavalle asiakkaalle puhtaat pyyhkeet ja suojapaperi.",
      },
    ],
  },
  faq: [
    {
      q: "Mikä ero on desinfioinnilla ja steriloinnilla?",
      a: "Desinfiointi laskee mikrobien määrän turvalliselle tasolle, mutta ei välttämättä tapa itiöitä. Sterilointi tappaa kaikki mikrobit, myös itiöt, ja se tehdään kuumuudella autoklaavissa tai kuumailmasterilaattorissa. Kumpikin tehdään vasta, kun väline on harjattu puhtaaksi.",
    },
    {
      q: "Riittääkö kynsinauhapihtien suihkuttaminen alkoholilla?",
      a: "Ei riitä. Nopea alkoholisuihkaus ja pyyhkäisy ei ole kunnollista desinfiointia. Kynsinauhapihdit voivat leikata ihoa, joten ne harjataan puhtaiksi, kuivataan ja steriloidaan autoklaavissa tai kuumailmasterilaattorissa.",
    },
    {
      q: "Miksi välineet pitää pestä ennen desinfiointia?",
      a: "Koska välineeseen jäänyt lika suojaa mikrobeja, jolloin desinfiointi ja sterilointi eivät tehoa. Pese välineet heti käytön jälkeen, ennen kuin lika ehtii kuivua kiinni.",
    },
    {
      q: "Voiko paperiviilan ja puutikun desinfioida ja käyttää uudelleen?",
      a: "Ei voi. Ne ovat kertakäyttöisiä tarvikkeita, joita ei saa puhdistettua kunnolla, joten ne heitetään pois yhden asiakkaan jälkeen.",
    },
    {
      q: "Mitä jos pienellä hoitolalla ei ole autoklaavia?",
      a: "Ihoa lävistävät tai leikkaavat välineet on silti steriloitava kuumuudella, autoklaavissa tai kuumailmasterilaattorissa; liotusliuos ei korvaa sitä. Laitevaatimukset vaihtelevat maittain ja kunnittain, joten kysy oman kuntasi terveydensuojeluviranomaiselta.",
    },
    {
      q: "Miten steriloidut välinepussit säilytetään?",
      a: "Merkitse pussiin päivämäärä ja säilytä se kuivassa, puhtaassa ja pölyttömässä paikassa erillään steriloimattomista. Pussi avataan vasta, kun asiakkaan hoito alkaa.",
    },
  ],
  related: ["rua-tay-gang-tay", "ve-sinh-tiem", "khi-nao-khong-lam", "xu-ly-su-co"],
};

export default article;
