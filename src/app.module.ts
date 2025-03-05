import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AchievementModule } from './achievement/achievement.module';
import { RecipeModule } from './recipe/recipe.module';
import { CategoryModule } from './category/category.module';
import { CookbookModule } from './cookbook/cookbook.module';
import { UserService } from './user/user.service';
import { RecipeService } from './recipe/recipe.service';
import { AchievementService } from './achievement/achievement.service';
import { CategoryService } from './category/category.service';
import { CookbookService } from './cookbook/cookbook.service';
import { User } from './user/user.entity';
import { Rating } from './recipe/rating.entity';
import { Recipe } from './recipe/recipe.entity';
import { Comment } from './recipe/comment.entity';
import { Category } from './category/category.entity';
import { Tag } from './recipe/tag.entity';
import { inspect } from 'node:util';
import { Ingredient } from './recipe/ingredient.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [],
      autoLoadEntities: true,
      synchronize: true, // (!) disable for production
    }),
    AchievementModule,
    CategoryModule,
    CookbookModule,
    RecipeModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly achievementService: AchievementService,
    private readonly categoryService: CategoryService,
    private readonly cookbookService: CookbookService,
    private readonly recipeService: RecipeService,
    private readonly userService: UserService,
  ) {}

  async onModuleInit() {
    // Example program run. Use command "rm -f db.sqlite && npm run start" to run with a clean database

    const user = new User();
    user.username = 'm-m';
    user.email = 'm@m.de';
    user.passwordHash =
      '$2y$10$dcIRlr4MY7NQhDXzZf6snuXyIjQB3VgJzPnJG/wAwq7HksEEaMlD2'; // "password"
    user.profileTextUrl = '';
    user.profileImageUrl = '';
    user.allowEmailNotifiaction = true;
    user.allowUpdates = true;
    user.allowAds = true;
    user.nationality = '';

    const recipe = new Recipe();
    recipe.title = 'recipe';
    recipe.user = user;
    recipe.isPublic = true;
    recipe.generalScore = 'healthy';
    recipe.nutriScore = 'A';
    const ingredient = new Ingredient();
    ingredient.name = 'fish';
    const ingredient2 = new Ingredient();
    ingredient2.name = 'egg';
    recipe.ingredients = [ingredient, ingredient2];
    recipe.steps = 2;
    recipe.preparationTime = 2;
    recipe.overallCookTime = 3;
    recipe.recipeText = 'hi';
    recipe.videoUrl = 'url';
    recipe.coverImage = Buffer.from([]);
    const category = new Category();
    category.name = 'vegan';
    recipe.categories = [category];
    const tag = new Tag();
    tag.name = 'veggy';
    recipe.tags = [tag];
    const rating = new Rating();
    rating.user = user;
    rating.stars = 5;
    recipe.ratings = [rating];
    recipe.views = 4;
    recipe.shares = 0;
    const comment = new Comment();
    comment.text = 'good';
    recipe.comments = [comment];

    const { id: userId } = await this.userService.create(user);
    await this.userService.addFollower(user, user);
    const { id: recipeId } = await this.recipeService.create(recipe);

    const userRead = await this.userService.readOne(userId);
    console.log(inspect(userRead, true, 10, true));

    const recipeRead = await this.recipeService.readOne(recipeId);
    console.log(inspect(recipeRead, true, 10, true));

    const found = await this.recipeService.searchRecipes({
      //userId_in: [userId],
      //ingridient_any: ['fish', 'bread'],
      rating_gt: 5,
    });
    console.log(inspect(found, true, 10, true));
  }
}
