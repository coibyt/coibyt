import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/chu-ky-rung-mi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "ripsien-kasvusykli-miksi-ripsia-lahtee",
  lesson: "chu-ky-rung-mi",
  category: "tips",
  title: "Ripsien kasvusykli: miksi ripsiä lähtee joka päivä ja miksi pidennykset lähtevät mukana",
  metaTitle: "Ripsien kasvusykli: miksi ripsiä lähtee joka päivä",
  metaDescription:
    "2–5 ripsen lähteminen päivässä on normaalia. Ripsen kolme vaihetta: kasvu, siirtymä, lepo ja irtoaminen, miksi pidennykset lähtevät mukana ja miksi ei nypitä.",
  keyword: "ripsien kasvusykli",
  keywords: ["onko normaalia että ripsiä lähtee", "montako ripseä lähtee päivässä", "miksi ripsienpidennykset lähtevät", "kasvavatko nypityt ripset takaisin", "kauanko ripsi kasvaa", "ripsiä lähtee paljon"],
  excerpt: "Muutaman irronneen ripsen löytäminen joka aamu on normaalia. Jokainen ripsi käy läpi kolme vaihetta, ja pidennykset lähtevät omien ripsien mukana, eivät vian takia.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("co-gai-nhin-len-voi-hang-mi-noi-day"),
    alt: "Vaaleahiuksinen nainen kolme neljäsosaa sivuttain, silmät auki ja katse ylös kaukaisuuteen, tuuheat mustat ripsienpidennykset erottuvat pehmeässä valossa",
  },
  takeaways: [
    "**2–5 ripsen lähteminen päivässä** on normaalia, koska jokainen ripsi on eri vaiheessa.",
    "Jokainen ripsi käy läpi kolme vaihetta: **kasvu** (noin 4–6 viikkoa), **siirtymä** (2–3 viikkoa) ja **lepo** (muutama kuukausi), minkä jälkeen se irtoaa.",
    "Pidennykset ovat kiinni omissa ripsissä, joten kun oma ripsi irtoaa, pidennys lähtee mukana; kyse ei ole viasta.",
    "Älä vedä tai nypi ripsiä: uusi ripsi kasvaa silloin hitaammin.",
    "Huolto kahden–kolmen viikon välein täyttää luonnollisesti irronneiden ripsien jättämät aukot.",
  ],
  intro: [
    "Ripsien kasvusykli selittää, miksi löydät joka aamu muutaman irronneen ripsen tyynyltä tai poskelta. Se on täysin normaalia ja koskee kaikkia, oli pidennyksiä tai ei. Jokaisella ripsellä on oma kolmivaiheinen elinkaarensa, ja kun ripsi tulee sen loppuun, se irtoaa, jotta uusi pääsee kasvamaan tilalle.",
    "Artikkeli perustuu VaraaAi Academyn kurssin ”Moja Beauty: ripset, kynnet ja kulmat” oppituntiin ”Miksi 2–5 ripsen lähteminen päivässä on normaalia”. Kurssi on lyhyitä asiakasvideoita helsinkiläiseltä Moja Beauty -salongilta. Luettuasi ymmärrät ripsen kolme vaihetta, miksi pidennykset lähtevät vähitellen ja miksi huolto kahden–kolmen viikon välein on järkevää.",
  ],
  sections: [
    {
      id: "kolme-vaihetta",
      title: "Ripsien kasvusykli: jokaisen ripsen kolme vaihetta",
      blocks: [
        { p: "Ripsi ei kasva loputtomiin. Jokainen käy läpi kolme vaihetta: kasvun, siirtymän sekä levon ja irtoamisen. Alla olevat luvut ovat oppitunnin tavallisia vaihteluvälejä; jokainen ihminen on hieman erilainen." },
        {
          table: {
            head: ["Vaihe", "Kesto", "Ripsi tässä vaiheessa"],
            rows: [
              ["Kasvu", "Noin 4–6 viikkoa", "Pitenee joka päivä; vielä lyhyt ja ohut"],
              ["Siirtymä", "2–3 viikkoa", "Lakkaa pitenemästä"],
              ["Lepo", "Muutama kuukausi", "Pysyy paikallaan, sitten irtoaa uuden tieltä"],
            ],
          },
        },
        { h3: "Kasvuvaihe" },
        { p: "Noin neljästä kuuteen viikkoa ripsi pitenee joka päivä. Kasvava ripsi on vielä lyhyt ja ohut. Siksi ripsistylisti valitsee näille ripsille kevyet pidennykset: nuori ripsi ei vielä jaksa kantaa pitkää ja raskasta pidennystä." },
        { img: { src: img("mi-that-co-soi-dai-khoe-va-soi-ngan-non"), alt: "Lähikuva asiakkaan suljetusta silmästä, jonka omissa ripsissä on pitkiä ja vahvoja ripsiä lyhyiden ja ohuiden, vielä kasvavien ripsien seassa", caption: "Samassa luomessa on aina pitkiä, vahvoja ja lyhyitä, nuoria ripsiä." } },
        { h3: "Siirtymävaihe" },
        { p: "Tämä vaihe kestää vain kahdesta kolmeen viikkoa, ja ripsi lakkaa kasvamasta. Älä silloin vedä tai nypi ripsiä: ennen aikojaan revitty ripsi saa uuden ripsen kasvamaan hitaammin." },
        { h3: "Lepovaihe" },
        { p: "Lepovaihe kestää muutaman kuukauden. Ripsi ei enää pitene, ja vaiheen lopussa se irtoaa itsestään, jotta uusi ripsi tulee tilalle." },
      ],
    },
    {
      id: "miksi-2-5-ripsea",
      title: "Montako ripseä lähtee päivässä, ja miksi 2–5 on normaalia",
      blocks: [
        { p: "Saman luomen ripset eivät kulje samaan tahtiin. Joka hetki osa kasvaa, osa on siirtymävaiheessa, osa lepää ja osa on irtoamassa. Siksi ripsirivi ei koskaan lähde kerralla, vaan uusiutuu ripsi kerrallaan. Joka päivä muutama ripsi tulee kiertonsa loppuun, ja kahdesta viiteen ripsen lähteminen päivässä on normaalia." },
        { p: "Luonnollisesti irronneen ripsen tyvessä on usein pieni vaalea nuppi. Jos löytämässäsi ripsessä on tuo pieni nuppi, sen aika oli yksinkertaisesti tullut." },
        { note: "Jos ripsiä lähtee laikuittain, selvästi tavallista enemmän tai luomenreunassa on samalla punoitusta, kutinaa tai turvotusta, kyse ei enää ole normaalista kierrosta. Käy lääkärissä.", kind: "warn", title: "Milloin se ei ole normaalia" },
      ],
    },
    {
      id: "pidennykset-lahtevat-mukana",
      title: "Miksi ripsienpidennykset lähtevät: ne irtoavat omien ripsien mukana",
      blocks: [
        { p: "Jokainen pidennys on kiinnitetty yhteen omaan ripseen. Kun tuo oma ripsi tulee kiertonsa loppuun ja irtoaa, pidennys lähtee mukana. Löydät pidennyksen, jonka vierellä kulkee pienempi oma ripsi ja tyvessä vaalea nuppi." },
        { img: { src: img("soi-mi-that-rung-tu-nhien-con-mang-soi-noi"), alt: "Mustaan käsineeseen pukeutuneen sormen päässä on irronnut oma ripsi, jonka tyvessä on pieni vaalea nuppi ja jossa on yhä kiinni musta pidennys", caption: "Itsestään irronnut oma ripsi, jossa pidennys on yhä kiinni." } },
        { p: "Se ei tarkoita, että pidennykset tai liima olisivat huonoja. Kyse on omien ripsiesi elinkaaresta. Kahden–kolmen viikon kuluttua ripsiä on irronnut niin monta, että ripsirivi näyttää harvalta ja epätasaiselta, ja jäljellä olevat ovat kasvaneet ulospäin ja vieneet liitoksen kauemmas luomesta. Silloin on huollon aika." },
        { img: { src: img("tho-kiem-tra-tung-soi-mi-noi-khi-dam"), alt: "Pinsetit ripsistylistin mustaan käsineeseen pukeutuneessa kädessä tarkistavat jokaisen pidennyksen asiakkaan suljetussa silmässä huollon aikana" } },
        { p: "Jos ripsiä lähtee tätä enemmän, syy on yleensä muualla: öljy silmien ympärillä, hierominen, vatsallaan nukkuminen tai omille ripsille liian raskaat pidennykset. Artikkeli [pilaavatko ripsienpidennykset omat ripset](lesson:noi-mi-co-hai-mi-that) kertoo tästä tarkemmin." },
      ],
    },
    {
      id: "kestavammat-pidennykset",
      title: "Kasvusyklin ymmärtäminen pidentää pidennysten ikää",
      blocks: [
        { p: "Hyvä ripsistylisti työskentelee omien ripsiesi elinkaaren mukaan. Ripsiä harjatessaan hän katsoo, mitkä ovat pitkiä ja vahvoja ja mitkä vielä lyhyitä ja nuoria, ja valitsee jokaiselle pituuden ja paksuuden. Liian heikko nuori ripsi voidaan jättää ilman pidennystä seuraavaan huoltoon asti." },
        { img: { src: img("tho-do-do-dai-mi-that-bang-mot-soi-noi"), alt: "Pinsetit ripsistylistin mustaan käsineeseen pukeutuneessa kädessä pitävät pidennystä oman ripsen vieressä asiakkaan silmän ulkonurkassa pituuden vertaamiseksi", caption: "Ripsistylisti vertaa oman ripsen pituutta ennen pidennyksen valintaa." } },
        {
          ul: [
            "**Älä vedä tai nypi ripsiä**, et edes pidennystä, joka tarttuu johonkin. Vetäminen vie oman ripsen mukanaan, ja uusi kasvaa takaisin hitaammin.",
            "**Vältä öljyä silmien ympärillä**, ettei liima heikkene ennen kuin oma ripsi on irtoamassa.",
            "**Pese ja harjaa ripset kevyesti** joka päivä ohjeen [näin peset ripsienpidennykset kotona](lesson:rua-mi-noi-tai-nha) mukaan.",
            "**Käy huollossa 2–3 viikon välein**, jotta irronneiden tilalle lisätään pidennyksiä ja kasvaneet poistetaan.",
          ],
        },
        { img: { src: img("bo-mi-noi-hoan-thien-tren-mat-nham"), alt: "Asiakkaan suljettu silmä, jossa on tuuhea ja tasainen musta pidennyssetti, valkoinen suojatyyny silmän alla" } },
      ],
    },
    {
      id: "kestava-tyyli",
      title: "Valitse tyyli, joka kestää",
      blocks: [
        { p: "Koska jokaisessa luomessa on sekä vahvoja että nuoria ripsiä, kestävin tyyli on sellainen, jota omat ripsesi jaksavat kantaa. Vahvat ja tiheät ripset kantavat volyymiviuhkoja; ohuisiin ripsiin, joiden joukossa on paljon nuoria, sopivat yleensä paremmin klassiset tai kevyt hybridi. Neljää tyyliä verrataan artikkelissa [millaiset ripsienpidennykset valita](lesson:4-kieu-noi-mi), ja huoltovälistä kerrotaan artikkelissa [miksi ripset ja kynnet kannattaa huoltaa ajallaan](lesson:dam-mi-mong-dung-hen)." },
        { img: { src: img("tho-mi-ghi-ho-so-khach-tren-may-tinh-bang"), alt: "Nutturapäinen ripsistylisti istuu marmoripöydän ääressä ikkunan vieressä ja tekee muistiinpanoja tabletille teekupin ja valkoisten kukkien maljakon vieressä" } },
        { p: "VaraaAita käyttävä salonki voi kirjata käytetyn tyylin, pituuden ja taivutuksen asiakastietojesi sisäisiin muistiinpanoihin, jolloin seuraavan huollon tekijä noudattaa samaa karttaa. Jos haluat tietää, millaiset pidennykset kestävät sinulla parhaiten, kysy Moja Beautysta tai [varaa aika Moja Beautyyn](/b/moja-beauty) VaraaAissa." },
      ],
    },
  ],
  faq: [
    {
      q: "Montako ripseä päivässä on normaalia menettää?",
      a: "Noin kahdesta viiteen ripsen lähteminen päivässä on normaalia. Jokainen ripsi on elinkaarensa eri vaiheessa, joten aina muutama on irtoamassa.",
    },
    {
      q: "Mitkä ovat ripsien kasvusyklin vaiheet?",
      a: "Vaiheita on kolme: kasvu (noin neljästä kuuteen viikkoa, ripsi pitenee joka päivä), siirtymä (kahdesta kolmeen viikkoa, ripsi lakkaa kasvamasta) ja lepo (muutama kuukausi), minkä jälkeen ripsi irtoaa ja uusi tulee tilalle.",
    },
    {
      q: "Miksi ripsienpidennykset lähtevät vähitellen?",
      a: "Pidennykset on kiinnitetty omiin ripsiin, joten kun oma ripsi tulee elinkaarensa loppuun ja irtoaa, pidennys lähtee mukana. Kyse ei ole viasta; riittää, että käyt huollossa kahden–kolmen viikon välein.",
    },
    {
      q: "Kasvavatko nypityt ripset takaisin?",
      a: "Ennen aikojaan revitty ripsi kasvaa yleensä takaisin, mutta hitaammin. Siksi ripsiä ei kannata vetää tai nyppiä, ei edes silloin, kun pidennys tarttuu johonkin.",
    },
    {
      q: "Mitä tehdä, jos ripsiä lähtee paljon?",
      a: "Jos ripsiä lähtee laikuittain, selvästi tavallista enemmän tai luomenreunassa on punoitusta, kutinaa tai turvotusta, käy lääkärissä. Silloin kyse ei enää ole ripsen normaalista elinkaaresta.",
    },
    {
      q: "Miksi ripsistylisti ei laita pitkiä pidennyksiä jokaiseen ripseen?",
      a: "Kasvavat ripset ovat vielä lyhyitä ja ohuita eivätkä jaksa kantaa pitkää ja raskasta pidennystä. Ripsistylisti valitsee niille kevyet pidennykset, jotta omat ripset eivät painu alas.",
    },
  ],
  related: ["noi-mi-co-hai-mi-that", "dam-mi-mong-dung-hen", "rua-mi-noi-tai-nha", "mi-classic-hieu-dung"],
};

export default article;
