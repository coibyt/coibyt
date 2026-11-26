import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cat-nam-fade-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "mika-on-fade-leikkaus",
  lesson: "cat-nam-fade-hieu-dung",
  category: "hair",
  title: "Mikä on fade-leikkaus? Matala, keskikorkea ja korkea häivytys, skin fade ja taper",
  metaTitle: "Mikä on fade-leikkaus? Häivytyksen korkeudet ja taper",
  metaDescription:
    "Mikä on fade-leikkaus, mistä matala, keskikorkea ja korkea häivytys alkavat, skin fade ja taper, miksi häivytykseen jää raitoja ja kuinka kauan fade kestää.",
  keyword: "fade-leikkaus",
  keywords: [
    "häivytys hiustenleikkaus",
    "matala keskikorkea korkea häivytys",
    "mikä on skin fade",
    "mikä on taper",
    "taper vai fade",
    "kuinka usein fade leikataan",
    "miksi häivytykseen jää raitoja",
  ],
  excerpt: "Fade-leikkauksessa hiukset lyhenevät alaspäin niin tasaisesti, että se näyttää sävynmuutokselta. Korkeudet, skin fade, taper ja syyt raitoihin.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("kieu-toc-fade-trung-binh-sat-da-nhin-nghieng"),
    alt: "Miesasiakas sivuprofiilissa keskikorkealla häivytyksellä: korvan ympäriltä ja niskasta ihoon asti, ja hiukset tummuvat vähitellen taaksepäin kammattuun pidempään päälakeen",
  },
  takeaways: [
    "Häivytyksessä hiukset **lyhenevät vähitellen alaspäin**. Siirtymän on oltava saumaton, ilman raitoja ja portaita.",
    "Matala häivytys alkaa heti korvan yläpuolelta, keskikorkea ohimon tasolta ja korkea päälaen reunan lähellä tai sen yläpuolella. Ne ovat vain suuntaa antavia: osoita asiakkaan päästä, mistä sovitaan.",
    "**Skin fadessa** alaosa ajetaan ihoon asti. **Taperissa** vain pulisonkien ja niskan hiusraja lyhenee asteittain.",
    "Poista raita paikallaan välipituudella; älä nosta koko häivytystä luvattua korkeammalle.",
    "Häivytys on parhaimmillaan ensimmäisen viikon tai kaksi. Moni asiakas palaa noin 2–3 viikon päästä.",
  ],
  intro: [
    "Fade-leikkaus eli häivytys on leikkaus, jota miesasiakkaat pyytävät nykyään eniten. Siinä hiukset lyhenevät vähitellen alaspäin: niskassa ja korvien ympärillä ne ovat hyvin lyhyet, joskus ihoon asti, ja ylöspäin ne pitenevät päälaelle saakka. Hyvä häivytys näyttää pehmeältä, aivan kuin hiusten väri vaihtuisi vaaleasta tummaan. Yksikin vaakaraita tai laikukas kohta, ja asiakas huomaa sen peilistä heti.",
    "Artikkeli seuraa VaraaAi Academyn Hiukset-kurssin oppituntia ”Häivytys (fade): ymmärrä se, niin siirtymä on tasainen ilman raitoja”, häivytysaiheen teoriaosaa. Luettuasi erotat häivytyksen korkeudet, skin faden ja taperin toisistaan, osaat lukea pään muodon ennen mallin valintaa ja ymmärrät, mistä raidat syntyvät. Itse konetyö on artikkelissa [häivytyksen tekeminen koneella](lesson:cat-nam-fade).",
  ],
  sections: [
    {
      id: "mika-on-haivytys",
      title: "Mikä häivytys on ja miksi se näyttää sävynmuutokselta",
      blocks: [
        { p: "Häivytyksessä ei ole värjätty yhtään hiusta. Sävykaistan luo pituus. Lyhyistä hiuksista näkyy enemmän hiuspohjaa, joten ne näyttävät vaaleilta. Pidemmät hiukset peittävät hiuspohjaa enemmän ja näyttävät tummemmilta. Kun pituus kasvaa tasaisesti alhaalta ylöspäin, silmä näkee pehmeän kaistan vaaleasta tummaan." },
        { img: { src: img("skin-fade-nhin-tu-phia-sau-gay-sat-da"), alt: "Miehen pää suoraan takaa: niskassa iho näkyy, ja hiukset tummuvat ylöspäin tasaiseksi kaistaksi ilman raitoja", caption: "Takaa: vaalea niskassa, tummempi ylöspäin, eikä yhtään vaakaraitaa." } },
        { p: "Parturin tavoite on siis selvä: siirtymän on oltava saumaton. Häivytyksen vaikein osa ei ole nopeat kädet. Se on sen ymmärtäminen, montako pituutta olet tekemässä ja missä kukin niistä on asiakkaan päässä." },
      ],
    },
    {
      id: "haivytyksen-korkeudet",
      title: "Matala, keskikorkea ja korkea häivytys: mistä kukin alkaa",
      blocks: [
        { p: "Kolme yleistä korkeutta, joita moni asiakas kutsuu englanniksi nimillä low, mid ja high fade, eroavat siinä, mistä siirtymä alkaa." },
        {
          table: {
            head: ["Malli", "Missä siirtymä on", "Miltä se näyttää"],
            rows: [
              ["Matala häivytys (low fade)", "Alkaa heti korvan yläpuolelta ja kaartuu alas niskaan", "Suurimpaan osaan sivuja jää hiusta. Hillitty, sopii toimistotyöhön ja ensikertalaiselle"],
              ["Keskikorkea häivytys (mid fade)", "Ohimon tasolla, korvan ja päälaen reunan välissä", "Terävämpi kuin matala, pehmeämpi kuin korkea"],
              ["Korkea häivytys (high fade)", "Päälaen reunan lähellä tai sen yli, pään leveimmässä kohdassa", "Sivut lähes ihoon asti; rohkea ja terävä"],
            ],
          },
        },
        { img: { src: img("fade-thap-bat-dau-ngay-tren-tai"), alt: "Lyhytpartainen, laineikashiuksinen miesasiakas sivuprofiilissa: häivytyksen siirtymä on matalalla heti korvan yläpuolella ja sivuille on jäänyt runsaasti hiusta", caption: "Matala häivytys: siirtymä on heti korvan yläpuolella, ja sivuille jää hiusta." } },
        { img: { src: img("fade-cao-hai-ben-gan-sat-da"), alt: "Nuori paksu- ja mustahiuksinen mies sivuprofiilissa: sivut lähes ihoon asti pään leveimpään kohtaan saakka, päälaki jätetty pitkäksi", caption: "Korkea häivytys: sivut ovat lähes ihoon asti päälaen reunan tuntumaan." } },
        { note: "Jokainen parturi nimittää korkeudet hieman eri tavalla, joten yllä olevat kohdat ovat vain suuntaa antavia. Tärkeintä on, että parturi ja asiakas osoittavat peilistä samaa kohtaa päässä. Kun asiakas kokeilee häivytystä ensimmäistä kertaa, ehdota vähän matalampaa: ensi kerralla korkeammaksi on helppo, mutta korkeaksi leikattu pitää odottaa kasvamaan.", kind: "tip", title: "Sovi sormella, ei nimellä" },
      ],
    },
    {
      id: "skin-fade-ja-taper",
      title: "Taper vai fade: mitä skin fade ja taper tarkoittavat",
      blocks: [
        { p: "Nämä kaksi termiä menevät usein sekaisin, vaikka ne antavat hyvin erilaisen tuloksen." },
        {
          table: {
            head: ["Malli", "Mitä se on", "Kenelle se sopii"],
            rows: [
              ["Skin fade (nollahäivytys)", "Aivan alaosa ajetaan ihoon asti", "Asiakkaalle, joka haluaa ihon näkyvän alhaalla ja pitää terävästä ilmeestä"],
              ["Taper", "Vain pulisonkien ja niskan hiusraja lyhennetään asteittain, muualla sivuilla hiukset säilyvät", "Asiakkaalle, joka haluaa siistin ilmeen ilman, että iho näkyy"],
            ],
          },
        },
        { p: "Kun asiakas sanoo haluavansa faden, kysy takaisin yksi kysymys: haluatko, että iho näkyy alhaalla? Vastaus kertoo, teetkö skin faden, häivytyksen, joka päättyy koneen lyhimpään pituuteen, vai pelkän taperin." },
      ],
    },
    {
      id: "paan-muodon-lukeminen",
      title: "Pään muodon lukeminen ennen häivytyksen korkeuden valintaa",
      blocks: [
        { p: "Häivytys paljastaa pään muodon, joten lue pää ennen leikkausta. Aseta kätesi sen päälle ja tunnustele kevyesti **päälaen reuna**, pään levein kohta kummallakin puolella, ja **takaraivon kyhmy**, joka pullistuu hieman takana. Molemmat maamerkit esiteltiin artikkelissa [miesten hiustenleikkauksen perusteet](lesson:cat-nam-co-ban-hieu-dung)." },
        { img: { src: img("tho-so-dang-dau-khach-truoc-khi-cat-fade"), alt: "Violettiliivinen parturi seisoo miesasiakkaan takana ja asettaa kätensä tämän takaraivolle tunnustellakseen pään muotoa, edessä messinkikehyksinen peili", caption: "Tunnustele pään muoto ennen leikkausta: päälaen reuna, takaraivon kyhmy ja litteät kohdat." } },
        {
          ul: [
            "**Litteä takaraivo.** Hyvin yleistä. Jos häivytys nostetaan liian korkealle, litteä kohta paljastuu ja pää näyttää lommoiselta. Jätä pituutta takaraivon kyhmyn yläpuolelle, niin pää näyttää pyöreämmältä.",
            "**Arvet hiuspohjassa.** Skin fade paljastaa ne. Kysy asiakkaalta ensin; joskus siihen kohtaan kannattaa jättää hieman enemmän pituutta.",
            "**Pyörteet päälaella ja niskassa.** Pyörteen ympärillä hiukset ovat moneen suuntaan, ja sen läpi kulkeva lyhyt häivytys jää helposti laikukkaaksi. Aja nämä kohdat useasta suunnasta.",
          ],
        },
      ],
    },
    {
      id: "miksi-raitoja",
      title: "Miksi häivytykseen jää raitoja: säätövipu, puolikkaat ohjauskammat ja raidan poisto",
      blocks: [
        { p: "Raita syntyy, kun kahden vierekkäisen pituuden ero on liian suuri. Hyvä häivytys syntyy monesta pienestä askeleesta, ei yhdestä suuresta hypystä. Pienet askeleet tehdään koneen säätövivulla ja puolikkailla ohjauskammoilla." },
        { h3: "Säätövipu ja puolikkaat ohjauskammat" },
        { p: "Säätövipu on koneen kyljessä. Kun avaat sen, terä siirtyy taaksepäin ja hiukset jäävät hieman pidemmiksi. Kun suljet sen, terä siirtyy eteenpäin ja leikkaa lyhyemmäksi. Suunta vaihtelee koneittain, joten kokeile omalla koneellasi. Vivulla saat pituudet kahden ohjauskamman välille. Monessa kampasarjassa on lisäksi puolikkaat koot hyvin pieniä askelia varten." },
        { img: { src: img("can-gat-tren-tong-do-cat-fade"), alt: "Parturi pitää ylhäällä konetta ilman ohjauskampaa terä ylöspäin, peukalo koneen kyljessä olevalla metallisella säätövivulla", caption: "Säätövipu koneen kyljessä: auki on pidempi, kiinni lyhyempi. Suunta riippuu koneesta." } },
        { h3: "Vyöhykkeet ja ulospäin kaartuva veto" },
        { p: "Tavallinen työtapa on tehdä yhdellä ohjauskammalla ohjauslinja koko pään ympäri valitulle korkeudelle. Sen alapuolinen alue tehdään vyöhykkeittäin: alin vyöhyke on lyhin, ja jokaisessa ylemmässä käytetään hieman pidempää pituutta. Älä vedä konetta pysähdyskohdassa suoraan irti. Käännä rannetta ja kauho kone ulospäin pienessä kaaressa kuin lusikalla, jolloin pysähdyskohta häipyy eikä siihen jää raitaa." },
        { img: { src: img("vach-giua-cac-dai-khi-cat-fade"), alt: "Miesasiakkaan sivu kesken häivytyksen: lyhyissä hiuksissa näkyy selviä vaakaraitoja eri pituisten vyöhykkeiden välissä", caption: "Työ kesken: vyöhykkeiden välissä näkyy vielä raitoja. Nyt ne poistetaan välipituudella." } },
        { h3: "Raidan poisto paikallaan" },
        { p: "Olit kuinka huolellinen tahansa, kahden vyöhykkeen väliin jää usein haalea raita. Poista se näiden vyöhykkeiden välipituudella, vipu puoliksi auki tai puolikas ohjauskampa, ja kulje vain raitaa pitkin ja käännä ulos. Älä käy koko aluetta läpi." },
        { note: "Hyvin yleinen virhe on pelätä raitoja niin paljon, että nouset yhä ylemmäs. Häivytys hiipii ylöspäin, korkeammalle kuin lupasit asiakkaalle. Pysähdy ja poista raita siitä kohdasta, jossa se on; älä siirrä sitä ylemmäs.", kind: "warn", title: "Älä jahtaa raitaa" },
        { h3: "Valo ja katselukulmat" },
        { p: "Ylhäältä tulevassa valossa raidat ja laikut näkyvät hyvin selvästi. Hämärässä häivytys voi näyttää tasaiselta, ja asiakas huomaa virheen vasta auringossa. Tarkista siis hyvässä valossa: kallista asiakkaan päätä, katso vasemmalta ja oikealta, kyykisty silmien tasolle ja katso takaosa. Aseta lopuksi sormi kummallekin puolelle ja vertaa, onko häivytys samalla korkeudella, aivan kuten pulisonkeja tarkistaessa." },
      ],
    },
    {
      id: "ihoon-asti",
      title: "Ihoon asti: folioparranajokone, partaveitsi ja herkkä iho",
      blocks: [
        { p: "Skin fadessa aivan alin osa tehdään yleensä folioparranajokoneella tai partaveitsellä. Foliokone on iholle hellävaraisempi. Partaveitsessä käytetään vain kertakäyttöisiä teriä, jokaiselle asiakkaalle uusi." },
        { p: "Herkkään ihoon nousee ajon jälkeen helposti punaisia näppylöitä. Kiristä näiden asiakkaiden ihoa kevyesti, aja karvan kasvusuuntaan äläkä käy samaa kohtaa monta kertaa. Jos asiakkaan iho ärtyy helposti, jää koneen lyhimpään pituuteen äläkä aja ihoon asti." },
        { note: "Haava, tulehdus tai märkänäppylät hiuspohjassa tarkoittavat, ettei ajeta. Koneet, ohjauskammat, kammat ja parranajokoneet puhdistetaan ja desinfioidaan jokaisen asiakkaan jälkeen tuotteen ohjeen mukaan. Määräykset vaihtelevat maittain, joten tarkista oman työpaikkasi vaatimukset. Katso myös [Välineet jokaisen asiakkaan jälkeen](lesson:ve-sinh-dung-cu) ja [Milloin asiakasta ei hoideta](lesson:khi-nao-khong-lam).", kind: "warn", title: "Turvallinen ajo ihoon asti" },
      ],
    },
    {
      id: "kuinka-kauan-fade-pysyy",
      title: "Kuinka kauan fade pysyy siistinä ja miten uusi aika varataan",
      blocks: [
        { p: "Kerro asiakkaalle etukäteen, että häivytys on parhaimmillaan ensimmäisen viikon tai kaksi. Hiukset kasvavat noin sentin kuukaudessa, joten ihoa lähellä oleva osa kasvaa pian umpeen. Moni asiakas pitää häivytyksensä kunnossa palaamalla noin 2–3 viikon päästä. Se on yleinen tapa, ei sääntö, ja riippuu siitä, kuinka terävänä asiakas haluaa sen pitää." },
        { p: "Kirjaa jokaisen leikkauksen jälkeen, oliko häivytys korkea vai matala, mitä ohjauskampoja käytit ja miten vipu oli säädetty. VaraaAissa muistiinpanot ovat [asiakastiedoissa](lesson:khach-hang), joten ensi kerralla kuka tahansa leikkaaja voi tehdä täsmälleen saman. Ehdota maksun yhteydessä seuraavan käynnin varaamista suoraan [ajanvarauskalenteriin](lesson:lich-hen), tai käytä säännöllisesti palaaville [kanta-asiakaskorttia](lesson:the-khach-quen)." },
      ],
    },
  ],
  faq: [
    {
      q: "Mikä on fade-leikkaus?",
      a: "Fade-leikkauksessa eli häivytyksessä hiukset lyhenevät vähitellen alaspäin: niskassa ja korvien ympärillä hyvin lyhyiksi, joskus ihoon asti, ja ylöspäin ne pitenevät päälaelle saakka. Lyhyistä hiuksista näkyy hiuspohjaa ja ne näyttävät vaaleilta, pidemmät tummemmilta, joten silmä näkee pehmeän sävynmuutoksen. Oikein tehdyssä häivytyksessä ei ole raitoja eikä portaita.",
    },
    {
      q: "Mitä eroa on matalalla, keskikorkealla ja korkealla häivytyksellä?",
      a: "Siinä, mistä siirtymä alkaa. Matala häivytys alkaa heti korvan yläpuolelta ja kaartuu alas niskaan. Keskikorkea on ohimon tasolla. Korkea nousee päälaen reunan lähelle tai sen yli, ja sivut ovat lähes ihoon asti. Parturit nimittävät korkeudet hieman eri tavoin, joten kohta kannattaa osoittaa asiakkaan päästä.",
    },
    {
      q: "Mitä eroa on taperilla ja fadella?",
      a: "Taper on pehmeämpi kuin fade. Taperissa vain pulisonkien ja niskan hiusraja lyhennetään asteittain, ja muualla sivuilla hiukset säilyvät. Se sopii asiakkaalle, joka haluaa siistin ilmeen ilman, että iho näkyy.",
    },
    {
      q: "Mikä on skin fade?",
      a: "Skin fade eli nollahäivytys on häivytys, jonka aivan alin osa ajetaan ihoon asti, yleensä folioparranajokoneella tai partaveitsellä, jossa on kertakäyttöinen terä. Herkkäihoisen asiakkaan, jonka iho ärtyy ajosta helposti, kannattaa jäädä koneen lyhimpään pituuteen.",
    },
    {
      q: "Millainen häivytys kannattaa valita ensimmäisellä kerralla?",
      a: "Aloita matalalla häivytyksellä tai vähän matalammalla kuin aiomasi malli. Matala häivytys on hillitty, koska suurimpaan osaan sivuja jää hiusta. Ensi kerralla korkeammaksi on helppo, mutta korkeaksi leikattu pitää odottaa kasvamaan takaisin.",
    },
    {
      q: "Kuinka usein fade pitää leikata?",
      a: "Fade on parhaimmillaan ensimmäisen viikon tai kaksi, minkä jälkeen ihoa lähellä oleva osa kasvaa umpeen, koska hiukset kasvavat noin sentin kuukaudessa. Moni asiakas palaa noin 2–3 viikon päästä pitääkseen häivytyksen terävänä. Se on yleinen tapa, ei sääntö.",
    },
  ],
  related: ["cat-nam-fade", "cat-nam-co-ban-hieu-dung", "cat-nam-tao-kieu-hieu-dung", "toc-tu-van-chia-vung-hieu-dung"],
};

export default article;
