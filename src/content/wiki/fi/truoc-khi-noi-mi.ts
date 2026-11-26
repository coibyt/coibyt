import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/truoc-khi-noi-mi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "mita-ei-saa-tehda-ennen-ripsienpidennyksia",
  lesson: "truoc-khi-noi-mi",
  category: "tips",
  title: "Mitä ei saa tehdä ennen ripsienpidennyksiä: 3 vältettävää asiaa ja näin valmistaudut ripsiaikaan",
  metaTitle: "Mitä ei saa tehdä ennen ripsienpidennyksiä? 3 asiaa",
  metaDescription:
    "Ennen ripsienpidennyksiä jätä väliin ripsiväri, runsas kahvi ja öljyinen silmänympärysvoide. Lisäksi vinkit, joilla makaat rennosti ja ripset kestävät pidempään.",
  keyword: "mitä ei saa tehdä ennen ripsienpidennyksiä",
  keywords: ["ripsiväri ennen ripsienpidennyksiä", "kahvi ennen ripsiaikaa", "piilolinssit ja ripsienpidennykset", "kauanko ripsienpidennysten laitto kestää", "ensimmäiset ripsienpidennykset vinkit", "silmänympärysvoide ennen ripsiaikaa"],
  excerpt: "Ei ripsiväriä, ei paljon kahvia, ei öljyistä voidetta: kolme pientä asiaa ennen käyntiä ratkaisee, kuinka kauan pidennykset kestävät ja kuinka rento käynti on.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-nam-thu-gian-tren-giuong-truoc-khi-noi-mi"),
    alt: "Asiakas makaa rentona kermanvärisellä sängyllä ohuen peiton alla suojatyynyt silmien alla, ja mustiin käsineisiin pukeutunut tekijä asettelee peittoa studiossa",
  },
  takeaways: [
    "**Älä käytä ripsiväriä tai rajausta** ennen käyntiä: meikki ripsissä estää liimaa tarttumasta.",
    "**Älä juo paljon kahvia** juuri ennen ripsiaikaa: makaat paikallasi noin 90 minuuttia, ja levottomana silmät räpyttelevät.",
    "**Älä levitä öljyistä silmänympärysvoidetta tai öljyä** silmien ympärille: öljy ripsissä heikentää liiman tarttumista, ja pidennykset irtoavat aikaisin.",
    "Ota piilolinssit pois, käy vessassa ennen aloitusta ja ota kuulokkeet mukaan.",
    "Jos silmäsi ovat punaiset, kutisevat tai vuotavat, ilmoita salongille ja siirrä aikaa.",
  ],
  intro: [
    "Mitä ei saa tehdä ennen ripsienpidennyksiä? Vastaus on kolme pientä asiaa: ei ripsiväriä, ei paljon kahvia eikä öljyistä silmänympärysvoidetta. Se kuulostaa yksinkertaiselta, mutta juuri nämä ratkaisevat, kuinka hyvin liima tarttuu, kuinka kauan pidennykset pysyvät ja jaksatko maata rentona paikallasi koko käynnin ajan.",
    "Artikkeli perustuu VaraaAi Academyn kurssin ”Moja Beauty: ripset, kynnet ja kulmat” oppituntiin ”3 asiaa, joita ei kannata tehdä ennen ripsiaikaa”. Kurssi on lyhyitä asiakasvideoita helsinkiläiseltä Moja Beauty -salongilta. Luettuasi tiedät, miten valmistaudut kotona, mitä otat mukaan ja mitä kerrot ripsistylistille ennen kuin asetut hoitosängylle.",
  ],
  sections: [
    {
      id: "kolme-asiaa",
      title: "Kolme asiaa, joita ei kannata tehdä ennen ripsiaikaa",
      blocks: [
        {
          table: {
            head: ["Vältä", "Miksi"],
            rows: [
              ["Ripsiväri, rajaus", "Liima ei tartu kunnolla; puhdistus vie aikaa"],
              ["Paljon kahvia juuri ennen", "Noin 90 minuuttia paikallaan on vaikeaa, silmät räpyttelevät"],
              ["Silmänympärysvoide, öljypohjainen ihonhoito", "Liima tarttuu huonosti, pidennykset irtoavat aikaisin"],
            ],
          },
        },
        { h3: "1. Ei ripsiväriä, ei rajausta" },
        { p: "Ripsiväri peittää jokaisen ripsen. Ripsiliima tarvitsee puhtaan ripsen tarttuakseen, joten jäljelle jäänyt ripsiväri estää sitä pitämästä kunnolla. Ripsistylistin pitää poistaa se ja puhdistaa ripset tavallista huolellisemmin, ja se aika on pois varaamastasi ajasta. Jos tulet suoraan töistä, poista silmämeikki ensin öljyttömällä tuotteella." },
        { img: { src: img("khach-tay-trang-mat-truoc-buoi-noi-mi"), alt: "Kermanväriseen neuleeseen pukeutunut asiakas istuu tuolissa studiossa toinen silmä kiinni ja pyyhkii silmää meikinpoistolapulla", caption: "Tule puhtain silmin, ilman ripsiväriä ja rajausta." } },
        { h3: "2. Ei paljon kahvia juuri ennen käyntiä" },
        { p: "Klassisten ripsienpidennysten laitto kestää Moja Beautyssa noin 90 minuuttia, ja koko sen ajan makaat paikallasi silmät kiinni. Kun olet levoton liiasta kahvista, paikallaan pysyminen on vaikeampaa ja silmät räpyttelevät. Ripsistylisti joutuu pysähtymään ja odottamaan, ja käynti venyy. Tavallinen kuppi ei haittaa; vältettävä on paljon kahvia juuri ennen tuloa." },
        { h3: "3. Ei silmänympärysvoidetta eikä öljypohjaista ihonhoitoa" },
        { p: "Ripsiliima ja öljy eivät sovi yhteen. Ohutkin öljykalvo ripsien tyvessä heikentää liiman tarttumista, ja pidennykset irtoavat paljon tavallista aikaisemmin. Jätä ripsiaikaa edeltävänä aamuna silmänympärysvoide, kasvoöljyt ja öljypohjaiset meikinpoistoaineet pois silmien ympäriltä." },
        { img: { src: img("dau-tay-trang-va-bong-tham-dau-tren-ke-phong-tam"), alt: "Käsi painaa ruskean lasipullon pumppua, jossa on puhdistusöljyä, ja öljyyn kastunut vanulappu on kylpyhuoneen marmorihyllyllä", caption: "Öljypohjaiset meikinpoistoaineet ja voiteet: pidä ne poissa silmien ympäriltä ennen pidennyksiä." } },
      ],
    },
    {
      id: "mita-kannattaa-tehda",
      title: "Mitä sitten kannattaa tehdä",
      blocks: [
        { p: "Muu valmistautuminen on yksinkertaista, ja sen tarkoitus on lähinnä, että voit maata mukavasti:" },
        {
          ul: [
            "**Ota piilolinssit pois** ennen kuin asetut makuulle. Ota kotelo mukaan ja laita linssit takaisin käynnin jälkeen.",
            "**Käy vessassa ennen aloitusta**, ettei sinun tarvitse nousta kesken kaiken silmät kiinni ja suojatyynyt paikoillaan.",
            "**Ota kuulokkeet mukaan**, niin voit kuunnella musiikkia tai podcastia maatessasi.",
          ],
        },
        { img: { src: img("thao-kinh-ap-trong-cat-vao-hop-truoc-khi-noi-mi"), alt: "Käsi laittaa piilolinssin koteloon pienellä marmoripöydällä nestepullon vieressä studiossa, jossa on violetit verhot", caption: "Ota piilolinssit pois ennen kuin asetut makuulle." } },
        { p: "Sitten vain makaat ja rentoudut. Moni jopa nukahtaa, kun ripsistylisti työskentelee. Jos silmiä kirvelee, ne tuntuvat hiekkaisilta tai jokin tuntuu epämukavalta, sano heti; ripsistylisti pysähtyy ja tarkistaa tilanteen." },
      ],
    },
    {
      id: "ensimmainen-kerta",
      title: "Ensimmäiset ripsienpidennykset: mitä ripsistylisti kysyy",
      blocks: [
        { p: "Ennen aloitusta ripsistylisti käy kanssasi konsultaation, kun vielä istut silmät auki. Kysymykset ovat turvallisuutesi vuoksi, joten vastaa rehellisesti:" },
        {
          ul: [
            "Onko sinulla allergioita, oletko joskus reagoinut ripsiliimaan tai ripsi- tai kulmaväriin.",
            "Ovatko silmäsi usein kuivat, onko luomenreunoissa tulehdusta tai onko sinulle tehty hiljattain silmäleikkaus.",
            "Käytätkö piilolinssejä tai jotain lääkettä, sillä jotkin lääkkeet voivat kuivattaa silmiä.",
            "Haluatko luonnollisen vai näyttävän lopputuloksen, ja millainen on työsi ja tapasi, kuten uinti, sauna tai vatsallaan nukkuminen.",
          ],
        },
        { img: { src: img("tu-van-tren-may-tinh-bang-truoc-lan-noi-mi-dau"), alt: "Nutturapäinen ripsistylisti istuu vaaleahiuksisen asiakkaan vieressä kermanvärisessä tuolissa, ja he katsovat yhdessä konsultaatiolomaketta tabletilta" } },
        { p: "Ennen ensimmäisiä pidennyksiä moni liimanvalmistaja ja moni salonki suosittelee allergiatestiä, yleensä 24–48 tuntia etukäteen ja valmistajan ohjeen mukaan: muutama pidennys ulkonurkkaan tai hieman liimaa ripsirajan lähelle. Jos huomaat sen jälkeen punoitusta, kutinaa tai turvotusta, kerro salongille ja kysy lääkäriltä; pidennyksiä ei silloin tehdä. Testi ei myöskään ole ehdoton tae, ja siksi ripsistylisti kysyy asiaa joka kerta uudelleen." },
        { img: { src: img("thu-keo-vai-soi-mi-o-duoi-mat-truoc-lan-dau"), alt: "Lähikuva asiakkaan suljetusta silmästä valkoisen suojatyynyn päällä, ulkonurkkaan on kiinnitetty vain muutama pidennys liimatestiksi", caption: "Allergiatesti: muutama pidennys ulkonurkkaan ennen ensimmäistä kertaa." } },
        { p: "Jos olet raskaana, kerro siitä ripsistylistille ja kysy ensin lääkäriltä; salonki noudattaa liimanvalmistajan ohjeita eikä anna lääketieteellisiä neuvoja." },
      ],
    },
    {
      id: "milloin-siirtaa",
      title: "Milloin aika kannattaa siirtää",
      blocks: [
        { p: "Punaiset tai vuotavat silmät, näärännäppy, turvonneet tai rupiset luomenreunat tai tuore silmäleikkaus: tänään ei ole oikea päivä. Liima ja sen höyryt tulehtuneen silmän lähellä vain pahentavat tilannetta. Ilmoita salongille ja siirrä aikaa sen sijaan, että tulisit silti; jos salonki käyttää VaraaAita, voit [perua tai tarkistaa varauksesi](lesson:lich-hen-cua-toi) puhelimella." },
        { note: "Ripsistylisti ei ole lääkäri. Pitkään jatkuva punoitus, kipu tai näön sumeneminen ovat syy mennä lääkäriin, ei kauneushoitoon.", kind: "warn", title: "Silmien terveys ensin" },
        { p: "Milloin ripsistylisti päättää jättää hoidon tekemättä, kerrotaan ammattilaisille kirjoitetussa artikkelissa [ripsienpidennysten allergiatesti ja konsultaatio](lesson:mi-chuan-bi-hieu-dung)." },
      ],
    },
    {
      id: "salongissa",
      title: "Salongissa ripset puhdistetaan silti",
      blocks: [
        { p: "Vaikka tulisit puhtain silmin, ripsistylisti pesee ripset ennen aloitusta ripsienpuhdistusaineella ja pehmeällä harjalla ja kuivaa ne huolellisesti. Näin ripsistä lähtevät ihon luonnollinen rasva ja pöly. Kun olet valmistautunut hyvin kotona, vaihe on nopea, ja enemmän aikaa jää pidennysten kiinnittämiseen." },
        { img: { src: img("tho-lam-sach-mi-that-bang-bot-truoc-khi-noi"), alt: "Ripsistylistin mustaan käsineeseen pukeutunut käsi harjaa pehmeällä harjalla valkoista vaahtoa asiakkaan suljetun silmän ripsiin ennen pidennyksiä" } },
        { p: "Käynnin jälkeen pidä ripset kuivina äläkä hiero silmiä ensimmäisten 24 tunnin aikana; artikkeli [ripsienpidennysten jälkihoito](lesson:cham-soc-sau-lam-mi) käy jokaisen kohdan läpi. Jos vielä valitset tyyliä, [millaiset ripsienpidennykset valita](lesson:4-kieu-noi-mi) auttaa päättämään ennen tuloa." },
        { p: "Moja Beauty odottaa sinua Helsingissä kolmessa paikassa: Kampissa, Hakaniemessä ja Sörnäisissä. Voit [varata ajan Moja Beautyyn](/b/moja-beauty) VaraaAissa: valitse palvelu, valitse aika, valmis." },
      ],
    },
  ],
  faq: [
    {
      q: "Saako ennen ripsienpidennyksiä meikata?",
      a: "Kasvomeikki on kunnossa, mutta jätä ripsiväri ja rajaus pois. Meikki ripsissä estää liimaa tarttumasta, ja ripsistylisti joutuu käyttämään aikaa sen puhdistamiseen.",
    },
    {
      q: "Voiko kahvia juoda ennen ripsiaikaa?",
      a: "Oppitunnin neuvo on, ettei kahvia juoda paljon juuri ennen käyntiä. Sinun pitää maata paikallasi noin 90 minuuttia, ja levottomana silmät räpyttelevät.",
    },
    {
      q: "Voiko piilolinssejä pitää ripsienpidennysten laiton aikana?",
      a: "Ota piilolinssit pois ennen kuin asetut makuulle ja ota kotelo mukaan. Voit laittaa ne takaisin käynnin jälkeen.",
    },
    {
      q: "Kauanko ripsienpidennysten laitto kestää?",
      a: "Klassisten ripsienpidennysten laitto kestää Moja Beautyssa noin 90 minuuttia. Makaat koko ajan paikallasi silmät kiinni, joten käy vessassa ennen aloitusta ja ota kuulokkeet mukaan.",
    },
    {
      q: "Miksi silmänympärysvoidetta ei saa käyttää ennen ripsienpidennyksiä?",
      a: "Silmänympärysvoide ja öljypohjainen ihonhoito jättävät ripsiin öljykalvon. Öljy heikentää liiman tarttumista, joten pidennykset irtoavat aikaisin.",
    },
    {
      q: "Tarvitaanko allergiatesti ennen ensimmäisiä ripsienpidennyksiä?",
      a: "Moni liimanvalmistaja ja salonki suosittelee testiä ennen ensimmäisiä pidennyksiä, yleensä 24–48 tuntia etukäteen. Jos testin jälkeen ilmenee punoitusta, kutinaa tai turvotusta, pidennyksiä ei tehdä, ja asiasta kannattaa kysyä lääkäriltä.",
    },
  ],
  related: ["cham-soc-sau-lam-mi", "4-kieu-noi-mi", "noi-mi-co-hai-mi-that", "mi-chuan-bi-hieu-dung"],
};

export default article;
