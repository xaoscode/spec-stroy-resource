import { IComMessage, INewComMessage } from '@repo/interfaces';

export class MessageDto implements INewComMessage {
  info: string;
  name: string;
  status: 'new' | 'processed' | 'solved';
  email: string;
  phone: string;
}

export class UpdateMessageDto implements IComMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'new' | 'processed' | 'solved';
  info: string;
  createdAt: Date;
  updatedAt: Date;
}
