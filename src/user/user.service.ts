import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.usersRepository.create(createUserDto);
        return await this.usersRepository.save(user);
    }

    // (!) Attention: If you use this api in production, implement a "where" filter
    async readAll(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async readOne(id: number): Promise<User | null> {
        const result = await this.usersRepository.find({
            where: { id },
        });
        return result ? result[0] : null;
    }

    async update(id: number, data: Partial<CreateUserDto>) {
        return await this.usersRepository.update(id, data);
    }

    async delete(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
