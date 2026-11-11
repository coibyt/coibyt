import 'blocks.dart';
import 'json_reader.dart';

enum Access { free, vip }

Access _readAccess(JsonReader r, String key) =>
    Access.values.byName(r.oneOf(key, {'free', 'vip'}));

enum ProblemType {
  multipleChoice('multiple_choice'),
  fillBlank('fill_blank'),
  dragDrop('drag_drop'),
  matching('matching');

  const ProblemType(this.jsonName);

  final String jsonName;

  static ProblemType fromJsonName(String name) =>
      values.firstWhere((t) => t.jsonName == name);

  /// Câu lệnh mặc định (ngắn) nếu bài không ghi `instruction`.
  String get defaultInstruction => switch (this) {
        ProblemType.multipleChoice => 'Chọn đáp án đúng.',
        ProblemType.fillBlank => 'Điền số thích hợp.',
        ProblemType.dragDrop => 'Kéo số vào ô trống.',
        ProblemType.matching => 'Nối cho đúng.',
      };
}

/// Đề bài: chữ + (tuỳ chọn) công thức LaTeX, ảnh, câu đọc to.
class PromptContent {
  const PromptContent({required this.text, this.math, this.image, this.speak});

  factory PromptContent.fromJson(JsonReader r) => PromptContent(
        text: r.string('text'),
        math: r.optString('math'),
        image: r.has('image') ? ContentImage.fromJson(r.object('image')) : null,
        speak: r.optString('speak'),
      );

  final String text;
  final String? math;
  final ContentImage? image;
  final String? speak;
}

/// Một lựa chọn / thẻ số / mục để nối.
class OptionItem {
  const OptionItem({required this.id, required this.text, this.image});

  factory OptionItem.fromJson(JsonReader r) {
    final id = r.string('id');
    if (!RegExp(r'^[a-z0-9_]+$').hasMatch(id)) {
      throw ContentFormatException('${r.path}.id', '"$id" chỉ gồm a-z, 0-9, _');
    }
    return OptionItem(
      id: id,
      text: r.string('text'),
      image: r.has('image') ? ContentImage.fromJson(r.object('image')) : null,
    );
  }

  final String id;
  final String text;
  final ContentImage? image;
}

// ---------------------------------------------------------------------------
// Luật chấm ô trống
// ---------------------------------------------------------------------------

sealed class AnswerRule {
  const AnswerRule();

  factory AnswerRule.fromJson(JsonReader r) {
    final kind = r.oneOf('kind', {'number', 'text'});
    if (kind == 'number') {
      return NumberAnswerRule(
        value: r.integer('value', min: 0, max: 1000000),
        alsoAccept: r.integers('alsoAccept', optional: true),
        unit: r.optString('unit'),
        unitAliases: r.strings('unitAliases', optional: true),
        allowLeadingZeros: r.boolean('allowLeadingZeros', defaultValue: true),
      );
    }
    return TextAnswerRule(
      values: r.strings('values', minItems: 1),
      ignoreCase: r.boolean('ignoreCase', defaultValue: true),
      ignoreDiacritics: r.boolean('ignoreDiacritics', defaultValue: false),
    );
  }

  /// Đáp án để hiển thị.
  String get displayAnswer;
}

class NumberAnswerRule extends AnswerRule {
  const NumberAnswerRule({
    required this.value,
    this.alsoAccept = const [],
    this.unit,
    this.unitAliases = const [],
    this.allowLeadingZeros = true,
  });

  final int value;
  final List<int> alsoAccept;
  final String? unit;
  final List<String> unitAliases;
  final bool allowLeadingZeros;

  @override
  String get displayAnswer => '$value';
}

class TextAnswerRule extends AnswerRule {
  const TextAnswerRule({
    required this.values,
    this.ignoreCase = true,
    this.ignoreDiacritics = false,
  });

  final List<String> values;
  final bool ignoreCase;
  final bool ignoreDiacritics;

  @override
  String get displayAnswer => values.first;
}

// ---------------------------------------------------------------------------
// Mẫu dòng có ô trống: "21 × 3 = {{b1}}"
// ---------------------------------------------------------------------------

