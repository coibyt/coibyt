import 'package:flutter_test/flutter_test.dart';
import 'package:toan_lop_4/app_state.dart';
import 'package:toan_lop_4/logic/missions.dart';
import 'package:toan_lop_4/models/progress.dart';
import 'package:toan_lop_4/services/content_repository.dart';
import 'package:toan_lop_4/services/kv_store.dart';

void main() {
  test('nhiệm vụ: đếm tiến độ, nhận vàng 1 lần, đủ 3 nhiệm vụ mới mở rương', () {
    final m = DailyMissions(day: '2026-11-11');
    m.record(correct: 9, stars: 3);
    expect(m.isDone(Missions.threeStars), isTrue);
    expect(m.isDone(Missions.lessons), isFalse);
    expect(m.claim(Missions.lessons.id), 0, reason: 'chưa xong thì chưa nhận');
    expect(m.claim(Missions.threeStars.id), Missions.threeStars.coins);
    expect(m.claim(Missions.threeStars.id), 0, reason: 'không nhận 2 lần');
    m.record(correct: 7);
    expect(m.claim(Missions.lessons.id), Missions.lessons.coins);
    expect(m.chestReady, isFalse);
    expect(m.claim(Missions.correct.id), Missions.correct.coins);
    expect(m.chestReady, isTrue);
    final back = DailyMissions.fromJson(m.toJson());
    expect(back.chestReady, isTrue);
    expect(back.progressOf(Missions.correct), Missions.correct.goal);
  });

  test('AppState: sang ngày mới thì nhiệm vụ làm lại; rương cộng vàng + mảnh ghép', () async {
    var now = DateTime(2026, 11, 11, 9);
    final store = MemoryStore();
    final s = AppState(content: ContentRepository(), store: store, clock: () => now);
    s.progress = Progress();
    s.missions
      ..record(correct: 20, stars: 3)
      ..record(correct: 0);
    for (final m in Missions.all) {
      await s.claimMission(m.id);
    }
    expect(s.progress.coins, 35);
    expect(await s.openMissionChest(), (Missions.chestCoins, Missions.chestShards));
    expect(await s.openMissionChest(), (0, 0), reason: 'mỗi ngày mở 1 lần');
    expect(s.progress.coins, 35 + Missions.chestCoins);
    expect(s.progress.shards, Missions.chestShards);
    now = DateTime(2026, 11, 12, 8);
    expect(s.missions.day, '2026-11-12');
    expect(s.missions.claimed, isEmpty);
  });
}
