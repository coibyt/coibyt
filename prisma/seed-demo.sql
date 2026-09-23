-- Optional: realistic demo content (3 approved salons/spas with services,
-- staff and opening hours) so the site isn't empty for a first look/demo.
-- Run AFTER init.sql and seed-categories.sql, via phpMyAdmin's SQL tab.
--
-- Demo login for all accounts below: password "Password123!"
-- (bcrypt hash embedded below — this is a well-known demo password, do not
-- keep these accounts once you have real users; see README "Giới hạn đã biết").

INSERT INTO `User` (`id`, `name`, `email`, `password`, `role`, `locale`, `createdAt`, `updatedAt`) VALUES
('u_admin',    'VaraaAi Admin',              'admin@varaaai.com',    '$2a$12$hDFDngeTCyKggkQE8ZDLS.K268UlL1kMmzNJivYBq59htUq4tLuMC', 'ADMIN',          'vi', NOW(), NOW()),
('u_customer', 'Nguyễn Thị Khách Hàng',      'customer@varaaai.com', '$2a$12$hDFDngeTCyKggkQE8ZDLS.K268UlL1kMmzNJivYBq59htUq4tLuMC', 'CUSTOMER',       'vi', NOW(), NOW()),
('u_owner1',   'Chủ salon 1',                'owner1@varaaai.com',   '$2a$12$hDFDngeTCyKggkQE8ZDLS.K268UlL1kMmzNJivYBq59htUq4tLuMC', 'BUSINESS_OWNER', 'vi', NOW(), NOW()),
('u_owner2',   'Chủ salon 2',                'owner2@varaaai.com',   '$2a$12$hDFDngeTCyKggkQE8ZDLS.K268UlL1kMmzNJivYBq59htUq4tLuMC', 'BUSINESS_OWNER', 'vi', NOW(), NOW()),
('u_owner3',   'Chủ salon 3',                'owner3@varaaai.com',   '$2a$12$hDFDngeTCyKggkQE8ZDLS.K268UlL1kMmzNJivYBq59htUq4tLuMC', 'BUSINESS_OWNER', 'vi', NOW(), NOW());

INSERT INTO `Business`
  (`id`, `ownerId`, `slug`, `name`, `description`, `status`, `city`, `addressLine`, `phone`, `country`, `timezone`, `approvedAt`, `createdAt`, `updatedAt`)
VALUES
('b_luna',  'u_owner1', 'luna-hair-hanoi',   'Luna Hair Studio',        'Salon tóc cao cấp tại trung tâm Hà Nội, chuyên cắt & nhuộm màu thời trang.',                 'APPROVED', 'Hà Nội',            '12 Phố Huế, Hai Bà Trưng', '0900000000', 'VN', 'Asia/Ho_Chi_Minh', NOW(), NOW(), NOW()),
('b_zen',   'u_owner2', 'zen-spa-saigon',    'Zen Spa & Wellness',      'Không gian thư giãn giữa lòng Sài Gòn với liệu trình massage & chăm sóc da chuẩn Hàn.',      'APPROVED', 'TP. Hồ Chí Minh',   '88 Nguyễn Huệ, Quận 1',    '0900000000', 'VN', 'Asia/Ho_Chi_Minh', NOW(), NOW(), NOW()),
('b_bloom', 'u_owner3', 'bloom-nails-danang','Bloom Nails & Beauty',    'Tiệm nail phong cách Nhật, tỉ mỉ từng chi tiết tại Đà Nẵng.',                                'APPROVED', 'Đà Nẵng',           '45 Trần Phú',              '0900000000', 'VN', 'Asia/Ho_Chi_Minh', NOW(), NOW(), NOW());

INSERT INTO `BusinessCategory` (`businessId`, `categoryId`) VALUES
('b_luna',  'cat_hair_salon'),
('b_zen',   'cat_spa_massage'),
('b_bloom', 'cat_nails');

