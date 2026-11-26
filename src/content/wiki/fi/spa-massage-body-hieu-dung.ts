import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/spa-massage-body-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "mita-on-klassinen-hieronta",
  lesson: "spa-massage-body-hieu-dung",
  category: "spa",
  title: "Mitä on klassinen hieronta? Vartalohieronnan otteet, milloin ei hierota ja vältettävät alueet",
  metaTitle: "Klassinen hieronta: milloin ei hierota, vältettävät alueet",
  metaDescription:
    "Mitä on klassinen hieronta ja mitä otteita siinä käytetään, milloin ei hierota, jalan veritulpan merkit, peittely, paine ja alueet, joita ei koskaan paineta.",
  keyword: "klassinen hieronta",
  keywords: [
    "mitä on klassinen hieronta",
    "vartalohieronta",
    "milloin ei saa hieroa",
    "pitääkö hieronnan sattua",
    "poistaako hieronta kuona-aineita",
    "hieronta ja suonikohjut",
    "riisutaanko hierontaan",
  ],
  excerpt: "Klassinen vartalohieronta on pitkiä sivelyjä, vaivaamista, ympyröitä ja kevyttä taputusta rentoutumiseksi. Hyvä hoitaja pitää asiakkaan turvassa ja peiteltynä ja valitsee oikean paineen.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("chuyen-vien-massage-lung-cho-khach-tai-spa"),
    alt: "Kermanvärisessä työasussa oleva hoitaja lepuuttaa molempia käsiään vatsallaan makaavan naisasiakkaan selällä, valkoinen pyyhe peittää vyötäröstä alaspäin, huoneessa kaari-ikkunat",
  },
  takeaways: [
    "Klassinen vartalohieronta koostuu pitkistä sivelyistä, vaivaamisesta, pienistä ympyröistä ja kevyestä taputuksesta. Sen tarkoitus on **rentoutus**, ei vammojen hoito.",
    "Toinen pohje tai reisi turvonnut, kipeä, lämmin ja punoittava: **sitä ei koskaan hierota**, ja asiakas ohjataan lääkäriin samana päivänä.",
    "Peitteestä paljastetaan vain hierottava alue, ja se peitetään heti, kun alue on valmis. Rintoja, intiimialuetta ja pakaroita ei koskaan paljasteta eikä kosketa.",
    "Raajoissa pitkät sivelyt kulkevat sydäntä kohti. Selkärankaa ei paineta; polvitaive, kainalo, kaulan etuosa ja nivunen jätetään rauhaan.",
    "Paineen on tunnuttava miellyttävältä, ehkä hieman kireältä, ei koskaan kivuliaalta. Kipu ei kerro tehosta.",
  ],
  intro: [
    "Klassinen hieronta on hoitoloiden tavallisin vartalohieronta: pitkiä sivelyjä, vaivaamista, ympyröitä ja kevyttä taputusta selkään, hartioihin, jalkoihin ja käsiin, jotta asiakas rentoutuu. Taitavat kädet ovat kuitenkin vain puolet työstä. Toinen puoli on asiakkaan turvallisuus, hänen yksityisyytensä suojaaminen ja täsmälleen oikean paineen valinta.",
    "Artikkeli seuraa VaraaAi Academyn Spa ja ihonhoito -kurssin oppituntia ”Vartalohieronnan perusteet: ymmärrä se, niin asiakas tuntee olonsa turvalliseksi”, joka on aiheen teoriaosa. Luettuasi tiedät, milloin hoidosta kieltäydytään, miten asiakas peitellään, missä kutakin otetta käytetään ja mitä alueita ei koskaan paineta. Kokonainen hieronta vaihe vaiheelta on artikkelissa [Rentouttava vartalohieronta vaihe vaiheelta](lesson:spa-massage-body).",
  ],
  sections: [
    {
      id: "klassinen-hieronta",
      title: "Mitä klassinen vartalohieronta on",
      blocks: [
        { p: "Klassisessa hieronnassa on neljä otetyyppiä: pitkät sivelyt, vaivaaminen, pienet ympyrät ja kevyt taputus. Hoidosta riippuen käynti kestää puolesta tunnista puoleentoista tuntiin. Artikkeli käsittelee hoitolan rentouttavaa hierontaa. Se ei opeta vammojen hoitoa, eikä hoitolan hoitaja tee diagnooseja." },
        { note: "Hieronnan säännöt ja ammattinimikkeet vaihtelevat maittain. Joissakin maissa hierojan nimike on lailla suojattu, ja vain pätevöitynyt saa käyttää sitä tai tarjota terapeuttista hierontaa. Selvitä omaa työtäsi koskevat säännöt. Artikkeli on koulutusmateriaalia, ei ammattipätevyys.", kind: "warn", title: "Säännöt vaihtelevat maittain" },
        { p: "Koska tarkoitus on rentoutus, hieronnan mittari on se, pystyykö asiakas päästämään irti. Se riippuu kolmesta asiasta, jotka artikkeli käy läpi: onko hän turvassa, tunteeko hän itsensä peitellyksi ja kunnioitetuksi, ja onko paine sopiva." },
      ],
    },
    {
      id: "mahdollinen-veritulppa",
      title: "Toinen pohje turvonnut, kipeä ja lämmin: sitä ei koskaan hierota",
      blocks: [
        { p: "Yksi tilanne jokaisen hierontaa tekevän on tunnistettava. Asiakas valittaa pohkeen kipua ja pyytää puristamaan sitä kunnolla, jotta se helpottaisi. Tarkemmin katsottuna vain toinen pohje on turvonnut ja punoittava, ja se tuntuu lämpimältä. Se voi olla merkki laskimotukoksesta eli veritulpasta." },
        {
          ul: [
            "Toinen pohje tai reisi on turvonnut, kipeä, lämmin, punoittava tai tummunut: ei hierontaa, ei edes kevyttä.",
            "Neuvo asiakasta menemään lääkäriin samana päivänä.",
            "Hengenahdistus tai rintakipu: soita heti 112 tai paikalliseen hätänumeroon.",
          ],
        },
        { p: "Sinun ei tarvitse eikä pidä päätellä, mikä asiakkaalla on. Tehtäväsi on kuvailla näkemääsi ja ohjata hänet lääkäriin. Jalan veritulpan merkit on kuvattu brittiläisen [NHS:n laskimotukosta käsittelevällä sivulla](https://www.nhs.uk/conditions/deep-vein-thrombosis-dvt/), johon oppitunti viittaa." },
      ],
    },
    {
      id: "milloin-ei-hierota",
      title: "Milloin ei hierota: vartalohieronnan vasta-aiheet",
      blocks: [
        { p: "Tämän tilanteen lisäksi esitietolomake ja muutama kysymys alussa auttavat sijoittamaan asiakkaan johonkin seuraavista ryhmistä." },
        {
          table: {
            head: ["Asiakkaalla on", "Mitä tehdään"],
            rows: [
              ["Kuumetta, flunssa, huono olo tai hän on juonut alkoholia", "Aika siirretään"],
              ["Tarttuva ihosairaus, tulehdus, avohaava, auringonpolttama", "Sitä aluetta ei hierota"],
              ["Tuore vamma: nyrjähdys, mustelma, turvotus", "Alue jätetään kokonaan pois"],
              ["Tuore leikkaus", "Odotetaan lääkärin lupaa"],
              ["Suonikohjuja jaloissa", "Niitä ei koskaan paineta"],
              ["Hoitamaton sairaus: korkea verenpaine, sydänsairaus, tunnottomuutta aiheuttava diabetes, syöpähoidot", "Neuvo kysymään ensin lääkäriltä"],
              ["Verenohennuslääkitys", "Mustelmia syntyy hyvin helposti: hyvin kevyt paine ja kysymys lääkärille"],
              ["Raskaus", "Vaatii erikseen koulutetun hoitajan ja oman asennon. Ei perustasolla"],
            ],
          },
        },
        { img: { src: img("tinh-mach-gian-o-bap-chan-khong-an-len"), alt: "Lähikuva vatsallaan hoitopöydällä makaavan naisen pohkeen takaosasta, jossa ihon alla näkyy selvästi sinivioletteja suonikohjuja", caption: "Suonikohjut jaloissa: niitä ei koskaan paineta." } },
        { img: { src: img("lung-chay-nang-khong-massage-body"), alt: "Naisasiakas makaa vatsallaan hoitopöydällä, selkä ja hartiat ovat auringon polttamat ja niissä näkyvät olkaimien jäljet, hoitaja seisoo vieressä koskematta", caption: "Auringon polttama iho: sitä aluetta ei hierota." } },
        { p: "Esitietolomakkeessa kysytään myös öljystä. Moni hierontaöljy on pähkinäpohjainen, kuten manteliöljy, joten kysy asiakkaalta pähkinäallergiasta sekä hajusteista ja eteerisistä öljyistä. Tilanteet, joissa mistä tahansa palvelusta kieltäydytään, käydään läpi oppitunnilla [Milloin asiakasta ei hoideta](lesson:khi-nao-khong-lam)." },
      ],
    },
    {
      id: "peittely-ja-yksityisyys",
      title: "Riisutaanko hierontaan? Peittely ja asiakkaan yksityisyys",
      blocks: [
        { p: "Moni epäröi varata vartalohierontaa, koska ei tiedä, kuinka paljon pitää riisuutua ja miten hänet peitellään. Oikea peittely vastaa tähän huoleen, ja oppitunti kutsuu sitä kaikkein tärkeimmäksi osaksi." },
        {
          ul: [
            "Asiakas riisuutuu yksin. Hoitaja poistuu huoneesta ja koputtaa ennen kuin palaa.",
            "Asiakas saa pitää alusvaatteet päällä.",
            "Asiakas makaa ison pyyhkeen tai lakanan alla. Vain hierottava alue paljastetaan, ja se peitetään heti, kun alue on valmis.",
            "Reunat taitetaan siististi ja tuetaan tukevasti, jotta asiakas tuntee olonsa turvalliseksi.",
            "Rintoja, intiimialuetta ja pakaroita ei koskaan paljasteta eikä kosketa.",
            "Kun asiakas kääntyy, peite pysyy hänen päällään.",
          ],
        },
        { img: { src: img("gap-khan-phu-ngang-eo-khi-massage-lung"), alt: "Hoitaja taittaa ison valkoisen pyyhkeen reunan vatsallaan makaavan asiakkaan vyötärölle niin, että vain selkä jää paljaaksi, ja asiakkaan kasvot lepäävät kasvoaukossa", caption: "Kun hierotaan selkää, vain selkä on paljaana: pyyhe taitetaan vyötärölle ja tuetaan sivuilta." } },
        { p: "Esitietolomakkeessa kysytään myös, onko alueita, joita asiakas ei halua hierottavan. Asiakas voi kieltäytyä mistä tahansa alueesta ja keskeyttää hieronnan milloin tahansa." },
        { note: "Sano ennen uudelle alueelle siirtymistä lyhyt lause, kuten ”Nyt hieron jalkoja”. Asiakas ei ylläty, ja hän tuntee itsensä aina kunnioitetuksi.", kind: "tip", title: "Ammattilaisen vinkki" },
        { img: { src: img("giu-khan-che-khi-khach-tro-minh"), alt: "Hoitaja seisoo hoitopöydän vieressä ja nostaa ison valkoisen pyyhkeen toista reunaa, jotta asiakas voi kääntyä sen alla pysyen koko ajan peitettynä", caption: "Kääntyminen: pyyhettä nostetaan juuri sen verran, että asiakas kääntyy sen alla." } },
      ],
    },
    {
      id: "otteet-suunta-alueet",
      title: "Pääotteet, sivelyjen suunta ja vältettävät alueet",
      blocks: [
        {
          table: {
            head: ["Ote", "Miten", "Missä ja milloin"],
            rows: [
              ["Pitkä sively", "Koko kämmen liukuu pitkästi", "Aloitus, lihasten lämmitys ja otteiden yhdistäminen"],
              ["Vaivaaminen", "Lihasta nostetaan kevyesti peukalon ja sormien välissä kuin taikinaa vaivaten", "Paksut lihakset, kuten hartiat ja pohkeet"],
              ["Pienet ympyrät", "Pieniä ympyröitä peukalolla", "Jännittyneet kohdat"],
              ["Kevyt taputus", "Nopea, kämmenen syrjällä tai kupitetulla kämmenellä", "Alueen lopetus"],
            ],
          },
        },
        { img: { src: img("vuot-dai-doc-lung-bang-long-ban-tay"), alt: "Hoitaja kurottaa käsiään eteenpäin, ja molemmat kämmenet liukuvat vatsallaan makaavan asiakkaan selkää pitkin, valkoinen pyyhe peittää vyötäröstä alaspäin", caption: "Pitkät sivelyt koko kämmenellä aloittavat hieronnan ja lämmittävät lihakset." } },
        { h3: "Suunta ja kohdat, joita ei paineta" },
        {
          ul: [
            "**Kädet ja jalat:** pitkät sivelyt kulkevat sydäntä kohti, nilkasta polveen ja ranteesta kyynärpäähän.",
            "**Selkäranka:** sitä ei paineta, vaan työskennellään sen vierestä.",
            "**Alaselkä munuaisten kohdalla:** kevyesti.",
            "**Polvitaive, kainalo, kaulan etuosa ja nivunen:** vältetään, koska niissä verisuonet ja hermot ovat lähellä pintaa.",
          ],
        },
      ],
    },
    {
      id: "paine-ja-tyoasento",
      title: "Pitääkö hieronnan sattua? Paine ja hoitajan työasento",
      blocks: [
        { p: "Hieronnan pitää tuntua hyvältä. Asiakas voi tuntea hieman kireyttä, mutta ei kipua, eikä hieronnan tarvitse sattua toimiakseen. Kysy asiakkaalta alussa, muutaman minuutin päästä ja aluetta vaihtaessa. Seuraa samalla: jännittyminen, pidätetty hengitys tai ylös vedetyt jalat kertovat, että paine on liian kova." },
        { p: "Kun kohdalle osuu jännittynyt lihas, uuden tekijän refleksi on painaa kovempaa. Oikea tapa on päinvastainen: mitä kireämpi lihas, sitä hitaammin edetään." },
        { h3: "Työasento ratkaisee, kuinka kauan jaksat tehdä työtä" },
        {
          ul: [
            "Säädä hoitopöydän korkeus niin, ettei sinun tarvitse kumartua.",
            "Seiso toinen jalka edessä ja toinen takana, polvet joustavina ja selkä suorana.",
            "Paine tulee kehon painosta jaloista työntäen, ei hartioita ja ranteita jännittämällä.",
            "Jos haluat ulottua kauemmas, astu lähemmäs äläkä kurota.",
          ],
        },
        { img: { src: img("tu-the-dung-mot-chan-truoc-khi-massage-body"), alt: "Hoitaja seisoo toinen jalka edessä ja toinen takana, selkä suorana, ja hänen molemmat kätensä ovat vatsallaan hoitopöydällä makaavan asiakkaan selällä", caption: "Toinen jalka edessä, toinen takana ja selkä suorana: paine nousee jaloista." } },
      ],
    },
    {
      id: "jarjestys-ja-jalkiohjeet",
      title: "Hieronnan järjestys, hygienia ja jälkiohjeet",
      blocks: [
        { p: "Tavallinen järjestys: asiakas makaa ensin vatsallaan, ja hierotaan selkä, hartiat, niska ja jalkojen takaosat. Sitten hän kääntyy selälleen, ja vuorossa ovat jalkojen etuosat, kädet sekä lopuksi hartiat ja niska. Jokaisella hoitolalla on oma järjestyksensä oman hoito-ohjelmansa mukaan." },
        { p: "Hygieniaan kuuluvat käsienpesu ennen jokaista asiakasta ja jälkeen, puhtaat lakanat, pyyhkeet ja kasvoaukon suojus jokaiselle asiakkaalle sekä hoitopöydän pyyhintä ja desinfiointi. Katso myös oppitunti [Käsihygienia ja käsineet](lesson:rua-tay-gang-tay)." },
        { h3: "Kerro asiakkaalle totuus hieronnan jälkeen" },
        { p: "Kun hieronta päättyy, auta asiakas istumaan hitaasti, sillä nopea nousu pitkän makaamisen jälkeen voi huimata. Tarjoa lasillinen vettä. Älä kerro asiakkaalle, että hieronta poistaa kuona-aineita. Kerro totuus: hieronta rentouttaa ja tuntuu hyvältä, ja napakamman paineen jälkeen seuraavana päivänä voi tuntua lievää arkuutta." },
        { img: { src: img("moi-khach-ly-nuoc-sau-khi-massage-body"), alt: "Valkoiseen kylpytakkiin pukeutunut naisasiakas istuu hoitopöydän reunalla ja ottaa vesilasin hymyilevältä hoitajalta" } },
        { p: "VaraaAissa merkitset asiakkaan sisäisiin muistiinpanoihin [asiakasrekisterissä](lesson:khach-hang) mieluisan paineen, vältettävät alueet ja käytetyn öljyn. Kun [lisäät hieronnan palveluksi](lesson:dich-vu) ajanvaraussivullesi, aseta kestoksi oman hoito-ohjelmasi mukainen aika." },
      ],
    },
  ],
  faq: [
    {
      q: "Mitä on klassinen hieronta?",
      a: "Klassinen hieronta on hoitoloiden tavallisin vartalohieronta: pitkiä sivelyjä, vaivaamista, pieniä ympyröitä ja kevyttä taputusta selkään, hartioihin, jalkoihin ja käsiin rentoutumista varten. Käynti kestää hoidosta riippuen puolesta tunnista puoleentoista tuntiin. Kyse on rentouttavasta hieronnasta, ei vammojen hoidosta.",
    },
    {
      q: "Pitääkö hieronnan sattua, jotta se toimii?",
      a: "Ei pidä. Hieronnan pitää tuntua hyvältä, ehkä hieman kireältä, mutta ei koskaan kivuliaalta. Jos asiakas jännittyy, pidättää hengitystä tai vetää jalkojaan ylös, paine on liian kova. Jännittyneessä lihaksessa hoitaja hidastaa eikä paina kovempaa.",
    },
    {
      q: "Milloin hierontaan ei pidä mennä?",
      a: "Aika kannattaa siirtää kuumeen, flunssan, huonon olon tai alkoholin vuoksi. Tarttuvaa ihosairautta, tulehdusta, avohaavaa, auringonpolttamaa tai tuoretta vammaa ei hierota, eikä suonikohjuja paineta. Tuoreen leikkauksen jälkeen odotetaan lääkärin lupaa; hoitamattoman sairauden tai verenohennuslääkityksen kanssa kysytään ensin lääkäriltä.",
    },
    {
      q: "Saako toisen puolen turvonnutta, kipeää ja lämmintä pohjetta hieroa?",
      a: "Ei koskaan. Turvonnut, kipeä, lämmin, punoittava tai tummunut pohje tai reisi toisella puolella voi olla merkki laskimotukoksesta. Lääkäriin pitää mennä samana päivänä. Jos samalla on hengenahdistusta tai rintakipua, soita 112 tai paikalliseen hätänumeroon.",
    },
    {
      q: "Pitääkö vartalohierontaan riisuutua kokonaan?",
      a: "Asiakas riisuutuu yksin ja saa pitää alusvaatteet päällä. Koko hieronnan ajan hän makaa ison pyyhkeen tai lakanan alla; hoitaja paljastaa vain hierottavan alueen ja peittää sen heti uudelleen. Rintoja, intiimialuetta ja pakaroita ei koskaan paljasteta eikä kosketa, ja asiakas voi kieltäytyä mistä tahansa alueesta.",
    },
    {
      q: "Poistaako hieronta kuona-aineita? Onko normaalia, että seuraavana päivänä on arka olo?",
      a: "Hoitolan hoitajan ei pidä väittää, että hieronta poistaa kuona-aineita. Hieronta rentouttaa ja tuntuu hyvältä. Napakan paineen jälkeen seuraavana päivänä voi tuntua lievää arkuutta. Voimakkaasta kivusta tai mustelmista kannattaa kertoa hoitolaan.",
    },
  ],
  related: ["spa-massage-body", "spa-massage-mat-hieu-dung", "khi-nao-khong-lam", "xu-ly-su-co"],
};

export default article;
