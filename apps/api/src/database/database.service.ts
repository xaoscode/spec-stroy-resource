import { Inject, Injectable } from '@nestjs/common';
import { CONNECTION_POOL } from './database.module-definition';
import { Pool } from 'pg';
@Injectable()
class DatabaseService {
  constructor(@Inject(CONNECTION_POOL) private readonly pool: Pool) {}
  async runQuery(query: string, params?: unknown[]) {
    return this.pool.query(query, params);
  }
}
export default DatabaseService;
