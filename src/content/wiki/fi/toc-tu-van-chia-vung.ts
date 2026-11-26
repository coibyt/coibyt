import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/toc-tu-van-chia-vung/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "hiusten-jakaminen-osioihin-ennen-leikkausta",
  lesson: "toc-tu-van-chia-vung",
  category: "hair",
  title: "Hiusten jakaminen osioihin ennen leikkausta: 12 vaihetta konsultaatiosta ja pesusta seitsemään osioon",
  metaTitle: "Hiusten jakaminen osioihin: 12 vaihetta, 7 osiota",
  metaDescription:
    "Ennen hiustenleikkausta vaihe vaiheelta: kaulapaperi, konsultaatio, hiuspohjan tarkistus, pesu, takkujen selvitys latvoista, jakaus ja seitsemän osiota.",
  keyword: "hiusten jakaminen osioihin",
  keywords: [
    "seitsemän osiota hiustenleikkaus",
    "hiusten jaottelu leikkausta varten",
    "asiakkaan hiusten pesu kampaamossa",
    "suora jakaus pyrstökammalla",
    "märkien hiusten takkujen selvitys",
    "kaulapaperi hiustenleikkuussa",
    "valmistelu ennen hiustenleikkausta",
  ],
  excerpt: "Siitä hetkestä, kun asiakas istuutuu, siihen kun hiukset on pesty ja jaettu seitsemään osioon valmiina leikattaviksi. Kaksitoista vaihetta ja jokaisen jakauksen teko.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-toc-keo-toc-ra-sau-xem-dang-mat-khach"),
    alt: "Ruskeapolkkainen kampaaja seisoo asiakkaan takana ja kokoaa tämän pitkät vaaleat hiukset molemmin käsin taakse nähdäkseen kasvojen muodon ja hiusrajan peilistä",
  },
  takeaways: [
    "Kiedo **kertakäyttöinen kaulapaperi** ennen leikkuuviitan kiinnittämistä, jottei viitta koske asiakkaan ihoon.",
    "Konsultaatio sekä hiusten ja hiuspohjan tarkistus tehdään **kuivista hiuksista**; sovi pituus kosketuskohdalla ja toista se asiakkaalle.",
    "Kokeile vesi ensin omaan ranteeseesi, hiero sormenpäillä ja suojaa hiusrajaa toisella kädellä huuhdellessa.",
    "Selvitä märät hiukset **latvoista ylöspäin** ja pidä toisella kädellä hiuksista kiinni yläpuolelta, ettei hiuspohja kisko.",
    "Seitsemän osiota: **päälaki, kaksi sivua, kaksi takaraivoa ja kaksi niskaa**. Vino jakaus tarkoittaa vinoa leikkuuta.",
  ],
  intro: [
    "Hiusten jakaminen osioihin tehdään useimmiten seitsemällä osiolla: päälaki, kaksi sivua, kaksi takaraivoa ja kaksi niskaa. Itse jakaminen ei ole vaikeaa, mutta suorat ja siistit jakaukset vaativat, että kaikki sitä edeltävä on tehty oikein: konsultaatio, huolellinen pesu, sopiva pyyhekuivaus ja sileiksi selvitetyt hiukset.",
    "Artikkeli seuraa VaraaAi Academyn Hiukset-kurssin oppituntia ”Konsultaatio, pesu ja jaottelu: käytäntö vaihe vaiheelta”. Kuljet kampaajan mukana siitä, kun asiakas istuutuu tuoliin, siihen kun hiukset on jaettu seitsemään siistiin osioon valmiina leikattaviksi. Katso alta video nähdäksesi, miten kampaa pidetään, ja lue sitten vaiheet uudelleen.",
  ],
  sections: [
    {
      id: "miksi-osiot",
      title: "Mihin osioita tarvitaan",
      blocks: [
        { p: "Tarkasti voi leikata vain hiuksia, jotka näkee ja joita hallitsee. Kun hiukset ovat osioissa, joilla on selvät maamerkit päässä, edellinen leikkuulinja löytyy aina uudelleen, eikä leikkaamattoman osion hiuksia putoa sen osion sekaan, jota olet leikkaamassa." },
        { p: "Jokaisen vaiheen syyt konsultaation kysymyksistä kiharoiden kutistumiseen ovat artikkelissa [konsultaatio ennen hiustenleikkausta](lesson:toc-tu-van-chia-vung-hieu-dung). Tässä artikkelissa tehdään." },
        { note: "Haava, tulehdus tai täit hiuspohjassa tarkoittavat, ettei palvelua tehdä. Hoitoaineen vaikutusaika tuotteen ohjeen mukaan. Hygieniamääräykset vaihtelevat maittain, ja artikkeli on koulutusmateriaalia, ei ammattipätevyys.", kind: "info", title: "Huomioi" },
      ],
    },
    {
      id: "seitseman-osiota",
      title: "Seitsemän osiota hiustenleikkauksessa",
      blocks: [
        {
          table: {
            head: ["Osio", "Montako", "Missä linja kulkee"],
            rows: [
              ["Päälaki", "1", "Kaksi suoraa linjaa ohimoilta taaksepäin päälaelle"],
              ["Sivu", "2", "Linja korvan yläreunasta päälakiosioon; sen etupuolen hiukset ovat sivuosio"],
              ["Takaraivo", "2", "Takaosa jaetaan keskijakauksella; vaakalinjan yläpuolinen osa takaraivon luun kohdalla"],
              ["Niska", "2", "Takaraivon luun kohdalla kulkevan vaakalinjan alapuolinen osa"],
            ],
          },
        },
        { p: "Takaraivon luu on kohta, joka pullistuu hieman pään takaosassa. Vaakalinja kulkee sen kohdalta korvan takaa toisen korvan taakse. Kun jako seuraa pään muotoa, jokaisella osiolla on selvät maamerkit." },
        { img: { src: img("chia-bay-vung-toc-nhin-tu-phia-sau"), alt: "Istuva asiakas takaa kuvattuna: kosteat vaaleat hiukset on jaettu suorilla jakauksilla, jokainen osio on kiinnitetty hopeisella klipsillä ja kampaaja seisoo vieressä kampa kädessä", caption: "Takaosa jaettuna: keskijakaus kulkee alas, ja takaraivon luun kohdalla kulkeva linja erottaa takaraivon osiot niskasta." } },
        { note: "Vedä jokainen jakaus pyrstökamman kärjellä yhtenä katkeamattomana vetona äläkä raavi edestakaisin. Siististä jakauksesta näkee heti, missä on vinoutta.", kind: "tip", title: "Yksi veto" },
      ],
    },
    {
      id: "asiakkaan-hiusten-pesu",
      title: "Asiakkaan hiusten pesu kampaamossa: missä huolellisuus pettää",
      blocks: [
        {
          table: {
            head: ["Työvaihe", "Oikein tehtynä", "Miksi"],
            rows: [
              ["Niskan asettelu", "Pyyhe olkapäille, niska lepää mukavasti altaassa, kysy painaako jokin", "Niska- tai selkävaivaisen asiakkaan tuoli säädetään ensin"],
              ["Veden kokeilu", "Ensin omaan ranteeseen, sitten kysy uudelleen, kun vesi koskee hiuksiin", "Hanan lämpötila voi muuttua yllättäen, ja jokainen kokee lämmön eri tavoin"],
              ["Hieronta", "Sormenpäillä, pienin pyörivin liikkein", "Kynnet sattuvat ja naarmuttavat hiuspohjaa"],
              ["Huuhtelu", "Toinen käsi suihkussa, toinen suojaa hiusrajaa", "Vettä ei valu kasvoille eikä korviin"],
              ["Hoitoaine", "Pituuksiin ja latvoihin, vaikutusaika tuotteen ohjeen mukaan", "Jokaisella tuotteella on oma aikansa"],
            ],
          },
        },
      ],
    },
    {
      id: "yleiset-virheet",
      title: "Yleiset virheet takkujen selvityksessä ja jaottelussa",
      blocks: [
        {
          table: {
            head: ["Virhe", "Seuraus", "Korjaus"],
            rows: [
              ["Hiusten hankaaminen ja rutistaminen pyyhkeellä", "Lisää takkuja", "Kiedo hiukset pyyhkeeseen ja painele kevyesti tyvestä latvoihin"],
              ["Märkien hiusten kampaaminen tyvestä alas", "Takut työntyvät alas, hiukset katkeilevat ja hiuspohja kiskoo", "Aloita latvoista ja etene ylöspäin, pidä hiuksista kiinni yläpuolelta"],
              ["Kamman raapiminen edestakaisin jakausta tehdessä", "Sahalaitainen jakaus, vinoutta on vaikea nähdä", "Vedä yksi katkeamaton linja"],
              ["Pullottava klipsi, ei litteänä päätä vasten", "Hiukset kiristävät hiuspohjaa ja jäävät leikattavan alueen päälle", "Kierrä kohtuullisella kireydellä ja kiinnitä litteäksi päätä vasten"],
              ["Muutama suortuva karkaa viereiseen osioon", "Ne sekoittuvat toisen osion leikkuuseen", "Nosta ne takaisin kamman hännällä"],
              ["Hiukset osin kuivat, osin märät", "Hiukset venyvät ja nousevat eri tavalla, linja on epätasainen", "Sumuta tasaisesti alueelle, jota olet leikkaamassa"],
            ],
          },
        },
      ],
    },
    {
      id: "hygienia-ja-milloin-lopettaa",
      title: "Hygienia ja milloin työ keskeytetään",
      blocks: [
        { p: "Leikkuuviittaa käytetään monelle asiakkaalle, joten se ei saa koskaan koskea suoraan kaulan ihoon. Kertakäyttöinen kaulapaperi on hygieniaeste asiakkaiden välillä, ja samalla se pitää leikatut hiukset poissa kauluksesta. Kampojen, saksien ja klipsien on oltava puhdistettuja ja desinfioituja edellisen asiakkaan jälkeen, kuten oppitunnilla [Välineet jokaisen asiakkaan jälkeen](lesson:ve-sinh-dung-cu). Kädet pestään ennen kuin kosket asiakkaaseen, oppitunnin [käsienpesu ja käsineet](lesson:rua-tay-gang-tay) mukaan." },
        { p: "Jos tarkistuksessa hiuspohjassa näkyy haava, tulehdus tai täitä, lopeta ja puhu asiakkaan kanssa kahden kesken. Mitä sanoa ja miten kieltäytyä, kerrotaan oppitunnilla [Milloin asiakasta ei hoideta](lesson:khi-nao-khong-lam)." },
        { p: "Kun asiakas on lähtenyt, käytetyt pyyhkeet menevät pyykkikoriin, kaulapaperi roskiin, ja kammat, sakset ja klipsit puhdistetaan ja desinfioidaan." },
      ],
    },
    {
      id: "jaottelun-jalkeen",
      title: "Jaottelun jälkeen: leikkaa ja kirjaa seuraavaa kertaa varten",
      blocks: [
        { p: "Hiukset ovat valmiit. Tästä lasket osiot alas siinä järjestyksessä, jota leikkaus vaatii, kuten artikkelissa [kerrosleikkaus](lesson:cat-nu-tang)." },
        { p: "Kirjaa VaraaAissa asiakkaan kanssa sovittu [asiakastietojen](lesson:khach-hang) muistiinpanoihin, jotta seuraava tekijä tietää, mistä asiakas pitää. Kun lisäät hiustenleikkauksen [palveluksi](lesson:dich-vu), anna sille kesto, johon pesu ja jaottelu mahtuvat, jotta päivän [ajanvaraukset](lesson:lich-hen) eivät ruuhkaudu." },
      ],
    },
  ],
  howTo: {
    title: "Hiusten jakaminen osioihin: konsultaatio, pesu ja seitsemän osiota",
    id: "hiusten-jaottelun-vaiheet",
    after: "miksi-osiot",
    lead: "Kaksitoista vaihetta oppitunnin videon järjestyksessä. Kolme ensimmäistä tehdään hiusten ollessa vielä kuivat.",
    supplies: [
      "Kertakäyttöinen kaulapaperi ja leikkuuviitta",
      "Puhtaat pyyhkeet",
      "Shampoo ja hoitoaine",
      "Harvapiikkinen kampa takkujen selvitykseen",
      "Pyrstökampa jakauksiin",
      "Osioklipsit",
      "Sumutepullo",
    ],
    steps: [
      {
        name: "Pese kädet, kiedo kaulapaperi ja kiinnitä viitta",
        text: "Pese kädet ennen kuin kosket asiakkaaseen, ja käytä vain puhdistettuja ja desinfioituja kampoja, saksia ja klipsejä. Kiedo ensin kertakäyttöinen kaulapaperi asiakkaan kaulan ympäri ja kiinnitä leikkuuviitta vasta sen päälle, jottei viitta koske kaulan ihoon.",
        image: { src: img("quan-giay-co-dung-mot-lan-truoc-khi-cai-ao-choang"), alt: "Kampaaja kietoo valkoisen kaulapaperin asiakkaan kaulan ympäri ja kiinnittää mustan viitan sen päälle, asiakkaan hiukset siististi toisella sivulla" },
      },
      {
        name: "Tee konsultaatio kuivista hiuksista",
        text: "Kysy, mistä asiakas pitää ja mistä ei nykyisissä hiuksissaan, pyydä mallikuva ja kysy, föönaako hän vai antaako hiusten kuivua itsestään ja laittaako hän ne usein kiinni. Pidä suortuvaa kosketuskohdassa ja toista: leikataan olkapäiden tasolle, onko oikein? Kiharista tai laineikkaista hiuksista kerro etukäteen, että ne nousevat kuivuessaan, joten jätät ne hieman pidemmiksi. Kirjaa sovittu asiakastietoihin.",
        image: { src: img("tu-van-kieu-toc-voi-anh-mau-tren-may-tinh-bang"), alt: "Kampaaja istuu asiakkaan vieressä tabletti kädessä, ruudulla mallikuva pitkästä kampauksesta, asiakas osoittaa kuvaa ja molemmat hymyilevät" },
      },
      {
        name: "Tarkista hiukset ja hiuspohja",
        text: "Vedä hiukset taakse ja katso kasvojen muotoa ja hiusrajaa. Tee muutama jakaus nähdäksesi tuuheuden, hiuslaadun ja hiuspohjan. Kampaa hiuksia muutamaan suuntaan ja etsi pyörteet päälaelta ja niskasta. Haava, tulehdus tai täit hiuspohjassa: lopeta ja puhu asiakkaan kanssa kahden kesken.",
      },
      {
        name: "Vie asiakas pesualtaalle ja kokeile vesi",
        text: "Laita pyyhe olkapäille, tue niskaa sen laskeutuessa altaaseen ja kysy, painaako jokin. Avaa vesi ja kokeile sitä omaan ranteeseesi. Anna veden sitten koskea asiakkaan hiuksia ja kysy uudelleen, onko lämpötila sopiva.",
        image: { src: img("thu-nhiet-do-nuoc-tren-co-tay-truoc-khi-goi"), alt: "Kampaaja seisoo mustan keraamisen pesualtaan ääressä ja antaa hanan veden valua omalle ranteelleen, asiakas nojaa taaksepäin pyyhe kaulan ympärillä" },
      },
      {
        name: "Pese, huuhtele ja levitä hoitoaine",
        text: "Kastele hiukset tasaisesti tyvestä latvoihin ja ota shampoota sopiva määrä. Hiero hiuspohjaa sormenpäillä pienin pyörivin liikkein otsan hiusrajasta niskaan, ei koskaan kynsillä. Huuhtele huolellisesti toinen käsi hiusrajaa suojaten. Levitä hoitoaine pituuksiin ja latvoihin, anna vaikuttaa tuotteen ohjeen mukaan ja huuhtele taas huolellisesti.",
        image: { src: img("xa-toc-mot-tay-che-chan-toc-cho-khach"), alt: "Kampaaja huuhtelee asiakkaan hiuksia pesualtaalla käsisuihkulla ja suojaa toisella kädellä hiusrajaa, jottei vettä valu kasvoille ja korviin" },
      },
      {
        name: "Kuivaa pyyhkeellä painellen",
        text: "Ohjaa asiakas takaisin tuoliin. Kiedo hiukset pyyhkeeseen ja painele kevyesti tyvestä latvoihin ilman hankaamista tai rutistamista. Hiusten kuuluu olla kosteat, ei valuvan märät.",
      },
      {
        name: "Selvitä takut latvoista alkaen",
        text: "Käytä harvapiikkistä kampaa. Toinen käsi pitää hiuksista kiinni yläpuolelta, ja kampa aloittaa latvoista. Vasta kun latvat ovat selvät, etenet vähitellen ylemmäs tyveen asti. Hiuksia pitelevä käsi estää asiakasta tuntemasta nykimistä hiuspohjassa.",
        image: { src: img("go-roi-toc-uot-tu-ngon-bang-luoc-rang-thua"), alt: "Takaa kuvattuna kampaajan toinen käsi pitää asiakkaan kosteista vaaleista hiuksista tukevasti kiinni pituuksien puolivälistä, ja toinen kampaa latvoja harvapiikkisellä kammalla" },
      },
      {
        name: "Tee jakaus",
        text: "Etsi asiakkaan luonnollinen jakaus tai tee keskijakaus leikkauksesta riippuen. Aseta pyrstökamman kärki otsan hiusrajaan ja vedä se suoraan taaksepäin päälaelle yhtenä katkeamattomana linjana. Hyvä jakaus on suora ja siisti, ja hiuspohja näkyy selkeänä viivana.",
        image: { src: img("re-ngoi-thang-bang-luoc-duoi-chuot"), alt: "Ylhäältä kuvattuna kampaaja vetää pyrstökamman terävällä kärjellä suoran keskijakauksen asiakkaan kosteisiin vaaleisiin hiuksiin" },
      },
      {
        name: "Erota päälaki ja kaksi sivuosiota",
        text: "Vedä kummaltakin ohimolta suora linja taaksepäin päälaelle, kierrä nämä hiukset ylös ja kiinnitä ne litteäksi: siinä on päälakiosio. Vedä sitten linja korvan yläreunasta ylös päälakiosioon. Linjan etupuolen hiukset ovat sivuosio. Kierrä, kiinnitä ja tee täsmälleen samoin toisella puolella.",
        image: { src: img("xoan-va-kep-vung-dinh-khi-chia-vung-toc"), alt: "Kampaaja kiertää asiakkaan päälakiosion pieneksi nutturaksi ja kiinnittää sen hopeisella klipsillä, muut hiukset laskeutuvat sileinä alas" },
      },
      {
        name: "Jaa takaosa takaraivo- ja niskaosioihin",
        text: "Vedä suora keskijakaus päälaelta alas niskaan, niin että takaosa jakautuu vasempaan ja oikeaan puoliskoon. Vedä sitten vaakalinja korvan takaa toisen korvan taakse takaraivon luun kohdalta. Linjan yläpuolella ovat kaksi takaraivon osiota, alapuolella kaksi niskaosiota. Kierrä ja kiinnitä jokainen.",
      },
      {
        name: "Tarkista jakaukset",
        text: "Katso kaikki kerran läpi peilistä ja takaa: ovatko jakaukset suoria, ovatko puolet tasapainossa, onko hiuksia karannut väärään osioon? Kampaa ja jaa uudelleen kaikki, mikä on vinossa. Vino jakaus tarkoittaa vinoa leikkuuta.",
      },
      {
        name: "Pidä hiukset tasaisen kosteina",
        text: "Hiukset kuivuvat työn aikana. Sumuta kevyesti ja tasaisesti alueelle, jota olet leikkaamassa. Kosteus riittää; hiukset eivät saa valua.",
        image: { src: img("xit-suong-giu-toc-am-deu-truoc-khi-cat"), alt: "Takaa kuvattuna kampaaja sumuttaa sumutepullolla hienoa vesisumua asiakkaan osioihin jaettuihin ja klipsattuihin vaaleisiin hiuksiin" },
      },
    ],
  },
  faq: [
    {
      q: "Mitkä ovat seitsemän osiota hiustenleikkauksessa?",
      a: "Yksi päälakiosio, kaksi sivuosiota korvien kohdalla, kaksi takaraivon osiota ja kaksi niskaosiota. Takaosa jaetaan keskijakauksella, ja takaraivon luun kohdalla kulkeva vaakalinja erottaa ylemmät takaraivon osiot alemmista niskaosioista.",
    },
    {
      q: "Jaetaanko hiukset osioihin märkinä vai kuivina?",
      a: "Oppitunnilla hiukset pestään, kuivataan pyyhkeellä kosteiksi mutta ei valuviksi, selvitetään ja vasta sitten jaetaan. Työn aikana ne pidetään tasaisen kosteina sumutepullolla, koska epätasainen kosteus antaa epätasaisen leikkuulinjan.",
    },
    {
      q: "Mistä märkien hiusten selvittäminen aloitetaan?",
      a: "Latvoista, ja sieltä edetään vähitellen tyveen harvapiikkisellä kammalla, toinen käsi hiuksista kiinni yläpuolelta. Latvoista aloittaminen ei työnnä takkuja alas, katkoo vähemmän hiuksia eikä kisko asiakkaan hiuspohjaa.",
    },
    {
      q: "Miten teen suoran jakauksen?",
      a: "Käytä pyrstökamman terävää kärkeä: aseta se otsan hiusrajaan ja vedä yksi katkeamaton linja päälaelle raapimatta edestakaisin. Oikea jakaus on suora ja siisti, ja hiuspohja näkyy selkeänä viivana.",
    },
    {
      q: "Miksi kaulapaperi laitetaan ennen leikkuuviittaa?",
      a: "Leikkuuviittaa käytetään monelle asiakkaalle. Kertakäyttöinen kaulapaperi estää viittaa koskemasta suoraan kaulan ihoon, toimii hygieniaesteenä asiakkaiden välillä ja pitää leikatut hiukset poissa kauluksesta.",
    },
    {
      q: "Miten pesuveden lämpötila tarkistetaan?",
      a: "Kokeile vesi ensin omaan ranteeseesi, anna sen sitten koskea asiakkaan hiuksia ja kysy, onko lämpötila sopiva. Hanan lämpötila voi muuttua yllättäen, ja jokainen kokee lämmön ja kylmän eri tavoin.",
    },
  ],
  related: ["toc-tu-van-chia-vung-hieu-dung", "cat-nu-bang", "cat-nu-tang", "cat-nam-co-ban"],
};

export default article;
