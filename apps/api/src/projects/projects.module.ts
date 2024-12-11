import { Module } from '@nestjs/common';
import ProjectsService from './projects.service';
import ProjectsRepository from './repository/projects.repository';
import ProjectsController from './projects.controller';

@Module({
  providers: [ProjectsService, ProjectsRepository],
  controllers: [ProjectsController],
})
export default class ProjectsModule {}
