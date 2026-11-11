-- 001_init.sql — lược đồ ban đầu cho server Ong Vàng Toán 3.
-- Cần PostgreSQL 13+ (gen_random_uuid() có sẵn).

-- Tài khoản phụ huynh.
CREATE TABLE accounts (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT NOT NULL UNIQUE CHECK (email = lower(email)),
  password_hash TEXT NOT NULL,              -- "scrypt$N$r$p$<salt b64>$<hash b64>"
  vip_until     TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Phiên đăng nhập: chỉ lưu sha256 của token, không lưu token gốc.
CREATE TABLE sessions (
  token_hash  BYTEA PRIMARY KEY,
  account_id  UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at  TIMESTAMPTZ NOT NULL
);
CREATE INDEX sessions_account_idx ON sessions(account_id);
CREATE INDEX sessions_expires_idx ON sessions(expires_at);

-- Hồ sơ các bé của một tài khoản.
CREATE TABLE children (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id  UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX children_account_idx ON children(account_id);

-- Tiến độ (JSON của Progress.toJson() bên Flutter), đã được gộp (merge) trên server.
CREATE TABLE progress (
  child_id    UUID PRIMARY KEY REFERENCES children(id) ON DELETE CASCADE,
  doc         JSONB NOT NULL,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Nội dung: catalog / lesson / exam.
--   Dùng kiểu JSON (không phải JSONB) để GIỮ NGUYÊN thứ tự khoá như người soạn viết.
--   body           = bản nháp mới nhất (CMS sửa ở đây)
--   published_body = bản đang phát hành cho app (NULL nếu chưa từng xuất bản)
--   rev            = số lần đã xuất bản (0 = chưa xuất bản)
--   published      = true nếu bản nháp trùng bản đang phát hành (không có thay đổi chờ xuất bản)
CREATE TABLE content_documents (
  id              TEXT PRIMARY KEY,
  kind            TEXT NOT NULL CHECK (kind IN ('catalog', 'lesson', 'exam')),
  title           TEXT,
  body            JSON NOT NULL,
  published_body  JSON,
  rev             INTEGER NOT NULL DEFAULT 0 CHECK (rev >= 0),
  published       BOOLEAN NOT NULL DEFAULT false,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at    TIMESTAMPTZ
);
CREATE INDEX content_documents_kind_idx ON content_documents(kind);

-- Giao dịch mua VIP (mọi lần xác minh thành công đều lưu lại).
CREATE TABLE purchases (
  id              BIGSERIAL PRIMARY KEY,
  account_id      UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  platform        TEXT NOT NULL CHECK (platform IN ('ios', 'android')),
  product_id      TEXT NOT NULL,
  receipt_hash    BYTEA NOT NULL UNIQUE,   -- sha256(platform + ":" + receipt): chống dùng lại biên nhận
  receipt         TEXT NOT NULL,
  transaction_id  TEXT,
  days_granted    INTEGER NOT NULL,
  vip_until_after TIMESTAMPTZ NOT NULL,
  dev_mode        BOOLEAN NOT NULL DEFAULT false,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX purchases_account_idx ON purchases(account_id);
