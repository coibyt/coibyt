import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/mi-mong-mua-dong/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "kynnet-ja-ripset-talvella",
  lesson: "mi-mong-mua-dong",
  category: "tips",
  title: "Kynnet ja ripset talvella: 4 tapaa kuivia, katkeilevia kynsiä ja hauraita ripsiä vastaan",
  metaTitle: "Kynnet talvella: näin estät kuivuuden ja katkeilun",
  metaDescription:
    "Kynnet ja ripset talvella: kynsiöljyä joka ilta, hanskat pakkasella, käsivoide pesun jälkeen, ei kuumaa ilmaa silmiin ja kosteutta lämmitettyyn sisäilmaan.",
  keyword: "kynnet talvella",
  keywords: [
    "kuivat ja katkeilevat kynnet talvella",
    "ripsien hoito talvella",
    "kynsinauhojen repaleet talvella",
    "milloin kynsiöljyä levitetään",
    "ilmankostutin iholle ja ripsille",
    "kuivat ripset pakkasella",
  ],
  excerpt: "Ulkona pakkanen, sisällä kuiva lämpö: kynnet katkeilevat, kynsinauhat repeilevät ja ripset haurastuvat. Neljä yksinkertaista tapaa koko kylmäksi kaudeksi.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-mac-ao-khoac-mua-dong-tai-quay-salon-helsinki"),
    alt: "Vaaleahiuksinen nainen kermanvärisessä jakkupuvussa pitää muistikirjaa ja juttelee villakangastakkiin ja huiviin pukeutuneen asiakkaan kanssa valoisan salongin kivisellä vastaanottotiskillä",
  },
  takeaways: [
    "**Joka ilta** hiero öljyä kynsinauhoihin ja kynsien pintaan: iho pysyy pehmeänä, repaleita tulee vähemmän ja kynsi on joustavampi ja katkeaa harvemmin.",
    "**Pakkasella** käytä aina hanskoja; **jokaisen käsienpesun jälkeen** levitä heti ohut kerros käsivoidetta.",
    "**Ripset** kuivuvat ja haurastuvat kylmästä ja lämmityksestä: harjaa ne päivittäin, pidä kuuma ilma poissa silmistä äläkä istu saunassa liian pitkään.",
    "**Lämmitetyssä sisätilassa** pieni ilmankostutin auttaa paljon.",
    "**Juo tarpeeksi vettä**, niin iho, kynnet ja ripset kuivuvat vähemmän.",
  ],
  intro: [
    "Kynnet talvella ovat asia, jota moni ajattelee vasta, kun kynsi on katkennut ja kynsinauhan iho haljennut ja alkanut kirvellä. Suomen talvi on kylmä ja kuiva. Ulkona puhaltaa pakkastuuli, ja sisällä lämmitys kuivattaa ilmaa entisestään. Kynnet menettävät joustavuutensa ja katkeavat helposti, ja myös ripset, sekä omat ripset että pidennykset, haurastuvat.",
    "Artikkeli perustuu VaraaAi Academyn kurssin ”Moja Beauty: ripset, kynnet ja kulmat” oppituntiin ”Ripset ja kynnet kuntoon talven kuivuudessa”. Kurssi on lyhyitä asiakasvideoita helsinkiläiseltä Moja Beauty -salongilta. Oppitunti tiivistyy neljään tapaan: kynsiöljy, hanskat, ripsien suojaaminen kuumuudelta ja sisäilman kosteus. Luettuasi tiedät, mitä teet joka päivä ja miksi kukin tapa auttaa.",
  ],
  sections: [
    {
      id: "miksi-kynnet-katkeilevat-talvella",
      title: "Miksi kynnet kuivuvat ja katkeilevat talvella",
      blocks: [
        { p: "Kynnet ja niiden ympärysiho tarvitsevat hiukan kosteutta pysyäkseen joustavina. Kun ilma on kylmää ja kuivaa, kosteus haihtuu nopeammin. Kuiva kynsi on kova ja hauras, joten kevyt kolhu riittää halkaisemaan sen tai lohkaisemaan kärjen. Kuiva iho kynsien ympärillä halkeilee, ja kynsinauhoihin tulee helposti repaleita." },
        { img: { src: img("phu-nu-mac-ao-khoac-di-tren-pho-troi-lanh"), alt: "Kamelinruskeaan villakangastakkiin pukeutunut nainen kävelee mukulakivikadulla puhelintaan katsoen, taustalla liike, jolla on luumunpunainen markiisi", caption: "Kylmä tuuli ulkona ja lämmitys sisällä: kädet, kynnet ja ripset kuivuvat koko päivän." } },
        { p: "Sisätilojen lämmitys pahentaa asiaa, koska ilma lämpenee mutta vesihöyryä ei tule lisää. Myös käsien peseminen monta kertaa päivässä, varsinkin kuumalla vedellä ja saippualla, vie iholta sen luonnollisia öljyjä." },
      ],
    },
    {
      id: "kynsioljy-joka-ilta",
      title: "Tapa 1: kynsiöljyä joka ilta",
      blocks: [
        { p: "Joka ilta ennen nukkumaanmenoa tiputa kynsinauhoille ja kynsien pintaan tippa öljyä ja hiero se kevyesti sisään. Kynsinauhojen iho pehmenee, ja repaleita tulee vähemmän. Kynnet muuttuvat joustavammiksi ja katkeavat harvemmin." },
        { img: { src: img("nho-dau-duong-len-da-quanh-mong"), alt: "Mustiin käsineisiin pukeutunut kynsiteknikko tiputtaa pipetillä kullankeltaisen tipan kynsiöljyä asiakkaan soikealle, maidonroosalla geelilakalla lakatulle kynnelle" } },
        { p: "Tapa sopii kaikenlaisille kynsille: paljaille, tavallisella lakalla lakatuille, geelilakatuille ja BIABille. Geelikynsissä öljy estää kynnen ympärysihoa kuivumasta, halkeilemasta ja kuoriutumasta aivan geelin reunan vieressä, joten reunaan tulee vähemmän syytä koskea. Artikkeli [tarvitsevatko kynnet hengähdystauon geelien välissä](lesson:mong-co-can-tho) kertoo, miksi säännöllinen öljyäminen on tärkeämpää kuin tauko geelistä." },
        { note: "Pidä kynsiöljypullo sängyn vieressä tai hammasharjan luona. Kun näet sen joka ilta, se on paljon helpompi muistaa.", kind: "tip", title: "Pieni vinkki" },
      ],
    },
    {
      id: "hanskat-ja-kasivoide",
      title: "Tapa 2: hanskat pakkasella, käsivoide pesun jälkeen",
      blocks: [
        { p: "Pakkasella käytä aina hanskoja. Ne pitävät kädet lämpiminä ja suojaavat tuulelta, jottei kylmä ilma kuivata ihoa ja kynsiä koko matkan ajan." },
        { p: "Jokaisen käsienpesun jälkeen levitä heti ohut kerros käsivoidetta. Ohut kerros riittää, eikä käsien tarvitse tuntua liukkailta. Tiskatessa ja pyykkiä pestessä käytä lisäksi kumihanskoja: ne estävät käsiä kuivumasta ja pitävät veden ja pesuaineet irrottamasta geelikynsiä liian aikaisin, kuten artikkelissa [5 tapaa, joiden takia geelikynnet irtoavat](lesson:5-thoi-quen-gel-bong) kerrotaan." },
        { img: { src: img("thoa-kem-duong-tay-sau-khi-rua-tay"), alt: "Kaksi mustakäsineistä kättä levittää valkoista käsivoidetta asiakkaan kämmenselälle, joka lepää kermanvärisellä käsityynyllä", caption: "Ohut kerros käsivoidetta jokaisen pesun jälkeen estää ihoa halkeilemasta." } },
      ],
    },
    {
      id: "ripsien-hoito-talvella",
      title: "Tapa 3: ripsien hoito talvella, kauas kuumuudesta",
      blocks: [
        { p: "Myös ripset kuivuvat ja haurastuvat kylmässä ja silloin, kun vietät pitkään aikaa kuuman lämmittimen lähellä. Oppitunti antaa kolme ohjetta:" },
        {
          table: {
            head: ["Tee näin", "Miksi"],
            rows: [
              ["Harjaa ripset päivittäin puhtaalla harjalla", "Ripset pysyvät siisteinä eivätkä sotkeudu tai kierry toisiinsa"],
              ["Älä puhalla kuumaa ilmaa silmiin", "Kuumuus tekee ripsistä kuivempia ja hauraampia"],
              ["Älä istu saunassa liian pitkään", "Pitkä altistus kovalle kuumuudelle kuivattaa ripsiä"],
            ],
          },
        },
        { img: { src: img("chai-mi-bang-choi-sach"), alt: "Lähikuva mustakäsineisestä tekijästä, joka harjaa mustalla ripsiharjalla asiakkaan ripsiä, asiakkaan silmät kiinni ja valkoinen suojatyyny silmän alla", caption: "Harjaa ripset hellävaraisesti joka päivä puhtaalla harjalla." } },
        { p: "Kun kuivaat hiuksia föönillä, suuntaa kuuma ilma poispäin kasvoista. Jos sinulla on ripsienpidennykset, niiden pesu ja harjaus kotona neuvotaan artikkelissa [näin peset ripsienpidennykset kotona](lesson:rua-mi-noi-tai-nha), ja mitä ripsihoidon jälkeen kannattaa välttää, kerrotaan artikkelissa [ripsien jälkihoito pidennysten tai taivutuksen jälkeen](lesson:cham-soc-sau-lam-mi). Juuri laminoidut kulmat tarvitsevat myös säännöllistä hoitoa, katso [kulmien laminoinnin jälkihoito](lesson:giu-nep-brow-lamination)." },
      ],
    },
    {
      id: "sisailman-kosteus",
      title: "Tapa 4: kosteutta sisäilmaan ja tarpeeksi vettä",
      blocks: [
        { p: "Kun lämmitys on päällä, sisäilma on hyvin kuivaa. Pieni ilmankostutin makuuhuoneessa tai työhuoneessa auttaa paljon: iho, huulet, kynnet ja ripset kuivuvat yön aikana vähemmän." },
        { img: { src: img("may-tao-am-nho-trong-phong"), alt: "Pieni kermanvärinen ilmankostutin päästää hienoa sumua marmorisella ikkunalaudalla valkoisten kukkien maljakon ja kermanvärisen nojatuolin vieressä" } },
        { p: "Oppitunti muistuttaa vielä yhdestä yksinkertaisesta asiasta: juo tarpeeksi vettä. Kun elimistö saa tarpeeksi nestettä, iho, kynnet ja ripset kuivuvat vähemmän." },
        { note: "Jos kynnen ympärysiho on syvästi haljennut, punainen, turvonnut tai kipeä tai kynsi on oudon värinen, kyse ei ole enää pelkästä sään aiheuttamasta kuivuudesta. Kysy lääkäriltä tai apteekista ennen kynsihoitoa.", kind: "warn", title: "Kun kyse on muusta kuin kuivuudesta" },
      ],
    },
    {
      id: "varaa-hoito-talven-jalkeen",
      title: "Kuivat kynnet tai hauraat ripset talven jälkeen? Varaa hoito",
      blocks: [
        { p: "Jos kyntesi ovat kylmien kuukausien jälkeen kuivat ja katkeilevat tai ripset ovat hauraat, anna ammattilaisen katsoa niitä paikan päällä ja neuvoa, mitä kannattaa tehdä seuraavaksi, kynsienhoidosta ripsien huoltoon. VaraaAissa [varaat ajan netissä](lesson:dat-lich-online): valitse palvelu, valitse aika, valmis. Tämä oppitunti tulee Moja Beautysta Helsingistä, ja sinne voit varata ajan [Moja Beautyn varaussivulta](/b/moja-beauty)." },
      ],
    },
  ],
  faq: [
    {
      q: "Miksi kynnet katkeilevat talvella helpommin?",
      a: "Kylmä ja kuiva ulkoilma sekä sisätilojen lämmitys vievät kosteutta kynsistä ja niiden ympärysihosta. Kuiva kynsi on kova ja hauras, ja se halkeaa ja lohkeilee helposti. Kynsiöljy joka ilta ja hanskat ulkona pitävät kynnet joustavina ja vähemmän katkeilevina.",
    },
    {
      q: "Milloin kynsiöljyä kannattaa levittää?",
      a: "Joka ilta: levitä öljyä kynsinauhoille ja kynsien pintaan ja hiero se kevyesti sisään. Kynsinauhojen iho pehmenee, repaleita tulee vähemmän ja kynnet muuttuvat joustavammiksi. Öljyä voi käyttää myös geelilakan kanssa.",
    },
    {
      q: "Miten estän käsien kuivumisen ja halkeilun talvella?",
      a: "Käytä hanskoja, kun lähdet pakkaseen, ja levitä ohut kerros käsivoidetta heti jokaisen käsienpesun jälkeen. Tiskatessa ja pyykkiä pestessä käytä kumihanskoja, jotteivät kädet ole pitkään vedessä ja pesuaineissa.",
    },
    {
      q: "Miten ripsiä hoidetaan talvella?",
      a: "Ripset kuivuvat ja haurastuvat kylmässä ja kuuman lämmittimen lähellä. Harjaa ne päivittäin puhtaalla harjalla, pidä kuuma ilma poissa silmistä äläkä istu saunassa liian pitkään.",
    },
    {
      q: "Auttaako ilmankostutin ihoa, kynsiä ja ripsiä?",
      a: "Auttaa. Lämmitetyssä sisätilassa ilma on hyvin kuivaa, ja pieni ilmankostutin auttaa paljon. Kun juot lisäksi tarpeeksi vettä, iho, kynnet ja ripset kuivuvat vähemmän.",
    },
  ],
  related: ["mong-co-can-tho", "5-thoi-quen-gel-bong", "cham-soc-sau-lam-mi", "giu-nep-brow-lamination"],
};

export default article;
