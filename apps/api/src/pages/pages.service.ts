import { Injectable, NotFoundException } from '@nestjs/common';
import PagesRepositroy from './repository/page.repositroy';
import {
  BlockDto,
  ContentDto,
  DeleteDto,
  ReorderDto,
  SectionDto,
  UpdateBlockDto,
} from './dto/page.dto';

@Injectable()
export default class PagesService {
  constructor(private readonly pageRepository: PagesRepositroy) {}

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

  async updateBlock(dto: UpdateBlockDto) {
    const content = await this.pageRepository.updateBlock(dto);
    return content;
  }

  async reorderSections(dto: ReorderDto) {
    await this.pageRepository.reorderItems(dto);
  }

  async deleteItem(dto: DeleteDto) {
    await this.pageRepository.deleteItem(dto);
  }
}
