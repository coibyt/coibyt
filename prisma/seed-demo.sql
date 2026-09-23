-- Optional: realistic demo content (3 approved salons/spas with services,
-- staff and opening hours) so the site isn't empty for a first look/demo.
-- Run AFTER init.sql and seed-categories.sql, via phpMyAdmin's SQL tab.
--
-- Demo login for all accounts below: password "Password123!"
-- (bcrypt hash embedded below — this is a well-known demo password, do not
-- keep these accounts once you have real users; see README "Giới hạn đã biết").

INSERT INTO `User` (`id`, `name`, `email`, `password`, `role`, `locale`, `createdAt`, `updatedAt`) VALUES
('cu_admin',    'VaraaAi Admin',              'admin@varaaai.com',    '$2a$12$hDFDngeTCyKggkQE8ZDLS.K268UlL1kMmzNJivYBq59htUq4tLuMC', 'ADMIN',          'vi', NOW(), NOW()),
('cu_customer', 'Nguyễn Thị Khách Hàng',      'customer@varaaai.com', '$2a$12$hDFDngeTCyKggkQE8ZDLS.K268UlL1kMmzNJivYBq59htUq4tLuMC', 'CUSTOMER',       'vi', NOW(), NOW()),
('cu_owner1',   'Chủ salon 1',                'owner1@varaaai.com',   '$2a$12$hDFDngeTCyKggkQE8ZDLS.K268UlL1kMmzNJivYBq59htUq4tLuMC', 'BUSINESS_OWNER', 'vi', NOW(), NOW()),
('cu_owner2',   'Chủ salon 2',                'owner2@varaaai.com',   '$2a$12$hDFDngeTCyKggkQE8ZDLS.K268UlL1kMmzNJivYBq59htUq4tLuMC', 'BUSINESS_OWNER', 'vi', NOW(), NOW()),
('cu_owner3',   'Chủ salon 3',                'owner3@varaaai.com',   '$2a$12$hDFDngeTCyKggkQE8ZDLS.K268UlL1kMmzNJivYBq59htUq4tLuMC', 'BUSINESS_OWNER', 'vi', NOW(), NOW());

INSERT INTO `Business`
  (`id`, `ownerId`, `slug`, `name`, `description`, `status`, `city`, `addressLine`, `phone`, `country`, `timezone`, `approvedAt`, `createdAt`, `updatedAt`)
VALUES
('cb_luna',  'cu_owner1', 'luna-hair-hanoi',   'Luna Hair Studio',        'Salon tóc cao cấp tại trung tâm Hà Nội, chuyên cắt & nhuộm màu thời trang.',                 'APPROVED', 'Hà Nội',            '12 Phố Huế, Hai Bà Trưng', '0900000000', 'VN', 'Asia/Ho_Chi_Minh', NOW(), NOW(), NOW()),
('cb_zen',   'cu_owner2', 'zen-spa-saigon',    'Zen Spa & Wellness',      'Không gian thư giãn giữa lòng Sài Gòn với liệu trình massage & chăm sóc da chuẩn Hàn.',      'APPROVED', 'TP. Hồ Chí Minh',   '88 Nguyễn Huệ, Quận 1',    '0900000000', 'VN', 'Asia/Ho_Chi_Minh', NOW(), NOW(), NOW()),
('cb_bloom', 'cu_owner3', 'bloom-nails-danang','Bloom Nails & Beauty',    'Tiệm nail phong cách Nhật, tỉ mỉ từng chi tiết tại Đà Nẵng.',                                'APPROVED', 'Đà Nẵng',           '45 Trần Phú',              '0900000000', 'VN', 'Asia/Ho_Chi_Minh', NOW(), NOW(), NOW());

INSERT INTO `BusinessCategory` (`businessId`, `categoryId`) VALUES
('cb_luna',  'cat_hair_salon'),
('cb_zen',   'cat_spa_massage'),
('cb_bloom', 'cat_nails');

