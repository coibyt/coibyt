import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/mi-classic/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "klassisten-ripsienpidennysten-tekeminen",
  lesson: "mi-classic",
  category: "lash",
  title: "Klassisten ripsienpidennysten tekeminen: 12 vaihetta konsultaatiosta jälkihoito-ohjeisiin",
  metaTitle: "Klassisten ripsienpidennysten tekeminen: 12 vaihetta",
  metaDescription:
    "Klassiset ripsienpidennykset vaihe vaiheelta: konsultaatio, puhdistus, geelityynyt, yhden ripsen eristys, liiman otto, kiinnitys 0,5–1 mm luomesta ja jälkihoito.",
  keyword: "klassisten ripsienpidennysten tekeminen",
  keywords: ["klassiset ripset vaihe vaiheelta", "1:1 ripsienpidennystekniikka", "pidennyksen etäisyys luomesta", "paljonko liimaa ripsienpidennyksiin", "ripsienpidennykset aloittelijalle", "kauanko klassiset ripset kestää tehdä", "ripsienpidennysten jälkihoito"],
  excerpt: "Yksi pidennys kuhunkin omaan ripseen. Artikkeli käy läpi klassisten ripsien kaksitoista työvaihetta, kiinnitysetäisyyden, liiman määrän ja jälkihoito-ohjeet, jotka jokaisen asiakkaan pitää kuulla.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-noi-mi-classic-cho-khach-tai-studio"),
    alt: "Kermanväriseen paitaan ja mustiin käsineisiin pukeutunut ripsistylisti tekee pidennyksiä hoitosängyllä makaavalle asiakkaalle tyylikkäässä ripsistudiossa",
  },
  takeaways: [
    "Klassiset ripsienpidennykset ovat **1:1**: yksi pidennys kiinnitetään yhteen erotettuun omaan ripseen.",
    "Kolme asiaa pätee koko käynnin ajan: asiakkaan silmät ovat kiinni, eristät täsmälleen yhden ripsen ja **liima ei koskaan koske ihoon**.",
    "Pidennyksen tyvi on noin **0,5–1 mm:n** päässä luomesta; liimaan kastetaan vain 1–2 mm tyvestä.",
    "Vuorottele alueita, jotta liima ehtii kovettua, ja tarkista pinseteillä tarttumat jokaisen alueen jälkeen.",
    "Täydet klassiset ripset vievät yleensä noin 1,5–2 tuntia, ja asiakas tulee huoltoon 2–3 viikon kuluttua.",
  ],
  intro: [
    "Klassisten ripsienpidennysten tekeminen on ensimmäinen asia, joka jokaisen ripsistylistin pitää oppia kunnolla, koska kaikki myöhemmät tekniikat, myös volyymi- ja hybridiripset, rakentuvat samoille liikkeille: eristä, kasta, kiinnitä, tarkista. Klassinen tarkoittaa 1:1-tekniikkaa, jossa jokainen oma ripsi kantaa yhden pidennyksen.",
    "Artikkeli perustuu VaraaAi Academyn Ripset-kurssin oppituntiin ”Klassiset ripsienpidennykset: käytäntö vaihe vaiheelta”. Katso oppitunnin video alta ensin kerran, jotta näet pinsettien otteen, lue sitten vaiheet läpi ja harjoittele harjoituspäähän ennen kuin teet ripsiä asiakkaille.",
  ],
  sections: [
    {
      id: "mita-klassiset-ovat",
      title: "Mitä klassiset ripsienpidennykset ovat",
      blocks: [
        { p: "Klassisissa ripsienpidennyksissä **yksi pidennys kiinnitetään yhteen omaan ripseen**, ja siksi tekniikkaa kutsutaan myös 1:1-tekniikaksi. Lopputulos on pidempi ja selkeämpi ripsirivi, joka näyttää silti luonnolliselta: jokainen ripsi on erillään kuin taitavasti levitetyn ripsivärin jäljiltä." },
        { p: "Koska jokainen oma ripsi kantaa vain yhden pidennyksen, ripsien tuuheus riippuu siitä, kuinka monta omaa ripseä asiakkaalla on. Harjatessasi ripsiä katsot, mitkä ovat vahvoja ja pitkiä ja mitkä nuoria, lyhyitä ja ohuita, ja valitset pituuden ja paksuuden alue kerrallaan. Nuori ripsi ei jaksa kantaa pitkää ja raskasta pidennystä." },
        { img: { src: img("bo-mi-classic-hoan-thien-tu-nhien"), alt: "Lähikuva vaaleahiuksisen asiakkaan kasvoista valmiine klassisine pidennyksineen, ripset erillään ja luonnollisen pitkät", caption: "Valmiit klassiset ripset: pehmeät, erilliset ja luonnolliset." } },
      ],
    },
    {
      id: "ennen-aloittamista",
      title: "Ennen aloittamista: konsultaatio ja milloin ei tehdä",
      blocks: [
        { p: "Konsultaatio tehdään, kun asiakkaan silmät ovat vielä auki ja olet pessyt kätesi. Kysy nämä:" },
        {
          ul: [
            "Onko asiakkaalla allergioita, ja onko hän koskaan reagoinut ripsiliimaan?",
            "Ovatko silmät nyt punaiset tai kutiavat, onko hänellä jokin silmäsairaus tai äskettäin tehty silmäleikkaus?",
            "Käyttääkö hän piilolinssejä? Jos käyttää, pyydä häntä poistamaan ne ensin.",
            "Haluaako hän luonnollisen vai tuuheamman ilmeen?",
          ],
        },
        { p: "Jos silmät eivät ole terveet, et tee pidennyksiä. Kyse ei ole asiakkaan menettämisestä vaan siitä, ettei tulehtunutta silmää pahenneta. Oppitunti [Milloin asiakasta ei hoideta](lesson:khi-nao-khong-lam) käy nämä tilanteet läpi tarkemmin." },
        { img: { src: img("tu-van-khach-truoc-khi-noi-mi"), alt: "Ripsistylisti istuu asiakasta vastapäätä kermanvärisellä sohvalla ja tekee muistiinpanoja kirjoitusalustalle konsultaation aikana", caption: "Konsultaatio silmät auki: allergiat, silmien kunto ja toivottu ilme." } },
      ],
    },
    {
      id: "liima-ja-etaisyys",
      title: "Liiman määrä ja kiinnitysetäisyys: kaksi lukua ulkoa",
      blocks: [
        {
          table: {
            head: ["Työvaihe", "Luku", "Miksi"],
            rows: [
              ["Pidennyksen tyven kastaminen liimaan", "Noin 1–2 mm", "Juuri sopivasti liimaa, ohut ja tasainen kerros; enempi muodostaa tyveen paakun ja aiheuttaa tarttumia"],
              ["Pidennyksen tyven etäisyys luomesta", "Noin 0,5–1 mm", "Liima ei saa koskea ihoon; ihoon osuva pidennys hiertää ja ärsyttää"],
            ],
          },
        },
        { p: "Pidennys asetetaan oman ripsen suuntaisesti ja painetaan kevyesti, jotta se asettuu tiiviisti. Pidä sitä hetki paikallaan, kunnes liima tarttuu, irrota ensin kiinnityspinsetit ja viimeisenä eristyspinsetit." },
        { note: "Älä kiinnitä vierekkäisiä ripsiä peräkkäin. Kiinnitä yksi ulkonurkkaan, yksi keskelle ja yksi sisänurkkaan, ja palaa sitten takaisin. Edellisen ripsen liima ehtii kovettua, eivätkä vierekkäiset ripset tartu yhteen. Moni ripsistylisti vuorottelee myös silmien välillä, jotta kumpikin puoli saa levätä.", kind: "tip", title: "Ammattilaisen vinkki" },
      ],
    },
    {
      id: "tarttumat",
      title: "Tarttumat: virhe, joka korjataan heti sängyn ääressä",
      blocks: [
        { p: "Tarttumassa liima yhdistää kaksi omaa ripseä tai pidennys tarttuu viereiseen ripseen. Jokainen oma ripsi kasvaa omaa tahtiaan, joten yhteen liimautuneet ripset vetävät toisiaan kasvaessaan. Asiakas tuntee hiertämistä, ja oma ripsi joutuu vedolle." },
        { p: "Näin tarkistat: liu'uta suoria pinsettejä jokaisen alueen jälkeen kevyesti ripsien läpi tyvestä kärkeen. Jokaisen ripsen pitää olla erillään. Jos kaksi on tarttunut yhteen, erota ne heti hyvin varovasti, ennen kuin liima on kovettunut kokonaan." },
        { p: "Tavallisin syy on puutteellinen eristys tai liian suuri liimamäärä. Yksikin ylimääräinen ripsi eristyksessä riittää siihen, että liima yhdistää kaksi ripseä." },
      ],
    },
    {
      id: "pituudet",
      title: "Pituuden valinta alue kerrallaan",
      blocks: [
        { p: "Perussääntö: lyhimmät sisänurkkaan, ja pituus kasvaa vähitellen kohti keskiosaa ja ulkonurkkaa, jolloin silmän muoto on pehmeä ja luonnollinen. Sisänurkassa omat ripset ovat lyhyitä ja ohuita, joten sinne valitaan lyhyet ja kevyet pidennykset." },
        { p: "Tyylin valinta eri silmänmuodoille on oma aiheensa, josta kerrotaan oppitunnilla [ripsikartta](lesson:mi-mapping-hieu-dung)." },
      ],
    },
    {
      id: "jalkihoito",
      title: "Ripsienpidennysten jälkihoito: mitä asiakkaalle kerrotaan",
      blocks: [
        {
          ul: [
            "Ei vettä, höyryä eikä uintia niin kauan kuin liimavalmistaja neuvoo, yleensä 24–48 tuntia.",
            "Ei öljypohjaisia tuotteita ripsien tyveen, koska öljy heikentää liimaa.",
            "Harjaa ripset kevyesti joka päivä puhtaalla harjalla.",
            "Ei hieromista, nyppimistä eikä ripsitaivutinta.",
            "Huolto 2–3 viikon kuluttua.",
          ],
        },
        { img: { src: img("chai-mi-noi-moi-ngay-tai-nha"), alt: "Kermanväriseen silkkiaamutakkiin pukeutunut asiakas harjaa ripsienpidennyksiään puhtaalla ripsiharjalla peilin edessä", caption: "Päivittäinen harjaus puhtaalla harjalla pitää ripset tasaisessa järjestyksessä." } },
        { p: "Varaa huoltoaika ennen kuin asiakas lähtee. Jos salonkisi käyttää VaraaAita, voit [varata ajan](lesson:lich-hen) asiakkaalle heti vastaanottotiskillä ja antaa järjestelmän muistuttaa hänen puolestaan; jälkihoito-ohjeet voi lähettää hänelle vielä [viestinä](lesson:tin-nhan-ai)." },
        { p: "Asiakkaan lähdettyä käytetyt ripsiharjat, vanutikut ja tyynyt laitetaan kannelliseen roska-astiaan. Pinsetit puhdistetaan ja desinfioidaan jokaisen asiakkaan jälkeen, kuten oppitunnilla [Välineet jokaisen asiakkaan jälkeen](lesson:ve-sinh-dung-cu). Sänky ja työpöytä pyyhitään." },
      ],
    },
  ],
  howTo: {
    title: "Klassisten ripsienpidennysten tekeminen vaihe vaiheelta",
    id: "klassisten-ripsien-vaiheet",
    after: "ennen-aloittamista",
    lead: "Kaksitoista vaihetta oppitunnin videon järjestyksessä. Viisi ensimmäistä ovat valmistelua, ja huolellinen valmistelu tekee itse kiinnityksestä nopeaa.",
    supplies: [
      "Klassiset ripsialustat pituusjärjestyksessä",
      "Ripsiliima ja jadekivi tai liimasormus",
      "Suorat pinsetit eristykseen, kaarevat kiinnitykseen",
      "Ripsishampoo ja pehmeä harja",
      "Geelityynyt silmien alle ja lääkinnällinen paperiteippi",
      "Kertakäyttöiset ripsiharjat ja pienet vanutikut",
    ],
    steps: [
      {
        name: "Konsultoi",
        text: "Pese kädet ja keskustele asiakkaan kanssa silmät auki: allergiat, aiemmat reaktiot liimaan, silmien kunto, piilolinssit ja toivottu ilme. Jos silmissä on ongelma, et tee pidennyksiä.",
      },
      {
        name: "Varmista asiakkaalle mukava asento",
        text: "Niskatyyny, ohut peitto ja ehkä pieni tyyny polvien alle. Täydet klassiset ripset vievät yleensä puolitoista–kaksi tuntia, ja asiakas makaa koko ajan paikallaan silmät kiinni. Mitä rennompi hän on, sitä vähemmän silmät liikkuvat.",
      },
      {
        name: "Puhdista omat ripset",
        text: "Ripsiin jäänyt öljy, voide tai luomiväri heikentää sidosta. Harjaa asiakkaan silmät kiinni ollessa ripsishampoota kevyesti pehmeällä harjalla tyvestä kärkeen. Huuhtele puhtaalla vedellä ja kuivaa huolellisesti pienellä tuulettimella, tai anna kuivua itsestään.",
        image: { src: img("lam-sach-mi-that-bang-bot-rua-mi"), alt: "Ripsishampoovaahdon peittämä pehmeä harja liukuu kevyesti silmät kiinni olevan asiakkaan ripsillä" },
      },
      {
        name: "Aseta geelityynyt silmien alle",
        text: "Tyyny peittää kaikki alaripset, jottei yksikään liimaudu yläripsiin. Sen yläreuna on heti alaripsirajan alla koskematta limakalvoon tai silmään; jos se koskee, asiakkaan silmiä hiertää ja kirvelee ja ne ovat jälkeenpäin punaiset. Jos jokin alaripsi pilkistää yhä esiin, kiinnitä se pienellä palalla lääkinnällistä paperiteippiä.",
        image: { src: img("dan-mieng-lot-gel-duoi-mat"), alt: "Valkoinen sirpinmuotoinen geelityyny asiakkaan suljetun silmän alla peittää alaripset kokonaan" },
      },
      {
        name: "Harjaa ja tarkastele ripsiä",
        text: "Harjaa ripset kertakäyttöisellä harjalla, jotta ne erottuvat ja asettuvat tasaisesti. Katso, mitkä ripsistä ovat vahvoja ja pitkiä ja mitkä nuoria, lyhyitä ja ohuita, ja valitse pituus ja paksuus alue kerrallaan.",
      },
      {
        name: "Valmistele työpiste",
        text: "Ripsialustat pituusjärjestyksessä, jadekivi tai liimasormus ja tuore pisara, suorat ja kaarevat pinsetit, kertakäyttöiset harjat ja vanutikut. Sulje liimapullo heti liiman ottamisen jälkeen ja pidä pisara kaukana asiakkaan kasvoista.",
        image: { src: img("dung-cu-noi-mi-classic"), alt: "Kultareunainen valkoinen kivitarjotin, jolla on ripsiliimapullo, pituusjärjestykseen asetetut ripsinauhat, jadekivi liimapisaroineen, kahdet pinsetit ja ripsiharja" },
      },
      {
        name: "Eristä täsmälleen yksi oma ripsi",
        text: "Pidä suoria pinsettejä heikommassa kädessäsi, vie ne ripsien väliin, avaa kärkiä hieman ja työnnä viereiset ripset sivuun niin, että yksi oma ripsi jää erilleen.",
        image: { src: img("tach-mot-soi-mi-that-bang-nhip"), alt: "Kahdet pinsetit mustakäsineisen ripsistylistin käsissä, suorat pinsetit erottavat yhden oman ripsen asiakkaan ripsirivistä" },
      },
      {
        name: "Nosta pidennys ja kasta se liimaan",
        text: "Ota kaarevilla pinseteillä vahvemmassa kädessäsi pidennys tyven läheltä, kohdasta jossa se on paksu ja suora. Kasta liimapisaraan vain tyvi, noin 1–2 mm, ja vedä pidennys kevyesti ulos. Liiman pitää olla ohut ja tasainen, ilman paakkua.",
        image: { src: img("nhung-chan-soi-mi-vao-giot-keo"), alt: "Kaarevat pinsetit pitävät pidennystä, jonka tyvi koskettaa mustaa liimapisaraa jadekivellä" },
      },
      {
        name: "Kiinnitä hieman irti luomesta",
        text: "Aseta pidennys erotetun oman ripsen suuntaisesti. Sen tyvi on noin 0,5–1 mm:n päässä luomen ihosta eikä koskaan koske siihen. Paina kevyesti, jotta pidennys asettuu tiiviisti, pidä hetki paikallaan, kunnes liima tarttuu, irrota ensin kaarevat pinsetit ja viimeisenä eristyspinsetit.",
        image: { src: img("gan-soi-mi-noi-doc-theo-mi-that"), alt: "Ripsistylisti asettaa kaarevilla pinseteillä pidennyksen suorien pinsettien erillään pitämän oman ripsen suuntaisesti" },
      },
      {
        name: "Tarkista tarttumat",
        text: "Liu'uta suorat pinsetit jokaisen alueen jälkeen tyvestä kärkeen. Jokaisen ripsen pitää olla erillään; erota mahdolliset tarttumat heti. Pidä kiinni pituussäännöstä: lyhimmät sisänurkassa, pitenevät kohti ulkonurkkaa.",
      },
      {
        name: "Viimeistele",
        text: "Harjaa ripset uudelleen ja vertaa silmiä: pituuden, tuuheuden ja taivutuksen pitää olla tasapainossa. Irrota tyynyt hyvin varovasti, kun asiakkaan silmät ovat vielä kiinni, ja pyydä häntä avaamaan ne hitaasti. Jos silmät kirvelevät tai vuotavat, anna hänen sulkea ne uudelleen ja levätä hetki.",
      },
      {
        name: "Anna jälkihoito-ohjeet ja siivoa",
        text: "Kerro asiakkaalle, että ripset pidetään kuivina liimavalmistajan ohjeen mukaan, öljypohjaisia tuotteita vältetään ripsien tyvessä ja ripset harjataan päivittäin, ja varaa huolto 2–3 viikon päähän. Heitä sitten kertakäyttötarvikkeet pois, puhdista ja desinfioi pinsetit ja pyyhi sänky ja pöytä.",
      },
    ],
  },
  faq: [
    {
      q: "Kauanko klassisten ripsienpidennysten tekeminen kestää?",
      a: "Täydet klassiset ripset vievät yleensä noin puolitoista–kaksi tuntia. Asiakas makaa koko ajan paikallaan silmät kiinni, joten ripsistylisti varmistaa hänelle mukavan asennon heti alussa.",
    },
    {
      q: "Mitä eroa on klassisilla ja volyymiripsienpidennyksillä?",
      a: "Klassinen tekniikka on 1:1, yksi pidennys kuhunkin omaan ripseen, ja ilme on luonnollinen ja ripset erillään. Volyymiripsissä yhteen omaan ripseen kiinnitetään viuhka, jossa on useita hyvin ohuita pidennyksiä, jolloin ripsirivi on tuuheampi. Klassisen tekniikan eristys, liiman otto ja kiinnitys ovat pohja volyymiripsien opettelulle.",
    },
    {
      q: "Kuinka kauas luomesta ripsienpidennys kiinnitetään?",
      a: "Noin 0,5–1 mm:n päähän, eikä pidennys koskaan koske ihoon. Luomella oleva liima tai pidennys hiertää ja voi ärsyttää ihoa.",
    },
    {
      q: "Milloin kasvot saa pestä ripsienpidennysten jälkeen?",
      a: "Noudata liimavalmistajan ilmoittamaa aikaa, yleensä 24–48 tuntia ilman vettä ripsillä, höyryä ja uintia. Senkin jälkeen öljypohjaisia tuotteita kannattaa välttää ripsien tyvessä.",
    },
    {
      q: "Mitä tehdä, jos asiakkaan silmiä kirvelee pidennysten aikana?",
      a: "Pysähdy, anna asiakkaan levätä silmät kiinni ja tarkista, koskeeko tyyny limakalvoon. Jos liimaa joutuu silmään, huuhtele heti runsaalla puhtaalla vedellä ja ohjaa asiakas lääkäriin.",
    },
    {
      q: "Kuinka usein ripsienpidennykset huolletaan?",
      a: "Noin 2–3 viikon välein. Varaa huoltoaika ennen kuin asiakas lähtee, niin hänen ei tarvitse muistaa sitä itse.",
    },
  ],
  related: ["mi-classic-hieu-dung", "mi-chuan-bi", "mi-volume", "mi-dam-thao"],
};

export default article;
