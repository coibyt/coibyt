import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/rua-mi-noi-tai-nha/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "ripsienpidennysten-pesu-kotona",
  lesson: "rua-mi-noi-tai-nha",
  category: "tips",
  title: "Ripsienpidennysten pesu kotona: 3 vaihetta, joilla ripset pysyvät puhtaina ja paikoillaan",
  metaTitle: "Ripsienpidennysten pesu kotona: 3 hellävaraista vaihetta",
  metaDescription:
    "Ripsienpidennysten pesu: vältä öljypohjaista meikinpoistoa, vaahdota öljytön ripsishampoo, harjaa noin 15 s per silmä, huuhtele viileällä, kuivaa ja harjaa.",
  keyword: "ripsienpidennysten pesu",
  keywords: ["miten pestä ripsienpidennykset", "pitääkö ripsienpidennykset pestä", "ripsishampoo", "meikinpoisto ripsienpidennysten kanssa", "öljypohjainen meikinpoistoaine ja pidennykset", "ripsienpidennysten kuivaus"],
  excerpt: "Ripsienpidennykset pestään joka päivä, mutta väärin pestyinä ne lähtevät nopeasti. Kolme vaihetta pesuun kotona ja miksi öljyistä meikinpoistoa kannattaa välttää.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("chai-lai-mi-noi-sau-khi-rua-trong-phong-tam"),
    alt: "Vaaleahiuksinen nainen kermanvärisessä silkkiaamutakissa seisoo marmorikylpyhuoneessa ja harjaa ripsienpidennyksiään pienellä ripsiharjalla peilin edessä",
  },
  takeaways: [
    "Ripsienpidennykset **pestään joka päivä**: pöly, ihon rasva ja meikki kertyvät ripsien tyveen, likaavat ripset ja heikentävät liimaa vähitellen.",
    "**Vältä öljypohjaisia meikinpoistoaineita ja voiteita** silmien ympärillä: öljy pehmentää liimaa, ja pidennykset irtoavat paljon aikaisemmin.",
    "Käytä **öljytöntä ripsishampoota** ja pehmeää harjaa, harjaa ripsien kasvusuuntaan noin **15 sekuntia silmää kohden**.",
    "Älä hankaa äläkä vedä. Huuhtele viileällä vedellä, taputtele kuivaksi paperilla ja kuivaa viileällä puhalluksella kaukaa.",
    "Harjaa ripset lopuksi tasaisiksi, kun ne ovat kuivuneet.",
  ],
  intro: [
    "Ripsienpidennysten pesu ei ole vaikeaa, mutta se eroaa paljon tavallisesta kasvojen pesusta. Pidennykset pestään joka päivä, jotta ripsien tyvi pysyy puhtaana; väärin pestyinä, hangattuina tai öljyisellä meikinpoistoaineella puhdistettuina ne lähtevät nopeasti. Koko rutiini on kolme vaihetta ja vie vain muutaman minuutin.",
    "Artikkeli perustuu VaraaAi Academyn kurssin ”Moja Beauty: ripset, kynnet ja kulmat” oppituntiin ”Näin peset ripsienpidennykset kotona”. Kurssi on lyhyitä asiakasvideoita helsinkiläiseltä Moja Beauty -salongilta. Luettuasi osaat pestä pidennykset kotona ilman että ripset lähtevät, ja tiedät, miksi öljypohjaisista meikinpoistoaineista kannattaa luopua.",
  ],
  sections: [
    {
      id: "miksi-pesta",
      title: "Pitääkö ripsienpidennykset pestä?",
      blocks: [
        { p: "Pitää, ja joka päivä. Ripsien tyveen kertyy pölyä, ihon rasvaa ja meikkiä juuri siihen kohtaan, jossa liimaliitos on. Kertymä tekee ripsirajasta epämukavan ja heikentää liimaa vähitellen. Puhtaat ripset myös pysyvät kuohkeina ja tasaisina, kun likaiset takertuvat yhteen." },
        { p: "Moni pelkää, että vesi saa pidennykset irtoamaan, ja välttää siksi pesua. Puhdas vesi ei kuitenkaan ole ongelma, paitsi ensimmäisten 24 tunnin aikana käynnin jälkeen, kun liima vielä asettuu. Pidennyksiä irrottavat öljy ja hankaaminen." },
      ],
    },
    {
      id: "valta-oljya",
      title: "Miksi öljypohjaista meikinpoistoa kannattaa välttää",
      blocks: [
        { p: "Öljy pehmentää ripsiliimaa. Kun käytät silmien ympärillä puhdistusöljyä, öljypohjaista puhdistusmaitoa tai täyteläistä silmänympärysvoidetta, ripsien tyven liima heikkenee joka kerta hieman, ja pidennykset irtoavat paljon tavallista aikaisemmin. Samasta syystä salongissa pidennykset poistetaan ammattikäyttöön tarkoitetulla poistoaineella eikä öljyllä silmien lähellä." },
        {
          table: {
            head: ["Tuote silmien ympärillä", "Kun sinulla on pidennykset"],
            rows: [
              ["Puhdistusöljy, puhdistusbalmi", "Vältä"],
              ["Silmänympärysvoide, öljypohjainen ihonhoito", "Vältä"],
              ["Öljytön ripsishampoo", "Käytä joka päivä"],
              ["Puhdas, viileä vesi", "Huuhteluun"],
            ],
          },
        },
        { note: "Lue tuotteen pakkausmerkinnät ennen kuin käytät sitä silmien lähellä. Jos et ole varma, onko tuotteessa öljyä, ota se mukaan seuraavaan huoltoon ja kysy ripsistylistiltä.", kind: "tip", title: "Kun et ole varma" },
      ],
    },
    {
      id: "pesun-jalkeen",
      title: "Pesun jälkeen: kuivaus ja harjaus",
      blocks: [
        { p: "Kuivaus on vaihe, joka tehdään useimmiten hätäisesti. Älä hankaa pyyhettä silmiin: hankaus kiertää pidennyksiä ja vetää niitä. Silmänympäryksen taputtelu paperilla riittää, ja viileä ilmavirta hoitaa loput." },
        { img: { src: img("lam-kho-mi-bang-luong-gio-mat-de-xa-mat"), alt: "Mustaan käsineeseen pukeutunut käsi pitelee pientä kermanväristä tuuletinta, joka puhaltaa kevyesti silmät kiinni makaavan asiakkaan ripsiin kaukana kasvoista", caption: "Salongissa ripset kuivataan pienellä tuulettimella. Kotona hiustenkuivaaja viileällä puhalluksella kaukana kasvoista ajaa saman asian." } },
        { p: "Kun ripset ovat kuivat, harjaa ne puhtaalla ripsiharjalla tyvestä kärkeen. Pidennykset erottuvat, asettuvat oikeaan suuntaan, ja ripsirivi näyttää kuin olisit juuri lähtenyt salongista." },
        { img: { src: img("hang-mi-noi-sach-va-deu-sau-khi-chai"), alt: "Lähikuva asiakkaan suljetusta silmästä, jossa puhdas, kuohkea ja tasainen musta pidennysrivi lepää valkoisen suojatyynyn päällä", caption: "Puhtaat, kuivat ja harjatut ripset pysyvät kuohkeina eivätkä takerru." } },
      ],
    },
    {
      id: "yleiset-virheet",
      title: "Yleiset virheet ripsienpidennysten pesussa",
      blocks: [
        {
          table: {
            head: ["Virhe", "Seuraus", "Tee näin"],
            rows: [
              ["Puhdistusöljy", "Liima pehmenee, ripset irtoavat", "Öljytön ripsishampoo"],
              ["Hankaus sormilla", "Ripset kiertyvät ja irtoavat", "Pehmeä harja kasvusuuntaan"],
              ["Pyyhkeellä hankaaminen", "Ripset kiertyvät, niitä vedetään", "Taputtele paperilla"],
              ["Kuuma ilma, kuivain lähellä", "Kuumuutta silmien vieressä", "Viileä puhallus kaukaa"],
              ["Harjaus jää tekemättä", "Ripset kuivuvat takkuisiksi ja vinoon", "Harjaa tyvestä kärkeen"],
              ["Pesu jää pois pelosta", "Likainen ripsiraja, liima heikkenee", "Pese kevyesti joka päivä"],
            ],
          },
        },
        { p: "Oikea pesu ei lopeta kaikkea ripsien lähtemistä: omat ripset irtoavat edelleen muutama päivässä kiertonsa mukaan, ja pidennykset lähtevät mukana. Oppitunti [miksi 2–5 ripsen lähteminen päivässä on normaalia](lesson:chu-ky-rung-mi) kertoo syyn." },
      ],
    },
    {
      id: "valineet-ja-huolto",
      title: "Mitä tarvitset ja milloin huoltoon",
      blocks: [
        { p: "Tarvitset vain kolme asiaa: pullon öljytöntä ripsishampoota, pehmeän ripsien pesuharjan ja puhtaan ripsiharjan." },
        { img: { src: img("chai-mi-bang-choi-sach-tu-chan-ra-ngon"), alt: "Mustaan käsineeseen pukeutunut käsi harjaa mustalla ripsiharjalla silmät kiinni makaavan asiakkaan ripsiä, valkoinen suojatyyny silmän alla" } },
        { p: "Oikein pestyinä ripset pysyvät kauniina huoltoon asti, yleensä kahdesta kolmeen viikkoa. Mitä ensimmäisenä päivänä pitää muistaa, kerrotaan artikkelissa [ripsienpidennysten jälkihoito](lesson:cham-soc-sau-lam-mi); jos haluat ymmärtää, miksi öljy ja vetäminen vahingoittavat omia ripsiä, lue [pilaavatko ripsienpidennykset omat ripset](lesson:noi-mi-co-hai-mi-that)." },
        { p: "Tarvitsetko ripsishampoon tai pesuharjan? Kysy Moja Beautysta seuraavalla käynnillä. Huoltoajan varaat VaraaAissa [Moja Beautyn sivulta](/b/moja-beauty)." },
      ],
    },
  ],
  howTo: {
    title: "Ripsienpidennysten pesu kotona: 3 vaihetta",
    id: "ripsienpidennysten-pesun-vaiheet",
    after: "valta-oljya",
    lead: "Pese joka päivä, alkaen toisesta päivästä käynnin jälkeen. Harjaus vie vain noin viisitoista sekuntia silmää kohden.",
    supplies: [
      "Öljytön ripsishampoo",
      "Pehmeä ripsien pesuharja",
      "Viileää vettä",
      "Talouspaperia tai nenäliinoja",
      "Hiustenkuivaaja, jossa on viileä puhallus",
      "Puhdas ripsiharja",
    ],
    steps: [
      {
        name: "Kostuta ripset ja ota vaahtoa",
        text: "Kostuta ripset kevyesti vedellä ja ota vähän öljytöntä ripsishampoota. Pehmeä vaahto pääsee ripsien tyveen ja poistaa pölyn, ihon rasvan ja meikin ilman hankaamista.",
        image: { src: img("co-mem-phu-bot-rua-mi-chai-nhe-chan-mi"), alt: "Valkoisen vaahdon peittämää pehmeää harjaa vedetään kevyesti ripsirajaa pitkin asiakkaan suljetussa silmässä, harjaa pitelee mustaan käsineeseen pukeutunut käsi" },
      },
      {
        name: "Harjaa kevyesti pehmeällä harjalla",
        text: "Harjaa pehmeällä harjalla kevyesti ripsien kasvusuuntaan, tyvestä kärkeen. Älä hankaa äläkä vedä; noin viisitoista sekuntia silmää kohden riittää. Pidä silmät kiinni koko ajan, ettei vaahtoa pääse silmiin.",
      },
      {
        name: "Huuhtele, taputtele ja kuivaa viileällä",
        text: "Huuhtele vaahto pois viileällä vedellä ja taputtele silmänympärys kuivaksi paperilla hankaamatta. Kuivaa hiustenkuivaajan viileällä puhalluksella kaukaa, kunnes ripset ovat täysin kuivat. Harjaa ne sitten tasaisiksi.",
        image: { src: img("xa-mi-bang-nuoc-sach-va-tham-bang-khan-giay"), alt: "Pieni valkoinen puristepullo huuhtelee ohuella vesisuihkulla silmät kiinni olevan asiakkaan ripsiä, ja toinen käsi pitää paperia silmän alla" },
      },
    ],
  },
  faq: [
    {
      q: "Pitääkö ripsienpidennykset pestä joka päivä?",
      a: "Pitää. Ripsien tyveen kertyy joka päivä pölyä, ihon rasvaa ja meikkiä juuri liimaliitoksen kohdalle. Kevyt pesu öljyttömällä vaahdolla pitää ripsirajan puhtaana ja auttaa pidennyksiä kestämään pidempään.",
    },
    {
      q: "Voiko puhdistusöljyä käyttää ripsienpidennysten kanssa?",
      a: "Ei kannata. Öljy pehmentää ripsiliimaa, joten pidennykset irtoavat paljon aikaisemmin. Käytä silmien ympärillä öljyttömiä tuotteita.",
    },
    {
      q: "Kauanko ripsienpidennysten pesu kestää?",
      a: "Itse harjaus vie vain noin viisitoista sekuntia silmää kohden. Kostutus, huuhtelu ja viileä kuivaus mukaan lukien koko rutiini kestää muutaman minuutin.",
    },
    {
      q: "Milloin ripsienpidennykset saa pestä ensimmäisen kerran?",
      a: "Pidä ripset kuivina ensimmäiset 24 tuntia, jotta liima ehtii asettua. Seuraavasta päivästä alkaen pese ne joka päivä kolmessa vaiheessa.",
    },
    {
      q: "Voiko ripsienpidennykset kuivata hiustenkuivaajalla?",
      a: "Voi, viileällä puhalluksella ja kuivain kaukana kasvoista. Taputtele sitä ennen silmänympärys kuivaksi paperilla äläkä hankaa pyyhkeellä.",
    },
    {
      q: "Mistä saa ripsishampoota?",
      a: "Helpointa on kysyä salongista, jossa pidennykset on tehty. Moja Beautyssa voit kysyä ripsishampoosta ja pesuharjasta käynnin yhteydessä.",
    },
  ],
  related: ["cham-soc-sau-lam-mi", "noi-mi-co-hai-mi-that", "chu-ky-rung-mi", "mi-classic"],
};

export default article;
