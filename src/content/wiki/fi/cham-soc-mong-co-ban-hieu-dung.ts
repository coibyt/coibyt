import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cham-soc-mong-co-ban-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "perusmanikyyri-ja-pedikyyri",
  lesson: "cham-soc-mong-co-ban-hieu-dung",
  category: "nail",
  title: "Perusmanikyyri ja -pedikyyri: kynsinauhat, varpaankynsien leikkaus, jalkakylvyn hygienia ja tavallinen lakka",
  metaTitle: "Perusmanikyyri ja -pedikyyri: 7 asiaa, jotka pitää ymmärtää",
  metaDescription:
    "Perusmanikyyri ja -pedikyyri: miksi elävää ihoa ei leikata, varpaankynnet suoraan, jalkakylvyn hygienia, diabeetikot, kovettumat ja tavallinen lakka vai geeli.",
  keyword: "perusmanikyyri ja -pedikyyri",
  keywords: ["saako kynsinauhoja leikata", "varpaankynsien leikkaaminen", "jalkakylvyn hygienia", "pedikyyri diabeetikolle", "tavallinen kynsilakka vai geelilakka", "sisäänkasvanut varpaankynsi", "kovettumien poisto kantapäästä"],
  excerpt: "Perusmanikyyri ja -pedikyyri tavallisella lakalla näyttää helpolta. Tässä seitsemän asiaa, jotka kynsiteknikon pitää ymmärtää, jotta asiakas lähtee kauniin ja terveen lopputuloksen ja turvallisen mielen kanssa.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("mong-tay-son-thuong-mau-do-dang-cho-kho"),
    alt: "Asiakkaan kädet kermanvärisellä käsityynyllä, kynnet juuri lakattu kiiltävän punaisiksi, vieressä pullo punaista kynsilakkaa",
  },
  takeaways: [
    "Palvelun tavoite on **terveet kynnet ja terve iho**. Väri on vasta viimeinen vaihe.",
    "Kynnen tyven elävää ihopoimua ei leikata. Poistetaan vain kynsilevyyn tarttunut ohut kuollut kudos ja irronneet kuivat hilseet.",
    "Varpaankynnet **leikataan suoraan poikki** ja kulmat pyöristetään vain hieman, kulmiin ei kaiveta, ja reuna jää varpaan pään tasalle.",
    "Jalkakylpyyn kertakäyttöinen suojapussi jokaiselle asiakkaalle; jalkahoitovälineet aina steriloituina ja erillään (Helsingin kaupungin hygieniaohjeen mukaan).",
    "Kysy aina diabeteksesta ja verenkierrosta. Haavauma, haava tai paksu tai värjäytynyt kynsi tarkoittaa, että hoitoa ei tehdä ja asiakas ohjataan lääkäriin.",
  ],
  intro: [
    "Perusmanikyyri ja -pedikyyri tavallisella lakalla nähdään usein aloittelijan työnä. Todellisuudessa juuri tämä palvelu näyttää asiakkaalle selvimmin, onko salonki huolellinen ja puhdas: hän näkee, kun avaat välinepussin, asetat suojapussin jalkakylpyyn ja pidät pihtejä aivan hänen ihonsa vieressä.",
    "Artikkeli seuraa VaraaAi Academyn Kynnet-kurssin oppituntia ”Perusmanikyyri ja -pedikyyri: ymmärrä ne, niin kädet ja jalat ovat terveet ja kauniit”. Luettuasi osaat selittää asiakkaalle, miksi kynsinauhoja ei leikata syvältä, leikata varpaankynnet niin, etteivät ne kasva sisään, noudattaa jalkakylvyn hygieniaa ja tunnistaa, milloin pitää edetä varovaisemmin tai kieltäytyä.",
  ],
  sections: [
    {
      id: "kynsinauhojen-leikkaaminen",
      title: "Saako kynsinauhoja leikata?",
      blocks: [
        { p: "Aloitetaan tavoitteesta. Perusmanikyyrissä ja -pedikyyrissä lakka tulee viimeisenä. Pääasia ovat terveet kynnet ja terve iho: siististi leikatut ja viilatut kynnet, pehmeä ja puhdas iho niiden ympärillä ja jalat, jotka tuntuvat kevyiltä. Tarkkaavainen kynsiteknikko huomaa myös usein ensimmäisenä jotain poikkeavaa asiakkaan kynsissä tai iholla ja neuvoo häntä käymään lääkärissä." },
        { p: "Tavoitteesta seuraa myös ihoa koskeva sääntö. Kynsi kasvaa kasvukohdasta, joka on kynnen tyven ihopoimun alla. Tämä elävä ihopoimu toimii kuin tiiviste: se pitää bakteerit poissa kohdasta, jossa kynsi syntyy. Siksi elävää ihoa ei leikata." },
        { img: { src: img("mat-cat-dau-ngon-tay-mam-mong-va-nep-da"), alt: "Piirroskuva sormenpään poikkileikkauksesta, jossa näkyy kynsilevy kynsipedin päällä ja kynnen juuri piilossa tyven ihopoimun alla", caption: "Kynsi kasvaa kasvukohdasta tyven ihopoimun alta. Elävä ihopoimu sulkee ja suojaa kasvukohtaa." } },
        { p: "Kynsiteknikko poistaa vain kaksi asiaa: kynsilevyyn tarttuneen ohuen, läpikuultavan kuolleen kudoksen ja irronneet kuivat ihonpalat. Tästä kerrotaan tarkemmin artikkelissa [mikä on geelilakka](lesson:gel-hieu-dung)." },
        { img: { src: img("kem-chi-cat-manh-da-chet-da-bong"), alt: "Mustiin käsineisiin pukeutunut kynsiteknikko leikkaa pienten pihtien kärjellä irronneen kuivan ihonpalan asiakkaan luonnonkynnen sivulta", caption: "Pihdit koskevat vain irronnutta kuollutta ihonpalaa, eivät koskaan elävää ihopoimua." } },
        { p: "Usein käy näin: asiakas on tottunut siihen, että kynsinauhat leikataan todella syvältä, ja pyytää vielä syvemmälle. Elävään ihoon leikkaaminen näyttää tänään siistiltä, mutta iho kasvaa usein takaisin paksumpana ja karheampana, siihen tulee helposti irtonahkoja, ja jokainen haava on portti tulehdukselle." },
        { note: "Kun asiakas vaatii kynsinauhojen leikkaamista syvältä, älä anna periksi. Kerro vaihtoehto: kevyt työntö, kuolleen kudoksen poisto ja kynsinauhaöljy joka päivä. Varaa hänelle uusi aika muutaman viikon päähän, niin hän näkee itse, kuinka paljon pehmeämpi iho on.", kind: "tip", title: "Mitä kerrot asiakkaalle" },
      ],
    },
    {
      id: "varpaankynsien-leikkaaminen",
      title: "Varpaankynsien leikkaaminen oikein: suoraan poikki, ei kulmiin",
      blocks: [
        { p: "Varpaankynsille on yksi kultainen sääntö: leikkaa suoraan poikki ja pyöristä kulmia vain hyvin vähän. Älä leikkaa syvää kaarta sivuille, älä kaiva kulmiin äläkä leikkaa liian lyhyeksi. Kynnen reuna varpaan pään tasalla on juuri sopiva." },
        { img: { src: img("mong-chan-cat-thang-ngang-dung-cach"), alt: "Lähikuva ylhäältä isovarpaasta, jonka luonnonkynsi on leikattu suoraan poikki niin, että reuna on varpaan pään tasalla", caption: "Oikein: suora reuna ja kulmat tallella, vain pehmennetty, jotteivät ne ole teräviä." } },
        { p: "Syy on siinä, miten kynsi kasvaa. Jos kulmat leikataan syvältä, kynsi voi kasvaessaan painua ihoon ja muuttua sisäänkasvaneeksi kynneksi: turvonnut, punainen, kipeä ja joskus tulehtunut. Liian lyhyeksi leikattu kynsi voi päätyä samaan. Brittiläisen terveyspalvelun [NHS:n sivu sisäänkasvaneesta varpaankynnestä](https://www.nhs.uk/conditions/ingrown-toenail/) on yksi oppitunnin lähteistä." },
        { img: { src: img("loi-cat-mong-chan-cong-sau-vao-khoe"), alt: "Lähikuva isovarpaasta, jonka kynsi on leikattu puolikuun muotoiseksi kaareksi ja molemmat kulmat syvälle sivuihin", caption: "Esimerkki virheestä: kaareva leikkaus syvälle kumpaankin kulmaan. Kasvaessaan reuna painuu helposti ihoon." } },
        { p: "Tämä ohje kannattaa antaa asiakkaalle kotiin vietäväksi: kun hän leikkaa varpaankyntensä itse, hänkin leikkaa suoraan poikki eikä koske kulmiin. Jos kynsi kasvaa ihoon ja kohta punoittaa ja on kipeä, lääkäriin kannattaa mennä ajoissa." },
      ],
    },
    {
      id: "jalkakylvyn-hygienia",
      title: "Jalkakylvyn ja välineiden hygienia",
      blocks: [
        { p: "Tämä on pedikyyrin tärkein osa. Lämmin ja kostea jalkakylpy on paikka, jossa bakteerit ja sienet kasvavat todella helposti, jos sitä ei hoideta oikein. Oppitunti noudattaa [Helsingin kaupungin hygieniaohjetta](https://www.hel.fi/static/liitteet-2019/Kymp/asuminen-ja-ymparisto/ymparistoterveys/Hygiene-premises-instructions.pdf), joka on myös oppitunnin [Välineet jokaisen asiakkaan jälkeen](lesson:ve-sinh-dung-cu) pohjana." },
        {
          table: {
            head: ["Väline", "Käsittely", "Milloin"],
            rows: [
              ["Jalkakylpy", "Kertakäyttöinen suojapussi; allas puhdistetaan ja desinfioidaan", "Uusi suojapussi jokaiselle asiakkaalle; allas jokaisen asiakkaan jälkeen"],
              ["Jalkahoitovälineet", "Aina steriloituina ja erillään säilytettyinä", "Jokaisen asiakkaan jälkeen"],
              ["Metalliset pihdit ja työntimet", "Puhdistus ja sterilointi, koska ne voivat rikkoa ihon", "Jokaisen asiakkaan jälkeen"],
              ["Paperiviilat, hiomapalat, puutikut, varvaserottimet", "Kertakäyttöisiä: käytön jälkeen roskiin", "Uusi setti jokaiselle asiakkaalle"],
            ],
          },
        },
        { img: { src: img("bon-ngam-chan-lot-tui-dung-mot-lan"), alt: "Valkoinen jalkakylpyallas, jossa on läpinäkyvä kertakäyttöinen muovinen suojapussi, ja mustaan käsineeseen puettu käsi täyttää sitä lämpimällä vedellä suihkusta", caption: "Uusi suojapussi jokaiselle asiakkaalle. Suojapussin lisäksi allas puhdistetaan ja desinfioidaan jokaisen asiakkaan jälkeen." } },
        { p: "Sama pätee manikyyriin: puhtaus on ensimmäinen asia, jonka asiakas näkee. Pese ja desinfioi kätesi ennen jokaista asiakasta ja avaa välinepussi hänen silmiensä edessä. Kun asiakas näkee sen, hän tuntee olonsa turvalliseksi." },
        { img: { src: img("mo-tui-dung-cu-tiet-trung-truoc-mat-khach"), alt: "Mustiin käsineisiin pukeutunut kynsiteknikko repii auki sterilointipussin, jossa on pihdit ja työnnin, hymyilevän asiakkaan edessä marmoripöydän ääressä" } },
        { note: "Yllä olevat käytännöt noudattavat Helsingin kaupungin hygieniaohjetta. Muualla Suomessa ja muissa maissa määräykset voivat poiketa, joten tarkista omaa toimintaasi koskevat vaatimukset. Artikkeli on koulutusmateriaali, ei pätevyystodistus.", kind: "warn", title: "Tarkista paikalliset määräykset" },
      ],
    },
    {
      id: "diabetes-ja-verenkierto",
      title: "Pedikyyri diabeetikolle tai verenkiertohäiriöistä kärsivälle",
      blocks: [
        { p: "Joidenkin asiakkaiden kanssa kynsiteknikon pitää olla monta kertaa varovaisempi: asiakkaat, joilla on diabetes tai jalkojen verenkierron ongelmia. Kysy siksi aina ennen aloittamista. Heidän jalkojensa tunto voi olla heikentynyt, joten he eivät välttämättä huomaa, jos vesi on liian kuumaa tai iho naarmuuntuu, ja pienenkin naarmun paraneminen kestää pitkään." },
        {
          ul: [
            "Vesi vain haaleaa.",
            "Lyhyt liotus.",
            "Ei ihon leikkaamista, ei teriä.",
            "Hyvin kevyt viilaus.",
          ],
        },
        { img: { src: img("mong-chan-day-doi-mau-khong-nen-lam"), alt: "Lähikuva jalkaterän etuosasta kermanvärisellä pyyhkeellä, isovarpaan kynsi paksuuntunut, samea ja kellertävä toisin kuin muut kynnet", caption: "Paksuuntunut ja värjäytynyt kynsi on merkki, ettei hoitoa tehdä. Kynsiteknikko ei diagnosoi, vaan ohjaa lääkäriin." } },
        { note: "Kynsiteknikko ei tee diagnooseja. Haavauma, haava, paksu tai värjäytynyt kynsi tai sisäänkasvanut kynsi tarkoittaa, että hoitoa ei tehdä ja asiakas ohjataan lääkäriin tai jalkojenhoitajalle. Oppitunti [Milloin hoitoa ei tehdä](lesson:khi-nao-khong-lam) käy nämä tilanteet läpi tarkemmin.", kind: "warn", title: "Milloin kieltäydyt" },
      ],
    },
    {
      id: "kantapaan-kovettumat",
      title: "Kantapään kovettumat: tasoita, älä poista kaikkea",
      blocks: [
        { p: "Kovettuma on ihoa, joka paksuuntuu suojaamaan jalkaa kohdissa, joihin kohdistuu paljon painetta, kuten kantapäässä ja jalkapohjassa. Kynsiteknikon tehtävä on pehmentää ja tasoittaa sitä, ei poistaa kaikkea. Käytä hienoa jalkaraspia ja kuljeta sitä kevyesti välineen ohjeen mukaan." },
        { img: { src: img("dua-chan-min-lam-min-vet-chai-o-got"), alt: "Mustiin käsineisiin pukeutunut hoitaja pitelee asiakkaan jalkaa toisella kädellä ja kuljettaa litteää jalkaraspia kevyesti kantapään yli toisella", caption: "Hieno jalkaraspi: muutama kevyt veto riittää tekemään ihosta sileämmän." } },
        { p: "Älä käytä kovettumahöylää tai teriä, ellei sinulla ole koulutusta ja ellei työpaikkasi sitä salli. Liika poisto tekee jalasta aran, iho naarmuuntuu helposti ja kovettuma kasvaa yleensä takaisin paksumpana." },
      ],
    },
    {
      id: "tavallinen-lakka-vai-geeli",
      title: "Tavallinen kynsilakka vai geelilakka: mikä on ero",
      blocks: [
        {
          table: {
            head: ["Vertailu", "Tavallinen lakka", "Geelilakka"],
            rows: [
              ["Kuivuminen", "Liuottimet haihtuvat ilmaan, lamppua ei tarvita", "Tarvitsee lampun"],
              ["Poisto", "Kynsilakanpoistoaine, hyvin hellävarainen kynsille", "Huolellisempi poisto"],
              ["Kesto", "Pehmeämpi; pysyy kauniina yleensä muutamasta päivästä noin viikkoon", "Kestää pidempään"],
              ["Täysin kova", "Pinta kuivuu nopeasti, alla kestää muutaman tunnin", "Kovettuu lampussa"],
            ],
          },
        },
        { p: "Kumpikaan ei ole paras jokaiselle. Auta asiakasta valitsemaan tarpeensa mukaan. Jos hän valitsee geelin, esikäsittely on hieman erilainen: katso [geelilakkauksen ohje](lesson:son-gel)." },
      ],
    },
    {
      id: "hieronta-ja-kotiohjeet",
      title: "Hieronta, kosteutus ja kotiohjeet",
      blocks: [
        { p: "Älä kiirehdi hierontaa ja kosteutusta. Silloin asiakas rentoutuu eniten ja muistaa salonkisi pisimpään. Voide pitää ihon pehmeänä, ja kynsinauhaöljy estää kynsien ympärillä olevaa ihoa kuivumasta ja halkeilemasta. Yksi tekninen asia kannattaa muistaa: pyyhi voide ja öljy kynsilevyltä ennen lakkausta, muuten lakka ei tartu." },
        { p: "Ohjeet asiakkaalle ennen lähtöä:" },
        {
          ul: [
            "Lakka kovettuu kunnolla vasta muutamassa tunnissa: vältä kuumaa vettä äläkä laita umpikenkiä jalkaan heti.",
            "Käytä kynsinauhaöljyä joka päivä ja suojakäsineitä tiskatessa ja siivotessa.",
            "Leikkaa varpaankynnet kotonakin suoraan poikki kulmiin kaivamatta.",
            "Jos kynsi kasvaa ihoon ja kohta on punainen ja kipeä, mene ajoissa lääkäriin.",
          ],
        },
        { img: { src: img("mong-chan-son-do-sau-buoi-cham-soc"), alt: "Asiakkaan jalat vierekkäin kermanvärisellä pyyhkeellä, kymmenen lyhyttä varpaankynttä kiiltävän punaisiksi lakattuina ja juuri irrotetut varvaserottimet vieressä" } },
        { p: "Oikein tehty perusmanikyyri ja -pedikyyri on syy, miksi asiakas palaa joka kuukausi. VaraaAissa kirjaat [asiakastietoihin](lesson:khach-hang) tärkeät asiat, kuten diabeteksen, allergiat tai taipumuksen sisäänkasvaviin kynsiin, jotta koko tiimi tietää ja on varovainen seuraavalla kerralla. Kuukausittain palaaville asiakkaille sopii myös [kanta-asiakaskortti](lesson:the-khach-quen). Jokainen työvaihe vanhan lakan poistosta päällyslakkaan on käytännön artikkelissa [manikyyri ja pedikyyri vaihe vaiheelta](lesson:cham-soc-mong-co-ban)." },
      ],
    },
  ],
  faq: [
    {
      q: "Saako kynsinauhoja leikata?",
      a: "Kynnen tyven elävää ihopoimua ei leikata, koska se sulkee ja suojaa kynnen kasvukohtaa. Kynsinauha työnnetään kevyesti, ja vain kynsilevyyn tarttunut ohut kuollut kudos ja irronneet kuivat hilseet poistetaan. Leikattu elävä iho kasvaa yleensä takaisin paksumpana ja karheampana, ja jokainen haava on reitti tulehdukselle.",
    },
    {
      q: "Miten varpaankynnet leikataan oikein?",
      a: "Suoraan poikki, kulmat vain hyvin vähän pyöristäen, kulmiin kaivamatta ja liian lyhyeksi leikkaamatta. Kynnen reuna varpaan pään tasalla on oikea pituus. Syvälle leikatut kulmat tai liian lyhyet kynnet kasvavat helposti ihoon ja muuttuvat sisäänkasvaneiksi.",
    },
    {
      q: "Voiko diabeetikko käydä pedikyyrissä kauneushoitolassa?",
      a: "Kynsiteknikon pitää tietää asiasta etukäteen ja työskennellä hyvin hellävaraisesti: vain haaleaa vettä, lyhyt liotus, ei ihon leikkaamista, ei teriä ja hyvin kevyt viilaus. Jalkojen tunto voi olla heikentynyt ja naarmut paranevat hitaasti. Haavauma, haava tai paksu tai värjäytynyt kynsi tarkoittaa, että hoitoa ei tehdä ja asiakas ohjataan lääkäriin tai jalkojenhoitajalle.",
    },
    {
      q: "Kuinka kauan tavallinen kynsilakka kestää ja kuivuu?",
      a: "Tavallinen lakka pysyy kauniina yleensä muutamasta päivästä noin viikkoon. Pinta kuivuu nopeasti, mutta alta lakka kovettuu kokonaan vasta muutamassa tunnissa, joten sillä välin kannattaa välttää kuumaa vettä eikä umpikenkiä kannata laittaa jalkaan heti.",
    },
    {
      q: "Pitääkö kantapään kovettumat poistaa kokonaan?",
      a: "Ei pidä. Kovettuma on paksuuntunutta ihoa, joka suojaa jalkaa painetta ottavissa kohdissa. Sitä vain pehmennetään ja tasoitetaan hienolla jalkaraspilla. Liika poisto sattuu, iho naarmuuntuu helposti ja kovettuma kasvaa yleensä takaisin paksumpana. Kovettumahöylä kuuluu vain koulutetuille ja vain siellä, missä se on sallittua.",
    },
    {
      q: "Miten kauneushoitolan jalkakylpy puhdistetaan?",
      a: "Helsingin kaupungin hygieniaohjeen mukaan, jota oppitunti noudattaa, jalkakylpyyn laitetaan jokaiselle asiakkaalle kertakäyttöinen suojapussi, ja jokaisen asiakkaan jälkeen allas puhdistetaan ja desinfioidaan. Jalkahoitovälineet steriloidaan aina ja säilytetään erillään. Määräykset vaihtelevat, joten tarkista omaa toimintaasi koskevat vaatimukset.",
    },
  ],
  related: ["cham-soc-mong-co-ban", "ve-sinh-dung-cu", "khi-nao-khong-lam", "gel-hieu-dung"],
};

export default article;
