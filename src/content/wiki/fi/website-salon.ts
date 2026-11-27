import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/website-salon/${name}.webp`;
const shot = (name: string) => `/wiki/website-salon/fi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "ilmaiset-verkkosivut-kampaamolle",
  lesson: "website-salon",
  category: "marketing",
  title: "Ilmaiset verkkosivut kampaamolle: 8 vaihetta omiin sivuihin, joilla on varauspainike",
  metaTitle: "Ilmaiset verkkosivut kampaamolle: 8 vaihetta ja varaus",
  metaDescription:
    "Näin kampaamon, kynsistudion tai kauneushoitolan omistaja tekee omat verkkosivut VaraaAissa: värit, pääosio, osiot päälle, esikatselu ja julkaisu.",
  keyword: "ilmaiset verkkosivut kampaamolle",
  keywords: [
    "kotisivut kauneushoitolalle",
    "verkkosivut kynsistudiolle",
    "kotisivut ilman suunnittelijaa",
    "kampaamon kotisivut ajanvarauksella",
    "salongin aloitussivu",
    "verkkosivujen julkaisu",
    "mitä kampaamon etusivulle kirjoitetaan",
  ],
  excerpt: "Valitse värimaailma, kirjoita pääosioon muutama rivi, kytke haluamasi osiot päälle ja julkaise. Palvelut, tiimi ja arvostelut tulevat valmiista tiedoista.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-toc-tao-kieu-cho-khach-trong-salon-co-dien"),
    alt: "Valkoiseen takkiin pukeutunut kampaaja muotoilee korkean ikkunan vieressä istuvan vaaleahiuksisen asiakkaan hiuksia salongissa, jossa on kullatut peilit ja kattokruunu",
  },
  takeaways: [
    "Salongin verkkosivut ovat hallintapaneelin kohdassa **”Aloitussivu”**. Teet ne itse, eikä suunnittelijaa tarvita.",
    "Valitse tyyli kohdassa **”Sivun värit”**, niin koko sivu vaihtaa värit kerralla.",
    "**”Automaattinen”**-osiot (palvelut, tiimi, arvostelut) käyttävät salongin olemassa olevia tietoja, joten mitään ei kirjoiteta kahdesti.",
    "Niin kauan kuin sivu on **luonnos**, asiakkaat eivät näe sitä. Vasta kun kytket **”Julkaise”** päälle, kuka tahansa voi avata sen.",
    "Paina ”Kopioi linkki” ja lähetä sivun osoite asiakkaille tai lisää se Facebookiin, Instagramiin ja Google Mapsiin.",
  ],
  intro: [
    "Moni salongin omistaja haluaisi ilmaiset verkkosivut kampaamolle, mutta pysähtyy ensimmäiseen kysymykseen: kuka sivut tekee ja kuka päivittää ne aina, kun hinnat muuttuvat. VaraaAia käyttävällä salongilla vastaus on jo hallintapaneelissa. Palvelut, työntekijät ja arvostelut kootaan sivuiksi, joilla on varauspainike, ja sinulle jää värien valinta ja lyhyen esittelyn kirjoittaminen.",
    "Tämä artikkeli seuraa VaraaAi Academyn oppituntia ”Salongin omat verkkosivut”. Valitset värimaailman, kirjoitat pääosion, päätät mitkä osiot etusivulla näkyvät ja julkaiset sivut ja lähetät linkin asiakkaille.",
  ],
  sections: [
    {
      id: "miksi-omat-sivut",
      title: "Miksi kampaamo, kynsistudio tai hoitola tarvitsee omat verkkosivut",
      blocks: [
        { p: "Uusi asiakas katsoo salongin yleensä netistä ennen kuin astuu ovesta. Hän haluaa tietää, miltä paikka näyttää, mitä siellä tehdään, mitä se maksaa ja mitä muut sanovat. Somesivu vastaa osaan, mutta tiedot ovat hajallaan vanhoissa julkaisuissa. Verkkosivu kokoaa kaiken yhteen osoitteeseen." },
        { p: "Oppitunnin sivuilla näkyvät salongin nimi, esittely, hinnasto, tiimi, arvostelut ja ”Varaa aika” -painike, joka pysyy aina näkyvissä. Asiakas lukee sivun ja varaa saman tien ilman puhelua tai viestiä." },
        { img: { src: shot("salongin-verkkosivu-puhelimessa"), alt: "Lumi Beauty Paris -salongin verkkosivu puhelimessa, jossa iso otsikko Hienostunutta kauneutta Pariisin sydämessä on korostettu kultaisella esittelyn yllä", caption: "Asiakkaan näkemä sivu: salongin nimi ylhäällä, otsikko, esittely ja varauspainike." } },
        { p: "Ketään ei tarvitse palkata. Kaikki tehdään yhdellä hallintapaneelin sivulla, ja VaraaAi on maksuton salongin omistajalle." },
      ],
    },
    {
      id: "valmistelu",
      title: "Mitä tarvitset ennen kuin teet salongille kotisivut",
      blocks: [
        { p: "Suurin osa sivujen sisällöstä tulee siitä, mitä salongilla jo on. Ennen kuin avaat ”Aloitussivu”-kohdan, tarkista kolme valmista asiaa ja valmistele kolme, jotka kirjoitat itse:" },
        {
          table: {
            head: ["Mitä tarvitaan", "Mistä se tulee"],
            rows: [
              ["Palvelut hintoineen", "Kirjattu kohtaan ”Palvelut”. Sivu hakee ne itse"],
              ["Tiimi: kuva, nimi ja titteli", "Salongin työntekijälistasta"],
              ["Asiakasarvostelut", "Hyväksytyt arvostelut ja keskiarvo"],
              ["Otsikko ja muutama rivi esittelyä", "Kirjoitat ne pääosioon"],
              ["Liukuvat kuvat, enintään 5", "Kuvat salongista tai parhaista töistä, lataat itse"],
              ["Painikkeen teksti", "Asetat sen kohtaan ”Painikkeen teksti”, esimerkiksi Varaa aika"],
            ],
          },
        },
        { p: "Jos palveluvalikko on vielä tyhjä tai työntekijöillä ei ole kuvia, tee ne ensin. Katso ohjeet [salongin palveluista ja hinnoista](lesson:dich-vu) ja [salongin henkilökunnasta](lesson:nhan-vien). Myös palvelujen järjestys kannattaa tarkistaa, koska ”Suosituimmat palvelut” näyttää 6 ensimmäistä palvelua siinä järjestyksessä, johon vedit ne." },
      ],
    },
    {
      id: "sivun-varit",
      title: "Valitse salongin tyyliin sopivat sivun värit",
      blocks: [
        { p: "Kohdassa ”Sivun värit” on viisi tyyliä. Kun napautat yhtä, koko sivu vaihtaa värit kerralla, joten kokeile jokaista ja katso, mikä muistuttaa eniten salonkiasi. Jokaisella värisarjalla on näytöllä lyhyt kuvaus:" },
        {
          table: {
            head: ["Värisarja", "Kuvaus näytöllä"],
            rows: [
              ["Ruusu", "Pehmeä ja naisellinen"],
              ["Samppanja", "Tyylikäs ja lämmin"],
              ["Musta & kulta", "Ylellinen ja vahva"],
              ["Smaragdi", "Luonnollinen ja hienostunut"],
              ["Laventeli", "Moderni ja hillitty"],
            ],
          },
        },
        { img: { src: shot("viisi-varisarjaa-verkkosivulle"), alt: "Sivun värisarjat, joista ylhäällä Ruusu ja Samppanja ja alla kultaisella korostettuina Musta & kulta, Smaragdi ja Laventeli" } },
        { note: "Valitse värisarja, joka on lähimpänä salongin todellisia värejä: seiniä, tuoleja ja logoa. Kun asiakas katsoo sivut ja tulee sitten sisään, hän tunnistaa paikan, jonka juuri näki puhelimessaan.", kind: "tip", title: "Valitse salongin mukaan, ei oman maun" },
      ],
    },
    {
      id: "paaosio",
      title: "Mitä kampaamon etusivun pääosioon kirjoitetaan",
      blocks: [
        { p: "”Pääosio” on asiakkaan ensivaikutelma. Siinä on asettelu, kolme tekstikenttää, liukuvat kuvat ja painike. Tekstikentillä on kolme eri tehtävää:" },
        {
          table: {
            head: ["Kenttä", "Mitä kirjoitat", "Esimerkki oppituntivideossa"],
            rows: [
              ["”Pieni teksti otsikon yllä”", "Salongin tyyppi ja paikkakunta", "Nail & Lash Studio · Paris"],
              ["”Otsikko”", "Lyhyt lause siitä, mitä salonki tarjoaa", "Hienostunutta kauneutta Pariisin sydämessä"],
              ["”Teksti”", "Kaksi lausetta: mitä teet, millainen tila on ja miten varataan", "Kynnet, ripset ja ihonhoito rauhallisessa, ylellisessä ympäristössä. Varaa aika verkossa alle minuutissa."],
            ],
          },
        },
        { img: { src: shot("pieni-teksti-otsikko-ja-teksti"), alt: "Pääosion kentät Pieni teksti otsikon yllä, Otsikko ja Teksti esimerkkiteksteineen korostettuna kultaisella, alla Liukuvat kuvat (enintään 5)" } },
        { p: "”Asettelu”-kohdassa on neljä vaihtoehtoa: ”Koko näytön kuva”, ”Kuva oikealla”, ”Kuva vasemmalla” ja ”Vain teksti”. Jos sinulla on hyviä kuvia salongista, anna kuvan viedä tilaa. Jos mieluista kuvaa ei vielä ole, aloita vaihtoehdolla ”Vain teksti” ja vaihda myöhemmin." },
        { p: "”Liukuvat kuvat (enintään 5)” ottaa enintään viisi kuvaa, jotka vaihtuvat etusivulla automaattisesti. Näytön vihjeen mukaan, jos yhtään kuvaa ei ole ladattu, näytetään oletuskuva. Salongin omat kuvat ovat uskottavampia, joten vaihda ne heti kun voit." },
        { p: "Osion lopussa ovat ”Painikkeen teksti” ja ”Painike vie”. Videossa painikkeessa lukee ”Varaa aika”, ja se vie varaussivulle. Muista painaa ”Tallenna” ennen kuin vierität alempiin osioihin." },
      ],
    },
    {
      id: "etusivun-osiot",
      title: "Etusivun osiot: mitkä täyttyvät itsestään ja mitkä kirjoitat itse",
      blocks: [
        { p: "Pääosion alla on luettelo etusivun muista osioista. Jokaisessa on oikealla kytkin, jolla osion voi näyttää tai piilottaa. ”Automaattinen”-merkityt osiot käyttävät salongin valmiita tietoja." },
        {
          table: {
            head: ["Osio", "Mitä se näyttää", "Tiedot"],
            rows: [
              ["Meistä", "Salongin tarina ja vahvuudet", "Kirjoitat itse"],
              ["Suosituimmat palvelut", "6 ensimmäistä palvelua siinä järjestyksessä, johon vedit ne", "Automaattinen"],
              ["Nostot", "Tarjoukset, paketit tai syyt valita salonki", "Kirjoitat itse"],
              ["Galleria", "Enintään 8 kuvaa tiloista ja parhaista töistä", "Lataat kuvat itse"],
              ["Tiimi", "Kuva, nimi ja titteli työntekijälistasta", "Automaattinen"],
              ["Asiakasarvostelut", "Hyväksytyt arvostelut ja keskiarvo", "Automaattinen"],
            ],
          },
        },
        { img: { src: shot("tiimi-ja-arvostelut-automaattinen"), alt: "Osiot Nostot, Galleria, Tiimi ja Asiakasarvostelut, joissa jokaisessa kytkin oikealla, Tiimi ja Asiakasarvostelut merkittyinä Automaattinen", caption: "”Tiimi” ja ”Asiakasarvostelut” ovat ”Automaattinen”-osioita, ja niissä näkyy kohteiden määrä." } },
        { p: "Kytkimet auttavat välttämään itse tehtyjen sivujen tavallisen virheen: tyhjät osiot. Uusi salonki, jolla ei vielä ole arvosteluja, voi kytkeä ”Asiakasarvostelut” pois ja takaisin päälle, kun arvosteluja tulee. Jos teet töitä yksin, voit kytkeä ”Tiimi”-osion pois, jos se ei mielestäsi ole tarpeen." },
        { img: { src: shot("asiakasarvostelut-verkkosivulla"), alt: "Salongin verkkosivun arvosteluosio, jossa 5,0 tähden keskiarvo kahdesta arvostelusta ja asiakkaan kommentti huolellisesta työstä ja ystävällisestä henkilökunnasta" } },
      ],
    },
    {
      id: "luonnos-ja-julkaisu",
      title: "Luonnos, julkaisu ja sivujen linkki asiakkaille",
      blocks: [
        { p: "Uudet sivut ovat aluksi luonnos. Tila kertoo, etteivät asiakkaat vielä näe sivua, ja vain sinä voit katsoa sitä ”Esikatsele”-painikkeella. Voit siis muokata niin kauan kuin haluat, eikä kukaan näe keskeneräistä sivua." },
        { p: "Kun olet tyytyväinen, kytke ”Julkaise” päälle. Tilaksi vaihtuu ”Julkaistu”, ja esikatselupainikkeen tilalle tulee ”Avaa sivu”. Siitä lähtien kuka tahansa linkin saanut voi avata sivut." },
        { img: { src: shot("julkaise-kytkin-paalla"), alt: "Salongin verkkosivu -kortti, jossa tila Julkaistu, Avaa sivu -painike ja päälle kytketty Julkaise-kytkin korostettuna kultaisella" } },
        { p: "Paina ”Kopioi linkki”, niin saat sivun osoitteen. Lähetä se asiakkaille tai lisää salongin Facebookiin, Instagramiin ja Google Mapsiin, jotta asiakas päätyy samalle sivulle, mistä tahansa hän salongin löytää. Muita tapoja viedä linkki asiakkaille kerrotaan ohjeissa [ajanvarauslinkistä](lesson:chia-se-link) ja [QR-koodista ajanvaraukseen](lesson:poster-qr)." },
        {
          table: {
            head: ["Tilanne", "Mitä teet"],
            rows: [
              ["Lähetit linkin, mutta asiakas ei saa sivua auki", "Tarkista, että ”Julkaise” on päällä. Luonnosta asiakkaat eivät näe"],
              ["Palvelut näkyvät sivulla väärässä järjestyksessä", "Vedä ne uuteen järjestykseen kohdassa ”Palvelut”. Sivu näyttää 6 ensimmäistä"],
              ["Jokin etusivun osio on tyhjä", "Kytke osio pois ja takaisin päälle, kun sisältöä on"],
              ["Haluat vaihtaa koko sivun värit", "Valitse toinen sarja kohdassa ”Sivun värit”"],
            ],
          },
        },
      ],
    },
  ],
  howTo: {
    title: "Näin teet kampaamolle ilmaiset verkkosivut VaraaAissa",
    id: "verkkosivujen-vaiheet",
    after: "valmistelu",
    lead: "Kahdeksan vaihetta etenevät ”Aloitussivu”-kohdan ylhäältä alas oppituntivideon järjestyksessä.",
    steps: [
      {
        name: "Avaa ”Aloitussivu”",
        text: "Napauta hallintapaneelissa ”Aloitussivu”. Ylimpänä on ”Salongin verkkosivu” -kortti, ja ennen julkaisua sen tila kertoo, etteivät asiakkaat vielä näe sivua. Kaikki muutokset näkyvät tästä julkaisuun asti vain sinulle.",
      },
      {
        name: "Valitse ”Sivun värit”",
        text: "Napauta kohdassa ”Sivun värit” tyyliä: Ruusu, Samppanja, Musta & kulta, Smaragdi tai Laventeli. Koko sivu vaihtaa värit kerralla. Oppituntivideossa valittuna on ”Samppanja”.",
        image: { src: shot("sivun-varit-samppanja"), alt: "Sivun värit -otsikko korostettuna kultaisella, alla värisarjat Ruusu, valittu Samppanja, Musta & kulta ja Smaragdi" },
      },
      {
        name: "Valitse pääosion asettelu",
        text: "Vieritä alas pääosioon ja valitse asettelu: koko näytön kuva, kuva oikealla, kuva vasemmalla tai vain teksti. Asiakas näkee tämän ensimmäisenä sivun avatessaan, joten valitse kuviisi sopiva asettelu.",
        image: { src: shot("paaosion-asettelu"), alt: "Neljä asettelua Koko näytön kuva, Kuva oikealla, Kuva vasemmalla ja Vain teksti korostettuna kultaisella, alla pienen tekstin ja otsikon kentät" },
      },
      {
        name: "Täytä pieni teksti, ”Otsikko” ja ”Teksti”",
        text: "Kirjoita pieni teksti otsikon yllä, sitten ”Otsikko” ja esittely kohtaan ”Teksti”. Pidä se lyhyenä ja kerro selvästi, mitä salonki tekee ja missä. Asiakas lukee tämän muutamassa sekunnissa ja päättää, vierittääkö eteenpäin.",
      },
      {
        name: "Lisää kuvat, aseta ”Painikkeen teksti” ja paina ”Tallenna”",
        text: "Lataa enintään viisi liukuvaa kuvaa. Kirjoita painikkeen teksti kohtaan ”Painikkeen teksti”, esimerkiksi Varaa aika, ja paina ”Tallenna”, jotta pääosio tallentuu ennen kuin jatkat alaspäin.",
        image: { src: shot("painikkeen-teksti-ja-tallenna"), alt: "Liukuvien kuvien latauskentät, yksi salonkikuva lisättynä, ja Painikkeen teksti -kenttä tekstillä Varaa aika korostettuna kultaisella, alla Painike vie ja Tallenna" },
      },
      {
        name: "Kytke etusivun osiot päälle tai pois",
        text: "Käytä kohdassa ”Etusivun osiot” kunkin osion oikealla olevaa kytkintä: Meistä, Suosituimmat palvelut, Nostot, Galleria, Tiimi, Asiakasarvostelut. ”Automaattinen”-osiot hakevat salongin tiedot, joten mitään ei kirjoiteta uudelleen.",
        image: { src: shot("etusivun-osiot-kytkimilla"), alt: "Etusivun osiot, joissa Meistä-osio kytkimineen on korostettu kultaisella ja alla Suosituimmat palvelut merkinnällä Automaattinen sekä Nostot" },
      },
      {
        name: "Tarkista sivut",
        text: "Palaa ylös ”Salongin verkkosivu” -korttiin ja avaa sivu painikkeella ”Esikatsele” tai julkaisun jälkeen ”Avaa sivu”. Lue otsikko uudelleen, katso kuvat ja vieritä loppuun asti, ettei mikään osio ole tyhjä.",
        image: { src: shot("avaa-sivu-painike"), alt: "Salongin verkkosivu -kortti, jossa Avaa sivu -painike on korostettu kultaisella Julkaise-kytkimen vieressä" },
      },
      {
        name: "Kytke ”Julkaise” päälle ja paina ”Kopioi linkki”",
        text: "Kun olet tyytyväinen, kytke ”Julkaise” päälle. Salongin verkkosivut ovat netissä, ja kuka tahansa voi avata ne. Paina ”Kopioi linkki” ja lähetä osoite asiakkaille tai lisää se Facebookiin, Instagramiin ja Google Mapsiin.",
        image: { src: shot("kopioi-linkki-verkkosivun-osoite"), alt: "Salongin verkkosivu -kortti tilassa Julkaistu, ja sivun osoitteen vieressä oleva Kopioi linkki -painike korostettuna kultaisella" },
      },
    ],
  },
  faq: [
    {
      q: "Tarvitsenko suunnittelijaa tehdäkseni salongille verkkosivut VaraaAissa?",
      a: "Et tarvitse. Teet sivut itse hallintapaneelin kohdassa ”Aloitussivu”: valitset värit, kirjoitat pääosion, kytket haluamasi osiot päälle ja julkaiset. Palvelut, tiimi ja arvostelut tulevat salongin valmiista tiedoista.",
    },
    {
      q: "Milloin asiakkaat näkevät salongin verkkosivut?",
      a: "Vasta kun kytket ”Julkaise” päälle. Sitä ennen sivu on luonnos, jota asiakkaat eivät näe, ja vain sinä voit katsoa sitä ”Esikatsele”-painikkeella.",
    },
    {
      q: "Mitä ”Automaattinen”-merkintä etusivun osiossa tarkoittaa?",
      a: "”Automaattinen”-osio käyttää tietoja, jotka salongilla jo on. Palvelut, tiimi ja arvostelut tulevat hallintapaneelista, joten niitä ei kirjoiteta uudelleen.",
    },
    {
      q: "Mistä vaihdan koko verkkosivun värit?",
      a: "Kohdasta ”Sivun värit” ”Aloitussivu”-näkymässä. Napauta tyyliä, esimerkiksi ”Samppanja”, niin koko sivu vaihtaa värit kerralla.",
    },
    {
      q: "Montako liukuvaa kuvaa salongin sivuille voi lisätä?",
      a: "Pääosioon voi lisätä enintään 5 liukuvaa kuvaa, jotka vaihtuvat etusivulla automaattisesti. Jos et lataa yhtään, näytetään oletuskuva.",
    },
    {
      q: "Miten lähetän salongin verkkosivujen osoitteen asiakkaille?",
      a: "Paina julkaisun jälkeen ”Kopioi linkki” ”Salongin verkkosivu” -kortissa. Lähetä linkki asiakkaille tai lisää se salongin Facebookiin, Instagramiin ja Google Mapsiin.",
    },
  ],
  related: ["chia-se-link", "fanpage", "bang-gia", "ho-so-salon"],
};

export default article;
