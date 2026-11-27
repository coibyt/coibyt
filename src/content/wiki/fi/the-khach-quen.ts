import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/the-khach-quen/${name}.webp`;
const shot = (name: string) => `/wiki/the-khach-quen/fi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "digitaalinen-leimakortti-salongille",
  lesson: "the-khach-quen",
  category: "marketing",
  title: "Digitaalinen leimakortti salongille: luo QR-kortti ilmaiseksi, anna se asiakkaalle ja leimaa joka käynti",
  metaTitle: "Digitaalinen leimakortti salongille ilmaiseksi",
  metaDescription:
    "Näin luot ilmaisen QR-leimakortin kampaamoon, kynsi- tai ripsistudioon: valitse leimat ja palkinto, lähetä kortti sähköpostilla, leimaa käynnit ja anna palkinto.",
  keyword: "digitaalinen leimakortti",
  keywords: [
    "leimakortti salongille",
    "sähköinen kanta-asiakaskortti",
    "QR-koodi leimakortti",
    "leimakortti ilman sovellusta",
    "kanta-asiakaskortti kynsistudiolle",
    "miten saada asiakkaat palaamaan",
    "leimakortti ilman tulostusta",
  ],
  excerpt: "Ei tulostettavia paperikortteja eikä sovellusta asiakkaalle. Valitse leimat ja palkinto, lähetä kortti sähköpostilla ja paina ”Lisää 1 leima” jokaisella käynnillä.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-dua-the-tich-diem-tren-dien-thoai-de-quet"),
    alt: "Punaruskeahiuksinen nainen ojentaa puhelimensa näyttöä, ja vastapäätä istuva nuori mies skannaa sen omalla puhelimellaan salongissa, jossa on tuotehyllyjä",
  },
  takeaways: [
    "VaraaAin QR-leimakortti on **ilmainen**: paperikortteja ei tulosteta, eikä asiakkaan tarvitse asentaa sovellusta.",
    "Aloita kortin asetuksista: valitse **”Leimoja palkintoon”** ja kirjoita **”Palkinto”**. Asetukset koskevat kaikkia kortteja, myös jo annettuja.",
    "Asiakas, jolla on sähköposti, saa kortin postilaatikkoonsa. Ilman sähköpostia asiakas kuvaa näytöllä näkyvän QR-koodin.",
    "Paina **”Lisää 1 leima”** jokaisella käynnillä. Paina ”Käytä palkinto” vain, kun asiakas käyttää palkintonsa.",
    "Jos aloitit kokeilulla, kirjoita sähköpostisi ja paina **”Tallenna salonki”**, jotta kortit eivät katoa, kun vaihdat puhelinta tai tyhjennät selaimen.",
  ],
  intro: [
    "Digitaalinen leimakortti ratkaisee paperikortin tutun ongelman: asiakas unohtaa kortin kotiin, eikä salonki tiedä, kenellä on montako leimaa. Vanha tapa oli pino painettuja kortteja ja leimasin. Tässä artikkelissa näytetään toinen tapa: QR-koodilla toimiva leimakortti, joka kulkee asiakkaan puhelimessa ja jonka luot VaraaAissa ilmaiseksi noin kolmessakymmenessä sekunnissa.",
    "Artikkeli seuraa VaraaAi Academyn oppituntia ”Ilmainen leimakortti 30 sekunnissa”. Opit tekemään kortin asetukset, antamaan ensimmäiselle asiakkaalle kortin, leimaamaan sen jokaisella käynnillä ja merkitsemään palkinnon käytetyksi, kun kortti on täynnä.",
  ],
  sections: [
    {
      id: "miksi-leimakortti-toimii",
      title: "Miksi leimakortti tuo asiakkaat takaisin salonkiin",
      blocks: [
        { p: "Asiakas käy kerran eikä palaa enää. Jokainen salonki tuntee sen. Yleensä mikään ei mennyt pieleen: kun kynnet piti seuraavan kerran tehdä, asiakas meni siihen paikkaan, joka sattui olemaan matkan varrella. Leimakortti antaa hänelle konkreettisen syyn valita sinut uudelleen. Jokaisesta käynnistä saa leiman, ja kun leimoja on tarpeeksi, saa palkinnon." },
        { p: "Puhelimessa kulkeva kortti poistaa paperikortin tavalliset ongelmat:" },
        {
          ul: [
            "**Mitään ei tarvitse tulostaa.** Kortti on QR-koodilla varustettu sivu, joka on käytössä heti luomisen jälkeen.",
            "**Asiakas ei unohda korttia.** Se aukeaa puhelimessa suoraan sähköpostista, eikä sovellusta tarvitse asentaa.",
            "**Tiedät, kenellä on montako leimaa.** Jokaisella kortilla on oma koodinsa, ja kaikki kortit ovat salongin listalla.",
          ],
        },
        { p: "Tämän artikkelin kortti on erillinen työkalu, joka toimii, vaikka salongillasi ei vielä olisi VaraaAin ajanvaraussivua. Salongeilla, jotka hoitavat varaukset jo VaraaAin hallintapaneelissa, on varauksiin kytketty kanta-asiakasohjelma: katso ohje [hallintapaneelin kanta-asiakasohjelmasta](lesson:the-tich-diem)." },
      ],
    },
    {
      id: "leimat-ja-palkinto",
      title: "Ennen aloitusta: valitse leimojen määrä ja palkinto",
      blocks: [
        { p: "Leimakortissa on vain kaksi päätöstä, ja molemmat kannattaa miettiä valmiiksi ennen kuin avaat sivun." },
        { h3: "Leimoja palkintoon" },
        { p: "Näytöllä voit valita 3–20 leimaa. Oppituntivideon esimerkki on 10. Sovita määrä siihen, kuinka usein asiakkaasi käyvät. Palvelussa, jota varataan usein, leimoja voi olla enemmän. Hoidossa, jota asiakas varaa vain silloin tällöin, kannattaa valita vähemmän, muuten palkinto tuntuu niin kaukaiselta, ettei keräämään jaksa ryhtyä." },
        { img: { src: shot("leimoja-palkintoon"), alt: "Leimakorttisi-osio, jossa Leimoja palkintoon -valinta 3:sta 20:een on korostettu kultaisella ja luku 10 on valittuna", caption: "Valitse 3–20 leimaa. Oppitunnin esimerkki on 10." } },
        { h3: "Palkinto" },
        { p: "”Palkinto”-kenttään kirjoitetaan vapaa teksti. Oppitunnin esimerkki on ”15 % alennus seuraavasta käynnistä”. Kirjoita se niin, että asiakas ymmärtää yhdellä silmäyksellä, mitä hän saa ja milloin sen voi käyttää. Epämääräinen lupaus, kuten ”kiva yllätys”, ei tuo ketään takaisin." },
        { note: "Kortin asetukset koskevat kaikkia kortteja, myös jo annettuja. Se on kätevää, kun haluat korjata jotain, mutta samalla leimamäärän muutos vaikuttaa asiakkaisiin, joiden kortti on puolivälissä. Valitse huolella heti alussa ja muuta asetuksia mahdollisimman vähän.", kind: "warn", title: "Yksi muutos koskee kaikkia kortteja" },
      ],
    },
    {
      id: "kaksi-tapaa-aloittaa",
      title: "Leimakortin luominen verkossa: kokeile ensin tai aloita sähköpostilla",
      blocks: [
        { p: "Ilmaisten kanta-asiakaskorttien sivulle pääsee kahta reittiä. Kumpikaan ei vaadi salasanaa." },
        {
          table: {
            head: ["Reitti", "Mitä teet", "Sopii, kun"],
            rows: [
              ["Kokeilu", "Paina ”Kokeile heti” -painiketta. Painikkeessa lukee, ettei sähköpostia tarvita", "Haluat ensin katsoa ympärillesi ja harjoitella mallikortilla"],
              ["Sähköpostilla", "Kirjoita ”Salongin nimi” ja ”Sähköpostisi” ja paina ”Luo ilmaiset kortit”", "Olet päättänyt ottaa kortin käyttöön ja haluat salongin tallennetuksi heti"],
            ],
          },
        },
        { p: "Jos tulet sisään kokeilun kautta, salonkia ei ole vielä tallennettu. Se on olemassa vain siinä selaimessa, jota käytät, joten laitteen vaihtaminen tai selaimen tietojen tyhjentäminen vie asiakkaiden kortit mukanaan. Korttien hallinta muistuttaa tästä ruudulla ”Salonkiasi ei ole vielä tallennettu”, jossa on sähköpostikenttä ja ”Tallenna salonki” -painike. Videolla ruudussa näkyy myös annettujen kokeilukorttien määrä muodossa 0/3." },
        { note: "Jos olet antamassa kortteja oikeille asiakkaille, tallenna salonki sähköpostilla ennen ensimmäistä korttia. Kokeilu on tutustumista varten, ei pitkäaikaiseen käyttöön.", kind: "tip", title: "Tallenna ennen oikeita kortteja" },
      ],
    },
    {
      id: "asiakkaan-kortti",
      title: "Miltä asiakkaan QR-leimakortti näyttää",
      blocks: [
        { p: "Kun asiakas on saanut kortin, hänellä on oma korttisivu. Siinä näkyvät salongin nimi, asiakkaan nimi, QR-koodi, leimarivi, kortin koodi ja kirjoittamasi palkinto. Kortin alla oleva rivi kertoo, montako leimaa palkintoon vielä tarvitaan." },
        { img: { src: shot("asiakkaan-vip-kortti-qr-koodi"), alt: "Tumman vaaleanpunainen VIP-leimakortti puhelimessa: salongin nimi, Anna (mallikortti), suuri QR-koodi ja leimarivi, jossa 3 leimaa kymmenestä", caption: "Asiakkaan kortti: QR-koodi keskellä ja leimat sen alla." } },
        { p: "Asiakas, jolla on sähköposti, saa kortin postilaatikkoonsa ja avaa sen yhdellä napautuksella. Korttisivu neuvoo myös ottamaan kortista kuvakaappauksen, niin sen saa salongissa nopeasti auki. Ilman sähköpostia asiakas saa silti kortin: hän ottaa kuvan näytölläsi näkyvästä QR-koodista." },
        { p: "Voit lähettää asiakkaalle ohjeen [salongin kanta-asiakaskortista](lesson:the-thanh-vien), joka on kirjoitettu asiakkaan näkökulmasta, niin hän ymmärtää, miten leimoja kerätään ja korttia käytetään." },
      ],
    },
    {
      id: "leimaus-ja-palkinto",
      title: "Kanta-asiakkaan kortin leimaaminen ja palkinnon käyttäminen kassalla",
      blocks: [
        { p: "Kortin kaksi painiketta tekevät eri asiat, ja niiden sekoittaminen on uuden työntekijän yleisin virhe:" },
        {
          table: {
            head: ["Painike", "Milloin painat", "Mitä tapahtuu"],
            rows: [
              ["”Lisää 1 leima”", "Jokaisella käynnillä", "Korttiin tulee yksi leima lisää. Asiakas, jolla on sähköposti, saa tiedon automaattisesti"],
              ["”Käytä palkinto”", "Kun kortti on täynnä ja asiakas käyttää palkinnon", "Kortti aloittaa uuden kierroksen"],
            ],
          },
        },
        { p: "Sido leimaaminen kiinteään hetkeen, esimerkiksi maksamiseen. Kun se on osa kassatapahtumaa, työntekijät muistavat sen, ja asiakkaat tottuvat ojentamaan puhelimensa." },
        { p: "Kohdassa ”Skannaa kortti käynnillä” kortin löytää kahdella tavalla: skannaa QR-koodi kameralla tai kirjoita kortin koodi kenttään. Videolla näytöllä on myös ohje selaimille, jotka eivät pysty skannaamaan sivun sisällä. Silloin avaat puhelimen oman kameran ja osoitat sillä QR-koodia, ja asiakkaan korttisivulle tulee ”Lisää 1 leima” -painike." },
        { img: { src: shot("asiakkaat-korttien-haku"), alt: "Korttien hallinnan Asiakkaat-välilehti, jossa hakukenttä on korostettu kultaisella ja alla mallikortti Lisää 1 leima -painikkeineen", caption: "”Asiakkaat” listaa kaikki antamasi kortit. Hae nimellä, sähköpostilla tai kortin koodilla." } },
        { p: "Kohdassa ”Asiakkaat” näet kaikki korttisi, voit hakea niitä nimellä, sähköpostilla tai kortin koodilla ja lisätä leiman jopa suoraan listasta." },
      ],
    },
    {
      id: "kun-kortti-on-kaytossa",
      title: "Kun salongillasi on leimakortti",
      blocks: [
        { p: "Kortti toimii vain, jos asiakkaat tietävät siitä. Tarjoa sitä asiakkaan ensimmäisellä käynnillä ja lisää ensimmäinen leima hänen nähtensä. Kortti, jossa on jo yksi leima, tuntuu asialta, joka on jo aloitettu." },
        {
          table: {
            head: ["Tilanne", "Mitä teet"],
            rows: [
              ["Asiakkaalla ei ole sähköpostia", "Anna kortti silti. Asiakas kuvaa näytöllä näkyvän QR-koodin"],
              ["Asiakas unohti puhelimensa tai ei saa korttia auki", "Kirjoita kortin koodi hakukenttään tai hae hänen nimellään kohdassa ”Asiakkaat”"],
              ["Asiakas poisti sähköpostin, jossa kortti oli", "Etsi hänet kohdasta ”Asiakkaat” ja lähetä kortti uudelleen"],
              ["Joku painoi ”Käytä palkinto” eikä ”Lisää 1 leima”", "Kerro työntekijöille, että ”Käytä palkinto” on vain sitä hetkeä varten, kun asiakas todella käyttää palkintonsa"],
              ["Annoit kortteja kokeilun aikana", "Kirjoita sähköpostisi ja paina heti ”Tallenna salonki”, niin kortit säilyvät"],
            ],
          },
        },
        { p: "Kun kanta-asiakkaillasi on kortit, seuraava askel on saada heidät tuomaan uusia asiakkaita. Ohje [asiakassuosittelusta](lesson:khach-dan-khach) kertoo kutsulinkistä, joka tulee hallintapaneelin kanta-asiakaskortin mukana." },
        { p: "Korttien hallinta esittelee myös täyden VaraaAin salongeille, jossa on nettiajanvaraus ja muistutukset. Näytön tekstin mukaan asiakkaiden kortit ja leimat siirtyvät automaattisesti, kun rekisteröidyt samalla sähköpostilla. Rekisteröinti on kuvattu ohjeessa [salongin rekisteröinnistä ja aktivoinnista](lesson:dang-ky-salon)." },
      ],
    },
  ],
  howTo: {
    title: "Näin luot digitaalisen leimakortin salongillesi VaraaAissa",
    id: "leimakortin-vaiheet",
    after: "leimat-ja-palkinto",
    lead: "Yhdeksän vaihetta seuraavat oppituntivideota järjestyksessä. Kaiken voi tehdä puhelimella vastaanottotiskillä.",
    steps: [
      {
        name: "Avaa ilmaisten kanta-asiakaskorttien sivu",
        text: "Avaa varaaai.com, vieritä sivun alaosaan ja napauta yrityslinkkien joukosta ”Ilmaiset kanta-asiakaskortit”. Voit myös mennä suoraan [ilmaisen leimakortin sivulle](/loyalty-lite).",
        image: { src: shot("ilmaiset-kanta-asiakaskortit-alatunnisteessa"), alt: "VaraaAin etusivun alaosa puhelimessa, jossa Yritykset-ryhmän linkki Ilmaiset kanta-asiakaskortit on korostettu kultaisella" },
      },
      {
        name: "Valitse, miten aloitat",
        text: "Napauta ”Kokeile heti”, niin pääset suoraan korttien hallintaan mallikortin kanssa ilman sähköpostia. Tai kirjoita ”Salongin nimi” ja ”Sähköpostisi” ja napauta ”Luo ilmaiset kortit”. Kumpikaan tapa ei kysy salasanaa.",
        image: { src: shot("kokeile-heti-tai-luo-ilmaiset-kortit"), alt: "Tervetuloa VaraaAihin -ikkuna, jossa vaaleanpunainen Kokeile heti -painike on korostettu kultaisella ja alla vaihtoehto luoda kortit sähköpostilla" },
      },
      {
        name: "Valitse ”Leimoja palkintoon”",
        text: "Etsi korttien hallinnasta osio ”Leimakorttisi”. Napauta lukua kohdassa ”Leimoja palkintoon”, esimerkiksi 10. Se on käyntien määrä, joka asiakkaalta vaaditaan palkintoon.",
      },
      {
        name: "Kirjoita ”Palkinto” ja paina ”Tallenna”",
        text: "Kirjoita palkinto ”Palkinto”-kenttään, esimerkiksi ”15 % alennus seuraavasta käynnistä”, ja paina ”Tallenna”. Asetus koskee kaikkia kortteja, myös jo annettuja, joten kirjoita palkinto selkeästi heti alusta.",
        image: { src: shot("palkinto-ja-tallenna"), alt: "Palkinto-kenttä, jossa lukee 15 % alennus seuraavasta käynnistä, sen alla vaaleanpunainen Tallenna-painike ja alempana välilehdet Asiakkaat, Ohje ja Profiili" },
      },
      {
        name: "Anna asiakkaalle kortti",
        text: "Kirjoita kohdassa ”Anna asiakkaalle kortti” ”Asiakkaan nimi” ja ”Asiakkaan sähköposti”. Kun sähköposti on kirjoitettu, painike lähettää kortin suoraan asiakkaan postilaatikkoon. Tyhjällä sähköpostikentällä painikkeessa lukee ”Luo kortti”: kortin voi silti luoda, ja asiakas kuvaa QR-koodin näytöltä.",
        image: { src: shot("anna-asiakkaalle-kortti"), alt: "Anna asiakkaalle kortti -osio, jossa Asiakkaan nimi- ja Asiakkaan sähköposti -kentät on korostettu kultaisella ja alla Luo kortti -painike" },
      },
      {
        name: "Skannaa kortti, kun asiakas saapuu",
        text: "Mene jokaisella käynnillä kohtaan ”Skannaa kortti käynnillä”, avaa puhelimen kamera ja osoita sillä asiakkaan kortin QR-koodia. Jos koodi ei skannaudu, kirjoita kortin koodi kenttään.",
        image: { src: shot("skannaa-kortti-kaynnilla"), alt: "Skannaa kortti käynnillä -osio korostettuna kultaisella, sen sisällä ohje puhelimen kameralla skannaamisesta ja alla kortin koodin kenttä" },
      },
      {
        name: "Paina ”Lisää 1 leima”",
        text: "Asiakkaan kortti aukeaa. Paina ”Lisää 1 leima” ”Salongille”-ruudussa. Korttiin tulee yksi leima lisää, ja asiakas, jolla on sähköposti, saa automaattisesti tiedon uudesta leimasta.",
        image: { src: shot("lisaa-1-leima-salongille"), alt: "Asiakkaan kortin alaosa, jossa Lisää 1 leima -painike on korostettu kultaisella Salongille-ruudussa ja alla rivi Vielä 7 leimaa palkintoon" },
      },
      {
        name: "Paina ”Käytä palkinto”, kun asiakas käyttää sen",
        text: "Kortin viimeinen leima on tähti. Kun asiakas saa sen, hän on ansainnut kortissa näkyvän palkinnon. Kun hän käyttää palkinnon, paina ”Käytä palkinto”. Kortti aloittaa uuden kierroksen, ja asiakas kerää leimoja taas alusta.",
      },
      {
        name: "Kirjoita sähköpostisi ja paina ”Tallenna salonki”",
        text: "Jos aloitit ”Kokeile heti” -painikkeella, salonkia ei ole vielä tallennettu. Kirjoita sähköpostisi ruutuun ”Salonkiasi ei ole vielä tallennettu” ja paina ”Tallenna salonki”, niin asiakkaiden kortit eivät katoa, jos vaihdat puhelinta tai tyhjennät selaimen.",
        image: { src: shot("salonkiasi-ei-ole-tallennettu"), alt: "Salonkiasi ei ole vielä tallennettu -ruutu korostettuna kultaisella: salongin nimi, sähköpostikenttä ja vaaleanpunainen Tallenna salonki -painike" },
      },
    ],
  },
  faq: [
    {
      q: "Maksaako digitaalinen leimakortti salongille jotain VaraaAissa?",
      a: "Ei maksa. QR-leimakortin luominen on ilmaista. Paperikortteja ei tulosteta, eikä asiakkaan tarvitse asentaa sovellusta, koska kortti aukeaa puhelimessa suoraan sähköpostista.",
    },
    {
      q: "Miten asiakas ilman sähköpostia saa leimakortin?",
      a: "Kortti luodaan silti. Asiakas ottaa kuvan näytöllä näkyvästä QR-koodista ja näyttää kuvan jokaisella käynnillä, jotta salonki voi skannata sen.",
    },
    {
      q: "Mitä painiketta painan jokaisella käynnillä?",
      a: "Paina ”Lisää 1 leima”. ”Käytä palkinto” on vain sitä varten, kun kortti on täynnä ja asiakas käyttää palkintonsa. Sen jälkeen kortti aloittaa uuden kierroksen.",
    },
    {
      q: "Montako leimaa salongin leimakortissa kannattaa olla?",
      a: "Näytöllä voit valita 3–20 leimaa, ja oppitunnin esimerkki on 10. Sovita määrä siihen, kuinka usein asiakkaat käyvät: hoidossa, jota varataan vain silloin tällöin, kannattaa valita vähemmän leimoja, jotta palkinto ei tunnu liian kaukaiselta.",
    },
    {
      q: "Miksi salonki pitää tallentaa kokeilun jälkeen?",
      a: "Kokeilusalonki on olemassa vain käyttämässäsi selaimessa, kunnes tallennat sen sähköpostilla. Jos et tallenna, voit menettää asiakkaiden kortit, kun vaihdat puhelinta tai tyhjennät selaimen.",
    },
    {
      q: "Muuttuvatko jo annetut kortit, jos vaihdan leimamäärää tai palkintoa?",
      a: "Muuttuvat. ”Leimakorttisi”-osion asetukset koskevat kaikkia kortteja, myös jo annettuja. Siksi leimamäärä ja palkinto kannattaa valita huolella heti alussa.",
    },
  ],
  related: ["the-tich-diem", "khach-dan-khach", "the-qua-tang-salon", "the-thanh-vien"],
};

export default article;
