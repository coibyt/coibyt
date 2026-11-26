import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cai-app/${name}.webp`;
const shot = (name: string) => `/wiki/cai-app/fi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "ajanvaraussovellus-puhelimeen",
  lesson: "cai-app",
  category: "booking",
  title: "Ajanvaraussovellus puhelimeen: näin asennat VaraaAin Androidiin, iPhoneen ja tietokoneelle",
  metaTitle: "Ajanvaraussovellus puhelimeen: VaraaAi Androidiin ja iPhoneen",
  metaDescription:
    "Näin asennat VaraaAi-ajanvaraussovelluksen puhelimeen: Androidissa ja tietokoneella yksi painike, iPhonessa Safari. Maksuton, ei Google Playta eikä App Storea.",
  keyword: "ajanvaraussovellus puhelimeen",
  keywords: [
    "asenna VaraaAi-sovellus",
    "lisää Koti-valikkoon iPhone",
    "sovellus ilman Google Playta",
    "ilmainen kampaamon ajanvaraussovellus",
    "VaraaAi tietokoneelle",
    "kynsistudion ajanvaraus sovellus",
  ],
  excerpt: "Lisää VaraaAi aloitusnäytölle yhdellä napautuksella Androidissa ja tietokoneella tai muutamalla iPhonessa. Maksuton, eikä sovelluskauppaa tarvita.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-mo-app-varaaai-tren-dien-thoai-o-quan-ca-phe"),
    alt: "Vaaleahiuksinen nainen luumunvärisessä huivissa istuu kahvilan ikkunan ääressä ja pitelee puhelinta molemmin käsin kahvikupin vieressä",
  },
  takeaways: [
    "VaraaAi-sovellus asennetaan **suoraan selaimesta** osoitteessa varaaai.com/app, ilman Google Playta tai App Storea, ja se on maksuton.",
    "**Android ja tietokone:** avaa sivu Chromella, Edgellä tai Samsung Internetillä, paina ”Asenna sovellus” ja valitse ”Asenna”.",
    "**iPhone ja iPad:** avaa sivu Safarilla, napauta Jaa-painiketta, valitse ”Lisää Koti-valikkoon” ja napauta ”Lisää”.",
    "Sovellus päivittyy verkkosivun mukana, joten uutta versiota ei tarvitse koskaan ladata.",
    "Osoitetta ei tarvitse muistaa: jokaisen VaraaAi-sivun alareunassa on asennuspainikkeet Androidille, iPhonelle ja tietokoneelle.",
  ],
  intro: [
    "Jos varaat kynsiä, hiustenleikkuuta tai ripsiä usein netistä, ajanvaraussovellus puhelimeen säästää vaivaa: selainta ei tarvitse avata eikä osoitetta kirjoittaa. VaraaAin asennus vie Androidissa yhden napautuksen ja iPhonessa muutaman, eikä sovelluskauppaa tarvita lainkaan.",
    "Tämä ohje seuraa VaraaAi Academyn oppituntia ”Asenna VaraaAi-sovellus”. Opit, mitä selainta kullakin laitteella käytetään, mitä painikkeita painetaan ja mitä tehdä, jos asennuspainiketta ei näy.",
  ],
  sections: [
    {
      id: "mika-sovellus-on",
      title: "Mikä VaraaAi-sovellus on ja miksi se kannattaa asentaa",
      blocks: [
        { p: "VaraaAi-sovellus on varaaai.com-sivusto, joka on lisätty puhelimen aloitusnäytölle omalla kuvakkeellaan, ja se aukeaa kuten mikä tahansa sovellus. Koska se asennetaan suoraan selaimesta, sitä ei löydy Google Playsta eikä App Storesta, eikä sovelluskaupan tiliä tarvita." },
        { p: "Asennussivu kertoo neljä syytä asentaa sovellus, ja kaikki ne hyödyttävät säännöllisesti varaavaa asiakasta:" },
        {
          ul: [
            "**Varaa sekunneissa:** avaat sovelluksen, löydät salonkisi, valitset ajan ja varaat ilman osoitteiden kirjoittamista.",
            "**Muistutukset varauksista:** salongin muistutukset, vahvistukset ja muutokset tulevat suoraan puhelimeesi.",
            "**Tarjoukset seuraamiltasi salongeilta:** tarjoukset, uudet tyylit ja uutiset näkyvät syötteessäsi.",
            "**Aina uusin versio:** sovellus päivittyy verkkosivun mukana, joten uudelleenlatauksia ei tarvita eikä tallennustilaa kulu.",
          ],
        },
        { img: { src: shot("miksi-asentaa-sovellus"), alt: "Miksi asentaa sovellus? -osio tabletilla, jossa näkyvät kortit Varaa sekunneissa ja Muistutukset varauksista", caption: "”Miksi asentaa sovellus?” VaraaAin asennussivulla." } },
        { p: "Ilman sovellustakin voit tehdä [ajanvarauksen netissä](lesson:dat-lich-online) selaimella tavalliseen tapaan. Sovellus vain lyhentää matkaa: yksi napautus kuvakkeeseen sen sijaan, että avaisit selaimen, kirjoittaisit osoitteen ja odottaisit sivun latautumista." },
      ],
    },
    {
      id: "oikea-selain",
      title: "Valitse laitteellesi oikea selain",
      blocks: [
        { p: "Ainoa asia, joka pitää tehdä oikein, on avata asennussivu oikealla selaimella. Useimmiten asennuspainike jää näkymättä siksi, että sivu on avattu eri selaimella kuin ohjeessa mainitaan." },
        {
          table: {
            head: ["Laite", "Selain", "Mitä painat"],
            rows: [
              ["Android-puhelin", "Chrome, Edge tai Samsung Internet", "”Asenna sovellus” ja sitten ”Asenna”"],
              ["Tietokone", "Chrome tai Edge", "”Asenna sovellus” ja sitten ”Asenna”"],
              ["iPhone ja iPad", "Safari", "Jaa-painike, ”Lisää Koti-valikkoon” ja sitten ”Lisää”"],
            ],
          },
        },
        { note: "Kun napautat VaraaAi-linkkiä viestisovelluksessa tai somessa, sivu aukeaa usein sovelluksen omassa sisäisessä selaimessa. Avaa varaaai.com/app uudelleen Safarilla iPhonessa tai Chromella Androidissa ja asenna vasta sitten.", kind: "tip", title: "Linkki toisesta sovelluksesta" },
      ],
    },
    {
      id: "painikkeet-sivun-lopussa",
      title: "Etkö muista asennussivun osoitetta?",
      blocks: [
        { p: "Osoitetta varaaai.com/app ei tarvitse opetella ulkoa. Vieritä minkä tahansa VaraaAi-sivun alareunaan, niin näet laatikon ”Lataa VaraaAi-sovellus” ja kolme Asenna-painiketta: Android, iPhone ja Tietokone. Paina oman laitteesi painiketta, niin asennus alkaa ilman, että palaat etusivulle tai etsit valikosta." },
        { img: { src: shot("asennuspainikkeet-jokaisen-sivun-lopussa"), alt: "Lataa VaraaAi-sovellus -laatikko sivun alareunassa ja kolme tummaa Asenna-painiketta: Android, iPhone ja Tietokone", caption: "Kolme asennuspainiketta löytyy jokaisen VaraaAi-sivun lopusta." } },
        { p: "Asennussivulla on lisäksi QR-koodi otsikon ”Tietokoneella?” alla. Jos selaat VaraaAita tietokoneella mutta haluat sovelluksen puhelimeen, skannaa koodi puhelimen kameralla, niin asennussivu aukeaa puhelimessa eikä osoitetta tarvitse kirjoittaa uudelleen." },
      ],
    },
    {
      id: "tavallisia-tilanteita",
      title: "Tavallisia tilanteita VaraaAi-sovelluksen asennuksessa",
      blocks: [
        {
          table: {
            head: ["Tilanne", "Mitä teet"],
            rows: [
              ["Etsit VaraaAita Google Playsta tai App Storesta etkä löydä", "Sovellus ei ole sovelluskaupoissa. Avaa varaaai.com/app selaimella ja asenna sieltä"],
              ["Android: painoit ”Asenna sovellus”, mutta selain ei kysynyt mitään", "Tarkista, että käytät Chromea, Edgeä tai Samsung Internetiä. Jos et, avaa sivu uudelleen jollakin niistä"],
              ["iPhone: ”Lisää Koti-valikkoon” puuttuu", "Tarkista, että käytät Safaria, ja vieritä Jaa-valikkoa alaspäin: vaihtoehto on ensimmäisten valintojen alapuolella"],
              ["Et tiedä, mikä painike on Jaa", "Se on neliö, jossa on ylöspäin osoittava nuoli, Safarin näytön alareunassa"],
              ["Haluat sovelluksen kotikoneelle tai salongin vastaanoton tietokoneelle", "Avaa varaaai.com/app Chromella tai Edgellä ja toimi kuten Androidissa"],
              ["Sovellus on asennettu, mutta et löydä sitä", "Etsi VaraaAi-kuvake puhelimesi aloitusnäytöltä"],
            ],
          },
        },
      ],
    },
    {
      id: "asennuksen-jalkeen",
      title: "Sovelluksen käyttö asennuksen jälkeen",
      blocks: [
        { p: "Napauta aloitusnäytön VaraaAi-kuvaketta, niin sovellus aukeaa samoine näkymineen kuin verkkosivulla. Jos sinulla ei vielä ole tiliä, [luo tili ja kirjaudu](lesson:tai-khoan) kerran, jotta varauksesi, kanta-asiakaskorttisi ja viestisi salonkien kanssa kulkevat mukanasi." },
        { p: "Sen jälkeen teet sovelluksessa useimmiten kahta asiaa: varaat ajan vakiosalonkiisi ja avaat kohdan [Varaukseni](lesson:lich-hen-cua-toi) tarkistaaksesi kellonajan. Jos [seuraat salonkia](lesson:theo-doi-salon), sen tarjoukset ja uudet tyylit odottavat syötteessäsi aina, kun avaat sovelluksen." },
        { note: "Omistatko salongin? Asiakkaasi asentavat sovelluksen juuri tämän ohjeen vaiheilla. Katso [VaraaAi salongeille](/business), niin tiedät, miten salonkisi pääsee VaraaAihin maksutta.", kind: "info", title: "Salongin omistajalle" },
      ],
    },
  ],
  howTo: {
    title: "VaraaAi-ajanvaraussovelluksen asennus vaihe vaiheelta",
    id: "asennuksen-vaiheet",
    after: "oikea-selain",
    lead: "Kaksi ensimmäistä vaihetta koskevat Androidia ja tietokonetta, kaksi seuraavaa iPhonea ja iPadia. Tee vain oman laitteesi osuus.",
    steps: [
      {
        name: "Android ja tietokone: avaa asennussivu",
        text: "Avaa [varaaai.com/app](/app) Chromella, Edgellä tai Samsung Internetillä. Kohta ”Asennus 3 vaiheessa” kertoo jokaiselle laitteelle oikean järjestyksen, joten voit lukea ja napauttaa samaan aikaan.",
        image: { src: shot("asennus-3-vaiheessa-android-ja-tietokone"), alt: "Asennussivun Asennus 3 vaiheessa -kohta, jossa Android ja tietokone -ohjeet on korostettu kultaisella kehyksellä" },
      },
      {
        name: "Paina ”Asenna sovellus” ja valitse ”Asenna”",
        text: "Paina sivun yläosan ”Asenna sovellus” -painiketta. Selain pyytää vahvistusta, ja valitset ”Asenna”. VaraaAi-kuvake ilmestyy heti aloitusnäytölle, ja Androidin ja tietokoneen osalta asennus on valmis.",
        image: { src: shot("paina-asenna-sovellus-android"), alt: "Asenna VaraaAi-sovellus -sivu tabletilla, jossa Asenna sovellus -painike on korostettu kultaisella" },
      },
      {
        name: "iPhone ja iPad: avaa Safarilla ja napauta Jaa",
        text: "Avaa [varaaai.com/app](/app) Safarilla. Napauta Jaa-painiketta eli neliötä, jossa on ylöspäin osoittava nuoli, näytön alareunassa. Alhaalta liukuu esiin valikko.",
        image: { src: shot("iphone-napauta-jaa-painiketta-safarissa"), alt: "Asennussivun iPhone ja iPad -ohjeet, joissa Jaa-painikkeen napauttamista koskeva rivi on korostettu kultaisella" },
      },
      {
        name: "Valitse ”Lisää Koti-valikkoon” ja napauta ”Lisää”",
        text: "Vieritä valikkoa alaspäin, kunnes näet ”Lisää Koti-valikkoon”, ja napauta sitä. Vahvista napauttamalla ”Lisää”. VaraaAi-kuvake on nyt aloitusnäytölläsi kuten muutkin sovellukset.",
        image: { src: shot("iphone-lisaa-koti-valikkoon"), alt: "iPhone ja iPad -ohjeet, joissa rivi Valitse Lisää Koti-valikkoon ja napauta Lisää on korostettu kultaisella" },
      },
      {
        name: "Avaa sovellus aloitusnäytöltä",
        text: "Etsi VaraaAi-kuvake aloitusnäytöltä ja napauta sitä. Tästä lähtien pääset suoraan VaraaAihin ilman selainta, ja varaus on vain muutaman napautuksen päässä.",
      },
    ],
  },
  faq: [
    {
      q: "Onko VaraaAi-sovellus maksuton?",
      a: "On. VaraaAi-sovellus on maksuton, ja se asennetaan suoraan osoitteesta varaaai.com/app. Myös salonkien haku ja ajanvaraus VaraaAissa ovat asiakkaalle maksuttomia.",
    },
    {
      q: "Miksi en löydä VaraaAita Google Playsta tai App Storesta?",
      a: "Koska sovellusta ei julkaista sovelluskauppojen kautta. Asennat sen selaimesta: avaa varaaai.com/app ja paina Androidissa ja tietokoneella ”Asenna sovellus” tai käytä iPhonessa Safarin Jaa-painiketta.",
    },
    {
      q: "Miten VaraaAi-sovellus asennetaan iPhoneen?",
      a: "Avaa varaaai.com/app Safarilla. Napauta näytön alareunan Jaa-painiketta eli neliötä, jossa on ylöspäin osoittava nuoli, vieritä kohtaan ”Lisää Koti-valikkoon” ja napauta ”Lisää”.",
    },
    {
      q: "Pitääkö sovellusta päivittää, ja viekö se tallennustilaa?",
      a: "Sovellus päivittyy verkkosivun mukana, joten käytössäsi on aina uusin versio ilman uusia latauksia. VaraaAin asennussivun mukaan se ei vie tallennustilaa.",
    },
    {
      q: "Voiko ajan varata asentamatta sovellusta?",
      a: "Voi. Voit varata varaaai.com-sivulla millä tahansa selaimella tavalliseen tapaan. Sovellus vain aukeaa nopeammin aloitusnäytöltä ja tuo varausmuistutukset puhelimeesi.",
    },
    {
      q: "Voiko VaraaAi-sovelluksen asentaa tietokoneelle?",
      a: "Voi. Avaa varaaai.com/app tietokoneella Chromella tai Edgellä, paina ”Asenna sovellus” ja valitse ”Asenna”, kun selain kysyy, aivan kuten Androidissa.",
    },
  ],
  related: ["dat-lich-online", "tai-khoan", "lich-hen-cua-toi", "theo-doi-salon"],
};

export default article;
