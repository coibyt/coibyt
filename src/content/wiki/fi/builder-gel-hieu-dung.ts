import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/builder-gel-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "mika-on-rakennegeeli-biab",
  lesson: "builder-gel-hieu-dung",
  category: "nail",
  title: "Mikä on rakennegeeli (BIAB)? Ero geelilakkaan, kenelle se sopii ja miksi apex on tärkeä",
  metaTitle: "Mikä on rakennegeeli (BIAB)? Ero geelilakkaan, apex, huolto",
  metaDescription:
    "Mikä on rakennegeeli eli BIAB, miten se eroaa geelilakasta, liukeneva ja kova geeli, kenelle se sopii, apex, miksi geeli irtoaa tyvestä ja milloin huoltoon.",
  keyword: "mikä on rakennegeeli",
  keywords: ["BIAB kynnet", "rakennegeeli vai geelilakka", "pilaako rakennegeeli kynnet", "rakennegeelin apex", "rakennegeeli irtoaa tyvestä", "rakennegeelin huoltoväli", "mikä on rubber base"],
  excerpt: "Rakennegeeli eli BIAB on paksu geeli, joka muodostaa omalle kynnelle tukevan rungon. Ero geelilakkaan, kenelle se sopii, oikea rakenne ja syyt irtoamiseen.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("bo-mong-builder-gel-hong-sua-tu-nhien"),
    alt: "Asiakkaan kaksi kättä kermanvärisellä tyynyllä, kymmenen lyhyttä kynttä peitetty kiiltävällä, luonnollisella maidonroosalla rakennegeelillä",
  },
  takeaways: [
    "Geelilakka on pinta, **rakennegeeli on runko**: paksu geeli, joka tasoittuu itsestään ja kovettuu omaa kynttä tukevaksi kerrokseksi.",
    "Rakennegeeli sopii ohuille ja pehmeille, helposti katkeaville kynsille. Se **ei nopeuta kynsien kasvua** eikä hoida kynttä.",
    "Kerros on ohut kynsinauhan vieressä, ohut kärjessä ja paksuin **apexissa**, joka on rasitusalueen päällä.",
    "Irtoaminen tyvestä johtuu yleensä hätäisestä esikäsittelystä, ihoon koskevasta geelistä, paksusta reunakynnyksestä tai puuttuvasta apexista.",
    "**Huolto 3–4 viikon välein** on tavallinen, jotta apex saadaan takaisin oikealle paikalle. Hyvin kiinni olevaa vanhaa kerrosta ei tarvitse poistaa kokonaan.",
  ],
  intro: [
    "Mikä on rakennegeeli, ja miksi jokainen heikkokyntinen asiakas kysyy sitä? Se on paksu geeli, jota kutsutaan usein nimellä BIAB, eli rakennegeeli pullossa. Oman kynnen päälle levitettynä se muodostaa rungon, joka tekee kynnestä vahvan ja näyttää silti luonnolliselta. Sama palvelu ilman ymmärrystä tehtynä irtoaa ja katkeilee, eikä asiakas palaa.",
    "Artikkeli seuraa VaraaAi Academyn Kynnet-kurssin oppituntia ”Rakennegeeli: ymmärrä, niin kynnet pysyvät vahvoina ja kauniina”. Luettuasi erotat rakennegeelin geelilakasta, tiedät, kenelle se sopii ja kenen kannattaa odottaa, ymmärrät, miksi geelillä pitää olla muoto, ja osaat perustella asiakkaalle säännölliset huollot.",
  ],
  sections: [
    {
      id: "rakennegeeli-vai-geelilakka",
      title: "Rakennegeeli vai geelilakka: mikä on ero",
      blocks: [
        { p: "Kumpikin kovetetaan lampussa ja kumpikin tulee pullossa, joten asiakkaat pitävät niitä usein samana tuotteena. Niillä on kuitenkin eri tehtävä. Geelilakka on juoksevaa ja ohutta, ja sitä käytetään lähinnä värin takia. Se joustaa ja taipuu kynnen mukana, mutta ei tee kynnestä yhtään jäykempää. Rakennegeeli on paljon paksumpaa, kuin hunajaa. Kynnelle asetettuna se leviää itsestään tasaiseksi, eli se on itsestään tasoittuvaa. Lampussa kovetettuna siitä tulee runko, joka tukee omaa kynttä." },
        { img: { src: img("builder-gel-dac-sanh-nhu-mat-ong"), alt: "Mustaan käsineeseen pukeutunut käsi nostaa siveltimen pullosta, ja paksu, kirkas roosa rakennegeeli valuu hitaana nauhana takaisin pullonsuulle", caption: "Rakennegeeli on paksua ja valuu hitaasti. Juuri paksuus antaa kynsiteknikolle mahdollisuuden muotoilla kerroksen." } },
        {
          table: {
            head: ["Vertailu", "Geelilakka", "Rakennegeeli"],
            rows: [
              ["Koostumus", "Juokseva ja ohut", "Paksu kuin hunaja, tasoittuu itsestään"],
              ["Tehtävä", "Väri", "Runko, joka tukee omaa kynttä"],
              ["Kovetettuna", "Joustava, taipuu kynnen mukana, ei jäykistä", "Jäykkä kerros, joka estää kynttä taipumasta"],
              ["Paksuus ja lämpö", "Ohut kerros", "Paksumpi kerros; asiakas tuntee usein lämpöä ensimmäisinä sekunteina"],
            ],
          },
        },
        { p: "Lyhyimmin muistettuna: lakka on pinta, rakennegeeli on runko. Samassa kynsisarjassa voi olla molemmat, runko alla ja väri päällä. Jos värilakkaus ei ole vielä hallussa, lue ensin [mikä geelilakkaus on ja miksi se kestää](lesson:gel-hieu-dung)." },
      ],
    },
    {
      id: "liukeneva-ja-kova-geeli",
      title: "Kaksi rakennegeeliryhmää: asetoniin liukeneva ja kova geeli",
      blocks: [
        { p: "Ennen kuin avaat uuden pullon, selvitä, kumpaan ryhmään se kuuluu. Ryhmät poistetaan täysin eri tavalla." },
        {
          table: {
            head: ["Ryhmä", "Mitä siihen kuuluu", "Poisto"],
            rows: [
              ["Asetoniin liukeneva", "Useimmat pullossa myytävät BIAB-geelit sekä paksut pohjageelit eli rubber base -geelit", "Liukenee asetoniin"],
              ["Kova geeli", "Rakennegeeli, joka ei liukene asetoniin", "Viilataan pois"],
            ],
          },
        },
        { img: { src: img("tho-nail-doc-huong-dan-tren-chai-gel"), alt: "Kermanväriseen puseroon pukeutunut kynsiteknikko seisoo geelipulloja täynnä olevan kivihyllyn vieressä ja lukee pienen pullon takaetikettiä" } },
        { note: "Valmistajan ohjeesta luetaan kolme asiaa ennen käyttöä: miten tuote poistetaan, kuinka kauan se kovetetaan ja millaisessa lampussa. Älä käytä yhden merkin lukuja toisen merkin pullolle.", kind: "info", title: "Lue valmistajan ohje" },
        { p: "Kummankin tyypin poisto ohentamatta omaa kynttä käydään läpi artikkelissa [geelin oikea poisto](lesson:thao-gel)." },
      ],
    },
    {
      id: "kenelle-sopii",
      title: "Kenelle rakennegeeli sopii ja kenen kannattaa odottaa",
      blocks: [
        { p: "Paras asiakas on se, jolla on ohuet, pehmeät ja helposti taipuvat kynnet, jotka lohkeilevat kärjestä kerroksittain ja katkeavat heti, kun ne kasvavat vähän pidemmiksi. Runko estää kynttä taipumasta joka päivä, joten asiakas saa pitää omien kynsiensä pituuden." },
        { img: { src: img("mong-mong-tach-lop-o-dau-mong"), alt: "Lähikuva ohuesta luonnonkynnestä, jonka kärki on lohkeillut kerroksiksi ja hilseilee kirkkaina suomuina", caption: "Ohut, kärjestä lohkeileva kynsi: juuri tällaista kynttä rakennegeelin runko suojaa parhaiten." } },
        { note: "Rakennegeeli ei nopeuta kynsien kasvua eikä paranna kynsiä. Se suojaa niitä, jotta ne eivät katkea kasvaessaan. Älä lupaa asiakkaalle, että geeli tekee kynsistä terveemmät.", kind: "warn", title: "Kerro vaikutuksesta oikein" },
        { p: "Kolmessa tilanteessa palvelua ei tehdä tai sitä ei tehdä vielä:" },
        {
          ul: [
            "**Kynsi, joka kuuluu lääkärille.** Kynsi irtoaa kynsipedistä, on värjäytynyt tai paksuuntunut, tai kynnen ympärillä oleva iho on turvonnut, punoittava tai märkivä. Älä tee hoitoa, vaan neuvo asiakasta käymään lääkärissä.",
            "**Asiakas, joka on reagoinut geeliin aiemmin.** Merkkejä ovat kutina, punoitus ja rakkulat kynsien ympärillä aiempien kertojen jälkeen.",
            "**Aivan lyhyiksi pureskellut kynnet.** Geelin täytyy tarttua omaan kynteen. Kun kynttä on hyvin vähän, geelillä on vähän tarttumapintaa ja se päätyy helposti iholle. Näille asiakkaille on usein parempi hoitaa kynsiä jonkin aikaa, kunnes ne kasvavat, ja tehdä rakennegeeli vasta sitten.",
          ],
        },
        { img: { src: img("mong-can-sat-chua-nen-lam-builder-gel"), alt: "Kaksi kättä kermanvärisellä pyyhkeellä, kynnet pureskeltu hyvin lyhyiksi, reunat rosoiset ja kynsien ympärillä kuivaa ihoa" } },
        { p: "Merkit, joiden takia hoidosta kieltäydytään, käydään tarkemmin läpi Hygienia ja turvallisuus -kurssin oppitunnilla [Milloin hoitoa ei tehdä](lesson:khi-nao-khong-lam)." },
      ],
    },
    {
      id: "rakennegeelin-apex",
      title: "Mikä on apex ja millainen on oikea rakennegeelikynsi",
      blocks: [
        { p: "Hyvä rakennegeelikynsi ei ole tasapaksu kuin lankku. Sillä on muoto: ohut aivan kynsinauhan vieressä, ohut kärjessä ja paksuimmillaan yhdessä kohdassa, jota kutsutaan **apexiksi**." },
        { p: "Syy löytyy siitä, miten kynsi ottaa rasitusta. Asiakas kirjoittaa näppäimistöllä, avaa kansia ja napittaa nappeja joka päivä. Kynsi taipuu ylöspäin, ja se katkeaa yleensä samasta kohdasta: siitä, missä kynsi irtoaa kynsipedistä ja vapaa reuna alkaa. Se on rasitusalue. Apex on aivan rasitusalueen päällä, hieman sen takana. Geeli on siinä paksuimmillaan ja toimii kuin tukipalkki, joten kynsi ei taivu. Täysin tasainen kerros toimii päinvastoin: kynsi joustaa yhä ylös ja alas joka päivä, ja geeli irtoaa vähitellen." },
        { img: { src: img("diem-apex-builder-gel-nhin-tu-canh-ben"), alt: "Sormi sivulta kuvattuna, kirkkaan roosa rakennegeeli muodostaa pehmeän kaaren, joka on korkeimmillaan kynnen keskivaiheilla", caption: "Sivulta katsottuna: ohut tyvessä ja kärjessä, korkeimmillaan apexissa." } },
        { p: "Kärjestä päin katsottuna kynnessä on kaari kuin C-kirjain. Geelin täytyy seurata tätä C-kaarta tasaisesti molemmin puolin. Sivuseinillä geeli on ohut ja siisti, suoraan kynnen reunaa pitkin, ei pullistu eikä valu iholle." },
        { img: { src: img("do-cong-chu-c-nhin-tu-dau-mong"), alt: "Sormenpää osoittaa suoraan kameraan, ja geelillä päällystetty kynnen kärki näkyy tasaisena C-kirjaimen muotoisena kaarena molemmin puolin" } },
        { note: "Opettele katsomaan jokaista kynttä kolmesta suunnasta: ylhäältä, sivulta ja kärjestä. Pelkästään ylhäältä katsottuna on hyvin vaikea huomata, että kerros on lattea tai kallistuu toiselle puolelle.", kind: "tip", title: "Kolme katselusuuntaa" },
      ],
    },
    {
      id: "rakennegeeli-irtoaa",
      title: "Miksi rakennegeeli irtoaa tyvestä viikon päästä",
      blocks: [
        { p: "Asiakas palaa viikon päästä, ja geeli on irronnut kynsinauhan kohdalta. Se on tämän palvelun yleisimpiä ongelmia, ja syy on yleensä jokin näistä neljästä." },
        {
          table: {
            head: ["Syy", "Mitä tapahtuu", "Miten välttää"],
            rows: [
              ["Hätäinen esikäsittely", "Kynnessä on rasvaa, kosteutta tai kiiltoa, tai pintaan jäi ohut ihokalvo, eikä geeli tartu", "Työskentele kuivana, poista kalvo, hio kiilto pois, puhdista äläkä koske kynteen"],
              ["Geeli koskee ihoon", "Geeli valuu kulmiin tai kynsinauhalle; iho kasvaa ja nostaa sen irti", "Jätä geelin ja ihon väliin hiuksenohut rako"],
              ["Liian paksut reunat", "Reunaan syntyy kynnys, joka irtoaa pienimmästäkin kolauksesta", "Pidä geeli ohuena tyvessä ja sivuseinillä"],
              ["Apex puuttuu", "Kynsi joustaa joka päivä, kunnes geeli ei enää kestä", "Rakenna korkein kohta rasitusalueen päälle"],
            ],
          },
        },
        { img: { src: img("loi-gel-tran-vao-da-o-chan-mong"), alt: "Lähikuva punaisesta geelikynnestä, jossa geeli on levinnyt kynnen yli iholle tyvessä ja kynnen kulmissa", caption: "Kuvassa on virhe: geeli on valunut iholle kynnen tyvessä. Tällainen kerros irtoaa ihon kasvaessa, ja iholle jäänyt kovettumaton geeli voi myös aiheuttaa allergian." } },
      ],
    },
    {
      id: "lampo-ja-allergia",
      title: "Rakennegeeli polttaa lampussa: lämpö ja allergiariski",
      blocks: [
        { p: "Geeli vapauttaa lämpöä kovettuessaan, ja mitä paksumpi kerros, sitä enemmän lämpöä. Rakennegeeli on paksumpaa kuin geelilakka, joten asiakas tuntee usein polttelua ensimmäisten sekuntien aikana. Monissa lampuissa on matalan lämmön tila, ja jotkut valmistajat suosittelevat muutaman sekunnin esikovetusta, joka kiinnittää geelin ennen täyttä kovetusta. Noudata käyttämäsi merkin ohjetta." },
        { img: { src: img("den-led-ho-builder-gel"), alt: "Valkoinen kupolinmuotoinen LED-kynsilamppu kivipöydällä, ja sen sisällä lamput hehkuvat sinivioletisti" } },
        {
          ul: [
            "Jos asiakas tuntee kuumuutta, anna hänen ottaa käsi pois muutamaksi sekunniksi, laita se takaisin ja koveta silti koko aika. Älä pakota asiakasta kestämään kipua: liika kuumuus voi vahingoittaa kynsipetiä.",
            "Tee kaksi kohtuullista kerrosta yhden hyvin paksun sijaan. Ohuempi kerros kuumenee vähemmän ja kovettuu tasaisemmin.",
            "Älä keskeytä kovetusta. Vajaasti kovettunut geeli irtoaa helposti ja aiheuttaa herkemmin allergiaa.",
          ],
        },
        { h3: "Kolme sääntöä allergiasta" },
        {
          ol: [
            "Kovettumaton geeli ei koske asiakkaan ihoon eikä omaasi.",
            "Geelin on kovetuttava täysin: valmistajan suosittelema lampputyyppi, koko aika eikä liian paksuja kerroksia.",
            "Viilauspöly imetään pois, sitä ei puhalleta, sillä myös vajaasti kovettuneen geelin pöly voi aiheuttaa allergiaa.",
          ],
        },
        { note: "EU:ssa HEMA-pitoisten kynsituotteiden etiketissä on oltava merkinnät ”vain ammattikäyttöön” ja ”voi aiheuttaa allergisen reaktion” ([asetus (EU) 2020/1682](https://eur-lex.europa.eu/eli/reg/2020/1682/oj/eng)). TPO:ta sisältävät kynsituotteet on kielletty, joten tarkista salongin varasto. Määräykset vaihtelevat maittain, joten selvitä myös omaa toimintaasi koskevat vaatimukset.", kind: "warn", title: "Ainesosia koskevat säännöt" },
        { p: "Aiheesta kerrotaan tarkemmin oppitunnilla [Allergiat ja kemikaalit](lesson:di-ung-hoa-chat)." },
      ],
    },
    {
      id: "rakennegeelin-huolto",
      title: "Rakennegeelin huoltoväli ja mitä kertoa asiakkaalle",
      blocks: [
        { p: "Kun kynsi kasvaa, geeli siirtyy hitaasti kohti kärkeä ja vie apexin mukanaan. Runko siirtyy eteenpäin, kynsi muuttuu kärkipainoiseksi ja katkeaa ja irtoaa helpommin. Siksi asiakas tulee yleensä huoltoon 3–4 viikon välein: vanha kerros viilataan ohuemmaksi, kasvanut kohta tyvessä peitetään ja apex rakennetaan uudelleen oikeaan kohtaan." },
        { img: { src: img("builder-gel-moc-ra-can-dam-lai"), alt: "Lähikuva kasvaneesta rakennegeelikynnestä, jonka tyvessä näkyy kaistale paljasta omaa kynttä ilman geeliä", caption: "Muutaman viikon kuluttua kasvanut kohta näkyy tyvessä ja apex on siirtynyt kohti kärkeä." } },
        { p: "Jos vanha kerros on yhä hyvin kiinni, voit tehdä monta huoltoa poistamatta sitä kokonaan. Oma kynsi säästyy poistolta toisensa jälkeen." },
        { p: "Loppu on rehellistä puhetta asiakkaalle. Yksi lause riittää: ”Tämä kerros estää kynsiäsi katkeamasta, jotta ne saavat kasvaa pidemmiksi. Se ei nopeuta kasvua.” Lisää sitten:" },
        {
          ul: [
            "Jos geeli irtoaa, älä revi tai väännä sitä itse irti. Tule takaisin salonkiin.",
            "Käytä käsineitä tiskatessa ja siivotessa.",
            "Levitä kynsinauhaöljyä kynsien ympärille joka päivä.",
          ],
        },
        { p: "Asiakas, joka ymmärtää, auttaa sinua pitämään huolta kynsistään. Kun teoria on selvä, siirry käytännön artikkeliin [rakennegeeli omille kynsille vaihe vaiheelta](lesson:builder-gel)." },
      ],
    },
    {
      id: "huoltoajat-ajanvaraukseen",
      title: "Rakennegeelin huoltoajat salongin ajanvaraukseen",
      blocks: [
        { p: "Rakennegeeli elää huoltoväleistään, joten salongissa kannattaa olla oma palvelu huollolle. VaraaAissa [lisäät palvelun](lesson:dich-vu) ”Rakennegeelin huolto” sillä kestolla, joka se salongissasi oikeasti vie, ja varaat seuraavan huoltoajan [ajanvarauskalenteriin](lesson:lich-hen) ennen kuin asiakas lähtee. Kun seuraava aika on jo varattu, asiakas harvoin venyttää huoltoväliä tai repii geeliä kotona irti." },
      ],
    },
  ],
  faq: [
    {
      q: "Onko rakennegeeli sama kuin BIAB?",
      a: "BIAB tarkoittaa rakennegeeliä pullossa, ja moni salonki käyttää sitä nimenä pullossa myytävälle rakennegeelille. Useimmat pullogeelit liukenevat asetoniin, kuten paksut pohjageelit ja rubber base -geelit. Lisäksi on kova geeli, joka ei liukene asetoniin vaan viilataan pois.",
    },
    {
      q: "Mikä ero on rakennegeelillä ja geelilakalla?",
      a: "Geelilakka on ohutta ja juoksevaa, sitä käytetään lähinnä värin takia, eikä se jäykistä kynttä. Rakennegeeli on paljon paksumpaa, tasoittuu itsestään ja kovettuu rungoksi, joka tukee omaa kynttä. Rakennegeelin päälle voi lakata värin geelilakalla.",
    },
    {
      q: "Saako rakennegeeli kynnet kasvamaan nopeammin tai vahvistaako se niitä?",
      a: "Ei. Rakennegeeli ei nopeuta kasvua eikä hoida kynttä. Se suojaa kynttä taipumiselta ja katkeamiselta kasvun aikana, ja siksi asiakas saa pitää omien kynsiensä pituuden.",
    },
    {
      q: "Missä rakennegeelin apexin pitää olla?",
      a: "Apex on kohta, jossa geeli on paksuimmillaan. Se on rasitusalueen päällä, siinä missä kynsi irtoaa kynsipedistä ja vapaa reuna alkaa, hieman tämän kohdan takana. Kynsinauhan alue ja kärki pysyvät ohuina.",
    },
    {
      q: "Miksi rakennegeeli polttaa lampussa?",
      a: "Geeli vapauttaa kovettuessaan lämpöä, sitä enemmän mitä paksumpi kerros, ja rakennegeeli on paksumpaa kuin geelilakka. Jos polttaa, asiakas ottaa käden pois muutamaksi sekunniksi, laittaa sen takaisin ja geeli kovetetaan koko aika. Matalan lämmön tila tai lyhyt esikovetus, jos valmistaja sitä suosittelee, ja kaksi kohtuullista kerrosta yhden paksun sijaan auttavat myös.",
    },
    {
      q: "Kuinka usein rakennegeeli pitää huoltaa?",
      a: "Yleensä 3–4 viikon välein. Kynnen kasvaessa apex siirtyy kohti kärkeä, kynsi muuttuu kärkipainoiseksi ja katkeaa tai irtoaa helpommin. Huollossa vanha kerros viilataan ohuemmaksi, kasvanut kohta peitetään ja apex rakennetaan uudelleen. Hyvin kiinni olevaa vanhaa kerrosta ei tarvitse poistaa kokonaan.",
    },
  ],
  related: ["builder-gel", "gel-hieu-dung", "thao-gel-hieu-dung", "fill-mong-hieu-dung"],
};

export default article;
