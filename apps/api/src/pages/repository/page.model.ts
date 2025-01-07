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
  content: IContent[];
  id: string;
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
  header?: string;
  text?: string;
  image?: string;
  block: BlockModel[];
  @Expose({ name: 'section_id' })
  sectionId: string;
}

export class BlockModel implements IBlock {
  id: string;
  text: string;
  header: string;
  image: string;
  index: number;
  @Expose({ name: 'content_id' })
  contentId: string;
}
