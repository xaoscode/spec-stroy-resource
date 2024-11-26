import { IComMesage } from '@repo/interfaces';
export class CommunicationModel implements IComMesage {
  name: string;
  email: string;
  phone: string;
}
