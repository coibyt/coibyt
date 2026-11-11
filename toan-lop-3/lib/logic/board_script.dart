/// Kịch bản "video bài giảng" trên bảng: chia bài thành từng phần vừa một bảng,
/// cô viết – vẽ – hỏi, hết phần thì xoá bảng rồi giảng tiếp (Dart thuần).
library;

import '../models/blocks.dart';
import '../models/problem.dart';
import 'demo_script.dart';
import 'real_examples.dart';
import 'tips.dart';
import 'tutor.dart';
import 'visual_story.dart';

/// Một phần bài giảng = một lần viết kín bảng.
class BoardSection {
  const BoardSection({this.blocks = const [], this.example, this.tips = false, this.diagram});

  /// Các khối nội dung viết trên bảng ở phần này.
  final List<int> blocks;

  /// Phần dán tranh ví dụ trong cuộc sống.
  final int? example;

  /// Phần "Ghi nhớ" (bí quyết & mẹo).
  final bool tips;

  /// Hình cô vẽ ở phần này (xem [boardDiagramFor]).
  final String? diagram;
}

class BoardScript {
  const BoardScript({required this.scenes, required this.sections, required this.sectionOf});

  final List<DemoScene> scenes;
  final List<BoardSection> sections;

  /// Cảnh i đang ở phần nào của bảng (-1 = mới ghi đầu bài).
  final List<int> sectionOf;
}

/// Câu cô nói khi xoá bảng (luân phiên cho đỡ lặp).
const boardEraseLines = [
  'Xong phần này rồi! Cô xoá bảng để mình học tiếp nhé.',
  'Con nhớ phần vừa rồi chưa? Giờ cô xoá bảng và giảng tiếp nhé.',
  'Cô lau bảng một chút, mình sang phần tiếp theo nhé.',
];

const boardStart = 'Cô ghi ngày và tên bài lên bảng nhé. Con ngồi ngay ngắn và nhìn lên bảng nào!';
const boardExampleLead = 'Cô dán lên bảng một bức tranh trong cuộc sống, con nhìn chỗ cô chỉ nhé.';
const boardTipsLead = 'Cuối cùng, cô ghi lại những điều cần nhớ lên bảng nhé.';

