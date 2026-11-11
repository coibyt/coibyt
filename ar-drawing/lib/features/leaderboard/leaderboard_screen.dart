import 'dart:async';

import 'package:flutter/material.dart';

import '../../core/app_theme.dart';
import '../../core/i18n/language_controller.dart';
import '../exams/exam_record_store.dart';
import '../teacher/teacher_controller.dart';
import '../teacher/teacher_scope.dart';
import '../teacher/widgets/teacher_overlay.dart';
import 'leaderboard_client.dart';
import 'player_profile.dart';

/// Lifetime points: the best mark of every exam taken, added up.
double lifetimePoints(ExamRecordStore? records) {
  if (records == null) return 0;
  final Set<String> ids = records.attempts.map((ExamAttempt a) => a.examId).toSet();
  return ids.fold<double>(0, (double sum, String id) => sum + (records.best(id)?.total ?? 0));
}

/// Top 50 young artists of the week and month, the learner's title, and the
/// Hall of Fame with the best drawings of this month's leaders.
class LeaderboardScreen extends StatefulWidget {
  const LeaderboardScreen({super.key});

  @override
  State<LeaderboardScreen> createState() => _LeaderboardScreenState();
}

class _LeaderboardScreenState extends State<LeaderboardScreen> {
  final TeacherController _teacher = TeacherController();

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) _teacher.introduce(TeacherScope.maybeOf(context), 'leaderboard_intro');
    });
  }

  @override
  void dispose() {
    _teacher.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final PlayerProfile? profile = ProfileScope.maybeOf(context);
    final double points = lifetimePoints(ExamRecordScope.maybeOf(context));
    return DefaultTabController(
      length: 3,
      child: Scaffold(
        backgroundColor: AppTheme.ink,
        appBar: AppBar(
          backgroundColor: AppTheme.ink,
          title: Text(context.tr('board.title')),
          actions: <Widget>[
            if (profile != null)
              IconButton(
                key: const Key('editProfile'),
                tooltip: context.tr('board.profile'),
                onPressed: () => showProfileSheet(context, profile),
                icon: Text(profile.emoji, style: const TextStyle(fontSize: 22)),
              ),
          ],
          bottom: TabBar(
            tabs: <Widget>[
              Tab(key: const Key('tabWeek'), text: context.tr('board.week')),
              Tab(key: const Key('tabMonth'), text: context.tr('board.month')),
              Tab(key: const Key('tabHall'), text: context.tr('board.hallTab')),
            ],
          ),
        ),
        body: Stack(
          children: <Widget>[
            Column(
              children: <Widget>[
                _RankCard(points: points, profile: profile),
                const Expanded(
                  child: TabBarView(
                    children: <Widget>[
                      _BoardList(period: 'week'),
                      _BoardList(period: 'month'),
                      _HallGrid(),
                    ],
                  ),
                ),
              ],
            ),
            Positioned.fill(child: TeacherOverlay(controller: _teacher)),
          ],
        ),
      ),
    );
  }
}

class _RankCard extends StatelessWidget {
  const _RankCard({required this.points, required this.profile});

  final double points;
  final PlayerProfile? profile;

