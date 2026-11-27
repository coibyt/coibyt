import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/bang-gia/${name}.webp`;
const shot = (name: string) => `/wiki/bang-gia/fi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "hinnasto-kampaamolle-ja-kynsistudiolle",
  lesson: "bang-gia",
  category: "marketing",
  title: "Hinnasto kampaamolle ja kynsistudiolle: tee ilmainen monikielinen hinnasto QR-koodilla 9 vaiheessa",
  metaTitle: "Hinnasto kampaamolle: tee ilmainen hinnasto 9 vaiheessa",
  metaDescription:
    "Tee kampaamolle, kynsistudiolle tai hoitolalle hinnasto VaraaAin ilmaisella työkalulla: palvelut, käännökset, varauksen QR-koodi ja lataus PDF- tai PNG-muotoon.",
  keyword: "hinnasto kampaamolle",
  keywords: [
    "kynsistudion hinnasto",
    "hinnaston tekeminen ilmaiseksi",
    "kauneushoitolan hinnasto",
    "hinnastopohja salongille",
    "monikielinen hinnasto",
    "hinnasto QR-koodilla",
    "hinnaston tulostus A4, A5 tai A3",
  ],
  excerpt: "Kirjoita palvelut ja hinnat, valitse kielet, liitä varauslinkki, valitse tyyli ja koko ja lataa PDF tai PNG. Ilmainen, eikä suunnittelutaitoja tarvita.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("chuyen-vien-noi-mi-cho-khach-trong-spa"),
    alt: "Kermanvärisessä työasussa oleva hoitaja kiinnittää pinseteillä ripsienpidennyksiä hoitopöydällä makaavalle asiakkaalle rengasvalon ja kultaisen välinetarjottimen vieressä",
  },
  takeaways: [
    "VaraaAin hinnastotyökalu on **ilmainen**, eikä se vaadi suunnittelutaitoja. Kirjautua tarvitsee vain, jos haluat tallentaa hinnaston ja muokata sitä myöhemmin.",
    "Hinnastossa voi olla **1–3 kieltä rinnakkain**. Ensimmäinen on pääkieli, ja **”Käännä automaattisesti”** kääntää palvelujen nimet puolestasi.",
    "Jos hinta on vain lähtöhinta, rastita **”Alkaen”-hinta**, niin hinnastossa lukee ”alkaen …” ennen summaa.",
    "Liitä varaussivun linkki kohtaan ”Ajanvarauksen QR-koodi”, niin asiakas voi skannata hinnaston ja varata.",
    "**”Lataa PDF”** on tiskille tulostamista varten, **”Lataa PNG”** someen.",
  ],
  intro: [
    "Kun salongin omistaja etsii hinnastoa kampaamolle tai kynsistudiolle, tarve on yleensä hyvin konkreettinen: siisti paperi, jonka voi lukea tiskiltä, jossa on kaikki palvelut ja hinnat ja joka valmistuu yhden illan aikana. Valmiin pohjan lataaminen ja muokkaaminen kuvankäsittelyohjelmassa vie aikaa, ja jokainen hinnanmuutos tarkoittaa uutta avunpyyntöä. Nopeampaa on käyttää työkalua, jossa ulkoasu on valmiina ja sinä kirjoitat vain palvelut ja hinnat.",
    "Tämä artikkeli seuraa VaraaAi Academyn oppituntia ”Tee monikielinen hinnasto”. Teet valmiin hinnaston kynsistudiolle, kampaamolle tai hoitolalle usealla kielellä ja ajanvarauksen QR-koodilla ja lataat sen tulostettavaksi tai someen.",
  ],
  sections: [
    {
      id: "miksi-selkea-hinnasto",
      title: "Miksi salonki tarvitsee selkeän ja tyylikkään hinnaston",
      blocks: [
        { p: "Selkeä hinnasto auttaa asiakasta päättämään nopeammin. Kun palvelu, hinta ja kesto näkyvät paperilla, asiakas valitsee itse eikä joudu kysymään jokaisesta erikseen. Tiimin ei myöskään tarvitse vastata samaan kysymykseen yhä uudelleen, kun kädet ovat kiinni toisen asiakkaan työssä." },
        { p: "Salongissa, jonka asiakkaat puhuvat eri kieliä, hinnasto hoitaa myös osan tulkkauksesta. Oppitunnin esimerkkinä on hinnasto, jossa on yhtä aikaa suomi, englanti ja vietnam. Jokainen lukee omaa kieltään, ja asiakas ja tekijä voivat osoittaa samaa riviä." },
        { p: "Tämän artikkelin hinnasto on tulostettava paperi tai someen julkaistava kuva. Se on eri asia kuin salongin varaussivun palveluvalikko, joka ohjaa kalenteria ja kirjataan hallintapaneelissa. Siitä on oma ohjeensa [salongin palveluista ja hinnoista](lesson:dich-vu)." },
      ],
    },
    {
      id: "valmistelu",
      title: "Mitä tarvitset ennen kuin teet salongin hinnaston",
      blocks: [
        { p: "Työkalu etenee osio kerrallaan ylhäältä alas. Kun nämä ovat valmiina, täytät kaiken yhdellä kertaa:" },
        {
          ul: [
            "**Salongin nimi, osoite ja puhelinnumero** täsmälleen kuten kyltissä.",
            "**Logotiedosto**, jos salongilla on logo. Videon logokenttä ottaa PNG-, JPG- tai SVG-tiedoston, enintään 2 Mt.",
            "**Palveluluettelo** kategorioittain, jokaisella palvelulla hinta ja kesto minuutteina.",
            "**Kielet, joita asiakkaasi lukevat**, ja valuutta, jolla veloitat.",
            "**Varaussivun linkki**, jos haluat hinnastoon QR-koodin. Ohje [ajanvarauslinkistä](lesson:chia-se-link) kertoo, mistä sen löydät.",
          ],
        },
        { note: "Kohdassa ”Ajanvarauksen QR-koodi” on vaihtoehto ”Ei QR-koodia”, joten hinnaston voi tehdä, vaikka salonki ei vielä ottaisi varauksia verkossa. Linkin saat ohjeen [salongin rekisteröinnistä ja aktivoinnista](lesson:dang-ky-salon) avulla, ja sekin on maksutonta.", kind: "info", title: "Ei vielä varauslinkkiä" },
      ],
    },
    {
      id: "monikielinen-hinnasto",
      title: "Monikielinen hinnasto salongille, jonka asiakkaat puhuvat eri kieliä",
      blocks: [
        { p: "Kohdassa ”Kielet ja valuutta” valitset yhdestä kolmeen kieltä, jotka näkyvät samassa hinnastossa rinnakkain. Ensimmäinen valittu on pääkieli, joten järjestystä kannattaa miettiä: laita ensimmäiseksi kieli, jota suurin osa asiakkaistasi lukee." },
        { img: { src: shot("hinnaston-kielet-ja-valuutta"), alt: "Kielet ja valuutta -kohta, jossa Hinnaston kielet on korostettu kultaisella, Suomi on merkitty pääkieleksi ja valuutaksi on valittu EUR", caption: "Työkalun vihje: valitse 1–3 kieltä rinnakkain, ensimmäinen on pääkieli." } },
        { p: "Jos et halua kirjoittaa jokaista palvelunimeä joka kielellä, paina ”Käännä automaattisesti”, niin työkalu kääntää palvelujen nimet. Lue käännökset kerran ennen tulostusta, varsinkin salonkisi omat palvelunimet, koska juuri niitä sanoja asiakas lukee." },
        { p: "Valuutta valitaan heti alla kohdassa ”Valuutta”. Videon esimerkkihinnastossa käytetään euroja. Valitse valuutta, jolla veloitat, niin hinnaston luku vastaa kassalla maksettavaa summaa." },
      ],
    },
    {
      id: "hintojen-merkitseminen",
      title: "Näin merkitset hinnat: kiinteä hinta, alkaen-hinta ja kuvaus",
      blocks: [
        { p: "Jokaisella palvelurivillä on kolme pääkenttää, palvelun nimi, hinta ja ”Minuuttia”, sekä kaksi pientä valintaa alla. Kun käytät oikeaa valintaa, asiakas ei koe yllätyksiä kassalla." },
        {
          table: {
            head: ["Valinta", "Milloin käytät", "Mitä asiakas näkee"],
            rows: [
              ["Pelkkä hinta", "Palvelulla on yksi kiinteä hinta", "Kirjoittamasi summa ja valuutta"],
              ["Rastitettu ”Alkaen”-hinta", "Hinta on vain lähtöhinta, esimerkiksi hiusten pituuden tai kuvion vaativuuden mukaan", "”alkaen …” ennen summaa"],
              ["”Lisää kuvaus”", "Haluat kertoa lyhyesti, mitä palveluun kuuluu", "Lyhyt rivi palvelun nimen alla"],
            ],
          },
        },
        { p: "”Minuuttia”-kenttä kertoo asiakkaalle, paljonko aikaa hänen pitää varata. Oppituntivideon ”Kynnet”-kategoriassa esimerkkipalveluina ovat muun muassa 60 minuutin geelimanikyyri, 75 minuutin geelipedikyyri ja 30 minuutin kynsitaide. Ne ovat vain esimerkkejä, joten kirjoita salonkisi todelliset ajat." },
        { note: "Palvelu, jonka hintaa asiakkaat usein kysyvät, ansaitsee kuvauksen. Yksi rivi siitä, sisältyykö vanhan tuotteen poisto hintaan, säästää kiusalliselta keskustelulta tiskillä.", kind: "tip", title: "Lyhyt kuvaus oikeaan kohtaan" },
      ],
    },
    {
      id: "tyyli-ja-koko",
      title: "Valitse hinnaston tyyli ja paperikoko käyttöpaikan mukaan",
      blocks: [
        { p: "Kohdassa ”Ulkoasu” on kolme tyyliä: ”Minimalistinen”, ”Ylellinen” ja ”Värikäs”. Niiden alla on ”Pääväri”, jolla hinnasto sointuu salongin väreihin, ja sitten ”Koko”. Videossa näkyy neljä kokoa, ja tässä ehdotus kunkin käyttöpaikaksi:" },
        {
          table: {
            head: ["Koko", "Ehdotettu käyttö"],
            rows: [
              ["”A4 pysty”", "Tulosteena tiskille tai hinnastokansioon"],
              ["”A5 pysty”", "Työpisteelle lähelle asiakasta"],
              ["”A3-juliste”", "Seinälle tai lasioveen, luettavissa kaukaa"],
              ["”Instagram 1080×1080”", "Neliökuva someen"],
            ],
          },
        },
        { img: { src: shot("paavari-ja-koko"), alt: "Ulkoasu-kohdan Pääväri-valikoima ja sen alla Koko-vaihtoehdot A4 pysty, A5 pysty, A3-juliste ja Instagram 1080×1080" } },
        { p: "Yllä olevat ehdotukset ovat tavallista salonkikäytäntöä, eivät työkalun sääntöjä. Saman hinnaston voi ladata useassa koossa: A4-version tiskille ja neliöversion salongin somesivulle." },
        { p: "Kokojen alla on valintaruutu pienelle riville, joka kertoo hinnaston olevan tehty ilmaiseksi VaraaAi.comissa. Näytön vihjeen mukaan VaraaAihin rekisteröitynyt salonki voi piilottaa tämän rivin." },
      ],
    },
    {
      id: "latauksen-jalkeen",
      title: "Kun hinnasto on ladattu: tulosta, julkaise ja päivitä hintojen muuttuessa",
      blocks: [
        { p: "Ennen kuin tulostat monta kappaletta, lue jokainen hintarivi uudelleen ja skannaa QR-koodi puhelimellasi. Kirjoitusvirhe tiskillä jo olevassa paperissa muuttuu selitykseksi jokaiselle asiakkaalle." },
        { p: "Hinnat muuttuvat ajan myötä. Jotta kaikkea ei tarvitse kirjoittaa ensi kerralla alusta, kirjaudu sisään ja paina ”Tallenna tilille”. Hinnasto säilyy, ja voit avata ja muokata sitä aina tarvittaessa." },
        { img: { src: shot("tallenna-hinnasto-tilille"), alt: "Rivi Kirjaudu sisään tallentaaksesi hinnastot ja muokataksesi niitä myöhemmin, jonka Tallenna tilille -linkki on korostettu kultaisella Muokkaa- ja Esikatselu-painikkeiden yläpuolella", caption: "”Tallenna tilille” on ”Muokkaa”- ja ”Esikatselu”-painikkeiden yläpuolella." } },
        {
          table: {
            head: ["Tilanne", "Mitä teet"],
            rows: [
              ["Hinta vaihtelee asiakkaan mukaan", "Rastita ”Alkaen”-hinta, niin hinnastossa lukee ”alkaen …”"],
              ["Et halua kirjoittaa palvelunimiä monella kielellä", "Paina ”Käännä automaattisesti” kohdassa ”Kielet ja valuutta” ja tarkista käännökset"],
              ["Salongilla ei vielä ole varaussivua", "Valitse ”Ei QR-koodia” tai luo varaussivu ja palaa liittämään linkki"],
              ["Haluat muokata hinnastoa myöhemmin", "Kirjaudu sisään ja paina ”Tallenna tilille”"],
            ],
          },
        },
        { p: "Jos tarvitset lisäksi kyltin, joka vain kutsuu skannaamaan ja varaamaan, katso ohje [QR-koodista ajanvaraukseen](lesson:poster-qr). Molemmissa työkaluissa on minimalistinen ja ylellinen tyyli sekä pääväri. Kun valitset saman tyylin ja värin, hinnasto ja juliste näyttävät vierekkäin samaan sarjaan kuuluvilta." },
      ],
    },
  ],
  howTo: {
    title: "Näin teet salongille ilmaisen hinnaston VaraaAissa",
    id: "hinnaston-vaiheet",
    after: "valmistelu",
    lead: "Yhdeksän vaihetta seuraavat työkalun osioiden järjestystä ylhäältä alas, kuten oppituntivideossa.",
    steps: [
      {
        name: "Avaa hinnastotyökalu",
        text: "Avaa varaaai.com, vieritä sivun alaosaan ja napauta ”Yritykset”-ryhmästä ”Ilmainen hinnastotyökalu” tai siirry suoraan [hinnastotyökaluun](/tools/price-list). Voit aloittaa kirjoittamisen heti.",
        image: { src: shot("ilmainen-hinnastotyokalu-alatunnisteessa"), alt: "VaraaAin etusivun alaosa puhelimessa, jossa Yritykset-ryhmän Ilmainen hinnastotyökalu -linkki on korostettu kultaisella" },
      },
      {
        name: "Täytä ”Salongin tiedot”",
        text: "Kirjoita kohtaan ”Salongin tiedot” salongin nimi, osoite ja puhelinnumero. Jos sinulla on logo, lataa se heti alla olevaan ”Logo”-kenttään. Salongin nimi näkyy hinnaston yläreunassa, joten kirjoita se kuten kyltissä.",
        image: { src: shot("salongin-tiedot-osoite-ja-puhelin"), alt: "Salongin tiedot -kohta, jossa Salongin nimi on täytetty ja Osoite- ja Puhelin-kentät on korostettu kultaisella, alla Logo-kenttä" },
      },
      {
        name: "Valitse kielet ja valuutta",
        text: "Paina kohdassa ”Kielet ja valuutta” ”Lisää kieli” ja valitse hinnaston kielet, esimerkiksi suomi, englanti ja vietnam. Valitse sitten valuutta. Jos et halua kirjoittaa jokaista kieltä itse, paina ”Käännä automaattisesti”, niin palvelujen nimet käännetään.",
      },
      {
        name: "Valitse kategoria ja paina ”Lisää palvelu”",
        text: "Napauta kohdassa ”Palvelut ja hinnat” valmista kategoriaa, kuten ”Kynnet”, ”Kampaamo” tai ”Kylpylä ja hieronta”. Paina sitten ”Lisää palvelu” jokaiselle riville. Kategoriat auttavat asiakasta löytämään oman osionsa lukematta koko paperia.",
        image: { src: shot("lisaa-kategoria-kynnet-kampaamo-kylpyla"), alt: "Lisää kategoria -laatikko korostettuna kultaisella: Kynnet, Kampaamo, Parturi, Kulmat ja ripset, Kylpylä ja hieronta, Ihonhoito ja kasvohoidot, Meikki, Hyvinvointi ja Muu kategoria" },
      },
      {
        name: "Kirjoita palvelun nimi, hinta ja ”Minuuttia”",
        text: "Kirjoita jokaiselle palvelulle nimi, hinta ja minuuttimäärä. Käytä nimiä, joita asiakkaat itse käyttävät. Minuuttien kannattaa olla todellinen hoitoaika, jotta asiakas osaa suunnitella käyntinsä.",
        image: { src: shot("palvelun-nimi-hinta-ja-minuutit"), alt: "Kynnet-kategoria, jossa Geelimanikyyri-rivi on korostettu kultaisella, hintakentässä 45 ja minuuttikentässä 60, alla Geelipedikyyri" },
      },
      {
        name: "Rastita ”Alkaen”-hinta ja lisää kuvaus tarvittaessa",
        text: "Jos hinta on vain lähtöhinta, rastita palvelun alla oleva ”Alkaen”-hinta. Jos haluat kertoa enemmän, paina ”Lisää kuvaus” ja kirjoita lyhyt rivi. Molemmat valinnat tehdään jokaiselle palvelulle erikseen.",
        image: { src: shot("alkaen-hinta-ja-lisaa-kuvaus"), alt: "Geelimanikyyrin alla oleva Alkaen-hinta-valintaruutu korostettuna kultaisella, sen alla Lisää kuvaus ja alempana Geelipedikyyri" },
      },
      {
        name: "Liitä linkki kohtaan ”Ajanvarauksen QR-koodi”",
        text: "Liitä kohdassa ”Ajanvarauksen QR-koodi” salongin varaussivun linkki linkkikenttään. Hinnaston QR-koodi vie asiakkaan suoraan sille sivulle, joten skannaus riittää varaamiseen. Jos et vielä ota varauksia verkossa, valitse ”Ei QR-koodia”.",
        image: { src: shot("ajanvarauksen-qr-koodi-hinnastoon"), alt: "Ajanvarauksen QR-koodi -kohta, jossa vaihtoehdot Oma linkki ja Ei QR-koodia sekä salongin varaussivun osoitteen sisältävä kenttä korostettuna kultaisella" },
      },
      {
        name: "Valitse tyyli, ”Pääväri” ja koko",
        text: "Valitse kohdassa ”Ulkoasu” yksi kolmesta tyylistä: ”Minimalistinen”, ”Ylellinen” tai ”Värikäs”. Valitse sitten ”Pääväri” ja koko. Sovita tyyli ja väri salongin sisustukseen ja logoon, niin hinnasto näyttää osalta tiskiä.",
        image: { src: shot("hinnaston-tyyli-minimalistinen-ylellinen-varikas"), alt: "Ulkoasu-kohta, jossa kolme tyyliä Minimalistinen, Ylellinen ja Värikäs on korostettu kultaisella, Ylellinen valittuna ja alla Pääväri" },
      },
      {
        name: "Paina ”Esikatselu” ja lataa",
        text: "Paina ”Esikatselu”, niin näet valmiin hinnaston: salongin nimen, palvelukategoriat, hinnat, minuutit ja alareunan QR-koodin. Jos olet tyytyväinen, paina ”Lataa PDF” tulostaaksesi sen tiskille tai ”Lataa PNG” julkaistaksesi sen somessa.",
        image: { src: shot("hinnaston-esikatselu-qr-koodilla"), alt: "Esikatselu mustasta A4-hinnastosta, jossa Lumi Beauty Paris, kynsipalvelut hintoineen ja alareunassa QR-koodi korostettuna kultaisella" },
      },
    ],
  },
  faq: [
    {
      q: "Onko hinnaston tekeminen VaraaAissa maksullista?",
      a: "Ei ole. Hinnastotyökalu on täysin ilmainen, eikä suunnittelutaitoja tarvita. Jos kirjaudut sisään, voit myös tallentaa hinnaston tilillesi ja muokata sitä myöhemmin.",
    },
    {
      q: "Montako kieltä hinnastossa voi olla samaan aikaan?",
      a: "Voit valita yhdestä kolmeen kieltä, jotka näkyvät samassa hinnastossa rinnakkain, esimerkiksi suomi, englanti ja vietnam. Ensimmäisenä valittu kieli on pääkieli.",
    },
    {
      q: "Mitä ”Käännä automaattisesti” tekee hinnastotyökalussa?",
      a: "Painike on kohdassa ”Kielet ja valuutta”, ja se kääntää palvelujen nimet valitsemillesi kielille. Sinun ei tarvitse kirjoittaa jokaista palvelunimeä jokaisella kielellä itse.",
    },
    {
      q: "Milloin ”Alkaen”-hinta kannattaa rastittaa?",
      a: "Kun hinta on vain lähtöhinta ja voi olla korkeampi asiakkaasta riippuen. Hinnastossa lukee silloin ”alkaen …” ennen summaa, jolloin asiakas ymmärtää, ettei se ole lopullinen hinta.",
    },
    {
      q: "Miksi hinnastoon kannattaa lisätä ajanvarauksen QR-koodi?",
      a: "QR-koodi vie asiakkaan suoraan salongin varaussivulle. Hinnastoa katsova asiakas voi varata skannaamalla koodin puhelimellaan, ilman soittamista tai salongin etsimistä netistä.",
    },
    {
      q: "Kannattaako hinnasto ladata PDF- vai PNG-muodossa?",
      a: "Paina ”Lataa PDF”, kun haluat tulostaa hinnaston tiskille. Paina ”Lataa PNG”, kun haluat julkaista sen somessa.",
    },
  ],
  related: ["poster-qr", "chia-se-link", "website-salon", "dich-vu"],
};

export default article;
