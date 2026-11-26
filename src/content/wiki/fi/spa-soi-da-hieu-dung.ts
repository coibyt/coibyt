import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/spa-soi-da-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "ihotyypit-ja-ihon-kunto",
  lesson: "spa-soi-da-hieu-dung",
  category: "spa",
  title: "Ihotyypit ja ihon kunto: rasvainen, kuiva, sekaiho ja herkkä iho selitettynä",
  metaTitle: "Ihotyypit: rasvainen, kuiva, sekaiho ja herkkä iho",
  metaDescription:
    "Ihotyypit ja miten ne eroavat ihon kunnosta: miksi rasvainen iho voi olla kuivunut, mitä ihoanalyysissä katsotaan ja milloin asiakas ohjataan lääkäriin.",
  keyword: "ihotyypit",
  keywords: [
    "ihotyyppi ja ihon kunto",
    "kuiva vai kuivunut iho",
    "rasvainen ja kuivunut iho",
    "mikä on sekaiho",
    "herkkä iho",
    "esitietolomake kasvohoitoon",
    "isotretinoiini ja vahaus",
  ],
  excerpt: "Viisi ihotyyppiä, viisi yleisintä ihon kuntoa ja miksi niitä ei saa sekoittaa toisiinsa. Lisäksi kysymykset, jotka kosmetologi esittää ennen jokaista hoitoa.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("chuyen-vien-spa-chuan-bi-soi-da-cho-khach"),
    alt: "Kermanvärisessä työasussa oleva kosmetologi seisoo hoitopöydällä makaavan asiakkaan vieressä pyöreän suurennuslampun luona travertiinihuoneessa, jossa on kaari-ikkunat",
  },
  takeaways: [
    "**Ihotyyppi** on melko pysyvä: normaali, kuiva, rasvainen, sekaiho, herkkä. **Ihon kunto** vaihtelee vuodenajan, tuotteiden, iän ja unen mukaan.",
    "Rasvan puute tarkoittaa kuivaa ihoa. Kosteuden puute on ihon kunto, ja sitä voi olla millä tahansa ihotyypillä, **myös rasvaisella**.",
    "Ihoa luetaan silmillä, käsillä ja kysymyksillä: puhdas iho, hyvä valo, suurennuslamppu ja esitietolomake, jossa kysytään allergiat, lääkkeet ja käytössä olevat tuotteet.",
    "Asiakas käyttää isotretinoiinia tai on lopettanut sen noin puolen vuoden sisällä: ei vahausta. Retinoideja tai happoja käyttävä iho: ei voimakasta kuorintaa.",
    "Kosmetologi **ei diagnosoi**. Jos jokin huolestuttaa, jätä alue hoitamatta, kuvaile mitä näet ja ohjaa asiakas lääkäriin.",
  ],
  intro: [
    "Ihotyypit jaetaan yleensä viiteen: normaali, kuiva, rasvainen, sekaiho ja herkkä iho. Nimien tunteminen on kuitenkin vasta puolet asiasta. Toinen puoli on ihon kunto, joka vaihtelee vuodenajan ja jokaisen uuden voidepurkin mukaan, ja joka selittää, miksi rasvainenkin iho voi kiristää ja kirvellä kuivumisen takia. Näiden kahden sekoittaminen on yleisin virhe, kun valitaan tuotteita ja hoitoja.",
    "Artikkeli seuraa VaraaAi Academyn oppituntia ”Ihoanalyysi ja konsultaatio: ymmärrä ne, niin valitset oikean hoidon”, joka avaa Spa ja ihonhoito -kurssin. Luettuasi erotat ihotyypin ihon kunnosta, tiedät mitä katsoa ja mitä kysyä ennen kuin kosket asiakkaan ihoon, ja tiedät, milloin on syytä pysähtyä. Ihoanalyysi vaihe vaiheelta on käytännön artikkelissa [Ihoanalyysi vaihe vaiheelta](lesson:spa-soi-da).",
  ],
  sections: [
    {
      id: "miksi-iho-luetaan",
      title: "Miksi jokainen kasvohoito alkaa ihon lukemisesta",
      blocks: [
        { p: "Kun luet ihon oikein, valitset oikeat tuotteet ja oikean menetelmän. Jos luet sen väärin, iho voi punoittaa, kirvellä ja näppylöityä, olivat tuotteet kuinka kalliita tahansa, eikä asiakas tule takaisin." },
        { p: "Tilanne on hyvin tavallinen: asiakas tulee sisään ja kertoo, että hänen ihonsa on todella rasvainen. Hoitaja ottaa heti esiin voimakkaan puhdistusaineen, tekee perusteellisen kuorinnan ja levittää päälle rasvaa imevän savinaamion. Seuraavana päivänä asiakas lähettää viestin: iho kiristää, kirvelee ja hilseilee, ja kiiltää silti. Iho oli yhtä aikaa rasvainen ja kuivunut. Kun kaikki rasva riisutaan pois, se kuivuu ja kiristää entistä enemmän." },
        { note: "Virhe oli kuunnella katsomatta, koskettamatta ja kysymättä lisää. Se, mitä asiakas kertoo omasta ihostaan, on hyödyllistä tietoa, ei vielä johtopäätös.", kind: "tip", title: "Kuuntele ja tarkista itse" },
      ],
    },
    {
      id: "viisi-ihotyyppia",
      title: "Viisi ihotyyppiä: normaali, kuiva, rasvainen, sekaiho, herkkä",
      blocks: [
        { p: "Ihotyyppi on ihon perusluonne. Se on melko pysyvä ja pitkälti perinnöllinen. Jokaisella tyypillä on muutama tuntomerkki, jonka voi nähdä ja tuntea." },
        {
          table: {
            head: ["Ihotyyppi", "Tunnistat sen tästä"],
            rows: [
              ["Normaali", "Sileä, pienet huokoset, ei liian kiiltävä eikä kireä"],
              ["Kuiva", "Vähän rasvaa, hieman karhea, kiristää puhdistuksen jälkeen, joskus kevyttä hilseilyä"],
              ["Rasvainen", "Kiiltää kauttaaltaan, suuremmat huokoset, mustapäitä tulee helposti"],
              ["Sekaiho", "Kiiltää T-alueella (otsa, nenä, leuka), posket normaalit tai kuivat"],
              ["Herkkä", "Punoittaa, kirvelee tai kutisee helposti tuotteiden tai sään vaihtuessa"],
            ],
          },
        },
        { img: { src: img("da-hon-hop-bong-dau-vung-chu-t"), alt: "Lähikuva valkoista otsapantaa käyttävästä naisesta silmät kiinni, otsa, nenä ja leuka kevyesti kiiltävät ja posket ovat mattapintaiset", caption: "Sekaiho: T-alue kiiltää, posket eivät." } },
        { img: { src: img("da-kho-li-khong-bong-dau"), alt: "Lähikuva valkoista otsapantaa käyttävästä naisesta silmät kiinni, posket mattapintaiset ja hieman väsyneen näköiset ilman yhtään kiiltävää kohtaa", caption: "Kuiva iho: mattapintainen, ei kiiltoa, kiristää helposti puhdistuksen jälkeen." } },
      ],
    },
    {
      id: "ihon-kunto",
      title: "Ihon kunto: kuivuminen, punoitus, tukkeutuminen, pigmentti, ikääntyminen",
      blocks: [
        { p: "Ihon kunto kertoo, mitä iholla tapahtuu juuri nyt. Se muuttuu vuodenajan, sään, asiakkaan käyttämien tuotteiden, iän ja unen mukaan. Tänään kuivunut iho voi olla ensi kuussa kunnossa." },
        {
          table: {
            head: ["Ihon kunto", "Mitä iholla näkyy"],
            rows: [
              ["Kuivuminen", "Iho kiristää, näyttää väsyneeltä, hyvin hienoja juonteita, voi silti kiiltää"],
              ["Punoitus", "Punoittava iho, pienet verisuonet näkyvät selvästi"],
              ["Tukkeutuminen", "Mustapäät, pienet näppylät ihon alla"],
              ["Pigmentti", "Ruskeat läiskät, pisamat, tummat jäljet"],
              ["Ikääntymisen merkit", "Rypyt, iho ei ole enää yhtä kiinteä"],
            ],
          },
        },
        { note: "Rasvan puute tarkoittaa kuivaa ihoa, ja se on ihotyyppi. Kosteuden puute on ihon kunto, jota voi olla millä tahansa ihotyypillä, myös rasvaisella. Kiiltävä iho ei siis todista, että iholla on tarpeeksi kosteutta.", kind: "info", title: "Kuiva vai kuivunut iho" },
        { img: { src: img("da-nhay-cam-do-o-hai-ma"), alt: "Lähikuva valkoista otsapantaa käyttävästä naisesta silmät kiinni, kummallakin poskella ja nenänsiivissä on pehmeä leviävä punoitus", caption: "Punoitus poskilla: iho on juuri nyt herkkä, joten jokainen ote tehdään kevyesti." } },
        { img: { src: img("da-bit-tac-mun-dau-den-o-mui"), alt: "Lähikuva valkoista otsapantaa käyttävästä naisesta silmät kiinni, nenässä ja sen molemmin puolin on pieniä tummia mustapäitä", caption: "Mustapäät nenässä ja leuassa: tukkeutunut iho." } },
      ],
    },
    {
      id: "ihon-lukeminen",
      title: "Mikä on ihoanalyysi: silmät, kädet ja kysymykset",
      blocks: [
        { p: "Ihoanalyysissä katsotaan puhdasta, meikitöntä ihoa hyvässä valossa ja suurennuslampun läpi. Asiakkaan silmät peitetään vanulapuilla, koska lamppu on hyvin kirkas. Katsot, onko pinta sileä vai karhea, missä huokoset ovat suuremmat ja mitkä alueet kiiltävät. Sen jälkeen kosketat aivan kevyesti: onko iho pehmeä, kireä vai karhea? Kohta, joka punertuu heti kosketuksesta, on juuri sillä hetkellä herkkä." },
        { note: "Etene aina samassa järjestyksessä: otsa, T-alue, posket, leukalinja ja leuka, kaula. Mikään alue ei jää huomaamatta, ja seuraavalla kerralla merkintöjä on helppo verrata.", kind: "tip", title: "Aina sama järjestys" },
        { h3: "Mitä esitietolomakkeessa kysytään" },
        { p: "Pelkkä katsominen ei riitä. Esitietolomake suojaa suurimmilta riskeiltä, ja myös vakioasiakkailta kysytään uudelleen, koska asiat ovat voineet muuttua edellisen käynnin jälkeen." },
        { img: { src: img("phieu-tu-van-da-truoc-lieu-trinh"), alt: "Valkoiseen kylpytakkiin pukeutunut asiakas istuu nojatuolissa ja keskustelee kosmetologin kanssa, jolla on kädessään kirjoitusalusta, esitietolomake ja kynä" } },
        {
          ul: [
            "Onko allergioita, onko kosmetiikka aiemmin aiheuttanut reaktioita?",
            "Mitä lääkkeitä asiakas käyttää?",
            "Mitä hän käyttää iholleen kotona, erityisesti retinoideja tai kuorivia happoja?",
            "Käyttääkö hän aknelääke isotretinoiinia?",
            "Onko hänelle tehty viime aikoina hoitoja, kuten kemiallinen kuorinta, laser tai vahaus?",
            "Oleskeleeko hän paljon auringossa?",
          ],
        },
        { h3: "Miksi kysytään näin tarkasti" },
        {
          table: {
            head: ["Asiakas kertoo", "Mitä se tarkoittaa", "Mitä kosmetologi tekee"],
            rows: [
              ["Käyttää retinoideja tai happoja", "Iho on tavallista ohuempi ja herkempi", "Välttää voimakasta kuorintaa, joka naarmuttaa ja kirvelee helposti"],
              ["Käyttää isotretinoiinia tai lopetti noin puolen vuoden sisällä", "Iho vaurioituu hyvin helposti", "Ei vahausta; kertoo syyn ja kirjaa sen"],
              ["On raskaana", "Tuotteiden valinnassa tarvitaan lisää varovaisuutta", "Kysyy lisää ja valitsee tuotteet valmistajan ohjeen mukaan"],
            ],
          },
        },
        { p: "Isotretinoiinin osalta myös brittiläisen [NHS:n](https://www.nhs.uk/medicines/isotretinoin-capsules/common-questions-about-isotretinoin-capsules/) lääkeohje neuvoo välttämään vahausta hoidon aikana. Lääkkeiden, aktiivisten tuotteiden ja raskauden kohdalla yleinen sääntö on noudattaa valmistajan ohjeita ja lääkkeen määränneen lääkärin neuvoja. Ei arvailua eikä omia johtopäätöksiä." },
      ],
    },
    {
      id: "ei-diagnooseja",
      title: "Ei diagnooseja: milloin ei hoideta ja mitä sanotaan",
      blocks: [
        { p: "Tämä on ihon parissa työskentelevän tärkein periaate. Sinä hoidat ihoa, et tutki sitä kuin lääkäri. Jos näet jonkin seuraavista, jätä se alue hoitamatta:" },
        {
          ul: [
            "Auringossa palanut tai rikkinäinen iho.",
            "Huuliherpes.",
            "Turvonnut, punainen, kipeä tai märkivä alue.",
            "Epätavallinen luomi, joka muuttaa väriä tai muotoa.",
          ],
        },
        { img: { src: img("mun-rop-o-moi-khong-lam-tren-vung-do"), alt: "Lähikuva naisen kasvojen alaosasta, ylähuulen suupielessä on pieni rakkularyhmä hieman punertavalla iholla", caption: "Rakkularyhmä huulessa: aluetta ei hoideta, ja asiakasta neuvotaan kysymään lääkäriltä." } },
        { p: "Älä nimeä sairautta. Kuvaile, mitä näet, ja ohjaa lääkäriin. Oikeat sanat kuulostavat tältä: ”Näen, että tämä kohta on turvonnut ja punainen, joten en hoida sitä. Kysy siitä lääkäriltä.” Lause ”Sinulla on tulehdus” on diagnoosi, eikä se kuulu kosmetologin työhön." },
        { note: "Oppitunti [Milloin asiakasta ei hoideta](lesson:khi-nao-khong-lam) käy varoitusmerkit ja kieltäytymisen tavat läpi tarkemmin. Kosmetologin työn rajat määritellään eri maissa eri tavoin, joten tarkista omaa toimintaasi koskevat säännöt. Oppitunti on koulutusmateriaalia, ei ammattipätevyys.", kind: "warn", title: "Milloin asiakas ohjataan lääkäriin" },
      ],
    },
    {
      id: "tulokset-ja-kotihoito",
      title: "Rehelliset tulokset ja yksinkertainen kotihoito",
      blocks: [
        { p: "Hoito valitaan vasta, kun iho on luettu ja asiakasta on kuunneltu. Kerro sitten rehellisesti, mihin hoito pystyy. Kasvohoito jättää ihon puhtaaksi, pehmeäksi ja raikkaammaksi. Ruskeat läiskät, rypyt tai pitkäaikainen akne eivät katoa yhdellä hoitokerralla. Jos lupaat liikoja, asiakas pettyy; kun olet rehellinen, hän luottaa sinuun. Kirjaa asiakkaan tavoite, niin voitte verrata ensi kerralla." },
        { p: "Salongin tulokset kestävät vain, jos asiakas hoitaa ihoaan oikein myös kotona. Kotihoito-ohjelmassa on vähän vaiheita, mutta ne tehdään säännöllisesti:" },
        {
          ol: [
            "Mieto puhdistus.",
            "Ihotyypille sopiva kosteusvoide.",
            "Aurinkosuoja joka aamu.",
          ],
        },
        { img: { src: img("ke-hoach-cham-soc-da-tai-nha-ba-san-pham"), alt: "Kosmetologi näyttää valkoiseen kylpytakkiin pukeutuneelle asiakkaalle kolme nimetöntä ihonhoitotuotetta pienellä kivitarjottimella", caption: "Kolme vaihetta riittää alkuun. Älä myy asiakkaalle kymmentä tuotetta." } },
        { p: "Varaa sitten seuraava käynti, niin näette yhdessä, miten iho on muuttunut. Itse hoidon kulku kerrotaan [peruskasvohoitoa käsittelevässä artikkelissa](lesson:spa-facial-hieu-dung)." },
      ],
    },
    {
      id: "asiakastiedot",
      title: "Asiakastiedot pidetään luottamuksellisina",
      blocks: [
        { p: "Se, mitä asiakas kertoo allergioistaan, lääkityksestään ja terveydestään, on yksityisasia. Kirjaa se vain asiakkaan luvalla ja pidä se ehdottomasti salassa. VaraaAissa voit tallentaa ihotyypin, ihon kunnon ja esitietolomakkeen vastaukset asiakaskortin sisäisiin muistiinpanoihin [asiakasrekisterissä](lesson:khach-hang). Vain salonki näkee nämä muistiinpanot. Seuraavalla kerralla asiakasta hoitava tietää heti, millainen iho on, mitä on käytetty ja miten iho reagoi, jo ennen kuin asiakas saapuu [varatulle ajalle](lesson:lich-hen)." },
      ],
    },
  ],
  faq: [
    {
      q: "Montako ihotyyppiä on?",
      a: "Yleensä viisi: normaali, kuiva, rasvainen, sekaiho ja herkkä iho. Ihotyyppi on ihon perusluonne, melko pysyvä ja pitkälti perinnöllinen. Sen rinnalla puhutaan ihon kunnosta, kuten kuivumisesta tai tukkeutumisesta, joka muuttuu ajan myötä.",
    },
    {
      q: "Mikä ero on ihotyypillä ja ihon kunnolla?",
      a: "Ihotyyppi, esimerkiksi rasvainen tai kuiva, on melko pysyvä. Ihon kunto muuttuu vuodenajan, sään, käytettyjen tuotteiden, iän ja unen mukaan: kuivuminen, punoitus, tukkeutuminen, pigmentti ja ikääntymisen merkit. Iholla on yksi tyyppi, mutta siinä voi näkyä monta kuntoa yhtä aikaa.",
    },
    {
      q: "Voiko rasvainen iho olla kuivunut?",
      a: "Voi. Rasvan puute tarkoittaa kuivaa ihoa, kun taas kosteuden puute on ihon kunto, jota voi olla millä tahansa ihotyypillä. Rasvainen ja kuivunut iho kiristää usein, näyttää väsyneeltä ja siinä on hienoja juonteita, vaikka se kiiltää. Voimakas puhdistus kaiken rasvan poistamiseksi tekee siitä vain kuivemman ja kireämmän.",
    },
    {
      q: "Mikä on sekaiho?",
      a: "Sekaiho kiiltää T-alueella eli otsassa, nenässä ja leuassa, kun taas posket ovat normaalit tai kuivat. Ihoanalyysissä se on ihotyyppi, jossa kasvojen jokaista aluetta katsotaan erikseen.",
    },
    {
      q: "Voiko vahauksen tehdä isotretinoiinihoidon aikana?",
      a: "Ei voi. Isotretinoiini tekee ihosta hyvin hauraan, joten vahausta ei tehdä lääkityksen aikana eikä noin puoleen vuoteen sen lopettamisen jälkeen. Kerro kosmetologille, mitä lääkkeitä käytät, ja kysy lääkkeen määränneeltä lääkäriltä, jos olet epävarma.",
    },
    {
      q: "Voiko kosmetologi diagnosoida ihosairauksia?",
      a: "Ei. Kosmetologi ei tee diagnooseja. Jos hän näkee auringossa palaneen tai rikkinäisen ihon, huuliherpeksen, turvonneen, punaisen, kipeän tai märkivän alueen tai epätavallisen, väriä tai muotoa muuttavan luomen, hän jättää alueen hoitamatta, kuvailee mitä näkee ja ohjaa asiakkaan lääkäriin.",
    },
  ],
  related: ["spa-soi-da", "spa-facial-hieu-dung", "khi-nao-khong-lam", "di-ung-hoa-chat"],
};

export default article;
