import { IComMessage } from '@repo/interfaces';
import { Expose } from 'class-transformer';

export class CommunicationModel implements IComMessage {
  id: number;
  info: string;
  status: 'new' | 'processed' | 'solved';
  name: string;
  email: string;
  phone: string;
  @Expose({ name: 'created_at' })
  createdAt: Date;
  @Expose({ name: 'updated_at' })
  updatedAt: Date;
}
