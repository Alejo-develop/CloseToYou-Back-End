import { IsOptional, IsString, Validate } from 'class-validator';
import { IsStringOrNumber } from './validate.dto';

export class CreateContactDto {
  @IsString()
  name: string;
  
  @IsOptional()
  @IsString()
  userId: string

  @IsOptional()
  @IsString()
  secondName?: string;
  
  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  secondPhone?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @Validate(IsStringOrNumber)
  @IsOptional()
  latitude?: string | number;;

  @Validate(IsStringOrNumber)
  @IsOptional()
  longitude?: string | number;;

  @IsOptional()
  img?: string;
}

