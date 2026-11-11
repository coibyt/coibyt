import 'package:flutter/material.dart';

/// Template categories shown on the home screen.
enum TemplateCategory {
  animals(Icons.pets),
  anime(Icons.auto_awesome),
  chibi(Icons.face_retouching_natural),
  cars(Icons.directions_car_filled),
  flowers(Icons.local_florist),
  food(Icons.icecream);

  const TemplateCategory(this.icon);

  final IconData icon;

  /// Translation key of the category name.
  String get labelKey => 'category.$name';
}

enum Difficulty {
  easy(1),
  medium(2),
  hard(3);

  const Difficulty(this.level);

  final int level;

  String get labelKey => 'difficulty.$name';
}

/// One picture of the bundled template library.
@immutable
class DrawingTemplate {
  const DrawingTemplate({
    required this.id,
    required this.category,
    required this.difficulty,
    this.premium = false,
  });

  final String id;
  final TemplateCategory category;
  final Difficulty difficulty;

  /// Will be unlocked by the in-app purchase (later phase). Until then all
  /// templates are usable and premium ones only show a badge.
  final bool premium;

  String get asset => 'assets/templates/${category.name}/$id.png';

  /// Translation key of the template's display name.
  String get nameKey => 'template.$id';
}

/// All bundled templates. Pictures are original line-art generated for
/// TraceLight (see branding/ASSETS.md).
const List<DrawingTemplate> kTemplates = <DrawingTemplate>[
  DrawingTemplate(id: 'fox_cub', category: TemplateCategory.animals, difficulty: Difficulty.easy),
  DrawingTemplate(
    id: 'owl_branch',
    category: TemplateCategory.animals,
    difficulty: Difficulty.easy,
  ),
  DrawingTemplate(
    id: 'kitten_yarn',
    category: TemplateCategory.animals,
    difficulty: Difficulty.medium,
  ),
  DrawingTemplate(
    id: 'sea_turtle',
    category: TemplateCategory.animals,
    difficulty: Difficulty.medium,
    premium: true,
  ),
  DrawingTemplate(
    id: 'boy_headphones',
    category: TemplateCategory.anime,
    difficulty: Difficulty.medium,
  ),
  DrawingTemplate(id: 'girl_wind', category: TemplateCategory.anime, difficulty: Difficulty.hard),
  DrawingTemplate(
    id: 'little_witch',
    category: TemplateCategory.anime,
    difficulty: Difficulty.hard,
    premium: true,
  ),
  DrawingTemplate(
    id: 'young_swordsman',
    category: TemplateCategory.anime,
    difficulty: Difficulty.hard,
    premium: true,
  ),
  DrawingTemplate(id: 'hoodie_girl', category: TemplateCategory.chibi, difficulty: Difficulty.easy),
  DrawingTemplate(id: 'knight', category: TemplateCategory.chibi, difficulty: Difficulty.easy),
  DrawingTemplate(id: 'chef', category: TemplateCategory.chibi, difficulty: Difficulty.easy),
  DrawingTemplate(
    id: 'astronaut',
    category: TemplateCategory.chibi,
    difficulty: Difficulty.medium,
    premium: true,
  ),
  DrawingTemplate(
    id: 'vintage_car',
    category: TemplateCategory.cars,
    difficulty: Difficulty.medium,
  ),
  DrawingTemplate(
    id: 'sports_coupe',
    category: TemplateCategory.cars,
    difficulty: Difficulty.medium,
  ),
  DrawingTemplate(
    id: 'monster_truck',
    category: TemplateCategory.cars,
    difficulty: Difficulty.hard,
    premium: true,
  ),
  DrawingTemplate(
    id: 'race_car',
    category: TemplateCategory.cars,
    difficulty: Difficulty.hard,
    premium: true,
  ),
  DrawingTemplate(id: 'rose', category: TemplateCategory.flowers, difficulty: Difficulty.easy),
  DrawingTemplate(
    id: 'succulent_pot',
    category: TemplateCategory.flowers,
    difficulty: Difficulty.easy,
  ),
  DrawingTemplate(
    id: 'sunflower',
    category: TemplateCategory.flowers,
    difficulty: Difficulty.medium,
  ),
  DrawingTemplate(
    id: 'blossom_branch',
    category: TemplateCategory.flowers,
    difficulty: Difficulty.medium,
    premium: true,
  ),
  DrawingTemplate(id: 'bubble_tea', category: TemplateCategory.food, difficulty: Difficulty.easy),
  DrawingTemplate(id: 'cupcake', category: TemplateCategory.food, difficulty: Difficulty.easy),
  DrawingTemplate(id: 'shortcake', category: TemplateCategory.food, difficulty: Difficulty.medium),
  DrawingTemplate(
    id: 'ramen_bowl',
    category: TemplateCategory.food,
    difficulty: Difficulty.medium,
    premium: true,
  ),
];
