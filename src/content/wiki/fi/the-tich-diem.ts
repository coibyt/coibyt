import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/the-tich-diem/${name}.webp`;
const shot = (name: string) => `/wiki/the-tich-diem/fi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "kanta-asiakasohjelma-kampaamolle",
  lesson: "the-tich-diem",
  category: "marketing",
  title: "Kanta-asiakasohjelma kampaamolle: QR-kanta-asiakaskortit, lippu joka käynnistä ja alennus vakioasiakkaille",
  metaTitle: "Kanta-asiakasohjelma kampaamolle QR-korteilla",
  metaDescription:
    "Näin otat kampaamossa, kynsistudiossa tai hoitolassa käyttöön VaraaAin kanta-asiakasohjelman: käyntimäärä, QR-kortin aktivointi ja lippu joka käynnistä.",
  keyword: "kanta-asiakasohjelma kampaamolle",
  keywords: [
    "kanta-asiakasohjelma kauneushoitolalle",
    "kanta-asiakaskortti kynsistudiolle",
    "kanta-asiakasalennus",
    "kanta-asiakkuusohjelma salongille",
    "miten pitää kanta-asiakkaat",
    "QR-koodi kanta-asiakaskortti",
    "kuinka suuri alennus kanta-asiakkaalle",
  ],
  excerpt: "Jokainen käynti tuo lipun, ja kun lippuja on tarpeeksi, asiakas saa alennuksen. Asetat kolme lukua kerran, lähetät QR-kortin sähköpostilla ja painat ”Lisää 1 lippu” käynnillä.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("le-tan-don-khach-tai-quay-salon-sang-trong"),
    alt: "Hymyilevä vastaanottovirkailija luumunvärisessä jakussa tervehtii kermanväriseen takkiin pukeutunutta asiakasta salongin marmoritiskillä, taustalla odottavia asiakkaita",
  },
  takeaways: [
    "Ohjelma toimii yhdellä säännöllä: **jokainen käynti tuo lipun, ja kun lippuja on tarpeeksi, saa alennuksen**.",
    "Täytä kolme kenttää kohdassa ”Ohjelman asetukset”: ”Käyntejä alennukseen”, ”Alennus (%)” ja ”Kortin hinta (0 = ilmainen)”.",
    "Kortin antamiseen tarvitset vain asiakkaan nimen ja sähköpostin: paina **”Aktivoi ja lähetä QR-koodi sähköpostilla”**.",
    "Kun asiakas saapuu, skannaa QR-koodi tai kirjoita kortissa näkyvä koodi ja paina **”Lisää 1 lippu”**.",
    "Lippu lisätään vain, kun asiakkaalla on toteutunut käynti, jota ei ole vielä skannattu, joten lippuja ei voi olla enemmän kuin käyntejä.",
  ],
  intro: [
    "Kanta-asiakasohjelma kampaamolle ei tarvitse olla yhtä monimutkainen kuin lentoyhtiön tai ruokakaupan. Kauneusalan yritykselle riittää yksi helposti ymmärrettävä lupaus: käy tietty määrä kertoja, niin saat alennuksen. Kanta-asiakkaat ovat salongin arvokkain voimavara, ja tuo lupaus antaa heille yhden syyn lisää olla kokeilematta muita paikkoja.",
    "Tämä artikkeli seuraa VaraaAi Academyn oppituntia ”QR-kanta-asiakaskortit hallintapaneelissa”. Opit määrittämään ohjelman, aktivoimaan kortin asiakkaalle, lisäämään lipun jokaisella käynnillä ja seuraamaan, kuka on lähellä alennustaan.",
  ],
  sections: [
    {
      id: "miten-ohjelma-toimii",
      title: "Miten kanta-asiakasohjelma toimii kampaamossa tai kynsistudiossa",
      blocks: [
        { p: "VaraaAissa kanta-asiakasohjelma löytyy hallintapaneelin kohdasta ”Kanta-asiakaskortit”. Sivun yläosan lyhyt teksti tiivistää koko kulun: anna asiakkaille kanta-asiakaskortti, skannaa se joka käynnillä ja myönnä etu." },
        { img: { src: shot("kanta-asiakaskortit-hallintapaneelissa"), alt: "Yrityksen hallintapaneeli puhelimessa, jossa Kanta-asiakaskortit-välilehti on korostettu kultaisella, alla sivun kuvaus ja neljä laskuria", caption: "”Kanta-asiakaskortit” on oma välilehtensä hallintapaneelissa." } },
        {
          ol: [
            "Asetat säännön kerran: montako käyntiä alennukseen tarvitaan ja montako prosenttia se on.",
            "Aktivoit asiakkaalle kortin. Hän saa QR-koodilla varustetun kortin sähköpostiinsa.",
            "Jokaisella käynnillä skannaat koodin ja lisäät yhden lipun.",
            "Kun lippuja on tarpeeksi, asiakkaan kortissa näkyy odottava palkinto. Annat alennuksen ja jatkat lippujen lisäämistä tavalliseen tapaan.",
          ],
        },
        { p: "Hallintapaneelissa kerättävää yksikköä kutsutaan **lipuksi**. Asiakkaan näkökulman löydät ohjeesta [salongin kanta-asiakaskortista](lesson:the-thanh-vien)." },
      ],
    },
    {
      id: "ennen-aloitusta",
      title: "Milloin ”Kanta-asiakaskortit” avautuu ja mitä valmistella",
      blocks: [
        { note: "”Kanta-asiakaskortit” avautuu, kun salongin profiili on vähintään 85 % valmis. Näet luvun asetusten profiilin valmiusastetta näyttävästä kortista. Jos raja ei vielä täyty, ohje [salongin profiilista](lesson:ho-so-salon) näyttää, miten kuvaus, logo ja kansikuva täydennetään.", kind: "info", title: "Profiili vähintään 85 % valmis" },
        { p: "Päätä ennen kenttien täyttämistä kolme asiaa paperilla:" },
        {
          ul: [
            "**Montako käyntiä alennukseen tarvitaan.** Oppituntivideon esimerkki on 5 käyntiä.",
            "**Kuinka suuri alennus on.** Videon esimerkki on 15 %.",
            "**Onko kortti ilmainen vai myytävä.** Jätä hinnaksi 0, jos kortti on ilmainen, tai aseta hinta, jos haluat myydä sen.",
          ],
        },
        { p: "Tarvitset lisäksi asiakkaan sähköpostin, jotta kortti voidaan lähettää. Jos tiimi tottuu kysymään sähköpostia varauksen tai maksun yhteydessä, korttien aktivointi nopeutuu paljon." },
      ],
    },
    {
      id: "ohjelman-asetukset",
      title: "Kuinka suuri alennus kanta-asiakkaalle: kolme kenttää ”Ohjelman asetuksissa”",
      blocks: [
        {
          table: {
            head: ["Kenttä", "Mitä se tarkoittaa", "Miten valita"],
            rows: [
              ["”Käyntejä alennukseen”", "Montako lippua asiakas tarvitsee palkintoon", "Niin lähellä, että säännöllisesti käyvä asiakas näkee sen ulottuvillaan"],
              ["”Alennus (%)”", "Alennus, jonka asiakas saa täydellä kortilla", "Keräämisen arvoinen asiakkaalle ja salongille kestävä, vaikka moni täyttäisi kortin samaan aikaan"],
              ["”Kortin hinta (0 = ilmainen)”", "Kortin hinta valuuttoineen", "Jätä nollaksi, jos haluat mahdollisimman monelle asiakkaalle kortin"],
            ],
          },
        },
        { img: { src: shot("kaynteja-alennukseen"), alt: "Ohjelman asetukset, joissa Käyntejä alennukseen -kenttä arvolla 5 on korostettu kultaisella, alla Alennus (%) 15 ja Kortin hinta 0 EUR" } },
        { p: "Oppitunti ei suosittele mitään tiettyä lukua, koska se riippuu hinnoistasi ja siitä, kuinka usein asiakkaasi käyvät. Yksi tapa tarkistaa valinta: laske, kauanko tavallisella kanta-asiakkaallasi kestää kerätä tarpeeksi lippuja. Jos se kestää niin kauan, että asiakas unohtaa keräävänsä, palkinto on liian kaukana." },
        { p: "Tallennuksen jälkeen ”Ohjelman asetukset” -otsikon alla näkyy lyhyt yhteenveto säännöstä. Videolla se kertoo 5 käyntiä, 15 % alennuksen ja ilmaisen kortin. Yhteenvedon lukeminen on nopein tapa varmistaa, että kirjoitit sen, mitä tarkoitit." },
      ],
    },
    {
      id: "liput-ja-kaynnit",
      title: "Miksi lippu on sidottu toteutuneeseen käyntiin",
      blocks: [
        { p: "Paperisessa leimakortissa on tuttu heikkous: kuka tahansa leimasimen haltija voi lisätä leiman. Hallintapaneelin ohjelma sulkee tämän aukon yhdellä säännöllä. Lippu lisätään vain, kun asiakkaalla on toteutunut käynti, jota ei ole vielä skannattu, joten lippuja ei voi koskaan olla enemmän kuin todellisia käyntejä." },
        { img: { src: shot("lippua-ei-lisatty-kaynnit-skannattu"), alt: "Kanta-asiakas-ruutu, jossa ilmoitus Lippua ei lisätty: kaikki asiakkaan menneet käynnit on jo skannattu, ja sen alla Namin kortti ja liput", caption: "Jos asiakkaan kaikki käynnit on jo skannattu, ruutu kertoo sen eikä lippua lisätä." } },
        { p: "Säännöstä seuraa salongille yksi asia: asiakkaan käynnin on oltava salongin kalenterissa. Jos [hallitset varauksia](lesson:lich-hen) jo VaraaAissa, mitään ylimääräistä ei tarvita. Kirjaa myös ilman varausta tulleen asiakkaan käynti kalenteriin, koska lippu seuraa varausta." },
      ],
    },
    {
      id: "kortinhaltijat",
      title: "Kortinhaltijoiden seuranta ja alennus täydellä kortilla",
      blocks: [
        { p: "”Kanta-asiakaskortit”-sivun yläosassa on neljä laskuria: ”Kortinhaltijat”, ”Skannauksia yhteensä”, ”Myönnetyt edut” ja ”Odottavat edut”. Viimeistä kannattaa vilkaista joka aamu, koska se kertoo, monellako asiakkaalla on käyttämätön alennus." },
        { p: "Kun asiakkaalla on tarpeeksi lippuja, hänen kortissaan näkyy odottava palkinto. Anna alennus sillä käynnillä ja jatka lippujen lisäämistä tavalliseen tapaan. Kerro asiakkaalle jo tiskillä, että tämän päivän käynti on alennettu: se on hetki, jolloin ohjelma palkitsee hänen uskollisuutensa, ja asiakas muistaa sen." },
        { img: { src: shot("asiakkaan-kortti-liput"), alt: "Namin kanta-asiakaskortti, jossa rengas näyttää 2 lippua viidestä ja rivi Vielä 3 lippua 15 %:n alennukseen, alla tehdyt palvelut ja tuotto yhteensä", caption: "Asiakkaan kortti kertoo, montako lippua hänellä on ja montako alennukseen vielä puuttuu." } },
        { p: "Alempana oleva ”Kortinhaltijat”-lista näyttää, montako lippua kullakin asiakkaalla on ja montako kertaa hänen korttinsa on skannattu. Asiakkaat, joilta puuttuu enää yksi lippu, ovat parhaita kutsuttavia. Ohjeessa [sähköpostimarkkinoinnista](lesson:email-marketing) on valmis ryhmä kanta-asiakaskortin haltijoille, joten voit kirjoittaa juuri niille, jotka keräävät lippuja." },
      ],
    },
    {
      id: "ilmainen-vai-hallintapaneeli",
      title: "Ilmainen leimakortti ja hallintapaneelin kanta-asiakasohjelma rinnakkain",
      blocks: [
        { p: "VaraaAissa kanta-asiakaskortin voi hoitaa kahdella tavalla, joita opetetaan eri oppitunneilla. Ajatus on sama, mutta ne sopivat eri tilanteisiin:" },
        {
          table: {
            head: ["Kohta", "Ilmainen leimakortti", "Hallintapaneelin ohjelma"],
            rows: [
              ["Aloitus", "Etusivun alaosasta, kokeilu heti", "”Kanta-asiakaskortit”, avautuu 85 %:n profiililla"],
              ["Yksikkö", "Leimat, ”Lisää 1 leima” jokaisella käynnillä", "Liput, sidottu toteutuneisiin käynteihin"],
              ["Palkinto", "Itse kirjoittamasi teksti", "Prosenttialennus"],
              ["Ystävien kutsuminen", "Ei mainita oppitunnilla", "Jokaisella kortilla on oma kutsulinkki"],
            ],
          },
        },
        { p: "Salonki, jolla ei ole VaraaAin ajanvaraussivua, voi aloittaa [ilmaisella leimakortilla](lesson:the-khach-quen). Salongille, joka ottaa jo varauksia VaraaAissa, hallintapaneelin ohjelma sopii paremmin, koska liput seuraavat kalenteria ja kanta-asiakkaat voivat tuoda uusia asiakkaita kutsulinkillään, kuten ohjeessa [asiakassuosittelusta](lesson:khach-dan-khach) kerrotaan." },
        {
          table: {
            head: ["Tilanne", "Mitä teet"],
            rows: [
              ["”Kanta-asiakaskortit” ei näy", "Tarkista profiilin valmiusaste asetuksista. Sivu avautuu 85 %:ssa"],
              ["Painoit ”Lisää 1 lippu”, mutta lippuja ei tullut lisää", "Lippu lisätään vain toteutuneesta käynnistä, jota ei ole skannattu. Tarkista asiakkaan varaukset"],
              ["Kamera ei lue QR-koodia", "Kirjoita kortissa näkyvä koodi kenttään ja paina ”Lisää 1 lippu”"],
              ["Haluat myydä kortin etkä antaa sitä ilmaiseksi", "Kirjoita hinta kenttään ”Kortin hinta (0 = ilmainen)” ja paina ”Tallenna”"],
            ],
          },
        },
      ],
    },
  ],
  howTo: {
    title: "Näin otat kanta-asiakasohjelman käyttöön kampaamossa VaraaAissa",
    id: "kanta-asiakasohjelman-vaiheet",
    after: "ennen-aloitusta",
    lead: "Kuusi vaihetta seuraavat oppituntivideota järjestyksessä: määrität ohjelman kerran ja toistat viimeiset vaiheet jokaisella käynnillä.",
    steps: [
      {
        name: "Avaa ”Kanta-asiakaskortit” ja etsi ”Ohjelman asetukset”",
        text: "Napauta hallintapaneelissa ”Kanta-asiakaskortit” ja etsi kohta ”Ohjelman asetukset”. Kirjoita ”Käyntejä alennukseen” eli montako kertaa asiakkaan pitää käydä, ja sen jälkeen ”Alennus (%)”.",
      },
      {
        name: "Kirjoita ”Kortin hinta (0 = ilmainen)” ja paina ”Tallenna”",
        text: "Jätä hinnaksi 0, jos kortti on ilmainen, tai kirjoita hinta, jos haluat myydä sen. Paina ”Tallenna”. Lue otsikon alle tuleva yhteenveto ja varmista, että sääntö on sellainen kuin tarkoitit.",
        image: { src: shot("kortin-hinta-0-ilmainen"), alt: "Ohjelman asetukset, joissa Kortin hinta (0 = ilmainen) -kenttä arvolla 0 ja EUR on korostettu kultaisella, alla Tallenna- ja Peruuta-painikkeet" },
      },
      {
        name: "Aktivoi kortti asiakkaalle",
        text: "Kirjoita kohdassa ”Aktivoi kortti asiakkaalle” asiakkaan nimi ja sähköposti. ”Puhelin (valinnainen)” voi jäädä tyhjäksi. Paina ”Aktivoi ja lähetä QR-koodi sähköpostilla”, niin asiakas saa korttinsa QR-koodeineen sähköpostiin heti.",
        image: { src: shot("aktivoi-ja-laheta-qr-koodi-sahkopostilla"), alt: "Aktivoi kortti asiakkaalle -osio, johon on kirjoitettu nimi Nam ja sähköpostiosoite, ja musta Aktivoi ja lähetä QR-koodi sähköpostilla -painike korostettuna kultaisella" },
      },
      {
        name: "Skannaa kortti käynnillä ja paina ”Lisää 1 lippu”",
        text: "Skannaa asiakkaan kortin QR-koodi puhelimen kameralla jokaisella käynnillä tai kirjoita kortissa näkyvä koodi kenttään kohdassa ”Skannaa kortti asiakkaan käydessä”. Paina sitten ”Lisää 1 lippu”.",
        image: { src: shot("lisaa-1-lippu"), alt: "Skannaa kortti asiakkaan käydessä -ruutu, jossa kortin koodi on kirjoitettu ja oranssi Lisää 1 lippu -painike on korostettu kultaisella, alla Kortinhaltijat" },
      },
      {
        name: "Katso, mitä ruutu kertoo",
        text: "Ruutu vahvistaa skannauksen ja näyttää asiakkaan kortin: montako lippua hänellä on ja montako alennukseen vielä puuttuu. Jos kaikki asiakkaan käynnit on jo skannattu, ruutu kertoo senkin. Kerro luku asiakkaalle, niin hän tietää, kuinka lähellä palkinto on.",
      },
      {
        name: "Anna alennus, kun kortti on täynnä",
        text: "Kun asiakkaalla on tarpeeksi lippuja, hänen kortissaan näkyy odottava palkinto. Anna alennus ja jatka lippujen lisäämistä tavalliseen tapaan. ”Kortinhaltijat”-listasta näet, montako lippua kullakin asiakkaalla on ja montako kertaa hänen korttinsa on skannattu.",
        image: { src: shot("kortinhaltijat-lista"), alt: "Kortinhaltijat-lista, jossa Namin kortti on korostettu kultaisella: liput 2/5, 2 skannausta ja 0 etua, alla Yhteenveto- ja Tiedot-painikkeet" },
      },
    ],
  },
  faq: [
    {
      q: "Miten VaraaAin kanta-asiakasohjelma toimii kampaamossa?",
      a: "Jokaisella käynnillä asiakkaan QR-kanta-asiakaskorttiin lisätään yksi lippu. Kun lippuja on asettamasi määrä, asiakas saa valitsemasi prosenttialennuksen. Sen jälkeen lippujen lisääminen jatkuu tavalliseen tapaan.",
    },
    {
      q: "Miksi en näe ”Kanta-asiakaskortit”-kohtaa hallintapaneelissa?",
      a: "”Kanta-asiakaskortit” avautuu, kun salongin profiili on vähintään 85 % valmis. Tarkista profiilin valmiusaste asetuksista ja täydennä puuttuvat kohdat.",
    },
    {
      q: "Miten asiakas saa kanta-asiakaskortin?",
      a: "Kirjoita asiakkaan nimi ja sähköposti kohtaan ”Aktivoi kortti asiakkaalle” ja paina ”Aktivoi ja lähetä QR-koodi sähköpostilla”. Asiakas saa kortin QR-koodeineen sähköpostiin heti.",
    },
    {
      q: "Miten lisään lipun asiakkaan käydessä?",
      a: "Skannaa asiakkaan kortin QR-koodi puhelimen kameralla tai kirjoita kortissa näkyvä koodi ja paina ”Lisää 1 lippu”. Ruutu vahvistaa skannauksen ja näyttää asiakkaan liput.",
    },
    {
      q: "Mitä kortin hinta 0 tarkoittaa?",
      a: "Se tarkoittaa, että kortti on ilmainen. Jos haluat myydä kortin, kirjoita hinta kenttään ”Kortin hinta (0 = ilmainen)” ja paina ”Tallenna”.",
    },
    {
      q: "Voiko asiakas kerätä lippuja enemmän kuin hänellä on käyntejä?",
      a: "Ei voi. Lippu lisätään vain, kun asiakkaalla on toteutunut käynti, jota ei ole vielä skannattu. Siksi lippuja ei koskaan ole enemmän kuin todellisia käyntejä.",
    },
  ],
  related: ["khach-dan-khach", "the-khach-quen", "the-qua-tang-salon", "email-marketing"],
};

export default article;
