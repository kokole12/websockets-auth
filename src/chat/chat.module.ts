import { AuthenticationModule } from './../authentication/authentication.module';
import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [AuthenticationModule],
  exports: [ChatService, ChatGateway],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
