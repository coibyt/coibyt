import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/tien-ich-nhom/${name}.webp`;
const shot = (name: string) => `/wiki/tien-ich-nhom/fi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "salongin-henkilokunnan-perehdytys-ja-tiedotteet",
  lesson: "tien-ich-nhom",
  category: "salon",
  title: "Salongin henkilökunnan perehdytys: tiimichat, tiedotteet ja koko salongin koulutuskirjasto",
  metaTitle: "Henkilökunnan perehdytys salongissa: chat ja tiedotteet",
  metaDescription:
    "Näin salongin tiimi käyttää VaraaAin tiimin työtilaa: viestit tiimichatissa, kuitattavat tiedotteet ja pakolliset oppitunnit, joista näet ketkä ovat suorittaneet.",
  keyword: "salongin henkilökunnan perehdytys",
  keywords: [
    "uuden kynsiteknikon perehdytys",
    "salongin sisäinen chat",
    "talon säännöt henkilökunnalle",
    "salongin työohjeet",
    "tiedotteen lukukuittaus",
    "sisäinen viestintä salongissa",
    "pakollinen koulutus työntekijöille",
  ],
  excerpt: "Yksi yhteinen paikka omistajalle ja tiimille: ryhmächat, viralliset tiedotteet lukukuittauksella ja koulutuskirjasto, jonka työntekijät avaavat puhelimellaan.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("doi-ngu-tho-lam-viec-trong-salon-toc-lon"),
    alt: "Useat kampaajat työskentelevät asiakkaiden parissa tuolirivin äärellä suuressa salongissa, jossa on korkeat kaari-ikkunat ja kristallikruunut",
  },
  takeaways: [
    "Tiimin työtilassa on kolme pääosaa: **”Tiimichat”, ”Tiedotteet” ja ”Koulutus”**.",
    "**”Koko salonki”** -ryhmässä ovat valmiiksi kaikki jäsenet. Napauta ”Uusi keskustelu”, kun haluat viestiä yhden työntekijän kanssa kahden kesken.",
    "Tiedotteella on kolme tärkeysastetta, **”Tavallinen”, ”Tärkeä” ja ”Kiireellinen”**, ja sen voi kiinnittää ylös.",
    "Kytke päälle **”Pyydä kuittaus”**, niin näet, kuka on lukenut tiedotteen.",
    "Oppitunnissa voi olla vaiheet, YouTube-videolinkki ja liitetiedostoja. Kytke päälle **”Pakollinen”**, niin näet, ketkä ovat suorittaneet sen.",
  ],
  intro: [
    "Useimmissa salongeissa henkilökunnan perehdytys tapahtuu suullisesti: kokenut kollega näyttää uudelle kahden asiakkaan välissä, ja jokainen muistaa asian vähän eri tavalla. Työvuorojen muutokset ja uudet talon säännöt kulkevat samaa reittiä, joten isomman tiimin salongissa jokainen on helposti kuullut eri version.",
    "Tämä artikkeli seuraa VaraaAi Academyn oppituntia ”Tiimin työtila: chat, tiedotteet ja koulutus”. Opit käyttämään salongin tiimichattia, julkaisemaan virallisen tiedotteen ja näkemään, kuka on lukenut sen, kirjoittamaan oppitunnin koko tiimille ja seuraamaan, ketkä ovat käyneet sen.",
  ],
  sections: [
    {
      id: "miksi-yhteinen-paikka",
      title: "Miksi kasvava salonki tarvitsee sisäiselle viestinnälle yhden paikan",
      blocks: [
        { p: "Kolmen tai neljän hengen tiimi voi vielä puhua kasvokkain. Kun ihmisiä, vuoroja ja osa-aikaisia tulee lisää, ei ole enää hetkeä, jolloin kaikki olisivat salongissa yhtä aikaa. Omistaja kertoo asian aamulla, eikä iltavuoro kuule sitä koskaan. Viime viikolla aloittanut ei tiedä viime kuussa sovitusta säännöstä." },
        { p: "Moni salonki käyttää ryhmää henkilökohtaisessa viestisovelluksessa. Se toimii jonkin aikaa, kunnes kolme heikkoutta tulee esiin. Työviestit sekoittuvat yksityisiin. Tärkeä ilmoitus katoaa muutaman kymmenen viestin alle. Eikä kukaan tiedä varmasti, onko työkaveri lukenut sen." },
        { p: "VaraaAin tiimin työtila on koko tiimin yhteinen työtila, erillään henkilökohtaisista viesteistä. Se jakaa tiedon kolmeen lajiin, joilla jokaisella on oma paikkansa: arkinen keskustelu ”Tiimichatissa”, viralliset uutiset ”Tiedotteissa” ja ammattitaito ”Koulutuksessa”." },
        { img: { src: shot("tiimin-tyotila-salongin-tyotila"), alt: "Tiimin työtilan yleiskatsaus, jossa Salongin työtila -kortti on korostettu kultaisella ja siinä näkyy tiimin jäsenten määrä", caption: "Tiimin työtilan yleiskatsaus näyttää, montako jäsentä tiimissä on." } },
      ],
    },
    {
      id: "valmistelut",
      title: "Mitä valmistella ennen kuin koko tiimi ottaa työtilan käyttöön",
      blocks: [
        { p: "Tiimin työtilan yleiskatsauksesta näet, montako jäsentä tiimissäsi on. Jos luku ei vastaa salongin väkeä, käy ensin läpi ohje [henkilökunnan lisäämisestä ja käyttöoikeuksista](lesson:nhan-vien)." },
        { p: "Hyödyllisintä ennen aloittamista on sopia, millainen viesti menee minnekin. Alla oleva taulukko noudattaa sitä, miten oppitunti kuvaa kolme osaa:" },
        {
          table: {
            head: ["Tiedon laji", "Minne se kuuluu", "Miksi"],
            rows: [
              ["Päivän pikakysymykset, kuva asiakkaan toivomasta tyylistä", "”Tiimichat”", "Vaatii vastauksen heti, ja luettuna asia on hoidettu"],
              ["Työvuorot, talon säännöt, tapahtumat", "”Tiedotteet”", "Omistajan virallinen tieto, jonka pitää pysyä yhdessä paikassa"],
              ["Palvelun työohje, työvälineiden puhdistus", "”Koulutus”", "Käytössä pitkään, ja uusienkin pitää voida lukea se"],
            ],
          },
        },
        { note: "Sano koko salongille selvästi ensimmäisestä päivästä alkaen: mikä on julkaistu ”Tiedotteissa”, sen katsotaan olevan kaikkien tiedossa. Sopimus on reilu vain, jos todella julkaiset kaikki viralliset asiat siellä.", kind: "tip", title: "Yksi sopimus koko salongille" },
      ],
    },
    {
      id: "tiimichat",
      title: "Salongin sisäinen chat: mihin sitä käytetään",
      blocks: [
        { p: "”Tiimichatissa” on valmiina ”Koko salonki” -ryhmä, jossa jokainen jäsen on automaattisesti. Ketään ei tarvitse kutsua, eikä uusi tiimiläinen jää ulkopuolelle. Kirjoita viesti ja napauta lähetä, voit lähettää myös kuvia ja videoita." },
        { p: "Kuvat ja videot tekevät chatista hyödyllisen kauneusalalla. Kynsiteknikko jakaa juuri valmistuneet kynnet koko salongin nähtäväksi. Vastaanotto jakaa asiakkaan lähettämän mallikuvan ja kysyy, kuka osaa tehdä sen. Tällaisten keskustelujen pitää olla nopeita, eikä niitä tarvitse säilyttää pitkään." },
        { p: "”Uusi keskustelu” avaa kahdenkeskisen keskustelun yhden työntekijän kanssa. Käytä sitä asioihin, jotka koskevat vain yhtä ihmistä, kuten palautteeseen työvuorosta tai vuoronvaihtoon. Henkilökohtainen palaute kahden kesken on kohteliaisuus, jota jokainen salonki tarvitsee." },
        { img: { src: shot("kirjoita-viesti-tiimichatissa"), alt: "Tiimichatin näkymä, jossa viestikenttä tekstillä Muistakaa: tiimipalaveri maanantaina kello 9 on korostettu kultaisella ja oikealla on pyöreä lähetyspainike", caption: "Kirjoita viesti ja napauta oikealla olevaa lähetyspainiketta." } },
      ],
    },
    {
      id: "tiedotteet",
      title: "Tiedotteet henkilökunnalle: kolme tärkeysastetta, kiinnitys ja lukukuittaus",
      blocks: [
        { p: "”Tiedotteet” on omistajan virallisia uutisia varten: työvuorot, talon säännöt, tapahtumat. Chatista poiketen tiedotteella on otsikko ja tärkeysaste, ja se pysyy ilmoitustaululla, kunnes muokkaat tai poistat sen." },
        {
          table: {
            head: ["Tärkeys", "Ehdotettu käyttö (esimerkkejä)"],
            rows: [
              ["”Tavallinen”", "Hyvä tietää mutta ei kiireellinen, esimerkiksi salongin tapahtuma ensi kuussa"],
              ["”Tärkeä”", "Vaikuttaa kaikkien työvuoroihin, esimerkiksi pyhien työvuorot"],
              ["”Kiireellinen”", "Pitää tietää jo tänään, esimerkiksi salonki on yllättäen suljettu"],
            ],
          },
        },
        { p: "Oppitunti nimeää vain kolme tärkeysastetta, esimerkit ovat tämän artikkelin ehdotus. Muistettavaa on, että ”Kiireellistä” käytetään säästeliäästi. Jos kiireellinen tiedote tulee joka viikko, sana lakkaa toimimasta." },
        { img: { src: shot("julkaistu-tiedote-tarkea-kiinnitetty"), alt: "Ilmoitustaulu, jossa tiedote Jouluviikon työvuorot on korostettu kultaisella, merkinnät Tärkeä ja Kiinnitetty ja teksti aukioloajoista 21.–24.12.", caption: "Videon esimerkkitiedote: jouluviikon työvuorot, tärkeysaste ”Tärkeä” ja kiinnitetty ylös." } },
        { p: "Tärkeysasteen alla on kaksi kytkintä, jotka ratkaisevat, miten tiedotetta kohdellaan. ”Kiinnitä ylös” pitää sen ilmoitustaulun ylimpänä. ”Pyydä kuittaus” näyttää, kuka on lukenut sen: työntekijät napauttavat kuitatakseen lukeneensa ja ymmärtäneensä, ja sinä näet ketkä ovat kuitanneet. Kytke se päälle talon sääntöjen ja vuoromuutosten kohdalla. Se korvaa kysymyksen, jonka muuten esittäisit jokaiselle erikseen: oletko lukenut?" },
        { p: "Tiedotteeseen voi liittää myös kuvia, videoita ja asiakirjoja, esimerkiksi työvuorolistan kuvana." },
      ],
    },
    {
      id: "koulutuskirjasto",
      title: "Salongin koulutuskirjasto: näin kirjoitat perehdytysoppitunnin",
      blocks: [
        { p: "”Koulutus” on salongin oma kirjasto. Jokaisella oppitunnilla on nimi, aihe, kirjoitetut vaiheet ja halutessasi YouTube-videolinkki tai liitetiedostoja. Työntekijät avaavat sen ja opiskelevat puhelimella milloin tahansa." },
        { img: { src: shot("koulutuskirjasto-oppituntikortti"), alt: "Koulutuskirjasto, jossa oppituntikortti Geelimanikyyrin työohje on korostettu kultaisella, aiheena Palvelutekniikat ja kestona 10 min", caption: "Tallennettu oppitunti näkyy kirjastossa korttina aiheineen ja kestoineen." } },
        { p: "Kun kirjoitat oppitunnin, valitset aiheen. Videossa aiheet ovat Palvelutekniikat, Hygienia & turvallisuus, Asiakaspalvelu, Tuotteet, Talon säännöt, Myynti ja Muut. Lista muistuttaa samalla hyvin siitä, mistä salongilla kannattaa olla oppitunteja." },
        { p: "Käyttökelpoinen oppitunti on yleensä lyhyt ja etenee siinä järjestyksessä, jossa kädet oikeasti työskentelevät. Muutama vinkki:" },
        {
          ul: [
            "**Yksi tehtävä oppituntia kohti.** Yhden palvelun työohje on yksi oppitunti, työpisteen siistiminen asiakkaan jälkeen toinen.",
            "**Kirjoita numeroidut vaiheet**, jokaisessa yksi toimenpide, niin kuin haluat jokaisen tekijän salongissasi toimivan.",
            "**Kerro syy** niissä vaiheissa, jotka jäävät helposti tekemättä. Kun ymmärtää miksi, oikoo vähemmän.",
            "**Lisää video, kun liikettä on vaikea kuvata sanoin.** Liitä YouTube-linkki videokenttään.",
          ],
        },
        { p: "Kaikkea ei tarvitse kirjoittaa alusta. [VaraaAi Academyn](/academy) ammattioppitunnit sopivat salongin omien työohjeiden pohjaksi, esimerkiksi [geelilakkauksen ohje](lesson:son-gel) tekniikkaan ja [työvälineiden desinfiointi](lesson:ve-sinh-dung-cu) hygieniaan. Muokkaa ne salongin tuotteiden ja työtapojen mukaisiksi." },
        { note: "Kytke ”Pakollinen” päälle oppitunneille, jotka jokaisen työntekijän pitää käydä, kuten hygienia ja turvallisuus. Silloin näet, ketkä ovat suorittaneet ne. Älä tee jokaisesta oppitunnista pakollista, sillä kun kaikki on pakollista, mikään ei ole etusijalla.", kind: "info", title: "Mitkä oppitunnit pakollisiksi" },
      ],
    },
    {
      id: "arjen-tilanteet",
      title: "Tavallisia tilanteita tiimin työtilassa",
      blocks: [
        {
          table: {
            head: ["Tilanne", "Mitä teet"],
            rows: [
              ["Tärkeä tiedote painuu uudempien alle", "Kytke tiedotteelle ”Kiinnitä ylös”"],
              ["Et ole varma, kuka on lukenut uudet talon säännöt", "Kytke julkaistessa päälle ”Pyydä kuittaus”"],
              ["Haluat puhua yhden ihmisen kanssa kahden kesken", "Napauta ”Tiimichatissa” ”Uusi keskustelu”"],
              ["Uusi tekijä ei vielä tunne salongin työohjeita", "Näytä hänelle ”Koulutus” ja kytke ”Pakollinen” päälle ensin käytäville oppitunneille"],
              ["Liikettä on vaikea selittää sanoin", "Liitä oppituntiin YouTube-videolinkki"],
            ],
          },
        },
        { p: "Tiimin työtilan kolme osaa tukevat salongin muitakin töitä. Kun otat käyttöön [salongin varaston](lesson:kho-hang), lyhyt oppitunti sisään- ja ulosskannauksesta auttaa kaikkia tekemään sen samalla tavalla. Kun muutat tapaa, jolla [työntekijät raportoivat tulonsa](lesson:doanh-thu-nhan-vien), kuitattava tiedote varmistaa, ettei kukaan voi sanoa olleensa tietämätön." },
      ],
    },
  ],
  howTo: {
    title: "Henkilökunnan perehdytys, chat ja tiedotteet VaraaAissa vaihe vaiheelta",
    id: "tiimin-tyotilan-vaiheet",
    after: "valmistelut",
    lead: "Seitsemän vaihetta käyvät läpi tiimin työtilan kolme osaa oppituntivideon järjestyksessä.",
    steps: [
      {
        name: "Avaa ”Tiimi”",
        text: "Napauta hallintapaneelissa ”Tiimi”. Yleiskatsauksesta näet tiimin jäsenmäärän ja kolme pääosaa: ”Tiimichat”, ”Tiedotteet” ja ”Koulutus”. Avaa kukin osa napauttamalla sitä.",
      },
      {
        name: "Avaa ”Tiimichat” ja ”Koko salonki” -ryhmä",
        text: "Napauta ”Tiimichat”. ”Koko salonki” -ryhmässä ovat valmiiksi kaikki jäsenet, joten ryhmää ei tarvitse luoda eikä ketään kutsua. Avaa keskustelu napauttamalla ryhmää.",
        image: { src: shot("tiimichat-koko-salonki-uusi-keskustelu"), alt: "Tiimichat-osio, jossa Koko salonki -ryhmä on korostettu kultaisella, yläpuolella hakukenttä ja Uusi keskustelu -painike" },
      },
      {
        name: "Kirjoita viesti ja napauta lähetä",
        text: "Kirjoita viesti viestikenttään ja napauta lähetä. Voit lähettää myös kuvia ja videoita. Kun haluat viestiä yhden työntekijän kanssa kahden kesken, palaa listaan ja napauta ”Uusi keskustelu”.",
      },
      {
        name: "Napauta ”Kirjoita tiedote” ja kirjoita sisältö",
        text: "Napauta ”Tiedotteissa” ”Kirjoita tiedote”. Kirjoita otsikko ja viesti. Tee otsikosta sellainen, että siitä näkee heti, mistä on kyse, sillä moni lukee ensin vain otsikon.",
        image: { src: shot("kirjoita-tiedote-otsikko-ja-viesti"), alt: "Kirjoita tiedote -ikkuna, jossa otsikko Jouluviikon työvuorot ja viesti on korostettu kultaisella, alla kolme tärkeysastetta" },
      },
      {
        name: "Valitse tärkeys, kiinnitys ja kuittaus ja napauta ”Julkaise tiedote”",
        text: "Valitse tärkeys: ”Tavallinen”, ”Tärkeä” tai ”Kiireellinen”. Kytke ”Kiinnitä ylös”, jos tiedotteen pitää pysyä ilmoitustaulun ylimpänä, ja ”Pyydä kuittaus”, jos haluat tietää, kuka on lukenut sen. Napauta sitten ”Julkaise tiedote”.",
        image: { src: shot("kiinnita-ylos-pyyda-kuittaus"), alt: "Tärkeysasteet Tavallinen, Tärkeä ja Kiireellinen sekä kultaisella korostetut kytkimet Kiinnitä ylös ja Pyydä kuittaus, alla Julkaise tiedote" },
      },
      {
        name: "Napauta ”Lisää oppitunti”, anna nimi ja aihe ja kirjoita vaiheet",
        text: "Napauta ”Koulutuksessa” ”Lisää oppitunti”. Anna oppitunnille nimi, valitse aihe ja kirjoita vaiheet tai liitä YouTube-linkki. Kirjoita ne salongin todellisessa työjärjestyksessä, niin uusi tekijä pystyy seuraamaan niitä heti.",
        image: { src: shot("lisaa-oppitunti-aihe-ja-vaiheet"), alt: "Uuden oppitunnin lomake: aiheet Palvelutekniikat valittuna, YouTube-video-kenttä ja geelimanikyyrin työohjeen ensimmäiset numeroidut vaiheet" },
      },
      {
        name: "Kytke tarvittaessa ”Pakollinen” ja napauta ”Tallenna oppitunti”",
        text: "Kytke ”Pakollinen” päälle, jos jokaisen työntekijän pitää käydä oppitunti, niin näet, ketkä ovat suorittaneet sen. Napauta ”Tallenna oppitunti”, ja työntekijät voivat avata sen puhelimellaan milloin tahansa.",
        image: { src: shot("pakollinen-oppitunti-nakyy-henkilokunnalle"), alt: "Pakollinen-kytkin korostettuna kultaisella selitteineen, alla Näkyy henkilökunnalle -kytkin, kesto minuutteina ja Tallenna oppitunti -painike" },
      },
    ],
  },
  faq: [
    {
      q: "Mistä osista VaraaAin tiimin työtila koostuu?",
      a: "Kolme pääosaa ovat ”Tiimichat”, ”Tiedotteet” ja ”Koulutus”. Se on salongin yhteinen työtila omistajalle ja henkilökunnalle, jossa tiimi keskustelee, saa tiedotteet ja opiskelee.",
    },
    {
      q: "Miten näen, ketkä työntekijät ovat lukeneet tiedotteen?",
      a: "Kytke tiedotetta kirjoittaessasi päälle ”Pyydä kuittaus”. Työntekijät kuittaavat luettuaan, ja sinä näet ketkä ovat kuitanneet.",
    },
    {
      q: "Kuuluvatko työvuorot ja talon säännöt chattiin vai tiedotteisiin?",
      a: "”Tiedotteisiin”. Ne on tarkoitettu omistajan virallisille uutisille, kuten työvuoroille, talon säännöille ja tapahtumille. Voit valita tärkeysasteen ja kiinnittää tiedotteen ylös, jottei se huku.",
    },
    {
      q: "Mitä perehdytysoppitunti voi sisältää?",
      a: "Kirjoitetut vaiheet, YouTube-videolinkin ja liitetiedostoja. Työntekijät avaavat oppitunnin ja opiskelevat puhelimellaan milloin tahansa.",
    },
    {
      q: "Miten tiedän, kuka on käynyt oppitunnin?",
      a: "Kytke oppituntia kirjoittaessasi päälle ”Pakollinen”. Siitä tulee oppitunti, joka jokaisen työntekijän pitää käydä, ja näet, ketkä ovat suorittaneet sen.",
    },
    {
      q: "Miten viestin yhden työntekijän kanssa kahden kesken?",
      a: "Napauta ”Tiimichatissa” ”Uusi keskustelu”, niin avautuu kahdenkeskinen keskustelu tämän ihmisen kanssa. ”Koko salonki” -ryhmä on viesteille, jotka menevät kaikille jäsenille.",
    },
  ],
  related: ["nhan-vien", "kho-hang", "chi-nhanh", "doanh-thu-nhan-vien"],
};

export default article;
