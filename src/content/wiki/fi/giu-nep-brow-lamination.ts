import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/giu-nep-brow-lamination/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "kulmien-laminoinnin-jalkihoito",
  lesson: "giu-nep-brow-lamination",
  category: "tips",
  title: "Kulmien laminoinnin jälkihoito: 5 asiaa, joilla kulmat pysyvät muodossa 6 viikkoa",
  metaTitle: "Kulmien laminoinnin jälkihoito: muoto pysyy 6 viikkoa",
  metaDescription:
    "Kulmien laminoinnin jälkihoito: kulmat kuivina 24 tuntia, harjaus aamuisin, öljy iltaisin ja ensimmäisellä viikolla ei saunaa, uintia eikä retinolia.",
  keyword: "kulmien laminoinnin jälkihoito",
  keywords: [
    "saako kasvot pestä kulmien laminoinnin jälkeen",
    "kuinka usein kulmien laminoinnin voi tehdä",
    "laminoidut kulmat pysyvät muodossa",
    "kulmaöljy laminoinnin jälkeen",
    "sauna kulmien laminoinnin jälkeen",
    "kulmien laminointi latistui",
  ],
  excerpt: "Se, kauanko laminoidut kulmat pysyvät muodossa, riippuu paljon ensimmäisestä vuorokaudesta ja ensimmäisestä viikosta. Viisi muistettavaa asiaa kuivana pitämisestä harjaukseen ja hoitoon.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-thu-gian-mat-nham-long-may-gon"),
    alt: "Valkoista hiuspantaa käyttävä asiakas rentoutuu hoitotuolissa silmät kiinni ja kulmat siisteinä, taustalla kaari-ikkuna ja orkideoita",
  },
  takeaways: [
    "**Pidä kulmat täysin kuivina ensimmäiset 24 tuntia**: ei pesua, ei hikoilua, ei kulmameikkiä.",
    "**Joka aamu** harjaa karvat ylös muotoonsa puhtaalla kulmaharjalla. Siihen menee muutama sekunti.",
    "**Joka ilta** levitä vähän kulmaöljyä tai kulmaseerumia, koska laminointiaine kuivattaa karvoja.",
    "**Ensimmäisellä viikolla** vältä saunaa, uintia, kuorintaa ja retinolivoiteita kulmien alueella.",
    "**Uusi laminointi 6–8 viikon päästä**, ei aiemmin, jotta karvat saavat levätä.",
  ],
  intro: [
    "Kulmien laminoinnin jälkihoito ratkaisee, pysyvätkö kulmat muodossa koko kuusi viikkoa vai latistuvatko ne muutamassa päivässä. Kun lähdet salongista, karvat on muotoiltu ja kiinnitetty, mutta ensimmäisten tuntien aikana muoto vasta asettuu. Vesi, hiki ja muutama harmittomalta näyttävä ihonhoitotapa voivat latistaa muodon liian aikaisin tai jättää karvat kuiviksi ja pörröisiksi.",
    "Artikkeli perustuu VaraaAi Academyn kurssin ”Moja Beauty: ripset, kynnet ja kulmat” oppituntiin ”Näin kulmien laminointi pysyy kauniina 6 viikkoa”. Kurssi on lyhyitä asiakasvideoita helsinkiläiseltä Moja Beauty -salongilta. Saat lyhyen listan seurattavaksi: mitä teet ensimmäisen vuorokauden aikana, mitä joka aamu ja ilta, mitä vältät ensimmäisellä viikolla ja milloin varaat uuden ajan.",
  ],
  sections: [
    {
      id: "miksi-jalkihoito",
      title: "Miksi kulmien laminointi tarvitsee jälkihoitoa",
      blocks: [
        { p: "Kulmien laminoinnissa kulmakarvat muotoillaan ja harjataan siististi samaan suuntaan. Kuten ripsien kestotaivutuksessa, ensimmäinen aine pehmentää karvan sisärakenteen, jotta karva ottaa uuden muodon, ja toinen aine kiinnittää muodon. Nämä kaksi asiaa selittävät lähes kaikki alla olevat ohjeet." },
        {
          ul: [
            "**Muoto tarvitsee aikaa asettuakseen.** Ensimmäisen vuorokauden aikana liian aikainen vesi latistaa muodon helposti.",
            "**Laminointiaine kuivattaa kulmakarvoja.** Kuivat karvat näyttävät pörröisiltä ja himmeiltä, joten ne tarvitsevat hoitoa joka päivä.",
          ],
        },
        { p: "Jos et ole vielä käynyt hoidossa ja mietit laminoinnin, värjäyksen ja pysyvän meikin välillä, lue ensin [kulmien laminointi, värjäys vai pysyvä meikki](lesson:brow-lami-tint-phun)." },
      ],
    },
    {
      id: "mita-valttaa",
      title: "Mitä välttää ensimmäisellä viikolla",
      blocks: [
        {
          table: {
            head: ["Vältä", "Kuinka kauan", "Miksi"],
            rows: [
              ["Kulmien pesu ja kastelu", "Ensimmäiset 24 tuntia", "Muoto asettuu ja latistuu liian aikaisesta vedestä"],
              ["Runsas hikoilu", "Ensimmäiset 24 tuntia", "Kosteus latistaa muodon"],
              ["Kulmameikki", "Ensimmäiset 24 tuntia", "Karvoihin ei kosketa eikä niitä hangata"],
              ["Sauna, uinti", "Ensimmäinen viikko", "Lämpö ja vesi heikentävät muotoa"],
              ["Kuorinta, retinolivoide kulmiin", "Ensimmäinen viikko", "Iho on juuri ollut kosketuksissa aineen kanssa"],
            ],
          },
        },
        { img: { src: img("khach-hoi-ve-kem-retinol-dang-dung"), alt: "Kylpytakkiin pukeutunut asiakas istuu hoitosängyllä ja näyttää hoitajalle voidetuubia huoneessa, jossa on valkoisia orkideoita", caption: "Käytätkö retinolivoidetta tai kuorivaa tuotetta? Pidä se ensimmäisen viikon ajan poissa kulmien alueelta." } },
        { note: "Hikinen treeni, sauna tai uinti: jos ne ovat jo kalenterissa, varaa laminointi niin, että ensimmäinen vuorokausi on vapaa eikä ensimmäiselle viikolle osu saunaa tai uimahallia.", kind: "tip", title: "Suunnittele varaus" },
      ],
    },
    {
      id: "latistui-tai-kuiva",
      title: "Kulmien laminointi latistui tai kulmat tuntuvat kuivilta",
      blocks: [
        { p: "Jos kulmat kastuivat ensimmäisenä päivänä, muoto ei ehkä ole yhtä siisti kuin lähtiessäsi. Älä kiirehdi heti uuteen hoitoon. Jatka karvojen harjaamista muotoonsa joka aamu ja hoitamista joka ilta, ja kysy hoitajalta, jos muoto ei pysy." },
        { p: "Älä uusi laminointia kuutta tai kahdeksaa viikkoa aikaisemmin. Aine on jo kuivattanut karvoja, ja liian aikainen uusi käsittely voi tehdä niistä kuivia, hauraita ja katkeilevia, jolloin ainoa vaihtoehto on odottaa uusien karvojen kasvua." },
        { note: "Jos kulmien alue pysyy hoidon jälkeen punaisena, kutisevana, turvonneena tai kirvelevänä, kerro siitä salongille ja kysy lääkäriltä. Älä levitä iholle uusia, tuntemattomia tuotteita. Katso myös [akrylaattiallergia, ripsiliima ja hiusvärit](lesson:di-ung-hoa-chat).", kind: "warn", title: "Jos iho reagoi" },
        { img: { src: img("chuyen-vien-dan-do-khach-sau-lieu-trinh"), alt: "Kermanväriseen paitaan pukeutunut hoitaja pitää kirjoitusalustaa ja antaa hymyillen jälkihoito-ohjeita hiuspantaa ja kylpytakkia käyttävälle asiakkaalle, joka istuu nojatuolissa", caption: "Kuuntele jälkihoito-ohjeet tarkasti ennen lähtöä, varsinkin se, mitä öljyä kannattaa käyttää." } },
      ],
    },
    {
      id: "uusi-laminointi",
      title: "Kuinka usein kulmien laminoinnin voi tehdä?",
      blocks: [
        { p: "Muoto kestää yleensä noin kuudesta kahdeksaan viikkoa. Sen jälkeen tilalle kasvaa uusia kulmakarvoja, joita ei ole laminoitu, ja kulmat palaavat vähitellen ennalleen. Silloin on uuden hoidon aika, ei aiemmin, jotta karvat ehtivät levätä kahden käsittelyn välissä." },
        { img: { src: img("ghi-ngay-lam-de-hen-lan-sau"), alt: "Hoitaja istuu marmoripöydän ääressä kaari-ikkunan vieressä ja kirjoittaa muistiinpanoja tablettiin, taustalla hoitosänky ja eteerisiä öljyjä", caption: "Kun hoitopäivä on kirjattu, sinä ja salonki tiedätte, milloin seuraava hoito on ajankohtainen." } },
        { p: "Helpointa on varata seuraava aika heti, kun tämä käynti on ohi. VaraaAissa varauksesi löytyvät [omista varauksistasi](lesson:lich-hen-cua-toi), joissa voit tarkistaa tai muuttaa niitä tarvittaessa." },
      ],
    },
    {
      id: "kokeile-laminointia",
      title: "Haluatko kokeilla kulmien laminointia?",
      blocks: [
        { p: "Voit [lähettää salongille viestin](lesson:chat-voi-salon) ja kysyä, sopiiko laminointi kulmillesi, ja sitten [varata ajan netissä](lesson:dat-lich-online): valitse palvelu, valitse aika, valmis. Tämä oppitunti tulee Moja Beautysta Helsingistä, ja sinne voit varata ajan [Moja Beautyn varaussivulta](/b/moja-beauty). Kylmä sää kuivattaa myös ripsiä ja kulmia, ja artikkelissa [ripset ja kynnet kuntoon talven kuivuudessa](lesson:mi-mong-mua-dong) on lisää hyödyllisiä tapoja." },
      ],
    },
  ],
  howTo: {
    title: "Kulmien laminoinnin jälkihoito vaihe vaiheelta",
    id: "jalkihoidon-vaiheet",
    after: "miksi-jalkihoito",
    lead: "Viisi asiaa siinä järjestyksessä kuin ne tulevat vastaan, salongista lähdöstä seuraavaan aikaan.",
    steps: [
      {
        name: "Pidä kulmat kuivina ensimmäiset 24 tuntia",
        text: "Älä pese kulmia, älä anna hien valua niihin äläkä käytä kulmameikkiä. Silloin muoto asettuu, ja liian aikainen vesi latistaa sen. Kun peset kasvot, kierrä kulmat ja taputtele niiden ympärysiho varovasti kuivaksi.",
      },
      {
        name: "Harjaa karvat joka aamu ylös muotoonsa",
        text: "Harjaa karvat puhtaalla kulmaharjalla ylös siihen suuntaan, johon hoitaja ne asetti. Muutamassa sekunnissa kulmat ovat siistit ilman geeliä tai kynää. Harjaa kevyesti äläkä vedä, ettei karvojen suunta muutu.",
        image: { src: img("chai-soi-len-theo-mot-nep-sau-khi-uon"), alt: "Mustakäsineinen tekijä kampaa metallipuikolla ripset yksitellen ylös silikonimuotille, ja yläpuolella näkyvät asiakkaan tuuheat, siistit kulmat" },
      },
      {
        name: "Hoida kulmia joka ilta",
        text: "Levitä vähän kulmaöljyä tai kulmaseerumia. Laminointiaine kuivattaa karvoja, ja säännöllinen hoito auttaa niitä muuttumaan taas pehmeiksi ja kiiltäviksi. Pieni määrä riittää; pyyhi ylimääräinen pois, ettei sitä valu silmiin.",
      },
      {
        name: "Vältä ensimmäisellä viikolla lämpöä ja voimakkaita tuotteita",
        text: "Ei saunaa, ei uintia, ei kuorintaa eikä retinolivoidetta kulmien alueelle ensimmäisen viikon aikana. Lämpö, vesi ja nämä tuotteet voivat heikentää muotoa tai ärsyttää kulmien ympärysihoa.",
      },
      {
        name: "Uusi laminointi 6–8 viikon päästä",
        text: "Varaa seuraava hoito kuuden tai kahdeksan viikon päähän, kun uudet kulmakarvat ovat kasvaneet. Älä mene aiemmin, jotta karvat saavat levätä kahden laminoinnin välissä.",
      },
    ],
  },
  faq: [
    {
      q: "Saako kasvot pestä kulmien laminoinnin jälkeen?",
      a: "Pidä kulmien alue täysin kuivana ensimmäiset 24 tuntia: ei kulmien pesua, ei hikoilua, ei kulmameikkiä. Muut kasvot voit puhdistaa, mutta pidä vesi poissa kulmista, koska liian aikainen kastuminen latistaa muodon.",
    },
    {
      q: "Kauanko kulmien laminointi kestää?",
      a: "Muoto kestää yleensä noin kuudesta kahdeksaan viikkoa. Kun pidät kulmat kuivina ensimmäisen vuorokauden, harjaat ne joka aamu ja hoidat joka ilta, ne näyttävät hyviltä koko ajan.",
    },
    {
      q: "Kuinka usein kulmien laminoinnin voi tehdä?",
      a: "Kuuden tai kahdeksan viikon välein. Älä mene aiemmin, jotta kulmakarvat saavat levätä, koska laminointiaine kuivattaa niitä ja liian aikainen uusi hoito voi tehdä niistä kuivia ja hauraita.",
    },
    {
      q: "Saako kulmien laminoinnin jälkeen saunoa?",
      a: "Vältä saunaa ja uintia ensimmäisellä viikolla hoidon jälkeen. Lämpö ja vesi voivat heikentää muotoa ennen kuin se on ehtinyt asettua.",
    },
    {
      q: "Mitä kulmiin laitetaan laminoinnin jälkeen?",
      a: "Levitä joka ilta vähän kulmaöljyä tai kulmaseerumia. Laminointiaine kuivattaa karvoja, ja säännöllinen hoito pitää ne pehmeinä ja kiiltävinä. Kysy hoitajalta, mikä tuote sopii kulmillesi.",
    },
    {
      q: "Voiko retinolia käyttää kulmien laminoinnin jälkeen?",
      a: "Pidä retinolivoiteet ja kuorinnat ensimmäisen viikon ajan poissa kulmien alueelta. Muualla kasvoilla voit jatkaa tavallista ihonhoitoasi, kunhan nämä tuotteet eivät päädy kulmiin.",
    },
  ],
  related: ["brow-lami-tint-phun", "mi-mong-mua-dong", "cham-soc-sau-lam-mi", "lash-lift-hieu-dung"],
};

export default article;
