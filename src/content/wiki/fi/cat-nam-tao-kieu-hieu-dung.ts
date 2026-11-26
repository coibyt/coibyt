import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cat-nam-tao-kieu-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "miesten-hiustyyli-kasvojen-muodon-mukaan",
  lesson: "cat-nam-tao-kieu-hieu-dung",
  category: "hair",
  title: "Miesten hiustyyli kasvojen muodon mukaan: sivujakaus vai French crop, pomade vai mattavaha",
  metaTitle: "Miesten hiustyyli kasvojen muodon mukaan: jakaus vai crop",
  metaDescription:
    "Miesten hiustyylin valinta kasvojen muodon, tuuheuden ja aamurutiinin mukaan: sivujakaus vai crop, ajettu jakaus, pomade, mattavaha ja merisuolasuihke.",
  keyword: "miesten hiustyyli kasvojen muodon mukaan",
  keywords: [
    "miesten kampaus pyöreille kasvoille",
    "miesten hiustyyli pitkille kasvoille",
    "mikä on sivujakaus",
    "mikä on French crop",
    "pomade vai mattavaha",
    "muotoilutuote ohuille hiuksille miehille",
    "ajettu jakaus",
  ],
  excerpt: "Kuvassa upea malli ei aina näytä upealta asiakkaallasi. Näin valitset sivujakauksen ja cropin välillä kasvojen, hiusten ja asiakkaan arjen mukaan.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("kieu-toc-nam-re-ngoi-lech-side-part"),
    alt: "Miesasiakas nahkaisessa parturintuolissa sivujakauksella: selvä jakaus, päälaki kammattu kiiltäväksi toiselle sivulle ja lyhyet sivut",
  },
  takeaways: [
    "**Sivujakaus** on tyylikäs, mutta vaatii joka aamu föönauksen ja hieman tuotetta. **Crop** on hyvin helppohoitoinen: pyyhekuivaus ja hieman mattatuotetta.",
    "Pyöreät kasvot hyötyvät korkeudesta päälaella; pitkillä kasvoilla ei kannata nostaa liian korkealle. Kyse on alan kokemuksesta, ei säännöstä.",
    "Edestä ohenevat hiukset sopivat yleensä paremmin croppiin kuin sivujakaukseen, koska eteen suunnatut hiukset peittävät ohuen kohdan.",
    "Jakauksen paikka on **luonnollinen jakaus**: kastele hiukset, kampaa taakse, työnnä päälakea eteen ja katso, mihin hiukset jakautuvat.",
    "Mattavaha tai -savi antaa tekstuuria ilman kiiltoa, pomade kiiltoa ja siisteyttä; ohuet hiukset tarvitsevat kevyen pidon.",
  ],
  intro: [
    "Miesten hiustyyli kasvojen muodon mukaan valitaan ennen kuin sakset otetaan esiin, ja juuri siinä moni leikkaus epäonnistuu, vaikka leikkaustekniikka olisi oikea. Sama leikkaus joko sopii tai ei sovi sen mukaan, valitaanko oikea malli oikealle ihmiselle. Kuvassa upealta näyttävä tyyli ei välttämättä näytä upealta peilin edessä istuvalla asiakkaalla.",
    "Artikkeli seuraa VaraaAi Academyn Hiukset-kurssin oppituntia ”Miesten tyylit: ymmärrä ne, niin tyyli sopii kasvoille”. Se rakentuu kahden paljon kysytyn mallin ympärille: klassinen sivujakaus ja crop (French crop). Luettuasi osaat ehdottaa asiakkaan kasvoille, hiuksille ja elämäntavalle sopivan mallin, valita muotoilutuotteen ja opettaa asiakkaan muotoilemaan hiukset kotona. Itse leikkaus vaihe vaiheelta on artikkelissa [sivujakauksen ja French cropin leikkaus](lesson:cat-nam-tao-kieu).",
  ],
  sections: [
    {
      id: "sivujakaus-ja-crop",
      title: "Mikä on sivujakaus ja mikä on French crop",
      blocks: [
        {
          table: {
            head: ["Malli", "Mitä se on", "Joka aamu"],
            rows: [
              ["Sivujakaus (side part)", "Pidempi päälaki, pisin edessä, kammattu sivulle selvällä jakauksella. Lyhyet sivut, taper tai häivytys", "Vaatii föönauksen ja hieman tuotetta"],
              ["Crop (French crop)", "Lyhyt teksturoitu päälaki eteen suunnattuna ja lyhyt otsatukka. Sivuilla yleensä häivytys", "Pesun jälkeen pyyhekuivaus ja hieman mattatuotetta"],
            ],
          },
        },
        { p: "Sivujakaus näyttää tyylikkäältä ja sopii toimistoon ja juhliin. Crop sopii kiireisille ja urheileville. Hoidon tarve on yhtä tärkeä ero kuin muoto, ja se kannattaa kertoa asiakkaalle heti alussa." },
        { img: { src: img("kieu-toc-french-crop-mai-ngan-hai-ben-fade"), alt: "Nuori tuhkanvaalea mies French crop -leikkauksella: lyhyt päälaki eteen suunnattuna, lyhyt otsatukka otsan poikki ja häivytetyt sivut", caption: "French crop: lyhyt teksturoitu päälaki, lyhyt otsatukka ja häivytetyt sivut." } },
        { h3: "Pehmeä ja ajettu jakaus" },
        { p: "Sivujakauksen jakaus on kahta tyyppiä. **Pehmeä jakaus** on yksinkertaisesti kohta, jossa hiukset luonnostaan jakautuvat. **Ajettu jakaus** (hard part) on jakauksen kohdalle ajettu ohut viiva. Ajettu jakaus näyttää terävältä, mutta kasvaa takaisin sänkenä, eikä asiakas voi enää vaihtaa puolta. Koska se ajetaan partaveitsellä, ajetussa jakauksessa käytetään aina kertakäyttöistä terää, kuten oppitunnilla [Välineet jokaisen asiakkaan jälkeen](lesson:ve-sinh-dung-cu)." },
        { h3: "Päälaen ja sivujen on oltava tasapainossa" },
        { p: "Sivujakaus liian lyhyiden sivujen päällä saa pitkän päälaen näyttämään päähän lasketulta lakilta. Crop paksuilla sivuilla tekee päästä pyöreän ja raskaan. Puhu siksi konsultaatiossa aina molemmista osista yhdessä: mitä päälaelle tehdään ja mitä sivuille." },
        { img: { src: img("hai-ben-taper-nhe-cho-kieu-toc-nam-cong-so"), alt: "Lyhytpartainen mies, jolla on laineikkaat ruskeat hiukset, sivuprofiilissa: sivut kevyesti lyhennetty korvan ympäriltä ja pidempi päälaki kammattu taakse", caption: "Kevyesti lyhennetyt sivut, joissa on vielä hiusta: hillitty valinta sivujakaukselle. Taperista ja häivytyksestä kerrotaan artikkelissa [mikä on fade-leikkaus](lesson:cat-nam-fade-hieu-dung)." } },
      ],
    },
    {
      id: "kasvojen-muoto",
      title: "Miesten hiustyyli pyöreille, pitkille ja kulmikkaille kasvoille",
      blocks: [
        { p: "Kasvot ovat ensimmäinen asia, johon parturi katsoo. Yleisperiaate on tasapainottaa mittasuhteita hiuksilla: lisätä korkeutta sinne, missä sitä puuttuu, ja vähentää sieltä, missä sitä on liikaa." },
        {
          table: {
            head: ["Kasvonmuoto", "Ehdotus"],
            rows: [
              ["Pyöreät kasvot", "Hieman korkeutta päälaelle. Tuuhea sivujakaus saa kasvot näyttämään pidemmiltä"],
              ["Pitkät kasvot", "Älä nosta hiuksia liian korkealle. Lyhyt otsatukka, kuten cropissa, lyhentää kasvoja"],
              ["Kulmikkaat tai soikeat kasvot", "Sopivat useimpiin malleihin"],
              ["Isot tai hieman ulkonevat korvat", "Sivuja ei leikata liian lyhyiksi"],
            ],
          },
        },
        { note: "Kasvonmuotoon perustuvat ehdotukset ovat alan yhteistä kokemusta, eivät sääntöjä. Lopulta ratkaisee asiakkaan toive, ja parturin tehtävä on sanoa rehellisesti, mitä hän näkee.", kind: "info", title: "Ohje, ei sääntö" },
      ],
    },
    {
      id: "valinta-hiusten-mukaan",
      title: "Valinta hiusten mukaan: ohenevat hiukset, pyörteet, paksut ja laineikkaat hiukset",
      blocks: [
        { p: "Kasvojen jälkeen katsotaan hiukset. Neljä asiaa kannattaa huomata, ja jokainen kallistaa valintaa jompaankumpaan malliin." },
        {
          ul: [
            "**Hiukset ohenevat edestä.** Sivujakaus voi joskus paljastaa hiuspohjaa jakauksen kohdalta. Crop suuntaa hiukset eteen ja peittää ohuet kohdat.",
            "**Pyörre otsan hiusrajassa.** Hiukset nousevat siinä pystyyn. Liian lyhyeksi leikattu otsatukka ei asetu alas. Joskus jakaus on helpompi tehdä pyörteen suuntaan.",
            "**Paksut, karkeat ja suorat hiukset.** Pitävät cropin hyvin.",
            "**Hieman laineikkaat hiukset.** Antavat sivujakaukselle kaunista liikettä.",
          ],
        },
        { p: "Tuuheuden, hiuslaadun ja kasvusuunnan lukeminen käydään tarkemmin läpi artikkelissa [konsultaatio ennen hiustenleikkausta](lesson:toc-tu-van-chia-vung-hieu-dung)." },
      ],
    },
    {
      id: "kysymykset-arjesta",
      title: "Kolme kysymystä asiakkaan aamuista",
      blocks: [
        { p: "Hiustyyli elää enemmän asiakkaan kotona kuin salongissa. Kysy ennen kuin päätätte mallista: montako minuuttia sinulla on aamuisin hiuksille, föönaatko, käytätkö kypärää tai urheilulakkia?" },
        { img: { src: img("tho-tu-van-chon-kieu-toc-nam-truoc-guong"), alt: "Parturi seisoo miesasiakkaan vieressä messinkikehyksisen peilin edessä ja nostaa toisella kädellä päälaen hiuksia, asiakas elehtii kuvaillessaan toivettaan", caption: "Konsultaatio kuivista hiuksista: katso todelliset hiukset ja kysy sitten aamurutiinista." } },
        { p: "Hyvin tavallinen tilanne: asiakas valitsee kuvassa upealta näyttävän sivujakauksen mutta ei koskaan föönaa kotona. Viikon päästä hiukset ovat lässähtäneet ja menevät miten sattuu, ja asiakas luulee leikkauksen olleen huono. Ehdota mallia, jonka asiakas oikeasti osaa tehdä itse." },
      ],
    },
    {
      id: "tekniikat",
      title: "Tyylin takana olevat tekniikat: pistoleikkaus, teksturointi ja luonnollinen jakaus",
      blocks: [
        { h3: "Pistoleikkaus" },
        { p: "Sen sijaan että parturi leikkaisi suoraan poikki, hän suuntaa saksien kärjet suoraan latvoihin ja leikkaa pieniä lovia. Latvoista tulee pehmeämmät ja liikkuvammat, eikä kovaa leikkuulinjaa jää. Cropin tekstuuri syntyy tällä tekniikalla." },
        { img: { src: img("cat-tia-dau-keo-tao-ket-cau-cho-toc-nam"), alt: "Parturi pitää vaaleahiuksisen miesasiakkaan päälaen suortuvaa kahden sormen välissä ja suuntaa saksien kärjet vinosti latvoihin lovien leikkaamiseksi", caption: "Pistoleikkaus: saksien kärjet menevät latvoihin, ei leikata suoraan poikki." } },
        { h3: "Teksturointi" },
        { p: "Teksturointi keventää siellä, missä hiukset ovat paksut. Ohuisiin ja harvoihin hiuksiin varoen, koska liiallinen ohennus saa hiukset lässähtämään ja paljastaa hiuspohjaa. Älä ohenna tyven läheltä jakauksen tai pyörteen kohdalta: ne lyhyet hiukset nousevat suoraan pystyyn." },
        { h3: "Luonnollisen jakauksen löytäminen" },
        { p: "Sivujakauksessa parturi ei vain valitse jakauksen paikkaa. Kastele hiukset, kampaa ne kaikki taakse ja työnnä sitten päälakea kevyesti kämmenellä eteenpäin. Hiukset jakautuvat itsestään yhdestä kohdasta, ja se on asiakkaan luonnollinen jakaus. Kun jakaus tehdään siihen, hiukset asettuvat hyvin ja asiakas toistaa sen helposti kotona. Jos asiakas on pitänyt jakausta vuosia samalla puolella, kysy häneltä ja katso, miten hiukset ovat tottuneet asettumaan." },
      ],
    },
    {
      id: "pomade-mattavaha-merisuola",
      title: "Pomade vai mattavaha, ja milloin merisuolasuihketta käytetään",
      blocks: [
        { p: "Tuotenimiä on hyllyssä paljon, mutta karkeasti ne jakautuvat kahden kysymyksen mukaan: kiiltävä vai matta, vahva vai kevyt pito." },
        {
          table: {
            head: ["Tuote", "Mitä se antaa", "Sopii"],
            rows: [
              ["Mattavaha tai -savi", "Tekstuuria, ei kiiltoa", "Croppiin"],
              ["Pomade", "Kiiltoa ja siistin, asettuneen muodon. Vesipohjainen peseytyy helpommin pois", "Klassiseen sivujakaukseen"],
              ["Merisuolasuihke", "Tuuheutta ja pitoa. Käytetään ennen föönausta", "Hiuksille, jotka tarvitsevat lisää tuuheutta"],
              ["Kevyen pidon tuote", "Pitää muodon painamatta hiuksia alas", "Ohuille hiuksille"],
            ],
          },
        },
        { img: { src: img("pomade-sap-li-xit-muoi-bien-tao-kieu-toc-nam"), alt: "Marmoritasolla rasia kiiltävää meripihkanväristä pomadea, purkki harmaata mattavahaa, kaksi merkitsemätöntä suihkepulloa ja musta kampa", caption: "Vasemmalta: kiiltävä pomade, mattavaha ja suihkepullot. Jokainen antaa hiuksille erilaisen pinnan." } },
        { p: "Raskaat tuotteet lässähdyttävät ohuet hiukset, joten ohuille hiuksille riittävät merisuolasuihke ennen föönausta ja kevyen pidon tuote. Mitä tahansa käytätkin, käytä vähän: ota pieni määrä sormenpäähän ja hiero se tasaisesti kämmenten väliin ennen kuin viet sen hiuksiin." },
        { note: "Käytä muotoilutuotteita valmistajan ohjeen mukaan. Kysy ennen käyttöä, onko asiakkaalla herkkä hiuspohja tai allergioita. Tuotteita ja välineitä koskevat määräykset vaihtelevat maittain.", kind: "warn", title: "Kysy ennen kuin levität" },
      ],
    },
    {
      id: "kotimuotoilun-opastus",
      title: "Asiakkaan opastaminen muotoiluun kotona",
      blocks: [
        { p: "Leikkaus on valmis vasta, kun asiakas osaa tehdä sen uudelleen seuraavana aamuna. Kerro muotoilun aikana ääneen: mihin suuntaan föönataan, paljonko tuotetta otetaan ja miten se levitetään. Kerro myös, mitä kannattaa välttää. Liika vaha tekee hiuksista rasvaiset ja raskaat. Itsestään kuivumaan jätetty sivujakaus lässähtää yleensä edestä." },
        { img: { src: img("tho-vuot-san-pham-tao-kieu-len-toc-nam"), alt: "Parturi levittää kädellään muotoilutuotetta miesasiakkaan päälaen hiuksiin ja ohjaa niitä taaksepäin ja hieman sivulle" } },
        { note: "Anna asiakkaan kokeilla föönia tai vahaa kerran siinä tuolissa. Kun hän osaa tehdä sen itse, leikkaus ilahduttaa koko kuukauden eikä vain yhden päivän.", kind: "tip", title: "Ammattilaisen vinkki" },
        { p: "Kirjaa VaraaAissa malli, jakauksen puoli ja asiakkaan käyttämä tuote [asiakastietoihin](lesson:khach-hang). Jos salonki myy vahaa tai pomadea, hallinnoit niitä kohdassa [tuotteet ja tilaukset](lesson:san-pham-don-hang). Muotoilun sisältävälle leikkaukselle kannattaa varata [palveluvalikoimassa](lesson:dich-vu) niin pitkä kesto, että näille muutaman minuutin neuvoille jää aikaa." },
      ],
    },
  ],
  faq: [
    {
      q: "Millainen miesten kampaus sopii pyöreille kasvoille?",
      a: "Alan yhteisen kokemuksen mukaan pyöreät kasvot hyötyvät hieman korkeudesta päälaella. Tuuhea sivujakaus saa kasvot näyttämään pidemmiltä. Tämä on ohje eikä sääntö, ja asiakkaan hiusten tuuheus ja muotoilutottumukset ovat yhtä tärkeitä.",
    },
    {
      q: "Millainen miesten hiustyyli sopii pitkille kasvoille?",
      a: "Pitkillä kasvoilla hiuksia ei kannata nostaa päälaella liian korkealle. Lyhyt otsatukka, kuten cropissa, saa kasvot näyttämään lyhyemmiltä.",
    },
    {
      q: "Mikä on sivujakaus ja onko se vaikea pitää kunnossa?",
      a: "Sivujakaus on klassinen malli, jossa pidempi päälaki, pisin edessä, kammataan sivulle selvällä jakauksella ja sivut tehdään taperina tai häivytyksenä. Se on tyylikäs ja sopii toimistoon, mutta vaatii joka aamu föönauksen ja hieman tuotetta. Itsestään kuivumaan jätettynä etuosa yleensä lässähtää.",
    },
    {
      q: "Mikä on French crop ja kenelle se sopii?",
      a: "French cropissa on lyhyt, teksturoitu päälaki eteen suunnattuna ja lyhyt otsatukka, ja sivuilla on yleensä häivytys. Se on hyvin helppohoitoinen, joten se sopii kiireisille ja urheileville. Se peittää myös hyvin edestä ohenevat hiukset.",
    },
    {
      q: "Mitä eroa on pomadella ja mattavahalla?",
      a: "Pomade antaa kiiltoa ja siistin, asettuneen muodon ja sopii klassiseen sivujakaukseen; vesipohjainen pomade peseytyy helpommin pois. Mattavaha tai -savi antaa tekstuuria ilman kiiltoa ja sopii croppiin. Kumpaakin käytetään vähän ja hierotaan ensin tasaisesti kämmeniin.",
    },
    {
      q: "Mikä muotoilutuote saa miehen ohuet hiukset näyttämään tuuheammilta?",
      a: "Ohuille hiuksille sopii merisuolasuihke ennen föönausta tuuheuden saamiseksi yhdessä kevyen pidon tuotteen kanssa. Raskaat vahat tai runsas kiiltävä pomade lässähdyttävät ohuet hiukset.",
    },
  ],
  related: ["cat-nam-tao-kieu", "cat-nam-fade-hieu-dung", "cat-nam-co-ban-hieu-dung", "say-tao-kieu-hieu-dung"],
};

export default article;
