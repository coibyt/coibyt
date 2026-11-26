import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/builder-gel/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "rakennegeeli-ohje-omille-kynsille",
  lesson: "builder-gel",
  category: "nail",
  title: "Rakennegeeli omille kynsille: ohje 10 vaiheessa pohjakerroksesta apexiin",
  metaTitle: "Rakennegeeli ohje omille kynsille: 10 vaihetta",
  metaDescription:
    "Rakennegeelin (BIAB) ohje omille kynsille: kuiva esikäsittely, ohut pohjakerros, geelipisara, geelin ohjaus, apexin muotoilu, kovetus, viilaus ja jälkihoito.",
  keyword: "rakennegeeli ohje",
  keywords: ["BIAB ohje", "rakennegeelin levitys vaihe vaiheelta", "rakennegeeli omille kynsille", "apexin rakentaminen rakennegeelillä", "rakennegeelin viilaus", "rakennegeeli aloittelijalle", "yksi vai kaksi kerrosta rakennegeeliä"],
  excerpt: "Rakennegeelipäällyste omille kynsille ilman pidennystä: kymmenen vaihetta oikeassa järjestyksessä, geelin määrä, sormen kääntäminen apexia varten ja vältettävät virheet.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-nail-dap-builder-gel-cho-khach-tai-salon"),
    alt: "Mustiin käsineisiin pukeutunut kynsiteknikko käsittelee asiakkaan kynsiä valkoisen kivipöydän ääressä pariisilaistyylisessä salongissa kristallikruunujen alla",
  },
  takeaways: [
    "Kolme asiaa pätee koko käsittelyn ajan: **huolellinen kuiva esikäsittely**, ei geeliä iholle ja apex oikeassa kohdassa.",
    "Aseta geelipisara **kynnen keskelle** ja ohjaa se kevyesti tyveen, sivuseinille ja kärkeen. Aloita pienellä määrällä: lisääminen on helppoa, poistaminen vaikeaa.",
    "**Käännä asiakkaan sormi kynsi alaspäin muutamaksi sekunniksi**, jotta geeli kerääntyy keskelle apexiksi, ja tarkista se sivulta ja kärjestä.",
    "Kaksi kohtuullista kerrosta on parempi kuin yksi hyvin paksu: muotoilu on helpompaa ja lampussa syntyy vähemmän lämpöä.",
    "Viimeistelyviilauksessa ei kosketa omaan kynteen tyvessä eikä viilata apexia pois. Varaa huolto 3–4 viikon päähän ennen kuin asiakas lähtee.",
  ],
  intro: [
    "Rakennegeelin ohje omille kynsille ei vaadi erityisen taitavia käsiä, mutta se vaatii oikean järjestyksen. Geeli on paksua ja tasoittuu itsestään, joten suurin osa työstä on geelin asettamista oikeaan kohtaan ja sen antamista löytää muotonsa. Kynsiteknikko ohjaa ja tietää, milloin lopettaa.",
    "Artikkeli seuraa VaraaAi Academyn Kynnet-kurssin oppituntia ”Rakennegeeli omalle kynnelle: käytäntö vaihe vaiheelta”. Kyse on yhdestä rakennegeeli- eli BIAB-päällysteestä asiakkaan omille kynsille ilman pidennystä. Luettuasi osaat tehdä koko käsittelyn: konsultaation, pohjakerroksen, geelipisaran, apexin, viimeistelyviilauksen ja huoltoajan varauksen.",
  ],
  sections: [
    {
      id: "kolme-periaatetta",
      title: "Kolme periaatetta, jotka kulkevat koko rakennegeelityön läpi",
      blocks: [
        { p: "Alla olevissa kymmenessä vaiheessa on paljon yksityiskohtia, mutta ne kaikki palvelevat kolmea asiaa. Kun pidät nämä mielessä, osaat päätellä oikean työtavan silloinkin, kun jokin yksityiskohta unohtuu." },
        {
          ol: [
            "**Huolellinen kuiva esikäsittely.** Geeli tarttuu vain puhtaaseen, kuivaan ja kiillottomaksi hiottuun kynteen. Tämä osa tehdään täsmälleen kuten [geelilakkauksen ohjeessa](lesson:son-gel).",
            "**Ei geeliä iholle.** Iholle valunut geeli nousee irti ihon kasvaessa, ja iholle jäänyt kovettumaton geeli on allergian aiheuttaja.",
            "**Apex oikeassa kohdassa.** Ohut tyvessä, ohut kärjessä ja korkeimmillaan rasitusalueen päällä, siinä missä kynsi irtoaa kynsipedistä.",
          ],
        },
        { p: "Jos et ole varma, miksi kerroksella pitää olla korkein kohta tai kenelle tätä palvelua ei tehdä, lue ensin teoria-artikkeli [mikä on rakennegeeli](lesson:builder-gel-hieu-dung) ennen kuin otat siveltimen käteen." },
      ],
    },
    {
      id: "yksi-vai-kaksi-kerrosta",
      title: "Yksi vai kaksi kerrosta rakennegeeliä, ja mitä tehdä, kun asiakas tuntee kuumuutta",
      blocks: [
        { p: "Jos yksi kerros on jo riittävän paksu ja näyttää hyvältä, enempää ei tarvita. Jos kynsi on heikko tai sivulta katsottuna apex jää liian matalaksi, lisää toinen ohut kerros täsmälleen samalla tavalla: aseta pisara, ohjaa geeli, käännä sormi ja koveta." },
        { img: { src: img("dan-builder-gel-ra-dau-mong"), alt: "Litteä sivellin ohjaa kirkkaan roosan rakennegeelin aivan kynnen kärkeen asti, ja kynsiteknikko pitää sormea mustan käsineen suojaamalla kädellä", caption: "Myös toinen kerros ohjataan kärjen reunaan asti ja suljetaan, kuten ensimmäinen." } },
        { p: "Miksi kaikkea ei kannata laittaa yhteen kerrokseen: geeli vapauttaa lämpöä kovettuessaan, ja mitä paksumpi kerros, sitä kuumempi se on. Paksua kerrosta on myös vaikeampi muotoilla, koska reunoille valuvaa geeliä on enemmän." },
        {
          ul: [
            "Jos lampussa on matalan lämmön tila tai valmistaja neuvoo muutaman sekunnin esikovetuksen, tee ensin niin ja koveta sitten koko aika.",
            "Jos asiakas tuntee polttelua, anna hänen ottaa käsi pois muutamaksi sekunniksi ja laita se sitten takaisin. Kovetusajan on silti oltava kokonainen.",
            "Vie käsi syvälle lamppuun, jotta koko kynsi on valon alla. Osittain lampun ulkopuolelle jäävään kynteen jää kovettumattomia kohtia.",
          ],
        },
        { note: "Kovetusajat, lampun tila ja pohjakerroksen käsittely (kovetetaanko vai ei) noudattavat aina käyttämäsi tuotteen ohjetta. Vajaasti kovettunut geeli irtoaa helposti ja aiheuttaa herkemmin allergiaa.", kind: "warn", title: "Noudata valmistajan ohjetta" },
      ],
    },
    {
      id: "yleisimmat-virheet",
      title: "Rakennegeelin yleisimmät virheet ja niiden korjaus",
      blocks: [
        { p: "Kaikki nämä virheet voi korjata pöydän ääressä, jos huomaat ne geelin ollessa vielä märkää. Kovetuksen jälkeen ainoa korjauskeino on viila." },
        {
          table: {
            head: ["Virhe", "Miksi se syntyy", "Oikea työtapa"],
            rows: [
              ["Geeli valuu kynsinauhalle", "Pisara asetettiin liian lähelle tyveä tai sivellintä painettiin geeliä ohjatessa", "Aseta pisara kynnen keskelle, liu'uta lähes painamatta ja pysähdy hiuksenohuen raon päähän ihosta"],
              ["Geeli valuu sivuseinille", "Liikaa geeliä tai liian pitkä korjailu ennen kovetusta", "Ota vähän geeliä, korjaa nopeasti märkänä ja koveta heti"],
              ["Lattea kerros ilman apexia", "Sormen kääntö jäi tekemättä tai korkein kohta viilattiin pois", "Käännä sormi kynsi alaspäin muutamaksi sekunniksi; viilatessa vain tasoita pinta"],
              ["Asiakkaaseen sattuu, kynsi on tyvestä ohut", "Viimeistelyviila osui omaan kynteen", "Pidä viila geelin päällä, älä koskaan viilaa omaa kynttä tyvessä"],
              ["Geelipölyä ilmassa", "Pöly puhallettiin pois imemisen sijaan; vajaasti kovettuneen geelin pöly voi aiheuttaa allergiaa", "Käytä pölynpoistoa, harjaa pöly pois ja pyyhi kynsi"],
            ],
          },
        },
        { img: { src: img("phui-bui-dua-bang-choi-mem"), alt: "Kynsiteknikko harjaa pehmeällä harjalla valkoista viilauspölyä mattapintaiseksi viilatulta rakennegeelikynneltä, ja mustissa käsineissä on pölyä", caption: "Viilauspöly harjataan ja imetään pois, sitä ei puhalleta." } },
      ],
    },
    {
      id: "jalkihoito-ja-huolto",
      title: "Kotihoito-ohjeet ja rakennegeelin huoltoajan varaus",
      blocks: [
        { img: { src: img("mong-builder-gel-hoan-thien-nhin-tu-tren"), alt: "Ylhäältä otettu lähikuva kiiltävällä maidonroosalla rakennegeelillä päällystetystä kynnestä, tyvilinja siisti eikä geeliä iholla", caption: "Valmis kynsi: tasainen kiiltävä pinta ja kapea rako geelin ja ihon välissä." } },
        { p: "Kun hierot öljyä sisään, kerro asiakkaalle neljä asiaa:" },
        {
          ul: [
            "Jos geeli irtoaa, älä revi tai kaiva sitä. Tule takaisin salonkiin.",
            "Käytä käsineitä tiskatessa ja siivotessa.",
            "Älä käytä kynsiä työkaluina vääntämiseen tai asioiden avaamiseen.",
            "Tule huoltoon noin 3–4 viikon päästä, koska kynnen kasvaessa runko siirtyy pois sieltä, missä sitä tarvitaan.",
          ],
        },
        { note: "Varaa huoltoaika tiskillä ennen kuin asiakas lähtee. Asiakas, jolla on jo aika varattuna, antaa kynsien harvoin venyä yli huoltovälin eikä ala repiä geeliä kotona.", kind: "tip", title: "Ammattilaisen vinkki" },
      ],
    },
    {
      id: "tyopisteen-siivous",
      title: "Työpisteen siivous rakennegeelin jälkeen",
      blocks: [
        { p: "Kun asiakas on lähtenyt, työpiste palautetaan puhtaaksi ennen kuin seuraava istuu alas." },
        {
          ul: [
            "Käytetyt viilat, hiomapalat, vanulaput ja puutikut: kannelliseen roska-astiaan.",
            "Metalliset välineet: puhdistus ja sterilointi oppitunnin [Välineet jokaisen asiakkaan jälkeen](lesson:ve-sinh-dung-cu) mukaan.",
            "Geelipullot: tiiviisti kiinni ja poissa auringonvalosta.",
            "Pöytä: pyyhitään puhtaaksi.",
          ],
        },
      ],
    },
    {
      id: "rakennegeeli-ajanvaraukseen",
      title: "Rakennegeeli salongin ajanvaraukseen",
      blocks: [
        { p: "Uusi rakennegeelikäsittely ja huolto vievät eri ajan, joten pidä ne erillään. VaraaAissa [luot palvelut](lesson:dich-vu) ”Rakennegeeli” ja ”Rakennegeelin huolto” salongin todellisilla kestoilla ja varaat huollon [ajanvarauskalenteriin](lesson:lich-hen) heti tiskillä. Asiakkaan kynsiin liittyvät huomiot, esimerkiksi että hän tuntee lampussa kuumuutta, kuuluvat [asiakastietoihin](lesson:khach-hang), jotta niitä ei tarvitse kysyä uudelleen." },
      ],
    },
  ],
  howTo: {
    title: "Rakennegeeli ohje: työvaiheet järjestyksessä",
    id: "rakennegeelin-vaiheet",
    after: "kolme-periaatetta",
    lead: "Kymmenen vaihetta etenevät samassa järjestyksessä kuin oppitunnin video. Vaiheet 4–6 ovat rakennegeelin omaa osuutta, joten niissä kannattaa edetä hitaasti.",
    supplies: [
      "Steriloitu kynsinauhan työnnin",
      "180-karkeuksinen viila ja hienojakoinen hiomapala",
      "Nukkaamattomat puhdistuslaput ja puhdistusneste",
      "Rakennegeeli ja geelisivellin; dehydraattori tai primer, jos merkin sarjaan kuuluu sellainen",
      "Lamppu, jota geelimerkki edellyttää",
      "Pölynpoisto, pölyharja ja hengityssuojain",
      "Värigeeli, jos asiakas haluaa värin, päällysgeeli, kynsinauhaöljy ja suojakäsineet",
    ],
    steps: [
      {
        name: "Konsultoi ja tarkasta kynnet",
        text: "Pese ja desinfioi omat ja asiakkaan kädet ja katso tarkasti kynsiä ja niitä ympäröivää ihoa. Kynsipedistä irtoava tai värjäytynyt kynsi, turvonnut punoittava iho, märkä tai avohaava tarkoittavat, että käsittelyä ei tehdä ja asiakas ohjataan lääkäriin. Kysy, onko geeli aiemmin aiheuttanut kutinaa, punoitusta tai rakkuloita, haluaako hän luonnollisen vai värillisen lopputuloksen, ja kerro jo alussa noin 3–4 viikon huoltovälistä.",
        image: { src: img("kiem-tra-mong-va-da-truoc-khi-dap-builder-gel"), alt: "Mustiin käsineisiin pukeutunut kynsiteknikko nostaa asiakkaan käden molemmin käsin ja tarkastelee luonnonkynsiä ja niitä ympäröivää ihoa" },
      },
      {
        name: "Esikäsittele kynnet kuivana",
        text: "Ei liotusta. Työnnä kynsinauha varovasti taakse ja poista vain ohut kuollut iho, joka on yhä kiinni kynsilevyssä. Muotoile kynnet ja poista kiilto hienolla hiomapalalla ohentamatta kynttä. Harjaa pöly pois, pyyhi nukkaamattomalla lapulla ja puhdistusnesteellä, äläkä sen jälkeen koske kynnen pintaan. Jos merkin sarjaan kuuluu dehydraattori tai primer, käytä sitä tarkalleen ohjeen mukaan.",
        image: { src: img("mong-that-da-cha-nham-san-sang-dap-gel"), alt: "Lähikuva lyhyestä luonnonkynnestä, joka on hiottu tasaisen mattapintaiseksi ja puhtaaksi, ja sormea pitelee mustaan käsineeseen pukeutunut käsi", caption: "Valmis geelille: tasaisen matta kynsilevy ilman pölyä ja rasvaa." },
      },
      {
        name: "Levitä hyvin ohut pohjakerros",
        text: "Ota vähän geeliä, painele ja hankaa se kevyesti kynnen pintaan kuin hieroisit sen sisään, ja poista ylimäärä. Kerros on niin ohut, että se on lähes näkymätön, mutta se auttaa seuraavaa kerrosta tarttumaan lujasti ja liukumaan helposti. Sulje vapaa reuna ja jätä ihoon aivan ohut rako. Koveta kerros tai jatka sen päälle märkänä, tarkalleen tuotteen ohjeen mukaan.",
      },
      {
        name: "Aseta geelipisara kynnen keskelle",
        text: "Ota yksi pyöreä, sopivan kokoinen geelipisara ja aseta se kynnen keskelle. Älä aseta sitä aivan kynsinauhan viereen, sillä geeli valuu iholle ennen kuin ehdit ohjata sitä. Pisaran koko riippuu kynnestä; alussa ota mieluummin liian vähän kuin liian paljon.",
        image: { src: img("dat-hat-builder-gel-o-giua-mong"), alt: "Siveltimen kärki asettaa pyöreän, kirkkaan rakennegeelipisaran hiotun kynnen keskelle, kauas kynnen tyven ihosta" },
      },
      {
        name: "Ohjaa geeli tyveen, sivuseinille ja kärkeen",
        text: "Ohjaa geeliä siveltimen kärjellä kohti kynsinauhaa. Sivellin tuskin painaa: se liukuu geelin pinnalla ja antaa geelin virrata, ja pysähtyy hiuksenohuen raon päähän ihosta. Vie geeli sitten molemmille sivuseinille ja kärkeen ja sulje kärjen reuna. Nyt kerros on ohut tyvessä ja sivuilla ja täyteläisempi keskellä.",
        image: { src: img("dan-builder-gel-ve-phia-chan-mong"), alt: "Litteä sivellin liukuu kevyesti kirkkaan roosan rakennegeelin pinnalla, ohjaa geelin lähelle kynnen tyveä ja pysähtyy ennen ihoa", caption: "Sivellin liukuu geelin päällä painamatta kynttä. Geelin ja ihon väliin jää aina kapea rako." },
      },
      {
        name: "Käännä sormi ja muotoile apex",
        text: "Käännä asiakkaan sormi kynsi alaspäin ja pidä se paikallaan muutama sekunti. Geeli on paksua ja tasoittuu itsestään, joten painovoima kerää sen keskelle pehmeäksi kaareksi. Käännä sormi takaisin ja katso sivulta: korkein kohta on rasitusalueen päällä, hieman sen takana. Katso kärjestä: C-kaari on tasainen molemmin puolin. Korjaa kaikki märkänä, mutta älä odota liian kauan, ettei geeli valu reunojen yli.",
        image: { src: img("up-ngon-tay-tao-diem-apex"), alt: "Mustiin käsineisiin pukeutunut kynsiteknikko pitää asiakkaan kättä käännettynä tyynyllä, ja juuri geelatut kynnet osoittavat alas kohti pöytää" },
      },
      {
        name: "Koveta koko aika",
        text: "Vie käsi syvälle lamppuun, jotta koko kynsi on valon alla, ja koveta valmistajan suosittelema aika. Jos asiakas tuntee kuumuutta, anna hänen ottaa käsi pois muutamaksi sekunniksi ja laita se sitten takaisin. Lisää tarvittaessa toinen ohut kerros samalla tavalla. Jos tuote jättää kovetuksen jälkeen tahmean kerroksen, pyyhi se pois valmistajan ohjeen mukaan.",
      },
      {
        name: "Viimeistele viilaamalla",
        text: "Käynnistä pölynpoisto ja käytä hengityssuojainta, jos sinulla on sellainen. Pidä 180-viilaa vaakatasossa kynnen päällä ja viilaa kevyesti, kunnes pinta on sileä ja tasainen. Älä viilaa omaa kynttä tyvessä äläkä viilaa pois juuri rakentamaasi apexia. Siisti sivuseinät suoriksi ja kärki tasaiseen muotoon, hio, harjaa pöly pois ja pyyhi kynnet. Katso lopuksi koko kättä ylhäältä, sivulta ja kärjestä: kaikkien kynsien pitää olla samanlaiset.",
        image: { src: img("dua-gon-canh-ben-lop-builder-gel"), alt: "Harmaa viila kulkee mattapintaiseksi viilatun rakennegeelikynnen sivuseinää pitkin, ja kynsiteknikon mustissa käsineissä on viilauspölyä" },
      },
      {
        name: "Lisää väri halutessa ja sitten päällysgeeli",
        text: "Luonnolliseen lopputulokseen riittää yksi kiiltävä päällysgeeli. Jos asiakas haluaa värin, levitä värigeeliä päälle ohuina ja tasaisina kerroksina kuten geelilakkauksessa. Sulje vapaa reuna päällysgeelillä ja koveta koko aika. Jos merkin päällysgeeli jättää tahmean kerroksen, pyyhi se pois.",
      },
      {
        name: "Viimeistele öljyllä ja anna kotihoito-ohjeet",
        text: "Tiputa öljyä jokaisen kynnen ympärille ja hiero kevyesti. Nyt on oikea hetki kertoa, miten kynsistä pidetään huolta, ja varata huolto noin 3–4 viikon päähän. Kun asiakas on lähtenyt, heitä kertakäyttötarvikkeet pois, vie metalliset välineet sterilointiin ja sulje geelipullot tiiviisti.",
      },
    ],
  },
  faq: [
    {
      q: "Tarvitaanko rakennegeeliin omille kynsille pidennystä?",
      a: "Ei. Oppitunnin työtapa on yksi rakennegeelipäällyste asiakkaan omille kynsille ilman pidennystä. Geeli muodostaa rungon, joka pitää kynnen vahvana ja luonnollisen näköisenä, ja asiakas saa pitää omien kynsiensä pituuden.",
    },
    {
      q: "Mihin ensimmäinen rakennegeelipisara asetetaan?",
      a: "Kynnen keskelle, ei kynsinauhan viereen. Keskeltä geeli ohjataan kevyesti tyveen, sivuseinille ja kärkeen. Näin reunat jäävät ohuiksi eikä geeli koske ihoon.",
    },
    {
      q: "Miksi sormi käännetään ylösalaisin rakennegeelin levittämisen jälkeen?",
      a: "Rakennegeeli on paksua ja tasoittuu itsestään. Kun sormi on muutaman sekunnin kynsi alaspäin, painovoima kerää geelin keskelle pehmeäksi kaareksi, josta tulee apex. Sen jälkeen sormi käännetään takaisin, kerros tarkistetaan sivulta ja kärjestä ja kovetetaan.",
    },
    {
      q: "Pitääkö rakennegeelin pohjakerros kovettaa?",
      a: "Se riippuu tuotteesta. Osa valmistajista edellyttää pohjakerroksen kovettamista tietyn ajan, osa antaa levittää seuraavan kerroksen pohjakerroksen ollessa vielä märkä. Noudata käyttämäsi geelimerkin ohjetta.",
    },
    {
      q: "Millä viilalla rakennegeeli viilataan ja mitä pitää välttää?",
      a: "180-karkeuksisella viilalla, joka pidetään vaakatasossa pinnalla ja jolla viilataan kevyesti, kunnes geeli on sileä. Sen jälkeen pinta hiotaan hienolla hiomapalalla. Vältä kahta asiaa: oman kynnen viilaamista tyvessä, mikä ohentaa kynttä ja sattuu, ja apexin viilaamista pois.",
    },
    {
      q: "Kannattaako rakennegeeli tehdä yhtenä paksuna vai kahtena ohuena kerroksena?",
      a: "Jos yksi kerros on riittävän paksu ja näyttää hyvältä, enempää ei tarvita. Jos kynsi on heikko tai apex jää matalaksi, lisää toinen ohut kerros yhden hyvin paksun sijaan. Kaksi kohtuullista kerrosta on helpompi muotoilla, ja ne lämpenevät lampussa vähemmän.",
    },
  ],
  related: ["builder-gel-hieu-dung", "son-gel", "fill-mong", "thao-gel"],
};

export default article;
