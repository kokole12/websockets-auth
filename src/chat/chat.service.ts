import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from 'src/messages/dto/createMessage.dto';

@Injectable()
export class ChatService {
  async create(createChatDto: CreateMessageDto) {
    return createChatDto;
  }
}
