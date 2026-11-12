import 'dart:math';

import '../models/progress.dart';

/// Kinh tế trò chơi — thiết kế cho trẻ 9–10 tuổi:
/// - Mọi phần thưởng CHỈ kiếm được bằng cách học. Không bán vàng/tim bằng tiền thật.
/// - Tim chỉ dùng trong phòng thi; hết tim thì ôn bài (vẫn là học) hoặc đợi. Luyện tập luôn mở.
/// - Quay thẻ công khai tỉ lệ; thẻ trùng thành mảnh ghép, đủ mảnh thì TỰ CHỌN thú cưng.
abstract final class Economy {
  static const maxHearts = 5;
  static const heartRegenMinutes = 30;

  /// Bài luyện tập đạt ≥ 60% câu đúng hồi bấy nhiêu tim.
  static const heartsPerGoodPractice = 2;
  static const spinCost = 100;
  static const shardsPerDuplicate = 5;
  static const shardsToChoose = 30;
}

enum Rarity {
  common('Thường', 60),
  rare('Hiếm', 30),
  epic('Siêu hiếm', 9),
  legendary('Huyền thoại', 1);

  const Rarity(this.label, this.percent);

  final String label;

  /// Tỉ lệ ra (%), hiện công khai trong cửa hàng.
  final int percent;
}

class PetDef {
  const PetDef(this.id, this.name, this.emoji, this.rarity);

  final String id;
  final String name;
  final String emoji;
  final Rarity rarity;
}

const allPets = [
  PetDef('cun', 'Cún Bông', '🐶', Rarity.common),
  PetDef('meo', 'Mèo Mướp', '🐱', Rarity.common),
  PetDef('tho', 'Thỏ Trắng', '🐰', Rarity.common),
  PetDef('ga', 'Gà Con', '🐥', Rarity.common),
  PetDef('hamster', 'Chuột Hamster', '🐹', Rarity.common),
  PetDef('cao', 'Cáo Lửa', '🦊', Rarity.rare),
  PetDef('gautruc', 'Gấu Trúc', '🐼', Rarity.rare),
  PetDef('gautui', 'Gấu Túi', '🐨', Rarity.rare),
  PetDef('canhcut', 'Chim Cánh Cụt', '🐧', Rarity.rare),
  PetDef('cu', 'Cú Thông Thái', '🦉', Rarity.epic),
  PetDef('caheo', 'Cá Heo', '🐬', Rarity.epic),
  PetDef('kylan', 'Kỳ Lân', '🦄', Rarity.legendary),
  PetDef('rong', 'Rồng Con', '🐲', Rarity.legendary),
];

PetDef? petById(String? id) {
  for (final p in allPets) {
    if (p.id == id) return p;
  }
  return null;
}

/// Trang phục cho cô Ong (mua thẳng, giá cố định, không ngẫu nhiên).
class OutfitDef {
  const OutfitDef(this.id, this.name, this.emoji, this.price);

  final String id;
  final String name;
  final String emoji;
  final int price;
}

const allOutfits = [
  OutfitDef('no_hong', 'Nơ hồng', '🎀', 80),
  OutfitDef('kinh', 'Kính tròn', '👓', 120),
  OutfitDef('mu_tot_nghiep', 'Mũ tốt nghiệp', '🎓', 150),
  OutfitDef('mu_phu_thuy', 'Mũ phù thuỷ', '🧙', 200),
  OutfitDef('vuong_mien', 'Vương miện', '👑', 300),
];

OutfitDef? outfitById(String? id) {
  for (final o in allOutfits) {
    if (o.id == id) return o;
  }
  return null;
}

/// Kết quả một lượt quay thẻ.
class SpinResult {
  const SpinResult({required this.pet, required this.isNew, required this.shardsGained});

  final PetDef pet;
  final bool isNew;
  final int shardsGained;
}

class NotEnoughCoins implements Exception {
  const NotEnoughCoins();
}

// ---------------------------------------------------------------------------
// Tim
// ---------------------------------------------------------------------------

/// Hồi tim theo thời gian: +1 mỗi 30 phút, tối đa 5.
void regenHearts(Progress p, DateTime now) {
  if (p.hearts >= Economy.maxHearts) {
    p.heartsAt = null;
    return;
  }
  final since = p.heartsAt ?? now;
  final gained = now.difference(since).inMinutes ~/ Economy.heartRegenMinutes;
  if (p.heartsAt == null) {
    p.heartsAt = now;
  } else if (gained > 0) {
    p.hearts = min(Economy.maxHearts, p.hearts + gained);
    p.heartsAt = p.hearts >= Economy.maxHearts
        ? null
        : since.add(Duration(minutes: gained * Economy.heartRegenMinutes));
  }
}

/// Còn bao lâu nữa có thêm 1 tim (null nếu đầy).
Duration? nextHeartIn(Progress p, DateTime now) {
  if (p.hearts >= Economy.maxHearts || p.heartsAt == null) return null;
  final due = p.heartsAt!.add(const Duration(minutes: Economy.heartRegenMinutes));
  final left = due.difference(now);
  return left.isNegative ? Duration.zero : left;
}

