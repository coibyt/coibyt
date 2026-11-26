import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/viet-danh-gia/${name}.webp`;
const shot = (name: string) => `/wiki/viet-danh-gia/fi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "salongin-arvostelu-kaynnin-jalkeen",
  lesson: "viet-danh-gia",
  category: "booking",
  title: "Salongin arvostelu käynnin jälkeen: näin annat tähdet ja kerrot kokemuksestasi VaraaAissa",
  metaTitle: "Salongin arvostelu käynnin jälkeen: tähdet ja palaute",
  metaDescription:
    "Näin kirjoitat salongin arvostelun VaraaAissa: avaa se kutsusähköpostista tai Varaukseni-osiosta, anna 1–5 tähteä, kirjoita pari riviä ja lähetä.",
  keyword: "salongin arvostelu",
  keywords: [
    "kirjoita arvostelu kampaamosta",
    "kynsistudion arvostelu",
    "tähtiarvio salongille",
    "arvostelu kauneushoitolasta",
    "palaute kampaamolle",
    "ovatko VaraaAin arvostelut aitoja",
  ],
  excerpt: "Anna tähdet ja muutama sana käynnistäsi arvostelukutsun sähköpostista tai kohdasta ”Varaukseni”. Se vie noin puoli minuuttia.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-noi-mi-lam-cho-khach-truoc-khi-khach-viet-danh-gia"),
    alt: "Kermanväriseen työasuun pukeutunut ripsiteknikko tekee ripsienpidennyksiä hoitopöydällä makaavalle asiakkaalle tyylikkäässä salongissa rengasvalon alla",
  },
  takeaways: [
    "Arvostelun voi aloittaa kahdesta paikasta: **arvostelukutsun sähköpostin** painikkeesta tai varauksen ”Jätä arvostelu” -painikkeesta kohdassa ”Varaukseni”.",
    "Valitse kohdassa ”Palvelun laatu” **1–5 tähteä**, kirjoita muutama rivi ja paina ”Lähetä arvostelu”.",
    "Koko homma vie noin **puoli minuuttia**.",
    "Vain salongissa **varauksen tehneet** asiakkaat voivat arvostella salongin.",
    "Arvostelu näkyy salongin sivulla, kun salonki on lukenut ja julkaissut sen.",
  ],
  intro: [
    "Lyhyt ja hyödyllinen salongin arvostelu auttaa kumpaakin osapuolta: salonki saa tietää, mikä onnistuu ja mitä kannattaa parantaa, ja sinun jälkeesi tulevat asiakkaat saavat lisää perusteita valintaansa. VaraaAissa arvostelun kirjoittaminen vie jokaisen käynnin jälkeen noin puoli minuuttia.",
    "Tämä ohje seuraa VaraaAi Academyn oppituntia ”Kirjoita arvostelu käynnin jälkeen”. Opit, mistä arvosteluikkuna avataan, miten tähdet annetaan ja arvostelu lähetetään, mitä kannattaa kirjoittaa ja milloin arvostelusi näkyy salongin sivulla.",
  ],
  sections: [
    {
      id: "miksi-arvostella",
      title: "Miksi arvostelu kannattaa jättää kauneushoidon jälkeen",
      blocks: [
        { p: "Tekijä kuulee harvoin rehellistä palautetta. Tyytyväinen asiakas yleensä kiittää ja lähtee, tyytymätön jättää vain tulematta uudelleen. Muutama rivi arvostelussa on yksinkertaisin tapa kertoa salongille, mikä toimii ja mitä pitää säätää." },
        { p: "Salonkia etsivälle arvostelut ovat ensimmäinen asia, jonka hän lukee. VaraaAin hakutuloksissa näkyy jokaisen salongin arvosana, ja jokaisen salongin sivulla on oma ”Arvostelut”-välilehti. Se, mitä kirjoitat tänään, auttaa jotakuta toista päättämään ensi viikolla." },
        { img: { src: shot("tyytyvainen-asiakas-arvostelee-puhelimella"), alt: "Hymyilevä nainen kermanvärisessä neuleessa istuu salongissa nyrkki ilmassa ja katsoo puhelintaan, jonka yllä hehkuu kultainen lahjapaketin kuvake" } },
        { note: "VaraaAissa salongin voi arvostella vain asiakas, joka on varannut siellä ajan. Ilman varausta arvostelua ei voi kirjoittaa. Siksi salongin sivulla lukemasi arvostelut tulevat oikeilta asiakkailta.", kind: "info", title: "Kuka voi arvostella" },
      ],
    },
    {
      id: "mita-kirjoittaa",
      title: "Mitä salongin arvosteluun kannattaa kirjoittaa",
      blocks: [
        { p: "Tekstikenttään riittää muutama lause. Oppitunnin videolla asiakas kirjoittaa, että työ oli kaunista ja huolellista, henkilökunta ystävällistä ja että hän tulee varmasti uudelleen. Sellainen lyhyt arvostelu riittää hyvin. Jos haluat, että arvostelustasi on enemmän apua lukijoille, lisää yksi tai kaksi konkreettista yksityiskohtaa." },
        {
          table: {
            head: ["Kannattaa mainita", "Miksi siitä on apua"],
            rows: [
              ["Palvelu, jonka sait", "Lukija tietää, puhutko geelilakkauksesta, ripsienpidennyksistä vai hiustenleikkuusta"],
              ["Ammattitaito ja huolellisuus", "Uusia asiakkaita kiinnostaa tämä eniten, eikä sitä näe kuvista"],
              ["Asenne ja neuvonta", "Kertoo, kuunteleeko salonki ja selittääkö se asiat selkeästi"],
              ["Pääsitkö ajallaan vai jouduitko odottamaan", "Auttaa kiireisiä suunnittelemaan päivänsä"],
              ["Se, mihin et ollut tyytyväinen, konkreettisesti", "Salonki tietää tarkalleen, mitä korjata, ja lukija näkee arvostelun olevan reilu"],
            ],
          },
        },
        { note: "Tähtien ja tekstin pitää sopia yhteen. Viisi tähteä ja pelkkiä valituksia tekstissä tai yksi tähti ilman selitystä tekevät arvostelusta vaikean uskoa. Anna tähdet sen mukaan, miltä palvelun laatu sinusta oikeasti tuntui, ja kerro muutamalla lauseella miksi.", kind: "tip", title: "Tähdet ja sanat samaan suuntaan" },
        { p: "Jos jokin ei mennyt hyvin, siitäkin kannattaa kirjoittaa, rauhallisesti ja tapahtumiin pitäytyen. Asioissa, jotka salonki voi korjata nopeasti, kuten aikaisin irtoava kynsi, voit myös ensin [lähettää viestin salongille](lesson:chat-voi-salon), jotta sillä on mahdollisuus hoitaa asia." },
      ],
    },
    {
      id: "lahettamisen-jalkeen",
      title: "Lähettämisen jälkeen: milloin arvostelu näkyy salongin sivulla",
      blocks: [
        { p: "Arvostelu ei tule näkyviin samalla hetkellä, kun painat lähetä. Salonki lukee sen ensin ja julkaisee sen sitten sivullaan. Julkaisun jälkeen arvosana ja arvostelujen määrä näkyvät heti salongin nimen alla, jossa jokainen sivulla kävijä ne näkee." },
        { img: { src: shot("arvosana-salongin-sivulla"), alt: "Lumi Beauty Paris -salongin sivu VaraaAissa, jossa salongin nimen alla oleva 5.0-arvosana ja arvostelujen määrä on korostettu kultaisella", caption: "Arvosana näkyy heti salongin nimen alla." } },
        { p: "Jos et vielä näe arvosteluasi sivulla, se odottaa yhä, että salonki lukee ja julkaisee sen. Sitä ei tarvitse lähettää uudelleen." },
      ],
    },
    {
      id: "tavallisia-tilanteita",
      title: "Tavallisia tilanteita arvostelua kirjoittaessa",
      blocks: [
        {
          table: {
            head: ["Tilanne", "Mitä teet"],
            rows: [
              ["Arvostelukutsun sähköpostia ei tullut", "Sitä ei tarvitse odottaa. Kirjaudu sisään, avaa ”Varaukseni”, etsi varauksesi ja paina ”Jätä arvostelu”"],
              ["Haluat arvostella salongin, jossa et ole varannut aikaa VaraaAin kautta", "Se ei onnistu. Vain kyseisessä salongissa varanneet asiakkaat voivat arvostella sen"],
              ["Et tiedä, mitä kirjoittaa", "Anna ensin tähdet ja kirjoita sitten kaksi lausetta: minkä palvelun sait ja mikä käynnistä jäi parhaiten mieleen"],
              ["Lähetit arvostelun, mutta se ei näy salongin sivulla", "Arvostelu tulee näkyviin, kun salonki on lukenut ja julkaissut sen"],
            ],
          },
        },
      ],
    },
    {
      id: "arvostelut-salongin-valinnassa",
      title: "Muiden arvostelut apuna salongin valinnassa",
      blocks: [
        { p: "Muiden jättämistä arvosteluista on hyötyä myös sinulle. Kun [etsit salonkia](/search), katso tuloksista arvosana, avaa sitten salongin sivu ja lue sen ”Arvostelut” ennen kuin teet [ajanvarauksen netissä](lesson:dat-lich-online). Salonki, josta on useita konkreettisia kommentteja juuri haluamastasi palvelusta, on parempi merkki kuin pelkkä luku." },
        { p: "Käynnin jälkeen kaikki palaa kohtaan [Varaukseni](lesson:lich-hen-cua-toi): näet siellä aiemmat varauksesi ja painat ”Jätä arvostelu” saman tien." },
        { note: "Salongit lukevat arvostelut, julkaisevat ne sivullaan ja vastaavat asiakkaille hallintapaneelissa. Katso oppitunti [Arvostelut ja Google](lesson:danh-gia-google).", kind: "info", title: "Omistatko salongin?" },
      ],
    },
  ],
  howTo: {
    title: "Salongin arvostelu VaraaAissa vaihe vaiheelta",
    id: "arvostelun-vaiheet",
    after: "miksi-arvostella",
    lead: "Kuusi lyhyttä vaihetta, jotka voit tehdä puhelimella heti salongista lähdettyäsi.",
    steps: [
      {
        name: "Avaa varaus sähköpostista tai kohdasta ”Varaukseni”",
        text: "Jokaisen käynnin jälkeen VaraaAi lähettää sähköpostin, jossa sinua pyydetään kirjoittamaan arvostelu. Paina viestin painiketta. Voit myös kirjautua sisään, napauttaa nimeäsi ylhäällä ja valita itse ”Varaukseni”.",
        image: { src: shot("avaa-varaukseni"), alt: "Varaukseni-sivu tabletilla, jossa Varaukseni-otsikko on korostettu kultaisella ja alla näkyy varauskortteja" },
      },
      {
        name: "Etsi varaus, jonka haluat arvostella",
        text: "Jokainen varaus on oma korttinsa, jossa näkyvät salonki, palvelu, aika ja hinta. Etsi sen käynnin kortti, josta haluat kirjoittaa, varsinkin jos sinulla on samassa salongissa useampi varaus.",
        image: { src: shot("varaus-jonka-haluat-arvostella"), alt: "Varaukseni-luettelo, jossa Lumi Beauty Paris -salongin geelilakkausvaraus on korostettu kultaisella kehyksellä" },
      },
      {
        name: "Paina ”Jätä arvostelu”",
        text: "Paina kortin oikeassa reunassa olevaa ”Jätä arvostelu” -painiketta. Pieni ikkuna ”Arvioi kokemuksesi” aukeaa.",
        image: { src: shot("paina-jata-arvostelu"), alt: "Geelilakkauksen varauskortti Varaukseni-luettelossa, jossa oikealla oleva Jätä arvostelu -painike on korostettu kultaisella" },
      },
      {
        name: "Valitse tähdet kohdassa ”Palvelun laatu”",
        text: "Napauta rivillä ”Palvelun laatu” sitä tähteä, joka vastaa arviotasi, yhdestä viiteen.",
      },
      {
        name: "Kirjoita muutama rivi",
        text: "Napauta tähtien alla olevaa kenttää ”Kerro kokemuksestasi...” ja kirjoita muutama rivi käynnistä: mitä sinulle tehtiin ja mikä miellytti tai jäi harmittamaan. Pitkää tekstiä ei tarvita, konkreettinen riittää.",
      },
      {
        name: "Paina ”Lähetä arvostelu” ja katso kiitosviesti",
        text: "Tarkista tähdet ja teksti vielä kerran ja paina ikkunan alareunan ”Lähetä arvostelu”. Näytölle tulee ”Kiitos arvostelustasi!” ja antamasi tähdet. Sulje ikkuna painamalla ”OK”. Salonki lukee arvostelusi ja julkaisee sen sivullaan.",
      },
    ],
  },
  faq: [
    {
      q: "Kuka voi arvostella salongin VaraaAissa?",
      a: "Vain asiakas, joka on varannut ajan kyseisessä salongissa. Ilman varausta arvostelua ei voi kirjoittaa, ja siksi VaraaAin arvostelut tulevat oikeilta asiakkailta.",
    },
    {
      q: "Missä salongin arvostelu kirjoitetaan?",
      a: "Kahdessa paikassa. Paina arvostelukutsun sähköpostin painiketta, jonka VaraaAi lähettää käynnin jälkeen, tai avaa ”Varaukseni”, etsi varauksesi ja paina ”Jätä arvostelu”.",
    },
    {
      q: "Kauanko arvostelun kirjoittaminen kestää?",
      a: "Noin puoli minuuttia. Valitset kohdassa ”Palvelun laatu” 1–5 tähteä, kirjoitat muutaman rivin ja painat ”Lähetä arvostelu”.",
    },
    {
      q: "Näkyykö arvosteluni salongin sivulla heti?",
      a: "Ei heti. Salonki lukee arvostelun ensin ja julkaisee sen sitten sivullaan. Julkaisun jälkeen arvosana ja arvostelujen määrä näkyvät salongin nimen alla.",
    },
    {
      q: "Mitä teen, jos en saanut arvostelukutsua sähköpostiin?",
      a: "Voit arvostella ilman sitäkin. Kirjaudu sisään, napauta nimeäsi ylhäällä, avaa ”Varaukseni”, etsi varauksesi ja paina ”Jätä arvostelu”.",
    },
    {
      q: "Voiko VaraaAin arvosteluihin luottaa?",
      a: "Jokainen arvostelu liittyy asiakkaaseen, joka on varannut ajan salongissa, koska ilman varausta arvostelua ei voi kirjoittaa. Siinä on ero palveluihin, joissa kuka tahansa voi kommentoida.",
    },
  ],
  related: ["lich-hen-cua-toi", "chat-voi-salon", "dat-lich-online", "the-thanh-vien"],
};

export default article;
