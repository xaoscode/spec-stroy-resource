import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';
import { CommunicationRepository } from './repository/communication.repository';

@Injectable()
export class CommunicationService {
  constructor(
    private readonly communicationRepository: CommunicationRepository,
  ) {}

  newMessage(dto: MessageDto) {
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
}
