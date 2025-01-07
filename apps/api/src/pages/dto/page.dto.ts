import {
  IBlock,
  IContent,
  INewBlock,
  INewContent,
  INewPage,
  INewSection,
  ISection,
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
  header?: string;
  text?: string;
  image?: string;
  sectionId: string;
}
export class BlockDto implements INewBlock {
  text: string;
  header: string;
  image: string;
  contentId: string;
  index: number;
}

export class UpdateSectionDto implements ISection {
  id: string;
  content: IContent[];
  title: string;
  index: number;
  type: string;
  pageId: string;
}

export class UpdateContentDto implements IContent {
  id: string;
  block: IBlock[];
  type: string;
  index: number;
  header?: string;
  text?: string;
  image?: string;
  sectionId: string;
}

export class UpdateBlockDto implements IBlock {
  id: string;
  text: string;
  header: string;
  image: string;
  index: number;
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
