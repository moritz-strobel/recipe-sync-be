import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from './recipe.entity';
import { Repository } from 'typeorm';
import { CreateRecipeDto } from './dtos/CreateRecipeDto';
import { Ingredient } from './ingredient.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class RecipeService {
    constructor(
        @InjectRepository(Recipe)
        private recipesRepository: Repository<Recipe>,
        @InjectRepository(Ingredient)
        private ingredientsRepository: Repository<Ingredient>,
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
    ) {}

    async create(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
        const user = await this.userService.readOne(createRecipeDto.userId);
        if (!user) {
            throw new Error('User not found');
        }
        const ingredients: Ingredient[] = [];
        if (createRecipeDto.ingredientIds) {
            for (const id of createRecipeDto.ingredientIds) {
                const ingredient = await this.ingredientsRepository.findOneBy({
                    id: id,
                });
                if (ingredient) {
                    ingredients.push(ingredient);
                }
            }
        }

        const recipe = this.recipesRepository.create({
            ...createRecipeDto,
            user,
            ingredients,
        });
        return await this.recipesRepository.save(recipe);
    }

    // (!) Attention: If you use this api in production, implement a "where" filter
    async readAll(): Promise<Recipe[]> {
        return await this.recipesRepository.find();
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
            tagArray.every((tag) =>
                recipe.tags.some((recipeTag) => recipeTag === tag),
            ),
        );
    }

    async update(id: number, data: Partial<Recipe>) {
        return await this.recipesRepository.update(id, data);
    }

    async delete(id: number): Promise<void> {
        await this.recipesRepository.delete(id);
    }
}
