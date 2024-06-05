import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/createMessage.dto';
import { Message } from './entities/messages.entity';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createMessage(
    @Body() createMessageDto: CreateMessageDto,
    @Request() req: any,
  ): Promise<Message> {
    return this.messagesService.createMessage(createMessageDto, req);
  }

  @Get()
  messages(): Promise<Message[]> {
    return this.messagesService.messages();
  }
}
