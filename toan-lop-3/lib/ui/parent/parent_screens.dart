import 'dart:math';

import 'package:flutter/material.dart';

import '../../app_state.dart';
import '../../services/tutor_voice.dart';
import '../app_theme.dart';
import '../child_screens.dart';
import '../widgets/number_pad.dart';
import 'account_section.dart';

/// Mở khu phụ huynh sau khi qua "cổng phụ huynh".
Future<void> openParentArea(BuildContext context, {Random? random}) async {
  final ok = await showDialog<bool>(
    context: context,
    builder: (_) => ParentGateDialog(random: random),
  );
  if (ok == true && context.mounted) {
    await pushScreen<void>(context, const ParentScreen());
  }
}

/// Cổng phụ huynh: phép nhân hai chữ số × hai chữ số — người lớn tính được,
/// bé lớp 3 chưa học. Không có nút mua/cài đặt nào nằm ngoài cổng này.
class ParentGateDialog extends StatefulWidget {
  const ParentGateDialog({super.key, this.random});

  final Random? random;

  @override
  State<ParentGateDialog> createState() => _ParentGateDialogState();
}

class _ParentGateDialogState extends State<ParentGateDialog> {
  late int _a;
  late int _b;
  String _input = '';
  bool _wrong = false;

  @override
  void initState() {
    super.initState();
    _newQuestion();
  }

  void _newQuestion() {
    final r = widget.random ?? Random();
    _a = 12 + r.nextInt(18);
    _b = 12 + r.nextInt(8);
    _input = '';
  }

  void _submit() {
    if (int.tryParse(_input) == _a * _b) {
      Navigator.of(context).pop(true);
    } else {
      setState(() {
        _wrong = true;
        _newQuestion();
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      backgroundColor: AppColors.cream,
      title: const Text('Dành cho bố mẹ', style: TextStyle(fontWeight: FontWeight.w700)),
      content: SizedBox(
        width: 360,
        child: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                'Nhập kết quả: $_a × $_b',
                key: const ValueKey('gate-question'),
                style: const TextStyle(fontSize: 24),
              ),
              const SizedBox(height: 8),
              Container(
                height: 56,
                width: double.infinity,
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: _wrong ? AppColors.tryAgain : Colors.black26, width: 2),
                ),
                child: Text(_input, style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w700)),
              ),
              if (_wrong) const Text('Chưa đúng, thử phép tính mới nhé.', style: TextStyle(color: AppColors.tryAgain)),
              const SizedBox(height: 8),
              NumberPad(
                onDigit: (d) => setState(() => _input = _input.length < 4 ? _input + d : _input),
                onBackspace: () =>
                    setState(() => _input = _input.isEmpty ? '' : _input.substring(0, _input.length - 1)),
              ),
            ],
          ),
        ),
      ),
      actions: [
        TextButton(onPressed: () => Navigator.of(context).pop(false), child: const Text('Huỷ')),
        FilledButton(key: const ValueKey('gate-ok'), onPressed: _submit, child: const Text('Vào')),
      ],
    );
  }
}

