import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Repository } from 'typeorm';
import { ActiveUserInterface } from 'src/common/interface/activeUser.interface';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  private validateOwnerShip(userId: string, user: ActiveUserInterface) {
    if (userId !== user.id) {
      throw new UnauthorizedException('You do not have permissions');
    }
  }

  async create(createContactDto: CreateContactDto, user: ActiveUserInterface) {
    this.validateOwnerShip(createContactDto.userId, user)

    return await this.contactRepository.save(createContactDto);
  }

  async findAll(user: ActiveUserInterface) {
    return await this.contactRepository.find({where: {userId: user.id}});
  }

  async findOneWithUserId(id: string, user: ActiveUserInterface) {
    const contact = await this.contactRepository.findOne({where: {id: id}});

    this.validateOwnerShip(contact.userId, user)
    return contact
  }

  async update(id: string, updateContactDto: UpdateContactDto, user: ActiveUserInterface) {
    const contact = await this.findOneWithUserId(id, user)
    this.contactRepository.merge(contact, updateContactDto)

    return await this.contactRepository.save(updateContactDto)
  }

  async remove(id: string, user: ActiveUserInterface) {
    const contact = await this.findOneWithUserId(id, user)
    return await this.contactRepository.softDelete(contact.id);
  }
}
