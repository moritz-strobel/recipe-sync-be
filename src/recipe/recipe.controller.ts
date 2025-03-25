import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dtos/CreateRecipeDto';

@Controller('recipe')
export class RecipeController {
    constructor(private readonly recipeService: RecipeService) {}

    @Get()
    findAll() {
        return this.recipeService.readAll();
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.recipeService.readOne(Number(id));
    }

    @Get()
    async findByAttr(
        @Query('tags') tags: string,
        @Query('title') title: string,
    ) {
        if (tags) {
            return await this.recipeService.readByTags(tags);
        } else if (title) {
            const recipes = await this.recipeService.readAll();
            return recipes.filter((recipe) => recipe.title === title);
        }
    }

    @Post()
    createRecipe(@Body() createRecipeDto: CreateRecipeDto) {
        return this.recipeService.create(createRecipeDto);
    }
}
