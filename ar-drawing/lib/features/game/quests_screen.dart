import 'package:clock/clock.dart';
import 'package:flutter/material.dart';

import '../../core/app_theme.dart';
import '../../core/game_art.dart';
import '../../core/i18n/language_controller.dart';
import '../teacher/teacher_controller.dart';
import '../teacher/teacher_scope.dart';
import '../teacher/teacher_script.dart';
import '../teacher/widgets/teacher_overlay.dart';
import 'game_store.dart';
import 'goals.dart';
import 'shop_screen.dart' show CoinBadge;

/// Daily quests (three a day + a reward chest) and the badge collection.
class QuestsScreen extends StatefulWidget {
  const QuestsScreen({super.key, this.initialTab = 0});

  /// 0 = quests, 1 = badges.
  final int initialTab;

  @override
  State<QuestsScreen> createState() => _QuestsScreenState();
}

class _QuestsScreenState extends State<QuestsScreen> {
  final TeacherController _teacher = TeacherController();

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) _teacher.introduce(TeacherScope.maybeOf(context), 'quests_intro');
    });
  }

  @override
  void dispose() {
    _teacher.dispose();
    super.dispose();
  }

  void _reward(int coins, String line) {
    _teacher.say(<TeacherLine>[TeacherLine(id: line, mood: 'cheer')]);
    ScaffoldMessenger.of(context)
      ..hideCurrentSnackBar()
      ..showSnackBar(
        SnackBar(
          key: const Key('rewardSnack'),
          backgroundColor: AppTheme.cardHigh,
          content: Row(
            children: <Widget>[
              const ArtImage(GameArt.coin, size: 28),
              const SizedBox(width: 10),
              Text(
                context.tr('game.coinsEarned', args: <String, Object?>{'coins': coins}),
                style: const TextStyle(fontWeight: FontWeight.w800, color: Colors.white),
              ),
            ],
          ),
        ),
      );
  }

  @override
  Widget build(BuildContext context) {
    final GameStore? game = GameScope.maybeOf(context);
    return DefaultTabController(
      length: 2,
      initialIndex: widget.initialTab,
      child: Scaffold(
        appBar: AppBar(
          title: Text(context.tr('quest.title')),
          actions: <Widget>[
            if (game != null)
              Padding(
                padding: const EdgeInsets.only(right: 12),
                child: CoinBadge(coins: game.coins),
              ),
          ],
          bottom: TabBar(
            tabs: <Widget>[
              Tab(key: const Key('tabQuests'), text: context.tr('quest.tabQuests')),
              Tab(key: const Key('tabBadges'), text: context.tr('quest.tabBadges')),
            ],
          ),
        ),
        body: Stack(
          children: <Widget>[
            if (game != null)
              TabBarView(
                children: <Widget>[
                  _QuestList(game: game, onReward: _reward),
                  _BadgeGrid(game: game, onReward: _reward),
                ],
              ),
            Positioned.fill(child: TeacherOverlay(controller: _teacher)),
          ],
        ),
      ),
    );
  }
}

String _questArt(GameEvent e) => switch (e) {
  GameEvent.stroke => GameArt.brush('normal'),
  GameEvent.lessonStep => GameArt.tile('academy'),
  GameEvent.drill => GameArt.energy,
  GameEvent.exam => GameArt.examType('quiz15'),
  GameEvent.examPassed => GameArt.badge('first_exam'),
  GameEvent.excellent => GameArt.badge('excellent'),
  GameEvent.box => GameArt.giftClosed,
  GameEvent.artShared => GameArt.badge('hall'),
  GameEvent.lessonDone => GameArt.tile('academy'),
};

class _QuestList extends StatelessWidget {
  const _QuestList({required this.game, required this.onReward});

  final GameStore game;
  final void Function(int coins, String line) onReward;

