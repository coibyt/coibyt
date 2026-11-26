import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/spa-massage-body/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "rentouttava-vartalohieronta-vaihe-vaiheelta",
  lesson: "spa-massage-body",
  category: "spa",
  title: "Rentouttava vartalohieronta vaihe vaiheelta: 13 vaihetta selälle, hartioille, jaloille ja käsille",
  metaTitle: "Rentouttava vartalohieronta: 13 vaihetta selästä jalkoihin",
  metaDescription:
    "Rentouttava vartalohieronta hoitolassa: huone, haastattelu, peittely, selän sivelyt, hartioiden vaivaaminen, lapaluut, jalat, kääntyminen, kädet ja siivous.",
  keyword: "rentouttava vartalohieronta",
  keywords: [
    "vartalohieronta ohje",
    "selkähieronta ohje",
    "hieronnan peittely",
    "jalkojen hieronta sydäntä kohti",
    "rentouttavan hieronnan järjestys",
    "hieronta aloittelijalle",
  ],
  excerpt: "Rentouttava perushieronta selälle, hartioille, jaloille ja käsille vaihe vaiheelta: peittely alue kerrallaan, sivelyjen suunta, kohdat joita ei paineta ja kuusi virhettä, jotka asiakas muistaa.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("massage-body-thu-gian-vuot-lung-cho-khach"),
    alt: "Hoitaja kumartuu eteenpäin, ja hänen kätensä liukuvat valkoisen pyyhkeen alla vatsallaan makaavan naisasiakkaan selällä kaari-ikkunan vieressä, jonka takana näkyy sypressejä",
  },
  takeaways: [
    "Koko hieronnan ajan pätee kolme asiaa: **kysy ennen kuin aloitat**, paljasta vain hierottava alue ja pidä paine miellyttävänä, ei koskaan kivuliaana.",
    "Pumppaa öljy kämmenille ja lämmitä se; älä koskaan kaada sitä suoraan asiakkaan selkään. Ensimmäisestä kosketuksesta lähtien toinen käsi on aina asiakkaassa.",
    "Sivele selkää alaselästä ylöspäin **selkärangan molemmin puolin** noin kolmesta viiteen kertaa painetta lisäten. Itse selkärankaa ei koskaan paineta.",
    "Jalat ja kädet: sivelyt sydäntä kohti, ja vain yksi jalka tai käsi paljaana kerrallaan. Vältä polvitaivetta, näkyviä suonia ja kainaloa.",
    "Kireässä lihaksessa hidasta ja viivy hetki pidempään; älä paina kovempaa kuin asiakkaasta tuntuu hyvältä.",
  ],
  intro: [
    "Rentouttava vartalohieronta hoitolassa koostuu muutamasta vaiheesta: selän sivelyistä, hartioiden vaivaamisesta, ympyröistä lapaluiden ympärillä sekä jalkojen ja käsien hieronnasta. Se, mitä asiakas hieronnasta muistaa, löytyy kuitenkin otteiden ympäriltä: olivatko kätesi lämpimät, oliko pyyhe tuettu tukevasti ja kysyitkö paineesta.",
    "Artikkeli seuraa VaraaAi Academyn Spa ja ihonhoito -kurssin oppituntia ”Vartalohieronnan perusteet: vaihe vaiheelta”, rentouttavaa hierontaa, jossa keskitytään selkään, hartioihin ja jalkoihin. Luettuasi osaat tehdä koko hieronnan kolmessatoista vaiheessa, peitellä kunkin alueen oikein ja tiedät, mitä kohtia ei koskaan paineta. Tarkka kesto ja järjestys noudattavat oman hoitolasi hoito-ohjelmaa.",
  ],
  sections: [
    {
      id: "kolme-saantoa",
      title: "Vartalohieronnan kolme sääntöä",
      blocks: [
        {
          ol: [
            "**Kysy ennen kuin aloitat.** Terveys, lääkkeet, allergiat, alueet joita asiakas ei halua hierottavan, ja hieronnan aikana paine.",
            "**Paljasta vain hierottava alue.** Muu keho pysyy koko ajan pyyhkeen alla.",
            "**Miellyttävä paine, ei kipua.**",
          ],
        },
        { p: "Myös huone on osa hierontaa. Sen on oltava lämmin ja rauhallinen, koska kylmänä lihakset rentoutuvat huonosti. Hoitopöytä, kasvotuki ja pyyhkeet ovat valmiina ennen kuin asiakas tulee sisään." },
        { img: { src: img("phong-massage-chuan-bi-giuong-khan-va-dau"), alt: "Kermanvärisin kiviseinin sisustettu hierontahuone, jossa valkoisin lakanoin katettu hoitopöytä kasvotukineen ja vieressä pieni pöytä, jolla on pino valkoisia pyyhkeitä ja lasinen pumppupullo öljyä", caption: "Puhtaat lakanat, uusi kasvotuen suojus, iso pyyhe, tukityyny ja öljy pumppupullossa." } },
        { p: "Tämä artikkeli käsittelee käsiotteet. Sääntöjen perustelut, tilanteet joissa hoidosta kieltäydytään ja jalan veritulpan merkit selitetään artikkelissa [Mitä on klassinen hieronta ja milloin ei hierota](lesson:spa-massage-body-hieu-dung). Lue se ennen ensimmäistä asiakasta." },
      ],
    },
    {
      id: "peittely-alueittain",
      title: "Hieronnan peittely alue kerrallaan",
      blocks: [
        { p: "Peite muuttuu sen mukaan, mitä aluetta hierot, mutta periaate pysyy samana: paljasta vain sen verran kuin tarvitaan, tue reunat tukevasti ja peitä alue ennen kuin paljastat seuraavan." },
        {
          table: {
            head: ["Alue", "Miten paljastetaan"],
            rows: [
              ["Selkä", "Pyyhe taitetaan vyötärölle, vain selkä paljaana, reunat tuetaan molemmin puolin"],
              ["Jalkojen takaosat", "Vain toinen jalka nilkasta hieman polven yläpuolelle. Toinen jalka pysyy peitettynä"],
              ["Kääntyminen", "Pyyhettä nostetaan juuri sen verran, toinen reuna pidetään hoitopöytää vasten, asiakas kääntyy sen alla"],
              ["Jalkojen etuosat", "Kuten takaosat: yksi jalka kerrallaan"],
              ["Kädet", "Toinen käsi paljastetaan ja nostetaan pyyhkeen päälle. Se peitetään ennen toista kättä"],
            ],
          },
        },
        { img: { src: img("chi-mo-khan-mot-chan-khi-massage"), alt: "Asiakas makaa vatsallaan valkoisen pyyhkeen alla, vain toinen jalka on paljastettu nilkasta hieman polven yläpuolelle, ja hoitajan kädet lepäävät sen pohkeella", caption: "Vain toinen jalka on paljaana; toinen jalka ja vartalo pysyvät pyyhkeen alla." } },
      ],
    },
    {
      id: "kohdat-joita-ei-paineta",
      title: "Kohdat, joita ei koskaan paineta, ja kohdat, joissa edetään kevyesti",
      blocks: [
        {
          table: {
            head: ["Alue", "Miten toimitaan"],
            rows: [
              ["Selkäranka", "Ei koskaan painetta. Työskentele vain sen molemmin puolin"],
              ["Alaselkä munuaisten kohdalla", "Vain kevyitä sivelyjä, ei lyöntejä eikä kovaa taputusta"],
              ["Niska", "Aina kevyemmin kuin selässä. Ei painetta kaulan etuosaan, ei kiertämistä eikä naksauttamista"],
              ["Polvitaive", "Vältetään"],
              ["Näkyvät suonet jaloissa", "Niitä ei paineta"],
              ["Sääriluu", "Sitä ei paineta"],
              ["Reiden sisäpinta, kainalo", "Vältetään"],
            ],
          },
        },
        { note: "Jos toinen pohje on turvonnut, punainen ja lämmin, älä hiero vaan neuvo asiakasta menemään heti lääkäriin. Asiakkaan niskan kiertäminen tai naksauttaminen ei kuulu rentouttavaan hierontaan. Hieronnan säännöt ja ammattinimikkeet vaihtelevat maittain; artikkeli on koulutusmateriaalia, ei ammattipätevyys.", kind: "warn", title: "Rentouttavan hieronnan rajat" },
      ],
    },
    {
      id: "yleiset-virheet",
      title: "Kuusi virhettä, jotka asiakas muistaa pitkään",
      blocks: [
        {
          table: {
            head: ["Virhe", "Tee näin"],
            rows: [
              ["Kylmä öljy kaadetaan suoraan selkään", "Pumppaa öljy kämmenille ja lämmitä se ennen kosketusta"],
              ["Molemmat kädet nostetaan irti ja lasketaan äkkiä takaisin", "Pidä otetta vaihtaessa aina toinen käsi asiakkaassa"],
              ["Paljaana on enemmän kuin hierottava alue", "Paljasta vain tarpeellinen ja tue reunat tukevasti"],
              ["Selkärankaa painetaan", "Työskentele vain sen molemmin puolin"],
              ["Jatkuva puhe, vaikka asiakas haluaa levätä", "Kysy tarpeellinen ja anna sitten asiakkaan olla"],
              ["Paineesta kysyminen unohtuu", "Kysy ensimmäisten selkäsivelyjen jälkeen ja uudelleen hartioita vaivatessa"],
            ],
          },
        },
        { p: "Kun vältät nämä kuusi virhettä, asiakas näkee sinut jo todellisena ammattilaisena." },
      ],
    },
    {
      id: "hieronnan-jalkeen",
      title: "Hieronnan jälkeen: ohjeet ja muistiinpanot seuraavaa kertaa varten",
      blocks: [
        { p: "Jälkiohjeet ovat lyhyet ja rehelliset: seuraavana päivänä voi tuntua lievää arkuutta, etenkin napakan paineen jälkeen. Voimakkaasta kivusta tai mustelmista asiakkaan kannattaa kertoa hoitolaan." },
        { p: "Kirjaa ennen huoneen siivousta kolme asiaa: asiakkaan mieluisa paine, vältettävät alueet ja käytetty öljy. VaraaAissa ne merkitään asiakkaan sisäisiin muistiinpanoihin [asiakasrekisterissä](lesson:khach-hang). Seuraava aika voidaan varata, kun asiakas on vielä vastaanotossa, suoraan hoitolan [ajanvarauskalenteriin](lesson:lich-hen)." },
      ],
    },
  ],
  howTo: {
    title: "Vartalohieronnan vaiheet järjestyksessä",
    id: "vartalohieronnan-vaiheet",
    after: "kolme-saantoa",
    lead: "Kolmetoista vaihetta etenevät oppitunnin videon järjestyksessä: asiakas makaa ensin vatsallaan selän, hartioiden ja jalkojen ajan ja kääntyy sitten selälleen käsiä ja hartioita varten.",
    supplies: [
      "Korkeussäädettävä hierontapöytä kasvotukineen",
      "Puhtaat lakanat, uusi kasvotuen suojus, iso pyyhe ja tukityyny",
      "Hierontaöljy pumppupullossa",
      "Esitietolomake",
      "Juomavettä asiakkaalle hieronnan jälkeen",
      "Kannellinen pyykkikori ja pintojen desinfiointiaine",
    ],
    steps: [
      {
        name: "Valmistele huone",
        text: "Huoneen on oltava lämmin ja rauhallinen. Pyyhi ja desinfioi hoitopöytä ja kasvotuki, levitä puhtaat lakanat ja uusi kasvotuen suojus ja pidä iso pyyhe ja tukityyny valmiina. Säädä pöydän korkeus itsellesi sopivaksi, jotta voit työskennellä kumartumatta.",
        image: { src: img("lau-khu-khuan-giuong-massage"), alt: "Mustiin käsineisiin pukeutunut hoitaja pyyhkii hierontapöytää paperilla ja suihkepullolla, ja taustalla työkaveri vetää esiin uutta pöytäpaperirullaa" },
      },
      {
        name: "Haastattele ennen aloitusta",
        text: "Kysy terveydestä, lääkkeistä, öljy- ja pähkinäallergioista, tuoreista vammoista tai leikkauksista sekä alueista, joita asiakas ei halua hierottavan. Suonikohjuja ei paineta koskaan; jos toinen pohje on turvonnut, punainen ja lämmin, älä hiero vaan neuvo menemään heti lääkäriin. Kerro sitten, miten asiakas peitellään, millainen paine on ja että hän voi pyytää lopettamaan milloin tahansa.",
      },
      {
        name: "Anna asiakkaan riisuutua yksin",
        text: "Poistu huoneesta. Pyydä asiakasta käymään vatsalleen kasvot kasvotukeen ja vetämään iso pyyhe hartioihin asti; alusvaatteet saavat jäädä päälle. Koputa ja odota vastausta ennen kuin palaat. Pese kädet saippualla, kuivaa ne ja hiero ne lämpimiksi.",
      },
      {
        name: "Peittele niin, että vain selkä on paljaana",
        text: "Taita pyyhe vyötärölle ja tue reunat tukevasti molemmin puolin. Jos asiakas haluaa, aseta pieni tukityyny nilkkojen alle. Kysy, onko hänellä riittävän lämmin, koska kylmänä lihakset rentoutuvat huonosti.",
      },
      {
        name: "Ota öljyä ja kosketa ensimmäisen kerran",
        text: "Pumppaa vähän öljyä kämmenille ja lämmitä se; älä koskaan kaada sitä suoraan asiakkaan selkään. Laske molemmat kädet hyvin kevyesti hänen selälleen ja pidä ne hetken paikallaan. Tästä eteenpäin toinen käsi pysyy aina asiakkaassa, kun vaihdat otetta.",
        image: { src: img("dat-hai-tay-len-lung-khach-truoc-khi-vuot"), alt: "Hoitaja laskee molemmat kätensä kevyesti vatsallaan kasvotuessa makaavan naisasiakkaan selän keskelle, ja valkoinen pyyhe peittää hänet vyötäröstä alaspäin", caption: "Ensimmäinen kosketus: kädet lepäävät kevyesti ja pysyvät hetken paikallaan." },
      },
      {
        name: "Sivele selkää",
        text: "Molemmat kämmenet kulkevat alaselästä ylöspäin selkärangan molemmin puolin hartioille, kaartavat sivuille ja palaavat kevyesti alas. Etene hitaasti noin kolmesta viiteen kertaa ja lisää painetta vähitellen, jotta lihakset lämpenevät ennen syvempiä otteita. Seiso toinen jalka edessä ja toinen takana, käytä kehon painoa ja pidä selkä suorana. Kysy sitten, onko paine sopiva.",
      },
      {
        name: "Vaivaa hartioita ja sivele niskaa",
        text: "Hartioiden päällinen lihas kaulan ja olkapään välissä on yleensä kaikkein kireimmillään. Nosta sitä kevyesti peukalon ja sormien välissä ja vaivaa hitaasti ja tasaisesti puristamatta kovaa tai nipistämättä, ja kysy paineesta uudelleen. Sivele niskaa sormenpäillä kevyesti hiusrajasta alas hartioille kaularangan molemmin puolin, kevyemmin kuin selkää. Kaulan etuosaa ei paineta, eikä asiakkaan niskaa koskaan kierretä tai naksauteta.",
        image: { src: img("nhao-co-vai-khi-massage-body"), alt: "Hoitajan kädet tarttuvat kevyesti kaulan ja olkapään väliseen lihakseen vatsallaan makaavalla naisasiakkaalla, jonka selkä on paljaana ja pyyhe peittää vyötäröstä alaspäin", caption: "Hartioiden vaivaaminen: nosta kevyesti ja hitaasti, ei puristamista eikä nipistämistä." },
      },
      {
        name: "Tee peukaloympyröitä lapaluiden ympärille ja selkärangan viereen",
        text: "Tee peukalolla pieniä ympyröitä lapaluiden ympärille ja selkärangan molemmin puolin, ei koskaan itse rangan päälle. Alaselän munuaisalueella käytetään vain kevyitä sivelyjä. Kireässä kohdassa hidasta ja viivy hetki pidempään, mutta älä paina kovempaa kuin asiakkaasta tuntuu hyvältä. Lopuksi kevyt taputus, jos asiakas pitää siitä, muutama pitkä sively ja selkä takaisin peittoon.",
        image: { src: img("xoa-vong-quanh-xuong-ba-vai"), alt: "Ylhäältä kuvattuna hoitajan kädet lepäävät lapaluiden ympärillä vatsallaan makaavan asiakkaan selällä selkärangan molemmin puolin" },
      },
      {
        name: "Hiero jalkojen takaosat",
        text: "Paljasta vain toinen jalka nilkasta hieman polven yläpuolelle ja tue pyyhe tukevasti. Sivele nilkasta ylös kohti polvea eli sydäntä kohti ja vaivaa sitten pohjetta kevyesti niin, että kädet vuorotellen nostavat lihasta ja päästävät sen. Vältä polvitaivetta äläkä paina näkyviä suonia. Peitä jalka ennen kuin paljastat toisen.",
        image: { src: img("vuot-bap-chan-tu-co-chan-len-goi"), alt: "Lähikuva hoitajan käsistä, jotka kehystävät vatsallaan makaavan asiakkaan pohkeen ja sivelevät nilkasta kohti polvea, valkoinen pyyhe tukevasti polven yläpuolella", caption: "Sively nilkasta polveen, sydäntä kohti." },
      },
      {
        name: "Auta asiakas kääntymään",
        text: "Nosta pyyhettä juuri sen verran, pidä toinen reuna tukevasti hoitopöytää vasten ja katse asiakkaan kasvojen suuntaan. Pyydä asiakasta kääntymään selälleen pyyhkeen alla, jotta hän pysyy koko ajan peitettynä. Laita tukityyny polvien alle, jos hän haluaa. Jos hoitoon kuuluvat jalkojen etuosat, toimi kuten takaosissa: yksi jalka kerrallaan nilkasta polveen, sääriluuta ei paineta ja reiden sisäpinta vältetään.",
      },
      {
        name: "Hiero kädet ja hartiat",
        text: "Paljasta asiakkaan toinen käsi ja nosta se pyyhkeen päälle. Toinen kätesi pitää kevyesti ranteesta, ja toinen sivelee ranteesta kyynärpäähän eli sydäntä kohti kainaloa välttäen. Peitä käsi ja hiero toinen. Siirry sitten pöydän päätyyn, aseta kädet asiakkaan hartioille ja paina kevyesti alas muutaman hengityksen ajan.",
        image: { src: img("vuot-canh-tay-tu-co-tay-len-khuyu"), alt: "Asiakas makaa selällään valkoinen pyyhe solisluihin asti, toinen käsi pyyhkeen päällä, ja hoitaja tukee hänen rannettaan ja sivelee kyynärvartta" },
      },
      {
        name: "Lopeta hieronta",
        text: "Pidä kädet hetken paikallaan asiakkaan hartioilla ja kerro sitten lempeästi, että hieronta on valmis. Poistu huoneesta, jotta asiakas voi nousta hitaasti istumaan ja pukeutua. Tarjoa lasillinen vettä, kysy, miltä hänestä tuntuu, ja kerro, että seuraavana päivänä voi tuntua lievää arkuutta, mutta voimakkaasta kivusta tai mustelmista kannattaa kertoa hoitolaan. Kirjaa mieluisa paine, vältettävät alueet ja käytetty öljy.",
      },
      {
        name: "Siivoa",
        text: "Laita lakanat, pyyhkeet ja kasvotuen suojus kannelliseen pyykkikoriin. Pyyhi ja desinfioi hoitopöytä ja kasvotuki, pyyhi öljypullo ja [pese kädet](lesson:rua-tay-gang-tay).",
      },
    ],
  },
  faq: [
    {
      q: "Mitä vaiheita rentouttavaan vartalohierontaan kuuluu?",
      a: "Huoneen ja hoitopöydän valmistelu, haastattelu, asiakkaan riisuutuminen ja asettuminen vatsalleen, peittely niin että vain selkä on paljaana, öljy, selän sivelyt, hartioiden vaivaaminen ja niskan sively, peukaloympyrät lapaluiden ympärillä, jalkojen takaosat, kääntyminen, kädet ja hartiat sekä lopetus ja siivous. Tarkka kesto ja järjestys noudattavat kunkin hoitolan hoito-ohjelmaa.",
    },
    {
      q: "Mihin suuntaan selkää hierotaan?",
      a: "Molemmat kämmenet kulkevat alaselästä ylöspäin selkärangan molemmin puolin hartioille, kaartavat sivuille ja palaavat kevyesti alas. Etene hitaasti noin kolmesta viiteen kertaa ja lisää painetta vähitellen, jotta lihakset lämpenevät. Itse selkärankaa ei koskaan paineta, ja alaselän munuaisalueella käytetään vain kevyitä sivelyjä.",
    },
    {
      q: "Hierotaanko jalkoja ja käsiä ylös vai alas?",
      a: "Sydäntä kohti: jaloissa nilkasta polveen ja käsissä ranteesta kyynärpäähän. Jalkoja hierottaessa vältetään polvitaivetta, eikä näkyviä suonia tai sääriluuta paineta. Käsissä vältetään kainaloa.",
    },
    {
      q: "Pitääkö jumissa olevaa lihasta painaa kovempaa?",
      a: "Ei pidä. Kireässä kohdassa hoitaja hidastaa ja viipyy hetken pidempään, mutta ei paina kovempaa kuin asiakkaasta tuntuu hyvältä. Rentouttavassa hieronnassa paine on miellyttävä, ei kivulias.",
    },
    {
      q: "Miten asiakas peitellään oikein vartalohieronnassa?",
      a: "Asiakas makaa ison pyyhkeen alla, ja vain hierottava alue paljastetaan. Selkää varten pyyhe taitetaan vyötärölle ja tuetaan molemmin puolin; jaloista paljastetaan yksi kerrallaan nilkasta hieman polven yläpuolelle. Kääntyessä pyyhettä nostetaan juuri sen verran, että asiakas kääntyy sen alla pysyen peitettynä.",
    },
    {
      q: "Onko normaalia, että vartalohieronnan jälkeen on arka olo?",
      a: "Seuraavana päivänä voi tuntua lievää arkuutta, etenkin napakan paineen jälkeen. Voimakkaasta kivusta tai mustelmista kannattaa kertoa hieronnan tehneeseen hoitolaan.",
    },
  ],
  related: ["spa-massage-body-hieu-dung", "spa-massage-mat", "spa-tay-chan", "rua-tay-gang-tay"],
};

export default article;
