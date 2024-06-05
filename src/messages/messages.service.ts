import { Injectable } from '@nestjs/common';
import { Message } from './entities/messages.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/createMessage.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatGateway } from 'src/chat/chat.gateway';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly chatGateway: ChatGateway,
  ) {}
  async createMessage(
    createMessageDto: CreateMessageDto,
    req: any,
  ): Promise<Message> {
    const id = req.user.userId;
    const message = new Message();
    message.message = createMessageDto.message;
    message.created_at = new Date();
    message.created_id = id;
    await this.chatGateway.sendMessage(message);
    return await this.messageRepository.save(message);
  }

  async messages(): Promise<Message[]> {
    return this.messageRepository.find();
  }
}
