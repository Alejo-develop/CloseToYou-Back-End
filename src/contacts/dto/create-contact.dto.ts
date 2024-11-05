import { IsOptional, IsString } from 'class-validator';

export class CreateContactDto {
  @IsString()
  name: string;
  
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
  phone?: string;

  @IsOptional()
  @IsString()
  seconPhone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  img?: string;
}

