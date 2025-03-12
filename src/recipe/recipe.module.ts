import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.entity';
import { RecipeController } from './recipe.controller';
import { Tag } from './tag.entity';
import { Image } from './image.entity';
import { Ingredient } from './ingredient.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Recipe, Tag, Image, Ingredient])],
    providers: [RecipeService],
    controllers: [RecipeController],
    exports: [RecipeService, TypeOrmModule],
})
export class RecipeModule {}