sealed class TemplatePart {
  const TemplatePart();
}

class TemplateText extends TemplatePart {
  const TemplateText(this.text);
  final String text;
}

class TemplateSlot extends TemplatePart {
  const TemplateSlot(this.id);
  final String id;
}

final _slotPattern = RegExp(r'\{\{([a-z0-9_]+)\}\}');

/// Tách mẫu thành các dòng, mỗi dòng là danh sách phần chữ / ô trống.
List<List<TemplatePart>> parseTemplate(String template) {
  return [
    for (final line in template.split('\n'))
      () {
        final parts = <TemplatePart>[];
        var last = 0;
        for (final m in _slotPattern.allMatches(line)) {
          if (m.start > last) parts.add(TemplateText(line.substring(last, m.start)));
          parts.add(TemplateSlot(m.group(1)!));
          last = m.end;
        }
        if (last < line.length) parts.add(TemplateText(line.substring(last)));
        return parts;
      }(),
  ];
}

/// Danh sách mã ô trống theo thứ tự xuất hiện trong mẫu.
List<String> templateSlotIds(String template) =>
    [for (final m in _slotPattern.allMatches(template)) m.group(1)!];

// ---------------------------------------------------------------------------
// Phần riêng của từng dạng bài
// ---------------------------------------------------------------------------

sealed class ProblemBody {
  const ProblemBody();

  ProblemType get type;
}

class MultipleChoiceBody extends ProblemBody {
  const MultipleChoiceBody({
    required this.choices,
    required this.correctChoiceIds,
    this.multiSelect = false,
    this.shuffleChoices = true,
  });

  final List<OptionItem> choices;
  final Set<String> correctChoiceIds;
  final bool multiSelect;
  final bool shuffleChoices;

  @override
  ProblemType get type => ProblemType.multipleChoice;
}

class Blank {
  const Blank({required this.id, required this.answer, this.maxLength});

  final String id;
  final AnswerRule answer;
  final int? maxLength;
}

class FillBlankBody extends ProblemBody {
  const FillBlankBody({required this.template, required this.blanks});

  final String template;
  final List<Blank> blanks;

  Blank blank(String id) => blanks.firstWhere((b) => b.id == id);

  @override
  ProblemType get type => ProblemType.fillBlank;
}

class DropSlot {
  const DropSlot({required this.id, required this.accept});

  final String id;
  final Set<String> accept;
}

class DragDropBody extends ProblemBody {
  const DragDropBody({
    required this.template,
    required this.tokens,
    required this.slots,
    this.reuseTokens = false,
  });

  final String template;
  final List<OptionItem> tokens;
  final List<DropSlot> slots;
  final bool reuseTokens;

  OptionItem token(String id) => tokens.firstWhere((t) => t.id == id);

  @override
  ProblemType get type => ProblemType.dragDrop;
}

class MatchingBody extends ProblemBody {
  const MatchingBody({
    required this.left,
    required this.right,
    required this.pairs,
    this.shuffleRight = true,
  });

  final List<OptionItem> left;
  final List<OptionItem> right;

  /// left id → right id
  final Map<String, String> pairs;
  final bool shuffleRight;

  @override
  ProblemType get type => ProblemType.matching;
}

// ---------------------------------------------------------------------------
// Lời giải
// ---------------------------------------------------------------------------

class Solution {
  const Solution({
    required this.access,
    required this.answerText,
    required this.steps,
    this.hint,
  });

  factory Solution.fromJson(JsonReader r) => Solution(
        access: _readAccess(r, 'access'),
        answerText: r.string('answerText'),
        hint: r.optString('hint'),
        steps: r.objects('steps', ContentBlock.fromJson, minItems: 1),
      );

  /// vip = các bước chi tiết chỉ mở cho VIP (đáp án cuối luôn hiện).
  final Access access;
  final String answerText;
  final String? hint;
  final List<ContentBlock> steps;
}

// ---------------------------------------------------------------------------
// Bài Toán
// ---------------------------------------------------------------------------

