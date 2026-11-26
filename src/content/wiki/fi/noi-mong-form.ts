import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/noi-mong-form/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "geelipidennykset-muotilla-ohje",
  lesson: "noi-mong-form",
  category: "nail",
  title: "Geelipidennykset muotilla: ohje 10 vaiheessa muotin asettamisesta viimeistelyviilaukseen",
  metaTitle: "Geelipidennykset muotilla: ohje 10 vaiheessa",
  metaDescription:
    "Geelipidennysten ohje vaihe vaiheelta: pituuden valinta, muotin leikkaus ja asettaminen, tarkistus kolmesta suunnasta, apexin rakentaminen ja muotin irrotus.",
  keyword: "geelipidennykset ohje",
  keywords: ["kynsimuotin asettaminen", "rakennegeelipidennys vaihe vaiheelta", "paperimuotin leikkaaminen", "kynsimuotin irrotus", "geelipidennysten viilaus", "geelipidennykset aloittelijalle", "apex pidennykseen"],
  excerpt: "Rakennegeelipidennykset muotilla alusta loppuun: kymmenen vaihetta järjestyksessä, muotin tarkistus kolmesta suunnasta, muotin irrotus ja virheet, jotka korjataan heti pöydän ääressä.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-nail-noi-mong-bang-form-tai-salon"),
    alt: "Nutturapäinen kynsiteknikko mustissa käsineissä tekee asiakkaalle pidennyksiä valkoisen kivipöydän ääressä salongissa, jossa on kattokruunu ja kullattu peili",
  },
  takeaways: [
    "Kolme asiaa pätee koko käsittelyn ajan: **muotti tiiviisti ja suorassa**, ei geeliä iholle ja apex oikeassa kohdassa.",
    "Viilaa oma vapaa reuna lyhyeksi, mutta **jätä sitä vähän**, jotta muotilla on mihin nojata.",
    "Kun muotti on paikallaan, tarkista se ylhäältä, kärjestä ja sivulta ennen kuin geeliä laitetaan.",
    "Muotin päälle rakennettu pidennyskerros on vain **ohut perusta**. Lujuus tulee päällysteestä, jonka apex on rasitusalueen päällä.",
    "Muotti irrotetaan löysäämällä hännät ja **vetämällä alaspäin**, ei koskaan taivuttamalla ylös.",
  ],
  intro: [
    "Geelipidennysten ohje muotilla koostuu kahdesta peräkkäisestä työstä: vapaan reunan alle asetetaan tarkasti istuva muotti, ja sen päälle rakennetaan rakennegeeli. Geelityö on tuttua rakennegeelistä omille kynsille. Uutta, ja kynnen muodon kannalta ratkaisevaa, on muotti.",
    "Artikkeli seuraa VaraaAi Academyn Kynnet-kurssin oppituntia ”Pidennykset muotilla: käytäntö vaihe vaiheelta”. Luettuasi osaat tehdä koko käsittelyn: valita pituuden asiakkaan kanssa, leikata ja asettaa muotin, rakentaa pidennyksen, muotoilla apexin, irrottaa muotin, viimeistellä viilaamalla ja varata huollon.",
  ],
  sections: [
    {
      id: "kolme-periaatetta",
      title: "Kolme periaatetta jokaisessa muottipidennyksessä",
      blocks: [
        {
          ol: [
            "**Muotti tiiviisti ja suorassa.** Muotti istuu tiiviisti vapaan reunan alla ilman rakoa ja jatkaa oman kynnen linjaa. Geeli vain seuraa muottia.",
            "**Ei geeliä iholle.** Ei kynsinauhalle, ei sivukulmiin eikä muotin reunalle, josta geeli voi valua sormenpäähän.",
            "**Apex oikeassa kohdassa.** Geelin korkein kohta on rasitusalueen päällä, siinä missä oma kynsi irtoaa kynsipedistä, jotta se jaksaa kantaa edessä olevan pitkän osan.",
          ],
        },
        { p: "Miksi vähänkin vinossa oleva muotti pilaa koko kynsisetin ja miten pituudesta neuvotaan, kerrotaan teoria-artikkelissa [kynsien pidennys muotilla](lesson:noi-mong-form-hieu-dung). Tässä keskitytään käsien työhön." },
      ],
    },
    {
      id: "muotin-tarkistus",
      title: "Muotin tarkistus kolmesta suunnasta ennen geeliä",
      blocks: [
        { p: "Nämä ovat koko käsittelyn arvokkaimmat sekunnit. Kääntynyt tai kallistunut muotti vie virheen koko kynnen rakenteeseen, eikä viilaus sitä jälkikäteen juuri korjaa. Tarkista muotti, kun sen päällä ei ole vielä tippaakaan geeliä." },
        {
          table: {
            head: ["Suunta", "Millainen oikea muotti on"],
            rows: [
              ["Ylhäältä", "Samassa linjassa sormen kanssa, keskellä kynttä"],
              ["Kärjestä", "Vaakasuorassa, ei kallistu kumpaankaan suuntaan"],
              ["Sivulta", "Jatkaa kynnen linjaa, ei laske eikä nouse"],
            ],
          },
        },
        { img: { src: img("kiem-tra-form-noi-mong-tu-dau-mong"), alt: "Sormenpää osoittaa suoraan kameraan, ja metallimuotti on vaakasuorassa tiiviisti vapaan reunan alla, tasaisesti molemmin puolin", caption: "Kärjestä katsottuna: muotti on vaakasuorassa eikä kallistu kumpaankaan suuntaan." } },
        { img: { src: img("kiem-tra-form-noi-mong-tu-canh-ben"), alt: "Sormi sivulta kuvattuna, ohut metallimuotti lähtee suoraan eteenpäin vapaasta reunasta kuin kynsi olisi kasvanut pidemmäksi", caption: "Sivulta katsottuna: muotti jatkaa kynnen linjaa, ei laske eikä nouse." } },
        { p: "Vasta kun kaikki kolme suuntaa ovat kunnossa, muotin hännät puristetaan yhteen sormen alla, jotta muotti pysyy paikallaan." },
      ],
    },
    {
      id: "sormi-kerrallaan",
      title: "Sormi kerrallaan, ja miksi pidennyskerros pidetään ohuena",
      blocks: [
        { p: "Jokaiseen sormeen oma muotti. Opetteluvaiheessa tee yksi sormi kerrallaan: aseta muotti, rakenna pidennys, koveta ja siirry vasta sitten seuraavaan. Kun kädet ovat tottuneet, voit asettaa muotit usealle sormelle kerralla. Peukalo tehdään yleensä erikseen, koska se on eri kulmassa kuin muut sormet eikä sitä saa helposti lamppuun samaan aikaan." },
        { p: "Aloittelija kasaa muotille usein runsaasti geeliä, koska pelkää pidennyksen jäävän heikoksi. Silloin muotoa on vaikea hallita ja geeli valuu helpommin muotin reunan yli. Pidennyskerros saa olla ohut kuin perusta. Lujuus tulee sen päälle tehtävästä päällysteestä, jonka apex on juuri rasitusalueen päällä." },
        { img: { src: img("up-tay-khach-cho-gel-don-ve-giua"), alt: "Mustiin käsineisiin pukeutunut kynsiteknikko pitää asiakkaan kättä käännettynä tyynyllä, pidennykset yhä muoteissa ja kohti pöytää", caption: "Päällysteen jälkeen käsi käännetään muutamaksi sekunniksi, jotta geeli asettuu keskelle pehmeäksi kaareksi." } },
        { note: "Jos asiakas tuntee lampussa polttelua, anna hänen ottaa käsi pois muutamaksi sekunniksi, laita se takaisin ja koveta loppuun. Kovetusajat, lampun tila ja pohjakerroksen käsittely (kovetetaanko vai ei) noudattavat aina valmistajan ohjetta.", kind: "warn", title: "Lampussa" },
      ],
    },
    {
      id: "yleisimmat-virheet",
      title: "Muottipidennysten yleisimmät virheet ja korjaus",
      blocks: [
        {
          table: {
            head: ["Mitä näet", "Syy", "Mitä teet"],
            rows: [
              ["Geeliharjanne pidennyksen alla tai geeliä vapaan reunan alla iholla", "Muotti ei istunut tiiviisti, ja geeli valui rakoon", "Viilaa varovasti puhtaaksi. Leikkaa ensi kerralla muotin kaari ja aseta se tiiviimmin"],
              ["Pidennys halkeaa tai irtoaa muottia irrotettaessa", "Muotti taivutettiin ylös tai irrotettiin ennen kuin geeli oli kovettunut", "Koveta koko aika, löysää hännät ja vedä muotti alaspäin"],
              ["Matala apex tai toinen puoli paksumpi", "Pisara asetettiin vinoon tai korkein kohta viilattiin pois", "Korjaa viilalla tai lisää ohut kerros, koveta ja viilaa uudelleen"],
              ["Geeliä iholla tyvessä tai sormenpäässä", "Geeli ohjattiin liian lähelle ihoa tai se valui muotin reunan yli", "Pysähdy hiuksenohuen raon päähän ihosta; pyyhi roiskeet ennen kovetusta"],
              ["Tyvi ohut, asiakkaaseen sattuu viilatessa", "Viila osui omaan kynteen", "Ohenna tyvessä vain geeliä kevyesti, jotta se sulautuu"],
            ],
          },
        },
      ],
    },
    {
      id: "ohjeet-asiakkaalle",
      title: "Kotihoito-ohjeet geelipidennysten jälkeen",
      blocks: [
        { p: "Asiakkaalla on nyt lisää pituutta, johon kädet eivät ole tottuneet. Muutama ohje öljyä hieroessa auttaa kynsiä ensimmäisten päivien yli:" },
        {
          ul: [
            "Varo uutta pituutta ensimmäisinä päivinä, kun avaat auton oven, kirjoitat tai napitat vaatteita.",
            "Älä nypi kynsiä äläkä käytä niitä työkaluina.",
            "Käytä käsineitä tiskatessa ja siivotessa.",
            "Jos jokin irtoaa tai halkeaa, tule takaisin salonkiin. Älä revi sitä irti äläkä liimaa itse.",
            "Varaa huolto noin 3–4 viikon päähän.",
          ],
        },
        { p: "Kun asiakas on lähtenyt, käytetyt paperimuotit menevät kannelliseen roska-astiaan. Metallimuotit puhdistetaan ja desinfioidaan ennen uutta käyttöä muiden metallivälineiden kanssa oppitunnin [Välineet jokaisen asiakkaan jälkeen](lesson:ve-sinh-dung-cu) mukaan." },
      ],
    },
    {
      id: "huolto-ja-muistiinpanot",
      title: "Huoltoajan varaus ja asiakkaan kynsimuodon tallennus",
      blocks: [
        { p: "Pidennykset kestävät vain, jos asiakas tulee huoltoon ajallaan. VaraaAissa varaat huollon 3–4 viikon päähän [ajanvarauskalenteriin](lesson:lich-hen) samalla kun asiakas maksaa. Kirjaa asiakkaan valitsema pituus ja muoto [asiakastietoihin](lesson:khach-hang), jotta kuka tahansa salongin kynsiteknikko voi tehdä seuraavalla kerralla täsmälleen samanlaiset. Jos pidennykset eivät vielä näy varaussivullasi, [lisää palvelu](lesson:dich-vu) sillä kestolla, jonka se sinulta oikeasti vie." },
      ],
    },
  ],
  howTo: {
    title: "Geelipidennykset ohje: työvaiheet järjestyksessä",
    id: "geelipidennysten-vaiheet",
    after: "kolme-periaatetta",
    lead: "Kymmenen vaihetta etenevät samassa järjestyksessä kuin oppitunnin video. Vaiheet 3 ja 4 ovat pidennyksen omaa osuutta, joten niissä ei kannata kiirehtiä.",
    supplies: [
      "Paperi- tai metallimuotit, pienet sakset paperimuottien leikkaamiseen",
      "Steriloitu kynsinauhan työnnin, 180-karkeuksinen viila ja hienojakoinen hiomapala",
      "Nukkaamattomat puhdistuslaput ja puhdistusneste",
      "Rakennegeeli ja geelisivellin",
      "Lamppu, jota geelimerkki edellyttää",
      "Pölynpoisto, hengityssuojain ja pölyharja",
      "Värigeeli, jos asiakas haluaa värin, päällysgeeli, kynsinauhaöljy ja suojakäsineet",
    ],
    steps: [
      {
        name: "Konsultoi, tarkasta ja valitse pituus",
        text: "Pese ja desinfioi omat ja asiakkaan kädet ja katso tarkasti kynsiä ja niitä ympäröivää ihoa. Kynsipedistä irtoava tai värjäytynyt kynsi, turvonnut punoittava iho, märkä tai avohaava tarkoittavat, että käsittelyä ei tehdä ja asiakas ohjataan lääkäriin. Kysy, onko geeli aiemmin aiheuttanut kutinaa, punoitusta tai rakkuloita. Valitkaa yhdessä pituus ja muoto, jotka sopivat omiin kynsiin ja asiakkaan arkeen; ensimmäisellä kerralla maltillinen. Kerro jo alussa, että huoltoon tullaan noin 3–4 viikon päästä.",
      },
      {
        name: "Esikäsittele kynnet kuivana",
        text: "Toimi kuten [geelilakkauksessa](lesson:son-gel) ja [rakennegeelissä omille kynsille](lesson:builder-gel): työnnä kynsinauha taakse, hio kiilto kevyesti pois, harjaa pöly, puhdista äläkä enää koske kynnen pintaan. Viilaa oma vapaa reuna lyhyeksi ja siistiksi, mutta jätä sitä vähän. Ilman vapaata reunaa muotilla ei ole mihin nojata.",
      },
      {
        name: "Sovita muotti ja leikkaa se sopivaksi",
        text: "Irrota muotti taustapaperista ja sovita se vapaan reunan alle. Jos muotin kaari ei vastaa vapaata reunaa, leikkaa se niin, että muotti istuu tiiviisti kynnen alla ilman rakoa. Jokaisen kynnen kaari on erilainen, joten leikkaa rohkeasti jokaiselle sormelle erikseen.",
        image: { src: img("cat-form-giay-cho-khop-dau-mong"), alt: "Kaksi mustiin käsineisiin pukeutunutta kättä leikkaa pienillä kullanvärisillä saksilla keltaisen paperimuotin valmista kaarta", caption: "Paperimuotin kaari leikataan jokaisen sormen vapaaseen reunaan sopivaksi." },
      },
      {
        name: "Aseta muotti ja tarkista kolmesta suunnasta",
        text: "Liu'uta muotti vapaan reunan alle ja painele se tiiviiksi ilman rakoa. Katso ylhäältä, kärjestä ja sivulta. Kun kaikki kolme ovat kunnossa, purista muotin hännät yhteen sormen alla, jotta muotti pysyy paikallaan.",
        image: { src: img("kiem-tra-form-noi-mong-tu-tren-xuong"), alt: "Ylhäältä kuvattu sormi, jonka vapaan reunan alle on asetettu metallimuotti samaan linjaan sormen kanssa ja keskelle kynttä", caption: "Ylhäältä katsottuna: muotti on samassa linjassa sormen kanssa ja keskellä kynttä." },
      },
      {
        name: "Levitä hyvin ohut pohjakerros",
        text: "Ota vähän geeliä, painele ja hiero se kevyesti kynnen pintaan, poista ylimäärä ja jätä ihoon hiuksenohut rako. Koveta kerros tai jätä se kovettamatta, juuri niin kuin käyttämäsi geelimerkki ohjeistaa.",
      },
      {
        name: "Rakenna pidennys muotin päälle",
        text: "Aseta geeliä aivan oman kynnen reunan eteen ja levitä se ohueksi muotin päälle niin, että siitä tulee kynnen pitkä osa, joka liittyy omaan vapaaseen reunaan. Tee pituus ja kärjen muoto heti nyt, sivuseinät suoriksi oman kynnen sivujen jatkeeksi. Geeli ei saa valua muotin reunan yli. Pidä kerros ohuena ja koveta valmistajan ilmoittama aika.",
        image: { src: img("dung-phan-noi-bang-gel-tren-form"), alt: "Litteä sivellin levittää kirkasta roosaa rakennegeeliä oman kynnen reunasta metallimuotin päälle ja muotoilee kynnen pitkää osaa" },
      },
      {
        name: "Tee päällyste ja muotoile apex",
        text: "Aseta geelipisara rasitusalueen päälle, siihen kohtaan, jossa oma kynsi irtoaa kynsipedistä. Ohjaa geeliä kevyesti kohti kynsinauhaa ja pysähdy hiuksenohuen raon päähän ihosta, sitten sivuseinille ja koko pidennyksen yli kärki suljettuna. Käännä asiakkaan käsi ja pidä se paikallaan muutama sekunti, jotta geeli asettuu keskelle. Käännä takaisin, tarkista sivulta ja kärjestä ja korjaa geelin ollessa märkää. Koveta koko aika ja pyyhi tahmakerros, jos tuote jättää sellaisen.",
        image: { src: img("dat-hat-gel-o-vung-chiu-luc-tao-apex"), alt: "Siveltimen kärki asettaa rakennegeelipisaran keskelle kynttä, jonka pidennys on jo rakennettu metallimuotille, lähelle oman kynnen päättymiskohtaa", caption: "Päällysteen pisara asetetaan rasitusalueelle, ei kynsinauhan viereen." },
      },
      {
        name: "Irrota muotti",
        text: "Löysää muotin häntiä hieman ja vedä muotti alaspäin pois vapaasta reunasta. Älä taivuta sitä ylös, sillä se voi halkaista tai irrottaa pidennyksen. Katso alapintaa: sen on oltava tasainen, puhdas ja kiinni omassa kynnessä. Jos alla on geeliharjanne, viilaa se varovasti puhtaaksi.",
        image: { src: img("go-form-noi-mong-keo-xuong-duoi"), alt: "Mustaan käsineeseen pukeutunut käsi vetää metallimuottia alaspäin irti kovetetusta, mantelinmuotoisesta maidonroosasta pidennyksestä" },
      },
      {
        name: "Viimeistele viilaamalla",
        text: "Kytke pölynpoisto päälle, laita hengityssuojain ja käytä 180-viilaa. Viilaa kärki oikeaan muotoon ja sivuseinät suoriksi ja yhdensuuntaisiksi. Aseta viila sitten tasaisesti kynnen pinnalle ja tasoita pinta niin, että apex säilyy. Ohenna tyvessä kevyesti vain geeliä, jotta se sulautuu omaan kynteen, äläkä viilaa omaa kynttä. Harjaa pöly pois puhaltamatta, puhdista ja tarkista vielä kolmesta suunnasta: sama pituus, sama muoto ja apex sopivan korkealla rasitusalueen päällä.",
        image: { src: img("dua-dau-mong-noi-bang-dua-180"), alt: "Harmaa viila painettuna mantelinmuotoisen pidennyksen kärkeen muodon viimeistelemiseksi, ja asiakkaan sormea pitelee mustaan käsineeseen pukeutunut käsi" },
      },
      {
        name: "Väri, päällysgeeli ja öljy",
        text: "Luonnolliseen tyyliin riittää yksi kerros kiiltävää päällysgeeliä. Jos asiakas haluaa värin, levitä värigeeli todella ohuesti. Päällysgeeli sulkee kärjen reunan ja kovetetaan koko aika. Lopuksi tiputa öljyä kynsien ympärille, hiero kevyesti, anna kotihoito-ohjeet ja varaa huolto.",
      },
    ],
  },
  faq: [
    {
      q: "Mitä tarvitaan geelipidennyksiin muotilla?",
      a: "Paperi- tai metallimuotit, rakennegeeli ja sivellin, geelimerkin edellyttämä lamppu, 180-viila, hienojakoinen hiomapala, nukkaamattomat laput ja puhdistusneste, pölynpoisto, hengityssuojain ja pölyharja. Viimeistelyyn tarvitaan päällysgeeli, kynsinauhaöljy ja värigeeli, jos asiakas haluaa värin.",
    },
    {
      q: "Jätetäänkö omaa vapaata reunaa ennen muotin asettamista?",
      a: "Jätetään. Oma vapaa reuna viilataan lyhyeksi ja siistiksi, mutta sitä jätetään vähän, jotta muotilla on mihin nojata. Muotti liu'utetaan tämän reunan alle ja painetaan tiiviiksi.",
    },
    {
      q: "Mistä tietää, että kynsimuotti on asetettu oikein?",
      a: "Tarkista se kolmesta suunnasta ennen geeliä. Ylhäältä katsottuna muotti on samassa linjassa sormen kanssa ja keskellä kynttä. Kärjestä katsottuna se on vaakasuorassa. Sivulta katsottuna se jatkaa kynnen linjaa laskematta tai nousematta.",
    },
    {
      q: "Miten kynsimuotti irrotetaan niin, ettei pidennys halkea?",
      a: "Vasta kun geeli on kovettunut kokonaan. Löysää muotin häntiä hieman ja vedä muotti alaspäin pois vapaasta reunasta. Älä koskaan taivuta muottia ylös, koska se voi halkaista tai irrottaa pidennyksen.",
    },
    {
      q: "Mistä pidennyksen alle syntyy geeliharjanne?",
      a: "Muotti ei istunut tiiviisti, ja geeli valui vapaan reunan alla olevaan rakoon. Viilaa harjanne varovasti puhtaaksi. Sovita muotti ensi kerralla huolellisemmin ja leikkaa sen kaari niin, että se istuu kynnen alla ilman rakoa.",
    },
    {
      q: "Asettaako aloittelija muotit koko käteen vai sormi kerrallaan?",
      a: "Sormi kerrallaan: muotti, pidennys, kovetus ja sitten seuraava sormi. Kun kädet ovat tottuneet, muotteja voi asettaa usealle sormelle kerralla. Peukalo tehdään yleensä erikseen, koska se on eri kulmassa kuin muut sormet eikä sitä saa helposti lamppuun samaan aikaan.",
    },
  ],
  related: ["noi-mong-form-hieu-dung", "builder-gel", "dap-bot-acrylic", "fill-mong"],
};

export default article;