/// Hình vẽ theo bài (mã bài → loại hình) và lời cô nói khi vẽ.
const boardDiagramLines = <String, List<String>>{
  'midpoint': [
    'Cô vẽ đoạn thẳng A B. Điểm M nằm ở giữa và chia đoạn thẳng thành hai phần dài bằng nhau.',
    'Vậy M là trung điểm của đoạn thẳng A B.',
  ],
  'circle': [
    'Cô vẽ một hình tròn, tâm O ở chính giữa.',
    'Đoạn O A màu vàng là bán kính. Đoạn C D màu hồng đi qua tâm là đường kính, dài gấp đôi bán kính.',
  ],
  'angle': [
    'Cô vẽ hai góc. Góc bên trái có dấu ô vuông nhỏ, đó là góc vuông.',
    'Góc bên phải không vuông. Con dùng ê ke để kiểm tra góc vuông nhé.',
  ],
  'shapes': [
    'Cô vẽ hình tam giác có 3 cạnh, hình tứ giác có 4 cạnh.',
    'Hình chữ nhật có 4 góc vuông, hai cạnh dài bằng nhau, hai cạnh ngắn bằng nhau. Hình vuông có 4 cạnh bằng nhau.',
  ],
  'draw': [
    'Cô vẽ góc vuông bằng ê ke, vẽ đường tròn bằng com pa.',
    'Rồi cô vẽ hình vuông và hình chữ nhật trên lưới ô vuông nhé.',
  ],
  'solids': [
    'Cô vẽ khối lập phương: 6 mặt đều là hình vuông bằng nhau.',
    'Còn khối hộp chữ nhật có 6 mặt là hình chữ nhật, giống như cái hộp bánh.',
  ],
  'fraction': [
    'Cô vẽ một hình tròn rồi chia thành 4 phần bằng nhau.',
    'Cô tô màu 1 phần. Phần tô màu là một phần tư hình tròn.',
  ],
  'ruler': [
    'Cô vẽ cái thước. Mỗi vạch dài là 1 xăng-ti-mét.',
    'Giữa hai vạch dài có 10 vạch nhỏ, mỗi vạch nhỏ là 1 mi-li-mét. 1 cm = 10 mm.',
  ],
  'balance': [
    'Cô vẽ cái cân đĩa. Hai bên cân thăng bằng thì hai bên nặng bằng nhau.',
    'Gam là đơn vị đo khối lượng nhỏ. 1 kg = 1000 g.',
  ],
  'jug': ['Cô vẽ cái ca đong có vạch chia.', 'Mi-li-lít là đơn vị đo dung tích nhỏ. 1 l = 1000 ml.'],
  'thermo': [
    'Cô vẽ cái nhiệt kế. Cột màu đỏ dâng lên cao là trời nóng, hạ xuống thấp là trời lạnh.',
    'Đơn vị đo nhiệt độ là độ C.',
  ],
  'perimeter': [
    'Cô vẽ hình chữ nhật có chiều dài 5 cm, chiều rộng 3 cm.',
    'Chu vi là tổng độ dài các cạnh: 5 + 3 + 5 + 3 = 16 cm.',
  ],
  'area': [
    'Cô vẽ các ô vuông nhỏ, mỗi ô có cạnh 1 cm, diện tích là 1 xăng-ti-mét vuông.',
    'Hình cô tô màu gồm 6 ô vuông, diện tích là 6 cm vuông.',
  ],
  'areaRect': [
    'Cô vẽ hình chữ nhật dài 4 cm, rộng 3 cm, chia thành các ô vuông 1 cm vuông.',
    'Có 3 hàng, mỗi hàng 4 ô: 4 × 3 = 12 cm vuông. Diện tích bằng chiều dài nhân chiều rộng.',
  ],
  'place4': [
    'Cô kẻ bảng hàng nghìn, hàng trăm, hàng chục, hàng đơn vị.',
    'Số 3 452 gồm 3 nghìn, 4 trăm, 5 chục và 2 đơn vị.',
  ],
  'place5': ['Cô kẻ bảng có thêm hàng chục nghìn.', 'Số 23 456 gồm 2 chục nghìn, 3 nghìn, 4 trăm, 5 chục và 6 đơn vị.'],
  'numberLine': [
    'Cô vẽ tia số từ 40 đến 50. Số 43 gần 40 hơn gần 50.',
    'Vậy làm tròn số 43 đến hàng chục, ta được 40.',
  ],
  'clock': [
    'Cô vẽ mặt đồng hồ. Kim ngắn chỉ giờ, kim dài chỉ phút.',
    'Kim ngắn chỉ số 8, kim dài chỉ số 3: đồng hồ chỉ 8 giờ 15 phút.',
  ],
  'tally': [
    'Cô ghi số liệu bằng các vạch. Cứ 4 vạch đứng thì vạch thứ năm gạch chéo.',
    'Đếm theo nhóm 5 cho nhanh: 5, 10, 12. Có 12 bạn chọn.',
  ],
  'segments': ['Cô vẽ sơ đồ đoạn thẳng. Đoạn trên dài 2 cm.', 'Đoạn dưới gấp 3 lần đoạn trên: 2 × 3 = 6 cm.'],
  'segmentsDown': [
    'Cô vẽ sơ đồ đoạn thẳng. Đoạn trên dài 12 cm.',
    'Giảm đoạn trên đi 3 lần thì được đoạn dưới: 12 : 3 = 4 cm.',
  ],
  'remainder': [
    'Cô có 14 chấm, chia vào mỗi nhóm 5 chấm.',
    'Được 2 nhóm, còn thừa 4 chấm: 14 : 5 = 2 dư 4. Số dư luôn bé hơn số chia.',
  ],
  'roman': [
    'Cô viết ba chữ số La Mã cơ bản: I là 1, V là 5, X là 10.',
    'Ghép lại: II là 2, IV là 4, VI là 6, IX là 9.',
  ],
};

