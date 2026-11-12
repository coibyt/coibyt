import 'dart:math';

import 'package:flutter/material.dart';

import '../../logic/answer_checker.dart';
import '../../models/problem.dart';
import '../app_theme.dart';
import 'math_text.dart';
import 'number_pad.dart';

/// Tham số chung cho mọi khu vực trả lời.
class AnswerViewState {
  const AnswerViewState({required this.enabled, required this.check, required this.showCorrect, this.readingChoiceId});

  /// Đáp án cô đang đọc (sáng viền vàng).
  final String? readingChoiceId;

  /// Bé còn được thay đổi câu trả lời không.
  final bool enabled;

  /// Kết quả chấm gần nhất để tô màu (null = không tô).
  final CheckResult? check;

  /// Hiện đáp án đúng (sau khi xem lời giải / hết lượt).
  final bool showCorrect;
}

Color _partColor(bool? ok) => switch (ok) {
  true => AppColors.good,
  false => AppColors.tryAgain,
  null => Colors.transparent,
};

TextStyle _bigText(BuildContext context, {Color? color}) =>
    TextStyle(fontSize: AppSizes.promptFont, fontWeight: FontWeight.w700, color: color ?? AppColors.ink, height: 1.3);

// ===========================================================================
// Trắc nghiệm
// ===========================================================================

class MultipleChoiceView extends StatefulWidget {
  const MultipleChoiceView({
    super.key,
    required this.body,
    required this.state,
    required this.onChanged,
    this.random,
    this.initial,
    this.order,
  });

  /// Thứ tự hiển thị các đáp án (mã); null = tự xáo theo [random].
  final List<String>? order;

  final MultipleChoiceBody body;
  final AnswerViewState state;
  final ValueChanged<UserAnswer> onChanged;
  final Random? random;

  /// Câu trả lời đã có (khôi phục khi quay lại câu này trong đề thi).
  final ChoiceAnswer? initial;

  @override
  State<MultipleChoiceView> createState() => _MultipleChoiceViewState();
}

class _MultipleChoiceViewState extends State<MultipleChoiceView> {
  late final List<OptionItem> _order;
  final Set<String> _selected = {};

  @override
  void initState() {
    super.initState();
    final byId = {for (final c in widget.body.choices) c.id: c};
    final given = widget.order;
    if (given != null && given.length == byId.length && given.every(byId.containsKey)) {
      _order = [for (final id in given) byId[id]!];
    } else {
      _order = [...widget.body.choices];
      if (widget.body.shuffleChoices) _order.shuffle(widget.random ?? Random());
    }
    _selected.addAll(widget.initial?.selectedIds ?? const {});
  }

  void _tap(String id) {
    setState(() {
      if (widget.body.multiSelect) {
        _selected.contains(id) ? _selected.remove(id) : _selected.add(id);
      } else {
        _selected
          ..clear()
          ..add(id);
      }
    });
    widget.onChanged(ChoiceAnswer({..._selected}));
  }

  @override
  Widget build(BuildContext context) {
    final s = widget.state;
    return Column(
      children: [
        for (final (i, choice) in _order.indexed)
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 6),
            child: _ChoiceTile(
              key: ValueKey('choice-${choice.id}'),
              label: String.fromCharCode(65 + i), // A, B, C, D
              text: choice.text,
              selected: _selected.contains(choice.id),
              reading: s.readingChoiceId == choice.id,
              resultColor: s.showCorrect && widget.body.correctChoiceIds.contains(choice.id)
                  ? AppColors.good
                  : (s.check != null ? _partColor(s.check!.partCorrect[choice.id]) : null),
              onTap: s.enabled ? () => _tap(choice.id) : null,
            ),
          ),
      ],
    );
  }
}

class _ChoiceTile extends StatelessWidget {
  const _ChoiceTile({
    super.key,
    required this.label,
    required this.text,
    required this.selected,
    required this.onTap,
    this.resultColor,
    this.reading = false,
  });

  final String label;
  final String text;
  final bool selected;

