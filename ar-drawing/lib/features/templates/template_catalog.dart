import 'package:flutter/material.dart';

/// Template categories shown on the home screen.
enum TemplateCategory {
  animals('Animals', Icons.pets),
  anime('Anime', Icons.auto_awesome),
  chibi('Chibi', Icons.face_retouching_natural),
  cars('Cars', Icons.directions_car_filled),
  flowers('Flowers', Icons.local_florist),
  food('Cute food', Icons.icecream);

  const TemplateCategory(this.label, this.icon);

  final String label;
  final IconData icon;
}

enum Difficulty {
  easy('Easy', 1),
  medium('Medium', 2),
  hard('Hard', 3);

  const Difficulty(this.label, this.level);

  final String label;
  final int level;
}

/// One picture of the bundled template library.
@immutable
class DrawingTemplate {
  const DrawingTemplate({
    required this.id,
    required this.name,
    required this.category,
    required this.difficulty,
    this.premium = false,
  });

  final String id;
  final String name;
  final TemplateCategory category;
  final Difficulty difficulty;

  /// Will be unlocked by the in-app purchase (later phase). Until then all
  /// templates are usable and premium ones only show a badge.
  final bool premium;

  String get asset => 'assets/templates/${category.name}/$id.png';
}

/// All bundled templates. Pictures are original line-art generated for
/// TraceLight (see branding/ASSETS.md).
const List<DrawingTemplate> kTemplates = <DrawingTemplate>[
  DrawingTemplate(
    id: 'fox_cub',
    name: 'Fox cub',
    category: TemplateCategory.animals,
    difficulty: Difficulty.easy,
  ),
  DrawingTemplate(
    id: 'owl_branch',
    name: 'Owl on a branch',
    category: TemplateCategory.animals,
    difficulty: Difficulty.easy,
  ),
  DrawingTemplate(
    id: 'kitten_yarn',
    name: 'Kitten & yarn',
    category: TemplateCategory.animals,
    difficulty: Difficulty.medium,
  ),
  DrawingTemplate(
    id: 'sea_turtle',
    name: 'Sea turtle',
    category: TemplateCategory.animals,
    difficulty: Difficulty.medium,
    premium: true,
  ),
  DrawingTemplate(
    id: 'boy_headphones',
    name: 'Headphones boy',
    category: TemplateCategory.anime,
    difficulty: Difficulty.medium,
  ),
  DrawingTemplate(
    id: 'girl_wind',
    name: 'Girl in the wind',
    category: TemplateCategory.anime,
    difficulty: Difficulty.hard,
  ),
  DrawingTemplate(
    id: 'little_witch',
    name: 'Little witch',
    category: TemplateCategory.anime,
    difficulty: Difficulty.hard,
    premium: true,
  ),
  DrawingTemplate(
    id: 'young_swordsman',
    name: 'Young swordsman',
    category: TemplateCategory.anime,
    difficulty: Difficulty.hard,
    premium: true,
  ),
  DrawingTemplate(
    id: 'hoodie_girl',
    name: 'Cat-hood girl',
    category: TemplateCategory.chibi,
    difficulty: Difficulty.easy,
  ),
  DrawingTemplate(
    id: 'knight',
    name: 'Tiny knight',
    category: TemplateCategory.chibi,
    difficulty: Difficulty.easy,
  ),
  DrawingTemplate(
    id: 'chef',
    name: 'Little chef',
    category: TemplateCategory.chibi,
    difficulty: Difficulty.easy,
  ),
  DrawingTemplate(
    id: 'astronaut',
    name: 'Astronaut',
    category: TemplateCategory.chibi,
    difficulty: Difficulty.medium,
    premium: true,
  ),
  DrawingTemplate(
    id: 'vintage_car',
    name: 'Vintage car',
    category: TemplateCategory.cars,
    difficulty: Difficulty.medium,
  ),
  DrawingTemplate(
    id: 'sports_coupe',
    name: 'Sports coupe',
    category: TemplateCategory.cars,
    difficulty: Difficulty.medium,
  ),
  DrawingTemplate(
    id: 'monster_truck',
    name: 'Monster truck',
    category: TemplateCategory.cars,
    difficulty: Difficulty.hard,
    premium: true,
  ),
  DrawingTemplate(
    id: 'race_car',
    name: 'Race car',
    category: TemplateCategory.cars,
    difficulty: Difficulty.hard,
    premium: true,
  ),
  DrawingTemplate(
    id: 'rose',
    name: 'Rose',
    category: TemplateCategory.flowers,
    difficulty: Difficulty.easy,
  ),
  DrawingTemplate(
    id: 'succulent_pot',
    name: 'Succulents',
    category: TemplateCategory.flowers,
    difficulty: Difficulty.easy,
  ),
  DrawingTemplate(
    id: 'sunflower',
    name: 'Sunflower',
    category: TemplateCategory.flowers,
    difficulty: Difficulty.medium,
  ),
  DrawingTemplate(
    id: 'blossom_branch',
    name: 'Cherry blossom',
    category: TemplateCategory.flowers,
    difficulty: Difficulty.medium,
    premium: true,
  ),
  DrawingTemplate(
    id: 'bubble_tea',
    name: 'Bubble tea',
    category: TemplateCategory.food,
    difficulty: Difficulty.easy,
  ),
  DrawingTemplate(
    id: 'cupcake',
    name: 'Cupcake',
    category: TemplateCategory.food,
    difficulty: Difficulty.easy,
  ),
  DrawingTemplate(
    id: 'shortcake',
    name: 'Strawberry cake',
    category: TemplateCategory.food,
    difficulty: Difficulty.medium,
  ),
  DrawingTemplate(
    id: 'ramen_bowl',
    name: 'Ramen bowl',
    category: TemplateCategory.food,
    difficulty: Difficulty.medium,
    premium: true,
  ),
];
