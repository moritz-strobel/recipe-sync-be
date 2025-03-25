import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.entity';
import { RecipeController } from './recipe.controller';
import { UserModule } from '../user/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([Recipe]), forwardRef(() => UserModule)],
    providers: [RecipeService],
    controllers: [RecipeController],
    exports: [RecipeService, TypeOrmModule],
})
export class RecipeModule {}
