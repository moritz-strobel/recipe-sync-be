import {
    forwardRef,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from './recipe.entity';
import { Repository } from 'typeorm';
import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class RecipeService {
    constructor(
        @InjectRepository(Recipe)
        private recipesRepository: Repository<Recipe>,
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
    ) {}

    async create(
        createRecipeDto: CreateRecipeDto,
        userId: number,
    ): Promise<Recipe> {
        const user = await this.userService.readOne(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const ingredients = createRecipeDto.ingredients;
        const tags = createRecipeDto.tags;
        const recipe = this.recipesRepository.create({
            ...createRecipeDto,
            ingredients: ingredients,
            tags: tags,
            user,
        });
        return await this.recipesRepository.save(recipe);
    }

    // (!) Attention: If you use this api in production, implement a "where" filter
    async readAll(): Promise<Recipe[]> {
        return await this.recipesRepository.find({ relations: ['user'] });
    }

    async readOne(id: number): Promise<Recipe | null> {
        const result = await this.recipesRepository.find({
            where: { id },
            relations: {
                user: true,
            },
        });
        return result ? result[0] : null;
    }

    async readByTags(tags: string) {
        const tagArray = tags.split(' ');
        const recipes = await this.readAll();
        return recipes.filter((recipe) =>
            tagArray.every((tag) => {
                const tags = recipe.tags.split(',');
                return tags.some((recipeTag) => recipeTag === tag);
            }),
        );
    }

    async update(id: number, data: Partial<Recipe>) {
        return await this.recipesRepository.update(id, data);
    }

    async delete(id: number): Promise<void> {
        await this.recipesRepository.delete(id);
    }

    async readByUser(userId: number) {
        return await this.recipesRepository.findBy({ user: { id: userId } });
    }
}
