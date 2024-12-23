export interface IPage {
	id?: string;
	slug: string;
	title: string;
	description: string | null;
	sections?: ISection[];
}

export interface ISection {
	id?: string;
	title: string;
	orderNumber: number;
	type: string;
	pageId: string;
	content?: IContent[];
}

export interface IContent {
	id?: string;
	contentType: string;
	contentText: string | null;
	sectionId: string;
}