/// Bài nào cô vẽ hình gì (theo đuôi mã bài).
String? boardDiagramFor(String lessonId) {
  final s = lessonId.split('.').last;
  const byId = {
    'diem-o-giua-trung-diem': 'midpoint',
    'hinh-tron-tam-ban-kinh-duong-kinh': 'circle',
    'goc-goc-vuong-goc-khong-vuong': 'angle',
    'hinh-tam-giac-tu-giac-chu-nhat-vuong': 'shapes',
    'thuc-hanh-ve-goc-vuong-duong-tron': 'draw',
    'khoi-lap-phuong-khoi-hop-chu-nhat': 'solids',
    'mot-phan-may': 'fraction',
    'mi-li-met': 'ruler',
    'gam': 'balance',
    'mi-li-lit': 'jug',
    'nhiet-do-don-vi-do-nhiet-do': 'thermo',
    'chu-vi-tam-giac-tu-giac-chu-nhat-vuong': 'perimeter',
    'dien-tich-cua-mot-hinh-xang-ti-met-vuong': 'area',
    'dien-tich-hinh-chu-nhat-hinh-vuong': 'areaRect',
    'cac-so-co-bon-chu-so-so-10000': 'place4',
    'cac-so-co-nam-chu-so-so-100000': 'place5',
    'lam-tron-so-den-hang-chuc-hang-tram': 'numberLine',
    'xem-dong-ho-thang-nam': 'clock',
    'thuc-hanh-xem-dong-ho-xem-lich': 'clock',
    'thu-thap-phan-loai-ghi-chep-so-lieu': 'tally',
    'gap-mot-so-len-mot-so-lan': 'segments',
    'so-sanh-so-lon-gap-may-lan-so-be': 'segments',
    'giam-mot-so-di-mot-so-lan': 'segmentsDown',
    'phep-chia-het-phep-chia-co-du': 'remainder',
    'lam-quen-voi-chu-so-la-ma': 'roman',
  };
  if (lessonId.contains('.c7.on-tap-hinh-hoc') || lessonId.contains('.c16.on-tap-hinh-hoc')) return 'perimeter';
  if (lessonId.contains('.c1.on-tap-hinh-hoc')) return 'shapes';
  return byId[s];
}

/// Phép tính có vẽ đồ vật (vòng tròn + chấm) trên bảng không.
bool boardDrawsObjects(String equation) {
  final s = aidStory(equation);
  return s != null && s.kind != 'place' && s.groups * (s.kind == 'div' ? s.c : s.a) <= 40;
}

/// Ước lượng chỗ trên bảng (đơn vị ≈ một dòng chữ).
double _weight(ContentBlock b) => switch (b) {
  TextBlock(:final text) => (text.length / 30).ceilToDouble(),
  EquationBlock(:final text) => boardDrawsObjects(text) ? 5 : 1.5,
  ColumnArithmeticBlock() => 6,
  LongDivisionBlock(:final digitSteps) => 3.0 + digitSteps.length,
  WordProblemBlock(:final lines) => 1.0 + lines.fold<double>(0, (s, l) => s + (l.explanation.length / 30).ceil() + 1),
  ImageBlock() => 0,
};

/// Sức chứa một bảng.
const boardCapacity = 9.0;

