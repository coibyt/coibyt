import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/gel-biab-bot-gelx/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "geelilakka-vai-biab-akryyli-vai-gel-x",
  lesson: "gel-biab-bot-gelx",
  category: "tips",
  title: "Geelilakka vai BIAB? Erot, akryyli ja Gel-X sekä miten valitset omille kynsillesi",
  metaTitle: "Geelilakka vai BIAB? Erot sekä akryyli ja Gel-X",
  metaDescription:
    "Geelilakka vai BIAB, entä akryyli ja Gel-X? Mikä on kovin, kauanko kukin kestää, miten se poistetaan ja mikä sopii heikoille, terveille tai pitkille kynsille.",
  keyword: "geelilakka vai BIAB",
  keywords: [
    "BIAB vai akryyli",
    "geeli vai akryyli",
    "mikä on Gel-X",
    "BIAB heikoille kynsille",
    "kauanko BIAB kestää",
    "kestävätkö akryylikynnet",
  ],
  excerpt: "Neljä kynsihoitoa näyttää kädessä samalta, mutta kovuus, kesto ja poisto eroavat. Näin tiedät, minkä varaat.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("ban-lam-mong-voi-liquid-bot-acrylic-va-gel"),
    alt: "Tyylikkään kynsistudion marmoripöydällä akryylinestekuppi, purkki valkoista akryylijauhetta, purkki kirkasta geeliä ja asiakkaan odottava käsi",
  },
  takeaways: [
    "**Geelilakka** on ohut värikerros omassa kynnessä, se kovetetaan lampussa ja kiiltää noin kolme viikkoa. Se sopii terveille kynsille ja värin vaihtajille.",
    "**BIAB eli rakennegeeli** on paksumpaa ja tekee omalle kynnelle vahvan tukevan pohjan. Se sopii ohuille, helposti katkeaville kynsille, kun haluat kasvattaa pituutta luonnollisesti.",
    "**Akryyli** kovettuu itsestään ilmassa ja on neljästä vaihtoehdosta kovin. Se sopii, kun haluat pitkät ja kestävät kynnet.",
    "**Gel-X** on pehmeästä geelistä tehty kärki, joka kiinnitetään geelillä koko kynnen päälle: muoto on joka kynnessä sama, työ on nopeaa ja poisto onnistuu liottamalla.",
    "Valitsit minkä tahansa: kun reuna alkaa irrota, älä nypi sitä. Mene takaisin salonkiin poistoon tai huoltoon.",
  ],
  intro: [
    "Geelilakka vai BIAB, ja mihin akryyli ja Gel-X sijoittuvat? Tätä asiakkaat kysyvät useimmin, kun he avaavat kynsistudion palvelulistan. Kädessä kaikki neljä näyttävät kiiltäviltä ja siisteiltä. Ero on kiillon alla: materiaalissa, kovuudessa, siinä miten pinta kovettuu ja kuinka paljon kuormaa oma kynsi joutuu kantamaan.",
    "Artikkeli perustuu VaraaAi Academyn kurssin ”Moja Beauty: ripset, kynnet ja kulmat” oppituntiin ”Geelilakka, BIAB, akryyli vai Gel-X: mikä ero?”. Kurssi on lyhyitä asiakasvideoita helsinkiläiseltä Moja Beauty -salongilta. Luettuasi tiedät, mitä kukin hoito on, mikä niistä sopii omille kynsillesi ja mitä kannattaa kertoa kynsiteknikolle ajanvarauksen yhteydessä.",
  ],
  sections: [
    {
      id: "vertailu",
      title: "Neljä kynsihoitoa yhdellä silmäyksellä",
      blocks: [
        {
          table: {
            head: ["Hoito", "Mitä se on", "Kenelle se sopii"],
            rows: [
              ["Geelilakka", "Ohut värikerros, kovetetaan lampussa", "Terveet kynnet, värin vaihtajat"],
              ["BIAB (rakennegeeli)", "Paksu geeli, joka tekee vahvan pohjan", "Ohuet, katkeilevat kynnet, pituuden kasvatus"],
              ["Akryyli", "Jauhe ja neste, kovettuu itsestään", "Pitkät ja kestävät kynnet"],
              ["Gel-X", "Pehmeä geelikärki, kiinnitetään geelillä", "Sama muoto joka kynteen, nopea työ"],
            ],
          },
        },
        { p: "Oppitunnin lyhyin muistisääntö: värin vaihtoon geelilakka, heikkoihin kynsiin BIAB, pitkiin ja koviin akryyli, nopeaan Gel-X." },
      ],
    },
    {
      id: "geelilakka",
      title: "Geelilakka: värikerros omalla kynnellä",
      blocks: [
        { p: "Geelilakka on ohut värikerros, joka sivellään suoraan omaan kynteen. Toisin kuin tavallinen kynsilakka, se ei kuivu ilmassa vaan kovettuu vasta lampussa. Geeli tarttuu kynnen pintaan eikä imeydy sen sisään. Siksi kynnen pinnan puhdistus ja kuivaus ennen väriä ratkaisee, kauanko lakkaus kestää." },
        { img: { src: img("son-gel-mau-do-len-mong-cai"), alt: "Mustiin käsineisiin pukeutunut kynsiteknikko sivelee ohuella siveltimellä punaista geelilakkaa asiakkaan peukalon kynteen, peukalot rinnakkain pyyhkeellä", caption: "Geelilakka on ohut ja joustava värikerros. Se myötäilee kynttä mutta ei vahvista sitä." } },
        { p: "Oikein tehtynä geelilakka kiiltää noin kolme viikkoa. Siinä vaiheessa kynsi on kasvanut, ja lakka on aika poistaa ja tehdä uusi. Koska kerros on ohut ja joustava, se ei tue heikkoa kynttä: ohut kynsi voi geelilakan alla taipua ja katketa kuten ennenkin. Toisaalta se on kevein vaihtoehto, jos kyntesi ovat luonnostaan vahvat ja haluat joka kuukausi uuden värin." },
        { img: { src: img("mong-son-gel-do-bong-tren-mong-that"), alt: "Asiakkaan kädet päällekkäin kermanvärisellä pyyhkeellä, kymmenen lyhyttä kynttä kiiltävällä punaisella geelilakalla ja vieressä maljakko pioneja" } },
        { p: "Miksi geeli tarttuu, miksi se irtoaa ja onko se haitallista kynnelle, kerrotaan kynsiteknikon kurssin artikkelissa [mikä on geelilakka](lesson:gel-hieu-dung)." },
      ],
    },
    {
      id: "mika-on-biab",
      title: "Mikä on BIAB ja miksi se sopii heikoille kynsille",
      blocks: [
        { p: "BIAB on nimi, jota monet salongit käyttävät pullossa myytävästä rakennegeelistä. Se on paljon paksumpaa kuin geelilakka, koostumukseltaan hunajamaista. Lampussa kovetettuna siitä tulee oman kynnen päälle tukirakenne. Kynsiteknikot sanovat usein lyhyesti: geelilakka on takki, rakennegeeli on runko." },
        { img: { src: img("hat-builder-gel-biab-dat-giua-mong"), alt: "Lähikuva kynsiteknikosta, joka asettaa litteällä siveltimellä helmen kirkasta maidonroosaa rakennegeeliä asiakkaan kynnen keskelle", caption: "Rakennegeeli asetetaan helmenä ja levitetään niin, että paksuin kohta on siellä, missä kynsi yleensä katkeaa." } },
        { p: "Ohuet ja pehmeät kynnet, jotka taipuvat helposti, halkeilevat kärjestä ja katkeavat heti, kun niihin tulee vähän pituutta, ovat juuri niitä, joille BIAB sopii. Runko estää kynttä taipumasta joka päivä, joten saat pitää oman kynnen pituuden ja lopputulos näyttää silti luonnolliselta." },
        { note: "BIAB ei saa kynsiä kasvamaan nopeammin eikä korjaa niitä. Se suojaa kynttä, jotta se ei katkea kasvaessaan. Jos salonki lupaa, että geeli tekee kynsistä terveemmät, kannattaa kysyä tarkemmin.", kind: "info", title: "Hyvä tietää ennen varausta" },
        { p: "Useimmat BIAB-geelit poistetaan asetonilla, mutta osa kovista geeleistä täytyy viilata pois, joten poisto tehdään valmistajan ohjeen mukaan. Kun kynsi kasvaa, geeli siirtyy kohti kärkeä, ja siksi huolto on yleensä ajankohtainen 3–4 viikon välein. Jos vanha kerros on yhä hyvin kiinni, kynsiteknikko vain ohentaa sitä viilaamalla ja rakentaa kasvaneen osan uudelleen, eikä kaikkea tarvitse poistaa. Artikkeli [mikä on rakennegeeli](lesson:builder-gel-hieu-dung) kertoo kerroksen rakenteesta tarkemmin." },
      ],
    },
    {
      id: "akryylikynnet",
      title: "Akryyli: kovin vaihtoehto, sopii pituudelle",
      blocks: [
        { p: "Akryylissä on kaksi ainetta: neste, jota kynsiteknikot kutsuvat monomeeriksi tai vain nesteeksi, ja jauhe. Nesteellä kostutettu sivellin koskettaa jauhetta ja siihen muodostuu pehmeä helmi, jonka kynsiteknikko asettaa kynnelle ja muotoilee. Akryyli kovettuu ilmassa muutamassa minuutissa ilman lamppua." },
        { img: { src: img("hat-bot-acrylic-tren-dau-co"), alt: "Mustakäsineinen käsi kastaa akryylisiveltimen kärjen purkkiin vaaleanpunaista akryylijauhetta, ja siveltimen päässä on pyöreä kiiltävä akryylihelmi" } },
        { p: "Neljästä vaihtoehdosta akryyli on kovin. Siihen saa helposti pituutta, joten se sopii, kun haluat pitkät ja kestävät kynnet. Vastapainoksi nesteellä on voimakas haju, ja akryyliä tekevä salonki tarvitsee kohdepoiston suoraan työpöytään. Akryyli vaatii myös säännöllistä huoltoa, yleensä 2–3 viikon välein, koska kynnen kasvaessa akryyli siirtyy eteenpäin ja kynnestä tulee kärkipainoinen." },
        { img: { src: img("bo-mong-dap-bot-mau-hong-tu-nhien"), alt: "Asiakkaan kädet kermanvärisellä käsityynyllä, kymmenen luonnollisen vaaleanpunaista akryylikynttä tasaisen pyöristetyn kantikkaassa muodossa", caption: "Akryyli voi näyttää hyvin luonnolliselta. Sen ei tarvitse olla pitkää eikä paksua." } },
        { p: "Akryyli liukenee asetoniin, mutta paljon hitaammin kuin geeli. Kynsiteknikko ohentaa akryylin viilaamalla, kääräisee kynnen liotukseen ja työntää pehmenneen osan varovasti pois. Se on salongin työ, ei kotikonsti. Tekniikasta kerrotaan artikkelissa [mitä ovat akryylikynnet](lesson:dap-bot-hieu-dung)." },
      ],
    },
    {
      id: "mika-on-gel-x",
      title: "Mikä on Gel-X?",
      blocks: [
        { p: "Gel-X on valmiiksi muotoiltu, pehmeästä geelistä tehty kärki, joka peittää koko kynnen. Kynsiteknikko valitsee jokaiselle kynnelle sopivan koon, asettaa kärjen oman kynnen päälle ja kiinnittää sen geelillä. Koska kärjet on valettu valmiiksi, kaikissa kymmenessä kynnessä on sama muoto, ja käynti on yleensä nopeampi kuin kynsien rakentaminen kerros kerrokselta." },
        { p: "Gel-X poistetaan liottamalla. Se sopii, kun haluat kymmenen täsmälleen samanlaista kynttä istumatta pitkään salongin tuolissa." },
        { h3: "Geeli tarvitsee lampun, akryyli ei" },
        { p: "Geelilakka, BIAB ja Gel-X-kärjen kiinnitysgeeli kovettuvat vain lampussa. Lampun pitää olla valmistajan määräämää tyyppiä ja kovetusajan täysi. Jos sormia kuumottaa tai polttaa lampussa, kerro siitä kynsiteknikolle: käden ottaminen pois muutamaksi sekunniksi ja takaisin on aivan normaalia, eikä sitä tarvitse kestää hampaat irvessä." },
        { img: { src: img("ho-den-led-cho-gel-cung-lai"), alt: "Asiakkaan käsi lepää tasaisena valkoisen kupolinmuotoisen LED-kynsilampun sisällä, joka hehkuu violettina marmoripöydällä" } },
      ],
    },
    {
      id: "geeli-vai-akryyli",
      title: "Geeli vai akryyli? Valitse omien kynsiesi mukaan",
      blocks: [
        { p: "Älä valitse netin kauneimman kuvan perusteella. Valitse omien kynsiesi ja sen mukaan, miten käytät käsiäsi joka päivä. Muoto on oma valintansa: katso [5 kynnen muotoa samassa kädessä](lesson:5-dang-mong)." },
        {
          ul: [
            "**Terveet kynnet ja vaihdat mielelläsi väriä:** geelilakka.",
            "**Ohuet, helposti katkeavat kynnet ja haluat luonnollista pituutta:** BIAB.",
            "**Haluat pitkät, kovat kynnet, jotka kestävät kolhuja:** akryyli.",
            "**Haluat saman muodon joka kynteen ja nopeasti:** Gel-X.",
          ],
        },
        { p: "Jos kyntesi ovat ohuet, kipeät, värjäytyneet tai niissä on jotain epätavallista, älä ota mitään näistä vielä, vaan kysy ensin lääkäriltä tai apteekista. Artikkeli [tarvitsevatko kynnet hengähdystauon geelien välissä](lesson:mong-co-can-tho) kertoo, milloin tauko on paikallaan." },
        { img: { src: img("tho-nail-tu-van-chon-loai-mong-cho-khach"), alt: "Kermanväriseen paitaan ja mustiin käsineisiin pukeutunut kynsiteknikko pitää asiakkaan kättä ja neuvoo hymyillen marmoripöydän ääressä tyylikkäässä salongissa", caption: "Kerro kynsiteknikolle, mistä kohtaa kyntesi yleensä katkeavat ja mitä teet käsilläsi. Silloin valinta osuu paremmin kuin arvaamalla." } },
        { note: "Geeli, BIAB, akryyli tai Gel-X: kun reuna alkaa irrota, älä nypi sitä. Pinnoite on tiukasti kiinni kynnen pintakerroksessa, joten irti revittäessä se vie oman kynnen kerroksia mukanaan. Katso [mitä geelilakan repiminen tekee kynsille](lesson:tu-cay-son-gel).", kind: "warn", title: "Irtoaako reuna? Anna olla" },
      ],
    },
    {
      id: "kysy-ja-varaa",
      title: "Kysy ensin, varaa sitten",
      blocks: [
        { p: "Etkö tiedä, mikä sopii kynsillesi? Lähetä salongille ensin viesti ja kuva kynsistäsi sellaisina kuin ne nyt ovat. VaraaAissa voit [lähettää viestin salongille](lesson:chat-voi-salon) ja sitten [varata ajan netissä](lesson:dat-lich-online): valitse palvelu, valitse aika, valmis. Tämä oppitunti tulee Moja Beautysta Helsingistä, ja sen palvelut näet ja ajan varaat [Moja Beautyn varaussivulta](/b/moja-beauty)." },
      ],
    },
  ],
  faq: [
    {
      q: "Mikä ero on geelilakalla ja BIABilla?",
      a: "Geelilakka on ohut ja joustava värikerros, joka on lähinnä värin vuoksi eikä vahvista kynttä. BIAB on paljon paksumpaa rakennegeeliä, joka kovettuu oman kynnen päälle tukirakenteeksi. Geelilakka sopii terveille kynsille, BIAB ohuille ja helposti katkeaville.",
    },
    {
      q: "Kumpi on parempi heikoille kynsille, BIAB vai geelilakka?",
      a: "Ohuet ja pehmeät kynnet, jotka taipuvat ja katkeavat helposti, pärjäävät yleensä paremmin BIABilla, koska rakennegeeli estää kynttä taipumasta joka päivä. BIAB ei nopeuta kasvua eikä korjaa kynttä, vaan suojaa sitä, jotta se voi kasvaa katkeamatta.",
    },
    {
      q: "Kumpi kestää paremmin, akryyli vai geelilakka?",
      a: "Akryyli on yleisistä kynsihoidoista kovin, ja siihen saa helposti pituutta. Geelilakka on ohut ja joustava, ja oikein tehtynä se näyttää hyvältä noin kolme viikkoa. Akryyli tarvitsee säännöllistä huoltoa, yleensä 2–3 viikon välein, koska kynnen kasvu työntää akryyliä eteenpäin.",
    },
    {
      q: "Mikä on Gel-X ja miten se eroaa akryylistä?",
      a: "Gel-X on valmiiksi muotoiltu pehmeä geelikärki, joka asetetaan oman kynnen päälle ja kiinnitetään geelillä, joten kaikki kymmenen kynttä ovat samanlaiset ja työ on nopeaa. Akryylissä kynsiteknikko muotoilee jokaisen kynnen jauheesta ja nesteestä, ja se kovettuu ilmassa. Gel-X poistetaan liottamalla.",
    },
    {
      q: "Kauanko BIAB kestää ennen huoltoa?",
      a: "Huolto on yleensä ajankohtainen 3–4 viikon välein, koska kynsi kasvaa ja geeli siirtyy kohti kärkeä, jolloin kynnestä tulee kärkipainoinen ja se katkeaa helpommin. Jos vanha kerros on yhä hyvin kiinni, kynsiteknikko ohentaa sen ja rakentaa kasvaneen osan poistamatta kaikkea.",
    },
    {
      q: "Voiko geelin, BIABin tai akryylin poistaa itse kotona?",
      a: "Älä nypi tai revi sitä irti. Nämä pinnoitteet ovat tiukasti kiinni kynnen pintakerroksessa, joten irti revittäessä ne vievät omaa kynttä mukanaan. Anna salongin poistaa ne viilaamalla ja liottamalla poistoaineella valmistajan ohjeen mukaan.",
    },
  ],
  related: ["5-dang-mong", "tu-cay-son-gel", "mong-co-can-tho", "builder-gel-hieu-dung"],
};

export default article;
