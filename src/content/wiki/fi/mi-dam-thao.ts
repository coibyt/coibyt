import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/mi-dam-thao/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "ripsienpidennysten-poisto-ja-huolto",
  lesson: "mi-dam-thao",
  category: "lash",
  title: "Ripsienpidennysten poisto ja huolto salongissa: 12 vaihetta vetämättä yhtäkään ripseä",
  metaTitle: "Ripsienpidennysten poisto ja huolto: 12 vaihetta",
  metaDescription:
    "Ripsihuolto ja pidennysten poisto vaiheittain: tarkista ripset, poistovoide liimakohtaan, liu'uta pidennys pois, täytä kartan mukaan ja poista koko setti.",
  keyword: "ripsienpidennysten poisto",
  keywords: [
    "ripsienpidennysten huolto ohje",
    "ripsihuollon vaiheet",
    "ripsienpidennysten poisto poistovoiteella",
    "ripsien poistoaineen käyttö",
    "ulos kasvaneiden pidennysten poisto",
    "ripsienpidennysten poisto salongissa",
    "pidennysten poisto ilman että omat ripset lähtevät",
  ],
  excerpt: "Huollossa poistetaan oikeat pidennykset ja lisätään oikeat. Poistossa aine menee oikeaan kohtaan, odotetaan oikea aika ja pyyhkäistään kevyesti. 12 vaihetta molempiin.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-mi-dam-mi-cho-khach-trong-studio"),
    alt: "Ripsistylisti korkealla nutturalla istuu sängyn päässä pinsetit kädessä ja tekee ripsiä kermanvärisen peiton alla makaavalle asiakkaalle studiossa, jossa on violetit samettiverhot",
  },
  takeaways: [
    "Kaksi asiaa pysyy koko ajan: asiakkaan silmät ovat kiinni, eikä **pidennystä koskaan vedetä**.",
    "Huollossa laitetaan vain **pieni täplä poistovoidetta poistettavan pidennyksen liimakohtaan** kertakäyttöisellä mikroharjalla, ei koskaan luomen iholle eikä tyveen.",
    "Jos pidennys ei liu'u pois, liima ei ole vielä pehmennyt: lisää hieman, odota pidempään ja yritä uudelleen.",
    "Koko setin poistossa liimakohtia pitkin laitetaan ohut raita voidetta, **odotetaan valmistajan ilmoittama aika** ja pyyhkäistään kevyesti tyvestä kärkeen.",
    "Jos asiakkaalla on reaktion merkkejä, huoltoa ei tehdä: koko setti poistetaan hyvin hellästi ja asiakasta neuvotaan hakeutumaan lääkäriin.",
  ],
  intro: [
    "Ripsienpidennysten poisto oikein tehtynä on kolme asiaa: poistoaine täsmälleen oikeaan kohtaan, riittävä odotus ja pidennyksen antaminen liukua pois itsestään. Yksikään vaihe ei vaadi vetämistä. Ripsihuollossa käytetään täsmälleen samoja liikkeitä, mutta poistat yksittäisiä ulos kasvaneita pidennyksiä koko setin sijaan ja lisäät sitten uusia.",
    "Artikkeli perustuu VaraaAi Academyn Ripset-kurssin oppituntiin ”Huolto ja poisto: vaihe vaiheelta”. Ensimmäinen osa on seitsemän vaihetta huoltoon asiakkaalle, joka palaa muutaman viikon kuluttua, toinen osa viisi vaihetta koko setin turvalliseen poistoon. Katso alla oleva video nähdäksesi, miten harjaa ja pinsettejä pidetään, ja lue vaiheet sitten uudelleen.",
  ],
  sections: [
    {
      id: "ennen-huoltoa-tai-poistoa",
      title: "Ennen ripsihuoltoa tai pidennysten poistoa",
      blocks: [
        { p: "Molemmat työt tehdään liimaa täynnä olevaan ripsiriviin aivan silmän vieressä. Siksi kaksi asiaa pysyy samana alusta loppuun: asiakkaan silmät ovat kiinni, etkä vedä yhtäkään pidennystä. Liima pitää pidennyksen omassa ripsessä, joten pidennystä vetämällä oma ripsi lähtee karvatupesta mukana." },
        { p: "Miksi asiakas tarvitsee huollon 2–3 viikon välein ja miksi öljy ei korvaa poistoainetta, käydään läpi artikkelissa [ripsienpidennysten huoltoväli](lesson:mi-dam-thao-hieu-dung). Tässä mennään suoraan käsien työhön." },
        {
          table: {
            head: ["Mitä näet asiakkaan tullessa", "Mitä teet"],
            rows: [
              ["Terveet silmät, harventunut setti, muutama ulos kasvanut ripsi", "Huolto: poista se mikä poistetaan, lisää uudet pidennykset"],
              ["Punaiset, kutisevat tai turvonneet silmät edellisen kerran jälkeen tai reaktion merkkejä nyt", "Ei huoltoa. Poista koko setti hyvin hellästi ja neuvo hakeutumaan lääkäriin"],
              ["Setti on liian sotkuinen, jokainen ripsi vinossa", "Pysähdy, kerro asiakkaalle rehellisesti ja ehdota poistoa ja uutta settiä"],
            ],
          },
        },
        { note: "Poistoaineen tyyppi, määrä ja vaikutusaika noudattavat aina valmistajan ohjetta. Kauneuspalveluja ja -tuotteita koskevat säännöt vaihtelevat maittain. Tämä on koulutusmateriaalia, ei ammattipätevyys.", kind: "info", title: "Huomio" },
      ],
    },
    {
      id: "poistovoiteen-kaytto",
      title: "Poistovoiteen käyttö: oikea kohta, oikea määrä, oikea aika",
      blocks: [
        {
          table: {
            head: ["Työ", "Mihin aine laitetaan", "Kuinka paljon"],
            rows: [
              ["Yhden pidennyksen poisto huollossa", "Täsmälleen sen pidennyksen liimakohtaan", "Pieni täplä kertakäyttöisen mikroharjan kärjessä"],
              ["Koko setin poisto", "Liimakohtia pitkin, hieman irti tyvestä, sisänurkasta ulkonurkkaan", "Ohut raita; ylimääräinen valuu silmää kohti"],
            ],
          },
        },
        { p: "Molemmissa tapauksissa aine pysyy vain ripsissä. Se ei koske luomen ihoa eikä silmän limakalvon reunaa. Kun huollossa poistetaan yksittäisiä pidennyksiä, aine ei koske myöskään tyveen eikä viereisiin siisteihin pidennyksiin, jotta ne pysyvät paikallaan." },
        { note: "Älä kiirehdi. Jos pyyhkäiset ennen valmistajan ilmoittaman ajan täyttymistä, liima ei ole pehmennyt ja vedät oman ripsen irti. Pysy odotuksen aikana asiakkaan luona, älä lähde pois.", kind: "tip", title: "Odota koko aika" },
      ],
    },
    {
      id: "yleiset-virheet",
      title: "Yleiset virheet ripsihuollossa ja poistossa",
      blocks: [
        {
          table: {
            head: ["Virhe", "Seuraus", "Tee näin"],
            rows: [
              ["Pyyhkäisy tai liu'utus ennen kuin liima on pehmennyt", "Oma ripsi lähtee karvatupesta", "Lisää hieman, odota pidempään ja yritä uudelleen"],
              ["Liikaa poistoainetta", "Aine valuu silmää kohti", "Ohut raita, vain ripsiin"],
              ["Poistoainetta jää omaan ripseen pidennyksen poiston jälkeen", "Uusi pidennys pitää huonosti", "Pyyhi pois ennen uuden kiinnittämistä"],
              ["Kiinnitys liian lyhyeen ja ohueen nuoreen ripseen", "Nuori ripsi kantaa enemmän kuin jaksaa", "Jätä se seuraavaan huoltoon"],
              ["Pidempi tai paksumpi pidennys kuin viimeksi, koska asiakas haluaa näyttävämmät", "Omat ripset ylikuormittuvat", "Pidennys vastaa aina sitä, mitä oma ripsi jaksaa"],
              ["Poistoainetta jää ripsiin koko setin poiston jälkeen", "Voi ärsyttää", "Pese huolellisesti ripsishampoolla, huuhtele puhtaalla vedellä ja kuivaa"],
            ],
          },
        },
      ],
    },
    {
      id: "jos-kirvelee",
      title: "Mitä teet, jos asiakasta kirvelee poiston aikana",
      blocks: [
        { p: "Kerro asiakkaalle ennen poistoaineen laittamista yksi asia: jos jokin kirvelee tai polttaa, sano heti. Poistoainetta ei saa joutua silmään, ja kirvely on merkki lopettaa. Älä nopeuta saadaksesi työn valmiiksi, äläkä pyydä asiakasta avaamaan silmiä tarkistusta varten. Lopeta, pyyhi poistoaine pois ja toimi kuten oppitunnilla [Vahinkotilanteet](lesson:xu-ly-su-co)." },
        { p: "Kun setti poistetaan reaktion vuoksi, silmänympärysiho on herkkä. Työskentele hyvin hellästi ja hitaasti äläkä käytä yhtään tarpeetonta tuotetta. Neuvo poiston jälkeen asiakasta hakeutumaan lääkäriin ja kirjaa asia hänen tietoihinsa. Liima-allergian oireet ovat oppitunnilla [Allergiat ja kemikaalit](lesson:di-ung-hoa-chat)." },
        { p: "Silmänalustyynyt tarvitaan myös koko setin poistossa. Nyt ne suojaavat lisäksi ihoa ja alaripsiä poistoaineelta, joten aseta ne huolellisesti." },
      ],
    },
    {
      id: "kirjaus-ja-ajanvaraus",
      title: "Käynnin jälkeen: siivous, kirjaus ja seuraava huolto",
      blocks: [
        { p: "Käytetyt vanupuikot, mikroharjat ja tyynyt kannelliseen roska-astiaan. Pinsetit puhdistetaan ja desinfioidaan kuten artikkelissa [kauneushoitolan välinehuolto](lesson:ve-sinh-dung-cu)." },
        { img: { src: img("bo-do-dung-mot-lan-vao-thung-co-nap"), alt: "Mustaan käsineeseen puettu käsi pudottaa kertakäyttötarvikkeita valkoiseen kannelliseen astiaan kivipöydällä, taustalla sängyllä lepäävä asiakas", caption: "Kertakäyttötarvikkeet suoraan kannelliseen astiaan jokaisen asiakkaan jälkeen." } },
        { p: "Varaa seuraava huolto asiakkaan vielä istuessa, yleensä 2–3 viikon päähän. Kirjaa sitten VaraaAissa [asiakkaan tietojen](lesson:khach-hang) sisäisiin muistiinpanoihin neljä asiaa: miten ripset pysyivät, montako pidennystä poistit, mahdollinen ripsien lähtemisen syy ja mitä ohjeita annoit. Seuraavalla kerralla kuka tahansa huollon tekee, tietää mihin kiinnittää huomiota." },
        { note: "Avaa ripsikartta asiakkaan sisäisistä muistiinpanoista ennen huoltoa ja päivitä muistiinpanot lopuksi. Samalla kartalla tehty huolto näyttää yhtä tasaiselta kuin ensimmäinen setti.", kind: "tip", title: "Ripsikartta on asiakkaan tiedoissa" },
        { p: "Jos salonki ottaa varauksia VaraaAin kautta, luo [huoltoaika](lesson:lich-hen) suoraan tiskillä ja pidä ”Ripsien huolto” ja ”Ripsienpidennysten poisto” kahtena erillisenä [palveluna](lesson:dich-vu), jotta asiakas varaa juuri sen työn, jota tarvitsee." },
      ],
    },
  ],
  howTo: {
    title: "Ripsihuolto ja ripsienpidennysten poisto vaihe vaiheelta",
    id: "ripsihuollon-ja-poiston-vaiheet",
    after: "ennen-huoltoa-tai-poistoa",
    lead: "Vaiheet 1–7 ovat huolto. Vaiheet 8–12 poistavat koko setin.",
    supplies: [
      "Ripsien poistoaine valmistajan ohjeen mukaan (oppitunnilla voide)",
      "Kertakäyttöiset mikroharjat ja vanupuikot",
      "Ripsishampoo, pehmeä harja ja puhdasta vettä",
      "Silmänalustyynyt",
      "Suorat pinsetit ja kiinnityspinsetit",
      "Asiakkaan kirjatun kartan mukaiset pidennykset ja liima (huoltoon)",
      "Kertakäyttöiset ripsiharjat",
    ],
    steps: [
      {
        name: "Huolto: kuulumiset ja silmien tarkistus",
        text: "Asiakas istuu silmät auki. Kysy, olivatko silmät punaiset, kutisevat tai turvonneet edellisen kerran jälkeen, paljonko ripsiä lähti ja häiritsikö jokin. Katso silmät hyvässä valossa. Reaktion merkit tarkoittavat, ettei huoltoa tehdä: siirry koko setin poistoon.",
        image: { src: img("nhin-mat-khach-duoi-anh-sang-truoc-khi-dam-mi"), alt: "Ripsistylisti mustissa käsineissä pitää suurennuslasia ja katsoo istuvan asiakkaan avointa silmää kirkkaan rengasvalon alla studiossa" },
      },
      {
        name: "Puhdista ripset ja aseta tyynyt",
        text: "Asiakas käy makuulle silmät kiinni. Pese sekä pidennykset että omat ripset ripsishampoolla ja pehmeällä harjalla, koska muutamassa viikossa tyveen on kertynyt talia ja pölyä. Huuhtele puhtaalla vedellä, kuivaa huolellisesti ja aseta tyynyt peittämään kaikki alaripset koskematta silmän limakalvon reunaan, kuten artikkelissa [ripsien esikäsittely](lesson:mi-chuan-bi).",
      },
      {
        name: "Tarkista jokainen ripsi",
        text: "Harjaa ripset ja vedä suorat pinsetit kevyesti ripsirivin yli, ripsi kerrallaan katsoen. Etsi ulos kasvaneet pidennykset, joiden liimakohta on kaukana luomesta tai jotka ovat kääntyneet sivuttain tai sojottavat. Etsi myös tarttumat ja löysät. Ne poistetaan; siistit jäävät.",
        image: { src: img("kiem-tra-tung-soi-mi-noi-bang-nhip-thang"), alt: "Mustaan käsineeseen puetun käden suorien pinsettien kärki nostaa ulos kasvaneen, sojottavan pidennyksen asiakkaan suljetun silmän ulkonurkasta" },
      },
      {
        name: "Laita poistoainetta vain liimakohtaan",
        text: "Ota hieman poistovoidetta kertakäyttöisen mikroharjan kärkeen. Taputa sitä vain poistettavan pidennyksen liimakohtaan, ei koskaan luomen iholle eikä tyveen. Odota valmistajan ilmoittama aika, jotta liima pehmenee.",
        image: { src: img("cham-kem-thao-vao-moi-keo-cua-mot-soi-mi"), alt: "Mustaan käsineeseen puetun käden pieni vanukärkinen harja taputtaa vähän vaaleanpunaista poistovoidetta yhteen pidennykseen, asiakkaan silmä kiinni valkoisen tyynyn yllä" },
      },
      {
        name: "Liu'uta pidennys pois, älä vedä",
        text: "Toiset pinsetit pitävät omaa ripseä paikallaan, toisilla liu'utat pidennyksen varovasti kärkeä kohti ja pois. Jos se ei liu'u, liima ei ole vielä pehmennyt: lisää hieman, odota pidempään ja yritä uudelleen. Pyyhi lopuksi jäljelle jäänyt poistoaine omasta ripsestä, jotta uusi pidennys pitää hyvin.",
        image: { src: img("truot-soi-mi-noi-ra-bang-hai-nhip"), alt: "Kahdet pinsetit mustiin käsineisiin puetuissa käsissä, toiset pitävät omaa ripseä ja toiset liu'uttavat vaaleanpunaisella poistoaineella peitettyä pidennystä kärkeä kohti" },
      },
      {
        name: "Täytä kirjatun kartan mukaan",
        text: "Juuri vapautuneisiin omiin ripsiin ja riittävän pitkiksi kasvaneisiin nuoriin ripsiin: eristä ripsi kerrallaan ja kiinnitä kuten artikkeleissa [klassiset ripset](lesson:mi-classic) tai [volyymiripset](lesson:mi-volume), asiakkaan tietoihin kirjatun kartan mukaan. Jätä vielä liian lyhyet ja ohuet nuoret ripset seuraavaan kertaan. Älä valitse pidempää tai paksumpaa kuin viimeksi vain siksi, että asiakas haluaa näyttävämmät.",
      },
      {
        name: "Tarkista tarttumat ja viimeistele",
        text: "Vedä pinsetit jokaisen alueen jälkeen tyvestä kärkeen: jokaisen ripsen on seistävä omillaan. Harjaa uudelleen, vertaa silmiä ja poista tyynyt silmien ollessa vielä kiinni. Varaa seuraava huolto ja kirjaa käynti asiakkaan tietoihin.",
      },
      {
        name: "Poisto: aseta tyynyt ja ohjeista asiakas",
        text: "Aseta tyynyt huolellisesti peittämään kaikki alaripset; nyt ne suojaavat myös ihoa ja alaripsiä poistoaineelta. Asiakkaan silmät pysyvät kiinni. Pyydä häntä sanomaan heti, jos jokin kirvelee tai polttaa.",
      },
      {
        name: "Levitä ohut raita voidetta liimakohtiin",
        text: "Levitä mikroharjalla ohut raita poistovoidetta liimakohtia pitkin, hieman irti tyvestä, sisänurkasta ulkonurkkaan. Voide pysyy vain ripsissä, irti luomen iholta ja limakalvon reunasta, eikä ylimääräistä laiteta. Odota valmistajan ilmoittama aika asiakkaan luona.",
        image: { src: img("boi-kem-thao-mi-doc-moi-keo"), alt: "Mustaan käsineeseen puetun käden mikroharja vetää ohuen raidan vaaleanpunaista poistovoidetta silmät kiinni makaavan asiakkaan pidennyksiä pitkin, silmän alla tyyny" },
      },
      {
        name: "Pyyhkäise kevyesti tyvestä kärkeen",
        text: "Pyyhkäise vanupuikolla tai puhtaalla mikroharjalla kevyesti ripsiä pitkin tyvestä kärkeen. Pidennykset liukuvat irti ja putoavat tyynylle. Käytä joka vedolla puhdasta puolta tai uutta puikkoa. Jos jokin vielä pitää, lisää voidetta ja odota; älä koskaan vedä.",
        image: { src: img("vuot-mi-noi-tu-chan-ra-ngon-bang-que-bong"), alt: "Mustaan käsineeseen puetun käden vanupuikko pyyhkäisee silmät kiinni makaavan asiakkaan ripsiä pitkin, muutama irrotettu pidennys valkoisella tyynyllä" },
      },
      {
        name: "Pese poistoaine pois",
        text: "Ripsiin jäänyt poistoaine voi ärsyttää. Pese ripset huolellisesti ripsishampoolla harjaten tyvestä kärkeen, huuhtele puhtaalla vedellä ja kuivaa.",
        image: { src: img("rua-sach-kem-thao-mi-bang-bot-rua-mi"), alt: "Ripsishampoon vaahdon peittämä pehmeä harja mustaan käsineeseen puetussa kädessä harjaa silmät kiinni makaavan asiakkaan ripsiä, valkoinen tyyny yhä silmän alla" },
      },
      {
        name: "Tarkista omat ripset ja anna kotihoito-ohjeet",
        text: "Tarkista, onko pidennyksiä tai liimaa jäänyt ja onko omissa ripsissä katkenneita tai harvoja kohtia, ja kysy, kirveleekö tai polttaako. Poista tyynyt varovasti ja anna asiakkaan avata silmät hitaasti. Kerro etukäteen, että omat ripset näyttävät poiston jälkeen usein harvemmilta kuin hän muistaa, ja että se on normaalia. Neuvo: ei hieromista, öljyttömät tuotteet ja kevyt harjaus.",
        image: { src: img("mi-that-sau-khi-thao-het-mi-noi"), alt: "Lähikuva suljetusta silmästä kaikkien pidennysten poiston jälkeen, omat ripset lyhyet ja ohuet, muutama irrotettu pidennys valkoisella tyynyllä" },
      },
    ],
  },
  faq: [
    {
      q: "Millä ripsienpidennykset poistetaan?",
      a: "Ammattikäyttöön tarkoitetulla ripsien poistoaineella; oppitunnilla käytetään voidetta, koska se pysyy siinä mihin se laitetaan. Poistoaine pehmentää liiman, minkä jälkeen pidennykset pyyhkäistään tai liu'utetaan irti omista ripsistä. Tuotteen tyyppi, määrä ja vaikutusaika noudattavat aina valmistajan ohjetta.",
    },
    {
      q: "Kuinka kauan poistoaineen annetaan vaikuttaa ennen pidennysten poistoa?",
      a: "Täsmälleen niin kauan kuin tuotteen valmistaja ohjeistaa, ja aika vaihtelee tuotteittain. Jos pyyhkäiset ennen kuin liima on pehmennyt, oma ripsi lähtee mukana. Jos pidennys ei vieläkään liu'u irti, lisää vähän poistoainetta, odota pidempään ja yritä uudelleen.",
    },
    {
      q: "Poistetaanko huollossa kaikki vanhat pidennykset?",
      a: "Ei. Huollossa ripsistylisti poistaa vain ulos kasvaneet pidennykset, tarttumat ja löysät, pienellä poistoainetäplällä kunkin liimakohtaan. Siistit ja yhä luomen lähellä olevat pidennykset jäävät. Koko setti poistetaan vain, kun se on liian sotkuinen tai asiakkaalla on reaktio.",
    },
    {
      q: "Mitä jos ripsienpidennys ei irtoa?",
      a: "Se tarkoittaa, ettei liima ole vielä pehmennyt. Lisää hieman poistoainetta, odota pidempään ja yritä uudelleen. Älä koskaan vedä kovempaa, koska silloin oma ripsi lähtee karvatupesta.",
    },
    {
      q: "Mitä tehdään, jos asiakkaan silmiä kirvelee poiston aikana?",
      a: "Lopeta heti, pyyhi poistoaine pois ja toimi Vahinkotilanteet-oppitunnin mukaan. Poistoainetta ei saa joutua silmään, joten asiakkaan silmät pysyvät kiinni koko ajan ja hänelle kerrotaan etukäteen, että kirvelystä tai poltteesta sanotaan heti.",
    },
    {
      q: "Miksi koko setin poistossa käytetään silmänalustyynyjä?",
      a: "Tyynyt peittävät alaripset ja silmänalusihon, jolloin poistoaine ei pääse iholle, alaripsiin eikä silmään. Irtoavat pidennykset putoavat myös tyynylle eivätkä asiakkaan kasvoille.",
    },
  ],
  related: ["mi-dam-thao-hieu-dung", "mi-classic", "mi-chuan-bi", "xu-ly-su-co"],
};

export default article;