  @override
  Widget build(BuildContext context) {
    final ArtistRank rank = ArtistRank.of(points);
    final double? toNext = ArtistRank.toNext(points);
    final PlayerProfile? p = profile;
    return Container(
      key: const Key('rankCard'),
      margin: const EdgeInsets.fromLTRB(16, 12, 16, 4),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        gradient: const LinearGradient(colors: <Color>[Color(0xFF3B2A5C), Color(0xFF232838)]),
        borderRadius: BorderRadius.circular(18),
      ),
      child: Row(
        children: <Widget>[
          Text(<String>['🖍️', '🎨', '👑'][rank.index], style: const TextStyle(fontSize: 34)),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Text(
                  context.tr(rank.labelKey),
                  key: const Key('rankTitle'),
                  style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 17),
                ),
                Text(
                  toNext == null
                      ? context.tr(
                          'board.topRank',
                          args: <String, Object?>{'points': points.toStringAsFixed(1)},
                        )
                      : context.tr(
                          'board.toNext',
                          args: <String, Object?>{
                            'points': points.toStringAsFixed(1),
                            'more': toNext.toStringAsFixed(1),
                          },
                        ),
                  style: const TextStyle(color: Colors.white70, fontSize: 12.5),
                ),
                if (p != null && !p.joined)
                  TextButton(
                    key: const Key('joinBoard'),
                    style: TextButton.styleFrom(padding: EdgeInsets.zero),
                    onPressed: () => showProfileSheet(context, p),
                    child: Text(context.tr('board.join')),
                  ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _BoardList extends StatefulWidget {
  const _BoardList({required this.period});

  final String period;

  @override
  State<_BoardList> createState() => _BoardListState();
}

class _BoardListState extends State<_BoardList> {
  Future<Board?>? _future;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _future ??= LeaderboardScope.maybeOf(context)
        ?.board(widget.period, ProfileScope.maybeOf(context));
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<Board?>(
      future: _future,
      builder: (BuildContext context, AsyncSnapshot<Board?> snap) {
        if (snap.connectionState != ConnectionState.done) {
          return const Center(child: CircularProgressIndicator());
        }
        final Board? board = snap.data;
        if (board == null) {
          return _Message(
            icon: Icons.wifi_off,
            text: context.tr('board.offline'),
            onRetry: () => setState(() {
              _future = LeaderboardScope.maybeOf(context)
                  ?.board(widget.period, ProfileScope.maybeOf(context));
            }),
          );
        }
        if (board.rows.isEmpty) {
          return _Message(icon: Icons.emoji_events_outlined, text: context.tr('board.empty'));
        }
        final bool meShown = board.rows.any((BoardRow r) => r.me);
        return ListView(
          padding: const EdgeInsets.fromLTRB(12, 8, 12, 140),
          children: <Widget>[
            for (final BoardRow r in board.rows) _Row(row: r),
            if (!meShown && board.me != null) ...<Widget>[const Divider(), _Row(row: board.me!)],
          ],
        );
      },
    );
  }
}

class _Row extends StatelessWidget {
  const _Row({required this.row});

  final BoardRow row;

  @override
  Widget build(BuildContext context) {
    final String medal = switch (row.rank) {
      1 => '🥇',
      2 => '🥈',
      3 => '🥉',
      _ => '',
    };
    return Container(
      key: Key('boardRow-${row.rank}'),
      margin: const EdgeInsets.only(bottom: 6),
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: row.me ? const Color(0x33FFB547) : const Color(0xFF232838),
        borderRadius: BorderRadius.circular(14),
      ),
      child: Row(
        children: <Widget>[
          SizedBox(
            width: 36,
            child: Text(
              medal.isNotEmpty ? medal : '#${row.rank}',
              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w800),
            ),
          ),
          Text(kAvatars[row.avatar] ?? '🦊', style: const TextStyle(fontSize: 22)),
          const SizedBox(width: 10),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Text(row.name, style: const TextStyle(fontWeight: FontWeight.w800)),
                Text(
                  '${context.tr(ArtistRank.of(row.total).labelKey)} · ${context.tr('board.exams', args: <String, Object?>{'count': row.exams})}',
                  style: const TextStyle(color: Colors.white60, fontSize: 11.5),
                ),
              ],
            ),
          ),
          Text(
            row.score.toStringAsFixed(1),
            style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w900),
          ),
        ],
      ),
    );
  }
}

class _HallGrid extends StatefulWidget {
  const _HallGrid();

  @override
  State<_HallGrid> createState() => _HallGridState();
}

