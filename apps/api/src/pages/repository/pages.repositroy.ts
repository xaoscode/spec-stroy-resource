import { Injectable } from '@nestjs/common';
import DatabaseService from 'src/database/database.service';
import { ContentDto, PageDto, ReorderDto, SectionDto } from '../dto/page.dto';
import { plainToInstance } from 'class-transformer';
import { ContentModel, PageModel, SectionModel } from './pages.model';

@Injectable()
export default class PagesRepositroy {
  constructor(private readonly databaseService: DatabaseService) {}

  async addPage(dto: PageDto) {
    const response = await this.databaseService.runQuery(
      `
        INSERT INTO page (slug, title, description)
        VALUES ($1, $2, $3)
        RETURNING id
      `,
      [dto.slug, dto.title, dto.description],
    );

    // Получаем ID добавленной страницы
    const pageId = response.rows[0].id;

    return { id: pageId, ...dto };
  }

  // Добавление секции
  async addSection(section: SectionDto, pageId: string) {
    const response = await this.databaseService.runQuery(
      `
        INSERT INTO section (title, index, type, page_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *

      `,
      [section.title, section.index, section.type, pageId],
    );

    return response.rows[0];
  }

  // Добавление контента
  async addContent(content: ContentDto, sectionId: string) {
    console.log(content);
    const res = await this.databaseService.runQuery(
      `
        INSERT INTO content (type, text, section_id, index)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `,
      [content.type, content.text, sectionId, content.index],
    );
    return res.rows[0];
  }

  // Получение страницы по slug
  async getPage(slug: string) {
    const response = await this.databaseService.runQuery(
      `
        SELECT * FROM page WHERE slug = $1
      `,
      [slug],
    );
    if (response.rows.length === 0) {
      throw new Error('Page not found');
    }

    const page = plainToInstance(PageModel, response.rows[0]);
    // Получаем секции для этой страницы
    const sectionsResponse = await this.databaseService.runQuery(
      `
        SELECT * FROM section WHERE page_id = $1
        ORDER BY "index";
      `,
      [page.id],
    );

    const section = plainToInstance(SectionModel, sectionsResponse.rows);

    // Получаем контент для каждой секции
    for (const sect of section) {
      const contentResponse = await this.databaseService.runQuery(
        `
          SELECT * FROM content WHERE section_id = $1
          ORDER BY "index";
        `,
        [sect.id],
      );

      sect.content = plainToInstance(ContentModel, contentResponse.rows);
    }
    return { ...page, section };
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
      UPDATE page 
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

    if (dto.index !== undefined) {
      updateFields.push(`index = $${updateFields.length + 1}`);
      updateValues.push(dto.index);
    }

    if (dto.type !== undefined) {
      updateFields.push(`type = $${updateFields.length + 1}`);
      updateValues.push(dto.type);
    }

    const query = `
    UPDATE section
    SET ${updateFields.join(', ')}
    WHERE id = $${id}
    `;

    await this.databaseService.runQuery(query, updateValues);
  }

  // Обновление контента
  async updateContent(id: string, dto: ContentDto) {
    const updateFields: string[] = [];
    const updateValues: any[] = [];

    if (dto.type !== undefined) {
      updateFields.push(`content_type = $${updateFields.length + 1}`);
      updateValues.push(dto.type);
    }

    if (dto.text !== undefined) {
      updateFields.push(`index = $${updateFields.length + 1}`);
      updateValues.push(dto.text);
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
        DELETE FROM page WHERE id = $1
      `,
      [id],
    );
  }

  // Удаление секции
  async deleteSection(sectionId: string) {
    await this.databaseService.runTransaction(async (client) => {
      const section = await client.query(
        `
        SELECT * FROM section
        WHERE id = $1
        `,
        [sectionId],
      );
      await client.query(
        `
          UPDATE section
          SET index = index - 1
          WHERE page_id = $1
            AND index > $2;
          `,
        [section.rows[0].page_id, section.rows[0].index],
      );

      await client.query(
        `
        DELETE FROM section WHERE id = $1
      `,
        [sectionId],
      );
    });
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

  async reorderItems({
    pageId,
    sourceItemId,
    destinationPosition,
    parentTable,
    childTable,
  }: ReorderDto) {
    // Получаем элементы текущей страницы

    const page = await this.databaseService.runQuery(
      `
      SELECT id, index
      FROM ${childTable}
      WHERE ${parentTable}_id = $1
      ORDER BY index;
      `,
      [pageId],
    );
    const sourceItem = page.rows.find((item) => item.id === sourceItemId);

    if (!sourceItem) {
      throw new Error(
        `Item with ID ${sourceItemId} not found in table ${childTable} on page ${pageId}`,
      );
    }

    const { index: fromPosition } = sourceItem;

    // Используем транзакцию
    await this.databaseService.runTransaction(async (client) => {
      if (fromPosition < destinationPosition) {
        // Перемещение вниз: уменьшаем `index`
        await client.query(
          `
          UPDATE ${childTable}
          SET index = index - 1
          WHERE ${parentTable}_id = $1
            AND index > $2
            AND index <= $3;
          `,
          [pageId, fromPosition, destinationPosition],
        );
      } else if (fromPosition > destinationPosition) {
        // Перемещение вверх: увеличиваем `index`
        await client.query(
          `
          UPDATE ${childTable}
          SET index = index + 1
          WHERE ${parentTable}_id = $1
            AND index >= $2
            AND index < $3;
          `,
          [pageId, destinationPosition, fromPosition],
        );
      }

      // Обновляем позицию перемещаемого элемента
      await client.query(
        `
        UPDATE ${childTable}
        SET index = $1
        WHERE id = $2;
        `,
        [destinationPosition, sourceItemId],
      );
    });
  }
}
