import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/mi-mega-wispy-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "megavolyymi-wispy-ja-wet-look-ripset",
  lesson: "mi-mega-wispy-hieu-dung",
  category: "lash",
  title: "Megavolyymiripset, wispy ja wet look: erot ja milloin ne vahingoittavat omia ripsiä",
  metaTitle: "Megavolyymiripset, wispy ja wet look: mitä ne ovat",
  metaDescription:
    "Megavolyymi, wispy ja wet look eroavat viuhkoissa, piikeissä ja tuuheudessa. Miksi ne kuormittavat omia ripsiä, mikä on kevyempi versio ja milloin on lopetettava.",
  keyword: "megavolyymiripset",
  keywords: [
    "mitä ovat wispy-ripset",
    "wet look -ripset",
    "mikä on piikki ripsienpidennyksissä",
    "vahingoittaako megavolyymi omia ripsiä",
    "kauanko wispy-ripset kestävät",
    "megavolyymi ohuille ripsille",
    "wispy vai volyymi",
  ],
  excerpt: "Kolme ripsityyliä, jotka näyttävät kuvissa upeilta ja kuormittavat omia ripsiä helpoimmin. Mitä kukin on, paljonko viuhkat ja piikit painavat ja milloin on pysähdyttävä.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-voi-bo-mi-noi-dam-hai-mat-mo"),
    alt: "Lähikuvamuotokuva vaaleahiuksisesta asiakkaasta, joka katsoo suoraan eteenpäin silmät auki, ripsienpidennykset tuuheat ja tummat ja ulkonurkkia kohti pitenevät",
  },
  takeaways: [
    "**Megavolyymi** on tuuheinta volyymia: viuhkassa on enemmän ripsiä kuin 6D-viuhkassa, kaikki erittäin ohuita, ja viuhka kiinnitetään silti täsmälleen yhteen omaan ripseen.",
    "**Wispy** on lyhyistä, pehmeistä viuhkoista tehty pohja, jonka lomassa on tasavälein pidempiä piikkejä. **Wet look** käyttää kärjeksi suljettuja viuhkoja, jotka pysyvät selvästi erillään.",
    "Oman ripsen kantokyky ei muutu, joten täysi tyyli tehdään vain vahvoille, pitkille ja paksuille ripsille. Ohuet, lyhyet tai harvat ripset saavat **kevyemmän version**.",
    "Mega vaatii ripsivalmistajan ohuimmat ripset ja hyvin vähän liimaa. Piikit tulevat vahvimpiin omiin ripsiin, eivätkä ne ole paljon pohjaa pidempiä.",
    "Painuvat, kiertyneet tai väärään suuntaan kääntyneet omat ripset ja aukot ovat **ylikuormituksen merkkejä**: vähemmän ripsiä, lyhyemmät pituudet, vähemmän piikkejä, ja tuuheampaa vasta myöhemmin.",
  ],
  intro: [
    "Megavolyymiripset, wispy ja wet look ovat ne kolme tyyliä, joista asiakkaat tuovat useimmin kuvan, koska ne näyttävät kuvissa upeilta. Ne myös vahingoittavat omia ripsiä helpoimmin, jos ripsistylisti vain tavoittelee kuvaa: viuhkoissa on enemmän ripsiä ja kärjet ovat pidempiä, mutta alla oleva oma ripsi kantaa edelleen vain sen, minkä se on aina kantanut.",
    "Artikkeli perustuu VaraaAi Academyn Ripset-kurssin oppituntiin ”Megavolyymi, wispy ja wet look: ymmärrä ne, niin ripset ovat kauniit eivätkä vaurioidu”. Opit erottamaan kolme tyyliä, tunnistamaan mitkä omat ripset kestävät täyden tyylin ja mitkä tarvitsevat kevyemmän version, kertomaan asiakkaalle huolloista ja huomaamaan, milloin setti on liian raskas sitä kantaville ripsille.",
  ],
  sections: [
    {
      id: "mita-tyylit-ovat",
      title: "Mitä megavolyymi, wispy ja wet look ovat",
      blocks: [
        { p: "Kaikki kolme pohjautuvat volyymitekniikkaan, jossa ripsistylisti kiinnittää yhteen omaan ripseen muutamasta hyvin ohuesta ripsestä tehdyn viuhkan. Ne eroavat siinä, montako ripseä viuhkassa on, onko viuhka auki vai suljettu ja miltä ripsirivin reuna näyttää." },
        {
          table: {
            head: ["Tyyli", "Miten se rakennetaan", "Miltä se näyttää"],
            rows: [
              ["Megavolyymi", "Viuhkoissa enemmän ripsiä kuin 6D:ssä, kaikki erittäin ohuita", "Hyvin tuuhea ja tumma ripsiraja kuin pehmeä rajaus"],
              ["Wispy", "Lyhyistä, pehmeistä viuhkoista tehty pohja ja tasavälein pidempiä piikkejä", "Teksturoitu ja höyhenmäinen, rytmikkäästi epätasainen reuna"],
              ["Wet look", "Kärjeksi suljetut viuhkat tiheästi ripsirajaa pitkin", "Kiiltävät ripset selvinä erillisinä kärkinä, kuin vedestä nousseet"],
            ],
          },
        },
        { h3: "Megavolyymi: volyymia tuuheimmillaan" },
        { p: "[Volyymiripsissä](lesson:mi-volume-hieu-dung) viuhkassa on kahdesta kuuteen ripseä. Megavolyymi menee pidemmälle: jokaisessa viuhkassa on vielä enemmän ripsiä, ja jokainen on silkinohut. Koska ripset ovat niin ohuita, rivi näyttää tuuhealta mutta kärjet pysyvät pehmeinä, eivätkä ne ole jäykät kuin nauharipset." },
        { img: { src: img("bo-mi-mega-volume-day-va-den"), alt: "Lähikuva suljetusta silmästä valmiissa megavolyymisetissä, ripsiraja hyvin tuuhea ja tumma ja kärjet pehmeät, valkoisen silmänalustyynyn päällä", caption: "Megavolyymi: samettisen tuuhea ja tumma ripsiraja, kärjet silti pehmeät." } },
        { h3: "Wispy: pehmeä pohja ja rytmikkäät pitkät kärjet" },
        { p: "Wispyssä on kaksi kerrosta. Pohja tehdään lyhyistä, pehmeistä viuhkoista. Sen lomaan tulevat tasavälein piikit (spikes): kärjeksi suljettu ripsiryhmä tai yksittäinen ripsi, joka on pohjaa pidempi. Pitkät kärjet nousevat pohjasta esiin ja tekevät reunasta pehmeän ja epätasaisen." },
        { img: { src: img("bo-mi-wispy-co-mui-dai-nhu-long-vu"), alt: "Lähikuva asiakkaan kasvojen yläosasta sivulta, silmät auki, wispy-setissä pehmeä pohja ja tasavälein esiin nousevia pidempiä kärkiä", caption: "Wispy: pitkät kärjet nousevat pohjasta tasaisessa rytmissä." } },
        { h3: "Wet look: viuhkat suljetaan kärjiksi" },
        { p: "Wet lookissa ei käytetä avoimia viuhkoja. Viuhkan ripset painetaan yhteen kärjeksi, ja kärjet sijoitetaan tiheästi ripsirajaa pitkin. Tyyli sopii asiakkaalle, joka pitää terävästä ja selkeästä ilmeestä enemmän kuin pörröisestä. Jokainen kärki on silti yhdessä omassa ripsessä, ja kärkien on pysyttävä selvästi erillään." },
        { img: { src: img("bo-mi-wet-look-tung-mui-nhon-tach-ro"), alt: "Lähikuva suljetusta silmästä wet look -setissä, ripset suljettu kiiltäviksi mustiksi kärjiksi, jotka erottuvat toisistaan valkoisen tyynyn päällä", caption: "Wet look: jokainen kärki seisoo omillaan, mikään ei tartu viereiseen." } },
      ],
    },
    {
      id: "miksi-ne-kuormittavat",
      title: "Miksi nämä kolme tyyliä kuormittavat omia ripsiä helposti",
      blocks: [
        { p: "Kun asiakas haluaa näyttävät ripset, on houkuttelevaa lisätä ripsiä ja paksuutta. Kun hän haluaa todella esiin nousevan wispyn, on houkuttelevaa tehdä piikeistä todella pitkiä. Klassisten ja volyymiripsien painosääntö pätee silti: oman ripsen kantokyky ei muutu. Tässä se on vielä tärkeämpää, koska jokaisessa viuhkassa on enemmän ripsiä ja jokainen piikki on pohjaa pidempi." },
        { p: "Yksi asia ei muutu, oli tyyli kuinka tuuhea tahansa: **yksi viuhka kiinnitetään täsmälleen yhteen omaan ripseen**. Kahden tai kolmen ripsen ympärille kietoutuva kanta on tarttuma. Ripset kasvavat ja irtoavat omassa tahdissaan, joten ne vetävät toisiaan, asiakas tuntee sen ja ripset irtoavat aikaisin." },
        { img: { src: img("fan-xoe-fan-khep-va-spike-tren-vi-mi"), alt: "Kolme ripsinäytettä rinnakkain vaaleanpunaisella alustalla: leveä avoin viuhka, kapea suljettu viuhka ja terävä piikki", caption: "Vasemmalta: avoin viuhka, suljettu viuhka ja piikki. Mitä siistimmältä ne näyttävät, sitä helpommin unohtuu, montako ripseä niissä on." } },
        { h3: "Piikki painaa enemmän kuin näyttää" },
        { p: "Piikki on suljettu viuhka: ripset ovat tiiviisti yhdessä, joten se näyttää ohuelta. Sen paino on silti kaikkien siinä olevien ripsien summa. Ja koska se on pohjaa pidempi, se painaa juurta kuin pitkä vipu: mitä pidempi piikki, sitä enemmän juuri joutuu ponnistelemaan. Siksi piikit kiinnitetään vahvimpiin omiin ripsiin, eikä niistä tehdä paljon pohjaa pidempiä." },
      ],
    },
    {
      id: "kevyempi-versio",
      title: "Voiko megavolyymia tai wispyä tehdä ohuille omille ripsille?",
      blocks: [
        { p: "Täysi tyyli täsmälleen kuvan mukaan on vain vahvoille, pitkille ja paksuille omille ripsille. Ohuet, lyhyet tai harvat ripset voivat saada sen kevyempänä versiona. Setti näyttää yhä samalta tyyliltä, eivätkä omat ripset kanna enempää kuin jaksavat. Läheltäkään useimmat asiakkaat eivät huomaa eroa. Omat ripset huomaavat." },
        {
          table: {
            head: ["Asiakkaan omat ripset", "Mitä tehdään"],
            rows: [
              ["Vahvat, pitkät ja paksut", "Täysi tyyli, silti ripsivalmistajan taulukon mukaan"],
              ["Ohuet, lyhyet tai harvat", "Kevyempi versio: vähemmän ripsiä viuhkassa, lyhyemmät ja harvemmat piikit"],
            ],
          },
        },
        { img: { src: img("mi-that-truoc-khi-noi-kieu-dam"), alt: "Lähikuva suljetusta silmästä ilman pidennyksiä, omat ripset ohuet ja harvat valkoisen silmänalustyynyn yllä", caption: "Katso omat ripset tarkasti ennen kuin lupaat näyttävän tyylin." } },
        { note: "Asiakas tuo kuvan hyvin näyttävästä megasta, mutta omat ripset ovat ohuet: tee tällä kertaa kevyempi versio, kuvaa omat ripset ennen ja jälkeen ja varaa huolto ajallaan. Tuuheampaa vasta myöhemmin, kun omat ripset ovat terveet.", kind: "tip", title: "Kun kuva pyytää enemmän kuin ripset jaksavat" },
      ],
    },
    {
      id: "ohuet-ripset-vahan-liimaa",
      title: "Megavolyymi: ohuimmat ripset ja hyvin vähän liimaa",
      blocks: [
        { p: "Megavolyymissa kaksi asiaa on välttämättömiä." },
        {
          ul: [
            "**Ripsivalmistajan ohuimmat ripset** valmistajan taulukon mukaan. Viuhka, jossa on monta paksua ripseä, on moninkertaisesti painavampi.",
            "**Hyvin vähän liimaa.** Mitä enemmän ripsiä viuhkassa, sitä pienempi ja siistimpi kannan on oltava, ja se koskettaa vain pientä määrää liimaa.",
          ],
        },
        { p: "Leveä kanta ja paljon liimaa aiheuttavat kolme ongelmaa kerralla: setti painaa enemmän, kanta jäykistyy ja ylimääräinen liima tarttuu helposti viereiseen ripseen." },
        { img: { src: img("fan-mega-volume-chan-nho-tren-nhip"), alt: "Mustaan käsineeseen puettu käsi pitää kulmikkaita volyymipinsettejä, joiden kärjissä on monesta hyvin ohuesta ripsestä tehty megaviuhka pienellä kannalla", caption: "Megaviuhka: monta hyvin ohutta ripseä yhdestä pienestä ja siististä kannasta." } },
        { note: "Artikkelin ripsimäärät, paksuudet ja pituudet ovat yleisiä alan ohjeita, eivät tarkkoja lukuja. Tarkista aina ripsivalmistajan taulukko ja liimavalmistajan ohjeet ja työskentele sen mukaan, mitä omat ripset kantavat. Liima ei saa koskaan koskea ihoon.", kind: "warn", title: "Luvut ovat suuntaa antavia" },
      ],
    },
    {
      id: "wispyn-rytmi",
      title: "Wispy-ripset ovat kauniit tasaisen rytmin ansiosta",
      blocks: [
        { p: "Kaunis wispy-setti perustuu rytmiin. Piikit ovat tasavälein, niiden pituudet tulevat ripsikartasta ja ne pitenevät yleensä ulkonurkkaa kohti." },
        {
          table: {
            head: ["Piikkien sijoittelu", "Tulos"],
            rows: [
              ["Liian tiheästi", "Tekstuuri katoaa ja ripset näyttävät sotkuisilta"],
              ["Liian harvaan", "Näyttää keskeneräiseltä"],
              ["Tasavälein, pituudet kartasta", "Juuri haluttu höyhenmäinen ilme"],
            ],
          },
        },
        { p: "Siksi wispy tarvitsee aina kartan, ja piikkien paikat merkitään ennen ensimmäistä ripseä. Alueiden jakaminen ja pituuksien merkitseminen selitetään artikkelissa [ripsienpidennysten tyylit silmänmuodon mukaan](lesson:mi-mapping-hieu-dung). Käsien työ pohjakerroksesta jokaisen piikin sijoittamiseen on artikkelissa [wispy-ripsien tekeminen](lesson:mi-mega-wispy)." },
      ],
    },
    {
      id: "konsultaatio-ja-huollot",
      title: "Konsultaatio ja huollot näyttäville seteille",
      blocks: [
        { p: "Näytä asiakkaalle mallikuvia ja kysy, kuinka näyttävät ripset hän haluaa: maltilliset vai todella näyttävät. Kun olette sopineet, kerro selvästi kaksi asiaa." },
        {
          ul: [
            "Mitä näyttävämpi tyyli, sitä helpommin aukot näkyvät, kun ripset irtoavat luonnollisesti. Asiakas tarvitsee säännölliset huollot, yleensä **2–3 viikon** välein.",
            "Ripsien kesto riippuu terveistä omista ripsistä ja kotihoidosta, ei ripsien määrästä.",
          ],
        },
        { p: "Huoltoajoille on vielä yksi syy. Kun oma ripsi kasvaa, se vie viuhkaa kauemmas luomesta. Mitä painavampi viuhka, sitä helpommin se kääntyy, kiertyy ja vetää ripseä kasvaessaan ulos. Ulos kasvaneet ripset poistetaan huollossa." },
        { p: "Jos salongissasi on käytössä VaraaAi, luo erillinen ”Megavolyymi”-[palvelu](lesson:dich-vu) tavallista volyymia pidemmällä kestolla, jotta kalenteri ei ahtaudu. Kirjaa tyyli, ripsimäärä viuhkassa ja pituudet [asiakkaan tietoihin](lesson:khach-hang) ja varaa [huoltoaika](lesson:lich-hen) ennen kuin asiakas lähtee." },
      ],
    },
    {
      id: "ylikuormituksen-merkit",
      title: "Omien ripsien ylikuormituksen merkit ja setin keventäminen",
      blocks: [
        { p: "Tämä on hyvin tavallista: asiakas saa megavolyymin ensimmäistä kertaa ja on ihastunut. Toisella tai kolmannella huoltokerralla ripsistylisti huomaa, että omat ripset ovat muuttuneet." },
        {
          ul: [
            "Omat ripset painuvat alas.",
            "Osa ripsistä on kiertynyt tai kääntynyt väärään suuntaan.",
            "Siellä täällä on aukkoja, joista omat ripset ovat irronneet aikaisin.",
          ],
        },
        { img: { src: img("dau-hieu-mi-that-qua-tai-oan-xuong"), alt: "Lähikuva suljetusta silmästä liian raskaassa ripsisetissä, pidennykset roikkuvat tyynyä vasten, menevät ristiin ja jättävät aukkoja", caption: "Esimerkkikuva ylikuormittuneesta setistä: ripset roikkuvat, menevät ristiin ja rivissä on jo aukkoja. Nyt on aika keventää." } },
        { p: "Nämä ovat ylikuormituksen merkkejä. Ripsien lisääminen aukkoihin tai liiman lisääminen pitävyyden vuoksi vain lisää painoa. Hyvä ripsistylisti pysähtyy tässä eikä jatka kuvan tavoittelua, vaan keventää settiä: vähemmän ripsiä viuhkaan, lyhyemmät pituudet, vähemmän piikkejä. Kerro asiakkaalle miksi. Muutaman kevyemmän huollon jälkeen omat ripset palautuvat, ja vasta silloin mietitään tuuheampaa." },
        { p: "Asiakas voi aluksi pettyä. Vuoden kuluttua hänellä on yhä ripset, joihin tehdä pidennyksiä, ja hän on yhä asiakkaasi." },
        { note: "Ripsiliima voi aiheuttaa allergiaa; oireet ja toimintaohjeet ovat oppitunnilla [Allergiat ja kemikaalit](lesson:di-ung-hoa-chat). Punaiset tai tulehtuneet silmät: katso [milloin asiakasta ei hoideta](lesson:khi-nao-khong-lam). Pinsetit puhdistetaan ja desinfioidaan jokaisen asiakkaan jälkeen. Kauneuspalveluja ja -tuotteita koskevat säännöt vaihtelevat maittain; artikkeli on koulutusmateriaalia, ei ammattipätevyys.", kind: "info", title: "Turvallisuus ja säännöt" },
      ],
    },
  ],
  faq: [
    {
      q: "Vahingoittavatko megavolyymiripset omia ripsiä?",
      a: "Megavolyymi vahingoittaa ripsiä, kun setti on painavampi kuin oma ripsi jaksaa kantaa: liikaa ripsiä viuhkassa, paksut ripset, leveä kanta ja liikaa liimaa. Vahvoissa omissa ripsissä, valmistajan ohuimmilla ripsillä, hyvin pienellä liimamäärällä ja jokainen viuhka täsmälleen yhdessä omassa ripsessä, ripset kasvavat ja irtoavat normaalin kiertonsa mukaan. Ohuille, lyhyille tai harvoille ripsille tehdään kevyempi versio.",
    },
    {
      q: "Mitä ovat wispy-ripset ja miten ne eroavat tavallisesta volyymista?",
      a: "Wispy on lyhyistä, pehmeistä viuhkoista tehty pohja, jonka lomassa on tasavälein pidempiä piikkejä, joten ripsirivin reuna näyttää höyhenmäiseltä ja epätasaiselta. Tavallisessa volyymissa reuna on tasainen ja sileä. Molemmissa jokainen viuhka tai piikki kiinnitetään vain yhteen omaan ripseen.",
    },
    {
      q: "Mitä ovat wet look -ripset?",
      a: "Wet look -ripset näyttävät kuin ne olisivat juuri olleet vedessä. Avointen viuhkojen sijaan ripsistylisti käyttää suljettuja viuhkoja: ripset painetaan yhteen kärjiksi, jotka sijoitetaan tiheästi ripsirajaa pitkin. Jokainen kärki on yhdessä omassa ripsessä, ja kärjet pysyvät selvästi erillään.",
    },
    {
      q: "Mikä on piikki ripsienpidennyksissä?",
      a: "Piikki (spike) on kärjeksi suljettu ripsiryhmä tai yksittäinen ripsi, joka on pohjaa pidempi ja muodostaa wispy-setin pitkät kärjet. Se näyttää ohuelta mutta painaa kaikkien siinä olevien ripsien verran, joten se kiinnitetään vain vahvimpiin omiin ripsiin eikä siitä tehdä paljon pohjaa pidempää.",
    },
    {
      q: "Voiko ohuisiin ja harvoihin omiin ripsiin tehdä megavolyymin tai wispyn?",
      a: "Voi, kevyempänä versiona: vähemmän ripsiä viuhkassa, lyhyemmät piikit ja niitä vähemmän. Tyyli näkyy edelleen, eivätkä omat ripset ylikuormitu. Ripsistylistin kannattaa kertoa tästä jo konsultaatiossa.",
    },
    {
      q: "Kuinka usein megavolyymi ja wispy huolletaan?",
      a: "Yleensä 2–3 viikon välein. Mitä näyttävämpi tyyli, sitä helpommin luonnollisesta irtoamisesta syntyvät aukot näkyvät, ja luomesta poispäin kasvavat painavat viuhkat kiertyvät helposti, joten ulos kasvaneet ripset poistetaan huollossa.",
    },
  ],
  related: ["mi-mega-wispy", "mi-volume-hieu-dung", "mi-mapping-hieu-dung", "mi-dam-thao-hieu-dung"],
};

export default article;
