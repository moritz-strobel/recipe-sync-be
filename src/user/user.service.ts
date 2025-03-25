import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CookbookService } from '../cookbook/cookbook.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private cookbookService: CookbookService,
    ) {}

    async create(createUserDto: CreateUserDto) {
        const user = this.usersRepository.create(createUserDto);
        if (await this.usersRepository.findOneBy({ email: user.email })) {
            throw new BadRequestException(
                'User with this email already exists',
            );
        } else if (
            await this.usersRepository.findOneBy({ username: user.username })
        ) {
            throw new BadRequestException(
                'User with this username already exists',
            );
        }

        await this.cookbookService.create(user.id, {
            title: 'Favorites',
            isFavorite: true,
            isPublic: false,
            isDeletable: false,
        });

        return await this.usersRepository.save(user);
    }

    // (!) Attention: If you use this api in production, implement a "where" filter
    async readAll() {
        return await this.usersRepository.find();
    }

    async readOne(id: number): Promise<User | null> {
        const result = await this.usersRepository.find({
            where: { id },
        });
        return result ? result[0] : null;
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        await this.usersRepository.update(id, updateUserDto);
        return this.usersRepository.findOneBy({ id });
    }

    async delete(id: number) {
        await this.usersRepository.delete(id);
    }
}
