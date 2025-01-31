import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { MessageDto, UpdateMessageDto } from './dto/message.dto';
import { CommunicationService } from './communication.service';
import JwtAuthenticationGuard from 'src/auth/jwt-auth.guard';
import { Throttle } from '@nestjs/throttler';

@Controller('communication')
export class CommunicationController {
  constructor(private readonly communicationService: CommunicationService) {}

  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('message')
  async newMessage(@Body() dto: MessageDto) {
    console.log('message');
    this.communicationService.newMessage(dto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('all')
  async getAll() {
    return this.communicationService.getALl();
  }

  @UseGuards(JwtAuthenticationGuard)
  @Patch('update-message')
  async updateMessage(@Body() dto: UpdateMessageDto) {
    this.communicationService.updateMessage(dto);
  }
}
