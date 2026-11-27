import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cong-tac-vien/${name}.webp`;
const shot = (name: string) => `/wiki/cong-tac-vien/fi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "salongin-suosittelijaohjelma-provisio",
  lesson: "cong-tac-vien",
  category: "salon",
  title: "Salongin suosittelijaohjelma: oma linkki jokaiselle kumppanille, provisio ja tuotujen asiakkaiden seuranta",
  metaTitle: "Salongin suosittelijaohjelma: oma linkki ja provisio",
  metaDescription:
    "Näin käytät VaraaAin kumppanuusmarkkinointia salongissa: lisää kumppanit, aseta provisio, lähetä oma linkki tai QR-koodi ja seuraa maksamatonta provisiota.",
  keyword: "salongin suosittelijaohjelma",
  keywords: [
    "kumppanuusmarkkinointi salongille",
    "kynsistudion suosittelijat",
    "suositteluprovisio kauneushoitolassa",
    "kumppanit tuomaan asiakkaita",
    "oma suosittelulinkki jokaiselle kumppanille",
    "provision maksaminen suosittelijalle",
    "kumppanin QR-koodi esitteeseen",
  ],
  excerpt: "Jokainen suosittelija saa oman linkin ja QR-koodin. Linkin kautta tehty varaus kirjataan hänelle provisioineen, ja sinä maksat provision itse.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("le-tan-chao-don-khach-duoc-gioi-thieu-den-salon"),
    alt: "Hymyilevä vastaanottovirkailija violetissa takissa toivottaa kermanvaaleaan takkiin pukeutuneen naisen tervetulleeksi salongin marmoritiskillä, taustalla odottavia asiakkaita",
  },
  takeaways: [
    "Työntekijät, ystävät tai kanta-asiakkaat voivat kaikki suositella salonkia. Jokainen saa **oman linkin ja QR-koodin**.",
    "Lisää heidät kohdassa **”Markkinointi”, ”Kumppanuusmarkkinointi”, ”Lisää kumppani”** nimellä, sähköpostilla ja provisioprosentilla.",
    "Provisio on **5 %, 10 %, 15 %, 20 %** tai oma luku, ja se lasketaan linkin kautta tehtyjen varausten arvosta.",
    "Näet jokaisen kumppanin linkin klikkaukset, varaukset, myynnin ja maksamattoman provision.",
    "**VaraaAi vain seuraa ja laskee provision.** Maksat kumppaneille itse ja kirjaat sitten maksun.",
  ],
  intro: [
    "Salongin suosittelijaohjelma tuo uusia asiakkaita ilman, että mainonnasta maksetaan etukäteen: maksat vasta, kun joku oikeasti varaa. Vaikeinta on aina ollut kirjanpito. Asiakas kertoo ystävän suositelleen, kuun lopussa kukaan ei muista kaikkia, ja innokkain suosittelija jää helpoimmin ilman osuuttaan.",
    "Tämä artikkeli seuraa VaraaAi Academyn oppituntia ”Kumppanit, jotka tuovat asiakkaita”. Opit lisäämään kumppanin, asettamaan provision, lähettämään hänelle oman linkin tai QR-koodin ja lukemaan tulokset, jotta tiedät, kenelle olet velkaa ja paljonko.",
  ],
  sections: [
    {
      id: "mita-se-on",
      title: "Mitä kumppanuusmarkkinointi salongille on ja kuka voi olla kumppani",
      blocks: [
        { p: "Kumppanuusmarkkinointi on virallinen nimi asialle, jota jokainen salonki on tehnyt: pyydetään tuttuja suosittelemaan ja kiitetään heitä provisiolla. Ohjelma vain korvaa vihon. Jokainen suosittelija saa oman linkin. Kun asiakas varaa linkin kautta, järjestelmä kirjaa varauksen kyseiselle henkilölle provisioineen." },
        { p: "Oppitunti mainitsee kolme ryhmää, jotka voivat tuoda salongille asiakkaita: työntekijät, ystävät ja kanta-asiakkaat. Käytännössä hyvä suosittelija on joku, joka kohtaa salonkisi asiakkaat ennen sinua. Tämän artikkelin esimerkkejä: häämeikkaaja, ystävä, jolla on paljon seuraajia somessa, tai oma tekijäsi, joka haluaa tuoda kanta-asiakkaansa mukanaan." },
        { p: "Älä sekoita tätä [asiakas tuo asiakkaan -ohjelmaan](lesson:khach-dan-khach). Molemmat tähtäävät uusiin asiakkaisiin, mutta ne sopivat erilaisille suosittelijoille:" },
        {
          table: {
            head: ["", "Asiakas tuo asiakkaan", "Kumppanuusmarkkinointi"],
            rows: [
              ["Kuka suosittelee", "Asiakkaat, joilla on salongin kanta-asiakaskortti", "Lisäämäsi kumppanit: työntekijät, ystävät, kanta-asiakkaat"],
              ["Palkkio", "Lippuja kanta-asiakaskorttiin", "Prosenttiprovisio"],
              ["Kuka palkitsee", "Järjestelmä lisää liput itse", "Sinä maksat, VaraaAi vain seuraa"],
            ],
          },
        },
      ],
    },
    {
      id: "valmistelut",
      title: "Mitä valmistella ennen suosittelijoiden hankkimista",
      blocks: [
        { p: "Kumppanin lisääminen vie minuutin. Aikaa vie sopimus suosittelijan kanssa. Sopikaa kolmesta asiasta kasvokkain tai viestillä ennen kuin luot linkin:" },
        {
          ul: [
            "**Prosentti.** Se lasketaan linkin kautta tehtyjen varausten arvosta.",
            "**Milloin maksetaan.** Esimerkiksi jokaisen kuukauden lopussa. Videossa esimerkkikumppanin ”Muistiinpano”-kenttään on kirjoitettu juuri tämä.",
            "**Miten maksetaan.** VaraaAi ei siirrä rahaa puolestasi, joten sovitte maksutavasta keskenänne.",
          ],
        },
        { p: "Tarvitset myös kumppanin nimen ja sähköpostiosoitteen. Jos haluat helposti muistettavan linkin, mieti hänelle valmiiksi lyhyt koodi, esimerkiksi nimi ja numero." },
        { note: "Provisioiden kirjanpito ja verotus vaihtelevat maittain, eikä oppitunti käsittele niitä. Suomessa verotusta koskevia ohjeita antaa Verohallinto. Jos salonki maksaa provisioita säännöllisesti, kysy kirjanpitäjältäsi, miten ne kirjataan.", kind: "warn", title: "Kysy provisioista kirjanpitäjältä" },
      ],
    },
    {
      id: "provisio",
      title: "Suositteluprovisio: mistä se lasketaan ja kuinka suuri sen pitäisi olla",
      blocks: [
        { p: "Valitse kohdassa ”Provisio (%)” valmis taso, 5 %, 10 %, 15 % tai 20 %, tai kirjoita oma luku. Kentän alla oleva huomautus kertoo laskutavan: provisio on osuus linkin kautta tehtyjen varausten arvosta. Näytön esimerkki: 50,00 euron varauksesta 10 prosentilla tulee 5,00 euron provisio." },
        { p: "Oppitunti ei suosittele mitään lukua, ja video käyttää 10 prosenttia vain esimerkkinä. Kun päätät itse, kolme asiaa kannattaa punnita:" },
        {
          ul: [
            "**Mitä salongille jää maksun jälkeen.** Provisio lasketaan varauksen arvosta, mutta salonki maksaa silti tarvikkeet ja tekijän työajan.",
            "**Palaako uusi asiakas.** Suositeltu asiakas, josta tulee kanta-asiakas, on monin verroin ensimmäisen käynnin arvoinen.",
            "**Reiluus kumppanien kesken.** Samaa työtä tekeville sama prosentti, jottei kenenkään tarvitse vertailla.",
          ],
        },
        { p: "Jokaisella kumppanilla on oma provisionsa, joka näkyy listassa nimen vieressä, esimerkiksi ”Provisio 10 %”. Nimen vieressä olevasta kynäkuvakkeesta voit muokata kumppanin tietoja." },
      ],
    },
    {
      id: "linkki-ja-qr",
      title: "Oma suosittelulinkki ja QR-koodi jokaiselle kumppanille",
      blocks: [
        { p: "Tallennuksen jälkeen kumppani näkyy kohdassa ”Kumppanisi” oman linkkinsä kanssa. Kumppani jakaa linkin, ja asiakas napauttaa sitä ja varaa tavalliseen tapaan. Asiakkaan ei tarvitse kirjoittaa koodia eikä mainita kenenkään nimeä, koska linkki kantaa tiedon mukanaan." },
        { p: "”Linkin koodi (valinnainen)” on vapaaehtoinen. Huomautus kertoo: isot kirjaimet ja numerot, 3–20 merkkiä, ja jos kentän jättää tyhjäksi, luodaan satunnainen koodi. Suosittelijan nimen sisältävä koodi auttaa häntä tunnistamaan linkkinsä ja jakamaan sen luottavaisesti." },
        { img: { src: shot("kumppanin-qr-koodi-esitteisiin"), alt: "Ikkuna QR-koodi: Camille Laurent, jossa suuri QR-koodi violetilla kortilla on korostettu kultaisella, yläpuolella salongin nimi ja alla linkki", caption: "Jokaisen kumppanin QR-koodi: tulosta se esitteisiin tai käyntikortteihin tai pidä sitä kumppanin tiskillä." } },
        { p: "QR-koodi on paikkoihin, joissa linkkiä ei voi napauttaa. Lataa koodi ja tulosta se esitteisiin tai käyntikortteihin. Skannaus avaa varaussivun, ja varaus kirjataan oikealle kumppanille. Kumppani, jolla on oma liike, voi pitää koodillista korttia omalla tiskillään." },
        { note: "Tämä on kumppanin oma linkki, eri kuin salongin yleinen varauslinkki ohjeessa [varauslinkin jakamisesta](lesson:chia-se-link). Yleisen linkin kautta tehdyistä varauksista ei kirjaudu provisiota kenellekään.", kind: "info", title: "Oma linkki ja yleinen linkki" },
      ],
    },
    {
      id: "seuranta-ja-maksu",
      title: "Tulosten seuranta ja provision maksaminen suosittelijalle",
      blocks: [
        { p: "”Kumppanuusmarkkinointi”-sivun yläosassa ovat yhteenvetoluvut: kumppanit, linkin klikkaukset, suositellut varaukset, suositeltu myynti ja maksamaton provisio. Voit katsoa niitä 30 päivän, 90 päivän tai 12 kuukauden ajalta tai kaikilta ajoilta." },
        { img: { src: shot("kumppanuusmarkkinoinnin-luvut-maksamaton-provisio"), alt: "Kumppanuusmarkkinoinnin yhteenveto, jossa ruudut Kumppanit, Linkin klikkaukset, Suositellut varaukset ja Suositeltu myynti on korostettu kultaisella, alla kultainen Maksamaton provisio", caption: "Kultainen ”Maksamaton provisio” laskee toteutuneet käynnit, maksetut vähennettynä." } },
        { p: "”Maksamaton provisio” -ruudun pienellä tekstillä on merkitystä: luku koskee toteutuneita käyntejä, ja jo maksettu on vähennetty. Alempana jokaisella kumppanilla on neljä omaa lukuaan. Kun luet niitä pareittain, ne kertovat paljon:" },
        {
          table: {
            head: ["Mitä näet", "Mitä se voi tarkoittaa"],
            rows: [
              ["Paljon klikkauksia, vähän varauksia", "Kiinnostusta on, mutta varauksia ei synny. Tarkista varaussivu: palvelut, hinnat, vapaat ajat"],
              ["Vähän klikkauksia", "Kumppani ei ole jakanut linkkiä paljon. Kysy, mitä hän tarvitsee, esimerkiksi tulostettavan QR-koodin"],
              ["Tasaisesti varauksia ja myyntiä", "Pitämisen arvoinen kumppani. Maksa ajallaan ja kiitä"],
            ],
          },
        },
        { img: { src: shot("maksamatta-kaikki-maksettu"), alt: "Kumppanin kortti, jossa klikkaukset, varaukset, myynti ja provisio sekä kultaisella korostettu Maksamatta-ruutu tekstillä Kaikki maksettu", caption: "Jokaisen kumppanin ”Maksamatta”-ruutu. Kun mitään ei ole maksamatta, siinä lukee ”Kaikki maksettu”." } },
        { p: "VaraaAi hoitaa vain seurannan. Maksat provision kumppanille sovitulla tavalla. Kun olet maksanut, käytä painiketta ”Kirjaa maksu”, niin kirjanpito pysyy selvänä. Kirjaa maksu samana päivänä. Jos annat sen odottaa muutaman kuukauden, et itsekään muista, mihin asti olet maksanut." },
        { p: "Yhteenveto laskee vain kumppanien kautta tulleet asiakkaat. Koko salongin tilanteen näet [yleiskatsauksesta](lesson:tong-quan)." },
      ],
    },
    {
      id: "arjen-tilanteet",
      title: "Tavallisia tilanteita kumppanien kanssa",
      blocks: [
        {
          table: {
            head: ["Tilanne", "Mitä teet"],
            rows: [
              ["Kumppani haluaa asiakkaille helposti luettavan linkin", "Anna kumppania lisätessä linkin koodi, jossa on hänen nimensä"],
              ["Kumppani jakaa esitteitä eikä voi lähettää linkkiä", "Napauta hänen linkkinsä vieressä olevaa QR-kuvaketta ja lataa koodi tulostettavaksi"],
              ["Kumppani kysyy, paljonko hän on ansainnut tässä kuussa", "Katso hänen korttinsa provisio ja ”Maksamatta”-ruutu"],
              ["Asiakas kertoo tulleensa suosituksesta mutta varasi yleisen linkin kautta", "Vain oman linkin kautta tehdyt varaukset kirjautuvat. Muistuta kumppaneita jakamaan aina oma linkkinsä"],
            ],
          },
        },
        { p: "Jos haluat kumppanin tulosteen näyttävän salongin omilta julisteilta, liitä hänen oma linkkinsä [QR-julistetyökaluun](lesson:poster-qr), sillä julisteen QR-koodi avaa sen linkin, jonka liität. Kanta-asiakkaille, jotka suosittelevat mielellään ilman provisiota, asiakas tuo asiakkaan -ohjelma ja [kanta-asiakaskortti](lesson:the-tich-diem) ovat kevyempi vaihtoehto." },
      ],
    },
  ],
  howTo: {
    title: "Salongin suosittelijaohjelma VaraaAissa vaihe vaiheelta",
    id: "kumppanuuden-vaiheet",
    after: "valmistelut",
    lead: "Seitsemän vaihetta kulkevat ”Kumppanuusmarkkinoinnin” avaamisesta provision maksamiseen oppituntivideon järjestyksessä.",
    steps: [
      {
        name: "Avaa ”Markkinointi” ja sitten ”Kumppanuusmarkkinointi”",
        text: "Napauta hallintapaneelissa ”Markkinointi”. ”Kumppanuusmarkkinointi”-painike on sivun yläosassa. Avaa kumppanisivu napauttamalla sitä.",
      },
      {
        name: "Napauta ”Lisää kumppani”",
        text: "Sivun alussa on lyhyt esittely ja kultainen ”Lisää kumppani” -painike. Napauta sitä, niin ”Lisää uusi kumppani” -lomake aukeaa.",
        image: { src: shot("lisaa-kumppani-painike"), alt: "Kumppanuusmarkkinointi-sivu, jossa kultainen Lisää kumppani -painike on korostettu, alla jaksopainikkeet sekä Kumppanit- ja Linkin klikkaukset -ruudut" },
      },
      {
        name: "Täytä ”Kumppanin nimi” ja sähköposti",
        text: "Kirjoita ”Kumppanin nimi” ja hänen sähköpostiosoitteensa. Käytä koko nimeä, jotta lista pysyy selkeänä, kun kumppaneita on useita.",
        image: { src: shot("lisaa-uusi-kumppani-nimi-ja-sahkoposti"), alt: "Lisää uusi kumppani -lomake, jossa Kumppanin nimi- ja Sähköposti-kentät on korostettu kultaisella, alla Puhelin ja provisiotasot" },
      },
      {
        name: "Valitse ”Provisio (%)”",
        text: "Napauta 5 %, 10 %, 15 % tai 20 % tai kirjoita oma luku alla olevaan kenttään. Prosentti lasketaan linkin kautta tehtyjen varausten arvosta, joten valitse se taso, josta olette sopineet.",
        image: { src: shot("valitse-provisio-prosentti"), alt: "Provisio (%) -kohta korostettuna kultaisella: tasot 5 %, 10 %, 15 % ja 20 %, 10 % valittuna ja esimerkki 50,00 euron varauksesta ja 5,00 euron provisiosta" },
      },
      {
        name: "Anna halutessasi linkin koodi ja napauta ”Tallenna”",
        text: "Voit valita oman, helposti muistettavan linkin koodin tai jättää kentän tyhjäksi, jolloin koodi luodaan satunnaisesti. ”Muistiinpano”-kenttään voit kirjata sopimuksenne, esimerkiksi provision maksupäivän. Napauta lopuksi ”Tallenna”.",
        image: { src: shot("linkin-koodi-ja-tallenna"), alt: "Lomakkeen loppu: Linkin koodi (valinnainen) arvolla CAMILLE10, muistiinpano kuukausittaisesta maksusta ja kultaisella korostettu Tallenna-painike" },
      },
      {
        name: "Kopioi linkki tai lataa QR-koodi kumppanille",
        text: "Napauta kohdassa ”Kumppanisi” kopiointikuvaketta, niin saat kumppanin oman linkin lähetettäväksi hänelle. Napauta QR-kuvaketta, jos hän tarvitsee koodin esitteisiin tai käyntikortteihin.",
        image: { src: shot("kopioi-kumppanin-linkki"), alt: "Kumppanin kortti Kumppanisi-listassa, jossa kumppanin oman linkin vieressä oleva kopiointikuvake on korostettu kultaisella" },
      },
      {
        name: "Seuraa tuloksia ja kirjaa maksut",
        text: "Aina kun asiakas varaa linkin kautta, VaraaAi kirjaa jokaiselle kumppanille linkin klikkaukset, varaukset, myynnin ja maksamattoman provision. Maksat heille itse. Kun olet maksanut, kirjaa maksu.",
        image: { src: shot("kumppanin-tulokset"), alt: "Kumppanin kortti, jossa ruudut Klikkaukset, Varaukset, Myynti ja Provisio on korostettu kultaisella, alla Maksamatta-ruutu" },
      },
    ],
  },
  faq: [
    {
      q: "Mistä järjestelmä tietää, kuka kumppani suositteli asiakasta?",
      a: "Jokaisella kumppanilla on oma linkki ja QR-koodi. Linkin kautta tehty varaus kirjataan kyseiselle kumppanille provisioineen.",
    },
    {
      q: "Kuka maksaa provision salongin kumppaneille?",
      a: "Salongin omistaja maksaa. VaraaAi vain seuraa ja laskee provision. Kirjaa maksu maksamisen jälkeen, jotta kirjanpito pysyy selkeänä.",
    },
    {
      q: "Mistä kumppanin provisio lasketaan?",
      a: "Kumppanin linkin kautta tehtyjen varausten arvosta. Valitset 5 %, 10 %, 15 %, 20 % tai oman luvun. Näytön esimerkki: 50,00 euron varauksesta 10 prosentilla tulee 5,00 euron provisio.",
    },
    {
      q: "Kuka voi olla salongin suosittelijakumppani?",
      a: "Työntekijät, ystävät tai kanta-asiakkaat. Lisäät heidät kumppaneiksi ”Kumppanuusmarkkinoinnissa”, ja jokainen saa oman linkin.",
    },
    {
      q: "Miten saan kumppanin linkin esitteeseen?",
      a: "Käytä kumppanin QR-koodia. Napauta kohdassa ”Kumppanisi” QR-kuvaketta, lataa koodi ja tulosta se esitteisiin tai käyntikortteihin. Skannaus avaa salongin varaussivun.",
    },
    {
      q: "Voinko antaa jokaiselle kumppanille helposti muistettavan linkin koodin?",
      a: "Voit. ”Linkin koodi (valinnainen)” hyväksyy isot kirjaimet ja numerot, 3–20 merkkiä. Jos jätät kentän tyhjäksi, luodaan satunnainen koodi.",
    },
  ],
  related: ["khach-dan-khach", "tong-quan", "chia-se-link", "poster-qr"],
};

export default article;
