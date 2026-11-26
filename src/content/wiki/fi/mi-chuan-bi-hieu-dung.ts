import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/mi-chuan-bi-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "ripsienpidennysten-allergiatesti-ja-konsultaatio",
  lesson: "mi-chuan-bi-hieu-dung",
  category: "lash",
  title: "Ripsienpidennysten allergiatesti ja konsultaatio: mitä kysyä, milloin ei tehdä ja mitä testi ei kerro",
  metaTitle: "Ripsienpidennysten allergiatesti ja turvallinen aloitus",
  metaDescription:
    "Ripsienpidennysten allergiatesti ja konsultaatio: kysymykset allergioista ja silmistä, milloin ei tehdä, liiman höyry, testi 24–48 h ennen ja testin rajat.",
  keyword: "ripsienpidennysten allergiatesti",
  keywords: ["ripsienpidennykset konsultaatio", "ripsiliima allergia", "milloin ripsienpidennyksiä ei saa tehdä", "ripsienpidennykset raskausaikana", "ripsienpidennykset ja piilolinssit", "syanoakrylaatti ripsiliima", "allergiatesti kuinka kauan ennen"],
  excerpt: "Ripsikäynnin ensimmäiset kymmenen minuuttia ratkaisevat kestävyyden ja turvallisuuden: mitä kysyä, milloin aika siirretään ja mitä allergiatesti oikeasti kertoo.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-noi-mi-chuan-bi-khay-dung-cu-truoc-buoi-lam"),
    alt: "Tummahiuksinen ripsistylisti, hiukset korkealla nutturalla ja yllään kermanvärinen paita, asettelee ripsialustoja, jadekiven ja pinsetit marmoripöydälle ennen käyntiä",
  },
  takeaways: [
    "Jokainen ripsikäynti alkaa **konsultaatiolla**, myös vakioasiakkailla. Ensin kysytään turvallisuudesta, vasta sitten tyylistä.",
    "Punaiset tai vetistävät silmät, näärännäppy, turvonneet tai karstaiset luomenreunat tai äskettäinen silmäleikkaus: ei tänään.",
    "Ripsiliima on syanoakrylaattia, joka höyrystyy kovettuessaan, joten asiakkaan silmät ovat kiinni koko käynnin. Liima-allergia voi **kehittyä vähitellen** monen ongelmattoman kerran jälkeen.",
    "Allergiatesti tehdään ennen ensimmäisiä pidennyksiä, yleensä 24–48 tuntia etukäteen, tarkalleen liimavalmistajan ohjeen mukaan. **Testi ei ole tae.**",
    "Jos testin jälkeen tulee punoitusta, kutinaa tai turvotusta, pidennyksiä ei tehdä, liimaa ei vaihdeta toiseen ja asiakasta neuvotaan kysymään lääkäriltä.",
  ],
  intro: [
    "Ripsienpidennysten allergiatesti on se osa käyntiä, josta useimmat asiakkaat ovat kuulleet, mutta se on vain yksi pala ensimmäisistä kymmenestä minuutista: kysy, katso, testaa, siivoa ja kirjaa. Kukaan ei kuvaa näitä minuutteja eikä kehu niitä, mutta niissä ratkeaa, kestävätkö ripset ja ennen kaikkea, onko asiakas turvassa.",
    "Artikkeli perustuu VaraaAi Academyn Ripset-kurssin oppituntiin ”Ripsienpidennysten valmistelu: ymmärrä, niin työ on turvallista ensimmäisestä minuutista”. Luettuasi tiedät, mitä konsultaatiossa kysytään, tunnistat päivät, jolloin aika kannattaa siirtää, ymmärrät miksi ripsiliima vaatii niin paljon huolellisuutta ja osaat kertoa asiakkaalle, mitä allergiatesti kertoo ja mitä ei.",
  ],
  sections: [
    {
      id: "miksi-konsultaatio",
      title: "Miksi jokainen ripsikäynti alkaa konsultaatiolla",
      blocks: [
        { p: "Tämä tapahtuu usein. Salongissa on kiire, ripsistylisti on myöhässä, tervehtii ja pyytää asiakkaan heti makuulle. Ei kysymyksiä, ei silmien tarkkaa katsomista. Muutaman päivän päästä asiakas lähettää viestin: luomet ovat turvonneet, kutiavat ja punoittavat. Vasta kysyttäessä selviää, että hän on joskus saanut reaktion ripsiliimasta toisessa salongissa." },
        { p: "Yksi kysymys alussa olisi estänyt sen. Siksi konsultaatio ei ole vain uusille asiakkaille. Myös vakioasiakkailta kysytään uudelleen, koska terveys, lääkitys ja jopa reaktio liimaan voivat muuttua kahden käynnin välillä." },
        { img: { src: img("tu-van-khach-truoc-khi-noi-mi-bang-may-tinh-bang"), alt: "Kermanväriseen paitaan pukeutunut ripsistylisti istuu asiakkaan vieressä sohvalla, ja he katsovat yhdessä konsultaatiolomaketta tabletilta tyylikkäässä ripsistudiossa", caption: "Konsultaatio tehdään, kun asiakas vielä istuu silmät auki, ennen kuin hän käy makuulle." } },
      ],
    },
    {
      id: "konsultaation-kysymykset",
      title: "Ripsienpidennysten konsultaatio: mitä kysytään",
      blocks: [
        { p: "Järjestys on tärkeä: ensin turvallisuus, sitten ulkonäkö. Jos turvallisuuskysymykset jo kertovat, ettei tänään kannata tehdä, tyyleistä ei ole järkeä keskustella." },
        {
          table: {
            head: ["Kysy", "Kysymys", "Miksi se pitää tietää"],
            rows: [
              ["Allergiat", "Onko aiemmin tullut reaktiota ripsiliimasta, ripsien tai kulmien värjäyksestä tai silmänympäryskosmetiikasta", "Jos on, pysähdy äläkä jatka ennen kuin asia on selvä"],
              ["Silmät", "Kuivat tai punaiset silmät, tulehtunut ripsiraja; äskettäinen silmäleikkaus tai muu silmähoito", "Jos silmissä on nyt ongelma, ei tänään"],
              ["Piilolinssit", "Onko ne silmissä", "Linssit otetaan pois ennen käyntiä"],
              ["Lääkitys", "Onko jokin lääke käytössä", "Jotkin lääkkeet, kuten tietyt allergia- tai aknelääkkeet, voivat kuivattaa silmiä"],
              ["Raskaus", "Onko asiakas raskaana", "Syy kysyä tarkemmin ja noudattaa liimavalmistajan ohjeita"],
            ],
          },
        },
        { note: "Raskaana olevalta asiakkaalta kysytään tarkemmin, ja työssä noudatetaan liimavalmistajan ohjeita ja työpaikkasi käytäntöä. Ripsistylisti ei ole lääkäri: älä koskaan anna itse lääketieteellisiä neuvoja. Jos asiakkaalla on terveyteen liittyvä kysymys, neuvo häntä kysymään lääkäriltä.", kind: "warn", title: "Et ole lääkäri" },
        { p: "Vasta sitten puhutaan tyylistä. Haluaako asiakas luonnolliset ripset vai jotain tuuheampaa? Mitä hän tekee työkseen? Uiko hän tai saunooko hän usein, hierooko hän silmiään, nukkuuko hän kasvot tyynyä vasten? Kerro sitten rehellisesti, kuinka paljon hänen omat ripsensä jaksavat kantaa. Silmän muotoon sopivan tyylin valinnasta kerrotaan oppitunnilla [ripsikartta](lesson:mi-mapping-hieu-dung)." },
      ],
    },
    {
      id: "milloin-ei-tehda",
      title: "Milloin ripsienpidennyksiä ei tehdä",
      blocks: [
        { p: "Kysymysten jälkeen katsotaan. Tarkista asiakkaan silmät hyvässä valossa, kun hän vielä istuu silmät auki." },
        { img: { src: img("kiem-tra-mat-khach-duoi-anh-sang-tot"), alt: "Mustiin käsineisiin pukeutunut ripsistylisti katsoo suurennuslasilla istuvan asiakkaan silmiä tasaisen rengasvalon alla", caption: "Silmät katsotaan hyvässä valossa ennen kuin asiakas käy makuulle." } },
        { p: "Mikä tahansa näistä tarkoittaa, että ripsiä ei tänään tehdä:" },
        {
          ul: [
            "Punaiset tai vetistävät silmät.",
            "Näärännäppy.",
            "Turvonneet tai karstaiset luomenreunat.",
            "Äskettäinen silmäleikkaus.",
          ],
        },
        { img: { src: img("mat-do-chay-nuoc-chua-nen-noi-mi"), alt: "Lähikuva kermanvärisellä sängyllä makaavasta naisesta, jonka toinen silmä on punainen luomen ympäriltä ja hieman vetistävä", caption: "Esimerkkikuva: punainen, vetistävä silmä. Tällöin asiakkaalle varataan uusi aika toiselle päivälle." } },
        { p: "Laajempi luettelo ja ystävällinen tapa kieltäytyä löytyvät oppitunnilta [Milloin asiakasta ei hoideta](lesson:khi-nao-khong-lam)." },
      ],
    },
    {
      id: "liima-ja-allergia",
      title: "Syanoakrylaattiliima ja ripsiliima-allergia",
      blocks: [
        { p: "Liima on tärkein syy kaikkeen tähän huolellisuuteen. Ripsiliima on syanoakrylaattia, joka kovettuu ilman kosteuden avulla. Kovettuessaan se höyrystyy. Höyry kirvelee ja ärsyttää silmiä, joten asiakkaan silmät pidetään täysin kiinni koko käynnin ajan." },
        { img: { src: img("giot-keo-noi-mi-cyanoacrylate-tren-da-ngoc"), alt: "Mustakäsineinen käsi pitää kaarevilla pinseteillä yhtä pidennysripseä pienen mustan liimapisaran yllä jadekivellä", caption: "Pieni liimapisara jadekivellä. Liima höyrystyy kovettuessaan, joten pisaraa ei koskaan laiteta suoraan asiakkaan nenän alle." } },
        { p: "Tärkein ymmärrettävä asia: allergia liimalle voi kehittyä vähitellen. Joillakin asiakkailla menee kymmenen kertaa ongelmitta, ja reaktio tulee yhdennellätoista. Sama koskee ripsistylistejä, jotka hengittävät höyryä joka työpäivä. Aiheesta kerrotaan tarkemmin oppitunnilla [Allergiat ja kemikaalit](lesson:di-ung-hoa-chat)." },
        { img: { src: img("mi-mat-do-sung-do-di-ung-keo-noi-mi"), alt: "Lähikuva meikittömästä naisesta, jonka yläluomet ovat hieman turvonneet ja punoittavat, merkki silmänympärysreaktiosta", caption: "Esimerkkikuva silmänympärysreaktiosta: turvonneet, punoittavat luomet. Tällaisten oireiden kanssa asiakkaan kannattaa kääntyä lääkärin puoleen." } },
      ],
    },
    {
      id: "allergiatesti",
      title: "Allergiatesti: kuinka kauan ennen, ja miksi se ei ole tae",
      blocks: [
        { p: "Koska allergia voi kehittyä näin, monet liimavalmistajat ja salongit suosittelevat allergiatestiä ennen ensimmäisiä pidennyksiä, yleensä 24–48 tuntia ennen käyntiä. Noudata liimavalmistajan omaa ohjetta. Yleensä silmän ulkonurkkaan kiinnitetään muutama ripsi tai ripsirajan lähelle laitetaan pieni pisara liimaa, ja asiakas lähtee kotiin. Hän seuraa, tuleeko punoitusta, kutinaa tai turvotusta, ja ilmoittaa salongille." },
        { img: { src: img("thu-keo-noi-mi-vai-soi-o-duoi-mat"), alt: "Lähikuva asiakkaan suljetusta silmästä, jonka alla on valkoinen suojatyyny ja ulkonurkkaan on kiinnitetty testiksi muutama pidempi pidennysripsi", caption: "Yleinen tapa testata: muutama ripsi silmän ulkonurkkaan." } },
        { h3: "Tulos pitää ymmärtää oikein" },
        { p: "Vaikka testi ei aiheuttaisi reaktiota, se ei tarkoita, ettei reaktiota voisi tulla myöhemmin. Allergiatesti auttaa vain tunnistamaan asiakkaat, jotka ovat jo herkistyneet. Siksi joka kerta, kun asiakas palaa, kysytään yksi kysymys: ”Oliko silmien kanssa kaikki hyvin viime kerran jälkeen?” Jos ei ollut, pysähdy äläkä jatka ennen kuin asia on selvä." },
        { h3: "Kun asiakas kertoo reaktiosta" },
        {
          ol: [
            "Ripsiä ei sinä päivänä tehdä. Kerro se lempeästi.",
            "Neuvo asiakasta kysymään lääkäriltä.",
            "Kirjaa tulos, jottei kukaan salongissa tee käsittelyä vahingossa.",
          ],
        },
        { note: "Älä vaihda toiseen liimaan ja jatka vain siksi, ettet halua menettää asiakasta. Et tiedä, mille ainesosalle asiakas reagoi, ja seuraava reaktio voi olla pahempi.", kind: "warn", title: "Liimaa ei vaihdeta, jotta voisi jatkaa" },
        { note: "Testin tapa ja ajankohta tulevat aina liimavalmistajan ohjeesta. Kauneuspalveluja ja -tuotteita koskevat säännöt vaihtelevat maittain, joten selvitä omaa työtäsi koskevat vaatimukset. Artikkeli on koulutusmateriaalia, ei ammattipätevyys.", kind: "info", title: "Liimavalmistajan ohje ja paikalliset säännöt" },
      ],
    },
    {
      id: "huone-ja-hygienia",
      title: "Hoitohuone: kosteus, lämpötila ja hygienia",
      blocks: [
        { p: "Myös huone kuuluu valmisteluun. Jokainen liimavalmistaja ilmoittaa sopivan kosteus- ja lämpötilavälin, ja huone pidetään sen rajoissa. Huone on hyvin tuuletettu, ja liimapullo suljetaan heti pisaran ottamisen jälkeen." },
        { img: { src: img("phong-noi-mi-giu-do-am-va-nhiet-do"), alt: "Tyhjä nurkka ripsistudiossa, jossa pieni ilmankostutin suihkuttaa sumua kivitasolla ikkunan vieressä valkoisten kukkien maljakon vierellä" } },
        {
          table: {
            head: ["Tarvike", "Käsittely"],
            rows: [
              ["Hoitosänky", "Pyyhitään jokaisen asiakkaan jälkeen"],
              ["Suojaliina ja niskatuen suoja", "Vaihdetaan jokaiselle asiakkaalle"],
              ["Ripsiharjat, mikroharjat, silmänalustyynyt", "Kertakäyttöisiä"],
              ["Pinsetit", "Puhdistetaan ja desinfioidaan jokaisen asiakkaan jälkeen"],
            ],
          },
        },
        { img: { src: img("khu-khuan-nhip-va-bo-do-dung-mot-lan"), alt: "Mustakäsineinen käsi pudottaa kahdet pinsetit desinfiointiliuosrasiaan, ja vieressä on kannellinen roska-astia käytettyine ripsiharjoineen", caption: "Jokaisen asiakkaan jälkeen kertakäyttöiset tarvikkeet heitetään pois ja pinsetit puhdistetaan ja desinfioidaan." } },
        { p: "Asiakas makaa kaksi tuntia aivan kasvojesi lähellä. Siisti työpiste näkyy hänelle heti ensisilmäyksellä ja rauhoittaa. Pinsettien käsittely kuvataan oppitunnilla [Välineet jokaisen asiakkaan jälkeen](lesson:ve-sinh-dung-cu)." },
      ],
    },
    {
      id: "asiakastiedot",
      title: "Asiakastiedot: vain suostumuksella ja luottamuksellisesti",
      blocks: [
        { p: "Ensimmäisten kymmenen minuutin viimeinen tehtävä on kirjata: asiakkaan vastaukset, allergiatestin päivämäärä ja tulos, käytetty liima, pituudet ja taivutukset. Monissa salongeissa asiakas myös lukee tiedot ja antaa kirjallisen suostumuksensa ennen ensimmäisiä pidennyksiä." },
        { img: { src: img("ghi-ho-so-khach-va-ngay-thu-keo"), alt: "Kermanväriseen paitaan pukeutunut ripsistylisti istuu kivipöydän ääressä ikkunan vieressä ja kirjoittaa asiakasmuistiinpanoja tablettiin teekupin vieressä" } },
        { p: "VaraaAissa kirjoitat nämä [asiakasprofiilin](lesson:khach-hang) sisäisiin muistiinpanoihin, jotka näkyvät vain salongille. Seuraavalla kerralla ripsien tekijä avaa profiilin ja tietää heti kaiken tarpeellisen. Kyse on terveystiedoista ja yksityisistä asioista, joten kirjaa ne vain asiakkaan suostumuksella ja pidä ne ehdottoman luottamuksellisina." },
        { p: "Uudelle asiakkaalle voit merkitä [kalenteriin](lesson:lich-hen) kaksi aikaa: allergiatestin ja pidennykset, liimavalmistajan ohjeen mukaisella välillä. Käytännön työ hoitosängyn ääressä, ripsien puhdistuksesta suojatyynyjen asetteluun, käydään läpi artikkelissa [ripsien esikäsittely ennen pidennyksiä](lesson:mi-chuan-bi)." },
      ],
    },
  ],
  faq: [
    {
      q: "Tarvitaanko allergiatesti ennen ripsienpidennyksiä?",
      a: "Monet liimavalmistajat ja salongit suosittelevat allergiatestiä ennen ensimmäisiä pidennyksiä, yleensä 24–48 tuntia ennen käyntiä, tarkalleen liimavalmistajan ohjeen mukaan. Asiakas seuraa, tuleeko punoitusta, kutinaa tai turvotusta, ja kertoo siitä salongille.",
    },
    {
      q: "Voinko olla allerginen ripsiliimalle, vaikka allergiatesti meni hyvin?",
      a: "Voit. Allergiatesti ei ole tae, koska liima-allergia voi kehittyä toistuvan altistuksen jälkeen. Testi auttaa vain tunnistamaan jo herkistyneet, ja siksi ripsistylisti kysyy joka käynnillä, oliko silmien kanssa kaikki hyvin edellisen kerran jälkeen.",
    },
    {
      q: "Milloin ripsienpidennyksiä ei saa tehdä?",
      a: "Ei silloin, kun silmät ovat punaiset tai vetistävät, silmässä on näärännäppy, luomenreunat ovat turvonneet tai karstaiset tai silmä on äskettäin leikattu. Jos asiakas on saanut reaktion allergiatestistä, pidennyksiä ei tehdä, ja hänen kannattaa kysyä lääkäriltä.",
    },
    {
      q: "Voiko ripsienpidennyksiä tehdä raskausaikana?",
      a: "Ripsistylisti ei anna tähän lääketieteellistä neuvoa. Raskaana olevalta asiakkaalta kysytään tarkemmin, ja työssä noudatetaan liimavalmistajan ohjeita ja työpaikan käytäntöä. Jos asiakas on huolissaan terveydestään, hänen kannattaa kysyä ensin lääkäriltä.",
    },
    {
      q: "Miksi silmät pitää pitää kiinni ripsienpidennysten aikana?",
      a: "Ripsiliima on syanoakrylaattia, joka kovettuu kosteuden avulla ja höyrystyy kovettuessaan. Höyry kirvelee ja ärsyttää silmiä, joten silmät ovat kiinni koko käynnin ajan. Avoimiin silmiin höyry pääsee suoraan.",
    },
    {
      q: "Voiko ripsistylisti vaihtaa toiseen liimaan, jos allergiatesti reagoi?",
      a: "Ei voi. Ripsistylisti ei tiedä, mikä ainesosa reaktion aiheutti, ja seuraava reaktio voi olla pahempi. Sinä päivänä ripsiä ei tehdä, asiakasta neuvotaan kysymään lääkäriltä ja tulos kirjataan, jotta koko salonki tietää siitä.",
    },
  ],
  related: ["mi-chuan-bi", "mi-classic-hieu-dung", "di-ung-hoa-chat", "khi-nao-khong-lam"],
};

export default article;