-- Open Mon–Sat 09:00–19:00 (540–1140 minutes) for all three, closed Sunday.
INSERT INTO `BusinessHours` (`id`, `businessId`, `weekday`, `openMinute`, `closeMinute`) VALUES
('cbh_luna_1', 'cb_luna', 1, 540, 1140), ('cbh_luna_2', 'cb_luna', 2, 540, 1140), ('cbh_luna_3', 'cb_luna', 3, 540, 1140),
('cbh_luna_4', 'cb_luna', 4, 540, 1140), ('cbh_luna_5', 'cb_luna', 5, 540, 1140), ('cbh_luna_6', 'cb_luna', 6, 540, 1140),
('cbh_zen_1',  'cb_zen',  1, 540, 1140), ('cbh_zen_2',  'cb_zen',  2, 540, 1140), ('cbh_zen_3',  'cb_zen',  3, 540, 1140),
('cbh_zen_4',  'cb_zen',  4, 540, 1140), ('cbh_zen_5',  'cb_zen',  5, 540, 1140), ('cbh_zen_6',  'cb_zen',  6, 540, 1140),
('cbh_bloom_1','cb_bloom',1, 540, 1140), ('cbh_bloom_2','cb_bloom',2, 540, 1140), ('cbh_bloom_3','cb_bloom',3, 540, 1140),
('cbh_bloom_4','cb_bloom',4, 540, 1140), ('cbh_bloom_5','cb_bloom',5, 540, 1140), ('cbh_bloom_6','cb_bloom',6, 540, 1140);

INSERT INTO `Staff` (`id`, `businessId`, `name`, `active`, `createdAt`) VALUES
('cst_luna_mai',   'cb_luna',  'Chị Mai',              1, NOW()),
('cst_luna_linh',  'cb_luna',  'Chị Linh',             1, NOW()),
('cst_zen_hoa',    'cb_zen',   'Kỹ thuật viên Hoa',    1, NOW()),
('cst_zen_an',     'cb_zen',   'Kỹ thuật viên An',     1, NOW()),
('cst_bloom_trang','cb_bloom', 'Bạn Trang',            1, NOW());

INSERT INTO `Service` (`id`, `businessId`, `categoryId`, `name`, `durationMin`, `bufferMin`, `priceCents`, `currency`, `active`, `createdAt`, `updatedAt`) VALUES
('csvc_luna_cut',   'cb_luna',  'cat_hair_salon',  'Cắt tóc nữ',                45,  0, 250000,  'VND', 1, NOW(), NOW()),
('csvc_luna_dye',   'cb_luna',  'cat_hair_salon',  'Nhuộm màu thời trang',     120,  0, 900000,  'VND', 1, NOW(), NOW()),
('csvc_luna_perm',  'cb_luna',  'cat_hair_salon',  'Uốn/duỗi',                 150,  0, 1200000, 'VND', 1, NOW(), NOW()),
('csvc_zen_60',     'cb_zen',   'cat_spa_massage', 'Massage body 60 phút',      60,  0, 450000,  'VND', 1, NOW(), NOW()),
('csvc_zen_stone',  'cb_zen',   'cat_spa_massage', 'Massage đá nóng',           90,  0, 650000,  'VND', 1, NOW(), NOW()),
('csvc_zen_facial', 'cb_zen',   'cat_spa_massage', 'Chăm sóc da mặt chuyên sâu',75,  0, 550000,  'VND', 1, NOW(), NOW()),
('csvc_bloom_gel',  'cb_bloom', 'cat_nails',       'Sơn gel',                   45,  0, 180000,  'VND', 1, NOW(), NOW()),
('csvc_bloom_lash', 'cb_bloom', 'cat_nails',       'Nối mi cổ điển',            90,  0, 350000,  'VND', 1, NOW(), NOW()),
('csvc_bloom_art',  'cb_bloom', 'cat_nails',       'Nail art thiết kế',         60,  0, 280000,  'VND', 1, NOW(), NOW());

INSERT INTO `StaffService` (`staffId`, `serviceId`) VALUES
('cst_luna_mai',   'csvc_luna_cut'),  ('cst_luna_linh',  'csvc_luna_cut'),
('cst_luna_mai',   'csvc_luna_dye'),  ('cst_luna_linh',  'csvc_luna_dye'),
('cst_luna_mai',   'csvc_luna_perm'), ('cst_luna_linh',  'csvc_luna_perm'),
('cst_zen_hoa',    'csvc_zen_60'),    ('cst_zen_an',     'csvc_zen_60'),
('cst_zen_hoa',    'csvc_zen_stone'), ('cst_zen_an',     'csvc_zen_stone'),
('cst_zen_hoa',    'csvc_zen_facial'),('cst_zen_an',     'csvc_zen_facial'),
('cst_bloom_trang','csvc_bloom_gel'),
('cst_bloom_trang','csvc_bloom_lash'),
('cst_bloom_trang','csvc_bloom_art');
