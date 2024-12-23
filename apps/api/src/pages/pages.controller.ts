import { Controller, Get, Param } from '@nestjs/common';
import PagesService from './pages.service';

@Controller('pages')
export default class PagesController {
  constructor(private readonly pageService: PagesService) {}

  @Get('get/:slug')
  async getPage(@Param('slug') slug: string) {
    return this.pageService.getPage(slug);
  }
}