-- Open Mon–Sat 09:00–19:00 (540–1140 minutes) for all three, closed Sunday.
INSERT INTO `BusinessHours` (`id`, `businessId`, `weekday`, `openMinute`, `closeMinute`) VALUES
('bh_luna_1', 'b_luna', 1, 540, 1140), ('bh_luna_2', 'b_luna', 2, 540, 1140), ('bh_luna_3', 'b_luna', 3, 540, 1140),
('bh_luna_4', 'b_luna', 4, 540, 1140), ('bh_luna_5', 'b_luna', 5, 540, 1140), ('bh_luna_6', 'b_luna', 6, 540, 1140),
('bh_zen_1',  'b_zen',  1, 540, 1140), ('bh_zen_2',  'b_zen',  2, 540, 1140), ('bh_zen_3',  'b_zen',  3, 540, 1140),
('bh_zen_4',  'b_zen',  4, 540, 1140), ('bh_zen_5',  'b_zen',  5, 540, 1140), ('bh_zen_6',  'b_zen',  6, 540, 1140),
('bh_bloom_1','b_bloom',1, 540, 1140), ('bh_bloom_2','b_bloom',2, 540, 1140), ('bh_bloom_3','b_bloom',3, 540, 1140),
('bh_bloom_4','b_bloom',4, 540, 1140), ('bh_bloom_5','b_bloom',5, 540, 1140), ('bh_bloom_6','b_bloom',6, 540, 1140);

INSERT INTO `Staff` (`id`, `businessId`, `name`, `active`, `createdAt`) VALUES
('st_luna_mai',   'b_luna',  'Chị Mai',              1, NOW()),
('st_luna_linh',  'b_luna',  'Chị Linh',             1, NOW()),
('st_zen_hoa',    'b_zen',   'Kỹ thuật viên Hoa',    1, NOW()),
('st_zen_an',     'b_zen',   'Kỹ thuật viên An',     1, NOW()),
('st_bloom_trang','b_bloom', 'Bạn Trang',            1, NOW());

INSERT INTO `Service` (`id`, `businessId`, `categoryId`, `name`, `durationMin`, `bufferMin`, `priceCents`, `currency`, `active`, `createdAt`, `updatedAt`) VALUES
('svc_luna_cut',   'b_luna',  'cat_hair_salon',  'Cắt tóc nữ',                45,  0, 250000,  'VND', 1, NOW(), NOW()),
('svc_luna_dye',   'b_luna',  'cat_hair_salon',  'Nhuộm màu thời trang',     120,  0, 900000,  'VND', 1, NOW(), NOW()),
('svc_luna_perm',  'b_luna',  'cat_hair_salon',  'Uốn/duỗi',                 150,  0, 1200000, 'VND', 1, NOW(), NOW()),
('svc_zen_60',     'b_zen',   'cat_spa_massage', 'Massage body 60 phút',      60,  0, 450000,  'VND', 1, NOW(), NOW()),
('svc_zen_stone',  'b_zen',   'cat_spa_massage', 'Massage đá nóng',           90,  0, 650000,  'VND', 1, NOW(), NOW()),
('svc_zen_facial', 'b_zen',   'cat_spa_massage', 'Chăm sóc da mặt chuyên sâu',75,  0, 550000,  'VND', 1, NOW(), NOW()),
('svc_bloom_gel',  'b_bloom', 'cat_nails',       'Sơn gel',                   45,  0, 180000,  'VND', 1, NOW(), NOW()),
('svc_bloom_lash', 'b_bloom', 'cat_nails',       'Nối mi cổ điển',            90,  0, 350000,  'VND', 1, NOW(), NOW()),
('svc_bloom_art',  'b_bloom', 'cat_nails',       'Nail art thiết kế',         60,  0, 280000,  'VND', 1, NOW(), NOW());

INSERT INTO `StaffService` (`staffId`, `serviceId`) VALUES
('st_luna_mai',   'svc_luna_cut'),  ('st_luna_linh',  'svc_luna_cut'),
('st_luna_mai',   'svc_luna_dye'),  ('st_luna_linh',  'svc_luna_dye'),
('st_luna_mai',   'svc_luna_perm'), ('st_luna_linh',  'svc_luna_perm'),
('st_zen_hoa',    'svc_zen_60'),    ('st_zen_an',     'svc_zen_60'),
('st_zen_hoa',    'svc_zen_stone'), ('st_zen_an',     'svc_zen_stone'),
('st_zen_hoa',    'svc_zen_facial'),('st_zen_an',     'svc_zen_facial'),
('st_bloom_trang','svc_bloom_gel'),
('st_bloom_trang','svc_bloom_lash'),
('st_bloom_trang','svc_bloom_art');
