import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/say-tao-kieu-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "hiusten-foonaus-ilman-vaurioita",
  lesson: "say-tao-kieu-hieu-dung",
  category: "hair",
  title: "Hiusten föönaus ilman vaurioita: miksi hiukset kiiltävät, pitävät muotonsa ja kestävät lämmön",
  metaTitle: "Hiusten föönaus ilman vaurioita: kiilto, pito ja lämpö",
  metaDescription:
    "Hiusten föönaus selitettynä: miksi suutin osoittaa alas, esikuivaus, pyörö- ja melaharja, viileä puhallus, kiharat diffuuserilla ja turvallinen lämpö.",
  keyword: "hiusten föönaus",
  keywords: [
    "vaurioittaako föönaus hiuksia",
    "hiukset pörröiset föönauksen jälkeen",
    "mihin föönin viileää puhallusta käytetään",
    "pyöröharja vai melaharja",
    "lämpösuoja ennen föönausta",
    "kiharien hiusten kuivaus diffuuserilla",
    "föönaus ilman kuivia latvoja",
  ],
  excerpt: "Hiukset pitävät muodon, kun ne ovat täysin kuivat ja jäähtyneet, ja kiiltävät, kun ilma puhaltaa hiusvartta pitkin alaspäin. Nämä kaksi asiaa selittävät lähes kaiken föönauksesta.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-toc-say-toc-dai-bang-luoc-tron-va-may-say"),
    alt: "Kampaaja nostaa pyöröharjalla asiakkaan päälaen suortuvaa ja kuivaa sitä mustalla föönillä, ja pitkähiuksinen vaalea asiakas hymyilee kultakehyksisessä peilissä",
  },
  takeaways: [
    "Märkiä hiuksia on helppo muotoilla. Uuden muodon ne pitävät vasta **täysin kuivina ja jäähtyneinä**, joten viileä puhallus on oikea muotoiluvaihe.",
    "Suutin osoittaa aina **hiusvartta pitkin alaspäin**. Ylöspäin puhaltava ilma nostaa kutikulan, ja hiukset jäävät pörröisiksi ja himmeiksi.",
    "Esikuivaa käsin noin seitsemän–kahdeksankymmenen prosentin kuivuuteen ennen harjaa: se on nopeampaa ja hiukset saavat vähemmän lämpöä.",
    "Melaharja antaa suoraa ja sileää, pyöröharja kohotusta, taivutetut latvat ja kiharaa. Säilytettävät luonnonkiharat kuivataan diffuuserilla ilman harjausta.",
    "Älä koskaan paina suutinta hiuspohjaa vasten tai pidä sitä liian kauan yhdessä kohdassa, ja kysy asiakkaalta, onko liian kuuma.",
  ],
  intro: [
    "Hiusten föönaus ilman vaurioita ei ala pyöröharjasta. Se alkaa kahdesta lyhyestä tosiasiasta itse hiuksesta: märkää hiusta on helppo muotoilla ja se pitää muodon vasta kuivana ja jäähtyneenä, ja jokaisen hiuksen pintaa peittävät suomut, jotka ovat tyvestä latvaan päin. Kun nämä kaksi asiaa ymmärtää, osaa itse vastata, miksi hiukset pörröistyvät föönauksen jälkeen, miksi kampaus lässähtää tunnissa ja miten kuivata hiuksia vahingoittamatta niitä.",
    "Artikkeli seuraa VaraaAi Academyn Hiukset-kurssin oppituntia ”Föönaus: ymmärrä se, niin hiukset kiiltävät vahingoittumatta”. Föönaus on jokaisen hiuspalvelun viimeinen vaihe, ja asiakas arvioi usein koko käynnin noiden viimeisten minuuttien perusteella: kaunis leikkaus pörröiseksi föönattuna ei hänen silmissään näytä kauniilta. Luettuasi ymmärrät jokaisen liikkeen syyn. Vaiheittainen työjärjestys pitkissä hiuksissa on artikkelissa [föönaus pyöröharjalla](lesson:say-tao-kieu).",
  ],
  sections: [
    {
      id: "miksi-foonaus-muotoilee",
      title: "Miksi föönaus muotoilee hiuksia ja miksi muoto katoaa",
      blocks: [
        { p: "Kun hiukset ovat märät, vesi löysentää hiuksen sisällä olevia pieniä sidoksia. Silloin hiusta on helppo taivuttaa haluttuun muotoon. Kun hius kuivuu ja jäähtyy, sidokset sulkeutuvat uudelleen ja pitävät hiuksen uudessa muodossaan." },
        { p: "Tästä seuraa kaksi asiaa, joiden kanssa kampaaja työskentelee joka päivä:" },
        {
          ul: [
            "**Hiusten on oltava täysin kuivat ja jäähtyneet, jotta muoto pysyy.** Jos tyveen tai niskaan jää kosteutta, kampaus lässähtää.",
            "**Kun hiukset kastuvat uudelleen tai kohtaavat kostean ilman, muoto katoaa vähitellen.** Se kuuluu hiuksen luonteeseen, eikä se ole föönaajan vika.",
          ],
        },
      ],
    },
    {
      id: "porroiset-hiukset",
      title: "Hiukset pörröiset föönauksen jälkeen: kutikula ja ilmavirran suunta",
      blocks: [
        { p: "Jokaisen hiuksen pinnalla on kutikula, kattotiilien tapaan päällekkäin asettuvien suomujen kerros, joka osoittaa tyvestä latvaa kohti. Ilman suunta ratkaisee, miten nämä tiilet asettuvat." },
        {
          table: {
            head: ["Ilmavirta", "Kutikula", "Miltä hiukset näyttävät"],
            rows: [
              ["Hiusta pitkin alas, tyvestä latvaan", "Asettuu sileäksi", "Valo heijastuu tasaisesti, hiukset kiiltävät"],
              ["Hiusta pitkin ylös, latvasta tyveen", "Nousee pystyyn", "Pörröiset ja himmeät"],
            ],
          },
        },
        { p: "Siksi suutin osoittaa aina hiusvartta pitkin alaspäin, myös silloin, kun nostat hiuksia kohotusta varten. Jos puhallat latvoista ylöspäin, hiukset pörröistyvät heti, vaikka niissä ei ole mitään vikaa." },
      ],
    },
    {
      id: "ennen-harjaa",
      title: "Ennen harjaa: pyyhekuivaus, lämpösuoja ja esikuivaus",
      blocks: [
        { p: "Hyvä föönaus alkaa jo ennen kuin fööni käynnistyy. Kuivaa hiukset pyyhkeellä painelemalla, ei hankaamalla. Selvitä takut latvoista alkaen. Levitä sitten lämpösuoja, suihkuttaen tai hieroen tasaisesti pituuksiin ja latvoihin, sen määrän ja tavan mukaan, jonka tuotteen ohje kertoo." },
        { img: { src: img("tham-khan-ep-toc-uot-truoc-khi-say"), alt: "Asiakkaan takana seisova kampaaja painelee asiakkaan märkiä hiuksia kevyesti kermanvärisellä pyyhkeellä, asiakas istuu suorassa peilin edessä", caption: "Paina pyyhettä tyvestä latvaan, älä hankaa." } },
        { note: "Lämpösuoja vähentää vaurioita, mutta ei korvaa oikeaa tekniikkaa. Jos lämpö on liian kova tai fööni pysyy liian kauan yhdessä kohdassa, mikään tuote ei pelasta hiuksia.", kind: "warn", title: "Tuote ei korvaa tekniikkaa" },
        { h3: "Esikuivaa ensin käsin" },
        { p: "Älä ota pyöröharjaa heti käteen. Esikuivaa hiukset käsin, kunnes ne ovat noin seitsemän–kahdeksankymmenen prosentin kuivuudessa, ja vasta sitten jaa ne osioihin ja ota harja. Esikuivaus on paljon nopeampaa, ja hiukset saavat vähemmän lämpöä. Harjan kuljettaminen läpimärissä hiuksissa vie pitkään ja vetää hiuksia paljon." },
        { p: "Hiukset jaetaan kuten leikatessa, niskasta alkaen ja ylöspäin edeten. Jokainen jako on enintään harjan levyinen eikä liian paksu, jotta ilma pääsee sen läpi kokonaan." },
      ],
    },
    {
      id: "harjat-suutin-viilea-puhallus",
      title: "Pyöröharja vai melaharja, kapea suutin ja viileä puhallus",
      blocks: [
        {
          table: {
            head: ["Väline", "Käyttö", "Huomioi"],
            rows: [
              ["Leveä melaharja", "Suora ja sileä tulos nopeasti, vähän kohotusta", "Fööni kulkee harjan yläpuolella, suutin alaspäin"],
              ["Iso pyöröharja", "Kohotus ja pehmeästi taipuvat latvat", "Monessa on metalli- tai keraamirunko, joka kuumenee; pidä se irti hiuspohjasta"],
              ["Pieni pyöröharja", "Kiharammat latvat", "Sama varoitus kuumenevasta rungosta"],
              ["Kapea suutin", "Kohdistaa ilman kapeaksi kaistaksi juuri harjan kohdalle", "Aina paikallaan muotoillessa"],
            ],
          },
        },
        { img: { src: img("say-toc-thang-bang-luoc-det"), alt: "Kampaaja harjaa asiakkaan pitkää vaaleaa suortuvaa suoraan alas leveällä melaharjalla, musta fööni harjan yläpuolella alaspäin suunnattuna", caption: "Melaharja antaa suoran ja sileän tuloksen vähällä kohotuksella." } },
        { p: "Kapea suutin on harjan suuntainen, osoittaa hiusta pitkin alaspäin ja on muutaman sentin päässä harjasta. Fööni seuraa harjaa tyvestä latvaan. Harjassa on oltava riittävä veto, jotta hiukset tulevat sileiksi ja kiiltäviksi, mutta vedät hiuksia, et asiakkaan päätä." },
        { note: "Jos asiakkaan pää seuraa harjaa, vedät liian kovaa. Kevennä otetta ja ota pienempiä jakoja.", kind: "tip", title: "Merkki liian kovasta vedosta" },
        { h3: "Mihin viileää puhallusta käytetään" },
        { p: "Moni kampaaja ohittaa tämän painikkeen. Kun jako on kuivattu lämpimällä ilmalla, pidä se harjalla, paina viileää puhallusta muutama sekunti sen jäähdyttämiseksi ja päästä harja vasta sitten irti. Hius pitää pidempään sen muodon, jossa se jäähtyi. Jos irrotat harjan hiusten ollessa vielä kuumat, suortuva oikenee ja lässähtää helposti." },
        { img: { src: img("giu-lon-toc-tren-luoc-tron-bam-gio-mat"), alt: "Lähikuva isolle pyöröharjalle latvojen läheltä kierretystä vaaleasta suortuvasta, johon mustan föönin kapea suutin on suunnattu", caption: "Suortuva pysyy harjalla, kunnes se on jäähtynyt." } },
      ],
    },
    {
      id: "kohotus-sileys-latvat-kiharat",
      title: "Kohotus, sileys, latvat sisään ja kiharien hiusten kuivaus",
      blocks: [
        { p: "Sama pyöröharja antaa eri tuloksen sen mukaan, missä kohtaa pidät suortuvaa suhteessa päähän." },
        {
          table: {
            head: ["Haluat", "Pidä hius", "Kuivaa"],
            rows: [
              ["Tyvikohotusta", "Nosta jako korkealle, vastoin sen laskeutumissuuntaa", "Tyvi ensin, jotta se kuivuu pystyssä"],
              ["Sileän, päänmyötäisen", "Ohjaa jako alas pään myötäisesti", "Alaspäin tyvestä latvaan"],
              ["Latvat sisäänpäin, kuten polkassa", "Pyöröharja jaon alla", "Käännä harjaa latvoissa sisäänpäin"],
            ],
          },
        },
        { img: { src: img("say-cup-duoi-toc-bob-bang-luoc-tron"), alt: "Kampaaja kuivaa asiakkaan leuan mittaista vaaleaa polkkaa isolla pyöröharjalla ja kääntää latvoja kevyesti sisäänpäin, fööni osoittaa ylhäältä alas", caption: "Latvat sisään: harja jaon alla ja käännös sisäänpäin latvoissa." } },
        { h3: "Luonnonkiharat ovat eri asia" },
        { p: "Jos asiakas haluaa säilyttää kiharansa, älä käytä harjaa äläkä kampaa hiuksia niiden kuivuessa, koska kiharat hajoavat pörröksi. Käytä diffuuseria, isoa pyöreää ja piikkistä lisäosaa, pienellä puhalluksella ja keskilämmöllä. Nosta hiukset diffuuserin kuppiin, pidä paikallaan hetki ja siirry sitten seuraavaan kohtaan. Koske hiuksiin mahdollisimman vähän, kunnes ne ovat täysin kuivat." },
        { img: { src: img("toc-xoan-tu-nhien-giu-lon-sau-khi-say"), alt: "Kuivakiharainen kastanjanruskea nainen, jonka joustavaa kiharaa kampaaja nostaa kevyesti sormenpäillään", caption: "Kiharat säilyttävät muotonsa, kun hiukset kuivuvat ilman harjausta." } },
      ],
    },
    {
      id: "vaurioittaako-foonaus",
      title: "Vaurioittaako föönaus hiuksia: lämpö, etäisyys ja hiuspohja",
      blocks: [
        { p: "Lämpö vahingoittaa hiusta, kun se on liian kova kyseiselle hiukselle tai kun se pysyy yhdessä kohdassa. Kumpikin on föönin pitelijän käsissä." },
        {
          ul: [
            "**Ohuet, hauraat, värjätyt tai vaalennetut hiukset:** kohtuullinen lämpö.",
            "**Paksut, karkeat hiukset:** kestävät enemmän lämpöä, mutta pidä fööni koko ajan liikkeessä.",
            "**Kaikki hiustyypit:** älä koskaan paina suutinta hiuspohjaa vasten tai pidä sitä liian kauan yhdessä kohdassa.",
          ],
        },
        { note: "Hiuspohja, korvat ja niska palavat helposti. Kysy asiakkaalta aika ajoin, onko liian kuuma, ja käytä fööniä valmistajan ohjeen mukaan. Mitä tehdä, jos asiakas kuitenkin saa palovamman, kerrotaan artikkelissa [ensiapu kauneushoitolassa](lesson:xu-ly-su-co).", kind: "warn", title: "Hiuspohjan palovammat ovat todellisia" },
        { p: "Artikkelin sisältö on yleistä ammattikokemusta harjoittelua varten. Jokaisella maalla ja koululla on omat työtapansa, ja oppitunti on koulutusmateriaalia, ei ammattipätevyys." },
      ],
    },
    {
      id: "tyoasento-hygienia-muistiinpanot",
      title: "Kampaajan työasento, harjojen hygienia ja asiakkaan muistiinpanot",
      blocks: [
        { p: "Päivä, jona föönaat monta asiakasta, kuormittaa kampaajan hartioita ja ranteita paljon. Nosta asiakkaan tuoli korkeudelle, jossa kyynärpääsi pysyvät olkapäiden alapuolella. Seiso selkä suorana, jalat hieman erillään ja ranteet suorina. Vaihda kättä, kun voit, ja valitse kevyt fööni." },
        { p: "Poista jokaisen asiakkaan jälkeen kaikki hiukset harjoista, pese ne ja desinfioi tuotteen ohjeen mukaan, kuten artikkelissa [välineiden desinfiointi](lesson:ve-sinh-dung-cu). Myös föönin takana oleva suodatin on puhdistettava säännöllisesti: kun se tukkeutuu pölystä ja hiuksista, fööni kuumenee, puhallus heikkenee ja laite kuluu nopeammin." },
        { img: { src: img("go-toc-khoi-luoc-tron-sau-moi-khach"), alt: "Mustiin käsineisiin puetut kädet poistavat kamman hännällä hiuksia pyöröharjasta kivitasolla, vieressä pyyhkeen päällä melaharja ja suihkepullo" } },
        { p: "Föönaus on palvelu, joka tarvitsee oman aikansa. [Aseta VaraaAissa omat kestot](lesson:dich-vu) palveluille ”Leikkaus + föönaus” ja ”Pelkkä föönaus”, jotta [ajanvarauskalenteri](lesson:lich-hen) ei mene liian tiukaksi. Kirjaa asiakkaan muistiinpanoihin [asiakastiedoissa](lesson:khach-hang) harja, tuotteet ja asiakkaan toivoma tyyli, kohottava vai sileä, jotta seuraava föönaaja tietää sen." },
      ],
    },
  ],
  faq: [
    {
      q: "Miten hiukset föönataan vahingoittamatta niitä?",
      a: "Kuivaa pyyhkeellä painelemalla, selvitä takut, levitä lämpösuoja ohjeen mukaan ja esikuivaa käsin noin seitsemän–kahdeksankymmenen prosentin kuivuuteen ennen harjaa. Pidä suutin hiusvartta pitkin alaspäin ja koko ajan liikkeessä, käytä ohuisiin tai värjättyihin hiuksiin kohtuullista lämpöä ja jäähdytä jokainen jako viileällä puhalluksella ennen kuin irrotat harjan.",
    },
    {
      q: "Miksi hiukset ovat pörröiset föönauksen jälkeen?",
      a: "Yleensä siksi, että ilma puhalsi latvoista ylöspäin kohti tyveä. Kutikula on kuin kattotiilet tyvestä latvaan, ja väärään suuntaan puhaltava ilma nostaa sen, jolloin hiukset näyttävät pörröisiltä ja himmeiltä. Suuntaa suutin hiusvartta pitkin alaspäin. Kiharissa hiuksissa myös harjaaminen kuivumisen aikana hajottaa kiharat pörröksi.",
    },
    {
      q: "Mihin föönin viileää puhallusta käytetään?",
      a: "Sillä jäähdytetään juuri kuivattu jako, kun se on vielä harjalla. Hius pitää muotonsa, kun se on kuiva ja jäähtynyt, joten muutaman sekunnin viileä puhallus ennen harjan irrottamista saa kampauksen kestämään pidempään. Jos irrotat harjan hiusten ollessa vielä kuumat, suortuva oikenee ja lässähtää helposti.",
    },
    {
      q: "Vaurioittaako föönaus hiuksia?",
      a: "Voi vaurioittaa, jos lämpö on liian kova tai fööni pysyy liian kauan yhdessä kohdassa. Ohuet, hauraat, värjätyt tai vaalennetut hiukset tarvitsevat kohtuullisen lämmön; paksut hiukset kestävät enemmän, mutta föönin on oltava koko ajan liikkeessä. Lämpösuoja vähentää vaurioita, mutta ei korvaa oikeaa tekniikkaa.",
    },
    {
      q: "Pyöröharja vai melaharja: kumpi föönaukseen?",
      a: "Leveä melaharja antaa suoran ja sileän tuloksen nopeasti ja vähällä kohotuksella. Pyöröharjalla saat kohotusta, taivutetut latvat tai kiharaa: iso harja antaa pehmeän taipuman, pieni enemmän kiharaa. Metalli- tai keraamirunkoiset pyöröharjat kuumenevat, joten pidä ne irti hiuspohjasta.",
    },
    {
      q: "Miten luonnonkiharat kuivataan niin, että kiharat säilyvät?",
      a: "Käytä diffuuseria pienellä puhalluksella ja keskilämmöllä. Nosta hiukset diffuuserin kuppiin, pidä paikallaan hetki ja siirry seuraavaan kohtaan, koske hiuksiin mahdollisimman vähän äläkä harjaa niitä ennen kuin ne ovat täysin kuivat.",
    },
  ],
  related: ["say-tao-kieu", "cat-nu-tang-hieu-dung", "cat-mai-hieu-dung", "ve-sinh-dung-cu"],
};

export default article;
