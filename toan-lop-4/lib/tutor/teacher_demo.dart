import 'dart:async';

import 'package:flutter/foundation.dart';

import '../logic/real_examples.dart';
import '../logic/demo_script.dart';
import '../logic/tutor.dart';
import '../logic/visual_story.dart';
import '../models/blocks.dart';
import 'teacher_avatar.dart';
import 'teacher_controller.dart';

export '../logic/demo_script.dart';
export '../logic/real_examples.dart';
export '../logic/visual_story.dart';

TeacherMood _mood(DemoMood m) => switch (m) {
  DemoMood.idle => TeacherMood.idle,
  DemoMood.point => TeacherMood.point,
  DemoMood.clap => TeacherMood.clap,
};

/// Điều khiển phần cô làm mẫu: tự chạy từ đầu tới cuối một lần, tạm dừng, nghe lại, xem hết.
class DemoPlayer extends ChangeNotifier {
  DemoPlayer({required this.scenes, required this.teacher, required List<ContentBlock> blocks, this.remedy}) {
    for (final (i, b) in blocks.indexed) {
      if (b is ColumnArithmeticBlock || b is LongDivisionBlock) drivers[i] = ValueNotifier(0);
    }
    _totals = {
      for (final (i, b) in blocks.indexed)
        if (b is ColumnArithmeticBlock) i: b.digitSteps.length else if (b is LongDivisionBlock) i: b.digitSteps.length,
    };
  }

  final List<DemoScene> scenes;
  final TeacherController teacher;

  /// Tranh sửa sai của bài (theo dạng toán) — dùng khi bé trả lời sai mà phép tính không vẽ được bằng đồ vật.
  final RealExample? remedy;

  bool _remedyOn = false;
  PointAt? _remedyAt;

  /// Cô đang giảng bằng tranh sửa sai.
  bool get showingRemedy => _remedyOn;

  /// Chỗ que chỉ của cô trên tranh sửa sai.
  PointAt? get remedyAt => _remedyAt;

  /// Bước hiện tại của từng khối đặt tính (cô điều khiển).
  final drivers = <int, ValueNotifier<int>>{};
  late final Map<int, int> _totals;

  /// Khoảng nghỉ giữa hai cảnh (để bé kịp nhìn).
  static const gap = Duration(milliseconds: 450);

  int _index = -1;

  /// Câu hỏi nhanh: cảnh → đáp án bé đã chọn.
  final _answered = <int, int>{};
  Completer<int>? _waiting;

  /// Đang chờ bé trả lời câu hỏi của cảnh hiện tại.
  bool get waitingAnswer => _waiting != null;

  /// Đáp án bé đã chọn cho cảnh [scene] (null = chưa trả lời).
  int? answerOf(int scene) => _answered[scene];

  /// (đúng, đã trả lời, tổng số câu hỏi).
  (int, int, int) get quizScore {
    final right = _results.values.where((v) => v).length;
    return (right, _results.length, scenes.where((s) => s.quiz != null && !s.quiz!.survey).length);
  }

  /// Khối [block] có câu hỏi nhanh chưa trả lời (→ che kết quả của phép tính mẫu).
  bool quizPendingFor(int block) {
    if (_done) return false;
    for (final (i, s) in scenes.indexed) {
      if (s.quiz != null && s.block == block && !_answered.containsKey(i)) return true;
    }
    return false;
  }

  // ---- Câu hỏi đang hỏi (có thể là bản dễ hơn khi bé sai) ----
  DemoQuiz? _activeQuiz;
  int? _picked;
  final _results = <int, bool>{};
  AidStory? _story;
  int? _lit;
  Timer? _encourage;

  /// Câu hỏi đang hiện trên màn hình.
  DemoQuiz? get activeQuiz => _activeQuiz;

  /// Đáp án bé vừa chọn cho [activeQuiz] (null = chưa chọn).
  int? get picked => _picked;

  /// Tranh cô đang thuyết minh khi bé trả lời sai (null = không thuyết minh).
  AidStory? get story => _story;

