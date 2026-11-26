import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/mi-volume-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "mita-ovat-volyymiripset",
  lesson: "mi-volume-hieu-dung",
  category: "lash",
  title: "Mitä ovat volyymiripset? 2D–6D-viuhkat, pidennysten paksuus ja mitä omat ripset kestävät",
  metaTitle: "Mitä ovat volyymiripset? 2D–6D-viuhkat ja kestävyys",
  metaDescription:
    "Volyymiripset ovat hyvin ohuista ripsistä tehty viuhka täsmälleen yhdessä omassa ripsessä. 2D–6D oman ripsen mukaan, hyvä viuhka, liiman määrä ja huoltoväli.",
  keyword: "volyymiripset",
  keywords: [
    "mitä 2D ja 3D ripset tarkoittavat",
    "vahingoittavatko volyymiripset omia ripsiä",
    "kauanko volyymiripset kestävät",
    "volyymiviuhka",
    "valmisviuhkat vai käsin tehdyt viuhkat",
    "montako D:tä volyymiripsiin",
    "volyymiripset vai klassiset ripset",
  ],
  excerpt: "Volyymiripset saavat tuuheutensa hyvin ohuista ripsistä tehdyistä viuhkoista, mutta jokainen viuhka on silti yhdessä omassa ripsessä. Artikkeli selittää 2D–6D:n, hyvän viuhkan, liiman määrän ja kestävyyden.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-voi-bo-mi-volume-day-mem-va-toi"),
    alt: "Lähikuvamuotokuva vaaleahiuksisesta asiakkaasta juuri tehtyine volyymiripsineen, ripsirivi tuuhea, tumma ja pehmeä ja pitenee kohti ulkonurkkaa",
  },
  takeaways: [
    "Volyymiripsissä **muutamasta hyvin ohuesta ripsestä tehty viuhka kiinnitetään täsmälleen yhteen omaan ripseen**. Viuhkat nimetään ripsien määrän mukaan: 2D, 3D aina 6D:hen asti.",
    "Lisää ripsiä, vähemmän paksuutta: oman ripsen kantokyky ei muutu, joten volyymipidennykset ovat paljon klassisia ohuempia.",
    "Valitse D-määrä ensin **omien ripsien vahvuuden** mukaan ja vasta sitten asiakkaan kuvan mukaan. Ohuille, lyhyille ja harvoille ripsille 2D–3D riittää.",
    "Hyvässä viuhkassa on pieni, suljettu kanta, tasaisesti levittyvät ripset ja symmetriset puolet. Liima koskee vain viuhkan kantaa.",
    "Omat ripset irtoavat silti kasvusyklinsä mukaan, joten asiakas tulee huoltoon noin **2–3 viikon** kuluttua.",
  ],
  intro: [
    "Volyymiripset eroavat klassisista yhdellä asialla: viuhkalla. Yhden pidennyksen sijaan ripsistylisti kiinnittää jokaiseen omaan ripseen pienen viuhkan, jossa muutama hyvin ohut ripsi avautuu yhteisestä kannasta. Ripsirivistä tulee selvästi tuuheampi, pehmeämpi ja ilmavampi. Volyymin vaikeus ei ole ripsien lisäämisessä, vaan yhdessä sanassa: kevyt.",
    "Artikkeli perustuu VaraaAi Academyn Ripset-kurssin oppituntiin ”Volyymiripset: ymmärrä ne, niin ripset ovat tuuheat mutta kevyet”. Ymmärrät, mitä 2D–6D tarkoittaa, valitset ripsimäärän kunkin asiakkaan omien ripsien mukaan, erotat hyvän viuhkan hylättävästä ja osaat selittää asiakkaalle, miksi hänen omat ripsensä eivät kestä niin tuuheaa kuin hän toivoo.",
  ],
  sections: [
    {
      id: "mita-volyymi-on",
      title: "Mitä volyymiripset ovat",
      blocks: [
        { p: "[Klassisissa ripsienpidennyksissä](lesson:mi-classic-hieu-dung) jokainen oma ripsi kantaa yhden pidennyksen. Volyymissa kiinnityskohta pysyy samana, ja vain kiinnitettävä asia muuttuu: **viuhka**, useita hyvin ohuita ripsiä, jotka on koottu yhteiseen kantaan ja jotka avautuvat kuin pieni viuhka." },
        { p: "Alalla viuhkat nimetään ripsien määrän mukaan. Kaksi ripseä on 2D, kolme on 3D ja niin edelleen aina 6D:hen. Vielä useammasta ripsestä tehtyjä viuhkoja kutsutaan yleensä mega volyymiksi, ja niistä on oma oppituntinsa: [Mega volyymi ja wispy](lesson:mi-mega-wispy-hieu-dung)." },
        { img: { src: img("bo-mi-volume-hoan-thien-nhin-gan"), alt: "Lähikuva suljetusta silmästä juuri tehtyine volyymiripsineen, ripsirivi tuuhea ja pehmeä, sisänurkassa lyhyt ja ulkonurkkaa kohti pitenevä, tyynyn päällä", caption: "Valmiit volyymiripset: tuuheat ja ilmavat, mutta jokainen viuhka on yhä omassa ripsessään." } },
        { note: "Oli viuhkassa kuinka monta ripseä tahansa, sen kanta kietoutuu täsmälleen yhteen omaan ripseen. Kahden tai kolmen oman ripsen ympärille kiinnitetty viuhka on tarttuma: eri tahtiin kasvavat ripset vetävät toisiaan, asiakas tuntee sen ja ripset irtoavat aikaisin.", kind: "warn", title: "Mikä ei koskaan muutu" },
      ],
    },
    {
      id: "miksi-ohuempia",
      title: "Miksi yksi oma ripsi jaksaa kantaa kokonaisen viuhkan",
      blocks: [
        { p: "Koska volyymipidennykset ovat paljon klassisia ohuempia. Ajattele omaa ripseä pienenä oksana: sen kantokyky pysyy samana. Kun ripsien määrä kasvaa, jokaisen on oltava ohuempi ja kevyempi. Muutamasta hyvin ohuesta ripsestä tehty viuhka voi painaa suunnilleen yhtä paljon kuin yksi paksu klassinen pidennys." },
        { img: { src: img("so-sanh-soi-mi-classic-va-fan-volume"), alt: "Vaaleanpunaisella alustalla vasemmalla paksu musta klassinen pidennys ja oikealla viidestä hyvin ohuesta ripsestä tehty volyymiviuhka yhteisellä kannalla", caption: "Vasemmalla yksi klassinen pidennys, oikealla viiden ripsen viuhka. Viuhkan ripset ovat selvästi ohuempia." } },
        { p: "Helppo muistisääntö: **lisää ripsiä, vähemmän paksuutta**. Kunkin viuhkatyypin tarkalle paksuudelle ei ole yhtä lukua, joten katso käyttämäsi ripsimerkin taulukkoa." },
      ],
    },
    {
      id: "montako-d",
      title: "Montako D:tä volyymiripsiin: katso ensin omat ripset",
      blocks: [
        { p: "D-määrä ei ole pelkästään asiakkaan toive. Ripsistylisti katsoo omia ripsiä silmän jokaisella alueella ennen kuin päättää." },
        {
          table: {
            head: ["Asiakkaan omat ripset", "Valittava viuhka"],
            rows: [
              ["Vahvat, pitkät ja paksut", "Kantavat viuhkoja, joissa on enemmän ripsiä"],
              ["Ohuet, lyhyet, harvat tai paljon nuoria ripsiä", "Vähemmän, ohuempia ja lyhyempiä ripsiä: 2D tai 3D riittää"],
              ["Silmän sisänurkka", "Kevyemmät viuhkat, koska omat ripset ovat siellä yleensä lyhyempiä ja heikompia"],
            ],
          },
        },
        { p: "Hyvin tavallinen tilanne: asiakas näyttää kuvaa todella tuuheista ja näyttävistä ripsistä ja haluaa juuri sellaiset, vaikka hänen omat ripsensä ovat ohuet ja harvat. Jos teet niin kuin hän pyytää, raskaat viuhkat painavat omat ripset alas, juuri joutuu rasitukselle ja ripsiä voi irrota aikaisin laikuittain. Muutaman kuukauden päästä oma ripsirivi on näkyvästi harvempi. Silloin asiakas ei syytä raskaita ripsiä. Hän syyttää salonkia." },
        { img: { src: img("loi-fan-volume-qua-nang-so-voi-mi-that"), alt: "Lähikuva suljetusta silmästä, jossa liian paksut ja pitkät viuhkat roikkuvat tyynyä vasten, menevät ristiin ja jättävät muutamia aukkoja", caption: "Esimerkkikuva virheestä: liian raskaat viuhkat ohuille ja harvoille omille ripsille. Ripset roikkuvat, sotkeutuvat ja rivissä on jo aukkoja." } },
        { note: "Kun asiakas tuo kuvan hyvin tuuheista ripsistä mutta hänen omat ripsensä ovat ohuet, näytä hänelle hänen omat ripsensä peilistä ja kerro, miksi teet tänään kevyemmin. Ymmärtävä asiakas luottaa ja palaa.", kind: "tip", title: "Käytä peiliä" },
      ],
    },
    {
      id: "hyva-viuhka",
      title: "Millainen on hyvä volyymiviuhka",
      blocks: [
        { p: "Ennen kuin viuhka koskee liimaan, ripsistylisti tarkistaa kolme asiaa:" },
        {
          ol: [
            "**Pieni, suljettu kanta**, lähes yhden ripsen kapea. Vain kapea kanta kietoutuu oman ripsen ympärille, pitää tukevasti ja pysyy irti viereisestä ripsestä.",
            "**Tasaisesti levittyvät ripset**, joiden väli on sama ja joista yksikään ei ole tarttunut toiseen.",
            "**Symmetrinen viuhka**, molemmat puolet samanlaiset ja avautuneet juuri sopivasti.",
          ],
        },
        { img: { src: img("fan-volume-dep-chan-nho-xoe-deu"), alt: "Kulmikkaat volyymipinsetit pitävät viiden ohuen ripsen viuhkaa, jonka kanta on pieni ja suljettu ja ripset levittyvät tasaisesti, jadekiven ja liimapisaran yllä", caption: "Hyvä viuhka: kanta sulkeutuu lähes yhdeksi ripseksi, ja ripset levittyvät tasaisesti molemmille puolille." } },
        { p: "Leveäkantainen, vinoon levittyvä tai yhteen tarttuneita ripsiä sisältävä viuhka on raskas, tarttuu helposti viereiseen omaan ripseen ja saa ripsirivin näyttämään sotkuiselta." },
        { img: { src: img("loi-fan-volume-chan-be-xoe-lech"), alt: "Volyymipinsetit pitävät epäonnistunutta viuhkaa: kanta on leveä, ripset levittyvät epätasaisesti toiselle puolelle ja kaksi ripseä on tarttunut yhteen", caption: "Esimerkkikuva hylättävästä viuhkasta: leveä kanta, vino levitys ja pareittain tarttuneet ripset." } },
        { h3: "Valmisviuhkat ja käsin tehdyt viuhkat" },
        { p: "Valmisviuhkoissa (promade) valmistaja on jo liittänyt kannan valmiiksi. Niiden käytössä ei ole mitään väärää, etenkään harjoitellessa tai kun asiakkaalla on kiire. Valitse viuhkat, joiden kanta on pieni ja siisti, ja katso silti jokainen viuhka tarkasti ennen kiinnitystä." },
        { img: { src: img("fan-volume-lam-san-promade-tren-vi"), alt: "Vaaleanpunainen alusta, jolla on riveittäin samanlaisia valmiita volyymiviuhkoja kannat samaan suuntaan, ja vieressä pinsetit", caption: "Valmisviuhkoja riveissä alustalla." } },
        { p: "Viuhkojen tekeminen käsin on varsinainen taito, koska valitset ripsimäärän, levityksen ja pituuden jokaiselle omalle ripselle sopivaksi. Ripsien ottaminen nauhalta, pinsettien liu'uttaminen viuhkan avaamiseksi ja kannan sulkeminen opetetaan artikkelissa [volyymiripsien tekeminen](lesson:mi-volume)." },
        { img: { src: img("tho-mi-soi-fan-volume-truoc-khi-gan"), alt: "Ripsistylisti, hiukset korkealla nutturalla ja mustat käsineet, istuu studion ikkunan ääressä ja nostaa pinsetit silmien korkeudelle tarkastellakseen niitä päivänvalossa", caption: "Valmis tai käsin tehty, jokainen viuhka tarkistetaan hyvässä valossa ennen kiinnitystä." } },
      ],
    },
    {
      id: "liima-ja-tarttumat",
      title: "Liiman määrä, tarttumat ja työn nopeus",
      blocks: [
        { p: "Volyymissa liimaa tarvitaan vielä vähemmän. Vain viuhkan kanta kosketetaan liimapisaraan, hyvin pieni määrä. Jotkut ajattelevat, että enemmän liimaa pitää paremmin. Asia on päinvastoin: ripset kestävät, koska viuhkan kanta kietoutuu tiiviisti oman ripsen ympärille, ei liimapaakun ansiosta." },
        {
          table: {
            head: ["Virhe", "Mitä tapahtuu"],
            rows: [
              ["Liikaa liimaa viuhkan kannassa", "Raskas, jäykkä ja paakkuinen kanta; liima nousee ripsien väliin, liimaa viuhkan möykyksi ja tarttuu helposti viereiseen ripseen"],
              ["Yksi viuhkan ripsi koskee viereiseen omaan ripseen", "Tarttuma: molemmat ripset joutuvat vedolle, asiakas tuntee sen ja omat ripset irtoavat aikaisin"],
              ["Kiirehtiminen aikataulussa pysymiseksi", "Liikaa liimaa, tarttumia ja sitten lisää aikaa niiden korjaamiseen"],
            ],
          },
        },
        { img: { src: img("loi-lay-qua-nhieu-keo-o-chan-fan"), alt: "Volyymipinsetit pitävät viuhkaa, jonka kannassa on iso pyöreä musta liimapaakku, ja liima on noussut ylös liimaten ripset yhteen", caption: "Esimerkkikuva liiallisesta liimasta: viuhkan kannasta tulee raskas ja jäykkä möykky." } },
        { p: "Volyymissa tarttumia syntyy helpommin kuin klassisissa, koska viuhka on leveä ja siinä on monta ripseä. Ennaltaehkäisy on samat kaksi tottumusta: eristä huolellisesti ja tarkista uudelleen jokaisen alueen jälkeen." },
        { p: "Uudet ripsistylistit käyvät usein kärsimättömiksi, koska volyymiripset vievät paljon aikaa. Nopeus tulee tekniikasta: oikea pinsettiote, tasaiset viuhkat, oikea liimamäärä ja jokainen viuhka kerralla paikalleen ilman irrottamista ja uudelleen tekemistä. Tee hitaasti mutta oikein, niin kädet nopeutuvat monen kerran jälkeen itsestään." },
      ],
    },
    {
      id: "kesto",
      title: "Kauanko volyymiripset kestävät",
      blocks: [
        { p: "Volyymiripsien kestävyys riippuu kolmesta asiasta:" },
        {
          ul: [
            "Omat ripset on puhdistettu huolellisesti ennen pidennyksiä.",
            "Huoneen kosteus ja lämpötila ovat liimavalmistajan suosittelemalla välillä.",
            "Asiakas hoitaa ripsiään kotona oikein.",
          ],
        },
        { p: "Vaikka kaikki kolme ovat kunnossa, omat ripset irtoavat silti elinkaarensa mukaan, ja viuhkat lähtevät mukana. Siksi asiakas tulee huoltoon, yleensä 2–3 viikon kuluttua." },
        { p: "Jokaiseen ripsikäyntiin kuuluu kaksi turvallisuusasiaa: pinsetit puhdistetaan ja desinfioidaan jokaisen asiakkaan jälkeen, kuten oppitunnilla [Välineet jokaisen asiakkaan jälkeen](lesson:ve-sinh-dung-cu), ja liima, jopa sen höyry, voi aiheuttaa allergiaa; oireista ja toimintaohjeista kerrotaan oppitunnilla [Allergiat ja kemikaalit](lesson:di-ung-hoa-chat). Liima ei saa koskaan koskea ihoon." },
      ],
    },
    {
      id: "rehellisyys-ja-ajanvaraus",
      title: "Rehellinen puhe asiakkaalle ja volyymiripsien ajanvaraus",
      blocks: [
        { p: "Volyymiripset näyttävät parhaalta, kun ne sopivat omille ripsille. Jos asiakkaan ripset ovat heikot, kerro lempeästi, että teet tänään hieman kevyemmin, jotta omat ripset pysyvät terveinä, ja ensi kerralla voi olla tuuheampaa. Asiakas, joka ymmärtää syyn, luottaa ripsistylistiin, ja luottava asiakas palaa." },
        { p: "Luo VaraaAissa kaksi erillistä [palvelua](lesson:dich-vu), esimerkiksi ”Volyymiripset” ja ”Volyymiripsien huolto”, salonkisi todellisilla kestoilla, ja varaa asiakkaan huoltoaika [kalenteriin](lesson:lich-hen) ennen kuin hän lähtee. Volyymiasiakkaat palaavat säännöllisesti, joten jokaisella käynnillä leimattava [kanta-asiakaskortti](lesson:the-khach-quen) sopii heille hyvin." },
        { note: "Artikkelin paksuudet, pituudet ja viuhkojen ripsimäärät ovat yleisiä alan ohjeita, eivät tarkkoja lukuja: tarkista aina ripsivalmistajan taulukko ja liimavalmistajan ohjeet. Kauneuspalveluja ja -tuotteita koskevat säännöt vaihtelevat maittain. Artikkeli on koulutusmateriaalia, ei ammattipätevyys.", kind: "info", title: "Huomio" },
      ],
    },
  ],
  faq: [
    {
      q: "Mitä 2D, 3D ja 6D tarkoittavat volyymiripsissä?",
      a: "Luku kertoo, montako ripseä yhdessä viuhkassa on: 2D on kahden ripsen viuhka, 3D kolmen ja niin edelleen 6D:hen asti. Luvusta riippumatta jokainen viuhka kiinnitetään täsmälleen yhteen omaan ripseen.",
    },
    {
      q: "Mitä eroa on volyymiripsillä ja klassisilla ripsillä?",
      a: "Klassisissa ripsissä yksi pidennys kiinnitetään yhteen omaan ripseen. Volyymiripsissä yhteen omaan ripseen kiinnitetään muutamasta hyvin ohuesta ripsestä tehty viuhka, joten ripsirivi näyttää tuuheammalta, pehmeämmältä ja ilmavammalta. Volyymipidennykset ovat paljon klassisia ohuempia, jottei viuhka ole liian raskas.",
    },
    {
      q: "Vahingoittavatko volyymiripset omia ripsiä?",
      a: "Omat ripset vahingoittuvat, kun viuhka on niille liian raskas, kun yksi viuhka kietoutuu kahden oman ripsen ympärille tai kun liimaa joutuu iholle. Raskaat viuhkat painavat ripsiä alas ja saavat ne irtoamaan aikaisin laikuittain. Kun ripsimäärä valitaan oman ripsen vahvuuden mukaan ja jokainen viuhka on yhdessä ripsessä, tämä vältetään.",
    },
    {
      q: "Voiko volyymiripsiä tehdä ohuisiin ja harvoihin omiin ripsiin?",
      a: "Voi, kun viuhkoissa on vähemmän, ohuempia ja lyhyempiä ripsiä, yleensä 2D–3D. Kevyemmät ripset tänään pitävät omat ripset terveinä, ja seuraavalla kerralla voi tehdä tuuheammat. Suuret paksuista ripsistä tehdyt viuhkat heikkoihin ripsiin harventavat omaa ripsiriviä muutamassa kuukaudessa.",
    },
    {
      q: "Kauanko volyymiripset kestävät ennen huoltoa?",
      a: "Asiakas tulee yleensä huoltoon noin 2–3 viikon kuluttua, koska omat ripset irtoavat kiertonsa mukaan ja viuhkat lähtevät mukana. Kestävyyteen vaikuttavat myös ripsien huolellinen puhdistus, liimavalmistajan suosittelema huoneen kosteus ja lämpötila sekä kotihoito.",
    },
    {
      q: "Saako valmisviuhkoja käyttää?",
      a: "Saa, etenkin harjoitellessa tai kun asiakkaalla on kiire. Valitse viuhkat, joiden kanta on pieni ja siisti, ja tarkista silti jokainen ennen kiinnitystä. Käsin tehdyissä viuhkoissa voit valita ripsimäärän, levityksen ja pituuden jokaiselle omalle ripselle.",
    },
  ],
  related: ["mi-volume", "mi-classic-hieu-dung", "mi-hybrid-hieu-dung", "mi-mega-wispy-hieu-dung"],
};

export default article;
