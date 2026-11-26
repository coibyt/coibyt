import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/gio-mo-cua/${name}.webp`;
const shot = (name: string) => `/wiki/gio-mo-cua/fi/${name}.webp`;

const article: WikiArticle = {
  locale: "fi",
  slug: "salongin-aukioloajat-ja-pyhapaivat",
  lesson: "gio-mo-cua",
  category: "salon",
  title: "Salongin aukioloajat ajanvaraukseen: viikkoaikataulu, lounastauko ja pyhäpäivät",
  metaTitle: "Salongin aukioloajat: viikkoaikataulu, lounas ja pyhät",
  metaDescription:
    "Näin asetat salongin aukioloajat VaraaAissa: täytä viikko pikavalinnalla, muokkaa yksittäisiä päiviä, lisää lounastauko ja estä varaukset pyhäpäiville.",
  keyword: "salongin aukioloajat",
  keywords: [
    "aukioloajat nettiajanvaraukseen",
    "lounastauko ajanvarauskalenteriin",
    "pyhäpäivät ja sulkupäivät salongille",
    "estä varaukset tietylle päivälle",
    "kampaamon viikkoaikataulu",
    "varaus aukioloaikojen ulkopuolella",
  ],
  excerpt: "Asiakas voi varata vain aukioloaikana. Pikavalinta täyttää viikon, ”Lisää vuoro” hoitaa lounastauon ja pyhäpäivän estät yhdellä napautuksella.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-thu-gian-trong-spa-sang-trong"),
    alt: "Valkoiseen kylpytakkiin pukeutunut nainen rentoutuu kynttilöin valaistun kylpylän altaan reunalla, kun mustiin pukeutunut työntekijä kulkee ohi tarjotin kädessään",
  },
  takeaways: [
    "Asiakas **voi varata vain aukioloaikana**, joten aseta ajat ennen kuin otat vastaan nettivarauksia.",
    "Paina **pikavalintaa**, niin koko viikko täyttyy, ja muokkaa sitten yksittäisiä päiviä.",
    "Jos salonki on lounaalla kiinni, paina **”Lisää vuoro”**, niin päivään tulee toinen vuoro. Vuorojen väli on tauko.",
    "Kohtaan **”Pyhäpäivät ja sulkupäivät”** lisättyjä päiviä ei voi varata, vaikka ne olisivat tavallisia työpäiviä.",
    "Muista painaa muutosten jälkeen ”Tallenna aukioloajat”.",
  ],
  intro: [
    "Salongin aukioloajat on lyhyin työ koko salongin verkkoon viemisessä, noin minuutti, mutta se ratkaisee, mitä aikoja asiakas voi valita. Varaussivu antaa varata vain, kun salonki on auki. Yksikin väärin merkitty päivä, ja joku varaa ajan, kun salongissa ei ole ketään, tai salonki on auki eikä kukaan voi varata.",
    "Tämä artikkeli seuraa VaraaAi Academyn oppituntia ”Aukioloajat ja vapaapäivät”. Opit täyttämään viikkoaikataulun, jakamaan päivän lounastauon ympärille ja estämään salongin sulkupäivät etukäteen.",
  ],
  sections: [
    {
      id: "miksi-ajat-oikein",
      title: "Miksi aukioloaikojen pitää olla oikein ennen nettivarauksia",
      blocks: [
        { p: "Kun asiakas soittaa, puhelimeen vastaava tietää, onko salonki sinä päivänä auki. Varaussivulla välissä ei ole ketään. Se luottaa täysin syöttämiisi aikoihin päättäessään, mitä aikoja asiakkaalle näytetään." },
        { p: "”Aukioloajat”-sivun yläreunan teksti kertoo säännön: ”Asiakkaat voivat varata vain aukioloaikoina.” Samalla se muistuttaa, että verkkovaraus päivittyy heti, kun lisäät lounastauot ja pyhäpäivät. Muutat ajat yhdessä paikassa, ja asiakas näkee muutoksen kaikkialla, missä hän varaa." },
        { p: "Varaus päivälle, jona salonki on kiinni, harmittaa kaikkia. Asiakas löytää lukitun oven, ja sinä joudut soittamaan, pyytämään anteeksi ja siirtämään ajan. Minuutti aikojen huolelliseen syöttämiseen maksaa paljon vähemmän kuin yksikin tällainen päivä." },
      ],
    },
    {
      id: "ennen-aloitusta",
      title: "Ennen aloitusta: kirjoita ylös salongin todellinen työviikko",
      blocks: [
        { p: "Ennen kuin avaat hallintapaneelin, vastaa neljään kysymykseen salongistasi:" },
        {
          ul: [
            "Minä viikonpäivinä salonki on auki ja minä kiinni?",
            "Mihin aikaan se aukeaa ja sulkeutuu kunakin päivänä? Poikkeaako viikonloppu arkipäivistä?",
            "Onko salonki kiinni lounasaikaan, ja mistä mihin?",
            "Onko tulossa pyhäpäiviä tai muita päiviä, joina salonki on kiinni?",
          ],
        },
        { note: "Otsikon ”Viikkoaikataulu” alla on rivi, joka näyttää salongin aikavyöhykkeen. Vilkaise sitä. Aikavyöhyke määräytyy maasta, jonka valitsit [salongin rekisteröinnissä](lesson:dang-ky-salon), ja kaikki syöttämäsi aukioloajat luetaan sen mukaan. Suomessa toimivan salongin aikojen pitää vastata Suomen aikaa.", kind: "info", title: "Tarkista aikavyöhyke" },
      ],
    },
    {
      id: "pikavalinnat-ja-paivat",
      title: "Pikavalinnat ja yksittäisten päivien muokkaus",
      blocks: [
        { p: "Pikavalinnat ovat valmiita, yleisiä aikatauluja. Paina yhtä, niin viikon jokainen päivä täyttyy kerralla. Oppituntivideolla niitä on kolme:" },
        {
          table: {
            head: ["Pikavalinta", "Tarkoittaa"],
            rows: [
              ["Ma–Pe · 9:00–18:00", "Auki maanantaista perjantaihin klo 9–18"],
              ["Ma–La · 9:00–19:00", "Auki maanantaista lauantaihin klo 9–19"],
              ["Joka päivä · 10:00–20:00", "Auki viikon kaikkina päivinä klo 10–20"],
            ],
          },
        },
        { p: "Harva salonki vastaa pikavalintaa täsmälleen. Valitse lähin ja muuta poikkeavat päivät. Jokaisella päivällä on kytkin, jolla päivä avataan tai suljetaan, sekä kaksi aikakenttää avaamiselle ja sulkemiselle. Avoimen päivän nimen alla lukee ”Avoinna”." },
        { note: "Jos salonki sulkeutuu lauantaisin aikaisemmin, paina pikavalintaa ja muuta sen jälkeen vain lauantain sulkemisaika. Koko viikkoa ei tarvitse syöttää uudelleen.", kind: "tip", title: "Pieni vinkki" },
      ],
    },
    {
      id: "lounastauko",
      title: "Lounastauko aukioloaikoihin ”Lisää vuoro” -painikkeella",
      blocks: [
        { p: "Jokaisella päivällä voi olla kaksi vuoroa. Ensimmäisen ja toisen vuoron välinen aika on tauko, eikä asiakas voi varata sille. Näin estät lounastauon sulkematta koko päivää." },
        { p: "Oletetaan, että salonki tekee töitä aamusta kello 12:een, pitää tunnin tauon ja jatkaa iltaan. Aseta ensimmäinen vuoro päättymään klo 12.00, paina ”Lisää vuoro” ja aloita toinen vuoro klo 13.00. Silloin asiakas ei voi varata mitään kello 12:n ja 13:n välille." },
        { p: "Yhden hengen salonki tarvitsee tätä eniten. Kun kukaan ei tuuraa, estämätön lounastunti voi täyttää kalenterin aamusta iltaan ilman hetkeä syömiselle." },
      ],
    },
    {
      id: "pyhapaivat",
      title: "Pyhäpäivät ja sulkupäivät: estä varaukset tietyille päiville",
      blocks: [
        { p: "Viikkoaikataulu toistuu joka viikko. Poikkeukset merkitään viikkoaikataulun alle kohtaan ”Pyhäpäivät ja sulkupäivät”. Niinä päivinä asiakas ei voi varata, vaikka päivä olisi tavallisesti työpäivä." },
        { img: { src: shot("lisaa-sulkupaivat-painike"), alt: "Pyhäpäivät ja sulkupäivät -osio, jossa ovat Alkaen- ja Asti (valinnainen) -päivämäärät, syykenttä ja kultaisella korostettu Lisää sulkupäivät -painike", caption: "”Asti (valinnainen)” voi jäädä tyhjäksi. Yhden päivän sulkuun riittää ”Alkaen”." } },
        { p: "Päiviä voi lisätä kahdella tavalla. Ensimmäinen on valita ”Alkaen” ja ”Asti (valinnainen)”, jos olet kiinni useamman päivän, kirjoittaa syy ja painaa ”Lisää sulkupäivät”. Syykenttä ehdottaa esimerkkejä, kuten joulutauko tai remontti. Toinen on napauttaa alla olevaa ehdotusta tulevista pyhäpäivistä, esimerkiksi itsenäisyyspäivää tai joulua. Yksi napautus lisää päivän." },
        { note: "Lisää sulkupäivät mahdollisimman aikaisin, heti kun tiedät ne. Asiakkaat varaavat usein monta päivää etukäteen, ja kun päivä on estetty ennen kuin kukaan varaa sitä, säästyt siirtopuheluilta.", kind: "tip", title: "Tee se ajoissa" },
      ],
    },
    {
      id: "tyontekijoiden-tyoajat",
      title: "Salongin aukioloajat ja työntekijöiden omat työajat",
      blocks: [
        { p: "Aukioloajat ovat koko salongin kehys. Sen sisällä jokaisella työntekijällä voi olla oma aikataulunsa, kuten aamuvuorot, iltapäivävuorot tai eri vapaapäivät. Ne asetetaan ”Henkilökunta”-sivulla kunkin kortin ”Työajat”-painikkeella. Ohje [salongin henkilökunta ja käyttöoikeudet](lesson:nhan-vien) käy sen läpi." },
        { p: "Kun aukioloajat ovat oikein, varaussivulla on kolme asiaa, joita asiakas tarvitsee: [palvelut ja hinnat](lesson:dich-vu), tekijät ja vapaat ajat. Ennen asiakkaiden kutsumista jäljellä on [peruutusehtojen asettaminen](lesson:thanh-toan-chinh-sach) ja sen jälkeen [varauslinkin jakaminen](lesson:chia-se-link)." },
      ],
    },
  ],
  howTo: {
    title: "Salongin aukioloaikojen asettaminen VaraaAissa vaihe vaiheelta",
    id: "aukioloaikojen-vaiheet",
    after: "ennen-aloitusta",
    lead: "Kuusi ensimmäistä vaihetta koskevat viikkoaikataulua ja kolme viimeistä sulkupäiviä. Kaikki on hallintapaneelin kohdassa ”Aukioloajat”.",
    steps: [
      {
        name: "Avaa ”Aukioloajat”",
        text: "Napauta hallintapaneelin valikosta ”Aukioloajat”. Yläreunan kortti kertoo, onko salonki nyt auki, ja näyttää aukiolotunnit viikossa, työpäivät ja tulevat sulkupäivät.",
        image: { src: shot("aukioloajat-hallintapaneelissa"), alt: "Yrityksen hallintapaneeli, jossa Aukioloajat-välilehti on korostettu ja Salongin aukioloajat -kortissa näkyvät Suljettu nyt, 60 t ja 6/7" },
      },
      {
        name: "Paina pikavalintaa",
        text: "Paina kohdassa ”Viikkoaikataulu” yhtä ”Pikavalinnat”-vaihtoehtoa, esimerkiksi Ma–La · 9:00–19:00. Jokainen päivä täyttyy heti. Se on nopein tapa saada ajat koko viikolle.",
        image: { src: shot("pikavalinnat-koko-viikko"), alt: "Viikkoaikataulu, jossa kolme pikavalintaa ja aikavyöhykerivi, Ma–La 9:00–19:00 -pikavalinta korostettuna kultaisella" },
      },
      {
        name: "Kytke päivät päälle tai pois",
        text: "Jokaisen päivän vasemmalla puolella on kytkin. Sulje päivät, joina salonki on kiinni, ja avaa päivät, joina se on auki. Tarkista salongin vakituinen vapaapäivä ennen seuraavaa vaihetta.",
        image: { src: shot("paivan-kytkin-paalle-pois"), alt: "Maanantain kytkin korostettuna kultaisella, päivän nimen alla teksti Avoinna sekä avaus- ja sulkemisaika" },
      },
      {
        name: "Muuta avaus- ja sulkemisaikaa",
        text: "Napauta päivän aikakenttiä ja muuta avaus- ja sulkemisaika. Käy läpi päivät, joiden ajat poikkeavat pikavalinnasta, esimerkiksi viikonloppu.",
        image: { src: shot("avaus-ja-sulkemisaika"), alt: "Maanantain avausaika 09.00 ja sulkemisaika 18.00 korostettuna kultaisella salongin viikkoaikataulussa" },
      },
      {
        name: "Paina ”Lisää vuoro”, jos salonki on lounaalla kiinni",
        text: "Jos salonki sulkeutuu lounasajaksi, paina päivän kohdalla ”Lisää vuoro”, niin saat toisen vuoron. Päätä ensimmäinen vuoro tauon alkuun ja aloita toinen, kun avaat taas. Väliin jäävä aika on tauko.",
        image: { src: shot("lisaa-vuoro-lounastauko"), alt: "Maanantain oikealla puolella oleva Lisää vuoro -painike korostettuna kultaisella, sillä päivään lisätään toinen vuoro" },
      },
      {
        name: "Paina ”Tallenna aukioloajat”",
        text: "Kun muutat jotain, näytön alareunaan ilmestyy palkki ”Sinulla on tallentamattomia muutoksia”. Paina ”Tallenna aukioloajat”. Ennen tallennusta varaussivu käyttää yhä vanhoja aikoja.",
        image: { src: shot("tallenna-aukioloajat"), alt: "Näytön alareunan palkki Sinulla on tallentamattomia muutoksia, jossa on Kumoa-painike ja kultaisella korostettu Tallenna aukioloajat" },
      },
      {
        name: "Lisää sulkupäivät kentillä ”Alkaen” ja ”Asti”",
        text: "Vieritä kohtaan ”Pyhäpäivät ja sulkupäivät”. Valitse ”Alkaen” ja ”Asti (valinnainen)”, jos olet kiinni useamman päivän, kirjoita syy ja paina ”Lisää sulkupäivät”. Näille päiville asiakas ei voi varata.",
        image: { src: shot("pyhapaivat-ja-sulkupaivat-alkaen-asti"), alt: "Pyhäpäivät ja sulkupäivät -osio, jossa Alkaen- ja Asti (valinnainen) -kentät on korostettu kultaisella ja alla on syykenttä" },
      },
      {
        name: "Tai napauta ehdotettua pyhäpäivää",
        text: "”Lisää sulkupäivät” -painikkeen alla on lista tulevista pyhäpäivistä, kuten itsenäisyyspäivä, jouluaatto, joulupäivä, tapaninpäivä ja uudenvuodenaatto. Napauta ehdotusta, niin päivä lisätään heti ilman päivämäärän valintaa käsin.",
        image: { src: shot("tulevat-pyhapaivat"), alt: "Tulevat pyhäpäivät -ehdotukset Itsenäisyyspäivä 6.12., Jouluaatto 24.12., Joulupäivä 25.12., Tapaninpäivä 26.12. ja Uudenvuodenaatto 31.12. korostettuina" },
      },
    ],
  },
  faq: [
    {
      q: "Voiko asiakas varata ajan salongin aukioloaikojen ulkopuolelle?",
      a: "Ei voi. Asiakas voi varata vain asettamiesi aukioloaikojen sisällä olevia aikoja, eikä koskaan sulkupäivänä. Siksi aukioloaikojen pitää olla oikein ennen kuin otat vastaan nettivarauksia.",
    },
    {
      q: "Miten lisään lounastauon salongin aukioloaikoihin?",
      a: "Paina päivän kohdalla ”Lisää vuoro”, niin saat toisen vuoron. Jokaisella päivällä voi olla kaksi vuoroa, ja niiden välinen aika on tauko, jolle asiakas ei voi varata.",
    },
    {
      q: "Mikä on nopein tapa täyttää aukioloajat koko viikolle?",
      a: "Paina kohdassa ”Viikkoaikataulu” jotakin pikavalintaa, esimerkiksi Ma–La · 9:00–19:00. Pikavalinta täyttää jokaisen päivän, ja voit muokata yksittäisiä päiviä sen jälkeen.",
    },
    {
      q: "Mihin salongin pyhäpäivät ja sulkupäivät lisätään?",
      a: "Vieritä ”Aukioloajat”-sivulla kohtaan ”Pyhäpäivät ja sulkupäivät”. Valitse ”Alkaen” ja tarvittaessa ”Asti (valinnainen)”, kirjoita syy ja paina ”Lisää sulkupäivät”, tai napauta ehdotettua pyhäpäivää.",
    },
    {
      q: "Voiko asiakas varata pyhäpäivälle, joka osuu tavalliseen työpäivään?",
      a: "Ei voi. Kohtaan ”Pyhäpäivät ja sulkupäivät” lisättyjä päiviä ei voi varata, vaikka ne olisivat viikkoaikataulussa työpäiviä.",
    },
    {
      q: "Mihin asetan työntekijöiden erilaiset työajat?",
      a: "Aukioloajat ovat salongin yhteiset ajat. Kunkin henkilön omat työajat asetetaan ”Henkilökunta”-sivulla hänen korttinsa ”Työajat”-painikkeella.",
    },
  ],
  related: ["nhan-vien", "dich-vu", "thanh-toan-chinh-sach", "chia-se-link"],
};

export default article;
