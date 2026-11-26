import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/di-ung-hoa-chat/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "akrylaattiallergia-ripsiliima-ja-hiusvarit",
  lesson: "di-ung-hoa-chat",
  category: "safety",
  title: "Akrylaattiallergia, ripsiliima ja hiusvärit: oireet ja viisi sääntöä allergian ehkäisyyn",
  metaTitle: "Akrylaattiallergia ja hiusväriallergia: oireet ja ehkäisy",
  metaDescription:
    "Akrylaattiallergia, ripsiliima- ja hiusväriallergia: ärsytyksen ja allergian ero, miksi oireet tulevat viiveellä, yleisimmät aiheuttajat ja viisi ehkäisysääntöä.",
  keyword: "akrylaattiallergia",
  keywords: [
    "geelilakka allergia",
    "ripsiliima allergia",
    "hiusväriallergia",
    "ärsytys vai allergia",
    "HEMA geelilakassa",
    "TPO kielletty EU",
    "allergiatesti ennen värjäystä",
  ],
  excerpt: "Kynsi-, ripsi- ja hiusalan allergiat tulevat viiveellä, varoittamatta ja jäävät yleensä pysyviksi. Suurin osa niistä on ehkäistävissä viidellä pienellä tavalla.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-lam-dep-xem-chai-hoa-chat-trong-salon"),
    alt: "Tummahiuksinen, matalalle nutturalle hiuksensa kiinnittänyt kauneudenhoitaja mustissa nitriilikäsineissä nostaa pienen lasipullon silmiensä tasolle ja tutkii sitä",
  },
  takeaways: [
    "**Ärsytys** on suora ihovaurio, joka paranee, kun altistus loppuu. **Allergiassa** immuunijärjestelmä on oppinut tunnistamaan aineen, ja allergia on yleensä elinikäinen.",
    "Allerginen reaktio tulee usein 1–3 päivän viiveellä ja voi näkyä silmäluomissa, kasvoissa tai kaulalla, ei vain siinä, mihin tuote koski.",
    "Geeli- ja akryylitöissä riski on **kovettumattomassa tuotteessa** ja vajaasti kovettuneen geelin viilauspölyssä. Pidä ne poissa iholta.",
    "Asiakasta, joka on joskus reagoinut hiusväriin tai mustaan hennatatuointiin, ei värjätä: ei hiusväriä, ei ripsi- eikä kulmaväriä.",
    "Hengitysvaikeus, huulten tai kasvojen turvotus tai huimaus: soita heti hätänumeroon 112.",
  ],
  intro: [
    "Akrylaattiallergia alkaa yleensä huomaamatta: sormenpäät kutiavat ja niissä on muutama pieni rakkula, jonka kynsiteknikko luulee johtuvan jatkuvasta käsienpesusta. Muutaman kuukauden päästä silmäluomet punoittavat ja turpoavat, vaikka geeliä ei ole koskaan joutunut silmiin. Lääkärissä selviää, että elimistö on herkistynyt geelille, ja siitä lähtien pienikin kosketus kovettumattomaan geeliin tuo oireet takaisin. Moni taitava tekijä on joutunut jättämään alan tämän takia.",
    "Artikkeli perustuu VaraaAi Academyn Hygienia ja turvallisuus -kurssin oppituntiin ”Allergiat ja kemikaalit: geeli, akryyli, ripsiliima, värit”. Opit erottamaan ärsytyksen allergiasta, tiedät mitkä kynsi-, ripsi- ja hiusalan aineet aiheuttavat allergiaa useimmin, saat viisi ehkäisysääntöä ja tiedät, mitä tehdä, kun asiakas tai sinä itse saat reaktion. Artikkeli ei korvaa lääkärin ohjeita.",
  ],
  sections: [
    {
      id: "arsytys-vai-allergia",
      title: "Ärsytys vai allergia: mikä ero",
      blocks: [
        { p: "Sanoja käytetään usein sekaisin, mutta kyse on kahdesta eri asiasta, ja niihin myös suhtaudutaan eri tavalla." },
        {
          table: {
            head: ["", "Ärsytys", "Allergia"],
            rows: [
              ["Mitä se on", "Veden, saippuan tai asetonin aiheuttama suora ihovaurio", "Immuunijärjestelmä on painanut aineen mieleensä ja pitää sitä vihollisena"],
              ["Miltä se näyttää", "Kuiva, punoittava ja halkeileva iho altistuskohdassa", "Kutinaa, punoitusta, rakkuloita ja turvotusta jo hyvin pienestä määrästä"],
              ["Miten se kehittyy", "Paranee, kun altistus loppuu ja ihoa hoidetaan", "Yleensä elinikäinen. Ainetta on vältettävä kokonaan"],
            ],
          },
        },
        { p: "Nämä kaksi liittyvät toisiinsa. Ärsytyksen rikkomasta ihosta kemikaalit pääsevät helpommin läpi, joten käsien ihon kunnossa pitäminen on osa allergian ehkäisyä. Ihonhoidosta ja käsineiden valinnasta kerrotaan oppitunnilla [Käsihygienia, käsineet ja suojaimet](lesson:rua-tay-gang-tay)." },
      ],
    },
    {
      id: "miksi-allergia-tulee-viiveella",
      title: "Miksi vuosien geelitöiden jälkeenkin voi herkistyä",
      blocks: [
        { p: "Allergia ei varoita etukäteen. Geelitöitä voi tehdä viisi vuotta ilman mitään ongelmia. Mutta joka kerta, kun kovettumaton tuote koskee ihoa, elimistö kirjaa vähän lisää, ja eräänä päivänä raja ylittyy. Ajatus ”olen tehnyt tätä vuosia eikä mitään ole sattunut” ei siis todista mitään turvallisuudesta." },
        { p: "Reaktio tulee usein myös viiveellä, yhdestä kolmeen päivää altistuksen jälkeen, joten moni ei yhdistä sitä syyhynsä. Se voi näkyä aivan muualla kuin altistuskohdassa: silmäluomissa, kasvoissa tai kaulalla. Tuotteen tahrimat kädet koskettavat niitä, ja pöly ja höyryt kulkeutuvat sinne." },
        { img: { src: img("di-ung-gel-sung-do-mi-mat"), alt: "Lähikuva meikittömän naisen kasvoista, molemmat yläluomet hieman turvoksissa, punertavat ja kevyesti hilseilevät", caption: "Punoittavat ja turvonneet silmäluomet voivat olla merkki kynsituoteallergiasta, vaikka tuote ei olisi koskaan koskenut silmiin." } },
        { note: "Kynsiteknikko, joka on tehnyt geelitöitä vuosia ja jonka sormenpäissä on nyt kutinaa ja rakkuloita, ei voi päätellä, ettei se voi olla allergiaa niin pitkän ajan jälkeen. Juuri tältä tyypillinen ammattiallergia näyttää, ja oikea ratkaisu on hakeutua ajoissa ihotautilääkärille.", kind: "info", title: "Oppitunnin testin esimerkki" },
      ],
    },
    {
      id: "yleisimmat-allergeenit",
      title: "Mitkä aineet aiheuttavat allergiaa kynsi-, ripsi- ja hiusalalla",
      blocks: [
        {
          table: {
            head: ["Ala", "Yleinen allergeeni", "Missä sitä on"],
            rows: [
              ["Kynnet", "Akrylaatit", "Geelilakka, rakennegeeli, akryylineste, kynsiliima"],
              ["Ripsienpidennykset", "Syanoakrylaatti", "Ripsiliima, myös herkille tarkoitettu"],
              ["Hius-, ripsi- ja kulmavärit", "Väriaine PPD ja sen sukulaisaineet", "Värit; mustassa hennassa on usein samaa ainetta"],
              ["Vaalennus", "Vaalennusjauheen hieno pöly", "Vaalennusjauhe annostellessa ja sekoittaessa"],
            ],
          },
        },
        { h3: "Kynnet: riski on kovettumattomassa tuotteessa" },
        { p: "Akrylaatit herkistävät voimakkaasti, kun ne ovat nestemäisiä ja kovettumattomia. Kunnolla kovettuneina ne ovat lähes vaarattomia. Varottavaa on siis iholle joutunut geeli ennen kovetusta, pullonsuuhun ja siveltimen varteen jäänyt geeli sekä vajaasti kovettuneen kerroksen viilauspöly." },
        { h3: "Ripset: liiman höyry" },
        { p: "Ripsiliima on syanoakrylaattia, samaa sukua kuin pikaliima. Sen höyry kirvelee silmiä, saa nenän vuotamaan ja voi aiheuttaa allergiaa asiakkaalle. Riski koskee myös ripsiteknikkoa, joka kumartuu liimapisaran ylle tuntikausia joka päivä." },
        { img: { src: img("giot-keo-noi-mi-tren-da-ngoc"), alt: "Mustaan käsineeseen puettu käsi kastaa pinseteillä pidennysripsen mustaan liimapisaraan jadekivellä, taustalla asiakas makaa silmät kiinni", caption: "Liimapisara on lähellä ripsiteknikon kasvoja koko hoidon ajan." } },
        { h3: "Värit ja vaalennus" },
        { p: "PPD-allergia voi olla hyvin vakava, niin että koko kasvot turpoavat. Ennen jokaista värjäystä kannattaa kysyä yksi kysymys: onko asiakkaalla koskaan ollut mustaa hennatatuointia, esimerkiksi lomalla tehtyä? Mustaan hennaan sekoitetaan usein juuri tätä ainetta, joten siihen reagoineella on vakavan reaktion riski hiusvärin kanssa." },
        { p: "Vaalennusjauhe nousee ilmaan hienona pölynä. Pitkään hengitettynä se voi saada kampaajan aivastelemaan ja hengityksen vinkumaan ja jopa aiheuttaa astman. Muita allergian aiheuttajia salongissa ovat hajusteet ja lateksikäsineet." },
        { img: { src: img("bot-tay-toc-bay-bui-min-khi-pha"), alt: "Käsineinen käsi kaataa lusikallisen vaaleansinistä vaalennusjauhetta sekoituskulhoon, ja hienoa pölyä nousee ilmaan" } },
      ],
    },
    {
      id: "viisi-saantoa",
      title: "Viisi sääntöä geeli-, akryyli- ja liima-allergian ehkäisyyn",
      blocks: [
        { p: "Ammattiallergia ei ole huonoa onnea. Suurin osa siitä voidaan ehkäistä pienillä tavoilla, joita toistetaan joka päivä." },
        { h3: "1. Kovettumaton tuote ei koske ihoon" },
        { p: "Jätä lakatessa pieni rako ihoon. Jos tuotetta joutuu iholle, poista se ennen kuin käsi menee lamppuun. Pyyhi pullonsuut, siveltimien varret ja pöytä, koska niihin kätesi koskevat koko päivän. Tekniikka näytetään vaihe vaiheelta artikkelissa [Geelilakkaus vaihe vaiheelta](lesson:son-gel)." },
        { img: { src: img("gat-gel-dinh-da-bang-que-go-truoc-khi-ho"), alt: "Mustiin käsineisiin pukeutunut kynsiteknikko poistaa puutikun viistolla kärjellä punaisen geelijuovan juuri lakatun kynnen vierestä iholta ennen kovetusta" } },
        { h3: "2. Koveta kunnolla" },
        { p: "Käytä geelimerkin edellyttämää lamppua, koveta koko aika ja levitä ohuet kerrokset. Paksu tai vajaasti kovetettu kerros jää sisältä osittain nestemäiseksi, ja juuri se osa herkistää." },
        { h3: "3. Nitriilikäsineet, usein vaihdettuina" },
        { p: "Käsineet suojaavat käsiäsi, mutta kemikaalit läpäisevät ne ajan myötä. Siksi käsine, jossa on tuotetta, vaihdetaan eikä sitä pyyhitä ja käytetä edelleen." },
        { h3: "4. Pidä ilma puhtaana" },
        { p: "Kytke pöydän kohdepoisto päälle, kun viilaat tai jyrsit. Pidä ilmanvaihto käynnissä. Sulje pullo heti käytön jälkeen ja käytä kannellista roska-astiaa. Helsingin kaupungin ohje edellyttää, että akryylikynsien työpisteessä on riittävän tehokas kohdepoisto. Koko liikkeen ilmanvaihdosta kerrotaan oppitunnilla [Liikkeen päivittäinen siivous ja omavalvontasuunnitelma](lesson:ve-sinh-tiem)." },
        { img: { src: img("day-nap-chai-va-thung-rac-co-nap"), alt: "Käsineinen käsi kiertää korkkia pieneen lasipulloon, vieressä kolme suljettua purkkia ja kannellinen roska-astia" } },
        { h3: "5. Tiedä, mitä käytät" },
        { p: "Osta tuotteet eurooppalaisilta toimittajilta, ja vain sellaisia, joissa on etiketti ja ainesosaluettelo. Pyydä toimittajalta jokaisen tuotteen käyttöturvallisuustiedote: siitä näet, mitä käsineitä tarvitaan ja miten annetaan ensiapu." },
        { img: { src: img("doc-nhan-thanh-phan-chai-gel"), alt: "Nuori kynsiteknikko kermanvärisessä paidassa seisoo geelilakkahyllyn edessä ja lukee pienen pullon etikettiä läheltä" } },
        { note: "Euroopan unionissa HEMAa sisältävien kynsituotteiden etiketissä on oltava merkinnät ”Vain ammattikäyttöön” ja ”Voi aiheuttaa allergisen reaktion”. TPO on ollut kynsituotteissa kielletty 1.9.2025 alkaen, eikä salonki saa käyttää sitä enää, ei edes aiemmin ostettua varastoa. Kemikaalimääräykset vaihtelevat maittain, joten tarkista ne siellä, missä työskentelet.", kind: "warn", title: "HEMA ja TPO Euroopassa" },
      ],
    },
    {
      id: "allergiatesti",
      title: "Allergiatesti ennen hiusten, ripsien ja kulmien värjäystä",
      blocks: [
        { p: "Hius-, ripsi- ja kulmaväreissä moni valmistaja edellyttää ihotestiä etukäteen, tyypillisesti 48 tuntia ennen käsittelyä. Noudata tuotteen ohjetta tarkasti ja kirjaa testipäivä ylös." },
        { img: { src: img("thu-phan-ung-thuoc-nhuom-sau-tai"), alt: "Käsineinen käsi painaa vanupuikolla pienen täplän väriä korkealle nutturalle hiuksensa kiinnittäneen asiakkaan korvan taakse" } },
        {
          ul: [
            "Puhdas testitulos ei takaa turvallisuutta pysyvästi. Allergia voi ilmetä myöhemmällä käyntikerralla.",
            "Asiakasta, joka on joskus reagoinut väriin tai mustaan hennaan, ei värjätä, ja häntä neuvotaan kysymään lääkäriltä. Lyhyempi vaikutusaika ei tee värjäyksestä turvallista.",
            "EU:ssa monien hiusvärien ja ripsivärien etiketissä on oltava varoitus vakavista allergisista reaktioista ja siitä, ettei tuotetta ole tarkoitettu alle 16-vuotiaille. Lue etiketti ennen kuin otat uuden tuotteen käyttöön.",
          ],
        },
      ],
    },
    {
      id: "asiakas-saa-reaktion",
      title: "Mitä tehdä, kun asiakas saa reaktion kesken hoidon",
      blocks: [
        { p: "Seuraa kutinaa, kirvelyä, punoitusta ja turvotusta hoidettavalla alueella. Kun asiakas kertoo niistä, älä yritä saada työtä valmiiksi." },
        {
          ol: [
            "Lopeta heti.",
            "Poista tuote iholta hyvin varovasti.",
            "Huuhtele runsaalla vedellä. Jos tuotetta on joutunut silmiin, huuhtele silmiä puhtaalla vedellä useita minuutteja.",
            "Neuvo asiakasta käymään lääkärissä ja anna hänelle tuotteen nimi ja ainesosaluettelo, jotta lääkäri tietää, mitä käytettiin.",
            "Kirjaa tapahtuma: päivämäärä, tuote, eränumero ja miten toimit.",
          ],
        },
        { img: { src: img("rua-sach-thuoc-nhuom-bang-nhieu-nuoc"), alt: "Mustaan esiliinaan ja käsineisiin pukeutunut kampaaja huuhtelee suihkulla huolellisesti pesualtaaseen nojaavan asiakkaan hiukset ja hiuspohjan", caption: "Kun asiakas tuntee värjäyksen aikana kirvelyä tai kutinaa, väri huuhdellaan pois runsaalla vedellä." } },
        { note: "Hengitysvaikeus, huulten tai kasvojen turvotus ja pyörrytys ovat vakavan reaktion merkkejä. Lopeta ja soita heti hätänumeroon. Älä anna asiakkaalle vettä ja jää odottamaan. Yleinen hätänumero Suomessa ja koko Euroopan unionissa on 112.", kind: "warn", title: "Milloin soitetaan hätänumeroon" },
        { p: "Muista salongin vahinkotilanteista, kuten verenvuodosta tai kemikaalin joutumisesta silmään, kerrotaan oppitunnilla [Vahinkotilanteet: verenvuoto, allergiset reaktiot, palovammat](lesson:xu-ly-su-co)." },
      ],
    },
    {
      id: "jos-allergia-on-sinulla",
      title: "Jos allergia on sinulla itselläsi",
      blocks: [
        { p: "Älä salaa oireita äläkä hoida niitä itse ja jatka töitä. Hakeudu ajoissa ihotautilääkärille. Epikutaanitestillä eli lapputestillä voidaan selvittää juuri se aine, jolle olet allerginen. Kun syy selviää ajoissa ja työtavat muuttuvat ajoissa, moni pystyy jatkamaan alalla." },
        { img: { src: img("tho-nail-di-kham-bac-si-da-lieu"), alt: "Valkotakkinen ihotautilääkäri tutkii nuoren kauneudenhoitajan kättä suurennuslampun alla valoisalla vastaanotolla" } },
        { h3: "Pidä kirjaa asiakkaan suostumuksella" },
        { p: "Kun tiedot on kirjattu, kenenkään ei tarvitse muistaa ulkoa, kuka on allerginen mille. Kirjaa jokaisesta asiakkaasta tiedossa olevat allergiat, testipäivät ja käytetyt tuotteet. VaraaAissa paikka näille tiedoille on asiakasprofiilin sisäiset muistiinpanot, jotka näkyvät vain salongille. [Asiakasrekisteristä](lesson:khach-hang) on oma oppituntinsa." },
        { p: "Tuotteiden nimet ja merkit löytyvät myös helpommin, kun liikkeen tarvikkeet kirjataan [varastoon](lesson:kho-hang) heti toimituksen saavuttua." },
      ],
    },
  ],
  faq: [
    {
      q: "Mitkä ovat geeliallergian oireet?",
      a: "Yleensä kutinaa, punoitusta, pieniä rakkuloita tai turvotusta sormenpäissä ja kynsien ympärillä, tyypillisesti 1–3 päivää altistuksen jälkeen. Reaktio voi näkyä myös silmäluomissa, kasvoissa tai kaulalla. Jos huomaat näitä oireita, lopeta altistus geelille ja hakeudu ihotautilääkärille.",
    },
    {
      q: "Paraneeko akrylaattiallergia?",
      a: "Kun elimistö on kerran herkistynyt aineelle, allergia on yleensä elinikäinen, ja siitä lähtien jo hyvin pieni määrä aiheuttaa reaktion. Ainoa keino on välttää ainetta kokonaan. Ihotautilääkäri voi selvittää epikutaanitestillä, mikä aine on kyseessä.",
    },
    {
      q: "Voiko geelille herkistyä, vaikka on tehnyt geelikynsiä vuosia ilman ongelmia?",
      a: "Voi. Allergia ei varoita: joka kerta, kun kovettumaton tuote koskee ihoa, elimistö kirjaa vähän lisää, kunnes raja eräänä päivänä ylittyy. Siksi kovettumattoman geelin pitäminen poissa iholta koskee kokeneita tekijöitä yhtä lailla kuin aloittelijoita.",
    },
    {
      q: "Voiko herkille tarkoitettu ripsiliima aiheuttaa allergiaa?",
      a: "Voi. Ripsiliima on syanoakrylaattia, ja herkille iholle merkitty liima on silti samaa ainetta. Sen höyry kirvelee silmiä, saa nenän vuotamaan ja voi allergisoida sekä asiakkaan että ripsiteknikon, joka työskentelee liiman äärellä tunteja päivässä.",
    },
    {
      q: "Kuinka paljon ennen värjäystä allergiatesti tehdään?",
      a: "Moni valmistaja edellyttää ihotestiä tyypillisesti 48 tuntia ennen käsittelyä, tuotteen oman ohjeen mukaan. Puhdas testi ei takaa turvallisuutta pysyvästi. Asiakasta, joka on joskus reagoinut väriin tai mustaan hennaan, ei pidä värjätä.",
    },
    {
      q: "Onko TPO kielletty geelilakoissa?",
      a: "Euroopan unionissa TPO on ollut kielletty kynsituotteissa 1.9.2025 alkaen, eikä salongin aiemmin ostamaa varastoa saa käyttää loppuun. Kemikaalimääräykset vaihtelevat maittain, joten tarkista oman maasi säännöt ja lue hyllyssä olevien tuotteiden ainesosaluettelot.",
    },
  ],
  related: ["rua-tay-gang-tay", "khi-nao-khong-lam", "xu-ly-su-co", "gel-hieu-dung"],
};

export default article;
