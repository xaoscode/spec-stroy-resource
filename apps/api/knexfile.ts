import type { Knex } from 'knex';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config({ path: './.env' });

const configService = new ConfigService();
const knexConfig: Knex.Config = {
  client: 'postgresql',
  connection: {
    host: configService.get('POSTGRES_HOST'),
    port: configService.get('POSTGRES_PORT'),
    user: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DB'),
  },
};

module.exports = knexConfig;

// pnpm dlx knex migrate:make add_some_name - добавить новую миграцию
// pnpm dlx knex migrate:latest - произвести миграцию
// pnpm dlx knex migrate:rollback - откат последней миграции (--step=3 - откат на кол-во шагов - 3; --all - все)
// pnpm dlx knex migrate:status
