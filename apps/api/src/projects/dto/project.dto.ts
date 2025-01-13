import { IImage, INewProject, IUpdateProject } from '@repo/interfaces';

export class ProjectDto implements INewProject {
  client: string;
  workStructure: string;
  sector: string;
  service: string;
  name: string;
  createdAt: Date;
  description: string;
  price: number;
}

export class UpdateProjectDto implements IUpdateProject {
  id: string;
  name: string;
  description: string;
  client: string;
  workStructure: string;
  price: number;
  sector: string;
  createdAt: Date;
  service: string;
}

export class UpdateImageDto implements IImage {
  id: string;
  createdAt: Date;
  name: string;
  url: string;
}
