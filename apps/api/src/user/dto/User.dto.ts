import { IUser } from '@repo/interfaces';

export class UserDto implements IUser {
  id: string;
  email: string;
  password: string;
  currentHashedRefreshToken: string;
}
