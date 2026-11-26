import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/chat-voi-salon/${name}.webp`;
const shot = (name: string) => `/wiki/chat-voi-salon/fi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "viesti-salongille",
  lesson: "chat-voi-salon",
  category: "booking",
  title: "Viesti salongille VaraaAissa: kysy hintaa ja vapaita aikoja soittamatta",
  metaTitle: "Viesti salongille: kysy hintaa ja vapaita aikoja | VaraaAi",
  metaDescription:
    "Näin lähetät viestin salongille VaraaAissa: paina Keskustele salongin kanssa, kirjoita kysymys, liitä kuva mallista, lue vastaus ja löydä keskustelut Viesteistä.",
  keyword: "viesti salongille",
  keywords: [
    "keskustele salongin kanssa",
    "kysy hintaa kynsistudiosta",
    "onko kampaamossa vapaita aikoja",
    "lähetä kuva kynsimallista",
    "vanhat viestit salongin kanssa",
    "VaraaAi viestit",
  ],
  excerpt: "Paina salongin sivulla ”Keskustele salongin kanssa”, kysy hinnoista tai vapaista ajoista, liitä kuva haluamastasi tyylistä ja löydä vastaukset kohdasta ”Viestit”.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-nhan-tin-cho-salon-lam-dep-tren-dien-thoai"),
    alt: "Nuori nainen, jolla on pitkät aaltoilevat hiukset ja kermanvärinen neule, istuu sohvalla ikkunan vieressä ja kirjoittaa hymyillen puhelimellaan",
  },
  takeaways: [
    "**”Keskustele salongin kanssa”** -painike on jokaisen salongin sivulla heti ”Varaa aika” -painikkeen vieressä.",
    "Kirjoita kysymyksesi viestikenttään ”Kirjoita viesti...” ja paina lähetä. Salonki vastaa samassa keskusteluikkunassa.",
    "Voit **liittää kuvan**, esimerkiksi kynsimallista, josta pidät, niin salonki osaa neuvoa ja hinnoitella tarkemmin.",
    "Kaikki keskustelut säilyvät kohdassa **”Viestit”**: avaa se napauttamalla nimeäsi ylhäällä.",
    "Chat on kysymyksiä varten. Ajan varaat edelleen ”Varaa aika” -painikkeella ja valitsemalla kellonajan.",
  ],
  intro: [
    "Moni kysymys ennen kauneushoitoa ei ole puhelun arvoinen: onko lauantai-iltapäivänä vapaata, mitä tämä kynsimalli maksaa, pitääkö vanha geeli poistaa ensin. VaraaAissa lähetät viestin salongille suoraan sen sivulla, voit liittää kuvan haluamastasi tyylistä ja luet vastauksen, kun sinulle sopii.",
    "Tämä ohje seuraa VaraaAi Academyn oppituntia ”Viestittele salongin kanssa”. Opit, missä chat-painike on, miten kirjoitat viestin, johon salonki voi vastata heti, ja mistä löydät vanhat keskustelusi kohdasta ”Viestit”.",
  ],
  sections: [
    {
      id: "milloin-viesti",
      title: "Milloin viesti on puhelua parempi",
      blocks: [
        { p: "Puhelussa on kaksi hankaluutta. Asiakasta hoitava tekijä ei pääse helposti vastaamaan, eikä haluamaasi tyyliä voi näyttää äänellä. Viesti ratkaisee molemmat: salonki vastaa, kun kädet vapautuvat, ja yksi kuva kertoo enemmän kuin monta lausetta." },
        { p: "Oppitunti mainitsee asiat, joista asiakkaat kysyvät useimmin:" },
        {
          ul: [
            "**Vapaat ajat:** pääseekö salonkiin sinä päivänä ja siihen aikaan, jota ajattelit.",
            "**Hinnat:** mitä tietty kynsimalli, hiustenleikkuu tai hoito maksaa.",
            "**Tiedot ennen käyntiä:** asiat, jotka haluat salongin tietävän ennen varattua aikaa.",
          ],
        },
        { note: "Kirjaudu sisään ennen kuin aloitat. ”Viestit”, jonne keskustelut tallentuvat, on osa tiliäsi. Jos sinulla ei vielä ole tiliä, katso ohje [luo tili ja kirjaudu](lesson:tai-khoan). Se vie noin minuutin ja on maksutonta.", kind: "info", title: "Ennen kuin aloitat" },
      ],
    },
    {
      id: "hyva-viesti",
      title: "Näin kirjoitat viestin, johon salonki voi vastata heti",
      blocks: [
        { p: "Viesti ”paljonko tämä maksaa?” ilman kuvaa tuo yleensä salongilta takaisin kolme tai neljä tarkentavaa kysymystä. Säästät molempien aikaa, kun kerrot olennaiset tiedot jo ensimmäisessä viestissä." },
        {
          table: {
            head: ["Haluat kysyä", "Kerro samalla"],
            rows: [
              ["Onko vapaata aikaa", "Palvelu, päivä ja suunnilleen milloin pääset"],
              ["Kynsimallin hinta", "Kuva mallista ja millaiset kyntesi ovat nyt: omat vai onko niissä vanhaa geeliä tai akryylia poistettavaksi"],
              ["Leikkauksen tai värin hinta", "Kuva toivomastasi tyylistä ja nykyisistä hiuksistasi sekä onko hiuksia vaalennettu tai värjätty aiemmin"],
              ["Ripsienpidennykset tai ripsien kestotaivutus", "Kuva toivomastasi lopputuloksesta ja onko sinulla vielä vanhoja pidennyksiä"],
              ["Tiedot ennen käyntiä", "Mitä salongin pitää tietää: herkkä iho tai silmät, tulet pienen lapsen kanssa tai sinun pitää olla valmis tiettyyn aikaan mennessä"],
            ],
          },
        },
        { note: "Kuvan liittäminen haluamastasi tyylistä on oppitunnin tärkein vinkki. Sama nimi, kuten ”cat eye -kynnet” tai ”kerrostettu leikkaus”, tarkoittaa eri ihmisille eri asioita, mutta kuvan voi ymmärtää vain yhdellä tavalla. Kuvan perusteella salonki neuvoo ja hinnoittelee tarkemmin.", kind: "tip", title: "Yksi kuva monen sanan sijaan" },
      ],
    },
    {
      id: "viestit",
      title: "Viestit: täällä keskustelusi salonkien kanssa säilyvät",
      blocks: [
        { p: "Vastausta ei tarvitse etsiä jokaisen salongin sivulta erikseen. Napauta nimeäsi ylhäällä ja valitse ”Viestit”: kaikki keskustelusi salonkien kanssa ovat siellä, yksi rivi salonkia kohden, ja rivillä näkyy viimeisin viesti." },
        { img: { src: shot("viestit-keskustelut-salonkien-kanssa"), alt: "VaraaAin Viestit-sivu, jossa Lumi Beauty Paris -salongin keskustelu on korostettu kultaisella ja rivillä näkyy viimeisin viesti lauantain kello 14 ajasta", caption: "Jokainen salonki, jolle olet kirjoittanut, on yksi rivi kohdassa ”Viestit”." } },
        { p: "Viestit on hyödyllisimmillään käyntipäivänä. Avaa keskustelu uudelleen, niin sinulla on salongin antama hinta, sen ehdottama aika ja lähettämäsi kuva valmiina näytettäväksi tekijälle." },
      ],
    },
    {
      id: "chat-viesti-vai-puhelu",
      title: "Chat, viesti varauksessa vai puhelu: kumpi ja milloin",
      blocks: [
        {
          table: {
            head: ["Tilanne", "Paras tapa"],
            rows: [
              ["Et ole vielä varma varaamisesta ja haluat ensin kysyä hintaa tai aikoja", "Paina salongin sivulla ”Keskustele salongin kanssa”"],
              ["Olet valinnut palvelun ja ajan ja haluat vain lisätä yhden asian", "Kirjoita se varauksen tietovaiheessa kenttään ”Viesti salongille (valinnainen)”"],
              ["Haluat salongin näkevän mallin ennen hinta-arviota", "Kirjoita chatissa ja liitä kuva"],
              ["Kiireellinen asia samana päivänä, esimerkiksi myöhästyt", "Soita salongin sivulla tai kohdassa ”Näytä varauksen tiedot” olevaan numeroon"],
              ["Peruutusaika on umpeutunut ja sinun pitää perua tai siirtää aika", "Ota yhteyttä suoraan salonkiin puhelimella tai viestillä"],
            ],
          },
        },
        { p: "Se, kuinka nopeasti salonki vastaa, riippuu salongista ja siitä, kuinka kiireistä siellä on. Kun asia on minuuteista kiinni, puhelin on yhä varmempi." },
      ],
    },
    {
      id: "vastauksen-jalkeen",
      title: "Kun salonki on vastannut",
      blocks: [
        { p: "Viesti ei varaa sinulle aikaa. Kun salonki kertoo, että vapaata on, sulje keskustelu ja paina heti vieressä olevaa ”Varaa aika” -painiketta. Valitse palvelu, tekijä, päivä ja kellonaika kuten ohjeessa [ajanvaraus netissä](lesson:dat-lich-online). Varaus näkyy sen jälkeen kohdassa [Varaukseni](lesson:lich-hen-cua-toi), jossa voit tarkistaa sen tai perua sen itse." },
        { p: "Jos aiot palata samaan salonkiin, [seuraa salonkia](lesson:theo-doi-salon), niin sen tarjoukset ja uudet tyylit näkyvät syötteessäsi." },
        { note: "Salongit vastaavat asiakkaille hallintapaneelin viestiosiossa, jossa on valmiita vastauksia ja tekoälyavustaja, joka voi vastata poissaolon aikana. Katso oppitunti [Viestit ja tekoälyavustaja](lesson:tin-nhan-ai).", kind: "info", title: "Omistatko salongin?" },
      ],
    },
  ],
  howTo: {
    title: "Viesti salongille VaraaAissa vaihe vaiheelta",
    id: "viestin-vaiheet",
    after: "milloin-viesti",
    lead: "Kuusi vaihetta, joista kuvan liittäminen on vapaaehtoinen. Lainausmerkeissä olevat nimet näet näytöllä.",
    steps: [
      {
        name: "Avaa salongin sivu ja paina ”Keskustele salongin kanssa”",
        text: "Etsi salonki [hakusivulta](/search) ja avaa sen sivu. Salongin nimen, osoitteen ja puhelinnumeron alla on rivi painikkeita: ”Keskustele salongin kanssa” on heti ”Varaa aika” -painikkeen alla. Paina sitä, niin keskusteluikkuna aukeaa.",
        image: { src: shot("keskustele-salongin-kanssa-painike"), alt: "Lumi Beauty Paris -salongin sivu VaraaAissa, jossa Keskustele salongin kanssa -painike on korostettu kultaisella mustan Varaa aika -painikkeen alla" },
      },
      {
        name: "Kirjoita kysymyksesi viestikenttään",
        text: "Kirjoita kysymys niin tarkasti kuin voit: mikä palvelu, mikä päivä ja suunnilleen mihin aikaan. Oppitunnin videolla asiakas kysyy, onko geelimanikyyriin vapaata lauantai-iltapäivänä.",
        image: { src: shot("kirjoita-kysymys-viestikenttaan"), alt: "Keskusteluikkuna salongin sivulla, viestikenttä on korostettu kultaisella ja siihen kirjoitetaan kysymystä ripsien kestotaivutuksen varaamisesta" },
      },
      {
        name: "Liitä kuva, jos siitä on apua",
        text: "Kuvan liitepainike on viestikentän vasemmalla puolella. Lähetä sillä kynsimalli, kampaus tai ripsityyli, josta pidät. Kuvan avulla salonki hinnoittelee tarkemmin, eikä sinun tarvitse kuvailla sitä sanoin.",
        image: { src: shot("liita-kuva-painike"), alt: "Keskusteluikkuna, jossa viestikentän vasemmalla puolella oleva paperiliittimen muotoinen liitepainike on korostettu kultaisella" },
      },
      {
        name: "Paina lähetä",
        text: "Lähetä-painike on viestikentän oikealla puolella oleva pyöreä painike, jossa on nuoli. Paina sitä kerran, niin viestisi näkyy keskustelussa.",
        image: { src: shot("laheta-viesti-salongille"), alt: "Keskusteluikkuna VaraaAissa, jossa viestikentän oikealla puolella oleva pyöreä nuolipainike on korostettu kultaisella" },
      },
      {
        name: "Lue salongin vastaus",
        text: "Kun salonki vastaa, vastaus näkyy heti keskustelussa viestisi alapuolella. Jos jokin jäi auki, kysy lisää samassa ikkunassa.",
        image: { src: shot("salongin-vastaus-keskustelussa"), alt: "Keskustelu Lumi Beauty Paris -salongin kanssa, jossa kultaisella korostettu vastaus kertoo, että lauantaille voi varata kello 14" },
      },
      {
        name: "Löydä keskustelu kohdasta ”Viestit”",
        text: "Kun haluat lukea viestit myöhemmin, napauta nimeäsi sivun yläreunassa ja valitse ”Viestit”. Avaa koko keskustelu uudelleen painamalla salongin riviä.",
        image: { src: shot("avaa-viestit-tilivalikosta"), alt: "VaraaAin Viestit-sivu, jossa oikean yläkulman tilipainike on korostettu kultaisella ja alla näkyy keskusteluluettelo" },
      },
    ],
  },
  faq: [
    {
      q: "Missä ”Keskustele salongin kanssa” -painike on?",
      a: "Jokaisen salongin sivulla VaraaAissa, heti ”Varaa aika” -painikkeen yhteydessä. Jokaisella salongilla on oma chat-painikkeensa, joten avaa sen salongin sivu, jolta haluat kysyä, ja paina painiketta siellä.",
    },
    {
      q: "Maksaako viestin lähettäminen salongille VaraaAissa jotain?",
      a: "Ei maksa. VaraaAi on asiakkaalle maksuton, myös salonkien haku, ajanvaraus ja viestit salongeille.",
    },
    {
      q: "Voinko lähettää salongille kuvan haluamastani tyylistä?",
      a: "Voit. Viestikentän vasemmalla puolella on painike kuvan liittämiseen. Kuva kynsimallista, kampauksesta tai ripsityylistä auttaa salonkia neuvomaan ja hinnoittelemaan tarkemmin.",
    },
    {
      q: "Mistä näen vanhat viestini salongin kanssa?",
      a: "Napauta nimeäsi sivun yläreunassa ja valitse ”Viestit”. Kaikki keskustelusi salonkien kanssa ovat siellä.",
    },
    {
      q: "Jos kysyin vapaata aikaa viestillä, pitääkö minun silti varata?",
      a: "Pitää. Viestit ovat vain kysymistä ja sopimista varten. Varaa aika painamalla salongin sivulla ”Varaa aika”, valitse palvelu sekä vapaa päivä ja kellonaika ja vahvista.",
    },
    {
      q: "Mistä näen salongin vastauksen?",
      a: "Vastaus näkyy suoraan avoinna olevassa keskusteluikkunassa. Jos olet jo poistunut sivulta, avaa tililtäsi ”Viestit” ja lue vastaus sieltä.",
    },
  ],
  related: ["lich-hen-cua-toi", "viet-danh-gia", "dat-lich-online", "theo-doi-salon"],
};

export default article;