  /// Cô đang đọc đáp án này.
  final bool reading;
  final Color? resultColor;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final hasResult = resultColor != null && resultColor != Colors.transparent;
    final border = hasResult
        ? resultColor!
        : (selected ? AppColors.sky : (reading ? const Color(0xFFFFB800) : Colors.black12));
    final fill = hasResult
        ? (resultColor == AppColors.good ? AppColors.goodSoft : AppColors.tryAgainSoft)
        : (selected ? AppColors.skySoft : Colors.white);
    return Semantics(
      button: true,
      selected: selected,
      label: 'Đáp án $label: $text',
      child: Material(
        color: fill,
        borderRadius: BorderRadius.circular(AppSizes.radius),
        child: InkWell(
          borderRadius: BorderRadius.circular(AppSizes.radius),
          onTap: onTap,
          child: Container(
            constraints: const BoxConstraints(minHeight: AppSizes.minTouch + 8),
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(AppSizes.radius),
              border: Border.all(color: border, width: selected || hasResult || reading ? 4 : 2),
              boxShadow: reading ? const [BoxShadow(color: Color(0x66FFC93C), blurRadius: 14)] : const [],
            ),
            child: Row(
              children: [
                CircleAvatar(
                  radius: 22,
                  backgroundColor: selected ? AppColors.sky : AppColors.honeySoft,
                  child: reading && !selected
                      ? const Icon(Icons.volume_up_rounded, color: Color(0xFFE07A00))
                      : Text(
                          label,
                          style: TextStyle(
                            fontSize: 22,
                            fontWeight: FontWeight.w700,
                            color: selected ? Colors.white : AppColors.ink,
                          ),
                        ),
                ),
                const SizedBox(width: 16),
                Expanded(child: MathText(text, style: _bigText(context))),
                if (hasResult)
                  Icon(
                    resultColor == AppColors.good ? Icons.check_circle : Icons.refresh_rounded,
                    color: resultColor,
                    size: 34,
                  ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

// ===========================================================================
// Điền vào chỗ trống
// ===========================================================================

class FillBlankView extends StatefulWidget {
  const FillBlankView({super.key, required this.body, required this.state, required this.onChanged, this.initial});

  final FillBlankBody body;
  final AnswerViewState state;
  final ValueChanged<UserAnswer> onChanged;
  final BlankAnswer? initial;

  @override
  State<FillBlankView> createState() => _FillBlankViewState();
}

class _FillBlankViewState extends State<FillBlankView> {
  final Map<String, String> _values = {};
  final Map<String, TextEditingController> _textControllers = {};
  String? _active;

  bool get _allNumeric => widget.body.blanks.every((b) => b.answer is NumberAnswerRule);

  @override
  void initState() {
    super.initState();
    _active = widget.body.blanks.first.id;
    _values.addAll(widget.initial?.values ?? const {});
    for (final b in widget.body.blanks) {
      if (b.answer is TextAnswerRule) {
        _textControllers[b.id] = TextEditingController(text: _values[b.id] ?? '');
      }
    }
  }

  @override
  void dispose() {
    for (final c in _textControllers.values) {
      c.dispose();
    }
    super.dispose();
  }

  void _emit() => widget.onChanged(BlankAnswer({..._values}));

  void _digit(String d) {
    final id = _active;
    if (id == null) return;
    final max = widget.body.blank(id).maxLength ?? 5;
    final cur = _values[id] ?? '';
    if (cur.length >= max) return;
    setState(() => _values[id] = cur + d);
    _emit();
  }

  void _backspace() {
    final id = _active;
    if (id == null) return;
    final cur = _values[id] ?? '';
    if (cur.isEmpty) return;
    setState(() => _values[id] = cur.substring(0, cur.length - 1));
    _emit();
  }

  @override
  Widget build(BuildContext context) {
    final s = widget.state;
    final lines = parseTemplate(widget.body.template);
    return Column(
      children: [
        Container(
          width: double.infinity,
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(AppSizes.radius)),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              for (final line in lines)
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: 6),
                  child: Wrap(
                    crossAxisAlignment: WrapCrossAlignment.center,
                    runSpacing: 8,
                    children: [
                      for (final part in groupFractionSlots(line))
                        switch (part) {
                          TemplateText(:final text) => MathText(text, style: _bigText(context)),
                          TemplateSlot(:final id) => _buildBlank(context, widget.body.blank(id), s),
                          FractionSlots(:final top, :final bottom) => FractionView(
                            style: _bigText(context),
                            numerator: _buildBlank(context, widget.body.blank(top), s),
                            denominator: _buildBlank(context, widget.body.blank(bottom), s),
                          ),
                        },
                    ],
                  ),
                ),
            ],
          ),
        ),
        if (_allNumeric && s.enabled) ...[
          const SizedBox(height: 12),
          NumberPad(onDigit: _digit, onBackspace: _backspace, enabled: s.enabled),
        ],
      ],
    );
  }

  Widget _buildBlank(BuildContext context, Blank blank, AnswerViewState s) {
    final ok = s.check?.partCorrect[blank.id];
    final value = _values[blank.id] ?? '';
    final showFix = s.showCorrect && ok != true;
    if (blank.answer is TextAnswerRule) {
      return SizedBox(
        width: 180,
        child: TextField(
          key: ValueKey('blank-${blank.id}'),
          controller: _textControllers[blank.id],
          enabled: s.enabled,
          style: _bigText(context),
          textAlign: TextAlign.center,
          decoration: InputDecoration(
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(14)),
            helperText: showFix ? 'Đáp án: ${blank.answer.displayAnswer}' : null,
          ),
          onChanged: (v) {
            _values[blank.id] = v;
            _emit();
          },
        ),
      );
    }
    final active = s.enabled && _active == blank.id;
    final width = 40.0 + 22.0 * (blank.maxLength ?? 3);
    final borderColor = ok != null ? _partColor(ok) : (active ? AppColors.sky : Colors.black26);
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 4),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Semantics(
            label: 'Ô trống',
            value: value,
            button: true,
            child: GestureDetector(
              key: ValueKey('blank-${blank.id}'),
              onTap: s.enabled ? () => setState(() => _active = blank.id) : null,
              child: AnimatedContainer(
                duration: const Duration(milliseconds: 150),
                width: width,
                height: 60,
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  color: ok == true
                      ? AppColors.goodSoft
                      : (ok == false ? AppColors.tryAgainSoft : (active ? AppColors.skySoft : AppColors.cream)),
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: borderColor, width: active || ok != null ? 4 : 2),
                ),
                child: Text(
                  value.isEmpty ? (active ? '|' : '?') : value,
                  style: _bigText(context, color: value.isEmpty ? Colors.black26 : AppColors.ink),
                ),
              ),
            ),
          ),
          if (showFix)
            Padding(
              padding: const EdgeInsets.only(top: 4),
              child: Text(
                'Đáp án: ${blank.answer.displayAnswer}',
                style: const TextStyle(fontSize: 18, color: AppColors.good, fontWeight: FontWeight.w700),
              ),
            ),
        ],
      ),
    );
  }
}

