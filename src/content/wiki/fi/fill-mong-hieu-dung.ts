import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/fill-mong-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "kynsien-huoltovali-geeli-ja-akryyli",
  lesson: "fill-mong-hieu-dung",
  category: "nail",
  title: "Kynsien huoltoväli: miksi geeli- ja akryylikynnet huolletaan ajallaan ja milloin kaikki poistetaan",
  metaTitle: "Kynsien huoltoväli: geeli, akryyli ja milloin kaikki pois",
  metaDescription:
    "Mikä on kynsien huolto eli täyttö, miksi myöhästynyt huolto katkaisee kynnen, geelin ja akryylin huoltoväli, milloin huolletaan ja milloin kaikki poistetaan.",
  keyword: "kynsien huoltoväli",
  keywords: ["geelikynsien huolto", "akryylikynsien huoltoväli", "huolto vai poisto", "voiko irronneen kynnen huoltaa", "miksi kynsi katkeaa ennen huoltoa", "rakennegeelin täyttö", "geeliä akryylin päälle"],
  excerpt: "Huolto eli täyttö tasapainottaa geeli- tai akryylikynnet muutaman viikon kasvun jälkeen. Miksi huolto tehdään ajallaan, milloin se onnistuu ja milloin kaikki poistetaan.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-nail-tu-van-lich-dam-mong-cho-khach"),
    alt: "Mustiin käsineisiin pukeutunut kynsiteknikko pitelee asiakkaan kättä ja selittää jotain kivipöydän ääressä tyylikkäässä salongissa, ja ruskeahiuksinen asiakas kuuntelee hymyillen",
  },
  takeaways: [
    "Kasvava kynsi vie tuotteen mukanaan: tyveen syntyy paljas kaistale, ja **apex siirtyy kohti kärkeä**.",
    "Tavallinen huoltoväli: **rakennegeeli noin 3–4 viikkoa, akryyli noin 2–3 viikkoa**. Nopea kasvu tai raskas käsityö tarkoittaa aikaisempaa huoltoa.",
    "Huolla, kun vanha tuote on yhä hyvin kiinni. Laajat irtoamat tai ilmataskut tarkoittavat täyttä poistoa. Värimuutos, kipu tai punoittava turvotus tarkoittavat, ettei hoitoa tehdä ja asiakas ohjataan lääkäriin.",
    "**Irtoaman päälle ei koskaan laiteta tuotetta.** Viilaa irtoama pois, kunnes jäljelle jäävä reuna on kiinni ja tasoissa kynnen kanssa.",
    "Huolto tasapainottaa kynnet: vanha tuote ohennetaan, uusi kasvu peitetään ja apex rakennetaan uudelleen rasitusalueen päälle.",
  ],
  intro: [
    "Kynsien huoltoväli ratkaisee, kestävätkö rakennegeeli- ja akryylikynnet vai katkeavatko ne, ja siksi jokainen salonki pyytää asiakasta palaamaan muutaman viikon päästä. Oma kynsi kasvaa tuotteen alla, ja kynnet tarvitsevat huollon, jota kutsutaan myös täytöksi. Oikein tehtynä kynnet kestävät todella pitkään tasapainoisina ja vahvoina. Väärin tehtynä tai liian pitkään venytettynä ne katkeavat ja irtoavat, ja asiakas luulee vian olevan tuotteessa.",
    "Artikkeli seuraa VaraaAi Academyn Kynnet-kurssin oppituntia ”Huolto: ymmärrä se, niin kynnet pysyvät tasapainossa ja vahvoina”. Luettuasi osaat kertoa asiakkaalle, miksi huolto tehdään ajallaan, tiedät, milloin huolletaan ja milloin kaikki poistetaan, ja ymmärrät, miksi irtoaman päälle ei koskaan rakenneta.",
  ],
  sections: [
    {
      id: "kun-kynsi-kasvaa",
      title: "Mitä kynsille tapahtuu, kun ne kasvavat",
      blocks: [
        { p: "Oma kynsi kasvaa joka päivä vähän ja vie geeli- tai akryylikerroksen mukanaan. Kynsinauhan kohdalle tulee kaistale uutta omaa kynttä, jonka päällä ei ole mitään. Kaistale levenee viikko viikolta, ja siihen, missä vanha kerros loppuu, syntyy pieni porras." },
        { img: { src: img("mong-moc-ra-lo-khoang-mong-that-o-chan-mong"), alt: "Ylhäältä otettu lähikuva kasvaneesta akryylikynnestä, tyvessä vaalea kaistale omaa kynttä ja sen jälkeen porras, josta vanha tuote alkaa", caption: "Muutaman viikon kuluttua: tyvessä kaistale uutta kynttä ja porras vanhan tuotteen reunassa." } },
        { p: "Aukon näkee jokainen. Tärkeämpi asia on vaikeampi nähdä: apex. Käsittelypäivänä apex on aivan rasitusalueen päällä, hieman taaempana. Kynnen kasvaessa myös apex siirtyy hiljalleen kohti kärkeä. Paksuin kohta on nyt edessä, ja kynsi on pitkä ja kärkipainoinen." },
        { img: { src: img("diem-apex-dung-cho-ngay-moi-lam"), alt: "Kirkkaalla roosalla geelillä päällystetty kynsi sivulta kuvattuna, geelin korkein kohta kynnen keskivaiheilla", caption: "Käsittelypäivänä: korkein kohta on rasitusalueen päällä." } },
        { img: { src: img("apex-troi-ra-dau-mong-sau-vai-tuan"), alt: "Kasvanut geelikynsi sivulta kuvattuna, geelin paksuin osa on siirtynyt kohti kärkeä ja tyvessä näkyy paljasta omaa kynttä", caption: "Muutaman viikon päästä: paksuin kohta on siirtynyt eteen, ja kynsi on pitkä ja kärkipainoinen." } },
        { p: "Kuvittele vipu. Mitä pidempi ja painavampi kärki, sitä enemmän voimaa kohdistuu rasitusalueeseen aina, kun asiakas kirjoittaa näppäimistöllä, avaa kannen tai kolauttaa kätensä johonkin. Eikä apex enää tue tätä aluetta. Tuloksena kynsi katkeaa poikki juuri siitä kohdasta, tai tuote ponnahtaa irti tyvestä ja irtoaa vähitellen." },
      ],
    },
    {
      id: "kuinka-usein",
      title: "Kuinka usein kynnet huolletaan",
      blocks: [
        { p: "Älä odota, että kynsi katkeaa tai irtoaa, ennen kuin varaat huollon. Alla olevat luvut ovat tavallinen väli." },
        {
          table: {
            head: ["Kynsityyppi", "Tavallinen huoltoväli"],
            rows: [
              ["Rakennegeeli", "Noin 3–4 viikkoa"],
              ["Akryyli", "Noin 2–3 viikkoa"],
            ],
          },
        },
        { p: "Kunkin asiakkaan oikea väli riippuu myös siitä, kuinka nopeasti hänen kyntensä kasvavat, mitä hän tekee käsillään ja mitä tuotemerkkiä käytetään. Nopeasti kasvavat kynnet tai raskas käsityö tarkoittavat aikaisempaa huoltoa." },
      ],
    },
    {
      id: "huolto-vai-poisto",
      title: "Huolto vai kaikki pois",
      blocks: [
        { p: "Kun asiakas tulee ajalleen, tämä on aina ensimmäinen kysymys. Vastaus löytyy vanhan tuotteen kunnosta." },
        {
          table: {
            head: ["Mitä näet", "Mitä teet"],
            rows: [
              ["Vanha tuote on yhä tiukasti kiinni, reunassa vain vähän irtoamaa, joka lähtee viilaamalla", "Huolto"],
              ["Vanha tuote on irronnut isoina laikkuina, ja alla on ilmataskuja", "Kaikki pois ja alusta"],
              ["Vihreä läikkä tai värimuutos irtoaman alla, kipu, punoittava turvonnut iho, kynsipedistä irtoava kynsi", "Ei huoltoa eikä uutta tuotetta; asiakas ohjataan lääkäriin"],
            ],
          },
        },
        { img: { src: img("ho-nho-o-mep-chan-mong-con-dam-duoc"), alt: "Lähikuva roosasta akryylikynnestä, jonka reuna on hieman koholla tyvessä, mutta muu osa on yhä tiukasti kiinni kynnessä", caption: "Pieni irtoama reunassa: irtoama viilataan pois, ja kynnen voi huoltaa." } },
        { img: { src: img("vet-xanh-duoi-cho-ho-khong-dam"), alt: "Lähikuva tyven läheltä irronneesta akryylikynnestä, jonka raon alla omassa kynnessä näkyy pieni oliivinvihreä läikkä", caption: "Vihreä läikkä irtoaman alla voi olla tulehduksen merkki: ei huoltoa, ei värin peittämistä, vaan ohjaus lääkäriin." } },
        { p: "Merkit, joiden takia hoidosta kieltäydytään, käydään läpi oppitunnilla [Milloin hoitoa ei tehdä](lesson:khi-nao-khong-lam). Vanhan tuotteen poisto omaa kynttä vahingoittamatta kerrotaan artikkelissa [geelin oikea poisto](lesson:thao-gel)." },
      ],
    },
    {
      id: "ei-irtoaman-paalle",
      title: "Miksi irtoaman päälle ei koskaan rakenneta",
      blocks: [
        { p: "Tilanne on tuttu: vähän irtoamaa, kiireinen päivä, ja geeliä tai akryyliä laitetaan päälle, jotta kohta sulkeutuu. Se näyttää kauniilta. Mutta irronneen kohdan alle on jo päässyt vettä, öljyä ja likaa. Kun päälle rakennetaan, ne jäävät loukkuun lämpimään ja kosteaan. Siellä bakteerit ja sienet kasvavat, ja alla oleva oma kynsi kärsii. Uusikin kerros irtoaa hyvin nopeasti." },
        { note: "Kaikki irronnut viilataan pois, kunnes jäljelle jäävä reuna on tiukasti kiinni, ohut ja tasoissa kynnen kanssa. Irtoamaa ei väännetä irti, koska se repii mukanaan omaa kynttä.", kind: "warn", title: "Irtoaman sääntö" },
      ],
    },
    {
      id: "sama-tuotejarjestelma",
      title: "Geeliä geelin päälle, akryyliä akryylin päälle",
      blocks: [
        { p: "Huollossa käytetään samaa tuotetyyppiä kuin vanhassa kerroksessa. Jos haluat käyttää kahta eri tyyppiä tai kahta eri merkkiä, tarkista, sanooko valmistaja niiden sopivan yhteen. Moni merkki tekee kokonaisen järjestelmän, jossa tartuntakerros, geeli ja päällyskerros kuuluvat yhteen. Sattumanvarainen sekoittaminen voi johtaa siihen, ettei tuote tartu tai kovetu tasaisesti." },
        { p: "Järjestelmien erot voit kerrata artikkeleista [mikä on rakennegeeli](lesson:builder-gel-hieu-dung) ja [mitä ovat akryylikynnet](lesson:dap-bot-hieu-dung)." },
      ],
    },
    {
      id: "tasapainotus",
      title: "Huolto on kynsien tasapainotus",
      blocks: [
        { p: "Aukon täyttäminen tyvessä on helppo osa. Huollon tärkein tehtävä on palauttaa rakenne oikealle paikalleen:" },
        {
          ol: [
            "Ohenna vanha tuote, etenkin eteenpäin siirtynyt paksu kohta.",
            "Jos kynnet ovat kasvaneet liian pitkiksi, lyhennä ne asiakkaan valitseman muodon säilyttäen.",
            "Peitä uusi kasvu.",
            "Rakenna apex uudelleen rasitusalueen päälle, hieman taaemmas.",
          ],
        },
        { img: { src: img("lop-cu-da-dua-mong-truoc-khi-dam"), alt: "Ylhäältä otettu lähikuva geelikynnestä, joka on viilattu ohuemmaksi tasaisen mattapintaiseksi, ja kynsiteknikon mustissa käsineissä on viilauspölyä", caption: "Vanha tuote viilataan ohueksi ja tasaisen mataksi ennen uutta kerrosta." } },
        { p: "Valmiin huollon jälkeen kynnen pitää sivulta katsottuna näyttää samalta kuin ensimmäisenä päivänä. Yleinen virhe on tehdä huolto toisensa perään ohentamatta vanhaa kerrosta ja lisätä joka kerta uusi kerros. Kynnet paksuuntuvat, jäykistyvät ja näyttävät raskailta, ja luonnollinen muoto katoaa kokonaan. Kun vanha tuote on irronnut monesta kohdasta tai muuttanut väriään, kaikki poistetaan ja aloitetaan alusta. Se on asiakkaan kynsille parasta." },
        { note: "Katso kynsiä sivulta ennen aloittamista ja etsi korkein kohta. Siihen, minne se on siirtynyt, kohdistuu ohennus, ja sieltä uusi apex siirretään takaisin oikealle paikalleen.", kind: "tip", title: "Lue kynnet ennen viilausta" },
      ],
    },
    {
      id: "turvallinen-viilaus",
      title: "Turvallinen viilaus tyvessä, pöly ja allergia",
      blocks: [
        { p: "Kynsinauhan alue vaatii äärimmäistä huolellisuutta. Siinä on uutta omaa kynttä, joka on vielä ohutta ja pehmeää. Kuljeta hiomapalaa vain todella kevyesti kiillon poistamiseksi." },
        {
          ul: [
            "**Älä koskaan viilaa omaan kynteen.** Kynsi ohenee jokaisessa huollossa, asiakas tuntee kuumotusta ja kipua, ja kynsi heikkenee vähitellen.",
            "**Älä koskaan viilaa ihoa.** Siitä syntyy avohaava, ja bakteereille aukeaa tie sisään.",
            "Olipa kyseessä käsiviila tai sähköviila, pidä viilan kärki aina poissa iholta.",
          ],
        },
        { img: { src: img("tho-nail-deo-khau-trang-dua-mong-co-may-hut"), alt: "Suojalaseihin, hengityssuojaimeen ja mustiin käsineisiin pukeutunut kynsiteknikko käyttää sähköviilaa asiakkaan kynsiin pöydän kohdepoiston vieressä", caption: "Huollossa viilataan paljon: kohdepoisto, hengityssuojain ja käsineet. Sähköviilaa käyttää vain siihen koulutettu." } },
        { p: "Huollossa viilataan paljon, joten pölyä syntyy paljon. Laita työpisteen kohdepoisto päälle ja käytä hengityssuojainta ja käsineitä. Harjaa pöly pois, älä puhalla. Vajaasti kovettuneen geelin pöly ja iholle joutunut geeli voivat kumpikin aiheuttaa allergiaa sekä asiakkaalle että sinulle. Lisää aiheesta kerrotaan oppitunnilla [Allergiat ja kemikaalit](lesson:di-ung-hoa-chat). Tuotteita ja pölynpoistoa koskevat määräykset vaihtelevat maittain." },
      ],
    },
    {
      id: "seuraava-huoltoaika",
      title: "Mitä kertoa asiakkaalle ja seuraavan huoltoajan varaus",
      blocks: [
        { p: "Kynnet, jotka huolletaan ajallaan ja tasapainotetaan joka kerta, kestävät todella pitkään, ja omat kynnet pysyvät terveinä. Kynnet, joiden huolto venyy, muuttuvat kärkipainoisiksi ja ennemmin tai myöhemmin katkeavat tai irtoavat. Silloin ne joudutaan usein poistamaan kokonaan, ja asiakkaalta kuluu enemmän aikaa ja rahaa. Varaa siis seuraava huolto ennen kuin asiakas lähtee, ja kerro, miksi." },
        { p: "VaraaAissa varaat seuraavan huollon tiskillä [ajanvarauskalenteriin](lesson:lich-hen) ja valitset, että asiakas saa vahvistuksen ja muistutuksen sähköpostiin. Merkitse [asiakastietoihin](lesson:khach-hang), mitkä asiakkaan kynnet irtoavat tai katkeavat herkästi, jotta tiedät ensi kerralla, mitä korjata. Huollon käsityö käydään läpi käytännön artikkelissa [kynsien huolto vaihe vaiheelta](lesson:fill-mong)." },
      ],
    },
  ],
  faq: [
    {
      q: "Mitä kynsien huolto eli täyttö tarkoittaa?",
      a: "Huolto on käynti, jossa rakennegeeli- tai akryylikynnet tehdään uudelleen muutaman viikon kasvun jälkeen. Kynsiteknikko viilaa irtoamat pois, ohentaa vanhan tuotteen, peittää uuden kasvun tyvessä ja rakentaa apexin takaisin rasitusalueen päälle sen sijaan, että kaikki poistettaisiin ja aloitettaisiin alusta.",
    },
    {
      q: "Kuinka usein kynnet pitää huoltaa?",
      a: "Tavallinen väli on rakennegeelillä noin 3–4 viikkoa ja akryylillä noin 2–3 viikkoa. Se riippuu kynsien kasvunopeudesta, asiakkaan työstä ja tuotemerkistä. Nopeasti kasvavat kynnet tai raskas käsityö tarkoittavat aikaisempaa huoltoa.",
    },
    {
      q: "Miksi kynsi katkeaa, kun huolto on myöhässä?",
      a: "Koska kasvu vie apexin kohti kärkeä. Pitkä ja painava kärki toimii kuin vipu, eikä apex enää tue rasitusaluetta. Kynsi katkeaa poikki siitä kohdasta, tai tuote ponnahtaa irti tyvestä.",
    },
    {
      q: "Voiko irronneet kynnet huoltaa?",
      a: "Voi, jos vanha tuote on yhä tiukasti kiinni ja irronnut vain vähän reunasta. Kynsiteknikko viilaa irtoaman pois, kunnes reuna on kiinni, ja tekee sitten huollon. Jos isoja alueita on irronnut tai alla on ilmataskuja, kaikki poistetaan. Irtoaman päälle ei koskaan laiteta tuotetta.",
    },
    {
      q: "Mitä vihreä läikkä geelin tai akryylin alla tarkoittaa?",
      a: "Värimuutos irtoaman alla voi olla tulehduksen merkki. Kynttä ei huolleta, sen päälle ei laiteta uutta tuotetta eikä sitä peitetä värillä. Kynsiteknikko lopettaa ja neuvoo asiakasta käymään lääkärissä.",
    },
    {
      q: "Voiko akryylikynnet huoltaa geelillä?",
      a: "Pääsääntö on käyttää samaa tuotetyyppiä: geeliä geelin päälle ja akryyliä akryylin päälle. Jos haluat käyttää eri tyyppiä tai merkkiä, tarkista, sanooko valmistaja niiden sopivan yhteen, sillä sattumanvarainen sekoitus ei välttämättä tartu tai kovetu tasaisesti.",
    },
  ],
  related: ["fill-mong", "builder-gel-hieu-dung", "dap-bot-hieu-dung", "thao-gel-hieu-dung"],
};

export default article;
