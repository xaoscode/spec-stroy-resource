import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `);

  await knex.raw(`
      CREATE TABLE pages (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          slug VARCHAR(255) UNIQUE NOT NULL,
          title VARCHAR(255) NOT NULL,
          description TEXT
      );
    `);
  await knex.raw(`
      INSERT INTO pages
        (slug, title, description)
        VALUES 
        ('stroy', 'Строительно-техническая экспертиза жилья', 'Страница с информацией о приёмке квартиры'),
        ('instrumental', 'Инструментальное обследование объектов', 'Страница с информацией о Инструментальном обследовании объектов'),
        ('bim', 'BIM проектирование', 'Страница с информацией о BIM проектировании'),
        ('complex', 'Комплексное проектирование', 'Страница с информацией о комплексном проектировании'),
        ('project', 'Проектирование инженерных систем и сетей', 'Страница с информацией о проектировании инженерных систем и сетей');

    `);

  await knex.raw(`
      CREATE TABLE sections (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          title VARCHAR(255) NOT NULL,
          order_number INTEGER NOT NULL,
          type VARCHAR(50) NOT NULL,
          page_id UUID REFERENCES pages(id) ON DELETE CASCADE
      );
    `);

  await knex.raw(`
      CREATE TABLE content (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          content_type VARCHAR(50) NOT NULL,
          order_number INTEGER NOT NULL,
          content_text TEXT,
          section_id UUID REFERENCES sections(id) ON DELETE CASCADE
      );
    `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    DROP TABLE IF EXISTS content
`);
  await knex.raw(`
    DROP TABLE IF EXISTS sections
`);
  await knex.raw(`
    DROP TABLE IF EXISTS pages
`);
}
