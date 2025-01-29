import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import PagesService from './pages.service';
import {
  BlockDto,
  ContentDto,
  DeleteDto,
  ReorderDto,
  SectionDto,
  UpdateContentDto,
  UpdateSectionDto,
} from './dto/page.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from './mutler.config';
import { ConfigService } from '@nestjs/config';
import JwtAuthenticationGuard from 'src/auth/jwt-auth.guard';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@Controller('pages')
export default class PagesController {
  constructor(
    private readonly pageService: PagesService,
    private readonly configService: ConfigService,
  ) {}

  @Get('get/:slug')
  async getPage(@Param('slug') slug: string) {
    return this.pageService.getPage(slug);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('create-section/:id')
  async addSection(@Param('id') id: string, @Body() dto: SectionDto) {
    return this.pageService.addSection(id, dto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('create-content/:id')
  async addContent(@Param('id') id: string, @Body() dto: ContentDto) {
    return this.pageService.addContent(id, dto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('create-block')
  async addBlock(@Body() dto: BlockDto) {
    return this.pageService.addBlock(dto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Patch('update-section')
  async updateSection(@Body() dto: UpdateSectionDto) {
    return this.pageService.updateSection(dto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Patch('update-content')
  async updateContent(@Body() dto: UpdateContentDto) {
    return this.pageService.updateContent(dto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Patch('update-block')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async updateBlock(
    @UploadedFile() file: Express.Multer.File,
    @Body('content') contentString: string,
  ) {
    const content = JSON.parse(contentString);
    return this.pageService.updateBlock(content, file?.filename);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Patch('reorder-items')
  async reorderSections(@Body() dto: ReorderDto) {
    return this.pageService.reorderSections(dto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete('delet-item')
  async deleteSection(@Body() dto: DeleteDto) {
    return this.pageService.deleteItem(dto);
  }
}
