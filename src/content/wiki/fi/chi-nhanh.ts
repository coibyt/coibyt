import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/chi-nhanh/${name}.webp`;
const shot = (name: string) => `/wiki/chi-nhanh/fi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "salonkiketjun-hallinta-useita-toimipisteita",
  lesson: "chi-nhanh",
  category: "salon",
  title: "Salonkiketjun hallinta: näin lisäät uuden toimipisteen ja käytät ketjulle yhtä varauslinkkiä",
  metaTitle: "Salonkiketjun hallinta: useita toimipisteitä yhdellä tilillä",
  metaDescription:
    "Näin pyörität salonkiketjua VaraaAissa: lisää toimipiste asetuksissa, anna sille omat palvelut ja henkilökunta, vaihda toimipisteiden välillä ja jaa yksi linkki.",
  keyword: "salonkiketjun hallinta",
  keywords: [
    "useamman toimipisteen salonki",
    "toisen kynsistudion avaaminen",
    "ajanvarausjärjestelmä salonkiketjulle",
    "toimipisteen lisääminen VaraaAissa",
    "ketjun yhteinen varaussivu",
    "useita toimipisteitä yhdellä tilillä",
  ],
  excerpt: "Kaikki toimipisteet ovat samalla tilillä, ja jokaisella on oma varaussivu, kalenteri ja henkilökunta. Toimipisteestä toiseen vaihdat yhdellä napautuksella.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-lam-toc-cho-khach-tai-chi-nhanh-moi"),
    alt: "Kermanvaaleaan takkiin pukeutunut kampaaja harjaa violetissa samettituolissa istuvan vaaleahiuksisen asiakkaan hiuksia huoneessa, jossa on kolme kultakehyksistä peiliä",
  },
  takeaways: [
    "Uuden toimipisteen avaaminen **ei vaadi uutta tiliä**: kaikki toimipisteet ovat samalla tilillä.",
    "Lisää se kohdassa **”Asetukset”, osiossa ”Toimipisteet”, painikkeella ”Lisää toimipiste”**, täytä tiedot ja paina ”Lähetä hakemus”.",
    "Jokaisella toimipisteellä on **oma varaussivu, kalenteri ja henkilökunta**, joten luvut eivät sekoitu.",
    "Kun toimipisteitä on kaksi tai enemmän, hallintapaneelin yläosaan ilmestyy **”Toimipiste”-valitsin**, jolla vaihdat niiden välillä.",
    "**Ketjun yhteinen varaussivu** on yksi linkki: asiakas valitsee ensin toimipisteen ja varaa sitten.",
  ],
  intro: [
    "Salonkiketjun hallinta alkaa sinä päivänä, kun allekirjoitat toisen liiketilan vuokrasopimuksen. Siitä lähtien yksi kalenteri ei enää riitä: on kaksi osoitetta, kaksi tiimiä, kahdet aukioloajat, ja asiakkaan pitää tietää varmasti, mihin toimipisteeseen hän varaa.",
    "Tämä artikkeli seuraa VaraaAi Academyn oppituntia ”Useita toimipisteitä”. Opit lisäämään uuden toimipisteen nykyiselle tilillesi, tiedät mitä sille pitää asettaa uudelleen, miten vaihdat toimipisteiden välillä hallinnoidessasi ja milloin kannattaa lähettää asiakkaalle koko ketjun yhteinen linkki.",
  ],
  sections: [
    {
      id: "miksi-erillaan",
      title: "Miksi useamman toimipisteen salongissa jokainen toimipiste pidetään erillään",
      blocks: [
        { p: "Moni omistaja ajautuu toista toimipistettä avatessaan kirjaamaan kaiken samaan kalenteriin ja lisäämään asiakkaan nimen eteen lyhenteen. Tapa hajoaa nopeasti. Asiakas varaa yhteen toimipisteeseen ja saapuu toiseen. Kummankin paikan tekijät näkyvät samassa listassa. Kuun lopussa et pysty erottamaan, kumpi toimipiste pärjää." },
        { p: "VaraaAi tekee päinvastoin: yksi tili, useita toimipisteitä, ja jokainen toimipiste on kokonainen salonki. Jokaisella on oma varaussivu, kalenteri ja henkilökunta. Toimipisteiden kalenterit ja luvut pysyvät erillään, ja sinä kirjaudut silti vain kerran." },
        { img: { src: img("tho-cat-toc-nam-tai-co-so-thu-hai"), alt: "Parrakas parturi tummanvihreässä liivissä leikkaa ruskeassa nahkatuolissa istuvan miesasiakkaan hiuksia suuren ikkunan vieressä", caption: "Jokaisella toimipisteellä on omat tekijänsä ja asiakkaansa, joten se tarvitsee myös oman kalenterinsa." } },
        { p: "Erillisyys auttaa myös asiakasta. Uuden toimipisteen lähellä asuva haluaa nähdä vain sen toimipisteen vapaat ajat ja tekijät. Hänen ei tarvitse selata kaupungin toisella laidalla olevan paikan henkilökuntaa." },
      ],
    },
    {
      id: "valmistelut",
      title: "Mitä valmistella ennen uuden toimipisteen lisäämistä",
      blocks: [
        { p: "Uuden toimipisteen lomake kysyy samat tiedot, jotka annoit [ensimmäisen salongin rekisteröinnissä](lesson:dang-ky-salon). Kun seuraavat asiat ovat valmiina, lomake täyttyy yhdellä kertaa:" },
        {
          ul: [
            "**Toimipisteen nimi.** Lisää salongin nimen perään kaupunginosa tai katu, jotta asiakas erottaa toimipisteet jo nimestä.",
            "**Lyhyt kuvaus** uudesta toimipisteestä.",
            "**Toimipisteen pääasiallinen palvelukategoria.** Toimipisteiden ei tarvitse tarjota samanlaisia palveluja.",
            "**Koko osoite, maa ja kaupunki.**",
            "**Uuden toimipisteen oma puhelinnumero**, jotta asiakas soittaa siihen paikkaan, johon on tulossa.",
          ],
        },
        { note: "”Maa”-kentän alla oleva huomautus kertoo, että maa määrittää salongin aikavyöhykkeen, ja sitä voi muuttaa myöhemmin asetuksista. Jos uusi toimipiste on eri maassa kuin ensimmäinen, valitse sen oma maa, jotta varausajat vastaavat paikallista aikaa.", kind: "info", title: "”Maa”-kenttä ja aikavyöhyke" },
      ],
    },
    {
      id: "erilliset-ja-yhteiset",
      title: "Mikä on toimipistekohtaista ja mikä yhteistä",
      blocks: [
        { p: "Kun ymmärrät tämän rajan ennen aloittamista, et muuta asioita väärässä paikassa." },
        {
          table: {
            head: ["Osa", "Erillinen vai yhteinen", "Mitä se tarkoittaa"],
            rows: [
              ["Kirjautumistili", "Yhteinen", "Yksi kirjautuminen, ja näet kaikki toimipisteesi"],
              ["Varaussivu", "Toimipistekohtainen", "Jokaisella toimipisteellä on oma sivu asiakkaille lähetettäväksi"],
              ["Kalenteri", "Toimipistekohtainen", "Yhden toimipisteen varaukset eivät näy toisessa"],
              ["Henkilökunta", "Toimipistekohtainen", "Asiakas näkee vain sen toimipisteen tekijät, johon varaa"],
              ["Ketjun yhteinen varaussivu", "Yhteinen", "Yksi linkki koko ketjulle, asiakas valitsee ensin toimipisteen"],
            ],
          },
        },
        { p: "Koska kalenterit ja henkilökunta ovat erillään, jokainen hallintapaneelin luku koskee kulloinkin valittua toimipistettä. ”Toimipisteet”-osiossa se on merkitty sanalla ”Valittuna”. Opettele vilkaisemaan merkkiä ennen kuin muutat hintaa tai aukioloaikoja." },
      ],
    },
    {
      id: "uuden-toimipisteen-asetukset",
      title: "Uuden toimipisteen käyttöönotto: palvelut, henkilökunta ja aukioloajat",
      blocks: [
        { p: "Kun olet painanut ”Lähetä hakemus”, uudella toimipisteellä on oma varaussivu, mutta sivu on tyhjä. Oppitunti nimeää kolme asiaa, jotka toimipisteelle lisätään samaan tapaan kuin ensimmäiselle salongille:" },
        {
          ol: [
            "[Palvelut ja hinnat](lesson:dich-vu). Uudessa toimipisteessä voi olla lyhyempi palveluvalikko tai eri hinnat, joten kirjaa se, mitä paikka oikeasti tarjoaa.",
            "[Henkilökunta](lesson:nhan-vien), joka työskentelee uudessa toimipisteessä, ja palvelut, joita kukin osaa tehdä.",
            "[Aukioloajat ja vapaapäivät](lesson:gio-mo-cua), koska asiakas voi varata vain aukioloaikojen sisällä.",
          ],
        },
        { img: { src: img("le-tan-don-khach-tai-quay-mot-chi-nhanh"), alt: "Violettiin takkiin pukeutunut vastaanottovirkailija ojentaa vesilasin kermanvaaleaan takkiin pukeutuneelle asiakkaalle marmoritiskillä, taustalla asiakkaita samettituoleilla", caption: "Uusi toimipiste saa varauksia vasta, kun sillä on palvelut, henkilökunta ja aukioloajat." } },
        { p: "Älä lähetä uuden toimipisteen linkkiä asiakkaille ennen kuin nämä kolme ovat valmiit. Varaussivu, jolta ei voi valita yhtään palvelua, saa asiakkaan luulemaan, ettei toimipiste ole vielä auki." },
        { note: "Avaa uuden toimipisteen varaussivu puhelimellasi ja tee itse koevaraus. Näet heti, mikä palvelu tai aukioloaika vielä puuttuu.", kind: "tip", title: "Tee koevaraus" },
      ],
    },
    {
      id: "ketjun-varaussivu",
      title: "Ketjun yhteinen varaussivu vai toimipistekohtainen linkki",
      blocks: [
        { p: "”Asetuksissa” on myös ketjun yhteinen varaussivu. Se on yksi yhteinen linkki: asiakas avaa sen, valitsee toimipisteen ja varaa. Sinun tarvitsee jakaa vain yksi linkki koko ketjulle." },
        { p: "Jokaisella toimipisteellä on edelleen myös oma linkkinsä. Kumpaa käytät, riippuu siitä, tietääkö asiakas jo, mihin toimipisteeseen haluaa. Alla oleva taulukko on tämän artikkelin ehdotus:" },
        {
          table: {
            head: ["Mihin linkki tulee", "Käytä"],
            rows: [
              ["Brändin yhteinen Facebook- tai Instagram-sivu", "Ketjun yhteistä varaussivua, koska seuraajia on joka puolella"],
              ["QR-juliste yhden toimipisteen ovessa", "Sen toimipisteen omaa linkkiä, koska asiakas seisoo juuri siellä"],
              ["Viesti yhden toimipisteen kanta-asiakkaille", "Sen toimipisteen linkkiä, jossa asiakas jo käy"],
              ["Koko ketjun yhteiset käyntikortit tai esitteet", "Ketjun yhteistä varaussivua"],
            ],
          },
        },
        { img: { src: img("chu-salon-cam-may-tinh-bang-quan-ly-chuoi-salon"), alt: "Kiharahiuksinen nainen violetissa silkkipuserossa seisoo marmoritiskin vieressä tabletti kädessään, taustalla valoisa salonki ja kultakehyksiset peilit", caption: "Ketjulinkin kanssa sinun tarvitsee muistaa ja jakaa vain yksi osoite kaikille toimipisteille." } },
        { p: "Jokaisen toimipisteen linkin ja QR-koodin saamisesta kerrotaan ohjeessa [varauslinkin jakamisesta](lesson:chia-se-link). Jos haluat tulostaa koodin oveen, katso ohje [QR-julisteen tekemisestä](lesson:poster-qr)." },
      ],
    },
    {
      id: "arjen-tilanteet",
      title: "Tavallisia tilanteita useamman toimipisteen hallinnassa",
      blocks: [
        {
          table: {
            head: ["Tilanne", "Mitä teet"],
            rows: [
              ["Et näe ”Toimipiste”-valitsinta hallintapaneelin yläosassa", "Se ilmestyy vasta, kun tilillä on kaksi tai useampia toimipisteitä"],
              ["Et ole varma, mitä toimipistettä muokkaat", "Avaa ”Asetukset” ja ”Toimipisteet”. Hallinnoimasi toimipiste on merkitty sanalla ”Valittuna”"],
              ["Asiakas pyytää varauslinkkiä kertomatta toimipistettä", "Lähetä ketjun yhteinen varaussivu, niin asiakas valitsee itse"],
              ["Uusi toimipiste ei ole saanut yhtään varausta", "Tarkista, että sille on lisätty palvelut, henkilökunta ja aukioloajat"],
            ],
          },
        },
        { p: "Kun toimipisteitä on useita, kaksi ohjetta kannattaa lukea seuraavaksi: [hallintapaneelin yleiskatsaus](lesson:tong-quan), josta näet joka aamu, miten liiketoiminta sujuu, ja [salongin varasto](lesson:kho-hang), josta näet kunkin toimipisteen tarvikkeet." },
      ],
    },
  ],
  howTo: {
    title: "Salonkiketjun hallinta: uuden toimipisteen lisääminen vaihe vaiheelta",
    id: "toimipisteen-lisaamisen-vaiheet",
    after: "valmistelut",
    lead: "Seitsemän vaihetta kulkevat ”Asetusten” avaamisesta siihen, että koko ketjulla on yksi yhteinen varauslinkki.",
    steps: [
      {
        name: "Avaa ”Asetukset” ja vieritä kohtaan ”Toimipisteet”",
        text: "Napauta hallintapaneelissa ”Asetukset” ja vieritä alas ”Toimipisteet”-osioon. Siinä näkyvät toimipisteesi. Se, jota hallinnoit nyt, on merkitty sanalla ”Valittuna”.",
        image: { src: shot("toimipisteet-asetuksissa"), alt: "Asetusten Toimipisteet-osio kultaisella korostettuna: selitys omasta varaussivusta, kalenterista ja henkilökunnasta, Lumi Beauty Paris merkittynä Valittuna ja alla Lisää toimipiste" },
      },
      {
        name: "Paina ”Lisää toimipiste”",
        text: "Paina toimipisteluettelon alla olevaa ”Lisää toimipiste”. Lomake uuden toimipisteen tiedoille aukeaa. Pysyt nykyisellä tililläsi, eikä mitään tarvitse rekisteröidä alusta.",
        image: { src: shot("lisaa-toimipiste-painike"), alt: "Lisää toimipiste -painike korostettuna kultaisella heti aktiivisen salongin alla Toimipisteet-osiossa" },
      },
      {
        name: "Kirjoita nimi, lyhyt kuvaus ja kategoria",
        text: "Täytä toimipisteen ”Yrityksen nimi”, kirjoita muutama rivi kenttään ”Lyhyt kuvaus” ja valitse ”Palvelukategoria”. Valitse nimi, jonka asiakas erottaa ensimmäisestä toimipisteestä, sillä kaksi samanlaista nimeä saa asiakkaan valitsemaan väärin.",
        image: { src: shot("uuden-toimipisteen-nimi-ja-kuvaus"), alt: "Uuden toimipisteen lomake, jossa Yrityksen nimi- ja Lyhyt kuvaus -kentät on korostettu kultaisella, alla Palvelukategoria ja Osoite" },
      },
      {
        name: "Kirjoita osoite, maa, kaupunki ja puhelinnumero",
        text: "Täytä osoite, valitse maa ja kirjoita kaupunki ja uuden toimipisteen puhelinnumero. Asiakas etsii juuri tätä osoitetta, joten kirjoita kadunnimi ja numero kokonaan.",
        image: { src: shot("uuden-toimipisteen-maa-kaupunki-puhelin"), alt: "Maa-kenttä aikavyöhykehuomautuksineen sekä uuden toimipisteen Kaupunki- ja Puhelinnumero-kentät korostettuna kultaisella Lähetä hakemus -painikkeen yläpuolella" },
      },
      {
        name: "Paina ”Lähetä hakemus”",
        text: "Lue tiedot kerran läpi ja paina lomakkeen lopussa ”Lähetä hakemus”. Uusi toimipiste saa oman varaussivun.",
        image: { src: shot("laheta-hakemus-uusi-toimipiste"), alt: "Uuden toimipisteen lomakkeen loppu: Osoite, Maa, Kaupunki ja Puhelinnumero sekä kultaisella korostettu musta Lähetä hakemus -painike" },
      },
      {
        name: "Lisää uudelle toimipisteelle palvelut, henkilökunta ja aukioloajat",
        text: "Lisää toimipisteelle palvelut, henkilökunta ja aukioloajat samaan tapaan kuin ensimmäiselle salongillesi. Vasta sitten asiakkaalla on jotain valittavaa ja aikoja varattavaksi.",
      },
      {
        name: "Vaihda ”Toimipiste”-valitsimella ja jaa ketjun linkki",
        text: "Kun toimipisteitä on kaksi tai enemmän, hallintapaneelin yläosaan ilmestyy ”Toimipiste”-valitsin. Napauta sitä, niin vaihdat toimipisteestä toiseen yhdellä napautuksella. Ota ”Asetuksista” ketjun yhteinen varaussivu, niin saat yhden linkin asiakkaille.",
      },
    ],
  },
  faq: [
    {
      q: "Tarvitsenko uuden VaraaAi-tilin toista toimipistettä varten?",
      a: "Et. Kaikki toimipisteet ovat samalla tilillä. Lisäät uuden toimipisteen ”Asetusten” ”Toimipisteet”-osiossa ja kirjaudut kuten ennenkin.",
    },
    {
      q: "Missä uusi toimipiste lisätään VaraaAissa?",
      a: "Avaa ”Asetukset”, vieritä ”Toimipisteet”-osioon ja paina ”Lisää toimipiste”. Täytä nimi, lyhyt kuvaus, palvelukategoria, osoite, maa, kaupunki ja puhelinnumero ja paina ”Lähetä hakemus”.",
    },
    {
      q: "Mitä omaa kullakin toimipisteellä on?",
      a: "Jokaisella toimipisteellä on oma varaussivu, kalenteri ja henkilökunta. Näin kunkin toimipisteen kalenteri ja luvut pysyvät erillään.",
    },
    {
      q: "Miten vaihdan toimipisteestä toiseen hallinnoidessani?",
      a: "Kun tilillä on kaksi tai useampia toimipisteitä, hallintapaneelin yläosaan ilmestyy ”Toimipiste”-valitsin. Napauta sitä ja valitse toimipiste, jota haluat hallita.",
    },
    {
      q: "Mihin ketjun yhteistä varaussivua käytetään?",
      a: "Se on yksi yhteinen linkki koko ketjulle. Asiakas avaa sen, valitsee toimipisteen ja varaa, joten jaat vain yhden linkin usean sijaan.",
    },
    {
      q: "Voiko asiakas varata uuteen toimipisteeseen heti, kun olen lisännyt sen?",
      a: "Uudella toimipisteellä on oma varaussivu heti hakemuksen lähettämisen jälkeen. Lisää sille palvelut, henkilökunta ja aukioloajat samoin kuin ensimmäiselle salongille, jotta asiakkaalla on jotain valittavaa.",
    },
  ],
  related: ["tong-quan", "kho-hang", "dang-ky-salon", "chia-se-link"],
};

export default article;
