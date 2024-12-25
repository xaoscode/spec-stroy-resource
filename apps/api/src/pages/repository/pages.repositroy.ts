import { Injectable } from '@nestjs/common';
import DatabaseService from 'src/database/database.service';
import {
  ContentDto,
  PageDto,
  SectionDto,
  SwapContentDto,
  SwapSectionDto,
} from '../dto/page.dto';

@Injectable()
export default class PagesRepositroy {
  constructor(private readonly databaseService: DatabaseService) {}

  async addPage(dto: PageDto) {
    const response = await this.databaseService.runQuery(
      `
        INSERT INTO pages (slug, title, description)
        VALUES ($1, $2, $3)
        RETURNING id
      `,
      [dto.slug, dto.title, dto.description],
    );

    // Получаем ID добавленной страницы
    const pageId = response.rows[0].id;

    // Если есть секции, добавляем их
    if (dto.sections && dto.sections.length > 0) {
      for (const section of dto.sections) {
        await this.addSection(section, pageId);
      }
    }

    return { id: pageId, ...dto };
  }

  // Добавление секции
  async addSection(section: SectionDto, pageId: string) {
    const response = await this.databaseService.runQuery(
      `
        INSERT INTO sections (title, order_number, type, page_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *

      `,
      [section.title, section.orderNumber, section.type, pageId],
    );

    const sectionId = response.rows[0].id;

    // Если есть контент для секции, добавляем его
    if (section.content && section.content.length > 0) {
      for (const content of section.content) {
        await this.addContent(content, sectionId);
      }
    }
    return response.rows[0];
  }

  // Добавление контента
  async addContent(content: ContentDto, sectionId: string) {
    const res = await this.databaseService.runQuery(
      `
        INSERT INTO content (content_type, content_text, section_id, order_number)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `,
      [
        content.contentType,
        content.contentText,
        sectionId,
        content.orderNumber,
      ],
    );
    return res.rows[0];
  }

  // Получение страницы по slug
  async getPage(slug: string) {
    const response = await this.databaseService.runQuery(
      `
        SELECT * FROM pages WHERE slug = $1
      `,
      [slug],
    );
    if (response.rows.length === 0) {
      throw new Error('Page not found');
    }

    const page = response.rows[0];
    // Получаем секции для этой страницы
    const sectionsResponse = await this.databaseService.runQuery(
      `
        SELECT * FROM sections WHERE page_id = $1
      `,
      [page.id],
    );

    const sections = sectionsResponse.rows.sort(
      (a, b) => a.order_number - b.order_number,
    );

    // Получаем контент для каждой секции
    for (const section of sections) {
      const contentResponse = await this.databaseService.runQuery(
        `
          SELECT * FROM content WHERE section_id = $1
        `,
        [section.id],
      );

      section.content = contentResponse.rows.sort(
        (a, b) => a.order_number - b.order_number,
      );
    }
    return { ...page, sections };
  }
  // Обновление страницы
  async updatePage(id: string, dto: PageDto) {
    const updateFields: string[] = [];
    const updateValues: any[] = [];

    if (dto.title !== undefined) {
      updateFields.push(`title = $${updateFields.length + 1}`);
      updateValues.push(dto.title);
    }

    if (dto.description !== undefined) {
      updateFields.push(`description = $${updateFields.length + 1}`);
      updateValues.push(dto.description);
    }

    if (updateFields.length === 0) {
      throw new Error('No fields to update');
    }

    const query = `
      UPDATE pages 
      SET ${updateFields.join(', ')}
      WHERE id = $${id}
    `;

    await this.databaseService.runQuery(query, updateValues);
  }

  // Обновление секции
  async updateSection(id: string, dto: SectionDto) {
    const updateFields: string[] = [];
    const updateValues: any[] = [];

    if (dto.title !== undefined) {
      updateFields.push(`title = $${updateFields.length + 1}`);
      updateValues.push(dto.title);
    }

    if (dto.orderNumber !== undefined) {
      updateFields.push(`order_number = $${updateFields.length + 1}`);
      updateValues.push(dto.orderNumber);
    }

    if (dto.type !== undefined) {
      updateFields.push(`type = $${updateFields.length + 1}`);
      updateValues.push(dto.type);
    }

    const query = `
    UPDATE sections
    SET ${updateFields.join(', ')}
    WHERE id = $${id}
    `;

    await this.databaseService.runQuery(query, updateValues);
  }

  // Обновление контента
  async updateContent(id: string, dto: ContentDto) {
    const updateFields: string[] = [];
    const updateValues: any[] = [];

    if (dto.contentType !== undefined) {
      updateFields.push(`content_type = $${updateFields.length + 1}`);
      updateValues.push(dto.contentType);
    }

    if (dto.contentText !== undefined) {
      updateFields.push(`order_number = $${updateFields.length + 1}`);
      updateValues.push(dto.contentText);
    }

    const query = `
    UPDATE content 
    SET ${updateFields.join(', ')}
    WHERE id = $${id}
    `;

    await this.databaseService.runQuery(query, updateValues);
  }

  // Удаление страницы
  async deletePage(id: string) {
    await this.databaseService.runQuery(
      `
        DELETE FROM pages WHERE id = $1
      `,
      [id],
    );
  }

  // Удаление секции
  async deleteSection(sectionId: string) {
    await this.databaseService.runQuery(
      `
        DELETE FROM sections WHERE id = $1
      `,
      [sectionId],
    );
  }

  // Удаление контента
  async deleteContent(id: string) {
    await this.databaseService.runQuery(
      `
        DELETE FROM content WHERE id = $1
      `,
      [id],
    );
  }

  async swapSections({
    sourceSectionId,
    destinationSectionId,
  }: SwapSectionDto) {
    await this.databaseService.runQuery(
      `
      UPDATE sections
      SET "order_number" = CASE
        WHEN id = $1 THEN (SELECT "order_number" FROM sections WHERE id = $2)
        WHEN id = $2 THEN (SELECT "order_number" FROM sections WHERE id = $1)
        ELSE "order_number"
      END
      WHERE id IN ($1, $2)
      RETURNING *
      ;
      `,
      [sourceSectionId, destinationSectionId],
    );
  }

  async swapContents({
    sourceContentId,
    destinationContentId,
  }: SwapContentDto) {
    await this.databaseService.runQuery(
      `
      UPDATE content
      SET "order_number" = CASE
        WHEN id = $1 THEN (SELECT "order_number" FROM content WHERE id = $2)
        WHEN id = $2 THEN (SELECT "order_number" FROM content WHERE id = $1)
        ELSE "order_number"
      END
      WHERE id IN ($1, $2)
      RETURNING *
      ;
      `,
      [sourceContentId, destinationContentId],
    );
  }
}
