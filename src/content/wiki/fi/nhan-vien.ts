import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/nhan-vien/${name}.webp`;
const shot = (name: string) => `/wiki/nhan-vien/fi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "salongin-henkilokunta-ja-kayttooikeudet",
  lesson: "nhan-vien",
  category: "salon",
  title: "Salongin henkilökunta ja käyttöoikeudet: lisää tekijät, liitä palvelut ja päätä, mitä kukin näkee",
  metaTitle: "Salongin henkilökunta: tekijät, palvelut ja käyttöoikeudet",
  metaDescription:
    "Näin lisäät työntekijät salongin ajanvaraukseen VaraaAissa: profiili, kunkin palvelut, oma kirjautuminen ja roolit tekijä, vastaanotto ja esihenkilö.",
  keyword: "salongin henkilökunta",
  keywords: [
    "työntekijän käyttöoikeudet ajanvarauksessa",
    "työntekijän lisääminen ajanvarausjärjestelmään",
    "kampaajan omat työajat",
    "vastaanoton ja esihenkilön oikeudet",
    "asiakas valitsee tekijän netissä",
    "työntekijän kirjautuminen kalenteriin",
  ],
  excerpt: "Jokaisella työntekijällä on oma kalenteri, omat palvelut ja omat oikeudet. Asiakas valitsee tutun tekijän, ja sinä päätät, kuka näkee mitäkin.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-cat-toc-nam-dang-cat-cho-khach"),
    alt: "Parrakas liiviin pukeutunut parturi leikkaa nahkatuolissa istuvan hymyilevän nuoren miehen hiuksia tyylikkäässä parturiliikkeessä",
  },
  takeaways: [
    "VaraaAissa jokaisella työntekijällä on **oma kalenteri, omat palvelut ja omat käyttöoikeudet**.",
    "Asiakas voi varata tekijän vain niihin palveluihin, jotka olet valinnut kohtaan **”Palvelut”**.",
    "Sähköposti ja salasana tarvitaan vain, jos haluat työntekijän **kirjautuvan itse** katsomaan aikataulua.",
    "Kolme pikaroolia: **Kampaaja / teknikko** näkee vain omat varauksensa, **Vastaanotto** koko kalenterin ja asiakkaat, **Esihenkilö** kaiken.",
    "Listassa ”Työajat” asettaa henkilön omat työajat ja ”Poista” on lähtevälle työntekijälle.",
  ],
  intro: [
    "Salongin henkilökunnan hallinta paperikalenterilla toimii, kun tekijöitä on kaksi. Kolmannen ja neljännen myötä asiat alkavat mennä sekaisin: kuka tekee minkäkin palvelun, kuka on vapaalla minäkin päivänä ja kuka saa nähdä asiakkaiden puhelinnumerot. Hyvän ajanvarausjärjestelmän pitää vastata näihin kaikkiin jokaisen henkilön kohdalla.",
    "Tämä artikkeli seuraa VaraaAi Academyn oppituntia ”Lisää työntekijät ja oikeudet”. Opit lisäämään työntekijän kaikkine tietoineen, liittämään häneen oikeat palvelut ja valitsemaan käyttöoikeudet, jotka sopivat hänen työhönsä.",
  ],
  sections: [
    {
      id: "miksi-oma-profiili",
      title: "Miksi jokaisella tekijällä kannattaa olla oma profiili",
      blocks: [
        { p: "Kauneusalalla asiakas palaa useammin tekijän kuin kyltin takia. Asiakas, joka on tyytyväinen yhden kynsiteknikon tai kampaajan käsialaan, haluaa saman tekijän seuraavallakin kerralla. Kun jokaisella työntekijällä on profiili, asiakas voi valita tutun tekijän jo varatessaan." },
        { p: "Omat profiilit pitävät myös kalenterin oikeana. Jokaisella on oma kalenteri, joten kahta asiakasta ei varata samalle tekijälle samaan aikaan. Jokainen on liitetty vain palveluihin, joita hän osaa, joten ripsienpidennykset varannutta asiakasta ei laiteta tekijälle, joka tekee vain kynsiä." },
        { p: "Kolmas syy ovat käyttöoikeudet. Salongissa on asiakaslistoja, myyntilukuja ja muuta tietoa, jota kaikkien ei tarvitse nähdä. Kun oikeudet asetetaan henkilökohtaisesti, voit jakaa töitä ja pitää silti itselläsi sen, mikä kuuluu pitää." },
      ],
    },
    {
      id: "mita-valmistella",
      title: "Mitä valmistella ennen työntekijöiden lisäämistä ajanvaraukseen",
      blocks: [
        {
          ul: [
            "**Selkeä kasvokuva** jokaisesta. Asiakas tunnistaa tutun tekijän kuvasta.",
            "**Nimi**, jolla asiakkaat tekijän salongissa tuntevat, ja **ammattinimike**, esimerkiksi kynsiteknikko tai ripsiteknikko.",
            "**Muutama rivi esittelyä** siitä, missä tekijä on parhaimmillaan.",
            "**Lista palveluista**, jotka henkilö osaa tehdä itsenäisesti.",
            "**Työntekijän oma sähköpostiosoite**, jos haluat hänen kirjautuvan katsomaan aikataulua.",
          ],
        },
        { p: "Tee palveluvalikko ensin, koska ”Palvelut”-kohdassa valitaan jo luoduista palveluista. Jos et ole vielä tehnyt sitä, katso ohje [salongin palvelut ja hinnat](lesson:dich-vu)." },
      ],
    },
    {
      id: "kayttooikeudet-roolit",
      title: "Työntekijän käyttöoikeudet: tekijä, vastaanotto ja esihenkilö",
      blocks: [
        { p: "Osiossa ”Kirjautuminen ja oikeudet” on kolme ”Pikaroolit”-vaihtoehtoa. Jokainen on valmiiksi koottu joukko oikeuksia:" },
        {
          table: {
            head: ["Rooli", "Mitä hän näkee", "Kenelle sopii"],
            rows: [
              ["Kampaaja / teknikko", "Vain omat varauksensa", "Kynsiteknikot, kampaajat, ripsiteknikot, hoitajat"],
              ["Vastaanotto", "Koko kalenterin, asiakkaat ja yhteystiedot", "Henkilö, joka vastaa puhelimeen, varaa ajat ja ottaa asiakkaat vastaan"],
              ["Esihenkilö", "Kaiken, myös muut sivut (vain luku)", "Henkilö, joka hoitaa salonkia poissa ollessasi"],
            ],
          },
        },
        { p: "Jos mikään kolmesta ei sovi salonkisi tapaan toimia, säädä kytkimiä kohdassa ”Saa nähdä nämä osiot”. Jokaisella hallintapaneelin osalla on oma kytkin, esimerkiksi ”Varaukset”, ”Asiakkaat”, ”Asiakkaan puhelin ja sähköposti”, ”Palvelut” ja ”Aukioloajat”." },
        { img: { src: shot("saa-nahda-nama-osiot"), alt: "Saa nähdä nämä osiot -lista, jossa ovat kytkimet Varaukset, Asiakkaat, Asiakkaan puhelin ja sähköposti, Palvelut, Tuotteet, Aukioloajat, Arvostelut ja Varasto", caption: "Jokainen rivi on yksi hallintapaneelin osa. Kytkimellä sallit tai piilotat sen." } },
        { note: "Asiakkaiden puhelinnumerot ja sähköpostit kannattaa avata mahdollisimman harvalle. Aloita pienimmistä oikeuksista, esimerkiksi roolista Kampaaja / teknikko, ja lisää vasta kun työ todella vaatii. Asiakastiedot ovat henkilötietoja, joten mieti tarkkaan, kuka niitä tarvitsee.", kind: "warn", title: "Asiakkaan tiedot" },
      ],
    },
    {
      id: "palvelut-kohta",
      title: "”Palvelut”: asiakas varaa oikean tekijän oikeaan palveluun",
      blocks: [
        { p: "Tämä kohta ratkaisee, missä työntekijä näkyy varaussivulla. Asiakas valitsee palvelun, ja sivu tarjoaa vain siihen valitut tekijät. Henkilö, jota ei ole valittu, ei näy listassa." },
        { p: "Valitse siis vain palvelut, jotka henkilö osaa tehdä alusta loppuun itse. Uusi tekijä, joka vasta opettelee volyymiripsiä, ei vielä ota volyymivarauksia yksin. Kun hän on varma, esimerkiksi [VaraaAi Academyn](/academy) ammattikurssien jälkeen, paina hänen korttinsa kohdalla ”Muokkaa” ja lisää palvelu." },
        { p: "Yhteyden voi tehdä myös toisin päin. Kun luot tai muokkaat palvelua, sen ”Tekijät”-kohdassa valitset henkilöt, jotka sen tekevät." },
      ],
    },
    {
      id: "henkilokuntalista",
      title: "Henkilökuntalista: omat työajat ja työntekijän poistaminen",
      blocks: [
        { p: "Tallennuksen jälkeen uusi työntekijä näkyy listassa korttina. Kortissa näkyvät nimi, ammattinimike sekä varaukset ja myynti viimeisen 30 päivän ajalta. Tekijäkohtaisesta palkasta Academyssa on oma oppitunti [työntekijän tuloraportista](lesson:doanh-thu-nhan-vien)." },
        { img: { src: shot("tyontekijan-kortti-tyoajat"), alt: "Työntekijän kortti listassa, jossa ovat Muokkaa-painike, kultaisella korostettu Työajat-painike ja Poista-painike" } },
        {
          ul: [
            "**”Muokkaa”:** vaihda kuva, nimi, palvelut tai oikeudet.",
            "**”Työajat”:** aseta henkilön omat työajat. Käytä sitä osa-aikaisille tai niille, joiden vapaapäivät poikkeavat salongin [yleisistä aukioloajoista](lesson:gio-mo-cua).",
            "**”Poista”:** kun henkilö ei enää työskentele salongissa.",
          ],
        },
      ],
    },
    {
      id: "tavallisia-tilanteita",
      title: "Tavallisia tilanteita työntekijöitä lisättäessä",
      blocks: [
        {
          table: {
            head: ["Tilanne", "Mitä teet"],
            rows: [
              ["Tekijän ei tarvitse kirjautua", "Jätä sähköposti ja salasana tyhjiksi. Kortissa lukee silloin ”Ei kirjautumista”"],
              ["Asiakas ei näe tekijää varatessaan palvelua", "Paina ”Muokkaa” ja valitse palvelu kohdassa ”Palvelut”"],
              ["Joku tekee töitä vain muutamana päivänä viikossa", "Paina hänen korttinsa kohdalla ”Työajat” ja aseta omat työajat"],
              ["Vastaanoton pitää nähdä kaikkien kalenteri", "Valitse rooli ”Vastaanotto” roolin ”Kampaaja / teknikko” sijaan"],
              ["Joku on lopettanut kokonaan", "Paina hänen korttinsa kohdalla ”Poista”"],
            ],
          },
        },
        { p: "Kun tiimi on koossa, seuraat koko salongin päivää hallintapaneelin [ajanvarauskalenterissa](lesson:lich-hen)." },
      ],
    },
  ],
  howTo: {
    title: "Työntekijän lisääminen ja käyttöoikeudet VaraaAissa vaihe vaiheelta",
    id: "tyontekijan-lisaamisen-vaiheet",
    after: "mita-valmistella",
    lead: "Seitsemän vaihetta etenevät työntekijälomakkeen ylhäältä alas oppituntivideon mukaisesti.",
    steps: [
      {
        name: "Avaa ”Henkilökunta” ja paina ”Lisää työntekijä”",
        text: "Napauta hallintapaneelin valikosta ”Henkilökunta”. Sivulla ovat jokaisen profiili, palvelut, työajat, käyttöoikeudet ja tulokset yhdessä paikassa. Paina kultaista ”Lisää työntekijä” -painiketta.",
        image: { src: shot("henkilokunta-lisaa-tyontekija"), alt: "VaraaAin yrityksen hallintapaneeli, jossa Henkilökunta-välilehti on valittuna ja Salongin henkilökunta -kortissa on Lisää työntekijä -painike" },
      },
      {
        name: "Täytä ”Profiili”",
        text: "Lataa profiilikuva ja kirjoita ”Työntekijän nimi”, ”Ammattinimike” ja lyhyt ”Esittely”. Käytä nimeä, jonka asiakkaat jo tuntevat salongista, niin he tunnistavat tekijän.",
        image: { src: shot("tyontekijan-profiili-nimi-ammattinimike"), alt: "Työntekijälomakkeen Profiili-osio, jossa on Lataa kuva, nimi Léa ja kultaisella korostettu Ammattinimike-kenttä Hieroja" },
      },
      {
        name: "Valitse ”Palvelut”",
        text: "Napauta palvelut, joita henkilö osaa tehdä. Asiakas voi varata hänet vain niihin, joten jätä pois kaikki, mitä hän ei vielä tee yksin.",
        image: { src: shot("tyontekijan-palvelut"), alt: "Palvelut-osio, jossa Gel manicure, Gel pedicure, Classic lashes, Lash lift & tint ja Relax massage on valittu, oikealla Valitse kaikki" },
      },
      {
        name: "Anna kirjautumistunnukset tarvittaessa",
        text: "Kirjoita osioon ”Kirjautuminen ja oikeudet” sähköposti ja vähintään 8 merkin salasana, jos haluat henkilön kirjautuvan katsomaan omaa aikatauluaan. Kun annat tunnukset, työntekijä saa heti tervetuloviestin, jossa kerrotaan, miten kirjaudutaan. Jos tunnuksia ei tarvita, jätä molemmat kentät tyhjiksi.",
        image: { src: shot("kirjautuminen-ja-oikeudet-sahkoposti-salasana"), alt: "Kirjautuminen ja oikeudet -osio, jossa on tervetuloviestin selitys sekä kultaisella korostetut sähköposti- ja salasanakentät" },
      },
      {
        name: "Valitse pikarooli",
        text: "Valitse yksi kolmesta: ”Kampaaja / teknikko” näkee vain omat varauksensa, ”Vastaanotto” näkee koko kalenterin, asiakkaat ja yhteystiedot, ja ”Esihenkilö” näkee kaiken. Valitse henkilön todellisen työn mukaan, älä sen mukaan, kauanko hän on ollut talossa.",
        image: { src: shot("pikaroolit-kampaaja-vastaanotto-esihenkilo"), alt: "Pikaroolit Kampaaja / teknikko, Vastaanotto ja Esihenkilö, joista Vastaanotto on korostettu kuvauksineen Koko kalenteri, asiakkaat ja yhteystiedot" },
      },
      {
        name: "Hienosäädä kohdassa ”Saa nähdä nämä osiot”",
        text: "Jos tarvitset jotain muuta kuin valmiin roolin, käännä kytkimiä ja salli tai piilota kukin osa. Voit esimerkiksi antaa tekijän nähdä varaukset mutta kytkeä pois ”Asiakkaan puhelin ja sähköposti”.",
      },
      {
        name: "Paina ”Tallenna”",
        text: "Paina ”Tallenna”. Uusi työntekijä näkyy listassa varauksineen ja myynteineen viimeisen 30 päivän ajalta. Toista vaiheet salongin jokaiselle tekijälle.",
        image: { src: shot("tyontekijan-kortti-varaukset-myynti"), alt: "Työntekijän kortti listassa: nimi, ammattinimike, tämän päivän tila, varaukset, myynti, palveluiden määrä ja Ei kirjautumista" },
      },
    ],
  },
  faq: [
    {
      q: "Mitä eroa on rooleilla Kampaaja / teknikko, Vastaanotto ja Esihenkilö?",
      a: "Kampaaja / teknikko näkee vain omat varauksensa. Vastaanotto näkee koko kalenterin, asiakkaat ja yhteystiedot. Esihenkilö näkee kaiken, myös muut sivut, vain luku -tilassa. Yksittäisiä osia voi silti kytkeä päälle tai pois kohdassa ”Saa nähdä nämä osiot”.",
    },
    {
      q: "Tarvitseeko jokainen työntekijä omat tunnukset?",
      a: "Ei tarvitse. Sähköposti ja salasana tarvitaan vain, jos haluat henkilön kirjautuvan katsomaan omaa aikatauluaan. Jos jätät ne tyhjiksi, henkilö on silti salongin henkilökuntalistalla.",
    },
    {
      q: "Miksi jokaiselle työntekijälle valitaan palvelut?",
      a: "Koska varaussivu tarjoaa vain ne tekijät, jotka on liitetty asiakkaan haluamaan palveluun. Näin asiakas voi varata jokaisen tekijän vain niihin palveluihin, joita tämä oikeasti tekee.",
    },
    {
      q: "Missä asetan yhden työntekijän omat työajat?",
      a: "Paina henkilökuntalistassa kyseisen henkilön kortin kohdalla ”Työajat”. Siellä asetat työajat juuri hänelle.",
    },
    {
      q: "Mitä teen järjestelmässä, kun työntekijä lopettaa?",
      a: "Paina henkilökuntalistassa hänen korttinsa kohdalla ”Poista”. Hänelle ei tule enää varauksia, eikä hän voi enää kirjautua.",
    },
    {
      q: "Näkevätkö työntekijät asiakkaiden puhelinnumerot?",
      a: "Se riippuu antamistasi oikeuksista. Kampaaja / teknikko näkee vain omat varauksensa, kun taas Vastaanotto näkee asiakkaat ja yhteystiedot. Kohdassa ”Saa nähdä nämä osiot” on lisäksi oma kytkin osalle ”Asiakkaan puhelin ja sähköposti”.",
    },
  ],
  related: ["dich-vu", "gio-mo-cua", "lich-hen", "doanh-thu-nhan-vien"],
};

export default article;
