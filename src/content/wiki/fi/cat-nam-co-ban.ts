import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cat-nam-co-ban/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "miesten-hiusten-leikkaus-vaihe-vaiheelta",
  lesson: "cat-nam-co-ban",
  category: "hair",
  title: "Miesten hiusten leikkaus vaihe vaiheelta: 12 vaihetta konesivuista siistiin rajaukseen",
  metaTitle: "Miesten hiusten leikkaus: 12 vaihetta koneella ja saksilla",
  metaDescription:
    "Miesten hiusten leikkaus vaihe vaiheelta: kaulapaperi, konsultaatio, sivut ja niska ohjauskammalla, sakset kamman päällä, päälaen ohjauslinja ja rajaukset.",
  keyword: "miesten hiusten leikkaus",
  keywords: [
    "parturileikkaus vaihe vaiheelta",
    "miesten hiusten leikkaus koneella",
    "miesten hiusten leikkaus saksilla",
    "klassinen lyhyt miesten malli",
    "leikataanko miesten hiukset märkinä vai kuivina",
    "pulisonkien ja niskan rajaus",
    "miesten hiusten leikkaus kotona",
  ],
  excerpt: "Klassinen lyhyt miesten leikkaus oikeassa järjestyksessä: sivut ja takaosa koneella, häivytys saksilla kamman päällä, päälaki ohjauslinjaan ja lopuksi rajaukset.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-cat-toc-nam-trong-tiem-barber-sang-trong"),
    alt: "Violettiliivinen parturi seisoo kampa kädessä mustaan viittaan puetun miesasiakkaan takana tummalla puulla paneloidussa parturiliikkeessä, jossa on messinkikehyksiset peilit",
  },
  takeaways: [
    "Sovi neljä asiaa ennen leikkausta: kuinka lyhyet sivut, paljonko päälaelle, suora vai pyöristetty niska ja mihin pulisongit päättyvät.",
    "Aja koneella sovitulla **tai pidemmällä** ohjauskammalla, kampa tasaisesti päätä vasten, ylöspäin kasvusuuntaa vastaan, ja käännä rannetta ulos päälaen reunan kohdalla.",
    "Päälaen ensimmäinen osio edessä on **ohjauslinja**: jokaiseen seuraavaan otetaan hieman edellistä ja sama nostokulma pidetään.",
    "Lyhennä tai poista ohjauskampa aivan alareunassa vain, jos asiakas on suostunut siihen etukäteen.",
    "Ennen kuin asiakas lähtee, kirjaa ohjauskampa, pituudet ja niskan muoto ja varaa seuraava käynti noin 3–5 viikon päähän.",
  ],
  intro: [
    "Miesten hiusten leikkaus alkaa mallista, joka jokaisen parturin on osattava ulkoa: klassinen lyhyt leikkaus, jossa lyhyet sivut ja takaosa häivytetään pehmeästi pidempään päälakeen ja rajaukset ovat siistit. Se ei vaadi erikoisvälineitä. Se vaatii oikean järjestyksen ja käden, joka ei kiirehdi.",
    "Artikkeli seuraa VaraaAi Academyn Hiukset-kurssin oppitunnin ”Miesten perusleikkaus: käytäntö vaihe vaiheelta” työjärjestystä kaulapaperin kiertämisestä tuolin alustan lakaisuun. Ohjetta seuraamalla leikkaat kokonaisen lyhyen miesten mallin ja tarkistat sen ennen kuin asiakas nousee tuolista. Jokaisen liikkeen syyt ovat teoria-artikkelissa [miesten hiustenleikkauksen perusteet](lesson:cat-nam-co-ban-hieu-dung).",
  ],
  sections: [
    {
      id: "sovi-asiakkaan-kanssa",
      title: "Klassinen lyhyt miesten malli ja neljä asiaa, joista sovitaan",
      blocks: [
        { p: "Ennen kuin kone käynnistyy, teidän molempien on nähtävä mielessänne sama leikkaus. Klassiseen lyhyeen malliin riittää neljä kysymystä, kuten artikkelissa [hiusten jakaminen osioihin](lesson:toc-tu-van-chia-vung)." },
        {
          table: {
            head: ["Kysy asiakkaalta", "Sovi näin"],
            rows: [
              ["Kuinka lyhyet sivut", "Tietty ohjauskampa"],
              ["Paljonko päälaelle jää", "Sormilla: ”näin paljon”"],
              ["Suora vai pyöristetty niska", "Jompikumpi, selvästi sanottuna"],
              ["Mihin pulisongit päättyvät", "Osoita kohta asiakkaan kasvoilta"],
            ],
          },
        },
        { p: "Kysy myös, miten edellinen leikkaus tehtiin ja oliko siinä jotain, mistä asiakas ei pitänyt. Se, mistä hän ei pitänyt, on usein tärkeämpää kuin se, mistä hän piti. Kampaa keskustelun aikana hiuksia muutamaan suuntaan, etsi pyörteet ja katso hiuspohja." },
        { note: "Ohjauskampojen numerot vaihtelevat konemerkeittäin. Jos uusi asiakas kertoo numeron, johon hän on tottunut toisessa parturissa, aloita pidemmällä ja etene lyhyempään.", kind: "tip", title: "Ammattilaisen vinkki" },
      ],
    },
    {
      id: "markana-vai-kuivana",
      title: "Leikataanko miesten hiukset märkinä vai kuivina",
      blocks: [
        { p: "Oppitunnilla hiukset kostutetaan tasaisesti sumutteella ennen leikkausta. Moni parturi taas tekee konetyön puhtaisiin, kuiviin hiuksiin ja kostuttaa ne vasta päälaen saksityötä varten. Kumpikin tapa käy, kunhan hiukset ovat puhtaat, suoriksi kammatut ja takuttomat." },
        { p: "Vältettävä on valuvan märkä tukka. Kampaa samalla kun sumutat, siihen suuntaan, johon hiukset luonnostaan laskeutuvat, ja lopeta, kun ne ovat tasaisen kosteat." },
      ],
    },
    {
      id: "nelja-tarkistusta",
      title: "Neljä tarkistusta yhden miesten leikkauksen aikana",
      blocks: [
        { p: "Aloittelija leikkaa usein yhtä soittoa ja katsoo tulosta vasta lopussa, jolloin korjaaminen on vaikeaa. Kokenut parturi pysähtyy tarkistamaan jokaisen vaiheen jälkeen, ja jokainen tarkistus vie vain muutaman sekunnin." },
        {
          ol: [
            "**Konekierroksen jälkeen.** Kampaa hiukset alas ja aja uudelleen toisesta suunnasta, jotteivät ensimmäisellä kerralla painuneet hiukset jää leikkaamatta.",
            "**Päälaen leikkauksen jälkeen.** Ristiintarkista poikittaisilla osioilla puolelta toiselle ja tasaa esiin nousevat suortuvat.",
            "**Kun päälaki on häivytetty sivuihin.** Sivele kädellä alhaalta ylöspäin ja katso profiilista. Siirry rajauksiin vasta, kun porrasta ei ole.",
            "**Rajauksen jälkeen.** Pää suorassa, katse peiliin ja kaksi sormea vertaa pulisonkeja. Näytä sitten käsipeilillä niska asiakkaalle.",
          ],
        },
        { p: "Pysähdy myös kerran päälaen puolivälissä, katso peiliin ja kysy asiakkaalta, onko pituus hyvä. Kun kysyt hiusten ollessa vielä pitkät, pituutta voi vielä muuttaa." },
      ],
    },
    {
      id: "suora-vai-pyoristetty-niska",
      title: "Suora vai pyöristetty niskalinja ja milloin ohjauskampa poistetaan alareunasta",
      blocks: [
        { p: "Suora ja pyöristetty niska ovat yhtä oikeita. Teet täsmälleen sen, mistä konsultaatiossa sovittiin. Pyydä rajausta varten asiakasta laskemaan päätä hieman eteen, siisti reuna hiusrajaa myöten äläkä nosta niskalinjaa liian ylös." },
        { img: { src: img("vien-gay-toc-nam-bang-tong-do-vien"), alt: "Miesasiakkaan takana seisova parturi pitää toisella kädellä asiakkaan hieman eteen laskettua päätä ja siistii toisella kädellä niskalinjaa pienellä mustalla trimmerillä", caption: "Asiakas laskee päätä hieman eteen, ja parturin vapaa käsi pitää pään vakaana niskan rajauksessa." } },
        { p: "Sivujen ja niskan aivan alin osa houkuttelee usein lyhentämään lisää siistimmän näköiseksi. Käytä alareunassa lyhyempää ohjauskampaa tai konetta ilman kampaa vain, jos asiakas on suostunut siihen etukäteen. Ilman sopimusta jätä se tekemättä, koska lyhyeksi leikattua hiusta ei saa takaisin pitkäksi." },
      ],
    },
    {
      id: "hygienia-ja-turvallisuus",
      title: "Välinehygienia ja milloin ei leikata",
      blocks: [
        { p: "Kone, ohjauskammat, kammat ja sakset puhdistetaan ja desinfioidaan jokaisen asiakkaan jälkeen käyttämäsi desinfiointiaineen ohjeen mukaan. Kaulapaperit ja partaterät ovat kertakäyttöisiä. Koneen terä öljytään desinfioinnin jälkeen, jotta se kulkee seuraavalla asiakkaalla sujuvasti." },
        { note: "Haava, tulehdus tai täit hiuspohjassa tarkoittavat, ettei leikata. Kampaamoiden hygieniamääräykset vaihtelevat maittain, joten tarkista oman työpaikkasi vaatimukset. Katso myös [Välineet jokaisen asiakkaan jälkeen](lesson:ve-sinh-dung-cu) ja [Milloin asiakasta ei hoideta](lesson:khi-nao-khong-lam).", kind: "warn", title: "Turvallisuus" },
      ],
    },
    {
      id: "asiakastiedot",
      title: "Kirjaa ylös, niin ensi kerralla asiakas sanoo vain ”kuten viimeksi”",
      blocks: [
        { p: "Tyytyväinen miesasiakas palaa yleensä täsmälleen samaan leikkaukseen. Siksi tämän päivän leikkauksesta kannattaa kirjata kolme asiaa: mikä ohjauskampa sivuilla, kuinka pitkä päälaki, suora vai pyöristetty niska. VaraaAissa kirjoitat ne asiakkaan muistiinpanoihin [asiakastiedoissa](lesson:khach-hang). Ensi kerralla kuka tahansa salongin tekijä voi leikata saman mallin." },
        { p: "Lyhyt leikkaus pysyy muodossa noin 3–5 viikkoa, joten varaa seuraava käynti asiakkaan vielä istuessa tuolissa. Voit lisätä sen suoraan salongin [ajanvarauskalenteriin](lesson:lich-hen) tai käyttää [kanta-asiakaskorttia](lesson:the-khach-quen), jotta asiakkaalla on syy palata säännöllisesti." },
      ],
    },
  ],
  howTo: {
    title: "Miesten hiusten leikkaus: työvaiheet järjestyksessä",
    id: "miesten-leikkauksen-vaiheet",
    after: "sovi-asiakkaan-kanssa",
    lead: "Kaksitoista vaihetta etenevät oppitunnin videon järjestyksessä: ensin kone, sitten sakset ja viimeisenä rajaukset.",
    supplies: [
      "Hiustenleikkuukone ja ohjauskammat puhdistettuina ja desinfioituina",
      "Trimmeri rajauksiin",
      "Leikkuukampa ja sakset puhdistettuina ja desinfioituina",
      "Sumutepullo",
      "Kertakäyttöinen kaulapaperi ja leikkuuviitta",
      "Kaulaharja ja käsipeili",
      "Hieman muotoilutuotetta",
    ],
    steps: [
      {
        name: "Pese kädet ja kiedo kaulapaperi",
        text: "Pese kädet ja tarkista, että kone, ohjauskammat, kammat ja sakset on puhdistettu ja desinfioitu edellisen asiakkaan jälkeen. Kiedo kertakäyttöinen kaulapaperi asiakkaan kaulan ympäri ja kiinnitä leikkuuviitta vasta sen päälle. Paperi estää viittaa koskemasta suoraan kenenkään asiakkaan ihoon.",
        image: { src: img("quan-giay-co-truoc-khi-cat-toc-nam"), alt: "Parturi kietoo valkoisen kaulapaperin sivuttain istuvan miesasiakkaan kaulan ympäri, musta viitta on jo hänen harteillaan" },
      },
      {
        name: "Tee konsultaatio ja sovi pituudet",
        text: "Kysy neljä kysymystä: sivut, päälaki, niskan muoto ja pulisongit. Lyö sivut lukkoon ohjauskamman numerolla ja päälaki sormin näyttämällä. Kampaa hiuksia muutamaan suuntaan pyörteiden löytämiseksi ja katso hiuspohja ennen aloittamista.",
      },
      {
        name: "Kostuta hiukset",
        text: "Sumuta tasaisesti ja kampaa samalla siihen suuntaan, johon hiukset luonnostaan laskeutuvat. Tasainen kosteus riittää, hiukset eivät saa valua. Jos ajat koneella mieluummin puhtaat ja kuivat hiukset, jätä tämä vaihe juuri ennen saksityötä.",
      },
      {
        name: "Aja sivut ohjauskammalla",
        text: "Kiinnitä sovittu ohjauskampa tai hieman pidempi. Aseta se tasaisesti päätä vasten hiusrajaan ja liiku ylöspäin kasvusuuntaa vastaan hitaasti ja tasaisesti, vedot hieman limittäin. Päälaen reunan kohdalla kevennä ja käännä rannetta ulospäin. Korvan lähellä taita korvaa sormella kevyesti alas, ettei se ole tiellä, äläkä koskaan paina konetta kovaa päätä vasten.",
        image: { src: img("di-tong-do-co-cu-nguoc-chieu-toc-moc"), alt: "Parturi kuljettaa mustalla ohjauskammalla varustettua konetta ylöspäin miesasiakkaan sivulla, toinen käsi lepää päälaella hiuksia pidellen", caption: "Ohjauskampa tasaisesti päätä vasten ja kone liikkuu ylöspäin. Vapaa käsi pitää päälaen hiukset poissa koneen tieltä." },
      },
      {
        name: "Aja takaosa niskasta takaraivon kyhmylle",
        text: "Takaosa tehdään kuten sivut: aloita niskan hiusrajasta, etene ylös takaraivon kyhmylle ja käännä rannetta ulos. Kierroksen jälkeen kampaa hiukset alas ja aja uudelleen toisesta suunnasta, ettei hiuksia jää leikkaamatta. Vain jos olet sopinut asiakkaan kanssa lyhyemmästä alareunasta, vaihdat nyt lyhyempään ohjauskampaan tai poistat sen, ja vain siinä alareunassa.",
        image: { src: img("di-tong-do-tu-gay-len-xuong-cham"), alt: "Takaa kuvattuna parturi kuljettaa ohjauskammallista konetta ylöspäin miesasiakkaan takaraivolla, toinen käsi lepää kevyesti asiakkaan niskalla" },
      },
      {
        name: "Häivytä ylöspäin saksilla kamman päällä",
        text: "Aseta kampa lähelle päätä siihen kohtaan, johon kone jäi, piikit hieman ulospäin. Leikkaa kamman läpi nousevat hiukset niin, että terä kulkee kamman suuntaisesti. Nosta kampaa vähitellen ylöspäin ja kallista sitä yhä enemmän ulos, jotta hiukset pitenevät kohti päälakea. Kierrä koko sivut ja sitten takaosa äläkä viivy yhdessä kohdassa, ettei synny porrasta.",
        image: { src: img("keo-tren-luoc-noi-toc-hai-ben"), alt: "Parturi tukee mustalla kammalla kerrosta miesasiakkaan hiuksia ja leikkaa saksilla kamman selän yli nousevat hiukset", caption: "Terä kulkee kamman suuntaisesti ja leikkaa vain piikkien läpi nousevan osan." },
      },
      {
        name: "Leikkaa päälaen ohjauslinja",
        text: "Erota päälaki otsan kulmista taaksepäin päälaen korkeimpaan kohtaan. Ota edestä ohut osio, nosta se suoraan ylös suoraan kulmaan hiuspohjaan nähden, pidä sitä etu- ja keskisormen välissä ja leikkaa sovittuun pituuteen. Se on ohjauslinjasi. Jokaiseen seuraavaan osioon otetaan mukaan hieman edellisen hiuksia, ja sama nostokulma pidetään päälaelle asti. Pyörteen kohdalla jätä hieman pidemmäksi ja käytä kevyttä kireyttä, jotteivät hiukset nouse pystyyn.",
        image: { src: img("cat-duong-chuan-phan-dinh-toc-nam"), alt: "Parturi pitää miesasiakkaan päälaen suortuvaa etu- ja keskisormen välissä suoraan ylös nostettuna ja leikkaa saksilla sormien yläpuolelta", caption: "Suortuva nostetaan suoraan kulmaan hiuspohjaan nähden ja leikataan sormien yläpuolelta." },
      },
      {
        name: "Ristiintarkista päälaki",
        text: "Leikkasit juuri edestä taaksepäin. Kampaa nyt hiukset ylös poikittaisina osioina puolelta toiselle, pidä jokaista sormien välissä ja katso, onko pituus tasainen. Tasaa esiin sojottavat suortuvat muiden mukaan.",
        image: { src: img("kiem-tra-cheo-phan-dinh-toc-nam"), alt: "Parturi nostaa kammalla miesasiakkaan päälaen suortuvan korkealle ja pitää sitä sormiensa välissä pituuden tarkistamiseksi" },
      },
      {
        name: "Häivytä päälaki sivuihin",
        text: "Kulmaan, jossa sivut kohtaavat päälaen, jää usein vielä pieni reuna. Käytä saksia kamman päällä tai leikkaa kulman hiukset ulospäin, kunnes voit sivellä kädellä alhaalta ylös etkä tunne porrasta. Katso peilistä profiili ja tarkista molemmat puolet.",
      },
      {
        name: "Rajaa korvat, pulisongit ja niska",
        text: "Taita korvaa kevyesti alas ja seuraa trimmerillä luonnollista kaarta hiusrajaa myöten leikkaamatta liian korkealta. Leikkaa pulisongit samanpituisiksi: asiakas istuu suorassa katse peiliin, ja asetat sormen kummankin pulisongin alareunaan vertailua varten. Viimeistele sovittu suora tai pyöristetty niska asiakkaan pää hieman eteen laskettuna.",
        image: { src: img("vien-toc-quanh-tai-bang-tong-do-vien"), alt: "Parturi taittaa miesasiakkaan korvaa sormella alas ja siistii sen vierestä hiusrajaa pienellä trimmerillä toisessa kädessään" },
      },
      {
        name: "Harjaa irtohiukset, muotoile ja näytä käsipeili",
        text: "Harjaa irtohiukset pois kaulalta ja korvien ympäriltä kaulaharjalla, poista viitta ja heitä kaulapaperi pois. Hiero hiuksiin hieman muotoilutuotetta niin kuin asiakas tekee kotona ja näytä hänelle miten. Pidä käsipeiliä hänen takanaan, jotta hän näkee niskan ja sivut. Jos hän haluaa muuttaa jotain, korjaa se heti, äläkä anna hänen huomata vasta kotona olevansa tyytymätön.",
        image: { src: img("cho-khach-xem-gay-bang-guong-tay"), alt: "Parturi pitää pyöreää messinkikehyksistä käsipeiliä miesasiakkaan pään takana, jotta tämä näkee juuri leikatun niskan" },
      },
      {
        name: "Kirjaa, varaa uusi aika ja siivoa",
        text: "Kirjaa asiakastietoihin, mikä ohjauskampa sivuilla, kuinka pitkä päälaki ja suora vai pyöristetty niska, ja varaa seuraava käynti yleensä 3–5 viikon päähän. Kun asiakas on lähtenyt, harjaa hiukset pois koneen terästä, desinfioi terä, ohjauskammat, kammat ja sakset tuotteen ohjeen mukaan, öljyä terä ja lakaise hiukset tuolin alta.",
      },
    ],
  },
  faq: [
    {
      q: "Mitkä ovat miesten perusleikkauksen työvaiheet?",
      a: "Valmistelu ja kaulapaperi, konsultaatio, kostutus, sivut ja takaosa koneella ohjauskammalla, häivytys ylöspäin saksilla kamman päällä, päälaki ohjauslinjaan, ristiintarkistus, päälaen häivytys sivuihin, korvien, pulisonkien ja niskan rajaus sekä lopuksi irtohiusten harjaus, muotoilu ja käsipeili.",
    },
    {
      q: "Leikataanko ensin sivut vai päälaki?",
      a: "Oppitunnin työjärjestyksessä sivut ja takaosa tehdään ensin koneella ohjauskammalla, ja ne häivytetään ylöspäin saksilla kamman päällä. Päälaki leikataan sen jälkeen saksilla edessä olevan ohjauslinjan mukaan. Päälaen häivytys sivuihin ja rajaukset tulevat viimeisinä.",
    },
    {
      q: "Mikä on ohjauslinja päälakea leikatessa?",
      a: "Se on päälaen ensimmäinen ohut osio edessä, joka nostetaan suoraan kulmaan hiuspohjaan nähden ja leikataan sovittuun pituuteen. Jokaiseen sen takana olevaan osioon otetaan hieman edellistä, ja se leikataan saman mukaan, joten päälaki pysyy tasaisena edestä päälaelle.",
    },
    {
      q: "Milloin ohjauskamman voi poistaa alareunasta?",
      a: "Vain kun siitä on sovittu asiakkaan kanssa etukäteen. Lyhyeksi leikattua hiusta ei saa takaisin pitkäksi, joten jokainen pituuden muutos vaatii asiakkaan suostumuksen. Jos et ole kysynyt, pidä sovittu ohjauskampa.",
    },
    {
      q: "Leikataanko miesten hiukset märkinä vai kuivina?",
      a: "Molemmat tavat toimivat. Oppitunnilla hiukset kostutetaan tasaisesti sumutteella ennen leikkausta, kun taas moni parturi ajaa puhtaat, kuivat hiukset koneella ja kostuttaa ne vasta saksityötä varten. Hiusten on joka tapauksessa oltava puhtaat, suoriksi kammatut, takuttomat eivätkä valuvan märät.",
    },
    {
      q: "Voinko leikata miehen hiukset kotona näiden ohjeiden mukaan?",
      a: "Työvaiheiden järjestys pysyy samana. Aloittelijan kannattaa aloittaa toivottua pidemmällä ohjauskammalla, pitää kampa tasaisesti päätä vasten, olla painamatta konetta ja jättää ohjauskampa paikalleen myös alareunassa. Haava, tulehdus tai täit hiuspohjassa tarkoittavat, ettei leikata.",
    },
  ],
  related: ["cat-nam-co-ban-hieu-dung", "toc-tu-van-chia-vung", "cat-nam-fade", "cat-nam-tao-kieu"],
};

export default article;
