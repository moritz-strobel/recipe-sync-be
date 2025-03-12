import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CookbookService } from './cookbook.service';
import { CreateCookbookDto } from './dtos/create-cookbook.dto';

@Controller('cookbook')
export class CookbookController {
    constructor(private readonly cookbookService: CookbookService) {}

    @Get()
    async findAll() {
        return await this.cookbookService.readAll();
    }

    @Get(':userId')
    async findAllByUser(@Param('userId') userId: number) {
        return await this.cookbookService.readAllByUser(userId);
    }

    @Post(':userId')
    async create(
        @Param('userId') userId: number,
        @Body() createCookbookDto: CreateCookbookDto,
    ) {
        return this.cookbookService.create(userId, createCookbookDto);
    }

    @Put(':userId')
    async addRecipe(
        @Param('cookbookId') cookbookId: number,
        @Query('recipeId') recipeId: number,
    ) {
        return this.cookbookService.addRecipeToCookbook(cookbookId, recipeId);
    }
}
