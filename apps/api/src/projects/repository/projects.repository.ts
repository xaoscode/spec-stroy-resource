import { Injectable } from '@nestjs/common';
import DatabaseService from 'src/database/database.service';
import { ProjectDto, UpdateProjectDto } from '../dto/project.dto';
import { INewImage, IProjectFilters } from '@repo/interfaces';
import { plainToInstance } from 'class-transformer';
import { ImageModel, ProjectModel } from './project.model';

export enum Sector {
  administrative = 'Административные здания',
  apartment = 'Многоквартирные жилые дома',
  industrial = 'Промышленные объекты',
  educational = 'Образовательные учреждения',
  logistics = 'Логистические центры и склады',
  reconstruction = 'Реконструкция',
}

export enum Service {
  stroy = 'Строительно-техническая экспертиза жилья',
  instrumental = 'Инструментальное обследование объектов',
  bim = 'BIM проектирование',
  complex = 'Комплексное проектирование',
  engineering = 'Проектирование инженерных систем и сетей',
}

@Injectable()
export default class ProjectsRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async addProject(dto: ProjectDto, images?: INewImage[]) {
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
  async getProjectById(id: string) {
    const projectResponse = await this.databaseService.runQuery(
      `
      SELECT * FROM projects WHERE id = $1;
      `,
      [id],
    );
    const project = plainToInstance(ProjectModel, projectResponse.rows[0]);
    const imagesResponse = await this.databaseService.runQuery(
      `
      SELECT * FROM images WHERE project_id = $1;
      `,
      [project.id],
    );
    const images = plainToInstance(ImageModel, imagesResponse.rows);
    return { ...project, images };
  }

  async getFiveLatestProjects() {
    const query = `
      SELECT 
        p.id, 
        p.name, 
        p.description, 
        p.client, 
        p.work_structure, 
        p.price, 
        p.sector, 
        p.service,
        json_agg(
          json_build_object(
            'id', i.id,
            'name', i.name,
            'url', i.url,
            'created_at', i.created_at
          )
        ) AS images
      FROM projects p
      LEFT JOIN images i ON p.id = i.project_id
      GROUP BY p.id
      ORDER BY p.created_at DESC
      LIMIT 5;
    `;

    const projectsResponse = await this.databaseService.runQuery(query);
    return plainToInstance(ProjectModel, projectsResponse.rows);
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

    // Базовый SQL-запрос
    const baseQuery = `
      SELECT * FROM projects
      WHERE 1=1
    `;

    const filterConditions: string[] = [];
    const params: (string | number)[] = [];

    // Условия фильтрации
    if (filters?.sector) {
      filterConditions.push(`sector = $${filterConditions.length + 1}`);
      params.push(Sector[filters.sector]);
    }

    if (filters?.service) {
      console.log(filters.service);
      filterConditions.push(`service = $${filterConditions.length + 1}`);
      params.push(Service[filters.service]);
    }

    if (filters?.search) {
      filterConditions.push(`name ILIKE $${filterConditions.length + 1}`);
      params.push(`%${filters.search}%`);
    }

    // Финальный SQL-запрос
    const query = `
      ${baseQuery}
      ${filterConditions.length ? 'AND ' + filterConditions.join(' AND ') : ''}
      ORDER BY id
      LIMIT $${params.length + 1} OFFSET $${params.length + 2};
    `;
    params.push(limit, offset);

    // Выполнение запроса к базе данных
    const response = await this.databaseService.runQuery(query, params);
    const projects = plainToInstance(ProjectModel, response.rows);

    // Загрузка изображений для каждого проекта
    for (const project of projects) {
      const imagesResponse = await this.databaseService.runQuery(
        `
        SELECT * FROM images WHERE project_id = $1
        `,
        [project.id],
      );

      // Привязываем изображения к проекту
      project.images = plainToInstance(ImageModel, imagesResponse.rows);
    }

    // Возвращаем результат с мета-информацией для пагинации
    return projects;
  }

  // Удалить проект по ID
  async deleteProjectById(id: string) {
    const response = await this.databaseService.runQuery(
      `
      DELETE FROM projects WHERE id = $1 RETURNING *;
      `,
      [id],
    );

    return response.rows[0];
  }

  async updateProject(dto: UpdateProjectDto) {
    console.log(dto);
    const updateFields: string[] = [];
    const updateValues: any[] = [];
    Object.entries(dto).forEach(([key, value]) => {
      if (value !== undefined && key !== 'id') {
        switch (key) {
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
            console.warn(`Ignoring unknown field: ${key}`);
            break;
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

  async deleteImageById(id: string) {
    const databaseResponse = await this.databaseService.runQuery(
      `
      DELETE FROM images WHERE id = $1
      RETURNING *;
      `,
      [id],
    );
    return plainToInstance(ImageModel, databaseResponse.rows[0]);
  }

  async updateImage(file: INewImage, id: string) {
    await this.databaseService.runQuery(
      `
      UPDATE images
      SET name = $1, url = $2
      WHERE id = $3
      `,
      [file.name, file.url, id],
    );
  }

  async addImage(id: string) {
    await this.databaseService.runQuery(
      `
      INSERT INTO images
      (project_id)
      VALUES ($1)
      `,
      [id],
    );
  }
}
