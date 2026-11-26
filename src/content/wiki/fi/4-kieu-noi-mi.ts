import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/4-kieu-noi-mi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "millaiset-ripsienpidennykset-valita",
  lesson: "4-kieu-noi-mi",
  category: "tips",
  title: "Millaiset ripsienpidennykset valita? Klassiset, hybridi, volyymi ja mega rinnakkain",
  metaTitle: "Millaiset ripsienpidennykset valita? Neljä tyyliä rinnakkain",
  metaDescription:
    "Millaiset ripsienpidennykset valita? Klassiset, hybridi, volyymi ja mega samoilla kasvoilla: tuuheus, ripsiä viuhkassa ja miksi omat ripset ratkaisevat.",
  keyword: "millaiset ripsienpidennykset valita",
  keywords: ["klassiset vai volyymiripset", "ripsienpidennykset ensimmäistä kertaa", "luonnolliset ripsienpidennykset", "hybridiripset kenelle", "megaripset juhliin", "ripsienpidennysten vaihtoehdot"],
  excerpt: "Klassiset, hybridi, volyymi vai mega: neljä ripsienpidennystyyliä samoilla kasvoilla, jotta näet, kuinka tuuhea kukin on ja mikä sopii sinulle.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tu-van-chon-kieu-noi-mi-voi-anh-mau"),
    alt: "Hymyilevä vaaleahiuksinen asiakas istuu kermanvärisessä tuolissa ja osoittaa silmäkuvaa ripsistylistin pitelemältä tabletilta konsultaatiossa",
  },
  takeaways: [
    "**Klassisissa** ripsissä jokaiseen omaan ripseen tulee yksi pidennys: luonnollinen kuin ripsiväri, sopii töihin ja ensimmäiseksi kerraksi.",
    "**Hybridi** yhdistää yksittäiset ripset ja pienet volyymiviuhkat: tuuheampi ja syvempi, mutta pidennykset huomaa vasta läheltä.",
    "**Volyymissa** jokaiseen omaan ripseen tulee 3–6 ultraohuen ripsen viuhka, **megassa** 8–16 ripsen viuhka syvän mustaan ripsiriviin.",
    "Jokainen tyyli näyttää hyvältä ja kestää vain, jos se sopii omille ripsillesi. Ohuisiin ja harvoihin ripsiin kannattaa aloittaa kevyesti.",
    "Jos et ole varma, anna ripsistylistin katsoa omat ripsesi ennen päätöstä. Älä valitse pelkän netistä löytyneen kuvan perusteella.",
  ],
  intro: [
    "Millaiset ripsienpidennykset valita, kun hinnastossa lukee klassiset, hybridi, volyymi ja megavolyymi? Samoilla kasvoilla nämä neljä tyyliä antavat neljä aivan erilaista ilmettä: ripsistä, jotka näyttävät siistiltä ripsiväriltä, aina juhlavaan syvän mustaan ripsiriviin. Ero syntyy siitä, kantaako jokainen oma ripsi yhden pidennyksen vai usean ultraohuen ripsen viuhkan.",
    "Artikkeli perustuu VaraaAi Academyn kurssin ”Moja Beauty: ripset, kynnet ja kulmat” oppituntiin ”4 ripsityyliä: klassinen, hybridi, volyymi ja mega samoilla kasvoilla”. Kurssi on lyhyitä asiakasvideoita helsinkiläiseltä Moja Beauty -salongilta. Luettuasi tiedät, kuinka tuuhea kukin tyyli on, mihin tilanteeseen se sopii ja miten kerrot ripsistylistille toiveesi ennen kuin asetut hoitosängylle.",
  ],
  sections: [
    {
      id: "nelja-tyylia",
      title: "Ripsienpidennysten vaihtoehdot rinnakkain",
      blocks: [
        { p: "Ero näkyy helpoimmin, kun samalla ihmisellä on vuorotellen neljä eri settiä. Kasvot, valo ja meikki pysyvät samoina, vain ripset vaihtuvat. Taulukkoon on koottu se, mikä kannattaa muistaa." },
        {
          table: {
            head: ["Tyyli", "Jokainen oma ripsi kantaa", "Miltä näyttää"],
            rows: [
              ["Klassiset", "Yhden pidennyksen", "Luonnolliselta, ripset erillään"],
              ["Hybridi", "Yksittäisen tai pienen viuhkan vuorotellen", "Keskituuhealta ja syvältä"],
              ["Volyymi", "3–6 ultraohuen ripsen viuhkan", "Tuuhealta, tummalta ja pehmeältä"],
              ["Megavolyymi", "8–16 ultraohuen ripsen viuhkan", "Syvän mustalta ja näyttävältä"],
            ],
          },
        },
        { p: "Oli viuhkassa kuinka monta ripseä tahansa, se kiinnitetään silti **tasan yhteen omaan ripseen**. Missään tyylissä yksi viuhka ei kierry kahden tai kolmen oman ripsen ympärille. Jos niin käy, ripset liimautuvat yhteen ja vetävät toisiaan kasvaessaan." },
      ],
    },
    {
      id: "klassiset",
      title: "Klassiset ripset: luonnolliset kuin ripsiväri",
      blocks: [
        { p: "Klassisissa ripsienpidennyksissä jokaiseen omaan ripseen kiinnitetään tasan yksi pidennys. Ripset pitenevät ja tummuvat, ja jokainen ripsi pysyy erillään kuin huolellisesti levitetyssä ripsivärissä. Tyyli sopii arkeen ja töihin, ja se on turvallinen valinta ensimmäisiksi pidennyksiksi." },
        { img: { src: img("kieu-noi-mi-classic-tu-nhien-nhu-chuot-mascara"), alt: "Lähikuva vaaleahiuksisesta naisesta, joka katsoo hieman alas, ohuet ja erilliset klassiset ripset näyttävät juuri levitetyltä ripsiväriltä", caption: "Klassiset: yksi pidennys yhdessä omassa ripsessä, kuin ripsiväri." } },
        { p: "Koska jokainen oma ripsi kantaa vain yhden pidennyksen, klassisen setin tuuheus riippuu siitä, kuinka paljon omia ripsiä sinulla on. Harvoista omista ripsistä tulee harva klassinen setti, ja silloin moni siirtyy hybridiin. Ripsistylistin näkökulman löydät artikkelista [mitä ovat klassiset ripsienpidennykset](lesson:mi-classic-hieu-dung)." },
      ],
    },
    {
      id: "hybridi",
      title: "Hybridiripset: kenelle keskituuhea tyyli sopii",
      blocks: [
        { p: "Hybridissä yksittäiset klassiset ripset ja pienet volyymiviuhkat vuorottelevat. Yksittäiset ripset tuovat terävyyttä ja pienet viuhkat täyttävät välit, joten ripsirivi on klassista tuuheampi mutta pysyy pehmeänä ja syvänä. Vastapäätä istuva huomaa pidennykset vasta tarkkaan katsomalla." },
        { img: { src: img("kieu-noi-mi-hybrid-day-vua-co-chieu-sau"), alt: "Sama vaaleahiuksinen nainen helmikorvakorut korvissaan hieman sivulle kääntyneenä, keskituuheat ja hieman rakenteiset hybridiripset silmissä", caption: "Hybridi: klassista tuuheampi, silti luonnollinen." } },
        { p: "Tyyli sopii usein niille, joiden omat ripset ovat harvat tai kasvavat epätasaisesti, ja niille, jotka ovat tottuneet klassisiin ja haluavat vähän lisää siirtymättä vielä volyymiin. Ripsistylisti valitsee jokaiselle omalle ripselle joko yksittäisen pidennyksen tai pienen viuhkan sen vahvuuden mukaan: vahva ripsi saa viuhkan, ohut yksittäisen." },
        { img: { src: img("mi-hybrid-nhin-nghieng-soi-don-va-chum-nho"), alt: "Asiakkaan suljettu silmä sivusta kuvattuna, hybridiripsirivissä näkyy selkeitä yksittäisiä ripsiä ohuiden pienten viuhkojen välissä", caption: "Sivulta näkyvät yksittäiset ripset ja pienet viuhkat vuorotellen." } },
      ],
    },
    {
      id: "volyymi-ja-mega",
      title: "Volyymi ja megavolyymi: tuuheat, tummat ja näyttävät",
      blocks: [
        { h3: "Volyymi" },
        { p: "Volyymiripsissä jokaiseen omaan ripseen tulee viuhka, jossa on kolmesta kuuteen ultraohutta ripseä. Ripset ovat tuuheat, tummat ja pehmeät, ja silmät erottuvat niin selvästi, ettei rajausta tarvita. Volyymiripset ovat paljon klassisia ohuempia, joten muutaman ripsen viuhka voi painaa suunnilleen saman verran kuin yksi paksu klassinen pidennys." },
        { img: { src: img("kieu-noi-mi-volume-day-mem"), alt: "Vaaleahiuksinen nainen tuuheissa, tummissa ja pehmeissä volyymiripsissä katsoo hieman alas studiossa, jonka taustalla on violetit verhot", caption: "Volyymi: tuuhea ja pehmeä, silmät erottuvat ilman rajausta." } },
        { img: { src: img("lop-mi-volume-day-deu-nhin-gan"), alt: "Lähikuva asiakkaan suljetusta silmästä valkoisen suojatyynyn päällä, volyymiripsirivi on tasaisen tuuhea ja tumma sisänurkasta ulkonurkkaan" } },
        { h3: "Megavolyymi" },
        { p: "Megavolyymi vie vielä askeleen pidemmälle: jokaisessa viuhkassa on kahdeksasta kuuteentoista ultraohutta ripseä. Ripsirivi on syvän musta ja todella näyttävä, ja se sopii juhliin ja kuvauksiin. Mitä enemmän ripsiä viuhkassa on, sitä ohuempia niiden pitää olla ja sitä kapeampi tyvi, joten tyyli vaatii taitavan tekijän ja vahvat omat ripset." },
        { img: { src: img("kieu-noi-mi-mega-volume-dam-noi-bat"), alt: "Vaaleahiuksinen nainen katsoo suoraan eteenpäin syvän mustissa megavolyymiripsissä, jotka korostavat silmät voimakkaasti", caption: "Megavolyymi: syvän musta ripsirivi juhliin ja kuviin." } },
        { img: { src: img("bo-mi-mega-volume-nhin-gan-tren-mat-nham"), alt: "Lähikuva tiheästä mustasta megavolyymiripsirivistä asiakkaan suljetussa silmässä, valkoinen suojatyyny alaripsien päällä" } },
      ],
    },
    {
      id: "mika-valita",
      title: "Klassiset vai volyymiripset: valitse tilanteen ja omien ripsien mukaan",
      blocks: [
        { p: "Oppitunti tiivistää valinnan yhteen lauseeseen: luonnolliseen klassiset, kevyeen tuuheuteen hybridi, näyttävään volyymi ja juhliin mega. Se on valintaa tilanteen mukaan. Toinen asia, jota ripsistylisti aina katsoo, on se, kuinka paljon omat ripsesi jaksavat kantaa." },
        {
          table: {
            head: ["Toiveesi", "Yleensä sopiva tyyli"],
            rows: [
              ["Töihin, kuin ei pidennyksiä olisikaan", "Klassiset"],
              ["Ensimmäiset pidennykset", "Klassiset, tai hybridi harvoihin ripsiin"],
              ["Vähän tuuheampaa, silti pehmeää", "Hybridi"],
              ["Korostetut silmät ilman rajausta", "Volyymi"],
              ["Juhlat, häät, kuvaukset", "Megavolyymi"],
            ],
          },
        },
        { p: "Oman ripsen kantokyky ei muutu. Pitkät ja vahvat ripset kantavat viuhkoja, joissa on enemmän ripsiä. Ohuisiin, lyhyisiin tai harvoihin ripsiin, tai jos joukossa on paljon nuoria ripsiä, sopivat viuhkat, joissa on vähemmän, ohuempia ja lyhyempiä ripsiä. Liian raskas setti painaa omaa ripseä alas, tyvi joutuu koetukselle ja ripsi voi irrota ennen aikojaan. Artikkeli [pilaavatko ripsienpidennykset omat ripset](lesson:noi-mi-co-hai-mi-that) kertoo tästä tarkemmin." },
        { note: "Mallikuvan tuominen salonkiin on hyvä ajatus, mutta anna ripsistylistin kertoa rehellisesti, sopiiko kuva silmillesi ja omille ripsillesi. Huolellinen tekijä ehdottaa heikkoihin ripsiin ensimmäiseksi kerraksi kevyempää ja lisää tuuheutta seuraavilla käynneillä, kun ripset ovat tottuneet.", kind: "tip", title: "Kun tuot mallikuvan mukanasi" },
        { p: "Tyyli on vasta puolet. Taivutus (C, CC, D tai L) ratkaisee, miten ripset asettuvat silmiesi muotoon; siitä jatkaa oppitunti [ripsien taivutukset silmänmuodon mukaan](lesson:do-cong-theo-mat)." },
      ],
    },
    {
      id: "setin-yllapito",
      title: "Jokainen tyyli tarvitsee saman huollon ja hoidon",
      blocks: [
        { p: "Pidennykset ovat kiinni omissa ripsissä, joten kun oma ripsi irtoaa kiertonsa lopussa, pidennys lähtee mukana. Kaikissa neljässä tyylissä huolto on yleensä ajankohtainen kahden–kolmen viikon kuluttua. Megavolyymin kohdalla ripsistylisti yleensä kertoo jo konsultaatiossa, että setti tarvitsee säännöllistä huoltoa: kun omat ripset kasvavat, raskaat viuhkat kiertyvät helposti, ja kasvaneet poistetaan huollossa." },
        { p: "Kotona hoito on sama kaikille tyyleille: älä hiero silmiä, älä nypi ripsiä, vältä öljyisiä tuotteita silmien ympärillä ja harjaa ripset kevyesti joka päivä. Tarkemmat ohjeet ovat artikkelissa [ripsien jälkihoito pidennysten tai taivutuksen jälkeen](lesson:cham-soc-sau-lam-mi)." },
        { p: "Jos asut Helsingissä ja haluat, että joku katsoo ripsesi paikan päällä, kysy Moja Beautysta. Ajan varaat VaraaAissa [Moja Beautyn varaussivulta](/b/moja-beauty): valitse palvelu, valitse aika, valmis." },
      ],
    },
  ],
  faq: [
    {
      q: "Mikä ero on klassisilla ja volyymiripsillä?",
      a: "Klassisissa ripsissä jokaiseen omaan ripseen kiinnitetään yksi pidennys, ja lopputulos on luonnollinen kuin ripsiväri. Volyymissa jokaiseen omaan ripseen kiinnitetään kolmen–kuuden ultraohuen ripsen viuhka, joten ripset ovat selvästi tuuheammat, tummemmat ja pehmeämmät.",
    },
    {
      q: "Millaiset ripsienpidennykset ensimmäiseksi kerraksi?",
      a: "Klassiset ovat turvallinen valinta ensimmäisiksi pidennyksiksi, koska ne näyttävät luonnollisilta ja ovat kevyet. Jos omat ripsesi ovat harvat tai epätasaiset, ripsistylisti voi ehdottaa hybridiä, jolloin ripsirivi on täyteläisempi mutta pysyy pehmeänä.",
    },
    {
      q: "Mitä hybridiripset ovat?",
      a: "Hybridissä samassa silmässä vuorottelevat yksittäiset klassiset ripset ja pienet volyymiviuhkat. Jokainen oma ripsi kantaa silti vain yhden asian, joko yksittäisen pidennyksen tai yhden pienen viuhkan, ja ripsirivi on keskituuhea ja syvä.",
    },
    {
      q: "Ovatko megavolyymiripset raskaat ja haitalliset omille ripsille?",
      a: "Megassa käytetään kahdeksan–kuudentoista hyvin ohuen ripsen viuhkoja, joten se sopii vain pitkille ja vahvoille omille ripsille. Ohuissa tai harvoissa ripsissä liian raskas viuhka voi painaa omaa ripseä ja saada sen irtoamaan ennen aikojaan, joten usein tehdään kevyempi versio.",
    },
    {
      q: "Mitkä ripsienpidennykset näyttävät luonnollisimmilta?",
      a: "Klassiset näyttävät luonnollisimmilta, koska jokainen oma ripsi kantaa vain yhden pidennyksen ja ripset pysyvät erillään. Seuraavana tulee hybridi: hieman tuuheampi, mutta pidennykset huomaa vasta läheltä.",
    },
    {
      q: "Kuinka usein ripsienpidennykset pitää huoltaa?",
      a: "Yleensä kahden–kolmen viikon välein, oli tyyli mikä tahansa neljästä. Siihen mennessä osa pidennyksistä on lähtenyt omien ripsien mukana, ja ripsiriviin alkaa tulla aukkoja.",
    },
  ],
  related: ["do-cong-theo-mat", "noi-mi-vs-uon-mi", "noi-mi-co-hai-mi-that", "mi-volume-hieu-dung"],
};

export default article;
