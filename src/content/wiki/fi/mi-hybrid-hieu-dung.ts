import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/mi-hybrid-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "mita-ovat-hybridiripset",
  lesson: "mi-hybrid-hieu-dung",
  category: "lash",
  title: "Mitä ovat hybridiripset? Ero klassisiin ja volyymiin, kenelle ne sopivat ja montako viuhkaa sekaan",
  metaTitle: "Mitä ovat hybridiripset? Ero klassisiin ja volyymiin",
  metaDescription:
    "Hybridiripsissä samaan silmään yhdistetään klassisia ripsiä ja volyymiviuhkoja. Spiky-ilme, kenelle se sopii, viuhkoja 30–50 % lähtökohtana, laikukkuus ja huolto.",
  keyword: "hybridiripset",
  keywords: [
    "hybridiripset vai volyymiripset",
    "kenelle hybridiripset sopivat",
    "hybridiripsien sekoitussuhde",
    "spiky ripset",
    "ripsienpidennykset harvoihin ripsiin",
    "kauanko hybridiripset kestävät",
    "mitä hybridiripset tarkoittavat",
  ],
  excerpt: "Hybridiripsissä samaan silmään yhdistetään yksittäisiä ripsiä ja viuhkoja, jolloin ripsirivistä tulee ilmava ja tekstuurinen. Artikkeli kertoo, kenelle ne sopivat, miten sekoitus tehdään omien ripsien mukaan ja mitä virheitä välttää.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-mi-chuan-bi-hai-vi-mi-classic-va-volume-cho-bo-hybrid"),
    alt: "Ripsistylisti, hiukset korkealla nutturalla ja mustat käsineet, istuu valkoisen kivipöydän ääressä pinsetit kädessä, edessään kaksi vaaleanpunaista ripsialustaa vierekkäin",
  },
  takeaways: [
    "Hybridiripsissä **samaan silmään yhdistetään klassisia yksittäisiä ripsiä ja volyymiviuhkoja**; jokainen oma ripsi kantaa silti vain toisen niistä.",
    "Ilme on tekstuurinen ja hieman ilmava, usein puhutaan spiky-ilmeestä: tuuheampi kuin klassiset, pehmeämpi ja luonnollisempi kuin täysi volyymi.",
    "Valitse yksittäinen ripsi tai viuhka **kunkin oman ripsen vahvuuden** mukaan: vahva ripsi kantaa kevyen viuhkan, ohut yksittäisen ripsen, ja liian heikko nuori ripsi jää paljaaksi.",
    "Puolet ja puolet tai viuhkoja noin **30–50 %** on lähtökohta, ei sääntö.",
    "Jaa viuhkat ja yksittäiset ripset tasaisesti koko ripsiriville; yhteen kohtaan kasautuneet viuhkat näyttävät laikukkailta.",
  ],
  intro: [
    "Hybridiripset ovat yhdistelmätekniikka: samassa silmässä osa omista ripsistä kantaa yksittäisen pidennyksen kuten klassisissa ja osa viuhkan kuten volyymissa. Valmis ripsirivi on tuuheampi kuin klassiset muttei yhtä tiivis kuin volyymi, ja pehmeiden viuhkojen seasta erottuu selkeitä yksittäisiä ripsiä. Moni asiakas valitsee hybridin välivaiheeksi, kun klassiset alkavat tuntua hieman ohuilta.",
    "Artikkeli perustuu VaraaAi Academyn Ripset-kurssin oppituntiin ”Hybridiripset: ymmärrä ne, niin saat luonnollisen tekstuurin”. Opit, kenelle hybridiripset sopivat, miten päätät, mikä oma ripsi saa viuhkan ja mikä yksittäisen ripsen, ja miksi täysin säännöllinen sekoitusrytmi voi silti harventaa asiakkaan ripsiä.",
  ],
  sections: [
    {
      id: "mita-hybridi-on",
      title: "Mitä hybridiripset ovat",
      blocks: [
        { p: "Hybridi tarkoittaa yhdistelmää. Ripsistylisti käyttää molempia jo opittuja asioita: [klassisten ripsien](lesson:mi-classic-hieu-dung) yksittäistä pidennystä ja [volyymiripsien](lesson:mi-volume-hieu-dung) pientä, muutamasta hyvin ohuesta ripsestä tehtyä viuhkaa. Tässä yksittäinen ripsi, tuossa viuhka." },
        { img: { src: img("soi-don-classic-va-fan-volume-trong-noi-mi-hybrid"), alt: "Vaaleanpunaisella alustalla vasemmalla paksu musta yksittäinen pidennys ja oikealla viidestä hyvin ohuesta ripsestä tehty viuhka yhteisellä kannalla", caption: "Hybridissä yhdistettävät kaksi asiaa: klassinen yksittäinen ripsi ja volyymiviuhka." } },
        { note: "Jokainen oma ripsi kantaa täsmälleen yhden asian: joko yksittäisen ripsen tai viuhkan. Ei koskaan molempia, eikä koskaan yhtä viuhkaa kahden vierekkäisen oman ripsen ympärillä.", kind: "warn", title: "Mikä ei koskaan muutu" },
        { img: { src: img("bo-mi-hybrid-hoan-thien-soi-don-xen-fan"), alt: "Lähikuva suljetusta silmästä valmiine hybridiripsineen, selkeät mustat yksittäiset ripset nousevat piikkeinä pehmeiden viuhkojen välistä", caption: "Valmiit hybridiripset: selkeitä yksittäisiä ripsiä pehmeiden viuhkojen seassa." } },
      ],
    },
    {
      id: "ero-klassisiin-ja-volyymiin",
      title: "Hybridiripset, klassiset ja volyymiripset: mitä eroa",
      blocks: [
        { p: "Hybridiripsissä yksittäiset ripset ovat paksumpia ja kiiltävän mustia, ja ne erottuvat yksittäisinä kuin pienet piikit. Ohuet viuhkat täyttävät välit ja tuovat ripsiriviin tuuheutta ja pehmeyttä. Alalla tätä ilmettä kutsutaan usein spiky-ilmeeksi." },
        {
          table: {
            head: ["Tekniikka", "Jokainen oma ripsi kantaa", "Ilme"],
            rows: [
              ["Klassiset", "Yhden pidennyksen", "Luonnollinen ja erillinen, kuin ripsiväri"],
              ["Hybridi", "Yhden yksittäisen ripsen tai yhden viuhkan ripsen vahvuuden mukaan", "Tekstuurinen, hieman ilmava; tuuheampi kuin klassiset, pehmeämpi ja luonnollisempi kuin täysi volyymi"],
              ["Volyymi", "Yhden muutamasta hyvin ohuesta ripsestä tehdyn viuhkan", "Tuuhea, pehmeä ja tiiviin tumma ripsirivi"],
            ],
          },
        },
        { img: { src: img("khach-voi-bo-mi-hybrid-toi-tu-nhien"), alt: "Lähikuvamuotokuva vaaleahiuksisesta asiakkaasta silmät auki hybridiripsien kanssa, ripsirivi tuuheampi kuin ripsivärillä ja muutama selkeä ripsi erottuu pehmeämpien seasta", caption: "Hybridiripset silmät auki: tuuheat mutta yhä kevyet, eivät umpinaiset." } },
      ],
    },
    {
      id: "kenelle-sopivat",
      title: "Kenelle hybridiripset sopivat",
      blocks: [
        { p: "Hybridiä suositellaan usein kahdelle asiakasryhmälle." },
        { p: "Ensimmäinen ryhmä ovat asiakkaat, joiden omat ripset ovat harvat, aukkoiset tai epätasaiset, paikoin tiheät ja paikoin ohuet. Ohuet viuhkat aukon ympärillä olevissa vahvoissa ripsissä saavat ripsirivin näyttämään täyteläiseltä ilman, että heikkojen ripsien tarvitsee kantaa painoa." },
        { img: { src: img("mi-that-thua-khong-deu-co-khoang-trong"), alt: "Lähikuva suljetusta silmästä ennen pidennyksiä, oma ripsirivi epätasainen: muutama pitkä vahva ripsi, paljon lyhyitä nuoria ripsiä ja muutamia aukkoja", caption: "Epätasaiset omat ripset ja aukkoja: tilanne, johon hybridi sopii hyvin." } },
        { p: "Toinen ryhmä ovat klassisiin tottuneet asiakkaat, jotka haluavat hieman lisää tuuheutta mutta eivät ole vielä valmiita volyymiin. Moni asiakas siirtyy klassisista hybridiin ja vasta myöhemmin volyymiin." },
      ],
    },
    {
      id: "yksittainen-vai-viuhka",
      title: "Yksittäinen ripsi vai viuhka: oman ripsen vahvuus ratkaisee",
      blocks: [
        { p: "Tämä on hybridin tärkein asia. Yksittäisiä ripsiä ja viuhkoja ei valita kiinteän kaavan mukaan, vaan ripsi kerrallaan." },
        {
          table: {
            head: ["Oma ripsi", "Mitä siihen kiinnitetään"],
            rows: [
              ["Vahva, pitkä ja paksu", "Voi kantaa kevyen viuhkan"],
              ["Ohut, lyhyt tai juuri kasvamaan lähtenyt nuori ripsi", "Hyvin ohut ja lyhyt yksittäinen ripsi"],
              ["Liian heikko nuori ripsi", "Jätetään paljaaksi seuraavaan huoltoon"],
            ],
          },
        },
        { h3: "Hybridiripsien sekoitussuhde: lähtökohta, ei sääntö" },
        { p: "Usein sanotaan, että noin puolet ovat yksittäisiä ripsiä ja puolet viuhkoja. Joidenkin mukaan viuhkojen osuus on noin 30–50 %. Pidä sitä lähtökohtana. Jos asiakkaalla on paljon vahvoja ripsiä, viuhkoja voi olla enemmän. Jos ripset ovat heikot, käytetään enemmän kevyitä yksittäisiä ripsiä. Paras luku on se, jonka asiakkaan omat ripset jaksavat kantaa." },
        { h3: "Aloittelijan virhe: jäykkä rytmi" },
        { p: "Yksittäinen, viuhka, yksittäinen, viuhka, täysin säännöllisesti. Se näyttää siistiltä, mutta rytmi ei katso omia ripsiä. Heikko nuori ripsi saa viuhkan, ja sen vieressä oleva vahva ripsi vain yksittäisen ripsen. Muutaman viikon päästä heikot ripset irtoavat aikaisin, ja ripsirivi harvenee juuri siellä, missä asiakkaan ripset olivat jo valmiiksi harvat." },
        { note: "Tasainen rytmi on hyvä, mutta sen on seurattava omia ripsiä. Aukko peitetään viuhkoilla sen ympärillä olevissa vahvoissa ripsissä, ei viuhkalla itse aukossa olevassa nuoressa ripsessä.", kind: "tip", title: "Oikea ajattelutapa" },
      ],
    },
    {
      id: "tekstuuri-ja-jakauma",
      title: "Hybridiripsien tekstuuri ja tasainen jakauma",
      blocks: [
        { p: "Osa tekstuurista syntyy siitä, miten yksittäisten ripsien ja viuhkojen pituudet yhdistetään. Tapoja on kaksi, ja kumpikin on oikein:" },
        {
          table: {
            head: ["Pituuksien yhdistäminen", "Miltä ripsirivi näyttää"],
            rows: [
              ["Yksittäiset ripset hieman viuhkoja pidempiä", "Yksittäiset ripset nousevat viuhkojen yli selvinä piikkeinä; terävämpi ja rohkeampi ilme"],
              ["Yksittäiset ripset viuhkojen pituisia tai lyhyempiä", "Viuhkat ovat päällimmäisinä, ripsirivi on pehmeämpi ja pörröisempi; alla olevat yksittäiset ripset tuovat syvyyttä"],
            ],
          },
        },
        { img: { src: img("mi-hybrid-nhin-nghieng-soi-don-dai-hon-fan"), alt: "Asiakkaan suljettu silmä sivulta ohimon suunnasta kuvattuna, yksittäisten ripsien kärjet nousevat pehmeiden viuhkojen yli ja ääriviiva on hieman piikikäs", caption: "Sivukuva: viuhkoja hieman pidemmät yksittäiset ripset antavat terävämmän reunan." } },
        { p: "Valinta riippuu asiakkaan kanssa sovitusta ilmeestä. Pidä ero pienenä. Liian suuri ero saa ripsirivin näyttämään sotkuiselta ja huolimattomalta." },
        { p: "Viuhkat ja yksittäiset ripset jaetaan tasaisesti koko ripsiriville. Jos kaikki viuhkat kasautuvat yhteen kohtaan ja muualla on vain muutama yksittäinen ripsi, ripsirivi näyttää laikukkaalta: yhdessä kohdassa tumma ja raskas, toisessa harva. Vältät sen työskentelemällä alue kerrallaan, katsomalla kokonaisuutta jokaisen alueen jälkeen ja vertaamalla molempia silmiä." },
        { img: { src: img("loi-fan-don-vao-giua-mat-hang-mi-loang-lo"), alt: "Lähikuva suljetusta silmästä, jossa tiivis tumma viuhkalaikku on kasautunut ripsirivin keskelle ja kummassakin nurkassa on vain lyhyitä, harvoja omia ripsiä", caption: "Esimerkkikuva virheestä: viuhkat kasautuneet silmän keskelle ja nurkat harvat. Ripsirivi on laikukas." } },
      ],
    },
    {
      id: "turvallisuus-ja-huolto",
      title: "Turvallisuus ja hybridiripsien huolto",
      blocks: [
        { p: "Turvallisuussäännöt ovat täsmälleen samat kuin klassisissa ja volyymissa:" },
        {
          ul: [
            "Jokainen yksittäinen ripsi tai viuhka kiinnitetään täsmälleen yhteen huolellisesti eristettyyn omaan ripseen.",
            "Ei tarttumia.",
            "Noin 0,5–1 mm:n päähän luomen ihosta, ei koskaan ihoon.",
            "Hyvin pieni liimapisara.",
          ],
        },
        { p: "Hybridissä kädet vaihtavat jatkuvasti yksittäisten ripsien ja viuhkojen välillä, joten kiirehtiminen on helppoa. Pidä kädet hitaina ja vakaina." },
        { p: "Omat ripset irtoavat elinkaarensa mukaan, joten asiakas tulee huoltoon, yleensä 2–3 viikon kuluttua. Huollossa älä toista sitä, mitä teit viimeksi, vaan arvioi omat ripset uudelleen. Viime kerralla paljaaksi jätetty tai ohuen yksittäisen ripsen saanut nuori ripsi voi nyt kantaa viuhkan. Muistuta asiakasta hoitamaan ripsiä kotona kuten klassisten ripsien jälkeen. Huollosta on oma oppituntinsa: [ripsien huolto ja poisto](lesson:mi-dam-thao-hieu-dung)." },
      ],
    },
    {
      id: "hybridikonsultaatio",
      title: "Hybridiripsien konsultaatio: näytä kuvia ja ole rehellinen",
      blocks: [
        { p: "Näytä asiakkaalle hybridikuvia ennen aloittamista ja kerro selvästi, että kyse on ilmavasta ja tekstuurisesta ilmeestä eikä volyymin kaltaisesta tasaisen tummasta ripsirivistä. Jos asiakkaan ripset ovat harvat, kerro lempeästi, että käytät tällä kertaa enemmän yksittäisiä ripsiä, jotta omat ripset pysyvät terveinä. Kun asiakas ymmärtää asian etukäteen, hän ei hämmästy avatessaan silmänsä." },
        { p: "Kirjaa VaraaAissa valittu ilme [asiakasprofiiliin](lesson:khach-hang): ovatko yksittäiset ripset viuhkoja pidempiä vai lyhyempiä ja suunnilleen montako viuhkaa käytettiin. Seuraavassa huollossa ripset pysyvät samantyylisinä, vaikka tekijä vaihtuisi. Hybridiripset ja hybridiripsien huolto toimivat parhaiten kahtena erillisenä [palveluna](lesson:dich-vu), jotta asiakas varaa juuri sen, mitä tarvitsee." },
        { p: "Käytännön työ omien ripsien arvioinnista alue kerrallaan silmien vertailuun käydään läpi artikkelissa [hybridiripsien tekeminen](lesson:mi-hybrid)." },
        { note: "Artikkelin sekoitussuhde, pituudet ja viuhkojen ripsimäärät ovat yleisiä alan ohjeita, eivät tarkkoja lukuja: päätä aina asiakkaan omien ripsien mukaan ja tarkista ripsivalmistajan taulukko ja liimavalmistajan ohjeet. Kauneuspalveluja ja -tuotteita koskevat säännöt vaihtelevat maittain. Artikkeli on koulutusmateriaalia, ei ammattipätevyys.", kind: "info", title: "Huomio" },
      ],
    },
  ],
  faq: [
    {
      q: "Mitä eroa on hybridiripsillä, klassisilla ja volyymiripsillä?",
      a: "Klassisissa jokaiseen omaan ripseen tulee yksi pidennys, volyymissa muutamasta hyvin ohuesta ripsestä tehty viuhka. Hybridissä molemmat yhdistetään samaan silmään, joten ripsirivi on tuuheampi kuin klassisissa mutta pehmeämpi ja luonnollisempi kuin täydessä volyymissa. Jokainen oma ripsi kantaa silti vain yhden asian.",
    },
    {
      q: "Kenelle hybridiripset sopivat?",
      a: "Ne sopivat asiakkaille, joiden omat ripset ovat harvat, aukkoiset tai epätasaiset, koska aukkoa ympäröivien vahvojen ripsien viuhkat saavat ripsirivin näyttämään tuuheammalta. Ne sopivat myös klassisiin tottuneille, jotka haluavat hieman lisää tuuheutta mutta eivät vielä volyymia.",
    },
    {
      q: "Mikä on hybridiripsien sekoitussuhde?",
      a: "Yleensä mainitaan noin puolet ja puolet tai viuhkoja noin 30–50 %. Se on vain lähtökohta. Kun vahvoja ripsiä on paljon, viuhkoja voi olla enemmän; heikkoihin ripsiin tarvitaan enemmän ohuita yksittäisiä ripsiä.",
    },
    {
      q: "Voiko yhdessä omassa ripsessä olla sekä yksittäinen ripsi että viuhka?",
      a: "Ei voi. Jokainen oma ripsi kantaa vain yhden asian, joko yksittäisen ripsen tai viuhkan, ja se eristetään ennen kiinnitystä. Hybridissä vain yhdistetään kaksi tyyliä samaan silmään.",
    },
    {
      q: "Mitä spiky-ripset tarkoittavat?",
      a: "Se on hybridin tekstuurinen ilme: selkeät mustat yksittäiset ripset seisovat pieninä piikkeinä pehmeiden viuhkojen seassa. Kun yksittäiset ripset valitaan hieman viuhkoja pidemmiksi, piikit erottuvat selvemmin ja ripsirivi näyttää terävämmältä.",
    },
    {
      q: "Kauanko hybridiripset kestävät ennen huoltoa?",
      a: "Asiakas tulee yleensä huoltoon 2–3 viikon kuluttua, koska omat ripset irtoavat kiertonsa mukaan ja pidennykset lähtevät mukana. Huollossa ripsistylisti arvioi omat ripset uudelleen: viimeksi paljaaksi jätetty nuori ripsi voi nyt kantaa yksittäisen ripsen tai viuhkan.",
    },
  ],
  related: ["mi-hybrid", "mi-volume-hieu-dung", "mi-classic-hieu-dung", "mi-mapping-hieu-dung"],
};

export default article;
