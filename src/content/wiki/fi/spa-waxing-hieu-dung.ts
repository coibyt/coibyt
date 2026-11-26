import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/spa-waxing-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "nauhavaha-vai-kuumavaha",
  lesson: "spa-waxing-hieu-dung",
  category: "spa",
  title: "Nauhavaha vai kuumavaha? Vahauksen perusteet, kenelle vahausta ei tehdä ja ihon jälkihoito",
  metaTitle: "Nauhavaha vai kuumavaha? Kenelle vahausta ei tehdä",
  metaDescription:
    "Nauhavaha vai kuumavaha: karvojen pituus, vahan lämpötila, kenelle vahausta ei tehdä, miksi vetoa ei tehdä suoraan ylös ja mitä välttää vahauksen jälkeen.",
  keyword: "nauhavaha vai kuumavaha",
  keywords: [
    "vahaus",
    "kuinka pitkät karvat vahaukseen",
    "milloin ei saa vahata",
    "isotretinoiini ja vahaus",
    "mitä välttää vahauksen jälkeen",
    "sisäänkasvaneet karvat vahauksen jälkeen",
    "vahan aiheuttama palovamma",
  ],
  excerpt: "Kiireellä tehty vahaus polttaa, naarmuttaa ja punoittaa ihoa; oikein tehtynä se sattuu vähemmän ja jättää ihon sileäksi. Artikkeli selittää pienet tavat, jotka tekevät eron.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("chuyen-vien-thoa-sap-wax-long-chan-cho-khach"),
    alt: "Mustiin käsineisiin pukeutunut kosmetologi levittää puulastalla vahaa valkoisen pyyhkeen alla makaavan asiakkaan sääreen marmorisella vaunulla olevan vahanlämmittimen vieressä",
  },
  takeaways: [
    "Nauhavaha eli pehmeä vaha poistetaan nauhalla, ja se sopii laajoille alueille kuten sääriin ja käsivarsiin. **Kuumavaha** eli kova vaha ei tarvitse nauhaa, tarttuu ihoon vähemmän ja sopii kainaloihin, kulmiin ja ylähuuleen.",
    "Testaa vaha ennen jokaista asiakasta oman ranteesi sisäpuolelle ja sitten pieneen kohtaan asiakkaan iholla. Liian kuuma polttaa, liian viileä repii ihoa.",
    "**Isotretinoiinia** käyttävää asiakasta ei vahata. Tuore kuorinta tai laser, auringonpolttama, rikkinäinen iho, huuliherpes, ihottuma, suonikohjut: sitä aluetta ei vahata.",
    "Nauhavaha levitetään karvojen kasvusuuntaan ja vedetään vastakarvaan matalalla, lähes ihon suuntaisesti. Ei koskaan suoraan ylös.",
    "Ei kaksoiskastamista: asiakkaan ihoon koskenut lasta ei koskaan palaa vahapurkkiin.",
  ],
  intro: [
    "Nauhavaha vai kuumavaha on ensimmäinen valinta jokaisessa vahauksessa. Itse vahaus on yksinkertaista: lämmin vaha levitetään iholle, se tarttuu karvoihin ja vedetään irti. Hoitolassa vahaus on kuitenkin palvelu, joka kiireellä tehtynä polttaa, naarmuttaa tai punoittaa asiakkaan ihoa helpoimmin. Oikein tehtynä se sattuu vähemmän, iho jää sileäksi ja asiakas palaa.",
    "Artikkeli seuraa VaraaAi Academyn Spa ja ihonhoito -kurssin oppituntia ”Vahaus: ymmärrä se, niin kipu vähenee ja iho pysyy turvassa”, joka on aiheen teoriaosa. Luettuasi tiedät, kumpaa vahaa käytät millekin alueelle, ketä ei vahata, miksi vedon suunta on tärkeä ja mitä kerrot asiakkaalle vahauksen jälkeen. Säären, kainalon ja kulmien vahaus vaihe vaiheelta on artikkelissa [Vahaus vaihe vaiheelta](lesson:spa-waxing). Intiimialueiden vahausta artikkeli ei käsittele.",
  ],
  sections: [
    {
      id: "nauhavaha-ja-kuumavaha",
      title: "Nauhavaha ja kuumavaha: miten ne eroavat",
      blocks: [
        { p: "Hoitoloissa käytetään kahta päävahatyyppiä. Ne eroavat levitys- ja poistotavaltaan ja siksi myös siinä, mille alueille ne sopivat." },
        {
          table: {
            head: ["Vertailu", "Nauhavaha (pehmeä vaha)", "Kuumavaha (kova vaha)"],
            rows: [
              ["Levitys", "Hyvin ohut kerros", "Paksumpi kerros"],
              ["Poisto", "Nauha painetaan päälle ja vedetään irti", "Ei nauhaa: vaha jähmettyy ja vedetään reunasta"],
              ["Ominaisuus", "Nopea", "Tarttuu karvaan, ihoon vähemmän"],
              ["Sopii", "Laajoille alueille kuten sääriin ja käsivarsiin", "Pienille, ohutihoisille alueille: kainalot, kulmat, ylähuuli"],
            ],
          },
        },
        { img: { src: img("sap-mem-va-sap-cung-wax-long"), alt: "Kaksi vahapurkkia vierekkäin kivitasolla: vasemmalla hunajanvärinen nauhavaha ja pino vahanauhoja, oikealla vaaleanpunainen kuumavaha ja pala jähmettynyttä vahaa", caption: "Vasemmalla nauhavaha nauhoineen. Oikealla kuumavaha, joka jähmettyy palaksi ja nostetaan irti." } },
        { p: "Jokainen vahamerkki on erilainen, joten lämpötila, ajat ja käyttö noudattavat aina valmistajan ohjeita." },
      ],
    },
    {
      id: "vahan-lampotila",
      title: "Vahan lämpötila: turvallisuussääntö numero yksi",
      blocks: [
        { p: "Kaksi tapaturmaa on hyvin yleisiä, ja molemmat alkavat vahapurkista. Hoitolassa on kiire, purkki on liian kuuma, eikä tekijä testaa vahaa vaan levittää sen suoraan asiakkaan sääreen: asiakas säpsähtää, ja iholle jää punainen, polttava raita. Tai päinvastoin: vaha on jäähtynyt, tekijä vetää hitaasti ja suoraan ylös, iho lähtee mukaan ja on seuraavana päivänä mustelmilla ja naarmuilla." },
        { p: "Jokaisella vahalla on oma työlämpötilansa, joka lukee valmistajan ohjeessa. Älä luota pelkkään silmämääräiseen arvioon. Ennen jokaista asiakasta:" },
        {
          ol: [
            "Ota vähän vahaa uudella lastalla ja testaa se oman ranteesi sisäpuolelle.",
            "Testaa pieneen kohtaan asiakkaan iholla.",
            "Kysy asiakkaalta, tuntuuko vaha liian kuumalta.",
          ],
        },
        { img: { src: img("thu-nhiet-do-sap-wax-tren-co-tay"), alt: "Mustaan käsineeseen puettu käsi pitää keltaista vahaa sisältävää puulastaa ja taputtaa hieman vahaa toisen käden ranteen sisäpuolelle lämpimän vahapurkin vieressä", caption: "Testaa ensin oman ranteesi sisäpuolelle ja vasta sitten asiakkaan iholle." } },
        { p: "Oikean lämpöinen vaha on lämmintä ja valuu tasaisesti kuin hunaja. Liian kuuma polttaa. Liian viileä repii ihoa ja sattuu." },
      ],
    },
    {
      id: "karvojen-pituus",
      title: "Kuinka pitkät karvat vahaukseen tarvitaan ja miten iho valmistellaan",
      blocks: [
        { p: "Karvojen on oltava niin pitkiä, että vaha saa niistä otteen, yleensä noin puoli senttiä eli suunnilleen riisinjyvän mittaisia." },
        {
          ul: [
            "**Liian lyhyet** karvat vaha ei saa kiinni. Jos asiakas on juuri ajellut, uusi aika muutaman viikon päähän.",
            "**Liian pitkät** karvat lyhennetään ensin, jolloin vahaus sattuu vähemmän.",
            "**Ihon on oltava puhdas ja kuiva:** ei voidetta, öljyä eikä hikeä. Pyyhi iho esipuhdistusaineella valmistajan ohjeen mukaan.",
          ],
        },
      ],
    },
    {
      id: "kenelle-ei-vahata",
      title: "Milloin ei saa vahata: lääkkeet, ihon kunto ja terveys",
      blocks: [
        { p: "Kysy aina ennen vahausta lääkkeistä, myös vakioasiakkailta. Jotkin lääkkeet tekevät ihosta niin ohuen ja hauraan, että vahaus voi irrottaa ihon pintaa." },
        {
          table: {
            head: ["Tilanne", "Mitä tehdään"],
            rows: [
              ["Käyttää aknelääke isotretinoiinia", "Ei vahausta"],
              ["On hiljattain lopettanut isotretinoiinin", "Odotus on yleensä noin puoli vuotta. Asiakas kysyy lääkäriltään, milloin vahaus on taas turvallista"],
              ["Käyttää retinoidivoiteita tai kuorivia happoja", "Hoidettua aluetta ei vahata; noudata vahan valmistajan ja lääkkeen määränneen lääkärin ohjeita"],
              ["Tuore kuorinta tai laser, auringonpolttama, rikkinäinen iho, huuliherpes, ihottuma", "Sitä aluetta ei vahata"],
              ["Suonikohjut", "Niiden päältä ei vahata"],
              ["Diabetes, huono verenkierto, ohut ja helposti mustelmille menevä iho, verenohennuslääkkeet", "Iho paranee hitaammin: erityistä varovaisuutta ja kehotus kysyä ensin lääkäriltä"],
            ],
          },
        },
        { p: "Isotretinoiinin osalta oppitunti viittaa brittiläisen [NHS:n ohjeeseen](https://www.nhs.uk/medicines/isotretinoin-capsules/common-questions-about-isotretinoin-capsules/): hoidon aikana ei vahata. Kosmetologi ei diagnosoi. Jos epäröit, älä tee. Oppitunti [Milloin asiakasta ei hoideta](lesson:khi-nao-khong-lam) kertoo tarkemmin, miten kieltäydyt." },
        { img: { src: img("tu-van-khach-truoc-khi-wax-long"), alt: "Kermanväriseen kylpytakkiin pukeutunut vaaleahiuksinen asiakas istuu hoitopöydän reunalla ja ojentaa voideputken vastapäätä istuvalle kosmetologille", caption: "Kysy, mitä lääkkeitä asiakas käyttää ja mitä hän levittää iholleen, ennen kuin vahanlämmitin kytketään päälle." } },
        { h3: "Ensikertalaiselle allergiatesti" },
        { p: "Jos asiakas tulee vahaukseen ensimmäistä kertaa, hänen ihonsa on herkkä tai hänellä on ollut allergioita, tee ensin testi. Monissa vahoissa on hartsia (kolofonia), jolle osa ihmisistä on allerginen. Testaa pieni pala huomaamattomaan kohtaan, yleensä edellisenä päivänä tai valmistajan ohjeen mukaan. Oireeton testi ei silti ole tae. Katso myös oppitunti [Allergiat ja kemikaalit](lesson:di-ung-hoa-chat)." },
      ],
    },
    {
      id: "levitys-ja-veto",
      title: "Levitys kasvusuuntaan, veto vastakarvaan",
      blocks: [
        { p: "Vahauksen tekniikassa tärkeintä on suunta. Nauhavaha levitetään karvojen kasvusuuntaan. Veto tehdään vastakarvaan: nopeasti ja päättäväisesti, matalalla ja lähes ihon suuntaisesti." },
        { img: { src: img("loi-giat-giay-wax-thang-len"), alt: "Kosmetologi vetää vahanauhan suoraan ylös asiakkaan sääreltä, ja toinen käsi on ilmassa pitämättä ihoa, mikä havainnollistaa tekniikkavirhettä", caption: "Vältettävä virhe: veto suoraan ylös ilman, että iho pidetään kireänä. Iho lähtee mukaan, saa helposti mustelmia ja naarmuja, ja karvat katkeavat." } },
        {
          ul: [
            "**Älä koskaan vedä suoraan ylös.** Iho lähtee mukaan, saa helposti mustelmia ja naarmuja, ja karvat katkeavat puolivälistä.",
            "**Toinen käsi pitää ihon aina kireänä** aivan vahan vieressä. Kireä iho sattuu vähemmän eikä lähde mukaan.",
            "**Paina kämmen heti vedon jälkeen** vahatulle kohdalle muutamaksi sekunniksi. Kirvely helpottaa selvästi.",
            "**Nauhavahaa samaan kohtaan enintään kaksi kertaa.** Muutamat jäljelle jääneet karvat nypitään pinseteillä, ei vahata uudelleen.",
            "**Kainalossa** karvat kasvavat moneen suuntaan, joten alue jaetaan pieniin osiin, ja kukin vahataan oman kasvusuuntansa mukaan.",
          ],
        },
      ],
    },
    {
      id: "vahauksen-hygienia",
      title: "Vahauksen hygienia: ei kaksoiskastamista",
      blocks: [
        { p: "Lasta, joka on koskenut asiakkaan ihoon, ei koskaan palaa vahapurkkiin. Jokaiseen kastamiseen otetaan uusi lasta. Muuten purkista tulee paikka, jonka kautta bakteerit kulkevat asiakkaalta toiselle." },
        { img: { src: img("bo-que-da-dung-lay-que-moi-khi-wax"), alt: "Mustiin käsineisiin pukeutunut kosmetologi pudottaa vahaisen puulastan kannelliseen roska-astiaan ja ottaa toisella kädellä uuden lastan lasipurkista vahapurkin vierestä", caption: "Käytetty lasta kannelliseen roska-astiaan; seuraava kastaminen uudella lastalla." } },
        {
          ul: [
            "Purkista otettua vahaa ei palauteta purkkiin.",
            "Käsineet, uusi suojapaperi ja kertakäyttöiset nauhat.",
            "Asiakas pysyy peitettynä, ja vain vahattava alue on paljaana.",
            "Kasvot ja kulmat: kuumavaha, hyvin pieni määrä, huolellisesti ja kaukana silmästä.",
          ],
        },
        { p: "Käsienpesu ja käsineiden käyttö käydään läpi oppitunnilla [Käsihygienia ja käsineet](lesson:rua-tay-gang-tay). Intiimivahaus on oma tekniikkansa, joka vaatii oman koulutuksensa, eikä se kuulu tähän artikkeliin." },
        { note: "Kauneudenhoitoalan määräykset vaihtelevat maittain. Artikkeli on koulutusmateriaalia, ei ammattipätevyys.", kind: "warn", title: "Määräykset vaihtelevat maittain" },
      ],
    },
    {
      id: "vahauksen-jalkeen",
      title: "Mitä välttää vahauksen jälkeen, sisäänkasvaneet karvat ja palovammat",
      blocks: [
        { p: "Vahauksen jälkeen lievä punoitus ja muutama pieni näppylä karvatupissa ovat normaaleja, ja ne häviävät yleensä muutamassa tunnissa." },
        { img: { src: img("da-do-nhe-cham-nho-sau-khi-wax-long"), alt: "Lähikuva juuri vahatusta naisen säärestä hoitopöydällä, iho on hieman punertava ja karvatupissa on pieniä punaisia pisteitä", caption: "Lievä punoitus ja pienet pisteet karvatupissa heti vahauksen jälkeen ovat normaali reaktio." } },
        { h3: "Noin ensimmäisen vuorokauden ajan" },
        { p: "Neuvo asiakasta välttämään auringonottoa, saunaa, kuumia kylpyjä ja hajustettuja tuotteita, kainalovahauksen jälkeen myös deodoranttia. Jos vahan valmistaja antaa omat jälkihoito-ohjeensa, noudata niitä." },
        { h3: "Sisäänkasvaneet karvat" },
        { p: "Asiakkaat kysyvät näistä usein. Muutaman päivän kuluttua iho kuoritaan hyvin kevyesti ja kosteutetaan säännöllisesti. Ei puristelua eikä nyppimistä. Jos kohta turpoaa, on kipeä tai märkii, neuvo asiakasta käymään lääkärissä." },
        { h3: "Jos vaha polttaa tai irrottaa ihoa" },
        { p: "Vahan aiheuttama palovamma: viilennä se heti viileän juoksevan veden alla noin kaksikymmentä minuuttia. Sama ohje löytyy [NHS:n palovammojen hoito-ohjeesta](https://www.nhs.uk/conditions/burns-and-scalds/treatment/), ja se käydään läpi oppitunnilla [Ensiapu kauneushoitolassa](lesson:xu-ly-su-co). Jos ihoa irtoaa: lopeta, älä vahaa sitä kohtaa uudelleen ja kirjaa tapahtuma." },
        { img: { src: img("lam-mat-vet-bong-sap-duoi-voi-nuoc"), alt: "Mustaan käsineeseen puettu käsi tukee asiakkaan kyynärvartta kivialtaan yllä viileän juoksevan veden alla, ja asiakkaan ranteen sisäpuolella on punainen jälki", caption: "Palovamma: viilennä viileän juoksevan veden alla noin kaksikymmentä minuuttia." } },
        { p: "VaraaAissa merkitset asiakkaan sisäisiin muistiinpanoihin [asiakasrekisterissä](lesson:khach-hang) käytetyn vahan, vahatut alueet ja ihon reaktion, jotta seuraavan käynnin tekijä tietää ne." },
      ],
    },
  ],
  faq: [
    {
      q: "Mikä ero on nauhavahalla ja kuumavahalla?",
      a: "Nauhavaha levitetään hyvin ohuena kerroksena, päälle painetaan nauha ja se vedetään irti; se on nopea ja sopii laajoille alueille kuten sääriin ja käsivarsiin. Kuumavaha levitetään paksummin, ei tarvitse nauhaa, jähmettyy ja vedetään reunasta. Se tarttuu karvaan ja vähemmän ihoon, joten se sopii pienille, ohutihoisille alueille kuten kainaloihin, kulmiin ja ylähuuleen.",
    },
    {
      q: "Mitä vahaus on?",
      a: "Vahaus on karvanpoistoa vahalla: lämmin vaha levitetään iholle karvojen kasvusuuntaan ja vedetään irti vastakarvaan. Hoitoloissa käytetään kahta päätyyppiä, nauhan kanssa käytettävää nauhavahaa ja ilman nauhaa käytettävää kuumavahaa. Oikein tehtynä vahaus sattuu vähemmän ja jättää ihon sileäksi.",
    },
    {
      q: "Kuinka pitkät karvat vahaukseen tarvitaan?",
      a: "Yleensä noin puoli senttiä eli suunnilleen riisinjyvän mittaiset, jotta vaha saa niistä otteen. Ajelun jälkeen odotetaan muutama viikko, että karvat kasvavat takaisin. Hyvin pitkät karvat lyhennetään ennen vahausta, jolloin se sattuu vähemmän.",
    },
    {
      q: "Voiko vahauksen tehdä isotretinoiinia käyttäessä?",
      a: "Ei voi. Lääke tekee ihosta ohuen ja hauraan, vahaus voi irrottaa ihoa, ja NHS neuvoo välttämään vahausta hoidon aikana. Lopettamisen jälkeen odotus on yleensä noin puoli vuotta; kysy lääkäriltäsi, milloin vahaus on taas turvallista.",
    },
    {
      q: "Mitä pitää välttää vahauksen jälkeen?",
      a: "Noin ensimmäisen vuorokauden ajan vältetään auringonottoa, saunaa, kuumia kylpyjä ja hajustettuja tuotteita, kainalovahauksen jälkeen myös deodoranttia. Lievä punoitus ja pienet näppylät karvatupissa ovat normaaleja ja häviävät yleensä muutamassa tunnissa. Jos vahan valmistajalla on omat ohjeensa, noudata niitä.",
    },
    {
      q: "Mitä tehdä sisäänkasvaneille karvoille vahauksen jälkeen?",
      a: "Kuori iho muutaman päivän kuluttua hyvin kevyesti ja kosteuta sitä säännöllisesti. Älä puristele äläkä nypi karvoja. Jos kohta turpoaa, on kipeä tai märkii, käy lääkärissä.",
    },
  ],
  related: ["spa-waxing", "khi-nao-khong-lam", "di-ung-hoa-chat", "xu-ly-su-co"],
};

export default article;
