import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
  CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100), 
  email VARCHAR(100),
  phone VARCHAR(100)
);
`);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
DROP TABLE IF EXISTS messages;
`);
}
