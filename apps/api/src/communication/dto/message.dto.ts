import { IComMesage } from '@repo/interfaces';

export class MessageDto implements IComMesage {
  name: string;
  email: string;
  phone: string;
}
