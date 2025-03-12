import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cookbook } from './cookbook.entity';
import { CookbookService } from './cookbook.service';
import { CookbookController } from './cookbook.controller';
import { RecipeModule } from 'src/recipe/recipe.module';
import { UserModule } from '../user/user.module';

@Module({
    imports: [RecipeModule, UserModule, TypeOrmModule.forFeature([Cookbook])],
    providers: [CookbookService],
    controllers: [CookbookController],
    exports: [CookbookService, TypeOrmModule],
})
export class CookbookModule {}
