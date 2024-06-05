import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Module } from '@nestjs/common';
import { User } from './entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/messages/entities/messages.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Message])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
