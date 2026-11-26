import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/fill-mong/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "kynsien-huolto-ohje-geeli-ja-akryyli",
  lesson: "fill-mong",
  category: "nail",
  title: "Kynsien huolto vaihe vaiheelta: ohje geeli- ja akryylikynsille 10 vaiheessa",
  metaTitle: "Kynsien huolto ohje: geeli ja akryyli 10 vaiheessa",
  metaDescription:
    "Rakennegeeli- ja akryylikynsien huolto vaihe vaiheelta: irtoamien etsintä, vanhan tuotteen ohennus, sauman tasoitus, tartunta-aine ja apexin uudelleenrakennus.",
  keyword: "kynsien huolto ohje",
  keywords: ["geelikynsien huolto ohje", "akryylikynsien huolto", "rakennegeelin huolto vaihe vaiheelta", "kynsien täyttö", "irtoaman viilaus ennen huoltoa", "kynsien huolto aloittelijalle", "geelin ja akryylin huollon ero"],
  excerpt: "Muutaman viikon ikäisten rakennegeeli- tai akryylikynsien huolto: kymmenen vaihetta järjestyksessä, geelin ja akryylin erot, piilossa olevan irtoaman löytäminen ja vältettävät virheet.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-nail-dam-mong-cho-khach-tai-salon"),
    alt: "Tummahiuksinen, matalalle nutturalle hiuksensa sitonut kynsiteknikko mustissa käsineissä käsittelee vaaleahiuksisen asiakkaan kynsiä valkoisen kivipöydän ääressä kristallikruunun alla",
  },
  takeaways: [
    "Kolme asiaa pätee koko huollon ajan: **ei koskaan huoltoa irtoaman päälle**, ei viilausta omaan kynteen tai ihoon, ja apex rakennetaan oikeaan kohtaan.",
    "Tarkista jokainen kynsi hyvässä valossa kallistellen. Pieni irtoama näkyy usein vain **himmeänä viivana reunassa**.",
    "Ohenna vanha tuote ennen rakentamista, etenkin eteenpäin siirtynyt vanha apex.",
    "Tartuntakerros (pohjageeli, tartunta-aine tai primer) levitetään **vain uudelle kasvulle**, ja ihoon jätetään kapea rako.",
    "Varaa seuraava huolto ennen kuin asiakas lähtee: geelillä noin 3–4 viikkoa, akryylillä noin 2–3 viikkoa.",
  ],
  intro: [
    "Kynsien huolto ohjeen mukaan alkaa viilasta, ei geelipullosta tai akryylijauheesta. Asiakkaan kynnet ovat kasvaneet muutaman viikon: tyvessä on uutta kynttä, apex on siirtynyt eteenpäin, ja jossain voi olla irronnut reuna, jota on hyvin vaikea huomata. Nämä kolme asiaa hoidetaan ensin, ja vasta sitten on uuden tuotteen vuoro.",
    "Artikkeli seuraa VaraaAi Academyn Kynnet-kurssin oppituntia ”Geelin ja akryylin huolto: käytäntö vaihe vaiheelta”. Työtapa on sama rakennegeelille ja akryylille, ja kohdat, joissa ne eroavat, kerrotaan erikseen. Luettuasi osaat tehdä koko huollon ensimmäisestä tarkastuksesta seuraavan ajan varaamiseen.",
  ],
  sections: [
    {
      id: "kolme-periaatetta",
      title: "Kolme periaatetta ja kynnet, joita ei huolleta",
      blocks: [
        {
          ol: [
            "**Ei koskaan huoltoa irtoaman päälle.** Kaikki irronnut viilataan ensin pois.",
            "**Ei viilausta omaan kynteen tai ihoon.** Tyven uusi kasvu on vielä ohutta ja pehmeää.",
            "**Apex oikeaan kohtaan.** Korkein kohta palautetaan rasitusalueen päälle, kuten ensimmäisenä päivänä.",
          ],
        },
        { p: "Kaikkia ajalleen tulleita kynsiä ei voi huoltaa. Isot irronneet laikut, ilmataskut, värimuutokset tai kipeä, punoittava ja turvonnut kynsi tarkoittavat, ettei huoltoa tehdä: kaikki poistetaan tai asiakas ohjataan lääkäriin." },
        { img: { src: img("mong-ho-mang-lon-co-tui-khi-khong-dam"), alt: "Lähikuva kasvaneesta geelikynnestä, jonka geelin alla on iso hopeanvalkoinen ilmatasku lähes puolen kynnen kokoisena", caption: "Iso irronnut alue ja alla ilmatasku: nämä kynnet poistetaan kokonaan ja tehdään uudelleen, niitä ei huolleta." } },
        { p: "Jokaisen periaatteen syyt ja se, mitkä kynnet huolletaan ja mitkä poistetaan, kerrotaan teoria-artikkelissa [kynsien huoltoväli](lesson:fill-mong-hieu-dung). Kun kaikki pitää poistaa, toimi artikkelin [geelin oikea poisto](lesson:thao-gel) mukaan." },
      ],
    },
    {
      id: "geelin-ja-akryylin-ero",
      title: "Miten rakennegeelin huolto eroaa akryylin huollosta",
      blocks: [
        { p: "Kuusi ensimmäistä vaihetta ovat täsmälleen samat. Järjestelmät eroavat vasta tartuntakerroksessa ja rakentamisessa." },
        {
          table: {
            head: ["Työvaihe", "Rakennegeeli", "Akryyli"],
            rows: [
              ["Tartuntakerros uudelle kasvulle", "Merkin pohjageeli tai tartunta-aine; kovetus ohjeen mukaan", "Primer hyvin ohuesti taputellen, vain omalle kynnelle"],
              ["Rakentaminen", "Hyvin ohut kerros koko kynnelle, sitten pisara keskelle ja ohjaus tyveen, sivuille ja kärkeen", "Pieni, hieman märempi helmi tyven lähelle; sitten helmi rasitusalueelle"],
              ["Apexin muotoilu", "Sormi käännetään muutamaksi sekunniksi, jotta geeli kerääntyy", "Toinen helmi painetaan ja silitetään vanhaan tuotteeseen"],
              ["Kovettuminen", "Kovetus valmistajan suosittelema koko aika", "Valmistajan aika; koputus siveltimen varrella antaa kuivan naksahduksen"],
              ["Seuraava huolto", "Noin 3–4 viikkoa", "Noin 2–3 viikkoa"],
            ],
          },
        },
        { p: "Kummankin järjestelmän helmitekniikka käydään läpi omassa käytännön artikkelissaan: [rakennegeeli omille kynsille](lesson:builder-gel) ja [akryylikynnet vaihe vaiheelta](lesson:dap-bot-acrylic). Huollossa käytät täsmälleen samoja liikkeitä pienemmällä alueella." },
      ],
    },
    {
      id: "piilossa-oleva-irtoama",
      title: "Piilossa olevan irtoaman löytäminen ja sähköviila",
      blocks: [
        { p: "Pieni irtoama jää helposti huomaamatta, koska se näkyy usein vain himmeänä viivana tuotteen reunassa. Etsi sitä tyvestä ja molempien sivuseinien vierestä hyvässä valossa ja kallistele sormea puolelta toiselle, jotta valo liukuu kynnen pinnalla." },
        { note: "Kun olet viilannut irtoaman, kallista kynttä vielä kerran valossa. Himmeä valkoinen viiva reunassa tarkoittaa, että kohta on yhä irti: jatka viilaamista, älä peitä.", kind: "tip", title: "Tarkista uudelleen valossa" },
        { p: "Jos viilaat ja viilaat ja kohta on yhä irti, tai kokonainen alue on irronnut, lopeta. Nämä kynnet pitää poistaa kokonaan ja tehdä uudelleen. Älä nypi äläkä revi irronnutta osaa pois, koska se vie mukanaan oman kynnen kerroksia." },
        { note: "Käytä sähköviilaa vasta, kun olet saanut kunnollisen koulutuksen: kohtuullinen nopeus, terä aina tuotteen päällä eikä koskaan lähellä kynsinauhaa tai ihoa. Ennen koulutusta käytä käsiviilaa.", kind: "warn", title: "Sähköviila" },
      ],
    },
    {
      id: "yleisimmat-virheet",
      title: "Kynsien huollon yleisimmät virheet ja miten ne vältetään",
      blocks: [
        {
          table: {
            head: ["Virhe", "Seuraus", "Oikea työtapa"],
            rows: [
              ["Rakentaminen irtoaman päälle", "Kosteus ja lika jäävät loukkuun, ja uusi kerros irtoaa hyvin nopeasti", "Viilaa irtoama pois, kunnes reuna on kiinni ja tasoissa kynnen kanssa"],
              ["Vanhaa tuotetta ei ohenneta", "Apexille ei jää tilaa; kynnet paksuuntuvat ja raskastuvat joka huollossa", "Vähennä paksuutta, etenkin eteenpäin siirtyneestä vanhasta apexista"],
              ["Porras vanhan tuotteen ja uuden kasvun välissä jää", "Harjanne näkyy uuden kerroksen läpi", "Viilaa porras kevyesti ohueksi ja tasaiseksi, ettei sitä tunnu"],
              ["Tartunta-ainetta iholle tai koko kynnelle", "Tuote koskee ihoon, irtoaa helpommin ja voi aiheuttaa allergiaa", "Vain uudelle kasvulle; vanhalle tuotteelle vain, jos valmistaja niin ohjeistaa"],
              ["Iso ja paksu akryylihelmi tyvessä", "Paksu reuna ponnahtaa helposti irti", "Pieni helmi, joka painetaan hyvin ohueksi ihoa kohti koskematta siihen"],
            ],
          },
        },
      ],
    },
    {
      id: "huollon-jalkeen",
      title: "Huollon jälkeen: ohjeet asiakkaalle, siivous ja ajanvaraus",
      blocks: [
        { p: "Varaa seuraava huolto ennen kuin asiakas lähtee: geelillä noin 3–4 viikon, akryylillä noin 2–3 viikon päähän. Kerro, että jos kynsi irtoaa, sitä ei pidä nyppiä eikä repiä itse, vaan kannattaa tulla ajoissa takaisin salonkiin." },
        {
          ul: [
            "Käytetyt viilat, hiomapalat ja vanut kannelliseen roska-astiaan.",
            "Metalliset välineet puhdistetaan ja steriloidaan.",
            "Geelipullot ja akryyliastia suljetaan tiiviisti.",
          ],
        },
        { p: "VaraaAissa [luot erilliset palvelut](lesson:dich-vu) ”Geelin huolto” ja ”Akryylin huolto” salongin todellisilla kestoilla, jotta kalenteri ei mene päällekkäin, kun asiakkaat varaavat huoltoja itse. Seuraava huolto varataan tiskillä [ajanvarauskalenteriin](lesson:lich-hen). Herkästi irtoavat tai katkeavat kynnet merkitään [asiakastietoihin](lesson:khach-hang), jotta tiedät ensi kerralla, miten työtä kannattaa säätää." },
      ],
    },
  ],
  howTo: {
    title: "Kynsien huolto ohje: työvaiheet järjestyksessä",
    id: "kynsien-huollon-vaiheet",
    after: "kolme-periaatetta",
    lead: "Kymmenen vaihetta etenevät samassa järjestyksessä kuin oppitunnin video. Kuudessa ensimmäisessä käytetään vain viiloja, hiomapaloja ja puhdistuslappuja, ja juuri ne ratkaisevat, kestävätkö kynnet.",
    supplies: [
      "Steriloitu kynsinauhan työnnin",
      "Viilat, hienojakoinen hiomapala ja pölyharja",
      "Nukkaamattomat puhdistuslaput ja puhdistusneste",
      "Oikea tartuntakerros: geelimerkin pohjageeli tai tartunta-aine, tai akryylimerkin primer",
      "Rakennegeeli ja lamppu, tai akryylineste, -jauhe ja akryylisivellin",
      "Työpisteen kohdepoisto, hengityssuojain ja suojakäsineet",
      "Värigeeli halutessa, päällysgeeli ja kynsinauhaöljy",
    ],
    steps: [
      {
        name: "Konsultoi ja tarkasta",
        text: "Pese ja desinfioi omat ja asiakkaan kädet. Kysy, onko jokin kynsi katkennut, irronnut tai ollut kipeä viime viikkoina, ja katso sitten jokaista kynttä tarkasti hyvässä valossa sormea kallistellen. Isot irronneet laikut, ilmataskut, värimuutokset, kipu tai punoittava, turvonnut iho tarkoittavat, ettei huoltoa tehdä. Merkitse herkästi irtoavat tai katkeavat kynnet muistiin, jotta voit säätää työtä ensi kerralla.",
        image: { src: img("kiem-tra-mong-da-moc-duoi-anh-den"), alt: "Mustiin käsineisiin pukeutunut kynsiteknikko nostaa asiakkaan käden messinkisen pöytälampun alle ja kallistaa kasvaneita geelikynsiä tarkastellakseen niitä", caption: "Kallista jokaista kynttä lampun alla: pieni irtoama näkyy vain himmeänä viivana reunassa." },
      },
      {
        name: "Esikäsittele uusi kasvu",
        text: "Käsittele uutta kasvua kuin uutta kynttä ja esikäsittele se kuten [geelilakkauksessa](lesson:son-gel): kuiva työ ilman liotusta, kynsinauha kevyesti taakse ja uuteen kynteen kiinni jäänyt ohut ihokerros pois. Kuljeta hiomapalaa hyvin kevyesti vain uuden kasvun päällä kiillon poistamiseksi. Älä ohenna kynttä.",
        image: { src: img("day-da-tren-phan-mong-moi-moc"), alt: "Teräksinen kynsinauhan työnnin vinossa tyven uuden luonnonkynnen kaistaleen päällä, ja sen edessä vanha geelikerros" },
      },
      {
        name: "Viilaa irtoama pois",
        text: "Etsi tuotteen reuna tyvestä ja molempien sivuseinien vierestä. Missä tahansa on irronnut, viilaa kevyesti, kunnes irtoama on poissa ja jäljelle jäävä reuna on tiukasti kiinni ja tasoissa kynnen kanssa. Katso sitten vielä tarkasti lampun valossa. Älä nypi äläkä revi irronnutta osaa pois.",
      },
      {
        name: "Ohenna vanha tuote",
        text: "Aseta viila tasaisesti kynnen päälle ja vähennä paksuutta, etenkin eteenpäin siirtyneestä vanhasta apexista. Jos kynnet ovat kasvaneet liian pitkiksi, leikkaa ja viilaa ne lyhyemmiksi asiakkaan valitseman muodon säilyttäen. Tavoite on tasaisen ohut ja siisti vanha kerros, jotta uudelle kerrokselle jää tilaa rakentaa apex uudelleen. Älä viilaa vanhan kerroksen läpi omaan kynteen asti.",
      },
      {
        name: "Tasoita sauma",
        text: "Siinä, missä vanha tuote kohtaa uuden kasvun, on yleensä pieni porras. Viilaa sitä kevyesti, kunnes se ohenee ja on tasoissa uuden kynnen kanssa, eikä sormella enää tunnu harjannetta. Viilaa tasaisesti, kevyellä kädellä ja pidä viila poissa tyven iholta.",
        image: { src: img("duong-noi-lop-cu-va-mong-moi-da-dua-lien"), alt: "Lähikuva kynnestä, jonka vanha geeli on viilattu ohueksi ja mataksi, ja geelin reuna liittyy sileästi uuden luonnonkynnen kaistaleeseen ilman porrasta", caption: "Vaiheen 5 jälkeen: vanha tuote on ohut ja tasaisen matta, eikä uuden kasvun kohdalla ole porrasta." },
      },
      {
        name: "Puhdista",
        text: "Kohdepoisto on yhä päällä. Harjaa pöly pois puhaltamatta ja pyyhi koko kynsi nukkaamattomalla lapulla ja puhdistusnesteellä. Tästä eteenpäin et koske kynnen pintaan.",
        image: { src: img("lau-sach-mong-bang-bong-khong-xo"), alt: "Mustiin käsineisiin pukeutunut kynsiteknikko kietoo pienen taitetun nukkaamattoman lapun asiakkaan etusormen pään ympärille ja puhdistaa kynnen pinnan" },
      },
      {
        name: "Levitä tartuntakerros uudelle kasvulle",
        text: "Tartuntakerros levitetään vain uudelle omalle kynnelle, ja ihoon jätetään kapea rako. Vanhan tuotteen päälle sitä ei sivellä, ellei valmistaja niin ohjeista. Geelillä se on merkin pohjageeli tai tartunta-aine, ja se kovetetaan tai jätetään kovettamatta ohjeen mukaan. Akryylillä se on primer, jota taputellaan hyvin ohuesti vain omalle kynnelle.",
        image: { src: img("lop-bam-chi-tren-phan-mong-moi-moc"), alt: "Pienen siveltimen kärki levittää kiiltävän märän kaistaleen tartunta-ainetta tyven uudelle luonnonkynnelle, ja vanha geeli pysyy mattana", caption: "Vain uuden kasvun kaistale kiiltää. Tartuntakerroksen ja ihon väliin jää kapea rako." },
      },
      {
        name: "Rakenna ja palauta apex",
        text: "Rakennegeeli: hyvin ohut kerros koko kynnelle, jotta uusi geeli liittyy vanhaan, sitten pisara keskelle, ohjaus kevyesti tyveen hiuksenohuen raon päähän ihosta ja sieltä sivuille ja kärkeen. Käännä sormi muutamaksi sekunniksi, jotta geeli kerääntyy apexiksi, käännä takaisin, tarkista ja koveta koko aika; jos asiakas tuntee kuumotusta, hän ottaa käden hetkeksi pois ja kovetusta jatketaan. Akryyli: pieni, hieman märempi ensimmäinen helmi uudelle kasvulle tyven lähelle, painetaan hyvin ohueksi ihoa kohti koskematta siihen. Toinen helmi asetetaan rasitusalueelle ja silitetään vanhaan tuotteeseen apexin palauttamiseksi, minkä jälkeen akryylin annetaan kovettua.",
        image: { src: img("hat-builder-gel-o-giua-mong-khi-dam"), alt: "Litteä sivellin on juuri asettanut pyöreän rakennegeelipisaran hiotun kynnen keskelle, ja tyven uusi kasvu kiiltää pohjageelistä" },
      },
      {
        name: "Viimeistele viilaamalla",
        text: "Viilaa pinta sileäksi ja säilytä juuri rakentamasi apex. Siisti sivuseinät ja tasoita kärki. Tyvessä, missä uusi kerros ohenee, häivytä se omaan kynteen viilaamatta omaa kynttä ja koskematta ihoon. Harjaa pöly pois, puhdista ja tarkista ylhäältä, sivulta ja kärjestä: ohut tyvessä, sopivan korkea rasitusalueen päällä ja ohut kärjessä.",
      },
      {
        name: "Väri, päällysgeeli ja öljy",
        text: "Levitä väri ja päällysgeeli kuten geelilakkauksessa: ohuet kerrokset, kärjen reuna suljettuna ja kovetus koko aika. Tiputa öljyä jokaisen kynnen ympärille, hiero kevyesti ja varaa seuraava huolto.",
      },
    ],
  },
  faq: [
    {
      q: "Mitä vaiheita kynsien huoltoon kuuluu?",
      a: "Kymmenen vaihetta: konsultaatio ja tarkastus, uuden kasvun esikäsittely, irtoaman viilaus, vanhan tuotteen ohennus, sauman tasoitus, puhdistus, tartuntakerros uudelle kasvulle, rakentaminen ja apexin palautus, viimeistelyviilaus sekä väri, päällysgeeli ja öljy. Seuraava huolto varataan ennen kuin asiakas lähtee.",
    },
    {
      q: "Mihin pohjageeli tai primer levitetään huollossa?",
      a: "Vain kasvaneelle uudelle omalle kynnelle, ja ihoon jätetään kapea rako. Vanhan tuotteen päälle sitä ei sivellä, ellei valmistaja niin ohjeista. Tartuntakerros ei saa koskaan koskea ihoon.",
    },
    {
      q: "Pitääkö vanha geeli tai akryyli viilata ohuemmaksi ennen huoltoa?",
      a: "Pitää. Vanhaa tuotetta ohennetaan, etenkin eteenpäin siirtynyttä vanhaa apexia, jotta uudelle kerrokselle jää tilaa rakentaa apex rasitusalueen päälle. Vanhan kerroksen läpi ei kuitenkaan koskaan viilata omaan kynteen asti.",
    },
    {
      q: "Miten akryylin huolto eroaa geelin huollosta?",
      a: "Tartuntakerroksessa ja rakentamisessa. Akryylissä käytetään hyvin ohuesti taputeltua primeria omalle kynnelle, sitten pieni helmi tyven lähelle ja helmi rasitusalueelle, ja akryyli kovettuu ilmassa. Geelissä käytetään merkin pohjageeliä tai tartunta-ainetta, pisaraa kynnen keskellä, sormen kääntämistä apexia varten ja kovetusta lampussa.",
    },
    {
      q: "Mitä teen, jos irtoama ei lähde viilaamalla?",
      a: "Lopeta. Isoa irronnutta aluetta ei voi huoltaa, vaan kynnet poistetaan kokonaan ja tehdään uudelleen. Älä lisää tuotetta kohdan sulkemiseksi äläkä väännä irronnutta osaa irti, koska se vahingoittaa omaa kynttä.",
    },
    {
      q: "Voiko huollossa käyttää sähköviilaa?",
      a: "Vain, jos kynsiteknikko on saanut kunnollisen koulutuksen. Nopeus pidetään kohtuullisena, terä on koko ajan tuotteen päällä eikä sitä viedä lähelle kynsinauhaa tai ihoa. Ennen koulutusta käytetään käsiviilaa.",
    },
  ],
  related: ["fill-mong-hieu-dung", "builder-gel", "dap-bot-acrylic", "thao-gel"],
};

export default article;
