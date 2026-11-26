import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cat-nu-tang/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "pitkien-hiusten-kerrosleikkaus-ohje",
  lesson: "cat-nu-tang",
  category: "hair",
  title: "Pitkien hiusten kerrosleikkaus: 10 vaihetta kasvoja kehystäviin kerroksiin pituutta menettämättä",
  metaTitle: "Pitkien hiusten kerrosleikkaus: ohje 10 vaiheessa",
  metaDescription:
    "Pitkien hiusten kerrosleikkaus vaihe vaiheelta: kosketuskohdat, ulkolinja 0°, päälaki 180°, sivut taakse ylisuunnaten, kasvojen kehystys ja föönaus.",
  keyword: "pitkien hiusten kerrosleikkaus",
  keywords: [
    "kerrosleikkaus vaihe vaiheelta",
    "kerrosten leikkaaminen pitkiin hiuksiin",
    "kasvoja kehystävien kerrosten leikkaus",
    "pitkät kerrokset",
    "kerrosleikkaus aloittelijalle",
    "kuinka usein pitkät kerrokset tasataan",
  ],
  excerpt: "Pitkät kerrokset ja kasvojen kehystys kymmenessä vaiheessa: ensin ulkolinja, sitten päälaki 180°:ssa, sivut taakse ylisuunnaten ja vasta lopuksi kasvojen ympärys.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-toc-va-khach-voi-kieu-toc-tang-dai"),
    alt: "Ruskeapolkkainen kampaaja seisoo vaalean asiakkaan takana, jolle on juuri leikattu pitkät kerrokset, ja molemmat hymyilevät pariisilaistyylisessä salongissa violettien samettiverhojen edessä",
  },
  takeaways: [
    "Sovi **kosketuskohdilla** hiusten ollessa kuivat: mihin latvat päättyvät ja mistä kasvojen kehystys alkaa.",
    "Leikkaa **ulkolinja ensin** nostokulmalla 0°. Se on koko leikkauksen pituus, eivätkä kerrokset saa leikata siihen.",
    "Päälaen pitkät kerrokset: kampaa suoraan ylös **180°**, kokoa yhteen kohtaan, leikkaa vähän ja laske alas katsoaksesi.",
    "Ylisuuntaa sivut taakse, niin etupituus säilyy. Kehystystä varten vedä eteen, silmät kiinni ja saksien kärjet poispäin kasvoista.",
    "Aloita aina pitkästä. Lyhentää voi milloin vain, pidentäminen vaatii odottamista.",
  ],
  intro: [
    "Pitkien hiusten kerrosleikkaus on vastaus tuolissa useimmin kuultuun toiveeseen: pitkähiuksinen asiakas haluaa kevyemmät ja tuuheamman näköiset hiukset ja kasvoja kehystävät kerrokset, mutta ei halua menettää pituutta. Malli leikataan neljässä osassa, joissa jokaisessa on oma nostokulmansa ja vetosuuntansa, ja jokainen osa rakentuu edellisen varaan.",
    "Artikkeli seuraa VaraaAi Academyn Hiukset-kurssin oppituntia ”Kerrosleikkaus: käytäntö vaihe vaiheelta”. Alla olevien kymmenen vaiheen avulla leikkaat kokonaisen pitkän kerrosmallin kaulapaperin kiertämisestä asiakastietojen kirjaamiseen. Jokaisen nostokulman perustelut ovat teoria-artikkelissa [mikä on kerrosleikkaus](lesson:cat-nu-tang-hieu-dung); lue se ensin, jos ohjauslinjat ja ylisuuntaus ovat sinulle uusia.",
  ],
  sections: [
    {
      id: "nelja-osaa",
      title: "Pitkä kerrosleikkaus leikataan neljässä osassa",
      blocks: [
        { p: "Ennen työvaiheita katso koko mallia suunnitelmana. Jokaisella osalla on oma tehtävänsä, ja jokainen rakentuu edellisen varaan." },
        {
          table: {
            head: ["Osa", "Miten hius pidetään", "Mitä se tekee"],
            rows: [
              ["Ulkolinja", "Kammataan suoraan alas, 0°", "Määrää koko leikkauksen pituuden"],
              ["Päälaen kerrokset", "Suoraan ylös 180°, koottuna yhteen kohtaan pään yläpuolelle", "Ylhäällä lyhin, alempana pidempi, liittyy ulkolinjaan"],
              ["Sivut", "Korvan edessä olevat suortuvat ylisuunnataan taakse korvan takana olevaan ohjauslinjaan", "Säilyttää pituuden edessä"],
              ["Kasvojen kehystys", "Etusuortuva kammataan kasvojen eteen ja leikataan vinosti", "Kasvojen ympärillä lyhyt, taaksepäin pitenevä"],
            ],
          },
        },
        { p: "Aloittelija haluaa usein leikata kasvojen ympäryksen ensin, koska se näkyy eniten. Jätä se viimeiseksi. Vasta kun ulkolinja ja takana olevat kerrokset ovat valmiit, tiedät, mihin kehystyksen pitää liittyä." },
        { note: "Nostokulmien nimitykset ja opetustavat vaihtelevat kouluittain ja maittain. Artikkeli on harjoitusmateriaalia eikä korvaa ammatillista tutkintoa.", kind: "info", title: "Ennen kuin aloitat" },
      ],
    },
    {
      id: "kolme-tapaa",
      title: "Kolme tapaa, jotka pitävät kerrokset tasaisina koko leikkauksen ajan",
      blocks: [
        { p: "Voit tehdä kymmenen vaihetta oikeassa järjestyksessä ja saada silti epätasaiset kerrokset, jos nämä kolme tapaa puuttuvat. Ne eivät kuulu mihinkään yksittäiseen vaiheeseen, vaan kulkevat mukanasi ensimmäisestä saksenliikkeestä viimeiseen." },
        {
          ol: [
            "**Seiso oikeassa kohdassa.** Liiku asiakkaan ympärillä niin, että vartalosi on aina suoraan leikattavan suortuvan edessä. Jos seisot sivussa, kätesi vetävät sivulle huomaamattasi.",
            "**Pidä nostokulma.** Pitkässä leikkauksessa käsi väsyy ja laskee vähitellen. Kun nostokulma muuttuu, muuttuvat myös kerrokset.",
            "**Aloita aina pitkästä.** Lisää voi leikata aina.",
          ],
        },
        { note: "Kun käsi tuntuu väsyneeltä, älä yritä väkisin saada aluetta valmiiksi. Pysähdy, laske käsi, siirry oikeaan kohtaan ja jatka vasta sitten. Muutaman sekunnin tauko on paljon halvempi kuin toista puolta alempana olevat kerrokset.", kind: "tip", title: "Väsynyt käsi laskee nostokulmaa" },
      ],
    },
    {
      id: "virheiden-korjaus",
      title: "Kun kerrosleikkaus menee pieleen: mitä näet ja miten korjaat",
      blocks: [
        { p: "Useimmat korjaukset tehdään leikkauksen aikana, tarkistusvaiheessa ja föönauksen jälkeen. Taulukkoon on koottu oppitunnilla mainitut tilanteet." },
        {
          table: {
            head: ["Näet", "Tavallinen syy", "Mitä teet"],
            rows: [
              ["Kerrokset eivät erotu alas laskettuina", "Ensimmäisellä kerralla leikattiin vähän, kuten pitääkin", "Nosta taas 180°:een ja leikkaa vähän lisää samalla tavalla"],
              ["Suortuva pistää esiin ristiintarkistuksessa", "Epätasainen nostokulma tai veto pystysuortuvien välillä", "Leikkaa esiin pistävä osa"],
              ["Kasvojen lyhimmät suortuvat eri korkeudella", "Puolilla eri ohjauslinja tai veto", "Tasaa pidempää puolta vähän kerrallaan"],
              ["Päälaen hiukset nousevat pystyyn", "Päälaen kerrokset liian lyhyet, varsinkin pyörteen kohdalla", "Ei korjaannu samana päivänä; ensi kerralla vähemmän päälaelta ja pyörre pidemmäksi"],
              ["Sivuhiukset pistävät esiin, kun asiakas laittaa hiukset kiinni", "Sivukerrokset liian lyhyet asiakkaan tapoihin nähden", "Kysy hiusten kiinni laittamisesta jo konsultaatiossa"],
            ],
          },
        },
        { p: "Kaksi viimeistä riviä näyttävät, miksi aloitetaan pitkästä ja kysytään huolellisesti: jotkin virheet korjaa vain aika." },
      ],
    },
    {
      id: "foonaus-ja-jalkihoito",
      title: "Kerrosten föönaus, ilmakuivaus ja tasausväli",
      blocks: [
        { p: "Pitkät kerrokset näyttävät hyviltä myös ilmakuivattuina, kunhan kerrokset eivät ole liian lyhyet. Ennen kuin asiakas nousee tuolista, näytä hänelle kumpikin tapa: föönaus pyöröharjalla kasvoja kehystävät suortuvat kevyesti kasvoista poispäin kääntäen sekä hiusten antaminen kuivua itsestään. Asiakas, joka tietää, miltä hänen hiuksensa näyttävät kummallakin tavalla, pettyy harvoin seuraavana aamuna. Föönaustekniikasta on oma artikkelinsa, [föönaus vaihe vaiheelta](lesson:say-tao-kieu)." },
        { img: { src: img("toc-tang-dai-nhin-tu-phia-sau"), alt: "Lapaluihin ulottuvat pitkät hunajanvaaleat hiukset takaa kuvattuna kerrosleikkauksen jälkeen, pitkät kerrokset antavat kevyttä volyymia ja latvat ovat pehmeät ja tasaiset", caption: "Tulos takaa: pituus on tallella, kerrokset liittyvät pehmeästi ulkolinjaan ja latvat pysyvät tuuheina." } },
        { p: "Pitkissä kerroksissa moni asiakas palaa tasaukseen noin 2–3 kuukauden kuluttua. Se on yleinen tapa, ei sääntö. Säännöllinen tasaus pitää latvat tuuheina ja kerrokset muodossaan pidempään." },
      ],
    },
    {
      id: "turvallisuus-ja-hygienia",
      title: "Turvallisuus ja hygienia kerrosleikkauksessa",
      blocks: [
        {
          ul: [
            "Leikkaa vain asiakkaan kanssa sovittuun pituuteen. Jos haluat lyhentää lisää, kysy ensin uudelleen.",
            "Kun leikkaat kasvojen ympäriltä, pyydä asiakasta sulkemaan silmät ja osoita saksien kärjet poispäin hänen kasvoistaan.",
            "Kaulapaperi on kertakäyttöinen: se kierretään ensin, leikkuuviitta kiinnitetään sen päälle, ja paperi heitetään pois asiakkaan lähdettyä.",
            "Sakset, kammat ja klipsit puhdistetaan ja desinfioidaan jokaisen asiakkaan jälkeen tuotteen ohjeen mukaan. Työtapa on artikkelissa [välineiden desinfiointi](lesson:ve-sinh-dung-cu).",
            "Lakaise hiukset tuolin alta ennen seuraavan asiakkaan istumista.",
          ],
        },
        { note: "Hygieniamääräykset ja kampaamoalan harjoittamisen säännöt vaihtelevat maittain. Tarkista oman työpaikkasi vaatimukset.", kind: "warn", title: "Säännöt vaihtelevat" },
      ],
    },
    {
      id: "asiakastiedot",
      title: "Kirjaa asiakastiedot, niin seuraava leikkaus osuu samaan",
      blocks: [
        { p: "Asiakas, joka pitää tämän päivän leikkauksesta, haluaa ensi kerralla täsmälleen saman, eikä kahden tai kolmen kuukauden päästä kumpikaan teistä muista, alkoivatko kerrokset leuasta vai poskipäistä. Kirjaa VaraaAissa pituus ja kasvojen kehystyksen aloituskohta asiakkaan muistiinpanoihin [asiakastiedoissa](lesson:khach-hang) ja ehdota seuraavaa [ajanvarausta](lesson:lich-hen) maksun yhteydessä. Kerrosleikkaus ansaitsee ajanvaraussivulla oman kestonsa, johon mahtuvat konsultaatio, pesu ja föönaus: katso, miten [lisäät palvelun](lesson:dich-vu)." },
      ],
    },
  ],
  howTo: {
    title: "Pitkien hiusten kerrosleikkaus ja kasvojen kehystys: työvaiheet",
    id: "pitkien-kerrosten-vaiheet",
    after: "nelja-osaa",
    lead: "Kymmenen vaihetta oppitunnin videon järjestyksessä. Vaiheet 4–7 ovat mallin neljä osaa, ja jokaisessa leikataan ensin vähän ja vasta sitten lisää.",
    supplies: [
      "Leikkuusakset, kampa ja jakoklipsit puhdistettuina ja desinfioituina",
      "Kertakäyttöinen kaulapaperi ja leikkuuviitta",
      "Pyyhe ja vesisumutin",
      "Hiustenkuivaaja ja pyöröharja",
      "Käsipeili takaosan näyttämiseen",
    ],
    steps: [
      {
        name: "Valmistele asiakas ja välineet",
        text: "Pese kädet ja tarkista, että sakset, kammat ja klipsit on puhdistettu ja desinfioitu. Kiedo kaulapaperi asiakkaan kaulan ympäri ennen kuin kiinnität leikkuuviitan sen päälle, jotta viitta ei koske suoraan kaulan ihoon.",
        image: { src: img("quan-giay-co-va-ao-choang-truoc-khi-cat"), alt: "Kampaaja kietoo valkoisen kaulapaperin asiakkaan kaulan ympäri ja kiinnittää mustan leikkuuviitan sen päälle, asiakkaan hiukset on siirretty toiselle olalle" },
      },
      {
        name: "Konsultoi kuivista hiuksista",
        text: "Katsokaa mallikuvaa yhdessä ja kysy kolme asiaa: paljonko latvoista leikataan, mistä lyhin etukerros alkaa ja föönaako asiakas aamuisin. Kysy myös, mistä hän ei pitänyt edellisessä leikkauksessa ja laittaako hän hiuksia usein kiinni. Lyö asiat lukkoon kosketuskohdilla: aseta käsi täsmälleen siihen, mihin latvat päättyvät ja mistä kehystys alkaa, esimerkiksi leuan kohdalle. Lue samalla hiukset: paksut vai hienot, suorat vai kiharat ja missä pyörteet ovat. Hienoihin hiuksiin tulee vähemmän kerroksia.",
        image: { src: img("thong-nhat-do-dai-bang-diem-cham"), alt: "Kampaaja seisoo asiakkaan vieressä kultakehyksisen soikean peilin edessä ja pitää pitkän kuivan suortuvan latvaa näyttäen, mihin pituuteen leikataan", caption: "Näytä kädellä oikeista hiuksista. ”Vähän pois” tarkoittaa jokaiselle eri pituutta." },
      },
      {
        name: "Pese, selvitä, tee jakaus ja jaa osiot",
        text: "Pese, kuivaa pyyhkeellä painellen ja selvitä takut latvoista alkaen. Tee jakaus siihen, missä asiakas pitää sitä joka päivä; videolla se on keskijakaus. Jaa osiot ja kiinnitä ne siististi. Pidä hiukset koko leikkauksen ajan tasaisen kosteina sumuttimella, koska kuivat ja märät kohdat venyvät ja kutistuvat eri tavalla.",
        image: { src: img("chia-vung-toc-truoc-khi-cat-tang"), alt: "Asiakkaan märät vaaleat hiukset takaa kuvattuina jaettuina osioihin suorilla jakauksilla ja hopeisilla klipseillä, kampaaja pitää kampaa vieressä" },
      },
      {
        name: "Leikkaa ulkolinja nostokulmalla 0°",
        text: "Asiakas istuu suorassa pää suorana. Päästä takahiukset alas ja kampaa ne suoraan alas selkää pitkin. Pidä latvoja kahden vaakatasoisen sormen välissä sovitussa pituudessa ja leikkaa vaakasuoraan juuri niiden alapuolelta, ensin keskeltä ja sitten sivuille. Jatka sivuille takalinjaa ohjeena käyttäen. Pyöreä U- tai terävä V-muoto on sovittava etukäteen. Tämä on koko leikkauksen pituus, eivätkä myöhemmät kerrokset leikkaa siihen.",
        image: { src: img("cat-duong-vien-ngoai-goc-0-do"), alt: "Asiakkaan vieressä seisova kampaaja kampaa pitkät märät hiukset suoraan alas selkää pitkin ja pitää latvoja sormiensa välissä leikatakseen vaakasuoran ulkolinjan", caption: "Hiukset laskeutuvat suoraan alas nostamatta. Takaa katsottuna ulkolinja on lattian suuntainen." },
      },
      {
        name: "Leikkaa päälaen pitkät kerrokset 180°:ssa",
        text: "Erota päälaki otsan kulmista taaksepäin päälaen korkeimpaan kohtaan. Kampaa koko alue suoraan ylös, kokoa se yhteen kohtaan suoraan pään yläpuolelle, pidä sitä kahden sormen välissä ja leikkaa suoraan poikki. Tämä kohta on kiinteä ohjauslinja. Mitä alempaa leikkaat, sitä lyhyemmät kerroksista tulee, joten leikkaa ensimmäisellä kerralla vähän ja laske hiukset alas katsoaksesi. Jos kerrosten pitää erottua enemmän, leikkaa vähän lisää samalla tavalla. Älä leikkaa pyörteen kohdalta liian lyhyeksi, tai hiukset nousevat pystyyn.",
      },
      {
        name: "Leikkaa sivut taakse ylisuunnaten",
        text: "Ota pystysuora suortuva heti korvan takaa, nosta se irti päästä ja liitä se päälaen kerroksiin. Tämä suortuva on sivun kiinteä ohjauslinja. Ota sitten korvan edessä olevat pystysuortuvat, ylisuuntaa ne taakse täsmälleen tuohon ohjauslinjaan ja leikkaa vain sormien yli ulottuvat latvat. Näin etuhiukset jäävät pidemmiksi ja pituus säilyy. Tee täsmälleen sama toisella puolella samalla ohjauslinjalla ja samalla vedolla.",
        image: { src: img("keo-lech-toc-ra-sau-giu-do-dai-phia-truoc"), alt: "Asiakas istuu sivuttain, ja hänen takanaan seisova kampaaja vetää märän suortuvan pään sivulta taaksepäin ja leikkaa ylimääräiset latvat saksilla", caption: "Korvan edessä oleva suortuva tuodaan taakse leikattavaksi. Paikalleen päästettynä se on ohjauslinjaa pidempi." },
      },
      {
        name: "Leikkaa kasvoja kehystävät kerrokset",
        text: "Ota edestä kolmion muotoinen suortuva jakauksesta otsan kulmaan, kampaa se eteen kasvojen päälle ja pyydä asiakasta sulkemaan silmät. Pidä suortuvaa vinossa linjassa niin, että sen yläpää on täsmälleen sovitussa kohdassa, ja leikkaa tuota vinoa linjaa pitkin saksien kärjet poispäin asiakkaan kasvoista. Myös seuraava, takana oleva suortuva kammataan eteen ensimmäisen kohdalle ja leikataan sen mukaan, joten hiukset pitenevät vähitellen taaksepäin. Leikkaa toinen puoli samalle korkeudelle.",
        image: { src: img("cat-tang-om-mat-khach-nham-mat"), alt: "Asiakas istuu silmät kiinni märät hiukset keskeltä jaettuina, ja hänen takanaan seisova kampaaja pitää etusuortuvaa vinosti leuan tasolla ja asettaa sakset", caption: "Silmät kiinni ja saksien kärjet poispäin kasvoista. Aloita vähän sovittua kohtaa pidempää." },
      },
      {
        name: "Ristiintarkista ja tasapainota puolet",
        text: "Tarkista pystysuortuvilla leikatut alueet vaakasuortuvilla ja leikkaa pois se, mikä pistää esiin. Seiso sitten asiakkaan takana, katso peiliin, vedä kasvojen kummaltakin puolelta lyhimmät suortuvat alas ja vertaa niiden korkeutta. Jos ne eroavat, tasaa pidempää puolta vähän kerrallaan.",
        image: { src: img("so-hai-lon-toc-hai-ben-mat"), alt: "Asiakkaan takana seisova kampaaja pitää yhtä suortuvaa kummallakin puolella asiakkaan kasvoja, ja molemmat katsovat kultakehyksiseen soikeaan peiliin vertaillakseen pituutta" },
      },
      {
        name: "Föönaa ja tarkista uudelleen kuivana",
        text: "Kuivaa hiusten laskeutumissuuntaan. Nosta pyöröharjalla kevyesti juuria päälaella ja käännä kasvoja kehystävät suortuvat poispäin kasvoista. Kun hiukset ovat kuivat, katso kolme asiaa: ovatko puolet tasapainossa, onko volyymi tasainen ja ovatko latvat yhä tuuheat? Tasaa kevyesti kuivana siellä, missä jokin on epätasaista.",
        image: { src: img("say-toc-tang-bang-luoc-tron"), alt: "Kampaaja föönaa asiakkaan pitkiä kerroksellisia vaaleita hiuksia, pyöröharja nostaa päälaen suortuvaa ja musta hiustenkuivaaja on sen yläpuolella" },
      },
      {
        name: "Viimeistele, kirjaa ja siivoa",
        text: "Harjaa irtohiukset pois, näytä asiakkaalle takaosa käsipeilillä ja kysy, haluaako hän muuttaa jotain. Näytä, miten kasvojen kehystys föönataan kotona. Kirjaa asiakastietoihin pituus ja kerrosten aloituskohta. Kun asiakas on lähtenyt, puhdista ja desinfioi sakset, kammat ja klipsit, heitä kaulapaperi pois ja lakaise hiukset tuolin alta.",
      },
    ],
  },
  faq: [
    {
      q: "Mitä pitkien hiusten kerrosleikkauksessa leikataan ensin?",
      a: "Yleensä ulkolinja nostokulmalla 0° täsmälleen asiakkaan kanssa sovittuun pituuteen. Ulkolinja on koko leikkauksen pituus. Sen jälkeen tulevat päälaen kerrokset, sivut ja viimeisenä kasvojen kehystys, jotta kerrokset liittyvät ulkolinjaan pehmeästi leikkaamatta siihen.",
    },
    {
      q: "Miten kerrokset leikataan menettämättä pituutta?",
      a: "Päälaella hiukset kammataan suoraan ylös 180°:een ja kootaan yhteen kohtaan pään yläpuolelle leikattaviksi: päälaesta tulee lyhin ja alemmat hiukset pitenevät. Sivuilla korvan edessä olevat suortuvat ylisuunnataan taakse korvan takana olevaan ohjauslinjaan ja vain ylimääräinen leikataan, joten etupituus säilyy.",
    },
    {
      q: "Mistä kasvoja kehystävien kerrosten pitäisi alkaa?",
      a: "Siitä, mistä asiakas haluaa: poskipäistä, leuasta tai solisluista. Sovi kohta asettamalla käsi juuri siihen hiusten ollessa kuivat, ja kysy, laittaako asiakas hiuksia usein kiinni, koska liian lyhyet sivukerrokset pistävät esiin poninhännästä. Leikatessa aloita vähän valittua kohtaa pidempää.",
    },
    {
      q: "Miten kerroksista saa lyhyemmät ja näkyvämmät?",
      a: "Kun päälaki on nostettu 180°:een, mitä alempaa leikkaat, sitä lyhyemmät kerroksista tulee. Leikkaa vähän lisää kerrallaan samalla tavalla ja laske hiukset alas katsoaksesi. Älä vedä hiuksia kireälle leikatessa, koska kuivuttuaan ne nousevat epätasaisesti.",
    },
    {
      q: "Pitääkö pitkät kerrokset föönata joka päivä?",
      a: "Ei tarvitse. Pitkät kerrokset näyttävät hyviltä myös ilmakuivattuina, kunhan ne eivät ole liian lyhyet. Jos asiakas föönaa, pyöröharjalla nostetaan päälaen juuria ja käännetään kasvoja kehystävät suortuvat poispäin kasvoista.",
    },
    {
      q: "Kuinka usein pitkät kerrokset tasataan?",
      a: "Moni asiakas palaa tasaukseen noin 2–3 kuukauden kuluttua. Se on yleinen tapa eikä sääntö. Säännöllinen tasaus pitää latvat tuuheina ja kerrokset muodossaan pidempään.",
    },
  ],
  related: ["cat-nu-tang-hieu-dung", "toc-tu-van-chia-vung", "cat-nu-bang", "say-tao-kieu"],
};

export default article;
