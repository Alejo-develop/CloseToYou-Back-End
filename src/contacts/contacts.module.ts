import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Contact])],
  controllers: [ContactsController],
  providers: [ContactsService, CloudinaryService],
})
export class ContactsModule {}