class Problem {
  const Problem({
    required this.id,
    required this.rev,
    required this.prompt,
    required this.level,
    required this.skillIds,
    required this.access,
    required this.solution,
    required this.body,
    this.instruction,
    this.estimatedSeconds,
    this.tags = const [],
    this.feedbackCorrect,
    this.feedbackIncorrect,
  });

  factory Problem.fromJson(JsonReader r) {
    final typeName = r.oneOf(
      'type',
      {for (final t in ProblemType.values) t.jsonName},
    );
    final type = ProblemType.fromJsonName(typeName);
    final instruction = r.optString('instruction');
    if (instruction != null && instruction.length > 40) {
      throw ContentFormatException(
        '${r.path}.instruction',
        'câu lệnh cho bé phải ngắn (≤ 40 ký tự)',
      );
    }
    final level = r.integer('level', min: 1, max: 3);
    final feedback = r.optObject('feedback');
    return Problem(
      id: r.string('id'),
      rev: r.integer('rev', min: 1),
      instruction: instruction,
      prompt: PromptContent.fromJson(r.object('prompt')),
      level: level,
      estimatedSeconds: r.optInteger('estimatedSeconds', min: 5, max: 900),
      skillIds: r.strings('skillIds', minItems: 1),
      tags: r.strings('tags', optional: true),
      access: _readAccess(r, 'access'),
      solution: Solution.fromJson(r.object('solution')),
      feedbackCorrect: feedback?.optString('correct'),
      feedbackIncorrect: feedback?.optString('incorrect'),
      body: switch (type) {
        ProblemType.multipleChoice => MultipleChoiceBody(
            choices: r.objects('choices', OptionItem.fromJson, minItems: 2),
            correctChoiceIds: r.strings('correctChoiceIds', minItems: 1).toSet(),
            multiSelect: r.boolean('multiSelect', defaultValue: false),
            shuffleChoices: r.boolean('shuffleChoices', defaultValue: true),
          ),
        ProblemType.fillBlank => FillBlankBody(
            template: r.string('template'),
            blanks: r.objects(
              'blanks',
              (b) => Blank(
                id: b.string('id'),
                answer: AnswerRule.fromJson(b.object('answer')),
                maxLength: b.optInteger('maxLength', min: 1, max: 7),
              ),
              minItems: 1,
            ),
          ),
        ProblemType.dragDrop => DragDropBody(
            template: r.string('template'),
            tokens: r.objects('tokens', OptionItem.fromJson, minItems: 1),
            slots: r.objects(
              'slots',
              (s) => DropSlot(
                id: s.string('id'),
                accept: s.strings('accept', minItems: 1).toSet(),
              ),
              minItems: 1,
            ),
            reuseTokens: r.boolean('reuseTokens', defaultValue: false),
          ),
        ProblemType.matching => MatchingBody(
            left: r.objects('left', OptionItem.fromJson, minItems: 2),
            right: r.objects('right', OptionItem.fromJson, minItems: 2),
            pairs: _readPairs(r),
            shuffleRight: r.boolean('shuffleRight', defaultValue: true),
          ),
      },
    );
  }

  static Map<String, String> _readPairs(JsonReader r) {
    final pairs = <String, String>{};
    final list = r.objects(
      'pairs',
      (p) => MapEntry(p.string('left'), p.string('right')),
      minItems: 2,
    );
    for (var i = 0; i < list.length; i++) {
      if (pairs.containsKey(list[i].key)) {
        throw ContentFormatException(
          '${r.path}.pairs[$i].left',
          '"${list[i].key}" bị nối hai lần',
        );
      }
      pairs[list[i].key] = list[i].value;
    }
    return pairs;
  }

  final String id;
  final int rev;
  final String? instruction;
  final PromptContent prompt;

  /// 1 = nhận biết, 2 = hiểu/kết nối, 3 = vận dụng.
  final int level;
  final int? estimatedSeconds;
  final List<String> skillIds;
  final List<String> tags;
  final Access access;
  final Solution solution;
  final ProblemBody body;
  final String? feedbackCorrect;
  final String? feedbackIncorrect;

  ProblemType get type => body.type;

  String get displayInstruction => instruction ?? type.defaultInstruction;
}
