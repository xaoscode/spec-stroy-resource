import type { Knex } from 'knex';
import { hash } from 'bcrypt';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `);

  await knex.raw(`
      CREATE TABLE page (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          slug VARCHAR(255) UNIQUE NOT NULL,
          title VARCHAR(255) NOT NULL,
          description TEXT
      );
    `);

  await knex.raw(`
      CREATE TABLE section (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          title VARCHAR(255) NOT NULL,
          index INTEGER NOT NULL,
          type VARCHAR(50) NOT NULL,
          page_id UUID REFERENCES page(id) ON DELETE CASCADE
      );
    `);

  await knex.raw(`
      CREATE TABLE content (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          type VARCHAR(50) NOT NULL,
          index INTEGER NOT NULL,
          header TEXT,
          text TEXT,
          image TEXT,
          section_id UUID REFERENCES section(id) ON DELETE CASCADE
      );
    `);
  await knex.raw(`
        CREATE TABLE block (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        index INTEGER NOT NULL,
        header TEXT,
        text TEXT,
        image TEXT,
        content_id UUID REFERENCES content(id) ON DELETE CASCADE

      )
    `);

  await knex.raw(`
      INSERT INTO page
        (slug, title, description)
        VALUES 
        ('stroy', 'Строительно-техническая экспертиза жилья', 'Страница с информацией о приёмке квартиры'),
        ('instrumental', 'Инструментальное обследование объектов', 'Страница с информацией о Инструментальном обследовании объектов'),
        ('bim', 'BIM проектирование', 'Страница с информацией о BIM проектировании'),
        ('complex', 'Комплексное проектирование', 'Страница с информацией о комплексном проектировании'),
        ('project', 'Проектирование инженерных систем и сетей', 'Страница с информацией о проектировании инженерных систем и сетей'),
        ('about', 'О компании Спец Строй Ресурс', 'Страница с информацией компании Спец Строй Ресурс'),
        ('dopusk', 'Допуски', 'Страница с информацией о допусках');
    `);

  await knex.raw(`
      CREATE TABLE users (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          email VARCHAR(255) NOT NULL UNIQUE,
          password_hash VARCHAR(255) NOT NULL,
          current_hashed_refresh_token TEXT
      )
  `);

  const password = 'fdas5KGFvvbnnf';
  const saltRounds = 10;
  const hashedPassword = await hash(password, saltRounds);

  await knex.raw(
    `
      INSERT INTO users (email, password_hash)
      VALUES (?, ?)
      `,
    ['admin_a87hjf3ol1@gmail.com', hashedPassword],
  );
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP TABLE IF EXISTS users;`);
  await knex.raw(`DROP TABLE IF EXISTS block;`);
  await knex.raw(`DROP TABLE IF EXISTS content;`);
  await knex.raw(`DROP TABLE IF EXISTS section;`);
  await knex.raw(`DROP TABLE IF EXISTS page;`);
}
