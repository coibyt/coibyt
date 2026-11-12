import 'package:flutter/material.dart';

import '../app_state.dart';
import '../logic/english.dart';
import '../tutor/host_avatar.dart';
import '../tutor/teacher_assets.dart';
import '../tutor/teacher_controller.dart';
import '../tutor/tutor_audio_service.dart';
import 'english_screens.dart';
import 'widgets/big_button.dart';
import 'widgets/game_art.dart';

const _navy = Color(0xFF1B2A6B);

/// Số vé vui chơi (🎟️) — chạm để xem cách nhận vé.
class TicketChip extends StatelessWidget {
  const TicketChip({super.key, required this.count, this.onTap});

  final int count;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) => Material(
    color: const Color(0xFFFFF4D6),
    shape: const StadiumBorder(side: BorderSide(color: Color(0xFFFFB800), width: 2)),
    child: InkWell(
      customBorder: const StadiumBorder(),
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.fromLTRB(6, 4, 12, 4),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            const GameIcon(UiAsset.ticket, size: 30, fallback: Text('🎟️', style: TextStyle(fontSize: 22))),
            const SizedBox(width: 4),
            Text(
              '$count',
              key: const ValueKey('ticket-count'),
              style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w900, color: Color(0xFF7A4A00)),
            ),
          ],
        ),
      ),
    ),
  );
}

/// Bạn Vẹt Lulu đứng nói tiếng Anh, phụ đề tiếng Việt bên dưới.
class MascotSpeech extends StatelessWidget {
  const MascotSpeech({super.key, required this.controller, required this.line, this.pose = HostPose.present, this.height = 150});

  final TeacherController controller;
  final MascotLine? line;
  final HostPose pose;
  final double height;

  @override
  Widget build(BuildContext context) => ListenableBuilder(
    listenable: controller,
    builder: (context, _) => Row(
      crossAxisAlignment: CrossAxisAlignment.end,
      children: [
        HostAvatar.mascot(height: height, pose: pose, mouthOpen: controller.mouthOpen),
        const SizedBox(width: 6),
        Expanded(
          child: AnimatedSwitcher(
            duration: const Duration(milliseconds: 250),
            child: line == null
                ? const SizedBox.shrink()
                : Container(
                    key: ValueKey(line!.$1),
                    margin: const EdgeInsets.only(bottom: 18),
                    padding: const EdgeInsets.fromLTRB(14, 10, 14, 12),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(22),
                      border: Border.all(color: const Color(0xFF7BD389), width: 2.5),
                      boxShadow: const [BoxShadow(color: Color(0x33000000), blurRadius: 10, offset: Offset(0, 4))],
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const Text(
                          'Lulu',
                          style: TextStyle(fontSize: 14, fontWeight: FontWeight.w800, color: Color(0xFF2E9E5B)),
                        ),
                        Text(
                          line!.$1,
                          key: const ValueKey('mascot-en'),
                          style: const TextStyle(fontSize: 19, fontWeight: FontWeight.w800, color: _navy, height: 1.3),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          line!.$2,
                          style: const TextStyle(
                            fontSize: 15,
                            fontStyle: FontStyle.italic,
                            color: Colors.black54,
                            height: 1.3,
                          ),
                        ),
                      ],
                    ),
                  ),
          ),
        ),
      ],
    ),
  );
}

/// Bé hết vé: bạn Vẹt Lulu mời sang Đảo Tiếng Anh học để nhận thêm vé.
Future<void> showNoTicket(BuildContext context) async {
  final teacher = TeacherController(audio: TutorAudioService());
  final go = await showDialog<bool>(
    context: context,
    builder: (ctx) {
      WidgetsBinding.instance.addPostFrameCallback(
        (_) => teacher.say([MascotLines.noTicket.$1, MascotLines.ticketRule.$1], forceVoice: true),
      );
      return Dialog(
        key: const ValueKey('no-ticket'),
        backgroundColor: const Color(0xFFF2FFF4),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(28)),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Text(
                'Hết vé vui chơi rồi!',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.w900, color: _navy),
              ),
              const SizedBox(height: 8),
              MascotSpeech(controller: teacher, line: MascotLines.noTicket, pose: HostPose.idle, height: 130),
              const Text(
                'Mỗi ngày tặng 1 vé. Học tiếng Anh: chơi ôn từ được bao nhiêu sao thì nhận bấy nhiêu vé! '
                'Trả lời đúng câu đố "Góc Tiếng Anh" khi luyện tập cũng được 1 vé.',
                style: TextStyle(fontSize: 16, height: 1.35),
              ),
              const SizedBox(height: 12),
              BigButton(
                key: const ValueKey('go-english-island'),
                label: 'Sang Đảo Tiếng Anh',
                icon: Icons.sailing_rounded,
                color: const Color(0xFF2E9E5B),
                onPressed: () => Navigator.pop(ctx, true),
              ),
              TextButton(onPressed: () => Navigator.pop(ctx, false), child: const Text('Để sau')),
            ],
          ),
        ),
      );
    },
  );
  teacher.dispose();
  if (go == true && context.mounted) {
    await Navigator.of(context).push(MaterialPageRoute<void>(builder: (_) => const EnglishIslandScreen()));
  }
}