  @override
  Widget build(BuildContext context) {
    final List<QuestDef> quests = game.todaysQuests;
    final int done = quests.where(game.questDone).length;
    final DateTime now = clock.now();
    final Duration left = DateTime(now.year, now.month, now.day + 1).difference(now);
    final String time = '${left.inHours}h ${(left.inMinutes % 60).toString().padLeft(2, '0')}m';
    final bool allClaimed = quests.every((QuestDef q) => game.questsClaimed.contains(q.id));
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 160),
      children: <Widget>[
        Wrap(
          spacing: 12,
          runSpacing: 4,
          crossAxisAlignment: WrapCrossAlignment.center,
          children: <Widget>[
            Text(
              context.tr(
                'quest.doneCount',
                args: <String, Object?>{'done': done, 'total': quests.length},
              ),
              style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 16),
            ),
            Row(
              mainAxisSize: MainAxisSize.min,
              children: <Widget>[
                const Icon(Icons.schedule, size: 16, color: Colors.white60),
                const SizedBox(width: 4),
                Text(
                  context.tr('quest.resets', args: <String, Object?>{'time': time}),
                  style: const TextStyle(color: Colors.white60, fontSize: 12.5),
                ),
              ],
            ),
          ],
        ),
        const SizedBox(height: 12),
        for (final QuestDef q in quests) ...<Widget>[
          _QuestCard(game: game, quest: q, onReward: onReward),
          const SizedBox(height: 10),
        ],
        const SizedBox(height: 6),
        Container(
          key: const Key('questBonus'),
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(24),
            gradient: const LinearGradient(colors: <Color>[Color(0xFF5B2A9E), Color(0xFFB0367F)]),
            border: Border.all(color: const Color(0x44FFD27A)),
          ),
          child: Row(
            children: <Widget>[
              ArtImage(game.questBonusClaimed ? GameArt.giftOpen : GameArt.giftClosed, size: 76),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Text(
                      context.tr('quest.bonus'),
                      style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 16),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      context.tr(
                        'quest.bonusHint',
                        args: <String, Object?>{'coins': kQuestBonusCoins},
                      ),
                      style: const TextStyle(color: Color(0xDDFFFFFF), fontSize: 12.5),
                    ),
                    const SizedBox(height: 8),
                    if (game.questBonusClaimed)
                      Text(
                        '✓ ${context.tr('quest.claimed')}',
                        style: const TextStyle(color: AppTheme.gold),
                      )
                    else
                      FilledButton(
                        key: const Key('claimBonus'),
                        onPressed: allClaimed
                            ? () async {
                                if (await game.claimQuestBonus()) {
                                  onReward(kQuestBonusCoins, 'quest_done');
                                }
                              }
                            : null,
                        child: Text(context.tr('quest.bonusClaim')),
                      ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class _QuestCard extends StatelessWidget {
  const _QuestCard({required this.game, required this.quest, required this.onReward});

  final GameStore game;
  final QuestDef quest;
  final void Function(int coins, String line) onReward;

  @override
  Widget build(BuildContext context) {
    final int v = game.questProgress(quest);
    final bool done = v >= quest.target;
    final bool claimed = game.questsClaimed.contains(quest.id);
    return Container(
      key: Key('quest-${quest.id}'),
      padding: const EdgeInsets.fromLTRB(12, 12, 12, 12),
      decoration: BoxDecoration(
        color: AppTheme.card,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: done && !claimed ? AppTheme.lamp : AppTheme.line),
      ),
      child: Row(
        children: <Widget>[
          Container(
            width: 56,
            height: 56,
            decoration: BoxDecoration(
              color: AppTheme.cardHigh,
              borderRadius: BorderRadius.circular(16),
            ),
            alignment: Alignment.center,
            child: ArtImage(_questArt(quest.event), size: 46),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Text(
                  context.tr(quest.titleKey),
                  style: const TextStyle(fontWeight: FontWeight.w800),
                ),
                const SizedBox(height: 8),
                ClipRRect(
                  borderRadius: BorderRadius.circular(8),
                  child: LinearProgressIndicator(
                    value: v / quest.target,
                    minHeight: 8,
                    backgroundColor: const Color(0x22FFFFFF),
                    color: done ? AppTheme.teal : AppTheme.lamp,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  '$v/${quest.target}',
                  style: const TextStyle(color: Colors.white60, fontSize: 12),
                ),
              ],
            ),
          ),
          const SizedBox(width: 10),
          if (claimed)
            const Icon(Icons.check_circle, color: AppTheme.teal, size: 30)
          else if (done)
            FilledButton(
              key: Key('claim-${quest.id}'),
              style: FilledButton.styleFrom(padding: const EdgeInsets.symmetric(horizontal: 14)),
              onPressed: () async {
                if (await game.claimQuest(quest)) {
                  onReward(quest.coins, 'quest_done');
                }
              },
              child: Text('+${quest.coins}'),
            )
          else
            Row(
              mainAxisSize: MainAxisSize.min,
              children: <Widget>[
                const ArtImage(GameArt.coin, size: 22),
                const SizedBox(width: 4),
                Text('${quest.coins}', style: const TextStyle(fontWeight: FontWeight.w800)),
              ],
            ),
        ],
      ),
    );
  }
}

class _BadgeGrid extends StatelessWidget {
  const _BadgeGrid({required this.game, required this.onReward});

