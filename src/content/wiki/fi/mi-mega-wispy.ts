import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/mi-mega-wispy/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "wispy-ripsien-tekeminen",
  lesson: "mi-mega-wispy",
  category: "lash",
  title: "Wispy-ripsien tekeminen volyymipohjalle: 12 vaihetta piikkien merkinnästä kotihoitoon",
  metaTitle: "Wispy-ripsien tekeminen: 12 vaihetta pohjasta piikkeihin",
  metaDescription:
    "Wispy-ripset vaihe vaiheelta: konsultaatio, ripsikartta, piikkien paikkojen merkintä, kapeakantaiset megaviuhkat, pohjakerros, tasavälein piikit ja wet look.",
  keyword: "wispy-ripsien tekeminen",
  keywords: [
    "wispy-ripset vaihe vaiheelta",
    "piikkien tekeminen ripsiin",
    "mihin piikit wispy-ripsissä",
    "megavolyymin tekeminen",
    "wet look -ripsien tekeminen",
    "wispy-tekniikka",
    "wispy-pohjakerros",
  ],
  excerpt: "Pohjakerros ensin, piikit sitten, ja jokainen oma ripsi kantaa vain yhden asian. Wispy-setin 12 vaihetta volyymi- tai megapohjalle sekä wet lookin tekeminen.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-noi-mi-wispy-cho-khach-trong-studio"),
    alt: "Ripsistylisti korkealla nutturalla, kermanvärisessä paidassa ja mustissa käsineissä kumartuu sängyllä makaavan asiakkaan ylle marmoristudiossa, jossa on violetit samettiverhot",
  },
  takeaways: [
    "Wispy-setti tehdään tässä järjestyksessä: **kartta ja merkityt pisteet**, pohjakerros ja vasta sitten piikit.",
    "Jätä jokaisen merkityn pisteen kohdalle yksi vahva oma ripsi vapaaksi piikkiä varten, koska **jokainen oma ripsi kantaa vain yhden asian**: viuhkan tai piikin.",
    "Piikit ovat usein noin **1–3 mm** pohjaa pidempiä tyylistä riippuen, tasavälein, samaan suuntaan kuin pohja, eivätkä koskaan pidempiä kuin oma ripsi jaksaa kantaa.",
    "Megaviuhkan kanta on kapea ja suljettu, ja se koskettaa vain liimapisaran reunaa. Leveä kanta tai iso liimapaakku tarkoittaa, että viuhka hylätään ja tehdään uusi.",
    "Tarkista ylhäältä ja sivulta: jos oma ripsi painuu tai kiertyy, sen tilalle tulee kevyempi ja lyhyempi viuhka.",
  ],
  intro: [
    "Wispy-ripsien tekeminen on kaksi tuttua työtä oikeassa järjestyksessä: ensin tasainen ja pehmeä volyymipohja, sitten sen lomaan pitkät kärjet eli piikit etukäteen merkittyihin pisteisiin. Vaikeinta on pitää käsi hyvin kevyenä ja muistaa koko ajan, mitä alla oleva oma ripsi jaksaa kantaa.",
    "Artikkeli perustuu VaraaAi Academyn Ripset-kurssin oppituntiin ”Megavolyymi ja wispy: vaihe vaiheelta”. Käyt läpi wispy-setin 12 vaihetta volyymi- tai megavolyymipohjalle ja sen jälkeen wet lookin tekemisen. Artikkeli rakentuu klassisten ripsien, volyymin ja ripsikartan varaan, joten katso ensin alla oleva video ja harjoittele harjoituspäähän.",
  ],
  sections: [
    {
      id: "mista-wispy-koostuu",
      title: "Mistä wispy-setti koostuu",
      blocks: [
        { p: "Wispyssä on kaksi kerrosta. **Pohjakerros** on lyhyitä, pehmeitä volyymi- tai megavolyymiviuhkoja, jotka peittävät koko ripsirivin tasaisesti. **Piikit** (spikes) ovat pitkät kärjet: muutama ripsi tiiviisti yhteen suljettuna, pohjaa pidempi ja tasavälein sijoitettu, jotta reunasta tulee höyhenmäinen ja epätasainen." },
        { p: "Kolme asiaa pysyy koko käynnin ajan, oli tyyli mikä tahansa:" },
        {
          ul: [
            "Asiakkaan silmät pysyvät kiinni.",
            "Jokainen viuhka ja jokainen piikki kiinnitetään täsmälleen yhteen omaan ripseen.",
            "Liima ei koskaan koske ihoon.",
          ],
        },
        { p: "Miksi tuuheat tyylit kuormittavat omia ripsiä niin helposti ja kuinka paljon kevyemmin heikkoihin ripsiin tehdään, selitetään artikkelissa [megavolyymiripset, wispy ja wet look](lesson:mi-mega-wispy-hieu-dung). Tässä keskitytään käsien työhön." },
      ],
    },
    {
      id: "konsultaatio-ja-tyyli",
      title: "Konsultaatio ja tyylin valinta omien ripsien mukaan",
      blocks: [
        { p: "Näytä asiakkaalle mallikuvia ja sopikaa kaksi asiaa: kuinka tuuhea setti on ja kuinka voimakkaasti piikit erottuvat. Kerro huoltoväli heti alussa, yleensä 2–3 viikkoa." },
        { img: { src: img("tu-van-chon-kieu-mi-wispy-voi-anh-mau"), alt: "Ripsistylisti pitää tablettia, jossa on mallikuva silmästä, ja kermanvärisessä nojatuolissa istuva vaaleahiuksinen asiakas katsoo sitä hymyillen", caption: "Sovi tuuheudesta ja piikkien voimakkuudesta mallikuvien avulla ennen kuin asiakas käy makuulle." } },
        { p: "Katso sitten omat ripset tarkasti. Vahvoihin, pitkiin ja paksuihin ripsiin voi tehdä täyden tyylin. Ohuet tai harvat ripset saavat kevyemmän version: vähemmän ripsiä viuhkassa, lyhyemmät ja harvemmat piikit. Kerro siitä asiakkaalle etukäteen, jottei hän yllättyisi silmät avatessaan." },
        { note: "Artikkelin pituudet ja viuhkojen ripsimäärät ovat vain esimerkkejä. Todellinen kartta seuraa aina asiakkaan silmiä ja sitä, mitä omat ripset jaksavat kantaa, sekä ripsivalmistajan taulukkoa ja liimavalmistajan ohjeita. Kauneuspalveluja koskevat säännöt vaihtelevat maittain, eikä artikkeli ole ammattipätevyys.", kind: "warn", title: "Ennen kuin käytät lukuja" },
      ],
    },
    {
      id: "muistettavat-luvut",
      title: "Wispy-ripsien muistettavat luvut",
      blocks: [
        {
          table: {
            head: ["Asia", "Luku", "Huomio"],
            rows: [
              ["Piikki pohjaan verrattuna", "Noin 1–3 mm pidempi", "Tyylin mukaan, ei koskaan enempää kuin oma ripsi kantaa"],
              ["Viuhkan kannan etäisyys luomesta", "Noin 0,5–1 mm", "Liima ja pidennys eivät koske ihoon"],
              ["Huolto", "Yleensä 2–3 viikon välein", "Mitä tuuheampi tyyli, sitä säännöllisemmin"],
            ],
          },
        },
        { p: "Tuuheat tyylit vievät aikaa ja vaativat hyvin kevyen käden. Hitaasti ja oikein on parempi kuin nopeasti ja sitten irrottaen." },
      ],
    },
    {
      id: "wet-lookin-tekeminen",
      title: "Wet look -ripsien tekeminen",
      blocks: [
        { p: "Wet look ei tarvitse avointa pohjakerrosta. Koko ripsirivi tehdään suljetuilla viuhkoilla: ripset painetaan yhteen kärjiksi, jokainen kärki kiinnitetään yhteen omaan ripseen ja kärjet sijoitetaan tiheästi ripsirajaa pitkin. Kärjet tehdään samalla tavalla kuin piikit vaiheessa 8." },
        {
          ul: [
            "Kärkien on pysyttävä selvästi erillään, jokainen omassa ripsessään. Yhteen tarttuneet kärjet ovat tarttumia eivätkä wet lookia, ja ne erotetaan heti.",
            "Liima pysyy vain kannassa. Ripsiä pitkin noussut liima tekee kärjestä jäykän tikun, vaikka suljetun viuhkan pitää pysyä pehmeänä.",
          ],
        },
      ],
    },
    {
      id: "yleiset-virheet",
      title: "Yleiset virheet wispy- ja megavolyymiripsissä",
      blocks: [
        {
          table: {
            head: ["Virhe", "Miksi se syntyy", "Korjaus"],
            rows: [
              ["Piikit kasautuvat, tiheässä yhdessä kohdassa ja harvassa toisessa", "Pisteitä ei merkitty, piikit menivät sinne missä oli tilaa", "Merkitse tyynyyn tasavälein pisteet heti kartan jälkeen ja sijoita piikit niihin"],
              ["Pohjaviuhka ja piikki samassa ripsessä", "Pisteen kohdalle ei jätetty vapaata omaa ripseä", "Jätä pohjaa tehdessä jokaisen pisteen kohdalle yksi vahva oma ripsi vapaaksi"],
              ["Leveä tai vino viuhkan kanta", "Käsi ei ollut tarpeeksi kevyt kantaa suljettaessa", "Hylkää viuhka ja tee uusi"],
              ["Iso liimapaakku viuhkan kannassa", "Viuhka upotettiin syvälle eikä kosketettu pisaran reunaa", "Hylkää viuhka, tee uusi ja kosketa liimaa hyvin kevyesti"],
              ["Oma ripsi painuu tai kiertyy", "Viuhka tai piikki on liian painava tai pitkä juuri sille ripselle", "Irrota se ja korvaa kevyemmällä ja lyhyemmällä viuhkalla"],
            ],
          },
        },
        { note: "Megavolyymin kaltaisissa tuuheissa seteissä moni tarttuma näkyy vasta sivulta. Kun olet vetänyt pinsetit ripsien läpi ylhäältä, laskeudu asiakkaan silmien tasolle ja katso ripsiriviä vielä kerran sivulta.", kind: "tip", title: "Katso kahdesta suunnasta" },
      ],
    },
    {
      id: "kotihoito",
      title: "Wispy- ja megavolyymiripsien kotihoito",
      blocks: [
        { p: "Perusohjeet ovat samat kuin [klassisissa ripsissä](lesson:mi-classic):" },
        {
          ul: [
            "Ripset pidetään kuivina liimavalmistajan suosittelema aika.",
            "Ei öljypohjaisia tuotteita ripsien tyveen.",
            "Ripset harjataan joka päivä.",
            "Silmiä ei hierota.",
          ],
        },
        { p: "Tuuheissa tyyleissä on kaksi lisäohjetta. Paksuihin ripsiin kertyy helposti likaa ja talia tyveen, joten asiakkaan on puhdistettava ripset hellästi öljyttömällä tuotteella niin kuin näytät. Ja hän tarvitsee säännölliset huollot, ei liian pitkin välein." },
        { note: "Kuvaa valmiit ripset ylhäältä ja sivulta ja tallenna kuvat ripsikartan kanssa VaraaAissa [asiakkaan tietojen](lesson:khach-hang) muistiinpanoihin. Seuraavassa huollossa voit verrata piikkien rytmiä ja omien ripsien kuntoa.", kind: "tip", title: "Kuvat ja kartta seuraavaa huoltoa varten" },
        { p: "Varaa [huoltoaika](lesson:lich-hen) ennen kuin asiakas lähtee. Jos salonki ottaa vastaan ajanvarauksia netissä, tuuhea tyyli kannattaa lisätä [palveluihin](lesson:dich-vu) omalla kestollaan, koska se vie enemmän aikaa kuin tavallinen volyymisetti." },
      ],
    },
  ],
  howTo: {
    title: "Wispy-ripsien tekeminen volyymi- tai megavolyymipohjalle vaihe vaiheelta",
    id: "wispy-ripsien-vaiheet",
    after: "konsultaatio-ja-tyyli",
    lead: "Kaksitoista vaihetta oppitunnin videon järjestyksessä. Pohjakerroksen on oltava kokonaan valmis ennen ensimmäistä pitkää kärkeä.",
    supplies: [
      "Alusta hyvin ohuita ripsiä pohjaa varten kartan järjestyksessä",
      "Alusta pidempiä ripsiä piikkejä varten tai valmistajan valmiit piikit",
      "Ripsiliima ja jadekivi, jolla on tuore liimapisara",
      "Suorat pinsetit eristämiseen, volyymipinsetit viuhkoihin",
      "Ripsien puhdistusaine, silmänalustyynyt ja merkintäkynä",
      "Kertakäyttöiset ripsiharjat ja vanupuikot",
    ],
    steps: [
      {
        name: "Konsultoi ja valitse tyyli",
        text: "Katsokaa mallikuvia yhdessä, sopikaa tuuheudesta ja piikkien voimakkuudesta ja kerro, että huolto tarvitaan yleensä 2–3 viikon välein. Päätä omien ripsien perusteella täyden tyylin ja kevyemmän version välillä ja kerro asiakkaalle etukäteen.",
      },
      {
        name: "Valmistele kuten klassisissa",
        text: "Kysy allergioista, asettele asiakas mukavasti, puhdista ripset, aseta tyynyt ja harjaa ripset. Tämä tehdään täsmälleen kuten artikkelissa [ripsien esikäsittely](lesson:mi-chuan-bi) ja klassisten ripsien käytäntötunnilla; jos se ei vielä suju itsestään, kertaa ne ensin.",
      },
      {
        name: "Tee kartta ja merkitse piikkien paikat",
        text: "Jaa alueet ja merkitse pohjan pituudet kuten artikkelissa [ripsikartan tekeminen](lesson:mi-mapping). Lisää sitten tyynyyn aivan ripsirajan alle pieniä, tasavälisiä pisteitä: jokainen piste on yksi piikki. Piikit ovat usein noin 1–3 mm pohjaa pidempiä tyylistä riippuen, mutta eivät koskaan pidempiä kuin oma ripsi jaksaa kantaa.",
        image: { src: img("danh-dau-cho-dat-spike-tren-mieng-lot"), alt: "Violetti kynä mustaan käsineeseen puetussa kädessä merkitsee silmänalustyynyyn rivin pieniä tasavälisiä pisteitä, joiden alla näkyvät alueviivat" },
      },
      {
        name: "Järjestä työpiste",
        text: "Alusta hyvin ohuita ripsiä pohjaan kartan järjestyksessä ja alusta pidempiä ripsiä piikkeihin. Tuore liimapisara jadekivelle, suorat pinsetit eristämiseen ja volyymipinsetit viuhkoihin. Pidä kaikki siistissä järjestyksessä, jotteivät kädet joudu etsimään eikä väärä pituus tartu pinsetteihin.",
        image: { src: img("khay-dung-cu-noi-mi-mega-volume-wispy"), alt: "Kultareunainen marmoritarjotin, jolla kuuden nauhan volyymiripsialusta, jadekivi liimapisaroineen, kahdet pinsetit, ripsiharja ja musta liimapullo" },
      },
      {
        name: "Tee megaviuhkat pohjaa varten",
        text: "Tee ne kuten artikkelissa [volyymiripsien tekeminen](lesson:mi-volume): ota muutama ripsi, liu'uta pinsettejä, avaa viuhka ja sulje kanta. Megaviuhkoissa on enemmän ja ohuempia ripsiä, joten käden on oltava vielä kevyempi. Kannan on oltava kapea, suljettu ja lähes yhden ripsen ohut; leveäkantainen tai vino viuhka hylätään ja tehdään uusi.",
      },
      {
        name: "Ota hyvin vähän liimaa",
        text: "Kosketa vain viuhkan kannalla liimapisaran reunaa, hyvin kevyesti, ja nosta pois. Megavolyymissa määrän on oltava vielä pienempi, koska ylimääräinen liima tekee kannasta painavan ja jäykän ja liimaa sen viereiseen ripseen. Viuhka, jonka kantaan tarttui iso liimapaakku, hylätään.",
        image: { src: img("cham-chan-fan-vao-mep-giot-keo"), alt: "Volyymipinsetit pitävät ohutta ripsiviuhkaa, jonka kanta koskettaa kevyesti mustaa liimapisaraa käsineeseen puetulla kämmenellä lepäävällä jadekivellä" },
      },
      {
        name: "Tee pohjakerros ja jätä tilaa piikeille",
        text: "Eristä täsmälleen yksi oma ripsi ja kiinnitä viuhka niin, että kanta on noin 0,5–1 mm luomesta. Vuorottele alueita, jotta liima ehtii kuivua. Jätä jokaisen merkityn pisteen kohdalle yksi vahva oma ripsi vapaaksi, koska jokainen oma ripsi kantaa vain yhden asian. Kun vaihe on valmis, pohja on tasainen ja pehmeä eikä siinä ole vielä yhtään pitkää kärkeä.",
        image: { src: img("lop-nen-volume-deu-va-mem-truoc-khi-dat-spike"), alt: "Lähikuva suljetusta silmästä juuri valmistuneella volyymipohjalla, ripset tuuheat ja pehmeät, reuna tasainen eikä vielä yhtään pitkää kärkeä" },
      },
      {
        name: "Tee piikit",
        text: "Monet ripsivalmistajat myyvät valmiita piikkejä, ja niitä voi hyvin käyttää. Kun teet itse, ota muutama ripsi mutta älä avaa niitä: pidä ne tiiviisti yhdessä yhtenä kärkenä kouluttajan tai valmistajan ohjeen mukaan. Kärjen on oltava suora ja siisti ja kannan kapea, ja liimaa vain hieman kannassa.",
        image: { src: img("spike-mi-khep-thanh-mui-nhon-tren-nhip"), alt: "Mustaan käsineeseen puettu käsi pitää kulmikkaita volyymipinsettejä, joiden kärjissä on muutamasta ripsestä yhdeksi suoraksi kärjeksi suljettu piikki" },
      },
      {
        name: "Kiinnitä piikit pisteisiin",
        text: "Kiinnitä jokainen piikki yhteen vapaaksi jättämääsi vahvaan omaan ripseen, samaan suuntaan kuin pohja ja tasavälein. Yhteen kohtaan kasautuneet tai paikoin tiheät ja paikoin harvat piikit näyttävät sotkuisilta, ja höyhenmäinen vaikutelma katoaa. Kun yksi silmä on valmis, peräänny ja katso koko riviä: onko pitkien kärkien rytmi tasainen?",
        image: { src: img("dat-spike-wispy-cach-deu-tren-lop-nen"), alt: "Lähikuva suljetusta silmästä valkoisen tyynyn päällä, wispy-ripsirivissä pitkät kärjet nousevat tasaisesti pohjasta ja yläpuolella näkyy ripsistylistin käsi pinsetteineen" },
      },
      {
        name: "Tarkista tarttumat ja paino",
        text: "Vedä suorat pinsetit kevyesti ripsien läpi tyvestä kärkeen: jokaisen viuhkan ja piikin on seistävä yksin omassa ripsessään, ja tarttuma erotetaan heti. Katso sitten painoa ripsi kerrallaan. Jos oma ripsi painuu tai kiertyy, sen pidennys irrotetaan ja tilalle tulee kevyempi ja lyhyempi viuhka. Katso ylhäältä ja sivulta.",
      },
      {
        name: "Vertaa silmiä sängyn päästä",
        text: "Seiso sängyn päässä ja katso molempia silmiä yhtä aikaa. Tuuheuden, pituuden ja pitkien kärkien paikkojen on vastattava toisiaan peilikuvana. Korjaa epätasaisuudet heti, kun asiakas vielä makaa.",
        image: { src: img("so-hai-mat-tu-dau-giuong-sau-khi-noi-mi"), alt: "Näkymä sängyn päästä alas silmät suljettuina makaavan asiakkaan kasvoihin, valkoiset tyynyt kummankin silmän alla ja ripsirivit tasapainossa molemmin puolin" },
      },
      {
        name: "Viimeistele, ohjeista ja siivoa",
        text: "Harjaa ripset uudelleen, poista tyynyt hyvin kevyesti silmien ollessa vielä kiinni ja anna asiakkaan avata silmät hitaasti. Anna kotihoito-ohjeet ja varaa huolto. Kun asiakas on lähtenyt, käytetyt harjat, vanupuikot ja tyynyt kannelliseen roska-astiaan, ja pinsetit puhdistetaan ja desinfioidaan kuten artikkelissa [kauneushoitolan välinehuolto](lesson:ve-sinh-dung-cu).",
        image: { src: img("go-mieng-lot-khi-mat-khach-van-nham"), alt: "Mustaan käsineeseen puettu sormenpää nostaa varovasti valkoista tyynyä asiakkaan silmän alta, silmä yhä kiinni ja valmis ripsisetti paikallaan" },
      },
    ],
  },
  faq: [
    {
      q: "Tehdäänkö wispy-ripsissä ensin pohjakerros vai piikit?",
      a: "Ensin pohjakerros. Piikkien paikat merkitään tyynyyn pienillä pisteillä kartan piirtämisen yhteydessä, ja pohjaa tehdessä jokaisen pisteen kohdalle jätetään yksi vahva oma ripsi vapaaksi. Kun pohja on valmis, tasainen ja pehmeä, piikit kiinnitetään vapaaksi jätettyihin ripsiin.",
    },
    {
      q: "Kuinka paljon pohjaa pidempiä wispy-piikit ovat?",
      a: "Usein noin 1–3 mm pohjaa pidempiä asiakkaan valitseman tyylin mukaan. Luku on vain suuntaa antava: piikki ei saa koskaan olla pidempi kuin sitä kantava oma ripsi jaksaa, ja ohuet tai harvat ripset saavat lyhyemmät ja harvemmat piikit.",
    },
    {
      q: "Voiko piikin kiinnittää pohjaviuhkan päälle?",
      a: "Ei. Jokainen oma ripsi kantaa vain yhden asian, joko viuhkan tai piikin. Molemmat samassa ripsessä ylikuormittavat sen, jolloin oma ripsi painuu ja irtoaa aikaisin.",
    },
    {
      q: "Miten wet look tehdään eri tavalla kuin wispy?",
      a: "Wet look ei tarvitse avointa pohjakerrosta. Koko ripsirivi tehdään kärjiksi suljetuilla viuhkoilla, jokainen yhdessä omassa ripsessä ja tiheästi ripsirajaa pitkin. Kärkien on pysyttävä selvästi erillään; yhteen tarttuneet kärjet ovat tarttumia ja erotetaan heti.",
    },
    {
      q: "Mitä lisähoitoa megavolyymi- ja wispy-ripset tarvitsevat kotona?",
      a: "Sen lisäksi, että ripset pidetään kuivina liimavalmistajan suosittelema aika, tyveen ei laiteta öljypohjaisia tuotteita, ripset harjataan päivittäin eikä silmiä hierota, tuuhean tyylin asiakkaan on puhdistettava ripset hellästi öljyttömällä tuotteella, koska paksuihin ripsiin kertyy tyveen likaa ja talia. Hän tarvitsee myös säännölliset huollot, yleensä 2–3 viikon välein.",
    },
  ],
  related: ["mi-mega-wispy-hieu-dung", "mi-volume", "mi-mapping", "mi-dam-thao"],
};

export default article;
