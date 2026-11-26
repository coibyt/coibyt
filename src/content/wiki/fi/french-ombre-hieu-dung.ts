import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/french-ombre-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "mika-on-ranskalainen-manikyyri",
  lesson: "french-ombre-hieu-dung",
  category: "nail",
  title: "Mikä on ranskalainen manikyyri? Hymyviiva, neljä tyyliä ja baby boomer -ombre",
  metaTitle: "Ranskalainen manikyyri: hymyviiva, tyylit ja ombre",
  metaDescription:
    "Mikä on ranskalainen manikyyri, millainen on hyvä hymyviiva, klassinen, syvä, mikro ja värillinen tyyli, baby boomer -ombre ja miksi valkoinen pidetään ohuena.",
  keyword: "ranskalainen manikyyri",
  keywords: ["ranskalaisen manikyyrin hymyviiva", "mikro ranskalainen", "baby boomer kynnet", "ombre kynnet", "ranskalainen manikyyri lyhyisiin kynsiin", "värillinen ranskalainen", "ranskalaisen kärjet rypistyvät"],
  excerpt: "Kaunis ranskalainen manikyyri syntyy tasaisesta hymyviivasta kaikissa kymmenessä kynnessä. Tässä hyvän hymyviivan merkit, valkoisen kärjen mittasuhteet, tyylit ja baby boomer -ombre.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("bo-mong-french-co-dien-tren-hai-ban-tay"),
    alt: "Asiakkaan kädet päällekkäin kermanvärisellä käsityynyllä, kymmenen klassista ranskalaista kynttä läpikuultavalla vaaleanpunaisella pohjalla ja tasaisin valkoisin kärjin",
  },
  takeaways: [
    "Ranskalaisen manikyyrin kauneus on **kaikissa kymmenessä kynnessä vierekkäin**: syvä kärki matalan vieressä on ensimmäinen asia, jonka asiakas huomaa.",
    "Hyvässä hymyviivassa on neljä ominaisuutta: tasainen syvyys, toistensa peilikuvina olevat puolikkaat, terävä reuna ja sama viiva kaikissa kymmenessä kynnessä.",
    "Valkoiselle ei ole kiinteää mittaa. Lyhyissä kynsissä kärki pidetään kapeana, pitkiin kynsiin sopii syvempi.",
    "Ombressa (baby boomer) ei ole hymyviivaa: vaaleanpunainen liukuu maidonvalkoiseksi **hyvin ohuen valkoisen** ja vähittäisen häivytyksen ansiosta.",
    "Valkoinen geeli on hyvin peittävää, joten paksu kerros ei kovetu läpi. Kaksi ohutta kerrosta, kumpikin kovetettuna valmistajan koko ajan, on aina parempi kuin yksi paksu.",
  ],
  intro: [
    "Ranskalainen manikyyri on tuttu lähes jokaiselle asiakkaalle: läpikuultava vaaleanpunainen pohja ja valkoinen raita kynnen kärjessä. Tyyli on tyylikäs ja siisti, ja se sopii melkein kaikille morsiamista toimistotyöntekijöihin. Juuri yksinkertaisuuden takia pienikin virhe näkyy kuitenkin heti, eikä kynsiteknikolla ole kuviota, jonka taakse piiloutua.",
    "Artikkeli seuraa VaraaAi Academyn Kynnet-kurssin oppituntia ”Ranskalainen ja ombre: ymmärrä ne, niin hymyviiva on kaunis ja tasainen”. Luettuasi osaat katsoa hymyviivaa ja sanoa, onko se kohdallaan, valita ranskalaisen tyylin kynnen pituuden mukaan, kertoa, miten ombre eroaa ranskalaisesta, ja selittää asiakkaalle, miksi kuvan tyyli ei ehkä sovi hänen omiin kynsiinsä.",
  ],
  sections: [
    {
      id: "ranskalainen-ja-hymyviiva",
      title: "Ranskalainen manikyyri ja hymyviiva: arvioi kymmentä kynttä, ei yhtä",
      blocks: [
        { p: "Ranskalaisen manikyyrin sielu on **hymyviiva**: kaari, jossa valkoinen kärki kohtaa vaaleanpunaisen. Kaikki arviot ranskalaisesta, onnistuiko se vai ei, palaavat tähän kaareen." },
        { img: { src: img("duong-cuoi-mong-french-can-doi"), alt: "Lähikuva ranskalaisesta kynnestä asiakkaan sormessa, valkoinen kärki kohtaa läpikuultavan vaaleanpunaisen pohjan tasapainoisena kaarena", caption: "Hymyviiva on kaari, jossa valkoinen kohtaa vaaleanpunaisen." } },
        { p: "Taitavallekin kynsiteknikolle käy usein näin. Yksitellen katsottuna jokainen kynsi on kaunis. Sitten asiakas laskee molemmat kätensä pöydälle, ja tässä kynnessä valkoinen on syvä, tuossa matala, tämä on tasapainoinen ja tuo vino. Asiakas ei sano mitään, mutta ensi kerralla hän ei tule takaisin." },
        { p: "Syy on yksinkertainen: asiakas katsoo molempia käsiä yhtä aikaa. Yksi epätasainen kynsi saa koko sarjan näyttämään epätasaiselta. Siksi ranskalaisessa manikyyrissä kymmentä kynttä käsitellään yhtenä kokonaisuutena siitä hetkestä, kun hymyviiva valitaan." },
      ],
    },
    {
      id: "hyva-hymyviiva",
      title: "Millainen on hyvä ranskalaisen manikyyrin hymyviiva",
      blocks: [
        {
          ol: [
            "**Tasainen syvyys.** Valkoisessa ei ole korkeita ja matalia kohtia.",
            "**Tasapaino.** Kaaren puolikkaat ovat toistensa peilikuvia.",
            "**Terävä ja puhdas reuna.** Valkoisen ja vaaleanpunaisen raja on selvä, ei sumea.",
            "**Sama kaikissa kymmenessä kynnessä.**",
          ],
        },
        { h3: "Seuraa luonnollista kärkiviivaa tai valitse oma viiva" },
        { p: "Luonnollisin tapa on seurata asiakkaan omaa kärkiviivaa, kohtaa, jossa kynsi irtoaa sormenpään ihosta. Ongelma on, että viiva vaihtelee sormesta toiseen: osa kaartuu syvälle, osa on lähes suora ja osa vino." },
        { img: { src: img("duong-dau-mong-that-truoc-khi-ve-french"), alt: "Lähikuva lakkaamattomasta luonnonkynnestä asiakkaan sormessa, jossa vaaleanpunaisen kynsipedin ja norsunluunvalkoisen vapaan reunan raja näkyy selvästi", caption: "Luonnollinen kärkiviiva: kohta, jossa vaaleanpunainen kynsi muuttuu vapaaksi reunaksi. Jokaisessa sormessa viiva on hieman erilainen." } },
        { p: "Kun luonnollinen viiva on kaunis, seuraa sitä. Kun se on vino, älä seuraa vinoutta. Valitse yksi kaunis hymyviiva, joka sopii koko käteen, ja maalaa täsmälleen se viiva kaikkiin kymmeneen kynteen. Kohdat, joissa luonnollinen kärkiviiva alla on epätasainen, peitetään hieman peittävämmällä vaaleanpunaisella pohjalla." },
        { img: { src: img("loi-duong-cuoi-french-lech-hai-ben"), alt: "Lähikuva ranskalaisesta kynnestä, jossa valkoinen ulottuu toisella sivulla paljon lähemmäs kynsinauhaa kuin toisella, joten hymyviiva on vino", caption: "Esimerkki virheestä: sivujen syvyys on eri, joten hymyviiva on vino." } },
        { note: "Pyydä asiakasta ennen maalaamista asettamaan käsi suoraksi ja katso kynsiä ylhäältä. Valitse syvyys lyhimmän tai epätasaisimman kynnen mukaan, jotta koko sarjasta saadaan yhtenäinen.", kind: "tip", title: "Syvyys vaikeimman kynnen mukaan" },
      ],
    },
    {
      id: "valkoisen-mittasuhteet",
      title: "Kuinka syvä valkoisen kärjen pitää olla: pituuden ja muodon mukaan",
      blocks: [
        { p: "Valkoiselle ei ole kiinteää mittaa. Periaate on sovittaa se kynnen pituuteen ja muotoon." },
        {
          ul: [
            "**Lyhyet kynnet:** pidä valkoinen kapeana, niin sormet näyttävät hoikemmilta ja pidemmiltä. Liian syvä valkoinen lyhyessä kynnessä saa sormet näyttämään lyhyiltä ja tönköiltä.",
            "**Pitkät kynnet:** valkoinen voi olla syvempi.",
            "**Kantikkaat kynnet:** loivempi hymyviiva.",
            "**Mantelikynnet:** syvempi kaari, joka seuraa muotoa.",
          ],
        },
        { p: "Koska hymyviivan pitää sopia muotoon, kynnet muotoillaan aina ennen maalaamista. Jos haluat kerrata muodot ja niiden valinnan käden mukaan, lue [kynsien muodot](lesson:dua-form-mong-hieu-dung)." },
      ],
    },
    {
      id: "ranskalaisen-tyylit",
      title: "Ranskalaisen manikyyrin tyylit: klassinen, syvä, mikro ja värillinen",
      blocks: [
        { p: "Yllä olevista mittasuhteista syntyy muutama ranskalaisen tyyli. Maalaustekniikka pysyy samana, vain valkoisen korkeus tai väri muuttuu." },
        {
          table: {
            head: ["Tyyli", "Miltä se näyttää", "Huomio"],
            rows: [
              ["Klassinen", "Läpikuultava vaaleanpunainen pohja, kohtuullinen valkoinen kärki", "Tutuin tyyli ja lähtökohta muiden opettelulle"],
              ["Syvä", "Korkeampi valkoinen ja selvempi kaari", "Sopii pitkiin kynsiin"],
              ["Mikro", "Vain ohut valkoinen viiva kärjen reunassa", "Täydellinen lyhyille kynsille ja hyvin huomaamatonta tyyliä haluaville"],
              ["Värillinen", "Valkoinen vaihdetaan toiseen väriin, kuten viininpunaiseen, kultaglitteriin tai asuun sopivaan sävyyn", "Täsmälleen sama tekniikka kuin valkoisessa"],
            ],
          },
        },
        { img: { src: img("mong-micro-french-duong-trang-manh"), alt: "Lähikuva mikroranskalaisesta kynnestä, jossa vain hyvin ohut valkoinen viiva kulkee kärjen reunassa läpikuultavan vaaleanpunaisen pohjan päällä", caption: "Mikroranskalainen: ohut valkoinen viiva reunassa, sopii erinomaisesti lyhyisiin kynsiin." } },
        { img: { src: img("mong-french-sau-phan-trang-cao"), alt: "Lähikuva syvästä ranskalaisesta kynnestä, jossa valkoinen peittää lähes kynnen etupuoliskon ja kaari erottuu selvästi vaaleanpunaisesta", caption: "Syvä ranskalainen: korkea valkoinen kärki ja selvä kaari, pitkiin kynsiin." } },
        { img: { src: img("mong-french-mau-do-ruou"), alt: "Lähikuva värillisestä ranskalaisesta kynnestä, kärki kiiltävän viininpunainen ja hymyviiva terävä läpikuultavan vaaleanpunaisen pohjan päällä", caption: "Värillinen ranskalainen: sama tekniikka, vain kärjen väri vaihtuu." } },
      ],
    },
    {
      id: "baby-boomer-ombre",
      title: "Mitä ovat baby boomer -kynnet ja miten ombre eroaa ranskalaisesta",
      blocks: [
        { p: "Ombre, toiselta nimeltään baby boomer, on värin liukuma: luonnollinen vaaleanpunainen kynsinauhan kohdalla liukuu kärkeä kohti maidonvalkoiseksi. Hymyviivaa ei ole. Onnistuneessa ombressa ei näe, mistä väri alkaa vaihtua, kuin ohut usva." },
        { img: { src: img("mong-ombre-baby-boomer-hong-trang-sua"), alt: "Lähikuva baby boomer -ombrekynnestä, jossa luonnollinen vaaleanpunainen kynsinauhan kohdalla liukuu maidonvalkoiseksi kärjessä ilman näkyvää rajaa", caption: "Baby boomer -ombre: vaaleanpunainen liukuu vähitellen maidonvalkoiseksi, ilman hymyviivaa." } },
        { p: "Asiakkaalle, joka haluaa kynsiensä näyttävän pitkään luonnollisilta, se on hyvä ehdotus. Kynsinauhan kohta on valmiiksi vaaleanpunainen, joten kynnen kasvaessa uusi kasvu sulautuu siihen eikä selvää rajaa synny niin kuin tummalla värillä." },
        { p: "Usva syntyy kahdesta asiasta:" },
        {
          ol: [
            "**Hyvin ohut valkoinen.** Kun valkoinen kerros on ohut, alla oleva vaaleanpunainen kuultaa läpi, ja väri liukuu pehmeästi.",
            "**Vähittäinen rakentaminen.** Häivytä kevyesti monessa kierroksessa äläkä yritä saada valmista kerralla.",
          ],
        },
        { p: "Kiireisen tekijän tyypillinen virhe on levittää yksi paksu valkoinen kerros ja yrittää sitten häivyttää se. Tuloksena on laikukas valkoinen raita kynnen poikki, kuin maalia olisi sudittu päälle." },
      ],
    },
    {
      id: "yleiset-virheet",
      title: "Yleiset virheet ranskalaisessa manikyyrissä ja ombressa",
      blocks: [
        {
          table: {
            head: ["Virhe", "Miksi se syntyy", "Mitä tehdä"],
            rows: [
              ["Epätasainen syvyys", "Kynnen sivut tai kynnet keskenään poikkeavat toisistaan", "Valitse yksi hymyviiva koko kädelle ennen maalaamista"],
              ["Liian paksu valkoinen", "Valkoinen geeli on hyvin peittävää, valo läpäisee sen huonosti, joten paksu kerros jää alikovettuneeksi, rypistyy ja irtoaa", "Kaksi ohutta valkoista kerrosta, kumpikin kunnolla kovetettuna"],
              ["Sumea reuna", "Hymyviivaa ei siistitty ennen kovetusta", "Terävöitä viiva, kun geeli on vielä kovettumatonta"],
              ["Liian kalkkimainen tai raitainen valkoinen", "Yritys peittää yhdellä kerroksella tai geeliä ei sekoitettu", "Sekoita geeli ja peitä kahdella ohuella kerroksella"],
              ["Raita ombren poikki", "Paksu valkoinen, kiireessä häivytetty", "Ohuet kerrokset, kevyt häivytys monessa kierroksessa"],
            ],
          },
        },
        { img: { src: img("loi-phan-trang-french-qua-day"), alt: "Lähikuva ranskalaisesta kynnestä, jonka valkoinen kärki on levitetty aivan liian paksuksi, reuna koholla ja pinta kuoppainen ja epätasaisesti raidallinen", caption: "Esimerkki virheestä: valkoinen on liian paksu. Tällainen kerros jää helposti alta alikovettuneeksi." } },
        { p: "Periaate, jonka mukaan ohuet kerrokset kovettuvat tasaisesti ja paksut rypistyvät ja jäävät alta pehmeiksi, selitetään artikkelissa [mikä on geelilakka](lesson:gel-hieu-dung). Valkoisella se pätee vielä enemmän. Kaksi ohutta valkoista kerrosta, kumpikin kovetettuna valmistajan ilmoittaman koko ajan, on parempi kuin yksi paksu." },
        { note: "Alikovettunut geeli irtoaa helposti ja aiheuttaa herkemmin allergiaa, eikä kovettumaton geeli saa koskaan koskea ihoon. Kovetusajat ja tuotteiden käyttö noudattavat aina valmistajan ohjeita. Kynsituotteita koskevat määräykset vaihtelevat maittain, joten tarkista omaa toimintaasi koskevat vaatimukset. Artikkeli on koulutusmateriaali, ei pätevyystodistus.", kind: "warn", title: "Valkoisen geelin turvallinen käyttö" },
        { p: "Geeliallergian merkit ja ehkäisy käydään läpi oppitunnilla [Allergiat ja kemikaalit](lesson:di-ung-hoa-chat)." },
      ],
    },
    {
      id: "geelit-ja-siveltimet",
      title: "Geelien ja siveltimien valinta ranskalaiseen ja ombreen",
      blocks: [
        { p: "Erikoismerkkiä ei tarvita. Tärkeintä on, että jokainen tuote tekee oman tehtävänsä hyvin." },
        {
          ul: [
            "**Valkoinen geeli kärkiin:** tarpeeksi paksua, ettei se valu, ja tarpeeksi peittävää, että se on tasainen yhdellä tai kahdella ohuella kerroksella.",
            "**Vaaleanpunainen tai nude-pohjageeli:** läpikuultava, tai hieman peittävä, kun luonnollinen kärkiviiva pitää peittää.",
            "**Valkoinen ja nude-rakennegeeli:** moni kynsiteknikko maalaa kärjet sillä, koska se on paksua, pitää muotonsa ja on helppo hallita.",
            "**Pitkä ja ohut viivasivellin** hymyviivan maalaamiseen ja **pieni litteä sivellin** viivan siistimiseen.",
            "**Pieni sieni tai puhdas sivellin** ombren häivyttämiseen.",
          ],
        },
        { img: { src: img("gel-va-co-ve-french-ombre"), alt: "Kolme pulloa valkoista, vaaleanpunaista ja kirkasta geeliä, purkki valkoista rakennegeeliä, kolme sivellintä, kaksi sientä ja pullo puhdistusnestettä kermanvärisellä pyyhkeellä" } },
        { p: "Siveltimien ote, aloituskulma ja häivytys näytetään rauhassa käytännön artikkelissa [ranskalaisen manikyyrin ja ombren tekeminen](lesson:french-ombre)." },
      ],
    },
    {
      id: "neuvonta-ja-ajanvaraus",
      title: "Rehellinen neuvonta ja ranskalainen salongin ajanvaraukseen",
      blocks: [
        { p: "Osa asiakkaista tuo kuvan pitkistä kynsistä ja syvästä hymyviivasta, vaikka omat kynnet ovat lyhyet ja kärkiviiva vino. Kerro rehellisesti, että näissä kynsissä tuo tyyli saa sormet näyttämään lyhyemmiltä. Ehdota sitten mikroranskalaista, kapeampaa klassista tai ombrea, kerro miksi ja näytä se hänen omissa kynsissään. Asiakkaat ovat yleensä kiitollisia, koska he näkevät, että teet työn heidän vuokseen etkä vain saadaksesi sen valmiiksi." },
        { p: "Ranskalaisen ja ombren huolellinen tekeminen vie enemmän aikaa kuin yksivärinen lakkaus. VaraaAissa ne kannattaa [perustaa omiksi palveluikseen](lesson:dich-vu) omalla kestolla ja hinnalla, jotta asiakkaat varaavat oikein ja kalenteriin jää riittävästi aikaa. Kunkin tyylin hinnan voi lisätä salongin [hinnastoon](lesson:bang-gia), ja seuraavan käynnin voi varata suoraan [ajanvarauskalenteriin](lesson:lich-hen)." },
      ],
    },
  ],
  faq: [
    {
      q: "Mikä on ranskalainen manikyyri?",
      a: "Ranskalaisessa manikyyrissä on läpikuultava vaaleanpunainen pohja ja valkoinen kärki, jotka kohtaavat hymyviivaksi kutsutussa kaaressa. Klassisessa tyylissä valkoinen kärki on kohtuullinen; lisäksi on syvä, mikro- ja värillinen ranskalainen.",
    },
    {
      q: "Mikä on ranskalaisen manikyyrin hymyviiva?",
      a: "Hymyviiva on kaari, jossa valkoinen kärki kohtaa vaaleanpunaisen. Hyvässä hymyviivassa syvyys on tasainen, puolikkaat ovat toistensa peilikuvia, reuna on terävä eikä sumea, ja viiva näyttää samalta kaikissa kymmenessä kynnessä.",
    },
    {
      q: "Sopiiko ranskalainen manikyyri lyhyisiin kynsiin?",
      a: "Sopii, kun valkoinen pidetään kapeana. Mikroranskalainen, pelkkä ohut valkoinen viiva kärjen reunassa, sopii lyhyisiin kynsiin erinomaisesti ja saa sormet näyttämään hoikemmilta ja pidemmiltä. Liian syvä valkoinen lyhyessä kynnessä saa sormet näyttämään lyhyiltä ja tönköiltä.",
    },
    {
      q: "Ovatko ombre ja baby boomer sama asia?",
      a: "Kynsialalla baby boomer on vaaleanpunaisen ja valkoisen ombren toinen nimi: luonnollinen vaaleanpunainen kynsinauhan kohdalla liukuu maidonvalkoiseksi kärjessä. Siinä ei ole hymyviivaa, eikä värin vaihtumiskohtaa pitäisi erottaa.",
    },
    {
      q: "Miksi ranskalaisen valkoinen kärki rypistyy tai irtoaa?",
      a: "Yleensä valkoinen kerros on liian paksu. Valkoinen geeli on hyvin peittävää ja lampun valo läpäisee sen huonosti, joten paksu kerros jää alta alikovettuneeksi ja rypistyy ja irtoaa. Ratkaisu on kaksi ohutta valkoista kerrosta, kumpikin kovetettuna geelimerkin ohjeen koko ajan.",
    },
    {
      q: "Näkyykö kasvu ombrekynsissä?",
      a: "Vähemmän kuin tummassa värissä. Ombren kynsinauhan puoleinen osa on valmiiksi luonnollisen vaaleanpunainen, joten kynnen kasvaessa selvää rajaa ei synny. Siksi ombre sopii asiakkaille, jotka haluavat kynsien näyttävän pidempään luonnollisilta.",
    },
  ],
  related: ["french-ombre", "dua-form-mong-hieu-dung", "gel-hieu-dung", "builder-gel-hieu-dung"],
};

export default article;
