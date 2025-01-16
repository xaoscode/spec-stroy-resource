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
import { INewImage } from '@repo/interfaces';
import { multerConfig } from 'src/pages/mutler.config';
import { UpdateProjectDto } from './dto/project.dto';

@Controller('projects')
export default class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly configService: ConfigService,
  ) {}

  @Get('get/:id')
  async getProjectById(@Param('id') id: string) {
    return await this.projectsService.getProjectById(id);
  }

  @Get('five-latest')
  async getFiveLatestProjects() {
    return this.projectsService.getFiveLatestProjects();
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
    @UploadedFiles() files: Express.Multer.File[],
    @Body('content') contentString: string,
  ) {
    const images: INewImage[] = files.map((image) => ({
      name: image.originalname,
      url: `${this.configService.get('BASE_URL')}/${image.path}`,
    }));

    const content = JSON.parse(contentString);
    return this.projectsService.addProject(content, images);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Patch('update-project')
  async updateProject(@Body() dto: UpdateProjectDto) {
    return this.projectsService.updateProject(dto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete('delete/:id')
  async deleteProject(@Param('id') id: string) {
    return this.projectsService.deleteProjectById(id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete('delete-image/:id')
  async deleteImage(@Param('id') id: string) {
    return this.projectsService.deleteImageById(id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Patch('update-image')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async updateImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('content') contentString: string,
  ) {
    const content = JSON.parse(contentString);
    console.log(file);
    await this.projectsService.updateImage(content, {
      name: file.filename,
      url: `${this.configService.get('BASE_URL')}/${file.path}`,
    });
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('add-image/:id')
  async addImage(@Param('id') id: string) {
    await this.projectsService.addImage(id);
  }
}
