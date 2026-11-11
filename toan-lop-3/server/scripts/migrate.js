// npm run migrate — áp dụng migrations/*.sql chưa chạy.
import { loadDotEnv } from '../src/config.js';
import { createPool } from '../src/db.js';
import { runMigrations } from '../src/migrate.js';

loadDotEnv();
const pool = createPool(process.env.DATABASE_URL);
try {
  const applied = await runMigrations(pool, { log: console.log });
  console.log(applied.length ? `Xong: ${applied.length} migration mới.` : 'CSDL đã ở phiên bản mới nhất.');
} catch (err) {
  console.error(err.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