class _HallGridState extends State<_HallGrid> {
  Future<List<HallItem>?>? _future;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _future ??= LeaderboardScope.maybeOf(context)?.hall();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<HallItem>?>(
      future: _future,
      builder: (BuildContext context, AsyncSnapshot<List<HallItem>?> snap) {
        if (snap.connectionState != ConnectionState.done) {
          return const Center(child: CircularProgressIndicator());
        }
        final List<HallItem>? items = snap.data;
        if (items == null) return _Message(icon: Icons.wifi_off, text: context.tr('board.offline'));
        if (items.isEmpty) {
          return _Message(icon: Icons.museum_outlined, text: context.tr('board.hallEmpty'));
        }
        return GridView.builder(
          padding: const EdgeInsets.fromLTRB(12, 8, 12, 140),
          gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
            maxCrossAxisExtent: 200,
            mainAxisSpacing: 10,
            crossAxisSpacing: 10,
            childAspectRatio: 0.78,
          ),
          itemCount: items.length,
          itemBuilder: (BuildContext context, int i) {
            final HallItem it = items[i];
            return Material(
              key: Key('hall-$i'),
              color: const Color(0xFFF7F3EA),
              borderRadius: BorderRadius.circular(14),
              clipBehavior: Clip.antiAlias,
              child: InkWell(
                onTap: () => showDialog<void>(
                  context: context,
                  builder: (BuildContext context) => Dialog(
                    backgroundColor: const Color(0xFFFFFDF8),
                    child: Padding(padding: const EdgeInsets.all(12), child: Image.network(it.url)),
                  ),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: <Widget>[
                    Expanded(
                      child: Padding(
                        padding: const EdgeInsets.all(6),
                        child: Image.network(
                          it.url,
                          fit: BoxFit.contain,
                          errorBuilder: (_, _, _) =>
                              const Icon(Icons.image_not_supported, color: Colors.black26),
                        ),
                      ),
                    ),
                    Container(
                      color: Colors.white,
                      padding: const EdgeInsets.fromLTRB(8, 5, 8, 6),
                      child: Text(
                        '${kAvatars[it.avatar] ?? '🦊'} ${it.name} · ${it.score.toStringAsFixed(1)}',
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(
                          color: AppTheme.ink,
                          fontWeight: FontWeight.w800,
                          fontSize: 12.5,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            );
          },
        );
      },
    );
  }
}

class _Message extends StatelessWidget {
  const _Message({required this.icon, required this.text, this.onRetry});

  final IconData icon;
  final String text;
  final VoidCallback? onRetry;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            Icon(icon, size: 48, color: Colors.white38),
            const SizedBox(height: 10),
            Text(
              text,
              textAlign: TextAlign.center,
              style: const TextStyle(color: Colors.white70),
            ),
            if (onRetry != null)
              TextButton(onPressed: onRetry, child: Text(context.tr('camera.tryAgain'))),
          ],
        ),
      ),
    );
  }
}

/// Nickname, animal and Hall of Fame consent.
Future<void> showProfileSheet(BuildContext context, PlayerProfile profile) {
  final TextEditingController name = TextEditingController(text: profile.name);
  String avatar = profile.avatar;
  bool share = profile.shareArt;
  return showModalBottomSheet<void>(
    context: context,
    isScrollControlled: true,
    showDragHandle: true,
    builder: (BuildContext context) => StatefulBuilder(
      builder: (BuildContext context, StateSetter set) => Padding(
        padding: EdgeInsets.fromLTRB(20, 0, 20, 20 + MediaQuery.viewInsetsOf(context).bottom),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Text(context.tr('board.profile'), style: Theme.of(context).textTheme.titleLarge),
            const SizedBox(height: 6),
            Text(
              context.tr('board.privacy'),
              style: const TextStyle(color: Colors.white70, fontSize: 12.5),
            ),
            const SizedBox(height: 12),
            TextField(
              key: const Key('nicknameField'),
              controller: name,
              maxLength: 16,
              decoration: InputDecoration(
                labelText: context.tr('board.nickname'),
                border: const OutlineInputBorder(),
              ),
            ),
            Wrap(
              spacing: 6,
              children: <Widget>[
                for (final MapEntry<String, String> a in kAvatars.entries)
                  ChoiceChip(
                    key: Key('avatar-${a.key}'),
                    label: Text(a.value, style: const TextStyle(fontSize: 20)),
                    selected: avatar == a.key,
                    onSelected: (_) => set(() => avatar = a.key),
                  ),
              ],
            ),
            SwitchListTile(
              key: const Key('shareArt'),
              contentPadding: EdgeInsets.zero,
              value: share,
              onChanged: (bool v) => set(() => share = v),
              title: Text(context.tr('board.shareArt')),
              subtitle: Text(context.tr('board.shareArtHint')),
            ),
            const SizedBox(height: 8),
            SizedBox(
              width: double.infinity,
              child: FilledButton(
                key: const Key('saveProfile'),
                onPressed: () {
                  unawaited(profile.update(name: name.text, avatar: avatar, shareArt: share));
                  Navigator.of(context).pop();
                },
                child: Text(context.tr('board.save')),
              ),
            ),
          ],
        ),
      ),
    ),
  );
}
