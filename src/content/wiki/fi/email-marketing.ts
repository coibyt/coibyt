import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/email-marketing/${name}.webp`;
const shot = (name: string) => `/wiki/email-marketing/fi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "sahkopostimarkkinointi-kauneushoitolalle",
  lesson: "email-marketing",
  category: "marketing",
  title: "Sähköpostimarkkinointi kauneushoitolalle: markkinointiviesti oikeille asiakkaille 7 vaiheessa",
  metaTitle: "Sähköpostimarkkinointi kauneushoitolalle 7 vaiheessa",
  metaDescription:
    "Näin lähetät markkinointisähköpostin VaraaAissa: valitse vastaanottajat, aloita pohjasta, lisää etukuponki, lähetä testi ja lähetä heti tai ajasta kampanja.",
  keyword: "sähköpostimarkkinointi kauneushoitolalle",
  keywords: [
    "markkinointisähköposti salongin asiakkaille",
    "sähköpostimarkkinointi kampaamolle",
    "tarjousviestin kirjoittaminen kynsistudiolle",
    "uutiskirje kauneushoitola",
    "miten saada vanhat asiakkaat takaisin",
    "mitä Vara-pisteet ovat",
    "viesti asiakkaille, jotka eivät ole palanneet",
  ],
  excerpt: "Valitse oikea asiakasryhmä, napauta valmista pohjaa, lisää etukuponki ja ajanvarauspainike, esikatsele ja lähetä. Jokainen lähetetty viesti maksaa 1 Vara-pisteen.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("chu-salon-om-chao-khach-quen-quay-lai"),
    alt: "Kaksi naista halaa keskellä valoisaa salonkia, jossa on suuret ikkunat, ja taustalla muutama asiakas istuu juomassa kahvia",
  },
  takeaways: [
    "Ensimmäinen vaihe on aina **vastaanottajien valinta**. Paluutarjous toimii paremmin ryhmälle ”Eivät ole palanneet” kuin kaikille.",
    "Napauta **valmista pohjaa**, niin otsikko ja viesti täyttyvät, ja muokkaa ne sitten salongillesi sopiviksi.",
    "**”Asiakkaan nimi”** -painike lisää jokaisen nimen viestiin, joten jokainen asiakas saa oman tervehdyksen.",
    "**”Esikatsele viesti”** ja **”Lähetä testi”** ovat maksuttomia. Pisteitä kuluu vasta, kun lähetät asiakkaille.",
    "Jokainen lähetetty viesti maksaa **1 Vara-pisteen**. Lisää pisteitä saat kirjautumalla päivittäin tai suosittelemalla VaraaAita toiselle salongille.",
  ],
  intro: [
    "Sähköpostimarkkinointi kauneushoitolalle kuulostaa isojen ketjujen työltä, mutta tarve on jokaisella salongilla sama: kanta-asiakkaita, jotka eivät ole käyneet aikoihin, ja uusi tarjous, josta asiakkaat eivät tiedä. Yksi oikeille ihmisille lähetetty viesti, jossa asiakkaan nimi on tervehdyksessä ja ajanvarauspainike lopussa, tekee saman työn kuin viestin kirjoittaminen jokaiselle erikseen.",
    "Tämä artikkeli seuraa VaraaAi Academyn oppituntia ”Markkinointisähköpostit ja Vara-pisteet”. Opit kokoamaan kampanjan valmiista pohjasta, valitsemaan oikean asiakasryhmän, ymmärtämään, miten Vara-pisteitä kuluu, ja seuraamaan tuloksia lähetyksen jälkeen.",
  ],
  sections: [
    {
      id: "miksi-sahkoposti",
      title: "Miksi salongin kannattaa lähettää asiakkailleen sähköpostia",
      blocks: [
        { p: "Useimmilla asiakkailla, jotka eivät palaa, ei ole mitään valitettavaa. He ovat kiireisiä, he unohtavat, tai toinen salonki lähellä kotia muistutti heitä ensin. Alalla tiedetään, että vanhan asiakkaan pitäminen vaatii vähemmän vaivaa kuin uuden löytäminen, mutta kesken työpäivän kenelläkään ei ole aikaa kirjoittaa jokaiselle erikseen." },
        { p: "Sähköposti täyttää tämän aukon. Kirjoitat kerran, valitset ryhmän, ja jokainen saa viestin omalla nimellään. Viesti odottaa postilaatikossa, kunnes asiakas avaa sen, toisin kuin somepäivitys, joka valuu pois näkyvistä muutamassa tunnissa. Jos salonki julkaisee jo tarjouksia [Facebook-sivullaan](lesson:fanpage), sähköposti täydentää sitä: päivitys tavoittaa seuraajat, sähköposti menee suoraan asiakkaille, jotka ovat varanneet aiemmin." },
        { p: "VaraaAissa tämä löytyy hallintapaneelin kohdasta ”Markkinointi”. Vastaanottajat tulevat salongin omista asiakkaista, joten sähköpostiosoitteita ei tarvitse kopioida toiseen työkaluun." },
      ],
    },
    {
      id: "ennen-aloitusta",
      title: "Mitä valmistella ennen markkinointiviestin lähettämistä",
      blocks: [
        { p: "Kampanja syntyy muutamassa minuutissa, jos olet päättänyt kolme asiaa etukäteen:" },
        {
          ul: [
            "**Kenelle viesti on.** Pitkään poissa olleet, uudet asiakkaat ja kanta-asiakkaat tarvitsevat kukin eri viestin.",
            "**Mikä etu on.** Yksi lyhyt rivi, kuten oppituntivideon esimerkki: 20 % alennus kaikista palveluista. Jos etu on voimassa tiettyyn päivään, päätä päivä nyt.",
            "**Mihin asiakas siirtyy lukemisen jälkeen.** Yleensä ajanvarauspainikkeeseen, jotta hän varaa ajan, kun kiinnostus on vielä tuoreena.",
          ],
        },
        { p: "Valmiiksi kannattaa ottaa myös kuva salongista tai tuoreesta työstä, koska viestissä on ”Kuva”-osio. Se on vapaaehtoinen." },
        { note: "Katso ennen kirjoittamista Vara-pisteiden saldo, joka on ”Markkinointi”-kohdassa ”Lähetä kampanja” -vaiheen alapuolella. Jokainen lähetetty viesti maksaa 1 pisteen, joten saldo kertoo, monelleko asiakkaalle voit tällä kertaa lähettää.", kind: "info", title: "Katso pisteet ensin" },
      ],
    },
    {
      id: "vastaanottajat",
      title: "Kenelle lähettää: asiakasryhmät ja niille sopivat viestit",
      blocks: [
        { p: "Otsikon ”Valitse vastaanottajat” alla oleva rivi kertoo ajatuksen: oikea viesti oikeille ihmisille, niin asiakas tuntee viestin olevan hänelle. Jokaisessa ryhmässä näkyy, montako asiakasta siinä on. Alla olevan taulukon kolmas sarake on tämän artikkelin oma ehdotus, joten sovella sitä salonkiisi." },
        {
          table: {
            head: ["Ryhmä", "Ketkä siihen kuuluvat", "Ehdotettu viesti (esimerkki)"],
            rows: [
              ["”Kaikki asiakkaat”", "Kaikki, jotka ovat varanneet", "Salongin yleinen uutinen, esimerkiksi uusi palvelu"],
              ["”Viimeaikaiset”", "Kävi viimeisen 60 päivän aikana", "Muistutus huollon tai uusinnan ajankohdasta"],
              ["”Eivät ole palanneet”", "Poissa 90+ päivää, ei varauksia", "Tarjous, joka kutsuu takaisin"],
              ["”Kanta-asiakkaat”", "Käynyt vähintään 3 kertaa", "Kiitos ja vain heille tarkoitettu etu"],
              ["”Uudet asiakkaat”", "Ensikäynti viimeisen 30 päivän aikana", "Tervetulotoivotus ja muiden palvelujen esittely"],
              ["”Kortin jäsenet”", "Salongin jäsenkortti", "Uutisia kortin eduista"],
            ],
          },
        },
        { img: { src: shot("uudet-asiakkaat-kortin-jasenet-omat-yhteystiedot"), alt: "Ryhmäkortit Eivät ole palanneet, Kanta-asiakkaat, Uudet asiakkaat ja Kortin jäsenet asiakasmäärineen sekä alla Omat yhteystiedot -kortti", caption: "Vieritä vaiheessa 1 alas, niin näet lisää ryhmiä. Videolla näkyy myös ”Omat yhteystiedot”, Excelistä tuoduille tai käsin lisätyille asiakkaille." } },
        { p: "Oppitunti korostaa yhtä esimerkkiä: paluutarjous toimii paremmin ryhmälle ”Eivät ole palanneet” kuin kaikille lähetettynä. Syy on yksinkertainen. Asiakas, joka kävi viime viikolla ja saa viestin ”emme ole nähneet pitkään aikaan”, tietää viestin olevan joukkopostitus ja avaa seuraavan vähemmän todennäköisesti." },
        { p: "Jos salongillasi on [kanta-asiakaskortit](lesson:the-tich-diem), ”Kortin jäsenet” on ryhmä, jolle kannattaa kirjoittaa erikseen, koska he ovat valinneet pysyä salongissasi. Jos haluat nähdä, montako kertaa kukin asiakas on käynyt, avaa [asiakasrekisteri](lesson:khach-hang)." },
      ],
    },
    {
      id: "viestin-kirjoittaminen",
      title: "Tarjousviestin kirjoittaminen: otsikko, viesti ja etukuponki",
      blocks: [
        { p: "”Viestin sisältö” alkaa kohdasta ”Aloita pohjasta”. Napauta pohjaa, esimerkiksi ”Erikoisetu”, niin alla olevat kentät täyttyvät, ja voit muuttaa kaiken. Jokaisella kentällä on oma tehtävänsä asiakkaan postilaatikossa:" },
        {
          table: {
            head: ["Kenttä", "Missä asiakas näkee sen", "Miten kirjoitat"],
            rows: [
              ["”Otsikko”", "Lihavoitu rivi postilaatikossa ennen avaamista", "Lyhyt, kertoo edun suoraan, sisältää asiakkaan nimen"],
              ["”Esikatseluteksti”", "Vaaleampi rivi heti otsikon jälkeen", "Yksi syy lisää avata viesti, esimerkiksi määräaika"],
              ["”Iso otsikko viestissä”", "Iso rivi viestin alussa avaamisen jälkeen", "Yksi lause, joka vastaa otsikkoa"],
              ["”Viesti”", "Viestin runko", "Muutama lause kuin puhuisit kanta-asiakkaalle"],
            ],
          },
        },
        { img: { src: shot("viesti-asiakkaan-nimi"), alt: "Viesti-kenttä korostettuna kultaisella, alussa Hei {ten} ja kulmassa Asiakkaan nimi -painike, alla rivi {ten} korvataan jokaisen asiakkaan nimellä", caption: "{ten} otsikossa tai viestissä korvataan lähetettäessä jokaisen asiakkaan nimellä." } },
        { p: "”Asiakkaan nimi” -painike lisää {ten}-merkinnän siihen kohtaan, jossa kursori on. Kun viesti lähtee, merkintä korvautuu kunkin asiakkaan nimellä. Videon esikatselussa tervehdys muuttuu muotoon ”Hei Anna”. Nimi rivin alussa on ero mainoksen ja kutsun välillä." },
        { h3: "Etukuponki ja painike" },
        { p: "Kytke päälle ”Lisää etukuponki”, niin viestin keskellä erottuu kultainen kuponki. Kirjoita etu kenttään ”Etu”. ”Etukoodi (valinnainen)” ja ”Voimassa asti (valinnainen)” voivat jäädä tyhjiksi. Kuponki, jolla on päättymispäivä, antaa asiakkaalle syyn varata pian eikä lykätä asiaa." },
        { p: "Kohdassa ”Painike” on kolme vaihtoehtoa: ”Ajanvaraus”, ”Muu linkki” ja ”Ei painiketta”. Markkinointiviestissä ”Ajanvaraus” on järkevin, koska yksi napautus vie asiakkaan varaamaan, samalla tavalla kuin hänelle jo tuttu [nettiajanvaraus](lesson:dat-lich-online)." },
        { img: { src: shot("asiakkaan-saama-viesti-etukuponki"), alt: "Asiakkaan saama viesti: iso otsikko Erikoisetu juuri sinulle, tervehdys Annalle ja kultaisella korostettu kuponki 20 % kaikista palveluista sekä Varaa aika -painike" } },
        { note: "Kirjoita viesti niin kuin puhuisit asiakkaalle tiskillä: tuttavallisesti, lyhyin lausein ja yksi ainoa etu. Mitä useampia asioita viestissä on, sitä vaikeampi asiakkaan on muistaa, mihin hänet kutsutaan.", kind: "tip", title: "Yksi viesti, yksi kutsu" },
      ],
    },
    {
      id: "vara-pisteet",
      title: "Mitä Vara-pisteet ovat ja paljonko yksi viesti maksaa",
      blocks: [
        { p: "Vara-pisteillä lähetetään sähköposteja VaraaAissa. Sääntö on lyhyt: jokainen lähetetty viesti maksaa 1 Vara-pisteen. 40 asiakkaalle lähettäminen kuluttaa 40 pistettä (40 on vain esimerkki). ”Lähetä testi” omaan osoitteeseesi on maksuton, ja pisteitä kuluu vasta, kun lähetät asiakkaille." },
        { p: "”Lähetä kampanja” -vaiheessa on kolme lukua, jotka kannattaa tarkistaa ennen lähettämistä: ”Vastaanottajat”, ”Hinta” ja ”Pisteitä jäljellä”. Niistä näet, monelleko kampanja lähtee ja paljonko pisteitä jää jäljelle." },
        { img: { src: shot("vara-pisteiden-saldo-suosittelulinkki"), alt: "Vara-pisteiden saldo 1000 ja Kirjaudu sisään (+5) -painike, alla kultaisella korostettu salongin omistajaksi -suosittelulinkki ja Viimeisimmät pistetapahtumat", caption: "Videolla ”Lähetä kampanja” -vaiheen alla: pistesaldo, päivittäisen kirjautumisen painike ja salongin suosittelulinkki." } },
        { p: "Oppitunti kertoo kaksi tapaa saada lisää pisteitä:" },
        {
          ul: [
            "**Päivittäinen kirjautuminen.** Painike on Vara-pisteiden saldon vieressä. Videolla siinä lukee ”Kirjaudu sisään (+5)”.",
            "**Toisen salongin suositteleminen VaraaAihin.** Alempana on suosittelulinkki tuleville salongin omistajille. Kopioi se ja lähetä tutuille omistajille. Videon tekstin mukaan saat pisteitä, kun joku rekisteröityy ja täyttää salonkinsa profiilin.",
          ],
        },
        { p: "Heti alla oleva ”Viimeisimmät pistetapahtumat” kertoo, milloin pisteitä on lisätty, joten voit tarkistaa ne tarvittaessa." },
      ],
    },
    {
      id: "lahetyksen-jalkeen",
      title: "Lähetyksen jälkeen: avaukset, klikkaukset ja tavallisia tilanteita",
      blocks: [
        { p: "Lähetetty kampanja näkyy ”Kampanjat”-välilehdellä ”Uusi kampanja” -välilehden vieressä. Siellä voit seurata sen avauksia ja klikkauksia. Luvut vastaavat eri kysymyksiin. Avaukset kertovat, herättikö otsikko uteliaisuuden. Klikkaukset kertovat, painoiko asiakas lukemisen jälkeen painiketta, eli vakuuttivatko etu ja viesti." },
        { img: { src: shot("kampanjat-valilehti"), alt: "Markkinointi-sivun välilehdet Uusi kampanja, Kampanjat ja Yhteystiedot, joista Kampanjat on korostettu kultaisella, alla vaihe 1 Valitse vastaanottajat", caption: "Lähetetyt kampanjat avauksineen ja klikkauksineen löytyvät ”Kampanjat”-välilehdeltä." } },
        { p: "Paljon avauksia mutta vähän klikkauksia: pidä otsikko ensi kerralla ja muuta etua. Vähän avauksia: paranna ensin otsikkoa ja esikatselutekstiä." },
        {
          table: {
            head: ["Tilanne", "Mitä teet"],
            rows: [
              ["Valitussa ryhmässä on 0 asiakasta", "Valitse toinen ryhmä. Jokaisessa ryhmässä näkyy asiakasmäärä, eikä tyhjälle ryhmälle ole vielä keille lähettää"],
              ["Haluat viestin perille toisena päivänä tai kellonaikana", "Valitse ”Lähetä nyt” -vaihtoehdon sijaan ”Ajasta” ja aseta päivä ja kellonaika"],
              ["Et ole varma, miltä viesti näyttää oikeassa postilaatikossa", "Kirjoita osoitteesi kohtaan ”Lähetä testi osoitteeseen” ja paina ”Lähetä testi”. Pisteitä ei kulu"],
              ["Haluat nähdä viestin isommalla näytöllä", "Vaihda esikatselussa ”Puhelin”- ja ”Tietokone”-näkymän välillä"],
              ["Et halua viestiin painiketta", "Valitse kohdassa ”Painike” ”Ei painiketta”"],
            ],
          },
        },
        { p: "Sähköposti toimii parhaiten yhdessä syyn kanssa palata. Kaksi työkalua sopii sen rinnalle: [kanta-asiakaskortit](lesson:the-tich-diem), joille on valmis pohja ”Kanta-asiakaskortti lahjaksi”, ja [asiakassuosittelu](lesson:khach-dan-khach) niille kanta-asiakkaille, jotka suosittelevat sinua mielellään ystävilleen." },
      ],
    },
  ],
  howTo: {
    title: "Sähköpostimarkkinointi kauneushoitolalle vaihe vaiheelta VaraaAissa",
    id: "markkinointiviestin-vaiheet",
    after: "ennen-aloitusta",
    lead: "Seitsemän vaihetta kulkevat ”Uusi kampanja” -välilehteä ylhäältä alas samassa järjestyksessä kuin oppituntivideo.",
    steps: [
      {
        name: "Avaa ”Markkinointi” ja valitse vastaanottajat",
        text: "Napauta hallintapaneelissa ”Markkinointi”. Napauta kohdassa ”Valitse vastaanottajat” ryhmää: Kaikki asiakkaat, Viimeaikaiset, Eivät ole palanneet, Kanta-asiakkaat, Uudet asiakkaat tai Kortin jäsenet. Katso jokaisen kortin asiakasmäärä ennen valintaa, niin tiedät, monelleko viesti lähtee.",
        image: { src: shot("valitse-vastaanottajat"), alt: "Vaihe 1 Valitse vastaanottajat korostettuna kultaisella: valittuna Kaikki asiakkaat, vieressä Viimeaikaiset, alla Eivät ole palanneet ja Kanta-asiakkaat" },
      },
      {
        name: "Napauta pohjaa kohdassa ”Viestin sisältö”",
        text: "Vieritä kohtaan ”Viestin sisältö” ja napauta pohjaa, esimerkiksi ”Erikoisetu”. Otsikko ja viesti täyttyvät itsestään. Se on nopeampaa kuin tyhjältä sivulta aloittaminen, ja voit silti muuttaa jokaisen sanan.",
        image: { src: shot("aloita-pohjasta-viestin-sisalto"), alt: "Vaihe 2 Viestin sisältö, jossa Aloita pohjasta -rivi on korostettu kultaisella, ja alla Otsikko- ja Esikatseluteksti-kentät" },
      },
      {
        name: "Muokkaa otsikkoa ja viestiä ja lisää asiakkaan nimi",
        text: "Muuta otsikko ja viesti vastaamaan salongin etua. Napauta ”Asiakkaan nimi”, niin viesti tervehtii jokaista nimeltä. Jos sinulla on hyvä kuva salongista, lisää se kohtaan ”Kuva”.",
      },
      {
        name: "Kytke päälle ”Lisää etukuponki”",
        text: "Kytke ”Lisää etukuponki” päälle, niin viestin keskellä erottuu kultainen kuponki. Kirjoita etu sen alle, esimerkiksi 20 % alennus kaikista palveluista kuten videolla. Lupaa vain etu, jonka salonki todella antaa asiakkaan tullessa.",
        image: { src: shot("lisaa-etukuponki"), alt: "Vaihe 3 Etu ja painike, jossa Lisää etukuponki -kytkin on päällä ja korostettu kultaisella, alla Etu-kenttä ja valinnainen etukoodi" },
      },
      {
        name: "Valitse painikkeeksi ”Ajanvaraus”",
        text: "Valitse kohdassa ”Painike” ”Ajanvaraus”, niin asiakas voi varata yhdellä napautuksella. ”Painikkeen teksti” -kentässä voit muuttaa painikkeen sanat. Ilman painiketta edusta kiinnostunut asiakas joutuu etsimään ajanvaraussivusi itse.",
      },
      {
        name: "Paina ”Esikatsele viesti” ja ”Lähetä testi”",
        text: "Paina ”Esikatsele viesti”, niin näet viestin juuri sellaisena kuin se näkyy asiakkaan puhelimessa. Varmistaaksesi paina ”Lähetä testi”, niin saat kopion omaan postilaatikkoosi maksutta. Tarkista nyt salongin nimi, etu ja päättymispäivä, koska lähetettyä viestiä ei voi enää muuttaa.",
        image: { src: shot("esikatsele-viesti"), alt: "Vastaanottajat 1, Hinta 1 ja Pisteitä jäljellä 999, kultainen lähetyspainike, Tallenna luonnos ja kultaisella korostettu Esikatsele viesti, alla Lähetä testi" },
      },
      {
        name: "Valitse ”Lähetä nyt” tai ”Ajasta” ja lähetä",
        text: "Valitse kohdassa ”Lähetä kampanja” ”Lähetä nyt” tai ”Ajasta”, jos haluat viestin lähtevän tiettynä päivänä ja kellonaikana. Tarkista vastaanottajien määrä ja jäljellä olevat pisteet ja paina kultaista lähetyspainiketta. Avaa sen jälkeen ”Kampanjat”-välilehti seurataksesi avauksia ja klikkauksia.",
        image: { src: shot("laheta-nyt-tai-ajasta"), alt: "Vaihe 4 Lähetä kampanja, jossa Lähetä nyt ja Ajasta on korostettu kultaisella, alla Vastaanottajat, Hinta ja Pisteitä jäljellä sekä kultainen lähetyspainike" },
      },
    ],
  },
  faq: [
    {
      q: "Paljonko markkinointisähköpostin lähettäminen asiakkaille maksaa VaraaAissa?",
      a: "Jokainen lähetetty viesti maksaa 1 Vara-pisteen. Testiviesti omaan osoitteeseesi on maksuton, ja pisteitä kuluu vasta, kun lähetät asiakkaille. Ennen lähettämistä ”Lähetä kampanja” -vaihe näyttää vastaanottajat, hinnan ja jäljellä olevat pisteet.",
    },
    {
      q: "Miten saan lisää Vara-pisteitä?",
      a: "Oppitunti kertoo kaksi tapaa: kirjaudu päivittäin painikkeesta ”Kirjaudu sisään (+5)” tai suosittele VaraaAita toiselle salongille suosittelulinkilläsi. Molemmat löytyvät ”Markkinointi”-kohdan Vara-pisteiden osiosta.",
    },
    {
      q: "Kannattaako viesti lähettää kaikille vai ryhmittäin?",
      a: "Ryhmittäin. Paluutarjous toimii paremmin ryhmälle ”Eivät ole palanneet” kuin kaikille, koska asiakas tuntee viestin olevan hänelle. ”Kaikki asiakkaat” sopii salongin yleisiin uutisiin.",
    },
    {
      q: "Miten viesti tervehtii jokaista asiakasta nimeltä?",
      a: "Paina otsikkoa tai viestiä kirjoittaessasi ”Asiakkaan nimi” -painiketta. Se lisää {ten}-merkinnän, joka korvautuu lähetettäessä kunkin asiakkaan nimellä.",
    },
    {
      q: "Voinko nähdä viestin ennen kuin lähetän sen asiakkaille?",
      a: "Voit. Paina ”Esikatsele viesti”, niin näet sen juuri sellaisena kuin asiakkaan puhelimessa. Voit myös painaa ”Lähetä testi” ja saada kopion omaan postilaatikkoosi ilman, että pisteitä kuluu.",
    },
    {
      q: "Voiko markkinointiviestin ajastaa?",
      a: "Voi. Valitse ”Lähetä kampanja” -vaiheessa ”Lähetä nyt” -vaihtoehdon sijaan ”Ajasta” ja aseta päivä ja kellonaika, jolloin haluat viestin lähtevän.",
    },
    {
      q: "Mistä tiedän, avasivatko asiakkaat salongin viestin?",
      a: "Avaa ”Markkinointi”-kohdan ”Kampanjat”-välilehti. Jokaisen lähetetyn kampanjan kohdalla näkyvät avaukset ja klikkaukset.",
    },
  ],
  related: ["khach-hang", "the-tich-diem", "the-khach-quen", "fanpage"],
};

export default article;
