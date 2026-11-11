// Điểm khởi động: đọc .env/biến môi trường rồi lắng nghe cổng PORT.
import { createApp } from './app.js';
import { adminEnabled } from './auth.js';
import { loadConfig, loadDotEnv } from './config.js';
import { createPool } from './db.js';

loadDotEnv();

let config;
try {
  config = loadConfig();
} catch (err) {
  console.error(`Cấu hình lỗi: ${err.message}`);
  process.exit(1);
}

const db = createPool(config.databaseUrl);
const app = createApp({ db, config });

const server = app.listen(config.port, () => {
  console.log(`Ong Vàng Toán 3 server đang chạy: http://localhost:${config.port}`);
  console.log(`  CMS: http://localhost:${config.port}/admin ${adminEnabled(config) ? '' : '(đang TẮT — chưa đặt ADMIN_TOKEN)'}`);
  if (config.iapDevMode) console.warn('  CẢNH BÁO: IAP_DEV_MODE=true — chấp nhận biên nhận "TEST-...". Không dùng cho người dùng thật!');
});

function shutdown() {
  server.close(() => db.end().finally(() => process.exit(0)));
  setTimeout(() => process.exit(1), 10_000).unref();
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
