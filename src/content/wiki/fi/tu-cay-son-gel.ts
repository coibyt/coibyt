import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/tu-cay-son-gel/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "kynnet-geelin-repimisen-jalkeen",
  lesson: "tu-cay-son-gel",
  category: "tips",
  title: "Kynnet geelin repimisen jälkeen: mitä oma kynsi kestää ja miten se toipuu",
  metaTitle: "Kynnet geelin repimisen jälkeen: mitä tapahtuu ja mitä tehdä",
  metaDescription:
    "Kun geelin repii irti, oma kynsi ohenee: karhea, valkolaikkuinen, pehmeä ja hauras. Näin salonki poistaa geelin oikein ja näin hoidat jo revittyjä kynsiä.",
  keyword: "kynnet geelin repimisen jälkeen",
  keywords: [
    "revin geelit irti mitä nyt",
    "miksi geeliä ei saa repiä",
    "heikot kynnet geelin repimisen jälkeen",
    "kynsien hoito geelin jälkeen",
    "miten salonki poistaa geelilakan",
    "valkoiset läikät kynsissä geelin jälkeen",
  ],
  excerpt: "Geeli irtoaa vähän, ja revit sen pois: muutama sekunti vie kerroksen omaa kynttä. Mitä kynsi joutuu kestämään, miten salonki poistaa geelin ja miten hoidat kynttä jälkeenpäin.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tu-cay-son-gel-do-bang-mong-tay"),
    alt: "Lähikuva naisen käsistä, toisen käden peukalon kynsi vääntää punaista geelilakkaa irti toisen käden kynnestä",
  },
  takeaways: [
    "Geeli tarttuu hyvin tiukasti oman kynnen **uloimpaan kerrokseen**. Kun revit geelin, revit samalla tuon kerroksen.",
    "Repimisen jälkeen kynsi on **karhea, valkolaikkuinen, ohut ja pehmeä**: se katkeaa ja lohkeilee helposti ja voi jopa aristaa kosketettaessa.",
    "Oikea tapa on **poisto salongissa**: väri viilataan ohueksi, geeli pehmennetään poistoaineella ja pehmennyt geeli irrotetaan kevyesti.",
    "Ehditkö jo repiä? **Leikkaa kynnet lyhyiksi** ja **levitä kynsiöljyä joka päivä**.",
    "Ohentunut kynsi ei paksunna itsestään; se vahvistuu vähitellen, kun **uusi kynsi kasvaa esiin**.",
  ],
  intro: [
    "Kynnet geelin repimisen jälkeen ovat tuttu näky lähes jokaiselle, joka on käyttänyt geeliä pitkään: reuna irtoaa, kädet ovat joutilaat, ja muutamassa sekunnissa kokonainen pala geeliä lähtee. Tuolla tyydyttävällä hetkellä on hintansa. Geeli ei irtoa yksin, vaan vie mukanaan osan omasta kynnestäsi, ja kynnellä kestää kuukausia kasvattaa menetetty osa takaisin.",
    "Artikkeli perustuu VaraaAi Academyn kurssin ”Moja Beauty: ripset, kynnet ja kulmat” oppituntiin ”Mitä geelilakan repiminen tekee kynsille”. Kurssi on lyhyitä asiakasvideoita helsinkiläiseltä Moja Beauty -salongilta. Ymmärrät, miksi repiminen heikentää kynttä, miten salonki poistaa geelin oikein ja miten hoidat kynsiäsi, jos ehdit jo repiä.",
  ],
  sections: [
    {
      id: "miksi-repiminen-ohentaa",
      title: "Miksi geelin repiminen ohentaa kynsiä",
      blocks: [
        { p: "Kynsi ei ole yksi kova, yhtenäinen levy. Se koostuu monesta hyvin ohuesta keratiinikerroksesta päällekkäin. Lampussa kovetettu geeli tarttuu erittäin tiukasti niistä ylimpään." },
        { p: "Kun revit, veto ei irrota geeliä siististi kynnestä. Se repeää heikommasta kohdasta, ja heikompi kohta on yleensä kynnen kerrosten välissä. Lopputulos: kädessäsi olevan geelipalan alapintaan on tarttunut ohut kerros kynttä." },
        { note: "Suurin osa kynsivaurioista syntyy geelin poistossa, ei laitossa. Syyllinen on repiminen ja raapiminen, ei geeli itse.", kind: "info", title: "Mitä moni ei tiedä" },
      ],
    },
    {
      id: "kynnet-repimisen-jalkeen",
      title: "Miltä kynnet näyttävät geelin repimisen jälkeen",
      blocks: [
        { p: "Huomaat nämä merkit heti repimisen jälkeen:" },
        {
          ul: [
            "Kynnen pinta on **karhea** eikä enää sileä.",
            "Siinä on **valkoisia läikkiä** kohdissa, joista kerroksia lähti.",
            "Kynsi on **ohuempi ja pehmeämpi** ja taipuu kevyestä painalluksesta.",
            "Se **katkeaa ja lohkeilee** helposti kärjestä.",
            "Kosketus voi **aristaa**.",
          ],
        },
        { img: { src: img("mong-san-trang-mong-di-sau-khi-cay-gel"), alt: "Lähikuva omasta kynnestä geelin repimisen jälkeen, pinta karhea ja valkolaikkuinen, ja muutama punainen geelitäplä on jäänyt jäljelle", caption: "Esimerkki siitä, mitä ei pidä tehdä: karhea, valkoinen ja ohentunut kynnen pinta geelin repimisen jälkeen." } },
        { p: "Yksi asia kannattaa erottaa: jos kynsi näyttää hieman valkoiselta ja kuivalta heti salongissa oikein tehdyn poiston jälkeen, se on yleensä vain tilapäisesti kuivunut, ja öljy auttaa. Karheat valkoiset läikät repimisen jälkeen taas ovat kynnen kerroksia, jotka ovat todella lähteneet." },
        { p: "Ohentunut kynsi ei paksunna itsestään. On odotettava, että uusi kynsi kasvaa esiin. Kynsiteknikon kurssin artikkelin [ohuet kynnet geelin poiston jälkeen](lesson:thao-gel-hieu-dung) mukaan sormen kynsi kasvaa noin 3 mm kuukaudessa, ja kokonaan uuteen kynteen menee noin 4–6 kuukautta." },
      ],
    },
    {
      id: "geelin-poisto-salongissa",
      title: "Miten salonki poistaa geelilakan",
      blocks: [
        { p: "Oikea tapa on antaa kynsiteknikon poistaa geeli. Oikein tehty poisto ei ole kiireinen, eikä yhdessäkään vaiheessa raavita voimalla." },
        { img: { src: img("tho-dua-bot-lop-mau-gel-truoc-khi-u"), alt: "Mustiin käsineisiin pukeutunut kynsiteknikko viilaa kevyesti asiakkaan punaisen geelikynnen pintaa suoralla viilalla, muut kynnet vielä kiiltävinä", caption: "Ensimmäinen vaihe: kiilto ja osa väristä viilataan pois, jotta poistoaine pääsee geeliin." } },
        {
          ol: [
            "**Pintakerros viilataan.** Kiiltävä päällyslakka toimii kuin sadetakki, eikä poistoaine pääse sen läpi. Kynsiteknikko viilaa, kunnes kiilto on poissa, ja lopettaa ennen kuin viila osuu omaan kynteen.",
            "**Kynsi kääritään poistoaineeseen.** Kynnen kokoinen vanulappu kostutetaan poistoaineella, asetetaan kynnelle ja kääritään foliolla tai kiinnitetään klipsillä. Liotusaika on tuotteen ohjeen mukainen.",
            "**Odotetaan, että geeli pehmenee.** Kun aikaa on tarpeeksi, geeli turpoaa, halkeilee ja irtoaa kynnestä itsestään. Jos jokin kohta on yhä kiinni, sitä liotetaan lisää eikä raavita.",
            "**Geeli irrotetaan kevyesti.** Kynsiteknikko työntää pehmenneen geelin puutikulla kohti kärkeä. Oman kynnen pinta pysyy ehjänä.",
          ],
        },
        { img: { src: img("dat-bong-tham-dung-dich-thao-gel-len-mong"), alt: "Mustiin käsineisiin pukeutunut kynsiteknikko asettaa poistoaineeseen kostutetun vanulapun asiakkaan punaiselle geelikynnelle, vieressä foliopala ja poistoainepullo" } },
        { img: { src: img("quan-giay-bac-u-mem-son-gel"), alt: "Mustiin käsineisiin pukeutunut kynsiteknikko käärii folion tiiviisti asiakkaan sormenpään ympärille geelin pehmentämiseksi, kaksi sormea jo käärittynä" } },
        { img: { src: img("gel-phong-len-tu-tach-khoi-mong"), alt: "Lähikuva kynnestä liotuksen jälkeen, punainen geeli on turvonnut, halkeillut hiutaleiksi ja irtoaa omasta kynnestä itsestään", caption: "Kun liotusaikaa on tarpeeksi, geeli turpoaa ja halkeilee itsestään. Silloin se irrotetaan, ei aiemmin." } },
        { img: { src: img("day-nhe-gel-da-mem-bang-que-go"), alt: "Mustiin käsineisiin pukeutunut kynsiteknikko työntää appelsiinipuutikulla pehmennyttä punaista geeliä kevyesti kohti asiakkaan kynnen kärkeä" } },
        { p: "Jokainen vaihe kynsiteknikon näkökulmasta on kuvattu artikkelissa [geelilakan poisto vaihe vaiheelta](lesson:thao-gel)." },
      ],
    },
    {
      id: "jo-revitty",
      title: "Revitkö jo geelit irti? Näin toimit nyt",
      blocks: [
        { p: "Älä huolestu liikaa, kynsi kyllä toipuu. Sinun tehtäväsi on suojata heikkoa osaa, kunnes se on kasvanut pois." },
        {
          table: {
            head: ["Mitä teet", "Miksi"],
            rows: [
              ["Leikkaa kynnet lyhyiksi", "Ohut ja pitkä kynsi katkeaa ja lohkeilee helposti"],
              ["Levitä kynsiöljyä joka päivä", "Pitää kynnen ja ihon joustavina, vähemmän kuivina ja hauraina"],
              ["Älä nypi jäljelle jäänyttä geeliä", "Jokainen repäisy vie uuden kerroksen"],
              ["Varaa salongista loppujen poisto", "Liotetaan ja irrotetaan, kynttä ei lähde lisää"],
            ],
          },
        },
        { img: { src: img("nho-dau-duong-len-mong-sau-khi-thao"), alt: "Mustiin käsineisiin pukeutunut kynsiteknikko tiputtaa pipetillä kullankeltaisen tipan kynsiöljyä asiakkaan omalle kynnelle heti geelin poiston jälkeen", caption: "Tippa öljyä joka päivä, hierottuna kynteen ja sen ympärysihoon." } },
        { p: "Jos kynsi on hyvin kipeä, oudosti värjäytynyt, irtoaa kynsipedistä tai sen ympärillä oleva iho on punainen ja turvonnut, kysy lääkäriltä tai apteekista ennen kuin otat geelin uudelleen. Artikkeli [tarvitsevatko kynnet hengähdystauon geelien välissä](lesson:mong-co-can-tho) kertoo, milloin tauko on paikallaan." },
        { note: "Useimmiten repiminen alkaa reunasta, joka on hieman irronnut. Kun vältät tavat, jotka irrottavat geeliä aikaisin, vältät myös kiusauksen repiä. Katso [5 tapaa, joiden takia geelikynnet irtoavat](lesson:5-thoi-quen-gel-bong).", kind: "tip", title: "Ehkäise juurisyy" },
      ],
    },
    {
      id: "varaa-poisto",
      title: "Irtoaako geeli? Varaa poisto tai huolto",
      blocks: [
        { p: "Kun huomaat geelin irtoavan, nopein korjaus on varata aika heti, ennen kuin reuna alkaa häiritä niin paljon, että revit sen. VaraaAissa [varaat ajan netissä](lesson:dat-lich-online) muutamalla vaiheella: valitse geelin poisto tai huolto, valitse aika, valmis. Tämä oppitunti tulee Moja Beautysta Helsingistä, ja sinne voit varata huollon tai geelin poiston [Moja Beautyn varaussivulta](/b/moja-beauty)." },
      ],
    },
  ],
  faq: [
    {
      q: "Onko geelilakan repiminen haitallista?",
      a: "On, se vahingoittaa kynttä. Geeli tarttuu erittäin tiukasti oman kynnen uloimpaan kerrokseen, joten kun revit sen irti, ohut kerros kynttä lähtee mukana. Jälkeenpäin kynsi on yleensä karhea, valkolaikkuinen, ohut, pehmeä ja helposti katkeava.",
    },
    {
      q: "Mitä teen, kun olen revinnyt geelit irti?",
      a: "Leikkaa kynnet lyhyiksi, jotta ohut kynsi katkeaa vähemmän, ja levitä öljyä kynteen ja sen ympärysihoon joka päivä. Älä nypi jäljelle jäänyttä geeliä, vaan varaa poisto salongista. Kynsi vahvistuu vähitellen, kun uusi kynsi kasvaa esiin.",
    },
    {
      q: "Kauanko kynsien toipuminen kestää geelin repimisen jälkeen?",
      a: "Ohentunut kynsi ei paksunna itsestään, vaan on odotettava, että uusi kynsi kasvaa tilalle. Sormen kynsi kasvaa noin 3 mm kuukaudessa, ja kokonaan uuteen kynteen menee noin 4–6 kuukautta.",
    },
    {
      q: "Miten salonki poistaa geelilakan?",
      a: "Kynsiteknikko viilaa pois kiillon ja osan väristä, asettaa kynnelle poistoaineeseen kostutetun vanun, käärii sen foliolla tai kiinnittää klipsillä ja liottaa tuotteen ohjeen mukaan. Kun geeli on pehmennyt, turvonnut ja halkeillut, se irrotetaan kevyesti puutikulla, ja oma kynsi pysyy ehjänä.",
    },
    {
      q: "Miksi kynsissä on valkoisia läikkiä geelin jälkeen?",
      a: "Oikein tehdyn poiston jälkeen hieman valkoiset ja kuivat kynnet ovat yleensä vain tilapäisesti kuivuneet, ja kynsiöljy auttaa. Karheat valkoiset läikät geelin repimisen jälkeen kertovat, että kynnen kerroksia on lähtenyt, ja silloin on odotettava uuden kynnen kasvua.",
    },
  ],
  related: ["5-thoi-quen-gel-bong", "mong-co-can-tho", "gel-biab-bot-gelx", "thao-gel-hieu-dung"],
};

export default article;