/// Dùng 1 vé để chơi; hết vé thì mời sang Đảo Tiếng Anh. true = được chơi.
Future<bool> useTicketOrInvite(BuildContext context) async {
  final app = AppScope.read(context);
  if (await app.spendTicket()) return true;
  if (context.mounted) await showNoTicket(context);
  return false;
}

/// Đảo Tiếng Anh: bạn Vẹt Lulu dẫn bé học từ vựng Toán bằng tiếng Anh theo từng hòn đảo,
/// chơi ôn từ được sao → nhận vé vui chơi.
class EnglishIslandScreen extends StatefulWidget {
  const EnglishIslandScreen({super.key});

  @override
  State<EnglishIslandScreen> createState() => _EnglishIslandScreenState();
}

class _EnglishIslandScreenState extends State<EnglishIslandScreen> {
  late final TeacherController _lulu = TeacherController(audio: TutorAudioService());
  MascotLine _line = MascotLines.greet;
  HostPose _pose = HostPose.present;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) => _greet());
  }

  Future<void> _greet() async {
    // Mở đảo ra là Lulu chào ngay (không cần bấm loa).
    await _say(MascotLines.greet, HostPose.present);
    if (mounted) await _say(MascotLines.pick, HostPose.idle);
  }

  Future<void> _say(MascotLine l, HostPose pose) async {
    if (!mounted) return;
    setState(() {
      _line = l;
      _pose = pose;
    });
    await _lulu.say([l.$1], forceVoice: true);
  }

  @override
  void dispose() {
    _lulu.dispose();
    super.dispose();
  }

  Future<void> _open(EnglishIsland i) async {
    _lulu.clear();
    await Navigator.of(context).push(
      MaterialPageRoute<void>(
        builder: (_) => EnglishVocabScreen(words: i.words, title: '${i.emoji} ${i.name}', islandId: i.id),
      ),
    );
    if (!mounted) return;
    await _say(MascotLines.pick, HostPose.idle);
  }

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    final stars = app.englishStars;
    return Scaffold(
      appBar: AppBar(
        title: const Text('Đảo Tiếng Anh'),
        backgroundColor: const Color(0xFFDFF7FF),
        actions: [
          TicketChip(count: app.tickets, onTap: () => _say(MascotLines.ticketRule, HostPose.present)),
          const SizedBox(width: 12),
        ],
      ),
      body: ScreenBackground(
        name: 'english',
        veil: 0.15,
        child: SafeArea(
          child: Center(
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 640),
              child: ListView(
                padding: const EdgeInsets.fromLTRB(14, 8, 14, 24),
                children: [
                  MascotSpeech(key: const ValueKey('lulu'), controller: _lulu, line: _line, pose: _pose),
                  const SizedBox(height: 10),
                  Container(
                    padding: const EdgeInsets.fromLTRB(14, 10, 14, 10),
                    decoration: BoxDecoration(
                      color: const Color(0xEEFFFFFF),
                      borderRadius: BorderRadius.circular(18),
                    ),
                    child: const Text(
                      '🎟️ Mỗi ngày tặng 1 vé vui chơi. Chơi ôn từ được bao nhiêu sao thì nhận bấy nhiêu vé, '
                      'dùng vé để chơi Bóng bay Toán học và Quay thẻ thú cưng!',
                      style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: _navy, height: 1.35),
                    ),
                  ),
                  const SizedBox(height: 12),
                  GridView.count(
                    crossAxisCount: MediaQuery.sizeOf(context).width > 560 ? 3 : 2,
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    mainAxisSpacing: 10,
                    crossAxisSpacing: 10,
                    childAspectRatio: 1.05,
                    children: [
                      for (final i in englishIslands)
                        _IslandCard(island: i, stars: stars[i.id] ?? 0, onTap: () => _open(i)),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _IslandCard extends StatelessWidget {
  const _IslandCard({required this.island, required this.stars, required this.onTap});

  final EnglishIsland island;
  final int stars;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) => Material(
    color: Colors.transparent,
    child: InkWell(
      key: ValueKey('island-${island.id}'),
      borderRadius: BorderRadius.circular(24),
      onTap: onTap,
      child: Ink(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(24),
          gradient: const LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Color(0xFF4FC3F7), Color(0xFF26A69A)],
          ),
          border: Border.all(color: const Color(0xFFFFE08A), width: 3),
          boxShadow: const [BoxShadow(color: Color(0x44000000), blurRadius: 10, offset: Offset(0, 5))],
        ),
        child: Padding(
          padding: const EdgeInsets.all(8),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(island.emoji, style: const TextStyle(fontSize: 40)),
              Text(
                island.name,
                textAlign: TextAlign.center,
                maxLines: 2,
                style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w900, color: Colors.white),
              ),
              Text(
                island.vi,
                textAlign: TextAlign.center,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: Color(0xFFFFF4C2)),
              ),
              const SizedBox(height: 2),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  for (var k = 0; k < 3; k++)
                    Icon(
                      Icons.star_rounded,
                      size: 22,
                      color: k < stars ? const Color(0xFFFFD54F) : const Color(0x66FFFFFF),
                    ),
                ],
              ),
            ],
          ),
        ),
      ),
    ),
  );
}