// ===========================================================================
// Kéo thả số
// ===========================================================================

class DragDropView extends StatefulWidget {
  const DragDropView({super.key, required this.body, required this.state, required this.onChanged, this.initial});

  final DragDropBody body;
  final AnswerViewState state;
  final ValueChanged<UserAnswer> onChanged;
  final DragDropAnswer? initial;

  @override
  State<DragDropView> createState() => _DragDropViewState();
}

class _DragDropViewState extends State<DragDropView> {
  final Map<String, String?> _placements = {};
  String? _selectedToken;

  @override
  void initState() {
    super.initState();
    _placements.addAll(widget.initial?.placements ?? const {});
  }

  Set<String> get _usedTokens => {for (final t in _placements.values) ?t};

  void _place(String slotId, String tokenId) {
    setState(() {
      if (!widget.body.reuseTokens) {
        _placements.updateAll((k, v) => v == tokenId ? null : v);
      }
      _placements[slotId] = tokenId;
      _selectedToken = null;
    });
    widget.onChanged(DragDropAnswer({..._placements}));
  }

  void _tapSlot(String slotId) {
    final sel = _selectedToken;
    if (sel != null) {
      _place(slotId, sel);
    } else if (_placements[slotId] != null) {
      setState(() => _placements[slotId] = null);
      widget.onChanged(DragDropAnswer({..._placements}));
    }
  }

