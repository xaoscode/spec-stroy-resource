import { Injectable } from '@nestjs/common';
import DatabaseService from 'src/database/database.service';
import ProjectDto from '../dto/project.dto';

@Injectable()
export default class ProjectsRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async addProject(dto: ProjectDto) {
    const response = await this.databaseService.runQuery(`
`);
  }
}
