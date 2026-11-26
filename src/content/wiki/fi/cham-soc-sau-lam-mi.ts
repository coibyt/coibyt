import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cham-soc-sau-lam-mi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "ripsienpidennysten-ja-kestotaivutuksen-jalkihoito",
  lesson: "cham-soc-sau-lam-mi",
  category: "tips",
  title: "Ripsienpidennysten jälkihoito ja kestotaivutuksen jälkihoito: 3 sääntöä ensimmäisiin päiviin",
  metaTitle: "Ripsienpidennysten jälkihoito: 3 tärkeintä sääntöä",
  metaDescription:
    "Ripsienpidennysten ja kestotaivutuksen jälkihoito: älä hiero, pidä ripset kuivina 24 h ilman saunaa, huolto 2–3 viikon ja uusi taivutus 6–8 viikon päästä.",
  keyword: "ripsienpidennysten jälkihoito",
  keywords: ["kestotaivutuksen jälkihoito", "milloin ripsienpidennykset saa kastella", "saunominen ripsienpidennysten kanssa", "silmien hierominen pidennysten kanssa", "ripsienpidennykset ja nukkuminen", "mitä ei saa tehdä ripsienpidennysten jälkeen"],
  excerpt: "Älä hiero silmiä, pidä ripset kuivina 24 tuntia ja uusi ajallaan: kolme sääntöä pitävät pidennykset ja kestotaivutuksen kauniina, ja lisäksi arjen tavat, jotka kannattaa pitää.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-soi-guong-ngam-mi-moi-lam-xong"),
    alt: "Vaaleahiuksinen asiakas istuu kermanvärisessä tuolissa ja ihailee hymyillen ripsiään kultakehyksisestä käsipeilistä, ripsistylisti hymyilee hänen takanaan",
  },
  takeaways: [
    "**Älä hiero silmiä äläkä vedä tai nypi ripsiä**: hierominen kiertää ja irrottaa pidennyksiä, ja omat ripset lähtevät mukana.",
    "**Pidä ripset kuivina ensimmäiset 24 tuntia** äläkä mene saunaan tai höyryyn: liima ja taivutusaine tarvitsevat aikaa.",
    "Pidennykset **huolletaan 2–3 viikon välein**, kestotaivutus uusitaan **6–8 viikon välein**, kun uudet ripset ovat kasvaneet.",
    "Joka päivä: vältä öljyisiä tuotteita silmien ympärillä, pese ja harjaa ripset kevyesti.",
    "Nuku selällään tai kevyesti kyljelläsi, älä kasvot tyynyä vasten.",
  ],
  intro: [
    "Ripsienpidennysten jälkihoito, ja yhtä lailla kestotaivutuksen jälkihoito, on tärkeintä ensimmäisinä päivinä. Silloin liima ja taivutusaine vasta asettuvat, ja yksi silmien hieronta tai liian aikainen saunavuoro voi pilata koko käynnin, jonka ajan makasit paikallasi. Oppitunti tiivistää asian kolmeen sääntöön: älä hiero silmiä, pidä ripset kuivina 24 tuntia ja uusi ajallaan.",
    "Artikkeli perustuu VaraaAi Academyn kurssin ”Moja Beauty: ripset, kynnet ja kulmat” oppituntiin ”Ripsien jälkihoito pidennysten tai taivutuksen jälkeen”. Kurssi on lyhyitä asiakasvideoita helsinkiläiseltä Moja Beauty -salongilta. Luettuasi tiedät, mitä välttää ensimmäisenä päivänä, mitkä tavat pitävät ripset kauniina arjessa ja milloin palata salonkiin.",
  ],
  sections: [
    {
      id: "ala-hiero",
      title: "Sääntö 1: älä hiero silmiä äläkä vedä tai nypi ripsiä",
      blocks: [
        { p: "Silmien hierominen on vaikeimmin kitkettävä tapa ja ripsille haitallisin. Kun hierot, pidennykset siirtyvät paikoiltaan, kiertyvät toisiinsa ja irtoavat. Koska jokainen pidennys on kiinni omassa ripsessä, irtoava pidennys vie yleensä alla olevan oman ripsen mukanaan." },
        { img: { src: img("thoi-quen-sai-keo-bung-mi-noi-truoc-guong"), alt: "Esimerkki huonosta tavasta: vaaleahiuksinen nainen rypistää otsaansa peilin edessä ja nykii sormillaan pidennyksiä silmän ulkonurkasta", caption: "Huono tapa: pidennysten nykiminen, kun ne tuntuvat häiritsevän." } },
        { p: "Vetäminen ja nyppiminen ovat vielä pahempia. Kun ripsi sojottaa tai tarttuu johonkin, älä irrota sitä itse. Pidennyksen vetäminen repii samalla oman ripsen juuriltaan, ja toistuvasti tehtynä ripset kasvavat takaisin harvempina ja heikompina. Anna sen olla huoltoon asti, tai käy salongissa aiemmin, jos se häiritsee." },
        { note: "Älä käytä ripsentaivutinta pidennyksiin, ja vältä vedenkestävää ripsiväriä. Molemmat taittavat pidennyksiä tai vetävät niitä, kun poistat ripsiväriä.", kind: "tip", title: "Kaksi pientä asiaa, jotka unohtuvat" },
      ],
    },
    {
      id: "ensimmaiset-24-tuntia",
      title: "Sääntö 2: ripset kuivina 24 tuntia, ei saunaa eikä höyryä",
      blocks: [
        { p: "Ripsiliima ja kestotaivutuksen aine tarvitsevat molemmat aikaa asettuakseen. Ensimmäisten 24 tunnin aikana vesi, kuumuus ja höyry keskeyttävät tämän, joten tulos ei kestä: pidennykset irtoavat aikaisin ja taivutus menettää kaarensa. Ensimmäinen päivä on siksi kuivien ripsien päivä." },
        {
          table: {
            head: ["Ensimmäiset 24 tuntia", "Mitä teet sen sijaan"],
            rows: [
              ["Kasvojen pesu", "Pese kevyesti, pidä vesi poissa silmien ympäriltä"],
              ["Höyry, sauna", "Siirrä seuraavaan päivään"],
              ["Uinti", "Siirrä seuraavaan päivään"],
              ["Ripsiväri", "Ei ripsiväriä ensimmäisenä päivänä"],
            ],
          },
        },
        { p: "Tarkka aika voi vaihdella hieman salongin käyttämän liiman ja taivutusaineen mukaan. Jos ripsistylisti neuvoo toisin, noudata hänen ohjettaan, koska hän tietää, mitä tuotetta ripsiisi käytettiin." },
        { img: { src: img("go-mieng-lot-nhe-nhang-khi-mat-van-nham"), alt: "Mustaan käsineeseen pukeutunut sormi irrottaa varovasti valkoisen suojatyynyn asiakkaan suljetun silmän alta, ja juuri valmistuneet tuuheat mustat pidennykset tulevat näkyviin" } },
      ],
    },
    {
      id: "uusi-ajallaan",
      title: "Sääntö 3: uusi ajallaan",
      blocks: [
        { p: "Omat ripset irtoavat joka päivä luonnollisen kiertonsa mukaan, ja pidennykset lähtevät mukana. Kahden–kolmen viikon kuluttua setti alkaa näyttää harvalta ja epätasaiselta, ja jäljellä olevat pidennykset ovat kasvaneet omien ripsien mukana ulospäin. Silloin on huollon aika." },
        { img: { src: img("bo-mi-noi-sau-ba-tuan-mi-thua-va-moc-dai"), alt: "Lähikuva asiakkaan suljetusta silmästä, jossa on noin kolmen viikon ikäiset pidennykset, osa kasvanut ulos ja ripsirivi alkaa harveta", caption: "Setti noin kolmen viikon jälkeen: harvenee, ja osa pidennyksistä on kasvanut ulos." } },
        { p: "Kestotaivutuksessa tilanne on toinen. Kaari pysyy noin kuudesta kahdeksaan viikkoa, ja taivutus uusitaan, kun uudet ripset ovat kasvaneet suorina. Älä uusi aikaisemmin: liian tiheään toistettu taivutusaine voi kuivattaa ripsiä ja tehdä niistä hauraita." },
        {
          table: {
            head: ["Hoito", "Uusitaan"],
            rows: [
              ["Ripsienpidennykset", "Huolto 2–3 viikon päästä"],
              ["Ripsien kestotaivutus", "Uusi taivutus 6–8 viikon päästä"],
            ],
          },
        },
        { p: "Helpointa on varata seuraava aika jo ennen kuin lähdet salongista. Miksi ajallaan tehty huolto on vähemmän työtä kuin aloittaminen alusta, kerrotaan artikkelissa [miksi ripset ja kynnet kannattaa huoltaa ajallaan](lesson:dam-mi-mong-dung-hen)." },
      ],
    },
    {
      id: "arjen-tavat",
      title: "Arjen tavat, jotka pitävät pidennykset kauniina",
      blocks: [
        { p: "Ensimmäisen vuorokauden jälkeen pidennykset pitää pitää puhtaina, ei kuivina. Nämä tavat kannattaa pitää:" },
        {
          ul: [
            "Pese ripset kevyesti öljyttömällä ripsishampoolla ja harjaa ne sitten paikoilleen. Vaiheet ovat ohjeessa [näin peset ripsienpidennykset kotona](lesson:rua-mi-noi-tai-nha).",
            "Vältä öljypohjaisia meikinpoistoaineita, voiteita ja öljyjä silmien ympärillä, koska öljy pehmentää liimaa.",
            "Harjaa ripset joka päivä puhtaalla ripsiharjalla tyvestä kärkeen.",
            "Nuku selällään tai kevyesti kyljelläsi. Kasvot tyynyä vasten ripset painuvat, taittuvat ja irtoavat toiselta puolelta enemmän.",
          ],
        },
        { img: { src: img("ngu-nam-ngua-tren-goi-lua-giu-mi-noi"), alt: "Vaaleahiuksinen nainen nukkuu selällään samppanjanvärisellä silkkityynyllä kädet rinnan päällä, ja pidennykset lepäävät vapaasti painumatta", caption: "Selällään nukkuminen estää pidennyksiä taittumasta." } },
        { p: "Kestotaivutuksen jälkeen hoito on vielä yksinkertaisempaa: kun ensimmäinen päivä on ohi, elät normaalisti ja muistat vain olla hieromatta silmiä ja vetämättä ripsiä." },
        { img: { src: img("tho-chai-mi-sau-khi-uon-mi-xong"), alt: "Mustiin käsineisiin pukeutunut tekijä harjaa kevyesti silmät kiinni makaavan asiakkaan juuri taivutettuja omia ripsiä" } },
      ],
    },
    {
      id: "aiemmin-salonkiin",
      title: "Milloin salonkiin kannattaa palata aiemmin",
      blocks: [
        { p: "Joskus huoltoaikaa ei tarvitse odottaa:" },
        {
          ul: [
            "Muutama pidennys sojottaa, kiertyy tai hiertää silmää.",
            "Ripsiä lähtee yhdestä kohdasta tavallista enemmän.",
            "Haluat pidennykset pois: anna ripsistylistin poistaa ne ammattikäyttöön tarkoitetulla poistoaineella, äläkä revi niitä itse.",
          ],
        },
        { note: "Punaiset, kutisevat, turvonneet tai vuotavat silmät ripsihoidon jälkeen voivat olla merkki ärsytyksestä tai allergisesta reaktiosta. Kerro salongille ja käy lääkärissä.", kind: "warn", title: "Merkit, joiden vuoksi lääkäriin" },
        { img: { src: img("tho-mi-hoi-tham-khach-quay-lai-tiem"), alt: "Nutturapäinen ripsistylisti kumartuu kysymään kuulumisia ja katsomaan hymyilevän vaaleahiuksisen asiakkaan silmiä, kun tämä istuu kermanvärisessä tuolissa studiossa" } },
        { p: "Miksi oikein tehdyt pidennykset eivät vahingoita omia ripsiä, kerrotaan artikkelissa [pilaavatko ripsienpidennykset omat ripset](lesson:noi-mi-co-hai-mi-that). Jos sinulla on kysyttävää ripsien hoidosta, Moja Beauty auttaa mielellään; huoltoajan voit varata VaraaAissa [Moja Beautyn sivulta](/b/moja-beauty)." },
      ],
    },
  ],
  faq: [
    {
      q: "Milloin ripsienpidennykset saa kastella?",
      a: "Pidä ripset kuivina ensimmäiset 24 tuntia: pese kasvot kevyesti ja pidä vesi poissa silmien ympäriltä. Sen jälkeen voit pestä kasvot normaalisti ja puhdistaa ripset öljyttömällä ripsishampoolla.",
    },
    {
      q: "Voiko ripsienpidennysten kanssa saunoa?",
      a: "Ei ensimmäisten 24 tunnin aikana, koska kuumuus ja höyry estävät liimaa asettumasta. Ensimmäisen päivän jälkeen voit saunoa normaalisti; muista vain olla hieromatta silmiä.",
    },
    {
      q: "Mitä pitää välttää kestotaivutuksen jälkeen?",
      a: "Älä kastele ripsiä, vältä höyryä ja saunaa äläkä hiero silmiä ensimmäisten 24 tunnin aikana. Taivutusaine tarvitsee aikaa asettuakseen; jos ripset kastuvat liian aikaisin, kaari laskee nopeammin.",
    },
    {
      q: "Mitä tapahtuu, jos hieron silmiä ripsienpidennysten kanssa?",
      a: "Hierominen kiertää pidennyksiä, irrottaa niitä ja voi viedä omia ripsiä mukanaan. Jos huomaat kiertyneen tai sojottavan pidennyksen, älä vedä sitä; harjaa se kevyesti paikoilleen tai anna ripsistylistin hoitaa se huollossa.",
    },
    {
      q: "Kuinka usein ripsienpidennykset huolletaan ja kestotaivutus uusitaan?",
      a: "Pidennykset huolletaan kahden–kolmen viikon välein. Kestotaivutus uusitaan kuuden–kahdeksan viikon välein, kun uudet ripset ovat kasvaneet.",
    },
    {
      q: "Miten nukkua ripsienpidennysten kanssa?",
      a: "Selällään tai kevyesti kyljellään. Kasvot tyynyä vasten pidennykset painuvat ja taittuvat, joten niitä lähtee helposti enemmän toiselta puolelta.",
    },
  ],
  related: ["rua-mi-noi-tai-nha", "dam-mi-mong-dung-hen", "noi-mi-vs-uon-mi", "mi-dam-thao-hieu-dung"],
};

export default article;
