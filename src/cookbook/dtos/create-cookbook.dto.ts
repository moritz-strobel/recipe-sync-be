import { Recipe } from '../../recipe/recipe.entity';
import { User } from '../../user/user.entity';

export class CreateCookbookDto {
    user: User;
    title: string;
    isFavorite: boolean;
    isDeletable: boolean;
    isPublic: boolean;
    description: string;
    coverImageUrl: string;
    recipes: Recipe[];
}
