import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.readOne(Number(id));
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Put(':id') update(
        @Param('id') id: string,
        @Body() createUserDto: Partial<CreateUserDto>,
    ) {
        return this.userService.update(Number(id), createUserDto);
    }

    @Delete(':id') remove(@Param('id') id: string) {
        return this.userService.delete(Number(id));
    }
}
