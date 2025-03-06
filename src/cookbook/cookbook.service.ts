import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cookbook } from './cookbook.entity';
import { Repository } from 'typeorm';
import { RecipeService } from 'src/recipe/recipe.service';

@Injectable()
export class CookbookService {
    constructor(
        @InjectRepository(Cookbook)
        private cookbookRepository: Repository<Cookbook>,
        private readonly recipeService: RecipeService,
    ) {}

    async create(cookbook: Cookbook): Promise<Cookbook> {
        return await this.cookbookRepository.save(cookbook);
    }

    // (!) Attention: If you use this api in production, implement a "where" filter
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

    async addRecipeToCookbook(cookbookId: number, recipeId: number) {
        const recipe = await this.recipeService.readOne(recipeId);
        if (!recipe) {
            throw new NotFoundException(`Recipe with ID ${recipeId} not found`);
        }

        const cookbook = await this.readOne(cookbookId);
        if (!cookbook) {
            throw new NotFoundException(
                `Cookbook with ID ${cookbookId} not found`,
            );
        }

        cookbook?.recipes.push(recipe);
        await this.cookbookRepository.save(cookbook);
    }
}
