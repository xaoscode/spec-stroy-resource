import { Controller, Get, Param } from '@nestjs/common';

@Controller('projects')
export default class ProjectsController {
  @Get('/:id')
  getProjectById(@Param('id') id: string) {
    return {
      id: id,
      name: 'Зерносушильный комплекс в Смоленской области',
      description:
        'Разработка проекта для строительства зерносушильного комплекса.',
      price: 2342423,
      area: 234234,
      images: ['http://localhost:3002/images/maini.webp'],
    };
  }
}
