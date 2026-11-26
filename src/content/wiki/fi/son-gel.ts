import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/son-gel/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "geelilakkaus-ohje-vaihe-vaiheelta",
  lesson: "son-gel",
  category: "nail",
  title: "Geelilakkaus vaihe vaiheelta: 10 työvaihetta esikäsittelystä päällysgeeliin",
  metaTitle: "Geelilakkaus ohje: 10 vaihetta, kestää 2–3 viikkoa",
  metaDescription:
    "Geelilakkauksen ohje vaihe vaiheelta: kynsien tarkastus, kuiva kynsinauhatyö, hionta, pohja, kaksi värikerrosta, päällysgeeli, kovetusajat ja irtoamisen syyt.",
  keyword: "geelilakkaus ohje",
  keywords: ["geelilakkaus vaihe vaiheelta", "geelilakan kovetusaika", "geelilakka irtoaa tyvestä", "geelilakka rypistyy", "kynsien esikäsittely geelilakkaukseen", "geelilakkaus kotona"],
  excerpt: "Koko geelilakkaus kynsiteknikolle ja kotona lakkaavalle: kymmenen työvaihetta, kovetusajat ja ne pienet esikäsittelyvirheet, joiden takia lakkaus irtoaa muutamassa päivässä.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-nail-son-gel-cho-khach-tai-salon"),
    alt: "Mustiin käsineisiin pukeutunut kynsiteknikko lakkaa asiakkaan kynsiä punaisella geelillä marmoripöydän ääressä tyylikkäässä salongissa",
  },
  takeaways: [
    "Geelin irtoaminen johtuu useimmiten **esikäsittelystä**, etenkin kynsinauhan viereen jääneestä ohuesta ihokalvosta, ei lakkapullosta.",
    "Kynsinauhat käsitellään kuivina ilman liotusta: vettä imenyt kynsi turpoaa, kutistuu lakkauksen jälkeen ja vetää geelin irti.",
    "Jokainen geelikerros on **ohut**, ei koske ihoon ja suljetaan kärjestä ennen kovetusta.",
    "Kovetusaika ja lampputyyppi tulevat geelimerkin ohjeesta: LED yleensä 30–60 sekuntia, UV noin 2 minuuttia.",
    "Oikein tehty geelilakkaus pysyy kiiltävänä 2–3 viikkoa.",
  ],
  intro: [
    "Geelilakkauksen ohje mahtuu paperilla yhdelle riville: pohja, väri, päällys ja lamppu. Silti samalla pullolla yksi tekijä saa aikaan lakkauksen, joka kestää kolme viikkoa, ja toisella geeli irtoaa kynnen tyvestä jo neljäntenä päivänä. Ero syntyy työvaiheissa, jotka tehdään ennen kuin pullo edes avataan.",
    "Artikkeli käy läpi VaraaAi Academyn Kynnet-kurssin oppitunnin ”Geelilakkaus: käytäntö alusta loppuun” koko työjärjestyksen siitä hetkestä, kun asiakas istuu alas, viimeiseen kynsinauhaöljytippaan asti. Mukana ovat kovetusajat ja yleisimpien virheiden korjaukset. Voit katsoa oppitunnin videon alta ja käydä sitten vaiheet läpi yksi kerrallaan.",
  ],
  sections: [
    {
      id: "esikasittely",
      title: "Miksi esikäsittely ratkaisee geelilakkauksen keston",
      blocks: [
        { p: "Geeli tarttuu kynnen pintaan, joka on puhdas, kuiva ja kevyesti karhea. Se ei tartu ihoon eikä rasvaan, ja juuri liotettuun kynteen se tarttuu huonosti. Nämä kolme asiaa selittävät lähes kaikki irtoamiset, joihin aloitteleva kynsiteknikko törmää." },
        {
          ul: [
            "**Ohut ihokalvo kynnen pinnalla.** Kynnen tyvessä on aina ohut, läpinäkyvä ihokerros kiinni kynnen pinnassa, eikä sitä juuri erota paljaalla silmällä. Jos geeli levitetään sen päälle, lakkaus irtoaa muutaman päivän päästä juuri siitä kohdasta.",
            "**Vettä imenyt kynsi.** Liotettu kynsi turpoaa. Lakkauksen jälkeen se kuivuu ja kutistuu, mutta geelikerros ei kutistu mukana. Siksi geelilakkauksessa kynsinauhat käsitellään kuivina.",
            "**Ihon rasva.** Kun kynsi on puhdistettu, yksikin sormenpään kosketus jättää pintaan rasvaa. Tekijä ei koske kynnen pintaan ja muistuttaa asiakastakin olemaan koskematta.",
          ],
        },
        { note: "Jos asiakkaan geeli irtoaa toistuvasti kynnen tyvestä, älä vaihda heti merkkiä. Tarkista ensin, miten poistat ohuen ihokalvon ja miten huolellisesti hiot kynsinauhan vierustan.", kind: "tip", title: "Ammattilaisen vinkki" },
      ],
    },
    {
      id: "kovetusajat",
      title: "Geelilakan kovetusaika LED- ja UV-lampussa",
      blocks: [
        { p: "Geeli ei kuivu ilmassa kuten tavallinen kynsilakka. Se kovettuu vasta, kun se on ollut lampussa riittävän kauan, ja vain sellaisessa lampussa, jota geelimerkki edellyttää. Alla olevat ajat ovat tavallisimpia; oikea aika juuri sinun geelillesi lukee tuotteessa." },
        {
          table: {
            head: ["Lamppu", "Tavallinen aika kerrosta kohden", "Huomio"],
            rows: [
              ["LED", "30–60 sekuntia", "Päällysgeeli tarvitsee yleensä täydet 60 sekuntia"],
              ["UV", "Noin 2 minuuttia", "Hitaampi kuin LED, aika pidetään silti täytenä"],
            ],
          },
        },
        { p: "Vajaasti kovettunut geeli ei ole kovettunut läpi asti. Pinta voi tuntua kovalta, mutta kerros irtoaa helposti, ja juuri kovettumaton geeli altistaa allergialle. Pidempi aika lampussa ei korjaa väärää lampputyyppiä." },
        { img: { src: img("ho-den-led-son-gel"), alt: "Asiakkaan käsi lepää suorana LED-geelilampussa, neljä sormea vierekkäin violetissa valossa", caption: "Neljä sormea lakataan ja kovetetaan ensin. Peukalot tehdään erikseen, jotta ne ovat lampussa suorassa." } },
      ],
    },
    {
      id: "yleisimmat-virheet",
      title: "Miksi geelilakka irtoaa, rypistyy tai valuu",
      blocks: [
        { p: "Lähes jokainen geelilakkauksen ongelma palautuu yhteen kiirehdittyyn työvaiheeseen. Taulukossa ovat aloittelijan yleisimmät virheet ja vaihe, joka kannattaa tarkistaa." },
        {
          table: {
            head: ["Mitä näet", "Tavallinen syy", "Korjaus"],
            rows: [
              ["Irtoaa kynnen tyvestä", "Ihokalvo jäi kynnen pintaan tai geeli koski ihoon", "Poista kalvo kynsinauhatyössä ja jätä tyveen hiuksenohut rako"],
              ["Irtoaa kärjestä", "Kärkeä ei suljettu", "Vedä sivellin kärjen reunan yli pohja-, väri- ja päällyskerroksessa"],
              ["Geeli rypistyy ja on alta pehmeä", "Liian paksu kerros, valo ei kovettanut sitä läpi", "Levitä ohuesti; laikukkaaseen väriin lisätään toinen ohut kerros"],
              ["Geeli valuu toiselle puolelle", "Peukalo oli lampussa vinossa", "Tee ensin neljä sormea, sitten kumpikin peukalo erikseen suorana"],
              ["Geeli ei tartu ja lähtee laikkuina", "Kynteen jäi kiiltoa, pölyä tai rasvaa kosketuksesta", "Hio kevyesti mattapintaiseksi, puhdista äläkä enää koske kynteen"],
            ],
          },
        },
      ],
    },
    {
      id: "turvallisuus",
      title: "Geelilakkauksen turvallisuus: allergiat ja TPO",
      blocks: [
        { p: "Geelityön tärkein sääntö on, että **kovettumaton geeli ei koske ihoon**. Iholle päässyt geeli saa lakkauksen irtoamaan, ja toistuva kosketus voi myöhemmin aiheuttaa allergian sekä asiakkaalle että kynsiteknikolle. Jos geeliä pääsee iholle, poista se puutikulla ennen kuin käsi menee lamppuun. Älä koveta sitä ja irrota jälkeenpäin." },
        {
          ul: [
            "Kysy ennen aloittamista, onko geeli aiemmin aiheuttanut asiakkaalle kutinaa, punoitusta tai kynsien irtoamista. Jos on, se voi olla merkki allergiasta, eikä käsittelyä pidä tehdä.",
            "Jos asiakkaalle tulee hoidon aikana kutinaa, punoitusta tai turvotusta kynsien ympärille, lopeta.",
            "Käytä suojakäsineitä oman ihosi suojaamiseksi, koska käsittelet geeliä joka työpäivä.",
            "Vihertävä tai kellertävä, paksuuntunut tai mureneva kynsi, punoittava ja turvonnut iho, märkä tai avohaava: älä tee hoitoa, vaan neuvo asiakasta käymään lääkärissä.",
          ],
        },
        { note: "EU on kieltänyt TPO:n kynsituotteissa 1.9.2025 alkaen. Tarkista hyllysi geelien ainesosaluettelot. Määräykset vaihtelevat maittain, joten selvitä myös omaa toimintaasi koskevat vaatimukset.", kind: "warn", title: "Tarkista geelien ainesosat" },
        { p: "Kemikaaliallergioista salongissa kerrotaan tarkemmin Hygienia ja turvallisuus -kurssin oppitunnilla [Allergiat ja kemikaalit](lesson:di-ung-hoa-chat)." },
      ],
    },
    {
      id: "jalkihoito",
      title: "Geelilakkauksen jälkeen: ohjeet asiakkaalle",
      blocks: [
        { p: "Kauniit kynnet asiakkaan noustessa tuolista ovat vasta puolet työstä. Toinen puoli on kolme lyhyttä ohjetta, jotka annetaan samalla kun öljy hierotaan sisään:" },
        { img: { src: img("nho-dau-duong-quanh-mong-sau-khi-son-gel"), alt: "Kynsiteknikko tiputtaa kullanväristä kynsinauhaöljyä punaisella geelillä lakatun kynnen tyveen" } },
        {
          ol: [
            "Käytä käsineitä tiskatessa ja siivotessa.",
            "Levitä kynsinauhaöljyä kynsien ympärille joka päivä.",
            "Älä revi geeliä itse irti. Tule takaisin salonkiin 2–3 viikon kuluttua, niin geeli poistetaan ja tilalle tehdään uusi lakkaus.",
          ],
        },
        { img: { src: img("bo-mong-son-gel-do-hoan-thien"), alt: "Asiakkaan kaksi kättä ja kymmenen kiiltävää punaista geelikynttä, joiden tyvilinja on tasainen ja siisti", caption: "Valmis geelilakkaus: sileä, peilikirkas pinta, tasainen tyvilinja eikä geeliä iholla." } },
        { p: "Asiakkaan lähdettyä työpiste odottaa vielä. Metalliset välineet pestään, desinfioidaan ja steriloidaan, kertakäyttöiset tarvikkeet heitetään pois ja pöytä sekä lamppu pyyhitään ennen seuraavaa asiakasta. Työvaiheet käydään läpi oppitunnilla [Välineet jokaisen asiakkaan jälkeen](lesson:ve-sinh-dung-cu)." },
      ],
    },
    {
      id: "ajanvaraus",
      title: "Geelilakkaus salongin ajanvaraukseen",
      blocks: [
        { p: "Kun työtapa on hallussa, anna asiakkaiden varata geelilakkaus netissä viestittelyn sijaan. VaraaAissa [lisäät palvelun](lesson:dich-vu) juuri sillä kestolla, jonka yksi lakkaus sinulta vie, pöydän siivous mukaan luettuna, ja [teet hinnaston](lesson:bang-gia) salongin seinälle. Ohjelma on salongin omistajalle maksuton: [katso VaraaAi salongeille](/business)." },
      ],
    },
  ],
  howTo: {
    title: "Geelilakkauksen ohje: työvaiheet järjestyksessä",
    id: "geelilakkauksen-vaiheet",
    after: "esikasittely",
    lead: "Kymmenen vaihetta etenevät samassa järjestyksessä kuin oppitunnin video. Kuusi ensimmäistä ovat esikäsittelyä, ja niissä kannattaa edetä hitaimmin.",
    supplies: [
      "Kynsinauhan työnnin ja kynsinauhapihdit steriloituina, avaamattomassa pussissa",
      "180-karkeuksinen viila ja hienojakoinen hiomapala, jokaiselle asiakkaalle uudet",
      "Nukkaamattomat puhdistuslaput ja puhdistusneste",
      "Pohjageeli, värigeeli ja päällysgeeli",
      "LED- tai UV-lamppu, jota geelimerkki edellyttää",
      "Puutikut, kynsinauhaöljy ja suojakäsineet",
    ],
    steps: [
      {
        name: "Pese, desinfioi ja tarkasta kynnet",
        text: "Pese ja desinfioi omat ja asiakkaan kädet ja katso sitten tarkasti kynsiä ja niitä ympäröivää ihoa. Vihertävä tai kellertävä, paksuuntunut tai mureneva kynsi, turvonnut punoittava iho, märkä tai avohaava tarkoittavat, että hoitoa ei tehdä ja asiakas ohjataan lääkäriin. Kysy myös, onko geeli aiemmin aiheuttanut kutinaa, punoitusta tai kynsien irtoamista.",
      },
      {
        name: "Ota välineet esille",
        text: "Kokoa kaikki pöydälle ennen aloittamista, ettei sinun tarvitse nousta kesken työn geelisissä käsineissä. Metalliset välineet ovat yhä sterilointipussissaan, ja viila sekä hiomapala ovat jokaiselle asiakkaalle uudet.",
        image: { src: img("dung-cu-son-gel-can-chuan-bi"), alt: "Geelilakkauksen välineet marmoripöydällä: sterilointipussi pihteineen ja työntimineen, viila, hiomapala, pohja-, väri- ja päällysgeeli, LED-lamppu, öljy ja käsineet" },
      },
      {
        name: "Muotoile kynnet",
        text: "Pidä viilaa hieman vinossa kynnen kärjen alla ja viilaa yhteen suuntaan, sivulta kohti keskustaa. Älä sahaa edestakaisin, sillä kynsi kuumenee ja voi alkaa lohkeilla kerroksittain. Muotoile kaikki kymmenen kynttä tasaisesti asiakkaan valitsemaan muotoon.",
      },
      {
        name: "Käsittele kynsinauhat kuivana",
        text: "Pidä työnnintä noin 45 asteen kulmassa ja työnnä kynnen tyven ihoa kevyesti taaksepäin. Raaputa sitten pois ohut, läpikuultava ihokalvo, joka on yhä kiinni kynnen pinnassa. Leikkaa pihdeillä vain irronnut kuollut iho, valkoinen ja kuiva osa. Älä koskaan leikkaa elävää ihoa: liian syvä leikkaus vuotaa verta ja avaa tien tulehdukselle.",
        image: { src: img("day-da-chan-mong-truoc-khi-son-gel"), alt: "Kynsiteknikko pitää kynsinauhan työnnintä 45 asteen kulmassa ja työntää kevyesti asiakkaan luonnonkynnen kynsinauhaa", caption: "Työnnin pysyy vinossa ja liikkuu kevyesti kohti rystystä painamatta kynnen pintaa." },
      },
      {
        name: "Hio hyvin kevyesti",
        text: "Kuljeta hienojakoista hiomapalaa kevyesti koko kynnen pinnalla vain kiillon poistamiseksi. Muista kynsinauhan vierus ja kynnen molemmat sivut, jotka jäävät helposti käsittelemättä. Älä hio kovaa: ohentunut kynsi on heikko ja arka.",
        image: { src: img("cha-nham-mat-mong-bang-phao-min"), alt: "Kynsiteknikko painaa valkoisen hiomapalan tasaisen pinnan luonnonkynttä vasten kiillon poistamiseksi" },
      },
      {
        name: "Puhdista kynnen pinta",
        text: "Harjaa pöly pois ja pyyhi jokainen kynsi huolellisesti puhdistusnesteeseen kostutetulla nukkaamattomalla lapulla, myös sivut ja kärki. Tästä eteenpäin kukaan ei koske kynnen pintaan. Jos geelisarjaasi kuuluu tartunta-aine, levitä se nyt tarkalleen valmistajan ohjeen mukaan.",
      },
      {
        name: "Levitä hyvin ohut pohjageeli",
        text: "Ota siveltimeen todella vähän geeliä. Aseta sivellin kynnen keskelle, työnnä se lähelle ihoa niin, että väliin jää hiuksenohut rako, ja vedä suoraan kärkeen. Tee sivut ja sulje lopuksi kärki vetämällä sivellin kärjen reunan yli. Iholle mennyt geeli poistetaan puutikulla ennen kovetusta.",
        image: { src: img("son-lop-base-gel-mong"), alt: "Kirkkaan pohjageelin sivellin kynnen keskellä lähellä tyveä; lakattu osa kiiltää märkänä, loput on vielä mattaa" },
      },
      {
        name: "Koveta oikea aika",
        text: "Käsi lamppuun: LED yleensä 30–60 sekuntia, UV noin 2 minuuttia, ja aina tuotteessa ilmoitettu aika. Lakkaa ja koveta ensin neljä sormea, sitten peukalot erikseen, jotta ne ovat lampussa suorassa. Vinossa olevasta peukalosta geeli valuu toiselle puolelle.",
      },
      {
        name: "Levitä kaksi ohutta värikerrosta",
        text: "Jokaisessa kerroksessa kolme vetoa: keskelle, vasemmalle ja oikealle. Sulje kärki ja koveta. Laikukas ensimmäinen kerros on normaali, joten älä yritä peittää sitä paksulla kerroksella: paksu geeli rypistyy eikä kovetu läpi. Toinen kerros tehdään samoin. Hyvin tummat tai hyvin vaaleat sävyt voivat vaatia ohuen kolmannen kerroksen.",
        image: { src: img("son-lop-mau-gel-ba-duong-co"), alt: "Kynsiteknikko vetää punaisen geelin vedon kynnen keskelle, sivut ovat vielä lakkaamatta ja tyveen jää kapea rako", caption: "Ensimmäinen veto kulkee keskeltä, kaksi seuraavaa peittävät sivut." },
      },
      {
        name: "Sulje päällysgeelillä ja viimeistele öljyllä",
        text: "Peitä koko väri päällysgeelillä kärjen reunaa myöten, jotta väri sulkeutuu sisään. Päällysgeeli saa olla hieman paksumpi kuin värikerrokset, jolloin pinnasta tulee sileä ja peilikirkas. Koveta täysi aika, LED-lampussa yleensä 60 sekuntia. Jos päällysgeeli jättää tahmean pinnan, pyyhi se puhdistusnesteellä; pyyhkimätöntä päällysgeeliä ei tarvitse pyyhkiä. Lopuksi tippa kynsinauhaöljyä jokaisen kynnen ympärille ja kevyt hieronta.",
        image: { src: img("phu-lop-top-gel-bong"), alt: "Kynsiteknikko levittää kirkasta päällysgeeliä punaisen geelikynnen päälle, ja juuri päällystetty kynsi kiiltää kuin peili" },
      },
    ],
  },
  faq: [
    {
      q: "Kuinka kauan geelilakkaus kestää?",
      a: "Kun kaikki työvaiheet tehdään oikein, geelilakkaus pysyy kiiltävänä ja ehjänä 2–3 viikkoa. Sen jälkeen kynsi on kasvanut ja tyvi näkyy, joten asiakas tulee salonkiin poistattamaan geelin ja tekemään uuden lakkauksen sen sijaan, että repisi geelin itse irti.",
    },
    {
      q: "Miksi geelilakka irtoaa kynnen tyvestä muutamassa päivässä?",
      a: "Yleisin syy on kynnen pintaan jäänyt ohut, läpinäkyvä ihokalvo tai iholle levitetty geeli. Geeli ei tartu ihoon. Poista kalvo kynsinauhoja käsitellessäsi ja jätä lakatessa tyveen hiuksenohut rako.",
    },
    {
      q: "Kuinka kauan geelilakkaa kovetetaan LED-lampussa?",
      a: "LED-lampussa yleensä 30–60 sekuntia kerrosta kohden, UV-lampussa noin 2 minuuttia. Merkit eroavat toisistaan, joten oikea aika on tuotteeseen merkitty aika sillä lampputyypillä, jota merkki edellyttää. Vajaasti kovettunut geeli irtoaa helposti ja aiheuttaa herkemmin allergiaa.",
    },
    {
      q: "Miksi geelilakka rypistyy lampussa?",
      a: "Kerros on liian paksu. Lampun valo ei ylety alla olevaan geeliin, joten pinta kutistuu ja rypistyy ja sisus jää pehmeäksi. Levitä ohuita kerroksia, ja jos väri on yhä laikukas, lisää toinen ohut kerros yhden paksun sijaan.",
    },
    {
      q: "Pitääkö kynsiä liottaa ennen geelilakkausta?",
      a: "Ei pidä. Vettä imenyt kynsi turpoaa ja kutistuu lakkauksen jälkeen takaisin, jolloin geeli irtoaa helposti. Geelilakkauksessa kynsinauhat käsitellään kuivina työntimellä ja pihdeillä.",
    },
    {
      q: "Eroaako geelilakkaus kotona salongin geelilakkauksesta?",
      a: "Työvaiheet ovat täsmälleen samat. Kotona tärkeintä on pitää kovettumaton geeli poissa iholta, käyttää geelimerkin edellyttämää lamppua ja kovettaa jokainen kerros täyden ajan. Jos kynsien ympärille tulee kutinaa, punoitusta tai turvotusta, lopeta tuotteen käyttö.",
    },
  ],
  related: ["gel-hieu-dung", "thao-gel", "builder-gel", "ve-sinh-dung-cu"],
};

export default article;
