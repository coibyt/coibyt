import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/dang-ky-salon/${name}.webp`;
const shot = (name: string) => `/wiki/dang-ky-salon/fi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "ilmainen-ajanvarausjarjestelma-salongille",
  lesson: "dang-ky-salon",
  category: "salon",
  title: "Ilmainen ajanvarausjärjestelmä salongille: näin rekisteröit ja aktivoit salongin VaraaAissa",
  metaTitle: "Ilmainen ajanvarausjärjestelmä salongille minuuteissa",
  metaDescription:
    "Näin kynsistudio, kampaamo, ripsistudio tai kauneushoitola rekisteröityy VaraaAihin: luo tili, täytä salongin tiedot, valitse maa ja vahvista sähköposti.",
  keyword: "ilmainen ajanvarausjärjestelmä",
  keywords: [
    "salongin rekisteröinti VaraaAihin",
    "nettiajanvaraus kynsistudiolle",
    "kampaamon ajanvaraus ilman kuukausimaksua",
    "ajanvarausjärjestelmä kauneushoitolaan",
    "tarvitaanko salongin rekisteröinnille hyväksyntä",
    "oma ajanvaraussivu salongille",
  ],
  excerpt: "Luo tili, täytä salongin tiedot, valitse oikea maa ja vahvista sähköpostisi. Salonki on heti käytössä ilman tarkistusta ja maksutta.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("salon-lam-dep-dong-khach-nhan-dat-lich-online"),
    alt: "Tyylikäs kampaamo korkeine kaari-ikkunoineen, jossa useat kampaajat laittavat violeteissa tuoleissa istuvien asiakkaiden hiuksia",
  },
  takeaways: [
    "Salongin rekisteröinti VaraaAihin on **maksutonta** ja vie muutaman minuutin. Sen voi tehdä puhelimella.",
    "Paina VaraaAin lähettämässä viestissä **”Vahvista sähköposti”**, niin salonki on heti käytössä. Kenenkään ei tarvitse hyväksyä sitä.",
    "Kenttä **”Maa”** määrää kalenterisi aikavyöhykkeen, joten valitse maa, jossa salonki todella toimii.",
    "Vahvistusviestiä ei näy? Katso roskaposti- tai mainoskansio ennen kuin teet mitään muuta.",
    "Aktivoinnin jälkeen paina ”Siirry hallintapaneeliin” ja lisää palvelut, työntekijät ja aukioloajat.",
  ],
  intro: [
    "Ilmaista ajanvarausjärjestelmää aletaan yleensä etsiä sinä päivänä, kun puhelin soi kesken geelilakkauksen ja kyselyt vapaista ajoista tulevat keskiyöllä. Kun salongilla on oma ajanvaraussivu, asiakas valitsee palvelun ja vapaan ajan itse mihin vuorokaudenaikaan tahansa, eikä siitä mene kuukausimaksua.",
    "Tämä artikkeli seuraa VaraaAi Academyn oppituntia ”Rekisteröi ja aktivoi salonki”. Luettuasi tiedät, mitä kannattaa pitää valmiina ennen lomakkeen avaamista, osaat täyttää jokaisen kentän ja ymmärrät, miksi pieni valinta kuten ”Maa” vaikuttaa jokaiseen tulevaan varaukseen.",
  ],
  sections: [
    {
      id: "miksi-nettiajanvaraus",
      title: "Miksi kynsistudio, kampaamo, ripsistudio tai kauneushoitola tarvitsee nettiajanvarauksen",
      blocks: [
        { p: "Moni asiakas ehtii miettiä kynsiä tai hiuksia vasta illalla, kun salonki on jo kiinni. Jos ajan saa vain soittamalla, hänen pitää muistaa soittaa seuraavana aamuna, ja moni unohtaa. Ajanvaraussivulla asiakas varaa paikan heti, kun asia tulee mieleen." },
        { p: "Salongille jokainen ”onko huomenna tilaa” -puhelu tarkoittaa, että tekijä keskeyttää työn, riisuu käsineet ja avaa kalenterin. Ajanvaraussivu vastaa puolestasi: asiakas näkee palvelut, hinnat ja todella vapaat ajat ja valitsee itse. Koko varauksen asiakkaan näkökulmasta voit käydä läpi ohjeessa [ajanvaraus netissä](lesson:dat-lich-online)." },
        { p: "Sivusta on hyötyä myös silloin, kun asiakkaalla ja salongilla ei ole samaa äidinkieltä. Asiakas lukee palvelujen nimet ja valitsee päivän ja kellonajan näytöltä, joten harvempi varaus jää vieraalla kielellä käydyn puhelun varaan." },
        { p: "VaraaAi on maksuton salonkiyrittäjille ja varaaville asiakkaille. Rekisteröinnissä ei ole tarkistusvaihetta: täytät tiedot, vahvistat sähköpostin ja salonki on käytössä." },
      ],
    },
    {
      id: "mita-valmiiksi",
      title: "Mitä kannattaa pitää valmiina ennen salongin rekisteröintiä",
      blocks: [
        { p: "Rekisteröintisivulla on kaksi osaa: oma tilisi ja salongin tiedot. Jotta täytät sen yhdellä kertaa etsimättä tietoja, pidä nämä valmiina:" },
        {
          ul: [
            "**Sähköpostiosoite, jonka voit avata heti.** Vahvistusviesti lähetetään sinne, ja salonki aktivoituu vasta, kun painat viestin painiketta.",
            "**Yrityksen nimi** kirjoitettuna täsmälleen kuten kyltissä, jotta asiakas löytää oikean salongin netistä nähtyään nimen ovessa.",
            "**Muutama rivi esittelyä:** mitä salonki tekee ja miksi asiakkaat palaavat.",
            "**Koko osoite**, kaupunki ja maa, jossa salonki toimii.",
            "**Salongin puhelinnumero**, josta asiakas tavoittaa teidät aukioloaikana.",
            "**Pääasiallinen palvelukategoria**, esimerkiksi kynnet, hiukset tai kylpylä.",
          ],
        },
        { note: "Kirjoita esittely ensin muistiinpanosovellukseen ja liitä se lomakkeelle. [Salongin profiilia](lesson:ho-so-salon) käsittelevä oppitunti suosittelee vähintään 80 merkin pituutta, joten huolellisesti kerralla kirjoitettu teksti säästää myöhemmältä muokkaukselta.", kind: "tip", title: "Pieni vinkki" },
      ],
    },
    {
      id: "maa-ja-aikavyohyke",
      title: "Kenttä ”Maa” ja kalenterin aikavyöhyke",
      blocks: [
        { p: "Koko sivulla tämä on kenttä, joka valitaan useimmin kiireessä. VaraaAi asettaa valitsemasi maan perusteella salongin aikavyöhykkeen, ja jokainen varausaika näytetään sen mukaan. Väärä maa, ja kalenterin kellonajat eivät enää vastaa salongin seinäkelloa." },
        { p: "Jos asut yhdessä maassa ja salonkisi on toisessa, valitse maa, jossa salonki on auki. Varaajat asuvat salongin lähellä, ja heidän näkemiensä aikojen on oltava paikallista aikaa." },
        { note: "Kentän ”Maa” alla oleva pieni teksti kertoo, että se ”Määrittää salongin aikavyöhykkeen” ja että sitä voi muuttaa myöhemmin asetuksista. Valitse silti oikein heti alussa, ennen ensimmäistä varausta.", kind: "info", title: "Valitsitko väärin?" },
      ],
    },
    {
      id: "aktivoinnin-jalkeen",
      title: "Aktivoinnin jälkeen: seuraavat työt hallintapaneelissa",
      blocks: [
        { p: "”Siirry hallintapaneeliin” vie paikkaan, josta salonkia johdetaan. Salonki on nyt käytössä, mutta sivu on vielä tyhjä: ei palveluita, joita valita, ei tekijöitä eikä aukioloaikoja. Akatemian ensimmäisen kurssin seuraavat oppitunnit käyvät jokaisen osan läpi tässä järjestyksessä:" },
        {
          ol: [
            "[Viimeistele salongin profiili](lesson:ho-so-salon): logo, kansikuva ja yhteystiedot.",
            "[Lisää palvelut ja hinnat](lesson:dich-vu): jokaisen palvelun nimi, kesto ja hinta.",
            "[Lisää työntekijät](lesson:nhan-vien) ja valitse, mitä palveluita kukin tekee.",
            "[Aseta aukioloajat ja vapaapäivät](lesson:gio-mo-cua), koska asiakas voi varata vain aukioloaikana.",
            "[Määritä peruutusehdot ja maksutavat](lesson:thanh-toan-chinh-sach).",
          ],
        },
        { img: { src: img("le-tan-don-khach-tai-quay-salon"), alt: "Luumunväriseen pukuun pukeutunut vastaanottovirkailija tervehtii vaaleaan trenssitakkiin pukeutunutta naista salongin marmoritiskillä, taustalla odottaa asiakkaita", caption: "Kun palvelut, työntekijät ja aukioloajat ovat paikallaan, netissä varanneet asiakkaat saapuvat ajallaan kuten muutkin." } },
        { p: "Kun nämä viisi työtä on tehty, voit [jakaa varauslinkin](lesson:chia-se-link) Facebookissa ja Instagramissa tai lähettää sen suoraan vakioasiakkaille." },
      ],
    },
    {
      id: "tavallisia-tilanteita",
      title: "Tavallisia tilanteita salongin rekisteröinnissä",
      blocks: [
        {
          table: {
            head: ["Tilanne", "Mitä teet"],
            rows: [
              ["Lähetit lomakkeen, mutta sähköpostia ei kuulu", "Katso roskaposti- tai mainoskansio. Vahvistusviesti päätyy joskus sinne"],
              ["Sinulla on jo VaraaAi-tili asiakkaana tehdyistä varauksista", "Paina lomakkeen lopussa rivillä ”Onko sinulla jo tili?” linkkiä ”Kirjaudu sisään” uuden tilin luomisen sijaan"],
              ["Salonki tekee monenlaisia palveluita", "Valitse kohdassa ”Palvelukategoria” salongin pääasiallinen palvelu"],
              ["Hyvää esittelyä ei vielä ole", "Kirjoita muutama rehellinen rivi salongista. Voit muokata niitä, kun viimeistelet profiilin"],
              ["Et ole varma, onko maa oikein", "Tarkista se ennen kuin painat ”Lähetä hakemus”, koska maa määrää kalenterin aikavyöhykkeen"],
            ],
          },
        },
        { p: "Jos jäät jumiin jossain vaiheessa, avaa sivu [VaraaAi salongeille](/business) ja lue esittely uudelleen tai lähetä kysymyksesi [tukisivun](/support) kautta." },
      ],
    },
  ],
  howTo: {
    title: "Salongin rekisteröinti ilmaiseen ajanvarausjärjestelmään vaihe vaiheelta",
    id: "rekisteroinnin-vaiheet",
    after: "mita-valmiiksi",
    lead: "Seitsemän vaihetta seuraavat oppituntivideon näkymiä järjestyksessä. Lainausmerkeissä olevat nimet ovat sanoja, jotka näet sivulla.",
    steps: [
      {
        name: "Avaa varaaai.com ja paina salonkiyrittäjien riviä",
        text: "Etsi [varaaai.comin](/) etusivulta rivi ”Omistatko salongin? Tuo se VaraaAihin ilmaiseksi” ja paina sitä. Se on ”Lataa sovellus” -painikkeen ja ”Selaa kategorioittain” -osion yläpuolella.",
        image: { src: shot("omistatko-salongin-linkki-etusivulla"), alt: "VaraaAin etusivu tabletilla, jossa rivi Omistatko salongin? Tuo se VaraaAihin ilmaiseksi on korostettu kultaisella kehyksellä" },
      },
      {
        name: "Paina ”Rekisteröi salonki ilmaiseksi”",
        text: "Salonkiyrittäjien sivu aukeaa. Paina oranssia painiketta ”Rekisteröi salonki ilmaiseksi”, niin pääset rekisteröintilomakkeelle. Painikkeen alla lukee ”Ei luottokorttia”.",
        image: { src: shot("rekisteroi-salonki-ilmaiseksi-painike"), alt: "VaraaAin salonkiyrittäjien sivu, jossa oranssi Rekisteröi salonki ilmaiseksi -painike on korostettu ja alla lukee Ei luottokorttia" },
      },
      {
        name: "Luo tilisi",
        text: "Jos sinulla ei vielä ole tiliä, sivu alkaa kohdasta ”Luo tilisi”. Kirjoita ”Koko nimi”, ”Sähköposti”, ”Salasana” ja ”Vahvista salasana”. Käytä sähköpostia, jonka saat auki puhelimella heti, sillä viimeinen vaihe tarvitsee sitä. Tällä tilillä kirjaudut salongin omistajana, ja se on samalla oma VaraaAi-asiakastilisi.",
        image: { src: shot("luo-tilisi-lomake-salongin-omistaja"), alt: "Luo tilisi -lomake, jossa kentät Koko nimi, Sähköposti, Salasana ja Vahvista salasana on korostettu kultaisella kehyksellä" },
      },
      {
        name: "Kirjoita salongin nimi, kuvaus ja kategoria",
        text: "Vieritä alas salongin tietoihin. Kirjoita ”Yrityksen nimi”, muutama rivi kenttään ”Lyhyt kuvaus” ja valitse ”Palvelukategoria”, esimerkiksi kynnet, hiukset tai kylpylä. Yrityksen nimi näkyy asiakkaille, joten kirjoita se täsmälleen kuten kyltissä.",
        image: { src: shot("yrityksen-nimi-lyhyt-kuvaus-palvelukategoria"), alt: "Lomakkeen salonkiosa, jossa Yrityksen nimi -kenttä on korostettu ja sen alla ovat Lyhyt kuvaus ja Palvelukategoria" },
      },
      {
        name: "Anna osoite, maa, kaupunki ja puhelinnumero",
        text: "Täytä ”Osoite”, valitse ”Maa” ja kirjoita ”Kaupunki” ja ”Puhelinnumero”. Pysähdy hetkeksi kohtaan ”Maa”: se määrää kalenterisi aikavyöhykkeen, joten sen on oltava maa, jossa salonki toimii.",
        image: { src: shot("osoite-maa-ja-kaupunki-salonki"), alt: "Osoite-kenttä korostettuna, sen alla Maa ja teksti salongin aikavyöhykkeestä sekä Kaupunki- ja Puhelinnumero-kentät" },
      },
      {
        name: "Tarkista kaikki ja paina ”Lähetä hakemus”",
        text: "Lue lomake kerran ylhäältä alas, ennen kaikkea sähköpostiosoite ja maa. Kun kaikki on oikein, paina sivun alareunan mustaa ”Lähetä hakemus” -painiketta.",
        image: { src: shot("laheta-hakemus-painike"), alt: "Rekisteröintilomakkeen loppu, jossa ovat Kaupunki- ja Puhelinnumero-kentät sekä kultaisella korostettu musta Lähetä hakemus -painike" },
      },
      {
        name: "Vahvista sähköposti ja avaa hallintapaneeli",
        text: "VaraaAi lähettää sinulle sähköpostin. Avaa se ja paina ”Vahvista sähköposti”, niin salonki aktivoituu heti. Jos viestiä ei näy, katso roskaposti- tai mainoskansio. Paina sitten ”Siirry hallintapaneeliin” ja aloita palveluiden, työntekijöiden ja aukioloaikojen lisääminen.",
        image: { src: shot("vahvista-sahkoposti-salonki-aktivoituu"), alt: "Kiharatukkainen nainen hymyilee puhelimelleen sohvalla, ja vieressä kultainen merkki kertoo sähköpostin olevan vahvistettu" },
      },
    ],
  },
  faq: [
    {
      q: "Maksaako salongin rekisteröinti VaraaAihin jotain?",
      a: "Ei maksa. VaraaAi on maksuton salonkiyrittäjille ja varaaville asiakkaille, eikä kuukausimaksua ole. Salonkiyrittäjien sivulla kerrotaan myös, että rekisteröintiin ei tarvita luottokorttia.",
    },
    {
      q: "Kuinka nopeasti salonki on käytössä lomakkeen lähettämisen jälkeen?",
      a: "Heti kun painat VaraaAin lähettämässä viestissä ”Vahvista sähköposti”. Monen päivän tarkistusta ei ole, joten voit rekisteröityä ja alkaa lisätä palveluita samalla istumalla.",
    },
    {
      q: "Mitä teen, jos vahvistusviestiä ei tule?",
      a: "Katso ensin sähköpostisi roskaposti- tai mainoskansio, sillä viesti päätyy joskus sinne. Uudelleen rekisteröityminen alusta ei ole tarpeen vain siksi, ettei viestiä näy saapuneissa.",
    },
    {
      q: "Miksi maa pitää valita oikein rekisteröinnissä?",
      a: "Maa määrää kalenterisi aikavyöhykkeen, ja varausajat näytetään sen mukaan. Valitse maa, jossa salonki on auki, niin kalenteri vastaa salongin todellista kellonaikaa.",
    },
    {
      q: "Minulla on jo VaraaAi-asiakastili. Tarvitsenko uuden?",
      a: "Et tarvitse. ”Luo tilisi” on niille, joilla tiliä ei vielä ole. Jos sinulla on tili, paina rekisteröintisivun lopussa ”Kirjaudu sisään”. Sama tili toimii sekä salongin omistajana että asiakkaana.",
    },
    {
      q: "Voivatko asiakkaat varata heti rekisteröinnin jälkeen?",
      a: "Salonki on käytössä, kun sähköposti on vahvistettu, mutta asiakkaat tarvitsevat palveluita valittavaksi ja voivat varata vain aukioloaikana. Lisää siis hallintapaneelissa palvelut, työntekijät ja aukioloajat ennen kuin lähetät linkin asiakkaille.",
    },
  ],
  related: ["ho-so-salon", "dich-vu", "nhan-vien", "gio-mo-cua"],
};

export default article;
