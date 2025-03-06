import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    NotFoundException,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateResult } from 'typeorm';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<User> {
        const user = await this.userService.readOne(Number(id));
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.userService.create(createUserDto);
    }

    @Put(':id') async update(
        @Param('id') id: string,
        @Body() createUserDto: Partial<CreateUserDto>,
    ): Promise<UpdateResult> {
        return await this.userService.update(Number(id), createUserDto);
    }

    @Delete(':id') async remove(@Param('id') id: string): Promise<HttpStatus> {
        await this.userService.delete(Number(id));
        return HttpStatus.OK;
    }
}
