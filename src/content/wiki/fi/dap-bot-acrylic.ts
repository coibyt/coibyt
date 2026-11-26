import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/dap-bot-acrylic/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "akryylikynnet-ohje-vaihe-vaiheelta",
  lesson: "dap-bot-acrylic",
  category: "nail",
  title: "Akryylikynnet vaihe vaiheelta: ohje 12 vaiheessa kolmen helmen tekniikalla",
  metaTitle: "Akryylikynnet ohje: 12 vaihetta, kolmen helmen tekniikka",
  metaDescription:
    "Akryylikynsien ohje vaihe vaiheelta muotilla: primer, muotin asettaminen, helmen ottaminen, kolme helmeä, muotin irrotus, viilaus ja siveltimen hoito.",
  keyword: "akryylikynnet ohje",
  keywords: ["akryylikynnet vaihe vaiheelta", "kolmen helmen tekniikka", "akryylihelmen ottaminen", "akryylipidennykset muotilla", "akryylisiveltimen puhdistus", "akryylikynnet aloittelijalle", "kuinka nopeasti akryyli kovettuu"],
  excerpt: "Akryylipidennykset muotilla alusta loppuun: kaksitoista vaihetta järjestyksessä, helmen ottaminen, kolmen helmen paikat, muotin irrotuksen hetki ja siveltimen hoito.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-nail-dap-bot-noi-mong-tai-ban-co-may-hut"),
    alt: "Mustiin käsineisiin pukeutunut kynsiteknikko käsittelee asiakkaan kynsiä valkoisen kivipöydän ääressä, jossa on pyöreä kohdepoisto, roosa jauhepurkki ja nesteastia",
  },
  takeaways: [
    "Kolme asiaa pätee koko käsittelyn ajan: **oikean kosteuden helmi**, ei akryyliä iholle ja apex oikeassa kohdassa.",
    "Käynnistä pöydän kohdepoisto **ennen kuin avaat nesteen**. Kaada vähän nestettä pieneen kannelliseen astiaan kaukana avotulesta.",
    "Ensimmäinen helmi tulee muotille kärkeen, toinen rasitusalueelle apexiksi ja kolmas pienenä ja ohuena kynsinauhan lähelle.",
    "Anna akryylin kovettua ennen muotin irrotusta: koputa siveltimen varrella ja kuuntele **kuivaa naksahdusta**.",
    "Puhdista sivellin merkin omalla nesteellä, ei koskaan asetonilla. Varaa huolto 2–3 viikon päähän.",
  ],
  intro: [
    "Akryylikynsien ohje eroaa kaikista geelitekniikoista yhdellä tavalla: massa alkaa kovettua heti, kun sivellin koskettaa jauhetta, ja jokaista helmeä varten on vain muutama minuutti. Siksi akryylin tekijä ei korjaile loputtomasti. Hän asettaa jokaisen helmen kerralla oikein, aina samassa kolmen helmen järjestyksessä.",
    "Artikkeli seuraa VaraaAi Academyn Kynnet-kurssin oppituntia ”Akryylipidennykset: käytäntö vaihe vaiheelta”, jossa akryylipidennykset rakennetaan muotille. Luettuasi osaat valmistella työpisteen, ottaa oikeanlaisen helmen, rakentaa kynnen kolmella helmellä, irrottaa muotin oikealla hetkellä, viimeistellä viilaamalla ja hoitaa siveltimen työn jälkeen.",
  ],
  sections: [
    {
      id: "kolme-periaatetta-ja-tyopiste",
      title: "Kolme periaatetta ja mitä pöydällä tarvitaan",
      blocks: [
        {
          ol: [
            "**Oikean kosteuden helmi.** Kostea, kiiltävä ja pyöreä, ei tipu eikä murene. Siveltimessä olevan nesteen määrä ratkaisee tämän.",
            "**Ei akryyliä iholle.** Sama koskee primeriä. Jos akryyliä joutuu iholle, poista se heti, kun se on vielä pehmeää.",
            "**Apex oikeassa kohdassa.** Toinen helmi asetetaan rasitusalueelle, siihen missä kynsi irtoaa kynsipedistä.",
          ],
        },
        { img: { src: img("dung-cu-dap-bot-acrylic-can-chuan-bi"), alt: "Akryylitarvikkeet kermanvärisellä pyyhkeellä: kannellinen lasiastia, nestepullo, roosa jauhepurkki, sivellin, primer, muotit, viilat, hiomapala, pölyharja ja käsineet", caption: "Akryylityöpiste: pieni kannellinen astia nesteelle, jauhe, sivellin, primer, muotit, viilat, hiomapala ja pölyharja." } },
        { note: "Käynnistä työpisteen kohdepoisto ennen kuin avaat nesteen, ja pidä neste kaukana avotulesta. Suhde, primerin kuivumisaika ja akryylin kovettumisaika noudattavat aina valmistajan ohjetta. Kohdepoistoa ja kemikaaleja koskevat määräykset vaihtelevat maittain ja kunnittain.", kind: "warn", title: "Ennen kuin avaat nesteen" },
        { p: "Miksi liian märkä helmi johtaa allergiaan, miksi liian kuiva saa akryylin irtoamaan ja miten neste valitaan, kerrotaan teoria-artikkelissa [mitä ovat akryylikynnet](lesson:dap-bot-hieu-dung)." },
      ],
    },
    {
      id: "kolmen-helmen-tekniikka",
      title: "Kolmen helmen tekniikka: jokaisella helmellä on oma tehtävä",
      blocks: [
        { p: "Jaa kynsi kolmeen alueeseen ja anna jokaiselle oma helmensä. Näin akryyliä ei tarvitse vetää pitkiä matkoja, mikä on hyvin vaikeaa, kun massa alkaa jo kovettua." },
        {
          table: {
            head: ["Helmi", "Mihin se asetetaan", "Tehtävä"],
            rows: [
              ["Ensimmäinen", "Muotille aivan oman vapaan reunan eteen", "Pituus, kärjen muoto ja suorat sivuseinät"],
              ["Toinen", "Kynnen keskelle rasitusalueelle", "Rakentaa apexin ja liittyy kärkeen"],
              ["Kolmas", "Kynsinauhan lähelle, pienempi helmi", "Painetaan hyvin ohueksi ihoa kohti, hiuksenohut rako jää"],
            ],
          },
        },
        {
          ul: [
            "Paina ja silitä **siveltimen kyljellä** lähes vaakatasossa.",
            "Pyyhi sivellin helmien välillä paperiin ja kasta se uudelleen nesteeseen.",
            "Kolmannen helmen jälkeen silitä kevyesti koko pinta kynsinauhasta kärkeen, jotta se on saumaton ja sileä.",
          ],
        },
        { note: "Harjoitusvaiheessa pienet helmet on helpompi hallita kuin isot. Harjoittele helmen ottamista harjoituskynsillä, kunnes helmet näyttävät joka kerta samanlaisilta.", kind: "tip", title: "Aloittelijalle" },
      ],
    },
    {
      id: "yleisimmat-virheet",
      title: "Akryylin yleisimmät virheet ja niiden korjaus",
      blocks: [
        {
          table: {
            head: ["Mitä näet", "Syy", "Mitä teet"],
            rows: [
              ["Akryyli valuu vapaan reunan alle", "Muotin ja vapaan reunan väliin jäi rako", "Korjaa muotti tiiviiksi ennen ensimmäistä helmeä"],
              ["Helmi tippuu ja valuu kynsivalleihin", "Siveltimessä on liikaa nestettä", "Pyyhi sivellin huolellisemmin astian reunaan ennen jauheeseen koskemista"],
              ["Helmi on kuiva ja mureneva, pinta rakeinen", "Siveltimessä on liian vähän nestettä", "Anna siveltimen imeä nestettä tasaisesti äläkä pyyhi sitä liian kuivaksi"],
              ["Kärki vääntyy muotin irrotuksen jälkeen", "Muotti irrotettiin, kun akryyli oli vielä pehmeää", "Odota valmistajan aika, koputa ja kuuntele kuivaa naksahdusta ennen irrotusta"],
              ["Asiakas tuntee polttelua viilatessa", "Kova painaminen kuumentaa kynnen", "Viilaa kevyellä kädellä äläkä koskaan omaan kynteen tyvessä"],
            ],
          },
        },
      ],
    },
    {
      id: "ohjeet-asiakkaalle",
      title: "Kotihoito-ohjeet akryylikynsien jälkeen",
      blocks: [
        { img: { src: img("bo-mong-dap-bot-acrylic-hoan-thien"), alt: "Asiakkaan kädet päällekkäin kermanvärisellä tyynyllä, kymmenen luonnollisen roosaa akryylikynttä kiiltävinä ja tasaisina" } },
        {
          ul: [
            "Älä nypi kynsiä äläkä käytä niitä työkaluina.",
            "Käytä käsineitä tiskatessa ja siivotessa.",
            "Levitä kynsinauhaöljyä kynsien ympärille joka päivä.",
            "Jos jokin irtoaa, tule takaisin salonkiin. Älä liimaa tai revi sitä itse.",
            "Varaa huolto noin 2–3 viikon päähän.",
          ],
        },
      ],
    },
    {
      id: "siveltimen-puhdistus",
      title: "Akryylisiveltimen puhdistus ja työpisteen siivous",
      blocks: [
        { p: "Akryylisivellin kuluu hyvin nopeasti, jos se puhdistetaan väärin. Puhdista se saman merkin nesteellä. Älä käytä asetonia, sillä se kuivattaa ja vahingoittaa harjaksia. Pyyhi sivellin lopuksi, muotoile se takaisin suippoksi ja säilytä vaakatasossa tai valmistajan suosittelemalla tavalla." },
        { img: { src: img("co-dap-bot-da-rua-sach-dat-nam-ngang"), alt: "Puhdistettu akryylisivellin kermanvärisine harjaksineen vaakatasossa paperilla, vieressä kannellinen lasiastia ja jauhepurkki" } },
        {
          ul: [
            "Sulje astia ja nestepullo tiiviisti.",
            "Ylijäänyttä nestettä ei kaadeta viemäriin. Hävitä se tuotteen käyttöturvallisuustiedotteen mukaan.",
            "Kertakäyttötarvikkeet menevät kannelliseen roska-astiaan.",
            "Metalliset välineet menevät sterilointiin oppitunnin [Välineet jokaisen asiakkaan jälkeen](lesson:ve-sinh-dung-cu) mukaan.",
          ],
        },
      ],
    },
    {
      id: "akryylikynnet-ajanvaraukseen",
      title: "Akryylikynnet salongin ajanvaraukseen ja hinnastoon",
      blocks: [
        { p: "Akryylin huoltoväli on lyhyt, joten seuraava aika kannattaa varata valmiiksi. VaraaAissa [lisäät palvelut](lesson:dich-vu) uusille akryylikynsille ja akryylin huollolle todellisilla kestoilla, varaat huollon 2–3 viikon päähän [ajanvarauskalenteriin](lesson:lich-hen) heti kun asiakas maksaa ja tuot molemmat hinnat salongin [hinnastoon](lesson:bang-gia)." },
      ],
    },
  ],
  howTo: {
    title: "Akryylikynnet ohje: työvaiheet järjestyksessä",
    id: "akryylikynsien-vaiheet",
    after: "kolme-periaatetta-ja-tyopiste",
    lead: "Kaksitoista vaihetta etenevät samassa järjestyksessä kuin oppitunnin video. Vaiheesta 6 alkaen akryyli kovettuu minuutti minuutilta, joten kaiken on oltava valmiina sitä ennen.",
    supplies: [
      "Saman merkin akryylineste ja -jauhe, pieni kannellinen dappen-astia",
      "Akryylisivellin, paperia ja puutikkuja",
      "Dehydraattori ja primer akryylimerkin ohjeen mukaan",
      "Kynsimuotit (tai tipit)",
      "Steriloitu kynsinauhan työnnin, viilat, hienojakoinen hiomapala ja pölyharja",
      "Työpisteen kohdepoisto, hengityssuojain ja suojakäsineet",
      "Kiiltävä päällyslakka tai väri, kynsinauhaöljy",
    ],
    steps: [
      {
        name: "Konsultoi, tarkasta ja käynnistä kohdepoisto",
        text: "Pese ja desinfioi omat ja asiakkaan kädet ja katso tarkasti kynsiä ja niitä ympäröivää ihoa. Kynsipedistä irtoava tai värjäytynyt kynsi, turvonnut punoittava iho, märkä tai avohaava tarkoittavat, että käsittelyä ei tehdä ja asiakas ohjataan lääkäriin. Kysy, onko kynsikäsittely aiemmin aiheuttanut kutinaa, punoitusta tai rakkuloita, kuinka pitkät ja minkä muotoiset kynnet asiakas haluaa, ja kerro jo alussa huollosta 2–3 viikon välein. Käynnistä pöydän kohdepoisto ennen aloittamista.",
      },
      {
        name: "Esikäsittele kynnet kuivana",
        text: "Toimi kuten [geelilakkauksessa](lesson:son-gel): ei liotusta, työnnä kynsinauha varovasti taakse ja poista kynsilevyyn kiinni jäänyt ohut ihokerros. Viilaa vapaa reuna lyhyeksi ja siistiksi, hio kiilto kevyesti pois, harjaa pöly ja puhdista kynnet. Tästä eteenpäin et koske kynnen pintaan.",
      },
      {
        name: "Levitä dehydraattori ja primer",
        text: "Käytä oikeaa tyyppiä ja levitä se valmistajan ohjeen mukaan. Vain yksi hyvin ohut kerros ja vain kynsilevylle, kaukana ihosta ja kynsivalleista, koska primer voi polttaa ihoa. Anna kuivua valmistajan ilmoittama aika.",
      },
      {
        name: "Aseta muotti",
        text: "Muotti asettuu aivan vapaan reunan alle tiiviisti ilman rakoa. Ylhäältä katsottuna se on samassa linjassa sormen kanssa, sivulta katsottuna se jatkaa kynnen linjaa laskematta tai nousematta. Jos väliin jää rako, akryyli valuu alle ja kynnestä tulee sekä ruma että heikko. Jos käytät tippejä, liimaa tippi, joka vastaa tarkalleen kynnen leveyttä, lyhennä se ja viilaa sauma ohueksi ennen akryyliä. Muotin leikkaaminen ja tarkistus käydään läpi artikkelissa [geelipidennykset muotilla](lesson:noi-mong-form).",
      },
      {
        name: "Kaada neste ja kostuta sivellin",
        text: "Kaada vähän nestettä pieneen kannelliseen astiaan, juuri sen verran kuin yksi asiakas tarvitsee, ja avaa jauhepurkki. Kasta sivellin nesteeseen niin, että se imee nestettä tasaisesti, ja pyyhi se kevyesti astian reunaan ylimäärän poistamiseksi. Juuri siveltimeen jäävän nesteen määrä ratkaisee, tuleeko helmestä märkä vai kuiva.",
        image: { src: img("gat-co-vao-thanh-chen-liquid"), alt: "Mustaan käsineeseen pukeutunut käsi pyyhkii akryylisiveltimen kärkeä kirkasta nestettä sisältävän pienen lasiastian reunaan, ja astian kansi on vieressä" },
      },
      {
        name: "Ota helmi",
        text: "Kosketa siveltimen kärjellä jauheen pintaa ja pidä sitä hetki paikallaan, jotta neste imeytyy jauheeseen ja muodostuu pyöreä helmi, ja nosta sitten sivellin. Katso helmeä ennen kuin asetat sen: kostea, kiiltävä ja pyöreä, ei tipu eikä murene. Jos helmi ei ole oikeanlainen, pyyhi sivellin ja ota uusi sen sijaan, että laittaisit sen asiakkaan kynnelle.",
      },
      {
        name: "Ensimmäinen helmi: kärki",
        text: "Aseta ensimmäinen helmi muotille aivan oman kynnen reunan eteen. Odota hetki, että helmi leviää, paina sitten kevyesti siveltimen kyljellä ja silitä siitä pidennetty kärki. Pidä sivuseinät suorina oman kynnen sivujen jatkeena. Pituus ja kärjen muoto syntyvät tällä helmellä.",
        image: { src: img("hat-bot-thu-nhat-tren-form-o-dau-mong"), alt: "Pyöreä roosa akryylihelmi juuri asetettuna metallimuotille aivan oman kynnen reunan eteen, ja sivellin sen yläpuolella", caption: "Ensimmäinen helmi on muotilla aivan oman vapaan reunan vieressä." },
      },
      {
        name: "Toinen helmi: rasitusalue",
        text: "Aseta toinen helmi kynnen keskelle rasitusalueelle, siihen missä kynsi irtoaa kynsipedistä. Tämä helmi rakentaa apexin. Paina kevyesti, silitä niin, että se liittyy saumattomasti kärkeen, ja levitä se tasaisesti molemmille puolille.",
        image: { src: img("hat-bot-thu-hai-o-vung-chiu-luc"), alt: "Roosa akryylikärki on jo painettu tasaiseksi muotille, toinen helmi on kynnen keskellä ja sivellin koskettaa kärkiosaa", caption: "Toinen helmi asetetaan kynnen keskelle apexia varten." },
      },
      {
        name: "Kolmas helmi: kynsinauhan lähelle",
        text: "Kolmas helmi on pienempi ja tulee kynsinauhan lähelle. Silitä se todella ohueksi, yhä ohuemmaksi ihoa kohti, ja jätä hiuksenohut rako. Akryyli ei saa koskaan koskea ihoon; jos niin käy, poista se heti siveltimen kärjellä tai puutikulla, kun se on vielä pehmeää. Silitä lopuksi kevyesti koko pinta kynsinauhasta kärkeen.",
        image: { src: img("hat-bot-thu-ba-mong-gan-chan-mong"), alt: "Pienen siveltimen kärki silittää hyvin ohutta roosaa akryylikerrosta kynsinauhan lähellä, ja akryylin ja ihon väliin jää kapea rako" },
      },
      {
        name: "Anna kovettua, irrota muotti ja tarkista",
        text: "Kovettumisaika riippuu merkistä, yleensä muutama minuutti. Koputa siveltimen vartta kevyesti kynteen: kuiva ja kirkas naksahdus kertoo, että akryyli on kovettunut. Irrota muotti varovasti vetämällä alaspäin, älä taivuttamalla ylös. Ennen viilausta katso sivulta (ohut tyvessä, korkein rasitusalueen päällä, ohenee kärkeä kohti), kärjestä (tasainen C-kaari) ja ylhäältä (suorat sivuseinät, tasapainoinen kärki).",
        image: { src: img("mong-bot-da-cung-sau-khi-thao-form"), alt: "Luonnollisen roosa akryylipidennys, jonka kärki on pyöristetyn kanttinen, pinta vielä matta ja viilaamaton, sivuseinät suorat ja yhdensuuntaiset", caption: "Muotin irrotuksen jälkeen: matta pinta, suorat sivuseinät eikä akryyliä iholla." },
      },
      {
        name: "Viimeistele viilaamalla",
        text: "Kun kohdepoisto on päällä ja hengityssuojain kasvoilla, viilaa kevyellä kädellä. Muotoile kärki, suorista sivuseinät ja tasoita pinta niin, että apex säilyy. Viilaa tyvi todella ohueksi, jotta se sulautuu omaan kynteen, mutta älä viilaa omaa kynttä. Kuljeta hienoa hiomapalaa pinnan yli, harjaa pöly pois puhaltamatta ja puhdista.",
        image: { src: img("dua-canh-ben-mong-bot-cho-thang"), alt: "Harmaa viila kulkee kanttisen roosan akryylikynnen sivuseinää pitkin, ja kynsiteknikon mustissa käsineissä on viilauspölyä" },
      },
      {
        name: "Päällyslakka tai väri ja öljy",
        text: "Luonnolliseen tyyliin riittää yksi kiiltävä päällyskerros. Jos asiakas haluaa värin, levitä se päälle ohuesti ja tasaisesti kuten geelilakkauksessa. Tiputa sitten öljyä jokaisen kynnen ympärille, hiero kevyesti, anna kotihoito-ohjeet ja varaa huolto.",
      },
    ],
  },
  faq: [
    {
      q: "Mihin kolme helmeä asetetaan akryylikynsissä?",
      a: "Ensimmäinen helmi asetetaan muotille aivan oman vapaan reunan eteen, ja siitä tehdään pituus ja kärjen muoto. Toinen tulee kynnen keskelle rasitusalueelle rakentamaan apexin. Kolmas on pienempi, tulee kynsinauhan lähelle ja painetaan hyvin ohueksi koskematta ihoon.",
    },
    {
      q: "Miten akryylihelmi otetaan oikein?",
      a: "Kasta sivellin nesteeseen niin, että se imee nestettä tasaisesti, pyyhi se kevyesti astian reunaan ja kosketa sitten kärjellä jauhetta pitäen sivellintä hetken paikallaan, kunnes muodostuu pyöreä helmi. Hyvä helmi on kostea, kiiltävä ja pyöreä, ei tipu eikä murene. Aloittelijan kannattaa ottaa pieniä helmiä, koska niitä on helpompi hallita.",
    },
    {
      q: "Mistä tietää, että akryyli on kovettunut ja muotin voi irrottaa?",
      a: "Odota valmistajan ilmoittama aika, yleensä muutama minuutti, ja koputa siveltimen vartta kevyesti kynteen. Kuiva ja kirkas naksahdus kertoo, että akryyli on kovettunut. Jos muotti irrotetaan akryylin ollessa vielä pehmeää, kärki vääntyy.",
    },
    {
      q: "Millä akryylisivellin puhdistetaan?",
      a: "Saman merkin nesteellä. Asetonia ei käytetä, koska se kuivattaa ja vahingoittaa harjaksia. Puhdistuksen jälkeen sivellin pyyhitään, muotoillaan takaisin suippoksi ja säilytetään vaakatasossa tai valmistajan suosittelemalla tavalla.",
    },
    {
      q: "Voiko akryylin tehdä tippien päälle muotin sijaan?",
      a: "Oppitunnilla työskennellään muotilla: muotti asettuu tiiviisti vapaan reunan alle ja akryyli rakennetaan sen päälle. Tippejä käytettäessä liimataan tippi, joka vastaa tarkalleen kynnen leveyttä, lyhennetään se ja viilataan sauma ohueksi ennen akryyliä. Sen jälkeen vaiheet ovat samat.",
    },
    {
      q: "Mitä teen, jos akryyliä joutuu iholle?",
      a: "Poista se heti siveltimen kärjellä tai puutikulla, kun se on vielä pehmeää. Nestettä ja kovettumatonta akryyliä ei saa jäädä iholle, koska se aiheuttaa allergiaa ja juuri siitä kohdasta akryyli myös irtoaa ensimmäisenä.",
    },
  ],
  related: ["dap-bot-hieu-dung", "noi-mong-form", "fill-mong", "builder-gel"],
};

export default article;
