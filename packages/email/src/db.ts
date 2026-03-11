import { Pool } from 'pg';

const DATABASE_URL = 'postgresql://postgres:postgres@postgres:5432/cdnlandings';

let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: DATABASE_URL,
    });
  }
  return pool;
}
