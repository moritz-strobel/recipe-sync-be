import { Controller, Get, Param } from '@nestjs/common';
import { RecipeService } from './recipe.service';

@Controller('recipe')
export class RecipeController {
    constructor(private readonly recipeService: RecipeService) {}

    @Get()
    getRecipes() {
        return this.recipeService.readAll();
    }

    @Get(':id')
    getRecipe(@Param('id') id: string) {
        return this.recipeService.readOne(Number(id));
    }
}
