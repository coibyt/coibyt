import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/mong-co-can-tho/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "tarvitsevatko-kynnet-hengittaa",
  lesson: "mong-co-can-tho",
  category: "tips",
  title: "Tarvitsevatko kynnet hengittää? Totuus tauosta geelikynsien välissä",
  metaTitle: "Tarvitsevatko kynnet hengittää? Milloin tauko geelistä",
  metaDescription:
    "Tarvitsevatko kynnet hengittää geelien välissä? Mikä kynsiä oikeasti vahingoittaa, milloin lopettaa ja kysyä lääkäriltä ja miten kynnet pysyvät kunnossa.",
  keyword: "tarvitsevatko kynnet hengittää",
  keywords: [
    "tarvitsevatko kynnet taukoa geelin välissä",
    "voiko geelikynsiä pitää jatkuvasti",
    "milloin kynsille tauko",
    "heikot kynnet geelin jälkeen",
    "geelikynnet ja kynsisieni",
    "kynsien hoito geelikynsien kanssa",
  ],
  excerpt: "Kynsi ei hengitä, joten ”hengähdystauko” ei tee kynsistä terveempiä. Kynsiä heikentää poisto- ja viilaustapa, ja joskus tauko on todella paikallaan.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-nail-soi-mong-khach-bang-den-lup"),
    alt: "Mustaan pukeutunut kynsiteknikko mustissa käsineissä tutkii asiakkaan kynsiä tarkasti pyöreän suurennuslampun läpi marmoripöydän ääressä tyylikkäässä salongissa",
  },
  takeaways: [
    "**Kynsi ei hengitä.** Näkyvä osa on keratiinia, eikä se tarvitse ilmaa.",
    "Kynsi saa ravintonsa **kynnen juuresta ihon alta** verisuonten kautta.",
    "Kynsiä ohentavat **geelin repiminen, liian kova viilaus ja väärä poistotapa**.",
    "Pidä tauko, jos kynsi on **hyvin ohut, kipeä, oudon värinen tai epäilet sieni-infektiota**, ja kysy lääkäriltä tai apteekista ennen kuin jatkat.",
    "Oikein tehtynä, **öljyllä joka päivä ja salongissa tehdyllä poistolla**, geeliä voi käyttää jatkuvasti, ja kynnet pysyvät kunnossa.",
  ],
  intro: [
    "Tarvitsevatko kynnet hengittää, ja pitäisikö ne jättää muutaman geelikerran jälkeen hetkeksi paljaiksi ”hengittämään”? Tämän neuvon moni kuulee ystäviltä ja sukulaisilta. Lyhyt vastaus: kynsi ei hengitä. Se ei kuitenkaan tarkoita, ettei kynsi koskaan tarvitsisi taukoa. Se tarvitsee sitä muista syistä, ja oikean syyn tunnistaminen on se, mikä pitää kynnet terveinä.",
    "Artikkeli perustuu VaraaAi Academyn kurssin ”Moja Beauty: ripset, kynnet ja kulmat” oppituntiin ”Tarvitsevatko kynnet hengähdystauon geelien välissä?”. Kurssi on lyhyitä asiakasvideoita helsinkiläiseltä Moja Beauty -salongilta. Luettuasi tiedät, mistä kynsi saa ravintonsa, mikä sitä oikeasti vahingoittaa, milloin kannattaa lopettaa ja miten hoidat kynsiä käyntien välissä.",
  ],
  sections: [
    {
      id: "kynsi-ei-hengita",
      title: "Fakta: kynsi ei hengitä",
      blocks: [
        { p: "Kynnen kovaa osaa, jonka näet ja jota lakataan, kutsutaan kynsilevyksi. Se on keratiinia, monta ohutta kerrosta päällekkäin, eikä se tarvitse ilmaa. Geelikerros sen päällä ei ”tukahduta” sitä." },
        { p: "Kynsi saa ravintonsa kynnen juuresta, joka on piilossa ihon alla kynnen tyvessä. Siellä verisuonet tuovat ravinteita, ja siellä syntyy uutta kynttä, joka työntyy vähitellen kohti sormenpäätä. Siksi se, kasvaako kynsi vahvana vai heikkona, ei riipu siitä, onko sen pinta paljaana." },
        { img: { src: img("mat-cat-dau-ngon-tay-goc-mong-va-mach-mau"), alt: "Piirroskuva sormenpään pitkittäisleikkauksesta: kynsilevy päällimmäisenä, ihopoimun alle piiloutuva kynnen juuri ja sen alla verisuonet", caption: "Kynsilevy on päällimmäisenä. Kynsi saa ravintonsa ihon alla olevasta juuresta verisuonten kautta." } },
        { note: "Kynsien pitäminen paljaina muutaman viikon ajan ei tee niistä ”terveempiä” siinä mielessä kuin moni ajattelee. Jos kynnet näyttävät tauon jälkeen paremmilta, syy on yleensä se, että vaurioitunut osa on kasvanut ulos ja leikattu pois, tai se, ettei kynsiä enää poisteta väärin.", kind: "info", title: "Mitä hengähdystauko sitten tekee?" },
      ],
    },
    {
      id: "mika-oikeasti-vahingoittaa",
      title: "Mikä oikeasti heikentää kynsiä geelin jälkeen",
      blocks: [
        { p: "Kun kynnet ohenevat geelikauden jälkeen, syy on menetetyissä kerroksissa, ei ilman puutteessa. Nämä kolme ovat yleisimmät:" },
        {
          table: {
            head: ["Mitä tapahtuu", "Mitä se tekee kynnelle"],
            rows: [
              ["Geelin repiminen itse", "Geeli vie mukanaan uloimman keratiinikerroksen"],
              ["Liian kova pinnan viilaus", "Jokainen käynti vie uuden kerroksen"],
              ["Väärä poistotapa", "Raapiminen tai hiominen ennen kuin geeli pehmenee ohentaa kynttä"],
            ],
          },
        },
        { img: { src: img("cha-nham-nhe-mat-mong-truoc-khi-son-gel"), alt: "Mustiin käsineisiin pukeutunut kynsiteknikko hioo kevyesti asiakkaan oman kynnen pintaa valkoisella hiomapalalla, taustalla geelilamppu", caption: "Ennen geeliä hionnalla poistetaan vain kiilto. Kovempi hionta ei paranna tarttuvuutta, se vain ohentaa kynttä." } },
        { p: "Ohentunut kynsi ei paksunna itsestään, vaan on odotettava, että uusi kynsi kasvaa esiin. Sormen kynsi kasvaa noin 3 mm kuukaudessa, ja kokonaan uuteen kynteen menee noin 4–6 kuukautta. Artikkelista [mitä geelilakan repiminen tekee kynsille](lesson:tu-cay-son-gel) näet, miltä kynsi näyttää repimisen jälkeen." },
        { img: { src: img("mong-mong-tach-lop-o-dau-mong"), alt: "Lähikuva lyhyestä ja ohuesta omasta kynnestä, jonka kärki on lohkeillut ja hieman valkoinen, kynsiteknikon mustakäsineisen käden päällä" } },
        { p: "Jos kynsi sen sijaan näyttää hieman valkoiselta ja kuivalta heti oikein tehdyn poiston jälkeen, se on yleensä vain poistoaineen tilapäisesti kuivattama. Muutaman päivän kynsiöljy, ja kuivuus helpottaa." },
        { img: { src: img("mong-trang-kho-sau-khi-thao-gel"), alt: "Lähikuva omasta kynnestä juuri geelin poiston jälkeen, pinta hieman valkoinen ja kuiva, kynsiteknikon mustakäsineisten sormien päällä", caption: "Valkoinen ja kuiva poiston jälkeen: yleensä tilapäistä kuivumista, ei vauriota." } },
      ],
    },
    {
      id: "milloin-tauko",
      title: "Milloin kynsille kannattaa pitää tauko",
      blocks: [
        { p: "Kynnet eivät tarvitse taukoa hengittääkseen, mutta joskus geelin käyttö kannattaa lopettaa hetkeksi. Silloin, kun kynnessä on ongelma:" },
        {
          ul: [
            "Kynsi on **hyvin ohut**, pehmeä ja taipuu kevyestä painalluksesta.",
            "Kynsi tai sen ympärysiho on **kipeä**.",
            "Kynsi on **oudon värinen**: kellertävä, vihertävä tai ruskehtava, tai siinä on outoja juovia.",
            "**Epäilet sieni-infektiota**, tai kynsi irtoaa kynsipedistä.",
          ],
        },
        { img: { src: img("mong-doi-mau-can-hoi-bac-si"), alt: "Lähikuva omasta kynnestä, joka kellertää kärjestä ja näyttää irtoavan kynsipedistä, kynsiteknikon mustakäsineisen käden päällä", caption: "Värjäytynyt, kynsipedistä irtoava kynsi: lopeta ja kysy lääkäriltä tai apteekista." } },
        { note: "Jos kynsissäsi näkyy jokin näistä merkeistä, kysy lääkäriltä tai apteekista ennen kuin jatkat. Kynsiteknikko ei tee diagnooseja, ja huolellinen salonki kieltäytyy käsittelemästä ongelmakynttä, kunnes se on tutkittu.", kind: "warn", title: "Kysy ensin lääkäriltä" },
        { p: "Tauon aikana pidä kynnet lyhyinä, jotta ohuet kynnet katkeavat vähemmän, levitä kynsiöljyä joka päivä ja odota, että uusi kynsi kasvaa esiin. Kun kynnet ovat taas kunnossa tai lääkäri antaa luvan, voit palata tavalliseen rytmiin." },
      ],
    },
    {
      id: "terveet-kynnet-geelin-kanssa",
      title: "Geeliä jatkuvasti, kynnet silti kunnossa",
      blocks: [
        { p: "Oppitunti tiivistää asian lyhyesti: oikein tehtynä geelejä voi käyttää jatkuvasti, ja kynnet pysyvät kunnossa. ”Oikein” tarkoittaa muutamaa yksinkertaista tapaa:" },
        {
          ol: [
            "**Levitä kynsiöljyä joka päivä** kynteen ja sen ympärysihoon, myös silloin kun kynsissä on geeli.",
            "**Poistata geeli salongissa**: ensin pehmennetään, sitten irrotetaan kevyesti, ei repimistä eikä raapimista.",
            "**Älä käytä kynsiä työkaluina**, ja käytä hanskoja pitkissä märissä töissä.",
            "**Huollata ajallaan**, jottei geeli siirry kohti kärkeä ja tee kynnestä helposti katkeavaa.",
          ],
        },
        { img: { src: img("nho-dau-duong-quanh-mong-son-gel"), alt: "Mustiin käsineisiin pukeutunut kynsiteknikko tiputtaa kullankeltaisen tipan kynsiöljyä asiakkaan punaisen geelikynnen tyven iholle käsityynyn päällä" } },
        { p: "Jos kyntesi ovat luonnostaan ohuet ja katkeilevat usein, kysy kynsiteknikolta BIABista: rakennegeelikerros estää kynttä taipumasta joka päivä. Artikkeli [geelilakka vai BIAB](lesson:gel-biab-bot-gelx) selittää eron. Tavat, jotka irrottavat geeliä aikaisin ja houkuttelevat repimään, löydät artikkelista [5 tapaa, joiden takia geelikynnet irtoavat](lesson:5-thoi-quen-gel-bong)." },
      ],
    },
    {
      id: "kysy-salongista",
      title: "Kysy salongista ennen seuraavaa kertaa",
      blocks: [
        { p: "Etkö ole varma, ovatko kyntesi kunnossa vai pitäisikö pitää tauko? Ota kynsistäsi kuva ja [lähetä salongille viesti](lesson:chat-voi-salon) ensin, ja [varaa aika netissä](lesson:dat-lich-online), kun asia on selvä. Tämä oppitunti tulee Moja Beautysta Helsingistä, ja sen palvelut näet ja ajan varaat [Moja Beautyn varaussivulta](/b/moja-beauty). Kynsiteknikon näkökulmasta artikkeli [ohuet kynnet geelin poiston jälkeen](lesson:thao-gel-hieu-dung) kertoo tarkemmin, miksi kynnet ohenevat ja milloin asiakkaalle kannattaa suositella taukoa." },
      ],
    },
  ],
  faq: [
    {
      q: "Tarvitsevatko kynnet hengittää?",
      a: "Eivät. Kynnen näkyvä osa on keratiinia, eikä se tarvitse ilmaa. Kynsi saa ravintonsa ihon alla olevasta juuresta verisuonten kautta, joten geeli pinnalla ei vie kynneltä ilmaa.",
    },
    {
      q: "Tarvitsevatko kynnet taukoa geelikynsien välissä?",
      a: "Eivät, jos kynnet ovat terveet ja geeli laitetaan ja poistetaan oikein. Pidä tauko, kun kynsi on hyvin ohut, kipeä, oudon värinen tai epäilet sieni-infektiota, ja kysy silloin lääkäriltä tai apteekista ennen kuin jatkat.",
    },
    {
      q: "Voiko geelikynsiä pitää jatkuvasti?",
      a: "Oikein tehtynä geeliä voi käyttää jatkuvasti, ja kynnet pysyvät kunnossa. Tärkeintä on poistattaa geeli salongissa, olla repimättä sitä, välttää liian kovaa pinnan viilausta ja levittää kynsiöljyä joka päivä käyntien välissä.",
    },
    {
      q: "Miksi kynnet ovat heikot ja ohuet geelin jälkeen?",
      a: "Kynnet ohenevat, koska niistä on lähtenyt kerroksia, ei siksi, että niiltä puuttuisi ilmaa. Yleisimmät syyt ovat geelin repiminen, liian kova pinnan viilaus ja väärä poistotapa. Ohentunut kynsi vahvistuu vasta, kun uusi kynsi kasvaa esiin.",
    },
    {
      q: "Voiko geelikynnet laittaa, jos epäilee kynsisientä?",
      a: "Ei kannata. Jos kynsi on oudon värinen tai paksuuntunut tai epäilet sieni-infektiota, lopeta ja kysy ensin lääkäriltä tai apteekista. Palaa geeliin vasta, kun kynsi on tutkittu ja sinulle on sanottu, että se on kunnossa.",
    },
  ],
  related: ["tu-cay-son-gel", "5-thoi-quen-gel-bong", "gel-biab-bot-gelx", "thao-gel-hieu-dung"],
};

export default article;
