import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/mau-lich-hen/${name}.webp`;
const shot = (name: string) => `/wiki/mau-lich-hen/fi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "varausten-varit-kalenterissa",
  lesson: "mau-lich-hen",
  category: "salon",
  title: "Varausten värit kalenterissa: erota verkkovaraukset salongin lisäämistä yhdellä silmäyksellä",
  metaTitle: "Varausten värit: verkkovaraus vai salongin lisäämä",
  metaDescription:
    "Näin vaihdat varausten värit VaraaAin asetuksissa, jotta asiakkaiden verkkovaraukset erottuvat salongin lisäämistä, ja näet tarkalleen, milloin varaus tehtiin.",
  keyword: "varausten värit",
  keywords: [
    "varauskalenterin värit VaraaAi",
    "verkkovaraus vai salongin lisäämä varaus",
    "värikoodattu ajanvarauskalenteri",
    "milloin asiakas varasi ajan",
    "ulkoasu ja värit -asetukset",
    "mikä on asiakkaan verkkovaraus",
  ],
  excerpt: "Avaa Asetukset, etsi ”Varausten värit” -kortti ja valitse kummallekin varaustyypille oma väri. Napauta varausta nähdäksesi, milloin se tehtiin.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-cat-toc-nam-cho-khach-trong-tiem-sang-trong"),
    alt: "Parrakas liiviin pukeutunut parturi leikkaa sakseilla ja kammalla hymyilevän miehen hiuksia nahkatuolissa messinkikehyksisen ikkunan vieressä",
  },
  takeaways: [
    "Kalenterissa **”Asiakkaan verkkovaraus”** ja **”Salongin lisäämä”** ovat eri värisiä, ja valitset kummankin värin itse.",
    "Värit vaihdetaan kohdassa **”Asetukset”**, osiossa ”Ulkoasu ja värit”, kortilla **”Varausten värit”**.",
    "Kummallakin tyypillä on oma tausta- ja tekstiväri. Napauta valmista väriä tai valitse oma kohdista ”Tausta” ja ”Teksti”.",
    "Jos molemmat tyypit ovat samanvärisiä, järjestelmä muistuttaa vaihtamaan toisen.",
    "Napauta varausta, niin näet rivin ”Asiakas varasi verkossa …” tai ”Salonki lisäsi …”.",
  ],
  intro: [
    "Varausten värit alkavat kiinnostaa salonkiyrittäjää yleensä hyvin arkisesta syystä: kalenteri on täynnä lohkoja, eikä niistä näe, mitkä asiakkaat ovat varanneet verkossa ja mitkä joku salongista on kirjannut puhelun jälkeen. Näiden kahden pitää näyttää erilaisilta, koska ne kertovat, mitä kautta asiakkaat löytävät luoksesi.",
    "Tämä artikkeli seuraa VaraaAi Academyn oppituntia ”Omat värit verkkovarauksille”. Opit valitsemaan värin kummallekin varaustyypille, tarkistamaan tuloksen ennen kuin palaat kalenteriin ja näkemään tarkalleen, milloin varaus on tehty.",
  ],
  sections: [
    {
      id: "kaksi-varaustyyppia",
      title: "Asiakkaan verkkovaraus ja salongin lisäämä: kaksi varaustyyppiä samalla sivulla",
      blocks: [
        { p: "Jokainen VaraaAin varaus tulee jommastakummasta lähteestä. ”Varausten värit” -kortti kuvaa kummankin lyhyellä rivillä:" },
        {
          table: {
            head: ["Varaustyyppi", "Mikä se on", "Kuvake lohkossa"],
            rows: [
              ["”Asiakkaan verkkovaraus”", "Varaukset varaussivulta tai verkkosivuilta", "Maapallo"],
              ["”Salongin lisäämä”", "Omistajan tai henkilökunnan lisäämät varaukset", "Ihminen ja kynä"],
            ],
          },
        },
        { img: { src: shot("kaksi-varaustyyppia-kaksi-varia"), alt: "Kolmen työntekijän päiväkalenteri, jossa on violetteja varauslohkoja ja yksi kultaisella korostettu vihreä lohko maapallokuvakkeineen", caption: "Oppituntivideolla verkkovaraukset ovat vihreitä ja salongin lisäämät violetteja." } },
        { p: "Salongin lisäämät varaukset ovat yleensä puhelimessa varanneita tai suoraan ovesta tulleita asiakkaita, jotka kirjataan pitämällä kalenterin tyhjää kohtaa painettuna. Niiden lisääminen käydään läpi ohjeessa [kampaamon ajanvarausohjelma](lesson:lich-hen)." },
      ],
    },
    {
      id: "miksi-varikoodaus",
      title: "Miksi värikoodattu ajanvarauskalenteri auttaa",
      blocks: [
        { p: "Maapallokuvake kertoo jo, mistä kukin varaus tuli, mutta kuvakkeet ovat pieniä. Puhelimen näytöllä kesken täyden päivän silmä huomaa ensin värin. Kaksi selvästi erilaista väriä kertoo kolme asiaa ilman, että napautat ainuttakaan lohkoa:" },
        {
          ul: [
            "**Miten verkkoajanvaraus toimii.** Kalenteri, jossa on pelkkiä salongin lisäämiä varauksia, kertoo, että asiakkaiden pitää yhä soittaa eikä varauslinkki tavoita heitä.",
            "**Mitkä varaukset joku salongissa kirjasi.** Jos tällaisessa varauksessa on jotain epäselvää, kysy ensin omalta tiimiltä. Verkkovarauksessa asiakas valitsi palvelun ja ajan itse.",
            "**Kuka tiimistä saa eniten verkkovarauksia.** Päivänäkymässä jokaisella työntekijällä on sarake, joten sarakkeiden värit kertovat sen.",
          ],
        },
        { p: "Jos suurin osa varauksista on yhä salongin lisäämien väriä, seuraava askel on viedä [nettiajanvarauksen linkki](lesson:chia-se-link) useampaan paikkaan tai tulostaa tiskille [QR-koodijuliste](lesson:poster-qr)." },
      ],
    },
    {
      id: "varien-valinta",
      title: "Helppolukuiset värit varauksille",
      blocks: [
        { p: "”Varausten värit” -kortin jokaisella rivillä on valmiita värejä, joissa lukee ”Aa”, joten näet, miltä tausta- ja tekstiväri näyttävät yhdessä. Oppituntivideolla kummallakin varaustyypillä on kahdeksan tällaista vaihtoehtoa. Niiden alla ovat ”Tausta” ja ”Teksti” niille, jotka haluavat sekoittaa aivan oman värin." },
        { img: { src: shot("valmiit-varit-verkkovaraukselle"), alt: "Asiakkaan verkkovaraus -rivi, jossa kahdeksan Aa-merkittyä valmista väriä on korostettu kultaisella, ja niiden alla Tausta ja Teksti", caption: "Jokainen valmis väri on yhteen sovitettu tausta- ja tekstiväripari." } },
        { p: "Muutama sääntö, jotka syntyvät kalenterin päivittäisestä käytöstä:" },
        {
          ul: [
            "**Tee tyypeistä selvästi erilaiset.** Kylmä ja lämmin väri erottuvat paremmin kuin saman värin kaksi sävyä. Jos valitset molemmille samat värit, järjestelmä varoittaa ja pyytää vaihtamaan toisen.",
            "**Tekstin pitää erottua taustasta.** Kun valitset oman ”Tausta”- ja ”Teksti”-värin, katso ”Esikatselu”, jotta asiakkaan nimi ja kellonaika näkyvät yhä selvästi.",
            "**Koko tiimi käyttää samaa koodia.** Väreistä on hyötyä vain, kun kaikki tietävät, mitä kukin tarkoittaa. Kerro muutoksesta henkilökunnalle.",
          ],
        },
        { note: "Valmiit ja saapumatta jääneet varaukset säilyttävät omat tilavärinsä. Tässä valitut värit kertovat varauksen lähteen, eivätkä ne korvaa tilavärejä.", kind: "info", title: "Tilavärit pysyvät ennallaan" },
      ],
    },
    {
      id: "milloin-varattu",
      title: "Milloin asiakas varasi: rivi varauksen tiedoissa",
      blocks: [
        { p: "Väri kertoo, mistä varaus tuli. Kun haluat tietää, milloin se tehtiin, napauta varausta kalenterissa. Tiedoissa, heti varauksen päivämäärän ja kellonajan alla, on pieni rivi:" },
        {
          table: {
            head: ["Varaustyyppi", "Rivi tiedoissa", "Esimerkki oppituntivideolta"],
            rows: [
              ["Asiakkaan verkkovaraus", "”Asiakas varasi verkossa …”", "Asiakas varasi verkossa 16.11.2026 klo 09.47"],
              ["Salongin lisäämä", "”Salonki lisäsi …”", "Salonki lisäsi 16.11.2026 klo 09.53"],
            ],
          },
        },
        { img: { src: shot("asiakas-varasi-verkossa-tiedoissa"), alt: "55,00 euron Gel pedicure -varauksen tiedot, joissa rivi Asiakas varasi verkossa 16.11.2026 klo 09.47 maapallokuvakkeineen on korostettu kultaisella" } },
        { p: "Rivillä on sekä päivämäärä että kellonaika, joten tiedät tarkalleen, milloin varaus syntyi. Siitä on apua muutamassa konkreettisessa tilanteessa:" },
        {
          ul: [
            "Kun asiakas sanoo varanneensa jo kauan sitten eikä kukaan salongissa muista, avaat varauksen ja luet tarkan hetken.",
            "Kun pitää verrata [salongin peruutusehtojen](lesson:thanh-toan-chinh-sach) määräaikaan, sinulla on selvä aikaleima arvauksen sijaan.",
            "Kun haluat tietää, mihin aikaan päivästä asiakkaat yleensä varaavat, katsot tämän rivin muutamasta tuoreesta verkkovarauksesta.",
          ],
        },
        { img: { src: shot("salonki-lisasi-tiedoissa"), alt: "70,00 euron Relax massage -varauksen tiedot, joissa rivi Salonki lisäsi 16.11.2026 klo 09.53 henkilökuvakkeineen on korostettu kultaisella", caption: "Salongin kirjaamassa varauksessa rivillä lukee ”Salonki lisäsi …”." } },
      ],
    },
    {
      id: "tavallisia-tilanteita",
      title: "Tavallisia tilanteita varausten värejä vaihdettaessa",
      blocks: [
        {
          table: {
            head: ["Tilanne", "Mitä teet"],
            rows: [
              ["Et löydä paikkaa, jossa värit vaihdetaan", "Avaa ”Asetukset”, vieritä osioon ”Ulkoasu ja värit” ja etsi ”Varausten värit” -kortti"],
              ["Järjestelmä pyytää vaihtamaan värin", "Molemmilla tyypeillä on samat värit. Valitse toiselle riville eri väri"],
              ["Mikään valmis väri ei miellytä", "Valitse oma väri kohdista ”Tausta” ja ”Teksti”"],
              ["Valmiit varaukset eivät vaihtuneet uuteen väriin", "Näin on tarkoitettu: valmiit ja saapumatta jääneet varaukset säilyttävät tilavärinsä"],
              ["Haluat tietää, kuka varauksen teki ja milloin", "Napauta varausta ja lue ”Asiakas varasi verkossa …” tai ”Salonki lisäsi …”"],
            ],
          },
        },
        { p: "Värien valinta tehdään kerran. Sen jälkeen näet kalenterin avatessasi jokaisen varauksen lähteen, vaikka kätesi olisivat kiinni asiakkaan työssä." },
      ],
    },
  ],
  howTo: {
    title: "Varausten värien vaihtaminen VaraaAin asetuksissa vaihe vaiheelta",
    id: "varausten-varien-vaiheet",
    after: "miksi-varikoodaus",
    lead: "Viisi vaihetta seuraavat oppituntivideota ”Asetukset”-sivulta tuloksen tarkistamiseen kalenterissa.",
    steps: [
      {
        name: "Avaa ”Asetukset” ja etsi ”Varausten värit” -kortti",
        text: "Avaa hallintapaneelissa ”Asetukset” ja vieritä osioon ”Ulkoasu ja värit”. Etsi kortti ”Varausten värit”. Siinä on kaksi riviä: ylempänä ”Asiakkaan verkkovaraus” ja alempana ”Salongin lisäämä”.",
        image: { src: shot("varausten-varit-kortti-asetuksissa"), alt: "Asetusten Varausten värit -kortti, jossa Asiakkaan verkkovaraus -rivi on korostettu kultaisella, alla värivaihtoehdot ja Salongin lisäämä -rivi" },
      },
      {
        name: "Valitse väri riville ”Asiakkaan verkkovaraus”",
        text: "Napauta rivillä ”Asiakkaan verkkovaraus” jotakin valmista väriä. Jos haluat jotain aivan muuta, valitse oma väri kohdista ”Tausta” ja ”Teksti”. Tälle tyypille sopii näkyvä väri, sillä nämä varaukset tulevat ilman, että salongissa kirjoitetaan mitään.",
        image: { src: shot("tausta-ja-teksti-varit"), alt: "Asiakkaan verkkovaraus -rivin värivaihtoehtojen alla olevat Tausta- ja Teksti-painikkeet korostettuna kultaisella, alempana Salongin lisäämä -rivi" },
      },
      {
        name: "Valitse väri riville ”Salongin lisäämä”",
        text: "Tee sama rivillä ”Salongin lisäämä”: napauta valmista väriä tai käytä kohtia ”Tausta” ja ”Teksti”. Valitse eri sävy kuin ylemmälle riville. Jos molemmat tyypit ovat samanvärisiä, järjestelmä muistuttaa vaihtamaan toisen.",
        image: { src: shot("varit-salongin-lisaamille"), alt: "Salongin lisäämä -rivi, jonka valmiit värit sekä Tausta- ja Teksti-painikkeet on korostettu kultaisella, alla Esikatselu" },
      },
      {
        name: "Tarkista tulos kohdasta ”Esikatselu”",
        text: "Heti alla oleva ”Esikatselu” näyttää kaksi esimerkkilohkoa, toisen verkkovaraukselle ja toisen salongin lisäämälle, juuri valitsemillasi väreillä. Katso, erottuvatko ne selvästi ja onko teksti helppo lukea.",
        image: { src: shot("esikatselu-molemmat-varit"), alt: "Kultaisella korostettu Esikatselu, jossa vihreä esimerkkilohko asiakkaan verkkovaraukselle ja vaaleanvioletti lohko salongin lisäämälle varaukselle" },
      },
      {
        name: "Avaa varaus nähdäksesi, milloin se tehtiin",
        text: "Palaa ”Varaukset”-sivulle ja napauta mitä tahansa varausta. Tiedoissa näet rivin ”Asiakas varasi verkossa …” tai ”Salonki lisäsi …” sekä päivämäärän ja kellonajan, jolloin varaus syntyi.",
      },
    ],
  },
  faq: [
    {
      q: "Missä vaihdan varausten värit VaraaAissa?",
      a: "Avaa ”Asetukset”, vieritä osioon ”Ulkoasu ja värit” ja etsi ”Varausten värit” -kortti. Siellä kummallekin varaustyypille valitaan oma tausta- ja tekstiväri.",
    },
    {
      q: "Mitkä kaksi varaustyyppiä saavat eri värit?",
      a: "”Asiakkaan verkkovaraus” eli varaussivulta tai verkkosivuilta tehdyt varaukset ja ”Salongin lisäämä” eli omistajan tai henkilökunnan lisäämät varaukset. Väristä näkee, mistä varaus tuli.",
    },
    {
      q: "Mistä näen, milloin varaus on tehty?",
      a: "Napauta varausta kalenterissa ja lue rivi ”Asiakas varasi verkossa …”. Salongin lisäämässä varauksessa rivillä lukee ”Salonki lisäsi …”. Kummassakin on päivämäärä ja kellonaika, jolloin varaus syntyi.",
    },
    {
      q: "Mitä tapahtuu, jos valitsen molemmille tyypeille saman värin?",
      a: "Järjestelmä muistuttaa vaihtamaan toisen. Valitse toiselle riville eri valmis väri ja tarkista tulos kohdasta ”Esikatselu”.",
    },
    {
      q: "Vaihtuvatko valmiit ja saapumatta jääneet varaukset uuteen väriin?",
      a: "Eivät. Valmiit ja saapumatta jääneet varaukset säilyttävät omat tilavärinsä. ”Varausten värit” -kortin värit erottavat vain verkkovaraukset salongin lisäämistä.",
    },
    {
      q: "Voiko käyttää väriä, jota ei ole valmiina?",
      a: "Voi. Valitse kummallakin rivillä haluamasi värit kohdista ”Tausta” ja ”Teksti” ja tarkista tulos kohdasta ”Esikatselu”.",
    },
  ],
  related: ["lich-hen", "thanh-toan-hoa-don", "chia-se-link", "khach-hang"],
};

export default article;
