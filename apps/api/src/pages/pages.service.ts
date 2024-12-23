import { Injectable, NotFoundException } from '@nestjs/common';
import PagesRepositroy from './repository/pages.repositroy';

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
}
