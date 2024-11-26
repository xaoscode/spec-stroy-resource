import { Module } from '@nestjs/common';
import { CommunicationController } from './communication.controller';
import { CommunicationRepository } from './repository/communication.repository';
import { CommunicationService } from './communication.service';
@Module({
  controllers: [CommunicationController],
  providers: [CommunicationService, CommunicationRepository],
})
export class CommunicationModule {}
