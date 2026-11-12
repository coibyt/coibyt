import 'package:flutter/material.dart';

/// Phân số viết liền trong nội dung: "3/4" (không đứng sau/trước chữ số hoặc dấu chấm phân nhóm).
final fractionPattern = RegExp(r'(?<![\d.])(\d+)/(\d+)(?![\d])');

/// Có phân số "a/b" trong câu không.
bool hasFraction(String text) => fractionPattern.hasMatch(text);

/// Phân số chồng: tử số trên, gạch ngang, mẫu số dưới — như SGK.
class FractionView extends StatelessWidget {
  const FractionView({super.key, required this.numerator, required this.denominator, this.style});

  final Widget numerator;
  final Widget denominator;
  final TextStyle? style;

  factory FractionView.text(String n, String d, {Key? key, TextStyle? style}) {
    final base = style ?? const TextStyle();
    final size = (base.fontSize ?? 20) * 0.8;
    final st = base.copyWith(fontSize: size, height: 1.05);
    return FractionView(
      key: key,
      style: style,
      numerator: Text(n, style: st, textScaler: TextScaler.noScaling),
      denominator: Text(d, style: st, textScaler: TextScaler.noScaling),
    );
  }

  @override
  Widget build(BuildContext context) {
    final color = style?.color ?? DefaultTextStyle.of(context).style.color ?? Colors.black;
    final thick = ((style?.fontSize ?? 20) / 12).clamp(1.5, 3.5);
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 3),
      child: IntrinsicWidth(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Center(child: numerator),
            Container(height: thick.toDouble(), margin: const EdgeInsets.symmetric(vertical: 1.5), color: color),
            Center(child: denominator),
          ],
        ),
      ),
    );
  }
}

/// Chữ có thể chứa phân số: phân số được vẽ chồng (tử/mẫu), phần còn lại là chữ thường.
class MathText extends StatelessWidget {
  const MathText(this.text, {super.key, this.style, this.textAlign, this.maxLines, this.overflow});

  final String text;
  final TextStyle? style;
  final TextAlign? textAlign;
  final int? maxLines;
  final TextOverflow? overflow;

  @override
  Widget build(BuildContext context) {
    if (!hasFraction(text)) {
      return Text(text, style: style, textAlign: textAlign, maxLines: maxLines, overflow: overflow);
    }
    final effective = DefaultTextStyle.of(context).style.merge(style);
    final spans = <InlineSpan>[];
    var last = 0;
    for (final m in fractionPattern.allMatches(text)) {
      if (m.start > last) spans.add(TextSpan(text: text.substring(last, m.start)));
      spans.add(
        WidgetSpan(
          alignment: PlaceholderAlignment.middle,
          child: FractionView.text(m[1]!, m[2]!, style: effective),
        ),
      );
      last = m.end;
    }
    if (last < text.length) spans.add(TextSpan(text: text.substring(last)));
    return Text.rich(
      TextSpan(children: spans),
      style: style,
      textAlign: textAlign,
      maxLines: maxLines,
      overflow: overflow,
      semanticsLabel: text,
    );
  }
}
