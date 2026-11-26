import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/thao-gel-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "ohuet-kynnet-geelin-poiston-jalkeen",
  lesson: "thao-gel-hieu-dung",
  category: "nail",
  title: "Ohuet kynnet geelin poiston jälkeen: miksi kynsi vaurioituu poistossa ja milloin se tarvitsee tauon",
  metaTitle: "Ohuet kynnet geelin poiston jälkeen: miksi ja mitä tehdä",
  metaDescription:
    "Ohuet kynnet geelin poiston jälkeen: miksi kynsi vaurioituu poistossa, liukeneva ja kova geeli, mitä asetoni tekee iholle ja kynnelle ja milloin pidetään taukoa.",
  keyword: "ohuet kynnet geelin poiston jälkeen",
  keywords: [
    "vaurioittaako geelin poisto kynsiä",
    "geelilakan repiminen irti",
    "kauanko kynnen kasvaminen kestää",
    "liukeneva geeli ja kova geeli",
    "kuivattaako asetoni ihoa",
    "tauko geelilakasta",
    "geelin poisto kynsiporalla",
  ],
  excerpt: "Suurin osa kynsivaurioista syntyy poistossa, ei lakatessa. Syy on repiminen ja raaputtaminen. Miksi näin käy ja miten geeli poistetaan niin, että kynsi pysyy terveenä.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("u-acetone-thao-gel-quan-giay-bac-nam-ngon"),
    alt: "Asiakkaan käsi lepää käsityynyllä, ja kaikki viisi sormenpäätä on kääritty tiiviisti folioon geelin liotusta varten, vieressä pieni tiimalasi",
  },
  takeaways: [
    "Suurin osa kynsivaurioista syntyy **poistossa**, ei lakkauksessa. Syy on repiminen ja raaputtaminen, ei itse geeli.",
    "Ohentunut kynsi ei paksune uudelleen. Sormenkynsi kasvaa noin 3 mm kuukaudessa, joten kokonaan uusi kynsi vie noin 4–6 kuukautta.",
    "Tunnista tuote ennen aloittamista: **liukeneva geeli** pehmenee asetonissa, **kova geeli** ei liukene, vaan se viilataan.",
    "Geelin on turvottava, halkeiltava ja irrottava itsestään. Jos se pitää yhä, kääri uudelleen ja liota lisää, älä raaputa.",
    "Asetoni on erittäin helposti syttyvää, myös sen höyry: tuuleta, pysy kaukana avotulesta ja lämmönlähteistä ja sulje pullo heti käytön jälkeen.",
  ],
  intro: [
    "Ohuet kynnet geelin poiston jälkeen ovat tuttu näky jokaiselle kynsiteknikolle. Asiakas istuu alas, ojentaa kätensä ja sanoo, että kynnet ovat olleet viime aikoina niin heikot, sen täytyy johtua geelistä. Kun kysyt lisää, selviää, että viime kerralla hän huomasi kotona geelin kulman irtoavan ja repi samalla koko geelin pois, tai kiireinen tekijä raaputti sen työntimellä irti. Useimmiten kynttä ei vahingoita geeli vaan väärä poistotapa.",
    "Artikkeli perustuu VaraaAi Academyn Kynnet-kurssin oppituntiin ”Geelin poisto: ymmärrä, niin kynsi säilyy”, joka on geelin poiston teoriaosa. Ymmärrät, mitä kynsilevylle tapahtuu, kun geeli revitään, miksi päällysgeeli on rikottava, mitä asetoni tekee iholle ja kynnelle ja milloin asiakasta kannattaa neuvoa pitämään taukoa. Käytännön työvaiheet ovat artikkelissa [Geelilakan poisto vaihe vaiheelta](lesson:thao-gel).",
  ],
  sections: [
    {
      id: "miksi-kynsi-vaurioituu",
      title: "Miksi kynnet ohenevat ja heikkenevät geelin poistossa",
      blocks: [
        { p: "Kynsilevy on keratiinia hyvin monena ohuena kerroksena päällekkäin, kuin kirjan sivut. Kovettunut geeli tarttuu todella lujasti päällimmäiseen kerrokseen, usein lujemmin kuin kynnen kerrokset pysyvät kiinni toisissaan." },
        { p: "Siksi revitty geeli ei irtoa kynnestä siististi. Se vie mukanaan monta kerrosta omaa kynttä, ja kynteen jää valkoisia, karheita laikkuja. Kynsi on nyt ohut ja heikko. Metallisella työntimellä voimalla raaputtaminen tekee saman vahingon toista tietä." },
        { img: { src: img("mong-mong-san-trang-sau-khi-cao-gel"), alt: "Lähikuva kynnestä, josta geeli on raaputettu pois: pinnassa on karheita valkoisia laikkuja ja muutama punainen geelinpala jäljellä", caption: "Voimalla poistamisen seuraus: valkoinen, karhea pinta, josta kynnen ylimmät kerrokset ovat lähteneet." } },
        { img: { src: img("tu-lot-son-gel-o-nha"), alt: "Lähikuva naisen käsistä, joista toisen käden kynsi nostaa ja repii punaista geelilakkaa irti toisen käden kynnestä", caption: "Näin ei pidä tehdä: irronnut kulma houkuttelee repimään loput pois." } },
        { note: "Valmiiksi irronnut kulma ei ole lupa kaivaa loput irti. Muu geeli on yhä tiukasti kiinni omassa kynnessä.", kind: "warn", title: "Irronnut kulma ei tarkoita, että geeli on irti" },
      ],
    },
    {
      id: "kauanko-kynsi-kasvaa",
      title: "Paksuuntuuko ohut kynsi uudelleen, ja kauanko kasvaminen kestää",
      blocks: [
        { p: "Ohentunut osa kynnestä ei voi paksuuntua uudelleen. Kynsilevy on kuollutta kudosta, eikä se parane niin kuin iho. Ainoa keino on odottaa, että uusi kynsi kasvaa esiin ja korvaa sen." },
        { p: "Sormenkynnet kasvavat hitaasti, vain noin 3 mm kuukaudessa. Kokonaan uuden kynnen saamiseen menee siis neljästä kuuteen kuukautta. Minuutti nopeaa repimistä, ja asiakas maksaa siitä puoli vuotta." },
        { p: "Sama luku on rehellinen vastaus, kun asiakas kysyy, milloin kynnet ovat taas vahvat. Öljy estää kynttä ja ihoa kuivumasta, mutta se ei korvaa menetettyä kynttä." },
      ],
    },
    {
      id: "liukeneva-ja-kova-geeli",
      title: "Liukeneva geeli ja kova geeli: miksi ero ratkaisee poistossa",
      blocks: [
        { p: "Jotta geelin voi poistaa oikein, sinun on ensin tiedettävä, mitä kynnellä on. Ryhmiä on kaksi, ja ne poistetaan aivan eri tavoin." },
        {
          table: {
            head: ["Ryhmä", "Mitä siihen kuuluu", "Miten se poistetaan"],
            rows: [
              ["Liukeneva geeli (soak off)", "Useimmat geelilakat ja jotkin pehmeät rakennegeelit", "Liotetaan asetonissa, kunnes geeli pehmenee, ja työnnetään kevyesti"],
              ["Kova geeli", "Tuotteet, joita asetoni ei hajota, liotettiin niitä kuinka kauan tahansa", "Viilataan ohueksi, ja kynnelle jätetään ohut pohjakerros"],
            ],
          },
        },
        { p: "Jos asiakas tulee toisesta salongista etkä tiedä, mitä kynsillä on, kysy häneltä, kokeile ensin yhteen kynteen ja lue aina valmistajan poisto-ohje." },
        { h3: "Päällysgeeli on lakkauksen sadetakki" },
        { p: "Päällysgeeli on tehty kestämään kemikaaleja ja naarmuja. Kun se on ehjä, asetoni ei pääse sisään; puolen tunnin liotuksen jälkeenkin geeli on koskematon, kynsiteknikko hermostuu ja tarttuu työntimeen. Siksi viilaa ennen liotusta kevyesti 180-karkeuden viilalla, kunnes kaikki kiilto on poissa. Viilaa vain päällysgeeli: lopeta heti, kun pöly muuttuu lakan väriseksi, äläkä viilaa omaan kynteen." },
        { img: { src: img("lop-top-gel-da-dua-mat-do-bong"), alt: "Lähikuva kevyesti viilatusta punaisesta geelikynnestä, jonka pinta on tasaisen matta ilman kiiltoa, sormenpää mustan käsineen varassa", caption: "Päällysgeeli on rikottu: tasaisen matta pinta, johon asetoni pääsee imeytymään." } },
        { h3: "Anna kemikaalin tehdä työ, älä käsiesi" },
        { p: "Asetoniin kastettu vanulappu asetetaan tarkalleen kynnen päälle ja kääritään tiiviisti folioon tai pidetään paikallaan klipsillä. Liotus kestää yleensä 10–15 minuuttia, mutta jokainen merkki on erilainen, joten noudata tuotteen ohjetta. Kun avaat käärön, geelin pitäisi turvota ja haljeta itsestään, ja kevyt työntö puutikulla irrottaa sen. Jos geeli on yhä kiinni, älä raaputa. Kääri uudelleen ja liota muutama minuutti lisää. Viisi minuuttia lisää kärsivällisyyttä pelastaa asiakkaan kynnen." },
        { h3: "Geelin poisto kynsiporalla" },
        { p: "Kynsipora kuuluu vain kunnollisen koulutuksen saaneelle tekijälle. Epävarmoissa käsissä se voi hioa omaan kynteen sekunneissa: asiakas tuntee polttavaa kipua, ja kynteen jää uria ja renkaita. Oikein työskentelevät noudattavat yhtä sääntöä: kaikkea ei poisteta, vaan kynnelle jätetään aina hyvin ohut pohjakerros. Se suojaa omaa kynttä ja kasvaa sen mukana pois. Jos et ole saanut koulutusta poran käyttöön, viilaa käsin. Se on hitaampaa, mutta turvallista." },
        { img: { src: img("thao-gel-bang-may-mai"), alt: "Käsineinen käsi pitää kynsiporaa, jonka lieriömäinen terä koskettaa asiakkaan punaisen geelikynnen pintaa", caption: "Kynsipora ohentaa geeliä hyvin nopeasti, siksi se on vain koulutetuille kynsiteknikoille." } },
      ],
    },
    {
      id: "asetoni",
      title: "Mitä asetoni tekee iholle ja kynnelle, ja miksi se pidetään kaukana tulesta",
      blocks: [
        { p: "Asetoni poistaa geelin hyvin, mutta se vie myös rasvaa ja kosteutta ihosta ja kynsistä. Siksi kynnet näyttävät poiston jälkeen valkoisilta ja kuivilta. Se on tilapäistä kuivumista eikä vaurio, ja öljy auttaa." },
        { img: { src: img("mong-that-kho-trang-sau-khi-thao-gel"), alt: "Lähikuva lakattomasta omasta kynnestä, jonka pinta on matta ja hieman vaalea, sormenpää mustaan käsineeseen puetun käden varassa", caption: "Juuri paljastunut kynsi on usein hieman valkoinen ja kuiva tilapäisen kuivumisen vuoksi." } },
        { p: "Asetonin vaikutusta iholle voi vähentää kahdella tavalla:" },
        {
          ul: [
            "Levitä öljyä tai voidetta kynnen ympäröivälle iholle ennen liotusta, mutta ei kynsilevylle.",
            "Käytä vain pientä, juuri kynnen kokoista vanulappua. Älä anna kemikaalin levitä koko sormelle.",
          ],
        },
        { h3: "Kaksi asiaa asetonista, jotka on osattava ulkoa" },
        {
          ol: [
            "**Asetoni on erittäin helposti syttyvää, ja sen höyrykin syttyy.** Poistopöydän ääressä ei ole kynttilöitä, ei avotulta eikä tupakointia. Asetonia ei koskaan lämmitetä liekillä tai mikroaaltouunissa.",
            "**Suljetussa huoneessa asetonin höyry aiheuttaa päänsärkyä ja huimausta.** Pidä ilmanvaihto päällä, sulje pullo heti käytön jälkeen ja laita käytetyt vanut kannelliseen roska-astiaan.",
          ],
        },
        { img: { src: img("chai-acetone-va-nen-dang-chay-tren-ban"), alt: "Kivipöydällä lasinen pumppupullo kirkasta nestettä, vanulappuja ja foliota, ja aivan vieressä palava kynttilä", caption: "Näky, jolle ei ole sijaa poistopöydän ääressä: palava kynttilä asetonipullon vieressä." } },
      ],
    },
    {
      id: "poly-ja-kasineet",
      title: "Viilauspöly ja käsineet: osa, joka suojaa sinua",
      blocks: [
        { p: "Kun geeliä viilataan tai porataan, ilmaan nousee pölyä. Jos geeli ei ollut kovettunut kokonaan, pölyssä on yhä kovettumatonta ainetta, joka aiheuttaa allergiaa. Tällainen allergia kehittyy hitaasti, mutta kerran syntyneenä se on yleensä elinikäinen." },
        {
          ul: [
            "Käytä käsineitä geelin poistossa.",
            "Käytä kohdepoistoa, jos sellainen on.",
            "Älä harjaa pölyä pois paljain käsin äläkä puhalla sitä.",
            "Nitriilikäsineet hajoavat asetonissa nopeasti, joten vaihda ne heti, kun ne kastuvat.",
          ],
        },
        { img: { src: img("dua-gel-tren-mieng-hut-bui-tai-ban"), alt: "Maskiin ja mustiin käsineisiin pukeutunut kynsiteknikko viilaa asiakkaan kynttä aivan pöytään upotetun pyöreän pölynpoistoaukon yläpuolella" } },
        { p: "Geeliallergian synnystä kerrotaan oppitunnilla [Allergiat ja kemikaalit](lesson:di-ung-hoa-chat) ja käsineiden valinnasta ja vaihdosta oppitunnilla [Käsihygienia, käsineet ja suojaimet](lesson:rua-tay-gang-tay)." },
      ],
    },
    {
      id: "milloin-tauko",
      title: "Milloin kynnet tarvitsevat tauon geelilakasta",
      blocks: [
        { p: "Työ ei ole valmis, kun geeli on poistettu. Tämä on ainoa hetki, jolloin näet asiakkaan oman kynnen, joten katso tarkasti." },
        {
          table: {
            head: ["Mitä näet", "Mitä teet"],
            rows: [
              ["Hieman valkoinen, kuiva kynsi, joka ei ole arka", "Tilapäistä kuivumista. Öljyä; terveen kynnen voi lakata uudelleen"],
              ["Ohut, pehmeä kynsi, joka on arka painettaessa", "Neuvo pitämään taukoa geelistä jonkin aikaa ja käyttämään öljyä päivittäin"],
              ["Kynsilevy irtoaa kynsipedistä, vihreä tai keltainen värimuutos, paksuuntuminen tai mureneminen; kynsivalli turvonnut, punainen, kipeä tai märkivä", "Lopeta, älä lakkaa päälle peittääksesi, ja ohjaa lääkäriin"],
            ],
          },
        },
        { p: "Moni sanoo, että kynnet tarvitsevat taukoa ”hengittääkseen”. Kynnet eivät kuitenkaan hengitä, vaan saavat ravintonsa verestä alhaalta päin. Tauko tarvitaan, jotta vaurioitunut osa ehtii kasvaa kokonaan pois." },
        { img: { src: img("mong-doi-mau-tach-nen-sau-khi-thao-gel"), alt: "Lähikuva omasta kynnestä, jossa on kellastunut alue ja joka on hieman irti sivusta, sormenpää mustan käsineen varassa", caption: "Värimuuttunut, kynsipedistä irtoava kynsi: ei lakkaa peitoksi, vaan neuvo käymään lääkärissä." } },
        { p: "Kynsiteknikko ei ole lääkäri: emme tee diagnooseja emmekä hoida sairauksia. Kerro asiakkaalle lempeästi, mitä näet, ja neuvo käymään tarkastuksessa. Miten sen voi sanoa loukkaamatta, kerrotaan oppitunnilla [Milloin asiakasta ei hoideta](lesson:khi-nao-khong-lam)." },
      ],
    },
    {
      id: "hygienia-ja-muistiinpanot",
      title: "Hygienia poiston jälkeen ja muistiinpanot seuraavaa käyntiä varten",
      blocks: [
        { p: "Folio, vanu, puutikut ja viilat: uusi setti jokaiselle asiakkaalle, ja käytön jälkeen roskiin. Metalliset työntimet pestään, desinfioidaan ja steriloidaan kuten kaikki muutkin metalliset välineet. Uudelleen käytettävät liotusklipsit puhdistetaan ja desinfioidaan jokaisen asiakkaan jälkeen. Kemikaaleja, ilmanvaihtoa ja jätteitä koskevat määräykset vaihtelevat maittain ja kunnittain, joten kysy oman kuntasi terveydensuojeluviranomaiselta." },
        { p: "Asiakkaan kynsillä ollut geelityyppi ja kynsien kunto poiston jälkeen kannattaa kirjata. VaraaAissa merkitset ne [asiakasrekisteriin](lesson:khach-hang), jottei seuraavalla kerralla tarvitse kokeilla alusta, ja [lisäät geelin poiston omaksi palvelukseen](lesson:dich-vu) omalla kestollaan, jottei kenenkään tarvitse tehdä sitä kiireessä." },
        { note: "Hyvä kynsiteknikko on se, jonka asiakkailla on monen geelivuoden jälkeenkin yhtä paksut ja terveet kynnet kuin ensimmäisenä päivänä. Geelin poisto ei vaadi vahvoja käsiä. Se vaatii ymmärrystä ja kärsivällisyyttä.", kind: "tip", title: "Ammattitaidon mittari" },
      ],
    },
  ],
  faq: [
    {
      q: "Vaurioittaako geelin poisto kynsiä?",
      a: "Oikein tehtynä poisto ei ohenna omaa kynttä. Suurin osa vaurioista syntyy, kun geeli revitään tai raaputetaan irti, koska kovettunut geeli vie mukanaan kynsilevyn ylimpiä kerroksia. Oikea poisto tarkoittaa, että päällysgeeli rikotaan, geeliä liotetaan asetonissa riittävän kauan ja sen annetaan irrota itsestään.",
    },
    {
      q: "Onko geelilakan repiminen itse irti haitallista?",
      a: "On. Kovettunut geeli tarttuu ylimpiin keratiinikerroksiin hyvin lujasti, joten geelin mukana irtoaa myös omaa kynttä. Kynteen jää valkoisia, karheita laikkuja, ja se ohenee ja heikkenee. Kun kulma irtoaa, paras ratkaisu on mennä salonkiin poistattamaan geeli oikein.",
    },
    {
      q: "Kauanko ohuiden kynsien palautuminen kestää geelin jälkeen?",
      a: "Ohentunut kynsi ei paksune uudelleen, vaan sen on kasvettava pois ja uuden kynnen on korvattava se. Sormenkynsi kasvaa noin 3 mm kuukaudessa, joten kokonaan uusi kynsi vie noin 4–6 kuukautta. Sillä välin kannattaa käyttää öljyä päivittäin.",
    },
    {
      q: "Miksi geeli ei irtoa asetoniliotuksen jälkeen?",
      a: "Yleisiä syitä on kaksi. Joko päällysgeeliä ei viilattu rikki, jolloin asetoni ei päässyt sisään, tai tuote on kovaa geeliä, joka ei liukene asetoniin ja on viilattava ohueksi. Kummassakaan tapauksessa geeliä ei pidä raaputtaa irti voimalla.",
    },
    {
      q: "Ovatko valkoiset, kuivat kynnet geelin poiston jälkeen vaurioituneet?",
      a: "Yleensä eivät. Asetoni vie rasvaa ja kosteutta ihosta ja kynsistä, joten juuri paljastunut kynsi näyttää valkoiselta ja kuivalta tilapäisen kuivumisen vuoksi. Öljy auttaa. Ohut, pehmeä ja painettaessa arka kynsi on merkki siitä, että tauko on tarpeen.",
    },
    {
      q: "Tarvitsevatko kynnet taukoa geelistä hengittääkseen?",
      a: "Kynnet eivät hengitä, vaan saavat ravintonsa verestä alhaalta päin. Terveen kynnen voi lakata uudelleen heti poiston jälkeen. Ohut tai arka kynsi tarvitsee jonkin aikaa taukoa geelistä, jotta vaurioitunut osa ehtii kasvaa pois.",
    },
  ],
  related: ["thao-gel", "gel-hieu-dung", "son-gel", "builder-gel-hieu-dung"],
};

export default article;
