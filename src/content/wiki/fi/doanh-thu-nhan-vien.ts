import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/doanh-thu-nhan-vien/${name}.webp`;
const shot = (name: string) => `/wiki/doanh-thu-nhan-vien/fi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "myynnin-seuranta-tyontekijoittain-salongissa",
  lesson: "doanh-thu-nhan-vien",
  category: "salon",
  title: "Myynnin seuranta työntekijöittäin: tekijä raportoi jokaisen asiakkaan jälkeen, omistaja hyväksyy ja näkee summat ja tipit",
  metaTitle: "Myynnin seuranta työntekijöittäin salongissa, tipit mukana",
  metaDescription:
    "Työntekijöiden tuloraportit VaraaAissa: tekijä kirjaa perimänsä summan jokaisen asiakkaan jälkeen, ja omistaja vertaa, hyväksyy ja näkee summat tekijöittäin.",
  keyword: "myynnin seuranta työntekijöittäin",
  keywords: [
    "salongin tulot työntekijöittäin",
    "työntekijän tuloraportti",
    "kynsiteknikon provisio myynnistä",
    "tippien seuranta kauneushoitolassa",
    "käteisen ja korttimaksujen täsmäytys illalla",
    "salongin tulojen hallinta",
    "muistuta henkilökuntaa raportoimaan",
  ],
  excerpt: "Tekijä painaa jokaisen asiakkaan jälkeen ”Raportoi tulot” ja kirjaa summan oikeaan kenttään. Omistaja avaa ”Tulojen hallinta” -sivun, vertaa perittävään ja hyväksyy.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-tra-tien-tai-quay-salon-voi-nhan-vien"),
    alt: "Vaaleahiuksinen neulepuseroon pukeutunut mies ja puhelinta pitelevä ruskeahiuksinen nainen nauravat yhdessä vaalean puutiskin ääressä salongin suuren ikkunan vieressä",
  },
  takeaways: [
    "Tekijä raportoi heti jokaisen asiakkaan jälkeen: hän avaa varauksen ”Varaukset”-sivulla ja painaa **”Raportoi tulot”**.",
    "Summa kirjataan oikeaan kenttään: käteinen, pankki tai kortti, MobilePay, verkossa etukäteen tai lahjakortti. **”Täytä”**-painike syöttää koko summan.",
    "**Tippi kuuluu työntekijälle**: sitä ei lisätä salongin tuloihin, vaan se lasketaan vain kuukauden tippiyhteenvetoon.",
    "Omistaja avaa **”Tulojen hallinta”** -sivun, vertaa jokaista raporttia perittävään ja painaa ”Hyväksy” tai ”Älä hyväksy”, jolloin tekijä korjaa raportin.",
    "Osio **”Työntekijöittäin”** näyttää, paljonko kukin otti vastaan valitulla jaksolla.",
  ],
  intro: [
    "Myynnin seuranta työntekijöittäin kärjistyy yhteen kysymykseen päivän päätteeksi: paljonko kukin tekijä otti vastaan, ja oliko se käteistä vai korttia? Kun maksuja ottaa vastaan kolme tai neljä ihmistä, kassalaatikon käteinen, tilin rahat ja jokaisen muistikuva harvoin täsmäävät itsestään. Ratkaisu on kirjata jokainen maksu heti sen tapahtuessa, ja kirjaajana on se, joka maksun juuri otti.",
    "Tämä artikkeli seuraa VaraaAi Academyn oppituntia ”Työntekijöiden tuloraportit”. Näet, miten tekijä raportoi varauksen, miten omistaja hyväksyy sen, missä tipit lasketaan ja miten luet kunkin tekijän tulot valitulta jaksolta.",
  ],
  sections: [
    {
      id: "miksi-raportoida-heti",
      title: "Miksi tekijän kannattaa raportoida tulot jokaisen asiakkaan jälkeen",
      blocks: [
        { p: "Monessa salongissa tuttu tapa on, että sulkemisaikaan kaikki istuvat alas, jokainen lukee omat lukunsa ja omistaja laskee ne paperilla yhteen. Se nojaa kokonaan muistiin pitkän päivän jälkeen. Yksi asiakas, joka maksaa puolet käteisellä ja puolet kortilla, tai yksi lahjakortilla maksava riittää heittämään summan pieleen." },
        { p: "Kun raportti on sidottu varaukseen, tarkistaminen on helppoa. Varauksessa on jo perittävä summa. Tekijä kirjaa vain, mitä asiakas todella maksoi ja miten. Omistajan ei tarvitse kysellä keneltäkään, vaan hän katsoo ja hyväksyy." },
        { p: "Tapa on myös reilu tekijöille. Tipit kirjataan jokaiselle erikseen, ja kunkin jakson tulot ovat näytöllä valmiina, joten kenenkään ei tarvitse kiistellä vihon merkinnöistä." },
      ],
    },
    {
      id: "tuloraportin-kentat",
      title: "Mitä työntekijän tuloraportissa on",
      blocks: [
        { p: "Lomake aukeaa, kun tekijä painaa varauksen tiedoissa ”Raportoi tulot”. Ylimpänä ovat asiakkaan nimi, palvelu ja rivi ”Varauksen mukaan perittävä”. Sen alla on kenttä jokaiselle maksutavalle:" },
        {
          table: {
            head: ["Kenttä", "Mitä kirjaat"],
            rows: [
              ["”Käteismaksu”", "Asiakkaan antama käteinen"],
              ["”Pankki- / korttimaksu”", "Pankin tai kortin kautta maksettu summa"],
              ["”MobilePay-maksu”", "MobilePaylla maksettu summa"],
              ["”Maksettu verkossa etukäteen”", "Etukäteen verkossa maksettu summa ja ”Kanava”-kentässä paikka, jossa asiakas maksoi"],
              ["”Lahjakortti 1”, ”Lahjakortti 2”", "Lahjakortilla maksetut summat. ”Kortin koodi (valinnainen)” voi jäädä tyhjäksi"],
              ["”Tippi”", "Asiakkaan antama lisäraha, joka kuuluu tekijälle"],
              ["”Huomio”", "Kaikki selitystä vaativa, esimerkiksi vakioasiakkaan alennus"],
            ],
          },
        },
        { img: { src: shot("kateis-pankki-ja-mobilepay-maksu"), alt: "Tuloraportti, jossa ylhäällä Varauksen mukaan perittävä 80,00 € ja kultaisella korostetut kentät Käteismaksu, Pankki- / korttimaksu ja MobilePay-maksu, joissa kussakin on Täytä-painike", caption: "Jokaisessa kentässä on ”Täytä”-painike, joka syöttää koko perittävän summan." } },
        { p: "Jos asiakas maksoi kahdella tavalla, tekijä täyttää kaksi kenttää. ”Yhteensä”-rivi laskee ne itse yhteen, ja kun summa vastaa perittävää, rivillä lukee ”Täsmää perittävään”. Näin tekijä huomaa omat näppäilyvirheensä ennen lähettämistä." },
        { img: { src: shot("maksettu-verkossa-etukateen-ja-lahjakortit"), alt: "Raportin alaosa, jossa Maksettu verkossa etukäteen -kenttä Kanava-kenttineen sekä Lahjakortti 1 ja Lahjakortti 2 valinnaisine kortin koodeineen ja alennusvaihtoehtoineen" } },
      ],
    },
    {
      id: "tipit",
      title: "Tippien seuranta: kirjataan erikseen, ei salongin tuloihin",
      blocks: [
        { p: "Jos asiakas antoi tippiä, tekijä kirjaa sen kenttään ”Tippi”. Kentän alla oleva rivi kertoo säännön: kyse on tekijän omasta tipistä, sitä ei lisätä salongin tuloihin, ja sitä käytetään kuukauden tippiyhteenvetoon." },
        { img: { src: shot("tippi-ei-salongin-tuloihin"), alt: "Yhteensä-rivi 80,00 € ja Täsmää perittävään, alla kultaisella korostettu Tippi-kenttä ja huomautus, ettei tippiä lisätä salongin tuloihin" } },
        { p: "Tippien erottamisesta tuloista on kaksi hyötyä. Salongin tuloja eivät paisuta rahat, jotka eivät kuulu salongille. Ja jokaisella tekijällä on selvä kuukauden tippisumma ilman omaa kirjanpitoa. Omistajan sivulla tipeillä on oma laatikkonsa tulojen summien vieressä." },
        { note: "Tippien kirjaaminen ja ilmoittaminen vaihtelevat maittain. Oppitunti käsittelee vain niiden tilastointia sovelluksessa. Tippien verotuksesta kysy kirjanpitäjältä salonkisi toimintamaassa.", kind: "warn", title: "Tippien säännöt riippuvat maasta" },
      ],
    },
    {
      id: "omistaja-hyvaksyy",
      title: "Omistaja tarkistaa ja hyväksyy raportit ”Tulojen hallinta” -sivulla",
      blocks: [
        { p: "Omistajan osuus on ”Tulojen hallinta”. Ylimpänä ovat valitun jakson laatikot. Niiden alla on jokainen tekijöiden lähettämä raportti." },
        {
          table: {
            head: ["Laatikko", "Merkitys"],
            rows: [
              ["Yhteensä", "Kaikkien raporttien summa ja raporttien määrä"],
              ["Hyväksytty", "Summa, jonka olet tarkistanut ja hyväksynyt"],
              ["Odottaa", "Tekijöiden raportoima summa, joka odottaa sinua"],
              ["Ei hyväksytty, korjattavaa", "Takaisin korjattavaksi lähettämiesi raporttien summa"],
              ["Tipit", "Tekijöiden kirjaamat tipit, joita ei lasketa tuloihin"],
            ],
          },
        },
        { img: { src: shot("tulojen-hallinta-yhteensa-hyvaksytty"), alt: "Tulojen hallinnan yläosa, jossa laatikot Yhteensä 195,00 €, Hyväksytty 115,00 €, Odottaa 80,00 € ja Ei hyväksytty on korostettu kultaisella ja alla on Tipit 0,00 €" } },
        { p: "Jokaisessa raportissa näkyvät asiakas, palvelu, tekijä, maksutavoittain kirjatut summat ja perittävä summa. Vertaa niitä, ja jos ne täsmäävät, paina ”Hyväksy”. Summa siirtyy laatikosta ”Odottaa” laatikkoon ”Hyväksytty”." },
        {
          table: {
            head: ["Painike", "Milloin käytät"],
            rows: [
              ["”Hyväksy”", "Raportoitu summa vastaa perittävää ja todella saamiasi rahoja"],
              ["”Älä hyväksy”", "Summa on väärä. Raportti palaa tekijälle päivitettäväksi"],
              ["”Hyväksy kaikki … odottavaa”", "Olet käynyt kaiken läpi ja kaikki odottavat raportit ovat oikein"],
            ],
          },
        },
        { img: { src: shot("ala-hyvaksy-raporttia"), alt: "Odottaa hyväksyntää -tilassa oleva raportti, jossa Älä hyväksy -painike on korostettu kultaisella Päivitä raportti- ja vihreän Hyväksy-painikkeen vieressä", caption: "”Älä hyväksy” palauttaa raportin tekijälle korjattavaksi." } },
        { note: "Kaikkien raporttien hyväksyminen kerralla on kätevää illalla, mutta vasta kun olet laskenut käteisen ja tarkistanut tilin. Hyväksyntä on omistajan vahvistus siitä, että luku on oikein.", kind: "tip", title: "Laske ensin, hyväksy sitten" },
      ],
    },
    {
      id: "tulot-tyontekijoittain",
      title: "Tulot työntekijöittäin ja provisiopalkan laskeminen",
      blocks: [
        { p: "Osio ”Työntekijöittäin” listaa jokaisen tekijän, hänen raporttiensa määrän ja hänen valitulla jaksolla vastaanottamansa summan. Moni omistaja tarvitsee juuri tätä lukua, koska monessa salongissa tekijän palkka on sidottu hänen tuomaansa myyntiin." },
        { img: { src: shot("tulot-tyontekijoittain"), alt: "Kultaisella korostettu Työntekijöittäin-osio, jossa Sofia 80,00 €, Léa 70,00 € ja Emma 45,00 €, jokaisella yksi raportti, ja alla Muistuta henkilökuntaa raportoimaan -kortti" } },
        { p: "Oppitunnilla ei näytetä automaattista palkan tai provision laskentaa. Sivu antaa luotettavan perusluvun: kunkin tekijän jakson aikana vastaanottaman summan, kun olet tarkistanut ja hyväksynyt raportit. Siihen sovellat salongin ja tekijän sopimaa jakoa. Tipit eivät sisälly lukuun, koska ne kirjataan erikseen." },
        { p: "Luku on oikein vain, kun jokainen varaus raportoidaan, joten kytke päälle ”Muistuta henkilökuntaa raportoimaan”. Kun se on päällä ja varaus on päättynyt yli 24 tuntia sitten ilman raporttia, sovellus muistuttaa tekijää." },
        { p: "Jos haluat siirtää luvut taulukkoon palkanlaskentaa tai kirjanpitäjää varten, voit ladata tulotaulukon Excel-tiedostona suoraan ”Tulojen hallinta” -sivulta, ja jokaisen tekijän alla on summarivi. Oppitunti [Excel-viennistä](lesson:xuat-excel) näyttää, miten." },
      ],
    },
    {
      id: "tavallisia-tilanteita",
      title: "Tavallisia tilanteita tekijäkohtaisessa myynnin seurannassa",
      blocks: [
        {
          table: {
            head: ["Tilanne", "Mitä teet"],
            rows: [
              ["Asiakas maksoi osan käteisellä, osan kortilla", "Tekijä kirjaa kaksi summaa kahteen kenttään. ”Yhteensä” laskee ne yhteen"],
              ["Asiakas maksoi jo verkossa", "Kirjaa summa kenttään ”Maksettu verkossa etukäteen”"],
              ["Asiakas antoi tippiä", "Kirjaa se kenttään ”Tippi”, ei maksukenttiin"],
              ["Raportti ei vastaa saatuja rahoja", "Omistaja painaa ”Älä hyväksy”, ja tekijä korjaa raportin"],
              ["Tekijät unohtavat raportoida", "Kytke päälle ”Muistuta henkilökuntaa raportoimaan”"],
              ["Tarvitset todisteen tilisiirrosta", "Tekijä kuvaa kuitin ja liittää sen raporttiin"],
            ],
          },
        },
        { p: "Tuloraportti ja maksu kassalla ovat saman varauksen kaksi eri työtä. Maksu kassalla kirjaa maksun ja tekee asiakkaalle laskun, katso ohje [kassa ja laskut kauneushoitolassa](lesson:thanh-toan-hoa-don). Tuloraportti on tekijän vahvistus omistajalle siitä, mitä rahaa hän käsitteli. Jotta tekijä voi avata varauksensa ja lähettää raportteja, hän tarvitsee tunnukset ja sopivat oikeudet, kuten ohjeessa [salongin henkilökunta ja käyttöoikeudet](lesson:nhan-vien) kerrotaan." },
        { p: "Molemmat alkavat kalenterista, joten jos salongissa ei vielä ole totuttu käyttämään sitä päivittäin, lue ensin ohje [kampaamon ajanvarausohjelma](lesson:lich-hen). Salongin kokonaiskuva ajan mittaan löytyy [Yleiskatsaus](lesson:tong-quan)-sivulta." },
      ],
    },
  ],
  howTo: {
    title: "Tulojen raportointi ja hyväksyntä työntekijöittäin VaraaAissa",
    id: "raportoinnin-ja-hyvaksynnan-vaiheet",
    after: "miksi-raportoida-heti",
    lead: "Kolme ensimmäistä vaihetta ovat tekijän työtä jokaisen asiakkaan jälkeen. Kolme viimeistä kuuluvat omistajalle oppituntivideon järjestyksessä.",
    steps: [
      {
        name: "Tekijä avaa varauksen ja painaa ”Raportoi tulot”",
        text: "Kun asiakas on valmis, tekijä avaa varauksen ”Varaukset”-sivulla ja painaa ”Raportoi tulot”. Tuloraportti aukeaa, ja ylimpänä on varauksen mukaan perittävä summa. Koska raportti kuuluu juuri tähän varaukseen, se on helppo tarkistaa.",
        image: { src: shot("raportoi-tulot-varauksessa"), alt: "Varauksen tiedot, joissa Yhteensä (perittävä) 55,00 € ja kultaisella korostettu Raportoi tulot -painike tekstin Syötä tähän asiakkaalta saamasi summa vieressä" },
      },
      {
        name: "Kirjaa asiakkaan maksama summa oikeaan kenttään",
        text: "Kirjaa summa vastaavaan kenttään: käteinen, pankki tai kortti tai MobilePay. ”Täytä” syöttää koko summan kerralla. Verkossa etukäteen tai lahjakortilla maksetuille on omat kenttänsä. Tarkista, että ”Yhteensä”-rivillä lukee ”Täsmää perittävään”.",
        image: { src: shot("yhteensa-tasmaa-perittavaan"), alt: "Yhteensä-rivi 80,00 € ja teksti Täsmää perittävään korostettuna kultaisella, yllä Lahjakortti 2 -kenttä ja alla Tippi-kenttä" },
      },
      {
        name: "Lisää ”Tippi” ja huomio ja paina ”Lähetä raportti”",
        text: "Jos asiakas antoi tippiä, kirjaa se kenttään ”Tippi”. Raporttiin voi lisätä myös huomion ja kuvan kuitista. Paina sitten ”Lähetä raportti”. Raportti jää odottamaan omistajan hyväksyntää.",
        image: { src: shot("laheta-tuloraportti"), alt: "Tuloraportin loppu, jossa Yhteensä-rivi, Tippi- ja Huomio-kentät sekä kultaisella korostettu Lähetä raportti -painike Sulje-painikkeen vieressä" },
      },
      {
        name: "Omistaja avaa ”Tulojen hallinta”",
        text: "Napauta ”Tulojen hallinta”. Ylhäällä ovat vastaanotetut tulot yhteensä, hyväksytyt, odottavat ja tipit. Alempana on jokainen tekijöiden lähettämä raportti.",
      },
      {
        name: "Vertaa ja paina ”Hyväksy” tai ”Älä hyväksy”",
        text: "Vertaa jokaisen raportin summaa perittävään ja paina ”Hyväksy”. Jos summa on väärä, paina ”Älä hyväksy”, niin tekijä voi korjata sen. Nopeammin käy kaikkien hyväksyntäpainikkeella. Hyväksytty summa siirtyy kohtaan ”Hyväksytty”.",
        image: { src: shot("vertaa-raporttia-perittavaan"), alt: "Kultaisella korostettu odottava raportti: Anna Müller, Classic lashes, käteismaksu 80,00 €, perittävä 80,00 € sekä Hyväksy- ja Älä hyväksy -painikkeet" },
      },
      {
        name: "Katso ”Työntekijöittäin” ja kytke muistutus päälle",
        text: "Vieritä osioon ”Työntekijöittäin” nähdäksesi, paljonko kukin otti vastaan jaksolla. Heti alla kytke päälle ”Muistuta henkilökuntaa raportoimaan”: kun varaus on päättynyt yli 24 tuntia sitten ilman raporttia, sovellus muistuttaa tekijää.",
        image: { src: shot("muistuta-henkilokuntaa-raportoimaan"), alt: "Kultaisella korostettu Muistuta henkilökuntaa raportoimaan -kortti, jonka kytkin on pois päältä, ja selitys yli 24 tuntia sitten päättyneistä raportoimattomista varauksista" },
      },
    ],
  },
  faq: [
    {
      q: "Missä tekijä raportoi vastaanottamansa rahat?",
      a: "Hän avaa asiakkaan varauksen ”Varaukset”-sivulla ja painaa ”Raportoi tulot”. Raportti on sidottu tähän varaukseen, joten omistaja voi helposti verrata sitä perittävään summaan.",
    },
    {
      q: "Lisätäänkö tipit salongin tuloihin?",
      a: "Ei lisätä. Tipit kuuluvat tekijälle, eikä niitä lisätä salongin tuloihin. Ne kirjataan vain kuukauden tippiyhteenvetoa varten.",
    },
    {
      q: "Mitä omistaja tekee, jos raportin summa on väärä?",
      a: "Paina raportin kohdalla ”Älä hyväksy”. Hyväksymätön raportti palaa tekijälle päivitettäväksi, ja sen jälkeen tarkistat sen uudelleen ja hyväksyt.",
    },
    {
      q: "Miten näen, paljonko kukin tekijä otti vastaan tässä kuussa?",
      a: "Avaa ”Tulojen hallinta” ja katso osiota ”Työntekijöittäin”. Se näyttää, paljonko kukin otti vastaan valitulla jaksolla, ja hänen raporttiensa määrän.",
    },
    {
      q: "Miten raportoidaan asiakas, joka maksoi puoliksi käteisellä ja kortilla?",
      a: "Tekijä kirjaa kummankin summan omaan kenttäänsä, käteisen osan kenttään ”Käteismaksu” ja loput kenttään ”Pankki- / korttimaksu”. ”Yhteensä” laskee ne yhteen ja kertoo, kun summa täsmää perittävään.",
    },
    {
      q: "Entä jos tekijät unohtavat raportoida?",
      a: "Kytke ”Tulojen hallinta” -sivulla päälle ”Muistuta henkilökuntaa raportoimaan”. Kun se on päällä ja varaus on päättynyt yli 24 tuntia sitten ilman raporttia, sovellus muistuttaa tekijää.",
    },
  ],
  related: ["thanh-toan-hoa-don", "lich-hen", "xuat-excel", "nhan-vien"],
};

export default article;
