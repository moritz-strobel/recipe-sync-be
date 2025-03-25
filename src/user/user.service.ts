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

        const newUser = await this.usersRepository.save(user);
        await this.cookbookService.create(
            {
                title: 'Favorites',
                isFavorite: false,
                isPublic: false,
                isDeletable: false,
            },
            newUser.id,
        );

        return newUser;
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

    async saveCookbook(userId: number, cookbookId: number) {
        const user = await this.usersRepository.findOne({
            where: { id: userId },
            relations: ['savedCookbooks'],
        });
        if (!user) {
            throw new BadRequestException('User not found');
        }
        const cookbook = await this.cookbookService.readOne(cookbookId);
        if (!cookbook) {
            throw new BadRequestException('Cookbook not found');
        }
        user.savedCookbooks.push(cookbook);
        return await this.usersRepository.save({
            ...user,
            savedCookbooks: user.savedCookbooks,
        });
    }
}
