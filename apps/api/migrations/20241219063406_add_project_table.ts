import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // await knex.raw(`
  //   CREATE TYPE sector_enum AS ENUM (
  //     'Административные здания',
  //     'Многоквартирные жилые дома',
  //     'Промышленные объекты',
  //     'Образовательные учреждения',
  //     'Логистические центры и склады',
  //     'Реконструкция'
  //   );
  //
  //   CREATE TYPE service_enum AS ENUM (
  //     'Строительно техническая экспертиза жилья',
  //     'Инструментальноe обследование объектов',
  //     'BIM проектирование',
  //     'Комплексное проектирование',
  //     'Проектирование инженерных систем и сетей'
  //   );
  // `);

  await knex.raw(`
    CREATE TABLE projects (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      client VARCHAR(255),
      work_structure TEXT,
      price INT,
      sector VARCHAR(255),
      service VARCHAR(255),
      images TEXT[]
    );
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    DROP TABLE IF EXISTS projects;
      `);
}