BoardScript buildBoardScript(
  List<ContentBlock> blocks, {
  required String lessonId,
  List<Tip> tips = const [],
  List<Problem> problems = const [],
  List<RealExample> examples = const [],
  List<String> outro = const [TutorLines.classDone],
  List<String> intro = const [boardStart],
  bool checks = true,
  int maxQuizzes = 3,
}) {
  // 1) Chia khối thành từng bảng.
  final diagram = boardDiagramFor(lessonId);
  final sections = <BoardSection>[];
  final blockSection = <int, int>{};
  var cur = <int>[];
  var used = 0.0;
  var diagramPlaced = diagram == null;
  void close() {
    if (cur.isEmpty) return;
    final withDiagram = !diagramPlaced;
    diagramPlaced = true;
    sections.add(BoardSection(blocks: cur, diagram: withDiagram ? diagram : null));
    cur = [];
    used = 0;
  }

  for (final (i, b) in blocks.indexed) {
    if (b is ImageBlock) continue;
    // Hình vẽ ở bảng đầu tiên, chiếm chỗ ~5 dòng.
    final extra = !diagramPlaced && sections.isEmpty && cur.isEmpty ? 5.0 : 0.0;
    final w = _weight(b) + extra;
    if (cur.isNotEmpty && used + w > boardCapacity) close();
    cur.add(i);
    blockSection[i] = sections.length;
    used += w;
  }
  close();
  final exampleSection = <int, int>{};
  for (var e = 0; e < examples.length; e++) {
    exampleSection[e] = sections.length;
    sections.add(BoardSection(example: e));
  }
  final tipsSection = tips.isEmpty ? null : sections.length;
  if (tipsSection != null) sections.add(const BoardSection(tips: true));

  // 2) Kịch bản cô giảng (dùng chung với "Nhớ nhanh"), thêm cảnh vẽ hình và xoá bảng.
  final base = buildDemoScript(
    blocks,
    intro: intro,
    tips: tips,
    outro: outro,
    problems: problems,
    examples: examples,
    checks: checks,
    maxQuizzes: maxQuizzes,
  );
  // Ví dụ trong cuộc sống: bảng dùng xen sau phần lý thuyết → đưa ví dụ 0 ra sau các khối.
  final ex0 = [
    for (final s in base)
      if (s.example == 0) s,
  ];
  final reordered = [
    for (final s in base)
      if (s.example != 0) s,
  ];
  if (ex0.isNotEmpty) {
    final at = reordered.indexWhere((s) => s.example != null || s.tip != null || s.check || s.quiz?.survey == true);
    final lead = DemoScene(say: [boardExampleLead, ...ex0.first.say.skip(1)], example: 0, pointAt: ex0.first.pointAt);
    reordered.insertAll(at < 0 ? reordered.length : at, [lead, ...ex0.skip(1)]);
  }

  int? target(DemoScene s) {
    if (s.block != null) return blockSection[s.block!];
    if (s.example != null) return exampleSection[s.example!];
    if (s.tip != null) return tipsSection;
    return null;
  }

  final scenes = <DemoScene>[];
  final sectionOf = <int>[];
  var section = -1;
  var erases = 0;
  for (final s in reordered) {
    final t = target(s);
    if (t != null && t != section) {
      if (section >= 0) {
        scenes.add(DemoScene(say: [boardEraseLines[erases++ % boardEraseLines.length]], erase: true));
        sectionOf.add(section);
      }
      section = t;
      if (s.tip != null) {
        scenes.add(const DemoScene(say: [boardTipsLead]));
        sectionOf.add(section);
      }
    }
    scenes.add(s);
    sectionOf.add(section);
    // Vẽ hình ngay sau khối đầu tiên của bảng có hình.
    final d = section >= 0 ? sections[section].diagram : null;
    if (d != null && s.block != null && s.block == sections[section].blocks.first && s.quiz == null) {
      scenes.add(DemoScene(say: boardDiagramLines[d]!, draw: true, block: s.block));
      sectionOf.add(section);
    }
  }
  return BoardScript(scenes: scenes, sections: sections, sectionOf: sectionOf);
}

/// Mọi câu cố định của video bài giảng (để ghi âm sẵn).
List<String> boardFixedLines() => [
  boardStart,
  boardTipsLead,
  boardExampleLead,
  ...boardEraseLines,
  for (final l in boardDiagramLines.values) ...l,
];
