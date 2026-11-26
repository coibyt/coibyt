import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/toc-tu-van-chia-vung-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "konsultaatio-ennen-hiustenleikkausta",
  lesson: "toc-tu-van-chia-vung-hieu-dung",
  category: "hair",
  title: "Konsultaatio ennen hiustenleikkausta: kosketuskohdat, hiusten lukeminen ja 5 leikkaustermiä",
  metaTitle: "Konsultaatio ennen hiustenleikkausta: mitä kampaaja kysyy",
  metaDescription:
    "Konsultaatio ennen hiustenleikkausta: pituudesta sopiminen kosketuskohdilla, kasvojen muoto, tuuheus, hiuslaatu, pyörteet, märkä ja kuiva hius sekä nostokulmat.",
  keyword: "konsultaatio ennen hiustenleikkausta",
  keywords: [
    "kampaajan konsultaatio",
    "leikataanko kiharat hiukset märkinä vai kuivina",
    "pyörre hiuksissa leikkaus",
    "mikä on ohjauslinja",
    "nostokulma hiustenleikkauksessa",
    "miksi hiukset jaetaan osioihin",
    "ristiintarkistus leikkauksessa",
  ],
  excerpt: "Moni leikkaus menee pieleen jo ensimmäisten viiden minuutin aikana. Näin sovit pituudesta, luet hiukset kuivina ja opit sanat, joita jokainen leikkaus käyttää.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-toc-tu-van-cho-khach-truoc-guong-salon"),
    alt: "Ruskeapolkkainen kampaaja seisoo pitkähiuksisen vaalean asiakkaan takana kultakehyksisen soikean peilin edessä pariisilaistyylisessä salongissa, molemmat hymyilevät",
  },
  takeaways: [
    "Älä sovi pituudesta sanoilla vähän, paljon, lyhyt tai pitkä. Käytä numeroa tai **kosketuskohtaa** asiakkaassa: leukaan, olkapäähän, solisluun kohdalle.",
    "Lue hiukset **kuivina**: kasvojen ja pään muoto, tuuheus, hiuslaatu, kiharuus ja kasvusuunta.",
    "Laineikkaat ja kiharat hiukset **kutistuvat kuivuessaan**. Leikkaa aiottua pidemmäksi tai kuivana tekniikalla, jonka olet oppinut.",
    "Pyörteen kohdalle jätetään yleensä hieman pituutta, tai leikataan kasvusuunnan mukaan.",
    "Viisi sanaa, joita jokainen leikkaus käyttää: **ohjauslinja, nostokulma, ylisuuntaus, kireys ja ristiintarkistus**.",
  ],
  intro: [
    "Konsultaatio ennen hiustenleikkausta on se osa käyntiä, joka tapahtuu ennen kuin kampaaja ottaa sakset käteen, ja juuri siinä moni leikkaus menetetään. Vika ei ole saksissa. Leikkaus epäonnistuu ensimmäisten viiden minuutin aikana, kun kampaaja ja asiakas käyttävät samaa sanaa mutta ajattelevat kahta eri pituutta.",
    "Artikkeli seuraa VaraaAi Academyn Hiukset-kurssin oppituntia ”Konsultaatio ja jaottelu: ymmärrä ne, niin leikkaat tarkasti”. Luettuasi tiedät, mitä asiakkaalta kysytään, miten pituudesta sovitaan niin, ettei kukaan ymmärrä väärin, miten hiukset luetaan ennen kastelua ja mitä tarkoittavat ne viisi termiä, jotka toistuvat jokaisella myöhemmällä leikkausoppitunnilla.",
  ],
  sections: [
    {
      id: "miksi-leikkaus-epaonnistuu",
      title: "Miksi moni leikkaus epäonnistuu jo konsultaatiossa",
      blocks: [
        { p: "Tämä toistuu jatkuvasti. Asiakas sanoo: ”Otetaan vain vähän pois.” Asiakkaalle vähän tarkoittaa senttiä, kampaajalle se voi tarkoittaa viittä. Leikkauksen jälkeen asiakas on pettynyt, eikä kampaaja tiedä, mikä meni vikaan." },
        { p: "Oppitunti tiivistää tästä yksinkertaisen säännön: älä puhu sanoilla vähän, paljon, lyhyt tai pitkä. Jokainen kuulee ne omalla tavallaan. Numero tai tietty kohta asiakkaan vartalossa tarkoittaa teille molemmille samaa." },
      ],
    },
    {
      id: "kampaajan-konsultaatio",
      title: "Kampaajan konsultaatio: mitä kysyä ja miten pituudesta sovitaan",
      blocks: [
        { p: "Hyvä konsultaatio käy läpi kolme asiaa." },
        {
          ol: [
            "Kysy, mistä asiakas pitää ja mistä ei nykyisissä hiuksissaan, ja pyydä häntä näyttämään mallikuva.",
            "Sovi pituus numerolla tai **kosketuskohdalla** asiakkaassa: leukaan asti, olkapäihin asti, solisluun tasolle.",
            "Nosta suortuva, pidä sitä juuri siinä kohdassa ja varmista vielä.",
          ],
        },
        { img: { src: img("thong-nhat-do-dai-toc-bang-diem-cham-ngang-vai"), alt: "Kampaaja pitää asiakkaan pitkää vaaleaa hiussuortuvaa kahden sormen välissä olkapään korkeudella, ja asiakas katsoo kultakehyksiseen soikeaan peiliin", caption: "Pidä suortuvaa kosketuskohdassa ja varmista: uusi pituus päättyy tähän." } },
        { note: "Toista sovittu aina omin sanoin: ”Leikataan siis olkapäähän, eikö niin?” Yksi kysymys säästää kokonaisen pettymyksen.", kind: "tip", title: "Yksi varmistus" },
        { h3: "Kysy asiakkaan arjesta" },
        { p: "Föönaako asiakas kotona, kauanko aikaa aamuisin kuluu hiuksiin, laittaako hän hiukset usein kiinni, urheileeko hän? Kampaus, joka näyttää salongissa upealta mutta jota asiakas ei osaa tehdä kotona, lakkaa miellyttämästä muutamassa päivässä." },
      ],
    },
    {
      id: "hiusten-lukeminen-kuivina",
      title: "Hiusten lukeminen kuivina: kasvojen muoto, tuuheus, hiuslaatu ja pyörteet",
      blocks: [
        { p: "Vedä kaikki hiukset taakse ja katso kasvoja: pyöreät, pitkät, kulmikkaat vai soikeat. Leikkuulinja, volyymi ja kohta, johon hiukset päättyvät, voivat saada kasvot näyttämään pidemmiltä tai pyöreämmiltä. Pään muotoa katsotaan samalla tavalla. Joillakin takaraivo on melko litteä; kun siihen jätetään enemmän painoa, pää näyttää pyöreämmältä ja kauniimmalta." },
        {
          table: {
            head: ["Mitä luetaan", "Miten katsotaan", "Merkitys leikkaukselle"],
            rows: [
              ["Tuuheus", "Tee jakaus ja katso, paljonko hiuspohjaa näkyy", "Kertoo, ovatko hiukset tuuheat vai harvat"],
              ["Ohut hiuslaatu", "Katso ja tunnustele hiusta", "Jokainen saksien jälki näkyy, pienikin virhe erottuu heti"],
              ["Paksu hiuslaatu", "Katso ja tunnustele hiusta", "Jäykkä ja nousee helposti pystyyn"],
              ["Kiharuus", "Suora, laineikas vai kihara", "Jokainen leikataan eri tavalla"],
            ],
          },
        },
        { img: { src: img("re-ngoi-xem-mat-do-toc-va-da-dau"), alt: "Kampaaja tekee molemmin käsin suoran jakauksen vaalean asiakkaan päälaelle, ja esiin tulee siisti hiuspohjan linja sekä hiusten paksuus molemmin puolin", caption: "Jakaus näyttää hiusten tuuheuden ja hiuspohjan kunnon." } },
        { h3: "Pyörteet ja kasvusuunnat" },
        { p: "Uusi kampaaja unohtaa helposti hiusten kasvusuunnan. Lähes kaikilla on pyörre päälaella. Monella on pyörre myös niskassa tai otsan hiusrajassa, jolloin otsatukka nousee omaan suuntaansa. Niissä kohdissa hiukset eivät asetu niin kuin haluat, ja liian lyhyeksi leikattuina ne nousevat suoraan pystyyn." },
        { img: { src: img("xoay-toc-o-dinh-dau-khach-nam"), alt: "Näkymä takaa ja ylhäältä tummanruskeahiuksisen miehen päälaelle, jossa hiukset kiertyvät spiraalina yhdestä pisteestä", caption: "Päälaen pyörre: hiukset lähtevät yhdestä pisteestä eivätkä asetu leikkaajan toivomaan suuntaan." } },
        { p: "Kampaa hiuksia ennen leikkausta moneen suuntaan ja katso, miten ne luonnostaan laskeutuvat. Pyörteen kohdalle jätetään yleensä hieman enemmän pituutta, tai leikataan kasvusuunnan mukaan." },
      ],
    },
    {
      id: "kiharat-hiukset-markana-vai-kuivana",
      title: "Märät ja kuivat hiukset: miten kiharat hiukset leikataan",
      blocks: [
        { p: "Märkänä hius on painava, venyy suoraksi ja näyttää pidemmältä. Laineikas ja kihara hius kutistuu kuivuessaan, joskus paljonkin. Suoraksi vedetty kihara, joka ulottuu olkapäiden alle, voi kuivana päätyä leuan tasolle." },
        { img: { src: img("toc-xoan-khi-uot-keo-thang-dai-qua-vai"), alt: "Kastanjanruskeat kiharat hiukset juuri pestyinä ja tummina märkyydestä, kampaaja vetää yhden märän suortuvan suoraksi olkapään ohi", caption: "Kiharat hiukset märkinä: suoraksi vedettynä suortuva ulottuu olkapään ohi." } },
        { img: { src: img("toc-xoan-khi-kho-co-len-ngang-cam"), alt: "Samat kastanjanruskeat kiharat kuivina, kiharat nousevat leuan ja olkapään välille ja kampaaja pitää yhtä kiharaa sormenpäillään", caption: "Samat hiukset kuivina: kiharat nousevat selvästi lyhyemmiksi." } },
        { p: "Kiharoille hiuksille on siis kaksi vaihtoehtoa: leikkaa aiottua pidemmäksi, tai leikkaa ne kuivina tekniikalla, jonka olet koulutuksessa oppinut. Lisää voi aina leikata, mutta leikattua hiusta ei saa takaisin." },
      ],
    },
    {
      id: "hiuspohja-ja-pesu",
      title: "Hiuspohjan tarkistus ennen pesua ja hellävarainen pesu",
      blocks: [
        { p: "Katso hiuspohjaa ennen pesua. Avohaava, tulehdus, punoittava ja turvonnut iho, märkä tai täit tarkoittavat, ettei palvelua tehdä. Puhu asiakkaan kanssa hiljaa ja kahden kesken ja neuvo häntä käymään lääkärissä; älä anna hänen nolostua muiden edessä. Kieltäytymisestä kerrotaan oppitunnilla [Milloin asiakasta ei hoideta](lesson:khi-nao-khong-lam)." },
        { p: "Asiakkaalle pesu on käynnin rentouttavin hetki. Kampaajalle se on hetki, jolloin asiakas arvioi, oletko huolellinen. Näitä asiakas huomaa heti:" },
        {
          ul: [
            "Kokeilet veden lämmön omaan ranteeseesi ennen kuin vesi koskee asiakasta ja kysyt, onko lämpötila sopiva. Hanan lämpötila voi muuttua yllättäen, ja jokainen kokee lämmön eri tavoin.",
            "Pyyhe pitää kauluksen kuivana, ja niska lepää mukavasti pesualtaassa ilman, että mikään painaa.",
            "Hiuspohjaa hierotaan sormenpäillä, ei koskaan kynsillä.",
            "Huuhdellessa toinen käsi suojaa hiusrajaa, jottei vettä valu kasvoille ja korviin.",
            "Hiukset kuivataan pyyhkeellä painellen, ei hangaten. Hankaus takkuuttaa hiukset ja karheuttaa hiuksen pintasuomut.",
          ],
        },
        { p: "Pesupisteen työvaiheet järjestyksessä, takkujen selvittäminen ja jokaisen jakauksen tekeminen ovat käytännön artikkelissa [hiusten jakaminen osioihin](lesson:toc-tu-van-chia-vung)." },
      ],
    },
    {
      id: "miksi-hiukset-jaetaan-osioihin",
      title: "Miksi hiukset jaetaan osioihin ennen leikkausta",
      blocks: [
        { p: "Tarkasti voi leikata vain hiuksia, jotka näkee ja joita hallitsee. Kun jakaukset ovat suoria ja osiot eivät liian suuria, edellinen leikkuulinja löytyy aina uudelleen." },
        { p: "Yleisin tapa on **seitsemän osiota**: päälaki, kaksi sivuosiota korvien kohdalla, kaksi takaraivon osiota ja kaksi niskaosiota. Jokainen osio kierretään siististi, kiinnitetään klipsillä litteäksi päätä vasten ja pidetään tasaisen kosteana suihkepullolla." },
      ],
    },
    {
      id: "viisi-leikkaustermia",
      title: "Ohjauslinja, nostokulma ja kolme muuta leikkaustermiä",
      blocks: [
        { h3: "Ohjauslinja" },
        { p: "Ohjauslinja on ensimmäinen leikkuu. Kaikki myöhemmät leikkuut seuraavat sitä, joten jos ohjauslinja on vino, koko leikkaus on vino." },
        { img: { src: img("duong-chuan-dau-tien-o-gay-khi-cat-toc"), alt: "Lähikuva asiakkaan niskasta: ylemmät osiot on kiinnitetty ylös, ja kampaaja pitää ohutta hiuskerrosta kahden sormen välissä ja leikkaa suoraan poikki", caption: "Ensimmäinen leikkuu niskassa on ohjauslinja kaikille sen jälkeen alas lasketuille kerroksille." } },
        { h3: "Nostokulma" },
        { p: "Nostokulma on kulma, jossa hiussuortuvaa pidetään irti päästä." },
        {
          table: {
            head: ["Nostokulma", "Miten suortuvaa pidetään", "Tulos"],
            rows: [
              ["0°", "Hiukset putoavat suoraan alas", "Tasapituus, paino alhaalla"],
              ["45°", "Nostettu puoliväliin suorasta kulmasta", "Matala porrastus, joka säilyttää painon"],
              ["90°", "Suorassa kulmassa hiuspohjaan", "Tasainen porrastus pään muodon mukaan"],
              ["180°", "Nostettu suoraan ylös päälaelle", "Alemmat hiukset pitenevät: pitkä porrastus"],
            ],
          },
        },
        { img: { src: img("goc-nang-90-do-toc-vuong-goc-voi-da-dau"), alt: "Sivukuva kampaajasta, joka vetää asiakkaan päälaen takaa kostean suortuvan suoraan taaksepäin kahden sormen välissä suorassa kulmassa päähän nähden", caption: "Nostokulma 90°: suortuva on suorassa kulmassa hiuspohjaan." } },
        { p: "Nostokulmaa käytetään eniten kerrosleikkauksissa, katso [mikä on kerrosleikkaus](lesson:cat-nu-tang-hieu-dung)." },
        { h3: "Ylisuuntaus, kireys ja ristiintarkistus" },
        {
          ul: [
            "**Ylisuuntaus** tarkoittaa, että hiukset vedetään pois luonnolliselta laskeutumiskohdaltaan kohti ohjauslinjaa. Mihin suuntaan ylisuuntaatkin, hiukset pitenevät vähitellen vastakkaiseen suuntaan.",
            "**Kireys** on se, kuinka lujaa vedät suortuvaa: tasaisesti ja maltillisesti. Liian kireällä, etenkin märissä tai kiharoissa hiuksissa ja korvien kohdalla, hiukset nousevat kuivuttuaan lyhyemmiksi kuin halusit.",
            "**Ristiintarkistus** tarkoittaa, että kun olet leikannut yhteen suuntaan, jaat hiukset vastakkaiseen suuntaan tarkistusta varten ja vertaat sitten vasenta ja oikeaa puolta.",
          ],
        },
        { img: { src: img("so-hai-ben-toc-de-kiem-tra-sau-khi-cat"), alt: "Kampaaja seisoo asiakkaan takana ja pitää kasvojen molemmilta puolilta suortuvaa samalla korkeudella rinnan edessä verraten pituutta peilistä", caption: "Puolien vertaaminen peilistä on ristiintarkistuksen viimeinen vaihe." } },
        { note: "Kirjaa VaraaAihin sovittu pituus, pyörteet ja hiuslaatu [asiakastietojen](lesson:khach-hang) muistiinpanoihin, jotta seuraavalla kerralla kuka tahansa tekijä tietää ne. Kun lisäät hiustenleikkauksen [palveluksi](lesson:dich-vu), laske pesu ja jaottelu mukaan sen kestoon.", kind: "tip", title: "Kirjaa seuraavaa kertaa varten" },
        { note: "Hoitoaineen vaikutusaika tuotteen ohjeen mukaan. Hygieniamääräykset vaihtelevat maittain. Artikkeli on koulutusmateriaalia, ei ammattipätevyys.", kind: "info", title: "Huomioi" },
      ],
    },
  ],
  faq: [
    {
      q: "Mitä kampaajan konsultaatiossa kysytään?",
      a: "Kysy, mistä asiakas pitää ja mistä ei nykyisissä hiuksissaan, pyydä mallikuva ja kysy sitten arjesta: föönaako hän, kauanko aamuisin menee, laittaako hän hiukset kiinni, urheileeko hän. Sovi lopuksi pituus numerolla tai kosketuskohdalla asiakkaassa ja toista se hänelle ääneen.",
    },
    {
      q: "Asiakas sanoo ”vähän vain pois”. Paljonko leikataan?",
      a: "Älä arvaa. Vähän voi tarkoittaa asiakkaalle senttiä ja kampaajalle viittä. Pidä suortuvaa tietyssä kohdassa, kuten olkapäässä tai solisluun tasolla, ja varmista asiakkaalta ennen leikkaamista.",
    },
    {
      q: "Leikataanko kiharat hiukset märkinä vai kuivina?",
      a: "Kiharat ja laineikkaat hiukset kutistuvat kuivuessaan, joskus paljon lyhyemmiksi kuin miltä ne märkinä näyttivät. Jos leikkaat märkänä, jätä aiottua pidemmäksi äläkä vedä kireälle. Toinen vaihtoehto on leikata hiukset kuivina tekniikalla, jonka kampaaja on oppinut.",
    },
    {
      q: "Miten pyörteen kohta leikataan?",
      a: "Kampaa hiuksia ennen leikkausta moneen suuntaan ja katso, miten ne luonnostaan laskeutuvat. Pyörteen kohdalle jätetään yleensä hieman enemmän pituutta tai leikataan kasvusuunnan mukaan, koska liian lyhyeksi leikattuina hiukset nousevat pystyyn.",
    },
    {
      q: "Mikä on ohjauslinja hiustenleikkauksessa?",
      a: "Ohjauslinja on leikkauksen ensimmäinen leikkuu. Kaikkia myöhempiä leikkuita verrataan siihen ja ne leikataan sen mukaan, joten ohjauslinjan on oltava juuri asiakkaan kanssa sovitussa pituudessa.",
    },
    {
      q: "Mitä eroa on nostokulmilla 0°, 45°, 90° ja 180°?",
      a: "0° kulmassa hiukset putoavat suoraan alas ja syntyy tasapituus, jonka paino on alhaalla. 45° antaa matalan porrastuksen, joka säilyttää painon. 90° kulmassa suortuva on suorassa kulmassa hiuspohjaan, ja porrastus myötäilee pään muotoa. 180° kulmassa hiukset nostetaan suoraan ylös, ja alemmat hiukset pitenevät pitkäksi porrastukseksi.",
    },
  ],
  related: ["toc-tu-van-chia-vung", "cat-nu-bang-hieu-dung", "cat-nu-tang-hieu-dung", "cat-nam-co-ban-hieu-dung"],
};

export default article;
