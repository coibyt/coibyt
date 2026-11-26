import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/mi-chuan-bi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "ripsien-esikasittely-ennen-pidennyksia",
  lesson: "mi-chuan-bi",
  category: "lash",
  title: "Ripsien esikäsittely ennen pidennyksiä: 11 vaihetta konsultaatiolomakkeesta työtarjottimeen",
  metaTitle: "Ripsien esikäsittely ennen pidennyksiä: 11 vaihetta",
  metaDescription:
    "Ripsien esikäsittely ennen pidennyksiä: konsultaatio, silmien tarkistus, allergiatesti, sänky ja valo, piilolinssit, öljytön puhdistus, kuivaus, tyynyt ja teippi.",
  keyword: "ripsien esikäsittely",
  keywords: ["ripsienpidennysten valmistelu", "silmänalustyynyn asettaminen", "ripsien pesu ennen pidennyksiä", "ripsiprimerin käyttö", "alaripsien teippaus", "öljytön meikinpoisto ennen ripsienpidennyksiä", "ripsistylistin työpisteen valmistelu"],
  excerpt: "Kaikki ennen ensimmäistä ripseä: konsultaatio, silmien tarkistus, allergiatesti, sänky, puhdistus, silmänalustyynyt ja tarjotin sekä virheet, joista asiakkaan silmät hiertävät ja kirvelevät.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-noi-mi-chuan-bi-giuong-trong-studio"),
    alt: "Kermanväriseen paitaan pukeutunut ripsistylisti levittää puhtaan suojaliinan hoitosängylle tilavassa studiossa, jossa on valkoiset kiviseinät ja violetit samettiverhot",
  },
  takeaways: [
    "Konsultaatio tehdään, kun asiakkaan **silmät ovat vielä auki**, paperilomakkeella tai tabletilla, ja asiakas lukee vastaukset ja hyväksyy ne.",
    "Ensikertalainen: allergiatesti liimavalmistajan ohjeen mukaan, usein 24–48 tuntia etukäteen, **samalla liimalla, jota käytät**, ja päivämäärä kirjataan.",
    "Ripsien on oltava öljyttömät ja täysin kuivat: öljytön meikinpoisto, pesu tyvestä kärkeen, huuhtelu ja kuivaus pienellä tuulettimella.",
    "Silmänalustyyny peittää kaikki alaripset, ja sen yläreuna on heti alaripsirajan alla **koskematta limakalvoreunaan**.",
    "Teippi kiinnitetään vain tyynyn ja posken päälle. Tyyny ja teippi eivät koskaan kosketa itse silmää.",
  ],
  intro: [
    "Ripsien esikäsittely kattaa kaiken siitä hetkestä, kun asiakas astuu sisään, siihen asti, kun ensimmäinen pidennys on kiinnittämistä vaille valmis. Mikään tästä ei näy kuvissa, mutta vinoon asetettu tyyny tai öljyinen ripsiraja seuraa ripsistylistiä seuraavat kaksi tuntia.",
    "Artikkeli perustuu VaraaAi Academyn Ripset-kurssin oppituntiin ”Ripsienpidennysten valmistelu: vaihe vaiheelta”. Käyt läpi yksitoista vaihetta oppitunnin videon järjestyksessä konsultaatiolomakkeesta työtarjottimeen ja pysähdyt juuri siihen, mistä [klassisten ripsienpidennysten ohje](lesson:mi-classic) alkaa kiinnittää ripsiä.",
  ],
  sections: [
    {
      id: "kolme-tehtavaryhmaa",
      title: "Mitä ripsienpidennysten valmistelu sisältää: kolme tehtäväryhmää",
      blocks: [
        { p: "Kun yksitoista vaihetta kootaan yhteen, valmistelu jakautuu kolmeen osaan. Muista nämä kolme, niin yksikään tehtävä ei jää tekemättä, vaikka tarkka järjestys unohtuisikin." },
        {
          table: {
            head: ["Ryhmä", "Mitä siihen kuuluu", "Mitä varten"],
            rows: [
              ["Asiakas", "Konsultaatio, silmien ja omien ripsien tarkistus, ohjeet ennen makuulle menoa, allergiatesti ensikertalaiselle", "Tiedät, voiko tänään tehdä, ja asiakas tietää, mitä on tulossa"],
              ["Työpiste", "Pyyhitty sänky, puhdas suojaliina ja niskatuen suoja, valo, puhtaat kädet ja uudet käsineet, tarjotin", "Kaikki asiakkaaseen koskeva on puhdasta, eikä sinun tarvitse nousta kesken työn"],
              ["Ripset", "Piilolinssit pois, meikinpoisto, pesu, kuivaus, tyynyt, teippi, harjaus, primer", "Ripset ovat öljyttömät, kuivat ja tasaisesti erillään, alaripset kokonaan peitossa"],
            ],
          },
        },
        { p: "Jokaisen konsultaatiokysymyksen perustelut, allergiatestin tuloksen tulkinta ja tilanteet, joissa aika siirretään, käydään läpi teoria-artikkelissa [ripsienpidennysten allergiatesti ja konsultaatio](lesson:mi-chuan-bi-hieu-dung)." },
      ],
    },
    {
      id: "oljyttomat-ja-kuivat",
      title: "Miksi ripsien on oltava öljyttömät ja täysin kuivat",
      blocks: [
        { p: "Ripsiliima tarttuu puhtaaseen ja kuivaan ripseen. Voiteista, luomiväristä tai ripsiväristä jäänyt öljy heikentää kiinnitystä, vaikka itse pidennykset tehtäisiin kuinka huolellisesti tahansa. Siksi puhdistuskerroksia on kolme peräkkäin: asiakas poistaa meikin, ripsistylisti pesee ripset ja lopuksi tulee primer, jos liimavalmistaja sitä suosittelee." },
        { img: { src: img("tay-trang-mat-khong-dau-truoc-khi-noi-mi"), alt: "Vaaleahiuksinen asiakas kermanvärisessä neuleessa istuu tuolissa ja pyyhkii silmänympärystään vanulapulla ennen ripsikäyntiä", caption: "Luomiväri, ripsiväri ja voide poistetaan öljyttömällä meikinpoistoaineella." } },
        { p: "Meikinpoistoaineen pitää olla öljytön, muuten juuri puhdistusvaihe jättää ripsiin öljyä. Pesun ja huuhtelun jälkeen ripset kuivataan huolellisesti. Kosteisiin ripsiin liima ei myöskään tartu hyvin." },
        { img: { src: img("lam-kho-mi-bang-quat-nho"), alt: "Mustakäsineinen käsi pitää pientä kermanväristä käsituuletinta ja kuivaa silmät kiinni makaavan asiakkaan ripsiä", caption: "Pieni tuuletin pidetään etäällä kasvoista, ja sitä käytetään, kunnes ripset ovat täysin kuivat." } },
        { note: "Piilolinssit otetaan pois ensin, koska liimahöyry ja nesteet voivat kertyä linssin alle. Kysy linsseistä jo konsultaatiolomakkeessa, jotta asiakas ehtii poistaa ne ennen makuulle menoa.", kind: "warn", title: "Piilolinssit" },
      ],
    },
    {
      id: "tyyny-ja-teippivirheet",
      title: "Silmänalustyynyn ja teipin yleisimmät virheet",
      blocks: [
        { p: "Tyynyjen asettaminen on koko valmistelun huolimattomimmin tehty vaihe, ja juuri sen asiakas tuntee selvimmin." },
        {
          table: {
            head: ["Virhe", "Seuraus", "Näin vältät"],
            rows: [
              ["Tyynyn reuna koskee limakalvoreunaan", "Hiertää, kirvelee ja vetistää, silmät punaiset käynnin jälkeen", "Pyydä asiakasta katsomaan hieman ylös asettamisen ajan; kysy sitten, hiertääkö, ja korjaa"],
              ["Tyyny liian alhaalla tai vinossa", "Alaripset pilkistävät ulkonurkassa ja liimautuvat yläripsiin; silmiä avatessa ne nykivät kipeästi", "Tarkista tyynyn reuna huolellisesti, etenkin ulkonurkassa"],
              ["Teippi koskee silmään", "Hiertää ja ärsyttää; tyyny ja teippi eivät koskaan kosketa itse silmää", "Alaripsien teippi kiinnitetään vain tyynyn ja posken päälle"],
              ["Luomen teippi liian kireällä", "Asiakkaalla on epämukava olo koko käynnin", "Kiinnitä kevyesti ja kysy, kiristääkö"],
            ],
          },
        },
        { note: "Jos asiakas sanoo, että jokin hiertää, korjaa se heti. Älä anna hänen sietää sitä koko käyntiä: epämukavat silmät liikkuvat enemmän, ja työkin vaikeutuu.", kind: "tip", title: "Yksi kysymys tyynyjen jälkeen" },
      ],
    },
    {
      id: "liimavalmistajan-ohje",
      title: "Mikä tehdään aina liimavalmistajan ohjeen mukaan",
      blocks: [
        {
          ul: [
            "Allergiatestin tapa ja testin jälkeinen odotusaika.",
            "Käytetäänkö primeria, ja miten.",
            "Liimalle sopiva huoneen kosteus- ja lämpötilaväli.",
          ],
        },
        { p: "Allergiatesti ei takaa, ettei asiakas reagoi myöhemmin. Aiemmin testatulta asiakkaalta kysytään silti joka kerta, onko silmien kanssa ollut kaikki hyvin. Punaiset tai vetistävät silmät, näärännäppy, turvonneet tai karstaiset luomenreunat tarkoittavat, että työ keskeytetään, kuten oppitunnilla [Milloin asiakasta ei hoideta](lesson:khi-nao-khong-lam)." },
        { note: "Kauneuspalveluja ja -tuotteita koskevat säännöt vaihtelevat maittain, joten selvitä omaa työtäsi koskevat vaatimukset. Artikkeli on koulutusmateriaalia, ei ammattipätevyys.", kind: "info", title: "Säännöt vaihtelevat maittain" },
      ],
    },
    {
      id: "allergiatestin-kirjaus",
      title: "Tallenna allergiatestin päivämäärä ja tulos asiakasprofiiliin",
      blocks: [
        { p: "Testipäivä, liima ja tulos ovat hyödyllisiä vain, jos seuraava tekijä löytää ne. VaraaAissa tallennat ne [asiakasprofiilin](lesson:khach-hang) sisäisiin muistiinpanoihin, jotka näkyvät vain salongille, ja vain asiakkaan suostumuksella. Allergiatesti ja pidennykset voi varata [kalenteriin](lesson:lich-hen) kahdeksi eri ajaksi, jolloin asiakkaan ei tarvitse itse muistaa niiden väliä." },
      ],
    },
  ],
  howTo: {
    title: "Ripsien esikäsittely vaihe vaiheelta",
    id: "ripsien-esikasittelyn-vaiheet",
    after: "kolme-tehtavaryhmaa",
    lead: "Yksitoista vaihetta oppitunnin videon järjestyksessä. Kolme ensimmäistä tehdään, kun asiakas vielä istuu silmät auki.",
    supplies: [
      "Konsultaatiolomake paperilla tai tabletilla",
      "Desinfiointiliinat, puhdas suojaliina ja niskatuen suoja, niskatyyny, ohut peitto",
      "Uudet käsineet",
      "Öljytön meikinpoistoaine",
      "Ripsishampoo, pehmeä harja, puhdasta vettä, paperia ja pieni tuuletin",
      "Silmänalustyynyt ja lääkinnällinen paperiteippi",
      "Kertakäyttöiset ripsiharjat ja mikroharjat, primer jos liimavalmistaja suosittelee",
      "Ripsialustat, liima, jadekivi ja kahdet desinfioidut pinsetit",
    ],
    steps: [
      {
        name: "Ota asiakas vastaan ja käy lomake läpi",
        text: "Pese kädet ja pyydä asiakas istumaan, kun hänen silmänsä ovat vielä auki. Anna konsultaatiolomake ja kysy allergioista, aiemmista reaktioista liimaan tai ripsiväriin, silmäsairauksista, äskettäisestä silmäleikkauksesta, piilolinsseistä, lääkityksestä ja raskaudesta. Kysy, millaisen lopputuloksen hän haluaa, ja anna hänen lukea vastaukset ja hyväksyä ne.",
        image: { src: img("tu-van-khach-noi-mi-khi-con-mo-mat"), alt: "Kermanväriseen paitaan pukeutunut ripsistylisti istuu asiakasta vastapäätä sohvalla ja kirjoittaa kirjoitusalustalle konsultaation aikana" },
      },
      {
        name: "Tarkista silmät ja omat ripset hyvässä valossa",
        text: "Tasainen valo, asiakas istuu ja katsoo ylöspäin. Etsi punoitusta, vetistystä, näärännäppyä, turvonneita tai karstaisia luomenreunoja. Katso myös omia ripsiä: ovatko ne tiheät vai harvat, vahvat vai heikot, onko katkenneita ripsiä tai laikuittain lähtenyttä ripsirivistöä. Jos jokin näyttää väärältä, pysähdy.",
      },
      {
        name: "Kerro asiakkaalle, mitä on tulossa",
        text: "Kerro, että käynti voi kestää tunnista kahteen tuntiin ja hän makaa paikallaan silmät kiinni koko ajan. Jos silmiä kirvelee, ne tuntuvat hiekkaisilta tai hän tarvitsee tauon, hän nostaa käden eikä avaa silmiä. Ehdota, että hän käy vessassa ennen makuulle menoa. Kun asiakas tietää etukäteen, mitä odottaa, hän makaa rauhallisemmin ja silmät liikkuvat vähemmän.",
      },
      {
        name: "Tee ensikertalaiselle allergiatesti",
        text: "Noudata tarkalleen liimavalmistajan ohjetta, yleensä 24–48 tuntia ennen pidennyksiä: muutama ripsi ulkonurkkaan juuri sillä liimalla, jota aiot käyttää, tai pieni pisara liimaa ripsirajan lähelle. Pyydä asiakasta seuraamaan kotona punoitusta, kutinaa tai turvotusta ja soittamaan salongille, jos niitä tulee. Kirjaa päivämäärä, liima ja tulos. Jos asiakas on testattu aiemmin, avaa profiili, tarkista kirjaus ja kysy uudelleen.",
      },
      {
        name: "Valmistele sänky, valo ja kädet",
        text: "Pyyhi sänky desinfiointiliinalla ja levitä puhdas suojaliina, uusi niskatuen suoja, niskatyyny ja ohut peitto. Valo valaisee silmien alueen tasaisesti häikäisemättä asiakkaan kasvoja. Puhelin äänettömälle, hiljaista musiikkia ja miellyttävä huonelämpö. Pese sitten kädet ja laita uudet käsineet.",
        image: { src: img("lau-giuong-noi-mi-bang-khan-khu-khuan"), alt: "Kaksi mustakäsineistä kättä pyyhkii kermanvärisen hoitosängyn pintaa desinfiointiliinalla, ja vieressä on taiteltu puhdas suojaliina", caption: "Sänky pyyhitään jokaisen asiakkaan jälkeen, ja suojaliina ja niskatuen suoja ovat aina puhtaat." },
      },
      {
        name: "Piilolinssit pois ja öljytön meikinpoisto",
        text: "Asiakas poistaa ensin piilolinssit, koska liimahöyry ja nesteet voivat jäädä linssin alle. Silmämeikki, ripsiväri ja voiteet poistetaan öljyttömällä meikinpoistoaineella. Ripsiin jäänyt öljy estää liimaa pitämästä kunnolla.",
        image: { src: img("thao-kinh-ap-trong-truoc-khi-noi-mi"), alt: "Asiakkaan käsi laittaa piilolinssin pieneen koteloon kermanvärisen pyyhkeen päällä, vieressä nestepullo valkoisella kivipöydällä" },
      },
      {
        name: "Pese, huuhtele ja kuivaa ripset",
        text: "Asiakas käy makuulle silmät kiinni. Harjaa ripsishampoota kevyesti ripsiin pehmeällä harjalla tyvestä kärkeen. Huuhtele puhtaalla vedellä, joka valuu kevyesti ylhäältä alas, ja pidä paperia ulkonurkassa. Kuivaa huolellisesti pienellä tuulettimella kasvoista etäällä: vain täysin kuiviin ripsiin liima tarttuu hyvin.",
        image: { src: img("xa-nuoc-sach-sau-khi-rua-mi"), alt: "Mustakäsineinen ripsistylisti puristaa pientä pulloa ja huuhtelee puhdasta vettä asiakkaan suljetuille ripsille pitäen paperia ulkonurkassa", caption: "Vesi valuu kevyesti ylhäältä alas, paperi ulkonurkassa." },
      },
      {
        name: "Aseta silmänalustyynyt",
        text: "Tyyny peittää kaikki alaripset, ja sen yläreuna on heti alaripsirajan alla koskematta limakalvoreunaan tai silmään. Pyydä asiakasta raottamaan silmiä ja katsomaan ylös asettamisen ajan, jotta reuna asettuu siististi alaripsien alle, ja anna hänen sitten sulkea silmät. Kysy, hiertääkö, ja korjaa heti. Tarkista lopuksi reuna, etenkin ulkonurkka, ettei yksikään alaripsi pilkistä esiin.",
        image: { src: img("dan-mieng-lot-duoi-mat-che-kin-mi-duoi"), alt: "Mustakäsineinen sormi painaa kevyesti valkoista silmänalustyynyä asiakkaan suljetun silmän alle, ja tyyny peittää alaripset kokonaan" },
      },
      {
        name: "Käytä teippiä tarvittaessa",
        text: "Jos alaripsiä pilkistää vielä esiin, lisää pieni pala lääkinnällistä paperiteippiä vain tyynyn ja posken päälle. Raskaissa luomissa moni ripsistylisti nostaa luomen ihoa kevyesti pienellä teipinpalalla, jotta ripsiraja näkyy selvästi. Kiinnitä teippi kevyesti, kysy kiristääkö, äläkä koskaan laita teippiä silmään.",
        image: { src: img("dan-bang-dinh-giay-giu-mi-duoi"), alt: "Lähikuva suljetusta silmästä valkoisen tyynyn kanssa, ja mustakäsineinen sormi lisää paperiteipin palan ulkonurkan lähelle" },
      },
      {
        name: "Harjaa ja käytä primeria, jos liimavalmistaja suosittelee",
        text: "Harjaa ripset erilleen. Primer poistaa jäljellä olevan öljyn, jotta liima tarttuu paremmin, ja sitä käytetään vain, jos liimavalmistaja sitä suosittelee. Levitä sitä kevyesti ripsien keskiosaan ja kärkiin kertakäyttöisellä mikroharjalla, kaukana tyvestä ja luomen ihosta. Harjaa sitten uudelleen, jotta ripset erottuvat tasaisesti.",
        image: { src: img("quet-primer-len-than-mi-truoc-khi-noi"), alt: "Pieni kertakäyttöinen mikroharja kulkee kevyesti silmät kiinni makaavan asiakkaan ripsiä pitkin, alla valkoinen tyyny", caption: "Primer levitetään vain ripsien keskiosaan ja kärkiin, ei tyveen eikä luomen iholle." },
      },
      {
        name: "Kokoa tarjotin ja kysy vielä kerran",
        text: "Tarjottimella ovat ripsialustat ripsikartan järjestyksessä, jadekivi ja tuore liimapisara, kahdet desinfioidut pinsetit, ripsiharja ja kertakäyttöiset mikroharjat. Sulje liimapullo heti ja tarkista huoneen kosteus ja lämpötila liimavalmistajan ilmoittamaa väliä vasten. Kysy asiakkaalta, onko hänen hyvä olla ja onko niska kunnossa, ja kiinnitä vasta sitten ensimmäinen ripsi.",
      },
    ],
  },
  faq: [
    {
      q: "Mitä ennen ripsienpidennyksiä pitää tehdä?",
      a: "Konsultaatio ja silmien tarkistus, ensikertalaiselle allergiatesti, sängyn pyyhkiminen ja puhdas suojaliina, piilolinssien poisto ja öljytön meikinpoisto, ripsien pesu ja kuivaus, silmänalustyynyt alaripsien päälle, harjaus ja tarjottimen kokoaminen. Primeria käytetään vain, jos liimavalmistaja sitä suosittelee.",
    },
    {
      q: "Pitääkö meikki poistaa ennen ripsienpidennyksiä?",
      a: "Pitää. Luomiväri, ripsiväri ja voiteet poistetaan öljyttömällä meikinpoistoaineella, koska ripsiin jäänyt öljy heikentää kiinnitystä. Sen jälkeen ripsistylisti vielä pesee ripset ripsishampoolla ja kuivaa ne täysin.",
    },
    {
      q: "Voiko piilolinssejä pitää ripsienpidennysten aikana?",
      a: "Ei, asiakas poistaa ne ennen käyntiä. Liimahöyry ja nesteet voivat kertyä linssin alle, joten linssit otetaan pois silmien suojaamiseksi.",
    },
    {
      q: "Miten silmänalustyyny asetetaan oikein?",
      a: "Tyyny peittää kaikki alaripset, ja sen yläreuna on heti alaripsirajan alla mutta ei koske limakalvoreunaan. Limakalvoreunan kosketus aiheuttaa hiertämistä, kirvelyä ja punoitusta; liian alas asetettuna alaripset jäävät esiin ja liimautuvat yläripsiin. Pyydä asiakasta katsomaan hieman ylös asettamisen ajan ja kysy, hiertääkö.",
    },
    {
      q: "Miten ripsiprimeria käytetään?",
      a: "Vain jos liimavalmistaja sitä suosittelee, ja tarkalleen valmistajan ohjeen mukaan. Primer levitetään kevyesti ripsien keskiosaan ja kärkiin kertakäyttöisellä mikroharjalla kaukana tyvestä ja luomen ihosta, ja ripset harjataan sen jälkeen uudelleen erilleen.",
    },
    {
      q: "Miten ensikertalaiselle tehdään allergiatesti?",
      a: "Liimavalmistajan ohjeen mukaan, usein 24–48 tuntia ennen pidennyksiä, samalla liimalla, jota todella käytät: muutama ripsi ulkonurkkaan tai pieni pisara liimaa ripsirajan lähelle. Asiakas seuraa reaktioita ja kertoo niistä, ja salonki kirjaa päivämäärän, liiman ja tuloksen. Testi ei takaa, ettei reaktiota tule myöhemmin.",
    },
  ],
  related: ["mi-chuan-bi-hieu-dung", "mi-classic", "mi-mapping", "ve-sinh-dung-cu"],
};

export default article;
