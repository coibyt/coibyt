import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cat-nu-tang-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "mika-on-kerrosleikkaus",
  lesson: "cat-nu-tang-hieu-dung",
  category: "hair",
  title: "Mikä on kerrosleikkaus? Nostokulmat 0°, 45°, 90° ja 180° ja miten pituus säilyy",
  metaTitle: "Mikä on kerrosleikkaus? Nostokulmat ja pituuden säilytys",
  metaDescription:
    "Mikä on kerrosleikkaus, mitä kerrokset vievät latvoista, sopiiko se ohuille hiuksille, nostokulmat 0°, 45°, 90° ja 180°, ohjauslinjat ja neljä yleistä virhettä.",
  keyword: "kerrosleikkaus",
  keywords: [
    "kerrosleikkaus vai tasapitkä",
    "kerrosleikkaus ohuille hiuksille",
    "nostokulma hiustenleikkauksessa",
    "lyheneekö tukka kerrosleikkauksessa",
    "liikkuva ja kiinteä ohjauslinja",
    "kasvoja kehystävät kerrokset",
    "kerrosleikkauksen virheet",
  ],
  excerpt: "Kerrokset keventävät hiuksia ja tuovat volyymia, mutta vievät latvoista painoa. Nostokulma ja vetosuunta ratkaisevat, mihin kerrokset tulevat ja paljonko pituutta jää.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("toc-tang-dai-co-tang-om-mat-sau-khi-cat"),
    alt: "Hunajanvaalea nainen, jonka olkapäiden ohi ulottuviin hiuksiin on juuri leikattu kerrokset ja leuan kohdalta alkavat kasvoja kehystävät suortuvat, istuu pariisilaistyylisessä salongissa",
  },
  takeaways: [
    "Kerrosleikkauksessa ylemmät hiukset ovat alempia lyhyempiä. Hiukset kevenevät ja saavat volyymia, mutta **latvat menettävät painoa**.",
    "Paksut, raskaat hiukset sopivat kerroksille. Ohuet ja harvat hiukset tarvitsevat **vähän ja pitkiä kerroksia**, muuten latvat jäävät läpikuultaviksi.",
    "Kun kerrosten halutaan säilyttävän pituuden, päälaki nostetaan **180°** suoraan ylös. 90° koko päähän vie pitkistä hiuksista pituuden.",
    "Mitä kauempana hius on kiinteästä ohjauslinjasta, sitä pidemmäksi se jää. Vedä etuhiukset taakse säilyttääksesi pituuden edessä, eteen kehystääksesi kasvoja.",
    "Aiottua pidempi aloitus, seisominen suoraan suortuvan edessä ja tiheä ristiintarkistus estävät kaikki neljä yleistä virhettä.",
  ],
  intro: [
    "Kerrosleikkaus on se, mitä lähes jokainen pitkähiuksinen asiakas pyytää samoin sanoin: haluan hiuksiini keveyttä, volyymia ja liikettä, mutta älä leikkaa niitä lyhyiksi. Yksinkertaisesti sanottuna kerrosleikkauksessa päällimmäiset hiukset leikataan alla olevia lyhyemmiksi, jolloin ne menevät limittäin kuin kattotiilet. Asiakkaan toive on täysin toteutettavissa, kunhan kampaaja ymmärtää yhden asian todella selvästi: nostokulman.",
    "Artikkeli seuraa VaraaAi Academyn Hiukset-kurssin oppituntia ”Kerrosleikkaus: ymmärrä se, niin saat keveyttä menettämättä pituutta”, joka on aiheen teoriaosa. Luettuasi tiedät, mitä kerrokset tekevät ja mitä ne vievät, kuinka paljon kerroksia mikin tukka kestää, mitä neljä nostokulmaa saavat aikaan ja miksi vetosuunta ratkaisee etupituuden. Käytännön työvaiheet ovat artikkelissa [pitkien hiusten kerrosleikkaus](lesson:cat-nu-tang).",
  ],
  sections: [
    {
      id: "kerrokset-vai-tasapitka",
      title: "Mikä on kerrosleikkaus ja miten se eroaa tasapitkästä",
      blocks: [
        { p: "Tasapitkässä leikkauksessa jokainen hius pysähtyy samaan linjaan. Koko paino on latvoissa, joten linja näyttää paksulta ja painavalta, kuten polkassa." },
        { img: { src: img("toc-cat-bang-duong-vien-thang-goc-0-do"), alt: "Hunajanvaalea polkka takaa kuvattuna, latvat muodostavat yhden paksun ja tasaisen vaakalinjan niskan puolivälissä", caption: "Tasapitkä: jokainen hius pysähtyy samaan linjaan, ja koko paino on latvoissa." } },
        { p: "Kerrosleikkauksessa päällimmäiset hiukset ovat alempia lyhyempiä. Kerrokset limittyvät, latvat kevenevät ja hiukset saavat volyymia ja liikettä. Pitkät hiukset tuntuvat vähemmän raskailta, painuvat vähemmän päätä vasten ja ovat helpompia muotoilla föönatessa." },
        { p: "Kerrosten hinta on **latvojen paino**. Jokainen lisäkerros on hiusta, joka ei enää ulotu ulkolinjaan asti. Paksuissa hiuksissa juuri sitä asiakas haluaa. Hienoissa ja harvoissa hiuksissa liian monta kerrosta tekee latvoista ohuet ja läpikuultavat, ja ne näyttävät rispaantuneilta. Siksi kampaajan ensimmäinen kysymys on, kuinka paljon kerroksia nämä hiukset kestävät, ja vasta sitten, mikä malli leikataan." },
      ],
    },
    {
      id: "kenelle-kerrokset-sopivat",
      title: "Ohuet, paksut tai kiharat hiukset: sopiiko kerrosleikkaus",
      blocks: [
        { p: "Ennen kuin otat sakset käteen, lue hiukset kuten artikkelissa [konsultaatio ennen hiustenleikkausta](lesson:toc-tu-van-chia-vung-hieu-dung): paksut vai hienot, suorat vai kiharat ja missä pyörteet ovat. Sama kerrosmalli neljässä eri tukassa antaa neljä eri tulosta." },
        { img: { src: img("doc-mai-toc-truoc-khi-cat-tang"), alt: "Kampaaja jakaa molemmin käsin asiakkaan kuivat vaaleat hiukset suoraa linjaa pitkin päälaelta nähdäkseen, kuinka paksut ne ovat" } },
        {
          table: {
            head: ["Hiukset", "Mitä kerrokset tekevät", "Miten leikataan"],
            rows: [
              ["Paksut, raskaat", "Keventävät, latvoissa vähemmän massaa", "Sopivat kerroksille, ne saavat näkyä selvästi"],
              ["Hienot, harvat", "Latvat ohenevat ja rispaantuvat helposti", "Vähän ja pitkiä kerroksia, jotta latvat pysyvät paksuina"],
              ["Kiharat", "Antavat kiharoille muodon", "Aiottua pidemmiksi tai kuivina oppimallasi tekniikalla"],
              ["Pyörre päälaella", "Lyhyet kerrokset nousevat siinä pystyyn", "Jätä pyörteen kohdan kerrokset riittävän pitkiksi"],
            ],
          },
        },
        { img: { src: img("toc-xoan-co-len-khi-kho"), alt: "Kuivakiharainen kastanjanruskea nainen, jonka yhtä kiharaa kampaaja nostaa kevyesti sormenpäällä, ja kihara ponnahtaa takaisin ylös", caption: "Kiharat nousevat kuivuessaan paljon. Märkä pituus ei ole se pituus, jolla asiakas lähtee kotiin." } },
        { img: { src: img("xoay-toc-o-dinh-dau"), alt: "Lähikuva tummanruskeatukkaisen miehen päälaesta, jossa hiukset kasvavat myötäpäivään kiertyvänä pyörteenä yhdestä kohdasta", caption: "Pyörre päälaella. Liian lyhyiksi leikatut kerrokset eivät asetu siinä alas." } },
        { note: "Ohuthiuksinen asiakas, joka pyytää ”paljon kerroksia, jotta hiukset näyttävät paksummilta”, on hyvin tavallinen tilanne. Kerrokset eivät tuuhenna hiuksia, vaan vievät niitä latvoista. Kerro se ennen leikkausta ja ehdota vähän ja pitkiä kerroksia.", kind: "tip", title: "Ole rehellinen ohuista hiuksista" },
      ],
    },
    {
      id: "nostokulmat",
      title: "Nostokulma hiustenleikkauksessa: 0°, 45°, 90° ja 180°",
      blocks: [
        { p: "Nostokulma on kulma, jossa pidät suortuvaa irti päästä. Mitä korkeammalle hiukset nostetaan leikatessa, sitä enemmän pituudet eroavat toisistaan, kun hiukset laskeutuvat. Alla olevat neljä lukua ovat alan yleisiä nimityksiä." },
        {
          table: {
            head: ["Nostokulma", "Miten hius pidetään", "Tulos"],
            rows: [
              ["0°", "Hius laskeutuu suoraan alas", "Tasapitkä linja, kuten polkassa"],
              ["45°", "Nostetaan viistosti alaosassa", "Hiukset kerrostuvat alhaalla ja säilyttävät painon; porrastus tai matalat kerrokset"],
              ["90°", "Suorassa kulmassa päänahkaan juuri leikkauskohdassa", "Tasaiset kerrokset pään muodon mukaan; sopii lyhyille ja puolipitkille, pitkistä katoaa pituus"],
              ["180°", "Nostetaan suoraan ylös päälaelle", "Ylhäällä lyhin, alempana pidempi; pitkät kerrokset, pituus säilyy"],
            ],
          },
        },
        { img: { src: img("goc-nang-45-do-tang-thap"), alt: "Asiakkaan takana seisova kampaaja nostaa märkää suortuvaa viistosti takaraivon alaosasta ja asettaa sakset, ylemmät hiukset on kiinnitetty sivuun", caption: "Viisto nosto alaosassa: hiukset kerrostuvat ja säilyttävät painonsa." } },
        { img: { src: img("goc-nang-90-do-vuong-goc-da-dau"), alt: "Kampaaja vetää päälaen takaa pystysuoran suortuvan suoraan taaksepäin suorassa kulmassa päänahkaan ja pitää sitä kahden sormen ja kamman välissä", caption: "90°: suortuva suorassa kulmassa päänahkaan juuri leikattavassa kohdassa." } },
        { img: { src: img("goc-nang-180-do-tang-dai-o-dinh"), alt: "Kampaaja kampaa asiakkaan päälaen hiukset suoraan ylös kattoa kohti, pitää niitä kahden sormen välissä ja leikkaa vaakasuoraan niiden yläpuolelta", caption: "180°: päälaen hiukset nostetaan suoraan ylös. Tämä on pitkien kerrosten kulma." } },
        { p: "Kun pitkähiuksinen asiakas haluaa kerroksia menettämättä pituutta, vastaus päälaella on 180°. Päälaen hiukset ovat lähimpänä leikkauskohtaa, joten niistä tulee lyhimmät. Mitä alempaa hius kasvaa, sitä pidemmän matkan se kulkee leikkauskohtaan, ja sitä pidempi se on laskeutuessaan. Jos koko pää leikataan 90°:ssa, jokainen suortuva on päänahasta mitattuna yhtä pitkä, ja pitkistä hiuksista katoavat latvat." },
        { note: "0°, 45°, 90° ja 180° ovat yleisiä nimityksiä. Jokainen koulu mittaa ja nimeää ne hieman eri tavalla, ja opetus vaihtelee maittain, mutta ajatus on sama. Artikkeli on harjoitusmateriaalia eikä korvaa ammatillista tutkintoa.", kind: "info", title: "Kulmien nimityksistä" },
      ],
    },
    {
      id: "ohjauslinjat-ja-ylisuuntaus",
      title: "Liikkuva ja kiinteä ohjauslinja sekä ylisuuntaus",
      blocks: [
        { p: "Ohjauslinja on leikattu suortuva, jota käytät seuraavien suortuvien mittana. Niitä on kahdenlaisia, ja ne antavat hyvin erilaisen tuloksen." },
        {
          ul: [
            "**Liikkuva ohjauslinja.** Jokaiseen uuteen suortuvaan otetaan mukaan vähän juuri leikattua, ja se leikataan sen mukaiseksi. Ohjauslinja kulkee mukanasi pään ympäri, ja tuloksena on tasaiset kerrokset.",
            "**Kiinteä ohjauslinja.** Ohjauslinja pysyy yhdessä paikassa, ja jokainen suortuva vedetään juuri siihen leikattavaksi. Mitä kauempana suortuva on ohjauslinjasta, sitä pidemmäksi se jää.",
          ],
        },
        { p: "Leikkauksessa käytetään usein molempia, toisaalla liikkuvaa ja toisaalla kiinteää. Kun käytät kiinteää ohjauslinjaa, **ylisuuntaat**: siirrät hiukset pois niiden luonnollisesta laskeumasta leikataksesi ne. Vetosuunta ratkaisee, mikä jää pitkäksi ja mikä lyhyeksi." },
        {
          table: {
            head: ["Haluat", "Vedä hiukset", "Tulos"],
            rows: [
              ["Säilyttää pituuden edessä", "Etuhiukset taakse, takana olevaan ohjauslinjaan", "Etuhiukset jäävät pidemmiksi"],
              ["Kasvoja kehystävät kerrokset", "Eteenpäin", "Kasvojen ympärillä lyhyet, taaksepäin vähitellen pitenevät"],
            ],
          },
        },
        { note: "Moni aloitteleva kampaaja menettää pituutta edestä vain siksi, ettei huomaa, mihin suuntaan vetää hiuksia. Kysy itseltäsi ennen jokaista leikkausta: siirtyykö tämä suortuva eteen vai taakse siitä, mihin se laskeutuu?", kind: "tip", title: "Tiedä aina, mihin vedät" },
      ],
    },
    {
      id: "ulkolinja-ja-kasvojen-kehystys",
      title: "Ensin ulkolinja, sitten kerrokset ja lopuksi kasvoja kehystävät kerrokset",
      blocks: [
        { p: "Tavallinen järjestys on leikata ensin ulkolinja nostokulmalla 0° tarkalleen asiakkaan kanssa sovittuun pituuteen. Ulkolinja on koko leikkauksen pituus. Sisäkerrokset leikataan sen jälkeen, ja niiden on liityttävä ulkolinjaan pehmeästi, ei leikattava siihen. Ulkolinjaan nähden liian lyhyiksi leikatut kerrokset jättävät latvat ohuiksi, ja osien väliin jää näkyvä katkos." },
        { h3: "Kasvoja kehystävät kerrokset: ne asiakas näkee peilistä joka päivä" },
        { p: "Kasvojen ympärillä olevat kerrokset ovat se osa, jonka asiakas huomaa eniten. Sovi, mistä lyhin kerros alkaa: poskipäistä, leuasta vai solisluista. Aloita sitten vähän pidempää kuin aiot, koska lyhentää voi aina." },
        { p: "Kysy myös, miten asiakas pitää hiuksiaan kotona, sillä vastaus muuttaa leikkausta:" },
        {
          ul: [
            "**Hän laittaa hiukset usein kiinni.** Liian lyhyet sivukerrokset pistävät esiin poninhännästä.",
            "**Hän antaa hiusten kuivua itsestään.** Suorissa, hienoissa hiuksissa monet lyhyet kerrokset näyttävät helposti rikkonaisilta. Harvemmat, pidemmät kerrokset ovat helpompia hoitaa.",
            "**Hän föönaa joka aamu.** Kerroksellisia hiuksia on helpompi muotoilla föönillä, joten näytä, miten kasvoja kehystävät suortuvat föönataan. Katso myös [föönaus ja muotoilu](lesson:say-tao-kieu-hieu-dung).",
          ],
        },
        { p: "Suoraksi leikatut kerrosten latvat näyttävät teräviltä. Pistoleikkaus kerrosten latvoissa pehmentää niitä, ja kerrokset sulautuvat toisiinsa luonnollisemmin." },
        { note: "Kun leikkaat kasvojen edessä olevia hiuksia, saksien kärjet osoittavat aina poispäin asiakkaan kasvoista, ja pyydä asiakasta sulkemaan silmät, jotteivät leikatut hiukset putoa niihin.", kind: "warn", title: "Turvallisuus kasvojen lähellä" },
      ],
    },
    {
      id: "yleiset-virheet",
      title: "Tasaiset kerrokset ja neljä yleistä kerrosleikkauksen virhettä",
      blocks: [
        { p: "Teoriassa oikea nostokulma voi silti mennä asiakkaan päässä pieleen, koska kolme pientä asiaa muuttaa sitä huomaamattasi." },
        {
          ul: [
            "**Veto.** Pidä se kevyenä ja tasaisena, kuten [polkkatukassa](lesson:cat-nu-bang-hieu-dung). Voimakkaalla vedolla leikatut kerrokset nousevat kuivuessaan lyhyemmiksi ja epätasaisiksi.",
            "**Kosteus.** Pidä hiukset tasaisen kosteina sumutepullolla. Kun osa on kuivaa ja osa märkää, hiukset venyvät ja kutistuvat eri tavalla.",
            "**Työasento.** Vartalosi on suoraan leikattavan suortuvan edessä. Jos seisot sivussa, kätesi vetävät sivulle, ja nostokulma muuttuu huomaamattasi.",
          ],
        },
        { img: { src: img("xit-am-deu-toc-khi-cat-tang"), alt: "Asiakkaan takana seisova kampaaja sumuttaa metallisesta suihkepullosta vettä vaaleisiin hiuksiin, jotka on jaettu osioihin ja kiinnitetty siististi", caption: "Sumuta kuivuneet kohdat ennen kuin jatkat, jotta koko tukka on yhtä kostea." } },
        { h3: "Ristiintarkistus ja tasapaino" },
        { p: "Jos leikkaat pystysuorilla suortuvilla, tarkista vaakasuorilla, ja toisin päin. Leikkaa pois se, mikä pistää esiin. Vedä sitten kasvojen kummaltakin puolelta lyhimmät suortuvat alas ja katso, ovatko ne samalla korkeudella. Föönauksen jälkeen katso vielä kerran: onko volyymi molemmilla puolilla tasainen ja onko jossain kuoppaa?" },
        { h3: "Neljä virhettä ja mitä tarkistaa" },
        {
          table: {
            head: ["Virhe", "Miksi se syntyy", "Miten vältät"],
            rows: [
              ["Päälaen kerrokset niin lyhyet, että ne nousevat pystyyn kuin hattu", "Päälaelta leikattu liikaa, varsinkin pyörteen kohdalta", "Leikkaa vähän, anna laskeutua, katso ja leikkaa vasta sitten lisää"],
              ["Ohuet, läpikuultavat latvat", "Liikaa kerroksia hiusten tuuheuteen nähden tai liian lyhyet kerrokset ulkolinjaan nähden", "Hienoihin hiuksiin vähän ja pitkiä kerroksia; älä leikkaa kerroksia ulkolinjaan"],
              ["Kasvojen puolet epätasapainossa", "Sivussa seisominen, eri veto puolilla, ei vertailua", "Sama ohjauslinja ja veto; vertaa lyhimpiä suortuvia peilistä"],
              ["Pituus katoaa edestä", "Ylisuuntaus väärään suuntaan", "Vedä etuhiukset taakse, kun etupituus halutaan säilyttää"],
            ],
          },
        },
        { p: "Kaikki neljä palautuvat kolmeen tapaan: aloita pitkästä, pidä hiuksia oikeassa kulmassa ja tarkista usein." },
      ],
    },
    {
      id: "valineet-ja-muistiinpanot",
      title: "Leikkauksen jälkeen: välineet ja muistiinpanot seuraavaa kertaa varten",
      blocks: [
        { p: "Sakset, kammat ja klipsit puhdistetaan ja desinfioidaan jokaisen asiakkaan jälkeen tuotteen ohjeen mukaan, kuten artikkelissa [välineiden desinfiointi](lesson:ve-sinh-dung-cu). Hygieniamääräykset ja alan harjoittamisen säännöt vaihtelevat maittain, joten tarkista oman työpaikkasi vaatimukset." },
        { p: "Kerrosleikkauksen voi toistaa täsmälleen samana vain, jos muistat kaksi asiaa: pituuden ja sen, mistä kasvojen kehystys alkaa. Kirjaa VaraaAissa molemmat asiakkaan muistiinpanoihin [asiakastiedoissa](lesson:khach-hang) ja lue ne uudelleen, kun asiakkaalla on seuraava [ajanvaraus](lesson:lich-hen), niin leikkaat saman mallin. Jos salongin ajanvaraussivulla ei vielä ole kerrosleikkausta, [lisää palvelu](lesson:dich-vu) kestolla, johon mahtuvat sekä konsultaatio että föönaus." },
      ],
    },
  ],
  faq: [
    {
      q: "Mikä on kerrosleikkaus ja miten se eroaa tasapitkästä leikkauksesta?",
      a: "Tasapitkässä leikkauksessa jokainen hius pysähtyy samaan linjaan, joten latvat ovat paksut ja painavat. Kerrosleikkauksessa päällimmäiset hiukset ovat alempia lyhyempiä ja limittyvät niiden päälle kuin kattotiilet. Hiukset kevenevät ja saavat volyymia ja liikettä, mutta latvat menettävät osan painostaan.",
    },
    {
      q: "Sopiiko kerrosleikkaus ohuille hiuksille?",
      a: "Sopii, kun kerroksia on vähän ja ne ovat pitkiä. Kerrokset vievät latvoista painoa, joten runsas kerrostus hienoissa ja harvoissa hiuksissa tekee latvoista ohuet ja läpikuultavat. Kerrokset eivät tee hiuksista tuuheampia.",
    },
    {
      q: "Lyheneekö tukka kerrosleikkauksessa?",
      a: "Ei välttämättä. Pitkissä hiuksissa kampaaja leikkaa ulkolinjan sovittuun pituuteen ja nostaa päälaen suoraan ylös 180° pitkiä kerroksia varten: ylhäällä lyhin, alempana yhä pidempi. Pituutta katoaa vain, jos koko pää leikataan 90°:ssa tai kerrokset leikataan ulkolinjaan.",
    },
    {
      q: "Mitä eroa on 90° ja 180° nostokulmalla?",
      a: "90°:ssa suortuva on suorassa kulmassa päänahkaan leikkauskohdassa, ja kerrokset ovat tasaiset pään muodon mukaan, mikä sopii lyhyille ja puolipitkille hiuksille. 180°:ssa hiukset nostetaan suoraan ylös päälaelle, jolloin syntyy pitkiä kerroksia ja pituus säilyy. Nimitykset ovat yleisiä, ja koulut mittaavat ne hieman eri tavoin.",
    },
    {
      q: "Miksi päälaen kerrokset nousevat pystyyn?",
      a: "Koska päälaen kerrokset on leikattu liian lyhyiksi, yleensä juuri pyörteen kohdalta. Lyhyt hius pyörteessä ei ole tarpeeksi painava asettuakseen alas. Vältät sen leikkaamalla ensin vähän, antamalla hiusten laskeutua ja jättämällä pyörteen kohdan riittävän pitkäksi.",
    },
    {
      q: "Mitä kiharien hiusten kerrosleikkauksessa pitää huomioida?",
      a: "Kerrokset antavat kiharoille muodon, mutta kiharat nousevat kuivuessaan paljon. Siksi kampaaja leikkaa ne aiottua pidemmiksi tai kuivina oppimallaan tekniikalla, jotta kuiva pituus on sellainen kuin asiakas halusi.",
    },
  ],
  related: ["cat-nu-tang", "toc-tu-van-chia-vung-hieu-dung", "cat-nu-bang-hieu-dung", "cat-mai-hieu-dung"],
};

export default article;
