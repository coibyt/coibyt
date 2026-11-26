import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/spa-soi-da/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "ihoanalyysi-vaihe-vaiheelta",
  lesson: "spa-soi-da",
  category: "spa",
  title: "Ihoanalyysi vaihe vaiheelta: 10 vaihetta konsultaatiosta hoidon valintaan",
  metaTitle: "Ihoanalyysi vaihe vaiheelta: 10 vaihetta hoitolassa",
  metaDescription:
    "Ihoanalyysi vaihe vaiheelta: esitietolomake, puhdistus, alue kerrallaan suurennuslampun alla, imupaperitesti, kirjaukset ja kasvohoidon valinta asiakkaalle.",
  keyword: "ihoanalyysi",
  keywords: [
    "ihoanalyysi vaihe vaiheelta",
    "ihotyypin määritys",
    "ihoanalyysi suurennuslampulla",
    "imupaperitesti iholle",
    "konsultaatio ennen kasvohoitoa",
    "esitietolomake kosmetologille",
  ],
  excerpt: "Ihoanalyysi ja konsultaatio uudelle asiakkaalle: kysy ensin, puhdista, käy viisi aluetta läpi aina samassa järjestyksessä, testaa imupaperilla ja kirjaa havainnot.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("soi-da-bang-den-lup-cho-khach-tai-spa"),
    alt: "Kosmetologi kumartuu valaistun pyöreän suurennuslampun ylle tutkimaan asiakkaan kasvoja, asiakas makaa hoitopöydällä vanulaput silmillään kaari-ikkunan vieressä",
  },
  takeaways: [
    "Koko käynnin ajan pätee kolme sääntöä: **kysy ennen kuin aloitat**, arvioi **puhdas iho** hyvässä valossa, äläkä **diagnosoi**.",
    "Peitä asiakkaan silmät vanulapuilla ennen kuin tuot suurennuslampun lähelle, koska lamppu on hyvin kirkas.",
    "Etene aina samassa järjestyksessä: otsa, T-alue, posket, leukalinja ja leuka, kaula.",
    "Paina imupaperia otsalle, nenälle ja poskille: kohdassa, jossa paperi muuttuu läpikuultavaksi, on enemmän rasvaa.",
    "Kirjaa näkemäsi, älä koskaan sairauden nimeä, ja vain asiakkaan luvalla.",
  ],
  intro: [
    "Hyvä ihoanalyysi ei ala suurennuslampusta vaan kysymyksistä. Ennen kuin katsot ihoa, sinun on tiedettävä, mille asiakas on allerginen, mitä lääkkeitä hän käyttää ja mitä hän levittää iholleen kotona. Sen jälkeen iho puhdistetaan, käydään läpi alue kerrallaan aina samassa järjestyksessä, testataan imupaperilla ja sormenpäillä, ja kaikki kirjataan. Tämä työjärjestys ratkaisee, sopiiko sitä seuraava kasvohoito iholle.",
    "Artikkeli seuraa VaraaAi Academyn Spa ja ihonhoito -kurssin oppituntia ”Ihoanalyysi ja konsultaatio: vaihe vaiheelta”, jossa analyysi tehdään uudelle asiakkaalle. Alla olevien kymmenen vaiheen avulla arvioit ihon, määrität asiakkaan ihotyypin ja ihon kunnon ja osaat selittää hänelle, mikä hoito sopii tänään. Jos ihotyypin ja ihon kunnon ero on vielä epäselvä, lue ensin teoria-artikkeli [Ihotyypit ja ihon kunto](lesson:spa-soi-da-hieu-dung).",
  ],
  sections: [
    {
      id: "kolme-saantoa",
      title: "Ihoanalyysin kolme sääntöä",
      blocks: [
        {
          table: {
            head: ["Sääntö", "Miksi"],
            rows: [
              ["Kysy ennen kuin aloitat", "Lääkkeet, käytössä olevat tuotteet ja viimeaikaiset hoidot muuttavat sitä, mitä iho kestää, eikä niitä näe silmällä"],
              ["Arvioi puhdas iho hyvässä valossa", "Meikin tai voiteen läpi iho tulkitaan väärin alusta asti"],
              ["Älä diagnosoi", "Kosmetologi kuvailee näkemänsä. Sairauden nimeäminen kuuluu lääkärille"],
            ],
          },
        },
        { note: "Oppitunti on koulutusmateriaalia, ei ammattipätevyys. Kosmetologin työn rajat ja hygieniavaatimukset vaihtelevat maittain.", kind: "info", title: "Ennen kuin aloitat" },
      ],
    },
    {
      id: "alue-kerrallaan",
      title: "Ihoanalyysi suurennuslampulla: mitä kultakin alueelta katsotaan",
      blocks: [
        { p: "Kiinteä järjestys tekee kaksi asiaa: mikään alue ei jää huomaamatta, ja seuraavalla kerralla ihoa on helppo verrata aiempiin merkintöihin. Jokaisella alueella on omat asiansa, joita etsitään." },
        {
          table: {
            head: ["Alue", "Mitä katsotaan"],
            rows: [
              ["Otsa", "Rasva, huokoset, vaakasuorat juonteet"],
              ["T-alue (otsan keskiosa, nenä, leuka)", "Yleensä rasvaisin alue, jossa on eniten mustapäitä"],
              ["Posket", "Punoitus, pienet verisuonet, ruskeat läiskät, kuivuus"],
              ["Leukalinja ja leuka", "Pienet näppylät, kyhmyt ihon alla"],
              ["Kaula", "Iho on ohutta ja tarvitsee samaa huolenpitoa kuin kasvot"],
            ],
          },
        },
        { note: "Katso ihoa useasta kulmasta. Kun kallistat lamppua niin, että valo osuu ihoon viistosti, näet selvästi pinnan rakenteen, huokoset ja hienot juonteet. Suoraan katsottuna näet värit: punoituksen, ruskeat läiskät ja tummat jäljet.", kind: "tip", title: "Viisto valo pinnalle, suora katse väreille" },
        { p: "Kolme kohtaa unohtuu helposti: korvien ympärys, hiusraja ja leuan alus. Niissä on usein pieniä näppylöitä, joita harva huomaa." },
      ],
    },
    {
      id: "tulkinta",
      title: "Ihotyypin määritys havaintojen perusteella",
      blocks: [
        { p: "Se, mitä näit lampun alla ja tunsit sormenpäilläsi, muodostaa arvion. Nämä tilanteet tulevat vastaan useimmin." },
        {
          table: {
            head: ["Näet", "Arvio", "Muista"],
            rows: [
              ["T-alue kiiltää, posket kuivat", "Sekaiho", "Eri alueet voivat tarvita eri hoitoa"],
              ["Mustapäitä nenässä ja leuassa", "Tukkeutunut iho", "Epäpuhtauksien poisto vain koulutettuna ja salongin luvalla"],
              ["Punoitusta poskissa, pieniä verisuonia näkyvissä", "Iho on juuri nyt herkkä", "Työskentele hyvin kevyesti, valitse miedot tuotteet"],
              ["Ruskeita läiskiä poskipäissä", "Pigmenttimuutos", "Liittyy vahvasti aurinkoon"],
              ["Imupaperi muuttuu läpikuultavaksi", "Alue on rasvainen", "Testaa vasta, kun iho on levännyt puhdistuksen jälkeen"],
              ["Punertuu kevyestä kosketuksesta", "Herkkä iho", "Kirjaa se ja valitse miedot tuotteet"],
            ],
          },
        },
        { img: { src: img("luot-dau-ngon-tay-tren-ma-de-cam-nhan-da"), alt: "Valkoista otsapantaa käyttävä asiakas makaa silmät kiinni, ja kosmetologi asettaa kummankin käden sormenpäät kevyesti hänen poskilleen", caption: "Sormenpäät liukuvat kevyesti poskilla: onko iho sileä, karhea vai kireä." } },
        { p: "Arvio koskee ihotyyppiä ja ihon kuntoa, ei sairautta. Sama iho voi olla yhtä aikaa sekaiho, hieman kuivunut ja nenän kohdalta tukkeutunut, ja kaikki kolme kirjataan." },
      ],
    },
    {
      id: "milloin-ei-hoideta",
      title: "Milloin ei hoideta ja miten sen kerrot asiakkaalle",
      blocks: [
        { p: "Jotkin asiat huomataan jo konsultaatiossa tai heti, kun iho on puhdistettu, ja ne muuttavat koko käynnin suunnitelman:" },
        {
          ul: [
            "Auringossa palanut iho.",
            "Naarmut tai rikkinäinen iho.",
            "Huuliherpes.",
            "Turvonnut, punainen ja kipeä alue.",
          ],
        },
        { p: "Jos huomaat jonkin näistä, et hoida sitä aluetta. Puhu lempeästi, kuvaile mitä näet ja ehdota, että asiakas kysyy lääkäriltä. Jos asiakkaan toivomaa hoitoa ei sen vuoksi voi tehdä tänään, sano se selvästi ja tarjoa hellävaraisempaa hoitoa tai uutta aikaa." },
        { note: "Kosmetologi ei diagnosoi eikä lupaa parantaa mitään iho-ongelmaa. Oppitunti [Milloin asiakasta ei hoideta](lesson:khi-nao-khong-lam) käy läpi varoitusmerkit ja sen, miten kieltäydyt hienotunteisesti.", kind: "warn", title: "Jos jokin huolestuttaa, ohjaa lääkäriin" },
      ],
    },
    {
      id: "hygienia-ja-kasineet",
      title: "Käsienpesu, käsineet ja hoitohuoneen siivous asiakkaan jälkeen",
      blocks: [
        { p: "Ennen kuin kosket asiakkaaseen, pese kädet saippualla ja kuivaa ne, kuten oppitunnilla [Käsihygienia ja käsineet](lesson:rua-tay-gang-tay). Kun testaat ihoa käsin, käytä puhtaita käsiä tai käsineitä. Käsineiden käyttö ihoa kosketettaessa määräytyy salongin ja paikallisten ohjeiden mukaan." },
        { p: "Kun asiakas on lähtenyt, vaihda pyyhkeet ja lakanat, pyyhi hoitopöytä ja suurennuslamppu ja pese sitten kädet uudelleen. Lamppu unohtuu helposti, koska se ei koske asiakkaaseen, mutta sinun kätesi koskettavat sitä koko käynnin ajan." },
      ],
    },
    {
      id: "kirjaus-ja-uusi-aika",
      title: "Ihoanalyysin kirjaus asiakaskorttiin ja seuraava aika",
      blocks: [
        { p: "Ihoanalyysistä on pitkään hyötyä vain, jos se kirjataan. VaraaAissa tallennat tulokset asiakaskortin sisäisiin muistiinpanoihin [asiakasrekisterissä](lesson:khach-hang). Vain salonki näkee muistiinpanot, ja ne kirjataan vain asiakkaan luvalla. Jos haluat kuvata ihon vertailua varten, kysy siihenkin lupa ensin." },
        { p: "Kun asiakas on vielä vastaanottotiskillä, varaa seuraava [aika](lesson:lich-hen), niin näette yhdessä, miten iho muuttuu. Jos haluat, että asiakkaat voivat varata ihoanalyysin ja konsultaation itse netissä, [lisää se palveluksi](lesson:dich-vu) niin pitkällä kestolla, että kysymyksille ja kirjauksille jää aikaa. Analyysiä seuraavan kasvohoidon vaiheet ovat artikkelissa [Kasvohoito vaihe vaiheelta](lesson:spa-facial)." },
      ],
    },
  ],
  howTo: {
    title: "Ihoanalyysin vaiheet konsultaatiosta siistiin hoitohuoneeseen",
    id: "ihoanalyysin-vaiheet",
    after: "kolme-saantoa",
    lead: "Kymmenen vaihetta oppitunnin järjestyksessä siitä hetkestä, kun asiakas astuu sisään, siihen kun huone on valmis seuraavalle.",
    supplies: [
      "Hoitokaapu, pehmeä kankainen otsapanta, pyyhkeet ja peitto asiakkaalle",
      "Esitietolomake ja kynä",
      "Meikinpoistoaine, puhdistusaine ja vanulaput",
      "Valaistu suurennuslamppu ja vanulaput silmille",
      "Imupaperia",
      "Suojakäsineet, jos salongin ohje niitä edellyttää",
    ],
    steps: [
      {
        name: "Ota asiakas vastaan ja pese kädet",
        text: "Tervehdi asiakasta, pyydä hänet istumaan ja tarjoa lasillinen vettä. Näytä sitten suojaisa paikka, jossa hän voi pukea hoitokaavun. Jos hänellä on piilolinssit, pyydä ottamaan ne ensin pois: suurennuslamppu on hyvin kirkas, ja silmien ympärystä voidaan joutua puhdistamaan. Laita pehmeä kankainen otsapanta pitämään hiukset poissa kasvoilta. Pese kädet saippualla ja kuivaa ne ennen kuin kosket asiakkaaseen.",
        image: { src: img("deo-bang-do-cho-khach-truoc-khi-soi-da"), alt: "Kosmetologi asettaa valkoisen kankaisen otsapannan valkoiseen kylpytakkiin pukeutuneelle asiakkaalle, joka istuu hoitopöydän reunalla" },
      },
      {
        name: "Käy esitietolomake läpi",
        text: "Istu asiakkaan silmien tasolle ja kysy rauhallisesti: allergiat ja aiemmat reaktiot kosmetiikkaan, nykyinen lääkitys, kotona käytetyt tuotteet (etenkin retinoidit tai hapot), isotretinoiini, viimeaikaiset hoidot ja auringossa oleskelu. Jos asiakas on raskaana, kysy lisää ja valitse tuotteet valmistajan ohjeen mukaan. Kysy myös, mitä hän toivoo ja missä iho tuntuu epämukavalta. Kerro, miksi kysyt: jotta valitset oikeat tuotteet ja vältät riskit. Kysy vakioasiakkailtakin uudelleen.",
        image: { src: img("khach-dua-san-pham-dang-dung-khi-tu-van-da"), alt: "Kermanväriseen kylpytakkiin pukeutunut asiakas istuu hoitopöydällä ja näyttää kämmenellään valkoista nimetöntä voideputkea kosmetologille", caption: "Kysy tarkasti, mitä asiakas käyttää kotona, etenkin retinoideja tai happoja." },
      },
      {
        name: "Pysähdy, jos jokin huolestuttaa",
        text: "Auringossa palanut iho, naarmu, huuliherpes, turvonnut, punainen ja kipeä alue: älä hoida sitä aluetta. Puhu lempeästi, kuvaile mitä näet ja ehdota, että asiakas kysyy lääkäriltä. Älä nimeä sairautta.",
      },
      {
        name: "Puhdista, jotta näet todellisen ihon",
        text: "Asiakas makaa hoitopöydällä pyyhkeen ja peiton alla, näkyvillä vain kasvot, kaula ja hartiat. Poista silmä- ja huulimeikki todella hellästi ja puhdista sitten kasvot. Meikki ja voide peittävät todellisen ihon, joten ennen puhdistusta tehty arvio menee pieleen alusta asti.",
        image: { src: img("lam-sach-da-mat-truoc-khi-soi-da"), alt: "Valkoista otsapantaa käyttävä asiakas makaa silmät kiinni, ja kosmetologin kädet levittävät valkoista puhdistusainetta hänen poskilleen" },
      },
      {
        name: "Peitä silmät ja arvioi suurennuslampun alla",
        text: "Aseta ensin vanulaput asiakkaan silmille ja tuo vasta sitten lamppu lähelle. Käy kasvot läpi alue kerrallaan aina samassa järjestyksessä: otsa, T-alue, posket, leukalinja ja leuka ja viimeisenä kaula. Kallista lamppua nähdäksesi pinnan rakenteen, katso suoraan nähdäksesi värit, äläkä unohda korvien ympärystä, hiusrajaa ja leuan alusta.",
        image: { src: img("che-mat-khach-va-soi-da-duoi-den-lup"), alt: "Asiakas makaa kaksi valkoista vanulappua silmillään, ja kosmetologi kumartuu tutkimaan hänen poskeaan valaistun pyöreän suurennuslampun läpi", caption: "Ensin vanulaput, sitten lamppu lähelle." },
      },
      {
        name: "Testaa imupaperilla ja sormenpäillä",
        text: "Testi on luotettava vasta, kun iho on levännyt hetken puhdistuksen jälkeen. Paina imupaperia kevyesti otsalle, nenälle ja poskille: siinä kohdassa, jossa paperi muuttuu läpikuultavaksi, on enemmän rasvaa. Kuljeta sitten sormenpäitä kevyesti poskilla ja tunnustele, onko iho sileä, karhea vai kireä. Heti kosketuksesta punertuva kohta kirjataan herkäksi.",
        image: { src: img("thu-da-bang-giay-tham-dau-tren-tran"), alt: "Kosmetologin kädet painavat valkoista imupaperia kevyesti silmät kiinni makaavan asiakkaan otsalle" },
      },
      {
        name: "Kirjaa havaintosi",
        text: "Kirjaa ihotyyppi, kunkin alueen kunto, asiakkaan kertomat asiat sekä se, mitä päätit jättää tekemättä ja miksi. Kirjoita havaintosi, älä koskaan sairauden nimeä. Kyse on luottamuksellisesta tiedosta, joka kirjataan vain asiakkaan luvalla.",
        image: { src: img("ghi-ket-qua-soi-da-vao-ho-so-khach"), alt: "Kosmetologi istuu pienen kivipöydän ääressä kaari-ikkunan vieressä ja kirjoittaa muistiinpanoja tablettiin, taustalla tyhjä hoitopöytä" },
      },
      {
        name: "Valitse hoito ja selitä se",
        text: "Valitse hoito kirjausten perusteella. Hieman kuivunut sekaiho, jossa on nenässä muutama mustapää: mieto puhdistus, kevyt kuorinta, iholle sopiva naamio ja epäpuhtauksien poisto vain, jos olet saanut koulutuksen ja salonki sallii sen. Kerro asiakkaalle, mitä teet, miltä se tuntuu ja millainen todellinen tulos on.",
      },
      {
        name: "Anna kotihoito-ohje ja varaa seuraava aika",
        text: "Lyhyt suunnitelma: mieto puhdistus aamuin illoin, ihotyypille sopiva kosteusvoide ja aurinkosuoja joka aamu. Kirjoita se asiakkaalle paperille mukaan. Kerro, että jos uusi tuote tuntuu iholla epämukavalta, käyttö lopetetaan ja salongille ilmoitetaan. Varaa sitten seuraava aika saman tien vastaanotossa.",
        image: { src: img("dat-lich-hen-lan-sau-tai-quay-spa"), alt: "Hoitolan kivisen vastaanottotiskin ääressä työntekijä näyttää tablettia kermanväriseen neuleeseen pukeutuneelle asiakkaalle, ja kumpikin hymyilee" },
      },
      {
        name: "Siivoa huone asiakkaan lähdettyä",
        text: "Vaihda pyyhkeet ja lakanat, pyyhi hoitopöytä ja suurennuslamppu ja pese kädet. Huone on valmis seuraavalle asiakkaalle vasta, kun kaikki tämä on tehty.",
      },
    ],
  },
  faq: [
    {
      q: "Mitä vaiheita ihoanalyysiin kuuluu?",
      a: "Esitietolomake, ihon puhdistus, silmien peittäminen ja alueittainen arvio suurennuslampun alla, imupaperi- ja sormenpäätesti sekä kirjaus. Vasta sen jälkeen valitaan hoito, selitetään se asiakkaalle ja annetaan kotihoito-ohje.",
    },
    {
      q: "Miksi iho puhdistetaan ennen ihoanalyysiä?",
      a: "Koska meikki ja voide peittävät todellisen ihon. Jos ihoa arvioidaan puhdistamatta, se tulkitaan väärin alusta asti, ja silloin myös tuotteet ja hoito valitaan väärin.",
    },
    {
      q: "Miten ihotyyppi testataan imupaperilla?",
      a: "Anna ihon levätä hetki puhdistuksen jälkeen ja paina sitten imupaperia kevyesti otsalle, nenälle ja poskille. Kohdassa, jossa paperi muuttuu läpikuultavaksi, on enemmän rasvaa. Jos T-alue on rasvainen mutta posket kuivat, kyse on sekaihosta.",
    },
    {
      q: "Missä järjestyksessä iho arvioidaan suurennuslampun alla?",
      a: "Otsa, T-alue, posket, leukalinja ja leuka ja lopuksi kaula. Pidä järjestys aina samana, jotta mikään alue ei jää huomaamatta ja tuloksia on helppo verrata edelliseen käyntiin. Peitä asiakkaan silmät vanulapuilla ennen kuin lamppu tuodaan lähelle, koska se on hyvin kirkas.",
    },
    {
      q: "Mitä tehdä, jos ihoanalyysissä näkyy huuliherpes tai turvonnut punainen alue?",
      a: "Älä hoida sitä aluetta. Puhu lempeästi, kuvaile mitä näet nimeämättä sairautta ja ehdota, että asiakas kysyy lääkäriltä. Voit tarjota hellävaraisempaa hoitoa muualle iholle tai uutta aikaa.",
    },
    {
      q: "Mitä asiakaskorttiin kirjataan ihoanalyysin jälkeen?",
      a: "Ihotyyppi, kunkin alueen kunto, asiakkaan kertomat asiat sekä se, mitä päätit jättää tekemättä ja miksi. Kirjaa havainnot, älä sairauden nimeä. Tiedot ovat luottamuksellisia, joten ne kirjataan vain asiakkaan luvalla, ja ihon kuvaamiseen kysytään lupa erikseen.",
    },
  ],
  related: ["spa-soi-da-hieu-dung", "spa-facial", "khi-nao-khong-lam", "rua-tay-gang-tay"],
};

export default article;
