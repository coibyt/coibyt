import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/tong-quan/${name}.webp`;
const shot = (name: string) => `/wiki/tong-quan/fi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "salongin-tunnusluvut-yleiskatsaus",
  lesson: "tong-quan",
  category: "salon",
  title: "Salongin tunnusluvut joka aamu: näin luet Yleiskatsaus-sivua ja näet koko salongin tilanteen",
  metaTitle: "Salongin tunnusluvut joka aamu Yleiskatsaus-sivulla",
  metaDescription:
    "Näin luet VaraaAin Yleiskatsausta: odotettu myynti tänään, kuukauden neljä lukua edelliseen kuuhun verrattuna, huomiota vaativat asiat ja suosituimmat palvelut.",
  keyword: "salongin tunnusluvut",
  keywords: [
    "kynsistudion myynnin seuranta päivittäin",
    "salongin hallintapaneeli",
    "salongin myynti kuukausittain",
    "salongin suosituimmat palvelut",
    "myynnin vertailu edelliseen kuukauteen",
    "mitä salongin omistajan kannattaa katsoa aamulla",
    "kuuden kuukauden myyntikaavio",
  ],
  excerpt: "Myynti, varaukset, huomiota vaativat asiat ja suosituimmat palvelut samalla sivulla. Yksi vieritys aamulla kertoo, miten koko salongilla menee.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("chu-salon-xem-trang-tong-quan-tren-may-tinh-bang"),
    alt: "Kiharahiuksinen nainen violetissa silkkipuserossa nojaa marmoritiskiin tabletti kädessään ja hymyilee, taustalla kristallikruunuin valaistu salonki",
  },
  takeaways: [
    "Yleiskatsaus on hallintapaneelin ensimmäinen sivu: ylhäällä ovat päivän varaukset, **”Odotettu myynti tänään”** ja **”Seuraava”**.",
    "Kuukauden neljä lukua ovat myynti, varaukset, uudet asiakkaat ja arvostelujen keskiarvo, ja jokaista **verrataan viime kuun samaan jaksoon**.",
    "**”Vaatii huomiota”** muistuttaa odottavista asioista, kuten lukemattomista viesteistä tai käsiteltävistä tilauksista.",
    "Vieritä alas, niin näet **”Seuraavat 7 päivää”**, **”Myynti, 6 kk”** ja **”Suosituimmat palvelut”**.",
    "Sivu laskee myös hinnaston ja julisteiden QR-koodien skannaukset 30 päivän ajalta.",
  ],
  intro: [
    "Salongin tunnusluvuista on eniten hyötyä, kun ehdit lukea ne aamukahvin aikana ennen ensimmäistä asiakasta. Omistaja ei tarvitse kasaa raportteja. Hän tarvitsee tiedon siitä, montako asiakasta tänään tulee, miten myynti sujuu ja mikä odottaa hoitamista.",
    "Tämä artikkeli seuraa VaraaAi Academyn oppituntia ”Yleiskatsaus”. Luet sivun osat ylhäältä alas, ymmärrät, mihin kysymykseen kukin luku vastaa, ja tiedät, mitä tehdä, kun luku laskee.",
  ],
  sections: [
    {
      id: "joka-aamu",
      title: "Mitä salongin omistajan kannattaa katsoa joka aamu",
      blocks: [
        { p: "Kiireinen salonki ei aina ole terve salonki. Joinakin viikkoina jokainen tuoli on täynnä, ja myynti jää silti viime kuusta, koska asiakkaat ovat siirtyneet halvempiin palveluihin. Joinakin kuukausina myynti näyttää hyvältä, mutta uusia asiakkaita ei ole juuri lainkaan. Tällaista ei näe vastaanottotiskiltä. Se näkyy vasta, kun luvut ovat vierekkäin." },
        { p: "VaraaAin Yleiskatsaus tekee juuri tämän. Kun avaat hallintapaneelin aamulla, tiedät heti kolme asiaa: montako asiakasta tänään on, miten myynti sujuu ja mikä odottaa sinua. Sivulle ei tarvitse syöttää tai asettaa mitään. Se kokoaa kaiken salongin varauksista, arvosteluista ja viesteistä." },
        { p: "Sivu etenee siinä järjestyksessä, jossa omistaja tietoa tarvitsee. Ylimpänä on tämä päivä, sitten kuluva kuukausi, sitten hoidettavat asiat ja lopuksi pidemmät kehityssuunnat. Voit pysähtyä mille tasolle tahansa sen mukaan, montako minuuttia sinulla on." },
      ],
    },
    {
      id: "kuukauden-luvut",
      title: "Kuukauden neljä lukua ja myynnin vertailu edelliseen kuukauteen",
      blocks: [
        { p: "Heti tämän päivän osion alla ovat kuukauden neljä korttia. Jokaisessa on rivi ”vs. sama jakso viime kuussa”. Kuluvan kuun luvulla on siis aina vertailukohta, ja tiedät, onko suunta ylös vai alas, avaamatta viime kuun kirjanpitoa." },
        {
          table: {
            head: ["Kortti", "Mihin se vastaa", "Jos luku on viime kuuta pienempi"],
            rows: [
              ["”Myynti tässä kuussa”", "Paljonko salonki on myynyt tässä kuussa", "Katso ”Suosituimmat palvelut” ja selvitä, mikä palvelu on laskenut"],
              ["”Varaukset tässä kuussa”", "Montako varausta asiakkaat ovat tehneet", "Katso ”Seuraavat 7 päivää” ja etsi täytettäviä tyhjiä päiviä"],
              ["”Uudet asiakkaat”", "Löytävätkö uudet ihmiset salongin", "Tarkista kanavat, joiden kautta varauslinkki tavoittaa uusia ihmisiä"],
              ["”Keskiarvo”", "Montako tähteä asiakkaat antavat", "Lue tuoreet arvostelut ja vastaa asiakkaille"],
            ],
          },
        },
        { img: { src: shot("uudet-asiakkaat-ja-keskiarvo"), alt: "Kortit Uudet asiakkaat arvolla 4 ja Keskiarvo arvolla 5.0 kahdesta arvostelusta korostettuna kultaisella, kummassakin vertailurivi viime kuuhun", caption: "Keskiarvokortin alla näkyvät myös sivun katselut 30 päivän ajalta." } },
        { p: "Taulukon kolmas sarake on tämän artikkelin ehdotus, ei ohjelman automaattinen kehotus. Pääasia on, ettei yhtä lukua lueta yksinään. Jos myynti laskee mutta varaukset pysyvät ennallaan, kyse on hinnoista ja palvelujen jakaumasta. Jos molemmat laskevat, kyse on asiakasmäärästä." },
        { p: "Jos haluat jakaa myynnin tekijöittäin, lue ohje [myynnin seurannasta työntekijöittäin](lesson:doanh-thu-nhan-vien). Kun kirjanpitäjä tarvitsee luvut taulukkona, katso [Excel-viennit](lesson:xuat-excel). Arvostelujen hyväksymisestä ja niihin vastaamisesta kerrotaan ohjeessa [arvostelut ja Google](lesson:danh-gia-google)." },
      ],
    },
    {
      id: "tanaan-ja-huomio",
      title: "”Tämän päivän varaukset” ja ”Vaatii huomiota”: työpäivän kaksi osiota",
      blocks: [
        { p: "”Tämän päivän varaukset” listaa asiakkaat kellonajan mukaan. Jokaisella rivillä ovat alkamis- ja päättymisaika, asiakkaan nimi, palvelu ja tekijä. Kun luet listan päivän alussa, tiedät, mitkä tunnit ovat tiukkoja, mitkä vapaita ja kenen pitää valmistella mitäkin. Tarkemmin näet painamalla ”Näytä kaikki” tai avaamalla kalenterin, jossa [näet varaukset tekijöittäin ja lisäät puhelinvaraukset](lesson:lich-hen)." },
        { img: { src: shot("taman-paivan-varaukset"), alt: "Tämän päivän varaukset -otsikko korostettuna kultaisella, alla teksti Ei varauksia tänään, kehotus jakaa varauslinkki ja Kopioi varauslinkki -painike", caption: "Kun päivälle ei ole varauksia, osio kehottaa jakamaan varauslinkin." } },
        { p: "”Vaatii huomiota” on tehtävälaatikkosi. Se muistuttaa odottavista asioista, kuten lukemattomista viesteistä tai käsiteltävistä tilauksista, ja videossa myös aktivoimattomista lahjakorteista. Kun mikään ei odota, osio kertoo kaiken olevan kunnossa. Yön yli vastaamatta jäänyt hintakysely on aamulla usein asiakas, joka on jo varannut muualta, joten hoida tämä osio ennen muuta. Jos viestejä kertyy paljon, ohje [viesteistä ja tekoälyavustajasta](lesson:tin-nhan-ai) näyttää, miten tekoäly vastaa puolestasi, kun kädet ovat kiinni työssä." },
        { img: { src: shot("vaatii-huomiota-lukemattomat-viestit"), alt: "Vaatii huomiota -osio korostettuna kultaisella: lukemattomat viestit, käsiteltävät tilaukset ja aktivoimattomat lahjakortit lukuineen, alla Seuraavat 7 päivää" } },
      ],
    },
    {
      id: "kehitys",
      title: "Seuraavat 7 päivää, kuuden kuukauden myynti ja salongin suosituimmat palvelut",
      blocks: [
        { p: "Sivun alaosa vastaa kysymyksiin, jotka ulottuvat yhtä päivää pidemmälle. Jokainen kaavio liittyy konkreettiseen päätökseen." },
        { h3: "”Seuraavat 7 päivää”" },
        { p: "Pylväskaavio näyttää, montako varausta tulevan viikon jokaisella päivällä jo on. Korkea pylväs on päivä, jolle tarvitaan tarpeeksi tekijöitä. Matala pylväs on päivä, jolla on tilaa, ja ehdit vielä täyttää sen julkaisulla tai kanta-asiakkaille lähetetyllä [tarjoussähköpostilla](lesson:email-marketing)." },
        { h3: "”Myynti, 6 kk”" },
        { img: { src: shot("myynti-6-kk-kaavio"), alt: "Myynti, 6 kk -pylväskaavio kesäkuusta marraskuuhun, jossa vain marraskuulla on myyntiä 295 euroa, alla Varausten toteutuminen (90 pv)", caption: "Kuusi pylvästä viimeiselle kuudelle kuukaudelle. Videon esimerkkisalongilla on lukuja vain viimeiseltä kuulta." } },
        { p: "Kauneusala on kausiluonteinen: juhlien alla asiakkaita tulee ovista ja ikkunoista, toisina kuukausina on hiljaista. Kun katsot kuutta kuukautta vierekkäin, erotat kauden takia heikon kuukauden jatkuvasta laskusta, ja ne vaativat eri toimet." },
        { h3: "”Suosituimmat palvelut”" },
        { img: { src: shot("suosituimmat-palvelut"), alt: "Suosituimmat palvelut -lista: Gel manicure 90 euroa ja 2 varausta, Classic lashes 80 euroa, Relax massage 70 euroa ja Gel pedicure 55 euroa värillisine palkkeineen", caption: "Jokaisen palvelun kohdalla näkyvät sen tuoma myynti ja varausten määrä tässä kuussa." } },
        { p: "Listalta näet, paljonko kukin palvelu toi myyntiä ja montako varausta sillä oli tässä kuussa. Kärjessä oleva palvelu kuuluu [palveluvalikon](lesson:dich-vu) alkuun, koska sitä asiakkaat etsivät eniten. Palvelu, joka on kuukaudesta toiseen listan hännillä, ansaitsee uuden katseen nimeen, hintaan tai kestoon." },
      ],
    },
    {
      id: "qr-skannaukset",
      title: "Hinnaston ja julisteiden QR-koodien skannaukset",
      blocks: [
        { p: "Yleiskatsaus laskee myös hinnastoon ja julisteisiin tulostettujen QR-koodien skannaukset 30 päivän ajalta. Luku kertoo, tekeekö oveen teipattu paperi oikeasti työtä." },
        { p: "Jos olet juuri kiinnittänyt [”Skannaa ja varaa” -QR-julisteen](lesson:poster-qr) tai tulostanut [QR-koodillisen hinnaston](lesson:bang-gia), merkitse päivämäärä muistiin ja katso skannaukset muutaman viikon päästä. Jos skannauksia on vähän, kokeile julisteelle toista paikkaa ennen kuin päättelet, etteivät asiakkaat käytä koodia." },
      ],
    },
    {
      id: "rytmi",
      title: "Myynnin seuranta päivittäin, viikoittain ja kuukausittain",
      blocks: [
        { p: "Lukuja täynnä olevasta sivusta on hyötyä vain, kun tiedät, milloin katsot mitäkin osaa. Alla oleva rytmi on tämän artikkelin ehdotus, sovita se oman salonkisi tahtiin:" },
        {
          table: {
            head: ["Milloin", "Mikä osa", "Mihin"],
            rows: [
              ["Joka aamu", "Tämän päivän osio, ”Tämän päivän varaukset”, ”Vaatii huomiota”", "Päivään valmistautuminen ja odottaviin asioihin vastaaminen"],
              ["Viikon alussa", "”Seuraavat 7 päivää”", "Työvuorojen suunnittelu ja hiljaisten päivien täyttäminen"],
              ["Kuun lopussa", "Kuukauden neljä lukua, ”Myynti, 6 kk”, ”Suosituimmat palvelut”", "Kuukauden arviointi ja palveluvalikon, hintojen ja tarjousten säätäminen"],
            ],
          },
        },
        { note: "Älä reagoi yhden päivän lukuihin. Hiljainen päivä voi johtua säästä tai pyhäpäivästä. Odota, että vertailu viime kuuhun ja kuuden kuukauden kaavio kertovat saman, ennen kuin muutat hintoja tai palveluvalikkoa.", kind: "tip", title: "Katso suuntaa, älä yhtä päivää" },
      ],
    },
  ],
  howTo: {
    title: "Näin luet salongin tunnusluvut Yleiskatsaus-sivulta",
    id: "yleiskatsauksen-lukeminen",
    after: "joka-aamu",
    lead: "Viisi vaihetta kulkevat sivun ylälaidasta alas oppituntivideon järjestyksessä.",
    steps: [
      {
        name: "Avaa hallintapaneeli ja lue yläosa",
        text: "Avaa hallintapaneeli, niin ”Yleiskatsaus”-välilehti tulee ensimmäisenä. Ylhäällä ovat tervehdys, päivän varausten määrä, ”Odotettu myynti tänään” ja ”Seuraava” aikoineen, asiakkaineen ja palveluineen. Sana ”odotettu” muistuttaa, että luku on päivän arvio eikä jo kassaan tullutta rahaa.",
        image: { src: shot("odotettu-myynti-tanaan-ja-seuraava"), alt: "Yleiskatsauksen yläosa, jossa Odotettu myynti tänään -kortti ja Seuraava-kortti tekstillä Ei enää varauksia tänään on korostettu kultaisella" },
      },
      {
        name: "Käytä painikkeita ”Avaa kalenteri”, ”Näytä salonkisivu” ja ”Kopioi varauslinkki”",
        text: "Painikkeet ovat oikoteitä yleisimpiin töihin. ”Avaa kalenteri” vie varauksiin. ”Näytä salonkisivu” avaa sivun, jonka asiakkaat näkevät. ”Kopioi varauslinkki” kopioi linkin, jonka voit liittää Facebookiin, Instagramiin tai viestiin, niin asiakkaat varaavat itse. Vieressä on myös ”Viestit”-painike.",
        image: { src: shot("avaa-kalenteri-nayta-salonkisivu-kopioi-varauslinkki"), alt: "Iltapäivän tervehdys Yleiskatsauksessa ja kultaisella korostetut painikkeet Avaa kalenteri, Viestit, Näytä salonkisivu ja Kopioi varauslinkki" },
      },
      {
        name: "Katso kuukauden neljä lukua",
        text: "Vieritä hieman alas, niin näet neljä korttia: myynti, varaukset, uudet asiakkaat ja keskiarvo. Lue myös jokaisen alla oleva rivi ”vs. sama jakso viime kuussa”, koska luku merkitsee jotain vasta, kun sitä verrataan johonkin.",
        image: { src: shot("myynti-ja-varaukset-tassa-kuussa"), alt: "Kortit Myynti tässä kuussa 295 euroa ja Varaukset tässä kuussa 5 korostettuna kultaisella, kummassakin vertailurivi viime kuuhun" },
      },
      {
        name: "Lue ”Tämän päivän varaukset” ja ”Vaatii huomiota”",
        text: "”Tämän päivän varaukset” listaa asiakkaat kellonajan mukaan. ”Vaatii huomiota” muistuttaa odottavista asioista, kuten lukemattomista viesteistä tai käsiteltävistä tilauksista. Hoida tämä osio ennen työpäivän alkua, jottei kukaan asiakas jää odottamaan vastausta.",
      },
      {
        name: "Vieritä kohtiin ”Seuraavat 7 päivää”, ”Myynti, 6 kk” ja ”Suosituimmat palvelut”",
        text: "Kolme viimeistä osaa näyttävät suunnan: kuinka täynnä ensi viikko jo on, onko myynti noussut vai laskenut kuudessa kuukaudessa ja mitkä palvelut tuovat eniten. Niitä ei tarvitse katsoa joka päivä. Kerran viikossa riittää, jotta ehdit reagoida ajoissa.",
        image: { src: shot("seuraavat-7-paivaa-kaavio"), alt: "Seuraavat 7 päivää -otsikko korostettuna kultaisella, alla viikonpäivien pylväät ilman varauksia ja Myynti, 6 kk -osion alku" },
      },
    ],
  },
  faq: [
    {
      q: "Mitä VaraaAin Yleiskatsaus-sivulla näkyy?",
      a: "Päivän varausten määrä, odotettu myynti tänään, seuraava varaus, kuukauden neljä lukua, tämän päivän varaukset ja huomiota vaativat asiat. Alempana ovat seuraavat 7 päivää, kuuden kuukauden myyntikaavio ja kuukauden suosituimmat palvelut.",
    },
    {
      q: "Mihin kuukauden neljää lukua verrataan?",
      a: "Viime kuun samaan jaksoon. Myynnin, varausten, uusien asiakkaiden ja keskiarvon korteissa on jokaisessa rivi ”vs. sama jakso viime kuussa”, joten tiedät, onko suunta ylös vai alas.",
    },
    {
      q: "Mistä ”Vaatii huomiota” muistuttaa?",
      a: "Asioista, jotka odottavat sinua, kuten lukemattomista viesteistä tai käsiteltävistä tilauksista. Kun mikään ei odota, osio kertoo kaiken olevan kunnossa.",
    },
    {
      q: "Millä painikkeella saan varauslinkin nopeasti asiakkaille?",
      a: "Paina Yleiskatsauksen yläosassa ”Kopioi varauslinkki”. Liitä linkki sitten Facebookiin, Instagramiin tai viestiin, niin asiakkaat varaavat itse.",
    },
    {
      q: "Mistä näen salongin myydyimmät palvelut?",
      a: "Vieritä Yleiskatsauksen loppuun kohtaan ”Suosituimmat palvelut”. Palvelut on järjestetty kuukauden myynnin mukaan, ja jokaisen kohdalla näkyy varausten määrä.",
    },
    {
      q: "Miten tiedän, montako ihmistä on skannannut julisteen ja hinnaston QR-koodin?",
      a: "Yleiskatsaus laskee hinnastoon ja julisteisiin tulostettujen QR-koodien skannaukset 30 päivän ajalta. Luvusta näet, käytetäänkö tulostettuja materiaaleja.",
    },
  ],
  related: ["chi-nhanh", "doanh-thu-nhan-vien", "xuat-excel", "lich-hen"],
};

export default article;
