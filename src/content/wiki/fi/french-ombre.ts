import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/french-ombre/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "ranskalaisen-manikyyrin-ja-ombren-tekeminen",
  lesson: "french-ombre",
  category: "nail",
  title: "Ranskalaisen manikyyrin tekeminen ja ombrekynnet: 12 vaihetta tasaiseen hymyviivaan",
  metaTitle: "Ranskalaisen manikyyrin tekeminen ja ombre: 12 vaihetta",
  metaDescription:
    "Ranskalaisen manikyyrin tekeminen viivasiveltimellä ja ombrekynnet: pohja, hymyviivan valinta, maalaus kulmasta keskelle, viivan siistiminen ja häivytys sienellä.",
  keyword: "ranskalaisen manikyyrin tekeminen",
  keywords: ["ombrekynnet ohje", "hymyviivan maalaaminen", "ranskalainen manikyyri geelillä", "baby boomer kynnet ohje", "ombre sienellä", "ranskalainen manikyyri vaihe vaiheelta", "ombressa valkoinen raita"],
  excerpt: "Klassinen ranskalainen viivasiveltimellä ja sitten baby boomer -ombre vaihe vaiheelta: hymyviivan valinta, kaksi samanlaista puoliskoa, viivan siistiminen ennen kovetusta ja häivytys ilman raitaa.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-nail-ve-mong-french-cho-khach-tai-salon"),
    alt: "Punaruskeatukkainen kynsiteknikko kermanvärisessä paidassa ja mustissa käsineissä maalaa vaaleahiuksisen asiakkaan kynsiä marmoripöydän ääressä pariisilaistyylisessä salongissa",
  },
  takeaways: [
    "Muotoile kynnet ennen maalaamista, koska hymyviivan pitää sopia muotoon.",
    "Katso kaikkia kymmentä kynttä ennen hymyviivan valintaa ja kuvittele **kolme pistettä**: kaksi yhtä syvää kulmaa ja matalin kohta keskellä.",
    "Maalaa valkoinen yhdestä kulmasta keskelle ja sitten toisesta kulmasta keskelle samalta syvyydeltä. Valkoinen pysyy aina ohuena.",
    "**Siisti hymyviiva ennen kovetusta** pienellä litteällä siveltimellä, joka on vain hädin tuskin kostea puhdistusnesteestä. Myös vino kynsi korjataan ennen kovetusta.",
    "Ombre: valkoinen vain noin kynnen etummaiseen kolmannekseen, häivytys kynsi kerrallaan ja kovetus heti, yleensä kaksi tai kolme ohutta kerrosta.",
  ],
  intro: [
    "Ranskalaisen manikyyrin tekeminen viivasiveltimellä ei vaadi taiteilijan kättä. Se vaatii työjärjestyksen: ensin valitaan koko sarjan hymyviiva, sitten maalataan kumpikin puolisko kulmasta keskelle ja lopuksi viiva terävöitetään, kun geeli on vielä pehmeää. Ombre on päinvastainen: maalattavaa viivaa ei ole, vain ohut valkoinen kerros, jota häivytetään vähän kerrallaan.",
    "Artikkeli perustuu VaraaAi Academyn Kynnet-kurssin oppituntiin ”Ranskalainen ja ombre: vaihe vaiheelta”. Kahdeksan ensimmäistä vaihetta tekevät klassisen ranskalaisen, neljä viimeistä baby boomer -ombren. Katso oppitunnin video alta nähdäksesi siveltimen asennon ja palaa vaiheisiin harjoitellessasi mallikärjillä.",
  ],
  sections: [
    {
      id: "ennen-maalaamista",
      title: "Ennen maalaamista: esikäsittely kuten geelilakkauksessa",
      blocks: [
        { p: "Ranskalainen ja ombre ovat geelilakkausta, johon tulee yksi muotoiluvaihe lisää. Kynsien esikäsittely, pohjageeli ja kovetus tehdään täsmälleen kuten [geelilakkauksen ohjeessa](lesson:son-gel), joten tässä ne kerrataan lyhyesti ja aika käytetään hymyviivaan ja häivytykseen." },
        { p: "Työjärjestyksessä on yksi ero: kynnen muodon pitää olla täysin valmis ennen maalaamista. Kantikkaassa kynnessä hymyviiva on loivempi, mantelikynnessä kaari on syvempi. Jos kynttä muotoillaan maalaamisen jälkeen, hymyviiva ei enää sovi kärkeen." },
        { note: "Ennen kuin sivellin koskee kynteen, kuvittele kolme pistettä: yksi kärjen kumpaankin kulmaan samalle syvyydelle ja yksi keskelle, jossa hymyviiva on matalin. Kun pisteet ovat oikein, hymyviiva tasaantuu lähes itsestään.", kind: "tip", title: "Kolmen pisteen niksi" },
        { p: "Hyvän hymyviivan teoria, valkoisen syvyys kynnen pituuden mukaan ja ranskalaisen tyylit löytyvät artikkelista [mikä on ranskalainen manikyyri](lesson:french-ombre-hieu-dung)." },
      ],
    },
    {
      id: "sivellin-vai-sieni",
      title: "Ombrekynsien häivytys: sivellin vai sieni",
      blocks: [
        { p: "Kumpikin tapa tuottaa kauniin tuloksen. Valitse se, jota kätesi on tottunut käyttämään." },
        {
          table: {
            head: ["Tapa", "Miten", "Huomio"],
            rows: [
              ["Puhdas, lähes kuiva litteä sivellin", "Aseta se kohtaan, jossa valkoinen kohtaa vaaleanpunaisen, ja vedä hyvin lyhyitä ja kevyitä vetoja kohti kynsinauhaa", "Pyyhi sivellin usein"],
              ["Pieni sieni", "Taputtele värin vaihtumiskohtaa kevyesti monta kertaa, niin että valkoinen haalistuu vähitellen ylöspäin", "Yksi sieni asiakasta kohden, käytön jälkeen roskiin"],
            ],
          },
        },
        { img: { src: img("tan-mau-ombre-bang-mieng-mut"), alt: "Kynsiteknikko taputtelee pienellä valkoisella sienellä kevyesti asiakkaan kynnen keskikohtaa, jossa valkoinen geeli kohtaa vaaleanpunaisen pohjan", caption: "Häivytys sienellä: kevyitä taputuksia monta kertaa värin vaihtumiskohtaan." } },
        { p: "Valkoiseksi moni kynsiteknikko valitsee hieman läpikuultavan maidonvalkoisen täyden valkoisen sijaan, koska se on pehmeämpi ja helpompi häivyttää. Vaaleanpunainen tai nude-pohja on valmiin ombren väri kynsinauhan kohdalla, joten valitse sävy, joka sopii asiakkaan ihoon." },
        { img: { src: img("bo-mong-ombre-baby-boomer-hoan-thien"), alt: "Asiakkaan kädet päällekkäin kermanvärisellä käsityynyllä, kymmenen kiiltävää ombrekynttä, joissa vaaleanpunainen liukuu tasaisesti maidonvalkoiseksi", caption: "Valmis ombre: värin liukuma näyttää samalta kaikissa kymmenessä kynnessä." } },
      ],
    },
    {
      id: "virheet-ja-korjaus",
      title: "Virheet ranskalaisessa manikyyrissä ja ombressa sekä niiden korjaus",
      blocks: [
        { p: "Lähes jokaisen ranskalaisen virheen korjaa sekunneissa, jos geeli ei ole vielä käynyt lampussa. Kovetuksen jälkeen sama virhe pitää hioa pois, mikä vie aikaa ja ohentaa pohjaa." },
        {
          table: {
            head: ["Mitä näet", "Tavallinen syy", "Korjaus"],
            rows: [
              ["Vino hymyviiva", "Kulmia ei aloitettu samalta syvyydeltä", "Ennen kovetusta pyyhi kynnen valkoinen pois puhdistusnesteellä ja siveltimellä ja maalaa uudelleen"],
              ["Sumea reuna", "Viivaa ei siistitty, tai sivellin oli niin märkä, että valkoinen levisi", "Painele sivellin pyyhkeeseen lähes kuivaksi ja kuljeta sitä sisäreunaa pitkin"],
              ["Geeli kovettui ennen siistimistä", "Asiakkaan käsi oli maalatessa lampun lähellä, ja hajavalo alkoi kovettaa geeliä", "Pidä käsi poissa lampun luota; maalaa muutama kynsi ja koveta"],
              ["Valkoinen ei ole tarpeeksi valkoinen", "Ensimmäinen kerros on ohut, juuri niin kuin pitääkin", "Lisää ohut kerros samaa viivaa pitkin, siisti ja koveta"],
              ["Raita tai juovia ombressa", "Liian paksu valkoinen tai liian vähäinen häivytys", "Ohuet kerrokset, kevyt häivytys monessa kierroksessa, kovetus kynsi kerrallaan"],
              ["Ombren valkoinen liian lähellä kynsinauhaa", "Valkoinen levitettiin liian korkealle, ja häivytys vei sitä vielä ylemmäs", "Levitä valkoinen vain noin kynnen etummaiseen kolmannekseen"],
            ],
          },
        },
        { img: { src: img("loi-ombre-bi-vach-trang-ngang-mong"), alt: "Lähikuva epäonnistuneesta ombrekynnestä, jossa valkoinen päättyy kynnen keskellä rosoiseksi poikkiraidaksi eikä häivy", caption: "Esimerkki virheestä: paksu valkoinen kiireessä häivytettynä jättää raidan kynnen poikki." } },
      ],
    },
    {
      id: "turvallisuus-ja-siivous",
      title: "Geelin turvallinen käyttö ja pöydän siivous asiakkaan jälkeen",
      blocks: [
        {
          ul: [
            "Kovettumaton geeli ei koske ihoon. Jos sitä pääsee iholle, se pyyhitään pois ennen kuin käsi menee lamppuun.",
            "Kovetusajat ja tuotteiden käyttö noudattavat aina valmistajan ohjeita.",
            "Käytetyt sienet, vanut ja viilat menevät kannelliseen roskakoriin.",
            "Metalliset välineet viedään puhdistettaviksi ja steriloitaviksi oppitunnin [Välineet jokaisen asiakkaan jälkeen](lesson:ve-sinh-dung-cu) mukaan.",
            "Pyyhi siveltimet ja sulje geelipullot tiiviisti.",
          ],
        },
        { note: "Kynsituotteita koskevat määräykset vaihtelevat maittain, joten tarkista omaa toimintaasi koskevat vaatimukset. Artikkeli on koulutusmateriaali, ei pätevyystodistus.", kind: "warn", title: "Määräykset vaihtelevat" },
      ],
    },
    {
      id: "asiakastiedot",
      title: "Kirjaa asiakkaan ranskalainen, niin voit toistaa sen täsmälleen",
      blocks: [
        { p: "Ranskalaista käyttävä asiakas palaa yleensä yhdellä toiveella: samanlaiset kuin viimeksi. Kirjaa VaraaAissa ranskalaisen tyyli, syvyys ja pohjasävy [asiakastietoihin](lesson:khach-hang), niin ensi kerralla ei tarvitse arvata. Jos salongissasi ranskalainen ja ombre eivät vielä ole omia palveluitaan, [lisää ne](lesson:dich-vu) omalla kestollaan, jotta kalenteriin jää aikaa tehdä ne huolella, ja lisää hinnat salongin [hinnastoon](lesson:bang-gia)." },
      ],
    },
  ],
  howTo: {
    title: "Ranskalaisen manikyyrin ja ombren tekeminen vaihe vaiheelta",
    id: "ranskalainen-ja-ombre-vaiheet",
    after: "ennen-maalaamista",
    lead: "Vaiheet 1–8 tekevät klassisen ranskalaisen viivasiveltimellä. Vaiheet 9–12 ovat ombre, joka alkaa uudelleen pohjasta saman esikäsittelyn ja pohjageelin jälkeen.",
    supplies: [
      "Kynsinauhan työnnin, viila, hienojakoinen hiomapala, nukkaamattomat puhdistuslaput ja puhdistusneste",
      "Pohjageeli, päällysgeeli ja geelimerkin edellyttämä lamppu",
      "Läpikuultava tai hieman peittävä vaaleanpunainen tai nude-pohjageeli",
      "Valkoinen geeli kärkiin; ombreen maidonvalkoinen",
      "Pitkä ja ohut viivasivellin sekä pieni puhdas litteä sivellin",
      "Pieni sieni, yksi asiakasta kohden",
      "Kynsinauhaöljy",
    ],
    steps: [
      {
        name: "Esikäsittele kynnet kuivina ja muotoile ne ensin",
        text: "Pese ja desinfioi kädet ja katso asiakkaan kynnet ja iho tarkasti. Esikäsittely tehdään kuivana ilman liotusta: työnnä kynsinauha, poista ohut ihokalvo kynnen pinnalta, hio kiilto kevyesti pois ja pyyhi rasva. Viimeistele kynnen muoto nyt, koska hymyviiva seuraa sitä.",
      },
      {
        name: "Levitä pohjageeli ja ohut vaaleanpunainen pohja",
        text: "Ohut pohjageeli kärki suljettuna ja kovetus valmistajan ilmoittaman ajan. Sitten yksi tai kaksi ohutta läpikuultavaa vaaleanpunaista kerrosta, kukin kovetettuna erikseen. Jos asiakkaan luonnollinen kärkiviiva on vino, valitse hieman peittävämpi pohja sen peittämiseksi.",
      },
      {
        name: "Valitse hymyviiva koko sarjalle",
        text: "Katso kaikkia kymmentä kynttä ennen maalaamista. Valitse syvyys lyhimmän kynnen tai vinoimman kärkiviivan mukaan, jotta koko sarjasta saadaan yhtenäinen. Kuvittele jokaiseen kynteen kolme pistettä: kaksi yhtä syvää kulmaa ja matalin kohta keskellä.",
        image: { src: img("nhin-ca-ban-tay-truoc-khi-chon-duong-cuoi"), alt: "Asiakkaan käsi suorana kermanvärisellä tyynyllä, ranskalaiset kynnet ylhäältä katsottuna ja valkoiset kärjet samansyvyisinä", caption: "Pyydä asiakasta asettamaan käsi suoraksi ja katso ylhäältä: syvyyden pitää olla kaikissa kynsissä sama." },
      },
      {
        name: "Maalaa ensimmäinen puolisko kulmasta keskelle",
        text: "Ota viivasiveltimeen vähän valkoista geeliä, juuri sopivasti. Aseta sivellin kärjen kulmaan täsmälleen valitsemaasi pisteeseen ja vedä se kaarta pitkin kynnen keskelle. Pidä käsi vakaana ja käännä asiakkaan sormea kevyesti vedon mukana sen sijaan, että kääntäisit omaa rannettasi.",
        image: { src: img("ve-mong-french-tu-mot-goc-vao-giua"), alt: "Ohut viivasivellin mustaan käsineeseen puetussa kädessä kynnen kärjen kulmassa, hymyviivan ensimmäinen puolisko juuri maalattuna" },
      },
      {
        name: "Peilaa toisesta kulmasta ja täytä",
        text: "Aseta sivellin vastakkaiseen kulmaan täsmälleen yhtä syvälle kuin ensimmäinen ja vedä se keskelle, niin että puoliskot kohtaavat yhtenäisenä kaarena. Täytä valkoinen reunaan asti ja sivele kevyesti kärjen reunan yli. Pidä valkoinen ohuena; jos se ei ole tarpeeksi valkoinen, se hoidetaan seuraavalla kerroksella. Pikkusormessa valkoinen pienenee kynnen mukana, mutta silmälle syvyyden pitää näyttää samalta kuin muissa.",
        image: { src: img("ve-nua-con-lai-cua-duong-cuoi-french"), alt: "Ohut viivasivellin viimeistelee valkoisen kärjen toisen puoliskon, ja puoliskot kohtaavat keskellä tasapainoiseksi hymyviivaksi vaaleanpunaisen päällä", caption: "Kaksi puoliskoa kahdesta kulmasta, jotka kohtaavat keskellä toistensa peilikuvina." },
      },
      {
        name: "Siisti hymyviiva ennen kovetusta",
        text: "Kasta pieni litteä sivellin puhdistusnesteeseen ja painele sitä pyyhkeeseen, kunnes se on lähes kuiva, vain hieman kostea. Kuljeta sitä valkoisen sisäreunaa pitkin, jotta hymyviivasta tulee terävä ja tasainen, ja pyyhi sivellin jokaisen vedon jälkeen. Liian märkä sivellin saa valkoisen leviämään.",
        image: { src: img("lam-sach-duong-cuoi-bang-co-det"), alt: "Pieni vinokärkinen litteä sivellin kulkee ranskalaisen kynnen valkoisen kärjen sisäreunaa pitkin ja terävöittää hymyviivaa" },
      },
      {
        name: "Korjaa vino kynsi ja koveta",
        text: "Jos jokin kynsi tuli vinoon, korjaa se nyt: pyyhi sen valkoinen pois puhdistusnesteellä ja siveltimellä ja maalaa uudelleen. Älä koskaan koveta vinoa kynttä aikomuksena korjata se myöhemmin. Maalaa muutama kynsi ja koveta, älä koko kättä kerralla, ja pidä asiakkaan käsi maalatessa poissa lampun luota. Koveta koko aika; jos tarvitaan valkoisempaa, lisää vielä ohut kerros samaa viivaa pitkin, siisti ja koveta uudelleen.",
      },
      {
        name: "Levitä päällysgeeli ja tarkista kaikki kymmenen kynttä",
        text: "Peitä koko kynsi päällysgeelillä, sivele kärjen reunan yli ja koveta koko aika. Pyyhi tahmea pinta pois, jos päällysgeeli sellaisen jättää. Pyydä sitten asiakasta laskemaan kätensä suoraan ja katso ylhäältä: onko syvyys sama, ovatko kulmat tasapainossa? Korjaa poikkeava kynsi ennen kuin asiakas lähtee.",
      },
      {
        name: "Ombre: levitä pohja ja valkoinen kärkeen",
        text: "Esikäsittely ja pohjageeli täsmälleen kuten ranskalaisessa. Levitä hyvin ohut kerros vaaleanpunaista tai nudea ja koveta. Levitä valkoinen vain noin kynnen etummaiseen kolmannekseen ohuena kerroksena; sen ei tarvitse vielä näyttää hyvältä. Älä tuo valkoista lähelle kynsinauhaa, koska häivytys vie sitä vielä ylemmäs.",
        image: { src: img("dat-gel-trang-o-dau-mong-lam-ombre"), alt: "Lähikuva vaaleanpunaisesta kynnestä, jonka etummaiseen kolmannekseen on juuri levitetty valkoista geeliä ja jonka sisäreuna on vielä suora ja häivyttämätön", caption: "Ennen häivytystä valkoinen on vain noin kynnen etummaisessa kolmanneksessa." },
      },
      {
        name: "Häivytä kynsi kerrallaan",
        text: "Aseta puhdas, lähes kuiva litteä sivellin kohtaan, jossa valkoinen kohtaa vaaleanpunaisen, ja vedä hyvin lyhyitä ja kevyitä vetoja kohti kynsinauhaa. Tai taputtele värin vaihtumiskohtaa pienellä sienellä kevyesti monta kertaa. Kummassakin tavassa tehdään yksi kynsi kerrallaan ja kovetetaan heti häivytyksen jälkeen, jotta väri ei ehdi valua takaisin raidaksi.",
        image: { src: img("tan-mau-ombre-bang-co-det"), alt: "Pieni litteä sivellin mustaan käsineeseen puetussa kädessä vetää lyhyitä vetoja valkoisesta kärjestä kohti kynsinauhaa vaaleanpunaisen pohjan päällä" },
      },
      {
        name: "Koveta, tarkista ja lisää ohut kerros tarvittaessa",
        text: "Katso kovetuksen jälkeen, onko värin vaihtuminen pehmeä ja kärki tarpeeksi valkoinen. Jos ei, lisää uusi ohut kerros, aseta valkoinen hieman alemmas kuin edellisellä kerralla, häivytä ja koveta. Yleensä kaksi tai kolme ohutta kerrosta näyttää kauniilta. Raita tai juovat tarkoittavat, että kerros oli liian paksu tai sitä ei häivytetty tarpeeksi.",
      },
      {
        name: "Päällysgeeli, kynsinauhaöljy ja siivous",
        text: "Levitä päällysgeeli, koveta koko aika ja tiputa kynsinauhaöljyä kynsien ympärille. Tarkista vielä kaikki kymmenen kynttä: värin liukuman pitää näyttää samalta jokaisessa. Kun asiakas on lähtenyt, laita käytetyt sienet, vanut ja viilat kannelliseen roskakoriin, vie metalliset välineet puhdistettaviksi ja steriloitaviksi, pyyhi siveltimet ja sulje geelipullot tiiviisti.",
      },
    ],
  },
  faq: [
    {
      q: "Mistä ranskalaisen kärjen maalaaminen aloitetaan?",
      a: "Aloita kärjen toisesta kulmasta ja vedä sivellin kaarta pitkin keskelle. Aseta sitten sivellin vastakkaiseen kulmaan samalle syvyydelle ja vedä keskelle, niin että puoliskot kohtaavat. Kun maalaat molemmista kulmista keskelle, hymyviivan puoliskoista tulee toistensa peilikuvat.",
    },
    {
      q: "Miten hymyviivasta saa terävän?",
      a: "Siisti hymyviiva ennen kovetusta, kun geeli on vielä pehmeää. Kasta pieni litteä sivellin puhdistusnesteeseen, painele se pyyhkeeseen lähes kuivaksi, kuljeta sitä valkoisen sisäreunaa pitkin ja pyyhi sivellin jokaisen vedon jälkeen. Liian märkä sivellin saa valkoisen leviämään.",
    },
    {
      q: "Miten vino ranskalainen kärki korjataan?",
      a: "Korjaa se ennen kovetusta: pyyhi kynnen valkoinen pois puhdistusnesteellä ja siveltimellä ja maalaa uudelleen. Kovettunut geeli pitää hioa pois, mikä vie aikaa ja ohentaa pohjaa, joten vinoa kynttä ei koveteta myöhemmin korjattavaksi.",
    },
    {
      q: "Montako valkoista kerrosta ombre tarvitsee?",
      a: "Yleensä kaksi tai kolme ohutta kerrosta. Joka kerralla valkoinen levitetään kärkeen, häivytetään ylöspäin ja kovetetaan; jokainen uusi kerros asetetaan hieman alemmas kuin edellinen. Kovetusajat noudattavat geelimerkin ohjetta.",
    },
    {
      q: "Miksi ombrekynnessä näkyy valkoinen raita?",
      a: "Valkoinen on liian paksu tai sitä ei ole häivytetty tarpeeksi vähitellen. Hyvä ombre syntyy ohuesta valkoisesta ja monesta kevyestä häivytyskierroksesta. Tee kynsi kerrallaan ja koveta heti häivytyksen jälkeen, jottei väri valu takaisin raidaksi.",
    },
    {
      q: "Kumpi on parempi ombren häivytykseen, sivellin vai sieni?",
      a: "Molemmat toimivat. Puhtaalla, lähes kuivalla litteällä siveltimellä vedetään lyhyitä, kevyitä vetoja kohti kynsinauhaa, ja sivellin pyyhitään usein. Sienellä taputellaan värin vaihtumiskohtaa kevyesti monta kertaa, ja jokaiselle asiakkaalle otetaan uusi sieni, joka heitetään käytön jälkeen pois.",
    },
  ],
  related: ["french-ombre-hieu-dung", "son-gel", "dua-form-mong", "builder-gel"],
};

export default article;
