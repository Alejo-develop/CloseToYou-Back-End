import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from 'src/auth/dto/updateUser.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ActiveUserInterface } from 'src/common/interface/activeUser.interface';
import { ActiveUser } from 'src/common/activeUser.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('User')
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOneById(id);
  }

  @Patch('update/:id')
  @UseInterceptors(FileInterceptor('img'))
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @ActiveUser() user: ActiveUserInterface,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.usersService.updateUser(id, updateUserDto, user, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @ActiveUser() user: ActiveUserInterface) {
    return this.usersService.removeUser(id, user);
  }
}
