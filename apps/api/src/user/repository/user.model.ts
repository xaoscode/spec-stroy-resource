import { IUser } from '@repo/interfaces';
import { Expose } from 'class-transformer';

class UserModel implements IUser {
  id: string;
  email: string;
  @Expose({ name: 'password_hash' })
  password: string;
  @Expose({ name: 'current_hashed_refresh_token' })
  currentHashedRefreshToken: string;
}

export default UserModel;
