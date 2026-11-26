import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/lash-lift-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "mika-on-ripsien-kestotaivutus",
  lesson: "lash-lift-hieu-dung",
  category: "lash",
  title: "Mikä on ripsien kestotaivutus? Kesto, vahingoittaako se ripsiä ja mitä värjäyksestä on tiedettävä",
  metaTitle: "Mikä on ripsien kestotaivutus? Kesto ja turvallisuus",
  metaDescription:
    "Kestotaivutus taivuttaa omat ripset silikonimuotilla ja kahdella aineella. Kenelle se sopii, muotin valinta, miksi ylikäsittely kähertää ripset ja allergiatesti.",
  keyword: "ripsien kestotaivutus",
  keywords: [
    "kauanko ripsien kestotaivutus kestää",
    "vahingoittaako kestotaivutus ripsiä",
    "kestotaivutus ja ripsien värjäys",
    "lash lift",
    "allergiatesti ennen ripsien värjäystä",
    "silikonimuotit kestotaivutukseen",
    "kestotaivutuksen jälkihoito",
  ],
  excerpt: "Kestotaivutus ei lisää yhtään ripseä, vaan taivuttaa omat ripset. Miten aineet ja muotti toimivat, kenelle se sopii, miksi ripset kähertyvät ja mitä värjäys vaatii.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-mi-chon-khuon-silicone-uon-mi-ben-cua-so"),
    alt: "Ripsistylisti korkealla nutturalla, kermanvärisessä paidassa ja mustissa käsineissä istuu studion ikkunan ääressä ja nostaa vaaleanpunaisen silikonimuotin katsottavaksi, pöydällä muottirasia",
  },
  takeaways: [
    "Ripsien kestotaivutus **ei lisää ripsiä**: omat ripset kammataan silikonimuotin päälle, ensimmäinen aine pehmentää ne ja toinen kiinnittää taivutuksen.",
    "Kaikille sopivaa vaikutusaikaa ei ole. Se riippuu ripsityypistä ja tuotteesta, joten **noudata aina valmistajan taulukkoa**.",
    "Jos haluat enemmän taivutusta, valitse seuraavalla kerralla **hieman pienempi muotti** äläkä pidennä aikaa. Ylikäsittely tekee ripsistä kähärät, hauraat ja katkeilevat, eikä sitä voi korjata heti.",
    "Värjää vain ripsille ja kulmille tarkoitetuilla tuotteilla. Monet valmistajat edellyttävät **allergiatestiä**, usein 48 tuntia ennen käyntiä.",
    "Tuote ei saa koskaan joutua silmään. Tulos kestää yleensä noin **6–8 viikkoa**.",
  ],
  intro: [
    "Ripsien kestotaivutus, jota kutsutaan usein lash liftiksi, taivuttaa asiakkaan omat ripset lisäämättä yhtään pidennystä, ja siihen yhdistetään yleensä ripsien värjäys, jotta ripset näyttävät tummemmilta. Lopputulos on pehmeä ja luonnollinen. Ripsistylisti käyttää kuitenkin kemikaaleja aivan silmän vieressä, ja ne vaikuttavat suoraan omaan ripseen, joten hoidon jokainen osa on ymmärrettävä kunnolla.",
    "Artikkeli perustuu VaraaAi Academyn Ripset-kurssin oppituntiin ”Ripsien kestotaivutus ja värjäys: ymmärrä ne, niin taivutus on kaunis ja turvallinen”. Luettuasi osaat vastata asiakkaiden yleisimpiin kysymyksiin: kauanko kestotaivutus kestää, vahingoittaako se ripsiä, kenelle se sopii ja miksi ennen värjäystä tehdään allergiatesti. Vaikutusaikoja artikkelissa ei anneta, koska ne kuuluvat käyttämällesi tuotteelle.",
  ],
  sections: [
    {
      id: "miten-kestotaivutus-toimii",
      title: "Mikä ripsien kestotaivutus on ja miten se toimii",
      blocks: [
        { p: "Toisin kuin pidennykset, kestotaivutus tehdään omaan ripseen. Yksinkertaisesti sanottuna taivutuksessa on kolme osaa:" },
        {
          ol: [
            "Ripset kammataan suoraan ylös pienen, luomeen kiinnitetyn **silikonimuotin** päälle.",
            "**Ensimmäinen aine** eli taivutusaine pehmentää ripsen sisärakenteen, jotta ripsi ottaa muotin uuden muodon.",
            "**Toinen aine** eli kiinnitysaine lukitsee muodon.",
          ],
        },
        { p: "Kun ripset irrotetaan muotista, ne säilyttävät taivutuksen. Koska aineet vaikuttavat ripsen rakenteeseen, jokainen virhe ajassa tai muotin koossa näkyy asiakkaan omissa ripsissä." },
        { img: { src: img("mi-that-chai-len-khuon-silicone-khi-uon-mi"), alt: "Lähikuva suljetusta silmästä, omat ripset kammattu suoraan ylös luomella olevan vaaleanpunaisen silikonimuotin päälle ja valkoinen tyyny peittää alaripset", caption: "Omat ripset silikonimuotilla: ripset ottavat täsmälleen muotin kaaren." } },
        { img: { src: img("ket-qua-uon-mi-lash-lift-mi-cong-tu-nhien"), alt: "Lähikuvamuotokuva vaaleahiuksisesta asiakkaasta silmät auki suoraan eteenpäin katsoen, omat ripset kestotaivutuksen ja värjäyksen jälkeen ylös kaartuvat ja tummemmat", caption: "Kestotaivutuksen ja värjäyksen jälkeen: omat ripset kaartuvat ja ovat tummemmat ilman pidennyksiä." } },
        { p: "Jokainen vaihe muotin kiinnittämisestä ripsien irrottamiseen on artikkelissa [ripsien kestotaivutus ja värjäys vaihe vaiheelta](lesson:lash-lift)." },
      ],
    },
    {
      id: "kenelle-sopii",
      title: "Kenelle kestotaivutus sopii ja milloin sitä ei tehdä",
      blocks: [
        { p: "Kestotaivutus sopii yleensä asiakkaille, joiden omat ripset ovat melko pitkät mutta kasvavat suoraan tai osoittavat alaspäin, jotka eivät halua pidennyksiä tai jotka haluavat vähemmän ylläpitoa. Hyvin lyhyitä ripsiä on vaikea muotoilla kauniisti, ja siitä kannattaa kertoa etukäteen." },
        { p: "Jos asiakkaalla on pidennykset, ne poistetaan ensin, kuten artikkelissa [ripsienpidennysten huoltoväli](lesson:mi-dam-thao-hieu-dung). Ripsiä, joissa on vielä pidennyksiä, ei koskaan taivuteta." },
        { h3: "Milloin ei hoideta" },
        {
          ul: [
            "Silmät ovat punaiset, tulehtuneet tai vetistävät.",
            "Asiakkaalle on hiljattain tehty silmäleikkaus.",
            "Silmänympärysiho on ärtynyt.",
            "Asiakas on reagoinut taivutus- tai väriaineisiin aiemmin.",
          ],
        },
        { p: "Koko luettelo on artikkelissa [kauneudenhoidon vasta-aiheet](lesson:khi-nao-khong-lam). Jos epäilet, älä tee, ja neuvo asiakasta kysymään lääkäriltä." },
      ],
    },
    {
      id: "muotit-ja-vaikutusaika",
      title: "Silikonimuotin valinta ja vaikutusaika",
      blocks: [
        { p: "Muotti valitaan kahden asian mukaan: ripsien pituuden ja asiakkaan toivoman taivutuksen." },
        {
          table: {
            head: ["Tilanne", "Muotti"],
            rows: [
              ["Lyhyet ripset", "Pieni muotti"],
              ["Pitkät ripset", "Suurempi muotti"],
              ["Sama ripsen pituus, toiveena voimakas taivutus", "Hieman pienempi"],
              ["Sama ripsen pituus, toiveena pehmeä nosto", "Hieman suurempi"],
            ],
          },
        },
        { img: { src: img("ba-co-khuon-silicone-uon-mi-nho-vua-lon"), alt: "Kolme vaaleanpunaista sirpin muotoista silikonimuottia kestotaivutukseen rinnakkain vaaleanpunaisella taustalla, ohuesta pienestä paksuun suureen", caption: "Silikonimuotteja on monessa koossa. Mikä koko sopii millekin ripsen pituudelle, näkyy valmistajan taulukosta." } },
        { p: "Ripsiin nähden liian pieni muotti kiertää ne tiukalle rullalle. Liian suuri nostaa niitä vain vähän, eikä eroa juuri näy." },
        { h3: "Muotin paikka on yhtä tärkeä kuin sen koko" },
        { p: "Muotin on oltava aivan kiinni ripsirajassa. Jos se on liian kaukana ripsirajasta, ripsen tyvi ei nouse, ripseen tulee keskelle taite ja se näyttää todella oudolta." },
        { h3: "Kuinka kauan kukin aine vaikuttaa" },
        { p: "Yhtä lukua kaikille ei ole. Aika riippuu ripsityypistä ja tuotteesta, ja jokaisella valmistajalla on oma aikataulukkonsa. Katso asiakkaan ripsiä tarkasti ennen kuin valitset." },
        {
          table: {
            head: ["Ripsityyppi", "Vaikutusaika"],
            rows: [
              ["Ohuet ripset", "Yleensä lyhyempi"],
              ["Normaalit ripset", "Valmistajan taulukon mukaan"],
              ["Paksut ja karkeat ripset", "Pidempi"],
            ],
          },
        },
      ],
    },
    {
      id: "vahingoittaako-kestotaivutus",
      title: "Vahingoittaako kestotaivutus ripsiä: miksi ripset kähertyvät ja katkeavat",
      blocks: [
        { p: "Tämä on hyvin tavallista: asiakas haluaa voimakkaan taivutuksen, joten ripsistylisti pitää ainetta muutaman minuutin pidempään ”varmuuden vuoksi” tai valitsee liian pienen muotin. Tuloksena ripset ovat ylikihartuneet, kähärät, kuivat ja hauraat, ja osa on katkennut poikki." },
        { img: { src: img("loi-uon-mi-qua-gio-mi-xoan-xu-va-gay"), alt: "Lähikuva suljetusta silmästä, jonka omat ripset ovat kähärät, vinossa, osoittavat eri suuntiin ja osa on taittunut, valkoisen tyynyn päällä", caption: "Esimerkkikuva ylikäsittelystä tai liian pienestä muotista: kähärät, kuivat ja vinot ripset. Tätä ei voi korjata heti." } },
        { p: "Aine vaikuttaa ripsen omaan rakenteeseen, joten ylikäsittely vahingoittaa ripseä. Sitä ei myöskään voi korjata heti: on odotettava, että uusia ripsiä kasvaa. Liian aikaisin tehty uusi taivutus, ennen kuin ripset ovat palautuneet, tekee saman vahingon. Kahden taivutuksen väli noudattaa valmistajan ohjetta." },
        { note: "Jos asiakas haluaa enemmän taivutusta, valitse seuraavalla kerralla hieman pienempi muotti. Älä pidennä vaikutusaikaa.", kind: "tip", title: "Enemmän taivutusta: vaihda muotti, älä lisää minuutteja" },
      ],
    },
    {
      id: "varjays-ja-allergiatesti",
      title: "Ripsien värjäys ja allergiatesti ennen värjäystä",
      blocks: [
        { p: "Ripsi- ja kulmaväri on oma tuotteensa. Käytä vain ripsille ja kulmille tarkoitettua väriä, sekoitettuna täsmälleen valmistajan ohjeen mukaan juuri ennen käyttöä. **Älä koskaan käytä hiusväriä ripsiin.** Valitse sävy asiakkaan kulmien ja hiusten mukaan, jotta tulos näyttää luonnolliselta." },
        { p: "Ripset värjätään yleensä vielä muotilla ollessaan, kiinnitysaineen jälkeen, jos valmistajan ohje on sama." },
        { img: { src: img("nhuom-mi-chi-tren-soi-mi-dang-nam-tren-khuon"), alt: "Pieni sivellin mustaan käsineeseen puetussa kädessä sivelee tummanruskeaa väriä vaaleanpunaisella silikonimuotilla oleviin ripsiin, asiakkaan silmä kiinni", caption: "Väri laitetaan vain ripsiin, ei koskaan iholle." } },
        { h3: "Allergiatesti" },
        { p: "Monet ripsivärien valmistajat edellyttävät allergiatestiä ennen värjäystä, usein **48 tuntia** ennen käyntiä. Laita hieman väriä valmistajan nimeämälle ihoalueelle, usein korvan taakse tai kyynärtaipeeseen, ja odota. Punoitus, kutina, turvotus tai kirvely tarkoittaa, ettei värjätä. Testin tarkka tapa noudattaa tuotetta." },
        { img: { src: img("thu-phan-ung-thuoc-nhuom-mi-o-khuyu-tay"), alt: "Ripsistylisti mustissa käsineissä taputtaa vanupuikolla vähän väriä kermanvärisessä nojatuolissa istuvan asiakkaan käsivarren sisäpuolelle", caption: "Testaa valmistajan nimeämälle ihoalueelle ja kirjaa testin päivä ja tulos." } },
        { note: "EU:ssa ripsivärien pakkauksissa on oltava allergiavaroitukset [asetuksen (EU) 2017/237](https://eur-lex.europa.eu/eli/reg/2017/237/oj/eng) mukaan. Lue pakkausmerkinnät ja ohjeet uudelleen aina, kun vaihdat tuotetta. Allergian oireet ja toimintaohjeet ovat oppitunnilla [Allergiat ja kemikaalit](lesson:di-ung-hoa-chat).", kind: "warn", title: "Ripsiväri voi aiheuttaa allergiaa" },
      ],
    },
    {
      id: "ei-koskaan-silmaan",
      title: "Ehdoton sääntö: tuote ei koskaan joudu silmään",
      blocks: [
        {
          ul: [
            "Asiakkaan silmät ovat kiinni koko hoidon ajan.",
            "Taivutusainetta laitetaan vain ripsien alaosaan, hieman irti ihosta.",
            "Ei luomen iholle, koska iholla aine ärsyttää helposti ja voi valua silmään.",
            "Ei kärkiin asti, koska kärjet ovat ohuet ja vaurioituvat helposti.",
            "Ota hyvin vähän ainetta, jottei se valu.",
          ],
        },
        { note: "Jos tuotetta joutuu silmään, huuhtele heti runsaalla puhtaalla vedellä. Jos silmä on edelleen kipeä, punainen tai näkö sumea, hakeudu heti hoitoon.", kind: "warn", title: "Jos tuotetta joutuu silmään" },
      ],
    },
    {
      id: "kesto-ja-jalkihoito",
      title: "Kauanko ripsien kestotaivutus kestää ja jälkihoito",
      blocks: [
        { p: "Taivutus kestää yleensä noin **6–8 viikkoa** yksilöstä riippuen. Syy on oman ripsen kasvusykli, josta kerrotaan artikkelissa [klassiset ripsienpidennykset](lesson:mi-classic-hieu-dung): vanhat ripset irtoavat ja uudet kasvavat suorina. Tulos kestää siksi suunnilleen yhden kasvusyklin ajan, ja kun uusia ripsiä on paljon, on aika tulla uudelleen." },
        { p: "Taivutuksen jälkeen asiakas pitää ripset kuivina valmistajan suosittaman ajan, usein vuorokauden. Sinä aikana:" },
        {
          ul: [
            "Ei ripsiväriä eli maskaraa.",
            "Ei höyryä eikä saunan löylyä.",
            "Ei silmien hieromista.",
            "Ei nukkumista kasvot tyynyä vasten.",
          ],
        },
        { p: "Sen jälkeen asiakas harjaa ripsensä kevyesti joka päivä." },
        { note: "Kirjaa VaraaAissa [asiakkaan tietojen](lesson:khach-hang) muistiinpanoihin allergiatestin päivä ja tulos, muotin koko, kunkin aineen aika ja värisävy. Ensi kerralla voit toistaa saman tai korjata juuri sen, mikä vaatii korjausta.", kind: "tip", title: "Kirjaa, niin voit toistaa" },
        { p: "Jos salonki ottaa varauksia netissä, tee ”Ripsien kestotaivutus” ja ”Ripsien kestotaivutus ja värjäys” kahdeksi erilliseksi [palveluksi](lesson:dich-vu). Värjäysasiakkaalle tehdään ensin allergiatesti, ja vasta sitten varataan [aika](lesson:lich-hen) kestotaivutukseen." },
        { note: "Vaikutusajat, muottikoot ja allergiatesti noudattavat aina käyttämäsi tuotteen ohjeita. Kauneustuotteita ja -palveluja koskevat säännöt vaihtelevat maittain. Tämä on koulutusmateriaalia, ei ammattipätevyys.", kind: "info", title: "Huomio" },
      ],
    },
  ],
  faq: [
    {
      q: "Kauanko ripsien kestotaivutus kestää?",
      a: "Yleensä noin 6–8 viikkoa yksilöstä riippuen. Omilla ripsillä on kasvusykli: taivutetut ripset irtoavat vähitellen ja uudet kasvavat suorina, joten tulos kestää suunnilleen yhden kasvusyklin ajan. Kun uusia ripsiä on paljon, on aika uudelle taivutukselle, mutta ei valmistajan suositusta aikaisemmin.",
    },
    {
      q: "Vahingoittaako kestotaivutus omia ripsiä?",
      a: "Taivutusaine vaikuttaa ripsen rakenteeseen, joten ripset vahingoittuvat, kun ainetta pidetään liian kauan, muotti on liian pieni tai taivutus uusitaan liian pian: ripsistä tulee ylikihartuneet, kähärät, kuivat, hauraat ja katkeilevat. Sitä ei voi korjata heti, vaan on odotettava uusia ripsiä. Valmistajan ajat ja oikea muotin koko estävät tämän.",
    },
    {
      q: "Voiko lyhyitä ripsiä taivuttaa?",
      a: "Hyvin lyhyitä ripsiä on vaikea muotoilla kauniisti, ja ripsistylistin kannattaa kertoa siitä etukäteen. Kestotaivutus sopii parhaiten melko pitkille omille ripsille, jotka kasvavat suoraan tai osoittavat alaspäin. Lyhyille ripsille käytetään pientä muottia valmistajan taulukon mukaan.",
    },
    {
      q: "Voiko kestotaivutuksen tehdä, jos on ripsienpidennykset?",
      a: "Ei. Pidennykset poistetaan ensin, ja taivutus tehdään sitten omiin ripsiin. Ripsiä, joissa on vielä pidennyksiä, ei koskaan taivuteta.",
    },
    {
      q: "Miksi ennen ripsien värjäystä tehdään allergiatesti?",
      a: "Ripsiväri voi aiheuttaa allergisia reaktioita, ja monet valmistajat edellyttävät testiä, usein 48 tuntia ennen käyntiä, valmistajan nimeämälle ihoalueelle, kuten korvan taakse tai kyynärtaipeeseen. Punoitus, kutina, turvotus tai kirvely tarkoittaa, ettei värjätä. Testin päivä ja tulos kirjataan asiakkaan tietoihin.",
    },
    {
      q: "Mitä kestotaivutuksen jälkeen pitää välttää?",
      a: "Ripset pidetään kuivina valmistajan suosittaman ajan, usein vuorokauden. Sinä aikana ei käytetä maskaraa, ei mennä höyryyn, ei hierota silmiä eikä nukuta kasvot tyynyä vasten. Sen jälkeen ripset harjataan kevyesti joka päivä.",
    },
  ],
  related: ["lash-lift", "mi-dam-thao-hieu-dung", "di-ung-hoa-chat", "khi-nao-khong-lam"],
};

export default article;
