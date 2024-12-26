import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import PagesService from './pages.service';
import { ContentDto, ReorderDto, SectionDto } from './dto/page.dto';

@Controller('pages')
export default class PagesController {
  constructor(private readonly pageService: PagesService) {}

  @Get('get/:slug')
  async getPage(@Param('slug') slug: string) {
    return this.pageService.getPage(slug);
  }

  @Post('create-section/:id')
  async addSection(@Param('id') id: string, @Body() dto: SectionDto) {
    return this.pageService.addSection(id, dto);
  }

  @Post('create-content/:id')
  async addContent(@Param('id') id: string, @Body() dto: ContentDto) {
    return this.pageService.addContent(id, dto);
  }

  @Patch('reorder-items')
  async reorderSections(@Body() dto: ReorderDto) {
    return this.pageService.reorderSections(dto);
  }

  @Delete('delet-section')
  async deleteSection(@Body() { sectionId }: { sectionId: string }) {
    return this.pageService.deleteSection(sectionId);
  }
}
