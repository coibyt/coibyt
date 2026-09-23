-- Run this AFTER init.sql, once, via phpMyAdmin's SQL tab.
-- Seeds the service categories the business-application form and homepage need.
INSERT INTO `Category` (`id`, `slug`, `nameVi`, `nameEn`, `icon`, `createdAt`) VALUES
('cat_hair_salon',      'hair-salon',       'Cắt tóc & tạo kiểu',      'Hair salon',           'Scissors',       NOW()),
('cat_spa_massage',     'spa-massage',      'Spa & massage',          'Spa & massage',         'Sparkles',       NOW()),
('cat_nails',           'nails',            'Nail & móng',            'Nails',                 'Hand',           NOW()),
('cat_skincare',        'skincare',         'Chăm sóc da mặt',        'Skincare & facials',    'Smile',          NOW()),
('cat_barber',          'barber',           'Cắt tóc nam',            'Barber',                'Scissors',       NOW()),
('cat_makeup',          'makeup',           'Trang điểm',             'Makeup',                'Palette',        NOW()),
('cat_eyebrows_lashes', 'eyebrows-lashes',  'Mi & chân mày',          'Brows & lashes',        'Eye',            NOW()),
('cat_wellness',        'wellness',         'Sức khoẻ & thư giãn',    'Wellness',              'HeartHandshake', NOW());
