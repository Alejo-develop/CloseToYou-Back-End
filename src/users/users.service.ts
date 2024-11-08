import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from 'src/auth/dto/signUp.dto';
import { UpdateUserDto } from 'src/auth/dto/updateUser.dto';
import { ActiveUserInterface } from 'src/common/interface/activeUser.interface';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly cloudinaryService: CloudinaryService
  ){}

  private validateOwnerShip(userId: string, user: ActiveUserInterface){
    if(userId !== user.id ){
      throw new UnauthorizedException('You do not have permissions')
    }
  }
  
  async findOneByEmail(email: string){
    return await this.userRepository.findOne({where: {email: email}})
  }

  async create(signUpDto: SignUpDto) {
    return await this.userRepository.save(signUpDto)
  }

  async findOneById(id: string){
    const userFound = await this.userRepository.findOne({where: {id: id}})
    console.log(userFound);
    
    if(!userFound) throw new NotFoundException('User by id not found')

    return userFound
  }

  async findUserByEmailWithPassword(email: string){
    return await this.userRepository.findOne({
      where: {email: email},
      select: [
        'email',
        'password',
        'id'
      ]
    })
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto, activeUser: ActiveUserInterface,  file?: Express.Multer.File){
    const userFound = await this.findOneById(id)
    this.validateOwnerShip(id, activeUser)

    
    if (file) {
      const uploadResult = await this.cloudinaryService.uploadFile(file);
      updateUserDto.img = uploadResult.secure_url;
    }

    return await this.userRepository.save({...userFound, ...updateUserDto})
  }

  async removeUser(id: string, activeUser: ActiveUserInterface){
    await this.findOneById(id)
    this.validateOwnerShip(id, activeUser)
    return await this.userRepository.softDelete(id)
  }
}
