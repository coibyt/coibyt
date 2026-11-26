import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/thanh-toan-chinh-sach/${name}.webp`;
const shot = (name: string) => `/wiki/thanh-toan-chinh-sach/fi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "salongin-peruutusehdot-tilisiirto-ja-laskutustiedot",
  lesson: "thanh-toan-chinh-sach",
  category: "salon",
  title: "Salongin peruutusehdot: aseta peruutusaika, ota vastaan tilisiirtoja ja täytä laskutustiedot",
  metaTitle: "Salongin peruutusehdot: peruutusaika, tilisiirto, laskut",
  metaDescription:
    "Näin asetat salongin peruutusehdot VaraaAissa: valitse peruutusaika, kirjoita lyhyt peruutuskäytäntö, lisää pankkitiedot ja laskulle tarvittavat tiedot.",
  keyword: "salongin peruutusehdot",
  keywords: [
    "peruutusaika ajanvaraukselle",
    "käyttämättä jääneen ajan maksu",
    "kauneushoitolan peruutusehdot esimerkki",
    "tilisiirto salongille varauksen yhteydessä",
    "salongin laskutustiedot Y-tunnus ja ALV",
    "myöhäinen peruutus kampaamossa",
    "salongin maksuasetukset",
  ],
  excerpt: "Kolme pientä työtä ”Asetukset”-sivulla säästää salonkia monelta harmilta: peruutusaika, tilisiirtotiedot ja laskulle tarvittavat tiedot.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("chu-salon-kiem-tra-cai-dat-tren-may-tinh-bang"),
    alt: "Kiharatukkainen salonkiyrittäjä luumunvärisessä silkkipaidassa pitää tablettia marmoritiskin vieressä kristallikruunuin valaistussa salongissa",
  },
  takeaways: [
    "**”Asiakas voi perua viimeistään”** on peruutusaika: sen jälkeen asiakas ei voi enää perua itse verkossa, vaan vain salonki voi.",
    "**”Peruutuskäytäntö”** on teksti, jonka asiakas lukee heti varauksen jälkeen ja vahvistussähköpostissa.",
    "Lisää pankkitiedot, niin asiakas näkee varatessaan, mihin hän voi **maksaa tilisiirrolla suoraan salongille**.",
    "**”Laskutustiedot”** pitää täyttää kokonaan, ennen kuin voit tehdä laskuja kassalla.",
    "Jokaisella kolmesta osasta on oma tallennuspainike. Tallenna kukin osa, kun saat sen valmiiksi.",
  ],
  intro: [
    "Selkeästi kirjoitetut salongin peruutusehdot eivät karkota asiakkaita. Ne tekevät päinvastoin: asiakas tietää etukäteen, kuinka myöhään hän voi perua, eikä salongin tarvitse väitellä aina, kun joku peruu viime hetkellä. Harmia aiheuttaa sääntö, josta kuullaan vasta jälkikäteen.",
    "Tämä artikkeli seuraa VaraaAi Academyn oppituntia ”Maksut, peruutusehdot ja laskutustiedot”. Opit asettamaan peruutusajan, kirjoittamaan muutaman rivin peruutuskäytännön, lisäämään tilin, jolle asiakas voi maksaa, ja täyttämään laskulle tarvittavat tiedot, kaikki samalla ”Asetukset”-sivulla.",
  ],
  sections: [
    {
      id: "miksi-peruutusehdot",
      title: "Miksi salonki tarvitsee kirjoitetut peruutusehdot",
      blocks: [
        { p: "Tekijän työtuntia ei voi varastoida ja myydä myöhemmin. Jos asiakas peruu päivää aiemmin, salonki ehtii vielä täyttää ajan. Jos hän peruu kymmenen minuuttia ennen tai ei vain tule paikalle, tunti on menetetty. Pitkissä palveluissa, kuten ripsienpidennyksissä tai hiusvärjäyksessä, yksi käyttämättä jäänyt aika voi viedä tekijältä puoli päivää." },
        { p: "Peruutusaika ratkaisee suurimman osan tästä ilman, että kenenkään tarvitsee korottaa ääntään. Asiakas näkee säännön varatessaan, joten se, jonka pitää siirtää aikaa, tekee sen ajoissa. Ja kun jokainen asiakas lukee saman säännön, et päädy tekemään poikkeuksia yhdelle mutta et toiselle." },
        { p: "Oppitunnin kaksi muuta osaa ovat myös kerran tehtäviä töitä. Kun pankkitiedot ovat paikallaan, asiakkaan ei tarvitse kysyä tilinumeroa viestillä. Kun laskutustiedot ovat paikallaan, voit tehdä laskun kassalla heti, kun asiakas pyytää sitä." },
      ],
    },
    {
      id: "peruutusaika-ja-kaytanto",
      title: "Peruutusaika ja peruutuskäytäntö: kaksi eri asiaa",
      blocks: [
        { p: "Kohdassa ”Salongin asetukset” on kaksi riviä aivan vierekkäin, ja ne on helppo luulla yhdeksi. Ne tekevät aivan eri työn:" },
        {
          table: {
            head: ["Rivi", "Mikä se on", "Mitä se tekee"],
            rows: [
              ["”Asiakas voi perua viimeistään”", "Valitsemasi määräaika, esimerkiksi 24 tuntia ennen varausta", "Määräajan jälkeen asiakas ei voi enää perua itse verkossa. Vain salonki voi perua hallintapaneelista"],
              ["”Peruutuskäytäntö”", "Lyhyt teksti, jonka kirjoitat itse", "Asiakas lukee sen heti varauksen jälkeen ja vahvistussähköpostissa"],
            ],
          },
        },
        { p: "Yksinkertaisesti sanottuna ylempi rivi on lukko ja alempi kyltti, joka selittää lukon. Määräajan varaussivu valvoo puolestasi. Peruutuskäytäntö taas on salongin viesti asiakkaalle, esimerkiksi siitä, veloitetaanko myöhäisistä peruutuksista." },
        { note: "Kummankin rivin pitää kertoa sama luku. Jos valitset 24 tuntia, myös tekstissä pitää lukea 24 tuntia. Aina kun muutat peruutusaikaa, lue alla oleva teksti uudelleen ja korjaa se vastaamaan uutta aikaa.", kind: "tip", title: "Pidä ne samassa tahdissa" },
      ],
    },
    {
      id: "peruutuskaytannon-kirjoittaminen",
      title: "Lyhyt peruutuskäytäntö, jonka asiakas ymmärtää heti",
      blocks: [
        { p: "Oppitunti neuvoo kirjoittamaan salongin säännöt muutamalla rivillä, esimerkiksi että myöhäisistä peruutuksista ja saapumatta jättämisistä veloitetaan. Toimiva peruutuskäytäntö vastaa kahteen kysymykseen: mihin asti asiakas voi perua tai siirtää ajan maksutta, ja mitä sen jälkeen tapahtuu." },
        { p: "Oppituntivideon esimerkkisalonki kirjoittaa: ”Voit perua tai siirtää aikasi maksutta viimeistään 24 tuntia ennen varausta.” Sen jälkeen kerrotaan, että myöhemmistä perumisista ja käyttämättä jääneistä ajoista salonki voi veloittaa 50 % palvelun hinnasta. Voit käyttää samaa kahden lauseen rakennetta ja vaihtaa luvut salonkisi päätösten mukaisiksi." },
        {
          ul: [
            "**Kirjoita myönteisesti ja kohteliaasti.** Asiakas lukee tekstin juuri varattuaan, kun hänellä on salongista hyvä mieli.",
            "**Kerro täsmällinen luku.** ”Peru ajoissa” tarkoittaa jokaiselle eri asiaa, ”24 tuntia ennen varausta” voi lukea vain yhdellä tavalla.",
            "**Kirjoita vain se, mitä salonki todella tekee.** Vakioasiakkaat huomaavat pian säännön, jota ei koskaan noudateta.",
          ],
        },
        { note: "Myöhäisen peruutuksen maksun suuruus on jokaisen salongin oma päätös, ja kuluttajilta perittäviä maksuja koskevat säännöt vaihtelevat maittain. Ennen kuin kirjoitat maksun ehtoihin, selvitä salonkisi toimintamaan säännöt.", kind: "warn", title: "Myöhäisen peruutuksen maksusta" },
      ],
    },
    {
      id: "tilisiirrot",
      title: "Tilisiirtojen vastaanottaminen salongille",
      blocks: [
        { p: "Laatikko ”Vastaanota maksuja tilisiirrolla” on osiossa ”Maksut ja laskutus”. Sen alla kerrotaan, että asiakkaat näkevät nämä tiedot voidakseen siirtää rahaa suoraan salongillesi varatessaan. Raha kulkee suoraan asiakkaan tililtä salongin tilille." },
        { img: { src: shot("vastaanota-maksuja-tilisiirrolla"), alt: "Vastaanota maksuja tilisiirrolla -laatikko, jossa ovat kentät Pankin nimi, Tilinumero, Tilinhaltijan nimi ja valinnainen BIC/SWIFT-koodi", caption: "Otsikon alla oleva rivi kertoo, että asiakas näkee nämä tiedot varatessaan." } },
        { p: "Täytettäviä kenttiä on kolme: ”Pankin nimi”, ”Tilinumero” ja ”Tilinhaltijan nimi”. Videolla näkyy myös ”BIC/SWIFT-koodi”, joka on merkitty valinnaiseksi. Kopioi tilinumero pankkisovelluksesta äläkä kirjoita sitä muistinvaraisesti, ja kirjoita tilinhaltijan nimi täsmälleen niin kuin se on pankissa. Yhden väärän numeron takia väärälle tilille mennyt maksu vie aikaa molemmilta." },
        { p: "Tästä on erityisesti hyötyä, jos perit [käsirahaa joistakin palveluista](lesson:dich-vu), sillä asiakkaalla on silloin heti paikka, johon maksaa." },
      ],
    },
    {
      id: "laskutustiedot",
      title: "Salongin laskutustiedot: Y-tunnus ja ALV",
      blocks: [
        { p: "Viimeinen laatikko on ”Laskutustiedot”. Sen ohje on selvä: täytä nämä tiedot ennen kuin voit luoda laskun ”Maksu kassalla” -toiminnolla. Yrityksen nimi, osoite, Y-tunnus ja ALV tulostuvat laskulle." },
        {
          table: {
            head: ["Kenttä", "Mitä kirjoitat"],
            rows: [
              ["”Yrityksen nimi”", "Yrityksen virallinen nimi, joka voi poiketa kyltin nimestä"],
              ["”Yrityksen osoite”", "Yrityksen rekisteröity osoite"],
              ["”Y-tunnus / verotunnus”", "Täsmälleen niin kuin se on yrityksen rekisteröintitiedoissa"],
              ["”ALV (%)”", "Salonkisi palveluihin sovellettava arvonlisäverokanta"],
            ],
          },
        },
        { p: "Jos et ole varma Y-tunnuksesta tai ALV-kannasta, kysy kirjanpitäjältäsi ennen tallennusta, koska nämä luvut näkyvät jokaisessa laskussa. Laskun tekeminen kullekin asiakkaalle käydään läpi ohjeessa [maksu ja lasku kassalla](lesson:thanh-toan-hoa-don)." },
      ],
    },
    {
      id: "tavallisia-tilanteita",
      title: "Tavallisia tilanteita: myöhäiset peruutukset ja muut kysymykset",
      blocks: [
        {
          table: {
            head: ["Tilanne", "Mitä teet"],
            rows: [
              ["Asiakas haluaa perua määräajan jälkeen", "Hän ei voi enää perua verkossa. Hän ottaa yhteyttä salonkiin, ja sinä perut ajan hallintapaneelista, jos suostut"],
              ["Asiakas kysyy, missä peruutusehdot ovat", "Näytöllä heti varauksen jälkeen ja hänen saamassaan vahvistussähköpostissa"],
              ["Asiakas kysyy, mille tilille maksaa", "Salongin pankkitiedot näkyvät hänelle varatessa"],
              ["Laskua ei voi tehdä kassalla", "Tarkista, että ”Laskutustiedot”-laatikon kaikki neljä kenttää on täytetty ja että painoit ”Tallenna laskutustiedot”"],
            ],
          },
        },
        { p: "Asiakkaan puolella määräajan sisällä peruminen tehdään kohdassa ”Varaukseni”, kuten ohjeessa [ajanvarauksen peruminen](lesson:lich-hen-cua-toi) kerrotaan. Salongin puolella käsittelet jokaisen varauksen hallintapaneelin [ajanvarauskalenterissa](lesson:lich-hen)." },
      ],
    },
  ],
  howTo: {
    title: "Salongin peruutusehdot, tilisiirrot ja laskutustiedot VaraaAissa vaihe vaiheelta",
    id: "asetusten-vaiheet",
    after: "peruutusaika-ja-kaytanto",
    lead: "Kahdeksan vaihetta etenevät ”Asetukset”-sivun ylhäältä alas: neljä peruutusehdoille, kaksi tilisiirroille ja kaksi laskuille.",
    steps: [
      {
        name: "Avaa ”Asetukset” ja etsi ”Salongin asetukset”",
        text: "Avaa hallintapaneelissa ”Asetukset” ja vieritä osioon ”Varaukset ja ehdot”, jossa on laatikko ”Salongin asetukset”. Siinä ovat salongin oletuskieli, oletusvaluutta, peruutusaika ja peruutuskäytäntö.",
        image: { src: shot("salongin-asetukset-peruutusaika"), alt: "Asetusten Varaukset ja ehdot -osio, jossa Salongin asetukset -otsikko on korostettu ja alla ovat Oletuskieli, Oletusvaluutta ja peruutusaika" },
      },
      {
        name: "Valitse määräaika kohdassa ”Asiakas voi perua viimeistään”",
        text: "Avaa lista kohdassa ”Asiakas voi perua viimeistään” ja valitse määräaika, esimerkiksi 24 tuntia ennen. Sen jälkeen asiakas ei voi enää perua itse verkossa. Valitse aika, joka jättää salongille aikaa täyttää vapautunut aika.",
        image: { src: shot("asiakas-voi-perua-viimeistaan-24-tuntia"), alt: "Rivi Asiakas voi perua viimeistään, jossa on valittuna 24 tuntia ennen, korostettuna kultaisella Salongin asetukset -laatikossa" },
      },
      {
        name: "Kirjoita ”Peruutuskäytäntö”",
        text: "Heti alla on kenttä ”Peruutuskäytäntö”. Kirjoita salonkisi säännöt muutamalla rivillä, esimerkiksi että myöhäisistä peruutuksista ja saapumatta jättämisistä veloitetaan. Asiakas näkee tekstin heti varauksen jälkeen ja vahvistussähköpostissa.",
        image: { src: shot("peruutuskaytanto-kentta"), alt: "Peruutuskäytäntö-kenttä korostettuna kultaisella, sisällä teksti maksuttomasta perumisesta tai siirrosta viimeistään 24 tuntia ennen varausta" },
      },
      {
        name: "Paina ”Tallenna”",
        text: "Paina kentän alla olevaa ”Tallenna”-painiketta. Se tallentaa sekä peruutusajan että kirjoittamasi peruutuskäytännön.",
        image: { src: shot("tallenna-peruutuskaytanto"), alt: "Peruutuskäytäntö-kentän alla oleva musta Tallenna-painike korostettuna kultaisella" },
      },
      {
        name: "Täytä ”Vastaanota maksuja tilisiirrolla”",
        text: "Vieritä osioon ”Maksut ja laskutus”. Kirjoita laatikkoon ”Vastaanota maksuja tilisiirrolla” ”Pankin nimi”, ”Tilinumero” ja ”Tilinhaltijan nimi”. Tarkista tilinumero numero numerolta ennen kuin jatkat.",
        image: { src: shot("pankin-nimi-tilinumero-tilinhaltija"), alt: "Kentät Pankin nimi, Tilinumero ja Tilinhaltijan nimi korostettuna kultaisella Vastaanota maksuja tilisiirrolla -laatikossa" },
      },
      {
        name: "Paina ”Tallenna pankkitiedot”",
        text: "Paina ”Tallenna pankkitiedot”. Tästä lähtien asiakas näkee salongin tilisiirtotiedot varatessaan.",
        image: { src: shot("tallenna-pankkitiedot"), alt: "Tallenna pankkitiedot -painike korostettuna kultaisella, alla Laskutustiedot-laatikko ja Yrityksen nimi -kenttä" },
      },
      {
        name: "Täytä ”Laskutustiedot”",
        text: "Kirjoita kohtaan ”Laskutustiedot” ”Yrityksen nimi”, ”Yrityksen osoite”, ”Y-tunnus / verotunnus” ja ”ALV (%)”. Kaikki neljä pitää olla täytetty, ennen kuin voit tehdä laskuja kassalla.",
        image: { src: shot("laskutustiedot-y-tunnus-alv"), alt: "Laskutustiedot-laatikko, jossa kentät Yrityksen nimi, Yrityksen osoite, Y-tunnus / verotunnus ja ALV (%) on korostettu kultaisella" },
      },
      {
        name: "Paina ”Tallenna laskutustiedot”",
        text: "Paina ”Tallenna laskutustiedot”, ja valmista tuli. Nämä tiedot tulostuvat salongin laskuille.",
        image: { src: shot("tallenna-laskutustiedot"), alt: "Tallenna laskutustiedot -painike Y-tunnus- ja ALV-kenttien alla, sen alla Ilmoitukset työntekijöille -osio" },
      },
    ],
  },
  faq: [
    {
      q: "Mitä tarkoittaa ”Asiakas voi perua viimeistään 24 tuntia ennen”?",
      a: "Asiakas voi perua ajan itse verkossa 24 tuntiin asti ennen varausta. Määräajan jälkeen hän ei voi enää perua itse, ja vain salonki voi perua ajan hallintapaneelista.",
    },
    {
      q: "Missä asiakas näkee salongin peruutusehdot?",
      a: "Asiakas näkee ”Peruutuskäytäntö”-kentän tekstin heti varauksen jälkeen ja vahvistussähköpostissa. Siksi tekstin kannattaa olla niin lyhyt, että sen ymmärtää yhdellä lukemalla.",
    },
    {
      q: "Mitä kynsistudion tai kampaamon peruutusehdoissa pitäisi lukea?",
      a: "Kaksi asiaa: mihin asti asiakas voi perua tai siirtää ajan maksutta ja mitä sen jälkeen tai saapumatta jättämisestä seuraa, esimerkiksi veloitetaanko maksu. Ehdoissa olevan luvun pitää vastata kohdassa ”Asiakas voi perua viimeistään” valitsemaasi aikaa.",
    },
    {
      q: "Milloin asiakas näkee salongin tilisiirtotiedot?",
      a: "Varatessaan. Kun olet kirjoittanut pankin nimen, tilinumeron ja tilinhaltijan nimen ja painanut ”Tallenna pankkitiedot”, asiakas näkee ne ja voi maksaa tilisiirrolla suoraan salongille.",
    },
    {
      q: "Miksi ”Laskutustiedot” pitää täyttää?",
      a: "Koska laskuja voi tehdä kassalla vasta, kun nämä tiedot ovat täydelliset. Yrityksen nimi, osoite, Y-tunnus ja ALV-prosentti tulostuvat laskulle.",
    },
    {
      q: "Mitä teen, jos asiakas haluaa perua määräajan jälkeen?",
      a: "Hän ei voi enää perua itse verkossa, joten hänen pitää ottaa yhteyttä salonkiin. Salonki voi silti perua ajan hallintapaneelista, ja se, peritäänkö maksu, ratkeaa julkaisemiesi peruutusehtojen mukaan.",
    },
  ],
  related: ["gio-mo-cua", "dich-vu", "thanh-toan-hoa-don", "lich-hen"],
};

export default article;
