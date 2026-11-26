import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/mi-classic-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "mita-ovat-klassiset-ripsienpidennykset",
  lesson: "mi-classic-hieu-dung",
  category: "lash",
  title: "Mitä ovat klassiset ripsienpidennykset? Kesto, vaikutus omiin ripsiin ja oikean pidennyksen valinta",
  metaTitle: "Mitä ovat klassiset ripsienpidennykset? Kesto ja omat ripset",
  metaDescription:
    "Klassiset ripsienpidennykset ovat 1:1, yksi pidennys yhteen omaan ripseen. Ripsen kasvusykli, huolto 2–3 viikon välein, yhteen liimautuneet ripset ja taivutus.",
  keyword: "klassiset ripsienpidennykset",
  keywords: [
    "kauanko klassiset ripsienpidennykset kestävät",
    "vahingoittavatko ripsienpidennykset omia ripsiä",
    "1:1 ripsienpidennykset",
    "ripsien kasvusykli",
    "yhteen liimautuneet ripset",
    "ripsienpidennysten pituus ja taivutus",
    "ripsiliima ja ilmankosteus",
  ],
  excerpt: "Klassiset ripset ovat 1:1 ja yhtä luonnolliset kuin kerros ripsiväriä. Artikkeli kertoo oman ripsen kasvusyklistä, miksi pidennykset irtoavat vähitellen ja kolmesta säännöstä, jotka pitävät omat ripset terveinä.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-noi-mi-classic-xem-nhip-ben-cua-so-studio"),
    alt: "Ripsistylisti, hiukset korkealla nutturalla, kermanvärinen paita ja mustat käsineet, istuu studion ikkunan ääressä ja nostaa pinsetit tarkastaakseen ne",
  },
  takeaways: [
    "Klassiset ripsienpidennykset ovat **1:1**: jokaisessa omassa ripsessä on täsmälleen yksi pidennys, ja ilme on luonnollinen kuin ripsivärin jäljiltä.",
    "Omat ripset irtoavat oman kiertonsa mukaan ja pidennys lähtee mukana, joten asiakas tulee yleensä huoltoon **2–3 viikon** kuluttua.",
    "Kolme asiaa pitää omat ripset terveinä: jokainen ripsi erotetaan, pidennys valitaan **oman ripsen kantokyvyn** mukaan ja se kiinnitetään noin **0,5–1 mm:n** päähän luomesta.",
    "Ripsiliima kovettuu ilman kosteuden avulla, joten huoneen kosteus ja lämpötila pidetään liimavalmistajan ilmoittamalla välillä.",
    "Harvat omat ripset pysyvät klassisilla pidennyksillä harvoina, vain pidempinä ja tummempina. Tuuheampi ilme tarkoittaa volyymi- tai hybridiripsiä.",
  ],
  intro: [
    "Klassiset ripsienpidennykset herättävät aina samat kysymykset: mitä ne ovat, kauanko ne kestävät ja vahingoittavatko ne omia ripsiä. Asiakkaat kysyvät näitä ennen kuin käyvät makuulle, ja jokaisen alalle opiskelevan pitää osata vastata. Klassinen tekniikka on 1:1, eli jokainen oma ripsi kantaa täsmälleen yhden pidennyksen. Se, ovatko asiakkaan omat ripset vielä vuosien päästä terveet, riippuu siitä, kuinka hyvin ripsistylisti ymmärtää oman ripsen.",
    "Artikkeli perustuu VaraaAi Academyn Ripset-kurssin oppituntiin ”Klassiset ripsienpidennykset: ymmärrä, niin ripset ovat kauniit ja omat ripset terveet”. Luettuasi osaat selittää asiakkaalle, miksi pidennykset irtoavat vähitellen, valitset pidennyksen, jonka oma ripsi jaksaa kantaa, ja ymmärrät, miksi liian kuiva tai liian kostea huone lyhentää ripsien kestoa.",
  ],
  sections: [
    {
      id: "mita-klassiset-ovat",
      title: "Mitä klassiset ripsienpidennykset ovat ja miltä ne näyttävät",
      blocks: [
        { p: "Klassisissa ripsienpidennyksissä, joita kutsutaan myös 1:1-tekniikaksi, **yksi pidennys kiinnitetään yhteen erotettuun omaan ripseen**. Ei nippuja, ei viuhkoja. Ripsirivi on sen jälkeen pidempi ja tummempi, ja ripset erottuvat yhä toisistaan, kuin silmissä olisi taitavasti levitetty kerros ripsiväriä." },
        { p: "Koska jokainen oma ripsi kantaa vain yhden pidennyksen, klassinen tekniikka ei lisää ripsien määrää. Tiheät omat ripset antavat tuuhean lopputuloksen. Harvat omat ripset pysyvät harvoina, vain pidempinä ja tummempina. Kerro tämä jo konsultaatiossa, ennen kuin asiakas odottaa malliankuvansa tiheää ripsiriviä." },
        { img: { src: img("bo-mi-classic-moi-soi-mi-that-mot-soi-noi"), alt: "Lähikuva suljetusta silmästä valmiine klassisine pidennyksineen, jokainen ripsi erillään, sisänurkassa lyhyet ja ulkonurkkaa kohti pitenevät", caption: "Valmiit klassiset ripset: yksi pidennys kussakin omassa ripsessä, eikä yksikään ole liimautunut viereiseen." } },
        { p: "Jos asiakas toivoo todella tuuheita ja tummia ripsiä, tarvitaan toinen tekniikka: [volyymiripset](lesson:mi-volume-hieu-dung) tai hybridiripset. Jos etsit käytännön työvaiheita tyynyjen asettamisesta niiden poistoon, lue artikkeli [klassisten ripsienpidennysten tekeminen](lesson:mi-classic)." },
      ],
    },
    {
      id: "ripsen-kasvusykli",
      title: "Ripsen kasvusykli: miksi pidennykset irtoavat vähitellen",
      blocks: [
        { p: "Omilla ripsillä on hiusten tavoin oma elinkaarensa, jossa on kolme vaihetta. Luvut vaihtelevat yksilöllisesti; taulukko näyttää vain järjestyksen." },
        {
          table: {
            head: ["Vaihe", "Kesto", "Ripsi"],
            rows: [
              ["Kasvu", "Yleensä noin kuukaudesta kuuteen viikkoon", "Pitenee päivä päivältä"],
              ["Siirtymä", "Muutama viikko", "Lakkaa kasvamasta"],
              ["Lepo", "Useita kuukausia", "Pysyy paikallaan, irtoaa ja tilalle kasvaa uusi"],
            ],
          },
        },
        { p: "Lukuja tärkeämpää on tämä: jokaisessa luomessa osa ripsistä kasvaa, osa lepää ja osa on irtoamassa, koko ajan. Kaksi ripseä ei koskaan kulje samassa tahdissa. Siksi muutaman ripsen irtoaminen päivässä on normaalia, ja pidennys irtoaa sen oman ripsen mukana, johon se on kiinnitetty." },
        { img: { src: img("mi-that-soi-dai-soi-non-truoc-khi-noi-mi"), alt: "Lähikuva suljetusta silmästä ennen pidennyksiä: pitkien omien ripsien seassa lyhyitä nuoria ripsiä, ja yksi irronnut ripsi lepää valkoisella tyynyllä", caption: "Omat ripset ennen pidennyksiä: pitkiä ripsiä, nuoria ripsiä ja yksi juuri irronnut samassa luomessa." } },
        { h3: "Näin tunnistat luonnollisesti irronneen ripsen" },
        { p: "Kun katsot irronnutta ripseä tarkasti, sen tyvessä näkyy pieni vaalea juuri. Ripsi oli tullut kiertonsa loppuun, eikä liima vahingoittanut sitä. Kun asiakas huolestuu tyynyllä olevista ripsistä, voit näyttää hänelle tämän vaalean juuren." },
        { img: { src: img("soi-mi-rung-tu-nhien-mang-theo-soi-noi"), alt: "Irronnut ripsi mustakäsineisen sormen päässä, tyvessä pieni vaalea juuri ja musta pidennys yhä kiinni ripsen suuntaisesti", caption: "Luonnollisesti irronneen ripsen tyvessä on pieni vaalea juuri, ja pidennys lähtee sen mukana." } },
        { h3: "Nuoret ripset: jätä rauhaan tai käytä hyvin kevyttä" },
        { p: "Uudet ripsistylistit kiinnittävät usein pidennyksen jokaiseen näkemäänsä ripseen, myös aivan lyhyisiin ja ohuisiin, juuri kasvamaan lähteneisiin. Nuori ripsi ei jaksa kantaa pitkää ja paksua pidennystä. Kiinnitettynä se irtoaa helposti ennenaikaisesti tai kasvaa vinoon. Jätä se seuraavaan huoltoon, kun se on pidempi ja vahvempi, tai valitse sille hyvin lyhyt ja kevyt pidennys." },
      ],
    },
    {
      id: "kesto",
      title: "Kauanko klassiset ripsienpidennykset kestävät",
      blocks: [
        { p: "Yhtä lukua kaikille asiakkaille ei ole, koska ripset harvenevat jokaisen omaa irtoamistahtia. Alalla tavallinen rytmi on **huolto 2–3 viikon välein**: ripsistylisti kiinnittää uusia pidennyksiä kohtiin, joissa ripsirivi on harventunut." },
        { p: "Asiakkaan tavat ratkaisevat, kestävätkö ripset vai harvenevatko ne nopeasti. Uinti, sauna, silmien hierominen ja kasvot tyynyssä nukkuminen saavat ripset lähtemään aiemmin. Kysy näistä konsultaatiossa ja kerro jälkihoidosta ennen aloittamista:" },
        {
          ul: [
            "Pidä ripset kuivina niin kauan kuin liimavalmistaja neuvoo.",
            "Ei öljypohjaisia tuotteita ripsien tyveen.",
            "Harjaa ripset joka päivä.",
            "Älä hiero silmiä äläkä nypi pidennyksiä irti.",
          ],
        },
      ],
    },
    {
      id: "vahingoittavatko",
      title: "Vahingoittavatko klassiset ripsienpidennykset omia ripsiä",
      blocks: [
        { p: "Omat ripset vahingoittuvat, kun pidennykset tehdään väärin. Oppitunti nimeää kolme virhettä, joista jokainen vastaa yhtä klassisen tekniikan sääntöä. Kun kaikkia kolmea noudatetaan, asiakkaan omat ripset pysyvät terveinä vuosienkin pidennysten jälkeen." },
        {
          table: {
            head: ["Virhe", "Mitä omalle ripselle tapahtuu", "Oikea tapa"],
            rows: [
              ["Liima yhdistää kaksi omaa ripseä", "Ne kasvavat ja irtoavat eri tahtiin ja kiristävät toisiaan; asiakas tuntee sen ja ripset irtoavat ennen aikojaan", "Erota jokainen ripsi, yksi pidennys yhteen omaan ripseen"],
              ["Liian pitkä tai paksu pidennys", "Oma ripsi taipuu ja ajan myötä katkeaa tai irtoaa aikaisin", "Valitse pidennys, jonka oma ripsi jaksaa kantaa"],
              ["Kiinnitys luomeen, liimaa iholla", "Hiertää, kutisee, joskus ärsyttää; kova liima iholla vetää ripseä sen kasvaessa", "Pidennyksen tyvi noin 0,5–1 mm:n päähän luomen ihosta"],
            ],
          },
        },
        { h3: "Miten yhteen liimautuneet ripset vahingoittavat" },
        { p: "Kun kaksi omaa ripseä liimautuu yhteen ja toinen pitenee tai tulee irtoamisvaiheeseen, toinen pidättää sitä ja vetää sen kireälle. Asiakas tuntee hiertävän, tarttuvan tunteen. Ajan myötä karvatuppi vaurioituu ja oma ripsirivi harvenee. Siksi klassisen tekniikan ensimmäinen sääntö on erottaa jokainen ripsi ennen kiinnitystä." },
        { img: { src: img("loi-dinh-chum-khi-noi-mi-classic"), alt: "Lähikuva suljetusta silmästä, jossa kaksi ripsirivin keskellä olevaa ripseä on liimautunut ristiin ja tyvessä on musta liimapaakku", caption: "Esimerkkikuva virheestä: kaksi ripseä liimautunut yhteen ja liimapaakku koskee luomeen. Näin ei saa koskaan käydä." } },
        { h3: "Kiinnityskohta: vähän irti luomesta" },
        { p: "Pidennys asetetaan oman ripsen suuntaisesti niin, että sen tyvi on puolen ja yhden millimetrin päässä luomen ihosta eikä koskaan koske siihen. Liian kauas kiinnittäminen on myös virhe: pidennys on löysä, sojottaa ja irtoaa aikaisin." },
        { img: { src: img("chan-soi-mi-noi-cach-da-mi"), alt: "Klassinen ripsirivi hyvin läheltä sivusta kuvattuna, jokaisen pidennyksen tyvi alkaa pienen matkan päästä luomesta eikä iholla ole liimaa", caption: "Oikein tehty: luomen ja pidennyksen tyven väliin jää puhdas ihoraita." } },
      ],
    },
    {
      id: "pituus-paksuus-taivutus",
      title: "Pituus, paksuus ja taivutus oman ripsen kantokyvyn mukaan",
      blocks: [
        { p: "Ajattele omaa ripseä pienenä oksana. Kun siihen ripustaa jotain liian pitkää ja painavaa, oksa taipuu. Pidennys toimii samoin, joten valinta alkaa omasta ripsestä eikä asiakkaan tuomasta mallikuvasta." },
        {
          ul: [
            "**Pituus:** ei paljon pidempi kuin oma ripsi.",
            "**Paksuus:** ei paksumpi eikä painavampi kuin oma ripsi kestää. Ohuille ja lyhyille ripsille valitaan ohuempi ja lyhyempi pidennys.",
            "**Taivutus:** silmän muodon ja oman ripsen kasvusuunnan mukaan, jotta pidennys seuraa ripseä kääntymättä ylös tai roikkumatta alas.",
          ],
        },
        { img: { src: img("loi-soi-mi-noi-qua-dai-qua-nang"), alt: "Lähikuva suljetusta silmästä, jossa liian pitkät ja paksut pidennykset roikkuvat tyynyä vasten, menevät ristiin ja jättävät aukkoja", caption: "Esimerkkikuva liian pitkistä ja raskaista pidennyksistä: ripset roikkuvat, sotkeutuvat ja rivissä on jo aukkoja." } },
        { note: "Älä kiinnitä hyvin paksuja ja pitkiä pidennyksiä ohuisiin ja heikkoihin ripsiin vain asiakkaan mieliksi. Hinnan maksavat hänen omat ripsensä. Kerro rehellisesti, valitse pidennykset, jotka ripset kestävät, tai ehdota toista tekniikkaa.", kind: "warn", title: "Kun asiakas toivoo enemmän kuin ripset kestävät" },
        { p: "Pituuksien valinta silmän eri alueille ja eri silmänmuodoille on oma aiheensa, josta kerrotaan oppitunnilla [ripsikartta](lesson:mi-mapping-hieu-dung)." },
        { note: "Kirjaa jokaiselle asiakkaalle käytetyt pituudet, paksuus, taivutus ja liima. Seuraava huolto on nopeampi ja ripsistä tulee tasaisemmat. VaraaAissa nämä merkinnät ovat [asiakasprofiilissa](lesson:khach-hang).", kind: "tip", title: "Ripsistylistin muistikirja" },
      ],
    },
    {
      id: "liima-ja-kosteus",
      title: "Ripsiliima, ilmankosteus ja liimahöyry",
      blocks: [
        { p: "Ripsiliima on syanoakrylaattia, samaa sukua kuin pikaliima, ja se kovettuu ilman kosteuden avulla. Huoneen kosteus ja lämpötila ratkaisevat siis, kovettuuko liima nopeasti vai hitaasti. Jokainen liimavalmistaja ilmoittaa sopivan välin, ja sinun tehtäväsi on pitää huone sen rajoissa." },
        {
          table: {
            head: ["Huone", "Miten liima käyttäytyy"],
            rows: [
              ["Liian kuiva", "Kovettuu hitaasti ja höyrystyy enemmän"],
              ["Liian kostea", "Kovettuu liian nopeasti, sidos on hauras ja pitää huonosti"],
            ],
          },
        },
        { img: { src: img("may-tao-am-va-keo-noi-mi-trong-phong-lam-mi"), alt: "Ripsistudion nurkka, jossa valkoisella kivisellä ikkunalaudalla on sumua suihkuttava pieni ilmankostutin ja musta ripsiliimapullo", caption: "Ilmankostutin auttaa pitämään huoneen liimavalmistajan ilmoittamalla kosteusvälillä." } },
        { p: "Myös tapa, jolla liimaa otetaan, vaikuttaa ripsien kestoon:" },
        {
          ul: [
            "Ravista pulloa valmistajan ohjeen mukaan, laita yksi pieni pisara jadekivelle tai liimasormukseen ja sulje pullo heti.",
            "Vaihda tuoreeseen pisaraan usein, koska pitkään ollut pisara paksuuntuu ja tarttuu huonosti.",
            "Kasta liimaan vain pidennyksen tyvi, juuri sopiva määrä liimaa, ei koskaan paakkua.",
          ],
        },
        { note: "Höyry kirvelee silmiä, joten asiakkaan silmät pidetään täysin kiinni koko ajan, eikä liimapisaraa laiteta suoraan hänen nenänsä alle. Höyry voi myös aiheuttaa allergiaa sekä asiakkaalle että ripsistylistille. Oireista ja toimintaohjeista kerrotaan oppitunnilla [Allergiat ja kemikaalit](lesson:di-ung-hoa-chat).", kind: "warn", title: "Liimahöyry" },
      ],
    },
    {
      id: "konsultaatio-ja-rehellisyys",
      title: "Konsultaatio ja milloin pidennyksiä ei tehdä",
      blocks: [
        { p: "Katso ja kysy aina ennen aloittamista. Punaiset, kutiavat tai vetistävät silmät, näärännäppy, turvonneet tai karstaiset luomenreunat, äskettäinen silmäleikkaus tai aiempi reaktio ripsiliimaan: ei tänään. Koko luettelo ja ystävällinen tapa kieltäytyä löytyvät oppitunnilta [Milloin asiakasta ei hoideta](lesson:khi-nao-khong-lam)." },
        { p: "Älä tee konsultaatiota muodon vuoksi. Kysy, haluaako asiakas hyvin luonnollisen vai hieman tuuheamman ilmeen, käyttääkö hän piilolinssejä, uiko tai saunooko hän usein, hierooko hän silmiään tai nukkuuko hän kasvot tyynyssä. Kerro sitten rehellisesti klassisista ripsistä: ne antavat luonnollisen ilmeen, ja tuuheus seuraa asiakkaan omia ripsiä." },
        { img: { src: img("khach-soi-guong-sau-khi-noi-mi-classic"), alt: "Vaaleahiuksinen asiakas kermanvärisessä neuleessa istuu tuolissa ja ihailee uusia ripsiään käsipeilistä, ja ripsistylisti hymyilee hänen takanaan", caption: "Asiakas, jolle kerrottiin etukäteen, miltä klassiset ripset näyttävät, on tyytyväinen juuri siihen lopputulokseen." } },
        { p: "Täydet klassiset ripset vievät usein 1,5–2 tuntia, ja kiirehtiminen johtaa huonosti erotettuihin ripsiin. Jos salonkisi ottaa varauksia VaraaAin kautta, aseta hoidolle todellinen kesto [palveluihin](lesson:dich-vu) ja varaa huoltoaika [kalenteriin](lesson:lich-hen) ennen kuin asiakas lähtee." },
        { note: "Kuivana pitämisen aika, huoneen kosteus ja lämpötila noudattavat aina liimavalmistajan ohjeita. Artikkeli on koulutusmateriaalia eikä korvaa ammattitutkintoa, ja kauneuspalveluja koskevat säännöt vaihtelevat maittain.", kind: "info", title: "Huomio" },
      ],
    },
  ],
  faq: [
    {
      q: "Kauanko klassiset ripsienpidennykset kestävät?",
      a: "Ripset harvenevat oman ripsen kasvusyklin tahdissa, koska jokainen pidennys irtoaa sen oman ripsen mukana, johon se on kiinnitetty. Asiakas tulee yleensä huoltoon 2–3 viikon kuluttua sen mukaan, kuinka nopeasti hänen ripsensä vaihtuvat ja miten hän hoitaa niitä kotona.",
    },
    {
      q: "Saavatko klassiset ripsienpidennykset omat ripset lähtemään?",
      a: "Omat ripset irtoavat ennenaikaisesti, kun pidennykset tehdään väärin: kaksi ripseä liimautuu yhteen, pidennykset ovat liian pitkät tai raskaat tai liimaa on luomella. Kun jokaisessa omassa ripsessä on yksi sen kestämä pidennys noin 0,5–1 mm:n päässä luomesta, ripsi kasvaa ja irtoaa normaalin kiertonsa mukaan.",
    },
    {
      q: "Miksi ripsiä lähtee joka päivä pidennysten jälkeen?",
      a: "Joka päivä muutama oma ripsi tulee kiertonsa loppuun, ja niiden pidennykset lähtevät mukana. Luonnollisesti irronneen ripsen tyvessä on pieni vaalea juuri. Se ei ole merkki siitä, että liima olisi vahingoittanut ripsiä.",
    },
    {
      q: "Sopivatko klassiset ripsienpidennykset harvoihin ripsiin?",
      a: "Ne voidaan tehdä, mutta asiakkaan on hyvä tietää lopputulos etukäteen: klassisessa tekniikassa yksi pidennys tulee yhteen omaan ripseen, joten harvat ripset pysyvät harvoina, vain pidempinä ja tummempina. Tuuheita ja tummia ripsiä toivovalle kannattaa ehdottaa volyymi- tai hybridiripsiä, joiden pidennykset omat ripset kestävät.",
    },
    {
      q: "Mitä eroa on klassisilla ja volyymiripsillä?",
      a: "Klassisessa tekniikassa yksi pidennys kiinnitetään yhteen omaan ripseen, ja ilme on luonnollinen kuin ripsivärin jäljiltä. Volyymiripsissä yhteen omaan ripseen kiinnitetään viuhka, jossa on useita hyvin ohuita pidennyksiä, jolloin ripsirivistä tulee tuuheampi. Molemmissa sääntö on sama: kiinnitys täsmälleen yhteen omaan ripseen.",
    },
    {
      q: "Mitä pitää välttää klassisten ripsienpidennysten jälkeen?",
      a: "Pidä ripset kuivina niin kauan kuin liimavalmistaja neuvoo, vältä öljypohjaisia tuotteita ripsien tyvessä, harjaa ripset päivittäin, älä hiero silmiä äläkä nypi pidennyksiä. Uinti, sauna ja kasvot tyynyssä nukkuminen harventavat ripsiä nopeammin.",
    },
  ],
  related: ["mi-classic", "mi-chuan-bi-hieu-dung", "mi-volume-hieu-dung", "mi-dam-thao-hieu-dung"],
};

export default article;
