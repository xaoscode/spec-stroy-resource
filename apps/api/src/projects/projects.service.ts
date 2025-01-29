import { Injectable } from '@nestjs/common';
import { ProjectDto, UpdateProjectDto } from './dto/project.dto';
import ProjectsRepository from './repository/projects.repository';
import { IImage, INewImage, IProjectFilters } from '@repo/interfaces';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export default class ProjectsService {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  async addProject(dto: ProjectDto, images?: INewImage[]) {
    return this.projectsRepository.addProject(dto, images);
  }

  async getFiveLatestProjects() {
    return await this.projectsRepository.getFiveLatestProjects();
  }

  async getProjectById(id: string) {
    const project = await this.projectsRepository.getProjectById(id);

    if (!project) {
      throw new Error(`Project with ID ${id} not found`);
    }

    return project;
  }

  async getProjects() {
    return this.projectsRepository.getProjects();
  }

  async getProjectsByFilters(
    page: number,
    limit: number,
    filters: IProjectFilters,
  ) {
    if (page <= 0 || limit <= 0) {
      throw new Error('Page and limit must be greater than 0');
    }

    return this.projectsRepository.getProjectsByFilters(page, limit, filters);
  }

  async getTotalProjectsCount(filters: IProjectFilters) {
    return this.projectsRepository.getTotalProjectsCount(filters);
  }

  async deleteProjectById(id: string) {
    const project = await this.projectsRepository.getProjectById(id);

    if (!project) {
      throw new Error(`Project with ID ${id} not found`);
    }

    return this.projectsRepository.deleteProjectById(id);
  }

  async updateProject(dto: UpdateProjectDto) {
    await this.projectsRepository.updateProject(dto);
  }

  async deleteImageById(id: string) {
    const deletedData = await this.projectsRepository.deleteImageById(id);
    if (deletedData.name) {
      const oldImagePath = path.resolve(`uploads/images/${deletedData.name}`);
      try {
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
          console.log(`Удален файл: ${oldImagePath}`);
        } else {
          console.warn(`Файл не найден: ${oldImagePath}`);
        }
      } catch (error) {
        console.error(`Ошибка при удалении файла: ${error}`);
      }
    }
  }

  async updateImage(image: IImage, file: INewImage) {
    await this.projectsRepository.updateImage(file, image.id);
    if (image.name) {
      const oldImagePath = path.resolve(`uploads/images/${image.name}`);
      try {
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
          console.log(`Удален файл: ${oldImagePath}`);
        } else {
          console.warn(`Файл не найден: ${oldImagePath}`);
        }
      } catch (error) {
        console.error(`Ошибка при удалении файла: ${error}`);
      }
    }
  }

  async addImage(id: string) {
    await this.projectsRepository.addImage(id);
  }
}
