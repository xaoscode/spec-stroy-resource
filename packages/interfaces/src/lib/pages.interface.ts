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
	text: string;
	index: number;
	sectionId: string;
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
}
