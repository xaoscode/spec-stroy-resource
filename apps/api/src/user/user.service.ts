import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import UserRepository from './repository/user.repository';
import { hash, compare } from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getById(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new HttpException(
        'User with this id does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async getByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new HttpException(
        'User with this email does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async setCurrentRefreshToken(refreshToken: string, userId: string) {
    const currentHashedRefreshToken = await hash(refreshToken, 10);
    await this.userRepository.updateRefresh(userId, currentHashedRefreshToken);
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: string) {
    const user = await this.userRepository.getById(userId);

    const isRefreshTokenMatching = await compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async removeRefreshToken(userId: string) {
    return this.userRepository.updateRefresh(userId, '');
  }
}