/// Khu phụ huynh: xem tiến độ, kỹ năng còn yếu, cài đặt.
class ParentScreen extends StatelessWidget {
  const ParentScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    final book = app.book;
    final weak = app.weakSkills();
    final lessonTitles = {
      for (final b in app.catalog.books)
        for (final c in b.chapters)
          for (final l in c.lessons) l.id: l.title,
    };
    final examTitles = {
      for (final b in app.catalog.books)
        for (final e in b.exams) e.id: e.title,
    };
    const h = TextStyle(fontSize: 20, fontWeight: FontWeight.w700);
    return Scaffold(
      appBar: AppBar(title: const Text('Khu phụ huynh'), backgroundColor: AppColors.honeySoft),
      body: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 720),
          child: ListView(
            padding: const EdgeInsets.all(16),
            children: [
              _Card(
                children: [
                  const Text('Tổng quan', style: h),
                  const SizedBox(height: 8),
                  _row('Tên của bé', app.progress.childName),
                  _row('Bộ sách', book?.series.displayName ?? '—'),
                  _row('Tổng điểm', '${app.progress.totalPoints}'),
                  _row('Chuỗi ngày học', '${app.streak} (dài nhất ${app.progress.bestStreak})'),
                  _row('Số ngày đã học', '${app.progress.activeDays.length}'),
                  _row('Gói', app.isVip ? 'VIP' : 'Miễn phí'),
                ],
              ),
              _Card(
                children: [
                  const Text('Kỹ năng cần luyện thêm', style: h),
                  const SizedBox(height: 8),
                  if (weak.isEmpty)
                    const Text('Chưa có kỹ năng nào dưới 60% câu đúng. Tốt lắm!')
                  else
                    for (final (skill, p) in weak)
                      _row(
                        skill.name,
                        '${p.correct}/${p.total} đúng (${(p.ratio * 100).round()}%)',
                        color: AppColors.tryAgain,
                      ),
                ],
              ),
              _Card(
                children: [
                  const Text('Các bài đã học', style: h),
                  const SizedBox(height: 8),
                  if (app.progress.lessons.isEmpty) const Text('Bé chưa làm bài nào.'),
                  for (final e in app.progress.lessons.entries)
                    _row(
                      lessonTitles[e.key] ?? e.key,
                      '${'★' * e.value.bestStars}${'☆' * (3 - e.value.bestStars)} · ${e.value.plays} lần',
                    ),
                ],
              ),
              _Card(
                children: [
                  const Text('Lịch sử thi thử', style: h),
                  const SizedBox(height: 8),
                  if (app.progress.exams.isEmpty) const Text('Bé chưa làm đề nào.'),
                  for (final r in app.progress.exams.reversed.take(10))
                    _row(
                      '${examTitles[r.examId] ?? r.examId}\n${_date(r.at)}'
                          '${r.weakSkillIds.isEmpty ? '' : '\nCần ôn: ${r.weakSkillIds.map((id) => app.skillsById[id]?.name ?? id).join('; ')}'}',
                      '${r.score.round()} điểm (${r.correct}/${r.total})',
                      color: r.score >= 5 ? AppColors.good : AppColors.tryAgain,
                    ),
                ],
              ),
              const AccountSection(),
              _Card(
                children: [
                  const Text('Cài đặt', style: h),
                  ListTile(
                    contentPadding: EdgeInsets.zero,
                    leading: const Icon(Icons.visibility_rounded),
                    title: const Text('Nhắc bé nghỉ mắt'),
                    subtitle: const Text('Sau một khoảng thời gian dùng app liên tục'),
                    trailing: DropdownButton<int>(
                      key: const ValueKey('break-select'),
                      value: app.breakMinutes,
                      items: const [
                        DropdownMenuItem(value: 0, child: Text('Tắt')),
                        DropdownMenuItem(value: 20, child: Text('20 phút')),
                        DropdownMenuItem(value: 30, child: Text('30 phút')),
                        DropdownMenuItem(value: 45, child: Text('45 phút')),
                      ],
                      onChanged: (v) => app.setBreakMinutes(v ?? 30),
                    ),
                  ),
                  SwitchListTile(
                    key: const ValueKey('voice-toggle'),
                    contentPadding: EdgeInsets.zero,
                    value: app.voiceEnabled,
                    onChanged: app.setVoiceEnabled,
                    secondary: const Icon(Icons.record_voice_over_rounded),
                    title: const Text('Cô Ong tự đọc to lời thoại'),
                    subtitle: Text(
                      AppTutorVoice.instance.hasVietnamese == false
                          ? 'Máy này chưa có giọng đọc tiếng Việt: cô Ong chỉ hiện chữ. '
                                '(Android: Cài đặt → Chuyển văn bản thành giọng nói → cài tiếng Việt.)'
                          : 'Tắt nếu bé học ở nơi cần yên tĩnh.',
                    ),
                  ),
                  ListTile(
                    contentPadding: EdgeInsets.zero,
                    leading: const Icon(Icons.badge_rounded),
                    title: const Text('Đổi tên của bé'),
                    onTap: () => _editName(context, app),
                  ),
                  ListTile(
                    contentPadding: EdgeInsets.zero,
                    leading: const Icon(Icons.menu_book_rounded),
                    title: const Text('Đổi bộ sách'),
                    onTap: () => pushScreen<void>(context, const BookPickerScreen(popOnPick: true)),
                  ),
                  ListTile(
                    contentPadding: EdgeInsets.zero,
                    leading: const Icon(Icons.delete_outline_rounded, color: AppColors.tryAgain),
                    title: const Text('Xoá toàn bộ tiến độ'),
                    onTap: () => _confirmReset(context, app),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  static String _date(DateTime t) =>
      '${t.day.toString().padLeft(2, '0')}/${t.month.toString().padLeft(2, '0')}/${t.year}';

  static Widget _row(String label, String value, {Color? color}) => Padding(
    padding: const EdgeInsets.symmetric(vertical: 4),
    child: Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Expanded(child: Text(label, style: const TextStyle(fontSize: 17))),
        const SizedBox(width: 12),
        Flexible(
          child: Text(
            value,
            textAlign: TextAlign.right,
            style: TextStyle(fontSize: 17, fontWeight: FontWeight.w700, color: color),
          ),
        ),
      ],
    ),
  );

  Future<void> _editName(BuildContext context, AppState app) async {
    final controller = TextEditingController(text: app.progress.childName);
    final name = await showDialog<String>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Tên của bé'),
        content: TextField(controller: controller, autofocus: true, maxLength: 20),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Huỷ')),
          FilledButton(onPressed: () => Navigator.pop(context, controller.text), child: const Text('Lưu')),
        ],
      ),
    );
    controller.dispose();
    if (name != null) await app.setChildName(name);
  }

  Future<void> _confirmReset(BuildContext context, AppState app) async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Xoá toàn bộ tiến độ?'),
        content: const Text('Điểm, sao, huy hiệu và lịch sử thi sẽ bị xoá. Không thể hoàn tác.'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context, false), child: const Text('Huỷ')),
          FilledButton(onPressed: () => Navigator.pop(context, true), child: const Text('Xoá')),
        ],
      ),
    );
    if (ok == true) await app.resetProgress();
  }
}

class _Card extends StatelessWidget {
  const _Card({required this.children});

  final List<Widget> children;

  @override
  Widget build(BuildContext context) => Padding(
    padding: const EdgeInsets.only(bottom: 14),
    child: Material(
      color: Colors.white,
      borderRadius: BorderRadius.circular(18),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: children),
      ),
    ),
  );
}
