import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/spa-waxing/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "vahaus-ohje-saaret-kainalot-ja-kulmat",
  lesson: "spa-waxing",
  category: "spa",
  title: "Vahaus ohje: säärien, kainaloiden ja kulmien vahaus 14 vaiheessa nauhavahalla ja kuumavahalla",
  metaTitle: "Vahaus ohje: sääret, kainalot ja kulmat 14 vaiheessa",
  metaDescription:
    "Vahaus ohje vaihe vaiheelta: valmistelu, haastattelu, lämpötilan testaus, nauhavaha sääreen, oikea veto sekä kuumavaha kainaloihin ja kulmiin kosmetologille.",
  keyword: "vahaus ohje",
  keywords: [
    "säärien vahaus",
    "vahaus vaihe vaiheelta",
    "nauhavahan käyttö",
    "kainaloiden vahaus kuumavahalla",
    "kulmien vahaus",
    "vahanauhan veto",
  ],
  excerpt: "Kolme tavallista aluetta vaihe vaiheelta: sääri nauhavahalla, kainalo kuumavahalla ja kulmien siistiminen. Mukana lämpötilan testaus, vahan otto, veto ja viisi yleistä virhettä.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("chuan-bi-wax-long-chan-cho-khach-tai-spa"),
    alt: "Mustiin käsineisiin pukeutunut kosmetologi seisoo vahanlämmittimen ja puulastapurkin vieressä, asiakas makaa hoitopöydällä valkoisen pyyhkeen alla molemmat jalat paljaina, taustalla kaari-ikkuna",
  },
  takeaways: [
    "Testaa vaha **uudella lastalla** oman ranteesi sisäpuolelle ja sitten pieneen kohtaan asiakkaan iholla ennen levitystä.",
    "Nauhavaha levitetään hyvin ohuena karvojen kasvusuuntaan noin kämmenen mittaiseksi kaistaksi. Liian paksuna vaha paakkuuntuu, sattuu eikä poista kaikkia karvoja.",
    "Vedä nopeasti **vastakarvaan**, matalalla ja lähes ihon suuntaisesti, toinen käsi pitää ihon kireänä. Paina kämmen heti perään iholle.",
    "Kuumavaha kainaloihin ja kulmiin: hieman paksummin, paksu reuna tarttumista varten, ja anna jähmettyä (ei enää tahmea mutta yhä taipuisa) ennen vetoa.",
    "Asiakkaan ihoon koskenut lasta ei koskaan palaa purkkiin. Jokainen kastaminen uudella lastalla.",
  ],
  intro: [
    "Vahaus ohje on helppo oppia yhdessä iltapäivässä: levitä vaha, vedä ja puhdista. Jotta asiakkaaseen sattuu vähemmän eikä iholle tule mustelmia tai naarmuja, tarvitaan muutama tapa lisää: lämpötilan testaus ennen jokaista asiakasta, karvojen kasvusuunnan tarkistus ennen levitystä ja aina toinen käsi pitämässä ihoa kireänä.",
    "Artikkeli seuraa VaraaAi Academyn Spa ja ihonhoito -kurssin oppituntia ”Vahaus: vaihe vaiheelta”. Oppitunnilla vahataan kolme aluetta: sääri nauhavahalla, kainalo kuumavahalla ja kulmien siistiminen. Luettuasi osaat tehdä kaikki kolme neljässätoista vaiheessa lämmittimen kytkemisestä hoitopöydän siivoukseen. Lämpötila, ajat ja tuotteet noudattavat aina vahan valmistajan ohjeita ja hoitolasi käytäntöä. Intiimialueiden vahausta artikkeli ei käsittele.",
  ],
  sections: [
    {
      id: "ennen-vahausta",
      title: "Ennen vahausta: kaikki välineet esille ja esitietolomake uudelleen",
      blocks: [
        { p: "Kun käsineet ovat kädessä ja lämmin lasta sormissa, et voi lähteä etsimään pinsettejä tai avata kaappia nauhojen takia. Kaiken on oltava vaunulla ennen kuin asiakas käy makuulle, myös kannellisen roska-astian käytetyille lastoille." },
        { img: { src: img("dung-cu-wax-long-noi-sap-que-go-giay-wax"), alt: "Marmorinen vaunun taso, jolla on keltaista nauhavahaa ja vaaleanpunaista kuumavahaa sisältävät purkit, puulastapurkki, pino vahanauhoja, mustat käsineet, öljypullo, voidepurkki, vanua, pinsetit ja pienet sakset", caption: "Kaksi vahapurkkia, puhtaat lastat, nauhat, käsineet, jälkiöljy, rauhoittava voide, pinsetit ja pienet sakset." } },
        { p: "Haastattelua ei jätetä väliin edes vakioasiakkaalta, koska asiakkaan lääkkeet ovat voineet muuttua edellisestä kerrasta. Kenelle vahausta ei tehdä, miksi aknelääkkeistä kysytään ja miksi vedon suunta on tärkeä, kerrotaan artikkelissa [Nauhavaha vai kuumavaha ja kenelle vahausta ei tehdä](lesson:spa-waxing-hieu-dung)." },
      ],
    },
    {
      id: "nauhavaha-ja-kuumavaha-kaytannossa",
      title: "Nauhavaha ja kuumavaha: missä tekniikka eroaa",
      blocks: [
        { p: "Suunta on molemmissa sama: levitys kasvusuuntaan, veto vastakarvaan, matalalla ihoa vasten. Erot ovat alla olevassa taulukossa." },
        {
          table: {
            head: ["Vaihe", "Nauhavaha (sääri)", "Kuumavaha (kainalo, kulmat)"],
            rows: [
              ["Ennen levitystä", "Moni valmistaja suosittelee hyvin ohutta puuterikerrosta", "Osa valmistajista suosittelee hyvin ohutta öljykerrosta"],
              ["Kerroksen paksuus", "Hyvin ohut ja tasainen", "Hieman paksumpi, lopussa paksu reuna"],
              ["Poisto", "Vahanauha, jonka pää jätetään vapaaksi", "Vahan oma reuna"],
              ["Milloin vedetään", "Kun nauhaa on hierottu muutaman kerran", "Kun vaha on jähmettynyt: ei enää tahmea mutta yhä taipuisa"],
            ],
          },
        },
        { p: "Puuterilla ja öljyllä on sama tarkoitus: vaha tarttuu karvaan eikä ihoon. Käytetäänkö niitä, riippuu vahan valmistajan ohjeesta. Kuumavahan kanssa älä odota liian kauan: liian pitkään jähmettynyt vaha muuttuu hauraaksi, katkeaa ja on vaikea poistaa." },
      ],
    },
    {
      id: "hankalat-alueet",
      title: "Hankalat alueet: polvet, nilkat, käsivarret ja kainalot",
      blocks: [
        {
          ul: [
            "**Polvet ja nilkat.** Iho taipuu ja luut pistävät esiin, joten käytä pienempiä kaistoja ja pidä iho kireänä tavallista huolellisemmin.",
            "**Käsivarret.** Kuten sääri, mutta tarkista karvojen suunta ensin huolella, koska se vaihtelee ihmisestä toiseen.",
            "**Kainalot.** Karvat kasvavat moneen suuntaan, joten alue jaetaan pieniin osiin, ja kukin vahataan oman kasvusuuntansa mukaan.",
            "**Kulmat.** Sovi kulmien muoto asiakkaan kanssa ensin ja käytä vain hyvin pieni määrä vahaa kaukana silmästä.",
          ],
        },
        { note: "Moni kosmetologi pyytää asiakasta hengittämään sisään ja vetää juuri, kun asiakas hengittää ulos. Se tuntuu helpommalta.", kind: "tip", title: "Ammattilaisen vinkki" },
      ],
    },
    {
      id: "yleiset-virheet",
      title: "Viisi yleistä virhettä vahauksessa",
      blocks: [
        {
          table: {
            head: ["Virhe", "Seuraus", "Tee näin"],
            rows: [
              ["Vahaa levitetään paksusti, koska sen luullaan tarttuvan paremmin", "Sattuu enemmän ja karvoja jää", "Ohut ja tasainen kerros"],
              ["Hidas veto tai veto ylöspäin", "Iho lähtee mukaan, mustelmia ja naarmuja tulee helposti", "Vedä nopeasti, matalalla ja lähes ihon suuntaisesti"],
              ["Ihon kiristäminen unohtuu", "Sattuu enemmän, iho venyy", "Toinen käsi aivan nauhan vieressä venyttämässä ihoa"],
              ["Samaa kohtaa vahataan yhä uudelleen", "Iho punoittaa", "Enintään kaksi kertaa; jäljelle jääneet karvat pinseteillä"],
              ["Käytetty lasta kastetaan uudelleen", "Purkki saastuu seuraaville asiakkaille", "Jokaiseen kastamiseen uusi lasta"],
            ],
          },
        },
      ],
    },
    {
      id: "jalkihoito-ja-muistiinpanot",
      title: "Vahauksen jälkeen: ohjeet asiakkaalle ja muistiinpanot seuraavaa kertaa varten",
      blocks: [
        { p: "Kerro ennen asiakkaan lähtöä selvästi, mikä on normaalia ja mitä kannattaa välttää:" },
        {
          ul: [
            "Lievä punoitus ja muutama pieni näppylä ovat normaaleja.",
            "Noin ensimmäisen vuorokauden ajan: vältä aurinkoa, saunaa, hyvin kuumaa vettä ja hajustettuja tuotteita, myös deodoranttia.",
            "Muutaman päivän päästä: kevyt kuorinta ja kosteusvoide ehkäisevät sisäänkasvaneita karvoja.",
          ],
        },
        { p: "Jos asiakkaan iho punoittaa voimakkaasti, kirvelee tai siihen nousee ihottuma jo hoitolassa, laita viileä pyyhe ja kirjaa käytetty tuote, kuten oppitunnilla [Ensiapu kauneushoitolassa](lesson:xu-ly-su-co)." },
        { p: "VaraaAissa merkitset asiakkaan sisäisiin muistiinpanoihin [asiakasrekisterissä](lesson:khach-hang) käytetyn vahan, vahatut alueet ja ihon reaktion. Seuraava aika voidaan varata suoraan hoitolan [ajanvarauskalenteriin](lesson:lich-hen), kun asiakas on vielä vastaanotossa." },
        { note: "Isotretinoiinia käyttävää asiakasta ei vahata. Kauneudenhoitoalan määräykset vaihtelevat maittain; artikkeli on koulutusmateriaalia, ei ammattipätevyys.", kind: "warn", title: "Kaksi muistutusta" },
      ],
    },
  ],
  howTo: {
    title: "Vahaus vaihe vaiheelta: sääri, kainalo ja kulmat",
    id: "vahauksen-vaiheet",
    after: "ennen-vahausta",
    lead: "Neljätoista vaihetta etenevät oppitunnin videon järjestyksessä: ensin sääri nauhavahalla, sitten kainalo kuumavahalla ja viimeisenä kulmat.",
    supplies: [
      "Nauhavaha- ja kuumavahapurkki, kytketty päälle ajoissa, jotta vaha valuu tasaisesti",
      "Puhtaat puulastat purkissa sekä pienet lastat kulmille",
      "Kertakäyttöiset vahanauhat",
      "Käsineet, uusi suojapaperi ja iso pyyhe asiakkaan peittelyyn",
      "Esipuhdistusaine; puuteri tai öljy, jos vahan valmistaja niitä suosittelee",
      "Jälkiöljy, rauhoittava voide, pinsetit ja pienet sakset",
      "Kannellinen roska-astia",
    ],
    steps: [
      {
        name: "Valmistele lämmitin, hoitopöytä ja välineet",
        text: "Kytke vahanlämmitin päälle ajoissa, jotta vaha valuu tasaisesti. Desinfioi hoitopöytä ja vaihda uusi suojapaperi. Asettele esille puhtaat lastat purkissa, nauhat, käsineet, esipuhdistusaine, jälkiöljy, rauhoittava voide, pinsetit ja pienet sakset, ja laita kannellinen roska-astia käden ulottuville käytettyjä lastoja varten.",
      },
      {
        name: "Haastattele, myös vakioasiakkaat",
        text: "Lue esitietolomake ja kysy uudelleen: käyttääkö asiakas aknelääkettä tai retinoidivoiteita, onko hänelle tehty hiljattain kuorinta tai laser, onko hän ollut auringossa, onko allergioita ja miten edellinen vahaus meni. Katso vahattava iho: vältä rikkinäistä ihoa, auringon polttamaa ja suonikohjuja. Kerro etukäteen, että vähän kirvelee, ja että epämukavuudesta saa sanoa.",
      },
      {
        name: "Peittele asiakas, pese kädet ja pue käsineet",
        text: "Asiakas vaihtaa vaatteet rauhassa, käy hoitopöydälle ja peitellään isolla pyyhkeellä. Paljasta vain vahattava alue ja taita pyyhe siististi. Pese ja kuivaa sitten kädet ja pue käsineet, kuten oppitunnilla [Käsihygienia ja käsineet](lesson:rua-tay-gang-tay).",
      },
      {
        name: "Tarkista karvojen kasvusuunta ja puhdista iho",
        text: "Sääressä karvat kasvavat yleensä alaspäin kohti nilkkaa. Lyhennä hyvin pitkät karvat. Puhdista iho esipuhdistusaineella ja odota, että se on täysin kuiva. Nauhavahan kanssa moni valmistaja suosittelee hyvin ohutta puuterikerrosta, jotta vaha tarttuu karvaan eikä ihoon.",
      },
      {
        name: "Testaa vahan lämpötila",
        text: "Ota vähän vahaa uudella lastalla ja testaa se oman ranteesi sisäpuolelle: lämmin ja miellyttävä on oikein. Testaa sitten pieneen kohtaan asiakkaan iholla ja kysy häneltä. Tee tämä jokaiselle asiakkaalle, vaikka purkkia olisi juuri käytetty edelliselle.",
      },
      {
        name: "Ota vahaa uudella lastalla",
        text: "Kasta lasta, pyöräytä sitä kevyesti ja kaavi alapinta purkin reunaan niin, että päälle jää vain ohut kerros eikä vaha tipu. Asiakkaan ihoon koskenut lasta ei koskaan palaa purkkiin; jokainen kastaminen tehdään uudella lastalla.",
        image: { src: img("gat-que-sap-vao-mep-noi"), alt: "Mustaan käsineeseen puettu käsi nostaa puulastan keltaisesta vahapurkista ja kaapii sen alapinnan purkin reunaan, vieressä purkki puhtaita lastoja", caption: "Kaavi lastan alapinta purkin reunaan, ettei vaha tipu." },
      },
      {
        name: "Levitä nauhavaha sääreen",
        text: "Aloita säären yläosasta. Pidä lastaa matalassa kulmassa ja levitä hyvin ohut kerros karvojen kasvusuuntaan: lastan levyinen ja noin kämmenen mittainen kaista. Ohut ja tasainen kerros lähtee puhtaasti. Liian paksuna vaha paakkuuntuu, sattuu eikä poista kaikkia karvoja.",
        image: { src: img("thoa-sap-mem-mong-theo-chieu-long-moc"), alt: "Mustiin käsineisiin pukeutunut kosmetologi levittää puulastalla ohuen keltaisen vahakaistan asiakkaan sääreen, toinen käsi polven lähellä", caption: "Lasta matalassa kulmassa, yksi ohut kaista kasvusuuntaan." },
      },
      {
        name: "Aseta nauha ja hiero se kiinni",
        text: "Aseta nauha vahan päälle ja jätä loppuun vapaa pää, josta tartut. Hiero nauhaa tukevasti kasvusuuntaan muutaman kerran, jotta se tarttuu vahaan.",
        image: { src: img("dat-giay-wax-len-lop-sap-o-cang-chan"), alt: "Kaksi mustiin käsineisiin puettua kättä silittää asiakkaan säären suuntaisesti asetettua valkoista vahanauhaa, ja nauhan nilkan puoleinen pää on jätetty vapaaksi" },
      },
      {
        name: "Pidä iho kireänä ja vedä",
        text: "Aseta toinen käsi aivan nauhan pään viereen ja venytä ihoa. Tartu vapaaseen päähän ja vedä hyvin nopeasti vastakarvaan, matalalla ihoa vasten ja lähes säären suuntaisesti; ei koskaan suoraan ylös. Paina heti kämmen vahatulle alueelle muutamaksi sekunniksi. Jatka kaista kerrallaan edellisen viereen, kunnes sääri on valmis. Samaan kohtaan enintään kaksi kertaa; jäljelle jääneet karvat nypitään pinseteillä.",
        image: { src: img("giu-cang-da-giat-giay-wax-nguoc-chieu-long"), alt: "Toinen käsineinen käsi painaa ihoa asiakkaan polven lähellä, ja toinen pitää vahanauhan päästä, joka irtoaa nilkan puolelta lähellä ihoa", caption: "Toinen käsi pitää ihon kireänä, toinen vetää matalalla vastakarvaan." },
      },
      {
        name: "Valmistele kainalo kuumavahaa varten",
        text: "Asiakas makaa selällään käsi nostettuna pään viereen, ja rintakehä pysyy peitettynä. Ihon on oltava hyvin kuiva. Osa valmistajista suosittelee ensin hyvin ohutta öljykerrosta, jotta kuumavaha ei tartu ihoon; noudata valmistajan ohjetta. Kainalokarvat kasvavat moneen suuntaan, joten jaa alue pieniin osiin.",
        image: { src: img("thoa-sap-cung-wax-nach"), alt: "Asiakas makaa selällään toinen käsi nostettuna pään viereen, rintakehä valkoisen pyyhkeen peitossa, ja kosmetologi levittää vaaleanpunaista kuumavahaa puulastalla kainaloon" },
      },
      {
        name: "Levitä kuumavaha, anna jähmettyä ja vedä",
        text: "Levitä kuumavaha kyseisen osan kasvusuuntaan hieman paksummin kuin nauhavaha ja jätä loppuun paksu reuna, josta tartut. Odota, että vaha jähmettyy: se ei ole enää tahmea mutta on yhä taipuisa. Pidä iho kireänä, tartu reunaan ja vedä nopeasti vastakarvaan matalalla ihoa vasten, ja paina käsi heti päälle. Siirry sitten seuraavaan osaan.",
        image: { src: img("giat-sap-cung-o-nach-sat-da"), alt: "Mustaan käsineeseen puettu käsi pitää asiakkaan kainalon ihoa kireänä, ja toinen tarttuu jähmettyneen vaaleanpunaisen kuumavahan reunaan ja alkaa vetää sitä irti lähellä ihoa", caption: "Jähmettynyt kuumavaha: tartu paksuun reunaan, pidä iho kireänä ja vedä matalalla." },
      },
      {
        name: "Siisti kulmat",
        text: "Sovi kulmien muoto asiakkaan kanssa ennen aloitusta. Ota pienellä lastalla vain hyvin pieni määrä kuumavahaa ja levitä se kulman alapuolen hajakarvoihin kaukana silmästä, kun asiakkaan silmät ovat kiinni. Pidä iho kireänä, vedä nopeasti ja paina kevyesti. Loput karvat nypitään pinseteillä.",
        image: { src: img("wax-chan-may-bang-sap-cung-luong-nho"), alt: "Hoitopöydän päädystä kuvattuna käsineinen käsi pitää silmät kiinni makaavan asiakkaan otsan ihoa kireänä, ja toinen asettaa pienellä lastalla ohuen vaaleanpunaisen vahajuovan kulman alle", caption: "Hyvin pieni määrä vahaa kulman alle, kaukana silmästä, iho kireänä." },
      },
      {
        name: "Poista vahajäämät, rauhoita iho ja ohjeista asiakas",
        text: "Poista vahajäämät kevyesti jälkiöljyllä hankaamatta ja levitä rauhoittavaa voidetta. Kerro asiakkaalle, että lievä punoitus ja muutama pieni näppylä ovat normaaleja ja että noin ensimmäisen vuorokauden ajan kannattaa välttää aurinkoa, saunaa, hyvin kuumaa vettä ja hajustettuja tuotteita, myös deodoranttia. Muutaman päivän päästä kevyt kuorinta ja kosteusvoide ehkäisevät sisäänkasvaneita karvoja.",
      },
      {
        name: "Kirjaa ja siivoa",
        text: "Kirjaa asiakkaan muistiinpanoihin käytetty vaha, vahatut alueet ja ihon reaktio. Lastat, nauhat ja käsineet menevät kannelliseen roska-astiaan. Pyyhi vahapurkin ulkopinta, desinfioi hoitopöytä, vaihda suojapaperi ja pese kädet.",
      },
    ],
  },
  faq: [
    {
      q: "Miten sääret vahataan nauhavahalla?",
      a: "Puhdista iho ja anna sen kuivua, testaa vahan lämpötila ja levitä sitten hyvin ohut kerros kasvusuuntaan noin kämmenen mittaiseksi kaistaksi. Aseta vahanauha päälle ja hiero sitä muutaman kerran kasvusuuntaan. Toinen käsi pitää ihon kireänä, ja toinen vetää nopeasti vastakarvaan matalalla ja lähes ihon suuntaisesti, minkä jälkeen kämmen painetaan heti iholle.",
    },
    {
      q: "Mihin suuntaan vahanauha vedetään, jotta se sattuu vähemmän?",
      a: "Vastakarvaan, hyvin nopeasti, matalalla ja lähes ihon suuntaisesti, samalla kun toinen käsi pitää ihon kireänä. Älä koskaan vedä suoraan ylös, sillä iho lähtee mukaan ja saa helposti mustelmia ja naarmuja. Kämmenen painaminen vahatulle kohdalle muutamaksi sekunniksi helpottaa kirvelyä.",
    },
    {
      q: "Kumpi sopii kainaloihin, nauhavaha vai kuumavaha?",
      a: "Oppitunnilla kainalot vahataan kuumavahalla. Kainalokarvat kasvavat moneen suuntaan, joten alue jaetaan pieniin osiin; kuhunkin levitetään vahaa sen omaan kasvusuuntaan hieman paksummin kuin nauhavahaa ja jätetään paksu reuna. Kun vaha on jähmettynyt, ei enää tahmea mutta yhä taipuisa, iho pidetään kireänä ja vaha vedetään nopeasti vastakarvaan.",
    },
    {
      q: "Kuinka kauan kuumavahan annetaan jähmettyä ennen vetoa?",
      a: "Yhtä yhteistä lukua ei ole, koska vahamerkit eroavat toisistaan. Merkki on se, että vaha on jähmettynyt: se ei enää tunnu tahmealta mutta on yhä taipuisa. Liian pitkään jähmettynyt vaha muuttuu hauraaksi, katkeaa ja on vaikea poistaa.",
    },
    {
      q: "Montako kertaa samaa kohtaa voi vahata?",
      a: "Nauhavahalla samaan kohtaan enintään kaksi kertaa. Jos muutama karva jää, ne nypitään pinseteillä eikä vahaa levitetä uudelleen, sillä saman kohdan toistuva vahaus saa ihon punoittamaan.",
    },
    {
      q: "Miksi käytettyä lastaa ei saa kastaa uudelleen vahaan?",
      a: "Asiakkaan ihoon koskenut lasta vie bakteereja vahapurkkiin, kun se kastetaan uudelleen, ja samaa purkkia käytetään seuraaville asiakkaille. Siksi jokaiseen kastamiseen otetaan uusi lasta, eikä purkista otettua vahaa palauteta purkkiin.",
    },
  ],
  related: ["spa-waxing-hieu-dung", "khi-nao-khong-lam", "rua-tay-gang-tay", "xu-ly-su-co"],
};

export default article;
