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

    @IsBoolean()
    isPublic: boolean;

    @IsOptional()
    @IsString()
    generalScore?: 'healthy' | 'neutral' | 'unhealthy';

    @IsOptional()
    @IsString()
    nutriScore?: 'A' | 'B' | 'C' | 'D' | 'E';

    @IsArray()
    ingredients: string;

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
    tags?: string;

    @IsOptional()
    @IsString()
    coverImage?: string;
}
