import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from 'src/auth/dto/updateUser.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ActiveUserInterface } from 'src/common/interface/activeUser.interface';
import { ActiveUser } from 'src/common/activeUser.decorator';

@ApiTags('User')
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOneById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @ActiveUser() user: ActiveUserInterface) {
    return await this.usersService.updateUser(id, updateUserDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string,@ActiveUser() user: ActiveUserInterface) {
    return this.usersService.removeUser(id, user);
  }
}
