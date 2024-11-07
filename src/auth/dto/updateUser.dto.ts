import { IsOptional, IsString } from "class-validator";

export class UpdateUserDto{
    @IsOptional()
    @IsString()
    email?: string;
    
    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsString()
    name?: string;

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
    secondPhone?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    img?: string
}