/** The Babelisa course (owner, 2026-11-22): a player shares each game of
 * Babelisa (babelisa.com), the free learning-game site: what the game is, how
 * it is played, why it is fun, a tip and an invitation to try it. Taught in the
 * Academy's "customer" tab. A standalone course: its lessons are numbered 1…n
 * on their own and are not part of the VaraaAi customer certificate.
 *
 * Videos are made by the pipeline outside this repo
 * (C:\Hiep\hoat-hinh-ai\projects\varaaai-hoc, bb_lessons.py, the narration is
 * the source of truth for the facts below). Gameplay is filmed on a local copy
 * of Babelisa with no real player data. */
import { l3, type Course, type Lesson, type LessonVideo } from "@/lib/academy/types";
import { videoUrl } from "@/lib/media";

const video = (slug: string, seconds: number, published: string): LessonVideo => ({
  src: videoUrl(`/academy/${slug}.mp4`),
  poster: `/academy/${slug}.jpg`,
  captions: `/academy/${slug}.vtt`,
  seconds,
  published,
});

/** Filled in as the videos are published (slug → [seconds, date]). */
const VIDEOS: Record<string, [number, string]> = {
  "bb-phieu-luu-tren-dao": [138, "2026-11-24"],
  "bb-luyen-noi-voi-lisa": [82, "2026-11-24"],
  "bb-30-ngay-dam-noi": [79, "2026-11-24"],
  "bb-vuong-quoc-ngon-tu": [88, "2026-11-24"],
  "bb-soi-taiga": [69, "2026-11-24"],
  "bb-toan-lop-3": [65, "2026-11-24"],
  "bb-toan-lop-4": [58, "2026-11-24"],
  "bb-studio-sang-tao-nhi": [76, "2026-11-24"],
  "bb-mua-ba-le": [64, "2026-11-24"],
  "bb-game-hoc-ve": [46, "2026-11-24"],
};
const v = (slug: string) => (VIDEOS[slug] ? video(slug, ...VIDEOS[slug]) : null);

const BABELISA = "https://babelisa.com";
const PLAY = l3("Chơi ngay", "Play now", "Pelaa nyt");

export const BABELISA_COURSES: Course[] = [
  {
    id: "c-babelisa",
    audience: "customer",
    icon: "gamepad",
    standalone: true,
    title: l3("Babelisa: học mà chơi", "Babelisa: learn while you play", "Babelisa: opi pelaamalla"),
    body: l3(
      "Mười video về các trò trên babelisa.com: ngoại ngữ, luyện nói, xây thành, võ tự vệ, toán, múa ba lê và vẽ.",
      "Ten videos on the games at babelisa.com: languages, speaking, city building, self-defence, maths, ballet and drawing.",
      "Kymmenen videota babelisa.comin peleistä: kielet, puhuminen, kaupungin rakentaminen, itsepuolustus, matematiikka, baletti ja piirtäminen."
    ),
  },
];

