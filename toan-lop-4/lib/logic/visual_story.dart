/// Câu chuyện minh hoạ bằng đồ vật cho một phép tính (Dart thuần — dùng chung cho giao diện
/// và tool/make_voice.dart để ghi âm sẵn lời cô thuyết minh).
library;

import 'show_lines.dart' show stableSeed;

/// Bộ đồ vật: món đồ + vật đựng (tên kèm loại từ tiếng Việt).
class AidTheme {
  const AidTheme(this.item, this.itemName, this.container, this.containerName);

  /// Mã ảnh (`assets/ui/obj_<item>.webp`, `ctr_<container>.webp`).
  final String item;
  final String itemName;
  final String container;
  final String containerName;
}

const aidThemes = [
  AidTheme('apple', 'quả táo', 'plate', 'đĩa'),
  AidTheme('orange', 'quả cam', 'basket', 'giỏ'),
  AidTheme('candy', 'viên kẹo', 'box', 'hộp'),
  AidTheme('pencil', 'chiếc bút chì', 'box', 'hộp'),
  AidTheme('cupcake', 'chiếc bánh', 'plate', 'đĩa'),
  AidTheme('flower', 'bông hoa', 'vase', 'lọ'),
];

/// Một câu cô nói + nhóm (vật đựng) nào đang sáng: null = sáng hết, k = sáng nhóm 0..k.
typedef StoryLine = (String text, int? lit);

class AidStory {
  const AidStory({
    required this.kind,
    required this.a,
    required this.b,
    required this.c,
    required this.theme,
    required this.lines,
  });

  /// mul | div | add | sub | place
  final String kind;
  final int a;
  final int b;
  final int c;
  final AidTheme theme;
  final List<StoryLine> lines;

  /// Số nhóm (vật đựng) trong tranh.
  int get groups => switch (kind) {
    'mul' || 'div' => b,
    'add' => 2,
    _ => 1,
  };

  /// Số đồ vật trong nhóm [g].
  int itemsIn(int g) => switch (kind) {
    'mul' => a,
    'div' => c,
    'add' => g == 0 ? a : b,
    'sub' => a,
    _ => 0,
  };

  /// Chú thích dưới tranh.
  String get caption => switch (kind) {
    'mul' =>
      '$b ${theme.containerName}, mỗi ${theme.containerName} $a ${theme.itemName}: $a được lấy $b lần, tất cả có $c ${theme.itemName}.',
    'div' =>
      '$a ${theme.itemName} chia đều vào $b ${theme.containerName}, mỗi ${theme.containerName} được $c ${theme.itemName}.',
    'add' => 'Có $a ${theme.itemName}, thêm $b ${theme.itemName}, tất cả có $c ${theme.itemName}.',
    'sub' => 'Có $a ${theme.itemName}, bớt đi $b ${theme.itemName}, còn lại $c ${theme.itemName}.',
    _ => placeCaption(c),
  };
}

final _re = RegExp(r'^\s*([\d.]+)\s*([+\-−×x*:÷])\s*([\d.]+)\s*=\s*([\d.]+)\s*$');

/// Câu chuyện cho "a op b = c"; null nếu không vẽ được (biểu thức dài, số quá lớn…).
AidStory? aidStory(String equation) {
  final m = _re.firstMatch(equation);
  if (m == null) return null;
  int n(String s) => int.parse(s.replaceAll('.', ''));
  final (a, b, c) = (n(m[1]!), n(m[3]!), n(m[4]!));
  final op = m[2]!;
  final t = aidThemes[stableSeed(equation) % aidThemes.length];
  final item = t.itemName, box = t.containerName;
  if ((op == '×' || op == 'x' || op == '*') && a >= 1 && b >= 1 && a <= 10 && b <= 10 && a * b <= 60) {
    return AidStory(
      kind: 'mul',
      a: a,
      b: b,
      c: c,
      theme: t,
      lines: [
        ('Con nhìn tranh nhé: có $b $box, mỗi $box có $a $item.', null),
        ('Mình đếm thêm $a nhé.', -1),
        for (var k = 0; k < b; k++) ('${a * (k + 1)}', k),
        ('Vậy $a nhân $b bằng $c.', null),
      ],
    );
  }
  if ((op == ':' || op == '÷') && b >= 1 && b <= 10 && a <= 60 && c * b == a) {
    return AidStory(
      kind: 'div',
      a: a,
      b: b,
      c: c,
      theme: t,
      lines: [
        ('Con nhìn tranh nhé: có $a $item chia đều vào $b $box.', null),
        ('Mỗi $box được mấy $item? Mình đếm trên một $box nhé.', 0),
        ('Mỗi $box được $c $item.', 0),
        ('Vậy $a chia $b bằng $c.', null),
      ],
    );
  }
  if (op == '+' && a + b <= 20) {
    return AidStory(
      kind: 'add',
      a: a,
      b: b,
      c: c,
      theme: t,
      lines: [
        ('Con nhìn tranh nhé: bên này có $a $item.', 0),
        ('Bên kia có $b $item.', 1),
        ('Gộp lại được $c $item. Vậy $a cộng $b bằng $c.', null),
      ],
    );
  }
  if ((op == '-' || op == '−') && a <= 20 && b <= a) {
    return AidStory(
      kind: 'sub',
      a: a,
      b: b,
      c: c,
      theme: t,
      lines: [
        ('Con nhìn tranh nhé: có $a $item.', null),
        ('Cô bớt đi $b $item, cô gạch đi đây.', null),
        ('Còn lại $c $item. Vậy $a trừ $b bằng $c.', null),
      ],
    );
  }
  if (c > 0 && c < 10000) {
    return AidStory(kind: 'place', a: a, b: b, c: c, theme: t, lines: [('${placeCaption(c)}.', null)]);
  }
  return null;
}

/// "Kết quả gồm 3 trăm, 2 chục, 4 đơn vị"
String placeCaption(int v) {
  final t = v ~/ 1000, h = v ~/ 100 % 10, d = v ~/ 10 % 10, u = v % 10;
  return 'Số $v gồm ${[if (t > 0) '$t nghìn', if (t > 0 || h > 0) '$h trăm', if (t > 0 || h > 0 || d > 0) '$d chục', '$u đơn vị'].join(', ')}';
}
