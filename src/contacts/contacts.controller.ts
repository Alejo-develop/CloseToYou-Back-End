import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ActiveUserInterface } from 'src/common/interface/activeUser.interface';
import { ActiveUser } from 'src/common/activeUser.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Contacts')
@UseGuards(AuthGuard)
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  async create(@Body() createContactDto: CreateContactDto, @ActiveUser() user: ActiveUserInterface) {
    return await this.contactsService.create(createContactDto, user);
  }

  @Get()
  async findAll(@ActiveUser() user: ActiveUserInterface) {
    return await this.contactsService.findAll(user);
  }

  @Get(':id')
  async findContactWithUserId(@Param('id') userId: string, @ActiveUser() user: ActiveUserInterface) {
    return await this.contactsService.findOneWithUserId(userId, user);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto, @ActiveUser() user: ActiveUserInterface) {
    return await this.contactsService.update(id, updateContactDto, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @ActiveUser() user: ActiveUserInterface) {
    return await this.contactsService.remove(id, user);
  }
}
