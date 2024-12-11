import { IProject } from '@repo/interfaces';

export default class ProjectDto implements IProject {
  id: number;
  name: string;
  description: string;
  price: number;
  area: number;
  images: string[];
}
