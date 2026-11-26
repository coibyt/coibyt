import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/khi-nao-khong-lam/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "kauneudenhoidon-vasta-aiheet",
  lesson: "khi-nao-khong-lam",
  category: "safety",
  title: "Kauneudenhoidon vasta-aiheet: milloin kynsiä, ripsiä, hiuksia tai vahausta ei tehdä ja miten kieltäydyt",
  metaTitle: "Kauneudenhoidon vasta-aiheet: milloin hoito jätetään väliin",
  metaDescription:
    "Kauneudenhoidon vasta-aiheet: kynsien, silmien, hiuspohjan ja ihon merkit, joiden takia hoito keskeytetään, mitä kysyä etukäteen ja miten kieltäytyä kauniisti.",
  keyword: "kauneudenhoidon vasta-aiheet",
  keywords: [
    "kynsisieni ja geelilakka",
    "ripsienpidennykset ja silmätulehdus",
    "isotretinoiini ja vahaus",
    "diabeetikon jalkahoito",
    "miten kieltäytyä asiakkaan hoidosta",
    "ripsienpidennysten vasta-aiheet",
    "täit kampaamossa",
  ],
  excerpt: "Sen tietäminen, milloin hoitoa ei tehdä, on osa ammattitaitoa. Merkit, joiden takia asiakas ohjataan ensin lääkäriin, ja miten kieltäydyt loukkaamatta.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-lam-dep-xem-tay-khach-truoc-khi-lam"),
    alt: "Kermanväriseen paitaan pukeutunut kauneudenhoitaja istuu konsultaatiopöydän ääressä ja nostaa asiakkaan molemmat kädet katsoakseen niitä tarkasti ennen hoitoa",
  },
  takeaways: [
    "Tee ennen jokaista hoitoa kaksi asiaa: **katso** hyvässä valossa, kun iho ja kynnet ovat puhtaat, ja **kysy** muutama lyhyt kysymys allergioista, lääkkeistä, diabeteksesta ja tuoreista leikkauksista tai tulehduksista.",
    "**Kauneudenhoitaja ei tee diagnooseja.** Kerro, mitä näet, ohjaa lääkäriin tai apteekkiin ja jätä asia siihen.",
    "Värimuuttunut, paksu, mureneva tai irtoava kynsi; turvonnut, punoittava tai märkivä iho; punoittavat, rähmivät silmät; haavaumat tai täit hiuspohjassa; auringon polttama tai rikkinäinen iho: sitä aluetta ei käsitellä.",
    "Asiakasta, joka käyttää isotretinoiinia tai on lopettanut sen noin puolen vuoden sisällä, ei vahata.",
    "Jos epäröit, tehdäkö vai ei, vastaus on **älä tee**.",
  ],
  intro: [
    "Kauneudenhoidon vasta-aiheet ovat aihe, jota harvoin käydään läpi perusteellisesti, koska se sotii palvelualan ammattilaisen vaistoa vastaan. Asiakas on jo paikalla, salonki tarvitsee varauksen, ja lause ”olen pahoillani, en voi tehdä tätä sinulle tänään” on vaikea sanoa. Tumma lakka vihertävän kynnen päällä ei kuitenkaan paranna mitään. Se vain peittää ongelman, kunnes se pahenee, ja sitten asiakas palaa ja syyttää salonkia.",
    "Artikkeli perustuu VaraaAi Academyn Hygienia ja turvallisuus -kurssin oppituntiin ”Milloin asiakasta ei hoideta”. Opit, mitä katsoa ja kysyä ennen jokaista hoitoa, mitkä kynsien, silmien, hiuspohjan ja ihon merkit tarkoittavat, että hoito keskeytetään, miten kieltäydyt asiakkaan arvokkuutta kunnioittaen ja milloin tekijän itsensä ei pidä tehdä töitä. Artikkeli ei korvaa lääkärin ohjeita.",
  ],
  sections: [
    {
      id: "katso-ja-kysy",
      title: "Mitä katsotaan ja kysytään ennen jokaista hoitoa",
      blocks: [
        { p: "Tarkistus tehdään ennen kuin otat välineen käteen. Katso hyvässä valossa, kun iho ja kynnet ovat vielä puhtaat, ilman lakkaa ja ilman mitään tuotetta. Vanha lakka tai meikkivoide peittää juuri sen, mitä sinun pitää nähdä." },
        { p: "Kysy sitten muutama lyhyt kysymys ja kirjaa vastaukset asiakaskorttiin:" },
        {
          ul: [
            "Onko sinulla allergioita?",
            "Käytätkö lääkkeitä tai saatko hoitoa ihoon tai silmiin?",
            "Onko sinulla diabetes?",
            "Onko sinulle äskettäin tehty leikkaus tai onko sinulla ollut tulehdusta?",
          ],
        },
        { img: { src: img("hoi-khach-va-ghi-phieu-tu-van"), alt: "Kauneudenhoitaja kirjoittaa pieneen korttiin kivipöydällä ja keskustelee samalla vastapäätä istuvan vaaleahiuksisen asiakkaan kanssa", caption: "Muutama lyhyt kysymys ennen hoitoa, vastaukset asiakaskorttiin." } },
        { note: "Kysy myös vakioasiakkailta uudelleen. Terveys muuttuu ajan myötä: joka ei viime vuonna käyttänyt lääkkeitä, voi tänä vuonna olla hoidossa.", kind: "tip", title: "Älä ohita vakioasiakkaita" },
      ],
    },
    {
      id: "ei-diagnooseja",
      title: "Kauneudenhoitaja ei tee diagnooseja: kerro, mitä näet",
      blocks: [
        { p: "Kauneudenhoitaja ei ole lääkäri eikä nimeä sairauksia. Älä koskaan sano ”sinulla on kynsisieni”. Kerro, mitä näet: ”Huomaan, että tämän kynnen väri on muuttunut ja kynsi on paksuuntunut. Lääkärin tai farmaseutin olisi hyvä katsoa se ensin.”" },
        { p: "Syy on käytännöllinen: pelkällä silmällä kukaan ei voi olla varma. Paksu, kellertävä kynsi voi johtua sienestä, psoriaasista tai yksinkertaisesti vuosien ahtaista kengistä. Osa näistä tarttuu, osa ei. Niiden erottaminen on terveydenhuollon ammattilaisen työ. Meidän työmme on huomata, että jokin ei ole normaalia, ja pysähtyä oikealla hetkellä." },
        { p: "Väärin nimetty sairaus voi myös loukata tai pelästyttää asiakasta turhaan. Havainnon kuvaaminen pitää aina paikkansa, eikä siitä ole yhtä helppo loukkaantua." },
      ],
    },
    {
      id: "kynsien-merkit",
      title: "Kynsien vasta-aiheet: milloin geelilakkausta tai kynsihoitoa ei tehdä",
      blocks: [
        { p: "Jos näet jonkin näistä merkeistä, älä käsittele sitä kynttä tai ihoaluetta:" },
        {
          ul: [
            "Vihertävä, keltainen tai ruskea värimuutos.",
            "Paksuuntunut, hauras, mureneva kynsi.",
            "Kynsilevy irtoaa kynsipedistä.",
            "Kynsivalli on turvonnut, punoittava, kipeä tai märkivä.",
            "Syylät.",
            "Avohaavat.",
          ],
        },
        { img: { src: img("mong-tay-nga-xanh-khong-nen-son-gel"), alt: "Lähikuva sormenpäästä, jota mustaan käsineeseen puettu käsi tukee alta, ja luonnonkynnessä on vihertävänkeltainen värimuutos", caption: "Näin värimuuttunutta kynttä ei peitetä lakalla. Asiakasta neuvotaan näyttämään se lääkärille tai farmaseutille." } },
        { img: { src: img("da-quanh-mong-sung-do"), alt: "Lähikuva kermanvalkoisella pyyhkeellä lepäävästä sormenpäästä, jossa kynnen sivun ja tyven iho on hieman turvonnut, punertava ja viereistä sormea kiiltävämpi" } },
        { p: "Muut kynnet voi tehdä, jos ne ovat terveet. Sinä päivänä käytetyt välineet on käsiteltävä erityisen huolellisesti, koska muuten ne kuljettavat taudinaiheuttajia seuraavalle asiakkaalle. Työvaiheet ovat oppitunnilla [Välineet jokaisen asiakkaan jälkeen: työvaiheet](lesson:ve-sinh-dung-cu)." },
        { h3: "Diabetesta sairastavan asiakkaan jalat" },
        { p: "Tässä tarvitaan erityistä varovaisuutta. Diabeetikon jalkojen tunto voi olla heikentynyt, joten asiakas ei välttämättä huomaa liian kuumaa vettä tai pientä haavaa, ja haavat paranevat hyvin hitaasti." },
        {
          ul: [
            "Vain haaleaa vettä, ei pitkää liotusta.",
            "Ei teriä, ei ihon leikkaamista.",
            "Jos jalassa on haavauma tai haava, sitä ei hoideta. Ohjaa asiakas lääkärille tai jalkaterapeutille.",
          ],
        },
        { img: { src: img("kiem-tra-ban-chan-truoc-khi-lam-mong-chan"), alt: "Mustiin käsineisiin pukeutunut jalkahoitaja istuu matalalla jakkaralla ja nostaa asiakkaan paljaan jalan katsoakseen jalkapohjaa ennen hoitoa", caption: "Katso jalkapohja ja varpaiden välit ennen kuin jalka menee jalkakylpyyn." } },
      ],
    },
    {
      id: "silmat-hiuspohja-iho",
      title: "Silmät, hiuspohja ja iho: milloin ripsiä, hiuksia tai vahausta ei tehdä",
      blocks: [
        { h3: "Ripset ja kulmat" },
        {
          ul: [
            "Silmät punoittavat, kutisevat, vuotavat tai rähmivät.",
            "Näärännäppy tai luomien reunat ovat turvonneet, punoittavat tai karstaiset.",
            "Ripsien tyvessä on pieniä pisteitä ja ripset kutisevat voimakkaasti.",
            "Silmäleikkauksen tai silmätulehduksen jälkeen: odota, kunnes lääkäri antaa luvan.",
            "Asiakas on reagoinut ripsiliimaan tai ripsiväriin: samaa tuotetta ei käytetä uudelleen.",
          ],
        },
        { img: { src: img("mat-do-co-leo-khong-noi-mi"), alt: "Lähikuva naisen kasvoista, toinen silmä punoittaa ja vuotaa hieman, yläluomi on turvonnut ja vaaleanpunainen ja ripsirajassa on pieni kyhmy" } },
        { p: "Liima- ja värireaktioista kerrotaan tarkemmin oppitunnilla [Allergiat ja kemikaalit](lesson:di-ung-hoa-chat)." },
        { h3: "Hiukset ja hiuspohja" },
        {
          ul: [
            "Täit ja hiuksiin tarttuneet saivarit.",
            "Haavaumat tai avohaavat hiuspohjassa.",
            "Pyöreät, punaiset, hilseilevät läiskät.",
            "Runsas tai läiskittäinen hiustenlähtö ilman selvää syytä.",
          ],
        },
        { p: "Jos löydät täitä, älä hätäänny äläkä sano sitä ääneen. Keskeytä, kerro asiakkaalle kahden kesken ja ehdota käyntiä apteekissa. Pese sitten pyyhkeet ja puhdista ja desinfioi kammat, sakset ja kampausviitta huolellisesti." },
        { img: { src: img("kiem-tra-da-dau-truoc-khi-lam-toc"), alt: "Mustaan esiliinaan ja käsineisiin pukeutunut kampaaja jakaa selin istuvan asiakkaan hiuksia kamman varrella ja tutkii hiuspohjaa", caption: "Katso hiuspohja, kun hiukset ovat vielä kuivat, ennen pesua tai värin sekoittamista." } },
        { h3: "Iho, spa ja vahaus" },
        {
          ul: [
            "Auringon polttama iho.",
            "Rikkinäinen tai tulehtunut iho.",
            "Huuliherpes.",
            "Ihottumat, jotka voivat tarttua.",
          ],
        },
        { p: "Ennen vahausta on yksi kysymys, joka kysytään aina: käyttääkö asiakas aknelääkettä tai retinoidivoidetta? Aknelääke isotretinoiini ohentaa ja haurastuttaa ihoa, ja vaha voi irrottaa ihon pintakerroksen. Jos asiakas käyttää sitä tai on lopettanut sen noin puolen vuoden sisällä, älä vahaa. Voit ehdottaa hellävaraisempaa tapaa, kuten nyppimistä, jos se sopii. Voiteiden kohdalla noudatetaan vahan valmistajan ohjetta ja lääkkeen määränneen lääkärin neuvoja." },
        { img: { src: img("hoi-ve-kem-retinoid-truoc-khi-wax"), alt: "Kermanvaaleaan kylpytakkiin pukeutunut asiakas istuu hoitosängyn reunalla ja ojentaa valkoisen voideputken hoitajalle katsottavaksi ennen vahausta" } },
      ],
    },
    {
      id: "miten-kieltaytya",
      title: "Miten kieltäydyt hoidosta ystävällisesti ja asiakasta loukkaamatta",
      blocks: [
        { p: "Sanat ovat tämän oppitunnin vaikein osa. Asiakas muistaa asenteesi sen puolen minuutin ajalta pitkään." },
        {
          table: {
            head: ["Tee näin", "Vältä"],
            rows: [
              ["Puhu kahden kesken ja hiljaa, muiden asiakkaiden kuulematta", "Selittämistä kuuluvasti koko salongille"],
              ["Puhu asiakkaan turvallisuudesta", "Omista peloistasi puhumista"],
              ["Tarjoa vaihtoehto: muut kynnet, toinen palvelu tai uusi aika, kun lääkäri on antanut luvan", "Kieltäytymistä niin, että asiakas lähtee tyhjin käsin"],
              ["Pidä ilmeesi ja etäisyytesi tavallisina", "Inhon näyttämistä, perääntymistä ja lisäkäsineiden pukemista"],
            ],
          },
        },
        { img: { src: img("tu-choi-khach-noi-rieng-noi-nho"), alt: "Kauneudenhoitaja istuu asiakkaan vieressä salongin rauhallisessa nurkassa, kumartuu puhumaan hiljaa ja pitää kättään kevyesti asiakkaan käsivarrella", caption: "Rauhallinen nurkka, hiljainen ääni ja tarjous uudesta ajasta." } },
        { note: "Lause, joka toimii aina: ”Haluan, että lopputulos on kaunis ja turvallinen, joten tätä kohtaa en tee tänään.”", kind: "tip", title: "Valmis lause" },
        { p: "Jotkut asiakkaat pyytävät: ”Ei se haittaa, tee vain, minä otan vastuun.” Et silti tee. Lupaus ei saa punoittavaa silmää paranemaan eikä haavaa umpeutumaan. Sano lempeästi uudelleen: ”Kieltäydyn, koska välitän sinusta.”" },
        { p: "Oikealla hetkellä kieltäytyminen ei vie asiakkaita. Ihmiset, joille kerrotaan totuus ja joiden annetaan säilyttää arvokkuutensa, tulevat yleensä takaisin ja luottavat sinuun entistä enemmän. Yhden ajan menettäminen tänään on parempi kuin koko salongin maineen menettäminen." },
      ],
    },
    {
      id: "kirjaa-ja-varaa-uusi-aika",
      title: "Kirjaa tapahtunut ja varaa uusi aika",
      blocks: [
        { p: "Kun olet kieltäytynyt, kirjaa asiakastietoihin kolme asiaa: päivämäärä, mitä näit ja mitä neuvoit. Kirjaa vain havainnot, älä sairauden nimeä. Kyse on terveystiedosta, joten kirjaa se vain asiakkaan suostumuksella ja pidä se ehdottoman luottamuksellisena." },
        { p: "VaraaAissa paikka merkinnälle on asiakasprofiilin sisäiset muistiinpanot, jotka näkyvät vain salongille; katso oppitunti [Asiakasrekisteri](lesson:khach-hang). Varaa asiakkaalle myös uusi aika saman tien [kalenterista](lesson:lich-hen), jotta hän näkee, ettei häntä käännytetty pois lopullisesti vaan aika siirtyi turvallisempaan päivään." },
      ],
    },
    {
      id: "kun-tekija-ei-voi-tehda-toita",
      title: "Kun tekijän itsensä ei pidä tehdä töitä",
      blocks: [
        { p: "Pysähtymisen sääntö toimii molempiin suuntiin. Myös tekijä voi olla tartunnan lähde." },
        {
          table: {
            head: ["Tekijän tilanne", "Mitä teet"],
            rows: [
              ["Pieni, puhdas haava kädessä", "Vedenpitävä laastari ja käsineet"],
              ["Turvonnut, punoittava tai märkivä haava kädessä", "Älä koske asiakkaisiin ja käy lääkärissä"],
              ["Kuume, ripuli, oksentelu, silmätulehdus tai muu tarttuva tauti", "Jää kotiin"],
            ],
          },
        },
        { img: { src: img("tho-dan-bang-kin-nuoc-len-vet-xuoc-o-tay"), alt: "Kermanväriseen paitaan pukeutunut kauneudenhoitaja kiinnittää laastarin omaan sormenpäähänsä, vieressä laatikko mustia nitriilikäsineitä" } },
        { p: "Salongin omistajan kannattaa sanoa henkilökunnalle selvästi, että sairaana kotiin jääminen ei ole virhe. Sairaana työskentelevä voi tartuttaa monta asiakasta yhden päivän aikana. Käsineiden oikeasta käytöstä ja vaihdosta kerrotaan oppitunnilla [Käsihygienia, käsineet ja suojaimet](lesson:rua-tay-gang-tay)." },
        { note: "Määräykset siitä, milloin hoidosta on kieltäydyttävä, vaihtelevat maittain. Tämä artikkeli ei korvaa lääkärin ohjeita.", kind: "warn", title: "Huomaa" },
      ],
    },
  ],
  faq: [
    {
      q: "Voiko kynsisienen päälle laittaa geelilakkaa?",
      a: "Kynsiteknikko ei voi päätellä, onko kynnessä sieni, koska pelkällä silmällä kukaan ei voi olla varma. Vihertävää, keltaista tai ruskeaa, paksuuntunutta, murenevaa tai kynsipedistä irtoavaa kynttä ei kuitenkaan pidä geelilakata. Lakka ei paranna mitään, vaan peittää ongelman, kunnes se pahenee. Näytä kynsi ensin lääkärille tai farmaseutille.",
    },
    {
      q: "Voiko ripsienpidennykset laittaa, jos on silmätulehdus tai näärännäppy?",
      a: "Ei. Punoittavat, kutisevat, vuotavat tai rähmivät silmät, näärännäppy sekä turvonneet, punoittavat tai karstaiset luomien reunat ovat kaikki syitä keskeyttää. Silmätulehduksen tai silmäleikkauksen jälkeen odotetaan lääkärin lupaa ennen ripsienpidennyksiä.",
    },
    {
      q: "Voiko vahauksen tehdä isotretinoiinihoidon aikana?",
      a: "Ei. Isotretinoiini ohentaa ja haurastuttaa ihoa, ja vaha voi irrottaa ihon pintakerroksen. Vahausta ei tehdä hoidon aikana eikä noin puoleen vuoteen hoidon lopettamisesta. Retinoidivoiteiden kohdalla noudatetaan vahan valmistajan ja lääkkeen määränneen lääkärin ohjeita.",
    },
    {
      q: "Voiko diabeetikko käydä jalkahoidossa kauneushoitolassa?",
      a: "Voi, jos jalassa ei ole haavaumaa eikä haavaa, mutta hoito vaatii erityistä varovaisuutta: vain haaleaa vettä, ei pitkää liotusta, ei teriä eikä ihon leikkaamista. Diabeetikon jalkojen tunto voi olla heikentynyt, ja pienetkin haavat paranevat hitaasti. Jos jalassa on haavauma tai haava, asiakas ohjataan lääkärille tai jalkaterapeutille.",
    },
    {
      q: "Mitä kampaaja tekee, jos asiakkaalla on täitä?",
      a: "Keskeyttää hoidon hätääntymättä ja sanomatta asiaa ääneen. Kertoo asiakkaalle kahden kesken ja ehdottaa käyntiä apteekissa. Sen jälkeen pyyhkeet pestään ja kammat, sakset ja kampausviitta puhdistetaan ja desinfioidaan huolellisesti ennen seuraavaa asiakasta.",
    },
    {
      q: "Pitääkö hoito tehdä, jos asiakas sanoo ottavansa vastuun?",
      a: "Ei. Lupaus vastuusta ei saa punoittavaa silmää paranemaan eikä haavaa umpeutumaan. Toista ystävällisesti, että kieltäydyt asiakkaan turvallisuuden vuoksi, ja tarjoa vaihtoehto: terveiden alueiden käsittely, toinen palvelu tai uusi aika.",
    },
  ],
  related: ["di-ung-hoa-chat", "xu-ly-su-co", "ve-sinh-dung-cu", "rua-tay-gang-tay"],
};

export default article;
