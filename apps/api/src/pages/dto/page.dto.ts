import { INewContent, INewPage, INewSection } from '@repo/interfaces';

export class PageDto implements INewPage {
  slug: string;
  title: string;
  description: string;
}

export class SectionDto implements INewSection {
  title: string;
  index: number;
  type: string;
  pageId: string;
}

export class ContentDto implements INewContent {
  type: string;
  text: string;
  index: number;
  sectionId: string;
}

export class ReorderDto {
  pageId: number;
  sourceItemId: number;
  destinationPosition: number;
  parentTable;
  childTable: string;
}
