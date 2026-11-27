import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/khach-dan-khach/${name}.webp`;
const shot = (name: string) => `/wiki/khach-dan-khach/fi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "suositteluohjelma-salongille",
  lesson: "khach-dan-khach",
  category: "marketing",
  title: "Suositteluohjelma salongille: kanta-asiakas jakaa kutsulinkin, ystävä käy ja suosittelija saa 2 lippua",
  metaTitle: "Suositteluohjelma salongille: kutsulinkki ja 2 bonuslippua",
  metaDescription:
    "Näin suositteluohjelma toimii kampaamossa, kynsistudiossa tai hoitolassa: kutsulinkki jokaisessa kanta-asiakaskortissa, 60 päivää aikaa ja 2 lippua käynnistä.",
  keyword: "suositteluohjelma salongille",
  keywords: [
    "asiakassuosittelu",
    "suosittele ystävälle -etu",
    "uusia asiakkaita kampaamoon",
    "kutsulinkki ystävälle ajanvaraukseen",
    "palkinto suosittelusta",
    "puskaradio kauneushoitolan markkinoinnissa",
    "kanta-asiakas tuo ystävän",
  ],
  excerpt: "Jokaisessa kanta-asiakaskortissa on valmiina oma kutsulinkki. Kun ystävä varaa sen kautta ja käy ensimmäistä kertaa, suosittelija saa automaattisesti 2 lippua.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("hai-nguoi-ban-om-chao-nhau-trong-salon"),
    alt: "Kaksi naista halaa iloisesti valoisassa salongissa, ja heidän takanaan kaksi asiakasta istuu violeteissa tuoleissa kahvikupit käsissään",
  },
  takeaways: [
    "Jokaisessa asiakkaan kanta-asiakaskortissa on **valmiina oma kutsulinkki**. Mitään ei tarvitse asettaa erikseen.",
    "Asiakas avaa korttinsa, vierittää kohtaan ”Kutsu ystävä” ja painaa ”Kopioi kutsulinkki” tai ”Jaa”-painiketta.",
    "Linkki **muistetaan 60 päivää**, joten vähän myöhemmin varaava ystävä lasketaan silti.",
    "Suosittelija saa **2 lippua**, kun ystävä todella käy salongissa ensimmäistä kertaa, ei silloin kun linkki lähetetään.",
    "Vain uudet asiakkaat ensimmäisellä käynnillään lasketaan, eikä kukaan voi kutsua itseään.",
  ],
  intro: [
    "Suositteluohjelma salongille vastaa kysymykseen, jota jokainen omistaja on miettinyt: mikä on tehokkain mainos, joka ei maksa juuri mitään? Vastaus on kanta-asiakas, joka suosittelee sinua ystävilleen. Usein puuttuu vain helppo tapa tehdä se ja kiitos, kun asiakas tekee sen.",
    "Tämä artikkeli seuraa VaraaAi Academyn oppituntia ”Suosittelut: kanta-asiakkaat tuovat uusia asiakkaita”. Näet, missä kutsulinkki on, mitä ystävä näkee avatessaan sen, milloin bonusliput lisätään ja miten asiasta kannattaa kertoa asiakkaille, jotta ohjelma oikeasti toimii.",
  ],
  sections: [
    {
      id: "miksi-suosittelut",
      title: "Miksi kanta-asiakkaiden suosittelut ovat vaivan arvoisin kanava",
      blocks: [
        { p: "Kynnet, hiukset ja ripset tehdään asiakkaan omaan kehoon, joten ystävän sana painaa enemmän kuin mikään mainos. Ystävä, joka sanoo ”siellä tehdään huolella”, on jo vastannut uuden asiakkaan suurimpaan huoleen." },
        { p: "VaraaAin suositteluohjelma sopii pienelle salongille kahdesta syystä:" },
        {
          ul: [
            "**Palkitset vain todellisista asiakkaista.** Bonusliput lisätään vasta, kun ystävä on käynyt. Jos uutta asiakasta ei tule, salongille ei synny kuluja.",
            "**Kenenkään ei tarvitse pitää kirjaa käsin.** Järjestelmä tietää linkin perusteella, kuka kutsui kenet, lisää liput ja lähettää suosittelijalle sähköpostin itse.",
          ],
        },
        { p: "Palkinto on lippuja samaan kanta-asiakaskorttiin, joten suosittelut ovat osa jo käytössä olevaa kanta-asiakasohjelmaa eivätkä erillinen järjestelmä, jota pitäisi hallita." },
      ],
    },
    {
      id: "mita-tarvitset",
      title: "Mitä tarvitset: kanta-asiakaskortit päällä ja aktivoituina",
      blocks: [
        { p: "Suosittelua varten ei tarvitse asettaa mitään erikseen. Tarvitset kaksi asiaa, jotka sinulla voi jo olla:" },
        {
          ol: [
            "Kanta-asiakaskorttiohjelma on otettu käyttöön hallintapaneelissa.",
            "Asiakkaalle on aktivoitu kortti.",
          ],
        },
        { p: "Kun molemmat ovat kunnossa, kutsulinkki on valmiina jokaisen asiakkaan kortissa. Ohjelman käyttöönotto ja korttien aktivointi kuvataan vaihe vaiheelta ohjeessa [kanta-asiakasohjelmasta kampaamolle](lesson:the-tich-diem)." },
        { img: { src: shot("asiakkaan-kortti-kortinhaltijat"), alt: "Hallintapaneelin Kortinhaltijat-lista, jossa Namin kortti on korostettu kultaisella: liput 2/5, 2 skannausta ja 0 etua, alla Aktivoi kortti asiakkaalle", caption: "Kun asiakkaalla on aktivoitu kortti, kutsulinkki on jo siinä." } },
        { note: "Mitä useammalla asiakkaalla on kortti, sitä useammalla on kutsulinkki. Ensimmäinen tehtävä on siis aktivoida kortit uskollisimmille kanta-asiakkaille, niille jotka puhuvat sinusta mielellään hyvää.", kind: "tip", title: "Aloita parhaista kanta-asiakkaista" },
      ],
    },
    {
      id: "palkinnon-saannot",
      title: "Palkinto suosittelusta: 2 lippua, 60 päivää ja kuka lasketaan",
      blocks: [
        { p: "Asiakkaat kysyvät säännöistä, joten koko tiimin kannattaa vastata samalla tavalla. Kaikki mahtuu tähän taulukkoon:" },
        {
          table: {
            head: ["Kysymys", "Sääntö"],
            rows: [
              ["Mitä suosittelija saa?", "2 lippua, jotka lisätään automaattisesti hänen kanta-asiakaskorttiinsa"],
              ["Milloin liput lisätään?", "Kun ystävä todella käy salongissa ensimmäistä kertaa. Ei silloin, kun linkki lähetetään, eikä silloin, kun ystävä avaa sen"],
              ["Kauanko ystävällä on aikaa varata?", "Linkki muistetaan 60 päivää, joten vähän myöhempi varaus lasketaan silti"],
              ["Kuka lasketaan suositelluksi asiakkaaksi?", "Vain uusi asiakas ensimmäisellä käynnillään"],
              ["Voiko asiakas kutsua itsensä?", "Ei voi"],
              ["Mistä suosittelija tietää?", "Järjestelmä lähettää hänelle sähköpostin hyvästä uutisesta, kun liput lisätään"],
            ],
          },
        },
        { p: "Se, tuntuvatko kaksi lippua paljolta, riippuu ohjelmastasi. Jos alennus tulee esimerkiksi viiden käynnin jälkeen, yksi onnistunut suosittelu vie asiakkaan lähes puoliväliin. Se on tarpeeksi iso kiitos, jotta linkin jakaminen kannattaa." },
      ],
    },
    {
      id: "mita-ystava-nakee",
      title: "Kutsulinkki ajanvaraukseen: mitä ystävä näkee",
      blocks: [
        { p: "Ystävä ei päädy kylmälle rekisteröitymissivulle. Linkki avaa kutsun, jossa on kanta-asiakkaasi nimi, salongin nimi ja osoite sekä rivi, joka kertoo, että tämän linkin kautta varattaessa salonki tietää, kuka suositteli." },
        { img: { src: shot("kutsusivu-suosittelijan-nimi"), alt: "Kutsusivu, jossa lukee Nam kutsuu sinut salonkiin Lumi Beauty Paris, osoite ja Namin viesti korostettuna kultaisella ja alla kultainen Varaa nyt -painike", caption: "Kutsussa on suosittelijan nimi, joten ystävä näkee heti, kuka sen lähetti ja missä salonki on." } },
        { p: "Heti ”Varaa nyt” -painikkeen alla ovat salongin suositut palvelut kestoineen ja hintoineen. Ystävä näkee, mitä salonki tekee ja mitä se maksaa, ennen kuin hän päättää." },
        { img: { src: shot("suositut-palvelut-kutsusivulla"), alt: "Kutsusivun Suositut palvelut -lista: Gel manicure, Gel pedicure, Classic lashes ja Lash lift ja tint minuutteineen ja euromääräisine hintoineen", caption: "Suositut palvelut tulevat salongin omasta palveluvalikosta." } },
        { p: "Kutsu käyttää salongille syöttämääsi nimeä, osoitetta ja palveluja. Selkeä palveluvalikko oikeine hintoineen, kuten ohjeessa [salongin palveluista ja hinnoista](lesson:dich-vu), ja [salongin profiili](lesson:ho-so-salon) hyvine kuvineen tekevät kanta-asiakkaasi kutsusta paljon vakuuttavamman." },
      ],
    },
    {
      id: "kerro-tiskilla",
      title: "Puskaradio kauneushoitolan markkinoinnissa: milloin kertoa ja mitä sanoa",
      blocks: [
        { p: "Vaikka kutsulinkki on valmiina, asiakas ei välttämättä tiedä siitä. Useimmat avaavat korttinsa vain näyttääkseen QR-koodin skannattavaksi eivätkä ole ehkä koskaan vierittäneet alemmas. Salongin tehtävä on näyttää se kerran." },
        { p: "Oppitunti neuvoo mainitsemaan asiasta tiskillä heti hoidon jälkeen, kun asiakas on tyytyväisimmillään. Silloin hän ihailee uusia kynsiään tai hiuksiaan peilistä, ja silloin mieleen tulee helpoimmin ystävä, jonka kannattaisi kokeilla salonkia." },
        {
          ul: [
            "**Näytä kädestä pitäen.** Kun skannaat kortin lisätäksesi lipun, pyydä asiakasta vierittämään kohtaan ”Kutsu ystävä” ja kokeilemaan ”Kopioi kutsulinkki” -painiketta.",
            "**Kerro palkinto.** Yksi lyhyt lause riittää, esimerkiksi: ”Lähetä tämä linkki ystävälle, niin kun hän käy ensimmäistä kertaa, korttiisi tulee kaksi lippua lisää.”",
            "**Laita tiskille pieni kyltti**, jossa lukee ”Suosittele ystävälle, saat 2 lippua”, niin asiakas lukee sen silloinkin, kun henkilökunta on kiireinen.",
          ],
        },
        { p: "Voit myös lähettää asiakkaalle ohjeen [salongin kanta-asiakaskortista](lesson:the-thanh-vien), joka on kirjoitettu asiakkaan näkökulmasta ja kertoo myös ystävien kutsumisesta." },
      ],
    },
    {
      id: "arjen-tilanteet",
      title: "Tavallisia tilanteita suositteluohjelmassa",
      blocks: [
        {
          table: {
            head: ["Tilanne", "Selitys"],
            rows: [
              ["Asiakas lähetti linkin, mutta lippuja ei ole tullut", "Liput lisätään vasta, kun ystävä todella käy ensimmäistä kertaa, ei silloin kun linkki lähetetään"],
              ["Ystävä avasi linkin viime kuussa ja varaa vasta nyt", "Linkki muistetaan 60 päivää. Sinä aikana tehty varaus lasketaan"],
              ["Asiakas suositteli henkilöä, joka oli jo salongin asiakas", "Ei lasketa. Vain uudet asiakkaat ensimmäisellä käynnillään lasketaan"],
              ["Asiakas ei löydä kutsulinkkiään", "Hän avaa kanta-asiakaskorttinsa ja vierittää kohtaan ”Kutsu ystävä”"],
              ["Asiakkaalla ei ole vielä korttia", "Aktivoi hänelle ensin kortti. Kutsulinkki on kortissa valmiina"],
            ],
          },
        },
        { p: "Aktivoi kortti myös suositellulle asiakkaalle heti hänen ensimmäisellä käynnillään. Hän on juuri nähnyt ystävänsä saavan palkinnon, joten hän ymmärtää ohjelman nopeammin kuin kukaan ja voi olla seuraava suosittelijasi. Toinen tapa tavoittaa uusia asiakkaita tuttujen kautta on kerrottu ohjeessa [lahjakorttien myymisestä salongissa](lesson:the-qua-tang-salon)." },
      ],
    },
  ],
  howTo: {
    title: "Suositteluohjelma salongille vaihe vaiheelta",
    id: "suositteluohjelman-vaiheet",
    after: "mita-tarvitset",
    lead: "Viisi vaihetta seuraavat yhtä kutsua kanta-asiakkaan kortista siihen hetkeen, kun bonusliput lisätään.",
    steps: [
      {
        name: "Ota kanta-asiakaskortit käyttöön ja aktivoi kortti asiakkaalle",
        text: "Määritä kanta-asiakasohjelma hallintapaneelissa ja aktivoi asiakkaalle kortti. Erillistä toimintoa ei tarvitse kytkeä päälle: kutsulinkki on jo jokaisen asiakkaan kortissa.",
      },
      {
        name: "Näytä asiakkaalle kohta ”Kutsu ystävä”",
        text: "Pyydä asiakasta avaamaan korttinsa ja vierittämään kohtaan ”Kutsu ystävä”. Siinä sanotaan suoraan: kun ystävä varaa linkin kautta ja käy ensimmäistä kertaa, asiakas saa automaattisesti 2 lippua.",
        image: { src: shot("kutsu-ystava-kortissa"), alt: "Asiakkaan kortin Kutsu ystävä -osio korostettuna kultaisella: +2-lippumerkki, kultainen Kopioi kutsulinkki -painike ja pyöreä jakopainike" },
      },
      {
        name: "Asiakas painaa ”Kopioi kutsulinkki” tai ”Jaa”",
        text: "Asiakas painaa ”Kopioi kutsulinkki” liittääkseen linkin haluamaansa paikkaan tai jakopainiketta lähettääkseen sen viestillä tai somessa. Jokaisella asiakkaalla on oma linkkinsä, joten järjestelmä tietää, kuka suositteli.",
        image: { src: shot("jakopainike-kutsulinkki"), alt: "Pyöreä jakopainike Kopioi kutsulinkki -painikkeen vieressä korostettuna kultaisella kortin Kutsu ystävä -osiossa" },
      },
      {
        name: "Ystävä avaa linkin ja painaa ”Varaa nyt”",
        text: "Ystävä avaa linkin ja näkee kutsun, jossa on kanta-asiakkaasi nimi ja salongin suositut palvelut. Hän painaa ”Varaa nyt” ja valitsee palvelun ja ajan. Linkki muistetaan 60 päivää, joten vähän myöhempi varaus lasketaan silti.",
        image: { src: shot("ystava-painaa-varaa-nyt"), alt: "Kutsu salonkiin Lumi Beauty Paris, jossa kultainen Varaa nyt -painike on korostettu kultaisella Namin ystävälle kirjoitetun viestin alla" },
      },
      {
        name: "Ystävä käy salongissa ja suosittelija saa 2 lippua",
        text: "Kun ystävä käy salongissa ensimmäistä kertaa, järjestelmä lisää suosittelijalle 2 lippua ja lähettää hänelle sähköpostin. Sinun ei tarvitse painaa mitään. Kun seuraavan kerran näet kanta-asiakkaasi, kasvokkain sanottu kiitos saa hänet suosittelemaan uudelleen.",
      },
    ],
  },
  faq: [
    {
      q: "Tarvitseeko VaraaAin suositteluohjelma omat asetuksensa?",
      a: "Ei tarvitse. Riittää, että kanta-asiakaskorttiohjelma on käytössä ja asiakkaalle on aktivoitu kortti. Kutsulinkki on valmiina jokaisen asiakkaan kortissa.",
    },
    {
      q: "Mitä suosittelija saa, kun ystävä käy salongissa?",
      a: "Suosittelija saa 2 lippua kanta-asiakaskorttiinsa. Järjestelmä lisää ne automaattisesti ja lähettää hänelle sähköpostin.",
    },
    {
      q: "Milloin bonusliput lisätään?",
      a: "Kun ystävä todella käy salongissa ensimmäistä kertaa. Lippuja ei lisätä, kun linkki lähetetään tai kun ystävä avaa sen, joten salongille ei synny kuluja, ellei uutta asiakasta tule.",
    },
    {
      q: "Kuinka kauan kutsulinkki on voimassa?",
      a: "Linkki muistetaan 60 päivää. Ystävä, joka varaa myöhemmin mutta 60 päivän sisällä, lasketaan suosittelijalle.",
    },
    {
      q: "Voiko asiakas kutsua itsensä saadakseen lippuja?",
      a: "Ei voi. Vain uudet asiakkaat ensimmäisellä käynnillään lasketaan, eikä kukaan voi kutsua itseään.",
    },
    {
      q: "Mistä asiakas löytää kutsulinkkinsä?",
      a: "Hän avaa kanta-asiakaskorttinsa, vierittää kohtaan ”Kutsu ystävä” ja painaa ”Kopioi kutsulinkki” tai jakopainiketta lähettääkseen linkin ystävilleen.",
    },
  ],
  related: ["the-tich-diem", "the-khach-quen", "the-qua-tang-salon", "the-thanh-vien"],
};

export default article;
