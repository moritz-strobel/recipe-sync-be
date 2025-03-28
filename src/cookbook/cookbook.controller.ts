import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CookbookService } from './cookbook.service';
import { CreateCookbookDto } from './dtos/create-cookbook.dto';

@Controller('cookbook')
export class CookbookController {
    constructor(private readonly cookbookService: CookbookService) {}

    @Get()
    async findByTitle(
        @Query('title') title: string,
        @Query('userId') userId: number,
        @Query('id') id: number,
    ) {
        if (title) {
            return await this.cookbookService.readByTitle(title);
        } else if (userId) {
            return await this.cookbookService.readAllByUser(userId);
        } else if (id) {
            return await this.cookbookService.getById(id);
        }
        return await this.cookbookService.readAll();
    }

    @Post()
    async create(
        @Body() data: { userId: number; cookbook: CreateCookbookDto },
    ) {
        return this.cookbookService.create(data.cookbook, data.userId);
    }

    @Put(':cookbookId')
    async addRecipe(
        @Param('cookbookId') cookbookId: number,
        @Body() data: { userId: number; recipeId: number },
    ) {
        return this.cookbookService.addRecipeToCookbook(
            cookbookId,
            data.userId,
            data.recipeId,
        );
    }
}
