import { Message } from 'src/messages/entities/messages.entity';

export interface ServerToClient {
  newMessage: (payload: Message) => void;
}
