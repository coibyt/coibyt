import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/kho-hang/${name}.webp`;
const shot = (name: string) => `/wiki/kho-hang/fi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "salongin-varastonhallinta-puhelimella",
  lesson: "kho-hang",
  category: "salon",
  title: "Salongin varastonhallinta puhelimella: skannaa tarvikkeet sisään ja ulos ja tulosta ostoslista",
  metaTitle: "Salongin varastonhallinta: skannaus ja ostoslista",
  metaDescription:
    "Näin seuraat kynsi-, hius-, ripsi- tai hoitolan tarvikkeita VaraaAissa: lisää tuotteet, aseta minimit, skannaa sisään ja ulos, inventoi ja tulosta ostettavat.",
  keyword: "salongin varastonhallinta",
  keywords: [
    "kynsistudion varasto",
    "salongin tarvikkeiden seuranta",
    "geelilakkojen varastosaldo",
    "mikä on minimivarasto",
    "viivakoodin skannaus puhelimella",
    "salongin ostoslista tarvikkeille",
    "inventaario kuun lopussa",
  ],
  excerpt: "Tiedä, mitä salongissa on, missä kaapissa se on ja mitä pitää ostaa, pelkällä puhelimella: skannaa toimituksen tullessa, skannaa ottaessasi ja laske kuun lopussa.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("salon-toc-dong-khach-can-quan-ly-vat-tu"),
    alt: "Suuri kampaamo, jossa on korkea katto ja kaari-ikkunat, ja useat kampaajat työskentelevät peilien edessä istuvien asiakkaiden kanssa",
  },
  takeaways: [
    "**”Minimi”** on jokaisen tuotteen tärkein luku: kun määrä laskee siihen, tuote siirtyy ostoslistalle itsestään.",
    "Kun toimitus tulee, paina **”Skannaa sisään”**, ja kun otat jotain käyttöön, paina **”Skannaa ulos”**. Jos skannaus ei onnistu, käytä painikkeita ”+1” ja ”−1”.",
    "Uudesta tuotteesta, jota ei vielä ole varastossa, **otat kuvan**: tekoäly lukee nimen, merkin ja sävyn, ja sinä annat vain määrän.",
    "Kuun lopussa laske kaapin sisältö, kirjoita määrä kohtaan ”Inventaario” ja paina **”Päivitä määrä”**.",
    "**”Ostettavat”**-välilehdelle kootaan kaikki minimiin laskeneet tuotteet arvioidun hinnan kanssa, ja listan voi kopioida tai tulostaa.",
  ],
  intro: [
    "Salongin varastonhallinta tulee mieleen yleensä pahimmalla hetkellä: kesken hoidon huomaat, että geelilakka tai poistoaine on loppu. Useimmissa salongeissa tarvikkeita seurataan edelleen yhden ihmisen muistin varassa, eikä hän voi laskea kaappeja samalla kun hoitaa asiakkaita.",
    "Tämä artikkeli seuraa VaraaAi Academyn oppituntia ”Varasto: skannaa sisään ja ulos”. Opit kokoamaan salongin tarvikkeet puhelimeen, antamaan jokaiselle tuotteelle minimin, kirjaamaan tulevat ja lähtevät tarvikkeet skannaamalla ja saamaan ostoslistan ennen jokaista tukkukäyntiä.",
  ],
  sections: [
    {
      id: "miksi-seurata",
      title: "Miksi kynsistudion ja kampaamon kannattaa seurata tarvikkeita",
      blocks: [
        { p: "Kynsistudio käyttää paljon pieniä tarvikkeita: geelilakkoja joka sävyssä, pohja- ja päällyslakkaa, poistoainetta, vanulappuja, folioita. Kampaamossa ja hoitolassa sama koskee värejä, shampoita ja vahoja. Jokainen tuote on halpa, mutta yhden puuttuminen tarkoittaa, että palvelusta pitää kieltäytyä tai asiakkaan valitsemaa sävyä vaihtaa." },
        { p: "Ilman seurantaa käy yleensä kolmella tavalla. Suosittu tuote loppuu, eikä kukaan kerro. Toista ostetaan kahteen kertaan, koska kukaan ei ollut varma, oliko sitä jäljellä. Ja pulloja lojuu laatikon perällä, kunnes ne löytyvät vanhentuneina." },
        { p: "VaraaAin varasto vastaa kolmeen kysymykseen: mitä salongissa on, missä se säilytetään ja mitä pitää ostaa. Kaikki onnistuu puhelimella. ”Varasto”-sivun yläosassa on neljä ruutua: ”Tuotteita”, ”Vähissä”, ”Loppu” ja ”Otettu 7 pv”. Niiden alla näkyy varaston arvo." },
        { img: { src: shot("salongin-tarvikkeet-tuotteita-vahissa"), alt: "Salongin tarvikkeet -näkymä, jossa neljä ruutua Tuotteita, Vähissä, Loppu ja Otettu 7 pv on korostettu kultaisella ja alla näkyy varaston arvo", caption: "Neljä ruutua ”Varasto”-sivun yläosassa. ”Vähissä” ja ”Loppu” kannattaa katsoa joka aamu." } },
        { note: "Varasto on tarvikkeille, joita salonki käyttää työssään. Asiakkaille kotiin myytävät tuotteet lisätään muualle, katso ohje [tuotemyynnistä ja tilausten hallinnasta](lesson:san-pham-don-hang).", kind: "info", title: "Tarvikkeet, ei myyntituotteet" },
      ],
    },
    {
      id: "valmistelut",
      title: "Mitä valmistella ennen varaston kokoamista puhelimeen",
      blocks: [
        {
          ul: [
            "**Puhelin, jossa on kamera**, koska sekä lisääminen että ottaminen tehdään skannaamalla.",
            "**Lista tarvikkeista tyypeittäin.** Kierrä kaapit ja kirjoita ylös, esimerkiksi geelilakat, tavalliset lakat, nesteet.",
            "**Laskentayksikkö jokaiselle tuotteelle.** Videossa geelilakka lasketaan pulloina. Valitse yksiköt, jotka koko tiimi ymmärtää samalla tavalla.",
            "**Minimi jokaiselle tuotteelle**, eli montako on jäljellä, kun on aika ostaa lisää.",
            "**Kaappien ja hyllyjen nimet**, jos haluat kirjata myös säilytyspaikan.",
          ],
        },
        { p: "Koko varastoa ei tarvitse syöttää yhdellä kertaa. Aloita tuotteista, joiden loppuminen pysäyttäisi työt, ja lisää loput vähitellen sitä mukaa kuin toimituksia tulee." },
      ],
    },
    {
      id: "minimi",
      title: "Mikä on minimivarasto ja kuinka suureksi sen asettaa",
      blocks: [
        { p: "Minimi on tuotteen hälytysraja. ”Minimi”-kentän alla oleva huomautus sanoo sen suoraan: kun määrä on tämä tai vähemmän, tuote tulee ostoslistalle. Näin ostat lisää ennen kuin tavara loppuu, etkä vasta sitten, kun tekijä avaa kaapin ja hylly on tyhjä." },
        { img: { src: shot("aseta-minimimaara-tuotteelle"), alt: "Uuden tuotteen lomake, jossa Laskentayksikkö on pullo ja Minimi-kenttä arvolla 2 on korostettu kultaisella ostoslistahuomautuksen kanssa", caption: "Videon esimerkki: geelilakan sävy lasketaan pulloina, ja minimi on 2." } },
        { p: "Oppitunti ei anna yhtä lukua, koska jokainen tuote on erilainen. Käytännöllinen ajatus on kysyä: montako tätä tuotetta salonki käyttää tilauksen ja toimituksen välisenä aikana? Minimin pitäisi riittää tuon odotuksen yli." },
        {
          table: {
            head: ["Tarviketyyppi", "Ehdotus minimiksi"],
            rows: [
              ["Päivittäin käytettävä, kuten pohjalakka, päällyslakka, poistoaine", "Aseta korkeammaksi, koska loppuminen pysäyttää koko salongin"],
              ["Sävyt, joita harva asiakas valitsee", "Aseta matalaksi, jotta pullot eivät seiso vanhenemiseen asti"],
              ["Vaikeasti saatava, kaukaa tilattava", "Aseta niin, että se riittää koko toimitusajan"],
            ],
          },
        },
        { p: "Taulukko on tämän artikkelin ehdotus, ei ohjelman sääntö. Kuukauden tai kahden käytön jälkeen näet, mitkä tuotteet päätyvät ”Ostettavat”-välilehdelle liian myöhään, ja nostat niiden minimiä." },
      ],
    },
    {
      id: "skannaa-kuvaa-vai-napauta",
      title: "Viivakoodi, kuva vai napautus: milloin mitäkin",
      blocks: [
        { p: "Varasto pitää paikkansa vain, jos jokainen sisään ja ulos menevä tuote kirjataan. Siksi kirjaustapoja on useita, ja aina löytyy yksi riittävän nopea." },
        {
          table: {
            head: ["Tilanne", "Mitä teet"],
            rows: [
              ["Toimitus tulee, tuote on jo varastossa", "Paina ”Skannaa sisään” ja näytä tuotteen viivakoodi kameralle"],
              ["Toimitus tulee, tuote on uusi", "Ota kuva tuotteesta. Tekoäly lukee nimen, merkin ja sävyn, ja sinä lisäät määrän"],
              ["Otat pullon käyttöön", "Paina ”Skannaa ulos” ja skannaa koodi"],
              ["Kädet ovat kiinni, eikä skannaus onnistu", "Napauta tuotetta listassa ja sitten ”−1” tai ”+1”"],
              ["Tuotteessa ei ole viivakoodia", "Tulosta sille QR-tarra ”Kaapit ja tarrat” -välilehdeltä ja kiinnitä se"],
            ],
          },
        },
        { note: "Kun olet kuvannut uuden tuotteen, lue nimi, merkki ja sävy ennen tallennusta. Lähekkäiset sävyt menevät helposti sekaisin, ja väärä nimi seuraa tuotetta jokaiseen listaan.", kind: "tip", title: "Tarkista kuvan jälkeen" },
      ],
    },
    {
      id: "inventaario-kaapit-kayttopaiva",
      title: "Inventaario kuun lopussa, kaapit ja viimeiset käyttöpäivät",
      blocks: [
        { p: "Vaikka tiimi skannaisi kuinka huolellisesti, näytön luku ja kaapin pullot erkanevat vähitellen: pullo kaatuu, skannaus unohtuu. Inventaariossa luvut korjataan. Oppitunti suosittelee tekemään sen kuun lopussa: laske, mitä kaapissa oikeasti on, kirjoita määrä kohtaan ”Inventaario” ja paina ”Päivitä määrä”." },
        { p: "Samassa tuotenäkymässä voit kirjata ”Säilytyspaikka”-kohtaan, missä kaapissa tuote on, sekä viimeisen käyttöpäivän. Säilytyspaikan avulla uusi työntekijä löytää tavarat kysymättä. Käyttöpäivän avulla käytät ensin pian vanhenevat pullot ja poistat vanhentuneet sen sijaan, että huomaisit asian kesken hoidon." },
        { img: { src: shot("kaapit-ja-qr-tarrat"), alt: "Kaapit ja tarrat -välilehti: Toimipisteen kaapit, kenttä kaapin nimelle, Lisää-painike sekä kultaisella korostetut painikkeet kaappien QR-tarroille ja viivakoodittomien tuotteiden QR-tarroille", caption: "”Kaapit ja tarrat” -välilehti: luo kaapit ja hyllyt ja tulosta niihin kiinnitettävät QR-tarrat." } },
        { p: "”Kaapit ja tarrat” -välilehdellä luot kaapit ja hyllyt ja tulostat niille QR-tarrat. Kun skannaat sisään, skannaa ensin kaapin tarra, niin tavarat kirjautuvat siihen kaappiin automaattisesti. Se on paljon nopeampaa kuin säilytyspaikan valitseminen jokaiselle tuotteelle erikseen." },
      ],
    },
    {
      id: "ostettavat-ja-historia",
      title: "Tarvikkeiden ostoslista ja sisään ja ulos kirjausten historia",
      blocks: [
        { p: "”Ostettavat”-välilehdelle kootaan kaikki, mikä on minimissä tai sen alla. Jokaisella rivillä näkyvät jäljellä oleva määrä, minimi ja ehdotettu ostomäärä. Listan alussa on arvioitu hinta, joten tiedät suunnilleen, mitä tämä tukkukäynti maksaa." },
        { p: "Tästä pääset kahdella painikkeella eteenpäin. ”Kopioi lista” sopii, kun tilaat toimittajalta viestillä tai sähköpostilla. ”Tulosta lista” sopii, kun haet tavarat itse ja haluat paperin, josta yliviivata rivi kerrallaan." },
        { img: { src: shot("varaston-historia"), alt: "Varaston Historia-välilehti, jossa kaksi geelilakkojen inventaariota päivämäärineen, tekijän nimineen ja määrän muutoksineen on korostettu kultaisella", caption: "”Historia”-välilehti kirjaa jokaisen muutoksen: mikä tuote, milloin, kuka ja kuinka paljon." } },
        { p: "”Historia”-välilehti kertoo, kuka lisäsi tai otti tavaraa ja milloin. Se ei ole henkilökunnan valvomista varten. Sen arvo on siinä, että kun luku ei täsmää, voit selvittää, mitä tapahtui, eikä tarvitse arvata." },
        { p: "Varasto toimii vain, kun koko salongilla on yksi yhteinen tapa: joka ottaa, se skannaa. Kerro se selvästi, kun [lisäät henkilökuntaa](lesson:nhan-vien), ja jos salonki jo käyttää [tiimin työkaluja](lesson:tien-ich-nhom), julkaise tiedote tai lyhyt koulutus skannaamisesta. Jos toimipisteitä on useita, lue myös ohje [useista toimipisteistä](lesson:chi-nhanh), sillä varasto näyttää jokaisen toimipisteen tilanteen." },
      ],
    },
  ],
  howTo: {
    title: "Salongin varastonhallinta VaraaAissa vaihe vaiheelta",
    id: "varaston-vaiheet",
    after: "valmistelut",
    lead: "Seitsemän vaihetta seuraavat oppituntivideon järjestystä: kokoa varasto, kirjaa tulevat tarvikkeet, kirjaa lähtevät, inventoi ja lähde ostoksille.",
    steps: [
      {
        name: "Avaa ”Varasto”",
        text: "Napauta hallintapaneelissa ”Varasto”. Ylhäällä ovat tuotteiden määrä, vähissä olevat, loppuneet ja varaston arvo. Katso nämä luvut ennen kuin teet varastossa mitään muuta.",
      },
      {
        name: "Paina ”Lisää tuote” ja täytä tiedot",
        text: "Paina ”Lisää tuote”, täytä nimi, sävy tai värikoodi, merkki, tyyppi, laskentayksikkö ja ”Minimi” ja paina ”Tallenna”. Kirjoita värikoodi sävykenttään, koska geelilakoissa pelkkä sävyn nimi ei riitä erottamaan niitä toisistaan.",
      },
      {
        name: "Toimitus tulee: paina ”Skannaa sisään”",
        text: "Kun toimitus saapuu, paina ”Skannaa sisään” ja näytä tuotteen viivakoodi kameralle. Skannaa heti laatikon avattuasi, ennen kuin laitat tavarat kaappiin. Jos jätät sen päivän loppuun, jotain jää varmasti kirjaamatta.",
        image: { src: shot("skannaa-sisaan-ja-ulos-painikkeet"), alt: "Varasto-sivu, jossa vihreä Skannaa sisään -painike on korostettu kultaisella, vieressä vaaleanpunainen Skannaa ulos ja alla Lisää tuote" },
      },
      {
        name: "Uusi tuote: ota kuva tuotteesta",
        text: "Jos saapunut tuote ei vielä ole varastossa, paina ”Ota kuva tuotteesta”. Tekoäly lukee nimen, merkin ja sävyn, ja sinä annat vain määrän. Skannausnäkymässä on myös kenttä, johon voit kirjoittaa viivakoodin käsin, jos kamera ei aukea.",
        image: { src: shot("skannaa-viivakoodi-tai-ota-kuva"), alt: "Skannausnäkymä välilehtineen Sisään, Ulos ja Inventaario, kultaisella korostettu kamerakehys ja alla Ota kuva tuotteesta -painike" },
      },
      {
        name: "Otat tavaraa käyttöön: ”Skannaa ulos” tai ”−1”",
        text: "Aina kun otat jotain käyttöön, paina ”Skannaa ulos” ja skannaa koodi. Jos skannaus ei onnistu, napauta tuotetta listassa ja sitten ”−1”. Napauta ”+1”, jos palautat jotain käyttämätöntä.",
        image: { src: shot("plus-yksi-miinus-yksi"), alt: "Viininpunaisen geelilakan näkymä, jossa on 6 pulloa ja minimi 2, ja painikkeet −1 ja +1 on korostettu kultaisella" },
      },
      {
        name: "Inventoi ja paina ”Päivitä määrä”",
        text: "Napauta tuotetta, laske kaapin todellinen määrä, kirjoita se kohtaan ”Inventaario” ja paina ”Päivitä määrä”. Heti alapuolella voit kirjata säilytyspaikan ja viimeisen käyttöpäivän.",
        image: { src: shot("inventaario-paivita-maara"), alt: "Inventaario-osio, jossa luku 6 ja Päivitä määrä -painike on korostettu kultaisella, alla Säilytyspaikka ja Viimeinen käyttöpäivä (jos on)" },
      },
      {
        name: "Avaa ”Ostettavat” ennen tukkukäyntiä",
        text: "Avaa ”Ostettavat”-välilehti nähdäksesi kaikki minimiin laskeneet tuotteet ja arvioidun hinnan. Paina ”Kopioi lista” tai ”Tulosta lista” ja lähde ostoksille. Kun tavarat saapuvat, palaa sisäänskannaukseen.",
        image: { src: shot("ostettavat-ostoslista"), alt: "Ostettavat-välilehden Ostoslista, jossa arvioitu hinta 30,00 euroa sekä Kopioi lista- ja Tulosta lista -painikkeet on korostettu kultaisella, alla kaksi ostettavaa tuotetta" },
      },
    ],
  },
  faq: [
    {
      q: "Mihin varaston minimiä käytetään?",
      a: "Minimi kertoo, milloin on aika ostaa lisää. Kun tuotteen määrä laskee minimiin, tuote siirtyy ostoslistalle itsestään, joten ehdit tilata ennen kuin tavara loppuu.",
    },
    {
      q: "Miten lisään uuden tuotteen varastoon nopeimmin?",
      a: "Paina ”Skannaa sisään” ja valitse ”Ota kuva tuotteesta”. Tekoäly lukee tuotteen nimen, merkin ja sävyn, ja sinun tarvitsee antaa vain määrä.",
    },
    {
      q: "Entä jos viivakoodin skannaus ei onnistu, kun otan tavaraa?",
      a: "Napauta tuotetta listassa ja paina ”−1”, kun otat yhden, tai ”+1”, kun lisäät yhden. Määrä päivittyy ilman, että viivakoodia tarvitsee näyttää kameralle.",
    },
    {
      q: "Mistä näen, mitä tarvikkeita pitää ostaa?",
      a: "”Varasto”-sivun ”Ostettavat”-välilehdeltä. Sinne kootaan minimiin laskeneet tuotteet arvioidun hinnan kanssa. Paina ”Kopioi lista” tai ”Tulosta lista” ja ota lista mukaan.",
    },
    {
      q: "Kuinka usein salongin varasto kannattaa inventoida?",
      a: "Oppitunti suosittelee kuun loppua. Laske kaapin sisältö, kirjoita jokaisen tuotteen määrä kohtaan ”Inventaario” ja paina ”Päivitä määrä”.",
    },
    {
      q: "Näenkö, kuka on ottanut tavaraa varastosta?",
      a: "Näet. ”Historia”-välilehti kertoo, kuka lisäsi tai otti tavaraa ja milloin. Kun määrä ei täsmää, katso välilehdeltä, mistä muutos tuli.",
    },
    {
      q: "Mihin kaappien QR-tarroja käytetään?",
      a: "”Kaapit ja tarrat” -välilehdellä luot kaapit ja hyllyt ja tulostat niihin kiinnitettävät QR-tarrat. Kun skannaat sisään, skannaa ensin kaapin tarra, niin tavarat kirjautuvat siihen kaappiin ja kaikki tietävät, missä mikin on.",
    },
  ],
  related: ["chi-nhanh", "tong-quan", "san-pham-don-hang", "nhan-vien"],
};

export default article;
