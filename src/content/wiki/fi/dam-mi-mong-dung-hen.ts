import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/dam-mi-mong-dung-hen/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "ripsien-huolto-vai-uusi-setti",
  lesson: "dam-mi-mong-dung-hen",
  category: "tips",
  title: "Ripsien huolto vai uusi setti? Miksi ripset ja geelikynnet kannattaa huoltaa ajallaan",
  metaTitle: "Ripsien huolto vai uusi setti? Miksi huoltaa ajallaan",
  metaDescription:
    "Ripsien huolto vai uusi setti, kun kaikki on lähtenyt? Miksi ripset harvenevat 2–3 viikossa, geelikynnet kasvavat 3–4 viikossa ja miksi huolto ajallaan kannattaa.",
  keyword: "ripsien huolto vai uusi setti",
  keywords: ["mitä jos ripsihuolto venyy", "kuinka usein geelikynnet huolletaan", "kasvaneet geelikynnet", "miksi geelikynnet katkeavat", "geelikynsien huolto ilman poistoa", "geelikynsi irtoaa ennen huoltoa"],
  excerpt: "Odottaa, että ripset ovat pudonneet ja geelit irronneet, kuulostaa säästäväiseltä, mutta lopulta se on enemmän työtä. Näin ripsien ja kynsien huolto ajallaan kannattaa.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("doi-tay-khach-voi-bo-mong-gel-moi-dam-tren-ban-da"),
    alt: "Asiakkaan kädet lepäävät päällekkäin kermanvärisellä käsityynyllä, lyhyet kynnet vaaleanpunaisina, vieressä viinilasi ja violetti pioni",
  },
  takeaways: [
    "**2–3 viikon** päästä osa pidennyksistä on lähtenyt omien ripsien mukana, ja ripsirivi on harva ja epätasainen. Huollossa aukot täytetään ja kasvaneet pidennykset vaihdetaan.",
    "**3–4 viikon** päästä oma kynsi on kasvanut ja geeli siirtynyt kohti kärkeä: kynsi on etupainoinen, katkeaa ja irtoaa helposti.",
    "**Kynsihuollossa** kynnen muoto tasapainotetaan ja kasvanut osa peitetään, eikä kaikkea tarvitse aloittaa alusta.",
    "Liian pitkään venytetty huolto on lähes uusi setti: se vie enemmän aikaa, ja joskus kaikki pitää poistaa.",
    "Helpoin tapa olla unohtamatta on varata seuraava huolto heti käynnin päätteeksi.",
  ],
  intro: [
    "Ripsien huolto vai uusi setti vasta, kun kaikki ripset ovat pudonneet, ja sama kysymys irtoilevista geelikynsistä? Moni odottaa, koska uskoo säästävänsä. Se ei kuitenkaan ole paras tapa: odotusviikkojen aikana ripsirivissä näkyy aukkoja, kynnet ovat etupainoisia ja katkeavat helposti, ja kun lopulta palaat salonkiin, työ vie paljon enemmän aikaa.",
    "Artikkeli perustuu VaraaAi Academyn kurssin ”Moja Beauty: ripset, kynnet ja kulmat” oppituntiin ”Miksi ripset ja kynnet kannattaa huoltaa ajallaan?”. Kurssi on lyhyitä asiakasvideoita helsinkiläiseltä Moja Beauty -salongilta. Luettuasi ymmärrät, mitä ripsienpidennyksille ja geelikynsille tapahtuu muutamassa viikossa ja miksi säännöllinen huolto pitää sinut kauniina vähemmällä vaivalla.",
  ],
  sections: [
    {
      id: "ripset-viikkojen-jalkeen",
      title: "Mitä ripsienpidennyksille tapahtuu 2–3 viikossa",
      blocks: [
        { p: "Omia ripsiä irtoaa muutama päivässä luonnollisen kierron mukaan, ja niissä kiinni olevat pidennykset lähtevät mukana. Kahden–kolmen viikon päästä osa setistä on lähtenyt. Ripsirivi alkaa näyttää harvalta ja epätasaiselta, ja aukot näkyvät. Samaan aikaan jäljellä olevat pidennykset ovat kasvaneet ulospäin omien ripsien mukana, liitos on siirtynyt kauemmas luomesta, ja osa pidennyksistä alkaa kiertyä sivuttain tai sojottaa." },
        { p: "Se ei tarkoita, että ripset olisivat vaurioituneet. Kyse on omien ripsien normaalista rytmistä, josta kerrotaan oppitunnilla [miksi 2–5 ripsen lähteminen päivässä on normaalia](lesson:chu-ky-rung-mi)." },
      ],
    },
    {
      id: "huolto-vai-uusi-setti",
      title: "Ripsihuolto vai uusi setti: huolto on nopeampi ja ripset pysyvät tasaisina",
      blocks: [
        { p: "Ripsihuollossa puuttuvien tilalle lisätään pidennyksiä ja kasvaneet vaihdetaan. Pidennykset, jotka näyttävät yhä hyviltä ja ovat lähellä luomea, jäävät paikoilleen. Koska koko settiä ei tehdä uudelleen, huolto on nopeampi kuin uusi setti, ja ripsesi ovat aina tasaiset ja tuuheat." },
        { img: { src: img("go-soi-mi-noi-da-moc-dai-khi-dam-mi"), alt: "Kaksi pinsettiä ripsistylistin mustiin käsineisiin pukeutuneissa käsissä poistaa kasvaneen pidennyksen silmät kiinni makaavan asiakkaan silmästä huollon aikana", caption: "Huollossa poistetaan pidennykset, jotka ovat kasvaneet kauas luomesta." } },
        { img: { src: img("gan-soi-mi-noi-moi-vao-cho-mi-thua"), alt: "Mustiin käsineisiin pukeutunut ripsistylisti kiinnittää kahdella pinsetillä uuden pidennyksen kohtaan, jossa silmät kiinni makaavan asiakkaan ripsirivi on harventunut", caption: "Uudet pidennykset tulevat irronneiden tilalle." } },
        { p: "Entä jos huolto venyy liian pitkälle? Kun suurin osa pidennyksistä on lähtenyt ja loput ovat kaikki kasvaneet ulos, huolto on lähes uusi setti. Jokainen salonki päättää itse, kuinka kauan edellisestä käynnistä se vielä lasketaan huolloksi, joten kysy omasta salongistasi. Helpointa on varata huolto heti käynnin päätteeksi." },
        { img: { src: img("kiem-tra-dinh-chum-sau-khi-dam-mi"), alt: "Mustiin käsineisiin pukeutunut ripsistylisti vetää pinsetit suoraan asiakkaan suljetun silmän pidennysten läpi tarkistaakseen, ettei ripsiä ole liimautunut yhteen" } },
        { note: "Huolto on myös hetki, jolloin ripsistylisti lukee settisi: jos toiselta puolelta lähtee enemmän, ulkonurkasta lähtee laikku tai ripsiä lähtee tasaisesti joka puolelta, jokaisella on oma syynsä. Kerro ripsistylistille, miten nukut ja miten poistat meikin. Ammattilaisen näkökulma on artikkelissa [ripsienpidennysten huoltoväli](lesson:mi-dam-thao-hieu-dung).", kind: "tip", title: "Mitä muuta huollossa tehdään" },
      ],
    },
    {
      id: "kynnet-viikkojen-jalkeen",
      title: "Kasvaneet geelikynnet 3–4 viikon jälkeen: miksi ne katkeavat",
      blocks: [
        { p: "Oma kynsi kasvaa koko ajan ja vie geelin mukanaan. Kolmen–neljän viikon päästä kynnen tyvessä näkyy kaistale uutta, peittämätöntä omaa kynttä ja porras kohdassa, jossa vanha geeli loppuu." },
        { img: { src: img("mong-gel-sau-mot-thang-lo-khoang-mong-that-o-chan"), alt: "Lähikuva sormesta, jossa läpikuultava vaaleanpunainen geeli on kasvanut noin kuukauden, ja kynsinauhan vieressä näkyy kaistale paljasta omaa kynttä", caption: "Noin kuukauden jälkeen: kaistale uutta kasvua kynnen tyvessä." } },
        { p: "Aukkoa tärkeämpi on tasapaino. Geelin paksuin kohta, joka oli asetettu juuri siihen, missä se tukee kynttä, siirtyy kohti kärkeä. Kynsi pitenee ja muuttuu etupainoiseksi kuin vipu: jokainen kolhu kohdistaa voiman siihen kohtaan, jossa kynsi irtoaa sormenpäästä. Kynsi katkeaa siitä helposti poikki tai irtoaa tyvestä." },
        { img: { src: img("loi-mong-noi-de-qua-lau-nut-o-vung-chiu-luc"), alt: "Esimerkki pitkästä geelipidennyksestä sivulta kuvattuna, haljennut rasitusalueelta juuri siitä kohdasta, jossa oma kynsi irtoaa sormenpäästä", caption: "Esimerkki: liian pitkään odottanut kynsi, etupainoinen ja haljennut rasitusalueelta." } },
      ],
    },
    {
      id: "kynsihuolto",
      title: "Kynsihuolto tasapainottaa kynnen, eikä kaikkea aloiteta alusta",
      blocks: [
        { p: "Kynsihuolto tasapainottaa koko setin, eikä se ole pelkkää lisägeeliä aukon päälle. Kynsiteknikko viilaa vanhaa materiaalia ohuemmaksi, erityisesti eteenpäin siirtynyttä paksua kohtaa, lyhentää kynttä tarvittaessa, peittää uuden kasvun ja rakentaa paksuimman kohdan eli apexin takaisin oikeaan paikkaan. Lopputulos on vahvat ja tasaiset kynnet, eikä kaikkea tarvitse poistaa ja tehdä uudelleen." },
        { img: { src: img("phu-gel-moi-len-phan-mong-moi-moc-khi-dam"), alt: "Pieni geelisivellin levittää tasaisen kerroksen läpikuultavaa vaaleanpunaista rakennegeeliä asiakkaan koko kynnelle, ja reuna on siisti kynsinauhan vieressä koskematta ihoon" } },
        {
          table: {
            head: ["Tilanne salonkiin tullessa", "Tavallinen toimenpide"],
            rows: [
              ["Uutta kasvua, vanha materiaali kiinni tiukasti", "Huolto"],
              ["Pieni irtoama reunassa", "Irtoama viilataan pois, sitten huolto"],
              ["Laajoja irtoamia, ilmataskuja", "Kaikki poistetaan ja tehdään uusi setti"],
              ["Vihreitä läikkiä, värimuutoksia, kipua, punoitusta", "Ei hoitoa, lääkäriin"],
            ],
          },
        },
        { p: "Kynsiteknikko ei koskaan rakenna irtoaman päälle. Sen alle jää vettä, öljyä ja likaa lämpimään ja kosteaan, mikä on otollinen paikka bakteereille ja sienille, ja päälle tehty uusi kerros irtoaa hyvin nopeasti. Siksi ajallaan tuleminen, kun vanha materiaali on vielä tiukasti kiinni, tekee huollosta helpomman." },
        { img: { src: img("thoi-quen-sai-tu-boc-son-gel-dang-bong"), alt: "Esimerkki huonosta tavasta: naisen kaksi kättä, joista toisen sormi kaivaa irti ja kuorii irtoilevaa punaista geelilakkaa toisen käden kynnestä", caption: "Huono tapa: irtoilevan geelin kuoriminen ohentaa omaa kynttä." } },
        { note: "Jos kynsi irtoaa, katkeaa tai kuoriutuu kahden käynnin välillä, älä kuori tai kaiva sitä. Mene salonkiin aiemmin. Jos irtoaman alla näkyy vihreä läikkä tai värimuutos tai sinulla on kipua, turvotusta tai punoitusta, käy lääkärissä.", kind: "warn", title: "Kun kynnessä on ongelma ennen huoltoa" },
        { p: "Kynnen tasapainosta ja paksuimmasta kohdasta voit lukea lisää artikkelista [kynsien huoltoväli](lesson:fill-mong-hieu-dung). Tavat, jotka saavat geelin irtoamaan aikaisin, kerrotaan oppitunnilla [5 tapaa, joiden takia geelikynnet irtoavat](lesson:5-thoi-quen-gel-bong)." },
      ],
    },
    {
      id: "huoltovalit",
      title: "Ripsien ja kynsien huoltovälit muistiin",
      blocks: [
        {
          table: {
            head: ["Hoito", "Huolto yleensä", "Merkit, että on aika"],
            rows: [
              ["Ripsienpidennykset", "2–3 viikon välein", "Harvat, epätasaiset ripset, aukkoja"],
              ["Geelikynnet", "3–4 viikon välein", "Uutta kasvua tyvessä, etupainoiset kynnet"],
            ],
          },
        },
        { p: "Nämä ovat tavallisia vaihteluvälejä; jos ripsesi irtoavat nopeammin, kyntesi kasvavat nopeammin tai teet paljon käsilläsi, voit tarvita huollon aiemmin." },
        { p: "Huoltojen välillä ripsien hoito ohjeen [ripsienpidennysten jälkihoito](lesson:cham-soc-sau-lam-mi) mukaan pitää setin kauniina huoltoon asti. Onko huollon aika? Voit [varata ajan Moja Beautyyn](/b/moja-beauty) VaraaAissa: valitse palvelu, valitse aika, valmis. Varauksen voi tarkistaa tai perua ohjeen [ajanvarauksen peruminen](lesson:lich-hen-cua-toi) mukaan." },
      ],
    },
  ],
  faq: [
    {
      q: "Kannattaako ripset huoltaa vai odottaa uutta settiä?",
      a: "Kannattaa huoltaa. Kahden–kolmen viikon päästä pidennysten lisääminen puuttuvien tilalle ja kasvaneiden vaihtaminen on nopeampaa kuin uusi setti, ja ripsesi ovat aina tasaiset. Jos odotat, että kaikki ovat lähteneet, ripsesi ovat viikkoja harvat ja epätasaiset, ja seuraava käynti on lähes kokonainen uusi setti.",
    },
    {
      q: "Kuinka usein ripsienpidennykset huolletaan?",
      a: "Yleensä kahden–kolmen viikon välein. Siihen mennessä osa pidennyksistä on lähtenyt omien ripsien mukana, ja aukkoja alkaa näkyä.",
    },
    {
      q: "Kuinka usein geelikynnet huolletaan?",
      a: "Yleensä kolmen–neljän viikon välein, kun oma kynsi on kasvanut. Jos kyntesi kasvavat nopeasti tai rasitat käsiäsi paljon, varaa aika aiemmin.",
    },
    {
      q: "Miksi kasvaneet geelikynnet katkeavat?",
      a: "Kun kynsi kasvaa, geelin paksuin kohta siirtyy kohti kärkeä ja kynsi muuttuu pitkäksi ja etupainoiseksi. Jokaisen kolhun voima kohdistuu siihen kohtaan, jossa kynsi irtoaa sormenpäästä, joten kynsi katkeaa siitä tai irtoaa tyvestä.",
    },
    {
      q: "Poistetaanko vanha geeli kokonaan kynsihuollossa?",
      a: "Ei, jos vanha materiaali on vielä tiukasti kiinni. Kynsiteknikko viilaa vanhan kerroksen ohuemmaksi, peittää uuden kasvun ja tasapainottaa muodon. Vain laajat irtoamat tai ilmataskut tarkoittavat, että kaikki poistetaan.",
    },
    {
      q: "Mitä teen, jos geelikynsi irtoaa ennen huoltoa?",
      a: "Älä kuori tai kaiva sitä, ja mene salonkiin aiemmin. Kynsiteknikko viilaa irtoaman pois eikä rakenna sen päälle. Jos näet vihreän läikän, värimuutoksen tai sinulla on kipua, turvotusta tai punoitusta, käy lääkärissä.",
    },
  ],
  related: ["chu-ky-rung-mi", "cham-soc-sau-lam-mi", "mi-dam-thao-hieu-dung", "fill-mong-hieu-dung"],
};

export default article;
