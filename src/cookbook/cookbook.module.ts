import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cookbook } from './cookbook.entity';
import { CookbookService } from './cookbook.service';
import { CookbookController } from './cookbook.controller';
import { RecipeModule } from 'src/recipe/recipe.module';
import { UserModule } from '../user/user.module';
import { RecipeService } from '../recipe/recipe.service';

@Module({
    imports: [
        RecipeModule,
        forwardRef(() => UserModule),
        TypeOrmModule.forFeature([Cookbook]),
    ],
    providers: [CookbookService, RecipeService],
    controllers: [CookbookController],
    exports: [CookbookService, TypeOrmModule],
})
export class CookbookModule {}