  /// Nhóm đồ vật đang sáng trong lúc cô đếm.
  int? get lit => _lit;

  /// Hỏi [q] và chờ bé chọn; null nếu bị dừng/huỷ. Bé nghĩ lâu thì cô động viên.
  Future<int?> _ask(int token, DemoQuiz q) async {
    _activeQuiz = q;
    _picked = null;
    _waiting = Completer<int>();
    notifyListeners();
    var nudges = 0;
    _encourage?.cancel();
    _encourage = Timer.periodic(const Duration(seconds: 12), (_) {
      if (_waiting == null || teacher.speaking || nudges >= TutorLines.encourage.length) return;
      teacher.say([TutorLines.encourage[nudges++]], mood: TeacherMood.idle);
    });
    final pick = await _waiting!.future;
    _encourage?.cancel();
    _waiting = null;
    if (token != _token || _disposed || pick < 0) return null;
    _picked = pick;
    notifyListeners();
    return pick;
  }

  /// Bé chọn đáp án [choice] cho câu cô đang hỏi.
  void answer(int choice) {
    final w = _waiting;
    if (w != null && !w.isCompleted) w.complete(choice);
  }

  bool _playing = false;
  bool _done = false;
  int _token = 0;
  bool _disposed = false;

  /// Cảnh đang giảng (-1 = chưa bắt đầu).
  int get index => _index;
  bool get playing => _playing;
  bool get done => _done;
  DemoScene? get current => _index >= 0 && _index < scenes.length ? scenes[_index] : null;
  double get progress => scenes.isEmpty ? 1 : (_done ? 1 : (_index + 1).clamp(0, scenes.length) / scenes.length);

  /// Khối đang được giảng (để tô sáng, cuộn tới).
  int? get activeBlock => _done ? null : current?.block;

  /// Mẹo đã đọc tới (để hiện thẻ mẹo).
  int get tipsShown {
    if (_done) return scenes.where((s) => s.tip != null).length;
    var n = 0;
    for (var i = 0; i <= _index && i < scenes.length; i++) {
      if (scenes[i].tip != null) n = scenes[i].tip! + 1;
    }
    return n;
  }

  /// Ví dụ [e] đã được giảng tới chưa.
  bool exampleReached(int e) {
    if (_done) return true;
    for (var i = 0; i <= _index && i < scenes.length; i++) {
      final x = scenes[i].example;
      if (x != null && x >= e) return true;
    }
    return false;
  }

  /// Khối [block] đã được giảng tới chưa (khối chưa tới thì làm mờ).
  bool reached(int block) {
    if (_done) return true;
    for (var i = 0; i <= _index && i < scenes.length; i++) {
      final b = scenes[i].block;
      if (b != null && b >= block) return true;
    }
    return false;
  }

  void play() {
    if (_playing || _disposed) return;
    if (_done) return restart();
    _playing = true;
    notifyListeners();
    unawaited(_run(++_token, _index < 0 ? 0 : _index));
  }

