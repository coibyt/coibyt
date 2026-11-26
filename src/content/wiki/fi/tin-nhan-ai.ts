import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/tin-nhan-ai/${name}.webp`;
const shot = (name: string) => `/wiki/tin-nhan-ai/fi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "tekoalyavustaja-salongille-asiakasviestit",
  lesson: "tin-nhan-ai",
  category: "salon",
  title: "Tekoälyavustaja salongille: asiakasviestit yhteen paikkaan, pikavastaukset ja vastaaja poissaolon ajaksi",
  metaTitle: "Tekoälyavustaja salongille: viestit, pikavastaukset",
  metaDescription:
    "Näin käytät VaraaAin Viestit-sivua kynsi-, hius- tai hoitolassa: suodata lukemattomat, vastaa pikavastauksilla, anna tekoälyn vastata ja ota ilmoitukset käyttöön.",
  keyword: "tekoälyavustaja salongille",
  keywords: [
    "chatbot kauneushoitolalle",
    "automaattinen vastaus asiakkaan viestiin",
    "pikavastaukset asiakkaille",
    "vastaus ajanvarauskyselyyn",
    "asiakasviestit yhteen paikkaan",
    "vastaa asiakkaille kiireen keskellä",
    "chat-ikkuna salongin verkkosivuille",
  ],
  excerpt: "Viestit-sivu kokoaa asiakkaiden viestit yhteen paikkaan. Pikavastaus lähtee yhdellä napautuksella, ja tekoälyavustaja vastaa palvelujesi ja tuotteidesi pohjalta, kun sinulla on kiire.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("chu-tiem-va-khach-noi-chuyen-ben-quay"),
    alt: "Vaaleahiuksinen mies neuleessa hymyilee ja juttelee puhelinta pitelevän naisen kanssa puisen tiskin ääressä korkean ikkunan vieressä",
  },
  takeaways: [
    "”Viestit”-sivu kokoaa kaikki asiakasviestit yhteen paikkaan, ja näet **lukemattomien** ja **vastaustasi odottavien** viestien määrän.",
    "Viisi pikavastausta on valmiina: ”Tervetuloa”, ”Varaaminen”, ”Vapaana”, ”Täynnä” ja ”Kiitos”. Voit muokata niitä ennen lähettämistä ja lisätä omia.",
    "Valitse **”Ota tekoälyavustaja käyttöön”**, niin tekoäly vastaa asiakkaille poissaolosi aikana **salongin palvelujen ja tuotteiden** pohjalta.",
    "Asiakas voi silti milloin tahansa napauttaa ”Puhu omistajan kanssa” ja saada oikean ihmisen.",
    "Paina ”Ota ilmoitukset käyttöön tällä laitteella”, niin et missaa yhtään viestiä.",
  ],
  intro: [
    "Tekoälyavustaja salongille kiinnostaa omistajia hyvin käytännöllisestä syystä: kun asiakas lähettää viestin, kädessäsi on sivellin tai sakset. Viesti, johon kukaan ei vastaa, on menetetty asiakas. VaraaAin Viestit-sivu kokoaa asiakkaiden viestit yhteen paikkaan, siinä on valmiit vastaukset ja tekoälyavustaja, joka päivystää, kun sinulla on kiire.",
    "Tämä artikkeli seuraa VaraaAi Academyn oppituntia ”Viestit ja tekoälyavustaja”. Opit lukemaan viestilaatikon luvut, vastaamaan asiakkaalle itse tai pikavastauksella, ottamaan tekoälyavustajan käyttöön ja ymmärtämään, mihin sen vastaukset perustuvat.",
  ],
  sections: [
    {
      id: "hidas-vastaus",
      title: "Miksi hidas vastaus vie salongilta asiakkaita",
      blocks: [
        { p: "Asiakas, joka kysyy, onko lauantai-iltapäivänä vapaata, tekee yleensä päätöksensä juuri silloin. Jos salonki on hiljaa, hän kirjoittaa seuraavalle. Kauneudenhoito on lisäksi työtä, jonka lomasta on vaikeinta vastata nopeasti: kynsiä tai ripsiä tehdessä ei voi laskea käsiä ja tarttua puhelimeen." },
        { img: { src: shot("vastaus-lahetetty-asiakkaalle"), alt: "Keskustelu asiakas Namin kanssa: kysymys vapaasta geelimanikyyriajasta lauantai-iltapäivänä ja kultaisella korostettu vastaus Kyllä on! Voit varata lauantaille kello 14", caption: "Tyypillinen kysymys ja vastaus. Ylärivi kertoo, onko tekoälyavustaja salongissa päällä vai pois." } },
        { p: "Asiakkaan odotusta voi lyhentää kolmella tavalla, ja ”Viestit”-sivulla ovat kaikki kolme. Viestit ovat yhdessä paikassa, joten mikään ei huku. Pikavastaukset vähentävät kirjoittamisen yhteen napautukseen. Tekoälyavustaja vastaa silloin, kun sinä et pysty." },
        { p: "Jos haluat nähdä, miltä viestin lähettäminen näyttää asiakkaan puolelta, lue ohje [viestin lähettämisestä salongille](lesson:chat-voi-salon)." },
      ],
    },
    {
      id: "viestilaatikko-ja-luvut",
      title: "Asiakasviestit yhteen paikkaan: salongin viestilaatikko",
      blocks: [
        { p: "”Viestit”-sivun yläosassa on lukuruutuja. Yhdellä silmäyksellä näet, paljonko työtä viesteissä on tänään:" },
        {
          table: {
            head: ["Ruutu", "Merkitys", "Mitä teet"],
            rows: [
              ["”Keskustelut”", "Asiakaskeskustelujen määrä", "Vain yleiskuvaksi"],
              ["”Lukemattomat”", "Viestit, joita et ole avannut", "Lue ne ensin, vaikka et ehtisi vastata heti"],
              ["”Odottaa vastaustasi”", "Viestit, joissa asiakas odottaa vastaustasi", "Tämä luku kannattaa saada ensimmäisenä nollaan"],
              ["”Tekoälyn vastaukset (30 pv)”", "Tekoälyavustajan vastausten määrä 30 päivässä", "Kertoo, paljonko työtä avustaja ottaa sinulta"],
            ],
          },
        },
        { p: "Niiden alla ovat hakukenttä ”Hae asiakasta…” ja asiakaslista. Suodattimet ”Lukemattomat” ja ”Odottaa” rajaavat listan keskusteluihin, jotka tarvitsevat sinua. Hyvä tapa on avata ”Odottaa” kahden asiakkaan välissä ja vastata kaikille kerralla." },
      ],
    },
    {
      id: "pikavastaukset",
      title: "Pikavastaukset asiakkaille: viisi valmista ja omat",
      blocks: [
        { p: "Suurin osa asiakkaiden viesteistä pyörii muutaman saman kysymyksen ympärillä. Siksi viestikentän alla on ”Pikavastaukset”-rivi, jossa on viisi valmista vastausta:" },
        {
          table: {
            head: ["Pikavastaus", "Käytä, kun"],
            rows: [
              ["”Tervetuloa”", "Aloitat keskustelun juuri kirjoittaneen asiakkaan kanssa"],
              ["”Varaaminen”", "Asiakas kysyy, miten aika varataan"],
              ["”Vapaana”", "Asiakas kysyy, onko tilaa, ja sitä on"],
              ["”Täynnä”", "Asiakkaan kysymä aika on jo varattu"],
              ["”Kiitos”", "Päätät keskustelun"],
            ],
          },
        },
        { p: "Napauta pikavastausta, niin teksti täyttyy valmiiksi, ja voit silti muokata sitä ennen lähettämistä. Käytä sitä hyväksi: lisää tarkka kellonaika tai palvelun nimi, niin asiakas kokee saavansa henkilökohtaisen vastauksen. Oppituntivideossa asiakkaalle kerrotaan, että tilaa on, ja tarjotaan lauantaita kello 14." },
        { img: { src: shot("pikavastaukset-tervetuloa-varaaminen"), alt: "Pikavastaukset-rivi, jossa Tervetuloa ja Varaaminen on korostettu kultaisella viestikentän alla, kenttään on kirjoitettu Nähdään lauantaina kello 14", caption: "Pikavastaukset ovat heti viestikentän alla." } },
        { p: "Voit tehdä myös omia vastauksia painikkeella ”Lisää vastaus”. Tee sellainen kaikesta, mitä huomaat kirjoittavasi yhä uudelleen. Tavallisia esimerkkejä kauneushoitolassa ovat ajo-ohjeet ja pysäköinti, ohjeet ennen ripsiaikaa ja salongin maksutavat." },
        { note: "Hyvä pikavastaus vastaa kysymykseen ja kertoo seuraavan askeleen. Kun olet kertonut, että tilaa on, pyydä asiakasta varaamaan salongin [varauslinkin](lesson:chia-se-link) kautta, niin aika on heti hänen.", kind: "tip", title: "Vastaa ja kerro seuraava askel" },
      ],
    },
    {
      id: "mihin-tekoaly-perustuu",
      title: "Mihin salongin tekoälyavustajan vastaukset perustuvat",
      blocks: [
        { p: "”Viestiasetukset”-kohdassa on osio ”Tekoälyavustaja, kun olet poissa”. Näytön teksti kertoo kaksi asiaa. Kun avustaja on päällä, se vastaa asiakkaille automaattisesti salongin nykyisten palvelujen ja tuotteiden perusteella. Ja asiakas voi milloin tahansa napauttaa ”Puhu omistajan kanssa” ja pyytää sinua vastaamaan itse." },
        { img: { src: shot("tekoalyavustaja-kun-olet-poissa"), alt: "Viestiasetukset, joissa osio Tekoälyavustaja, kun olet poissa on korostettu kultaisella selitysteksteineen ja Ota tekoälyavustaja käyttöön -valintaruutuineen" } },
        { p: "Ensimmäinen asia ratkaisee vastausten laadun. Tekoälyavustaja toistaa sen, mitä salongin sivulla on. Väärä hinta palveluvalikossa tarkoittaa väärää hintaa vastauksessa. Palvelu, jota et enää tee mutta joka on yhä listalla, tulee yhä ehdotetuksi. Tarkista siksi ennen käyttöönottoa kaksi paikkaa:" },
        {
          ul: [
            "**Palveluvalikko**: nimet, kestot ja hinnat todellisuuden mukaisiksi. Katso ohje [salongin palveluista ja hinnoista](lesson:dich-vu).",
            "**Tuotteet**, jos myyt niitä: nimet, hinnat ja saatavuus. Katso ohje [tuotemyynnistä ja tilausten hallinnasta](lesson:san-pham-don-hang).",
          ],
        },
        { p: "Toinen asia estää asiakasta jäämästä koneen armoille. Joihinkin kysymyksiin osaa vastata vain salongin ihminen, esimerkiksi erityiseen kynsikoristetoiveeseen tai valitukseen. Kun asiakas napauttaa ”Puhu omistajan kanssa”, saat ilmoituksen ja voit vastata itse." },
        { note: "Tekoälyavustaja päivystää poissaolosi aikana, se ei korvaa sinua. Avaa viestit silti joka päivä, lue, mitä tekoäly on vastannut, ja jatka itse siinä, missä asiakas tarvitsee oikeaa ihmistä.", kind: "warn", title: "Joku lukee silti perään" },
      ],
    },
    {
      id: "ilmoitukset-ja-chat-ikkuna",
      title: "Ota ilmoitukset käyttöön ja lisää chat-ikkuna salongin verkkosivuille",
      blocks: [
        { p: "Tekoälyosion alla on kohta ”Ilmoitukset, kun asiakas haluaa puhua kanssasi”. Paina ”Ota ilmoitukset käyttöön tällä laitteella”, niin kädessäsi oleva puhelin tai tabletti saa push-ilmoituksen sähköpostin lisäksi, kun asiakas napauttaa ”Puhu omistajan kanssa”. Ilmoitukset otetaan käyttöön laitekohtaisesti, joten paina painiketta siinä laitteessa, joka kulkee mukanasi." },
        { p: "Samalla asetussivulla on osio ”Upota chat-ikkuna”. Kuvauksen mukaan asiakkaat voivat sen avulla keskustella kanssasi suoraan omilla verkkosivuillasi, he eivät tarvitse tiliä, ja viestit tulevat tähän samaan viestilaatikkoon. Osion painikkeita ovat ”Näytä sivu” ja ”Kopioi linkki” sekä upotuskoodin haku. Jos salongilla ei vielä ole omia sivuja, katso ohje [ilmaisista verkkosivuista salongille](lesson:website-salon)." },
      ],
    },
    {
      id: "arjen-tilanteet",
      title: "Arjen tilanteita asiakasviestien kanssa",
      blocks: [
        {
          table: {
            head: ["Tilanne", "Mitä teet"],
            rows: [
              ["Asiakas kysyy vapaata aikaa, kun olet kesken työn", "Napauta ”Vapaana” tai ”Täynnä”, lisää tarkka aika ja lähetä"],
              ["Viestejä tulee aukioloaikojen ulkopuolella", "Ota tekoälyavustaja käyttöön, niin asiakas saa heti vastauksen palveluista ja tuotteista"],
              ["Tekoäly kertoo väärän hinnan", "Korjaa hinta palveluvalikossa. Tekoäly vastaa salongin nykyisten palvelujen ja tuotteiden pohjalta"],
              ["Asiakas haluaa puhua oikean ihmisen kanssa", "Asiakas napauttaa ”Puhu omistajan kanssa”. Saat ilmoituksen ja vastaat itse"],
              ["Viestejä jää huomaamatta", "Paina ”Ota ilmoitukset käyttöön tällä laitteella” siinä laitteessa, jota käytät päivittäin"],
            ],
          },
        },
      ],
    },
  ],
  howTo: {
    title: "Näin vastaat asiakasviesteihin ja otat tekoälyavustajan käyttöön VaraaAissa",
    id: "viestien-ja-tekoalyn-vaiheet",
    after: "viestilaatikko-ja-luvut",
    lead: "Seitsemän vaihetta kulkevat viestilaatikosta yhden keskustelun kautta asetuksiin oppituntivideon järjestyksessä.",
    steps: [
      {
        name: "Avaa ”Viestit”",
        text: "Napauta hallintapaneelissa ”Viestit”. Ylhäällä näet keskustelujen määrän, lukemattomat viestit ja vastaustasi odottavat viestit. Katso nämä ensin, niin tiedät, odottaako joku.",
        image: { src: shot("viestit-keskustelut-lukemattomat-odottaa"), alt: "Viestilaatikon lukuruudut kultaisella korostettuna: 1 keskustelu, 2 lukematonta, 1 odottaa vastaustasi ja 0 tekoälyn vastausta 30 päivässä" },
      },
      {
        name: "Suodata ”Lukemattomat” tai ”Odottaa”",
        text: "Napauta hakukentän alla ”Lukemattomat” tai ”Odottaa”, niin listassa näkyvät vain sinua tarvitsevat asiakkaat. Kun keskusteluja on paljon, suodatin estää odottavaa asiakasta jäämästä huomaamatta.",
        image: { src: shot("suodata-lukemattomat-odottaa"), alt: "Suodatinrivi Kaikki, Lukemattomat ja Odottaa korostettuna kultaisella viestilaatikon asiakaslistan yläpuolella" },
      },
      {
        name: "Avaa keskustelu napauttamalla asiakasta",
        text: "Napauta asiakkaan nimeä listassa. Keskustelu aukeaa, ylhäällä on asiakkaan nimi ja alla viestit. Lue koko kysymys ennen kuin vastaat.",
        image: { src: shot("napauta-asiakasta-avaa-keskustelu"), alt: "Viestilaatikon lista, jossa asiakas Namin rivi on korostettu kultaisella ja näkyvissä on viimeisin viesti lauantain kello 14 ajasta" },
      },
      {
        name: "Kirjoita vastaus ja lähetä",
        text: "Kirjoita vastauksesi näytön alareunan viestikenttään ja paina oikealla olevaa lähetyspainiketta. Vastaa juuri siihen, mitä asiakas kysyi, ja kerro tarkka aika, jos hän kysyi vapaita aikoja.",
        image: { src: shot("kirjoita-vastaus-ja-laheta"), alt: "Viestikenttä kultaisella korostettuna, kenttään kirjoitettu Nähdään lauantaina kello 14 ja vieressä pyöreä lähetyspainike, alla pikavastaukset" },
      },
      {
        name: "Käytä pikavastausta, niin käy nopeammin",
        text: "Viestikentän alla ovat ”Tervetuloa”, ”Varaaminen”, ”Vapaana”, ”Täynnä” ja ”Kiitos”. Napauta yhtä, muokkaa sopivaksi ja lähetä. Paina ”Lisää vastaus”, kun haluat tehdä oman vastauksen asioista, joita kirjoitat usein.",
      },
      {
        name: "Valitse ”Ota tekoälyavustaja käyttöön”",
        text: "Vieritä alas kohtaan ”Viestiasetukset” ja rastita ”Ota tekoälyavustaja käyttöön”. Siitä lähtien tekoäly vastaa asiakkaille poissaolosi aikana salongin palvelujen ja tuotteiden pohjalta. Asiakas voi silti napauttaa ”Puhu omistajan kanssa”, kun haluaa sinut.",
        image: { src: shot("ota-tekoalyavustaja-kayttoon"), alt: "Ota tekoälyavustaja käyttöön -valintaruutu korostettuna kultaisella Viestiasetusten osiossa Tekoälyavustaja, kun olet poissa" },
      },
      {
        name: "Paina ”Ota ilmoitukset käyttöön tällä laitteella”",
        text: "Paina heti alapuolella ”Ota ilmoitukset käyttöön tällä laitteella”. Laite ilmoittaa sinulle, kun asiakas haluaa puhua kanssasi, joten et missaa viestejä, vaikka hallintapaneeli ei olisi auki.",
        image: { src: shot("ota-ilmoitukset-kayttoon-talla-laitteella"), alt: "Ota ilmoitukset käyttöön tällä laitteella -painike korostettuna kultaisella, alla Upota chat-ikkuna -osio sekä Näytä sivu ja Kopioi linkki" },
      },
    ],
  },
  faq: [
    {
      q: "Mihin VaraaAin tekoälyavustajan vastaukset perustuvat?",
      a: "Avustaja vastaa salongin nykyisten palvelujen ja tuotteiden pohjalta. Pidä siksi palvelujen nimet, hinnat ja tuotteet ajan tasalla, koska tekoäly toistaa juuri sen, mitä salongin sivulla on.",
    },
    {
      q: "Miten asiakas saa oikean ihmisen, kun tekoälyavustaja on päällä?",
      a: "Asiakas napauttaa milloin tahansa ”Puhu omistajan kanssa”. Saat ilmoituksen ja voit vastata itse.",
    },
    {
      q: "Miten otan käyttöön tekoälyn automaattiset vastaukset asiakkaiden viesteihin?",
      a: "Avaa ”Viestit”, vieritä alas kohtaan ”Viestiasetukset” ja rastita ”Ota tekoälyavustaja käyttöön”. Tekoäly vastaa sen jälkeen asiakkaille, kun olet poissa.",
    },
    {
      q: "Voinko muokata pikavastausta ennen lähettämistä?",
      a: "Voit. Pikavastaukset ovat viestikentän alla, ja voit muokata tekstiä ennen lähettämistä. Painikkeella ”Lisää vastaus” teet myös omia vastauksia.",
    },
    {
      q: "Mikä on nopein tapa vastata kysymykseen vapaista ajoista?",
      a: "Napauta viestikentän alla pikavastausta ”Vapaana”, lisää tarvittaessa tarkka aika ja lähetä. Jos aika on jo varattu, käytä vastausta ”Täynnä”.",
    },
    {
      q: "Miten varmistan, ettei yksikään asiakasviesti jää huomaamatta?",
      a: "Paina ”Viestiasetuksissa” ”Ota ilmoitukset käyttöön tällä laitteella” siinä laitteessa, jota käytät päivittäin. Suodata viestilaatikossa ”Lukemattomat” tai ”Odottaa”, niin näet heti, kuka odottaa.",
    },
  ],
  related: ["khach-hang", "danh-gia-google", "dich-vu", "chat-voi-salon"],
};

export default article;
