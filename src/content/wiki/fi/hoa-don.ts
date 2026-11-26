import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/hoa-don/${name}.webp`;
const shot = (name: string) => `/wiki/hoa-don/fi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "lasku-qr-koodilla-salongista",
  lesson: "hoa-don",
  category: "booking",
  title: "Lasku QR-koodilla salongista: kuitti puhelimeen kassalta tai sähköpostiin",
  metaTitle: "Lasku QR-koodilla salongista: kuitti suoraan puhelimeen",
  metaDescription:
    "Näin saat laskun QR-koodilla hoidon jälkeen: skannaa koodi salongin näytöltä, tarkista palvelut, ALV ja summa, tallenna linkki tai pyydä lasku sähköpostiin.",
  keyword: "lasku QR-koodilla",
  keywords: [
    "sähköinen kuitti kampaamosta",
    "kuitti puhelimeen",
    "kuitti työnantajalle kauneushoidosta",
    "lasku sähköpostiin salongista",
    "kampaamon kuitin tallennus",
    "skannaa QR-koodi kuitti",
  ],
  excerpt: "Skannaa salongin näytöllä oleva QR-koodi maksaessasi, niin lasku aukeaa puhelimeesi. Etkö ole kassalla? Pyydä lasku sähköpostiin.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-thanh-toan-tai-quay-salon-va-nhan-hoa-don-tren-dien-thoai"),
    alt: "Puhelinta pitelevä nainen seisoo salongin vastaanottotiskillä hymyilevän vaaleahiuksisen miehen edessä, tiskillä on korttimaksupääte",
  },
  takeaways: [
    "Kun maksat kassalla, pyydä henkilökuntaa painamaan salongin näytöltä **”Näytä QR-koodi”**.",
    "Avaa puhelimen kamera ja skannaa koodi: lasku aukeaa heti selaimeen.",
    "Laskussa näkyvät salongin nimi, laskun numero, päivä ja kellonaika, palvelut, vero, loppusumma ja maksutapa.",
    "**Ota kuvakaappaus** tai **tallenna linkki**, niin voit katsoa laskua milloin tahansa.",
    "Etkö ole kassalla? Pyydä henkilökuntaa lähettämään lasku sähköpostilla ja napauta viestin linkkiä.",
  ],
  intro: [
    "Kauneushoidon paperikuitti jää usein takin taskuun muutamaksi päiväksi ja katoaa juuri silloin, kun tarvitsisit sitä menojen seurantaan tai työnantajalle. VaraaAita käyttävissä salongeissa saat laskun QR-koodilla: yksi skannaus kassalla, ja lasku on puhelimessasi.",
    "Tämä ohje seuraa VaraaAi Academyn oppituntia ”Avaa lasku QR-koodilla”. Opit, mitä painiketta henkilökunta painaa, miten koodi skannataan, mitä laskun eri osat kertovat, miten säilytät laskun niin, että löydät sen myöhemmin, ja mitä tehdä, jos et ole kassalla.",
  ],
  sections: [
    {
      id: "lasku-puhelimessa",
      title: "Mihin lasku puhelimessa on hyvä",
      blocks: [
        { p: "Oppitunti mainitsee kaksi syytä säilyttää lasku: sen tarkistaminen myöhemmin ja sen lähettäminen yritykselle. Ensimmäinen on tuttu jokaiselle, joka seuraa menojaan: mitä viimeksi tehtiin, mitä se maksoi ja miten maksoit. Toinen koskee niitä, joiden työnantaja korvaa osan kuluista ja tarvitsee siitä tositteen." },
        { p: "Molemmat ovat helpompia, kun lasku on linkki eikä paperilappu. Linkki ei rypisty eikä haalistu, ja sen välittäminen eteenpäin vie sekunteja." },
        { note: "Laskun vastaanottamiseen ei tarvita erillistä sovellusta. Oppitunnissa koodi skannataan puhelimen omalla kameralla, ja lasku aukeaa selaimeen.", kind: "info", title: "Mitä tarvitset" },
      ],
    },
    {
      id: "laskun-lukeminen",
      title: "Laskun lukeminen: mitä kukin osa kertoo",
      blocks: [
        { p: "Laskua luetaan ylhäältä alas: kuka myi, kenelle, mitä ja millä hinnalla. Taulukko seuraa oppitunnin videon esimerkkilaskua." },
        {
          table: {
            head: ["Laskun osa", "Mitä siinä näkyy"],
            rows: [
              ["Salongin nimi", "Sen paikan nimi ja osoite, jossa sait hoidon"],
              ["Laskun numero, päivä ja kellonaika", "Laskun oma tunniste ja laatimisaika. Mainitse se, kun kysyt salongilta jostakin maksusta"],
              ["QR-koodi ”Skannaa nähdäksesi tämän laskun”", "Koodi, jolla avaat saman laskun myöhemmin uudelleen"],
              ["Palvelut", "Jokainen saamasi palvelu, määrä, hinta/kpl ja yhteensä"],
              ["Vero ja loppusumma", "Välisumma, ALV ja maksamasi kokonaissumma"],
              ["Maksutapa", "Miten maksoit, esimerkiksi käteisellä"],
            ],
          },
        },
        { img: { src: shot("vero-yhteensa-ja-maksutapa"), alt: "Laskun loppuosa puhelimessa kultaisella korostettuna: välisumma, ALV 20 %, yhteensä ja Maksutapa: Käteinen", caption: "Vero, loppusumma ja maksutapa ovat laskun lopussa." } },
        { p: "Silmäile lasku läpi jo kassalla. Jos jokin palvelu puuttuu tai summa poikkeaa juuri maksamastasi, asia on paljon helpompi korjata heti kuin muutaman päivän päästä." },
      ],
    },
    {
      id: "skannaus-vai-sahkoposti",
      title: "Skannaus kassalla vai lasku sähköpostiin",
      blocks: [
        { p: "Lasku voi tulla sinulle kahta reittiä, ja molemmat vievät samalle laskusivulle." },
        {
          table: {
            head: ["Tapa", "Mitä teet", "Sopii, kun"],
            rows: [
              ["QR-koodin skannaus kassalla", "Pyydä henkilökuntaa painamaan ”Näytä QR-koodi” ja skannaa se puhelimen kameralla", "Olet kassalla ja puhelin on kädessä"],
              ["Sähköpostilla", "Pyydä henkilökuntaa lähettämään lasku sähköpostilla, avaa viesti ja napauta linkkiä", "Olet jo lähtenyt, puhelimesta on akku loppu tai joku muu maksoi puolestasi"],
            ],
          },
        },
        { note: "Kun pyydät laskun sähköpostiin, tavaa osoitteesi rauhallisesti ja pyydä henkilökuntaa toistamaan se. Yksikin väärä merkki, ja lasku menee väärään paikkaan.", kind: "tip", title: "Tavaa sähköpostisi selvästi" },
      ],
    },
    {
      id: "laskun-sailytys",
      title: "Näin säilytät laskun niin, että löydät sen myöhemmin",
      blocks: [
        { p: "Oppitunti ehdottaa kahta tapaa: kuvakaappausta tai linkin tallentamista. Kummallakin on vahvuutensa." },
        {
          ul: [
            "**Kuvakaappaus:** nopein, ja se toimii ilman verkkoyhteyttä. Pitkästä laskusta voit tarvita kaksi kuvaa, jotta sekä palvelut että loppusumma tulevat mukaan.",
            "**Tallennettu linkki:** avaa koko laskun uudelleen. Lisää sivu selaimen kirjanmerkkeihin tai lähetä linkki itsellesi viestisovelluksessa.",
            "**Laskun QR-koodi:** laskussa on oma koodi ”Skannaa nähdäksesi tämän laskun”. Jos otat kuvakaappauksen laskun yläosasta, voit seuraavalla kerralla vain skannata koodin kuvasta.",
          ],
        },
        { img: { src: shot("palvelut-ja-hinnat-laskulla"), alt: "Lasku puhelimessa, jossa Gel manicure -palvelurivi, määrä, hinta/kpl ja yhteensä on korostettu kultaisella", caption: "Kun otat kuvakaappauksen, ota mukaan sekä palvelut että loppusumma." } },
        { note: "Se, millaisen tositteen työnantaja hyväksyy kulukorvaukseen, riippuu yrityksestä ja maasta. Kysy ennen lähettämistä taloushallinnosta, riittääkö linkki tai kuvakaappaus laskusta vai tarvitaanko salongilta lisätietoja.", kind: "warn", title: "Laskun lähettäminen työnantajalle" },
      ],
    },
    {
      id: "tavallisia-tilanteita",
      title: "Tavallisia tilanteita salongin laskun kanssa",
      blocks: [
        {
          table: {
            head: ["Tilanne", "Mitä teet"],
            rows: [
              ["Henkilökunta ei tarjoa koodia itse", "Kerro, että haluat laskun, ja pyydä painamaan salongin näytöltä ”Näytä QR-koodi”"],
              ["Kamera ei tunnista koodia", "Vie puhelin hieman lähemmäs, pidä käsi vakaana ja vältä heijastuksia näytöllä"],
              ["Muistat asian vasta lähdettyäsi", "Ota yhteyttä salonkiin ja pyydä lasku sähköpostiin"],
              ["Suljit laskusivun vahingossa", "Avaa tallentamasi linkki uudelleen tai skannaa QR-koodi laskusta ottamastasi kuvakaappauksesta"],
              ["Laskulta puuttuu palvelu tai se on väärin", "Kerro heti henkilökunnalle kassalla, jotta salonki voi tarkistaa sen"],
            ],
          },
        },
        { p: "Kun haluat ottaa yhteyttä salonkiin kotoa käsin, voit [lähettää viestin salongille](lesson:chat-voi-salon) VaraaAissa tai katsoa salongin puhelinnumeron kohdasta [Varaukseni](lesson:lich-hen-cua-toi). Samasta kohdasta näet myös jokaisen käynnin päivän, kellonajan ja hinnan." },
        { p: "Jos maksat [lahjakortilla](lesson:the-qua-tang) tai keräät lippuja [kanta-asiakaskorttiin](lesson:the-thanh-vien), kassalla on myös oikea hetki näyttää kortin koodi henkilökunnalle." },
        { note: "Salongit ottavat maksun vastaan kassalla, lähettävät laskut sähköpostilla tai näyttävät asiakkaalle skannattavan QR-koodin hallintapaneelista. Katso oppitunti [Kassa ja laskut](lesson:thanh-toan-hoa-don).", kind: "info", title: "Omistatko salongin?" },
      ],
    },
  ],
  howTo: {
    title: "Laskun avaaminen QR-koodilla vaihe vaiheelta",
    id: "laskun-vaiheet",
    after: "lasku-puhelimessa",
    lead: "Kolme ensimmäistä vaihetta tehdään kassalla, ja ne vievät alle minuutin. Loput ovat niitä tilanteita varten, kun et ole kassalla tai haluat avata laskun uudelleen.",
    steps: [
      {
        name: "Pyydä henkilökuntaa painamaan ”Näytä QR-koodi”",
        text: "Kun olet maksanut, salongin näytöllä lukee ”Maksu vahvistettu” sekä laskun numero ja summa. Pyydä henkilökuntaa painamaan ”Näytä QR-koodi”. Näytölle tulee QR-koodi, jonka sinä skannaat.",
        image: { src: shot("maksu-vahvistettu-salongin-naytolla"), alt: "Salongin näyttö, jossa lukee Maksu vahvistettu, laskun numero ja 45 euroa, alla Näytä / lataa lasku ja Lähetä lasku sähköpostilla -kenttä" },
      },
      {
        name: "Skannaa koodi puhelimen kameralla",
        text: "Avaa puhelimen kamera ja suuntaa se QR-koodiin. Napauta puhelimen ehdottamaa linkkiä. Lasku aukeaa heti selaimeen.",
        image: { src: shot("laskun-qr-koodi-salongin-naytolla"), alt: "Salongin näytön QR-koodi kultaisella korostettuna ja sen alla teksti Asiakas skannaa koodin ja lataa laskun" },
      },
      {
        name: "Lue lasku",
        text: "Tarkista ylhäältä salongin nimi, laskun numero, päivä ja kellonaika. Vieritä alas nähdäksesi saamasi palvelut, veron, loppusumman ja maksutavan. Jos jokin näyttää väärältä, kysy henkilökunnalta heti.",
        image: { src: shot("lasku-aukeaa-puhelimeen"), alt: "Laskun yläosa puhelimessa kultaisella korostettuna: salongin nimi, osoite, laskun numero, päivä ja kellonaika sekä pieni QR-koodi" },
      },
      {
        name: "Ota kuvakaappaus tai tallenna linkki",
        text: "Ota laskusta kuvakaappaus tai tallenna sivun linkki, niin voit katsoa laskua milloin haluat. Jos sinun pitää lähettää lasku työnantajalle, linkki on helpoin välittää eteenpäin.",
      },
      {
        name: "Et ole kassalla: pyydä lasku sähköpostiin",
        text: "Jos et ole kassalla, henkilökunta voi lähettää laskun sinulle sähköpostilla. Avaa viesti ja napauta linkkiä, niin lasku aukeaa täsmälleen samanlaisena kuin koodia skannatessa.",
        image: { src: shot("laheta-lasku-sahkopostilla"), alt: "Salongin näyttö, jossa Lähetä lasku sähköpostilla -kenttä ja Lähetä-painike on korostettu kultaisella ja alla on Näytä QR-koodi -painike" },
      },
      {
        name: "Seuraavalla kerralla: skannaa laskun QR-koodi",
        text: "Laskussa on oma QR-koodinsa ja teksti ”Skannaa nähdäksesi tämän laskun”. Kun tarvitset laskua uudelleen, skannaa tämä koodi sen sijaan, että etsisit vanhaa linkkiä.",
        image: { src: shot("skannaa-nahdaksesi-taman-laskun"), alt: "Salongin lasku puhelimessa, jossa laskun numeron vieressä oleva pieni QR-koodi on korostettu kultaisella" },
      },
    ],
  },
  faq: [
    {
      q: "Miten saan laskun puhelimeeni salongin kassalla?",
      a: "Pyydä henkilökuntaa painamaan salongin näytöltä ”Näytä QR-koodi”, avaa puhelimen kamera ja skannaa koodi. Lasku aukeaa heti selaimeen.",
    },
    {
      q: "Mitä salongin laskussa näkyy?",
      a: "Salongin nimi, laskun numero, päivä ja kellonaika, saamasi palvelut, vero, loppusumma ja maksutapa. Tiedot riittävät laskun säilyttämiseen tai lähettämiseen työnantajalle.",
    },
    {
      q: "Lähdin jo salongista. Miten saan laskun?",
      a: "Pyydä henkilökuntaa lähettämään lasku sähköpostilla. Viestissä on linkki, jota napauttamalla näet laskun palaamatta salonkiin.",
    },
    {
      q: "Miten löydän vanhan laskun uudelleen?",
      a: "Avaa tallentamasi kuvakaappaus tai linkki. Laskussa on myös oma QR-koodi ”Skannaa nähdäksesi tämän laskun”, joten seuraavalla kerralla voit vain skannata sen.",
    },
    {
      q: "Tarvitsenko sovelluksen laskun koodin skannaamiseen?",
      a: "Oppitunnissa koodi skannataan puhelimen omalla kameralla, ja lasku aukeaa selaimeen. Muuta et tarvitse kuin puhelimesi.",
    },
    {
      q: "Voinko lähettää laskun työnantajalleni?",
      a: "Laskussa ovat salongin nimi, laskun numero, palvelut, vero, loppusumma ja maksutapa, ja voit välittää sen linkkinä tai kuvakaappauksena. Se, millaisen tositteen työnantajasi hyväksyy, riippuu sen omista säännöistä, joten kysy taloushallinnosta.",
    },
  ],
  related: ["the-qua-tang", "the-thanh-vien", "theo-doi-salon", "lich-hen-cua-toi"],
};

export default article;
