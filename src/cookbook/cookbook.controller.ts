import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CookbookService } from './cookbook.service';
import { CreateCookbookDto } from './dtos/create-cookbook.dto';

@Controller('cookbook')
export class CookbookController {
    constructor(private readonly cookbookService: CookbookService) {}

    @Get()
    async findByTitle(@Query('title') title: string) {
        if (title) {
            return await this.cookbookService.readByTitle(title);
        }
        return await this.cookbookService.readAll();
    }

    @Post()
    async findAllByUser(@Body('userId') userId: number) {
        return await this.cookbookService.readAllByUser(userId);
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
        @Body('data') data: { userId: number; recipeId: number },
    ) {
        return this.cookbookService.addRecipeToCookbook(
            cookbookId,
            data.userId,
            data.recipeId,
        );
    }
}