/// Mất tim sau bài thi: mỗi câu sai mất 1 tim (không xuống dưới 0). Trả về số tim mất.
int loseHeartsForExam(Progress p, int wrongCount, DateTime now) {
  final lost = min(p.hearts, wrongCount);
  if (lost > 0) {
    if (p.hearts >= Economy.maxHearts) p.heartsAt = now;
    p.hearts -= lost;
  }
  return lost;
}

/// Ôn bài tốt (≥ 60% đúng) thì hồi tim. Trả về số tim hồi.
int restoreHeartsForPractice(Progress p, {required int correct, required int total}) {
  if (total == 0 || correct / total < 0.6 || p.hearts >= Economy.maxHearts) return 0;
  final before = p.hearts;
  p.hearts = min(Economy.maxHearts, p.hearts + Economy.heartsPerGoodPractice);
  if (p.hearts >= Economy.maxHearts) p.heartsAt = null;
  return p.hearts - before;
}

// ---------------------------------------------------------------------------
// Vàng, mảnh ghép
// ---------------------------------------------------------------------------

/// Vàng từ luyện tập = nửa số điểm thưởng (điểm thưởng đã chống "cày").
int coinsForPractice(int pointsEarned) => pointsEarned ~/ 2;

/// Vàng và mảnh ghép từ bài thi. [improved] = lần đầu hoặc vượt điểm cao nhất cũ.
(int coins, int shards) examRewards({required int score, required int pointsEarned, required bool improved}) {
  var coins = pointsEarned * 2;
  if (score >= 8 && improved) coins += 50;
  final shards = score >= 9 && improved ? 2 : 0;
  return (coins, shards);
}

// ---------------------------------------------------------------------------
// Quay thẻ, đổi mảnh, mua trang phục
// ---------------------------------------------------------------------------

Rarity rollRarity(Random r) {
  var x = r.nextInt(100);
  for (final rarity in Rarity.values) {
    if (x < rarity.percent) return rarity;
    x -= rarity.percent;
  }
  return Rarity.common;
}

SpinResult spin(Progress p, Random r) {
  if (p.coins < Economy.spinCost) throw const NotEnoughCoins();
  p.coins -= Economy.spinCost;
  final rarity = rollRarity(r);
  final pool = [
    for (final pet in allPets)
      if (pet.rarity == rarity) pet,
  ];
  final pet = pool[r.nextInt(pool.length)];
  final isNew = (p.pets[pet.id] ?? 0) == 0;
  p.pets[pet.id] = (p.pets[pet.id] ?? 0) + 1;
  final shards = isNew ? 0 : Economy.shardsPerDuplicate;
  p.shards += shards;
  p.companion ??= pet.id;
  return SpinResult(pet: pet, isNew: isNew, shardsGained: shards);
}

/// Đổi 30 mảnh ghép lấy một thú cưng CHƯA có, bé tự chọn.
bool choosePetWithShards(Progress p, String petId) {
  final pet = petById(petId);
  if (pet == null || p.shards < Economy.shardsToChoose || (p.pets[petId] ?? 0) > 0) return false;
  p.shards -= Economy.shardsToChoose;
  p.pets[petId] = 1;
  return true;
}

bool buyOutfit(Progress p, String outfitId) {
  final o = outfitById(outfitId);
  if (o == null || p.outfits.contains(outfitId) || p.coins < o.price) return false;
  p.coins -= o.price;
  p.outfits.add(outfitId);
  p.outfit = outfitId;
  return true;
}

// ---------------------------------------------------------------------------
// Giữ lửa
// ---------------------------------------------------------------------------

/// Thứ Hai đầu tuần (để giới hạn 1 lượt giữ lửa mỗi tuần).
DateTime _monday(DateTime d) => DateTime(d.year, d.month, d.day - (d.weekday - 1));

bool freezeAvailableThisWeek(Progress p, DateTime now) {
  final monday = _monday(now);
  return !p.freezeDays.any((k) => !DateTime.parse(k).isBefore(monday));
}

/// Khi bé quay lại sau đúng 1 ngày nghỉ: tự dùng lượt giữ lửa của tuần (nếu còn)
/// để không mất chuỗi. Trả về true nếu vừa giữ lửa.
bool applyStreakFreeze(Progress p, DateTime now) {
  final today = DateTime(now.year, now.month, now.day);
  final yesterday = DateTime(today.year, today.month, today.day - 1);
  final before = DateTime(today.year, today.month, today.day - 2);
  bool kept(DateTime d) => p.activeDays.contains(dayKey(d)) || p.freezeDays.contains(dayKey(d));
  if (kept(yesterday) || !kept(before)) return false;
  if (!freezeAvailableThisWeek(p, yesterday)) return false;
  p.freezeDays.add(dayKey(yesterday));
  return true;
}

/// Ngọn lửa lớn dần theo chuỗi ngày: 0 tắt, 1 nhỏ … 4 rất lớn.
int flameLevel(int streak) => switch (streak) {
  0 => 0,
  < 3 => 1,
  < 7 => 2,
  < 14 => 3,
  _ => 4,
};
