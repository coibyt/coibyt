import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/mi-dam-thao-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "ripsienpidennysten-huoltovali",
  lesson: "mi-dam-thao-hieu-dung",
  category: "lash",
  title: "Ripsienpidennysten huoltoväli: kuinka usein huolto, milloin setti poistetaan ja miksi ripsiä ei nypitä",
  metaTitle: "Ripsienpidennysten huoltoväli ja milloin setti poistetaan",
  metaDescription:
    "Ripsienpidennysten huolto on yleensä 2–3 viikon välein. Miksi setti harvenee, mitä huollossa poistetaan, miksi ei vedetä eikä öljyä ja milloin kaikki poistetaan.",
  keyword: "ripsienpidennysten huoltoväli",
  keywords: [
    "mitä ripsihuolto tarkoittaa",
    "milloin ripsienpidennykset poistetaan",
    "voiko ripsienpidennykset poistaa itse kotona",
    "ripsienpidennysten poisto öljyllä",
    "vahingoittaako pidennysten poisto omia ripsiä",
    "ripsien poistoaine voide vai geeli",
    "miten ripsienpidennykset kestävät pidempään",
  ],
  excerpt: "Asiakas palaa yleensä 2–3 viikon kuluttua. Miksi ripsisetti harvenee, mitkä pidennykset poistetaan huollossa, miksi ripseä ei koskaan vedetä ja milloin koko setti poistetaan.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-mi-chuan-bi-kem-thao-mi-ben-cua-so-studio"),
    alt: "Ripsistylisti korkealla nutturalla, kermanvärisessä paidassa ja mustissa käsineissä istuu marmoripöydän ääressä ja ottaa pienellä siveltimellä vaaleanpunaista poistovoidetta pienestä purkista",
  },
  takeaways: [
    "Asiakas tarvitsee ripsienpidennysten huollon yleensä noin **2–3 viikon** välein sen mukaan, kuinka nopeasti hänen ripsensä lähtevät ja miten hän hoitaa niitä kotona.",
    "Huollossa poistetaan kolmenlaiset: **ulos kasvaneet pidennykset**, tarttumat ja löysät. Siistit ja luomen lähellä olevat jätetään.",
    "**Pidennystä ei koskaan vedetä, nykäistä eikä nypitä**: vetäessä oma ripsi lähtee karvatupesta mukana.",
    "Pidennys poistetaan pehmentämällä liima ammattikäyttöön tarkoitetulla poistoaineella ja liu'uttamalla pidennys pois. Ei öljyä silmien lähellä, ellei tuotteen valmistaja selvästi niin ohjeista.",
    "Poistoainetta ei saa joutua silmään. Jos asiakasta kirvelee, lopeta heti ja pyyhi aine pois.",
  ],
  intro: [
    "Ripsienpidennysten huoltoväli on se, mitä asiakas kysyy heti setin valmistuttua, ja tavallinen vastaus on noin 2–3 viikkoa. Luku tulee oman ripsen elinkaaresta. Kun ymmärrät sen, ymmärrät myös, mitkä pidennykset huollossa poistetaan, miksi pidennystä ei koskaan vedetä irti ja milloin koko setin poistaminen on parempi kuin uusi huolto.",
    "Artikkeli perustuu VaraaAi Academyn Ripset-kurssin oppituntiin ”Huolto ja poisto: ymmärrä ne, niin omat ripset pysyvät terveinä”. Kauniin setin tekeminen on yksi asia, asiakkaan omien ripsien pitäminen terveinä kuukausien ja vuosien ajan on toinen, ja suurin osa siitä ratkeaa huolloissa ja poistoissa. Luettuasi osaat selittää nämä asiat asiakkaalle omin sanoin.",
  ],
  sections: [
    {
      id: "kuinka-usein-huolto",
      title: "Kuinka usein ripsienpidennykset huolletaan ja miksi setti harvenee",
      blocks: [
        { p: "Huolto on täyttökäynti kahden uuden setin välissä: ripsistylisti poistaa pidennykset, jotka eivät enää ole oikealla paikallaan, ja lisää uusia sinne, missä ripsirivi on harventunut. Setin tekopäivästä alkaen asiakkaan luomella tapahtuu kolme asiaa yhtä aikaa:" },
        {
          ul: [
            "Joka päivä muutama oma ripsi irtoaa kasvusyklinsä mukaan, ja sen pidennys lähtee mukana.",
            "Muut ripset pitenevät ja siirtävät liimakohtaa kauemmas luomesta.",
            "Uusia nuoria ripsiä kasvaa, eikä niissä ole vielä pidennystä.",
          ],
        },
        { p: "Noin **2–3 viikon** kuluttua setti näyttää harvemmalta, siinä on aukkoja ja muutama ulos kasvanut ripsi sojottaa. Silloin asiakas tarvitsee huollon. Väli vaihtelee sen mukaan, kuinka nopeasti kunkin ripset lähtevät ja miten asiakas hoitaa niitä. Ripsen kasvusykli selitetään tarkemmin artikkelissa [klassiset ripsienpidennykset](lesson:mi-classic-hieu-dung)." },
        { img: { src: img("bo-mi-noi-sau-ba-tuan-can-dam-lai"), alt: "Lähikuva suljetusta silmästä noin kolme viikkoa vanhassa ripsisetissä, rivi harventunut ja muutama ulos kasvanut pidennys sojottaa ja menee ristiin valkoisen tyynyn päällä", caption: "Setti noin kolmen viikon jälkeen: harvempi, aukkoja ja muutama ulos kasvanut ripsi." } },
        { h3: "Liian pitkän tauon jälkeen kyse ei ole enää huollosta" },
        { p: "Jos asiakas odottaa liian kauan, pidennyksiä on jäljellä liian vähän, moni on kasvanut pitkäksi ja kiertynyt, ja huolto on lähes uusi setti. Jokainen salonki päättää itse, kuinka pitkä väli lasketaan vielä huolloksi. Helpoin tapa saada asiakas takaisin ajallaan on varata huolto heti setin valmistuttua." },
      ],
    },
    {
      id: "setin-lukeminen",
      title: "Miksi ripsienpidennykset lähtevät: setin lukeminen huollossa",
      blocks: [
        { p: "Jokainen huolto on tilaisuus lukea ripsiä kuin päiväkirjaa. Se, mistä pidennykset ovat lähteneet, kertoo miten asiakas on elänyt settinsä kanssa viime viikot." },
        {
          table: {
            head: ["Mistä ripsiä on lähtenyt", "Tavallinen syy"],
            rows: [
              ["Enimmäkseen toisesta silmästä", "Asiakas nukkuu sillä kyljellä"],
              ["Kokonainen laikku ulkonurkasta", "Mahdollisesti hierominen tai öljyinen meikinpoistoaine"],
              ["Tasaisesti joka puolelta", "Tarkista liima, huoneen kosteus ja edellisen kerran puhdistusvaihe"],
            ],
          },
        },
        { p: "Kysy asiakkaalta, katso tarkkaan ja kirjaa ylös. Kun syy löytyy, ripset kestävät seuraavalla kerralla pidempään." },
        { img: { src: img("tho-mi-ghi-ly-do-rung-mi-vao-ho-so-khach"), alt: "Ripsistylisti istuu marmoripöydän ääressä ikkunan vieressä ja kirjoittaa muistiinpanoja tablettiin, vieressä teekuppi ja maljakko valkoisia kukkia", caption: "Kirjaa ripsien lähtemisen syy jokaisen huollon jälkeen." } },
        { note: "Kirjaa mahdollinen ripsien lähtemisen syy VaraaAissa [asiakkaan tietojen](lesson:khach-hang) sisäisiin muistiinpanoihin. Kuka tahansa seuraavan huollon tekee, tietää mihin kiinnittää huomiota.", kind: "tip", title: "Salongin muistikirja" },
      ],
    },
    {
      id: "mita-huollossa-poistetaan",
      title: "Mitä ripsihuollossa poistetaan ja mitä jätetään",
      blocks: [
        {
          table: {
            head: ["Pidennys", "Merkit", "Toimenpide"],
            rows: [
              ["Ulos kasvanut", "Liimakohta kaukana luomesta; pidennys on kääntynyt sivuttain, sojottaa tai menee viereisen ripsen yli", "Poista"],
              ["Tarttuma", "Kaksi ripseä liimautunut yhteen", "Poista"],
              ["Löysä", "Ei ole tukevasti kiinni", "Poista"],
              ["Yhä siisti", "Luomen lähellä ja oikeassa suunnassa", "Jätä"],
            ],
          },
        },
        { p: "Paikalleen jätetty ulos kasvanut pidennys näyttää pahalta ja painaa oman ripsen kärkeä, jolloin ripsi vetää ja kiertyy. Yksittäisten pidennysten poisto pienellä poistovoidetäplällä näytetään artikkelissa [ripsienpidennysten poisto ja huolto](lesson:mi-dam-thao)." },
      ],
    },
    {
      id: "ei-koskaan-vedeta",
      title: "Miksi ripsienpidennyksiä ei saa vetää, nyppiä eikä poistaa itse kotona",
      blocks: [
        { p: "Tämä on koko oppitunnin tärkein asia. Liima pitää pidennyksen tiukasti omassa ripsessä, joten pidennystä vetämällä vedät myös oman ripsen irti karvatupesta ennen aikojaan. Kun sama toistuu, karvatupet vaurioituvat: ripset kasvavat takaisin harvempina ja heikompina, joskus eivät ollenkaan." },
        { img: { src: img("thoi-quen-sai-tu-but-mi-noi-o-nha"), alt: "Vaaleahiuksinen asiakas rypistää kulmiaan peilin edessä ja vetää toisen silmän ripsienpidennyksiä paljain peukaloin ja etusormin", caption: "Esimerkkikuva huonosta tavasta: pidennysten vetäminen ja nyppiminen kotona. Jos ripsi häiritsee, tule salonkiin." } },
        { p: "Asiakas, joka nyppii ripsiään kotona, aiheuttaa saman vahingon. Kerro hyvin selvästi: vaikka ripsi tuntuisi häiritsevän, älä poista sitä itse, vaan tule salonkiin. Oikea poisto vie vain hetken, mutta väärin tehty poisto kotona voi viedä kokonaisen rivin omia ripsiä." },
        { h3: "Ripsienpidennysten poisto öljyllä: miksi ei" },
        { p: "Jotkut käyttävät öljyä, kuten öljyistä meikinpoistoainetta, liiman liuottamiseen silmän lähellä. Älä tee niin, ellei tuotteen valmistaja selvästi ohjeista. Öljy heikentää liimaa epätasaisesti ja on vaikea hallita, leviää helposti silmään ja jättää kalvon, jonka takia seuraava kiinnitys pitää huonosti." },
        { img: { src: img("dau-tay-trang-va-sua-rua-mat-tao-bot"), alt: "Käsi painaa meripihkanvärisen puhdistusöljypullon pumppua marmoritasolla, vieressä öljyyn kastettu vanulappu ja vaahtoavan kasvojenpuhdistusaineen pullo", caption: "Puhdistusöljy ei ole ripsien poistoaine. Päivittäin silmien ympärillä käytettynä se voi myös saada pidennykset irtoamaan aikaisin." } },
        { p: "Oikeita tapoja on vain yksi: pehmennä liima ammattikäyttöön tarkoitetulla poistoaineella ja liu'uta pidennys sitten varovasti pois." },
      ],
    },
    {
      id: "poistoaineet",
      title: "Voide-, geeli- ja nestemäiset ripsien poistoaineet",
      blocks: [
        {
          table: {
            head: ["Tyyppi", "Miten se käyttäytyy silmän lähellä"],
            rows: [
              ["Voide ja geeli", "Paksu, pysyy siinä mihin sen laitat, joten sitä on helpompi hallita"],
              ["Neste", "Valuu helpommin, vaatii suurta huolellisuutta"],
            ],
          },
        },
        { img: { src: img("chat-thao-mi-dang-kem-gel-va-long"), alt: "Kultareunainen marmoritarjotin, jolla purkki vaaleanpunaista poistovoidetta, purkki kirkasta geeliä, pieni pipettipullo, vanupuikkoja ja pinsetit", caption: "Voide-, geeli- ja nestemäinen ripsien poistoaine sekä kertakäyttöiset vanupuikot." } },
        { p: "Tyypistä riippumatta noudata valmistajan ohjetta siitä, paljonko ainetta laitetaan, kauanko odotetaan ja millä pyyhitään. Artikkelissa ei anneta vaikutusaikaa, koska jokainen tuote on erilainen." },
        { note: "Poistoainetta ei saa koskaan joutua silmään, ei poikkeuksia. Asiakkaan silmät ovat kiinni koko poiston ajan. Jos asiakasta kirvelee, lopeta heti, pyyhi poistoaine pois ja toimi kuten oppitunnilla [Vahinkotilanteet](lesson:xu-ly-su-co).", kind: "warn", title: "Poistoaineen sääntö" },
      ],
    },
    {
      id: "milloin-kaikki-pois",
      title: "Milloin ripsienpidennykset poistetaan kokonaan",
      blocks: [
        {
          ul: [
            "Ripset pysyvät huonosti, lähtevät laikuittain, eikä setti näytä hyvältä huolto toisensa jälkeen.",
            "Asiakas haluaa antaa ripsilleen tauon tai ei halua enää pidennyksiä.",
            "Asiakkaalla on reaktio käynnin jälkeen: punaiset, turvonneet tai kutisevat silmät. Poista kaikki ja neuvo häntä hakeutumaan lääkäriin.",
            "Monen peräkkäisen huollon jälkeen setti on sotkuinen ja epätasainen. Poisto ja uusi alku on parempi kuin väkisin tehty huolto.",
          ],
        },
        { p: "Liima-allergian oireet ja toimintaohjeet ovat oppitunnilla [Allergiat ja kemikaalit](lesson:di-ung-hoa-chat)." },
        { h3: "Omat ripset näyttävät poiston jälkeen harvemmilta kuin asiakas muistaa" },
        { p: "Kun setti on poistettu, asiakkaan omat ripset näyttävät yleensä harvemmilta ja lyhyemmiltä kuin hän muistaa. Syy ei ole poistossa: hän on tottunut näkemään pidennykset. Kerro tästä etukäteen ja lempeästi, jottei hän säikähdä peiliin katsoessaan." },
        { p: "Kaksi asiaa, joita et koskaan tee: poista settiä puoliksi ja jätä sitä siihen, tai neuvo asiakasta poistamaan ripsiä kotona öljyllä tai sormin. Jos hän haluaa ripset pois, kutsu hänet takaisin salonkiin." },
      ],
    },
    {
      id: "kotihoito",
      title: "Mitä kertoa asiakkaalle, jotta ripsienpidennykset kestävät pidempään",
      blocks: [
        { p: "Suurin osa ennenaikaisesta irtoamisesta johtuu kotitavoista. Kun asiakas hoitaa ripsiään hyvin, huollot ovat helpompia ja omat ripset terveempiä." },
        {
          ul: [
            "Ei hieromista eikä pidennysten nyppimistä.",
            "Öljyttömät tuotteet silmien ympärillä.",
            "Ripsien kevyt pesu ja harjaus joka päivä puhtaalla harjalla.",
            "Ei ripsitaivutinta eikä vedenkestävää ripsiväriä, koska sitä on hyvin vaikea poistaa.",
            "Nukkuminen selällään tai kevyesti kyljellään, ei kasvot tyynyä vasten.",
          ],
        },
        { img: { src: img("chai-mi-noi-moi-ngay-bang-choi-sach"), alt: "Vaaleahiuksinen asiakas kermanvärisessä silkkiaamutakissa seisoo marmorikylpyhuoneessa ja harjaa ripsienpidennyksiään puhtaalla ripsiharjalla", caption: "Ripset harjataan joka päivä puhtaalla harjalla." } },
        { img: { src: img("ngu-nam-ngua-de-giu-mi-noi"), alt: "Nainen nukkuu selällään samppanjanvärisellä silkkityynyllä silmät kiinni, ripsienpidennykset vapaina, vieressä silkkinen silmänaamio", caption: "Selällään nukkuminen estää ripsiä painumasta tyynyä vasten." } },
        { p: "Varaa asiakkaan seuraava [huoltoaika](lesson:lich-hen) VaraaAissa ennen kuin hän lähtee. Kotihoito-ohjeet voi lähettää hänelle vielä [viestinä](lesson:tin-nhan-ai), jotta hän voi lukea ne uudelleen tarvittaessa." },
        { note: "Artikkelin huoltovälit ovat tyypillisiä vaihteluvälejä ja vaihtelevat asiakkaittain. Poistoaineen tyyppi, määrä ja vaikutusaika noudattavat aina valmistajan ohjetta. Kauneuspalveluja ja -tuotteita koskevat säännöt vaihtelevat maittain; tämä on koulutusmateriaalia, ei ammattipätevyys.", kind: "info", title: "Huomio" },
      ],
    },
  ],
  faq: [
    {
      q: "Kuinka usein ripsienpidennykset huolletaan?",
      a: "Yleensä noin 2–3 viikon välein sen mukaan, kuinka nopeasti kunkin ripset lähtevät ja miten asiakas hoitaa niitä kotona. Jos väli venyy liian pitkäksi, pidennyksiä on jäljellä liian vähän, moni on kasvanut pitkäksi ja kiertynyt, ja huolto on lähes uusi setti. Jokainen salonki päättää itse, kuinka pitkä väli lasketaan vielä huolloksi.",
    },
    {
      q: "Voiko ripsienpidennykset poistaa itse kotona?",
      a: "Ei kannata. Pidennyksen vetäminen tai nyppiminen vetää oman ripsen irti karvatupesta, ja usein toistettuna ripset kasvavat takaisin harvempina ja heikompina, joskus eivät ollenkaan. Poistoa varten kannattaa palata salonkiin, jossa ripsistylisti pehmentää liiman ammattikäyttöön tarkoitetulla poistoaineella ja liu'uttaa pidennykset pois.",
    },
    {
      q: "Voiko ripsienpidennykset poistaa kookosöljyllä tai puhdistusöljyllä?",
      a: "Öljyä ei pidä käyttää silmien lähellä ripsiliiman liuottamiseen, ellei tuotteen valmistaja selvästi niin ohjeista. Se heikentää liimaa epätasaisesti, on vaikea hallita, leviää helposti silmään ja jättää kalvon, jonka takia seuraava setti pitää huonosti.",
    },
    {
      q: "Vahingoittaako ripsienpidennysten poisto omia ripsiä?",
      a: "Oikein tehdyssä poistossa liima pehmennetään ensin, jolloin pidennys liukuu irti omasta ripsestä eikä mitään vedetä. Poiston jälkeen omat ripset näyttävät usein harvemmilta ja lyhyemmiltä kuin asiakas muistaa, koska hän on tottunut pidennyksiin. Omat ripset vahingoittuvat, kun pidennyksiä vedetään, nykäistään tai nypitään irti.",
    },
    {
      q: "Milloin ripsienpidennykset kannattaa poistaa kokonaan huollon sijaan?",
      a: "Kun ripset pysyvät huonosti eikä huoltokaan tee setistä hyvää, kun asiakas haluaa tauon, kun setti on monen peräkkäisen huollon jälkeen sotkuinen ja epätasainen, tai kun asiakkaalla on reaktio, kuten punaiset, turvonneet tai kutisevat silmät. Reaktion jälkeen kaikki poistetaan ja asiakkaan kannattaa hakeutua lääkäriin.",
    },
    {
      q: "Miksi ripsienpidennykset lähtevät enemmän toisesta silmästä?",
      a: "Yleensä siksi, että asiakas nukkuu sillä kyljellä. Kokonaan puuttuva laikku ulkonurkassa voi johtua hieromisesta tai öljyisestä meikinpoistoaineesta. Jos ripsiä lähtee tasaisesti joka puolelta, ripsistylistin kannattaa tarkistaa liima, huoneen kosteus ja edellisen käynnin puhdistusvaihe.",
    },
  ],
  related: ["mi-dam-thao", "mi-classic-hieu-dung", "mi-chuan-bi-hieu-dung", "lash-lift-hieu-dung"],
};

export default article;
