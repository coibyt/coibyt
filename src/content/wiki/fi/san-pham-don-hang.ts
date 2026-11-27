import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/san-pham-don-hang/${name}.webp`;
const shot = (name: string) => `/wiki/san-pham-don-hang/fi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "salongin-verkkokauppa-tuotemyynti",
  lesson: "san-pham-don-hang",
  category: "salon",
  title: "Salongin verkkokauppa: avaa tuotemyynti ja käsittele tilaukset 8 vaiheessa",
  metaTitle: "Salongin verkkokauppa: tuotteet ja tilaukset",
  metaDescription:
    "Näin kynsi-, hius- tai hoitola myy kotihoitotuotteita VaraaAissa: kuvat ja hinnat, suositellut tuotteet, kaupan linkki ja salongista noudettavat tilaukset.",
  keyword: "salongin verkkokauppa",
  keywords: [
    "kotihoitotuotteiden myynti salongissa",
    "verkkokauppa kauneushoitolalle",
    "tuotemyynti kynsistudiossa",
    "salongin tuotetilausten hallinta",
    "tilaa verkosta, nouda salongista",
    "tuotteiden lisääminen salongin sivulle",
    "lisämyynti kauneushoitolassa",
  ],
  excerpt: "Lisää kuvat, nimi, kuvaus ja hinta, niin tuote on salongin verkkokaupassa. Asiakas tilaa verkossa, noutaa salongista ja sinä merkitset tilauksen valmiiksi.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("san-pham-cham-soc-tren-ke-da-cua-salon"),
    alt: "Pipettipullo öljyä ja voidepurkki marmoritasolla violetin samettipyyhkeen ja kultakehyksisen peilin vieressä",
  },
  takeaways: [
    "Salongin kauppa toimii periaatteella **tilaa verkosta, nouda salongista**, joten mitään ei tarvitse pakata eikä postittaa.",
    "Jokaiselle tuotteelle voi lisätä **enintään 8 kuvaa**, ja ensimmäinen on kansikuva.",
    "Kytke **”Suositeltu”** päälle, niin tuote nousee kaupan alkuun. Kun kytket **”Loppuunmyyty”** päälle, tuote näkyy yhä, mutta sitä ei voi tilata.",
    "Kun asiakas noutaa tilauksen, avaa ”Tilaukset” ja merkitse tilaus **luovutetuksi ja valmiiksi**. Tilaus lasketaan silloin mukaan tuloihin.",
    "Pidä **”Lähetä asiakkaalle sähköposti”** valittuna, niin asiakas saa viestin tilauksen jokaisesta vaiheesta.",
  ],
  intro: [
    "Salongin verkkokauppa vie tuotemyynnin pidemmälle kuin kassan viereinen hylly, jonka asiakas näkee vain muutaman kiireisen minuutin maksaessaan. Hoidon saanut asiakas haluaa usein jotain kotiin, ja luotetuin neuvoja on juuri se ammattilainen, joka on hetki sitten hoitanut hänet.",
    "Tämä artikkeli seuraa VaraaAi Academyn oppituntia ”Myy tuotteita ja hallitse tilauksia”. Opit lisäämään tuotteen salongin verkkokauppaan itse, käyttämään näkyvyysvalintoja, lähettämään kaupan linkin asiakkaille ja käsittelemään tilauksen siitä hetkestä, kun asiakas tilaa, siihen asti kun hän noutaa sen salongista.",
  ],
  sections: [
    {
      id: "miksi-myyda",
      title: "Miksi salongin kannattaa myydä kotihoitotuotteita",
      blocks: [
        { p: "Kynnet tai hyvä leikkaus kestävät vain, jos asiakas hoitaa niitä kotona oikein. Tekijä suosittelee kynsinauhaöljyä, käsivoidetta tai sopivaa shampoota, ja asiakas joutuu etsimään sen muualta. Kun salongilla on juuri suositeltu tuote, neuvosta tulee jotain, minkä asiakas voi tehdä heti." },
        { p: "Salongin hyllyn ongelma on, että asiakas näkee sen vain käydessään. Muutaman viikon päästä, kun öljy loppuu, hän ei muista tuotteen nimeä eikä viitsi tulla kysymään. Verkkokauppa pitää hyllyn auki koko ajan: asiakas katsoo kuvat, lukee kuvauksen, tilaa puhelimellaan ja hakee tuotteen seuraavalla käynnillä." },
        { p: "VaraaAissa salongilla on oma kauppa suoraan sen sivulla. ”Tuotteet”-sivun ylärivi kertoo toimintatavan lyhyesti: asiakkaat tilaavat verkossa ja noutavat salongilta. Kuljetusta ei ole, joten pienikin salonki pystyy pyörittämään kauppaa ilman lisähenkilöstöä. Asiakkaan näkymästä kerrotaan ohjeessa [salongin seuraamisesta ja sen tuotteiden ostamisesta](lesson:theo-doi-salon)." },
        { note: "”Tuotteet” on asiakkaille myytäviä tuotteita varten. Työssä käytettävät lakat, nesteet ja tarvikkeet seurataan muualla, katso ohje [salongin varastosta](lesson:kho-hang).", kind: "info", title: "Eri asia kuin tarvikevarasto" },
      ],
    },
    {
      id: "valmistelut",
      title: "Mitä valmistella ennen tuotteiden lisäämistä salongin sivulle",
      blocks: [
        { p: "Uuden tuotteen sivu jakautuu osiin ”Kuvat”, ”Tiedot”, ”Hinnoittelu” ja ”Näkyvyys”. Kun seuraavat asiat ovat valmiina, yksi tuote vie vain muutaman minuutin:" },
        {
          ul: [
            "**Tuotekuvat.** Enintään 8 kuvaa JPG-, PNG- tai WebP-muodossa, enintään 5 Mt kuvaa kohti. Ensimmäinen kuva on kansikuva, jonka asiakas näkee ennen kuin napauttaa.",
            "**Tuotteen nimi** kokoineen tai tilavuuksineen, jotta asiakas erottaa saman tuotteen kaksi kokoa.",
            "**Merkki.** Kenttä on valinnainen.",
            "**Kuvaus.** Kentän vihje ehdottaa kolmea asiaa: hyödyt, tärkeimmät ainesosat ja käyttöohje.",
            "**Hinta** ja **normaalihinta**, jos tuote on tarjouksessa.",
          ],
        },
        { note: "Aloita muutamasta tuotteesta, joita tiimisi jo suosittelee jokaisen käynnin jälkeen. Asiakkaat ovat kuulleet niistä ja nähneet ne, joten niitä on helpoin tilata.", kind: "tip", title: "Mitkä tuotteet ensin" },
      ],
    },
    {
      id: "kuvat-ja-kuvaus",
      title: "Kuvat, nimi ja kuvaus, joihin asiakas luottaa",
      blocks: [
        { p: "Verkossa tilaava asiakas ei voi ottaa purkkia käteensä. Kuvien ja kuvauksen on tehtävä se hänen puolestaan. Koska ensimmäinen kuva on kansikuva, valitse selkeä kuva koko tuotteesta siistillä taustalla. Seuraavat kuvat sopivat ainesosaluettelolle, voiteen koostumukselle tai todelliselle koolle käden vieressä." },
        {
          table: {
            head: ["Kenttä", "Mitä kirjoitat"],
            rows: [
              ["”Tuotteen nimi”", "Nimi, jota asiakas käyttää, kokoineen. Videon esimerkki: Lumi-kynsinauhaöljy 15 ml"],
              ["”Merkki”", "Valmistajan nimi, jos asiakkaat kysyvät merkin mukaan. Voi jäädä tyhjäksi"],
              ["”Kuvaus”", "Mihin tuote on, tärkeimmät ainesosat, miten ja milloin sitä käytetään"],
              ["”Hinta”", "Hinta, jonka asiakas maksaa salongissa"],
              ["”Normaalihinta (tarjouksen aikana)”", "Täytä vain, kun tuote on alennuksessa"],
            ],
          },
        },
        { p: "Kirjoita kuvaus samalla tavalla kuin neuvoisit asiakasta tuolissa: milloin levitetään, kuinka paljon ja mitä vältetään. Kerro vain ne hyödyt, jotka valmistaja ilmoittaa pakkauksessa, äläkä lupaa hoitotuloksia." },
        { p: "Sivun lopussa on ”Asiakas näkee”, esikatselu tuotekortista kansikuvineen ja nimineen täsmälleen sellaisena kuin se näkyy kaupassa. Vilkaise sitä ennen tallennusta, niin huomaat kirjoitusvirheen tai huonosti rajautuneen kansikuvan." },
      ],
    },
    {
      id: "suositeltu-loppuunmyyty-piilota",
      title: "”Suositeltu”, ”Loppuunmyyty”, ”Piilota kaupasta”: mitä valintaa käytät milloin",
      blocks: [
        { p: "”Näkyvyys”-osiossa on kolme kytkintä. Ne ratkaisevat, näkeekö asiakas tuotteen, missä hän sen näkee ja voiko sitä tilata." },
        {
          table: {
            head: ["Kytkin", "Kun se on päällä", "Käytä, kun"],
            rows: [
              ["”Suositeltu”", "Tuote nostetaan ”Asiakkaiden suosikit” -osioon kaupan alkuun", "Myydyimmät, uutuudet, tarjoustuotteet"],
              ["”Loppuunmyyty”", "Tuote näkyy edelleen, mutta sitä ei voi tilata", "Tuote on tilapäisesti loppu ja tulee takaisin"],
              ["”Piilota kaupasta”", "Näkyy vain sinulle hallintapaneelissa", "Et halua vielä myydä, tai tiedot ovat kesken"],
            ],
          },
        },
        { p: "Kun erotat ”Loppuunmyydyn” ja ”Piilota kaupasta” -valinnan, vältät kiusallisen tilanteen: asiakas tilaa, sopii noutopäivän ja kuulee vasta paikan päällä, että tuote on loppu. Kun tuote todella loppuu, kytke ”Loppuunmyyty” päälle samana päivänä. Kanta-asiakkaat näkevät tuotteen yhä kaupassa ja tietävät, että sitä tulee lisää." },
        { img: { src: shot("salongin-tuotelista"), alt: "Salongin tuotelista: pionin tuoksuinen käsivoide 14,00 euroa ja Lumi-kynsinauhaöljy 15 ml 18,00 euroa Suositellut-merkillä, kummankin vasemmalla vetokahva", caption: "Tallennetut tuotteet näkyvät listassasi. Vedä vasemman reunan kahvasta järjestääksesi ne, asiakkaat näkevät kaupan tässä järjestyksessä." } },
        { p: "Älä merkitse liian montaa tuotetta suositelluksi. Jos kaikki on nostettu esiin, asiakas ei enää tiedä, mitä suosittelet. Muut tuotteet näkyvät siinä järjestyksessä, johon olet ne listassa vetänyt." },
        { img: { src: shot("asiakkaiden-suosikit-kaupassa"), alt: "Salongin kauppa asiakkaan silmin: otsikon Ammattilaisten valinnat alla Uusi-merkitty Lumi Beautyn kynsinauhaöljy 15 ml hintaan 18,00 euroa ja ostoskassipainike" } },
      ],
    },
    {
      id: "tilausten-hallinta",
      title: "Salongin tuotetilausten hallinta tilauksesta noutoon",
      blocks: [
        { p: "Kun asiakas tilaa, tilaus näkyy kohdassa ”Tilaukset”, jonka avaat samannimisestä painikkeesta ”Tuotteet”-sivun yläosasta. Jokainen tilaus on kortti, jossa näkyy neljä asiaa: kuka tilasi, mitä, miten hän maksaa ja asiakkaan viesti. Videon esimerkkitilaus maksetaan käteisellä salongissa, ja asiakas kertoo viestissään hakevansa tuotteen lauantai-iltapäivänä." },
        { p: "Kortissa on kolme peräkkäistä vaihetta: ”Tilattu”, ”Vahvistettu” ja ”Valmis”. Korostettu vaihe kertoo, missä tilaus on menossa. Sivun yläosassa tilaukset on myös jaettu tilan mukaan, esimerkiksi ”Vahvistettavana” ja ”Vahvistettu”, ja hakukentästä löydät tilauksen asiakkaan, tuotteen tai tilausnumeron mukaan." },
        { img: { src: shot("laheta-asiakkaalle-sahkoposti-tilaukset"), alt: "Tilaukset-sivu, jossa valittu Lähetä asiakkaalle sähköposti -ruutu on korostettu kultaisella, alla Vie Exceliin (CSV) ja vahvistettu 18,00 euron tilaus", caption: "”Lähetä asiakkaalle sähköposti” on heti hakukentän alla. Pidä se valittuna." } },
        { p: "Lue asiakkaan viesti huolella. Jos hän kertoo päivän ja kellonajan, laita tuote valmiiksi vastaanottoon nimellä varustettuna. Kun hän saapuu, luovuta tuote, ota maksu tilauksessa mainitulla tavalla ja paina kultaista painiketta, joka merkitsee tilauksen luovutetuksi ja valmiiksi. Tilaus siirtyy valmiiksi ja lasketaan mukaan tuloihin. Jos tarvitset paperin, paina ”Tulosta”." },
        { p: "Kun ”Lähetä asiakkaalle sähköposti” on valittuna, asiakas saa sähköpostin tilauksen jokaisesta vaiheesta. Hän tietää, että salonki on nähnyt tilauksen ja tuote odottaa, joten sinulle tulee vähemmän kyselyviestejä." },
      ],
    },
    {
      id: "tilanteet-ja-markkinointi",
      title: "Arjen tilanteita ja kaupan tuominen asiakkaiden tietoon",
      blocks: [
        {
          table: {
            head: ["Tilanne", "Mitä teet"],
            rows: [
              ["Tuote on tilapäisesti loppu", "Kytke ”Loppuunmyyty” päälle. Tuote näkyy, mutta sitä ei voi tilata"],
              ["Tuote on tarjouksessa", "Kirjoita uusi hinta kenttään ”Hinta” ja vanha kenttään ”Normaalihinta (tarjouksen aikana)”"],
              ["Haluat nähdä kaupan asiakkaan silmin", "Paina ”Avaa kauppa” ”Tuotteet”-sivun yläosassa"],
              ["Asiakas ei tule hakemaan ja peruu", "Avaa tilaus kohdassa ”Tilaukset” ja paina ”Peru tilaus”"],
              ["Tarvitset tilauksista kirjanpitoa varten listan", "”Tilaukset”-sivulla on ”Vie Exceliin (CSV)” -painike"],
            ],
          },
        },
        { p: "Kaupan, jossa on tuotteita, pitää myös tulla tunnetuksi. ”Kopioi linkki” antaa kaupan osoitteen, jonka voit lähettää asiakkaille. Kolme hyvää paikkaa linkille: vastaus, kun asiakas kysyy tuotteesta, [Fanpage-julkaisu](lesson:fanpage) uutuustuotteesta ja kanta-asiakkaille lähetetty [markkinointisähköposti](lesson:email-marketing), jonka painike vie kauppaan." },
        { p: "Salongissa luontevin esittely on yhä tekijän sana asiakkaan lähtiessä: käytä tätä kotona, ja kun se loppuu, tilaa se salongin sivulta ja hae seuraavalla kerralla. Jos salongilla on [omat verkkosivut](lesson:website-salon), kanta-asiakkaat löytävät kaupan helpommin uudelleen." },
      ],
    },
  ],
  howTo: {
    title: "Salongin verkkokauppa vaihe vaiheelta VaraaAissa",
    id: "tuotemyynnin-vaiheet",
    after: "valmistelut",
    lead: "Kuusi ensimmäistä vaihetta lisäävät yhden tuotteen, kaksi viimeistä jakavat kaupan ja käsittelevät tilauksen. Järjestys seuraa oppituntivideota.",
    steps: [
      {
        name: "Avaa ”Tuotteet” ja paina ”Lisää tuote”",
        text: "Napauta hallintapaneelissa ”Tuotteet”. Ylhäällä ovat ”Avaa kauppa”, ”Kopioi linkki”, ”Tilaukset” ja ”Lisää tuote”, ja niiden alla muutama luku, kuten myynnissä olevat tuotteet ja katselut. Paina ”Lisää tuote”, niin lomake aukeaa.",
        image: { src: shot("lisaa-tuote-avaa-kauppa-kopioi-linkki"), alt: "Tuotteet-sivu hallintapaneelissa, jossa Lisää tuote -painike on korostettu kultaisella Avaa kauppa-, Kopioi linkki- ja Tilaukset-painikkeiden vieressä" },
      },
      {
        name: "Lisää kuvat",
        text: "Pudota kuvat ”Kuvat”-osion kenttään tai valitse ne laitteeltasi napsauttamalla. Voit lisätä enintään 8 kuvaa, ja ensimmäinen on kansikuva. Laita selkein kuva ensimmäiseksi, koska asiakas näkee sen ennen kuin lukee sanaakaan.",
        image: { src: shot("tuotekuvat-enintaan-8"), alt: "Tyhjä Kuvat-kenttä korostettuna kultaisella tekstillä Pudota kuvat tähän tai valitse napsauttamalla ja huomautuksella enintään 8 kuvasta" },
      },
      {
        name: "Täytä ”Tuotteen nimi”, ”Merkki” ja ”Kuvaus”",
        text: "Kirjoita ”Tiedot”-osioon ”Tuotteen nimi” ja ”Merkki”. Kirjoita ”Kuvaus”-kenttään hyödyt, tärkeimmät ainesosat ja käyttöohje. Verkossa tilaava asiakas ei voi kysyä keneltäkään, joten kuvauksen pitää vastata niihin kysymyksiin, joita salongissa yleensä kysytään.",
        image: { src: shot("tuotteen-nimi-merkki-kuvaus"), alt: "Tiedot-osio, jossa Tuotteen nimi- ja valinnainen Merkki-kenttä on korostettu kultaisella, alla Ryhmä- ja Kuvaus-kentät" },
      },
      {
        name: "Kirjoita hinta ja normaalihinta",
        text: "Vieritä alas kohtaan ”Hinnoittelu”, valitse valuutta ja kirjoita hinta. Jos tuote on tarjouksessa, kirjoita vanha hinta myös kenttään ”Normaalihinta (tarjouksen aikana)”. Jätä kenttä tyhjäksi, kun alennusta ei ole.",
        image: { src: shot("tuotteen-hinta-ja-normaalihinta"), alt: "Hinnoittelu-osio, jossa valuuttana on EUR ja Hinta (EUR) -kenttä arvolla 18 on korostettu kultaisella, alla normaalihinnan kenttä" },
      },
      {
        name: "Kytke ”Suositeltu” tai ”Loppuunmyyty” tarvittaessa",
        text: "Kytke ”Näkyvyys”-osiossa ”Suositeltu” päälle, niin tuote nousee kaupan alkuun. Kun tuote loppuu, kytke ”Loppuunmyyty” päälle: tuote näkyy edelleen, mutta sitä ei voi tilata. Voit muuttaa molempia milloin tahansa.",
        image: { src: shot("suositeltu-ja-loppuunmyyty"), alt: "Näkyvyys-osio, jossa päälle kytketty Suositeltu-kytkin on korostettu kultaisella, alla Loppuunmyyty- ja Piilota kaupasta -kytkimet" },
      },
      {
        name: "Paina ”Tallenna tuote”",
        text: "Tarkista sivun lopun ”Asiakas näkee” -esikatselu ja paina ”Tallenna tuote”. Tuote näkyy listassasi ja salongin kaupassa.",
        image: { src: shot("asiakas-nakee-tallenna-tuote"), alt: "Tuotelomakkeen loppu, jossa näkyvyyskytkimet, Video-kenttä ja kultaisella korostettu Tallenna tuote -painike Peruuta-painikkeen vieressä" },
      },
      {
        name: "Paina ”Avaa kauppa” tai ”Kopioi linkki”",
        text: "Palaa ”Tuotteet”-sivun alkuun. Paina ”Avaa kauppa” nähdäksesi kaupan asiakkaan silmin tai ”Kopioi linkki” lähettääksesi sen asiakkaille viestillä tai somessa. Avaa kauppa kerran omalla puhelimellasi ennen kuin lähetät linkin eteenpäin.",
      },
      {
        name: "Avaa ”Tilaukset” ja merkitse tilaus luovutetuksi",
        text: "Kun tilaus tulee, avaa ”Tilaukset” ja katso, kuka tilasi, mitä, miten hän maksaa ja mitä hän kirjoitti. Kun asiakas noutaa tilauksen, paina kultaista painiketta, joka merkitsee sen luovutetuksi ja valmiiksi, ja tarvittaessa ”Tulosta”. Merkitse tilaus valmiiksi vasta, kun tuote on todella asiakkaan kädessä, koska valmiit tilaukset lasketaan tuloihin.",
        image: { src: shot("tilaus-luovutettu-tulosta"), alt: "Vahvistettu tilaus, maksu käteisellä salongissa, asiakkaan nimi, kynsinauhaöljy ja asiakkaan viesti sekä kultaisella korostettu luovutuspainike Tulosta-painikkeen vieressä" },
      },
    ],
  },
  faq: [
    {
      q: "Mistä asiakas saa VaraaAissa salongilta ostamansa tuotteet?",
      a: "Salongista. Salongin kauppa toimii periaatteella tilaa verkosta, nouda salongista, joten mitään ei tarvitse postittaa. Asiakas tilaa verkossa ja hakee tuotteen salongista.",
    },
    {
      q: "Montako kuvaa tuotteelle voi lisätä?",
      a: "Enintään 8 kuvaa tuotetta kohti. Ensimmäinen kuva on kansikuva, joten laita selkein ja paras kuva ensimmäiseksi.",
    },
    {
      q: "Mitä ”Suositeltu”-valinta tekee?",
      a: "Tuote nostetaan kaupan alkuun, joten asiakas näkee sen ensimmäisenä. Käytä sitä muutamalle tuotteelle, jotka haluat eniten esille, kuten myydyimmille tai uutuuksille.",
    },
    {
      q: "Pitääkö tilapäisesti loppunut tuote poistaa?",
      a: "Ei. Kytke ”Loppuunmyyty” päälle: tuote näkyy kaupassa edelleen, mutta sitä ei voi tilata. Kun tuotetta tulee lisää, kytke valinta pois, niin asiakkaat voivat taas tilata.",
    },
    {
      q: "Asiakas on noutanut tilauksen. Mitä painan Tilaukset-sivulla?",
      a: "Paina tilauksen kultaista painiketta, joka merkitsee sen luovutetuksi ja valmiiksi. Tilaus siirtyy valmiiksi ja lasketaan mukaan tuloihin. Jos tarvitset paperin, paina myös ”Tulosta”.",
    },
    {
      q: "Saako asiakas tiedon, kun tilauksen tila muuttuu?",
      a: "Saa, jos ”Tilaukset”-sivun ”Lähetä asiakkaalle sähköposti” -ruutu on valittuna. Silloin asiakas saa sähköpostin tilauksen jokaisesta vaiheesta.",
    },
  ],
  related: ["email-marketing", "the-qua-tang-salon", "kho-hang", "fanpage"],
};

export default article;
