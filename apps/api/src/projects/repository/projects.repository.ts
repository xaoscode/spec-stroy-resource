import { Injectable } from '@nestjs/common';
import DatabaseService from 'src/database/database.service';
import { ProjectDto, UpdateProjectDto } from '../dto/project.dto';
import { INewImage, IProjectFilters } from '@repo/interfaces';
import { plainToInstance } from 'class-transformer';
import ProjectModel from './project.model';
export enum Sector {
  administrative_buildings = 'Административные здания',
  apartment_buildings = 'Многоквартирные жилые дома',
  industrial_facilities = 'Промышленные объекты',
  educational_institutions = 'Образовательные учреждения',
  logistics_centers = 'Логистические центры и склады',
  reconstruction = 'Реконструкция',
}

export enum Service {
  stroitelno_tekhnicheskaya_ekspertiza_zhilya = 'Строительно-техническая экспертиза жилья',
  instrumentalno_tekhnicheskoe_obsledovanie = 'Инструментальное обследование объектов',
  bim_design = 'BIM проектирование',
  comprehensive_design = 'Комплексное проектирование',
  engineering_systems_design = 'Проектирование инженерных систем и сетей',
}
@Injectable()
export default class ProjectsRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async addProject(dto: ProjectDto, images?: INewImage[]) {
    console.log(dto);
    const response = await this.databaseService.runQuery(
      `
      INSERT INTO projects 
      (name, description, client, work_structure, price, sector, service) 
      VALUES ($1, $2, $3, $4, $5, $6, $7)
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
      ],
    );
    if (images) {
      for (const image of images) {
        await this.databaseService.runQuery(
          `
          INSERT INTO images
          (name, url, project_id)
          VALUES ($1, $2, $3)
          `,
          [image.name, image.url, response.rows[0].id],
        );
      }
    }
  }

  // Получить один проект по ID
  async getProjectById(id: number) {
    const response = await this.databaseService.runQuery(
      `
      SELECT * FROM projects WHERE id = $1;
      `,
      [id],
    );

    return plainToInstance(ProjectModel, response.rows[0]);
  }

  // Получить проекты с пагинацией
  async getProjects(page: number, limit: number) {
    const offset = (page - 1) * limit;

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
      projects: plainToInstance(ProjectModel, response.rows),
      total: parseInt(countResponse.rows[0].total, 10),
    };
  }

  async getTotalProjectsCount(filters?: IProjectFilters) {
    const baseCountQuery = `
      SELECT COUNT(*) AS total FROM projects
      WHERE 1=1
    `;

    const filterConditions: string[] = [];
    const params: (string | number)[] = [];

    if (filters?.sector) {
      filterConditions.push(`sector = $${filterConditions.length + 1}`);
      params.push(Sector[filters.sector]);
    }

    if (filters?.service) {
      filterConditions.push(`service = $${filterConditions.length + 1}`);
      params.push(Service[filters.service]);
    }

    if (filters?.search) {
      filterConditions.push(`name ILIKE $${filterConditions.length + 1}`);
      params.push(`%${filters.search}%`);
    }

    const countQuery = `
      ${baseCountQuery}
      ${filterConditions.length ? 'AND ' + filterConditions.join(' AND ') : ''}
    `;

    // Выполняем запрос для подсчета общего количества
    const countResponse = await this.databaseService.runQuery(
      countQuery,
      params,
    );
    return parseInt(countResponse.rows[0].total, 10);
  }

  async getProjectsByFilters(
    page: number,
    limit: number,
    filters?: IProjectFilters,
  ) {
    const offset = (page - 1) * limit;

    const baseQuery = `
      SELECT * FROM projects
      WHERE 1=1
    `;

    const filterConditions: string[] = [];
    const params: (string | number)[] = [];

    if (filters?.sector) {
      filterConditions.push(`sector = $${filterConditions.length + 1}`);
      params.push(Sector[filters.sector]);
    }

    if (filters?.service) {
      filterConditions.push(`service = $${filterConditions.length + 1}`);
      params.push(Service[filters.service]);
    }

    if (filters?.search) {
      filterConditions.push(`name ILIKE $${filterConditions.length + 1}`);
      params.push(`%${filters.search}%`);
    }

    const query = `
      ${baseQuery}
      ${filterConditions.length ? 'AND ' + filterConditions.join(' AND ') : ''}
      ORDER BY id
      LIMIT $${params.length + 1} OFFSET $${params.length + 2};
    `;
    params.push(limit, offset);

    const response = await this.databaseService.runQuery(query, params);

    return plainToInstance(ProjectModel, response.rows);
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

  async updateProject(dto: UpdateProjectDto) {
    const updateFields: string[] = [];
    const updateValues: any[] = [];
    console.log(dto);
    Object.entries(dto).forEach(([key, value]) => {
      if (value !== undefined && key !== 'id') {
        switch (key) {
          case 'images':
            if (typeof value === 'string') {
              value = [value]; // Преобразуем строку в массив
            }
            updateFields.push(`${key} = $${updateFields.length + 1}`);
            updateValues.push(value);
            break;
          case 'name':
          case 'description':
          case 'client':
          case 'price':
          case 'sector':
          case 'service':
            updateFields.push(`${key} = $${updateFields.length + 1}`);
            updateValues.push(value);
            break;
          case 'workStructure':
            updateFields.push(`work_structure = $${updateFields.length + 1}`);
            updateValues.push(value);
            break;
          default:
            throw new Error(`Unknown field: ${key}`);
        }
      }
    });

    updateValues.push(dto.id);

    if (updateFields.length === 0) {
      throw new Error('No fields to update');
    }

    const query = `
        UPDATE projects
        SET ${updateFields.join(', ')}
        WHERE id = $${updateFields.length + 1}
    `;
    console.log(query);
    await this.databaseService.runQuery(query, updateValues);
  }
}
