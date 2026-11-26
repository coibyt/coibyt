import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cat-nu-bang-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "mika-on-polkkatukka",
  lesson: "cat-nu-bang-hieu-dung",
  category: "hair",
  title: "Mikä on polkkatukka? Suora, A-linjainen ja porrastettu polkka sekä miksi linja menee vinoon",
  metaTitle: "Mikä on polkkatukka? Suora, A-linja ja porrastettu polkka",
  metaDescription:
    "Mikä on polkkatukka ja tasapitkä leikkaus, kolme yleistä polkkamallia, pituuden valinta kaulan, niskan ja hartioiden mukaan, nostokulma 0° ja vinon linjan syyt.",
  keyword: "polkkatukka",
  keywords: [
    "mikä on tasapitkä leikkaus",
    "polkkatukka mallit",
    "A-linjainen polkka",
    "porrastettu polkka",
    "olkapäille ulottuvat hiukset kääntyvät ulos",
    "polkkatukka kiharille hiuksille",
    "miksi polkka on vino",
  ],
  excerpt: "Polkassa on vain yksi linja, joten pienikin heitto näkyy. Mitä tasapitkä leikkaus on, kolme polkkamallia ja ne pienet asiat, jotka pitävät linjan suorana.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("toc-bob-bang-ngang-cam-duong-cat-thang"),
    alt: "Hunajanvaalea nainen istuu kultakehyksisen soikean peilin vieressä keskijakauksellisessa suorassa polkassa, jonka latvat on leikattu suoraan juuri leuan alapuolelle",
  },
  takeaways: [
    "Tasapitkä leikkaus tarkoittaa, että jokainen hius pysähtyy luonnollisesti laskeutuessaan **samaan linjaan**. Leuan tienoille leikattuna sitä kutsutaan yleensä polkaksi.",
    "Sovi pituus **kosketuskohdalla** asiakkaan kehossa, esimerkiksi leuan kohdalla, älä sanoilla ”lyhyt” tai ”vähän”.",
    "Tasapitkä linja leikataan luonnollisessa laskussa **nostokulmalla 0°**, kevyellä ja tasaisella vedolla. Pienikin nosto tekee siitä kerroksellisen.",
    "Juuri olkapäille päättyvä hius osuu niihin ja kääntyy ulos. Valitse olkapäiden yläpuoli tai selvästi alempi pituus.",
    "Älä vedä hiusta kireälle korvan yli, ja suorista asiakkaan pää aina ennen kuin vertaat puolia.",
  ],
  intro: [
    "Polkkatukka on tasapitkä leikkaus, joka on leikattu lyhyeksi leuan tienoille: kaikki hiukset laskeutuvat samaan linjaan, eikä kerroksia ole. Se kuulostaa helpoimmalta leikkaukselta. Mutta juuri siksi, että linjoja on vain yksi, pienikin heitto näkyy asiakkaalle peilistä heti.",
    "Artikkeli seuraa VaraaAi Academyn Hiukset-kurssin oppituntia ”Tasapituinen leikkaus ja polkka: ymmärrä ne, niin linja on suora ja tasapainoinen”, joka on aiheen teoriaosa. Luettuasi erotat kolme polkkamallia toisistaan, osaat neuvoa pituudessa asiakkaan kaulan, niskan ja hartioiden perusteella ja ymmärrät ne pienet asiat, jotka ratkaisevat linjan: nostokulman, vedon, ohjauslinjan ja pään asennon. Itse leikkaus vaihe vaiheelta on artikkelissa [polkkatukan leikkaus](lesson:cat-nu-bang).",
  ],
  sections: [
    {
      id: "mika-on-tasapitka-leikkaus",
      title: "Mikä on tasapitkä leikkaus ja milloin se on polkka",
      blocks: [
        { p: "Tasapitkässä leikkauksessa jokainen hius pysähtyy luonnollisesti laskeutuessaan samaan linjaan. Linja voi olla hartioiden kohdalla, solisluiden kohdalla tai niinkin lyhyt kuin leuan tienoilla. Leuan tienoille leikattuna sitä kutsutaan yleensä polkaksi." },
        { p: "Oikein leikatun tasapitkän linjan tunnistaa kolmesta asiasta. Takaa katsottuna linja on vaakasuora. Sivulta katsottuna se kulkee lattian suuntaisesti. Ja latvat näyttävät paksuilta, painavilta ja kiiltäviltä, koska jokainen hius päättyy samaan kohtaan." },
        { img: { src: img("toc-bob-bang-nhin-tu-phia-sau-duong-cat-ngang"), alt: "Hunajanvaalea polkka suoraan takaa kuvattuna, latvat muodostavat yhden vaakasuoran linjan kaulan puolivälissä mustan leikkuuviitan kauluksen yläpuolella", caption: "Takaa katsottuna: yksi suora vaakalinja ja paksut, tasaiset latvat." } },
      ],
    },
    {
      id: "polkkamallit",
      title: "Polkkatukka mallit: suora, A-linjainen ja porrastettu polkka",
      blocks: [
        { p: "Kampaamossa tulee vastaan toistuvasti kolme polkkamallia. Suora polkka on kahden muun pohja, ja siksi koulutus alkaa yleensä siitä." },
        {
          table: {
            head: ["Polkkamalli", "Leikkuulinja", "Miltä se näyttää"],
            rows: [
              ["Suora polkka", "Yksi vaakasuora linja koko pään ympäri", "Siisti ja terävä, latvat painavat"],
              ["A-linjainen polkka", "Vino linja: takaa lyhyempi, kasvoja kohti pitenevä", "Profiilissa latvat laskevat kohti leukaa"],
              ["Porrastettu polkka", "Niska leikataan pienellä nostokulmalla, hiukset kerrostuvat", "Pyöreä volyymi takaraivolla"],
            ],
          },
        },
        { img: { src: img("toc-bob-chu-a-sau-ngan-truoc-dai"), alt: "Tummanruskeatukkainen nainen, jolla on suora otsatukka, profiilissa A-linjaisessa polkassa, joka on niskasta lyhyt ja pitenee kohti leukaa", caption: "A-linjainen polkka: vino linja, takaa lyhyt ja edestä pidempi." } },
        { img: { src: img("toc-bob-xep-tang-phong-o-gay"), alt: "Vaalea nainen profiilissa porrastetussa polkassa, niskan hiukset on leikattu lyhyiksi ja kerrostetuiksi, jolloin takaraivolle syntyy pyöreä volyymi", caption: "Porrastettu polkka: niska kerrostettu, takaraivo pyöreä." } },
        { note: "Polkkamallien nimitykset ja opetustavat vaihtelevat kouluittain ja maittain. Kun asiakas pyytää mallia nimeltä, katsokaa mallikuvaa yhdessä äläkä luota pelkkään nimeen. Artikkeli on harjoitusmateriaalia eikä korvaa ammatillista tutkintoa.", kind: "info", title: "Nimet vaihtelevat" },
      ],
    },
    {
      id: "pituuden-valinta",
      title: "Polkan pituuden valinta: kosketuskohta, kaula, niskapyörre ja hartiat",
      blocks: [
        { p: "Pitkistä hiuksista polkkaan on valtava muutos, joten pituudesta on sovittava erityisen selvästi. Ota suortuva käteen, taita se juuri oikeaan kohtaan ja kysy: leikataanko tähän, leuan kohdalle, onko näin oikein? Kosketuskohdalla sopimista käsitellään tarkemmin artikkelissa [konsultaatio ennen hiustenleikkausta](lesson:toc-tu-van-chia-vung-hieu-dung)." },
        { img: { src: img("thong-nhat-do-dai-toc-bob-bang-diem-cham-ngang-cam"), alt: "Kampaaja pitää kämmentä vaakatasossa juuri hymyilevän pitkähiuksisen asiakkaan leuan alapuolella ja näyttää, mihin pituuteen leikataan", caption: "Kosketuskohta leuan kohdalla: näytä se asiakkaasta, älä sano ”lyhyt” tai ”vähän”." } },
        { p: "Kysy myös, laittaako asiakas hiuksia usein kiinni tai korvien taakse. Leuan mittaisesta polkasta hiuksia tuskin saa enää kiinni, ja asiakkaan on tiedettävä se ennen leikkausta. Katso sitten asiakkaan olemusta:" },
        {
          ul: [
            "**Pitkä vai lyhyt kaula.** Siinä kohdassa, missä polkkalinja pysähtyy kaulalla, pysähtyy myös katse.",
            "**Niskapyörre.** Jos niskan hiukset kasvavat ylöspäin, liian lyhyt polkkalinja niskassa törröttää helposti. Pidä linja pyörteen alapuolella tai vähän pidempänä.",
            "**Hartiat.** Juuri hartioille päättyvät hiukset osuvat niihin joka liikkeellä ja kääntyvät ulospäin. Valitse hartioiden yläpuoli tai selvästi niiden alapuoli.",
          ],
        },
        { img: { src: img("xoay-o-chan-toc-gay-truoc-khi-cat-bob"), alt: "Kampaaja nostaa yhdellä kädellä kaikki asiakkaan vaaleat hiukset korkealle, jolloin niska ja niskan hiusraja tulevat näkyviin", caption: "Nosta hiukset ja katso niskan hiusraja ennen kuin päätät, mihin polkkalinja tulee." } },
      ],
    },
    {
      id: "nostokulma-ja-veto",
      title: "Nostokulma 0° ja veto: miksi tasapitkä kammataan suoraan alas",
      blocks: [
        { p: "Tasapitkä leikkaus leikataan hiusten luonnollisen laskeuman mukaan. Kampaat hiukset suoraan alas, juuri siihen, mihin ne laskeutuvat, nostokulmalla 0°, eli hiuksia ei nosteta lainkaan. Pienikin nosto tekee kerroksista eri pituisia, kun ne laskeutuvat, ja linjasta tulee kerroksellinen. Miten nostokulma synnyttää kerroksia, kerrotaan artikkelissa [mikä on kerrosleikkaus](lesson:cat-nu-tang-hieu-dung)." },
        { p: "Vedon on myös oltava kevyt ja tasainen. Jos vedät liian kireälle, varsinkin märkiä hiuksia, ne nousevat kuivuessaan aiottua lyhyemmiksi ja epätasaisiksi." },
        { h3: "Märät, kuivat ja kiharat hiukset" },
        { p: "Suoratkin hiukset nousevat kuivuessaan hieman. Laineikkaat ja kiharat hiukset nousevat paljon enemmän. Siksi kampaaja jättää kiharat hiukset aiottua pidemmiksi tai leikkaa ne kuivina tekniikalla, johon hän on saanut koulutuksen." },
        { img: { src: img("toc-xoan-khi-uot-keo-thang-dai-qua-vai"), alt: "Märkäkiharainen kastanjanruskea nainen, jonka kampaaja vetää yhden kiharan suoraksi alaspäin, ja venytetty kihara ulottuu olkapään ohi", caption: "Kiharat märkinä: suoraksi vedettynä ne ulottuvat olkapäiden ohi." } },
        { img: { src: img("toc-xoan-khi-kho-co-len-ngan-hon"), alt: "Sama nainen hiukset kuivina, ruskeat kiharat ovat nousseet leuan ja hartioiden tienoille, ja kampaaja nostaa yhtä kiharaa kevyesti sormenpäällä", caption: "Samat hiukset kuivina: kiharat nousevat ja ovat paljon lyhyemmät kuin märkinä." } },
      ],
    },
    {
      id: "ohjauslinja-ja-paan-asento",
      title: "Kiinteä ohjauslinja niskassa ja asiakkaan pään asento",
      blocks: [
        { p: "Kun hiukset on jaettu siististi ja suoraan, kampaaja aloittaa niskasta hyvin ohuella vaakasuoralla suortuvalla. Se on **ohjauslinja**. Jokainen seuraava kerros kammataan suoraan alas ja leikataan täsmälleen siihen. Ohjauslinja pysyy yhdessä paikassa ja muut kerrokset tuodaan sen luo, siksi sitä kutsutaan kiinteäksi ohjauslinjaksi." },
        { img: { src: img("lop-toc-chai-thang-xuong-phu-len-duong-chuan-o-gay"), alt: "Takaa kuvattuna asiakkaan hiukset on kiinnitetty ylös, ja kampaaja pitää mustalla kammalla ohutta suoraan niskaan kammattua kerrosta, jonka latvat on leikattu vaakasuoraan", caption: "Ohut kerros kammattuna suoraan alas niskaan. Ohuesta suortuvasta alla oleva ohjauslinja näkyy." } },
        { p: "Suortuvien on oltava ohuita, koska ohjauslinjan pitää näkyä hiusten läpi. Liian paksuilla suortuvilla vain arvaat." },
        { h3: "Leuka alas niskaa leikatessa, pää suoraan sivuja varten" },
        { p: "Niskaa leikatessa asiakas kallistaa päätä hieman eteenpäin, leuka vähän alas. Niska oikenee, hiukset asettuvat lähelle kaulaa ja linja on helppo nähdä. Mutta mitä enemmän hän taivuttaa päätä, sitä enemmän linja muuttuu, kun hän nostaa sen. Siksi pää taivutetaan kohtuullisesti ja sama asento pidetään, kunnes takaosa on valmis." },
        { p: "Ennen kuin siirryt sivuille, pyydä asiakasta nostamaan pää taas suoraan, istumaan suorassa ja avaamaan jalat rististä. Epätasaiset hartiat tai kallistunut pää tarkoittavat epätasaista linjaa." },
        { h3: "Korvat" },
        { p: "Korva on ulkoneva ja työntää hiuksia ulospäin. Jos vedät hiukset kireälle korvan yli ja leikkaat, korva työntää ne irti päästäessäsi ylös, ja juuri korvan yläpuolelle jää lovi. Kampaa siis korvan kohdalla hiukset laskeutumaan luonnollisesti ja pidä niistä hyvin kevyesti, ilman vetoa. Jotkut kampaajat tukevat hiuksia kammalla ihoa vasten ennen leikkaamista." },
      ],
    },
    {
      id: "miksi-polkka-on-vino",
      title: "Miksi polkka on vino tai kääntyy ulos ja miten sen tarkistat",
      blocks: [
        {
          table: {
            head: ["Mitä näet", "Syy", "Miten vältät"],
            rows: [
              ["Linjaan tulee kerroksia, latvat ohenevat", "Hiuksia nostettiin vahingossa", "Kampaa suoraan alas, nostokulma 0°"],
              ["Kuivana lyhyempi ja epätasainen", "Märkiä hiuksia vedettiin kireälle", "Kevyt, tasainen veto; kiharat pidemmiksi"],
              ["Lovi juuri korvan yläpuolella", "Hiukset vedettiin kireälle korvan yli", "Anna laskeutua luonnollisesti, pidä kevyesti"],
              ["Toinen puoli pidempi", "Kallistunut pää, vinot hartiat, jalat ristissä", "Asiakas istuu suorassa, pää suoraan ennen sivuja"],
              ["Latvat törröttävät niskassa", "Niskapyörre ja liian lyhyt linja", "Pidä linja pyörteen alapuolella"],
              ["Latvat kääntyvät ulospäin", "Hiukset päättyvät juuri hartioille", "Hartioiden yläpuolelle tai selvästi alemmas"],
            ],
          },
        },
        { p: "Tarkistaminen kuuluu koko käsittelyyn, ei vain loppuun. Vertaa jokaisen sivun jälkeen molempia puolia peilistä: pidä kumpaakin etulatvaa kasvojen edessä samalla korkeudella. Katso sitten takaa ja sivulta, kummaltakin puolelta. Linjan on oltava yhtenäinen, ilman kulmia ja portaita." },
        { img: { src: img("so-hai-duoi-toc-bob-truoc-mat-khach"), alt: "Suoraan eteenpäin katsovan asiakkaan takana seisova kampaaja pitää polkan kumpaakin latvaa leuan molemmin puolin ja vertaa niiden pituutta", caption: "Pää suorassa, katse eteenpäin, molemmat latvat samalla korkeudella." } },
        { note: "Kun pää kallistuu vähänkin, puolet näyttävät epätasaisilta, vaikka olisit leikannut ne oikein. Suorista asiakkaan pää aina ennen vertailua.", kind: "tip", title: "Ammattilaisen vinkki" },
        { p: "Föönauksen jälkeen tarkista vielä kerran, koska nyt hiukset asettuvat juuri niin kuin asiakas näkee ne kotona. Leikkaa törröttävät yksittäiset hiukset kevyesti saksien kärjillä. Jos asiakas pitää pehmeämmistä latvoista, tee pistoleikkausta: käännä sakset pystyyn ja leikkaa latvoihin pieniä loveja, jolloin linja on vähemmän jyrkkä mutta säilyttää muotonsa. Jos hän pitää terävästä, selkeälinjaisesta polkasta, pidä linja suorana äläkä tee pistoleikkausta." },
      ],
    },
    {
      id: "turvallisuus-ja-kirjaus",
      title: "Turvallisuus, hygienia ja pituuden kirjaaminen seuraavaa kertaa varten",
      blocks: [
        { note: "Kun leikkaat lähellä kaulaa, sormesi ovat aina terän ja asiakkaan ihon välissä, eivätkä saksien kärjet koskaan osoita asiakkaan kasvoja kohti. Sakset, kammat ja klipsit puhdistetaan ja desinfioidaan jokaisen asiakkaan jälkeen tuotteen ohjeen mukaan, ja kaulapaperit ovat kertakäyttöisiä. Määräykset vaihtelevat maittain; katso myös [välineiden puhdistus ja desinfiointi](lesson:ve-sinh-dung-cu).", kind: "warn", title: "Turvallisuus kaulan lähellä" },
        { p: "Kaunis polkkalinja ei synny kalliista saksista. Se syntyy ohuista suortuvista, kevyestä vedosta, oikeasta pään asennosta ja monesta tarkistuksesta. Kirjaa VaraaAissa leikattu pituus ja kosketuskohta asiakkaan muistiinpanoihin [asiakastiedoissa](lesson:khach-hang), jotta seuraava leikkaaja osuu oikeaan. Jos salongissa on sekä uusi polkka että polkan tasaus, tee niistä kaksi palvelua omilla kestoillaan [palveluvalikoimaan](lesson:dich-vu) ja merkitse seuraava tasaus salongin [ajanvarauskalenteriin](lesson:lich-hen) asiakkaan ollessa vielä kassalla." },
      ],
    },
  ],
  faq: [
    {
      q: "Mikä on polkkatukka?",
      a: "Polkkatukka on tasapitkä leikkaus, joka ulottuu leuan tienoille. Tasapitkä tarkoittaa, että jokainen hius pysähtyy luonnollisesti laskeutuessaan samaan linjaan eikä kerroksia ole. Takaa linja on vaakasuora ja sivulta lattian suuntainen.",
    },
    {
      q: "Mitä eroa on suoralla, A-linjaisella ja porrastetulla polkalla?",
      a: "Suorassa polkassa linja on vaakasuora koko pään ympäri. A-linjaisessa polkassa linja on vino, takaa lyhyempi ja kasvoja kohti pitenevä. Porrastetussa polkassa niska leikataan pienellä nostokulmalla, jolloin hiukset kerrostuvat ja takaraivolle syntyy pyöreä volyymi. Nimitykset voivat vaihdella paikasta toiseen.",
    },
    {
      q: "Miksi olkapäille ulottuvat hiukset kääntyvät ulos?",
      a: "Koska latvat päättyvät juuri olkapäille. Joka liikkeellä ne osuvat olkapäihin ja kääntyvät ulospäin. Tasapitkässä leikkauksessa kannattaa valita pituus olkapäiden yläpuolelta tai selvästi niiden alapuolelta.",
    },
    {
      q: "Sopiiko polkkatukka kiharille hiuksille?",
      a: "Sopii, mutta kutistuminen on otettava huomioon. Laineikkaat ja kiharat hiukset nousevat kuivuessaan paljon enemmän kuin suorat, joten kampaaja jättää ne aiottua pidemmiksi tai leikkaa ne kuivina oppimallaan tekniikalla. Asiakkaan on hyvä kuulla tästä jo konsultaatiossa.",
    },
    {
      q: "Saako polkkatukan kiinni?",
      a: "Leuan mittaista polkkaa tuskin saa enää kiinni. Siksi kampaajan kannattaa kysyä ennen leikkausta, laittaako asiakas hiuksia usein kiinni tai korvien taakse, ja sopia pituus vasta sitten.",
    },
    {
      q: "Miksi tasapitkä leikkaus on puolilta epätasainen?",
      a: "Tavallisin syy on asento: kallistunut pää, vinot hartiat tai ristissä olevat jalat sivuja leikattaessa. Märkien hiusten vetäminen kireälle tai hiusten vetäminen korvan yli lyhentää niitä myös irti päästettäessä. Istuta asiakas suoraan, pidä veto kevyenä ja vertaa etulatvoja pää suorassa.",
    },
  ],
  related: ["cat-nu-bang", "toc-tu-van-chia-vung-hieu-dung", "cat-nu-tang-hieu-dung", "cat-mai-hieu-dung"],
};

export default article;
