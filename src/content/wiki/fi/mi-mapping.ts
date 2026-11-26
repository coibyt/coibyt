import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/mi-mapping/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "ripsikartan-tekeminen",
  lesson: "mi-mapping",
  category: "lash",
  title: "Ripsikartan tekeminen: 11 vaihetta omien ripsien mittauksesta ankkuriripsiin",
  metaTitle: "Ripsikartan tekeminen 11 vaiheessa",
  metaDescription:
    "Ripsikartta vaihe vaiheelta: mittaa omat ripset, jaa tyyny viiteen alueeseen, merkitse pituus ja taivutus, peilaa toinen silmä ja kiinnitä ankkuriripset.",
  keyword: "ripsikartan tekeminen",
  keywords: [
    "ripsikartta",
    "ripsikartoitus",
    "cat eye ripsikartta",
    "ripsikartan alueet",
    "mitä ovat ankkuriripset",
    "omien ripsien mittaus",
    "kartoitustarrat ripsiin",
  ],
  excerpt: "Piirrä ripsikartta ja noudata sitä: mittaa omat ripset, jaa tyyny viiteen alueeseen, merkitse pituus ja taivutus, kiinnitä ankkuriripset, täytä ja vertaa silmiä.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-mi-lam-theo-ban-do-mi-cho-khach-trong-studio"),
    alt: "Ripsistylisti istuu tyylikkäässä studiossa sängyn päässä ja kumartuu makaavan asiakkaan ylle, taustalla kultakehyksinen seisova peili ja kaareva lamppu",
  },
  takeaways: [
    "Ripsikartta piirretään **silmänalustyynyyn**: muutama lyhyt viiva jakaa ripsirivin viiteen alueeseen, ja jokaisen viivan alle merkitään pituus ja taivutus.",
    "Mittaa omat ripset **katsoen suoraan ylhäältä**, ei koskaan sivulta. Niiden pituus ja vahvuus ovat kartan raja.",
    "Toiseen silmään tehdään peilikuva kartasta, ja sen puolen **omat ripset mitataan uudelleen** numeroiden kopioimisen sijaan.",
    "Kiinnitä ensin **ankkuriripset**, muutama alueelle, niin näet tyylin muodon vielä silloin, kun sitä on helppo korjata.",
    "Pituudet vaihtuvat alueelta toiselle pehmeästi eivätkä porrastu. Lopuksi kartta kirjataan seuraavaa huoltoa varten.",
  ],
  intro: [
    "Ripsikartan tekeminen on kaksiosainen työ: ensin ajatellaan silmänalustyynyn päällä, ja vasta sitten kiinnitetään täsmälleen se, mitä kirjoitettiin. Kartta jakaa ripsirivin alueisiin ja määrää jokaisen alueen pituuden ja taivutuksen etukäteen. Sen avulla silmistä tulee tasapainoiset ja tyyli on se, josta asiakkaan kanssa sovittiin.",
    "Artikkeli perustuu VaraaAi Academyn Ripset-kurssin oppituntiin ”Ripsikartoitus: ripsikartan piirtäminen vaihe vaiheelta”. Esimerkkinä on pehmeä cat eye asiakkaalle, jolla on mantelisilmät. Pituudet ovat vain esimerkki yhdelle asiakkaalle: todellinen kartta riippuu aina edessäsi makaavan ihmisen silmistä ja omista ripsistä.",
  ],
  sections: [
    {
      id: "mihin-karttaa-tarvitaan",
      title: "Mihin ripsikarttaa tarvitaan",
      blocks: [
        { p: "Kartta on muistilappu aivan ripsirivin vieressä. Työn aikana sinun ei tarvitse muistaa, montako millimetriä kullekin alueelle tulee, eikä arvailla, mitä teit toiseen silmään. Kaikki lukee tyynyssä." },
        { p: "Tässä artikkelissa keskitytään ajatteluun ennen kiinnitystä. Jokaisen ripsen kiinnitys eristämisestä etäisyyteen luomesta pysyy samana kuin artikkelissa [klassisten ripsienpidennysten tekeminen](lesson:mi-classic). Mikä tyyli sopii millekin silmänmuodolle ja miten taivutukset J, B, C, CC, D ja L eroavat, selitetään artikkelissa [ripsienpidennysten tyylit silmänmuodon mukaan](lesson:mi-mapping-hieu-dung)." },
      ],
    },
    {
      id: "cat-eye-esimerkkikartta",
      title: "Esimerkki: pehmeän cat eye -tyylin ripsikartta",
      blocks: [
        { p: "Tämä on oppitunnin videolla käytetty kartta asiakkaalle, jolla on mantelisilmät." },
        {
          table: {
            head: ["Alue", "Pituus (esimerkki)", "Taivutus (esimerkki)"],
            rows: [
              ["1, sisänurkka", "8 mm", "C"],
              ["2", "9 mm", "C"],
              ["3", "10 mm", "C"],
              ["4", "11 mm", "C"],
              ["5, ulkonurkka", "12 mm", "C"],
            ],
          },
        },
        { img: { src: img("bo-mi-kieu-mat-meo-nhe-dai-dan-ve-duoi-mat"), alt: "Lähikuva suljetusta silmästä valmiissa pehmeässä cat eye -tyylin klassisessa setissä, ripset lyhyet sisänurkassa ja tasaisesti pitenevät kohti ulkonurkkaa", caption: "Esimerkkikartan tulos: pituus kasvaa sisänurkasta ulkonurkkaan ilman portaita." } },
        { note: "Luvut ovat vain esimerkki yhdelle asiakkaalle. Alueen pituus ei saa koskaan ylittää sitä, mitä juuri mittaamasi omat ripset jaksavat kantaa: missä ripset ovat heikot, sinne tulee lyhyempi ja kevyempi ripsi, oli kartta kuinka kaunis tahansa.", kind: "warn", title: "Älä kopioi lukuja" },
        { p: "Kaksi tavallista muunnelmaa: doll eye -tyylissä pisin kohta tulee juuri pupillin merkin kohdalle. Fox eye -tyylissä ulkoalueelle voi merkitä voimakkaamman taivutuksen, esimerkiksi C:n sijaan D:n, jotta ulkonurkka nousee." },
      ],
    },
    {
      id: "kiintopisteet-ja-katsekulma",
      title: "Kaksi kiintopistettä ja oikea katsekulma mittauksessa",
      blocks: [
        { p: "Kun asiakas vielä istuu silmät auki ja katse suoraan eteenpäin, paina mieleesi kaksi kiintopistettä: **pupillin kohta** ja **kulmakarvan korkein kohta**. Kun hän makaa silmät kiinni, et enää näe niitä, mutta tarvitset niitä tyylin pisimmän kohdan sijoittamiseen." },
        { p: "Katso silmää mitatessa ja piirtäessä suoraan ylhäältä. Sivulta katsottuna pituudet ja alueiden paikat vääristyvät, kartta menee vinoon heti alussa, eivätkä silmät vastaa toisiaan." },
        { note: "Käytä ohutta, myrkytöntä ja iholle turvallista kynää. Kärki koskee vain tyynyä, ei koskaan ripsiä eikä silmää. Tyynyn on tänään oltava täysin sileä ja siisti, koska se on paperi, johon piirrät.", kind: "warn", title: "Kynä koskee vain tyynyä" },
      ],
    },
    {
      id: "ankkuriripset",
      title: "Mitä ankkuriripset ovat ja miksi ne kiinnitetään ensin",
      blocks: [
        { p: "Ankkuriripset ovat muutama pidennys, jotka kiinnitetään ensin jokaiselle alueelle täsmälleen kartan pituudella. Ne ovat koko setin runko. Niistä näet heti tyylin kaaren: nouseeko se tasaisesti kohti ulkonurkkaa, onko jossain katkos?" },
        { p: "Tämä on myös helpoin hetki korjata, koska ripsiä on vasta muutama. Jotkut salongit antavat asiakkaan nousta ankkurien jälkeen istumaan ja katsoa nopeasti peiliin, kun liima on kuivunut eikä silmiä kirvele. Jos teillä ei tehdä niin, seiso sängyn päässä, katso alas ja vertaa silmiä ennen täyttöä." },
      ],
    },
    {
      id: "yleiset-virheet",
      title: "Kolme yleistä virhettä ripsikartan kanssa",
      blocks: [
        {
          table: {
            head: ["Virhe", "Seuraus", "Näin vältät sen"],
            rows: [
              ["Mittaus ja piirto sivusta katsoen", "Kartta on vino alusta asti, eivätkä silmät vastaa toisiaan", "Katso suoraan ylhäältä mitatessa ja piirtäessä"],
              ["Kartan kopiointi sellaisenaan toiseen silmään", "Unohtuu, että omat ripset ovat puolittain erilaiset", "Peilaa kartta, mittaa sen puolen ripset uudelleen ja säädä pituuksia tarvittaessa"],
              ["Liian suuret pituushypyt alueiden välillä", "Ripsirivi näyttää porrastetulta", "Anna pituuksien vaihtua pehmeästi alueiden rajalla"],
            ],
          },
        },
        { p: "Kaikki kolme vältetään, kun työskentelet rauhassa ja katsot tarkasti joka vaiheessa." },
      ],
    },
    {
      id: "kartan-kirjaaminen",
      title: "Kirjaa kartta seuraavaa huoltoa varten",
      blocks: [
        { p: "Tyyny poistetaan käynnin lopussa, joten kartta on kirjattava ennen kuin asiakas lähtee: tyyli sekä jokaisen alueen pituus ja taivutus. Seuraavassa [huollossa](lesson:mi-dam-thao) voit tehdä täsmälleen saman tai säätää asiakkaan toiveen mukaan." },
        { p: "VaraaAissa kartalle on paikka [asiakkaan tietojen](lesson:khach-hang) sisäisissä muistiinpanoissa, jotka näkyvät vain salongille. Kuka tahansa salongin ripsistylisti, joka ottaa asiakkaan seuraavalla kerralla, voi noudattaa samaa karttaa. Varaa huoltoaika [kalenteriin](lesson:lich-hen), kun asiakas on vielä salongissa." },
        { note: "Artikkelin pituudet (8–12 mm, C-taivutus) ovat vain esimerkki yhdelle asiakkaalle; todellinen kartta riippuu aina asiakkaan silmistä ja omien ripsien vahvuudesta, ripsivalmistajan taulukosta ja liimavalmistajan ohjeista. Kauneuspalveluja ja -tuotteita koskevat säännöt vaihtelevat maittain. Artikkeli on koulutusmateriaalia, ei ammattipätevyys.", kind: "info", title: "Huomio" },
      ],
    },
  ],
  howTo: {
    title: "Ripsikartan tekeminen ja noudattaminen vaihe vaiheelta",
    id: "ripsikartan-vaiheet",
    after: "mihin-karttaa-tarvitaan",
    lead: "Yksitoista vaihetta oppitunnin videon järjestyksessä. Kuusi ensimmäistä piirtää kartan, viisi viimeistä noudattaa sitä.",
    supplies: [
      "Silmänalustyynyt täysin sileästi ja siististi asetettuina",
      "Ohut, myrkytön ja iholle turvallinen kynä tai valmiit kartoitustarrat",
      "Tunnetun pituinen pidennysripsi vertailuun tai pieni ripsiviivain",
      "Ripsialustat kartan pituuksilla sekä lyhyempi nauha nuorille ripsille",
      "Liima, pinsetit ja kertakäyttötarvikkeet kuten klassisten oppitunnilla",
    ],
    steps: [
      {
        name: "Konsultoi ja sovi yksi tyyli",
        text: "Asiakas istuu silmät auki ja katsoo suoraan eteenpäin. Katso silmänmuoto ja omat ripset, kysy toive, näytä mallikuvia muutamasta tyylistä ja kerro, mikä sopii ja miksi. Paina mieleesi pupillin ja kulmakarvan korkeimman kohdan paikka. Älä aloita, jos asiakas vielä epäröi.",
        image: { src: img("tu-van-xem-anh-mau-kieu-mi-tren-may-tinh-bang"), alt: "Ripsistylisti ja asiakas istuvat studiossa kermanvärisellä sohvalla ja katsovat ripsityylin mallikuvaa tabletilta, asiakas hymyilee ja osoittaa näyttöä" },
      },
      {
        name: "Valmistele kuten klassisissa",
        text: "Asiakas mukavaan asentoon, ripset puhtaiksi, silmänalustyynyt paikoilleen ja ripset harjattuina. Tyynyjen on oltava täysin sileät ja siistit, koska piirrät niihin kohta.",
      },
      {
        name: "Mittaa omat ripset",
        text: "Katso silmää suoraan ylhäältä. Pidä sisänurkassa, keskellä ja ulkonurkassa tunnetun pituinen pidennys oman ripsen rinnalla vertailuna; jotkut käyttävät pientä ripsiviivainta. Paina mieleen, kuinka pitkät ja vahvat ripset kullakin alueella ovat: se on kartan raja.",
        image: { src: img("do-mi-that-bang-mot-soi-mi-noi-da-biet-do-dai"), alt: "Mustaan käsineeseen puetun käden pinsetit pitävät pidennysripseä asiakkaan oman ripsen rinnalla pituuden vertaamiseksi, asiakkaan silmä on kiinni" },
      },
      {
        name: "Jaa tyyny viiteen alueeseen",
        text: "Piirrä ohuella kynällä tyynyyn muutama lyhyt viiva, jotka jakavat ripsirivin sisänurkasta ulkonurkkaan viiteen alueeseen. Valmiit kartoitustarrat käyvät myös. Merkitse lisäksi pupillin kohta, jonka painoit mieleen asiakkaan istuessa.",
        image: { src: img("ve-vach-chia-nam-vung-tren-mieng-lot-mat"), alt: "Mustaan käsineeseen puettu käsi piirtää ohuella luumunvärisellä kynällä lyhyitä viivoja valkoiseen tyynyyn asiakkaan suljetun silmän alle alueiden merkitsemiseksi", caption: "Kynä koskee vain tyynyä, kaukana ripsistä ja silmästä." },
      },
      {
        name: "Merkitse pituus ja taivutus alueittain",
        text: "Kirjoita ne jokaisen viivan alle. Esimerkin pehmeässä cat eyessä: 8, 9, 10, 11 ja 12 mm sisänurkasta ulkonurkkaan, kaikki C-taivutuksella. Missä omat ripset ovat heikot, merkitse lyhyempi ja kevyempi ripsi.",
      },
      {
        name: "Peilaa kartta toiseen silmään",
        text: "Sisänurkka on edelleen alue yksi ja ulkonurkka alue viisi. Mittaa sen puolen omat ripset uudelleen, koska silmät ovat harvoin täysin samanlaiset, ja säädä pituuksia tarvittaessa, jotta lopputulos näyttää tasapainoiselta.",
      },
      {
        name: "Järjestä ripsinauhat kartan mukaan",
        text: "Aseta nauhat kartan järjestykseen, lyhin sisänurkalle ja sitten pitenevät. Pidä valmiina ylimääräinen lyhyempi nauha sisänurkan nuorille ripsille. Kädet eivät joudu etsimään, ja pituudet menevät harvemmin sekaisin.",
        image: { src: img("xep-vi-mi-theo-thu-tu-ban-do"), alt: "Ylhäältä kuvattu kultareunainen valkoinen kivitarjotin, jolla vaaleanpunainen ripsialusta nauhat lyhyimmästä pisimpään, jadekivi liimapisaroineen, kahdet pinsetit ja liimapullo" },
      },
      {
        name: "Kiinnitä ankkuriripset",
        text: "Kiinnitä jokaiselle alueelle ensin muutama ripsi täsmälleen kartan pituudella. Tekniikka on klassinen: eristä yksi oma ripsi, pidä tyvi irti luomesta äläkä koskaan laita liimaa iholle. Tarkista ankkureista tyylin kaari.",
        image: { src: img("gan-mi-neo-o-tung-vung-theo-so-do"), alt: "Lähikuva suljetusta silmästä, jonka omaan ripsiriviin on kiinnitetty tasaisin välein muutama musta pidennys valkoisen tyynyn päällä", caption: "Ankkuriripset: muutama ripsi eri alueille, riittävästi tyylin muodon näkemiseen." },
      },
      {
        name: "Tarkista muoto",
        text: "Jos salongissanne asiakas saa nousta ankkurien jälkeen katsomaan peiliin, tee se vasta kun liima on kuivunut eikä silmiä kirvele. Muuten seiso sängyn päässä, katso alas ja vertaa silmiä. Korjaa nyt, kun ripsiä on vasta muutama.",
      },
      {
        name: "Täytä alue kerrallaan",
        text: "Kiinnitä loput ripset alue kerrallaan. Kahden alueen rajalla pituuksien on vaihduttava vähitellen, jotta linja pysyy pehmeänä ilman portaita. Vuorottele alueita kuten klassisissa, jotta liima ehtii kuivua eikä synny tarttumia.",
      },
      {
        name: "Tarkista symmetria, viimeistele ja kirjaa kartta",
        text: "Seiso sängyn päässä ja katso molempia silmiä yhtä aikaa: ovatko ulkonurkan pituus, pisin kohta ja taivutus samat molemmilla puolilla? Lisää muutama ripsi sinne, mistä puuttuu, ja harjaa ripset. Poista tyynyt silmien ollessa vielä kiinni, anna jälkihoito-ohjeet kuten klassisissa ja kirjaa kartta asiakkaan tietoihin.",
        image: { src: img("kiem-tra-can-doi-hai-mat-tu-dau-giuong"), alt: "Sängyllä makaava asiakas sängyn päästä kuvattuna, molemmat silmät kiinni ja valkoiset tyynyt yhä paikallaan, kaksi valmista ripsiriviä näyttävät samanlaisilta" },
      },
    ],
  },
  faq: [
    {
      q: "Montako aluetta ripsikartassa on?",
      a: "Tällä oppitunnilla ripsirivi jaetaan sisänurkasta ulkonurkkaan viiteen alueeseen muutamalla silmänalustyynyyn piirretyllä lyhyellä viivalla. Valmiita kartoitustarroja voi käyttää myös. Jokaisen alueen pituus ja taivutus kirjoitetaan sen viivan alle.",
    },
    {
      q: "Millä kynällä ripsikartta piirretään?",
      a: "Ohuella kynällä, joka on myrkytön ja iholle turvallinen. Kärki koskee vain silmänalustyynyä, ei koskaan ripsiä eikä silmää.",
    },
    {
      q: "Mitä pituuksia cat eye -ripsikarttaan tulee?",
      a: "Oppitunnin esimerkki on pehmeä cat eye: 8, 9, 10, 11 ja 12 mm sisänurkasta ulkonurkkaan, kaikki C-taivutuksella. Se on vain esimerkki yhdelle asiakkaalle. Alueen pituus ei saa koskaan ylittää sitä, mitä siellä olevat omat ripset jaksavat kantaa.",
    },
    {
      q: "Mitä ovat ankkuriripset?",
      a: "Ankkuriripset ovat muutama pidennys, jotka kiinnitetään ensin jokaiselle alueelle täsmälleen kartan pituudella setin rungoksi. Niistä näkee, onko tyylin kaari oikea, ja silloin korjaaminen on helpointa, koska ripsiä on vasta muutama.",
    },
    {
      q: "Voiko ripsikartan kopioida silmästä toiseen?",
      a: "Ei sellaisenaan. Toiseen silmään tehdään peilikuva, jossa sisänurkka on edelleen alue yksi ja ulkonurkka alue viisi, mutta sen puolen omat ripset mitataan uudelleen ja pituuksia säädetään tarvittaessa. Tavoite on tasapainoiselta näyttävä lopputulos, ei kaksi identtistä karttaa.",
    },
    {
      q: "Miksi omat ripset mitataan ylhäältä katsoen?",
      a: "Sivulta katsottuna pituudet ja alueiden paikat vääristyvät. Jos kartta on vino alusta asti, silmät eivät vastaa toisiaan, vaikka myöhemmät vaiheet tehtäisiin huolellisesti.",
    },
  ],
  related: ["mi-mapping-hieu-dung", "mi-classic", "mi-hybrid", "mi-dam-thao"],
};

export default article;
