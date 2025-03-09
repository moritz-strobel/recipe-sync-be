import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Post,
} from '@nestjs/common';
import { CookbookService } from './cookbook.service';
import { CreateCookbookDto } from './dtos/create-cookbook.dto';
import { UserService } from '../user/user.service';

@Controller('cookbook')
export class CookbookController {
    constructor(
        private readonly cookbookService: CookbookService,
        private readonly userService: UserService,
    ) {}

    @Get(':userId')
    async getCookbooks(@Param('userId') userId: string) {
        const cookbooks = await this.cookbookService.readAll();
        return cookbooks.filter(
            (cookbook) => cookbook.user.id === Number(userId),
        );
    }

    @Post(':userId')
    async createCookbook(
        @Param('userId') userId: string,
        @Body() createCookbookDto: CreateCookbookDto,
    ) {
        const user = await this.userService.readOne(Number(userId));
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }
        createCookbookDto.user = user;
        return this.cookbookService.create(createCookbookDto);
    }
}
