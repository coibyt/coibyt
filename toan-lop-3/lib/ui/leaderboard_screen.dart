import 'package:flutter/material.dart';

import '../app_state.dart';
import '../logic/leaderboard.dart';
import 'app_theme.dart';

/// Thẻ danh hiệu: Tập sự → Học giả → Thần đồng (mỗi bậc I–III).
class RankCard extends StatelessWidget {
  const RankCard({super.key, required this.rank});

  final RankInfo rank;

  @override
  Widget build(BuildContext context) {
    return Container(
      key: const ValueKey('rank-card'),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(20)),
      child: Row(
        children: [
          Text(rank.tier.emoji, style: const TextStyle(fontSize: 40)),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Danh hiệu: ${rank.title}',
                  key: const ValueKey('rank-title'),
                  style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w700),
                ),
                const SizedBox(height: 4),
                ExcludeSemantics(
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(8),
                    child: LinearProgressIndicator(
                      value: rank.progress,
                      minHeight: 10,
                      color: AppColors.vip,
                      backgroundColor: const Color(0xFFEDE7DA),
                    ),
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  rank.isMax
                      ? 'Con đã đạt danh hiệu cao nhất!'
                      : 'Thêm ${rank.pointsToNext} điểm để lên ${rank.nextTitle}',
                  style: const TextStyle(fontSize: 15, color: Colors.black54),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class LeaderboardScreen extends StatelessWidget {
  const LeaderboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          backgroundColor: AppColors.cream,
          title: const Text('Bảng xếp hạng'),
          bottom: const TabBar(
            labelStyle: TextStyle(fontSize: 18, fontWeight: FontWeight.w700, fontFamily: 'Andika'),
            tabs: [
              Tab(key: ValueKey('tab-week'), text: 'Tuần này'),
              Tab(key: ValueKey('tab-month'), text: 'Tháng này'),
            ],
          ),
        ),
        body: const TabBarView(
          children: [
            _Board(period: LeaderboardPeriod.week),
            _Board(period: LeaderboardPeriod.month),
          ],
        ),
      ),
    );
  }
}

class _Board extends StatefulWidget {
  const _Board({required this.period});

  final LeaderboardPeriod period;

  @override
  State<_Board> createState() => _BoardState();
}

class _BoardState extends State<_Board> {
  Future<LeaderboardData>? _data;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _data ??= AppScope.read(context).loadLeaderboard(widget.period);
  }

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    return FutureBuilder<LeaderboardData>(
      future: _data,
      builder: (context, snap) {
        if (!snap.hasData) return const Center(child: CircularProgressIndicator());
        final d = snap.data!;
        return Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 640),
            child: ListView(
              padding: const EdgeInsets.all(16),
              children: [
                if (d.isDemo)
                  Container(
                    key: const ValueKey('demo-note'),
                    margin: const EdgeInsets.only(bottom: 12),
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(color: AppColors.skySoft, borderRadius: BorderRadius.circular(16)),
                    child: const Text(
                      'Bảng xếp hạng THỬ: các bạn trong bảng là dữ liệu mẫu. '
                      'Khi bố mẹ đăng nhập tài khoản, con sẽ thi đua với các bạn thật.',
                      style: TextStyle(fontSize: 15),
                    ),
                  ),
                RankCard(rank: app.rank),
                const SizedBox(height: 12),
                _MeCard(data: d),
                const SizedBox(height: 12),
                Text(
                  d.period == LeaderboardPeriod.week
                      ? 'Top 50 Thần đồng Toán học tuần này'
                      : 'Top 50 Thần đồng Toán học tháng này',
                  style: const TextStyle(fontSize: 19, fontWeight: FontWeight.w700),
                ),
                const SizedBox(height: 6),
                for (final e in d.entries) _Row(entry: e),
                if (d.entries.isEmpty)
                  const Padding(
                    padding: EdgeInsets.all(16),
                    child: Text('Chưa có ai ghi điểm. Con hãy là người đầu tiên!', textAlign: TextAlign.center),
                  ),
              ],
            ),
          ),
        );
      },
    );
  }
}

class _MeCard extends StatelessWidget {
  const _MeCard({required this.data});

  final LeaderboardData data;

  @override
  Widget build(BuildContext context) {
    final String line;
    if (!data.optedIn) {
      line = 'Bố mẹ đã tắt bảng xếp hạng cho con.';
    } else if (data.myRank == null) {
      line = 'Con chưa có điểm trong kỳ này. Làm một bài để vào bảng nhé!';
    } else if (data.above == null) {
      line = 'Con đang đứng đầu! Giữ vững phong độ nhé! 🏆';
    } else {
      line = 'Thêm ${data.gapToAbove} điểm là con vượt ${data.above!.nickname}!';
    }
    return Container(
      key: const ValueKey('me-card'),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: AppColors.honeySoft,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppColors.honey, width: 3),
      ),
      child: Row(
        children: [
          CircleAvatar(
            radius: 26,
            backgroundColor: AppColors.honey,
            child: Text(
              data.myRank == null ? '–' : '#${data.myRank}',
              style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w700, color: AppColors.ink),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('${data.myNickname} (con)', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
                Text('${data.myPoints} điểm', style: const TextStyle(fontSize: 16)),
                Text(
                  line,
                  key: const ValueKey('gap-text'),
                  style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w700),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _Row extends StatelessWidget {
  const _Row({required this.entry});

  final LeaderboardEntry entry;

  @override
  Widget build(BuildContext context) {
    final medal = switch (entry.rank) {
      1 => '🥇',
      2 => '🥈',
      3 => '🥉',
      _ => null,
    };
    return Container(
      margin: const EdgeInsets.only(bottom: 6),
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      decoration: BoxDecoration(
        color: entry.isMe ? AppColors.honeySoft : Colors.white,
        borderRadius: BorderRadius.circular(14),
        border: entry.isMe ? Border.all(color: AppColors.honey, width: 2) : null,
      ),
      child: Row(
        children: [
          SizedBox(
            width: 40,
            child: medal != null
                ? Text(medal, style: const TextStyle(fontSize: 24))
                : Text('${entry.rank}', style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w700)),
          ),
          Expanded(
            child: Text(
              entry.isMe ? '${entry.nickname} (con)' : entry.nickname,
              style: TextStyle(fontSize: 17, fontWeight: entry.isMe ? FontWeight.w700 : FontWeight.w400),
            ),
          ),
          Text('${entry.points}', style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w700)),
        ],
      ),
    );
  }
}
