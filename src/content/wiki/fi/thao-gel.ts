import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/thao-gel/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "geelilakan-poisto-vaihe-vaiheelta",
  lesson: "thao-gel",
  category: "nail",
  title: "Geelilakan poisto vaihe vaiheelta: 8 työvaihetta, jotka säästävät oman kynnen",
  metaTitle: "Geelilakan poisto vaihe vaiheelta: 8 työvaihetta",
  metaDescription:
    "Geelilakan poisto vaihe vaiheelta: päällysgeelin rikkominen, ihon suojaus, asetoniliotus 10–15 minuuttia, työntäminen puutikulla, kynnen hoito ja kova geeli.",
  keyword: "geelilakan poisto",
  keywords: [
    "geelikynsien poisto",
    "kauanko geelilakkaa liotetaan asetonissa",
    "geelilakan poisto foliolla",
    "geelilakan poisto kotona",
    "kovan geelin poisto",
    "geelin poisto vaurioittamatta kynsiä",
  ],
  excerpt: "Kahdeksan vaihetta, joilla geelilakka lähtee kokonaan ja oma kynsi pysyy ehjänä: päällysgeelin rikkominen, ihon suojaus, liotus, kevyt työntö, puhdistus ja hoito.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-nail-thao-gel-cho-khach-tai-salon"),
    alt: "Ruskeahiuksinen kynsiteknikko mustissa käsineissä avaa foliokääreitä vaaleahiuksisen asiakkaan sormenpäistä kivipöydän ääressä",
  },
  takeaways: [
    "Vain yksi periaate: **geelin on irrottava itsestään**. Ei repimistä, ei kaivamista, ei raaputtamista.",
    "Viilaa päällysgeeli ennen liotusta niin, ettei kiiltoa jää, muuten asetoni ei pääse sisään.",
    "Asetonilappu on juuri kynnen kokoinen; kääri folio tiiviisti ja liota yleensä **10–15 minuuttia** tuotteen ohjeen mukaan.",
    "Jos geeli irtoaa vain painamalla, se ei ole vielä pehmennyt: lopeta, kääri uudelleen ja liota noin 5 minuuttia lisää.",
    "Asetoni on erittäin helposti syttyvää: ei kynttilöitä, ei avotulta, ilmanvaihto päällä ja pullo kiinni heti käytön jälkeen.",
  ],
  intro: [
    "Geelilakan poisto oikein perustuu yhteen periaatteeseen: geelin on irrottava kynnestä itsestään. Kynsiteknikko ei revi, kaiva eikä raaputa. Kätesi valmistelevat kynnen niin, että kemikaali voi tehdä osansa, ja sitten odotetaan riittävän kauan.",
    "Artikkeli käy läpi VaraaAi Academyn Kynnet-kurssin oppitunnin ”Turvallinen geelin poisto: käytäntö vaihe vaiheelta” kahdeksan työvaihetta ensimmäisestä kysymyksestä asiakkaalle viimeiseen öljypisaraan, ja lisäksi kovan geelin poiston ja virheet, jotka ohentavat omaa kynttä. Jos haluat ymmärtää, miksi geelin repiminen vahingoittaa kynttä niin paljon, lue teoria-artikkeli [Ohuet kynnet geelin poiston jälkeen](lesson:thao-gel-hieu-dung).",
  ],
  sections: [
    {
      id: "ennen-poistoa",
      title: "Ennen poistoa: varaa riittävästi aikaa ja tunnista tuote",
      blocks: [
        { p: "Oikea poisto vie aikaa, yleensä noin puoli tuntia koko käsiltä. Työntimellä raaputtaminen houkuttaa eniten silloin, kun on kiire. Kun otat varauksen, varaa tuo aika, jottei sinun tarvitse oikaista." },
        { p: "Toinen tehtävä on tunnistaa kynsillä oleva tuote. Tavallisen geelilakan voi liottaa pois asetonilla. Kova geeli ei liukene, liotit sitä kuinka kauan tahansa, vaan se viilataan ohueksi artikkelin lopussa kuvatulla tavalla. Kysy asiakkaalta kaksi asiaa: onko kynsissä geelilakka vai rakennegeeli, ja missä ja kuinka kauan sitten se on tehty." },
        { note: "Artikkelin liotusaika on tavallinen ohjeaika. Oikea aika juuri sinun asetonillesi tai geelinpoistoaineellesi lukee valmistajan ohjeessa.", kind: "info", title: "Noudata aina tuotteen ohjetta" },
      ],
    },
    {
      id: "liotusvinkit",
      title: "Kauanko geelilakkaa liotetaan asetonissa, ja miten se pehmenee tasaisesti",
      blocks: [
        { p: "Liotus kestää yleensä 10–15 minuuttia. Muutama pieni asia sen aikana ratkaisee, pehmeneekö geeli tasaisesti." },
        {
          ul: [
            "**Älä avaa kääreitä jatkuvasti tarkistaaksesi.** Folio kääritään tiiviisti, jotta kemikaali ei haihdu, ja jokainen kurkistus päästää sitä karkuun.",
            "**Kylmissä käsissä geeli pehmenee hitaammin.** Voit laittaa pyyhkeen asiakkaan käsien päälle pitämään ne lämpiminä.",
            "**Kääri ja avaa samassa järjestyksessä.** Kääri ensin koko ensimmäinen käsi ja sitten toinen, ja avaa ne samassa järjestyksessä, jotta molemmat liotetaan riittävän kauan.",
            "**Käsittele jokainen sormi heti, kun avaat sen.** Jos avaat kaikki viisi kerralla, odottavien sormien geeli ehtii kovettua uudelleen.",
          ],
        },
        { img: { src: img("quan-giay-bac-u-thao-gel"), alt: "Mustiin käsineisiin pukeutunut kynsiteknikko taittaa foliopalan tiiviisti asiakkaan etusormen pään ympärille, ja viereiset kaksi sormea on jo kääritty", caption: "Purista folio tiiviisti sormenpään ympärille, jotta asetoni ei haihdu." } },
        { img: { src: img("gel-phong-nut-tu-bong-sau-khi-u-acetone"), alt: "Lähikuva kynnestä asetoniliotuksen jälkeen: punainen geeli on turvonnut, halkeillut useaksi palaksi ja irtoaa kynnestä", caption: "Riittävän kauan liotettu geeli näyttää tältä: turvonnut, halkeillut ja itsestään irtoava." } },
        { p: "Jos käytät folion sijaan liotusklipsejä, klipsin tehtävä on pitää lappu painettuna kynttä vasten. Kummassakin tavassa pullo suljetaan heti, kun ainetta on otettu." },
      ],
    },
    {
      id: "yleiset-virheet",
      title: "Yleisimmät virheet geelilakan poistossa ja miten ne korjataan",
      blocks: [
        {
          table: {
            head: ["Mitä tapahtuu", "Tavallinen syy", "Korjaus"],
            rows: [
              ["Geeli on koskematon koko liotusajan jälkeen", "Päällysgeeliä ei rikottu kokonaan, varsinkaan kynsinauhan vierestä ja sivuilta", "Viilaa uudelleen, kunnes kiilto on kokonaan poissa, ja liota uudelleen"],
              ["Geeli pehmenee epätasaisesti, laikuittain", "Kynsilevyllä ollut öljy esti kemikaalin vaikutuksen, tai folio ei ollut tiivis", "Öljy vain iholle; purista folio tiiviiksi"],
              ["Kynnen ympärillä valkoinen, kuiva iho", "Lappu oli liian iso, ja asetoni imeytyi ihoon", "Leikkaa laput kynnen kokoisiksi; öljyä tai voidetta iholle ennen liotusta"],
              ["Geeli irtoaa vain painamalla", "Geeli ei ole vielä pehmennyt", "Lopeta, vaihda lappu, kääri uudelleen ja liota noin 5 minuuttia lisää"],
              ["Kynnessä valkoisia, karheita laikkuja", "Geeli irrotettiin väkisin, ja mukana lähti omaa kynttä", "Ei nopeaa korjausta. Öljyä ja odota, että kynsi kasvaa"],
            ],
          },
        },
        { note: "Jos pidät tikkua pystyssä ja painat alas, raaputat etkä työnnä. Puutikku tai työnnin on aina hyvin matalassa kulmassa, lähes kynnen suuntaisesti.", kind: "tip", title: "Katso, missä kulmassa tikku on" },
      ],
    },
    {
      id: "kova-geeli",
      title: "Kovan geelin poisto, kun geeli ei liukene asetoniin",
      blocks: [
        { p: "Kovaa geeliä ei liuoteta. Viilaa se käsiviilalla vähitellen ohuemmaksi, kunnes jäljellä on vain hyvin ohut pohjakerros, ja lopeta siihen. Älä viilaa omaan kynteen. Pohjakerros kasvaa pois kynnen mukana." },
        { p: "Kynsipora tekee tämän nopeammin, mutta vain koulutetun tekijän käsissä. Viilaus ja poraus nostavat paljon geelipölyä, joten käytä käsineitä ja maskia ja kohdepoistoa, jos sellainen on. Miksi geelipöly on huolestuttavaa, kerrotaan oppitunnilla [Allergiat ja kemikaalit](lesson:di-ung-hoa-chat)." },
      ],
    },
    {
      id: "asetoni-turvallisesti",
      title: "Asetonin turvallinen käsittely",
      blocks: [
        {
          ul: [
            "Asetoni on erittäin helposti syttyvää. Pöydällä ei kynttilöitä eikä avotulta.",
            "Huoneessa on oltava ilmanvaihto.",
            "Sulje pullo heti jokaisen annostelun jälkeen.",
            "Pue käsineet ennen aloittamista. Vaihda ne heti, kun ne kastuvat kemikaalista.",
            "Harjaa viilauspöly pois, älä puhalla.",
          ],
        },
        { note: "Jos kynsien ympärillä oleva iho on turvonnut, punainen, märkivä tai siinä on avohaava, lopeta, älä jatka, ja neuvo asiakasta käymään lääkärissä.", kind: "warn", title: "Milloin poistoa ei tehdä" },
      ],
    },
    {
      id: "poiston-jalkeen",
      title: "Poiston jälkeen: kynnen hoito, ohjeet asiakkaalle ja siivous",
      blocks: [
        { p: "Juuri paljastunut kynsi näyttää hieman valkoiselta ja kuivalta kuivumisen vuoksi, ja öljy auttaa. Seuraava vaihe riippuu oman kynnen kunnosta:" },
        {
          table: {
            head: ["Kynnen kunto", "Mitä teet"],
            rows: [
              ["Terve", "Voidaan lakata heti uudelleen; silloin kynsinauhaöljy säästetään loppuun"],
              ["Ohut, pehmeä tai arka painettaessa", "Neuvo pitämään taukoa geelistä, käyttämään öljyä päivittäin ja käsineitä tiskatessa ja siivotessa"],
              ["Irtoaa kynsipedistä, värjäytynyt tai tulehduksen merkkejä", "Ei lakkaa, ja ohjaa lääkäriin"],
            ],
          },
        },
        { img: { src: img("nho-dau-duong-len-mong-sau-khi-thao-gel"), alt: "Mustiin käsineisiin pukeutunut kynsiteknikko tiputtaa pipetillä kultaisen kynsinauhaöljypisaran asiakkaan paljaan kynnen tyveen" } },
        { p: "Tärkein neuvo ennen kuin asiakas lähtee: kun geeli seuraavan kerran irtoaa, älä revi sitä kotona, vaan tule takaisin salonkiin." },
        { p: "Kun asiakas on lähtenyt, käytetty folio, vanut, puutikut ja viilat laitetaan kannelliseen roska-astiaan. Liotusklipsit puhdistetaan ja desinfioidaan. Metalliset työntimet pestään ja steriloidaan oppitunnin [Välineet jokaisen asiakkaan jälkeen: työvaiheet](lesson:ve-sinh-dung-cu) mukaan. Sulje kemikaalipullot tiiviisti ja pyyhi pöytä." },
      ],
    },
    {
      id: "poisto-varattavaksi",
      title: "Anna asiakkaiden varata geelin poisto riittävällä ajalla",
      blocks: [
        { p: "Koska oikea poisto vie noin puoli tuntia, varmin tapa välttää kiire on antaa kalenterin pitää aika vapaana. VaraaAissa [lisäät geelin poiston omaksi palvelukseen](lesson:dich-vu) juuri tarvitsemallasi kestolla, lisäät sen [hinnastoon](lesson:bang-gia) ja seuraat varauksia [kalenterissa](lesson:lich-hen). Silloin jokaisessa poistovarauksessa on aikaa liottaa, kunnes geeli irtoaa itsestään. Miten uudesta lakkauksesta saa kestävän, kerrotaan artikkelissa [Geelilakkaus vaihe vaiheelta](lesson:son-gel)." },
      ],
    },
  ],
  howTo: {
    title: "Geelilakan poisto vaihe vaiheelta",
    id: "poiston-tyovaiheet",
    after: "ennen-poistoa",
    lead: "Nämä kahdeksan vaihetta koskevat asetoniin liukenevaa geelilakkaa, oppitunnin videon järjestyksessä.",
    supplies: [
      "180-karkeuden viila ja hieno hiomapala, uudet jokaiselle asiakkaalle",
      "Nukkaamattomat laput kynnen kokoisiksi leikattuina",
      "Valmiiksi leikattu folio tai liotusklipsit",
      "Asetoni tai merkin oma geelinpoistoaine",
      "Puutikut ja steriloitu työnnin",
      "Kynsinauhaöljy, käsineet ja pölyharja",
    ],
    steps: [
      {
        name: "Pese kädet, katso ja kysy",
        text: "Pese ja desinfioi omat ja asiakkaan kädet. Kysy, onko kynsissä geelilakka vai rakennegeeli ja missä ja kuinka kauan sitten se on tehty. Katso myös kynsien ympäröivä iho: jos se on turvonnut, punainen, märkivä tai siinä on avohaava, lopeta ja neuvo asiakasta käymään lääkärissä.",
      },
      {
        name: "Ota välineet esille ja valmistele työpiste",
        text: "Laita kaikki pöydälle ennen kuin aloitat. Kytke ilmanvaihto päälle, varmista, ettei pöydällä ole kynttilöitä tai avotulta, ja pue käsineet. Kun kaikki on valmiina, sinun ei tarvitse poistua pöydästä, kun asiakkaan sormet ovat foliossa.",
        image: { src: img("dung-cu-thao-gel-can-chuan-bi"), alt: "Geelin poiston välineet: viila, hiomapala, vanulaput, folio, liotusklipsit, pumppupullo, puutikut, sterilointipussissa oleva työnnin, kynsinauhaöljy ja käsineet" },
      },
      {
        name: "Riko päällysgeeli",
        text: "Pidä asiakkaan sormesta tukevasti kiinni, aseta viila tasaisesti kynnen päälle ja viilaa kevyesti ja tasaisesti joka puolelta, kunnes kiilto on poissa. Kun pöly muuttuu lakan väriseksi, olet päällysgeelin läpi. Muista kynsinauhan vierus ja molemmat sivut, mutta älä viilaa ihoa äläkä omaan kynteen asti. Jos jonkin kynnen geeli on jo irronnut kulmasta, älä käytä sitä kohtaa kaivamiseen. Harjaa pöly pois, kun olet valmis.",
        image: { src: img("dua-pha-lop-top-truoc-khi-thao-gel"), alt: "Mustiin käsineisiin pukeutunut kynsiteknikko asettaa harmaan viilan tasaisesti asiakkaan punaiselle geelikynnelle, ja puolet kynnestä on jo viilattu mataksi", caption: "Viila on tasaisesti kynnen päällä. Viilattu osa on menettänyt kiiltonsa, loppu kiiltää yhä." },
      },
      {
        name: "Öljyä kynnen ympäröivä iho",
        text: "Levitä vähän kynsinauhaöljyä tai voidetta kynnen ympäröivälle iholle suojaksi asetonilta. Vain iholle: kynsilevylle joutunut öljy estää kemikaalin vaikutuksen, ja geeli pehmenee epätasaisesti.",
      },
      {
        name: "Aseta lappu, kääri ja liota",
        text: "Kastele pieni lappu asetonilla läpimäräksi mutta ei tippuvaksi ja aseta se tarkalleen kynnen päälle. Kääri folio sormenpään ympärille ja purista se tiiviiksi, tai käytä klipsiä, ja tee näin yhden käden kaikki viisi sormea. Sulje pullo heti. Liota yleensä 10–15 minuuttia tuotteen ohjeen mukaan.",
        image: { src: img("dat-bong-tham-acetone-len-mat-mong"), alt: "Mustiin käsineisiin pukeutunut kynsiteknikko asettaa pienen valkoisen lapun tarkalleen asiakkaan punaisen geelikynnen päälle, alla foliopala", caption: "Lappu on juuri kynnen kokoinen eikä peitä ihoa." },
      },
      {
        name: "Avaa sormi kerrallaan ja työnnä hyvin kevyesti",
        text: "Kun aika on täynnä, avaa sormi kerrallaan samassa järjestyksessä kuin käärit. Geeli on valmis, kun se on turvonnut, halkeillut ja irtoaa itsestään. Pidä puutikkua hyvin matalassa kulmassa, lähes kynnen suuntaisesti, ja työnnä kevyesti kynsinauhasta kärkeä kohti. Jos joudut painamaan kovaa, lopeta heti, vaihda lappu, kääri uudelleen ja liota noin 5 minuuttia lisää.",
        image: { src: img("day-gel-bang-que-go-tu-chan-mong-ra-dau-mong"), alt: "Matalassa kulmassa kynnen päällä oleva puutikku työntää pehmenneitä punaisia geelinpaloja kohti kärkeä, ja tyvi on jo puhdas geelistä", caption: "Tikku on kynnen suuntaisesti, ja pehmennyt geeli melkein liukuu pois itsestään." },
      },
      {
        name: "Puhdista jäämät",
        text: "Jos ohut kerros pohjageeliä jää, pyyhi se asetonilapulla tai liu'uta hienoa hiomapalaa sen yli hyvin kevyesti. Liu'uta vain sen verran, että pinta tasoittuu; älä hio kynttä ohuemmaksi. Käy näin läpi molemmat kädet ja pyydä sitten asiakasta pesemään kätensä saippualla, jotta kemikaali ja pöly lähtevät.",
      },
      {
        name: "Arvioi oma kynsi ja hoida se",
        text: "Katso asiakkaan omia kynsiä huolellisesti hyvässä valossa. Terveet kynnet voi lakata uudelleen, ja kynsinauhaöljy odottaa silloin loppuun. Ohut, pehmeä ja painettaessa arka kynsi tarvitsee taukoa geelistä ja öljyä päivittäin. Kynsipedistä irtoavaa, värjäytynyttä tai tulehtuneen näköistä kynttä ei lakata, ja asiakasta neuvotaan käymään lääkärissä.",
        image: { src: img("kiem-tra-mong-that-sau-khi-thao-gel"), alt: "Mustiin käsineisiin pukeutunut kynsiteknikko nostaa asiakkaan sormenpäitä käsityynyllä ja katsoo tarkasti paljaita omia kynsiä" },
      },
    ],
  },
  faq: [
    {
      q: "Kauanko geelilakkaa liotetaan asetonissa?",
      a: "Yleensä 10–15 minuuttia, mutta merkit eroavat toisistaan, joten noudata tuotteen ohjetta. Jos geeli ei ole turvonnut ja halkeillut ajan täyttyessä, kääri uudelleen ja liota noin 5 minuuttia lisää äläkä raaputa sitä voimalla irti.",
    },
    {
      q: "Miksi päällysgeeli viilataan ennen geelilakan poistoa?",
      a: "Päällysgeeli on tiivis kuin sadetakki; se on tehty kestämään kemikaaleja ja naarmuja. Ellei sitä viilata rikki, asetoni ei pääse sisään eikä geeli pehmene, liotit kuinka kauan tahansa. Viilaa vain, kunnes kiilto on poissa, ja lopeta, kun pöly muuttuu lakan väriseksi.",
    },
    {
      q: "Minkä kokoinen asetonilapun pitää olla?",
      a: "Juuri kynnen kokoinen. Asetoni kuivattaa ihoa, joten mitä tarkemmin lappu vastaa kynttä, sitä vähemmän iho altistuu. Ennen liotusta kynnen ympäröivälle iholle voi levittää öljyä tai voidetta suojaksi, mutta ei itse kynnelle.",
    },
    {
      q: "Voiko uuden geelilakan laittaa heti poiston jälkeen?",
      a: "Voi, jos oma kynsi on terve. Juuri paljastunut kynsi näyttää hieman valkoiselta ja kuivalta tilapäisen kuivumisen vuoksi. Jos kynsi on ohut, pehmeä tai arka painettaessa, se tarvitsee taukoa geelistä ja öljyä päivittäin. Kynsipedistä irtoavaa, värjäytynyttä tai tulehtuneen näköistä kynttä ei lakata, ja asiakkaan kannattaa käydä lääkärissä.",
    },
    {
      q: "Miten kova geeli poistetaan, kun se ei liukene asetoniin?",
      a: "Kovaa geeliä ei voi liottaa pois, vaan se viilataan käsin ohueksi, kunnes jäljellä on hyvin ohut pohjakerros, viilaamatta omaan kynteen. Kynsipora on vain koulutetuille tekijöille. Käytä viilatessa käsineitä ja maskia ja kohdepoistoa, jos sellainen on.",
    },
    {
      q: "Mitä pitää huomata, kun poistaa geelilakan kotona?",
      a: "Vaiheet ovat samat kuin salongissa: päällysgeelin rikkominen, liotus kynnen kokoisella lapulla ja foliolla sekä hyvin kevyt työntö, kun geeli on irronnut itsestään. Älä koskaan revi tai kaiva. Asetoni on erittäin helposti syttyvää, joten työskentele tuuletetussa tilassa ilman kynttilöitä tai avotulta ja sulje pullo heti käytön jälkeen.",
    },
  ],
  related: ["thao-gel-hieu-dung", "son-gel", "gel-hieu-dung", "cham-soc-mong-co-ban"],
};

export default article;
