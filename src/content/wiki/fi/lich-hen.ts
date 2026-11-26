import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/lich-hen/${name}.webp`;
const shot = (name: string) => `/wiki/lich-hen/fi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "kampaamon-ajanvarausohjelma-kalenteri",
  lesson: "lich-hen",
  category: "salon",
  title: "Kampaamon ajanvarausohjelma: katso varaukset tekijöittäin, lisää puhelinvaraus ja siirrä aika",
  metaTitle: "Kampaamon ajanvarausohjelma: katso, lisää ja siirrä varaukset",
  metaDescription:
    "Näin käytät VaraaAin Varaukset-sivua kampaamossa, kynsistudiossa tai hoitolassa: sarake tekijää kohti, päivä-, viikko- ja kuukausinäkymä, puhelinvaraus ja siirto.",
  keyword: "kampaamon ajanvarausohjelma",
  keywords: [
    "kauneushoitolan ajanvarauskalenteri",
    "kynsistudion ajanvaraus",
    "varauksen lisääminen puhelimessa soittaneelle",
    "varaukset työntekijöittäin",
    "asiakkaan ajan siirtäminen",
    "asiakas ei saapunut",
    "salongin kalenteri puhelimessa",
  ],
  excerpt: "Sarake jokaiselle työntekijälle ja lohko jokaiselle varaukselle. Pidä tyhjää kohtaa painettuna lisätäksesi varauksen, napauta päivittääksesi ja vedä siirtääksesi.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("salon-toc-co-dien-tho-dang-lam-toc-cho-khach"),
    alt: "Klassisessa salongissa, jossa on kullatut peilit ja kristallikruunu, kampaaja kampaa violetissa samettituolissa istuvan vaaleahiuksisen asiakkaan hiuksia",
  },
  takeaways: [
    "**”Varaukset”**-sivulla jokaisella työntekijällä on sarake ja jokaisella varauksella lohko, joten näet koko päivän yhdellä silmäyksellä.",
    "Lohko, jossa on **maapallo**, on asiakkaan itse verkossa tekemä varaus. Muut on lisännyt salonki.",
    "Kun asiakas soittaa tai tulee suoraan ovesta, **pidä tyhjää kohtaa painettuna noin sekunnin**, oikeaan aikaan ja oikean työntekijän sarakkeessa.",
    "Napauta varausta päivittääksesi sen: ”Maksu kassalla”, ”Valmis”, ”Ei saapunut” tai ”Peruuta”.",
    "Siirrä varaus **vetämällä sen lohko** uuteen aikaan. Järjestelmä pyytää vahvistuksen ennen siirtoa.",
  ],
  intro: [
    "Kampaamon ajanvarausohjelma on hyödyllinen vain, jos se vastaa kolmeen kysymykseen heti, kun puhelin soi: kuka tekee kenelle tänään, mitkä ajat ovat vapaana ja mihin soittaja kannattaa laittaa. Paperinen kalenteri pärjää yhden tekijän salongissa. Kun mukaan tulee toinen ja kolmas tekijä ja asiakkaat varaavat verkossa keskellä yötä, kalenteriin alkaa kertyä yliviivauksia ja päällekkäisiä varauksia.",
    "Tämä artikkeli seuraa VaraaAi Academyn oppituntia ”Kalenteri: katso, lisää ja päivitä varauksia”. Opit lukemaan Varaukset-sivua, lisäämään soittaneelle asiakkaalle varauksen puhelimellasi, päivittämään tilan jokaisen asiakkaan jälkeen ja siirtämään varauksen toiseen aikaan.",
  ],
  sections: [
    {
      id: "kalenterin-lukeminen",
      title: "Varaukset työntekijöittäin: mitä Varaukset-sivu näyttää",
      blocks: [
        { p: "”Varaukset”-sivulla omistaja ja tiimi tekevät töitä joka päivä. Sarakkeet ovat työntekijöitä, rivit tunteja, ja jokainen varaus on lohko niiden risteyksessä. Lohkossa näkyvät alkamis- ja päättymisaika, asiakkaan nimi ja palvelu." },
        { img: { src: shot("varaukset-sarake-tyontekijaa-kohti"), alt: "Varaukset-sivu puhelimessa: sarakkeet Emmalle, Sofialle ja Léalle, varauslohkot aikoineen ja nimineen sekä ylhäällä kultaisella korostetut laskurit", caption: "Kolme laskuria ylhäällä: päivän varaukset, valmiit ja arvioitu myynti." } },
        {
          table: {
            head: ["Osa", "Merkitys"],
            rows: [
              ["Kolme laskuria ylhäällä", "Päivän varausten määrä, valmiiden määrä ja arvioitu myynti"],
              ["Lohko, jossa on maapallo", "Asiakas varasi verkossa"],
              ["Lohko ilman maapalloa", "Salonki lisäsi varauksen"],
              ["Työntekijöiden nimet ylhäällä", "Napauta nimeä piilottaaksesi tai näyttääksesi sarakkeen, ”Piilota kaikki” piilottaa kaikki"],
              ["Alareunan palkki", "Nuolet vaihtavat päivää, päivämäärästä valitset minkä tahansa päivän, ja näkymät ovat ”Päivä”, ”Viikko” ja ”Kuukausi”"],
            ],
          },
        },
        { img: { src: shot("piilota-tyontekijan-sarake"), alt: "Kalenterin yläpuolella oleva painikerivi Piilota kaikki, Emma, Sofia ja Léa korostettuna kultaisella, alla laskurit ja päivän kolme saraketta", caption: "Napauta työntekijän nimeä piilottaaksesi tai näyttääksesi hänen sarakkeensa." } },
        { p: "Kalenterin yläpuolella pieni rivi kertoo, että kalenteri näytetään salongin ajassa, ja näyttää aikavyöhykkeen ja oman kellonaikasi. Aikavyöhyke määräytyy maasta, jonka valitsit [salongin rekisteröinnissä](lesson:dang-ky-salon), joten matkoilla oleva omistaja näkee kalenterin silti salongin ajassa." },
        { p: "Kahdella varaustyypillä on myös eri värit, joten näet nopeasti, mitkä varaukset asiakkaat ovat tehneet itse. Voit valita kummankin värin itse, katso ohje [varausten väreistä](lesson:mau-lich-hen)." },
      ],
    },
    {
      id: "paiva-viikko-kuukausi",
      title: "Päivä-, viikko- vai kuukausinäkymä: milloin mitäkin",
      blocks: [
        { p: "Alapalkin kolme näkymää vastaavat kolmeen eri kysymykseen. Näin ne sopivat tavalliseen työviikkoon:" },
        {
          table: {
            head: ["Näkymä", "Mitä näet", "Mihin se sopii"],
            rows: [
              ["”Päivä”", "Sarake jokaiselle työntekijälle, varaukset tunneittain", "Päivän työt ja soittaneiden asiakkaiden sijoittaminen vapaisiin aikoihin"],
              ["”Viikko”", "Sarake jokaiselle päivälle ja koko viikon varaukset", "Kiireisten ja hiljaisten päivien näkeminen työvuoroja suunnitellessa"],
              ["”Kuukausi”", "Koko kuukausi ja jokaisen päivän varausmäärä", "Pidemmälle katsominen ja vapaan päivän löytäminen kauas eteenpäin varaavalle"],
            ],
          },
        },
        { img: { src: shot("varausten-viikkonakyma"), alt: "Varaukset-sivu viikkonäkymässä: sarakkeet maanantaille, tiistaille ja keskiviikolle, violetit varauslohkot ja vihreä verkkovarauksen lohko maapallolla" } },
        { img: { src: shot("varausten-kuukausinakyma"), alt: "Varaukset-sivu kuukausinäkymässä: kuukauden päivät viikoittain ja pienet merkinnät päivien alla, joilla on varauksia", caption: "Kuukausinäkymässä jokaisen päivän kohdalla näkyy sen varausten määrä." } },
        { note: "Isommalla tiimillä päivänäkymä käy puhelimessa ahtaaksi. Napauta niiden nimiä, jotka eivät ole tänään töissä, niin heidän sarakkeensa piiloutuvat ja näytöllä ovat vain ne, joilla on asiakkaita.", kind: "tip", title: "Piilota sarakkeita, niin näet enemmän" },
      ],
    },
    {
      id: "puhelinvaraus",
      title: "Varauksen lisääminen soittaneelle tai suoraan ovesta tulleelle asiakkaalle",
      blocks: [
        { p: "Verkkovaraukset ilmestyvät sivulle itsestään. Jokaisessa salongissa on silti asiakkaita, jotka soittavat, ja niitä, jotka tulevat suoraan kadulta. Heille lisäät varauksen itse, jotta kukaan muu ei voi varata samaa aikaa." },
        { p: "Pidä kalenterin tyhjää kohtaa painettuna noin sekunnin ajan. Lomake ”Varaa asiakkaalle” aukeaa siihen aikaan ja sen työntekijän sarakkeeseen, jota painoit, joten päivää ja kellonaikaa ei tarvitse valita uudelleen. Lomakkeessa ovat nämä kentät:" },
        {
          table: {
            head: ["Kenttä", "Huomio"],
            rows: [
              ["”Palvelu”", "Valitaan salongin palveluvalikosta. Palvelun hinta näkyy heti alla"],
              ["”Asiakkaan nimi”", "Nimi, jolla tekijä kutsuu asiakkaan, kun hän saapuu"],
              ["”Puhelinnumero”", "Jotta salonki tavoittaa asiakkaan, jos jokin muuttuu"],
              ["Sähköposti", "Valinnainen. Tarvitaan, jos haluat lähettää vahvistusviestin"],
              ["”Muistiinpano”", "Valinnainen"],
            ],
          },
        },
        { img: { src: shot("varaa-asiakkaalle-lomake"), alt: "Varaa asiakkaalle -lomake, jossa ovat Palvelu ja Palvelun hinta, kultaisella korostettu Asiakkaan nimi -kenttä sekä alla puhelinnumero, sähköposti ja muistiinpano" } },
        { p: "Jos haluat asiakkaan saavan vahvistuksen ja muistutuksen, kirjoita hänen sähköpostiosoitteensa ja rastita ”Lähetä asiakkaalle vahvistus- ja muistutussähköpostit”. Puhelimessa varanneella asiakkaalla ei ole mitään, mistä tarkistaa aika, ja vahvistusviesti paikkaa sen." },
        { img: { src: shot("laheta-vahvistus-ja-muistutussahkopostit"), alt: "Varaa asiakkaalle -lomakkeen loppu, jossa vahvistus- ja muistutussähköpostien ruutu on korostettu kultaisella ja alla ovat Varaa- ja Peruuta-painikkeet" } },
      ],
    },
    {
      id: "tilan-paivittaminen",
      title: "Tilan päivittäminen: valmis, ei saapunut, peruttu",
      blocks: [
        { p: "Napauta varausta, niin sen tiedot aukeavat: palvelu, aika, tekijä ja perittävä summa. Pieni rivi kertoo, milloin varaus tehtiin: ”Asiakas varasi verkossa …” tai ”Salonki lisäsi …”." },
        { img: { src: shot("salonki-lisasi-varauksen"), alt: "70,00 euron Relax massage -varauksen tiedot, joissa rivi Salonki lisäsi 16.11.2026 klo 09.53 on korostettu kultaisella, alla Yhteensä (perittävä)", caption: "Rivi ”Salonki lisäsi …” kertoo, että salonki kirjasi varauksen, ja milloin." } },
        { p: "Vahvistetun varauksen tiedoissa on neljä painiketta. Paina oikeaa jokaisen asiakkaan jälkeen, niin sivun yläreunan valmiiden laskuri on päivän päätteeksi oikein:" },
        {
          table: {
            head: ["Painike", "Milloin painat"],
            rows: [
              ["”Maksu kassalla”", "Asiakas on palveltu ja tulee kassalle maksamaan"],
              ["”Valmis”", "Asiakas tuli ja palvelu on tehty, ja merkitset varauksen valmiiksi"],
              ["”Ei saapunut”", "Asiakas ei tullut. Tieto tallentuu, joten näet, ketkä jättävät aikoja väliin"],
              ["”Peruuta”", "Varaus ei enää toteudu"],
            ],
          },
        },
        { p: "Kun asiakas on palveltu ja painat ”Maksu kassalla” tai ”Valmis”, varauksen tilaksi tulee ”Suoritettu”. Älä poista tai jätä huomiotta käyttämättä jäänyttä aikaa. Paina ”Ei saapunut”, niin siitä jää merkintä. Muutaman kerran jälkeen sinulla on konkreettinen peruste ottaa asia puheeksi asiakkaan kanssa ja syy tarkistaa [salongin peruutusehdot](lesson:thanh-toan-chinh-sach)." },
        { p: "”Maksu kassalla” avaa maksun ja laskutuksen, joista kerrotaan ohjeessa [maksu ja lasku kassalla](lesson:thanh-toan-hoa-don). Tiedoissa on myös ”Raportoi tulot” -painike, johon työntekijä kirjaa perimänsä summan, katso ohje [työntekijän tuloraportista](lesson:doanh-thu-nhan-vien)." },
      ],
    },
    {
      id: "siirto-ja-tilanteet",
      title: "Asiakkaan ajan siirtäminen ja muita arjen tilanteita",
      blocks: [
        { p: "Asiakas pyytää uutta aikaa joka päivä. Varausta ei tarvitse perua ja luoda uudelleen. Vedä varauksen lohko uuteen aikaan, järjestelmä kysyy ”Siirretäänkö varaus?”, ja sinä vahvistat. Kysymys suojaa vahingossa vedetyltä lohkolta puhelimen näytöllä." },
        { img: { src: shot("veda-varaus-uuteen-aikaan"), alt: "Päivän kalenteri, jossa Anna Müllerin Classic lashes -lohko klo 13.15–14.45 keskimmäisessä sarakkeessa on korostettu kultaisella valmiina vedettäväksi toiseen aikaan" } },
        {
          table: {
            head: ["Tilanne", "Mitä teet"],
            rows: [
              ["Asiakas soittaa varatakseen, kun kätesi ovat kiinni työssä", "Pidä tyhjää kohtaa oikeassa ajassa ja tekijän sarakkeessa painettuna noin sekunti, kirjoita nimi ja puhelinnumero ja paina ”Varaa”"],
              ["Asiakas pyytää siirtoa tuntia myöhemmäksi", "Vedä varauksen lohko uuteen aikaan ja vahvista, kun järjestelmä kysyy"],
              ["Aika on mennyt eikä asiakas ole tullut", "Avaa varaus ja paina ”Ei saapunut”"],
              ["Haluat tietää, tekikö varauksen asiakas vai salonki", "Katso, onko lohkossa maapallo, tai avaa tiedot ja lue ”Asiakas varasi verkossa …” tai ”Salonki lisäsi …”"],
              ["Haluat nähdä toisen päivän", "Käytä alapalkin nuolia tai napauta päivämäärää ja valitse mikä tahansa päivä"],
            ],
          },
        },
        { p: "Varaukset-sivu täyttyy vain, kun asiakkailla on tapa varata. Jos suurin osa salongin varauksista on yhä salongin lisäämiä, vie [nettiajanvarauksen linkki](lesson:chia-se-link) useampaan paikkaan, niin asiakkaat varaavat itse ja sinä vastaat puhelimeen harvemmin." },
      ],
    },
  ],
  howTo: {
    title: "Varaukset-sivu kampaamon ajanvarausohjelmana vaihe vaiheelta",
    id: "varaukset-sivun-vaiheet",
    after: "kalenterin-lukeminen",
    lead: "Kuusi vaihetta seuraavat oppituntivideota kalenterin katsomisesta varausten lisäämiseen, päivittämiseen ja siirtämiseen. Kaikki onnistuu puhelimella.",
    steps: [
      {
        name: "Avaa ”Varaukset”",
        text: "Napauta hallintapaneelissa ”Varaukset”. Jokaisella työntekijällä on sarake ja jokainen varaus on lohko. Ylhäällä näet päivän varaukset, valmiiden määrän ja arvioidun myynnin.",
      },
      {
        name: "Erota verkkovaraukset salongin varauksista",
        text: "Lohko, jossa on maapallo, on asiakkaan itse verkossa tekemä varaus, muut on lisännyt salonki. Napauta ylhäällä työntekijän nimeä piilottaaksesi tai näyttääksesi hänen sarakkeensa, kun haluat selkeämmän näkymän.",
        image: { src: shot("verkkovaraus-maapallo"), alt: "Päivän kalenteri, jossa vihreä lohko klo 15.00–16.15 maapallokuvakkeineen on korostettu kultaisella, violetit lohkot ovat salongin lisäämiä" },
      },
      {
        name: "Vaihda päivää ja näkymää alapalkista",
        text: "Napauta alapalkin nuolia siirtyäksesi toiseen päivään tai napauta päivämäärää valitaksesi minkä tahansa päivän. Oikealla ovat kolme näkymää: ”Päivä”, ”Viikko” ja ”Kuukausi”.",
        image: { src: shot("alapalkki-paiva-viikko-kuukausi"), alt: "Varaukset-sivun alapalkki, jossa päivänuolet, päivämäärä ja painikkeet Päivä, Viikko ja Kuukausi on korostettu kultaisella" },
      },
      {
        name: "Lisää varaus pitämällä tyhjää kohtaa painettuna",
        text: "Pidä tyhjää kohtaa painettuna noin sekunnin, oikeassa ajassa ja oikean työntekijän sarakkeessa. Valitse lomakkeessa ”Varaa asiakkaalle” ”Palvelu” ja kirjoita ”Asiakkaan nimi” ja ”Puhelinnumero”. Jos haluat lähettää vahvistuksen, lisää sähköposti ja rastita alla oleva ruutu, ja paina lopuksi ”Varaa”.",
        image: { src: shot("pida-tyhjaa-kohtaa-painettuna"), alt: "Päivän kalenteri, jossa tyhjä kohta noin klo 16 toisen työntekijän sarakkeessa on korostettu kultaisella, sitä painetaan uuden varauksen luomiseksi" },
      },
      {
        name: "Napauta varausta ja päivitä sen tila",
        text: "Napauta varausta nähdäksesi palvelun, ajan ja perittävän summan. Kun asiakas on palveltu, paina ”Maksu kassalla” tai ”Valmis”, jolloin tilaksi tulee ”Suoritettu”. Jos asiakas ei tule, paina ”Ei saapunut”, ja perua voit painamalla ”Peruuta”.",
        image: { src: shot("varauksen-tila-suoritettu"), alt: "Varauksen tiedot, joissa tila Suoritettu on korostettu kultaisella Yhteensä (perittävä) -rivin alla, ja alempana Toista tämä varaus" },
      },
      {
        name: "Siirrä varaus vetämällä",
        text: "Kun haluat siirtää varauksen, vedä sen lohko uuteen aikaan ja päästä irti. Järjestelmä pyytää vahvistuksen ennen siirtoa. Kerro asiakkaalle uusi aika heti, jotta muistatte molemmat saman ajan.",
      },
    ],
  },
  faq: [
    {
      q: "Miten lisään varauksen soittaneelle asiakkaalle puhelimellani?",
      a: "Pidä ”Varaukset”-sivulla tyhjää kohtaa painettuna noin sekunnin. ”Varaa asiakkaalle” aukeaa painamaasi aikaan ja työntekijän sarakkeeseen. Valitse palvelu, kirjoita asiakkaan nimi ja puhelinnumero ja paina ”Varaa”.",
    },
    {
      q: "Mitä varauksen maapallokuvake tarkoittaa?",
      a: "Se tarkoittaa, että asiakas varasi verkossa. Salongin lisäämillä varauksilla on eri kuvake ja väri, joten erotat ne kalenterissa toisistaan.",
    },
    {
      q: "Mitä painan, kun asiakas ei tule paikalle?",
      a: "Avaa asiakkaan varaus ja paina ”Ei saapunut”. Tieto tallentuu, joten näet, ketkä asiakkaat jättävät aikoja väliin.",
    },
    {
      q: "Miten siirrän asiakkaan ajan toiseen kellonaikaan?",
      a: "Vedä varauksen lohko kalenterissa uuteen aikaan. Järjestelmä pyytää vahvistuksen ennen siirtoa, ja kun vahvistat, varaus siirtyy.",
    },
    {
      q: "Saako asiakas vahvistusviestin, jos lisään varauksen itse?",
      a: "Saa, jos kirjoitat asiakkaan sähköpostiosoitteen ja rastitat lomakkeessa ”Varaa asiakkaalle” kohdan ”Lähetä asiakkaalle vahvistus- ja muistutussähköpostit”. Sähköposti on valinnainen, ja varaus syntyy, vaikka jättäisit sen tyhjäksi.",
    },
    {
      q: "Mistä näen, milloin varaus on tehty?",
      a: "Napauta varausta, niin sen tiedot aukeavat. Pieni rivi kertoo ”Asiakas varasi verkossa …”, jos asiakas teki varauksen itse, tai ”Salonki lisäsi …”, jos salonki kirjasi sen.",
    },
  ],
  related: ["mau-lich-hen", "thanh-toan-hoa-don", "doanh-thu-nhan-vien", "khach-hang"],
};

export default article;
