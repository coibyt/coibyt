import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/gel-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "mika-on-geelilakka",
  lesson: "gel-hieu-dung",
  category: "nail",
  title: "Mikä on geelilakka? Miksi se kestää 2–3 viikkoa, miksi se irtoaa ja onko se haitallista kynsille",
  metaTitle: "Mikä on geelilakka? Kestävyys, irtoaminen ja haitat",
  metaDescription:
    "Mikä on geelilakka, miten se tarttuu kynteen, miksi tarvitaan lamppu ja ohuet kerrokset, kauanko se kestää, kolme irtoamistapaa, geeliallergia ja TPO-kielto.",
  keyword: "mikä on geelilakka",
  keywords: [
    "onko geelilakka haitallista kynsille",
    "kauanko geelilakka kestää",
    "miksi geelilakka irtoaa",
    "geelilakka polttaa lampussa",
    "tahmea kerros geelilakan päällä",
    "miten geelilakka kovettuu",
    "TPO geelilakassa",
  ],
  excerpt: "Geeli ei imeydy kynteen, se tarttuu vain pintaan. Kun ymmärrät sen, ymmärrät, miksi geeli kestää, miksi se irtoaa ja miten se ei vahingoita kynsiä.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("thay-day-nail-giang-ve-son-gel-cho-tho-tre"),
    alt: "Harmaahiuksinen kynsikouluttaja pellavaisessa esiliinassa istuu kivipöydän ääressä ja selittää jotain kahdelle nuorelle kermanväriseen paitaan pukeutuneelle kynsiteknikolle",
  },
  takeaways: [
    "Geeli **ei imeydy kynteen**, vaan tarttuu vain kynsilevyn pintaan. Pinnan on oltava puhdas kuolleesta ihosta, rasvaton ja kuiva.",
    "Geeli kovettuu vain merkin edellyttämässä lampussa, täyden ajan ja silloin, kun kerros on niin ohut, että valo pääsee sen läpi.",
    "Oikein tehty geelilakkaus näyttää hyvältä **2–3 viikkoa**. Pidempään pidettynä kynsi kasvaa ja geeli katkeaa ja irtoaa helpommin.",
    "Irtoamiskohta kertoo syyn: kynsinauhan vierestä pintaan jäänyt iho, kärjestä sulkematta jäänyt vapaa reuna, kokonaisina levyinä rasva, kosteus tai vajaa kovettuminen.",
    "Kynsiä ja ihmisiä vahingoittavat voimakas hionta, geelin repiminen irti ja kovettumattoman geelin joutuminen iholle.",
  ],
  intro: [
    "Mikä on geelilakka, kun samasta pullosta yksi kynsiteknikko saa asiakkaalle kolmen viikon kestävyyden ja toisella geeli irtoaa jo kolmessa päivässä? Lyhyt vastaus: geelilakka on kynsilakka, joka ei kuivu ilmassa. Se kovettuu vain oikeanlaisessa lampussa, ja se tarttuu kynnen pintaan eikä imeydy sisään. Kaikki kestävyydestä irtoamiseen ja turvallisuudesta allergiaan johtuu näistä kahdesta asiasta.",
    "Artikkeli perustuu VaraaAi Academyn Kynnet-kurssin oppituntiin ”Geelilakka: ymmärrä, niin se kestää”, joka on geelilakkausaiheen teoriaosa. Se ei opeta sivellintyötä. Se selittää, miksi jokainen vaihe tehdään niin kuin tehdään, jotta osaat itse päätellä, mikä meni vikaan, kun asiakkaan kynsissä on ongelma. Käytännön työvaiheet ovat artikkelissa [Geelilakkaus vaihe vaiheelta](lesson:son-gel).",
  ],
  sections: [
    {
      id: "mihin-geeli-tarttuu",
      title: "Kynnen rakenne: mihin geelilakka oikeastaan tarttuu",
      blocks: [
        { p: "Kova osa, jonka päälle lakataan, on **kynsilevy**. Se on keratiinia monena ohuena kerroksena. Kynsi kasvaa **kasvualueesta** eli matriksista, joka on piilossa ihon alla kynnen tyvessä. Jos tätä aluetta viilataan tai painetaan liian kovaa, kynsi voi kasvaa uurteisena, joskus pysyvästi." },
        { img: { src: img("cau-tao-mong-tay-mat-cat-dau-ngon"), alt: "Piirroskuva sormenpään pitkittäisleikkauksesta: kynsilevy päällimmäisenä, kynnen juuri ihopoimun alla piilossa ja luu keskellä", caption: "Kynsilevy on se osa, jonka näet. Kasvualue, jossa kynsi syntyy, on piilossa tyven ihopoimun alla." } },
        { p: "Kynnen tyvessä on kahdenlaista ihoa, jotka aloittelija sekoittaa helposti:" },
        {
          table: {
            head: ["Iho", "Tehtävä", "Mitä kynsiteknikko tekee"],
            rows: [
              ["Elävä ihopoimu kynnen tyven yläpuolella", "Tiivistää, jotta bakteerit eivät pääse kasvualueelle", "Ei leikata"],
              ["Kynsilevyyn kiinnittynyt ohut, läpikuultava kalvo", "Kuollutta ihoa, joka ei enää suojaa", "Poistetaan ennen lakkausta"],
            ],
          },
        },
        { h3: "Kolme ehtoa geelin tarttumiselle" },
        { p: "Koska geeli tarttuu vain pintaan, kynsilevyn on täytettävä kolme ehtoa:" },
        {
          ul: [
            "**Puhdas kuolleesta ihosta.** Jos ohut kalvo jää, geeli tarttuu ihoon eikä kynteen ja irtoaa muutamassa päivässä.",
            "**Rasvaton.** Käsien ihon rasva saa geelin liukumaan irti.",
            "**Kuiva.** Kynsilevy imee vettä kuin sieni: se turpoaa ja kutistuu kuivuessaan takaisin. Geeli ei pysty kutistumaan sen mukana.",
          ],
        },
        { img: { src: img("ngam-tay-trong-nuoc-truoc-khi-son-gel"), alt: "Asiakkaan sormenpäät liotuksessa valkoisessa posliinikulhossa, jossa on lämmintä vettä ja ruusun terälehtiä, vieressä kermanvalkoinen pyyhe kivipöydällä", caption: "Liotus saa kynnen imemään vettä ja turpoamaan. Moni hyvä kynsiteknikko jättää sen pois ennen geelilakkausta." } },
        { p: "Siksi moni hyvä kynsiteknikko työskentelee kuivana ilman liotusta ennen geelilakkausta. Ja koska geeli tarvitsee vain pinnan, johon tarttua, hionnan tarkoitus on vain poistaa kiilto. Kova hionta ei saa geeliä pysymään paremmin. Se vain ohentaa kynttä, ja seuraavalla kerralla asiakas tuntee polttelua lampussa." },
      ],
    },
    {
      id: "miten-geeli-kovettuu",
      title: "Miksi geelilakka tarvitsee lampun ja ohuet kerrokset",
      blocks: [
        { p: "Geelissä on ainetta, jota kutsutaan fotoinitiaattoriksi. Kun se saa oikeanlaista valoa, se käynnistää reaktion, joka muuttaa geelin nesteestä kiinteäksi. Alalla sanotaan, että geeli kovettuu." },
        { p: "Jokainen merkki tekee geelinsä tietylle lampulle ja tietylle ajalle. Toisen merkin lampussa tai vanhassa, heikentyneessä lampussa pinta voi tuntua kovalta, vaikka alla oleva geeli ei ole vielä kunnolla kovettunut. Vajaasti kovettunut geeli irtoaa helposti, ja se on yksi allergian pääsyistä." },
        { img: { src: img("den-led-ho-gel-va-den-cu"), alt: "Valkoinen kupolinmuotoinen LED-geelilamppu loistaa sinivioletisti kivipöydällä, taustalla vanha kellastunut lamppu", caption: "Vanha, heikentynyt lamppu syttyy yhä, mutta se ei ehkä enää kovetta geeliä pohjaan asti." } },
        { h3: "Paksu kerros rypistyy" },
        { p: "Valo ei pääse paksun geelikerroksen läpi, varsinkaan tumman värin. Pinta kovettuu ensin, kutistuu ja rypistää alla olevan vielä nestemäisen kerroksen. Kaksi ohutta kerrosta on aina parempi kuin yksi paksu." },
        { img: { src: img("son-gel-bi-nhan-do-son-qua-day"), alt: "Lähikuva tummanpunaisesta geelikynnestä, jonka pinta on ryppyinen ja aaltoileva, ja jota mustaan käsineeseen puettu käsi tukee alta", caption: "Liian paksu kerros: pinta on rypistynyt, ja alla oleva geeli on kovettumatta." } },
        { h3: "Kun asiakasta polttaa lampussa" },
        { p: "Geeli vapauttaa lämpöä kovettuessaan. Jos asiakas sanoo, että lampussa polttaa, älä käske häntä kestämään. Anna hänen ottaa käsi pois muutamaksi sekunniksi ja laittaa se takaisin, ja lakkaa seuraavalla kerralla ohuemmin." },
        { h3: "Kovetuksen jälkeinen tahmea kerros ei ole viallista geeliä" },
        { p: "Kovetuksen jälkeen pinnalle jää usein tahmea kerros. Se on hyvin ohut geelikalvo, joka ei pysty kovettumaan, koska se on kosketuksissa ilmaan. Sekin on kovettumatonta geeliä, joten se pyyhitään pois puhdistusaineella eikä sitä päästetä asiakkaan eikä omalle iholle." },
      ],
    },
    {
      id: "kestavyys-ja-irtoaminen",
      title: "Kauanko geelilakka kestää ja miksi se irtoaa",
      blocks: [
        { p: "Oikein tehty geelilakkaus näyttää hyvältä kahdesta kolmeen viikkoa, ja se luku kannattaa kertoa asiakkaalle rehellisesti heti alussa. Jos lakkausta pidetään pidempään, kynsi kasvaa, rasituskohta siirtyy ja geeli katkeaa ja irtoaa helpommin." },
        { p: "Jos geeli irtoaa jo muutamassa päivässä, älä kiirehdi vaihtamaan merkkiä tai syyttämään asiakasta. Katso, mistä geeli irtosi. Jokainen irtoamistapa kertoo syyn." },
        {
          table: {
            head: ["Mistä geeli irtoaa", "Tavallinen syy"],
            rows: [
              ["Kynsinauhan vierestä", "Ohut ihokalvo jäi kynsilevylle"],
              ["Kärjestä", "Vapaata reunaa ei suljettu, tai kynsiä käytettiin vääntämiseen tai asioiden avaamiseen"],
              ["Kokonaisina levyinä", "Rasvaa tai kosteutta kynsilevyllä, tai vajaasti kovettunut geeli"],
            ],
          },
        },
        { img: { src: img("son-gel-bong-o-chan-mong"), alt: "Lähikuva punaisesta geelikynnestä, jonka reuna kynsinauhan puolella on irronnut ja nousee irti kynsilevystä", caption: "Irtoaminen kynsinauhan vierestä: yleensä kynsilevylle jäänyt iho." } },
        { img: { src: img("son-gel-bong-o-dau-mong"), alt: "Lähikuva tummanpunaisesta geelikynnestä, jonka kärjen kulmasta on lohjennut pala ja alta näkyy oma kynsi", caption: "Irtoaminen kärjestä: sulkematta jäänyt vapaa reuna tai kynnellä vääntäminen." } },
        { note: "Jokainen irtoamistapa muistuttaa korjaamaan oikean vaiheen. Kynsiteknikko, jonka sivellintyö on kaunista, voi silti saada asiakkaita yhä uudelleen takaisin tyvestä irronneen geelin takia, vaihtaa geelimerkkiä ja lamppua tuloksetta ja ratkaista ongelman vasta, kun hän tarkistaa, miten poistaa ohuen ihokalvon.", kind: "tip", title: "Lue kynnet ennen kuin vaihdat tuotetta" },
        { img: { src: img("khach-quay-lai-vi-son-gel-bi-bong"), alt: "Tummanvihreään paitaan pukeutunut asiakas osoittaa yhtä punaista geelikynttään ja näyttää sitä nuorelle kynsiteknikolle" } },
      ],
    },
    {
      id: "onko-geelilakka-haitallista",
      title: "Onko geelilakka haitallista kynsille? Ohentuminen, allergia ja TPO",
      blocks: [
        { p: "Täysin kovettunut geeli vain lepää kynnen päällä. Riskit syntyvät siitä, miten geeli levitetään ja miten se poistetaan, ja niistä kolme kannattaa tuntea." },
        { h3: "Kova hionta ja repiminen ohentavat kynttä" },
        { p: "Voimakas hionta joka käynnillä vie kynsilevystä kerroksia. Geelin repiminen itse irti on vielä pahempaa: se irrottaa samalla kerroksia omasta kynnestä. Kynsi ohenee, seuraava lakkaus pysyy huonommin, ja asiakas päättelee, että kynsiteknikon taidot ovat heikot. Geeli on poistettava oikein; katso [Geelin poisto: ymmärrä, niin kynsi säilyy](lesson:thao-gel-hieu-dung)." },
        { img: { src: img("khach-tu-cay-son-gel-bang-tay"), alt: "Lähikuva naisen käsistä, joista toisen käden kynsi kaivaa punaista geelilakkaa irti toisen käden kynnestä", caption: "Näin ei pidä tehdä: geelin repiminen irrottaa kerroksia omasta kynnestä." } },
        { h3: "Geeliallergia kehittyy hitaasti" },
        { p: "Geeliallergia ei tule heti. Se kehittyy monen kuukauden, joskus vuosien altistuksen jälkeen. Aluksi kynsien ympärillä on kutinaa, punoittavaa ihoa ja pieniä rakkuloita, ja joskus kynsi irtoaa kynsipedistä. Kerran syntynyt allergia on yleensä elinikäinen, ja jotkut kynsiteknikot ovat joutuneet jättämään alan, koska eivät voi enää koskea geeliin. Ihotautilääkärit varoittavat myös, että allergia voi myöhemmin vaikeuttaa hammashoitoa tai tekonivelleikkausta, koska niissä käytetään saman aineryhmän materiaaleja." },
        { p: "Ehkäisyn sääntö on lyhyt: **kovettumaton geeli ei koske ihoon**." },
        {
          ul: [
            "Käytä nitriilikäsineitä ja vaihda ne, kun niihin tulee geeliä.",
            "Pyyhi siveltimien varret ja pullonsuut puhtaiksi.",
            "Älä koskaan pyyhi ylimääräistä geeliä sormella.",
            "Jos geeliä joutuu asiakkaan iholle, poista se ennen kovetusta.",
            "Koveta aina täysi aika.",
          ],
        },
        { img: { src: img("gel-tran-ra-da-quanh-mong"), alt: "Lähikuva juuri lakatusta, vielä märästä punaisesta geelikynnestä, jonka geeli on valunut tyven ja molempien sivujen iholle", caption: "Vältettävä virhe: geeliä iholla. Poista se ennen kuin käsi menee lamppuun." } },
        { note: "Jos sinulle tai asiakkaalle tulee kutinaa, punoitusta tai rakkuloita kynsien ympärille, lopeta geelin käsittely ja hakeudu ihotautilääkärille. Oppitunti [Allergiat ja kemikaalit](lesson:di-ung-hoa-chat) kertoo oireista ja ehkäisystä tarkemmin.", kind: "warn", title: "Jos huomaat allergian merkkejä" },
        { h3: "TPO ja geelin alkuperä" },
        { p: "Euroopan unionissa fotoinitiaattori TPO on ollut kielletty kynsituotteissa 1.9.2025 alkaen. Salongit eivät saa jatkaa sen käyttöä, eivät edes aiemmin ostetun varaston, joten tarkista jokaisen geelipullosi ainesosat. Osta geelit eurooppalaisilta toimittajilta, joiden tuotteissa on selkeä etiketti ja ainesosaluettelo. Halvoissa harmaatuontituotteissa riskin kannat sinä ja asiakkaasi." },
      ],
    },
    {
      id: "asiakastyossa",
      title: "Neljä tapaa geelilakkausasiakkaiden kanssa",
      blocks: [
        {
          ol: [
            "**Katso ja kysy ennen aloittamista.** Värjäytynyt, paksuuntunut tai mureneva kynsi tai punoittava ja turvonnut iho: ei hoitoa, vaan neuvo käydä lääkärissä. Kun käännytät tänään yhden asiakkaan, suojelet koko salongin mainetta. Katso [Milloin asiakasta ei hoideta](lesson:khi-nao-khong-lam).",
            "**Kerro rehellisesti kestävyydestä.** Geelilakkaus näyttää hyvältä kahdesta kolmeen viikkoa, ja sen jälkeen se poistetaan ja tehdään uudelleen.",
            "**Neuvo, ettei geeliä revitä irti.** Kerro, että repiminen vie kerroksia omasta kynnestä ja seuraava lakkaus pysyy huonommin.",
            "**Kun asiakas palaa irtoamisen takia, älä syytä häntä heti.** Katso, mistä geeli irtosi, ja korjaa se vaihe.",
          ],
        },
        { p: "Neuvoja on helpompi noudattaa, kun salongissa on vakiintuneet tavat. VaraaAissa [lisäät geelilakkauspalvelun](lesson:dich-vu) niin pitkällä kestolla, että esikäsittelylle jää aikaa, ja kirjaat [asiakasrekisteriin](lesson:khach-hang), mitä kunkin asiakkaan kynsistä kannattaa muistaa, jottei seuraavalla käynnillä tarvitse aloittaa alusta." },
      ],
    },
  ],
  faq: [
    {
      q: "Mikä on geelilakka ja miten se eroaa tavallisesta kynsilakasta?",
      a: "Geelilakka on kynsilakka, jossa on fotoinitiaattoria. Se ei kuivu ilmassa, vaan kovettuu vasta merkin edellyttämässä lampussa täyden ajan. Geeli tarttuu kynsilevyn pintaan eikä imeydy kynteen, ja oikein tehtynä se näyttää hyvältä kahdesta kolmeen viikkoa.",
    },
    {
      q: "Kuinka monta viikkoa geelilakka kestää?",
      a: "Oikein tehty geelilakkaus näyttää hyvältä 2–3 viikkoa. Sen jälkeen kynsi on kasvanut ja rasituskohta siirtynyt, joten geeli katkeaa ja irtoaa helpommin, ja on aika poistaa ja tehdä se uudelleen. Jos geeli irtoaa jo muutamassa päivässä, syy on yleensä esikäsittelyssä tai vajaassa kovetuksessa.",
    },
    {
      q: "Miksi geelilakka irtoaa kynsinauhan vierestä, kärjestä tai kokonaisina levyinä?",
      a: "Irtoaminen kynsinauhan vierestä tarkoittaa yleensä, että kynsilevylle jäi ohut ihokalvo. Irtoaminen kärjestä tarkoittaa yleensä, että vapaata reunaa ei suljettu tai kynsiä käytettiin vääntämiseen tai avaamiseen. Kokonaisina levyinä irtoaminen johtuu yleensä rasvasta, kosteudesta tai vajaasti kovettuneesta geelistä.",
    },
    {
      q: "Onko geelilakka haitallista kynsille?",
      a: "Riskit liittyvät lähinnä siihen, miten geeli levitetään ja poistetaan. Kova hionta ohentaa kynttä, repiminen irrottaa kerroksia omasta kynnestä, ja kovettumattoman geelin toistuva joutuminen iholle voi johtaa allergiaan. Jos kynsien ympärille tulee kutinaa, punoitusta tai rakkuloita, lopeta geelin käyttö ja hakeudu ihotautilääkärille.",
    },
    {
      q: "Miksi geelilakka polttaa lampussa?",
      a: "Geeli vapauttaa lämpöä kovettuessaan. Mitä paksumpi kerros, sitä kuumempi tunne, ja ohueksi hiottu kynsi tuntee sen herkemmin. Kun polttaa, ota käsi pois muutamaksi sekunniksi, laita se takaisin ja levitä seuraavalla kerralla ohuemmat kerrokset.",
    },
    {
      q: "Onko geelilakan tahmea pintakerros kovettumatonta?",
      a: "Se ei ole viallista geeliä. Tahmea kerros on hyvin ohut geelikalvo, joka ei kovetu, koska se on kosketuksissa ilmaan. Se on kuitenkin kovettumatonta geeliä, joten se pyyhitään pois puhdistusaineella eikä sen anneta koskea ihoon.",
    },
  ],
  related: ["son-gel", "thao-gel-hieu-dung", "thao-gel", "builder-gel-hieu-dung"],
};

export default article;
