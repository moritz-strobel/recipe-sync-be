import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { RecipeModule } from './recipe/recipe.module';
import { CookbookModule } from './cookbook/cookbook.module';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { RecipeService } from './recipe/recipe.service';
import { CreateRecipeDto } from './recipe/dtos/create-recipe.dto';
import { CreateCookbookDto } from './cookbook/dtos/create-cookbook.dto';
import { CookbookService } from './cookbook/cookbook.service';
import { coverImage } from './mock-images';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'db.sqlite',
            autoLoadEntities: true,
            synchronize: true, // (!) disable for production
        }),
        UserModule,
        RecipeModule,
        CookbookModule,
        AuthModule,
    ],
})
export class AppModule implements OnModuleInit {
    constructor(
        private userService: UserService,
        private recipeService: RecipeService,
        private cookbookService: CookbookService,
    ) {}

    async onModuleInit() {
        // Example program run. Use command "rm -f db.sqlite && npm run start" to run with a clean database
        if (await this.userService.readOne(1)) return;
        const user = await this.userService.create({
            first_name: 'Root',
            last_name: 'Root',
            username: 'root',
            email: 'root@root.com',
            password: 'root',
        });

        // Create mock recipes
        const recipesDto: CreateRecipeDto[] = [
            {
                title: 'Spaghetti Carbonara',
                isPublic: true,
                generalScore: 'neutral',
                nutriScore: 'B',
                ingredients: 'spaghetti,eggs,pancetta,parmesan',
                steps: 5,
                preparationTime: 15,
                overallCookTime: 25,
                recipeText: '1. Boil pasta\n2. Fry pancetta\n3. Mix eggs...',
                tags: 'italian,pasta,quick',
                coverImage: coverImage,
            },
            {
                title: 'Vegetable Stir Fry',
                isPublic: true,
                generalScore: 'healthy',
                nutriScore: 'A',
                ingredients: 'broccoli,carrots,soy sauce,rice',
                steps: 4,
                preparationTime: 20,
                overallCookTime: 30,
                recipeText: '1. Cook rice\n2. Chop vegetables\n3. Stir fry...',
                tags: 'vegan,asian,healthy',
                coverImage: coverImage,
            },
        ];

        const recipes = await Promise.all(
            recipesDto.map((recipeDto) =>
                this.recipeService.create(recipeDto, user.id),
            ),
        );

        // Create mock cookbooks
        const cookbookDtos: CreateCookbookDto[] = [
            {
                title: 'Italian Favorites',
                isFavorite: true,
                isDeletable: true,
                isPublic: true,
                description: 'My favorite Italian recipes',
                coverImage: coverImage,
            },
            {
                title: 'Healthy Meals',
                isFavorite: false,
                isDeletable: true,
                isPublic: false,
                description: 'Collection of healthy recipes',
                coverImage: coverImage,
            },
        ];

        const cookbooks = await Promise.all(
            cookbookDtos.map((cookBookDto) =>
                this.cookbookService.create(cookBookDto, user.id),
            ),
        );

        await this.cookbookService.addRecipeToCookbook(
            cookbooks[0].id,
            user.id,
            recipes[0].id,
        );
        await this.cookbookService.addRecipeToCookbook(
            cookbooks[1].id,
            user.id,
            recipes[1].id,
        );
    }
}