  @override
  Widget build(BuildContext context) {
    final s = widget.state;
    final lines = parseTemplate(widget.body.template);
    return Column(
      children: [
        Container(
          width: double.infinity,
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(AppSizes.radius)),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              for (final line in lines)
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: 6),
                  child: Wrap(
                    crossAxisAlignment: WrapCrossAlignment.center,
                    children: [
                      for (final part in groupFractionSlots(line))
                        switch (part) {
                          TemplateText(:final text) => MathText(text, style: _bigText(context)),
                          TemplateSlot(:final id) => _slot(context, id, s),
                          FractionSlots(:final top, :final bottom) => FractionView(
                            style: _bigText(context),
                            numerator: _slot(context, top, s),
                            denominator: _slot(context, bottom, s),
                          ),
                        },
                    ],
                  ),
                ),
            ],
          ),
        ),
        const SizedBox(height: 16),
        Wrap(
          spacing: 12,
          runSpacing: 12,
          alignment: WrapAlignment.center,
          children: [for (final token in widget.body.tokens) _token(context, token, s)],
        ),
      ],
    );
  }

  Widget _slot(BuildContext context, String slotId, AnswerViewState s) {
    final tokenId = _placements[slotId];
    final ok = s.check?.partCorrect[slotId];
    final slot = widget.body.slots.firstWhere((x) => x.id == slotId);
    final correctText = widget.body.token(slot.accept.first).text;
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 4),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          DragTarget<String>(
            onWillAcceptWithDetails: (_) => s.enabled,
            onAcceptWithDetails: (d) => _place(slotId, d.data),
            builder: (context, candidate, rejected) {
              final hovering = candidate.isNotEmpty;
              return GestureDetector(
                key: ValueKey('slot-$slotId'),
                onTap: s.enabled ? () => _tapSlot(slotId) : null,
                child: Container(
                  width: 96,
                  height: 60,
                  alignment: Alignment.center,
                  decoration: BoxDecoration(
                    color: hovering
                        ? AppColors.skySoft
                        : (ok == true ? AppColors.goodSoft : (ok == false ? AppColors.tryAgainSoft : AppColors.cream)),
                    borderRadius: BorderRadius.circular(14),
                    border: Border.all(
                      color: ok != null
                          ? _partColor(ok)
                          : (hovering || _selectedToken != null ? AppColors.sky : Colors.black26),
                      width: ok != null || hovering ? 4 : 2,
                    ),
                  ),
                  child: FittedBox(
                    fit: BoxFit.scaleDown,
                    child: MathText(
                      tokenId == null ? '?' : widget.body.token(tokenId).text,
                      style: _bigText(context, color: tokenId == null ? Colors.black26 : AppColors.ink),
                    ),
                  ),
                ),
              );
            },
          ),
          if (s.showCorrect && ok != true)
            Text(
              'Đáp án: $correctText',
              style: const TextStyle(fontSize: 16, color: AppColors.good, fontWeight: FontWeight.w700),
            ),
        ],
      ),
    );
  }

  Widget _token(BuildContext context, OptionItem token, AnswerViewState s) {
    final used = !widget.body.reuseTokens && _usedTokens.contains(token.id);
    final selected = _selectedToken == token.id;
    Widget chip({bool ghost = false}) => Material(
      color: ghost ? Colors.black12 : (selected ? AppColors.sky : AppColors.honey),
      elevation: ghost ? 0 : 3,
      borderRadius: BorderRadius.circular(16),
      child: Container(
        width: 88,
        height: 64,
        alignment: Alignment.center,
        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 4),
        child: FittedBox(
          fit: BoxFit.scaleDown,
          child: MathText(
            token.text,
            style: _bigText(context, color: ghost ? Colors.black38 : (selected ? Colors.white : AppColors.ink)),
          ),
        ),
      ),
    );
    if (used || !s.enabled) {
      return KeyedSubtree(key: ValueKey('token-${token.id}'), child: chip(ghost: true));
    }
    return Draggable<String>(
      key: ValueKey('token-${token.id}'),
      data: token.id,
      feedback: chip(),
      childWhenDragging: chip(ghost: true),
      child: GestureDetector(onTap: () => setState(() => _selectedToken = selected ? null : token.id), child: chip()),
    );
  }
}

// ===========================================================================
// Nối
// ===========================================================================

class MatchingView extends StatefulWidget {
  const MatchingView({
    super.key,
    required this.body,
    required this.state,
    required this.onChanged,
    this.random,
    this.initial,
  });

  final MatchingBody body;
  final AnswerViewState state;
  final ValueChanged<UserAnswer> onChanged;
  final Random? random;
  final MatchingAnswer? initial;

  @override
  State<MatchingView> createState() => _MatchingViewState();
}

class _MatchingViewState extends State<MatchingView> {
  late final List<OptionItem> _rightOrder;
  final Map<String, String> _pairs = {};
  String? _selectedLeft;

  @override
  void initState() {
    super.initState();
    _rightOrder = [...widget.body.right];
    if (widget.body.shuffleRight) _rightOrder.shuffle(widget.random ?? Random());
    _pairs.addAll(widget.initial?.pairs ?? const {});
  }

