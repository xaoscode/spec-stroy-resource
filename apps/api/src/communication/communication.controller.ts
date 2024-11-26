import { Body, Controller, Post } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';
import { CommunicationService } from './communication.service';

@Controller('communication')
export class CommunicationController {
  constructor(private readonly communicationService: CommunicationService) {}

  @Post('message')
  async newMessage(@Body() dto: MessageDto) {
    this.communicationService.newMessage(dto);
  }
}
