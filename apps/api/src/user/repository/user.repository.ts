import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import UserModel from './user.model';
import DatabaseService from 'src/database/database.service';

@Injectable()
class UserRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async findByEmail(email: string) {
    const databaseResponse = await this.databaseService.runQuery(
      `
      SELECT * 
      FROM users
      WHERE email = $1;
      `,
      [email],
    );
    return plainToInstance(UserModel, databaseResponse.rows[0]);
  }

  async findById(id: string) {
    const databaseResponse = await this.databaseService.runQuery(
      `
      SELECT * 
      FROM users
      WHERE id = $1;
      `,
      [id],
    );
    return plainToInstance(UserModel, databaseResponse.rows[0]);
  }

  async getById(id: string) {
    const databaseResponse = await this.databaseService.runQuery(
      `
      SELECT * 
      FROM users
      WHERE id = $1;
      `,
      [id],
    );
    return plainToInstance(UserModel, databaseResponse.rows[0]);
  }
  async updateRefresh(id: string, token: string) {
    await this.databaseService.runQuery(
      `
        UPDATE users
        SET current_hashed_refresh_token = $1
        WHERE id = $2
        `,
      [token, id],
    );
  }
}

export default UserRepository;
