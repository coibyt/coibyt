import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cat-nam-fade/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "haivytyksen-tekeminen-koneella",
  lesson: "cat-nam-fade",
  category: "hair",
  title: "Häivytyksen tekeminen koneella: 10 vaihetta tasaiseen keskikorkeaan skin fadeen ilman raitoja",
  metaTitle: "Häivytyksen tekeminen koneella: 10 vaihetta ilman raitoja",
  metaDescription:
    "Häivytys vaihe vaiheelta: korkeus, ohjauslinja, vyöhykkeet, säätövipu ja puolikkaat ohjauskammat, raitojen poisto, ajo ihoon asti ja liitos päälakeen.",
  keyword: "häivytyksen tekeminen koneella",
  keywords: [
    "fade-leikkaus vaihe vaiheelta",
    "keskikorkea häivytys ohje",
    "skin fade ohje",
    "raitojen poisto häivytyksestä",
    "häivytyksen ohjauslinja",
    "säätövipu ja puolikas ohjauskampa",
    "häivytys aloittelijalle",
  ],
  excerpt: "Keskikorkea, ihoon asti ajettu häivytys kymmenessä vaiheessa: ohjauslinja, vyöhykkeet, raitojen poisto, ihoon ajo, tarkistus valossa ja liitos päälakeen.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-xem-duong-fade-bang-guong-tay"),
    alt: "Hymyilevä miesasiakas kääntää päätään katsoakseen juuri häivytettyä sivuaan, ja parturi pitää hänen takanaan pyöreää messinkikehyksistä käsipeiliä niskan kohdalla",
  },
  takeaways: [
    "Tee **ohjauslinja** ensin koko pään ympäri, samalle korkeudelle molemmille puolille. Kaikki sen alapuolella rakentuu tämän linjan varaan.",
    "Käännä jokaisessa pysähdyskohdassa rannetta ja **kauho kone ulos**. Suora irtiveto jättää raidan.",
    "Häivytä alhaalta ylöspäin, jokaisella raidalla välipituus: vipu hieman enemmän auki tai puolikas ohjauskampa.",
    "Harjaa irtohiukset pois vetojen välillä ja tarkista valossa, koska irtohiukset peittävät raidat.",
    "Jos toinen puoli jää korkeammalle, ainoa korjaus on nostaa matalampaa puolta. Ole tarkka jo ohjauslinjassa.",
  ],
  intro: [
    "Häivytyksen tekeminen koneella ei ole kalliiseen koneeseen kätketty salaisuus. Tasainen häivytys syntyy työjärjestyksestä: tehdään ohjauslinja, jaetaan sen alapuolinen alue vyöhykkeisiin ja häivytetään vyöhykkeet kärsivällisesti yhteen hyvin pienin askelin. Aloittelija ohittaa järjestyksen, ajaa konetta ylös ja alas, kunnes raidat katoavat, ja häivytys päätyy paljon korkeammalle kuin asiakas halusi.",
    "Artikkeli seuraa VaraaAi Academyn Hiukset-kurssin oppitunnin ”Häivytysleikkaus: käytäntö vaihe vaiheelta” työjärjestystä. Mallina on keskikorkea häivytys (mid fade), alhaalta ihoon asti, ja se häivytetään pehmeästi noin viiden sentin päälakeen, joka kammataan taakse ja hieman sivulle. Ohjetta seuraamalla leikkaat koko mallin ja korjaat raidat oikeasta kohdasta. Jos häivytyksen korkeudet, skin fade ja taper ovat vielä vieraita, lue ensin [mikä on fade-leikkaus](lesson:cat-nam-fade-hieu-dung).",
  ],
  sections: [
    {
      id: "korkeudesta-sopiminen",
      title: "Ennen leikkausta: häivytyksen korkeus sovitaan asiakkaan kanssa",
      blocks: [
        { p: "Häivytyksen korkeus on parturin ja asiakkaan välinen sopimus, ei yhteinen standardi. Kysy kaksi asiaa: haluaako asiakas matalan, keskikorkean vai korkean häivytyksen, ja haluaako hän ihon näkyvän alhaalla. Osoita sitten peilissä suoraan asiakkaan päästä: häivytys alkaa tästä. Päälaen pituudesta sovitaan kuten artikkelissa [miesten hiusten leikkaus](lesson:cat-nam-co-ban)." },
        {
          ul: [
            "Tunnustele pään muoto: päälaen reuna, takaraivon kyhmy ja mahdollinen litteä kohta takana.",
            "Katso hiuspohjasta arvet ja etsi pyörteet päälaelta ja niskasta.",
            "Haava tai tulehdus hiuspohjassa tarkoittaa, ettei ajeta ihoon asti.",
          ],
        },
        { note: "Kun asiakas ottaa ensimmäisen häivytyksensä, ehdota vähän matalampaa. Ensi kerralla korkeammaksi on helppo. Korkeaksi leikattua pitää odottaa kasvamaan.", kind: "tip", title: "Ammattilaisen vinkki" },
      ],
    },
    {
      id: "ranteen-kaanto",
      title: "Ranteen kääntö: liike, joka ratkaisee, jääkö häivytykseen raitoja",
      blocks: [
        { p: "Yksi liike toistuu työjärjestyksen jokaisessa vyöhykkeessä: pysähdyskohdassa ranne kääntyy ja kone irtoaa päästä pienessä kaaressa kuin lusikalla kauhaisten. Terä irtoaa hiuksista vähitellen, joten pysähdyskohdan hiukset pitenevät asteittain ja vyöhykkeen reuna pehmenee." },
        { img: { src: img("hat-tong-do-ra-o-cho-dung"), alt: "Lähikuva miesasiakkaan sivusta: mustalla ohjauskammalla varustettu kone on ylöspäin vedon lopussa, ja parturin toinen käsi pitää päälaen hiuksia", caption: "Jokaisen ylöspäin vedon lopussa ranne kääntyy ulos, ja kone irtoaa päästä kaaressa." } },
        { p: "Jos pysähdyt ja vedät koneen suoraan irti, kaikki alla olevat hiukset leikkautuvat täsmälleen samaan kohtaan, ja juuri se kohta näkyy raitana. Kovempi painaminen siistimmän linjan toivossa on vielä huonompi, koska siitä jää sekä raita että kuoppa." },
        { note: "Kääntö tulee ranteesta, ei koko kädestä. Rento ranne estää pysähdyskohtaa jättämästä raitaa.", kind: "tip", title: "Pidä ranne rentona" },
      ],
    },
    {
      id: "haivytyksen-ohjauslinja",
      title: "Häivytyksen ohjauslinja: pään muodon mukaan ja puolet tasan",
      blocks: [
        { p: "Ohjauslinja kiertää pään samalla korkeudella, mutta takana se seuraa pään muotoa. Jos asiakkaan takaraivo on litteä, laske ohjauslinjaa siinä hieman, jotta pää näyttää pyöreältä." },
        { img: { src: img("duong-chuan-fade-phia-sau-dau"), alt: "Takaa kuvattuna parturi kuljettaa mustalla ohjauskammalla varustettua konetta ylöspäin miesasiakkaan takaraivolla, toinen käsi lepää kevyesti asiakkaan niskalla", caption: "Takana kone nousee niskan hiusrajasta, ja ohjauslinja seuraa pään muotoa." } },
        { p: "Kun kierros on valmis, pysähdy katsomaan: onko ohjauslinja suora ja ovatko puolet tasapainossa? Tämä tarkistus kannattaa aina. Jos häivytys myöhemmin on toisella puolella korkeammalla, sitä ei enää saa alemmas, koska hiukset ovat jo lyhyet. Ainoa korjaus on nostaa matalampi puoli samalle tasolle, jolloin koko häivytys päätyy suunniteltua korkeammalle." },
      ],
    },
    {
      id: "yleiset-virheet",
      title: "Yleiset häivytyksen virheet ja raitojen poisto",
      blocks: [
        {
          table: {
            head: ["Mitä näet", "Syy", "Korjaus"],
            rows: [
              ["Haalea raita kahden vyöhykkeen välissä", "Kahta vierekkäistä pituutta ei ole vielä häivytetty", "Välipituus vain raidan kohdalle, sitten kääntö ulos"],
              ["Häivytys nousee koko ajan", "Raitojen pelossa kone menee yhä ylemmäs", "Pysähdy, poista raita paikallaan, älä siirrä sitä ylös"],
              ["Salongissa tasainen, auringossa raitoja", "Irtohiukset peittivät raidan tai valo oli hämärä", "Harjaa irtohiukset vetojen välillä ja tarkista hyvässä valossa"],
              ["Laikukas kohta niskassa", "Pyörteen ympärillä hiukset ovat moneen suuntaan", "Aja useasta suunnasta kevyellä kädellä"],
              ["Puolet eri korkeudella", "Ohjauslinja oli vino alusta asti", "Nosta matalampi puoli samalle tasolle"],
              ["Reuna häivytyksen ja päälaen välissä", "Ei häivytetty; lyhyt päälaki ei peitä sitä", "Sakset tai kone kamman päällä, kunnes reunaa ei tunnu"],
            ],
          },
        },
        { p: "Takaraivoa on vaikeampi nähdä kuin sivuja. Älä luota pelkkään peiliin: kierrä asiakkaan taakse ja kyykisty katsomaan." },
      ],
    },
    {
      id: "turvallinen-ajo-ihoon",
      title: "Turvallinen ajo ihoon asti ja välinehygienia",
      blocks: [
        { p: "Ihoon asti ajettavassa osassa välineet koskevat suoraan asiakkaan ihoon, joten muutamaa sääntöä ei saa ohittaa." },
        {
          ul: [
            "Partaveitsessä käytetään vain kertakäyttöisiä teriä, jokaiselle asiakkaalle uusi. Käytetty terä menee viiltävien jätteiden astiaan.",
            "Koneet, ohjauskammat, kammat ja parranajokoneet puhdistetaan ja desinfioidaan jokaisen asiakkaan jälkeen tuotteen ohjeen mukaan. Folioparranajokoneen folio ja terä puhdistetaan valmistajan ohjeen mukaan.",
            "Jos iho punoittaa tai asiakas tuntee kirvelyä, lopeta. Älä yritä saada ajoa vielä lähemmäs.",
            "Haava tai tulehdus hiuspohjassa tarkoittaa, ettei ajeta ihoon asti.",
          ],
        },
        { note: "Partaveitsiä ja kampaamon hygieniaa koskevat määräykset vaihtelevat maittain, joten tarkista oman työpaikkasi vaatimukset. Katso myös [Välineet jokaisen asiakkaan jälkeen](lesson:ve-sinh-dung-cu) ja [Milloin asiakasta ei hoideta](lesson:khi-nao-khong-lam).", kind: "warn", title: "Määräykset vaihtelevat" },
      ],
    },
    {
      id: "ohjeet-ja-kirjaus",
      title: "Mitä kerrot asiakkaalle ja mitä kirjaat häivytyksen jälkeen",
      blocks: [
        { p: "Ennen kuin asiakas nousee, sano yksi asia, jonka moni parturi unohtaa: ihoa lähellä oleva osa pehmenee muutamassa päivässä, ja se on normaalia. Kun asiakas tietää tämän etukäteen, hän ei luule häivytyksen menneen pilalle. Moni asiakas palaa noin 2–3 viikon päästä pitääkseen häivytyksen kunnossa." },
        { p: "Kirjoita VaraaAissa ”keskikorkea häivytys, ohjauskammat, vipu” asiakkaan muistiinpanoihin [asiakastiedoissa](lesson:khach-hang), jotta ensi kerralla kuka tahansa voi toistaa sen tarkasti. Varaa seuraava käynti suoraan salongin [ajanvarauskalenteriin](lesson:lich-hen). Kahden tai kolmen viikon välein käyville asiakkaille salonki voi käyttää myös [kanta-asiakaskorttia](lesson:the-khach-quen)." },
      ],
    },
  ],
  howTo: {
    title: "Häivytyksen tekeminen koneella: keskikorkea skin fade vaihe vaiheelta",
    id: "haivytyksen-vaiheet",
    after: "korkeudesta-sopiminen",
    lead: "Kymmenen vaihetta oppitunnin videon järjestyksessä. Ohjauskampojen numerot ja vivun suunta vaihtelevat valmistajittain, joten tarkkoja numeroita ei anneta: kokeile omalla koneellasi.",
    supplies: [
      "Hiustenleikkuukone säätövivulla ja ohjauskampasarja, mieluiten puolikkailla koilla",
      "Trimmeri rajauksiin",
      "Folioparranajokone tai partaveitsi uudella kertakäyttöisellä terällä",
      "Kampa ja sakset puhdistettuina ja desinfioituina",
      "Kertakäyttöinen kaulapaperi ja leikkuuviitta",
      "Kaulaharja tai hiustenkuivain, käsipeili",
      "Muotoilutuote; hajusteeton rauhoittava voide herkälle iholle",
      "Viiltävien jätteiden astia",
    ],
    steps: [
      {
        name: "Valmistele välineet ja uusi terä",
        text: "Pese kädet. Kone, ohjauskammat ja kammat on puhdistettu ja desinfioitu edellisen asiakkaan jälkeen. Jos käytät partaveistä, vaihda siihen uusi terä. Kiedo kertakäyttöinen kaulapaperi asiakkaan kaulan ympäri ennen kuin kiinnität viitan.",
      },
      {
        name: "Tee konsultaatio ja näytä korkeus asiakkaan päästä",
        text: "Kysy, haluaako asiakas matalan, keskikorkean vai korkean häivytyksen ja haluaako hän ihon näkyvän alhaalla. Osoita peilistä asiakkaan päästä kohta, josta häivytys alkaa. Tunnustele pään muoto, litteät kohdat, arvet ja pyörteet ennen kuin otat koneen käteen.",
      },
      {
        name: "Tee ohjauslinja koko pään ympäri",
        text: "Kampaa hiukset alas; niiden kuuluu olla puhtaat ja kuivat. Kiinnitä ohjauslinjaa varten valitsemasi ohjauskampa, aseta se tasaisesti hiusrajaan ja liiku ylöspäin kasvusuuntaa vastaan. Sovitulla korkeudella käännä kone ulos. Tee toinen sivu, takaosa ja toinen sivu samalle korkeudelle; korvan lähellä taita korvaa kevyesti alas.",
        image: { src: img("ke-duong-chuan-fade-bang-tong-do-co-cu"), alt: "Parturi kuljettaa mustalla ohjauskammalla varustettua konetta ylöspäin miesasiakkaan sivulla, toinen käsi pitää päälaen pidempiä hiuksia", caption: "Ohjauslinja: yksi ohjauskampa, yksi korkeus, koko pään ympäri." },
      },
      {
        name: "Työstä ohjauslinjan alapuoli",
        text: "Jaa ohjauslinjan alapuolinen alue kahteen tai kolmeen vyöhykkeeseen. Alimpaan vyöhykkeeseen sulje vipu tai käytä lyhyempää ohjauskampaa ja sitten konetta ilman kampaa. Tee lyhyempi veto kuin ohjauslinjassa ja käännä myös tässä pysähdyskohdassa ulos. Etene korvien ja niskan hiusrajassa hyvin kevyesti, vähän kerrallaan. Ihoon asti ajettava osa jätetään kokonaan seitsemänteen vaiheeseen; nyt alimman vyöhykkeen tarvitsee olla vain hyvin lyhyt ja tasainen.",
        image: { src: img("dai-duoi-cung-khong-cu-quanh-tai"), alt: "Parturi taittaa sormella miesasiakkaan korvaa alas ja kuljettaa toisella kädellä konetta ilman ohjauskampaa kevyesti korvan takaista hiusrajaa pitkin" },
      },
      {
        name: "Häivytä vyöhykkeet alhaalta ylöspäin",
        text: "Vyöhykkeiden välissä on nyt raitoja. Aloita alimmasta: avaa vipu puoliksi, jolloin saat kahden vyöhykkeen välisen pituuden, kulje tarkalleen raidan kohdalla ja kauho ulos lyhyin, kevyin vedoin. Seuraavaan raitaan avaa vipua enemmän tai kiinnitä puolikas ohjauskampa, ja jatka näin ohjauslinjaan ja ohjauslinjasta päälakeen. Harjaa vetojen välillä irtohiukset pois tai puhalla ne kevyesti hiustenkuivaimella, koska päässä makaavat irtohiukset peittävät raidat.",
      },
      {
        name: "Poista jäljelle jääneet raidat valossa",
        text: "Kampaa hiukset alas ja katso valossa. Jos jossain on vielä haalea raita tai tummempi laikku, käytä täsmälleen välipituutta vain siinä kohdassa. Älä nosta koko häivytystä ylemmäs. Niskan pyörre ajetaan useasta suunnasta kevyellä kädellä.",
      },
      {
        name: "Aja ihoon asti ja tee rajaukset",
        text: "Kiristä ihoa kevyesti ja siisti aivan alin osa folioparranajokoneella. Jos käytät partaveistä, vain uudella terällä, karvan kasvusuuntaan ja yhdellä vedolla. Jos iho punoittaa tai kirvelee, lopeta. Rajaa sitten trimmerillä korvat, pulisongit ja niska luonnollista linjaa seuraten ja liian korkealle leikkaamatta.",
        image: { src: img("may-cao-luoi-lam-phan-sat-da-o-gay"), alt: "Parturi kiristää kahdella sormella miesasiakkaan niskan ihoa ja pitää pientä mustaa folioparranajokonetta tasaisesti ihoa vasten korvan takana", caption: "Kaksi sormea kiristää ihoa, ja foliokone on tasaisesti alinta osaa vasten." },
      },
      {
        name: "Tarkista sivut ja takaosa hyvässä valossa",
        text: "Ohjaa asiakas hyvään valoon tai sytytä lamppu. Kun asiakas istuu suorassa katse peiliin, vertaa puolia: häivytys samalla korkeudella, pulisongit tasan. Katso sitten vasemmalta ja oikealta, kyykisty silmien tasolle ja tarkista takaosa. Pyydä asiakasta kallistamaan päätä hieman, jolloin pienet raidat erottuvat valossa selvemmin, ja korjaa heti kaikki, mikä ei ole tasaista.",
      },
      {
        name: "Liitä häivytys päälakeen",
        text: "Leikkaa päälaki etuosan ohjauslinjasta kuten miesten perusleikkauksessa. Häivytä sitten kohta, jossa häivytys kohtaa päälaen, saksilla tai koneella kamman päällä. Liikuta kampaa tasaisesti ylöspäin pysähtymättä, kunnes ylöspäin sivellessä reunaa ei tunnu. Mitä lyhyempi päälaki, sitä tasaisempi liitoksen on oltava, koska sen päälle ei laskeudu pitkiä hiuksia.",
        image: { src: img("tong-do-tren-luoc-noi-fade-voi-phan-dinh"), alt: "Parturi nostaa mustalla kammalla kerroksen miesasiakkaan hiuksia ja kuljettaa toisella kädellä ilman ohjauskampaa olevaa konetta kamman selkää pitkin", caption: "Kone kamman päällä kohdassa, jossa sivut kohtaavat päälaen." },
      },
      {
        name: "Viimeistele, kirjaa ja siivoa",
        text: "Harjaa kaikki irtohiukset pois. Jos asiakkaalla on herkkä iho ja hän suostuu, levitä juuri ajetulle alueelle hieman hajusteetonta rauhoittavaa voidetta. Muotoile päälaki, näytä asiakkaalle, miten hän tekee sen kotona, ja näytä sivut ja niska käsipeilillä. Kirjaa korkeus, ohjauskammat ja vipu asiakastietoihin. Kun asiakas on lähtenyt, harjaa hiukset pois koneen terästä, desinfioi välineet, öljyä terä ja pane partaterä viiltävien jätteiden astiaan.",
        image: { src: img("vuot-san-pham-tao-kieu-sau-khi-cat-fade"), alt: "Parturi hieroo kämmenillään muotoilutuotetta miesasiakkaan päälaen hiuksiin, sivut on jo leikattu lyhyiksi ja siisteiksi" },
      },
    ],
  },
  faq: [
    {
      q: "Mistä häivytyksen leikkaaminen aloitetaan?",
      a: "Ohjauslinjasta: yhdellä ohjauskammalla ajetaan hiusrajasta ylös asiakkaan kanssa sovitulle korkeudelle koko pään ympäri samalla korkeudella. Ohjauslinjan alapuolinen alue jaetaan sitten kahteen tai kolmeen vyöhykkeeseen, alin lyhimpänä, ja vasta sen jälkeen vyöhykkeet häivytetään yhteen.",
    },
    {
      q: "Tehdäänkö häivytys märkiin vai kuiviin hiuksiin?",
      a: "Oppitunnin työjärjestyksessä hiukset ovat puhtaat ja kuivat, ja ne kammataan alas ennen ohjauslinjaa. Vetojen välillä irtohiukset harjataan pois tai puhalletaan kevyesti hiustenkuivaimella, koska irtohiukset peittävät raidat.",
    },
    {
      q: "Miten raita kahden vyöhykkeen välistä poistetaan?",
      a: "Käytä näiden kahden vyöhykkeen välistä pituutta, vipu puoliksi auki tai puolikas ohjauskampa, kulje vain raidan kohdalla ja käännä kone ulos. Älä käy koko aluetta läpi äläkä mene ylemmäs, koska silloin koko häivytys nousee asiakkaan toivetta korkeammalle.",
    },
    {
      q: "Miksi kone käännetään ulos pysähdyskohdassa?",
      a: "Kauhaiseva kääntö saa terän irtoamaan hiuksista vähitellen, joten pysähdyskohta häipyy. Jos pysähdyt ja vedät koneen suoraan irti tai painat kovaa, pysähdyskohtaan jää raita ja kuoppa. Liike tulee rennosta ranteesta, ei koko kädestä.",
    },
    {
      q: "Häivytys on toisella puolella korkeammalla. Miten sen korjaa?",
      a: "Ainoa korjaus on nostaa matalampi puoli samalle tasolle, koska lyhyeksi leikattua hiusta ei saa takaisin alemmas. Siksi puolia verrataan heti ohjauslinjan jälkeen, kun ero on vielä helppo korjata.",
    },
    {
      q: "Folioparranajokone vai partaveitsi skin faden alimpaan osaan?",
      a: "Molemmat toimivat. Foliokone on iholle hellävaraisempi. Partaveitsessä käytetään vain uutta kertakäyttöistä terää, karvan kasvusuuntaan ja yhdellä vedolla. Lopeta, jos iho punoittaa tai kirvelee, äläkä aja ihoon asti, jos hiuspohjassa on haava tai tulehdus.",
    },
  ],
  related: ["cat-nam-fade-hieu-dung", "cat-nam-co-ban", "cat-nam-tao-kieu", "ve-sinh-dung-cu"],
};

export default article;
