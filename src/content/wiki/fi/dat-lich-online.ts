import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/dat-lich-online/${name}.webp`;
const shot = (name: string) => `/wiki/dat-lich-online/fi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "ajanvaraus-netissa-kampaamoon-ja-kauneushoitolaan",
  lesson: "dat-lich-online",
  category: "booking",
  title: "Ajanvaraus netissä: näin varaat ajan kampaamoon, kynsistudioon tai kauneushoitolaan minuutissa",
  metaTitle: "Ajanvaraus netissä: kampaamo, kynnet, ripset ja spa",
  metaDescription:
    "Näin varaat kynnet, hiustenleikkuun, ripsienpidennykset tai spa-hoidon netissä VaraaAissa: etsi salonki läheltäsi, valitse palvelu, tekijä ja aika ja vahvista.",
  keyword: "ajanvaraus netissä",
  keywords: ["kampaamo ajanvaraus", "kynsistudio ajanvaraus", "varaa aika kampaamoon", "kauneushoitola lähellä", "ripsienpidennykset ajanvaraus", "VaraaAi ajanvaraus"],
  excerpt: "Hae salonkia palvelun ja alueen mukaan, valitse tekijä, vapaa päivä ja kellonaika ja vahvista. Ei puheluita, ja varata voi vaikka keskellä yötä.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-den-salon-sau-khi-dat-lich-online"),
    alt: "Vaaleaan trenssitakkiin pukeutunut nainen saapuu tyylikkään kauneussalongin vastaanottotiskille, jossa vastaanottovirkailija tervehtii häntä",
  },
  takeaways: [
    "Ajanvaraus VaraaAissa on asiakkaalle **maksutonta** ja vie noin minuutin.",
    "Näet salongin **todelliset vapaat ajat** aamupäivän, iltapäivän ja illan mukaan ryhmiteltyinä, joten soittaa ei tarvitse.",
    "Ilman tiliäkin voi varata: kirjoita nimi, puhelinnumero, sähköposti ja salasana, niin tili luodaan samalla.",
    "Tavallisin maksutapa on **”Maksa salongissa”**: maksat käteisellä tai kortilla vasta hoidon jälkeen.",
    "Jos tulee este, voit perua itse kohdassa ”Varaukseni”, kunhan salongin peruutusaika ei ole umpeutunut.",
  ],
  intro: [
    "Ajanvaraus netissä säästää sinut soittelulta salonkista toiseen vapaan ajan perään. Avaat puhelimen, näet heti, missä on aikaa, mitä palvelu maksaa ja kuka sen tekee, ja varaat paikkasi noin minuutissa, vaikka salonki olisi jo kiinni.",
    "Tämä ohje näyttää vaihe vaiheelta, miten varaat VaraaAissa kynnet, hiustenleikkuun, ripsienpidennykset tai spa-hoidon. Se seuraa VaraaAi Academyn ensimmäistä asiakkaille tarkoitettua oppituntia ”Löydä salonki ja varaa aika verkossa”. Alla oleva video on kuvattu oikeilla näkymillä, joten voit katsoa ja tehdä samalla.",
  ],
  sections: [
    {
      id: "ennen-varaamista",
      title: "Mitä tarvitset ennen varaamista",
      blocks: [
        { p: "Et juuri mitään. Riittää puhelin tai tietokone, jossa on nettiyhteys, ja tieto siitä, mitä palvelua haluat. Varaaminen on maksutonta, eikä mitään tarvitse asentaa. Halutessasi voit kuitenkin [asentaa VaraaAi-sovelluksen](/app), jolloin avaat sen suoraan kotinäytöltä." },
        { p: "Jos sinulla on salongin alennuskoodi tai lahjakortti, pidä koodi käsillä. Se syötetään tietojen täyttämisen yhteydessä." },
      ],
    },
    {
      id: "salongin-sivu",
      title: "Mitä salongin sivulta kannattaa katsoa",
      blocks: [
        { p: "Hakutulokset näyttävät sopivat salongit, niiden **arviot** ja **edullisimman hinnan**. Voit vaihtaa näkymää ”Lista”- ja ”Kartta”-painikkeilla ja valita paikan läheltä kotia tai työpaikkaa." },
        { p: "Kun avaat salongin, näet osoitteen, puhelinnumeron ja kolme välilehteä:" },
        {
          ul: [
            "**Palvelut:** jokaisen palvelun kesto ja hinta.",
            "**Arvostelut:** palautteet asiakkailta, jotka ovat oikeasti varanneet ajan ja käyneet salongissa.",
            "**Aukioloajat:** päivät ja kellonajat, jolloin salonki on auki.",
          ],
        },
        { img: { src: shot("salongin-sivu-varaa-aika"), alt: "Salongin sivu puhelimessa: nimi, tähtiarvio, osoite, puhelinnumero, esittelyteksti sekä painikkeet Varaa aika ja Keskustele salongin kanssa", caption: "Salongin sivulla ”Varaa aika” vie suoraan varaukseen." } },
        { note: "Katso palvelun kesto ennen kuin valitset kellonajan. Ripsienpidennykset tai hiusten värjäys voivat viedä enemmän aikaa kuin luulet, joten jätä väljyyttä ennen seuraavaa menoa.", kind: "tip", title: "Pieni vinkki" },
      ],
    },
    {
      id: "varauksen-jalkeen",
      title: "Varauksen jälkeen: tarkista, muuta tai peru",
      blocks: [
        { p: "Kun näyttö vahvistaa varauksen, saat vahvistuksen myös sähköpostiisi. Painamalla ”Näytä varaukseni” näet päivän, kellonajan, palvelun ja salongin osoitteen milloin tahansa." },
        { p: "Jos tulee este, voit perua varauksen itse kohdassa ”Varaukseni”, kunhan salongin peruutusaika ei ole umpeutunut. Jokainen salonki määrittää oman peruutusaikansa peruutusehdoissaan, ja olet hyväksynyt ne vahvistusvaiheessa. Kun perut ajoissa, salonki voi tarjota ajan jollekulle toiselle." },
        { p: "Academyn seuraava oppitunti käy tämän läpi tarkemmin: [Katso ja peru varaus](lesson:lich-hen-cua-toi). Jos haluat kysyä salongilta jotain ennen käyntiä, voit [viestitellä salongin kanssa](lesson:chat-voi-salon) suoraan VaraaAissa." },
      ],
    },
    {
      id: "tavallisia-tilanteita",
      title: "Tavallisia tilanteita ajanvarauksessa",
      blocks: [
        {
          table: {
            head: ["Tilanne", "Mitä teet"],
            rows: [
              ["Valitsemallesi päivälle ei näy aikoja", "Salonki on silloin täynnä tai kiinni. Valitse toinen päivä tai valitse ”Kuka tahansa vapaana oleva”, niin näet kaikkien tekijöiden vapaat ajat"],
              ["Haluat kaksi palvelua samalla käynnillä", "Rastita palvelut listasta ja paina ”Jatka”"],
              ["Tekijällä ei ole väliä", "Jätä valinnaksi ”Kuka tahansa vapaana oleva”, niin salonki ohjaa ajan vapaalle tekijälle"],
              ["Sinulla on jo tili", "Paina ”Kirjaudu sisään” sen sijaan, että täyttäisit tiedot uudelleen"],
              ["Haluat kertoa salongille jotain", "Kirjoita se kenttään ”Viesti salongille (valinnainen)” tietojen täyttämisen yhteydessä"],
            ],
          },
        },
      ],
    },
    {
      id: "salongin-omistajalle",
      title: "Omistatko salongin?",
      blocks: [
        { p: "Kaiken, minkä asiakas tässä ohjeessa näkee, näkevät myös sinun asiakkaasi, kun salongillasi on varaussivu VaraaAissa: palvelut, hinnat, todelliset vapaat ajat ja varauspainike, joka toimii ympäri vuorokauden. Rekisteröityminen on salongin omistajalle maksutonta. Katso oppitunti [Rekisteröi ja aktivoi salonki](lesson:dang-ky-salon) tai avaa [VaraaAi salongeille](/business)." },
      ],
    },
  ],
  howTo: {
    title: "Ajanvaraus VaraaAissa vaihe vaiheelta",
    id: "varauksen-vaiheet",
    after: "salongin-sivu",
    lead: "Seitsemän vaihetta etenevät näkymien järjestyksessä. Lainausmerkeissä olevat nimet ovat samat, jotka näet sivulla.",
    steps: [
      {
        name: "Hae palvelun ja alueen mukaan",
        text: "Avaa [varaaai.com](/). Kirjoita tarvitsemasi palvelu kenttään ”Palvelu tai salonki”, esimerkiksi kynnet. Kirjoita kaupunkisi kenttään ”Alue” tai paina ”Lähelläni”, niin salonkeja haetaan sijaintisi ympäriltä, ja paina sitten ”Hae”. Voit myös vierittää alas ja valita kohdasta ”Selaa kategorioittain”.",
        image: { src: shot("hae-salonkia-palvelun-ja-alueen-mukaan"), alt: "VaraaAin etusivu puhelimessa: kentät Palvelu tai salonki ja Alue, Lähelläni-painike ja oranssi Hae-painike" },
      },
      {
        name: "Valitse salonki tuloksista",
        text: "Katso tulokset listana tai kartalla painikkeista ”Lista” ja ”Kartta”. Jokaisen salongin kohdalla näkyy arvio ja edullisin hinta. Napauta mieleistäsi salonkia, niin sen sivu aukeaa.",
        image: { src: shot("hakutulokset-lista-ja-kartta"), alt: "Hakutulokset puhelimessa: neljä salonkia Suomessa, Lista- ja Kartta-painikkeet sekä salonkikortti tähtiarvioineen ja alkaen-hintoineen" },
      },
      {
        name: "Valitse palvelu",
        text: "Paina ”Palvelut”-kohdassa ”Varaa” haluamasi palvelun vieressä. Jos haluat samalla käynnillä useamman palvelun, rastita ne ja paina ”Jatka”.",
        image: { src: shot("valitse-palvelu-ja-paina-varaa"), alt: "Salongin palvelulista puhelimessa, jokaisella palvelulla kesto minuutteina, hinta ja musta Varaa-painike" },
      },
      {
        name: "Valitse tekijä",
        text: "Valitse kohdassa ”Valitse työntekijä” tuttu tekijä tai jätä valinnaksi ”Kuka tahansa vapaana oleva”, jos tekijällä ei ole sinulle väliä.",
        image: { src: shot("valitse-tyontekija-kuka-tahansa-vapaana-oleva"), alt: "Valitse työntekijä -näkymä, jossa Kuka tahansa -vaihtoehto on korostettu kahden nimetyn tekijän vieressä ja alla näkyy Valitse päivä -kalenteri" },
      },
      {
        name: "Valitse vapaa päivä ja aika",
        text: "Napauta kohdassa ”Valitse päivä” haluamaasi päivää. Kohta ”Valitse aika” näyttää silloin vapaat ajat aamupäivän, iltapäivän ja illan mukaan ryhmiteltyinä. Napauta sinulle sopivaa aikaa.",
        image: { src: shot("valitse-vapaa-aika"), alt: "Valitse aika -näkymä, jossa aamupäivän vapaat ajat ovat ruudukossa, yksi aika on valittuna ja iltapäivän ajat alkavat alempana" },
      },
      {
        name: "Täytä tietosi ja valitse maksutapa",
        text: "Jos sinulla ei ole tiliä, täytä kentät ”Koko nimi”, ”Puhelinnumero”, ”Sähköposti” ja ”Salasana”, niin tili luodaan samalla. Jos tili on jo olemassa, paina ”Kirjaudu sisään”. Kohdassa ”Valitse maksutapa” valinta on yleensä ”Maksa salongissa”. Jos sinulla on alennuskoodi tai lahjakortti, kirjoita koodi kenttään ”Alennuskoodi” ja paina ”Käytä”.",
        image: { src: shot("maksa-salongissa-ja-alennuskoodi"), alt: "Maksuvaihe, jossa on Maksa salongissa -vaihtoehto, kenttä viestille salongille ja Alennuskoodi-kenttä Käytä-painikkeineen" },
      },
      {
        name: "Tarkista ja vahvista",
        text: "Tarkista kohdasta ”Varauksesi”, että palvelu, päivä, kellonaika ja hinta ovat oikein. Rastita ruutu ”Hyväksyn peruutusehdot ja VaraaAi:n käyttöehdot” ja paina ”Vahvista varaus”. Kun näyttö vahvistaa varauksen, aikasi on varattu.",
        image: { src: shot("vahvista-varaus-yhteenveto"), alt: "Varauksesi-yhteenveto, jossa näkyvät päivä, kellonaika, tekijä ja salongissa maksettava hinta, hyväksymisruutu ja Vahvista varaus -painike" },
      },
    ],
  },
  faq: [
    {
      q: "Maksaako ajanvaraus VaraaAissa jotain?",
      a: "Ei maksa. Varaaminen on asiakkaalle täysin maksutonta. Maksat vain palvelun salongille, ja ”Maksa salongissa” -vaihtoehdolla maksat käteisellä tai kortilla vasta hoidon jälkeen.",
    },
    {
      q: "Voiko aikaa varata salongin aukioloaikojen ulkopuolella?",
      a: "Voi. Varaussivu on auki ympäri vuorokauden, joten voit varata vaikka keskellä yötä. Valittavana ovat vain ne ajat, jotka salongilla on vielä vapaana sen työaikoina.",
    },
    {
      q: "Voinko varata ajan ilman tiliä?",
      a: "Voit. Täytä tietovaiheessa koko nimesi, puhelinnumerosi, sähköpostisi ja salasana. Tili luodaan varauksen yhteydessä, ja seuraavalla kerralla vain kirjaudut sisään.",
    },
    {
      q: "Mistä tiedän, että varaukseni meni perille?",
      a: "Kun painat ”Vahvista varaus”, näyttö vahvistaa varauksen ja saat vahvistuksen sähköpostiisi. Näet ajan myös kohdassa ”Varaukseni”.",
    },
    {
      q: "Miten perun varauksen?",
      a: "Avaa ”Varaukseni” ja peru aika siellä. Voit tehdä sen itse, kunhan salongin peruutusehdoissa määritetty peruutusaika ei ole umpeutunut.",
    },
    {
      q: "Mihin alennuskoodi tai lahjakortti syötetään?",
      a: "Tietovaiheessa, heti maksutavan valinnan alla, on kenttä ”Alennuskoodi”. Siihen käyvät sekä alennus- että lahjakorttikoodit. Kirjoita koodi ja paina ”Käytä” ennen kuin vahvistat varauksen.",
    },
  ],
  related: ["lich-hen-cua-toi", "tai-khoan", "cai-app", "the-qua-tang"],
};

export default article;
