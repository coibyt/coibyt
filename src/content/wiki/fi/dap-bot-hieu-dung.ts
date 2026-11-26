import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/dap-bot-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "mita-ovat-akryylikynnet",
  lesson: "dap-bot-hieu-dung",
  category: "nail",
  title: "Mitä ovat akryylikynnet? Miten akryyli kovettuu, nesteen ja jauheen suhde ja turvallinen työ",
  metaTitle: "Mitä ovat akryylikynnet? Suhde, primer, MMA, turvallisuus",
  metaDescription:
    "Mitä akryylikynnet ovat, miten akryyli kovettuu ilman lamppua, liian märkä ja kuiva helmi, primer, miksi akryyli irtoaa, höyry ja pöly, MMA, huolto ja poisto.",
  keyword: "mitä ovat akryylikynnet",
  keywords: ["akryylin nesteen ja jauheen suhde", "akryylikynnet irtoavat", "MMA akryylikynsissä", "tarvitaanko akryylikynsiin lamppu", "akryylikynsien huoltoväli", "akryylikynsien poisto asetonilla", "hapoton primer"],
  excerpt: "Akryylikynnet rakennetaan nesteestä ja jauheesta, jotka kovettuvat ilmassa ilman lamppua. Suhde, rakenne, primer, MMA ja miten höyry ja pöly pidetään poissa salongin ilmasta.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-nail-dap-bot-acrylic-cho-khach-tai-salon"),
    alt: "Tummahiuksinen, matalalle nutturalle hiuksensa sitonut kynsiteknikko mustissa käsineissä tekee akryylikynsiä vaaleahiuksiselle asiakkaalle kivipöydän ääressä, jossa on kohdepoisto",
  },
  takeaways: [
    "Akryyli on **neste ja jauhe**. Kun ne kohtaavat, reaktio alkaa heti huoneilmassa ilman lamppua, ja helmi kovettuu muutamassa minuutissa.",
    "**Nesteen ja jauheen suhde** on tärkeintä: hyvä helmi on kostea, kiiltävä ja pyöreä, pitää muotonsa ja leviää vain vähän.",
    "Primer levitetään hyvin ohuesti ja vain kynsilevylle. Neste, primer ja kovettumaton akryyli **eivät koske ihoon**.",
    "Nesteen höyry on voimakas ja syttyvä: kohdepoisto työpisteessä, kannet kiinni, ei avotulta eikä ylijäänyttä nestettä viemäriin.",
    "Jos akryyli on irronnut, **viilaa irronnut osa pois ennen huoltoa**; sen päälle ei rakenneta. Huolto tehdään yleensä 2–3 viikon välein.",
  ],
  intro: [
    "Mitä ovat akryylikynnet? Ne ovat akryylistä rakennettuja pidennyksiä. Tekniikka on ollut käytössä todella pitkään, se on hyvin kestävä, ja moni asiakas valitsee sen yhä. Akryyli ei kuitenkaan anna anteeksi huolimatonta työtä. Väärä suhde, väärä rakenne tai tuotetta iholla, ja kynnet irtoavat, katkeavat ja joskus asiakas saa allergian.",
    "Artikkeli seuraa VaraaAi Academyn Kynnet-kurssin oppituntia ”Akryyli: ymmärrä, niin kynnet kestävät ja työ on turvallista”. Luettuasi ymmärrät, miten akryyli kovettuu, näet helmestä, onko se liian märkä vai kuiva, tiedät, miksi akryyli irtoaa, ja osaat järjestää työpisteen niin, ettei höyry ja pöly jää salonkiin.",
  ],
  sections: [
    {
      id: "miten-akryyli-kovettuu",
      title: "Miten akryyli kovettuu ilman lamppua",
      blocks: [
        { p: "Järjestelmässä on kaksi osaa: nestemäinen osa, jota alalla kutsutaan yksinkertaisesti nesteeksi, ja jauhe. Kun nesteeseen kastettu sivellin koskettaa jauhetta, ne sekoittuvat ja reaktio alkaa heti huoneilmassa. Muutamassa minuutissa pehmeä helmi kovettuu kiinteäksi massaksi." },
        { p: "Tämä on suurin ero geeliin. Geeli kovettuu vain lampussa, akryyli ei odota ketään. Helmen asettamiseen ja painamiseen on hyvin vähän aikaa, joten käden on oltava vakaa ja päättäväinen. Siksi akryyliä opetteleva harjoittelee ensin harjoituskynsillä ja vasta sitten asiakkailla." },
      ],
    },
    {
      id: "nesteen-ja-jauheen-suhde",
      title: "Nesteen ja jauheen suhde: oikea, liian märkä ja liian kuiva helmi",
      blocks: [
        { p: "Oikeanlainen helmi on kostea, kiiltävä ja pyöreä. Kynnelle asetettuna se pitää muotonsa ja leviää sitten hitaasti hieman, mutta ei valu. Jokaisella merkillä on oma suhteensa, joten lue merkin ohje ja harjoita kättäsi, kunnes suhde syntyy itsestään." },
        { img: { src: img("hat-bot-acrylic-tron-bong-tren-dau-co"), alt: "Akryylisiveltimen kärki koskettaa roosaa jauhepurkkia, ja siveltimessä on pyöreä, sileä ja kostean kiiltävä helmi", caption: "Oikea helmi: pyöreä ja kostean kiiltävä, ei tipu eikä murene." } },
        {
          table: {
            head: ["Helmi", "Tunnusmerkit", "Seuraus"],
            rows: [
              ["Oikea suhde", "Kostea, kiiltävä, pyöreä; pitää muotonsa ja leviää vain vähän", "Painamisen jälkeen pinta on sileä, kostean kiiltävä ja kuopaton"],
              ["Liian märkä (paljon nestettä, vähän jauhetta)", "Valuu kynsivalleihin ja kynsinauhan alueelle", "Kovettuu hitaasti ja jää heikoksi. Reagoimaton neste voi kerääntyä iholle, mikä on yksi tie allergiaan"],
              ["Liian kuiva (vähän nestettä, paljon jauhetta)", "Rakeinen pinta, pieniä huokosia, kärjen reuna murenee", "Tarttuu huonosti ja irtoaa helposti. Huokoinen pinta kerää likaa ja värjäytyy"],
            ],
          },
        },
        { img: { src: img("loi-hat-bot-qua-uot-chay-tran-len-da"), alt: "Lähikuva kynnestä, jonka roosa akryylikerros on aivan liian märkä, ja massa valuu iholle kynnen tyvessä ja sormen sivulle", caption: "Kuvassa on virhe: liian märkä helmi on valunut iholle kynnen ympärille." } },
        { img: { src: img("loi-hat-bot-qua-kho-mat-bot-san-co-lo"), alt: "Lähikuva roosasta akryylikynnestä, jonka pinta on karhea ja täynnä pieniä huokosia ja reuna murenee", caption: "Kuvassa on virhe: liian kuivasta helmestä tulee rakeinen, kuoppainen pinta ja mureneva reuna." } },
        { note: "Oman suhteesi voit tarkistaa katsomalla juuri painettua pintaa: sileä, kostean kiiltävä ja kuopaton tarkoittaa, että suhde on oikea.", kind: "tip", title: "Näin tarkistat itse" },
      ],
    },
    {
      id: "rakenne-ja-primer",
      title: "Akryylikynnen rakenne ja primerin tehtävä",
      blocks: [
        { p: "Rakenteeltaan akryyli on aivan kuin [rakennegeeli](lesson:builder-gel-hieu-dung): ohut aivan kynsinauhan vieressä, ohut kärjessä ja paksuin apexissa rasitusalueen päällä, siinä missä kynsi irtoaa kynsipedistä, hieman taaempana. Kärjestä katsottuna C-kaari on tasainen molemmin puolin ja sivuseinät suorat ja siistit. Pidennyksissä tämä on vielä tärkeämpää, sillä mitä pidempi pidennys, sitä suurempi voima taivuttaa kynttä joka päivä." },
        { img: { src: img("cau-truc-mong-bot-diem-apex-nhin-tu-canh-ben"), alt: "Roosa akryylipidennys sivulta kuvattuna, ohut tyvessä, korkeimmillaan keskellä ja ohenee siroksi kärkeä kohti" } },
        { p: "Se, tarttuuko akryyli hyvin, ratkeaa esikäsittelyssä: kuiva työ ilman liotusta, kynsinauha taakse ja kynsilevyyn kiinni jäänyt ohut ihokerros pois, kiilto pois kevyellä hionnalla, pöly ja rasva pois. Vasta sitten on primerin vuoro." },
        { img: { src: img("thoa-primer-mong-chi-tren-mat-mong"), alt: "Mustiin käsineisiin pukeutunut kynsiteknikko taputtelee ohuen kerroksen primeriä luonnonkynnelle pullon korkin pienellä siveltimellä, kaukana ihosta", caption: "Primer pysyy vain kynsilevyllä, kaukana tyven ja kulmien ihosta." } },
        { note: "Primereitä on hapollisia ja hapottomia. Kumpaa tahansa käytätkin, levitä hyvin ohut kerros vain kynsilevylle äläkä koskaan anna sen koskea ihoon, koska se voi polttaa ihoa. Mitä primeriä käytät, miten se levitetään ja kuinka kauan se kuivuu, tulee käyttämäsi akryylimerkin ohjeesta.", kind: "warn", title: "Primer ei koske ihoon" },
      ],
    },
    {
      id: "akryyli-irtoaa",
      title: "Miksi akryylikynnet irtoavat tyvestä",
      blocks: [
        { p: "Asiakas palaa viikon päästä, ja akryyli on irronnut kynsinauhan kohdalta. Syy on yleensä jokin näistä kuudesta:" },
        {
          ul: [
            "Kynttä ei esikäsitelty huolellisesti.",
            "Primeriä oli liian vähän tai liian paljon.",
            "Akryyliä joutui iholle tai valui kulmiin.",
            "Reuna kynsinauhan kohdalla oli liian paksu.",
            "Helmi oli liian kuiva.",
            "Apex puuttui, joten kynsi taipui joka päivä.",
          ],
        },
        { img: { src: img("mong-bot-bi-ho-o-chan-mong"), alt: "Lähikuva roosasta akryylikynnestä, joka on irronnut tyvestä: akryylin reuna on noussut ja sen alla näkyy vaalea sirpin muotoinen rako", caption: "Akryyli irronnut tyvestä: reuna on noussut ja alle on jäänyt tyhjää." } },
        { note: "Kun huomaat irtoamista, älä rakenna sen päälle. Irronneen kohdan alle voi jäädä vettä ja likaa, ja uusi akryyli sulkee ne sisään. Viilaa irronnut osa ensin pois ja tee vasta sitten huolto.", kind: "warn", title: "Irronnutta kohtaa ei peitetä" },
      ],
    },
    {
      id: "hoyry-poly-ja-neste",
      title: "Akryylin höyry, viilauspöly ja turvallinen työpiste",
      blocks: [
        { p: "Nesteellä on hyvin voimakas haju, se haihtuu nopeasti ja on helposti syttyvää. [Helsingin kaupungin hygieniaohjeessa](https://www.hel.fi/static/liitteet-2019/Kymp/asuminen-ja-ymparisto/ymparistoterveys/Hygiene-premises-instructions.pdf) sanotaan selvästi: jos tiloissa tehdään akryylikynsiä, työpisteessä on oltava riittävän tehokas kohdepoisto, ja myös viilauksessa syntyvä pöly on poistettava kohdepoistolla, jottei se leviä ympäri salonkia. Helsinkiläiselle salongille tämä on oman kaupungin ohje. Määräykset vaihtelevat maittain ja kunnittain, joten tarkista oman kuntasi vaatimukset, mutta periaate on sama: höyry ja pöly poistetaan siitä, missä ne syntyvät, ja viilatessa käytetään hengityssuojainta." },
        { img: { src: img("dua-mong-bot-tren-mieng-hut-bui-tai-ban"), alt: "Hengityssuojaimeen ja mustiin käsineisiin pukeutunut kynsiteknikko viilaa asiakkaan kynsiä suoraan kivipöytään upotetun pyöreän kohdepoiston yläpuolella", caption: "Viilaus suoraan kohdepoiston päällä: pöly imeytyy alas eikä nouse tekijän ja asiakkaan kasvoille." } },
        { p: "Muutama pieni tapa nesteen kanssa kannattaa pitää joka päivä:" },
        {
          ul: [
            "Kaada nestettä vain vähän, yhden asiakkaan tarpeeseen, pieneen kannelliseen dappen-astiaan. Pidä kansi kiinni aina, kun et käytä nestettä.",
            "Sulje iso pullo heti kaatamisen jälkeen.",
            "Pidä neste kaukana avotulesta ja lämmönlähteistä.",
            "Ylijäänyttä nestettä ei kaadeta viemäriin. Hävitä se tuotteen käyttöturvallisuustiedotteen ja paikallisten jätemääräysten mukaan.",
            "Nesteeseen kastuneet paperit menevät kannelliseen roska-astiaan.",
          ],
        },
        { img: { src: img("day-nap-chai-liquid-va-chen-nho-co-nap"), alt: "Mustaan käsineeseen pukeutunut käsi kiertää korkin pieneen lasipulloon, ja vieressä on kannellinen lasiastia ja keltainen kannellinen roska-astia" } },
        { p: "Allergiasta riittää tässä yksi lause: neste ja kovettumaton akryyli eivät saa koskaan koskea asiakkaan ihoon eivätkä omaasi. Loput kerrotaan oppitunnilla [Allergiat ja kemikaalit](lesson:di-ung-hoa-chat)." },
      ],
    },
    {
      id: "mma-neste",
      title: "Mikä on MMA akryylinesteessä ja miksi sitä vältetään",
      blocks: [
        { p: "Joissakin nesteissä on käytetty MMA:ta. Yhdysvalloissa elintarvike- ja lääkevirasto FDA poisti markkinoilta jo 1970-luvulla kokonaan tästä aineesta tehdyt nesteet, kun kynsi- ja ihovaurioita oli tullut paljon ([FDA:n tiedot](https://www.fda.gov/cosmetics/cosmetic-products/nail-care-products)). Saksan liittovaltion riskinarviointilaitos BfR neuvoo valmistajia olemaan käyttämättä MMA:ta jauhe–neste-järjestelmissä ([BfR:n lausunto 014/2012](https://www.bfr.bund.de/cm/349/liquid-agents-for-nail-modelling-with-high-methyl-methacrylate-contents-present-a-health-risk.pdf)). Ammattilaisille tarkoitetuissa nesteissä käytetään yleensä muita monomeerejä, kuten EMA:ta." },
        { note: "Osta vain selvästi merkittyjä tuotteita, joilla on käyttöturvallisuustiedote, luotettavalta toimittajalta. Epätavallisen halpa, ei selkeää merkintää, ei käyttöturvallisuustiedotetta: älä osta.", kind: "warn", title: "Nesteen valinta" },
      ],
    },
    {
      id: "huolto-ja-poisto",
      title: "Akryylikynsien huoltoväli ja poisto",
      blocks: [
        { p: "Kun kynsi kasvaa, akryyli siirtyy hitaasti kohti kärkeä ja vie apexin mukanaan. Kynsi muuttuu kärkipainoiseksi ja katkeaa ja irtoaa helpommin. Yleensä asiakkaan pitää tulla huoltoon 2–3 viikon välein. Kerro hänelle rehellisesti: akryyli on hyvin kestävä, mutta sen alla oleva oma kynsi tarvitsee silti hellää hoitoa. Kynsiä ei nypitä eikä niitä käytetä työkaluina vääntämiseen tai asioiden avaamiseen." },
        { p: "Akryyli liukenee asetoniin, mutta siihen menee selvästi kauemmin kuin geelillä. Viilaa akryyli ensin ohuemmaksi, liota asetonissa ja työnnä varovasti pois vain pehmenneet osat. Älä koskaan väännä äläkä napsauta akryyliä irti. Vaiheet ovat samat kuin artikkelissa [geelin oikea poisto](lesson:thao-gel), akryyli vain vaatii enemmän kärsivällisyyttä." },
        { img: { src: img("u-acetone-bang-giay-bac-de-thao-bot"), alt: "Asiakkaan käsi tyynyllä, viisi sormenpäätä kääritty folioon, ja vieressä seisoo pieni tiimalasi", caption: "Asetoniliotus vie aikaa, akryylillä pidempään kuin geelillä." } },
        { p: "Kun tämä on selvää, siirry käytännön artikkeliin [akryylikynnet vaihe vaiheelta](lesson:dap-bot-acrylic) harjoittelemaan helmen ottamista ja kolmen helmen tekniikkaa muotilla." },
      ],
    },
    {
      id: "akryylitarvikkeet-varastossa",
      title: "Akryylinesteen ja jauheen seuranta varastossa",
      blocks: [
        { p: "Neste ja jauhe on hankittava oikeasta lähteestä, eikä niiden kannata päästä loppumaan kesken niin, että joudut ostamaan kiireessä merkitsemätöntä tuotetta. VaraaAissa voit lisätä tuotteet [varastoon](lesson:kho-hang), jolloin näet, milloin on aika tilata lisää. Asiakkaan allergiahistoria kuuluu hänen [asiakastietoihinsa](lesson:khach-hang), jotta seuraava tekijä tietää sen ennen kuin avaa nestepullon." },
      ],
    },
  ],
  faq: [
    {
      q: "Tarvitaanko akryylikynsiin UV- tai LED-lamppua?",
      a: "Ei tarvita. Kun nesteeseen kastettu sivellin koskettaa jauhetta, reaktio alkaa heti huoneilmassa ja helmi kovettuu muutamassa minuutissa ilman lamppua. Koska akryyli ei odota, kynsiteknikon on asetettava ja painettava jokainen helmi päättäväisesti.",
    },
    {
      q: "Mikä on oikea nesteen ja jauheen suhde akryylissä?",
      a: "Oikea helmi on kostea, kiiltävä ja pyöreä. Kynnelle asetettuna se pitää muotonsa ja leviää hieman valumatta, ja painamisen jälkeen pinta on sileä, kostean kiiltävä ja kuopaton. Jokaisella merkillä on oma suhteensa, joten lue ohje ja harjoittele ensin harjoituskynsillä.",
    },
    {
      q: "Miksi akryylikynnet irtoavat tyvestä?",
      a: "Yleensä hätäisen esikäsittelyn, liian vähäisen tai runsaan primerin, iholle joutuneen akryylin, liian paksun tyvireunan, liian kuivan helmen tai puuttuvan apexin takia. Irronneen kohdan päälle ei koskaan rakenneta: irronnut osa viilataan ensin pois ja tehdään sitten huolto.",
    },
    {
      q: "Mikä on MMA akryylikynsissä?",
      a: "MMA on aine, jota on käytetty akryylinesteissä. Yhdysvaltain FDA poisti markkinoilta kokonaan MMA:sta tehdyt nesteet kynsi- ja ihovaurioiden jälkeen, ja Saksan BfR neuvoo valmistajia olemaan käyttämättä MMA:ta jauhe–neste-järjestelmissä. Ammattinesteissä käytetään yleensä muita monomeerejä, kuten EMA:ta.",
    },
    {
      q: "Kuinka usein akryylikynnet huolletaan?",
      a: "Yleensä 2–3 viikon välein. Kynnen kasvaessa akryyli ja apex siirtyvät kohti kärkeä, jolloin kynsi muuttuu kärkipainoiseksi ja katkeaa ja irtoaa helpommin. Ajallaan tehty huolto palauttaa rakenteen oikealle paikalle.",
    },
    {
      q: "Voiko akryylikynnet poistaa asetonilla?",
      a: "Voi. Akryyli liukenee asetoniin, mutta siihen menee selvästi kauemmin kuin geelillä. Kynsiteknikko viilaa paksuuden pois, liottaa kynnet asetonissa ja työntää varovasti pois vain pehmenneen massan. Akryyliä ei koskaan väännetä eikä napsauteta irti kynnestä.",
    },
  ],
  related: ["dap-bot-acrylic", "fill-mong-hieu-dung", "noi-mong-form-hieu-dung", "di-ung-hoa-chat"],
};

export default article;
