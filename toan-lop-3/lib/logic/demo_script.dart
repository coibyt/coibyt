/// Kịch bản cô giáo làm mẫu (Dart thuần, dùng được trong tool/make_voice.dart).
library;

import 'dart:math';

import '../models/blocks.dart';
import '../models/problem.dart';
import 'review_game.dart';
import 'visual_story.dart';
import 'show_lines.dart' show stableSeed;
import 'tips.dart';
import 'tutor.dart';

/// Câu cô hỏi nhanh giữa giờ giảng: bé chạm chọn, cô khen hoặc giải thích rồi giảng tiếp.
class DemoQuiz {
  const DemoQuiz({
    required this.question,
    required this.choices,
    required this.correct,
    this.followUp = const [],
    this.aid,
    this.survey = false,
  });

  /// Phép tính để vẽ tranh minh hoạ khi bé trả lời sai ("6 × 8 = 48"); null = không có tranh.
  final String? aid;

  /// Câu hỏi khảo sát (con đã hiểu bài chưa?) — không có đáp án đúng/sai.
  final bool survey;

  /// Câu hỏi dễ hơn: chỉ còn đáp án đúng và một đáp án sai.
  DemoQuiz get easier {
    if (choices.length <= 2) return this;
    final keep = [correct, (correct + 1) % choices.length]..sort();
    return DemoQuiz(
      question: question,
      choices: [for (final i in keep) choices[i]],
      correct: keep.indexOf(correct),
      followUp: followUp,
      aid: aid,
    );
  }

  final String question;
  final List<String> choices;
  final int correct;

  /// Sau khi bé trả lời: cô dẫn dắt sang nội dung bài (nhắc quy tắc, chỉ lên bảng…).
  final List<String> followUp;

  /// Cô đọc từng phương án: "Phương án A: 18."
  List<String> get optionLines => [for (var i = 0; i < choices.length; i++) optionLine(i, choices[i])];

  DemoQuiz withFollowUp(List<String> lines) =>
      DemoQuiz(question: question, choices: choices, correct: correct, followUp: lines, aid: aid);

  DemoQuiz withAid(String? equation) =>
      DemoQuiz(question: question, choices: choices, correct: correct, followUp: followUp, aid: equation);

  /// Cô nói khi bé chọn sai (hoặc để nhắc lại đáp án).
  String get reveal => 'Đáp án đúng là ${choices[correct]} nhé!';
}

/// Cô đọc một phương án (khác cách MC đọc "Đáp án A…" để mỗi giọng có câu riêng).
String optionLine(int i, String choice) => 'Phương án ${'ABC'[i]}: $choice.';

/// Câu hỏi với 3 lựa chọn số, thứ tự cố định theo [seedKey] (để ghi âm sẵn lời cô).
DemoQuiz _numberQuiz(String question, int answer, String seedKey, {String unit = ''}) {
  final rnd = Random(stableSeed(seedKey));
  final values = [answer, ...numberDistractors(answer, rnd).take(2)]..shuffle(rnd);
  return DemoQuiz(
    question: question,
    choices: [for (final v in values) '${formatVi(v)}$unit'],
    correct: values.indexOf(answer),
  );
}

final _stepOp = RegExp(r'(\d+) (nhân|cộng|trừ) (\d+) bằng (\d+)');
final _stepDiv = RegExp(r'(\d+) chia (\d+) được (\d+)');
final _equation = RegExp(r'^(.*\d.*[+\-−×x:÷].*\d.*)=\s*([\d.]+)\s*$');

/// Câu hỏi nhanh cho một phép tính mẫu "6 × 8 = 48" (null nếu không hợp).
DemoQuiz? equationQuiz(String text) {
  final m = _equation.firstMatch(text.trim());
  if (m == null) return null;
  final answer = int.tryParse(m[2]!.replaceAll('.', ''));
  if (answer == null) return null;
  return _numberQuiz('Đố con: ${m[1]!.trim()} = ?', answer, text).withAid(text.trim());
}

