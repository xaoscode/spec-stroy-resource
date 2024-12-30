import {
  IBlock,
  IContent,
  INewBlock,
  INewContent,
  INewPage,
  INewSection,
} from '@repo/interfaces';

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
  index: number;
  header?: string[];
  text?: string[];
  images?: string[];
  sectionId: string;
}
export class BlockDto implements INewBlock {
  text: string;
  header: string;
  images: string;
  contentId: string;
}

export class UpdateBlockDto implements IBlock {
  id: string;
  text: string;
  header: string;
  images: string;
  contentId: string;
}

export class ReorderDto {
  pageId: number;
  sourceItemId: number;
  destinationPosition: number;
  parentTable: string;
  childTable: string;
}

export class DeleteDto {
  id: string;
  parentId: string;
  parentTable: string;
  childTable: string;
}
