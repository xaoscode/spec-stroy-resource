import { IImage, IProject } from '@repo/interfaces';
import { Expose } from 'class-transformer';

export default class ProjectModel implements IProject {
  id: number;
  name: string;
  description: string;
  client: string;
  @Expose({ name: 'work_structure' })
  workStructure: string;
  price: number;
  sector: string;
  service: string;
  images: IImage[];
}
