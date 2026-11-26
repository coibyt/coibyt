import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/xu-ly-su-co/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "ensiapu-kauneushoitolassa",
  lesson: "xu-ly-su-co",
  category: "safety",
  title: "Ensiapu kauneushoitolassa: vuotava haava, tuotetta silmässä, palovamma ja pyörtyminen",
  metaTitle: "Ensiapu kauneushoitolassa: haava, silmä, palovamma",
  metaDescription:
    "Ensiapu kauneushoitolassa: mitä teet ensimmäisen minuutin aikana, kun haava vuotaa, ripsiliimaa joutuu silmään, vaha polttaa tai asiakas pyörtyy, ja kirjaaminen.",
  keyword: "ensiapu kauneushoitolassa",
  keywords: [
    "ripsiliimaa silmässä",
    "vahan aiheuttama palovamma ensiapu",
    "asiakas pyörtyi vahauksessa",
    "salongin ensiapulaukku",
    "pistotapaturma kynsiteknikko",
    "vahinkotilanteen kirjaaminen",
    "kynsinauhapihdit viilsivät ihoa",
  ],
  excerpt: "Vahinkotilanteen ensimmäinen minuutti: vuotava haava, tuotetta silmässä, palovamma, pyörtyvä asiakas tai oma pistotapaturma. Ja mitä sen jälkeen tehdään.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-lam-dep-mo-hop-so-cuu-trong-salon"),
    alt: "Vaaleahiuksinen kauneudenhoitaja kermanvärisessä paidassa seisoo valkoisen kivitiskin ääressä ja avaa valkoista ensiapulaatikkoa, jossa on vihreä risti",
  },
  takeaways: [
    "Jokainen vahinkotilanne alkaa samalla tavalla: **keskeytä työ**, **pysy rauhallisena** ja soita ensin hätänumeroon 112, jos henki on vaarassa.",
    "Vuotava haava: puhtaat käsineet ja puhdas sideharso painettuna suoraan haavaan, kunnes vuoto tyrehtyy.",
    "Tuotetta silmässä: huuhtele heti kevyesti valuvalla puhtaalla vedellä **vähintään 20 minuuttia**, hakeudu sitten hoitoon ja ota tuotepullo mukaan.",
    "Lämpöpalovamma: viileää juoksevaa vettä vähintään 10 minuuttia, mieluiten 20. Ei jäätä, ei voiteita, öljyjä eikä hammastahnaa.",
    "Kerro sen jälkeen asiakkaalle rehellisesti, kirjaa tapahtuma samana päivänä ja täydennä ensiapulaukku.",
  ],
  intro: [
    "Ensiapu kauneushoitolassa on asia, jota kukaan ei halua tarvita, mutta joka alalla tarpeeksi kauan työskentelee, kohtaa sen: viilto, joka vuotaa, kemikaalipisara silmässä, asiakas, joka yhtäkkiä kalpenee ja pyörtyy. Sillä hetkellä kenelläkään ei ole aikaa avata kirjaa. Hyvin toimii se, joka on jo etukäteen käynyt mielessään läpi, mitä tekee ensimmäisen minuutin aikana.",
    "Artikkeli perustuu VaraaAi Academyn Hygienia ja turvallisuus -kurssin oppituntiin ”Vahinkotilanteet: verenvuoto, allergiset reaktiot, palovammat” ja käy läpi tilanteet yksi kerrallaan sekä sen, mitä tehdään, kun tilanne on rauhoittunut. Artikkeli ei korvaa ensiapukurssia. Jokaisessa liikkeessä tulisi olla ensiapukoulutettu henkilö.",
  ],
  sections: [
    {
      id: "kolme-ensimmaista-asiaa",
      title: "Kolme asiaa, jotka ovat samat jokaisessa vahinkotilanteessa",
      blocks: [
        {
          ol: [
            "**Keskeytä työ.** Älä yritä tehdä kynttä tai ripsiä valmiiksi.",
            "**Pysy rauhallisena.** Asiakas lukee kasvoiltasi, pitääkö hänen pelätä.",
            "**Jos henki on vaarassa, soita ensin hätänumeroon.** Suomessa ja koko Euroopan unionissa numero on 112.",
          ],
        },
        { note: "Hengitysvaikeus, huulten tai kasvojen turvotus, verenvuoto, joka ei tyrehdy, tai asiakas, joka ei virkoa: silloin soitetaan heti hätänumeroon eikä jäädä odottamaan, meneekö ohi. Ensiapuohjeet ja vahinkojen ilmoitussäännöt vaihtelevat maittain.", kind: "warn", title: "Milloin soitetaan heti 112" },
        { p: "Pidä hätänumero ja liikkeen osoite kirjoitettuna vastaanottotiskillä, jotta soittaja voi lukea ne heti eikä joudu muistelemaan." },
      ],
    },
    {
      id: "vuotava-haava",
      title: "Ihoon tuli haava ja siitä vuotaa verta",
      blocks: [
        { p: "Tämä on yleisin vahinkotilanne, ja sen aiheuttaa useimmiten kynsinauhapihti. Järjestys on: ensin asiakas, vasta sitten välineet." },
        {
          ol: [
            "Keskeytä ja vaihda puhtaat käsineet.",
            "Paina puhdasta sideharsoa suoraan haavaan ja pidä se paikallaan, kunnes vuoto tyrehtyy. Älä nosta sitä jatkuvasti katsoaksesi.",
            "Huuhtele haava puhtaalla vedellä, taputtele kuivaksi ja peitä.",
            "Neuvo asiakasta pitämään haava puhtaana ja kuivana ja käymään lääkärissä, jos se lähipäivinä turpoaa, punoittaa tai kipeytyy lisää.",
          ],
        },
        { img: { src: img("ep-gac-len-vet-cat-chay-mau-o-ngon-tay"), alt: "Mustiin käsineisiin pukeutunut kynsiteknikko painaa taiteltua valkoista sideharsoa asiakkaan sormenpään sivuun, vieressä avoin ensiapulaatikko", caption: "Paina sideharso suoraan haavaan ja pidä se paikallaan." } },
        { p: "Jos vuoto ei tyrehdy painamalla, soita hätänumeroon." },
        { h3: "Vasta sitten välineet" },
        {
          ul: [
            "Veren tahrima pinta desinfioidaan aina.",
            "Haavan aiheuttanutta välinettä ei käytetä, ennen kuin se on puhdistettu ja steriloitu oppitunnin [Välineet jokaisen asiakkaan jälkeen: työvaiheet](lesson:ve-sinh-dung-cu) mukaan.",
            "Kertakäyttöiset terät ja neulat laitetaan viiltävän jätteen astiaan.",
          ],
        },
        { img: { src: img("khu-khuan-mat-ban-va-hop-dung-vat-sac-nhon"), alt: "Mustaan käsineeseen puettu käsi pyyhkii kivipöytää desinfiointiliinalla, vieressä tarjotin käytettyjä pihtejä ja viiltävän jätteen astia" } },
      ],
    },
    {
      id: "tuotetta-silmassa",
      title: "Ripsiliimaa, väriä tai asetonia silmässä: mitä tehdä",
      blocks: [
        { p: "Kun silmään joutuu liimaa, väriä, asetonia tai desinfiointiainetta, tärkeintä on huuhdella heti ja pitkään. Kuivalla vanulla pyyhkiminen ja työn jatkaminen on väärä tapa toimia." },
        {
          ol: [
            "Anna puhtaan, haalean eikä kuuman veden valua kevyesti avoimen silmän yli koko ajan vähintään 20 minuuttia.",
            "Jos asiakkaalla on piilolinssit, pyydä häntä poistamaan ne, jos se onnistuu.",
            "Kiellä asiakasta hieromasta silmää. Hierominen pahentaa vauriota.",
            "Hakeudu heti hoitoon ja ota tuotepullo mukaan, jotta lääkäri voi lukea etiketin.",
          ],
        },
        { img: { src: img("rua-mat-khi-hoa-chat-ban-vao-mat"), alt: "Kermanvaaleaan kylpytakkiin pukeutunut asiakas kallistaa päätään pesualtaan yllä, kun mustiin käsineisiin pukeutunut hoitaja kaataa kevyen vesinoron hänen silmänsä yli", caption: "Vesi valuu kevyesti avoimen silmän yli, ja pää on kallistettu niin, että vesi valuu pois." } },
        { note: "Voimakkaan kemikaalin kohdalla jatka huuhtelua ja soita samalla hätänumeroon. Älä odota, että huuhtelu on valmis.", kind: "warn" },
        { h3: "Kun asiakas saa reaktion tuotteesta" },
        { p: "Jos asiakas tuntee hoidon aikana kutinaa, kirvelyä, punoitusta tai turvotusta, keskeytä, poista tuote hyvin varovasti ja huuhtele runsaalla vedellä. Vaaran merkkejä ovat hengitysvaikeus, käheä ääni, huulten tai kasvojen turvotus ja huimaus. Jos näet niitä, soita heti hätänumeroon. Kysy, onko asiakkaalla mukana adrenaliinikynä, auta hänet asentoon, jossa hengittäminen on helpointa, ja pysy hänen luonaan. Syistä ja ehkäisystä kerrotaan oppitunnilla [Allergiat ja kemikaalit](lesson:di-ung-hoa-chat)." },
      ],
    },
    {
      id: "palovammat",
      title: "Vahan aiheuttama palovamma, kemikaalipalovamma ja polttava kynsi lampussa",
      blocks: [
        { p: "Kauneushoitolan palovammoilla on kolme lähdettä: liian kuuma vaha tai väline, kemikaalit kuten vaalennus- tai permanenttiaine, joka polttaa hiuspohjaa, sekä kynsi, joka kuumenee geelilampun alla." },
        { h3: "Lämpöpalovamma: viileää juoksevaa vettä heti" },
        { p: "Pidä palovammaa viileän juoksevan veden alla. Nykyisten ensiapuohjeiden mukaan vähintään 10 minuuttia, mieluiten 20. Tasainen viileä vesi vie lämmön pois ihosta. Ota sormukset ja rannekorut pois palovamman läheltä ennen kuin alue turpoaa. Suomen Punaisen Ristin ohje palovammojen ensiavusta on [punainenristi.fi-sivustolla](https://www.punainenristi.fi/ensiapu/ensiapuohjeet/palovammat/)." },
        { img: { src: img("xa-nuoc-mat-len-vet-bong-sap-wax"), alt: "Mustaan käsineeseen puettu käsi tukee asiakkaan kyynärvartta viileän hanan alla, ja vesi valuu ranteen sisäpuolella olevan pienen punaisen läiskän yli" } },
        {
          table: {
            head: ["Tee näin", "Älä tee"],
            rows: [
              ["Viileää juoksevaa vettä vähintään 10 minuuttia, mieluiten 20", "Älä laita jäätä"],
              ["Ota sormukset ja rannekorut pois ennen turvotusta", "Älä levitä voidetta, öljyä tai hammastahnaa"],
              ["Aseta jäähdytyksen jälkeen puhdas tuorekelmu löysästi päälle", "Älä puhkaise rakkuloita äläkä kiedo kelmua tiukasti raajan ympäri"],
            ],
          },
        },
        { img: { src: img("che-vet-bong-bang-mang-boc-thuc-pham"), alt: "Mustiin käsineisiin pukeutunut hoitaja asettaa läpinäkyvän tuorekelmun löysästi asiakkaan valkoisen pyyhkeen päällä lepäävälle kyynärvarrelle", caption: "Tuorekelmu asetetaan löysästi palovamman päälle eikä sitä kiedota käsivarren ympäri." } },
        { h3: "Milloin palovamman kanssa mennään lääkäriin" },
        {
          ul: [
            "Rakkulainen palovamma on asiakkaan omaa kämmentä suurempi.",
            "Palovamma on syvä.",
            "Palovamma on kasvoissa tai nivelen kohdalla.",
            "Aina, kun palovamman on aiheuttanut kemikaali.",
          ],
        },
        { h3: "Kemikaalia iholla ja kuumotus lampussa" },
        { p: "Kun iholla on kemikaalia, huuhtele runsaalla vedellä pitkään, ota pois kemikaaliin kastunut pyyhe tai vaate äläkä laita iholle mitään. Kun asiakas sanoo, että geelilampun alla polttaa, anna hänen ottaa käsi heti pois. Polttava tunne on merkki siitä, että geelikerros on liian paksu tai kynsi on ohentunut." },
      ],
    },
    {
      id: "pyortyminen",
      title: "Asiakas pyörtyy vahauksessa tai noustessaan",
      blocks: [
        { p: "Pyörtyminen on yleistä vahauksessa, kun joku nousee liian nopeasti pitkän makuulla olon jälkeen, ja asiakkailla, jotka pelkäävät verta. Yleensä siitä on ennusmerkkejä: asiakas sanoo, että huimaa, kalpenee tai alkaa hikoilla." },
        {
          ol: [
            "Auta asiakas heti makuulle, ennen kuin hän kaatuu.",
            "Nosta jalat koholle.",
            "Löysää kaulusta ja avaa ikkuna raitista ilmaa varten.",
            "Kun asiakas virkoaa, anna hänen levätä vielä hetki makuulla ja nousta sitten hyvin hitaasti istumaan.",
          ],
        },
        { img: { src: img("khach-xiu-nam-ke-cao-hai-chan"), alt: "Asiakas makaa selällään tasaisella hoitosängyllä jalat kahden tyynyn päällä koholla, kermanväriseen paitaan pukeutunut hoitaja seisoo vieressä ja ikkuna on auki" } },
        { p: "Useimmat virkoavat alle minuutissa. Jos asiakas ei herää minuutin kuluessa, hengittää poikkeavasti, kouristelee tai hänellä on rintakipua, soita hätänumeroon." },
      ],
    },
    {
      id: "pistotapaturma",
      title: "Kun asiakkaalle käytetty väline pistää tai viiltää sinua",
      blocks: [
        { p: "Pientäkään pistosta juuri asiakkaalle käytetyistä pihdeistä ei pidä kuitata olankohautuksella. Jotkin taudit tarttuvat veren välityksellä, ja ennaltaehkäisevä hoito tehoaa vain ajoissa aloitettuna." },
        {
          ol: [
            "Anna haavan vuotaa kevyesti juoksevan veden alla. Älä purista voimakkaasti äläkä ime haavaa.",
            "Pese saippualla ja runsaalla vedellä ja peitä haava.",
            "Ilmoita heti salongin omistajalle.",
            "Ota samana päivänä yhteys lääkäriin tai työterveyshuoltoon.",
          ],
        },
        { p: "Desinfiointiaineen suihkauttaminen ja asian unohtaminen on väärä tapa toimia. Siitä, voitko jatkaa asiakastöitä haava kädessä, kerrotaan oppitunnilla [Milloin asiakasta ei hoideta](lesson:khi-nao-khong-lam)." },
      ],
    },
    {
      id: "ensimmaisen-minuutin-jalkeen",
      title: "Ensimmäisen minuutin jälkeen: rehellisyys, kirjaaminen ja ensiapulaukku",
      blocks: [
        { h3: "Kerro asiakkaalle totuus" },
        { p: "Kerro, mitä tapahtui, mitä teit ja mitä asiakkaan kannattaa seurata. Pahoittele vilpittömästi, älä syyttele ketään äläkä salaa mitään." },
        { h3: "Kirjaa tapahtuma samana päivänä" },
        { p: "Kirjaukseen tulevat päivämäärä ja kellonaika, kuka teki palvelun, mitä tapahtui, tuote ja sen eränumero, miten toimit ja mitä neuvoit asiakkaalle. Kerro sitten omistajalle, joka selvittää, onko asiasta ilmoitettava vakuutusyhtiölle tai viranomaiselle paikallisten sääntöjen mukaan." },
        { img: { src: img("ghi-bien-ban-su-co-trong-ngay"), alt: "Käsi kirjoittaa kultaisella kynällä kivipöydällä avoinna olevaan kermanväriseen muistikirjaan, vieressä pieni valkoinen ensiapulaatikko" } },
        { p: "Kirjaa VaraaAissa asiakasprofiilin sisäisiin muistiinpanoihin, että vahinko sattui ja mitä neuvoit; muistiinpanot näkyvät vain salongille. Katso oppitunti [Asiakasrekisteri](lesson:khach-hang). Varsinainen tapahtumaraportti säilytetään omistajan määräämässä paikassa." },
        { h3: "Mitä liikkeen ensiapulaukussa pitää olla" },
        {
          ul: [
            "Erikokoisia laastareita, steriilejä sideharsotaitoksia, siderullia ja teippiä.",
            "Silmälappuja.",
            "Kertakäyttökäsineet ja sakset.",
            "Keittosuolaliuosta silmien ja haavojen huuhteluun.",
            "Ensiapuohje.",
          ],
        },
        { img: { src: img("tui-so-cuu-cua-tiem-lam-dep"), alt: "Ensiapulaukun sisältö levitettynä kivitasolle: erikokoisia laastareita, sideharsoa, siderulla, teippiä, silmälappuja, sakset, käsineet ja keittosuolaliuosampulleja" } },
        { p: "Älä säilytä laukussa tabletteja tai lääkkeitä. Pidä laukku paikassa, jonka kaikki tietävät, tarkista säännöllisesti, mitä on loppunut tai vanhentunut, ja täydennä heti jokaisen käytön jälkeen." },
        { h3: "Useimmat vahingot voi ehkäistä" },
        {
          ul: [
            "Kokeile vahan lämpö omaan ranteeseesi ennen kuin se koskee asiakkaaseen.",
            "Suojaa asiakkaan silmät huolellisesti, kun käsittelet kemikaaleja kasvojen lähellä.",
            "Älä kiirehdi äläkä katso puhelinta kesken työn.",
          ],
        },
        { img: { src: img("thu-nhiet-do-sap-wax-len-co-tay"), alt: "Mustaan käsineeseen puettu käsi pitää kultaista vahaa kantavaa puulastaa ja kokeilee sitä paljaan ranteen sisäpintaan lämpimän vahanlämmittimen vieressä", caption: "Kokeile vaha omaan ranteeseesi ennen jokaista levitystä asiakkaalle." } },
        { p: "Käy ensiapukurssi ja kertaa taidot muutaman vuoden välein. Turvallisesta vahaustekniikasta on oma oppituntinsa, [Vahaus: vaihe vaiheelta](lesson:spa-waxing)." },
      ],
    },
  ],
  faq: [
    {
      q: "Mitä teen, jos kynsinauhapihdit viilsivät asiakkaan ihoa ja siitä vuotaa verta?",
      a: "Keskeytä, vaihda puhtaat käsineet, paina puhdasta sideharsoa suoraan haavaan ja pidä paikallaan, kunnes vuoto tyrehtyy. Huuhtele sitten puhtaalla vedellä, taputtele kuivaksi ja peitä. Desinfioi veren tahrimat pinnat ja anna väline puhdistukseen ja sterilointiin ennen uutta käyttöä. Jos vuoto ei tyrehdy painamalla, soita hätänumeroon.",
    },
    {
      q: "Mitä tehdä, kun ripsiliimaa joutuu silmään?",
      a: "Huuhtele heti: anna puhtaan, ei kuuman veden valua kevyesti avoimen silmän yli koko ajan vähintään 20 minuuttia. Älä hiero silmää, ja poista piilolinssit, jos se onnistuu. Hakeudu sitten heti hoitoon ja ota liimapullo mukaan, jotta lääkäri voi lukea etiketin.",
    },
    {
      q: "Laitetaanko vahan aiheuttamaan palovammaan jäätä tai hammastahnaa?",
      a: "Ei. Jäähdytä palovammaa viileällä juoksevalla vedellä vähintään 10 minuuttia, mieluiten 20. Ei jäätä, ei voiteita, öljyjä eikä hammastahnaa, eikä rakkuloita puhkaista. Jäähdytyksen jälkeen palovamman päälle asetetaan löysästi puhdas tuorekelmu.",
    },
    {
      q: "Miksi kynsiä polttaa geelilampun alla?",
      a: "Polttava tunne on merkki siitä, että geelikerros on liian paksu tai kynsi on ohentunut. Anna asiakkaan ottaa käsi heti pois lampusta ja levitä seuraavalla kerralla ohuemmat kerrokset.",
    },
    {
      q: "Miten autan asiakasta, joka pyörtyy salongissa?",
      a: "Auta hänet heti makuulle, nosta jalat koholle, löysää kaulusta ja päästä raitista ilmaa sisään. Useimmat virkoavat alle minuutissa; anna levätä ja nousta hitaasti istumaan. Jos asiakas ei herää minuutin kuluessa, hengittää poikkeavasti, kouristelee tai hänellä on rintakipua, soita hätänumeroon.",
    },
    {
      q: "Pitääkö kynsiteknikon mennä lääkäriin, jos asiakkaalle käytetyt pihdit viiltävät omaa sormea?",
      a: "Pitää. Anna haavan vuotaa kevyesti juoksevan veden alla puristamatta voimakkaasti tai imemättä, pese saippualla ja runsaalla vedellä ja peitä. Ilmoita omistajalle ja ota samana päivänä yhteys lääkäriin tai työterveyshuoltoon, koska veriteitse tarttuvien tautien estohoito tehoaa vain ajoissa aloitettuna.",
    },
  ],
  related: ["di-ung-hoa-chat", "khi-nao-khong-lam", "ve-sinh-dung-cu", "ve-sinh-tiem"],
};

export default article;
