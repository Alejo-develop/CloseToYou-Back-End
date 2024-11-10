import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Repository } from 'typeorm';
import { ActiveUserInterface } from 'src/common/interface/activeUser.interface';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  private validateOwnerShip(userId: string, user: ActiveUserInterface) {
    if (userId !== user.id) {
      throw new UnauthorizedException('You do not have permissions');
    }
  }

  async create(createContactDto: CreateContactDto, user: ActiveUserInterface,  file?: Express.Multer.File) {
    this.validateOwnerShip(createContactDto.userId, user)
    if (file) {
      const uploadResult = await this.cloudinaryService.uploadFile(file);
      createContactDto.img = uploadResult.secure_url;
    }

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

  async update(id: string, updateContactDto: UpdateContactDto, user: ActiveUserInterface, file?: Express.Multer.File) {
    const contact = await this.findOneWithUserId(id, user)
    
    if (file) {
      const uploadResult = await this.cloudinaryService.uploadFile(file);
      updateContactDto.img = uploadResult.secure_url;
    }
    this.contactRepository.merge(contact, updateContactDto)
    
    return await this.contactRepository.save(contact)
  }

  async remove(id: string, user: ActiveUserInterface) {
    const contact = await this.findOneWithUserId(id, user)
    return await this.contactRepository.softDelete(contact.id);
  }
}