  Color _colorOfLeft(String leftId) {
    final i = widget.body.left.indexWhere((l) => l.id == leftId);
    return AppColors.pairColors[i % AppColors.pairColors.length];
  }

  void _tapLeft(String id) {
    setState(() {
      if (_pairs.containsKey(id)) {
        _pairs.remove(id);
        _selectedLeft = id;
      } else {
        _selectedLeft = _selectedLeft == id ? null : id;
      }
    });
    widget.onChanged(MatchingAnswer({..._pairs}));
  }

  void _tapRight(String id) {
    setState(() {
      final sel = _selectedLeft;
      if (sel != null) {
        _pairs.removeWhere((_, r) => r == id);
        _pairs[sel] = id;
        _selectedLeft = null;
      } else {
        _pairs.removeWhere((_, r) => r == id);
      }
    });
    widget.onChanged(MatchingAnswer({..._pairs}));
  }

  @override
  Widget build(BuildContext context) {
    final s = widget.state;
    final leftOfRight = {for (final e in _pairs.entries) e.value: e.key};
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Expanded(
          child: Column(
            children: [
              for (final l in widget.body.left)
                _item(
                  key: ValueKey('left-${l.id}'),
                  text: l.text,
                  color: _pairs.containsKey(l.id) || _selectedLeft == l.id ? _colorOfLeft(l.id) : null,
                  selected: _selectedLeft == l.id,
                  ok: s.check?.partCorrect[l.id],
                  note: s.showCorrect && s.check?.partCorrect[l.id] != true
                      ? '→ ${widget.body.right.firstWhere((r) => r.id == widget.body.pairs[l.id]).text}'
                      : null,
                  onTap: s.enabled ? () => _tapLeft(l.id) : null,
                ),
            ],
          ),
        ),
        const SizedBox(width: 16),
        Expanded(
          child: Column(
            children: [
              for (final r in _rightOrder)
                _item(
                  key: ValueKey('right-${r.id}'),
                  text: r.text,
                  color: leftOfRight[r.id] != null ? _colorOfLeft(leftOfRight[r.id]!) : null,
                  selected: false,
                  onTap: s.enabled ? () => _tapRight(r.id) : null,
                ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _item({
    required Key key,
    required String text,
    required Color? color,
    required bool selected,
    required VoidCallback? onTap,
    bool? ok,
    String? note,
  }) {
    final border = ok == false ? AppColors.tryAgain : (color ?? Colors.black12);
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Material(
        color: color == null ? Colors.white : Color.alphaBlend(color.withValues(alpha: 0.18), Colors.white),
        borderRadius: BorderRadius.circular(AppSizes.radius),
        child: InkWell(
          key: key,
          borderRadius: BorderRadius.circular(AppSizes.radius),
          onTap: onTap,
          child: Container(
            constraints: const BoxConstraints(minHeight: AppSizes.minTouch),
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
            alignment: Alignment.center,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(AppSizes.radius),
              border: Border.all(color: border, width: selected || ok != null || color != null ? 4 : 2),
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                MathText(text, textAlign: TextAlign.center, style: _bigText(context)),
                if (note != null)
                  Text(
                    note,
                    style: const TextStyle(fontSize: 17, color: AppColors.good, fontWeight: FontWeight.w700),
                  ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

/// Dựng khu trả lời phù hợp dạng bài (dùng chung cho luyện tập và đề thi).
Widget buildAnswerView({
  required Problem problem,
  required AnswerViewState state,
  required ValueChanged<UserAnswer> onChanged,
  UserAnswer? initial,
  Random? random,
  List<String>? choiceOrder,
}) {
  return switch (problem.body) {
    final MultipleChoiceBody b => MultipleChoiceView(
      body: b,
      state: state,
      onChanged: onChanged,
      random: random,
      order: choiceOrder,
      initial: initial is ChoiceAnswer ? initial : null,
    ),
    final FillBlankBody b => FillBlankView(
      body: b,
      state: state,
      onChanged: onChanged,
      initial: initial is BlankAnswer ? initial : null,
    ),
    final DragDropBody b => DragDropView(
      body: b,
      state: state,
      onChanged: onChanged,
      initial: initial is DragDropAnswer ? initial : null,
    ),
    final MatchingBody b => MatchingView(
      body: b,
      state: state,
      onChanged: onChanged,
      random: random,
      initial: initial is MatchingAnswer ? initial : null,
    ),
  };
}
