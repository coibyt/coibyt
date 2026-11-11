// npm run seed [-- --force] — nhập ../assets/content/**/*.json vào CSDL.
import { loadConfig, loadDotEnv } from '../src/config.js';
import { createPool } from '../src/db.js';
import { seedContent } from '../src/seed.js';
import { createValidator } from '../src/validate.js';

loadDotEnv();
const config = loadConfig();
const force = process.argv.includes('--force');
const pool = createPool(config.databaseUrl);
try {
  console.log(`Nhập nội dung từ ${config.contentDir}`);
  const validator = createValidator(config.schemaPath);
  const r = await seedContent(pool, validator, config.contentDir, { force, log: console.log });
  if (r.invalid.length) {
    console.error('Có file nội dung không hợp lệ — chưa nhập gì:');
    for (const f of r.invalid) {
      console.error(`  ${f.file}`);
      for (const i of f.issues) console.error(`     ${i.path}: ${i.message}`);
    }
    process.exitCode = 1;
  } else {
    console.log(`Xong: thêm ${r.inserted.length}, ghi đè ${r.updated.length}, bỏ qua ${r.skipped.length}.`);
  }
} catch (err) {
  console.error(err.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
