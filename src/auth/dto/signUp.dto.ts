import { IsOptional, IsString, MinLength } from "class-validator";

export class SignUpDto{
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    secondName: string

    @IsString()
    lastName: string

    @IsString()
    email: string

    @IsString()
    @MinLength(8)
    password: string

    @IsOptional()
    @IsString()
    phone: string

    @IsOptional()
    @IsString()
    seconPhone: string

    @IsOptional()
    @IsString()
    address: string

    @IsString()
    img: string
}