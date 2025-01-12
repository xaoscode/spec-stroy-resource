import {
  Controller,
  Get,
  Post,
  Delete,
  Query,
  Param,
  Body,
  ParseIntPipe,
  Patch,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import ProjectsService from './projects.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import JwtAuthenticationGuard from 'src/auth/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';
import { multerConfigProjects } from './mutler.config';

@Controller('projects')
export default class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly configService: ConfigService,
  ) {}

  @Get('get/:id')
  async getProjectById(@Param('id', ParseIntPipe) id: number) {
    console.log('get');
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
    @Query('search') search?: string,
  ) {
    console.log('filter');
    console.log(sector, service);

    return this.projectsService.getProjectsByFilters(page, limit, {
      sector,
      service,
      search,
    });
  }
  @Get('count')
  async getTotalProjectsCount(
    @Query('sector') sector?: string,
    @Query('service') service?: string,
    @Query('search') search?: string,
  ) {
    console.log(sector, service);

    return this.projectsService.getTotalProjectsCount({
      sector,
      service,
      search,
    });
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('add')
  @UseInterceptors(FilesInterceptor('images', 10, multerConfigProjects))
  async createProject(
    @UploadedFiles() file: Express.Multer.File,
    @Body('content') contentString: string,
  ) {
    console.log(file);
    const content = JSON.parse(contentString);
    return this.projectsService.addProject(content);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Patch('update-project')
  @UseInterceptors(FileInterceptor('images', multerConfigProjects))
  async updateProject(
    @UploadedFile() file: Express.Multer.File,
    @Body('content') contentString: string,
  ) {
    const content = JSON.parse(contentString);
    return this.projectsService.updateProject(content);
  }

  @Delete('delete/:id')
  async deleteProject(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.deleteProjectById(id);
  }
}
