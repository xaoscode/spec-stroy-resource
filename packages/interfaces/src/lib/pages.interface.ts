export interface INewPage {
	slug: string;
	title: string;
	description: string;
}

export interface INewSection {
	title: string;
	index: number;
	type: string;
	pageId: string;
}

export interface INewContent {
	type: string;
	index: number;
	header?: string[];
	text?: string[];
	images?: string[];
	sectionId: string;
}

export interface INewBlock {
	text: string;
	header: string;
	images: string;
	contentId: string;
}

export interface IPage extends INewPage {
	id: string;
	section: ISection[];
}

export interface ISection extends INewSection {
	id: string;
	content: IContent[];
}

export interface IContent extends INewContent {
	id: string;
	block: IBlock[];
}

export interface IBlock extends INewBlock {
	id: string;
}
