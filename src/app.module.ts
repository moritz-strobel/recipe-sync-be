import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeModule } from './recipe/recipe.module';
import { CookbookModule } from './cookbook/cookbook.module';
import { UserService } from './user/user.service';
import { RecipeService } from './recipe/recipe.service';
import { CookbookService } from './cookbook/cookbook.service';
import { UserController } from './user/user.controller';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'db.sqlite',
            entities: [],
            autoLoadEntities: true,
            synchronize: true, // (!) disable for production
        }),
        CookbookModule,
        RecipeModule,
        UserModule,
    ],
    controllers: [AppController, UserController],
    providers: [AppService],
})
export class AppModule implements OnModuleInit {
    constructor(
        private readonly cookbookService: CookbookService,
        private readonly recipeService: RecipeService,
        private readonly userService: UserService,
    ) {}

    async onModuleInit() {
        // Example program run. Use command "rm -f db.sqlite && npm run start" to run with a clean database
    }
}
