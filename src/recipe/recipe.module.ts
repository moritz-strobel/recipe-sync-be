import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.entity';
import { RecipeController } from './recipe.controller';
import { Rating } from './rating.entity';
import { Tag } from './tag.entity';
import { Image } from './image.entity';
import { Comment } from './comment.entity';
import { Ingredient } from './ingredient.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recipe, Rating, Tag, Comment, Image, Ingredient]),
  ],
  providers: [RecipeService],
  controllers: [RecipeController],
  exports: [RecipeService],
})
export class RecipeModule {}
