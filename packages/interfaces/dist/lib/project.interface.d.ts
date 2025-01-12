export interface INewProject {
    name: string;
    description: string;
    client: string;
    workStructure: string;
    price: number;
    sector: string;
    service: string;
}
export interface IProject extends INewProject {
    id: number;
    images: IImage[];
}
export interface INewImage {
    name: string;
    url: string;
}
export interface IImage extends INewImage {
    id: string;
    createdAt: Date;
}
