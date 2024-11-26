import { Injectable } from '@nestjs/common';
import DatabaseService from 'src/database/database.service';
import { MessageDto } from '../dto/message.dto';
import { plainToInstance } from 'class-transformer';
import { CommunicationModel } from './communication.model';

@Injectable()
export class CommunicationRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async newMessage(message: MessageDto) {
    const databaseResponse = await this.databaseService.runQuery(
      `INSERT INTO messages (name, email, phone) VALUES ($1,$2, $3) RETURNING *;`,
      [message.name, message.email, message.phone],
    );
    return plainToInstance(CommunicationModel, databaseResponse.rows[0]);
  }
}