/// Câu hỏi nhanh cho một bước đặt tính "3 nhân 6 bằng 18, viết 8 nhớ 1." (null nếu không hợp).
DemoQuiz? stepQuiz(String stepText) {
  final m = _stepOp.firstMatch(stepText);
  if (m != null) {
    const sym = {'nhân': '×', 'cộng': '+', 'trừ': '−'};
    return _numberQuiz(
      'Đố con: ${m[1]} ${m[2]} ${m[3]} bằng bao nhiêu?',
      int.parse(m[4]!),
      stepText,
    ).withAid('${m[1]} ${sym[m[2]]} ${m[3]} = ${m[4]}');
  }
  final d = _stepDiv.firstMatch(stepText);
  if (d != null) {
    return _numberQuiz(
      'Đố con: ${d[1]} chia ${d[2]} được mấy?',
      int.parse(d[3]!),
      stepText,
    ).withAid('${d[1]} : ${d[2]} = ${d[3]}');
  }
  return null;
}

/// Câu hỏi nhanh lấy từ bài tập dễ của bài (khi phần Nhớ nhanh không có phép tính để hỏi).
DemoQuiz? problemQuiz(List<Problem> problems) {
  // Ưu tiên câu dễ nhất.
  final sorted = [...problems]..sort((a, b) => a.level.compareTo(b.level));
  for (final p in sorted) {
    if (p.access != Access.free) continue;
    final q = showQuestion(p);
    if (q == null) continue;
    final picks = <int>{q.correct, ...List.generate(q.choices.length, (i) => i)}.take(3).toList()..sort();
    return DemoQuiz(
      question: q.prompt,
      choices: [for (final i in picks) q.choices[i]],
      correct: picks.indexOf(q.correct),
    );
  }
  return null;
}

/// Tư thế cô khi nói một cảnh.
enum DemoMood { idle, point, clap }

/// Một cảnh trong lúc cô làm mẫu: cô nói [say] trong khi bảng hiện khối [block] tới bước [step].
class DemoScene {
  const DemoScene({
    required this.say,
    this.block,
    this.step,
    this.tip,
    this.quiz,
    this.check = false,
    this.summary = false,
    this.mood = DemoMood.point,
  });

  /// Câu kiểm tra hiểu bài cuối giờ.
  final bool check;

  /// Cô tổng kết phần kiểm tra (lời nói tuỳ kết quả).
  final bool summary;

  /// Cô hỏi nhanh: đọc [quiz].question rồi chờ bé chọn.
  final DemoQuiz? quiz;

  final List<String> say;

  /// Khối nội dung đang giảng (chỉ số trong danh sách khối), null = lời mở đầu / kết.
  final int? block;

  /// Bước của khối đặt tính (1..n), null = không phải khối đặt tính.
  final int? step;

  /// Chỉ số mẹo đang đọc (trong danh sách mẹo).
  final int? tip;
  final DemoMood mood;
}

