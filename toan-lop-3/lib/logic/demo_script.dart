/// Kịch bản cô giáo làm mẫu (Dart thuần, dùng được trong tool/make_voice.dart).
library;

import '../models/blocks.dart';
import 'tips.dart';
import 'tutor.dart';

/// Tư thế cô khi nói một cảnh.
enum DemoMood { idle, point, clap }

/// Một cảnh trong lúc cô làm mẫu: cô nói [say] trong khi bảng hiện khối [block] tới bước [step].
class DemoScene {
  const DemoScene({required this.say, this.block, this.step, this.tip, this.mood = DemoMood.point});

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
}) {
  final scenes = <DemoScene>[if (intro.isNotEmpty) DemoScene(say: intro, mood: DemoMood.idle)];
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
        scenes.add(DemoScene(say: [text], block: i));
      case final ColumnArithmeticBlock c:
        scenes.add(DemoScene(say: const [TutorLines.demoColumn], block: i, step: 0));
        for (final (k, s) in c.digitSteps.indexed) {
          scenes.add(DemoScene(say: [s.text], block: i, step: k + 1));
        }
      case final LongDivisionBlock d:
        scenes.add(DemoScene(say: const [TutorLines.demoDivision], block: i, step: 0));
        for (final (k, s) in d.digitSteps.indexed) {
          scenes.add(DemoScene(say: [s.text], block: i, step: k + 1));
        }
      case final WordProblemBlock w:
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
  for (final (k, t) in tips.indexed) {
    scenes.add(DemoScene(say: [TutorLines.tipLead[t.kind]!, t.text], tip: k, mood: DemoMood.idle));
  }
  if (outro.isNotEmpty) scenes.add(DemoScene(say: outro, mood: DemoMood.clap));
  return scenes;
}
