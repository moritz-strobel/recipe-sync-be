import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    first_name: string;

    @IsString()
    last_name: string;

    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(4)
    password: string;
}
