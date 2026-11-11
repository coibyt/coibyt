import 'json_reader.dart';

/// Ảnh minh hoạ (asset trong app hoặc URL tải về sau).
class ContentImage {
  const ContentImage({required this.src, required this.alt, this.aspectRatio});

  factory ContentImage.fromJson(JsonReader r) =>
      ContentImage(src: r.string('src'), alt: r.string('alt'), aspectRatio: r.optDouble('aspectRatio'));

  final String src;
  final String alt;
  final double? aspectRatio;
}

/// Khối nội dung dùng chung cho Lý thuyết và Lời giải.
sealed class ContentBlock {
  const ContentBlock();

  static const kinds = {'text', 'equation', 'column_arithmetic', 'long_division', 'word_problem', 'image'};

  factory ContentBlock.fromJson(JsonReader r) {
    final kind = r.oneOf('kind', kinds);
    return switch (kind) {
      'text' => TextBlock.fromJson(r),
      'equation' => EquationBlock(text: r.string('text'), math: r.optString('math')),
      'column_arithmetic' => ColumnArithmeticBlock.fromJson(r),
      'long_division' => LongDivisionBlock.fromJson(r),
      'word_problem' => WordProblemBlock.fromJson(r),
      _ => ImageBlock(ContentImage.fromJson(r.object('image'))),
    };
  }
}

enum TextBlockStyle { normal, rule, tip }

class TextBlock extends ContentBlock {
  const TextBlock(this.text, {this.style = TextBlockStyle.normal});

  factory TextBlock.fromJson(JsonReader r) => TextBlock(
    r.string('text'),
    style: r.has('style')
        ? TextBlockStyle.values.byName(r.oneOf('style', {'normal', 'rule', 'tip'}))
        : TextBlockStyle.normal,
  );

  final String text;
  final TextBlockStyle style;
}

class EquationBlock extends ContentBlock {
  const EquationBlock({required this.text, this.math});

  final String text;
  final String? math;
}

enum ColumnOperation { add, subtract, multiply }

extension ColumnOperationSymbol on ColumnOperation {
  String get symbol => switch (this) {
    ColumnOperation.add => '+',
    ColumnOperation.subtract => '-',
    ColumnOperation.multiply => '×',
  };
}

/// Một lượt tính trong phép "đặt tính rồi tính".
class DigitStep {
  const DigitStep({required this.place, required this.text, required this.write, this.carry = 0});

  factory DigitStep.fromJson(JsonReader r) {
    final write = r.string('write');
    if (!RegExp(r'^[0-9]+$').hasMatch(write)) {
      throw ContentFormatException('${r.path}.write', 'chỉ được chứa chữ số');
    }
    return DigitStep(
      place: r.integer('place', min: 0),
      text: r.string('text'),
      write: write,
      carry: r.optInteger('carry', min: 0) ?? 0,
    );
  }

  /// 0 = hàng đơn vị, 1 = hàng chục, ...
  final int place;

  /// Lời đọc theo SGK, vd "6 cộng 8 bằng 14, viết 4 nhớ 1."
  final String text;

  /// Chữ số viết xuống (lượt cuối có thể là nhiều chữ số, vd "13").
  final String write;

  /// Số nhớ sang lượt sau.
  final int carry;
}

final _digitString = RegExp(r'^(0|[1-9][0-9]*)$');

String _readDigitString(JsonReader r, String key) {
  final s = r.string(key);
  if (!_digitString.hasMatch(s)) {
    throw ContentFormatException('${r.path}.$key', '"$s" phải là số tự nhiên viết bằng chữ số');
  }
  return s;
}

/// Đặt tính rồi tính: cộng, trừ, nhân với số có một chữ số.
class ColumnArithmeticBlock extends ContentBlock {
  const ColumnArithmeticBlock({
    required this.operation,
    required this.operands,
    required this.result,
    required this.digitSteps,
  });

  factory ColumnArithmeticBlock.fromJson(JsonReader r) {
    final operandsRaw = r.strings('operands', minItems: 2);
    for (var i = 0; i < operandsRaw.length; i++) {
      if (!_digitString.hasMatch(operandsRaw[i])) {
        throw ContentFormatException('${r.path}.operands[$i]', 'phải là số tự nhiên');
      }
    }
    return ColumnArithmeticBlock(
      operation: ColumnOperation.values.byName(r.oneOf('operation', {'add', 'subtract', 'multiply'})),
      operands: operandsRaw,
      result: _readDigitString(r, 'result'),
      digitSteps: r.objects('digitSteps', DigitStep.fromJson, minItems: 1),
    );
  }

  final ColumnOperation operation;
  final List<String> operands;
  final String result;
  final List<DigitStep> digitSteps;
}

/// Một lượt chia trong phép chia đặt tính.
class DivisionStep {
  const DivisionStep({
    required this.text,
    required this.partialDividend,
    required this.quotientDigit,
    required this.product,
    required this.remainder,
  });

  factory DivisionStep.fromJson(JsonReader r) => DivisionStep(
    text: r.string('text'),
    partialDividend: r.integer('partialDividend', min: 0),
    quotientDigit: r.integer('quotientDigit', min: 0, max: 9),
    product: r.integer('product', min: 0),
    remainder: r.integer('remainder', min: 0),
  );

  final String text;
  final int partialDividend;
  final int quotientDigit;
  final int product;
  final int remainder;
}

class LongDivisionBlock extends ContentBlock {
  const LongDivisionBlock({
    required this.dividend,
    required this.divisor,
    required this.quotient,
    required this.remainder,
    required this.digitSteps,
  });

  factory LongDivisionBlock.fromJson(JsonReader r) {
    final divisor = r.string('divisor');
    if (!RegExp(r'^[1-9]$').hasMatch(divisor)) {
      throw ContentFormatException('${r.path}.divisor', 'phải là số có một chữ số (1-9)');
    }
    return LongDivisionBlock(
      dividend: _readDigitString(r, 'dividend'),
      divisor: divisor,
      quotient: _readDigitString(r, 'quotient'),
      remainder: r.integer('remainder', min: 0),
      digitSteps: r.objects('digitSteps', DivisionStep.fromJson, minItems: 1),
    );
  }

  final String dividend;
  final String divisor;
  final String quotient;
  final int remainder;
  final List<DivisionStep> digitSteps;
}

class WordProblemLine {
  const WordProblemLine({required this.explanation, required this.equation});

  final String explanation;
  final String equation;
}

/// Trình bày "Bài giải" của bài toán có lời văn.
class WordProblemBlock extends ContentBlock {
  const WordProblemBlock({required this.lines, required this.answer});

  factory WordProblemBlock.fromJson(JsonReader r) {
    final answer = r.string('answer');
    if (!answer.startsWith('Đáp số: ')) {
      throw ContentFormatException('${r.path}.answer', 'phải bắt đầu bằng "Đáp số: "');
    }
    return WordProblemBlock(
      lines: r.objects(
        'lines',
        (l) => WordProblemLine(explanation: l.string('explanation'), equation: l.string('equation')),
        minItems: 1,
      ),
      answer: answer,
    );
  }

  final List<WordProblemLine> lines;
  final String answer;
}

class ImageBlock extends ContentBlock {
  const ImageBlock(this.image);

  final ContentImage image;
}
