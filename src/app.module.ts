import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/users.entity';
import { MessagesModule } from './messages/messages.module';
import { Message } from './messages/entities/messages.entity';
import { AuthenticationModule } from './authentication/authentication.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'kokole',
      password: 'password123',
      database: 'wsdb',
      entities: [User, Message],
      synchronize: true,
    }),
    MessagesModule,
    AuthenticationModule,
    ChatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
