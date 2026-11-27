import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/poster-qr/${name}.webp`;
const shot = (name: string) => `/wiki/poster-qr/fi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "qr-koodi-ajanvaraukseen-juliste-salongille",
  lesson: "poster-qr",
  category: "marketing",
  title: "QR-koodi ajanvaraukseen: tee salongille ilmainen ”Skannaa ja varaa” -juliste muutamassa minuutissa",
  metaTitle: "QR-koodi ajanvaraukseen: ilmainen QR-juliste salongille",
  metaDescription:
    "Näin teet kynsistudiolle, kampaamolle tai hoitolalle QR-julisteen VaraaAin ilmaisella työkalulla: linkki, otsikko, tyyli ja koko, sitten PDF tai PNG.",
  keyword: "QR-koodi ajanvaraukseen",
  keywords: [
    "skannaa ja varaa juliste",
    "QR-koodi kynsistudiolle",
    "QR-koodi ilmaiseksi yritykselle",
    "QR-juliste salongin oveen",
    "QR-koodin tulostus A4, A5 tai A6",
    "mihin QR-koodi salongissa",
    "pöytäkyltti QR-koodilla",
  ],
  excerpt: "Anna linkki, valitse otsikko, tyyli ja koko ja lataa PDF tai PNG. Työkalu on ilmainen, eikä se vaadi kirjautumista tai suunnittelutaitoja.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-va-chu-tiem-ben-the-dung-tai-quay-salon"),
    alt: "Mies ja nainen nauravat salongin marmoritiskillä ja katsovat yhdessä puhelinta kullanvärisen pöytäkyltin vieressä",
  },
  takeaways: [
    "VaraaAin QR-julistetyökalu on **ilmainen eikä vaadi kirjautumista**. Salonkitili vain täyttää linkin puolestasi.",
    "QR-koodi avaa juuri sen linkin, jonka liität: varaussivun, verkkosivun, Facebookin tai Instagramin.",
    "**”Lataa PDF”** on tulostusta varten, **”Lataa PNG”** someen.",
    "**Skannaa koodi omalla puhelimellasi** ennen kuin tulostat pinon kappaleita.",
    "Neljä toimivaa paikkaa: lasiovi, kassa, kynsipöytä ja asiakkaan tuolin edessä oleva peili.",
  ],
  intro: [
    "QR-koodi ajanvaraukseen toimii julisteessa kahdessa tilanteessa, joihin netissä oleva linkki ei yllä: kun joku kävelee salongin ohi ja kun asiakas odottaa tiskillä. Hän nostaa puhelimen kerran, ja varaussivu aukeaa. Kenenkään ei tarvitse kysyä mitään tai muistaa salongin nimeä hakeakseen sen myöhemmin.",
    "Tämä artikkeli seuraa VaraaAi Academyn oppituntia ”Skannaa ja varaa” -QR-julisteen tekemisestä. Teet valmiin julisteen muutamassa minuutissa, valitset oikean koon salongin eri paikkoihin ja tarkistat koodin ennen tulostusta.",
  ],
  sections: [
    {
      id: "miksi-qr-juliste",
      title: "Miksi salonki tarvitsee ”Skannaa ja varaa” -julisteen",
      blocks: [
        { p: "Asiakas, joka on juuri saanut kauniit kynnet, varaa seuraavan ajan kaikkein todennäköisimmin. Sillä hetkellä hän kuitenkin seisoo tiskillä lompakko kädessä eikä ala kirjoittaa verkko-osoitetta selaimeen. Suoraan hänen edessään oleva QR-koodi muuttaa aikomuksen varaukseksi ennen kuin hän lähtee ovesta." },
        { p: "Juliste tekee työtä myös silloin, kun salonki on kiinni. Myöhään illalla ohi kulkeva näkee julisteen lasiovessa, skannaa koodin ja varaa ajan toiselle päivälle." },
        { p: "Ennen tällaista julistetta varten piti palkata suunnittelija. Oppitunnin työkalu tekee suunnittelun valmiiksi: sinä kirjoitat tiedot ja valitset tyylin. Se on ilmainen ja toimii heti ilman kirjautumista." },
      ],
    },
    {
      id: "valmistelu",
      title: "Mitä tarvitset ennen kuin teet salongille QR-koodin",
      blocks: [
        {
          ul: [
            "**Linkki, jonka asiakas avaa skannatessaan.** Paras valinta on salongin varaussivu; ohje [ajanvarauslinkin jakamisesta](lesson:chia-se-link) kertoo, mistä sen löydät. Voit käyttää myös omaa linkkiä, kuten verkkosivua, Facebookia tai Instagramia.",
            "**Salongin nimi** kirjoitettuna täsmälleen kuten kyltissä.",
            "**Logotiedosto**, jos salongilla on logo.",
            "**Paikka, johon juliste tulee.** Ovi, pöytä tai Instagram ratkaisee, minkä koon valitset.",
          ],
        },
        { note: "Jos salongilla ei vielä ole nettiajanvarausta, sen saa luotua muutamassa minuutissa maksutta. Katso ohje [salongin rekisteröinnistä ja aktivoinnista](lesson:dang-ky-salon). Kun olet kirjautunut salonkitilillä, julistetyökalu voi täyttää linkin puolestasi.", kind: "info", title: "Ei vielä varauslinkkiä" },
      ],
    },
    {
      id: "julisteen-tekstit",
      title: "Mitä julisteeseen kirjoitetaan: kielet, otsikko ja lisärivit",
      blocks: [
        { p: "Kohdassa ”Julisteen tekstit” on kolme valintaa. Tee jokainen asiakkaidesi mukaan, älä oman maun mukaan." },
        { h3: "Kielet" },
        { p: "Julisteessa voi olla jopa kolme kieltä rinnakkain, ja ensimmäisenä valittu on pääkieli. Tästä on hyötyä salongille, jonka asiakkaat tulevat monesta maasta. Laita ensimmäiseksi kieli, jolla salonki palvelee, ja lisää sen jälkeen kielet, joita vakioasiakkaasi puhuvat." },
        { h3: "Otsikko" },
        { p: "Valitse valmis ”Otsikko”, kuten ”Skannaa ja varaa” tai ”Varaa aika tästä”. Otsikon asiakas lukee kaukaa, joten sen pitää kertoa yksi asia: mitä koodin skannaaminen tekee." },
        { h3: "Lisärivit" },
        { p: "Otsikon alle voit lisätä ”Lisärivit (valinnainen)”: ”Tarjous”, ”Aukioloajat”, ”Puhelin” ja ”Wi-Fi”. Mikään niistä ei ole pakollinen. Wi-Fi-rivillä on hyödyllinen sivuvaikutus: odottava asiakas etsii usein Wi-Fi-salasanaa, ja kun hän löytää sen julisteesta, hän näkee samalla QR-koodin." },
        { note: "Älä täytä jokaista riviä vain siksi, että kenttä on olemassa. Mitä vähemmän tekstiä, sitä paremmin QR-koodi ja otsikko erottuvat. Valitse yksi tai kaksi lisäriviä, jotka hyödyttävät eniten juuri siinä paikassa, johon juliste tulee.", kind: "tip", title: "Vähemmän tekstiä, helpompi skannata" },
      ],
    },
    {
      id: "koon-valinta",
      title: "QR-koodin tulostus A4-, A5- tai A6-kokoon tai tarraksi: valitse paikan mukaan",
      blocks: [
        { p: "Kohdassa ”Ulkoasu” on neljä tyyliä, ”Minimalistinen”, ”Ylellinen”, ”Pastelli” ja ”Sesonki”, sekä ”Pääväri”, jolla juliste sointuu salongin värimaailmaan. Sen jälkeen valitaan ”Koko”. Nämä koot ovat tarjolla, ja tässä on, mihin kukin sopii:" },
        {
          table: {
            head: ["Koko", "Mihin se sopii"],
            rows: [
              ["”A4 pysty” tai ”A5 pysty”", "Oveen"],
              ["”A6 (pöytä)”", "Pöydälle"],
              ["”Taitettava pöytäkyltti”", "Seisomaan tiskillä tai pöydällä"],
              ["”Pyöreä tarra 10 cm”", "Pienille pinnoille"],
              ["”Instagram 1080×1080” ja ”Story 1080×1920”", "Instagram-julkaisuihin"],
            ],
          },
        },
        { p: "Yhteen kokoon ei tarvitse sitoutua. Kun lasioven A4-juliste on valmis, vaihda kooksi A6 ja lataa toinen tiedosto kynsipöydälle. Tekstit ja tyyli pysyvät samoina, joten kaikki salongin tulosteet näyttävät samaan sarjaan kuuluvilta." },
        { img: { src: shot("lataa-pdf-tai-png"), alt: "Valmiin julisteen alla violetti Lataa PDF -painike ja Lataa PNG -painike sekä niiden alla työkalun kolme lyhyttä vaihetta", caption: "”Lataa PDF” antaa tulostettavan tiedoston, ”Lataa PNG” kuvan someen." } },
      ],
    },
    {
      id: "mihin-qr-koodi",
      title: "Mihin QR-koodi kannattaa salongissa sijoittaa",
      blocks: [
        { p: "Oppitunti mainitsee neljä paikkaa: lasiovi, kassa, kynsipöytä ja asiakkaan tuolin edessä oleva peili. Jokainen tavoittaa asiakkaan eri hetkellä:" },
        {
          table: {
            head: ["Paikka", "Milloin asiakas näkee sen"],
            rows: [
              ["Lasiovi", "Ohi kävellessä, myös sulkemisajan jälkeen"],
              ["Kassa", "Kun palvelu on valmis ja hän maksaa, helpoin hetki varata uudelleen"],
              ["Kynsipöytä", "Koko hoidon ajan, koodi on käden ulottuvilla"],
              ["Tuolin edessä oleva peili", "Kampaamokäynnin aikana, kun asiakas katsoo peiliin"],
            ],
          },
        },
        { p: "Jos QR-koodi vie VaraaAi-varaussivullesi, [Yleiskatsaus](lesson:tong-quan)-sivu laskee skannaukset viimeisen 30 päivän ajalta. Luku kertoo, käytetäänkö julistetta ja kannattaisiko se siirtää toiseen paikkaan." },
      ],
    },
    {
      id: "tarkistus-ennen-tulostusta",
      title: "Tarkista ennen tulostusta ja muutama tavallinen tilanne",
      blocks: [
        { p: "Ennen kuin tulostat monta kappaletta, skannaa koodi kerran puhelimellasi ja varmista, että se avaa oikean varaussivun. Yksi väärä merkki linkissä, ja koko paperipino menee roskiin." },
        { img: { src: shot("muokkaa-ja-esikatselu"), alt: "QR-julistetyökalu puhelimessa: ylhäällä Muokkaa- ja Esikatselu-painikkeet, alla Salongin tiedot -kohta ja salongin nimi", caption: "Puhelimessa työkalussa on kaksi painiketta: ”Muokkaa” tietojen kirjoittamiseen ja ”Esikatselu” julisteen katsomiseen." } },
        {
          table: {
            head: ["Tilanne", "Mitä teet"],
            rows: [
              ["Koodi avaa väärän sivun", "Tarkista linkki kohdassa ”QR-koodi ja varauslinkki”, korjaa se ja lataa juliste uudelleen"],
              ["Juliste ei näy puhelimessa", "Paina ylhäällä ”Esikatselu”"],
              ["Haluat julkaista julisteen somessa", "Valitse neliö- tai story-koko ja paina ”Lataa PNG”"],
              ["Olet kirjautunut salonkitilillä", "Valitse oma VaraaAi-varaussivusi, niin linkki täyttyy itsestään"],
            ],
          },
        },
        { p: "Jos salonki tarvitsee muitakin tulosteita QR-koodilla, katso ohje [monikielisestä hinnastosta](lesson:bang-gia). Sinne voit lisätä varauksen QR-koodin myös." },
      ],
    },
  ],
  howTo: {
    title: "Näin teet salongille QR-julisteen ajanvaraukseen",
    id: "qr-julisteen-vaiheet",
    after: "valmistelu",
    lead: "Kahdeksan vaihetta seuraavat työkalun osioiden järjestystä. Ne onnistuvat puhelimella tai tietokoneella.",
    steps: [
      {
        name: "Avaa julistetyökalu",
        text: "Avaa varaaai.com, vieritä sivun alaosaan ja napauta ”QR-ajanvarausjuliste” tai siirry suoraan [QR-julistetyökaluun](/tools/qr-poster). Työkalua voi käyttää heti ilman kirjautumista. Puhelimessa näet kaksi painiketta, ”Muokkaa” ja ”Esikatselu”.",
        image: { src: shot("qr-ajanvarausjuliste-alatunnisteessa"), alt: "VaraaAin etusivun alaosa puhelimessa, jossa Yritykset-ryhmän QR-ajanvarausjuliste-linkki on korostettu kultaisella" },
      },
      {
        name: "Kirjoita ”Salongin nimi” ja lataa logo",
        text: "Kirjoita kohdassa ”Salongin tiedot” salongin nimi ja lataa logo, jos sinulla on sellainen. Nimi näkyy julisteen otsikon yläpuolella, joten kirjoita se kuten kyltissä, niin asiakas tunnistaa salongin.",
        image: { src: shot("salongin-nimi-qr-julisteeseen"), alt: "Julistetyökalun Salongin tiedot -kohta, jossa Salongin nimi -kenttä on korostettu kultaisella ja alla on logon latauskenttä" },
      },
      {
        name: "Liitä linkki kohtaan ”QR-koodi ja varauslinkki”",
        text: "Liitä linkki, jonka asiakas avaa skannatessaan. Se voi olla oma linkki, kuten verkkosivu, Facebook tai Instagram. Jos olet kirjautunut VaraaAi-salonkitililläsi, valitse oma VaraaAi-varaussivusi, niin linkki täyttyy puolestasi.",
        image: { src: shot("liita-varauslinkki-qr-koodia-varten"), alt: "QR-koodi ja varauslinkki -kohta, jossa Oma linkki on valittuna ja salongin varaussivun osoitteen sisältävä kenttä on korostettu kultaisella" },
      },
      {
        name: "Valitse kielet ja otsikko",
        text: "Valitse kohdassa ”Julisteen tekstit” yhdestä kolmeen kieltä. Valitse sitten valmis ”Otsikko”, esimerkiksi ”Skannaa ja varaa” tai ”Varaa aika tästä”.",
        image: { src: shot("otsikko-skannaa-ja-varaa"), alt: "Otsikko-laatikko, jossa ehdotukset Skannaa ja varaa, Varaa seuraava käyntisi ja Varaa aika tästä, Skannaa ja varaa valittuna ja korostettuna kultaisella" },
      },
      {
        name: "Lisää lisärivit tarvittaessa",
        text: "Täytä ne lisärivit, jotka haluat julisteeseen: ”Tarjous”, ”Aukioloajat”, ”Puhelin”, ”Wi-Fi”. Ne ovat valinnaisia, joten täytä vain ne, joista on oikeasti hyötyä julisteen paikalla.",
        image: { src: shot("lisarivit-tarjous-aukioloajat-wifi"), alt: "Valinnaiset lisärivit Tarjous, Aukioloajat, Puhelin ja Wi-Fi korostettuna kultaisella, alla Ulkoasu-kohta" },
      },
      {
        name: "Valitse tyyli ja ”Pääväri”",
        text: "Valitse kohdassa ”Ulkoasu” yksi neljästä tyylistä: ”Minimalistinen”, ”Ylellinen”, ”Pastelli” tai ”Sesonki”. Valitse sitten ”Pääväri”, joka sopii salongin seiniin, tuoleihin tai logoon.",
        image: { src: shot("julisteen-tyyli"), alt: "Julisteen neljä tyyliä Minimalistinen, Ylellinen, Pastelli ja Sesonki korostettuna kultaisella, alla Pääväri-valikoima" },
      },
      {
        name: "Valitse koko",
        text: "Valitse koko käyttöpaikan mukaan: A4 tai A5 oveen, A6 pöydälle, taitettava pöytäkyltti, pyöreä tarra tai Instagramin neliö- ja story-koot.",
        image: { src: shot("julisteen-koko-a4-a5-a6-tarra-instagram"), alt: "Koko-vaihtoehdot A4 pysty, A5 pysty, A6 (pöytä), Taitettava pöytäkyltti, Pyöreä tarra 10 cm, Instagram ja Story korostettuna kultaisella" },
      },
      {
        name: "Paina ”Esikatselu” ja lataa",
        text: "Paina ”Esikatselu”, niin näet valmiin julisteen. Jos olet tyytyväinen, paina ”Lataa PDF” tulostusta varten tai ”Lataa PNG” someen. Skannaa koodi kerran puhelimellasi ennen kuin tulostat monta kappaletta.",
        image: { src: shot("skannaa-ja-varaa-julisteen-esikatselu"), alt: "Esikatselu-painike korostettuna kultaisella ja sen alla musta juliste, jossa salongin nimi, otsikko Skannaa ja varaa ja QR-koodi kultaisessa kehyksessä" },
      },
    ],
  },
  faq: [
    {
      q: "Onko VaraaAin QR-julistetyökalu ilmainen, ja pitääkö kirjautua?",
      a: "Työkalu on ilmainen, eikä kirjautumista tarvita. Se on avoin kaikille ja toimii heti. Salonkitili vain täyttää varauslinkin puolestasi, kun valitset oman VaraaAi-varaussivusi.",
    },
    {
      q: "Mihin julisteen QR-koodi vie?",
      a: "Juuri siihen linkkiin, jonka liität kohtaan ”QR-koodi ja varauslinkki”. Se voi olla salongin varaussivu tai oma linkki, kuten verkkosivu, Facebook tai Instagram.",
    },
    {
      q: "Kannattaako juliste ladata PDF- vai PNG-muodossa?",
      a: "Paina ”Lataa PDF”, kun tulostat, ja ”Lataa PNG”, kun julkaiset somessa. Samasta julisteesta voi ladata molemmat.",
    },
    {
      q: "Mihin QR-juliste kannattaa salongissa laittaa?",
      a: "Neljä toimivaa paikkaa ovat lasiovi, kassa, kynsipöytä ja asiakkaan tuolin edessä oleva peili. Niissä asiakas näkee koodin ohi kävellessään, maksaessaan ja hoidon aikana.",
    },
    {
      q: "Voiko QR-julisteessa olla useampi kieli?",
      a: "Voi. Valitset yhdestä kolmeen kieltä, ja ne näkyvät julisteessa rinnakkain. Tämä sopii salongille, jonka asiakkaat puhuvat eri kieliä.",
    },
    {
      q: "Mistä näen, montako kertaa QR-koodia on skannattu?",
      a: "Jos QR-koodi vie VaraaAi-varaussivullesi, hallintapaneelin Yleiskatsaus-sivu laskee skannaukset viimeisen 30 päivän ajalta.",
    },
    {
      q: "Mitä pitää tehdä ennen kuin tulostan monta kappaletta?",
      a: "Skannaa koodi kerran puhelimellasi ja varmista, että se avaa oikean varaussivun. Jos sivu on väärä, korjaa linkki työkalussa ja lataa juliste uudelleen.",
    },
  ],
  related: ["chia-se-link", "bang-gia", "website-salon", "tong-quan"],
};

export default article;
