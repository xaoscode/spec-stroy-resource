import { Injectable, NotFoundException } from '@nestjs/common';
import PagesRepositroy from './repository/page.repositroy';
import {
  BlockDto,
  ContentDto,
  DeleteDto,
  ReorderDto,
  SectionDto,
  UpdateBlockDto,
  UpdateContentDto,
  UpdateSectionDto,
} from './dto/page.dto';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class PagesService {
  constructor(
    private readonly pageRepository: PagesRepositroy,
    private readonly configService: ConfigService,
  ) {}

  async getPage(slug: string) {
    const page = await this.pageRepository.getPage(slug);

    if (!page) {
      throw new NotFoundException(`Page with slug "${slug}" not found`);
    }

    return page;
  }

  async addSection(id: string, dto: SectionDto) {
    const section = await this.pageRepository.addSection(dto, id);

    return section;
  }

  async addContent(id: string, dto: ContentDto) {
    const content = await this.pageRepository.addContent(dto, id);
    return content;
  }

  async addBlock(dto: BlockDto) {
    const content = await this.pageRepository.addBlock(dto);
    return content;
  }

  async updateSection(dto: UpdateSectionDto) {
    const content = await this.pageRepository.updateSection(dto);
    return content;
  }

  async updateContent(dto: UpdateContentDto) {
    const content = await this.pageRepository.updateContent(dto);
    return content;
  }

  async updateBlock(dto: UpdateBlockDto, fileName?: string) {
    console.log(dto, fileName);

    if (fileName) {
      if (dto.image) {
        const oldImagePath = path.resolve(
          `uploads/images/${dto.image.split('/').pop()}`,
        );
        try {
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
            console.log(`Удален файл: ${oldImagePath}`);
          } else {
            console.warn(`Файл не найден: ${oldImagePath}`);
          }
        } catch (error) {
          console.error(`Ошибка при удалении файла: ${error}`);
        }
      }
      dto.image = `${this.configService.get('BASE_URL')}/uploads/images/${fileName}`;
    }

    try {
      await this.pageRepository.updateBlock(dto);
    } catch (error) {
      console.error(`Ошибка при обновлении блока: ${error}`);
    }
  }

  async reorderSections(dto: ReorderDto) {
    await this.pageRepository.reorderItems(dto);
  }

  async deleteItem(dto: DeleteDto) {
    await this.pageRepository.deleteItem(dto);
  }
}
