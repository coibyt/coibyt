import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/spa-tay-chan/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "kasi-ja-jalkahoito-ohje-vaihe-vaiheelta",
  lesson: "spa-tay-chan",
  category: "spa",
  title: "Käsi- ja jalkahoito ohje: 14 vaihetta liotuksesta, kuorinnasta ja hieronnasta parafiinihoitoon",
  metaTitle: "Käsi- ja jalkahoito ohje: 14 vaihetta ja parafiinihoito",
  metaDescription:
    "Käsi- ja jalkahoito ohje vaihe vaiheelta: pussitettu allas, liotus, kuorinta, kynsinauhat, kantapäät, jalkahieronta, naamio, käsihieronta ja parafiinihoito.",
  keyword: "käsi- ja jalkahoito ohje",
  keywords: [
    "spa-jalkahoidon vaiheet",
    "parafiinihoito käsille ohje",
    "jalkahieronta ohje",
    "käsihieronta",
    "kantapäiden raspaus",
    "kuinka kauan jalkoja liotetaan",
  ],
  excerpt: "Spa-jalkahoito ja sen jälkeen käsihoito parafiinilla vaihe vaiheelta ilman lakkausta. Mukana muistettavat ajat ja kuusi yleistä virhettä.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("chuyen-vien-cham-soc-tay-cho-khach-ben-cua-so"),
    alt: "Kosmetologi istuu pienen pöydän ääressä kaari-ikkunan vieressä ja pitelee nojatuolissa istuvan, valkoiseen kylpytakkiin pukeutuneen asiakkaan kättä, asiakkaan paljaat jalat kivilattialla",
  },
  takeaways: [
    "Koko hoito kestää yleensä **45 minuutista tuntiin** hoito-ohjelman mukaan, eikä siinä lakata kynsiä.",
    "Jalka-altaassa uusi allaspussi; metalliset jalkahoitovälineet sterilointipussissaan, joka avataan asiakkaan edessä; uusi kertakäyttöinen viila ja hiomapala jokaiselle asiakkaalle.",
    "Liota jalkoja noin viidestä kymmeneen minuuttia lämpimässä vedessä, jonka olet testannut omaan ranteeseesi. Kuivaa huolellisesti, myös varpaanvälit.",
    "Kantapäät: **raspaa vähän, tunnustele paljon**. Sileä riittää, ei teriä, ja jos asiakasta kirvelee, olet mennyt liian pitkälle.",
    "Parafiini otetaan erilliseen kulhoon, levitetään siveltimellä ja pidetään noin kymmenen minuuttia valmistajan ohjeen mukaan. Jos asiakkaasta tuntuu liian kuumalta, lopeta ja irrota se heti.",
  ],
  intro: [
    "Käsi- ja jalkahoito ohje koostuu tässä kahdesta osasta: ensin jalkahoito ja sitten käsihoito parafiinilla. Kynsiä ei lakata missään vaiheessa. Koko hoito kestää yleensä noin 45 minuutista tuntiin hoitolasi hoito-ohjelman mukaan, ja osat limittyvät: kun asiakkaan jalat lepäävät naamion alla, siirryt käsiin.",
    "Artikkeli seuraa VaraaAi Academyn Spa ja ihonhoito -kurssin oppituntia ”Spa-käsi- ja jalkahoidot: vaihe vaiheelta”. Luettuasi osaat tehdä koko hoidon neljässätoista vaiheessa allaspussin asettamisesta altaan pesuun asiakkaan lähdettyä. Ajat ja tuotteet noudattavat hoitolasi hoito-ohjelmaa ja valmistajan ohjeita.",
  ],
  sections: [
    {
      id: "ennen-kuin-jalat-altaaseen",
      title: "Ennen kuin asiakkaan jalat menevät altaaseen",
      blocks: [
        { p: "Kolme asiaa tehdään ennen kuin vettä lasketaan: altaassa on uusi allaspussi, välineet ovat valmiina ja olet kysynyt asiakkaan terveydestä. Kysymys diabeteksesta ja verenkierrosta määrää koko hoidon, sillä näillä asiakkailla vesi on vain kädenlämpöistä, liotus lyhyempi eikä kuumaa parafiinia käytetä." },
        { p: "Kaksi pientä lisäkysymystä tekee hoidosta miellyttävämmän: mistä tuoksusta asiakas pitää ja haluaako hän jutella vai levätä." },
        { note: "Avaa metallisten jalkahoitovälineiden sterilointipussi asiakkaan silmien edessä. Se rauhoittaa asiakasta, eikä sinun tarvitse selittää mitään.", kind: "tip", title: "Ammattilaisen vinkki" },
        { p: "Miksi pussitettukin allas on pestävä, mitkä jalkojen merkit estävät hoidon ja miten diabeetikkoa hoidetaan, selitetään artikkelissa [Spa-jalkahoito ja -käsihoito](lesson:spa-tay-chan-hieu-dung)." },
      ],
    },
    {
      id: "muistettavat-ajat",
      title: "Muistettavat ajat: kuinka kauan jalkoja liotetaan ja parafiini pidetään",
      blocks: [
        {
          table: {
            head: ["Vaihe", "Aika", "Huomio"],
            rows: [
              ["Koko hoito", "Noin 45 minuutista tuntiin", "Hoitolan hoito-ohjelman mukaan"],
              ["Jalkojen liotus", "Noin 5–10 minuuttia", "Hoito-ohjelman mukaan; lämmin, ei kuuma"],
              ["Jalkanaamio", "Noin 10 minuuttia", "Valmistajan ohjeen mukaan"],
              ["Sormenpäiden liotus", "Muutama minuutti", "Kulho lämmintä vettä"],
              ["Parafiini käsille", "Noin 10 minuuttia", "Valmistajan ohjeen mukaan; lopeta heti, jos tuntuu liian kuumalta"],
            ],
          },
        },
        { p: "Nämä ovat oppitunnin tavallisia aikoja. Oikeat ajat omalle hoitolallesi löytyvät hoito-ohjelmasta ja tuotteiden etiketeistä." },
      ],
    },
    {
      id: "yleiset-virheet",
      title: "Kuusi yleistä virhettä käsi- ja jalkahoidossa",
      blocks: [
        {
          table: {
            head: ["Virhe", "Tee näin"],
            rows: [
              ["Liotusvesi liian kuumaa", "Lämmin vesi, testattuna ensin omaan ranteeseen"],
              ["Liian pitkä liotus", "Noin viidestä kymmeneen minuuttia hoito-ohjelman mukaan"],
              ["Kantapäitä raspataan, kunnes asiakasta kirvelee", "Muutama kevyt veto, tunnustele ja lopeta, kun iho on sileä"],
              ["Kynnen ympäriltä leikataan elävää ihoa", "Vain kevyt työntö pehmentimen jälkeen"],
              ["Edellisen asiakkaan viilaa käytetään uudelleen", "Viilat ja hiomapalat ovat kertakäyttöisiä: uudet jokaiselle asiakkaalle"],
              ["Varpaanvälit jäävät kuivaamatta", "Kuivaa jokainen varpaanväli, sillä kostea iho on juuri sitä, mistä sienet pitävät"],
            ],
          },
        },
        { p: "Kun vältät nämä kuusi virhettä, asiakas kokee hoidon puhtaaksi ja turvalliseksi." },
      ],
    },
    {
      id: "altaan-ja-valineiden-puhdistus",
      title: "Altaan ja välineiden puhdistus jokaisen asiakkaan jälkeen ja päivän päätteeksi",
      blocks: [
        { p: "Altaan puhdistusjärjestys ei koskaan muutu: allaspussi pois, pesu saippualla ja harjalla, huuhtelu ja desinfiointi koko etikettiin merkityn vaikutusajan. Metalliset välineet puhdistetaan ja steriloidaan oppitunnin [Välineet jokaisen asiakkaan jälkeen](lesson:ve-sinh-dung-cu) mukaisesti. Päivän päätteeksi puhdistetaan perusteellisemmin, etenkin poreallas, valmistajan ohjeen mukaan." },
        { note: "Hygieniasäännöt ovat esimerkkinä [Helsingin kaupungin ohjeesta](https://www.hel.fi/static/liitteet-2019/Kymp/asuminen-ja-ymparisto/ymparistoterveys/Hygiene-premises-instructions.pdf), jonka mukaan jalkahoitovälineet steriloidaan aina ja säilytetään erillään. Määräykset vaihtelevat maittain ja paikkakunnittain. Teriä ei käytetä ilman koulutusta ja lupaa. Artikkeli on koulutusmateriaalia, ei ammattipätevyys.", kind: "warn", title: "Määräykset vaihtelevat" },
      ],
    },
    {
      id: "kotiohjeet-ja-muistiinpanot",
      title: "Kotiohjeet asiakkaalle ja muistiinpanot seuraavaa kertaa varten",
      blocks: [
        {
          ul: [
            "Kosteuta kädet ja jalat joka päivä.",
            "Syvät tai kipeät kantapäähalkeamat tai sisäänkasvanut varpaankynsi: käy jalkaterapeutilla.",
          ],
        },
        { p: "VaraaAissa merkitset asiakkaan sisäisiin muistiinpanoihin [asiakasrekisterissä](lesson:khach-hang) ihon kunnon, mieluisan paineen ja käytetyt tuotteet. Kun [lisäät palvelun](lesson:dich-vu) ajanvaraussivullesi, aseta kesto niin, että aikaa jää myös altaan pesuun asiakkaan lähdettyä." },
      ],
    },
  ],
  howTo: {
    title: "Käsi- ja jalkahoidon vaiheet järjestyksessä",
    id: "kasi-ja-jalkahoidon-vaiheet",
    after: "ennen-kuin-jalat-altaaseen",
    lead: "Neljätoista vaihetta etenevät oppitunnin videon järjestyksessä: ensin jalat, kädet sillä aikaa kun jalat lepäävät naamion alla, ja lopuksi molemmat viimeistellään.",
    supplies: [
      "Jalka-allas ja kertakäyttöiset allaspussit; pieni kulho sormenpäiden liotukseen",
      "Metalliset jalkahoitovälineet steriloituina suljetussa pussissa",
      "Kertakäyttöiset viilat ja hiomapalat sekä jalkaraspi",
      "Hienojakoinen kuorinta, kynsinauhapehmennin, hierontavoide, kosteusvoide",
      "Jalkanaamio, ohut kääre ja lämpimät pyyhkeet, jos ne kuuluvat hoitoon",
      "Parafiini, erillinen kulho, sivellin, ohuet muovipussit ja froteelapaset",
      "Suojakäsineet, puhtaat pyyhkeet ja tyyny",
    ],
    steps: [
      {
        name: "Valmistele tuoli, allas ja välineet",
        text: "Desinfioi tuoli, pöytä ja tyyny ja aseta jalka-altaaseen uusi allaspussi. Metallisten jalkahoitovälineiden on oltava steriloituja ja yhä suljetussa pussissa, joka avataan asiakkaan edessä. Viilat ja hiomapalat ovat kertakäyttöisiä: jokaiselle asiakkaalle uudet.",
      },
      {
        name: "Kysy asiakkaalta ja laske vesi",
        text: "Kysy, onko asiakkaalla diabetes, huono verenkierto, allergioita tai haavoja; kysy myös, mistä tuoksusta hän pitää ja haluaako hän jutella vai levätä. Täytä pussitettu allas lämpimällä vedellä ja testaa se omaan ranteeseesi: lämmin, miellyttävä, ei kuuma. Diabeetikon kanssa ole vielä huolellisempi.",
      },
      {
        name: "Tarkista jalat ja liota",
        text: "Pese kädet ja pue käsineet. Katso jalat tarkasti, myös jalkapohjat ja varpaanvälit. Hilseilevä tai halkeillut iho varpaiden välissä, paksut värjäytyneet kynnet tai haava tarkoittavat, että aluetta ei hoideta ja asiakas ohjataan lääkäriin. Jos kaikki on kunnossa, pyydä asiakasta laskemaan jalat altaaseen ja liota noin viidestä kymmeneen minuuttia hoito-ohjelman mukaan.",
        image: { src: img("ngam-chan-trong-bon-lot-tui-nuoc-am"), alt: "Asiakkaan jalat liotuksessa valkoisessa posliinialtaassa, jossa on läpinäkyvä allaspussi, lämpimässä vedessä kelluu muutama valkoinen terälehti ja allas seisoo valkoisella pyyhkeellä", caption: "Pussitettu allas, lämmin vesi, noin viidestä kymmeneen minuuttia." },
      },
      {
        name: "Kuori jalat",
        text: "Nosta toinen jalka pyyhkeelle. Hiero kuorintaa kevyin pyörivin liikkein varpaista jalkapöydän yli nilkkaan ja kantapäähän huolellisemmin. Käytä vain hienojakoista kuorintaa, kuten sokeria tai hienoa suolaa, sillä isot terävät rakeet naarmuttavat ihoa helposti; vältä rikkinäistä ihoa. Huuhtele altaassa, kuivaa ja tee sitten toinen jalka.",
        image: { src: img("tay-da-chet-ban-chan-xoa-vong-nhe"), alt: "Mustiin käsineisiin pukeutunut kosmetologi tukee asiakkaan jalkaa valkoisella pyyhkeellä ja hieroo kuorintaa jalkapöydälle, tuotepurkki vieressä" },
      },
      {
        name: "Hoida varpaankynsien kynsinauhat",
        text: "Kuivaa jalat, myös varpaanvälit. Levitä kynsinauhapehmennintä, odota valmistajan ohjeen mukaan ja työnnä kynsinauhoja kevyesti steriloidulla työntimellä. Elävää ihoa ei koskaan leikata. Jos kynnet ovat pitkät, leikkaa ne suoraan poikki ja pyöristä kulmia kevyesti viilalla, kuten artikkelissa [Manikyyri ja pedikyyri ohje](lesson:cham-soc-mong-co-ban).",
      },
      {
        name: "Tasoita kantapäät",
        text: "Käytä jalkaraspia kevyesti ja tasaisesti valmistajan ohjeen mukaan. Tee muutama veto, tunnustele ihoa ja jatka vain tarvittaessa: raspaa vähän, tunnustele paljon. Sileä riittää; kaikkea kovettumaa ei tarvitse poistaa, eikä teriä käytetä. Jos asiakasta kirvelee, olet mennyt liian pitkälle.",
        image: { src: img("cha-got-chan-bang-ban-cha-nhe-tay"), alt: "Mustaan käsineeseen puettu käsi pitää jalkaraspia asiakkaan kantapäätä vasten, ja toinen käsi tukee jalkaa kermanvärisellä pyyhkeellä", caption: "Raspaa kevyesti ja tasaisesti ja tunnustele muutaman vedon jälkeen." },
      },
      {
        name: "Hiero jalat",
        text: "Levitä hierontavoidetta. Tee pitkiä sivelyjä varpaista ylös nilkkaan ja pohkeeseen, sydäntä kohti. Tee peukaloilla pieniä ympyröitä jalkapohjaa pitkin ja sivele sitten kukin varvas kevyesti. Kysy, onko paine sopiva, äläkä koskaan paina suonikohjuja. Lopeta kumpikin jalka muutamaan pitkään, hidastuvaan sivelyyn ja kääri se lämpimään pyyhkeeseen, ettei asiakkaalle tule kylmä.",
        image: { src: img("massage-ban-chan-vuot-ve-phia-tim"), alt: "Kaksi mustiin käsineisiin puettua kättä pitelee kermanvärisellä pyyhkeellä lepäävää asiakkaan jalkaa, toinen jalkapöydällä ja toinen kantapäätä tukien, keskellä sivelyä" },
      },
      {
        name: "Levitä jalkanaamio, jos se kuuluu hoitoon",
        text: "Levitä kerros naamiota, peitä jalat ohuella kääreellä ja kääri ne lämpimiin pyyhkeisiin noin kymmeneksi minuutiksi valmistajan ohjeen mukaan. Kun asiakas rentoutuu, siirry hänen käsiinsä.",
        image: { src: img("u-mat-na-chan-boc-mang-va-khan-am"), alt: "Asiakkaan molemmat jalat on peitetty ohuella läpinäkyvällä kääreellä, ja kosmetologi käärii lämpimän valkoisen pyyhkeen kummankin tyynyllä lepäävän jalan ympärille", caption: "Ohut kääre ja lämpimät pyyhkeet; jalat lepäävät sillä aikaa kun hoidat käsiä." },
      },
      {
        name: "Liota ja kuori kädet",
        text: "Liota sormenpäitä kulhossa lämmintä vettä muutama minuutti ja kuivaa ne. Kuori kevyemmin kuin jalat, koska käsien iho on ohuempaa. Työnnä sitten kynsinauhoja kevyesti, kuten jaloissa.",
        image: { src: img("ngam-dau-ngon-tay-trong-bat-nuoc-am"), alt: "Asiakkaan sormenpäät liotuksessa pienessä valkoisessa posliinikulhossa lämmintä vettä kivipöydällä, toinen käsi kermanvärisellä pyyhkeellä ja kosmetologi istuu vastapäätä" },
      },
      {
        name: "Hiero kädet",
        text: "Riisu käsineet ja pese kädet. Sivele kämmenselkää molemmilla peukaloilla rystysistä kohti rannetta. Tee kevyitä ympyröitä kämmeneen ja sivele sitten jokaista sormea tyvestä kärkeen. Kohtuullinen paine, hitaasti ja tasaisesti. Lopeta muutamaan pitkään, hidastuvaan sivelyyn kämmenselästä ylös kyynärvarteen.",
        image: { src: img("massage-mu-ban-tay-bang-hai-ngon-cai"), alt: "Kosmetologi pitelee molemmin käsin kermanvärisellä pyyhkeellä lepäävää asiakkaan kättä ja sivelee peukaloillaan kämmenselkää, asiakas rentoutuu taustalla" },
      },
      {
        name: "Sivele parafiini ja anna käsien levätä",
        text: "Tarkista lämpötila valmistajan ohjeen mukaan ja testaa se sitten omaan ranteeseesi; käytä vain ehjälle iholle. Ota parafiinia erilliseen kulhoon, äläkä koskaan kasta asiakkaan kättä yhteiseen lämmittimeen. Sivele muutama kerros kämmenselälle ja kämmeneen, peitä ohuella pussilla, pue froteelapanen ja anna olla noin kymmenen minuuttia valmistajan ohjeen mukaan. Jos asiakkaasta tuntuu liian kuumalta, lopeta ja irrota parafiini heti.",
        image: { src: img("u-paraffin-tay-boc-tui-va-bao-tay-bong"), alt: "Asiakkaan kädet lepäävät kermanvärisellä pyyhkeellä, toinen ohuessa läpinäkyvässä pussissa ja toinen jo kermanvärisessä froteelapasessa, jota kosmetologi asettelee", caption: "Parafiinin päälle ohut pussi ja sitten froteelapanen pitämään lämmön." },
      },
      {
        name: "Irrota parafiini ja levitä kosteusvoide",
        text: "Riisu lapanen ja irrota parafiini yhtenä kappaleena. Käytetty parafiini heitetään pois. Levitä käsivoidetta kevein sivelyin. Avaa sitten jalkojen pyyhkeet, pyyhi naamio pois ja levitä jalkavoidetta. Katso vielä kerran käsien ja jalkojen iho, ettei missään ole punoitusta tai kirvelyä.",
        image: { src: img("boc-lop-paraffin-khoi-ban-tay"), alt: "Kosmetologi irrottaa maidonvalkoisen parafiinikerroksen yhtenä kappaleena asiakkaan kämmenselältä, ja käsi lepää kivipöydällä" },
      },
      {
        name: "Anna ohjeet ja kirjaa",
        text: "Neuvo asiakasta kosteuttamaan kädet ja jalat joka päivä. Syvät tai kipeät kantapäähalkeamat tai sisäänkasvanut varpaankynsi kannattaa näyttää jalkaterapeutille. Kirjaa asiakkaan muistiinpanoihin ihon kunto, mieluisa paine ja käytetyt tuotteet.",
      },
      {
        name: "Siivoa",
        text: "Poista allaspussi, pese allas saippualla ja harjalla, huuhtele ja desinfioi koko etikettiin merkityn vaikutusajan. Metalliset välineet puhdistetaan ja steriloidaan. Pyyhkeet menevät kannelliseen pyykkikoriin. Pyyhi tuoli ja [pese kädet](lesson:rua-tay-gang-tay).",
      },
    ],
  },
  faq: [
    {
      q: "Mitä vaiheita spa-käsi- ja jalkahoitoon kuuluu?",
      a: "Jalat: pussitetun altaan valmistelu, terveyskysymykset, jalkojen tarkastus, liotus, kuorinta, kynsinauhojen hoito, kantapäiden tasoitus, hieronta ja jalkanaamio, jos se kuuluu hoitoon. Kädet: sormenpäiden liotus, kevyt kuorinta, hieronta ja parafiini. Hoito päättyy kosteusvoiteeseen, kotiohjeisiin ja siivoukseen, eikä kynsiä lakata.",
    },
    {
      q: "Kuinka kauan spa-käsi- ja jalkahoito kestää?",
      a: "Yleensä noin 45 minuutista tuntiin hoitolan hoito-ohjelman mukaan. Siitä jalkojen liotus vie noin viidestä kymmeneen minuuttia, ja jalkanaamio ja käsien parafiini kumpikin noin kymmenen minuuttia valmistajan ohjeen mukaan.",
    },
    {
      q: "Miten parafiinihoito käsille tehdään hoitolassa?",
      a: "Tarkista lämpötila valmistajan ohjeen mukaan ja testaa se omaan ranteeseesi, ja käytä parafiinia vain ehjälle iholle. Ota parafiinia erilliseen kulhoon, sivele muutama kerros kämmenselälle ja kämmeneen, peitä ohuella pussilla ja froteelapasella ja anna olla noin kymmenen minuuttia. Irrota se sitten yhtenä kappaleena, heitä käytetty parafiini pois ja levitä kosteusvoide.",
    },
    {
      q: "Miten kantapäät raspataan niin, ettei iho kirvele?",
      a: "Käytä jalkaraspia kevyesti ja tasaisesti muutama veto kerrallaan ja tunnustele sitten ihoa. Sileät kantapäät riittävät; kaikkea kovettumaa ei tarvitse poistaa, eikä teriä käytetä. Jos asiakasta kirvelee, raspaus on mennyt liian pitkälle.",
    },
    {
      q: "Mihin suuntaan jalkoja hierotaan?",
      a: "Pitkät sivelyt kulkevat varpaista ylös nilkkaan ja pohkeeseen eli sydäntä kohti. Peukalot tekevät pieniä ympyröitä jalkapohjaa pitkin, ja sitten kukin varvas sivellään kevyesti. Suonikohjuja ei koskaan paineta, ja asiakkaalta kysytään, onko paine sopiva.",
    },
    {
      q: "Miksi varpaanvälit pitää kuivata liotuksen jälkeen?",
      a: "Kostea iho varpaiden välissä on juuri sitä, mistä sienet pitävät. Liotuksen ja kuorinnan huuhtelun jälkeen jalat kuivataan huolellisesti, jokainen varpaanväli, ennen seuraavia vaiheita.",
    },
  ],
  related: ["spa-tay-chan-hieu-dung", "cham-soc-mong-co-ban", "spa-massage-body", "ve-sinh-dung-cu"],
};

export default article;