  final GameStore game;
  final void Function(int coins, String line) onReward;

  @override
  Widget build(BuildContext context) {
    final int unlocked = kAchievements.where(game.badgeUnlocked).length;
    return CustomScrollView(
      slivers: <Widget>[
        SliverToBoxAdapter(
          child: Padding(
            padding: const EdgeInsets.fromLTRB(16, 16, 16, 4),
            child: Text(
              context.tr(
                'badge.card',
                args: <String, Object?>{'done': unlocked, 'total': kAchievements.length},
              ),
              style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 16),
            ),
          ),
        ),
        SliverPadding(
          padding: const EdgeInsets.fromLTRB(16, 8, 16, 160),
          sliver: SliverGrid(
            gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
              maxCrossAxisExtent: 200,
              mainAxisSpacing: 10,
              crossAxisSpacing: 10,
              childAspectRatio: 0.72,
            ),
            delegate: SliverChildBuilderDelegate(
              (BuildContext context, int i) =>
                  _BadgeCard(game: game, badge: kAchievements[i], onReward: onReward),
              childCount: kAchievements.length,
            ),
          ),
        ),
      ],
    );
  }
}

class _BadgeCard extends StatelessWidget {
  const _BadgeCard({required this.game, required this.badge, required this.onReward});

  final GameStore game;
  final AchievementDef badge;
  final void Function(int coins, String line) onReward;

  @override
  Widget build(BuildContext context) {
    final bool open = game.badgeUnlocked(badge);
    final bool claimed = game.badgesClaimed.contains(badge.id);
    return Container(
      key: Key('badge-${badge.id}'),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: open ? AppTheme.cardHigh : AppTheme.card,
        borderRadius: BorderRadius.circular(22),
        border: Border.all(color: open && !claimed ? AppTheme.lamp : AppTheme.line),
      ),
      child: Column(
        children: <Widget>[
          Expanded(child: ArtImage(badge.art, size: 92, locked: !open)),
          Text(
            context.tr(badge.titleKey),
            textAlign: TextAlign.center,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            style: const TextStyle(fontWeight: FontWeight.w800),
          ),
          const SizedBox(height: 2),
          Text(
            context.tr(badge.hintKey),
            textAlign: TextAlign.center,
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
            style: const TextStyle(color: Colors.white60, fontSize: 11.5, height: 1.2),
          ),
          const SizedBox(height: 8),
          SizedBox(
            height: 36,
            child: claimed
                ? Center(
                    child: Text(
                      '✓ ${context.tr('badge.claimed')}',
                      style: const TextStyle(color: AppTheme.teal, fontWeight: FontWeight.w700),
                    ),
                  )
                : open
                ? FilledButton(
                    key: Key('claimBadge-${badge.id}'),
                    style: FilledButton.styleFrom(
                      padding: const EdgeInsets.symmetric(horizontal: 12),
                    ),
                    onPressed: () async {
                      if (await game.claimBadge(badge)) {
                        onReward(badge.coins, 'badge_unlocked');
                      }
                    },
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: <Widget>[
                        const ArtImage(GameArt.coin, size: 18),
                        const SizedBox(width: 4),
                        Text('+${badge.coins}'),
                      ],
                    ),
                  )
                : Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      ClipRRect(
                        borderRadius: BorderRadius.circular(6),
                        child: LinearProgressIndicator(
                          value: game.badgeProgress(badge) / badge.target,
                          minHeight: 6,
                          backgroundColor: const Color(0x22FFFFFF),
                        ),
                      ),
                      const SizedBox(height: 3),
                      Text(
                        context.tr(
                          'badge.progress',
                          args: <String, Object?>{
                            'value': game.badgeProgress(badge),
                            'target': badge.target,
                          },
                        ),
                        style: const TextStyle(color: Colors.white54, fontSize: 11),
                      ),
                    ],
                  ),
          ),
        ],
      ),
    );
  }
}
