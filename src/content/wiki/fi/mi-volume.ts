import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/mi-volume/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "volyymiripsien-tekeminen",
  lesson: "mi-volume",
  category: "lash",
  title: "Volyymiripsien tekeminen: 10 vaihetta viuhkan tekoon käsin ja kiinnitykseen omaan ripseen",
  metaTitle: "Volyymiripsien tekeminen: viuhkat käsin 10 vaiheessa",
  metaDescription:
    "Volyymiripset käsin tehdyillä viuhkoilla: ripsien nosto nauhalta, viuhkan avaus pinseteillä, tarkistus, vain kanta liimaan ja kiinnitys 0,5–1 mm luomesta.",
  keyword: "volyymiripsien tekeminen",
  keywords: [
    "volyymiviuhkan tekeminen",
    "käsin tehdyt volyymiviuhkat",
    "volyymiripset vaihe vaiheelta",
    "volyymiripset aloittelijalle",
    "paljonko liimaa volyymiviuhkaan",
    "volyymipinsetit",
    "volyymiripsien opettelu",
  ],
  excerpt: "Volyymiripsien kymmenen työvaihetta käsin tehdyillä viuhkoilla: nosto, avaus, tarkistus, liima, kiinnitys ja tarttumien tarkistus sekä viuhkat, jotka kuuluvat roskiin.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-noi-mi-volume-cho-khach-trong-studio"),
    alt: "Kermanväriseen paitaan pukeutunut ripsistylisti kumartuu peiton alla hoitosängyllä makaavan asiakkaan ylle, ja vieressä on kultareunainen pikkupöytä työtarjottimineen",
  },
  takeaways: [
    "Kolme asiaa pätee koko käynnin: asiakkaan silmät ovat kiinni, **jokainen viuhka kiinnitetään täsmälleen yhteen omaan ripseen** eikä liima koskaan koske ihoon.",
    "Viuhkan teko: ota muutama ripsi kevyesti kärkien läheltä, liu'uta pinsetit kohti kantaa niin, että ripset levittyvät, ja **sulje pinsetit kannasta**, jolloin kannasta tulee pieni ja siisti.",
    "Tarkista jokainen viuhka ennen liimaa. Vino viuhka, leveä kanta, pareittain tarttuneet ripset tai iso liimapaakku: heitä pois ja tee uusi.",
    "Kosketa vain **viuhkan kannalla liimapisaran reunaa**; kanta kietoutuu oman ripsen ympärille noin 0,5–1 mm:n päässä luomesta.",
    "Vuorottele alueita, ja tarkista jokaisen alueen jälkeen tarttumat pinseteillä ja katsomalla ripsiä useasta kulmasta.",
  ],
  intro: [
    "Volyymiripsien tekeminen eroaa klassisista täsmälleen yhdessä vaiheessa: ennen kiinnitystä ripsistylisti tekee viuhkan itse. Muutama hyvin ohut ripsi otetaan nauhalta, avataan yhdellä pinsettien liu'utuksella ja suljetaan kannasta, ja vasta sitten tulevat liima ja oma ripsi. Kaikki muu eristyksestä tarttumien tarkistukseen on sinulle jo tuttua klassisista ripsistä.",
    "Artikkeli perustuu VaraaAi Academyn Ripset-kurssin oppituntiin ”Volyymiripset: viuhkan teko vaihe vaiheelta”. Katso oppitunnin video alta nähdäksesi pinsettien liikkeen, lue sitten vaiheet ja harjoittele viuhkoja ripsialustalla, kunnes ne onnistuvat tasaisesti, ennen kuin teet volyymiripsiä asiakkaille.",
  ],
  sections: [
    {
      id: "ennen-aloittamista",
      title: "Ennen volyymiripsiä: kolme asiaa, jotka pätevät koko ajan",
      blocks: [
        { p: "Jokainen volyymikäsittely perustuu kolmeen asiaan, jotka eivät muutu:" },
        {
          ul: [
            "Asiakkaan silmät ovat kiinni alusta loppuun.",
            "Jokainen viuhka kiinnitetään täsmälleen yhteen omaan ripseen.",
            "Liima ei koskaan koske ihoon.",
          ],
        },
        { p: "Valmistelu on täysin sama kuin artikkelissa [klassisten ripsienpidennysten tekeminen](lesson:mi-classic): konsultaatio ja allergiakysymykset, mukava asento, puhdistus, silmänalustyynyt ja harjaus. Jos nämä liikkeet eivät vielä suju itsestään, palaa klassisiin ripsiin ennen volyymin harjoittelua." },
        { p: "Miksi volyymiripsien on oltava niin ohuita ja kenelle tehdään 2D tai 5D, kerrotaan teoria-artikkelissa [Mitä ovat volyymiripset](lesson:mi-volume-hieu-dung). Tämä artikkeli keskittyy käsiin." },
      ],
    },
    {
      id: "viuhkat",
      title: "Käsin tehdyt volyymiviuhkat: mitkä kelpaavat ja mitkä eivät",
      blocks: [
        { p: "Se, kuinka leveäksi viuhka avautuu, muuttaa koko ripsien tunnelmaa. Kapea viuhka antaa terävämmän ilmeen, leveä tuuheamman ja pehmeämmän. Raja tulee viereisestä ripsestä: liian leveäksi avattu viuhka koskee siihen." },
        {
          table: {
            head: ["Mitä näet", "Miksi se on ongelma", "Mitä teet"],
            rows: [
              ["Vino viuhka, leveä kanta, pareittain tarttuneet ripset", "Viuhka on raskas ja tarttuu helposti viereiseen omaan ripseen", "Heitä pois ja tee uusi ennen liimaa"],
              ["Kannassa iso liimapaakku", "Liima nousee ripsien väliin ja liimaa viuhkan möykyksi", "Heitä viuhka pois, älä sääli sitä"],
              ["Kiinnitetty viuhka on vinossa, kääntynyt tai kiertynyt", "Se ei kietoudu oman ripsen ympärille", "Poista heti ennen kuin liima tarttuu ja tee uusi; älä yritä korjata, kun liima on kuivunut"],
              ["Kiven liimapisara on paksuuntunut", "Vanha liima tarttuu huonosti", "Vaihda pisara usein liimavalmistajan ohjeen mukaan"],
            ],
          },
        },
        { note: "Uuden viuhkan tekeminen vie muutaman sekunnin. Huono viuhka asiakkaan silmässä maksaa paljon enemmän. Harjoittele viuhkoja alustalla joka päivä, kunnes ne ovat tasaisia, ja mieti nopeutta vasta sitten.", kind: "tip", title: "Harjoittele ensin alustalla" },
      ],
    },
    {
      id: "etaisyys-ja-pituus",
      title: "Etäisyys luomesta ja pituus alue kerrallaan",
      blocks: [
        { p: "Viuhkan kanta on noin **0,5–1 mm:n** päässä luomen ihosta eikä koskaan koske siihen. Iholla oleva liima hiertää, kutisee, joskus ärsyttää ja vetää ripseä sen kasvaessa. Liian kauas kiinnitettynä viuhka on löysä ja irtoaa aikaisin." },
        { p: "Pituudessa sisänurkka on lyhin, ja ripset pitenevät vähitellen kohti ulkonurkkaa. Myös viuhkan ripsimäärä vaihtelee alueittain:" },
        {
          table: {
            head: ["Alue", "Omat ripset siellä", "Sopiva viuhka"],
            rows: [
              ["Sisänurkka", "Lyhyet ja heikot", "Vähemmän ripsiä, lyhyt ja kevyt"],
              ["Keskiosa ja ulkonurkka", "Yleensä vahvemmat", "Voi olla enemmän ripsiä, aina kunkin ripsen kantokyvyn mukaan"],
            ],
          },
        },
        { p: "Tyylin valinnasta eri silmänmuodoille kerrotaan oppitunnilla [ripsikartta](lesson:mi-mapping-hieu-dung)." },
      ],
    },
    {
      id: "tarttumien-tarkistus",
      title: "Tarttumien tarkistus volyymiripsissä",
      blocks: [
        { p: "Viuhka on leveämpi kuin klassinen pidennys, joten yksikin lähelle jäänyt viereinen oma ripsi riittää siihen, että liima tarttuu siihen. Ennaltaehkäisy alkaa eristyksestä: eristä huolellisesti, jotta oma ripsi on täysin erillään." },
        { p: "Liu'uta suoria pinsettejä jokaisen alueen jälkeen kevyesti ripsien läpi tyvestä kärkeen. Jokaisen viuhkan pitää olla omassa ripsessään erillään. Jos löydät tarttuman, erota se heti hyvin varovasti. Katso ripsiä myös ylhäältä ja sivulta, koska osa tarttumista näkyy vain vinosta kulmasta." },
      ],
    },
    {
      id: "jalkihoito-ja-siivous",
      title: "Jälkihoito ja siivous volyymiripsien jälkeen",
      blocks: [
        { p: "Volyymiasiakkaan jälkihoito-ohjeet ovat samat kuin klassisissa:" },
        {
          ul: [
            "Pidä ripset kuivina niin kauan kuin liimavalmistaja neuvoo.",
            "Ei öljypohjaisia tuotteita ripsien tyveen.",
            "Harjaa ripset joka päivä.",
            "Älä hiero silmiä.",
            "Huolto 2–3 viikon kuluttua.",
          ],
        },
        { p: "Asiakkaan lähdettyä käytetyt ripsiharjat, vanutikut ja tyynyt laitetaan kannelliseen roska-astiaan. Pinsetit puhdistetaan ja desinfioidaan jokaisen asiakkaan jälkeen oppitunnin [Välineet jokaisen asiakkaan jälkeen](lesson:ve-sinh-dung-cu) mukaisesti." },
        { img: { src: img("lam-sach-nhip-noi-mi-sau-moi-khach"), alt: "Mustakäsineinen käsi pudottaa kahdet pinsetit lasiseen liuosastiaan kivitasolla, ja vieressä on kannellinen roska-astia käytettyine ripsiharjoineen", caption: "Jokaisen asiakkaan jälkeen kertakäyttötarvikkeet kannelliseen astiaan ja pinsetit puhdistukseen ja desinfiointiin." } },
      ],
    },
    {
      id: "ajanvaraus",
      title: "Ensimmäiset volyymiripset vievät aikaa: varaa sen mukaan",
      blocks: [
        { p: "Alussa volyymiripset vievät todella paljon aikaa, paljon enemmän kuin klassiset. Se on normaalia. Jokaisen kerran jälkeen kätesi toimivat tasaisemmin ja nopeammin." },
        { p: "Salongin kalenterin pitää näyttää tämä todellinen tahti. Aseta VaraaAissa volyymiripsien [palvelulle](lesson:dich-vu) kesto kunkin tekijän todellisen nopeuden mukaan, jottei kalenteri veny, ja varaa huoltoaika [kalenteriin](lesson:lich-hen), kun asiakas on vielä salongissa. Kullakin alueella käytetyt ripsimäärät ja pituudet voi kirjata [asiakasprofiiliin](lesson:khach-hang), jotta seuraavat ripset tehdään samoin." },
        { note: "Artikkelin etäisyydet, paksuudet ja viuhkojen ripsimäärät ovat yleisiä alan ohjeita; noudata aina ripsivalmistajan taulukkoa ja liimavalmistajan ohjeita kosteudesta, lämpötilasta ja kuivana pitämisen ajasta. Kauneuspalveluja ja -tuotteita koskevat säännöt vaihtelevat maittain. Artikkeli on koulutusmateriaalia, ei ammattipätevyys.", kind: "info", title: "Huomio" },
      ],
    },
  ],
  howTo: {
    title: "Volyymiripsien tekeminen käsin tehdyillä viuhkoilla vaihe vaiheelta",
    id: "volyymiripsien-vaiheet",
    after: "ennen-aloittamista",
    lead: "Kymmenen vaihetta oppitunnin videon järjestyksessä. Vaiheet kolmesta kuuteen ovat volyymin oma osuus: viuhkan teko ja liiman otto.",
    supplies: [
      "Volyymiripsialustat, hyvin ohuet ripset pituusjärjestyksessä",
      "Ripsiliima ja jadekivi pisaraa varten",
      "Suorat pinsetit eristykseen",
      "Pitkät, kulmikkaat volyymipinsetit viuhkan tekoon ja kiinnitykseen",
      "Silmänalustyynyt ja ripsien puhdistustarvikkeet kuten klassisissa",
      "Kertakäyttöiset ripsiharjat ja pienet vanutikut",
    ],
    steps: [
      {
        name: "Valmistele kuten klassisissa",
        text: "Konsultaatio ja allergiakysymykset, mukava asento, puhdistus, silmänalustyynyt ja harjaus. Harjatessasi katso omia ripsiä tarkasti jokaisella alueella ja päätä, montako ripseä kuhunkin viuhkaan tulee: vahvat ripset kantavat enemmän, heikot vähemmän ja kevyempää.",
        image: { src: img("chai-mi-va-quan-sat-mi-that-tung-vung"), alt: "Mustakäsineinen käsi harjaa asiakkaan omia ripsiä kertakäyttöisellä ripsiharjalla, asiakkaan silmät kiinni ja silmän alla valkoinen tyyny" },
      },
      {
        name: "Järjestä työpiste",
        text: "Aseta esille volyymiripsialustat pituusjärjestyksessä, jadekivi ja tuore liimapisara, suorat pinsetit, volyymipinsetit sekä kertakäyttöiset ripsiharjat ja vanutikut. Sulje liimapullo heti liiman ottamisen jälkeen.",
        image: { src: img("dung-cu-noi-mi-volume-tren-khay"), alt: "Kultareunainen valkoinen kivitarjotin, jolla on pituusjärjestyksessä olevat volyymiripsinauhat, jadekivi liimapisaroineen, kahdet pinsetit, musta liimapullo ja kupillinen ripsiharjoja" },
      },
      {
        name: "Nosta muutama ripsi nauhalta",
        text: "Aseta volyymipinsettien kärjet muutaman ripsen yli nauhalla, lähelle ripsien kärkiä. Ota niin monta ripseä kuin viuhkaan haluat; harjoitellessa laske ne. Purista yhtä kevyesti kuin pitelisit lankaa, ja etene nauhan reunasta sisäänpäin, jotta muut ripset pysyvät siistissä järjestyksessä.",
        image: { src: img("lay-vai-soi-mi-volume-tren-dai-bang-nhip"), alt: "Mustakäsineinen käsi laskee volyymipinsetit vaaleanpunaisella alustalla olevalle ohuiden ripsien nauhalle ja tarttuu muutamaan ripseen kärkien läheltä" },
      },
      {
        name: "Avaa viuhka liu'uttamalla pinsettejä",
        text: "Pidä sama kevyt ote ja liu'uta pinsettejä hitaasti kohti ripsien kantaa, jolloin ripset levittyvät itsestään. Jotkut ripsistylistit pyörittävät tai kallistavat pinsettejä, ja kumpikin tapa käy. Sulje lopuksi pinsetit kannasta, jotta siitä tulee hyvin pieni ja siisti, ja nosta viuhka irti nauhalta. Älä avaa sitä liian leveäksi.",
        image: { src: img("truot-nhip-mo-fan-mi-volume"), alt: "Volyymipinsetit nostavat muutaman ohuen ripsen vaaleanpunaisen alustan nauhalta, ja ripset levittyvät viuhkaksi kannasta, josta pinsetit pitävät kiinni" },
      },
      {
        name: "Tarkista viuhka ennen liimaa",
        text: "Katso kolmea asiaa: onko kanta pieni ja suljettu, levittyvätkö ripset tasaisesti ja symmetrisesti, onko ripsejä oikea määrä. Vino viuhka, leveä kanta tai kaksi yhteen tarttunutta ripseä menee roskiin, ja teet uuden.",
      },
      {
        name: "Kosketa kannalla liimapisaran reunaa",
        text: "Vain viuhkan kanta koskettaa liimapisaran reunaa, hyvin kevyesti, ja nousee sitten pois. Älä kasta syvälle äläkä anna liiman nousta ripsien väliin. Ohut kerros, juuri sopivasti. Jos viuhkaan tarttuu iso liimapaakku, se heitetään pois ja tehdään uusi.",
        image: { src: img("cham-chan-fan-vao-giot-keo-noi-mi"), alt: "Volyymipinsetit pitävät tasaisesti levittynyttä viuhkaa, jonka kanta koskettaa kevyesti mustaa liimapisaraa käsineisessä kädessä olevalla jadekivellä" },
      },
      {
        name: "Eristä täsmälleen yksi oma ripsi",
        text: "Pidä suoria pinsettejä heikommassa kädessäsi ja eristä yksi oma ripsi kuten klassisissa. Eristä huolellisesti: viuhka on leveä, joten yksikin lähelle jäänyt viereinen ripsi tarttuu liimaan.",
      },
      {
        name: "Kiinnitä viuhka ripsen ympärille",
        text: "Aseta viuhkan kanta eristetylle omalle ripselle niin, että se kietoutuu sen ympärille kasvusuunnassa noin 0,5–1 mm:n päässä luomen ihosta. Paina kevyesti ripsen suuntaisesti, pidä hetki paikallaan, kunnes liima tarttuu, ja irrota sitten. Viuhkan pitää asettua tasaisesti, ei kääntyneenä eikä kiertyneenä; jos se on vinossa, poista se heti ennen kuin liima kovettuu.",
        image: { src: img("gan-fan-volume-len-mot-soi-mi-that"), alt: "Kaksi mustakäsineistä kättä ja kahdet pinsetit: suorat eristävät asiakkaan ripsiä ja volyymipinsetit laskevat viuhkan eristetylle omalle ripselle" },
      },
      {
        name: "Vuorottele alueita ja tarkista tarttumat",
        text: "Älä kiinnitä viuhkoja vierekkäisiin ripsiin peräkkäin. Kiinnitä yksi ulkonurkkaan, sitten keskelle, sitten sisänurkkaan ja palaa takaisin, jotta edellisen viuhkan liima ehtii kovettua. Liu'uta jokaisen alueen jälkeen suorat pinsetit tyvestä kärkeen ja erota tarttumat heti.",
      },
      {
        name: "Viimeistele, anna ohjeet ja siivoa",
        text: "Harjaa ripset uudelleen ja vertaa silmiä, jotta ne ovat samanlaiset. Irrota tyynyt hyvin varovasti asiakkaan silmien ollessa vielä kiinni ja anna hänen avata ne hitaasti; jos silmät kirvelevät tai vuotavat, anna hänen sulkea ne ja levätä hetki. Anna jälkihoito-ohjeet, varaa huolto 2–3 viikon päähän, heitä kertakäyttötarvikkeet pois ja desinfioi pinsetit.",
        image: { src: img("go-mieng-lot-sau-khi-noi-mi"), alt: "Mustakäsineinen sormenpää nostaa varovasti valkoisen tyynyn ulkoreunaa asiakkaan silmän alta, silmä yhä kiinni valmiiden ripsien kanssa" },
      },
    ],
  },
  faq: [
    {
      q: "Miten volyymiviuhka tehdään käsin?",
      a: "Aseta volyymipinsettien kärjet muutaman ripsen yli nauhalla kärkien läheltä ja purista hyvin kevyesti. Liu'uta pinsettejä hitaasti kohti kantaa, jolloin ripset levittyvät, sulje pinsetit kannasta pieneksi ja siistiksi ja nosta viuhka irti. Jotkut avaavat viuhkan pyörittämällä tai kallistamalla pinsettejä; mikä tahansa tapa käy, kunhan kanta sulkeutuu.",
    },
    {
      q: "Paljonko liimaa volyymiviuhkaan otetaan?",
      a: "Vain viuhkan kanta koskettaa liimapisaran reunaa ja nousee kevyesti pois, ilman syvää kastamista. Ripsien väliin noussut liima tekee viuhkasta raskaan, liimaa sen möykyksi ja aiheuttaa tarttumia. Viuhka, jossa on iso liimapaakku, heitetään pois ja tehdään uusi.",
    },
    {
      q: "Kuinka kauas luomesta volyymiviuhka kiinnitetään?",
      a: "Noin 0,5–1 mm:n päähän, eikä se koskaan koske ihoon. Iholla oleva liima hiertää, kutisee, joskus ärsyttää ja vetää ripseä sen kasvaessa. Liian kauas kiinnitettynä viuhka on löysä ja irtoaa aikaisin.",
    },
    {
      q: "Mitä tehdä, jos volyymiviuhka on vinossa?",
      a: "Poista se heti ennen kuin liima tarttuu ja tee uusi viuhka. Älä yritä suoristaa sitä, kun liima on kuivunut. Vinossa oleva tai kahden oman ripsen ympärille kietoutunut viuhka vetää ripsiä ja saa ne irtoamaan aikaisin.",
    },
    {
      q: "Kauanko volyymiripsien tekeminen kestää?",
      a: "Ensimmäiset volyymiripset vievät todella kauan, paljon kauemmin kuin klassiset, koska jokainen viuhka tehdään ja tarkistetaan ennen kiinnitystä. Nopeus kasvaa kerta kerralta, kun viuhkat onnistuvat tasaisesti. Salongin kannattaa asettaa palvelun kesto kunkin tekijän todellisen tahdin mukaan.",
    },
    {
      q: "Mistä aloittelijan kannattaa aloittaa volyymiripsien opettelu?",
      a: "Ensin klassisista ripsistä, koska volyymin valmistelu, eristys ja tarttumien tarkistus ovat täsmälleen samat. Harjoittele sitten viuhkoja ripsialustalla joka päivä, kunnes ne ovat tasaisia, ja mieti nopeutta ja asiakastöitä vasta sen jälkeen.",
    },
  ],
  related: ["mi-volume-hieu-dung", "mi-classic", "mi-hybrid", "mi-mega-wispy"],
};

export default article;
