import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MessageDto, UpdateMessageDto } from './dto/message.dto';
import { CommunicationRepository } from './repository/communication.repository';

@Injectable()
export class CommunicationService {
  constructor(
    private readonly communicationRepository: CommunicationRepository,
  ) {}

  async newMessage(dto: MessageDto) {
    try {
      const request = this.communicationRepository.newMessage(dto);
      return request;
    } catch (error) {
      throw new HttpException(
        `Something went wrong: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getALl() {
    try {
      const request = this.communicationRepository.getAll();
      return request;
    } catch (error) {
      throw new HttpException(
        `Something went wrong: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateMessage(dto: UpdateMessageDto) {
    try {
      const request = this.communicationRepository.updateMessage(dto);
      return request;
    } catch (error) {
      throw new HttpException(
        `Something went wrong: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
