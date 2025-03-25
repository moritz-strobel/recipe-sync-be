import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';
import { CookbookModule } from '../cookbook/cookbook.module';
import { RecipeModule } from '../recipe/recipe.module';

@Module({
    imports: [TypeOrmModule.forFeature([User]), RecipeModule, CookbookModule],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService, TypeOrmModule],
})
export class UserModule {}
