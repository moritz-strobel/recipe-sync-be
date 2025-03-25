import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cookbook } from './cookbook.entity';
import { Repository } from 'typeorm';
import { RecipeService } from 'src/recipe/recipe.service';
import { CreateCookbookDto } from './dtos/create-cookbook.dto';
import { User } from '../user/user.entity';

@Injectable()
export class CookbookService {
    constructor(
        @InjectRepository(Cookbook)
        private cookbookRepository: Repository<Cookbook>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private readonly recipeService: RecipeService,
    ) {}

    async create(userId: number, createCookBookDto: CreateCookbookDto) {
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new Error('User not found');
        }

        const cookbook = this.cookbookRepository.create({
            ...createCookBookDto,
            user,
        });
        return await this.cookbookRepository.save(cookbook);
    }

    async readAllByUser(userId: number) {
        return await this.cookbookRepository.findBy({ user: { id: userId } });
    }

    async readAll(): Promise<Cookbook[]> {
        return await this.cookbookRepository.find();
    }

    async readOne(id: number): Promise<Cookbook | null> {
        const result = await this.cookbookRepository.find({
            where: { id },
            relations: {},
        });
        return result ? result[0] : null;
    }

    async update(id: number, data: Partial<Cookbook>) {
        return await this.cookbookRepository.update(id, data);
    }

    async delete(id: number): Promise<void> {
        await this.cookbookRepository.delete(id);
    }

    async addRecipeToCookbook(
        cookbookId: number,
        userId: number,
        recipeId: number,
    ) {
        const cookbook = await this.readOne(cookbookId);
        if (!cookbook) {
            throw new NotFoundException(
                `Cookbook with ID ${cookbookId} not found`,
            );
        } else if (cookbook.user.id !== userId) {
            throw new UnauthorizedException(
                'User does not have permission to add recipe',
            );
        }

        const recipe = await this.recipeService.readOne(recipeId);
        if (!recipe) {
            throw new NotFoundException(`Recipe with ID ${recipeId} not found`);
        }

        cookbook?.recipes.push(recipe);
        await this.cookbookRepository.save(cookbook);
    }

    async readByTitle(title: string) {
        return await this.cookbookRepository.findOneBy({ title });
    }
}
