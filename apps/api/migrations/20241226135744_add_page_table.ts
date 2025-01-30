import type { Knex } from 'knex';
import { hash } from 'bcrypt';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
      CREATE TABLE page (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          slug VARCHAR(255) UNIQUE NOT NULL,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          keywords TEXT
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
        (slug, title, description, keywords)
        VALUES 
        (
          'stroy', 
          'Строительно-техническая экспертиза жилья', 
          'Проведение строительно-технической экспертизы жилья по всей России. Оценка качества строительных работ, выявление дефектов и нарушений. Профессиональный подход и точные результаты.', 
          'строительно-техническая экспертиза, экспертиза жилья, оценка качества строительства, выявление дефектов, строительная экспертиза Россия'
        ),
        (
          'instrumental', 
          'Инструментальное обследование объектов', 
          'Инструментальное обследование строительных объектов по всей России. Использование современных технологий для точной диагностики состояния зданий и сооружений.', 
          'инструментальное обследование, диагностика зданий, обследование объектов, инструментальная диагностика, строительное обследование Россия'
        ),
        (
          'bim', 
          'BIM проектирование', 
          'BIM проектирование зданий и сооружений по всей России. Использование технологий информационного моделирования для повышения качества и точности проектов.', 
          'BIM проектирование, информационное моделирование, BIM технологии, проектирование зданий, BIM Россия'
        ),
        (
          'complex', 
          'Комплексное проектирование', 
          'Комплексное проектирование зданий и сооружений по всей России. Полный цикл работ от разработки концепции до реализации проекта.', 
          'комплексное проектирование, проектирование зданий, строительное проектирование, полный цикл проектирования, проектирование Россия'
        ),
        (
          'engineering', 
          'Проектирование инженерных систем и сетей', 
          'Проектирование инженерных систем и сетей по всей России. Разработка проектов для водоснабжения, электроснабжения, вентиляции и других систем.', 
          'проектирование инженерных систем, проектирование сетей, инженерные системы Россия, проектирование водоснабжения, проектирование электроснабжения'
        ),
        (
          'about', 
          'О компании Спец Строй Ресурс', 
          'Компания Спец Строй Ресурс — профессиональные услуги в области строительства, проектирования и экспертизы по всей России. Надежность и качество с 2010 года.', 
          'Спец Строй Ресурс, строительные услуги Россия, проектирование и экспертиза, о компании, строительная компания Россия'
        ),
        (
          'dopusk', 
          'Допуски СРО', 
          'Оформление допусков СРО по всей России. Помощь в получении разрешительной документации для строительных и проектных организаций.', 
          'допуски СРО, оформление допусков, разрешительная документация, СРО в России, допуски для строительных компаний'
        );
    `);

  await knex.raw(`
      CREATE TABLE users (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          email VARCHAR(255) NOT NULL UNIQUE,
          password_hash VARCHAR(255) NOT NULL,
          current_hashed_refresh_token TEXT
      )
  `);

  const password = process.env.ADMIN_PASS;
  const saltRounds = 10;
  const hashedPassword = await hash(password, saltRounds);

  await knex.raw(
    `
      INSERT INTO users (email, password_hash)
      VALUES (?, ?)
      `,
    ['admin_a87hjf3ol1', hashedPassword],
  );
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP TABLE IF EXISTS users;`);
  await knex.raw(`DROP TABLE IF EXISTS block;`);
  await knex.raw(`DROP TABLE IF EXISTS content;`);
  await knex.raw(`DROP TABLE IF EXISTS section;`);
  await knex.raw(`DROP TABLE IF EXISTS page;`);
}
