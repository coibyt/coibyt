import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/dua-form-mong-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "kynsien-muodot",
  lesson: "dua-form-mong-hieu-dung",
  category: "nail",
  title: "Kynsien muodot: 7 yleistä muotoa, mikä kestää parhaiten ja miten valitset käteen sopivan",
  metaTitle: "Kynsien muodot: 7 yleistä muotoa ja oikean muodon valinta",
  metaDescription:
    "Seitsemän yleistä kynsien muotoa: kantikas, squoval, pyöreä, soikea, manteli, coffin ja stiletto. Mitkä kestävät, mitkä katkeavat ja miten valitset oikean.",
  keyword: "kynsien muodot",
  keywords: ["kynsien muoto lyhyille sormille", "kestävin kynsien muoto", "pyöristetty kantikas kynsi", "mantelin muotoiset kynnet", "coffin ja ballerina kynnet", "kynsimuodon valinta", "heikkojen kynsien muoto"],
  excerpt: "Seitsemän yleistä kynsien muotoa, mitkä kestävät omilla kynsillä, mitkä kuuluvat rakennekynsiin ja neljä asiaa, jotka katsotaan ennen muodon valintaa.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("bay-dang-mong-tay-pho-bien"),
    alt: "Seitsemän nudensävyistä vaaleanpunaista mallikynttä rivissä valkoisella marmorilla kantikkaasta, pyöreästä ja soikeasta aina teräviin muotoihin",
  },
  takeaways: [
    "Yleisiä muotoja on seitsemän: kantikas, pyöristetty kantikas eli squoval, pyöreä, soikea, manteli, coffin eli ballerina ja terävä stiletto.",
    "Arjen kolhut osuvat kärkeen. **Pyöreä, soikea ja pyöristetty kantikas** ovat omille kynsille käytännöllisimmät ja kestävimmät muodot.",
    "Kärkeen kapenevat muodot, kuten pitkä manteli tai stiletto, sopivat yleensä vahvoille omille kynsille tai **rakennekynsille**; coffin vaatii pituutta, joten sekin tehdään yleensä rakenteeseen.",
    "Muoto valitaan neljän asian perusteella: käsi, kynnen tyven kaari, asiakkaan työ ja oman kynnen vahvuus.",
    "Älä viilaa syvälle oman kynnen sivuihin: kynsi heikkenee ja sen reuna voi kasvaa ihoon.",
  ],
  intro: [
    "Kynsien muodot näyttävät sosiaalisessa mediassa loputtomilta, mutta kynsipöydän ääressä kynsiteknikko kohtaa samat seitsemän yhä uudelleen: kantikas, pyöristetty kantikas, pyöreä, soikea, manteli, coffin ja stiletto. Viilaa osaa pitää kädessä kuka tahansa. Taito on tietää, mikä muoto sopii mihinkin käteen, mikä kestää asiakkaan arjen ja minkä voi tehdä vasta, kun kynttä on pidennetty.",
    "Artikkeli seuraa VaraaAi Academyn Kynnet-kurssin oppituntia ”Kynsien muodot: ymmärrä ne ja valitse asiakkaalle sopiva muoto”. Luettuasi tunnistat jokaisen muodon nimeltä, osaat selittää, miksi osa muodoista kestää ja osa katkeaa, ja tiedät, miten neuvot asiakasta, joka tuo kuvan hänen omille kynsilleen sopimattomasta muodosta.",
  ],
  sections: [
    {
      id: "seitseman-muotoa",
      title: "Seitsemän yleistä kynsien muotoa ja niiden tunnistaminen",
      blocks: [
        { p: "Jokaisen muodon ratkaisee kaksi asiaa: kulkevatko sivut suoraan vai kapenevatko ne, ja päättyykö kärki suoraan linjaan, kaareen vai kärkeen. Kun katsot kynttä näiden kahden kysymyksen kautta, et sekoita muotoja keskenään." },
        {
          table: {
            head: ["Muoto", "Miltä se näyttää", "Sopii yleensä"],
            rows: [
              ["Kantikas", "Kärki viilattu suoraan poikki, suorat sivut ja kaksi terävää kulmaa", "Lyhyet ja keskipitkät kynnet; leveä ja vahva kärki, mutta kulmat tarttuvat ja lohkeavat"],
              ["Pyöristetty kantikas (squoval)", "Suora kuten kantikas, molemmat kulmat pehmeästi pyöristetty", "Omat kynnet; yksi käytännöllisimmistä ja kestävimmistä muodoista"],
              ["Pyöreä", "Lyhyt kynsi, jonka kärki seuraa sormenpään kaarta", "Lyhyet omat kynnet, paljon käsillään työskentelevät"],
              ["Soikea (ovaali)", "Hieman pidempi, sivut kaartuvat tasaisesti pyöreään kärkeen kuin kananmuna", "Omat kynnet; saa sormet näyttämään pidemmiltä ja hoikemmilta"],
              ["Manteli", "Sivut kapenevat kohti keskustaa pehmeäksi, pyöreäksi kärjeksi", "Vahvat omat kynnet tai geeli- ja akryylirakenteet"],
              ["Coffin (ballerina)", "Sivut kapenevat kuten mantelissa, kärki viilattu suoraksi kuin balettitossun kärki", "Vaatii pituutta, joten tehdään yleensä rakennekynsiin"],
              ["Stiletto", "Sivut kapenevat jyrkästi teräväksi kärjeksi aivan keskellä", "Rakennekynnet tai hyvin vahvat omat kynnet"],
            ],
          },
        },
        { img: { src: img("dang-mong-vuong-bo-goc-squoval"), alt: "Kaksi kättä kermanvärisellä käsityynyllä, kymmenen maidonvaaleanpunaista kynttä samanpituisina ja samaan pyöristettyyn kantikkaaseen muotoon viilattuina", caption: "Pyöristetty kantikas: suora kärki ja pehmeästi pyöristetyt kulmat. Moni asiakas valitsee tämän muodon omiin kynsiinsä." } },
        { p: "Alalla pyöristettyä kantikasta kutsutaan usein squovaliksi, ja coffin ja ballerina ovat saman muodon kaksi nimeä. Kun asiakas käyttää nimeä, jota et tunnista, nopein ratkaisu on näyttää kuvia muodoista ja antaa hänen osoittaa." },
      ],
    },
    {
      id: "kestavin-muoto",
      title: "Mikä kynsien muoto kestää parhaiten ja mikä katkeaa helposti",
      blocks: [
        { p: "Ajattele, mihin voima osuu. Näppäimistö, auton ovi, käsilaukun penkominen: jokainen päivän kolhu osuu kynnen kärkeen. Mitä enemmän kärjessä on materiaalia, sitä paremmin se kestää." },
        { p: "Kärkeen kapenevat muodot, manteli ja stiletto, jättävät kärkeen hyvin vähän materiaalia. Siksi ne sopivat yleensä vahvoille omille kynsille tai kynsille, joissa on geeliä tai akryyliä. Kantikas on päinvastainen: kärki on leveä ja vahva. Sen heikkous on kaksi terävää kulmaa, jotka tarttuvat neuleisiin ja hiuksiin ja lohkeavat. Asiakas, joka rakastaa kantikkaita kynsiään ja palaa muutaman päivän päästä yksi kulma lohjenneena, on jokaiselle kynsiteknikolle tuttu." },
        { img: { src: img("mong-vuong-bi-me-goc"), alt: "Lähikuva asiakkaan sormen kantikkaasta luonnonkynnestä, jonka kärjen toisesta kulmasta on lohjennut pieni pala", caption: "Kantikkaan muodon heikko kohta: terävä kulma tarttuu johonkin ja siitä lohkeaa pala." } },
        { p: "Pyöreässä, soikeassa ja pyöristetyssä kantikkaassa ei ole teräviä kulmia, jotka tarttuisivat, eikä kärki kapene niin paljon, että materiaali loppuisi. Siksi nämä kolme ovat omille kynsille käytännöllisimmät ja kestävimmät muodot. Coffin näyttää oikealta vasta pituuden kanssa, joten se tehdään yleensä rakennekynsiin." },
        { img: { src: img("dang-mong-nhon-stiletto-tren-mong-dap"), alt: "Kaksi pitkäsormista kättä valkoisella pyyhkeellä, kymmenen pitkää maidonvaaleanpunaista stilettokynttä yhtä pitkinä", caption: "Stiletto kapenee jyrkästi teräväksi kärjeksi. Kärkeen jää vähän materiaalia, joten muoto tehdään rakennekynsiin tai hyvin vahvoihin omiin kynsiin." } },
        { note: "Muotojen kestävyys kuvaa yleistä taipumusta. Jokaisen asiakkaan kynnet ovat erilaiset, paksut tai ohuet, kovat tai pehmeät. Katso edessäsi olevia kynsiä tarkasti ennen kuin päätät, minkä muodon ne kestävät.", kind: "info", title: "Taipumus, ei sääntö" },
      ],
    },
    {
      id: "muodon-valinta",
      title: "Miten valitset kynsien muodon käteen ja asiakkaan arkeen",
      blocks: [
        { p: "Ennen kuin viila otetaan käteen, kynsiteknikko katsoo ja kysyy neljä asiaa. Jokainen niistä karsii muutaman muodon, ja jäljelle jäävä on yleensä paras valinta." },
        { h3: "1. Käsi" },
        { p: "Pitkille, hoikille sormille sopii lähes mikä tahansa muoto, jopa kantikas. Lyhyet sormet ja leveät kynnet näyttävät yleensä pidemmiltä ja hoikemmilta soikeana tai mantelina. Kantikas leveissä kynsissä saa sormet helposti näyttämään lyhyemmiltä." },
        { img: { src: img("ban-tay-ngon-ngan-mong-rong"), alt: "Kaksi naisen kättä lyhyin sormin ja leveällä kämmenellä kermanvärisellä pyyhkeellä, luonnonkynnet lyhyet ja leveät", caption: "Lyhyet sormet ja leveät kynnet: soikea tai manteli hoikentaa kättä yleensä enemmän kuin kantikas." } },
        { h3: "2. Kynnen tyven kaari" },
        { p: "Monella kynsiteknikolla on nyrkkisääntö: kärjen muoto näyttää harmonisimmalta, kun se toistaa kynnen tyven kaarta. Pyöreä tyvi sopii pyöreään tai soikeaan muotoon. Kantikkaampi tyvi sopii pyöristettyyn kantikkaaseen. Pidä sitä hyvänä lähtökohtana ehdotukselle, ei lakina." },
        { h3: "3. Työ ja arki" },
        { p: "Paljon näppäimistöllä kirjoittaville, käsillään työskenteleville, ruokaa laittaville ja pieniä lapsia hoitaville lyhyet kynnet pyöreänä tai pyöristettynä kantikkaana ovat yleensä mukavimmat. Monilla työpaikoilla, kuten sairaaloissa ja keittiöissä, on lisäksi omat kynsiä koskevat sääntönsä. Kun asiakas mainitsee työnsä, kysy vielä yksi kysymys ennen kuin ehdotat pituutta." },
        { img: { src: img("mong-ngan-vuong-bo-goc-khi-go-phim"), alt: "Naisen käsi kirjoittaa kannettavan tietokoneen näppäimistöllä kivipöydällä, lyhyet kynnet pyöristettyinä kantikkaina ja maidonvaaleanpunaisina" } },
        { h3: "4. Oman kynnen vahvuus" },
        { p: "Jos kynnet ovat ohuet, pehmeät tai lohkeilevat kärjestä kerroksittain, älä viilaa niitä teräviksi äläkä jätä niitä pitkiksi. Pyöreä muoto tai lyhyt soikea kestää pidempään. Jos asiakas haluaa silti pitkät mantelit tai stilettot, ne tehdään rakennekynsinä, kuten oppitunnilla [geelipidennykset muotilla](lesson:noi-mong-form)." },
        { img: { src: img("mong-that-mong-tach-lop-o-dau"), alt: "Lähikuva asiakkaan ohuesta luonnonkynnestä, jonka kärki on lohkeillut useaksi ohueksi kerrokseksi ja hieman rispaantunut", caption: "Ohut, kärjestä kerroksittain lohkeileva kynsi: pidä lyhyenä ja viilaa pyöreäksi tai soikeaksi." } },
      ],
    },
    {
      id: "symmetria-ja-sivulinjat",
      title: "Kymmenen samanlaista kynttä ja suorat sivulinjat: tästä taidon näkee",
      blocks: [
        { p: "Oikean muodon valinta on puolet työstä. Toinen puoli on tehdä kaikista kymmenestä kynnestä saman pituiset ja saman muotoiset. Asiakas katsoo käsiään koko päivän, joten yksikin poikkeava kynsi huomataan heti." },
        {
          ul: [
            "**Ylhäältä katsottuna:** kärki on aivan keskellä ja sivut ovat symmetriset.",
            "**Käännä sormea ja katso kärjestä:** sivut ovat tasapainossa ja kaari on tasainen.",
          ],
        },
        { p: "Kynnen molemmilla puolilla on kohta, jossa kynsi alkaa irrota ihosta. Alalla sitä kutsutaan **rasituspisteeksi**. Siitä alkaen sivujen pitää kulkea suoraan eteenpäin, ja vasta sitten kärki muotoillaan. Muoto siis tehdään vain kärkeen, ei koskaan viilaamalla sivuihin." },
        { img: { src: img("loi-dua-sau-vao-khoe-mong"), alt: "Lähikuva luonnonkynnestä, joka on viilattu molemmista sivuista syvältä kapeaksi kärjeksi, ja sivukulmien iho on hieman punoittava", caption: "Esimerkki virheestä: oman kynnen sivuihin on viilattu syvälle. Kynsi näyttää hoikemmalta, mutta sivutuki on menetetty." } },
        { note: "Älä viilaa syvälle oman kynnen sivukulmiin. Kynsi menettää tuen molemmilta sivuilta, joten se on heikko ja katkeaa helposti. Kun kynsi kasvaa, sen reuna voi myös painua ihoon ja aiheuttaa kivuliaan turvotuksen.", kind: "warn", title: "Hyvin yleinen virhe" },
      ],
    },
    {
      id: "viilan-valinta",
      title: "Viilan valinta: mitä suurempi karkeusluku, sitä hienompi viila",
      blocks: [
        { p: "Viilaan merkitty numero kertoo sen karkeuden. Mitä suurempi numero, sitä hienompi viila." },
        {
          table: {
            head: ["Kynsi", "Viila", "Viilaustapa"],
            rows: [
              ["Oma kynsi", "Hieno viila, yleensä 180 tai hienompi", "Yhteen suuntaan, kevyellä kädellä"],
              ["Kova geeli tai akryyli", "Karkeampi viila työn mukaan", "Varovasti oman kynnen lähellä"],
            ],
          },
        },
        { img: { src: img("cac-loai-dua-mong-theo-do-min"), alt: "Neljä kynsiviilaa hienosta kermanvärisestä karkeaan mustaan valkoisen hiomapalan ja pölyharjan vieressä pyyhkeellä", caption: "Hienot viilat ovat omille kynsille, karkeammat rakennekynsille." } },
        { p: "Omassa kynnessä edestakainen sahaaminen kuumentaa kynttä ja saa kärjen lohkeilemaan kerroksittain. Yhteen suuntaan viilaaminen on myös [geelilakkauksen](lesson:son-gel) ensimmäinen tapa. Jokaisen muodon viilauslinjat kantikkaasta stilettoon käydään läpi käytännön artikkelissa [kynsien viilaus vaihe vaiheelta](lesson:dua-form-mong)." },
      ],
    },
    {
      id: "rehellinen-neuvonta",
      title: "Kun toivottu muoto ei sovi asiakkaan omille kynsille",
      blocks: [
        { p: "Tuttu tilanne: asiakas tuo kuvan todella pitkistä, teräväkärkisistä kynsistä, mutta hänen omat kynsensä ovat ohuet. Nyökkääminen on helppoa, mutta muutaman päivän päästä hän palaa katkenneen kynnen kanssa ja luottaa sinuun vähän vähemmän." },
        { img: { src: img("tho-nail-tu-van-dang-mong-cho-khach"), alt: "Kermanväriseen paitaan ja mustiin käsineisiin pukeutunut kynsiteknikko pitelee asiakkaan kättä ja selittää ystävällisesti marmoripöydän ääressä tyylikkäässä salongissa" } },
        { p: "Selitä lempeästi, että hänen omissa kynsissään tämä muoto katkeaa todella helposti, ja tarjoa valinta:" },
        {
          ol: [
            "Lyhyempi manteli omiin kynsiin.",
            "Rakennekynnet, jotta hän saa haluamansa terävän muodon.",
          ],
        },
        { p: "Kun asiakas ymmärtää syyn, hän valitsee itse ja luottaa sinuun yleensä enemmän sen jälkeen. Muodosta riippumatta kynnet ja niitä ympäröivä iho katsotaan ensin: jos kynsissä on sairauden merkkejä tai iho on punoittava ja turvonnut, hoitoa ei tehdä, kuten oppitunti [Milloin hoitoa ei tehdä](lesson:khi-nao-khong-lam) kertoo. Kynsitöitä koskevat määräykset vaihtelevat maittain, joten tarkista omaa toimintaasi koskevat vaatimukset." },
      ],
    },
    {
      id: "asiakkaan-muistiinpanot",
      title: "Kirjaa asiakkaan valitsema muoto ja pituus",
      blocks: [
        { p: "Kanta-asiakas haluaa joka kerta omat kyntensä, vaikka ne tekisi eri kynsiteknikko. VaraaAissa kirjaat muodon ja pituuden [asiakkaan muistiinpanoihin](lesson:khach-hang), jotta seuraavan käynnin tekijä tekee kynnet samoin. Jos salongissasi kynsien muotoilu on oma palvelunsa tai osa manikyyriä, [lisää palvelu](lesson:dich-vu) sen todellisella kestolla, niin asiakkaat voivat varata sen itse. Ohjelma on salongin omistajalle maksuton: [katso VaraaAi salongeille](/business)." },
      ],
    },
  ],
  faq: [
    {
      q: "Mitkä ovat yleisimmät kynsien muodot?",
      a: "Yleisimmät seitsemän ovat kantikas, pyöristetty kantikas eli squoval, pyöreä, soikea, manteli, coffin eli ballerina ja stiletto. Ne eroavat siinä, kulkevatko sivut suoraan vai kapenevatko ne, ja onko kärki suora, kaareva vai terävä.",
    },
    {
      q: "Mikä kynsien muoto kestää omilla kynsillä parhaiten?",
      a: "Pyöreä, soikea ja pyöristetty kantikas ovat omille kynsille käytännöllisimmät ja kestävimmät muodot, koska kärkeen jää paljon materiaalia eikä niissä ole teräviä kulmia, jotka tarttuisivat. Kyse on yleisestä taipumuksesta, ja lopulta kestävyys riippuu asiakkaan omista kynsistä.",
    },
    {
      q: "Mikä kynsien muoto sopii lyhyille sormille?",
      a: "Soikea tai manteli saa lyhyet sormet ja leveät kynnet yleensä näyttämään pidemmiltä ja hoikemmilta. Kantikas muoto leveissä kynsissä saa sormet helposti näyttämään lyhyemmiltä.",
    },
    {
      q: "Ovatko coffin- ja ballerinakynnet sama asia?",
      a: "Ovat, ne ovat saman muodon kaksi nimeä. Sivut kapenevat kuten mantelissa, ja kärki viilataan suoraksi kuin balettitossun kärki. Muoto vaatii pituutta, joten se tehdään yleensä rakennekynsiin.",
    },
    {
      q: "Voiko ohuet ja heikot kynnet viilata stilettoksi?",
      a: "Sitä ei kannata tehdä. Terävät ja pitkät muodot keskittävät voiman kärkeen, joten heikot kynnet katkeavat todella helposti. Ohuet, pehmeät tai lohkeilevat kynnet kestävät parhaiten lyhyinä pyöreinä tai soikeina. Pitkät mantelit ja stilettot tehdään rakennekynsiin.",
    },
    {
      q: "Miksi kynnen sivuihin ei saa viilata?",
      a: "Sivut tukevat kynttä. Syvälle sivukulmiin viilaaminen heikentää kynttä niin, että se katkeaa helposti, ja kasvaessaan sen reuna voi painua ihoon ja aiheuttaa kivuliaan turvotuksen. Sivujen pitää kulkea suoraan rasituspisteistä, ja muoto tehdään vain kärkeen.",
    },
  ],
  related: ["dua-form-mong", "noi-mong-form-hieu-dung", "cham-soc-mong-co-ban-hieu-dung", "gel-hieu-dung"],
};

export default article;
