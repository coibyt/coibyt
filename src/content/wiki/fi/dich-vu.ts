import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/dich-vu/${name}.webp`;
const shot = (name: string) => `/wiki/dich-vu/fi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "salongin-palvelut-hinnat-ja-kestot",
  lesson: "dich-vu",
  category: "salon",
  title: "Salongin palvelut ja hinnat: näin lisäät palvelut, kestot ja hinnat nettiajanvaraukseen",
  metaTitle: "Salongin palvelut ja hinnat: kesto, hinta ja käsiraha",
  metaDescription:
    "Näin rakennat kynsistudion, kampaamon, ripsistudion tai hoitolan palveluvalikon VaraaAissa: nimi, kesto, siivousaika, hinta, käsiraha ja palvelun tekijät.",
  keyword: "salongin palvelut ja hinnat",
  keywords: [
    "palvelun lisääminen ajanvaraukseen",
    "kynsistudion palveluiden nimeäminen",
    "palvelun kesto ajanvarauksessa",
    "siivousaika asiakkaiden välissä",
    "käsiraha ajanvarauksessa",
    "palvelun monistaminen VaraaAi",
    "palveluiden järjestys varaussivulla",
  ],
  excerpt: "Jokainen palvelu tarvitsee selkeän nimen, todellisen keston, hinnan ja tekijät. Asiakas näkee juuri sen, mitä kirjoitat, joten tee se kerralla huolella.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-nail-lam-mong-cho-khach-tai-ban"),
    alt: "Vaaleahiuksinen kynsiteknikko lakkaa punaruskeahiuksisen asiakkaan kynsiä puupöydän ääressä salongin suuren ikkunan vieressä",
  },
  takeaways: [
    "Palvelut ja hinnat ovat ensimmäinen asia, jota asiakas katsoo varatessaan, ja hän näkee **juuri sen, mitä kirjoitat**.",
    "**Kesto** on todellinen työaika. **Siivousaika jälkeen** on tauko, jonka kalenteri jättää kahden asiakkaan väliin.",
    "Kultainen rivi **”Asiakas näkee: …”** näyttää keston ja hinnan ennen tallennusta.",
    "Asiakas voi varata vain ne työntekijät, jotka olet valinnut palvelun kohtaan ”Tekijät”.",
    "”Monista” tekee samankaltaisen palvelun nopeasti, ja ⋮⋮-kahvaa vetämällä asetat järjestyksen, jonka asiakas näkee.",
  ],
  intro: [
    "Salongin palvelut ja hinnat varaussivulla eroavat seinällä olevasta hinnastosta yhdellä tavalla: jokainen rivi ohjaa samalla kalenteria. Palvelun nimi kertoo asiakkaalle, mitä hän varaa, kesto kertoo kalenterille, montako minuuttia varataan, ja tekijät ratkaisevat, kenet asiakas voi valita.",
    "Tämä artikkeli seuraa VaraaAi Academyn oppituntia ”Lisää palvelut ja hinnat”. Opit lisäämään kokonaisen palvelun itse, ymmärrät jokaisen ”Aika ja hinta” -osion kentän ja osaat järjestää koko palveluvalikon niin, että asiakas löytää haluamansa nopeasti.",
  ],
  sections: [
    {
      id: "miksi-selkea-valikko",
      title: "Miksi selkeä palveluvalikko tuo salongille enemmän varauksia",
      blocks: [
        { p: "Kun asiakas avaa salongin sivun, hän katsoo palvelulistaa ennen kaikkea muuta. Hän etsii kolmea vastausta: tekeekö salonki sitä, mitä tarvitsen, kauanko se kestää ja paljonko se maksaa. Palvelurivi, jossa on nimi, kesto ja hinta, vastaa kaikkiin kolmeen ilman, että kenenkään tarvitsee lähettää viestiä." },
        { p: "VaraaAissa hallintapaneelin ”Palvelut” on salongin koko palveluvalikko hintoineen ja kestoineen. Yläreunan kortti sanoo sen suoraan: asiakas näkee juuri tämän varatessaan verkossa. Miltä se näyttää asiakkaan puolelta, näet ohjeesta [ajanvaraus netissä](lesson:dat-lich-online)." },
        { p: "Väärä kesto aiheuttaa enemmän harmia kuin väärä hinta. Jos merkitset lyhyemmän ajan kuin työ vie, seuraava asiakas saapuu ajallaan, kun tekijä on vielä kesken. Jos merkitset pidemmän, päivään jää aukkoja, joita kukaan ei voi varata." },
      ],
    },
    {
      id: "mita-valmistella",
      title: "Mitä valmistella ennen palveluiden ja hintojen lisäämistä",
      blocks: [
        { p: "Kirjoita palvelulista paperille ennen kuin avaat hallintapaneelin. Jokaisesta palvelusta tarvitset viisi tietoa:" },
        {
          ul: [
            "**Nimi**, jota asiakkaat käyttävät, ei salongin sisäistä lyhennettä.",
            "**Todellinen työaika** siitä, kun asiakas istuu tuoliin, siihen, kun työ on valmis.",
            "**Aika pöydän siivoamiseen ja välineiden vaihtoon** ennen seuraavaa asiakasta.",
            "**Hinta** ja valuutta, jossa salonki laskuttaa.",
            "**Kuka salongissa osaa tehdä** palvelun.",
          ],
        },
        { note: "”Tekijät”-kohdassa valitset henkilöistä, jotka ovat jo henkilökuntalistalla. Voit yhdistää ne myös toisin päin: kun [lisäät työntekijän](lesson:nhan-vien), valitset samalla palvelut, joita hän tekee. Kumpi tahansa suunta toimii.", kind: "info", title: "Palvelut vai työntekijät ensin" },
      ],
    },
    {
      id: "nimi-ja-kuvaus",
      title: "Palvelun nimi ja kuvaus, jotka asiakas ymmärtää",
      blocks: [
        { p: "Palvelun nimen pitää olla ilmaus, jonka asiakas sanoisi puhelimessa: geelilakkaus käsiin, miesten hiustenleikkaus, klassiset ripsienpidennykset. Vältä koodeja ja pakettinimiä, jotka vain oma tiimi ymmärtää, ja kirjoita nimet kielellä, jota asiakkaasi lukevat." },
        { p: "”Kuvaus” ”Näytetään palvelun nimen alla, kun asiakas valitsee tämän palvelun.” Yksi rivi riittää, kunhan se kertoo, mitä palveluun kuuluu. Oppituntivideon esimerkkipalvelun ”Ranskalainen manikyyri” kuvaus on ”Klassiset ranskalaiset kärjet kiiltävällä geelipinnalla.”" },
        { p: "”Palveluryhmä” on vapaaehtoinen, ja sitä käytetään, kun haluat jakaa valikon ryhmiin. Salongin, joka tekee käsiä, jalkoja ja ripsiä, kannattaa käyttää ryhmiä, ettei asiakkaan tarvitse lukea yhtä pitkää sekalaista listaa." },
        { note: "Kun palvelusta on kaksi versiota, esimerkiksi kädet ja jalat, tee niistä kaksi erillistä palvelua omalla kestolla ja hinnalla. Paina ensimmäisessä ”Monista” ja muuta vain nimi ja hinta.", kind: "tip", title: "Pieni vinkki" },
      ],
    },
    {
      id: "kesto-siivousaika-kasiraha",
      title: "Palvelun kesto, siivousaika ja käsiraha",
      blocks: [
        { p: "”Aika ja hinta” -osiossa on viisi kenttää. Jokainen vaikuttaa kalenteriin tai siihen, mitä asiakas näkee, omalla tavallaan:" },
        {
          table: {
            head: ["Kenttä", "Mitä se tekee", "Mitä kirjoitat"],
            rows: [
              ["”Kesto (minuuttia)”", "Palvelun kesto. Napauta valmista vaihtoehtoa tai kirjoita mikä tahansa minuuttimäärä", "Tavallisen käynnin aika, ei nopeinta suoritusta"],
              ["”Siivousaika jälkeen (minuuttia)”", "Tauko kahden asiakkaan välissä. Kalenteri jättää sen vapaaksi jokaisen varauksen jälkeen", "Riittävästi pöydän pyyhkimiseen, puhtaiden välineiden esille ottamiseen ja käsienpesuun"],
              ["”Valuutta”", "Hinnan yhteydessä näkyvä valuutta", "Valuutta, jossa salonki laskuttaa"],
              ["”Hinta (EUR)”", "Summa, jonka asiakas näkee varatessaan", "Hinta, jonka todella perit"],
              ["”Käsiraha (EUR, valinnainen)”", "Ennakkomaksu, vapaaehtoinen", "Täytä vain, jos haluat asiakkaan maksavan käsirahan"],
            ],
          },
        },
        { img: { src: shot("siivousaika-jalkeen"), alt: "Aika ja hinta -osio, jossa Siivousaika jälkeen (minuuttia) -kenttä on korostettu kultaisella keston vaihtoehtojen alla", caption: "”Siivousaika jälkeen” on heti keston alla. Jos jätät sen nollaan, kaksi varausta voi seurata toisiaan ilman taukoa." } },
        { p: "Siivousaika on kenttä, jonka moni yrittäjä ohittaa ja juoksee sitten koko päivän kelloa vastaan. Kahden asiakkaan välissä työpöytä pyyhitään ja välineet vaihdetaan, kuten ohjeessa [kauneushoitolan välinehuolto](lesson:ve-sinh-dung-cu) kerrotaan. Kun merkitset tauon, kalenteri varaa ajan sille puolestasi." },
      ],
    },
    {
      id: "muokkaa-monista-jarjesta",
      title: "Muokkaa, monista, piilota ja järjestä palvelut",
      blocks: [
        { p: "Tallennuksen jälkeen uusi palvelu näkyy listassa heti. Jokaisella palvelulla on neljä painiketta ja kahva:" },
        {
          table: {
            head: ["Painike", "Milloin sitä käytetään"],
            rows: [
              ["”Muokkaa”", "Nimen, keston, hinnan tai tekijöiden muuttaminen"],
              ["”Monista”", "Samankaltainen palvelu nopeasti, muutat vain nimen ja hinnan"],
              ["”Lisäpalvelut”", "Lisien liittäminen tähän palveluun"],
              ["”Piilota”", "Palvelun laittaminen tauolle"],
              ["Vasemman reunan ⋮⋮-kahva", "Vedä ylös tai alas järjestyksen muuttamiseksi. Asiakas näkee palvelut tässä järjestyksessä"],
            ],
          },
        },
        { img: { src: shot("muokkaa-monista-lisapalvelut-piilota"), alt: "Salongin palvelulista, jossa Gel manicure ja Gel pedicure kestoineen ja hintoineen sekä painikkeet Muokkaa, Monista, Lisäpalvelut ja Piilota", caption: "”Monista”-painike on korostettu kultaisella. Yläreunan rivi muistuttaa, että asiakas näkee asettamasi järjestyksen." } },
        { p: "Järjestystä kannattaa miettiä hetki. Laita varatuimmat palvelut alkuun, koska puhelimella asiakas näkee vain muutaman ensimmäisen rivin ennen kuin hänen pitää vierittää." },
        { img: { src: shot("veda-kahvasta-jarjestys"), alt: "Gel manicure -palvelun vasemmalla puolella oleva kuuden pisteen kahva korostettuna, sillä palvelut vedetään haluttuun järjestykseen" } },
      ],
    },
    {
      id: "kun-valikko-on-valmis",
      title: "Kun palveluvalikko on valmis",
      blocks: [
        { p: "Kun valikko on valmis, varaussivulla on asiakkaalle valittavaa. Kaksi työtä on vielä jäljellä ennen kuin asiakas voi valita ajan: [lisää työntekijät ja heidän oikeutensa](lesson:nhan-vien) ja [aseta aukioloajat](lesson:gio-mo-cua), koska asiakas voi varata vain salongin ollessa auki." },
        { p: "Jos olet asettanut jollekin palvelulle käsirahan, kirjoita selkeät peruutusehdot, jotta asiakas tietää säännöt etukäteen. Niistä kerrotaan ohjeessa [peruutusehdot ja maksut](lesson:thanh-toan-chinh-sach). Jos tarvitset hinnaston tulostettavaksi tai someen, katso oppitunti [hinnastosta](lesson:bang-gia)." },
      ],
    },
  ],
  howTo: {
    title: "Palvelun lisääminen salongin palveluihin ja hintoihin VaraaAissa",
    id: "palvelun-lisaamisen-vaiheet",
    after: "mita-valmistella",
    lead: "Kahdeksan vaihetta etenevät ”Uusi palvelu” -lomakkeen ylhäältä alas samassa järjestyksessä kuin oppituntivideo.",
    steps: [
      {
        name: "Avaa ”Palvelut” ja paina ”Lisää palvelu”",
        text: "Napauta hallintapaneelin valikosta ”Palvelut”. Sivulla on salongin koko palveluvalikko. Paina kultaista ”Lisää palvelu” -painiketta, niin uuden palvelun lomake aukeaa.",
        image: { src: shot("palvelut-ja-lisaa-palvelu-painike"), alt: "Yrityksen hallintapaneeli, jossa Palvelut-välilehti on valittuna ja Salongin palveluvalikko -kortin Lisää palvelu -painike näkyy" },
      },
      {
        name: "Kirjoita ”Palvelun nimi” ja valitse ”Palveluryhmä”",
        text: "Kirjoita kohdassa ”Perustiedot” ”Palvelun nimi”, esimerkiksi Ranskalainen manikyyri. Valitse ”Palveluryhmä”, jos jaat valikon ryhmiin, tai jätä ”Ei ryhmää”. Nimeä palvelu niin kuin asiakas sen sanoo, niin hän tunnistaa sen heti.",
        image: { src: shot("palvelun-nimi-perustiedot"), alt: "Uusi palvelu -lomakkeen Perustiedot-osio, jossa Palvelun nimi -kenttä Ranskalainen manikyyri on korostettu kultaisella" },
      },
      {
        name: "Kirjoita yhden rivin ”Kuvaus”",
        text: "Kerro lyhyesti, mitä palveluun kuuluu. Rivi näkyy palvelun nimen alla, kun asiakas valitsee palvelun, joten kirjoita se ihmiselle, joka ei ole koskaan käynyt salongissasi.",
        image: { src: shot("palvelun-lyhyt-kuvaus"), alt: "Kuvaus-kenttä, jossa lukee Klassiset ranskalaiset kärjet kiiltävällä geelipinnalla, ja alla Aika ja hinta -osio" },
      },
      {
        name: "Valitse kesto",
        text: "Siirry kohtaan ”Aika ja hinta”. Napauta valmista kestoa, esimerkiksi 45 minuuttia, tai kirjoita mikä tahansa minuuttimäärä alla olevaan kenttään. Merkitse aika, jonka työ salongissasi todella vie.",
        image: { src: shot("palvelun-kesto-minuutteina"), alt: "Kesto (minuuttia) -vaihtoehdot 15, 30, 45, 60, 90 ja 120 korostettuna kultaisella, ja 45 on valittuna" },
      },
      {
        name: "Täytä ”Siivousaika jälkeen”",
        text: "Kirjoita minuutit, jotka tarvitset kahden asiakkaan välissä. Kalenteri jättää tämän tauon vapaaksi jokaisen varauksen jälkeen, joten seuraavaa asiakasta ei varata heti edellisen perään.",
      },
      {
        name: "Valitse valuutta ja kirjoita hinta ja käsiraha",
        text: "Valitse ”Valuutta” ja kirjoita ”Hinta (EUR)”. Jos haluat asiakkaan maksavan ennakkoon, täytä myös ”Käsiraha”, joka on merkitty valinnaiseksi. Tarkista alla oleva kultainen rivi ”Asiakas näkee: …”, niin näet keston ja hinnan juuri niin kuin asiakas ne näkee.",
        image: { src: shot("asiakas-nakee-kesto-ja-hinta"), alt: "Hinta- ja valinnainen Käsiraha-kenttä, joiden alla kultainen rivi Asiakas näkee: 45 min · 50,00 € on korostettu" },
      },
      {
        name: "Valitse tekijät",
        text: "Napauta kohdassa ”Tekijät” työntekijät, jotka voivat tehdä palvelun, tai paina ”Valitse kaikki”. Asiakas voi varata vain palveluun valitut henkilöt, joten älä valitse ketään, joka ei vielä osaa sitä.",
        image: { src: shot("tekijat-tyontekijat"), alt: "Tekijät-osio, jossa työntekijät Emma, Sofia ja Léa on korostettu kultaisella ja oikealla on Valitse kaikki" },
      },
      {
        name: "Paina ”Tallenna”",
        text: "Vieritä alas ja paina ”Tallenna”. Uusi palvelu näkyy listassa heti kestoineen ja hintoineen. Toista muille palveluille tai käytä ”Monista”-painiketta lähes samanlaisiin palveluihin.",
      },
    ],
  },
  faq: [
    {
      q: "Mikä on palvelun ”Siivousaika jälkeen”?",
      a: "Se on tauko kahden asiakkaan välissä. Jokaisen palvelun varauksen jälkeen kalenteri jättää vapaaksi kirjoittamasi minuuttimäärän, jotta ehdit siivota pöydän ja valmistautua seuraavaan asiakkaaseen.",
    },
    {
      q: "Kuinka pitkä kesto palvelulle kannattaa merkitä?",
      a: "Merkitse aika, jonka työ salongissasi todella vie. Voit napauttaa valmista vaihtoehtoa, kuten 45 minuuttia, tai kirjoittaa minkä tahansa minuuttimäärän. Käytä tavallisen käynnin aikaa, ettei päivä veny.",
    },
    {
      q: "Pitääkö varauksesta periä käsiraha?",
      a: "Ei tarvitse. Käsirahakenttä on valinnainen. Täytä se vain, jos haluat asiakkaan maksavan palvelusta jotain etukäteen, ja jätä muuten tyhjäksi.",
    },
    {
      q: "Miten teen nopeasti monta samankaltaista palvelua?",
      a: "Paina olemassa olevan palvelun kohdalla ”Monista”. Palvelu kopioidaan, ja muutat vain nimen ja hinnan sen sijaan, että kirjoittaisit kaiken uudelleen.",
    },
    {
      q: "Miksi asiakas ei voi valita tiettyä työntekijää palveluun?",
      a: "Koska henkilöä ei ole valittu palvelun kohtaan ”Tekijät”. Asiakas voi varata vain palveluun liitetyt työntekijät. Paina palvelun kohdalla ”Muokkaa” ja valitse henkilö.",
    },
    {
      q: "Miten muutan palveluiden järjestystä varaussivulla?",
      a: "Vedä ”Palvelut”-sivulla kunkin palvelun vasemmalla olevaa ⋮⋮-kahvaa ylös tai alas. Asiakas näkee palvelut täsmälleen tässä järjestyksessä.",
    },
  ],
  related: ["nhan-vien", "gio-mo-cua", "thanh-toan-chinh-sach", "bang-gia"],
};

export default article;