export const BABELISA_LESSONS: Lesson[] = [
  {
    slug: "bb-phieu-luu-tren-dao",
    course: "c-babelisa",
    title: l3(
      "Phiêu lưu trên đảo, học ngoại ngữ không cần dịch",
      "An island adventure: learn a language without translation",
      "Saariseikkailu: opi kieltä ilman käännöksiä"
    ),
    summary: l3(
      "Trò chính của Babelisa: chọn một trong 31 thứ tiếng, rồi theo cô gái Lisa học từng từ bằng hành động qua 8 chương, 55 ngày.",
      "Babelisa's main game: pick one of 31 languages and learn word by word from Lisa, through actions, over 8 chapters and 55 days.",
      "Babelisan pääpeli: valitse yksi 31 kielestä ja opi Lisalta sana sanalta tekemällä, 8 luvun ja 55 päivän ajan."
    ),
    video: v("bb-phieu-luu-tren-dao"),
    href: BABELISA,
    hrefLabel: PLAY,
    steps: [
      l3(
        "Vào babelisa.com là gặp sảnh của hòn đảo, nơi có cả loạt trò. Chọn cuộc phiêu lưu học ngoại ngữ.",
        "Go to babelisa.com and you land in the island's lobby, with a whole row of games. Pick the language adventure.",
        "Osoitteessa babelisa.com avautuu saaren aula, jossa on monta peliä. Valitse kieliseikkailu."
      ),
      l3(
        "Chọn tiếng muốn học: có 31 thứ tiếng, như tiếng Anh, Phần Lan, Đức, Pháp, Nhật, Hàn, Trung.",
        "Choose the language to learn: there are 31, such as English, Finnish, German, French, Japanese, Korean and Chinese.",
        "Valitse opittava kieli: vaihtoehtoja on 31, esimerkiksi englanti, suomi, saksa, ranska, japani, korea ja kiina."
      ),
      l3(
        "Bạn là chàng trai đắm tàu dạt vào đảo lạ. Lisa chỉ vào nước, vào cây, vào lửa rồi nói tên của nó, không có chữ dịch nào.",
        "You are a shipwrecked young man washed up on a strange island. Lisa points at water, a tree, fire and says the word, with no translation at all.",
        "Olet haaksirikkoutunut nuori mies vieraalla saarella. Lisa osoittaa vettä, puuta ja tulta ja sanoo sanan, ilman yhtään käännöstä."
      ),
      l3(
        "Nghe rồi chạm vào đúng thứ, kéo đồ vật, xếp việc theo thứ tự và nói to theo Lisa. Sai thì Lisa chỉ lại cho bạn.",
        "Listen and tap the right thing, drag objects, put tasks in order and say the words out loud after Lisa. Get it wrong and Lisa shows you again.",
        "Kuuntele ja napauta oikeaa asiaa, vedä esineitä, järjestä tehtävät ja sano sanat ääneen Lisan perässä. Jos menee väärin, Lisa näyttää uudelleen."
      ),
      l3(
        "Mỗi ngày học là một chặng trên bản đồ: 8 chương, 55 ngày, từ bờ biển, tiệm làm đẹp, nhà hàng đến khách sạn và chợ đầu mối.",
        "Each day is a stop on the map: 8 chapters and 55 days, from the beach to a beauty salon, a restaurant, a hotel and a wholesale market.",
        "Jokainen päivä on etappi kartalla: 8 lukua ja 55 päivää rannalta kauneushoitolaan, ravintolaan, hotelliin ja tukkutorille."
      ),
      l3(
        "Cuối mỗi chặng làm bài ôn có chấm điểm để được sao; xong một chương thì nhận chứng nhận.",
        "Each stop ends with a scored review that earns stars, and a finished chapter earns a certificate.",
        "Jokainen etappi päättyy pisteytettyyn kertaukseen, josta saa tähtiä, ja valmiista luvusta saa todistuksen."
      ),
    ],
    tips: [
      l3(
        "Mỗi ngày chơi mười phút thôi, nhưng đừng bỏ ngày nào, và luôn nói to theo Lisa. Nhịp và giai điệu quan trọng hơn từng âm.",
        "Play just ten minutes a day, but don't skip a day, and always say the words out loud after Lisa. Rhythm and melody matter more than each sound.",
        "Pelaa vain kymmenen minuuttia päivässä, mutta älä jätä päiviä väliin, ja sano sanat aina ääneen Lisan perässä. Rytmi ja sävelkulku ovat tärkeämpiä kuin yksittäiset äänteet."
      ),
      l3(
        "Không cần tự nhớ lịch ôn: từ nào đến hạn ôn thì game tự nhắc bạn.",
        "No need to plan your reviews: the game reminds you when a word is due.",
        "Kertauksia ei tarvitse muistaa itse: peli muistuttaa, kun sana on kerrattava."
      ),
    ],
    quiz: [
      {
        q: l3("Cuộc phiêu lưu trên đảo có bao nhiêu thứ tiếng để chọn?", "How many languages can you choose in the island adventure?", "Montako kieltä saariseikkailussa voi valita?"),
        options: [l3("8", "8", "8"), l3("31", "31", "31"), l3("55", "55", "55")],
        answer: 1,
        why: l3("Có 31 thứ tiếng; 8 là số chương và 55 là số ngày học.", "There are 31 languages; 8 is the number of chapters and 55 the number of days.", "Kieliä on 31; lukuja on 8 ja päiviä 55."),
      },
      {
        q: l3("Lisa dạy bạn từ mới bằng cách nào?", "How does Lisa teach you new words?", "Miten Lisa opettaa uusia sanoja?"),
        options: [
          l3("Dịch từng từ sang tiếng Việt", "She translates every word", "Hän kääntää jokaisen sanan"),
          l3("Đưa bạn một danh sách từ để học thuộc", "She hands you a word list to memorise", "Hän antaa sanalistan ulkoa opeteltavaksi"),
          l3("Chỉ vào đồ vật, làm hành động rồi nói tên của nó", "She points at things, acts them out and says the word", "Hän osoittaa asioita, näyttää ne ja sanoo sanan"),
        ],
        answer: 2,
        why: l3("Không có chữ dịch nào, giống như hồi bé mình học nói.", "There is no translation at all, just like when you learned to talk as a child.", "Käännöksiä ei ole, aivan kuten lapsena puhumaan oppiessa."),
      },
      {
        q: l3("Làm gì để nhận chứng nhận trong game?", "How do you earn a certificate in the game?", "Miten pelissä saa todistuksen?"),
        options: [
          l3("Học xong một chương", "Finish a chapter", "Pelaa luku loppuun"),
          l3("Chơi một ngày bất kỳ", "Play any single day", "Pelaa mikä tahansa päivä"),
          l3("Mời một người bạn", "Invite a friend", "Kutsu ystävä"),
        ],
        answer: 0,
        why: l3("Mỗi chặng có bài ôn chấm điểm và sao; xong chương thì có chứng nhận.", "Each stop has a scored review with stars, and a finished chapter gives a certificate.", "Jokaisessa etapissa on pisteytetty kertaus ja tähdet, ja valmis luku tuo todistuksen."),
      },
    ],
  },
  {
    slug: "bb-luyen-noi-voi-lisa",
    course: "c-babelisa",
    title: l3("Ôn từ mỗi ngày và luyện nói với Lisa", "Daily review and speaking practice with Lisa", "Päivän kertaus ja puheharjoitus Lisan kanssa"),
    summary: l3(
      "Hai trò giúp bạn dám mở miệng: Ôn hôm nay gom những từ đến hạn trong vài phút, và buổi nói chuyện năm phút với Lisa, chấm từng câu.",
      "Two games that get you speaking: Today's review gathers the words that are due in a few minutes, and a five-minute talk with Lisa scores every sentence.",
      "Kaksi peliä, joilla pääset puhumaan: päivän kertaus kokoaa kerrattavat sanat muutamaan minuuttiin, ja viiden minuutin keskustelu Lisan kanssa pisteyttää jokaisen lauseen."
    ),
    video: v("bb-luyen-noi-voi-lisa"),
    href: BABELISA,
    hrefLabel: PLAY,
    steps: [
      l3(
        "Ở sảnh, bấm thẻ “Ôn hôm nay”: game gom những từ và câu đến hạn ôn, hỏi bạn chừng ba đến năm phút.",
        "In the lobby, tap the “Today's review” card: the game gathers the words and sentences that are due and quizzes you for three to five minutes.",
        "Napauta aulassa päivän kertauksen korttia: peli kokoaa kerrattavat sanat ja lauseet ja kyselee niitä kolmesta viiteen minuuttia."
      ),
      l3(
        "Trả lời nhiều kiểu câu: nghe rồi chọn hình, nhìn hình chọn chữ, xếp từ thành câu, điền vào chỗ trống.",
        "Answer different kinds of questions: listen and pick the picture, see a picture and pick the word, build a sentence, fill in the gap.",
        "Vastaa erilaisiin tehtäviin: kuuntele ja valitse kuva, katso kuvaa ja valitse sana, kokoa lause, täytä aukko."
      ),
      l3(
        "Xong bài, bạn được điểm kinh nghiệm và giữ được chuỗi ngày học.",
        "When you finish you earn experience points and keep your day streak going.",
        "Lopuksi saat kokemuspisteitä ja päivien putki jatkuu."
      ),
      l3(
        "Mở “Luyện nói với Lisa”, chọn tiếng và một ngày đã học. Lisa nói trước, bạn bấm micro rồi nói theo.",
        "Open “Talk with Lisa”, choose the language and a day you have already learned. Lisa speaks first, then you tap the microphone and answer.",
        "Avaa puheharjoitus Lisan kanssa ja valitse kieli ja jo opittu päivä. Lisa puhuu ensin, sitten painat mikrofonia ja vastaat."
      ),
      l3(
        "Buổi nói đi từ từ đơn, câu ngắn, đến hỏi đáp theo tình huống rồi nói tự do. Mỗi câu được chấm phần trăm và sao.",
        "The talk goes from single words and short sentences to questions in real situations and then free speaking. Every sentence gets a percentage and stars.",
        "Keskustelu etenee yksittäisistä sanoista ja lyhyistä lauseista tilannekysymyksiin ja vapaaseen puheeseen. Jokainen lause saa prosentit ja tähdet."
      ),
      l3(
        "Câu chưa chuẩn thì Lisa sửa nhẹ nhàng. Dùng nút nghe chậm, nút gợi ý, hoặc bấm bàn phím để gõ khi không tiện nói to.",
        "If a sentence is off, Lisa corrects you gently. Use the slow-listen and hint buttons, or tap the keyboard to type when you can't speak out loud.",
        "Jos lause ei mene oikein, Lisa korjaa lempeästi. Käytä hidasta kuuntelua ja vihjettä, tai kirjoita näppäimistöllä, kun et voi puhua ääneen."
      ),
    ],
    tips: [
      l3(
        "Luyện nói ngay sau khi học xong một ngày, lúc từ còn nóng hổi. Đeo tai nghe, nói to và rõ; sai cũng không sao.",
        "Practise speaking right after you finish a day, while the words are still fresh. Wear headphones and speak loud and clear; mistakes are fine.",
        "Harjoittele puhumista heti päivän jälkeen, kun sanat ovat tuoreessa muistissa. Käytä kuulokkeita ja puhu kovaa ja selkeästi; virheet eivät haittaa."
      ),
    ],
    quiz: [
      {
        q: l3("Bài “Ôn hôm nay” mất khoảng bao lâu?", "About how long does “Today's review” take?", "Kauanko päivän kertaus suunnilleen kestää?"),
        options: [l3("Nửa tiếng", "Half an hour", "Puoli tuntia"), l3("Ba đến năm phút", "Three to five minutes", "Kolmesta viiteen minuuttia"), l3("Một tiếng", "An hour", "Tunnin")],
        answer: 1,
        why: l3("Game chỉ gom những từ đến hạn, nên bài ôn rất ngắn.", "The game only gathers the words that are due, so the review is short.", "Peli kokoaa vain kerrattavat sanat, joten kertaus on lyhyt."),
      },
      {
        q: l3("Bạn đang ở nơi đông người, không tiện nói to. Làm sao vẫn luyện với Lisa?", "You are somewhere you can't speak out loud. How can you still practise with Lisa?", "Et voi puhua ääneen. Miten voit silti harjoitella Lisan kanssa?"),
        options: [
          l3("Bấm bàn phím để gõ câu trả lời", "Tap the keyboard and type your answer", "Kirjoita vastaus näppäimistöllä"),
          l3("Không luyện được", "You can't", "Et mitenkään"),
          l3("Phải tạo bài mới", "You must start a new lesson", "Pitää aloittaa uusi oppitunti"),
        ],
        answer: 0,
        why: l3("Ngoài micro, Lisa còn nhận câu trả lời gõ bằng bàn phím.", "Besides the microphone, Lisa also takes answers typed on the keyboard.", "Mikrofonin lisäksi Lisa ottaa vastaan näppäimistöllä kirjoitetut vastaukset."),
      },
      {
        q: l3("Lúc nào luyện nói với Lisa là tốt nhất?", "When is the best time to talk with Lisa?", "Milloin Lisan kanssa kannattaa harjoitella?"),
        options: [
          l3("Trước khi học ngày đó", "Before learning that day", "Ennen päivän oppimista"),
          l3("Mỗi tháng một lần", "Once a month", "Kerran kuussa"),
          l3("Ngay sau khi học xong một ngày", "Right after finishing a day", "Heti päivän jälkeen"),
        ],
        answer: 2,
        why: l3("Lúc đó từ còn mới trong đầu, nói ra dễ nhớ lâu hơn.", "The words are still fresh, so saying them helps them stick.", "Sanat ovat silloin tuoreita, joten ne jäävät paremmin mieleen."),
      },
    ],
  },
  {
    slug: "bb-30-ngay-dam-noi",
    course: "c-babelisa",
    title: l3("30 ngày dám nói tiếng Anh, tiếng Phần Lan", "30 days to speak English or Finnish", "30 päivää rohkeasti puhumaan englantia tai suomea"),
    summary: l3(
      "Khóa nói 30 ngày, mỗi ngày một chủ đề đời thường, có bốn phần luyện, máy chấm từng câu và câu tự quay lại để ôn.",
      "A 30-day speaking course with an everyday topic each day, four parts of practice, every sentence scored and phrases that come back for review.",
      "30 päivän puhekurssi: joka päivä arkinen aihe, neljä harjoitusosaa, jokainen lause pisteytetään ja fraasit palaavat kerrattaviksi."
    ),
    video: v("bb-30-ngay-dam-noi"),
    href: BABELISA,
    hrefLabel: PLAY,
    steps: [
      l3(
        "Trên babelisa.com, chọn thẻ “Ba mươi ngày dám nói”. Khóa có tiếng Anh và tiếng Phần Lan.",
        "On babelisa.com, pick the “30 days to speak” card. The course comes in English and Finnish.",
        "Valitse babelisa.comissa 30 päivän puhekurssin kortti. Kurssi on englanniksi ja suomeksi."
      ),
      l3(
        "Trang chính có cấp độ, điểm kinh nghiệm, mục tiêu trong ngày và chuỗi ngày trong tuần.",
        "The home page shows your level, experience points, the day's goal and your streak for the week.",
        "Etusivulla näkyvät tasosi, kokemuspisteet, päivän tavoite ja viikon putki."
      ),
      l3(
        "Mỗi ngày một chủ đề: giới thiệu bản thân, gia đình, du lịch, gọi cà phê, nói chuyện với khách ở chỗ làm, đến thi thử IELTS và thử thách cuối ở ngày 30.",
        "Each day has a topic: introducing yourself, family, travel, ordering coffee, talking with customers at work, up to a mock IELTS test and the final challenge on day 30.",
        "Joka päivällä on aihe: itsensä esittely, perhe, matkailu, kahvin tilaaminen, asiakkaiden kanssa puhuminen töissä, aina IELTS-harjoituskokeeseen ja päivän 30 loppuhaasteeseen."
      ),
      l3(
        "Mỗi ngày có bốn phần: nghe và nhại, cụm câu, tự nói, và luyện với Lisa.",
        "Every day has four parts: listen and repeat, phrases, speaking on your own, and practice with Lisa.",
        "Joka päivässä on neljä osaa: kuuntele ja toista, fraasit, oma puhe ja harjoittelu Lisan kanssa."
      ),
      l3(
        "Ở phần cụm câu: bấm nghe giọng bản xứ, rồi bấm micro và nói theo. Từ nào chưa rõ hiện màu đỏ để bạn nói lại.",
        "In phrases: tap to hear a native speaker, then tap the microphone and say it. Any word that wasn't clear turns red so you can try again.",
        "Fraaseissa: kuuntele syntyperäistä puhujaa, paina mikrofonia ja toista. Epäselvä sana muuttuu punaiseksi, jotta voit sanoa sen uudelleen."
      ),
      l3(
        "Câu mẫu dùng tên, thành phố và công việc của chính bạn. Câu đã nói tự quay lại để ôn sau 1, 3, 7 và 14 ngày.",
        "Example sentences use your own name, city and job. Phrases you have said come back for review after 1, 3, 7 and 14 days.",
        "Esimerkkilauseissa on oma nimesi, kaupunkisi ja työsi. Sanomasi fraasit palaavat kerrattaviksi 1, 3, 7 ja 14 päivän päästä."
      ),
    ],
    tips: [
      l3(
        "Mỗi sáng học một ngày, đừng dồn. Đến ngày cuối, bạn có chứng nhận và được nghe lại giọng mình ở ngày đầu tiên.",
        "Do one day each morning and don't cram. On the last day you get a certificate and hear your own voice from day one again.",
        "Tee yksi päivä joka aamu, älä ahmi. Viimeisenä päivänä saat todistuksen ja kuulet äänesi ensimmäiseltä päivältä."
      ),
    ],
    quiz: [
      {
        q: l3("Mỗi ngày của khóa 30 ngày có mấy phần?", "How many parts does each day of the 30-day course have?", "Montako osaa 30 päivän kurssin jokaisessa päivässä on?"),
        options: [l3("Hai", "Two", "Kaksi"), l3("Bốn", "Four", "Neljä"), l3("Mười", "Ten", "Kymmenen")],
        answer: 1,
        why: l3("Nghe và nhại, cụm câu, tự nói, và luyện với Lisa.", "Listen and repeat, phrases, speaking on your own and practice with Lisa.", "Kuuntele ja toista, fraasit, oma puhe ja harjoittelu Lisan kanssa."),
      },
      {
        q: l3("Một từ hiện màu đỏ sau khi bạn nói nghĩa là gì?", "What does a word turning red after you speak mean?", "Mitä tarkoittaa, jos sana muuttuu puhuessasi punaiseksi?"),
        options: [
          l3("Từ đó nói chưa rõ, hãy nói lại", "It wasn't clear, say it again", "Se ei kuulunut selvästi, sano se uudelleen"),
          l3("Bạn đã học xong khóa", "You finished the course", "Kurssi on suoritettu"),
          l3("Micro bị hỏng", "The microphone is broken", "Mikrofoni on rikki"),
        ],
        answer: 0,
        why: l3("Máy chấm từng câu và đánh dấu từ cần nói lại.", "Each sentence is scored and the words to redo are marked.", "Jokainen lause pisteytetään ja uusittavat sanat merkitään."),
      },
      {
        q: l3("Câu bạn đã nói sẽ quay lại để ôn khi nào?", "When do the phrases you said come back for review?", "Milloin sanomasi fraasit palaavat kerrattaviksi?"),
        options: [
          l3("Không bao giờ", "Never", "Ei koskaan"),
          l3("Chỉ ở ngày 30", "Only on day 30", "Vain päivänä 30"),
          l3("Sau 1, 3, 7 và 14 ngày", "After 1, 3, 7 and 14 days", "1, 3, 7 ja 14 päivän päästä"),
        ],
        answer: 2,
        why: l3("Ôn giãn dần như vậy giúp câu nhớ lâu.", "Spacing the reviews like this makes the phrases stick.", "Näin harvenevat kertaukset auttavat muistamaan."),
      },
    ],
  },
  {
    slug: "bb-vuong-quoc-ngon-tu",
    course: "c-babelisa",
    title: l3("Vương Quốc Ngôn Từ: xây thành bằng ngoại ngữ", "Kingdom of Words: build a city with a language", "Sanojen valtakunta: rakenna kaupunki kielen avulla"),
    summary: l3(
      "Game chiến thuật xây thành: muốn thành mạnh thì phải học ngoại ngữ, vì mỗi câu trả lời đúng ở Học viện giúp xây nhanh hơn.",
      "A city-building strategy game where learning makes you strong: every right answer in the Academy speeds up your building.",
      "Kaupunginrakennuspeli, jossa vahvistut oppimalla: jokainen oikea vastaus akatemiassa nopeuttaa rakentamista."
    ),
    video: v("bb-vuong-quoc-ngon-tu"),
    href: BABELISA,
    hrefLabel: PLAY,
    steps: [
      l3(
        "Chọn thẻ Vương Quốc Ngôn Từ, đặt tên cho thành, chọn tiếng muốn học: Anh, Phần Lan, Đức, Pháp, Nhật, Hàn hay Trung. Bấm “Bắt đầu chinh phục”, không cần tài khoản.",
        "Pick the Kingdom of Words card, name your city and choose a language: English, Finnish, German, French, Japanese, Korean or Chinese. Press start, no account needed.",
        "Valitse Sanojen valtakunnan kortti, nimeä kaupunkisi ja valitse kieli: englanti, suomi, saksa, ranska, japani, korea tai kiina. Aloita, tiliä ei tarvita."
      ),
      l3(
        "Xây nhà chính, ruộng, xưởng gỗ, mỏ đá, chợ, trại lính, học viện: tổng cộng 15 loại công trình. Lên cấp thì đổi diện mạo, hàng rào gỗ thành tường đá.",
        "Build a main hall, fields, a sawmill, a quarry, a market, barracks and an academy: 15 kinds of buildings in all. Upgrades change their look, from wooden fences to stone walls.",
        "Rakenna päärakennus, pellot, saha, louhos, tori, kasarmi ja akatemia: yhteensä 15 rakennustyyppiä. Tasot muuttavat ulkonäköä, puuaidasta tulee kivimuuri."
      ),
      l3(
        "Thành có ngày, có đêm, và có quân sư Lam bày cách cho bạn.",
        "Your city has day and night, and the adviser Lam shows you what to do.",
        "Kaupungissa on päivä ja yö, ja neuvonantaja Lam neuvoo, mitä tehdä."
      ),
      l3(
        "Vào Học viện luyện năm kỹ năng: nghe, nói, đọc, viết và phản xạ, với hơn 800 câu thật. Mỗi câu đúng rút 10% thời gian xây còn lại và cho Tinh Thể Lời.",
        "In the Academy, train five skills: listening, speaking, reading, writing and reflexes, with over 800 real sentences. Each right answer cuts 10% off the remaining build time and gives Word Crystals.",
        "Akatemiassa harjoittelet viittä taitoa: kuuntelua, puhumista, lukemista, kirjoittamista ja reaktiota yli 800 aidolla lauseella. Jokainen oikea vastaus lyhentää jäljellä olevaa rakennusaikaa 10 % ja antaa sanakristalleja."
      ),
      l3(
        "Ra bản đồ thế giới: đánh quái lấy đồ, giao thương hoặc chinh phục thành láng giềng, và giữ thành trước Giặc Câm Lặng. Từ nào bạn đã thuộc thì đạo quân có thêm lính.",
        "Head out to the world map: fight monsters for loot, trade with or conquer neighbouring cities and defend yours against the silent invaders. Every word you know adds soldiers to your army.",
        "Lähde maailmankartalle: taistele hirviöitä vastaan saaliin vuoksi, käy kauppaa naapurikaupunkien kanssa tai valloita ne ja puolusta omaasi hiljaisia hyökkääjiä vastaan. Jokainen osaamasi sana tuo armeijaan lisää sotilaita."
      ),
    ],
    tips: [
      l3(
        "Trước khi đi ngủ, vào Học viện trả lời mười câu: sáng ra công trình đã xong gần hết.",
        "Before bed, answer ten questions in the Academy: by morning your buildings are nearly done.",
        "Vastaa ennen nukkumaanmenoa kymmeneen kysymykseen akatemiassa: aamulla rakennukset ovat melkein valmiita."
      ),
      l3(
        "Muốn xếp hạng, trò chuyện và liên minh với người khác thì đăng nhập bằng email; còn không thì cứ chơi ngay.",
        "Sign in with your e-mail to join the rankings, chat and form alliances; otherwise just play.",
        "Kirjaudu sähköpostilla, jos haluat ranking-listoille, chattiin ja liittoumiin; muuten pelaa heti."
      ),
    ],
    quiz: [
      {
        q: l3("Mỗi câu trả lời đúng ở Học viện giúp gì?", "What does each right answer in the Academy do?", "Mitä jokainen oikea vastaus akatemiassa tekee?"),
        options: [
          l3("Rút 10% thời gian xây còn lại", "Cuts 10% off the remaining build time", "Lyhentää jäljellä olevaa rakennusaikaa 10 %"),
          l3("Xóa một công trình", "Removes a building", "Poistaa rakennuksen"),
          l3("Không có tác dụng gì", "Nothing", "Ei mitään"),
        ],
        answer: 0,
        why: l3("Câu đúng còn cho Tinh Thể Lời: học chính là cách tăng tốc duy nhất.", "It also gives Word Crystals: learning is the only way to speed up.", "Se antaa myös sanakristalleja: oppiminen on ainoa tapa nopeuttaa."),
      },
      {
        q: l3("Có cần tài khoản để bắt đầu chơi không?", "Do you need an account to start playing?", "Tarvitaanko pelin aloittamiseen tili?"),
        options: [
          l3("Có, bắt buộc", "Yes, always", "Kyllä, aina"),
          l3("Không, chỉ cần khi muốn xếp hạng, trò chuyện, liên minh", "No, only for rankings, chat and alliances", "Ei, vain ranking-listoihin, chattiin ja liittoumiin"),
          l3("Phải trả phí trước", "You must pay first", "Ensin pitää maksaa"),
        ],
        answer: 1,
        why: l3("Đặt tên thành, chọn tiếng là vào chơi được ngay.", "Name your city, choose a language and you are in.", "Nimeä kaupunki, valitse kieli ja pelaa."),
      },
      {
        q: l3("Học viện luyện bao nhiêu kỹ năng?", "How many skills does the Academy train?", "Montako taitoa akatemiassa harjoitellaan?"),
        options: [l3("Ba", "Three", "Kolme"), l3("Mười lăm", "Fifteen", "Viisitoista"), l3("Năm", "Five", "Viisi")],
        answer: 2,
        why: l3("Nghe, nói, đọc, viết và phản xạ. Mười lăm là số loại công trình.", "Listening, speaking, reading, writing and reflexes. Fifteen is the number of building types.", "Kuuntelu, puhuminen, lukeminen, kirjoittaminen ja reaktio. Viisitoista on rakennustyyppien määrä."),
      },
    ],
  },
  {
    slug: "bb-soi-taiga",
    course: "c-babelisa",
    title: l3("Sói Taiga: học võ tự vệ cùng thầy Alexei", "Taiga Wolf: self-defence with coach Alexei", "Taigan susi: itsepuolustusta valmentaja Alexein kanssa"),
    summary: l3(
      "Trại huấn luyện võ tự vệ thực chiến: 15 bài đi theo thứ tự, thầy Alexei giảng bằng tiếng Việt, có video làm mẫu, chạy chậm và chế độ gương.",
      "A practical self-defence camp: 15 lessons in order, coach Alexei explains in Vietnamese, with demo videos, slow motion and a mirror mode.",
      "Käytännön itsepuolustusleiri: 15 oppituntia järjestyksessä, valmentaja Alexei opettaa vietnamiksi, ja mukana on mallivideot, hidastus ja peilitila."
    ),
    video: v("bb-soi-taiga"),
    href: BABELISA,
    hrefLabel: PLAY,
    steps: [
      l3(
        "Chọn thẻ Sói Taiga. Trong trại có hồ sơ chiến binh, kế hoạch tập mỗi ngày và các nhánh huấn luyện.",
        "Pick the Taiga Wolf card. The camp has your fighter profile, a daily training plan and the training tracks.",
        "Valitse Taigan suden kortti. Leirillä on taistelijaprofiilisi, päivittäinen harjoitussuunnitelma ja harjoituspolut."
      ),
      l3(
        "Nhánh đang mở là Cận chiến tự vệ, 15 bài: từ khởi động và hơi thở, thế đứng, ngã an toàn, đến thoát hiểm và đối mặt kẻ cầm dao.",
        "The open track is close-combat self-defence, 15 lessons: from warm-up and breathing, stance and safe falling to escapes and facing someone with a knife.",
        "Avoinna on lähitaistelun itsepuolustuspolku, 15 oppituntia: lämmittelystä ja hengityksestä, asennosta ja turvallisesta kaatumisesta irtautumisiin ja veitsellä uhkaavan kohtaamiseen."
      ),
      l3(
        "Học theo thứ tự: xong bài trước mới mở bài sau. Cuối nhánh có bài thi tốt nghiệp.",
        "Lessons go in order: finish one to unlock the next. The track ends with a graduation test.",
        "Oppitunnit etenevät järjestyksessä: seuraava aukeaa, kun edellinen on tehty. Polku päättyy loppukokeeseen."
      ),
      l3(
        "Trong mỗi bài, thầy Alexei giảng bằng tiếng Việt, video làm mẫu từng bước. Bật chạy chậm hoặc chế độ gương để tập theo cho dễ.",
        "In each lesson coach Alexei explains in Vietnamese and a video shows every step. Turn on slow motion or mirror mode to follow along more easily.",
        "Jokaisessa oppitunnissa valmentaja Alexei selittää vietnamiksi ja video näyttää jokaisen vaiheen. Hidastus tai peilitila helpottaa mukana tekemistä."
      ),
      l3(
        "Nghe thầy dặn điểm cần nhớ và lỗi hay gặp, rồi tập theo nhịp thầy đếm. Tích điểm kinh nghiệm để lên cấp, từ Tân binh đến Sói Đầu Đàn.",
        "Listen to the key points and common mistakes, then train to the coach's count. Earn experience points to level up from Recruit to Pack Leader.",
        "Kuuntele tärkeät kohdat ja yleiset virheet ja harjoittele valmentajan laskiessa tahtia. Kerää kokemuspisteitä ja nouse alokkaasta laumanjohtajaksi."
      ),
    ],
    tips: [
      l3(
        "Khởi động thật kỹ, tập chậm, tập trên đệm và có bạn tập. Đau là dừng: võ tự vệ là để giữ an toàn cho mình và người thân.",
        "Warm up well, go slowly, train on a mat and with a partner. Stop if it hurts: self-defence is about keeping you and your loved ones safe.",
        "Lämmittele kunnolla, harjoittele hitaasti, alustalla ja parin kanssa. Lopeta, jos sattuu: itsepuolustus on oman ja läheisten turvallisuuden suojaamista."
      ),
    ],
    quiz: [
      {
        q: l3("Nhánh Cận chiến tự vệ có bao nhiêu bài?", "How many lessons does the close-combat track have?", "Montako oppituntia lähitaistelupolulla on?"),
        options: [l3("15 bài", "15 lessons", "15 oppituntia"), l3("5 bài", "5 lessons", "5 oppituntia"), l3("30 bài", "30 lessons", "30 oppituntia")],
        answer: 0,
        why: l3("15 bài, từ khởi động đến đối mặt kẻ cầm dao, và một bài thi tốt nghiệp.", "15 lessons, from warm-up to facing a knife, plus a graduation test.", "15 oppituntia lämmittelystä veitsen kohtaamiseen sekä loppukoe."),
      },
      {
        q: l3("Khi nào bài tiếp theo được mở?", "When does the next lesson unlock?", "Milloin seuraava oppitunti aukeaa?"),
        options: [
          l3("Mở tất cả ngay từ đầu", "Everything is open from the start", "Kaikki ovat auki alusta asti"),
          l3("Khi học xong bài trước", "When you finish the one before", "Kun edellinen on tehty"),
          l3("Sau một tuần", "After a week", "Viikon kuluttua"),
        ],
        answer: 1,
        why: l3("Các bài đi theo thứ tự để bạn có nền tảng trước khi tập động tác khó.", "Lessons go in order so you build a base before the harder moves.", "Oppitunnit etenevät järjestyksessä, jotta perusta on kunnossa ennen vaikeampia liikkeitä."),
      },
      {
        q: l3("Đang tập mà thấy đau, bạn làm gì?", "It hurts while you train. What do you do?", "Harjoitellessa alkaa sattua. Mitä teet?"),
        options: [
          l3("Cố tập tiếp cho xong", "Push on to finish", "Jatkat loppuun"),
          l3("Tập nhanh hơn", "Train faster", "Harjoittelet nopeammin"),
          l3("Dừng lại ngay", "Stop right away", "Lopetat heti"),
        ],
        answer: 2,
        why: l3("Đau là dừng. Tập chậm, trên đệm và có bạn tập.", "Pain means stop. Train slowly, on a mat and with a partner.", "Kipu tarkoittaa lopettamista. Harjoittele hitaasti, alustalla ja parin kanssa."),
      },
    ],
  },
  {
    slug: "bb-toan-lop-3",
    course: "c-babelisa",
    title: l3("Toán lớp 3 cùng cô Mai", "Year 3 maths with teacher Mai", "3. luokan matematiikkaa opettaja Main kanssa"),
    summary: l3(
      "Ong Vàng Toán 3: lớp toán bằng tiếng Việt theo sách giáo khoa mới, có video cô Mai giảng trên bảng, hơn một nghìn bài tập và gameshow Toán học.",
      "Ong Vàng Toán 3: Year 3 maths in Vietnamese following Vietnam's new textbooks, with teacher Mai at the board, over a thousand exercises and a maths game show.",
      "Ong Vàng Toán 3: vietnaminkielistä 3. luokan matematiikkaa Vietnamin uusien oppikirjojen mukaan, opettaja Mai taululla, yli tuhat tehtävää ja matikkavisa."
    ),
    video: v("bb-toan-lop-3"),
    href: BABELISA,
    hrefLabel: PLAY,
    steps: [
      l3(
        "Vào babelisa.com, chọn Khóa học, rồi Toán lớp 3. Mở game, bé chọn bộ sách Kết nối tri thức.",
        "On babelisa.com, choose Courses and then Year 3 maths. In the game, your child picks the Kết nối tri thức textbook series.",
        "Valitse babelisa.comissa kurssit ja sitten 3. luokan matematiikka. Pelissä lapsi valitsee Kết nối tri thức -oppikirjasarjan."
      ),
      l3(
        "Trang chính có nhiệm vụ hôm nay, chuỗi ngày học, danh hiệu, và bài Kiểm tra năng lực 15 câu để nhận vàng.",
        "The home page shows today's tasks, the day streak, titles, and a 15-question skills check that earns gold.",
        "Etusivulla ovat päivän tehtävät, päivien putki, arvonimet ja 15 kysymyksen taitotesti, josta saa kultaa."
      ),
      l3(
        "Vào “Học bài”, chọn chủ đề rồi chọn bài. Video cô Mai vừa viết lên bảng vừa giảng, bé nghe như đang ngồi trong lớp.",
        "Open the lessons, choose a topic and then a lesson. In the video teacher Mai writes on the board as she talks, just like being in class.",
        "Avaa oppitunnit, valitse aihe ja oppitunti. Videolla opettaja Mai kirjoittaa taululle ja selittää, aivan kuin luokassa."
      ),
      l3(
        "Sau video là bài tập: sai thì có gợi ý, đúng thì được sao và vàng. Có hơn 1000 bài tập với lời giải từng bước, 65 đề kiểm tra và gameshow Toán học.",
        "After the video come the exercises: a wrong answer gets a hint, a right one stars and gold. There are over 1,000 exercises with step-by-step solutions, 65 tests and a maths game show.",
        "Videon jälkeen tulevat tehtävät: väärästä vastauksesta saa vihjeen, oikeasta tähtiä ja kultaa. Tehtäviä on yli 1 000 vaiheittaisine ratkaisuineen, kokeita 65 ja lisäksi matikkavisa."
      ),
      l3(
        "Bật chế độ Toán + Tiếng Anh để bé vừa học toán vừa học từ tiếng Anh.",
        "Turn on the Maths + English mode so your child learns English words along with the maths.",
        "Laita päälle Matikka + englanti -tila, niin lapsi oppii englannin sanoja matematiikan ohessa."
      ),
    ],
    tips: [
      l3(
        "Mỗi tối một bài, bố mẹ ngồi cạnh xem cùng bé. Khóa toán miễn phí, không quảng cáo.",
        "One lesson each evening, with a parent watching alongside. The maths course is free, with no ads.",
        "Yksi oppitunti joka ilta, vanhempi vieressä katsomassa. Matematiikan kurssi on maksuton eikä siinä ole mainoksia."
      ),
    ],
    quiz: [
      {
        q: l3("Toán lớp 3 trên Babelisa theo bộ sách nào?", "Which textbook series does Year 3 maths follow?", "Mitä oppikirjasarjaa 3. luokan matematiikka seuraa?"),
        options: [l3("Kết nối tri thức", "Kết nối tri thức", "Kết nối tri thức"), l3("Sách tự soạn", "A home-made book", "Itse tehty kirja"), l3("Sách tiếng Anh", "An English book", "Englanninkielinen kirja")],
        answer: 0,
        why: l3("Bé chọn bộ sách Kết nối tri thức của chương trình sách giáo khoa mới.", "Your child picks Kết nối tri thức from Vietnam's new textbook programme.", "Lapsi valitsee Kết nối tri thức -sarjan Vietnamin uudesta oppikirjaohjelmasta."),
      },
      {
        q: l3("Bài Kiểm tra năng lực có bao nhiêu câu?", "How many questions are in the skills check?", "Montako kysymystä taitotestissä on?"),
        options: [l3("5 câu", "5", "5"), l3("15 câu", "15", "15"), l3("65 câu", "65", "65")],
        answer: 1,
        why: l3("15 câu để nhận vàng; 65 là số đề kiểm tra của cả khóa.", "15 questions that earn gold; 65 is the number of tests in the course.", "15 kysymystä, joista saa kultaa; 65 on kurssin kokeiden määrä."),
      },
      {
        q: l3("Muốn bé học thêm từ tiếng Anh khi học toán, bật gì?", "To add English words to the maths, what do you turn on?", "Mitä laitat päälle, jotta matematiikan ohessa opitaan englannin sanoja?"),
        options: [l3("Gameshow Toán học", "The maths game show", "Matikkavisan"), l3("Kiểm tra năng lực", "The skills check", "Taitotestin"), l3("Chế độ Toán + Tiếng Anh", "The Maths + English mode", "Matikka + englanti -tilan")],
        answer: 2,
        why: l3("Chế độ này cho bé học từ tiếng Anh ngay trong bài toán.", "This mode teaches English words right inside the maths.", "Tämä tila opettaa englannin sanoja suoraan matematiikan lomassa."),
      },
    ],
  },
  {
    slug: "bb-toan-lop-4",
    course: "c-babelisa",
    title: l3("Toán lớp 4 và Đảo Tiếng Anh", "Year 4 maths and the English island", "4. luokan matematiikka ja englannin saari"),
    summary: l3(
      "Ong Vàng Toán 4: phân số, đo lường, hình học với cô giáo giảng bằng giọng nói; sai thì cô giảng lại bằng tranh, học xong ghé Đảo Tiếng Anh cùng vẹt Lulu.",
      "Ong Vàng Toán 4: fractions, measurement and geometry with a teacher who explains out loud; wrong answers are explained again with pictures, then visit the English island with Lulu the parrot.",
      "Ong Vàng Toán 4: murtolukuja, mittaamista ja geometriaa opettajan selittäessä ääneen; väärät vastaukset selitetään kuvilla, ja lopuksi käydään englannin saarella Lulu-papukaijan kanssa."
    ),
    video: v("bb-toan-lop-4"),
    href: BABELISA,
    hrefLabel: PLAY,
    steps: [
      l3(
        "Vào babelisa.com, chọn Khóa học, rồi Toán lớp 4. Khóa có 13 chủ đề, 73 bài giảng, 612 bài tập và 57 đề kiểm tra.",
        "On babelisa.com, choose Courses and then Year 4 maths. It has 13 topics, 73 lessons, 612 exercises and 57 tests.",
        "Valitse babelisa.comissa kurssit ja sitten 4. luokan matematiikka. Siinä on 13 aihetta, 73 oppituntia, 612 tehtävää ja 57 koetta."
      ),
      l3(
        "Chọn bài và xem video cô giảng trên bảng; xem xong là làm bài ngay.",
        "Pick a lesson and watch the teacher explain at the board, then do the exercises straight away.",
        "Valitse oppitunti ja katso, kun opettaja selittää taululla, ja tee sitten tehtävät heti."
      ),
      l3(
        "Bé làm sai thì cô không chỉ báo sai mà giảng lại bằng tranh, để bé hiểu tại sao.",
        "When your child gets it wrong, the teacher doesn't just say so: she explains again with pictures so they understand why.",
        "Kun lapsi vastaa väärin, opettaja ei vain kerro sitä vaan selittää uudelleen kuvilla, jotta lapsi ymmärtää miksi."
      ),
      l3(
        "Làm đúng thì có sao, có vàng và danh hiệu mới.",
        "Right answers bring stars, gold and new titles.",
        "Oikeista vastauksista saa tähtiä, kultaa ja uusia arvonimiä."
      ),
      l3(
        "Học toán xong thì ghé Đảo Tiếng Anh cùng vẹt Lulu: nghe từ, chọn hình, học thêm từ vựng mỗi ngày.",
        "After the maths, visit the English island with Lulu the parrot: listen to a word, pick the picture and learn new words every day.",
        "Matematiikan jälkeen käydään englannin saarella Lulu-papukaijan kanssa: kuuntele sana, valitse kuva ja opi uusia sanoja joka päivä."
      ),
    ],
    tips: [
      l3(
        "Cho bé làm bài kiểm tra giữa kỳ và cuối kỳ trong game trước mỗi kỳ thi thật ở trường, để bé quen áp lực thời gian. Khóa miễn phí, không quảng cáo.",
        "Let your child do the in-game mid-term and end-of-term tests before each real exam at school, to get used to the time pressure. The course is free, with no ads.",
        "Anna lapsen tehdä pelin väli- ja loppukokeet ennen koulun oikeita kokeita, jotta aikapaine tulee tutuksi. Kurssi on maksuton eikä siinä ole mainoksia."
      ),
    ],
    quiz: [
      {
        q: l3("Bé làm sai một bài, cô giáo làm gì?", "Your child gets an exercise wrong. What does the teacher do?", "Lapsi vastaa väärin. Mitä opettaja tekee?"),
        options: [
          l3("Giảng lại bằng tranh để bé hiểu tại sao", "Explains again with pictures so they see why", "Selittää uudelleen kuvilla, jotta lapsi ymmärtää miksi"),
          l3("Chỉ báo sai rồi qua bài khác", "Just says it's wrong and moves on", "Kertoo vain, että meni väärin, ja siirtyy eteenpäin"),
          l3("Khóa bài học lại", "Locks the lesson", "Lukitsee oppitunnin"),
        ],
        answer: 0,
        why: l3("Hiểu tại sao sai thì lần sau bé làm đúng.", "Understanding the mistake helps them get it right next time.", "Kun virheen ymmärtää, seuraavalla kerralla menee oikein."),
      },
      {
        q: l3("Ai đi cùng bé trên Đảo Tiếng Anh?", "Who goes with your child on the English island?", "Kuka on lapsen mukana englannin saarella?"),
        options: [l3("Cô Lumi", "Teacher Lumi", "Opettaja Lumi"), l3("Vẹt Lulu", "Lulu the parrot", "Lulu-papukaija"), l3("Thầy Alexei", "Coach Alexei", "Valmentaja Alexei")],
        answer: 1,
        why: l3("Vẹt Lulu dạy bé nghe từ, chọn hình và học từ vựng mỗi ngày.", "Lulu the parrot helps them listen, pick pictures and learn words every day.", "Lulu-papukaija auttaa kuuntelemaan, valitsemaan kuvia ja oppimaan sanoja joka päivä."),
      },
      {
        q: l3("Khóa Toán lớp 4 có bao nhiêu đề kiểm tra?", "How many tests does Year 4 maths have?", "Montako koetta 4. luokan matematiikassa on?"),
        options: [l3("13", "13", "13"), l3("73", "73", "73"), l3("57", "57", "57")],
        answer: 2,
        why: l3("57 đề kiểm tra; 13 là số chủ đề và 73 là số bài giảng.", "57 tests; 13 is the number of topics and 73 the number of lessons.", "57 koetta; aiheita on 13 ja oppitunteja 73."),
      },
    ],
  },
  {
    slug: "bb-studio-sang-tao-nhi",
    course: "c-babelisa",
    title: l3("Studio Sáng Tạo Nhí: vẽ, làm móng, thời trang", "Kids' Creative Studio: colouring, nails and fashion", "Lasten luova studio: värittämistä, kynsiä ja muotia"),
    summary: l3(
      "Cả chục phòng cho bé chơi, cô Lisa nói tiếng Việt dẫn đi từng bước: tô tranh, tiệm nail, salon, thời trang, và học tiếng Anh để nạp năng lượng.",
      "Around ten rooms to play in, with Lisa guiding your child step by step in Vietnamese: colouring, a nail salon, a beauty salon, fashion, and English to recharge energy.",
      "Kymmenkunta huonetta leikkiin, ja Lisa opastaa lasta vaihe vaiheelta vietnamiksi: värittämistä, kynsistudio, kauneushoitola, muotia ja englantia energian lataamiseen."
    ),
    video: v("bb-studio-sang-tao-nhi"),
    href: BABELISA,
    hrefLabel: PLAY,
    steps: [
      l3(
        "Vào babelisa.com, chọn Khóa học, rồi Studio Sáng Tạo Nhí. Bấm “Cô giới thiệu” để cô Lisa dẫn bé đi xem từng phòng.",
        "On babelisa.com, choose Courses and then the Kids' Creative Studio. Tap the introduction button and Lisa shows your child each room.",
        "Valitse babelisa.comissa kurssit ja sitten lasten luova studio. Napauta esittelyä, niin Lisa näyttää lapselle jokaisen huoneen."
      ),
      l3(
        "Có Đảo tiếng Anh, lớp học ba lê, phòng tranh, đồ tranh bằng camera, tiệm nail, salon làm đẹp, xưởng thời trang, thợ xăm hình và họa sĩ đường phố.",
        "There is the English island, a ballet class, a picture room, camera tracing, a nail salon, a beauty salon, a fashion workshop, a tattoo artist and a street artist.",
        "Mukana ovat englannin saari, balettitunti, kuvahuone, kamerajäljennös, kynsistudio, kauneushoitola, muotistudio, tatuoija ja katutaiteilija."
      ),
      l3(
        "Phòng tranh có hơn 30 bức để tô và vẽ theo bước: chọn thùng sơn, chọn màu, chạm vào hình là màu đổ vào. Mỗi bức học thêm một từ tiếng Anh.",
        "The picture room has over 30 pictures to colour and draw step by step: pick the paint bucket and a colour and tap the picture to fill it. Each picture teaches one more English word.",
        "Kuvahuoneessa on yli 30 kuvaa väritettäväksi ja piirrettäväksi vaiheittain: valitse maalikauha ja väri ja napauta kuvaa. Jokaisesta kuvasta oppii uuden englannin sanan."
      ),
      l3(
        "Ở tiệm nail, bé chọn dáng móng, sơn từng móng, rắc kim tuyến và gắn đá. Salon và xưởng thời trang có đồ trang điểm, kiểu tóc và rất nhiều bộ đồ để phối.",
        "In the nail salon your child picks a nail shape, paints each nail and adds glitter and gems. The beauty salon and fashion workshop have make-up, hairstyles and lots of outfits to mix.",
        "Kynsistudiossa lapsi valitsee kynnen muodon, lakkaa kynnet ja lisää glitteriä ja kiviä. Kauneushoitolassa ja muotistudiossa on meikkejä, kampauksia ja paljon asuja yhdisteltäväksi."
      ),
      l3(
        "Hết năng lượng thì bé học tiếng Anh một chút để nạp lại, rồi chơi tiếp.",
        "When the energy runs out, your child does a little English to recharge and then plays on.",
        "Kun energia loppuu, lapsi opiskelee hetken englantia ladatakseen sen ja jatkaa sitten leikkiä."
      ),
    ],
    tips: [
      l3(
        "Bố mẹ chơi cùng bé mười lăm phút, rồi hỏi lại bé những từ tiếng Anh vừa học. Có sao và bảng xếp hạng nên bé rất thích khoe thành tích.",
        "Play with your child for fifteen minutes, then ask them the English words they just learned. Stars and a leaderboard make kids love showing off.",
        "Leiki lapsen kanssa viisitoista minuuttia ja kysy sitten juuri opitut englannin sanat. Tähdet ja tulostaulu saavat lapset ylpeiksi saavutuksistaan."
      ),
    ],
    quiz: [
      {
        q: l3("Bé hết năng lượng trong studio thì sao?", "What happens when your child runs out of energy in the studio?", "Mitä tapahtuu, kun lapselta loppuu studiossa energia?"),
        options: [
          l3("Phải đợi đến ngày mai", "They wait until tomorrow", "Pitää odottaa huomiseen"),
          l3("Học tiếng Anh một chút để nạp lại", "They do a little English to recharge", "Opiskellaan hetki englantia energian lataamiseksi"),
          l3("Phải mua thêm", "They have to buy more", "Pitää ostaa lisää"),
        ],
        answer: 1,
        why: l3("Vừa chơi vừa học, mà bé không thấy là đang học.", "Play and learning go together, and kids hardly notice they are learning.", "Leikki ja oppiminen kulkevat yhdessä, eikä lapsi huomaa oppivansa."),
      },
      {
        q: l3("Ai dẫn bé đi xem các phòng trong studio?", "Who shows your child around the studio's rooms?", "Kuka esittelee lapselle studion huoneet?"),
        options: [l3("Cô Lisa", "Lisa", "Lisa"), l3("Cô Vy", "Teacher Vy", "Opettaja Vy"), l3("Vẹt Pip", "Pip the parrot", "Pip-papukaija")],
        answer: 0,
        why: l3("Cô Lisa nói tiếng Việt và hướng dẫn bé từng bước.", "Lisa speaks Vietnamese and guides your child step by step.", "Lisa puhuu vietnamia ja opastaa lasta vaihe vaiheelta."),
      },
      {
        q: l3("Mỗi bức tranh tô xong, bé được thêm gì?", "What does each finished picture add?", "Mitä jokainen valmis kuva tuo lisää?"),
        options: [l3("Một bộ váy mới", "A new dress", "Uuden mekon"), l3("Một bài toán", "A maths exercise", "Matematiikan tehtävän"), l3("Một từ tiếng Anh", "One English word", "Yhden englannin sanan")],
        answer: 2,
        why: l3("Phòng tranh có hơn 30 bức, mỗi bức học thêm một từ tiếng Anh.", "The picture room has over 30 pictures, each teaching one English word.", "Kuvahuoneessa on yli 30 kuvaa, ja jokainen opettaa yhden englannin sanan."),
      },
    ],
  },
  {
    slug: "bb-mua-ba-le",
    course: "c-babelisa",
    title: l3("Lớp học Múa Ba Lê cùng cô Vy", "Ballet class with teacher Vy", "Balettitunti opettaja Vyn kanssa"),
    summary: l3(
      "Cô Vy dạy bé múa ba lê bằng tiếng Việt: năm cấp độ, mười ba bài có video làm mẫu, chạy chậm, chế độ gương, rồi thay váy lên sân khấu biểu diễn.",
      "Teacher Vy teaches ballet in Vietnamese: five levels and thirteen lessons with demo videos, slow motion and a mirror mode, then a dress-up and a show on stage.",
      "Opettaja Vy opettaa balettia vietnamiksi: viisi tasoa ja kolmetoista oppituntia mallivideoineen, hidastuksineen ja peilitiloineen, ja lopuksi puvustus ja esitys lavalla."
    ),
    video: v("bb-mua-ba-le"),
    href: BABELISA,
    hrefLabel: PLAY,
    steps: [
      l3(
        "Vào babelisa.com, chọn Khóa học, rồi Lớp học Múa Ba Lê.",
        "On babelisa.com, choose Courses and then the ballet class.",
        "Valitse babelisa.comissa kurssit ja sitten balettitunti."
      ),
      l3(
        "Có năm cấp độ, mười ba bài: chào lớp học, vị trí chân và tay, nhún gối, kiễng chân, duỗi chân, bật nhảy, xoay vòng, và cuối cùng là bài múa Thiên nga nhỏ.",
        "There are five levels and thirteen lessons: greeting the class, foot and arm positions, knee bends, rising on the toes, leg stretches, jumps, turns and finally the Little Swan dance.",
        "Tasoja on viisi ja oppitunteja kolmetoista: tunnin tervehdys, jalkojen ja käsien asennot, polvien taivutus, varpaille nousu, jalan ojennus, hypyt, piruetit ja lopuksi Pieni joutsen -tanssi."
      ),
      l3(
        "Mỗi bài có video bạn Na làm mẫu, cô Vy đếm nhịp và nhắc từng động tác. Bé xem kỹ rồi múa theo.",
        "Each lesson has a video of Na showing the moves while teacher Vy counts the beat and calls out every step. Your child watches, then dances along.",
        "Jokaisessa oppitunnissa Na näyttää liikkeet videolla, ja opettaja Vy laskee tahdin ja muistuttaa jokaisesta liikkeestä. Lapsi katsoo ja tanssii mukana."
      ),
      l3(
        "Động tác khó thì bấm chạy chậm. Bật chế độ gương bằng camera trước để bé tự nhìn mình.",
        "For a hard move, tap slow motion. Turn on mirror mode with the front camera so your child can see themselves.",
        "Vaikeassa liikkeessä paina hidastusta. Peilitila etukameralla näyttää lapselle hänet itsensä."
      ),
      l3(
        "Học xong vào phòng thay đồ: hơn mười bộ váy, từ tutu hồng, thiên nga trắng đến Lọ Lem, thêm kiểu tóc và phụ kiện, rồi lên sân khấu biểu diễn và chụp ảnh.",
        "After the lesson, go to the dressing room: over ten dresses, from a pink tutu and a white swan to Cinderella, plus hairstyles and accessories, then perform on stage and take a photo.",
        "Tunnin jälkeen pukuhuoneeseen: yli kymmenen mekkoa vaaleanpunaisesta tutusta valkoiseen joutseneen ja Tuhkimoon, kampauksia ja asusteita, ja sitten esitys lavalla ja valokuva."
      ),
    ],
    tips: [
      l3(
        "Dọn một khoảng sàn trống, cho bé đi chân trần hoặc giày mềm, và để máy tính bảng ở chỗ bé nhìn rõ. Mỗi ngày một bài là đủ.",
        "Clear some floor space, let your child dance barefoot or in soft shoes and put the tablet where they can see it well. One lesson a day is enough.",
        "Raivaa vapaata lattiaa, anna lapsen tanssia paljain jaloin tai pehmeissä tossuissa ja aseta tabletti hyvin näkyville. Yksi oppitunti päivässä riittää."
      ),
    ],
    quiz: [
      {
        q: l3("Lớp học Múa Ba Lê có bao nhiêu bài?", "How many lessons does the ballet class have?", "Montako oppituntia balettitunnilla on?"),
        options: [l3("Năm", "Five", "Viisi"), l3("Mười ba", "Thirteen", "Kolmetoista"), l3("Bốn mươi hai", "Forty-two", "Neljäkymmentäkaksi")],
        answer: 1,
        why: l3("Mười ba bài, chia năm cấp độ.", "Thirteen lessons over five levels.", "Kolmetoista oppituntia viidellä tasolla."),
      },
      {
        q: l3("Chế độ gương dùng gì để bé tự nhìn mình?", "What does mirror mode use so your child can see themselves?", "Millä peilitila näyttää lapselle hänet itsensä?"),
        options: [l3("Camera trước", "The front camera", "Etukameralla"), l3("Một chiếc gương thật", "A real mirror", "Oikealla peilillä"), l3("Ảnh chụp sẵn", "A saved photo", "Tallennetulla kuvalla")],
        answer: 0,
        why: l3("Camera trước cho bé thấy mình bên cạnh bạn Na làm mẫu.", "The front camera lets your child see themselves next to Na's demonstration.", "Etukamera näyttää lapsen Nan mallisuorituksen rinnalla."),
      },
      {
        q: l3("Bài múa cuối cùng của lớp là bài gì?", "What is the final dance of the class?", "Mikä on tunnin viimeinen tanssi?"),
        options: [l3("Bật nhảy", "Jumps", "Hypyt"), l3("Chào lớp học", "Greeting the class", "Tunnin tervehdys"), l3("Thiên nga nhỏ", "The Little Swan", "Pieni joutsen")],
        answer: 2,
        why: l3("Sau các động tác cơ bản, bé múa trọn bài Thiên nga nhỏ.", "After the basic moves, your child dances the whole Little Swan.", "Perusliikkeiden jälkeen lapsi tanssii koko Pienen joutsenen."),
      },
    ],
  },
  {
    slug: "bb-game-hoc-ve",
    course: "c-babelisa",
    title: l3("Game Học Vẽ cùng cô Lumi", "Drawing game with teacher Lumi", "Piirtämispeli opettaja Lumin kanssa"),
    summary: l3(
      "Cô Lumi hướng dẫn bé vẽ từng nét, từ quả táo đến chân dung ông bà: 42 bài, ba cấp độ, chấm sao từng bước, và đồ tranh bằng camera lên giấy thật.",
      "Teacher Lumi guides your child stroke by stroke, from an apple to a portrait of grandparents: 42 lessons, three levels, stars for each step, and camera tracing onto real paper.",
      "Opettaja Lumi opastaa lasta veto vedolta omenasta isovanhempien muotokuvaan: 42 oppituntia, kolme tasoa, tähdet jokaisesta vaiheesta ja kamerajäljennös oikealle paperille."
    ),
    video: v("bb-game-hoc-ve"),
    href: BABELISA,
    hrefLabel: PLAY,
    steps: [
      l3(
        "Vào babelisa.com, chọn Khóa học, rồi Game Học Vẽ. Có 42 bài, chia ba cấp độ.",
        "On babelisa.com, choose Courses and then the drawing game. There are 42 lessons in three levels.",
        "Valitse babelisa.comissa kurssit ja sitten piirtämispeli. Oppitunteja on 42 kolmella tasolla."
      ),
      l3(
        "Mỗi bức đi qua bốn bước: vẽ nét viền, tô màu nền, đổ bóng, rồi thêm điểm sáng.",
        "Every picture goes through four steps: outline, base colour, shading and then highlights.",
        "Jokainen kuva etenee neljässä vaiheessa: ääriviivat, pohjaväri, varjostus ja lopuksi valokohdat."
      ),
      l3(
        "Xong mỗi bước, game chấm phần trăm và cho từ một đến ba sao.",
        "After each step the game gives a percentage and one to three stars.",
        "Jokaisen vaiheen jälkeen peli antaa prosentit ja yhdestä kolmeen tähteä."
      ),
      l3(
        "Tranh vẽ xong được treo trong Phòng tranh của bé. Còn có bài luyện thi mỹ thuật và học tiếng Anh cùng vẹt Pip.",
        "Finished pictures hang in your child's own gallery. There are also art exam practice lessons and English with Pip the parrot.",
        "Valmiit kuvat ripustetaan lapsen omaan galleriaan. Lisäksi on taidekokeisiin valmistavia tehtäviä ja englantia Pip-papukaijan kanssa."
      ),
      l3(
        "Đồ tranh bằng camera: đặt điện thoại lên một cái cốc phía trên tờ giấy, màn hình chiếu hình mẫu, bé cầm bút đồ theo lên giấy thật.",
        "Camera tracing: rest the phone on a cup above a sheet of paper, the screen shows the model picture and your child traces it onto real paper with a pen.",
        "Kamerajäljennös: aseta puhelin mukin päälle paperiarkin yläpuolelle, näyttö näyttää mallikuvan ja lapsi jäljentää sen kynällä oikealle paperille."
      ),
    ],
    tips: [
      l3(
        "Đồ tranh bằng camera là cách để bé đưa bức vẽ ra giấy thật: chỉ cần một cái cốc, một tờ giấy và cây bút.",
        "Camera tracing is how your child brings a drawing onto real paper: all you need is a cup, a sheet of paper and a pen.",
        "Kamerajäljennöksellä lapsi saa piirroksen oikealle paperille: tarvitaan vain muki, paperiarkki ja kynä."
      ),
    ],
    quiz: [
      {
        q: l3("Mỗi bức tranh đi qua mấy bước?", "How many steps does each picture go through?", "Montako vaihetta jokaisessa kuvassa on?"),
        options: [l3("Bốn", "Four", "Neljä"), l3("Hai", "Two", "Kaksi"), l3("Mười", "Ten", "Kymmenen")],
        answer: 0,
        why: l3("Nét viền, màu nền, đổ bóng và điểm sáng.", "Outline, base colour, shading and highlights.", "Ääriviivat, pohjaväri, varjostus ja valokohdat."),
      },
      {
        q: l3("Game Học Vẽ có bao nhiêu bài?", "How many lessons does the drawing game have?", "Montako oppituntia piirtämispelissä on?"),
        options: [l3("13", "13", "13"), l3("42", "42", "42"), l3("100", "100", "100")],
        answer: 1,
        why: l3("42 bài chia ba cấp độ, từ quả táo đến chân dung ông bà.", "42 lessons in three levels, from an apple to a portrait of grandparents.", "42 oppituntia kolmella tasolla omenasta isovanhempien muotokuvaan."),
      },
      {
        q: l3("Khi đồ tranh bằng camera, đặt điện thoại ở đâu?", "Where does the phone go for camera tracing?", "Mihin puhelin asetetaan kamerajäljennöksessä?"),
        options: [
          l3("Dựng vào tường", "Against the wall", "Seinää vasten"),
          l3("Trong tay bé", "In your child's hand", "Lapsen käteen"),
          l3("Lên một cái cốc, phía trên tờ giấy", "On a cup, above the paper", "Mukin päälle paperin yläpuolelle"),
        ],
        answer: 2,
        why: l3("Màn hình chiếu hình mẫu, bé đồ theo lên giấy thật bên dưới.", "The screen shows the model and your child traces it onto the paper below.", "Näyttö näyttää mallin, ja lapsi jäljentää sen alla olevalle paperille."),
      },
    ],
  },
];
