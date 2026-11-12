// Kết nối PostgreSQL (pg.Pool) + tiện ích transaction.
import pg from 'pg';

export function createPool(connectionString) {
  if (!connectionString) {
    throw new Error('Thiếu DATABASE_URL (xem .env.example).');
  }
  return new pg.Pool({ connectionString, max: 10 });
}

/**
 * Chạy fn(client) trong một transaction; tự ROLLBACK khi lỗi.
 * @template T
 * @param {pg.Pool} pool
 * @param {(client: pg.PoolClient) => Promise<T>} fn
 * @returns {Promise<T>}
 */
export async function withTransaction(pool, fn) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await fn(client);
    await client.query('COMMIT');
    return result;
  } catch (err) {
    try {
      await client.query('ROLLBACK');
    } catch {
      /* bỏ qua */
    }
    throw err;
  } finally {
    client.release();
  }
}
