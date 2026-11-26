import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/spa-facial-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "mita-kasvohoidossa-tehdaan",
  lesson: "spa-facial-hieu-dung",
  category: "spa",
  title: "Mitä kasvohoidossa tehdään? Peruskasvohoidon järjestys ja jokaisen vaiheen syy",
  metaTitle: "Mitä kasvohoidossa tehdään? Vaiheet ja niiden syyt",
  metaDescription:
    "Mitä kasvohoidossa tehdään: miksi kaksoispuhdistus, miten liiallinen kuorinta vaurioittaa ihoa, milloin höyry jätetään pois ja milloin ekstraktio on turvallinen.",
  keyword: "mitä kasvohoidossa tehdään",
  keywords: [
    "peruskasvohoito",
    "kasvohoidon vaiheet",
    "kaksoispuhdistus",
    "liiallinen kuorinta",
    "höyry herkälle iholle",
    "mustapäiden poisto kasvohoidossa",
    "kasvohoito kosmetologilla",
  ],
  excerpt: "Kasvohoito etenee puhtaasta selkeään ja sitten ravitsemiseen ja suojaukseen. Kun tiedät, miksi kukin vaihe on paikallaan, tiedät milloin sen tekee, milloin sen jättää pois ja kuinka kevyesti.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("chuyen-vien-spa-tu-van-cham-soc-da-mat-cho-khach"),
    alt: "Kermanvärisessä työasussa oleva kosmetologi osoittaa tarjotinta, jolla on kolme ihonhoitotuotetta, ja valkoiseen kylpytakkiin pukeutunut asiakas kuuntelee hoitopöydällä istuen",
  },
  takeaways: [
    "Peruskasvohoito etenee aina samassa järjestyksessä: **puhdistus**, kuorinta, lämmitys, tarvittaessa ekstraktio, naamio ja hieronta, kasvovesi, kosteusvoide ja päivällä aurinkosuoja.",
    "Jos asiakkaalla on meikki, iho puhdistetaan kahdesti: ensin meikinpoisto, sitten ihotyypille sopiva puhdistusaine.",
    "Kuorinta valitaan ihotyypin mukaan ja pidetään valmistajan ajan. **Liiallinen kuorinta** vaurioittaa ihon suojamuuria, ja toipuminen voi kestää viikkoja.",
    "Hyvin herkkä tai punoittava iho tai näkyvät pienet verisuonet: jätä höyry pois tai käytä vain viileää, kosteaa pyyhettä.",
    "Ekstraktio vain koulutettuna ja paikallisten määräysten salliessa; komedonipuristin **steriloidaan** jokaisen asiakkaan jälkeen.",
  ],
  intro: [
    "Mitä kasvohoidossa tehdään? Moni vastaa heti: puhdistus, naamio ja voide. Tarkempi vastaus on, että kasvohoito on hoitolassa tehtävä ihonhoito, joka etenee aina samassa järjestyksessä: ensin iho puhdistetaan, sitten se avataan ja vasta lopuksi sitä ravitaan ja suojataan. Jokaisella vaiheella on syynsä, ja myös järjestyksellä on syynsä.",
    "Artikkeli seuraa VaraaAi Academyn Spa ja ihonhoito -kurssin oppituntia ”Peruskasvohoito: ymmärrä se, niin iho on puhdas ja terve”, joka on aiheen teoriaosa. Se ei opeta käsiotteita. Se selittää, miksi kukin vaihe on juuri omalla paikallaan, jotta tiedät, milloin vaihe tehdään, milloin se jätetään pois ja kuinka kevyesti työskennellään. Käytännön työjärjestys on artikkelissa [Kasvohoito vaihe vaiheelta](lesson:spa-facial).",
  ],
  sections: [
    {
      id: "kasvohoidon-vaiheet",
      title: "Peruskasvohoidon vaiheet järjestyksessä",
      blocks: [
        { p: "Peruskasvohoito ei vaadi montaa tuotetta. Se vaatii oikean järjestyksen: ensin puhdas, sitten selkeä, ja vasta sitten ravitseminen ja suojaus. Jos järjestys vaihtuu, seuraava vaihe menettää merkityksensä. Puhdistamattomalle iholle levitetty kosteusvoide jää vain jäämäkerroksen päälle." },
        {
          table: {
            head: ["Vaihe", "Mitä varten", "Muista"],
            rows: [
              ["Puhdistus", "Meikin ja aurinkosuojan poisto, sitten itse ihon puhdistus", "Kahdesti, jos asiakkaalla on meikki"],
              ["Kuorinta", "Kuolleiden solujen poisto, iho kirkkaampi ja sileämpi", "Ihotyypin mukaan, valmistajan aika"],
              ["Ihon lämmitys", "Mukavuus, pehmeämpi ja helpommin puhdistuva iho", "Lämmin pyyhe tai höyry; punoittavalla iholla pois"],
              ["Ekstraktio, tarvittaessa", "Muutaman pienen mustapään poisto", "Vain koulutettuna ja määräysten salliessa"],
              ["Naamio ja hieronta", "Ihotyypin mukainen hoito, asiakkaan rentoutuminen", "Osa hieroo ennen naamiota, osa jälkeen"],
              ["Kasvovesi, kosteusvoide", "Kosteuden sitominen, suojamuurin suojaus", "Ihotyypille sopiva voide"],
              ["Aurinkosuoja", "Suojaa ihoa, kun asiakas lähtee ulos", "Viimeinen vaihe aamulla tai päivällä"],
            ],
          },
        },
        { p: "Kaikkea tätä edeltää ihoanalyysi. Ihotyyppi ja ihon kunto juuri sinä päivänä ratkaisevat, mitä tuotteita käytät ja mitkä vaiheet jätät pois. Analyysin teko on artikkelissa [Ihoanalyysi vaihe vaiheelta](lesson:spa-soi-da)." },
      ],
    },
    {
      id: "kaksoispuhdistus",
      title: "Kaksoispuhdistus: miksi kasvot puhdistetaan vielä meikinpoiston jälkeen",
      blocks: [
        { p: "Puhdistus on kaikkien seuraavien vaiheiden perusta. Meikatun asiakkaan iho puhdistetaan kahdesti, ja kummallakin kerralla on oma tehtävänsä." },
        {
          ul: [
            "**Ensimmäinen puhdistus, meikinpoisto.** Se poistaa pinnalla olevan meikin ja aurinkosuojan.",
            "**Toinen puhdistus, ihotyypille sopiva puhdistusaine.** Vasta nyt puhdistetaan itse iho.",
          ],
        },
        { p: "Jos toinen puhdistus jää väliin, kaikki sen jälkeen levitetty, kuorinnasta kosteusvoiteeseen, jää jäämäkerroksen päälle." },
        { h3: "Silmät ja huulet" },
        { p: "Silmien ja huulten ympärillä iho on hyvin ohutta, joten siellä ei hangata. Aseta kostutettu vanulappu suljetulle silmälle ja pidä sitä muutama sekunti, jotta ripsiväri pehmenee, ja pyyhi sitten kevyesti. Tuotetta ei saa päästä silmiin." },
        { img: { src: img("tay-trang-mat-bang-bong-truoc-khi-facial"), alt: "Kosmetologin käsi asettaa pyöreän vanulapun hoitopöydällä makaavan, valkoista otsapantaa käyttävän asiakkaan suljetulle silmälle", caption: "Vanulappu pidetään silmällä muutama sekunti, jotta ripsiväri pehmenee, ja pyyhitään sitten hankaamatta." } },
      ],
    },
    {
      id: "kuorinta",
      title: "Kuorinta ihotyypin mukaan ja liiallisen kuorinnan merkit",
      blocks: [
        { p: "Kuorinta poistaa pinnalta kuolleiden solujen kerroksen, jolloin iho näyttää kirkkaammalta ja sileämmältä. Hoitoloissa on kolme yleistä vaihtoehtoa, ja valinta riippuu edessäsi olevasta ihosta." },
        {
          table: {
            head: ["Kuorinnan tyyppi", "Millaiselle iholle ja miten"],
            rows: [
              ["Entsyymikuorinta", "Mieto; sopii yleensä herkälle tai ohuelle iholle"],
              ["Mieto happokuorinta", "Paksumpi, rasvaisempi iho sietää sitä yleensä"],
              ["Rakeinen kuorinta", "Rakeiden on oltava hyvin hienoja ja hieronnan hyvin kevyttä"],
            ],
          },
        },
        { p: "Tyypistä riippumatta kuorinta pidetään iholla valmistajan ilmoittaman ajan. Pidempi aika ”varmuuden vuoksi” ei puhdista ihoa yhtään paremmin." },
        { img: { src: img("thoa-tay-da-chet-bang-co-va-dong-ho-cat"), alt: "Kosmetologi levittää siveltimellä ohuen kerroksen kirkasta tuotetta asiakkaan poskelle, asiakkaan silmillä on kaksi vanulappua ja hoitovaunulla seisoo tiimalasi", caption: "Ohut kerros siveltimellä, silmät peitettyinä ja valmistajan aika tarkasti." } },
        { h3: "Liiallinen kuorinta: tänään sileä, muutaman päivän päästä punainen ja arka" },
        { p: "Tämä on hyvin tavallista. Iho näyttää karhealta, joten hoitaja kuorii sen perusteellisesti ja monta kertaa, vielä asiakkaan kotona käyttämien happojen tai retinoidien päälle. Sinä päivänä iho näyttää sileältä ja hehkuvalta. Muutaman päivän päästä se punoittaa ja on arka, kirvelee voidetta levitettäessä ja hilseilee joskus laikkuina. Ihon suojamuuri on vaurioitunut, ja iho tarvitsee aikaa, joskus muutaman viikon, toipuakseen." },
        { note: "Kysy aina ennen kuorinnan valintaa, mitä asiakas käyttää kotona. Jos hän käyttää happoja tai retinoideja, hoitolan kuorinta tulee niiden päälle, joten kuori vain sen verran kuin on tarpeen ja kevyesti.", kind: "warn", title: "Kysy ennen kuorintaa" },
      ],
    },
    {
      id: "lammin-pyyhe-ja-hoyry",
      title: "Lämmin pyyhe ja kasvohöyry: mitä varten ja milloin ne jätetään pois",
      blocks: [
        { p: "Kuorinnan jälkeen iho lämmitetään lämpimällä pyyhkeellä tai höyryllä. Tarkoitus on yksinkertainen: asiakkaan on mukava olla, ja iho on pehmeämpi ja helpompi puhdistaa. Koska vaihe on vain tätä varten, sen ei tarvitse olla kuuma eikä pitkä." },
        {
          ul: [
            "**Lämmin pyyhe:** lämmin, ei kuuma. Kokeile sitä omaan ranteeseesi ennen kuin se laitetaan asiakkaan kasvoille.",
            "**Höyrystin:** riittävän kaukana kasvoista, eikä pitkään.",
          ],
        },
        { img: { src: img("xong-hoi-da-mat-may-dat-cach-xa"), alt: "Valkoinen kasvohöyrystin seisoo noin käsivarren mitan päässä asiakkaan kasvoista, ohut höyry leijuu kohti vanulapuin peitetyin silmin makaavaa asiakasta ja kosmetologi seisoo vieressä", caption: "Höyrystin on niin kaukana, että höyry juuri ja juuri ylettyy kasvoille, ja silmät on peitetty." } },
        { p: "Lämpö saa herkän, punoittavan ihon punoittamaan entistä enemmän. Hyvin herkällä tai punoittavalla iholla tai kun pienet verisuonet näkyvät, höyry jätetään pois tai käytetään vain viileää, kosteaa pyyhettä." },
        { img: { src: img("da-nhay-cam-do-ma-khong-nen-xong-hoi"), alt: "Lähikuva valkoista otsapantaa käyttävästä naisesta silmät kiinni, posket ja nenänsiivet punoittavat ja niissä näkyy muutama pieni verisuoni", caption: "Punoittava iho ja näkyvät pienet verisuonet: ei höyryä, vain viileä kostea pyyhe." } },
      ],
    },
    {
      id: "ekstraktio",
      title: "Mustapäiden poisto kasvohoidossa: vaihe, joka vahingoittaa helpoimmin",
      blocks: [
        { p: "Kasvohoidon kaikista vaiheista ekstraktio eli epäpuhtauksien poisto jättää helpoimmin jälkiä. Siksi sillä on ehdot jo ennen tekniikkaa: tee sitä vain, jos olet saanut koulutuksen ja jos työpaikkasi määräykset ja salonki sen sallivat. Silloinkin työtapa on varovainen:" },
        {
          ul: [
            "Käytä aina suojakäsineitä.",
            "Kiedo pehmeää paperia sormenpäiden ympärille ja paina mustapään molemmin puolin hyvin kevyesti.",
            "Ei kynsiä, ei kovaa puristamista eikä väkisin poistamista. Jos mustapää ei irtoa, jätä se.",
            "Muutama pieni lyhyessä ajassa riittää.",
          ],
        },
        { h3: "Komedonipuristin on steriloitava" },
        { p: "Metalliset komedonipuristimet ja kaikki muut välineet, jotka voivat rikkoa ihon, puhdistetaan ja steriloidaan jokaisen asiakkaan jälkeen ja säilytetään suljetussa pussissa. Pelkkä alkoholipyyhintä ei riitä. [Helsingin kaupungin hygieniaohjeessa](https://www.hel.fi/static/liitteet-2019/Kymp/asuminen-ja-ymparisto/ymparistoterveys/Hygiene-premises-instructions.pdf) sanotaan suoraan, että mustapääpuristimet on steriloitava. Lansetit ovat kertakäyttöisiä, ja niitä käytetään vain, jos paikalliset määräykset sallivat. Sterilointi käydään läpi oppitunnilla [Välineet jokaisen asiakkaan jälkeen](lesson:ve-sinh-dung-cu)." },
        { img: { src: img("dung-cu-lay-nhan-mun-trong-tui-tiet-trung"), alt: "Marmorinen hoitovaunun taso, jolla on teräksinen komedonipuristin suljetussa sterilointipussissa, kolme erikseen pakattua lansettia, vanulappuja, paperia ja mustat käsineet", caption: "Puristin pysyy suljetussa sterilointipussissa; lansetit on pakattu erikseen ja käytetään kerran." } },
        { note: "Se, kuinka pitkälle ekstraktiossa saa mennä ja saako lansetteja käyttää lainkaan, määräytyy työpaikkasi säännöistä, ja ne vaihtelevat maittain. Helsingin hygieniaohje on yksi paikallinen esimerkki.Artikkeli on koulutusmateriaalia, ei ammattipätevyys.", kind: "warn", title: "Määräykset vaihtelevat maittain" },
      ],
    },
    {
      id: "naamio-ja-voiteet",
      title: "Naamio, kasvovesi, kosteusvoide ja aurinkosuoja",
      blocks: [
        { p: "Kun iho on puhdas ja selkeä, on ravitsemisen vuoro. Myös naamio valitaan ihotyypin mukaan:" },
        {
          table: {
            head: ["Naamio", "Sopii"],
            rows: [
              ["Savinaamio", "Rasvaiselle ja tukkoiselle iholle"],
              ["Voide- tai geelinaamio", "Kuivalle, kuivuneelle ja herkälle iholle"],
            ],
          },
        },
        { p: "Naamio levitetään siveltimellä tasaisesti silmiä, sieraimia ja huulia välttäen, ja se pidetään iholla valmistajan ajan. Savinaamiota ei pidä antaa kuivua ja halkeilla liian pitkään kuivalla iholla." },
        { img: { src: img("dap-mat-na-dat-set-bang-co"), alt: "Kosmetologi levittää siveltimellä vaaleanvihreää savinaamiota asiakkaan kasvoille ja jättää vanulapuin peitetyt silmät, sieraimet ja huulet paljaiksi" } },
        { p: "Kasvohieronta rentouttaa asiakasta; osa hoitoloista tekee sen ennen naamiota, osa jälkeen. Sillä on oma artikkelinsa: [kasvohieronta, ymmärrä ennen kuin aloitat](lesson:spa-massage-mat-hieu-dung)." },
        { p: "Hoito päättyy kasvoveteen, joka pyyhitään tai taputellaan kevyesti, ja ihotyypille sopivaan kosteusvoiteeseen, joka sitoo kosteutta ja suojaa ihon suojamuuria. Aamulla tai päivällä aurinkosuoja on aivan viimeinen vaihe. Se on myös hyödyllisin neuvo asiakkaalle: aurinkosuoja joka aamu on kotona hyvin tärkeä tapa, etenkin kuorinnan jälkeen." },
      ],
    },
    {
      id: "hygienia-ja-ihoreaktio",
      title: "Hygienia, tuotteen testaus ja toiminta ihoreaktiossa",
      blocks: [
        { p: "Ihonhoidon hygienia on helppo aliarvioida: ei viiloja, ei pihtejä eikä näkyvää pölyä. Neljä asiaa on kiinteä osa jokaista asiakasta:" },
        {
          ul: [
            "Pese kädet ennen jokaista asiakasta.",
            "Ota voide purkista puhtaalla lastalla, älä koskaan sormin.",
            "Siveltimet, kulhot ja välineet: kertakäyttöisiä tai puhdistetaan ja desinfioidaan jokaisen asiakkaan jälkeen.",
            "Pyyhkeet, otsapanta ja lakanat: puhtaat jokaiselle asiakkaalle.",
          ],
        },
        { img: { src: img("lay-kem-duong-bang-que-sach"), alt: "Kosmetologi ottaa voidetta valkoisesta purkista pienellä puulastalla marmorisella hoitovaunulla, ja taustalla asiakas makaa hoitopöydällä" } },
        { note: "Monen asiakkaan yhteinen purkki saastuu kaikille seuraaville yhdestäkin sormesta. Pidä aina puhtaita lastoja valmiina hoitovaunulla.", kind: "tip", title: "Ammattilaisen vinkki" },
        { h3: "Uusi tuote testataan pienelle ihoalueelle" },
        { p: "Kun käytät asiakkaalle uutta tuotetta, etenkin jos hänen ihonsa on herkkä tai hänellä on ollut allergioita, testaa tuote ensin pienelle ihoalueelle valmistajan ohjeen mukaan. Testi ei ole ehdoton tae, mutta se ehkäisee monta reaktiota. Oppitunti [Allergiat ja kemikaalit](lesson:di-ung-hoa-chat) kertoo tästä tarkemmin." },
        { img: { src: img("thu-san-pham-tren-vung-da-nho-o-canh-tay"), alt: "Kosmetologi taputtelee vanupuikolla hieman voidetta valkoiseen kylpytakkiin pukeutuneen asiakkaan kyynärvarren sisäpuolelle tuotteen testaamiseksi" } },
        { h3: "Iho punoittaa, kirvelee tai kutisee kesken hoidon" },
        { p: "Pysähtymisen merkkejä ovat punoitus, kirvely, voimakas kutina tai pistely, joka ei mene ohi. Toimi silloin tässä järjestyksessä:" },
        {
          ol: [
            "Lopeta tuotteen käyttö heti.",
            "Huuhtele kevyesti viileällä vedellä ja laita viileä kääre.",
            "Älä levitä päälle toista tuotetta korjataksesi tilannetta.",
            "Kirjaa tuotteen nimi, eränumero ja tapahtumat.",
          ],
        },
        { img: { src: img("dap-bong-mat-khi-da-mat-bi-do-rat"), alt: "Kosmetologi painaa viileää, kosteaa vanulappua hoitopöydällä makaavan asiakkaan punoittavaa poskipäätä vasten ja tukee toisella kädellä kevyesti kasvojen sivua" } },
        { note: "Kasvojen tai huulten turvotus tai hengitysvaikeus on vakava reaktio: soita heti 112 tai paikalliseen hätänumeroon. Kunkin tilanteen hoito käydään läpi oppitunnilla [Ensiapu kauneushoitolassa](lesson:xu-ly-su-co).", kind: "warn", title: "Milloin soitetaan hätänumeroon" },
        { p: "Kirjaukset tekevät seuraavasta käynnistä turvallisemman. VaraaAissa merkitset [asiakasrekisterin](lesson:khach-hang) sisäisiin muistiinpanoihin käytetyt tuotteet, mahdollisen reaktion ja eränumeron, jotta ne voidaan välttää ensi kerralla." },
      ],
    },
  ],
  faq: [
    {
      q: "Mitä kasvohoidossa tehdään?",
      a: "Peruskasvohoidon järjestys on puhdistus, kuorinta, ihon lämmitys pyyhkeellä tai höyryllä, tarvittaessa ekstraktio, naamio ja hieronta, kasvovesi, kosteusvoide ja päivällä aurinkosuoja. Hoito etenee puhtaasta selkeään ja sitten ihon ravitsemiseen ja suojaamiseen.",
    },
    {
      q: "Miksi kasvohoidossa iho puhdistetaan kahdesti?",
      a: "Ensimmäinen puhdistus poistaa meikin ja aurinkosuojan. Toisessa käytetään ihotyypille sopivaa puhdistusainetta, joka puhdistaa itse ihon. Ilman toista puhdistusta sen jälkeen levitetyt tuotteet jäävät vain jäämäkerroksen päälle.",
    },
    {
      q: "Mitä tapahtuu, jos ihoa kuorii liikaa?",
      a: "Liian voimakas tai toistuva kuorinta, etenkin kotona käytettyjen happojen tai retinoidien päälle, voi vaurioittaa ihon suojamuuria. Muutaman päivän päästä iho punoittaa, on arka, kirvelee voidetta levitettäessä ja hilseilee joskus laikkuina. Toipuminen vie aikaa, joskus muutaman viikon.",
    },
    {
      q: "Sopiiko kasvohöyry herkälle iholle?",
      a: "Ei sovi. Lämpö saa herkän, punoittavan ihon punoittamaan entistä enemmän. Hyvin herkällä tai punoittavalla iholla tai kun pienet verisuonet näkyvät, höyry jätetään pois tai korvataan viileällä, kostealla pyyhkeellä.",
    },
    {
      q: "Onko mustapäiden poisto kasvohoidossa turvallista?",
      a: "Ekstraktio on vaihe, joka väärin tehtynä vahingoittaa ihoa helpoimmin. Tekijällä on oltava koulutus ja paikallisten määräysten lupa, hän käyttää käsineitä, kietoo paperia sormenpäiden ympärille, painaa hyvin kevyesti ja jättää irtoamattoman mustapään rauhaan. Komedonipuristin puhdistetaan ja steriloidaan jokaisen asiakkaan jälkeen, ja määräykset vaihtelevat maittain.",
    },
    {
      q: "Mitä tehdä, jos iho punoittaa ja kirvelee kasvohoidon aikana?",
      a: "Lopeta tuotteen käyttö heti, huuhtele iho kevyesti viileällä vedellä ja laita viileä kääre. Älä levitä toista tuotetta päälle, ja kirjaa tuotteen nimi ja eränumero. Jos kasvot tai huulet turpoavat tai hengittäminen vaikeutuu, soita 112 tai paikalliseen hätänumeroon.",
    },
  ],
  related: ["spa-facial", "spa-soi-da-hieu-dung", "spa-massage-mat-hieu-dung", "di-ung-hoa-chat"],
};

export default article;
