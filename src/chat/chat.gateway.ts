import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateMessageDto } from 'src/messages/dto/createMessage.dto';
import { Server, Socket } from 'socket.io';
import { ServerToClient } from './types/chat.types';
import { Message } from 'src/messages/entities/messages.entity';
import { Logger, UseGuards } from '@nestjs/common';
import { WsJwtGuard } from 'src/authentication/ws-jwt/ws-jwt.guard';
import { socketAuthMw } from 'src/authentication/ws-jwt/ws-mw';

@WebSocketGateway()
@UseGuards(WsJwtGuard)
export class ChatGateway {
  @WebSocketServer()
  server: Server<any, ServerToClient>;

  afterInit(client: Socket) {
    client.use(socketAuthMw() as any);
    Logger.log('afterinit');
  }

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('createChat')
  create(@MessageBody() createChatDto: CreateMessageDto) {
    return this.chatService.create(createChatDto);
  }

  async sendMessage(message: Message) {
    return this.server.emit('newMessage', message);
  }
}
