import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateCookbookDto {
    @IsString()
    title: string;

    @IsBoolean()
    isFavorite: boolean;

    @IsBoolean()
    isPublic: boolean;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    coverImageUrl?: string;
}
