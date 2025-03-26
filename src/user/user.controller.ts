import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.readOne(Number(id));
    }

    @Get()
    findAll() {
        return this.userService.readAll();
    }

    @Put(':id')
    @UsePipes(
        new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    )
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(Number(id), updateUserDto);
    }

    @Get('saved')
    findSaved(@Query('userId') userId: number) {
        return this.userService.findSaved(userId);
    }

    @Post('saved')
    saveCookbook(@Body() data: { userId: number; cookbookId: number }) {
        return this.userService.saveCookbook(data.userId, data.cookbookId);
    }

    @Delete(':id') remove(@Param('id') id: string) {
        return this.userService.delete(Number(id));
    }
}
