import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dtos/create-recipe.dto';

@Controller('recipe')
export class RecipeController {
    constructor(private readonly recipeService: RecipeService) {}

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.recipeService.readOne(Number(id));
    }

    @Get()
    async findByAttr(
        @Query('tags') tags: string,
        @Query('title') title: string,
        @Query('userId') userId: number,
    ) {
        if (tags) {
            return await this.recipeService.readByTags(tags);
        } else if (title) {
            const recipes = await this.recipeService.readAll();
            return recipes.filter((recipe) => recipe.title === title);
        } else if (userId) {
            return await this.recipeService.readByUser(userId);
        } else {
            return await this.recipeService.readAll();
        }
    }

    @Post()
    createRecipe(
        @Body() data: { userId: number; createRecipeDto: CreateRecipeDto },
    ) {
        return this.recipeService.create(data.createRecipeDto, data.userId);
    }
}
