import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/5-dang-mong/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "mika-kynsien-muoto-sopii-minulle",
  lesson: "5-dang-mong",
  category: "tips",
  title: "Mikä kynsien muoto sopii minulle? Kantikas, pyöreä, manteli, ballerina vai stiletto",
  metaTitle: "Mikä kynsien muoto sopii minulle? 5 muotoa vertailussa",
  metaDescription:
    "Mikä kynsien muoto sopii sinulle? Kantikas, pyöreä, manteli, ballerina ja stiletto: mikä kestää, mikä katkeaa ja miten valitset sormien ja työn mukaan.",
  keyword: "mikä kynsien muoto sopii minulle",
  keywords: [
    "kantikkaat vai pyöreät kynnet",
    "mantelikynnet",
    "ballerinakynnet",
    "katkeavatko stilettokynnet",
    "kynnet leveälle kynsipedille",
    "kynnet näppäimistötyöhön",
  ],
  excerpt: "Sama käsi, eri kynsien muoto, ja ilme on aivan toinen. Viisi suosittua muotoa, mitkä kestävät, mitkä ovat vaativia ja miten valitset ennen varausta.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("mong-dang-hanh-nhan-tren-hai-ban-tay"),
    alt: "Asiakkaan kädet kermanvärisellä käsityynyllä, kymmenen mantelinmuotoista kynttä maidonroosalla geelilakalla, kärjet kapenevat pehmeästi",
  },
  takeaways: [
    "**Pyöreä** on kestävin muoto, ja se sopii lyhyille kynsille sekä niille, jotka kirjoittavat tai tekevät paljon käsillään.",
    "**Manteli** saa sormet näyttämään pidemmiltä ja kapeammilta, ja se sopii lähes kaikille käsille.",
    "**Kantikas** näyttää siistiltä ja modernilta pitkillä sormilla, mutta hyvin pitkänä sen kulmat tarttuvat helposti.",
    "**Ballerina** tarvitsee pituutta näyttääkseen parhaalta; **stiletto** on rohkein muoto ja katkeaa myös helpoimmin.",
    "Jos omat kyntesi ovat ohuet ja heikot, älä viilauta niitä teräviksi; pitkät ja terävät muodot tehdään rakennekynsiin.",
  ],
  intro: [
    "Mikä kynsien muoto sopii minulle? Vastaus riippuu omista käsistäsi, ei mallikuvasta. Samassa kädessä pelkkä vaihto kantikkaasta manteliin saa sormet näyttämään pidemmiltä ja pehmeämmiltä. Muoto ratkaisee myös, miten kynnet kestävät: osa muodoista myötäilee sormenpäätä ja kestää kolhuja, osa näyttää upealta mutta katkeaa heti, kun kynsi osuu kaapin oveen.",
    "Artikkeli perustuu VaraaAi Academyn kurssin ”Moja Beauty: ripset, kynnet ja kulmat” oppituntiin ”5 kynnen muotoa samassa kädessä”. Kurssi on lyhyitä asiakasvideoita helsinkiläiseltä Moja Beauty -salongilta. Luettuasi erotat viisi suosittua muotoa toisistaan, tiedät mikä sopii sormillesi ja työhösi ja osaat kertoa kynsiteknikolle, mitä haluat.",
  ],
  sections: [
    {
      id: "viisi-muotoa",
      title: "Viisi suosittua kynsien muotoa yhdessä taulukossa",
      blocks: [
        {
          table: {
            head: ["Muoto", "Miltä se näyttää", "Sopii"],
            rows: [
              ["Kantikas", "Suora kärki, terävät kulmat", "Pitkät, kapeat sormet; siisti ilme"],
              ["Pyöreä", "Myötäilee sormenpäätä, luonnollinen", "Lyhyet kynnet, kirjoittaminen, käsityö"],
              ["Manteli", "Kapenee pehmeästi pyöristettyyn kärkeen", "Lähes kaikki kädet"],
              ["Ballerina", "Kapeneva kynsi, suora kärki", "Pitkät kynnet, tyylikäs ja rohkea ilme"],
              ["Stiletto", "Terävä kärki", "Juhlat ja erityiset tilaisuudet"],
            ],
          },
        },
        { p: "Oppitunnin muistisääntö: siistiin kantikas, kestävään pyöreä, sirouteen manteli, tyylikkääseen ballerina ja näyttävään stiletto. Näiden viiden lisäksi salongeissa viilataan usein pyöristettyä kantikasta ja soikeaa, jotka sijoittuvat kantikkaan ja pyöreän väliin." },
      ],
    },
    {
      id: "kantikas-ja-pyorea",
      title: "Kantikkaat vai pyöreät kynnet: siisti vai kestävä",
      blocks: [
        { h3: "Kantikas" },
        { p: "Kärki viilataan suoraan poikki, sivut kulkevat samansuuntaisesti ja molemmat kulmat ovat terävät. Muoto näyttää modernilta ja sopii pitkille, kapeille sormille. Leveä kärki tekee siitä melko kestävän, mutta terävät kulmat tarttuvat vaatteisiin ja laukkuihin ja lohkeilevat. Siksi kantikkaat kynnet näyttävät parhailta lyhyinä tai keskipitkinä." },
        { img: { src: img("mong-dang-vuong-goc-sac-net"), alt: "Asiakkaan kädet käsityynyllä, kymmenen kantikasta kynttä maidonroosalla geelilakalla, suorat kärjet ja kaksi terävää kulmaa", caption: "Kantikas: suora kärki ja terävät kulmat. Hyvin pitkänä kulmat tarttuvat helposti." } },
        { p: "Lyhyissä sormissa ja leveissä kynsipedeissä kantikas muoto voi saada sormet näyttämään lyhyemmiltä. Jos pidät kantikkaasta mutta pelkäät kulmien tarttumista, pyydä kynsiteknikkoa pyöristämään kulmat kevyesti, jolloin saat pyöristetyn kantikkaan." },
        { h3: "Pyöreä" },
        { p: "Kärki seuraa sormenpään kaarta, eikä kulmia ole lainkaan. Se on luonnollisin ja kestävin muoto, koska kolhu ei kohdistu yhteen pisteeseen tai terävään kulmaan. Pyöreä sopii lyhyille kynsille ja niille, jotka kirjoittavat koko päivän näppäimistöllä tai tekevät paljon käsillään." },
        { img: { src: img("mong-dang-tron-ngan-tu-nhien"), alt: "Asiakkaan kädet kermanvärisellä käsityynyllä, kymmenen lyhyttä pyöreää kynttä maidonroosalla geelilakalla tasaisesti sormenpäiden kaarta myötäillen" } },
        { img: { src: img("can-canh-mong-tron-bo-theo-dau-ngon"), alt: "Lähikuva sormenpäästä kynsiteknikon mustakäsineisen käden päällä, lyhyt pyöreä kynsi kiiltävällä vaaleanpunaisella geelillä ja tasainen kaari", caption: "Lyhyet pyöreät kynnet tarttuvat ja katkeavat harvemmin, ja ne sopivat paljon käsillään tekeville." } },
      ],
    },
    {
      id: "manteli-ballerina-stiletto",
      title: "Mantelikynnet, ballerinakynnet ja stiletto",
      blocks: [
        { h3: "Manteli" },
        { p: "Sivut kapenevat kohti kärkeä, joka on pehmeästi pyöristetty kuin manteli. Muoto pidentää sormia silmissä, näyttää naiselliselta ja sopii lähes mihin tahansa käteen. Lyhyet sormet ja leveät kynnet näyttävät usein selvästi kapeammilta, kun muoto vaihdetaan manteliksi." },
        { p: "Hyvä tietää: kohti kärkeä kapeneva muoto jättää kärkeen vähemmän materiaalia. Vahvat omat kynnet kestävät lyhyen mantelin hyvin. Jos kyntesi ovat ohuet ja haluat pitkän mantelin, tee se geeli- tai akryylirakennekynsiin." },
        { h3: "Ballerina" },
        { p: "Kynsi kapenee kuten manteli, mutta kärki viilataan suoraksi kuin balettitossun kärki. Osa salongeista puhuu coffin-muodosta. Muoto on tyylikäs ja persoonallinen, mutta se tarvitsee pituutta ennen kuin muoto erottuu, joten se tehdään yleensä rakennekynsiin." },
        { img: { src: img("mong-dang-ballerina-dau-bang"), alt: "Asiakkaan kädet pystyssä pyyhkeen yllä, kymmenen pitkää ballerinakynttä maidonroosalla geelilakalla, kapenevat sivut ja suoraksi viilatut kärjet", caption: "Ballerina tarvitsee pitkät kynnet. Lyhyissä kynsissä muotoa on vaikea erottaa." } },
        { h3: "Stiletto" },
        { p: "Kärki on viilattu teräväksi. Se on rohkein ja näyttävin muoto, ja samalla se katkeaa helpoimmin, koska jokainen kolhu osuu yhteen pieneen kärkeen. Oppitunti neuvoo pitämään sen mieluummin juhlissa kuin arjessa." },
        { img: { src: img("can-canh-mong-dang-nhon"), alt: "Lähikuva sormesta kynsiteknikon mustakäsineisen käden päällä, pitkä stilettokynsi maidonroosalla geelilakalla kapenee hienoksi kärjeksi" } },
        { note: "Jos omat kyntesi ovat ohuet, pehmeät tai halkeilevat kärjestä, älä viilauta niitä teräviksi äläkä kasvata niitä pitkiksi. Lyhyt pyöreä tai soikea muoto kestää pidempään. Jos haluat stiletot, pyydä ne rakennekynsiin. Artikkeli [geelilakka vai BIAB](lesson:gel-biab-bot-gelx) kertoo eri vaihtoehdoista.", kind: "warn", title: "Heikot kynnet ja terävät muodot" },
      ],
    },
    {
      id: "valitse-sormien-ja-tyon-mukaan",
      title: "Näin valitset muodon sormiesi ja työsi mukaan",
      blocks: [
        { p: "Ennen kuin avaat mallikuvat, katso kolmea asiaa: sormiasi, kynnen tyven muotoa ja sitä, mitä teet päivät pitkät." },
        {
          table: {
            head: ["Sinulla on", "Kokeile näitä"],
            rows: [
              ["Pitkät, kapeat sormet", "Lähes mikä tahansa muoto, myös kantikas"],
              ["Lyhyet sormet, leveät kynnet", "Manteli, soikea; vältä pitkää kantikasta"],
              ["Näppäimistö- tai käsityö", "Pyöreä tai pyöristetty kantikas, lyhyenä"],
              ["Ohuet, katkeilevat kynnet", "Lyhyt pyöreä tai soikea"],
              ["Toive pitkistä, näyttävistä kynsistä", "Ballerina tai stiletto rakennekynsiin"],
            ],
          },
        },
        { img: { src: img("ban-tay-ngon-dai-thon-mong-tu-nhien"), alt: "Naisen kädet, joissa on pitkät ja kapeat sormet, kermanvärisellä käsityynyllä marmoripöydällä, luonnolliset kynnet ilman lakkaa" } },
        { p: "Kynsiteknikoiden usein käyttämä nyrkkisääntö: kärki näyttää yleensä tasapainoisimmalta, kun se toistaa kynnen tyven kaaren. Pyöreään tyveen sopii pyöreä tai soikea, kantikkaampaan tyveen pyöristetty kantikas. Se on lähtökohta eikä sääntö, joten voit silti kokeilla muotoa, josta pidät." },
        { note: "Joillakin työpaikoilla, kuten sairaaloissa ja keittiöissä, on omat sääntönsä kynsistä. Jos työskentelet sellaisessa paikassa, tarkista säännöt ennen kuin valitset pituuden ja muodon.", kind: "info" },
        { p: "Kynsiteknikon kurssin artikkeli [kynsien muodot](lesson:dua-form-mong-hieu-dung) käy läpi seitsemän muotoa tarkemmin ja kertoo, miksi osa kestää paremmin kuin toiset." },
      ],
    },
    {
      id: "kerro-kynsiteknikolle",
      title: "Mitä kertoa kynsiteknikolle, kun haluat uuden muodon",
      blocks: [
        { p: "Mallikuva auttaa, mutta kerro kynsiteknikolle myös, mitä teet työksesi, mistä kohtaa kyntesi yleensä katkeavat ja kuinka kauan haluat kynsien kestävän. Hyvä kynsiteknikko sanoo suoraan, jos valitsemasi muoto ei sovi omille kynsillesi, ja tarjoaa vaihtoehtoja: esimerkiksi lyhyemmän mantelin omiin kynsiin tai rakennekynnet pitkää muotoa varten." },
        { img: { src: img("tho-nail-dua-dau-mong-tao-dang"), alt: "Mustiin käsineisiin pukeutunut kynsiteknikko viilaa suoralla viilalla asiakkaan oman kynnen kärkeä, asiakkaan käsi käsityynyllä valoisassa salongissa", caption: "Omat kynnet viilataan yhteen suuntaan hienolla viilalla eikä syvälle sivukulmiin, jotta kynsi ei heikkene." } },
        { p: "Kaikkien kymmenen kynnen pitää olla samanpituisia ja -muotoisia, ja kärjen pitää osua sormen keskelle. Kun viilaus on valmis, katso kynsiä ylhäältä ja kärjen suunnasta: molempien puolten pitää olla tasaiset. Jos yksi kynsi näyttää vinolta, sano se heti, sillä silloin sen korjaaminen on paljon helpompaa." },
        { p: "Vaihdatko muotoa mutta pelkäät, että geeli irtoaa liian aikaisin? Lue [5 tapaa, joiden takia geelikynnet irtoavat](lesson:5-thoi-quen-gel-bong)." },
      ],
    },
    {
      id: "varaa-uusi-muoto",
      title: "Varaa aika uuteen kynsien muotoon",
      blocks: [
        { p: "Voit [lähettää salongille viestin](lesson:chat-voi-salon) ja kuvan käsistäsi ja kysyä etukäteen, mikä muoto sopii, ja sitten [varata ajan netissä](lesson:dat-lich-online) VaraaAissa: valitse palvelu, valitse aika, valmis. Tämä oppitunti tulee Moja Beautysta Helsingistä, ja sinne voit varata ajan [Moja Beautyn varaussivulta](/b/moja-beauty)." },
      ],
    },
  ],
  faq: [
    {
      q: "Mikä on kestävin kynsien muoto?",
      a: "Pyöreä on kestävin muoto, koska se myötäilee sormenpäätä eikä siinä ole kulmaa tai kärkeä, johon kolhut kohdistuisivat. Pyöreä, soikea ja pyöristetty kantikas ovat omille kynsille käytännöllisimmät muodot, varsinkin lyhyinä.",
    },
    {
      q: "Mitä ovat mantelikynnet ja kenelle ne sopivat?",
      a: "Mantelikynsissä sivut kapenevat kohti pehmeästi pyöristettyä kärkeä kuin manteli. Muoto saa sormet näyttämään pidemmiltä ja kapeammilta ja sopii lähes kaikille käsille. Jos kyntesi ovat ohuet ja haluat pitkän mantelin, tee se rakennekynsiin.",
    },
    {
      q: "Ovatko ballerina- ja coffin-kynnet sama asia?",
      a: "Ovat, ne ovat saman muodon kaksi nimeä: kapeneva kynsi ja suoraksi viilattu kärki kuin balettitossun kärki. Muoto tarvitsee pituutta näyttääkseen oikealta, joten se tehdään yleensä geeli- tai akryylirakennekynsiin.",
    },
    {
      q: "Katkeavatko stilettokynnet helposti?",
      a: "Katkeavat. Stiletto on muodoista se, joka katkeaa helpoimmin, koska kärjessä on hyvin vähän materiaalia ja jokainen kolhu osuu yhteen pieneen kärkeen. Se sopii paremmin juhliin kuin arjen töihin, ja ohuisiin omiin kynsiin se kannattaa tehdä rakennekynsinä.",
    },
    {
      q: "Mikä kynsien muoto sopii lyhyille sormille?",
      a: "Lyhyet sormet ja leveät kynnet näyttävät yleensä kapeammilta manteli- tai soikealla muodolla. Kantikas muoto, varsinkin pitkänä, saa sormet helposti näyttämään lyhyemmiltä.",
    },
    {
      q: "Mikä kynsien muoto sopii, jos kirjoitat paljon näppäimistöllä?",
      a: "Näppäimistöllä paljon kirjoittaville ja käsillään työskenteleville sopivat yleensä parhaiten lyhyet kynnet pyöreänä tai pyöristettynä kantikkaana. Lyhyet kynnet tarttuvat ja katkeavat harvemmin eivätkä ole työn tiellä.",
    },
  ],
  related: ["gel-biab-bot-gelx", "5-thoi-quen-gel-bong", "mong-co-can-tho", "dua-form-mong-hieu-dung"],
};

export default article;
