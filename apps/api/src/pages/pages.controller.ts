import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import PagesService from './pages.service';
import { ContentDto, SectionDto } from './dto/page.dto';

@Controller('pages')
export default class PagesController {
  constructor(private readonly pageService: PagesService) {}

  @Get('get/:slug')
  async getPage(@Param('slug') slug: string) {
    return this.pageService.getPage(slug);
  }

  @Post('create-section/:id')
  async addSection(@Param('id') id: string, @Body() dto: SectionDto) {
    console.log('h');
    return this.pageService.addSection(id, dto);
  }

  @Post('create-content/:id')
  async addContent(@Param('id') id: string, @Body() dto: ContentDto) {
    return this.pageService.addContent(id, dto);
  }
}
