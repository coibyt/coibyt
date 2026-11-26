import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/say-tao-kieu/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "foonaus-pyoroharjalla-ohje",
  lesson: "say-tao-kieu",
  category: "hair",
  title: "Föönaus pyöröharjalla: 10 vaihetta sileään ja kohottavaan föönaukseen pitkille hiuksille",
  metaTitle: "Föönaus pyöröharjalla: ohje 10 vaiheessa",
  metaDescription:
    "Föönaus pyöröharjalla vaihe vaiheelta: pyyhekuivaus, lämpösuoja, esikuivaus, jaot niskasta alkaen, viileä puhallus, tyvikohotus ja pehmeästi taipuvat latvat.",
  keyword: "föönaus pyöröharjalla",
  keywords: [
    "föönaus ohje",
    "kampaamon föönaus vaihe vaiheelta",
    "tyvikohotus föönillä",
    "latvat sisäänpäin föönillä",
    "pitkien hiusten föönaus kotona",
    "hiukset sotkeutuivat pyöröharjaan",
    "miksi föönaus lässähtää",
  ],
  excerpt: "Kymmenen vaihetta pitkien kerroksellisten hiusten sileään ja kiiltävään föönaukseen kevyellä tyvikohotuksella ja pehmeillä latvoilla, sekä virheet, joiden takia kampaus lässähtää.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-toc-say-tao-kieu-ghe-khach-vua-tam"),
    alt: "Selkä suorana seisova kampaaja föönaa asiakkaan pitkiä vaaleita hiuksia pyöröharjalla ja föönillä, asiakas istuu violetissa samettituolissa pariisilaistyylisessä salongissa",
  },
  takeaways: [
    "Esikuivaa käsin noin **seitsemän–kahdeksankymmenen prosentin kuivuuteen** ennen kuin otat pyöröharjan.",
    "Jaa hiukset ja aloita **niskan** kerroksesta, jokainen jako enintään harjan levyinen.",
    "Kapea suutin on harjan suuntainen, **osoittaa alaspäin** muutaman sentin päässä ja seuraa harjaa tyvestä latvaan.",
    "Pidä jokainen valmis jako harjalla ja paina **viileää puhallusta** muutama sekunti ennen kuin irrotat sen.",
    "Päälaen kohotusta varten nosta jako korkealle ja kuivaa tyvi ensin. Tyven ja niskan on oltava täysin kuivat, jotta kampaus pysyy.",
  ],
  intro: [
    "Föönaus pyöröharjalla niin, että hiuksiin tulee kohotusta ja ne pysyvät silti sileinä, ei riipu kalliista harjasta tai tehokkaasta föönistä. Se riippuu järjestyksestä: suurin osa vedestä kuivataan ensin käsin, hiukset jaetaan ohuisiin kerroksiin, ilma puhaltaa aina hiusvartta pitkin alaspäin, ja jokainen jako saa jäähtyä harjalla ennen kuin se päästetään irti. Jos yksikin näistä neljästä jää pois, hiukset joko pörröistyvät tai lässähtävät tunnissa.",
    "Artikkeli seuraa VaraaAi Academyn Hiukset-kurssin oppituntia ”Föönaus ja muotoilu: käytäntö vaihe vaiheelta”. Föönaus on tehty pitkille kerroksellisille hiuksille: sileä ja kiiltävä, kevyt tyvikohotus ja pehmeästi taipuvat latvat. Kymmenen vaiheen avulla föönaat koko tukan ja osaat näyttää asiakkaalle, miten hän tekee saman kotona. Jokaisen liikkeen syy selitetään teoria-artikkelissa [hiusten föönaus ilman vaurioita](lesson:say-tao-kieu-hieu-dung).",
  ],
  sections: [
    {
      id: "nelja-periaatetta",
      title: "Neljä periaatetta, jotka pätevät koko föönauksen ajan",
      blocks: [
        { p: "Alla olevat kymmenen vaihetta muuttuvat pään alueelta toiselle, mutta nämä neljä asiaa pysyvät samoina föönin käynnistämisestä sammuttamiseen." },
        {
          table: {
            head: ["Periaate", "Miksi"],
            rows: [
              ["Suutin osoittaa hiusvartta pitkin alaspäin", "Alas puhaltava ilma tekee hiuksista kiiltävät; latvoista ylös puhaltava pörröistää ne heti"],
              ["Fööni on aina liikkeessä", "Liian kauan yhdessä kohdassa pidetty fööni kärventää hiukset ja polttaa hiuspohjaa"],
              ["Ohuet jaot, enintään harjan levyiset", "Liian paksussa jaossa pinta kuivuu ja sisus jää kosteaksi"],
              ["Täysin kuiva, sitten jäähdytetty", "Kosteana tai kuumana irrotettu hius lässähtää"],
            ],
          },
        },
        { note: "Käytä lämpösuojaa ja seerumia tuotteen ohjeen ja fööniä valmistajan ohjeen mukaan. Oppitunti on koulutusmateriaalia, ei ammattipätevyys.", kind: "info", title: "Ennen kuin aloitat" },
      ],
    },
    {
      id: "yleiset-virheet",
      title: "Pörröisyys, lässähtävä föönaus ja harjaan sotkeutuneet hiukset: virheet ja korjaukset",
      blocks: [
        {
          table: {
            head: ["Mitä tapahtuu", "Syy", "Korjaus"],
            rows: [
              ["Hiukset pörröistyvät föönatessa", "Suutin osoittaa ylöspäin, latvoista tyveä kohti", "Käännä fööni niin, että ilma kulkee tyvestä latvaan"],
              ["Kärventyneet hiukset, asiakas sanoo hiuspohjan polttavan", "Fööniä pidetty liian kauan yhdessä kohdassa", "Pidä fööni liikkeessä ja kauempana ihosta korvien ja niskan lähellä"],
              ["Kampaus lässähtää tunnissa", "Liian paksut jaot, sisältä yhä kosteat", "Ota ohuempia jakoja ja tunnustele tyvi ja niska kädellä"],
              ["Suortuva oikenee heti, kun harja irrotetaan", "Harja irrotettiin hiusten ollessa vielä kuumat", "Viileä puhallus muutama sekunti, irrota vasta jäähtyneenä"],
            ],
          },
        },
        { note: "Jos hiukset sotkeutuvat pyöröharjaan, älä nyi: nykiminen katkoo hiuksia ja sattuu asiakkaaseen. Sammuta fööni, kierrä harjaa hitaasti takaisin ja selvitä vähän kerrallaan. Lisälämpö jo valmiiksi kireällä olevaan hiukseen vain pahentaa vauriota.", kind: "warn", title: "Kun hiukset sotkeutuvat pyöröharjaan" },
      ],
    },
    {
      id: "asiakkaan-mukaan",
      title: "Asiakkaan mukaan: täysin suorat, enemmän kohotusta, otsatukka",
      blocks: [
        {
          ul: [
            "**Asiakas haluaa täysin suorat hiukset vähällä kohotuksella.** Vaihda pyöröharja melaharjaan. Harjaa tyvestä latvaan fööni harjan yläpuolella, suutin edelleen alaspäin.",
            "**Asiakas haluaa enemmän kohotusta päälaelle.** Kierrä jako viileän puhalluksen jälkeen rullalle, kiinnitä se kevyesti klipsillä päätä vasten, odota, kunnes se on täysin jäähtynyt, ja poista klipsi ja silitä suortuva kevyesti kädellä.",
            "**Paksut hiukset.** Ota harjan leveyttä ohuempia jakoja, jotta ilma pääsee niiden läpi kokonaan.",
            "**Värjätyt, vaalennetut tai ohuet hiukset.** Ne tarvitsevat lämpösuojaa vielä enemmän ja vielä matalamman lämpötilan.",
          ],
        },
        { h3: "Otsatukka kuivataan ensin" },
        { p: "Otsatukka kuivuu hyvin nopeasti, joten jos asiakkaalla on sellainen, kuivaa se kaikkein ensimmäisenä heti pyyhekuivauksen jälkeen. Suutin alaspäin, kampaa vasemmalle ja sitten oikealle, kuten artikkelissa [verhotukan leikkaus](lesson:cat-mai)." },
        { img: { src: img("say-toc-mai-truoc-tien"), alt: "Kampaaja kuivaa vaalean asiakkaan otsatukkaa pienellä pyöröharjalla, musta fööni osoittaa ylhäältä alas ja asiakkaan silmät ovat kiinni", caption: "Otsatukka kuivataan ennen kuin se ehtii kuivua itsestään väärään suuntaan." } },
      ],
    },
    {
      id: "foonaus-kotona",
      title: "Pitkien hiusten föönaus kotona: mitä näytät asiakkaalle",
      blocks: [
        { p: "Asiakkaalla ei ole kotona salongin koko välineistöä, joten näytä, miten hän kuivaa hiuksensa omalla föönillään ja harjallaan. Nämä ohjeet toimivat millä tahansa föönillä:" },
        {
          ol: [
            "Kuivaa pyyhkeellä painelemalla, älä hankaa.",
            "Kuivaa ensin käsin, kunnes hiukset ovat enää hieman kosteat, ja ota vasta sitten harja.",
            "Pidä suutin alaspäin ja fööni liikkeessä.",
            "Kuivaa tyvi ensin, koska se kuivuu hitaimmin.",
            "Kuivaa loppuun asti. Jos tyveen tai niskaan jää kosteutta, kampaus lässähtää.",
          ],
        },
        { img: { src: img("toc-dai-co-tang-sau-khi-say-tao-kieu"), alt: "Pitkähiuksinen nainen, jonka kerroksellinen hunajanvaalea tukka on föönauksen jälkeen sileä ja kiiltävä, tyvessä kevyt kohotus ja kasvojen ympärillä olevat suortuvat käännetty ulospäin", caption: "Tavoite: sileä, kiiltävä, kevyt tyvikohotus ja kasvot avaavat suortuvat." } },
        { p: "Oppitunnin hiukset ovat pitkät ja kerrokselliset, ja kerrokset keventävät pitkiä hiuksia ja tekevät niistä helpompia muotoilla föönillä. Jos asiakas valittaa pitkien hiustensa painuvan aina päätä vasten, katso myös [mikä on kerrosleikkaus](lesson:cat-nu-tang-hieu-dung)." },
      ],
    },
    {
      id: "turvallisuus-ja-hygienia",
      title: "Föönin turvallinen käyttö ja harjojen hygienia",
      blocks: [
        {
          ul: [
            "Tarkista fööni ennen käyttöä: suutin tukevasti paikallaan, suodatin puhdas, johto ehjä eikä taittunut tai haljennut.",
            "Älä koskaan paina suutinta hiuspohjaa vasten. Korvien ja niskan lähellä ole varovainen ja pidä fööni hieman kauempana ihosta.",
            "Suojaa asiakkaan korva kädelläsi, kun kuivaat aivan sen vierestä, ja kysy, onko liian kuuma.",
            "Suihkuta lämpösuoja kaukana asiakkaan kasvoista.",
            "Kun asiakas lähtee, poista hiukset harjoista, pese ja desinfioi ne tuotteen ohjeen mukaan, kuten artikkelissa [välineiden desinfiointi](lesson:ve-sinh-dung-cu). Irrota fööni verkkovirrasta ja anna sen jäähtyä ennen kuin laitat sen pois.",
          ],
        },
        { note: "Hygieniamääräykset ja alan harjoittamisen säännöt vaihtelevat maittain. Tarkista oman työpaikkasi vaatimukset.", kind: "warn", title: "Säännöt vaihtelevat" },
      ],
    },
    {
      id: "asiakastiedot",
      title: "Kirjaa ylös, niin kuka tahansa föönaa asiakkaan toiveen mukaan",
      blocks: [
        { p: "Kanta-asiakas haluaa yleensä saman föönauksen kuin viimeksi, myös silloin, kun hänen tavallinen kampaajansa on vapaalla. Kirjaa VaraaAissa asiakkaan muistiinpanoihin [asiakastiedoissa](lesson:khach-hang) kolme asiaa: mikä harja, mitkä tuotteet ja pitääkö asiakas kohottavasta vai sileästä. Jos salonki ottaa vastaan myös pelkkää föönausta varten tulevia asiakkaita, [luo palvelu](lesson:dich-vu) ”Pelkkä föönaus” omalla kestollaan palvelun ”Leikkaus + föönaus” rinnalle, jotta [ajanvarauskalenteri](lesson:lich-hen) vastaa kunkin asiakkaan todellista aikaa." },
      ],
    },
  ],
  howTo: {
    title: "Föönaus pyöröharjalla kohotusta varten: työvaiheet",
    id: "pyoroharjafoonauksen-vaiheet",
    after: "nelja-periaatetta",
    lead: "Kymmenen vaihetta oppitunnin videon järjestyksessä vastapestyille pitkille kerroksellisille hiuksille.",
    supplies: [
      "Pyöröharja, melaharja ja klipsit puhdistettuina edellisen asiakkaan jälkeen",
      "Harva kampa takkujen selvittämiseen",
      "Fööni, jossa on kapea suutin ja viileän puhalluksen painike",
      "Puhdas pyyhe",
      "Lämpösuoja sekä hieman hiusöljyä tai seerumia latvoihin",
    ],
    steps: [
      {
        name: "Valmistele harjat, fööni ja tuoli",
        text: "Pyöröharja, melaharja ja klipsit on puhdistettu edellisen asiakkaan jälkeen. Tarkista fööni: suutin tukevasti paikallaan, suodatin puhdas, johto ehjä eikä taittunut tai haljennut. Nosta asiakkaan tuoli niin, että kyynärpääsi pysyvät olkapäiden alapuolella, koska pysyt tässä asennossa koko föönauksen ajan.",
      },
      {
        name: "Pyyhekuivaa ja selvitä takut",
        text: "Kääri hiukset pyyhkeeseen ja paina kevyesti tyvestä latvoihin hankaamatta. Selvitä takut harvalla kammalla latvoista alkaen ja pidä toisella kädellä kiinni hiuksista yläpuolelta, jotta et vedä asiakkaan hiuspohjasta.",
        image: { src: img("go-roi-toc-uot-tu-ngon-len"), alt: "Kampaaja pitää yhdellä kädellä asiakkaan pitkien märkien hiusten keskiosasta ja kampaa toisella kädellä latvat selviksi sen alapuolelta", caption: "Ylempi käsi pitää hiuksista, kampa käsittelee vain sen alapuolella olevia latvoja." },
      },
      {
        name: "Levitä lämpösuoja",
        text: "Suihkuta tasaisesti pituuksiin ja latvoihin pienen matkan päästä tuotteen ohjeen mukaisen määrän. Latvat ovat hiusten heikoin kohta, joten älä unohda niitä. Suihkuta kaukana asiakkaan kasvoista ja kampaa sitten vielä kerran läpi, jotta tuote levittyy tasaisesti.",
        image: { src: img("xit-bao-ve-nhiet-len-than-va-ngon-toc"), alt: "Kampaaja suihkuttaa tuotetta asiakkaan pitkien kosteiden hiusten pituuksiin ja latvoihin ja tukee toisessa kädessä olevalla kammalla suortuvaa alhaalta" },
      },
      {
        name: "Esikuivaa käsin",
        text: "Ei vielä harjaa. Pidä fööniä yhdessä kädessä suutin alaspäin noin kämmenen mitan päässä hiuksista. Vie toinen käsi tyveen ja nosta ja pöyhi hiuksia kevyesti. Kuivaa tyvi ensin ja pidä fööni liikkeessä, kunnes hiukset ovat noin seitsemän–kahdeksankymmenen prosentin kuivuudessa. Tarkista viemällä käsi tyveen niskassa ja korvien takana: jos ne tuntuvat vielä viileiltä ja märiltä, jatka; hieman kosteat, keveät ja ilmavat hiukset riittävät.",
        image: { src: img("say-so-toc-bang-tay-dau-may-chia-xuong"), alt: "Kampaaja esikuivaa asiakkaan pitkiä kosteita hiuksia ilman harjaa, toinen käsi päälaen tyvessä ja toisessa kädessä alaspäin osoittava fööni", caption: "Esikuivaus: pelkkä käsi ja fööni, ei vielä harjaa." },
      },
      {
        name: "Jaa hiukset ja jätä niskaan kerros",
        text: "Kiinnitä kaikki ylemmät hiukset päälaelle ja jätä niskaan vain ohut, suunnilleen harjan levyinen kerros. Siistit jaot kuivuvat nopeammin, eikä yksikään jako jää väliin.",
        image: { src: img("chia-vung-de-lai-lop-toc-o-gay"), alt: "Asiakkaan pitkät vaaleat hiukset takaa kuvattuina, ylemmät hiukset siististi kiinnitettyinä päälaelle, ja kampaaja pitää harjaa niskaan jätetyn ohuen kerroksen vieressä" },
      },
      {
        name: "Kuivaa alin kerros pyöröharjalla",
        text: "Aseta pyöröharja jaon alle lähelle tyveä. Kapea suutin on harjan suuntainen, osoittaa alaspäin ja on muutaman sentin päässä. Vedä harjaa hitaasti latvoihin tasaisella vedolla föönin seuratessa. Toista muutaman kerran, kunnes jako on täysin kuiva ja kiiltävä. Käännä latvoissa harjaa hieman sisäänpäin, jotta latvat taipuvat pehmeästi.",
        image: { src: img("luoc-tron-sat-chan-toc-dau-thu-gio-chia-xuong"), alt: "Takaa kuvattuna kampaaja asettaa pyöröharjan asiakkaan niskan hiuskerroksen alle, ja mustan föönin kapea suutin osoittaa alaspäin juuri harjan yläpuolelta", caption: "Harja lähellä tyveä, kapea suutin sen suuntaisesti ja alaspäin." },
      },
      {
        name: "Viileä puhallus ennen harjan irrotusta",
        text: "Kun valmis jako on vielä kiertyneenä harjalle, pidä se paikallaan. Paina viileää puhallusta muutama sekunti ja irrota harja varovasti vasta, kun hius on jäähtynyt. Laske seuraava kerros alas ja tee samoin edeten kohti päälakea.",
      },
      {
        name: "Kuivaa sivut ja kasvojen kehystys",
        text: "Kuivaa jako kerrallaan ohjaten hiuksia taaksepäin ja kasvoista poispäin, latvat ulospäin kääntyen. Kasvoja kehystävissä suortuvissa aseta pyöröharja suortuvan sisäpuolelle lähelle kasvoja mutta ihoon koskematta ja käännä harjaa kuivatessa ulos ja taaksepäin. Korvan lähellä ole varovainen ja suojaa asiakkaan korva kädelläsi. Kun molemmat sivut ovat valmiit, vertaa niitä peilistä: kohotuksen ja latvojen taipuman on oltava samanlaiset.",
      },
      {
        name: "Tee kohotus päälaelle",
        text: "Ota päälaelta jako ja nosta se korkealle, lähes suoraan ylös, pyöröharja lähellä tyveä. Kuivaa tyvi ensin suutin edelleen hiusta pitkin alaspäin ja vedä sitten harja latvoihin. Käytä viileää puhallusta ennen irrotusta. Kuivaa jakaus muutaman kerran vasemmalle ja oikealle, jottei tyvi jää lappeelleen.",
      },
      {
        name: "Viimeistele",
        text: "Tunnustele kädellä, että hiukset ovat täysin kuivat myös tyvestä ja niskasta. Levitä latvoihin hyvin pieni määrä hiusöljyä tai seerumia tuotteen ohjeen mukaan. Anna asiakkaan katsoa tulosta edestä ja molemmilta sivuilta, kysy, haluaako hän muuttaa jotain, ja näytä sitten, miten hän kuivaa hiuksensa itse kotona. Kirjaa asiakastietoihin harja, tuotteet ja asiakkaan toivoma tyyli.",
      },
    ],
  },
  faq: [
    {
      q: "Miten föönillä saa kestävän tyvikohotuksen?",
      a: "Nosta päälaen jako korkealle, aseta pyöröharja lähelle tyveä ja kuivaa tyvi ensin suutin edelleen alaspäin. Käytä sitten viileää puhallusta, jotta hius jäähtyy harjalla ennen irrotusta. Lisää kohotusta saat kiertämällä jaon rullalle, kiinnittämällä sen kevyesti klipsillä päätä vasten ja poistamalla klipsin vasta, kun suortuva on täysin jäähtynyt.",
    },
    {
      q: "Kuinka kuivat hiusten pitää olla ennen pyöröharjaa?",
      a: "Noin seitsemän–kahdeksankymmenen prosentin kuivuudessa. Esikuivaus käsin on nopeampaa ja hiukset saavat vähemmän lämpöä, ja hieman kosteita hiuksia voi vielä muotoilla harjalla. Testaa viemällä käsi tyveen niskassa ja korvien takana: hieman kosteat, keveät ja ilmavat hiukset ovat oikeassa vaiheessa.",
    },
    {
      q: "Miksi föönaus lässähtää niin nopeasti?",
      a: "Yleensä siksi, että hiukset eivät olleet sisältä täysin kuivat liian paksujen jakojen takia, tai siksi, että harja irrotettiin hiusten ollessa vielä kuumat. Ota ohuempia jakoja, tarkista tyven ja niskan kuivuus ja anna jokaiselle jaolle muutama sekunti viileää puhallusta harjalla.",
    },
    {
      q: "Miten latvat föönataan sisäänpäin pyöröharjalla?",
      a: "Vedä pyöröharjaa tyvestä latvoihin föönin seuratessa yläpuolella ja kapean suuttimen osoittaessa alaspäin. Käännä latvoissa harjaa hieman sisäänpäin, jotta latvat taipuvat pehmeästi, pidä se paikallaan ja paina viileää puhallusta ennen kuin vedät harjan pois.",
    },
    {
      q: "Miten pyöröharjaan sotkeutuneet hiukset saa irti?",
      a: "Sammuta fööni, kierrä harjaa hitaasti takaisin ja selvitä hiukset vähän kerrallaan. Älä nyi, koska se katkoo hiuksia ja sattuu. Älä myöskään lisää lämpöä, sillä lämpö kireällä olevaan hiukseen vain pahentaa vauriota.",
    },
    {
      q: "Mitä kannattaa muistaa, kun föönaa omat hiuksensa kotona?",
      a: "Kuivaa pyyhkeellä painelemalla, kuivaa käsin niin pitkään, että hiukset ovat enää hieman kosteat, ennen kuin otat harjan, ja pidä suutin hiusta pitkin alaspäin. Älä pidä fööniä liian kauan yhdessä kohdassa tai paina sitä hiuspohjaan, ja kuivaa tyvi kokonaan, jotta kampaus pysyy.",
    },
  ],
  related: ["say-tao-kieu-hieu-dung", "cat-nu-tang", "cat-mai", "cat-nu-bang"],
};

export default article;
