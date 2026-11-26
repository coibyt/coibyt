import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cat-mai/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "verhotukan-leikkaus-ohje",
  lesson: "cat-mai",
  category: "hair",
  title: "Verhotukan leikkaus: 10 vaihetta keskeltä jaettuun otsatukkaan ja kasvoja kehystäviin suortuviin",
  metaTitle: "Verhotukan leikkaus: 10 vaihetta ilman liian lyhyttä",
  metaDescription:
    "Verhotukan leikkaus vaihe vaiheelta: kolmiojako, pitkä ensimmäinen leikkaus, viistot puolikkaat, kasvojen kehystys, föönaus ja viimeistely kuivana.",
  keyword: "verhotukan leikkaus",
  keywords: [
    "verhotukka vaihe vaiheelta",
    "verhotukan tasaus",
    "kasvoja kehystävien suortuvien leikkaus",
    "verhotukan muotoilu",
    "otsatukan leikkaus aloittelijalle",
    "otsatukan jakaminen",
  ],
  excerpt: "Kymmenen vaihetta keskeltä jaettuun verhotukkaan pitkissä hiuksissa: tarkoituksella pitkä leikkaus kosteana, viistot linjat, föönaus ja vasta sitten sovittu pituus kuivana.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("kiem-tra-hai-ben-mai-bay-co-can-khong"),
    alt: "Pitkähiuksisen vaalean naisen takana seisova kampaaja pitää verhotukan molempia päitä poskipäiden korkeudella ja vertaa puolten pituutta",
  },
  takeaways: [
    "Tee ensimmäinen leikkaus **tarkoituksella pitkäksi**, nenänpään kohdalle. Kostea hius nousee kuivuessaan, joten älä leikkaa vielä sovittuun pituuteen.",
    "Kampaa otsatukka alas **ilman vetoa**, sormet tukevat vain kevyesti.",
    "Verhotukan kumpikin puoli leikataan **viistosti** otsan keskeltä poskipäähän. Kasvoja kehystävät suortuvat jatkavat samaa viistoa.",
    "Kuivaa otsatukka ensin ja hio pituus vasta kuivana, muutama milli kerrallaan.",
    "Silmät kiinni, kun leikkaat kasvojen ympäriltä. Saksien kärjet osoittavat sivulle, alas tai ulospäin, eivät koskaan silmiä kohti.",
  ],
  intro: [
    "Verhotukan leikkaus koostuu kahdesta leikkauksesta, ei yhdestä: ensimmäinen tehdään kosteisiin hiuksiin tarkoituksella pitkäksi, ja toinen föönattuihin hiuksiin, jolloin otsatukka viedään asiakkaan kanssa sovittuun pituuteen. Niiden välissä leikataan viistot linjat, jotka antavat verhotukalle sen muodon: otsan keskeltä lyhin ja kumpaakin poskipäätä kohti pidempi.",
    "Artikkeli seuraa VaraaAi Academyn Hiukset-kurssin oppituntia ”Verho-otsatukka ja kasvojen kehystys: käytäntö vaihe vaiheelta”, jossa leikataan pitkähiuksiselle asiakkaalle. Kymmenen vaiheen avulla leikkaat keskeltä jaetun verhotukan ja siitä suoraan jatkuvat kasvoja kehystävät suortuvat. Jos vielä mietit, mikä otsatukka asiakkaalle sopii, tai haluat ymmärtää, miksi otsatukka jää niin usein aiottua lyhyemmäksi, lue teoria-artikkeli [otsatukka mallit](lesson:cat-mai-hieu-dung).",
  ],
  sections: [
    {
      id: "muoto-ja-kaksi-leikkausta",
      title: "Keskeltä jaettu verhotukka: tavoiteltava muoto ja kahden leikkauksen sääntö",
      blocks: [
        { p: "Ennen kuin otat sakset käteen, kuvittele lopputulos. Otsatukka jakautuu täsmälleen keskeltä. Sen lyhin kohta on otsan keskellä, yleensä kulmakarvoissa tai juuri niiden alapuolella. Siitä hiukset pitenevät viistosti poskipäihin ja yhtyvät kasvoja kehystäviin suortuviin, jotka ulottuvat leukaan tai solisluihin. Takana olevat pitkät hiukset eivät juuri muutu." },
        {
          table: {
            head: ["Leikkaus", "Hiukset", "Mihin asti"],
            rows: [
              ["Ensimmäinen leikkaus", "Hieman kosteat", "Nenänpäähän; vain väliaikainen pituus"],
              ["Puolikkaiden viistot", "Hieman kosteat", "Otsan keskeltä poskipäähän"],
              ["Viimeistely föönauksen jälkeen", "Kuivat", "Vähitellen sovittuun pituuteen, muutama milli kerrallaan"],
            ],
          },
        },
        { p: "Järjestyksen syy on yksinkertainen: kosteat hiukset nousevat kuivuessaan. Kun leikkaat ensin pitkäksi ja viimeistelet kuivana, otsatukasta ei koskaan tule liian lyhyt." },
        { note: "Otsatukan leikkaustavat vaihtelevat koulujen ja maiden välillä. Oppitunti on koulutusmateriaalia, ei ammattipätevyys.", kind: "info", title: "Ennen kuin aloitat" },
      ],
    },
    {
      id: "kolme-yleista-virhetta",
      title: "Kolme yleistä virhettä verhotukan leikkauksessa",
      blocks: [
        {
          table: {
            head: ["Virhe", "Mitä tapahtuu", "Miten vältät"],
            rows: [
              ["Otsatukka vedetään kireälle ja leikataan", "Irti päästettynä se ponnahtaa ylös toivottua lyhyemmäksi", "Kampaa alas ilman vetoa, sormet tukevat vain kevyesti"],
              ["Leikataan, kun asiakas kallistaa päätä tai katsoo puhelinta", "Kun hän istuu suoraan, otsatukka on vino", "Leikkaa ja vertaa vain pää suorassa ja katse eteenpäin"],
              ["Hiuksia otetaan liian leveältä ohimoiden suunnasta", "Otsatukka peittää koko kasvot, näyttää raskaalta ja on hyvin vaikea korjata", "Kolmion kulmat jäävät otsan kulmiin kulmakarvojen ulkopäiden yläpuolelle"],
            ],
          },
        },
        { p: "Kolmas virhe on vaikein korjata. Siksi jakaessa otetaan aina ensin vähän hiusta." },
      ],
    },
    {
      id: "asiakkaan-mukaan",
      title: "Otsatukka asiakkaan mukaan: tuuhea vai kevyt, silmälasit, pyörre",
      blocks: [
        { p: "Kymmenen vaihetta pysyvät samoina, mutta muutama pieni päätös muuttuu tuolissa istuvan ihmisen mukaan." },
        {
          ul: [
            "**Asiakas haluaa tuuhean otsatukan.** Siirrä kolmion kärkeä hieman taaksepäin, jotta hiusta tulee enemmän.",
            "**Asiakas haluaa kevyen, ilmavan otsatukan.** Ota matalampi kolmio ja vähemmän hiusta. Jos se ei riitä, lisää ohut kerros takaa.",
            "**Asiakas käyttää silmälaseja.** Otsatukan kannattaa päättyä hieman sankojen yläpuolelle, jotteivät sangat työnnä sitä ylös.",
            "**Otsan hiusrajassa on pyörre.** Kerro siitä asiakkaalle etukäteen ja jätä otsatukka pyörteen puolelta pidemmäksi.",
            "**Asiakas laittaa hiukset usein kiinni.** Ota kasvojen kehystykseen vain ohuita suortuvia. Jos otat liikaa, kiinni laitetuista hiuksista roikkuu sivuille kokonainen kaistale lyhyttä hiusta.",
          ],
        },
        { note: "Leikattua hiusta ei saa takaisin, mutta ottamatonta hiusta voi aina lisätä. Kun epäröit kahden määrän välillä, valitse pienempi.", kind: "tip", title: "Ota ensin vähän" },
      ],
    },
    {
      id: "muotoilu-ja-ohjeet",
      title: "Verhotukan muotoilu ja mitä kerrot asiakkaalle",
      blocks: [
        { p: "Verhotukka saa muotonsa vasta oikein föönattuna, joten ohjeet ovat yhtä tärkeitä kuin leikkaus. Kotona kuivaus tehdään täsmälleen kuten vaiheessa 7: otsatukka kuivataan ensin vielä märkänä, suutin alaspäin, harjataan vasemmalle ja sitten oikealle, ja lopuksi puolikkaat käännetään pyöröharjalla sivuille. Anna asiakkaan pitää fööniä ja kokeilla kerran itse jo tuolissa. Muun tukan föönauksesta kerrotaan artikkelissa [föönaus vaihe vaiheelta](lesson:say-tao-kieu)." },
        {
          ul: [
            "Mitä pidemmäksi verhotukka kasvaa, sitä helpompi sen kanssa on elää. Jos asiakas haluaa kasvattaa sen, se onnistuu: se sulautuu kasvojen ympärillä oleviin hiuksiin.",
            "Varaa asiakkaalle otsatukan tasaus muutaman viikon päähän.",
          ],
        },
      ],
    },
    {
      id: "turvallisuus-ja-hygienia",
      title: "Turvallisuus silmien lähellä ja välinehygienia",
      blocks: [
        {
          ul: [
            "Asiakas pitää silmät kiinni aina, kun sakset ovat lähellä kasvoja. Suljetut silmät pitävät myös hiussilpun poissa silmistä.",
            "Saksien kärjet osoittavat sivulle, alas tai ulospäin, eivät koskaan silmiä kohti. Pistoleikatessa sormesi ovat saksien ja asiakkaan kasvojen välissä.",
            "Harjaa hiussilppu kasvoilta pehmeällä harjalla ennen kuin asiakas avaa silmänsä.",
            "Kaulapaperit ovat kertakäyttöisiä. Kammat, sakset ja klipsit puhdistetaan ja desinfioidaan jokaisen asiakkaan jälkeen, kuten artikkelissa [välineiden desinfiointi](lesson:ve-sinh-dung-cu).",
          ],
        },
        { note: "Hygieniamääräykset ja alan harjoittamisen säännöt vaihtelevat maittain. Tarkista oman työpaikkasi vaatimukset.", kind: "warn", title: "Säännöt vaihtelevat" },
      ],
    },
    {
      id: "otsatukan-tasaus-palveluna",
      title: "Kirjaa otsatukka ja tarjoa otsatukan tasausta ajanvaraussivulla",
      blocks: [
        { p: "Otsatukka tuo asiakkaita salonkiin useimmin leikkausten välillä. Kirjaa VaraaAissa otsatukan pituus ja pyörteen puoli asiakkaan muistiinpanoihin [asiakastiedoissa](lesson:khach-hang). Voit myös [luoda lyhyen palvelun](lesson:dich-vu) nimeltä ”Otsatukan tasaus”, jotta asiakkaat voivat varata [ajan](lesson:lich-hen) itse muutaman viikon päähän ilman, että heidän tarvitsee ensin lähettää viestiä." },
      ],
    },
  ],
  howTo: {
    title: "Keskeltä jaetun verhotukan leikkaus: työvaiheet",
    id: "verhotukan-vaiheet",
    after: "muoto-ja-kaksi-leikkausta",
    lead: "Kymmenen vaihetta oppitunnin videon järjestyksessä, leikattuna pitkähiuksiselle asiakkaalle.",
    supplies: [
      "Leikkuusakset, hännällinen kampa ja klipsit puhdistettuina ja desinfioituina",
      "Kertakäyttöinen kaulapaperi ja leikkuuviitta",
      "Sumutepullo otsatukan kevyeen kostuttamiseen",
      "Hiustenkuivaaja ja pieni pyöröharja",
      "Pehmeä harja hiussilpun poistamiseen kasvoilta",
    ],
    steps: [
      {
        name: "Valmistele",
        text: "Pese kädet. Kammat, sakset ja klipsit on puhdistettu ja desinfioitu edellisen asiakkaan jälkeen. Kiedo kertakäyttöinen kaulapaperi asiakkaan kaulan ympäri ja kiinnitä sitten leikkuuviitta.",
        image: { src: img("quan-giay-co-truoc-khi-cat-mai"), alt: "Kampaaja kietoo valkoisen kaulapaperin naisasiakkaan kaulan ympäri ja kiinnittää mustan leikkuuviitan sen päälle ennen leikkausta" },
      },
      {
        name: "Konsultoi kuivista hiuksista ja etsi pyörteet",
        text: "Aseta hiukset sormilla otsalle, jotta asiakas näkee, mihin otsatukka päättyy. Verhotukan lyhin kohta on yleensä kulmakarvoissa tai juuri niiden alapuolella. Kysy, ehtiikö asiakas föönata joka aamu, käyttääkö hän silmälaseja ja laittaako hän hiuksia usein kiinni. Nosta sitten hiukset ja etsi pyörrettä otsan hiusrajasta, ja jos sellainen on, kerro siitä ennen leikkausta.",
        image: { src: img("chi-cho-mai-dung-tren-tran-khach"), alt: "Asiakkaan vieressä seisova kampaaja asettaa molemmin käsin kuivat etuhiukset asiakkaan otsalle näyttääkseen, mihin otsatukka päättyy", caption: "Näytä pituus suoraan asiakkaan kasvoilla hiusten ollessa kuivat." },
      },
      {
        name: "Jaa kolmio",
        text: "Kostuta hiukset kevyesti ja kampaa ne sileiksi. Aseta hännällisen kamman kärki otsan kulmaan juuri kulmakarvan ulkopään yläpuolelle ja vedä viisto jakaus ylös kolmion kärkeen päälaelle, ja tee sama toisella puolella. Kampaa kolmion hiukset suoraan alas kasvojen eteen ja muut taakse klipseihin. Edestä katsottuna kolmion sivujen on oltava yhtä pitkät. Ota ensin vähän hiusta; lisää voi aina ottaa.",
        image: { src: img("chia-tam-giac-toc-mai-bang-luoc-duoi-nhon"), alt: "Kolmiojaon kosteat hiukset on kammattu suoraan alas asiakkaan kasvojen eteen, kampaaja pitää mustaa kampaa ja sivuhiukset on kiinnitetty taakse" },
      },
      {
        name: "Leikkaa ensimmäinen leikkaus tarkoituksella pitkäksi",
        text: "Pyydä asiakasta sulkemaan silmät ja pitämään pää suorassa. Kampaa otsatukka suoraan alas kasvojen keskelle ilman vetoa. Tue hiuksia kevyesti etu- ja keskisormella nenänpään korkeudella ja leikkaa vaakasuoraan juuri sormien alta, terät sormien suuntaisesti ja kärjet sivulle. Tämä on vasta väliaikainen pituus, koska hiukset ovat kosteat ja nousevat kuivuessaan.",
        image: { src: img("duong-cat-mai-dau-tien-ngang-dau-mui"), alt: "Silmät suljettuina istuva asiakas, jonka kostea otsatukka on kammattu suoraan alas kasvojen keskelle, ja kampaaja tukee sitä kahdella sormella ja pitää saksia vaakasuorassa nenän korkeudella", caption: "Ensimmäinen leikkaus päättyy nenänpäähän, sakset vaakatasossa ja kärjet sivulle." },
      },
      {
        name: "Leikkaa puolikkaat viistosti",
        text: "Jaa otsatukka täsmälleen keskeltä. Kampaa toinen puolikas alas kasvojen viereen ja aseta kaksi sormea viistosti otsan keskeltä alas poskipäähän. Leikkaa sormien ulkoreunaa pitkin terät niiden suuntaisesti, alhaalla ja kaukana asiakkaan silmistä. Leikkaa toinen puolikas täsmälleen samassa kulmassa ja vertaa sitä ensimmäiseen.",
        image: { src: img("cat-cheo-nua-mai-bay-tu-giua-tran-ra-go-ma"), alt: "Silmät suljettuina istuva asiakas, jonka kosteasta otsatukasta toinen puolikas on kammattu kasvojen viereen, ja kampaaja asettaa sormensa viistosti otsalta poskipäähän ja leikkaa saksilla niiden alta", caption: "Sormet viistossa, sakset kulkevat niiden mukana alhaalla, kaukana silmistä." },
      },
      {
        name: "Leikkaa kasvoja kehystävät suortuvat",
        text: "Avaa sivujen klipsit. Ota ohut suortuva korvan edestä ja kampaa se eteen kasvojen päälle. Aseta sormet viistoon linjaan, joka jatkaa otsatukan linjaa leukaan tai solisluuhun asti sovitusti, ja leikkaa sormien alta sakset alaspäin osoittaen, poispäin asiakkaan kasvoista. Tee sama toisella puolella. Ota vain ohuita suortuvia, jotta takana olevat pitkät hiukset säilyttävät tuuheutensa.",
        image: { src: img("tia-toc-om-quanh-mat-noi-tiep-mai-bay"), alt: "Silmät suljettuina istuva nainen, jonka takana kampaaja pitää märkää suortuvaa kasvojen vieressä viistosti leuan korkeudella ja asettaa sakset sormiensa alle" },
      },
      {
        name: "Kuivaa otsatukka ensin",
        text: "Otsatukka kuivuu nopeimmin, joten se kuivataan ensimmäisenä. Suuntaa föönin suutin alaspäin hiusten suuntaisesti. Harjaa otsatukka vasemmalle ja kuivaa, sitten oikealle ja kuivaa, muutaman kerran, jotta tyvi asettuu, myös pyörteen kohdalta. Nosta sitten pienellä pyöröharjalla tyveä kevyesti ja käännä puolikkaat sivuille, poispäin kasvoista.",
        image: { src: img("say-mai-bay-bang-luoc-tron-nho"), alt: "Kampaaja kuivaa asiakkaan otsatukkaa pienellä pyöröharjalla ja alaspäin osoittavalla mustalla föönillä, asiakas rentoutuu silmät kiinni" },
      },
      {
        name: "Hio pituus kuivana",
        text: "Vasta nyt näet, mihin otsatukka todella asettuu. Pyydä asiakasta sulkemaan silmät, lyhennä muutama milli kerrallaan ja päästä irti katsoaksesi uudelleen. Pehmennä latvat pistoleikkauksella: saksien kärjet ylöspäin, pieniä näpsäyksiä latvoihin, sormesi saksien ja asiakkaan kasvojen välissä. Älä pistoleikkaa liian syvälle, tai otsatukasta tulee rikkonainen ja ohut.",
      },
      {
        name: "Tarkista symmetria",
        text: "Asiakas istuu suorassa, pää suorassa ja katse eteenpäin peiliin. Pidä otsatukan kumpaakin puolta ja vertaa niitä samaan kohtaan poskipäiden vieressä; tasaa pidempi puoli. Astu taaksepäin nähdäksesi koko kasvot ja kysy sitten asiakkaalta, onko pituus hyvä.",
      },
      {
        name: "Viimeistele ja kirjaa",
        text: "Harjaa hiussilppu kevyesti kasvoilta pehmeällä harjalla ennen kuin asiakas avaa silmänsä. Näytä, miten otsatukka kuivataan, ja anna hänen kokeilla kerran itse. Kirjaa asiakastietoihin otsatukan pituus ja pyörteen puoli ja varaa otsatukan tasaus muutaman viikon päähän. Kun asiakas on lähtenyt, puhdista ja desinfioi kammat, sakset ja klipsit.",
      },
    ],
  },
  faq: [
    {
      q: "Leikataanko verhotukka märkänä vai kuivana?",
      a: "Molemmin tavoin. Ensimmäinen leikkaus ja viistot tehdään hieman kosteisiin hiuksiin ja jätetään tarkoituksella pitkiksi, nenänpään kohdalle. Vasta föönauksen jälkeen otsatukka hiotaan sovittuun pituuteen muutama milli kerrallaan, koska vasta silloin näkee, mihin se todella asettuu.",
    },
    {
      q: "Miten hiukset jaetaan verhotukkaa varten?",
      a: "Jaa kolmio: alakulmat otsan kulmiin juuri kulmakarvojen ulkopäiden yläpuolelle ja kärki päälaelle. Sivujen on oltava yhtä pitkät. Tuuheampaa otsatukkaa varten siirrä kärkeä taaksepäin, kevyttä varten ota matalampi kolmio, ja ota aina ensin vähän hiusta.",
    },
    {
      q: "Kuinka pitkä verhotukan pitäisi olla?",
      a: "Keskellä oleva lyhin kohta on yleensä kulmakarvoissa tai juuri niiden alapuolella, ja siitä otsatukka pitenee poskipäihin. Jos asiakas käyttää silmälaseja, otsatukan kannattaa päättyä hieman sankojen yläpuolelle, jotteivät ne työnnä sitä ylös. Pituus sovitaan kuivista hiuksista asettamalla ne asiakkaan otsalle.",
    },
    {
      q: "Miksi verhotukka on puolilta epätasainen?",
      a: "Yleensä siksi, että se leikattiin tai sitä verrattiin asiakkaan kallistaessa päätä tai katsoessa alas. Pyydä häntä istumaan suorassa katse eteenpäin peiliin, pidä otsatukan kumpaakin puolta ja vertaa niitä samaan kohtaan poskipäiden vieressä. Tasaa pidempi puoli.",
    },
    {
      q: "Miten verhotukka muotoillaan niin, että se jakautuu kauniisti sivuille?",
      a: "Kuivaa otsatukka ensin hiusten ollessa vielä märät ja suutin alaspäin. Harjaa sitä muutaman kerran vasemmalle ja oikealle, jotta tyvi asettuu, nosta sitten tyveä kevyesti pienellä pyöröharjalla ja käännä puolikkaat sivuille, poispäin kasvoista.",
    },
    {
      q: "Pitääkö verhotukka leikata uudelleen sen kasvaessa?",
      a: "Ei välttämättä. Mitä pidemmäksi verhotukka kasvaa, sitä paremmin se sulautuu kasvojen ympärillä oleviin hiuksiin, joten asiakas voi antaa sen kasvaa. Jos alkuperäinen pituus halutaan säilyttää, varaa tasaus muutaman viikon päähän.",
    },
  ],
  related: ["cat-mai-hieu-dung", "cat-nu-tang", "say-tao-kieu", "toc-tu-van-chia-vung"],
};

export default article;
