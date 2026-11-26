import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/noi-mong-form-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "kynsien-pidennys-muotilla",
  lesson: "noi-mong-form-hieu-dung",
  category: "nail",
  title: "Kynsien pidennys muotilla: paperi- vai metallimuotti, oikea pituus ja miksi pidennys katkeaa",
  metaTitle: "Kynsien pidennys muotilla: muotit, pituus ja virheet",
  metaDescription:
    "Kynsien pidennys muotilla: paperi- ja metallimuotti, miksi muotin on istuttava tiiviisti ja suoraan, pituuden valinta, rakenne, murtumat ja huoltoväli.",
  keyword: "kynsien pidennys muotilla",
  keywords: ["paperimuotti vai metallimuotti", "miksi geelipidennykset katkeavat", "pidennys kääntyy ylös", "koukkuun kaartuva kynsi", "kuinka pitkät kynsipidennykset", "geelipidennysten huoltoväli", "kestävätkö geelipidennykset"],
  excerpt: "Pidennyksessä muotilla kynnen pitkä osa rakennetaan rakennegeelistä väliaikaisen muotin päälle. Miten muotti ratkaisee kynnen muodon ja mitkä virheet katkaisevat pidennyksen.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("bo-mong-noi-form-dang-hanh-nhan-hoan-thien"),
    alt: "Asiakkaan kädet päällekkäin tyynyllä, kymmenen mantelinmuotoista kiiltävää maidonroosaa pidennystä",
  },
  takeaways: [
    "Muotti on vain **väliaikainen alusta** vapaan reunan alla. Geeli seuraa muottia, joten kynsi tulee sellainen kuin muotti on asetettu.",
    "Muotin on **istuttava tiiviisti vapaan reunan alla** ja jatkettava oman kynnen linjaa. Raosta geeli valuu alle, ja pidennys jää heikoksi ja irtoaa.",
    "Alas tai ylös kallistunut tai sivulle kääntynyt muotti vie virheen koko rakenteeseen. Viilaus ei sitä jälkikäteen juuri korjaa.",
    "Mitä pidempi pidennys, sitä suurempi voima kohdistuu rasitusalueelle. Ensimmäisellä kerralla valitaan **maltillinen pituus**.",
    "Pidennys, joka katkeaa poikki muutamassa päivässä, on yleensä tehty **ilman apexia**. Huolto tehdään yleensä 3–4 viikon välein.",
  ],
  intro: [
    "Kynsien pidennys muotilla onnistuu tai epäonnistuu jo ennen kuin geeliä on levitetty: siksi samasta purkista tehty pidennys kestää yhden tekijän käsissä huoltoon asti ja toisen käsissä katkeaa muutamassa päivässä. Pidennyksessä muotilla kynnestä tehdään rakennegeelillä omaa kynttä pidempi vapaan reunan alle asetetun muotin päälle. Hyvin tehty pidennys näyttää tyylikkäältä. Väärin tehty katkeaa, irtoaa tai kääntyy ylös kuin hyppyrimäki, ja moni virhe alkaa jo muotista.",
    "Artikkeli seuraa VaraaAi Academyn Kynnet-kurssin oppituntia ”Pidennykset muotilla: ymmärrä, niin pitkät kynnet eivät katkea”. Luettuasi osaat valita muotin, tarkistaa sen ennen geeliä, neuvoa asiakasta pituudessa ja katsoa pidennyksestä, miksi se katkesi.",
  ],
  sections: [
    {
      id: "paperi-ja-metallimuotit",
      title: "Mikä on pidennysmuotti: paperimuotti ja metallimuotti",
      blocks: [
        { p: "Muotti on väliaikainen alusta. Kynsiteknikko rakentaa geelin sen päälle, kovettaa sen ja irrottaa muotin, ja pitkä kynsi pysyy muodossaan omin voimin. Yleisimmät tyypit ovat paperimuotti ja metallimuotti." },
        { img: { src: img("form-giay-va-form-kim-loai-noi-mong"), alt: "Pidennystarvikkeet kermanvärisellä pyyhkeellä: pino keltaisia paperimuotteja, kolme metallimuottia, sakset, viila, sivellin, roosa geelipurkki ja lamppu", caption: "Keltaiset paperimuotit ja metallimuotit vierekkäin pidennyskäsittelyyn tarvittavien välineiden kanssa." } },
        {
          table: {
            head: ["Vertailu", "Paperimuotti", "Metallimuotti"],
            rows: [
              ["Käyttökerrat", "Tarrapintainen, käytetään kerran ja heitetään pois", "Käytetään uudelleen, kun se on puhdistettu ja desinfioitu kuten muutkin välineet"],
              ["Vahvuus", "Pehmeä, helppo leikata jokaiseen kynteen sopivaksi, aina uusi jokaiselle asiakkaalle", "Jäykkä, pitää linjan hyvin suorana"],
              ["Huomioitavaa", "Kaari leikataan uudelleen, jos se ei asetu vapaan reunan alle", "Oikea koko on valittava ja muotti käsiteltävä jokaisen asiakkaan jälkeen"],
            ],
          },
        },
        { p: "Kumpikaan ei ole selvästi parempi. Tärkeintä on, että muotti istuu tiiviisti juuri edessäsi istuvan asiakkaan vapaan reunan alla. Muotin päälle rakennetaan rakennegeeliä, joten jos geeli on sinulle uusi, lue ensin [mikä on rakennegeeli](lesson:builder-gel-hieu-dung)." },
      ],
    },
    {
      id: "tiivis-ja-suora",
      title: "Miksi muotin on istuttava tiiviisti ja suoraan",
      blocks: [
        { p: "Muotin tehtävä on jatkaa oman kynnen linjaa. Sivulta katsottuna se lähtee suoraan eteenpäin vapaasta reunasta, ikään kuin oma kynsi olisi vain kasvanut pidemmäksi. Ylhäältä ja kärjestä katsottuna se on samassa linjassa sormen kanssa eikä kallistu vasemmalle tai oikealle. Geeli vain seuraa muottia." },
        { img: { src: img("form-noi-mong-khit-duoi-dau-mong"), alt: "Sormi sivulta kuvattuna, ohut metallimuotti tiiviisti vapaan reunan alla ja suoraan eteenpäin suuntautuneena", caption: "Oikein asetettu muotti: tiiviisti vapaan reunan alla, oman kynnen linjan jatkeena." } },
        { h3: "Rako vapaan reunan ja muotin välissä" },
        { p: "Tämä sattuu usein aloittelijalle: muotti asetetaan kiireessä, ja vapaan reunan ja muotin väliin jää pieni rako. Geeli valuu rakoon ja kerääntyy vapaan reunan alle. Kun muotti irrotetaan, kynnen alla on geeliharjanne, jonka asiakas tuntee ja johon kertyy likaa. Pidennys ei ole kiinni omassa kynnessä, joten se on heikko ja irtoaa helposti. Työnnä muotti tiiviisti paikalleen ja leikkaa tarvittaessa sen kaarta asiakkaan kynteen sopivaksi." },
        { h3: "Kallistunut tai vino muotti" },
        {
          table: {
            head: ["Muotin asento", "Millainen pidennyksestä tulee"],
            rows: [
              ["Kallistuu alas", "Kynsi kaartuu alas kuin koukku"],
              ["Kallistuu ylös", "Kynsi kääntyy ylös kuin hyppyrimäki"],
              ["Kääntyy sivulle", "Kynsi on vino, sivuseinät eivät ole yhdensuuntaiset"],
            ],
          },
        },
        { img: { src: img("loi-form-chuc-xuong-ho-duoi-dau-mong"), alt: "Sormi sivulta kuvattuna, metallimuotti kallistuu alaspäin kynnen linjasta ja vapaan reunan alle jää rako", caption: "Kuvassa on virhe: muotti kallistuu alas eikä istu tiiviisti. Sen päälle rakennettu geeli kaartuu alas." } },
        { img: { src: img("loi-mong-noi-cup-xuong-nhu-cai-moc"), alt: "Maidonroosa pidennys sivulta kuvattuna, kärki kaartuu jyrkästi alas kuin koukku", caption: "Kuvassa on virhe: koukkuun kaartunut kynsi, koska muotti kallistui alas geeliä rakennettaessa." } },
        { img: { src: img("loi-mong-noi-bi-xien-lech-mot-ben"), alt: "Asiakkaan käsi, jossa yksi maidonroosa pidennys kaartuu sivulle eikä ole samassa linjassa sormen kanssa", caption: "Kuvassa on virhe: vino kynsi, koska muotti oli kääntynyt sivulle." } },
        { note: "Näitä virheitä on vaikea pelastaa viilaamalla jälkikäteen, koska virhe on koko kynnen rakenteessa. Ennen kuin laitat geelin, katso sormea kolmesta suunnasta: sivulta, ylhäältä ja kärjestä. Se vie muutaman sekunnin.", kind: "tip", title: "Tarkista muotti kolmesta suunnasta" },
      ],
    },
    {
      id: "pidennyksen-pituus",
      title: "Kuinka pitkät kynsipidennykset, ja mitä kynsiä ei pidennetä",
      blocks: [
        { p: "Ajattele pidennystä vipuna. Mitä pidempi se on, sitä enemmän voimaa kohdistuu rasitusalueelle joka kerta, kun kärki kolahtaa johonkin. Rasitusalue on kohta, jossa oma kynsi irtoaa kynsipedistä." },
        {
          ul: [
            "Pituuden on sovittava omaan kynteen. Jos oma kynsi on lyhyt ja ohut, älä tee pidennyksestä liian pitkää.",
            "Kysy asiakkaalta, mitä hän tekee työkseen ja arjessa. Kun asiakas kirjoittaa koneella koko päivän tai tekee käsillään töitä, maltillinen pituus kestää paljon pidempään.",
            "Ensimmäisellä kerralla valitaan maltillinen pituus.",
          ],
        },
        { p: "Kun puhut pituudesta asiakkaalle rehellisesti, hän luottaa sinuun enemmän." },
        { p: "Kaikkia kynsiä ei pidä pidentää. Aivan lyhyeksi purtu kynsi, jossa vapaata reunaa ei ole juuri lainkaan, antaa muotille vain vähän tukea, ja pidennys joutuu kantamaan lähes kaiken. Kynttä, joka irtoaa kynsipedistä, on värjäytynyt tai jonka ympärillä iho on punoittava ja turvonnut, ei käsitellä, ja asiakasta neuvotaan käymään lääkärissä. Merkit käydään läpi oppitunnilla [Milloin hoitoa ei tehdä](lesson:khi-nao-khong-lam)." },
      ],
    },
    {
      id: "pidennyksen-rakenne",
      title: "Kestävän geelipidennyksen rakenne",
      blocks: [
        { p: "Rakenne on sama kuin rakennegeelissä omalla kynnellä: ohut kynsinauhan kohdalla, ohut kärjessä ja paksuin apexissa rasitusalueen päällä. Kärjestä katsottuna C-kaari on tasainen molemmin puolin. Ylhäältä katsottuna sivuseinät ovat suorat ja yhdensuuntaiset. Pidennyksessä apex on vielä tärkeämpi, koska sen täytyy kantaa koko edessä oleva pitkä osa." },
        { img: { src: img("cau-truc-mong-noi-co-diem-apex"), alt: "Maidonroosa pidennys sivulta kuvattuna, pinta kaartuu pehmeästi ja korkein kohta on keskivaiheilla, kärki on siro", caption: "Sivulta katsottuna: korkein kohta on rasitusalueen päällä, ja kärki ohenee." } },
        {
          ul: [
            "**Kärjen** pitää olla ohut ja siro, mutta ei paperinohut. Alalla sitä verrataan usein pankkikortin paksuuteen. Liian paksu kärki tekee kynnestä kömpelön ja raskaan, liian ohut lohkeilee helposti.",
            "**Pidennyksen ja oman kynnen liitoskohta** on saumaton, eikä siinä tunnu porrasta.",
          ],
        },
        { h3: "Pidennys katkeaa poikki muutaman päivän jälkeen" },
        { p: "Yleisin murtuma kulkee suoraan rasitusalueen poikki. Sivulta katsottuna kynsi on litteä ja tasaisen ohut kuin lasilevy, ilman apexia. Geeliä oli tarpeeksi, mutta väärässä paikassa: ohut juuri siinä, missä sen piti olla paksuin. Korjaus ei ole koko kynnen paksuntaminen, vaan geelin laittaminen oikeaan kohtaan." },
        { img: { src: img("loi-mong-noi-phang-gay-o-vung-chiu-luc"), alt: "Pitkä, litteä ja tasaisen ohut pidennys sivulta kuvattuna, ja sen poikki kulkee halkeama kohdassa, jossa kynsi irtoaa sormenpäästä", caption: "Kuvassa on virhe: litteä kynsi ilman apexia, haljennut rasitusalueen poikki." } },
      ],
    },
    {
      id: "geeli-iholla-ja-turvallisuus",
      title: "Geeli iholla ja muut turvallisuusasiat",
      blocks: [
        { p: "Pidennyksessä geelillä on yksi reitti enemmän iholle: kynsinauhan ja sivukulmien lisäksi se voi valua muotin reunan yli sormenpäähän. Kovettumaton geeli iholla on tie allergiaan, ja siellä, missä geeli koskee ihoa, se irtoaa hyvin nopeasti." },
        { img: { src: img("loi-gel-tran-len-da-quanh-mong"), alt: "Lähikuva kirkkaalla roosalla geelillä päällystetystä kynnestä, jossa geeli on valunut iholle tyvessä ja tippuu sormen sivulle", caption: "Kuvassa on virhe: geeli on valunut kynnen ympärille iholle. Se pyyhitään pois ennen kovetusta." } },
        {
          ul: [
            "Jätä geelin ja ihon väliin aina hiuksenohut rako. Jos geeliä joutuu iholle, pyyhi se pois ennen kovetusta.",
            "Kytke pölynpoisto päälle viilatessa.",
            "Koveta valmistajan ilmoittama koko aika. Vajaasti kovettunut geeli on sekä heikko että aiheuttaa herkemmin allergiaa.",
          ],
        },
        { note: "Kovettumaton geeli ei koskaan koske ihoon, ei asiakkaan eikä omaasi. Kovetusajat ja tuotteiden käyttö noudattavat aina valmistajan ohjetta. Kynsituotteita koskevat määräykset vaihtelevat maittain.", kind: "warn", title: "Turvallisuussäännöt" },
        { p: "Allergian merkeistä ja ehkäisystä kerrotaan oppitunnilla [Allergiat ja kemikaalit](lesson:di-ung-hoa-chat)." },
      ],
    },
    {
      id: "pidennysten-huolto",
      title: "Kuinka usein geelipidennykset huolletaan",
      blocks: [
        { p: "Kun kynsi kasvaa, apex siirtyy vähitellen kohti kärkeä, kynsi muuttuu kärkipainoiseksi ja katkeaa helposti. Yleensä asiakkaan pitää tulla huoltoon 3–4 viikon välein. Kun huolto tehdään ajallaan, pidennykset kestävät pitkään ja pysyvät turvallisina. Jos huoltoa venytetään liian pitkään, kynsi katkeaa helposti ja vie joskus osan omasta kynnestä mukanaan." },
        { p: "Teoria päättyy tähän. Muotin leikkaaminen, asettaminen ja pidennyksen rakentaminen käsin käydään läpi käytännön artikkelissa [geelipidennykset muotilla vaihe vaiheelta](lesson:noi-mong-form)." },
      ],
    },
    {
      id: "pidennys-ja-huolto-palveluina",
      title: "Uusi pidennys ja huolto erillisiksi palveluiksi",
      blocks: [
        { p: "Uusi pidennyssetti ja huolto vievät eri ajan. VaraaAissa [luot kaksi palvelua](lesson:dich-vu), uuden pidennyksen ja pidennysten huollon, kummankin omalla kestollaan, jotta kalenteri ei ruuhkaudu. Molemmat hinnat kuuluvat salongin [hinnastoon](lesson:bang-gia), ja säännöllisesti huollossa käyvät asiakkaat sopivat hyvin [kanta-asiakaskortille](lesson:the-khach-quen)." },
      ],
    },
  ],
  faq: [
    {
      q: "Mihin kynsimuottia käytetään?",
      a: "Kynsimuotti on väliaikainen alusta, joka asetetaan vapaan reunan alle, kun kynnestä tehdään omaa kynttä pidempi. Rakennegeeli rakennetaan muotin päälle ja kovetetaan, sitten muotti irrotetaan ja pitkä kynsi pysyy muodossaan omin voimin.",
    },
    {
      q: "Kumpi on parempi, paperimuotti vai metallimuotti?",
      a: "Kumpikaan ei ole selvästi parempi. Paperimuotti on pehmeä, helppo leikata jokaiseen kynteen sopivaksi ja heitetään pois yhden käytön jälkeen. Metallimuotti on jäykkä, pitää linjan suorana ja käytetään uudelleen puhdistuksen ja desinfioinnin jälkeen. Tärkeintä on, että muotti istuu tiiviisti asiakkaan vapaan reunan alla.",
    },
    {
      q: "Miksi kynsipidennys kääntyy ylös tai kaartuu alas?",
      a: "Koska muotti oli kallistunut, kun geeli rakennettiin. Ylös kallistunut muotti tekee hyppyrimäen muotoisen kynnen, alas kallistunut koukkumaisen. Geeli seuraa muottia, joten virhe on koko rakenteessa eikä viilaus sitä jälkikäteen juuri korjaa.",
    },
    {
      q: "Miksi geelipidennykset katkeavat keskeltä poikki?",
      a: "Yleensä siksi, että kynnessä ei ole apexia: geeli on litteä ja tasaisen ohut, joten se on ohut juuri rasitusalueella, jossa sen pitäisi olla paksuin. Omaan kynteen nähden liian suuri pituus lisää myös tähän kohtaan kohdistuvaa voimaa. Korjaus on geelin oikea sijoittaminen, ei koko kynnen paksuntaminen.",
    },
    {
      q: "Voiko pureskeltuihin kynsiin tehdä pidennykset?",
      a: "Se on vaikeaa. Kun omassa kynnessä ei ole juuri lainkaan vapaata reunaa, muotilla on vähän tukea ja pidennys joutuu kantamaan lähes kaiken. Jos kynsi irtoaa kynsipedistä, on värjäytynyt tai sen ympärillä iho on punoittava ja turvonnut, kynttä ei käsitellä ja asiakkaan kannattaa käydä lääkärissä.",
    },
    {
      q: "Kuinka usein geelipidennykset pitää huoltaa?",
      a: "Yleensä 3–4 viikon välein. Kynnen kasvaessa apex siirtyy kohti kärkeä, kynsi muuttuu kärkipainoiseksi ja katkeaa helposti. Jos huoltoa venytetään liian pitkään, katkeava pidennys voi viedä osan omasta kynnestä mukanaan.",
    },
  ],
  related: ["noi-mong-form", "builder-gel-hieu-dung", "dap-bot-hieu-dung", "fill-mong-hieu-dung"],
};

export default article;
