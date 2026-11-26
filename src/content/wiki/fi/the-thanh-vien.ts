import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/the-thanh-vien/${name}.webp`;
const shot = (name: string) => `/wiki/the-thanh-vien/fi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "salongin-kanta-asiakaskortti",
  lesson: "the-thanh-vien",
  category: "booking",
  title: "Salongin kanta-asiakaskortti VaraaAissa: näin keräät lippuja, kutsut ystäviä ja saat alennuksen",
  metaTitle: "Salongin kanta-asiakaskortti: liput, kutsut ja alennus",
  metaDescription:
    "Näin salongin kanta-asiakaskortti toimii VaraaAissa: näytä QR-koodi joka käynnillä, kutsu ystäviä ja saa 2 lisälippua sekä alennus täydestä kortista.",
  keyword: "salongin kanta-asiakaskortti",
  keywords: [
    "kampaamon kanta-asiakaskortti",
    "kynsistudion kanta-asiakasetu",
    "leimakortti kauneushoitola",
    "kutsu ystävä ja saa etuja",
    "jäsenkortti QR-koodi",
    "miten kanta-asiakaskortti toimii",
  ],
  excerpt: "Jokaisesta käynnistä vakiosalongissa saat lipun, täydestä kortista alennuksen ja ystävän ensimmäisestä käynnistä kaksi lippua lisää. Kortti on VaraaAi-tililläsi.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-quen-lam-mong-tai-salon-co-the-thanh-vien"),
    alt: "Vaaleahiuksinen kynsiteknikko kermanvärisessä neuleessa lakkaa punaruskeahiuksisen asiakkaan kynsiä puupöydän ääressä valoisassa salongissa",
  },
  takeaways: [
    "Kortin **aktivoi salonki**, ja se lähetetään sinulle sähköpostilla. Näet sen napauttamalla nimeäsi ylhäällä ja valitsemalla ”Kanta-asiakaskortit”.",
    "Näytä jokaisella käynnillä **kortin QR-koodi** henkilökunnalle, joka skannaa sen ja lisää 1 lipun.",
    "Kortti näyttää, montako lippua sinulla on ja montako vielä tarvitset alennukseen.",
    "Lähetä kutsulinkki ystävälle: kun hän varaa sen kautta ja **käy salongissa ensimmäistä kertaa**, saat 2 lisälippua.",
    "Kun kortti on täynnä, kerro siitä henkilökunnalle seuraavalla käynnillä, niin saat alennuksen.",
  ],
  intro: [
    "Salongin kanta-asiakaskortti on salongin tapa kiittää asiakkaita, jotka palaavat yhä uudelleen: jokaisesta hoidosta saat lipun, ja kun lippuja on tarpeeksi, saat alennuksen. VaraaAissa kortti ei ole paperinen leimakortti, joka unohtuu kotiin. Se on tililläsi, siinä on oma QR-koodi, ja se laskee liput puolestasi.",
    "Tämä ohje seuraa VaraaAi Academyn oppituntia ”Jäsenkortti: kerää leimoja ja kutsu ystäviä”. Opit, mistä kortin saa, miten avaat sen, mitä teet kassalla saadaksesi lipun ja miten kutsut ystäviä saadaksesi bonuslippuja.",
  ],
  sections: [
    {
      id: "mika-kortti-on",
      title: "Mikä salongin jäsenkortti on ja kenelle se sopii",
      blocks: [
        { p: "Kyse on yhden salongin omasta kanta-asiakaskortista. Sinulla voi olla kortti kynsistudioon ja toinen kampaamoon, ja kumpikin laskee omat lippunsa. Jos käyt samassa paikassa muutaman viikon välein huollattamassa kynnet, täyttämässä ripset tai leikkauttamassa hiukset, kortti muuttaa käynnit alennukseksi." },
        { p: "Kortissa kannattaa katsoa neljää asiaa:" },
        {
          ul: [
            "**Salongin nimi ja etu:** salongin nimen alla oleva pieni rivi kertoo, montako lippua tarvitset ja mitä saat. Oppitunnin videolla kortissa lukee ”Kerää 5 lippua, saat 15 % alennuksen”.",
            "**Oma QR-koodi:** henkilökunta skannaa sen jokaisella käynnillä.",
            "**Liput:** montako lippua sinulla on kokonaismäärästä, ja rivi, joka kertoo, montako vielä puuttuu alennuksesta.",
            "**Painike ”Avaa kortti ja kutsu ystäviä (+2 lippua)”:** avaa kortin koko sivun.",
          ],
        },
        { img: { src: shot("jasenkortti-qr-koodi-ja-liput"), alt: "Lumi Beauty Paris -salongin jäsenkortti kultaisella korostettuna: QR-koodi, Liput 2/5 ja Avaa kortti ja kutsu ystäviä -painike" } },
        { note: "Jokainen salonki päättää itse tarvittavien lippujen määrän ja alennuksen, joten oman korttisi luvut voivat poiketa videon esimerkistä. Lue etu oman korttisi salongin nimen alta.", kind: "info", title: "Jokaisella salongilla oma etunsa" },
      ],
    },
    {
      id: "mista-kortin-saa",
      title: "Mistä jäsenkortin saa",
      blocks: [
        { p: "Korttia ei luoda itse. Salonki aktivoi sen sinulle, ja se lähetetään sähköpostiisi. Kortin saaminen on siis helppoa: kun seuraavan kerran käyt vakiosalongissasi, kysy, onko heillä jäsenkortteja VaraaAissa, ja pyydä heitä aktivoimaan sinulle kortti." },
        { p: "Anna salongille se sähköpostiosoite, jolla kirjaudut VaraaAihin, jotta kortti tulee oikeaan postilaatikkoon ja näkyy omalla tililläsi. Jos sinulla ei vielä ole tiliä, ohje [luo tili ja kirjaudu](lesson:tai-khoan) vie noin minuutin." },
      ],
    },
    {
      id: "kutsu-ystavia",
      title: "Kutsu ystäviä ja saa lisälippuja: ehdot",
      blocks: [
        { p: "Jokaisessa kortissa on oma kutsulinkki kohdassa ”Kutsu ystävä”. Kopioi linkki ja lähetä se tutuillesi millä tahansa viestisovelluksella. Linkin avaaja näkee sivun, jossa kerrotaan, kuka hänet kutsui ja mihin salonkiin, sekä ”Varaa nyt” -painikkeen. Sivulla kerrotaan myös, että linkin kautta varaamalla salonki tietää, kuka hänet suositteli." },
        { img: { src: shot("ystavan-kutsusivu-varaa-nyt"), alt: "Ystävän saama kutsusivu, jossa kerrotaan kutsujan nimi ja Lumi Beauty Paris -salonki sekä näkyy kultainen Varaa nyt -painike", caption: "Tämän ystäväsi näkee avatessaan kutsulinkkisi." } },
        { p: "Bonuslippuihin liittyy kaksi ehtoa, ja molempien on täytyttävä:" },
        {
          ol: [
            "Ystäväsi **varaa ajan linkkisi kautta** eikä etsi salonkia ja varaa itse.",
            "Ystäväsi **käy salongissa ensimmäistä kertaa** tällä varauksella.",
          ],
        },
        { note: "Bonusliput lisätään vasta, kun ystäväsi todella käy salongissa, ei linkin lähettämisestä. Vaikka lähettäisit linkin monelle, lippujesi määrä ei muutu ennen kuin joku käy. Kun ehdot täyttyvät, 2 lippua lisätään automaattisesti, eikä sinun tarvitse ilmoittaa kenellekään.", kind: "warn", title: "Linkin lähettäminen ei vielä riitä" },
      ],
    },
    {
      id: "tavallisia-tilanteita",
      title: "Tavallisia tilanteita jäsenkortin kanssa",
      blocks: [
        {
          table: {
            head: ["Tilanne", "Mitä teet"],
            rows: [
              ["Kohdassa ”Kanta-asiakaskortit” ei näy korttia", "Salonki ei ehkä ole vielä aktivoinut korttia. Kysy salongilta ja tarkista, onko kortin sähköposti tullut"],
              ["Unohdit näyttää koodin skannattavaksi", "Lippu lisätään vain, kun henkilökunta skannaa koodin. Avaa kortti valmiiksi, kun odotat maksamista"],
              ["Haluat tarkistaa, lisättiinkö lippu", "Paina ”Avaa kortti ja kutsu ystäviä” ja katso ”Lippuhistoria”: jokainen käynti on oma rivinsä"],
              ["Lähetit kutsulinkin, mutta bonusta ei näy", "Bonusliput lisätään vasta, kun ystäväsi on varannut linkin kautta ja käynyt ensimmäistä kertaa"],
              ["Kortti on täynnä", "Kerro henkilökunnalle seuraavalla käynnillä, niin saat alennuksen"],
              ["Sinulla on kortti useaan salonkiin", "Jokaisella salongilla on oma korttinsa kohdassa ”Kanta-asiakaskortit”, omalla QR-koodilla ja lippumäärällä"],
            ],
          },
        },
      ],
    },
    {
      id: "kortti-ja-ajanvaraus",
      title: "Kortti ja ajanvaraus netissä yhdessä",
      blocks: [
        { p: "Jäsenkortti sopii hyvin yhteen ennakkoon varaamisen kanssa. Teet [ajanvarauksen netissä](lesson:dat-lich-online) vakiosalonkiisi, käyt hoidossa, näytät QR-koodin kassalla, ja liput karttuvat käynti käynniltä. Kun haluat avata kortin kassalla nopeasti kirjoittamatta osoitetta, [asenna VaraaAi-sovellus](lesson:cai-app) aloitusnäytölle." },
        { p: "Jos haluat mieluummin antaa jollekulle hoidon lahjaksi kuin kutsua hänet varaamaan, katso ohje [osta ja käytä lahjakortti](lesson:the-qua-tang). Kortit ovat eri asia: jäsenkortti kerää lippuja sinulle, lahjakortti taas on etukäteen ostettu lahja toiselle." },
        { note: "Salongit perustavat ohjelman, aktivoivat kortit ja lisäävät liput hallintapaneelissa. Katso oppitunnit [QR-kanta-asiakaskortit hallintapaneelissa](lesson:the-tich-diem) ja [Suosittelut: kanta-asiakkaat tuovat uusia asiakkaita](lesson:khach-dan-khach).", kind: "info", title: "Omistatko salongin?" },
      ],
    },
  ],
  howTo: {
    title: "Salongin kanta-asiakaskortin käyttö VaraaAissa vaihe vaiheelta",
    id: "kortin-vaiheet",
    after: "mista-kortin-saa",
    lead: "Kun salonki on aktivoinut korttisi, kaikki muu hoituu puhelimella.",
    steps: [
      {
        name: "Avaa tililtäsi ”Kanta-asiakaskortit”",
        text: "Kirjaudu VaraaAihin, napauta nimeäsi ylhäällä ja valitse ”Kanta-asiakaskortit”. Sivulla ”Jäsenkorttini” näkyvät korttisi, yksi kutakin salonkia kohden.",
        image: { src: shot("avaa-jasenkorttini-tilivalikosta"), alt: "VaraaAin Jäsenkorttini-sivu, jossa tilipainike on korostettu ja alla näkyy Lumi Beauty Paris -kortti QR-koodeineen ja Liput 2/5" },
      },
      {
        name: "Katso, montako lippua sinulla on",
        text: "Rivi ”Liput” näyttää, montako lippua sinulla on kokonaismäärästä. Heti sen alla kerrotaan, montako lippua alennukseen vielä tarvitaan. Vilkaise näitä kahta riviä ennen jokaista käyntiä, niin tiedät, onko alennus nyt vuorossa.",
        image: { src: shot("viela-lippua-alennukseen"), alt: "Jäsenkortti VaraaAissa, jossa Liput 2/5 ja rivi Vielä 3 lippua alennukseen on korostettu kultaisella" },
      },
      {
        name: "Näytä QR-koodi henkilökunnalle salongissa",
        text: "Avaa kortti kassalla ja näytä QR-koodin sisältävä näyttö henkilökunnalle. Heti kun he skannaavat koodin, saat 1 lipun. Tee tämä jokaisella käynnillä, sillä ilman skannausta lippua ei tule.",
        image: { src: shot("nayta-qr-koodi-henkilokunnalle"), alt: "Lumi Beauty Paris -jäsenkortin QR-koodi kultaisella korostettuna valmiina henkilökunnan skannattavaksi" },
      },
      {
        name: "Paina ”Avaa kortti ja kutsu ystäviä” nähdäksesi edistymisesi",
        text: "Painike avaa kortin koko sivun. Edistymisrengas näyttää, kuinka pitkällä olet matkalla alennukseen, ja muistuttaa, montako lippua vielä puuttuu.",
        image: { src: shot("avaa-kortti-ja-kutsu-ystavia"), alt: "Jäsenkortin alareunan musta Avaa kortti ja kutsu ystäviä (+2 lippua) -painike kultaisella korostettuna" },
      },
      {
        name: "Lue ”Näin keräät lippuja” ja ”Lippuhistoria”",
        text: "Alempana kohta ”Näin keräät lippuja” kertaa kortin säännöt, ja ”Lippuhistoria” luettelee jokaisen saamasi lipun päivämäärineen. Tästä tarkistat, jos et ole varma, skannattiinko viimeisin käyntisi.",
        image: { src: shot("nain-keraat-lippuja-ja-lippuhistoria"), alt: "Kortin Näin keräät lippuja- ja Lippuhistoria-osio kultaisella korostettuna, historiassa kaksi riviä Käynti salongilla +1" },
      },
      {
        name: "Paina ”Kopioi kutsulinkki” ja lähetä se ystäville",
        text: "Paina kohdassa ”Kutsu ystävä” ”Kopioi kutsulinkki” ja liitä linkki viestiin tutuillesi. Kun joku heistä varaa linkin kautta ja käy salongissa ensimmäistä kertaa, korttiisi lisätään automaattisesti 2 lippua.",
        image: { src: shot("kopioi-kutsulinkki"), alt: "Jäsenkortin Kutsu ystävä -osio, jossa kultainen Kopioi kutsulinkki -painike on korostettu ja vieressä näkyy merkintä +2" },
      },
      {
        name: "Kortti täynnä: kerro henkilökunnalle ja saat alennuksen",
        text: "Kun kortti näyttää, että kaikki liput on kerätty, mainitse siitä henkilökunnalle seuraavalla käynnillä. Salonki antaa kortissa näkyvän alennuksen tästä käynnistä.",
        image: { src: shot("enaa-lippua-alennukseen"), alt: "Edistymisrengas 2/5 lippua ja sen alla kultaisella korostettu rivi Enää 3 lippua 15 %:n alennukseen" },
      },
    ],
  },
  faq: [
    {
      q: "Miten saan salongin jäsenkortin VaraaAissa?",
      a: "Kysy vakiosalongiltasi. Salonki aktivoi kortin, ja se lähetetään sinulle sähköpostilla. Sen jälkeen näet sen napauttamalla nimeäsi ylhäällä ja valitsemalla ”Kanta-asiakaskortit”.",
    },
    {
      q: "Montako lippua yhdestä käynnistä saa?",
      a: "Yhden. Avaat kortin, näytät QR-koodin henkilökunnalle, ja heti skannauksen jälkeen käynnistä lisätään 1 lippu.",
    },
    {
      q: "Montako lippua alennukseen tarvitaan?",
      a: "Se riippuu salongista. Lippujen määrä ja alennus lukevat kortissasi salongin nimen alla. Oppitunnin videolla 5 lipulla saa 15 % alennuksen seuraavasta käynnistä.",
    },
    {
      q: "Mitä saan ystävän kutsumisesta ja milloin?",
      a: "Saat 2 lisälippua. Ne lisätään automaattisesti, kun ystäväsi varaa ajan kutsulinkkisi kautta ja käy salongissa ensimmäistä kertaa, ei linkkiä lähettäessäsi.",
    },
    {
      q: "Mistä näen jäsenkorttini ja lippuni?",
      a: "Kirjaudu VaraaAihin, napauta nimeäsi ylhäällä ja valitse ”Kanta-asiakaskortit”. Jokaisessa kortissa näkyvät sen oma QR-koodi, keräämäsi liput ja montako vielä tarvitset alennukseen.",
    },
    {
      q: "Tuleeko alennus automaattisesti, kun kortti on täynnä?",
      a: "Kerro henkilökunnalle seuraavalla käynnillä, niin saat alennuksen. Avaa kortti ja näytä lippusi maksaessasi.",
    },
  ],
  related: ["the-qua-tang", "theo-doi-salon", "hoa-don", "lich-hen-cua-toi"],
};

export default article;
