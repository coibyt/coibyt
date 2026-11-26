import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/rua-tay-gang-tay/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "kasihygienia-ja-kasineet-kauneushoitolassa",
  lesson: "rua-tay-gang-tay",
  category: "safety",
  title: "Käsihygienia kauneushoitolassa: käsienpesu, käsidesi ja oikeat käsineet",
  metaTitle: "Käsihygienia kauneushoitolassa: pesu, desi ja käsineet",
  metaDescription:
    "Käsihygienia kauneushoitolassa: käsienpesu ja käsidesi ennen jokaista asiakasta, nitriili-, vinyyli- vai lateksikäsineet, vaihto, riisuminen ja suojaimet.",
  keyword: "käsihygienia kauneushoitolassa",
  keywords: [
    "nitriilikäsineet vai vinyylikäsineet",
    "lateksiallergia käsineet",
    "oikea käsienpesu",
    "käsineiden riisuminen oikein",
    "kauanko käsidesiä hierotaan",
    "FFP2-maski kynsipöly",
    "ärsytysihottuma käsissä",
  ],
  excerpt: "Käsineet eivät korvaa käsienpesua. Näin peset ja desinfioit kädet, valitset ja vaihdat käsineet, riisut ne oikein ja pidät huolta omasta ihostasi.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-lam-dep-deo-gang-tay-nitrile-ben-bon-rua-tay"),
    alt: "Lyhythihaiseen kermanväriseen paitaan pukeutunut kauneudenhoitaja seisoo valkoisen kivialtaan vieressä ja vetää mustaa nitriilikäsinettä käteensä",
  },
  takeaways: [
    "**Käsineet eivät korvaa käsienpesua.** Käsine on lisäsuoja valmiiksi pestyjen ja desinfioitujen käsien päällä.",
    "Pese kädet saippualla noin 40–60 sekuntia, kuivaa kertakäyttöpyyhkeellä ja desinfioi ennen jokaista asiakasta ja ennen käsineiden pukemista.",
    "Kolmesta yleisestä käsinetyypistä **nitriili** on yleensä paras: kestävämpi kuin vinyyli, suojaa paremmin kemikaaleilta eikä sisällä luonnonkumia.",
    "Jokaiselle asiakkaalle uusi pari. Vaihda heti, kun käsine repeää, siihen tulee geeliä tai asetonia tai sillä on koskettu puhelimeen, ovenkahvaan, lamppuun tai hiuksiin.",
    "Kuiva, halkeileva iho on allergian portti: haalea vesi, kädet täysin kuiviksi ennen käsineitä ja hajusteeton käsivoide.",
  ],
  intro: [
    "Käsihygienia kauneushoitolassa näkyy asiakkaalle yleensä vain käsineinä, ja niitä pidetään puhtaan liikkeen merkkinä. Aamulla puetut käsineet, joilla on hoidettu asiakas toisensa perään, vastattu puhelimeen, avattu ovi ja otettu vastaan käteistä, ovat kuitenkin yhtä likaiset kuin pesemätön käsi. Käsineistä on hyötyä vain, kun kädet niiden sisällä ovat puhtaat ja käsineet vaihdetaan oikealla hetkellä.",
    "Artikkeli perustuu VaraaAi Academyn Hygienia ja turvallisuus -kurssin oppituntiin ”Käsihygienia, käsineet ja suojaimet”. Luettuasi tiedät, milloin ja miten kädet pestään, mitkä käsineet kannattaa valita, milloin ne vaihdetaan ja miten ne riisutaan, milloin tarvitaan maski ja suojalasit sekä miten pidät oman käsiesi ihon kunnossa vuosien ajan.",
  ],
  sections: [
    {
      id: "kasineet-eivat-korvaa-pesua",
      title: "Miksi kädet pestään, vaikka käytät käsineitä",
      blocks: [
        { p: "Kädet ovat tekijän eniten käytetty työväline ja samalla yksi tärkeimmistä reiteistä, joita pitkin taudinaiheuttajat kulkevat asiakkaalta toiselle. Käsine ei katkaise tätä reittiä, jos käsi sen sisällä ei ole puhdas tai jos käsineen ulkopinta on koskenut kaikkeen mahdolliseen työalueen ulkopuolella." },
        { p: "Harva tulee ajatelleeksi vielä yhtä syytä. Käsineen sisällä kädet ovat lämpimät ja kosteat, joten bakteerit lisääntyvät hyvin nopeasti. Siksi kädet pestään ennen kuin käsineet puetaan, ja ne pestään tai desinfioidaan uudelleen, kun käsineet riisutaan." },
        { h3: "Milloin kädet pestään" },
        {
          ul: [
            "Ennen jokaista asiakasta ja jokaisen asiakkaan jälkeen.",
            "Ennen käsineiden pukemista ja niiden riisumisen jälkeen.",
            "WC-käynnin ja ruokailun jälkeen.",
            "Kun olet koskenut roskiin tai likaisiin välineisiin.",
          ],
        },
        { p: "Helsingin kaupungin hygieniaohje, josta oppitunnin esimerkit ovat, sanoo asian suoraan: pese kädet saippualla ja desinfioi ne sitten ennen jokaista hoitoa ja ennen kuin puet käsineet. Helsinkiläiselle salongille tämä on oman kaupungin ohje." },
        { img: { src: img("thao-nhan-dong-ho-truoc-khi-rua-tay"), alt: "Naisen käsi riisuu kultasormusta pesualtaan ääressä, kello ja rannekoru jo pienessä posliinikulhossa kivitasolla", caption: "Sormukset, kello ja rannekorut otetaan pois ennen työpäivää, ei jokaisen pesun alla." } },
        { note: "Riisu sormukset, kello ja rannekorut ennen töitä. Bakteerit piiloutuvat niiden alle, minne vesi ja saippua eivät ulotu, ja sormukset repivät käsineitä. Pidä omat kyntesi lyhyinä ja puhtaina. Jos sinulla on pitkät kynnet tai rakennekynnet, harjaa kynsien alus huolellisesti joka pesulla.", kind: "info", title: "Katso käsiäsi ennen pesua" },
      ],
    },
    {
      id: "kasineiden-valinta",
      title: "Nitriili-, vinyyli- vai lateksikäsineet: mikä sopii salonkiin",
      blocks: [
        { p: "Kauneusalalla käytettävät kolme kertakäyttökäsinetyyppiä eroavat materiaaliltaan, ja materiaali ratkaisee kaksi asiaa: kuinka helposti käsine aiheuttaa allergiaa ja kuinka hyvin se pidättelee kemikaaleja." },
        { img: { src: img("gang-tay-latex-vinyl-nitrile"), alt: "Kolme paria kertakäyttökäsineitä rinnakkain valkoisella kivitasolla: kermanvaaleat lateksikäsineet, läpinäkyvät vinyylikäsineet ja mustat nitriilikäsineet", caption: "Vasemmalta: lateksi-, vinyyli- ja nitriilikäsineet." } },
        {
          table: {
            head: ["Käsine", "Vahvuus", "Heikkous"],
            rows: [
              ["Lateksi (luonnonkumi)", "Istuu tiiviisti", "Voi allergisoida tekijän ja asiakkaan, joten moni salonki on luopunut siitä"],
              ["Vinyyli", "Halpa", "Väljä, repeää helposti, suojaa huonosti kemikaaleilta"],
              ["Nitriili", "Kestävämpi, suojaa paremmin kemikaaleilta, ei luonnonkumia", "Suojaa silti vain lyhyen aikaa"],
            ],
          },
        },
        { p: "Kynsi- ja ripsityössä ja muissa kemikaaleja käyttävissä palveluissa nitriili on yleensä paras valinta. Mikään kertakäyttökäsine ei kuitenkaan pidättele kemikaaleja ikuisesti. Geeli, akryylineste ja liima imeytyvät hitaasti ohuen käsineen läpi muutamassa minuutissa tai muutamassa kymmenessä minuutissa, vaikka käsine olisi täysin ehjä. Asetoni pääsee läpi vielä nopeammin. Helsingin ohjeessakin todetaan, että kertakäyttökäsineet suojaavat vain lyhyen aikaa." },
        { note: "Käsine, jossa on geeliä tai joka on kastunut asetonista, vaihdetaan heti. Sitä ei pyyhitä ja jatketa. Läpi imeytynyt kemikaali on ihoasi vasten koko loppuhoidon ajan, ja juuri toistuva altistus johtaa allergiaan. Oppitunti [Allergiat ja kemikaalit](lesson:di-ung-hoa-chat) kertoo, miten se tapahtuu.", kind: "warn", title: "Ehjäkin käsine voi jo päästää läpi" },
      ],
    },
    {
      id: "kasineiden-vaihto",
      title: "Milloin käsineet vaihdetaan ja miten ne riisutaan oikein",
      blocks: [
        { p: "Perussääntö on uusi pari jokaiselle asiakkaalle. Lisäksi käsineet vaihdetaan kesken hoidon, kun:" },
        {
          ul: [
            "käsine repeää tai siihen tulee reikä;",
            "siihen tulee geeliä, liimaa tai akryylinestettä tai se kastuu asetonista;",
            "olet koskenut käsineellä johonkin työalueen ulkopuolella, kuten puhelimeen, ovenkahvaan, lamppuun tai omiin hiuksiisi.",
          ],
        },
        { img: { src: img("deo-gang-tay-cam-dien-thoai-la-sai"), alt: "Mustaan nitriilikäsineeseen puettu käsi pitelee puhelinta, kun toinen käsi lepää yhä asiakkaan kädellä käsityynyn päällä", caption: "Esimerkki väärästä tavasta: puhelimeen koskenut käsine on likainen ja vaihdetaan ennen kuin työtä jatketaan." } },
        { p: "Helsingin ohjeen esimerkki on hyvin arkinen: jos kurotat kesken hoidon säätämään lamppua, vaihdat käsineet. Kertakäyttökäsineitä ei koskaan pestä eikä suihkuteta alkoholilla uudelleenkäyttöä varten." },
        { h3: "Käsineiden riisuminen niin, ettei likainen puoli koske ihoon" },
        { p: "Käytetyn käsineen ulkopinta on likainen puoli. Tavoite on, että paljas iho koskee vain sisäpintaan." },
        {
          ol: [
            "Nipistä toisen käsineen ulkopintaa ranteen kohdalta ja vedä se pois niin, että se kääntyy nurin.",
            "Pidä riisuttu käsine siinä kädessä, jossa käsine on vielä.",
            "Työnnä paljas sormi toisen käsineen suun sisään, koske vain sisäpintaan ja vedä käsine pois niin, että ensimmäinen jää sen sisään.",
            "Laita molemmat roskiin ja pese tai desinfioi kädet.",
          ],
        },
        { img: { src: img("cach-thao-gang-tay-nhum-mat-ngoai"), alt: "Kaksi mustiin nitriilikäsineisiin puettua kättä, joista toinen nipistää toisen käsineen ulkopintaa ranteen kohdalta", caption: "Ensimmäinen vaihe: nipistä ulkopintaa ranteesta ja vedä käsine nurin päin pois." } },
        { img: { src: img("cach-thao-gang-tay-luon-ngon-vao-mat-trong"), alt: "Paljas käsi työntää kaksi sormea jäljellä olevan mustan käsineen suun sisään, käsineinen käsi puristaa riisuttua käsinettä", caption: "Kolmas vaihe: paljaat sormet koskevat vain käsineen sisäpintaan." } },
      ],
    },
    {
      id: "maskit-suojalasit-tyovaatteet",
      title: "Maski, suojalasit ja työvaatteet",
      blocks: [
        { p: "Kun viilaat ja jyrsit, pöly nousee suoraan kasvojesi eteen. Tärkeintä on **kohdepoisto työpöydässä**, koska se poistaa pölyn heti siellä, missä sitä syntyy, ennen kuin se ehtii nousta. Maski on vasta toinen suojakerros, ja jokainen maskityyppi pysäyttää eri asian." },
        {
          table: {
            head: ["Mitä pitää pysäyttää", "Miten suojaudut"],
            rows: [
              ["Roiskeet ja karkea pöly", "Tavallinen kirurginen suu-nenäsuojus"],
              ["Hieno viilaus- ja jyrsintäpöly", "Pöydän kohdepoisto ja tiiviisti istuva hiukkassuojain (esimerkiksi FFP2)"],
              ["Kemikaalihöyryt", "Ilmanvaihto. Maski ei pysäytä höyryjä"],
              ["Kynnenpalat, asetoni tai desinfiointiaine silmiin", "Suojalasit jyrsiessä, kynsiä leikatessa, asetonia kaataessa ja desinfiointiainetta laimentaessa"],
            ],
          },
        },
        { img: { src: img("kinh-bao-ho-khau-trang-loc-bui-khi-mai-mong"), alt: "Kynsiteknikko suojalaseissa ja hiukkassuojaimessa jyrsii asiakkaan kynttä pölynpoistoaukon yläpuolella" } },
        { p: "Myös työvaatteet ovat suojavarusteita. Helsingin ohjeen mukaan kangas on sileää ja helposti pestävää, paksuja ja huokoisia neuleita ei käytetä, ja vaatteet vaihdetaan usein. Ihoa rikkovissa hoidoissa työvaatteet vaihdetaan tarvittaessa ja vähintään päivittäin. Hiukset kiinni ja hihat lyhyinä." },
        { p: "Pöly ja höyryt koskevat koko liikettä, eivät yhtä pöytää. Ilmanvaihdosta ja siivouksesta kerrotaan oppitunnilla [Liikkeen päivittäinen siivous ja omavalvontasuunnitelma](lesson:ve-sinh-tiem)." },
      ],
    },
    {
      id: "oma-iho",
      title: "Pidä huolta oman käsiesi ihosta",
      blocks: [
        { p: "Jatkuva käsienpesu ja pitkät tunnit käsineissä kuivattavat ihoa. Se punoittaa ja lopulta halkeilee. Lääkärit kutsuvat tätä ärsytysihottumaksi. Kyse ei ole vain ulkonäöstä: rikkinäisen ihon läpi kemikaalit pääsevät paljon helpommin, ja allergia alkaa usein juuri siitä." },
        {
          ul: [
            "Pese haalealla vedellä, älä kuumalla.",
            "Kuivaa kädet täysin ennen kuin puet käsineet.",
            "Käytä hajusteetonta käsivoidetta tauoilla ja työpäivän jälkeen.",
            "Kun kädet eivät ole näkyvästi likaiset, käsidesi on yleensä iholle hellävaraisempi kuin jatkuva saippuapesu.",
          ],
        },
        { note: "Jos käsien iho pysyy punaisena, kutisevana tai halkeilevana eikä parane, hakeudu ajoissa lääkäriin. Terveet kädet ovat se, mikä antaa sinun tehdä tätä työtä pitkään.", kind: "warn", title: "Älä sinnittele" },
      ],
    },
    {
      id: "maaraykset-ja-tavat",
      title: "Määräykset vaihtelevat, yhteiset tavat tarvitaan joka liikkeessä",
      blocks: [
        { p: "Artikkelin esimerkit ovat Helsingin kaupungin ohjeesta, joka on mainittu lähteenä artikkelin lopussa. Muissa kunnissa ja maissa vaatimukset voivat olla erilaiset, joten tarkista oman liikkeesi tarkat määräykset paikalliselta terveydensuojeluviranomaiselta." },
        { p: "Käsienpesusta ja käsineiden vaihdosta tulee tapa vasta, kun koko liike toimii samalla tavalla. Jos hoidat salonkia VaraaAilla, voit käyttää [tiimin työtilaa](lesson:tien-ich-nhom) tiedotteisiin ja henkilökunnan koulutukseen yhteisistä säännöistä ja seurata käsineitä, paperipyyhkeitä ja käsidesiä [varastossa](lesson:kho-hang), jottei kenenkään tarvitse käyttää samaa paria uudelleen loppuneen laatikon takia. Hygienian toinen puolisko, välineiden käsittely jokaisen asiakkaan jälkeen, on oppitunnilla [Välineet jokaisen asiakkaan jälkeen: työvaiheet](lesson:ve-sinh-dung-cu)." },
      ],
    },
  ],
  howTo: {
    title: "Oikea käsienpesu ja käsien desinfiointi ennen jokaista asiakasta",
    id: "kasienpesu",
    after: "kasineet-eivat-korvaa-pesua",
    lead: "Pesu kestää noin 40 sekunnista minuuttiin. Järjestys etenee helpoista kohdista niihin, jotka unohtuvat useimmin.",
    supplies: [
      "Pesuallas, juokseva vesi ja saippua",
      "Kertakäyttöiset paperipyyhkeet",
      "Käsihuuhde",
    ],
    steps: [
      {
        name: "Kastele kädet ja ota saippuaa",
        text: "Kastele molemmat kädet ja ota saippuaa. Hiero kämmeniä vastakkain, kunnes saippua vaahtoaa, ja hiero sitten kummankin käden kämmenselkä.",
      },
      {
        name: "Pese sormien välit",
        text: "Pujota sormet lomittain ja hiero edestakaisin, jotta saippua pääsee sormien väleihin. Pelkkä juokseva vesi ei puhdista näitä kohtia.",
      },
      {
        name: "Tartu peukaloon ja kierrä",
        text: "Tartu peukaloon toisella kädellä ja kierrä, sitten vaihda puolta. Peukalo unohtuu pesussa useimmin, vaikka se koskee välineisiin ja asiakkaaseen siinä missä muutkin sormet.",
        image: { src: img("rua-tay-dung-cach-xoay-ngon-cai"), alt: "Kaksi saippuavaahtoista kättä pesualtaan yllä, toinen käsi puristaa toisen käden peukaloa ja kiertää sitä", caption: "Ota peukalo toisen käden kämmenen sisään ja kierrä." },
      },
      {
        name: "Puhdista sormenpäät ja kynsien alustat",
        text: "Kokoa sormenpäät yhteen ja hiero niitä pyörivin liikkein vastakkaista kämmentä vasten, niin sormenpäät ja kynsien alustat puhdistuvat. Jos sinulla on pitkät kynnet tai rakennekynnet, tee tämä vaihe erityisen huolellisesti.",
      },
      {
        name: "Pese ranteet ja huuhtele",
        text: "Hiero kummankin ranteen ympäri. Huuhtele sitten kädet huolellisesti juoksevan veden alla, kunnes saippua on kokonaan poissa.",
      },
      {
        name: "Kuivaa huolellisesti ja sulje hana paperilla",
        text: "Kuivaa kädet kertakäyttöisellä paperipyyhkeellä, koska märät kädet levittävät bakteereja paljon enemmän kuin kuivat. Sulje hana samalla paperilla, jotta juuri pestyt kädet eivät koske siihen uudelleen. Älä koskaan kuivaa käsiä kangaspyyhkeeseen, jota koko salonki käyttää.",
        image: { src: img("khoa-voi-nuoc-bang-giay-lau-tay"), alt: "Käsi sulkee messinginvärisen hanan valkoisella paperipyyhkeellä, altaan vieressä pino kertakäyttöisiä paperipyyhkeitä" },
      },
      {
        name: "Hiero käsihuuhdetta, kunnes kädet ovat kuivat",
        text: "Ota niin paljon ainetta, että molemmat kädet kastuvat kokonaan, ja hiero samoin liikkein kuin pestessä, kunnes kädet ovat täysin kuivat. Se kestää yleensä noin 30 sekuntia, mutta noudata aina tuotteen etiketissä mainittua aikaa. Näkyvästi likaiset kädet pestään ensin, koska käsidesi ei poista likaa.",
        image: { src: img("sat-khuan-tay-xoa-den-khi-kho"), alt: "Kaksi paljasta kättä hieroo käsihuuhdetta kivitason yllä, vieressä läpinäkyvä etiketitön pumppupullo" },
      },
    ],
  },
  faq: [
    {
      q: "Pitääkö kädet pestä, jos käyttää käsineitä?",
      a: "Pitää. Käsineet eivät korvaa käsienpesua, vaan ne ovat lisäsuoja puhtaiden käsien päällä. Pese ja desinfioi kädet ennen käsineiden pukemista ja pese tai desinfioi ne uudelleen riisumisen jälkeen, koska käsineen sisällä lämpimissä ja kosteissa käsissä bakteerit lisääntyvät nopeasti.",
    },
    {
      q: "Nitriilikäsineet vai vinyylikäsineet kynsiteknikolle?",
      a: "Nitriili on yleensä paras valinta: se on kestävämpi, suojaa paremmin kemikaaleilta eikä sisällä luonnonkumia. Vinyylikäsineet ovat halpoja, mutta väljiä, ne repeävät helposti ja suojaavat huonosti kemikaaleilta. Lateksikäsineet voivat aiheuttaa allergiaa sekä tekijälle että asiakkaalle.",
    },
    {
      q: "Voiko kertakäyttökäsineet desinfioida ja käyttää uudelleen?",
      a: "Ei voi. Kertakäyttökäsineitä ei pestä eikä suihkuteta alkoholilla uudelleenkäyttöä varten. Jokaiselle asiakkaalle otetaan uusi pari, ja käsineet vaihdetaan heti, kun ne repeävät, niihin tulee geeliä tai asetonia tai niillä on koskettu puhelimeen, ovenkahvaan, lamppuun tai hiuksiin.",
    },
    {
      q: "Miksi ehjä käsine vaihdetaan, jos siihen tulee geeliä tai asetonia?",
      a: "Koska kertakäyttökäsine suojaa vain lyhyen aikaa. Geeli, akryylineste, liima ja varsinkin asetoni imeytyvät ohuen käsineen läpi iholle, vaikka käsine olisi ehjä. Pyyhkiminen ei poista sitä, mikä on jo imeytynyt.",
    },
    {
      q: "Kauanko käsiä pestään ja käsidesiä hierotaan?",
      a: "Saippuapesu kestää noin 40–60 sekuntia, jotta kämmenet, kämmenselät, sormien välit, peukalot, sormenpäät ja ranteet tulevat pestyiksi. Käsihuuhdetta hierotaan, kunnes kädet ovat täysin kuivat, yleensä noin 30 sekuntia ja aina tuotteen etiketin mukaan.",
    },
    {
      q: "Suojaako kirurginen maski kynsipölyltä ja kemikaalihöyryiltä?",
      a: "Tavallinen kirurginen suu-nenäsuojus pysäyttää vain roiskeet ja karkean pölyn. Hienoon pölyyn tarvitaan pöydän kohdepoisto ja tiiviisti istuva hiukkassuojain, kuten FFP2. Kemikaalihöyryjä maski ei pysäytä lainkaan, niihin auttaa vain ilmanvaihto.",
    },
  ],
  related: ["ve-sinh-dung-cu", "di-ung-hoa-chat", "ve-sinh-tiem", "xu-ly-su-co"],
};

export default article;
