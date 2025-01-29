export interface INewProject {
	name: string;
	description: string;
	client: string;
	workStructure: string;
	price: number;
	sector: string;
	service: string;
	purpose: string;
}
export interface IProject extends INewProject {
	id: string;
	images: IImage[];
	createdAt: Date;
}
export interface IUpdateProject extends INewProject {
	id: string;
	createdAt: Date;
}
export interface INewImage {
	name: string;
	url: string;
}
export interface IImage extends INewImage {
	id: string;
	createdAt: Date;
}
