import { IContent, IPage, ISection } from '@repo/interfaces';

export class PageDto implements IPage {
  id?: string;
  slug: string;
  title: string;
  description: string;
  sections?: ISection[];
}

export class SectionDto implements ISection {
  id?: string;
  title: string;
  orderNumber: number;
  type: string;
  pageId: string;
  content?: IContent[];
}

export class ContentDto implements IContent {
  id?: string;
  contentType: string;
  contentText: string;
  sectionId: string;
}
