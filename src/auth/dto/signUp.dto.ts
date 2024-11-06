import { IsOptional, IsString, MinLength } from "class-validator";

export class SignUpDto{
    @IsString()
    name: string

    @IsString()
    email: string

    @IsString()
    @MinLength(8)
    password: string
}