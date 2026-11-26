import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/spa-facial/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "kasvohoito-vaihe-vaiheelta",
  lesson: "spa-facial",
  category: "spa",
  title: "Kasvohoito vaihe vaiheelta: peruskasvohoidon 14 työvaihetta meikinpoistosta aurinkosuojaan",
  metaTitle: "Kasvohoito vaihe vaiheelta: 14 työvaihetta hoitolassa",
  metaDescription:
    "Kasvohoito vaihe vaiheelta: hoitopöytä ja vaunu, silmämeikin poisto, toinen puhdistus, ihon arvio, kuorinta, lämmin pyyhe, naamio, voide, ohjeet ja siivous.",
  keyword: "kasvohoito vaihe vaiheelta",
  keywords: [
    "peruskasvohoidon työvaiheet",
    "kasvohoito ohje",
    "kasvohoidon järjestys",
    "silmämeikin poisto kasvohoidossa",
    "kasvonaamion levitys",
    "mitä ei saa tehdä kasvohoidon jälkeen",
  ],
  excerpt: "Peruskasvohoito alusta loppuun: neljätoista työvaihetta hoitopöydän pyyhkimisestä asiakaskortin kirjaukseen sekä kohdat, joissa edetään kevyesti, jätetään vaihe pois tai lopetetaan.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("chuyen-vien-dap-mat-na-cham-soc-da-mat-tai-spa"),
    alt: "Kermanvärisessä työasussa oleva kosmetologi pitelee kulhoa ja sivellintä ja levittää naamiota vanulapuin peitetyin silmin makaavalle asiakkaalle kaari-ikkunaisessa hoitohuoneessa",
  },
  takeaways: [
    "Asettele kaikki hoitovaunulle **ennen kuin asiakas käy makuulle**, siinä järjestyksessä kuin tarvitset, ettei asiakas jää makaamaan yksin, kun etsit jotakin.",
    "Silmämeikki: pidä lappua suljetulla silmällä muutama sekunti ja pyyhi sitten kevyesti alaspäin. Ei hankausta, ei ihon venyttämistä, ei tuotetta silmään.",
    "Arvioi iho nopeasti toisen puhdistuksen jälkeen ja vertaa esitietolomakkeeseen. Jos jokin huolestuttaa, lopeta.",
    "Jokainen tuote on iholla valmistajan ilmoittaman ajan. Jos asiakasta kirvelee tai iho punoittaa nopeasti, poista tuote heti.",
    "Ekstraktio **vain koulutettuna** ja salongin luvalla. Muuten vaihe jätetään pois ja asia kirjataan.",
  ],
  intro: [
    "Kasvohoito vaihe vaiheelta näyttää joka hoitolassa suunnilleen samalta: meikinpoisto, puhdistus, kuorinta, naamio ja kosteusvoide. Ero on siinä, miten kukin vaihe tehdään: kuinka kevyt ote on, kuinka kauan tuote on iholla ja milloin vaihe jätetään pois. Sujuva hoito, jossa asiakas ei koskaan makaa odottamassa, alkaa myös hoitovaunusta, joka on katettu ennen kuin asiakas astuu sisään.",
    "Artikkeli seuraa VaraaAi Academyn Spa ja ihonhoito -kurssin oppituntia ”Peruskasvohoito: vaihe vaiheelta”. Oppitunnilla hoito tehdään asiakkaalle, jolla on hieman kuivunut sekaiho. Luettuasi osaat tehdä koko peruskasvohoidon neljässätoista vaiheessa, tiedät missä työskennellä kevyesti ja osaat siivota ja kirjata asiakastiedot asiakkaan lähdettyä.",
  ],
  sections: [
    {
      id: "ennen-kuin-asiakas-asettuu",
      title: "Ennen kuin asiakas asettuu: hoitopöytä, vaunu ja huone",
      blocks: [
        { p: "Kasvohoidon aikana kätesi tuskin irtoavat asiakkaan kasvoilta. Joka kerta, kun käännyt avaamaan kaapin tai laatikon, asiakas makaa odottamassa, ja kätesi koskettavat asioita, jotka eivät välttämättä ole puhtaita. Siksi kaikki valmistelut tehdään valmiiksi ennen kuin asiakas tulee huoneeseen." },
        { img: { src: img("giuong-spa-va-xe-day-chuan-bi-truoc-khi-facial"), alt: "Puhtain valkoisin lakanoin ja pyyhkein katettu hoitopöytä kermanvärisessä kiviseinäisessä huoneessa, vieressä kivitasoinen vaunu, jolle on aseteltu kulhot, siveltimet, puulastat ja tuotepullot", caption: "Hoitopöydällä puhtaat lakanat ja pyyhkeet, vaunulla valmiina vanulaput, kulhot, siveltimet, lastat ja tuotteet." } },
        { note: "Asettele vaunu käyttöjärjestykseen: meikinpoistoaine ensimmäiseksi, aurinkosuoja viimeiseksi. Asiakas ei joudu odottamaan, eivätkä kätesi koske kaappeihin tai laatikoihin kesken hoidon.", kind: "tip", title: "Ammattilaisen vinkki" },
        { p: "Vaunulla ovat ne tuotteet, jotka valitsit ihoanalyysin ja konsultaation perusteella, eivät kaikille samat vakiotuotteet. Jos haluat ymmärtää, miksi vaiheet etenevät tässä järjestyksessä, lue ensin [Mitä kasvohoidossa tehdään ja miksi](lesson:spa-facial-hieu-dung)." },
      ],
    },
    {
      id: "kevyemmin-pois-tai-lopetus",
      title: "Milloin edetään kevyemmin, vaihe jätetään pois tai hoito lopetetaan",
      blocks: [
        { p: "Neljätoista vaihetta ovat runko. Kunkin asiakkaan iho ratkaisee, käydäänkö koko runko läpi vai jätetäänkö osa pois. Taulukkoon on koottu oppitunnilla mainitut tilanteet." },
        {
          table: {
            head: ["Tilanne", "Mitä tehdään"],
            rows: [
              ["Ihon arviossa näkyy punoitusta, arkuutta, rikkinäistä ihoa tai jotain huolestuttavaa", "Lopeta ja vertaa oppituntiin [Milloin asiakasta ei hoideta](lesson:khi-nao-khong-lam)"],
              ["Kuorinnan aikana asiakasta kirvelee tai iho punoittaa nopeasti", "Poista tuote heti odottamatta ajan loppumista"],
              ["Herkkä tai punoittava iho", "Jätä lämmin pyyhe ja höyry pois"],
              ["Sinulla ei ole ekstraktiokoulutusta", "Jätä vaihe pois ja kirjaa se pätevää tekijää varten"],
              ["Jokin alue punoittaa voimakkaasti naamion poiston jälkeen", "Kirjaa se ja valitse hyvin mieto kosteusvoide"],
              ["Iho reagoi hoidon aikana", "Toimi oppitunnin [Ensiapu kauneushoitolassa](lesson:xu-ly-su-co) mukaan"],
            ],
          },
        },
        { note: "Tee ekstraktioita vain koulutettuna ja jos työpaikkasi määräykset sen sallivat; puristimet on steriloitava. Määräykset vaihtelevat maittain. Artikkeli on koulutusmateriaalia, ei ammattipätevyys.", kind: "warn", title: "Ekstraktiosta" },
      ],
    },
    {
      id: "yleiset-virheet",
      title: "Pienet virheet, jotka ovat kasvohoidossa yleisiä",
      blocks: [
        { p: "Useimmat kasvohoidon virheet eivät liity tuotteisiin. Ne syntyvät muutamasta tottumuksesta, joilla yritetään säästää aikaa." },
        {
          table: {
            head: ["Virhe", "Miksi ei", "Tee näin"],
            rows: [
              ["Vanulapun hankaaminen edestakaisin silmällä", "Silmänympärysiho on hyvin ohutta", "Pidä lappua muutama sekunti, jotta ripsiväri pehmenee, ja pyyhi kevyesti alaspäin"],
              ["Lämmin pyyhe kasvoille kokeilematta", "Pyyhe voi olla kuuma eikä lämmin", "Kokeile ensin omaan ranteeseen"],
              ["Sormi voidepurkkiin", "Koko purkki saastuu seuraaville asiakkaille", "Ota voide puhtaalla lastalla kämmenselälle"],
              ["Puristaminen kynsillä, kunnes mustapää irtoaa", "Vahingoittaa ihoa ja jättää jälkiä", "Paperi sormenpäiden ympärille, hyvin kevyt painallus, irtoamaton jätetään"],
              ["Naamion poisto kiireellä", "Naamiota jää hiusrajaan, leuan alle ja nenän sivuille", "Poista alue kerrallaan lämpimillä sienillä ja tarkista nuo kolme kohtaa"],
              ["Asiakas jää pitkäksi aikaa yksin naamion aikana", "Kukaan ei seuraa ihoa eikä asiakasta", "Pysy huoneessa; voit hieroa kevyesti asiakkaan käsiä tai hartioita"],
            ],
          },
        },
      ],
    },
    {
      id: "jalkihoito-ja-uusi-aika",
      title: "Mitä ei saa tehdä kasvohoidon jälkeen ja seuraavan ajan varaus",
      blocks: [
        { p: "Auta asiakas istumaan hitaasti ja anna neljä lyhyttä ohjetta ennen kuin hän lähtee huoneesta:" },
        {
          ol: [
            "Ei kotikuorintaa muutamaan päivään.",
            "Vältä aurinkoa.",
            "Käytä aurinkosuojaa joka aamu.",
            "Jos punoitus, kirvely tai kutina jatkuu, ota heti yhteyttä salonkiin.",
          ],
        },
        { p: "Varaa seuraava käynti vastaanotossa, kun asiakas on vielä paikalla. VaraaAissa avaat [ajanvarauskalenterin](lesson:lich-hen) ja varaat asiakkaalle ajan muutamalla napautuksella, eikä hänen tarvitse muistaa lähettää viestiä myöhemmin." },
        { img: { src: img("dat-lich-cham-soc-da-lan-sau-tai-quay"), alt: "Tablettia pitelevä kosmetologi seisoo kermanvärisen kivisen vastaanottotiskin ääressä ja keskustelee hymyillen kermanväriseen neuleeseen pukeutuneen vaaleahiuksisen asiakkaan kanssa", caption: "Seuraava aika varataan, kun asiakas on vielä vastaanotossa." } },
      ],
    },
    {
      id: "asiakaskortti",
      title: "Asiakaskortin kirjaus: käytetyt tuotteet ja ihon reaktio",
      blocks: [
        { p: "Hoidon viimeinen työ on muutama rivi muistiinpanoja: mitä tuotteita käytit tänään, miten iho reagoi ja mitä ohjeita annoit. Seuraavalla käynnillä sinä tai työkaverisi avaatte ne ja tiedätte, mitä kannattaa toistaa ja mitä välttää." },
        { p: "VaraaAissa nämä rivit kirjoitetaan kunkin asiakkaan sisäisiin muistiinpanoihin [asiakasrekisterissä](lesson:khach-hang)." },
      ],
    },
  ],
  howTo: {
    title: "Kasvohoito vaihe vaiheelta: 14 työvaihetta järjestyksessä",
    id: "kasvohoidon-tyovaiheet",
    after: "ennen-kuin-asiakas-asettuu",
    lead: "Neljätoista vaihetta etenevät oppitunnin videon järjestyksessä. Kunkin tuotteen vaikutusaika noudattaa aina valmistajan ohjetta.",
    supplies: [
      "Puhtaat lakanat, pyyhkeet ja otsapanta uudelle asiakkaalle",
      "Vanulaput, kasvosienet, kulhot, siveltimet ja voidelastat",
      "Ihoanalyysin perusteella valitut meikinpoistoaine, puhdistusaine, kuorinta, naamio, kasvovesi, kosteusvoide ja aurinkosuoja",
      "Lämpimät pyyhkeet tai vedellä täytetty höyrystin",
      "Suurennuslamppu",
      "Suojakäsineet ja pehmeää paperia; puristimet sterilointipussissaan, jos sinulla on lupa tehdä tämä vaihe",
    ],
    steps: [
      {
        name: "Valmistele hoitopöytä ja vaunu",
        text: "Pyyhi ja desinfioi hoitopöytä ja levitä puhtaat lakanat, pyyhkeet ja otsapanta uudelle asiakkaalle. Asettele vaunulle vanulaput, pyyhkeet, kulhot, siveltimet, lastat ja valitut tuotteet. Tarkista, että höyrystimessä on vettä, lämpimät pyyhkeet ovat valmiina ja huone on riittävän lämmin.",
      },
      {
        name: "Auta asiakas asettumaan ja pese kädet",
        text: "Asiakas makaa selällään pyyhkeen ja peiton alla niin, että vain kasvot, kaula ja hartiat ovat näkyvissä, ja otsapanta pitää hiukset poissa. Kysy, onko hänellä lämmin ja onko tyyny sopiva. Jos hänellä on piilolinssit, pyydä ottamaan ne pois ennen silmänympärysten käsittelyä. Pese sitten kädet saippualla ja kuivaa ne, kuten oppitunnilla [Käsihygienia ja käsineet](lesson:rua-tay-gang-tay).",
      },
      {
        name: "Poista silmä- ja huulimeikki ja sitten kasvojen meikki",
        text: "Aloita silmistä: aseta meikinpoistoaineeseen kostutettu lappu suljetulle silmälle muutamaksi sekunniksi, jotta ripsiväri pehmenee, ja pyyhi kevyesti alaspäin. Älä hankaa, älä venytä ihoa äläkä päästä tuotetta valumaan silmään. Pyyhi seuraavaksi huulet hyvin kevyesti ja vasta sitten koko kasvojen meikki.",
      },
      {
        name: "Puhdista iho toisen kerran",
        text: "Ota puhdistusainetta kämmenille, lämmitä se ja levitä kasvoille ja kaulalle pienin ympyröin leuasta poskille ja ylös otsalle. Pidä ote kevyenä ja tasaisena, kädet toistensa peilikuvina, silmiä välttäen. Poista lämpimillä, kosteilla sienillä, kunnes puhdistusainetta ei ole enää iholla.",
        image: { src: img("rua-mat-lan-hai-bang-vong-tron-nho"), alt: "Ylhäältä kuvattuna kosmetologin kaksi kättä levittää puhdistusainetta valkoista otsapantaa käyttävän asiakkaan kummallekin poskelle", caption: "Kädet liikkuvat toistensa peilikuvina pienin ympyröin, kevyesti ja tasaisesti." },
      },
      {
        name: "Arvioi iho nopeasti suurennuslampun alla",
        text: "Katso juuri puhdistettua ihoa nopeasti suurennuslampun alla ja vertaa esitietolomakkeeseen: onko jokin muuttunut, onko tänään punoitusta, arkuutta tai rikkinäistä ihoa? Alueittainen arvio käydään läpi artikkelissa [Ihoanalyysi vaihe vaiheelta](lesson:spa-soi-da). Jos jokin huolestuttaa, lopeta tähän.",
        image: { src: img("soi-da-nhanh-duoi-den-lup"), alt: "Kosmetologi kumartuu katsomaan asiakkaan poskea valkoista valoa antavan pyöreän suurennuslampun läpi, asiakas makaa hoitopöydällä vanulaput silmillään" },
      },
      {
        name: "Kuori iho",
        text: "Valitse kuorinta ihon arvion perusteella; oppitunnin hieman kuivuneelle iholle valitaan mieto. Laita vanulaput silmille ja levitä siveltimellä ohut kerros silmiä ja huulia välttäen. Pidä tuote iholla tasan valmistajan ajan ja tarkkaile ihoa koko ajan. Jos asiakasta kirvelee tai iho punoittaa nopeasti, poista tuote heti. Huuhtele lopuksi lämpimillä sienillä.",
      },
      {
        name: "Lämmitä iho pyyhkeellä tai höyryllä",
        text: "Kokeile pyyhkeen lämpö omaan ranteeseesi ja aseta se sitten asiakkaan kasvoille niin, että nenä ja suu jäävät vapaiksi ja hengittäminen on helppoa, ja pidä hetken. Jos käytät höyryä, aseta höyrystin riittävän kauas kasvoista ja höyrytä vain lyhyesti. Herkkä tai punoittava iho: jätä tämä vaihe pois.",
        image: { src: img("dap-khan-am-len-mat-chua-mui-mieng"), alt: "Asiakas makaa hoitopöydällä lämmin valkoinen pyyhe kiedottuna otsan ja kasvojen sivujen ympärille, ja kosmetologin kädet pitelevät sitä kevyesti poskien kohdalta", caption: "Pyyhe on lämmin, ei kuuma, eikä se peitä nenää tai suuta." },
      },
      {
        name: "Tee ekstraktio vain, jos sinulla on lupa",
        text: "Pue käsineet, kiedo pehmeää paperia kahden sormenpään ympärille ja paina mustapään molemmin puolin hyvin kevyesti. Jos se irtoaa, hyvä; jos ei, jätä se. Ei kynsiä, ei kovaa puristamista, ja pidä vaihe lyhyenä. Pyyhi alue lopuksi rauhoittavalla tuotteella valmistajan ohjeen mukaan. Puristimen on oltava steriloitu ja otettu suljetusta pussista. Jos sinulla ei ole koulutusta, jätä vaihe pois ja kirjaa se.",
        image: { src: img("lay-nhan-mun-bang-khan-giay-va-gang-tay"), alt: "Kaksi mustiin käsineisiin puettua kättä, sormenpäissä valkoista paperia, painaa kevyesti näpyn molemmin puolin silmät kiinni makaavan asiakkaan leuassa" },
      },
      {
        name: "Levitä iholle sopiva naamio",
        text: "Levitä naamio siveltimellä tasaisesti kaulalta ylös leualle, poskille, nenälle ja otsalle, ja jätä silmät, sieraimet ja huulet vapaiksi. Pidä naamio valmistajan ajan. Sillä välin voit hieroa kevyesti asiakkaan käsiä tai hartioita, äläkä jätä häntä liian pitkäksi aikaa yksin.",
      },
      {
        name: "Poista naamio lämpimillä sienillä",
        text: "Poista naamio hellästi alue kerrallaan lämpimillä, kosteilla sienillä hankaamatta. Tarkista hiusraja, leuan alus ja nenän sivut, joihin naamiota jää usein. Katso sitten ihoa uudelleen: kirjaa voimakkaasti punoittava alue ja valitse hyvin mieto kosteusvoide.",
        image: { src: img("go-mat-na-bang-mut-am"), alt: "Kosmetologi pyyhkii vihreää savinaamiota asiakkaan kasvoilta pyöreällä sienellä, toinen puoli kasvoista on jo puhdas ja toisella on vielä naamio" },
      },
      {
        name: "Levitä kasvovesi",
        text: "Kostuta vanulappu kasvovedellä ja pyyhi se kevyesti koko kasvoille. Vaihe on lyhyt, eikä siinä tarvitse painaa tai hangata.",
      },
      {
        name: "Levitä kosteusvoide ja aurinkosuoja",
        text: "Ota voide purkista puhtaalla lastalla ja aseta se kämmenselällesi; sormet eivät koskaan käy purkissa. Levitä kevein sivelyin ylös- ja ulospäin. Päivällä aurinkosuoja on viimeinen vaihe.",
        image: { src: img("thoa-kem-duong-am-vuot-len-va-ra-ngoai"), alt: "Kosmetologin kädet levittävät kosteusvoidetta asiakkaan kummallekin poskelle ylös- ja ulospäin suuntautuvin sivelyin, ja asiakas lepää silmät kiinni", caption: "Kevyet sivelyt ylös- ja ulospäin." },
      },
      {
        name: "Anna jälkihoito-ohjeet ja varaa seuraava aika",
        text: "Auta asiakas istumaan hitaasti. Neuvo häntä välttämään kotikuorintaa muutaman päivän ajan, välttämään aurinkoa, käyttämään aurinkosuojaa joka aamu ja ottamaan heti yhteyttä salonkiin, jos punoitus, kirvely tai kutina jatkuu. Varaa sitten seuraava käynti vastaanotossa.",
      },
      {
        name: "Siivoa, kirjaa ja pese kädet",
        text: "Pue käsineet. Pyyhkeet, otsapanta ja lakanat menevät kannelliseen pyykkikoriin, vanulaput, paperit ja kertakäyttölastat kannelliseen roska-astiaan. Siveltimet ja kulhot pestään ja desinfioidaan, ja puristimet puhdistetaan ja steriloidaan kuten oppitunnilla [Välineet jokaisen asiakkaan jälkeen](lesson:ve-sinh-dung-cu). Kirjaa lopuksi asiakaskorttiin käytetyt tuotteet, ihon reaktio ja antamasi ohjeet ja pese kädet.",
        image: { src: img("don-dep-sau-buoi-cham-soc-da-mat"), alt: "Mustiin käsineisiin pukeutunut kosmetologi laittaa käytetyt pyyhkeet kannelliseen punottuun koriin ja vanulaput poljinroska-astiaan, käytetyt siveltimet ovat erillään tarjottimella vaunulla" },
      },
    ],
  },
  faq: [
    {
      q: "Mitä työvaiheita kasvohoitoon kuuluu?",
      a: "Peruskasvohoitoon kuuluvat hoitopöydän ja välineiden valmistelu, asiakkaan asettuminen, silmä-, huuli- ja kasvomeikin poisto, toinen puhdistus, nopea ihon arvio, kuorinta, lämmin pyyhe tai höyry, ekstraktio jos tekijä on koulutettu, naamion levitys ja poisto, kasvovesi, kosteusvoide ja päivällä aurinkosuoja. Lopuksi annetaan jälkihoito-ohjeet, varataan seuraava aika ja siivotaan.",
    },
    {
      q: "Miten silmämeikki poistetaan oikein kasvohoidossa?",
      a: "Aseta meikinpoistoaineeseen kostutettu lappu suljetulle silmälle muutamaksi sekunniksi, jotta ripsiväri pehmenee, ja pyyhi kevyesti alaspäin. Älä hankaa, älä venytä ihoa äläkä päästä tuotetta silmään, sillä silmänympärysiho on hyvin ohutta. Piilolinssejä käyttävää asiakasta pyydetään ottamaan ne ensin pois.",
    },
    {
      q: "Kuinka kauan kasvonaamio ja kuorinta pidetään iholla?",
      a: "Tasan tuotteeseen merkityn valmistajan ajan, ei pidempään. Kosmetologi tarkkailee ihoa koko ajan. Kuorinta poistetaan heti, jos asiakasta kirvelee tai iho punoittaa nopeasti, odottamatta ajan loppumista.",
    },
    {
      q: "Saako mustapäitä poistaa ilman koulutusta?",
      a: "Ei pidä. Väärin tehty ekstraktio vahingoittaa ihoa ja jättää jälkiä, joten sen tekee vain koulutettu tekijä paikallisten määräysten salliessa. Jos sinulla ei ole koulutusta, jätä vaihe pois ja kirjaa se, jotta pätevä tekijä voi hoitaa sen.",
    },
    {
      q: "Mitä ei saa tehdä kasvohoidon jälkeen?",
      a: "Muutaman päivän ajan iholle ei tehdä kotikuorintaa, aurinkoa vältetään ja aurinkosuojaa käytetään joka aamu. Jos punoitus, kirvely tai kutina jatkuu, asiakkaan kannattaa ottaa heti yhteyttä hoidon tehneeseen salonkiin.",
    },
    {
      q: "Miksi voide otetaan purkista lastalla eikä sormin?",
      a: "Sormi purkissa saastuttaa koko purkin kaikille seuraaville asiakkaille. Oikea tapa on ottaa voide puhtaalla lastalla, asettaa se kämmenselälle ja levittää asiakkaan kasvoille sieltä.",
    },
  ],
  related: ["spa-facial-hieu-dung", "spa-soi-da", "spa-massage-mat", "ve-sinh-dung-cu"],
};

export default article;
