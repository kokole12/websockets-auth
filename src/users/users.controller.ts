import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/users.dto';
import { User } from './entities/users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUaserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUaserDto);
  }

  @Get(':id')
  findById(@Param() id: number): Promise<User> {
    return this.usersService.findById(id);
  }

  @Delete(':id')
  delete(@Param() id: number) {
    return this.usersService.deleteUser(id);
  }
}
