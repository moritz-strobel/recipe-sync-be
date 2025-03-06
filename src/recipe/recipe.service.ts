import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from './recipe.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecipeService {
    constructor(
        @InjectRepository(Recipe)
        private recipesRepository: Repository<Recipe>,
    ) {}

    async create(Recipe: Recipe): Promise<Recipe> {
        return await this.recipesRepository.save(Recipe);
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

    async update(id: number, data: Partial<Recipe>) {
        return await this.recipesRepository.update(id, data);
    }

    async delete(id: number): Promise<void> {
        await this.recipesRepository.delete(id);
    }
}