/// Kịch bản cô giảng: đọc từng khối, đặt tính từng bước, rồi đọc bí quyết & mẹo.
List<DemoScene> buildDemoScript(
  List<ContentBlock> blocks, {
  List<String> intro = const [],
  List<Tip> tips = const [],
  List<String> outro = const [],
  List<Problem> problems = const [],
  int maxQuizzes = 3,
  bool checks = false,
}) {
  final scenes = <DemoScene>[if (intro.isNotEmpty) DemoScene(say: intro, mood: DemoMood.idle)];
  var quizzes = 0;
  DemoScene? ask(DemoQuiz? q, int block, {int? step}) {
    if (q == null || quizzes >= maxQuizzes) return null;
    quizzes++;
    return DemoScene(say: [q.question, ...q.optionLines], block: block, step: step, quiz: q, mood: DemoMood.idle);
  }

  for (final (i, b) in blocks.indexed) {
    switch (b) {
      case TextBlock(:final text, :final style):
        scenes.add(
          DemoScene(
            say: [if (style == TextBlockStyle.tip) TutorLines.tipLead[TipKind.trick]!, text],
            block: i,
            mood: style == TextBlockStyle.rule ? DemoMood.point : DemoMood.idle,
          ),
        );
      case EquationBlock(:final text):
        // Hỏi trước, rồi cô mới đọc kết quả.
        final q = ask(equationQuiz(text)?.withFollowUp(const [TutorLines.bridgeEquation]), i);
        if (q != null) scenes.add(q);
        scenes.add(DemoScene(say: [text], block: i));
      case final ColumnArithmeticBlock c:
        scenes.add(DemoScene(say: const [TutorLines.demoColumn], block: i, step: 0));
        final askAt = c.digitSteps.length > 1 ? 1 : 0;
        for (final (k, s) in c.digitSteps.indexed) {
          if (k == askAt) {
            final q = ask(stepQuiz(s.text)?.withFollowUp(const [TutorLines.bridgeStep]), i, step: k);
            if (q != null) scenes.add(q);
          }
          scenes.add(DemoScene(say: [s.text], block: i, step: k + 1));
        }
      case final LongDivisionBlock d:
        scenes.add(DemoScene(say: const [TutorLines.demoDivision], block: i, step: 0));
        for (final (k, s) in d.digitSteps.indexed) {
          if (k == 0) {
            final q = ask(stepQuiz(s.text)?.withFollowUp(const [TutorLines.bridgeStep]), i, step: k);
            if (q != null) scenes.add(q);
          }
          scenes.add(DemoScene(say: [s.text], block: i, step: k + 1));
        }
      case final WordProblemBlock w:
        for (final l in w.lines) {
          final q = ask(equationQuiz(l.equation)?.withFollowUp(const [TutorLines.bridgeEquation]), i);
          if (q != null) {
            scenes.add(q);
            break;
          }
        }
        scenes.add(
          DemoScene(
            say: [
              for (final l in w.lines) ...[l.explanation, l.equation],
            ],
            block: i,
          ),
        );
      case ImageBlock():
        break;
    }
  }
  if (quizzes == 0) {
    // Không có phép tính để hỏi: lấy câu dễ nhất của bài, rồi cô nhắc lại quy tắc của bài.
    final rule =
        blocks.whereType<TextBlock>().where((b) => b.style == TextBlockStyle.rule).firstOrNull ??
        blocks.whereType<TextBlock>().firstOrNull;
    final q = problemQuiz(problems)?.withFollowUp([TutorLines.bridgeLesson, ?rule?.text]);
    if (q != null) {
      quizzes++;
      scenes.add(DemoScene(say: [TutorLines.quizLead, q.question, ...q.optionLines], quiz: q, mood: DemoMood.idle));
    }
  }
  for (final (k, t) in tips.indexed) {
    scenes.add(DemoScene(say: [TutorLines.tipLead[t.kind]!, t.text], tip: k, mood: DemoMood.idle));
  }
  if (checks) {
    // Cuối giờ: con đã hiểu bài chưa? rồi 2 câu kiểm tra (không trùng câu đã hỏi).
    final asked = {for (final s in scenes) ?s.quiz?.question};
    final cands = <DemoQuiz>[
      for (final b in blocks)
        if (b is EquationBlock)
          ?equationQuiz(b.text)
        else if (b is WordProblemBlock)
          for (final l in b.lines) ?equationQuiz(l.equation),
      for (final p in [...problems]..sort((a, b) => a.level.compareTo(b.level)))
        if (p.access == Access.free) ?problemQuiz([p]),
    ];
    final picked = <DemoQuiz>[];
    for (final q in cands) {
      if (picked.length >= 2) break;
      if (asked.add(q.question)) picked.add(q);
    }
    if (picked.isNotEmpty) {
      final survey = DemoQuiz(
        question: TutorLines.understandAsk,
        choices: TutorLines.understandOptions,
        correct: 0,
        survey: true,
      );
      scenes.add(DemoScene(say: [survey.question, ...survey.optionLines], quiz: survey, mood: DemoMood.idle));
      for (final q in picked) {
        scenes.add(DemoScene(say: [q.question, ...q.optionLines], quiz: q, check: true, mood: DemoMood.idle));
      }
      scenes.add(const DemoScene(say: [], summary: true, mood: DemoMood.clap));
    }
  }
  if (outro.isNotEmpty) scenes.add(DemoScene(say: outro, mood: DemoMood.clap));
  return scenes;
}

/// Mọi câu cô có thể nói khi thuyết minh tranh cho câu hỏi [q] (để ghi âm sẵn).
List<String> remedyLines(DemoQuiz q) => [
  for (final (text, _) in aidStory(q.aid ?? '')?.lines ?? const <StoryLine>[]) text,
  ...q.easier.optionLines,
];
