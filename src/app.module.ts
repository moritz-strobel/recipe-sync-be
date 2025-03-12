import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { RecipeModule } from './recipe/recipe.module';
import { CookbookModule } from './cookbook/cookbook.module';
import { AuthModule } from './auth/auth.module';

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
    constructor() {}

    async onModuleInit() {
        // Example program run. Use command "rm -f db.sqlite && npm run start" to run with a clean database
    }
}
