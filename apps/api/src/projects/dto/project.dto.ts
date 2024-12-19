import { IProject } from '@repo/interfaces';

export default class ProjectDto implements IProject {
  client: string;
  workStructure: string;
  sector: string;
  service: string;
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
}
