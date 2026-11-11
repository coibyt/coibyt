import 'dart:math';

import 'package:flutter/material.dart';

import '../app_state.dart';
import '../logic/economy.dart';
import 'app_theme.dart';
import 'widgets/big_button.dart';
import 'widgets/game_widgets.dart';

/// Cửa hàng: quay thẻ thú cưng, trang phục cô Ong, bộ sưu tập.
/// Chỉ dùng đồng vàng kiếm được khi học — không có mua bằng tiền thật ở đây.
class ShopScreen extends StatelessWidget {
  const ShopScreen({super.key, this.random});

  final Random? random;

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    return DefaultTabController(
      length: 3,
      child: Scaffold(
        appBar: AppBar(
          backgroundColor: AppColors.cream,
          title: const Text('Cửa hàng'),
          actions: [
            Padding(
              padding: const EdgeInsets.only(right: 12),
              child: Center(
                child: CoinChip(key: const ValueKey('shop-coins'), coins: app.progress.coins),
              ),
            ),
          ],
          bottom: const TabBar(
            labelStyle: TextStyle(fontSize: 17, fontWeight: FontWeight.w700, fontFamily: 'Andika'),
            tabs: [
              Tab(key: ValueKey('tab-spin'), text: 'Quay thẻ'),
              Tab(key: ValueKey('tab-outfit'), text: 'Trang phục'),
              Tab(key: ValueKey('tab-pets'), text: 'Bộ sưu tập'),
            ],
          ),
        ),
        body: TabBarView(
          children: [
            _SpinTab(random: random ?? Random()),
            const _OutfitTab(),
            const _CollectionTab(),
          ],
        ),
      ),
    );
  }
}

class _SpinTab extends StatefulWidget {
  const _SpinTab({required this.random});

  final Random random;

  @override
  State<_SpinTab> createState() => _SpinTabState();
}

class _SpinTabState extends State<_SpinTab> {
  bool _spinning = false;

  Future<void> _spin(AppState app) async {
    setState(() => _spinning = true);
    await Future<void>.delayed(const Duration(milliseconds: 700)); // hồi hộp một chút
    if (!mounted) return;
    final r = await app.spinPet(widget.random);
    if (!mounted) return;
    setState(() => _spinning = false);
    await showDialog<void>(
      context: context,
      builder: (context) => AlertDialog(
        key: const ValueKey('spin-result'),
        backgroundColor: AppColors.cream,
        title: Text(r.isNew ? 'Thú cưng mới!' : 'Bạn cũ quay lại!', textAlign: TextAlign.center),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TweenAnimationBuilder<double>(
              tween: Tween(begin: 0.3, end: 1),
              duration: const Duration(milliseconds: 500),
              curve: Curves.elasticOut,
              builder: (context, v, child) => Transform.scale(scale: v, child: child),
              child: Text(r.pet.emoji, style: const TextStyle(fontSize: 90)),
            ),
            Text(r.pet.name, style: const TextStyle(fontSize: 26, fontWeight: FontWeight.w700)),
            Text(r.pet.rarity.label, style: TextStyle(fontSize: 18, color: _rarityColor(r.pet.rarity))),
            if (!r.isNew) Text('Con nhận ${r.shardsGained} mảnh ghép 🧩', style: const TextStyle(fontSize: 18)),
          ],
        ),
        actions: [FilledButton(onPressed: () => Navigator.pop(context), child: const Text('Tuyệt!'))],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    final p = app.progress;
    final canSpin = p.coins >= Economy.spinCost && !_spinning;
    return ListView(
      padding: const EdgeInsets.all(20),
      children: [
        Center(
          child: AnimatedRotation(
            turns: _spinning ? 2 : 0,
            duration: const Duration(milliseconds: 700),
            child: const Text('🎁', style: TextStyle(fontSize: 100)),
          ),
        ),
        const SizedBox(height: 8),
        BigButton(
          key: const ValueKey('btn-spin'),
          label: 'Quay thẻ (🪙 ${Economy.spinCost})',
          color: const Color(0xFFFF6FB5),
          onPressed: canSpin ? () => _spin(app) : null,
        ),
        if (p.coins < Economy.spinCost)
          Padding(
            padding: const EdgeInsets.only(top: 8),
            child: Text(
              'Con cần thêm ${Economy.spinCost - p.coins} vàng. Học bài và làm đề để kiếm vàng nhé!',
              textAlign: TextAlign.center,
              style: const TextStyle(fontSize: 17, color: Colors.black54),
            ),
          ),
        const SizedBox(height: 18),
        _ShardBox(app: app),
        const SizedBox(height: 18),
        // Công khai tỉ lệ ra thẻ.
        Container(
          key: const ValueKey('odds-table'),
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(18)),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text('Tỉ lệ ra thẻ', style: TextStyle(fontSize: 19, fontWeight: FontWeight.w700)),
              for (final r in Rarity.values)
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: 3),
                  child: Row(
                    children: [
                      Container(
                        width: 12,
                        height: 12,
                        decoration: BoxDecoration(color: _rarityColor(r), shape: BoxShape.circle),
                      ),
                      const SizedBox(width: 8),
                      Expanded(child: Text(r.label, style: const TextStyle(fontSize: 17))),
                      Text('${r.percent}%', style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w700)),
                    ],
                  ),
                ),
              const SizedBox(height: 4),
              const Text(
                'Trùng thẻ được 5 mảnh ghép. Đủ 30 mảnh: con tự chọn thú cưng mình thích.',
                style: TextStyle(fontSize: 14, color: Colors.black54),
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class _ShardBox extends StatelessWidget {
  const _ShardBox({required this.app});

  final AppState app;

  @override
  Widget build(BuildContext context) {
    final p = app.progress;
    final missing = [
      for (final pet in allPets)
        if ((p.pets[pet.id] ?? 0) == 0) pet,
    ];
    final enough = p.shards >= Economy.shardsToChoose;
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(color: AppColors.skySoft, borderRadius: BorderRadius.circular(18)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            '🧩 Mảnh ghép: ${p.shards}/${Economy.shardsToChoose}',
            key: const ValueKey('shards'),
            style: const TextStyle(fontSize: 19, fontWeight: FontWeight.w700),
          ),
          const SizedBox(height: 6),
          ClipRRect(
            borderRadius: BorderRadius.circular(8),
            child: LinearProgressIndicator(
              value: (p.shards / Economy.shardsToChoose).clamp(0, 1),
              minHeight: 12,
              color: AppColors.sky,
              backgroundColor: Colors.white,
            ),
          ),
          if (enough && missing.isNotEmpty) ...[
            const SizedBox(height: 8),
            const Text('Con đủ mảnh rồi! Chọn một bạn mới:', style: TextStyle(fontSize: 17)),
            Wrap(
              spacing: 8,
              children: [
                for (final pet in missing)
                  ActionChip(
                    key: ValueKey('choose-${pet.id}'),
                    label: Text('${pet.emoji} ${pet.name}', style: const TextStyle(fontSize: 16)),
                    onPressed: () => app.choosePet(pet.id),
                  ),
              ],
            ),
          ],
        ],
      ),
    );
  }
}

