import { IBlock, IContent, IPage, ISection } from '@repo/interfaces';
import { Expose } from 'class-transformer';

export class PageModel implements IPage {
  id: string;
  section: SectionModel[];
  slug: string;
  title: string;
  description: string;
}

export class SectionModel implements ISection {
  id: string;
  content: ContentModel[];
  title: string;
  index: number;
  type: string;
  @Expose({ name: 'page_id' })
  pageId: string;
}

export class ContentModel implements IContent {
  id: string;
  type: string;
  index: number;
  header?: string[];
  text?: string[];
  images?: string[];
  block: BlockModel[];
  @Expose({ name: 'section_id' })
  sectionId: string;
}

export class BlockModel implements IBlock {
  id: string;
  text: string;
  header: string;
  images: string;
  @Expose({ name: 'content_id' })
  contentId: string;
}
