import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cham-soc-mong-co-ban/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "manikyyri-ja-pedikyyri-ohje",
  lesson: "cham-soc-mong-co-ban",
  category: "nail",
  title: "Manikyyri ja pedikyyri ohje: 14 vaihetta konsultaatiosta jalkakylvyn puhdistukseen",
  metaTitle: "Manikyyri ja pedikyyri ohje: 14 vaihetta tavallisella lakalla",
  metaDescription:
    "Manikyyri ja pedikyyri vaihe vaiheelta: vanhan lakan poisto, muotoilu, kynsinauhat, aluslakka ja kaksi värikerrosta, jalkakylpy, varpaankynnet ja hygienia.",
  keyword: "manikyyri ja pedikyyri ohje",
  keywords: ["manikyyri vaihe vaiheelta", "pedikyyri vaihe vaiheelta", "kynsilakan poisto oikein", "kynsinauhojen työntäminen", "kynsien lakkaus tavallisella lakalla", "varpaankynsien leikkaus suoraan", "jalkojen liotus pedikyyrissä"],
  excerpt: "Manikyyri ja sen jälkeen pedikyyri tavallisella lakalla vaihe vaiheelta: lakan poisto, viilaus, kynsinauhat, lakkaus, jalkakylpy, suora leikkaus, kovettumien tasoitus ja hygienia asiakkaan jälkeen.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-nail-cham-soc-mong-chan-cho-khach-tai-salon"),
    alt: "Kermanväriseen paitaan ja mustiin käsineisiin pukeutunut kynsiteknikko istuu matalalla jakkaralla ja tekee pedikyyriä nojatuolissa istuvalle asiakkaalle pariisilaistyylisessä salongissa",
  },
  takeaways: [
    "Kolme asiaa pätee koko ajan: **elävää ihoa ei leikata**, **varpaankynnet leikataan suoraan poikki** ja kaikki, mikä koskee asiakkaaseen, on puhdasta.",
    "Vanha lakka poistetaan pitämällä poistoaineella kostutettua vanulappua kynnellä muutama sekunti ja pyyhkäisemällä yhteen suuntaan tyvestä kärkeen, ei edestakaisin.",
    "Tavallinen lakka: ohut aluslakka, kaksi ohutta värikerrosta ja päällyslakka. Jokainen kerros saa asettua ennen seuraavaa.",
    "Pedikyyri: desinfioitu allas, uusi suojapussi, lyhyt liotus ja pienet suorat leikkaukset, ei koskaan kulmiin.",
    "Kovettumia tasoitetaan vain muutamalla kevyellä vedolla hienolla jalkaraspilla: ei teriä, ei höylää.",
  ],
  intro: [
    "Manikyyri ja pedikyyri tavallisella lakalla on ensimmäinen työjärjestys, joka jokaisen kynsialan opiskelijan pitää osata ulkoa, ja samalla palvelu, jonka asiakkaat varaavat säännöllisimmin. Tämä ohje kulkee vaihe vaiheelta. Lamppua ja geeliä ei ole, joten kaikki riippuu puhtaista käsistä, ohuista lakkakerroksista ja kärsivällisyydestä antaa jokaisen kerroksen asettua.",
    "Artikkeli perustuu VaraaAi Academyn Kynnet-kurssin oppituntiin ”Manikyyri ja pedikyyri: vaihe vaiheelta”. Seitsemän ensimmäistä vaihetta ovat manikyyri, seuraavat seitsemän pedikyyri, ja lopuksi jalkakylpy puhdistetaan asiakkaan lähdettyä. Katso ensin oppitunnin video alta ja käytä artikkelia sitten tarkistuslistana harjoitellessasi.",
  ],
  sections: [
    {
      id: "kolme-saantoa",
      title: "Kolme sääntöä ennen manikyyriä tai pedikyyriä",
      blocks: [
        {
          ol: [
            "**Elävää ihoa ei leikata.** Pihdeillä leikataan vain irronneet kuolleet ihonpalat, vaikka asiakas pyytäisi leikkaamaan syvemmältä.",
            "**Varpaankynnet leikataan suoraan poikki.** Ei koskaan syvälle kulmiin, eikä kulmiin kaiveta.",
            "**Kaikki, mikä koskee asiakkaaseen, on puhdasta.** Pestyt ja desinfioidut kädet, metalliset välineet sterilointipussista ja uusi suojapussi jalkakylvyssä.",
          ],
        },
        { p: "Näiden kolmen säännön perustelut sekä työskentely diabeetikoiden ja kovettumien kanssa selitetään teoria-artikkelissa [perusmanikyyri ja -pedikyyri](lesson:cham-soc-mong-co-ban-hieu-dung). Tämä artikkeli keskittyy käsien työhön." },
        { note: "Tavallisen lakan kanssa sormenpäiden lyhyt liotus lämpimässä vedessä ihon pehmentämiseksi on hyvä. Geelissä on toisin: kynnet esikäsitellään kuivina ilman liotusta, kuten [geelilakkauksen ohje](lesson:son-gel) kertoo.", kind: "info", title: "Tavallinen lakka ja geeli esikäsitellään eri tavoin" },
      ],
    },
    {
      id: "tavallinen-lakkaus",
      title: "Kynsien lakkaus tavallisella lakalla tasaisesti ja siististi",
      blocks: [
        { p: "Tavallinen lakka kuivuu ilmassa, joten kerroksen paksuus ratkaisee lähes kaiken. Paksu lakka kuivuu hitaasti, painuu helposti ja tahraantuu helposti." },
        {
          table: {
            head: ["Mitä näet", "Tavallinen syy", "Korjaus"],
            rows: [
              ["Lakka ei tartu ja lohkeaa pian", "Hieronnan jälkeen kynteen jäi voidetta ja öljyä", "Pyyhi jokainen kynsi nukkaamattomalla liinalla ja puhdistusnesteellä, myös sivut ja kärki"],
              ["Kuivuu hitaasti ja painuu", "Liian paksut kerrokset", "Kaksi ohutta värikerrosta, ja jokainen saa asettua ennen seuraavaa"],
              ["Lakkaa iholla", "Sivellin meni liian lähelle ihoa", "Jätä tyveen pieni rako; siisti reuna poistoaineeseen kastetulla vanupuutikulla"],
              ["Vanha lakka levisi kulmiin", "Lappua hangattiin edestakaisin", "Pidä lappua kynnellä muutama sekunti ja pyyhkäise yhteen suuntaan; kulmat vanupuutikulla"],
              ["Lommoja asiakkaan lähdettyä", "Pinta on kuiva, mutta alta lakka on pehmeä muutaman tunnin", "Muistuta asiakasta ennen kuin hän lähtee pöydästä"],
            ],
          },
        },
        { note: "Kuivumista voi nopeuttaa tiputtamalla jokaiselle kynnelle tipan pikakuivatetta, kun asiakas lepää kädet paikallaan.", kind: "tip", title: "Kun lakka kuivuu" },
      ],
    },
    {
      id: "milloin-lopettaa",
      title: "Merkit, joiden takia lopetetaan ennen jalkojen liotusta",
      blocks: [
        { p: "Ennen kuin asiakkaan jalat menevät altaaseen, katso niitä tarkasti. Kyse ei ole muodollisuudesta: jotkin asiat näkyvät vain, kun iho on vielä kuiva." },
        {
          ul: [
            "Varvasvälien iho on halkeillut, punainen tai valkoinen ja hautunut.",
            "Haavat tai haavaumat.",
            "Kynnet ovat paksuuntuneet, värjäytyneet tai kasvaneet ihoon.",
          ],
        },
        { p: "Jos näet näitä merkkejä, älä käsittele sitä aluetta, vaan neuvo asiakasta käymään lääkärissä tai jalkojenhoitajalla. Sama koskee hyvin paksua kovettumaa tai syviä halkeamia. Oppitunti [Milloin hoitoa ei tehdä](lesson:khi-nao-khong-lam) antaa koko listan." },
        { note: "Kysy diabeteksesta jo konsultaatiossa. Diabeetikolle liotus pidetään lyhyenä ja vesi vain haaleana. Liotusajat ja tuotteiden käyttö noudattavat aina tuotteen ohjetta.", kind: "warn", title: "Diabeetikkoasiakkaat" },
      ],
    },
    {
      id: "hygienia-asiakkaan-jalkeen",
      title: "Hygienia jokaisen asiakkaan jälkeen: allas, välineet ja kertakäyttötarvikkeet",
      blocks: [
        {
          table: {
            head: ["Väline", "Mitä tehdään asiakkaan lähdettyä"],
            rows: [
              ["Suojapussi", "Otetaan pois ja heitetään roskiin"],
              ["Jalkakylpy", "Puhdistetaan ja desinfioidaan sitten tuotteen ilmoittaman koko vaikutusajan"],
              ["Viilat, vanut, varvaserottimet ja muut kertakäyttöiset", "Roskiin"],
              ["Pihdit ja työntimet", "Pestään ja steriloidaan"],
            ],
          },
        },
        { img: { src: img("bo-tui-lot-bon-ngam-chan-sau-khach"), alt: "Kaksi mustiin käsineisiin puettua kättä nostaa käytetyn suojapussin valkoisesta jalkakylpyaltaasta, vieressä desinfiointisuihke ja pihtitarjotin", caption: "Suojapussi on vain yhden asiakkaan käytössä. Allas puhdistetaan ja desinfioidaan silti sen jälkeen." } },
        { p: "Metallisten välineiden pesu, desinfiointi ja sterilointi käydään läpi oppitunnilla [Välineet jokaisen asiakkaan jälkeen](lesson:ve-sinh-dung-cu)." },
        { note: "Oppitunti noudattaa Helsingin kaupungin hygieniaohjetta. Muualla määräykset voivat poiketa, joten tarkista omaa toimintaasi koskevat vaatimukset. Artikkeli on koulutusmateriaali, ei pätevyystodistus.", kind: "warn", title: "Tarkista paikalliset määräykset" },
      ],
    },
    {
      id: "seuraava-aika",
      title: "Varaa seuraava aika ja kirjaa asiakkaan lakan sävy",
      blocks: [
        { p: "Manikyyri ja pedikyyri ovat toistuvia palveluita, joten käynnin viimeinen vaihe tapahtuu tiskillä. VaraaAissa varaat asiakkaalle seuraavan [ajan](lesson:lich-hen) noin neljän viikon päähän ja kirjaat lakan sävyn [asiakastietoihin](lesson:khach-hang), jottei asiakkaan tarvitse muistaa sitä. Joka kuukausi palaaville asiakkaille salonki voi käyttää myös [kanta-asiakaskorttia](lesson:the-khach-quen)." },
      ],
    },
  ],
  howTo: {
    title: "Manikyyri ja pedikyyri tavallisella lakalla vaihe vaiheelta",
    id: "manikyyrin-ja-pedikyyrin-vaiheet",
    after: "kolme-saantoa",
    lead: "Vaiheet 1–7 ovat manikyyri ja vaiheet 8–14 pedikyyri samassa järjestyksessä kuin oppitunnin videolla.",
    supplies: [
      "Metalliset pihdit ja kynsinauhan työnnin sterilointipussissa",
      "Viila, hienojakoinen hiomapala, puutikut ja varvaserottimet: jokaiselle asiakkaalle uudet",
      "Vanulaput, nukkaamattomat liinat, kynsilakanpoistoaine ja puhdistusneste",
      "Kynsinauhan pehmennysaine tai kulho lämmintä vettä",
      "Voide sekä suola- tai sokerikuorinta",
      "Aluslakka, värilakka ja päällyslakka",
      "Desinfioitu jalkakylpy, kertakäyttöiset suojapussit ja hieno jalkaraspi",
    ],
    steps: [
      {
        name: "Konsultaatio ja kynsien ja ihon tarkastus",
        text: "Pese ja desinfioi omat ja asiakkaan kädet. Kysy, minkä muodon ja värin asiakas haluaa, ja kysy hänen terveydestään: onko allergioita, onko diabetesta. Katso kynnet ja iho tarkasti; jos näet jotain poikkeavaa, älä tee hoitoa.",
      },
      {
        name: "Poista vanha lakka",
        text: "Pidä poistoaineella kostutettua vanulappua kynnellä muutama sekunti, jotta lakka pehmenee, ja pyyhkäise sitten yhteen suuntaan kynsinauhasta kärkeen. Älä hankaa edestakaisin, tai lakka leviää iholle ja kulmiin. Kulmiin jääneet jäämät poistat puutikulla, jonka ympärille on kierretty vähän vanua.",
        image: { src: img("tay-son-mong-tay-cu-bang-bong"), alt: "Mustiin käsineisiin pukeutunut kynsiteknikko painaa poistoaineella kostutetun valkoisen vanulapun asiakkaan lohkeilleen vaaleanpunaisen lakan päälle", caption: "Pidä lappua kynnellä muutama sekunti, jotta lakka pehmenee, ennen kuin pyyhkäiset kohti kärkeä." },
      },
      {
        name: "Lyhennä tarvittaessa ja muotoile",
        text: "Viilaa yhteen suuntaan sivulta kohti keskustaa asiakkaan valitsemaan muotoon. Muodon valinta ja jokaisen muodon viilauslinjat ovat artikkelissa [kynsien viilaus vaihe vaiheelta](lesson:dua-form-mong).",
      },
      {
        name: "Pehmennä kynsinauhat",
        text: "Tapoja on kaksi. Liota sormenpäitä lämpimässä vedessä vain hetki ja kuivaa ne huolellisesti. Tai levitä kynsinauhan pehmennysainetta kynnen tyveen, anna vaikuttaa tarkalleen tuotteen ilmoittama aika ja pyyhi pois. Aine pehmentää kuollutta ihoa hyvin nopeasti, joten älä pidä sitä ohjetta pidempään.",
        image: { src: img("thoa-chat-lam-mem-da-o-chan-mong"), alt: "Kynsiteknikko puristaa ohutkärkisestä tuubista viivan kirkasta kynsinauhan pehmennysainetta asiakkaan luonnonkynnen tyveen" },
      },
      {
        name: "Työnnä kynsinauhat ja poista vain kuollut kudos",
        text: "Pidä työnnintä matalassa kulmassa ja työnnä kynnen tyven ihoa hyvin kevyesti taaksepäin. Poista sitten ohut kuollut kudos, joka on vielä kiinni kynsilevyssä. Pihdeillä leikataan vain irronneet kuolleet ihonpalat. Älä koskaan leikkaa elävään ihopoimuun, vaikka asiakas pyytäisi.",
        image: { src: img("day-da-mong-tay-nhe-nhang"), alt: "Kynän tavoin pidetty metallinen kynsinauhan työnnin matalassa kulmassa asiakkaan luonnonkynnen tyvessä työntää ihoa kevyesti taaksepäin", caption: "Työnnin pysyy matalalla ja liikkuu hyvin kevyesti." },
      },
      {
        name: "Hio kevyesti, hiero ja puhdista kynsilevy",
        text: "Kuljeta hienojakoista hiomapalaa hyvin kevyesti kynnen päällä, jotta pinta tasoittuu ja silottuu ohentamatta kynttä. Levitä vähän voidetta ja hiero käden selkää, jokaista sormea ja kämmentä hitaasti ja tasaisesti. Pyyhi sitten jokainen kynsi huolellisesti nukkaamattomalla liinalla ja puhdistusnesteellä, myös sivut ja kärki, koska kynteen jäänyt voide ja öljy estävät lakkaa tarttumasta.",
        image: { src: img("mat-xa-tay-voi-kem-duong"), alt: "Kynsiteknikon mustiin käsineisiin puetut kädet pitelevät asiakkaan kättä ja hierovat vähän valkoista voidetta käden selkään" },
      },
      {
        name: "Aluslakka, kaksi värikerrosta, päällyslakka ja kuivatus",
        text: "Ohut aluslakka suojaa kynttä ja auttaa väriä tarttumaan. Sitten kaksi ohutta värikerrosta, kumpikin kolmella vedolla: keskelle, vasemmalle ja oikealle; jätä tyveen pieni rako ja sivele kevyesti kärjen reunan yli. Anna jokaisen kerroksen asettua ennen seuraavaa ja viimeistele päällyslakalla. Anna asiakkaan levätä kädet paikallaan ja muistuta, että lakka pysyy alta pehmeänä muutaman tunnin.",
      },
      {
        name: "Valmistele jalkakylpy ja katso jalat tarkasti",
        text: "Allas on puhdistettu ja desinfioitu edellisen asiakkaan jälkeen. Laita uusi kertakäyttöinen suojapussi, lisää lämmintä vettä ja kokeile sitä ranteellasi: miellyttävän lämmintä, ei kuumaa. Jalkahoitovälineet otetaan sterilointipussista, joka avataan asiakkaan nähden. Tarkista ennen liotusta varvasvälit, jalkojen iho ja varpaankynnet poikkeavien merkkien varalta.",
      },
      {
        name: "Liota jalkoja muutama minuutti",
        text: "Muutama minuutti riittää pehmentämään ihon. Pitkä liotus tekee ihosta ryppyisen ja liian pehmeän, ja se naarmuuntuu hyvin helposti. Diabeetikolla liotus pidetään lyhyenä ja vesi vain haaleana.",
        image: { src: img("ngam-chan-trong-bon-co-tui-lot"), alt: "Asiakkaan jalat lämpimässä vedessä altaassa, jossa on läpinäkyvä muovinen suojapussi, ja veden pinnalla kelluu muutama ruusun terälehti", caption: "Suojapussi on taitettu altaan reunan yli. Lyhyt liotus miellyttävän lämpimässä vedessä." },
      },
      {
        name: "Leikkaa varpaankynnet suoraan poikki",
        text: "Aseta leikkurit suoraan poikki kynnen reunan kohdalle ja leikkaa pienin leikkauksin, ei koko kynttä kerralla: kynsi ei halkea ja linja pysyy suorana. Älä leikkaa syvälle kulmiin äläkä kaiva niihin. Kynnen reuna varpaan pään tasalla on juuri sopiva.",
        image: { src: img("cat-mong-chan-thang-ngang-bang-kem"), alt: "Mustiin käsineisiin pukeutunut hoitaja pitää kiinni asiakkaan isovarpaasta ja asettaa kynsileikkurit suoraan poikki kynnen reunan kohdalle, jalka kermanvärisellä pyyhkeellä" },
      },
      {
        name: "Viilaa varpaankynnet suoraan",
        text: "Viilaa suoraan poikki kynnen reunaa pitkin ja pyöristä kulmia vain hyvin vähän, jotteivät ne ole teräviä. Älä viilaa alas kulmiin.",
        image: { src: img("dua-mong-chan-thang-ngang"), alt: "Mustiin käsineisiin pukeutunut hoitaja painaa harmaan viilan suoraan poikki asiakkaan isovarpaan kynnen reunaan ja tukee varvasta toisella kädellä" },
      },
      {
        name: "Kynsinauhat, kovettumat, kuorinta ja hieronta",
        text: "Työnnä kynsinauhat kevyesti kuten käsissä ja poista vain kuollut kudos. Kuljeta hienoa jalkaraspia kevyesti kantapään ja paksun ihon kohtien yli; muutama tasainen veto riittää, ilman teriä ja ilman höylää. Hiero suola- tai sokerikuorintaa kevyesti jalkoihin ja nilkkoihin, huuhtele ja kuivaa huolellisesti, erityisesti varvasvälit. Hiero sitten jalkoja voiteella hitaasti ja tasaisesti jalkapohjaa pitkin.",
      },
      {
        name: "Varvaserottimet ja lakkaus",
        text: "Pyyhi voide ja öljy pois kynsilevyiltä ja aseta varvaserottimet. Levitä aluslakka, kaksi ohutta värikerrosta ja päällyslakka samoin kuin käsiin. Odota, että lakka on asettunut, ennen kuin asiakas laittaa sandaalit jalkaan.",
        image: { src: img("tach-ngon-va-son-mong-chan"), alt: "Valkoiset varvaserottimet asiakkaan varpaiden välissä, kun mustiin käsineisiin pukeutunut hoitaja lakkaa isovarpaan kynnen punaiseksi", caption: "Varvaserottimet ovat kertakäyttöisiä: uudet jokaiselle asiakkaalle." },
      },
      {
        name: "Puhdista allas ja käsittele välineet",
        text: "Kun asiakas on lähtenyt, ota suojapussi pois ja heitä se roskiin. Puhdista allas ja desinfioi se tuotteen ilmoittaman koko vaikutusajan. Viilat, vanut ja muut kertakäyttöiset menevät roskiin; pihdit ja työntimet pestään ja steriloidaan.",
      },
    ],
  },
  faq: [
    {
      q: "Mitä vaiheita perusmanikyyriin kuuluu?",
      a: "Konsultaatio ja kynsien tarkastus, vanhan lakan poisto, muotoilu, kynsinauhojen pehmennys, työntö ja kuolleen kudoksen poisto, kevyt hionta, käsihieronta ja kynsilevyn puhdistus, ja sitten aluslakka, kaksi ohutta värikerrosta ja päällyslakka. Lopuksi lakka kuivuu, ja asiakkaalle kerrotaan, että se pysyy alta pehmeänä muutaman tunnin.",
    },
    {
      q: "Miten kynsilakka poistetaan levittämättä sitä iholle?",
      a: "Pidä poistoaineella kostutettua vanulappua kynnellä muutama sekunti, jotta lakka pehmenee, ja pyyhkäise yhteen suuntaan kynsinauhasta kärkeen. Edestakainen hankaus levittää lakkaa iholle ja kulmiin. Kulmat puhdistetaan puutikulla, jonka ympärille on kierretty vähän vanua.",
    },
    {
      q: "Montako kerrosta tavallista kynsilakkaa levitetään?",
      a: "Ohut aluslakka, kaksi ohutta värikerrosta ja päällyslakka. Jokainen värikerros levitetään kolmella vedolla, ja kerroksen annetaan asettua ennen seuraavaa. Paksu lakka kuivuu hitaasti, painuu helposti ja tahraantuu helposti.",
    },
    {
      q: "Kuinka kauan jalkoja liotetaan ennen pedikyyriä?",
      a: "Muutama minuutti riittää pehmentämään ihon. Pitkä liotus tekee ihosta ryppyisen, liian pehmeän ja hyvin herkästi naarmuuntuvan. Diabeetikolla liotus pidetään lyhyenä ja vesi vain haaleana.",
    },
    {
      q: "Miksi varpaankynnet leikataan pienin leikkauksin?",
      a: "Pienet leikkaukset estävät kynttä halkeamasta ja auttavat pitämään leikkauslinjan suorana. Kun koko kynsi leikataan kerralla, se halkeaa helpommin ja suoraa linjaa on vaikeampi pitää.",
    },
    {
      q: "Saako pedikyyrissä käyttää terää kovettumien poistoon?",
      a: "Peruspedikyyrissä ei käytetä teriä eikä kovettumahöylää. Hienolla jalkaraspilla tehdään muutama kevyt veto, jotta iho tulee sileämmäksi. Hyvin paksu tai syvästi halkeillut kovettuma kuuluu jalkojenhoitajalle.",
    },
  ],
  related: ["cham-soc-mong-co-ban-hieu-dung", "dua-form-mong", "son-gel", "ve-sinh-dung-cu"],
};

export default article;
