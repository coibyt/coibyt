import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/noi-mi-co-hai-mi-that/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "pilaavatko-ripsienpidennykset-omat-ripset",
  lesson: "noi-mi-co-hai-mi-that",
  category: "tips",
  title: "Pilaavatko ripsienpidennykset omat ripset? Milloin ripset harvenevat ja miten sen välttää",
  metaTitle: "Pilaavatko ripsienpidennykset omat ripset? Näin tunnistat",
  metaDescription:
    "Pilaavatko ripsienpidennykset omat ripset? Oikea kiinnitys noin 1 mm luomesta vs. paakkuuntunut liima, sopiva paino ja miksi pidennyksiä ei revitä itse.",
  keyword: "pilaavatko ripsienpidennykset omat ripset",
  keywords: ["lähtevätkö omat ripset pidennysten takia", "ripsienpidennykset haitat", "paakkuuntunut ripsiliima", "ripsienpidennysten poisto kotona", "liian painavat ripsienpidennykset", "ripsienpidennykset pitkäaikainen käyttö"],
  excerpt: "Ripsienpidennykset vievät omia ripsiä vain väärin tehtyinä: paakkuuntunut liima, liimaa iholla, liian raskaat pidennykset tai itse revityt ripset. Näin tunnistat oikein tehdyn työn.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-mi-so-hai-mat-khach-tu-dau-giuong"),
    alt: "Hoitosängyn päästä kuvattuna asiakas makaa silmät kiinni suojatyynyt silmien alla, ja käsineiset kädet lepäävät kasvojen molemmin puolin",
  },
  takeaways: [
    "Oikein tehdyt ripsienpidennykset eivät saa omia ripsiä lähtemään: ne kasvavat ja irtoavat oman kiertonsa mukaan.",
    "Oikea kiinnitys tarkoittaa yhtä pidennystä **yhdessä omassa ripsessä** noin 1 mm:n päässä luomesta, liima ei koske ihoon ja jokainen ripsi on erillään.",
    "Väärin tehdyssä työssä **paakkuuntunut liima** liimaa useita ripsiä yhteen, ja kun yksi irtoaa, se vie viereiset mukanaan.",
    "Pidennyksen pitää **sopia omalle ripselle**: ohut ripsi ei kestä liian pitkää tai paksua pidennystä, vaan katkeaa.",
    "Kun haluat pidennyksistä eroon, mene salonkiin poistoon liimanpoistoaineella. Älä revi niitä itse.",
  ],
  intro: [
    "Pilaavatko ripsienpidennykset omat ripset, ja jäävätkö luomet paljaiksi, kun pidennykset lähtevät? Lähes jokainen miettii tätä ennen ensimmäisiä pidennyksiään. Vastaus löytyy tekniikasta. Oikein tehdyt pidennykset antavat omien ripsien kasvaa ja irrota normaalisti; väärin tehty, paakkuuntunut liimaus on se, mikä harventaa niitä.",
    "Artikkeli perustuu VaraaAi Academyn kurssin ”Moja Beauty: ripset, kynnet ja kulmat” oppituntiin ”Pilaavatko ripsienpidennykset omat ripset?”. Kurssi on lyhyitä asiakasvideoita helsinkiläiseltä Moja Beauty -salongilta. Luettuasi tunnistat oikean ja väärän kiinnityksen, ymmärrät miksi pidennyksen paino on tärkeä ja tiedät, mitä tehdä, kun haluat pidennykset pois.",
  ],
  sections: [
    {
      id: "omat-ripset-irtoavat",
      title: "Ensin: omia ripsiä lähtee joka päivä joka tapauksessa",
      blocks: [
        { p: "Jokaisella omalla ripsellä on oma elinkaarensa: se kasvaa, lakkaa pitenemästä, lepää hetken ja irtoaa, jotta uusi pääsee kasvamaan tilalle. Siksi muutaman ripsen lähteminen päivässä on normaalia, oli pidennyksiä tai ei." },
        { p: "Pidennys kiinnitetään omaan ripseen, joten kun oma ripsi irtoaa, pidennys lähtee sen mukana. Moni huomaa irronneen pidennyksen päässä oman ripsen ja päättelee, että pidennykset saavat ripset lähtemään. Todellisuudessa ripsi oli tullut kiertonsa loppuun. Oppitunti [miksi 2–5 ripsen lähteminen päivässä on normaalia](lesson:chu-ky-rung-mi) kertoo kierrosta tarkemmin." },
        { p: "Oikea kysymys ei siis ole, lähteekö ripsiä, vaan irtoavatko omat ripset ennen aikojaan. Se riippuu siitä, miten pidennykset on kiinnitetty." },
      ],
    },
    {
      id: "oikea-ja-vaara-kiinnitys",
      title: "Oikea kiinnitys ja paakkuuntunut liimaus",
      blocks: [
        {
          table: {
            head: ["", "Oikein", "Väärin"],
            rows: [
              ["Pidennys kiinnitetään", "Yhteen omaan ripseen", "Useaan yhteen liimattuun ripseen"],
              ["Etäisyys luomesta", "Noin 1 mm", "Kiinni ihossa, liimaa iholla"],
              ["Liima", "Pieni, siisti liitos tyvessä", "Paakkuuntunut"],
              ["Kun yksi ripsi irtoaa", "Vain se lähtee", "Se vie viereiset mukanaan"],
            ],
          },
        },
        { h3: "Oikein tehty" },
        { p: "Ripsistylisti erottaa pinseteillä tasan yhden oman ripsen ja kiinnittää pidennyksen sen suuntaisesti noin 1 mm:n päähän luomesta. Liima ei koske ihoon. Jokainen ripsi pysyy erillään, joten jokainen oma ripsi kasvaa ja irtoaa omaan tahtiinsa." },
        { img: { src: img("nhip-tach-rieng-mot-soi-mi-that-truoc-khi-gan"), alt: "Kaksi pinsettiä mustakäsineisen tekijän käsissä, toinen erottaa yhden oman ripsen silmät kiinni makaavalta asiakkaalta", caption: "Yksi oma ripsi erotetaan ennen kuin pidennys kiinnitetään." } },
        { img: { src: img("soi-mi-noi-gan-cach-da-mi-khong-cham-da"), alt: "Lähikuva asiakkaan suljetusta silmästä ja siististä pidennysrivistä, jonka tyvet ovat pienen matkan päässä luomen ihosta", caption: "Pidennyksen tyvi on irti luomesta, eikä liimaa ole iholla." } },
        { h3: "Väärin tehty" },
        { p: "Liima paakkuuntuu ja liimaa useita ripsiä yhteen tai pidennys liimataan kiinni ihoon. Omat ripset kasvavat eri tahtiin, joten yhteen liimattuina ne vetävät toisiaan. Kun yksi tulee kiertonsa loppuun, se vie mukanaan vielä kasvavat viereiset ripset, ja oma ripsirivi harvenee. Iholle mennyt liima myös hiertää ja voi ärsyttää." },
        { img: { src: img("loi-noi-sai-bet-keo-dinh-nhieu-soi-mi"), alt: "Esimerkki väärästä työstä: tumma liimapaakku pitää useita ripsiä yhdessä nippuna asiakkaan suljetussa silmässä", caption: "Väärin: paakkuuntunut liima liimaa useita ripsiä yhteen." } },
      ],
    },
    {
      id: "sopiva-paino",
      title: "Pidennyksen pitää sopia omalle ripselle",
      blocks: [
        { p: "Oikea kiinnityskohta on puolet työstä. Toinen puoli on paino. Oma ripsi kantaa vain tietyn verran. Ohut ripsi, jossa on liian pitkä tai liian paksu pidennys, painuu alas, tyvi joutuu koetukselle ja ripsi katkeaa tai irtoaa ennen aikojaan." },
        { img: { src: img("loi-mi-noi-qua-nang-keo-trieu-mi-that"), alt: "Esimerkki liian raskaista pidennyksistä: tiheä ripsirivi roikkuu ja ripset taipuvat eri suuntiin suljetun silmän päällä", caption: "Väärin: liian raskaat pidennykset painavat omat ripset alas." } },
        { p: "Siksi huolellinen ripsistylisti katsoo aina ensin omat ripsesi ja ehdottaa vasta sitten tyyliä. Pitkät ja vahvat ripset kantavat monen ripsen volyymiviuhkoja; ohuisiin, lyhyisiin tai harvoihin ripsiin sopivat ohuemmat ja lyhyemmät pidennykset tai viuhkat, joissa on vähemmän ripsiä. Jos toivot hyvin tuuheaa lopputulosta mutta omat ripsesi ovat heikot, sinulle voidaan ehdottaa tällä kertaa kevyempää. Se voi harmittaa, mutta liian raskaista ripsistä maksavat omat ripsesi. Neljää tyyliä verrataan oppitunnilla [4 ripsityyliä samoilla kasvoilla](lesson:4-kieu-noi-mi)." },
        { note: "Merkkejä ylikuormituksesta: ripset taipuvat alas, kiertyvät tai sojottavat eri suuntiin, tai rivissä on aukkoja ennen aikojaan irronneiden ripsien kohdalla. Jos huomaat tällaista, kerro siitä seuraavassa huollossa, niin ripsistä tehdään kevyemmät.", kind: "warn", title: "Katso peiliin" },
      ],
    },
    {
      id: "turvallinen-poisto",
      title: "Haluatko pidennykset pois? Älä revi niitä",
      blocks: [
        { p: "Kun revit pidennyksen irti, revit samalla sitä kantavan oman ripsen juuriltaan. Kerran tai kaksi tehtynä jälki ei näy heti, mutta toistuvasti tehtynä takaisin kasvavat ripset voivat olla harvempia ja heikompia. Vaikka yksittäinen pidennys tarttuisi johonkin tai sojottaisi, anna sen olla." },
        { p: "Oikea tapa on käynti salongissa. Ripsistylisti levittää liitoksiin ammattikäyttöön tarkoitettua liimanpoistoainetta, odottaa että liima pehmenee ja liu'uttaa pidennykset varovasti pois. Silmäsi ovat koko ajan kiinni, ja omat ripset jäävät paikoilleen." },
        { img: { src: img("boi-kem-thao-mi-chuyen-dung-doc-moi-keo"), alt: "Mustiin käsineisiin pukeutunut tekijä levittää pienellä sivellintikulla vaaleanpunaista poistovoidetta pidennysten tyviin asiakkaan suljetussa silmässä" } },
        { img: { src: img("soi-mi-noi-truot-ra-sau-khi-keo-mem"), alt: "Vanupuikko liukuu ripsiä pitkin, ja muutama irronnut pidennys lepää valkoisella suojatyynyllä asiakkaan suljetun silmän alla", caption: "Kun liima pehmenee, pidennykset liukuvat pois vetämättä." } },
        { p: "Älä käytä silmien lähellä öljyä liiman liuottamiseen kotona, ellei tuotteen valmistaja selvästi niin ohjeista. Poiston jälkeen omat ripset näyttävät usein harvemmilta ja lyhyemmiltä kuin muistat. Se johtuu siitä, että silmä on tottunut pidennyksiin, ei siitä, että ripsiä olisi kadonnut." },
        { img: { src: img("mi-that-con-nguyen-sau-khi-thao-mi-noi"), alt: "Asiakkaan suljettu silmä pidennysten poiston jälkeen: ohuet omat ripset ovat yhä paikoillaan ja muutama poistettu pidennys on suojatyynyllä" } },
        { p: "Miten salongissa toimitaan, kerrotaan oppitunnilla [ripsien huolto ja poisto](lesson:mi-dam-thao)." },
      ],
    },
    {
      id: "terveet-ripset",
      title: "Näin omat ripset pysyvät kunnossa pidennysten kanssa",
      blocks: [
        {
          ul: [
            "Älä hiero silmiä äläkä nypi tai vedä ripsiä. Hierominen kiertää ja irrottaa pidennyksiä, ja ne vievät omia ripsiä mukanaan.",
            "Vältä öljypohjaisia meikinpoistoaineita ja voiteita silmien ympärillä, koska öljy pehmentää liimaa.",
            "Pese ja harjaa ripset hellävaraisesti joka päivä ohjeen [näin peset ripsienpidennykset kotona](lesson:rua-mi-noi-tai-nha) mukaan.",
            "Käy huollossa kahden tai kolmen viikon välein, jotta ripsistylisti poistaa kasvaneet pidennykset ja tarkistaa, onko ripsiä liimautunut yhteen.",
          ],
        },
        { p: "Haluatko tarkistuttaa, onko nykyiset pidennyksesi tehty oikein? Tule Moja Beautyyn Helsinkiin; ajan varaat VaraaAissa [Moja Beautyn varaussivulta](/b/moja-beauty)." },
      ],
    },
  ],
  faq: [
    {
      q: "Lähtevätkö omat ripset ripsienpidennysten takia?",
      a: "Eivät, kun pidennykset on tehty oikein: jokainen pidennys on yhdessä omassa ripsessä noin 1 mm:n päässä luomesta, ja omat ripset kasvavat ja irtoavat luonnollisesti. Vain väärin tehty työ, paakkuuntunut liima, ihoon liimatut ripset tai liian raskaat pidennykset harventavat omia ripsiä.",
    },
    {
      q: "Miksi irronneen pidennyksen mukana on oma ripsi?",
      a: "Koska pidennys on kiinnitetty omaan ripseen. Kun ripsi tulee elinkaarensa loppuun ja irtoaa, pidennys lähtee sen mukana. Muutaman ripsen lähteminen päivässä on normaalia.",
    },
    {
      q: "Onko paakkuuntunut ripsiliima haitallista omille ripsille?",
      a: "On. Paakkuuntunut liima liimaa useita ripsiä yhteen, ja kun yksi irtoaa, se vie muut mukanaan. Mene takaisin salonkiin, niin ripsistylisti erottaa tai poistaa paakun. Älä vedä sitä itse.",
    },
    {
      q: "Voiko ripsienpidennykset poistaa itse kotona?",
      a: "Ei kannata. Kun revit pidennyksen irti, oma ripsi lähtee juuriltaan samalla. Salongissa käytetään ammattikäyttöön tarkoitettua liimanpoistoainetta, jolloin pidennykset liukuvat pois ja omat ripset jäävät paikoilleen.",
    },
    {
      q: "Harventaako ripsienpidennysten pitkäaikainen käyttö omia ripsiä?",
      a: "Kun pidennykset tehdään joka kerta oikein, ne sopivat omien ripsien vahvuuteen ja ne poistetaan oikein, omat ripset kasvavat luonnollisen kiertonsa mukaan. Harveneminen johtuu yleensä paakkuuntuneesta liimasta, liian raskaista pidennyksistä tai tavasta hieroa ja nyppiä ripsiä.",
    },
    {
      q: "Voiko ohuisiin omiin ripsiin laittaa pidennykset?",
      a: "Yleensä voi, mutta pidennysten pitää olla ohuempia ja lyhyempiä tai viuhkojen kevyempiä, jotta ne eivät paina omia ripsiä alas. Hyvä ripsistylisti katsoo ensin omat ripsesi ja ehdottaa vasta sitten tyyliä.",
    },
  ],
  related: ["chu-ky-rung-mi", "4-kieu-noi-mi", "rua-mi-noi-tai-nha", "mi-dam-thao-hieu-dung"],
};

export default article;
