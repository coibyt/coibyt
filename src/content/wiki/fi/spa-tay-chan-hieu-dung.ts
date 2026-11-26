import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/spa-tay-chan-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "spa-jalkahoito-ja-kasihoito",
  lesson: "spa-tay-chan-hieu-dung",
  category: "spa",
  title: "Spa-jalkahoito ja -käsihoito: liotus, kuorinta, kantapäät, parafiinihoito ja jalka-altaan hygienia",
  metaTitle: "Spa-jalkahoito: liotus, kantapäät, parafiini ja hygienia",
  metaDescription:
    "Mitä spa-jalkahoito ja -käsihoito sisältävät: liotus, kuorinta, kantapäät, hieronta ja parafiini sekä jalka-altaan hygienia, vasta-aiheet ja diabeetikon hoito.",
  keyword: "spa-jalkahoito",
  keywords: [
    "spa-käsihoito",
    "parafiinihoito käsille ja jaloille",
    "kuinka kauan jalkoja liotetaan",
    "kantapäiden kovettumien poisto",
    "diabeetikon jalkahoito",
    "jalkakylvyn hygienia",
    "käsien ja jalkojen kuorinta",
  ],
  excerpt: "Spa-käsi- ja jalkahoito on liotusta, kuorintaa, kynsinauhojen hoitoa, kantapäiden tasoittamista, hierontaa ja parafiinia ilman lakkaa. Asiakas tulee lepäämään, ja tekijän tehtävä on pitää hänen jalkansa turvassa.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-ngam-chan-trong-buoi-cham-soc-tay-chan-tai-spa"),
    alt: "Valkoiseen kylpytakkiin pukeutunut asiakas istuu nojatuolissa ja liottaa molempia jalkojaan allaspussilla vuoratussa posliinialtaassa, ja mustiin käsineisiin pukeutunut kosmetologi istuu matalalla jakkaralla vieressä jutellen",
  },
  takeaways: [
    "Spa-käsi- ja jalkahoito tarkoittaa liotusta, kuorintaa, kynsinauhojen hoitoa, kantapäiden tasoittamista, hierontaa sekä naamiota tai parafiinia. **Ei kynsitaidetta eikä geelilakkaa.**",
    "Allaspussi ei korvaa puhdistusta: poista pussi jokaisen asiakkaan jälkeen, pese allas saippualla ja harjalla, huuhtele ja desinfioi koko vaikutusajan.",
    "Katso jalat, kädet ja varpaanvälit tarkasti ennen liotusta. Jos jokin näyttää poikkeavalta, jätä alue hoitamatta ja ohjaa asiakas lääkäriin.",
    "**Diabetesta** tai huonoa verenkiertoa sairastava asiakas: vain kädenlämpöinen vesi, lyhyt liotus, ei teriä, ei leikkaamista eikä kuumaa parafiinia.",
    "Kantapäiden kovettuman tarvitsee olla vain sileä, ei poistettu. Parafiini otetaan erilliseen kulhoon; asiakkaan käsiä tai jalkoja ei koskaan kasteta yhteiseen lämmittimeen.",
  ],
  intro: [
    "Spa-jalkahoito ei ole kynsipalvelu. Siinä ei tehdä kynsitaidetta eikä geelilakkausta. Hoitoon kuuluvat liotus, kuorinta, kynsinauhojen hoito, kantapäiden tasoittaminen ja hieronta, sitten naamio tai parafiini, ja spa-käsihoidossa sama tehdään käsille. Asiakas tulee lepäämään. Jalat ovat kuitenkin myös paikka, jossa sieni- ja bakteeritulehdukset leviävät helpoimmin, jos hygienia pettää, joten se osa, jota asiakas ei näe, on kaikkein tärkein.",
    "Artikkeli seuraa VaraaAi Academyn Spa ja ihonhoito -kurssin oppituntia ”Spa-käsi- ja jalkahoidot: ymmärrä ne, niin hoito on puhdas ja turvallinen”, joka on aiheen teoriaosa. Luettuasi ymmärrät, miksi jalka-allas pestään jokaisen asiakkaan jälkeen, milloin hoitoa ei tehdä, kuinka pitkälle kantapäissä mennään ja miten parafiinia käytetään hygieenisesti. Käytännön työvaiheet ovat artikkelissa [Käsi- ja jalkahoito ohje](lesson:spa-tay-chan).",
  ],
  sections: [
    {
      id: "spa-hoito-vs-kynsipalvelu",
      title: "Mitä spa-käsi- ja jalkahoito on ja miten se eroaa kynsipalvelusta",
      blocks: [
        { p: "Kynsipalvelu päättyy kauniisti lakattuihin kynsiin. Spa-käsi- ja jalkahoito päättyy puhtaisiin, pehmeisiin käsiin ja jalkoihin sekä asiakkaaseen, joka on saanut levätä. Siksi tahti on aivan toinen: hidas, lämmin ja hiljainen. Lämpimät pyyhkeet, lämmin vesi, hiljainen musiikki ja vähän puhetta, jos asiakas haluaa levätä." },
        {
          table: {
            head: ["Osa", "Mitä varten"],
            rows: [
              ["Liotus", "Puhdistaa ja pehmentää ihoa"],
              ["Kuorinta", "Poistaa kuivaa ihoa hienojakoisella kuorinnalla"],
              ["Kynsinauhojen hoito", "Puhdas, siisti ja hoidettu, ei lakkaa"],
              ["Kantapäiden tasoittaminen", "Sileämmät kantapäät, suojaava kovettuma säilyy"],
              ["Hieronta", "Auttaa asiakasta rentoutumaan"],
              ["Naamio tai parafiini", "Lisä hoito-ohjelman mukaan; lämmin parafiini pehmentää ihoa ja sitoo kosteutta"],
            ],
          },
        },
        { p: "Hidas tahti ei koskaan tarkoita, että jokin hygieniavaihe jätetään väliin. Jos asiakas haluaa kynsinauhojen leikkauksen, kynsien lyhennyksen ja lakan, kyse on toisesta palvelusta: katso [Manikyyri ja pedikyyri ohje](lesson:cham-soc-mong-co-ban)." },
      ],
    },
    {
      id: "jalka-altaan-hygienia",
      title: "Jalkakylvyn hygienia: allaspussi ei korvaa puhdistusta",
      blocks: [
        { p: "Tämä tapahtuu usein: hoitolassa on kiire, ja jalka-allas vain tyhjennetään, huuhdellaan ja täytetään seuraavalle asiakkaalle. Allas näyttää puhtaalta. Ihon ja saippuan jäämät tarttuvat kuitenkin altaan reunoihin ja poreammeen putkistoon, jossa bakteerit ja sienet viihtyvät hyvin. Seuraavan asiakkaan jalassa tarvitaan vain pieni naarmu." },
        { p: "Oppitunnin esimerkki on [Helsingin kaupungin hygieniaohje](https://www.hel.fi/static/liitteet-2019/Kymp/asuminen-ja-ymparisto/ymparistoterveys/Hygiene-premises-instructions.pdf): jalkakylpyaltaissa on käytettävä allaspusseja, ja jalkahoitovälineet steriloidaan aina, esimerkiksi autoklaavissa, ja säilytetään erillään muista välineistä. Helsingissä toimivalle tämä on suoraan oman kaupungin ohje." },
        { img: { src: img("lot-tui-moi-vao-bon-ngam-chan"), alt: "Mustiin käsineisiin pukeutunut kosmetologi polvistuu asettamaan uuden läpinäkyvän allaspussin pyyhkeen päällä seisovaan valkoiseen posliiniseen jalka-altaaseen", caption: "Jokaiselle asiakkaalle uusi allaspussi." } },
        { p: "Allaspussi on vasta ensimmäinen suoja. Jokaisen asiakkaan jälkeen allas käsitellään silti tässä järjestyksessä:" },
        {
          ol: [
            "Poista allaspussi.",
            "Pese allas saippualla ja harjalla.",
            "Huuhtele.",
            "Desinfioi ja anna aineen vaikuttaa koko etikettiin merkitty aika.",
          ],
        },
        { img: { src: img("co-rua-bon-ngam-chan-sau-moi-khach"), alt: "Mustiin käsineisiin pukeutunut kosmetologi polvistuu jalka-altaan viereen, josta pussi on poistettu, ja harjaa altaan sisäpintaa, vieressä valkoinen suihkepullo", caption: "Ensin pesu saippualla ja harjalla, sitten desinfiointi." } },
        { p: "Puhdistuksen on tultava ensin, koska lika heikentää desinfiointiaineen tehoa. Poreallas putkistoineen vaatii valmistajan lisäohjeet ja perusteellisemman puhdistuksen päivän päätteeksi. Metallivälineiden sterilointi käydään läpi oppitunnilla [Välineet jokaisen asiakkaan jälkeen](lesson:ve-sinh-dung-cu)." },
        { note: "Hygieniasäännöt ovat esimerkkinä Helsingin kaupungin ohjeesta. Määräykset vaihtelevat maittain ja paikkakunnittain, joten selvitä omaa toimintaasi koskevat vaatimukset. Artikkeli on koulutusmateriaalia, ei ammattipätevyys.", kind: "warn", title: "Määräykset vaihtelevat" },
      ],
    },
    {
      id: "katso-ennen-liotusta",
      title: "Katso jalat ja kädet tarkasti ennen liotusta",
      blocks: [
        { p: "Ennen kuin asiakkaan jalat koskevat veteen, katso jalat ja kädet tarkasti, myös varpaanvälit. Seuraavat merkit ovat syy jättää alue hoitamatta, joskus siirtää aikaa ja ohjata asiakas lääkäriin:" },
        {
          ul: [
            "Valkoinen, hilseilevä, halkeillut tai kutiseva iho varpaiden välissä.",
            "Paksut, värjäytyneet tai murenevat kynnet.",
            "Syylät.",
            "Avohaavat; punainen, kuuma ja kipeä turvotus.",
          ],
        },
        { img: { src: img("kiem-tra-ke-ngon-chan-truoc-khi-ngam"), alt: "Mustaan käsineeseen puettu käsi erottaa kevyesti kaksi varvasta valkoisella pyyhkeellä lepäävästä asiakkaan jalasta nähdäkseen varpaanvälin ihon", caption: "Varpaanvälit jäävät tarkastuksessa helposti katsomatta." } },
        { p: "Kosmetologi ei diagnosoi, vaan kertoo vain, mitä näkee. Hoitamatta jättämiselle on vielä yksi syy: välineet ja allas, joita käytetään sellaisen ihon kanssa, voivat siirtää ongelman toiselle asiakkaalle. Asiakkaalle puhumisesta kerrotaan oppitunnilla [Milloin asiakasta ei hoideta](lesson:khi-nao-khong-lam)." },
      ],
    },
    {
      id: "diabeetikon-jalkahoito",
      title: "Diabeetikon jalkahoito ja huono verenkierto: moninkertainen varovaisuus",
      blocks: [
        { p: "Jos asiakkaalla on diabetes tai jalkojen verenkierto on huono, jalkojen tunto voi olla heikentynyt. Hän ei välttämättä huomaa liian kuumaa vettä tai ihon naarmua. Pienikin haava voi parantua hyvin hitaasti. Siksi työtapa muuttuu:" },
        {
          ul: [
            "Vesi on vain kädenlämpöistä, ja testaat sen itse ensin.",
            "Lyhyt liotus.",
            "Ei teriä, ei leikkaamista.",
            "Ei kuumaa parafiinia.",
            "Hyvin kevyt hieronta.",
          ],
        },
        { note: "Jos jalassa on haavauma tai haava, sitä ei hoideta, vaan asiakasta neuvotaan käymään lääkärissä tai jalkaterapeutilla. Diabeetikon jalkojen omahoidosta oppitunti viittaa [Diabetes UK:n ohjeeseen](https://www.diabetes.org.uk/about-diabetes/complications/feet/taking-care-of-your-feet).", kind: "warn", title: "Milloin ei hoideta" },
      ],
    },
    {
      id: "liotus-kuorinta-kynsinauhat",
      title: "Kuinka kauan jalkoja liotetaan, miten kuoritaan ja mitä kynsinauhoille tehdään",
      blocks: [
        {
          table: {
            head: ["Vaihe", "Miten", "Raja"],
            rows: [
              ["Liotus", "Lämmin, ei kuuma vesi, testattuna ensin omaan ranteeseen. Yleensä noin viidestä kymmeneen minuuttia hoito-ohjelman mukaan", "Liian pitkä liotus pehmentää ihon liikaa, ja sitä on helppo raspata liikaa"],
              ["Suolat, öljyt", "Jaloille tarkoitetut tuotteet", "Valmistajan annostuksella"],
              ["Kuorinta", "Hienojakoinen kuorinta, kuten sokeri tai hieno suola, kevyin pyörivin liikkein. Kantapäät huolellisemmin, kädet paljon kevyemmin ohuemman ihon vuoksi", "Ei koskaan naarmujen, halkeamien tai ärtyneen ihon päälle"],
              ["Kynsinauhat", "Pehmennin ja sitten kevyt työntö", "Kynnen ympärillä oleva elävä iho on suojamuuri: sitä ei leikata"],
            ],
          },
        },
        { img: { src: img("thu-nuoc-ngam-chan-bang-co-tay"), alt: "Kosmetologi polvistuu pussilla vuoratun jalka-altaan viereen ja kastaa ranteensa sisäpuolen veteen kokeillakseen sen lämpöä, asiakkaan jalat odottavat vieressä pyyhkeellä", caption: "Kokeile vesi omalla ranteellasi ennen kuin asiakas laskee jalkansa altaaseen." } },
        { p: "Kynnen ympäriltä irtonaiset kuivat ihonpalat leikataan vain, jos olet saanut koulutuksen, ja steriloiduilla kynsinauhapihdeillä. Spa-käsi- ja jalkahoidossa kynnet vain puhdistetaan, siistitään ja hoidetaan, niitä ei lakata." },
        { img: { src: img("tay-da-chet-mu-ban-tay-nhe-nhang"), alt: "Kosmetologi hieroo kevyesti kuorintaa makaavan asiakkaan kämmenselälle, ja käsi lepää siististi taitetulla kermanvärisellä pyyhkeellä", caption: "Käsien iho on paljon ohuempaa kuin jalkojen, joten ote on selvästi kevyempi." } },
      ],
    },
    {
      id: "kantapaiden-kovettumat",
      title: "Pitääkö kantapäiden kovettumat poistaa? Tasoita, älä poista kaikkea",
      blocks: [
        { p: "Kantapäiden kovettumissa hoidon tavoite on sileä iho, ei kovettuman poistaminen kokonaan. Kovettuma suojaa jalkaa, ja jos se poistetaan kokonaan, suoja katoaa." },
        {
          ul: [
            "Käytä jalkaraspia kevyesti ja tasaisesti.",
            "Kovettumaterät ja skalpellit: älä käytä niitä, elleivät työpaikkasi määräykset ja koulutuksesi salli. Monessa paikassa se on jalkaterapeutin työtä.",
            "Syvät, vuotavat tai kipeät halkeamat: neuvo asiakasta käymään lääkärissä.",
          ],
        },
      ],
    },
    {
      id: "hieronta-naamio-parafiini",
      title: "Käsien ja jalkojen hieronta ja parafiinihoito: rentouttavaa mutta puhdasta",
      blocks: [
        { p: "Hieronta on se osa hoitoa, jonka asiakas muistaa parhaiten. Käytä kohtuullista painetta ja kysy asiakkaalta. Pitkät sivelyt kulkevat varpaista ja sormista kohti nilkkaa ja rannetta ja ylös pohkeeseen, sydäntä kohti. Suonikohjuja ei koskaan paineta. Jalkapohjan painelu rentoutumiseksi on hyvä, mutta älä lupaa, että se parantaa mitään." },
        { h3: "Miten parafiinia käytetään hygieenisesti" },
        { p: "Naamiot ja parafiini ovat lisiä hoito-ohjelman mukaan. Lämmin parafiini pehmentää ihoa ja sitoo kosteutta. Lämpötila noudattaa valmistajan ohjetta, se testataan aina ensin omaan ranteeseen, ja parafiinia käytetään vain ehjälle iholle." },
        {
          ul: [
            "Asiakkaan käsiä tai jalkoja ei koskaan kasteta suoraan yhteiseen lämmittimeen.",
            "Parafiini otetaan erilliseen kulhoon ja levitetään siveltimellä, tai käytetään asiakaskohtaisia pakkauksia.",
            "Käytetty parafiini heitetään pois, sitä ei kaadeta takaisin lämmittimeen.",
          ],
        },
        { img: { src: img("quet-paraffin-len-tay-bang-co-tu-bat-rieng"), alt: "Kosmetologi levittää siveltimellä parafiinia asiakkaan kädelle kivipöydällä, vieressä pieni posliinikulho erikseen otettua parafiinia ja taustalla lämmitin", caption: "Parafiini otetaan erilliseen kulhoon ja levitetään siveltimellä; asiakkaan kättä ei kasteta lämmittimeen." } },
        { p: "Syy on yksinkertainen: lämmin parafiini ei ole tarpeeksi kuumaa tappamaan bakteereja. Kun kaikki kädet kastetaan samaan lämmittimeen, bakteerit siirtyvät asiakkaalta toiselle." },
        { h3: "Ohjeet ja muistiinpanot" },
        { p: "Lopuksi levitetään kosteusvoidetta, ja asiakasta neuvotaan kosteuttamaan kädet ja jalat joka päivä. Kantapäät, joissa on paljon halkeamia, tai sisäänkasvaneet varpaankynnet kannattaa näyttää jalkaterapeutille. VaraaAissa merkitset asiakkaan sisäisiin muistiinpanoihin [asiakasrekisterissä](lesson:khach-hang) ihon kunnon, tehdyt hoidot ja mieluisan paineen. Kun asiakas tulee seuraavan kerran, muistiinpanoista näet heti, ovatko kantapäät parantuneet." },
      ],
    },
  ],
  faq: [
    {
      q: "Mitä spa-jalkahoitoon tai -käsihoitoon kuuluu?",
      a: "Hoitoon kuuluvat liotus, kuorinta, kynsinauhojen hoito, kantapäiden tasoittaminen ja hieronta, ja hoito-ohjelman mukaan lisäksi naamio tai parafiini. Toisin kuin kynsipalvelussa, siinä ei tehdä kynsitaidetta eikä geelilakkausta; kynnet vain puhdistetaan, siistitään ja hoidetaan.",
    },
    {
      q: "Kuinka kauan jalkoja liotetaan jalkahoidossa?",
      a: "Yleensä noin viidestä kymmeneen minuuttia hoitolan hoito-ohjelman mukaan, lämpimässä mutta ei kuumassa vedessä. Liian pitkä liotus pehmentää ihon liikaa, ja seuraavassa vaiheessa sitä on silloin hyvin helppo raspata liikaa.",
    },
    {
      q: "Pitääkö kantapäiden kovettumat poistaa terällä?",
      a: "Kantapäissä tavoite on sileä iho, ei kovettuman poisto, koska kovettuma suojaa jalkaa. Spa-hoidossa kantapäät raspataan kevyesti jalkaraspilla. Kovettumaterät kuuluvat vain niille, joilla on koulutus ja lupa käyttää niitä työpaikallaan. Syvät, vuotavat tai kipeät halkeamat kannattaa näyttää lääkärille.",
    },
    {
      q: "Voiko diabeetikko käydä spa-jalkahoidossa?",
      a: "Vain suurella varovaisuudella, koska jalkojen tunto voi olla heikentynyt ja pienet haavat paranevat hitaasti. Vesi on kädenlämpöistä ja testattu ensin, liotus on lyhyt, teriä, leikkaamista tai kuumaa parafiinia ei käytetä, ja hieronta on hyvin kevyt. Jos jalassa on haavauma tai haava, sitä ei hoideta, vaan asiakkaan kannattaa käydä lääkärissä tai jalkaterapeutilla.",
    },
    {
      q: "Mitä parafiinihoito tekee käsille ja jaloille?",
      a: "Lämmin parafiini pehmentää ihoa ja sitoo kosteutta. Sitä käytetään vain ehjälle iholle valmistajan ilmoittamassa lämpötilassa, kun tekijä on ensin testannut sen omaan ranteeseensa. Parafiini otetaan erilliseen kulhoon ja levitetään siveltimellä tai käytetään asiakaskohtaisia pakkauksia, ja käytön jälkeen se heitetään pois.",
    },
    {
      q: "Pitääkö allaspussilla vuorattu jalka-allas pestä jokaisen asiakkaan jälkeen?",
      a: "Pitää. Allaspussi ei korvaa puhdistusta. Jokaisen asiakkaan jälkeen pussi poistetaan, allas pestään saippualla ja harjalla, huuhdellaan ja desinfioidaan etikettiin merkityn vaikutusajan ajan. Puhdistus tehdään ensin, koska lika heikentää desinfiointiaineen tehoa.",
    },
  ],
  related: ["spa-tay-chan", "cham-soc-mong-co-ban-hieu-dung", "ve-sinh-dung-cu", "khi-nao-khong-lam"],
};

export default article;
