import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/dua-form-mong/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "kynsien-viilaus-ohje",
  lesson: "dua-form-mong",
  category: "nail",
  title: "Kynsien viilaus vaihe vaiheelta: 10 vaihetta seitsemään muotoon kantikkaasta stilettoon",
  metaTitle: "Kynsien viilaus: ohje 10 vaiheessa seitsemään muotoon",
  metaDescription:
    "Kynsien viilaus vaihe vaiheelta: tasainen pituus, keskilinja ja rasituspisteet, kantikkaan, pyöreän, soikean, mantelin, coffinin ja stileton viilaus.",
  keyword: "kynsien viilaus",
  keywords: ["miten kynnet viilataan", "kynsien muotoilu viilalla", "mantelikynsien viilaus", "soikeiden kynsien viilaus", "pyöristetty kantikas viilaus", "kynsien viilaus yhteen suuntaan", "kynsien viilaus kotona"],
  excerpt: "Koko kynsien muotoilu: ensin pituus, sitten muoto, seitsemän muodon viilauslinjat ja tarkistukset, joilla kaikista kymmenestä kynnestä tulee samanlaiset.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-nail-dua-form-mong-cho-khach-tai-salon"),
    alt: "Punaruskeatukkainen kynsiteknikko kermanvärisessä paidassa ja mustissa käsineissä viilaa vaaleahiuksisen asiakkaan kynsiä pariisilaistyylisessä salongissa kattokruunun alla",
  },
  takeaways: [
    "**Ensin pituus, sitten muoto:** kaikki kymmenen kynttä ovat saman pituiset ennen kuin muotoilu alkaa.",
    "Jokainen muoto lähtee kahdesta rasituspisteestä ja keskilinjasta: sivut kulkevat suoraan eteenpäin ja kärki on keskilinjalla.",
    "Omat kynnet viilataan **hienolla viilalla yhteen suuntaan** ja kevyellä kädellä. Karkeammat viilat ovat vain rakennekynsille.",
    "Pidä asiakkaan sormi suorana ja viilan kulma samana molemmilla puolilla, muuten kynnestä tulee vino huomaamattasi.",
    "Tarkista jokainen kynsi ylhäältä ja kärjestä, vertaa sitten kaikkia kymmentä ja katso niitä myös asiakkaan puolelta.",
  ],
  intro: [
    "Kynsien viilaus ei ala muodosta. Se alkaa pituudesta: ensin kaikki kymmenen kynttä tasapituisiksi, ja vasta sitten viila siirtyy vinoihin vetoihin ja pyöristettyihin kulmiin. Aloittelija tekee usein toisin päin, ja tuloksena on kymmenen kynttä kymmenessä hieman eri muodossa.",
    "Artikkeli perustuu VaraaAi Academyn Kynnet-kurssin oppituntiin ”Kynsien muotoilu: vaihe vaiheelta”. Käyt läpi kymmenen vaihetta, joihin kuuluvat seitsemän muodon viilauslinjat: kantikas, pyöristetty kantikas, pyöreä, soikea, manteli, coffin ja stiletto. Katso oppitunnin video alta nähdäksesi, miten viilaa pidetään, ja palaa vaiheisiin harjoitellessasi.",
  ],
  sections: [
    {
      id: "kolme-perusasiaa",
      title: "Kolme asiaa, jotka pidetään mielessä koko muotoilun ajan",
      blocks: [
        { p: "Muodosta riippumatta, oma kynsi tai rakennekynsi, kolme asiaa pysyy samana ensimmäisestä kynnestä kymmenenteen." },
        {
          ol: [
            "**Kaikki kymmenen kynttä saman pituisiksi.** Vain samanpituiset kynnet voi viilata samanmuotoisiksi.",
            "**Kärki keskilinjalle.** Katse pysyy viilatessa kynnen keskilinjassa.",
            "**Ei syvää viilausta sivukulmiin.** Muoto tehdään kärkeen, ja sivujen pitää yhä kulkea suoraan rasituspisteistä.",
          ],
        },
        { p: "Jos et ole vielä varma, mikä muoto sopii asiakkaan käteen ja omiin kynsiin, lue ensin teoria-artikkeli [kynsien muodot ja oikean muodon valinta](lesson:dua-form-mong-hieu-dung). Tämä artikkeli kertoo viilaa pitelevistä käsistä." },
      ],
    },
    {
      id: "muotojen-muistilista",
      title: "Mitä kustakin kynsien muodosta kannattaa muistaa",
      blocks: [
        { p: "Viilauslinjat ovat yllä olevissa vaiheissa. Taulukkoon on koottu lyhyet muistisäännöt, jotka kannattaa osata ulkoa ennen kuin otat asiakkaita." },
        {
          table: {
            head: ["Muoto", "Muista", "Tehdään"],
            rows: [
              ["Kantikas", "Paras lyhyillä ja keskipitkillä kynsillä; mitä pidempi kynsi, sitä helpommin kulmat katkeavat", "Omiin tai rakennekynsiin"],
              ["Pyöristetty kantikas", "Molemmat kulmat yhtä pyöreiksi", "Omiin tai rakennekynsiin"],
              ["Pyöreä", "Kärjessä yksi tasainen kaari ilman suoraa osaa; sopii miesasiakkaille ja käsillään työskenteleville", "Lyhyisiin omiin kynsiin"],
              ["Soikea", "Pyöreä kärki aivan keskilinjalla; liian syvälle viilatut sivut tekevät siitä mantelin", "Hieman pidempiin kynsiin"],
              ["Manteli", "Lyhyt tai keskipitkä on omissa kynsissä kaunein ja kestävin", "Vahvoihin omiin tai rakennekynsiin"],
              ["Coffin", "Molemmat kapenevat sivut yhtä pitkät, pieni tasainen pää keskellä", "Vaatii pituutta, yleensä rakennekynsiin"],
              ["Stiletto", "Terävä kärki aivan keskellä", "Vain rakennekynsiin tai hyvin vahvoihin omiin kynsiin"],
            ],
          },
        },
        { note: "Rakennekynsissä käytetään karkeampaa viilaa, ja oman kynnen lähellä edetään varovasti. Pitkän kynnen rakentaminen coffin- tai stilettomuotoa varten käydään läpi oppitunnilla [geelipidennykset muotilla](lesson:noi-mong-form).", kind: "info", title: "Rakennekynsien viilaus" },
      ],
    },
    {
      id: "viilausvirheet",
      title: "Yleisimmät virheet kynsien viilauksessa ja niiden korjaus",
      blocks: [
        { p: "Vino kynsi johtuu harvoin viilasta. Syy on yleensä asiakkaan sormen asennossa tai siinä, että tekijän viilauskulma vaihtuu vasemman ja oikean puolen välillä." },
        { img: { src: img("loi-mui-mong-lech-khoi-duong-giua"), alt: "Lähikuva vinoon viilatusta maidonvaaleanpunaisesta kynnestä, toinen sivu viilattu suoraksi ja toinen yhä täysi, kärki selvästi keskilinjan sivussa", caption: "Esimerkki virheestä: toista puolta on viilattu enemmän, joten kärki on siirtynyt pois keskilinjalta." } },
        {
          table: {
            head: ["Mitä näet", "Tavallinen syy", "Korjaus"],
            rows: [
              ["Kynsi kallistuu toiselle puolelle", "Asiakkaan sormi on kallellaan, ja viila kallistuu mukana", "Pidä sormi suorana ja katse keskilinjassa"],
              ["Sivut eivät ole samanlaiset", "Eri viilauskulma vasemmalla ja oikealla", "Pidä sama kulma; katso yhden puolen jälkeen ylhäältä ennen toista"],
              ["Kymmenen kynttä, eri muodot", "Muotoilu aloitettiin ennen kuin pituudet olivat tasaiset", "Tasaa ensin pituus, korjaa sitten muoto"],
              ["Kärki lohkeilee kerroksittain", "Edestakainen sahaus tai liian karkea viila omassa kynnessä", "Viilaa yhteen suuntaan hienolla viilalla"],
              ["Soikeasta tuli manteli", "Sivut viilattiin liian syvälle", "Lopeta aiemmin; kuvittele kärki kananmunan kapeaksi pääksi"],
              ["Kynsi heikko ja katkeilee sivuilta", "Viilaus syvälle sivukulmiin", "Anna sivujen kulkea suoraan rasituspisteistä"],
            ],
          },
        },
        { note: "Tee sama vaihe kaikkiin viiteen sormeen ennen kuin siirryt seuraavaan: kaikkien viiden kynnen vasen puoli, sitten kaikkien oikea puoli ja vasta sitten kärjet. Käsi pitää saman viilauskulman, ja kynsistä tulee tasaisemmat.", kind: "tip", title: "Monen kynsiteknikon niksi" },
      ],
    },
    {
      id: "hygienia-ja-turvallisuus",
      title: "Välineiden hygienia ja milloin kynsiä ei viilata",
      blocks: [
        { p: "Muotoilu on kevyt palvelu, mutta siinäkin kosketaan asiakkaan kynsiin ja ihoon työvälineillä. Hygieniasäännöistä ei jousteta." },
        {
          ul: [
            "Yhteiset välineet, kuten kynsileikkurit, puhdistetaan ja desinfioidaan jokaisen asiakkaan jälkeen oppitunnin [Välineet jokaisen asiakkaan jälkeen](lesson:ve-sinh-dung-cu) mukaan.",
            "Kertakäyttöiset viilat ja hiomapalat ovat jokaiselle asiakkaalle uudet.",
            "Rakennekynsien pöly imetään pois, sitä ei puhalleta.",
            "Jos kynsissä on sairauden merkkejä tai niitä ympäröivä iho on punoittava ja turvonnut, hoitoa ei tehdä. Merkit käydään läpi oppitunnilla [Milloin hoitoa ei tehdä](lesson:khi-nao-khong-lam).",
          ],
        },
        { note: "Artikkeli on koulutusmateriaali, ei pätevyystodistus. Hygieniaa ja kynsitöitä koskevat määräykset vaihtelevat maittain, joten tarkista omaa toimintaasi koskevat vaatimukset.", kind: "warn", title: "Määräykset vaihtelevat" },
      ],
    },
    {
      id: "jalkihoito-ja-kirjaus",
      title: "Ohje lohjenneen kynnen varalle ja valitun muodon kirjaus",
      blocks: [
        { img: { src: img("nho-dau-duong-sau-khi-dua-mong"), alt: "Mustiin käsineisiin pukeutunut kynsiteknikko tiputtaa pipetistä kullanväristä kynsinauhaöljyä asiakkaan kynnen tyveen, käsi lepää käsityynyllä" } },
        { p: "Ohje ennen asiakkaan lähtöä on lyhyt: jos kynsi lohkeaa tai tarttuu johonkin, älä pure tai revi sitä. Viilaa se kevyesti yhteen suuntaan hienolla viilalla tai tule takaisin salonkiin." },
        { p: "Viimeinen työ on kirjata asiakkaan valitsema muoto ja pituus. VaraaAissa lisäät ne [asiakkaan muistiinpanoihin](lesson:khach-hang) heti käynnin jälkeen, jolloin ensi kerralla ei tarvitse kysyä uudelleen ja kuka tahansa tekee täsmälleen samanlaiset kynnet. Jos asiakas haluaa pitää muodon tasaisena, varaa seuraava käynti [ajanvarauskalenteriin](lesson:lich-hen) ennen kuin hän lähtee pöydän äärestä." },
      ],
    },
  ],
  howTo: {
    title: "Kynsien viilaus muoto kerrallaan",
    id: "kynsien-viilauksen-vaiheet",
    after: "kolme-perusasiaa",
    lead: "Kymmenen vaihetta oppitunnin videon järjestyksessä. Neljä ensimmäistä ovat samat jokaiselle muodolle, neljä keskimmäistä ovat kunkin muodon viilauslinjat ja kaksi viimeistä tarkistus ja viimeistely.",
    supplies: [
      "Kynsileikkurit puhdistettuina ja desinfioituina",
      "Hieno viila omille kynsille, yleensä 180 tai hienompi",
      "Karkeampi viila, jos työstät rakennekynsiä",
      "Hienojakoinen hiomapala",
      "Pehmeä pölyharja ja rakennekynsiä viilatessa pölynpoisto",
      "Kynsinauhaöljy",
      "Kuvat kynsien muodoista asiakkaan valittavaksi",
    ],
    steps: [
      {
        name: "Tarkasta kynnet ja sovi muoto",
        text: "Pese ja desinfioi omat ja asiakkaan kädet ja katso sitten tarkasti kynsiä ja niitä ympäröivää ihoa. Kysy, minkä muodon ja pituuden asiakas haluaa, ja näytä kuvia muodoista. Kerro rehellisesti ennen aloittamista, mikä muoto sopii hänen kynsilleen, sillä viilattu kynsi ei pitene takaisin.",
      },
      {
        name: "Tee kaikista kymmenestä kynnestä saman pituiset",
        text: "Lyhennä aivan liian pitkiä kynsiä kynsileikkureilla vähän kerrallaan ja jätä hieman varaa viilaukselle. Vain hieman liian pitkä kynsi viilataan suoraan poikki lyhyemmäksi. Jos jokin kynsi on katkennut lyhyeksi, kokonaispituus määräytyy lyhimmän mukaan, tai se kynsi saa oman pidennyksen.",
        image: { src: img("cat-bot-do-dai-mong-truoc-khi-dua"), alt: "Mustiin käsineisiin pukeutunut kynsiteknikko lyhentää kynsileikkureilla asiakkaan etusormen luonnonkynnen kärkeä, asiakkaan käsi kermanvärisellä tyynyllä", caption: "Lyhennä vähän kerrallaan ja jätä varaa viilalle. Muotoilu alkaa vasta, kun kaikki kymmenen kynttä ovat tasapituiset." },
      },
      {
        name: "Etsi keskilinja ja kaksi rasituspistettä",
        text: "Katso kynttä ylhäältä ja sitten kärjestä. Etsi keskilinja ja sen jälkeen kaksi rasituspistettä, kohdat, joissa kynsi alkaa irrota ihosta kummallakin sivulla. Jokainen muoto lähtee tästä: sivut kulkevat suoraan rasituspisteistä, ja kärki on keskilinjalla.",
      },
      {
        name: "Pidä viilaa kevyesti ja viilaa yhteen suuntaan",
        text: "Pidä viilaa hieman vinossa vapaan reunan alla. Omissa kynsissä käytetään hienoa viilaa ja viilataan yhteen suuntaan sivulta kohti keskustaa; älä sahaa edestakaisin, sillä kynsi kuumenee ja kärki lohkeilee kerroksittain. Pidä asiakkaan sormi suorana: jos se kallistuu, viila kallistuu mukana ja kynnestä tulee vino.",
        image: { src: img("dua-mong-mot-chieu-duoi-dau-mong"), alt: "Kynsiteknikko pitää viilaa hieman vinossa asiakkaan etusormen luonnonkynnen kärjen alla, mustassa käsineessä vähän hienoa valkoista pölyä" },
      },
      {
        name: "Viilaa kantikas ja pyöristetty kantikas",
        text: "Kantikas: pidä viilaa suorassa kulmassa sormeen nähden ja viilaa kärki suoraan poikki, sitten sivut suoriksi ja yhdensuuntaisiksi. Kuljeta viilaa kevyesti kulmien yli vain terävyyden poistamiseksi, jotteivät ne tartu. Pyöristetty kantikas tehdään ensin täsmälleen samoin, ja sitten molempia kulmia pyöristetään vähän enemmän muutamalla lyhyellä kaarevalla vedolla.",
        image: { src: img("dua-mong-vuong-bo-goc"), alt: "Lähikuva ylhäältä maidonvaaleanpunaisesta pyöristetystä kantikkaasta kynnestä, kärki suora ja molemmat kulmat pehmeästi pyöristetyt", caption: "Pyöristetty kantikas: kärki pysyy suorana, ja kulmat pyöristetään yhtä paljon." },
      },
      {
        name: "Viilaa pyöreä ja soikea",
        text: "Pyöreä on lyhyille kynsille: viilaa sivulta sormenpään kaarta seuraten keskelle asti ja tee toinen puoli samalla tavalla. Soikea tarvitsee hieman enemmän pituutta: molemmat sivut kaartuvat tasaisesti ja kohtaavat pyöreässä kärjessä aivan keskilinjalla. Älä viilaa sivuja liian syvälle, ettei soikeasta tule mantelia.",
        image: { src: img("dua-mong-o-van-dau-tron"), alt: "Lähikuva maidonvaaleanpunaisesta soikeasta kynnestä asiakkaan sormessa, sivut kaartuvat tasaisesti leveään, kananmunan muotoiseen kärkeen" },
      },
      {
        name: "Viilaa manteli",
        text: "Pidä sivut suorina rasituspisteistä asti ja viilaa sitten vinosti kummaltakin puolelta kohti keskustaa, niin että kynsi kapenee pehmeäksi, pyöreäksi kärjeksi. Tee yksi puoli valmiiksi ja katso ylhäältä ennen kuin viilaat toisen, jotta puolista tulee samanlaiset. Vahvoissa omissa kynsissä lyhyt tai keskipitkä manteli on kaunein ja kestävin.",
        image: { src: img("dua-mong-hanh-nhan-mui-tron-mem"), alt: "Lähikuva maidonvaaleanpunaisesta mantelikynnestä, jonka sivut kapenevat pehmeäksi, pyöreäksi kärjeksi sormen keskellä", caption: "Manteli: pehmeä, pyöreä kärki täsmälleen keskilinjalla." },
      },
      {
        name: "Viilaa coffin ja stiletto",
        text: "Coffin: kavenna sivut kuten mantelissa mutta pysähdy aiemmin, pidä sitten viilaa suorassa kulmassa ja viilaa kärki suoraan poikki niin, että keskelle jää pieni tasainen pää. Stiletto: kavenna sivut vielä jyrkemmin teräväksi kärjeksi aivan keskelle. Coffin vaatii pituutta ja tehdään yleensä rakennekynsiin, stiletto vain rakennekynsiin tai hyvin vahvoihin omiin kynsiin.",
        image: { src: img("dua-mong-coffin-dau-bang"), alt: "Lähikuva pitkästä maidonvaaleanpunaisesta coffin-kynnestä, sivut kapenevat ja kärki on viilattu pieneksi suoraksi reunaksi" },
      },
      {
        name: "Tarkista jokaisen kynnen symmetria",
        text: "Katso ylhäältä, onko kärki keskellä ja ovatko sivut samanlaiset. Käännä sormea ja katso kärjestä, ovatko sivut tasapainossa. Aseta kädet vierekkäin ja vertaa kaikkia kymmentä kynttä, käännä sitten asiakkaan käsi ja katso sitä niin kuin hän itse sen näkee. Korjaa poikkeamat heti muutamalla kevyellä vedolla.",
      },
      {
        name: "Viimeistele reuna, poista pöly ja levitä öljy",
        text: "Kuljeta hienoa hiomapalaa hyvin kevyesti kärjen reunan alta, jotta pienet kuidut lähtevät. Harjaa pöly pois pehmeällä harjalla; rakennekynsien pöly imetään, sitä ei puhalleta. Lopuksi tippa kynsinauhaöljyä kynsien ympärille ja kevyt hieronta.",
        image: { src: img("mai-min-mep-dau-mong-bang-phao"), alt: "Kynsiteknikko painaa valkoista hiomapalaa asiakkaan etusormen kynnen reunaan sen silottamiseksi, käsi lepää kermanvärisellä tyynyllä" },
      },
    ],
  },
  faq: [
    {
      q: "Viilataanko kynnet yhteen suuntaan vai edestakaisin?",
      a: "Omat kynnet viilataan yhteen suuntaan sivulta kohti keskustaa hienolla viilalla ja kevyellä kädellä. Edestakainen sahaus kuumentaa kynttä ja saa kärjen lohkeilemaan kerroksittain.",
    },
    {
      q: "Leikataanko vai viilataanko kynnet ensin?",
      a: "Ensin pituus, sitten muoto. Aivan liian pitkiä kynsiä lyhennetään kynsileikkureilla vähän kerrallaan ja jätetään varaa viilalle, ja vain hieman pitkät kynnet viilataan suoraan poikki. Muotoilu aloitetaan vasta, kun kaikki kymmenen kynttä ovat saman pituiset.",
    },
    {
      q: "Minkä karkeuksinen viila sopii omille kynsille?",
      a: "Mitä suurempi numero viilassa, sitä hienompi se on. Omille kynsille käytetään hienoa viilaa, yleensä 180 tai hienompaa. Karkeammat viilat ovat kovalle geelille ja akryylille.",
    },
    {
      q: "Miten pyöristetty kantikas viilataan?",
      a: "Aloita kuten kantikkaassa: kärki suoraan poikki ja sivut suoriksi ja yhdensuuntaisiksi. Pyöristä sitten molemmat kulmat muutamalla lyhyellä kaarevalla vedolla niin, että kulmista tulee yhtä pyöreät.",
    },
    {
      q: "Miten kynnen molemmat puolet saa viilattua tasaisesti?",
      a: "Pidä asiakkaan sormi suorana, katse keskilinjassa ja viilauskulma samana molemmilla puolilla. Katso yhden puolen jälkeen ylhäältä ennen kuin viilaat toisen. Moni kynsiteknikko tekee saman vaiheen kaikkiin viiteen sormeen ennen seuraavaa, jolloin käsi pitää yhden kulman.",
    },
    {
      q: "Mitä tehdä, jos kynsi lohkeaa kotona?",
      a: "Älä pure tai revi lohjennutta kohtaa. Viilaa se kevyesti yhteen suuntaan hienolla viilalla, kunnes se ei enää tartu, tai mene takaisin salonkiin korjauttamaan muoto.",
    },
  ],
  related: ["dua-form-mong-hieu-dung", "cham-soc-mong-co-ban", "son-gel", "noi-mong-form"],
};

export default article;
