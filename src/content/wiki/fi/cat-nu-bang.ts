import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cat-nu-bang/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "polkkatukan-leikkaus-vaihe-vaiheelta",
  lesson: "cat-nu-bang",
  category: "hair",
  title: "Polkkatukan leikkaus vaihe vaiheelta: 10 vaihetta suoraan ja tasapainoiseen leuan mittaiseen linjaan",
  metaTitle: "Polkkatukan leikkaus: 10 vaihetta niskasta etuhiuksiin",
  metaDescription:
    "Polkkatukan leikkaus vaihe vaiheelta: kosketuskohta, jakaminen, niskan ohjauslinja nostokulmalla 0°, takaosan kerrokset, sivut ja korvat sekä tarkistus kuivana.",
  keyword: "polkkatukan leikkaus",
  keywords: [
    "tasapitkän leikkauksen ohje",
    "hiusten leikkaus suoraksi",
    "leuan mittainen polkka",
    "olkapäille ulottuvien hiusten leikkaus",
    "polkan leikkaus vaihe vaiheelta",
    "pitkistä hiuksista polkka",
    "kuinka usein polkka tasataan",
  ],
  excerpt: "Pitkät hiukset leuan mittaiseksi suoraksi polkaksi kymmenessä vaiheessa: ohjauslinja niskaan, ohuet kerrokset suoraan alas, sivut ja lopuksi tarkistus kuivana.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-toc-va-khach-voi-kieu-bob-bang-vua-cat"),
    alt: "Kermanvärisessä silkkipuserossa oleva kampaaja seisoo vaalean asiakkaan takana, jolla on juuri leikattu leuan mittainen suora polkka, ja molemmat hymyilevät pariisilaistyylisessä salongissa",
  },
  takeaways: [
    "Lyö pituus lukkoon **kosketuskohdalla** hiusten ollessa vielä kuivat: taita suortuva leuan kohdalle ja toista pituus asiakkaalle.",
    "Ohjauslinja on yksi hyvin ohut vaakasuora suortuva niskassa, kammattuna suoraan alas **nostokulmalla 0°** ja hyvin kevyellä vedolla.",
    "Jokainen seuraava kerros kammataan ohjauslinjan päälle ja leikataan täsmälleen siihen. Takaraivon kohdalla pienikin nosto tekee kerroksia.",
    "Niskaa leikatessa leuka hieman alas; ennen sivuja asiakas **nostaa pään suoraan**, istuu suorassa ja avaa jalat rististä.",
    "Föönaa ja tarkista uudelleen, koska vasta silloin hiukset asettuvat niin kuin asiakas näkee ne kotona.",
  ],
  intro: [
    "Polkkatukan leikkaus ei vaadi yhtään vaikeaa saksenliikettä. Vaikeinta on saada kymmenet eri hetkinä leikatut suortuvat pysähtymään samaan suoraan linjaan. Siksi kampaaja tekee niskaan ohjauslinjan ja tuo jokaisen kerroksen täsmälleen siihen, nostamatta ja vetämättä.",
    "Artikkeli seuraa VaraaAi Academyn Hiukset-kurssin oppitunnin ”Tasapituinen leikkaus ja polkka: käytäntö vaihe vaiheelta” työjärjestystä, jossa pitkät hiukset leikataan leuan mittaiseksi suoraksi polkaksi. Ohjetta seuraamalla leikkaat koko mallin ja tarkistat linjan itse kaikilta kolmelta suunnalta. Miksi nostokulman on oltava 0° ja miksi asiakkaan on istuttava suorassa, kerrotaan teoria-artikkelissa [mikä on polkkatukka](lesson:cat-nu-bang-hieu-dung).",
  ],
  sections: [
    {
      id: "ennen-leikkausta",
      title: "Ennen kuin pitkistä hiuksista tehdään polkka",
      blocks: [
        { p: "Kun pitkistä hiuksista tehdään polkka, pituutta lähtee paljon, ja kolmesta asiasta kannattaa päättää ennen kuin otat sakset käteen." },
        {
          ul: [
            "**Ylimääräinen pituus ensin pois.** Moni kampaaja leikkaa ensin osan pitkistä latvoista ja jättää hiukset muutaman sentin polkkalinjaa pidemmiksi, jotta niitä on helpompi käsitellä. Tämä ei ole vielä varsinainen linja.",
            "**Haluaako asiakas hiuksensa talteen.** Jos haluaa, kysy ennen pesua, sido hiukset poninhännälle ja leikkaa ne vielä kuivina.",
            "**Kiharat tai laineikkaat hiukset.** Kerro asiakkaalle etukäteen, että kuivina hiukset nousevat, joten jätät ne vähän pidemmiksi.",
          ],
        },
        { p: "Konsultaatio ja jakaminen tehdään kuten artikkeleissa [konsultaatio ennen hiustenleikkausta](lesson:toc-tu-van-chia-vung-hieu-dung) ja [hiusten jakaminen osioihin](lesson:toc-tu-van-chia-vung)." },
      ],
    },
    {
      id: "ohuet-suortuvat-kostea-hius",
      title: "Ohuet suortuvat ja tasaisen kostea hius: tasapitkän leikkauksen kaksi ehtoa",
      blocks: [
        { p: "Tasapitkä linja perustuu kokonaan siihen, että näet ohjauslinjan pitelemiesi hiusten alta. Siksi osiot kiinnitetään siististi ja tasaisesti päätä vasten, ja alas päästetään aina vain yksi ohut vaakasuora suortuva kerrallaan." },
        { img: { src: img("chia-vung-toc-kep-gon-truoc-khi-cat-bob"), alt: "Takaa kuvattuna asiakkaan kosteat vaaleat hiukset on jaettu suorilla jakauksilla, ja jokainen osio on kiinnitetty siististi hopeisilla klipseillä", caption: "Siististi kiinnitetyt osiot ja suorat jakaukset. Niskan alimmat hiukset päästetään alas ensin." } },
        { img: { src: img("tha-lon-ngang-mong-o-gay-de-cat-duong-chuan"), alt: "Kampaaja seisoo asiakkaan vieressä, jonka hiukset on kiinnitetty päälaelle, ja kampaa mustalla kammalla ohuen niskan kerroksen suoraan alas kaulaa vasten", caption: "Yksi ohut vaakasuora suortuva niskassa suoraan alas kammattuna, kaikki muu klipseissä." } },
        { p: "Takaosan kerrokset ovat noin sentin tai kahden paksuisia. Paksuissa hiuksissa ota vielä ohuempia kerroksia. Hiusten tarvitsee olla vain tasaisen kosteat, ei valuvan märät. Kun ne kuivuvat työn aikana, suihkuta uudelleen, jotta jokainen kerros on terän kohdatessa yhtä kostea." },
      ],
    },
    {
      id: "kolme-yleista-virhetta",
      title: "Kolme yleistä virhettä polkan leikkauksessa",
      blocks: [
        {
          table: {
            head: ["Virhe", "Seuraus", "Miten vältät"],
            rows: [
              ["Hiuksia nostetaan huomaamatta, varsinkin takaraivon kohdalla", "Linjaan tulee kerroksia ja latvat menettävät painonsa", "Kampaa todella suoraan alas, lähelle alempaa kerrosta"],
              ["Hiukset vedetään kireälle korvan yli", "Irti päästettynä ne hyppäävät ylös, ja korvan yläpuolelle jää lovi", "Pidä korvan kohdalla hyvin kevyesti ja anna laskeutua luonnollisesti"],
              ["Pää on kallellaan tai asiakas istuu jalat ristissä", "Puolet jäävät epätasaisiksi etkä huomaa sitä", "Asiakas istuu suorassa, pää suoraan ennen sivuja ja ennen vertailua"],
            ],
          },
        },
        { p: "Kaikki kolme vältetään samoilla tavoilla: ohuet suortuvat, kevyet kädet ja usein peiliin katsominen." },
      ],
    },
    {
      id: "tasaus-kuivana",
      title: "Tasaus kuivana: törröttävät hiukset ja pistoleikkaus",
      blocks: [
        { p: "Hiukset nousevat kuivuessaan ja asettuvat todelliseen laskuunsa. Linjasta törröttävät hiukset näkyvät selvästi vasta nyt. Kampaa hiukset suoraan alas, katso linjaa uudelleen ja leikkaa harhailevat hiukset yksi kerrallaan saksien kärjillä." },
        { img: { src: img("tia-soi-toc-loi-ra-khi-toc-bob-da-kho"), alt: "Kampaaja kampaa toisessa kädessä olevalla mustalla kammalla asiakkaan kuivan polkan latvat suoraan alas ja tuo sakset toisella kädellä linjan viereen", caption: "Kuivat hiukset: kampaa suoraan alas ja leikkaa vain linjasta törröttävät hiukset." } },
        { p: "Pistoleikkaus latvoihin on eri asia, ja sitä tehdään vain, jos asiakas haluaa pehmeämmät latvat. Silloin pistoleikkaat latvoja hyvin kevyesti. Jos hän pitää terävästä polkasta, pidä linja suorana." },
      ],
    },
    {
      id: "turvallisuus-ja-hygienia",
      title: "Turvallisuus ja hygienia kaulan lähellä leikatessa",
      blocks: [
        { note: "Sormesi ovat aina terän ja asiakkaan ihon välissä, varsinkin kun leikkaat ohjauslinjaa lähellä kaulaa. Leikkaa vain asiakkaan kanssa sovittuun pituuteen. Sakset, kammat ja klipsit puhdistetaan ja desinfioidaan jokaisen asiakkaan jälkeen tuotteen ohjeen mukaan, ja kaulapaperit ovat kertakäyttöisiä. Määräykset vaihtelevat maittain; katso myös [välineiden puhdistus ja desinfiointi](lesson:ve-sinh-dung-cu).", kind: "warn", title: "Älä ohita" },
        { p: "Polkkamallien nimitykset ja opetustavat vaihtelevat kouluittain ja maittain. Artikkeli on harjoitusmateriaalia eikä korvaa ammatillista tutkintoa." },
      ],
    },
    {
      id: "tasauksen-varaus",
      title: "Kuinka usein polkka tasataan ja mitä asiakastietoihin kirjataan",
      blocks: [
        { p: "Moni asiakas palaa tasaukseen noin 6–8 viikon kuluttua, jotta linja säilyy. Se on yleinen tapa, ei sääntö. Ennen kuin asiakas lähtee, näytä hänelle föönaus kotona: hiusten laskeutumissuuntaan ja latvat kevyesti sisäänpäin kääntäen." },
        { p: "Kirjaa VaraaAissa leikattu pituus ja kosketuskohta asiakkaan muistiinpanoihin [asiakastiedoissa](lesson:khach-hang), jotta seuraava leikkaaja osuu oikeaan. Kun asiakas maksaa, ehdota seuraavan tasauksen varaamista heti [ajanvarauskalenteriin](lesson:lich-hen). Jos salonki hinnoittelee uuden leikkauksen ja tasauksen erikseen, anna kummallekin oma kesto [palveluvalikoimassa](lesson:dich-vu)." },
      ],
    },
  ],
  howTo: {
    title: "Leuan mittaisen polkkatukan leikkaus: työvaiheet",
    id: "polkan-leikkauksen-vaiheet",
    after: "ennen-leikkausta",
    lead: "Kymmenen vaihetta oppitunnin videon järjestyksessä: ensin takaosa, sitten sivut, ja kaksi tarkistusta, toinen märkänä ja toinen kuivana.",
    supplies: [
      "Leikkuusakset, leikkuukampa ja hännällinen kampa puhdistettuina ja desinfioituina",
      "Jakoklipsit",
      "Sumutepullo ja pyyhe",
      "Hiustenkuivaaja ja pyöröharja",
      "Kertakäyttöinen kaulapaperi ja leikkuuviitta",
      "Käsipeili",
    ],
    steps: [
      {
        name: "Pese kädet ja kiedo kaulapaperi",
        text: "Pese kädet ja tarkista, että sakset, kammat ja klipsit on puhdistettu ja desinfioitu edellisen asiakkaan jälkeen. Kiedo kertakäyttöinen kaulapaperi asiakkaan kaulan ympäri ja kiinnitä leikkuuviitta vasta sen päälle.",
        image: { src: img("quan-giay-co-truoc-khi-cat-toc-bob"), alt: "Kampaaja kiinnittää mustan leikkuuviitan vaalean asiakkaan kaulan ympäri, ja kauluksen sisällä kulkee valkoinen kaulapaperi tiiviisti kaulaa vasten" },
      },
      {
        name: "Konsultoi ja sovi kosketuskohta",
        text: "Konsultoi hiusten ollessa kuivat: katso mallikuvaa ja kysy, laittaako asiakas hiuksia kiinni tai korvien taakse. Taita suortuva leuan kohdalle ja toista pituus asiakkaalle. Etsi niskan hiusrajasta pyörteet ja katso kaula ja hartiat.",
      },
      {
        name: "Pese, selvitä ja pidä hiukset tasaisen kosteina",
        text: "Pese, kuivaa pyyhkeellä painellen ja selvitä takut latvoista alkaen. Hiusten tarvitsee olla vain tasaisen kosteat, ei valuvan märät. Jos hiukset ovat hyvin pitkät, leikkaa ylimääräinen pituus ensin ja jätä ne muutaman sentin polkkalinjaa pidemmiksi.",
      },
      {
        name: "Tee keskijakaus ja jaa osiot",
        text: "Tee keskijakaus otsan hiusrajasta päälakeen, jaa sitten osiot ja kiinnitä jokainen siististi ja tasaisesti päätä vasten. Päästä takaa alas yksi hyvin ohut vaakasuora suortuva niskasta ja kiinnitä kaikki muu ylös.",
        image: { src: img("re-ngoi-giua-bang-duoi-luoc-truoc-khi-chia-vung"), alt: "Ylhäältä kuvattuna kampaaja vetää kamman terävällä hännällä keskijakauksen asiakkaan kosteisiin vaaleisiin hiuksiin", caption: "Keskijakaus kamman hännällä otsan hiusrajasta päälakeen." },
      },
      {
        name: "Leikkaa ohjauslinja niskaan",
        text: "Pyydä asiakasta kallistamaan päätä hieman eteenpäin, leuka vähän alas, ja pysymään paikallaan. Kampaa suortuva suoraan alas kaulaa vasten nostokulmalla 0° ja pidä sitä etu- ja keskisormen välissä, sormet vaakatasossa, hyvin kevyellä vedolla. Leikkaa suora vaakalinja juuri sormien alapuolelta, ensin keskeltä ja sitten sivut keskikohdan mukaan. Leuan mittaisessa polkassa niskan linja on yleensä noin kaulan puolivälissä tai alempana sovitun mallin mukaan. Tarkista heti, että molemmat päät ovat samalla tasolla ja linja on lattian suuntainen.",
        image: { src: img("cat-duong-chuan-o-gay-goc-nang-0-do"), alt: "Lähikuva asiakkaan niskasta: kampaajan käsi pitää ohutta suortuvaa kahden sormen välissä tasaisesti kaulaa vasten, ja sakset leikkaavat vaakasuoraan juuri sormien alta", caption: "Sormet vaakatasossa ja hiukset lähellä kaulaa. Terä kulkee sormien suuntaisesti niiden alapuolella." },
      },
      {
        name: "Leikkaa takaosan kerrokset",
        text: "Päästä alas seuraava vaakasuora suortuva ja kampaa se suoraan alas ohjauslinjan päälle. Katso ohuen kerroksen läpi, niin näet ohjauslinjan sen alla, ja leikkaa täsmälleen siihen ilman nostoa ja ilman vetoa. Etene kerros kerrallaan takaraivolle ja sitten päälakeen asiakkaan pitäessä pään samassa asennossa. Takaraivon kohdalla pää kaartuu ulospäin ja hiukset vetäytyvät helposti sen mukana ulos, joten kampaa todella suoraan alas lähelle alempaa kerrosta.",
      },
      {
        name: "Leikkaa sivut",
        text: "Pyydä asiakasta nostamaan pää taas suoraan, istumaan suorassa ja avaamaan jalat rististä. Päästä alas alin vaakasuora suortuva korvan vierestä, kampaa se alas, ota ohjeeksi vähän jo leikattuja hiuksia takaa ja jatka linjaa eteenpäin leukaan asti. Älä vedä hiuksia korvan kohdalla kireälle korvan yli. Etene kerros kerrallaan jakaukseen asti ja tee sitten täsmälleen sama toisella puolella.",
        image: { src: img("cat-hai-ben-toc-bob-ngang-cam"), alt: "Asiakas istuu suorassa profiilissa kosteat vaaleat hiukset suoraan alas kammattuina, ja kampaaja pitää kevyesti sivun kerrosta ja leikkaa vaakasuoraan leuan korkeudelta", caption: "Pää suorassa, sivuhiukset laskeutuvat luonnollisesti ja linja jatkuu takaa eteen." },
      },
      {
        name: "Tarkista sivut ja takaosa",
        text: "Seiso asiakkaan takana ja katso peiliin, asiakkaan pää suorassa ja katse eteenpäin. Pidä latvoja leuan molemmin puolin ja vertaa niiden korkeutta, ja tasaa pidempää puolta vähän kerrallaan. Kampaa hiukset suoraan alas ja katso takaa ja kummaltakin sivulta: linjan on oltava suora, yhtenäinen ja lattian suuntainen. Korvan takana, missä takaosa ja sivut kohtaavat, on usein pieni kulma; leikkaa se kevyesti pois, jotta linja jatkuu sujuvasti.",
        image: { src: img("toc-bob-bang-nhin-nghieng-song-song-voi-san"), alt: "Vaalea asiakas profiilissa pää suorassa, ja tasapitkän leikkauksen latvat muodostavat tasaisen vaakalinjan niskasta eteen", caption: "Profiilissa latvat kulkevat vaakasuoraan lattian suuntaisesti, eikä korvan takana ole porrasta." },
      },
      {
        name: "Föönaa ja tarkista kuivana",
        text: "Kuivaa hiusten laskeutumissuuntaan ylhäältä alas ja käännä latvoja pyöröharjalla kevyesti sisäänpäin. Kun hiukset ovat kuivat, kampaa ne suoraan alas ja katso linjaa uudelleen. Leikkaa törröttävät hiukset saksien kärjillä; jos asiakas haluaa pehmeämmät latvat, pistoleikkaa niitä hyvin kevyesti.",
        image: { src: img("say-toc-bob-bang-luoc-tron-cuon-duoi-vao-trong"), alt: "Kampaaja föönaa mustalla hiustenkuivaajalla ja pyöröharjalla asiakkaan vaaleaa polkkaa, ja latvat kaartuvat kevyesti harjan ympärille" },
      },
      {
        name: "Viimeistele, kirjaa ja siivoa",
        text: "Harjaa irtohiukset pois kaulalta ja näytä asiakkaalle takaosa käsipeilillä. Kysy, haluaako hän muuttaa jotain, ja korjaa se saman tien, näytä sitten, miten hiukset föönataan kotona. Kirjaa leikattu pituus asiakastietoihin. Kun asiakas on lähtenyt, puhdista ja desinfioi sakset, kammat ja klipsit, heitä kaulapaperi pois ja lakaise hiukset tuolin alta.",
      },
    ],
  },
  faq: [
    {
      q: "Mistä polkkatukan leikkaus aloitetaan?",
      a: "Niskasta. Jakamisen jälkeen kampaaja päästää niskasta alas yhden hyvin ohuen vaakasuoran suortuvan, kampaa sen suoraan alas nostokulmalla 0° ja leikkaa suoran vaakalinjan: se on ohjauslinja. Takaosan kerrokset ja sen jälkeen sivut leikataan kaikki täsmälleen siihen.",
    },
    {
      q: "Leikataanko tasapitkä leikkaus märkiin vai kuiviin hiuksiin?",
      a: "Oppitunnin työjärjestyksessä hiukset pestään ja pidetään tasaisen kosteina, eivät valuvan märkinä, ja niitä suihkutetaan uudelleen niiden kuivuessa. Föönauksen jälkeen linja tarkistetaan vielä kerran, koska hiukset nousevat kuivuessaan ja törröttävät hiukset näkyvät selvästi vasta silloin. Kiharat ja laineikkaat hiukset nousevat enemmän, joten ne jätetään vähän pidemmiksi.",
    },
    {
      q: "Eroaako olkapäille ulottuvien hiusten leikkaus leuan mittaisesta polkasta?",
      a: "Tasapitkän leikkauksen tekniikka on sama: ohjauslinja niskassa ja kerrokset suoraan alas nostokulmalla 0° leikattuina täsmälleen siihen. Muuttuu vain asiakkaan kanssa sovittu kosketuskohta. Muista, että juuri olkapäille päättyvä hius osuu niihin ja kääntyy ulos, joten pituus valitaan yleensä olkapäiden yläpuolelta tai selvästi alempaa.",
    },
    {
      q: "Miksi polkan leikkauksen jälkeen korvan yläpuolelle jää lovi?",
      a: "Koska hiukset vedettiin leikatessa kireälle korvan yli. Korva on ulkoneva, joten irti päästettynä hiukset hyppäävät ylös ja jäävät muita lyhyemmiksi. Pidä korvan kohdalla hiuksista hyvin kevyesti ja anna niiden laskeutua luonnollisesti ennen leikkaamista.",
    },
    {
      q: "Entä jos asiakas haluaa pitkät hiuksensa talteen?",
      a: "Kysy ennen pesua. Jos asiakas haluaa ne, sido hiukset poninhännälle ja leikkaa ne vielä kuivina, pese sitten ja leikkaa polkkalinja. Leikkaa poninhäntä muutaman sentin polkkalinjaa pidemmäksi, koska varsinainen linja leikataan vasta sen jälkeen.",
    },
    {
      q: "Kuinka usein polkka pitää tasata?",
      a: "Moni asiakas palaa tasaukseen noin 6–8 viikon kuluttua, jotta linja säilyy. Se on yleinen tapa eikä sääntö, ja riippuu siitä, kuinka terävänä kukin haluaa polkkalinjansa pitää.",
    },
  ],
  related: ["cat-nu-bang-hieu-dung", "toc-tu-van-chia-vung", "cat-nu-tang", "say-tao-kieu"],
};

export default article;
