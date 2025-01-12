import { IImage, INewProject, IProject } from '@repo/interfaces';

export class ProjectDto implements INewProject {
  client: string;
  workStructure: string;
  sector: string;
  service: string;
  name: string;
  description: string;
  price: number;
}

export class UpdateProjectDto implements IProject {
  id: number;
  name: string;
  description: string;
  client: string;
  workStructure: string;
  price: number;
  sector: string;
  service: string;
  images: IImage[];
}
