import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/signUp.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtServices: JwtService,
    private readonly userServices: UsersService,
  ) {}

  private async encryptPassword(password: string) {
    const hashPassword = await bcryptjs.hash(password, 10);
    return hashPassword;
  }

  private comparePasswords(
    password: string,
    newPassword: string,
  ): Promise<boolean> {
    const isValidPassword = bcryptjs.compare(newPassword, password);
    if (!isValidPassword) throw new UnauthorizedException('password is wrong');

    return isValidPassword;
  }

  private async verifyIfUserAlreadyExist(email: string) {
    const userFound = await this.userServices.findOneByEmail(email);

    if (userFound) throw new ConflictException('User already exist');
  }

  private async createToken(id: string, email: string) {
    const payload = { id, email };
    const token = await this.jwtServices.signAsync(payload);

    return token;
  }

  async login(loginDto: LoginDto) {
    const userFound = await this.userServices.findUserByEmailWithPassword(
      loginDto.email,
    );
    if (!userFound) throw new NotFoundException('Email not found');

    this.comparePasswords(loginDto.password, userFound.password);

    return await this.createToken(userFound.id, loginDto.email);
  }

  async signUp(signUpDto: SignUpDto) {
    await this.verifyIfUserAlreadyExist(signUpDto.email);
    const hashpassword = await this.encryptPassword(signUpDto.password);

    return await this.userServices.create({
      ...signUpDto,
      password: hashpassword,
    });
  }
}