  Future<void> _run(int token, int from) async {
    for (var i = from; i < scenes.length; i++) {
      if (token != _token || _disposed) return;
      _index = i;
      final s = scenes[i];
      if (s.block != null && s.step != null) drivers[s.block!]?.value = s.step!;
      notifyListeners();
      await teacher.say(s.say, mood: _mood(s.mood));
      if (token != _token || _disposed) return;
      if (s.summary) {
        final checks = [
          for (final (k, sc) in scenes.indexed)
            if (sc.check) _results[k] ?? false,
        ];
        await teacher.say([
          checks.every((v) => v) ? TutorLines.checkPassed : TutorLines.checkTried,
        ], mood: TeacherMood.clap);
        if (token != _token || _disposed) return;
      }
      final q = s.quiz;
      if (q != null && !_answered.containsKey(i)) {
        final pick = await _ask(token, q);
        if (pick == null) return;
        _answered[i] = pick;
        if (q.survey) {
          // Con đã hiểu bài chưa? → hỏi kiểm tra; "giảng lại" → quay về đầu bài.
          _activeQuiz = null;
          notifyListeners();
          if (pick == 2) {
            await teacher.say(const [TutorLines.understandAgain], mood: TeacherMood.idle);
            if (token != _token || _disposed) return;
            restart();
            return;
          }
          await teacher.say([
            pick == 0 ? TutorLines.understandYes : TutorLines.understandUnsure,
          ], mood: TeacherMood.clap);
          if (token != _token || _disposed) return;
        } else {
          final ok = pick == q.correct;
          _results[i] = ok;
          notifyListeners();
          if (ok) {
            await teacher.say([
              TutorLines.quizRight[i % TutorLines.quizRight.length],
              ...q.followUp, // dẫn dắt sang nội dung bài
            ], mood: TeacherMood.clap);
          } else {
            // Sai: cô thuyết minh tranh đồ vật (từng nhóm sáng lên), rồi hỏi lại câu dễ hơn.
            final story = aidStory(q.aid ?? '');
            final picture = story == null ? remedy : null;
            await teacher.say([
              TutorLines.quizWrong,
              if (story != null || picture != null) TutorLines.remedyLook,
            ], mood: TeacherMood.think);
            if (token != _token || _disposed) return;
            if (picture != null) {
              _remedyOn = true;
              for (final (text, at) in picture.lines) {
                _remedyAt = at;
                notifyListeners();
                await teacher.say([text], mood: TeacherMood.point);
                if (token != _token || _disposed) return;
              }
              _remedyAt = null;
              notifyListeners();
            }
            if (story != null) {
              _story = story;
              for (final (text, lit) in story.lines) {
                _lit = lit;
                notifyListeners();
                await teacher.say([text], mood: TeacherMood.point);
                if (token != _token || _disposed) return;
              }
              _lit = null;
            }
            final easy = q.easier;
            await teacher.say([TutorLines.remedyRetry, easy.question, ...easy.optionLines], mood: TeacherMood.idle);
            if (token != _token || _disposed) return;
            final again = await _ask(token, easy);
            if (again == null) return;
            final ok2 = again == easy.correct;
            await teacher.say([
              if (ok2)
                TutorLines.quizRight[(i + 1) % TutorLines.quizRight.length]
              else ...[
                TutorLines.remedyReveal,
                q.reveal,
              ],
              ...q.followUp,
            ], mood: ok2 ? TeacherMood.clap : TeacherMood.idle);
            _story = null;
            _remedyOn = false;
          }
          if (token != _token || _disposed) return;
        }
        _activeQuiz = null;
        _picked = null;
        notifyListeners();
      }
      await Future<void>.delayed(gap);
    }
    if (token != _token || _disposed) return;
    _playing = false;
    _done = true;
    notifyListeners();
  }

  void _cancelWait() {
    _encourage?.cancel();
    _activeQuiz = null;
    _picked = null;
    _story = null;
    _lit = null;
    _remedyOn = false;
    _remedyAt = null;
    final w = _waiting;
    _waiting = null;
    if (w != null && !w.isCompleted) w.complete(-1);
  }

  void pause() {
    if (!_playing) return;
    _token++;
    _cancelWait();
    _playing = false;
    teacher.clear();
    notifyListeners();
  }

  void restart() {
    _token++;
    _cancelWait();
    _answered.clear();
    _results.clear();
    teacher.clear();
    for (final d in drivers.values) {
      d.value = 0;
    }
    _index = -1;
    _done = false;
    _playing = false;
    play();
  }

  /// Xem hết ngay: hiện toàn bộ các bước, không nói nữa.
  void skipToEnd() {
    _token++;
    _cancelWait();
    teacher.clear();
    for (final e in drivers.entries) {
      e.value.value = _totals[e.key] ?? 0;
    }
    _playing = false;
    _done = true;
    notifyListeners();
  }

  @override
  void dispose() {
    _disposed = true;
    _token++;
    _cancelWait();
    for (final d in drivers.values) {
      d.dispose();
    }
    super.dispose();
  }
}
