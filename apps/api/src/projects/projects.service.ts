import { Injectable } from '@nestjs/common';
import ProjectDto from './dto/project.dto';
import ProjectsRepository from './repository/projects.repository';

@Injectable()
export default class ProjectsService {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  // Добавить новый проект
  async addProject(dto: ProjectDto) {
    return this.projectsRepository.addProject(dto);
  }

  // Получить один проект по ID
  async getProjectById(id: number) {
    const project = await this.projectsRepository.getProjectById(id);

    if (!project) {
      throw new Error(`Project with ID ${id} not found`);
    }

    return project;
  }

  // Получить проекты с пагинацией
  async getProjects(page: number, limit: number) {
    if (page < 1 || limit < 1) {
      throw new Error('Page and limit must be greater than 0');
    }

    return this.projectsRepository.getProjects(page, limit);
  }

  // Получить проекты по фильтрам с пагинацией
  async getProjectsByFilters(
    page: number,
    limit: number,
    sector?: string,
    service?: string,
  ) {
    if (page < 1 || limit < 1) {
      throw new Error('Page and limit must be greater than 0');
    }

    return this.projectsRepository.getProjectsByFilters(
      page,
      limit,
      sector,
      service,
    );
  }

  // Удалить проект по ID
  async deleteProjectById(id: number) {
    const project = await this.projectsRepository.getProjectById(id);

    if (!project) {
      throw new Error(`Project with ID ${id} not found`);
    }

    return this.projectsRepository.deleteProjectById(id);
  }
}
