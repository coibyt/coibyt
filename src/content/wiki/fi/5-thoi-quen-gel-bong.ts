import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/5-thoi-quen-gel-bong/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "geelikynnet-irtoavat",
  lesson: "5-thoi-quen-gel-bong",
  category: "tips",
  title: "Geelikynnet irtoavat? 5 arjen tapaa, joiden takia geeli irtoaa, ja miten korjaat jokaisen",
  metaTitle: "Geelikynnet irtoavat? 5 tapaa, jotka kannattaa jättää",
  metaDescription:
    "Geelikynnet irtoavat muutamassa päivässä? Syy on usein tapa: nyppiminen, kynnet työkaluina, tiskit ilman hanskoja, sauna heti ja myöhäinen huolto. Näin korjaat.",
  keyword: "geelikynnet irtoavat",
  keywords: [
    "miten geelikynnet kestävät pidempään",
    "geeli irtoaa reunoista",
    "saako geelikynsien kanssa saunoa",
    "irrottaako tiskaaminen geelin",
    "kuinka usein geelikynnet huolletaan",
    "geelikynnet irtoavat muutamassa päivässä",
  ],
  excerpt: "Jos geeli irtoaa muutamassa päivässä, syy ei useinkaan ole pullossa vaan arjen tavoissa. Viisi yleisintä tapaa ja miten korjaat jokaisen.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-cho-tho-xem-mong-gel-bi-bong"),
    alt: "Tummansiniseen paitaan pukeutunut asiakas näyttää punaisia geelikynsiään vaaleahiuksiselle kynsiteknikolle marmoripöydän ääressä tyylikkäässä salongissa",
  },
  takeaways: [
    "Kun geelin reuna alkaa irrota, **älä nypi sitä**: mitä enemmän nypit, sitä enemmän se aukeaa, ja oman kynnen pintaa lähtee mukana.",
    "**Älä käytä kynsiä työkaluina** tölkkien avaamiseen, tarrojen irrottamiseen tai kansien vääntämiseen. Vipuvoima kohdistuu kynnen reunaan.",
    "**Käytä hanskoja** pitkissä tiskeissä ja pyykeissä. Vesi ja pesuaineet irrottavat reunoja vähitellen.",
    "Ensimmäisenä päivänä kynsien laiton jälkeen **vältä saunaa ja kuumaa kylpyä**.",
    "**Huollata ajallaan** äläkä anna mennä yli neljän viikon: kynnen kasvaessa geeli siirtyy kärkeen, ja kynsi katkeaa ja irtoaa helpommin.",
  ],
  intro: [
    "Geelikynnet irtoavat jo muutamassa päivässä, ja moni syyttää siitä lakkaa tai kynsiteknikkoa. Hyvin usein syy löytyy kuitenkin pienistä arjen tavoista: kerran nypitty reuna, kynnellä avattu tölkki, yhdet tiskit ilman hanskoja. Jokainen tapa tuo mukanaan voimaa tai kosteutta, jota ohut geelikerros ei kestä pitkään.",
    "Artikkeli perustuu VaraaAi Academyn kurssin ”Moja Beauty: ripset, kynnet ja kulmat” oppituntiin ”5 tapaa, joiden takia geelikynnet irtoavat”. Kurssi on lyhyitä asiakasvideoita helsinkiläiseltä Moja Beauty -salongilta. Luettuasi tiedät, mitkä tavat irrottavat juuri sinun geeliäsi, miten korjaat jokaisen ja milloin kannattaa mennä takaisin salonkiin näyttämään kynsiä.",
  ],
  sections: [
    {
      id: "miksi-geeli-irtoaa",
      title: "Miksi geeli irtoaa: se on vain kynnen pinnalla",
      blocks: [
        { p: "Geeli ei imeydy kynteen. Se tarttuu tiukasti oman kynnen pintakerrokseen kuin ohut kalvo. Kalvon heikoin kohta on sen reuna: kynsinauhan kohdalla, molemmilla sivuilla ja kärjessä. Kun reunaa vivutaan ylös, sen alle pääsee vettä tai alla oleva kynsi turpoaa ja kutistuu, geeli alkaa irrota kynnestä." },
        { img: { src: img("mong-son-gel-do-moi-lam-mong-va-deu"), alt: "Lähikuva sormesta kynsiteknikon mustakäsineisen käden päällä, lyhyt kynsi juuri tehdyllä kiiltävällä punaisella geelillä ja siistit, tasaiset reunat", caption: "Juuri tehdyt geelikynnet: reunat ovat siistit ja suljetut. Tästä eteenpäin kestävyys riippuu paljon siitä, miten käytät käsiäsi." } },
        { p: "Siksi alla olevilla viidellä tavalla on yksi yhteinen piirre: ne kaikki kohdistuvat geelin reunaan. Kun korjaat ne, oikein tehty geelilakkaus pysyy yleensä kunnossa seuraavaan huoltoaikaan asti." },
      ],
    },
    {
      id: "viisi-tapaa",
      title: "5 tapaa, joiden takia geelikynnet irtoavat",
      blocks: [
        { h3: "1. Reunan nyppiminen heti, kun se vähän irtoaa" },
        { p: "Kun reuna nousee hiukan, sormet hakeutuvat siihen itsestään. Mitä enemmän nypit, sitä enemmän se aukeaa, eikä geeli lähde yksin: se vie mukanaan ohuen kerroksen omaa kynttä. Seuraavalla kerralla geeli tarttuu huonommin kynnen pintaan, josta kerroksia on revitty." },
        { img: { src: img("son-gel-ho-mep-o-chan-mong"), alt: "Lähikuva punaisesta geelikynnestä mustakäsineisen kynsiteknikon otteessa, geeli kynsinauhan kohdalla on irronnut ja noussut kynnen pinnasta", caption: "Geeli irtoaa kynsinauhan kohdalta. Älä nypi, anna kynsiteknikon hoitaa se." } },
        { h3: "2. Tölkkien avaaminen, tarrojen irrottaminen ja kansien vääntäminen kynsillä" },
        { p: "Kynnet eivät ole työkaluja. Kun väännät kantta kynnen kärjellä, koko voima kohdistuu reunaan. Geeli halkeaa, reuna irtoaa ja joskus kärjestä lohkeaa kokonainen pala. Käytä lusikkaa, pientä veistä tai avaajaa, tai sormenpään pehmeää osaa kynnen kärjen sijaan." },
        { img: { src: img("son-gel-me-o-dau-mong-do-cay-mo-do"), alt: "Lähikuva punaisesta geelikynnestä, jonka kärjen kulmasta on lohjennut pala ja oma kynsi näkyy, käsineisen käden päällä", caption: "Lohkeama kärjessä johtuu yleensä siitä, että kynnellä on väännetty jotain auki." } },
        { h3: "3. Pitkät tiskit ja pyykit ilman hanskoja" },
        { p: "Vesi ja pesuaineet turvottavat geeliä, ja reunat irtoavat vähitellen. Myös oma kynsi imee vettä kuin sieni, turpoaa ja kutistuu taas kuivuessaan, eikä geeli pysty liikkumaan sen mukana. Kun kädet ovat pitkään vedessä useana päivänä viikossa, se riittää irrottamaan reunat." },
        { img: { src: img("deo-gang-tay-truoc-khi-lam-viec-voi-nuoc"), alt: "Henkilö marmorisen pesualtaan ääressä vetää mustia hanskoja käsiinsä, vieressä käsisaippuapullo ja hanskarasia", caption: "Laita hanskat käteen ennen tiskaamista, pyykinpesua ja siivoamista." } },
        { h3: "4. Sauna tai kuuma kylpy jo ensimmäisenä päivänä" },
        { p: "Lämpö ja kosteus turvottavat omaa kynttä, ja geeli irtoaa siitä helpommin. Jos saunot säännöllisesti, tämä on tärkein muistettava asia jokaisen kynsikäynnin jälkeen. Anna kynsien olla rauhassa ensimmäisen päivän ajan: ei saunaa, ei kuumaa ammetta tai paljua, ei pitkiä liotuksia." },
        { img: { src: img("ngam-tay-trong-nuoc-am-lam-mong-no-ra"), alt: "Asiakas upottaa sormenpäänsä valkoiseen posliinikulhoon, jossa on lämmintä vettä ja ruusun terälehtiä, salongin marmoripöydällä", caption: "Lämmin vesi saa kynnen imemään vettä ja turpoamaan. Geeli ei turpoa mukana." } },
        { h3: "5. Huolto vasta yli neljän viikon päästä" },
        { p: "Kynnen kasvaessa geeli siirtyy vähitellen kohti kärkeä. Kynnestä tulee kärkipainoinen, ja se katkeaa ja irtoaa helpommin. Kynsinauhan puolelle tulee kaistale uutta kasvua, jonka päällä ei ole geeliä." },
        { img: { src: img("mong-moc-ra-lo-khoang-o-chan-mong"), alt: "Lähikuva kirkkaalla geelillä päällystetystä kynnestä, joka on kasvanut, ja kynsinauhan vieressä näkyy kaistale paljasta omaa kynttä", caption: "Uutta kasvua näkyy tyvessä: on huollon aika." } },
      ],
    },
    {
      id: "nain-geeli-kestaa",
      title: "Miten geelikynnet kestävät pidempään: korjaa tapa kerrallaan",
      blocks: [
        {
          table: {
            head: ["Tapa", "Miksi geeli irtoaa", "Korjaus"],
            rows: [
              ["Reunan nyppiminen", "Aukko laajenee, kynnen kerroksia lähtee", "Anna olla, varaa aika salonkiin"],
              ["Kynnet työkaluina", "Vipuvoima osuu reunaan", "Käytä avaajaa tai sormenpäätä"],
              ["Tiskit ilman hanskoja", "Vesi ja pesuaine turvottavat geeliä", "Hanskat märkiin töihin"],
              ["Sauna heti", "Lämpö ja kosteus turvottavat kynttä", "Odota ensimmäisen päivän yli"],
              ["Myöhäinen huolto", "Geeli siirtyy kohti kärkeä", "Huolto ajallaan, alle 4 viikkoa"],
            ],
          },
        },
        { p: "Yksi hyvä tapa lisää: hiero kynsinauhaöljyä kynsien ympärysihoon joka päivä. Kun iho kynnen ympärillä on pehmeä, kynsinauhat repeilevät vähemmän, eikä geelin reunaan tule yhtä helposti koskettua." },
        { note: "Jos reuna on jo irronnut, älä tiputa rakoon liimaa äläkä lakkaa päälle. Irronneen kohdan alle voi kertyä vettä ja likaa. Varaa aika, niin kynsiteknikko viilaa irronneen osan pois ja huoltaa kynnen, tai poistaa geelin oikein. Artikkeli [mitä geelilakan repiminen tekee kynsille](lesson:tu-cay-son-gel) kertoo miksi.", kind: "warn", title: "Kun geeli on jo irronnut" },
      ],
    },
    {
      id: "kun-syy-on-salongissa",
      title: "Geelikynnet irtoavat muutamassa päivässä: milloin syy ei ole sinussa",
      blocks: [
        { p: "Kaikki irtoaminen ei johdu tavoista. Jos olet välttänyt kaikki viisi ja geeli irtoaa silti muutamassa päivässä, katso mistä kohtaa se irtoaa ja kerro siitä kynsiteknikolle. Kohta kertoo yleensä syyn." },
        {
          table: {
            head: ["Mistä se irtoaa", "Tavallinen syy"],
            rows: [
              ["Kynsinauhan kohdalta", "Kynnen pinnalle jäi ohutta ihoa ennen geeliä"],
              ["Kärjestä", "Kärkeä ei suljettu, tai kynnellä on väännetty"],
              ["Kokonainen pala lähtee", "Kynnessä oli rasvaa tai kosteutta, tai geeli jäi alikovetetuksi"],
            ],
          },
        },
        { p: "Huolellinen salonki katsoo, mistä geeli irtosi, ja korjaa oikean työvaiheen sen sijaan, että syyttäisi kaikesta asiakasta. Tekninen puoli selitetään kynsiteknikon kurssin artikkelissa [mikä on geelilakka](lesson:gel-hieu-dung)." },
      ],
    },
    {
      id: "huolto-ajallaan",
      title: "Kuinka usein geelikynnet huolletaan?",
      blocks: [
        { p: "Oppitunnin mukaan yli neljää viikkoa ei kannata odottaa. Kolmessa tai neljässä viikossa oma kynsi on kasvanut selvästi. Huolto tässä vaiheessa tasapainottaa muodon ja peittää uuden kasvun, joten kynnet pysyvät vahvoina ja tasaisina ilman, että kaikki aloitetaan alusta." },
        { img: { src: img("mong-dai-ra-lop-gel-troi-ra-dau-mong"), alt: "Lähikuva kirkkaalla geelillä päällystetystä kynnestä, joka on kasvanut reilusti sormenpään yli, kynsiteknikon mustakäsineisen käden päällä valoisassa salongissa", caption: "Liian pitkään odotettuna kynsi on pitkä ja kärkipainoinen. Silloin geeli katkeaa ja irtoaa helpoimmin." } },
        { p: "Helpointa on varata seuraava huolto heti, kun edellinen käynti on ohi. Oppitunti [miksi ripset ja kynnet kannattaa huoltaa ajallaan](lesson:dam-mi-mong-dung-hen) kertoo tästä lisää, ja artikkeli [kynsien huoltoväli](lesson:fill-mong-hieu-dung) selittää, mitä kynsiteknikko huoltokäynnillä tekee." },
      ],
    },
    {
      id: "nayta-kynsiteknikolle",
      title: "Irtoaako geeli aina liian aikaisin? Näytä kynsiteknikolle",
      blocks: [
        { p: "Jos geelikyntesi irtoavat joka kerta liian aikaisin, ota kuva irronneesta kohdasta ja [lähetä salongille viesti](lesson:chat-voi-salon) ennen käyntiä. VaraaAissa [varaat ajan netissä](lesson:dat-lich-online) valitsemalla palvelun ja ajan, ja voit tarkistaa tai siirtää varauksen [omista varauksistasi](lesson:lich-hen-cua-toi). Tämä oppitunti tulee Moja Beautysta Helsingistä, ja huoltoajan voit varata [Moja Beautyn varaussivulta](/b/moja-beauty)." },
      ],
    },
  ],
  faq: [
    {
      q: "Miksi geelikynnet irtoavat jo muutamassa päivässä?",
      a: "Yleensä jonkin tavan takia: reunan nyppiminen, kynsien käyttäminen avaamiseen, tiskaaminen ilman hanskoja tai saunominen ensimmäisenä päivänä. Jos olet välttänyt nämä ja geeli irtoaa silti aikaisin, syy voi olla kynnen esikäsittelyssä, joten mene takaisin salonkiin ja näytä, mistä geeli irtoaa.",
    },
    {
      q: "Saako geelikynsien kanssa saunoa?",
      a: "Vältä saunaa ja kuumaa kylpyä ensimmäisenä päivänä kynsien laiton jälkeen. Lämpö ja kosteus turvottavat omaa kynttä, jolloin geeli irtoaa siitä helpommin.",
    },
    {
      q: "Irrottaako tiskaaminen geelin?",
      a: "Pitkät tiskit ja pyykit ilman hanskoja voivat irrottaa geeliä vähitellen. Vesi ja pesuaineet turvottavat geeliä, ja reunat irtoavat kynnestä. Hanskojen käyttö märissä töissä on yksinkertaisin tapa saada geeli kestämään pidempään.",
    },
    {
      q: "Mitä teen, jos geeli irtoaa reunoista?",
      a: "Älä nypi tai revi, koska aukko vain laajenee ja oman kynnen pintaa lähtee geelin mukana. Varaa aika, niin kynsiteknikko viilaa irronneen osan pois ja huoltaa kynnen, tai poistaa geelin oikein salongissa.",
    },
    {
      q: "Kuinka usein geelikynnet pitää huoltaa?",
      a: "Älä anna mennä yli neljän viikon. Kolmessa tai neljässä viikossa kynsi on kasvanut, geeli on siirtynyt kohti kärkeä, ja kynsi on kärkipainoinen ja katkeaa tai irtoaa helpommin. Ajallaan tehty huolto pitää kynnet vahvoina ja tasaisina ilman, että kaikki tehdään alusta.",
    },
  ],
  related: ["tu-cay-son-gel", "mong-co-can-tho", "dam-mi-mong-dung-hen", "gel-hieu-dung"],
};

export default article;
