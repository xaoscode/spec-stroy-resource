import {
  Controller,
  Get,
  Post,
  Delete,
  Query,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import ProjectsService from './projects.service';
import ProjectDto from './dto/project.dto';

@Controller('projects')
export default class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  // Получить проект по ID
  @Get('/:id')
  async getProjectById(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.getProjectById(id);
  }

  // Получить проекты с пагинацией
  @Get()
  async getProjects(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.projectsService.getProjects(page, limit);
  }

  // Получить проекты по фильтрам с пагинацией
  @Get('/filter')
  async getProjectsByFilters(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('sector') sector?: string,
    @Query('service') service?: string,
  ) {
    return this.projectsService.getProjectsByFilters(
      page,
      limit,
      sector,
      service,
    );
  }

  // Добавить новый проект
  @Post()
  async createProject(@Body() dto: ProjectDto) {
    return this.projectsService.addProject(dto);
  }

  // Удалить проект по ID
  @Delete('/:id')
  async deleteProject(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.deleteProjectById(id);
  }
}
