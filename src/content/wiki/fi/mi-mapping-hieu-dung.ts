import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/mi-mapping-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "ripsienpidennysten-tyylit-silmanmuodon-mukaan",
  lesson: "mi-mapping-hieu-dung",
  category: "lash",
  title: "Ripsienpidennysten tyylit silmänmuodon mukaan: ripsikartta ja taivutukset J, B, C, CC, D, L",
  metaTitle: "Ripsienpidennysten tyylit silmänmuodon mukaan",
  metaDescription:
    "Ripsikartta suunnittelee jokaisen alueen pituuden ja taivutuksen ennen ensimmäistä ripseä. Viisi päätyyliä, mikä sopii millekin silmälle ja taivutuksen valinta.",
  keyword: "ripsienpidennysten tyylit",
  keywords: [
    "mikä on ripsikartta",
    "cat eye ripset",
    "doll eye ripsienpidennykset",
    "fox eye ripset",
    "ripsienpidennykset raskaille luomille",
    "ripsien taivutukset J B C D",
    "mikä ripsityyli sopii alaspäin kääntyville silmille",
  ],
  excerpt: "Ripsikartta määrää ripsirivin jokaisen alueen pituuden ja taivutuksen. Viisi päätyyliä, millekin silmänmuodolle ne yleensä sopivat ja miten taivutus valitaan.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-mi-chon-do-dai-do-cong-tren-vi-mi-de-len-ban-do"),
    alt: "Ripsistylisti, hiukset korkealla nutturalla, istuu studion ikkunan ääressä vaaleanpunainen ripsialusta kädessään ja osoittaa pinseteillä yhtä ripsinauhaa",
  },
  takeaways: [
    "Ripsikartta tarkoittaa, että **jokaisen alueen pituus ja taivutus suunnitellaan** ennen kuin ensimmäinen pidennys kiinnitetään.",
    "Kartan ratkaisevat kolme asiaa: silmänmuoto, omat ripset ja asiakkaan toive. Silmänmuoto arvioidaan asiakkaan **istuessa, silmät auki ja katse suoraan eteenpäin**.",
    "Viisi päätyyliä ovat luonnollinen, doll eye, cat eye, squirrel ja fox eye. Ne eroavat siinä, missä **pisin kohta** on.",
    "Taivutukset etenevät lähes suorasta (J, B) voimakkaasti kaartuvaan (CC, D). Valitse taivutus **oman ripsen kasvusuunnan** mukaan, jotta pidennyksen tyvi asettuu ripsen myötäisesti.",
    "Tyylin ja silmänmuodon yhdistelmät ovat yleisiä suuntauksia, eivät sääntöjä. Jokaisen asiakkaan silmät katsotaan itse.",
  ],
  intro: [
    "Ripsienpidennysten tyylit eivät ole valmiita malleja, jotka kopioidaan kuvasta, vaan ne rakennetaan ripsikartalla: ennen kiinnitystä päätetään, mikä ripsi menee mihinkin. Samoilla käsillä ja samalla tekniikalla pelkkä pituuden ja taivutuksen muuttaminen alue kerrallaan voi saada silmät näyttämään suuremmilta, pidemmiltä tai surullisemmilta. Kartoitus on ripsityön ajatteleva osa.",
    "Artikkeli perustuu VaraaAi Academyn Ripset-kurssin oppituntiin ”Ripsikartoitus: ymmärrä se, niin valitset silmänmuotoon sopivan tyylin”. Opit lukemaan silmät, erottamaan viisi päätyyliä toisistaan, ymmärtämään miksi cat eye voi saada alaspäin kääntyvät silmät näyttämään väsyneemmiltä ja valitsemaan taivutuksen omien ripsien kasvusuunnan mukaan.",
  ],
  sections: [
    {
      id: "mika-ripsikartta-on",
      title: "Mikä on ripsikartta ja miksi setti tarvitsee sen",
      blocks: [
        { p: "Kartta on suunnitelma, joka tehdään ennen ensimmäistä ripseä. Ripsistylisti jakaa ripsirivin muutamaan alueeseen sisänurkasta ulkonurkkaan ja merkitsee jokaiselle kaksi asiaa: kuinka pitkät ripset ovat ja mikä taivutus niissä on." },
        { p: "Kartan avulla molemmista silmistä tulee samanlaiset, ja lopputulos on juuri se, mistä sovit asiakkaan kanssa. Ilman karttaa työ tehdään tuntumalla, ja hyvin tavallinen tulos on asiakas, joka nousee lopuksi istumaan ja toinen silmä näyttää pidemmältä kuin toinen." },
        { p: "Tässä artikkelissa käydään läpi ajattelu. Viivojen piirtäminen silmänalustyynyyn, numeroiden merkitseminen alueittain ja ankkuriripsien kiinnitys opetetaan artikkelissa [ripsikartan tekeminen](lesson:mi-mapping)." },
      ],
    },
    {
      id: "silmien-lukeminen",
      title: "Lue silmät ennen tyylin valintaa: muoto, omat ripset ja toive",
      blocks: [
        { h3: "Silmänmuoto" },
        {
          ul: [
            "**Mantelisilmät:** hieman pitkulaiset ja molemmista päistä kapenevat.",
            "**Pyöreät silmät:** avoimet, iiristä näkyy paljon.",
            "**Raskas luomi:** kulmaluun alta laskeutuu ihopoimu luomen päälle.",
            "**Yksiluomi:** sileä luomi ilman luomivakoa.",
            "**Alaspäin kääntyvät silmät:** ulkonurkka on alempana kuin sisänurkka. **Ylöspäin kääntyvät:** ulkonurkka on ylempänä.",
            "**Syvällä olevat silmät:** sijaitsevat syvällä kulmaluun alla.",
            "**Silmien välinen etäisyys:** lähekkäin tai kaukana toisistaan.",
          ],
        },
        { img: { src: img("dang-mat-hanh-nhan-tron-sup-mi-mot-mi"), alt: "Neljän lähikuvan ruudukko neljän eurooppalaisen naisen silmistä, kaikki katsovat suoraan eteenpäin meikittä ja jokaisella on eri silmänmuoto", caption: "Vasemmalta oikealle ja ylhäältä alas: mantelisilmät, pyöreät silmät, raskas luomi ja yksiluomi." } },
        { note: "Katso silmänmuotoa, kun asiakas vielä istuu silmät auki ja katsoo suoraan eteenpäin. Kun hän makaa silmät kiinni, lähes kaikki silmät näyttävät samanlaisilta.", kind: "tip", title: "Arvioi ennen kuin asiakas käy makuulle" },
        { h3: "Omat ripset" },
        { p: "Pitkät vai lyhyet, vahvat vai ohuet, kasvavatko ne alaspäin, suoraan vai valmiiksi kaarella, onko harvoja kohtia tai aukkoja. [Klassisten ripsienpidennysten](lesson:mi-classic-hieu-dung) sääntö on jokaisen kartan yläpuolella: pidennys ei ole koskaan pidempi tai painavampi kuin oma ripsi jaksaa kantaa. Oli kartta kuinka kaunis tahansa, jos omat ripset eivät kestä sitä, se ei toimi." },
        { h3: "Asiakkaan toive" },
        { p: "Luonnollinen vai näyttävä, toimistotyö vai häät tulossa. Kysy myös, käyttääkö asiakas silmälaseja, sillä liian pitkät tai liian kaartuvat ripset koskettavat linssejä." },
      ],
    },
    {
      id: "paatyylit",
      title: "Ripsienpidennysten päätyylit: luonnollinen, doll eye, cat eye, squirrel ja fox eye",
      blocks: [
        { p: "Nämä viisi tyyliä ovat yleisiä suuntaviivoja. Salongit ja ripsimerkit nimeävät ne hieman eri tavoin, ja suomeksi puhutaan myös nukkesilmästä, kissansilmästä, oravatyylistä ja ketunsilmästä. Pisimmän kohdan paikka on kuitenkin sama nimestä riippumatta." },
        {
          table: {
            head: ["Tyyli", "Miten pituus jakautuu", "Miltä silmät näyttävät"],
            rows: [
              ["Luonnollinen", "Seuraa omaa ripsiriviä: lyhyt sisänurkassa, hieman pidempi ulkonurkkaa kohti ja vain vähän omia ripsiä pidempi", "Kuin asiakkaan omat ripset, mutta tuuheammat; sopii lähes kaikille ja on turvallinen ensimmäinen setti"],
              ["Doll eye (nukkesilmä, open eye)", "Pisin silmän keskellä, suoraan pupillin yläpuolella, ja lyhenee kumpaakin päätä kohti", "Suuremmat, pyöreämmät ja kirkkaammat"],
              ["Cat eye (kissansilmä)", "Lyhyt sisänurkassa, pitenee ja on pisin ulkonurkassa", "Pidemmät, ulkonurkka kevyesti kohotettu"],
              ["Squirrel (oravatyyli)", "Pisin noin ulommalla kolmanneksella ja hieman lyhyempi aivan ulkonurkassa", "Silmä nousee, eikä ulkonurkka painu alas"],
              ["Fox eye (ketunsilmä)", "Sisä- ja keskiosa melko lyhyitä ja luonnollisia; vain uloin osa pidempi, yleensä kaarevampi ja kohti kulmakarvan häntää", "Ulkonurkka kohotettu, kapea ja terävä"],
            ],
          },
        },
        { img: { src: img("kieu-noi-mi-tu-nhien"), alt: "Vaaleahiuksinen asiakas katsoo suoraan eteenpäin luonnollisen tyylin ripsienpidennyksissä, jotka ovat vain vähän omia pidempiä ja pitenevät kevyesti ulkonurkkaa kohti", caption: "Luonnollinen tyyli seuraa asiakkaan omaa ripsiriviä." } },
        { img: { src: img("kieu-noi-mi-bup-be-dai-nhat-o-giua-mat"), alt: "Vaaleahiuksinen asiakas katsoo suoraan eteenpäin doll eye -ripsissä, joiden pisimmät pidennykset ovat kummankin silmän keskellä, joten silmät näyttävät pyöreiltä ja avoimilta", caption: "Doll eye: pisin kohta on silmän keskellä pupillin yläpuolella." } },
        { img: { src: img("kieu-noi-mi-mat-meo-dai-nhat-o-duoi-mat"), alt: "Vaaleahiuksinen asiakas katsoo suoraan eteenpäin cat eye -ripsissä, jotka ovat sisänurkissa lyhyet ja ulkonurkissa pisimmät ja pidentävät silmiä", caption: "Cat eye: pisin kohta on ulkonurkassa." } },
        { img: { src: img("kieu-noi-mi-mat-cao-nang-duoi-mat"), alt: "Vaaleahiuksinen asiakas katsoo suoraan eteenpäin fox eye -ripsissä, joissa ulommat ripset ovat pidempiä ja suuntautuvat viistosti ylös kohti kulmakarvan häntää", caption: "Fox eye: vain uloin osa on pitkä ja osoittaa ylöspäin." } },
      ],
    },
    {
      id: "tyyli-silmanmuodolle",
      title: "Mikä ripsityyli sopii yleensä millekin silmänmuodolle",
      blocks: [
        { p: "Taulukko kertoo, mitä yleensä näkee. Se antaa lähtökohdan konsultaatioon, mutta ei koskaan korvaa edessäsi olevien silmien katsomista." },
        {
          table: {
            head: ["Silmänmuoto", "Sopii yleensä", "Huomioi"],
            rows: [
              ["Mantelisilmät, pienet silmät", "Doll eye", "Luonnollinen on silti turvallinen valinta ensimmäiseksi setiksi"],
              ["Pyöreät silmät", "Cat eye, koska se pidentää silmää", "Doll eye voi tehdä valmiiksi pyöreästä silmästä liian pyöreän"],
              ["Lähekkäin olevat silmät", "Cat eye, koska se vetää katsetta ulospäin", "Pisin kohta on ulkonurkassa"],
              ["Kaukana toisistaan olevat silmät", "Sisänurkan ja keskiosan korostus", "Vältä ulkonurkan pidentämistä"],
              ["Alaspäin kääntyvät silmät", "Doll eye tai pisin kohta lähemmäs keskiosaa ja enemmän taivutusta ulko-osaan", "Älä laita pisimpiä ripsiä ulkonurkkaan"],
              ["Raskas luomi, yksiluomi", "Enemmän taivutusta, jotta ripset nousevat poimun yli ja näkyvät", "Ihopoimu peittää ripset helposti"],
              ["Syvällä olevat silmät", "Maltillinen pituus ja taivutus", "Liian pitkät tai kaartuvat ripset voivat koskettaa yläluomea tai kulmaluuta silmien auetessa"],
            ],
          },
        },
        { h3: "Alaspäin kääntyvät silmät ja cat eye: tavallinen tilanne" },
        { p: "Asiakas, jonka silmät kääntyvät alaspäin, näkee netissä kuvan cat eye -ripsistä ja haluaa juuri ne. Jos teet niin, pisimmät ja painavimmat ripset kasautuvat ulkonurkkaan ja vetävät sitä entistä alemmas. Silmät näyttävät väsyneemmiltä ja surullisemmilta. Siirrä tällöin pisin kohta lähemmäs silmän keskiosaa ja lisää ulko-osaan taivutusta, niin silmä nousee." },
        { img: { src: img("loi-kieu-mat-meo-tren-mat-cup"), alt: "Lähikuva naisesta, jonka silmät kääntyvät alaspäin ja jolla on ulkonurkissa hyvin pitkät ja tuuheat pidennykset, jotka roikkuvat nurkan yli ja tekevät silmistä raskaat", caption: "Esimerkkikuva tyylivirheestä: ulkonurkkaan kasatut pitkät ja painavat ripset vetävät alaspäin kääntyvää silmää lisää alas." } },
        { img: { src: img("mat-sup-mi-voi-soi-mi-noi-cong-nhieu"), alt: "Lähikuva naisesta, jolla on raskas luomi ja joka katsoo suoraan eteenpäin, pidennykset kaartuvat luomen ihopoimun yli ja näkyvät selvästi", caption: "Raskas luomi: voimakkaampi taivutus nostaa ripset näkyviin poimun yli." } },
      ],
    },
    {
      id: "taivutukset",
      title: "Ripsien taivutukset J, B, C, CC, D, L ja oman ripsen kasvusuunta",
      blocks: [
        { p: "Pidennysripset nimetään kirjaimilla, ja perusajatus on yksinkertainen: ne etenevät lähes suorasta voimakkaasti kaartuvaan." },
        {
          table: {
            head: ["Taivutus", "Muoto", "Vaikutus"],
            rows: [
              ["J, B", "Lähes suora", "Luonnollinen ilme"],
              ["C", "Kaarevampi kuin J ja B", "Yleisin taivutus"],
              ["CC, D", "Kaarevampi kuin C", "Selkeämmät ripset, avoimemmat silmät"],
              ["L", "Suora tyvi, josta ripsi taittuu ylös", "Jotkut ripsistylistit valitsevat sen alaspäin kasvaville ripsille, jotta tyvi myötäilee ripseä"],
            ],
          },
        },
        { img: { src: img("cac-do-cong-mi-noi-tu-gan-thang-den-cong-nhieu"), alt: "Kuusi samanpituista mustaa pidennysripseä kuudessa rivissä sivulta kuvattuna, kärjen taivutus kasvaa ylimmästä rivistä alimpaan", caption: "Taivutus voimistuu ylhäältä alas; alimmassa ripsessä on suora tyvi ennen kuin se taittuu ylös kuin L." } },
        { p: "Näiden kuuden lisäksi on muutama muu tyyppi. Jokainen merkki taivuttaa hieman eri tavalla, joten saman kirjaimen ripsi kahdelta merkiltä ei välttämättä näytä täsmälleen samalta." },
        { h3: "Miksi oma ripsi ratkaisee taivutuksen" },
        { p: "Pidennyksen tyven on asetuttava tiiviisti oman ripsen myötäisesti. Jos oma ripsi kasvaa suoraan tai alaspäin ja kiinnität liian kaartuvan pidennyksen, vain pieni kohta koskettaa: ripsi pysyy huonosti, irtoaa aikaisin ja näyttää taittuneelta. Alaspäin kasvaville ripsille jotkut valitsevat suoratyvisen taivutuksen, kuten L:n, jolloin tyvi myötäilee ripseä ja kaartuu vasta sitten ylös. Myös päinvastainen menee pieleen: valmiiksi kaarevassa ripsessä liian suora pidennys sojottaa ulos." },
      ],
    },
    {
      id: "symmetria-ja-konsultaatio",
      title: "Silmien tasapaino ja rehellinen konsultaatio",
      blocks: [
        { p: "Kaksi silmää on harvoin täysin samanlaiset. Toisen puolen omat ripset voivat olla pidempiä tai harvempia kuin toisen. Siksi karttaa ei kopioida suoraan silmästä toiseen: tavoite on tasapainoiselta näyttävä lopputulos, ja joskus se tarkoittaa pituuksien säätämistä hieman toisella puolella." },
        { p: "Näytä ennen aloitusta asiakkaalle mallikuvia ja kerro rehellisesti, mikä tyyli sopii näille silmille ja kuinka paljon hänen omat ripsensä jaksavat kantaa. Älä vain kopioi asiakkaan tuomaa kuvaa, vaan kerro, sopiiko se hänelle ja miksi. Aloita vasta, kun olette samaa mieltä. Ymmärtävä asiakas luottaa, ja luottava asiakas palaa." },
        { note: "Kirjaa tyyli sekä jokaisen alueen pituus ja taivutus VaraaAissa [asiakkaan tietojen](lesson:khach-hang) sisäisiin muistiinpanoihin. Seuraavassa [huollossa](lesson:mi-dam-thao-hieu-dung) kuka tahansa salongin ripsistylisti voi toistaa saman kartan, ja [huoltoajan](lesson:lich-hen) voi varata ennen kuin asiakas lähtee.", kind: "tip", title: "Säilytä kartta" },
        { note: "Artikkelin tyylit ja silmänmuotoihin liittyvät ehdotukset ovat alan yleisiä suuntauksia, eivät ehdottomia sääntöjä; nimet ja taivutukset vaihtelevat hieman merkeittäin. Valitse aina asiakkaan silmien ja omien ripsien vahvuuden mukaan ja noudata ripsi- ja liimavalmistajan ohjeita. Kauneuspalveluja ja -tuotteita koskevat säännöt vaihtelevat maittain. Artikkeli on koulutusmateriaalia, ei ammattipätevyys.", kind: "info", title: "Huomio" },
      ],
    },
  ],
  faq: [
    {
      q: "Mikä on ripsikartta?",
      a: "Ripsikartta on ennen ripsienpidennyksiä tehtävä suunnitelma: ripsirivi jaetaan muutamaan alueeseen sisänurkasta ulkonurkkaan, ja jokaiselle alueelle merkitään pituus ja taivutus. Kartan avulla silmät vastaavat toisiaan ja lopputulos on asiakkaan kanssa sovittu.",
    },
    {
      q: "Mikä ripsityyli sopii alaspäin kääntyville silmille?",
      a: "Alaspäin kääntyvissä silmissä pisimpiä ripsiä kannattaa yleensä välttää ulkonurkassa, koska pitkät ja painavat ripset vetävät silmää lisää alas. Doll eye tai pisimmän kohdan siirtäminen lähemmäs keskiosaa ja ulko-osan voimakkaampi taivutus nostavat silmää. Tämä on yleinen suuntaus, ja ripsistylistin on silti katsottava juuri kyseiset silmät.",
    },
    {
      q: "Cat eye vai doll eye pyöreille silmille?",
      a: "Cat eye sopii yleensä pyöreille silmille, koska se pidentää niitä. Doll eye sijoittaa pisimmät ripset silmän keskelle, joten valmiiksi pyöreissä silmissä se voi saada ne näyttämään liian pyöreiltä.",
    },
    {
      q: "Mikä taivutus sopii raskaille luomille tai yksiluomelle?",
      a: "Raskaassa luomessa ja yksiluomessa ihopoimu peittää ripset helposti, joten niissä tarvitaan yleensä enemmän taivutusta, jotta ripset nousevat poimun yli ja näkyvät. Tarkka taivutus riippuu silti omien ripsien kasvusuunnasta, koska pidennyksen tyven on asetuttava oman ripsen myötäisesti.",
    },
    {
      q: "Mitä eroa on ripsien taivutuksilla J, B, C, CC, D ja L?",
      a: "Kirjaimet etenevät lähes suorasta voimakkaasti kaartuvaan: J ja B ovat lähes suoria ja luonnollisia, C on yleisin taivutus, ja CC ja D ovat kaarevampia ja avaavat katsetta. L:ssä on suora tyvi, josta ripsi taittuu ylös. Merkit taivuttavat ripsensä hieman eri tavoin, joten sama kirjain ei aina näytä täysin samalta.",
    },
    {
      q: "Voinko saada pitkät ja kaartuvat ripsienpidennykset, jos käytän silmälaseja?",
      a: "Liian pitkät tai liian kaartuvat ripset koskettavat linssejä. Kerro silmälaseista ripsistylistille jo konsultaatiossa, niin pituus ja taivutus valitaan niille sopiviksi.",
    },
  ],
  related: ["mi-mapping", "mi-classic-hieu-dung", "mi-hybrid-hieu-dung", "mi-mega-wispy-hieu-dung"],
};

export default article;
