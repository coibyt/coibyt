import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/khach-hang/${name}.webp`;
const shot = (name: string) => `/wiki/khach-hang/fi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "kauneushoitolan-asiakasrekisteri",
  lesson: "khach-hang",
  category: "salon",
  title: "Kauneushoitolan asiakasrekisteri: asiakasryhmät, omat muistiinpanot ja jokaisen asiakkaan historia",
  metaTitle: "Kauneushoitolan asiakasrekisteri: ryhmät ja muistiinpanot",
  metaDescription:
    "Näin käytät VaraaAin asiakasrekisteriä kynsi-, ripsi-, hius- tai hoitolassa: tärkeimmät luvut, VIP- ja kanta-asiakkaat, poissa olleet ja omat muistiinpanot.",
  keyword: "kauneushoitolan asiakasrekisteri",
  keywords: [
    "salongin asiakasrekisteri",
    "asiakasrekisteri ohjelma kampaamolle",
    "asiakaskortti allergiat ja mieltymykset",
    "pitkään poissa olleet asiakkaat",
    "palaavien asiakkaiden osuus",
    "asiakkaan varaushistoria",
    "kynsistudion asiakaslista",
  ],
  excerpt: "Asiakasrekisteri syntyy varauksista itsestään. Suodata kuudella ryhmällä, vie tai lähetä viesti oikealle ryhmälle ja avaa asiakkaan profiili historiaa ja muistiinpanoja varten.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("hai-nguoi-phu-nu-om-chao-nhau-trong-salon"),
    alt: "Kaksi hymyilevää naista halaa toisiaan valoisassa salongissa, ja taustalla kaksi asiakasta istuu tuoleilla kahvikupit käsissään",
  },
  takeaways: [
    "Asiakasrekisteri **syntyy salongin varauksista itsestään**. Mitään ei tarvitse kirjata käsin.",
    "Tärkeimmät luvut ylhäällä: asiakkaat, uudet 30 päivässä, **palaavat asiakkaat** ja keskiostos asiakasta kohden.",
    "Kuusi ryhmää suodattamiseen: ”Kaikki”, ”VIP”, ”Kanta-asiakkaat”, ”Uudet”, ”Tuleva varaus” ja ”Eivät ole palanneet”.",
    "**”Oma muistiinpano”** näkyy vain salongille. Asiakas ei näe sitä koskaan.",
    "Ryhmä ”Eivät ole palanneet” ja painike ”Lähetä viesti ryhmälle” ovat nopein tapa kutsua vanhat asiakkaat takaisin.",
  ],
  intro: [
    "Kauneushoitolan asiakasrekisteri vastaa kolmeen arkiseen kysymykseen: ketkä ovat kanta-asiakkaitasi, kuka ei ole käynyt aikoihin ja kuka ostaa eniten. Pienessä salongissa vastaukset ovat yleensä omistajan muistissa, eikä muistia voi antaa uudelle työntekijälle. VaraaAin asiakasrekisteri kirjaa ne salongin omista varauksista.",
    "Tämä artikkeli seuraa VaraaAi Academyn oppituntia ”Asiakasrekisteri”. Opit lukemaan sivun yläreunan luvut, suodattamaan tarvitsemasi asiakasryhmän, avaamaan yhden asiakkaan profiilin ja päättämään, mitä muistiinpanoon kannattaa kirjoittaa.",
  ],
  sections: [
    {
      id: "syntyy-itsestaan",
      title: "Salongin asiakasrekisteri, jota ei tarvitse täyttää käsin",
      blocks: [
        { p: "Vastaanoton paperivihossa on kaksi heikkoutta. Se on ajan tasalla vain, jos joku jaksaa kirjoittaa, eikä se laske itse, montako kertaa asiakas on käynyt. Itse tehty taulukko on parempi, mutta senkin joku joutuu päivittämään jokaisen työpäivän jälkeen." },
        { p: "VaraaAin hallintapaneelin asiakasrekisteri syntyy varauksista. Jokainen salongissa varannut asiakas on rekisterissä, ja mukana on se, mitä varaukset ovat hänestä kirjanneet. Sinun tehtäväsi on pitää kalenteri todellisuuden mukaisena, kuten ohjeessa [ajanvarauskalenterista](lesson:lich-hen) kerrotaan: kun asiakas tulee, varaus merkitään valmiiksi, ja kun hän peruu, varaus perutaan." },
        { p: "Sivun otsikon alla oleva rivi kertoo rekisterin tarkoituksen: tiedät, keitä asiakkaasi ovat, kuinka usein he palaavat, mistä he pitävät ja ketkä eivät ole käyneet aikoihin." },
      ],
    },
    {
      id: "tarkeimmat-luvut",
      title: "Tärkeimmät luvut: asiakkaat, uudet, palaavien osuus ja keskiostos",
      blocks: [
        { p: "”Asiakkaat”-sivun yläosassa on lukuruutuja. Ne antavat nopean kuvan salongin tilanteesta ennen kuin katsot yksittäisiä asiakkaita." },
        { img: { src: shot("asiakasrekisterin-tarkeimmat-luvut"), alt: "Asiakasrekisterin lukuruudut kultaisella korostettuna: Asiakkaat, Uudet 30 pv, Palaavat asiakkaat, Keskiostos asiakasta kohden ja Eivät ole palanneet", caption: "Tärkeimmät luvut ovat heti otsikon ”Salongin asiakasrekisteri” alla." } },
        {
          table: {
            head: ["Luku", "Mitä se kertoo"],
            rows: [
              ["”Asiakkaat”", "Montako ihmistä salongin rekisterissä on"],
              ["”Uudet, 30 pv”", "Montako uutta asiakasta salonki sai viimeisen 30 päivän aikana"],
              ["”Palaavat asiakkaat”", "Tulevatko kerran käyneet asiakkaat takaisin, prosentteina"],
              ["Keskiostos asiakasta kohden", "Paljonko yksi asiakas keskimäärin ostaa salongista"],
              ["”Eivät ole palanneet”", "Montako asiakasta tässä ryhmässä on nyt"],
            ],
          },
        },
        { p: "Lue luvut rinnakkain. Paljon uusia asiakkaita ja pieni palaavien osuus tarkoittaa, että salonki houkuttelee ihmisiä mutta ei vielä pidä heitä, joten työ on hoitokokemuksessa tai asiakkaiden takaisin kutsumisessa. Hyvä palaavien osuus ja vähän uusia asiakkaita taas kertoo, että markkinointiin käytetty aika kannattaa." },
      ],
    },
    {
      id: "kuusi-ryhmaa",
      title: "Kuusi asiakasryhmää: VIP, kanta-asiakkaat, uudet ja pitkään poissa olleet",
      blocks: [
        { p: "Lukujen alla on rivi ryhmäpainikkeita. Napauta ryhmää, niin alla oleva lista näyttää vain siihen kuuluvat asiakkaat. Jokainen ryhmä vastaa eri kysymykseen:" },
        {
          table: {
            head: ["Ryhmä", "Käytä, kun haluat"],
            rows: [
              ["”Kaikki”", "Nähdä koko rekisterin tai ladata koko listan"],
              ["”VIP”", "Tietää tärkeimmät asiakkaasi ja huolehtia heistä henkilökohtaisesti"],
              ["”Kanta-asiakkaat”", "Tunnistaa säännöllisesti käyvät, joita kannattaa kiittää ja pitää"],
              ["”Uudet”", "Seurata ensikertalaisia ja nähdä, varaavatko he toisen kerran"],
              ["”Tuleva varaus”", "Nähdä etukäteen, ketkä ovat tulossa pian"],
              ["”Eivät ole palanneet”", "Löytää pitkään poissa olleet ja kutsua heidät takaisin"],
            ],
          },
        },
        { p: "Oppitunti ei kerro, montako käyntiä tai kuinka suuret ostot vievät asiakkaan ryhmään ”VIP” tai ”Kanta-asiakkaat”. Sinun ei tarvitse lajitella ketään itse: rekisteri syntyy varauksista, ja pieni luku ryhmän nimen vieressä kertoo, montako asiakasta ryhmässä on nyt." },
        { p: "Kun etsit yhtä tiettyä ihmistä, hakukenttä on suodatusta nopeampi. Kirjoita asiakkaan nimi, sähköposti tai puhelinnumero." },
        { img: { src: shot("hae-asiakasta-nimella-sahkopostilla-puhelimella"), alt: "Hakukenttä Hae nimellä, sähköpostilla tai puhelimella korostettuna kultaisella ryhmäpainikkeiden Kaikki, VIP ja Kanta-asiakkaat alla", caption: "Kun asiakas soittaa, kirjoita hänen nimensä tai numeronsa tähän ja löydät profiilin." } },
      ],
    },
    {
      id: "oma-muistiinpano",
      title: "Asiakaskortin muistiinpanot: mitä kirjoitat kohtaan ”Oma muistiinpano”",
      blocks: [
        { p: "Jokaisen asiakkaan profiilissa on vaaleankeltainen ruutu nimeltä ”Oma muistiinpano”. Otsikon alla oleva rivi sanoo sen suoraan: vain salonki näkee tämän, ei koskaan asiakas. Juuri tämä ruutu tekee nimilistasta tiedon, josta on hyötyä hoidon tekijälle." },
        { p: "Oppitunti ehdottaa kolmenlaista tietoa: allergiat, mieltymykset ja varaustottumukset. Tyhjän ruudun esimerkkiteksti näyttää oikealta muistiinpanolta: allerginen asetonille, pitää nude-sävyistä, varaa yleensä lauantai-iltapäivisin." },
        {
          ul: [
            "**Allergiat ja vältettävät asiat.** Tämä on tärkein muistiinpano, koska se suojaa asiakasta seuraavalla kerralla, vaikka hoidon tekisi toinen tekijä. Ohje [allergiasta geelilakalle, ripsiliimalle ja hiusvärille](lesson:di-ung-hoa-chat) kertoo, miksi asia pitää kirjata.",
            "**Mieltymykset.** Väri, jonka asiakas yleensä valitsee, tuttu kynsien muoto, ripsien taivutus tai lempijuoma. Asiakas huomaa, kun hänet muistetaan ilman, että hänen tarvitsee toistaa toiveitaan.",
            "**Varaustottumukset.** Esimerkiksi asiakas, joka pääsee vain viikonloppuisin. Kun tiedät sen, voit pitää ajan hänelle tai lähettää kutsun oikeaan aikaan.",
          ],
        },
        { note: "Kirjoita lyhyesti ja asiallisesti, ikään kuin uusi työkaveri lukisi tekstin kymmenessä sekunnissa ennen kuin asiakas istuu tuoliin. Älä kirjoita henkilökohtaisia arvioita asiakkaasta: muistiinpano on olemassa, jotta asiakasta palvellaan paremmin.", kind: "tip", title: "Kirjoita seuraavalle työkaverille" },
      ],
    },
    {
      id: "takaisin-kutsuminen",
      title: "Löydä pitkään poissa olleet asiakkaat ja kutsu heidät takaisin",
      blocks: [
        { p: "Vanhan asiakkaan pitäminen on yleensä helpompaa kuin uuden löytäminen, koska hän tuntee jo tien salonkiin ja on ollut tyytyväinen ennenkin. Ryhmä ”Eivät ole palanneet” kokoaa nämä ihmiset valmiiksi." },
        { p: "Hakukentän alla on kaksi painiketta, ja molemmat toimivat **näkyvissä olevalle ryhmälle**:" },
        {
          ul: [
            "**”Vie Exceliin (CSV)”** lataa näkyvän ryhmän listan koneellesi. Tiedostosta kerrotaan ohjeessa [myynnin ja asiakaslistan viennistä Exceliin](lesson:xuat-excel).",
            "**”Lähetä viesti ryhmälle”** lähettää tarjouksen juuri tälle ryhmälle. Viestin kirjoittamisesta kerrotaan ohjeessa [markkinointisähköposteista](lesson:email-marketing).",
          ],
        },
        { img: { src: shot("laheta-viesti-ryhmalle-painike"), alt: "Kultainen Lähetä viesti ryhmälle -painike korostettuna Vie Exceliin (CSV) -painikkeen alla ja asiakaslistan yläpuolella", caption: "Valitse ensin ryhmä ja paina vasta sitten ”Lähetä viesti ryhmälle”." } },
        { p: "Paluutarjous sopii vain niille, jotka ovat olleet pitkään poissa. Jos lähetät sen koko rekisterille, sen saa myös viime viikolla käynyt asiakas, joka voi ihmetellä, miksi hän maksoi täyden hinnan. Valitse siis ryhmä ennen kuin painat. Jos haluat antaa asiakkaille säännöllisen syyn palata, katso ohje [kanta-asiakaskortista](lesson:the-tich-diem)." },
      ],
    },
    {
      id: "arjen-tilanteet",
      title: "Arjen tilanteita asiakasrekisterin kanssa",
      blocks: [
        {
          table: {
            head: ["Tilanne", "Mitä teet"],
            rows: [
              ["Asiakas soittaa, etkä muista, mitä hänelle viimeksi tehtiin", "Kirjoita nimi tai numero hakukenttään, avaa profiili ja katso ”Suosikkipalvelu” ja ”Varaushistoria”"],
              ["Uusi tekijä on ottamassa kanta-asiakkaan", "Avaa asiakkaan profiili ja lue ”Oma muistiinpano” ja ”Tuttu tekijä” ennen kuin asiakas saapuu"],
              ["Haluat lähettää tarjouksen mutta pelkäät, että se menee väärille ihmisille", "Napauta ensin oikeaa ryhmää, tarkista alla oleva lista ja paina vasta sitten ”Lähetä viesti ryhmälle”"],
              ["Rekisterissä on vielä vähän asiakkaita", "Se täyttyy varausten myötä. Kun salongin ajat kirjataan järjestelmään, rekisteri kasvaa itsestään"],
            ],
          },
        },
        { p: "Asiakasrekisteri ei korvaa kasvojen muistamista eikä kuulumisten kysymistä. Sen avulla koko salonki muistaa samat asiat, ja tieto säilyy, kun tekijä lähtee tai kun salongissa on niin kiire, ettei omistaja enää seiso vastaanotossa." },
      ],
    },
  ],
  howTo: {
    title: "Kauneushoitolan asiakasrekisteri vaihe vaiheelta",
    id: "asiakasrekisterin-vaiheet",
    after: "tarkeimmat-luvut",
    lead: "Seitsemän vaihetta kulkevat ”Asiakkaat”-sivun ylälaidasta alas ja sitten yhden asiakkaan profiiliin.",
    steps: [
      {
        name: "Avaa ”Asiakkaat”",
        text: "Napauta yrityksen hallintapaneelin valikosta ”Asiakkaat”. Sivu ”Salongin asiakasrekisteri” aukeaa, ja ylhäällä ovat tärkeimmät luvut: asiakkaat, uudet 30 päivässä, palaavat asiakkaat ja keskiostos asiakasta kohden.",
        image: { src: shot("avaa-asiakkaat-salongin-asiakasrekisteri"), alt: "Yrityksen hallintapaneelin valikko, jossa Asiakkaat-välilehti on korostettu kultaisella, ja alla otsikko Salongin asiakasrekisteri ja ensimmäiset lukuruudut" },
      },
      {
        name: "Suodata ryhmittäin tai hae yksi asiakas",
        text: "Napauta jotakin ryhmistä ”Kaikki”, ”VIP”, ”Kanta-asiakkaat”, ”Uudet”, ”Tuleva varaus” tai ”Eivät ole palanneet”, niin lista suodattuu. Kun etsit yhtä ihmistä, kirjoita nimi, sähköposti tai puhelinnumero hakukenttään.",
        image: { src: shot("suodata-asiakkaat-ryhmittain"), alt: "Ryhmäpainikkeet Kaikki, VIP ja Kanta-asiakkaat korostettuna kultaisella, Kaikki valittuna lukuineen, alla hakukenttä ja asiakaslista" },
      },
      {
        name: "Vie tai lähetä viesti näkyvälle ryhmälle",
        text: "Paina ”Vie Exceliin (CSV)”, niin näytöllä olevan ryhmän lista latautuu. Paina ”Lähetä viesti ryhmälle”, kun haluat lähettää tarjouksen juuri tälle ryhmälle. Molemmat painikkeet seuraavat valittua ryhmää, joten suodata ensin.",
      },
      {
        name: "Avaa profiili napauttamalla asiakasta",
        text: "Napauta asiakkaan riviä listassa. Jo rivillä näkyvät nimi, puhelinnumero tai sähköposti, käyntien määrä ja ostot. Koko profiili aukeaa, kun napautat.",
        image: { src: shot("napauta-asiakasta-avaa-profiili"), alt: "Asiakaslista, jossa Anna Müllerin rivi on korostettu kultaisella, ja jokaisella asiakkaalla näkyy puhelinnumero, käyntien määrä ja ostot euroina" },
      },
      {
        name: "Lue profiilin luvut",
        text: "Profiilin alussa ovat asiakkaan nimi ja puhelinnumero ja sitten lukuruudut, muun muassa ”Toteutuneet käynnit” ja ”Ostot yhteensä”. Niiden alla ovat ”Suosikkipalvelu” ja ”Tuttu tekijä”. Lue tämä ennen asiakkaan tuloa, niin tiedät, mitä hän yleensä ottaa ja kenen luona.",
        image: { src: shot("asiakasprofiili-toteutuneet-kaynnit-ostot"), alt: "Anna Müllerin profiili, jossa ruudut Toteutuneet käynnit, Ostot yhteensä, Keskiostos käyntiä kohden ja Peruttu tai ei saapunut on korostettu kultaisella" },
      },
      {
        name: "Kirjoita ”Oma muistiinpano”",
        text: "Vieritä alas kohtaan ”Oma muistiinpano” ja kirjoita, mitä koko salongin pitää muistaa asiakkaasta, esimerkiksi allergia tai lempiväri. Vain salonki näkee muistiinpanon. Asiakas ei näe sitä koskaan.",
        image: { src: shot("oma-muistiinpano-vain-salonki-nakee"), alt: "Vaaleankeltainen Oma muistiinpano -ruutu korostettuna kultaisella asiakkaan profiilissa, esimerkkiteksti asetoniallergiasta ja nude-sävyistä, alla varaushistoria" },
      },
      {
        name: "Katso ”Varaushistoria”",
        text: "Profiilin lopussa on asiakkaan ”Varaushistoria”. Jokaisessa varauksessa näkyvät palvelu, päivä, tekijä ja summa. Kun asiakas haluaa täsmälleen saman kuin viimeksi, vastaus löytyy täältä.",
        image: { src: shot("asiakkaan-varaushistoria"), alt: "Varaushistoria-osio korostettuna kultaisella asiakkaan profiilissa, jossa on suoritettu 80,00 euron Classic lashes -varaus tekijänä Sofia" },
      },
    ],
  },
  faq: [
    {
      q: "Pitääkö asiakaslista kirjata asiakasrekisteriin käsin?",
      a: "Ei. VaraaAin asiakasrekisteri syntyy salongin varauksista itsestään. Jokainen asiakas, jolla on varaus salongissa, näkyy rekisterissä ilman käsin kirjaamista.",
    },
    {
      q: "Näkeekö asiakas, mitä salonki on kirjoittanut hänestä?",
      a: "Ei näe. ”Oma muistiinpano” näkyy vain salongille, ei koskaan asiakkaalle. Kirjaa siihen allergiat, mieltymykset ja varaustottumukset.",
    },
    {
      q: "Miten löydän asiakkaat, jotka eivät ole käyneet pitkään aikaan?",
      a: "Napauta ”Asiakkaat”-sivulla ryhmää ”Eivät ole palanneet”. Lista näyttää silloin vain pitkään poissa olleet asiakkaat. Paina ”Lähetä viesti ryhmälle”, niin voit lähettää heille tarjouksen ja kutsua heidät takaisin.",
    },
    {
      q: "Mitä asiakasryhmiä asiakasrekisterissä on?",
      a: "Ryhmiä on kuusi: ”Kaikki”, ”VIP”, ”Kanta-asiakkaat”, ”Uudet”, ”Tuleva varaus” ja ”Eivät ole palanneet”. Napauta ryhmää, niin asiakaslista suodattuu.",
    },
    {
      q: "Mitä asiakkaan profiilissa näkyy?",
      a: "Profiilissa näkyvät toteutuneet käynnit, ostot yhteensä, suosikkipalvelu ja tuttu tekijä. Niiden alla ovat salongin ”Oma muistiinpano” ja asiakkaan ”Varaushistoria”.",
    },
    {
      q: "Miten lataan salongin asiakaslistan koneelle?",
      a: "Valitse haluamasi ryhmä ja paina ”Vie Exceliin (CSV)”. Tiedostossa on näkyvissä oleva ryhmä, joten valitse ”Kaikki”, jos haluat koko listan.",
    },
  ],
  related: ["xuat-excel", "lich-hen", "email-marketing", "the-tich-diem"],
};

export default article;
