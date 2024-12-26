import { Inject, Injectable } from '@nestjs/common';
import { CONNECTION_POOL } from './database.module-definition';
import { Pool, PoolClient } from 'pg';
@Injectable()
class DatabaseService {
  constructor(@Inject(CONNECTION_POOL) private readonly pool: Pool) {}
  async runQuery(query: string, params?: unknown[]) {
    return this.pool.query(query, params);
  }
  async runTransaction(
    callback: (client: PoolClient) => Promise<void>,
  ): Promise<void> {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      await callback(client);
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}
export default DatabaseService;
