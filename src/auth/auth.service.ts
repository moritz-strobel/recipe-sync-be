import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private userService: UserService,
    ) {}

    async login(email: string, password: string) {
        const user = await this.userRepository.findOneBy({
            email: email,
            password: password,
        });

        if (!user) {
            throw new BadRequestException('Email or Password is incorrect');
        }
        return user;
    }

    async register(createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    }
}
