import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/brow-lami-tint-phun/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "kulmien-laminointi-varjays-vai-pysyva-meikki",
  lesson: "brow-lami-tint-phun",
  category: "tips",
  title: "Kulmien laminointi, värjäys vai pysyvä meikki? Mitä kukin tekee, kauanko se kestää ja kenelle se sopii",
  metaTitle: "Kulmien laminointi, värjäys vai pysyvä meikki?",
  metaDescription:
    "Mitä kulmien laminointi on, miten se eroaa värjäyksestä ja pysyvästä meikistä, kauanko kukin kestää ja mikä sopii sekaisin oleville tai vaaleille kulmille.",
  keyword: "kulmien laminointi",
  keywords: [
    "kauanko kulmien laminointi kestää",
    "kauanko kulmien värjäys kestää",
    "kulmien laminointi vai värjäys",
    "kauanko pysyvä meikki kulmissa kestää",
    "kulmien laminointi vai pysyvä meikki",
    "sekaisin olevat kulmakarvat",
  ],
  excerpt: "Kolme tapaa herätä kauniisiin kulmiin ilman kulmakynää: karvojen muotoilu, värjäys tai pysyvä meikki. Mitä kukin tekee, kauanko se kestää ja kenelle se sopii.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-voi-long-may-gon-gang-tu-nhien"),
    alt: "Lähikuva naisesta, jolla on vaaleat hiukset siistillä nutturalla ja siistit, luonnolliset kulmat, katse suoraan eteenpäin valoisassa hoitohuoneessa",
  },
  takeaways: [
    "**Kulmien laminointi** muotoilee kulmakarvat ja asettaa ne siististi samaan suuntaan, joten kulmat näyttävät tuuheilta ja luonnollisilta noin **6–8 viikkoa**.",
    "**Kulmien värjäys** antaa jokaiselle karvalle väriä, sopii parhaiten vaaleille kulmille, ja väri kestää noin **3–4 viikkoa**.",
    "**Pysyvässä meikissä** väri viedään ihon pintakerrokseen, ja kulmien muoto pysyy noin **1–3 vuotta**.",
    "Nopea valinta: sekaisin oleviin kulmiin laminointi, vaaleisiin värjäys ja pitkäkestoiseen tulokseen pysyvä meikki.",
    "Pysyvää meikkiä varten valitse koulutettu tekijä ja **tee allergiatesti ensin**.",
  ],
  intro: [
    "Kulmien laminointi, kulmien värjäys vai pysyvä meikki: mitä eroa niillä on? Kaikilla kolmella on sama tavoite, eli kauniit kulmat peilissä joka aamu ilman kulmakynää tai -geeliä. Jokainen niistä kuitenkin vaikuttaa eri asiaan. Laminointi muuttaa karvojen suuntaa, värjäys niiden väriä, ja pysyvä meikki jättää karvat rauhaan ja piirtää kulmien muodon ihoon.",
    "Artikkeli perustuu VaraaAi Academyn kurssin ”Moja Beauty: ripset, kynnet ja kulmat” oppituntiin ”Kulmien laminointi, värjäys vai pysyvä meikki?”. Kurssi on lyhyitä asiakasvideoita helsinkiläiseltä Moja Beauty -salongilta. Luettuasi tiedät, mitä kukin hoito tekee, kauanko se kestää ja mikä sopii juuri sinun kulmillesi.",
  ],
  sections: [
    {
      id: "kolme-vaihtoehtoa",
      title: "Kulmien laminointi, värjäys ja pysyvä meikki vertailussa",
      blocks: [
        {
          table: {
            head: ["Hoito", "Mitä se tekee", "Kauanko se kestää"],
            rows: [
              ["Kulmien laminointi", "Muotoilee karvat samaan suuntaan", "Noin 6–8 viikkoa"],
              ["Kulmien värjäys", "Antaa jokaiselle karvalle väriä", "Noin 3–4 viikkoa"],
              ["Pysyvä meikki", "Väri viedään ihon pintakerrokseen", "Noin 1–3 vuotta"],
            ],
          },
        },
        { p: "Kaksi ensimmäistä vaikuttavat omiin kulmakarvoihisi, joten tulos on pehmeä ja luonnollinen ja haalistuu sitä mukaa kuin karvat kasvavat ja vaihtuvat. Pysyvä meikki on ihossa, joten se kestää paljon pidempään, ja mielensä muuttaminen on myös paljon vaikeampaa." },
      ],
    },
    {
      id: "kulmien-laminointi",
      title: "Mitä kulmien laminointi tekee: karvat samaan suuntaan",
      blocks: [
        { p: "Kulmien laminoinnissa kulmakarvat muotoillaan ja harjataan sitten siististi samaan suuntaan. Kulmakarvat kasvavat luonnostaan sinne tänne: osa osoittaa alas, osa kiertyy sivulle. Laminoinnin jälkeen ne on nostettu ylös ja ne asettuvat samaan suuntaan, joten kulmat näyttävät tuuheammilta ja siistimmiltä ja ovat silti omia karvojasi." },
        { p: "Hoito toimii kuten ripsien kestotaivutus: ensimmäinen aine pehmentää karvan sisärakenteen, jotta karva ottaa uuden muodon, ja toinen aine kiinnittää muodon. Koska karvat on muotoiltu, tulos kestää noin kuudesta kahdeksaan viikkoa, kunnes uudet kulmakarvat kasvavat tilalle." },
        { img: { src: img("khuon-silicone-dinh-hinh-soi-theo-mot-nep"), alt: "Lähikuva asiakkaan suljetusta silmästä, kun mustakäsineinen tekijä painaa vaaleanpunaisen silikonimuotin ripsirajaa vasten, yläpuolella tuuheat ja siistit kulmat", caption: "Ripsien kestotaivutus: karvat asetetaan samaan suuntaan ja kiinnitetään aineella. Kulmien laminointi tehdään samalla tavalla kulmakarvoille." } },
        { p: "Laminointi sopii sekaisin oleviin kulmiin, joissa karvat kasvavat moneen suuntaan, tai melko tuuheisiin kulmiin, jotka eivät pysy paikoillaan. Se ei lisää karvoja: jos kulmassa on aidosti paljas kohta, se on paljas myös laminoinnin jälkeen." },
        { note: "Laminointiaine kuivattaa kulmakarvoja, joten hoitoa ei pidä uusia kuutta tai kahdeksaa viikkoa aikaisemmin. Jälkihoidosta ja siitä, mitä kannattaa välttää, kerrotaan artikkelissa [näin kulmien laminointi pysyy kauniina 6 viikkoa](lesson:giu-nep-brow-lamination).", kind: "tip", title: "Hoidon jälkeen" },
      ],
    },
    {
      id: "kulmien-varjays",
      title: "Kulmien värjäys: selkeyttä vaaleisiin kulmiin",
      blocks: [
        { p: "Kulmien värjäys antaa värin jokaiselle kulmakarvalle. Vaaleat kulmat tai kulmat, joissa on paljon ohuita ja vaaleita karvoja, näyttävät kasvoilla usein harvoilta ja haaleilta, vaikka karvoja olisi paljonkin. Värjäyksen jälkeen karvat erottuvat, ja kulmat näyttävät tummemmilta ja selkeämmiltä." },
        { img: { src: img("to-thuoc-nhuom-len-tung-soi"), alt: "Mustakäsineinen tekijä levittää pienellä siveltimellä tummanruskeaa väriä muotille nostettuihin ripsiin, asiakkaan kulmat näkyvät selvästi yläpuolella", caption: "Väri levitetään karvoihin, ei iholle. Kuvassa värjätään ripsiä; kulmien värjäys tehdään samalla periaatteella." } },
        { p: "Väri kestää noin kolmesta neljään viikkoa ja haalistuu sitten. Värin pitää olla nimenomaan ripsille ja kulmille tarkoitettua, ja sävy valitaan kulmiesi ja hiustesi mukaan. Hiusväriä ei saa koskaan käyttää silmien ympärillä." },
        { p: "Monet värien valmistajat edellyttävät allergiatestiä etukäteen, yleensä noin 48 tuntia ennen käyntiä, pienelle ihoalueelle esimerkiksi korvan taakse tai kyynärtaipeeseen. Jos testikohta punoittaa, kutisee, turpoaa tai kirvelee, värjäystä ei tehdä." },
        { img: { src: img("thu-phan-ung-thuoc-nhuom-o-khuyu-tay"), alt: "Mustakäsineinen tekijä taputtelee vähän testiainetta kermanvärisessä nojatuolissa istuvan asiakkaan kyynärtaipeeseen", caption: "Allergiatesti kyynärtaipeessa ennen värjäystä valmistajan ohjeen mukaan." } },
      ],
    },
    {
      id: "pysyva-meikki",
      title: "Pysyvä meikki kulmiin: pitkäkestoinen, joten valitse huolella",
      blocks: [
        { p: "Pysyvässä meikissä väri viedään ihon pintakerrokseen, ja iholle syntyy pysyvä kulmien muoto. Se ei riipu siitä, kuinka paljon sinulla on kulmakarvoja, joten se sopii niille, jotka haluavat kulmien näyttävän hyvältä pitkään ilman kuukausittaista ylläpitoa. Tulos kestää noin yhdestä kolmeen vuoteen." },
        { note: "Koska väri on ihossa, valitse koulutettu tekijä ja tee allergiatesti ennen hoitoa. Tätä oppitunti korostaa. Pysyvää meikkiä koskevat säännöt vaihtelevat maittain, joten kysy salongilta koulutuksesta ja luvista ennen varausta.", kind: "warn", title: "Ennen pysyvää meikkiä" },
        { p: "Pysyvä meikki on pitkäaikainen valinta. Jos et ole vielä varma, millaisesta muodosta ja värin syvyydestä pidät, voit kokeilla ensin laminointia tai värjäystä, koska ne haalistuvat muutamassa viikossa." },
      ],
    },
    {
      id: "mika-valita",
      title: "Kulmien laminointi vai värjäys, vai pysyvä meikki?",
      blocks: [
        {
          table: {
            head: ["Kulmasi", "Kokeile"],
            rows: [
              ["Sekaisin olevat karvat, jotka eivät pysy paikoillaan", "Kulmien laminointi"],
              ["Vaaleat kulmat, vaaleat karvat", "Kulmien värjäys"],
              ["Haluat pitkäkestoiset kulmat vähällä hoidolla", "Pysyvä meikki"],
            ],
          },
        },
        { img: { src: img("long-may-tu-nhien-cua-phu-nu-trung-nien"), alt: "Lähikuva keski-ikäisestä ruskeahiuksisesta naisesta, jolla on luonnolliset kulmat ja siniset silmät, katse suoraan eteenpäin pehmeässä valossa" } },
        { p: "Joskus mikään niistä ei sovi juuri nyt: kun silmät ovat punaiset, tulehtuneet tai vuotavat, silmänympärysiho on ärtynyt tai olet aiemmin saanut reaktion laminointiaineesta tai väristä. Kerro siitä salongille selvästi, ja kysy lääkäriltä, jos et ole varma. Artikkeli [akrylaattiallergia, ripsiliima ja hiusvärit](lesson:di-ung-hoa-chat) kertoo allergisen reaktion merkeistä." },
        { img: { src: img("tu-van-chon-cach-lam-may-voi-khach"), alt: "Tummahiuksinen kosmetologi korkealla nutturalla täyttää konsultaatiolomaketta ja keskustelee nojatuolissa istuvan, kermanväriseen neuleeseen pukeutuneen vaaleahiuksisen asiakkaan kanssa", caption: "Kerro, millaiset kulmat haluat nähdä peilissä joka aamu ja oletko koskaan saanut allergista reaktiota." } },
      ],
    },
    {
      id: "kysy-ja-varaa",
      title: "Kysy neuvoa ja varaa kulmahoito",
      blocks: [
        { p: "Etkö tiedä, mikä sopii kulmillesi? Ota kulmistasi kuva ilman meikkiä ja [lähetä salongille viesti](lesson:chat-voi-salon). VaraaAissa [varaat ajan netissä](lesson:dat-lich-online) valitsemalla palvelun ja ajan, ja se on siinä. Tämä oppitunti tulee Moja Beautysta Helsingistä, ja sen kulmahoidot näet [Moja Beautyn varaussivulta](/b/moja-beauty)." },
        { p: "Jos mietit myös ripsiäsi, artikkeli [ripsienpidennykset vai kestotaivutus](lesson:noi-mi-vs-uon-mi) vertailee niitä samaan tapaan kuin tämä artikkeli. Miten taivutus- ja väriaineet toimivat, kerrotaan ripsikurssin artikkelissa [mikä on ripsien kestotaivutus](lesson:lash-lift-hieu-dung)." },
      ],
    },
  ],
  faq: [
    {
      q: "Mitä kulmien laminointi on?",
      a: "Kulmien laminoinnissa kulmakarvat muotoillaan ja harjataan siististi samaan suuntaan. Karvat nousevat ylös ja asettuvat samoin päin, joten kulmat näyttävät tuuheammilta ja luonnollisemmilta ilman kulmageeliä tai -kynää.",
    },
    {
      q: "Kauanko kulmien laminointi kestää?",
      a: "Tulos kestää noin kuudesta kahdeksaan viikkoa. Sen jälkeen uudet kulmakarvat kasvavat ja muoto haalistuu. Hoitoa ei kannata uusia aikaisemmin, jotta karvat saavat levätä.",
    },
    {
      q: "Kauanko kulmien värjäys kestää?",
      a: "Kulmien väri kestää noin kolmesta neljään viikkoa ja haalistuu sitten. Värjäys sopii parhaiten vaaleille kulmille tai vaaleille karvoille, ja se tekee kulmista selkeämmät ja tummemmat.",
    },
    {
      q: "Kauanko pysyvä meikki kulmissa kestää?",
      a: "Pysyvä meikki kestää noin yhdestä kolmeen vuoteen, koska väri viedään ihon pintakerrokseen. Valitse koulutettu tekijä ja tee allergiatesti ennen hoitoa.",
    },
    {
      q: "Kannattaako ottaa kulmien laminointi vai pysyvä meikki?",
      a: "Jos kulmakarvasi ovat sekaisin eivätkä pysy paikoillaan, valitse laminointi: tulos on luonnollinen ja haalistuu kuudessa tai kahdeksassa viikossa. Jos haluat kulmien näyttävän hyvältä pitkään vähällä hoidolla, pysyvä meikki kestää yhdestä kolmeen vuoteen, mutta se on pitkäaikainen valinta ja tekijä on valittava huolella.",
    },
    {
      q: "Tarvitaanko ennen kulmien värjäystä allergiatesti?",
      a: "Monet värien valmistajat edellyttävät allergiatestiä, yleensä noin 48 tuntia ennen käyntiä, pienelle ihoalueelle esimerkiksi korvan taakse tai kyynärtaipeeseen. Jos testikohta punoittaa, kutisee, turpoaa tai kirvelee, värjäystä ei pidä tehdä.",
    },
  ],
  related: ["giu-nep-brow-lamination", "noi-mi-vs-uon-mi", "mi-mong-mua-dong", "lash-lift-hieu-dung"],
};

export default article;
