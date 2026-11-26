import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/spa-massage-mat-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "kasvohieronnan-hyodyt-ja-vasta-aiheet",
  lesson: "spa-massage-mat-hieu-dung",
  category: "spa",
  title: "Kasvohieronnan hyödyt: mitä se oikeasti tekee, milloin sitä ei tehdä ja missä edetään kevyesti",
  metaTitle: "Kasvohieronnan hyödyt ja milloin hierontaa ei tehdä",
  metaDescription:
    "Kasvohieronnan hyödyt ja rajat: milloin ei hierota, öljyn valinta, neljä perusotetta, sivelyjen suunta, silmänympärys, kaula ja painelupisteet kosmetologille.",
  keyword: "kasvohieronnan hyödyt",
  keywords: [
    "mitä kasvohieronta tekee",
    "kaventaako kasvohieronta kasvoja",
    "milloin kasvohierontaa ei saa tehdä",
    "kasvohieronta täyteaineiden jälkeen",
    "kasvohieronnan perusotteet",
    "painelupisteet kasvoissa",
    "kasvohierontaöljy",
  ],
  excerpt: "Hoitolan kasvohieronta rentouttaa asiakasta ja saa ihon näyttämään raikkaammalta, mutta se ei hoida mitään. Artikkeli käy läpi paineen, suunnan, rytmin ja tilanteet, joissa hierontaa ei tehdä.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("chuyen-vien-ngoi-dau-giuong-massage-mat-cho-khach"),
    alt: "Kermanvärisessä työasussa oleva kosmetologi istuu hoitopöydän päädyssä ja pitää molempia käsiään kevyesti silmät kiinni makaavan asiakkaan kasvoilla kaari-ikkunaisessa huoneessa",
  },
  takeaways: [
    "Hoitolan kasvohieronta auttaa asiakasta **rentoutumaan** ja saa ihon näyttämään raikkaammalta. Älä lupaa kapeampia kasvoja, vähemmän ryppyjä tai apua päänsärkyyn.",
    "Kysy ennen kuin kosket: kuume, flunssa, huuliherpes, märkivät näppylät, rikkinäinen iho, auringonpolttama tai juuri tehty kauneustoimenpide ovat syitä siirtää aikaa tai välttää aluetta.",
    "Kasvoilla sivelyt kulkevat **ylös ja ulospäin**. Ihoa ei vedetä alas eikä hangata edestakaisin.",
    "Silmien ympärillä käytetään vain nimetöntä sormea, eikä silmäluomia paineta. Kaulalla vain kevyet sivelyt sivuilla, ei koskaan painetta kurkun etupuolelle.",
    "Kysy paineesta ennen aloitusta, ensimmäisten otteiden jälkeen ja aluetta vaihtaessa. Hiljainen asiakas ei välttämättä viihdy.",
  ],
  intro: [
    "Kasvohieronnan hyödyt kiinnostavat monia asiakkaita jo ennen kasvohoidon varaamista. Rehellinen vastaus on lyhyt: kasvohieronta rentouttaa ja saa ihon näyttämään raikkaammalta. Se ei kavenna kasvoja, poista ryppyjä eikä hoida sairauksia. Jotta asiakas todella rentoutuu, kosmetologin on hallittava paine, suunta ja rytmi, ja ennen kaikkea tiedettävä, milloin hierontaa ei tehdä.",
    "Artikkeli seuraa VaraaAi Academyn Spa ja ihonhoito -kurssin oppituntia ”Kasvohieronta: ymmärrä se, niin asiakas rentoutuu turvallisesti”, joka on aiheen teoriaosa. Luettuasi tiedät, milloin aika siirretään, miten öljy valitaan, mihin kutakin otetta käytetään ja mitkä alueet vaativat kevyimmän kosketuksen. Kokonainen hierontasarja vaihe vaiheelta on artikkelissa [Kasvohieronta ohje](lesson:spa-massage-mat).",
  ],
  sections: [
    {
      id: "mita-hieronta-tekee",
      title: "Mitä kasvohieronta tekee ja mihin se ei pysty",
      blocks: [
        { p: "Kasvohieronta on usein se osa kasvohoitoa, jonka asiakas muistaa parhaiten. Sen mittari on yksinkertainen: hyvä hieronta on sellainen, jonka aikana asiakas päästää irti. Jos hän jännittää yhä, paine on väärä." },
        { p: "Uusille tekijöille käy usein näin: he haluavat näyttää, kuinka perusteellisesti työskentelevät, ja painavat todella kovaa, vetävät ihoa edestakaisin ja painavat jopa silmien ympäriltä. Asiakkaaseen sattuu, mutta hän ei kehtaa sanoa. Seuraavana päivänä iho punoittaa ja on hieman arka, eikä asiakas varaa uutta aikaa." },
        {
          table: {
            head: ["Asiakas kysyy usein", "Rehellinen vastaus"],
            rows: [
              ["Mitä kasvohieronta tekee?", "Rentouttaa ja saa ihon näyttämään raikkaammalta"],
              ["Kaventaako se kasvoja?", "Tätä ei pidä luvata"],
              ["Poistaako se ryppyjä?", "Tätä ei pidä luvata"],
              ["Auttavatko painelupisteet päänsärkyyn?", "Hoitolassa painelu on rentoutusta, ei hoitoa"],
            ],
          },
        },
        { note: "Hieronnan säännöt ja ammattinimikkeet vaihtelevat maittain. Hoitolan kasvohieronta on rentoutusta, ei hoitoa. Artikkeli on koulutusmateriaalia, ei ammattipätevyys.", kind: "warn", title: "Hoitolahieronnan rajat" },
      ],
    },
    {
      id: "milloin-ei-hierota",
      title: "Milloin kasvohierontaa ei tehdä",
      blocks: [
        { p: "Kysy, ennen kuin kosket asiakkaan kasvoihin. Useimmat hieronnan jälkeiset ongelmat johtuvat asioista, jotka muutama kysymys alussa olisi paljastanut." },
        {
          table: {
            head: ["Asiakkaalla on", "Mitä tehdään"],
            rows: [
              ["Kuumetta, flunssa tai huono olo", "Aika siirretään toiseen päivään"],
              ["Huuliherpes, tulehdus, märkiviä näppylöitä, rikkinäistä ihoa, auringonpolttama", "Sitä aluetta ei hierota"],
              ["Juuri tehty kuorinta, laser, täyteaineet tai kasvoleikkaus", "Kysy toimenpiteen tekijältä, kuinka kauan odotetaan, ja noudata ohjetta"],
              ["Tuntematon kyhmy tai selittämätön turvotus", "Ei hierontaa; ohjaa lääkäriin. Kosmetologi ei diagnosoi"],
              ["Hoitamaton sairaus: korkea verenpaine, sydänsairaus, vakavan sairauden hoito", "Neuvo kysymään ensin lääkäriltä"],
              ["Punoittava, herkkä iho ja näkyvät pienet verisuonet", "Hyvin kevyesti, vähän otteita tai hieronta jätetään pois"],
            ],
          },
        },
        { img: { src: img("mun-rop-o-moi-khong-massage-mat-vung-do"), alt: "Lähikuva naisen kasvojen alaosasta, ylähuulen suupielessä on pieni rakkularyhmä hieman punertavalla iholla", caption: "Huuliherpes: sitä aluetta ei hierota." } },
        { p: "Merkit, joiden vuoksi mistä tahansa palvelusta kieltäydytään tai aika siirretään, käydään läpi oppitunnilla [Milloin asiakasta ei hoideta](lesson:khi-nao-khong-lam)." },
      ],
    },
    {
      id: "hierontaoljy",
      title: "Kasvohierontaöljy: riittävä liukkaus, allergiakysymys ja pumppu",
      blocks: [
        { p: "Hierontaöljyllä tai -voiteella on yksi päätehtävä: kädet liukuvat ilman, että iho venyy. Liian vähän, ja kädet vetävät ihoa mukanaan. Liikaa, ja kaikki lipsuu, jolloin painetta on vaikea hallita." },
        {
          ul: [
            "**Kysy allergioista.** Moni öljy on pähkinäpohjainen, kuten manteliöljy. Kysy myös hajusteista ja eteerisistä öljyistä.",
            "**Eteeriset öljyt.** Käytä vain valmistajan kasvoille valmiiksi laimentamia, älä koskaan sekoita omia.",
            "**Herkät asiakkaat.** Testaa ensin pienelle ihoalueelle. Miten ja miksi, kerrotaan oppitunnilla [Allergiat ja kemikaalit](lesson:di-ung-hoa-chat).",
            "**Annostelu.** Käytä pumppua, älä koskaan kasta sormia pulloon.",
          ],
        },
        { img: { src: img("lay-dau-massage-mat-bang-voi-bom"), alt: "Kosmetologi painaa meripihkanvärisen lasipullon pumppua, ja kämmenelle tippuu hieman kullanväristä öljyä, taustalla asiakas makaa hoitopöydällä", caption: "Öljy pumpataan kämmenelle; sormet eivät koskaan käy pullossa." } },
      ],
    },
    {
      id: "ihon-mukaan",
      title: "Kasvohieronta ihon mukaan",
      blocks: [
        { p: "Sama hierontasarja ei sovi jokaiselle asiakkaalle. Öljyn määrä, otteiden määrä ja hieronnan pituus muuttuvat ihon mukaan." },
        {
          table: {
            head: ["Iho", "Miten hierotaan"],
            rows: [
              ["Kuiva tai kuivunut", "Riittävästi öljyä tai voidetta, hitaat ja pitkät sivelyt"],
              ["Rasvainen tai aknealtis", "Vähän öljyä, valmistajan rasvaiselle iholle sopivaksi merkitsemä tuote, tulehtuneet kohdat ohitetaan"],
              ["Herkkä, helposti punoittava", "Vähän otteita, kevyin kosketus, ei taputusta, lyhyempi hieronta"],
              ["Ohut iho, iäkkäämmät asiakkaat", "Ihoa ei koskaan venytetä"],
            ],
          },
        },
        { img: { src: img("massage-mat-cho-khach-lon-tuoi-da-mong"), alt: "Kaksi kättä lepää kevyesti valkoista otsapantaa käyttävän iäkkäämmän naisasiakkaan otsalla ja poskella, asiakas makaa kasvot hieman käännettyinä ja silmät kiinni", caption: "Iäkkäämmän asiakkaan ohut iho: kädet lepäävät ja liukuvat, eivät venytä." } },
      ],
    },
    {
      id: "otteet-ja-suunta",
      title: "Kasvohieronnan perusotteet ja sivelyjen suunta",
      blocks: [
        { p: "Kasvohieronnassa on vain muutama perusote. Kokonainen sarja on alla olevat neljä otetta toisiinsa liitettyinä, ja ne vaihtelevat paineen, suunnan ja rytmin mukaan." },
        {
          table: {
            head: ["Ote", "Miten", "Milloin"],
            rows: [
              ["Sively", "Koko kämmen liukuu pitkästi ja kevyesti", "Aloitus, lopetus ja otteiden yhdistäminen"],
              ["Pienet ympyrät", "Keski- ja nimettömän sormen päät piirtävät pieniä ympyröitä", "Poskilla ja leukalinjaa pitkin"],
              ["Painelu", "Paina hitaasti, pidä muutama sekunti, vapauta hitaasti", "Ohimot, poskiluiden alus, kulmien väli"],
              ["Kevyt taputus", "Sormenpäät koskettavat nopeasti ja kevyesti kuin sadepisarat", "Jätetään pois herkältä iholta"],
            ],
          },
        },
        { h3: "Suunta: ylös ja ulospäin" },
        { p: "Kasvoilla sivelyt kulkevat yleensä ylös ja ulospäin: leuasta korviin, nenänpielistä ohimoille ja kulmista hiusrajaan. Ihoa ei vedetä alas eikä hangata edestakaisin. Kasvojen iho on ohutta, ja jos sitä vedetään kovaa yhä uudelleen, se punoittaa ja tuntuu epämukavalta." },
      ],
    },
    {
      id: "silmat-kaula-painelupisteet",
      title: "Silmänympärys, kaula ja painelupisteet kasvoissa",
      blocks: [
        { p: "Kaksi aluetta vaatii enemmän huolellisuutta kuin mikään muu kasvoilla." },
        {
          ul: [
            "**Silmänympärys.** Käytä vain nimetöntä sormea: se on heikoin sormi, joten sen paine on luonnostaan kevyin. Liu'uta silmäkuopan luuta pitkin äläkä koskaan paina silmäluomia.",
            "**Kaula.** Vain kevyet sivelyt kaulan sivuilla alas kohti solisluita. Älä koskaan paina kurkun etupuolta tai syvälle kaulan sivuille, sillä kaulan etu- ja sivuosissa kulkevat verisuonet ja henkitorvi.",
          ],
        },
        { h3: "Painelu on rentoutusta" },
        { p: "Painelua tehdään yleensä ohimoilla, poskiluiden alla ja kulmien välissä. Monet puhuvat painelupisteistä. Hoitolassa painelu on rentouttava ote, ei hoito, joten älä lupaa asiakkaalle, että se auttaa päänsärkyyn tai mihinkään muuhun. Tapa on aina sama: paina hitaasti, pidä muutama sekunti ja vapauta hitaasti. Äkillinen painallus ja irrotus säikäyttävät asiakkaan." },
        { img: { src: img("an-giu-thai-duong-khi-massage-mat"), alt: "Ylhäältä kuvattuna kosmetologin sormenpäät lepäävät kevyesti valkoista otsapantaa käyttävän, silmät kiinni makaavan asiakkaan molemmilla ohimoilla", caption: "Painelu ohimoilla: paina hitaasti, pidä muutama sekunti, vapauta hitaasti." } },
      ],
    },
    {
      id: "paine-rytmi-tyoasento",
      title: "Paine, rytmi ja kosmetologin työasento",
      blocks: [
        { h3: "Kysy paineesta kolme kertaa" },
        { p: "Sopiva paine on jokaiselle erilainen. Kysy asiakkaalta ennen aloitusta, muutaman ensimmäisen otteen jälkeen ja kun siirryt uudelle alueelle. Pidä kysymys lyhyenä, esimerkiksi ”Haluatko vähän kevyemmin vai vähän napakammin?” Seuraa samalla asiakasta: rypistyvät kulmat, pidätetty hengitys tai nousevat hartiat kertovat, että paine on liian kova." },
        { img: { src: img("hoi-khach-ve-luc-tay-khi-massage-mat"), alt: "Kosmetologi kumartuu hieman kohti asiakasta, joka makaa hymyillen silmät auki, ja pitää molempia käsiään asiakkaan hartioilla kuin kysyäkseen paineesta" } },
        { note: "Hiljainen asiakas ei välttämättä viihdy. Lyhyt kysymys ensimmäisten otteiden jälkeen rohkaisee kertomaan paineesta. Jos asiakas taas haluaa maata hiljaa juttelematta, kunnioita sitä.", kind: "tip", title: "Ammattilaisen vinkki" },
        { h3: "Hidas rytmi ja aina toinen käsi asiakkaassa" },
        { p: "Pidä rytmi hitaana, tasaisena ja katkeamattomana. Kun olet koskettanut asiakasta, pidä aina toinen käsi hänessä otteesta toiseen siirtyessäsi. Jos nostat molemmat kädet irti ja lasket ne äkkiä takaisin, rentoutumisen tunne katoaa." },
        { h3: "Työasento, joka kestää" },
        { p: "Istu hoitopöydän päädyssä jakkaralla, jonka korkeus on säädetty sopivaksi, selkä suorana, hartiat rentoina ja ranteet suorina. Kun asiakkaita on monta päivässä, huono asento johtaa kipeisiin hartioihin ja ranteisiin." },
        { img: { src: img("tu-the-ngoi-cua-nguoi-tho-massage-mat"), alt: "Kosmetologi istuu selkä suorana matalalla jakkaralla hoitopöydän päädyssä, hartiat rentoina, ja hänen kätensä lepäävät kevyesti makaavan asiakkaan poskilla", caption: "Suora selkä, rennot hartiat, suorat ranteet ja jakkara hoitopöydän korkeudelle säädettynä." } },
        { h3: "Hygienia ja punoittava iho" },
        { p: "Hygienia on sama kuin muissakin palveluissa: lyhyet kynnet, sormukset ja kello pois, kädet pestään ennen jokaista asiakasta ja jälkeen, ja jokaiselle asiakkaalle puhtaat pyyhkeet, otsapanta ja lakanat. Tarkemmin oppitunnilla [Käsihygienia ja käsineet](lesson:rua-tay-gang-tay). Jos asiakkaan iho punoittaa ja kirvelee hieronnan aikana, lopeta, pyyhi kevyesti, laita viileä pyyhe ja kirjaa tuote, kuten oppitunnilla [Ensiapu kauneushoitolassa](lesson:xu-ly-su-co)." },
        { p: "VaraaAissa merkitset asiakkaan sisäisiin muistiinpanoihin [asiakasrekisterissä](lesson:khach-hang) käytetyn öljyn, mieluisan paineen ja vältettävät alueet. Seuraavalla käynnillä kenenkään ei tarvitse kysyä kaikkea alusta." },
      ],
    },
  ],
  faq: [
    {
      q: "Mitä hyötyä kasvohieronnasta on?",
      a: "Hoitolan kasvohieronta auttaa asiakasta rentoutumaan ja saa ihon näyttämään raikkaammalta. Se on osa kasvohoitoa, ei minkään vaivan hoito. Kosmetologin ei pidä luvata tuloksia, kuten kapeampia kasvoja, vähemmän ryppyjä tai apua päänsärkyyn.",
    },
    {
      q: "Kaventaako kasvohieronta kasvoja tai poistaako se ryppyjä?",
      a: "Sitä ei pidä luvata. Hieronta rentouttaa ja saa ihon näyttämään raikkaammalta, ja siinä kaikki. Ihon kova ja toistuva vetäminen kapeampien kasvojen toivossa vain saa kasvojen ohuen ihon punoittamaan ja tuntumaan epämukavalta.",
    },
    {
      q: "Milloin kasvohierontaa ei saa tehdä?",
      a: "Kuumeen, flunssan tai huonon olon aikana aika siirretään. Huuliherpestä, tulehdusta, märkiviä näppylöitä, rikkinäistä ihoa tai auringonpolttamaa ei hierota. Tuntematon kyhmy tai selittämätön turvotus tarkoittaa, että hierontaa ei tehdä ja asiakas ohjataan lääkäriin. Jos asiakkaalla on hoitamaton sairaus, kuten korkea verenpaine tai sydänsairaus, hänen kannattaa kysyä ensin lääkäriltä.",
    },
    {
      q: "Kuinka pian täyteaineiden, laserin tai kuorinnan jälkeen saa kasvohieronnan?",
      a: "Kosmetologi ei päätä tätä itse. Kysy toimenpiteen tehneeltä, kuinka kauan hieronnan kanssa odotetaan, vältä aluetta ja noudata hänen ohjettaan.",
    },
    {
      q: "Auttavatko kasvojen painelupisteet päänsärkyyn?",
      a: "Hoitolassa painelu ohimoilla, poskiluiden alla tai kulmien välissä on rentouttava ote, ei hoito. Kosmetologi ei lupaa parantaa päänsärkyä tai mitään muuta. Oikea tapa on painaa hitaasti, pitää muutama sekunti ja vapauttaa hitaasti.",
    },
    {
      q: "Miten silmien ympärystä ja kaulaa hierotaan turvallisesti?",
      a: "Silmien ympärillä käytetään vain nimetöntä sormea, joka liukuu kevyesti silmäkuopan luuta pitkin, eikä silmäluomia paineta. Kaulalla tehdään vain kevyitä sivelyjä sivuilla alas kohti solisluita, eikä kurkun etupuolta tai kaulan sivuja paineta syvältä.",
    },
  ],
  related: ["spa-massage-mat", "spa-facial-hieu-dung", "spa-massage-body-hieu-dung", "khi-nao-khong-lam"],
};

export default article;
