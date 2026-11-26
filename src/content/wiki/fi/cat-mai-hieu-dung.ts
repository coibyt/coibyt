import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cat-mai-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "otsatukka-mallit",
  lesson: "cat-mai-hieu-dung",
  category: "hair",
  title: "Otsatukka mallit: suora, kevyt ja verhotukka sekä miten valitset, ettei otsatukasta tule liian lyhyt",
  metaTitle: "Otsatukka mallit: suora, kevyt ja verhotukka",
  metaDescription:
    "Yleiset otsatukka mallit ja valinta: kenelle suora, kevyt ja verhotukka sopivat, pyörre hiusrajassa ja miksi otsatukka jää usein liian lyhyeksi.",
  keyword: "otsatukka mallit",
  keywords: [
    "mikä on verhotukka",
    "kenelle kevyt otsatukka sopii",
    "kannattaako leikata otsatukka",
    "otsatukka ja pyörre",
    "otsatukka liian lyhyt",
    "kuinka usein otsatukka tasataan",
    "otsatukan föönaus",
  ],
  excerpt: "Kolme yleistä otsatukkaa, kysymykset ennen leikkausta, pyörre otsan hiusrajassa ja syy siihen, miksi märkä otsatukka leikataan aina sovittua pidemmäksi.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("toc-mai-bay-re-giua-om-go-ma"),
    alt: "Pitkähiuksinen hunajanvaalea nainen, jolla on keskeltä jaettu verhotukka, otsan keskeltä lyhin ja poskipäiden ympäriltä pidempi, istuu pariisilaistyylisessä salongissa",
  },
  takeaways: [
    "Kolme yleistä otsatukkaa: **suora otsatukka** on tuuhea ja selkeä, **kevyt otsatukka** on ilmava ja otsa kuultaa läpi, ja **verhotukka** on keskeltä jaettu, pitenee poskipäitä kohti ja on helpoin kasvattaa pois.",
    "Nosta hiukset ennen leikkausta ja etsi **pyörre otsan hiusrajasta**. Voimakkaan pyörteen kanssa jätä otsatukka pidemmäksi ja tuuheammaksi, valitse verhotukka tai neuvo jättämään otsatukka pois.",
    "Sovi pituus kuivista hiuksista suoraan asiakkaan kasvoilla. Ensimmäinen leikkaus vain nenänpäähän tai huuliin, sitten lyhyemmäksi vähitellen.",
    "Leikkaa otsatukka **lähes ilman vetoa**: märät ja venytetyt hiukset pitenevät ja nousevat kuivuttuaan ja irti päästettyinä.",
    "Silmät kiinni leikatessa, sormet terän ja ihon välissä, eivätkä saksien kärjet koskaan osoita silmiä kohti.",
  ],
  intro: [
    "Otsatukka mallit eroavat toisistaan hiusmäärän, leikkuulinjan ja aamuisen muotoilun tarpeen osalta, mutta yksi asia on niille yhteinen: otsatukka on leikkauksen pienin osa ja samalla näkyvin. Se on aivan silmien yläpuolella. Muutaman millin vinous tai lyhyys näkyy asiakkaalle heti, kun hän katsoo peiliin. Hiukset kasvavat vain noin sentin kuukaudessa, joten liian lyhyeksi leikattu otsatukka on asiakkaan seurana pitkään.",
    "Artikkeli seuraa VaraaAi Academyn Hiukset-kurssin oppituntia ”Otsatukka ja kasvojen kehystys: ymmärrä ne, niin et leikkaa liian lyhyeksi”. Luettuasi osaat nimetä kolme otsatukkamallia, tiedät, mitä kysyä asiakkaan valinnan tueksi, ja ymmärrät, miksi otsatukka jää niin usein aiottua lyhyemmäksi. Käytännön leikkaus on artikkelissa [verhotukan leikkaus](lesson:cat-mai).",
  ],
  sections: [
    {
      id: "kolme-otsatukkaa",
      title: "Yleiset otsatukka mallit: suora, kevyt ja verhotukka",
      blocks: [
        { p: "Jokainen paikka ja jokainen koulu nimeää otsatukat vähän eri tavalla. Tärkeintä on, että sinä ja asiakas näette mielessänne saman muodon, joten käytä mallikuvaa ja kuvaile muoto selvästi sanoin." },
        {
          table: {
            head: ["Otsatukka", "Muoto", "Kenelle, mitä vaatii"],
            rows: [
              ["Suora otsatukka", "Tuuhea, kulmakarvoihin asti, leikattu yhteen suoraan ja selkeään linjaan", "Vaatii riittävästi hiusta ja melko usein tasausta"],
              ["Kevyt otsatukka", "Vain vähän hiusta, pehmeät latvat, otsa kuultaa läpi", "Hienovarainen; sopii otsatukkaa ensimmäistä kertaa kokeilevalle"],
              ["Verhotukka", "Keskijakaus, lyhyin keskellä, pitenee sivuille ja kehystää poskipäät", "Helpoin kasvattaa pois; sopii, jos asiakas ei halua käydä usein"],
            ],
          },
        },
        { img: { src: img("toc-mai-bang-day-ngang-long-may"), alt: "Muotokuva naisesta, jolla on tummanruskea polkka ja tuuhea suora otsatukka, jonka latvat muodostavat yhden tasaisen suoran linjan kulmakarvojen kohdalla", caption: "Suora otsatukka: yksi tuuhea ja suora linja. Koska linja on niin selkeä, pienikin virhe näkyy." } },
        { p: "Verhotukka on helppo kasvattaa pois, koska mitä pidemmäksi se kasvaa, sitä paremmin se sulautuu kasvojen ympärillä oleviin hiuksiin. Suora otsatukka on päinvastainen: suora linja kulmakarvojen kohdalla säilyttää muotonsa vain säännöllisellä tasauksella." },
      ],
    },
    {
      id: "kannattaako-otsatukka",
      title: "Kannattaako leikata otsatukka? Mitä kysyä ensin",
      blocks: [
        { p: "Otsatukan konsultaation on oltava tavallista leikkausta perusteellisempi. Aloita vetämällä kaikki hiukset taakse, jotta näet kasvot ja otsan: onko otsa korkea vai matala, leveä vai kapea, ovatko kasvot pyöreät vai pitkät?" },
        { img: { src: img("keo-toc-ra-sau-xem-khuon-mat-va-vang-tran"), alt: "Asiakkaan takana seisova kampaaja kokoaa asiakkaan hiukset molemmin käsin taakse, jolloin otsa, hiusraja ja kasvot näkyvät selvästi" } },
        { p: "Kysy sitten asiakkaan arjesta, koska salongissa kaunis otsatukka ei välttämättä ole kaunis kotona:" },
        {
          ul: [
            "**Onko asiakkaalla aikaa föönata joka aamu?** Otsatukka vaatii kuivausta joka päivä, vaikka vain muutaman minuutin.",
            "**Käyttääkö hän silmälaseja?** Sangat ja otsatukan latvat kohtaavat samassa kohdassa kasvoja.",
            "**Urheileeko hän tai hikoileeko hän paljon?**",
            "**Laittaako hän hiuksia usein kiinni?**",
          ],
        },
        { p: "Kerro myös asia, jota moni asiakas ei odota: otsatukka kaipaa tasausta muutaman viikon välein. Jos asiakas ei halua käydä usein, pitkä verhotukka on helpompi elää kuin suora otsatukka." },
      ],
    },
    {
      id: "pyorre",
      title: "Otsatukka ja pyörre: katso otsan hiusraja ennen leikkausta",
      blocks: [
        { p: "Aloittelevalta kampaajalta unohtuu useimmin hiusten kasvusuunta otsan hiusrajassa. Nosta hiukset ja katso todella tarkkaan. Monella on siinä pyörre, eikä pyörteen kohdalla hius asetu alas." },
        { img: { src: img("tim-xoay-o-chan-toc-tran"), alt: "Lähikuva kampaajasta, joka nostaa sormenpäillään asiakkaan kuivia etuhiuksia nähdäkseen hiusrajan otsalla", caption: "Nosta hiukset ja katso, mihin suuntaan ne kasvavat otsan hiusrajassa." } },
        { p: "Jos leikkaat lyhyen otsatukan pyörteen päälle, se nousee pystyyn tai jakautuu kahtia, ja asiakas taistelee sen kanssa joka aamu. Voimakkaan pyörteen kanssa vaihtoehtoja on kolme:" },
        {
          ol: [
            "Jätä otsatukka pidemmäksi ja tuuheammaksi, jotta paino vetää sen alas.",
            "Valitse verhotukka, joka jaetaan hiusten kasvusuunnan mukaan.",
            "Neuvo asiakasta jättämään otsatukka leikkaamatta. Joskus se on paras neuvo.",
          ],
        },
        { note: "Hyvin lyhyt leikkaus ei piilota pyörrettä: lyhyt hius nousee siinä pystyyn tai jakautuu. Eikä kireä veto leikatessa saa hiusta asettumaan, vaan irti päästettynä otsatukka ponnahtaa vielä korkeammalle.", kind: "warn", title: "Kaksi väärää korjausta" },
      ],
    },
    {
      id: "miksi-otsatukka-jaa-lyhyeksi",
      title: "Miksi otsatukka jää liian lyhyeksi: märät hiukset ja veto",
      blocks: [
        { p: "Märät hiukset venyvät pidemmiksi ja roikkuvat raskaampina. Kuivuttuaan ne kutistuvat takaisin, ja pyörteen kohdalla ne myös ponnahtavat ylös. Venytetty hius pitenee aivan samalla tavalla. Jos vedät märän otsatukan kireästi alas ja leikkaat sen tasan kulmakarvojen kohdalle, se nousee irti päästettynä ja kuivuttuaan odotettua korkeammalle, joskus kokonaisen sentin." },
        { p: "Tästä seuraa kolme pituussääntöä:" },
        {
          ul: [
            "**Sovi pituus kuivista hiuksista suoraan asiakkaan kasvoilla.** Aseta hiukset sormella otsalle ja näytä tarkalleen, mihin otsatukka päättyy: kulmakarvoihin, kulmien alle vai poskipäihin.",
            "**Leikkaa ensin sitä pidemmäksi.** Ensimmäinen leikkaus vain nenänpäähän tai huuliin, ja vasta sitten lyhyemmäksi vähän kerrallaan.",
            "**Leikkaa lähes ilman vetoa.** Kampaa hiukset alas, anna niiden asettua otsalle itsestään ja tue niitä sormilla vain kevyesti.",
          ],
        },
        { p: "Moni kampaaja leikkaa otsatukan kuivana tai ainakin föönaa sen ennen viimeistä leikkausta, jotta näkee tarkalleen, mihin otsatukka asettuu." },
        { note: "Lisää voi aina leikata, takaisin ei voi laittaa. Älä koskaan leikkaa märkiä hiuksia suoraan asiakkaan kanssa sovittuun pituuteen.", kind: "tip", title: "Otsatukan tärkein sääntö" },
      ],
    },
    {
      id: "kolmiojako-ja-pistoleikkaus",
      title: "Kolmiojako, pistoleikkaus ja verhotukan viisto linja",
      blocks: [
        { h3: "Paljonko hiusta otsatukkaan otetaan" },
        { p: "Otsatukan jako on yleensä kolmio. Sen kärki on päälaella kohdassa, jossa pää alkaa kaartua alas. Alakulmat ovat otsan kulmissa juuri kulmakarvojen ulkopäiden yläpuolella. Syvä, kauas taakse ulottuva kolmio antaa tuuhean otsatukan, matala kolmio kevyen. Kampaa muut hiukset taakse ja kiinnitä ne siististi, jotteivät ne sekoitu mukaan leikatessa." },
        { img: { src: img("chia-vung-tam-giac-de-cat-mai"), alt: "Edessä olevan kolmiojaon märät hiukset on kammattu suoraan alas asiakkaan kasvojen päälle, kampaaja pitää kampaa ja sivuja, ja muut hiukset on kiinnitetty sivuun", caption: "Kolmio kammattuna alas kasvojen eteen, muut hiukset kiinnitettyinä taakse." } },
        { p: "Älä ota jakoa liian leveältä ohimoiden suuntaan. Otsatukka peittää silloin koko kasvot ja näyttää hyvin raskaalta." },
        { h3: "Pistoleikkaus pehmeisiin latvoihin" },
        { p: "Pehmeitä latvoja varten kampaaja ei leikkaa suoraan poikki, vaan kääntää saksien kärjet ylöspäin ja tekee latvoihin hyvin pieniä näpsäyksiä. Suoraan otsatukkaan pistoleikataan vain vähän, jotta linja säilyy. Kevyeen otsatukkaan ja verhotukkaan enemmän, jotta latvat ovat kevyet ja laskeutuvat luonnollisesti. Liian syvä pistoleikkaus tekee otsatukasta rikkonaisen ja paljon ohuemman." },
        { img: { src: img("tia-dau-mai-bang-mui-keo-khi-toc-kho"), alt: "Lähikuva silmät suljettuina istuvasta asiakkaasta, jonka kuivaa otsatukan suortuvaa kampaaja nostaa sormenpäillään ja osoittaa saksien kärjet ylöspäin latvoihin", caption: "Pistoleikkaus kuiviin hiuksiin, saksien kärjet ylöspäin latvoihin, asiakkaan silmät kiinni." } },
        { h3: "Verhotukka ja kasvojen kehystys yhtenä linjana" },
        { p: "Kun verhotukan keskipituus on valmis, otsatukka jaetaan kahtia. Kumpikin puoli leikataan viistosti otsan keskeltä poskipäähän päin pidentyen. Kasvoja kehystävät suortuvat jatkavat samaa viistoa leukaan tai solisluuhun asti. Leikkaus tehdään ulospäin, kasvoista poispäin, jotta hiukset laskeutuvat sivuille ja avaavat kasvot. Otsatukan ja kehystyksen väliin ei saa jäädä katkosta. Miten kasvoja kehystävät kerrokset toimivat kerrosleikkauksessa, kerrotaan artikkelissa [mikä on kerrosleikkaus](lesson:cat-nu-tang-hieu-dung)." },
      ],
    },
    {
      id: "symmetria-ja-turvallisuus",
      title: "Symmetrian tarkistus ja turvallisuus silmien lähellä",
      blocks: [
        { p: "Tarkista symmetria vain asiakkaan pää suorassa ja katse eteenpäin. Jos hän kallistaa päätä hieman tai katsoo alas puhelimeensa, otsatukka näyttää heti vinolta, ja jos leikkaat sen mukaan, linja on vino oikeasti, kun hän istuu suoraan. Pidä otsatukan kumpaakin puolta yhtä aikaa ja vertaa niitä samaan maamerkkiin, esimerkiksi poskipäihin. Astu sitten askel taaksepäin ja katso koko kasvoja, älä pelkkää otsatukkaa." },
        {
          note: "Otsatukka on se kohta, jossa leikkaat lähimpänä silmiä. Pyydä asiakasta sulkemaan silmät leikkauksen ajaksi. Sormesi ovat aina terän ja asiakkaan kasvojen välissä. Saksien kärjet eivät koskaan osoita silmiä kohti: pistoleikatessa ne osoittavat ylöspäin latvoihin tai ulospäin. Jos asiakas on aivastamassa tai haluaa puhua, pysähdy ja nosta sakset pois. Kun olet valmis, harjaa hiussilppu kasvoilta hyvin kevyesti ennen kuin asiakas avaa silmänsä.",
          kind: "warn",
          title: "Turvallisuus silmien lähellä",
        },
        { p: "Kammat, sakset ja klipsit puhdistetaan ja desinfioidaan jokaisen asiakkaan jälkeen, kuten artikkelissa [välineiden desinfiointi](lesson:ve-sinh-dung-cu). Artikkelin sisältö on yleistä ammattikokemusta harjoittelua varten. Jokaisella maalla ja koululla on omat työtapansa, ja oppitunti on koulutusmateriaalia, ei ammattipätevyys." },
      ],
    },
    {
      id: "foonaus-ja-tasaus",
      title: "Otsatukan föönaus kotona ja kuinka usein otsatukka tasataan",
      blocks: [
        { p: "Hyvin leikattukin otsatukka voi harmittaa asiakasta, jos hän ei osaa kuivata sitä. Näytä ennen lähtöä kolme asiaa:" },
        {
          ol: [
            "Kuivaa otsatukka ensimmäisenä, kun se on vielä märkä, koska otsatukka kuivuu hyvin nopeasti.",
            "Suuntaa föönin suutin alaspäin.",
            "Kampaa otsatukkaa vasemmalle ja sitten oikealle ja anna sen vasta sitten asettua.",
          ],
        },
        { p: "Koko tukan föönaustekniikka on artikkelissa [föönaus ja muotoilu](lesson:say-tao-kieu-hieu-dung)." },
        { p: "Varaa asiakkaalle otsatukan tasaus muutaman viikon päähän. Moni salonki tarjoaa nopean otsatukan tasauksen leikkausten välillä, ja se kannattaa nostaa ajanvaraussivulle: [luo VaraaAissa lyhyt palvelu](lesson:dich-vu) nimeltä ”Otsatukan tasaus”, jotta asiakkaat voivat varata sen itse, ja kirjaa otsatukan pituus ja pyörteen puoli muistiinpanoihin [asiakastiedoissa](lesson:khach-hang). Kun asiakas seuraavan kerran istuu tuoliin, sinun ei tarvitse selvittää kaikkea alusta." },
      ],
    },
  ],
  faq: [
    {
      q: "Millaisia otsatukka malleja on?",
      a: "Kolme yleisintä ovat suora otsatukka, kevyt otsatukka ja verhotukka. Suora otsatukka on tuuhea ja leikattu suoraksi linjaksi kulmakarvojen kohdalle. Kevyessä otsatukassa on vähän hiusta, pehmeät latvat, ja otsa kuultaa läpi. Verhotukka on keskeltä jaettu, keskeltä lyhin ja poskipäitä kohti pidempi. Nimitykset voivat vaihdella paikasta toiseen.",
    },
    {
      q: "Mikä on verhotukka ja miksi se on helppo kasvattaa pois?",
      a: "Verhotukka eli verho-otsatukka jaetaan keskeltä, ja se on otsan keskellä lyhin ja pitenee sivuille kehystäen poskipäät. Mitä pidemmäksi se kasvaa, sitä paremmin se sulautuu kasvojen ympärillä oleviin hiuksiin, joten asiakas voi vain antaa sen kasvaa. Siksi se sopii hyvin, jos asiakas ei halua käydä salongissa usein.",
    },
    {
      q: "Millainen otsatukka sopii, jos otsan hiusrajassa on pyörre?",
      a: "Pyörteen kohdalla lyhyt hius nousee pystyyn tai jakautuu. Jätä otsatukka pidemmäksi ja tuuheammaksi, jotta paino vetää sen alas, tai valitse verhotukka, joka jaetaan hiusten kasvusuunnan mukaan. Voimakkaan pyörteen kanssa paras neuvo on joskus jättää otsatukka kokonaan pois.",
    },
    {
      q: "Miksi otsatukka jäi lyhyemmäksi kuin halusin?",
      a: "Koska märät ja venytetyt hiukset pitenevät. Kuivuttuaan ja irti päästettynä otsatukka nousee, joskus kokonaisen sentin, varsinkin pyörteen kohdalla. Vältät sen sopimalla pituuden kuivista hiuksista, leikkaamalla ensimmäisen kerran pitkäksi, lähes ilman vetoa, ja tekemällä viimeisen korjauksen kuiviin hiuksiin.",
    },
    {
      q: "Kuinka usein otsatukka pitää tasata?",
      a: "Otsatukka kaipaa tasausta muutaman viikon välein, ja suora otsatukka melko usein, jotta linja säilyy. Moni salonki tarjoaa nopean otsatukan tasauksen leikkausten välillä. Kerro tästä asiakkaalle ennen leikkausta, jotta hän voi valita tapoihinsa sopivan otsatukan.",
    },
    {
      q: "Miten otsatukka föönataan, jotta se asettuu?",
      a: "Kuivaa otsatukka ensimmäisenä hiusten ollessa vielä märät, koska otsatukka kuivuu hyvin nopeasti. Suuntaa föönin suutin alaspäin, kampaa otsatukkaa muutaman kerran vasemmalle ja oikealle ja anna sen vasta sitten asettua paikalleen.",
    },
  ],
  related: ["cat-mai", "cat-nu-tang-hieu-dung", "toc-tu-van-chia-vung-hieu-dung", "say-tao-kieu-hieu-dung"],
};

export default article;
