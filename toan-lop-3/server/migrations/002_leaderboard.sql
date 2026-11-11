-- 002_leaderboard.sql — biệt danh (bảo vệ quyền riêng tư của bé) + tuỳ chọn tham gia bảng xếp hạng.
--
-- Biệt danh do SERVER sinh: "<Con vật> <Tính từ> <10–99>" (xem src/nickname.js). Bảng xếp hạng chỉ hiện
-- biệt danh, không bao giờ hiện tên thật của bé hay email phụ huynh.

ALTER TABLE children ADD COLUMN nickname TEXT;

-- Gán biệt danh cho các bé đã có (một lần). Hai danh sách phải khớp với src/nickname.js
-- (test/nickname.test.js kiểm tra). random() đủ dùng cho việc gán lại một lần này;
-- biệt danh mới về sau sinh bằng crypto.randomInt bên Node.
UPDATE children
   SET nickname =
         (ARRAY['Mèo', 'Gấu', 'Thỏ', 'Cáo', 'Cú', 'Sóc', 'Voi', 'Hổ', 'Gấu Trúc', 'Chim Cánh Cụt', 'Rùa', 'Cá Heo', 'Hươu', 'Ong', 'Khỉ', 'Sư Tử', 'Ngựa', 'Vẹt', 'Kỳ Lân', 'Cún'])[1 + floor(random() * 20)::int]
         || ' ' ||
         (ARRAY['Thông Minh', 'Chăm Chỉ', 'Nhanh Nhẹn', 'Dũng Cảm', 'Vui Vẻ', 'Siêu Tốc', 'Tinh Mắt', 'Kiên Trì', 'Sáng Tạo', 'Giỏi Giang', 'Cẩn Thận', 'Tự Tin', 'Hăng Hái', 'Lanh Lợi', 'Bền Bỉ', 'Chăm Ngoan', 'Tài Ba', 'Nhanh Trí'])[1 + floor(random() * 18)::int]
         || ' ' ||
         (10 + floor(random() * 90)::int)::text
 WHERE nickname IS NULL;

ALTER TABLE children ALTER COLUMN nickname SET NOT NULL;
CREATE INDEX children_nickname_idx ON children(nickname);

ALTER TABLE children ADD COLUMN leaderboard_opt_in BOOLEAN NOT NULL DEFAULT true;