class _OutfitTab extends StatelessWidget {
  const _OutfitTab();

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    final p = app.progress;
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Center(
          child: TutorAvatar(size: 120, outfit: p.outfit, companion: p.companion),
        ),
        const SizedBox(height: 12),
        for (final o in allOutfits)
          Card(
            color: Colors.white,
            child: ListTile(
              key: ValueKey('outfit-${o.id}'),
              leading: Text(o.emoji, style: const TextStyle(fontSize: 34)),
              title: Text(o.name, style: const TextStyle(fontSize: 19, fontWeight: FontWeight.w700)),
              subtitle: Text(p.outfits.contains(o.id) ? 'Đã có' : '🪙 ${o.price}'),
              trailing: p.outfits.contains(o.id)
                  ? (p.outfit == o.id
                        ? OutlinedButton(onPressed: () => app.wearOutfit(null), child: const Text('Cởi ra'))
                        : FilledButton(onPressed: () => app.wearOutfit(o.id), child: const Text('Mặc')))
                  : FilledButton(
                      key: ValueKey('buy-${o.id}'),
                      onPressed: p.coins >= o.price ? () => app.buyTutorOutfit(o.id) : null,
                      child: const Text('Mua'),
                    ),
            ),
          ),
      ],
    );
  }
}

class _CollectionTab extends StatelessWidget {
  const _CollectionTab();

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    final p = app.progress;
    final owned = allPets.where((pet) => (p.pets[pet.id] ?? 0) > 0).length;
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Text(
          'Con đã có $owned/${allPets.length} bạn',
          textAlign: TextAlign.center,
          style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w700),
        ),
        const Text(
          'Chạm vào một bạn để bạn ấy đi cùng con.',
          textAlign: TextAlign.center,
          style: TextStyle(fontSize: 15, color: Colors.black54),
        ),
        const SizedBox(height: 12),
        Wrap(
          spacing: 10,
          runSpacing: 10,
          alignment: WrapAlignment.center,
          children: [
            for (final pet in allPets)
              _PetCard(
                emoji: pet.emoji,
                name: (p.pets[pet.id] ?? 0) > 0 ? pet.name : '???',
                rarity: pet.rarity,
                owned: (p.pets[pet.id] ?? 0) > 0,
                selected: p.companion == pet.id,
                onTap: (p.pets[pet.id] ?? 0) > 0 ? () => app.setCompanion(pet.id) : null,
                key: ValueKey('pet-${pet.id}'),
              ),
          ],
        ),
      ],
    );
  }
}

class _PetCard extends StatelessWidget {
  const _PetCard({
    super.key,
    required this.emoji,
    required this.name,
    required this.rarity,
    required this.owned,
    required this.selected,
    required this.onTap,
  });

  final String emoji;
  final String name;
  final Rarity rarity;
  final bool owned;
  final bool selected;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: owned ? Colors.white : Colors.black.withValues(alpha: 0.05),
      borderRadius: BorderRadius.circular(18),
      child: InkWell(
        borderRadius: BorderRadius.circular(18),
        onTap: onTap,
        child: Container(
          width: 100,
          height: 120,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(18),
            border: Border.all(color: selected ? AppColors.sky : _rarityColor(rarity), width: selected ? 4 : 2),
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              owned
                  ? Text(emoji, style: const TextStyle(fontSize: 46))
                  : const Icon(Icons.help_outline_rounded, size: 46, color: Colors.black26),
              Text(
                name,
                textAlign: TextAlign.center,
                style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w700),
              ),
              Text(rarity.label, style: TextStyle(fontSize: 12, color: _rarityColor(rarity))),
            ],
          ),
        ),
      ),
    );
  }
}

Color _rarityColor(Rarity r) => switch (r) {
  Rarity.common => const Color(0xFF8D99AE),
  Rarity.rare => AppColors.sky,
  Rarity.epic => AppColors.vip,
  Rarity.legendary => const Color(0xFFFF9F1C),
};
