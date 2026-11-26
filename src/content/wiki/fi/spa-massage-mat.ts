import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/spa-massage-mat/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "kasvohieronta-ohje-vaihe-vaiheelta",
  lesson: "spa-massage-mat",
  category: "spa",
  title: "Kasvohieronta ohje: 12 vaihetta ensimmäisestä kosketuksesta ohimoiden painaluun",
  metaTitle: "Kasvohieronta ohje: 12 vaihetta ja oikea suunta",
  metaDescription:
    "Kasvohieronta ohje vaihe vaiheelta: allergiakysymykset, työasento, öljy, kaula ja hartiat, leukalinja ja posket, otsa, silmänympärys, painelu, lopetus ja kirjaus.",
  keyword: "kasvohieronta ohje",
  keywords: [
    "kasvohieronnan vaiheet",
    "kasvohieronnan tekniikka",
    "mihin suuntaan kasvoja hierotaan",
    "kuinka kauan kasvohieronta kestää",
    "silmänympärysten hieronta",
    "kasvohieronta aloittelijalle",
  ],
  excerpt: "Kokonainen kasvohieronta hartioista ja kaulasta leukalinjaan, poskille, otsalle ja silmien ympärille, sitten painelu ja lopetus. Mukana toistomäärät, öljyn määrä ja neljä yleistä virhettä.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("dat-tay-len-vai-khach-truoc-khi-massage-mat"),
    alt: "Kosmetologi seisoo hoitopöydän päädyssä ja lepuuttaa avoimia käsiään kevyesti silmät kiinni makaavan asiakkaan hartioilla, taustalla kaari-ikkuna ja valkoinen orkidea",
  },
  takeaways: [
    "Kasvohieronta tehdään puhtaalle iholle, ja se kestää noin **10–20 minuuttia** hoitolan hoito-ohjelman mukaan.",
    "Järjestys pysyy samana: hartiat ja kaula, leukalinja ja posket, suun ympärys, otsa, silmänympärys, painelu ja lopetus. Alhaalta ylös, silmät viimeisenä.",
    "Kaikki sivelyt kasvoilla kulkevat **ylös ja ulospäin**, ja kukin ote toistetaan noin kolmesta kuuteen kertaa.",
    "Pidä otetta vaihtaessasi aina toinen käsi asiakkaassa, ettei hän säpsähdä.",
    "Jos iho punoittaa nopeasti, kevennä otetta tai ohita kohta. Kirvelevä, kutiava punoitus: lopeta, pyyhi kevyesti ja laita viileä pyyhe.",
  ],
  intro: [
    "Kasvohieronta ohje ei ole monimutkainen: kasvohoidon osana tehdään muutama ote, eli sivelyä, pieniä ympyröitä ja painelua, aina samassa järjestyksessä. Vaikeinta on pitää paine kevyenä, rytmi tasaisena ja kädet asiakkaassa koko sen kymmenen–kahdenkymmenen minuutin ajan.",
    "Artikkeli seuraa VaraaAi Academyn Spa ja ihonhoito -kurssin oppituntia ”Kasvohieronta: vaihe vaiheelta”. Luettuasi osaat tehdä kahdentoista vaiheen kasvohieronnan ensimmäisestä kysymyksestä muistiinpanoihin ja siistiin hoitopöytään. Hieronnan kesto noudattaa hoitolan hoito-ohjelmaa, ja öljyt ja voiteet käytetään valmistajan ohjeen mukaan.",
  ],
  sections: [
    {
      id: "hieronnan-jarjestys",
      title: "Kasvohieronnan järjestys: alhaalta ylös, silmät viimeisenä",
      blocks: [
        { p: "Kasvohieronta tehdään yleensä kasvohoidon aikana, kun iho on puhdistettu. Oppitunnin sarjassa on seitsemän osaa:" },
        {
          ol: [
            "Hartiat ja kaula",
            "Leukalinja ja posket",
            "Suun ympärys",
            "Otsa",
            "Silmänympärys",
            "Painelu",
            "Lopetus",
          ],
        },
        { p: "Järjestys etenee alhaalta ylös ja vähiten herkistä alueista herkimpään eli silmien ympärykseen. Kun kätesi tulevat silmille, asiakas on jo tottunut paineeseesi ja rytmiisi." },
        { note: "Pidä järjestys joka kerta samana. Kädet oppivat sen, rytmi pysyy tasaisena eikä mikään alue jää väliin.", kind: "tip", title: "Ammattilaisen vinkki" },
        { p: "Tässä artikkelissa käsitellään vain käsiotteet. Miksi sivelyt kulkevat ylöspäin, milloin aika siirretään ja mitä kasvohieronta tekee ja mihin se ei pysty, kerrotaan artikkelissa [Kasvohieronnan hyödyt](lesson:spa-massage-mat-hieu-dung)." },
      ],
    },
    {
      id: "toistot-oljy-paine",
      title: "Toistot, öljyn määrä ja paine",
      blocks: [
        { p: "Alla olevat luvut ja tavat koskevat sarjan jokaista vaihetta." },
        {
          table: {
            head: ["Muista", "Miten", "Miksi"],
            rows: [
              ["Toistot", "Noin kolmesta kuuteen kertaa otetta kohden ennen siirtymistä", "Asiakas ehtii tuntea otteen ja rentoutua"],
              ["Öljyn määrä", "Aloita vähällä; lisää hieman, jos kädet venyttävät ihoa", "Liika öljy jättää kasvot rasvaisiksi ja kädet liukkaiksi, jolloin otetta on vaikea hallita"],
              ["Paine", "Kerro asiakkaalle etukäteen, kysy uudelleen painelussa", "Jokainen pitää erilaisesta paineesta"],
              ["Kädet", "Pidä otetta vaihtaessa aina toinen käsi asiakkaassa", "Asiakas ei säpsähdä ja rentoutuu syvemmin"],
            ],
          },
        },
        { p: "Jos asiakkaan iho on punoittava ja herkkä, sarjaa lyhennetään: painelu hyvin kevyesti tai ei ollenkaan, eikä taputusta." },
      ],
    },
    {
      id: "yleiset-virheet",
      title: "Neljä yleistä virhettä kasvohieronnassa",
      blocks: [
        {
          table: {
            head: ["Virhe", "Seuraus", "Korjaus"],
            rows: [
              ["Molemmat kädet nostetaan irti ja lasketaan äkkiä takaisin", "Asiakas säpsähtää", "Pidä aina toinen käsi asiakkaassa"],
              ["Kynnet koskettavat ihoa", "Epämukavaa, ja iho naarmuuntuu helposti", "Lyhyet kynnet, vain sormenpäiden pehmeät osat"],
              ["Jatkuva puhuminen", "Asiakas ei pysty rentoutumaan", "Kysy paineesta ja anna sitten asiakkaan levätä"],
              ["Ihon tarkkailu unohtuu", "Punoittava kohta jää huomaamatta", "Nopeasti punoittavalla kohdalla kevennä otetta tai ohita alue"],
            ],
          },
        },
      ],
    },
    {
      id: "valta-tai-lopeta",
      title: "Milloin alue ohitetaan ja milloin hieronta lopetetaan",
      blocks: [
        {
          ul: [
            "Huuliherpes, rikkinäinen iho tai auringonpolttama: vältä sitä aluetta.",
            "Juuri tehdyt täyteaineet, laser tai kuorinta: noudata toimenpiteen tekijän ohjeita.",
            "Kirvelevä tai kutiava punoitus hieronnan aikana: lopeta, pyyhi kevyesti ja laita viileä pyyhe, kuten oppitunnilla [Ensiapu kauneushoitolassa](lesson:xu-ly-su-co).",
          ],
        },
        { p: "Tilanteet, joissa hoidosta kieltäydytään jo alussa, on koottu oppitunnille [Milloin asiakasta ei hoideta](lesson:khi-nao-khong-lam)." },
        { note: "Hieronnan säännöt ja ammattinimikkeet vaihtelevat maittain. Artikkeli on koulutusmateriaalia, ei ammattipätevyys.", kind: "warn", title: "Määräykset vaihtelevat maittain" },
      ],
    },
    {
      id: "muistiinpanot",
      title: "Kasvohieronnan jälkeen: muistiinpanot, jotta kuka tahansa voi jatkaa",
      blocks: [
        { p: "Jokaisen hieronnan jälkeen kannattaa kirjata kolme asiaa: käytetty öljy, asiakkaan mieluisa paine ja vältettävät alueet. VaraaAissa ne kirjoitetaan asiakkaan sisäisiin muistiinpanoihin [asiakasrekisterissä](lesson:khach-hang). Seuraavalla kerralla asiakkaan ei tarvitse toistaa toiveitaan, teetpä hoidon sinä tai työkaverisi." },
        { img: { src: img("ghi-chu-noi-bo-sau-khi-massage-mat"), alt: "Kosmetologi istuu pienen kivipöydän ääressä ikkunan vieressä ja kirjoittaa muistiinpanoja tablettiin, taustalla tyhjä hoitopöytä", caption: "Kirjaa muistiinpanot heti asiakkaan lähdettyä, kun asiat ovat vielä tuoreessa muistissa." } },
        { p: "Jos hoitolasi myy kasvohierontaa omana palvelunaan tai osana kasvohoitopakettia, [lisää palvelu](lesson:dich-vu) juuri hoito-ohjelmasi kestolla, niin asiakkaat voivat varata sen itse netissä." },
      ],
    },
  ],
  howTo: {
    title: "Kasvohieronnan vaiheet järjestyksessä",
    id: "kasvohieronnan-vaiheet",
    after: "hieronnan-jarjestys",
    lead: "Kaksitoista vaihetta etenevät oppitunnin videon järjestyksessä puhtaalla, meikittömällä iholla.",
    supplies: [
      "Asiakkaan esitietolomake",
      "Kasvohierontaöljy tai -voide pumppupullossa",
      "Puhtaat pyyhkeet, peitto, otsapanta ja lakanat asiakkaalle",
      "Korkeussäädettävä jakkara hoitopöydän päädyssä",
      "Kasvosienet ja lämmintä vettä, jos hieronnan jälkeen tulee naamio",
    ],
    steps: [
      {
        name: "Kysy asiakkaalta ja valmistele kätesi",
        text: "Lue esitietolomake uudelleen ja kysy öljy-, pähkinä- ja hajusteallergioista sekä tuoreista täyteainehoidoista, laserista tai kuorinnoista. Jos niitä on, noudata toimenpiteen tekijän ohjeita; vältä huuliherpestä, rikkinäistä ihoa ja auringonpolttamaa. Pyydä asiakasta ottamaan piilolinssit pois. Riisu sormukset ja kello, pese kädet saippualla, kuivaa ne ja hiero ne lämpimiksi, jos ne ovat kylmät.",
      },
      {
        name: "Asettele asiakas ja itsesi oikein",
        text: "Asiakas makaa selällään pyyhkeen ja peiton alla niin, että vain kasvot, kaula ja hartiat ovat näkyvissä; kysy, onko hänellä lämmin ja onko tyyny sopiva. Istu jakkaralle hoitopöydän päätyyn ja säädä se niin, että selkä on suora, hartiat rennot ja ranteet suorat. Sano asiakkaalle etukäteen, että hän voi kertoa, jos paine on liian kova tai liian kevyt.",
      },
      {
        name: "Ota öljyä",
        text: "Pumppaa vähän öljyä kämmenelle ja hiero kädet yhteen, jotta öljy lämpenee. Aloita vähällä ja lisää hieman, jos kädet venyttävät ihoa. Liika öljy jättää kasvot rasvaisiksi ja kädet liukkaiksi, jolloin otetta on vaikea hallita.",
      },
      {
        name: "Ensimmäinen kosketus",
        text: "Laske molemmat kädet kevyesti asiakkaan hartioille ja pidä ne paikallaan muutaman hengityksen ajan, ja paina sitten hartioita kevyesti alas. Tämä kosketus kertoo asiakkaalle, että hieronta on alkanut ja hän voi rentoutua.",
        image: { src: img("cai-cham-dau-tien-hai-tay-dat-len-vai"), alt: "Ylhäältä kuvattuna kosmetologin kädet lepäävät suorina valkoista otsapantaa käyttävän, silmät kiinni makaavan asiakkaan molemmilla hartioilla", caption: "Kädet hartioilla paikallaan muutaman hengityksen ajan ennen kevyttä painallusta alas." },
      },
      {
        name: "Sivele kaulaa ja hartioita",
        text: "Liu'uta kämmeniä kevyesti kaulan sivuilla alas kohti solisluita ja sieltä ulos hartioille. Älä koske kurkun etupuoleen äläkä paina syvälle kaulan sivuille, sillä siellä kulkevat verisuonet ja henkitorvi. Toista muutaman kerran hitaasti ja tasaisesti.",
        image: { src: img("vuot-nhe-hai-ben-co-xuong-xuong-quai-xanh"), alt: "Kosmetologin kämmenet lepäävät kevyesti silmät kiinni makaavan asiakkaan kaulan molemmilla sivuilla, ja sormet osoittavat alas kohti solisluita" },
      },
      {
        name: "Sivele leukalinjaa ja poskia",
        text: "Sivele leuan keskeltä leukalinjaa pitkin korvien eteen. Sivele sitten nenänpielistä poskiluiden alta ohimoille. Kädet liikkuvat symmetrisesti ja tasaisesti, aina ylös ja ulospäin, eikä ihoa koskaan vedetä alas.",
        image: { src: img("vuot-tu-cam-theo-duong-ham-len-tai"), alt: "Kosmetologin kädet kehystävät asiakkaan leuan ja leukalinjan, ja sormet kohtaavat leuan keskellä valmiina sivelemään ylös kohti korvia", caption: "Leuan keskeltä leukalinjaa pitkin korvien eteen." },
      },
      {
        name: "Pienet ympyrät poskilla ja suun ympärys",
        text: "Piirrä keski- ja nimettömän sormen päillä pieniä, kevyitä ympyröitä poskille ja leukalinjaa pitkin niin, että jokainen ympyrä nousee hieman leuasta kohti ohimoita. Aseta sitten keskisormien päät leuan keskelle ja kierrä hyvin kevyesti huulten ympäri nenänpieliin, ja sivele suupielistä ulos kohti korvia. Älä vedä suupieliä äläkä levitä öljyä huulille.",
      },
      {
        name: "Sivele otsaa",
        text: "Aseta kämmenet otsalle ja sivele kulmista hiusrajaan käsi toisensa perään. Sivele sitten otsan keskeltä sivuille ohimoille. Moni jännittää otsaansa väsyneenä tai huolissaan, joten etene tässä hieman hitaammin ja anna asiakkaan hengittää tasaisesti.",
        image: { src: img("vuot-tran-tu-chan-may-len-chan-toc"), alt: "Kosmetologin toinen käsi lepää suorana asiakkaan otsalla ja toinen odottaa jatkamista, asiakas lepää silmät kiinni valkoisen pyyhkeen päällä", caption: "Käsi seuraa toista kulmista hiusrajaan." },
      },
      {
        name: "Liu'uta silmien ympäri nimettömällä sormella",
        text: "Käytä vain nimetöntä sormea ja kevyintä painetta. Liu'uta kulmia pitkin ohimoille ja kierrä sitten hyvin kevyesti silmän alta luuta pitkin kohti nenänvartta. Älä koskaan paina silmäluomia, ja varo, ettei öljyä valu silmiin.",
        image: { src: img("massage-quanh-mat-bang-ngon-ap-ut"), alt: "Kosmetologin sormenpäät lepäävät kevyesti silmät kiinni makaavan asiakkaan molempien kulmien päällä ja osoittavat kohti ohimoita" },
      },
      {
        name: "Painele ja taputa kevyesti, jos iho ei ole herkkä",
        text: "Paina sormenpäillä hitaasti kulmien välistä, sitten poskiluiden alta ja lopuksi ohimoilta; pidä kutakin kohtaa muutama sekunti ja vapauta hitaasti. Kysy, onko paine sopiva. Punoittavalla, herkällä iholla paina hyvin kevyesti tai jätä painelu pois. Jos haluat taputtaa, anna sormenpäiden koskettaa poskia nopeasti ja kevyesti kuin sadepisarat; herkkää ihoa ei taputeta.",
        image: { src: img("an-giu-duoi-go-ma-khi-massage-mat"), alt: "Kosmetologin sormenpäät painavat kevyesti silmät kiinni makaavan naisasiakkaan molempien poskiluiden alta", caption: "Painelu poskiluiden alla: paina hitaasti, pidä muutama sekunti, vapauta hitaasti." },
      },
      {
        name: "Lopeta hieronta",
        text: "Tee pitkiä sivelyjä koko kasvoille leuasta poskille, otsalle ja ulos ohimoille muutaman kerran yhä hitaammin. Päätä kevyeen painaluun ohimoilla ja nosta kädet irti hyvin hitaasti. Jos seuraavaksi tulee naamio, poista ylimääräinen öljy lämpimällä, kostealla sienellä.",
      },
      {
        name: "Kysy asiakkaalta, kirjaa ja siivoa",
        text: "Kysy, miltä asiakkaasta tuntuu ja oliko paine sopiva, ja neuvo häntä ottamaan heti yhteyttä salonkiin, jos punoitus, kirvely tai kutina jatkuu. Kirjaa käytetty öljy, mieluisa paine ja vältettävät alueet. Laita sitten pyyhkeet ja otsapanta kannelliseen pyykkikoriin, pyyhi hoitopöytä ja [pese kädet](lesson:rua-tay-gang-tay).",
      },
    ],
  },
  faq: [
    {
      q: "Kuinka kauan kasvohieronta kestää?",
      a: "Kasvohoidon aikana hieronta kestää yleensä noin kymmenestä kahteenkymmeneen minuuttia hoitolan hoito-ohjelman mukaan. Se tehdään, kun iho on puhdistettu eikä meikkiä ole jäljellä.",
    },
    {
      q: "Mihin suuntaan kasvoja hierotaan?",
      a: "Kasvoilla sivelyt kulkevat ylös ja ulospäin: leuan keskeltä leukalinjaa pitkin korvien eteen, nenänpielistä poskiluiden alta ohimoille ja kulmista hiusrajaan. Ihoa ei vedetä alas eikä hangata edestakaisin. Vain kaulalla kädet liukuvat kevyesti sivuja pitkin alas kohti solisluita.",
    },
    {
      q: "Mistä kasvohieronta aloitetaan?",
      a: "Aloita laskemalla molemmat kädet asiakkaan hartioille ja pitämällä ne paikallaan muutaman hengityksen ajan. Etene sitten järjestyksessä hartiat ja kaula, leukalinja ja posket, suun ympärys, otsa, silmänympärys, painelu ja lopetus. Sarja kulkee alhaalta ylös ja vähiten herkistä alueista silmiin.",
    },
    {
      q: "Montako kertaa kukin kasvohieronnan ote toistetaan?",
      a: "Noin kolmesta kuuteen kertaa otetta kohden ennen kuin siirryt seuraavaan. Se riittää, jotta asiakas ehtii tuntea otteen ja rentoutua. Otetta vaihtaessa toinen käsi pysyy aina asiakkaassa.",
    },
    {
      q: "Miten silmien ympärystä hierotaan vahingoittamatta ihoa?",
      a: "Käytä vain nimetöntä sormea ja kevyintä painetta. Liu'uta kulmia pitkin ohimoille ja kierrä kevyesti silmän alta luuta pitkin kohti nenänvartta. Älä koskaan paina silmäluomia, pidä öljy poissa silmistä ja pyydä piilolinssejä käyttävää asiakasta ottamaan ne ensin pois.",
    },
    {
      q: "Mitä herkän, helposti punoittavan ihon hieronnassa pitää huomioida?",
      a: "Tee vähän otteita kevyimmällä paineella. Painelu tehdään hyvin kevyesti tai jätetään pois, eikä ihoa taputeta. Hieronnan aikana kevennä otetta tai ohita alue, joka punoittaa nopeasti; jos iho kirvelee tai kutisee, lopeta, pyyhi kevyesti ja laita viileä pyyhe.",
    },
  ],
  related: ["spa-massage-mat-hieu-dung", "spa-facial", "spa-massage-body", "spa-soi-da"],
};

export default article;
