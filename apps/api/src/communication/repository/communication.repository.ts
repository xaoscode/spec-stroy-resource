import { Injectable } from '@nestjs/common';
import DatabaseService from 'src/database/database.service';
import { MessageDto, UpdateMessageDto } from '../dto/message.dto';
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

  async getAll() {
    const databaseResponse = await this.databaseService.runQuery(`
      SELECT * FROM messages
      ORDER BY created_at DESC;
      `);
    return plainToInstance(CommunicationModel, databaseResponse.rows);
  }

  async updateMessage(dto: UpdateMessageDto) {
    const updateFields: string[] = [];
    const updateValues: any[] = [];

    Object.entries(dto).forEach(([key, value]) => {
      if (value !== undefined && key !== 'id') {
        if (key === 'createdAt' || key === 'updatedAt') {
          return;
        }

        switch (key) {
          case 'name':
          case 'email':
          case 'phone':
          case 'status':
          case 'info':
            updateFields.push(`${key} = $${updateFields.length + 1}`);
            updateValues.push(value);
            break;
          default:
            throw new Error(`Unknown field: ${key}`);
        }
      }
    });

    updateValues.push(dto.id);

    if (updateFields.length === 0) {
      throw new Error('No fields to update');
    }

    const query = `
        UPDATE messages
        SET ${updateFields.join(', ')}
        WHERE id = $${updateFields.length + 1}
    `;
    await this.databaseService.runQuery(query, updateValues);
  }
}
