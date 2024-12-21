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

  @Get('get/:id')
  async getProjectById(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.getProjectById(id);
  }

  @Get('all')
  async getProjects(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    console.log('def');
    return this.projectsService.getProjects(page, limit);
  }

  @Get('filter')
  async getProjectsByFilters(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('sector') sector?: string,
    @Query('service') service?: string,
  ) {
    console.log('filter');
    return this.projectsService.getProjectsByFilters(
      page,
      limit,
      sector,
      service,
    );
  }

  @Post('add')
  async createProject(@Body() dto: ProjectDto) {
    return this.projectsService.addProject(dto);
  }

  @Delete('delete/:id')
  async deleteProject(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.deleteProjectById(id);
  }
}
