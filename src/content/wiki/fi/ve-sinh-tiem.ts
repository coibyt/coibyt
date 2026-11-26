import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/ve-sinh-tiem/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "kauneushoitolan-omavalvontasuunnitelma-ja-siivous",
  lesson: "ve-sinh-tiem",
  category: "safety",
  title: "Kauneushoitolan omavalvontasuunnitelma ja päivittäinen siivous: siivoussuunnitelma sekä avaus- ja sulkemislista",
  metaTitle: "Kauneushoitolan omavalvontasuunnitelma ja siivous",
  metaDescription:
    "Kauneushoitolan omavalvontasuunnitelma Helsingin ohjeen mukaan: ilmoitus, siivoussuunnitelma, puhdistus ennen desinfiointia, tekstiilit, ilmanvaihto ja listat.",
  keyword: "kauneushoitolan omavalvontasuunnitelma",
  keywords: [
    "siivoussuunnitelma kauneushoitola",
    "kynsistudion siivous",
    "kauneushoitolan ilmoitus terveydensuojeluviranomaiselle",
    "siivousliinojen pesulämpötila",
    "ilmanvaihto kynsistudiossa",
    "huonekasvit salongissa",
    "kauneushoitolan perustaminen Helsinki",
  ],
  excerpt: "Puhdas liike syntyy pienistä päivittäisistä tehtävistä, jotka on kirjattu suunnitelmaksi: mitä siivotaan, milloin, millä ja kuka. Esimerkit Helsingin ohjeesta.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("chu-tiem-lam-dep-trong-salon-sach-buoi-sang"),
    alt: "Vaaleahiuksinen salongin omistaja kermanvärisessä paidassa pitelee kansiota ja seisoo valoisassa salongissa valkoisten kivisten kynsipöytien rivin keskellä",
  },
  takeaways: [
    "Laadi kirjallinen **siivoussuunnitelma**: mitä siivotaan, kuinka usein, millä välineillä ja aineilla ja kuka siivoaa.",
    "**Puhdista ensin, desinfioi sitten**, koska lika heikentää desinfiointiaineen tehoa. Veriset pinnat desinfioidaan aina.",
    "Siivousliinat pestään jokaisen käytön jälkeen vähintään 60 °C:ssa, mieluiten 90 °C:ssa. Puhtaat ja likaiset pyyhkeet säilytetään erillään.",
    "Helsingissä useimpien kauneushoitoloiden on tehtävä ilmoitus kaupungille vähintään 30 päivää ennen aloittamista, ja niillä on oltava omavalvontasuunnitelma.",
    "Tee suunnitelmasta kaksi lyhyttä listaa avaamiseen ja sulkemiseen; tekijä kuittaa ja allekirjoittaa, omistaja käy listat läpi viikoittain.",
  ],
  intro: [
    "Kauneushoitolan omavalvontasuunnitelma kuulostaa paperityöltä, mutta sen tulos näkyy asiakkaalle jo ennen kuin hän istuu alas: liike tuntuu puhtaalta. Todellinen puhtaus ei ole hyvää tuoksua tai kaunista valaistusta. Se on pieniä tehtäviä, jotka tehdään säännöllisesti joka päivä ja jotka on kirjoitettu suunnitelmaksi, jotta jokainen liikkeessä tietää oman osansa.",
    "Artikkeli perustuu VaraaAi Academyn Hygienia ja turvallisuus -kurssin oppituntiin ”Liikkeen päivittäinen siivous ja omavalvontasuunnitelma”. Esimerkit ovat Helsingin kaupungin ohjeesta (versio 5/2025), joka on mainittu lähteenä artikkelin lopussa. Helsinkiläiselle salongille se on oman kaupungin ohje; muissa kunnissa vaatimukset voivat poiketa, mutta ajattelutapa on lähes sama. Luettuasi osaat laatia omalle liikkeellesi siivousaikataulun ja kaksi tarkistuslistaa.",
  ],
  sections: [
    {
      id: "ilmoitus-ja-omavalvonta",
      title: "Kauneushoitolan perustaminen Helsingissä: ilmoitus 30 päivää ennen ja omavalvontasuunnitelma",
      blocks: [
        { p: "Helsingissä useimpien kauneushoitoloiden on tehtävä ilmoitus kaupungille vähintään 30 päivää ennen toiminnan aloittamista. Parturi-kampaamoiden tarvitsee tehdä ilmoitus vain, jos ne tarjoavat myös ihonkäsittelyjä. Sama koskee kotona tehtävää työtä ja freelancereita. Uusi ilmoitus tehdään olennaisista muutoksista, toiminnanharjoittajan vaihtuessa ja toiminnan loppuessa. Sen jälkeen kaupunki tarkastaa toimintaa säännöllisesti maksua vastaan." },
        { p: "Ilmoitusta tärkeämpi on **omavalvontasuunnitelma**. Omavalvonta tarkoittaa, että toiminnanharjoittaja tunnistaa oman liikkeensä terveysriskit ja pystyy näyttämään, mitä niiden ehkäisemiseksi on tehty. Liikkeellä on oltava suunnitelma, ja sitä on myös noudatettava; kaupunki suosittelee laatimaan sen kirjallisena. Parturi-kampaamoiden on tehtävä omavalvontaa, vaikka niillä ei olisi ilmoitusvelvollisuutta." },
        { img: { src: img("viet-ke-hoach-tu-kiem-soat-cua-tiem"), alt: "Kermanvaaleaan jakkuun pukeutunut salongin omistaja istuu työpöydän ääressä ja kirjoittaa avoimeen kansioon, vieressä kannettava tietokone" } },
        { h3: "Mitä omavalvontasuunnitelmaan kuuluu" },
        {
          table: {
            head: ["Osa", "Sisältö"],
            rows: [
              ["Toiminnan ja tilojen kuvaus", "Palvelut, aukioloajat, henkilömäärä, vesipisteet, WC:t, laitteet"],
              ["Välineet", "Miten välineet puhdistetaan, desinfioidaan ja steriloidaan"],
              ["Riskit", "Herkät asiakkaat, tuholaiset, korjaustarpeet, epidemiat"],
              ["Ehkäisy", "Henkilökunnan perehdytys, siivoussuunnitelma, ilmanvaihdon huolto, sterilointi-indikaattorit"],
            ],
          },
        },
        { p: "Suunnitelma päivitetään, kun liikkeen toiminta muuttuu. Välineistä, käsihygieniasta ja vahinkotilanteista ei tarvitse kirjoittaa pitkästi: riittää, että suunnitelmassa sanotaan, mitä käytäntöä liike noudattaa ja kuka siitä vastaa. Näillä kolmella on omat oppituntinsa: [Välineet jokaisen asiakkaan jälkeen: työvaiheet](lesson:ve-sinh-dung-cu), [Käsihygienia, käsineet ja suojaimet](lesson:rua-tay-gang-tay) ja [Vahinkotilanteet: verenvuoto, allergiset reaktiot, palovammat](lesson:xu-ly-su-co). Tämä artikkeli käsittelee itse tilaa: pintoja, lattioita, pyyhkeitä, vettä, ilmaa ja jätteitä." },
      ],
    },
    {
      id: "puhdistus-ennen-desinfiointia",
      title: "Ensin puhdistus, sitten desinfiointi: kynsistudion siivousaikataulu",
      blocks: [
        { p: "Siivouksen ensimmäinen periaate on järjestys. Ensin mekaaninen puhdistus, sitten desinfiointi, koska lika heikentää desinfiointiaineen tehoa. Desinfiointiaineen suihkuttaminen suoraan pöydälle, jolla on vielä kynsipölyä ja voidetahroja, on pelkkää aineen tuhlausta." },
        {
          table: {
            head: ["Pinta", "Mitä se vaatii"],
            rows: [
              ["Ei koske käsiteltävään ihoon", "Puhdistus riittää"],
              ["Koskettaa asiakkaan ihoa", "Puhdistus ja sen jälkeen desinfiointi"],
              ["Pinnalla on verta, koski se asiakkaaseen tai ei", "Desinfioidaan aina"],
            ],
          },
        },
        { img: { src: img("lau-sach-mat-ban-lam-mong-bang-khan-am"), alt: "Kermanväriseen paitaan ja mustiin käsineisiin pukeutunut hoitaja pyyhkii valkoista kivipöytää taitellulla kostealla liinalla ja pudottaa toisella kädellä liinan teräsämpäriin", caption: "Ensimmäinen vaihe: näkyvä lika pois." } },
        { img: { src: img("khu-khuan-goi-ke-tay-sau-khi-lau-sach"), alt: "Käsineinen käsi suihkuttaa valkoisesta suihkepullosta desinfiointiainetta juuri pyyhitylle kermanväriselle nahkaiselle käsityynylle", caption: "Toinen vaihe: asiakkaan ihoa koskettavat pinnat, kuten käsityyny, desinfioidaan." } },
        { h3: "Aikataulu, joka toistuu hyvin hoidetuissa liikkeissä" },
        {
          table: {
            head: ["Milloin", "Mitä siivotaan"],
            rows: [
              ["Jokaisen asiakkaan jälkeen", "Pöytä, käsityyny, tuoli, lamppu ja kohdat, joihin kädet ovat koskeneet"],
              ["Jokaisen päivän päätteeksi", "Lattian pesu, roskien tyhjennys, ovenkahvat, hanat ja vastaanottotiski, välinealtaan pesu"],
              ["Joka viikko", "Kaapit, hyllyt, pöydänjalat, laatikot, lasiovet"],
            ],
          },
        },
        { note: "Aikataulu on yleinen hyvä käytäntö, ei määräys. Siivousvälin päätät itse; kirjaa se siivoussuunnitelmaan yhdessä välineiden, aineiden ja siivoojan nimen kanssa. Siivoussuunnitelma liitetään omavalvontasuunnitelmaan.", kind: "info", title: "Siivousvälin päätät itse" },
        { h3: "Myös siivousvälineiden on oltava puhtaita" },
        {
          ul: [
            "Siivousliinat pestään jokaisen käytön jälkeen vähintään 60 °C:ssa, mieluiten 90 °C:ssa. Vaihtoehtona ovat kertakäyttöiset liinat.",
            "Mopit ja harjat eivät jää lattialle, eikä niitä säilytetä WC:ssä. Niille on oma ovellinen kaappi.",
            "WC:llä on omat siivousvälineet, jotka on helppo erottaa muista, esimerkiksi värikoodauksella.",
          ],
        },
        { img: { src: img("tu-rieng-cat-dung-cu-lau-don-khan-theo-mau"), alt: "Kermanvärinen kaappi molemmat ovet auki, sisällä koukuissa roikkuvat moppi ja harja ja hyllyllä eriväriset siivousliinat suihkepullojen vieressä" } },
      ],
    },
    {
      id: "pyyhkeet-ja-tekstiilit",
      title: "Pyyhkeet ja tekstiilit: puhtaat ja likaiset eivät koskaan ole vierekkäin",
      blocks: [
        { p: "Työssä käytettävät pyyhkeet ja tekstiilit pestään ja kuivataan pesukoneessa. Pesukone ei saa olla WC:ssä. Puhtaat ja likaiset säilytetään erillään: puhtaat pyyhkeet suljetussa kaapissa, käytetyt kannellisessa astiassa." },
        { img: { src: img("khan-sach-trong-tu-khan-ban-trong-thung-co-nap"), alt: "Kermanvärinen kaappi, jonka avoimen oven takana on siistejä valkoisten pyyhkeiden pinoja, ja hieman kauempana kannellinen astia käytetyille pyyhkeille" } },
        { note: "Pino puhtaita pyyhkeitä avohyllyllä aivan likaisten pyyhkeiden korin vieressä. Näin säilytettyjen pyyhkeiden puhtauteen ei voi enää luottaa siinä vaiheessa, kun ne päätyvät asiakkaalle.", kind: "warn", title: "Yleinen virhe" },
      ],
    },
    {
      id: "vesi-ilma-jatteet",
      title: "Vesipiste, ilmanvaihto, huonekasvit ja jätteet",
      blocks: [
        { h3: "Vesipiste työpisteen vieressä" },
        { p: "Jokaisen työpisteen vieressä tai välittömässä läheisyydessä on oltava oma vesipiste käsien ja välineiden pesuun, ja sinne on päästävä kulkematta suljetun oven läpi. Jos vesipisteitä on vain yksi, siinä tulisi olla kaksi allasta. Välineiden pesun jälkeen allas pestään ja desinfioidaan ennen kuin sitä käytetään taas asiakastyöhön. WC:ssä on oma käsienpesuallas, nestesaippua ja paperipyyhkeet." },
        { img: { src: img("bon-rua-tay-ngay-canh-ban-lam-mong"), alt: "Valkoinen kivinen kynsipöytä käsityynyineen ja aivan sen vieressä käsienpesuallas, jossa on messinkihana, saippua ja paperipyyhkeet" } },
        { h3: "Ilmanvaihto kynsistudiossa" },
        { p: "Helsingin ohjeen mukaan ilmanvaihdon on oltava vähintään 6 litraa sekunnissa henkilöä kohden. Koneellinen tulo- ja poistoilmanvaihto on suositeltava, jos asiakkaita on yhtä aikaa yli kaksi tai käytetään voimakashajuisia kemikaaleja. Akryylikynsien työpisteessä on oltava kohdepoisto. Kirjaa suunnitelmaan suodattimien vaihtoaikataulu, venttiilien puhdistus ja kiinteistöhuollon puhelinnumero. Miksi puhdas ilma on tekijälle niin tärkeää, kerrotaan oppitunnilla [Allergiat ja kemikaalit](lesson:di-ung-hoa-chat)." },
        { img: { src: img("mieng-gio-thong-gio-tren-tran-tiem-nail"), alt: "Salongin kermanvärinen katto, jossa on pyöreä valkoinen ilmanvaihtoventtiili, alla rivi kivisiä kynsipöytiä ja huoneen perällä kattokruunu" } },
        { h3: "Huonekasvit" },
        { p: "Tämä yllättää monet: ohje ei suosittele huonekasveja salonkiin. Mullassa on paljon mikrobeja, ja ilmavirta voi levittää niitä ympäri huonetta." },
        { img: { src: img("chau-cay-trong-tiem-lam-dep-khong-nen-de"), alt: "Suuri ruukkukasvi aivan kynsihoitotuolin vieressä, kuivia lehtiä ja multaa kivilattialla, ja vieressä kynsiteknikko tekee asiakkaan kynsiä", caption: "Esimerkki siitä, mitä ei pidä tehdä: multaruukussa kasvava kasvi aivan asiakastyöpisteen vieressä." } },
        { h3: "Jätteet ja terävät jätteet" },
        {
          ul: [
            "Roska-astiat ovat ehjiä ja kannellisia, ja ne tyhjennetään niin usein, että kansi menee aina kiinni. Silloin ei tule hajua eikä hyönteisiä tai jyrsijöitä houkutella paikalle.",
            "Neulat, terät ja muut terävät jätteet laitetaan tehdasvalmisteiseen riskijäteastiaan ja viedään hyväksyttyyn vastaanottopisteeseen. Helsingissä ne ovat Sortti-asemia.",
            "Jos huomaat merkkejä hyönteisistä tai jyrsijöistä, puutu asiaan heti äläkä odota.",
          ],
        },
      ],
    },
    {
      id: "avaus-ja-sulkemislista",
      title: "Avaus- ja sulkemislista: siivouksen tarkistuslista arkeen",
      blocks: [
        { p: "Laatikossa makaava suunnitelma ei auta ketään. Helpoin tapa pitää se elävänä on tiivistää se kahdeksi hyvin lyhyeksi listaksi. Alla olevat listat ovat yleistä hyvää käytäntöä; muokkaa ne omaan liikkeeseesi sopiviksi." },
        {
          table: {
            head: ["Aamulla avatessa", "Illalla suljettaessa"],
            rows: [
              ["Ilmanvaihto päälle", "Pöydät pyyhitty"],
              ["Kuuma ja kylmä vesi testattu", "Lattia pesty"],
              ["Saippuaa ja paperipyyhkeitä riittävästi", "Pyyhkeet ja liinat pesty"],
              ["Sterilointipussit voimassa", "Roskat tyhjennetty"],
              ["Roskat tyhjennetty", "Välineallas pesty"],
              ["", "Poikkeamat kirjattu"],
            ],
          },
        },
        { img: { src: img("danh-sach-kiem-tra-ve-sinh-luc-mo-cua"), alt: "Kermanväriseen paitaan pukeutunut hoitaja seisoo vastaanottotiskillä ja rastittaa kynällä tarkistuslistaa kirjoitusalustalla" } },
        { p: "Tehtävän tekijä merkitsee rastin ja allekirjoittaa. Viikon lopuksi omistaja käy listat läpi ja näkee, mitkä tehtävät jäävät useimmin tekemättä." },
        { note: "VaraaAissa voit muistuttaa koko tiimiä avaus- ja sulkemislistoista [tiimin työtilan](lesson:tien-ich-nhom) tiedotteilla ja jakaa omavalvontasuunnitelman koulutusosiossa, jotta uusi työntekijä lukee sen heti ensimmäisenä päivänä.", kind: "tip", title: "Muistuta tiimiä VaraaAissa" },
      ],
    },
    {
      id: "kun-tarkastaja-tulee",
      title: "Kun tarkastaja tulee, ja oman kuntasi vaatimukset",
      blocks: [
        { p: "Tarkastaja katsoo muutakin kuin puhdasta pöytää. Hän voi kysyä, mitä riskejä liike on tunnistanut ja mitä se on tehnyt niiden eteen. Selkeästi kirjoitettu suunnitelma ja liike, joka toimii juuri niin kuin suunnitelmassa lukee, on paras vastaus." },
        { p: "Liikkeen hygienia ei siis ole yksi iso suursiivous. Se on pieniä tehtäviä joka päivä, ja jokainen tietää oman osansa." },
        { note: "Määräykset vaihtelevat maittain ja kunnittain. Artikkelin vaatimukset ovat esimerkkejä Helsingin kaupungin ohjeesta. Tarkista oman liikkeesi tarkat vaatimukset oman kuntasi terveydensuojeluviranomaiselta.", kind: "warn", title: "Kysy oman kuntasi terveydensuojelusta" },
      ],
    },
  ],
  faq: [
    {
      q: "Pitääkö kynsipöytä desinfioida puhdistuksen jälkeen?",
      a: "Se riippuu pinnasta. Pinta, joka ei koske käsiteltävään ihoon, tarvitsee vain puhdistuksen. Asiakkaan ihoa koskettavat pinnat, kuten pöytätaso ja käsityyny, puhdistetaan ja sitten desinfioidaan. Veriset pinnat desinfioidaan aina. Puhdistus tehdään aina ensin, koska lika heikentää desinfiointiaineen tehoa.",
    },
    {
      q: "Missä lämpötilassa salongin pyyhkeet ja siivousliinat pestään?",
      a: "Helsingin kaupungin ohjeen mukaan siivousliinat pestään jokaisen käytön jälkeen vähintään 60 °C:ssa, mieluiten 90 °C:ssa, tai käytetään kertakäyttöisiä liinoja. Työpyyhkeet ja tekstiilit pestään ja kuivataan pesukoneessa, puhtaat säilytetään suljetussa kaapissa ja käytetyt kannellisessa astiassa.",
    },
    {
      q: "Mikä on kauneushoitolan omavalvontasuunnitelma?",
      a: "Se on suunnitelma, johon toiminnanharjoittaja kirjaa liikkeensä terveysriskit ja niiden ehkäisyn ja jota noudatetaan joka päivä. Helsingissä kauneushoitoloilla on oltava omavalvontasuunnitelma, ja kaupunki suosittelee laatimaan sen kirjallisena. Siihen kuuluvat toiminnan ja tilojen kuvaus, välinehuolto, riskit ja niiden ehkäisy.",
    },
    {
      q: "Pitääkö kynsistudion perustamisesta ilmoittaa kaupungille?",
      a: "Helsingin ohjeen mukaan useimpien kauneushoitoloiden on tehtävä ilmoitus kaupungille vähintään 30 päivää ennen toiminnan aloittamista, myös kotona tai freelancerina työskenneltäessä. Parturi-kampaamoiden tarvitsee ilmoittaa vain, jos ne tekevät ihonkäsittelyjä. Muiden kuntien vaatimukset voivat poiketa, joten tarkista ne oman kuntasi terveydensuojeluviranomaiselta.",
    },
    {
      q: "Saako kynsistudiossa tai hoitolassa olla huonekasveja?",
      a: "Helsingin kaupungin ohje ei suosittele huonekasveja salonkiin, koska mullassa on paljon mikrobeja ja ilmavirta voi levittää niitä ympäri huonetta.",
    },
    {
      q: "Mitä kauneushoitolan päivittäiseen siivouslistaan kuuluu?",
      a: "Avatessa: ilmanvaihto päälle, kuuman ja kylmän veden testaus, saippuan ja paperipyyhkeiden tarkistus, sterilointipussien voimassaolo ja tyhjennetyt roskat. Suljettaessa: pöydät, lattia, pyyhkeiden pesu, roskat, välinealtaan pesu ja poikkeamien kirjaus. Tekijä kuittaa ja allekirjoittaa, ja omistaja käy listat läpi viikoittain.",
    },
  ],
  related: ["ve-sinh-dung-cu", "rua-tay-gang-tay", "xu-ly-su-co", "di-ung-hoa-chat"],
};

export default article;
