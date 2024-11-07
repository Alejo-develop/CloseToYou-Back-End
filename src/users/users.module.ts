import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';

@Module({
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, CloudinaryService],
  exports: [UsersService],
})
export class UsersModule {}
