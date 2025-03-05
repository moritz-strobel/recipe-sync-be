import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, In, Repository } from 'typeorm';
import { Rating } from './rating.entity';
import { Recipe } from './recipe.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private recipesRepository: Repository<Recipe>,
    @InjectRepository(Rating)
    private ratingsRepository: Repository<Rating>,
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
        ratings: { user: true },
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

  /**
   * Calculates the average rating for a recipe
   * @param recipeId Id of the recipe to calculate average stars for
   * @returns Returns null if there are no ratings for the given recipe. Returns the average starts rating if there is at least one rating
   */
  async getRatingAvg(recipeId: number): Promise<number | null> {
    const exists = await this.recipesRepository.exists({
      where: { id: recipeId },
    });
    if (!exists) {
      throw new NotFoundException(`Recipe with id ${recipeId} does not exist`);
    }

    const result = await this.ratingsRepository.average('stars', {
      id: recipeId,
    });
    return result;
  }

  async searchRecipes(conditions: {
    ingridient_any?: string[];
    userId_in?: number[];
    rating_gt?: number;
  }) {
    const where: FindOneOptions<Recipe>['where'] = {};
    const relations: FindOneOptions<Recipe>['relations'] = {};

    if (conditions.ingridient_any) {
      where.ingredients = { name: In(conditions.ingridient_any) };
    }
    if (conditions.userId_in) {
      where.user = { id: In(conditions.userId_in) };
      // As user is not an eager relation in recipe.entity, we have to join this table manually, if we want to filter by a user
      relations.user = true;
    }
    if (conditions.rating_gt) {
      const query = this.ratingsRepository
        .createQueryBuilder('')
        .relation('rating')
        .select('rating.recipeId')
        .groupBy('rating.recipeId')
        .having(`AVG(rating.stars) > ${conditions.rating_gt}`)
        .getQuery();
      const results = (await this.ratingsRepository.query(query)) as {
        recipeId: number;
      }[];
      const recipeIds = results.map((result) => result.recipeId);
      where.id = In(recipeIds);
    }

    const recipes = await this.recipesRepository.find({
      relations,
      where,
    });
    return recipes;
  }
}
