import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/lash-lift/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "ripsien-kestotaivutus-ja-varjays-ohje",
  lesson: "lash-lift",
  category: "lash",
  title: "Ripsien kestotaivutus ja värjäys: ohje 12 vaiheessa muotin valinnasta jälkihoitoon",
  metaTitle: "Ripsien kestotaivutus ohje: 12 vaihetta salongissa",
  metaDescription:
    "Kestotaivutus vaihe vaiheelta: allergiatesti, öljytön puhdistus, muotti ripsirajaan, ripset muotille, kaksi ainetta, värjäys, ripsien irrotus ja jälkihoito.",
  keyword: "ripsien kestotaivutus ohje",
  keywords: [
    "kestotaivutuksen vaiheet",
    "lash lift ohje",
    "silikonimuotin kiinnitys",
    "taivutusaineen levitys",
    "ripsien värjäys kestotaivutuksen jälkeen",
    "kestotaivutus aloittelijalle",
    "kestotaivutuksen kotihoito-ohjeet",
  ],
  excerpt: "Kestotaivutuksen ja värjäyksen 12 vaihetta: muotti aivan ripsirajaan, jokainen ripsi suorana muotilla, aine vain ripsen alaosaan ja ajat valmistajan taulukosta.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-uon-mi-lash-lift-cho-khach-tai-studio"),
    alt: "Ripsistylisti korkealla nutturalla, kermanvärisessä paidassa ja mustissa käsineissä kumartuu sängyllä makaavan asiakkaan ylle, sängyn vieressä rasia vaaleanpunaisia silikonimuotteja",
  },
  takeaways: [
    "Kolme asiaa pysyy koko ajan: asiakkaan silmät ovat kiinni, **tuote ei koske ihoon eikä joudu silmään**, ja ajat noudattavat aina valmistajaa.",
    "Ripsien on oltava öljyttömät ja **täysin kuivat** ennen muotille nostamista: öljy saa aineen vaikuttamaan epätasaisesti, eivätkä märät ripset tartu.",
    "Muotti asetetaan **aivan ripsirajaan** silmän kaaren mukaan. Ripsirajasta irti oleva muotti jättää ripsiin taitteen.",
    "Ripsien asettelu muotille ansaitsee eniten aikaa: muotilla vinossa oleva ripsi on vinossa myös taivutuksen jälkeen.",
    "Värjää vasta, kun **allergiatesti** on puhdas. Jos asiakasta kirvelee tai polttaa, pyyhi tuote heti pois, huuhtele puhtaalla vedellä ja lopeta.",
  ],
  intro: [
    "Ripsien kestotaivutus ohjeen mukaan tehtynä ei sisällä yhtään yhtä näpertelevää liikettä kuin ripsien eristäminen tai viuhkojen teko, mutta jokainen virhe painuu suoraan asiakkaan omiin ripsiin eikä sitä voi korjata heti. Hyvä taivutus syntyy neljästä oikeasta asiasta: muotti, jokaisen ripsen paikka sillä, aineen levityskohta ja aika.",
    "Artikkeli perustuu VaraaAi Academyn Ripset-kurssin oppituntiin ”Ripsien kestotaivutus ja värjäys: vaihe vaiheelta”: 12 vaihetta konsultaatiosta muistiinpanoihin seuraavaa kertaa varten. Vaikutusaikoja tai sekoitussuhteita ei anneta, koska ne ovat käyttämäsi tuotteen ohjeissa. Katso ensin alla oleva video ja lue vaiheet sitten uudelleen.",
  ],
  sections: [
    {
      id: "ennen-kestotaivutusta",
      title: "Ennen kestotaivutusta: kolme asiaa, jotka pysyvät koko ajan",
      blocks: [
        {
          ul: [
            "Asiakkaan silmät ovat kiinni.",
            "Tuote ei koske ihoon eikä joudu silmään.",
            "Ajat noudattavat aina valmistajan ohjetta.",
          ],
        },
        { p: "Mitä taivutusaine tekee ripselle, kenelle palvelu sopii ja miksi ylikäsittely tekee ripsistä kähärät, selitetään artikkelissa [mikä on ripsien kestotaivutus](lesson:lash-lift-hieu-dung). Jos et ole vielä lukenut sitä, lue se ennen kuin tartut vanupuikkoon." },
        { img: { src: img("bo-dung-cu-uon-mi-lash-lift-khuon-va-thuoc"), alt: "Kultareunainen marmoritarjotin, jolla rivi vaaleanpunaisia silikonimuotteja pienimmästä suurimpaan, ainepusseja, kaksi pientä pulloa, ripsiharja, nostotikku ja vanua", caption: "Kestotaivutuksen välineet: muotteja monessa koossa, aineet, nostotikku, harja ja vanu." } },
        { note: "Jos tuotetta joutuu silmään, huuhtele heti runsaalla puhtaalla vedellä; jos silmä on edelleen kipeä, punainen tai näkö sumea, hakeudu hoitoon. Vaikutusajat, sekoitussuhteet, muottikoot ja allergiatesti noudattavat aina tuotteen ohjeita. Säännöt vaihtelevat maittain, ja tämä on koulutusmateriaalia, ei ammattipätevyys.", kind: "warn", title: "Turvallisuus" },
      ],
    },
    {
      id: "muotin-valinta",
      title: "Silikonimuotin valinta ja sovitus",
      blocks: [
        { p: "Katso ensin omat ripset: pitkät vai lyhyet, ohuet vai paksut. Pituus ratkaisee muotin koon, paksuus ja karkeus taas ajan valmistajan taulukossa." },
        {
          table: {
            head: ["Haluat", "Muotti"],
            rows: [
              ["Taivutuksen lyhyille ripsille", "Pieni muotti"],
              ["Taivutuksen pitkille ripsille", "Suurempi muotti"],
              ["Enemmän taivutusta", "Hieman pienempi"],
              ["Pehmeämmän taivutuksen", "Hieman suurempi"],
            ],
          },
        },
        { p: "Sovita ennen kiinnittämistä: kampaa ripset kevyesti muotille ja katso, mihin kärjet ulottuvat. Monen valmistajan ohjeessa kärjet asettuvat muotin keskikohdan ja yläreunan läheisyyden välille halutun taivutuksen mukaan. Noudata käyttämäsi merkin taulukkoa." },
      ],
    },
    {
      id: "mihin-aineet-laitetaan",
      title: "Mihin taivutusaine ja ripsiväri laitetaan",
      blocks: [
        {
          table: {
            head: ["Tuote", "Mihin se laitetaan", "Miten se poistetaan"],
            rows: [
              ["Ensimmäinen aine (pehmentävä)", "Ohut kerros ripsien alaosaan, läheltä tyveä noin puoliväliin", "Kuiva vanupuikko, tyvestä kärkeen"],
              ["Toinen aine (kiinnittävä)", "Täsmälleen samalle alueelle kuin ensimmäinen", "Kuiva vanupuikko kuten edellä"],
              ["Ripsiväri", "Vain muotilla oleviin ripsiin, ei koskaan iholle", "Kostea vanu, kunnes siihen ei enää tartu väriä"],
            ],
          },
        },
        { p: "Taivutusaine ei mene luomen iholle eikä kärkiin asti. Kärjet ovat ohuet ja vaurioituvat helposti, ja ohut kerros ripsen alaosassa riittää ottamaan muotin muodon." },
      ],
    },
    {
      id: "yleiset-virheet",
      title: "Kestotaivutuksen yleiset virheet ja niiden välttäminen",
      blocks: [
        {
          table: {
            head: ["Virhe", "Mitä tapahtuu", "Näin vältät sen"],
            rows: [
              ["Ripset ovat vielä kosteat muotille nostettaessa", "Liima ei pidä ja ripset liukuvat pois muotilta", "Odota, että ne ovat täysin kuivat"],
              ["Ripsiin on jäänyt maskaraa tai öljyä", "Aine vaikuttaa epätasaisesti", "Puhdista öljyttömällä tuotteella"],
              ["Muotti irti ripsirajasta", "Ripsiin tulee taite", "Aseta muotti niin lähelle ripsirajaa kuin mahdollista"],
              ["Ripset ristissä tai vinossa muotilla", "Ne jäävät vinoon myös taivutuksen jälkeen", "Kampaa pieninä ryhminä, jokainen ripsi suorana ja erillään"],
              ["Aine vaikuttaa taulukkoa pidempään", "Kähärät ja hauraat ripset", "Käytä ajastinta, älä lisää minuutteja omin päin"],
              ["Ripsiväriä ei poisteta kunnolla", "Voi värjätä ihoa ja ärsyttää", "Pyyhi kostealla vanulla, kunnes siihen ei tartu väriä"],
            ],
          },
        },
      ],
    },
    {
      id: "jos-kirvelee",
      title: "Jos asiakasta kirvelee aineen vaikuttaessa",
      blocks: [
        { p: "Kysy aineen vaikuttaessa, kirveleekö, polttaako tai tuntuuko asiakkaasta epämukavalta. Kirvely tai poltto tarkoittaa, että tuote on koskenut ihoon, on lähellä silmää tai asiakas reagoi. Älä koskaan pyydä häntä kestämään ajan loppuun: pyyhi tuote heti pois, huuhtele puhtaalla vedellä ja lopeta." },
        { p: "Sama pätee, kun asiakas avaa silmänsä lopuksi. Jos silmiä kirvelee tai ne vetistävät, anna hänen sulkea silmät, huuhtele puhtaalla vedellä ja seuraa tilannetta. Mitä tehdä, kun kemikaalia joutuu silmään, kerrotaan artikkelissa [ensiapu kauneushoitolassa](lesson:xu-ly-su-co), ja tapaukset, joista kieltäydytään jo konsultaatiossa, artikkelissa [kauneudenhoidon vasta-aiheet](lesson:khi-nao-khong-lam)." },
      ],
    },
    {
      id: "kestotaivutuksen-jalkeen",
      title: "Kestotaivutuksen jälkeen: kotihoito, muistiinpanot ja siivous",
      blocks: [
        { p: "Neuvo asiakasta pitämään ripset kuivina valmistajan suosittaman ajan, usein vuorokauden. Sinä aikana ei maskaraa, ei höyryä eikä silmien hieromista. Tulos kestää yleensä noin 6–8 viikkoa. Älä taivuta uudelleen valmistajan suositusta aiemmin, ja varaa seuraava kerta, kun uusia ripsiä on kasvanut paljon." },
        { note: "Kirjaa VaraaAissa [asiakkaan tietojen](lesson:khach-hang) muistiinpanoihin muotin koko, kunkin aineen aika, värisävy ja allergiatestin päivä. Jos tulos oli kaunis, toista se ensi kerralla täsmälleen; jos ei, tiedät tarkalleen, mitä säätää.", kind: "tip", title: "Säilyttämisen arvoinen tapa" },
        { p: "Kun asiakas on lähtenyt, vanupuikot, tyynyt, kalvo ja ylijäänyt sekoitettu tuote heitetään pois eikä niitä säästetä. Muotit ja uudelleen käytettävät välineet puhdistetaan ja desinfioidaan kuten artikkelissa [kauneushoitolan välinehuolto](lesson:ve-sinh-dung-cu)." },
        { p: "Jos salonki ottaa varauksia VaraaAin kautta, aseta kestotaivutukselle todellinen kesto [palveluihin](lesson:dich-vu) värjäys mukaan lukien. Värjäysasiakkaan allergiatesti tehdään ensin, joten kestotaivutuksen [aika](lesson:lich-hen) varataan testipäivän jälkeen." },
      ],
    },
  ],
  howTo: {
    title: "Ripsien kestotaivutus ja värjäys vaihe vaiheelta",
    id: "kestotaivutuksen-vaiheet",
    after: "ennen-kestotaivutusta",
    lead: "Kaksitoista vaihetta oppitunnin videon järjestyksessä. Kunkin aineen aikaa ei anneta: ota se valmistajan taulukosta.",
    supplies: [
      "Silikonimuotteja monessa koossa ja kestotaivutukseen tarkoitettua liimaa",
      "Ensimmäinen aine (pehmentävä) ja toinen aine (kiinnittävä)",
      "Ripsi- ja kulmaväri, jos värjätään",
      "Öljytön ripsien puhdistusaine",
      "Silmänalustyynyt ja muovikalvo",
      "Nostotikku, vanupuikot ja kosteat vanulaput",
      "Ripsiseerumi, jos sarjaan kuuluu sellainen",
    ],
    steps: [
      {
        name: "Konsultoi ja tee allergiatesti",
        text: "Kysy silmistä, allergioista ja edellisestä kestotaivutuksesta. Jos asiakkaalla on pidennykset, ne poistetaan ensin kuten artikkelissa [ripsienpidennysten poisto ja huolto](lesson:mi-dam-thao). Jos värjätään, tee allergiatesti valmistajan ohjeen mukaan, usein 48 tuntia ennen käyntiä, ja kirjaa päivä ja tulos asiakkaan tietoihin.",
      },
      {
        name: "Puhdista ripset ja anna kuivua kokonaan",
        text: "Käytä öljytöntä puhdistusainetta. Ripsiin jäänyt maskara tai öljy saa aineen vaikuttamaan epätasaisesti. Kuivaa ripset huolellisesti ja odota, että ne ovat täysin kuivat, koska kosteat ripset eivät tartu vaan liukuvat pois muotilta.",
      },
      {
        name: "Aseta silmänalustyynyt",
        text: "Asettele asiakas mukavasti silmät kiinni ja aseta tyynyt peittämään kaikki alaripset. Tyynyt pitävät alaripset poissa muotilta ja suojaavat silmänalusihoa aineelta. Aseta ne sileästi koskematta silmään.",
      },
      {
        name: "Valitse muotti ja aseta se ripsirajaan",
        text: "Valitse muotin koko ripsien pituuden ja halutun taivutuksen mukaan ja sovita valmistajan taulukon mukaan. Kiinnitä muotti yläluomelle niin lähelle ripsirajaa kuin mahdollista silmän kaarta seuraten sisänurkasta ulkonurkkaan. Muotti on vain luomen iholla eikä koskaan koske silmään.",
        image: { src: img("dan-khuon-uon-mi-sat-chan-mi"), alt: "Mustaan käsineeseen puettu sormenpää painaa vaaleanpunaisen silikonimuotin asiakkaan yläluomelle niin, että muotin reuna on aivan ripsirajassa, silmän alla valkoinen tyyny" },
      },
      {
        name: "Nosta ripset muotille",
        text: "Levitä muotille hyvin ohut kerros kestotaivutukseen tarkoitettua liimaa. Kampaa nostotikulla pieniä ripsiryhmiä muotille sisänurkasta ulkonurkkaan. Jokainen ripsi on suora ja erillään eikä mene ristiin, tyvi nousee aivan muotin reunasta, eikä yksikään alaripsi tartu mukaan. Tämä vaihe kannattaa tehdä hitaasti.",
        image: { src: img("chai-mi-len-khuon-bang-que-tach-mi"), alt: "Metallinen nostotikku mustaan käsineeseen puetussa kädessä kampaa omat ripset suoraan ylös vaaleanpunaiselle silikonimuotille, jokainen ripsi erillään" },
      },
      {
        name: "Levitä ensimmäinen aine",
        text: "Levitä pienellä vanupuikolla hyvin ohut kerros pehmentävää ainetta ripsien alaosaan, läheltä tyveä noin puoliväliin. Ei luomen iholle. Ei kärkiin asti, koska kärjet ovat ohuet ja vaurioituvat helposti.",
        image: { src: img("boi-thuoc-uon-mi-o-phan-duoi-soi-mi"), alt: "Pieni vanupuikko mustaan käsineeseen puetussa kädessä levittää ohuen valkoisen kerroksen taivutusainetta silikonimuotilla olevien ripsien alaosaan" },
      },
      {
        name: "Peitä, ajasta ja kysy asiakkaalta",
        text: "Aseta muotin päälle ohut pala muovikalvoa pitämään lämpö ja kosteus, ja aseta ajastin valmistajan taulukon ja asiakkaan ripsityypin mukaan. Älä jätä ainetta pidempään ”varmuuden vuoksi”: ylikäsittely tekee ripsistä kähärät ja hauraat. Kysy odottaessa, kirveleekö tai polttaako; jos kirvelee, pyyhi aine heti pois, huuhtele puhtaalla vedellä ja lopeta.",
        image: { src: img("phu-mang-boc-len-khuon-khi-cho-thuoc-uon-mi"), alt: "Pala kirkasta muovikalvoa peittää ripset ja silikonimuotin asiakkaan suljetulla silmällä, kalvon reuna valkoisen tyynyn päällä" },
      },
      {
        name: "Poista ensimmäinen aine",
        text: "Pyyhi kuivalla vanupuikolla kevyesti tyvestä kärkeen, kunnes ainetta ei ole jäljellä. Ripsien on pysyttävä paikallaan muotilla, joten pyyhi hyvin kevyesti ja aina samaan suuntaan.",
        image: { src: img("lau-thuoc-uon-mi-bang-que-bong-kho"), alt: "Kuiva vanupuikko mustaan käsineeseen puetussa kädessä pyyhkii kevyesti tyvestä kärkeen vaaleanpunaisella silikonimuotilla olevia ripsiä" },
      },
      {
        name: "Levitä toinen aine",
        text: "Kiinnittävä aine levitetään täsmälleen samalle alueelle kuin ensimmäinen. Peitä kalvolla, ajasta valmistajan ohjeen mukaan ja poista se kuivalla vanupuikolla kuten edellä.",
      },
      {
        name: "Värjää ripset",
        text: "Värjää vain, jos allergiatesti oli puhdas. Valitse sävy asiakkaan kulmien ja hiusten mukaan ja sekoita väri täsmälleen valmistajan ohjeen mukaan juuri ennen käyttöä. Levitä se muotilla oleviin ripsiin, vain ripsiin eikä koskaan iholle, ja ajasta valmistajan mukaan. Pyyhi sitten huolellisesti kostealla vanulla, kunnes siihen ei enää tartu väriä.",
        image: { src: img("lau-sach-thuoc-nhuom-mi-bang-bong-am"), alt: "Kostea vanulappu mustaan käsineeseen puetussa kädessä pyyhkii juuri mustiksi värjättyjä ripsiä muotilla, vanussa tumma värijuova" },
      },
      {
        name: "Irrota ripset muotilta",
        text: "Kostuta vanupuikko vähällä vedellä tai valmistajan irrotusaineella ja nosta ripset varovasti irti muotilta. Ei vetämistä eikä nykimistä. Poista sitten muotti ja puhdista luomi.",
        image: { src: img("go-mi-khoi-khuon-uon-mi-nhe-nhang"), alt: "Pieni kostea vanupuikko mustaan käsineeseen puetussa kädessä irrottaa varovasti taivutetut ripset silikonimuotilta asiakkaan luomella" },
      },
      {
        name: "Hoida ripset, vertaa silmiä ja anna ohjeet",
        text: "Jos sarjaan kuuluu ripsiseerumi, harjaa ohut kerros ripsiin. Vertaa, ovatko taivutus ja väri tasaiset molemmissa silmissä. Poista tyynyt, anna asiakkaan avata silmät hitaasti, kerro että ripset pidetään kuivina valmistajan suosittaman ajan, ja kirjaa käynti asiakkaan tietoihin.",
        image: { src: img("chai-serum-duong-mi-sau-khi-uon"), alt: "Sängyn päästä kuvattuna ripsiharja mustaan käsineeseen puetussa kädessä harjaa asiakkaan taivutettuja ripsiä, valkoiset tyynyt yhä kummankin silmän alla" },
      },
    ],
  },
  faq: [
    {
      q: "Mitä vaiheita ripsien kestotaivutuksessa on?",
      a: "Konsultaatio ja allergiatesti, jos värjätään, öljytön puhdistus ja kuivaus, silmänalustyynyt, muotti ripsirajaan, ripsien kampaaminen muotille, ensimmäinen aine ja sen poisto, toinen aine ja sen poisto, värjäys, ripsien irrotus, seerumi ja kotihoito-ohjeet. Kunkin aineen aika noudattaa valmistajan taulukkoa.",
    },
    {
      q: "Kuinka kauan taivutusaineen annetaan vaikuttaa?",
      a: "Yhtä lukua ei ole. Aika riippuu asiakkaan ripsityypistä ja käyttämästäsi tuotteesta, joten ajasta valmistajan taulukon mukaan. Kun ainetta pidetään pidempään ”varmuuden vuoksi”, ripsistä tulee kähärät ja hauraat.",
    },
    {
      q: "Miksi ripsissä on taite tai ne ovat vinossa kestotaivutuksen jälkeen?",
      a: "Taite syntyy, kun muotti on asetettu irti ripsirajasta. Vinoon ripset jäävät, kun ne olivat jo vinossa tai ristissä muotilla kampausvaiheessa. Aseta muotti aivan ripsirajaan ja kampaa pieninä ryhminä, jotta jokainen ripsi on suora ja erillään.",
    },
    {
      q: "Värjätäänkö ripset ennen kestotaivutusta vai sen jälkeen?",
      a: "Oppitunnilla ripset värjätään toisen aineen jälkeen, kun ne ovat vielä muotilla, ja vain jos allergiatesti oli puhdas. Väri laitetaan vain ripsiin, ei iholle, ja pyyhitään kostealla vanulla, kunnes siihen ei enää tartu väriä.",
    },
    {
      q: "Mitä tehdään, jos asiakkaan silmiä kirvelee kestotaivutuksen aikana?",
      a: "Pyyhi tuote heti pois, huuhtele puhtaalla vedellä ja lopeta. Kirvely tai poltto tarkoittaa, että tuote on koskenut ihoon, on lähellä silmää tai asiakas reagoi. Jos tuotetta joutuu silmään, huuhtele runsaalla puhtaalla vedellä ja hakeudu hoitoon, jos silmä on edelleen kipeä, punainen tai näkö sumea.",
    },
    {
      q: "Milloin kestotaivutuksen jälkeen saa käyttää maskaraa?",
      a: "Ripset pidetään kuivina valmistajan suosittaman ajan, usein vuorokauden. Sinä aikana ei käytetä maskaraa, ei mennä höyryyn eikä hierota silmiä.",
    },
  ],
  related: ["lash-lift-hieu-dung", "mi-dam-thao", "mi-chuan-bi", "di-ung-hoa-chat"],
};

export default article;
