import { Injectable } from '@nestjs/common';
import DatabaseService from 'src/database/database.service';
import ProjectDto from '../dto/project.dto';

@Injectable()
export default class ProjectsRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  // Добавить новый проект
  async addProject(dto: ProjectDto) {
    const response = await this.databaseService.runQuery(
      `
      INSERT INTO projects 
      (name, description, client, work_structure, price, sector, service, images) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;
      `,
      [
        dto.name,
        dto.description,
        dto.client,
        dto.workStructure,
        dto.price,
        dto.sector,
        dto.service,
        dto.images,
      ],
    );

    return response.rows[0];
  }

  // Получить один проект по ID
  async getProjectById(id: number) {
    const response = await this.databaseService.runQuery(
      `
      SELECT * FROM projects WHERE id = $1;
      `,
      [id],
    );

    return response.rows[0];
  }

  // Получить проекты с пагинацией
  async getProjects(page: number, limit: number) {
    const offset = (page - 1) * limit;

    // Выполняем два запроса одновременно: для получения данных и для подсчета общего количества проектов
    const response = await this.databaseService.runQuery(
      `
    SELECT * FROM projects
    ORDER BY id
    LIMIT $1 OFFSET $2;
    `,
      [limit, offset],
    );

    const countResponse = await this.databaseService.runQuery(
      `
    SELECT COUNT(*) AS total FROM projects;
    `,
    );

    return {
      projects: response.rows,
      total: parseInt(countResponse.rows[0].total, 10),
    };
  }

  // Получить проекты по фильтрам с пагинацией
  async getProjectsByFilters(
    page: number,
    limit: number,
    sector?: string,
    service?: string,
  ) {
    const offset = (page - 1) * limit;

    let query = `
    SELECT * FROM projects
    WHERE 1=1
  `;
    let countQuery = `
    SELECT COUNT(*) AS total FROM projects
    WHERE 1=1
  `;
    const params = [];
    let index = 1;

    if (sector) {
      query += ` AND sector = $${index}`;
      countQuery += ` AND sector = $${index}`;
      params.push(sector);
      index++;
    }

    if (service) {
      query += ` AND service = $${index}`;
      countQuery += ` AND service = $${index}`;
      params.push(service);
      index++;
    }

    query += `
    ORDER BY id
    LIMIT $${index} OFFSET $${index + 1};
  `;
    params.push(limit, offset);

    const response = await this.databaseService.runQuery(query, params);
    const countResponse = await this.databaseService.runQuery(
      countQuery,
      params.slice(0, index - 1),
    ); // Параметры для подсчета

    return {
      projects: response.rows,
      total: parseInt(countResponse.rows[0].total, 10),
    };
  }

  // Удалить проект по ID
  async deleteProjectById(id: number) {
    const response = await this.databaseService.runQuery(
      `
      DELETE FROM projects WHERE id = $1 RETURNING *;
      `,
      [id],
    );

    return response.rows[0];
  }
}
