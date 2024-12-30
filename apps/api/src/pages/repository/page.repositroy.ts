import { Injectable } from '@nestjs/common';
import DatabaseService from 'src/database/database.service';
import {
  BlockDto,
  ContentDto,
  DeleteDto,
  PageDto,
  ReorderDto,
  SectionDto,
  UpdateBlockDto,
} from '../dto/page.dto';
import { plainToInstance } from 'class-transformer';
import { ContentModel, PageModel, SectionModel } from './page.model';

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

    const pageId = response.rows[0].id;

    return { id: pageId, ...dto };
  }

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

  async addContent(content: ContentDto, sectionId: string) {
    const res = await this.databaseService.runQuery(
      `
        INSERT INTO content (type, text, header, images, section_id, index)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `,
      [
        content.type,
        content.text,
        content.header,
        content.images,
        sectionId,
        content.index,
      ],
    );
    return res.rows[0];
  }

  async addBlock(dto: BlockDto) {
    const res = await this.databaseService.runQuery(
      `
      INSERT INTO block (header, text, image, content_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [dto.header, dto.text, dto.images, dto.contentId],
    );
    return res.rows[0];
  }

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
    const sectionsResponse = await this.databaseService.runQuery(
      `
        SELECT * FROM section WHERE page_id = $1
        ORDER BY "index";
      `,
      [page.id],
    );

    const section = plainToInstance(SectionModel, sectionsResponse.rows);

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

  async updateBlock(dto: UpdateBlockDto) {
    const updateFields: string[] = [];
    const updateValues: any[] = [];

    if (dto.header !== undefined) {
      updateFields.push(`header = $${updateFields.length + 1}`);
      updateValues.push(dto.header);
    }

    if (dto.text !== undefined) {
      updateFields.push(`text = $${updateFields.length + 1}`);
      updateValues.push(dto.text);
    }

    if (dto.images !== undefined) {
      updateFields.push(`images = $${updateFields.length + 1}`);
      updateValues.push(dto.images);
    }
    updateValues.push(dto.id);

    const query = `
    UPDATE block 
    SET ${updateFields.join(', ')}
    WHERE id = $${updateFields.length + 1}
    `;
    await this.databaseService.runQuery(query, updateValues);
  }

  async deletePage(id: string) {
    await this.databaseService.runQuery(
      `
        DELETE FROM page WHERE id = $1
      `,
      [id],
    );
  }

  async deleteItem({ id, parentTable, childTable, parentId }: DeleteDto) {
    await this.databaseService.runTransaction(async (client) => {
      const item = await client.query(
        `
        SELECT * FROM ${childTable}
        WHERE id = $1
        `,
        [id],
      );
      await client.query(
        `
          UPDATE ${childTable}
          SET index = index - 1
          WHERE ${parentTable}_id = $1
            AND index > $2;
          `,
        [parentId, item.rows[0].index],
      );

      await client.query(
        `
        DELETE FROM ${childTable} WHERE id = $1
      `,
        [id],
      );
    });
  }

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

    await this.databaseService.runTransaction(async (client) => {
      if (fromPosition < destinationPosition) {
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
