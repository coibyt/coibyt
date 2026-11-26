import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/ho-so-salon/${name}.webp`;
const shot = (name: string) => `/wiki/ho-so-salon/fi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "salongin-profiili-esittely-logo-ja-kansikuva",
  lesson: "ho-so-salon",
  category: "salon",
  title: "Salongin profiili: näin viimeistelet esittelyn, logon ja kansikuvan, jotta asiakas varaa luottavaisin mielin",
  metaTitle: "Salongin profiili: esittely, logo ja kansikuva 85 %:iin",
  metaDescription:
    "Näin viimeistelet salongin profiilin VaraaAissa: lue valmiusaste, kirjoita yli 80 merkin esittely, lataa kansikuva ja logo ja lisää yhteystiedot ja some.",
  keyword: "salongin profiili",
  keywords: [
    "salongin esittelyteksti",
    "kampaamon esittely esimerkki",
    "salongin kansikuva ja logo",
    "profiilin valmiusaste VaraaAi",
    "kanta-asiakaskortit käyttöön",
    "salongin yhteystiedot varaussivulla",
  ],
  excerpt: "Profiilin valmiusaste -kortti näyttää jokaisen puuttuvan kohdan. Kirjoita esittely, lataa kansikuva ja logo ja lisää yhteystiedot, niin profiili ylittää 85 %.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("chu-salon-cam-may-tinh-bang-trong-tiem"),
    alt: "Kiharatukkainen nainen luumunvärisessä silkkipaidassa pitää tablettia ja hymyilee marmoritiskin vieressä tyylikkäässä salongissa",
  },
  takeaways: [
    "”Asetukset”-sivun yläreunan **”Profiilin valmiusaste”** -kortti näyttää prosentin ja sen, mitkä kohdat vielä puuttuvat.",
    "Kun profiili on **85 %** valmis, kanta-asiakaskortit ja markkinointi avautuvat käyttöön.",
    "Kirjoita ”Lyhyt kuvaus” -kenttään **vähintään 80 merkkiä**, sillä salongin kuvaus lasketaan valmiusasteeseen.",
    "Kansikuva on ensimmäinen asia, jonka asiakas näkee varaussivullasi, joten käytä aitoa ja valoisaa kuvaa salongista.",
    "Jokaisen puuttuvan kohdan vieressä oleva ”Lisää” vie suoraan oikeaan kenttään, eikä sinun tarvitse etsiä sitä.",
  ],
  intro: [
    "Valmis salongin profiili tekee verkossa saman työn kuin liikkeen kyltti ja vastaanotto. Asiakas, joka ei ole koskaan käynyt luonasi, katsoo kansikuvan, lukee muutaman rivin esittelyä, tarkistaa osoitteen ja päättää, varaako ajan. Tyhjä profiili ilman kuvaa ja kuvausta antaa hänelle vähän syitä luottaa.",
    "Tämä artikkeli seuraa VaraaAi Academyn oppituntia ”Salongin profiili, logo ja kansikuva”. Opit lukemaan ”Profiilin valmiusaste” -korttia, täyttämään ”Asetukset”-sivun osiot ja nostamaan profiilin yli 85 %:n, jolloin saat käyttöön työkalut asiakkaiden palauttamiseen.",
  ],
  sections: [
    {
      id: "mita-valmis-profiili-tekee",
      title: "Mitä valmis salongin profiili tekee yrityksellesi",
      blocks: [
        { p: "VaraaAi kertoo syyn itse kortissa: ”Täydellinen profiili erottuu hakukartalla ja saa asiakkaat varaamaan luottavaisemmin.” Nämä kaksi kulkevat yhdessä. Kun asiakas etsii kynsistudiota tai kampaamoa kotinsa läheltä, hän näkee monta tulosta kerralla, ja selkeällä kansikuvalla ja täsmällisellä kuvauksella varustettu salonki saa ensimmäisen napautuksen." },
        { p: "Syy on myös käytännöllinen. Kun profiili on 85 % valmis, hallintapaneelissa avautuvat kanta-asiakaskortit ja markkinointi. Niillä saat entiset asiakkaat palaamaan, esimerkiksi [kanta-asiakaskortilla vakioasiakkaille](lesson:the-tich-diem). Sen alle jäävällä profiililla niitä ei vielä voi käyttää." },
        { img: { src: shot("profiilin-valmiusaste-92-prosenttia"), alt: "Profiilin valmiusaste -kortti 92 prosentissa, jossa lukee Kanta-asiakaskortit ja markkinointi avattu ja alla näkyvät kohdat", caption: "Kortti on ”Asetukset”-sivun yläreunassa. Prosentti nousee sitä mukaa, kun täytät kohtia." } },
      ],
    },
    {
      id: "mita-valmiusaste-laskee",
      title: "Mitä profiilin valmiusaste laskee",
      blocks: [
        { p: "Kortissa on kaksi ryhmää. Ylempänä, esimerkiksi rivin ”1 kohtaa täydentämättä” alla, ovat puuttuvat kohdat, ja jokaisen oikealla puolella on ”Lisää”-painike. Niiden alla ovat valmiit kohdat vihreällä rastilla. Oppituntivideon kortissa näkyvät nämä kohdat:" },
        {
          table: {
            head: ["Kohta kortissa", "Missä se täytetään"],
            rows: [
              ["Salongin logo, Kansikuva", "”Asetukset”, painikkeet ”Lataa logo” ja ”Lataa kansikuva”"],
              ["Kuvaus (vähintään 80 merkkiä)", "Kenttä ”Lyhyt kuvaus” osiossa ”Salongin tiedot”"],
              ["Osoite ja sijainti kartalla, Palvelukategoriat", "Osio ”Salongin tiedot”"],
              ["Puhelinnumero, Verkkosivu tai some", "Osio ”Yhteystiedot ja some-linkit”"],
              ["Aukioloajat", "Hallintapaneelin ”Aukioloajat”"],
              ["Vähintään 1 palvelu, Vähintään 1 työntekijä", "Hallintapaneelin palvelu- ja henkilökuntaosiot"],
              ["Peruutusehdot, Pankkitili, Laskutustiedot", "”Asetukset”, osiot ”Varaukset ja ehdot” ja ”Maksut ja laskutus”"],
            ],
          },
        },
        { p: "Taulukosta näkyy, että profiili on laajempi kuin kuvat ja tekstit. Kortti laskee mukaan myös muualla tehtävät työt, kuten [palveluiden lisäämisen](lesson:dich-vu), [aukioloaikojen asettamisen](lesson:gio-mo-cua) tai [peruutusehtojen kirjoittamisen](lesson:thanh-toan-chinh-sach). Jos käyt ensimmäisen kurssin oppitunnit läpi järjestyksessä, prosentti nousee itsestään." },
      ],
    },
    {
      id: "esittelytekstin-kirjoittaminen",
      title: "Salongin esittelyteksti, joka saa asiakkaan varaamaan",
      blocks: [
        { p: "”Lyhyt kuvaus” näkyy julkisella sivullasi salongin nimen alla, joten se on ensimmäinen teksti, jonka asiakas sinusta lukee. Oppitunti pyytää vähintään 80 merkkiä. Se on alaraja, jolla kohta lasketaan valmiiksi, ei ihannepituus." },
        { p: "Hyvä esittely vastaa kysymyksiin, joita asiakas jo miettii: mihin salonki on erikoistunut, missä se on ja miksi hänen kannattaisi valita juuri se. Kirjoita se oman salonkisi todellisilla yksityiskohdilla." },
        {
          ul: [
            "**Kannattaa kertoa:** vahvimmat palvelusi, alue, kielet, joita henkilökunta puhuu, ja otatteko vain ajanvarauksia vai myös asiakkaita ilman varausta.",
            "**Kannattaa välttää:** lauseita, jotka mikä tahansa salonki voisi kirjoittaa, kuten ”laatua edulliseen hintaan”. Asiakas ei opi niistä sinusta mitään uutta.",
          ],
        },
        { note: "Esimerkiksi: ”Pieni kynsistudio rautatieaseman lähellä, erikoisalana geelilakkaus ja rakennekynnet muotilla. Vain ajanvarauksella, palvelemme suomeksi ja englanniksi.” Kaksi tällaista lausetta ylittää 80 merkkiä ja antaa asiakkaalle syyn katsoa palvelulistaasi.", kind: "tip", title: "Malli, jota voit muokata omaan salonkiisi" },
      ],
    },
    {
      id: "kansikuva-ja-logo",
      title: "Kansikuvan ja logon valinta salongille",
      blocks: [
        { p: "”Asetukset”-sivulla jokaisen kohdan alla oleva lyhyt teksti kertoo, missä kuvaa käytetään. Kansikuva ”Näytetään yrityssivusi yläosassa ja hakutuloksissa.” Logo on ”Neliömäinen kuva, jota käytetään yrityksesi kuvakkeena.”" },
        { p: "Koska kansikuva näkyy myös hakutuloksissa, se kilpailee suoraan muiden salonkien kuvien kanssa. Valoisa ja siisti kuva omasta salongista vakuuttaa enemmän kuin kuvapankin kuva, koska asiakas näkee saman tilan saapuessaan. Logoksi kannattaa valita yksinkertainen merkki, jonka tunnistaa vielä pieneksi neliöksi pienennettynä." },
        { note: "Jos mieleistä kuvaa ei vielä ole, kuvaa salonki heti siivouksen jälkeen päivänvalossa ja lataa se ensin. Voit vaihtaa kuvan milloin tahansa samalla ”Lataa kansikuva” -painikkeella.", kind: "tip", title: "Hyvää kuvaa ei vielä ole" },
      ],
    },
    {
      id: "yhteystiedot-ja-some",
      title: "Salongin yhteystiedot ja some-linkit",
      blocks: [
        { p: "Osio ”Yhteystiedot ja some-linkit” ”Näkyy julkisella sivullasi, jotta asiakkaat voivat ottaa sinuun suoraan yhteyttä.” Oppitunnilla käydään läpi nämä kentät: puhelinnumero, sähköposti, verkkosivu, Facebook, Instagram ja TikTok." },
        { img: { src: shot("facebook-instagram-tiktok-linkit"), alt: "Asetusten Yhteystiedot ja some-linkit -osiossa Facebook-, Instagram- ja TikTok-kentät on korostettu kultaisella kehyksellä", caption: "Liitä jokaiseen kenttään salongin oman sivun koko osoite. Mitä enemmän täytät, sitä helpommin sinut löydetään." } },
        { p: "Täytä vain kanavat, joita salonki todella käyttää. Instagram-tili, jossa on tuoreita kuvia kynsistä tai hiuksista, näyttää asiakkaalle, mihin tiimisi pystyy. Linkki kuukausia tyhjänä olleeseen sivuun antaa päinvastaisen vaikutelman. Puhelinnumeron pitää olla sellainen, johon joku vastaa aukioloaikana." },
      ],
    },
    {
      id: "kun-85-prosenttia-ylittyy",
      title: "Kun profiili ylittää 85 %",
      blocks: [
        { p: "Palaa ”Asetukset”-sivun yläreunaan katsomaan kortin uusi luku. Jos jossain kohdassa on vielä ”Lisää”-painike, paina sitä ja täytä sekin. Yli 85 %:ssa kortissa lukee ”Kanta-asiakaskortit ja markkinointi avattu”." },
        { p: "Nyt salongin sivulla on kuvat ja tekstit, joiden kanssa sitä kehtaa esitellä. Järkevä seuraava askel on [jakaa varauslinkki](lesson:chia-se-link) juuri lisäämissäsi kanavissa tai [tehdä QR-koodijuliste](lesson:poster-qr) salonkiin." },
      ],
    },
  ],
  howTo: {
    title: "Salongin profiilin viimeistely VaraaAissa vaihe vaiheelta",
    id: "profiilin-vaiheet",
    after: "mita-valmiusaste-laskee",
    lead: "Kaikki alla oleva tehdään hallintapaneelin ”Asetukset”-sivulla. Voit tehdä sen puhelimella tai tietokoneella.",
    steps: [
      {
        name: "Avaa ”Asetukset” ja lue valmiusastekortti",
        text: "Siirry kohtaan ”Asetukset”. Yläreunan ”Profiilin valmiusaste” -kortti näyttää, montako prosenttia profiilista on valmiina ja mitkä kohdat puuttuvat. Lue lista ensin, niin tiedät, tarvitsetko valmiiksi kuvia vai tekstiä.",
      },
      {
        name: "Paina puuttuvan kohdan vieressä ”Lisää”",
        text: "Jokaisen puuttuvan kohdan oikealla puolella on ”Lisää”-painike. Paina sitä, niin sivu vie täsmälleen siihen kohtaan, joka pitää täyttää. Se on nopeampaa kuin selata itse kaikkia ”Asetukset”-sivun osioita.",
        image: { src: shot("taydentamattomat-kohdat-lisaa-painike"), alt: "Valmiusastekortti, jossa puuttuva kohta Pankkitili ja sen Lisää-painike on korostettu kultaisella rastitettujen kohtien yläpuolella" },
      },
      {
        name: "Täytä ”Salongin tiedot”",
        text: "Kirjoita osiossa ”Salongin tiedot” ”Salongin nimi” ja vähintään 80 merkin ”Lyhyt kuvaus”. Täytä sitten ”Osoite”, ”Kaupunki” ja ”Maa”. Tarkista, että kartan nuppineula on salonkisi kohdalla, koska asiakas löytää perille sen avulla.",
        image: { src: shot("lyhyt-kuvaus-ja-osoite-kartalla"), alt: "Lyhyt kuvaus -kenttä esittelytekstillä, Osoite-kenttä ja kartta, jossa sininen nuppineula näyttää salongin sijainnin" },
      },
      {
        name: "Rastita palvelukategoriat ja paina ”Tallenna”",
        text: "Rastita kohdassa ”Palvelukategoriat” salongin kategoriat, esimerkiksi ”Kynnet”, ”Kampaamo” tai ”Kulmat ja ripset”. Asiakkaat hakevat palvelun mukaan, joten oikeat kategoriat tuovat salongin niiden eteen, jotka etsivät juuri sitä. Paina lopuksi ”Tallenna”.",
        image: { src: shot("palvelukategoriat-ja-tallenna"), alt: "Palvelukategoriat-ruudut, joista Kynnet on rastitettu, mukana Kylpylä ja hieronta, Parturi ja Kulmat ja ripset sekä Tallenna-painike" },
      },
      {
        name: "Lataa kansikuva",
        text: "Vieritä kohtaan ”Kansikuva”, paina ”Lataa kansikuva” ja valitse kuva laitteeltasi. Se näkyy salongin sivun yläosassa ja hakutuloksissa, joten asiakas näkee sen ensimmäisenä.",
        image: { src: shot("lataa-kansikuva"), alt: "Kansikuva-osio, jossa on kuva salongin sisätiloista ja kultaisella korostettu Lataa kansikuva -painike, alla Logo-osio" },
      },
      {
        name: "Lataa logo",
        text: "Heti alla on ”Logo”. Paina ”Lataa logo” ja valitse neliön muotoinen kuva. Ennen kuin lisäät logon, ruudussa näkyy vain salongin nimen ensimmäinen kirjain.",
        image: { src: shot("lataa-salongin-logo"), alt: "Logo-osio, jossa on neliön muotoinen violetti L-logo ja kultaisella korostettu Lataa logo -painike, alla Yhteystiedot ja some" },
      },
      {
        name: "Täytä ”Yhteystiedot ja some-linkit”",
        text: "Kirjoita osioon ”Yhteystiedot ja some-linkit” salongin ”Puhelinnumero” ja ”Sähköposti”, sitten verkkosivu, Facebook, Instagram ja TikTok, jos sinulla on niitä. Tiedot näkyvät julkisella sivullasi, jotta asiakkaat voivat ottaa yhteyttä suoraan.",
        image: { src: shot("puhelinnumero-ja-sahkoposti"), alt: "Yhteystiedot ja some-linkit -osio, jossa Puhelinnumero- ja Sähköposti-kentät on korostettu ja alla ovat Verkkosivu ja WhatsApp" },
      },
    ],
  },
  faq: [
    {
      q: "Montako prosenttia salongin profiilin pitää olla valmis, jotta kanta-asiakaskortit ja markkinointi avautuvat?",
      a: "85 %. ”Asetukset”-sivun ”Profiilin valmiusaste” -kortti kertoo tämän rajan ja näyttää, missä profiilisi on nyt.",
    },
    {
      q: "Kuinka pitkä salongin lyhyen kuvauksen pitää olla?",
      a: "Vähintään 80 merkkiä. Kohta ”Kuvaus (vähintään 80 merkkiä)” lasketaan profiilin valmiusasteeseen, joten lyhyempää tekstiä ei vielä lasketa. Kaksi täsmällistä lausetta palveluistasi ja alueestasi riittää.",
    },
    {
      q: "Missä kansikuva ja logo näkyvät?",
      a: "Kansikuva näytetään yrityssivusi yläosassa ja hakutuloksissa. Logo on neliön muotoinen kuva, jota käytetään salongin kuvakkeena.",
    },
    {
      q: "Mistä näen, mitä salongin profiilista puuttuu?",
      a: "Avaa ”Asetukset” ja katso ”Profiilin valmiusaste” -korttia. Se listaa jokaisen puuttuvan kohdan ja ”Lisää”-painikkeen, joka vie oikeaan paikkaan täyttämään sen.",
    },
    {
      q: "Pitääkö Facebook, Instagram ja TikTok täyttää?",
      a: "Täytä vain kanavat, joita salonki oikeasti käyttää. Valmiusastekortissa on yksi kohta, ”Verkkosivu tai some”, ja mitä enemmän täytät, sitä helpommin asiakkaat löytävät sinut.",
    },
    {
      q: "Maksaako salongin profiilin viimeistely jotain?",
      a: "Ei maksa. VaraaAi on maksuton salonkiyrittäjille, ja profiilin kaikki osat esittelystä ja kansikuvasta logoon ja yhteystietoihin täytetään salonkitilisi ”Asetukset”-sivulla.",
    },
  ],
  related: ["dang-ky-salon", "dich-vu", "gio-mo-cua", "thanh-toan-chinh-sach"],
};

export default article;
