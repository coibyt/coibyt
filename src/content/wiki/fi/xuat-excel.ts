import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/xuat-excel/${name}.webp`;
const shot = (name: string) => `/wiki/xuat-excel/fi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "salongin-myyntiraportti-exceliin",
  lesson: "xuat-excel",
  category: "salon",
  title: "Salongin myyntiraportti Exceliin: lataa tulotaulukko, asiakaslista ja tilaukset koneelle",
  metaTitle: "Salongin myyntiraportti Exceliin ja asiakaslista CSV:nä",
  metaDescription:
    "Näin lataat salongin tulotaulukon, asiakaslistan ja tuotetilaukset VaraaAista Excel-tiedostoina kirjanpitäjälle ja pidät asiakkaiden tiedot yksityisinä.",
  keyword: "salongin myyntiraportti Exceliin",
  keywords: [
    "tulot Excel-taulukkoon",
    "asiakaslista Exceliin",
    "tilausten vienti CSV-tiedostoon",
    "luvut kirjanpitäjälle kuun lopussa",
    "myynti työntekijöittäin Excelissä",
    "mitä salongin tulotaulukossa on",
  ],
  excerpt: "Kolme latauspainiketta on kolmessa paikassa: Tulojen hallinta, Asiakkaat ja Tilaukset. Valitse ensin oikea jakso ja ryhmä, sillä tiedostossa on juuri se, mitä katsot.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("chu-salon-va-khach-ben-quay-da-cam-thach"),
    alt: "Pikkutakkiin pukeutunut mies ja valkopuseroinen nainen nauravat marmoritiskin ääressä suuren kukkamaljakon vieressä, naisella on puhelin kädessään",
  },
  takeaways: [
    "Tulot ladataan ”Tulojen hallinnasta”: valitse jakso, paina **”Taulukko”** ja sitten **”Lataa (Excel)”**.",
    "Tulotiedostossa on **rivi jokaista varausta kohti**, käteinen, pankki, MobilePay, lahjakortti ja tipit omissa sarakkeissaan sekä summarivi jokaisen työntekijän alla.",
    "Asiakastiedostossa on **juuri valitsemasi ryhmä**. Jos haluat kaikki, valitse ”Kaikki” ennen kuin painat ”Vie Exceliin (CSV)”.",
    "Myös ”Tilaukset”-sivulla on ”Vie Exceliin (CSV)” -painike, kun salongilla on tuotetilauksia.",
    "Tiedostoissa on asiakkaiden nimiä ja puhelinnumeroita. **Lähetä ne vain niitä todella tarvitseville**, esimerkiksi kirjanpitäjälle.",
  ],
  intro: [
    "Kuun lopussa salongin omistaja tarvitsee salongin myyntiraportin Exceliin yleensä kahdesta syystä: kirjanpitäjä pyytää lukuja, tai haluat itse laskea asioita omalla tavallasi. VaraaAista voit ladata tulot, asiakaslistan ja tilaukset, ja tiedostot aukeavat suoraan Excelissä.",
    "Tämä artikkeli seuraa VaraaAi Academyn oppituntia ”Excel-viennit: tulot, asiakkaat, tilaukset”. Luettuasi tiedät, missä kolme latauspainiketta ovat, mitä kukin tiedosto sisältää ja mitä pitää valita ennen painamista, jotta tiedostossa on juuri se, mitä tarvitset.",
  ],
  sections: [
    {
      id: "miksi-vienti",
      title: "Milloin salongin luvut kannattaa ladata omalle koneelle",
      blocks: [
        { p: "Hallintapaneeli näyttää tulot ja asiakkaat jo näytöllä. On kuitenkin töitä, joita näyttö ei tee puolestasi." },
        {
          ul: [
            "**Luvut kirjanpitäjälle kuun lopussa.** Kirjanpitäjä ei tarvitse tunnuksia salonkiisi. Hän tarvitsee tiedoston, jossa jokainen maksu on eriteltynä maksutavan mukaan.",
            "**Omat laskelmat.** Excelissä voit lisätä sarakkeita, suodattaa ja laskea summia omalla tavallasi, mihin valmis raporttisivu ei taivu.",
            "**Kopio jokaisesta jaksosta.** Lataa tulotaulukko kerran kuussa ja tallenna se kansioon, niin se löytyy, kun jotain pitää myöhemmin tarkistaa.",
          ],
        },
        { p: "Tiedosto on vain niin tarkka kuin järjestelmän luvut. Tulot syntyvät raporteista, jotka työntekijät tekevät jokaisesta varauksesta, kuten ohjeessa [työntekijöiden tuloraporteista](lesson:doanh-thu-nhan-vien) kerrotaan. Käy siksi jakson raportit läpi ennen kuin lataat ja lähetät taulukon." },
      ],
    },
    {
      id: "kolme-tiedostoa",
      title: "Kolme ladattavaa tiedostoa: tulot, asiakaslista ja tilaukset",
      blocks: [
        { p: "Jokainen tietotyyppi on hallintapaneelin omalla sivullaan, ja jokaisella on oma latauspainikkeensa:" },
        {
          table: {
            head: ["Tieto", "Mihin menet, mitä painat", "Mitä tiedostossa on"],
            rows: [
              ["Tulot", "”Tulojen hallinta”, valitse jakso, paina ”Taulukko” ja sitten ”Lataa (Excel)”", "Rivi jokaista varausta kohti ja summarivi jokaisen työntekijän alla"],
              ["Asiakkaat", "”Asiakkaat”, valitse ryhmä ja paina ”Vie Exceliin (CSV)”", "Valitun ryhmän nimet, puhelinnumerot, käyntimäärät ja ostot yhteensä"],
              ["Tilaukset", "”Tilaukset” ja ”Vie Exceliin (CSV)”", "Salongin tuotetilaukset"],
            ],
          },
        },
        { note: "”Asiakkaat”- ja ”Tilaukset”-sivujen painikkeissa lukee ”Vie Exceliin (CSV)”. CSV on yksinkertainen taulukkomuoto, jonka Excel ja muut taulukko-ohjelmat avaavat ongelmitta.", kind: "info", title: "Mikä CSV on" },
      ],
    },
    {
      id: "tulotaulukon-sisalto",
      title: "Mitä salongin tulotaulukossa on",
      blocks: [
        { p: "Näet taulukon näytöllä ennen latausta. ”Taulukko”-näkymä ryhmittelee varaukset työntekijöittäin: ylhäällä nimi, sitten rivi jokaisesta varauksesta päivineen, asiakkaineen ja palveluineen, ja lopuksi ”Yhteensä”-rivi. Pieni rivi taulukon yläpuolella muistuttaa, että napauttamalla riviä näet päivän varaukset." },
        { img: { src: shot("tulotaulukko-tyontekijoittain"), alt: "Työntekijä Emman tulotaulukko sarakkeineen Päivä, Asiakas ja Palvelu, yksi Gel manicure -varaus ja Yhteensä-rivi korostettuna kultaisella", caption: "”Taulukko”-näkymä: lohko jokaiselle työntekijälle, rivi jokaiselle varaukselle ja ”Yhteensä”-rivi lohkon lopussa." } },
        { p: "Ladattu Excel-tiedosto säilyttää saman rakenteen ja lisää sen, mitä kirjanpitäjä tarvitsee eniten: summat eriteltyinä maksutavan mukaan." },
        {
          table: {
            head: ["Tiedostossa", "Mihin se on hyvä"],
            rows: [
              ["Rivi jokaista varausta kohti", "Jokaisen maksun täsmäyttämiseen kirjanpitoon tai tiliotteeseen"],
              ["Käteinen, pankki, MobilePay ja lahjakortti omissa sarakkeissaan", "Tiedät, mikä on kassassa ja mikä jo tilillä"],
              ["Tipit omassa sarakkeessaan", "Jokaisen tipit lasketaan helposti kuun lopussa"],
              ["Summarivi jokaisen työntekijän alla", "Näet, paljonko kukin keräsi jakson aikana"],
            ],
          },
        },
        { p: "Tiedoston maksutapa on se, joka valittiin asiakkaan maksaessa. Jos kassalla valitaan väärä maksutapa, myös tiedosto on väärin, joten maksuvaihe ohjeessa [maksu ja lasku kassalla](lesson:thanh-toan-hoa-don) kannattaa tehdä huolella." },
      ],
    },
    {
      id: "asiakaslista-exceliin",
      title: "Asiakaslista Exceliin: valitse ryhmä ensin",
      blocks: [
        { p: "Tässä on helpointa erehtyä. ”Asiakkaat”-sivun ”Vie Exceliin (CSV)” -painike ei oletuksena lataa kaikkia asiakkaita. Se lataa **juuri sen ryhmän, joka on valittuna** yläpuolen painikeriviltä, esimerkiksi ”Kaikki”, ”Uudet” tai ”Eivät ole palanneet”." },
        { p: "Tästä on hyötyä, kun tarvitset vain yhden ryhmän. Valitse ”Eivät ole palanneet” ja vie, niin sinulla on lista asiakkaista, jotka kannattaa kutsua takaisin. Tiedoston jokaisella rivillä on nimi, puhelinnumero, käyntien määrä ja ostot yhteensä." },
        { p: "Asiakasryhmät selitetään tarkemmin ohjeessa [asiakasrekisteristä](lesson:khach-hang). Jos tarkoitus on lähettää ryhmälle tarjous, tiedostoa ei tarvita lainkaan: vientipainikkeen vieressä on ”Lähetä viesti ryhmälle”, ja viestin kirjoittamisesta kerrotaan ohjeessa [markkinointisähköposteista](lesson:email-marketing)." },
        { note: "Katso ryhmäpainikkeita vielä kerran ennen kuin painat vientiä. Korostettu ryhmä päätyy tiedostoon. Jos haluat kaikki asiakkaat, napauta ensin ”Kaikki”.", kind: "tip", title: "Tarkista valittu ryhmä" },
      ],
    },
    {
      id: "tiedot-yksityisina",
      title: "Pidä asiakastietoja sisältävät tiedostot yksityisinä",
      blocks: [
        { p: "Hallintapaneelissa tiedot ovat salongin kirjautumisen takana. Ladattuna tiedosto menettää tämän suojan: kuka tahansa, jolla tiedosto on, voi lukea asiakkaiden nimet ja puhelinnumerot." },
        { note: "Tiedostoissa on asiakkaiden tietoja. Lähetä ne vain niitä todella tarvitseville, esimerkiksi kirjanpitäjälle. Älä julkaise niitä somessa äläkä lähetä asiakkaille.", kind: "warn", title: "Oppitunnin muistutus" },
        { p: "Muistutuksesta seuraa muutama hyvä tapa:" },
        {
          ul: [
            "Jos kirjanpitäjä tarvitsee vain tulotaulukon, lähetä vain se, älä asiakaslistaa sen mukana.",
            "Lähetä tiedosto yhdelle nimetylle vastaanottajalle, älä salongin yhteiseen ryhmächattiin.",
            "Jos lataat salongin yhteisellä koneella, poista tiedosto latauskansiosta, kun et enää tarvitse sitä.",
          ],
        },
      ],
    },
    {
      id: "arjen-tilanteet",
      title: "Tavallisia tilanteita Excel-viennissä",
      blocks: [
        {
          table: {
            head: ["Tilanne", "Mitä teet"],
            rows: [
              ["Et löydä painiketta ”Lataa (Excel)”", "Se on ”Tulojen hallinnassa” samalla rivillä kuin ”Taulukko” ja ”Lista”, jaksopainikkeiden alapuolella"],
              ["Tulotiedostosta puuttuvat kuun ensimmäiset päivät", "Tarkista valittu jakso, esimerkiksi ”Tämä kuukausi”, ja lataa uudelleen"],
              ["Asiakastiedostossa on vähemmän ihmisiä kuin odotit", "Valittuna on pieni ryhmä. Napauta ”Kaikki” ja vie uudelleen"],
              ["”Tilaukset”-sivulla ei ole mitään vietävää", "Tilaustiedostossa on sisältöä vasta, kun salongilla on tuotetilauksia"],
            ],
          },
        },
        { img: { src: shot("tilaukset-vie-exceliin-csv"), alt: "Tuotetilaukset-sivu, jossa Vie Exceliin (CSV) -painike on korostettu kultaisella hakukentän alla ja vahvistetun 18,00 euron tilauksen yläpuolella", caption: "”Tilaukset”-sivulla ”Vie Exceliin (CSV)” on heti hakukentän alla, tilauslistan yläpuolella." } },
        { p: "Jos salonki ei vielä myy tuotteita, kolmatta tiedostoa ei tarvita. Kun haluat avata pienen kaupan salongin sivulle, ohje [tuotemyynnistä ja tilausten hallinnasta](lesson:san-pham-don-hang) näyttää, miten tuotteet lisätään ja tilaukset käsitellään." },
      ],
    },
  ],
  howTo: {
    title: "Salongin myyntiraportti Exceliin vaihe vaiheelta, asiakaslista ja tilaukset mukaan lukien",
    id: "excel-viennin-vaiheet",
    after: "kolme-tiedostoa",
    lead: "Kuusi vaihetta kulkevat hallintapaneelin kolmen sivun läpi oppituntivideon järjestyksessä.",
    steps: [
      {
        name: "Avaa ”Tulojen hallinta” ja valitse jakso",
        text: "Napauta hallintapaneelissa ”Tulojen hallinta”. Valitse ylimmältä painikeriviltä tarvitsemasi jakso, esimerkiksi ”Tämä kuukausi”. Tiedostoon tulevat vain tämän jakson varaukset, joten valitse se ennen seuraavaa vaihetta.",
        image: { src: shot("valitse-jakso-tama-kuukausi"), alt: "Tulojen hallinta -sivu, jossa Tämä kuukausi -painike on korostettu kultaisella rivillä Tänään, 7 päivää ja Tämä kuukausi" },
      },
      {
        name: "Paina ”Taulukko”",
        text: "Paina ”Taulukko”. Näkymä vaihtuu taulukoksi, jossa jokainen varaus on työntekijänsä alla ja lopussa on summarivi. Silmäile se läpi ja varmista, että jakson luvut ovat täydelliset.",
        image: { src: shot("paina-taulukko"), alt: "Tulojen hallinnan painikkeet Lataa (Excel), Taulukko ja Lista, joista Taulukko on korostettu kultaisella" },
      },
      {
        name: "Paina ”Lataa (Excel)”",
        text: "Paina ”Lataa (Excel)” heti ”Taulukko”-painikkeen vasemmalla puolella. Tiedosto latautuu heti ja aukeaa Excelissä. Jokainen varaus on omalla rivillään, ja jokaisen työntekijän alla on summarivi.",
        image: { src: shot("lataa-excel-painike"), alt: "Lataa (Excel) -painike korostettuna kultaisella työntekijä Emman tulotaulukon yläpuolella, jossa on yksi Gel manicure -varaus" },
      },
      {
        name: "Avaa ”Asiakkaat” ja valitse ryhmä",
        text: "Napauta ”Asiakkaat”. Napauta ryhmäpainikkeista sitä ryhmää, jonka haluat ladata, esimerkiksi ”Kaikki”, ”Uudet” tai ”Eivät ole palanneet”. Tiedostossa on juuri tämä ryhmä, joten älä ohita valintaa.",
        image: { src: shot("valitse-asiakasryhma-ennen-vientia"), alt: "Asiakkaat-sivu, jossa ryhmäpainikkeet Kaikki, VIP ja Kanta-asiakkaat on korostettu kultaisella, alla hakukenttä ja Vie Exceliin (CSV) -painike" },
      },
      {
        name: "Paina ”Vie Exceliin (CSV)”",
        text: "Paina hakukentän alla olevaa ”Vie Exceliin (CSV)”. Ladatussa listassa on valitun ryhmän jokaisen asiakkaan nimi, puhelinnumero, käyntien määrä ja ostot yhteensä.",
        image: { src: shot("asiakkaat-vie-exceliin-csv"), alt: "Vie Exceliin (CSV) -painike korostettuna kultaisella Asiakkaat-sivulla heti kultaisen Lähetä viesti ryhmälle -painikkeen yläpuolella" },
      },
      {
        name: "Avaa ”Tilaukset” ja paina ”Vie Exceliin (CSV)”",
        text: "Kun salongilla on tuotetilauksia, napauta ”Tilaukset”, niin ”Tuotetilaukset”-sivu aukeaa. Vieritä hakukenttään asti ja paina heti sen alla olevaa ”Vie Exceliin (CSV)”, niin tilauslista latautuu koneellesi.",
        image: { src: shot("tuotetilaukset-sivu"), alt: "Tuotetilaukset-sivu, jossa Tilaukset-välilehti on valittuna Tuotteiden ja Varaston välissä ja otsikko Tuotetilaukset on korostettu kultaisella" },
      },
    ],
  },
  faq: [
    {
      q: "Missä VaraaAin tulojen Excel-latauspainike on?",
      a: "”Lataa (Excel)” -painike on ”Tulojen hallinnassa”. Valitse jakso, paina ”Taulukko” nähdäksesi varaukset työntekijöittäin ja paina sitten ”Lataa (Excel)”, niin tiedosto latautuu koneellesi.",
    },
    {
      q: "Mitä salongin tulojen Excel-tiedostossa on?",
      a: "Jokainen varaus on omalla rivillään. Summat on eritelty käteiseen, pankkiin, MobilePayhin, lahjakorttiin ja tippeihin. Jokaisen työntekijän alla on summarivi.",
    },
    {
      q: "Keitä viedyssä asiakaslistassa on?",
      a: "Juuri se ryhmä, joka on valittuna ”Asiakkaat”-sivulla, kun painat ”Vie Exceliin (CSV)”. Jos haluat ladata kaikki asiakkaat, valitse ensin ryhmä ”Kaikki”.",
    },
    {
      q: "Mitä sarakkeita asiakaslistassa on?",
      a: "Siinä on jokaisen asiakkaan nimi, puhelinnumero, käyntien määrä ja ostot yhteensä. Koska tiedostossa on yhteystietoja, se on pidettävä yksityisenä.",
    },
    {
      q: "Voinko viedä tuotetilaukset Exceliin?",
      a: "Voit. Kun salongilla on tuotetilauksia, avaa ”Tilaukset” ja paina ”Vie Exceliin (CSV)”, niin tilauslista latautuu koneellesi.",
    },
    {
      q: "Kenelle salongin Excel-tiedostot kannattaa lähettää?",
      a: "Vain niille, jotka niitä todella tarvitsevat, esimerkiksi kirjanpitäjälle. Tiedostoissa on asiakkaiden nimiä ja puhelinnumeroita, joten älä julkaise niitä somessa äläkä jaa niitä laajalti.",
    },
  ],
  related: ["doanh-thu-nhan-vien", "khach-hang", "thanh-toan-hoa-don", "san-pham-don-hang"],
};

export default article;
