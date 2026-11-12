// Rà mọi câu cô Mai / MC nói: sau khi đổi sang lời đọc (spokenVietnamese) có còn ký hiệu toán không?
//   dart run tool/audit_spoken.dart
// ignore_for_file: avoid_print
import 'package:toan_lop_4/logic/spoken_vi.dart';

import 'make_voice.dart' as mv;

void main() {
  final bad = RegExp(r'[+×÷<>=□≈→*/\[\]]|\s[-−:]\s|\d\s*[-−–]\s*\d|\?(?=\s*[a-zà-ỹđ\d(.,;)])|\d:\s*\d', unicode: true);
  final hits = <String, String>{};
  for (final (key, _) in mv.allLines()) {
    final text = mv.bare(key);
    final spoken = spokenVietnamese(text);
    if (bad.hasMatch(spoken)) hits[text] = spoken;
  }
  print('Câu còn ký hiệu: ${hits.length}');
  for (final e in hits.entries.take(int.parse(const String.fromEnvironment('N', defaultValue: '60')))) {
    print('• ${e.key}\n    → ${e.value}');
  }
}
