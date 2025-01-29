import { IImage, IProject } from '@repo/interfaces';
import { Expose } from 'class-transformer';

export class ProjectModel implements IProject {
  purpose: string;
  id: string;
  name: string;
  description: string;
  client: string;
  @Expose({ name: 'work_structure' })
  workStructure: string;
  price: number;
  sector: string;
  service: string;
  @Expose({ name: 'created_at' })
  createdAt: Date;
  images: IImage[];
}

export class ImageModel implements IImage {
  id: string;
  @Expose({ name: 'creatged_at' })
  createdAt: Date;
  name: string;
  url: string;
}
