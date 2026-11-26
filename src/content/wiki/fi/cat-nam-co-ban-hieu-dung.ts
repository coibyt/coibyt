import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cat-nam-co-ban-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "miesten-hiustenleikkauksen-perusteet",
  lesson: "cat-nam-co-ban-hieu-dung",
  category: "hair",
  title: "Miesten hiustenleikkauksen perusteet: ohjauskammat, saksiote ja 6 yleistä virhettä",
  metaTitle: "Miesten hiustenleikkauksen perusteet: kone, sakset, virheet",
  metaDescription:
    "Miesten hiustenleikkauksen perusteet: osat, ohjauskamman numerot ja säätövipu, saksiote, sakset kamman päällä, häivytys, rajaus ja kuusi yleistä virhettä.",
  keyword: "miesten hiustenleikkauksen perusteet",
  keywords: [
    "ohjauskamman numerot",
    "millä ohjauskammalla aloittaa",
    "oikea saksiote",
    "sakset kamman päällä",
    "leikataanko koneella kasvusuuntaa vastaan",
    "parturileikkauksen virheet",
    "kuinka usein miesten hiukset leikataan",
  ],
  excerpt: "Mitä lyhyempi miesten leikkaus, sitä selvemmin jokainen virhe näkyy. Mikä tekee parturileikkauksesta siistin ja tasapainoisen, ennen kuin kone käynnistetään.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-cat-toc-tu-van-kieu-toc-nam-cho-khach"),
    alt: "Violettiin liiviin pukeutunut parturi seisoo messinkikehyksisen peilin edessä istuvan miesasiakkaan vieressä ja nostaa tämän päälaen hiuksia keskustellessaan",
  },
  takeaways: [
    "Häivytys lyhyestä pitkään sijoittuu yleensä kahden maamerkin tienoille: **päälaen reuna** ja **takaraivon kyhmy**.",
    "Ohjauskamman numero kertoo vain suunnilleen jäävän pituuden ja vaihtelee valmistajittain. Aloita aina **pidemmällä ohjauskammalla**.",
    "Kone kulkee kasvusuuntaa vastaan, ohjauskampa tasaisesti päätä vasten, hitaasti ja vedot limittäin. Painaminen tai kallistaminen tekee kuoppia.",
    "Herkin kohta on se, jossa sivut kohtaavat päälaen: häivytä vähitellen lyhyestä pitkään, kunnes ylöspäin sivellessä reunaa ei tunnu.",
    "Lyhyt leikkaus pysyy muodossa yleensä noin **3–5 viikkoa**. Kerro se asiakkaalle, niin seuraava aika varataan oikeaan aikaan.",
  ],
  intro: [
    "Kun miesten hiustenleikkauksen perusteet ovat vielä uusia, lyhyttä leikkausta pidetään usein helppona. Asia on päinvastoin: juuri lyhyydestä johtuen jokainen virhe näkyy. Pieni kuoppa, porras tai epätasaiset pulisongit, ja asiakas huomaa sen peilistä heti.",
    "Artikkeli seuraa VaraaAi Academyn Hiukset-kurssin oppituntia ”Miesten perusleikkaus: ymmärrä se, niin tulos on siisti ja tasapainoinen”, aiheen teoriaosaa. Luettuasi osaat nimetä miesten leikkauksen osat, ymmärrät ohjauskampojen numerot, pidät saksia oikein ja löydät peilistä omat virheesi. Tuolissa tehtävä työ on artikkelissa [miesten hiusten leikkaus vaihe vaiheelta](lesson:cat-nam-co-ban).",
  ],
  sections: [
    {
      id: "leikkauksen-osat",
      title: "Miesten leikkauksen osat ja kaksi maamerkkiä",
      blocks: [
        { p: "Parturi ja asiakas ymmärtävät toisiaan vain, jos kumpikin kutsuu jokaista aluetta samalla nimellä. Lyhyessä miesten leikkauksessa on viisi osaa." },
        {
          table: {
            head: ["Osa", "Missä se on"],
            rows: [
              ["Päälaki", "Pään yläosa, yleensä jätetään pisimmäksi"],
              ["Sivut", "Kummallakin puolella korvien yläpuolella"],
              ["Takaraivo", "Pään takaosa"],
              ["Niska", "Alimpana takana"],
              ["Rajaus", "Korvien ympärys, pulisongit ja niskalinja"],
            ],
          },
        },
        { img: { src: img("kieu-toc-nam-ngan-co-dien-nhin-nghieng"), alt: "Miesasiakas sivuprofiilissa leikkauksen jälkeen: lyhyet sivut häivyttyvät pehmeästi taaksepäin kammattuun pidempään päälakeen, ja korva näkyy kaarevan rajauksen ympäröimänä", caption: "Sivulta näkyvät päälaki, sivut, pulisonki ja korvan rajaus, eikä sivujen ja päälaen välissä ole rajaa." } },
        { p: "Nimien lisäksi on kaksi maamerkkiä, jotka mainitaan jokaisella miesten leikkauksen oppitunnilla. **Päälaen reuna** on pään levein kohta kummallakin puolella. **Takaraivon kyhmy** on kohta, joka pullistuu hieman pään takaosassa. Häivytys lyhyestä pitkään sijoittuu yleensä näiden tienoille, joten tunnustele ne sormin asiakkaan päästä ennen kuin käynnistät koneen." },
        { img: { src: img("kieu-toc-nam-ngan-nhin-tu-phia-sau-gay-tron"), alt: "Miehen pää suoraan takaa: niska ja takaraivo on leikattu lyhyiksi ja ne pitenevät vähitellen yläpuolen pidempiin hiuksiin, niskalinja on pyöristetty", caption: "Takaa: niska alimpana, takaraivo sen yläpuolella. Hiukset pitenevät niskasta ylöspäin takaraivon kyhmyn tienoilla." } },
      ],
    },
    {
      id: "ohjauskamman-numerot",
      title: "Ohjauskamman numerot: koot, säätövipu ja aloitus pidemmällä",
      blocks: [
        { p: "Ohjauskampa eli kampakiinnike on muovinen kampa, joka kiinnitetään koneen terään. Sen numero kertoo suunnilleen, kuinka paljon pituutta jää: mitä suurempi numero, sitä pidemmät hiukset. Jokainen valmistaja on kuitenkin vähän erilainen, ja sama numero voi jättää hieman enemmän tai vähemmän. Sinua koskee sen koneen valmistajan taulukko, jota käytät." },
        { img: { src: img("cac-cu-tong-do-tu-ngan-den-dai"), alt: "Viisi mustaa muovista ohjauskampaa rivissä pienimmästä suurimpaan marmoritasolla hiustenleikkuukoneen ja mustan kamman vieressä", caption: "Ohjauskammat lyhyimmästä pisimpään. Mitä pidemmät piikit, sitä enemmän hiusta jää." } },
        { p: "Monessa koneessa on myös säätövipu kyljessä. Kun siirrät sitä ylös tai alas, terä liikkuu hieman, ja hiukset jäävät samalla ohjauskammalla vähän pidemmiksi tai lyhyemmiksi. Parturit käyttävät vipua usein pehmeään siirtymään kahden peräkkäisen ohjauskamman välillä." },
        { p: "Tärkein sääntö on lyhyt: aloita aina pidemmällä ohjauskammalla. Lisää voi aina leikata. Kun hiukset ovat liian lyhyet, voit vain odottaa, että ne kasvavat." },
        { note: "Epävarmana valitse yhtä numeroa pidempi ohjauskampa. Uusi kierros lyhyemmällä vie minuutin, liian lyhyeksi leikattu saa asiakkaan odottamaan viikkoja.", kind: "tip", title: "Ammattilaisen vinkki" },
      ],
    },
    {
      id: "saksiote-ja-kone",
      title: "Oikea saksiote ja koneen liikuttaminen",
      blocks: [
        { h3: "Saksiote: vain yksi terä liikkuu" },
        { p: "Peukalo toisessa renkaassa, nimetön toisessa ja pikkusormi lepää sormituella. Leikatessa vain peukalon terä liikkuu ja toinen pysyy paikallaan. Näin linja pysyy suorana, eivätkä hiukset työnny pois paikaltaan." },
        { p: "Kammatessa moni parturi ottaa peukalon pois renkaasta ja pitää sakset kämmenessä, jotteivät kampa ja sakset ole toistensa tiellä. Leikkaatpa tai kampaat, älä koskaan osoita saksien kärjillä asiakkaan kasvoja kohti." },
        { h3: "Kone: kasvusuuntaa vastaan" },
        { p: "Kun kone kulkee kasvusuuntaa vastaan, se nostaa hiuksia ja terä leikkaa tasaisemmin. Pidä ohjauskampa tasaisesti päätä vasten ja liiku hitaasti ja tasaisesti niin, että jokainen veto menee hieman edellisen päälle. Niskassa ja pyörteiden ympärillä hiukset kasvavat moneen suuntaan, joten käy ne läpi myös muutamasta muusta suunnasta." },
        { note: "Jos painat koneen kovaa päätä vasten tai kallistat sitä niin, että terä kaivautuu hiuksiin, siitä kohdasta tulee muuta lyhyempi: kuoppa, joka todella näkyy. Kevyt käsi ja tasaisesti päätä vasten oleva ohjauskampa riittävät.", kind: "warn", title: "Aloittelijan konevirhe" },
      ],
    },
    {
      id: "sakset-kamman-paalla",
      title: "Sakset ja kone kamman päällä: lyhyen häivytys pitkään",
      blocks: [
        { p: "Lyhyet hiukset häivytetään pitkiin kahdella tavalla, ja molemmat toimivat samalla periaatteella. Kampa on lähellä päätä piikit hieman ulospäin kallistettuina. Kaikki, mikä nousee piikkien läpi, leikataan pois. Kamman kulma ratkaisee, jäävätkö hiukset pidemmiksi vai lyhyemmiksi." },
        {
          table: {
            head: ["Tapa", "Miten", "Tulos"],
            rows: [
              ["Sakset kamman päällä", "Terä kulkee kamman suuntaisesti", "Pehmeä häivytys"],
              ["Kone kamman päällä", "Kone kulkee pitkin kampaa", "Nopeampi ja tasaisempi"],
            ],
          },
        },
        { img: { src: img("tong-do-tren-luoc-noi-hai-ben-len-dinh"), alt: "Parturi nostaa mustalla kammalla kerroksen miesasiakkaan hiuksia ja kuljettaa toisella kädellä ilman ohjauskampaa olevaa konetta kamman selkää pitkin", caption: "Kone kamman päällä: kampa nostaa hiukset, ja kone leikkaa piikkien läpi nousevan osan." } },
        { p: "Käytitpä saksia tai konetta, kampa liikkuu aina ylöspäin ja tasaisesti eikä viivy pitkään yhdessä kohdassa. Jos pysähdyt, syntyy porras." },
        { h3: "Porras sivujen ja päälaen välissä" },
        { p: "Miesten leikkaus epäonnistuu useimmiten siinä, missä sivut kohtaavat päälaen. Sivut leikataan koneella lyhyiksi, päälaki jätetään pitkäksi, ja väliin jää kova reuna. Sivulta katsottuna se näyttää portaalta." },
        { img: { src: img("loi-duong-go-cung-giua-hai-ben-va-dinh"), alt: "Mies sivuprofiilissa: hyvin lyhyet sivut päättyvät terävään vaakaviivaan ohimolla, ja päälaen pitkät hiukset ulottuvat sen yli kuin räystäs", caption: "Esimerkki virheestä: sivuja ja päälakea ei ole häivytetty, ja jäljelle jää kova vaakaraja." } },
        { p: "Korjaus on häivyttää vähitellen lyhyestä pitkään saksilla kamman päällä tai välialueella pidemmällä ohjauskammalla. Jatka, kunnes sivelet kädellä ylöspäin etkä enää tunne reunaa." },
      ],
    },
    {
      id: "tasapaino-rajaus-virheet",
      title: "Tasapaino, rajaus ja kuusi yleistä parturileikkauksen virhettä",
      blocks: [
        { p: "Ammattimaisen miesten leikkauksen tekevät tasapaino ja rajaus. Korvien ympärys on siisti ja luonnollinen, ei liian korkealle leikattu. Pulisongit ovat yhtä pitkät. Niskalinja on suora tai pyöristetty asiakkaan toiveen mukaan." },
        { p: "Epätasaiset pulisongit ovat hyvin yleinen virhe, varsinkin kun asiakas kallistaa päätään. Pidä pää suorassa ja asiakkaan katse suoraan peiliin, ja aseta sormi kummankin pulisongin alareunaan, jotta vertaat molempia yhtä aikaa. Älä sitten katso vain yhdeltä puolelta: tarkista peilistä, sivulta ja takaa." },
        { img: { src: img("so-hai-ben-toc-mai-bang-hai-ngon-tay"), alt: "Parturi seisoo suoraan eteenpäin katsovan miesasiakkaan takana ja asettaa etusormensa samalle korkeudelle kasvojen kummallekin puolelle verratakseen pulisonkeja", caption: "Pää suorassa, katse peiliin ja kaksi sormea vertaa molempia puolia yhtä aikaa." } },
        {
          table: {
            head: ["Virhe", "Miksi syntyy", "Miten vältät"],
            rows: [
              ["Kuoppa sivuissa tai niskassa", "Konetta painettiin tai kallistettiin niin, että terä kaivautui", "Ohjauskampa tasaisesti, kevyt käsi, hidas liike"],
              ["Porras häivytyksessä", "Kampa pysähtyi yhteen kohtaan", "Kampa liikkuu koko ajan ylöspäin tasaisesti"],
              ["Kova reuna sivujen ja päälaen välissä", "Ei häivytetty vähitellen lyhyestä pitkään", "Sakset kamman päällä tai välissä pidempi ohjauskampa, kunnes reunaa ei ole"],
              ["Epätasaiset pulisongit", "Asiakas kallisti päätä, parturi katsoi yhdeltä puolelta", "Pää suorassa, katse peiliin, kaksi sormea vertaa"],
              ["Korvan rajaus liian korkealla", "Rajaus nousi luonnollisen hiusrajan yläpuolelle", "Seuraa korvan ympärillä luonnollista linjaa"],
              ["Hiukset nousevat pystyyn piikikkäinä", "Tuuhea, paksu hius leikattiin liian lyhyeksi tai pyörre liian läheltä", "Jätä hieman pidemmäksi tai ohenna massaa; pyörrettä ei leikata lähelle"],
            ],
          },
        },
      ],
    },
    {
      id: "koneen-hygienia",
      title: "Koneen puhdistus jokaisen asiakkaan jälkeen ja milloin ei leikata",
      blocks: [
        { p: "Harjaa jokaisen asiakkaan jälkeen hiukset pois koneen terästä, desinfioi terä ja ohjauskammat tuotteen ohjeen mukaan ja öljyä terä. Öljytty terä kulkee sujuvasti, pysyy viileämpänä ja nykii vähemmän. Myös kammat ja sakset puhdistetaan ja desinfioidaan jokaisen asiakkaan jälkeen. Partaterät ovat kertakäyttöisiä." },
        { img: { src: img("chai-sach-toc-trong-luoi-tong-do"), alt: "Mustiin nitriilikäsineisiin pukeutuneet kädet harjaavat pienellä harjalla leikattuja hiuksia pois koneen terästä kivitasolla, vieressä ohjauskampoja ja suihkepullo", caption: "Harjaa ensin hiukset pois terästä, desinfioi ja öljyä vasta sitten." } },
        { note: "Haava, tulehdus tai täit hiuspohjassa tarkoittavat, ettei leikata. Salonkien hygieniamääräykset vaihtelevat maittain, joten tarkista oman työpaikkasi vaatimukset. Yksityiskohdat ovat oppitunneilla [Välineet jokaisen asiakkaan jälkeen](lesson:ve-sinh-dung-cu) ja [Milloin asiakasta ei hoideta](lesson:khi-nao-khong-lam).", kind: "warn", title: "Ennen kuin viitta laitetaan" },
      ],
    },
    {
      id: "hiusten-arviointi-ja-rehellisyys",
      title: "Hiusten arviointi ja rehellinen puhe asiakkaan kanssa",
      blocks: [
        { p: "Sama malli kahdella eri hiuslaadulla antaa kaksi eri tulosta. Arvioi asiakkaan hiukset ennen leikkausta kuten artikkelissa [konsultaatio ennen hiustenleikkausta](lesson:toc-tu-van-chia-vung-hieu-dung)." },
        {
          ul: [
            "**Tuuhea, paksu hius.** Liian lyhyeksi leikattuna se nousee pystyyn ja näyttää piikikkäältä. Jätä se hieman pidemmäksi tai ohenna osa massasta.",
            "**Ohut hiuslaki.** Liian pitkänä se lässähtää, jakautuu ja paljastaa vielä enemmän hiuspohjaa. Siistimpi, lyhyempi leikkaus näyttää usein tuuheammalta.",
            "**Pyörteet päälaella ja niskassa.** Niitä ei leikata liian läheltä.",
          ],
        },
        { img: { src: img("xoay-toc-o-dinh-dau"), alt: "Lähikuva miehen päälaesta takaa, tummanruskeat hiukset lähtevät yhdestä pisteestä selvänä spiraalina", caption: "Päälaen pyörre. Sen ympärillä hiukset kasvavat moneen suuntaan ja nousevat pystyyn liian läheltä leikattuina." } },
        { p: "Kun olet arvioinut hiukset, ole rehellinen, ja tee se ennen leikkausta, ei jälkeenpäin. Jos asiakas haluaa päälaen hyvin lyhyeksi ja siinä on voimakas pyörre, kerro, että hiukset nousevat pystyyn. Jos hän tuo kuvan jostakusta, jolla on tuuheat ja paksut hiukset, ja hänen omansa ovat ohuet ja harvat, sano selvästi, että muodon voi tehdä mutta tulos ei näytä täsmälleen kuvalta. Jos malli vaatii joka aamu muotoilutuotetta eikä asiakas koskaan käytä tuotteita, ehdota helpompaa." },
        { p: "Asiakkaalle kannattaa myös kertoa, että lyhyt leikkaus pysyy muodossa yleensä noin 3–5 viikkoa. VaraaAissa voit kirjata jokaisen asiakkaan ohjauskamman ja pituuden [asiakastietoihin](lesson:khach-hang) ja muistuttaa häntä varaamaan uuden ajan muutaman viikon päästä [kanta-asiakaskortilla](lesson:the-khach-quen) tai viestillä, jotta leikkaus pysyy aina siistinä." },
      ],
    },
  ],
  faq: [
    {
      q: "Mitä ohjauskamman numerot tarkoittavat?",
      a: "Ohjauskamman numero kertoo suunnilleen, paljonko pituutta koneella leikatessa jää: mitä suurempi numero, sitä pidemmät hiukset. Saman numeron todellinen pituus vaihtelee valmistajittain, joten katso käyttämäsi koneen taulukko. Epävarmana aloita pidemmällä ohjauskammalla.",
    },
    {
      q: "Millä ohjauskammalla aloittelijan kannattaa aloittaa?",
      a: "Aloita ohjauskammalla, joka on pidempi kuin tavoittelemasi pituus. Uusi kierros lyhyemmällä vie minuutin, kun taas liian lyhyeksi leikatut hiukset kasvavat takaisin viikkoja. Sääntö pätee kaikkiin konemerkkeihin.",
    },
    {
      q: "Leikataanko koneella kasvusuuntaan vai sitä vastaan?",
      a: "Kasvusuuntaa vastaan. Silloin kone nostaa hiuksia ja terä leikkaa tasaisemmin. Pidä ohjauskampa tasaisesti päätä vasten, liiku hitaasti ja anna vetojen mennä hieman limittäin. Niskassa ja pyörteiden ympärillä hiukset kasvavat moneen suuntaan, joten käy ne läpi myös muista suunnista.",
    },
    {
      q: "Miten saksia pidetään oikein?",
      a: "Peukalo toisessa renkaassa, nimetön toisessa ja pikkusormi sormituella. Leikatessa vain peukalon terä liikkuu ja toinen pysyy paikallaan, jolloin linja pysyy suorana eivätkä hiukset työnny sivuun. Saksien kärjet eivät koskaan osoita asiakkaan kasvoja kohti.",
    },
    {
      q: "Miksi miesten leikkaukseen jää raja sivujen ja päälaen väliin?",
      a: "Koska sivut leikattiin koneella lyhyiksi ja päälaki jätettiin pitkäksi ilman vähittäistä häivytystä niiden välissä. Korjaa saksilla kamman päällä tai välialueella pidemmällä ohjauskammalla, kunnes kädellä ylöspäin sivellessä reunaa ei enää tunnu.",
    },
    {
      q: "Kuinka usein lyhyet miesten hiukset kannattaa leikata?",
      a: "Lyhyt leikkaus pysyy muodossa yleensä noin 3–5 viikkoa. Parturin kannattaa kertoa se asiakkaalle heti leikkauksen jälkeen, jotta seuraava aika varataan oikeaan aikaan ja malli pysyy siistinä.",
    },
  ],
  related: ["cat-nam-co-ban", "toc-tu-van-chia-vung-hieu-dung", "cat-nam-fade-hieu-dung", "ve-sinh-dung-cu"],
};

export default article;
