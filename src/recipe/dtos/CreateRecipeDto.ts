import {
    IsArray,
    IsBoolean,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateRecipeDto {
    @IsString()
    title: string;

    @IsNumber()
    userId: number;

    @IsBoolean()
    isPublic: boolean;

    @IsOptional()
    @IsString()
    generalScore?: 'healthy' | 'neutral' | 'unhealthy';

    @IsOptional()
    @IsString()
    nutriScore?: 'A' | 'B' | 'C' | 'D' | 'E';

    @IsArray()
    @IsOptional()
    ingredientIds: number[];

    @IsNumber()
    @IsOptional()
    steps?: number;

    @IsNumber()
    @IsOptional()
    preparationTime?: number;

    @IsNumber()
    @IsOptional()
    overallCookTime?: number;

    @IsString()
    recipeText: string;

    @IsArray()
    @IsOptional()
    tags?: string[];
}
